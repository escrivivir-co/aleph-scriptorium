# ADR 0004: MCP Apps UI projection from `DomainContract`

## Estado

Aceptado.

## Contexto

Fase 8 del programa ASI ([`DOSSIERS/conceptual-physical-alignment.md`](../DOSSIERS/conceptual-physical-alignment.md)) exige proyectar MCP Apps UI desde contratos de dominio, no desde wiring manual del SDK ni desde `EntityMetadata` legacy.

`packages/aleph-os-mcp-app` era un servidor autónomo (Express + `McpServer` manual). El monorepo ya tiene la cadena canónica:

`core` (`DomainContract`) → `mcp` (`projectDomainToMCP`) → `mcp-runtime` (binding + HTTP adapter) → apps/servidores.

### Decisiones abiertas resueltas

| Pregunta | Decisión |
| --- | --- |
| ¿Launcher como tool separado o extensión de `MCPToolProjection`? | Extender `MCPToolProjection` con `launcher?: boolean` y `ui?: { resourceUri }`. Los launchers se proyectan como tools con `effect: 'custom'`, sin mutación. |
| ¿HTTP edge Bun? | `node:http` bajo runtime Bun + adapter `FastifyLike` mínimo; reutiliza `registerFastifyMCPRuntime` y `StreamableHTTPServerTransport`. |
| ¿Ubicación del contrato ALEPH OS? | Dentro de `packages/apps/src/catalog/aleph-os/aleph-os.contract.ts` (dominio de la app, no `core`). |

## Decisión

### 1. `AppLauncherContract` en `core`

Añadir a [`packages/core/src/contracts.ts`](../packages/core/src/contracts.ts):

- `AppLauncherContract`: `{ name, description, uiResource, inputSchema? }`
- Campo opcional `launchers?: Record<string, AppLauncherContract>` en `DomainContract`

`core` **no** importa MCP SDK ni Fastify.

### 2. Proyección declarativa en `mcp`

[`projectDomainToMCP`](../packages/mcp/src/projection.ts) convierte cada launcher en un `MCPToolProjection` con:

- `effect: 'custom'`
- `launcher: true`
- `ui: { resourceUri: launcher.uiResource }`

Los resources de UI usan `mimeType: text/html;profile=mcp-app`.

### 3. Binding en `mcp-runtime`

[`createMCPRuntime`](../packages/mcp-runtime/src/runtime.ts) emite `_meta.ui.resourceUri` al registrar tools launcher.

[`createMcpServerFromRuntime`](../packages/mcp-runtime/src/fastify.ts) propaga `_meta` en `registerTool` y en el handler `tools/list`.

### 4. Primera materialización: ALEPH OS MCP App

`packages/apps/src/catalog/aleph-os/` (entrada de catálogo `aleph-os`, distinta de `aleph` Language Runner):

- Contrato: resources `aleph://os/*` + `ui://aleph-os/mcp-app.html`
- Sin tools CRUD; único tool: launcher `show-aleph-os`
- Servidor: `projectDomainToMCP` → `createMCPRuntime` → `createMcpHttpEdge` (`@network-engine/mcp-runtime/http-edge`)
- UI singlefile: `bun run build:aleph-os-ui` → `dist/mcp-app.html` servido por `readResource`
- Arranque: `bun run start aleph-os` (launcher) o `bun run serve:aleph-os` (alias raíz)

## Consecuencias

### Positivas

- Primera proyección MCP Apps UI end-to-end desde `DomainContract`.
- Criterio Resource-first cumplido: lectura vía resources; tool solo para abrir UI.
- Reutilización del adapter HTTP existente sin duplicar lógica MCP.

### Negativas / límites

- Launchers comparten el canal `tools` del protocolo MCP (marcados con `_meta` y `network-engine/launcher`).
- El HTTP edge usa `node:http` (compatible con Bun) en lugar de `Bun.serve` directo, por requisitos del SDK streamable HTTP.

## Referencias

- [`INSTRUCTIONS/LAYER_1/ECOSYSTEM.md`](../INSTRUCTIONS/LAYER_1/ECOSYSTEM.md) — Fase 8
- [`packages/apps/src/catalog/aleph-os/aleph-os.contract.ts`](../packages/apps/src/catalog/aleph-os/aleph-os.contract.ts)
- [MCP Apps extension](https://modelcontextprotocol.io/docs/extensions/apps/overview)
