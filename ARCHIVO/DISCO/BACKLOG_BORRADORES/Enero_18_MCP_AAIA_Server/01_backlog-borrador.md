# Backlog Borrador: MCP AAIA Server

> **Épica**: MCP-AAIA-SERVER-1.0.0  
> **Sprint**: FC2  
> **Fecha**: 2026-01-18  
> **Estado**: � En Progreso  
> **Effort estimado**: 68 pts (~10-12 días dev)  
> **Effort completado**: 18 pts (plugin + specs + Lucas brain)  
> **Sesión cotrabajo**: [2026-01-18_mcp-aaia-server](../../SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/)

---

## ⚡ Progreso Rápido (T003)

> **Turno 3**: Implementación directa de artefactos (18 pts completados)

| Artefacto | Estado | Referencia |
|-----------|--------|------------|
| Plugin aaia-editor | ✅ Completo | `.github/plugins/aaia-editor/` |
| Bridge agent | ✅ Completo | `.github/agents/plugin_ox_aaiaeditor.agent.md` |
| OpenAPI spec | ✅ Completo | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/openapi.yaml` |
| AsyncAPI spec | ✅ Completo | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/asyncapi.yaml` |
| Tasks.json | ✅ Completo | `:3007` configurado |
| Lucas AAIA brain | ✅ Completo | `lucas-aaia.brain.ts` |
| TypedPrompt pack | ✅ Completo | `aaia-runtime-pack.json` (7 schemas) |
| Registry updates | ✅ Completo | registry.json, indice.agent.md, AGENTS.md |

### Deuda Técnica Pendiente

| ID | Descripción | Prioridad | Story |
|----|-------------|-----------|-------|
| DT-01 | Implementar MCPAAIAServer real | Alta | S3 |
| DT-02 | Implementar AAIASessionManager | Alta | S2 |
| DT-03 | Crear script start:aaia | Alta | S7 |
| DT-04 | Tests E2E | Media | S3 |
| DT-05 | Sync tipos as-core ↔ TypedPrompt | Media | S1 |

---

## Resumen Ejecutivo

Crear un servidor MCP que exponga el Runtime de AAIAGallery (FIAs + Mundos + Autómatas), permitiendo:

1. **Crear sesiones** con runtimes aislados de FIAs
2. **Operar FIAs** via MCP tools y Socket.IO (protocolo MASTER-ROOM)
3. **Integrar con ecosistema** existente (mcp-core-sdk, mcp-mesh-sdk)
4. **Vincular plugin** con submódulo AAIAGallery

El servidor sigue el patrón establecido por MCPPrologServer (sesiones + EuridiceBot).

---

## Arquitectura Objetivo

