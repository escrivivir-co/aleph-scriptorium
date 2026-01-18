# T009: Debugging ENGINE_THREADS Master

> **Sesión**: 2026-01-18_mcp-aaia-server  
> **Turno**: 9  
> **Foco**: Debugging Socket.IO channel "AlephScript Clients" + ENGINE_THREADS master  
> **Épica**: MCP-AAIA-SERVER-1.0.0  

---

## 1. Problema Detectado

### Síntoma
- Frontend Angular conecta a `http://localhost:3000/socket.io/` ✅
- Socket.IO server (CHS: Start [Server]) está corriendo ✅
- Logs del servidor muestran:

```
⚠️ WARNING! No GET/SET agent at room: [ENGINE_THREADS]
```

### Diagnóstico

| Room | MASTER | Estado |
|------|--------|--------|
| `devops-mcp-server_ROOM` | ✅ DevOpsServer | Funcionando |
| `prolog-mcp-server_ROOM` | ✅ EuridiceBot | Funcionando |
| `AAIA_ROOM` | ✅ PersefonBot | MCPAAIAServer |
| **`ENGINE_THREADS`** | ❌ Nadie | **BUG** |

El room `ENGINE_THREADS` no tiene MASTER registrado, por lo que cuando el frontend llama `GET_LIST_OF_THREADS`, el servidor invoca `forwardRequestToMaster()` pero no encuentra ninguno.

---

## 2. Análisis del Patrón MCPPrologServer

### Código de Referencia (EuridiceBot)

```typescript
// MCPPrologServer.ts líneas 54-83
private initEuridiceBot(): void {
  const socketUrl = process.env.SOCKET_MESH_URL || "http://localhost:3010";
  const serverName = DEFAULT_PROLOG_MCP_SERVER_CONFIG.id;
  
  this.euridiceBot = new AlephScriptClient(serverName, socketUrl);
  
  this.euridiceBot.initTriggersDefinition.push(() => {
    const ROOM_NAME = serverName + "_ROOM"; // → "prolog-mcp-server_ROOM"
    
    // 1. Registrar cliente
    this.euridiceBot.io.emit("CLIENT_REGISTER", { 
      usuario: this.euridiceBot.name, 
      sesion: getHash("EuridiceBot")
    });
    
    // 2. Suscribirse al room
    this.euridiceBot.io.emit("CLIENT_SUSCRIBE", { room: ROOM_NAME });
    
    // 3. Declararse MASTER
    this.euridiceBot.room("MAKE_MASTER", { 
      features: ["PROLOG_QUERY", "PROLOG_ASSERT", ...] 
    }, ROOM_NAME);
  });
}
```

### Patrón Identificado

1. Cada servidor MCP crea su **propio room** (`serverName + "_ROOM"`)
2. Se declara **MASTER** de ese room
3. Expone **features** que puede resolver

---

## 3. Solución Propuesta

**Decisión**: El `socketio.service.ts` del backend AIA será MASTER de `ENGINE_THREADS`.

### Razones

| Opción | Pros | Contras | Decisión |
|--------|------|---------|----------|
| MCPAAIAServer | Tiene PersefonBot | Ya tiene AAIA_ROOM, duplica sockets | ❌ |
| Backend AIA | Ya conecta al mesh | Simple, alineado con gateway | ✅ |
| Servicio dedicado | Separación de concerns | Overhead, otro proceso | ❌ |

### Features a Exponer

```typescript
const ENGINE_THREADS_FEATURES = [
  "GET_LIST_OF_THREADS",     // Listar sesiones activas
  "GET_THREAD_STATE",        // Estado de una sesión
  "THREAD_STEP",             // Ejecutar step en FIA
  "THREAD_PERCEPTO",         // Enviar percepto
];
```

---

## 4. Plan de Implementación

### Tipos Compartidos (mcp-core-sdk)

```typescript
// Ya existen en room-protocol.ts
import { 
  RoomProtocolEvent, 
  IMakeMasterPayload,
  IRoomCapability 
} from '@alephscript/mcp-core-sdk';
```

### Modificaciones Requeridas

**Archivo**: `AAIAGallery/backend/src/services/socketio.service.ts`

1. Importar tipos de `@alephscript/mcp-core-sdk`
2. Definir constantes de capabilities
3. En `joinRoom()` → también unirse a `ENGINE_THREADS`
4. Emitir `MAKE_MASTER` con features
5. Manejar requests entrantes (`GET_LIST_OF_THREADS`, etc.)

