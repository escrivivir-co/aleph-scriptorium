---
mode: agent
description: Vincula un preset MCP con un agente creado en AGENT_CREATOR.
---

# Asignar Preset a Agente

## Objetivo

Vincular un preset MCP con un agente especializado creado en AGENT_CREATOR, para que el agente tenga acceso a las herramientas del preset.

## Flujo

### 1. Verificar preset existe

Comprobar que el `presetId` existe en:
- `ARCHIVO/PLUGINS/MCP_PRESETS/presets/{id}.json`

### 2. Verificar agente existe

Comprobar que el agente existe en:
- `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{agentId}.recipe.json`
- O `ARCHIVO/DISCO/TALLER/ELENCO/{agentId}/`

### 3. Actualizar agent-assignments.json

Añadir la asignación al mapeo:

```json
{
  "assignments": {
    "agentId": ["presetId1", "presetId2"]
  }
}
```

### 4. Inyectar en recipe (opcional)

Si el usuario lo solicita, añadir campo `mcpPresets` a la recipe:

```json
{
  "nombre": "tarotista",
  "base": ["yellowflag"],
  "mcpPresets": [
    {
      "presetId": "1759359152317",
      "presetName": "DevOps Status",
      "tools": ["get_server_info", "get_server_status"]
    }
  ]
}
```

### 5. Confirmar asignación

Mostrar resumen de la vinculación.

## Comandos

- `asignar <preset-id> <agente-id>`: Vincular preset con agente
- `desasignar <preset-id> <agente-id>`: Eliminar vinculación
- `ver <agente-id>`: Ver presets asignados a un agente

## Reglas de Asignación

1. **Un agente puede tener múltiples presets**
2. **Un preset puede estar asignado a múltiples agentes**
3. **No duplicar asignaciones**: Si ya existe, no añadir de nuevo

## Ejemplo de Uso

Usuario: "@McpPresets asignar 1759359152317 tarotista"

Agente:
```
✅ Preset asignado

Preset: DevOps Status (1759359152317)
Agente: tarotista
Tools: get_server_info, get_server_status, read_logs, check_health, get_metrics

El agente tarotista ahora tiene acceso a 5 herramientas MCP.
```

## Desasignar

Usuario: "@McpPresets desasignar 1759359152317 tarotista"

Agente:
```
✅ Asignación eliminada

El preset DevOps Status ya no está vinculado con tarotista.
```

## Criterios de Aceptación

- [ ] AC1: Un agente puede tener múltiples presets
- [ ] AC2: Un preset puede estar asignado a múltiples agentes
- [ ] AC3: La asignación se refleja en agent-assignments.json
- [ ] AC4: Opcionalmente se inyecta en la recipe del agente
