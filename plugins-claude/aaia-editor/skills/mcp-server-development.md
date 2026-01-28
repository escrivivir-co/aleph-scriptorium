---
name: mcp-server-development
description: "Develop, test, and extend MCPAAIAServer tools, resources, and prompts with integrated CLI workflows."
trigger: "When the user needs to add new MCP tools, debug MCPAAIAServer, or extend AAIA CLI capabilities."
---

# MCP Server Development - AAIA Tools & CLI

Develop, test, and extend MCPAAIAServer tools with integrated CLI workflows.

## Quick Start

**MCPAAIAServer Status**: ✅ **Complete** (532 lines, 9 tools, 3 resources, 3 prompts)

**Location**: `/MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts`

```bash
# Start MCP server
cd MCPGallery/mcp-mesh-sdk
npm run start:aaia
# → Listening on port 3007

# Test with MCP Inspector
curl http://localhost:3007/tools
```

## Existing Tools (9)

| Tool | Function | Status |
|------|----------|--------|
| `aaia_list_apps` | List available FIA applications | ✅ Implemented |
| `aaia_create_session` | Create new AAIA session | ✅ Implemented |
| `aaia_list_sessions` | List active sessions | ✅ Implemented |
| `aaia_list_fias` | List FIAs in session | ✅ Implemented |
| `aaia_step_fia` | Execute FIA reasoning cycle | ✅ Implemented |
| `aaia_send_percepto` | Send input to mundo | ✅ Implemented |
| `aaia_query_mundo` | Query mundo state | ✅ Implemented |
| `aaia_set_fia_state` | Control FIA (PLAY/PAUSE/STOP) | ✅ Implemented |
| `aaia_destroy_session` | Destroy session | ✅ Implemented |

## Adding New Tools

### Example: Add `aaia_get_paradigm_info`

**Step 1**: Define tool in `setupTools()`

```typescript
// In MCPAAIAServer.ts, setupTools() method

{
  name: "aaia_get_paradigm_info",
  description: "Get detailed information about a specific FIA paradigm",
  inputSchema: {
    type: "object",
    properties: {
      paradigm: {
        type: "string",
        enum: [
          "logica", "simbolica", "conexionista", "sbc", "sbr",
          "situada", "sistemas", "cientifica", "gramaticas", "hibrido"
        ],
        description: "FIA paradigm name"
      }
    },
    required: ["paradigm"]
  }
}
```

**Step 2**: Implement handler

```typescript
case "aaia_get_paradigm_info": {
  const { paradigm } = args as { paradigm: string };

  const paradigmInfo = await this.sessionManager.getParadigmInfo(paradigm);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          paradigm,
          description: paradigmInfo.description,
          capabilities: paradigmInfo.capabilities,
          exampleFIAs: paradigmInfo.exampleFIAs,
          documentation: paradigmInfo.documentationUrl
        }, null, 2)
      }
    ]
  };
}
```

**Step 3**: Implement in SessionManager

```typescript
// In AAIASessionManager.ts

async getParadigmInfo(paradigm: string): Promise<ParadigmInfo> {
  const paradigmMap = {
    "logica": {
      description: "Razonamiento declarativo con Prolog",
      capabilities: ["deduction", "formal_verification", "logic_programming"],
      exampleFIAs: ["FIA-Logica", "ParadigmaLogica"],
      documentationUrl: "/AAIAGallery/alephscript/src/FIA/paradigmas/logica/README.md"
    },
    // ... more paradigms
  };

  return paradigmMap[paradigm] || { description: "Unknown paradigm" };
}
```

---

<details>
<summary><strong>Full MCP Development Guide</strong> (click to expand)</summary>

## Architecture: MCPAAIAServer

### Class Structure

```typescript
export class MCPAAIAServer extends BaseMCPServer {
  private sessionManager: AAIASessionManager;
  private persefonBot!: AlephScriptClient;

  constructor() {
    super(DEFAULT_AAIA_MCP_SERVER_CONFIG);
    this.sessionManager = new AAIASessionManager();
  }

  protected setupTools(): void { /* 9 tools */ }
  protected setupResources(): void { /* 3 resources */ }
  protected setupPrompts(): void { /* 3 prompts */ }
  private initPersefonBot(): void { /* Socket.IO client */ }
}
```

### Configuration

**File**: `/MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_AAIA_MCP_SERVER_CONFIG.ts`

