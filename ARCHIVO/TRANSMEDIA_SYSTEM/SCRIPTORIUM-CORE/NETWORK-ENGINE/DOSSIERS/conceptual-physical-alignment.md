# Plan de Asesoramiento ASI — Alineación Conceptual ↔ Física

> [!NOTE]
> **Modo cognitivo:** `ASI MODE` ([ASI.instructions.md](../INSTRUCTIONS/MODES/ASI.instructions.md))
> **Artefacto sobre el que se trabaja:** [`README.md`](../README.md) — *Programa de Investigación ASI: Arquitectura Conceptual vs. Física*
> **Naturaleza del documento:** Línea de investigación activa (dossier). Memoria de trabajo a largo plazo, no respuesta efímera.
> **Estado:** `ACTIVE` — Fase 9 (GraphQL + MongoDB + sync loop) ejecutada. Fase 8 cerrada.

Este documento es el **plan de asesoramiento** que convierte las incertidumbres detectadas en el `README.md` en un **Programa de Investigación** ejecutable. No busca cerrar la conversación con una respuesta, sino instalar una agenda evolutiva alineada con la [Meta-Constitución de Network-Engine](../INSTRUCTIONS/ALEPH.instructions.md) y con la [Filosofía Agile](../INSTRUCTIONS/LAYER_0/AGILE.instructions.md).

---

# 0. Tesis del Asesor

El `README.md` plantea una falsa dicotomía implícita: *"conceptual vs. físico"*. La Meta-Constitución la resuelve antes de empezar:

> *La codebase es el laboratorio. El lenguaje es el producto. Las aplicaciones son demostraciones del lenguaje.*

Por tanto, el objetivo del asesoramiento **no** es forzar un isomorfismo 1:1 entre `INSTRUCTIONS/*` y `packages/*`. Es decidir, para cada fricción, en qué **nivel de éxito** vive (Implementación / Arquitectura / Lenguaje / Metamodelo) y documentarla en la capa correcta sin inflar el número de paquetes.

---

# 1. Fase 1 — Comprensión del Problema

El `README.md` contrasta dos jerarquías:

* **OS Cognitivo** (`INSTRUCTIONS/LAYER_0..4`): constituciones, análisis técnico y funcional.
* **Codebase real** (`packages/*`): `core`, `node`, `apps`, `browser`, `pubsub`, `graph`, `mcp`, `mcp-runtime`, `aleph-lang`, `contract-adapters`.

El problema central es de **coherencia arquitectónica a largo plazo**: la documentación y el código divergen, y esa divergencia no está clasificada (¿es deuda, es diseño intencional, o es un concepto sistémico?).

---

# 2. Fase 2 — Incertidumbres (Inventario de Fricciones)

Heredadas y formalizadas desde el `README.md`:

| ID | Fricción | Tipo | Nivel afectado |
|----|----------|------|----------------|
| **U1** | `packages/contract-adapters` sin representación en `LAYER_1` / `LAYER_3` | Gap documental | Arquitectura |
| **U2** | `NETWORK_ENGINE` documentado pero sin `packages/network-engine` | Concepto sin paquete | Metamodelo |
| **U3** | `aleph-lang` (paquete) vs `LANGUAGES` / `SEMANTINC` (dossiers) | Desalineación de nombres | Lenguaje |
| **U4** | `packages/graph` y `packages/mcp` actúan como drivers de `LAYER_0` | Materialización LAYER_0 | Arquitectura |

---

# 3. Recomendaciones del Asesor (núcleo del asesoramiento)

Cada recomendación responde a una incertidumbre con una postura y su justificación. Son propuestas a validar, no decisiones cerradas.

## 3.1 Sobre `contract-adapters` (U1) — ✅ APROBADO

**Recomendación:** Documentarlo en `LAYER_1` como componente propio, **no** subsumirlo en `CORE`.

* *Justificación:* La Meta-Constitución exige preguntar *"¿pertenece al núcleo o debería existir como plugin?"*. Un `contract-adapter` es por definición una **frontera** (anti-corruption layer) entre el lenguaje y runtimes/protocolos externos. Pertenece a la familia de los *adapters* (como `node`/`browser`), no al `core` agnóstico.
* *Acción:* crear `LAYER_1/CONTRACT_ADAPTERS.instructions.md` y su par `LAYER_3/CONTRACT_ADAPTERS.functional.md`.

