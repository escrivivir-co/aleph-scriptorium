tools. Whether you're building an AI-powered IDE, enhancing a chat interface, or creating
# Referencia local — MCPSpec canónica para OpenAsyncAPI Editor

> **Objetivo**: aterrizar la especificación oficial de MCP en un formato `mcpspec.yaml`
> útil para este repositorio, sin confundir el descriptor local con el protocolo oficial.

---

## Fuentes de verdad

- Índice de documentación MCP: https://modelcontextprotocol.io/llms.txt
- Spec oficial (release base): https://modelcontextprotocol.io/specification/2025-11-25/index
- Schema reference oficial: https://modelcontextprotocol.io/specification/2025-11-25/schema
- Server features overview: https://modelcontextprotocol.io/specification/2025-11-25/server/index
- Tools: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
- Resources: https://modelcontextprotocol.io/specification/2025-11-25/server/resources
- Prompts: https://modelcontextprotocol.io/specification/2025-11-25/server/prompts
- Inspector: https://modelcontextprotocol.io/docs/tools/inspector

---

## Aclaración importante: qué es y qué no es `mcpspec.yaml`

En este plugin, `mcpspec.yaml` **no** es el "wire schema" oficial de MCP ni reemplaza a la
schema oficial publicada por MCP.

Aquí se usa como un **descriptor local canónico** para documentar un servidor MCP con la misma
función que cumplen `openapi.yaml` y `asyncapi.yaml` en sus dominios:

- **OpenAPI** describe superficies REST/HTTP.
- **AsyncAPI** describe superficies event-driven/mensajería.
- **MCPSpec** describe la **superficie MCP** del servidor: tools, resources, prompts,
  capabilities, expectativas del cliente y metadatos de runtime.

La regla de oro es esta:

> `mcpspec.yaml` puede tener metadatos locales del Scriptorium, pero sus primitivas deben
> mapear limpiamente a la spec oficial de MCP.

---

## Modelo oficial que debe reflejar la MCPSpec

La spec oficial distingue tres primitivas de servidor con una jerarquía de control muy útil:

| Primitive | Control principal | Propósito |
|-----------|-------------------|-----------|
| `prompts` | usuario | plantillas o workflows invocados explícitamente |
| `resources` | aplicación/host | contexto que el cliente adjunta o consulta |
| `tools` | modelo | funciones que el modelo puede descubrir e invocar |

Esta distinción debe quedar visible en cualquier `mcpspec.yaml` del repo.

---

## Canon top-level recomendado

```yaml
kind: scriptorium-mcpspec
protocolVersion: "2025-11-25"
mcpVersion: "1.0.0"

info:
  title: ExampleServer MCP
  version: 1.0.0
  description: MCP surface for ExampleServer

implementation:
  name: example-server
  title: Example Server
  version: 1.0.0

server:
  transport: streamable-http
  port: 3000

capabilities:
  tools:
    listChanged: false
  resources:
    subscribe: false
    listChanged: false
  prompts:
    listChanged: false

expectedClientCapabilities:
  sampling: false
  roots: false
  elicitation: false

tools: []
resources: []
resourceTemplates: []
prompts: []
components: {}
metadata: {}
x-scriptorium: {}
```

### Semántica de los campos

- `kind`: discriminador local del Scriptorium.
- `protocolVersion`: **release oficial MCP** usada como ancla semántica.
- `mcpVersion`: etiqueta humana/legacy del repo (`MCP 1.0`, `1.0.0`, etc.).
- `info`: bloque editorial del descriptor.
- `implementation`: espejo de la noción oficial de `Implementation` usada en `initialize`.
- `server`: runtime/transport/puertos/command/env, útil para humanos, Inspector y tooling.
- `capabilities`: capacidades **del servidor** según la spec oficial.
- `expectedClientCapabilities`: requisitos o expectativas **del cliente/host** cuando el
  servidor depende de sampling, roots, elicitation o tasks del lado cliente.
- `metadata` / `x-scriptorium`: extensiones locales no normativas.

---

## Normalización por primitive

### Tools

Cada tool debe mapear a la forma oficial de `Tool`:

- `name`
- `title` *(recomendado)*
- `description`
- `inputSchema` *(JSON Schema object; raíz tipo `object`)*
- `outputSchema` *(si devuelve `structuredContent`)*
- `annotations` *(hints oficiales: `title`, `readOnlyHint`, `destructiveHint`,
  `idempotentHint`, `openWorldHint`)*
- `execution.taskSupport` *(si aplica)*
- `icons`, `_meta`

#### Reglas canónicas

