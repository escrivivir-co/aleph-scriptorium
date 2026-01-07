# Backlog Borrador: MCP Channels SDK Integration

> **Épica**: MCP-CHANNELS-1.0.0  
> **Sprint**: FC1  
> **Fecha**: 2026-01-07  
> **Estado**: 📋 Borrador  
> **Effort estimado**: 55 pts (~8-10 días dev)

---

## Resumen Ejecutivo

Integración completa del ecosistema de comunicación Socket.IO (mcp-channels-sdk) con los servidores MCP existentes (mcp-mesh-sdk), unificando tipos en mcp-core-sdk y permitiendo que cualquier UI (Angular, React, vanilla) se conecte a cualquier servidor MCP via protocolo MASTER-ROOM.

---

## Mapa del Ecosistema Actual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ESTADO ACTUAL                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  mcp-core-sdk                    mcp-channels-sdk                           │
│  ├── types/                      ├── ws-server/                             │
│  │   ├── room-protocol.ts ✅     │   └── packages/                          │
│  │   ├── browser/ ✅             │       ├── aleph-script-core-browser/ ✅  │
│  │   └── mcp.ts ✅               │       ├── aleph-script-angular/ ✅       │
│  │                               │       └── socket-gym-demo/ ✅            │
│  └── client/                     │                                          │
│      ├── BaseRoomManager.ts ✅   └── socket.io-admin-ui/ ✅                 │
│      ├── AlephScriptClient.ts ⚠️                                            │
│      └── SocketClient.ts ✅                                                 │
│                                                                             │
│  mcp-mesh-sdk                    AAIAGallery                                │
│  ├── DevOpsServer ⚠️             └── alephscript/                           │
│  │   └── proserpinaBot ❌           └── apps/app.ts                         │
│  ├── MCPPrologServer ❌               └── spider pattern ✅                 │
│  └── plugins/                                                               │
│      └── DevOpsRoomPlugin ⚠️                                                │
│                                                                             │
│  UIs existentes (Angular)                                                   │
│  ├── BlocklyEditor/blockly-gamify-ui ⚠️ (implementación propia)            │
│  ├── WiringEditor/node-red-gamify-ui ⚠️ (sin AlephScript)                  │
│  ├── PrologEditor/frontend ❌ (REST only)                                   │
│  └── Zeus UI ❌ (sin Socket.IO)                                             │
│                                                                             │
│  Leyenda: ✅ Funcional | ⚠️ Parcial | ❌ Falta                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Arquitectura Objetivo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ARQUITECTURA OBJETIVO                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         mcp-core-sdk (SINGLE SOURCE)                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  types/                 client/                 server/              │   │
│  │  ├── room-protocol.ts   ├── SocketClient.ts     └── (future)        │   │
│  │  ├── browser/           ├── BaseRoomManager.ts                       │   │
│  │  ├── mcp.ts             └── BaseMCPClient.ts                         │   │
│  │  └── index.ts                                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                    ┌───────────────┴───────────────┐                        │
│                    ▼                               ▼                        │
│  ┌─────────────────────────────┐   ┌─────────────────────────────────┐     │
│  │      mcp-channels-sdk      │   │        mcp-mesh-sdk             │     │
│  │  (RUNTIME SOCKET.IO)       │   │  (MCP SERVERS + SOCKET CLIENT)  │     │
│  ├─────────────────────────────┤   ├─────────────────────────────────┤     │
│  │  client/                   │   │  servers/                       │     │
│  │  ├── AlephScriptClient.ts  │   │  ├── DevOpsServer + RoomMgr     │     │
│  │  └── SpiderClient.ts       │   │  ├── MCPPrologServer + RoomMgr  │     │
│  │                            │   │  └── ...                        │     │
│  │  packages/                 │   │                                 │     │
│  │  ├── @alephscript/angular  │   │  plugins/                       │     │
│  │  └── @alephscript/core-br  │   │  └── DevOpsRoomPlugin           │     │
│  └─────────────────────────────┘   └─────────────────────────────────┘     │
│                    │                               │                        │
│                    └───────────────┬───────────────┘                        │
│                                    ▼                                        │
│                    ┌─────────────────────────────────┐                      │
│                    │        Socket.IO Mesh           │                      │
│                    │      (puerto 3010 /runtime)     │                      │
│                    └─────────────────────────────────┘                      │
│                                    │                                        │
│         ┌──────────────────────────┼──────────────────────────┐            │
│         ▼                          ▼                          ▼            │
│  ┌────────────┐            ┌────────────┐            ┌────────────┐        │
│  │ DevOps     │            │ Prolog     │            │ StateMach  │        │
│  │ _ROOM      │            │ _ROOM      │            │ _ROOM      │        │
│  │ (MASTER)   │            │ (MASTER)   │            │ (MASTER)   │        │
│  └────────────┘            └────────────┘            └────────────┘        │
│         ▲                          ▲                          ▲            │
│         │                          │                          │            │
│  ┌──────┴──────┐           ┌──────┴──────┐           ┌──────┴──────┐      │
│  │ BlocklyUI   │           │ PrologUI    │           │ ZeusUI      │      │
│  │ (Angular)   │           │ (Angular)   │           │ (React?)    │      │
│  └─────────────┘           └─────────────┘           └─────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Stories y Tasks

