---
name: Demo BotHubSDK
description: "Genera un notebook .nnb de exploración de BotHubSDK: boot en modo mock, construcción de mensajes IACM, parsing y listado de plugins."
mode: agent
tools: ['read', 'edit']
---

# Demo BotHubSDK (Notebook)

> **Plugin**: nodejs-notebooks  
> **Agente**: NodejsNotebooks  
> **Salida**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/bothub-demo.nnb`

## Objetivo

Generar un notebook interactivo para explorar **BotHubSDK** del Scriptorium. Funciona en **modo mock** (sin token de Telegram real). Incluye exploración del protocolo IACM, patrones de BotPlugin y el MCP Server de BotHub.

## Proceso

### 1. Leer Contexto

Antes de generar, leer:
- `BotHubSDK/README.md` — Primeras 80 líneas (descripción del SDK y IACM)
- `BotHubSDK/package.json` — Scripts, exports, versión

### 2. Estructura del Notebook a Generar

#### Sección 0: Portada (markdown)

```markdown
# 🤖 BotHubSDK Demo — Aleph Scriptorium

Exploración interactiva de BotHubSDK en **modo mock** (sin token de Telegram).

## Qué exploraremos
- **BotPlugin pattern**: interfaz composable para bots de Telegram
- **Protocolo IACM v1.0**: 11 tipos de mensaje inter-agente
- **IACM Builders**: construcción tipada de mensajes
- **IACM Parsing**: detección y análisis de mensajes
- **BotHub MCP Server**: exploración via JSON-RPC (si está corriendo)

> Para funcionalidad completa con Telegram real, configurar `BOT_TOKEN` en `.env` de `BotHubSDK/`.
> Compilar SDK: `cd BotHubSDK && bun run build:sdk`
```

#### Sección 1: Utilidades Base + Verificar SDK (código)

```javascript
const path = require('path');
const fs   = require('fs');

const WORKSPACE = process.env.WORKSPACE_FOLDER ?? path.resolve('.');
const SDK_PATH  = path.join(WORKSPACE, 'BotHubSDK');
const DIST_PATH = path.join(SDK_PATH, 'dist');

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

// Verificar estado del SDK
const checks = {
  'BotHubSDK instalado': fs.existsSync(SDK_PATH),
  'SDK compilado (dist/)': fs.existsSync(DIST_PATH),
  'package.json presente': fs.existsSync(path.join(SDK_PATH, 'package.json')),
  '.env presente': fs.existsSync(path.join(SDK_PATH, '.env')),
};
console.table(Object.entries(checks).map(([check, ok]) => ({ check, status: ok ? '✅' : '❌' })));

if (!checks['SDK compilado (dist/)']) {
  console.warn('\n⚠️ SDK no compilado. Para compilar:');
  console.warn('   cd BotHubSDK && bun run build:sdk');
}
```

#### Sección 2: Protocolo IACM v1.0 (markdown + código)

Markdown:
```markdown
## 📨 Protocolo IACM v1.0

El protocolo **Inter-Agent Communication Message (IACM)** define 11 tipos de mensaje estándar para comunicación entre agentes en grupos de Telegram.

| Tipo | Uso |
|------|-----|
| `REQUEST` | Solicitar acción a otro agente |
| `REPORT` | Reportar resultado o estado |
| `QUESTION` | Hacer una pregunta |
| `ANSWER` | Responder una pregunta |
| `PROPOSAL` | Proponer algo (requiere ACCEPT/REJECT) |
| `ACCEPT` | Aceptar una propuesta |
| `REJECT` | Rechazar una propuesta |
| `DEFER` | Posponer decisión |
| `ACKNOWLEDGE` | Confirmar recepción |
| `FYI` | Información sin respuesta requerida |
| `URGENT` | Mensaje de alta prioridad |
```

Código — Definir builders IACM:
```javascript
// Implementación de IACM v1.0 (compatible con BotHubSDK)
const IACM_TYPES = [
  'REQUEST', 'REPORT', 'QUESTION', 'ANSWER',
  'PROPOSAL', 'ACCEPT', 'REJECT', 'DEFER',
  'ACKNOWLEDGE', 'FYI', 'URGENT'
];

function buildIacmMessage(type, from, to, content, extra = {}) {
  if (!IACM_TYPES.includes(type)) throw new Error(`Tipo IACM inválido: ${type}`);
  return { v: '1.0', type, from, to, content, ts: new Date().toISOString(), ...extra };
}

