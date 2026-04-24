# MCPSpec Canon — OpenAsyncAPI Editor

> Estado: canónico para nuevas specs, con compatibilidad legacy para specs ya existentes.

## Propósito

`mcpspec.yaml` es el descriptor local del Scriptorium para documentar la superficie MCP de un servidor con un nivel de formalidad comparable a `openapi.yaml` y `asyncapi.yaml`.

No sustituye el wire schema oficial de MCP. Su misión es fijar, de forma legible y validable:

- primitives MCP expuestas por el servidor;
- capabilities negociadas en `initialize`;
- expectativas del cliente cuando el servidor depende de features del lado host;
- detalles operativos de runtime útiles para SDKs, Inspector y mantenimiento.

## Principios del canon

1. **Núcleo MCP oficial, periferia Scriptorium explícita**
   - Tools, resources, resourceTemplates, prompts y capabilities siguen la spec oficial.
   - Lo específico del Scriptorium va en `metadata` o `x-scriptorium`.

2. **Paridad conceptual con OpenAPI y AsyncAPI**
   - OpenAPI = superficie REST.
   - AsyncAPI = superficie event-driven.
   - MCPSpec = superficie MCP.

3. **Diseñado para humanos y tooling**
   - Debe servir para leer, revisar, validar y contrastar con MCP Inspector.

## Top-level canónico

```yaml
kind: scriptorium-mcpspec
protocolVersion: "2025-11-25"
mcpVersion: "1.0.0"

info:
  title: ExampleServer MCP
  version: 1.0.0
  description: Surface MCP for ExampleServer

implementation:
  name: example-server
  title: Example Server
  version: 1.0.0
  description: Human-facing implementation metadata

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
  tasks: false

tools: []
resources: []
resourceTemplates: []
prompts: []
components: {}
metadata: {}
x-scriptorium: {}
```

## Reglas por primitive

### Tools

Cada tool nueva debe usar:

- `name`
- `title` recomendable
- `description`
- `inputSchema`
- `outputSchema` si existe salida estructurada
- `annotations` oficiales (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`)
- `execution.taskSupport` si la operación puede ser larga o diferida

#### Decisión canónica

- `outputSchema` es la forma principal.
- `output` queda tolerado sólo como **deuda legacy**.

### Resources

Cada resource nueva debe usar:

- `uri`
- `name`
- `title` recomendable
- `description`
- `mimeType`
- `annotations`

#### Decisión canónica

- `annotations.audience` debe usar preferentemente valores MCP oficiales: `user`, `assistant`.
- Etiquetas locales como `developer`, `agent`, `plugin`, etc. deben moverse a `x-scriptorium` o `_meta`.

### Resource Templates

Si el servidor expone URIs parametrizadas, deben documentarse en `resourceTemplates` con `uriTemplate`.

### Prompts

Cada prompt nuevo debe usar:

- `name`
- `title` recomendable
- `description`
- `arguments[]`

## Capabilities

### Del servidor

Van en `capabilities`:

- `tools`
- `resources`
- `prompts`
- `logging`
- `completions`
- `tasks`

### Del cliente / host

Van en `expectedClientCapabilities`:

- `sampling`
- `roots`
- `elicitation`
- `tasks` cuando la dependencia sea del lado cliente

## Relación con SDK e Inspector

La MCPSpec canónica debe responder con claridad a estas preguntas:

1. ¿Qué tools existen y qué schemas aceptan?
2. ¿Qué resources existen, con qué `uri` y `mimeType`?
3. ¿Qué prompts hay y qué argumentos esperan?
4. ¿Qué capabilities negocia el servidor?
5. ¿Qué espera del cliente?
6. ¿Cómo se conecta un SDK o MCP Inspector al runtime real?

Si el servidor está vivo, el contrato debe poder contrastarse con MCP Inspector.

## Deuda conocida que dejamos aparcada

### 1. Migración `output` → `outputSchema`

Varias `mcpspec.yaml` existentes siguen usando `output` como alias legacy. El canon nuevo ya fija `outputSchema`, pero la migración completa queda como deuda.

### 2. Booleanos legacy en `capabilities`

Algunas specs viejas usan:

```yaml
capabilities:
  tools: true
  resources: true
  prompts: true
```

El canon nuevo favorece la forma por objeto con `listChanged` y `subscribe` cuando aplique.

### 3. Runtime todavía orientado a `content.text`

Parte del runtime actual —por ejemplo, tools CRUD que serializan JSON a `content[0].text`— todavía no expresa resultados como `structuredContent` aunque la MCPSpec ya pueda documentarlos con `outputSchema`.

Eso queda registrado como deuda de alineación runtime ↔ descriptor.

## Definition of Done para una nueva MCPSpec

- [ ] Usa `kind`, `protocolVersion` y `mcpVersion`
- [ ] Usa primitives MCP oficiales
- [ ] Documenta `capabilities` del servidor
- [ ] Documenta `expectedClientCapabilities` si aplica
- [ ] Usa `outputSchema` en tools nuevas
- [ ] Usa `resourceTemplates` si hay URIs parametrizadas
- [ ] Se valida contra `mcpspec.schema.json`
- [ ] Puede contrastarse con Inspector si el servidor existe
