# Monorepo Operator

## Para qué sirve este documento

Un agente ALEPH que entra a operar en el workspace necesita ubicarse en segundos.

Este documento es el índice rápido. No explica por qué. Explica dónde.

---

# Mapa del Workspace

```
NETWORK-ENGINE/                    ← raíz del monorepo
│
├── packages/                      ← código fuente (npm workspaces)
│   ├── core/                      ← @network-engine/core
│   ├── graph/                     ← @network-engine/graph
│   ├── node/                      ← @network-engine/node
│   ├── browser/                   ← @network-engine/browser
│   └── apps/                      ← @network-engine/apps
│
├── INSTRUCTIONS/                  ← constituciones y guías (este sistema)
│   ├── ALEPH.instructions.md      ← sistema operativo cognitivo del agente
│   ├── LAYER_0/                   ← constituciones por tecnología
│   ├── LAYER_1/                   ← instrucciones de dominio
│   └── LAYER_02/                  ← guías por rol (este documento)
│
├── DOSSIERS/                      ← conocimiento acumulado y líneas de investigación
├── SCRATCHPAD/                    ← zona temporal (no fuente de verdad)
├── ADR/                           ← Architecture Decision Records
│
├── package.json                   ← raíz del monorepo
├── tsconfig.json                  ← referencia a tsconfig.base.json
├── tsconfig.base.json             ← configuración TS compartida
├── bun.lock                       ← lockfile
└── .gitignore
```

---

# Packages

## @network-engine/core

Núcleo agnóstico del runtime.

```
packages/core/src/
├── types.ts          ← tipos fundamentales (Branded, Template Literal, Discriminated Unions)
├── engine.ts         ← máquina XState 5 (universeMachine)
├── orchestrator.ts   ← orquestador RxJS + XState (eventBus, plugins)
├── env.ts            ← utilidad getEnv() cross-runtime
└── index.ts          ← barrel export
```

Exporta: tipos, engine, orchestrator, env.

Sin dependencias de runtime.

---

## @network-engine/graph

Adaptador in-memory de referencia del `GraphStoreProtocol` (cero dependencias de runtime).

```
packages/graph/src/
├── index.ts          ← barrel (InMemoryGraphStore, GraphStorePlugin, createInMemoryGraphStore)
├── in-memory-store.ts ← triple-store indexado SPO/POS/OSP
├── plugin.ts         ← GraphStorePlugin (ciclo de vida install/provides)
├── sparql.ts         ← evaluador SPARQL SELECT (subconjunto)
└── keys.ts           ← helpers de serialización de términos
```

Depende de: `@network-engine/core`

---

## @network-engine/node

Adaptador para Node.js.

```
packages/node/src/
├── index.ts          ← FileSystemPlugin + createNodeEngine()
└── graph-db.ts       ← GraphDbStore / GraphDbPlugin (adaptador HTTP a Ontotext GraphDB)
```

Depende de: `@network-engine/core`

---

## @network-engine/browser

Adaptador para navegador.

```
packages/browser/src/
└── (pendiente)
```

---

## @network-engine/apps

Punto de entrada de aplicaciones.

```
packages/apps/src/
├── launcher.ts       ← App Launcher (entrypoint del monorepo)
└── hello.ts          ← HelloApp (aplicación de ejemplo)
```

Depende de: `@network-engine/core`, `@network-engine/node`

---

# Grafo de Dependencias

```
            ┌──────────────┐
            │     core     │  ← sin dependencias externas de runtime
            └──────┬───────┘
                   │
        ┌──────────┼──────────┬──────────┐
        │          │          │          │
   ┌────▼───┐ ┌───▼────┐ ┌───▼───┐ ┌───▼─────┐
   │  node  │ │browser │ │ graph │ │  ...    │
   └────┬───┘ └────────┘ └───────┘ └─────────┘
        │
   ┌────▼───┐
   │  apps  │  ← consume core + adaptadores
   └────────┘
```

`@network-engine/graph` — adaptador in-memory (`InMemoryGraphStore`/`GraphStorePlugin`); cero deps de runtime.  
`@network-engine/node` — incluye `GraphDbPlugin`/`GraphDbStore` (adaptador HTTP → Ontotext GraphDB).

---

# Scripts

Desde la raíz del monorepo:

| Comando | Qué hace |
|---|---|
| `bun run build` | `tsc -b` (build incremental de todo el monorepo) |
| `bun run typecheck` | `tsc -b` (verificación de tipos) |
| `bun test` | ejecuta todos los tests |
| `bun run test:watch` | `bun test --watch` |
| `bun run test:coverage` | `bun test --coverage` |
| `bun run start` | lanza el App Launcher (`packages/apps/src/launcher.ts`) |
| `bun run ci` | typecheck + test |
| `bun run clean` | limpia node_modules y dist de todos los packages |

---

# Configuración TypeScript

`tsconfig.base.json` en la raíz define la configuración compartida:

* `target: ESNext`
* `module: ESNext`
* `moduleResolution: Bundler`
* `strict: true`
* `composite: true` (project references)
* `exactOptionalPropertyTypes: true`
* `noUncheckedIndexedAccess: true`

Cada package tiene su propio `tsconfig.json` que extiende la base.

---

# Configuración de Entorno

Cada package tiene su propio `.env`:

* `packages/apps/.env` → variables del launcher
* `packages/core/.env` → variables del core
* `packages/node/.env` → variables del adaptador node

La utilidad `getEnv()` de core lee estas variables de forma cross-runtime.

---

# Regla de Orientación

Un agente que entre a este workspace debe:

1. Leer este documento
2. Identificar en qué package va a trabajar
3. Cargar las instrucciones relevantes de LAYER_0 y LAYER_1
4. Operar según el modo cognitivo indicado por ALEPH
