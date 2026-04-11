---
id: nodejs-notebooks
name: "Node.js Notebooks (REPL Expert)"
version: "1.0.0"
description: "Plugin experto en la extensión Node.js Notebooks (REPL) de Don Jayamanne. Genera notebooks interactivos .nnb para explorar MCPGallery y BotHubSDK, construir paneles de control de tasks y diagnosticar el stack del Scriptorium."
author: "Aleph Scriptorium"
license: "MIT"
scriptorium_version: ">=1.0.0"
bridge_agent: "plugin_ox_nodejsnotebooks"
epic: "SCRIPT-2.6.0"

vsCodeExtension:
  id: "donjayamanne.typescript-notebook"
  name: "Node.js Notebooks (REPL)"
  publisher: "Don Jayamanne"
  installs: 74431
  rating: 15
  marketplace: "https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook"
  install_cmd: "code --install-extension donjayamanne.typescript-notebook"

dependencies: []
optional_dependencies:
  - bot-hub-sdk
  - mcp-presets
  - prolog-editor

agents:
  - name: "NodejsNotebooks"
    file: "agents/nodejs-notebooks.agent.md"
    description: "Agente experto en Node.js Notebooks. Genera notebooks .nnb interactivos adaptados al Scriptorium."

prompts:
  - name: "crear-notebook"
    file: "prompts/crear-notebook.prompt.md"
  - name: "panel-control-tasks"
    file: "prompts/panel-control-tasks.prompt.md"
  - name: "demo-mcp-gallery"
    file: "prompts/demo-mcp-gallery.prompt.md"
  - name: "demo-bothub-sdk"
    file: "prompts/demo-bothub-sdk.prompt.md"
  - name: "diagnostico-stack"
    file: "prompts/diagnostico-stack.prompt.md"

instructions:
  - name: "nodejs-notebooks"
    file: "instructions/nodejs-notebooks.instructions.md"

handoffs:
  - label: "📓 Crear Notebook"
    agent: "NodejsNotebooks"
    prompt: "Crea un notebook .nnb desde cero para el tema indicado."
  - label: "🎛️ Panel de Control (Tasks)"
    agent: "NodejsNotebooks"
    prompt: "Genera un notebook interactivo que mapea tasks.json como panel de control con health checks por stack."
  - label: "🔌 Demo MCPGallery"
    agent: "NodejsNotebooks"
    prompt: "Genera un notebook de exploración de MCPGallery: Launcher (3050), Model (4001), Zeus (3012), Channels (3000)."
  - label: "🤖 Demo BotHubSDK"
    agent: "NodejsNotebooks"
    prompt: "Genera un notebook de exploración de BotHubSDK: boot mock, IACM builders y parsing de mensajes."
  - label: "🩺 Diagnóstico Stack"
    agent: "NodejsNotebooks"
    prompt: "Genera un notebook de diagnóstico completo que recorre todos los puertos del Scriptorium."
---

# Plugin: Node.js Notebooks (REPL Expert)

> **Extensión objetivo**: [Node.js Notebooks (REPL)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) — Don Jayamanne  
> **Formato de notebooks**: `.nnb` (JSON nativo, no `.ipynb`)

## Descripción

Plugin que convierte el Scriptorium en un entorno de **programación interactiva** sobre Node.js. Genera notebooks `.nnb` listos para abrir y ejecutar, con plantillas pre-construidas para los casos de uso más frecuentes:

- **Panel de control** de los servicios del Scriptorium (mapeado desde `tasks.json`)
- **Exploración de MCPGallery** vía `fetch()` desde celdas interactivas
- **Demos de BotHubSDK** con bots en modo mock y mensajes IACM
- **Diagnóstico de stack** con health checks, tiempos de respuesta y tabla de estado

## Prerequisito

Instalar la extensión en VS Code:
```bash
code --install-extension donjayamanne.typescript-notebook
```

O buscar en el Marketplace: **"Node.js Notebooks (REPL)"** by Don Jayamanne.

## Estructura del Plugin

```
.github/plugins/nodejs-notebooks/
├── manifest.md
├── agents/
│   └── nodejs-notebooks.agent.md
├── instructions/
│   └── nodejs-notebooks.instructions.md
├── docs/
│   └── README.md
└── prompts/
    ├── crear-notebook.prompt.md
    ├── panel-control-tasks.prompt.md
    ├── demo-mcp-gallery.prompt.md
    ├── demo-bothub-sdk.prompt.md
    └── diagnostico-stack.prompt.md
```

## Templates Incluidos (en `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/`)

| Archivo | Descripción |
|---------|-------------|
| `quickstart.nnb` | Notebook de bienvenida con utilidades básicas |
| `panel-control.nnb` | Panel de control completo mapeado desde tasks.json |

## Metadatos
```json
{
  "id": "nodejs-notebooks",
  "name": "Node.js Notebooks (REPL Expert)",
  "version": "1.0.0",
  "bridge_agent": "plugin_ox_nodejsnotebooks"
}
```

## Handoffs Principales

| Acción | Invocación |
|--------|------------|
| Crear notebook libre | `@NodejsNotebooks crear-notebook` |
| Panel de control | `@NodejsNotebooks panel-control-tasks` |
| Demo MCPGallery | `@NodejsNotebooks demo-mcp-gallery` |
| Demo BotHubSDK | `@NodejsNotebooks demo-bothub-sdk` |
| Diagnóstico stack | `@NodejsNotebooks diagnostico-stack` |