## 3.2 Sobre `NETWORK_ENGINE` (U2) — ⚠️ DECISIÓN DE USUARIO: paquete físico

**Decisión del usuario:** Crear `packages/network-engine` como **orquestador físico** en el monorepo.

> [!WARNING]
> **Tensión constitucional detectada (ASI puede cuestionar el metamodelo).** La Meta-Constitución afirma: *"Network-Engine NO es una aplicación, framework, librería ni monorepo... Network-Engine es un lenguaje"*. Un paquete `network-engine` mal entendido degradaría el lenguaje (Capa 1) a un módulo de implementación.

**Reconciliación adoptada (síntesis del asesor):** el paquete físico **no es el lenguaje**, sino su **composition root / orquestador de runtime**: cablea y compone `core + node + pubsub + mcp-runtime` como punto de entrada ejecutable.

* El **lenguaje** Network-Engine permanece como concepto de Capa 1 (documentado en `LAYER_1`/`LAYER_3`).
* El **paquete** `packages/network-engine` es el huésped que ensambla el motor emergente, sin contener lógica de dominio propia (delega siempre en `core`).
* *Regla de guarda:* todo lo que el paquete necesite "implementar" debe evaluarse primero como *¿pertenece a `core` o a un adapter?*. El orquestador solo **conecta**.
* *Acción:* fijar esta frontera en un **ADR** (`ADR/0003-network-engine-orchestrator-package.md`) que documente la decisión, la tensión constitucional y la regla de guarda, para que no se reabra cada sprint.

## 3.3 Sobre `aleph-lang` vs `LANGUAGES`/`SEMANTINC` (U3)

**Recomendación:** Tratar `aleph-lang` como la **implementación huésped** del concepto `LANGUAGES`; `SEMANTINC` describe el *contenido* (ontologías), no el lenguaje.

* *Justificación:* Capa 0 = TypeScript (metalenguaje), Capa 1 = Network-Engine (lenguaje), y `aleph-lang` es el primer huésped tangible de Capa 1. `LANGUAGES` es el dossier conceptual; `SEMANTINC` (OWL/RDF) es contenido hospedado, no el lenguaje en sí.
* *Acción:* añadir una nota de trazabilidad en `LAYER_3/LANGUAGES.functional.md` que enlace explícitamente a `packages/aleph-lang` y aclare la separación lenguaje ↔ contenido.

## 3.4 Sobre `graph` y `mcp` como drivers de LAYER_0 (U4)

**Recomendación:** Reconocerlos formalmente como **materializaciones de nivel cero** (drivers/adapters), no como lógica de negocio.

* *Justificación:* Ya implementan `LAYER_0/GRAPHDB` y `LAYER_0/MCP`. Coinciden con la naturaleza de Capa 0.
* *Acción:* registrar el mapeo `LAYER_0 → packages/{graph,mcp}` en `LAYER_1/ECOSYSTEM.md` como tabla de trazabilidad.

---

# 4. Fase 3 — Dossiers y Artefactos a Crear / Actualizar

Salida concreta que materializa las recomendaciones (`Markdown-First`):

* **Crear** `LAYER_1/CONTRACT_ADAPTERS.instructions.md` + `LAYER_3/CONTRACT_ADAPTERS.functional.md` *(U1)*.
* **Crear** `ADR/0003-network-engine-orchestrator-package.md` *(U2)*.
* **Andamiar** `packages/network-engine` como composition root (orquestador), con su `package.json` y dependencias a `core`/`node`/`pubsub`/`mcp-runtime` *(U2)*.
* **Actualizar** `LAYER_3/LANGUAGES.functional.md` con trazabilidad a `aleph-lang` *(U3)*.
* **Actualizar** `LAYER_1/ECOSYSTEM.md` con la **Matriz de Trazabilidad** Concepto ↔ Paquete ↔ Capa *(U4 + global)*.
* **Mantener** este dossier como índice vivo del programa.

---

# 5. Fase 4 — Planificación de Líneas de Trabajo

Mapeado a la [Filosofía Agile](../INSTRUCTIONS/LAYER_0/AGILE.instructions.md). Los Spikes son ciudadanos de primera clase: aprender es un resultado válido.

## Epic A — Coherencia OS Cognitivo ↔ Codebase

