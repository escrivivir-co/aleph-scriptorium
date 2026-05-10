---
name: Demo MCPGallery
description: "Genera un notebook .nnb de exploración interactiva de MCPGallery: Launcher (3050), Model (4001), Zeus (3012), Channels (3000)."
mode: agent
tools: ['read', 'edit']
---

# Demo MCPGallery (Notebook)

> **Plugin**: nodejs-notebooks  
> **Agente**: NodejsNotebooks  
> **Salida**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/mcp-explorer.nnb`

## Objetivo

Generar un notebook interactivo para explorar el ecosistema **MCPGallery** del Scriptorium desde el REPL de Node.js. Cada sección cubre un servicio y degrada graciosamente si el servicio no está corriendo.

## Proceso

### 1. Leer Contexto

Antes de generar, leer:
- `MCPGallery/package.json` — Scripts disponibles, workspaces
- `MCPGallery/mcp-mesh-sdk/package.json` — Scripts del Launcher (si existe)

### 2. Estructura del Notebook a Generar

#### Sección 0: Portada (markdown)

```markdown
# 🔌 MCPGallery Explorer — Aleph Scriptorium

Exploración interactiva del ecosistema MCPGallery vía Node.js REPL.

## Servicios que exploramos
| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Launcher | 3050 | MCP Mesh entry point — tools, resources, prompts |
| Model | 4001 | Preset Service REST API |
| DevOps | 3003 | DevOps MCP Server |
| AAIA | 3007 | Agentes Autónomos |
| Zeus UI | 3012 | MCP Gallery UI |
| Channels | 3000 | Socket.IO Server |
| Inspector | 6274 | MCP Inspector |

