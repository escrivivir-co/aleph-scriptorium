# List MCP Tools

Discovers and catalogs available MCP servers and their exposed tools without executing them.

## Quick Usage

```
/list-mcp-tools
```

Scans the runtime environment for MCP tool functions and organizes them by server family.

## What It Shows

```
📡 MCP Server Status

DevOps Server (localhost:3003)
├─ get_server_status       Monitor server health
├─ get_server_info         Get server metadata
└─ execute_task            Run DevOps automation

Playwright Browser (localhost:3002)
├─ browser_install         Install browser engine
├─ browser_tabs            List open tabs
└─ browser_network_requests Inspect network traffic

AlephAlpha/Novelist (localhost:3066)
├─ listCharacters          Get character catalog
└─ getDocumentation        Fetch docs

Copilot Logs (localhost:3100)
├─ get_usage_metrics       Token usage stats
└─ get_diagnostics         Runtime diagnostics
```

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## Objective

Catalog MCP Tool Calling capabilities exposed to Claude Code by VS Code MCP servers, without executing or testing them.

## Detection Strategy

### Step 1: Detect Available Capabilities

- Query MCP functions exposed in the runtime (names starting with `mcp_`)
- Prioritize common families:
  - `mcp_devops-*`
  - `mcp_playwright_*`
  - `mcp_alephalpha_*`
  - `mcp_copilot-logs-*`

### Step 2: Check Tools by Family

#### DevOps / Mesh
- `mcp_devops-mcp-se_get_server_status`
- `mcp_devops-mcp-se_get_server_info`

#### Playwright
- `mcp_playwright_browser_*` family
- Functions: `install`, `tabs`, `network_requests`

#### Novelist / AlephAlpha
- `mcp_alephalpha_alephAlpha_listCharacters`
- `mcp_alephalpha_alephAlpha_getDocumentation`
- Health check via `/health` endpoint

#### Copilot Logs
- `mcp_copilot-logs-_get_usage_metrics`
- `mcp_copilot-logs-_get_diagnostics`

### Step 3: Generate Structured Output

Present a list grouped by server with:
- Server name and endpoint
- Available tools
- Brief description of each tool
- Health status (if available)

## Output Format

```markdown
# MCP Tools Catalog

Generated: {timestamp}

## Active Servers

### 1. DevOps MCP Server
- **Endpoint**: http://localhost:3003
- **Status**: 🟢 Online
- **Tools**: 12

| Tool | Description | Parameters |
|------|-------------|------------|
| get_server_status | Monitor server health | server_id |
| get_server_info | Get metadata | server_id |
| execute_task | Run automation | task_id, params |
| ... | ... | ... |

### 2. Playwright Browser
- **Endpoint**: http://localhost:3002
- **Status**: 🟢 Online
- **Tools**: 8

| Tool | Description | Parameters |
|------|-------------|------------|
| browser_install | Install browser engine | browser_type |
| browser_tabs | List open tabs | context_id |
| ... | ... | ... |

## Offline Servers

### 3. Prolog MCP Server
- **Endpoint**: http://localhost:3006
- **Status**: 🔴 Offline
- **Expected tools**: 12 (query, assert_fact, load_rules, ...)

## Summary

- **Total servers configured**: 9
- **Active servers**: 6
- **Offline servers**: 3
- **Total tools available**: 78
```

## Configuration Source

Tools are discovered from:
- `.vscode/mcp.json` (server endpoints)
- Runtime MCP function registry
- Optional: OpenAPI specs in `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/`

## Use Cases

1. **Onboarding**: New developers see available capabilities
2. **Debugging**: Verify which servers are responding
3. **Documentation**: Auto-generate tool catalog
4. **Planning**: Know what's available before designing workflows

## Related

- MCP Configuration: `.vscode/mcp.json`
- Server Tasks: `.vscode/tasks.json` (start/stop)
- Plugin: `mcp-presets` (tool management)

</details>
