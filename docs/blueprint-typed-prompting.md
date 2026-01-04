---
layout: presentation
title: "TypedPrompting: Schema-First NL Validation"
description: "Ontologías + MCP = Conversaciones validadas"
permalink: /blueprint-typed-prompting/
---

<!-- ==========================================
     BLUEPRINT: TYPED PROMPTING
     ==========================================
     
     Épica: TYPED-MCP-1.0.0 — MCPTypedPromptEditor Refactor
     
     Patrón: ESPIRAL DESCENDENTE + CUBO LATERAL
     (Coherente con blueprint-logic-flow.md)
     
     Navegación:
     - Centro: Historia principal (espiral descendente Y)
     - Derecha (+X): Detalles técnicos por layer
     - Izquierda (-X): Casos de uso / demos
     - Profundidad (Z): Overview y zoom
     
     Coordenadas base: Centro en (0, 0, 0)
     Espiral: incrementos Y=1500, rotaciones Z
     Laterales: offset X=±1800
     
     Repo: https://github.com/escrivivir-co/aleph-scriptorium
     Rama: flavour/monada
     ========================================== -->

<!-- ==========================================
     PORTADA
     ========================================== -->
<div id="portada" class="step typed-step portada-step" 
     data-x="0" 
     data-y="0" 
     data-z="500"
     data-scale="1.5"
     data-rotate-z="0">
  
  <div class="typed-header">
    <span class="epic-badge">TYPED-MCP-1.0.0</span>
  </div>
  
  <h1 class="hero-title">TypedPrompting</h1>
  
  <div class="hero-tagline">
    <span class="tagline-icon">📝</span>
    <span class="tagline-text">Schema</span>
    <span class="tagline-arrow">→</span>
    <span class="tagline-icon">✅</span>
    <span class="tagline-text">Validate</span>
    <span class="tagline-arrow">→</span>
    <span class="tagline-icon">🎭</span>
    <span class="tagline-text">Conversation</span>
  </div>
  
  <p class="hero-subtitle">Validación NL↔JSON con ontologías definidas</p>
  
  <div class="hero-meta">
    <div class="meta-item">
      <span class="meta-label">MCP Server:</span>
      <code>:3020</code>
    </div>
    <div class="meta-item">
      <span class="meta-label">UI Editor:</span>
      <code>:3019</code>
    </div>
    <div class="meta-item">
      <span class="meta-label">Sprint:</span>
      FC1 2026
    </div>
  </div>
  
  <div class="nav-hints">
    <span>↓ Comenzar tour</span>
    <span>→ Vista técnica</span>
    <span>← Demos</span>
  </div>
</div>

<!-- ==========================================
     LAYER 0: PROBLEMA
     ========================================== -->

<!-- L0: Centro - Historia -->
<div id="layer0-historia" class="step typed-step layer0-step" 
     data-x="0" 
     data-y="1500" 
     data-z="0"
     data-rotate-z="-5">
  
  <div class="layer-badge">
    <span class="layer-num">L0</span>
    <span class="layer-name">El Problema</span>
  </div>
  
  <h2>Las conversaciones con LLMs son ambiguas</h2>
  
  <div class="problem-grid">
    <div class="problem-card">
      <div class="problem-icon">🤷</div>
      <div class="problem-name">Ambigüedad</div>
      <div class="problem-desc">"Dame los datos" → ¿Cuáles?</div>
    </div>
    <div class="problem-card">
      <div class="problem-icon">🔄</div>
      <div class="problem-name">Inconsistencia</div>
      <div class="problem-desc">Misma pregunta, respuestas diferentes</div>
    </div>
    <div class="problem-card">
      <div class="problem-icon">❌</div>
      <div class="problem-name">Sin validación</div>
      <div class="problem-desc">JSON malformado = fallo silencioso</div>
    </div>
  </div>
  
  <blockquote class="po-quote">
    "Si tenemos schemas, ¿por qué no validamos las conversaciones?"
    <cite>— Product Owner</cite>
  </blockquote>
  
  <div class="nav-hints">
    <span>→ Ver solución</span>
    <span>← Ver ejemplo</span>
    <span>↓ Layer 1</span>
  </div>
