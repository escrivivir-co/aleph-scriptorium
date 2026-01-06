# Referencias de Backlog

> **DRY**: Este archivo contiene ENLACES, no contenido duplicado.

---

## Épicas Relacionadas

### TYPED-MCP-1.0.0 (✅ Cerrada)

- **Backlog**: [04_backlog-mcp-refactor.md](../../BACKLOG_BORRADORES/TYPED_PROMPTING/04_backlog-mcp-refactor.md)
- **Effort**: 34 pts
- **Resultado**: MCPTypedPromptServer + TypedPromptBackendClient

### LAUNCHER-BUG-001 (🔄 Activa)

- **Backlog**: [01_backlog-borrador.md](../../BACKLOG_BORRADORES/Enero_04_MCPLauncher_ProcessKill_Bug/01_backlog-borrador.md)
- **Effort**: 11 pts
- **Problema**: Procesos Windows spawn no se detienen

---

## Specs OpenAsyncAPI

- **INDEX**: [specs/TypedPromptsEditor/INDEX.md](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/INDEX.md)
- **OpenAPI (REST 3019)**: [openapi.yaml](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/openapi.yaml)
- **MCP Spec (MCP 3020)**: [mcpspec.yaml](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/mcpspec.yaml)

---

## Código Fuente

### MCP Stack

| Archivo | Ruta |
|---------|------|
| MCPTypedPromptServer | `MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts` |
| TypedPromptBackendClient | `MCPGallery/mcp-mesh-sdk/src/clients/TypedPromptBackendClient.ts` |
| Tipos DRY | `MCPGallery/mcp-core-sdk/src/types/typed-prompts/index.ts` |
| Config | `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG.ts` |

### Backend

| Archivo | Ruta |
|---------|------|
| Entry point | `TypedPromptsEditor/server/index.ts` |
| Schema types | `TypedPromptsEditor/shared/schema.ts` |

---

## Plugin

- **Manifest**: `.github/plugins/typed-prompting/manifest.md`
- **Instructions**: `.github/plugins/typed-prompting/instructions/typed-prompting.instructions.md`
- **Bridge**: `.github/agents/plugin_ox_typedprompting.agent.md`

---

## VS Code Config

- **MCP Servers**: `.vscode/mcp.json` → `typed-prompt-mcp-server`
- **Tasks**: `.vscode/tasks.json` → `TPE: Start [MCP Server]`
