---
description: Create and manage backlog borradores in DISCO
argument-hint: Optional action (create, list, approve, plan)
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash", "TodoWrite", "AskUserQuestion"]
---

# Backlog Management

Manage backlog borradores in DISCO.

Actions:
- **create** - Create a new backlog draft (borrador)
- **list** - Show existing borradores and their status
- **approve [name]** - Approve a borrador for sprint inclusion
- **plan** - Plan sprint from approved borradores

If no action given, list current borradores.
