# TODO_ECOSYSTEM — Refactor del SDK legacy hacia Network-Engine

## Estado cognitivo

**Modo:** ASI MODE  
**Capa:** LAYER_1 — análisis técnico estricto  
**Tema:** migración/refactor del SDK legacy TypeScript/MCP hacia la nueva máquina Network-Engine.  
**Entrada legacy principal:** `ARCHIVO/MPC-MESH/CODEBASE/blockly-sdk/packages/blockly-mcp-entity`.

**Programa ASI:** [`DOSSIERS/conceptual-physical-alignment.md`](../../DOSSIERS/conceptual-physical-alignment.md) — Fase 9 en ejecución.

---

## Matriz de Trazabilidad Conceptual ↔ Física

Mapeo canónico entre conceptos del OS Cognitivo (`INSTRUCTIONS`) y paquetes del monorepo (`packages/*`).

> **Regla:** no todo concepto tiene paquete homónimo. `NETWORK_ENGINE` (lenguaje) ≠ `@network-engine/network-engine` (composition root). Ver [ADR 0003](../../ADR/0003-network-engine-orchestrator-package.md).

### Paquetes del monorepo

| Paquete | Concepto | LAYER_1 | LAYER_3 | Rol arquitectónico | Estado |
| --- | --- | --- | --- | --- | --- |
| `core` | CORE | [CORE.instructions.md](CORE.instructions.md) | [CORE.functional.md](../LAYER_3/CORE.functional.md) | Núcleo agnóstico: tipos, contratos, orquestador genérico | ✅ Alineado |
| `node` | NODE | [NODE.instructions.md](NODE.instructions.md) | [NODE.functional.md](../LAYER_3/NODE.functional.md) | Runtime adapter Node/Bun (`FileSystemPlugin`, `createNodeEngine`) | ✅ Alineado |
| `browser` | BROWSER | [BROWSER.instructions.md](BROWSER.instructions.md) | [BROWSER.functional.md](../LAYER_3/BROWSER.functional.md) | Runtime adapter Browser (pendiente) | ✅ Alineado |
| `apps` | APPS | [APPS.instructions.md](APPS.instructions.md) | [APPS.functional.md](../LAYER_3/APPS.functional.md) | Catálogo: `hello`, `hub`, `graph`, `aleph-os*`, + descriptores `aleph`/`compose` desde `LANGUAGES/` ([ADR 0004](../../ADR/0004-mcp-apps-ui-projection.md), [0009](../../ADR/0009-knowledge-system-mcp-app-builder.md)) | ✅ Alineado |
| `apps/gateway` | APPS (Docker) | [APPS.instructions.md](APPS.instructions.md) | [APPS.functional.md](../LAYER_3/APPS.functional.md) | `@network-engine/gateway` — entrypoint GraphQL-only Docker (`edge-graphql`); ver [ADR 0008](../../ADR/0008-docker-topology.md) | ✅ Alineado |
| `pubsub` | PUBSUB | [PUBSUB.instructions.md](PUBSUB.instructions.md) | [PUBSUB.functional.md](../LAYER_3/PUBSUB.functional.md) | Contratos y bridge cliente Socket.IO | ✅ Alineado |
| `graphdb` | GRAPH_STORE | [GRAPHDB.instructions.md](../LAYER_0/GRAPHDB.instructions.md) | — | Adaptador in-memory de `GraphStoreProtocol` | ✅ Alineado |
| `mcp` | MCP (proyección) | [ECOSYSTEM.md](ECOSYSTEM.md) §MCP | — | Proyección declarativa MCP desde contratos | ✅ Alineado |
| `mcp-runtime` | MCP_RUNTIME | [MCP_RUNTIME.instructions.md](MCP_RUNTIME.instructions.md) | [MCP_RUNTIME.functional.md](../LAYER_3/MCP_RUNTIME.functional.md) | Ejecución MCP transport-neutral (`runtime/` + `server.ts`) | ✅ Alineado |
| `edge-rest` | EDGE | [EDGE.instructions.md](EDGE.instructions.md) | [EDGE.functional.md](../LAYER_3/EDGE.functional.md) | Servidor REST (Fastify encapsulado) | ✅ Alineado |
| `edge-mcp` | EDGE | [EDGE.instructions.md](EDGE.instructions.md) | [EDGE.functional.md](../LAYER_3/EDGE.functional.md) | MCP Streamable HTTP + SSE (`mountMcpRoute`) | ✅ Alineado |
| `edge-graphql` | EDGE | [EDGE.instructions.md](EDGE.instructions.md) | [EDGE.functional.md](../LAYER_3/EDGE.functional.md) | Servidor Bun GraphQL | ✅ Alineado |
| `edge-graphdb` | EDGE | [EDGE.instructions.md](EDGE.instructions.md) | [EDGE.functional.md](../LAYER_3/EDGE.functional.md) | Adaptador HTTP Ontotext GraphDB | ✅ Alineado |
| `edge-pubsub` | EDGE | [EDGE.instructions.md](EDGE.instructions.md) | [EDGE.functional.md](../LAYER_3/EDGE.functional.md) | Hub Socket.IO servidor | ✅ Alineado |
| `contract-adapters` | CONTRACT_ADAPTERS | [CONTRACT_ADAPTERS.instructions.md](CONTRACT_ADAPTERS.instructions.md) | [CONTRACT_ADAPTERS.functional.md](../LAYER_3/CONTRACT_ADAPTERS.functional.md) | Anti-corrupción: metadatos externos → `DomainContract` | ✅ Fase 5 |
| `LANGUAGES/aleph-lang` | LANGUAGES (huésped) | [LANGUAGES.instructions.md](LANGUAGES.instructions.md) | [LANGUAGES.functional.md](../LAYER_3/LANGUAGES.functional.md) | Primer lenguaje derivado bajo `LANGUAGES/`, no en `packages/` | ✅ Alineado |
| `network-engine` | NETWORK_ENGINE (orquestador) | [NETWORK_ENGINE.instructions.md](NETWORK_ENGINE.instructions.md) | [NETWORK_ENGINE.functional.md](../LAYER_3/NETWORK_ENGINE.functional.md) | Composition root: ensambla core+node+pubsub+mcp+mcp-runtime+mongo (document sync) | ✅ Fase 9 |
| `mongo` | DOCUMENT_STORE (Mongo) | [MONGO.instructions.md](MONGO.instructions.md) | [MONGO.functional.md](../LAYER_3/MONGO.functional.md) | Adaptador MongoDB de `DocumentStoreProtocol` + change streams ([ADR 0005](../../ADR/0005-document-store-async-first.md)) | ✅ Fase 9 |
| `graphql` | GRAPHQL (proyección) | [GRAPHQL.instructions.md](GRAPHQL.instructions.md) | [GRAPHQL.functional.md](../LAYER_3/GRAPHQL.functional.md) | Proyección declarativa GraphQL desde contratos ([ADR 0006](../../ADR/0006-graphql-projection.md)) | ✅ Fase 9 |

