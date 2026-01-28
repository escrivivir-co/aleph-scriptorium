---
description: Manage Node-RED flows - create, import, export, organize
argument-hint: Optional action (create, import, export, list)
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash", "TodoWrite", "AskUserQuestion"]
---

# Manage Flows

Work with Node-RED flow projects in the WIRING directory.

Actions:
- **create [name]** - Create a new flow project
- **import [file]** - Import a flow from JSON
- **export [name]** - Export a flow
- **list** - Show available flows

If no action given, list existing flows.
