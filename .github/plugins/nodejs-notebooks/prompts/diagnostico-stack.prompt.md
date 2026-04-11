---
name: Diagnóstico Stack Completo
description: "Genera un notebook .nnb que realiza un diagnóstico exhaustivo del stack: health checks de todos los puertos, verificación de dependencias del sistema y tabla de estado."
mode: agent
tools: ['read', 'edit']
---

# Diagnóstico Stack Completo (Notebook)

> **Plugin**: nodejs-notebooks  
> **Agente**: NodejsNotebooks  
> **Salida**: `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/stack-diagnostics.nnb`

## Objetivo

Generar un notebook de diagnóstico exhaustivo que evalúa el estado completo del stack del Scriptorium: dependencias del sistema, health checks de todos los servicios, conflictos de puertos y recomendaciones de inicio.

## Proceso

### 1. Leer Contexto

Antes de generar, confirmar puertos actualizados leyendo `.vscode/tasks.json`.

### 2. Estructura del Notebook a Generar

#### Sección 0: Portada (markdown)

```markdown
# 🩺 Diagnóstico Stack — Aleph Scriptorium
**Propósito**: Evaluación completa del estado del stack (onboarding y troubleshooting).

## Qué verifica este notebook
1. **Dependencias del sistema** — node, npm, bun, git, swipl, jekyll
2. **Health checks** — 25 servicios en 13 stacks en paralelo
3. **Conflictos de puerto** — Detectar stacks que comparten el mismo puerto
4. **Archivos críticos** — Verificar que los archivos clave del workspace existen
5. **Recomendaciones** — Comandos de inicio para servicios offline

> Ejecutar de arriba a abajo. El diagnóstico tarda ~5-10 segundos (health checks paralelos).
```

#### Sección 1: Utilidades Base (código)

```javascript
const { execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

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

console.log('✅ Utilidades cargadas. Node.js:', process.version);
console.log('   WORKSPACE:', WORKSPACE);
```

#### Sección 2: Verificar Dependencias del Sistema (markdown + código)

Markdown: `## 🔧 Dependencias del Sistema`

Código:
```javascript
function checkBinary(cmd, versionFlag = '--version') {
  try {
    const v = execSync(`${cmd} ${versionFlag} 2>&1`, { stdio: 'pipe' })
      .toString().trim().split('\n')[0];
    return { tool: cmd, status: '✅ OK', version: v.slice(0, 60) };
  } catch {
    return { tool: cmd, status: '❌ no encontrado', version: '' };
  }
}

const deps = [
  checkBinary('node'),
  checkBinary('npm'),
  checkBinary('bun'),
  checkBinary('npx'),
  checkBinary('git'),
  (() => {
    try {
      const v = execSync('swipl --version 2>&1', { stdio: 'pipe' }).toString().split('\n')[0].trim();
      return { tool: 'swipl', status: '✅ OK', version: v.slice(0, 60) };
    } catch { return { tool: 'swipl', status: '⚠️ no encontrado (requerido por PrologEditor)', version: '' }; }
  })(),
  (() => {
    try {
      const v = execSync('jekyll --version 2>&1', { stdio: 'pipe' }).toString().trim();
      return { tool: 'jekyll', status: '✅ OK', version: v };
    } catch { return { tool: 'jekyll', status: '⚠️ no encontrado (opcional, para JKL)', version: '' }; }
  })(),
];

console.table(deps);
const missing = deps.filter(d => d.status.startsWith('❌'));
if (missing.length > 0) {
  console.warn(`\n⚠️ ${missing.length} herramienta(s) requerida(s) no encontradas: ${missing.map(d => d.tool).join(', ')}`);
} else {
  console.log('\n✅ Todas las dependencias del sistema están disponibles.');
}
```

#### Sección 3: Definir Todos los Servicios (código)