### Materializaciones LAYER_0 (drivers)

| LAYER_0 | Paquete | Notas |
| --- | --- | --- |
| [GRAPHDB.instructions.md](../LAYER_0/GRAPHDB.instructions.md) | `graphdb`, `edge-graphdb` | Contrato en `core`; in-memory en `graphdb`; HTTP GraphDB en `edge-graphdb` |
| [MCP.instructions.md](../LAYER_0/MCP.instructions.md) | `mcp`, `mcp-runtime`, `edge-mcp` | Proyección + runtime neutral + borde HTTP MCP |
| [SOCKETIO.instructions.md](../LAYER_0/SOCKETIO.instructions.md) | `pubsub`, `edge-pubsub` | Bridge cliente + hub servidor |
| [RXJS.instructions.md](../LAYER_0/RXJS.instructions.md) | `core` (`orchestrator.ts`) | Infraestructura reactiva del núcleo |
| [MONGODB.instructions.md](../LAYER_0/MONGODB.instructions.md) | `mongo` | Driver documental + change streams |
| [GRAPHQL.instructions.md](../LAYER_0/GRAPHQL.instructions.md) | `graphql` | Proyección GraphQL declarativa |
| [XSTATE.instructions.md](../LAYER_0/XSTATE.instructions.md) | `core` (`engine.ts`) | Semántica operacional del núcleo |
| [TS.instructions.md](../LAYER_0/TS.instructions.md) | Todo el monorepo | Metalenguaje anfitrión (Capa 0) |

### Conceptos sin paquete homónimo (intencional)

| Concepto | Naturaleza | Artefactos |
| --- | --- | --- |
| NETWORK_ENGINE (lenguaje) | Metamodelo / plataforma conceptual | `LAYER_1` + `LAYER_3` NETWORK_ENGINE.* |
| SEMANTINC (contenido ontológico) | Capa 2 operativa — ontologías hospedadas | [SEMANTINC.instructions.md](../LAYER_2/SEMANTINC.instructions.md) |
| LANGUAGES (generalización) | Dossier conceptual de lenguajes derivados | `LAYER_1/LANGUAGES`, `LAYER_3/LANGUAGES`, `LANGUAGES/` |

---

Este documento transforma la intuición inicial:

```text
Dominio
  ↓
Contratos
  ↓
OpenAPI / edge-rest / MCP / Apps
```

en un plan de trabajo explícito para evitar que la nueva máquina herede el anti-patrón legacy:

```text
EntityManager
  ↓
CRUD Tools
  ↓
REST endpoints disfrazados de MCP
```

La dirección estratégica queda fijada así:

```text
Language Definition
  ↓
Domain Contracts
  ↓
Resources + Resource Templates
  ↓
Prompts
  ↓
Sampling
  ↓
Tools
  ↓
Adapters HTTP (edge-*) / OpenAPI / UI
```

## Diagnóstico del SDK legacy

### Paquete observado

`@agentic/blockly-mcp-entity` se declara como:

> Generic entity management for MCP servers with CRUD tools and schema-driven UI.

Su arquitectura efectiva es:

