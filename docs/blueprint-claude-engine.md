---
layout: presentation
title: ClaudeEngine — Pipeline Walkthrough
description: Recorrido interactivo por las 7 fases del motor Claude Code — arquitectura y pipeline para desarrolladores
permalink: /blueprint-claude-engine/
---

<!-- ==========================================
     BLUEPRINT CLAUDE ENGINE
     SCRIPT-2.6.0 - Pipeline Walkthrough
     
     Coordinate System:
     - X: Main pipeline phases (→) — 2000px increments
     - Y: Sub-detail slides (↓) — +800px
     - Z: Start overview depth

     Navigation: ← → main phases, ↓ sub-detail, O overview
     ========================================== -->

<style>
/* ── CE Blueprint Theme ──────────────────────────────────────────────────── */
.ce-step {
  background: #0d0d0d;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  padding: 2.5rem 3rem;
  width: 850px;
  font-family: "SF Pro Display", "Segoe UI", system-ui, sans-serif;
  color: #f0f0f0;
  box-shadow: 0 0 60px rgba(245,158,11,0.06);
}

.ce-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #1f1f1f;
}
.ce-phase {
  background: #f59e0b;
  color: #000;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25em 0.7em;
  border-radius: 4px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  flex-shrink: 0;
}
.ce-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}