</div>

<!-- L0: Derecha - Técnico -->
<div id="layer0-tecnico" class="step typed-step tech-step" 
     data-x="1800" 
     data-y="1500" 
     data-z="0">
  
  <div class="tech-header">
    <span class="layer-badge-mini">L0</span>
    <span class="tech-label">🔧 Solución</span>
  </div>
  
  <h3>Schema-First Approach</h3>
  
  <div class="solution-flow">
    <div class="flow-step">
      <div class="step-num">1</div>
      <div class="step-content">
        <div class="step-title">Definir Schema</div>
        <code>TypeScript → JSON Schema</code>
      </div>
    </div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">
      <div class="step-num">2</div>
      <div class="step-content">
        <div class="step-title">Registrar en Catálogo</div>
        <code>typed_create_schema()</code>
      </div>
    </div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">
      <div class="step-num">3</div>
      <div class="step-content">
        <div class="step-title">Validar Mensajes</div>
        <code>typed_validate_message()</code>
      </div>
    </div>
  </div>
  
  <div class="keywords">
    <span class="keyword">JSON Schema</span>
    <span class="keyword">TypeScript</span>
    <span class="keyword">Ajv</span>
    <span class="keyword">MCP</span>
  </div>
</div>

<!-- L0: Izquierda - Demo -->
<div id="layer0-demo" class="step typed-step demo-step" 
     data-x="-1800" 
     data-y="1500" 
     data-z="0">
  
  <div class="demo-header">
    <span class="layer-badge-mini">L0</span>
    <span class="demo-label">🎮 Ejemplo</span>
  </div>
  
  <h3>Conversación Sin vs Con Validación</h3>
  
  <div class="comparison">
    <div class="comparison-bad">
      <div class="comparison-label">❌ Sin TypedPrompt</div>
      <div class="conversation">
        <div class="msg user">Dame el estado</div>
        <div class="msg ai">El estado es bueno 👍</div>
        <div class="msg error">← Sin estructura, sin garantías</div>
      </div>
    </div>
    <div class="comparison-good">
      <div class="comparison-label">✅ Con TypedPrompt</div>
      <div class="conversation">
        <div class="msg user">Dame el estado</div>
        <div class="msg ai-valid">
          <code>{"status": "ok", "uptime": 3600}</code>
        </div>
        <div class="msg success">← Validado contra schema</div>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================
     LAYER 1: MCP SERVER
     ========================================== -->

<!-- L1: Centro - Historia -->
<div id="layer1-historia" class="step typed-step layer1-step" 
     data-x="0" 
     data-y="3000" 
     data-z="0"
     data-rotate-z="5">
  
  <div class="layer-badge">
    <span class="layer-num">L1</span>
    <span class="layer-name">MCP Server</span>
  </div>
  
  <h2>7 tools para gobernarlo todo</h2>
  
  <div class="tools-grid">
    <div class="tool-card schema">
      <div class="tool-icon">📄</div>
      <div class="tool-name">typed_convert_typescript</div>
      <div class="tool-desc">TS → JSON Schema</div>
    </div>
    <div class="tool-card schema">
      <div class="tool-icon">➕</div>
      <div class="tool-name">typed_create_schema</div>
      <div class="tool-desc">Registrar en catálogo</div>
    </div>
    <div class="tool-card schema">
      <div class="tool-icon">🔍</div>
      <div class="tool-name">typed_get_schema</div>
      <div class="tool-desc">Obtener por ID</div>
    </div>
    <div class="tool-card library">
      <div class="tool-icon">📚</div>
      <div class="tool-name">typed_list_libraries</div>
      <div class="tool-desc">Ver bibliotecas</div>
    </div>
    <div class="tool-card library">
      <div class="tool-icon">📋</div>
      <div class="tool-name">typed_list_schemas</div>
      <div class="tool-desc">Listar todos</div>
    </div>
    <div class="tool-card validate">
      <div class="tool-icon">✅</div>
      <div class="tool-name">typed_validate_message</div>
      <div class="tool-desc">Validar JSON</div>
    </div>
    <div class="tool-card suggest">
      <div class="tool-icon">💡</div>
      <div class="tool-name">typed_suggest_ontology</div>
      <div class="tool-desc">Recomendar schema</div>
    </div>
  </div>
  
  <div class="idea-fuerza">
    <span class="idea-icon">💡</span>
    <span class="idea-text">"Cada tool es un ciudadano MCP de primera clase"</span>
  </div>