```text
EntityMetadata<T>
  ↓
EntityManager<T>
  ↓
registerEntityTools()
  ↓
EntityMCPAppsServer<T>
  ↓
HTTP + MCP Apps + REST + CRUD
```

### Componentes rescatables

| Componente legacy | Valor | Destino probable |
| --- | --- | --- |
| `EntityMetadata<T>` | Describe nombre, plural, schema, defaults, campos UI | Evolucionar a `DomainContract` / `ResourceContract` |
| `EntityManager<T>` | CRUD genérico + persistencia | Partir en `Repository`, `MutationService`, `ReadModel` |
| `IStorageAdapter` | Abstracción de persistencia | Mantener como inspiración, pero volverla async-first |
| `jsonSchemaToZod()` | Proyección JSON Schema → validación runtime | Mantener como adapter, no como núcleo |
| `registerEntityResources()` | Ya registra Resource Templates MCP | Rescatar e invertir: debe ser primario, no accesorio |
| `registerEntityPrompts()` | Genera prompts estándar | Rediseñar como protocolos semánticos, no ayudas para tools |
| `registerEntityTools()` | Genera 7 tools CRUD | Convertir en capa opcional de mutaciones/capabilities |
| `registerEntityManagerUI()` | MCP Apps UI genérica | Convertir en proyección UI de contracts/resources |
| `BuildTaskManager` | Patrón útil para efectos async | Reubicar en capa de Tools/effects |
| `EntityMCPAppsServer` | Factory conveniente | Reemplazar por composición de adapters |

### Componentes con acoplamiento excesivo

`EntityMCPAppsServer<T>` mezcla responsabilidades que en Network-Engine deben separarse:

```text
Storage
MCP server
MCP resources
MCP prompts
MCP tools
MCP Apps UI
HTTP server
REST routes
Inspector
Lifecycle
```

Esto fue práctico para el SDK legacy, pero es peligroso para Network-Engine porque convierte una entidad en un mini-framework vertical. La nueva máquina necesita proyecciones desacopladas desde un contrato común.

### Consumidores legacy detectados

El paquete no es aislado. Hay consumidores reales que condicionan la migración:

- `blockly-mcp-palette`
  - extiende `EntityMCPAppsServer<PaletteEntity>`
  - añade tools de efectos reales: crear desde template, build, marketplace publish/unpublish
  - usa `BuildTaskManager`
- `blockly-mcp-generator`
  - extiende `EntityMCPAppsServer<GeneratorEntity>`
  - añade tools de generación/exportación de código
- `blockly-mcp-toolbox`
  - depende del mismo framework de entidades
- `blockly-storage-mongodb`
  - implementa persistencia alternativa para la interfaz de storage

Conclusión: el refactor debe incluir una capa de compatibilidad o un camino de migración progresivo. Cortar de golpe rompería demasiado ecosistema.

## Corrección arquitectónica MCP

La regla de `LAYER_0/MCP.instructions.md` domina este refactor:

```text
Resources
  ↓
Resource Templates
  ↓
Prompts
  ↓
Sampling
  ↓
Tools
```

Por tanto, una entidad de dominio no debe proyectarse primero como tools CRUD.

### Lecturas no son tools

Legacy:

```text
entity_palette_list
entity_palette_export
entity_generator_list
```

Destino:

```text
resource://palettes
resource://palettes/{id}
resource://generators
resource://generators/{id}
```

Si una operación solo expone conocimiento, estado o contexto razonable por el modelo, debe ser Resource o Resource Template.

### Interacciones semánticas son prompts

Legacy:

```text
new-palette → “usa entity_palette_create”
manage-palettes → lista tools disponibles
```

Destino:

```text
prompt://palette/design
prompt://palette/review
prompt://palette/migration-plan
prompt://generator/design-language
prompt://universe/expand
```

Un Prompt MCP debe ser un protocolo de interacción, no una frase que empuja al agente a invocar una tool.

### Reflexión es sampling

Tareas como:

- criticar una ontología
- evaluar consistencia de un universo
- revisar un contrato
- planificar una migración
- detectar anti-patrones en un lenguaje derivado

no deberían nacer como tools. Deben pasar por Prompt + Sampling salvo que haya una mutación real.

### Efectos son tools

Tools legítimas:

- crear/persistir una entidad
- actualizar una entidad
- borrar una entidad
- importar datos
- publicar en marketplace
- ejecutar build
- escribir archivos
- invocar procesos externos

En resumen:

```text
Read = Resource
Ask/Guide = Prompt
Think/Critique = Sampling
Mutate/IO = Tool
```

## Tesis de la nueva máquina

Network-Engine no debe portar `EntityMCPAppsServer`.

Debe extraer su valor y reemplazarlo por una arquitectura Contract First / Resource First:

```text
DomainContract
  ├─ identity
  ├─ schema
  ├─ resource model
  ├─ prompt protocols
  ├─ mutation capabilities
  ├─ storage binding
  ├─ UI hints
  └─ projections
       ├─ MCP resources/templates
       ├─ MCP prompts
       ├─ MCP tools
       ├─ OpenAPI schemas
       ├─ HTTP routes (edge-rest)
       └─ MCP Apps UI
```

