---
name: plugin_ox_mcppresets
description: "Bridge: conecta VS Code con el agente McpPresets del plugin mcp-presets. Gestiona presets MCP usando el patrón BaseMCPServer de mcp-core-sdk."
argument-hint: "Gestiona presets MCP: importar, listar, exportar, asignar a agentes, arrancar MCP Server."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
handoffs:
  - label: Listar agentes del plugin mcp-presets
    agent: plugin_ox_mcppresets
    prompt: Lista agentes disponibles en este plugin.
    send: false
  - label: Invocar McpPresets
    agent: .github/plugins/mcp-presets/agents/mcp-presets.agent.md
    prompt: Gestiona presets MCP para agentes especializados.
    send: false
  - label: Importar preset MCP
    agent: .github/plugins/mcp-presets/agents/mcp-presets.agent.md
    prompt: Importa un preset desde archivo JSON al Scriptorium.
    send: false
  - label: Listar presets disponibles
    agent: .github/plugins/mcp-presets/agents/mcp-presets.agent.md
    prompt: Lista todos los presets MCP disponibles con su metadata.
    send: false
  - label: Exportar preset
    agent: .github/plugins/mcp-presets/agents/mcp-presets.agent.md
    prompt: Exporta presets en formato JSON compatible con Zeus.
    send: false
  - label: Asignar preset a agente
    agent: .github/plugins/mcp-presets/agents/mcp-presets.agent.md
    prompt: Vincula un preset MCP con un agente creado en AGENT_CREATOR.
    send: false
  - label: Arrancar MCP Server de presets
    agent: plugin_ox_mcppresets
    prompt: Inicia el PresetsMCPServer en puerto 3067 para exponer tools de gestión de presets a Copilot Chat.
    send: false
  - label: Consultar arquitectura MCP
    agent: plugin_ox_mcppresets
    prompt: Explica el patrón BaseMCPServer y cómo se integra con VS Code Copilot.
    send: false
---

# Plugin Ox: MCP-Presets

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/mcp-presets/agents/`.

---

## Descripción

Este bridge proporciona acceso al plugin **MCP-Presets**, que permite gestionar presets del Model Context Protocol:

- **Importar** presets desde archivos JSON
- **Listar** presets disponibles en el Scriptorium
- **Exportar** presets en formato Zeus-compatible
- **Asignar** presets a agentes de AGENT_CREATOR
- **Arrancar** MCP Server para exponer tools a Copilot Chat

---

## Arquitectura MCP (Patrón Aprendido)

> **Fuente**: [08_Formacion_McpPresets_MCP_Server.md](../ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_29_TypedPrompting_ContextManager/08_Formacion_McpPresets_MCP_Server.md)

```
MCPGallery/
├── mcp-core-sdk/              # Submódulo con BaseMCPServer
│   └── src/server/
│       └── BaseMCPServer.ts   # Usa @modelcontextprotocol/sdk
└── src/
    └── presets-mcp-server.ts  # Extiende BaseMCPServer (puerto 3067)
```

**Configuración VS Code** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "mcp-presets": {
      "type": "http",
      "url": "http://localhost:3067"
    }
  }
}
```

**Tools expuestas al LLM**:
| Tool | Descripción |
|------|-------------|
| `list_presets` | Lista todos los presets disponibles |
| `activate_preset` | Activa un preset para la sesión |
| `get_preset_tools` | Obtiene tools de un preset específico |

**Resources expuestos**:
| Resource | Descripción |
|----------|-------------|
| `catalog://presets` | Catálogo completo de presets |
| `catalog://assignments` | Mapeo agente→presets |

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| McpPresets | `agents/mcp-presets.agent.md` | Agente principal para gestión de presets |

---

## Operaciones Disponibles

| Operación | Descripción |
|-----------|-------------|
| `importar` | Importa preset desde JSON |
| `listar` | Lista presets con metadata |
| `exportar` | Genera JSON Zeus-compatible |
| `asignar` | Vincula preset con agente |
| `desasignar` | Elimina vinculación |
| `arrancar-server` | Inicia PresetsMCPServer:3067 |

---

## Datos del Plugin

| Ubicación | Contenido |
|-----------|-----------|
| `ARCHIVO/PLUGINS/MCP_PRESETS/presets/` | Presets importados |
| `ARCHIVO/PLUGINS/MCP_PRESETS/catalog.json` | Catálogo de servidores MCP |
| `ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json` | Mapeo agente → presets |

---

## Referencia

- Manifest: `.github/plugins/mcp-presets/manifest.md`
- Agentes: `.github/plugins/mcp-presets/agents/`
- Instrucciones: `.github/plugins/mcp-presets/instructions/mcp-presets.instructions.md`
- Patrón base: `NovelistEditor/mcp-core-sdk/src/server/BaseMCPServer.ts`
- Formación: `ARCHIVO/DISCO/BACKLOG_BORRADORES/.../08_Formacion_McpPresets_MCP_Server.md`
