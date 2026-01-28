# TypedPrompt MCP Development

Extend MCPTypedPromptServer with new tools, resources, and prompts. The server uses AJV for JSON Schema validation and TypedPromptBackendClient for persistence.

## Quick Start

**MCP Server source**: `/MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts` (618 lines)

### Adding a New MCP Tool

1. Define the tool in `MCPTypedPromptServer.setupTools()`:

```typescript
this.server.tool(
  "typed_new_tool",
  "Description of the tool",
  {
    param1: z.string().describe("Parameter description"),
  },
  async ({ param1 }) => {
    const result = await this.handleNewTool(param1);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);
```

2. Implement the handler:

```typescript
private async handleNewTool(param1: string): Promise<any> {
  try {
    const data = await this.backendClient.someMethod(param1);
    return { success: true, data };
  } catch (error: any) {
    l.e("handleNewTool error", { error: error.message });
    return { success: false, error: error.message };
  }
}
```

3. Add endpoint in TypedPromptsEditor backend if needed (`TypedPromptsEditor/server/`)

### Adding a New MCP Resource

```typescript
// Static resource
this.server.resource(
  "typed-prompt-new-resource",
  "typed-prompt://new/path",
  {
    description: "Description",
    mimeType: "application/json",
  },
  async (uri) => {
    const data = await this.fetchData();
    return {
      contents: [{
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify(data, null, 2),
      }],
    };
  }
);

// Dynamic resource template
this.server.resource(
  "typed-prompt-dynamic",
  new ResourceTemplate("typed-prompt://items/{id}", { list: undefined }),
  {
    description: "Item by ID",
    mimeType: "application/json",
  },
  async (uri, { id }) => {
    const data = await this.getItem(parseInt(id as string, 10));
    return {
      contents: [{
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify(data, null, 2),
      }],
    };
  }
);
```

## Current Architecture

### Key Files

| File | Role |
|------|------|
| `MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts` | MCP Server (7 tools, 3 resources, 3 prompts) |
| `MCPGallery/mcp-mesh-sdk/src/clients/TypedPromptBackendClient.ts` | HTTP client for backend |
| `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG.ts` | Server config |
| `MCPGallery/mcp-mesh-sdk/src/BaseMCPServer.ts` | Base class |
| `MCPGallery/mcp-core-sdk/src/types/typed-prompts/` | DRY type definitions |

### Build Chain

```bash
cd MCPGallery/mcp-core-sdk && npm run build   # Types first
cd ../mcp-mesh-sdk && npm run build            # Server second
```

---

<details>
<summary><strong>TypedPromptBackendClient, Validation Engine & Type Definitions</strong> (click to expand)</summary>

## TypedPromptBackendClient

The client communicates with the TypedPromptsEditor REST backend:

**Backend URL**: `process.env.TYPED_PROMPT_BACKEND_URL || 'http://localhost:3019/api'`

### Available Methods

```typescript
// Schemas
backendClient.getAllSchemas(libraryId?, category?): Promise<Schema[]>
backendClient.getSchema(id): Promise<{ success: boolean; schema?: Schema }>
backendClient.createSchema(data): Promise<{ success: boolean; schema?: Schema }>

// Libraries
backendClient.getAllLibraries(): Promise<Library[]>
backendClient.getLibrary(id): Promise<Library>

// Conversion
backendClient.convertInterface(typescript, name?): Promise<{ success: boolean; jsonSchema?: string }>
```

## AJV Validation Engine

The server uses AJV (Another JSON Validator) configured with `allErrors: true` and `verbose: true`:

```typescript
import Ajv from "ajv";

this.ajv = new Ajv({ allErrors: true, verbose: true });

// Validation flow:
// 1. Fetch schema from backend by ID
// 2. Parse JSON Schema string
// 3. Parse message JSON string
// 4. Compile schema with AJV
// 5. Validate message
// 6. Return ValidationReport
```

### ValidationReport Structure

```typescript
interface ValidationReport {
  valid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  path: string;     // JSONPath to the error (e.g., "/urgencia")
  message: string;  // Human-readable error message
}
```

## Type Definitions

### Schema

```typescript
interface Schema {
  id: number;
  name: string;
  typeScript: string;       // TypeScript interface source
  jsonSchema: string;       // JSON Schema (stringified)
  category?: string;
  labels?: string[];
  description?: string;
  libraryId?: number;
  createdAt?: string;
  updatedAt?: string;
}
```

### Library

```typescript
interface Library {
  id: number;
  name: string;
  description?: string;
  category?: string;
  schemas?: Schema[];
  createdAt?: string;
  updatedAt?: string;
}
```

### validationSchema (Agent Recipe Field)

```typescript
interface AgentValidationSchema {
  input: string[];          // Schema names for input validation
  output: string[];         // Schema names for output validation
  mode: 'strict' | 'warn' | 'log';
}
```

### communicationProtocol (ARG Obra Field)

```typescript
interface CommunicationProtocol {
  version: string;
  contracts: Record<string, string>;  // "sender->receiver": "schema-name"
  enforcement: 'strict' | 'warn' | 'log';
}
```

## Ontology Suggestion Algorithm

The `typed_suggest_ontology` tool uses keyword matching with weighted scoring:

1. **Name match** (+30): First word of use case appears in schema name
2. **Category match** (+40): Domain parameter matches schema category
3. **Label match** (+20): Any use case keyword appears in schema labels
4. **Description match** (+10): Any use case word appears in schema description

Results are sorted by relevance (descending) and limited to top 5.

## Dependencies

| Package | Purpose |
|---------|---------|
| `ajv` | JSON Schema validation engine |
| `zod` | MCP tool parameter validation |
| `@modelcontextprotocol/sdk` | MCP protocol SDK |

## Related Files

- **MCP Server**: `/MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts`
- **Backend Client**: `/MCPGallery/mcp-mesh-sdk/src/clients/TypedPromptBackendClient.ts`
- **Types**: `/MCPGallery/mcp-core-sdk/src/types/typed-prompts/`
- **Base Server**: `/MCPGallery/mcp-mesh-sdk/src/BaseMCPServer.ts`
- **Config**: `/MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG.ts`
- **Blueprint**: `/docs/blueprint-typed-prompting.md`

</details>