```
┌─────────────────────────────────────────────────────────────────┐
│                        MCPAAIAServer                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 AAIASessionManager                       │   │
│  │  ┌────────────────┐  ┌────────────────┐                 │   │
│  │  │ Session 1      │  │ Session 2      │  ...            │   │
│  │  │ ├── runtime    │  │ ├── runtime    │                 │   │
│  │  │ ├── activeFIA  │  │ ├── activeFIA  │                 │   │
│  │  │ └── mundo      │  │ └── mundo      │                 │   │
│  │  └────────────────┘  └────────────────┘                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌───────────────────────────┴───────────────────────────┐     │
│  │                    MCP Interface                       │     │
│  │  ┌─────────────────┐  ┌──────────────────────────────┐│     │
│  │  │ 12 Tools        │  │ 4 Resources                  ││     │
│  │  │ ├ create_session│  │ ├ sessions                   ││     │
│  │  │ ├ list_fias     │  │ ├ fia_catalog                ││     │
│  │  │ ├ select_fia    │  │ ├ mundo_state                ││     │
│  │  │ ├ step_fia      │  │ └ app_catalog                ││     │
│  │  │ ├ play_fia      │  └──────────────────────────────┘│     │
│  │  │ ├ pause_fia     │                                  │     │
│  │  │ ├ send_percepto │  ┌──────────────────────────────┐│     │
│  │  │ └ destroy_sess  │  │ 4 Prompts                    ││     │
│  │  └─────────────────┘  │ ├ create_fia_session         ││     │
│  │                       │ ├ run_fia_step               ││     │
│  │                       │ ├ configure_mundo            ││     │
│  │                       │ └ list_available_fias        ││     │
│  │                       └──────────────────────────────┘│     │
│  └───────────────────────────────────────────────────────┘     │
│                              │                                  │
│  ┌───────────────────────────┴───────────────────────────┐     │
│  │                   PersefonBot                          │     │
│  │          (Socket.IO Client - MASTER of AAIA_ROOM)      │     │
│  │                                                        │     │
│  │  Capabilities:                                         │     │
│  │  ├── AAIA_GET_APPS                                     │     │
│  │  ├── AAIA_CREATE_SESSION                               │     │
│  │  ├── AAIA_LIST_FIAS                                    │     │
│  │  ├── AAIA_START / AAIA_STEP / AAIA_PLAY / AAIA_PAUSE   │     │
│  │  ├── AAIA_SEND_PERCEPTO                                │     │
│  │  └── AAIA_GET_MUNDO_STATE                              │     │
│  └───────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │       Socket.IO Mesh           │
              │     (puerto 3010 /runtime)     │
              └────────────────────────────────┘
```

---

## Feature Cycles

| Ciclo | Objetivo | Effort | Estado |
|-------|----------|--------|--------|
| FC1 | Tipos + SessionManager base | 18 pts | � Parcial (tipos en TypedPrompt) |
| FC2 | MCP Tools completos | 22 pts | 🟡 Parcial (specs creados) |
| FC3 | Socket.IO + PersefonBot | 15 pts | 📋 Pendiente |
| FC4 | Plugin + Integración Agent Creator | 13 pts | ✅ Completo (plugin + Lucas brain) |

---

## Stories y Tasks

### Story 1: Definir Tipos en mcp-core-sdk (8 pts)

> **Objetivo**: Crear tipos compartidos para AAIA siguiendo patrón de `types/prolog/`

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 1.1 | Crear `types/aaia/index.ts` con interfaces base | `index.ts` | 2 |
| 1.2 | Definir `IAAIASessionMeta` | `index.ts` | 1 |
| 1.3 | Definir `IAAIAFIAInfo` | `index.ts` | 1 |
| 1.4 | Definir `IAAIAMundoState` | `index.ts` | 1 |
| 1.5 | Definir `IAAIAPercepto` y `IAAIAEferencia` | `index.ts` | 1 |
| 1.6 | Re-exportar desde `types/index.ts` | `types/index.ts` | 0.5 |
| 1.7 | Build y tests de tipos | `npm run build` | 1.5 |

**Dependencias**: Ninguna  
**Riesgo**: Bajo

**Interfaces propuestas**:

```typescript
// MCPGallery/mcp-core-sdk/src/types/aaia/index.ts

export interface IAAIASessionMeta {
    sessionId: string;
    appId: string;
    activeFIA: string | null;
    activeFIAIndex: number;
    runState: 'STOP' | 'PLAY' | 'PLAY_STEP' | 'PAUSE';
    createdAt: string;
    lastUsedAt: string;
    mundoNombre: string | null;
}

export interface IAAIAFIAInfo {
    index: number;
    nombre: string;
    paradigma: string;
    runAsync: boolean;
    capacidades: string[];
}

export interface IAAIAMundoState {
    nombre: string;
    runState: string;
    vivo: boolean;
    modelo: {
        dia: number;
        estado: Record<string, unknown>;
        dominio: Record<string, unknown>;
    };
    renderer?: string;
}

export interface IAAIAPercepto {
    tipo: string;
    datos: Record<string, unknown>;
    timestamp: string;
}

export interface IAAIAEferencia {
    accion: string;
    resultado: Record<string, unknown>;
    timestamp: string;
}

export interface IAAIAAppInfo {
    id: string;
    nombre: string;
    descripcion: string;
    fias: IAAIAFIAInfo[];
}
```

