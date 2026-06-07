# MCP_RUNTIME — análisis técnico estricto

## Estado

**Modo:** ASI MODE
**Capa:** LAYER_1 — análisis técnico estricto
**Paquete:** `@network-engine/mcp-runtime`
**Código:** `packages/mcp-runtime`
**ADR asociado:** [`ADR/0001-mcp-runtime-subscriptions-shim.md`](../../ADR/0001-mcp-runtime-subscriptions-shim.md) (el shim ahora se aplica en `edge-mcp`)
**Borde HTTP:** extraído a [`@network-engine/edge-mcp`](EDGE.instructions.md)

Este documento existe para que `mcp-runtime` no quede como código nuevo sin dossier técnico. No sustituye a [`LAYER_0/MCP.instructions.md`](../LAYER_0/MCP.instructions.md); lo aplica técnicamente al paquete runtime.

## Responsabilidad del paquete

`@network-engine/mcp-runtime` es la capa de ejecución MCP de Network-Engine, **transport-neutral**.

No define dominio. No abre puertos. No conoce Fastify ni HTTP.

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

- materializar resources/prompts/tools en un runtime ejecutable neutral (`createMCPRuntime`);
- exponer API programática para leer resources, obtener prompts y ejecutar mutation capabilities;
- emitir eventos RxJS observables (`events$`);
- registrar la proyección en un servidor MCP, ya sea uno duck-typed (`register(serverLike)`) o el `McpServer` real del SDK (`createMcpServerFromRuntime`);
- aplicar cache hints MCP modernos (`ttlMs`/`cacheScope`) en los handlers cacheables del `McpServer`.

El **borde HTTP** (Fastify, Streamable HTTP, `server/discover` por POST y el shim `subscriptions/listen` SSE) **ya no vive aquí**: se extrajo a [`@network-engine/edge-mcp`](EDGE.instructions.md), que se apoya en [`@network-engine/edge-rest`](EDGE.instructions.md).

## Límites de capa

Permitido:

- importar `@network-engine/mcp/projection`;
- importar `rxjs`;
- en `server.ts`, importar `@modelcontextprotocol/sdk` y `zod` para construir el `McpServer` real y sus handlers;
- contener tipos duck-typed (`MCPRuntimeServerLike`) que permitan registrar en servidores SDK o falsos sin acoplarse al transporte.

Prohibido:

- importar Fastify, tipos HTTP de Node, `StreamableHTTPServerTransport` o lógica SSE (eso vive en `edge-mcp`/`edge-rest`);
- importar cualquier `@network-engine/edge-*` (rompe la dirección de capa: el borde consume el runtime, nunca al revés);
- que `@network-engine/core` importe el MCP SDK;
- convertir resources en endpoints REST;
- generar tools de lectura por defecto;
- usar `Mcp-Session-Id` como estado de aplicación;
- reintroducir `resources/subscribe`, `resources/unsubscribe` o antiguo stream GET;
- acoplar la semántica del dominio al SDK MCP.

## Archivos actuales

```text
packages/mcp-runtime/src/index.ts            # barril: actor-bridge + events + runtime + server
packages/mcp-runtime/src/server.ts           # createMcpServerFromRuntime (binding al McpServer del SDK)
packages/mcp-runtime/src/events.ts           # MCPRuntimeEvent / MCPActorEvent
packages/mcp-runtime/src/actor-bridge.ts     # createActorToolHandler
packages/mcp-runtime/src/runtime/index.ts    # createMCPRuntime + re-export de tipos
packages/mcp-runtime/src/runtime/types.ts    # MCPRuntime, MCPRuntimeOptions, handlers, MCPRuntimeServerLike, ...
packages/mcp-runtime/src/runtime/tools.ts    # registerTool / executeTool
packages/mcp-runtime/src/runtime/prompts.ts  # registerPrompt / getPrompt
packages/mcp-runtime/src/runtime/resources.ts# registerResource / readResource
packages/mcp-runtime/src/runtime/utils.ts    # now / toRecord / extractUri
packages/mcp-runtime/src/runtime.test.ts     # registro + eventos + actor-bridge
```

`fastify.ts`, `http-edge.ts`, `port-utils.ts` y el monolito `runtime.ts` **fueron eliminados**. La lógica de transporte que contenían vive ahora en `edge-mcp`.

### Export único

`package.json` expone una sola entrada:

```jsonc
"exports": { ".": "./src/index.ts" }
```

No hay submódulos `./fastify` ni `./http-edge`. Toda la superficie pública (runtime, eventos, actor-bridge y `createMcpServerFromRuntime`) sale por `.`.

## Carpeta `runtime/` modular (runtime neutral)

`runtime/index.ts` expone `createMCPRuntime(options)`. El antiguo monolito se descompuso en módulos por primitiva:

- `tools.ts` — `registerTool`, `executeTool`, `acceptedToolResult`.
- `prompts.ts` — `registerPrompt`, `getPrompt`, `defaultPromptResult`.
- `resources.ts` — `registerResource`, `readResource`, `defaultResourceResult`.
- `types.ts` — `MCPRuntime`, `MCPRuntimeOptions`, `MCPRuntimeHandlers`, `MCPRuntimeServerLike`, `MCPContentResult`, `RuntimeToolRequest`, etc.
- `utils.ts` — helpers puros (`now`, `toRecord`, `extractUri`).

