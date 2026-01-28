# agent-creator (Claude Code Plugin)

Guided agent creation for Aleph Scriptorium: templates, recipes, and taxonomy management.

## Installation

This plugin is auto-discovered by Claude Code when placed in `plugins-claude/agent-creator/`.

Ensure the plugin directory is registered in your Claude Code configuration or that the `plugins-claude/` directory is scanned.

## What It Does

Creates specialized Scriptorium agents by combining:

1. **Base agents** (methodology: @yellowflag, @blueflag, @blackflag, etc.)
2. **Data sources** (knowledge from DISCO/ and ARCHIVO/ folders)
3. **AgentLoreSDK templates** (708+ reusable components for DRY creation)

Produces installable `.agent.md` files with reproducible `.recipe.json` recipes.

## Skills

| Skill | Description |
|-------|-------------|
| `create-agent` | Guided 7-step workflow to create a specialized agent |
| `manage-recipes` | List, inspect, replay, edit, and delete agent recipes |
| `agent-taxonomy` | Browse the AgentLoreSDK catalog (55 categories, 708+ items) |

## Migration from Copilot Format

This plugin replaces the Copilot-format plugin at `.github/plugins/agent-creator/`.

### What Changed

| Copilot (v1.x) | Claude Code (v2.0) |
|-----------------|-------------------|
| `manifest.md` with YAML frontmatter | `.claude-plugin/plugin.json` |
| `prompts/*.prompt.md` (6 files) | `skills/*.md` (3 consolidated skills) |
| `instructions/*.instructions.md` (3 files) | Inlined into skills with progressive disclosure |
| `agents/agent-creator.agent.md` | `agents/agent-creator.md` |
| `index/catalog.json` (stays in place) | Referenced from skills, not moved |

### What Stayed the Same

- Recipe format and storage: `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/`
- Created agents location: `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/`
- AgentLoreSDK catalog: `.github/plugins/agent-creator/index/catalog.json`
- Validation protocol (3 phases: questionnaire, pass, analyze)
- DRY detection with keyword-to-category mapping

### Copilot Prompts to Claude Skills Mapping

| Copilot Prompt | Claude Skill |
|----------------|-------------|
| `crear-agente.prompt.md` | `create-agent.md` (Steps 1-7) |
| `editar-agente.prompt.md` | `create-agent.md` (improvement mode) |
| `fusionar-agentes.prompt.md` | `create-agent.md` (multiple base agents) |
| `conectar-fuente.prompt.md` | `create-agent.md` (Step 4) |
| `validar-agente.prompt.md` | `create-agent.md` (validation details section) |
| `analizar-alineamiento.prompt.md` | `create-agent.md` (Phase C details section) |
| `desplegar-en-arg.prompt.md` | Handoff to `arg-board` plugin |
| `exportar-brain-pl.prompt.md` | `create-agent.md` (Prolog brain details section) |
| `invocar-pathykar.prompt.md` | Not migrated (specific to Pathykar epochs) |

## Directory Structure

```
plugins-claude/agent-creator/
├── .claude-plugin/
│   └── plugin.json
├── README.md
├── agents/
│   └── agent-creator.md
└── skills/
    ├── create-agent.md
    ├── manage-recipes.md
    └── agent-taxonomy.md
```

## Dependencies

- **Required**: Access to `ARCHIVO/PLUGINS/AGENT_CREATOR/` for recipes and created agents
- **Required**: Access to `.github/plugins/agent-creator/index/catalog.json` for DRY detection
- **Optional**: `AgentLoreSDK/` submodule for template content
- **Optional**: `arg-board` plugin for Teatro ARG deployment
- **Optional**: `foro-scraper` plugin for requesting additional scraped data

## Version History

- **v2.0.0** (2026-01-28): Migrated to Claude Code plugin format with progressive disclosure
- **v1.1.0** (2025-12-22): Added validation protocol, Prolog brain export, catalog DRY detection
- **v1.0.0** (2025-12-15): Initial Copilot version
