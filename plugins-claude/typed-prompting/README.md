# Typed Prompting Plugin

**Schema-based message validation and typed prompt management via MCP**

## What It Does

Typed Prompting provides guided workflows for ontology design and message validation:

1. **Validate Messages**: Validate JSON against schemas with AJV, convert TypeScript to JSON Schema
2. **Manage Schema Packs**: Create/organize schema libraries, install in agents and ARG obras
3. **TypedPrompt MCP Development**: Extend MCPTypedPromptServer with new tools and resources

## Installation

### From Marketplace

```bash
/plugin marketplace add escrivivir-co/aleph-scriptorium
/plugin install typed-prompting@aleph-scriptorium
```

### Local Development

```bash
/plugin install ./plugins-claude/typed-prompting
```

## Quick Start

### Validate Messages

```
/validate-messages
```

Validate JSON messages against stored schemas, convert TypeScript interfaces to JSON Schema, and suggest ontologies for use cases.

### Manage Schema Packs

```
/manage-schema-packs
```

Create, list, and organize schemas into libraries. Install validation rules in agent recipes and ARG obra protocols.

### Extend MCP Server

```
/typed-prompt-development
```

Add new MCP tools, resources, and prompts to MCPTypedPromptServer.

## Skills

| Skill | Description | Type |
|-------|-------------|------|
| `validate-messages` | Message validation, TypeScript conversion, ontology suggestions | Operations |
| `manage-schema-packs` | Schema CRUD, library management, installation in agents/obras | Management |
| `typed-prompt-development` | MCP Server extension and backend integration | Infrastructure |

## Ecosystem Context

### TypedPrompt MCP Stack

| Layer | Port | Location |
|-------|------|----------|
| MCP Server | 3020 | `MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts` |
| REST Backend | 3019 | `TypedPromptsEditor/server/` |
| Web Editor | 5000 | `TypedPromptsEditor/` |
| DRY Types | -- | `MCPGallery/mcp-core-sdk/src/types/typed-prompts/` |

### MCP Tools (7)

validate_message, convert_interface, list_schemas, get_schema, create_schema, list_libraries, suggest_ontology

## Configuration

No configuration required. Plugin reads from:

- `MCPGallery/mcp-mesh-sdk/` - MCP Server source
- `TypedPromptsEditor/` - Backend and web editor
- `ARCHIVO/PLUGINS/TYPED_PROMPTING/` - Schema data

## Dependencies

- None (standalone plugin)

## Optional Integrations

- `aaia-editor`: Percepto/Eferencia validation
- `prolog-editor`: Typed Prolog input/output
- `scriptorium-pack`: Cowork session management

## Data Directories

```
ARCHIVO/PLUGINS/TYPED_PROMPTING/
  schemas/custom/      # User schemas
  schemas/examples/    # Example schemas
  libraries/           # Schema libraries
  validation-logs/     # Validation history

MCPGallery/mcp-mesh-sdk/src/
  MCPTypedPromptServer.ts           # MCP Server (618 lines)
  clients/TypedPromptBackendClient.ts

MCPGallery/mcp-core-sdk/src/types/typed-prompts/
  # DRY type definitions
```

## Version

**2.0.0** (2026-01-28)

- Migrated from Copilot to Claude Code format
- Skills-based invocation replaces agent handoffs
- Progressive disclosure for detailed content

**Breaking changes from v1.x**:
- Agent syntax changed from `@TypedPrompting` to skills-based invocation
- Instructions are now progressive disclosure skills
- No auto-loading (lazy loaded via skills)

## Migration from Copilot

If migrating from `.github/plugins/typed-prompting/`:

1. Install this plugin: `/plugin install typed-prompting`
2. Update invocation style to skills
3. Optional: Keep Copilot version for compatibility

### Command Mapping

| Copilot Handoff | Claude Code Skill |
|----------------|-------------------|
| Estudiar caso de uso | `/validate-messages` (suggest_ontology tool) |
| Sugerir ontologia existente | `/validate-messages` (typed_suggest_ontology) |
| Instalar schema en agente | `/manage-schema-packs` (validationSchema install) |
| Instalar protocolo en flujo ARG | `/manage-schema-packs` (communicationProtocol) |
| Validar mensaje | `/validate-messages` (typed_validate_message) |
| Listar schemas disponibles | `/manage-schema-packs` (typed_list_schemas) |
| Crear schema desde TypeScript | `/validate-messages` (typed_convert_interface) |
| Abrir editor web | `/typed-prompt-development` (web editor reference) |

## License

AIPL v1.0

## Links

- **Homepage**: https://escrivivir-co.github.io/aleph-scriptorium/
- **Repository**: https://github.com/escrivivir-co/aleph-scriptorium
- **TypedPromptsEditor**: [TypedPromptsEditor/](../../TypedPromptsEditor/)
- **MCPGallery**: [MCPGallery/](../../MCPGallery/)
- **Blueprint**: [docs/blueprint-typed-prompting.md](../../docs/blueprint-typed-prompting.md)
