# Fuentes — Demo UI PrologEditor

## Especificaciones Formales (Fuente de Verdad)

> **Ubicación**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/`

| Spec | Estándar | Propósito |
|------|----------|-----------|
| [INDEX.md](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/INDEX.md) | — | Índice del catálogo |
| [openapi.yaml](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml) | OpenAPI 3.1 | REST API Backend |
| [asyncapi.yaml](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/asyncapi.yaml) | AsyncAPI 3.0 | MQTT IoT |
| [mcpspec.yaml](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/mcpspec.yaml) | MCP 1.0 | Model Context Protocol |

## Casos de Uso por Actor

| Spec | Actor | UCs |
|------|-------|-----|
| [usecases-usuario-final.yaml](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-usuario-final.yaml) | Developer, IoT Engineer | UC-DEV-*, UC-IOT-* |
| [usecases-dramaturgo.yaml](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-dramaturgo.yaml) | Dramaturgo | UC-DRAMA-* |
| [usecases-ox-bridger.yaml](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-ox-bridger.yaml) | @ox (Setup) | UC-OX-* |
| [usecases-agente-personaje.yaml](../../../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-agente-personaje.yaml) | Agente IA | UC-AGENT-* |

## Documentación Técnica

| Doc | Propósito |
|-----|-----------|
| [guia-arquitectura-mcp-stack.md](../../../../DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md) | Arquitectura completa + matriz de tools |
| [02_backlog-ui-refactor.md](../../../../DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/02_backlog-ui-refactor.md) | Épica PROLOG-UI-2.0.0 |

## Casos de Uso Relevantes para Demo

### UC-DEV-001: Crear y Gestionar Sesiones

- **Componente**: SessionManagerComponent
- **Tab**: Sessions
- **Endpoints**: GET/POST/DELETE /sessions
- **Pasos demo**: 1, 2, 12

### UC-DEV-002: Escribir y Ejecutar Reglas

- **Componente**: RuleEditorComponent
- **Tab**: Editor
- **Endpoints**: POST /rules, POST /run-rule
- **Pasos demo**: 3, 10

### UC-DEV-003: Gestionar Knowledge Base

- **Componente**: KnowledgeBaseComponent
- **Tab**: Knowledge
- **Endpoints**: POST /assert, POST /consult
- **Pasos demo**: 4, 5, 9

### UC-DEV-004: Explorar Templates

- **Componente**: McpTemplatesBrowserComponent
- **Tab**: Templates
- **Endpoints**: GET /mcp-templates, GET /sdk-templates
- **Pasos demo**: 6, 7, 8

### UC-IOT-001: Monitorear Telemetría

- **Componente**: TelemetryProcessComponent
- **Tab**: Telemetry
- **Endpoints**: GET /telemetry/status
- **Pasos demo**: 11