OpenAPI, edge-rest y MCP no son el dominio.

Son vistas del dominio.

## Modelo conceptual propuesto

### `DomainContract`

Unidad primaria de definición.

Representa qué existe, cómo se identifica, qué estructura tiene, qué puede exponerse como contexto y qué mutaciones están permitidas.

Debe reemplazar gradualmente a `EntityMetadata<T>`.

Campos conceptuales:

- `kind`: identificador estable del tipo de dominio.
- `display`: nombres humano/LLM-friendly.
- `schema`: contrato estructural.
- `identity`: política de ID.
- `resources`: recursos concretos y templates.
- `prompts`: protocolos MCP asociados.
- `sampling`: tareas cognitivas delegables.
- `mutations`: capacidades con efectos.
- `storage`: binding a repositorio.
- `ui`: hints para forms/apps.
- `projections`: configuración de adapters.

### `ResourceContract`

Describe contexto, no acciones.

Ejemplos:

```text
resource://network/contracts
resource://network/contracts/{kind}
resource://palettes
resource://palettes/{id}
resource://generators
resource://generators/{language}
resource://universes/{id}
resource://ontologies/{id}
```

Debe poder indicar:

- URI o URI template.
- MIME type.
- visibilidad de campos.
- serializador.
- relación con otros resources.
- si es enumerable.
- si es indexable/searchable.

### `PromptContract`

Un prompt no es una string suelta.

Debe declarar:

- objetivo.
- inputs.
- outputs esperados.
- resources requeridos.
- sampling recomendado.
- tools permitidas, si las hay.
- criterios de aceptación.

Ejemplo conceptual:

```text
prompt://palette/design
  inputs: idea, targetRuntime, constraints
  requires: resource://palettes, resource://blocks
  output: PaletteDesignProposal
  sampling: critique-design
  tools: palette_persist only after confirmation
```

### `MutationCapability`

Sustituye a la generación automática indiscriminada de CRUD tools.

Una mutación debe existir porque el dominio la necesita, no porque una tabla tenga filas.

Ejemplos:

```text
persistPalette
deleteEmptyPalette
buildPalette
publishPalette
registerGeneratorLanguage
exportGeneratedProject
```

Las mutaciones genéricas (`create`, `update`, `delete`) pueden existir, pero deben ser capacidades explícitas y configurables, no el default mental.

## Paquetes candidatos en Network-Engine

La nomenclatura exacta queda abierta, pero la separación recomendada es:

```text
@network-engine/core
  Contratos, tipos, registry, metamodelo.

@network-engine/schema
  JSON Schema, Zod, inferencia, validadores, codecs.

@network-engine/storage
  Repository interfaces, adapters, migrations.

@network-engine/mcp
  Proyección MCP: resources, templates, prompts, tools, sampling.

@network-engine/http
  OpenAPI/edge-rest como adapter HTTP.

@network-engine/apps
  MCP Apps/UI generada desde contracts/resources.

@network-engine/contract-adapters
  Adaptadores neutrales para transformar metadatos externos en DomainContracts.
```

Regla de capas:

```text
core no importa mcp
core no importa edge-rest ni MCP SDK
core no importa apps
core no importa storage concreta
```

Los adapters importan el core, nunca al revés.

## Diseño TypeScript recomendado

Este refactor es una oportunidad para convertir TypeScript en metamodelo, no solo en lenguaje de implementación.

Capacidades TS de interés:

- `satisfies` para validar contratos sin perder inferencia literal.
- `const type parameters` para preservar nombres de resources/prompts/tools.
- `template literal types` para URIs MCP tipadas.
- `branded types` para IDs y URIs de dominio.
- `discriminated unions` para capabilities.
- `mapped types` para derivar projections.
- `conditional types` para separar read capabilities de mutation capabilities.
- `exhaustive checking` para asegurar que toda capability tenga proyección o decisión explícita.

### Idea de tipo central

No implementar todavía sin ADR, pero orientar el diseño hacia algo como:

```text
defineDomainContract({
  kind: 'palette',
  schema,
  resources: {...},
  prompts: {...},
  mutations: {...},
}) satisfies DomainContract
```

El objetivo es que el compilador pueda inferir:

- URIs válidas.
- nombres de prompts válidos.
- tools derivables.
- payloads de mutación.
- formas de resource output.
- proyecciones OpenAPI.

## Plan de migración

### Fase 0 — Inventario legacy

- [ ] Mapear todos los paquetes que dependen de `@agentic/blockly-mcp-entity`.
- [ ] Clasificar consumidores por patrón:
  - CRUD puro.
  - CRUD + tools de dominio.
  - CRUD + build async.
  - CRUD + marketplace/publicación.
  - storage custom.
- [ ] Documentar qué tools son lecturas y cuáles son mutaciones reales.
- [ ] Crear tabla `legacy tool → resource/prompt/tool destino`.

### Fase 1 — Kernel de contratos