| Tipo | Item | Resuelve | DoD |
|------|------|----------|-----|
| Feature | Matriz de Trazabilidad en `ECOSYSTEM.md` | U1–U4 | Toda entrada de `packages/*` tiene capa y estado |
| Story | Documentar `contract-adapters` (L1+L3) | U1 | Ambos ficheros creados y enlazados desde `ALEPH.instructions.md` |
| Story | ADR `network-engine-orchestrator-package` | U2 | ADR aceptado, enlazado desde `README.md` |
| Story | Andamiar `packages/network-engine` (composition root) | U2 | `bun install` ok; arranca y compone core+node+pubsub+mcp-runtime sin lógica de dominio |
| Spike | ¿`aleph-lang` debe absorber `SEMANTINC` o separarse? | U3 | Hipótesis confirmada/refutada por escrito |

## Epic B — Verificación contra realidad física

| Tipo | Item | DoD |
|------|------|-----|
| Spike | Auditar exports reales de cada `package.json` vs. documentación | Lista de desviaciones |
| Feature | Script de validación de trazabilidad doc↔código | `bun run` detecta paquetes huérfanos |

> [!IMPORTANT]
> Herramientas del repo: usar **siempre Bun** (`bun install`, `bun run`, `bun x`). No `npm`/`npx`.

---

# 6. Fase 5 — Ejecución Iterativa

**Estado:** ✅ Carril 1 y Carril 2 completados (2026-06-06).

### Carril 1 (Trazabilidad) — ✅

- [x] Matriz de Trazabilidad en `INSTRUCTIONS/LAYER_1/ECOSYSTEM.md`
- [x] `INSTRUCTIONS/LAYER_1/CONTRACT_ADAPTERS.instructions.md`
- [x] `INSTRUCTIONS/LAYER_3/CONTRACT_ADAPTERS.functional.md`
- [x] Nota U3 en `INSTRUCTIONS/LAYER_3/LANGUAGES.functional.md` §6
- [x] Enlaces en `ALEPH.instructions.md`, `LAYER_1/README.md`, `LAYER_3/README.md`

### Carril 2 (`NETWORK_ENGINE`) — ✅

- [x] `ADR/0003-network-engine-orchestrator-package.md`
- [x] `packages/network-engine` con `createNetworkEngine()`
- [x] Tests Bun en `packages/network-engine/src/composition.test.ts`
- [x] Sección composition root en `NETWORK_ENGINE.instructions.md`
- [x] Diagrama `README.md` actualizado

### Convergencia — Epic B ✅ (2026-06-06)

- [x] Epic B: auditoría de exports `package.json` vs documentación
- [x] Epic B: script `bun run validate:traceability` (`scripts/validate-traceability.ts`)
- [x] Migrar apps a `createNetworkEngine()` donde aplique (`hello`, `graph`; `hub`/`aleph` sin patrón node+bridge en apps)
- [x] Migrar `packages/aleph-lang` (`AlephUniverse`) a `createNetworkEngine()`; pubsub sigue en `aleph` app vía `universe.orchestrator`

**Hallazgos de auditoría (exports):**

| Paquete | Hallazgo | Estado |
|---------|----------|--------|
| `graph` | Matriz enlazaba `GRAPH_STORE.instructions.md` inexistente | Corregido → `LAYER_0/GRAPHDB.instructions.md` |
| `mcp` | `./server` alias de `.` no documentado | Documentado en ECOSYSTEM §Implementación |
| `core` | `@network-engine/core/contracts` aspiracional (Q1) | Contratos en entrypoint `.`; subpath pendiente |
| Resto (9) | Exports alineados con referencias INSTRUCTIONS | OK |

**Script:** detecta paquetes huérfanos/fantasma, enlaces LAYER_1/LAYER_3 rotos y desviaciones export↔doc. Exit 0 = matriz completa y coherente.

---

# 7. Fase 6 y 7 — Evaluación y Refinamiento

**Criterio de éxito** (Meta-Constitución): una tarea triunfa cuando mejora al menos un nivel — Implementación, Arquitectura, **Lenguaje** o **Metamodelo**. Este programa apunta deliberadamente a Arquitectura y Metamodelo.

**Definición de Hecho** asociada en [`LAYER_0/DOD.instructions.md`](../INSTRUCTIONS/LAYER_0/DOD.instructions.md): trazabilidad del conocimiento + persistencia en disco.

**Refinamiento:** al cerrar cada Epic, este dossier se actualiza (estado `DRAFT → ACTIVE → STABLE`) y las incertidumbres resueltas migran de §2 a un changelog interno.

