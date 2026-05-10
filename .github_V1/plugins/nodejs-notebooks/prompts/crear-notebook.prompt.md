---
name: Crear Notebook Node.js
description: "Crea un notebook .nnb personalizado desde cero para el tema indicado."
mode: agent
tools: ['read', 'edit', 'agent']
---

# Crear Notebook Node.js

> **Plugin**: nodejs-notebooks  
> **Agente**: NodejsNotebooks  
> **Salida**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/{nombre}.nnb`

## Entrada

- **`tema`** — Descripción del notebook a crear. Ej: "explorar la API de Prolog", "mapear eventos de Socket.IO", "monitorear el Launcher MCP"
- **`nombre`** — Nombre del archivo de salida en kebab-case (sin extensión). Ej: `explore-prolog`
- **`lenguaje`** — `javascript` (default) o `typescript`

## Proceso

### 1. Analizar el Tema

Leer archivos relevantes según el tema antes de generar:

| Si menciona... | Leer |
|----------------|------|
| MCP, Launcher, tools | `MCPGallery/mcp-mesh-sdk/package.json` (primeras 30 líneas) |
| Prolog, swipl | `PrologEditor/package.json` (primeras 20 líneas) |
| bots, IACM, Telegram | `BotHubSDK/README.md` (primeras 50 líneas) |
| tasks, servicios, stack | `.vscode/tasks.json` |
| Node-RED, flows | `WiringEditor/package.json` |
| Novelist, narrativas | `NovelistEditor/package.json` (primeras 20 líneas) |

### 2. Planificar Secciones

Diseñar el notebook con esta estructura mínima antes de escribir el JSON:

```
Celda 0: Markdown — Título + propósito + puertos relevantes
Celda 1: Código   — WORKSPACE, healthCheck(), utilidades base
Celda 2: Markdown — Descripción de la primera sección temática
Celda 3: Código   — Implementación de la primera sección
... (alternar markdown + código)
Celda N: Markdown — Referencias y próximos pasos
```

### 3. Generar el JSON `.nnb`

Crear el archivo como JSON válido con las siguientes reglas:

```json
{
  "cells": [
    { "language": "markdown", "source": ["# Título\n", "Texto.\n"], "outputs": [] },
    { "language": "javascript", "source": ["console.log('ok');\n"], "outputs": [] }
  ]
}
```

**Reglas de serialización del array `"source"`**:
- Cada línea es un string terminado en `\n`
- Comillas dobles → `\"`
- Backslashes → `\\`
- Backticks → `` ` `` (no necesitan escape en JSON)
- **No usar** un solo string con `\n` — usar array de líneas

### 4. Primera Celda de Código (siempre incluir)

```javascript
// Utilidades base — ejecutar esta celda primero
const path = require('path');
const fs = require('fs');

const WORKSPACE = process.env.WORKSPACE_FOLDER ?? path.resolve('.');

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

async function mcpRequest(port, method, params = {}) {
  const res = await fetch(`http://localhost:${port}/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() })
  });
  return res.json();
}

console.log('✅ Utilidades cargadas. Node.js:', process.version);
console.log('   WORKSPACE:', WORKSPACE);
```

### 5. Guardar y Confirmar

Guardar en `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/{nombre}.nnb`.

Indicar al usuario:
1. Cómo abrir: doble-click en el explorador de VS Code (requiere extensión instalada)
2. Cómo ejecutar: `Shift+Enter` en cada celda o botón ▶, de arriba a abajo
3. Si la extensión no está instalada: `code --install-extension donjayamanne.typescript-notebook`

## Salida Esperada

Archivo `.nnb` válido con:
- Mínimo 5 celdas
- Celda 0: Markdown con título, propósito y puertos relevantes
- Celda 1: Utilidades base (`WORKSPACE`, `healthCheck`, `mcpRequest`)
- Secciones temáticas con markdown + código alternados
- Celda final: Markdown con referencias y próximos pasos

## Ejemplos

### Ejemplo 1: Explorar TypedPrompts

**Input**: `tema="explorar el servidor TypedPrompts"`, `nombre="explore-tpe"`

**Output**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/explore-tpe.nnb` con celdas que:
1. Explican el servidor TypedPrompts (puerto 3019)
2. Hacen healthCheck al 3019
3. Listan templates disponibles vía GET `/api/templates`
4. Muestran la respuesta formateada como tabla

### Ejemplo 2: Monitorear Socket.IO

**Input**: `tema="monitorear eventos del servidor Socket.IO"`, `nombre="socketio-monitor"`

**Output**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/socketio-monitor.nnb` con celdas que:
1. Explican Channels SDK (puerto 3000)
2. Verifican el handshake de Socket.IO
3. Listan rooms y conexiones activas via `socket.io-client`
4. Muestran métricas en tiempo real
