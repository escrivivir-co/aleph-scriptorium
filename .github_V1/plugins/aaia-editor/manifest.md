---
id: aaia-editor
name: "AAIA Editor (Agentes Autónomos)"
version: "1.0.0"
scriptorium_version: ">=1.0.0"
description: "Plugin para operar el Runtime AAIA: crear sesiones con FIAs, mundos y autómatas. MCP + Socket.IO."
author: "Aleph Scriptorium"
agents:
  - name: "AAIAEditor"
    file: "agents/aaia-editor.agent.md"

# Servidores MCP que el plugin aporta
mcpServers:
  - id: "aaia-mcp-server"
    port: 3007
    source: "MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts"
    startCommand: "npm run start:aaia"
    description: "Runtime AAIA + FIAs vía MCP"

# Dependencias
dependencies:
  - "prolog-editor"  # Cerebros Prolog para FIAs lógicas
  - "typed-prompting"  # Validación de mensajes FIA

# Datos
data_directory: "ARCHIVO/PLUGINS/AAIA_EDITOR/"

# Submódulo origen
submodule: "AAIAGallery"

# Specs API
specs:
  - type: "openapi"
    file: "ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/openapi.yaml"
  - type: "asyncapi"
    file: "ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/asyncapi.yaml"
---

# Plugin AAIA Editor

> **Motor de Agentes Autónomos** para el Scriptorium.

## Resumen

Este plugin expone el **Runtime AAIA** (AAIAGallery) como servidor MCP, permitiendo:

1. **Crear sesiones** con mundos y FIAs
2. **Operar FIAs** (razonar, percibir, actuar)
3. **Integrar vía Socket.IO** con protocolo MASTER-ROOM
4. **Validar comunicación** con TypedPrompting

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                     MCPAAIAServer (:3007)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. AAIASessionManager                                          │
│     └── Map<sessionId, AAIASession>                             │
│         ├── runtime (Runtime de AAIAGallery)                    │
│         ├── threads[] (FIAs activas)                            │
│         └── mundo (IMundo activo)                               │
│                                                                 │
│  2. MCP Tools (12)                                              │
│     ├── aaia_create_session                                     │
│     ├── aaia_load_app                                           │
│     ├── aaia_list_fias                                          │
│     ├── aaia_start_fia / aaia_stop_fia                          │
│     ├── aaia_step_fia                                           │
│     ├── aaia_query_mundo                                        │
│     ├── aaia_send_percepto                                      │
│     ├── aaia_get_eferencia                                      │
│     ├── aaia_set_fia_state                                      │
│     ├── aaia_list_sessions                                      │
│     └── aaia_destroy_session                                    │
│                                                                 │
│  3. PersefonBot (Socket.IO Client)                              │
│     └── MASTER of AAIA_ROOM                                     │
│         └── Capabilities: FIA_STEP, PERCEPTO, EFERENCIA         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Paradigmas FIA Soportados

| Paradigma | ID | Descripción |
|-----------|-----|-------------|
| Lógica | `logica` | Razonamiento declarativo (Prolog) |
| Conexionista | `conexionista` | Redes neuronales |
| Simbólica | `simbolica` | Procesamiento simbólico |
| SBC | `sbc` | Sistemas basados en conocimiento |
| SBR | `sbr` | Sistemas basados en reglas |
| Situada | `situada` | Agentes situados (IoT) |
| Híbrido | `hibrido` | Combinación de paradigmas |
| Científica | `cientifica` | Método científico |
| Gramáticas | `gramaticas` | Procesamiento de lenguaje |
| Sistemas | `sistemas` | Teoría de sistemas |

## Tipos DRY

Los tipos compartidos están en `MCPGallery/mcp-core-sdk/src/types/aaia/`:

- `IAAIASessionMeta` - Metadatos de sesión
- `IAAIAFIAInfo` - Información de FIA
- `IAAIAMundoState` - Estado del mundo
- `AAIACapability` - Capacidades Socket.IO

## Uso

### Crear Sesión

```bash
# Via MCP Inspector
aaia_create_session { appId: "demo-logica" }
# → { sessionId: "abc123", appId: "demo-logica", status: "created" }
```

### Operar FIA

```bash
# Paso único de razonamiento
aaia_step_fia { sessionId: "abc123", fiaIndex: 0 }
# → { eferencia: {...}, runState: "PLAY" }
```

### Socket.IO (PersefonBot)

```javascript
// Cliente AlephScript
const socket = io('ws://localhost:3010');
socket.emit('join', { room: 'AAIA_ROOM', mode: 'observer' });
socket.on('FIA_STEP', (data) => console.log('FIA executed:', data));
```

## Referencias

- [Backlog](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_18_MCP_AAIA_Server/01_backlog-borrador.md)
- [Sesión Cotrabajo](../../ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/)
- [AAIAGallery README](../../AAIAGallery/README-SCRIPTORIUM.md)
