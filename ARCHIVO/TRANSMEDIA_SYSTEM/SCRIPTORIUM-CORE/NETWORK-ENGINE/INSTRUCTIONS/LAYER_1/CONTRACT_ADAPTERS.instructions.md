# CONTRACT_ADAPTERS — análisis técnico estricto

## Estado

**Modo:** ASI MODE (Fase 5)  
**Capa:** LAYER_1 — análisis técnico estricto  
**Paquete:** `@network-engine/contract-adapters`  
**Código:** `packages/contract-adapters`  
**ADR asociado:** ver [`ECOSYSTEM.md`](ECOSYSTEM.md) (migración legacy) y [`ADR 0003`](../../ADR/0003-network-engine-orchestrator-package.md) (composition root)

Este documento cierra el gap documental **U1** del Programa de Investigación ASI. No sustituye a `CORE.instructions.md`; define la frontera de un adapter de migración independiente del núcleo.

## Responsabilidad del paquete

`@network-engine/contract-adapters` es la **capa anti-corrupción** entre metadatos externos (p. ej. SDKs legacy schema-driven) y el metamodelo `DomainContract` de `@network-engine/core`.

```text
EntityMetadataLike (externo)
  ↓
fromEntityMetadata()
  ↓
DomainContract
  ↓
@network-engine/mcp (proyección declarativa)
```

No define dominio propio. No registra en `McpServer`. No importa `edge-rest`, `edge-mcp` ni MCP SDK.

## Límites de capa

Permitido:

* importar tipos y `defineDomainContract` desde `@network-engine/core`;
* transformar metadatos externos en `DomainContract`, `ResourceContract`, `PromptContract`, `MutationCapability`;
* exponer funciones puras de adaptación y tests Bun sin runtime MCP.

Prohibido:

* importar `@network-engine/mcp-runtime`, paquetes `edge-*` o MCP SDK;
* almacenar estado o ejecutar efectos de persistencia;
* nombrar APIs públicas con marcas legacy (`blockly`, `entity-mcp`, etc.);
* subsumir este paquete dentro de `core` (violaría la regla de dependencias unidireccionales).

## Archivos actuales

```text
packages/contract-adapters/
  src/
    entity-metadata.ts    # fromEntityMetadata()
    entity-metadata.test.ts
    index.ts
```

## API pública

| Export | Rol |
| --- | --- |
| `EntityMetadataLike<TSchema>` | Shape mínimo de metadatos externos |
| `EntityMetadataAdapterOptions` | Opciones de URI scheme, versión, parámetro ID |
| `fromEntityMetadata()` | Puente hacia `DomainContract` |

## Integración en el ecosistema

| Consumidor | Uso |
| --- | --- |
| `@network-engine/mcp` | Recibe `DomainContract` ya adaptado para `projectDomainToMCP()` |
| `@network-engine/mcp-runtime` | Indirecto vía proyección MCP |
| Migración legacy (`ECOSYSTEM.md`) | Fase 2 del plan de refactor SDK |

## Criterios de aceptación técnicos

- [x] Paquete referenciado en `tsconfig.json` raíz.
- [x] `fromEntityMetadata()` con tests Bun.
- [x] Documentación LAYER_1 (este archivo).
- [x] Documentación LAYER_3 (`CONTRACT_ADAPTERS.functional.md`).
- [x] Trazabilidad en Matriz de `ECOSYSTEM.md`.

## Anti-patrones prohibidos

* Convertir `fromEntityMetadata()` en un generador de tools CRUD por defecto sin decisión explícita.
* Acoplar el adapter a un consumidor concreto (Blockly, palette, generator).
* Mover `DomainContract` desde `core` a este paquete.