API relevante de `MCPRuntime`:

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

`register(serverLike)` es **duck-typed**: acepta cualquier `MCPRuntimeServerLike` que ofrezca `registerTool/tool`, `registerResource/resource`, `registerPrompt/prompt`. Esto permite registrar tanto en el `McpServer` real como en servidores falsos de test sin acoplar el runtime al SDK.

## Binding al SDK: `server.ts`

`server.ts` es el único módulo que toca el `McpServer` del SDK. Expone:

- `createMcpServerFromRuntime(config: MCPRuntimeServerConfig, runtime: MCPRuntime): McpServer`
- `createCacheHints(ttlMs, cacheScope)`
- la interfaz `MCPRuntimeServerConfig` (`name`, `version`, `instructions?`, `supportedVersions?`, y TTL/scope para discover/list/read).

`createMcpServerFromRuntime`:

- declara capabilities (`resources` con `subscribe`+`listChanged`, `prompts` y `tools` con `listChanged`);
- registra cada resource/template, prompt y tool del runtime en el `McpServer`;
- instala handlers **cacheables** con `ttlMs`/`cacheScope` para:
  - `tools/list`
  - `prompts/list`
  - `resources/list`
  - `resources/templates/list`
  - `resources/read`
- ordena las listas de forma determinista y separa explícitamente `resources/list` de `resources/templates/list`.

El `McpServer` resultante es agnóstico del transporte: quien lo conecta a un `StreamableHTTPServerTransport` y lo expone por HTTP es `edge-mcp` (`mountMcpRoute`).

## Eventos RxJS

`events.ts` define `MCPRuntimeEvent` (y `MCPActorEvent`, un subtipo).

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

Por tanto, `events$` no debe convertirse en una FSM improvisada. (`edge-mcp` se suscribe a `events$` para alimentar el SSE de `subscriptions/listen`, pero la decisión de qué se publica sigue siendo opt-in del cliente.)

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

El bridge no debe decidir workflows. Solo transforma requests en eventos para actores XState u otros sinks compatibles (`ActorSink`).

## MCP moderno: dónde vive ahora

Las piezas de protocolo MCP moderno se reparten entre runtime y borde:

| Pieza | Dónde vive |
| --- | --- |
| Capabilities, cache hints (`ttlMs`/`cacheScope`) en list/read | `mcp-runtime` (`server.ts`) |
| `server/discover` por `POST` | `edge-mcp` (`mountMcpRoute`) |
| `subscriptions/listen` (SSE shim, [ADR 0001](../../ADR/0001-mcp-runtime-subscriptions-shim.md)) | `edge-mcp` |
| `StreamableHTTPServerTransport`, endpoints `POST /mcp`, `GET /mcp/health`, `GET /mcp/discover` | `edge-mcp` |

Filtros opt-in del shim (`toolsListChanged`, `promptsListChanged`, `resourcesListChanged`, `resourceSubscriptions`) se aplican en `edge-mcp` sobre `runtime.events$`. Ver [EDGE.instructions.md](EDGE.instructions.md).

## Tests actuales

`runtime.test.ts` (Bun) cubre el runtime neutral contra un `FakeServer` duck-typed:

- registro de resources/prompts/tools;
- emisión de eventos runtime;
- bridge actor-like;
- eventos explícitos de notificación.

Los tests del borde (SSE, `server/discover` por POST, list/read cacheables sobre HTTP) son responsabilidad de `@network-engine/edge-mcp`.

Comando canónico:

```text
bun run typecheck && bun run test
```

## Deuda técnica real

### Deuda abierta

- Sustituir el shim manual de `subscriptions/listen` (ahora en `edge-mcp`) cuando el SDK soporte oficialmente el draft.
- Evitar dependencia de internals del SDK en tests si aparece API pública para invocar handlers.
- Diseñar adaptación futura a MCP Apps sin introducir UI en `core`.

### No deuda

- Que el borde HTTP y `subscriptions/listen` vivan en `edge-mcp` y no en el runtime es correcto: el runtime quedó transport-neutral.
- Que `core` no conozca el MCP SDK es correcto.
- Que el `McpServer` se construya en `server.ts` y se conecte al transporte fuera del paquete mantiene la frontera runtime/transporte limpia.

## Criterios de cierre del paquete runtime

- [x] Runtime consume `MCPProjectionResult`.
- [x] `core` no importa MCP SDK.
- [x] Runtime transport-neutral; borde HTTP extraído a `edge-mcp`.
- [x] `createMcpServerFromRuntime` aísla el binding al SDK en `server.ts`.
- [x] List/read devuelven caché MCP moderna.
- [x] Export único `.` (sin `./fastify`).
- [x] Tests cubren registro, eventos y actor-bridge.
- [x] Validado con Bun.

## Próximo incremento recomendado

No añadir más features antes de cerrar análisis funcional LAYER_3 y ADRs pendientes de contratos/proyecciones.

Después:

1. Preparar retirada del shim (en `edge-mcp`) cuando el SDK alcance la spec draft.
2. Evaluar MCP Apps como proyección separada, no como parte del runtime base.
3. Formalizar cómo un read model vivo dispara `notifyResourceUpdated(uri)` sin acoplarse al borde HTTP.
