# TODO_MCP_RUNTIME — análisis técnico estricto

## Estado

**Modo:** ASI MODE  
**Capa:** LAYER_1 — análisis técnico estricto  
**Paquete:** `@network-engine/mcp-runtime`  
**Código:** `packages/mcp-runtime`  
**ADR asociado:** `ADR/0001-mcp-runtime-subscriptions-shim.md`

Este documento existe para que `mcp-runtime` no quede como código nuevo sin dossier técnico. No sustituye a `LAYER_0/MCP.instructions.md`; lo aplica técnicamente al paquete runtime.

## Responsabilidad del paquete

`@network-engine/mcp-runtime` es la capa de ejecución MCP de Network-Engine.

No define dominio.

Consume una proyección declarativa ya generada por `@network-engine/mcp`:

```text
DomainContract
  ↓
projectDomainToMCP()
  ↓
MCPProjectionResult
  ↓
@network-engine/mcp-runtime
```

Sus responsabilidades técnicas son:

- materializar resources/prompts/tools/sampling en un runtime ejecutable;
- exponer API programática para leer resources, obtener prompts y ejecutar mutation capabilities;
- emitir eventos RxJS observables;
- registrar la proyección en un `McpServer` real;
- exponer un adapter Fastify aislado;
- manejar compatibilidad MCP moderna cuando el SDK vaya por detrás del draft.

## Límites de capa

Permitido:

- importar `@network-engine/mcp/projection`;
- importar `rxjs`;
- en el submódulo `./fastify`, importar `@modelcontextprotocol/sdk`, `zod`, tipos HTTP de Node y detalles de transporte;
- contener shims temporales del protocolo en el borde HTTP cuando exista ADR.

Prohibido:

- importar Fastify o MCP SDK desde `@network-engine/core`;
- convertir resources en endpoints REST;
- generar tools de lectura por defecto;
- usar `Mcp-Session-Id` como estado de aplicación;
- reintroducir `resources/subscribe`, `resources/unsubscribe` o antiguo stream GET;
- acoplar la semántica del dominio al SDK MCP.

## Archivos actuales

```text
packages/mcp-runtime/src/runtime.ts
packages/mcp-runtime/src/events.ts
packages/mcp-runtime/src/actor-bridge.ts
packages/mcp-runtime/src/fastify.ts
packages/mcp-runtime/src/runtime.test.ts
packages/mcp-runtime/src/fastify.test.ts
```

## Runtime neutral

`runtime.ts` expone `createMCPRuntime()`.

API relevante:

- `listResources()`
- `listPrompts()`
- `listTools()`
- `readResource(uriTemplate, uri?)`
- `getPrompt(name, args?)`
- `executeTool(name, args?)`
- `events$`
- `register(serverLike)`
- `notifyToolsListChanged()`
- `notifyPromptsListChanged()`
- `notifyResourcesListChanged()`
- `notifyResourceUpdated(uri)`

La API de notificaciones no muta el dominio. Solo publica hechos en el stream runtime.

## Eventos RxJS

`events.ts` define `MCPRuntimeEvent`.

Eventos implementados:

- `MCP_RESOURCE_READ_REQUESTED`
- `MCP_PROMPT_REQUESTED`
- `MCP_MUTATION_CAPABILITY_REQUESTED`
- `MCP_MUTATION_CAPABILITY_COMPLETED`
- `MCP_MUTATION_CAPABILITY_FAILED`
- `MCP_TOOLS_LIST_CHANGED`
- `MCP_PROMPTS_LIST_CHANGED`
- `MCP_RESOURCES_LIST_CHANGED`
- `MCP_RESOURCE_UPDATED`

Regla:

```text
RxJS transporta hechos observables.
XState decide comportamiento.
```

Por tanto, `events$` no debe convertirse en una FSM improvisada.

## Bridge actor-like

`actor-bridge.ts` contiene `createActorToolHandler()`.

Uso previsto:

```text
MCP tool call
  ↓
RuntimeToolRequest
  ↓
actor.send(event)
```

El bridge no debe decidir workflows. Solo transforma requests en eventos para actores XState u otros sinks compatibles.

