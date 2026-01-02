---
name: plugin_ox_prologeditor
description: "Bridge: conecta VS Code con agentes del plugin PrologEditor para lógica declarativa, sistemas IoT/SBR y modelado de inteligencias situadas (aferencia/eferencia)."
argument-hint: "Invoca capacidades de edición Prolog, ejecución SWI-Prolog, o modelado de sistemas IoT con paradigma SBR."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'playwright/*', 'agent', 'copilot-logs-mcp-server/*', 'todo']

# Conocimiento Estructural (protocolo plugin_ox_*)
# - Código del plugin: .github/plugins/prolog-editor/
# - Datos y configuración: ARCHIVO/PLUGINS/PROLOG_EDITOR/
# - Submódulo fuente: PrologEditor/ (iot-sbr-logica-para-bots)
# - Gestor de estructura: @plugin-manager
# - Documentación de sesiones: ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA/

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

---

## Referencia

- Manifest: `.github/plugins/prolog-editor/manifest.md`
- Agentes: `.github/plugins/prolog-editor/agents/`
- Prompts: `.github/plugins/prolog-editor/prompts/`
- Instructions: `.github/plugins/prolog-editor/instructions/`
- Submódulo: `iot-sbr-logica-para-bots/`

