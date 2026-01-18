# Mapa Técnico: Stack MCP-SDK → Editor

> **Sesión**: MCP-AAIA-SERVER-1.0.0 (extensión T007)  
> **Fecha**: 2026-01-18  
> **Objetivo**: Documentar relación arquitectónica entre capas del stack

---

## 1. Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              CAPA 1: mcp-core-sdk                                       │
│                        (Tipos compartidos + Browser exports)                            │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│   src/types/                                                                            │
│   ├── prolog/index.ts      → PrologSession, QueryResponse, Rule, Template...           │
│   ├── aaia/index.ts        → RunStateEnum, IFIAInfo, IPercepto, AAIASession...          │
│   ├── typed-prompts/       → OntologySchema, ValidationResult...                        │
│   ├── mcp.ts               → MCPServerCapabilities, MCPEvent...                         │
│   └── room-protocol.ts     → MASTER-ROOM protocol types                                 │
│                                                                                         │
│   src/browser/index.ts     → BROWSER-SAFE exports (sin Node.js deps)                    │
│                              Angular/React/vanilla pueden importar de aquí              │
│                                                                                         │
│   PUBLISH: @alephscript/mcp-core-sdk (npm)                                              │
│   PORTS: N/A (solo tipos)                                                               │
│                                                                                         │
└────────────────────────────────────────────────┬────────────────────────────────────────┘
                                                 │
                    ┌────────────────────────────┴────────────────────────────┐
                    │                            │                            │
                    ▼                            ▼                            ▼
┌───────────────────────────────┐  ┌───────────────────────────────┐  ┌────────────────────┐
│   MCPPrologServer             │  │   MCPAAIAServer               │  │  MCPTypedPrompt    │
│   (mcp-mesh-sdk)              │  │   (mcp-mesh-sdk)              │  │  Server            │
│                               │  │                               │  │  (mcp-mesh-sdk)    │
│   Puerto: 3006                │  │   Puerto: 3007                │  │  Puerto: 3020      │
│                               │  │                               │  │                    │
│   Bot: EuridiceBot            │  │   Bot: PersefonBot            │  │  Bot: ThetisBot    │
│   Room: PROLOG_ROOM           │  │   Room: AAIA_ROOM             │  │  Room: TYPED_ROOM  │
│                               │  │                               │  │                    │
│   Tools MCP: 12               │  │   Tools MCP: 9                │  │  Tools MCP: 8      │
│   Resources: 6                │  │   Resources: 3                │  │  Resources: 4      │
│   Prompts: 8                  │  │   Prompts: 3                  │  │  Prompts: 5        │
└───────────────┬───────────────┘  └───────────────┬───────────────┘  └────────────────────┘
                │                                  │
                │ REST API                         │ REST API (pendiente)
                │ + Socket.IO                      │ + Socket.IO
                ▼                                  ▼
┌───────────────────────────────┐  ┌───────────────────────────────┐
│   PrologEditor/backend        │  │   AAIAGallery/backend         │
│   (Express Gateway)           │  │   (Por integrar)              │
│                               │  │                               │
│   Puerto: 8000                │  │   Puerto: TBD                 │
│                               │  │                               │
│   Rutas REST:                 │  │   Rutas REST:                 │
│   /api/rules                  │  │   /api/apps                   │
│   /api/sessions               │  │   /api/sessions               │
│   /api/run-rule               │  │   /api/fias                   │
│   /api/mcp-templates          │  │   /api/mundo                  │
│   /api/telemetry              │  │                               │
│                               │  │                               │
│   SQLite: rules, apps, users  │  │   Persistencia: TBD           │
└───────────────┬───────────────┘  └───────────────┬───────────────┘
                │                                  │
                │ HTTP                             │ HTTP + Socket.IO
                ▼                                  ▼
