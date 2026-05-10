---
name: AAIA Editor (Runtime de Agentes Autónomos)
description: Instrucciones para operar el Runtime AAIA, crear sesiones con FIAs y mundos, e integrar vía MCP y Socket.IO.
applyTo: "ARCHIVO/PLUGINS/AAIA_EDITOR/**/*.json, .github/plugins/aaia-editor/**/*.md, AAIAGallery/**/*"
---

# Instrucciones: Plugin AAIA Editor

> **Fuente de verdad**: `ARCHIVO/PLUGINS/AAIA_EDITOR/`  
> **Submódulo**: `AAIAGallery/`  
> **Puerto MCP**: 3007

---

## Stack MCP

| Capa | Puerto | Fuente |
|------|--------|--------|
| **MCP Server** | 3007 | `MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts` |
| **Session Manager** | — | `MCPGallery/mcp-mesh-sdk/src/managers/AAIASessionManager.ts` |
| **Socket.IO Bot** | — | `MCPGallery/mcp-mesh-sdk/src/bots/PersefonBot.ts` |
| **Tipos DRY** | — | `MCPGallery/mcp-core-sdk/src/types/aaia/` |

---

## Arquitectura del Runtime

### Clases Principales

```typescript
// AAIAGallery/alephscript/src/FIA/engine/kernel/runtime.ts
class Runtime extends SocketAdapter {
  static threads: iFIA[] = [];  // FIAs activas
  
  start(): void;      // Inicializar runtime
  demo(): void;       // REPL de demostración
}

// AAIAGallery/alephscript/src/FIA/iFIA.ts
interface iFIA {
  nombre: string;
  mundo: IMundo;
  runState: RunState;
  runStateEvent: Subject<RunState>;
  
  razona(): IResultado;
  instanciar(): iFIA;
  abstrae(): string;
}

// AAIAGallery/alephscript/src/FIA/mundos/IMundo.ts
interface IMundo {
  modelo: IModelo;
  runState: RunState;
  
  ciclo(): void;
  eferencia: Subject<any>;
  aferencias: Subscription[];
}
```

### Problema: Runtime.threads es estático

El `threads[]` es estático, lo que impide aislamiento de sesiones. 

**Solución propuesta** (Spike AAIA-SPIKE-001):

```typescript
// Opción A: Factory Pattern
class FIAFactory {
  createFIA(config: FIAConfig): iFIA {
    return new FIA(config); // Nueva instancia
  }
}

// Opción B: Pool Pattern
class RuntimePool {
  private pool: Map<string, Runtime> = new Map();
  
  acquire(sessionId: string): Runtime {
    if (!this.pool.has(sessionId)) {
      this.pool.set(sessionId, new Runtime());
    }
    return this.pool.get(sessionId);
  }
}
```

---

## Protocolo MCP

### Crear Sesión

```typescript
// Tool: aaia_create_session
{
  name: "aaia_create_session",
  description: "Crea nueva sesión AAIA con un appId",
  inputSchema: {
    type: "object",
    properties: {
      appId: { type: "string", description: "ID de la app a cargar" }
    },
    required: ["appId"]
  }
}

// Response
{
  sessionId: "uuid-v4",
  appId: "demo-logica",
  status: "created",
  fias: [
    { index: 0, nombre: "FIA-Logica", paradigma: "logica", runState: "STOP" }
  ],
  mundo: { nombre: "Mundo-Demo", runState: "STOP" }
}
```

### Step FIA

```typescript
// Tool: aaia_step_fia
{
  name: "aaia_step_fia",
  description: "Ejecuta un paso de razonamiento en una FIA",
  inputSchema: {
    type: "object",
    properties: {
      sessionId: { type: "string" },
      fiaIndex: { type: "number" }
    },
    required: ["sessionId", "fiaIndex"]
  }
}

// Response
{
  success: true,
  fiaIndex: 0,
  runState: "PLAY",
  eferencia: {
    tipo: "accion",
    payload: { motor: "start" }
  }
}
```

### Send Percepto

```typescript
// Tool: aaia_send_percepto
{
  name: "aaia_send_percepto",
  description: "Envía percepto al mundo de la sesión",
  inputSchema: {
    type: "object",
    properties: {
      sessionId: { type: "string" },
      percepto: { type: "object" }
    },
    required: ["sessionId", "percepto"]
  }
}

// Response
{
  success: true,
  percepto: { sensor: "luz", valor: "on" },
  fiasNotified: [0, 1]
}
```

---

## Protocolo Socket.IO

