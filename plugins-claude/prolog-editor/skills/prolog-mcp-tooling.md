# Prolog MCP Tooling

Extend MCPPrologServer with new tools, resources, and prompts. All additions must be aligned across the 4-layer stack: MCP Server, Backend REST, Frontend Service, and UI Component.

## Quick Start

**MCP Server source**: `/MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` (1249 lines)

### Adding a New MCP Tool

1. Define the tool in `MCPPrologServer.setupTools()`:

```typescript
this.server.tool(
  "prolog_new_tool",
  "Description of what this tool does",
  {
    param1: z.string().describe("Parameter description"),
    param2: z.number().optional().describe("Optional param"),
  },
  async ({ param1, param2 }) => {
    const result = await this.handleNewTool(param1, param2);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);
```

2. Implement the handler method:

```typescript
async handleNewTool(param1: string, param2?: number): Promise<any> {
  try {
    // Core logic or delegate to sessionManager/backendClient
    return { success: true, result: "..." };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

3. Add REST endpoint in backend (`PrologEditor/backend/src/`):
   - Route in `api.routes.ts`
   - Controller method in `prolog.controller.ts`

4. Add service method in frontend (`PrologEditor/frontend/src/app/services/prolog.service.ts`)

5. Add UI component or integrate into existing component

### Adding a New MCP Resource

```typescript
this.server.resource(
  "prolog-new-resource",
  "prolog://new/resource",
  {
    description: "Description",
    mimeType: "application/json",
  },
  async () => {
    const data = await this.fetchData();
    return {
      contents: [{
        uri: "prolog://new/resource",
        mimeType: "application/json",
        text: JSON.stringify(data, null, 2),
      }],
    };
  }
);
```

### Adding a New MCP Prompt

```typescript
this.server.prompt(
  "new_workflow",
  "Description of the workflow",
  {
    action: z.enum(["option1", "option2"]).describe("Action to perform"),
  },
  async ({ action }) => {
    return {
      messages: [{
        role: "assistant",
        content: { type: "text", text: "Instructions..." },
      }],
    };
  }
);
```

## Current Architecture

### Key Files

| File | Role |
|------|------|
| `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` | MCP Server (12 tools, 6 resources, 8 prompts) |
| `MCPGallery/mcp-mesh-sdk/src/services/PrologSessionManager.ts` | Session lifecycle |
| `MCPGallery/mcp-mesh-sdk/src/services/PrologEngine.ts` | SWI-Prolog wrapper |
| `MCPGallery/mcp-mesh-sdk/src/clients/PrologBackendClient.ts` | HTTP client for backend SQLite |
| `MCPGallery/mcp-mesh-sdk/src/BaseMCPServer.ts` | Base class for MCP servers |
| `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_PROLOG_MCP_SERVER_CONFIG.ts` | Server config |

### Build Chain

```bash
cd MCPGallery/mcp-core-sdk && npm run build   # Types first
cd ../mcp-mesh-sdk && npm run build            # Server second
cd ../../PrologEditor/backend && npm run build # Backend third
cd ../frontend && npm run build                # Frontend last
```

---

<details>
<summary><strong>Backend Client Pattern & EuridiceBot Configuration</strong> (click to expand)</summary>

## PrologBackendClient Pattern

For tools that need SQLite data without creating MCP cycles, use `PrologBackendClient`:

```typescript
// In MCPPrologServer constructor
this.backendClient = createPrologBackendClient();

// In handler method
async handleNewDbTool(): Promise<any> {
  const toolName = 'prolog_new_db_tool';

  try {
    if (!await this.backendClient.isHealthy()) {
      return this.createBackendErrorResponse(toolName, 'health_check');
    }

    const data = await this.backendClient.someMethod();
    return { success: true, data };
  } catch (error: any) {
    return this.createBackendErrorResponse(toolName, 'fetch_data', error);
  }
}
```

**Backend URL**: `process.env.PROLOG_BACKEND_URL || 'http://localhost:8000/api'`

The `createBackendErrorResponse` helper provides verbose diagnostic info including:
- Tool name and failure phase
- Backend URL attempted
- Timestamp and error details
- Hint for resolution

## EuridiceBot Configuration

EuridiceBot connects MCPPrologServer to the Socket.IO mesh:

```typescript
private initEuridiceBot(): void {
  const socketUrl = process.env.SOCKET_MESH_URL || "http://localhost:3010";
  const serverName = DEFAULT_PROLOG_MCP_SERVER_CONFIG.id;

  this.euridiceBot = new AlephScriptClient(serverName, socketUrl);

  this.euridiceBot.initTriggersDefinition.push(() => {
    const ROOM_NAME = serverName + "_ROOM";

    this.euridiceBot.io.emit("CLIENT_REGISTER", { ... });
    this.euridiceBot.io.emit("CLIENT_SUSCRIBE", { room: ROOM_NAME });
    this.euridiceBot.room("MAKE_MASTER", {
      features: [
        "PROLOG_QUERY",
        "PROLOG_ASSERT",
        "PROLOG_RETRACT",
        "PROLOG_LOAD_FILE",
        "PROLOG_GET_SESSIONS",
        "PROLOG_CREATE_SESSION",
        "PROLOG_DESTROY_SESSION"
      ]
    }, ROOM_NAME);
  });
}
```

### Adding New Socket.IO Capability

1. Add feature name to the `features` array
2. Register event handler:

```typescript
this.euridiceBot.io.on("GET_NEW_CAPABILITY", async (data: any) => {
  l.info("EuridiceBot received NEW_CAPABILITY request", data);
  const result = await this.handleNewCapability(data);
  this.euridiceBot.room("SET_NEW_CAPABILITY", result, ROOM_NAME);
});
```

## Frontend Environment Restrictions

**Prohibited imports in Angular frontend**:

| Module | Reason | Alternative |
|--------|--------|-------------|
| `socket.io` | Node.js internals | `socket.io-client` |
| `fs`, `path` | Node.js only | N/A |
| `swipl-stdio` | Native executable | Via MCP Server |
| `better-sqlite3` | Native bindings | Via REST API |

**Required tsconfig.json setting**:
```json
{ "compilerOptions": { "skipLibCheck": true } }
```

**Safe imports** (isomorphic):
```typescript
import type { PrologSession } from '@alephscript/mcp-core-sdk/browser';
```

## Antipatterns

| Antipattern | Symptom | Fix |
|-------------|---------|-----|
| Duplicate types | Interface in 2+ places | Move to core-sdk |
| Socket in frontend | Error TS1192 Module "http" | Use `/browser` + skipLibCheck |
| Tool without REST | Works in Copilot, not in app | Add endpoint |
| MCP cycle | MCP -> Backend -> MCP | Use PrologBackendClient |

## Error Handling Pattern

MCPPrologServer uses global error handlers to prevent crashes from swipl-stdio:

```typescript
process.on('uncaughtException', (error) => {
  l.e('Uncaught exception', { error: error.message });
  // Don't exit - keep server running
});

process.on('unhandledRejection', (reason) => {
  l.e('Unhandled rejection', { reason: String(reason) });
});
```

## OpenAPI Spec

REST API spec at: `/ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml`

## MCP Pack

AgentPrologBrain pack at: `/.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json`

</details>
