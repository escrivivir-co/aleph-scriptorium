# SBLVX-SC-03 — Refinement scope Scriptorium

> **Producido por:** Sony (Claude Sonnet 4.6)
> **Fecha:** 2026-04-24
> **Task:** SBLVX-SC-03 — Refinar scope Scriptorium
> **Dossier fuente:** `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`
> **Prerrequisito aplicado:** Enmiendas E1, E2, E3 de SBLVX-SC-02

---

## Resumen ejecutivo

El scope Scriptorium para este sprint es la **Capa 1: infraestructura RAG genérica** materializada
como `MCPVectorMachineServer` en el track VMI-01..18. Todo lo relativo a la capa 2 (skill
lore-specific `MCPLoreDBServer`) queda explícitamente fuera del sprint y se nombra como
dependencia futura.

Este documento delimita: qué entra, qué no entra, qué ya existe reutilizable, dónde vive el
código nuevo, y qué decisiones bloquean VMI-04 (esqueleto) si no se resuelven antes.

---

## 1. Frontera: DENTRO del scope Scriptorium (sprint activo)

### 1.1 Nuevo fichero a crear: `MCPVectorMachineServer.ts`

**Ruta:** `MCPGallery/mcp-mesh-sdk/src/MCPVectorMachineServer.ts`
**Patrón:** igual que `MCPPrologServer.ts`, `MCPTypedPromptServer.ts` — clase que extiende
`BaseMCPServer` con su propio `BaseMCPServerConfig`.

```
MCPGallery/mcp-mesh-sdk/src/
  ├── BaseMCPServer.ts              ← heredar de aquí (no modificar)
  ├── MCPVectorMachineServer.ts     ← NUEVO (VMI-04)
  └── configs/
        └── DEFAULT_VECTOR_MACHINE_MCP_SERVER_CONFIG.ts   ← NUEVO (VMI-04)
```

**Config mínima:**
```typescript
export const DEFAULT_VECTOR_MACHINE_MCP_SERVER_CONFIG: BaseMCPServerConfig = {
    id: "vector-machine-mcp-server",
    name: "Vector Machine MCP Server",
    script: "src/MCPVectorMachineServer.ts",
    port: 3010,                    // G-4 — reservado; alternativa 3070
    version: "1.0.0",
    description: "RAG genérico multi-tenant sobre VectorMachineSDK",
    autoRestart: true,
    healthCheckInterval: 30000,
    capabilitiesCheck: { tools: true },
    url: "http://localhost",
};
```

### 1.2 Tools MCP v1 (contrato G-2, G-8)

| Tool | Descripción | Síncrono/Async |
|------|-------------|----------------|
| `register_project(owner, project, path)` | Registra un proyecto indexable por namespace `{owner}/{project}`. Retorna `{id, status}`. Falla con `PROJECT_ALREADY_EXISTS` si ya existe. | Síncrono |
| `list_projects()` | Lista todos los proyectos registrados con metadata. | Síncrono |
| `unregister_project(owner, project)` | Elimina registro y colección. | Síncrono |
| `index_project(owner, project)` | Dispara reindexado completo (G-7: solo full-reindex). Retorna `{job_id, status: "queued"}`. | **Asíncrono** |
| `get_index_status(job_id)` | Polling del estado de indexación. Retorna `{status, progress?, error?}`. | Síncrono |
| `query_project(owner, project, query, top_k?)` | Búsqueda semántica + RAG con traza. Retorna resultados con fuentes. | Síncrono |
| `health_stack()` | Estado del stack subyacente (Chroma/DeepWiki up/down). | Síncrono |

**Códigos de error estándar (G-8):**
```
STACK_DOWN | PROJECT_NOT_FOUND | PROJECT_ALREADY_EXISTS |
INDEX_IN_PROGRESS | EMBED_FAILED | LLM_TIMEOUT | UPSTREAM_ERROR
```
Forma: `{ "code": "<UPPER_SNAKE>", "message": "<human>", "hint": "<opcional>" }`

### 1.3 Backend: fachada HTTP hacia `VectorMachineSDK`

El servidor MCP Node.js **no reimplementa la lógica vectorial**. Actúa como fachada que:
- Para **indexación**: invoca `etl/etl.py` o los scripts del SDK vía HTTP o proceso hijo.
- Para **consulta**: llama por HTTP a `qa/app.py` (FastAPI en puerto local), que ya implementa
  ChromaDB + Ollama. El endpoint clave: `POST /query` con `{question, repo_filter, max_results}`.
- Para **lifecycle** (health, logs): llama a los health-scripts del SDK (`health_chroma.sh`, etc.)
  o a los endpoints `/health` de los servicios dockerizados.

**Restricción (E2):** no instanciar LanceDB directamente en Node.js. El backend vectorial lo
decide VMI-01 (spike DeepWiki vs Chroma). La fachada HTTP abstrae esa elección.

### 1.4 Integraciones DRY (post-esqueleto, VMI-16/17/18)

| Task | Qué hace | Fichero afectado |
|------|----------|-----------------|
| VMI-16 | Registrar `:3010` en `.vscode/mcp.json` cuando el servidor sea arrancable | `.vscode/mcp.json` |
| VMI-17 | Añadir `vector-machine-mcp-server` al catálogo de `MCPLauncherServer` | `MCPLauncherServer.ts` (`CONFIGS_BASE_MCP_SERVER`) + `DEFAULT_VECTOR_MACHINE_MCP_SERVER_CONFIG.ts` |
| VMI-18 | Actualizar DRY: `plugin_ox_vectormachine.agent.md`, `manifest.md`, `instructions.md` del plugin | `.github/plugins/vector-machine/` |

Estas tasks son propias de Aleph (VMI-16) y de agentes disponibles (VMI-17, VMI-18). No las ejecuta Sony.

