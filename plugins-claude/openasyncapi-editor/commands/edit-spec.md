---
description: Create or edit OpenAPI/AsyncAPI specifications
argument-hint: Optional spec file path or name
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash", "TodoWrite", "AskUserQuestion"]
---

# Edit Spec

Help the user create or edit API specifications.

1. If a spec path is given, open and edit it
2. If no path, ask whether to create OpenAPI (REST) or AsyncAPI (events) spec
3. For new specs, use templates and guide through required fields
4. Validate the spec after editing
5. Optionally generate code stubs from the spec
