# Aleph Scriptorium - Claude Code Plugins

Marketplace de plugins para Claude Code del ecosistema Aleph Scriptorium.

## Plugins Disponibles (9/9)

| # | Plugin | Categoría | Skills |
|---|--------|-----------|--------|
| 1 | **scriptorium-pack** | productivity | `start-cowork-session`, `list-mcp-tools`, `analyze-copilot-flow` |
| 2 | **aaia-editor** | agent-development | `backend-frontend-bridge`, `mcp-server-development`, `socketio-orchestration` |
| 3 | **mcp-presets** | devops | `manage-mcp-servers`, `import-export-presets`, `mcp-health-dashboard` |
| 4 | **prolog-editor** | development | `manage-prolog-sessions`, `develop-prolog-brains`, `prolog-mcp-tooling` |
| 5 | **typed-prompting** | development | `validate-messages`, `manage-schema-packs`, `typed-prompt-development` |
| 6 | **agent-creator** | agent-development | `create-agent`, `manage-recipes`, `agent-taxonomy` |
| 7 | **scrum** | methodology | `manage-backlogs`, `run-sprint-ceremony`, `track-epics` |
| 8 | **wire-editor** | development | `manage-flows`, `wire-mcp-integration`, `blockly-transpilation` |
| 9 | **openasyncapi-editor** | documentation | `manage-api-specs`, `manage-event-specs`, `generate-from-code` |

**Total**: 9 plugins, 9 agents, 27 skills

## Instalación

### Desde Marketplace

```bash
# Agregar marketplace
/plugin marketplace add escrivivir-co/aleph-scriptorium

# Instalar plugin individual
/plugin install scriptorium-pack@aleph-scriptorium

# Instalar colección
/plugin install-collection full-pack@aleph-scriptorium
```

### Local (Desarrollo)

```bash
/plugin install ./plugins-claude/scriptorium-pack
/plugin install ./plugins-claude/aaia-editor
/plugin install ./plugins-claude/mcp-presets
/plugin install ./plugins-claude/prolog-editor
/plugin install ./plugins-claude/typed-prompting
/plugin install ./plugins-claude/agent-creator
/plugin install ./plugins-claude/scrum
/plugin install ./plugins-claude/wire-editor
/plugin install ./plugins-claude/openasyncapi-editor
```

## Colecciones

| Colección | Plugins | Uso |
|-----------|---------|-----|
| **core-pack** | scriptorium-pack, mcp-presets | Infraestructura esencial |
| **agent-development-pack** | aaia-editor, agent-creator, typed-prompting | Desarrollo de agentes autónomos |
| **development-pack** | prolog-editor, wire-editor, openasyncapi-editor | Editores y utilidades |
| **methodology-pack** | scrum | Gestión de proyecto |
| **full-pack** | Los 9 plugins | Todo el ecosistema |

## Estructura

```
plugins-claude/
├── marketplace.json
├── README.md
├── scriptorium-pack/       # Core infrastructure
├── aaia-editor/            # AAIA Runtime consolidation
├── mcp-presets/            # MCP server orchestration
├── prolog-editor/          # Prolog/FIA logic
├── typed-prompting/        # Schema validation
├── agent-creator/          # Agent templates (708+)
├── scrum/                  # Methodology
├── wire-editor/            # Node-RED/Blockly flows
└── openasyncapi-editor/    # API specs
```

Cada plugin sigue la estructura:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json
├── README.md
├── agents/
│   └── plugin-name.md
└── skills/
    ├── skill-1.md
    ├── skill-2.md
    └── skill-3.md
```

## Migración desde Copilot

Los plugins mantienen compatibilidad con versiones Copilot en `.github/plugins/`. Cambios principales:

| Copilot | Claude Code |
|---------|-------------|
| `@agent comando` | `/skill-name` |
| Instrucciones auto-cargadas | Progressive disclosure (lazy load) |
| Agent handoffs | Skills + direct invocation |

## Patrones

### Progressive Disclosure

Todas las skills siguen el patrón: primeras 50-100 líneas visibles, resto en `<details>` tags. Objetivo: <40K tokens por request.

## Licencia

AIPL v1.0

## Links

- **Homepage**: https://escrivivir-co.github.io/aleph-scriptorium/
- **Repository**: https://github.com/escrivivir-co/aleph-scriptorium
- **Issues**: https://github.com/escrivivir-co/aleph-scriptorium/issues