```typescript
export const DEFAULT_AAIA_MCP_SERVER_CONFIG: MCPServerConfig = {
  id: "aaia-mcp-server",
  name: "AAIA MCP Server",
  version: "1.0.0",
  description: "Exposes AAIAGallery Runtime (FIAs + Mundos) via MCP protocol",
  port: 3007,
  transportType: "stdio",
  tools: [
    "aaia_create_session",
    "aaia_list_sessions",
    // ... 9 tools total
  ],
  resources: [
    "aaia://sessions",
    "aaia://apps/catalog",
    "aaia://paradigms"
  ],
  prompts: [
    "aaia_create_session",
    "aaia_step_cycle",
    "aaia_paradigms_guide"
  ]
};
```

## Tool Development Workflow

### 1. Design Tool API

**Questions**:
- What input does it need?
- What output does it produce?
- Is it idempotent? (can be called multiple times safely)
- Does it have side effects? (modifies state)

**Template**:

```typescript
{
  name: "aaia_<verb>_<noun>",
  description: "Clear, concise description of what it does",
  inputSchema: {
    type: "object",
    properties: {
      paramName: {
        type: "string",
        description: "What this parameter does",
        enum: ["value1", "value2"] // if applicable
      }
    },
    required: ["paramName"]
  }
}
```

### 2. Implement Handler Logic

**Pattern**:

```typescript
case "aaia_your_tool": {
  // 1. Extract and validate args
  const { param1, param2 } = args as YourToolArgs;

  // 2. Call service layer
  const result = await this.sessionManager.yourMethod(param1, param2);

  // 3. Emit Socket.IO event if needed
  if (this.persefonBot) {
    this.persefonBot.room("SET_YOUR_EVENT", result, "AAIA_ROOM");
  }

  // 4. Return MCP-formatted response
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
```

### 3. Add to SessionManager

**File**: `/MCPGallery/mcp-mesh-sdk/src/services/AAIASessionManager.ts`

```typescript
export class AAIASessionManager {
  private backendClient: AAIABackendClient;

  async yourMethod(param1: string, param2: number): Promise<YourResult> {
    // Delegate to backend
    const response = await this.backendClient.yourEndpoint(param1, param2);
    return response.data;
  }
}
```

### 4. Implement Backend Endpoint

**File**: `/AAIAGallery/backend/src/controllers/your.controller.ts`

```typescript
export class YourController {
  async handleYourEndpoint(req: Request, res: Response) {
    const { param1, param2 } = req.body;

    // Business logic
    const result = await this.yourService.process(param1, param2);

    res.json({ success: true, data: result });
  }
}
```

**File**: `/AAIAGallery/backend/src/routes/your.routes.ts`

```typescript
router.post('/your-endpoint', yourController.handleYourEndpoint);
```

### 5. Test with MCP Inspector

```bash
# Start server
npm run start:aaia

# In another terminal, use MCP Inspector CLI
mcp-inspector call aaia_your_tool --param1 "value" --param2 42
```

## CLI Integration

### Using AAIA Tools from CLI

**Option 1: Direct MCP calls**

```bash
# Using mcp-cli (if available)
mcp call aaia-mcp-server aaia_create_session '{"appId": "demo-logica"}'

# Using curl
curl -X POST http://localhost:3007/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "aaia_create_session",
    "arguments": {"appId": "demo-logica"}
  }'
```

**Option 2: LauncherServer**

```bash
# Using launcher-server to start/stop AAIA MCP
curl http://localhost:3050/servers/aaia-mcp-server/start

# Check status
curl http://localhost:3050/servers/aaia-mcp-server/status
```

**Option 3: VS Code Tasks**

```json
// In .vscode/tasks.json
{
  "label": "AAIA: Create Session",
  "type": "shell",
  "command": "curl",
  "args": [
    "-X", "POST",
    "http://localhost:8007/api/sessions",
    "-H", "Content-Type: application/json",
    "-d", "{\"appId\": \"demo-logica\"}"
  ],
  "presentation": {
    "reveal": "always",
    "panel": "new"
  }
}
```

## Resources Development

Resources provide read-only access to server state.

### Existing Resources

```typescript
{
  uri: "aaia://sessions",
  name: "Active AAIA sessions",
  description: "List of all active sessions with metadata"
}
```

### Adding New Resource

**Example: Paradigm Documentation**

```typescript
// In setupResources()
{
  uri: "aaia://paradigms/{paradigm}/docs",
  name: "Paradigm documentation",
  description: "Detailed docs for a specific FIA paradigm",
  mimeType: "text/markdown"
}

// Handler
case "aaia://paradigms/{paradigm}/docs": {
  const paradigm = uri.split('/')[2];

  const docsPath = `/AAIAGallery/alephscript/src/FIA/paradigmas/${paradigm}/README.md`;
  const docs = fs.readFileSync(docsPath, 'utf-8');

  return {
    contents: [
      {
        uri,
        mimeType: "text/markdown",
        text: docs
      }
    ]
  };
}
```

