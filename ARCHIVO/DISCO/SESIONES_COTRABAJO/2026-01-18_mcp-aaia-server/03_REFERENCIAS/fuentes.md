# Referencias: MCP AAIA Server

## Fuentes Principales

### 1. Arquitectura de Referencia (MCPPrologServer)

**Ubicación**: `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts`

**Componentes clave**:
- `PrologSessionManager`: Gestión de sesiones aisladas
- `EuridiceBot`: Cliente Socket.IO como MASTER de room
- `PrologBackendClient`: Conexión con backend (SQLite)
- 12 tools MCP (create_session, query, assert, etc.)
- 6 resources (sessions, templates, rules)
- 8 prompts

### 2. Runtime AAIAGallery

**Ubicación**: `AAIAGallery/alephscript/src/FIA/`

**Componentes clave**:
- `engine/kernel/runtime.ts`: Motor principal, gestiona threads de FIAs
- `iFIA.ts`: Interfaz de FIA (mundo, razona, abstrae, cache, runState)
- `mundos/IMundo.ts`: Interfaz de Mundo (modelo, ciclo, eferencia)
- `thread.ts`: Entry point del servidor HTTP (puerto 8000)
- `aplicaciones/`: Apps predefinidas (cadena, ide, IoT, busquedas)

### 3. Catálogo de Paradigmas

**Ubicación**: `AAIAGallery/fia-catalog.json`

**Paradigmas disponibles** (10 total):
- `logica` — Estable — @blueflag
- `conexionista` — Experimental — @yellowflag
- `simbolica` — Estable — @aleph (incluye Red Semántica)
- `sbc` — Parcial — @revisor
- `sbr` — Estable — @blackflag
- `situada` — Experimental — @redflag
- `hibrido` — Experimental — @aleph
- `cientifica` — Parcial — @blueflag
- `gramaticas` — Estable — @orangeflag
- `sistemas` — Parcial — @redflag

### 4. Protocolo Socket.IO (MASTER-ROOM)

**Ubicación**: `MCPGallery/mcp-core-sdk/src/types/room-protocol.ts`

**Eventos del protocolo**:
- `CLIENT_REGISTER`: Cliente se registra
- `CLIENT_SUSCRIBE`: Cliente se suscribe a room
- `MAKE_MASTER`: Servidor se declara master de room
- `room`: Mensaje a room específica

**Tipos clave**:
- `IRoomCapability`: Capacidad expuesta por MASTER
- `IRoomState`: Estado de room
- `IRoomMember`: Miembro de room

### 5. AlephScriptClient

**Ubicación**: `MCPGallery/mcp-mesh-sdk/src/libs/alephscript-client.ts`

**Métodos**:
- `connect()`: Conectar a mesh
- `room(event, data, roomName)`: Enviar a room específica
- `initTriggersDefinition`: Hooks de inicialización

---

## Backlogs Relacionados

| Backlog | Relevancia |
|---------|------------|
| [MCP-CHANNELS-1.0.0](../../BACKLOG_BORRADORES/Enero_07_MCP_Channels_Integration/01_backlog-borrador.md) | Arquitectura Socket.IO unificada |
| [AS-GYM](../../BACKLOG_BORRADORES/AS-GYM/02_backlog-sprint-asgym.md) | Integración catálogo FIA |
| [IOT-SBR-LOGICA](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/01_backlog-borrador.md) | Patrón PrologEditor |
| [PROLOG-AGENT-PACK](../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/) | Stack MCP Prolog completo |

---

## Diagrama de Dependencias

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPENDENCIAS DEL PROYECTO                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  mcp-core-sdk (TIPOS)                                           │
│  ├── room-protocol.ts → IRoomCapability, IRoomState             │
│  └── types/prolog/ → (referencia para AAIA)                     │
│                                                                 │
│  mcp-mesh-sdk (SERVIDOR)                                        │
│  ├── BaseMCPServer.ts → Clase base                              │
│  ├── MCPPrologServer.ts → REFERENCIA                            │
│  ├── libs/alephscript-client.ts → Cliente Socket.IO             │
│  └── services/PrologSessionManager.ts → PATRÓN                  │
│                                                                 │
│  AAIAGallery (RUNTIME)                                          │
│  ├── alephscript/src/FIA/engine/kernel/runtime.ts               │
│  ├── alephscript/src/FIA/iFIA.ts                                │
│  ├── alephscript/src/FIA/mundos/IMundo.ts                       │
│  └── fia-catalog.json                                           │
│                                                                 │
│  Plugin prolog-editor (REFERENCIA)                              │
│  └── .github/plugins/prolog-editor/                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Interfaces Clave

### iFIA (AAIAGallery)

```typescript
export interface iFIA {
    i18: IDiccionarioI18;
    nombre: string;
    runAsync: boolean;
    objetivos: Aferencia[];
    mundo: IMundo;
    imprimir: () => string;
    configurar?: () => void;
    instanciar(): Promise<string>;
    razona: (mundo: IMundo, i: Aferencia) => Eferencia;
    abstrae: (p: IPercepto) => IAprendize;
    cache: IRTCache;
    runState: RunStateEnum;
    runStateEvent: Subject<RunStateEnum>;
    assistantId?: string;
    bots?: iFIA[];
}
```

### IMundo (AAIAGallery)

```typescript
export interface IMundo {
    i18: IDiccionarioI18;
    nombre: string;
    modelo: IModelo;
    pulsoVital: NodeJS.Timeout;
    instanciar(): Promise<IModelo>;
    vivo(): boolean;
    pulso: () => void;
    ciclo: () => Promise<IModelo>;
    jornada(vivir: Function, morir: Function): void;
    eferencia: Subject<IMundo>;
    aferencias: Subscription[];
    agregarAferencia(o: Observable<IMundo>): void;
    alAcabar(nombre: string): Promise<IModelo>;
    destructor(): void;
    elMundoAcabara: Observable<IMundo>;
    runState: RunStateEnum;
    runStateEvent: Observable<RunStateEnum>;
    renderer?: string;
}
```

### Runtime (AAIAGallery)

```typescript
export class Runtime extends SocketAdapter {
    static threads: iFIA[] = [];
    start(): void;       // Carga todas las FIAs
    demo(): Promise<void>; // REPL interactivo
    menuAnswer(answer: string, mode: RunStateEnum): Promise<void>;
}
```
