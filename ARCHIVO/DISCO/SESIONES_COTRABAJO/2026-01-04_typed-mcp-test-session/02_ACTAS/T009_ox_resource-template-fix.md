# Acta T009: Fix BUG-TPE-003 (Resource Templates)

**Agente**: @ox  
**Inicio**: 2026-01-04 19:55  
**Fin**: 2026-01-04 20:10  
**Estado**: ✅ COMPLETADO

---

## Contexto

Post-cierre de sesión, se identificó que BUG-TPE-003 (resources not found) tenía solución aplicando `ResourceTemplate` del MCP SDK.

## Root Cause

El SDK MCP distingue entre:
1. **Resources estáticos**: URIs fijas sin parámetros
2. **Resource Templates**: URIs con patrones `{variable}` que requieren la clase `ResourceTemplate`

El código original usaba URIs string con `{id}` pero no las registraba como templates.

## Fix Aplicado

### 1. Import añadido

```typescript
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";
```

### 2. Schema by ID (antes)

```typescript
this.server.resource(
    "typed-prompt-schema",
    "typed-prompt://schemas/{id}",  // String con {id} no es template
    { description: "...", mimeType: "..." },
    async (uri) => { ... }
);
```

### 3. Schema by ID (después)

```typescript
this.server.resource(
    "typed-prompt-schema",
    new ResourceTemplate("typed-prompt://schemas/{id}", { list: undefined }),
    { description: "...", mimeType: "..." },
    async (uri, { id }) => {  // id extraído automáticamente
        const schemaId = parseInt(id as string, 10);
        // ...
    }
);
```

## Verificación

```bash
# Resource templates list
curl ... "resources/templates/list"
# Result: [
#   { name: "typed-prompt-schema", uriTemplate: "typed-prompt://schemas/{id}" },
#   { name: "typed-prompt-library", uriTemplate: "typed-prompt://libraries/{id}" }
# ]

# TC-R02: Read schema by ID
curl ... "resources/read" uri="typed-prompt://schemas/1"
# Result: ✅ success=true, schema="Product Interface"
```

## Recursos Modificados

| Recurso | URI/Template | Tipo |
|---------|--------------|------|
| typed-prompt-schemas-list | `typed-prompt://schemas` | Static Resource |
| typed-prompt-schema | `typed-prompt://schemas/{id}` | ResourceTemplate |
| typed-prompt-library | `typed-prompt://libraries/{id}` | ResourceTemplate |

## Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| [MCPTypedPromptServer.ts](../../../../../../MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts) | Import ResourceTemplate, refactor 2 resources a templates |

## Resultado

- ✅ BUG-TPE-003 FIXED
- ✅ TC-R01 (schemas list) PASS
- ✅ TC-R02 (schema by ID) PASS
- ✅ 3 recursos MCP operativos (1 static + 2 templates)

## Aprendizaje

> Para URIs con parámetros `{variable}`, usar `new ResourceTemplate(uri, { list: undefined })` en lugar de string URI.

El callback recibe `(uri, variables)` donde `variables` es un objeto con los valores extraídos del URI.

---

**Próximo paso**: Actualizar mcpspec.yaml con documentación de resource templates.
