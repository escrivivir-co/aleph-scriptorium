# Respuestas del usuario — vector-machine

> **Fecha de inicio:** 23-abr-2026
> **Última actualización:** 24-abr-2026 (Aleph promovió cierre de gates G-1..G-8)
> **Registradas por:** GPT-5.4 (puntos 1-3) + Aleph (gates V1)

## Punto 1 — El dossier debe ser técnico antes que scrum

- **Respuesta del usuario:** el dossier para `vector-machine` no debe centrarse en planificar un backlog pesado; debe dejar la pieza bien sujeta para quien luego haga el `PLAN.md`.
- **Efecto operativo:** el dossier se diseña como capa de referencias, anclas y frontera conceptual, con backlog inicial ligero y no como plan implementativo extenso.

## Punto 2 — Maximizar DRY hacia submódulo y plugin

- **Respuesta del usuario:** cuanto más descripción y referencias DRY haya hacia el submódulo y el plugin, más fácil será la sesión de scrum posterior y menos fricción habrá con Scriptorium, Índice y Ox.
- **Efecto operativo:** el dossier usa `ref/INDEX.md` como índice central y remite a `VectorMachineSDK/README-SCRIPTORIUM.md`, `.github/plugins/vector-machine/` y los índices DRY del repo como fuentes principales.

## Punto 3 — Ox debe gobernar esta capa

- **Respuesta del usuario:** antes de abrir el dossier había que mejorar el espejo DRY de sala/dossier y reforzar a Ox como experto en esta superficie.
- **Efecto operativo:** primero se reparó el espejo `sala/plantilla-dossier/` y se actualizó `ox.agent.md`; después este dossier se abrió ya sobre el scaffold canónico, no sobre inferencias desde otros dossiers.

---

## Gates V1 — cerrados (2026-04-24)

> **Origen:** `sala/agente-opa/candidato-respuestas-gates.md` (Opa, Claude Opus 4.7, en rol proxy del PO; PO real: usuario humano).
> **Promovido por:** Aleph.
> **Naturaleza:** decisiones del PO sobre los 8 gates planteados en `ref/contrato-mcp-v1.md §3`. No reabren la frontera, la rellenan. Habilitan el bloque `VMI-*` del `BACKLOG.md`.

### G-1 · Forma del "proyecto indexable"

- **Decisión:** namespace jerárquico `{owner}/{project}` (ejemplos: `docmachine/mod-legislativa`, `onfalo/proyecto-x`, `lore/voz-x`).
- **Persistencia:** **DeepWiki primero**. La opción Chroma-as-metadata es alternativa, no default. La v1 explora primero la vía DeepWiki ya presente en `VectorMachineSDK/deepwiki.sh`, `deepwiki.bat`, `wiki/`. Si DeepWiki no cubre registro multi-tenant → fallback a Chroma-as-metadata o store propio.
- **Resolución implementativa:** abrir spike (`VMI-01`) que cierre operativamente la elección.

### G-2 · Subconjunto del catálogo §2 que entra en v1

| Dominio | En v1 | Notas |
|---------|:-----:|-------|
| 2.1 Lifecycle del stack | ✅ | up / down / health / logs |
| 2.2 Gestión de proyectos indexables | ✅ | register / list / metadata / unregister |
| 2.3 Indexación | ✅ | solo full-reindex (G-7), sin cancelación |
| 2.4 Consulta semántica / RAG | ✅ | search puro + RAG con traza |
| 2.5 Inspección y diagnóstico | ❌ | post-v1 |

### G-3 · Lenguaje del servidor MCP y frontera con `qa/`

- **Decisión:** **Node.js**, heredando `BaseMCPServer` del patrón `mcp-mesh-sdk`. La capa Python del submódulo (`qa/`, `etl/`, scripts) **no se absorbe**: queda como backend HTTP. La fachada llama por HTTP a `qa/` y por DeepWiki/scripts para lifecycle.
- **Notas críticas del PO — dos tasks de integración explícitas en `BACKLOG.md`:**
  1. **Integración en Scriptorium**: registrar `vector-machine-mcp-server` en `.vscode/mcp.json`; discovery vía `setup-workspace.sh`; actualizar `manifest.md`, `instructions.md`, bridge `plugin_ox_vectormachine.agent.md`.
  2. **Integración en `MCPLauncherServer` (`mcp-mesh-sdk`)**: catálogo + `launch_mcp_server`/`stop_mcp_server`/`restart_mcp_server`/`get_server_status`. Inclusión en `launch_all_servers` solo cuando el stack Docker esté operativo.