/* ── Phase indicator strip ── */
.ce-journey {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  font-size: 0.7rem;
}
.ce-jnode {
  padding: 0.2em 0.55em;
  border-radius: 3px;
  background: #1a1a1a;
  color: #555;
  border: 1px solid #2a2a2a;
}
.ce-jnode.done { background: #1a2a1a; color: #4ade80; border-color: #166534; }
.ce-jnode.current { background: #2a2000; color: #f59e0b; border-color: #78350f; font-weight: 700; }
.ce-jarrow { color: #333; }

/* ── Content blocks ── */
.ce-explanation {
  font-size: 0.92rem;
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.ce-explanation strong { color: #f59e0b; }
.ce-explanation code {
  background: #1f1f1f;
  color: #fcd34d;
  padding: 0.1em 0.4em;
  border-radius: 3px;
  font-size: 0.88em;
}

/* ── Code panel ── */
.ce-code-panel {
  background: #090909;
  border: 1px solid #222;
  border-radius: 6px;
  margin: 1rem 0;
}
.ce-file-tab {
  background: #111;
  border-bottom: 1px solid #1f1f1f;
  padding: 0.5rem 1rem;
  font-size: 0.72rem;
  color: #6b7280;
  font-family: "SF Mono", Consolas, "Courier New", monospace;
  border-radius: 6px 6px 0 0;
}
.ce-code {
  margin: 0;
  padding: 1rem 1.25rem;
  font-family: "SF Mono", Consolas, "Courier New", monospace;
  font-size: 0.78rem;
  line-height: 1.6;
  color: #d1d5db;
  overflow-x: auto;
}
.ce-code .hl-amber { color: #f59e0b; }
.ce-code .hl-blue  { color: #93c5fd; }
.ce-code .hl-green { color: #86efac; }
.ce-code .hl-gray  { color: #6b7280; }

/* ── Data flow diagram ── */
.ce-flow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 1rem 1.5rem;
  background: #090909;
  border: 1px solid #1f1f1f;
  border-radius: 6px;
  margin: 1rem 0;
  font-size: 0.78rem;
  font-family: "SF Mono", Consolas, monospace;
}
.ce-fn {
  background: #1a1a1a;
  color: #f59e0b;
  border: 1px solid #333;
  padding: 0.3em 0.7em;
  border-radius: 4px;
}
.ce-fn.blue  { color: #93c5fd; border-color: #1e3a5f; }
.ce-fn.green { color: #86efac; border-color: #14532d; }
.ce-fn.red   { color: #fca5a5; border-color: #7f1d1d; }
.ce-arrow-flow { color: #374151; }

/* ── Info cards ── */
.ce-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}
.ce-card {
  background: #111;
  border: 1px solid #1f1f1f;
  border-radius: 6px;
  padding: 0.85rem 1rem;
}
.ce-card h4 { margin: 0 0 0.3rem; font-size: 0.85rem; color: #f59e0b; }
.ce-card p  { margin: 0; font-size: 0.78rem; color: #6b7280; line-height: 1.5; }
.ce-card code { color: #fcd34d; background: #0a0a0a; padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.8em; }

/* ── Note box ── */
.ce-note {
  background: #1a1500;
  border-left: 3px solid #f59e0b;
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  margin: 1rem 0;
  font-size: 0.82rem;
  color: #fcd34d;
  line-height: 1.5;
}
.ce-note code { background: #2a2000; padding: 0.1em 0.3em; border-radius: 3px; }

/* ── Tag table ── */
.ce-tag-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  margin: 1rem 0;
}
.ce-tag-table th {
  background: #111;
  color: #6b7280;
  text-align: left;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #1f1f1f;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.ce-tag-table td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid #141414;
  color: #d1d5db;
  vertical-align: top;
}
.ce-tag-table tr:last-child td { border-bottom: none; }
.ce-tag-table code { color: #fcd34d; background: #111; padding: 0.1em 0.3em; border-radius: 3px; }

/* ── Navigation hints ── */
.ce-nav-hint {
  margin-top: 1.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #1a1a1a;
  font-size: 0.72rem;
  color: #374151;
  display: flex;
  justify-content: space-between;
}
.ce-depth-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1rem;
  font-size: 0.72rem;
  color: #374151;
}

/* ── Title slide special ── */
.ce-hero-slide {
  text-align: center;
  padding: 3rem 3rem;
}
.ce-hero-icon { font-size: 3rem; margin-bottom: 0.75rem; }
.ce-hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.ce-hero-subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.5;
}
.ce-hero-metrics {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.ce-hero-metric { text-align: center; }
.ce-hero-metric .val { font-size: 1.6rem; font-weight: 700; color: #f59e0b; }
.ce-hero-metric .lbl { font-size: 0.7rem; color: #6b7280; margin-top: 0.2rem; }
.ce-hero-pipeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  font-size: 0.72rem;
  font-family: "SF Mono", Consolas, monospace;
}
.ce-hero-pipeline .pn {
  background: #1a1a1a;
  color: #f59e0b;
  border: 1px solid #333;
  padding: 0.3em 0.65em;
  border-radius: 4px;
}
.ce-hero-pipeline .pa { color: #374151; }

/* ── Overview slide ── */
#overview-end .ce-step {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}

/* ── Tool category tags ── */
.tool-cat {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15em 0.4em;
  border-radius: 3px;
  margin-right: 0.2rem;
}
.tc-file   { background: #1e3a5f; color: #93c5fd; }
.tc-search { background: #14532d; color: #86efac; }
.tc-exec   { background: #422006; color: #fbbf24; }
.tc-agent  { background: #2e1065; color: #c4b5fd; }
.tc-mcp    { background: #4a044e; color: #f0abfc; }
.tc-meta   { background: #0c0a09; color: #a8a29e; border: 1px solid #292524; }
</style>


<!-- ==========================================
     SLIDE 0: TITLE
     Coordinates: (0, 0, 500)  scale=2
     ========================================== -->
<div id="title" class="step ce-step" 
     data-x="0" 
     data-y="0" 
     data-z="500"
     data-scale="1.8">
  <div class="ce-hero-slide">
    <div class="ce-hero-icon">⚡</div>
    <div class="ce-hero-title">ClaudeEngine Pipeline</div>
    <div class="ce-hero-subtitle">
      Arquitectura y flujo interno del motor Claude Code (Anthropic, 2026-03-31).<br>
      Referencia para desarrolladores del Scriptorium.
    </div>

    <div class="ce-hero-metrics">
      <div class="ce-hero-metric"><div class="val">~512K</div><div class="lbl">líneas de código</div></div>
      <div class="ce-hero-metric"><div class="val">~1.900</div><div class="lbl">ficheros TypeScript</div></div>
      <div class="ce-hero-metric"><div class="val">35+</div><div class="lbl">tools</div></div>
      <div class="ce-hero-metric"><div class="val">100+</div><div class="lbl">comandos slash</div></div>
      <div class="ce-hero-metric"><div class="val">Bun</div><div class="lbl">runtime</div></div>
    </div>

    <div class="ce-hero-pipeline">
      <span class="pn">main.tsx</span><span class="pa">→</span>
      <span class="pn">context()</span><span class="pa">→</span>
      <span class="pn">promptParts()</span><span class="pa">→</span>
      <span class="pn">SystemPromptBlocks</span><span class="pa">→</span>
      <span class="pn">QueryEngine</span><span class="pa">→</span>
      <span class="pn">query loop</span><span class="pa">→</span>
      <span class="pn">tool loop / stream</span>
    </div>

    <div class="ce-nav-hint" style="justify-content:center;margin-top:2rem">
      → Navegar con ← → · Detalle con ↓ · Vista global con O
    </div>
  </div>
</div>


<!-- ==========================================
     SLIDE 1: ENTRYPOINT — main.tsx
     Coordinates: (2000, 0, 0)
     ========================================== -->
<div id="entrypoint" class="step ce-step" 
     data-x="2000" 
     data-y="0" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 1</span>
    <span class="ce-title">Entrypoint — main.tsx</span>
  </div>

  <div class="ce-journey">
    <span class="ce-jnode current">main.tsx</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">context()</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">prompts</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">QueryEngine</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">query loop</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">tool loop</span>
  </div>

  <div class="ce-explanation">
    El CLI se parsea con <strong>Commander.js</strong>. Antes de que ningún módulo pesado se cargue, se disparan <strong>2 lecturas en paralelo</strong> (MDM settings + macOS Keychain) para reducir el tiempo de arranque ~65 ms.
  </div>

  <div class="ce-code-panel">
    <div class="ce-file-tab">📄 src/main.tsx</div>
    <pre class="ce-code"><code><span class="hl-gray">// Parallel prefetch — antes de cualquier import dinámico</span>
const [mdmSettings, keychainToken] = await <span class="hl-amber">Promise.all</span>([
  <span class="hl-blue">fetchMDMSettings</span>(),      <span class="hl-gray">// MDM (macOS MDM / remote policy)</span>
  <span class="hl-blue">readKeychain</span>(),           <span class="hl-gray">// Anthropic API Key en Keychain</span>
]);

<span class="hl-gray">// Heavy modules cargados bajo demanda (lazy)</span>
const { App } = await import('./components/App.js');

<span class="hl-amber">render</span>(&lt;<span class="hl-green">App</span>
  keychainToken={keychainToken}
  mdmSettings={mdmSettings}
/&gt;);</code></pre>
  </div>

  <div class="ce-cards">
    <div class="ce-card">
      <h4>⚡ Parallel Prefetch</h4>
      <p>MDM + Keychain en paralelo. El resto del stack espera solo al más lento, no a la suma de ambos.</p>
    </div>
    <div class="ce-card">
      <h4>💤 Lazy Loading</h4>
      <p>OpenTelemetry (~400 KB) y gRPC (~700 KB) solo se cargan si el usuario tiene telemetría activa.</p>
    </div>
    <div class="ce-card">
      <h4>🖥️ React + Ink</h4>
      <p><code>render()</code> de Ink monta el árbol React en el terminal. 140+ componentes Ink/React.</p>
    </div>
  </div>

  <div class="ce-depth-hint">↓ ver patrón de arranque en detalle</div>
  <div class="ce-nav-hint"><span>← Inicio</span><span>→ Fase 2: Context</span></div>
</div>


<!-- ==========================================
     SLIDE 1.1: ENTRYPOINT — detalle arranque (sub-slide)
     Coordinates: (2000, 800, 0)
     ========================================== -->
<div id="entrypoint-detail" class="step ce-step" 
     data-x="2000" 
     data-y="800" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 1 · Detalle</span>
    <span class="ce-title">Secuencia de arranque</span>
  </div>

  <div class="ce-explanation">
    El hook <strong>useIDEIntegration</strong> activa el bridge con VS Code o JetBrains justo después del mount de React. El bridge se autentica con <strong>JWT</strong>.
  </div>

  <div class="ce-flow">
    <span class="ce-fn">Commander.js parse</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">Promise.all([MDM, Keychain])</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">import('App.js')</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn blue">Ink render()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn green">useIDEIntegration</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">bridge/bridgeMain.ts</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">JWT auth</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn green">REPL ready</span>
  </div>

  <table class="ce-tag-table">
    <thead><tr><th>Módulo</th><th>Rol en arranque</th></tr></thead>
    <tbody>
      <tr><td><code>bridge/bridgeMain.ts</code></td><td>Loop de mensajes IDE ↔ CLI (VS Code, JetBrains)</td></tr>
      <tr><td><code>bridge/jwtUtils.ts</code></td><td>Genera / verifica JWT para sesiones de IDE</td></tr>
      <tr><td><code>hooks/useIDEIntegration.tsx</code></td><td>Hook React que activa el bridge en mount</td></tr>
      <tr><td><code>setup.ts</code></td><td>Inicialización de estado persistente (config, migrations)</td></tr>
      <tr><td><code>screens/Doctor.tsx</code></td><td>Diagnóstico de dependencias (<code>/doctor</code>)</td></tr>
    </tbody>
  </table>

  <div class="ce-nav-hint"><span>↑ volver a Fase 1</span><span></span></div>
</div>


<!-- ==========================================
     SLIDE 2: CONTEXT ASSEMBLY
     Coordinates: (4000, 0, 0)
     ========================================== -->
<div id="context" class="step ce-step" 
     data-x="4000" 
     data-y="0" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 2</span>
    <span class="ce-title">Context Assembly</span>
  </div>

  <div class="ce-journey">
    <span class="ce-jnode done">main.tsx</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode current">context()</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">prompts</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">QueryEngine</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">query loop</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">tool loop</span>
  </div>

  <div class="ce-explanation">
    Antes de cada llamada a la API se construyen <strong>2 fuentes de contexto</strong> desde <code>context.ts</code>. El usuario aporta memoria y fecha; el sistema aporta estado del repositorio git.
  </div>

  <div class="ce-cards">
    <div class="ce-card">
      <h4>👤 getUserContext()</h4>
      <p>Retorna: <code>claudeMd</code> (contenido CLAUDE.md + memdir) + <code>currentDate</code>. Se inyecta como <em>recordatorio</em> en el primer mensaje de usuario vía <code>prependUserContext()</code>.</p>
    </div>
    <div class="ce-card">
      <h4>⚙️ getSystemContext()</h4>
      <p>Retorna: <code>gitStatus</code> (branch, staged, unstaged) + <code>cacheBreaker</code> (timestamp para invalidar cache). Se añade al final del system prompt vía <code>appendSystemContext()</code>.</p>
    </div>
    <div class="ce-card">
      <h4>📅 currentDate</h4>
      <p>Fecha actual en ISO. Impide que el modelo asuma de forma errónea en qué momento se está ejecutando.</p>
    </div>
  </div>

  <div class="ce-note">
    Ambas funciones están memoizadas por sesión. El contexto se recalcula solo si el estado git cambia o si el usuario escribe un nuevo mensaje.
  </div>

  <div class="ce-depth-hint">↓ detalle del sistema de memoria</div>
  <div class="ce-nav-hint"><span>← Fase 1: Entrypoint</span><span>→ Fase 3: System Prompt</span></div>
</div>


<!-- ==========================================
     SLIDE 2.1: CONTEXT — memory system (sub-slide)
     Coordinates: (4000, 800, 0)
     ========================================== -->
<div id="context-memory" class="step ce-step" 
     data-x="4000" 
     data-y="800" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 2 · Detalle</span>
    <span class="ce-title">Sistema de Memoria Persistente</span>
  </div>

  <div class="ce-explanation">
    <code>memdir/</code> es el directorio de memoria jerárquica. <code>services/extractMemories/</code> extrae hechos automáticamente de la conversación y los persiste.
  </div>

  <div class="ce-flow">
    <span class="ce-fn">conversación</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">extractMemories()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">memdir/CLAUDE.md</span>
    <span class="ce-arrow-flow">↑</span>
    <span class="ce-fn blue">getMemoryFiles()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn blue">filterInjectedMemoryFiles()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn green">getUserContext()</span>
  </div>

  <table class="ce-tag-table">
    <thead><tr><th>Nivel</th><th>Fichero</th><th>Scope</th></tr></thead>
    <tbody>
      <tr><td>Global</td><td><code>~/.claude/CLAUDE.md</code></td><td>Todas las sesiones del usuario</td></tr>
      <tr><td>Proyecto</td><td><code>./CLAUDE.md</code></td><td>Directorio de trabajo actual</td></tr>
      <tr><td>Team</td><td><code>services/teamMemorySync/</code></td><td>Compartida entre miembros del equipo</td></tr>
    </tbody>
  </table>

  <div class="ce-note">
    El comando <code>/memory</code> y el comando <code>/compact</code> interactúan directamente con este sistema. <code>/compact</code> genera un resumen de la sesión y lo escribe en memdir.
  </div>

  <div class="ce-nav-hint"><span>↑ volver a Fase 2</span><span></span></div>
</div>


<!-- ==========================================
     SLIDE 3: SYSTEM PROMPT CONSTRUCTION
     Coordinates: (6000, 0, 0)
     ========================================== -->
<div id="system-prompt" class="step ce-step" 
     data-x="6000" 
     data-y="0" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 3</span>
    <span class="ce-title">System Prompt Construction</span>
  </div>

  <div class="ce-journey">
    <span class="ce-jnode done">main.tsx</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">context()</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode current">prompts</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">QueryEngine</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">query loop</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">tool loop</span>
  </div>

  <div class="ce-explanation">
    <code>fetchSystemPromptParts()</code> en <code>utils/queryContext.ts</code> ensambla el system prompt desde 5 secciones. El orden y la frontera estática/dinámica son críticos para la estrategia de <strong>cache de prompt</strong>.
  </div>

  <table class="ce-tag-table">
    <thead><tr><th>#</th><th>Sección</th><th>Contenido</th><th>Cache</th></tr></thead>
    <tbody>
      <tr><td>1</td><td><code>getSimpleIntroSection()</code></td><td>Identidad del agente, reglas base</td><td>global</td></tr>
      <tr><td>2</td><td><code>getSimpleSystemSection()</code></td><td>Capacidades, entorno de ejecución</td><td>global</td></tr>
      <tr><td>3</td><td><code>getSimpleDoingTasksSection()</code></td><td>Directivas de comportamiento en tareas</td><td>global</td></tr>
      <tr><td>4</td><td><code>getActionsSection()</code></td><td>Reglas para uso de acciones/tools</td><td>global</td></tr>
      <tr><td>5</td><td><code>getUsingYourToolsSection()</code></td><td>Instrucciones por tool específico</td><td>global</td></tr>
      <tr><td>—</td><td><code>SYSTEM_PROMPT_DYNAMIC_BOUNDARY</code></td><td>⚡ Frontera estático / dinámico</td><td>—</td></tr>
      <tr><td>6</td><td>Context dinámico (<code>appendSystemContext</code>)</td><td>gitStatus, cacheBreaker, date</td><td>org</td></tr>
    </tbody>
  </table>

  <div class="ce-depth-hint">↓ detalle de la estrategia de cache en 2 niveles</div>
  <div class="ce-nav-hint"><span>← Fase 2: Context</span><span>→ Fase 4: QueryEngine</span></div>
</div>


<!-- ==========================================
     SLIDE 3.1: SYSTEM PROMPT — cache boundary (sub-slide)
     Coordinates: (6000, 800, 0)
     ========================================== -->
<div id="system-prompt-cache" class="step ce-step" 
     data-x="6000" 
     data-y="800" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 3 · Detalle</span>
    <span class="ce-title">Cache de Prompt en 2 Niveles</span>
  </div>

  <div class="ce-explanation">
    <code>buildSystemPromptBlocks()</code> en <code>utils/api.ts</code> divide el system prompt en dos bloques según <code>SYSTEM_PROMPT_DYNAMIC_BOUNDARY</code>. Cada bloque recibe un scope de cache diferente, optimizando el coste de tokenización.
  </div>

  <div class="ce-code-panel">
    <div class="ce-file-tab">📄 src/utils/api.ts — buildSystemPromptBlocks()</div>
    <pre class="ce-code"><code>type SystemPromptBlock = {
  text: string;
  cacheScope: <span class="hl-amber">CacheScope</span> | null;
};
<span class="hl-gray">// CacheScope = 'global' | 'org'</span>

function buildSystemPromptBlocks(content: string): SystemPromptBlock[] {
  const boundary = <span class="hl-blue">SYSTEM_PROMPT_DYNAMIC_BOUNDARY</span>;
  const [staticPart, dynamicPart] = content.split(boundary);

  return [
    { text: staticPart,  cacheScope: <span class="hl-green">'global'</span> },  <span class="hl-gray">// cache perpetua</span>
    { text: dynamicPart, cacheScope: <span class="hl-amber">'org'</span>    },  <span class="hl-gray">// cache por sesión/org</span>
  ];
}</code></pre>
  </div>

  <div class="ce-cards">
    <div class="ce-card">
      <h4>🌍 global cache</h4>
      <p>Secciones estáticas (intro, system, tasks, actions, tools). No cambian entre sesiones ni usuarios. Cacheadas indefinidamente.</p>
    </div>
    <div class="ce-card">
      <h4>🏢 org cache</h4>
      <p>Contexto dinámico (git, fecha, usuario). Varía por sesión. Cacheada a nivel de organización/sesión.</p>
    </div>
  </div>

  <div class="ce-nav-hint"><span>↑ volver a Fase 3</span><span></span></div>
</div>


<!-- ==========================================
     SLIDE 4: QUERY ENGINE
     Coordinates: (8000, 0, 0)
     ========================================== -->
<div id="query-engine" class="step ce-step" 
     data-x="8000" 
     data-y="0" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 4</span>
    <span class="ce-title">QueryEngine — Motor Central</span>
  </div>

  <div class="ce-journey">
    <span class="ce-jnode done">main.tsx</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">context()</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">prompts</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode current">QueryEngine</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">query loop</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">tool loop</span>
  </div>

  <div class="ce-explanation">
    <code>QueryEngine.ts</code> (~46K LOC) es el corazón del motor. <code>submitMessage()</code> es un generador asíncrono que maneja el ciclo completo: construcción de mensajes, streaming, reintentos y conteo de tokens.
  </div>

  <div class="ce-code-panel">
    <div class="ce-file-tab">📄 src/QueryEngine.ts — submitMessage() (simplificado)</div>
    <pre class="ce-code"><code>async *submitMessage(userMessage: string): AsyncGenerator&lt;Message&gt; {
  <span class="hl-gray">// 1. Construir bloques de system prompt</span>
  const systemBlocks = await <span class="hl-blue">fetchSystemPromptParts</span>(this.config);
  const systemPrompt = <span class="hl-amber">buildSystemPromptBlocks</span>(systemBlocks);

  <span class="hl-gray">// 2. Inyectar contexto de usuario/sistema</span>
  const messages = [
    ...<span class="hl-blue">prependUserContext</span>(this.userContext),  <span class="hl-gray">// &lt;system-reminder&gt;</span>
    { role: 'user', content: userMessage }
  ];

  <span class="hl-gray">// 3. Entrar en el loop de query → herramientas → stream</span>
  yield* <span class="hl-green">queryLoop</span>({
    messages, systemPrompt,
    userContext: this.userContext,
    systemContext: this.systemContext,
    canUseTool: this.canUseTool,
    toolUseContext: this.toolUseContext,
  });
}</code></pre>
  </div>

  <div class="ce-depth-hint">↓ detalle de estimación de tokens y cost tracking</div>
  <div class="ce-nav-hint"><span>← Fase 3: System Prompt</span><span>→ Fase 5: Tool Loop</span></div>
</div>


<!-- ==========================================
     SLIDE 4.1: QUERY ENGINE — tokens & cost (sub-slide)
     Coordinates: (8000, 800, 0)
     ========================================== -->
<div id="query-engine-tokens" class="step ce-step" 
     data-x="8000" 
     data-y="800" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 4 · Detalle</span>
    <span class="ce-title">Token Estimation + Cost Tracking</span>
  </div>

  <div class="ce-explanation">
    Antes de enviar a la API, <code>services/tokenEstimation.ts</code> estima el tamaño del prompt. <code>cost-tracker.ts</code> acumula el gasto por sesión y lo muestra en la barra de estado.
  </div>

  <div class="ce-flow">
    <span class="ce-fn">messages + systemBlocks</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">estimateTokens()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn red">context_limit check</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">API call</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn blue">usage.input_tokens</span>
    <span class="ce-arrow-flow">+</span>
    <span class="ce-fn blue">usage.output_tokens</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn green">CostTracker.add()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn green">StatusLine UI</span>
  </div>

  <div class="ce-note">
    Si la estimación supera el umbral de compresión configurado, <code>services/compact/</code> activa automáticamente la compactación antes de llamar a la API, resumiendo mensajes antiguos y preservando el contexto semántico.
  </div>

  <table class="ce-tag-table">
    <thead><tr><th>Módulo</th><th>Función</th></tr></thead>
    <tbody>
      <tr><td><code>services/tokenEstimation.ts</code></td><td>Estimación pre-envío con tiktoken o cl100k</td></tr>
      <tr><td><code>cost-tracker.ts</code></td><td>Acumulador de coste USD por sesión</td></tr>
      <tr><td><code>services/compact/</code></td><td>Compresión automática cuando context &gt; threshold</td></tr>
      <tr><td><code>components/StatusLine.tsx</code></td><td>Muestra tokens y coste acumulado en la barra inferior</td></tr>
    </tbody>
  </table>

  <div class="ce-nav-hint"><span>↑ volver a Fase 4</span><span></span></div>
</div>


<!-- ==========================================
     SLIDE 5: TOOL LOOP
     Coordinates: (10000, 0, 0)
     ========================================== -->
<div id="tool-loop" class="step ce-step" 
     data-x="10000" 
     data-y="0" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 5</span>
    <span class="ce-title">Tool Loop — Ciclo Agéntico</span>
  </div>

  <div class="ce-journey">
    <span class="ce-jnode done">main.tsx</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">context()</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">prompts</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">QueryEngine</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode current">query loop</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode">tool loop</span>
  </div>

  <div class="ce-explanation">
    <code>queryLoop()</code> en <code>query.ts</code> es un bucle <code>while(true)</code> que llama a la API, detecta bloques <code>tool_use</code> en la respuesta, ejecuta las herramientas y re-inyecta los resultados. Termina cuando el modelo emite <code>stop_reason: "end_turn"</code>.
  </div>

  <div class="ce-flow">
    <span class="ce-fn">queryLoop</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">API stream</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn red">tool_use block?</span>
    <span class="ce-arrow-flow">→ sí</span>
    <span class="ce-fn">useCanUseTool</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn green">executeTool()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">tool_result</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">messages.push</span>
    <span class="ce-arrow-flow">→ loop</span>
  </div>

  <div class="ce-cards">
    <div class="ce-card">
      <h4><span class="tool-cat tc-exec">exec</span> BashTool</h4>
      <p>Comando shell con timeout. Captura stdout y stderr.</p>
    </div>
    <div class="ce-card">
      <h4><span class="tool-cat tc-file">file</span> FileEditTool</h4>
      <p>Reemplazo de cadena exacta. Si hay múltiples matches, falla y pide más contexto.</p>
    </div>
    <div class="ce-card">
      <h4><span class="tool-cat tc-agent">agent</span> AgentTool</h4>
      <p>Lanza sub-agente con contexto aislado para trabajo paralelo.</p>
    </div>
    <div class="ce-card">
      <h4><span class="tool-cat tc-mcp">mcp</span> MCPTool</h4>
      <p>Invoca cualquier tool de un servidor MCP conectado. Schema dinámico.</p>
    </div>
  </div>

  <div class="ce-depth-hint">↓ detalle del modelo de permisos</div>
  <div class="ce-nav-hint"><span>← Fase 4: QueryEngine</span><span>→ Fase 6: Orquestación</span></div>
</div>


<!-- ==========================================
     SLIDE 5.1: TOOL LOOP — permissions (sub-slide)
     Coordinates: (10000, 800, 0)
     ========================================== -->
<div id="tool-loop-permissions" class="step ce-step" 
     data-x="10000" 
     data-y="800" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 5 · Detalle</span>
    <span class="ce-title">Modelo de Permisos por Herramienta</span>
  </div>

  <div class="ce-explanation">
    Cada invocación de tool pasa por <code>hooks/useCanUseTool.tsx</code>. El hook evalúa la política de la sesión <em>antes</em> de ejecutar. Si se deniega, el agente recibe un error descriptivo y puede escalar al usuario.
  </div>

  <div class="ce-code-panel">
    <div class="ce-file-tab">📄 src/hooks/useCanUseTool.tsx</div>
    <pre class="ce-code"><code>function useCanUseTool(toolName: string, input: unknown): PermissionResult {
  <span class="hl-gray">// 1. Comprobar allowList y denyList de la sesión</span>
  if (session.denyList.includes(toolName)) {
    return { allowed: <span class="hl-amber">false</span>, reason: 'tool-denied' };
  }

  <span class="hl-gray">// 2. Modo sandbox — solo file reads y búsquedas</span>
  if (session.sandboxMode && isDestructiveTool(toolName)) {
    return { allowed: <span class="hl-amber">false</span>, reason: 'sandbox' };
  }

  <span class="hl-gray">// 3. Permiso interactivo — pregunta al usuario</span>
  if (needsUserApproval(toolName, input)) {
    return <span class="hl-green">askUserPermission</span>(toolName, input);
  }

  return { allowed: <span class="hl-green">true</span> };
}</code></pre>
  </div>

  <table class="ce-tag-table">
    <thead><tr><th>Modo</th><th>Comportamiento</th></tr></thead>
    <tbody>
      <tr><td>Normal</td><td>Aprobación explícita para tools destructivas (write, bash, delete)</td></tr>
      <tr><td>Sandbox</td><td>Solo file reads + búsquedas. Sin ejecución ni escritura.</td></tr>
      <tr><td>Allow-all</td><td><code>--dangerously-skip-permissions</code> — todas las tools sin preguntar</td></tr>
    </tbody>
  </table>

  <div class="ce-nav-hint"><span>↑ volver a Fase 5</span><span></span></div>
</div>


<!-- ==========================================
     SLIDE 6: AGENT ORCHESTRATION
     Coordinates: (12000, 0, 0)
     ========================================== -->
<div id="orchestration" class="step ce-step" 
     data-x="12000" 
     data-y="0" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 6</span>
    <span class="ce-title">Agent Orchestration — Swarms</span>
  </div>

  <div class="ce-journey">
    <span class="ce-jnode done">main.tsx</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">context()</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">prompts</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">QueryEngine</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode done">query loop</span><span class="ce-jarrow">→</span>
    <span class="ce-jnode current">tool loop</span>
  </div>

  <div class="ce-explanation">
    <code>AgentTool</code> lanza sub-agentes con contexto aislado. <code>coordinator/</code> orquesta equipos de agentes. <code>SendMessageTool</code> permite mensajería asíncrona entre agentes del mismo swarm.
  </div>

  <div class="ce-flow">
    <span class="ce-fn">AgentTool.execute()</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn">new QueryEngine({<br>context: isolated})</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn blue">sub-agent loop</span>
    <span class="ce-arrow-flow">→</span>
    <span class="ce-fn green">tool_result (parent)</span>
  </div>

  <div class="ce-cards">
    <div class="ce-card">
      <h4>🐝 AgentTool</h4>
      <p>Lanza sub-agentes en paralelo. Cada uno tiene su propio contexto de mensajes y puede usar un subconjunto de tools.</p>
    </div>
    <div class="ce-card">
      <h4>📋 coordinator/</h4>
      <p>Orquestación de equipos — workflows multi-paso donde un agente orquestador delega en agentes especializados.</p>
    </div>
    <div class="ce-card">
      <h4>📨 SendMessageTool</h4>
      <p>Mensajería asíncrona inter-agente dentro del mismo swarm.</p>
    </div>
    <div class="ce-card">
      <h4>🏢 TeamCreateTool</h4>
      <p>Crea equipos persistentes de agentes con roles asignados. Persiste entre sesiones.</p>
    </div>
  </div>

  <div class="ce-nav-hint"><span>← Fase 5: Tool Loop</span><span>→ Fase 7: Bridge & Remote</span></div>
</div>


<!-- ==========================================
     SLIDE 7: BRIDGE & REMOTE
     Coordinates: (14000, 0, 0)
     ========================================== -->
<div id="bridge" class="step ce-step" 
     data-x="14000" 
     data-y="0" 
     data-z="0">
  <div class="ce-header">
    <span class="ce-phase">Fase 7</span>
    <span class="ce-title">Bridge & Remote — Integración IDE</span>
  </div>

  <div class="ce-explanation">
    El <strong>bridge</strong> permite que VS Code y JetBrains controlen el motor desde el IDE. El modo <strong>remote</strong> permite sesiones headless sobre WebSocket. Ambos usan <strong>JWT</strong> para autenticación.
  </div>

  <div class="ce-cards">
    <div class="ce-card">
      <h4>🔗 bridge/bridgeMain.ts</h4>
      <p>Loop de mensajes bidireccional. El IDE puede enviar inputs, el CLI devuelve outputs y eventos de herramientas en tiempo real.</p>
    </div>
    <div class="ce-card">
      <h4>🔑 bridge/jwtUtils.ts</h4>
      <p>Genera JWTs firmados para autenticar sesiones de IDE. Verifica en cada mensaje entrante.</p>
    </div>
    <div class="ce-card">
      <h4>🔄 remote/sdkMessageAdapter.ts</h4>
      <p>Convierte mensajes del SDK de Anthropic al formato REPL interno. Soporta tipos: <code>assistant</code>, <code>user</code>, <code>stream_event</code>, <code>result</code>, <code>system</code>, <code>tool_progress</code>.</p>
    </div>
    <div class="ce-card">
      <h4>🖥️ server/</h4>
      <p>Modo headless — el motor escucha en un puerto local. Permite integración con herramientas externas sin terminal interactiva.</p>
    </div>
  </div>

  <div class="ce-note">
    El Scriptorium usa el bridge vía <strong>CopilotEngine</strong> (submódulo #16) que actúa como capa de adaptación entre VS Code Copilot Chat y el protocolo de bridge de ClaudeEngine.
  </div>

  <div class="ce-nav-hint"><span>← Fase 6: Orquestación</span><span>→ Vista global</span></div>
</div>


<!-- ==========================================
     SLIDE 8: OVERVIEW — zoom-out final
     Coordinates: (7000, -500, 0)  scale=4
     ========================================== -->
<div id="overview-end" class="step" 
     data-x="7000" 
     data-y="-600" 
     data-z="0"
     data-scale="4.5">
  <div style="text-align:center; color:#f59e0b; font-family: 'SF Mono', Consolas, monospace; font-size:0.55rem; opacity:0.7">
    ⚡ ClaudeEngine Pipeline — Vista Global
  </div>
</div>