---

### Story 2: Crear AAIASessionManager (10 pts)

> **Objetivo**: Gestor de sesiones aisladas para FIAs

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 2.1 | Crear `services/AAIASessionManager.ts` | `AAIASessionManager.ts` | 3 |
| 2.2 | Implementar `createSession()` | `AAIASessionManager.ts` | 2 |
| 2.3 | Implementar `listFIAs()` | `AAIASessionManager.ts` | 1 |
| 2.4 | Implementar `selectFIA()` | `AAIASessionManager.ts` | 1 |
| 2.5 | Implementar `stepFIA()` | `AAIASessionManager.ts` | 1 |
| 2.6 | Implementar `sendPercepto()` | `AAIASessionManager.ts` | 1 |
| 2.7 | Implementar cleanup y `destroySession()` | `AAIASessionManager.ts` | 1 |

**Dependencias**: Story 1  
**Riesgo**: Alto (requiere entender aislamiento de Runtime)

**Código propuesto**:

```typescript
// MCPGallery/mcp-mesh-sdk/src/services/AAIASessionManager.ts

import { l } from "../Logger";
import { Runtime } from "../../../../AAIAGallery/alephscript/src/FIA/engine/kernel/runtime";
import { iFIA } from "../../../../AAIAGallery/alephscript/src/FIA/iFIA";
import { RunStateEnum } from "../../../../AAIAGallery/alephscript/src/FIA/mundos/RunStateEnum";
import { IAAIASessionMeta, IAAIAFIAInfo, IAAIAMundoState } from "@alephscript/mcp-core-sdk";

export interface AAIASession {
    sessionId: string;
    appId: string;
    createdAt: Date;
    lastUsedAt: Date;
    runtime: Runtime;
    activeFIA: iFIA | null;
    activeFIAIndex: number;
    runState: RunStateEnum;
}

export class AAIASessionManager {
    private sessions: Map<string, AAIASession> = new Map();
    private cleanupInterval: ReturnType<typeof setInterval> | null = null;
    private readonly SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

    constructor() {
        this.startCleanupRoutine();
        l.info("AAIASessionManager initialized");
    }

    async createSession(sessionId: string, appId: string): Promise<AAIASession> {
        if (this.sessions.has(sessionId)) {
            throw new Error(`Session ${sessionId} already exists`);
        }

        // Crear nuevo runtime (necesita factory para aislamiento)
        const runtime = new Runtime();
        runtime.start(); // Carga FIAs

        const session: AAIASession = {
            sessionId,
            appId,
            createdAt: new Date(),
            lastUsedAt: new Date(),
            runtime,
            activeFIA: null,
            activeFIAIndex: -1,
            runState: RunStateEnum.STOP,
        };

        this.sessions.set(sessionId, session);
        l.info(`Created AAIA session: ${sessionId} for app: ${appId}`);
        return session;
    }

    listFIAs(sessionId: string): IAAIAFIAInfo[] {
        const session = this.getSession(sessionId);
        if (!session) throw new Error(`Session ${sessionId} not found`);

        return Runtime.threads.map((fia, index) => ({
            index,
            nombre: fia.nombre,
            paradigma: this.inferParadigma(fia),
            runAsync: fia.runAsync,
            capacidades: fia.objetivos?.map(o => o.toString()) || [],
        }));
    }

    // ... más métodos
}
```

---

### Story 3: Crear MCPAAIAServer Base (8 pts)

> **Objetivo**: Servidor MCP con herramientas básicas