### Story 1: Unificación de Tipos (8 pts)

> **Objetivo**: Eliminar duplicados y centralizar todos los tipos en mcp-core-sdk

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 1.1 | Eliminar tipos duplicados en channels-sdk/core-browser | `types.ts` | 2 |
| 1.2 | Re-exportar desde mcp-core-sdk en core-browser | `index.ts` | 1 |
| 1.3 | Actualizar imports en aleph-script-angular | `*.ts` | 2 |
| 1.4 | Actualizar imports en socket-gym-demo | `*.ts` | 1 |
| 1.5 | Verificar build de todos los paquetes | `npm run build` | 2 |

**Dependencias**: Ninguna  
**Riesgo**: Breaking changes en paquetes publicados

---

### Story 2: Completar AlephScriptClient en core-sdk (5 pts)

> **Objetivo**: El cliente en core-sdk debe tener paridad con el de channels-sdk

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 2.1 | Migrar métodos de channels → core | `AlephScriptClient.ts` | 3 |
| 2.2 | Añadir factory functions | `index.ts` | 1 |
| 2.3 | Tests unitarios | `AlephScriptClient.spec.ts` | 1 |

**Dependencias**: Story 1  
**Riesgo**: Bajo

---

### Story 3: Migrar Spider Pattern de AAIAGallery (5 pts)

> **Objetivo**: Extraer el patrón "spider" funcional a channels-sdk

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 3.1 | Crear SpiderClient basado en AAIAGallery/app.ts | `SpiderClient.ts` | 2 |
| 3.2 | Integrar con BaseRoomManager | `SpiderClient.ts` | 2 |
| 3.3 | Documentar patrón spider | `README.md` | 1 |

**Dependencias**: Story 2  
**Patrón origen**:
```typescript
// AAIAGallery/alephscript/src/FIA/engine/apps/app.ts
spider: AlephScriptClient;
conectarEntorno() {
    this.spider = new AlephScriptClient(this.nombre)
    this.spider.initTriggersDefinition.push(() => {
        this.spider.io.emit("CLIENT_REGISTER", {...});
        this.spider.io.emit("CLIENT_SUSCRIBE", { room: this.getRoomName()});
        this.spider.room("MAKE_MASTER", { features: this.bots.map(b => b.nombre)}, this.getRoomName());
    })
}
```

---

### Story 4: Activar DevOpsRoomPlugin Completo (8 pts)

