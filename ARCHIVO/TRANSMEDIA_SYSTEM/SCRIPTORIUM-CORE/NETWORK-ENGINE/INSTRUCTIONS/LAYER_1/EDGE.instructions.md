# EDGE — Constitución Técnica (familia de adaptadores de transporte)

> **Paquetes:** `@network-engine/edge-rest`, `@network-engine/edge-mcp`, `@network-engine/edge-graphql`, `@network-engine/edge-graphdb`, `@network-engine/edge-pubsub`
> **ADRs vigentes:** [0001](../../ADR/0001-mcp-runtime-subscriptions-shim.md) (shim `subscriptions/listen`), [0002](../../ADR/0002-graphstore-rdf-protocol.md) (GraphStore RDF), [0006](../../ADR/0006-graphql-projection.md) (proyección GraphQL), [0008](../../ADR/0008-docker-topology.md) (topología Docker)
> **Análisis funcional:** [LAYER_3/EDGE.functional.md](../LAYER_3/EDGE.functional.md)

## Estado

**Modo:** ASI MODE
**Capa:** LAYER_1 — análisis técnico estricto
**Concepto:** `EDGE` = familia de adaptadores de **transporte/borde** que sitúa los runtimes de protocolo (neutrales) sobre transportes concretos (HTTP/Fastify, Streamable HTTP, `Bun.serve`, SPARQL Protocol, Socket.IO).

Este documento existe para que los cinco paquetes `edge-*` no queden como código nuevo sin dossier técnico. Materializa la frontera **"runtime de protocolo neutral vs transporte concreto"** coherente con el flujo de capas de [`NETWORK_ENGINE.instructions.md`](NETWORK_ENGINE.instructions.md).

## Responsabilidad de la familia

La capa EDGE traduce entre el mundo neutral de los runtimes/protocolos (`core`, `mcp`, `mcp-runtime`, `graphql`, `graphdb`, `pubsub`) y un transporte físico. Cada `edge-*` es el **único** punto del sistema que conoce su detalle de transporte.

Regla de oro de la familia:

```text
El runtime de protocolo es host-agnóstico.
El transporte es swappable.
El acoplamiento al transporte vive aquí y solo aquí.
```

EDGE **no** define dominio, **no** materializa proyecciones MCP/GraphQL (eso lo hace `mcp`/`mcp-runtime`/`graphql`) y **no** contiene lógica de negocio.

## Posición en la jerarquía y grafo de dependencias

Las dependencias fluyen siempre hacia abajo. EDGE consume los paquetes base y de protocolo; **los paquetes base/protocolo nunca importan `edge-*`**.

```text
core
  └─ graphdb · graphql · pubsub · mcp · mcp-runtime      (runtimes/protocolos neutrales)
        └─ edge-rest · edge-mcp · edge-graphql · edge-graphdb · edge-pubsub   (transporte/borde)
              └─ apps (+ apps/gateway)                    (consumidor final)
```

Grafo interno de la familia (dependencias `workspace:*`):

| Paquete | Depende de (network-engine) | Depende de (externo) |
| --- | --- | --- |
| `edge-rest` | — | `fastify@^5` |
| `edge-mcp` | `edge-rest`, `mcp-runtime` | `@modelcontextprotocol/sdk` |
| `edge-graphql` | `graphql` | `Bun.serve` (runtime Bun) |
| `edge-graphdb` | `core`, `graphdb` | `fetch` global · peer `rxjs` |
| `edge-pubsub` | `core`, `pubsub` | `socket.io`, `socket.io-client` |

`edge-rest` es el único nodo de la familia sin dependencias `@network-engine/*`: es el sustrato HTTP sobre el que se apoya `edge-mcp`. El resto de `edge-*` son adaptadores independientes entre sí.

## Miembros

### `@network-engine/edge-rest` — abstracción HTTP (Fastify)

Sustrato de transporte HTTP. Encapsula Fastify v5 detrás de interfaces neutrales para que los edges de protocolo no dependan directamente del framework.

- **Código:** `packages/edge-rest/src/index.ts`.
- **API:** `createRestServer()` → `RestServer`.
- **Tipos:** `RestRequest`, `RestReply`, `RestRouteHandler`, `RestRouter`, `RestServer`.
- `RestServer extends RestRouter` y añade `listen({ port, host? })`, `close()` y `fastify` (instancia subyacente para uso avanzado).
- `RestRouter` expone `post(path, handler)` y `get(path, handler)`; `RestRequest`/`RestReply` exponen `raw` (`IncomingMessage`/`ServerResponse`) para transportes que necesitan el req/res crudo (p.ej. Streamable HTTP).
- **Límite:** solo conoce HTTP/Fastify. No conoce MCP, GraphQL ni dominio. Es el único `edge-*` que puede importar `fastify` y tipos HTTP de Node.

### `@network-engine/edge-mcp` — borde HTTP del runtime MCP

Monta el runtime MCP neutral (`@network-engine/mcp-runtime`) sobre un `RestRouter` de `edge-rest`. **Aquí vive el borde HTTP que antes residía en `mcp-runtime` (Fastify, `http-edge`), incluido el shim `subscriptions/listen`.**

