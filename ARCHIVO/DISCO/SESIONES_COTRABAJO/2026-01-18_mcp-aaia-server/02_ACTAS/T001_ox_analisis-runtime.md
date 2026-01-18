# Acta T001: Análisis del Runtime AAIAGallery

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 001 |
| **Agente** | @ox |
| **Inicio** | 2026-01-18 12:00 |
| **Fin** | 2026-01-18 12:30 |
| **Estado final** | ✅ DONE |

## Contexto Leído

- `AAIAGallery/alephscript/src/FIA/engine/kernel/runtime.ts`
- `AAIAGallery/alephscript/src/FIA/iFIA.ts`
- `AAIAGallery/alephscript/src/FIA/mundos/IMundo.ts`
- `AAIAGallery/fia-catalog.json`
- `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts`
- `MCPGallery/mcp-core-sdk/src/types/room-protocol.ts`

## Aportación

### 1. Hallazgos del Runtime AAIAGallery

#### 1.1 Arquitectura del Runtime

El `Runtime` es el motor principal que gestiona colecciones de FIAs (Fundamentos de IA):

```typescript
export class Runtime extends SocketAdapter {
    static threads: iFIA[] = [];  // ← FIAs cargadas como "threads"
    
    start() {
        // Carga FIAs base
        Runtime.threads.push(IACientifica.fiaDebil);
        Runtime.threads.push(FIASimbolica.fiaSimbolica);
        // ...
        
        // Carga aplicaciones
        Runtime.threads.push(new CadenaApp());
        Runtime.threads.push(new IoTLogicEngine());
        // ...
    }
}
```

#### 1.2 Ciclo de Vida de una FIA

```
┌────────────────────────────────────────────────────────────────┐
│                      CICLO DE VIDA FIA                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  1. STOP                                                       │
│     └── FIA cargada, no ejecutándose                           │
│                                                                │
│  2. PLAY_STEP                                                  │
│     └── Ejecutar UN paso de inferencia                         │
│         └── mundo.ciclo() → devuelve IModelo actualizado       │
│                                                                │
│  3. PLAY                                                       │
│     └── Ejecutar continuamente                                 │
│         └── mundo.jornada() → ciclos hasta condición           │
│                                                                │
│  4. PAUSE                                                      │
│     └── Detenido esperando input                               │
│         └── Emite via eferencia (Observable)                   │
│                                                                │
│  Transiciones via: runStateEvent.next(RunStateEnum.*)          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### 1.3 Comunicación FIA ↔ Mundo

```typescript
// FIA razona sobre el mundo
razona: (mundo: IMundo, i: Aferencia) => Eferencia;

// Mundo notifica cambios via RxJS
mundo.eferencia: Subject<IMundo>;  // Output
mundo.aferencias: Subscription[];  // Inputs
```

### 2. Mapeo a Patrón MCPPrologServer

| Componente Prolog | Equivalente AAIA |
|-------------------|------------------|
| `PrologSession` | `AAIASession` |
| `PrologEngine` | `Runtime` + FIA seleccionada |
| `prolog_query` | `aaia_step_fia` (un paso) |
| `prolog_assert_fact` | `aaia_send_percepto` (input al mundo) |
| `prolog_consult_file` | `aaia_load_app` (cargar aplicación) |
| `sessionId` | `sessionId` (igual) |
| `obraId` | `appId` (aplicación AAIA) |

### 3. Diseño Propuesto: MCPAAIAServer

#### 3.1 AAIASession Interface

```typescript
interface AAIASession {
    sessionId: string;
    appId: string;
    createdAt: Date;
    lastUsedAt: Date;
    
    // Runtime específico de la sesión
    runtime: Runtime;
    
    // FIA activa
    activeFIA: iFIA | null;
    activeFIAIndex: number;
    
    // Estado
    runState: RunStateEnum;
}
```

#### 3.2 AAIASessionManager

```typescript
class AAIASessionManager {
    private sessions: Map<string, AAIASession> = new Map();
    
    // Crear nueva sesión con runtime aislado
    createSession(sessionId: string, appId: string): Promise<AAIASession>;
    
    // Obtener sesión
    getSession(sessionId: string): AAIASession | undefined;
    
    // Listar FIAs disponibles en sesión
    listFIAs(sessionId: string): Array<{index: number, name: string}>;
    
    // Seleccionar FIA activa
    selectFIA(sessionId: string, fiaIndex: number): Promise<void>;
    
    // Ejecutar paso en FIA activa
    stepFIA(sessionId: string): Promise<IModelo>;
    
    // Enviar percepto al mundo
    sendPercepto(sessionId: string, percepto: IPercepto): Promise<Eferencia>;
    