## Prompts Development

Prompts are interactive guides that help users compose tool calls.

### Existing Prompts

```typescript
{
  name: "aaia_create_session",
  description: "Guide to create a new AAIA session",
  arguments: [
    {
      name: "appId",
      description: "Application ID to load",
      required: true
    }
  ]
}
```

### Adding New Prompt

**Example: Interactive FIA Step Guide**

```typescript
// In setupPrompts()
{
  name: "aaia_interactive_step",
  description: "Interactive guide to execute FIA reasoning cycles",
  arguments: [
    {
      name: "sessionId",
      description: "Session ID",
      required: true
    },
    {
      name: "fiaIndex",
      description: "FIA index to execute",
      required: true
    },
    {
      name: "steps",
      description: "Number of steps to execute",
      required: false
    }
  ]
}

// Handler
case "aaia_interactive_step": {
  const { sessionId, fiaIndex, steps = 1 } = args;

  const prompt = `
# Interactive FIA Execution

**Session**: ${sessionId}
**FIA**: ${fiaIndex}
**Steps**: ${steps}

## What will happen:
1. FIA will execute ${steps} reasoning cycle(s)
2. For each cycle:
   - percepto is read from mundo
   - razona() is called
   - eferencia is emitted

## Commands to run:

\`\`\`bash
# Step ${steps} time(s)
for i in {1..${steps}}; do
  mcp call aaia-mcp-server aaia_step_fia '{"sessionId": "${sessionId}", "fiaIndex": ${fiaIndex}}'
done
\`\`\`

## Socket.IO Events to watch:

\`\`\`javascript
socket.on('FIA_STEP', (data) => console.log(data));
\`\`\`
  `;

  return {
    description: "Interactive FIA execution guide",
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: prompt
        }
      }
    ]
  };
}
```

## Testing Tools

### Unit Tests

**File**: `/MCPGallery/mcp-mesh-sdk/__tests__/MCPAAIAServer.test.ts`

```typescript
import { MCPAAIAServer } from '../src/MCPAAIAServer';

describe('MCPAAIAServer', () => {
  let server: MCPAAIAServer;

  beforeEach(() => {
    server = new MCPAAIAServer();
  });

  test('aaia_list_apps returns available apps', async () => {
    const result = await server.handleToolCall('aaia_list_apps', {});
    expect(result.content[0].text).toContain('demo-logica');
  });

  test('aaia_create_session creates valid session', async () => {
    const result = await server.handleToolCall('aaia_create_session', {
      appId: 'demo-logica'
    });

    const session = JSON.parse(result.content[0].text);
    expect(session).toHaveProperty('sessionId');
    expect(session).toHaveProperty('fias');
  });
});
```

### Integration Tests

**File**: `/MCPGallery/mcp-mesh-sdk/__tests__/integration/aaia-flow.test.ts`

```typescript
describe('AAIA Flow Integration', () => {
  test('Complete session lifecycle', async () => {
    // 1. List apps
    const apps = await server.handleToolCall('aaia_list_apps', {});
    expect(apps).toBeDefined();

    // 2. Create session
    const session = await server.handleToolCall('aaia_create_session', {
      appId: 'demo-logica'
    });
    const { sessionId } = JSON.parse(session.content[0].text);

    // 3. List FIAs
    const fias = await server.handleToolCall('aaia_list_fias', { sessionId });
    expect(fias).toBeDefined();

    // 4. Step FIA
    const step = await server.handleToolCall('aaia_step_fia', {
      sessionId,
      fiaIndex: 0
    });
    expect(step.content[0].text).toContain('eferencia');

    // 5. Destroy session
    const destroy = await server.handleToolCall('aaia_destroy_session', { sessionId });
    expect(destroy.content[0].text).toContain('true');
  });
});
```

### E2E Tests with Socket.IO

```typescript
import { io } from 'socket.io-client';

describe('Socket.IO Integration', () => {
  let socket: Socket;

  beforeAll((done) => {
    socket = io('http://localhost:3010/runtime');
    socket.on('connect', done);
  });

  test('FIA_STEP event is emitted', (done) => {
    socket.emit('join', { room: 'AAIA_ROOM', mode: 'observer' });

    socket.on('FIA_STEP', (data) => {
      expect(data).toHaveProperty('sessionId');
      expect(data).toHaveProperty('fiaIndex');
      expect(data).toHaveProperty('eferencia');
      done();
    });

    // Trigger step via MCP
    server.handleToolCall('aaia_step_fia', {
      sessionId: 'test-session',
      fiaIndex: 0
    });
  });
});
```

## Debugging Tools

### Enable Debug Logging

```bash
# Start server with debug logs
DEBUG=aaia:* npm run start:aaia

