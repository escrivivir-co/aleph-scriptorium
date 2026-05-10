# Node.js Notebooks (REPL Expert) — Plugin Docs

> **Plugin ID**: `nodejs-notebooks`  
> **Bridge**: `@plugin_ox_nodejsnotebooks`  
> **Agente**: `@NodejsNotebooks`

## Descripción

Plugin que convierte el Scriptorium en un entorno de **programación interactiva** con Node.js. Compatible con la extensión **Node.js Notebooks (REPL)** de Don Jayamanne.

Genera notebooks `.nnb` (JSON nativo, no Jupyter `.ipynb`) listos para abrir y ejecutar con acceso completo a:
- `fetch()` para llamar a los servicios del Scriptorium
- `require()` / `import()` para módulos del workspace
- `child_process` para ejecutar comandos del sistema
- `fs`, `path` para el file system del workspace

## Requisito Previo

```bash
code --install-extension donjayamanne.typescript-notebook
```

O buscar en el Marketplace: **"Node.js Notebooks (REPL)"** by Don Jayamanne (74K instalaciones).

## Templates Incluidos

Disponibles en `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/` (abrir con doble-click):

| Archivo | Descripción |
|---------|-------------|
| `quickstart.nnb` | Primer contacto con el entorno REPL |
| `panel-control.nnb` | Dashboard interactivo de todos los servicios |

## Prompts Disponibles

Invocar desde el chat con `/`:

| Prompt | Descripción |
|--------|-------------|
| `/crear-notebook` | Crear un notebook personalizado según el tema |
| `/panel-control-tasks` | Generar panel de control desde tasks.json |
| `/demo-mcp-gallery` | Notebook de exploración de MCPGallery |
| `/demo-bothub-sdk` | Notebook de demo BotHubSDK en mock mode |
| `/diagnostico-stack` | Notebook de diagnóstico del stack completo |

## Uso Rápido

```
@plugin_ox_nodejsnotebooks Panel de Control
```

O directamente:

```
@NodejsNotebooks demo-mcp
```

## Formato `.nnb`

Los notebooks son archivos JSON válidos con estructura simple:

```json
{
  "cells": [
    { "language": "markdown", "source": ["# Título\n"], "outputs": [] },
    { "language": "javascript", "source": ["console.log('hola');\n"], "outputs": [] }
  ]
}
```

- `language: "markdown"` = Celda de documentación
- `language: "javascript"` / `"typescript"` = Celda de código ejecutable
- `source` = Array de líneas (cada una terminada en `\n`)
- Las variables persisten entre celdas durante la sesión REPL

## Integración con el Scriptorium

| Plugin | Integración |
|--------|-------------|
| **MCPGallery** | `fetch()` a los MCP servers (Launcher 3050, Model 4001...) |
| **BotHubSDK** | Import del SDK en mock mode, builders IACM |
| **PrologEditor** | Consultas al backend REST (puerto 8000) |
| **Wire Editor** | API de Node-RED (puerto 1880) |
| **Typed Prompts** | Validación JSON contra servidor (puerto 3019) |

## Ver También

- [Instrucciones del plugin](../instructions/nodejs-notebooks.instructions.md)
- [Agente NodejsNotebooks](../agents/nodejs-notebooks.agent.md)
- [Manifiesto](../manifest.md)
- [Data directory](../../../ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/README.md)
