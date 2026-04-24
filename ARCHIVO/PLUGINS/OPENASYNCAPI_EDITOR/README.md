# OpenAsyncAPI Editor — Datos del Plugin

> **Plugin**: openasyncapi-editor v1.0.0  
> **Directorio**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/`

---

## Estructura

```
OPENASYNCAPI_EDITOR/
├── README.md              # Este archivo
├── catalog.json           # Índice de especificaciones
├── catalog.schema.json    # Schema de validación
├── mcpspec.schema.json    # Canon local de descriptores MCP
├── templates/
│   └── mcpspec.template.yaml
├── specs/                 # Copias locales (opcional)
│   └── {proyecto}/
│       ├── openapi.yaml
│       ├── asyncapi.yaml
│       └── mcpspec.yaml
├── generated/             # Código generado
│   └── {proyecto}/
│       └── {lenguaje}/
└── docs/                  # Documentación estática
    ├── mcpspec-canon.md
    └── {proyecto}/
```

---

## Catálogo

El archivo `catalog.json` mantiene el inventario de todas las especificaciones del Scriptorium:

- OpenAPI
- AsyncAPI
- MCPSpec (descriptor local canónico para superficies MCP)

### Perfil actual del catálogo

El catálogo ya contiene entradas de los tres tipos para proyectos como:

- `PrologEditor`
- `MCPChannels`
- `TypedPromptsEditor`
- `DevOpsServer`
- `VectorMachineSDK`

La diferencia importante es que:

- OpenAPI y AsyncAPI ya tienen viewers maduros;
- MCPSpec se apoya hoy en **schema local + documentación + MCP Inspector**.

---

## Canon local de MCPSpec

En este plugin, `mcpspec.yaml`:

- **sí** documenta la superficie MCP de un servidor;
- **no** pretende sustituir la schema oficial wire-level de MCP.

El formato canónico se ancla en:

- `kind: scriptorium-mcpspec`
- `protocolVersion` (release oficial MCP, p. ej. `2025-11-25`)
- `mcpVersion` (etiqueta humana/legacy del repo)
- primitives oficiales: `tools`, `resources`, `resourceTemplates`, `prompts`
- `capabilities` del servidor
- `expectedClientCapabilities` cuando el servidor depende de features del cliente

La schema local está en:

- `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/mcpspec.schema.json`

La guía editorial canónica está en:

- `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/docs/mcpspec-canon.md`

La plantilla base para nuevas specs está en:

- `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/templates/mcpspec.template.yaml`

---

## Uso

### Listar Catálogo

```
@plugin_ox_openasyncapieditor listar
```

### Añadir Spec

```
@plugin_ox_openasyncapieditor catalogar {proyecto}
```

### Validar una MCPSpec

La validación canónica de `mcpspec.yaml` combina:

1. schema local (`mcpspec.schema.json`)
2. alineación editorial con la spec MCP oficial
3. MCP Inspector si el servidor existe en runtime

### Generar Código

```
@plugin_ox_openasyncapieditor generar typescript prolog-editor
```

Para MCPSpec no hay codegen universal equivalente a OpenAPI; la integración recomendada es con
`@modelcontextprotocol/sdk`, helpers MCP del SDK de Anthropic y validación con Inspector.

---

## Referencias

- **Plugin**: `.github/plugins/openasyncapi-editor/`
- **Agente**: `@plugin_ox_openasyncapieditor`
- **Referencia MCP**: `.github/plugins/openasyncapi-editor/references/mcp-spec.md`
- **Referencia SDK**: `.github/plugins/openasyncapi-editor/references/mcp-sdk.md`
- **Canon local**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/docs/mcpspec-canon.md`
- **Plantilla MCPSpec**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/templates/mcpspec.template.yaml`
- **Spec de ejemplo**: `BACKLOG_BORRADORES/Enero_02_PrologEditor_API_Contracts/api-specs/`
