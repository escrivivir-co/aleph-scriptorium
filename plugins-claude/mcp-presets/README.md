# mcp-presets -- Claude Code Plugin (v2.0.0)

MCP server orchestration plugin for Aleph Scriptorium. Manages 9 MCP servers, preset CRUD, agent assignments, and health monitoring.

Migrated from: `.github/plugins/mcp-presets/` (Copilot format v1.0.0)

## Installation

This plugin is auto-discovered by Claude Code when placed in `plugins-claude/mcp-presets/`.

No additional configuration is needed. The plugin reads server definitions from `.vscode/mcp.json`.

## Structure

```
plugins-claude/mcp-presets/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
├── README.md                    # This file
├── agents/
│   └── mcp-presets.md           # McpPresets orchestration agent
└── skills/
    ├── manage-mcp-servers.md    # Start/stop/health check servers
    ├── import-export-presets.md  # Preset CRUD and agent assignment
    └── mcp-health-dashboard.md  # Status overview of all 9 servers
```

## Command Mapping: Copilot -> Claude Code

| Copilot (v1) | Claude Code (v2) | Notes |
|--------------|-------------------|-------|
| `@McpPresets importar <file>` | Use `import-export-presets` skill | Read JSON, validate, save |
| `@McpPresets listar` | Use `import-export-presets` skill | Scan presets directory |
| `@McpPresets exportar <id>` | Use `import-export-presets` skill | Zeus-compatible JSON |
| `@McpPresets asignar <pid> <aid>` | Use `import-export-presets` skill | Updates agent-assignments.json |
| `@McpPresets servers` | Use `mcp-health-dashboard` skill | Port-check all 9 servers |
| VS Code task `MCP: Start [X]` | Use `manage-mcp-servers` skill | Direct npm/bash commands |

## MCP Servers (9 total)

| Server | Port |
|--------|------|
| wiki-browser-server | 3002 |
| devops-mcp-server | 3003 |
| state-machine-server | 3004 |
| prolog-mcp-server | 3006 |
| aaia-mcp-server | 3007 |
| typed-prompt-mcp-server | 3020 |
| launcher-server | 3050 |
| AlephAlpha | 3066 |
| copilot-logs-mcp-server | 3100 |

## Data Paths

- Presets: `ARCHIVO/PLUGINS/MCP_PRESETS/presets/`
- Assignments: `ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json`
- Catalog: `ARCHIVO/PLUGINS/MCP_PRESETS/catalog.json`
- Pack schema: `.github/plugins/mcp-presets/schemas/pack.schema.json`
- Packs: `.github/plugins/mcp-presets/packs/`
