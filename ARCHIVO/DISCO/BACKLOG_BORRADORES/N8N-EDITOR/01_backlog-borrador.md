# Backlog Borrador: SCRIPT-1.14.0 — Plugin N8N Editor

**Estado**: 📝 Borrador (pendiente aprobación)  
**Fecha**: 2025-12-24  
**Submódulo**: `alephscript-n8n-like-editor`  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/N8N-EDITOR/conversacion-po-sm.md`

---

## Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Stories** | 6 |
| **Tasks** | 24 |
| **Puntos totales** | 15 |
| **Prioridad Must** | 4 stories (10 pts) |
| **Prioridad Should** | 2 stories (5 pts) |

---

## Feature Cycle 1: Plugin Base + Templates

### Concepto Central

> **N8N Editor es un CONECTOR, no un sustituto de n8n.**
> 
> Permite diseñar workflows visualmente, integrar presets MCP del Scriptorium,
> validar con TypedPrompting, y exportar a n8n para ejecución.

### Estructura de Dos Pasos

| Paso | Modo | Función |
|------|------|---------|
| **1. Asistente** | Diseño | Transportar ontología, presets, templates al editor |
| **2. Gestor** | Ejecución | Crear, editar, exportar workflows en tiempo real |

---

## Stories

### SCRIPT-1.14.0-S01: Estructura del Plugin
**Puntos**: 2  
**Prioridad**: Must

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/plugins/n8n-editor/manifest.md` | ⏳ |
| T002 | Crear `agents/n8n-editor.agent.md` | ⏳ |
| T003 | Crear `instructions/n8n-editor.instructions.md` | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/N8N_EDITOR/README.md` | ⏳ |

**DoD**: Plugin tiene estructura válida según PLUGINS.md

---

### SCRIPT-1.14.0-S02: Agente y Prompts
**Puntos**: 3  
**Prioridad**: Must

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Crear `prompts/abrir-editor.prompt.md` | ⏳ |
| T006 | Crear `prompts/crear-workflow.prompt.md` | ⏳ |
| T007 | Crear `prompts/importar-workflow.prompt.md` | ⏳ |
| T008 | Crear `prompts/exportar-workflow.prompt.md` | ⏳ |
| T009 | Definir handoffs del agente (Asistente/Gestor) | ⏳ |

**DoD**: Agente tiene prompts para operaciones básicas

---

### SCRIPT-1.14.0-S03: Bridge Agent
**Puntos**: 2  
**Prioridad**: Must

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Crear `.github/agents/plugin_ox_n8neditor.agent.md` | ⏳ |
| T011 | Actualizar `registry.json` | ⏳ |
| T012 | Actualizar `ox.agent.md` (índice v1.8.0) | ⏳ |
| T013 | Actualizar `aleph.agent.md` (handoff) | ⏳ |

**DoD**: Bridge detectable por VS Code, handoff funcional desde @aleph

---

### SCRIPT-1.14.0-S04: Templates Predefinidos
**Puntos**: 3  
**Prioridad**: Must

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T014 | Crear `templates/workflow-auditoria.json` (5 banderas) | ⏳ |
| T015 | Crear `templates/workflow-scraping.json` (foro → proceso) | ⏳ |
| T016 | Documentar estructura de templates | ⏳ |
| T017 | Añadir carga de templates en prompts | ⏳ |

**DoD**: 2 templates funcionan en el editor

---

### SCRIPT-1.14.0-S05: Integración TypedPrompting
**Puntos**: 3  
**Prioridad**: Should

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T018 | Crear schema `workflow.schema.json` en TypedPrompting | ⏳ |
| T019 | Documentar validación de exports | ⏳ |
| T020 | Añadir handoff a TypedPrompting en agente | ⏳ |
| T021 | Ejemplo de flujo: Editor → TypedPrompting → n8n | ⏳ |

**DoD**: Exports JSON se validan con schema TypedPrompting

---

### SCRIPT-1.14.0-S06: Documentación e Integración Sistema
**Puntos**: 2  
**Prioridad**: Should

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T022 | Actualizar `scripts/setup-workspace.sh` (13 submódulos) | ⏳ |
| T023 | Actualizar `scripts/README.md` | ⏳ |
| T024 | Actualizar `copilot-instructions.md` | ⏳ |

**DoD**: Sistema reconoce plugin, discovery funciona

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo instalado | ✅ | Rama integration/beta/scriptorium |
| Plugin TypedPrompting | ✅ | Para validación de schemas |
| Plugin MCP-Presets | ✅ | Para inyección de presets |
| Node.js 18+ | ⚠️ Usuario | Requerido para desarrollo |

---

## Riesgos

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| R1 | SSR complejo | Baja | Medio | Documentar modo standalone |
| R2 | Puertos ocupados | Media | Bajo | Env vars configurables |
| R3 | Tipos MCP incompatibles | Baja | Medio | Schemas TypedPrompting |

---

## Criterios de Aceptación Épica

- [ ] Plugin instalado con estructura completa
- [ ] Bridge funcional desde @aleph
- [ ] 2 templates predefinidos
- [ ] Schema workflow en TypedPrompting
- [ ] Setup script actualizado para 13 submódulos
- [ ] Documentación completa

---

## Pendiente Aprobación

Usuario puede revisar este borrador y:
- `@scrum aprobar` → Mover a BACKLOG-SCRIPTORIUM.md
- `@scrum ajustar` → Modificar estimaciones o scope
- `@scrum rechazar` → Archivar y documentar razón
