---
name: plugin_ox_mcppresets
description: "Bridge: Gateway al ecosistema MCPGallery. Gestiona la mesh de servidores MCP, presets, Zeus UI y orquestación vía Launcher."
argument-hint: "Gestiona MCPGallery: arrancar mesh/model/zeus, consultar catálogo, crear presets, orquestar servidores."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'copilot-logs-mcp-server/*', 'prolog-mcp-server/*', 'playwright/*', 'agent', 'todo']
handoffs:
  # === ARRANQUE DE SERVIDORES ===
  - label: "🚀 Arrancar DevOps Server (mesh:3003)"
    agent: plugin_ox_mcppresets
    prompt: "Arranca el DevOps MCP Server en puerto 3003: cd MCPGallery/mcp-mesh-sdk && npm start"
    send: false
  - label: "🚀 Arrancar Preset Service (model:4001)"
    agent: plugin_ox_mcppresets
    prompt: "Arranca el Preset Service REST en puerto 4001: cd MCPGallery/mcp-model-sdk && npm start"
    send: false
  - label: "🚀 Arrancar Zeus UI (zeus:3012)"
    agent: plugin_ox_mcppresets
    prompt: "Arranca la UI de gestión Zeus en puerto 3012: cd MCPGallery/zeus && npm start"
    send: false
  - label: "🚀 Arrancar Launcher (orquestador:3050)"
    agent: plugin_ox_mcppresets
    prompt: "Arranca el MCPLauncherServer en puerto 3050: cd MCPGallery/mcp-mesh-sdk && npm run start:launcher"
    send: false
  - label: "🚀 Arrancar todo el ecosistema"
    agent: plugin_ox_mcppresets
    prompt: "Arranca mesh + model + zeus en paralelo: cd MCPGallery && npm run start:all"
    send: false
  # === CONSULTAS ===
  - label: "📡 Consultar catálogo MCP vía Zeus"
    agent: plugin_ox_mcppresets
    prompt: "Obtén el catálogo de servidores MCP activos desde Zeus: curl http://localhost:3012/api/catalog"
    send: false
  - label: "📋 Listar presets disponibles"
    agent: plugin_ox_mcppresets
    prompt: "Lista todos los presets guardados: curl http://localhost:4001/ai/ui/mcp/presets"
    send: false
  - label: "🔍 Ver estado de servidores"
    agent: plugin_ox_mcppresets
    prompt: "Verifica qué servidores están activos en la mesh: cd MCPGallery && npm run status"
    send: false
  # === GESTIÓN DE PRESETS ===
  - label: "➕ Crear nuevo preset"
    agent: plugin_ox_mcppresets
    prompt: "Crea un preset MCP con nombre, descripción y lista de tools seleccionadas."
    send: false
  - label: "📤 Exportar preset a JSON"
    agent: plugin_ox_mcppresets
    prompt: "Exporta un preset en formato JSON compatible con Zeus/mcp.json."
    send: false
  - label: "🔗 Asignar preset a agente"
    agent: plugin_ox_mcppresets
    prompt: "Vincula un preset con un agente de AGENT_CREATOR para que use sus tools."
    send: false
  # === ORQUESTACIÓN (via Launcher) ===
  - label: "🎛️ Launcher: Arrancar servidor por ID"
    agent: plugin_ox_mcppresets
    prompt: "Usa la tool launch_mcp_server del Launcher para arrancar un servidor específico por su ID."
    send: false
  - label: "🎛️ Launcher: Arrancar todos los servidores"
    agent: plugin_ox_mcppresets
    prompt: "Usa la tool launch_all_servers del Launcher para arrancar XPlus1 + Wiki."
    send: false
  - label: "🎛️ Launcher: Generar mcp.json dinámico"
    agent: plugin_ox_mcppresets
    prompt: "Usa la tool generate_vscode_mcp_config del Launcher para generar .vscode/mcp.json con los servidores activos."
    send: false
  # === DOCUMENTACIÓN ===
  - label: "📖 Ver arquitectura MCPGallery"
    agent: plugin_ox_mcppresets
    prompt: "Muestra la arquitectura del ecosistema MCPGallery y cómo se integra con el Scriptorium."
    send: false
  - label: "📖 Ver README de submódulo"
    agent: plugin_ox_mcppresets
    prompt: "Lee el README-SCRIPTORIUM.md de un submódulo específico (mesh/model/core/zeus)."
    send: false
