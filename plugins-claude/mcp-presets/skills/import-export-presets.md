---
name: Import Export Presets
description: "Import MCP presets from JSON files, export as Zeus-compatible bundles, assign presets to agents"
---

# Import & Export MCP Presets

## Quick Reference

Presets are stored in `ARCHIVO/PLUGINS/MCP_PRESETS/presets/` as individual JSON files.
Agent assignments are tracked in `ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json`.

### Import a preset

1. Read the source JSON file
2. Validate required fields: `id` (or generate timestamp), `name`, `prompt`
3. Check for ID conflicts in `ARCHIVO/PLUGINS/MCP_PRESETS/presets/`
4. Save to `ARCHIVO/PLUGINS/MCP_PRESETS/presets/{id}.json`

### Export a preset

1. Read preset from `ARCHIVO/PLUGINS/MCP_PRESETS/presets/{id}.json`
2. Wrap in export envelope:
```json
{
  "exportedAt": "ISO8601",
  "source": "aleph-scriptorium",
  "preset": { "...preset data..." }
}
```

### Export all presets (bundle)

```json
{
  "exportedAt": "ISO8601",
  "source": "aleph-scriptorium",
  "count": 3,
  "presets": [ {}, {}, {} ]
}
```

### List presets

Scan `ARCHIVO/PLUGINS/MCP_PRESETS/presets/*.json` and display:

| ID | Name | Category | Items | Server | Assigned to |
|----|------|----------|-------|--------|-------------|

### Assign preset to agent

1. Verify preset exists in `ARCHIVO/PLUGINS/MCP_PRESETS/presets/{id}.json`
2. Verify agent exists in `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{agentId}.recipe.json` or `ARCHIVO/DISCO/TALLER/ELENCO/{agentId}/`
3. Update `ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json`
4. Optionally inject `mcpPresets` field into agent recipe

---

<details>
<summary>PresetModel Schema (Zeus-compatible)</summary>

### Required fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (timestamp recommended) |
| `name` | string | Human-readable name |
| `prompt` | string | Associated prompt |

### Optional fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Extended description |
| `category` | enum | General, Development, Analysis, Creative, productivity |
| `parameters` | object | Customizable parameters |
| `serverId` | string | Associated MCP server |
| `items` | array | List of tools/resources/prompts |
| `createdAt` | ISO8601 | Creation date |
| `updatedAt` | ISO8601 | Last modification date |

### Example preset

```json
{
  "id": "1759359152317",
  "name": "DevOps Status Preset",
  "description": "Herramientas para monitoreo de servidores",
  "category": "Development",
  "prompt": "Analiza el estado del servidor y genera reporte",
  "parameters": {},
  "serverId": "playwright",
  "items": ["get_server_info", "get_server_status", "resource://logs"],
  "createdAt": "2025-12-23T10:00:00Z",
  "updatedAt": "2025-12-23T10:00:00Z"
}
```

### Valid categories

- `General` -- General purpose
- `Development` -- Software development, DevOps
- `Analysis` -- Data analysis, auditing
- `Creative` -- Writing, design, creativity
- `productivity` -- Automation, productivity

</details>

<details>
<summary>Agent assignment details</summary>

### agent-assignments.json schema

```json
{
  "version": "1.0.0",
  "assignments": {
    "tarotista": ["preset-id-1", "preset-id-2"],
    "nonsi": ["preset-id-3"]
  },
  "lastUpdated": "2025-12-23T10:00:00Z"
}
```

### Recipe injection

When assigning to an agent, optionally inject into the recipe:

```json
{
  "nombre": "tarotista",
  "base": ["yellowflag"],
  "mcpPresets": [
    {
      "presetId": "1759359152317",
      "presetName": "DevOps Status",
      "tools": ["get_server_info", "get_server_status"]
    }
  ]
}
```

### Rules

- One agent can have multiple presets
- One preset can be assigned to multiple agents
- No duplicate assignments
- Do not modify presets in `examples/` directory

### Pack files

The plugin includes Prolog-based packs in `.github/plugins/mcp-presets/packs/`:
- `AgentPrologBrain.pack.json` -- Pack for agents with Prolog reasoning
- `iot-app.template` / `simu.template` / `state-machine.template` -- Prolog templates

Pack schema: `.github/plugins/mcp-presets/schemas/pack.schema.json`

</details>