```javascript
// Mapa completo de servicios del Scriptorium (fuente: .vscode/tasks.json)
const ALL_SERVICES = [
  // MCP Stack
  { stack: 'MCP', name: 'Launcher',        port: 3050, taskLabel: 'MCP: Start [Launcher]' },
  { stack: 'MCP', name: 'Model',           port: 4001, taskLabel: 'MCP: Start [Model]' },
  { stack: 'MCP', name: 'DevOps',          port: 3003, taskLabel: 'MCP: Start [DevOps]' },
  { stack: 'MCP', name: 'AAIA',            port: 3007, taskLabel: 'MCP: Start [AAIA]' },
  { stack: 'MCP', name: 'Firehose',        port: 3008, taskLabel: 'MCP: Start [Firehose]' },
  // BHS
  { stack: 'BHS', name: 'BotHub',          port: 3010, taskLabel: 'BHS: Start [Server]' },
  // AIA
  { stack: 'AIA', name: 'Backend',         port: 8007, taskLabel: 'AIA: Start [Backend]' },
  { stack: 'AIA', name: 'Frontend',        port: 4200, taskLabel: 'AIA: Start [Frontend]' },
  // APB
  { stack: 'APB', name: 'PrologService',   port: 8000, taskLabel: 'APB: Start [Service]' },
  { stack: 'APB', name: 'PrologApp',       port: 5001, taskLabel: 'APB: Start [App]' },
  // NOV
  { stack: 'NOV', name: 'NovelistServer',  port: 3066, taskLabel: 'NOV: Start [Server]' },
  { stack: 'NOV', name: 'NovelistUI',      port: 8080, taskLabel: 'NOV: Start [UI]' },
  // TPE
  { stack: 'TPE', name: 'TypedPrompts',    port: 3019, taskLabel: 'TPE: Start [Server]' },
  { stack: 'TPE', name: 'TypedMCP',        port: 3020, taskLabel: 'TPE: Start [MCP]' },
  // OAE
  { stack: 'OAE', name: 'Swagger',         port: 3021, taskLabel: 'OAE: Start [Swagger]' },
  { stack: 'OAE', name: 'AsyncAPI',        port: 3022, taskLabel: 'OAE: Start [AsyncAPI]' },
  // NRE
  { stack: 'NRE', name: 'NodeRED',         port: 1880, taskLabel: 'NRE: Start [Editor]' },
  { stack: 'NRE', name: 'GamifyUI',        port: 3088, taskLabel: 'NRE: Start [GamifyUI]' },
  // BLE
  { stack: 'BLE', name: 'BlocklyEditor',   port: 4200, taskLabel: 'BLE: Start [Editor]' },
  { stack: 'BLE', name: 'BlocklyRuntime',  port: 5000, taskLabel: 'BLE: Start [Runtime]' },
  // JKL
  { stack: 'JKL', name: 'Jekyll',          port: 4000, taskLabel: 'JKL: Start [Site]' },
  // ZEU
  { stack: 'ZEU', name: 'Zeus',            port: 3012, taskLabel: 'ZEU: Start [UI]' },
  // CHS
  { stack: 'CHS', name: 'SocketServer',    port: 3000, taskLabel: 'CHS: Start [Server]' },
  { stack: 'CHS', name: 'SocketAdmin',     port: 3100, taskLabel: 'CHS: Start [AdminUI]' },
  // INS
  { stack: 'INS', name: 'Inspector',       port: 6274, taskLabel: 'INS: Start [Inspector]' },
];

console.log(`📋 ${ALL_SERVICES.length} servicios registrados en ${new Set(ALL_SERVICES.map(s => s.stack)).size} stacks.`);
```

#### Sección 4: Health Check Completo (markdown + código)

Markdown: `## 🚦 Health Check Completo (paralelo)`

Código:
```javascript
console.log(`\nVerificando ${ALL_SERVICES.length} servicios en paralelo...`);
const t0 = Date.now();

const results = await Promise.all(ALL_SERVICES.map(async s => {
  const ts = Date.now();
  const h = await healthCheck(s.port);
  const ms = Date.now() - ts;
  return {
    stack:   s.stack,
    service: s.name,
    port:    s.port,
    '●':     h.ok ? '🟢' : '🔴',
    http:    h.status || '-',
    ms:      h.ok ? ms : '-',
    task:    h.ok ? '' : s.taskLabel
  };
}));

console.log(`\n⏱ Tiempo total: ${Date.now() - t0}ms\n`);
console.table(results);

const online  = results.filter(r => r['●'] === '🟢').length;
const offline = results.filter(r => r['●'] === '🔴').length;
console.log(`\n📊 Resumen: ${online} online, ${offline} offline (${Math.round(online/results.length*100)}%)`);
```

#### Sección 5: Análisis de Conflictos de Puerto (markdown + código)

Markdown: `## ⚠️ Conflictos de Puerto\n\nDetecta stacks que comparten el mismo puerto (solo uno puede estar activo a la vez).`

Código:
```javascript
const portMap = {};
for (const s of ALL_SERVICES) {
  if (!portMap[s.port]) portMap[s.port] = [];
  portMap[s.port].push(`${s.stack}/${s.name}`);
}

const conflicts = Object.entries(portMap).filter(([, svcs]) => svcs.length > 1);

if (conflicts.length > 0) {
  console.warn('⚠️ Puertos compartidos entre stacks (solo uno activo a la vez):');
  console.table(conflicts.map(([port, svcs]) => ({
    port: Number(port),
    services: svcs.join(' | '),
    nota: 'Conflicto potencial'
  })));
} else {
  console.log('✅ Sin conflictos de puerto detectados.');
}
```

