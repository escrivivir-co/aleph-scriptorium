---
description: Manage agent recipes - create, inspect, edit, and replay
argument-hint: Optional recipe name or action (list, inspect, replay)
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash", "TodoWrite"]
---

# Manage Recipes

Help the user manage agent recipes for reproducible agent generation.

Actions:
- **list** - Show available recipes
- **inspect [name]** - Show recipe details
- **replay [name]** - Re-execute a recipe to generate an agent
- **edit [name]** - Modify an existing recipe

If no action specified, list available recipes and ask what the user wants to do.
