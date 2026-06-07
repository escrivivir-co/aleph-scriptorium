# Monorepo Operator

## Para qué sirve este documento

Un agente ALEPH que entra a operar en el workspace necesita ubicarse en segundos.

Este documento es el índice rápido. No explica por qué. Explica dónde.

> El "por qué" técnico vive en `LAYER_1`; el funcional en `LAYER_3`. Aquí solo el mapa operativo (LAYER_2 = guía por rol).

---

# Mapa del Workspace

```
NETWORK-ENGINE/                      ← raíz del monorepo (Bun workspaces)
│
├── packages/                        ← código fuente (workspace: packages/*)
│   ├── core/                        ← @network-engine/core
│   ├── node/                        ← @network-engine/node
│   ├── browser/                     ← @network-engine/browser
│   ├── graphdb/                     ← @network-engine/graphdb
│   ├── mongo/                       ← @network-engine/mongo
│   ├── mcp/                         ← @network-engine/mcp
│   ├── mcp-runtime/                 ← @network-engine/mcp-runtime
│   ├── graphql/                     ← @network-engine/graphql
│   ├── pubsub/                      ← @network-engine/pubsub
│   ├── edge-rest/                   ← @network-engine/edge-rest
│   ├── edge-mcp/                    ← @network-engine/edge-mcp
│   ├── edge-graphql/                ← @network-engine/edge-graphql
│   ├── edge-graphdb/                ← @network-engine/edge-graphdb
│   ├── edge-pubsub/                 ← @network-engine/edge-pubsub
│   ├── contract-adapters/           ← @network-engine/contract-adapters
│   ├── network-engine/              ← @network-engine/network-engine (composition root)
│   └── apps/                        ← @network-engine/apps
│       └── gateway/                 ← @network-engine/gateway (entrypoint Docker)
│
├── LANGUAGES/                       ← lenguajes derivados (workspaces: LANGUAGES/*/package y LANGUAGES/*/app)
│   ├── aleph-lang/                  ← package (@network-engine/aleph-lang) + app + definition
│   └── compose-lang/                ← package (@network-engine/compose-lang) + app
│
├── INSTRUCTIONS/                    ← constituciones y guías (este sistema)
│   ├── ALEPH.instructions.md        ← sistema operativo cognitivo del agente
│   ├── LAYER_0/                     ← constituciones por tecnología
│   ├── LAYER_1/                     ← instrucciones de dominio (técnico)
│   ├── LAYER_2/                     ← guías por rol (este documento)
│   └── LAYER_3/                     ← diseño funcional
│
├── DOSSIERS/                        ← conocimiento acumulado y líneas de investigación
├── SCRATCHPAD/                      ← zona temporal (no fuente de verdad)
├── ADR/                             ← Architecture Decision Records
│
├── package.json                     ← raíz del monorepo (Bun workspaces)
├── tsconfig.json                    ← project references de todos los paquetes
├── tsconfig.base.json               ← configuración TS compartida
├── bun.lock                         ← lockfile (Bun)
└── .gitignore
```

> **Lenguajes derivados:** `aleph-lang` y `compose-lang` ya **no** viven bajo `packages/`. Viven en `LANGUAGES/<nombre>/{package,app}` y se publican como `@network-engine/<nombre>` / `@network-engine/<nombre>-app`. Ver [`LANGUAGES.instructions.md`](../LAYER_1/LANGUAGES.instructions.md).

---

# Packages

17 paquetes bajo `packages/*` + el sub-paquete operativo `packages/apps/gateway`. Agrupados por capa arquitectónica.

## Núcleo

### `@network-engine/core`

Núcleo agnóstico del runtime.

```
packages/core/src/
├── types.ts          ← tipos fundamentales (Branded, Template Literal, Discriminated Unions)
├── contracts.ts      ← DomainContract / ResourceContract / PromptContract + defineDomainContract()
├── engine.ts         ← máquina XState 5 (createNetworkMachine)
├── orchestrator.ts   ← orquestador RxJS + XState (eventBus, plugins)
├── env.ts            ← utilidad getEnv() cross-runtime
└── index.ts          ← barrel export
```

Sin dependencias de runtime. No importa MCP, ni Fastify, ni adaptadores.

## Adaptadores de runtime

### `@network-engine/node`

Adaptador Node/Bun: `FileSystemPlugin` + `createNodeEngine()`.

Depende de: `core`.