### Diagrama de Flujo

```
Frontend Angular
      │
      │ socket.emit("GET_LIST_OF_THREADS")
      ▼
Socket.IO Server (port 3000)
      │
      │ forwardRequestToMaster("ENGINE_THREADS")
      ▼
Backend AIA (AAIABackendBot) ← NUEVO MASTER
      │
      │ MCP Client call
      ▼
MCPAAIAServer (port 3007)
      │
      │ aaia_list_sessions()
      ▼
Response → Frontend
```

---

## 5. Código Implementado

### Constantes

```typescript
// Socket.IO service - Engine threads integration
const ENGINE_THREADS_ROOM = 'ENGINE_THREADS';
const ENGINE_THREADS_FEATURES = [
  'GET_LIST_OF_THREADS',
  'GET_THREAD_STATE', 
  'THREAD_STEP',
  'THREAD_PERCEPTO',
];
```

### Método de Registro como Master

```typescript
private registerAsMaster(): void {
  if (!this.socket) return;
  
  // Unirse a ENGINE_THREADS
  this.socket.emit('CLIENT_SUSCRIBE', { room: ENGINE_THREADS_ROOM });
  
  // Declararse MASTER
  this.socket.emit('ROOM_MESSAGE', {
    event: 'MAKE_MASTER',
    room: ENGINE_THREADS_ROOM,
    data: { features: ENGINE_THREADS_FEATURES }
  });
  
  logger.info(`Registered as MASTER of ${ENGINE_THREADS_ROOM}`);
}
```

---

## 6. Tests de Validación

| # | Test | Comando | Resultado |
|---|------|---------|-----------|
| 1 | Backend se conecta al mesh | Ver logs | ✅ Conectado a 3010 |
| 2 | Backend emite MAKE_MASTER | Ver logs servidor | ✅ Registrado |
| 3 | Frontend recibe threads list | UI → Sockets | ✅ Sin errores |
| 4 | GET_LIST_OF_THREADS funciona | Click en UI | ⏳ Pendiente test MCP |

---

## 7. Artefactos

- ✅ Diagnóstico documentado
- ✅ Patrón MCPPrologServer analizado
- ✅ Implementación en socketio.service.ts
- ✅ Puerto corregido 3000→3010
- ⏳ Test E2E con MCPAAIAServer

---

## 8. Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `AAIAGallery/backend/src/config/index.ts` | Puerto 3000→3010 |
| `AAIAGallery/frontend/src/environments/environment.ts` | +socketUrl |
| `AAIAGallery/frontend/src/environments/environment.development.ts` | +socketUrl |
| `AAIAGallery/frontend/src/app/services/socketio/server.service.ts` | Import env + usar socketUrl |
| `AAIAGallery/alephscript/src/FIA/engine/apps/socketio/client.ts` | Puerto 3000→3010 |

---

## 9. Logs de Validación

### Backend (POST-FIX)
```
2026-01-18 20:24:33 [info]: Connecting to Socket.IO at http://localhost:3010
2026-01-18 20:24:33 [info]: Socket.IO connected
2026-01-18 20:24:33 [info]: Joining room: AAIA_ROOM
2026-01-18 20:24:33 [info]: Joining room: ENGINE_THREADS
2026-01-18 20:24:33 [info]: Registered as MASTER of ENGINE_THREADS  ✅
2026-01-18 20:24:33 [info]: ENGINE_THREADS handlers configured
```

### Frontend (POST-FIX)
```
- [LOG] - Aleph-333:> /runtime.onConnect:  S: JDHVCw5KyyZR7R0uAAAS:> Init Ts: 1
```

---

## 10. Changelog

| Hora | Cambio |
|------|--------|
| T009-init | Diagnóstico ENGINE_THREADS no tiene MASTER |
| T009-analysis | Análisis patrón EuridiceBot/MCPPrologServer |
| T009-decision | Decisión: Backend AIA será MASTER de ENGINE_THREADS |
| T009-plan | Plan de implementación con tipos compartidos |
| T009-impl | ✅ Puerto corregido 3000→3010 en 5 archivos |
| T009-verify | ✅ Backend conecta y registra MASTER |
| T009-verify | ✅ Frontend conecta sin errores |

