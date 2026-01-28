---
name: Manage MCP Servers
description: "Start, stop, restart, and health-check MCP servers defined in .vscode/mcp.json"
---

# Manage MCP Servers

## Quick Reference

9 MCP servers run on ports 3002-3100. All are HTTP type, defined in `.vscode/mcp.json`.

### Health check a single server

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT/health
```

### Health check all servers

```bash
for port in 3002 3003 3004 3006 3007 3020 3050 3066 3100; do
  status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/health 2>/dev/null || echo "DOWN")
  echo "Port $port: $status"
done
```

### Start a server (from project root)

```bash
cd MCPGallery/mcp-mesh-sdk && npm run start:<server-name>
```

Server name mapping:
- `npm start` -> devops-mcp-server (3003)
- `npm run start:launcher` -> launcher-server (3050)
- `npm run start:wiki` -> wiki-browser-server (3002)
- `npm run start:state` -> state-machine-server (3004)
- `npm run start:prolog` -> prolog-mcp-server (3006)

### Port-to-server mapping

| Port | Server | npm script |
|------|--------|------------|
| 3002 | wiki-browser-server | `start:wiki` |
| 3003 | devops-mcp-server | `start` (default) |
| 3004 | state-machine-server | `start:state` |
| 3006 | prolog-mcp-server | `start:prolog` |
| 3007 | aaia-mcp-server | `start:aaia` |
| 3020 | typed-prompt-mcp-server | `start:tpe` |
| 3050 | launcher-server | `start:launcher` |
| 3066 | AlephAlpha | `start:aleph` |
| 3100 | copilot-logs-mcp-server | `start:logs` |

---

<details>
<summary>Advanced: VS Code task integration</summary>

### Starting via VS Code Tasks

The `.vscode/tasks.json` defines tasks prefixed with `MCP:` for server management:

- **`MCP: Start [Launcher]`** -- Starts launcher-server on port 3050 from `MCPGallery/mcp-mesh-sdk`
- **`MCP: Start [Model]`** -- Starts mcp-model-sdk on port 4001
- **`MCP: Start [DevOps]`** -- Starts devops-mcp-server on port 3003
- **`MCP: Start [AAIA]`** -- Starts aaia-mcp-server on port 3007
- **`TPE: Start [MCP]`** -- Starts typed-prompt-mcp-server on port 3020

### Compound task: MCPChannels

The `MCPChannels` compound task starts both launcher and model servers together, creating the base mesh infrastructure.

### Background process management

To check if a server is already running:
```bash
lsof -i :PORT
```

To stop a server:
```bash
lsof -ti :PORT | xargs kill -9
```

### Build prerequisites

Before starting servers, ensure SDKs are built:
```bash
npm run build --prefix MCPGallery/mcp-core-sdk
npm run build --prefix MCPGallery/mcp-mesh-sdk
```

</details>

<details>
<summary>Advanced: MCP Mesh architecture</summary>

### MCPGallery Components

| Component | Port | Role |
|-----------|------|------|
| mcp-mesh-sdk | varies | Individual MCP servers (the mesh) |
| mcp-model-sdk | 4001 | Preset REST service |
| zeus | 3012 | UI for management and catalog |
| mcp-channels-sdk | 3000 | WebSocket server for real-time |
| mcp-inspector-sdk | -- | MCP protocol inspector |

### Server discovery

The launcher-server (port 3050) can orchestrate other servers. It acts as a meta-server that can start/stop other mesh members.

### Configuration file

All server URLs are in `.vscode/mcp.json`:
```json
{
  "servers": {
    "devops-mcp-server": { "type": "http", "url": "http://localhost:3003" },
    "launcher-server": { "type": "http", "url": "http://localhost:3050" },
    "wiki-browser-server": { "type": "http", "url": "http://localhost:3002" },
    "state-machine-server": { "type": "http", "url": "http://localhost:3004" },
    "prolog-mcp-server": { "type": "http", "url": "http://localhost:3006" },
    "typed-prompt-mcp-server": { "type": "http", "url": "http://localhost:3020" },
    "copilot-logs-mcp-server": { "type": "http", "url": "http://localhost:3100" },
    "aaia-mcp-server": { "type": "http", "url": "http://localhost:3007" },
    "AlephAlpha": { "type": "http", "url": "http://localhost:3066" }
  }
}
```

</details>