# Or in code
import { l } from '../Logger';

l.setLevel('debug');
l.debug('Tool called:', toolName, args);
```

### MCP Inspector

```bash
# Install MCP Inspector (if available)
npm install -g @modelcontextprotocol/inspector

# Connect to server
mcp-inspector connect http://localhost:3007

# Explore tools interactively
> tools
> call aaia_list_apps
> resources
> get aaia://sessions
```

### VS Code Debugging

**File**: `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug AAIA MCP Server",
      "program": "${workspaceFolder}/MCPGallery/mcp-mesh-sdk/src/index.ts",
      "preLaunchTask": "build:aaia",
      "outFiles": [
        "${workspaceFolder}/MCPGallery/mcp-mesh-sdk/dist/**/*.js"
      ],
      "env": {
        "NODE_ENV": "development",
        "DEBUG": "aaia:*"
      }
    }
  ]
}
```

## Best Practices

### 1. Tool Naming

- Use verb-noun pattern: `aaia_create_session`, `aaia_list_fias`
- Prefix with `aaia_` for namespace
- Be specific: `aaia_step_fia` > `aaia_execute`

### 2. Error Handling

```typescript
try {
  const result = await this.sessionManager.stepFIA(sessionId, fiaIndex);
  return { content: [{ type: "text", text: JSON.stringify(result) }] };
} catch (error) {
  l.error('Tool failed:', error);
  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        error: error.message,
        tool: "aaia_step_fia",
        args: { sessionId, fiaIndex }
      })
    }],
    isError: true
  };
}
```

### 3. Input Validation

```typescript
// In tool handler
const { sessionId, fiaIndex } = args as { sessionId: string; fiaIndex: number };

if (!sessionId || typeof sessionId !== 'string') {
  throw new Error('Invalid sessionId: must be non-empty string');
}

if (typeof fiaIndex !== 'number' || fiaIndex < 0) {
  throw new Error('Invalid fiaIndex: must be non-negative integer');
}
```

### 4. Documentation

```typescript
{
  name: "aaia_step_fia",
  description: "Executes one reasoning cycle (razona) on a FIA. " +
               "The FIA will process its current aferencias from the mundo, " +
               "apply its paradigm-specific logic, and emit an eferencia. " +
               "This is a stateful operation that advances the FIA's internal state.",
  inputSchema: {
    type: "object",
    properties: {
      sessionId: {
        type: "string",
        description: "UUID of the active AAIA session"
      },
      fiaIndex: {
        type: "number",
        description: "Zero-based index of the FIA in Runtime.threads"
      }
    },
    required: ["sessionId", "fiaIndex"]
  }
}
```

## Common Patterns

### Pattern 1: Delegating to Backend

```typescript
// MCP Tool → SessionManager → BackendClient → Express Backend

// In MCPAAIAServer
case "aaia_your_tool":
  const result = await this.sessionManager.yourMethod(args);
  return formatResponse(result);

// In AAIASessionManager
async yourMethod(args) {
  return await this.backendClient.yourEndpoint(args);
}

// In AAIABackendClient
async yourEndpoint(args) {
  const response = await axios.post(`${this.baseUrl}/your-endpoint`, args);
  return response.data;
}
```

### Pattern 2: Direct Runtime Access (after RuntimeBridge)

```typescript
// MCP Tool → SessionManager → RuntimeBridge → Runtime.threads

case "aaia_direct_tool":
  const fia = RuntimeBridge.getInstance().getFIA(fiaIndex);
  const result = fia.razona(fia.mundo, fia.objetivos[0]);
  return formatResponse(result);
```

### Pattern 3: Socket.IO Broadcast

```typescript
// After executing tool, notify observers

const result = await this.sessionManager.stepFIA(sessionId, fiaIndex);

if (this.persefonBot) {
  this.persefonBot.room("SET_FIA_STEP", {
    sessionId,
    fiaIndex,
    eferencia: result.eferencia,
    timestamp: new Date().toISOString()
  }, "AAIA_ROOM");
}

return formatResponse(result);
```

## Related Files

- [MCPAAIAServer.ts](../../MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts) - Main server implementation (532 lines)
- [AAIASessionManager.ts](../../MCPGallery/mcp-mesh-sdk/src/services/AAIASessionManager.ts) - Session manager (257 lines)
- [AAIABackendClient.ts](../../MCPGallery/mcp-mesh-sdk/src/clients/AAIABackendClient.ts) - Backend HTTP client (307 lines)
- [DEFAULT_AAIA_MCP_SERVER_CONFIG.ts](../../MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_AAIA_MCP_SERVER_CONFIG.ts) - Server config

</details>
