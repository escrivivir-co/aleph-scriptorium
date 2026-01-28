# Manage Schema Packs

Create, edit, and organize schema libraries for typed message validation. Install schemas into agent recipes and ARG obra communication protocols.

## Quick Start

### List Available Schemas

```
typed_list_schemas()
# Returns all schemas with id, name, category, labels

typed_list_schemas({ libraryId: 1 })
# Filter by library

typed_list_schemas({ category: "Scriptorium" })
# Filter by category
```

### List Libraries

```
typed_list_libraries()
# Returns all schema libraries with counts
```

### Create a New Schema

```
typed_create_schema({
  name: "respuesta-agente",
  typescript: "interface RespuestaAgente { mensaje: string; confianza: number; fuentes?: string[]; }",
  jsonSchema: '{"type":"object","properties":{"mensaje":{"type":"string"},"confianza":{"type":"number","minimum":0,"maximum":1},"fuentes":{"type":"array","items":{"type":"string"}}},"required":["mensaje","confianza"]}',
  category: "Scriptorium",
  libraryId: 1
})
```

### Install in Agent Recipe (AGENT_CREATOR)

Add `validationSchema` to a recipe JSON:

```json
{
  "name": "mi-agente",
  "base": ["aleph"],
  "validationSchema": {
    "input": ["consulta-usuario"],
    "output": ["respuesta-agente"],
    "mode": "warn"
  }
}
```

### Install in ARG Obra (ARG_BOARD)

Add `communicationProtocol` to an obra:

```json
{
  "id": "mi-obra",
  "titulo": "Demo",
  "communicationProtocol": {
    "version": "1.0.0",
    "contracts": {
      "tarotista->usuario": "schema-lectura-tarot",
      "usuario->tarotista": "schema-pregunta-consulta"
    },
    "enforcement": "warn"
  }
}
```

## Library Structure

A library is a collection of related schemas grouped by domain:

```json
{
  "id": 1,
  "name": "Scriptorium Agents",
  "description": "Schemas for agent communication in the Scriptorium",
  "schemas": ["consulta-usuario", "respuesta-agente", "auditoria-bandera"]
}
```

---

<details>
<summary><strong>Ontology Design Workflow & Integration Patterns</strong> (click to expand)</summary>

## Ontology Design Workflow

### Mode Asistente (Design)

```
1. User describes use case
   "I need to validate support queries from users"

2. Analyze requirements
   - Entities: User, Query, Response
   - Relations: User -> Query -> Response
   - Constraints: urgency levels, required fields

3. Propose TypeScript interface
   interface ConsultaUsuario {
     pregunta: string;
     contexto?: string;
     urgencia: 'baja' | 'media' | 'alta';
   }

4. Generate JSON Schema
   typed_convert_interface({ typescript: "...", name: "ConsultaUsuario" })

5. Save schema
   typed_create_schema({ ... })
```

### Mode Gestor (Install)

```
1. Validate schema
   typed_get_schema({ schemaId: 1 })

2. Locate agent
   Find recipe in AGENT_CREATOR templates

3. Inject validationSchema
   Edit recipe JSON to add validation block

4. Test with sample messages
   typed_validate_message({ schemaId: 1, message: "..." })
```

## Suggest Ontology for Use Case

The `typed_suggest_ontology` tool performs keyword matching against existing schemas:

```
typed_suggest_ontology({
  useCase: "Real-time sensor data validation for IoT agents",
  domain: "IoT",
  constraints: ["Temperature ranges", "Humidity thresholds"]
})

# Returns ranked suggestions:
# [
#   { schemaId: 5, name: "sensor-data", relevance: 70, reason: "Category matches domain" },
#   { schemaId: 12, name: "telemetry-event", relevance: 30, reason: "Name matches use case" }
# ]
```

Relevance scoring:
- Name match: +30 points
- Category match: +40 points
- Label match: +20 points
- Description match: +10 points

## Communication Contracts

Define typed contracts between agents:

```
Agent A  --[schema-request]-->  Agent B
Agent B  --[schema-response]--> Agent A
```

Each direction has a named schema. The `enforcement` field controls behavior on validation failure.

## Storage Locations

| Type | Path |
|------|------|
| Custom schemas | `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/custom/` |
| Example schemas | `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/examples/` |
| Libraries | `ARCHIVO/PLUGINS/TYPED_PROMPTING/libraries/` |
| Validation logs | `ARCHIVO/PLUGINS/TYPED_PROMPTING/validation-logs/` |
| Editor data | `TypedPromptsEditor/data/stored-prompts.json` |
| DRY types | `MCPGallery/mcp-core-sdk/src/types/typed-prompts/` |
| OpenAPI specs | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/` |

## Best Practices

- One library = one semantic domain (do not mix domains)
- Start with `warn` mode, move to `strict` after testing
- Always test schemas with `typed_validate_message` before installing
- Use descriptive labels for searchability
- Document schema purpose in the description field

## What NOT to Do

- Do not create schemas without a clear use case
- Do not install `strict` mode without thorough testing
- Do not hardcode API keys in schema definitions
- Do not ignore validation errors -- always investigate

</details>
