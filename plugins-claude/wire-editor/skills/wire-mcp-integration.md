# Wire MCP Integration

Configure asynchronous feed-based communication between Node-RED flows and Scriptorium agents via JSON feeds.

## Quick Usage

Describe the communication you need: which flow produces data, which agent consumes it, and what data format is exchanged.

## Feed Architecture

```
Node-RED Flow --> writes entry --> feeds/commands.json --> Agent reads
Agent         --> writes response --> feeds/responses.json --> Node-RED reads
```

All feeds live in `ARCHIVO/DISCO/WIRING/feeds/`.

## Create a Feed

Provide: **feed name** (kebab-case), **type** (command | response | event), **producer** (flow or agent), **consumer** (agent or flow), optional **payload schema**.

## Feed Types

| Type | Typical Direction | Use |
|------|-------------------|-----|
| `command` | Node-RED to Agent | User commands, requests |
| `response` | Agent to Node-RED | Results, answers |
| `event` | Bidirectional | Notifications, logs, state changes |

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

### Feed JSON Schema

```json
{
  "feed_id": "string (unique)",
  "version": "1.0.0",
  "schema": "command-feed | response-feed | event-feed",
  "created_at": "ISO8601",
  "producer": "who writes",
  "consumer": "who reads",
  "entries": [
    {
      "id": "entry-uuid",
      "timestamp": "ISO8601",
      "type": "command | response | event",
      "source": "string (who wrote)",
      "payload": {},
      "processed": false,
      "processed_by": null,
      "processed_at": null
    }
  ]
}
```

### Read Protocol (Agent Side)

1. Read feed file and filter `processed: false`
2. Process each entry
3. Mark `processed: true`, set `processed_by` and `processed_at`
4. If there is a response, write to the response feed

### Write Protocol (Node-RED Side)

1. Flow generates message
2. Node formats as entry
3. Writes to feed JSON (append)
4. Does not modify existing entries

### Subflow Template for Writing

```json
{
  "id": "write-{name}",
  "type": "subflow",
  "name": "Write to {name} feed",
  "info": "Writes an entry to the {name} feed",
  "in": [{ "x": 50, "y": 30 }],
  "out": [{ "x": 350, "y": 30 }],
  "nodes": [
    {
      "type": "function",
      "func": "msg.payload = {\n  id: crypto.randomUUID(),\n  timestamp: new Date().toISOString(),\n  type: '{type}',\n  source: 'node-red',\n  payload: msg.payload,\n  processed: false\n};\nreturn msg;"
    },
    {
      "type": "file",
      "filename": "ARCHIVO/DISCO/WIRING/feeds/{name}.json",
      "appendNewline": true,
      "operation": "append"
    }
  ]
}
```

### Payload Schema Example

```json
{
  "payload_schema": {
    "type": "object",
    "properties": {
      "command": { "type": "string" },
      "args": { "type": "array" },
      "user": { "type": "string" }
    },
    "required": ["command"]
  }
}
```

### catalog.json Feed Entry

```json
{
  "id": "{name}",
  "path": "feeds/{name}.json",
  "schema": "{type}",
  "producer": "{producer}",
  "consumer": "{consumer}",
  "created_at": "{ISO8601}"
}
```

### HefestoBot Socket.IO Integration

For real-time scenarios, HefestoBot operates in `WIRING_ROOM` via Socket.IO (port configurable). Feeds remain the persistent layer while Socket.IO provides live notification that new entries are available.

### Example: Kick Commands to Tarotista

- **Feed**: `kick-commands` (type: command)
- **Producer**: Flow "kick-tarotista" (Node-RED)
- **Consumer**: Agent Tarotista (Scriptorium)
- **Payload**: `{ "command": "!tirada", "args": ["amor"], "user": "username" }`

</details>
