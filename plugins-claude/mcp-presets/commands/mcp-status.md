---
description: Check health and status of all MCP servers
allowed-tools: ["Read", "Bash", "Grep", "Glob", "TodoWrite"]
---

# MCP Status

Run a health check on all configured MCP servers.

1. Read .vscode/mcp.json to find configured servers
2. Check each server's connectivity and status
3. Report results as a dashboard table showing: server name, type, port, status (up/down), uptime
