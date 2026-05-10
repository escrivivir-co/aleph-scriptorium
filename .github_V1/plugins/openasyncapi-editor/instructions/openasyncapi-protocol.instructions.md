---
description: "Protocolo de gestión del catálogo de especificaciones OpenAPI, AsyncAPI y MCPSpec."
applyTo: "ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/**/*.yaml, ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/catalog.json, ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/mcpspec.schema.json"
---

# Instrucciones: Protocolo OpenAsyncAPI + MCPSpec

> Activación contextual: al trabajar con catálogo, specs API o contratos MCP del plugin.

---

## 1. Estructura canónica del plugin

```
ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/
├── catalog.json              # Índice maestro de OpenAPI / AsyncAPI / MCPSpec
├── catalog.schema.json       # Schema del catálogo
├── mcpspec.schema.json       # Canon local para descriptores MCP del Scriptorium
├── specs/
│   ├── {proyecto}/
│   │   ├── openapi.yaml
│   │   ├── asyncapi.yaml
│   │   └── mcpspec.yaml
│   └── ...
├── generated/
│   └── {proyecto}/
│       └── {lenguaje}/
└── docs/
    └── {proyecto}/
        └── index.html
```

---

## 2. Regla conceptual clave

`mcpspec.yaml` es un **descriptor local canónico** para la superficie MCP de un servidor.

No sustituye la schema oficial de MCP ni pretende ser el formato wire del protocolo. Su papel
es documentar, de forma comparable a OpenAPI/AsyncAPI:

- primitives MCP (`tools`, `resources`, `resourceTemplates`, `prompts`)
- `capabilities` negociadas por el servidor
- expectativas del cliente (`sampling`, `roots`, `elicitation`, `tasks`) cuando importan
- datos de runtime y metadatos editoriales

---

## 3. Schema de `catalog.json`

Cada entrada del catálogo puede ser `openapi`, `asyncapi` o `mcpspec`.

Campos relevantes:

- `spec_version`: versión del formato o edición local del descriptor
- `protocol_version`: opcional; útil para specs cuyo ancla semántica es la release del protocolo
  (por ejemplo MCP `2025-11-25`)
- `api_version`: versión del servidor/API documentado
- `origin`: puede ser `null` si la spec nace o vive canónicamente dentro del plugin

---

## 4. Flujo de catalogación

### Paso 1: Detectar spec

Buscar en proyecto:

- `**/openapi.yaml`, `**/openapi.json`
- `**/asyncapi.yaml`, `**/asyncapi.json`
- `**/swagger.yaml`, `**/swagger.json`
- `**/mcpspec.yaml`

### Paso 2: Extraer metadatos

#### OpenAPI / AsyncAPI

- `info.title` → `catalog.title`
- `info.version` → `catalog.api_version`
- `info.description` → `catalog.description`

#### MCPSpec

- `info.title` o `implementation.title` o `implementation.name` → `catalog.title`
- `info.version` → `catalog.api_version`
- `protocolVersion` → `catalog.protocol_version`
- `info.description` → `catalog.description`
- `mcpVersion` o edición local → `catalog.spec_version`

### Paso 3: Generar ID

```
{proyecto}-{tipo}
```

Ejemplos:

- `prolog-editor-openapi`
- `prolog-editor-asyncapi`
- `prolog-editor-mcpspec`

### Paso 4: Copiar a local (opcional)

Si la spec vive fuera del plugin, copiar a `specs/{proyecto}/`.

### Paso 5: Validar

Validar según el tipo de spec.

### Paso 6: Registrar

Añadir entrada a `catalog.json` con estado `draft`, `validated`, `deprecated` o `error`.

---

## 5. Validación por tipo

### OpenAPI

| Tool | Uso |
|------|-----|
| `redocly lint` | lint principal |
| `openapi-generator-cli validate` | validación básica adicional |
| `spectral lint` | reglas personalizadas |

### AsyncAPI