// Builders tipados para los 11 tipos
const IACM = {
  request:     (from, to, content, opts) => buildIacmMessage('REQUEST',     from, to, content, opts),
  report:      (from, to, content, opts) => buildIacmMessage('REPORT',      from, to, content, opts),
  question:    (from, to, content, opts) => buildIacmMessage('QUESTION',    from, to, content, opts),
  answer:      (from, to, content, opts) => buildIacmMessage('ANSWER',      from, to, content, opts),
  proposal:    (from, to, content, opts) => buildIacmMessage('PROPOSAL',    from, to, content, opts),
  accept:      (from, to, content, opts) => buildIacmMessage('ACCEPT',      from, to, content, opts),
  reject:      (from, to, content, opts) => buildIacmMessage('REJECT',      from, to, content, opts),
  defer:       (from, to, content, opts) => buildIacmMessage('DEFER',       from, to, content, opts),
  acknowledge: (from, to, content, opts) => buildIacmMessage('ACKNOWLEDGE', from, to, content, opts),
  fyi:         (from, to, content, opts) => buildIacmMessage('FYI',         from, to, content, opts),
  urgent:      (from, to, content, opts) => buildIacmMessage('URGENT',      from, to, content, opts),
};

console.log('✅ Builders IACM cargados:', Object.keys(IACM).join(', '));
```

#### Sección 3: Construir Mensajes IACM (markdown + código)

Markdown: `## 🏗️ Construir Mensajes IACM\n\nEjemplos de los 11 tipos de mensaje entre agentes del Scriptorium.`

Código:
```javascript
// Ejemplos de los 11 tipos entre agentes del Scriptorium
const ejemplos = [
  IACM.request('aleph-scriptorium', 'novelist-agent',
    'Generar escena para el capítulo 3 con mecanismo anti-naïf'),

  IACM.report('prolog-editor', 'scrum-master',
    'Query ejecutada con éxito: 42 soluciones en 120ms', { session: 'sess-001' }),

  IACM.question('revisor-agent', 'aleph-scriptorium',
    '¿El capítulo 2 cumple el umbral de evidencia del bluepag?'),

  IACM.answer('aleph-scriptorium', 'revisor-agent',
    'Sí, 3 fuentes verificadas. Ver refs #12, #17, #23.'),

  IACM.proposal('scrum-master', 'aleph-scriptorium',
    'Mover SCRIPT-2.6.0 a sprint 14 para reducir carga cognitiva'),

  IACM.accept('aleph-scriptorium', 'scrum-master',
    'De acuerdo, sprint 14 confirmado'),

  IACM.urgent('bot-monitor', 'aleph-scriptorium',
    '⚠️ Launcher MCP caído. Puerto 3050 no responde.'),

  IACM.fyi('prolog-editor', 'all',
    'Nuevo template Prolog disponible: teatro-personaje-v2.pl'),
];

console.table(ejemplos.map(m => ({ type: m.type, from: m.from, to: m.to, content: m.content.slice(0, 60) })));
```

#### Sección 4: Detectar y Parsear Mensajes IACM (markdown + código)

Markdown: `## 🔍 Detectar y Parsear Mensajes IACM`

Código:
```javascript
function detectsIacmMessage(msg) {
  try {
    const obj = typeof msg === 'string' ? JSON.parse(msg) : msg;
    return !!(obj && obj.v === '1.0' && IACM_TYPES.includes(obj.type) && obj.from && obj.to);
  } catch { return false; }
}

function parseIacmMessage(msg) {
  const obj = typeof msg === 'string' ? JSON.parse(msg) : msg;
  if (!detectsIacmMessage(obj)) throw new Error('No es un mensaje IACM válido v1.0');
  return {
    valid: true,
    type: obj.type,
    from: obj.from,
    to: obj.to,
    content: obj.content,
    ts: obj.ts,
    extra: Object.keys(obj).filter(k => !['v','type','from','to','content','ts'].includes(k))
  };
}

// Test: parsear todos los ejemplos
const parsed = ejemplos.map(m => parseIacmMessage(m));
console.table(parsed.map(p => ({ type: p.type, from: p.from, to: p.to, valid: p.valid })));

// Test: mensaje inválido
const invalido = { tipo: 'REQUEST', de: 'aleph', para: 'bot', texto: 'hola' };
console.log('¿Es IACM?', detectsIacmMessage(invalido));  // false
```

