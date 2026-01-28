---
description: Manage Prolog sessions and develop agent brains
argument-hint: Optional action (session, brain, query)
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash", "TodoWrite", "AskUserQuestion"]
---

# Prolog Editor

Work with SWI-Prolog sessions and agent brain development.

Actions:
- **session** - Create, query, or destroy Prolog sessions via MCPPrologServer
- **brain [agent]** - Create or edit .brain.pl files for Teatro agent characters
- **query [session] [goal]** - Execute a Prolog query in a session

If no action given, show active sessions and ask what to do.
