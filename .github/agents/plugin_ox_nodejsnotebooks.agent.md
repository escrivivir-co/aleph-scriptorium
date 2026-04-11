---
name: NodejsNotebooks Bridge
description: "Bridge: conecta VS Code con el plugin Node.js Notebooks (REPL Expert). Genera notebooks interactivos .nnb para MCPGallery, BotHubSDK, panel de control de tasks y diagnóstico de stack."
argument-hint: "crear-notebook | panel-control | demo-mcp | demo-bothub | diagnostico | abrir template"
tools: ['vscode', 'read', 'edit', 'agent']
handoffs:
  - label: 📓 Crear Notebook
    agent: NodejsNotebooks
    prompt: Crea un notebook .nnb personalizado desde cero según el tema indicado.
    send: false
  - label: 🎛️ Panel de Control (Tasks)
    agent: NodejsNotebooks
    prompt: Lee .vscode/tasks.json y genera ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/panel-control.nnb con health checks interactivos agrupados por stack.
    send: false
  - label: 🔌 Demo MCPGallery
    agent: NodejsNotebooks
    prompt: Genera ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/mcp-explorer.nnb para explorar interactivamente Launcher (3050), Model (4001), Zeus (3012) y Channels (3000).
    send: false
  - label: 🤖 Demo BotHubSDK
    agent: NodejsNotebooks
    prompt: Genera ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/bothub-demo.nnb con boot mock, builders IACM (11 tipos) y listado de BotPlugins.
    send: false
  - label: 🩺 Diagnóstico Stack
    agent: NodejsNotebooks
    prompt: Genera ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/stack-diagnostics.nnb con health checks de todos los servicios, verificación de dependencias y recomendaciones.
    send: false
---

# Bridge: Node.js Notebooks (REPL Expert)

> **Delega a**: `.github/plugins/nodejs-notebooks/agents/nodejs-notebooks.agent.md`  
> **Plugin ID**: `nodejs-notebooks`  
> **Extensión**: `donjayamanne.typescript-notebook`

## Descripción

Este bridge conecta con el plugin **Node.js Notebooks (REPL Expert)** para generar notebooks interactivos `.nnb` adaptados al ecosistema del Scriptorium.

## Capacidades

| Capacidad | Salida | Descripción |
|-----------|--------|-------------|
| Crear notebook | `{nombre}.nnb` | Notebook personalizado por tema |
| Panel de control | `panel-control.nnb` | Dashboard de servicios desde tasks.json |
| Demo MCPGallery | `mcp-explorer.nnb` | Exploración MCPGallery vía `fetch()` |
| Demo BotHubSDK | `bothub-demo.nnb` | BotHubSDK en modo mock + IACM builders |
| Diagnóstico stack | `stack-diagnostics.nnb` | Health checks de los 25 servicios |

## Templates Pre-generados

Abrir directamente en VS Code (requiere extensión instalada):

```
ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/
├── quickstart.nnb     ← Bienvenida + utilidades básicas
└── panel-control.nnb  ← Dashboard completo de servicios
```

## Prerequisito

```bash
code --install-extension donjayamanne.typescript-notebook
```

## Invocación

```
@plugin_ox_nodejsnotebooks panel-control
@plugin_ox_nodejsnotebooks demo-mcp
@plugin_ox_nodejsnotebooks demo-bothub
@plugin_ox_nodejsnotebooks diagnostico
@plugin_ox_nodejsnotebooks crear notebook para explorar la API del servidor Prolog
```