- **Materializado en:** `VMI-16`, `VMI-17`, `VMI-18`.

### G-4 · Puerto y registro `.vscode/mcp.json`

- **Confirmación:** el puerto **3007 NO está libre** (lo ocupa `aaia-mcp-server`).
- **Decisión:** **puerto 3010** para `vector-machine-mcp-server`. Reserva alternativa: **3070**.
- **Momento de registro:** solo cuando el servidor sea arrancable. Materializado en `VMI-16`, propiedad de Aleph.

**Mapa actual del rango 3000-3099 (snapshot 2026-04-24):**

| Puerto | Servidor |
|--------|----------|
| 3002 | wiki-browser-server |
| 3003 | devops-mcp-server |
| 3004 | state-machine-server |
| 3006 | prolog-mcp-server |
| 3007 | aaia-mcp-server |
| 3008 | firehose-mcp-server |
| **3010** | **vector-machine-mcp-server (reservado)** |
| 3020 | typed-prompt-mcp-server |
| 3050 | launcher-server |
| 3066 | AlephAlpha |
| 3100 | copilot-logs-mcp-server |

### G-5 · Auth, multi-tenant, aislamiento

- **Decisión:** **single-user local sin auth** en v1. Sin tokens ni headers de autorización.
- **Aislamiento:** una colección Chroma por proyecto, nombrada `{owner}_{project}` (sustitución `/`→`_`). Si DeepWiki (G-1) expone su propio mecanismo, se prefiere ese y la nomenclatura se ajusta al spike.

### G-6 · Primer consumidor de validación

- **Decisión — pista doble en orden:**
  1. **`docmachine/mod-legislativa`** (`DocumentMachineSDK/mod-legislativa/lore-db`) como **primer consumidor real**, valida flujo end-to-end.
  2. **5 proyectos de `onfalo-asesor-sdk`** como **segundo consumidor**, valida multi-tenant y aislamiento.
- **Materializado en:** Épocas 3 y 4 del `BACKLOG.md` (`VMI-09..VMI-15`).

### G-7 · Reindexación

- **Decisión:** **solo full-reindex** en v1 (drop colección + reingestar). Incremental queda post-v1.

### G-8 · Errores y operaciones largas

- **Forma estándar de errores:** `{ "code": "<UPPER_SNAKE>", "message": "<human>", "hint": "<opcional>" }`
- **Códigos mínimos v1:** `STACK_DOWN`, `PROJECT_NOT_FOUND`, `PROJECT_ALREADY_EXISTS`, `INDEX_IN_PROGRESS`, `EMBED_FAILED`, `LLM_TIMEOUT`, `UPSTREAM_ERROR`.
- **Operaciones largas (indexación):** **asíncronas con `job-id`** + polling. Tools conceptuales: `start_index(owner,project) → {job_id, status}` y `get_index_status(job_id) → {status, progress?, error?}`. Sin streaming, sin webhooks en v1.

---

### Resumen de cierre de gates

| Gate | Estado | Materialización en backlog |
|------|:------:|----------------------------|
| G-1 | ✅ | VMI-01 (spike) + VMI-03 (cierre formal) |
| G-2 | ✅ | VMI-04..VMI-08 (alcance v1) |
| G-3 | ✅ | VMI-04 (esqueleto Node.js) + VMI-16/17/18 (integraciones) |
| G-4 | ✅ | VMI-16 (registro `.vscode/mcp.json` :3010) |
| G-5 | ✅ | VMI-13..VMI-15 (test de aislamiento multi-tenant) |
| G-6 | ✅ | VMI-09..VMI-11 (demo 1) + VMI-12..VMI-15 (demo 2) |
| G-7 | ✅ | VMI-06 (start_index + get_index_status) |
| G-8 | ✅ | VMI-06 (job-id) + VMI-08 (errores estándar) |