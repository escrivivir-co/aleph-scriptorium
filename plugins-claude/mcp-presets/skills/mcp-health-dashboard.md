---
name: MCP Health Dashboard
description: "Full status overview of all 9 MCP servers with port checks, uptime, and connectivity diagnostics"
---

# MCP Health Dashboard

## Quick Status Check

Run this to get the status of all 9 MCP servers:

```bash
echo "=== MCP Server Health Dashboard ==="
echo "Server                      Port   Status"
echo "-------------------------------------------"
for entry in "wiki-browser-server:3002" "devops-mcp-server:3003" "state-machine-server:3004" "prolog-mcp-server:3006" "aaia-mcp-server:3007" "typed-prompt-mcp-server:3020" "launcher-server:3050" "AlephAlpha:3066" "copilot-logs-mcp-server:3100"; do
  name="${entry%%:*}"
  port="${entry##*:}"
  code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 http://localhost:$port/health 2>/dev/null)
  if [ "$code" = "200" ]; then status="UP"; elif [ "$code" = "000" ]; then status="DOWN"; else status="ERR($code)"; fi
  printf "%-28s %-6s %s\n" "$name" "$port" "$status"
done
```

### Check a single server

```bash
curl -s http://localhost:PORT/health | python3 -m json.tool
```

### Check which ports are in use

```bash
lsof -i -P -n | grep -E '300[2-7]|3020|3050|3066|3100'
```

---

<details>
<summary>Server details and diagnostics</summary>

### Server Registry

| Server | Port | Source Directory | Start Command |
|--------|------|-----------------|---------------|
| wiki-browser-server | 3002 | `MCPGallery/mcp-mesh-sdk` | `npm run start:wiki` |
| devops-mcp-server | 3003 | `MCPGallery/mcp-mesh-sdk` | `npm start` |
| state-machine-server | 3004 | `MCPGallery/mcp-mesh-sdk` | `npm run start:state` |
| prolog-mcp-server | 3006 | `MCPGallery/mcp-mesh-sdk` | `npm run start:prolog` |
| aaia-mcp-server | 3007 | `MCPGallery/mcp-mesh-sdk` | `npm run start:aaia` |
| typed-prompt-mcp-server | 3020 | `MCPGallery/mcp-mesh-sdk` | `npm run start:tpe` |
| launcher-server | 3050 | `MCPGallery/mcp-mesh-sdk` | `npm run start:launcher` |
| AlephAlpha | 3066 | `MCPGallery/mcp-mesh-sdk` | `npm run start:aleph` |
| copilot-logs-mcp-server | 3100 | `MCPGallery/mcp-mesh-sdk` | `npm run start:logs` |

### Supporting services (not in mcp.json)

| Service | Port | Source | Purpose |
|---------|------|--------|---------|
| mcp-model-sdk | 4001 | `MCPGallery/mcp-model-sdk` | Preset REST API |
| Zeus UI | 3012 | `MCPGallery/zeus` | Management dashboard |
| mcp-channels WS | 3000 | `MCPGallery/mcp-channels-sdk` | WebSocket transport |

### Troubleshooting

**Server won't start**: Check if port is already in use:
```bash
lsof -ti :PORT
```

**Server starts but health check fails**: Ensure dependencies are built:
```bash
npm run build --prefix MCPGallery/mcp-core-sdk
npm run build --prefix MCPGallery/mcp-mesh-sdk
```

**Prolog server requires SWI-Prolog**: Install with:
```bash
brew install swi-prolog  # macOS
```

### Configuration reference

All server URLs are defined in `.vscode/mcp.json`. The VS Code tasks in `.vscode/tasks.json` use problem matchers with patterns like:
- `beginsPattern`: `^.*Starting MCP.*$`
- `endsPattern`: `^.*MCP Server running on port XXXX.*$`

</details>

<details>
<summary>Catalog and mesh discovery</summary>

### Zeus catalog endpoint

When Zeus is running (port 3012), query the consolidated catalog:

```bash
curl -s http://localhost:3012/api/catalog | python3 -m json.tool
```

This returns all servers with their tools, resources, and prompts.

### catalog.json schema

```json
{
  "version": "1.0.0",
  "servers": [
    {
      "serverId": "devops-mcp-server",
      "name": "DevOps MCP",
      "url": "http://localhost:3003",
      "status": "connected",
      "tools": ["get_server_info", "get_server_status"],
      "resources": [],
      "prompts": []
    }
  ],
  "lastUpdated": "ISO8601"
}
```

Stored at: `ARCHIVO/PLUGINS/MCP_PRESETS/catalog.json`

### MCP Inspector

For protocol-level debugging, use the MCP Inspector:
```bash
cd MCPGallery/mcp-inspector-sdk && npm start
```

</details>