- [ ] Diseñar `DomainContract`.
- [ ] Diseñar `ResourceContract`.
- [ ] Diseñar `PromptContract`.
- [ ] Diseñar `MutationCapability`.
- [ ] Diseñar `ProjectionRegistry`.
- [ ] Definir política de IDs con branded types.
- [ ] Definir serialización de contratos a JSON Schema.

### Fase 2 — Adapter desde `EntityMetadata`

- [x] Crear función `fromEntityMetadata()` en `@network-engine/contract-adapters`.
- [ ] Mapear `entityName`, `pluralName`, `schema`, `defaults`, `hiddenFields`, `readOnlyFields`.
- [ ] Generar resources por defecto:
  - collection resource.
  - item resource template.
  - optional UI resource.
- [ ] Generar mutations solo si están habilitadas explícitamente.
- [ ] Marcar todas las tools CRUD heredadas como `legacyProjection`.

### Fase 3 — MCP Resource-first projection

- [ ] Implementar generador de `resources/list` y `resources/templates/list` desde contracts.
- [ ] Implementar `resources/read` desde repositories/read models.
- [ ] Soportar MIME types:
  - `application/json`
  - `text/markdown`
  - `text/html;profile=mcp-app`
- [ ] Evitar que `list` sea una tool por defecto.
- [ ] Añadir tests de clasificación: read-only nunca genera tool salvo decisión explícita.

### Fase 4 — Prompt protocols

- [ ] Reescribir prompts legacy (`new-*`, `manage-*`, `list-*`) como protocolos.
- [ ] Declarar inputs/outputs/contexto requerido.
- [ ] Separar prompts de intención:
  - diseño.
  - revisión.
  - migración.
  - diagnóstico.
  - persistencia asistida.
- [ ] Definir cuándo un prompt puede recomendar sampling.
- [ ] Definir cuándo un prompt puede invocar tools.

### Fase 5 — Sampling layer

- [ ] Diseñar contrato para tareas de crítica/evaluación.
- [ ] Añadir sampling para:
  - review de contrato.
  - auditoría de resources.
  - crítica de prompts.
  - plan de migración.
  - detección de tool-first smell.
- [ ] No mezclar sampling con ejecución de efectos.

### Fase 6 — Tools/effects layer

- [ ] Rediseñar CRUD como capabilities explícitas.
- [ ] Separar `create/update/delete` de operaciones de dominio reales.
- [ ] Migrar `BuildTaskManager` como patrón de efecto async.
- [ ] Definir tools con:
  - input schema.
  - output schema.
  - idempotencia.
  - efectos declarados.
  - permisos.
  - rollback/compensación si aplica.
- [ ] Añadir regla: toda tool debe declarar por qué no es Resource/Prompt/Sampling.

### Fase 7 — HTTP/OpenAPI/edge projection

- [ ] Generar OpenAPI desde contracts, no al revés.
- [ ] Generar schemas OpenAPI desde la misma fuente.
- [ ] Mantener `edge-rest` como adapter, no como arquitectura.
- [ ] Distinguir endpoints read-only de mutation endpoints.
- [ ] No usar rutas REST como fuente para MCP.

### Fase 8 — MCP Apps/UI projection

- [x] Conservar la idea de UI genérica schema-driven.
- [x] Cambiar fuente de UI: `DomainContract` + `AppLauncherContract`, no `EntityMetadata` directo ([ADR 0004](../../ADR/0004-mcp-apps-ui-projection.md)).
- [x] Permitir que una UI consuma resources antes que tools (`packages/apps/src/catalog/aleph-os`).
- [x] Tools de UI solo para launchers (`show-aleph-os`); sin CRUD en ALEPH OS.
- [ ] Definir forms como prompts/protocols + mutation confirmation cuando corresponda.

### Fase 9 — Compatibilidad legacy

- [x] Crear `@network-engine/contract-adapters` como módulo neutral, no acoplado a Blockly ni a una carpeta `legacy-*`.
- [ ] Exponer adapter temporal para consumidores tipo `PaletteServer`.
- [ ] Permitir migración incremental:
  1. `EntityMetadata` legacy.
  2. `DomainContract` generado.
  3. resources MCP nuevos.
  4. tools legacy mantenidas.
  5. tools legacy deprecadas.
- [ ] Añadir warnings documentales, no necesariamente runtime al principio.

### Fase 10 — Migración de consumidores

Orden recomendado:

1. `generator`
   - buen candidato porque tiene lecturas semánticas (`list languages`) y generación.
2. `palette`
   - más complejo por build, marketplace y filesystem.
3. `toolbox`
   - migrar cuando resources/prompt patterns estén estables.
4. storage MongoDB
   - migrar cuando exista repository async-first.

## Tabla inicial de remapeo legacy

