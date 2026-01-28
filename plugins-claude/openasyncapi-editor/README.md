# openasyncapi-editor (Claude Code Plugin v2.0.0)

OpenAPI and AsyncAPI specification management for MCP servers in the Aleph Scriptorium.

## Overview

OpenAsyncApiEditor is the **API specification management** plugin for the Scriptorium. It provides centralized cataloging, validation, visualization, and code generation for both REST APIs (OpenAPI) and event-driven APIs (AsyncAPI).

## Plugin Structure

```
plugins-claude/openasyncapi-editor/
├── .claude-plugin/plugin.json
├── README.md
├── agents/openasyncapi-editor.md
└── skills/
    ├── manage-api-specs.md        # Create/edit/validate OpenAPI specs
    ├── manage-event-specs.md      # Create/edit/validate AsyncAPI specs
    └── generate-from-code.md      # Auto-generate client/server code from specs
```

## Migration Mapping (Copilot to Claude Code)

| Copilot (v1) | Claude Code (v2) | Type |
|-------------|------------------|------|
| `agents/openasyncapi-editor.agent.md` | `agents/openasyncapi-editor.md` | Agent |
| `prompts/catalogar-spec.prompt.md` | `skills/manage-api-specs.md` | Skill (merged) |
| `prompts/validar-spec.prompt.md` | `skills/manage-api-specs.md` | Skill (merged) |
| `prompts/setup-swagger-ui.prompt.md` | `skills/manage-api-specs.md` | Skill (merged) |
| `prompts/generar-cliente.prompt.md` | `skills/generate-from-code.md` | Skill |
| `prompts/setup-asyncapi-studio.prompt.md` | `skills/manage-event-specs.md` | Skill (merged) |
| `instructions/openasyncapi-protocol.instructions.md` | `agents/openasyncapi-editor.md` (merged) | Agent context |
| `instructions/codegen-templates.instructions.md` | `skills/generate-from-code.md` (merged) | Skill |

## Data Directory

```
ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/
├── catalog.json              # Master spec index
├── specs/{project}/          # Local spec copies (openapi.yaml, asyncapi.yaml)
├── generated/{project}/      # Generated code by language
└── docs/{project}/           # Static documentation HTML
```

## CLI Tools

| Tool | Purpose | Install |
|------|---------|---------|
| openapi-generator-cli | Multi-language code generation | `npm i -g @openapitools/openapi-generator-cli` |
| @asyncapi/cli | AsyncAPI validation and generation | `npm i -g @asyncapi/cli` |
| @redocly/cli | Linting and static docs | `npm i -g @redocly/cli` |

## Dependencies

| Plugin | Relationship |
|--------|-------------|
| PrologEditor | Spec origin: PrologEditor API contracts |
| TypedPrompting | Schema validation from spec components |
| GH-Pages | Publish static API documentation |