| # | Task | Archivo | Effort |
|---|------|---------|--------|
| 3.1 | Crear `MCPAAIAServer.ts` heredando de `BaseMCPServer` | `MCPAAIAServer.ts` | 2 |
| 3.2 | Crear `configs/DEFAULT_AAIA_MCP_SERVER_CONFIG.ts` | `configs/` | 1 |
| 3.3 | Implementar `setupTools()` - primera mitad | `MCPAAIAServer.ts` | 2 |
| 3.4 | Implementar `setupTools()` - segunda mitad | `MCPAAIAServer.ts` | 2 |
| 3.5 | Añadir script de arranque en `package.json` | `package.json` | 1 |

**Dependencias**: Story 2  
**Riesgo**: Bajo

**Config propuesta**:

```typescript
// MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_AAIA_MCP_SERVER_CONFIG.ts

import { MCPServerConfig } from "../MCPServerConfig";

export const DEFAULT_AAIA_MCP_SERVER_CONFIG: MCPServerConfig = {
    id: "aaia-mcp-server",
    name: "AAIA MCP Server",
    version: "1.0.0",
    description: "Exposes AAIAGallery Runtime (FIAs + Mundos) via MCP protocol",
    port: 3007,
    transportType: "stdio",
    tools: [
        "aaia_create_session",
        "aaia_list_sessions",
        "aaia_list_fias",
        "aaia_select_fia",
        "aaia_start_fia",
        "aaia_step_fia",
        "aaia_play_fia",
        "aaia_pause_fia",
        "aaia_get_mundo_state",
        "aaia_send_percepto",
        "aaia_destroy_session",
        "aaia_get_fia_catalog",
    ],
    resources: [
        "aaia://sessions",
        "aaia://fias/catalog",
        "aaia://apps",
    ],
    prompts: [
        "create_fia_session",
        "run_fia_step",
        "configure_mundo",
        "list_available_fias",
    ],
};
```

---

### Story 4: Implementar MCP Tools Completos (14 pts)

> **Objetivo**: Los 12 tools MCP del servidor

| # | Task | Descripción | Effort |
|---|------|-------------|--------|
| 4.1 | `aaia_create_session` | Crear sesión con runtime | 1 |
| 4.2 | `aaia_list_sessions` | Listar sesiones activas | 1 |
| 4.3 | `aaia_list_fias` | FIAs disponibles en sesión | 1 |
| 4.4 | `aaia_select_fia` | Activar FIA por índice | 1 |
| 4.5 | `aaia_start_fia` | Instanciar FIA (mundo) | 2 |
| 4.6 | `aaia_step_fia` | Ejecutar un paso | 2 |
| 4.7 | `aaia_play_fia` | Ejecutar continuo | 1 |
| 4.8 | `aaia_pause_fia` | Pausar ejecución | 1 |
| 4.9 | `aaia_get_mundo_state` | Estado actual del mundo | 1 |
| 4.10 | `aaia_send_percepto` | Enviar input al mundo | 2 |
| 4.11 | `aaia_destroy_session` | Destruir sesión | 0.5 |
| 4.12 | `aaia_get_fia_catalog` | Catálogo de paradigmas | 0.5 |

**Dependencias**: Story 3  
**Riesgo**: Medio

---

### Story 5: Implementar Resources y Prompts (5 pts)

> **Objetivo**: Resources para inspección y prompts guiados

| # | Task | Descripción | Effort |
|---|------|-------------|--------|
| 5.1 | Resource `aaia://sessions` | Lista sesiones | 1 |
| 5.2 | Resource `aaia://fias/catalog` | Catálogo FIAs | 1 |
| 5.3 | Resource `aaia://apps` | Apps disponibles | 1 |
| 5.4 | Prompt `create_fia_session` | Guía creación | 0.5 |
| 5.5 | Prompt `run_fia_step` | Guía ejecución | 0.5 |
| 5.6 | Prompt `configure_mundo` | Guía config mundo | 0.5 |
| 5.7 | Prompt `list_available_fias` | Catálogo interactivo | 0.5 |