| Tool | Uso |
|------|-----|
| `asyncapi validate` | validación oficial |

### MCPSpec

La validación tiene dos capas.

#### Capa estática

1. Validar contra `mcpspec.schema.json`
2. Comprobar alineación editorial con la spec oficial MCP:
   - `outputSchema` preferido sobre `output`
   - `resourceTemplates` cuando existan URIs parametrizadas
   - `expectedClientCapabilities` para features cliente
   - `annotations` oficiales sin mezclar extensiones locales en el núcleo normativo

#### Capa de runtime

Si el servidor es ejecutable:

1. arrancarlo
2. abrir MCP Inspector
3. verificar `initialize`, capabilities reales, tools/resources/prompts y errores de ejecución

---

## 6. Canon local para `mcpspec.yaml`

### Top-level recomendado

```yaml
kind: scriptorium-mcpspec
protocolVersion: "2025-11-25"
mcpVersion: "1.0.0"
info: {}
implementation: {}
server: {}
capabilities: {}
expectedClientCapabilities: {}
tools: []
resources: []
resourceTemplates: []
prompts: []
components: {}
metadata: {}
x-scriptorium: {}
```

### Reglas de modelado

1. `capabilities` representa **capabilities del servidor**.
2. `sampling`, `roots` y `elicitation` viven en `expectedClientCapabilities`, no en `capabilities`.
3. Tools usan `inputSchema` y, si aplica, `outputSchema`.
4. Resources usan `uri` como identificador estable y `mimeType` explícito cuando se conozca.
5. Prompts documentan argumentos con `name`, `title`, `description`, `required`.
6. Extensiones del Scriptorium van en `metadata` o `x-scriptorium`.

### Compatibilidad legacy

Se toleran temporalmente:

- flags booleanos en `capabilities`
- alias `output`
- anotaciones locales incrustadas en el descriptor

Pero el objetivo es migrar gradualmente al canon anterior.

Para nuevas specs, partir de:

- `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/templates/mcpspec.template.yaml`

Y usar como guía editorial viva:

- `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/docs/mcpspec-canon.md`

---

## 7. Generación de código

### OpenAPI / AsyncAPI

Mantener el flujo actual de generación con:

- `openapi-generator-cli`
- `@asyncapi/cli`

### MCPSpec

No existe un equivalente universal a `openapi-generator` para MCP.

Cuando la fuente principal es `mcpspec.yaml`, el camino recomendado es:

1. usar `@modelcontextprotocol/sdk` para cliente/servidor MCP;
2. usar helpers MCP del SDK de Anthropic cuando el consumidor sea Claude/API de mensajes;
3. usar Inspector para validación de runtime;
4. tratar la MCPSpec como fuente de verdad documental y de contratos, no como input de codegen universal.

---

## 8. Publicación y visualización

### OpenAPI

- Redoc / Swagger UI

### AsyncAPI

- AsyncAPI Studio

### MCPSpec

- documentación estática basada en el propio YAML y referencias del plugin
- validación interactiva con MCP Inspector

Hoy no hay un viewer estático equivalente a Swagger UI para `mcpspec.yaml` dentro del plugin; la
paridad se logra combinando **schema local + documentación + Inspector**.

---

## 9. Commit convention

```bash
# Catalogar nueva spec
feat(script/plugins): catalogar spec {proyecto} v{version}

# Sincronizar existente
fix(script/plugins): sync spec {proyecto} desde origen

# Canonizar MCPSpec
docs(script/plugins): canonizar mcpspec de {proyecto}

# Publicar documentación
docs(script/plugins): publicar docs API {proyecto}
```

---

## 10. Integración con TypedPrompting

Las specs pueden seguir alimentando a TypedPrompting:

- OpenAPI: desde `components.schemas`
- AsyncAPI: desde payload schemas
- MCPSpec: desde `tools[*].inputSchema`, `tools[*].outputSchema`, `prompts[*].arguments` y
  componentes reutilizables definidos en `components`
