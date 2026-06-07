---
name: Delta packages — 2 últimos commits → informe de cambio de visión
scope: packages/ (NETWORK-ENGINE monorepo)
mode_origen: AGI
mode_destino: ASI
estado: handoff — informe NO redactado; ASI debe planificar y ejecutar
commits:
  - sha: ba42a9246a0cc50f83c70f8a89b6ccb3fda8e503
    mensaje: "Basurilla olvidada. Mirar para borrar."
  - sha: 6185ce192df01a645391cd5a04e6cfa970f3139b
    mensaje: "--"
fecha_delta: 2026-06-07
---

# Handoff AGI → ASI: cambio de visión en `packages/` (últimos 2 commits)

> **Instrucción del usuario:** el informe final NO lo escribe el agente AGI. Este documento es el **delta de evidencia + plan de integración documental** para que un agente **ALEPH ASI** diseñe el Programa de Investigación / informe y lo persista en disco.

---

## 0. Objetivo del informe (pendiente — ASI)

Responder, con scope estricto en `packages/`:

1. ¿Qué **visión arquitectónica** cambió entre `ba42a92` y `6185ce1`?
2. ¿Qué **principios** del OS cognitivo (`INSTRUCTIONS/`) quedan desalineados?
3. ¿Qué **artefactos** debe producir el ASI (dossier, ADR candidata, actualizaciones LAYER_*, índice)?

**No incluir** fuera de scope: repos hermanos, LANGUAGES/ fuera de packages, infra Docker salvo si apps/gateway lo exige.

---

## 1. Evidencia cuantitativa

| Commit | Archivos en `packages/` | + líneas | − líneas | Naturaleza |
|--------|-------------------------|----------|----------|------------|
| `ba42a92` | 13 | 30 | 310 | Limpieza / desalineación corregida |
| `6185ce1` | 68 | 1736 | 2216 | Refactor estructural profundo |
| **Acumulado** | 77 | 1756 | 2516 | — |

---

## 2. Delta por commit (hechos, no interpretación larga)

### 2.1 `ba42a92` — expulsión de huéspedes mal ubicados

| Acción | Rutas | Implicación de visión |
|--------|-------|------------------------|
| **Eliminado** | `packages/aleph-lang/**` | El lenguaje derivado (Capa 2) **no** debe materializarse como paquete en el monorepo de plataforma. Huésped canónico: `LANGUAGES/aleph-lang/`. |
| **Eliminado** | `packages/apps/src/catalog/aleph/**` | App de catálogo duplicada / basura; catálogo queda en `aleph-os`, `aleph-os-dynamic`, `hub`, `graph`. |
| **Añadido** | tests en `catalog.test.ts` | Refuerzo de contrato del catálogo tras poda. |

**Hipótesis AGI (ASI debe validar):** commit de **corrección de frontera Capa 1 vs Capa 2**, no de feature.

### 2.2 `6185ce1` — extracción de capa Edge + runtime MCP puro

#### A. Nuevos paquetes `edge-*` (transporte / borde HTTP)

| Paquete nuevo | Rol observado en código | Dependencias clave |
|---------------|-------------------------|-------------------|
| `@network-engine/edge-rest` | Abstracción Fastify mínima (`createRestServer`, `RestRouter`) | `fastify` |
| `@network-engine/edge-mcp` | `mountMcpRoute()` — Streamable HTTP, discover, subscriptions/SSE | `edge-rest`, `mcp-runtime`, MCP SDK |
| `@network-engine/edge-graphql` | Servidor GraphQL en borde (antes embebido en apps/node) | — |
| `@network-engine/edge-graphdb` | Adaptador GraphDB en borde (antes `node/graph-db.ts`) | — |
| `@network-engine/edge-pubsub` | Hub Socket.IO en borde (`hub.ts` migrado desde `pubsub`) | — |

#### B. Renombres / reubicaciones

| Antes | Después |
|-------|---------|
| `packages/graph` | `packages/graphdb` |
| `pubsub/src/hub.ts` | `edge-pubsub/src/index.ts` |
| `node/docker-entry.ts` | `apps/gateway/src/index.ts` |
| `node/graph-db.ts` | `edge-graphdb/src/index.ts` |
| `apps/.../graphql/server.ts` (implícito) | `edge-graphql/src/index.ts` |

