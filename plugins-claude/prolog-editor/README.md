# Prolog Editor Plugin

**Prolog session management and FIA logic brain development via MCPPrologServer**

## What It Does

Prolog Editor provides guided workflows for the MCP Prolog Stack v2.0.0:

1. **Manage Prolog Sessions**: Create/query/destroy SWI-Prolog sessions with 12 MCP tools
2. **Develop Prolog Brains**: Create `.brain.pl` files for Teatro agent characters
3. **MCP Prolog Tooling**: Extend MCPPrologServer across the 4-layer stack

## Installation

### From Marketplace

```bash
/plugin marketplace add escrivivir-co/aleph-scriptorium
/plugin install prolog-editor@aleph-scriptorium
```

### Local Development

```bash
/plugin install ./plugins-claude/prolog-editor
```

## Quick Start

### Manage Sessions

```
/manage-prolog-sessions
```

Create Prolog sessions, execute queries, assert facts, consult .pl files, and persist rules to SQLite.

### Develop Brains

```
/develop-prolog-brains
```

Design brain modules for Teatro agents with identity, knowledge, and context-action decision rules.

### Extend MCP Server

```
/prolog-mcp-tooling
```

Add new MCP tools, resources, and prompts to MCPPrologServer with full 4-layer alignment.

## Skills

| Skill | Description | Type |
|-------|-------------|------|
| `manage-prolog-sessions` | Session lifecycle, queries, KB management | Operations |
| `develop-prolog-brains` | Brain design, templates, Blockly transpilation | Development |
| `prolog-mcp-tooling` | MCP Server extension across 4 layers | Infrastructure |

## Ecosystem Context

### MCP Prolog Stack v2.0.0

| Layer | Port | Location |
|-------|------|----------|
| UI Angular | 5001 | `PrologEditor/frontend/` |
| Backend REST | 8000 | `PrologEditor/backend/` |
| MCP Server | 3006 | `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` |
| SDK Core | -- | `MCPGallery/mcp-core-sdk/src/types/` |

### MCP Tools (12)

**Core** (7): create_session, list_sessions, destroy_session, query, assert_fact, consult_file, get_templates

**Backend-Integrated** (5): load_rules_from_db, save_rule_to_db, list_sdk_templates, get_sdk_template_content, get_telemetry_status

## Configuration

No configuration required. Plugin reads from:

- `MCPGallery/mcp-mesh-sdk/` - MCP Server source
- `PrologEditor/` - Frontend and backend
- `.vscode/mcp.json` - MCP Server (port 3006)
- `.vscode/tasks.json` - APB: Start tasks

## Dependencies

- None (standalone plugin)

## Optional Integrations

- `aaia-editor`: FIA logica paradigm integration
- `typed-prompting`: Percepto/Eferencia schema validation
- `scriptorium-pack`: Cowork session management

## Data Directories

```
ARCHIVO/PLUGINS/PROLOG_EDITOR/
  templates/    # Prolog templates
  rules/        # User-created rules
  exports/      # Blockly transpilation outputs

ARCHIVO/DISCO/TALLER/ELENCO/
  lucas/lucas-prolog.brain.pl   # Example brain

MCPGallery/mcp-mesh-sdk/src/
  MCPPrologServer.ts            # MCP Server (1249 lines)
  services/PrologSessionManager.ts
  services/PrologEngine.ts
  clients/PrologBackendClient.ts
```

## Version

**2.0.0** (2026-01-28)

- Migrated from Copilot to Claude Code format
- Skills-based invocation replaces agent handoffs
- Progressive disclosure for detailed content

**Breaking changes from v1.x**:
- Agent syntax changed from `@PrologEditor` to skills-based invocation
- Instructions are now progressive disclosure skills
- No auto-loading (lazy loaded via skills)

## Migration from Copilot

If migrating from `.github/plugins/prolog-editor/`:

1. Install this plugin: `/plugin install prolog-editor`
2. Update invocation style to skills
3. Optional: Keep Copilot version for compatibility

### Command Mapping

| Copilot Handoff | Claude Code Skill |
|----------------|-------------------|
| Levantar Stack (Tasks Individuales) | `/manage-prolog-sessions` (startup section) |
| Health Check | `/manage-prolog-sessions` (health check) |
| Verificar Alineamiento | `/prolog-mcp-tooling` (alignment checklist) |
| Crear template desde descripcion | `/develop-prolog-brains` (template creation) |
| Listar templates | `/manage-prolog-sessions` (prolog_get_templates) |
| Ejecutar consulta | `/manage-prolog-sessions` (prolog_query) |
| Validar sintaxis Prolog | `/manage-prolog-sessions` (prolog_query) |
| Exportar Blockly a Prolog | `/develop-prolog-brains` (Blockly transpilation) |
| Asignar reglas a agente | `/develop-prolog-brains` (AGENT_CREATOR integration) |
| Condicion Prolog en estadio | `/develop-prolog-brains` (ARG_BOARD integration) |
| Crear Brain para Teatro | `/develop-prolog-brains` (brain module structure) |

## License

AIPL v1.0

## Links

- **Homepage**: https://escrivivir-co.github.io/aleph-scriptorium/
- **Repository**: https://github.com/escrivivir-co/aleph-scriptorium
- **PrologEditor**: [PrologEditor/](../../PrologEditor/)
- **MCPGallery**: [MCPGallery/](../../MCPGallery/)
- **SWI-Prolog**: https://www.swi-prolog.org/pldoc/
