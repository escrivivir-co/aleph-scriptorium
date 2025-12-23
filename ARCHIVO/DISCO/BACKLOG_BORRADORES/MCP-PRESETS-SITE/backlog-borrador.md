# Borrador Backlog: Plugin MCP-PRESETS

> **Código**: MCP-PRESETS-SITE  
> **Sprint target**: 2  
> **Estado**: Borrador (pendiente aprobación)  
> **Fecha**: 2025-12-23  
> **Conversación PO-SM**: [conversacion-po-sm.md](conversacion-po-sm.md)

---

## Resumen Ejecutivo

Plugin para gestionar **presets MCP** (packs de herramientas/recursos/prompts del Model Context Protocol) en Scriptorium. Permite importar, exportar y asignar presets a agentes especializados creados con AGENT_CREATOR.

**Submódulo fuente**: `alephscript-mcp-presets-site` (Zeus)  
**Rama de integración**: `integration/beta/scriptorium`

---

# Épica: SCRIPT-1.7.0 — Plugin MCP-PRESETS

**Objetivo**: Crear un plugin de Scriptorium que permita gestionar presets MCP para asignar toolkits a agentes especializados.

**Estado**: ⏳ Pendiente aprobación

---

## Story: SCRIPT-1.7.0-S01 — Estructura del Plugin
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear la estructura base del plugin siguiendo el protocolo de PLUGINS.md.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/plugins/mcp-presets/manifest.md` con metadatos | ⏳ |
| T002 | Crear `agents/mcp-presets.agent.md` (agente principal) | ⏳ |
| T003 | Crear `instructions/mcp-presets.instructions.md` | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/` con estructura de datos | ⏳ |
| T005 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/presets/` (vacío) | ⏳ |
| T006 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/catalog.json` (esqueleto) | ⏳ |
| T007 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json` (esqueleto) | ⏳ |

### Criterios de Aceptación
- [ ] El plugin tiene manifest.md válido con frontmatter YAML
- [ ] La estructura sigue las convenciones de PLUGINS.md
- [ ] El agente tiene handoffs para cada operación CRUD

---

## Story: SCRIPT-1.7.0-S02 — Importar Preset (Offline)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Permitir importar un preset desde archivo JSON al Scriptorium.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Crear `prompts/importar-preset.prompt.md` | ⏳ |
| T009 | Implementar validación de esquema PresetModel | ⏳ |
| T010 | Guardar preset en `presets/{id}.json` | ⏳ |
| T011 | Actualizar catálogo local si es necesario | ⏳ |
| T012 | Gestionar conflictos (preset existente) | ⏳ |

### Criterios de Aceptación
- [ ] AC1: Si el JSON no cumple el esquema, rechazar con mensaje claro
- [ ] AC2: Si el preset ya existe (por id), preguntar si sobrescribir
- [ ] AC3: Preservar todos los campos de Zeus (serverId, items, serverContent)

### Esquema PresetModel (Zeus-compatible)
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

## Story: SCRIPT-1.7.0-S03 — Listar Presets Locales
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Listar todos los presets disponibles en el Scriptorium con su metadata.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T013 | Crear `prompts/listar-presets.prompt.md` | ⏳ |
| T014 | Leer todos los archivos de `presets/` | ⏳ |
| T015 | Mostrar resumen: nombre, descripción, items, asignaciones | ⏳ |
| T016 | Indicar si el preset está asignado a algún agente | ⏳ |

### Criterios de Aceptación
- [ ] El listado muestra todos los presets con metadata básica
- [ ] Se indica si cada preset está asignado y a qué agentes
- [ ] Formato legible y estructurado

---

## Story: SCRIPT-1.7.0-S04 — Exportar Preset
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Exportar uno o más presets en formato JSON compatible con Zeus.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Crear `prompts/exportar-preset.prompt.md` | ⏳ |
| T018 | Generar JSON con formato Zeus-compatible | ⏳ |
| T019 | Opción de exportar múltiples como bundle | ⏳ |
| T020 | Sugerir nombre de archivo basado en preset | ⏳ |

### Criterios de Aceptación
- [ ] El JSON exportado es válido según PresetModel de Zeus
- [ ] Se puede exportar un preset individual o un bundle
- [ ] El archivo incluye timestamp de exportación

---

## Story: SCRIPT-1.7.0-S05 — Asignar Preset a Agente
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Vincular presets MCP con agentes creados en AGENT_CREATOR.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T021 | Crear `prompts/asignar-a-agente.prompt.md` | ⏳ |
| T022 | Actualizar `agent-assignments.json` con mapeo | ⏳ |
| T023 | Integrar con AGENT_CREATOR: inyectar campo `mcpPresets` en recipe | ⏳ |
| T024 | Validar que el agente y preset existen | ⏳ |
| T025 | Permitir desasignar preset de agente | ⏳ |

### Criterios de Aceptación
- [ ] AC1: Un agente puede tener múltiples presets
- [ ] AC2: Un preset puede estar asignado a múltiples agentes
- [ ] AC3: La asignación se refleja en la recipe del agente

### Estructura agent-assignments.json
```json
{
  "version": "1.0.0",
  "assignments": {
    "agentId": ["presetId1", "presetId2"]
  },
  "lastUpdated": "ISO8601"
}
```

---

## Story: SCRIPT-1.7.0-S06 — Bridge Agent + Registry
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear el agente bridge y registrar el plugin en el sistema.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T026 | Crear `.github/agents/plugin_ox_mcppresets.agent.md` | ⏳ |
| T027 | Actualizar `registry.json` con el nuevo plugin | ⏳ |
| T028 | Actualizar `aleph.agent.md` con handoff al bridge | ⏳ |
| T029 | Actualizar `ox.agent.md` con índice del plugin | ⏳ |

### Criterios de Aceptación
- [ ] El bridge está en `.github/agents/` (detectable por VS Code)
- [ ] El plugin aparece en `registry.json` con estado enabled
- [ ] @aleph tiene handoff `[MCP-PRESETS]` funcional

---

## Story: SCRIPT-1.7.0-S07 — Documentación
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Documentar el plugin y su uso.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T030 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/README.md` | ⏳ |
| T031 | Actualizar `.github/PLUGINS.md` con sección mcp-presets | ⏳ |
| T032 | Crear ejemplos de presets en `presets/examples/` | ⏳ |
| T033 | Documentar integración con AGENT_CREATOR | ⏳ |

