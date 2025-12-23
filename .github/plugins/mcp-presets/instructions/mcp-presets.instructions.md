---
name: Instrucciones del Plugin MCP-Presets
description: Contexto y reglas para gestión de presets MCP en el Scriptorium.
applyTo: "ARCHIVO/PLUGINS/MCP_PRESETS/**/*.json, .github/plugins/mcp-presets/**/*.md"
---

# Plugin MCP-Presets: Instrucciones

> **Plugin**: mcp-presets  
> **Agente**: @McpPresets  
> **Versión**: 1.0.0

---

## Qué es un Preset MCP

Un **preset MCP** es un paquete que agrupa:
- **Tools**: Herramientas ejecutables (funciones MCP)
- **Resources**: Recursos de datos (URIs)
- **Prompts**: Prompts predefinidos con argumentos

Los presets permiten **modularizar las capacidades** de los agentes.

---

## Esquema PresetModel

El esquema es compatible con el proyecto Zeus (`alephscript-mcp-presets-site`):

```json
{
  "id": "1759359152317",
  "name": "DevOps Status Preset",
  "description": "Herramientas para monitoreo de servidores",
  "category": "Development",
  "prompt": "Analiza el estado del servidor y genera reporte",
  "parameters": {},
  "serverId": "playwright",
  "items": ["get_server_info", "get_server_status", "resource://logs"],
  "createdAt": "2025-12-23T10:00:00Z",
  "updatedAt": "2025-12-23T10:00:00Z"
}
```

### Campos Obligatorios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único (timestamp recomendado) |
| `name` | string | Nombre legible del preset |
| `prompt` | string | Prompt asociado al preset |

### Campos Opcionales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `description` | string | Descripción extendida |
| `category` | enum | General, Development, Analysis, Creative, productivity |
| `parameters` | object | Parámetros personalizables |
| `serverId` | string | Servidor MCP asociado |
| `items` | array | Lista de tools/resources/prompts incluidos |
| `createdAt` | ISO8601 | Fecha de creación |
| `updatedAt` | ISO8601 | Fecha de última modificación |

---

## Reglas de Validación

### Al importar un preset

1. **Verificar campos obligatorios**: `id`, `name`, `prompt`
2. **Validar formato ID**: Si no es timestamp, generar uno nuevo
3. **Verificar items**: Deben ser strings válidos
4. **Detectar conflictos**: Si `id` existe, preguntar antes de sobrescribir

### Al asignar a agente

1. **Verificar que el preset existe** en `presets/`
2. **Verificar que el agente existe** en AGENT_CREATOR o ELENCO
3. **No duplicar asignaciones**: Un preset solo se asigna una vez por agente

---

## Estructura de Datos

### Ubicación de archivos

```
ARCHIVO/PLUGINS/MCP_PRESETS/
├── presets/                   # Presets importados
│   ├── examples/              # Ejemplos incluidos
│   └── {id}.json              # Presets del usuario
├── catalog.json               # Catálogo de servidores MCP
├── agent-assignments.json     # Mapeo agente → presets
└── README.md                  # Documentación
```

### Esquema catalog.json

```json
{
  "version": "1.0.0",
  "servers": [
    {
      "serverId": "playwright",
      "name": "Playwright MCP",
      "url": "http://localhost:3000",
      "status": "disconnected",
      "tools": [],
      "resources": [],
      "prompts": []
    }
  ],
  "lastUpdated": "2025-12-23T10:00:00Z"
}
```

### Esquema agent-assignments.json

```json
{
  "version": "1.0.0",
  "assignments": {
    "tarotista": ["preset-id-1", "preset-id-2"],
    "nonsi": ["preset-id-3"]
  },
  "lastUpdated": "2025-12-23T10:00:00Z"
}
```

---

## Integración con AGENT_CREATOR

### Inyección en Recipe

Cuando se asigna un preset, se puede inyectar en la recipe del agente:

```json
{
  "nombre": "tarotista",
  "base": ["yellowflag"],
  "mcpPresets": [
    {
      "presetId": "1759359152317",
      "presetName": "DevOps Status",
      "tools": ["get_server_info"]
    }
  ]
}
```

### Flujo de creación de agente con preset

1. Usuario crea agente con AGENT_CREATOR
2. Durante la creación, se le pregunta qué presets asignar
3. McpPresets registra la asignación
4. AGENT_CREATOR inyecta `mcpPresets` en la recipe

---

## Lo que NO hacer

- **No modificar presets de examples/**: Son de referencia
- **No duplicar IDs**: Cada preset debe tener ID único
- **No asignar presets inexistentes**: Verificar primero
- **No editar agent-assignments.json manualmente**: Usar el agente

---

## Submódulo Zeus

El proyecto fuente es `alephscript-mcp-presets-site`:

| Campo | Valor |
|-------|-------|
| Rama | `integration/beta/scriptorium` |
| Ruta | `alephscript-mcp-presets-site/` |
| Modelo | `zeus/models/presetModel.js` |

Para sincronización futura, el Scriptorium usará la API REST de Zeus.

---

## Categorías Válidas

| Categoría | Descripción |
|-----------|-------------|
| `General` | Uso general, sin especialización |
| `Development` | Desarrollo de software, DevOps |
| `Analysis` | Análisis de datos, auditoría |
| `Creative` | Escritura, diseño, creatividad |
| `productivity` | Productividad, automatización |

---

## Referencias

- [Manifest del plugin](../manifest.md)
- [Agente McpPresets](../agents/mcp-presets.agent.md)
- [PLUGINS.md](../../PLUGINS.md)
- [Zeus README](../../../../alephscript-mcp-presets-site/README.md)