</div>

<!-- L1: Derecha - Técnico -->
<div id="layer1-tecnico" class="step typed-step tech-step" 
     data-x="1800" 
     data-y="3000" 
     data-z="0">
  
  <div class="tech-header">
    <span class="layer-badge-mini">L1</span>
    <span class="tech-label">🔧 Código</span>
  </div>
  
  <h3>Arquitectura MCP</h3>
  
  <div class="file-tree">
    <div class="file-entry">
      <span class="file-icon">📁</span>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/MCPGallery/mcp-mesh-sdk/src" target="_blank">
        MCPGallery/mcp-mesh-sdk/src/
      </a>
    </div>
    <div class="file-entry indent">
      <span class="file-icon">📄</span>
      <span class="file-name">MCPTypedPromptServer.ts</span>
      <span class="file-note">Server principal</span>
    </div>
    <div class="file-entry indent">
      <span class="file-icon">📄</span>
      <span class="file-name">TypedPromptManager.ts</span>
      <span class="file-note">Lógica de schemas</span>
    </div>
    <div class="file-entry">
      <span class="file-icon">📁</span>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/TypedPromptsEditor" target="_blank">
        TypedPromptsEditor/
      </a>
    </div>
    <div class="file-entry indent">
      <span class="file-icon">📄</span>
      <span class="file-name">src/routes/api/</span>
      <span class="file-note">UI Vite :3019</span>
    </div>
  </div>
  
  <div class="code-snippet">
    <div class="snippet-header">typed_validate_message</div>
    <pre><code>const valid = ajv.validate(schema, message);
if (!valid) {
  return { valid: false, errors: ajv.errors };
}
return { valid: true };</code></pre>
  </div>
</div>

<!-- L1: Izquierda - Demo -->
<div id="layer1-demo" class="step typed-step demo-step" 
     data-x="-1800" 
     data-y="3000" 
     data-z="0">
  
  <div class="demo-header">
    <span class="layer-badge-mini">L1</span>
    <span class="demo-label">🎮 Demo</span>
  </div>
  
  <h3>Validación en Acción</h3>
  
  <div class="demo-terminal">
    <div class="terminal-header">
      <span class="terminal-title">mcp_typed-prompt-_typed_validate_message</span>
    </div>
    <div class="terminal-body">
      <div class="terminal-input">
        <code>{
  "schemaId": 1,
  "message": "{\"name\": \"test\", \"value\": 42}"
}</code>
      </div>
      <div class="terminal-output">
        <code class="success">{
  "valid": true,
  "message": "Validation successful"
}</code>
      </div>
    </div>
  </div>
  
  <div class="demo-links">
    <a href="http://localhost:3019" class="demo-link local">
      🌐 UI Editor :3019
    </a>
    <a href="http://localhost:3020" class="demo-link local">
      🔌 MCP Server :3020
    </a>
  </div>
</div>

<!-- ==========================================
     LAYER 2: CATÁLOGO
     ========================================== -->

