# Guía de Traspaso: Épica TYPED-MCP-1.0.0

> **Para**: @ox, @indice, @scrum  
> **De**: Sesión de desarrollo TYPED-MCP-1.0.0  
> **Fecha**: 2026-01-04

---

## TL;DR

Se creó un **MCPTypedPromptServer** (puerto 3020) que expone el backend de TypedPromptsEditor (puerto 3019) vía protocolo MCP. Permite a VS Code Copilot validar schemas, convertir TypeScript a JSON Schema, y gestionar ontologías.

---

## Arquitectura Final

```
┌─────────────────────────────────────────────────────────┐
│                   VS Code Copilot                       │
│                     (MCP Client)                        │
└────────────────────────┬────────────────────────────────┘
                         │ MCP Protocol (Streamable HTTP)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              MCPTypedPromptServer (3020)                │
│                                                         │
│  Tools:     7 │ Resources: 3 │ Prompts: 3              │
├─────────────────────────────────────────────────────────┤
│              TypedPromptBackendClient                   │
│                   (HTTP Client)                         │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────┐
│         TypedPromptsEditor Backend (3019)               │
│              Express + SQLite + Monaco                  │
└─────────────────────────────────────────────────────────┘
```

---

## Puertos y Servicios

| Servicio | Puerto | Cómo arrancar |
|----------|--------|---------------|
| TypedPromptsEditor (Backend + UI) | 3019 | `cd TypedPromptsEditor && npm run dev` |
| MCPTypedPromptServer (MCP) | 3020 | Task "TPE: Start [MCP Server]" |

---

## 7 Tools MCP Disponibles

| Tool | Input | Output | Uso |
|------|-------|--------|-----|
| `typed_validate_message` | schemaId, message (JSON) | ValidationReport | Validar JSON contra schema |
| `typed_convert_interface` | typescript, name? | jsonSchema | Convertir TS interface a JSON Schema |
| `typed_list_schemas` | libraryId?, category? | Schema[] | Listar schemas (filtros opcionales) |
| `typed_get_schema` | schemaId | Schema | Obtener schema por ID |
| `typed_create_schema` | name, typescript, jsonSchema, category?, libraryId? | Schema | Crear nuevo schema |
| `typed_list_libraries` | — | Library[] | Listar bibliotecas de schemas |
| `typed_suggest_ontology` | useCase, domain?, constraints[]? | Suggestion[] | Sugerir ontologías existentes |

---

## 3 Resources MCP

| URI | Descripción |
|-----|-------------|
| `typed-prompt://schemas` | Lista de todos los schemas |
| `typed-prompt://schemas/{id}` | Detalle de un schema |
| `typed-prompt://libraries/{id}` | Detalle de una biblioteca |

---

## 3 Prompts MCP

| Prompt | Argumentos | Uso |
|--------|------------|-----|
| `study_case` | context (req), requirements? | Analizar caso de uso y proponer ontología |
| `suggest_ontology` | domain (req), constraints? | Buscar ontologías existentes |
| `install_in_agent` | agentId (req), schemaId (req) | Guía para instalar schema en agente |

---

## Archivos Clave (DRY)

| Archivo | Ubicación | Propósito |
|---------|-----------|-----------|
| **MCPTypedPromptServer.ts** | `MCPGallery/mcp-mesh-sdk/src/` | Servidor MCP (608 líneas) |
| **TypedPromptBackendClient.ts** | `MCPGallery/mcp-mesh-sdk/src/clients/` | Cliente HTTP |
| **index.ts (types)** | `MCPGallery/mcp-core-sdk/src/types/typed-prompts/` | Tipos DRY (300+ líneas) |
| **openapi.yaml** | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/` | Spec REST API |
| **mcpspec.yaml** | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/` | Spec MCP Server |
| **manifest.md** | `.github/plugins/typed-prompting/` | Configuración plugin |

---

## Flujo de Datos

### Ejemplo: Validar un mensaje

```
1. Usuario en Copilot: "Valida este JSON contra schema 5"
2. Copilot invoca: typed_validate_message({ schemaId: 5, message: '{"foo":"bar"}' })
3. MCPTypedPromptServer → TypedPromptBackendClient.validateMessage(5, {...})
4. HTTP POST http://localhost:3019/api/validate
5. Backend valida contra schema en SQLite
6. Response: { valid: true, report: {...} }
7. Copilot muestra resultado al usuario
```

---

## Configuración en .vscode/mcp.json

```json
{
  "servers": {
    "typed-prompt-mcp-server": {
      "type": "http",
      "url": "http://localhost:3020"
    }
  }
}
```

---

## Dependencia: LAUNCHER-BUG-001

⚠️ **Importante**: Antes de poder hacer tests end-to-end, @ox debe aplicar el fix de LAUNCHER-BUG-001 (procesos Windows no se detienen).

Ver: [01_backlog-borrador.md](../BACKLOG_BORRADORES/Enero_04_MCPLauncher_ProcessKill_Bug/01_backlog-borrador.md)

---

## Commits de la Épica

| Hash | Mensaje |
|------|---------|
| a70830e | mcp-core-sdk: typed-prompts types |
| 4991247 | mcp-mesh-sdk: MCPTypedPromptServer + client |
| 7f1083b | MCPGallery: submodule refs |
| 8777da2 | tasks.json: TPE MCP Server task |
| b4958a7 | TypedPromptsEditor: port 3019 fix |
| 5454018 | submodule ref update |
| 83f9b87 | MCPGallery README docs |
| b9f8771 | S05 Pack MCP complete |
| d1ec334 | OpenAsyncAPI specs (REST + MCP) |
| ed82319 | Plugin docs actualizado |
| 4af0903 | Cerrar épica TYPED-MCP-1.0.0 |

---

## Próximos Pasos

1. **@ox**: Aplicar fix LAUNCHER-BUG-001
2. **@ox**: Ejecutar test cases de `test-cases-mcp.md`
3. **@indice**: Validar referencias DRY
4. **@scrum**: Reportar a PO cuando esté listo

---

## Preguntas Frecuentes

### ¿El backend debe estar corriendo?

**Sí**. El MCPTypedPromptServer (3020) es solo un wrapper MCP. Necesita el backend REST (3019) activo.

### ¿Cómo sé si el MCP Server está funcionando?

```bash
curl http://localhost:3020/health
# Debería devolver { "status": "ok" }
```

### ¿Dónde están los logs?

El server usa `BaseMCPLogger`. Los logs van a consola con prefijo `[MCPTypedPromptServer]`.
