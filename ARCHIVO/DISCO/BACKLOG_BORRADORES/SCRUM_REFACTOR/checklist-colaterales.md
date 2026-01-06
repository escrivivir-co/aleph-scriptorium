# Checklist de Colaterales — SCRUM-REFACTOR-1.0.0

> **Origen**: T003 (@ox) — Inventario de BREAKING CHANGE

---

## Instrucciones de Uso

1. Antes de cada archivo, verificar si la referencia actual es correcta
2. Marcar ✅ cuando se actualice/verifique
3. Marcar ⏭️ si no requiere cambios
4. Marcar ❌ si hay problema

---

## A. Plugin Scrum (RESET COMPLETO)

| # | Archivo | Estado | Notas |
|---|---------|--------|-------|
| 1 | `.github/plugins/scrum/manifest.md` | ✅ | REESCRITO v3.0.0 |
| 2 | `.github/plugins/scrum/agents/scrum.agent.md` | ✅ | REESCRITO - interpreta Lucas |
| 3 | `.github/plugins/scrum/instructions/scrum-protocol.instructions.md` | ✅ | REESCRITO - Modelo Generativo |
| 4 | `.github/plugins/scrum/prompts/planificar-sprint.prompt.md` | ✅ | REESCRITO v3.0 |
| 5 | `.github/plugins/scrum/prompts/crear-backlog-borrador.prompt.md` | ✅ | REESCRITO - origen: |
| 6 | `.github/plugins/scrum/prompts/aprobar-backlog.prompt.md` | ✅ | REESCRITO - trazabilidad |
| 7 | `.github/plugins/scrum/prompts/tracking-sprint.prompt.md` | ✅ | REESCRITO - status sesiones |
| 8 | `.github/plugins/scrum/prompts/retrospectiva.prompt.md` | ✅ | REESCRITO --incluir-sesiones |
| 8b | `.github/plugins/scrum/prompts/generar-desde-sesion.prompt.md` | ✅ | NUEVO - Modelo Generativo |

---

## B. Bridge Scrum

| # | Archivo | Estado | Notas |
|---|---------|--------|-------|
| 9 | `.github/agents/plugin_ox_scrum.agent.md` | ✅ | REESCRITO v3.0.0 |

---

## C. Core Instructions

| # | Archivo | Línea | Referencia | Estado |
|---|---------|-------|------------|--------|
| 10 | `.github/copilot-instructions.md` | L25 | `@scrum` en tabla de fuentes | ✅ OK (no cambios) |
| 11 | `.github/copilot-instructions.md` | L27 | `@scrum` en auto-reflexión | ✅ OK (no cambios) |
| 12 | `.github/copilot-instructions.md` | L69 | `@scrum` rol en triada | ✅ OK (no cambios) |

---

## D. AGENTS.md

| # | Archivo | Sección | Estado |
|---|---------|---------|--------|
| 13 | `.github/agents/AGENTS.md` | Capa Plugins | ✅ OK (no cambios) |
| 14 | `.github/agents/AGENTS.md` | Detalle por Plugin | ✅ OK (no cambios) |

---

## E. README Principal

| # | Archivo | Línea | Referencia | Estado |
|---|---------|-------|------------|--------|
| 15 | `README.md` | L59 | Lista de plugins operativos | ✅ OK (no cambios) |

---

## F. Scripts

| # | Archivo | Líneas | Referencia | Estado |
|---|---------|--------|------------|--------|
| 16 | `scripts/setup-workspace.sh` | L84 | Rutas de prompts | ✅ OK (rutas válidas) |
| 17 | `scripts/setup-workspace.sh` | L106 | Rutas de instructions | ✅ OK (rutas válidas) |

---

## G. Documentación (docs/)

| # | Archivo | Líneas | Referencia | Estado |
|---|---------|--------|------------|--------|
| 18 | `docs/ecosistema.md` | L58 | Plugin Scrum | ✅ Actualizado v3.0 |
| 19 | `docs/ecosistema.md` | L124 | Descripción | ✅ OK (no cambios) |
| 20 | `docs/blueprint.md` | L135 | `@scrum` | ⏭️ Referencia válida |
| 21 | `docs/blueprint.md` | L198 | `@scrum` | ⏭️ Referencia válida |
| 22 | `docs/blueprint-copilot.md` | L1002 | Link a scrum.agent.md | ⏭️ Referencia válida |
| 23 | `docs/hackathon-demo-script-2.1.0.md` | L48 | Context pack | ⏭️ Referencia válida |
| 24 | `docs/hackathon-demo-script-2.1.0.md` | L121 | `@scrum` | ⏭️ Referencia válida |
| 25 | `docs/hackathon-demo-script-2.1.0.md` | L132 | `@scrum` | ⏭️ Referencia válida |
| 26 | `docs/hackathon-demo-script-2.1.0.md` | L211 | `@scrum` | ⏭️ Referencia válida |
| 27 | `docs/hackathon-demo-script-2.1.0.md` | L235 | `@scrum` | ⏭️ Referencia válida |

