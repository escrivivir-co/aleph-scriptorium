# Épica Archivada: SCRIPT-1.7.0 — Plugin MCP-PRESETS

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03  
> **Tasks completadas**: 33/33

---

## Objetivo

Crear un plugin de Scriptorium para gestionar presets MCP (packs de herramientas/recursos/prompts del Model Context Protocol), permitiendo importar, exportar y asignar presets a agentes especializados creados con AGENT_CREATOR.

---

## Esquema PresetModel (Zeus-compatible)

```json
{
  "id": "string (timestamp)",
  "name": "string (requerido)",
  "description": "string",
  "category": "General|Development|Analysis|Creative|productivity",
  "prompt": "string (requerido)",
  "parameters": {},
  "serverId": "string|null",
  "items": ["tool1", "tool2"],
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

---

## Stories Completadas

### S01 — Estructura del Plugin ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/plugins/mcp-presets/manifest.md` | ✅ |
| T002 | Crear `agents/mcp-presets.agent.md` | ✅ |
| T003 | Crear `instructions/mcp-presets.instructions.md` | ✅ |
| T004 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/` | ✅ |
| T005 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/presets/` | ✅ |
| T006 | Crear `catalog.json` (esqueleto) | ✅ |
| T007 | Crear `agent-assignments.json` (esqueleto) | ✅ |

### S02 — Importar Preset (Offline) ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Crear `prompts/importar-preset.prompt.md` | ✅ |
| T009 | Implementar validación de esquema PresetModel | ✅ |
| T010 | Guardar preset en `presets/{id}.json` | ✅ |
| T011 | Actualizar catálogo local | ✅ |
| T012 | Gestionar conflictos (preset existente) | ✅ |

### S03 — Listar Presets Locales ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T013 | Crear `prompts/listar-presets.prompt.md` | ✅ |
| T014 | Leer todos los archivos de `presets/` | ✅ |
| T015 | Mostrar resumen con metadata | ✅ |
| T016 | Indicar asignaciones a agentes | ✅ |

### S04 — Exportar Preset ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Crear `prompts/exportar-preset.prompt.md` | ✅ |
| T018 | Generar JSON Zeus-compatible | ✅ |
| T019 | Opción de exportar bundle | ✅ |
| T020 | Sugerir nombre de archivo | ✅ |

### S05 — Asignar Preset a Agente ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T021 | Crear `prompts/asignar-a-agente.prompt.md` | ✅ |
| T022 | Actualizar `agent-assignments.json` | ✅ |
| T023 | Inyectar `mcpPresets` en recipe | ✅ |
| T024 | Validar existencia de agente y preset | ✅ |
| T025 | Permitir desasignar | ✅ |

### S06 — Bridge Agent + Registry ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T026 | Crear `plugin_ox_mcppresets.agent.md` | ✅ |
| T027 | Actualizar `registry.json` | ✅ |
| T028 | Actualizar `aleph.agent.md` con handoff | ✅ |
| T029 | Actualizar `ox.agent.md` con índice | ✅ |

### S07 — Documentación ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T030 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/README.md` | ✅ |
| T031 | Actualizar `PLUGINS.md` | ✅ |
| T032 | Crear ejemplos en `presets/examples/` | ✅ |
| T033 | Documentar integración con AGENT_CREATOR | ✅ |

---

## Entregables

| Tipo | Archivo |
|------|---------|
| Manifest | `.github/plugins/mcp-presets/manifest.md` |
| Agente | `mcp-presets.agent.md` |
| Bridge | `plugin_ox_mcppresets.agent.md` |
| 4 Prompts | importar, listar, exportar, asignar |
| Datos | `ARCHIVO/PLUGINS/MCP_PRESETS/` |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-12-23 | Aprobar y publicar épica |
| 2025-12-23 | Implementar S01-S07 |
| 2025-01-03 | **Archivar** — 100% completada |