---

# 8. User Review — ✅ Resuelto

1. **U1 — `contract-adapters`:** ✅ Componente propio en `LAYER_1`/`LAYER_3`.
2. **U2 — `NETWORK_ENGINE`:** ⚠️ Paquete físico (orquestador). Reconciliado como *composition root* (ver §3.2). Tensión constitucional documentada.
3. **Arranque:** ✅ Matriz de Trazabilidad **y** ADR de `NETWORK_ENGINE` en paralelo.

---

# 9. Decisiones Registradas (changelog)

| Fecha | Incertidumbre | Decisión | Estado |
|-------|---------------|----------|--------|
| 2026-06-06 | U1 | `contract-adapters` → componente propio (L1+L3) | Aprobado |
| 2026-06-06 | U2 | `packages/network-engine` como orquestador / composition root (no como lenguaje) | Aprobado con reserva constitucional |
| 2026-06-06 | Plan | Ejecución Fase 5 en dos carriles paralelos | Aprobado |
| 2026-06-06 | U1 | Docs L1+L3 + matriz ECOSYSTEM | Ejecutado |
| 2026-06-06 | U2 | ADR 0003 + `packages/network-engine` | Ejecutado |
| 2026-06-06 | U3 | Spike: `aleph-lang` huésped, `SEMANTINC` contenido | Confirmado |
| 2026-06-06 | U4 | Drivers LAYER_0 en matriz ECOSYSTEM | Ejecutado |
| 2026-06-06 | Fase 8 cerrada | Materialización ALEPH OS MCP en `apps/catalog/aleph-os` + `createMcpHttpEdge` | Ejecutado |
| 2026-06-06 | Fase 8 | `aleph-os-mcp-app` Resource-first + `AppLauncherContract` + ADR 0004 | Ejecutado |
| 2026-06-06 | Fase 9 | `DocumentStoreProtocol` + `@network-engine/mongo` + `@network-engine/graphql` + sync loop + Docker + ADR 0005–0008 | Ejecutado |

---

# 10. Fase 8 — MCP Apps UI projection

**Objetivo:** proyectar MCP Apps interactivas desde `DomainContract`, sin CRUD tools ni wiring manual del SDK.

**Entregables:**

- [x] `AppLauncherContract` en `@network-engine/core`
- [x] Proyección launcher/UI en `@network-engine/mcp` y binding `_meta.ui.resourceUri` en `@network-engine/mcp-runtime`
- [x] `packages/apps/src/catalog/aleph-os`: contrato `aleph-os.contract.ts`, servidor sobre `mcp-runtime/http-edge`, UI singlefile bajo Bun
- [x] ADR [`0004-mcp-apps-ui-projection.md`](../ADR/0004-mcp-apps-ui-projection.md)
- [x] Matriz ECOSYSTEM + docs LAYER_1/LAYER_3 APPS
- [x] Script raíz `bun run serve:aleph-os`

**Criterio de aceptación:** ALEPH OS expone resources + launcher UI sin ninguna tool CRUD; `bun run validate:traceability` en verde.

---

# 11. Fase 9 — GraphQL + MongoDB + sincronización XState/RxJS

**Objetivo:** cerrar el eje Storage/repositories y el loop reactivo Resource-first (MCP ↔ orchestrator ↔ DocumentStore ↔ change streams).

**Entregables:**

- [x] ADR 0005–0008 (DocumentStore, GraphQL projection, sync loop, Docker topology)
- [x] `DocumentStoreProtocol` + `DomainContract.storage` en `@network-engine/core`
- [x] `@network-engine/mongo` (`MongoDocumentStore`, `MongoStorePlugin`, `InMemoryDocumentStore`)
- [x] `@network-engine/graphql` (`projectDomainToGraphQL`, `createGraphQLRuntime`, Docker gateway)
- [x] Sync loop en `@network-engine/network-engine` (`sync-loop.ts`, composition wiring)
- [x] `docker-compose.yml` (mongo replica-set, graphdb, graphql)
- [x] Trazabilidad LAYER_0/1/3 + matriz ECOSYSTEM

**Criterio de aceptación:** `core` sin `mongodb`/`graphql`; un contrato proyecta a MCP y GraphQL; change streams cierran loop hasta `notifyResourceUpdated`; `bun run validate:traceability` en verde.
