---
id: prolog-editor
name: "Stack MCP Prolog"
version: "2.0.1"
description: "Stack completo de 4 capas: UI Angular + Backend REST + MCP Server (12 tools, 6 resources, 8 prompts). Razonamiento lógico, IoT/SBR, Teatro."
author: "Aleph Scriptorium"
license: "MIT"

scriptorium_version: ">=1.0.0"

# ============================================
# PREREQUISITOS DEL SISTEMA OPERATIVO
# ============================================
# IMPORTANTE: SWI-Prolog debe estar instalado antes de usar este plugin.
# El health check (scripts/apb-health-check.sh) verificará este prerequisito.
systemPrerequisites:
  - name: "SWI-Prolog"
    binary: "swipl"
    required: true
    install:
      macOS: "brew install swi-prolog"
      Windows: "winget install SWI-Prolog.SWI-Prolog"
      Linux-Debian: "sudo apt install swi-prolog"
      Linux-Fedora: "sudo dnf install pl"
    verify:
      macOS: "which swipl"
      Windows: "where swipl"
      Linux: "which swipl"
    documentation: "https://www.swi-prolog.org/download/stable"

dependencies: []
optional_dependencies:
  - blockly-editor
  - agent-creator
  - arg-board
  - teatro
  - mcp-presets

# MCP Server Configuration
mcpServers:
  - id: "prolog-mcp-server"
    port: 3006
    source: "MCPGallery/mcp-mesh-sdk"
    startCommand: "npm run start:launcher"
    description: "MCP Prolog Server - 12 tools, 6 resources, 8 prompts"
    pack: "AgentPrologBrain.pack.json"

agents:
  - name: "PrologEditor"
    file: "agents/prolog-editor.agent.md"
    description: "Agente principal para gestión del Stack MCP Prolog (4 capas alineadas)"

prompts:
  - name: "crear-template-prolog"
    file: "prompts/crear-template-prolog.prompt.md"
    description: "Crear un nuevo template Prolog asistido"
  - name: "ejecutar-consulta"
    file: "prompts/ejecutar-consulta.prompt.md"
    description: "Ejecutar consulta Prolog contra motor SWI-Prolog"
  - name: "listar-templates"
    file: "prompts/listar-templates.prompt.md"
    description: "Listar templates disponibles"
  - name: "importar-reglas"
    file: "prompts/importar-reglas.prompt.md"
    description: "Importar archivo .pl al repositorio de reglas"
  - name: "exportar-blockly-prolog"
    file: "prompts/exportar-blockly-prolog.prompt.md"
    description: "Transpilar rutina Blockly a código Prolog"

# MCP Prompts (orquestados por el server)
mcpPrompts:
  - id: "session_lifecycle"
    description: "Gestión de ciclo de vida de sesiones"
    tools: ["create_session", "list_sessions", "destroy_session"]
  - id: "load_knowledge_base"
    description: "Carga de conocimiento Prolog"
    tools: ["consult_file", "load_rules_from_db"]
  - id: "interactive_query"
    description: "Consultas interactivas con contexto"
    tools: ["query"]
  - id: "persist_rule"
    description: "Persistencia de reglas"
    tools: ["assert_fact", "save_rule_to_db"]
  - id: "use_sdk_template"
    description: "Exploración de templates SDK"
    tools: ["list_sdk_templates", "get_sdk_template_content"]
  - id: "telemetry_check"
    description: "Monitoreo IoT"
    tools: ["get_telemetry_status"]
  - id: "razonamiento_sbr"
    description: "Sensor-Based Reasoning"
    tools: ["query", "load_rules_from_db", "get_telemetry_status"]
  - id: "teatro_agent_session"
    description: "Workflow E2E Teatro"
    tools: ["all"]

instructions:
  - name: "prolog-editor"
    file: "instructions/prolog-editor.instructions.md"

