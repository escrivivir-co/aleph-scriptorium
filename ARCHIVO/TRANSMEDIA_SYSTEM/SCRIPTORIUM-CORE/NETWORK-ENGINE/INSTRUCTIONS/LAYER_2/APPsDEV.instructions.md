# App Designer

## Para qué sirve este documento

Guía operativa para crear o extender aplicaciones en el catálogo de `@network-engine/apps` tras el refactor de la capa `edge-*`. Complementa la constitución técnica en [APPS.instructions.md](../LAYER_1/APPS.instructions.md) y el análisis funcional en [APPS.functional.md](../LAYER_3/APPS.functional.md).

---

# Modelo mental

```
App = unidad ejecutable registrada en el catálogo que consume Network-Engine
```

Una app **no** es el core ni un adaptador de runtime. Es un consumidor que:

1. implementa `App<TConfig, TId, TVersion>` de `@network-engine/core`;
2. se expone como `AppDescriptor` en el catálogo;
3. opcionalmente consume la familia `edge-*` para exponer HTTP/MCP/GraphQL/PubSub.

---

# Dónde viven las apps

```
packages/apps/src/
├── launcher.ts              ← entrypoint genérico (bootstrap del catálogo)
├── catalog/
│   ├── index.ts             ← registro de descriptores
│   ├── types.ts             ← AppDescriptor
│   ├── hello/               ← demo legacy (node:http)
│   ├── hub/                 ← PubSub hub (edge-pubsub)
│   ├── graph/               ← demo GraphStore (graphdb)
│   ├── aleph-os/            ← MCP App estática
│   └── aleph-os-dynamic/    ← MCP App derivada de Markdown
└── knowledge-system/        ← handlers reusables para MCP Apps

LANGUAGES/<nombre>/app/      ← apps de lenguaje derivado (aleph, compose)
packages/apps/gateway/       ← entrypoint Docker GraphQL (@network-engine/gateway)
```

Las apps de lenguaje **no** viven bajo `catalog/<lang>/`. El host importa su descriptor desde `@network-engine/<lang>-app` y lo registra en `catalog/index.ts`. Ver [LANGUAGES.instructions.md](../LAYER_1/LANGUAGES.instructions.md).

---

# Catálogo actual

| Clave | Ubicación | Tipo | Borde de transporte |
| --- | --- | --- | --- |
| `hello` | `catalog/hello/` | Demo | `node:http` (legacy) + `@network-engine/pubsub` |
| `aleph` | `LANGUAGES/aleph-lang/app` | Lenguaje | `@network-engine/edge-pubsub` (bridge) |
| `compose` / `compose-lang` | `LANGUAGES/compose-lang/app` | Lenguaje + MCP App | `edge-rest` + `edge-mcp` |
| `aleph-os` | `catalog/aleph-os/` | MCP Navigator | `edge-rest` + `edge-mcp` |
| `aleph-os-dynamic` | `catalog/aleph-os-dynamic/` | MCP Navigator dinámico | `edge-rest` + `edge-mcp` |
| `hub` | `catalog/hub/` | Infra PubSub | `edge-pubsub` (Socket.IO hub) |
| `graph` | `catalog/graph/` | Demo RDF | `@network-engine/graphdb` (sin HTTP) |

---

# Anatomía: `App` + `AppDescriptor`

Toda app implementa `App<TConfig, TId, TVersion>`:

```ts
import { App, AppStatus, createAppId } from '@network-engine/core';

type Config = { port: number };

export class MiApp implements App<Config, 'mi-app', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_mi-app'),
    rawId: 'mi-app' as const,
    name: 'Mi App',
    version: '1.0.0' as const,
  } satisfies App<Config, 'mi-app', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };

  public async init(config: Config): Promise<void> { /* ... */ }
  public async run(): Promise<void> { /* ... */ }
}
```

El catálogo no instancia la app directamente: usa un descriptor:

```ts
// packages/apps/src/catalog/types.ts
export interface AppDescriptor<TApp extends App<any, any, any>> {
  app: TApp;
  provideConfig: () => ExtractAppConfig<TApp> | Promise<ExtractAppConfig<TApp>>;
}
```

```ts
// packages/apps/src/catalog/mi-app/index.ts
export const miAppDescriptor: AppDescriptor<MiApp> = {
  app: new MiApp(),
  provideConfig: () => ({ port: Number(process.env.PORT ?? 3000) }),
};
```

---

# Patrón Launcher (catálogo)

El launcher es **genérico**. No contiene ramas `main()` por app ni un `AppRegistry` manual.

```ts
// packages/apps/src/launcher.ts
const descriptor = catalog[appName];
const config = await descriptor.provideConfig();
await descriptor.app.init(config);
await descriptor.app.run();
```

Para registrar una app nueva:

1. Crear `packages/apps/src/catalog/<id>/` con `app.ts` + `index.ts` (descriptor).
2. Importar y añadir la entrada en `packages/apps/src/catalog/index.ts`.
3. Declarar dependencias `edge-*` en `packages/apps/package.json` si la app las importa.
4. Añadir `references` en `packages/apps/tsconfig.json` a los paquetes importados.

---

# Consumo de la capa Edge

Ver [EDGE.instructions.md](../LAYER_1/EDGE.instructions.md) y [EDGE.functional.md](../LAYER_3/EDGE.functional.md).

## MCP App (patrón canónico)

```ts
import { createRestServer } from '@network-engine/edge-rest';
import { mountMcpRoute } from '@network-engine/edge-mcp';

this.edge = createRestServer();
mountMcpRoute(this.edge, { projection, server: { name, version }, handlers });
await this.edge.listen({ port: config.port });
```

Referencia: `packages/apps/src/catalog/aleph-os/app.ts`.

## PubSub Hub

```ts
import { createPubSubHub } from '@network-engine/edge-pubsub';
```

Referencia: `packages/apps/src/catalog/hub/app.ts`.

## Gateway Docker (GraphQL only)

`packages/apps/gateway` (`@network-engine/gateway`) expone GraphQL vía `startGraphQLServer()` de `@network-engine/edge-graphql`. No comparte wiring MCP con los catálogos `aleph-os*`. Ver [ADR 0008](../../ADR/0008-docker-topology.md).

---

# Arranque

Desde la raíz del monorepo (siempre **Bun**, nunca npm):

| Comando | Efecto |
| --- | --- |
| `bun run start` | Menú interactivo del catálogo |
| `bun run start <clave>` | Lanza app concreta |
| `bun run serve:aleph-os` | Atajo → `aleph-os` |
| `bun run serve:aleph-os-dynamic` | Atajo → `aleph-os-dynamic` |
| `bun run serve:compose` / `serve:compose-lang` | Atajo → compose |

---

# Checklist al añadir una app

- [ ] `rawId` único como string literal (`as const`).
- [ ] Descriptor exportado y registrado en `catalog/index.ts`.
- [ ] Dependencias `workspace:*` en `packages/apps/package.json` para cada `@network-engine/*` importado.
- [ ] `references` en `packages/apps/tsconfig.json` alineados con imports (incl. `edge-rest`, `edge-mcp`, `edge-pubsub` si aplica).
- [ ] Borde HTTP vía `edge-*`, no `@network-engine/mcp-runtime/http-edge` (export eliminado).
- [ ] `bun run typecheck` sin errores.

---

# Referencias

- [APPS.instructions.md](../LAYER_1/APPS.instructions.md) — constitución técnica
- [APPS.functional.md](../LAYER_3/APPS.functional.md) — análisis funcional
- [MONOREPO.instructions.md](MONOREPO.instructions.md) — mapa del workspace
- [ADR 0004](../../ADR/0004-mcp-apps-ui-projection.md) — MCP Apps UI
- [ADR 0009](../../ADR/0009-knowledge-system-mcp-app-builder.md) — KnowledgeSystem builder