    // Destruir sesión
    destroySession(sessionId: string): Promise<boolean>;
}
```

#### 3.3 MCP Tools Propuestos

| Tool | Descripción | Parámetros |
|------|-------------|------------|
| `aaia_create_session` | Crear sesión con runtime | sessionId, appId |
| `aaia_list_fias` | Listar FIAs disponibles | sessionId |
| `aaia_select_fia` | Activar una FIA | sessionId, fiaIndex |
| `aaia_start_fia` | Iniciar FIA (instanciar) | sessionId |
| `aaia_step_fia` | Ejecutar un paso | sessionId |
| `aaia_play_fia` | Ejecutar continuo | sessionId |
| `aaia_pause_fia` | Pausar ejecución | sessionId |
| `aaia_get_mundo_state` | Estado actual del mundo | sessionId |
| `aaia_send_percepto` | Enviar input al mundo | sessionId, percepto |
| `aaia_list_sessions` | Listar sesiones activas | — |
| `aaia_destroy_session` | Destruir sesión | sessionId |
| `aaia_get_fia_catalog` | Catálogo de paradigmas | — |

#### 3.4 Socket.IO Capabilities (PersefonBot)

```typescript
const AAIA_ROOM_CAPABILITIES = [
    "AAIA_GET_APPS",          // Listar aplicaciones
    "AAIA_CREATE_SESSION",    // Nueva sesión
    "AAIA_LIST_FIAS",         // FIAs en sesión
    "AAIA_SELECT_FIA",        // Activar FIA
    "AAIA_START",             // Instanciar
    "AAIA_STEP",              // Paso único
    "AAIA_PLAY",              // Continuo
    "AAIA_PAUSE",             // Pausar
    "AAIA_GET_MUNDO_STATE",   // Estado mundo
    "AAIA_SEND_PERCEPTO",     // Input
    "AAIA_DESTROY_SESSION"    // Destruir
];
```

### 4. Tipos para mcp-core-sdk

Siguiendo el patrón de `types/prolog/`, crear `types/aaia/`:

```typescript
// types/aaia/index.ts
export interface IAAIASessionMeta {
    sessionId: string;
    appId: string;
    activeFIA: string | null;
    runState: string;
    createdAt: string;
    lastUsedAt: string;
}

export interface IAAIAFIAInfo {
    index: number;
    nombre: string;
    paradigma: string;
    runAsync: boolean;
}

export interface IAAIAMundoState {
    nombre: string;
    runState: string;
    modelo: {
        dia: number;
        estado: Record<string, unknown>;
        dominio: Record<string, unknown>;
    };
}

export interface IAAIAPercepto {
    tipo: string;
    datos: Record<string, unknown>;
}

export interface IAAIAEferencia {
    accion: string;
    resultado: Record<string, unknown>;
}
```

### 5. Gaps Identificados

| Gap | Impacto | Mitigación |
|-----|---------|------------|
| Runtime es singleton (`static threads`) | No permite sesiones aisladas | Crear wrapper que clone threads |
| FIAs no son clonable fácilmente | Memoria compartida | Usar factory pattern para crear FIAs |
| SocketAdapter acoplado | Conflicto de puertos | Parametrizar o desacoplar |
| Modo demo interactivo (REPL) | Bloquea thread | Adaptar a modo API |

### 6. Alternativa: Runtime como Pool

En lugar de clonar runtimes, usar pool de instancias:

```typescript
class AAIARuntimePool {
    private pool: Runtime[] = [];
    private MAX_SIZE = 10;
    
    acquire(): Runtime | null;
    release(rt: Runtime): void;
}
```

## Decisiones Tomadas

1. ✅ **Patrón SessionManager** igual que Prolog
2. ✅ **Bot Socket.IO** llamado "PersefonBot" (continuando mitología Prolog/Eurídice)
3. ✅ **Tipos en mcp-core-sdk** bajo `types/aaia/`
4. ✅ **No modificar AAIAGallery** — solo wrappers
5. ⚠️ **Runtime cloning** requiere spike técnico

## Preguntas para Siguientes Turnos

- [ ] ¿Cómo aislar threads entre sesiones? → spike @plugin_ox_prologeditor
- [ ] ¿Qué aplicaciones exponer por defecto? → @plugin_ox_agentcreator
- [ ] ¿Puerto del servidor? Propuesta: 3007 → @plugin_ox_mcppresets
- [ ] ¿Integrar con catálogo fia-catalog.json? → @plugin_ox_agentcreator

## Siguiente Turno Sugerido

@plugin_ox_prologeditor para extraer patrón de sesiones aisladas del servidor Prolog y proponer adaptación para AAIA.
