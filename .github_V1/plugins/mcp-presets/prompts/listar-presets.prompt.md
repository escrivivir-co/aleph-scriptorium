---
mode: agent
description: Lista todos los presets MCP disponibles en el Scriptorium con su metadata.
---

# Listar Presets MCP

## Objetivo

Mostrar todos los presets disponibles en `ARCHIVO/PLUGINS/MCP_PRESETS/presets/` con su metadata.

## Flujo

### 1. Escanear directorio de presets

Leer todos los archivos `.json` en:
- `ARCHIVO/PLUGINS/MCP_PRESETS/presets/` (presets del usuario)
- `ARCHIVO/PLUGINS/MCP_PRESETS/presets/examples/` (ejemplos de referencia)

### 2. Cargar metadata de cada preset

Para cada archivo, extraer:
- `id`
- `name`
- `description`
- `category`
- `items` (contar cantidad)
- `serverId`

### 3. Verificar asignaciones

Consultar `ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json` para ver si cada preset está asignado a algún agente.

### 4. Mostrar listado formateado

## Formato de Salida

```markdown
## Presets Disponibles

| ID | Nombre | Categoría | Items | Servidor | Asignado a |
|----|--------|-----------|-------|----------|------------|
| 123... | DevOps Status | Development | 5 | playwright | tarotista |
| 456... | Code Analysis | Analysis | 4 | - | - |

### Ejemplos (solo lectura)

| ID | Nombre | Descripción |
|----|--------|-------------|
| example-devops-status | DevOps Status Preset | Herramientas de monitoreo |
| example-code-analysis | Code Analysis Preset | Análisis de código |

**Total**: 2 presets + 2 ejemplos
**Asignados**: 1
```

## Opciones

- `--asignados`: Mostrar solo presets con agentes asignados
- `--categoria <cat>`: Filtrar por categoría
- `--servidor <id>`: Filtrar por servidor MCP

## Ejemplo de Uso

Usuario: "@McpPresets listar"

Agente: [Muestra tabla con todos los presets]

Usuario: "@McpPresets listar --asignados"

Agente: [Muestra solo presets con asignaciones]

## Criterios de Aceptación

- [ ] El listado muestra todos los presets con metadata básica
- [ ] Se indica si cada preset está asignado y a qué agentes
- [ ] Formato legible y estructurado