| Legacy | Clasificación nueva | Destino |
| --- | --- | --- |
| `entity_*_list` | lectura | Resource collection |
| `entity_*_create` | mutación | Tool capability opcional |
| `entity_*_update` | mutación | Tool capability opcional |
| `entity_*_delete` | mutación destructiva | Tool capability explícita con policy |
| `entity_*_duplicate` | mutación | Tool o Prompt+Tool si requiere diseño |
| `entity_*_export` | lectura/serialización | Resource si no escribe; Tool si genera archivo externo |
| `entity_*_import` | mutación | Tool |
| `get-*-manager` | UI/read | MCP App Resource + optional launcher tool |
| `*_form` | UI/edit | Resource + mutation tool tras confirmación |
| `*_build` | efecto async | Tool |
| `*_build_status` | lectura de tarea | Resource `task://build/{id}` preferible |
| `marketplace_list` | lectura | Resource |
| `marketplace_publish` | efecto externo | Tool |
| `generator_list_languages` | lectura | Resource |
| `generator_register_language` | mutación | Tool |
| `generator_create_block_stub` | generación cognitiva/plantilla | Prompt o Sampling; Tool solo si escribe |
| `generator_export_project` | generación de archivos | Tool si materializa; Resource si solo devuelve propuesta |

## ADRs recomendadas

- [ ] ADR: `DomainContract` como fuente primaria de verdad.
- [ ] ADR: MCP Resource-first projection.
- [ ] ADR: Tools solo para mutaciones/IO/efectos.
- [ ] ADR: edge-rest como adapter, no como núcleo.
- [ ] ADR: OpenAPI como proyección del contrato.
- [ ] ADR: Async-first repository interface.
- [ ] ADR: Compatibilidad temporal con `EntityMCPAppsServer`.
- [x] ADR: MCP Apps generadas desde `DomainContract` + launchers ([ADR 0004](../../ADR/0004-mcp-apps-ui-projection.md)).

## Criterios de aceptación del refactor

El refactor no estará “hecho” cuando compile.

Estará hecho cuando se cumplan estas condiciones:

- [ ] Una entidad puede exponerse como Resource sin registrar ninguna Tool.
- [ ] Una colección puede consultarse sin `*_list` tool.
- [ ] Un prompt puede declarar resources requeridos.
- [ ] Una mutación debe declarar su efecto.
- [ ] OpenAPI se genera desde contratos, no desde rutas manuales.
- [ ] `edge-rest` no aparece en el core.
- [ ] MCP SDK no aparece en el core.
- [ ] UI no depende directamente de `EntityManager`.
- [ ] Storage concreta no aparece en contratos.
- [ ] Consumidores legacy pueden migrar por fases.

## Anti-patrones prohibidos

- [ ] Crear una tool por cada endpoint REST.
- [ ] Llamar “Resource” a una operación que muta estado.
- [ ] Usar Prompt como envoltorio textual de una tool CRUD.
- [ ] Hacer que `core` dependa de `edge-rest`.
- [ ] Hacer que `core` dependa del MCP SDK.
- [ ] Generar OpenAPI desde implementación HTTP.
- [ ] Introducir `EntityMCPAppsServer` como clase base de la nueva máquina.
- [ ] Mantener `list` como tool principal de descubrimiento.

## Preguntas de diseño abiertas (Resolución en Modo Aleph AGI)

1. **¿`DomainContract` debe vivir en `@network-engine/core` o en un paquete `@network-engine/contracts` separado?**
   > **Resolución AGI:** Para mantener el núcleo (`core`) lo más libre de dependencias posible, lo ideal es que `DomainContract` viva en `@network-engine/core` pero en un submódulo o entrypoint desacoplado (p. ej., `@network-engine/core/contracts`). Esto evita fragmentar el monorepo en exceso con demasiados paquetes pequeños desde el inicio. Sin embargo, si en el futuro `/core` añade dependencias pesadas de ejecución (como XState, RxJS o bases de datos), se deberá extraer a un paquete puro `@network-engine/contracts`. Por ahora, se mantendrá dentro de `@network-engine/core` en un archivo independiente `contracts.ts` sin dependencias externas.

2. **¿La proyección MCP debe ser declarativa pura o registrar directamente sobre `McpServer`?**
   > **Resolución AGI:** Debe ser **declarativa pura**. Una proyección no debe acoplarse al runtime ni al SDK de MCP. El contrato del dominio debe generar una estructura intermedia (p. ej., un mapa o tipos nativos de TypeScript que representen los recursos, prompts y herramientas con esquemas puros). Luego, la integración en `@network-engine/mcp` consumirá esta estructura declarativa y la registrará en el `McpServer` real. Esto garantiza testabilidad unitaria completa sin mocks complejos de red o del SDK de MCP, y permite proyecciones alternativas en el futuro (OpenAPI, CLI, etc.).

3. **¿Cómo modelar `sampling` de forma portable si el SDK/host no lo soporta igual en todos los entornos?**
   > **Resolución AGI:** El contrato debe declarar la capacidad de muestreo de forma intencional (p. ej., `sampling: { critiqueDesign: { promptTemplate: string } }`). La ejecución real se delegará en un `SamplingProvider` abstracto inyectado. Si el host MCP soporta sampling, el adapter usará la API del host (`requestSampling`). Si no lo soporta (entorno local, test unitario, REST sin LLM), el provider puede hacer fallback a un LLM local configurado o fallar elegantemente con un código de error controlado.

