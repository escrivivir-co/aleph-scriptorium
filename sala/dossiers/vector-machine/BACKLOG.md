# Backlog — vector-machine

> **Última actualización:** 24-abr-2026 — Aleph promovió backlog ejecutable v1 desde Opa (VM-02 cerrada)

## Contexto compartido

- Referencia técnica principal: `sala/dossiers/vector-machine/ref/INDEX.md`
- **Contrato MCP v1 ratificado:** `sala/dossiers/vector-machine/ref/contrato-mcp-v1.md`
- **Gates G-1..G-8 cerrados:** `sala/dossiers/vector-machine/RESPUESTAS.md §Gates V1 — cerrados`
- Ancla de integración del submódulo: `VectorMachineSDK/README-SCRIPTORIUM.md`
- Contrato actual del plugin: `.github/plugins/vector-machine/manifest.md`
- Reglas de integración: `.github/plugins/vector-machine/instructions/vector-machine.instructions.md`
- Bridge agéntico: `.github/agents/plugin_ox_vectormachine.agent.md`
- Superficie MCP futura: `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`
- Índices DRY: `ARCHIVO/DEVOPS/Funcional.md` y `ARCHIVO/DEVOPS/Tecnico.md`

## Regla DRY del backlog

El backlog es índice y tracking. El detalle de las tasks de **diseño** (`VM-*`) vive en `tasks/`. El detalle ejecutivo de las tasks de **implementación** (`VMI-*`) vive en este BACKLOG y en `sala/agente-opa/candidato-backlog-vector-machine-v1.md` (referencia narrativa). La topología, las rutas y las decisiones cerradas viven en `ref/INDEX.md`, `ref/contrato-mcp-v1.md`, `RESPUESTAS.md` y `.github/plugins/vector-machine/`.

## Camino directo a la demo

> **Spike DeepWiki → Esqueleto MCP en :3010 → Demo `docmachine/mod-legislativa` → Demo 5 proyectos `onfalo/*` → Wiring DRY y cierre.**

Cinco épocas, 18 tasks `VMI-*`. Camino crítico de 6 tasks: VMI-02 → VMI-04 → VMI-05 → VMI-06 → VMI-10 → VMI-11.

## Tracking — diseño (cerrado)

| Task | Estado | Agente | Dependencias | Entrega | Brief |
|------|--------|--------|--------------|---------|-------|
| VM-00 | cerrada | GPT-5.4 | — | dossier técnico inicial + referencias congeladas | [TASK-00](./tasks/TASK-00_CONTEXTO_Y_PERSISTENCIA.md) |
| VM-01 | cerrada | Opa (Claude Opus 4.7) | VM-00 | frontera ratificada (`ref/contrato-mcp-v1.md`) + 8 gates cerrados (`RESPUESTAS.md`) | [TASK-01](./tasks/TASK-01_FRONTERA_CONTRATO_MCP_V1.md) |
| VM-02 | cerrada | Opa (Claude Opus 4.7) | VM-01 | backlog ejecutable v1 (bloque `VMI-*` abajo) + handoff de integración | [TASK-02](./tasks/TASK-02_BACKLOG_EJECUTABLE_Y_HANDOFF.md) |

## Tracking — implementación (`VMI-*`, libres)

### Época 1 — Fundación operativa

| Task | Estado | Owner | Tamaño | Deps | Entrega |
|------|--------|-------|--------|------|---------|
| VMI-01 | en-curso:opa | Opa | M | — | Spike DeepWiki vs Chroma para registro multi-tenant; veredicto en `spike-deepwiki-vs-chroma.md` |
| VMI-02 | libre | dev-stack | S | — | Smoke test del stack `VectorMachineSDK` (`health_*.sh` en verde) |
| VMI-03 | libre | aleph | S | VMI-01 | Cierre formal G-1 en `RESPUESTAS.md` con vía elegida y nomenclatura final |

### Época 2 — Esqueleto MCP en :3010

| Task | Estado | Owner | Tamaño | Deps | Entrega |
|------|--------|-------|--------|------|---------|
| VMI-04 | libre | dev-mcp | M | VMI-02 | Esqueleto Node.js `MCPVectorMachineServer.ts` heredando `BaseMCPServer`, arrancable en :3010 |
| VMI-05 | libre | dev-mcp | M | VMI-04, VMI-03 | Tool `register_project(owner, project, source_path)` |
| VMI-06 | libre | dev-mcp | M | VMI-05 | Tool `index_project` con `start_index` / `get_index_status` (job-id asíncrono) |
| VMI-07 | libre | dev-mcp | M | VMI-05 | Tool `query_project(owner, project, q, mode)` con `mode ∈ {search, rag}` y traza |
| VMI-08 | libre | dev-mcp | S | VMI-04 | Errores estándar `{code,message,hint}` con los 7 códigos de G-8 |