### Criterios de Aceptación
- [ ] README explica el propósito y uso del plugin
- [ ] PLUGINS.md incluye el nuevo plugin en la tabla de bridges
- [ ] Hay al menos 2 presets de ejemplo

---

## Métricas del Sprint

| Métrica | Valor |
|---------|-------|
| Stories totales | 7 |
| Tasks totales | 33 |
| Puntos totales | 23 |
| Prioridad Must | 5 stories (13 puntos) |
| Prioridad Should | 2 stories (10 puntos) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo mcp-presets-site | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin AGENT_CREATOR | ✅ Instalado | Integración en S05 |
| Setup script actualizado | ✅ Completado | scripts/setup-workspace.sh |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Esquema Zeus cambia | Baja | Alto | Versionar esquemas, validar en importación |
| Zeus no está corriendo | Media | Bajo | MVP offline primero |
| Conflictos con AGENT_CREATOR | Baja | Medio | Inyección no destructiva en recipes |

---

## Roadmap Futuro (Post-Sprint 2)

### Sprint 3: Integración API
- Conexión HTTP con Zeus (si está corriendo)
- Sincronización bidireccional de presets
- UI para selección interactiva desde catálogo remoto

### Sprint 4: Integración Extensión VS Code
- Exportar presets a formato de la extensión
- Sincronización Scriptorium ↔ Extension
- ChatParticipants con tools MCP asignados

---

## Notas de Implementación

### Esquema MCPModel (para catálogo)
```json
{
  "serverId": "string",
  "name": "string",
  "url": "string",
  "status": "connected|disconnected|error",
  "tools": [
    { "name": "", "description": "", "parameters": {}, "schema": null }
  ],
  "resources": [
    { "name": "", "uri": "", "mimeType": "", "description": "" }
  ],
  "prompts": [
    { "name": "", "description": "", "arguments": [] }
  ]
}
```

### Inyección en Recipe de Agente
Cuando se asigna un preset a un agente, se añade el campo:
```json
{
  "...recipe existente...",
  "mcpPresets": [
    {
      "presetId": "1759359152317",
      "presetName": "DevOps Status Preset",
      "tools": ["get_server_info", "get_server_status"]
    }
  ]
}
```

