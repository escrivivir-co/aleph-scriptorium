# PLAN — Soporte de embeddings para lore-db (DocumentMachineSDK)

> **Fecha:** 22-abr-2026
> **Autor:** GPT-5.4 (GitHub Copilot)
> **Estado:** plan integrado tras decisiones del PO
> **Históricos:**
> - [ANALISIS.md](./ANALISIS.md) — encuadre y gaps iniciales
> - [PUNTO-INVESTIGACION-SIN-DOCKER.md](./PUNTO-INVESTIGACION-SIN-DOCKER.md) — alternativas embebidas

---

## 1. Decisiones del PO (G1–G12)

| Gap | Decisión |
|---|---|
| **G1** Granularidad embedding | 1 pieza = 1 vector por defecto. Chunking opcional v2 si una pieza supera N tokens. |
| **G2** CRUD de Pieza y `LORE_F` | Hay **CRUD para Piezas** y **CRUD para `LORE_F`s**, pero `LORE_F` se trata como **fichero completo trabajado fuera del servidor**. El server recibe `path` o `content`, registra el agregado, extrae IDs referenciados y guarda tags. `validate` comprueba que los IDs de piezas referenciadas existen en la DB y reporta gaps/cobertura. |
| **G3** Trigger de sync | Solo **MCP tool manual** en v1 (`lore_sync_now`). Nada de hooks git automáticos. |
| **G4** Identidad canónica | **Libre**. Adaptar la propuesta a la plantilla real de `DocumentMachineSDK` `mod/legislativa:DRAFTS2/LORE_INDEX.md`. La plantilla se publica como base flexible, no como contrato cerrado. |
| **G5** Versionado modelo | Cada vector lleva `model_version`. Reindex completo si cambia. Sin migración fina v1. |
| **G6** Aislamiento | **Tags como primer nivel de colección** (tag-buckets). El usuario crea buckets agregando tags. Sustituye al esquema "colección por mod" como mecanismo principal de partición. |
| **G7** Búsqueda híbrida | Sí desde v1 si el backend la soporta sin coste; si no, queda v2. |
| **G8** Contrato por agente | Tools MCP genéricos; cada agente usa el subset que necesita (ver §4.3). |
| **G9** Histórico LORE_F | Solo HEAD en v1. Las `LORE_F-rev-NN.md` viven en disco como hoy, no se vectorizan por defecto (se pueden añadir como `LORE_F` etiquetadas si el usuario quiere). |
| **G10** Topología y arranque | **Server en Scriptorium, datos y skill en DocumentMachineSDK**. El skill de `DocumentMachineSDK/main` explica cómo levantar la variante local o Docker. `lore-db/` y `lore-db-vector/` van siempre juntas: hermanas en local, mismo volumen padre en Docker. |
| **G11** Resources MCP | Resources devuelven referencia + resumen + IDs. Contenido completo bajo demanda (`get_pieza_full`). |
| **G12** Cardinalidad | Bajos miles por mod, decenas de mods → LanceDB embebido cubre sobrado; Qdrant Docker como variante opcional cuando se requiera servicio. |

---

## 2. Arquitectura resultante (dos modos espejo)

