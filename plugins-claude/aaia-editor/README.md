# AAIA Editor Plugin

**Development and consolidation plugin for AAIAGallery Runtime with focus on closing implementation gaps**

## What It Does

AAIA Editor provides guided workflows for the AAIAGallery ecosystem consolidation:

1. **Backend-Frontend Bridge**: Create RuntimeBridge to connect Express with Runtime.threads
2. **MCP Server Development**: Extend MCPAAIAServer with new tools and resources
3. **Socket.IO Orchestration**: Manage PersefonBot and AAIA_ROOM event flows

## Installation

### From Marketplace

```bash
/plugin marketplace add escrivivir-co/aleph-scriptorium
/plugin install aaia-editor@aleph-scriptorium
```

### Local Development

```bash
/plugin install ./plugins-claude/aaia-editor
```

## Quick Start

### Create Runtime Bridge (Critical Gap)

```
/backend-frontend-bridge
```

Guides you through creating `/AAIAGallery/backend/src/runtime/RuntimeBridge.ts` to connect Express backend with AAIAGallery Runtime, enabling real FIA execution.

### Extend MCP Server

```
/mcp-server-development
```

Add new MCP tools, resources, or prompts to MCPAAIAServer with templates and testing workflows.

### Manage Socket.IO Events

```
/socketio-orchestration
```

Configure PersefonBot, implement event handlers, and test AAIA_ROOM flows.

## Skills

| Skill | Description | Type |
|-------|-------------|------|
| `backend-frontend-bridge` | Create Runtime bridge for backend/frontend integration | Implementation |
| `mcp-server-development` | MCP Server tooling and extension patterns | Development |
| `socketio-orchestration` | Socket.IO event management with PersefonBot | Integration |

## Ecosystem Context

AAIA Editor works with:

### AAIAGallery (Runtime Core)
- `/alephscript/src/FIA/` - Runtime + 10 paradigms (368 TS files)
- `/backend/` - Express on port 8007 + PersefonBot
- `/frontend/` - Angular UI

### MCPGallery (MCP Server)
- `/mcp-mesh-sdk/src/MCPAAIAServer.ts` - 9 tools, 3 resources (532 lines)
- `/mcp-mesh-sdk/src/services/AAIASessionManager.ts` - Session management (257 lines)
- `/mcp-core-sdk/src/types/aaia/` - Unified types (250+ lines)

## Current State (2026-01-28)

Based on comprehensive analysis:

**✅ Implemented**:
- Runtime core with 10 paradigms
- MCPAAIAServer complete (9 tools)
- Backend Express with PersefonBot
- Unified types in mcp-core-sdk

**🔴 Critical Gap**:
- Backend Runtime Bridge (sessions exist but don't execute FIAs)

**🟡 Partial**:
- Legacy code consolidation
- Frontend integration
- Some paradigm demos incomplete

## Configuration

No configuration required. Plugin reads from:

- `AAIAGallery/` - Runtime and backend source
- `MCPGallery/` - MCP server and types
- `.vscode/mcp.json` - AAIA MCP Server (port 3007)
- `.vscode/tasks.json` - Backend start/stop tasks

## Dependencies

- None (standalone plugin)

## Optional Integrations

- `prolog-editor`: FIA lógica paradigm integration
- `typed-prompting`: Percepto/Eferencia validation
- `openasyncapi-editor`: AsyncAPI specs for Socket.IO

## Data Directories

```
AAIAGallery/
├── alephscript/src/FIA/paradigmas/   # 10 paradigm implementations
├── alephscript/src/FIA/aplicaciones/ # 7 FIA applications
└── backend/src/                      # Express + Socket.IO

MCPGallery/
├── mcp-mesh-sdk/src/MCPAAIAServer.ts
└── mcp-core-sdk/src/types/aaia/
```

## Version

**2.0.0** (2026-01-28)

- Migrated from Copilot to Claude Code format
- Focus shifted from documentation to consolidation guidance
- Skills target specific implementation gaps

**Breaking changes from v1.x**:
- Agent syntax changed from `@AAIAEditor` to skills-based invocation
- Instructions are now progressive disclosure skills
- No auto-loading (lazy loaded via skills)

## Migration from Copilot

If migrating from `.github/plugins/aaia-editor`:

1. Install this plugin: `/plugin install aaia-editor`
2. Update invocation style to skills
3. Optional: Keep Copilot version for compatibility

Commands map as follows:

| Copilot | Claude Code |
|---------|-------------|
| `@plugin_ox_aaiaeditor crear sesión` | `/backend-frontend-bridge` (creates working sessions) |
| `@plugin_ox_aaiaeditor operar fia` | `/mcp-server-development` (extends tools) |
| Agent handoffs | Skills + direct invocation |

## Contributing

See [BACKLOG_BORRADORES/Enero_18_MCP_AAIA_Server/](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_18_MCP_AAIA_Server/) for epic details and gap analysis.

Key areas for contribution:
- Consolidate legacy paradigm code
- Complete FIA Situada demos
- Implement RuntimeBridge (critical)
- E2E integration tests

## License

AIPL v1.0

## Links

- **Homepage**: https://escrivivir-co.github.io/aleph-scriptorium/
- **Repository**: https://github.com/escrivivir-co/aleph-scriptorium
- **AAIAGallery**: [AAIAGallery/](../../AAIAGallery/)
- **MCPGallery**: [MCPGallery/](../../MCPGallery/)
- **Documentation**: [docs/](./docs/)