### PersefonBot

```typescript
// MCPGallery/mcp-mesh-sdk/src/bots/PersefonBot.ts
class PersefonBot extends AlephScriptClient {
  constructor() {
    super({
      room: 'AAIA_ROOM',
      mode: 'MASTER'
    });
  }

  capabilities: AAIACapability[] = [
    'FIA_STEP',
    'PERCEPTO',
    'EFERENCIA',
    'MUNDO_QUERY',
    'SESSION_INFO'
  ];

  // Handlers
  onFIAStep(sessionId: string, fiaIndex: number): void;
  onPercepto(sessionId: string, percepto: object): void;
  onMundoQuery(sessionId: string): IMundoState;
}
```

### Eventos

| Evento | Dirección | Payload |
|--------|-----------|---------|
| `FIA_STEP` | Bot → Observers | `{ sessionId, fiaIndex, eferencia }` |
| `PERCEPTO` | Client → Bot | `{ sessionId, percepto }` |
| `EFERENCIA` | Bot → Client | `{ sessionId, fiaIndex, eferencia }` |
| `MUNDO_STATE` | Bot → Observers | `{ sessionId, mundo }` |
| `SESSION_CREATED` | Bot → Observers | `{ sessionId, appId }` |
| `SESSION_DESTROYED` | Bot → Observers | `{ sessionId }` |

---

## Integración con Prolog

Las FIAs de paradigma `logica` pueden delegar razonamiento a MCPPrologServer:

```typescript
// En AAIASessionManager
async stepFIALogica(sessionId: string, fiaIndex: number): Promise<IResultado> {
  const session = this.sessions.get(sessionId);
  const fia = session.threads[fiaIndex];
  
  if (fia.paradigma === 'logica' && fia.prologSessionId) {
    // Delegar a Prolog
    const query = fia.buildPrologQuery();
    const result = await this.prologClient.query(fia.prologSessionId, query);
    return this.parsePrologResult(result);
  }
  
  // Ejecución nativa
  return fia.razona();
}
```

---

## Integración con TypedPrompting

Validar estructura de perceptos y eferencias:

```typescript
// Schema para percepto
const perceptoSchema = {
  $id: "aaia-percepto",
  type: "object",
  properties: {
    tipo: { enum: ["sensor", "evento", "comando"] },
    fuente: { type: "string" },
    payload: { type: "object" }
  },
  required: ["tipo", "payload"]
};

// Validar antes de enviar
const isValid = await typedPromptClient.validate(percepto, "aaia-percepto");
```

---

## Apps Predefinidas

| App ID | Descripción | FIAs |
|--------|-------------|------|
| `demo-logica` | Demo de FIA lógica | 1 FIA Prolog |
| `demo-sbr` | Demo de FIA basada en reglas | 1 FIA SBR |
| `demo-situada` | Demo de FIA IoT | 2 FIAs sensores |
| `demo-hibrida` | Demo combinada | 3 FIAs mixtas |

---

## Buenas Prácticas

### BP-01: Crear sesión antes de operar

```typescript
// ✅ Correcto
const session = await aaia_create_session({ appId: "demo" });
await aaia_step_fia({ sessionId: session.sessionId, fiaIndex: 0 });

// ❌ Incorrecto
await aaia_step_fia({ sessionId: "inventado", fiaIndex: 0 });
```

### BP-02: Destruir sesiones al terminar

```typescript
// Evitar memory leaks
await aaia_destroy_session({ sessionId });
```

### BP-03: Usar TypedPrompting para validar

```typescript
// Validar perceptos antes de enviar
const percepto = { tipo: "sensor", payload: { luz: "on" } };
const valid = await typed_validate_message({ data: percepto, schemaId: "aaia-percepto" });
if (!valid.isValid) throw new Error(valid.errors);
```

---

## Limitaciones Conocidas

| Limitación | Workaround | Estado |
|------------|------------|--------|
| Runtime.threads estático | Factory pattern (spike) | 🔴 Pendiente |
| Sesiones no persistentes | Serializar a disco | 🟡 Planificado |
| FIAs no clonan memoria | Deep copy manual | 🟡 Planificado |

---

## Referencias

- [Backlog MCP-AAIA-SERVER-1.0.0](../../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_18_MCP_AAIA_Server/01_backlog-borrador.md)
- [Sesión Cotrabajo](../../../ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/)
- [AAIAGallery README](../../../AAIAGallery/README-SCRIPTORIUM.md)
- [FIA Catalog](../../../AAIAGallery/fia-catalog.json)
