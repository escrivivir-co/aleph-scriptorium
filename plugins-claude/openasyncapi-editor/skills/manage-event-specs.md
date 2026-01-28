# Manage Event Specs (AsyncAPI)

Create, catalog, validate, and edit AsyncAPI specifications for event-driven APIs in the Scriptorium.

## Quick Usage

Describe what you need: catalog an AsyncAPI spec, validate it, set up AsyncAPI Studio for visualization, or list event-driven specs.

## Catalog a New Spec

Provide: **project name**, **spec file path**, **type** (asyncapi).

Process: Validate existence, extract metadata, generate catalog ID (`{project}-asyncapi`), optionally copy to `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/{project}/`, register in `catalog.json`.

## Validate a Spec

```bash
asyncapi validate specs/project/asyncapi.yaml
```

## AsyncAPI Studio

- **Online**: https://studio.asyncapi.com/
- **Docker**: `docker run -p 3210:3000 asyncapi/studio`
- **CLI**: `asyncapi start studio --file specs/project/asyncapi.yaml`
- **VS Code**: Extension `asyncapi.asyncapi-preview`

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

### Catalogation Flow

1. **Detect spec**: Search for `asyncapi.yaml`, `asyncapi.json` in project
2. **Extract metadata** from `info:` block
3. **Generate ID**: `{project}-asyncapi`
4. **Copy to local**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/{project}/asyncapi.yaml`
5. **Validate**: `asyncapi validate specs/{project}/asyncapi.yaml`
6. **Register in catalog.json**

### catalog.json Entry

```json
{
  "id": "project-asyncapi",
  "project": "ProjectName",
  "type": "asyncapi",
  "spec_version": "3.0.0",
  "api_version": "1.0.0",
  "title": "Project Event API",
  "description": "Event-driven interface",
  "origin": "path/to/origin/asyncapi.yaml",
  "local": "specs/project/asyncapi.yaml",
  "status": "validated",
  "cataloged_at": "ISO8601",
  "validated_at": "ISO8601",
  "tags": ["mqtt", "websocket"]
}
```

### AsyncAPI Code Generation

```bash
# Node.js MQTT Server
asyncapi generate fromTemplate \
  specs/project/asyncapi.yaml \
  @asyncapi/nodejs-template \
  -o generated/project/nodejs-mqtt-server \
  -p server=mosquitto

# TypeScript NATS Client
asyncapi generate fromTemplate \
  specs/project/asyncapi.yaml \
  @asyncapi/typescript-nats-template \
  -o generated/project/typescript-client

# HTML Documentation
asyncapi generate fromTemplate \
  specs/project/asyncapi.yaml \
  @asyncapi/html-template \
  -o docs/project/asyncapi-docs
```

### Available Templates

| Template | Protocol |
|----------|----------|
| `@asyncapi/nodejs-template` | MQTT, AMQP |
| `@asyncapi/python-paho-template` | MQTT |
| `@asyncapi/html-template` | Documentation |
| `@asyncapi/typescript-nats-template` | NATS |

### Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid AsyncAPI document" | Verify version field (3.0.0) |
| Channels not appearing | Check `channels:` structure |
| Port occupied | Use `-p 3211:3000` for Docker |
| Template not found | `npm install -g @asyncapi/{template-name}` |

### Known Specs in Scriptorium

| Project | Status | Location |
|---------|--------|----------|
| PrologEditor | v1.0.0 | `BACKLOG_BORRADORES/Enero_02_PrologEditor_API_Contracts/api-specs/` |

</details>
