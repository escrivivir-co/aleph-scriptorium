---
description: "Instrucciones para el agente NodejsNotebooks. Experto en la extensión Node.js Notebooks (REPL) de Don Jayamanne — generación de notebooks .nnb interactivos para el Scriptorium."
applyTo: "**/*.nnb, ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/**/*"
---

# Instrucciones: Node.js Notebooks (REPL Expert)

> **Fuente de verdad**: `.github/plugins/nodejs-notebooks/manifest.md`  
> **Extensión**: `donjayamanne.typescript-notebook` (Node.js Notebooks REPL)  
> **Formato de notebooks**: `.nnb` (JSON)

## Formato `.nnb`

Los notebooks son archivos JSON con un array `cells`. Cada celda tiene tres campos obligatorios:

```json
{
  "cells": [
    {
      "language": "markdown",
      "source": ["# Título de la sección\n", "\n", "Contenido en markdown.\n"],
      "outputs": []
    },
    {
      "language": "javascript",
      "source": ["console.log('Código ejecutable en Node.js REPL');\n"],
      "outputs": []
    }
  ]
}
```

### Campos de Celda

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `language` | `"markdown"`, `"javascript"`, `"typescript"` | Determina tipo y lenguaje de la celda |
| `source` | `string[]` | Array de líneas (cada una terminada en `\n`) |
| `outputs` | `array` | Array vacío `[]` al generar (se llena al ejecutar) |

### Lenguajes Soportados

- `javascript` — Preferido para scripts de exploración, `fetch()`, `child_process`
- `typescript` — Para código tipado, interfaces, clases
- `markdown` — Documentación, títulos, tablas, instrucciones

### Reglas de Serialización JSON

Cada línea en el array `source` es un string independiente:
- Cada línea debe terminar con `\n` (excepto opcionalmente la última)
- Comillas dobles: `\"`
- Backslashes: `\\`
- **No usar** un solo string con `\n` embebidos — usar array de líneas

## Arquitectura del Entorno REPL

El REPL de Node.js Notebooks ejecuta en el contexto de Node.js completo:

- **`fetch()`** — Global en Node.js ≥18, ideal para llamadas HTTP a servicios del stack
- **`require()`** / **`import()`** — Importar módulos instalados en el workspace
- **`process.env`** — Variables de entorno (incluido `WORKSPACE_FOLDER`)
- **`fs`, `path`** — File system del workspace
- **Variables persisten entre celdas** — El contexto REPL es compartido en toda la sesión
- **`child_process.exec()`** — Ejecutar comandos del sistema (npm, bun, git)
- **Debugging** — Soporte nativo con breakpoints de VS Code
- **TensorFlow.js** — Integración nativa para notebooks de ML

## Puertos del Scriptorium (Referencia Canónica)

| Stack | Servicio | Puerto | Descripción |
|-------|---------|--------|-------------|
| MCP | Launcher | 3050 | MCP Mesh entry point |
| MCP | Model | 4001 | Preset Service REST API |
| MCP | DevOps | 3003 | DevOps MCP Server |
| MCP | AAIA | 3007 | Agentes Autónomos |
| MCP | Firehose | 3008 | Pipeline Bluesky/ONFALO |
| BHS | BotHub | 3010 | Telegram Bot Hub MCP |
| AIA | Backend | 8007 | AAIA Gateway Express |
| AIA | Frontend | 4200 | Angular SPA |
| APB | Service | 8000 | SWI-Prolog REST API |
| APB | App | 5001 | PrologEditor Angular |
| NOV | Server | 3066 | Novelist MCP Server |
| NOV | UI | 8080 | Novelist Docs/UI |
| TPE | Server | 3019 | TypedPrompts Editor |
| TPE | MCP | 3020 | TypedPrompts MCP Server |
| OAE | Swagger | 3021 | OpenAPI/Redocly |
| OAE | AsyncAPI | 3022 | AsyncAPI Studio |
| NRE | Editor | 1880 | Node-RED Flow Editor |
| NRE | GamifyUI | 3088 | Node-RED Gamify UI |
| BLE | Editor | 4200 | Blockly Angular (comparte con AIA) |
| BLE | Runtime | 5000 | Blockly Runtime |
| JKL | Site | 4000 | Jekyll Docs Site |
| ZEU | UI | 3012 | Zeus MCP Gallery UI |
| CHS | Server | 3000 | Socket.IO Server |
| CHS | AdminUI | 3100 | Socket.IO Admin UI |
| INS | Inspector | 6274 | MCP Inspector |

## Patrones de Código Recomendados

### 1. Health Check Estándar (siempre incluir en la primera celda de código)