- **Código:** `packages/edge-mcp/src/mcp-route.ts` (ruta), `src/types.ts`, `src/utils.ts` (helpers internos de discover/SSE), `src/index.ts` (barril).
- **API:** `mountMcpRoute(restRouter, options)` → `McpRouteRegistration { runtime, mcpServer, path }`.
- **Tipos públicos:** `McpRouteOptions`, `McpRouteRegistration`, `SubscriptionFilter`, `SubscriptionsListenRequestBody`.
- **Endpoints montados** (`path` por defecto `/mcp`):
  - `POST {path}` — endpoint MCP normativo.
  - `GET {path}/health` — salud + recuento de capabilities.
  - `GET {path}/discover` — vista auxiliar **no normativa** (el discover normativo es `POST` con `method: "server/discover"`).
- **Internamente** invoca `createMCPRuntime()` + `createMcpServerFromRuntime()` de `mcp-runtime`. Cada request Streamable HTTP recibe su propia instancia de `McpServer` + `StreamableHTTPServerTransport`; el `mcpServer` devuelto es de referencia para introspección.
- **MCP moderno** (movido aquí desde `mcp-runtime`):
  - `server/discover` por `POST` (`resultType`, `supportedVersions`, `capabilities`, `serverInfo`, `instructions?`, `ttlMs`, `cacheScope`).
  - shim `subscriptions/listen` sobre `text/event-stream` ([ADR 0001](../../ADR/0001-mcp-runtime-subscriptions-shim.md)): ack inicial `notifications/subscriptions/acknowledged`, `_meta["io.modelcontextprotocol/subscriptionId"]` en cada notificación, filtros opt-in (`toolsListChanged`, `promptsListChanged`, `resourcesListChanged`, `resourceSubscriptions`), limpieza al cerrar la conexión.
- **Límite:** único punto que toca `StreamableHTTPServerTransport`, schemas SSE y el detalle de transporte MCP. Es el único `edge-*` que depende de `edge-rest`.

### `@network-engine/edge-graphql` — gateway HTTP de la proyección GraphQL

Servidor HTTP mínimo (`Bun.serve`) para exponer una `GraphQLRuntime` de `@network-engine/graphql` ([ADR 0006](../../ADR/0006-graphql-projection.md)).

- **Código:** `packages/edge-graphql/src/index.ts`.
- **API:** `startGraphQLServer(options)` → servidor `Bun.serve`. `options`: `{ runtime, port?, host? }` (puerto por defecto `GRAPHQL_PORT` o `4000`).
- **Endpoints:** `POST /graphql` (ejecuta `runtime.execute(query, variables)`), `GET /health`.
- **Consumidor de referencia:** `@network-engine/gateway` (`packages/apps/gateway`), entrypoint Docker.
- **Límite:** no conoce el `DomainContract` ni la proyección; solo transporta consultas hacia el `GraphQLRuntime`.

### `@network-engine/edge-graphdb` — adaptador HTTP/SPARQL a GraphDB externo

Implementación de `GraphStoreProtocol` (del núcleo) que habla con un repositorio **Ontotext GraphDB** sobre el **W3C SPARQL 1.1 Protocol** (HTTP) ([ADR 0002](../../ADR/0002-graphstore-rdf-protocol.md)). Es el análogo "de borde" del store in-memory de `@network-engine/graphdb`.

- **Código:** `packages/edge-graphdb/src/index.ts`.
- **API:** `GraphDbStore` (implementa `GraphStoreProtocol`), `createGraphDbStore(config)`, `GraphDbPlugin`.
- **Tipos:** `GraphDbConfig` (`endpoint`, `repository`, `updateEndpoint?`, `username?`, `password?`).
- Usa `fetch` global (Node 18+/Bun) y construye SPARQL a mano; serializa términos vía `termToSparql` del núcleo (única fuente de escapado seguro).
- **Límite:** único punto acoplado a HTTP/GraphDB. No añade dependencias npm; toda la dependencia de red queda encapsulada aquí (igual que `FileSystemPlugin` aísla `fs`).

### `@network-engine/edge-pubsub` — transporte Socket.IO (Hub + Bridge)

Implementación de transporte inter-proceso sobre Socket.IO. Consume el **vocabulario** de transporte de `@network-engine/pubsub` (que ahora solo exporta `./types`: `NetworkTransportEvent`, `PubSubConfig`, `PUBLISHABLE`, `markPublishable`, `isPublishable`).

- **Código:** `packages/edge-pubsub/src/index.ts` (Hub), `src/bridge.ts` (Bridge).
- **API:** `PubSubHub` / `createPubSubHub(config)` (servidor Socket.IO dedicado), `PubSubBridge` / `createPubSubBridge(config, appId)` (puente RxJS ↔ Socket.IO).
- **Tipos:** `HubConfig`.
- `PubSubBridge<TSemantics>` es genérico, igual que el `NetworkOrchestrator`: `connect(orchestrator)` filtra `isPublishable` hacia el Hub e inyecta los eventos entrantes vía `dispatch`, descartando los propios (anti-loop por `source !== appId`).
- **Límite:** no contiene lógica de dominio ni reglas de transición; solo enruta y traduce. El Hub no interpreta eventos.

