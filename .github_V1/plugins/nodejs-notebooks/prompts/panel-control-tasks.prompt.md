---
name: Panel de Control (Tasks)
description: "Genera un notebook interactivo que mapea .vscode/tasks.json como panel de control con health checks agrupados por stack."
mode: agent
tools: ['read', 'edit']
---

# Panel de Control desde tasks.json

> **Plugin**: nodejs-notebooks  
> **Agente**: NodejsNotebooks  
> **Salida**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/panel-control.nnb`

## Objetivo

Leer `.vscode/tasks.json` y generar un notebook `.nnb` que actúe como **panel de control interactivo** de todos los servicios del Scriptorium, agrupados por stack.

## Proceso

### 1. Leer tasks.json

```javascript
// Leer y parsear .vscode/tasks.json (formato JSONC con comentarios)
const fs = require('fs'), path = require('path');
const raw = fs.readFileSync(path.join(WORKSPACE, '.vscode/tasks.json'), 'utf-8');
const clean = raw.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
const tasksConfig = JSON.parse(clean);
```

### 2. Stacks y Puertos a Mapear

Extraídos de `.vscode/tasks.json` (usar como fuente de verdad):

| Stack | Código | Servicios | Puertos |
|-------|--------|-----------|---------|
| MCP Servers | MCP | Launcher, Model, DevOps, AAIA, Firehose | 3050, 4001, 3003, 3007, 3008 |
| BotHub SDK | BHS | Server | 3010 |
| AAIA Gallery | AIA | Backend, Frontend | 8007, 4200 |
| Prolog Brain | APB | Service, App | 8000, 5001 |
| Novelist | NOV | Server, UI | 3066, 8080 |
| Typed Prompts | TPE | Server, MCP | 3019, 3020 |
| OpenAsyncAPI | OAE | Swagger, AsyncAPI | 3021, 3022 |
| Node-RED | NRE | Editor, GamifyUI | 1880, 3088 |
| Blockly | BLE | Editor, Runtime | 4200, 5000 |
| Jekyll | JKL | Site | 4000 |
| Zeus UI | ZEU | UI | 3012 |
| Channels SDK | CHS | Server, AdminUI | 3000, 3100 |
| Inspector | INS | Inspector | 6274 |

### 3. Estructura del Notebook

El notebook generado debe tener exactamente esta estructura de secciones:

#### Sección 0: Portada (markdown)
```markdown
# 🎛️ Panel de Control — Aleph Scriptorium
**Generado**: {fecha ISO}
**Stacks**: 13 | **Servicios**: 25+

## Cómo usar
1. Ejecutar celdas de arriba a abajo (Shift+Enter)
2. **Celda de Utilidades** primero (define healthCheck, SERVICES, etc.)
3. **Dashboard Rápido** para ver estado general
4. **Secciones por Stack** para detalle + inicio/apertura
```

#### Sección 1: Utilidades + SERVICES Map (código)

Código base con el mapa completo de servicios:

```javascript
// === Panel de Control — Aleph Scriptorium ===
const WORKSPACE = process.env.WORKSPACE_FOLDER ?? require('path').resolve('.');

