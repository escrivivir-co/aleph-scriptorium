# Catálogo de Especificaciones — MCPChannels

> **Versión**: 1.0.0  
> **Épica**: MCP-CHANNELS-1.0.0  
> **Última actualización**: 2026-01-07  
> **Backlog**: [01_backlog-borrador.md](../../../../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_07_MCP_Channels_Integration/01_backlog-borrador.md)

---

## Resumen

Este directorio contiene las especificaciones formales del sistema MCPChannels SDK,
el ecosistema de comunicación Socket.IO que conecta servidores MCP con UIs.

### Tipos de Especificaciones

| Tipo | Estándar | Propósito |
|------|----------|-----------|
| **Contratos API** | OpenAPI 3.1, AsyncAPI 3.0, MCP 1.0 | Contratos máquina-legibles |
| **Casos de Uso** | usecases/1.0.0 (propio) | Documentación de flujos por actor |

---

## Índice de Especificaciones

| Archivo | Estándar | Descripción | Versión |
|---------|----------|-------------|---------|
| [openapi.yaml](openapi.yaml) | OpenAPI 3.1 | REST API del Mesh (/mesh, /mesh/rooms) | 1.0.0 |
| [asyncapi.yaml](asyncapi.yaml) | AsyncAPI 3.0 | Socket.IO Events (MASTER-ROOM Protocol) | 1.0.0 |
| [mcpspec.yaml](mcpspec.yaml) | MCP 1.0 | MCP Tools para mesh orchestration | 1.0.0 |
| [usecases-mcp-server.yaml](usecases-mcp-server.yaml) | usecases/1.0.0 | Casos de uso: Servidor MCP conectándose | 1.0.0 |
| [usecases-ui-client.yaml](usecases-ui-client.yaml) | usecases/1.0.0 | Casos de uso: UI Angular/React | 1.0.0 |
| [usecases-mesh-admin.yaml](usecases-mesh-admin.yaml) | usecases/1.0.0 | Casos de uso: Administración del mesh | 1.0.0 |

---

## Arquitectura Cubierta

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SPECS POR CAPA Y ACTOR                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐                                                        │
│  │    mcpspec      │ ← MCP Tools para mesh discovery/invoke                │
│  │    (MCP 1.0)    │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│  ┌────────▼────────┐     ┌─────────────────┐                                │
│  │    openapi      │────►│   asyncapi      │                                │
│  │  (REST /mesh)   │     │  (Socket.IO)    │                                │
│  └────────┬────────┘     └─────────────────┘                                │
│           │                                                                 │
│  ┌────────▼────────────────────────────────────────────────────────────┐    │
│  │                      USE CASES (x-use-cases)                        │    │
│  ├────────────────┬────────────────┬────────────────────────────────────┤   │
│  │  mcp-server    │  ui-client     │  mesh-admin                        │   │
│  │  (DevOps,      │  (Angular,     │  (Discovery,                       │   │
│  │   Prolog)      │   React)       │   Invocation)                      │   │
│  └────────────────┴────────────────┴────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Detalle por Especificación

### openapi.yaml (OpenAPI 3.1)

**Propósito**: Documentar la REST API del SocketIoMesh.

**Endpoints**:
- `GET /mesh` - Estado completo del mesh
- `GET /mesh/rooms` - Lista de rooms activas
- `GET /mesh/rooms/:id` - Detalle de room específica
- `GET /mesh/capabilities` - Todas las capabilities disponibles
- `POST /mesh/invoke/:room` - Invocar capability en una room
- `GET /mesh/health` - Health check

### asyncapi.yaml (AsyncAPI 3.0)

**Propósito**: Documentar eventos Socket.IO del protocolo MASTER-ROOM.

**Eventos Client→Server**:
- `CLIENT_REGISTER` - Registrar cliente en el mesh
- `CLIENT_SUSCRIBE` - Suscribirse a una room
- `ROOM_MESSAGE` - Enviar mensaje a room (incluye MAKE_MASTER)

**Eventos Server→Client**:
- `SET_*` - Respuestas a GET_* requests
- Broadcast events

### mcpspec.yaml (MCP 1.0)

**Propósito**: Exponer el mesh como herramientas MCP.

**Tools**:
- `mesh_list_rooms` - Listar rooms activas
- `mesh_get_capabilities` - Obtener capabilities de una room
- `mesh_invoke` - Invocar capability

---

## Bots Implementados

| Bot | Servidor | Room | Capabilities |
|-----|----------|------|--------------|
| **ProserpinaBot** | DevOpsServer | `devops-mcp-server_ROOM` | DEVOPS_STATUS, DEVOPS_HEALTH, PROMPT_LIST |
| **EuridiceBot** | MCPPrologServer | `prolog-mcp-server_ROOM` | PROLOG_QUERY, PROLOG_ASSERT, PROLOG_RETRACT, PROLOG_LOAD_FILE, PROLOG_GET_SESSIONS, PROLOG_CREATE_SESSION, PROLOG_DESTROY_SESSION |

---

## Paquetes NPM Relacionados

| Paquete | Descripción | Versión |
|---------|-------------|---------|
| `@alephscript/mcp-core-sdk` | Tipos y clientes base | 1.3.0 |
| `@alephscript/core-browser` | Cliente browser Socket.IO | 1.2.0 |
| `@alephscript/angular` | Integración Angular/RxJS | 1.2.0 |

---

## Changelog

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2026-01-07 | 1.0.0 | Creación inicial del pack de specs |
