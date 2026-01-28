# Plugin: Scrum v2.0.0 (Claude Code)

Scrum methodology for Aleph Scriptorium: backlogs, sprints, epics, and ceremonies.

Migrated from Copilot plugin v3.0.0 to Claude Code format with progressive disclosure.

## Structure

```
plugins-claude/scrum/
├── .claude-plugin/
│   └── plugin.json
├── README.md
├── agents/
│   └── scrum.md            # Scrum Master agent (interprets Lucas)
└── skills/
    ├── manage-backlogs.md   # Create/update backlog borradores
    ├── run-sprint-ceremony.md  # Planning, review, retrospective, close
    └── track-epics.md       # Epic lifecycle and feature cycles
```

## Migration Mapping: Copilot -> Claude Code

| Copilot Source | Claude Code Target | Notes |
|----------------|-------------------|-------|
| `manifest.md` | `.claude-plugin/plugin.json` | YAML frontmatter -> JSON manifest |
| `agents/scrum.agent.md` | `agents/scrum.md` | Frontmatter simplified, handoffs removed (not supported) |
| `instructions/scrum-protocol.instructions.md` | Merged into agent + skills | Protocol distributed across relevant skills |
| `prompts/planificar-sprint.prompt.md` | `skills/manage-backlogs.md` | Combined with borrador, aprobar, tracking |
| `prompts/crear-backlog-borrador.prompt.md` | `skills/manage-backlogs.md` | Part of manage-backlogs skill |
| `prompts/aprobar-backlog.prompt.md` | `skills/manage-backlogs.md` | Part of manage-backlogs skill |
| `prompts/tracking-sprint.prompt.md` | `skills/manage-backlogs.md` + `skills/track-epics.md` | Split between backlog management and epic tracking |
| `prompts/generar-desde-sesion.prompt.md` | `skills/run-sprint-ceremony.md` | Core of Modelo Generativo |
| `prompts/retrospectiva.prompt.md` | `skills/run-sprint-ceremony.md` | Part of ceremony skill |

### Key Differences

1. **No handoffs**: Claude Code does not support Copilot-style handoffs. The agent description and skill triggers handle routing instead.
2. **Progressive disclosure**: Skills use `<details>` tags so the first 50-100 lines are self-contained for quick usage, with full protocol available on demand.
3. **No MCP tool references**: Copilot `prolog-mcp-server/*` and `copilot-logs-mcp-server/*` tools are not referenced. If MCP servers are configured separately, the agent can use them.
4. **Consolidated skills**: 6 Copilot prompts consolidated into 3 skills grouped by workflow concern.

## Key Concepts

- **Modelo Generativo**: Sessions PRODUCE borradores, they do not TRANSFORM into them
- **DRY Principle**: Index is a map (~50 lines), not the territory. Content lives in borradores.
- **Interpreta a Lucas**: Agent inherits expertise from `ARCHIVO/DISCO/TALLER/ELENCO/lucas/` rather than duplicating Scrum knowledge

## Origin

- Copilot plugin: `.github/plugins/scrum/` (v3.0.0)
- Epic: SCRUM-REFACTOR-1.0.0
- Session: 2026-01-05_consenso-agile-scriptorium
