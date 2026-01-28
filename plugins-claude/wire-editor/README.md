# wire-editor (Claude Code Plugin v2.0.0)

Visual flow editing with Node-RED wiring and Blockly transpilation for the Aleph Scriptorium.

## Overview

WireEditor is the **visual data wiring** plugin for the Scriptorium. It uses the Node-RED metaphor: nodes connected by wires that transform and route information. It operates primarily on **files**, enabling offline design, Git versioning, and template sharing.

## Plugin Structure

```
plugins-claude/wire-editor/
├── .claude-plugin/plugin.json
├── README.md
├── agents/wire-editor.md
└── skills/
    ├── manage-flows.md           # Create/edit/import/export Node-RED flows
    ├── wire-mcp-integration.md   # Async feed communication between flows and agents
    └── blockly-transpilation.md  # Blockly-to-Node-RED conceptual bridge
```

## Migration Mapping (Copilot to Claude Code)

| Copilot (v1) | Claude Code (v2) | Type |
|-------------|------------------|------|
| `agents/wire-editor.agent.md` | `agents/wire-editor.md` | Agent |
| `prompts/crear-proyecto.prompt.md` | `skills/manage-flows.md` | Skill (merged) |
| `prompts/importar-flow.prompt.md` | `skills/manage-flows.md` | Skill (merged) |
| `prompts/exportar-flow.prompt.md` | `skills/manage-flows.md` | Skill (merged) |
| `prompts/asesorar-nodos.prompt.md` | `agents/wire-editor.md` (decision table) | Agent context |
| `prompts/conectar-feed.prompt.md` | `skills/wire-mcp-integration.md` | Skill |
| `instructions/wire-editor.instructions.md` | `agents/wire-editor.md` (merged) | Agent context |
| _(new)_ | `skills/blockly-transpilation.md` | Skill |

## Data Directory

```
ARCHIVO/DISCO/WIRING/
├── catalog.json           # Master artifact index
├── feeds/                 # Async JSON feeds
├── projects/              # Projects by use case
└── templates/             # Reusable flow/subflow/node templates
```

## Source Submodule

- **Repository**: `node-red-alephscript-sdk`
- **Packages**: `node-red-contrib-alephscript` (13 nodes), `node-red-gamify-ui` (Angular 17+)

## Dependencies

| Plugin | Relationship |
|--------|-------------|
| Teatro | Characters use flows for scene logic |
| Agent Creator | Agents consume/produce feeds |
| Blockly Editor | Conceptual analogy; future translator |
| Kick-Aleph-Bot | Kick platform connection submodule |