### `@network-engine/browser`

Adaptador para navegador (pendiente).

## Stores (persistencia)

### `@network-engine/graphdb`

Adaptador in-memory de referencia del `GraphStoreProtocol` (triple-store indexado SPO/POS/OSP + evaluador SPARQL SELECT). Cero dependencias de runtime. (Antes se llamaba `graph`.)

Depende de: `core`.

### `@network-engine/mongo`

Adaptador MongoDB del `DocumentStoreProtocol` + change streams. Expone además `createInMemoryDocumentStore()`.

Depende de: `core`, `mongodb`.

## Protocolo (MCP)

### `@network-engine/mcp`

Proyección declarativa MCP desde `DomainContract` (`projectDomainToMCP()`). Exports: `.`, `./projection`, `./server`.

Depende de: `core`, `node`, `@modelcontextprotocol/sdk`, `aleph-lang`.

### `@network-engine/mcp-runtime`

Runtime de ejecución MCP **transport-neutral**: materializa la proyección en un `McpServer` real (`createMcpServerFromRuntime()`), stream de eventos RxJS y bridge a actor XState. **No** contiene HTTP/Fastify — el borde HTTP vive en `edge-mcp`/`edge-rest`. Export único `.`.

Depende de: `mcp`, `@modelcontextprotocol/sdk`, `rxjs`, `zod`.

## Proyección

### `@network-engine/graphql`

Proyección declarativa GraphQL desde `DomainContract` + runtime (`createGraphQLRuntime()`). Exports: `.`, `./projection`.

Depende de: `core`, `mcp-runtime`, `graphql`.

## Transporte de eventos

### `@network-engine/pubsub`

Bus pub-sub reactivo (RxJS): abstracción de transporte de eventos. El hub Socket.IO concreto vive en `edge-pubsub`.

Depende de: `rxjs`.

## Familia EDGE (transporte / borde)

Adaptadores de borde que exponen el runtime neutral al exterior (HTTP, MCP HTTP, GraphQL, Socket.IO, SPARQL). Detalle técnico en [`EDGE.instructions.md`](../LAYER_1/EDGE.instructions.md).

### `@network-engine/edge-rest`

Borde HTTP REST sobre Fastify: `createRestServer()`.

Depende de: `fastify`.

### `@network-engine/edge-mcp`

Borde MCP Streamable HTTP: `mountMcpRoute()` monta el endpoint `/mcp` sobre un `edge-rest` consumiendo `mcp-runtime`. Aquí vive el HTTP edge que antes estaba en `mcp-runtime/fastify`.

Depende de: `edge-rest`, `mcp-runtime`, `@modelcontextprotocol/sdk`.

### `@network-engine/edge-graphql`

Borde GraphQL: `startGraphQLServer()` (servidor Bun mínimo) que sirve la proyección de `graphql`.

Depende de: `graphql`.

### `@network-engine/edge-graphdb`

Borde hacia motores GraphDB externos: `GraphDbStore`/`GraphDbPlugin` (adaptador HTTP W3C SPARQL 1.1 → Ontotext GraphDB/RDF4J). Encapsula toda la red. Antes vivía en `node/graph-db.ts`.

Depende de: `core`, `graphdb`.

### `@network-engine/edge-pubsub`

Hub de eventos Socket.IO: `PubSubHub`/`createPubSubHub()` + bridge cliente/servidor sobre `pubsub`.

Depende de: `core`, `pubsub`, `socket.io`, `socket.io-client`.

## Composition root

### `@network-engine/network-engine`

Ensambla `core` + `node` + `pubsub` + `mcp` + `mcp-runtime` + `mongo` (document sync). `createNetworkEngine(machine)`. Ver [ADR 0003](../../ADR/0003-network-engine-orchestrator-package.md).

Depende de: `core`, `node`, `pubsub`, `mcp`, `mcp-runtime`, `mongo`.

## Anti-corrupción

### `@network-engine/contract-adapters`

Transforma metadatos externos (p. ej. `EntityMetadata` legacy) en `DomainContract` (`fromEntityMetadata()`). Capa de migración neutral.

Depende de: `core`.

## Aplicaciones

### `@network-engine/apps`

App runner + catálogo.

```
packages/apps/src/
├── launcher.ts       ← App Launcher (entrypoint del monorepo)
└── catalog/          ← catálogo (incluye MCP Navigator ALEPH OS)
```

