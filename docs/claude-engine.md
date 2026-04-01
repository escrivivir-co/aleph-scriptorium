---
layout: default
title: ClaudeEngine — Arquitectura
description: Referencia técnica del motor Claude Code para desarrolladores del Scriptorium
permalink: /claude-engine/
---

<style>
/* ── ClaudeEngine Hub Page ─────────────────────────────────────────────── */
.ce-page { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }

.ce-hero {
  border-left: 4px solid #f59e0b;
  background: #fafaf5;
  padding: 1.5rem 2rem;
  margin-bottom: 2.5rem;
  border-radius: 0 6px 6px 0;
}
.ce-hero h1 { margin: 0 0 0.5rem; font-size: 1.8rem; }
.ce-hero .ce-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem; }
.ce-badge {
  font-size: 0.75rem; font-weight: 600; padding: 0.2em 0.6em;
  border-radius: 3px; background: #1a1a1a; color: #fff; letter-spacing: 0.03em;
}
.ce-badge.amber { background: #f59e0b; color: #000; }
.ce-badge.blue  { background: #3b82f6; }
.ce-badge.green { background: #22c55e; color: #000; }
.ce-badge.muted { background: #6b7280; }

.ce-section { margin: 2.5rem 0; }
.ce-section h2 {
  font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.08em;
  color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.25rem;
}

/* ── Tables ─── */
.ce-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.ce-table th { background: #f3f4f6; text-align: left; padding: 0.6rem 0.8rem; font-weight: 600; color: #374151; }
.ce-table td { padding: 0.55rem 0.8rem; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
.ce-table tr:last-child td { border-bottom: none; }
.ce-table code { background: #f3f4f6; padding: 0.1em 0.35em; border-radius: 3px; font-size: 0.85em; }
.ce-table .tag-cat {
  display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.15em 0.45em;
  border-radius: 3px; margin-right: 0.25rem;
}
.cat-file   { background: #dbeafe; color: #1d4ed8; }
.cat-search { background: #dcfce7; color: #166534; }
.cat-exec   { background: #fef3c7; color: #92400e; }
.cat-agent  { background: #ede9fe; color: #5b21b6; }
.cat-mcp    { background: #fce7f3; color: #be185d; }
.cat-task   { background: #f1f5f9; color: #475569; }
.cat-meta   { background: #fff7ed; color: #c2410c; }

/* ── Module Map ─── */
.ce-module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin: 1.25rem 0;
}
.ce-module-card {
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem 1.25rem;
  background: #fff;
}
.ce-module-card h4 { margin: 0 0 0.4rem; font-size: 0.95rem; color: #111827; }
.ce-module-card .ce-count { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem; }
.ce-module-card ul { margin: 0; padding-left: 1rem; font-size: 0.82rem; color: #4b5563; }
.ce-module-card ul li { margin-bottom: 0.15rem; }
.ce-module-card.core-card { border-color: #f59e0b; }
.ce-module-card.tools-card { border-color: #22c55e; }
.ce-module-card.services-card { border-color: #3b82f6; }
.ce-module-card.ui-card { border-color: #8b5cf6; }
.ce-module-card.integration-card { border-color: #ef4444; }
.ce-module-card.data-card { border-color: #6b7280; }

/* ── Patterns ─── */
.ce-patterns { display: flex; flex-direction: column; gap: 0.9rem; }
.ce-pattern {
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 0.85rem 1.1rem;
  display: flex; gap: 1rem; align-items: flex-start;
}
.ce-pattern .pat-icon { font-size: 1.4rem; flex-shrink: 0; }
.ce-pattern h4 { margin: 0 0 0.2rem; font-size: 0.95rem; }
.ce-pattern p  { margin: 0; font-size: 0.85rem; color: #4b5563; }
.ce-pattern code { background: #f3f4f6; padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.82em; }

/* ── Benchmark ─── */
.ce-benchmark-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem;
}
.ce-metric {
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem 1.25rem; background: #fff;
  text-align: center;
}
.ce-metric .metric-value { font-size: 1.6rem; font-weight: 700; color: #111827; }
.ce-metric .metric-label { font-size: 0.8rem; color: #6b7280; margin-top: 0.25rem; }

/* ── Navigation cards ─── */
.ce-nav-grid { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem; }
.ce-nav-card {
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem 1.5rem;
  text-decoration: none; color: #111827; background: #fff;
  flex: 1; min-width: 220px; transition: border-color 0.2s, transform 0.15s;
}
.ce-nav-card:hover { border-color: #f59e0b; transform: translateY(-2px); }
.ce-nav-card h4 { margin: 0 0 0.35rem; font-size: 0.95rem; }
.ce-nav-card p  { margin: 0; font-size: 0.82rem; color: #6b7280; }

/* ── Pipeline mini-flow ─── */
.pipeline-flow {
  display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem;
  background: #0a0a0a; padding: 1rem 1.5rem; border-radius: 6px;
  margin: 1.25rem 0; font-family: "SF Mono", Consolas, monospace; font-size: 0.82rem;
}
.pipeline-flow .pf-node {
  background: #1a1a1a; color: #f59e0b; border: 1px solid #333;
  padding: 0.3em 0.7em; border-radius: 4px;
}
.pipeline-flow .pf-arrow { color: #6b7280; }

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .ce-hero { background: #1a1a0f; }
  .ce-module-card, .ce-metric, .ce-nav-card { background: #1a1a1a; border-color: #333; }
  .ce-module-card h4, .ce-metric .metric-value { color: #f9fafb; }
  .ce-table th { background: #1f2937; color: #d1d5db; }
  .ce-table td { border-color: #374151; }
  .ce-pattern { border-color: #374151; }
  .ce-pattern p, .ce-module-card ul { color: #9ca3af; }
}
</style>

<div class="ce-page">

<!-- ── HERO ──────────────────────────────────────────────────────────────── -->
<div class="ce-hero">
  <h1>⚡ ClaudeEngine</h1>
  <p>Motor de agencia autónoma de Anthropic — <em>Claude Code CLI, fuente filtrada 2026-03-31</em>. Referencia técnica para desarrolladores del Scriptorium que trabajen con, sobre o junto a este motor.</p>
  <div class="ce-badges">
    <span class="ce-badge amber">Bun Runtime</span>
    <span class="ce-badge blue">TypeScript Strict</span>
    <span class="ce-badge green">React + Ink</span>
    <span class="ce-badge muted">~512K LOC</span>
    <span class="ce-badge muted">~1.900 ficheros</span>
    <span class="ce-badge muted">35+ tools · 100+ comandos</span>
  </div>
</div>

<!-- ── PIPELINE OVERVIEW ──────────────────────────────────────────────────── -->
<div class="ce-section">
  <h2>// Pipeline en 7 fases</h2>
  <div class="pipeline-flow">
    <span class="pf-node">main.tsx</span>
    <span class="pf-arrow">→</span>
    <span class="pf-node">context()</span>
    <span class="pf-arrow">→</span>
    <span class="pf-node">fetchSystemPromptParts()</span>
    <span class="pf-arrow">→</span>
    <span class="pf-node">buildSystemPromptBlocks()</span>
    <span class="pf-arrow">→</span>
    <span class="pf-node">QueryEngine.submitMessage()</span>
    <span class="pf-arrow">→</span>
    <span class="pf-node">query() loop</span>
    <span class="pf-arrow">→</span>
    <span class="pf-node">tool loop / stream</span>
  </div>
  <p style="font-size:0.85rem;color:#6b7280;margin:0">
    → Recorrido interactivo completo en la <a href="{{ site.baseurl }}/blueprint-claude-engine/">presentación Blueprint</a>
  </p>
</div>

<!-- ── TECH STACK ──────────────────────────────────────────────────────────── -->
<div class="ce-section">
  <h2>// Ficha técnica</h2>
  <table class="ce-table">
    <thead>
      <tr><th>Categoría</th><th>Tecnología</th><th>Rol</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Runtime</strong></td><td><code>Bun</code></td><td>Ejecución ultrarrápida + bundle de un solo ejecutable</td></tr>
      <tr><td><strong>Lenguaje</strong></td><td><code>TypeScript</code> (strict)</td><td>Tipado compila-tiempo + Zod v4 para tipado en runtime</td></tr>
      <tr><td><strong>Terminal UI</strong></td><td><code>React + Ink</code></td><td>React renderer para CLI — 140+ componentes</td></tr>
      <tr><td><strong>CLI Parsing</strong></td><td><code>Commander.js</code></td><td>Registro y parsing de subcomandos (<code>main.tsx</code>)</td></tr>
      <tr><td><strong>API Client</strong></td><td><code>@anthropic-ai/sdk</code></td><td>Llamadas a la API de Claude, streaming</td></tr>
      <tr><td><strong>Protocolos</strong></td><td><code>MCP SDK</code> + <code>LSP</code></td><td>Model Context Protocol + Language Server Protocol</td></tr>
      <tr><td><strong>Validación</strong></td><td><code>Zod v4</code></td><td>Schemas de config, schemas de tools</td></tr>
      <tr><td><strong>Búsqueda</strong></td><td><code>ripgrep</code></td><td>GrepTool — búsqueda rápida en codebase</td></tr>
      <tr><td><strong>Autenticación</strong></td><td>OAuth 2.0 + JWT + Keychain</td><td>Auth de usuario, IDE bridge, sesiones remotas</td></tr>
      <tr><td><strong>Telemetría</strong></td><td>OpenTelemetry + gRPC</td><td>Cargado lazy (~1.1 MB total) vía <code>import()</code></td></tr>
      <tr><td><strong>Feature flags</strong></td><td>GrowthBook + <code>bun:bundle</code></td><td>Dead-code elimination en build</td></tr>
      <tr><td><strong>Build</strong></td><td>Bun bundler</td><td>Genera ejecutable único <code>claude</code></td></tr>
    </tbody>
  </table>
</div>

<!-- ── MODULE MAP ──────────────────────────────────────────────────────────── -->
<div class="ce-section">
  <h2>// Mapa de módulos</h2>
  <div class="ce-module-grid">

    <div class="ce-module-card core-card">
      <h4>⚡ Core</h4>
      <div class="ce-count">5 ficheros principales</div>
      <ul>
        <li><code>QueryEngine.ts</code> — motor LLM (~46K)</li>
        <li><code>query.ts</code> — loop de consulta + streaming</li>
        <li><code>context.ts</code> — contexto de sistema y usuario</li>
        <li><code>Tool.ts</code> — tipos base de herramientas (~29K)</li>
        <li><code>commands.ts</code> — registro de comandos (~25K)</li>
      </ul>
    </div>

    <div class="ce-module-card tools-card">
      <h4>🔧 Tools</h4>
      <div class="ce-count">35+ herramientas</div>
      <ul>
        <li><code>BashTool</code> · <code>FileReadTool</code> · <code>FileWriteTool</code></li>
        <li><code>FileEditTool</code> · <code>GlobTool</code> · <code>GrepTool</code></li>
        <li><code>AgentTool</code> · <code>MCPTool</code> · <code>LSPTool</code></li>
        <li><code>WebFetchTool</code> · <code>WebSearchTool</code></li>
        <li><code>TaskCreateTool</code> · <code>SendMessageTool</code></li>
        <li><code>SkillTool</code> · <code>NotebookEditTool</code> · <code>SleepTool</code></li>
      </ul>
    </div>

    <div class="ce-module-card services-card">
      <h4>⚙️ Services</h4>
      <div class="ce-count">10+ integraciones</div>
      <ul>
        <li><code>services/api/claude.ts</code> — API wrapper</li>
        <li><code>services/mcp/</code> — servidores MCP</li>
        <li><code>services/lsp/</code> — Language Server</li>
        <li><code>services/compact/</code> — compresión de contexto</li>
        <li><code>services/oauth/</code> — flujos OAuth 2.0</li>
        <li><code>services/extractMemories/</code> — auto-memoria</li>
        <li><code>services/analytics/</code> — telemetría</li>
      </ul>
    </div>

    <div class="ce-module-card ui-card">
      <h4>🖥️ UI</h4>
      <div class="ce-count">140+ componentes · 40+ hooks</div>
      <ul>
        <li><code>components/App.tsx</code> — raíz React/Ink</li>
        <li><code>components/Messages.tsx</code> — renderizado de mensajes</li>
        <li><code>components/StructuredDiff/</code> — diffs visuales</li>
        <li><code>components/MCP/</code> — interfaz MCP</li>
        <li><code>screens/</code> — Doctor, REPL, ResumeConversation</li>
        <li><code>hooks/useCanUseTool.tsx</code> — permisos por tool</li>
      </ul>
    </div>

    <div class="ce-module-card integration-card">
      <h4>🔗 Integration</h4>
      <div class="ce-count">Bridge + Remote + Server</div>
      <ul>
        <li><code>bridge/bridgeMain.ts</code> — protocolo IDE bidireccional</li>
        <li><code>bridge/jwtUtils.ts</code> — sesiones JWT</li>
        <li><code>remote/sdkMessageAdapter.ts</code> — conversión SDK</li>
        <li><code>coordinator/</code> — orquestación multi-agente</li>
        <li><code>server/</code> — modo headless</li>
      </ul>
    </div>

    <div class="ce-module-card data-card">
      <h4>💾 Data</h4>
      <div class="ce-count">Memoria · Estado · Tareas</div>
      <ul>
        <li><code>memdir/</code> — memoria persistente (CLAUDE.md)</li>
        <li><code>state/</code> — máquina de estado (AppState)</li>
        <li><code>tasks/</code> — gestión de tareas</li>
        <li><code>skills/</code> — workflows reutilizables</li>
        <li><code>plugins/</code> — sistema de plugins</li>
        <li><code>migrations/</code> — migraciones de config</li>
      </ul>
    </div>

  </div>

  {% include mermaid.html %}

```mermaid
graph TD
    A[main.tsx<br/>Commander.js CLI] --> B[context.ts<br/>getUserContext / getSystemContext]
    A --> C[constants/prompts.ts<br/>fetchSystemPromptParts]
    B --> D[utils/api.ts<br/>buildSystemPromptBlocks]
    C --> D
    D --> E[QueryEngine.ts<br/>submitMessage]
    E --> F[query.ts<br/>queryLoop]
    F --> G{tool_use?}
    G -- sí --> H[tools/<br/>35+ herramientas]
    H --> F
    G -- no --> I[stream → UI<br/>React + Ink]
    E --> J[bridge/<br/>IDE protocol]
    E --> K[coordinator/<br/>AgentTool / swarms]
```

</div>

<!-- ── TOOLS CATALOG ──────────────────────────────────────────────────────── -->
<div class="ce-section">
  <h2>// Catálogo de herramientas</h2>
  <table class="ce-table">
    <thead>
      <tr><th>Tool</th><th>Categoría</th><th>Descripción</th><th>Schema</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><code>BashTool</code></td>
        <td><span class="tag-cat cat-exec">exec</span></td>
        <td>Ejecución de comandos shell con timeout configurable</td>
        <td><code>command: string, timeout?: number</code></td>
      </tr>
      <tr>
        <td><code>FileReadTool</code></td>
        <td><span class="tag-cat cat-file">file</span></td>
        <td>Lectura de ficheros (texto, imágenes, PDFs, notebooks)</td>
        <td><code>file_path: string, offset?: number, limit?: number</code></td>
      </tr>
      <tr>
        <td><code>FileWriteTool</code></td>
        <td><span class="tag-cat cat-file">file</span></td>
        <td>Creación o sobreescritura completa de ficheros</td>
        <td><code>file_path: string, content: string</code></td>
      </tr>
      <tr>
        <td><code>FileEditTool</code></td>
        <td><span class="tag-cat cat-file">file</span></td>
        <td>Edición parcial mediante reemplazo de cadenas</td>
        <td><code>file_path, old_string, new_string</code></td>
      </tr>
      <tr>
        <td><code>GlobTool</code></td>
        <td><span class="tag-cat cat-search">search</span></td>
        <td>Búsqueda por patrón glob en el filesystem</td>
        <td><code>pattern: string, path?: string</code></td>
      </tr>
      <tr>
        <td><code>GrepTool</code></td>
        <td><span class="tag-cat cat-search">search</span></td>
        <td>Búsqueda de texto con ripgrep (regex, case-insensitive)</td>
        <td><code>pattern: string, path?: string, include?: string</code></td>
      </tr>
      <tr>
        <td><code>WebFetchTool</code></td>
        <td><span class="tag-cat cat-search">search</span></td>
        <td>Descarga y extracción de contenido de URLs</td>
        <td><code>url: string, prompt?: string</code></td>
      </tr>
      <tr>
        <td><code>WebSearchTool</code></td>
        <td><span class="tag-cat cat-search">search</span></td>
        <td>Búsqueda web (Google/Brave) con resultados estructurados</td>
        <td><code>query: string</code></td>
      </tr>
      <tr>
        <td><code>AgentTool</code></td>
        <td><span class="tag-cat cat-agent">agent</span></td>
        <td>Lanza sub-agentes con contexto aislado para tareas paralelas</td>
        <td><code>prompt: string, tools?: string[]</code></td>
      </tr>
      <tr>
        <td><code>SendMessageTool</code></td>
        <td><span class="tag-cat cat-agent">agent</span></td>
        <td>Mensajería inter-agente (swarms / equipos)</td>
        <td><code>to: string, message: string</code></td>
      </tr>
      <tr>
        <td><code>TeamCreateTool</code></td>
        <td><span class="tag-cat cat-agent">agent</span></td>
        <td>Crea equipo persistente de agentes especializados</td>
        <td><code>name: string, members: TeamMember[]</code></td>
      </tr>
      <tr>
        <td><code>TeamDeleteTool</code></td>
        <td><span class="tag-cat cat-agent">agent</span></td>
        <td>Elimina un equipo de agentes</td>
        <td><code>name: string</code></td>
      </tr>
      <tr>
        <td><code>MCPTool</code></td>
        <td><span class="tag-cat cat-mcp">mcp</span></td>
        <td>Invoca herramientas de cualquier servidor MCP conectado</td>
        <td>Dinámico según servidor MCP</td>
      </tr>
      <tr>
        <td><code>LSPTool</code></td>
        <td><span class="tag-cat cat-mcp">mcp</span></td>
        <td>Integración con Language Server Protocol (completions, diagnostics)</td>
        <td><code>uri: string, method: string</code></td>
      </tr>
      <tr>
        <td><code>SkillTool</code></td>
        <td><span class="tag-cat cat-task">task</span></td>
        <td>Ejecuta workflows reutilizables guardados en <code>skills/</code></td>
        <td><code>skill_name: string, args?: object</code></td>
      </tr>
      <tr>
        <td><code>TaskCreateTool</code></td>
        <td><span class="tag-cat cat-task">task</span></td>
        <td>Crea una tarea en el kanban interno</td>
        <td><code>title: string, description?: string</code></td>
      </tr>
      <tr>
        <td><code>TaskUpdateTool</code></td>
        <td><span class="tag-cat cat-task">task</span></td>
        <td>Actualiza estado, título o notas de una tarea</td>
        <td><code>id: string, status?: string</code></td>
      </tr>
      <tr>
        <td><code>NotebookEditTool</code></td>
        <td><span class="tag-cat cat-file">file</span></td>
        <td>Edición de notebooks Jupyter (celdas, outputs, metadata)</td>
        <td><code>notebook_path, cell_number, new_source</code></td>
      </tr>
      <tr>
        <td><code>SleepTool</code></td>
        <td><span class="tag-cat cat-meta">meta</span></td>
        <td>Pausa proactiva (modo watch, espera de recursos externos)</td>
        <td><code>duration_ms: number</code></td>
      </tr>
      <tr>
        <td><code>REPLTool</code></td>
        <td><span class="tag-cat cat-exec">exec</span></td>
        <td>Acceso a REPL interactivo (Node.js, Python, etc.)</td>
        <td><code>language: string, code: string</code></td>
      </tr>
      <tr>
        <td><code>EnterPlanModeTool</code></td>
        <td><span class="tag-cat cat-meta">meta</span></td>
        <td>Activa modo planificación (sin ejecución de acciones)</td>
        <td><code>—</code></td>
      </tr>
      <tr>
        <td><code>ExitPlanModeTool</code></td>
        <td><span class="tag-cat cat-meta">meta</span></td>
        <td>Sale del modo planificación, ejecuta el plan</td>
        <td><code>—</code></td>
      </tr>
      <tr>
        <td><code>EnterWorktreeTool</code></td>
        <td><span class="tag-cat cat-exec">exec</span></td>
        <td>Aísla trabajo en git worktree separado</td>
        <td><code>branch_name: string</code></td>
      </tr>
      <tr>
        <td><code>ToolSearchTool</code></td>
        <td><span class="tag-cat cat-meta">meta</span></td>
        <td>Descubrimiento lazy de herramientas diferidas (MCP)</td>
        <td><code>pattern: string</code></td>
      </tr>
      <tr>
        <td><code>CronCreateTool</code></td>
        <td><span class="tag-cat cat-meta">meta</span></td>
        <td>Crea triggers programados para modo proactivo</td>
        <td><code>schedule: string, command: string</code></td>
      </tr>
      <tr>
        <td><code>SyntheticOutputTool</code></td>
        <td><span class="tag-cat cat-meta">meta</span></td>
        <td>Genera output estructurado (JSON, Markdown) como herramienta</td>
        <td><code>schema: ZodSchema, data: object</code></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ── DESIGN PATTERNS ─────────────────────────────────────────────────────── -->
<div class="ce-section">
  <h2>// Patrones de diseño</h2>
  <div class="ce-patterns">

    <div class="ce-pattern">
      <div class="pat-icon">⚡</div>
      <div>
        <h4>Parallel Prefetch</h4>
        <p>En <code>main.tsx</code>, las lecturas MDM y Keychain se inician en paralelo antes de cargar cualquier módulo pesado. Ahorro ~65 ms en arranque.</p>
      </div>
    </div>

    <div class="ce-pattern">
      <div class="pat-icon">💤</div>
      <div>
        <h4>Lazy Loading de módulos pesados</h4>
        <p>OpenTelemetry (~400 KB) y gRPC (~700 KB) se cargan bajo demanda vía <code>await import()</code>. Solo se instancian si el usuario tiene telemetría activa.</p>
      </div>
    </div>

    <div class="ce-pattern">
      <div class="pat-icon">🏁</div>
      <div>
        <h4>Feature Flags + Dead-code Elimination</h4>
        <p>GrowthBook gestiona flags en runtime. En build, <code>bun:bundle</code> elimina el código de flags desactivados. Resultado: binario más pequeño y sin código muerto.</p>
      </div>
    </div>

    <div class="ce-pattern">
      <div class="pat-icon">🗂️</div>
      <div>
        <h4>SystemPromptBlock Cache en 2 niveles</h4>
        <p>En <code>utils/api.ts</code>, <code>buildSystemPromptBlocks()</code> divide el system prompt por <code>SYSTEM_PROMPT_DYNAMIC_BOUNDARY</code>: la parte estática toma scope <code>global</code> (cache perpetua), la dinámica scope <code>org</code> (cache por sesión). Optimización de costes de tokenización.</p>
      </div>
    </div>

    <div class="ce-pattern">
      <div class="pat-icon">📦</div>
      <div>
        <h4>Context Compaction automática</h4>
        <p><code>services/compact/</code> monitoriza el tamaño de la conversación. Al superar el umbral configurable, genera un resumen y reemplaza los mensajes anteriores, manteniendo el contexto semántico dentro de la ventana de tokens.</p>
      </div>
    </div>

    <div class="ce-pattern">
      <div class="pat-icon">🔐</div>
      <div>
        <h4>Modelo de permisos por herramienta</h4>
        <p>Cada invocación de tool pasa por <code>hooks/useCanUseTool.tsx</code>. El hook evalúa la política de la sesión (allow-list, deny-list, modo sandbox) antes de ejecutar. Si se deniega, el agente recibe un error de permiso y puede escalar al usuario.</p>
      </div>
    </div>

    <div class="ce-pattern">
      <div class="pat-icon">🐝</div>
      <div>
        <h4>Agent Swarms</h4>
        <p><code>tools/AgentTool/</code> lanza sub-agentes con contexto aislado. <code>coordinator/</code> orquesta equipos — permite al agente principal delegar trabajo en paralelo y recoger resultados. <code>SendMessageTool</code> permite mensajería asíncrona entre agentes del mismo swarm.</p>
      </div>
    </div>

    <div class="ce-pattern">
      <div class="pat-icon">🧠</div>
      <div>
        <h4>Memoria persistente jerárquica</h4>
        <p><code>memdir/</code> almacena ficheros CLAUDE.md por proyecto y de forma global. <code>services/extractMemories/</code> extrae automáticamente hechos importantes de la conversación. La memoria se inyecta en <code>getUserContext()</code> → <code>prependUserContext()</code> como recordatorio en el primer mensaje de usuario.</p>
      </div>
    </div>

  </div>
</div>

<!-- ── BENCHMARK ──────────────────────────────────────────────────────────── -->
<div class="ce-section">
  <h2>// Benchmark de escala</h2>
  <div class="ce-benchmark-grid">
    <div class="ce-metric">
      <div class="metric-value">~512K</div>
      <div class="metric-label">Líneas de código</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">~1.900</div>
      <div class="metric-label">Ficheros TypeScript</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">35+</div>
      <div class="metric-label">Herramientas (tools)</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">100+</div>
      <div class="metric-label">Comandos slash</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">140+</div>
      <div class="metric-label">Componentes UI</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">40+</div>
      <div class="metric-label">Hooks React</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">10+</div>
      <div class="metric-label">Servicios integrados</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">2</div>
      <div class="metric-label">Niveles de cache</div>
    </div>
    <div class="ce-metric">
      <div class="metric-value">3</div>
      <div class="metric-label">Fuentes de contexto</div>
    </div>
  </div>
  <p style="font-size:0.8rem;color:#9ca3af;margin-top:0.75rem">
    Fuentes de contexto: CLAUDE.md / memdir · gitStatus · currentDate. Todos inyectados antes de cada llamada a la API.
  </p>
</div>

<!-- ── NAVIGATION ─────────────────────────────────────────────────────────── -->
<div class="ce-section">
  <h2>// Continuar explorando</h2>
  <div class="ce-nav-grid">
    <a href="{{ site.baseurl }}/blueprint-claude-engine/" class="ce-nav-card">
      <h4>⚡ ClaudeEngine Pipeline</h4>
      <p>Presentación interactiva 3D. 8 fases del pipeline, paso a paso, con referencias a código fuente.</p>
    </a>
    <a href="{{ site.baseurl }}/blueprint-copilot/" class="ce-nav-card">
      <h4>🧠 CopilotEngine Blueprint</h4>
      <p>Arquitectura del motor conversacional de VS Code + Copilot Chat dentro del Scriptorium.</p>
    </a>
    <a href="{{ site.baseurl }}/ecosistema/" class="ce-nav-card">
      <h4>🧬 Ecosistema</h4>
      <p>Vista completa: 18 submódulos → 21 plugins → 33+ agentes. Dónde encaja ClaudeEngine.</p>
    </a>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ClaudeEngine" class="ce-nav-card" target="_blank">
      <h4>📁 Fuente en repositorio</h4>
      <p>Directorio <code>ClaudeEngine/</code> — README de la filtración + directorio <code>src/</code>.</p>
    </a>
  </div>
</div>

</div>