#### C. `mcp-runtime` — de monolito HTTP a runtime + server factory

**Eliminado (~1.3k líneas):**

- `fastify.ts`, `fastify.test.ts`
- `http-edge.ts`, `http-edge.test.ts`
- `port-utils.ts`
- `runtime.ts` monolítico

**Añadido / reestructurado:**

```text
packages/mcp-runtime/src/
├── runtime/          # createMCPRuntime modular (tools, prompts, resources, types, utils)
├── server.ts         # createMcpServerFromRuntime — binding SDK McpServer
├── actor-bridge.ts   # refactor
├── events.ts         # refactor
└── index.ts          # export único "." (sin ./fastify ni ./http-edge)
```

`package.json` exports: solo `"."` — **submódulos `./fastify` y `./http-edge` retirados**.

#### D. `mcp` — proyección refactorizada

- `projection.ts`, `tools/`, `resources/`, `prompts/` — cambios sustanciales (~500 líneas netas movidas).
- `tsconfig.json` y `package.json` actualizados (probable desacople de referencias ciclo `aleph-lang`).

#### E. `apps` — consumen Edge, no mcp-runtime HTTP

Ejemplo post-cambio (`aleph-os/app.ts`):

```typescript
import { mountMcpRoute } from '@network-engine/edge-mcp';
import { createRestServer } from '@network-engine/edge-rest';
// createMCPRuntime queda dentro de edge-mcp vía mountMcpRoute
```

Patrón: **App → edge-rest + edge-mcp → mcp-runtime (puro)**.

#### F. Otros

- `node/src/index.ts`: eliminación de exports de borde (graph-db, docker-entry).
- `pubsub`: pierde hub; conserva bridge cliente.
- `graphql`: pequeño ajuste de exports.
- `network-engine/composition.ts`: cambio menor (1 línea).

---

## 3. Síntesis del cambio de visión (tesis AGI — ASI debe expandir)

```text
ANTES (documentado en LAYER_1):
  mcp-runtime = runtime MCP + adapter Fastify embebido (./fastify, ./http-edge)
  graph = adaptador in-memory
  pubsub = hub + bridge
  packages/aleph-lang = huésped Capa 2 (incorrecto)

DESPUÉS (código en HEAD):
  mcp-runtime = runtime MCP neutral + createMcpServerFromRuntime
  edge-*      = familia de adaptadores de transporte (REST, MCP HTTP, GraphQL, GraphDB, PubSub hub)
  graphdb     = nombre alineado con LAYER_0 GRAPHDB
  pubsub      = solo bridge cliente; hub → edge-pubsub
  aleph-lang  = fuera de packages/ (solo LANGUAGES/)
  apps/gateway = entrypoint operativo extraído de node
```

**Principio emergente:** separación **Protocol Runtime** (`mcp-runtime`, `core`, `mcp`) vs **Edge Adapters** (`edge-*`), coherente con la regla "dependencias fluyen hacia abajo" de `NETWORK_ENGINE.instructions.md`.

**Relación con SCRATCHPAD existente:** `modularizacion-runtime.md` describía el split `runtime/` — **implementado** en `6185ce1`. El informe ASI debe cerrar ese arco y abrir el de la capa Edge.

---

## 4. Desalineación documental detectada (input para `ALEPH.builder.prompt.md`)

### 4.1 Archivos LAYER_1 obsoletos respecto al código

| Documento | Desalineación concreta |
|-----------|------------------------|
| `LAYER_1/MCP_RUNTIME.instructions.md` | Lista `fastify.ts`, `fastify.test.ts`; describe submódulo `./fastify` — **eliminados**. No menciona `server.ts` ni `runtime/`. |
| `LAYER_1/APPS.instructions.md` | Referencia `createMcpHttpEdge()` desde `@network-engine/mcp-runtime/http-edge` — **export eliminado**. |
| `LAYER_1/ECOSYSTEM.md` matriz | Lista `graph`, `aleph-lang`; no lista `edge-rest`, `edge-mcp`, `edge-graphql`, `edge-graphdb`, `edge-pubsub`, `apps/gateway`. Estado "✅ Alineado" es **falso** post-`6185ce1`. |
| `LAYER_1/LANGUAGES.instructions.md` | Nota anti-ciclo con `packages/aleph-lang` — paquete **ya no existe** en packages. |
| `LAYER_3/LANGUAGES.functional.md` | Sigue citando `@network-engine/aleph-lang` en packages. |