#### Sección 5: Patrón BotPlugin (markdown + código)

Markdown:
```markdown
## 🧩 Patrón BotPlugin

Todo bot del SDK implementa la interfaz `BotPlugin`:
- `name`: nombre del plugin
- `pluginCode`: código de 2-3 letras (prefijo de comandos)
- `commands()`: array de comandos Telegram
- `menus()`: (opcional) menús inline
- `onMessage()`: (opcional) handler de mensajes libres
```

Código:
```javascript
// Simulación del patrón BotPlugin sin necesitar el SDK compilado
const createMockPlugin = (name, pluginCode, commands) => ({
  name,
  pluginCode,
  commands: () => commands.map(cmd => ({
    command: `${pluginCode}_${cmd.name}`,
    description: cmd.description,
    handler: async (ctx) => {
      console.log(`[${name}] Ejecutando /${pluginCode}_${cmd.name} para chat ${ctx?.chat?.id ?? 'mock'}`);
    }
  }))
});

// Ejemplos de plugins del Scriptorium
const rabbitBot = createMockPlugin('RabbitBot', 'rb', [
  { name: 'aleph',  description: 'Invocar al agente Aleph' },
  { name: 'status', description: 'Ver estado del bot' },
]);

const iacmBot = createMockPlugin('IACMBot', 'iacm', [
  { name: 'send',  description: 'Enviar mensaje IACM' },
  { name: 'parse', description: 'Parsear mensaje IACM del chat' },
  { name: 'log',   description: 'Ver historial de mensajes IACM' },
]);

const scriptoriumBot = createMockPlugin('ScriptoriumBot', 'sc', [
  { name: 'health', description: 'Health check del stack' },
  { name: 'task',   description: 'Ejecutar una VS Code task' },
  { name: 'mcp',    description: 'Llamar a un MCP tool' },
]);

// Mostrar plugins
[rabbitBot, iacmBot, scriptoriumBot].forEach(plugin => {
  console.log(`\n[${plugin.name}] (código: ${plugin.pluginCode})`);
  console.table(plugin.commands().map(c => ({ command: `/${c.command}`, description: c.description })));
});
```

#### Sección 6: BotHub MCP Server (markdown + código)

Markdown: `## 🌐 BotHub MCP Server (puerto 3010)\n\nSi el MCP server de BotHub está corriendo, explorar sus 14 tools via JSON-RPC.`

Código:
```javascript
const bhsStatus = await healthCheck(3010);
console.log('BotHub MCP Server (3010):', bhsStatus.ok ? '🟢 Online' : '🔴 Offline');

if (bhsStatus.ok) {
  const tools = await fetch('http://localhost:3010/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'tools/list', params: {}, id: 1 })
  }).then(r => r.json()).catch(() => null);

  if (tools?.result?.tools) {
    console.log('Tools disponibles en BotHub MCP:');
    console.table(tools.result.tools.map(t => ({
      name: t.name,
      description: (t.description ?? '').slice(0, 70)
    })));
  }
} else {
  console.log('▶️ Iniciar con: BHS: Start [Server] en VS Code Tasks');
}
```

#### Sección Final: Referencias (markdown)

```markdown
## 📚 Recursos BotHubSDK

| Recurso | Ruta |
|---------|------|
| SDK fuentes | `BotHubSDK/src/` |
| Spec IACM | `BotHubSDK/specs/17-iacm-protocol.md` |
| Ejemplos | `BotHubSDK/examples/` |
| Console app | `BotHubSDK/examples/console-app/` |
| Dashboard TUI | `BotHubSDK/examples/dashboard/` |
| IACM demo | `BotHubSDK/examples/iacm-demo/` |

Para compilar el SDK: `cd BotHubSDK && bun run build:sdk`  
Para el dashboard TUI: `cd BotHubSDK && bun run dev:dashboard`
```

### 3. Instrucciones de Implementación

1. Leer `BotHubSDK/README.md` (50 líneas) antes de generar para contexto actualizado
2. Verificar que los tipos IACM listados coinciden con `BotHubSDK/src/core/iacm/` si está disponible
3. El notebook DEBE funcionar sin SDK compilado (modo standalone)
4. Guardar en `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/bothub-demo.nnb`