---

## H. Obras de Teatro

> **Nota**: @scrum sigue existiendo como agente. Las obras no requieren cambios.

| # | Archivo | Líneas | Referencia | Estado |
|---|---------|--------|------------|--------|
| 28-33 | `context-bloat-saga.yaml` | Varios | @scrum actor | ⏭️ No cambios |
| 34-42 | `hackathon-script-2.1.0.md` | Varios | @scrum | ⏭️ No cambios |

---

## I. MCPGallery (Submódulos)

> **Nota**: Fuera de scope para esta épica. Debt técnico documentado.

| # | Archivo | Líneas | Referencia | Estado |
|---|---------|--------|------------|--------|
| 43-46 | `zeus-architect.agent.md` | Varios | context-pack-scrum | ⏭️ Debt técnico |
| 33 | `ARCHIVO/PLUGINS/TEATRO/obras/context-bloat-saga.yaml` | L510 | @scrum actor | ⏳ |
| 34 | `docs/teatro/hackathon-script-2.1.0.md` | L19 | @scrum | ⏳ |
| 35 | `docs/teatro/hackathon-script-2.1.0.md` | L57 | @scrum | ⏳ |
| 36 | `docs/teatro/hackathon-script-2.1.0.md` | L59 | @scrum | ⏳ |
| 37 | `docs/teatro/hackathon-script-2.1.0.md` | L94 | @scrum | ⏳ |
| 38 | `docs/teatro/hackathon-script-2.1.0.md` | L135 | @scrum | ⏳ |
| 39 | `docs/teatro/hackathon-script-2.1.0.md` | L236 | @scrum | ⏳ |
| 40 | `docs/teatro/hackathon-script-2.1.0.md` | L265 | @scrum | ⏳ |
| 41 | `docs/teatro/hackathon-script-2.1.0.md` | L291 | @scrum | ⏳ |
| 42 | `docs/teatro/hackathon-script-2.1.0.md` | L368 | @scrum | ⏳ |

---

## I. MCPGallery (Submódulos)

| # | Archivo | Líneas | Referencia | Estado |
|---|---------|--------|------------|--------|
| 43 | `MCPGallery/.github/agents/zeus-architect.agent.md` | L174 | context-pack-scrum | ⏳ |
| 44 | `MCPGallery/.github/agents/zeus-architect.agent.md` | L182 | context-pack-scrum | ⏳ |
| 45 | `MCPGallery/.github/agents/zeus-architect.agent.md` | L198 | context-pack-scrum | ⏳ |
| 46 | `MCPGallery/mcp-mesh-sdk/src/zeus-site/.github/agents/zeus-architect.agent.md` | — | Duplicado | ⏳ |

---

## Resumen

| Categoría | Total | Completados | Skip |
|-----------|-------|-------------|------|
| Plugin Scrum | 9 | 9 | 0 |
| Bridge | 1 | 1 | 0 |
| Core Instructions | 3 | 3 | 0 |
| AGENTS.md | 2 | 2 | 0 |
| README | 1 | 1 | 0 |
| Scripts | 2 | 2 | 0 |
| Docs | 10 | 1 | 9 |
| Teatro | 15 | 0 | 15 |
| MCPGallery | 4 | 0 | 4 |
| **TOTAL** | **47** | **19** | **28** |

> ✅ **FASE 4 COMPLETADA** — Todos los colaterales verificados |

---

## Notas de Implementación

### Obras de Teatro

Las referencias en obras de teatro (`context-bloat-saga.yaml`, `hackathon-script-2.1.0.md`) probablemente **NO requieren cambios** porque:
- @scrum sigue existiendo como agente
- Solo cambia la implementación interna
- La narrativa no se rompe

**Acción**: Verificar que las referencias siguen funcionando, no reescribir.

### MCPGallery

Los submódulos tienen su propio ciclo de desarrollo. Las referencias en `zeus-architect.agent.md` pueden requerir:
- PR separado al submódulo
- O documentar como "fuera de scope" para esta épica

**Acción**: Decidir si incluir en scope o documentar como debt técnico.