<!-- L2: Centro - Historia -->
<div id="layer2-historia" class="step typed-step layer2-step" 
     data-x="0" 
     data-y="4500" 
     data-z="0"
     data-rotate-z="-3">
  
  <div class="layer-badge">
    <span class="layer-num">L2</span>
    <span class="layer-name">Catálogo</span>
  </div>
  
  <h2>Ontologías como ciudadanos del Scriptorium</h2>
  
  <div class="catalog-preview">
    <div class="catalog-header">
      <span class="catalog-icon">📚</span>
      <span class="catalog-title">Bibliotecas Disponibles</span>
    </div>
    <div class="catalog-grid">
      <div class="library-card">
        <div class="library-name">teatro</div>
        <div class="library-count">4 schemas</div>
        <div class="library-desc">Obras, escenas, personajes</div>
      </div>
      <div class="library-card">
        <div class="library-name">iot</div>
        <div class="library-count">3 schemas</div>
        <div class="library-desc">Sensores, reglas, acciones</div>
      </div>
      <div class="library-card">
        <div class="library-name">arg</div>
        <div class="library-count">5 schemas</div>
        <div class="library-desc">Argumentos, narrativas</div>
      </div>
      <div class="library-card coming-soon">
        <div class="library-name">+ Crear</div>
        <div class="library-count">∞ posibles</div>
        <div class="library-desc">typed_create_schema</div>
      </div>
    </div>
  </div>
</div>

<!-- L2: Derecha - Técnico -->
<div id="layer2-tecnico" class="step typed-step tech-step" 
     data-x="1800" 
     data-y="4500" 
     data-z="0">
  
  <div class="tech-header">
    <span class="layer-badge-mini">L2</span>
    <span class="tech-label">🔧 Specs</span>
  </div>
  
  <h3>OpenAPI + AsyncAPI</h3>
  
  <div class="spec-info">
    <div class="spec-card">
      <div class="spec-type">OpenAPI 3.0</div>
      <div class="spec-file">TypedPromptsEditor.yaml</div>
      <div class="spec-lines">931 líneas</div>
      <div class="spec-endpoints">14 endpoints REST</div>
    </div>
  </div>
  
  <div class="file-tree">
    <div class="file-entry">
      <span class="file-icon">📁</span>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor" target="_blank">
        OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/
      </a>
    </div>
    <div class="file-entry indent">
      <span class="file-icon">📄</span>
      <span class="file-name">TypedPromptsEditor.yaml</span>
    </div>
    <div class="file-entry indent">
      <span class="file-icon">📄</span>
      <span class="file-name">generated/typescript-client/</span>
    </div>
  </div>
</div>

<!-- L2: Izquierda - Demo -->
<div id="layer2-demo" class="step typed-step demo-step" 
     data-x="-1800" 
     data-y="4500" 
     data-z="0">
  
  <div class="demo-header">
    <span class="layer-badge-mini">L2</span>
    <span class="demo-label">🎮 Caso Teatro</span>
  </div>
  
  <h3>Schema para Obras Dramáticas</h3>
  
  <div class="demo-scenario">
    <div class="scenario-title">Validar una Obra del Teatro</div>
    <div class="schema-example">
      <pre><code>{
  "type": "object",
  "properties": {
    "obraId": { "type": "string" },
    "titulo": { "type": "string" },
    "escenas": {
      "type": "array",
      "items": { "$ref": "#/defs/Escena" }
    }
  },
  "required": ["obraId", "titulo"]
}</code></pre>
    </div>
  </div>
  
  <div class="integration-note">
    <span class="note-icon">🔗</span>
    <span class="note-text">Integración con TEATRO-PROLOG-1.0.0</span>
  </div>
</div>

<!-- ==========================================
     INTEGRACIÓN
     ========================================== -->

