---
id: mcp-presets
name: "Gestor de Presets MCP"
version: "1.0.0"
description: "Plugin para gestionar presets MCP (packs de herramientas/recursos/prompts del Model Context Protocol). Permite importar, exportar y asignar presets a agentes especializados."
author: "Aleph Scriptorium"
license: "AIPL-1.0"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies:
  - "agent-creator"  # Para asignación de presets a agentes

# Servidores MCP (del submódulo MCPGallery)
mcpServers:
  - id: "devops-mcp-server"
    port: 3003
    source: "MCPGallery/mcp-mesh-sdk"
    startCommand: "npm start"
    description: "DevOps automation server"
  - id: "launcher-server"
    port: 3050
    source: "MCPGallery/mcp-mesh-sdk"
    startCommand: "npm run start:launcher"
    description: "Server orchestration (puede lanzar otros)"
  - id: "wiki-browser-server"
    port: 3002
    source: "MCPGallery/mcp-mesh-sdk"
    startCommand: "npm run start:wiki"
    description: "Wikipedia browsing"
  - id: "state-machine-server"
    port: 3004
    source: "MCPGallery/mcp-mesh-sdk"
    startCommand: "npm run start:state"
    description: "X+1 state machine"

# Recursos exportados
agents:
  - name: "McpPresets"
    file: "agents/mcp-presets.agent.md"
    description: "Agente principal para gestión de presets MCP"

prompts:
  - name: "importar-preset"
    file: "prompts/importar-preset.prompt.md"
    description: "Importar un preset desde archivo JSON"
  - name: "listar-presets"
    file: "prompts/listar-presets.prompt.md"
    description: "Listar presets disponibles en el Scriptorium"
  - name: "exportar-preset"
    file: "prompts/exportar-preset.prompt.md"
    description: "Exportar presets en formato Zeus-compatible"
  - name: "asignar-a-agente"
    file: "prompts/asignar-a-agente.prompt.md"
    description: "Vincular preset con agente de AGENT_CREATOR"

instructions:
  - name: "mcp-presets"
    file: "instructions/mcp-presets.instructions.md"
    description: "Contexto y reglas para gestión de presets MCP"

# Integración con Aleph
handoffs:
  - label: "Importar preset MCP"
    agent: "McpPresets"
    prompt: "Importa un preset desde archivo JSON al Scriptorium."
  - label: "Listar presets disponibles"
    agent: "McpPresets"
    prompt: "Lista todos los presets MCP disponibles con su metadata."
  - label: "Exportar preset"
    agent: "McpPresets"
    prompt: "Exporta presets en formato JSON compatible con Zeus."
  - label: "Asignar preset a agente"
    agent: "McpPresets"
    prompt: "Vincula un preset MCP con un agente creado en AGENT_CREATOR."

# Datos del plugin
data_directory: "ARCHIVO/PLUGINS/MCP_PRESETS/"
---

# Plugin: Gestor de Presets MCP

Este plugin permite gestionar **presets MCP** (Model Context Protocol) en el Scriptorium.

## Qué es un Preset MCP

Un preset es un **pack de herramientas, recursos y prompts** del protocolo MCP que se puede:
- Importar desde el proyecto Zeus
- Asignar a agentes especializados
- Exportar para compartir

## Estructura de Datos

```
ARCHIVO/PLUGINS/MCP_PRESETS/
├── presets/                   # Presets importados
│   ├── examples/              # Ejemplos incluidos
│   └── {preset-id}.json       # Un archivo por preset
├── catalog.json               # Catálogo de servidores MCP conocidos
├── agent-assignments.json     # Mapeo agente → presets
└── README.md                  # Documentación
```

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

## Integración con AGENT_CREATOR

Cuando se asigna un preset a un agente, se añade el campo `mcpPresets` a la recipe:

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

## Submódulo Fuente

| Campo | Valor |
|-------|-------|
| Repositorio | `alephscript-mcp-presets-site` |
| Rama | `integration/beta/scriptorium` |
| Tecnología | Node.js + Express + HyperAxe |

## Roadmap

- **Sprint 1**: MVP offline (importar/exportar/asignar)
- **Sprint 2**: Conexión HTTP con Zeus
- **Sprint 3**: Sincronización con extensión VS Code