#### Sección 6: Verificar Archivos Críticos (markdown + código)

Markdown: `## 📁 Archivos Críticos del Workspace`

Código:
```javascript
const criticalFiles = [
  { file: '.vscode/tasks.json',                  required: true,  desc: 'Tasks de VS Code' },
  { file: '.github/plugins/registry.json',       required: true,  desc: 'Registry de plugins' },
  { file: '.gitmodules',                         required: true,  desc: 'Submódulos git' },
  { file: 'MCPGallery/package.json',             required: true,  desc: 'MCPGallery workspace' },
  { file: 'BotHubSDK/package.json',              required: true,  desc: 'BotHubSDK' },
  { file: 'BotHubSDK/dist/index.js',             required: false, desc: 'BotHubSDK compilado' },
  { file: 'BotHubSDK/.env',                      required: false, desc: 'BotHubSDK config' },
  { file: 'PrologEditor/package.json',           required: true,  desc: 'PrologEditor' },
  { file: 'NovelistEditor/package.json',         required: true,  desc: 'NovelistEditor' },
  { file: 'workspace-config.json',               required: true,  desc: 'Config del workspace' },
];

const fileChecks = criticalFiles.map(f => ({
  file: f.file,
  status: fs.existsSync(path.join(WORKSPACE, f.file))
    ? '✅' : (f.required ? '❌ FALTANTE' : '⚠️ Opcional'),
  desc: f.desc
}));
console.table(fileChecks);

const missing = fileChecks.filter(f => f.status.startsWith('❌'));
if (missing.length > 0) {
  console.error(`\n❌ ${missing.length} archivo(s) requerido(s) faltante(s):`);
  missing.forEach(f => console.error(`   - ${f.file} (${f.desc})`));
}
```

#### Sección 7: Recomendaciones (markdown + código)

Markdown: `## 💡 Recomendaciones de Inicio`

Código:
```javascript
const offline = results.filter(r => r['●'] === '🔴');

if (offline.length === 0) {
  console.log('✅ Todos los servicios están online. No se requiere acción.');
} else {
  const stacksOffline = [...new Set(offline.map(s => s.stack))];
  console.log(`\n🔴 ${offline.length} servicios offline en ${stacksOffline.length} stacks:\n`);

  for (const stack of stacksOffline) {
    const svcs = offline.filter(s => s.stack === stack);
    console.log(`  📦 Stack ${stack} (${svcs.length} servicio(s)):`);
    svcs.forEach(s => {
      console.log(`     ▶️ VS Code → Tasks → "${s.task}"`);
    });
  }

  console.log('\n📝 Notas:');
  console.log('  - Para el stack completo: SCP: Start Full Stack');
  console.log('  - Para demo ligero: DMO: Start Full Stack (6 servicios)');
  console.log('  - No todos los stacks necesitan estar activos simultáneamente.');
}
```

#### Sección Final: Referencias (markdown)

```markdown
## 📚 Referencias del Stack

| Recurso | Ubicación |
|---------|-----------|
| Tasks de VS Code | `.vscode/tasks.json` |
| Registry de plugins | `.github/plugins/registry.json` |
| Mapa del workspace | `MAP.md` |
| Zeus UI (presets) | http://localhost:3012 |
| MCP Inspector | http://localhost:6274 |
| Jekyll Docs | http://localhost:4000/aleph-scriptorium/ |

### Próximos Pasos

Para explorar servicios específicos:
- `/demo-mcp-gallery` → Explorar MCPGallery en detalle
- `/demo-bothub-sdk` → Explorar BotHubSDK interactivamente
- `/panel-control-tasks` → Panel de control completo con start/stop
```

### 3. Instrucciones de Implementación

1. Leer `.vscode/tasks.json` para confirmar los `taskLabel` de cada servicio
2. El notebook debe ser **completamente autónomo** — no depende de agente activo
3. Incluir `console.table()` en cada sección para visualización clara
4. Los `ALL_SERVICES` deben estar comentados con su stack y descripción
5. Guardar en `ARCHIVO/PLUGINS/NODEJS_NOTEBOOKS/stack-diagnostics.nnb`

## Salida Esperada

Notebook con 12+ celdas que en ~10 segundos provee:
- ✅ Estado de las 7 dependencias del sistema
- ✅ Health check de los 25 servicios en 13 stacks (paralelo)
- ✅ Tabla de conflictos de puerto (puerto 4200 compartido por AIA/BLE)
- ✅ Verificación de archivos críticos del workspace
- ✅ Recomendaciones de inicio con task labels exactos de VS Code
