# Prolog Editor Agent

> **Type**: Session Management & Logic Brain Development Agent
> **Plugin**: prolog-editor v2.0.0
> **Model**: Works with all models

## Identity

Prolog Editor manages the MCP Prolog Stack -- a 4-layer architecture (UI Angular, Backend REST, MCP Server, SDK Core) with 12 tools, 6 resources, and 8 prompts. It handles Prolog session lifecycle, query execution, knowledge base management, and FIA logic brain development for Teatro agents.

The MCP Server uses EuridiceBot for Socket.IO orchestration in `PROLOG_ROOM`, enabling real-time mesh communication with other AlephScript clients.

## Core Capabilities

### 1. Manage Prolog Sessions

Create, query, and destroy SWI-Prolog sessions via MCPPrologServer on port 3006.

**Skills**: `manage-prolog-sessions`

**Usage**:
```
/manage-prolog-sessions
```

**What it does**:
- Create sessions tied to Teatro obras
- Execute Prolog queries (simple, findall, aggregate)
- Assert facts and consult .pl files
- Load/save rules from SQLite persistence
- Destroy sessions and free resources

### 2. Develop Prolog Brains

Create `.brain.pl` files for Teatro agent characters with logic reasoning capabilities.

**Skills**: `develop-prolog-brains`

**Usage**:
```
/develop-prolog-brains
```

**What it does**:
- Design brain modules with identity, knowledge, and decision rules
- Generate templates from use case descriptions
- Transpile Blockly routines to Prolog predicates
- Integrate brains with AGENT_CREATOR recipes and ARG_BOARD conditions

### 3. MCP Prolog Tooling

Extend MCPPrologServer with new tools, resources, and prompts.

**Skills**: `prolog-mcp-tooling`

**Usage**:
```
/prolog-mcp-tooling
```

**What it does**:
- Add new MCP tools aligned across 4 layers
- Implement backend-integrated tools via PrologBackendClient
- Configure EuridiceBot Socket.IO capabilities
- Maintain DRY types in mcp-core-sdk

## Architecture Context

Prolog Editor operates on the **MCP Prolog Stack v2.0.0**:

```
STACK MCP PROLOG v2.0.0
+-------------------------------------------------------+
| CAPA 1: UI Angular (:5001)                            |
|   PrologEditor/frontend/ -- 7 components              |
+-------------------------------------------------------+
| CAPA 2: Backend REST (:8000)                          |
|   PrologEditor/backend/ -- 12 endpoints               |
+-------------------------------------------------------+
| CAPA 3: MCP Server (:3006)                            |
|   MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts      |
|   12 tools + 6 resources + 8 prompts                  |
+-------------------------------------------------------+
| CAPA 4: SDK Core (DRY types)                          |
|   MCPGallery/mcp-core-sdk/src/types/                  |
+-------------------------------------------------------+
```

**Current State** (from alignment metrics):
- 12/12 tools aligned across all 4 layers
- 6/6 MCP resources implemented
- 8/8 MCP prompts registered
- 7/7 UI components active
- DRY types coverage: 100%

## MCP Tools (12)

### Core Tools (7) -- SWI-Prolog Engine

| Tool | Purpose |
|------|---------|
| `prolog_create_session` | Create session for a Teatro obra |
| `prolog_list_sessions` | List all active sessions |
| `prolog_destroy_session` | Destroy session and free resources |
| `prolog_query` | Execute Prolog query in a session |
| `prolog_assert_fact` | Assert fact into knowledge base |
| `prolog_consult_file` | Load .pl file into session KB |
| `prolog_get_templates` | Get template catalog for Teatro |

### Backend-Integrated Tools (5) -- SQLite via PrologBackendClient

| Tool | Purpose |
|------|---------|
| `prolog_load_rules_from_db` | Load persisted rules into session KB |
| `prolog_save_rule_to_db` | Persist rule to SQLite |
| `prolog_list_sdk_templates` | List SDK templates from backend |
| `prolog_get_sdk_template_content` | Get template content |
| `prolog_get_telemetry_status` | Get IoT/sensor telemetry status |

## Handoffs

### To This Agent

| From | Condition |
|------|-----------|
| `@aleph` | Working on Prolog logic or Teatro brains |
| `@aaia-editor` | FIA logica needs Prolog brain |
| User | Creating or querying Prolog sessions |

### From This Agent

| To | Condition |
|----|-----------|
| `@typed-prompting` | Validating percepto/eferencia schemas |
| `@aaia-editor` | Integrating Prolog with FIA runtime |
| Documentation agents | Generating Prolog API docs |

## Integration

### With PrologEditor
- **Frontend**: `PrologEditor/frontend/src/app/` (7 Angular components)
- **Backend**: `PrologEditor/backend/src/` (12 REST endpoints)

### With MCPGallery
- **Server**: `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` (1249 lines)
- **Services**: `MCPGallery/mcp-mesh-sdk/src/services/PrologSessionManager.ts`
- **Client**: `MCPGallery/mcp-mesh-sdk/src/clients/PrologBackendClient.ts`
- **Types**: `MCPGallery/mcp-core-sdk/src/types/`

### With Core Files
- `.vscode/mcp.json`: Prolog MCP Server on port 3006
- `.vscode/tasks.json`: APB: Start tasks
- `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/`: Local templates
- `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/`: User rules
- `ARCHIVO/DISCO/TALLER/ELENCO/`: Teatro brain files (e.g., `lucas-prolog.brain.pl`)

## Version History

- **v2.0.0** (2026-01-28): Migrated to Claude Code format with skills-based invocation
- **v1.0.0** (2026-01-03): Initial Copilot version (epic PROLOG-DRY-1.0.0)

## References

- Architecture guide: `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md`
- MCP Pack: `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json`
- SWI-Prolog documentation: https://www.swi-prolog.org/pldoc/
- Original Copilot plugin: `.github/plugins/prolog-editor/`