> **Objetivo**: DevOpsServer expone capabilities via Socket.IO

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 4.1 | Importar tipos de core-sdk (eliminar inline) | `DevOpsRoomPlugin.ts` | 2 |
| 4.2 | Instanciar BaseRoomManager en plugin | `DevOpsRoomPlugin.ts` | 2 |
| 4.3 | Activar ProserpinaBot en DevOpsServerImpl | `DevOpsServerImpl.ts` | 2 |
| 4.4 | Test E2E: UI conecta y lista capabilities | `e2e/` | 2 |

**Dependencias**: Story 1, 2  
**Capabilities a exponer**:
- `GET_SERVER_STATUS` - Estado de servidores MCP
- `GET_PLUGIN_LIST` - Plugins instalados
- `GET_TASK_LIST` - Tasks de VS Code
- `GET_AGENT_LIST` - Agentes del Scriptorium
- `GET_ROOM_MEMBERS` - Miembros conectados

---

### Story 5: Socket Client para MCPPrologServer (8 pts)

> **Objetivo**: PrologEditor puede interactuar via Socket.IO además de REST

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 5.1 | Crear PrologRoomManager extendiendo Base | `PrologRoomManager.ts` | 3 |
| 5.2 | Definir PROLOG_CAPABILITIES | `types.ts` | 1 |
| 5.3 | Integrar en MCPPrologServer | `MCPPrologServer.ts` | 2 |
| 5.4 | Test E2E: query via Socket | `e2e/` | 2 |

**Dependencias**: Story 4  
**Capabilities a exponer**:
- `PROLOG_QUERY` - Ejecutar consulta
- `PROLOG_ASSERT` - Añadir hecho
- `PROLOG_RETRACT` - Eliminar hecho
- `PROLOG_LOAD_FILE` - Cargar archivo .pl
- `PROLOG_GET_SESSIONS` - Listar sesiones

---

### Story 6: Integrar @alephscript/angular en UIs (13 pts)

> **Objetivo**: Las UIs Angular usan el módulo oficial en lugar de implementaciones propias

| # | Task | UI | Effort |
|---|------|-----|--------|
| 6.1 | Refactorizar BlocklyEditor gamify-ui | `aleph-script.service.ts` | 3 |
| 6.2 | Añadir AlephScriptModule a PrologEditor frontend | `app.module.ts` | 3 |
| 6.3 | Añadir AlephScriptModule a WiringEditor gamify-ui | `app.module.ts` | 3 |
| 6.4 | Crear componentes compartidos (connection-status) | `components/` | 2 |
| 6.5 | Documentar integración Angular | `docs/` | 2 |

**Dependencias**: Story 1  
**Patrón actual en BlocklyEditor** (a reemplazar):
```typescript
// Implementación propia - REEMPLAZAR
import { io, Socket } from 'socket.io-client';
@Injectable()
export class AlephScriptService {
  private socket: Socket | null = null;
  // ...
}

// Por módulo oficial:
import { AlephScriptModule, AlephScriptService } from '@alephscript/angular';
```

---

### Story 7: Mesh Orchestration (8 pts)

> **Objetivo**: SocketIoMesh coordina múltiples rooms y servidores

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 7.1 | Crear SocketIoMesh en channels-sdk | `SocketIoMesh.ts` | 3 |
| 7.2 | Registrar rooms automáticamente | `SocketIoMesh.ts` | 2 |
| 7.3 | API para discovery de capabilities | `mesh-api.ts` | 2 |
| 7.4 | Test E2E: mesh con 3 rooms | `e2e/` | 1 |

**Dependencias**: Story 4, 5  
**API propuesta**:
```typescript
GET /mesh/rooms           → Lista de rooms activas
GET /mesh/rooms/:id       → Capabilities de una room
POST /mesh/invoke/:room   → Invocar capability
```

---

## Resumen de Esfuerzo

