# TypedPromptsEditor API Specs

> **Épica**: TYPED-MCP-1.0.0  
> **Fecha**: 2026-01-04

## Documentos

| Archivo | Descripción |
|---------|-------------|
| [openapi.yaml](openapi.yaml) | REST API del backend (port 3019) |
| [mcpspec.yaml](mcpspec.yaml) | MCP Server spec (port 3020) |

## Arquitectura

```
React Frontend <--HTTP--> REST Backend (3019) <--HTTP--> MCPTypedPromptServer (3020)
     │                          │                              │
     │                          │                              ├── 7 tools
     │                          │                              ├── 3 resources
     │                          │                              └── 3 prompts
     │                          │
     │                          └── SQLite (schemas, libraries)
     │
     └── Monaco Editor + Validation UI
```

## Puertos

| Servicio | Puerto |
|----------|--------|
| TypedPromptsEditor (Backend + UI) | 3019 |
| MCPTypedPromptServer (MCP) | 3020 |

## Endpoints REST (Backend 3019)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/schemas | Listar schemas |
| POST | /api/schemas | Crear schema |
| GET | /api/schemas/:id | Obtener schema |
| PUT | /api/schemas/:id | Actualizar schema |
| DELETE | /api/schemas/:id | Eliminar schema |
| GET | /api/libraries | Listar bibliotecas |
| POST | /api/libraries | Crear biblioteca |
| POST | /api/validate | Validar mensaje |
| POST | /api/generate | Generar desde TypeScript |

## Tools MCP (Server 3020)

| Tool | Descripción |
|------|-------------|
| `typed_validate_message` | Validar JSON contra schema |
| `typed_convert_interface` | TypeScript → JSON Schema |
| `typed_list_schemas` | Listar schemas |
| `typed_get_schema` | Obtener schema por ID |
| `typed_create_schema` | Crear schema |
| `typed_list_libraries` | Listar bibliotecas |
| `typed_suggest_ontology` | Sugerir ontologías |

## Resources MCP

| URI | Descripción |
|-----|-------------|
| `typed-prompt://schemas` | Lista de todos los schemas |
| `typed-prompt://schemas/{id}` | Schema por ID |
| `typed-prompt://libraries/{id}` | Biblioteca por ID |

## Prompts MCP

| Prompt | Descripción |
|--------|-------------|
| `study_case` | Analizar caso de uso |
| `suggest_ontology` | Sugerir ontologías |
| `install_in_agent` | Guía de instalación |