┌───────────────────────────────┐  ┌───────────────────────────────┐
│   PrologEditor/frontend       │  │   AAIAGallery/frontend        │
│   (Angular 18)                │  │   (Angular 18)                │
│                               │  │                               │
│   Puerto: 4000                │  │   Puerto: 4200                │
│                               │  │                               │
│   IMPORTA DESDE:              │  │   IMPORTA DESDE:              │
│   @alephscript/mcp-core-sdk   │  │   Paths relativos (PENDIENTE) │
│   /browser                    │  │   ../ws-server/src/...        │
│                               │  │   ../alephscript/src/...      │
│   Componentes:                │  │                               │
│   - session-manager           │  │   Servicios Socket.IO:        │
│   - rule-editor               │  │   - ServerService             │
│   - brain-editor              │  │   - SalaService               │
│   - mcp-templates-browser     │  │   - UsuarioService            │
│   - telemetry-monitor         │  │                               │
│                               │  │   Páginas:                    │
│   Servicios:                  │  │   - iot-logic-engine          │
│   - PrologService             │  │   - inet-app                  │
│   - TelemetryService          │  │   - an-sindic-model-vf        │
│                               │  │   - alephkads                 │
└───────────────────────────────┘  └───────────────────────────────┘
```

---

## 2. Flujo de Datos: Prolog Stack

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           PROLOG STACK FLOW                                │
└────────────────────────────────────────────────────────────────────────────┘

1. TIPOS (Compile-time)
   ─────────────────────
   mcp-core-sdk/types/prolog/index.ts
         │
         ├──→ PrologSession, QueryResponse, Rule...
         │
         ▼
   mcp-mesh-sdk/MCPPrologServer.ts (usa tipos + implementa runtime)
         │
         ▼
   PrologEditor/frontend/src/app/models/*.ts (re-exporta desde mcp-core-sdk/browser)


2. REST API (Runtime)
   ───────────────────
   Frontend                    Backend (8000)              MCP Server (3006)
   ─────────                   ───────────────             ─────────────────
   PrologService.runRule()
         │
         │ POST /api/run-rule
         ▼
   api.routes.ts → PrologController.runRule()
         │
         │ Internal call / HTTP forward
         ▼
   MCPPrologServer.handleQueryProlog()
         │
         │ SWI-Prolog engine
         ▼
   QueryResponse { success, payload[] }


3. ASYNC API (Socket.IO)
   ──────────────────────
   Frontend                    MCP Server (3006)
   ─────────                   ─────────────────
   (No implementado aún)       EuridiceBot conectado a PROLOG_ROOM
                               │
                               │ MASTER con capabilities:
                               ▼
                               - PROLOG_QUERY
                               - PROLOG_ASSERT
                               - PROLOG_RETRACT
                               - PROLOG_LOAD_FILE
                               - PROLOG_GET_SESSIONS
                               - PROLOG_CREATE_SESSION
                               - PROLOG_DESTROY_SESSION
```

---

## 3. Flujo de Datos: AAIA Stack

```
┌────────────────────────────────────────────────────────────────────────────┐
│                            AAIA STACK FLOW                                 │
└────────────────────────────────────────────────────────────────────────────┘

1. TIPOS (Compile-time)
   ─────────────────────
   mcp-core-sdk/types/aaia/index.ts
         │
         ├──→ RunStateEnum, IFIAInfo, IPercepto, IEferencia...
         │
         ▼
   mcp-mesh-sdk/MCPAAIAServer.ts (usa tipos + implementa runtime)
         │
         ▼
   AAIAGallery/frontend/src/app/??? (PENDIENTE: migrar a mcp-core-sdk/browser)


2. REST API (Runtime - PENDIENTE)
   ───────────────────────────────
   Frontend                    Backend (TBD)               MCP Server (3007)
   ─────────                   ─────────────               ─────────────────
   AAIAService.createSession()  (NO EXISTE AÚN)           aaia_create_session
         │
         │ POST /api/sessions
         ▼
   (Gateway pendiente)
         │
         │ Internal call
         ▼
   MCPAAIAServer.handleCreateSession()


3. ASYNC API (Socket.IO - YA EXISTE PARCIAL)
   ──────────────────────────────────────────
   Frontend                    MCP Server (3007)
   ─────────                   ─────────────────
   ServerService               PersefonBot conectado a AAIA_ROOM
         │                            │
         │ SocketClient               │ MASTER con capabilities:
         │ AlephScriptClient          ▼
         ▼                            - AAIA_GET_APPS
   io.emit("GET_LIST_OF_THREADS")     - AAIA_CREATE_SESSION
   io.on("SET_LIST_OF_THREADS")       - AAIA_LIST_FIAS
                                      - AAIA_STEP_FIA
                                      - AAIA_SEND_PERCEPTO
                                      - AAIA_QUERY_MUNDO
                                      ... (13 total)
```

---

## 4. Comparativa: PrologEditor vs AAIAGallery Frontend

| Aspecto | PrologEditor/frontend | AAIAGallery/frontend |
|---------|----------------------|---------------------|
| **Angular version** | 18.2.21 | 18.1.0 |
| **Tipos compartidos** | ✅ `@alephscript/mcp-core-sdk/browser` | ❌ Paths relativos (`../ws-server/...`) |
| **REST API** | ✅ PrologService → Backend 8000 | ❌ No existe servicio REST |
| **Socket.IO** | ⏳ Preparado (no activo) | ✅ ServerService activo |
| **Componentes** | 10 componentes especializados | Páginas ejemplo + Socket.IO base |
| **Modelos** | Re-export desde mcp-core-sdk | Interfaces locales dispersas |

---

## 5. Gap Analysis: Integración AAIAGallery/frontend

### 5.1 Problema Actual

AAIAGallery/frontend usa **paths relativos** para importar tipos:

```typescript
// AAIAGallery/frontend/src/app/services/socketio/server.service.ts
import { IServerState } from "../../../../../ws-server/src/alephscript/IServerState";
import { IRuntimeBlock } from '../../../../../ws-server/src/alephscript/IRuntimeBlock';
import { IAppState } from '../../../../../ws-server/src/alephscript/IAppState';
```

**Problemas**:
1. ❌ Tipos no versionados
2. ❌ No browser-safe (podrían tener deps Node.js)
3. ❌ Build frágil (paths absolutos)
4. ❌ No reutilizables por otros frontends

### 5.2 Solución: Migrar a mcp-core-sdk/browser

**Paso 1**: Añadir tipos AAIA a `mcp-core-sdk/src/types/aaia/index.ts` (✅ HECHO)

**Paso 2**: Exportar en `mcp-core-sdk/src/browser/index.ts`:

```typescript
// Añadir a browser/index.ts
export type {
  RunStateEnum,
  FIAParadigma,
  IPercepto,
  IEferencia,
  IFIAInfo,
  IMundoState,
  AAIASession,
  AAIASessionMeta,
  IAAIAApp,
} from '../types/aaia';
```

**Paso 3**: Crear modelos en AAIAGallery/frontend (patrón Prolog):

```typescript
// AAIAGallery/frontend/src/app/models/aaia.model.ts
export type {
  RunStateEnum,
  IFIAInfo,
  IPercepto,
  AAIASession,
} from '@alephscript/mcp-core-sdk/browser';
```

**Paso 4**: Instalar mcp-core-sdk en AAIAGallery/frontend:

```bash
cd AAIAGallery/frontend
npm install ../MCPGallery/mcp-core-sdk
```

---

## 6. Arquitectura Objetivo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          @alephscript/mcp-core-sdk                          │
│                                                                             │
│   /browser export                                                           │
│   ├── Prolog types (✅)                                                      │
│   ├── AAIA types (✅ - añadidos en T005)                                     │
│   ├── TypedPrompt types (✅)                                                 │
│   └── MCP types (✅)                                                         │
│                                                                             │
└──────────────────────────────────────────┬──────────────────────────────────┘
                                           │
       ┌───────────────────────────────────┼───────────────────────────────────┐
       │                                   │                                   │
       ▼                                   ▼                                   ▼
┌──────────────────┐              ┌──────────────────┐              ┌──────────────────┐
│  PrologEditor    │              │  AAIAGallery     │              │  TypedPrompts    │
│  /frontend       │              │  /frontend       │              │  Editor          │
│                  │              │                  │              │                  │
│  models/         │              │  models/         │              │  models/         │
│  ├── session.ts  │              │  ├── aaia.ts     │              │  ├── ontology.ts │
│  ├── rule.ts     │              │  ├── fia.ts      │              │  ├── schema.ts   │
│  └── (re-export) │              │  └── (re-export) │              │  └── (re-export) │
│                  │              │                  │              │                  │
│  import from:    │              │  import from:    │              │  import from:    │
│  mcp-core-sdk/   │              │  mcp-core-sdk/   │              │  mcp-core-sdk/   │
│  browser         │              │  browser         │              │  browser         │
└──────────────────┘              └──────────────────┘              └──────────────────┘
```

---

## 7. Stories Derivadas (para T008)

| ID | Story | Effort | Prioridad |
|----|-------|--------|-----------|
| S10 | Exportar tipos AAIA en browser/index.ts | 2 pts | Alta |
| S11 | Crear models/ en AAIAGallery/frontend | 3 pts | Alta |
| S12 | Instalar mcp-core-sdk en AAIAGallery | 2 pts | Alta |
| S13 | Migrar ServerService a tipos mcp-core-sdk | 5 pts | Media |
| S14 | Crear AAIAService (patrón PrologService) | 8 pts | Media |
| S15 | Añadir backend gateway AAIAGallery | 13 pts | Baja |

**Total**: 33 pts adicionales para alineación completa

---

## 8. Referencias

| Archivo | Propósito |
|---------|-----------|
| [mcp-core-sdk/src/browser/index.ts](../../../MCPGallery/mcp-core-sdk/src/browser/index.ts) | Exports browser-safe |
| [mcp-core-sdk/src/types/prolog/index.ts](../../../MCPGallery/mcp-core-sdk/src/types/prolog/index.ts) | Tipos Prolog (referencia) |
| [mcp-core-sdk/src/types/aaia/index.ts](../../../MCPGallery/mcp-core-sdk/src/types/aaia/index.ts) | Tipos AAIA |
| [PrologEditor/frontend/src/app/models/](../../../PrologEditor/frontend/src/app/models/) | Patrón a seguir |
| [MCPPrologServer.ts](../../../MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts) | Servidor patrón |
| [MCPAAIAServer.ts](../../../MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts) | Servidor AAIA |

