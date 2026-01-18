---
name: AAIAEditor Bridge
description: "Bridge a plugin aaia-editor. Delega gestión de FIAs, mundos y sesiones AAIA."
argument-hint: "Invoca plugin AAIA Editor para operar agentes autónomos"
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
handoffs:
  - label: Crear sesión AAIA
    agent: AAIAEditor
    prompt: Crea una nueva sesión con un appId específico.
    send: false
  - label: Listar FIAs
    agent: AAIAEditor
    prompt: Muestra las FIAs de la sesión actual.
    send: false
  - label: Operar FIA
    agent: AAIAEditor
    prompt: Ejecuta ciclo de percepción-razonamiento-acción.
    send: false
  - label: Consultar paradigmas
    agent: AAIAEditor
    prompt: Lista los 10 paradigmas FIA soportados.
    send: false
---

# Bridge: AAIA Editor

> **Delega a**: `.github/plugins/aaia-editor/agents/aaia-editor.agent.md`

## Descripción

Este bridge conecta con el plugin **AAIA Editor** para operar el Runtime de Agentes Autónomos.

## Capacidades Delegadas

| Capacidad | Tool MCP | Puerto |
|-----------|----------|--------|
| Crear sesión | `aaia_create_session` | 3007 |
| Listar FIAs | `aaia_list_fias` | 3007 |
| Step FIA | `aaia_step_fia` | 3007 |
| Percepto | `aaia_send_percepto` | 3007 |
| Query mundo | `aaia_query_mundo` | 3007 |

## Invocación

```
@plugin_ox_aaiaeditor crear sesión con demo-logica
@plugin_ox_aaiaeditor listar paradigmas
@plugin_ox_aaiaeditor operar FIA 0
```

## Dependencias

- `prolog-mcp-server` (3006) para FIAs lógicas
- `typed-prompt-mcp-server` (3020) para validación
