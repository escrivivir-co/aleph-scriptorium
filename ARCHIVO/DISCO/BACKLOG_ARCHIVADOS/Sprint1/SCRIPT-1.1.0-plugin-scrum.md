# Épica Archivada: SCRIPT-1.1.0 — Plugin Scrum

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03  
> **Tasks completadas**: 14/14

---

## Objetivo

Crear un plugin de gestión ágil de backlogs con protocolo formal de 5 fases.

---

## Stories Completadas

### S01 — Estructura del Plugin ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `manifest.md` del plugin | ✅ |
| T002 | Crear `scrum.agent.md` (Scrum Master) | ✅ |
| T003 | Crear `scrum-protocol.instructions.md` | ✅ |

### S02 — Prompts del Protocolo ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Crear `planificar-sprint.prompt.md` (Fase 1) | ✅ |
| T005 | Crear `crear-backlog-borrador.prompt.md` (Fase 2) | ✅ |
| T006 | Crear `aprobar-backlog.prompt.md` (Fase 3) | ✅ |
| T007 | Crear `tracking-sprint.prompt.md` (Fase 4) | ✅ |
| T008 | Crear `retrospectiva.prompt.md` (Fase 5) | ✅ |

### S03 — Integración ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T009 | Crear bridge `plugin_ox_scrum.agent.md` | ✅ |
| T010 | Actualizar `registry.json` | ✅ |
| T011 | Actualizar `ox.agent.md` (índice v1.2.0) | ✅ |
| T012 | Actualizar `aleph.agent.md` (handoff) | ✅ |
| T013 | Actualizar `copilot-instructions.md` | ✅ |
| T014 | Crear `ARCHIVO/PLUGINS/SCRUM/README.md` | ✅ |

---

## Protocolo de 5 Fases

| Fase | Nombre | Prompt |
|------|--------|--------|
| 1 | Planificar | `planificar-sprint.prompt.md` |
| 2 | Editar (Borrador) | `crear-backlog-borrador.prompt.md` |
| 3 | Aprobar | `aprobar-backlog.prompt.md` |
| 4 | Tracking | `tracking-sprint.prompt.md` |
| 5 | Cerrar | `retrospectiva.prompt.md` |

---

## Entregables

| Tipo | Archivo |
|------|---------|
| Manifest | `.github/plugins/scrum/manifest.md` |
| Agente | `scrum.agent.md` |
| Instrucciones | `scrum-protocol.instructions.md` |
| Bridge | `plugin_ox_scrum.agent.md` |
| 5 Prompts | `planificar-sprint`, `crear-backlog-borrador`, etc. |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-12-22 | Instalar plugin Scrum v1.0.0 |
| 2025-01-03 | **Archivar** — 100% completada |