> Ejecutar celdas de arriba a abajo. Cada sección maneja graciosamente servicios offline.
```

#### Sección 1: Utilidades Base (código)

```javascript
const WORKSPACE = process.env.WORKSPACE_FOLDER ?? require('path').resolve('.');

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
  const check = await healthCheck(port);
  if (!check.ok) {
    console.warn(`⚠️ Puerto ${port} no disponible. Skipping ${method}.`);
    return null;
  }
  const res = await fetch(`http://localhost:${port}/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() })
  });
  return res.json();
}

console.log('✅ Utilidades MCPGallery Explorer cargadas.');
```

#### Sección 2: Estado General MCPGallery (markdown + código)

Markdown: `## 🩺 Estado General MCPGallery`

Código:
```javascript
const mcpServices = [
  { name: 'Launcher',  port: 3050 },
  { name: 'Model',     port: 4001 },
  { name: 'DevOps',    port: 3003 },
  { name: 'AAIA',      port: 3007 },
  { name: 'Firehose',  port: 3008 },
  { name: 'Zeus',      port: 3012 },
  { name: 'Channels',  port: 3000 },
  { name: 'Inspector', port: 6274 },
];

const status = await Promise.all(
  mcpServices.map(async s => {
    const h = await healthCheck(s.port);
    return { service: s.name, port: s.port, estado: h.ok ? '🟢' : '🔴', http: h.status || '-' };
  })
);
console.table(status);
const online = status.filter(s => s.estado === '🟢').length;
console.log(`\n📊 MCPGallery: ${online}/${status.length} servicios online`);
```

#### Sección 3: Explorar Launcher MCP (markdown + código)

Markdown: `## 🚀 Launcher MCP (puerto 3050)\n\nEl Launcher es el entry point de la mesh. Expone las herramientas MCP del Scriptorium vía JSON-RPC 2.0.`

Código — Listar tools:
```javascript
const tools = await mcpRequest(3050, 'tools/list');
if (tools) {
  const toolList = tools?.result?.tools ?? [];
  console.log(`✅ ${toolList.length} tools disponibles en Launcher:`);
  console.table(toolList.map(t => ({
    name: t.name,
    description: (t.description ?? '').slice(0, 70)
  })));
}
```

Código — Listar recursos:
```javascript
const resources = await mcpRequest(3050, 'resources/list');
if (resources) {
  const resourceList = resources?.result?.resources ?? [];
  console.log(`📦 ${resourceList.length} recursos disponibles:`);
  console.table(resourceList.map(r => ({ name: r.name, uri: r.uri })));
}
```

Código — Listar prompts:
```javascript
const prompts = await mcpRequest(3050, 'prompts/list');
if (prompts) {
  const promptList = prompts?.result?.prompts ?? [];
  console.log(`💬 ${promptList.length} prompts MCP disponibles:`);
  console.table(promptList.map(p => ({ name: p.name, description: (p.description ?? '').slice(0, 60) })));
}
```

#### Sección 4: Explorar Model Service (markdown + código)

Markdown: `## 📐 Model Service (puerto 4001)\n\nREST API de gestión de presets MCP. Expone endpoints para crear, listar y aplicar configuraciones.`

Código:
```javascript
const modelOk = await healthCheck(4001);
if (modelOk.ok) {
  // Intentar listar presets
  const presets = await fetch('http://localhost:4001/presets').then(r => r.json()).catch(() => null);
  if (presets) {
    console.log('Presets disponibles:');
    console.table(Array.isArray(presets) ? presets.slice(0, 10) : [presets]);
  } else {
    // Intentar health endpoint
    const health = await fetch('http://localhost:4001/health').then(r => r.json()).catch(e => ({ error: e.message }));
    console.log('Model Service health:', health);
  }
} else {
  console.warn('⚠️ Model Service (4001) no disponible. Iniciar con: MCP: Start [Model]');
}
```

#### Sección 5: Zeus UI (markdown + código)

Markdown: `## ⚡ Zeus UI (puerto 3012)\n\nInterfaz web de gestión de presets MCP. Visualiza y administra la configuración de herramientas.`

Código:
```javascript
const zeus = await healthCheck(3012);
console.log('Zeus UI:', zeus.ok ? '🟢 Online' : '🔴 Offline');

if (zeus.ok) {
  console.log('✅ Zeus UI disponible en: http://localhost:3012');
  // Abrir en navegador (descomentar según OS):
  // const { exec } = require('child_process');
  // exec('cmd /c start http://localhost:3012');     // Windows
  // exec('open http://localhost:3012');              // macOS
}
```

#### Sección 6: Channels SDK / Socket.IO (markdown + código)

Markdown: `## 📡 Channels SDK / Socket.IO (puerto 3000)\n\nServidor Socket.IO del Scriptorium. Admin UI disponible en puerto 3100.`

Código:
```javascript
const sio = await healthCheck(3000);
const admin = await healthCheck(3100);

console.log('Socket.IO Server (3000):', sio.ok ? '🟢' : '🔴');
console.log('Socket.IO Admin UI (3100):', admin.ok ? '🟢' : '🔴');

if (sio.ok) {
  // Intentar handshake de Socket.IO
  const handshake = await fetch('http://localhost:3000/socket.io/?EIO=4&transport=polling')
    .then(r => r.text())
    .catch(() => null);
  if (handshake) {
    console.log('Socket.IO handshake OK:', handshake.slice(0, 80) + '...');
  }
}
```

#### Sección 7: Llamar a una Tool MCP (markdown + código)

Markdown: `## 🔧 Llamar a una Tool MCP\n\nEjemplo de llamada directa a una herramienta MCP del Launcher.`

Código:
```javascript
// Ejemplo: llamar a get_usage_metrics si disponible
const toolCall = await mcpRequest(3050, 'tools/call', {
  name: 'get_usage_metrics',
  arguments: {}
});

if (toolCall?.result) {
  console.log('📊 Métricas de uso MCP:');
  console.log(JSON.stringify(toolCall.result, null, 2));
} else if (toolCall === null) {
  console.warn('⚠️ Launcher no disponible.');
} else {
  // La tool puede no existir, mostrar error
  console.log('Respuesta:', JSON.stringify(toolCall, null, 2));
}
```

#### Sección 8: MCP Inspector (markdown + código)

Markdown: `## 🔍 MCP Inspector (puerto 6274)\n\nHerramienta de inspección y testing de servidores MCP.`

Código:
```javascript
const inspector = await healthCheck(6274);
console.log('MCP Inspector (6274):', inspector.ok ? '🟢 Online' : '🔴 Offline');

if (inspector.ok) {
  console.log('✅ Inspector disponible en: http://localhost:6274');
  // Abrir (descomentar):
  // require('child_process').exec('cmd /c start http://localhost:6274');
} else {
  console.log('▶️ Iniciar con: INS: Start [Inspector] en VS Code Tasks');
}
```

#### Sección Final: Referencias (markdown)

```markdown
## 📚 Recursos MCPGallery

| Recurso | URL / Ruta |
|---------|-----------|
| Zeus UI | http://localhost:3012 |
| Inspector | http://localhost:6274 |
| Launcher API | http://localhost:3050/mcp |
| Model API | http://localhost:4001 |
| MCPGallery repo | `MCPGallery/` |
| Tasks de inicio | `.vscode/tasks.json` (grupo `mcp-stack`) |

Para explorar más: `/demo-bothub-sdk` o `/diagnostico-stack`
```

### 3. Instrucciones de Implementación

Al generar el notebook:
1. Leer `MCPGallery/package.json` para confirmar scripts actualizados
2. Cada llamada `mcpRequest()` y `fetch()` debe tener manejo de error
3. Nunca asumir que un servicio está corriendo — verificar primero con `healthCheck()`
4. Guardar en `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/mcp-explorer.nnb`