| Story | Nombre | Pts | Dependencias |
|-------|--------|-----|--------------|
| S1 | Unificación de Tipos | 8 | — |
| S2 | AlephScriptClient core-sdk | 5 | S1 |
| S3 | Spider Pattern | 5 | S2 |
| S4 | DevOpsRoomPlugin | 8 | S1, S2 |
| S5 | MCPPrologServer Socket | 8 | S4 |
| S6 | Angular Integration | 13 | S1 |
| S7 | Mesh Orchestration | 8 | S4, S5 |

**Total**: 55 pts

---

## Diagrama de Dependencias

```
S1 ──────┬──────────────────────────────────► S6
         │
         ├──► S2 ──► S3
         │     │
         │     └──► S4 ──► S5 ──┐
         │          │           │
         └──────────┴───────────┴──► S7
```

---

## Orden de Ejecución Sugerido

1. **Semana 1**: S1 + S2 (tipos y cliente base) — 13 pts
2. **Semana 2**: S4 + S3 (DevOps activo + spider) — 13 pts  
3. **Semana 3**: S5 + S6 (Prolog socket + Angular UIs) — 21 pts
4. **Semana 4**: S7 (mesh orchestration) — 8 pts

---

## Criterios de Aceptación

### DoD por Story

- [ ] Código compila sin errores (`npm run build`)
- [ ] Tests pasan (`npm test`)
- [ ] No hay tipos duplicados entre SDKs
- [ ] Documentación actualizada
- [ ] Al menos 1 UI puede conectar y listar capabilities

### DoD Épica

- [ ] DevOpsServer expone capabilities via MASTER-ROOM
- [ ] MCPPrologServer expone capabilities via MASTER-ROOM
- [ ] BlocklyEditor UI conecta via @alephscript/angular
- [ ] PrologEditor UI conecta via @alephscript/angular
- [ ] Mesh discovery funciona (`GET /mesh/rooms`)

---

## Riesgos

| Riesgo | Mitigación | Impacto |
|--------|------------|---------|
| Breaking changes en tipos | Versionar paquetes npm | Alto |
| Socket.IO server no disponible | Fallback mode en UIs | Medio |
| Múltiples rooms colisionan | Namespaces por servidor | Bajo |

---

## Notas Técnicas

### Protocolo MASTER-ROOM

```
1. Cliente se conecta al mesh (puerto 3010, namespace /runtime)
2. Cliente emite CLIENT_REGISTER con usuario/sesión
3. Cliente emite CLIENT_SUSCRIBE a una room
4. Cliente emite MAKE_MASTER con features (capabilities)
5. Otros clientes pueden:
   a) GET_CAPABILITIES → lista de capabilities
   b) Emitir GET_* → master responde con SET_*
```

### Puertos del Ecosistema

| Servicio | Puerto | Protocolo |
|----------|--------|-----------|
| Socket.IO Mesh | 3010 | WebSocket |
| DevOpsServer | 3003 | REST + Socket |
| MCPPrologServer | 3006 | REST + Socket |
| MCPLauncherServer | 3050 | REST |
| Zeus UI | 3012 | HTTP |
| BlocklyEditor UI | 4200 | HTTP |
| PrologEditor UI | 5001 | HTTP |

---

## Referencias

- [room-protocol.ts](MCPGallery/mcp-core-sdk/src/types/room-protocol.ts) - Tipos del protocolo
- [BaseRoomManager.ts](MCPGallery/mcp-core-sdk/src/client/BaseRoomManager.ts) - Implementación base
- [DevOpsRoomPlugin.ts](MCPGallery/mcp-mesh-sdk/src/plugins/DevOpsRoomPlugin.ts) - Plugin existente
- [alephscript.service.ts](MCPGallery/mcp-channels-sdk/ws-server/packages/aleph-script-angular/src/lib/alephscript.service.ts) - Servicio Angular
- [app.ts (spider)](AAIAGallery/alephscript/src/FIA/engine/apps/app.ts) - Patrón spider original

---

**Autor**: @ox  
**Revisión**: Pendiente @scrum  
**Aprobación**: Pendiente PO