4. **¿Conviene mantener compatibilidad nominal con `EntityMetadata<T>` o forzar migración explícita?**
  > **Resolución AGI:** Mantener compatibilidad semántica mediante un adaptador neutral en `@network-engine/contract-adapters`. No conviene publicar una carpeta con nombre legacy específico, porque convierte una necesidad transitoria en parte visible de la marca del repo. Se provee `fromEntityMetadata(metadata: EntityMetadataLike<T>): DomainContract<T>` para transformar metadatos externos en contratos Network-Engine sin arrastrar nombres legacy a la API pública.

5. **¿Los resources de colección deben soportar filtros como URI templates, query params o resources especializados?**
  > **Resolución AGI:** Para la especificación MCP, la forma más limpia es usar **URI templates** con parámetros nominales (p. ej., `blockly://palettes/{id}`) para navegación directa. Para búsquedas o listados dinámicos con múltiples filtros complejos, preferir Resource Templates especializados o Prompts de exploración. Solo usar Tools de búsqueda si existe IO externa, cálculo costoso, indexación mutable o un efecto operacional real.

6. **¿Cómo versionar contracts para migraciones de storage?**
   > **Resolución AGI:** Incorporar un metadato `version: SemVer` (o número entero secuencial) en el `DomainContract`. La capa `@network-engine/storage` proveerá un pipeline de lectura con interceptores de migración (Upcasters). Si se lee una versión antigua, se ejecuta el transformador hacia la versión actual antes de exponer los datos a la lógica de negocio.

7. **¿Qué parte del UI schema-driven pertenece al contrato y qué parte pertenece al adapter Apps?**
   > **Resolución AGI:** El contrato solo debe almacenar **Hints semánticas de presentación** (p. ej., `ui: { hiddenFields: string[], readOnlyFields: string[], labels: Record<string, string> }`). Los detalles de implementación UI (p. ej., si usa un componente Angular específico, TailwindCSS, layouts de rejilla, temas o animaciones) pertenecen por completo al adapter/proyección de `@network-engine/apps`.


## Implementación inicial consolidada

Tras revisar Git, el informe anterior estaba incompleto: no solo se había tocado este markdown. También existían cambios de código en `packages/core`, `packages/mcp` y un adapter transitorio con nombre legacy específico. La versión final elimina ese nombre público y lo consolida como `packages/contract-adapters`.

### Archivos de implementación

- `packages/core/src/contracts.ts`
  - introduce `DomainContract`, `ResourceContract`, `PromptContract`, `MutationCapability`, `SamplingCapability`, `UIHints` y `defineDomainContract()`.
  - mantiene el core libre de dependencias MCP/HTTP.
  - usa `SemVer`, URI strings tipadas y campos explícitos para efectos.

- `packages/mcp/src/projection.ts`
  - añade una proyección declarativa pura `projectDomainToMCP()`.
  - no registra directamente en `McpServer`.
  - proyecta resources, prompts, mutation capabilities y sampling descriptors.

- `packages/mcp/src/projection.test.ts`
  - valida que la proyección MCP funciona sin runtime MCP ni servidor real.

- `packages/contract-adapters/src/entity-metadata.ts`
  - añade `fromEntityMetadata()` como puente desde metadatos externos tipo `EntityMetadata` hacia `DomainContract`.
  - genera por defecto:
    - collection resource: `network://{plural}`
    - item resource template: `network://{plural}/{id}`
    - prompt semántico de diseño
    - mutation capability `persist_*`
    - sampling descriptor de crítica
    - UI hints heredados
  - permite preservar schemes externos, por ejemplo `blockly://...`, solo como opción explícita de migración.

- `packages/contract-adapters/src/entity-metadata.test.ts`
  - valida el puente legacy con una `Palette` de ejemplo.

### Ajustes de integración

- `packages/core/src/index.ts` exporta contratos.
- `packages/mcp/package.json` expone `@network-engine/mcp/projection` (proyección declarativa pura) y `@network-engine/mcp/server` (alias de `.` para entrypoints STDIO legacy), sin convertir la proyección en side effect del servidor.
- `packages/core/package.json` exporta contratos desde el entrypoint principal (`.`); el subpath `./contracts` queda como candidato futuro (ver §Preguntas abiertas, resolución Q1).
- `packages/mcp/tsconfig.json` queda referenciado y preparado para tests Bun.
- `packages/contract-adapters/tsconfig.json` queda preparado para tests Bun.
- `tsconfig.json` referencia `packages/mcp` y `packages/contract-adapters`.
- `tsconfig.base.json` incluye `DOM` para globals neutrales como `console`.
- `packages/core/src/env.ts` deja de depender de `process` global tipado y usa `globalThis`.

### Validación realizada

- `bun run typecheck`: pasa.
- `bun run test`: pasa.
- Resultado observado: 4 tests pasan, 0 fallos.

Nota: el script `test` limita Bun a `./packages/*/src/**/*.test.ts`, evitando duplicar tests emitidos en `dist` tras `tsc -b`.

## MCP Runtime + capa EDGE (estado actual)

