# Generate Code from Specs

Auto-generate client libraries, server stubs, and static documentation from OpenAPI and AsyncAPI specifications.

## Quick Usage

Provide: **spec ID or path**, **output type** (client | server | docs), **language** (typescript | python | go | nodejs), optional **destination**.

Default destination: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/generated/{project}/{language}/`

## Supported Generators

### OpenAPI

| Language | Generator | Command |
|----------|-----------|---------|
| TypeScript | typescript-fetch | `openapi-generator-cli generate -g typescript-fetch` |
| Python | python | `openapi-generator-cli generate -g python` |
| Node.js | nodejs-express-server | `openapi-generator-cli generate -g nodejs-express-server` |
| Go | go | `openapi-generator-cli generate -g go` |

### AsyncAPI

| Language | Template | Command |
|----------|----------|---------|
| Node.js | @asyncapi/nodejs-template | `asyncapi generate fromTemplate` |
| Python | @asyncapi/python-paho-template | `asyncapi generate fromTemplate` |

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

### Prerequisites

```bash
# OpenAPI Generator (requires Java 11+)
npm install -g @openapitools/openapi-generator-cli

# AsyncAPI CLI
npm install -g @asyncapi/cli

# Redocly CLI (lightweight alternative for OpenAPI)
npm install -g @redocly/cli

# Verify installation
openapi-generator-cli version
asyncapi --version
redocly --version
```

### OpenAPI: TypeScript Client (Recommended)

```bash
openapi-generator-cli generate \
  -i ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/{project}/openapi.yaml \
  -g typescript-fetch \
  -o ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/generated/{project}/typescript-client \
  --additional-properties=npmName=@scriptorium/{project}-client,supportsES6=true,withInterfaces=true
```

**Generated structure:**
```
generated/{project}/typescript-client/
├── src/
│   ├── apis/RulesApi.ts
│   ├── models/Rule.ts
│   └── runtime.ts
├── package.json
└── tsconfig.json
```

**Usage:**
```typescript
import { RulesApi, Configuration } from '@scriptorium/{project}-client';
const config = new Configuration({ basePath: 'http://localhost:8000/api' });
const rulesApi = new RulesApi(config);
const rules = await rulesApi.getAllRules();
```

### OpenAPI: Python Client

```bash
openapi-generator-cli generate \
  -i specs/{project}/openapi.yaml \
  -g python \
  -o generated/{project}/python-client \
  --additional-properties=packageName=scriptorium_{project}
```

**Usage:**
```python
from scriptorium_project import ApiClient, RulesApi
client = ApiClient()
client.configuration.host = 'http://localhost:8000/api'
rules_api = RulesApi(client)
rules = rules_api.get_all_rules()
```

### OpenAPI: Express Server Stub

```bash
openapi-generator-cli generate \
  -i specs/{project}/openapi.yaml \
  -g nodejs-express-server \
  -o generated/{project}/express-stub
```

### AsyncAPI: Node.js MQTT Server

```bash
asyncapi generate fromTemplate \
  specs/{project}/asyncapi.yaml \
  @asyncapi/nodejs-template \
  -o generated/{project}/nodejs-mqtt-server \
  -p server=mosquitto
```

### Configuration File

Create `.openapi-generator-config.yaml` for repeated generation:

```yaml
npmName: "@scriptorium/{project}-client"
npmVersion: "1.0.0"
supportsES6: true
withInterfaces: true
useSingleRequestParameter: true
typeMappings:
  DateTime: Date
```

Usage: `openapi-generator-cli generate -i spec.yaml -g typescript-fetch -o ./out -c .openapi-generator-config.yaml`

### Static Documentation

```bash
# OpenAPI (Redoc)
redocly build-docs specs/{project}/openapi.yaml --output docs/{project}/api-docs.html

# AsyncAPI (HTML)
asyncapi generate fromTemplate specs/{project}/asyncapi.yaml @asyncapi/html-template -o docs/{project}/asyncapi-docs
```

### Post-Generation

```bash
cd generated/{project}/typescript-client
npm install && npm run build

cd generated/{project}/python-client
pip install -e .
```

### Always Validate Before Generating

```bash
# OpenAPI
redocly lint specs/{project}/openapi.yaml

# AsyncAPI
asyncapi validate specs/{project}/asyncapi.yaml
```

### Troubleshooting

| Error | Solution |
|-------|----------|
| Java not found | `brew install openjdk@11` or use Docker |
| Template not found | `npm install -g @asyncapi/{template}` |
| Incorrect types | Check `components/schemas` with `format` fields |
| Could not resolve reference | Verify `$ref` paths |

### CI/CD Integration

```yaml
# .github/workflows/generate-clients.yml
name: Generate API Clients
on:
  push:
    paths: ['specs/**/*.yaml']
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          npm install -g @openapitools/openapi-generator-cli
          openapi-generator-cli generate -i specs/{project}/openapi.yaml -g typescript-fetch -o generated/{project}/typescript-client
      - run: |
          git add generated/
          git commit -m "chore: regenerate API clients" || true
          git push
```

</details>