<div id="integracion" class="step typed-step integration-step" 
     data-x="0" 
     data-y="6000" 
     data-z="0"
     data-scale="1.2"
     data-rotate-z="0">
  
  <div class="layer-badge">
    <span class="layer-num">∞</span>
    <span class="layer-name">Integración</span>
  </div>
  
  <h2>El Flujo Completo</h2>
  
  <div class="integration-flow">
    <div class="flow-node">
      <div class="node-icon">📝</div>
      <div class="node-label">Definir Schema</div>
      <div class="node-tech">TypeScript</div>
    </div>
    <div class="flow-connector">→</div>
    <div class="flow-node">
      <div class="node-icon">🔌</div>
      <div class="node-label">Registrar MCP</div>
      <div class="node-tech">:3020</div>
    </div>
    <div class="flow-connector">→</div>
    <div class="flow-node">
      <div class="node-icon">✅</div>
      <div class="node-label">Validar</div>
      <div class="node-tech">Ajv</div>
    </div>
    <div class="flow-connector">→</div>
    <div class="flow-node">
      <div class="node-icon">🎭</div>
      <div class="node-label">Usar en Teatro</div>
      <div class="node-tech">Prolog :3006</div>
    </div>
  </div>
  
  <div class="mesh-diagram">
    <div class="mesh-title">MCP Mesh v2.0</div>
    <div class="mesh-grid">
      <div class="mesh-server">
        <span class="port">:3020</span>
        <span class="name">TypedPrompt</span>
      </div>
      <div class="mesh-server">
        <span class="port">:3006</span>
        <span class="name">Prolog</span>
      </div>
      <div class="mesh-server">
        <span class="port">:3050</span>
        <span class="name">Launcher</span>
      </div>
      <div class="mesh-server">
        <span class="port">:3003</span>
        <span class="name">DevOps</span>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================
     OVERVIEW
     ========================================== -->

<div id="overview" class="step" 
     data-x="0" 
     data-y="3000" 
     data-z="4000"
     data-scale="6">
</div>

<!-- ==========================================
     ESTILOS
     ========================================== -->
<style>
/* Variables TypedPrompt */
:root {
  --typed-primary: #22c55e;
  --typed-secondary: #3b82f6;
  --typed-accent: #f59e0b;
  --typed-dark: #1a1a2e;
  --typed-light: #f8fafc;
}

/* Steps base */
.typed-step {
  background: var(--typed-dark);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 40px rgba(34, 197, 94, 0.2);
  width: 900px;
  min-height: 600px;
}

