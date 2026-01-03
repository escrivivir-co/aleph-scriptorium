---
name: plugin_ox_prologeditor
description: "Bridge: conecta VS Code con agentes del plugin PrologEditor para lógica declarativa, sistemas IoT/SBR y modelado de inteligencias situadas (aferencia/eferencia)."
argument-hint: "Invoca capacidades de edición Prolog, ejecución SWI-Prolog, MCP Prompts, o modelado de sistemas IoT con paradigma SBR."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'copilot-logs-mcp-server/*', 'prolog-mcp-server/*', 'playwright/*', 'agent', 'todo']

# Conocimiento Estructural (protocolo plugin_ox_*)
# - Código del plugin: .github/plugins/prolog-editor/
# - Datos y configuración: ARCHIVO/PLUGINS/PROLOG_EDITOR/
# - Submódulo fuente: PrologEditor/ (iot-sbr-logica-para-bots)
# - Gestor de estructura: @plugin-manager
# - Documentación de sesiones: ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA/
# - MCP Server: prolog-mcp-server (puerto 3006)
# - Pack: AgentPrologBrain.pack.json v3.0.0 (12 tools, 6 resources, 8 prompts)

handoffs:
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
  # === MCP Prompts (v3.0.0) ===
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

> Agente bridge que conecta VS Code con `.github/plugins/prolog-editor/agents/`.

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| PrologEditor | `agents/prolog-editor.agent.md` | Editor y asistente de programación lógica Prolog |

---

## Capacidades

### Templates
- Crear templates Prolog asistidos
- Listar templates disponibles
- Importar reglas .pl

### Ejecución
- Ejecutar consultas Prolog (requiere SWI-Prolog)
- Validar sintaxis

### Integraciones
- Exportar Blockly → Prolog
- Asignar reglas a agentes (AGENT_CREATOR)
- Condiciones en estadios (ARG_BOARD)

### MCP Prompts (v3.0.0)

| Prompt | Descripción | Tools Orquestadas |
|--------|-------------|-------------------|
| `session_lifecycle` | Gestión de sesiones | create, list, destroy |
| `load_knowledge_base` | Carga de conocimiento | consult_file, load_rules_from_db |
| `interactive_query` | Consultas interactivas | query |
| `persist_rule` | Persistencia | assert_fact, save_rule_to_db |
| `use_sdk_template` | Templates SDK | list_sdk_templates, get_sdk_template_content |
| `telemetry_check` | Estado IoT | get_telemetry_status |
| `razonamiento_sbr` | SBR | query, load_rules, telemetry |
| `teatro_agent_session` | Workflow E2E | Todos |

---

## MCP Server

- **ID**: prolog-mcp-server
- **Puerto**: 3006
- **Pack**: AgentPrologBrain.pack.json v3.0.0
- **Capacidades**: 12 tools, 6 resources, 8 prompts

---

## Referencia

- Manifest: `.github/plugins/prolog-editor/manifest.md`
- Agentes: `.github/plugins/prolog-editor/agents/`
- Prompts: `.github/plugins/prolog-editor/prompts/`
- Instructions: `.github/plugins/prolog-editor/instructions/`
- Submódulo: `iot-sbr-logica-para-bots/`

