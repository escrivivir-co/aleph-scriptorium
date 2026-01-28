---
description: Validate JSON data against typed prompt schemas
argument-hint: Optional schema name or JSON file path
allowed-tools: ["Read", "Bash", "Grep", "Glob", "TodoWrite"]
---

# Validate Messages

Validate JSON data against schemas using MCPTypedPromptServer's AJV-powered validator.

1. If a schema name is given, use it; otherwise list available schemas
2. Accept JSON input (file path or inline)
3. Run validation and report results with detailed error messages
