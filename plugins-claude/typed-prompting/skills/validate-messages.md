# Validate Messages

Validate JSON data against schemas using MCPTypedPromptServer's AJV-powered validator. Schemas are defined as TypeScript interfaces and compiled to JSON Schema.

## Quick Start

**Prerequisites**: TypedPrompt MCP Server on port 3020, Backend on port 3019.

```bash
# Start backend
cd TypedPromptsEditor && npm install && npm run dev
# -> http://localhost:3019 (REST API)
# -> http://localhost:5000 (Web editor)
```

### Validate a Message

```
typed_validate_message({
  schemaId: 1,
  message: '{"pregunta": "Hola", "urgencia": "alta"}'
})

# Returns:
# { success: true, valid: true, report: { valid: true, errors: [] } }
```

### Convert TypeScript to JSON Schema

```
typed_convert_interface({
  typescript: "interface ConsultaUsuario { pregunta: string; contexto?: string; urgencia: 'baja' | 'media' | 'alta'; }",
  name: "ConsultaUsuario"
})
```

### Suggest Ontology for a Use Case

```
typed_suggest_ontology({
  useCase: "Validate support queries from users",
  domain: "Scriptorium",
  constraints: ["Must include urgency level", "Support Spanish"]
})
```

## MCP Tools Reference

| Tool | Parameters | Returns |
|------|-----------|---------|
| `typed_validate_message` | `schemaId`, `message` (JSON string) | Validation report |
| `typed_convert_interface` | `typescript`, `name?` | JSON Schema string |
| `typed_list_schemas` | `libraryId?`, `category?` | Schema list |
| `typed_get_schema` | `schemaId` | Schema details |
| `typed_create_schema` | `name`, `typescript`, `jsonSchema`, `category?`, `libraryId?` | Created schema |
| `typed_list_libraries` | (none) | Library list |
| `typed_suggest_ontology` | `useCase`, `domain?`, `constraints?` | Ranked suggestions |

## Validation Modes

When schemas are installed on agents, three enforcement modes are available:

| Mode | Behavior |
|------|----------|
| `strict` | Reject invalid messages (do not process) |
| `warn` | Log warning but process message |
| `log` | Only record, no effect on flow |

**Recommendation**: Start with `warn` or `log` during development. Switch to `strict` after testing.

## Schema Structure

```typescript
interface Schema {
  id: number;
  name: string;
  typeScript: string;      // TypeScript source
  jsonSchema: string;      // Generated JSON Schema
  category?: string;       // Organization category
  labels?: string[];       // Search tags
  description?: string;
  libraryId?: number;      // Parent library
}
```

---

<details>
<summary><strong>Validation Workflow Examples</strong> (click to expand)</summary>

## Full Validation Workflow

### 1. Design Schema

```typescript
// TypeScript source
interface ConsultaUsuario {
  pregunta: string;
  contexto?: string;
  urgencia: 'baja' | 'media' | 'alta';
}

// Generated JSON Schema
{
  "type": "object",
  "properties": {
    "pregunta": { "type": "string" },
    "contexto": { "type": "string" },
    "urgencia": { "enum": ["baja", "media", "alta"] }
  },
  "required": ["pregunta", "urgencia"]
}
```

### 2. Create Schema via MCP

```
typed_create_schema({
  name: "consulta-usuario",
  typescript: "interface ConsultaUsuario { ... }",
  jsonSchema: '{"type":"object","properties":{...}}',
  category: "Scriptorium"
})
```

### 3. Validate Messages

```
// Valid message
typed_validate_message({
  schemaId: 1,
  message: '{"pregunta":"Que hora es?","urgencia":"baja"}'
})
// -> { valid: true, errors: [] }

// Invalid message (missing required field)
typed_validate_message({
  schemaId: 1,
  message: '{"pregunta":"Hola"}'
})
// -> { valid: false, errors: [{ path: "/", message: "must have required property 'urgencia'" }] }
```

## Validation with Banderas (Auditor Integration)

Auditors can use schemas for structured validation:

| Bandera | Schema Use |
|---------|-----------|
| @blueflag | Evidence schemas (verifiable claims) |
| @blackflag | Power schemas (actors, interests) |
| @redflag | Resource schemas (materials, costs) |
| @yellowflag | Limits schemas (conditions, exceptions) |
| @orangeflag | Registry schemas (genre, style) |

## REST API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/schemas` | GET | List schemas |
| `/api/schemas` | POST | Create schema |
| `/api/validate` | POST | Validate message |
| `/api/convert` | POST | TypeScript to JSON Schema |
| `/api/libraries` | GET | List libraries |

Swagger docs: `http://localhost:3019/api-docs`

## Web Editor Pages

| Route | Function |
|-------|----------|
| `/` | Dashboard |
| `/schema-creator` | Visual schema editor |
| `/interface-to-schema` | TypeScript to JSON Schema converter |
| `/prompt-to-interface` | Generate interface from prompt |
| `/validator` | Message validator |
| `/repository` | Library manager |
| `/sdk-docs` | API documentation |

## MCP Resources

| Resource | URI | Description |
|----------|-----|-------------|
| `typed-prompt-schema` | `typed-prompt://schemas/{id}` | Schema by ID |
| `typed-prompt-library` | `typed-prompt://libraries/{id}` | Library by ID |
| `typed-prompt-schemas-list` | `typed-prompt://schemas` | All schemas |

## Related Files

- **MCP Server**: `/MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts`
- **Backend Client**: `/MCPGallery/mcp-mesh-sdk/src/clients/TypedPromptBackendClient.ts`
- **Types**: `/MCPGallery/mcp-core-sdk/src/types/typed-prompts/`
- **Schema storage**: `/ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/`
- **Validation logs**: `/ARCHIVO/PLUGINS/TYPED_PROMPTING/validation-logs/`

</details>
