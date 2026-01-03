---
name: plugin_ox_prologeditor
description: "Bridge: Stack MCP Prolog completo (12 tools, 6 resources, 8 prompts). UI Angular + Backend REST + MCP Server. Lógica declarativa, IoT/SBR, Teatro."
argument-hint: "Setup stack, ejecutar Prolog, gestionar sesiones MCP, o modelar sistemas IoT con paradigma SBR."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'copilot-logs-mcp-server/*', 'prolog-mcp-server/*', 'playwright/*', 'agent', 'todo']

# ═══════════════════════════════════════════════════════════════════════════
# CONOCIMIENTO ESTRUCTURAL — Stack MCP Prolog v2.0.0
# ═══════════════════════════════════════════════════════════════════════════
#
# ARQUITECTURA DE 4 CAPAS:
# ┌─────────────────────────────────────────────────────────────────────────┐
# │  CAPA 1: UI Angular (puerto 5001)                                       │
# │  └── PrologEditor/frontend/src/app/                                     │
# │      └── 7 componentes: Sessions, Editor, Knowledge, Templates,         │
# │          Telemetry, BrainEditor, UserAppDialog                          │
# ├─────────────────────────────────────────────────────────────────────────┤
# │  CAPA 2: Backend REST (puerto 8000)                                     │
# │  └── PrologEditor/backend/src/                                          │
# │      └── 12 endpoints alineados con MCP tools                           │
# ├─────────────────────────────────────────────────────────────────────────┤
# │  CAPA 3: MCP Server (puerto 3006)                                       │
# │  └── MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts                     │
# │      └── 12 tools + 6 resources + 8 prompts                             │
# ├─────────────────────────────────────────────────────────────────────────┤
# │  CAPA 4: SDK Core (tipos compartidos)                                   │
# │  └── MCPGallery/mcp-core-sdk/src/types/                                 │
# │      └── Tipos DRY 100%: PrologSession, QueryResponse, etc.             │
# └─────────────────────────────────────────────────────────────────────────┘
#
# PUERTOS ESTÁNDAR:
#   - Frontend Angular: 5001
#   - Backend REST:     8000  
#   - MCP Prolog:       3006
#   - MCP Launcher:     3050
#
# UBICACIONES:
#   - Plugin code:      .github/plugins/prolog-editor/
#   - Plugin data:      ARCHIVO/PLUGINS/PROLOG_EDITOR/
#   - Submódulo UI+BE:  PrologEditor/
#   - Submódulo MCP:    MCPGallery/mcp-mesh-sdk/
#   - SDK tipos:        MCPGallery/mcp-core-sdk/
#   - Guía arquitectura: ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md
#   - Pack MCP:         .github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json v3.0.0
#   - VS Code Tasks:    .vscode/tasks.json (prefijo APB:)
#