> **Histórico:** el diseño inicial colocaba HTTP dentro de `mcp-runtime`. Tras la extracción `edge-*`, el borde vive en `edge-rest` + `edge-mcp`. Ver `LAYER_1/EDGE.instructions.md`.

## Siguiente paquete candidato: MCP Runtime (nota legacy)

El siguiente paquete legacy a estudiar sí es `ARCHIVO/MPC-MESH/CODEBASE/blockly-sdk/packages/blockly-mcp`, pero no como importación directa ni como base class heredada.

### Qué representa en el legacy

`@agentic/blockly-mcp` no es una entidad de dominio. Es una capa de infraestructura que contiene:

- servidor MCP base;
- integración HTTP (legacy);
- transporte `StreamableHTTPServerTransport`;
- endpoint `/mcp`;
- endpoints REST auxiliares;
- soporte de sesiones MCP;
- logger compatible con stdio;
- helpers de registro de tools/resources/prompts;
- base para MCP Apps;
- cliente/pool MCP.

Por tanto, su valor no está en “traer Blockly”, sino en extraer patrones de **adapter runtime**.

### Qué sí debe venir

- Un runtime MCP neutral en `@network-engine/mcp-runtime`.
- Borde HTTP en `@network-engine/edge-rest` + `@network-engine/edge-mcp` (no en `mcp-runtime`).
- Un registrador runtime que consuma `projectDomainToMCP()`.
- Un endpoint MCP Streamable HTTP.
- CORS y health checks como infraestructura HTTP.
- Compatibilidad con sesiones, pero detrás de una política explícita.
- Logging que respete stdio: nunca contaminar stdout cuando haya transporte JSON-RPC.
- Tests del adapter sin acoplar `core` al MCP SDK.

### Qué no debe venir

- Clase base HTTP monolítica como núcleo.
- REST automático para todo por defecto.
- Lecturas MCP degradadas a endpoints REST como fuente primaria.
- Acceso a internals del SDK como `_registeredTools` como contrato estable.
- Dependencia de `edge-rest` o MCP SDK dentro de `@network-engine/core`.
- Naming `blockly` en paquetes públicos de Network-Engine.

### Ciclo completo propuesto

El flujo correcto no es:

```text
HTTP -> Controller -> Service -> Repository
```

ni:

```text
MCP Tool -> EntityManager -> CRUD
```

El flujo objetivo es:

```text
edge-rest + edge-mcp
  ↓
mcp-runtime (protocolo)
  ↓
createMcpServerFromRuntime
  ↓
DomainContract Projection
  ↓
Resources / Prompts / MutationCapabilities
  ↓
RxJS event streams
  ↓
XState actor system
  ↓
Network-Engine domain/effects
```

Interpretación por capa:

```text
edge-*   = borde HTTP
MCP      = protocolo de contexto
RxJS     = señales/eventos observables
XState   = semántica operacional/actores
Core     = contratos y dominio
Storage  = persistencia/effects detrás de capabilities
```

### Regla de integración RxJS/XState

- El borde HTTP no decide workflows.
- MCP no decide workflows.
- RxJS transporta eventos y observaciones.
- XState decide qué puede ocurrir después.
- Las tools MCP producen eventos o invocan capabilities, no contienen la máquina.
- Los resources leen read models/streams materializados, no ejecutan mutaciones.

Ejemplo mental:

```text
MCP tool persist_palette
  ↓
MutationCapabilityRequested
  ↓
RxJS command$
  ↓
XState actor
  ↓
guard/action/effect
  ↓
PalettePersisted event
  ↓
Resource read model actualizado
```

### Implementación cerrada (post-extracción edge-*)

**`@network-engine/mcp-runtime`**

- [x] `runtime/` modular + `createMCPRuntime()`.
- [x] `createMcpServerFromRuntime()` en `server.ts`.
- [x] Export único `"."` (sin `./fastify` ni `./http-edge`).
- [x] Eventos RxJS + bridge actor-like.
- [x] MCP SDK fuera de `core`.

**Familia `@network-engine/edge-*`**

- [x] `edge-rest` — `createRestServer()`.
- [x] `edge-mcp` — `mountMcpRoute`, `server/discover`, `subscriptions/listen` (ADR 0001).
- [x] `edge-graphql`, `edge-graphdb`, `edge-pubsub`.

**Referencia:** `packages/apps/src/catalog/aleph-os/app.ts`.

## Documentación de cierre

- `LAYER_1/MCP_RUNTIME.instructions.md` — runtime transport-neutral.
- `LAYER_1/EDGE.instructions.md` — familia edge-*.
- `LAYER_3/MCP_RUNTIME.functional.md` / `EDGE.functional.md`.
- `ADR/0001-mcp-runtime-subscriptions-shim.md` — shim en `edge-mcp`.

## Próximo incremento recomendado

1. Validación Streamable HTTP moderna en `edge-mcp`.
2. Política de seguridad del borde HTTP (Origin, localhost-only, auth).
3. Conexión XState → `notifyResourceUpdated` / `notifyResourcesListChanged`.
4. Retirada del shim cuando el SDK alcance `subscriptions/listen` draft.
5. ADRs pendientes de contratos Resource-first.
