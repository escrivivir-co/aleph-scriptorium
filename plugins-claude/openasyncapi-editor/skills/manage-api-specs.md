# Manage API Specs (OpenAPI)

Create, catalog, validate, and edit OpenAPI specifications for REST APIs in the Scriptorium.

## Quick Usage

Describe what you need: catalog a new spec, validate an existing one, list all cataloged specs, or edit a spec.

## Catalog a New Spec

Provide: **project name**, **spec file path**, **type** (openapi).

Process: Validate existence, extract metadata (title, version, description), generate catalog ID (`{project}-openapi`), optionally copy to `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/{project}/`, register in `catalog.json`.

## Validate a Spec

```bash
redocly lint specs/project/openapi.yaml
```

Status outcomes: `validated` (no errors), `draft` (warnings only), `error` (validation failures).

## List Catalog

Reads `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/catalog.json` and displays all OpenAPI specs with project, version, status, and origin path.

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

### Catalogation Flow

1. **Detect spec**: Search for `openapi.yaml`, `openapi.json`, `swagger.yaml` in project
2. **Extract metadata** from `info:` block (title, version, description)
3. **Generate ID**: `{project}-openapi` (e.g., `prolog-editor-openapi`)
4. **Copy to local** (optional): `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/{project}/openapi.yaml`
5. **Validate**: `redocly lint specs/{project}/openapi.yaml`
6. **Register in catalog.json** with appropriate status

### catalog.json Entry

```json
{
  "id": "project-openapi",
  "project": "ProjectName",
  "type": "openapi",
  "spec_version": "3.1.0",
  "api_version": "1.0.0",
  "title": "Project REST API",
  "description": "Brief description",
  "origin": "path/to/origin/openapi.yaml",
  "local": "specs/project/openapi.yaml",
  "status": "validated",
  "cataloged_at": "ISO8601",
  "validated_at": "ISO8601"
}
```

### Spec Status Lifecycle

| Status | Meaning | Action |
|--------|---------|--------|
| `draft` | Not validated | Needs validation |
| `validated` | Passed linting | Ready for use |
| `deprecated` | Obsolete | Mark for cleanup |
| `error` | Validation failed | Fix errors |

### Common Validation Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `schema-validation-error` | Invalid schema | Check $ref and types |
| `no-server-description` | Server without description | Add description field |
| `operation-operationId` | Missing operationId | Add to each operation |

### Sync from Origin

When the origin spec changes:
```bash
diff origin/openapi.yaml specs/project/openapi.yaml
cp origin/openapi.yaml specs/project/
redocly lint specs/project/openapi.yaml
# Update catalog.json validated_at and api_version
```

### Swagger UI Setup

**Docker**: `docker run -p 8080:8080 -e SWAGGER_JSON=/spec/openapi.yaml -v $(pwd)/specs/project:/spec swaggerapi/swagger-ui`

**Express**: Install `swagger-ui-express` + `yamljs`, mount at `/api-docs`.

**Static**: `redocly build-docs specs/project/openapi.yaml -o docs/project/index.html`

### Integration with TypedPrompting

Extract schemas from `components.schemas` for use as TypedPrompt schemas:
```typescript
const schema = spec.components.schemas.Rule;
// Convert to TypedPrompt format
```

</details>