**Dependencias**: Story 4  
**Riesgo**: Bajo

---

### Story 6: Crear PersefonBot - Socket.IO Client (10 pts)

> **Objetivo**: Bot Socket.IO como MASTER de AAIA_ROOM

| # | Task | Descripción | Effort |
|---|------|-------------|--------|
| 6.1 | Crear `initPersefonBot()` en MCPAAIAServer | Inicialización | 2 |
| 6.2 | Registrar como MASTER de `AAIA_ROOM` | MAKE_MASTER | 1 |
| 6.3 | Definir capabilities (11 acciones) | Features array | 1 |
| 6.4 | Handler `GET_AAIA_APPS` | Listar apps | 1 |
| 6.5 | Handler `GET_AAIA_CREATE_SESSION` | Crear sesión | 1 |
| 6.6 | Handler `GET_AAIA_STEP` | Ejecutar paso | 1 |
| 6.7 | Handler `GET_AAIA_MUNDO_STATE` | Estado mundo | 1 |
| 6.8 | Handler eventos RxJS → Socket.IO | Broadcast cambios | 2 |

**Dependencias**: Story 4  
**Riesgo**: Medio

**Código referencia (de MCPPrologServer)**:

```typescript
private initPersefonBot(): void {
    const socketUrl = process.env.SOCKET_MESH_URL || "http://localhost:3010";
    const serverName = DEFAULT_AAIA_MCP_SERVER_CONFIG.id;
    
    this.persefonBot = new AlephScriptClient(serverName, socketUrl);
    
    this.persefonBot.initTriggersDefinition.push(() => {
        const ROOM_NAME = serverName + "_ROOM";
        const REGISTER_PAYLOAD = { 
            usuario: this.persefonBot.name, 
            sesion: getHash("PersefonBot")
        };
        
        this.persefonBot.io.emit("CLIENT_REGISTER", REGISTER_PAYLOAD);
        this.persefonBot.io.emit("CLIENT_SUSCRIBE", { room: ROOM_NAME });
        this.persefonBot.room("MAKE_MASTER", { 
            features: [
                "AAIA_GET_APPS",
                "AAIA_CREATE_SESSION",
                "AAIA_LIST_FIAS",
                "AAIA_START",
                "AAIA_STEP",
                "AAIA_PLAY",
                "AAIA_PAUSE",
                "AAIA_GET_MUNDO_STATE",
                "AAIA_SEND_PERCEPTO",
                "AAIA_DESTROY_SESSION"
            ] 
        }, ROOM_NAME);

        // Handlers...
    });
}
```

---

### Story 7: Integración LauncherServer (5 pts)

> **Objetivo**: Registrar en catálogo de servidores lanzables

| # | Task | Descripción | Effort |
|---|------|-------------|--------|
| 7.1 | Añadir config a `launcher-configs.json` | Registry | 1 |
| 7.2 | Crear script `start:aaia` en package.json | npm script | 0.5 |
| 7.3 | Añadir a `.vscode/mcp.json` | VS Code integration | 1 |
| 7.4 | Crear task en `.vscode/tasks.json` | Task de arranque | 1 |
| 7.5 | Documentar en README | Docs | 1.5 |

**Dependencias**: Story 6  
**Riesgo**: Bajo

---

### Story 8: Plugin aaia-editor (8 pts)

> **Objetivo**: Plugin del Scriptorium para gestionar AAIA

| # | Task | Descripción | Effort |
|---|------|-------------|--------|
| 8.1 | Crear `.github/plugins/aaia-editor/manifest.md` | Manifest | 1 |
| 8.2 | Crear `agents/aaia-editor.agent.md` | Agente | 2 |
| 8.3 | Crear `instructions/aaia-editor.instructions.md` | Instrucciones | 2 |
| 8.4 | Crear bridge `plugin_ox_aaiaeditor.agent.md` | Bridge | 1 |
| 8.5 | Actualizar `registry.json` | Registro | 0.5 |
| 8.6 | Actualizar `PLUGINS.md` | Docs | 0.5 |
| 8.7 | Actualizar `AGENTS.md` | Índice | 1 |

