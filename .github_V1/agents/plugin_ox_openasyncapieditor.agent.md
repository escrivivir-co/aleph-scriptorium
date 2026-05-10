---
name: plugin_ox_openasyncapieditor
description: "Bridge: conecta VS Code con el agente OpenAsyncApiEditor para gestión de especificaciones API."
argument-hint: "catalogar | listar | validar | generar | swagger | asyncapi-studio"
tools: ['vscode', 'read', 'edit', 'search', 'execute']
handoffs:
  - label: Listar catálogo de specs
    agent: .github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md
    prompt: Lee catalog.json y muestra tabla de especificaciones disponibles.
    send: false
  - label: Catalogar nueva spec
    agent: .github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md
    prompt: Añade una nueva especificación al catálogo desde ruta local.
    send: false
  - label: Validar spec
    agent: .github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md
    prompt: Ejecuta validación sobre una especificación.
    send: false
  - label: Generar cliente
    agent: .github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md
    prompt: Genera código cliente en lenguaje especificado.
    send: false
  - label: Setup Swagger UI
    agent: .github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md
    prompt: Guía para instalar Swagger UI local.
    send: false
  - label: Setup AsyncAPI Studio
    agent: .github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md
    prompt: Guía para instalar AsyncAPI Studio local.
    send: false
  - label: Sincronizar specs
    agent: .github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md
    prompt: Actualiza specs desde ubicación origen.
    send: false
---

# Bridge: OpenAsyncAPI Editor

> **Función**: Conectar Copilot con el plugin de gestión de especificaciones API.

Este bridge delega todas las operaciones al agente real en:  
`.github/plugins/openasyncapi-editor/agents/openasyncapi-editor.agent.md`

## Capacidades Delegadas

| Operación | Descripción |
|-----------|-------------|
| **Catalogar** | Añadir specs al inventario |
| **Listar** | Ver catálogo completo |
| **Validar** | Lint de OpenAPI/AsyncAPI |
| **Generar** | Código cliente/servidor |
| **Setup UIs** | Swagger UI, AsyncAPI Studio |
| **Sync** | Actualizar desde origen |

## Invocación

```
@plugin_ox_openasyncapieditor listar
@plugin_ox_openasyncapieditor catalogar BlocklyEditor
@plugin_ox_openasyncapieditor validar prolog-editor-openapi
@plugin_ox_openasyncapieditor generar typescript prolog-editor
@plugin_ox_openasyncapieditor swagger
```
