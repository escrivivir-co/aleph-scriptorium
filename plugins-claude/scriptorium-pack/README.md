# ScriptoriumPack Plugin

**Core infrastructure plugin for Aleph Scriptorium with context optimization**

## What It Does

ScriptoriumPack provides essential workflows for the Scriptorium ecosystem:

1. **Cowork Sessions**: Structured multi-agent collaboration
2. **MCP Discovery**: Catalog available MCP tools
3. **Flow Analysis**: Debug Copilot execution paths

## Installation

### From Marketplace

```bash
/plugin marketplace add escrivivir-co/aleph-scriptorium
/plugin install scriptorium-pack@aleph-scriptorium
```

### Local Development

```bash
/plugin install ./plugins-claude/scriptorium-pack
```

## Quick Start

### Create a Cowork Session

```
/start-cowork-session
```

Follow prompts for: topic, participants, objective, epic (optional), constraints (optional).

### List Available MCP Tools

```
/list-mcp-tools
```

Shows active MCP servers and their exposed tools.

### Analyze Copilot Flow

```
/analyze-copilot-flow --agent @ox --model claude-sonnet
```

Generates execution trace and Mermaid diagram.

## Skills

| Skill | Description | Type |
|-------|-------------|------|
| `start-cowork-session` | Create structured multi-agent session | Interactive |
| `list-mcp-tools` | Catalog MCP server capabilities | Read-only |
| `analyze-copilot-flow` | Trace prompt execution | Analysis |

## Configuration

No configuration required. Plugin reads from:

- `.vscode/tasks.json`: Stack definitions
- `.vscode/mcp.json`: MCP server registry
- `ARCHIVO/DISCO/SESIONES_COTRABAJO/`: Session storage

## Context Optimization

This plugin implements **Progressive Disclosure**:

- Skills show 50-100 line summary by default
- Full documentation in collapsible `<details>` sections
- Target: <40K tokens per request (vs. 70K baseline)

## Dependencies

- None (standalone plugin)

## Optional Integrations

- `mcp-presets`: Enhanced MCP management
- `scrum`: Cowork → Epic workflow
- `agent-creator`: Cowork for agent design

## Data Directories

```
ARCHIVO/DISCO/
└── SESIONES_COTRABAJO/          # Cowork sessions
    └── {YYYY-MM-DD}_{topic}/
        ├── 00_SESION.md         # Metadata
        ├── 01_TABLERO.md        # Turn index
        ├── 02_ACTAS/            # Turn content
        ├── 03_REFERENCIAS/      # References
        └── 04_PROTOCOLO.md      # Protocol copy
```

## Version

**2.0.0** (2026-01-28)

- Migrated from Copilot to Claude Code format
- Implemented progressive disclosure pattern
- Added MCP discovery and Copilot flow analysis

**Breaking changes from v1.x**:
- Command syntax changed from `@scriptorium-pack cotrabajo iniciar` to `/start-cowork-session`
- Instructions no longer auto-load (lazy loaded via skills)

## Migration from Copilot

If migrating from `.github/plugins/scriptorium-pack`:

1. Install this plugin: `/plugin install scriptorium-pack`
2. Update references to new skill names
3. Optional: Keep Copilot version for compatibility

Commands map as follows:

| Copilot | Claude Code |
|---------|-------------|
| `@scriptorium-pack cotrabajo iniciar` | `/start-cowork-session` |
| `@scriptorium-pack lista-herramientas-mcp` | `/list-mcp-tools` |
| `@scriptorium-pack analizar-flujo-copilot` | `/analyze-copilot-flow` |

## Contributing

See [BACKLOG_BORRADORES/Claude_Code_Plugins_Migration/](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Claude_Code_Plugins_Migration/) for migration architecture and design decisions.

## License

AIPL v1.0

## Links

- **Homepage**: https://escrivivir-co.github.io/aleph-scriptorium/
- **Repository**: https://github.com/escrivivir-co/aleph-scriptorium
- **Documentation**: [docs/](./docs/)
