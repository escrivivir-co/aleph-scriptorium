# ADR 0009: KnowledgeSystem builder for MCP Apps UI

## Estado

Aceptado.

## Contexto

`packages/apps/src/catalog/aleph-os` materializó el primer MCP App navigator con contrato, snapshot estático y handlers MCP duplicados. Tras sincronizar `INSTRUCTIONS/ALEPH.instructions.md` con Fases 8–9, la app estática dejó de ser la única fuente deseable: hacía falta un patrón reusable para crear servidores MCP con UI + datos + contrato sin incrustar la casuística ALEPH en el SDK.

## Decisión

### 1. Metamodelo puro en `@network-engine/core`

`packages/core/src/knowledge-system.ts` define:

- `KnowledgeSystemDefinition` — secciones, storage, modos, focus values y opciones de contrato embebidas.
- `defineKnowledgeSystem()` — inferencia literal (`const` + `satisfies`).
- `createKnowledgeSystemContract()` — proyección a `DomainContract` Resource-first.
- `buildKnowledgeSnapshot()` / `formatKnowledgeSystemText()` — snapshot JSON y fallback textual.
- `getKnowledgeResourceUris()` — URIs estables para handlers.

`core` **no** importa MCP SDK, filesystem, Vite ni `@modelcontextprotocol/*`.

### 2. Handlers y parser en `@network-engine/apps`

- `packages/apps/src/knowledge-system/handlers.ts` — `createKnowledgeSystemHandlers()` reutilizable.
- `packages/apps/src/knowledge-system/parse-instructions.ts` — derivación conservadora desde `INSTRUCTIONS/ALEPH.instructions.md`.

### 3. Dos instancias de catálogo

| App | Rol | Puerto |
| --- | --- | --- |
| `aleph-os` | Origen semántico estático simple; datos hardcodeados en `aleph-data.ts` | 3100 |
| `aleph-os-dynamic` | Snapshot derivado de índices Markdown con namespace/launcher propios | 3101 |

Ambas reutilizan la UI singlefile de `aleph-os`. La instancia estática conserva `aleph://os/*` + `show-aleph-os`; la dinámica usa `aleph://os-dynamic/*` + `show-aleph-os-dynamic` para no romper compatibilidad.

### 4. Regla de guarda

`aleph-os` no se convierte en dependencia conceptual del SDK. El patrón es `KnowledgeSystem`; ALEPH OS es una instancia huésped.

## Consecuencias

### Positivas

- Patrón estándar para futuras MCP Apps navegables.
- `aleph-os` mantiene simplicidad de definición sin duplicar infraestructura MCP.
- Variante dinámica reduce desacople entre documentación sincronizada y snapshot servido.

### Negativas / límites

- El parser Markdown es estructural, no semántico.
- La UI sigue acoplada al shape `layers`/`cognitiveMode` del snapshot ALEPH.

## Referencias

- [ADR 0004](./0004-mcp-apps-ui-projection.md)
- [`packages/core/src/knowledge-system.ts`](../packages/core/src/knowledge-system.ts)
- [`packages/apps/src/catalog/aleph-os`](../packages/apps/src/catalog/aleph-os)
- [`packages/apps/src/catalog/aleph-os-dynamic`](../packages/apps/src/catalog/aleph-os-dynamic)
