---
description: Import, export, or assign MCP presets to agents
argument-hint: Optional action (import, export, assign, list)
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash", "TodoWrite", "AskUserQuestion"]
---

# MCP Presets

Manage MCP server presets for Scriptorium agents.

Actions:
- **list** - Show available presets
- **import [file]** - Import presets from a JSON file
- **export [name]** - Export preset as Zeus-compatible bundle
- **assign [preset] [agent]** - Assign a preset to an agent

If no action provided, show available presets and ask what to do.