handoffs:
  # ═══════════════════════════════════════════════════════════════════════
  # SETUP & DIAGNOSTICS (UC-OX-*)
  # ═══════════════════════════════════════════════════════════════════════
  - label: 🚀 Levantar Stack Completo (APB)
    agent: plugin_ox_prologeditor
    prompt: |
      Levanta el stack MCP Prolog completo usando VS Code Tasks (prefijo APB:).
      1. Terminal MCP: cd MCPGallery/mcp-mesh-sdk && npm run start:launcher
      2. Terminal Backend: cd PrologEditor/backend && npm run start:dev
      3. Terminal Frontend: cd PrologEditor/frontend && npm start
      Verificar puertos: 3006, 8000, 5001 activos.
    send: false
  - label: 🔍 Verificar Stack (Healthcheck)
    agent: plugin_ox_prologeditor
    prompt: |
      Ejecuta healthcheck del stack:
      - curl http://localhost:3006/tools (MCP: 12 tools)
      - curl http://localhost:8000/api/sessions (Backend)
      - curl http://localhost:5001 (Frontend Angular)
    send: false
  - label: 📋 Ver Guía de Arquitectura
    agent: plugin_ox_prologeditor
    prompt: Lee la guía completa de arquitectura en ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md
    send: false
  # ═══════════════════════════════════════════════════════════════════════
  # AGENTE PRINCIPAL
  # ═══════════════════════════════════════════════════════════════════════
  - label: Listar agentes de PrologEditor
    agent: plugin_ox_prologeditor
    prompt: Lista agentes disponibles en el plugin prolog-editor.
    send: false
  - label: Crear template Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Genera un nuevo template Prolog con predicados para el dominio especificado.
    send: false
  - label: Ejecutar consulta Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Ejecuta una consulta Prolog usando el motor SWI-Prolog del submódulo.
    send: false
  - label: Exportar Blockly a Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Transpila una rutina Blockly (JavaScript) a código Prolog equivalente.
    send: false
  - label: Listar templates disponibles
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Lista los templates Prolog disponibles en el sistema.
    send: false
  - label: Importar reglas Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Importa un archivo .pl al repositorio de reglas del Scriptorium.
    send: false
  - label: Asignar reglas a agente
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Añade el campo prologRules a una receta de agente.
    send: false
  - label: Condición Prolog en estadio
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Añade una condición Prolog a un estadio de obra en ARG_BOARD.
    send: false
  # ═══════════════════════════════════════════════════════════════════════
  # MCP PROMPTS (v3.0.0) - 8 Workflows Orquestados
  # ═══════════════════════════════════════════════════════════════════════
  - label: 🔄 Gestionar sesión Prolog
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'session_lifecycle' para crear, listar o destruir una sesión Prolog. Acciones disponibles: create (requiere sessionId y obraId), list, destroy (requiere sessionId)."
    send: false
  - label: 📚 Cargar base de conocimiento
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'load_knowledge_base' para cargar conocimiento Prolog. Fuentes: 'file' (requiere path a .pl) o 'database' (carga reglas de SQLite, opcionalmente filtradas por app)."
    send: false
  - label: 🔍 Consulta interactiva Prolog
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'interactive_query' para ejecutar consultas Prolog con contexto de sesión activa. Tipos: simple, findall, aggregate."
    send: false
  - label: 💾 Persistir regla
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'persist_rule' para guardar reglas Prolog. Destinos: 'session' (temporal, usa assert_fact) o 'database' (permanente en SQLite)."
    send: false
  - label: 📋 Usar template SDK
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'use_sdk_template' para explorar y aplicar templates Prolog del SDK. Acciones: 'list' (ver catálogo) o 'get' (obtener contenido de un template)."
    send: false
  - label: 📡 Verificar telemetría IoT
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'telemetry_check' para consultar el estado actual de telemetría y sensores IoT del backend."
    send: false
  - label: 🧠 Razonamiento SBR
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'razonamiento_sbr' para ejecutar razonamiento basado en sensores (Sensor-Based Reasoning). Requiere sessionId con reglas SBR cargadas y un objetivo de inferencia."
    send: false
  - label: 🎭 Sesión agente Teatro (E2E)
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'teatro_agent_session' para iniciar un workflow E2E completo de agente Teatro con razonamiento Prolog. Requiere obraId y agentName."
    send: false
---

# Plugin Ox: PrologEditor

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Bridge para el **Stack MCP Prolog completo**: UI Angular + Backend REST + MCP Server con 12 tools alineadas.

---

## 1. Arquitectura del Stack (4 Capas)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STACK MCP PROLOG v2.0.0                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐             │
│  │ UI Angular    │ ──► │ Backend REST  │ ──► │ MCP Server    │             │
│  │ :5001         │     │ :8000         │     │ :3006         │             │
│  │ 7 components  │     │ 12 endpoints  │     │ 12 tools      │             │
│  └───────────────┘     └───────────────┘     └───────────────┘             │
│         │                     │                     │                       │
│         └─────────────────────┼─────────────────────┘                       │
│                               │                                             │
│                      ┌────────▼────────┐                                    │
│                      │  mcp-core-sdk   │ ← Tipos DRY 100%                   │
│                      └─────────────────┘                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Puertos

| Servicio | Puerto | Directorio |
|----------|--------|------------|
| Frontend Angular | **5001** | `PrologEditor/frontend/` |
| Backend REST | **8000** | `PrologEditor/backend/` |
| MCP Prolog Server | **3006** | `MCPGallery/mcp-mesh-sdk/` |
| MCP Launcher | 3050 | `MCPGallery/mcp-mesh-sdk/` |

---

## 2. Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| PrologEditor | `agents/prolog-editor.agent.md` | Editor y asistente de programación lógica Prolog |

---

## 3. Matriz de Alineamiento (12 Tools)

