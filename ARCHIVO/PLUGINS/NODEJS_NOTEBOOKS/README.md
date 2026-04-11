# Node.js Notebooks — Data Directory

> **Plugin**: `nodejs-notebooks`  
> **Directorio canónico**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/`

Este directorio contiene notebooks `.nnb` para el Scriptorium, compatibles con la extensión **Node.js Notebooks (REPL)** de Don Jayamanne.

## Templates Incluidos (pre-generados)

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `quickstart.nnb` | Primer contacto con el entorno REPL + utilidades base | ✅ Incluido |
| `panel-control.nnb` | Dashboard de todos los servicios del Scriptorium | ✅ Incluido |

## Notebooks Generados por Prompts

Los notebooks creados con los prompts del plugin se guardan aquí:

| Archivo | Prompt origen | Descripción |
|---------|--------------|-------------|
| `mcp-explorer.nnb` | `/demo-mcp-gallery` | Exploración interactiva de MCPGallery |
| `bothub-demo.nnb` | `/demo-bothub-sdk` | Demo de BotHubSDK en modo mock + IACM |
| `stack-diagnostics.nnb` | `/diagnostico-stack` | Diagnóstico completo del stack |

## Cómo Abrir un Notebook

1. Instalar la extensión: `code --install-extension donjayamanne.typescript-notebook`
2. Hacer doble-click en el archivo `.nnb` en el explorador de VS Code
3. Ejecutar las celdas de **arriba a abajo** (`Shift+Enter` o botón ▶)

> **Importante**: Las variables persisten entre celdas durante la sesión. Siempre ejecutar primero la celda de utilidades.

## Convenciones

- Nombres en kebab-case: `mi-notebook.nnb`
- Notebooks personalizados: `{tema}-{fecha}.nnb`
- Primera celda siempre: markdown con título y propósito
- Segunda celda siempre: definición de utilidades base (`healthCheck`, etc.)

## Referencias

- [Agente NodejsNotebooks](../../../../.github/plugins/nodejs-notebooks/agents/nodejs-notebooks.agent.md)
- [Instrucciones del Plugin](../../../../.github/plugins/nodejs-notebooks/instructions/nodejs-notebooks.instructions.md)
- [Prompts Disponibles](../../../../.github/plugins/nodejs-notebooks/prompts/)
- [Manifiesto](../../../../.github/plugins/nodejs-notebooks/manifest.md)