/* Portada */
.portada-step {
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  background: linear-gradient(135deg, var(--typed-primary), var(--typed-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 1rem 0;
}

.hero-tagline {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  margin: 1.5rem 0;
}

.tagline-icon { font-size: 2rem; }
.tagline-arrow { color: var(--typed-primary); }
.tagline-text { color: var(--typed-light); }

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.meta-item code {
  background: var(--typed-primary);
  color: var(--typed-dark);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

/* Layer badges */
.layer-badge {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  background: var(--typed-primary);
  color: var(--typed-dark);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.layer-num {
  font-size: 1.5rem;
}

/* Problem/Tools grids */
.problem-grid, .tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.tools-grid {
  grid-template-columns: repeat(4, 1fr);
}

.problem-card, .tool-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
}

.problem-icon, .tool-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.tool-card.schema { border-left: 3px solid var(--typed-primary); }
.tool-card.library { border-left: 3px solid var(--typed-secondary); }
.tool-card.validate { border-left: 3px solid var(--typed-accent); }
.tool-card.suggest { border-left: 3px solid #a855f7; }

/* Tech steps */
.tech-step {
  width: 700px;
  min-height: 500px;
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.file-tree {
  background: #0d1117;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
}

.file-entry {
  padding: 0.25rem 0;
}

.file-entry.indent {
  padding-left: 1.5rem;
}

.file-entry a {
  color: var(--typed-secondary);
  text-decoration: none;
}

.file-note {
  color: #6b7280;
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

/* Demo steps */
.demo-step {
  width: 750px;
  min-height: 500px;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.comparison-bad, .comparison-good {
  padding: 1rem;
  border-radius: 0.5rem;
}

.comparison-bad {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
}

.comparison-good {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid var(--typed-primary);
}

.conversation {
  font-family: monospace;
  font-size: 0.9rem;
}

.msg {
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-radius: 0.25rem;
}

.msg.user { background: var(--typed-secondary); }
.msg.ai { background: #6b7280; }
.msg.ai-valid { background: var(--typed-primary); color: var(--typed-dark); }
.msg.error { color: #ef4444; font-style: italic; }
.msg.success { color: var(--typed-primary); font-style: italic; }

/* Terminal */
.demo-terminal {
  background: #0d1117;
  border-radius: 0.5rem;
  overflow: hidden;
}

.terminal-header {
  background: #1a1a2e;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: var(--typed-primary);
}

.terminal-body {
  padding: 1rem;
  font-family: monospace;
}

.terminal-output .success {
  color: var(--typed-primary);
}

/* Catalog */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.library-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid transparent;
  transition: border-color 0.3s;
}

.library-card:hover {
  border-color: var(--typed-primary);
}

.library-card.coming-soon {
  border-style: dashed;
  border-color: var(--typed-accent);
}

.library-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--typed-primary);
}

.library-count {
  color: var(--typed-secondary);
  font-size: 0.9rem;
}

/* Integration */
.integration-step {
  text-align: center;
}

.integration-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.flow-node {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  min-width: 120px;
}

.node-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.node-tech {
  color: var(--typed-primary);
  font-family: monospace;
}

.flow-connector {
  font-size: 2rem;
  color: var(--typed-primary);
}

/* Mesh diagram */
.mesh-diagram {
  background: rgba(34, 197, 94, 0.1);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
}

.mesh-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--typed-primary);
}

.mesh-grid {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.mesh-server {
  background: var(--typed-dark);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--typed-primary);
}

.mesh-server .port {
  color: var(--typed-accent);
  font-family: monospace;
  font-weight: bold;
}

.mesh-server .name {
  margin-left: 0.5rem;
  color: var(--typed-light);
}

/* Navigation hints */
.nav-hints {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  font-size: 0.85rem;
  color: #6b7280;
}

/* PO Quote */
.po-quote {
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid var(--typed-secondary);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
}

.po-quote cite {
  display: block;
  text-align: right;
  color: var(--typed-secondary);
  font-size: 0.9rem;
}

/* Idea fuerza */
.idea-fuerza {
  background: rgba(34, 197, 94, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-top: 1.5rem;
}

.idea-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

/* Keywords */
.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.keyword {
  background: rgba(34, 197, 94, 0.2);
  color: var(--typed-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

/* Demo links */
.demo-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.demo-link {
  background: var(--typed-primary);
  color: var(--typed-dark);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s;
}

.demo-link:hover {
  transform: scale(1.05);
}

/* Epic badge */
.epic-badge {
  background: rgba(34, 197, 94, 0.2);
  color: var(--typed-primary);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: bold;
}

/* Code snippets */
.code-snippet {
  background: #0d1117;
  border-radius: 0.5rem;
  margin: 1rem 0;
  overflow: hidden;
}

.snippet-header {
  background: #1a1a2e;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: var(--typed-primary);
  font-family: monospace;
}

.code-snippet pre {
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
}

.code-snippet code {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: var(--typed-light);
}

/* Schema example */
.schema-example {
  background: #0d1117;
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.8rem;
}

.schema-example pre {
  margin: 0;
}

/* Integration note */
.integration-note {
  background: rgba(168, 85, 247, 0.1);
  border-left: 3px solid #a855f7;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Spec info */
.spec-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.spec-type {
  color: var(--typed-secondary);
  font-weight: bold;
}

.spec-file {
  font-family: monospace;
  color: var(--typed-primary);
}

.spec-lines, .spec-endpoints {
  color: #6b7280;
  font-size: 0.85rem;
}
</style>