### Tools Core (7) - Motor SWI-Prolog

| Tool MCP | Endpoint REST | UI Component |
|----------|---------------|--------------|
| `prolog_create_session` | `POST /sessions` | ✅ SessionManager |
| `prolog_list_sessions` | `GET /sessions` | ✅ SessionManager |
| `prolog_destroy_session` | `DELETE /sessions/:id` | ✅ SessionManager |
| `prolog_query` | `POST /run-rule` | ✅ RuleEditor |
| `prolog_assert_fact` | `POST /assert` | ✅ KnowledgeBase |
| `prolog_consult_file` | `POST /consult` | ✅ KnowledgeBase |
| `prolog_get_templates` | `GET /mcp-templates` | ✅ McpTemplatesBrowser |

### Tools Backend-Integrated (5) - SQLite via HTTP

| Tool MCP | Endpoint REST | UI Component |
|----------|---------------|--------------|
| `prolog_load_rules_from_db` | `GET /rules` | ✅ RuleList |
| `prolog_save_rule_to_db` | `POST /rules` | ✅ RuleEditor |
| `prolog_list_sdk_templates` | `GET /sdk-templates` | ✅ RuleEditor (dropdown) |
| `prolog_get_sdk_template_content` | `GET /template/:name` | ✅ RuleEditor |
| `prolog_get_telemetry_status` | `GET /telemetry/status` | ✅ TelemetryMonitor |

---

## 4. MCP Prompts (8 Workflows)

| Prompt | Propósito | Tools Orquestadas |
|--------|-----------|-------------------|
| `session_lifecycle` | Gestión de sesiones | create, list, destroy |
| `load_knowledge_base` | Carga de conocimiento | consult_file, load_rules_from_db |
| `interactive_query` | Consultas interactivas | query |
| `persist_rule` | Persistencia | assert_fact, save_rule_to_db |
| `use_sdk_template` | Templates SDK | list_sdk_templates, get_sdk_template_content |
| `telemetry_check` | Estado IoT | get_telemetry_status |
| `razonamiento_sbr` | SBR | query, load_rules, telemetry |
| `teatro_agent_session` | Workflow E2E Teatro | **Todos** |

---

## 5. MCP Resources (6)

| Resource | URI |
|----------|-----|
| `prolog-session-state` | `prolog://sessions/current` |
| `prolog-templates-catalog` | `prolog://templates/catalog` |
| `prolog-active-sessions` | `prolog://sessions` |
| `prolog-rules-catalog` | `prolog://rules/catalog` |
| `prolog-sdk-templates` | `prolog://sdk/templates` |
| `prolog-telemetry` | `prolog://telemetry/current` |

---

## 6. Componentes UI (7)

| Componente | Tab | Funcionalidad |
|------------|-----|---------------|
| SessionManagerComponent | Sessions | Crear/listar/destruir sesiones |
| RuleEditorComponent | Editor | Escribir/ejecutar reglas |
| KnowledgeBaseComponent | Knowledge | Assert facts, consult files |
| McpTemplatesBrowserComponent | Templates | Explorar catálogo MCP |
| TelemetryProcessComponent | Telemetry | Testing IoT |
| BrainEditorComponent | 🧠 Brain Editor | Generar `.brain.pl` para Teatro |
| UserAppSaveDialogComponent | (Modal) | Guardar apps de usuario |

---

## 7. Setup del Stack

### Opción A: VS Code Tasks

1. `Ctrl+Shift+P` → "Tasks: Run Task"
2. Seleccionar `APB: Start Full Stack`

### Opción B: Terminales Manuales

```bash
# Terminal 1: MCP Servers
cd MCPGallery/mcp-mesh-sdk && npm run start:launcher

# Terminal 2: Backend
cd PrologEditor/backend && npm run start:dev

# Terminal 3: Frontend
cd PrologEditor/frontend && npm start
```

### Verificación

```bash
curl http://localhost:3006/tools    # 12 tools
curl http://localhost:8000/api/sessions  # {}
curl http://localhost:5001          # HTML Angular
```

---

## 8. Referencia

| Recurso | Ubicación |
|---------|-----------|
| Guía Arquitectura | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md` |
| Manifest Plugin | `.github/plugins/prolog-editor/manifest.md` |
| Pack MCP | `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` |
| OpenAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` |
| Use Cases | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-*.yaml` |