---

# Plugin Ox: MCP-Presets (Gateway MCPGallery)

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Gateway al ecosistema **MCPGallery**: mesh de servidores, presets, Zeus UI y orquestación.

---

## 🎯 Descripción

Este bridge proporciona acceso completo al ecosistema MCPGallery v0.1.0:

| Componente | Puerto | Función |
|------------|--------|---------|
| **mcp-mesh-sdk** | 3003 | DevOps Server (MCP real) |
| **mcp-model-sdk** | 4001 | Preset Service (REST) |
| **zeus** | 3012 | UI de gestión (catálogo) |
| **Launcher** | 3050 | Orquestador de servidores |

---

## 🗺️ Arquitectura MCPGallery

> **Fuente**: [MCPGallery/README-SCRIPTORIUM.md](../../MCPGallery/README-SCRIPTORIUM.md)

```
MCPGallery/ (v0.1.0)
├── mcp-core-sdk/     # v1.0.0 - BaseMCPServer (biblioteca base)
├── mcp-mesh-sdk/     # v1.0.0 - Servidores MCP reales
│   ├── DevOpsServer        → :3003 (npm start)
│   ├── MCPLauncherServer   → :3050 (npm run start:launcher)
│   ├── MCPWikiBrowserServer → :3002 (npm run start:wiki)
│   └── MCPStateMachineServer → :3004 (npm run start:state)
├── mcp-model-sdk/    # v1.0.0 - Preset Service REST
│   └── preset_service.mjs  → :4001 (npm start)
└── zeus/             # v0.1.0 - UI de gestión
    └── server/             → :3012 (npm start)
```

---

## 🚀 Arranque Rápido

```bash
# Opción 1: Todo el ecosistema
cd MCPGallery && npm run start:all

# Opción 2: Solo lo esencial
cd MCPGallery/mcp-mesh-sdk && npm start  # DevOps :3003
```

---

## 📡 Servidores en `.vscode/mcp.json`

Los servidores MCP están registrados para VS Code Copilot:

| Servidor | Puerto | ID en mcp.json |
|----------|--------|----------------|
| DevOps | 3003 | `devops-mcp-server` |
| Launcher | 3050 | `launcher-server` |
| Wiki | 3002 | `wiki-browser-server` |
| StateMachine | 3004 | `state-machine-server` |

---

## 🎛️ Tools del Launcher (Orquestador)

| Tool | Descripción |
|------|-------------|
| `launch_mcp_server` | Arranca servidor por ID |
| `stop_mcp_server` | Detiene servidor |
| `get_server_status` | Estado de servidores |
| `launch_all_servers` | Arranca XPlus1 + Wiki |
| `generate_vscode_mcp_config` | Genera mcp.json dinámico |

---

## 📋 Operaciones Disponibles

| Categoría | Operaciones |
|-----------|-------------|
| **Arranque** | mesh, model, zeus, launcher, all |
| **Consulta** | catálogo, presets, status |
| **Presets** | crear, exportar, asignar |
| **Orquestación** | launch, stop, restart, status |
| **Documentación** | arquitectura, READMEs |

---

## 📁 Datos del Plugin

| Ubicación | Contenido |
|-----------|-----------|
| `MCPGallery/` | Ecosistema de servidores MCP |
| `ARCHIVO/PLUGINS/MCP_PRESETS/` | Presets importados |
| `.vscode/mcp.json` | Registro de servidores |

---

## 📖 Referencias

| Recurso | Ubicación |
|---------|-----------|
| MCPGallery README | `MCPGallery/README-SCRIPTORIUM.md` |
| Mesh README | `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` |
| Model README | `MCPGallery/mcp-model-sdk/README-SCRIPTORIUM.md` |
| Core README | `MCPGallery/mcp-core-sdk/README-SCRIPTORIUM.md` |
| Zeus README | `MCPGallery/zeus/README-SCRIPTORIUM.md` |
| Formación | `ARCHIVO/DISCO/.../08_Formacion_McpPresets_MCP_Server.md` |
| Integración | `ARCHIVO/DISCO/.../09_Integracion_MCPGallery_Servidores.md` |