```
┌─────────────────────── SCRIPTORIUM (raíz) ──────────────────────┐
│                                                                 │
│   MCPGallery/mcp-mesh-sdk/src/MCPLoreDBServer.ts               │
│        │                                                        │
│        │ adapter (LanceDB local | Qdrant docker)                │
│        ▼                                                        │
│   ┌───────────────────────── DocumentMachineSDK ────────────┐   │
│   │  (submódulo, contiene los datos)                        │   │
│   │                                                         │   │
│   │   <mod-root>/                                           │   │
│   │     ├── lore-db/          ← piezas .md + LORE_F.md      │   │
│   │     │     ├── LORE_INDEX.md                             │   │
│   │     │     ├── LORE_A.md ... LORE_E.md                   │   │
│   │     │     ├── LORE_F.md                                 │   │
│   │     │     └── piezas/ (P-01.md, S-13.md, ...)           │   │
│   │     └── lore-db-vector/   ← índice vectorial local      │   │
│   │           ├── lance/  (modo embebido)                   │   │
│   │           └── state.json (model_version, sha-tracking)  │   │
│   │                                                         │   │
│   │   .github/skills/lore-db-bootstrap/SKILL.md             │   │
│   │     (solo explica cómo levantar local o docker)         │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Invariante**: `lore-db/` y `lore-db-vector/` siempre **hermanas en disco**. Mismo nivel, mismo padre. En Docker se monta el padre como volumen único.

---

## 3. Modelo de datos (tag-buckets)

### Pieza

```yaml
id: P-04                       # libre, recomendado X-NN
tipo: P | S | N | T | R        # libre, no obligatorio
mod: legislativa               # opcional, viene del path
path: lore-db/piezas/P-04.md
sha: <git blob sha>
tags: [personaje, juzgado, defensor]   # ← bucket affinity
lore_f_refs: [LORE_F-01, LORE_F-02]    # cálculo automático
model_version: bge-m3@v1
updated_at: 2026-04-22
```

### LORE_F (índice agregado)

```yaml
id: LORE_F-02
title: "Hilo narrativo - mitad 2"
path: lore-db/LORE_F-02.md
referenced_ids: [P-01, P-02, S-09, T-14, ...]   # extraídos del fichero
tags: [veredicto, hilo-largo, corte-temporal-T14]
sha: <git blob sha>
model_version: bge-m3@v1
updated_at: 2026-04-22
```

### Tag-buckets

- Un **bucket** = un tag (o intersección de tags). No es entidad aparte: emerge de la consulta.
- Operaciones: `list_buckets`, `bucket_stats(tag)`, `search(tags=[...])`.
- El usuario crea buckets simplemente etiquetando piezas o `LORE_F`. Tag nuevo = bucket nuevo.
- Búsqueda primaria: vector + filtro `tags ⊇ ?`.
- Tags reservados sugeridos: `mod:<nombre>`, `tipo:<X>`, `rev:<NN>`. No obligatorios.

---

## 4. Tools MCP (contrato mínimo v1)

### 4.1 Sincronización
- `lore_sync_now(mod?)` → escanea `lore-db/`, detecta cambios por sha, reindexa.
- `lore_sync_status()` → cobertura, última sync, modelo activo.

### 4.2 CRUD Pieza
- `pieza_list(filter?)` · `pieza_get(id)` · `pieza_get_full(id)`
- `pieza_create(id, content, tags?)` · `pieza_update(id, ...)` · `pieza_delete(id, soft=true)`
- `pieza_search(query, tags?, tipo?, top_k?)`

### 4.3 CRUD LORE_F
- `lore_f_list(tags?)` · `lore_f_get(id)`
- `lore_f_create(id, path|content, tags?)` · `lore_f_update(id, path|content?, tags?)` · `lore_f_delete(id)`
- `lore_f_validate(id)` → extrae IDs del fichero completo y comprueba que existen en la DB; reporta cobertura y gaps tipo `[N-05]`/`[R-10]`.
- `lore_f_search(query, tags?)` → busca dentro del agregado o entre `LORE_F`s.
- `lore_f_expand(id)` → devuelve piezas referenciadas por el fichero + similares.

### 4.4 Tag-buckets
- `bucket_list()` · `bucket_stats(tag)` · `search(query, tags=[...])`

### 4.5 Resources
- `lore://pieza/{id}` (referencia + resumen) · `lore://pieza/{id}/full`
- `lore://lore_f/{id}` (índice + tags) · `lore://lore_f/{id}/full`
- `lore://buckets` (listado de tags + cardinalidad)

### 4.6 Mapa agente → tools (orientativo)
- **Loreador**: `lore_sync_now`, `pieza_create/update`, `lore_f_validate`.
- **Archivero**: `pieza_search`, `pieza_get_full`.
- **Grafista**: `pieza_get` (resolver IDs), `lore_f_expand`.
- **Demiurgo**: `lore_f_search`, `lore_f_expand`.
- **Cristalizador**: `pieza_search` + `bucket_stats` (descubrimiento).

---

## 5. Modo local (sin Docker) vs modo Docker

| Aspecto | Local (default v1) | Docker (variante) |
|---|---|---|
| Vector backend | **LanceDB embebido** en `lore-db-vector/lance/` | Qdrant en contenedor, volumen `lore-db-vector/qdrant/` |
| Embeddings | Ollama local (`bge-m3`) o `sentence-transformers` Python | Ollama service o API |
| Servicio | Ninguno residente; el MCP server abre la DB on-demand | `docker compose up` con healthcheck |
| Ubicación datos | `<mod>/lore-db/` y `<mod>/lore-db-vector/` lado a lado | El compose monta `<mod>/` como volumen; las dos carpetas viajan juntas |
| Distribución | Skill Python user-level + scripts plantilla (patrón `media-extraction`) | `docker-compose.lore-db.yml` en el skill |

**Regla dura**: si alguien mueve `lore-db/` a otra ruta, `lore-db-vector/` va con ella. El contrato de paths siempre los mantiene hermanos.

---

## 6. Distribución revisada de dosieres

Tras integrar las decisiones, los **4 dossieres iniciales se reorganizan en 5 tracks** con asignación clara a repo (Scriptorium vs Submódulo):