### 4.2 `ALEPH.instructions.md` — delta propuesto (solo índice, regla DRY)

**No añadir párrafos largos.** Tras que ASI cree/actualice dossiers en LAYER_1:

| Sección | Cambio propuesto | Condición |
|---------|------------------|-----------|
| LAYER_1 | Añadir enlace 1 línea: `[EDGE](LAYER_1/EDGE.instructions.md)` | Cuando exista el dossier técnico de la familia `edge-*` |
| LAYER_1 | Actualizar descripción de `MCP_RUNTIME` en README si hace falta | Tras rewrite de `MCP_RUNTIME.instructions.md` |
| LAYER_1 | Marcar `graph` → `graphdb` en ECOSYSTEM (no en índice principal) | En `ECOSYSTEM.md`, no en `ALEPH.instructions.md` |
| STORAGE/ADR | Enlace a ADR candidata "Edge adapter layer" si ASI la propone | Opcional Fase ASI |

**Sin cambio esperado** en el cuerpo de `ALEPH.builder.prompt.md` — el protocolo Fase 1–3 sigue válido; este handoff **es** el delta de Fase 1 para el Builder.

### 4.3 `ALEPH.builder.prompt.md` — acciones concretas post-aprobación usuario

1. Actualizar `LAYER_1/MCP_RUNTIME.instructions.md` (runtime modular + `server.ts`; sin Fastify).
2. Crear `LAYER_1/EDGE.instructions.md` (familia `edge-*`, dependencias, límites de capa).
3. Actualizar matriz en `LAYER_1/ECOSYSTEM.md`.
4. Actualizar `LAYER_1/APPS.instructions.md` (patrón `edge-rest` + `edge-mcp`).
5. Revisar `LAYER_3/MCP_RUNTIME.functional.md` y `APPS.functional.md` si existen referencias HTTP-edge.
6. Proponer al usuario líneas exactas para `ALEPH.instructions.md` (Fase 3 Builder).
7. Considerar ADR nueva vs extensión ADR 0003/0004.

---

## 5. Programa ASI sugerido (esqueleto — ASI debe completar)

### Fase 1 — Comprensión
- [ ] Leer diffs completos: `git show ba42a92 -- packages/` y `git show 6185ce1 -- packages/`
- [ ] Mapear grafo de dependencias `edge-*` (package.json de cada paquete)
- [ ] Contrastar con `NETWORK_ENGINE.instructions.md` §capas

### Fase 2 — Incertidumbres
- ¿`edge-*` es LAYER_1 nuevo concepto **EDGE** o sub-rol de **NODE/APPS**?
- ¿`graphdb` reemplaza concepto `GRAPH_STORE` o solo rename?
- ¿`apps/gateway` entra en matriz ECOSYSTEM como sub-paquete o app host?
- ¿ADR nueva o actualización de ADR 0004 (MCP Apps)?

### Fase 3 — Entregables
- [ ] Informe: `DOSSIERS/edge-layer-vision-delta.md` (o ruta que ASI elija)
- [ ] Actualización técnica LAYER_1 (ítems §4.3)
- [ ] Propuesta índice `ALEPH.instructions.md` (1 líneas)
- [ ] Opcional: ADR `0012-edge-adapter-layer.md`

### Fase 4 — Evaluación
- [ ] `bun test` en packages tocados
- [ ] Checklist DoD (`LAYER_0/DOD.instructions.md`)

---

## 6. Comandos útiles para ASI

```bash
cd C:\Users\aleph\OASIS\aleph-scriptorium

git show ba42a92 --stat -- ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages
git show 6185ce1 --stat -- ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages
git diff ba42a92^..6185ce1 -- ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages

# Listar paquetes actuales
ls ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages
```

---

## 7. Referencias cruzadas

- Builder protocol: `INSTRUCTIONS/ALEPH.builder.prompt.md`
- Índice OS: `INSTRUCTIONS/ALEPH.instructions.md`
- Modularización (prefigurada): `SCRATCHPAD/modularizacion-runtime.md`
- Programa ASI ejemplo formato: `SCRATCHPAD/SESION_06_JUNIO/Federation_ASI_Program.md`

---

*Generado en AGI MODE. Informe narrativo pendiente de ASI MODE.*