## Regla de dirección (invariante de capa)

```text
edge-* consume mcp-runtime / graphql / graphdb / pubsub / core.
Ninguno de esos paquetes importa edge-*.
```

Verificación rápida: si `grep` encuentra `@network-engine/edge-` dentro de `packages/{core,mcp,mcp-runtime,graphql,graphdb,pubsub}/src`, hay una violación de capa.

## Patrón canónico: `createRestServer()` + `mountMcpRoute()`

El borde HTTP MCP de una app se ensambla componiendo `edge-rest` + `edge-mcp` (reemplaza al difunto `createMcpHttpEdge()` de `mcp-runtime/http-edge`):

```ts
import { createRestServer } from '@network-engine/edge-rest';
import { mountMcpRoute } from '@network-engine/edge-mcp';

const edge = createRestServer();
mountMcpRoute(edge, { projection, server: { name, version, instructions }, handlers });
const { port } = await edge.listen({ port: config.port });
// MCP en http://localhost:${port}/mcp
```

Materializaciones reales: [`packages/apps/src/catalog/aleph-os/app.ts`](../../packages/apps/src/catalog/aleph-os/app.ts) y [`packages/apps/src/catalog/aleph-os-dynamic/app.ts`](../../packages/apps/src/catalog/aleph-os-dynamic/app.ts). Ver [APPS.instructions.md](APPS.instructions.md).

## Límites de capa (global de la familia)

Permitido:

- importar el runtime/protocolo neutral correspondiente (`mcp-runtime`, `graphql`, `graphdb`, `pubsub`) y `core` para tipos;
- en `edge-rest`/`edge-mcp`, importar Fastify, MCP SDK, transporte Streamable HTTP y tipos HTTP de Node;
- contener shims temporales de protocolo en el borde cuando exista ADR (ver [ADR 0001](../../ADR/0001-mcp-runtime-subscriptions-shim.md));
- depender de un runtime concreto (Node/Bun) en el transporte (`edge-graphql` asume Bun; `edge-rest` asume Node HTTP).

Prohibido:

- ser importado por `core`, `mcp`, `mcp-runtime`, `graphql`, `graphdb` o `pubsub`;
- definir dominio, semántica de lenguajes o reglas de transición de estado;
- reintroducir el borde HTTP dentro de `mcp-runtime`;
- convertir resources MCP en endpoints REST por defecto;
- exportar abstracciones de negocio hacia capas superiores que no sean transporte.

## Relación con otros paquetes

- **`mcp-runtime`** ([LAYER_1](MCP_RUNTIME.instructions.md) · [LAYER_3](../LAYER_3/MCP_RUNTIME.functional.md)): `edge-mcp` lo consume; el runtime quedó transport-neutral y delega el borde HTTP en `edge-mcp`.
- **`apps`** ([LAYER_1](APPS.instructions.md) · [LAYER_3](../LAYER_3/APPS.functional.md)): consumidor final del patrón `edge-rest` + `edge-mcp`.
- **`pubsub`** ([LAYER_1](PUBSUB.instructions.md)): provee el vocabulario; `edge-pubsub` provee la implementación Socket.IO.
- **`graphql`** ([LAYER_1](GRAPHQL.instructions.md)): provee la `GraphQLRuntime`; `edge-graphql` la sirve por HTTP.
- **`graphdb`** ([LAYER_0](../LAYER_0/GRAPHDB.instructions.md)): provee `GraphStoreProtocol` + store in-memory; `edge-graphdb` añade el adaptador HTTP/SPARQL.

## Checklist técnico de merge

□ El nuevo `edge-*` solo conoce su transporte; el detalle de transporte no se filtra a capas inferiores.

□ Ningún paquete base/protocolo (`core`, `mcp`, `mcp-runtime`, `graphql`, `graphdb`, `pubsub`) importa `@network-engine/edge-*`.

□ El borde HTTP MCP se compone con `createRestServer()` + `mountMcpRoute()`, no con wiring manual del SDK.

□ Los shims de protocolo en el borde citan un ADR vigente.

□ `edge-pubsub` no contiene lógica de dominio; el Bridge filtra `isPublishable` y descarta sus propios eventos.

□ Ejecuta `bun run typecheck` en el workspace sin errores.

## Referencias

- [LAYER_3/EDGE.functional.md](../LAYER_3/EDGE.functional.md) — racional funcional de la separación transporte/runtime.
- [`packages/edge-rest/src/index.ts`](../../packages/edge-rest/src/index.ts), [`packages/edge-mcp/src/mcp-route.ts`](../../packages/edge-mcp/src/mcp-route.ts), [`packages/edge-graphql/src/index.ts`](../../packages/edge-graphql/src/index.ts), [`packages/edge-graphdb/src/index.ts`](../../packages/edge-graphdb/src/index.ts), [`packages/edge-pubsub/src/index.ts`](../../packages/edge-pubsub/src/index.ts).