1. Usar `outputSchema`, no `output`, como forma principal.
2. Para tools sin parámetros, preferir:
   ```yaml
   inputSchema:
     type: object
     additionalProperties: false
   ```
3. Los nombres de tools deben seguir el patrón seguro de MCP:
   letras ASCII, dígitos, `_`, `-`, `.`; sin espacios.
4. Los errores de ejecución de negocio deben documentarse como `isError: true` en el
   resultado de la tool, no como error de protocolo, cuando el modelo pueda autocorregirse.

### Resources

Cada resource debe mapear a la forma oficial de `Resource`:

- `uri`
- `name`
- `title` *(recomendado para UI)*
- `description`
- `mimeType`
- `size` *(si se conoce)*
- `annotations`

#### Reglas canónicas

1. `uri` debe ser estable y tratarse como identificador principal.
2. `annotations.audience` canónicamente usa `user` y/o `assistant`.
3. Si necesitas etiquetas locales como `developer`, `agent`, `plugin`, etc., moverlas a
   `x-scriptorium` o `_meta`, no al núcleo normativo.

### Resource Templates

Si el servidor expone recursos parametrizados, documentarlos en `resourceTemplates`, no sólo
en comentarios o prose. Deben mapear a `ResourceTemplate` y usar `uriTemplate` RFC 6570.

### Prompts

Cada prompt debe mapear a la forma oficial de `Prompt`:

- `name`
- `title` *(recomendado)*
- `description`
- `arguments[]`
- `icons`, `_meta`

Los `arguments` deben seguir la forma oficial de `PromptArgument`:

- `name`
- `title` *(recomendado)*
- `description`
- `required`

---

## Capabilities: qué va dónde

La spec oficial separa claramente:

- **capabilities del servidor** → `tools`, `resources`, `prompts`, `logging`, `completions`, `tasks`
- **features del cliente** → `sampling`, `roots`, `elicitation`

### Regla canónica

- `sampling`, `roots` y `elicitation` **no deben modelarse como capabilities del servidor**.
- Si el servidor necesita o asume esas features del lado cliente, documentarlo en
  `expectedClientCapabilities`.

### Compatibilidad legacy

El repo ya contiene archivos antiguos con:

- `capabilities.tools: true`
- `capabilities.resources: true`
- `capabilities.prompts: true`
- flags locales como `healthChecks` o `plugins`

Se toleran para migración, pero el canon nuevo favorece la forma oficial por objeto:

```yaml
capabilities:
  tools:
    listChanged: false
  resources:
    subscribe: false
    listChanged: false
  prompts:
    listChanged: false
```

Las extensiones del Scriptorium deben ir en `x-scriptorium` o `metadata`.

---

## Compatibilidad con la spec oficial y con el SDK

Una `mcpspec.yaml` bien formada debe ser suficiente para responder, como mínimo, a estas
preguntas operativas:

1. ¿Qué primitives expone el servidor?
2. ¿Qué capabilities negocia el servidor al iniciar?
3. ¿Qué inputs acepta cada tool y qué salida estructurada promete?
4. ¿Qué URIs y MIME types producen sus resources?
5. ¿Qué prompts existen y qué argumentos aceptan?
6. ¿Qué espera del cliente (sampling, roots, elicitation, tasks)?
7. ¿Cómo se conecta el Inspector o un SDK al runtime real?

Si la respuesta no está explícita en la MCPSpec, todavía no está canonizada del todo.

---

## Validación recomendada

### Validación estática

1. Validar el descriptor contra:
   - `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/mcpspec.schema.json`
2. Revisar alineación semántica con la spec oficial:
   - `outputSchema` en vez de `output`
   - `resourceTemplates` para URIs parametrizadas
   - `expectedClientCapabilities` para features cliente
   - `annotations` oficiales sin sobrecargar el núcleo normativo

### Validación de runtime

Si el servidor existe y puede arrancarse:

1. abrir **MCP Inspector**
2. comprobar `initialize` y capabilities reales
3. revisar tabs de tools/resources/prompts
4. verificar errores, inputs inválidos y resultados estructurados

La MCPSpec estática y el servidor vivo deben contar la misma historia. Si no, hay drift.

---

## Criterio editorial para este plugin

El canon adoptado por `openasyncapi-editor` es:

> `mcpspec.yaml` es un descriptor local alineado con la spec MCP oficial, con un núcleo
> normativo que refleja tools/resources/prompts/capabilities y una periferia explícita para
> extensiones del Scriptorium.

Eso permite tratar MCPSpec al mismo nivel conceptual que OpenAPI y AsyncAPI sin fingir que MCP
ya tenga un único formato YAML universal tipo OpenAPI.
