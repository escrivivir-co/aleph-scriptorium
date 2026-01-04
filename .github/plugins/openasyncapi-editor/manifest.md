---
id: openasyncapi-editor
name: "OpenAsyncAPI Editor"
version: "1.0.0"
description: "Plugin para gestionar catálogo de especificaciones OpenAPI y AsyncAPI del Scriptorium. Incluye guías de instalación de UIs (Swagger, AsyncAPI Studio) y generación de código cliente/servidor."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies: ["prolog-editor", "typed-prompting"]

agents:
  - name: "OpenAsyncApiEditor"
    file: "agents/openasyncapi-editor.agent.md"
    description: "Gestor de especificaciones API. Cataloga, visualiza, edita y genera código desde OpenAPI/AsyncAPI."

prompts:
  - name: "catalogar-spec"
    file: "prompts/catalogar-spec.prompt.md"
    description: "Añadir nueva especificación al catálogo del Scriptorium."
  - name: "validar-spec"
    file: "prompts/validar-spec.prompt.md"
    description: "Validar sintaxis y semántica de una especificación."
  - name: "generar-cliente"
    file: "prompts/generar-cliente.prompt.md"
    description: "Generar código cliente en lenguaje especificado."
  - name: "setup-swagger-ui"
    file: "prompts/setup-swagger-ui.prompt.md"
    description: "Guía asistida para instalar Swagger UI local."
  - name: "setup-asyncapi-studio"
    file: "prompts/setup-asyncapi-studio.prompt.md"
    description: "Guía asistida para instalar AsyncAPI Studio local."

instructions:
  - name: "openasyncapi-protocol"
    file: "instructions/openasyncapi-protocol.instructions.md"
    description: "Protocolo de gestión del catálogo de especificaciones."
  - name: "codegen-templates"
    file: "instructions/codegen-templates.instructions.md"
    description: "Plantillas y guías para generación de código."

handoffs:
  - label: "Listar catálogo de specs"
    agent: "OpenAsyncApiEditor"
    prompt: "Lista todas las especificaciones OpenAPI y AsyncAPI catalogadas."
  - label: "Añadir spec al catálogo"
    agent: "OpenAsyncApiEditor"
    prompt: "Cataloga una nueva especificación desde ruta local."
  - label: "Validar especificación"
    agent: "OpenAsyncApiEditor"
    prompt: "Ejecuta validación de sintaxis y mejores prácticas."
  - label: "Abrir Swagger UI"
    agent: "OpenAsyncApiEditor"
    prompt: "Guía para visualizar spec OpenAPI en Swagger UI."
  - label: "Abrir AsyncAPI Studio"
    agent: "OpenAsyncApiEditor"
    prompt: "Guía para visualizar spec AsyncAPI en Studio."
  - label: "Generar cliente TypeScript"
    agent: "OpenAsyncApiEditor"
    prompt: "Genera código cliente TypeScript desde spec."
  - label: "Generar servidor stub"
    agent: "OpenAsyncApiEditor"
    prompt: "Genera stub de servidor desde spec OpenAPI."

data_directory: "ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/"

tools_cli:
  - name: "@openapitools/openapi-generator-cli"
    description: "Generador oficial OpenAPI para múltiples lenguajes"
    install: "npm install -g @openapitools/openapi-generator-cli"
  - name: "@asyncapi/cli"
    description: "CLI oficial AsyncAPI para validación y generación"
    install: "npm install -g @asyncapi/cli"
  - name: "swagger-ui-express"
    description: "Middleware Express para servir Swagger UI"
    install: "npm install swagger-ui-express"
  - name: "redoc-cli"
    description: "Generador de documentación estática alternativo"
    install: "npm install -g @redocly/cli"
---

# Plugin: OpenAsyncAPI Editor

> **Resumen**: Gestión centralizada de especificaciones OpenAPI y AsyncAPI para el ecosistema Aleph Scriptorium.

## Casos de Uso

1. **Catalogar**: Mantener inventario de todas las APIs del Scriptorium
2. **Visualizar**: UIs locales para explorar especificaciones
3. **Editar**: Asistencia para modificar/extender specs
4. **Generar**: Crear clientes y stubs de servidor

## Arquitectura de Datos

```
ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/
├── catalog.json          # Índice de specs catalogadas
├── specs/                # Copias locales (opcional)
│   ├── prolog-editor/
│   │   ├── openapi.yaml
│   │   └── asyncapi.yaml
│   └── ...
└── generated/            # Código generado
    └── {proyecto}/
        └── {lenguaje}/
```

## Especificaciones Catalogadas (Ejemplo Inicial)

| Proyecto | OpenAPI | AsyncAPI | Ubicación Origen |
|----------|---------|----------|------------------|
| PrologEditor | ✅ v1.0.0 | ✅ v1.0.0 | `BACKLOG_BORRADORES/Enero_02_PrologEditor_API_Contracts/api-specs/` |

## Herramientas CLI Integradas

| Tool | Propósito | Comando |
|------|-----------|---------|
| openapi-generator-cli | Generar código | `openapi-generator-cli generate -i spec.yaml -g typescript-fetch -o ./out` |
| @asyncapi/cli | Validar + generar | `asyncapi validate spec.yaml` |
| redocly | Documentación estática | `redocly build-docs spec.yaml -o docs.html` |

## UIs Disponibles

| UI | Puerto | Tipo | Spec |
|----|--------|------|------|
| Swagger UI | 8080 | Web | OpenAPI |
| AsyncAPI Studio | 3210 | Web | AsyncAPI |
| Redoc | estático | HTML | OpenAPI |