const SERVICES = {
  MCP: [
    { name: 'Launcher',  port: 3050, detail: 'MCP Mesh entry point', url: 'http://localhost:3050' },
    { name: 'Model',     port: 4001, detail: 'Preset Service REST',   url: 'http://localhost:4001' },
    { name: 'DevOps',    port: 3003, detail: 'DevOps MCP Server',     url: 'http://localhost:3003' },
    { name: 'AAIA',      port: 3007, detail: 'Agentes Autónomos',     url: 'http://localhost:3007' },
    { name: 'Firehose',  port: 3008, detail: 'Pipeline Bluesky',      url: 'http://localhost:3008' },
  ],
  BHS: [{ name: 'BotHub',   port: 3010, detail: 'Telegram Bot Hub',    url: 'http://localhost:3010' }],
  AIA: [
    { name: 'Backend',  port: 8007, detail: 'AAIA Gateway Express',   url: 'http://localhost:8007' },
    { name: 'Frontend', port: 4200, detail: 'Angular SPA',            url: 'http://localhost:4200' },
  ],
  APB: [
    { name: 'Service',  port: 8000, detail: 'SWI-Prolog REST API',    url: 'http://localhost:8000' },
    { name: 'App',      port: 5001, detail: 'PrologEditor Angular',   url: 'http://localhost:5001' },
  ],
  NOV: [
    { name: 'Server',   port: 3066, detail: 'Novelist MCP Server',    url: 'http://localhost:3066' },
    { name: 'UI',       port: 8080, detail: 'Novelist Docs',          url: 'http://localhost:8080' },
  ],
  TPE: [
    { name: 'Server',   port: 3019, detail: 'TypedPrompts Editor',    url: 'http://localhost:3019' },
    { name: 'MCP',      port: 3020, detail: 'TypedPrompts MCP',       url: 'http://localhost:3020' },
  ],
  OAE: [
    { name: 'Swagger',  port: 3021, detail: 'OpenAPI / Redocly',      url: 'http://localhost:3021' },
    { name: 'AsyncAPI', port: 3022, detail: 'AsyncAPI Studio',        url: 'http://localhost:3022' },
  ],
  NRE: [
    { name: 'Editor',   port: 1880, detail: 'Node-RED Flow Editor',   url: 'http://localhost:1880' },
    { name: 'GamifyUI', port: 3088, detail: 'Node-RED Gamify',        url: 'http://localhost:3088' },
  ],
  BLE: [
    { name: 'Editor',   port: 4200, detail: 'Blockly Angular Editor', url: 'http://localhost:4200' },
    { name: 'Runtime',  port: 5000, detail: 'Blockly Runtime',        url: 'http://localhost:5000' },
  ],
  JKL: [{ name: 'Site',     port: 4000, detail: 'Jekyll Docs Site',     url: 'http://localhost:4000' }],
  ZEU: [{ name: 'UI',       port: 3012, detail: 'Zeus MCP Gallery UI',  url: 'http://localhost:3012' }],
  CHS: [
    { name: 'Server',   port: 3000, detail: 'Socket.IO Server',       url: 'http://localhost:3000' },
    { name: 'AdminUI',  port: 3100, detail: 'Socket.IO Admin UI',     url: 'http://localhost:3100' },
  ],
  INS: [{ name: 'Inspector', port: 6274, detail: 'MCP Inspector',       url: 'http://localhost:6274' }],
};

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

async function checkStack(stackKey) {
  const svcs = SERVICES[stackKey] || [];
  const results = await Promise.all(svcs.map(async s => {
    const h = await healthCheck(s.port);
    return { stack: stackKey, service: s.name, port: s.port, '●': h.ok ? '🟢' : '🔴', detail: s.detail };
  }));
  console.table(results);
  return results;
}

async function checkAllServices() {
  const all = [];
  for (const key of Object.keys(SERVICES)) {
    const r = await checkStack(key);
    all.push(...r);
  }
  return all;
}

console.log('✅ Panel cargado. Servicios registrados:', Object.values(SERVICES).flat().length);
console.log('   → Ejecutar checkAllServices() para el dashboard completo');
```

#### Sección 2: Dashboard Rápido (markdown + código)

Markdown: `## 🚦 Dashboard Rápido`

Código: Llamada a `checkAllServices()` con resumen:
```javascript
const resultados = await checkAllServices();
const online = resultados.filter(r => r['●'] === '🟢').length;
const total = resultados.length;
console.log(`\n📊 Estado global: ${online}/${total} servicios online (${Math.round(online/total*100)}%)`);
```

#### Secciones 3–15: Una Sección por Stack

Para cada stack (`MCP`, `BHS`, `AIA`, `APB`, `NOV`, `TPE`, `OAE`, `NRE`, `BLE`, `JKL`, `ZEU`, `CHS`, `INS`):

**Celda Markdown**:
```markdown
## [StackCode]: [Stack Name]

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Name | Port | Detail |
```

**Celda Código** — health check + abrir en navegador (solo servicios con UI):
```javascript
// [Stack]: Health Check
await checkStack('[STACK_KEY]');

// Abrir en navegador (solo si tiene UI Web):
// const { exec } = require('child_process');
// exec('cmd /c start http://localhost:[PORT]');  // Windows
// exec('open http://localhost:[PORT]');          // macOS
```

#### Sección Final: Referencias (markdown)

```markdown
## 📚 Referencias

| Recurso | Enlace |
|---------|--------|
| tasks.json | `.vscode/tasks.json` |
| Registry de plugins | `.github/plugins/registry.json` |
| MCP Inspector | http://localhost:6274 |
| Zeus UI | http://localhost:3012 |
| Jekyll Docs | http://localhost:4000/aleph-scriptorium/ |

### Para regenerar este panel:
`@NodejsNotebooks /panel-control-tasks`
```

### 4. Guardar

Guardar como `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/panel-control.nnb`.

Este archivo reemplaza el template estático pre-generado con una versión actualizada desde `tasks.json`.
