# Apps Technical Constitution

## Arquitectura de Dependencias

`@network-engine/apps` es el punto más alto en la jerarquía de dependencias del monorepo.

*   **Obligatorio:** Consumir `@network-engine/core` vía `workspace:*`.
*   **Permitido:** Consumir adaptadores de runtime (`@network-engine/node`, `@network-engine/browser`).
*   **Permitido:** Dependencias de infraestructura final (ej. `@network-engine/edge-rest` para HTTP, bases de datos, librerías de UI) exclusivas para levantar la app.
*   **Prohibido:** Exportar abstracciones de negocio desde `apps` hacia otros paquetes. Las apps no tienen consumidores (excepto el propio ejecutor).
*   **Prohibido:** Replicar la lógica de inicialización del `NetworkOrchestrator` de forma manual. Siempre deben usar las fábricas de los adaptadores (ej. `createNodeEngine()`).

---

# Patrones Estructurales

## 1. La Interfaz `App`

Toda aplicación ejecutable debe implementar estrictamente la interfaz genérica provista por el núcleo.

```ts
import { App, AppStatus, createAppId } from '@network-engine/core';

type Config = { port: number };

export class MiApp implements App<Config, 'mi-app', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_mi-app'),
    rawId: 'mi-app' as const,
    name: 'Mi App',
    version: '1.0.0' as const
  } satisfies App<Config, 'mi-app', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };

  public init(config: Config) { /* ... */ }
  public run() { /* ... */ }
  public isRunning(): this is App<Config, 'mi-app', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}
```

## 2. El Patrón Catálogo (Launcher)

Las apps no se auto-ejecutan. Cada una vive en una carpeta bajo `packages/apps/src/catalog/<id>/` (o en `LANGUAGES/<lang>/app/` para lenguajes derivados) y se registra en el catálogo tipado.

*   `AppDescriptor` (`catalog/types.ts`) empareja la instancia `App` con `provideConfig()`.
*   `catalog/index.ts` exporta el objeto `catalog` con todas las claves disponibles.
*   `launcher.ts` es genérico: resuelve `catalog[appName]`, llama `provideConfig()`, luego `init()` → `run()`. No contiene ramas por app ni `AppRegistry` manual.

### Inventario del catálogo

| Clave | Origen | Borde |
| --- | --- | --- |
| `hello` | `catalog/hello/` | Legacy `node:http` + `pubsub` |
| `aleph` | `@network-engine/aleph-lang-app` | `edge-pubsub` (bridge) |
| `compose` / `compose-lang` | `@network-engine/compose-lang-app` | `edge-rest` + `edge-mcp` |
| `aleph-os` | `catalog/aleph-os/` | `edge-rest` + `edge-mcp` |
| `aleph-os-dynamic` | `catalog/aleph-os-dynamic/` | `edge-rest` + `edge-mcp` |
| `hub` | `catalog/hub/` | `edge-pubsub` (hub Socket.IO) |
| `graph` | `catalog/graph/` | `graphdb` (demo in-memory, sin HTTP) |

Ver [EDGE.instructions.md](EDGE.instructions.md) y [EDGE.functional.md](../LAYER_3/EDGE.functional.md) para la frontera transporte/runtime.

---

# Evolución del Código

## Al añadir una nueva App
*   Asegurar que el `rawId` es único y es un string literal (usar `as const`).
*   Crear carpeta `catalog/<id>/` con `app.ts` + descriptor en `index.ts`.
*   Registrar la entrada en `catalog/index.ts` y declarar deps/refs en `package.json` + `tsconfig.json` de `apps`.
*   No modificar la lógica genérica de `launcher.ts` salvo rediseño acordado.

---

# Checklist Técnico de Merge

□ La aplicación implementa la interfaz genérica `App` del núcleo.

□ Se utiliza `satisfies` en el manifest para verificar los tipos de TypeScript 5.

□ La instanciación del engine se realiza importando un Factory de un adaptador, nunca usando `new NetworkOrchestrator()` directamente.

□ Ejecuta `bun run typecheck` en el workspace sin errores.

---

# MCP Apps UI (Fase 8)

Las MCP Apps interactivas se proyectan desde `DomainContract`, no desde wiring manual del SDK.

## Cadena canónica

1. `DomainContract` en el catálogo de la app (ej. `packages/apps/src/catalog/aleph-os/aleph-os.contract.ts`).
2. `projectDomainToMCP()` (`@network-engine/mcp`) — incluye `AppLauncherContract` → tool con `_meta.ui.resourceUri`.
3. `createRestServer()` (`@network-engine/edge-rest`) + `mountMcpRoute()` (`@network-engine/edge-mcp`) — `mountMcpRoute` invoca internamente `createMCPRuntime()` + `createMcpServerFromRuntime()` de `@network-engine/mcp-runtime` y monta `POST /mcp` sobre el `RestServer`. Ver [EDGE.instructions.md](EDGE.instructions.md).
4. Resource UI (`text/html;profile=mcp-app`) servido por `readResource`.

El borde HTTP ya no se importa desde `@network-engine/mcp-runtime/http-edge` (export eliminado): el runtime MCP es transport-neutral y el transporte vive en la familia `edge-*`. Patrón real en [`packages/apps/src/catalog/aleph-os/app.ts`](../../packages/apps/src/catalog/aleph-os/app.ts) y [`packages/apps/src/catalog/aleph-os-dynamic/app.ts`](../../packages/apps/src/catalog/aleph-os-dynamic/app.ts).

**Nota:** el entrypoint operacional extraído de `node` vive ahora en `packages/apps/gateway` (`@network-engine/gateway`), un gateway GraphQL mínimo para Docker que usa `startGraphQLServer()` de `@network-engine/edge-graphql`; no comparte el wiring MCP de los catálogos `aleph-os*`.

## Referencia

- Primera materialización: catálogo `aleph-os` en `@network-engine/apps` — arranque con `bun run start aleph-os` o `bun run serve:aleph-os`.
- Variante dinámica: catálogo `aleph-os-dynamic` — deriva snapshot desde índices Markdown y arranca con `bun run start aleph-os-dynamic` o `bun run serve:aleph-os-dynamic`.
- Infraestructura reusable: `packages/apps/src/knowledge-system/handlers.ts`; el builder/modelo puro vive en `@network-engine/core` según ADR 0009.
- ADR: [`ADR/0004-mcp-apps-ui-projection.md`](../../ADR/0004-mcp-apps-ui-projection.md).
- ADR: [`ADR/0009-knowledge-system-mcp-app-builder.md`](../../ADR/0009-knowledge-system-mcp-app-builder.md).