### Época 3 — Demo 1: `docmachine/mod-legislativa`

| Task | Estado | Owner | Tamaño | Deps | Entrega |
|------|--------|-------|--------|------|---------|
| VMI-09 | libre | opa | S | — | `spike-mod-legislativa-source.md` (ruta exacta, formato, tamaño) |
| VMI-10 | libre | dev-mcp + opa | M | VMI-06, VMI-09 | Registrar e indexar `docmachine/mod-legislativa` con el servidor MCP |
| VMI-11 | libre | opa | M | VMI-07, VMI-10 | `demo-mod-legislativa.md` con 5 consultas RAG, respuestas y trazas |

### Época 4 — Demo 2: 5 proyectos `onfalo/*` (multi-tenant)

| Task | Estado | Owner | Tamaño | Deps | Entrega |
|------|--------|-------|--------|------|---------|
| VMI-12 | libre | opa + PO | S | — | `spike-onfalo-projects.md` (selección y verificación de los 5) |
| VMI-13 | libre | dev-mcp + opa | S | VMI-05, VMI-12 | Registrar los 5 proyectos como `onfalo/{slug}` |
| VMI-14 | libre | dev-mcp + opa | M | VMI-06, VMI-13 | Indexar los 5 proyectos |
| VMI-15 | libre | opa | S | VMI-07, VMI-14 | `demo-onfalo-isolation.md` con 5 consultas cruzadas y veredicto de aislamiento |

### Época 5 — Wiring DRY y cierre del feature

| Task | Estado | Owner | Tamaño | Deps | Entrega |
|------|--------|-------|--------|------|---------|
| VMI-16 | libre | aleph | S | VMI-04 | Registrar `vector-machine-mcp-server` en `.vscode/mcp.json` (puerto 3010) |
| VMI-17 | libre | dev-mcp | S | VMI-04 | Integrar en `MCPLauncherServer`: catálogo + tools `launch/stop/restart/status` |
| VMI-18 | libre | aleph + opa | M | VMI-04 | Update DRY del plugin Scriptorium (`manifest.md`, `instructions.md`, bridge, docs) |

## Reparto entre repos / submódulos

| Trabajo | Vive en |
|---------|---------|
| Stack Docker, scripts, DeepWiki | `VectorMachineSDK/` (submódulo) |
| Esqueleto + tools MCP (VMI-04..VMI-08) | `MCPGallery/mcp-mesh-sdk/` (submódulo) |
| Registro `.vscode/mcp.json`, plugin, bridge (VMI-16, VMI-18) | Scriptorium raíz |
| Integración Launcher (VMI-17) | `MCPGallery/mcp-mesh-sdk/` (toca `MCPLauncherServer`) |
| Demos (VMI-09..VMI-15) | `sala/agente-*/` (consolidación final en `sala/dossiers/vector-machine/demos/` cuando aplique) |
| Fuentes de las demos | `DocumentMachineSDK/mod-legislativa/lore-db/` y `onfalo-asesor-sdk/` (solo lectura) |

## Camino crítico y paralelización

- **Crítico (lineal):** VMI-02 → VMI-04 → VMI-05 → VMI-06 → VMI-10 → VMI-11.
- **Paralelizable desde el inicio:** VMI-01 ‖ VMI-02 ‖ VMI-09 ‖ VMI-12.
- **Paralelizable tras VMI-04:** VMI-08 ‖ VMI-16 ‖ VMI-17 ‖ VMI-18.
- **Demo 2 paraleliza con Demo 1** una vez VMI-06 + VMI-07 estén listos.

## Criterio de cierre del feature

- [x] La frontera entre submódulo, plugin y futura fachada MCP queda ratificada sin ambigüedad de scope. *(VM-01 cerrada)*
- [x] Existe un backlog ejecutable derivado de esa frontera, sin reabrir exploración estructural ya resuelta. *(VM-02 cerrada)*
- [ ] El servidor MCP `vector-machine-mcp-server` está arrancable, registrado en `.vscode/mcp.json` (puerto 3010) y orquestado por el `MCPLauncherServer`.
- [ ] Las dos demos comprometidas con el PO (Épocas 3 y 4) están documentadas y son reproducibles.
- [ ] El plugin de Scriptorium describe estado real, no promesas.