## Adapter Fastify

`fastify.ts` es el único lugar donde el paquete toca:

- `McpServer`;
- `StreamableHTTPServerTransport`;
- schemas del SDK;
- `ServerResponse` / `IncomingMessage`;
- `zod` para shapes esperados por el SDK.

Endpoints expuestos:

- `POST /mcp`
- `GET /mcp/health`
- `GET /mcp/discover` como vista auxiliar no normativa

El endpoint MCP normativo es `POST /mcp`.

## MCP moderno implementado

### `server/discover`

El adapter intercepta `POST /mcp` con:

```text
method: "server/discover"
```

Devuelve:

- `resultType: "complete"`
- `supportedVersions`
- `capabilities`
- `serverInfo`
- `instructions` si existen
- `ttlMs`
- `cacheScope`

### Cacheable results

El adapter registra handlers cacheables para:

- `tools/list`
- `prompts/list`
- `resources/list`
- `resources/templates/list`
- `resources/read`

Todos devuelven `ttlMs` y `cacheScope`.

Las listas se ordenan de forma determinista.

`resources/list` y `resources/templates/list` están separados explícitamente.

### `subscriptions/listen`

El SDK instalado `@modelcontextprotocol/sdk@1.29.0` no expone todavía los schemas draft de `subscriptions/listen`.

Por eso se aplica el ADR:

```text
ADR/0001-mcp-runtime-subscriptions-shim.md
```

El shim:

- intercepta `POST /mcp` con `method: "subscriptions/listen"`;
- valida la existencia de `params.notifications`;
- abre `text/event-stream`;
- envía primero `notifications/subscriptions/acknowledged`;
- añade `_meta["io.modelcontextprotocol/subscriptionId"]` a cada notificación;
- respeta filtros opt-in;
- limpia la suscripción al cerrar la conexión HTTP.

Filtros soportados:

- `toolsListChanged`
- `promptsListChanged`
- `resourcesListChanged`
- `resourceSubscriptions`

## Tests actuales

Validación cubierta por Bun:

- registro de resources/prompts/tools;
- emisión de eventos runtime;
- bridge actor-like;
- eventos explícitos de notificación;
- `server/discover` por POST;
- list/read cacheables;
- `subscriptions/listen` sobre SSE;
- ack inicial;
- filtrado opt-in;
- `resourceSubscriptions`;
- `subscriptionId` en `_meta`.

Comando canónico:

```text
bun run typecheck && bun run test
```

Resultado observado tras cierre ASI:

```text
12 pass
0 fail
```

## Deuda técnica real

### Deuda abierta

- Sustituir el shim manual cuando el SDK soporte oficialmente `subscriptions/listen` draft.
- Evitar dependencia de internals del SDK en tests si aparece API pública para invocar handlers.
- Revisar validación completa de headers modernos (`MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name`).
- Añadir política de Origin/auth para servidores expuestos fuera de localhost.
- Diseñar adaptación futura a MCP Apps sin introducir UI en `core`.

### No deuda

- Que `subscriptions/listen` viva en Fastify no es deuda si se conserva como shim de borde.
- Que `core` no conozca MCP SDK es correcto.
- Que `GET /mcp/discover` exista como ayuda no normativa es aceptable mientras `server/discover` real sea POST.

## Criterios de cierre del paquete runtime inicial

- [x] Runtime consume `MCPProjectionResult`.
- [x] `core` no importa MCP SDK.
- [x] Fastify vive en submódulo.
- [x] `server/discover` funciona.
- [x] List/read devuelven caché MCP moderna.
- [x] `subscriptions/listen` funciona como shim temporal.
- [x] Tests cubren eventos y SSE.
- [x] Validado con Bun.

## Próximo incremento recomendado

No añadir más features antes de cerrar análisis funcional LAYER_3 y ADRs pendientes de contratos/proyecciones.

Después:

1. Añadir validación de headers Streamable HTTP moderna.
2. Añadir política Origin/auth configurable en `fastify.ts`.
3. Preparar retirada del shim cuando el SDK alcance la spec draft.
4. Evaluar MCP Apps como proyección separada, no como parte de runtime core.