**Dependencias**: Story 7  
**Riesgo**: Bajo

---

### Story 9: Integración con Agent Creator (5 pts)

> **Objetivo**: Vincular con catálogo fia-catalog.json

| # | Task | Descripción | Effort |
|---|------|-------------|--------|
| 9.1 | Crear handoff AAIA en Agent Creator | Handoff | 1 |
| 9.2 | Actualizar flujo de crear-agente.prompt.md | Prompt | 2 |
| 9.3 | Exponer tool `aaia_get_fia_catalog` en Agent Creator | Tool | 1 |
| 9.4 | Documentar en plugin agent-creator | Docs | 1 |

**Dependencias**: Story 8  
**Riesgo**: Bajo

---

## Spikes Técnicos

### Spike 1: Aislamiento de Runtime (3 pts)

> **Problema**: `Runtime.threads` es estático → sesiones comparten estado

**Investigar**:
1. ¿Es posible clonar FIAs?
2. ¿Factory pattern para crear FIAs frescas?
3. ¿Pool de runtimes?

**Output esperado**: Documento con recomendación técnica

---

## Dependencias Externas

| Dependencia | Estado | Responsable |
|-------------|--------|-------------|
| mcp-core-sdk publicado | ✅ Disponible | — |
| mcp-mesh-sdk estructura | ✅ Disponible | — |
| AAIAGallery submódulo | ✅ Disponible | — |
| Socket.IO mesh (puerto 3010) | ✅ Funcional | — |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Runtime no aislable | Alta | Alto | Spike técnico, pool pattern |
| Conflicto de puertos | Baja | Bajo | Puerto 3007 reservado |
| Memoria compartida entre sesiones | Media | Alto | Tests de aislamiento |
| Breaking changes en tipos | Baja | Medio | Versionado semántico |

---

## Criterios de Aceptación Globales

- [ ] Servidor arranca en puerto 3007
- [ ] Todas las tools MCP responden correctamente
- [ ] PersefonBot se registra como MASTER de AAIA_ROOM
- [ ] Sesiones son aisladas (test con 2 sesiones paralelas)
- [ ] Plugin instalable via @pluginmanager
- [ ] Documentación completa en README
- [ ] Integrado en LauncherServer

---

## Notas de Implementación

### Protocolo AlephScript como Capacidades de Sala

El protocolo de mensajería AlephScript se define como **capabilities** de la room AAIA:

```typescript
// Cada capability corresponde a un par GET_*/SET_*
const AAIA_PROTOCOL = {
    // Request: cliente envía GET_AAIA_STEP
    // Response: server emite SET_AAIA_STEP via room()
    
    "AAIA_STEP": {
        request: "GET_AAIA_STEP",
        response: "SET_AAIA_STEP",
        params: { sessionId: "string" },
        returns: { modelo: "IAAIAMundoState" }
    },
    // ... más capabilities
};
```

### Integración con fia-catalog.json

El catálogo existente en `AAIAGallery/fia-catalog.json` se expone via:
1. Tool `aaia_get_fia_catalog` → devuelve JSON completo
2. Resource `aaia://fias/catalog` → acceso MCP
3. Handoff desde Agent Creator → sugiere paradigmas

---

## Referencias

- [MCPPrologServer](../../MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts) — Patrón de referencia
- [room-protocol.ts](../../MCPGallery/mcp-core-sdk/src/types/room-protocol.ts) — Tipos MASTER-ROOM
- [fia-catalog.json](../../AAIAGallery/fia-catalog.json) — Catálogo de paradigmas
- [Runtime.ts](../../AAIAGallery/alephscript/src/FIA/engine/kernel/runtime.ts) — Motor FIA
- [Sesión cotrabajo](../SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/) — Diseño inicial
