# TypeScript SDK

Install and configure the Anthropic TypeScript SDK for Node.js, Deno, Bun, and browser environments

---

This library provides convenient access to the Anthropic REST API from server-side TypeScript or JavaScript.

<Info>
For API feature documentation with code examples, see the [API reference](/docs/en/api/overview). This page covers TypeScript-specific SDK features and configuration.
</Info>

## Installation

```bash
npm install @anthropic-ai/sdk
```

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.
- Web browsers: disabled by default to avoid exposing your secret API credentials (see [API key best practices](https://support.anthropic.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure)). Enable browser support by explicitly setting `dangerouslyAllowBrowser` to `true`.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on [GitHub](https://github.com/anthropics/anthropic-sdk-typescript).

## Usage

```typescript hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"] // This is the default and can be omitted
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
  model: "claude-opus-4-7"
});
# Referencia local — SDK y alineación práctica de MCPSpec

> **Objetivo**: fijar cómo debe describirse una `mcpspec.yaml` para que sea coherente
> con la spec oficial de MCP y, además, sea útil desde el SDK oficial de MCP y desde el
> SDK de Anthropic para TypeScript.

---

## Fuentes clave

- SDKs oficiales MCP: https://modelcontextprotocol.io/docs/sdk
- Spec MCP: https://modelcontextprotocol.io/specification/2025-11-25/index
- Anthropic TypeScript SDK (helpers MCP): documentación local resumida en este repo

---

## Dos capas de SDK que no conviene mezclar

### 1. SDK oficial MCP

El SDK oficial de MCP modela el protocolo: clientes, servidores, transports y tipos MCP.

Sirve para:

- construir servidores MCP;
- construir clientes MCP;
- negociar capabilities;
- listar tools/resources/prompts;
- leer resources, ejecutar prompts e invocar tools.

### 2. SDK de Anthropic para TypeScript

El SDK de Anthropic no reemplaza al SDK MCP; lo complementa.

Su valor aquí está en los helpers MCP que permiten traducir primitivas MCP a primitivas
que Claude entiende en la API de mensajes.

---

## Modos de integración que una MCPSpec debe contemplar

### A. Servidor MCP remoto vía `mcp_servers`

Útil cuando el cliente Claude puede conectarse directamente a un servidor remoto por URL.

**Importante**: este camino está orientado sobre todo a **tools**. Si prompts y resources son
parte central del contrato, la MCPSpec debe explicitar que ese caso de uso requiere cliente MCP
completo, no sólo `mcp_servers`.

### B. Cliente MCP local/controlado + helpers de Anthropic

Camino recomendado cuando se necesitan:

- `tools`
- `prompts`
- `resources`
- control fino del transport
- lectura de recursos con MIME types explícitos

En este flujo aparecen cuatro helpers clave:

| Primitive MCP | Operación MCP | Helper / uso SDK |
|---------------|---------------|------------------|
| `tools` | `listTools()` | `mcpTools(tools, client)` |
| `prompts` | `getPrompt()` | `mcpMessages(messages)` |
| `resources` | `readResource()` | `mcpResourceToContent(resource)` |
| `resources` como fichero | `readResource()` | `mcpResourceToFile(resource)` |

### C. Validación de runtime con Inspector

No es un SDK de producción, pero sí la herramienta más directa para comprobar que la
MCPSpec estática y el servidor real dicen lo mismo.

---

## Qué debe decir una `mcpspec.yaml` para ser útil al SDK

### Tools

Para que una tool sea consumible con buenas garantías desde SDKs y clientes:

- `name` debe ser estable y seguro;
- `description` debe ser precisa;
- `inputSchema` debe ser JSON Schema válido con raíz `object`;
- `outputSchema` debe documentar `structuredContent` cuando exista;
- `execution.taskSupport` debe declararse si la tool puede ser larga o diferida.

### Prompts

Para que un prompt sea reutilizable con `getPrompt()` + `mcpMessages()`:

- `arguments[]` debe ser explícito;
- los nombres de argumento deben ser estables;
- el prompt debe describir claramente qué contenido devolverá;
- si incrusta recursos, deben usar content blocks válidos según MCP.

### Resources

Para que un resource sea reutilizable con `mcpResourceToContent()` o `mcpResourceToFile()`:

- `uri` debe ser estable;
- `mimeType` debe ser correcto;
- el descriptor debe indicar si el recurso es texto o blob;
- los links a resources deben usar URIs que el cliente pueda resolver.

**Nota práctica**: los helpers pueden rechazar valores MCP no soportados por la API Claude,
por ejemplo MIME types no compatibles o resource links que no sean `http/https` cuando el flujo
espera un archivo remoto.

---

## Decisiones canónicas derivadas del SDK

### 1. `outputSchema` es la forma principal

La spec oficial de MCP define `outputSchema` en tools. Por tanto, en este repo:

- `outputSchema` = canónico
- `output` = legacy alias tolerado sólo para migración

### 2. `mimeType` deja de ser decorativo

En OpenAPI/AsyncAPI muchas veces el MIME es documentación contextual. En MCP, para resources,
sí afecta a cómo el cliente puede convertir, adjuntar o renderizar contenido.

### 3. `resourceTemplates` no es un extra bonito

Si el servidor tiene recursos parametrizados, documentarlos como template ayuda a:

- la UI/Inspector;
- completions futuras;
- clientes que quieran construir URIs válidas sin reverse engineering.

### 4. `expectedClientCapabilities` evita ambigüedad

La spec oficial sitúa `sampling`, `roots` y `elicitation` del lado cliente. Si el servidor los
necesita o los aprovecha, deben declararse como expectativa del cliente, no como capability del
servidor.

---

## Perfil canónico para OpenAsyncAPI Editor

Cuando catalogamos una `mcpspec.yaml` en este plugin, queremos que describa tres cosas a la vez:

1. **Contrato MCP oficial**
   - tools/resources/prompts/capabilities
2. **Operativa de runtime**
   - transport, command, puertos, URLs, Inspector
3. **Usabilidad desde SDKs**
   - schemas válidas, MIME types consistentes, nombres estables, outputs estructurados

Si una MCPSpec sólo cumple una de esas tres, todavía está coja.

---

## Checklist mínimo de alineación SDK

- [ ] `protocolVersion` apunta a una release oficial MCP
- [ ] `tools[*].inputSchema` es JSON Schema válida
- [ ] `tools[*].outputSchema` existe cuando hay `structuredContent`
- [ ] `resources[*].mimeType` es explícito cuando se conoce
- [ ] `prompts[*].arguments` está documentado
- [ ] el runtime de conexión está documentado (`stdio`, `streamable-http`, etc.)
- [ ] si el flujo principal usa prompts/resources, no se vende el servidor como “tools-only”
- [ ] la MCPSpec puede comprobarse con Inspector si el servidor está vivo

---

## Regla editorial final

> En este plugin, la MCPSpec no se escribe sólo para humanos: se escribe para que un editor,
> un Inspector y un SDK puedan inferir correctamente cómo hablar con el servidor.