| Track | Dossier | Repo | Foco | Dependencias |
|---|---|---|---|---|
| **PV-A1** | `lore-vector-lite-skill` | DocumentMachineSDK | Skill `lore-db-bootstrap` (Python user-level, LanceDB embebido, plantilla `LORE_INDEX.md` adaptada de `mod/legislativa:DRAFTS2/`, layout `lore-db/` + `lore-db-vector/` hermanas) | — |
| **PV-A2** | `lore-vector-docker-variant` | DocumentMachineSDK | Variante Docker en el mismo skill: `docker-compose.lore-db.yml` montando carpeta padre, healthcheck HTTP. Documentación de cuándo usar uno u otro. | PV-A1 |
| **PV-B** | `mcp-lore-db-server` | Scriptorium (`MCPGallery/mcp-mesh-sdk/src/`) | `MCPLoreDBServer.ts` con adapter (LanceDB embebido / Qdrant). Tools CRUD Pieza + CRUD `LORE_F` por fichero completo + tag-buckets + sync manual. Resources `lore://`. | PV-A1 (formato datos) |
| **PV-C** | `tag-buckets-y-validacion` | Scriptorium + DocumentMachineSDK | Modelo de tags, `lore_f_validate` sobre ficheros completos (IDs referenciados vs DB), bucket_stats, search híbrida. Define convención `mod:<x>`, `tipo:<X>`, `rev:<NN>`. | PV-B |
| **PV-D** | `agentes-consumidores-vector` | DocumentMachineSDK (`mod/agents/`) | Actualizar `loreador`, `archivero`, `grafista`, `demiurgo`, `cristalizador` con tools que consumen. Ejemplos en mod/legislativa. | PV-B, PV-C |

### Cambios clave vs distribución original

- **Antes** PV-A era único track de infra; **ahora** se desdobla en PV-A1 (local sin Docker, default) y PV-A2 (Docker, opcional). El skill vive en el submódulo `DocumentMachineSDK`, no en Scriptorium.
- **Antes** PV-C era sync git-aware; **ahora** se reorienta a tag-buckets + validación, ya que el sync queda reducido a `lore_sync_now` manual (G3).
- El MCP server (PV-B) sigue en Scriptorium, pero su contrato cambia: CRUD de Pieza y CRUD de `LORE_F` por fichero completo, no edición pieza a pieza.

### Diagrama de dependencias

```
PV-A1  ──┬──►  PV-B  ──►  PV-C  ──►  PV-D
PV-A2  ──┘
```

PV-A1 desbloquea PV-B porque fija el layout en disco. PV-A2 puede ir en paralelo con PV-B una vez exista PV-A1. PV-C requiere el server. PV-D requiere server + tags.

---

## 7. Plantilla `LORE_INDEX.md` flexible (G4)

Base derivada del mock real (`mod_legislativa — LORE_INDEX`, 51 piezas, 6 bloques A–F):

```markdown
# LORE_INDEX — <mod>

> 6 bloques (A-F) — N piezas totales — M fichas soporte

| tipo | nombre              | count | IDs                       | fichas |
|------|---------------------|-------|---------------------------|--------|
|  P   | Personajes          |   9   | P-01..P-09                | P-01, P-04, P-09 |
|  S   | Piezas sociales     |  13   | S-01..S-13                | S-01..S-05, S-09..S-13 |
|  N   | Noticias / Casos    |   5   | N-01..N-05                | N-02..N-05 |
|  T   | Fases temporales    |  14   | T-01..T-14                | T-09, T-10, T-12, T-13 |
|  R   | Recursos contextuales | 10  | R-01..R-10                | R-09, R-10 |
|  F   | Hilos narrativos    |   K   | LORE_F-01..LORE_F-K       | (agregados) |

## Bloques fuente
- LORE_A.md (P) — LORE_B.md (S) — LORE_C.md (N) — LORE_D.md (T) — LORE_E.md (R)

## Hilos LORE_F
- LORE_F-01.md — tags: [...]
- LORE_F-02.md — tags: [...]
```

La plantilla es **base flexible**: cada mod añade/quita tipos. El skill PV-A1 incluye un generador `lore_init_mod` que parte de esta plantilla.

---

## 8. Criterios de cierre

- [ ] PV-A1: skill instalable, levanta vector index local, `lore-db/` y `lore-db-vector/` hermanas verificadas.
- [ ] PV-A2: `docker-compose up` levanta variante Docker con mismo layout de datos.
- [ ] PV-B: `MCPLoreDBServer` arranca desde Launcher, todas las tools CRUD operativas, resources servidos.
- [ ] PV-C: tags persistidos, `lore_f_validate` reporta gaps tipo `[N-05]`/`[R-10]`, bucket_stats usable.
- [ ] PV-D: al menos 3 agentes (Loreador, Archivero, Demiurgo) usan tools en una sesión real sobre `mod/legislativa`.

---

## 9. Pendiente de validación PO antes de generar dossieres

1. **¿LanceDB embebido como default v1, Qdrant como variante Docker?** (recomendación basada en investigación previa)
2. **¿Embeddings: Ollama local con `bge-m3`?** (multilingüe ES/EN, sin coste)
3. **¿Skill se llama `lore-db-bootstrap` o prefieres otro nombre?**
4. **¿Confirmas el reparto de 5 dossieres (A1/A2/B/C/D)?**

Si validas estos cuatro puntos, paso a generar el scaffold canónico de los 5 dossieres en `sala/PLAN-VECTOR/dossiers/` con `PLAN.md`, `BACKLOG.md`, `RESPUESTAS.md`, `activacion.prompt.md` y `tasks/` por cada uno, más `sala/PLAN-VECTOR/BACKLOG.md` raíz indexando los tracks.