```javascript
async function healthCheck(port, urlPath = '/', timeout = 2000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const r = await fetch(`http://localhost:${port}${urlPath}`, { signal: ctrl.signal });
    clearTimeout(t);
    return { port, ok: r.ok, status: r.status };
  } catch (e) {
    clearTimeout(t);
    return { port, ok: false, status: 0, error: e.name };
  }
}
```

### 2. Tabla de Estado de Servicios

```javascript
async function checkServices(services) {
  const results = await Promise.all(
    services.map(async s => {
      const h = await healthCheck(s.port, s.path || '/');
      return {
        stack: s.stack,
        name: s.name,
        port: s.port,
        estado: h.ok ? '🟢 OK' : '🔴 OFF',
        http: h.status
      };
    })
  );
  console.table(results);
  return results;
}
```

### 3. Llamada a MCP Tool (JSON-RPC 2.0)

```javascript
async function mcpRequest(port, method, params = {}) {
  const res = await fetch(`http://localhost:${port}/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() })
  });
  return res.json();
}

// Uso: listar tools del Launcher
const tools = await mcpRequest(3050, 'tools/list');
console.table(tools?.result?.tools?.map(t => ({ name: t.name })));
```

### 4. Abrir URL en Navegador (Windows)

```javascript
const { exec } = require('child_process');
exec('cmd /c start http://localhost:3012'); // Zeus UI
```

### 5. Leer JSONC (tasks.json con comentarios)

```javascript
const fs = require('fs'), path = require('path');
const raw = fs.readFileSync(path.join(WORKSPACE, '.vscode/tasks.json'), 'utf-8');
const clean = raw.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
const tasks = JSON.parse(clean);
```

## Convenciones de Notebooks

### Estructura de un Notebook Bien Formado

1. **Celda 0** — Markdown: Título, propósito, fecha de generación, instrucciones de uso
2. **Celda 1** — Código: `WORKSPACE`, `healthCheck()`, `mcpRequest()` y utilidades base
3. **Celdas N-M** — Secciones temáticas: markdown de contexto + código alternados
4. **Celda final** — Markdown: Referencias, próximos pasos, links a prompts

### Nomenclatura de Archivos

| Nombre | Descripción |
|--------|-------------|
| `quickstart.nnb` | Bienvenida y primer contacto |
| `panel-control.nnb` | Dashboard de servicios del Scriptorium |
| `mcp-explorer.nnb` | Exploración de MCPGallery |
| `bothub-demo.nnb` | Demo BotHubSDK + IACM |
| `stack-diagnostics.nnb` | Diagnóstico completo |
| `{tema}-{fecha}.nnb` | Notebooks personalizados del usuario |

### Ubicación Canónica

```
ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/
├── quickstart.nnb        ← incluido en el plugin
├── panel-control.nnb     ← incluido en el plugin
└── {generados dinámicamente por prompts y usuario}
```

## Anti-patrones

| Anti-patrón | Motivo | Alternativa |
|-------------|--------|-------------|
| Hardcodear tokens/credenciales | Seguridad (OWASP A02) | `process.env.TOKEN` |
| Modificar archivos fuera de `ARCHIVO/PLUGINS/` | Riesgo de corrupción | Solo leer workspace, escribir en ARCHIVO |
| `require()` sin verificar existencia | Error de módulo en REPL | `fs.existsSync(path.join(WS, 'node_modules/...'))` |
| Celdas de código sin celda markdown contextualizadora | Inmantenible | Alternar siempre markdown + código |
| Loops infinitos en celdas | Bloquea el kernel | Incluir contador o timeout siempre |
| Llamadas `fetch()` sin timeout | Cuelga el REPL si el servicio no responde | Siempre usar `AbortController` con timeout |

## Integración con Otros Plugins

| Plugin | Punto de Integración | Ejemplo |
|--------|---------------------|---------|
| `mcp-presets` | Llamar a tools MCP vía `mcpRequest(3050, ...)` | Listar tools del Launcher |
| `bot-hub-sdk` | Boot mock + builders IACM en celdas | Ver `demo-bothub-sdk.prompt.md` |
| `prolog-editor` | Consultas REST al backend SWI-Prolog (8000) | `fetch('http://localhost:8000/query', ...)` |
| `wire-editor` | API de Node-RED (1880) para leer/modificar flows | `fetch('http://localhost:1880/flows')` |
| `typed-prompting` | Validar JSON contra esquemas en servidor (3019) | `fetch('http://localhost:3019/validate', ...)` |
| `novelist` | Explorar obras via Novelist MCP (3066) | `mcpRequest(3066, 'tools/call', { name: '...' })` |