---

## 2. Frontera: FUERA del scope Scriptorium (este sprint)

| Componente | Por qué fuera | Horizonte |
|------------|--------------|-----------|
| `MCPLoreDBServer` (tools `pieza_*`, `lore_f_*`, `lore_sync_now`) | Capa 2: skill domain-specific. Pre-requiere MCPVectorMachineServer estable. | Post-v1, sprint futuro |
| Tag-buckets como mecanismo de aislamiento | Mecanismo intra-proyecto de Capa 2 | Post-v1 |
| LanceDB como backend primario en Node.js | Gate G-1 no cerrado; backend lo elige el spike VMI-01 | Depende de VMI-01 |
| `DocumentMachineSDK` internals | Otro equipo; frontera clara en §3 | Handoff SC-04 |
| Chunking (G1 original del PLAN-VECTOR) | Post-v1 explícito | Post-v1 |
| Histórico LORE_F multi-rev | Post-v1 explícito (G9 del plan) | Post-v1 |
| Streaming, webhooks de indexación | Post-v1 (G-8) | Post-v1 |
| Diagnóstico avanzado (2.5 del catálogo G-2) | Post-v1 (G-2 tablea esto como ❌) | Post-v1 |

---

## 3. Frontera con DocumentMachineSDK

### Lo que Scriptorium necesita de DocumentMachineSDK

| Input | Quién lo provee | Formato |
|-------|-----------------|---------|
| Ruta accesible del corpus `docmachine/mod-legislativa` | DocumentMachineSDK | Path local (string) pasado al `register_project` |
| Stack vectorial operativo (Chroma + Ollama) | `VectorMachineSDK` (submódulo) | Docker Compose o servicios corriendo |

### Lo que Scriptorium NO necesita de DocumentMachineSDK (este sprint)

- Skill `lore-db-bootstrap` (es orientación para usuario, no contrato de integración).
- Ningún cambio en `DocumentMachineSDK` internos: el servidor MCP lee el path, no espera una API.
- No hay handshake de types compartidos entre ambos repos para Demo 1.

### Invariante de integración

`lore-db/` y `lore-db-vector/` son hermanas en disco (`mod-legislativa/lore-db/` y
`mod-legislativa/lore-db-vector/`). El servidor registra el path al directorio padre y el ETL
localiza ambas carpetas por convención. No se requiere configuración extra de DocumentMachineSDK.

---

## 4. Camino crítico VMI hasta Demo 1

```
VMI-01 — Spike DeepWiki vs Chroma (Gepe, ~1-2h de lectura + descripción)
  └─ sin bloqueante de backend definido: Gepe puede arrancar
VMI-02 — Smoke test VectorMachineSDK (Gepe, puede correr en paralelo con VMI-01)
VMI-03 — Cierre formal G-1 en RESPUESTAS.md (Gepe o Aleph, tras VMI-01)
  └─ GATE: hasta aquí no se sabe si el ETL Node.js llama a Chroma directo o a DeepWiki API
VMI-04 — Esqueleto MCPVectorMachineServer (Gepe, requiere VMI-02 + VMI-03)
  └─ Fichero: MCPVectorMachineServer.ts + config, sin tools reales, solo health + boilerplate
VMI-05 — register_project (requiere VMI-04 + VMI-03)
VMI-06 — index_project con job-id async (requiere VMI-05)
VMI-07 — query_project con RAG + traza (requiere VMI-05)
VMI-08 — errores estándar G-8 (requiere VMI-04)
VMI-09 — Spike fuente mod-legislativa: leer ruta + formato + tamaño (Gemy, independiente)
VMI-10 — Registrar e indexar docmachine/mod-legislativa (requiere VMI-06 + VMI-09)
VMI-11 — Demo 1: 5 consultas RAG con trazas (requiere VMI-07 + VMI-10)
```

---

## 5. Decisiones que bloquean VMI-04 si no se resuelven

| Decisión | Bloquea | Quién decide | Estado |
|----------|---------|-------------|--------|
| Resultado de VMI-01 (DeepWiki o Chroma) | Diseño de la fachada HTTP en VMI-04 | Gepe + Aleph | Pendiente (spike) |
| ¿MCPLoreDBServer es post-v1? (E1 de SC-02) | Scope final de VMI: no ampliar tools a Capa 2 | PO | **Requiere ratificación** |
| Path de `mod-legislativa` en la máquina de demo | VMI-10 (register_project con path real) | PO / usuario | Pendiente (VMI-09 lo resuelve) |

**Nota:** VMI-04 puede arrancar con incertidumbre controlada sobre el backend (diseñar la
fachada como interfaz abstracta con implementación Chroma-HTTP como primera impl provisional).
La única gate dura antes de VMI-04 es que VMI-02 (smoke test del stack) haya pasado.

---

## 6. Estructura de ficheros nueva en Scriptorium (resumen)

```
MCPGallery/mcp-mesh-sdk/src/
  MCPVectorMachineServer.ts                          ← NUEVO (VMI-04)
  configs/
    DEFAULT_VECTOR_MACHINE_MCP_SERVER_CONFIG.ts      ← NUEVO (VMI-04)

.vscode/
  mcp.json                                           ← ACTUALIZAR (VMI-16, Aleph)

.github/plugins/vector-machine/
  manifest.md                                        ← ACTUALIZAR (VMI-18)
  instructions.md                                    ← ACTUALIZAR (VMI-18)
  agents/plugin_ox_vectormachine.agent.md            ← ACTUALIZAR (VMI-18)
```

Sin cambios en `VectorMachineSDK/` (es submódulo, lectura only desde Scriptorium).
Sin cambios en `DocumentMachineSDK/` (otro equipo, frontera por path).
