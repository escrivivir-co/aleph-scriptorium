---
name: plugin_ox_mcppresets
description: "Bridge: conecta VS Code con el agente McpPresets del plugin mcp-presets. Ver .github/plugins/mcp-presets/"
argument-hint: "Gestiona presets MCP: importar, listar, exportar, asignar a agentes."
tools: ['agent']
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
- Submódulo: `alephscript-mcp-presets-site/` (rama `integration/beta/scriptorium`)