Importa los descriptores de las apps de lenguaje (`@network-engine/aleph-lang-app`, `@network-engine/compose-lang-app`).

Depende de: `core`, `network-engine`, `pubsub`, `graphdb`, `mcp`, `mcp-runtime`, `edge-rest`, `edge-mcp`, `edge-pubsub` + apps de lenguaje.

### `@network-engine/gateway` (`packages/apps/gateway`)

Entrypoint operativo (Docker): gateway **GraphQL-only** con store in-memory o Mongo. Extraído de lo que antes vivía en `packages/node`.

Depende de: `core`, `mongo`, `graphql`, `edge-graphql`.

---

# Grafo de Dependencias

Flujo de capas: **core → adaptadores/stores → protocolo/proyección → edge → apps**.

```
core
 ├─ node              (adapter runtime)
 ├─ browser           (adapter runtime)
 ├─ graphdb           (store in-memory)
 ├─ mongo             (store documental)
 ├─ pubsub  → rxjs    (bus de eventos)
 └─ contract-adapters

mcp          → core, node                 (proyección MCP)
graphql      → core, mcp-runtime          (proyección GraphQL)
mcp-runtime  → mcp                         (runtime neutral, sin HTTP)

edge-rest    → fastify                     (borde HTTP)
edge-mcp     → edge-rest, mcp-runtime      (borde MCP HTTP: mountMcpRoute)
edge-graphql → graphql                     (borde GraphQL)
edge-graphdb → core, graphdb               (borde SPARQL/Ontotext)
edge-pubsub  → core, pubsub                (hub Socket.IO)

network-engine → core, node, pubsub, mcp, mcp-runtime, mongo   (composition root)

apps    → network-engine + adaptors + edge-* + apps de lenguaje
gateway → core, mongo, graphql, edge-graphql
```

Reglas de capa:

* `core` no importa adaptadores, ni MCP, ni Fastify. Los adaptadores y stores importan `core`, nunca al revés.
* `mcp-runtime` es transport-neutral: el HTTP/Fastify vive en la familia `edge-*`.
* `edge-*` importa runtime/proyección; las apps importan `edge-*` + composition root.

---

# Scripts

Desde la raíz del monorepo. Gestor de paquetes: **Bun** (no npm).

| Comando | Qué hace |
|---|---|
| `bun install` | instala dependencias del workspace |
| `bun run build` | `bun x tsc -b` (build incremental del monorepo) |
| `bun run typecheck` | `bun x tsc -b` (verificación de tipos) |
| `bun test` | ejecuta todos los tests (`packages/*` + `LANGUAGES/*`) |
| `bun run test:watch` | tests en watch |
| `bun run test:coverage` | tests con cobertura |
| `bun run start` | lanza el App Launcher (`packages/apps/src/launcher.ts`) |
| `bun run serve:aleph-os` / `serve:aleph-os-dynamic` / `serve:compose` / `serve:compose-lang` | lanza apps concretas del catálogo |
| `bun run ci` | typecheck + test |
| `bun run clean` | limpia `node_modules` y `dist` |
| `bun run validate:traceability` | valida la matriz de trazabilidad |

> Usar siempre **Bun** (`bun install`, `bun run`, `bun x`). No usar `npm`.

---

# Configuración TypeScript

`tsconfig.base.json` en la raíz define la configuración compartida:

* `target: ESNext`, `module: ESNext`, `moduleResolution: Bundler`
* `strict: true`, `composite: true` (project references)
* `exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true`

Cada package tiene su propio `tsconfig.json` que extiende la base. El `tsconfig.json` raíz declara los project references de todos los paquetes (incluidos `LANGUAGES/*`).

---

# Configuración de Entorno

La utilidad `getEnv()` de `core` lee variables de forma cross-runtime (Node/Bun/Browser). Los paquetes que necesitan configuración (p. ej. `apps`, `gateway`, `edge-*`) leen su `.env` local o variables de entorno (`GRAPHQL_PORT`, endpoints GraphDB/Mongo, etc.).

---

# Regla de Orientación

Un agente que entre a este workspace debe:

1. Leer este documento.
2. Identificar en qué package/capa va a trabajar (núcleo, adaptador, store, protocolo, proyección, edge, composition root o app).
3. Cargar las instrucciones relevantes de LAYER_0 (tecnología) y LAYER_1 (dominio).
4. Operar según el modo cognitivo indicado por ALEPH.