handoffs:
  - label: "🚀 Levantar Stack"
    agent: "PrologEditor"
    prompt: "Levanta las 3 capas: MCP (3006), Backend (8000), Frontend (5001)."
  - label: "🔍 Verificar Alineamiento"
    agent: "PrologEditor"
    prompt: "Verifica que las 12 tools están alineadas en las 4 capas."
  - label: "Crear template Prolog"
    agent: "PrologEditor"
    prompt: "Genera un nuevo template Prolog con predicados para el dominio especificado."
  - label: "Ejecutar consulta Prolog"
    agent: "PrologEditor"
    prompt: "Ejecuta una consulta Prolog usando el motor SWI-Prolog."
  - label: "Exportar Blockly a Prolog"
    agent: "PrologEditor"
    prompt: "Transpila una rutina Blockly a código Prolog equivalente."
  - label: "Listar templates"
    agent: "PrologEditor"
    prompt: "Lista los templates Prolog disponibles en el sistema."
  - label: "Importar reglas .pl"
    agent: "PrologEditor"
    prompt: "Importa un archivo .pl al repositorio de reglas del Scriptorium."
  - label: "🧠 Crear Brain Teatro"
    agent: "PrologEditor"
    prompt: "Genera un archivo .brain.pl para un personaje de Teatro."
---

# Plugin: Stack MCP Prolog

## Arquitectura de 4 Capas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STACK MCP PROLOG v2.0.0                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  CAPA 1: UI Angular (:5001)          CAPA 2: Backend REST (:8000)           │
│  └── 7 componentes                   └── 12 endpoints                       │
│                                                                             │
│  CAPA 3: MCP Server (:3006)          CAPA 4: SDK Core (tipos)               │
│  └── 12 tools + 6 res + 8 prompts    └── Tipos DRY 100%                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Capacidades

| Capa | Componentes | Estado |
|------|-------------|--------|
| UI Angular | 7 componentes (Sessions, Editor, Knowledge, Templates, Telemetry, Brain) | ✅ 100% |
| Backend REST | 12 endpoints alineados | ✅ 100% |
| MCP Server | 12 tools, 6 resources, 8 prompts | ✅ 100% |
| SDK Core | Tipos DRY compartidos | ✅ 100% |

## Propósito

Stack completo para razonamiento lógico con Prolog:

1. **UI Angular**: Gestión visual de sesiones, reglas, templates y brains
2. **Backend REST**: API Express con SQLite y MCPPrologClient
3. **MCP Server**: Motor SWI-Prolog expuesto como herramientas MCP
4. **SDK Core**: Tipos TypeScript compartidos (PrologSession, QueryResponse, etc.)

## Perfil de Usuario

| Actor | Usa | Tab/Protocolo |
|-------|-----|---------------|
| Developer | UI Angular | Sessions, Editor, Knowledge |
| IoT Engineer | Telemetría | Telemetry |
| Dramaturgo | Brain Editor | 🧠 Brain |
| Agente IA | MCP Protocol | Tools + Resources |

## Requisitos del Sistema

### Obligatorios
- Node.js 18+
- SWI-Prolog 9.x en PATH (`swipl --version`)

### Componentes
- `PrologEditor/frontend/` — Angular 17+
- `PrologEditor/backend/` — Express + SQLite
- `MCPGallery/mcp-mesh-sdk/` — MCP Servers
- `MCPGallery/mcp-core-sdk/` — Tipos compartidos

## Setup

### VS Code Tasks (Recomendado)

```
Ctrl+Shift+B → APB: Start Full Stack
```

### Manual

```bash
# Terminal 1: MCP
cd MCPGallery/mcp-mesh-sdk && npm run start:launcher

# Terminal 2: Backend
cd PrologEditor/backend && npm run start:dev

# Terminal 3: Frontend
cd PrologEditor/frontend && npm start
```

## Integraciones

| Plugin | Integración |
|--------|-------------|
| BlocklyEditor | Exportar rutinas visuales a código Prolog |
| AGENT_CREATOR | Campo `prologRules` en recetas |
| Teatro | Brains `.brain.pl` para personajes |
| mcp-presets | Pack AgentPrologBrain.pack.json |

## Templates MCP

| Template | Descripción |
|----------|-------------|
| `state-machine` | FSM model checker |
| `iot-app` | IoT event logic |
| `simu` | Simulation rules |

## Submódulos

| Directorio | Contenido |
|------------|-----------|
| `PrologEditor/` | Frontend Angular + Backend Express |
| `MCPGallery/` | SDK Core + MCP Mesh (servers) |

## Referencia

- **Guía Arquitectura**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md`
- **OpenAPI Spec**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml`
- **Use Cases**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-*.yaml`
- **Pack MCP**: `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json`

