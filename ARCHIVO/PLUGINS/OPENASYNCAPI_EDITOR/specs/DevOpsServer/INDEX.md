# Catálogo de Especificaciones — DevOpsServer

> **Versión**: 1.0.0  
> **Épicas**: MCP-CHANNELS-1.0.0, SCRIPT-2.3.0  
> **Última actualización**: 2026-01-09  
> **Servidor**: MCPGallery/mcp-mesh-sdk/src/DevOpsServerImpl.ts

---

## Resumen

Este directorio contiene las especificaciones formales del DevOpsServer MCP,
servidor de automatización DevOps con sistema de plugins y mesh Socket.IO.

### Tipos de Especificaciones

| Tipo | Estándar | Propósito |
|------|----------|-----------|
| **OpenAPI** | OpenAPI 3.1.0 | REST API para CRUD y control |
| **AsyncAPI** | AsyncAPI 3.0.0 | Socket.IO mesh integration |
| **MCP Spec** | MCP 1.0 | Contrato de tools, resources y prompts |

---

## Índice de Especificaciones

| Archivo | Estándar | Descripción | Versión |
|---------|----------|-------------|---------|
| [openapi.yaml](openapi.yaml) | OpenAPI 3.1.0 | REST API (System, Prompts, Resources, XPlus1, Room) | 1.0.0 |
| [asyncapi.yaml](asyncapi.yaml) | AsyncAPI 3.0.0 | Socket.IO events (MASTER-ROOM protocol) | 1.0.0 |
| [mcpspec.yaml](mcpspec.yaml) | MCP 1.0 | DevOps Server (19 tools, 8 resources, 4 prompts) | 1.0.0 |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DevOpsServer MCP (Port 3003)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                          MANAGERS                                     │   │
│  ├────────────────┬────────────────┬────────────────────────────────────┤   │
│  │ ContentManager │ CRUDToolsManager│ CoreComponentsManager             │   │
│  │ (Prompts &     │ (10 CRUD tools)│ (4 system tools)                  │   │
│  │  Resources)    │                │                                    │   │
│  └────────────────┴────────────────┴────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                          PLUGINS                                      │   │
│  ├──────────────────────────────┬───────────────────────────────────────┤   │
│  │   XPlus1ControlPlugin        │   DevOpsRoomPlugin                    │   │
│  │   (6 tools, 3 resources)     │   (3 tools, 1 resource)               │   │
│  │   UserSimulator control      │   Socket.IO MASTER-ROOM               │   │
│  │   [Conditional on health]    │   [Always enabled]                    │   │
│  └──────────────────────────────┴───────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                          MESH CONNECTION                              │   │
│  │                    ProserpinaBot (AlephScriptClient)                  │   │
│  │                    → Socket.IO: localhost:3010                        │   │
│  │                    → Room: devops-mcp-server_ROOM                     │   │
│  │                    → Features: DevOps_Operations, MCP_Server_Control  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Detalle por Especificación

### mcpspec.yaml (MCP 1.0)

**Propósito**: Documentar todas las capabilities del DevOpsServer.

**Tools por fuente**:

| Fuente | Tools | Descripción |
|--------|-------|-------------|
| CoreComponentsManager | 4 | `start_system`, `open_web_console`, `get_server_status`, `get_server_info` |
| CRUDToolsManager | 10 | CRUD para prompts (5) y resources (5) |
| XPlus1ControlPlugin | 6 | Control de UserSimulator y X+1 game |
| DevOpsRoomPlugin | 3 | Capabilities via Socket.IO room |

**Resources (8)**:
- Dynamic: `live-game-state`, `runtime-stats`, `mcp-servers-health`, `agents-status`
- XPlus1: `simulator-status`, `game-context-analysis`, `simulator-history`
- Room: `devops-room-capabilities`

**Prompts (4)**:
- Default: `start-system`, `open-web-console`
- XPlus1: `simulator-control`, `decision-strategy`

---

## Plugins del Servidor

### XPlus1ControlPlugin

| Aspecto | Detalle |
|---------|---------|
| **ID** | `xplus1-control` |
| **Propósito** | Control remoto del UserSimulator y X+1 machine |
| **Condicional** | Requiere que X+1 machine esté saludable |
| **Tools** | 6 |
| **Personalidades** | `cautious`, `balanced`, `risk_taker`, `passive` |

### DevOpsRoomPlugin

| Aspecto | Detalle |
|---------|---------|
| **ID** | `devops-room` |
| **Propósito** | Exponer capabilities via Socket.IO MASTER-ROOM |
| **Socket URL** | `http://localhost:3010` |
| **Room** | `DevOps_ROOM` |
| **Capabilities** | `GET_SERVER_STATUS`, `GET_PLUGIN_LIST`, `GET_TASK_LIST`, `GET_AGENT_LIST`, `GET_ROOM_MEMBERS` |

---

## Conexiones a Otros Servidores

El DevOpsServer se conecta a otros MCP servers via `MCPDriverAdapter`:

| Servidor | Puerto | Propósito |
|----------|--------|-----------|
| `state-machine-server` | 3001 | X+1 game state |
| `wiki-mcp-browser` | 3002 | Wikipedia browsing |
| `mcp-service-launcher` | 3050 | Server orchestration |

---

## Uso desde Copilot

```
# Ver estado del servidor
mcp_devops-mcp-se_get_server_status()

# Listar prompts disponibles
mcp_devops-mcp-se_list_prompts()

# Invocar capability via Room
mcp_devops-mcp-se_devops_room_invoke({
  capability: "GET_AGENT_LIST"
})

# Controlar UserSimulator (si X+1 está activo)
mcp_devops-mcp-se_set_user_personality({
  personality: "cautious",
  reason: "Testing risk-averse behavior"
})
```

---

## Changelog

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2026-01-09 | 1.0.0 | Creación inicial del mcpspec.yaml para DevOpsServer |
