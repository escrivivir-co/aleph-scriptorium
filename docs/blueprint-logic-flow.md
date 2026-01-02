---
layout: presentation
title: "Agentic Typed Logic Flow"
description: "El ciclo completo: De la edición de lógica al títere en escena"
permalink: /blueprint-logic-flow/
---

<!-- ==========================================
     BLUEPRINT: AGENTIC TYPED LOGIC FLOW
     ==========================================
     
     Épicas fusionadas:
     - IOT-SBR-LOGICA (PrologEditor: Inteligencias Situadas)
     - SCRIPT-2.2.0 (Agentic Typed Logic Flow)
     
     Patrón: ESPIRAL DESCENDENTE + CUBO LATERAL
     
     Navegación:
     - Centro: Historia principal (espiral descendente Y)
     - Derecha (+X): Detalles técnicos por layer
     - Izquierda (-X): Casos de uso / demos
     - Profundidad (Z): Overview y zoom
     
     Coordenadas base: Centro en (0, 0, 0)
     Espiral: incrementos Y=1200, rotaciones Z
     Laterales: offset X=±1600
     
     Repo: https://github.com/escrivivir-co/aleph-scriptorium
     Rama: flavour/monada
     ========================================== -->

<!-- ==========================================
     PORTADA
     ========================================== -->
<div id="portada" class="step logic-step portada-step" 
     data-x="0" 
     data-y="0" 
     data-z="500"
     data-scale="1.5"
     data-rotate-z="0">
  
  <div class="logic-header">
    <span class="epic-badge">IOT-SBR-LOGICA + SCRIPT-2.2.0</span>
  </div>
  
  <h1 class="hero-title">Agentic Typed Logic Flow</h1>
  
  <div class="hero-tagline">
    <span class="tagline-icon">📝</span>
    <span class="tagline-arrow">→</span>
    <span class="tagline-icon">🔌</span>
    <span class="tagline-arrow">→</span>
    <span class="tagline-icon">📦</span>
    <span class="tagline-arrow">→</span>
    <span class="tagline-icon">🎭</span>
  </div>
  
  <p class="hero-subtitle">Desde escribir una regla Prolog hasta que un títere la invoca en escena</p>
  
  <div class="hero-meta">
    <div class="meta-item">
      <span class="meta-label">Repo:</span>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium" target="_blank">escrivivir-co/aleph-scriptorium</a>
    </div>
    <div class="meta-item">
      <span class="meta-label">Rama:</span>
      <code>flavour/monada</code>
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
     LAYER 0: INFRAESTRUCTURA
     ========================================== -->

<!-- L0: Centro - Historia -->
<div id="layer0-historia" class="step logic-step layer0-step" 
     data-x="0" 
     data-y="1500" 
     data-z="0"
     data-rotate-z="-5">
  
  <div class="layer-badge">
    <span class="layer-num">L0</span>
    <span class="layer-name">Infraestructura</span>
  </div>
  
  <h2>Todo empieza con el código que YA existe</h2>
  
  <div class="existing-pieces">
    <div class="piece prolog">
      <div class="piece-icon">🧠</div>
      <div class="piece-name">PrologServer</div>
      <div class="piece-status">✅ Funcional</div>
    </div>
    <div class="piece aaia">
      <div class="piece-icon">📚</div>
      <div class="piece-name">FIA Catalog</div>
      <div class="piece-status">✅ 10 paradigmas</div>
    </div>
    <div class="piece mesh">
      <div class="piece-icon">🌐</div>
      <div class="piece-name">MCP Mesh</div>
      <div class="piece-status">✅ 5 servers</div>
    </div>
  </div>
  
  <blockquote class="po-quote">
    "Si el server Prolog funciona, solo habría que meterlo en la mesh"
    <cite>— Product Owner</cite>
  </blockquote>
  
  <div class="nav-hints">
    <span>→ Ver código</span>
    <span>← Ver demo IoT</span>
    <span>↓ Layer 1</span>
  </div>
</div>

<!-- L0: Derecha - Técnico -->
<div id="layer0-tecnico" class="step logic-step tech-step" 
     data-x="1800" 
     data-y="1500" 
     data-z="0">
  
  <div class="tech-header">
    <span class="layer-badge-mini">L0</span>
    <span class="tech-label">🔧 Código</span>
  </div>
  
  <h3>Archivos Clave</h3>
  
  <div class="file-tree">
    <div class="file-entry">
      <span class="file-icon">📁</span>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog" target="_blank">
        AAIAGallery/.../sbr/app/prolog/
      </a>
      <span class="file-note">PrologServer</span>
    </div>
    <div class="file-entry">
      <span class="file-icon">📄</span>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/AAIAGallery/fia-catalog.json" target="_blank">
        AAIAGallery/fia-catalog.json
      </a>
      <span class="file-note">10 paradigmas FIA</span>
    </div>
    <div class="file-entry">
      <span class="file-icon">📄</span>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts" target="_blank">
        MCPGallery/.../MCPLauncherServer.ts
      </a>
      <span class="file-note">5 servers mesh</span>
    </div>
  </div>
  
  <div class="code-snippet">
    <div class="snippet-header">PrologServer — Estructura SBR</div>
    <pre><code>sensor(sensorMotor, 'Ciclo', ...)
regla(1, condicionMotor, accionMotor, ...)
accionMotor(_, IdSensor, _) :- 
    transicionMotor(IdSensor).</code></pre>
  </div>
  
  <div class="keywords">
    <span class="keyword">SWI-Prolog</span>
    <span class="keyword">SBR</span>
    <span class="keyword">Aferencia/Eferencia</span>
    <span class="keyword">IoT</span>
  </div>
</div>

<!-- L0: Izquierda - Demo -->
<div id="layer0-demo" class="step logic-step demo-step" 
     data-x="-1800" 
     data-y="1500" 
     data-z="0">
  
  <div class="demo-header">
    <span class="layer-badge-mini">L0</span>
    <span class="demo-label">🎮 Demo</span>
  </div>
  
  <h3>Inteligencias Situadas en Acción</h3>
  
  <div class="demo-scenario">
    <div class="scenario-title">Escenario: Arrakis (gestión de agua)</div>
    <div class="scenario-flow">
      <div class="flow-box aferencia">
        <div class="flow-label">AFERENCIA</div>
        <div class="flow-content">
          <code>sensor(nivelAgua, 'Tanque', ...)</code>
          <span class="flow-desc">Sensores detectan nivel</span>
        </div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-box brain">
        <div class="flow-label">BRAIN</div>
        <div class="flow-content">
          <code>regla(1, condicionCritica, ...)</code>
          <span class="flow-desc">Evalúa si es crítico</span>
        </div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-box eferencia">
        <div class="flow-label">EFERENCIA</div>
        <div class="flow-content">
          <code>accionProteger(pozos)</code>
          <span class="flow-desc">Dispara actuadores</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="demo-links">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/PrologEditor" target="_blank" class="demo-link">
      📂 Ver PrologEditor/
    </a>
  </div>
</div>

<!-- ==========================================
     LAYER 1: SERVIDORES MCP
     ========================================== -->

<!-- L1: Centro - Historia -->
<div id="layer1-historia" class="step logic-step layer1-step" 
     data-x="0" 
     data-y="3000" 
     data-z="0"
     data-rotate-z="5">
  
  <div class="layer-badge">
    <span class="layer-num">L1</span>
    <span class="layer-name">Servidores MCP</span>
  </div>
  
  <h2>El código se convierte en servicio</h2>
  
  <div class="transformation">
    <div class="transform-from">
      <span class="icon">📦</span>
      <span class="label">Código local</span>
    </div>
    <div class="transform-arrow">
      <span class="arrow">⟹</span>
      <span class="action">CONFIGS_BASE</span>
    </div>
    <div class="transform-to">
      <span class="icon">🔌</span>
      <span class="label">Servidor MCP</span>
    </div>
  </div>
  
  <div class="servers-preview">
    <div class="server-card new">
      <div class="server-name">prolog-mcp-server</div>
      <div class="server-port">:3006</div>
      <div class="server-status">🔧 Por crear</div>
    </div>
    <div class="server-card new">
      <div class="server-name">aaia-mcp-server</div>
      <div class="server-port">:3007</div>
      <div class="server-status">🔧 Por crear</div>
    </div>
  </div>
  
  <div class="idea-fuerza">
    <span class="idea-icon">💡</span>
    <span class="idea-text">"MCP Presets son ciudadanos de primera categoría"</span>
  </div>
</div>

<!-- L1: Derecha - Técnico -->
<div id="layer1-tecnico" class="step logic-step tech-step" 
     data-x="1800" 
     data-y="3000" 
     data-z="0">
  
  <div class="tech-header">
    <span class="layer-badge-mini">L1</span>
    <span class="tech-label">🔧 Código</span>
  </div>
  
  <h3>Configuración del Servidor</h3>
  
  <div class="code-snippet">
    <div class="snippet-header">prolog.config.ts (por crear)</div>
    <pre><code>export const DEFAULT_PROLOG_MCP_SERVER_CONFIG = {
  id: "prolog-mcp-server",
  port: 3006,
  tools: [
    "query_prolog",
    "assert_fact",
    "retract_fact",
    "consult_kb"
  ],
  resources: ["knowledge_base"]
};</code></pre>
  </div>
  
  <div class="file-tree">
    <div class="file-entry create">
      <span class="file-icon">➕</span>
      <code>MCPGallery/.../configs/prolog.config.ts</code>
    </div>
    <div class="file-entry create">
      <span class="file-icon">➕</span>
      <code>MCPGallery/.../configs/aaia.config.ts</code>
    </div>
    <div class="file-entry modify">
      <span class="file-icon">✏️</span>
      <code>MCPLauncherServer.ts</code>
    </div>
  </div>
  
  <div class="effort-badge">
    <span class="effort-label">Effort:</span>
    <span class="effort-value">5 + 8 = 13 pts</span>
  </div>
</div>

<!-- L1: Izquierda - Agentes -->
<div id="layer1-agentes" class="step logic-step agents-step" 
     data-x="-1800" 
     data-y="3000" 
     data-z="0">
  
  <div class="agents-header">
    <span class="layer-badge-mini">L1</span>
    <span class="agents-label">🤖 Agentes</span>
  </div>
  
  <h3>Red Agéntica del Layer</h3>
  
  <div class="agent-network">
    <div class="agent-node producer">
      <div class="agent-name">@plugin_ox_prologeditor</div>
      <div class="agent-role">Productor</div>
    </div>
    <div class="agent-arrow">
      <span class="handoff-label">exponer</span>
      →
    </div>
    <div class="agent-node integrator">
      <div class="agent-name">@plugin_ox_mcppresets</div>
      <div class="agent-role">Integrador</div>
    </div>
  </div>
  
  <div class="handoffs-table">
    <div class="handoff-row">
      <span class="handoff-from">@prologeditor</span>
      <span class="handoff-action">"Registrar como MCP"</span>
      <span class="handoff-to">@mcppresets</span>
    </div>
    <div class="handoff-row">
      <span class="handoff-from">@argboard</span>
      <span class="handoff-action">"Exponer AAIA"</span>
      <span class="handoff-to">@mcppresets</span>
    </div>
  </div>
</div>

<!-- ==========================================
     LAYER 2: PACKS TIPADOS
     ========================================== -->

<!-- L2: Centro - Historia -->
<div id="layer2-historia" class="step logic-step layer2-step" 
     data-x="0" 
     data-y="4500" 
     data-z="0"
     data-rotate-z="-5">
  
  <div class="layer-badge">
    <span class="layer-num">L2</span>
    <span class="layer-name">Packs Tipados</span>
  </div>
  
  <h2>El Pack es el contrato</h2>
  
  <div class="contract-visual">
    <div class="contract-side agente">
      <div class="side-icon">🤖</div>
      <div class="side-label">Lo que el agente PUEDE</div>
    </div>
    <div class="contract-center">
      <div class="pack-icon">📦</div>
      <div class="pack-label">Pack</div>
    </div>
    <div class="contract-side necesita">
      <div class="side-icon">📋</div>
      <div class="side-label">Lo que el agente PIDE</div>
    </div>
  </div>
  
  <div class="packs-preview">
    <div class="pack-card">
      <div class="pack-name">AgentPrologBrain</div>
      <div class="pack-desc">Razonamiento lógico SBR</div>
    </div>
    <div class="pack-card">
      <div class="pack-name">AgentFIACreator</div>
      <div class="pack-desc">Creación de agentes FIA</div>
    </div>
  </div>
  
  <blockquote class="aleph-quote">
    "Los packs son el contrato entre lo que el agente puede y lo que pide"
    <cite>— @aleph</cite>
  </blockquote>
</div>

<!-- L2: Derecha - Técnico -->
<div id="layer2-tecnico" class="step logic-step tech-step" 
     data-x="1800" 
     data-y="4500" 
     data-z="0">
  
  <div class="tech-header">
    <span class="layer-badge-mini">L2</span>
    <span class="tech-label">🔧 Código</span>
  </div>
  
  <h3>Estructura del Pack</h3>
  
  <div class="code-snippet">
    <div class="snippet-header">AgentPrologBrain.pack.json</div>
    <pre><code>{
  "id": "AgentPrologBrain",
  "version": "1.0.0",
  "mcpServer": "prolog-mcp-server",
  "tools": [
    { "name": "query_prolog" },
    { "name": "assert_fact" }
  ],
  "resources": [
    { "uri": "prolog://knowledge_base" }
  ],
  "prompts": [
    { "name": "razonamiento_sbr" }
  ]
}</code></pre>
  </div>
  
  <div class="file-tree">
    <div class="file-entry create">
      <span class="file-icon">➕</span>
      <code>.github/plugins/typed-prompting/packs/</code>
    </div>
  </div>
  
  <div class="keywords">
    <span class="keyword">JSON Schema</span>
    <span class="keyword">ajv validation</span>
    <span class="keyword">TypedPrompting</span>
  </div>
</div>

<!-- L2: Izquierda - Para quien no quiere Prolog -->
<div id="layer2-escritor" class="step logic-step user-step" 
     data-x="-1800" 
     data-y="4500" 
     data-z="0">
  
  <div class="user-header">
    <span class="layer-badge-mini">L2</span>
    <span class="user-label">✍️ Para Escritores</span>
  </div>
  
  <h3>No necesitas saber Prolog</h3>
  
  <div class="user-benefit">
    <div class="benefit-scenario">
      <p class="scenario-setup">Quieres que tu títere "piense" con lógica...</p>
      <p class="scenario-action">Solo declaras:</p>
      <div class="simple-config">
        <code>mcpPacks: [AgentPrologBrain]</code>
      </div>
      <p class="scenario-result">El pack hace el resto</p>
    </div>
  </div>
  
  <div class="analogy">
    <div class="analogy-icon">🎮</div>
    <div class="analogy-text">
      Como elegir un "power-up" para tu personaje sin programar el power-up
    </div>
  </div>
</div>

<!-- ==========================================
     LAYER 3: CONSUMIDORES (TEATRO)
     ========================================== -->

<!-- L3: Centro - Historia -->
<div id="layer3-historia" class="step logic-step layer3-step" 
     data-x="0" 
     data-y="6000" 
     data-z="0"
     data-rotate-z="5">
  
  <div class="layer-badge">
    <span class="layer-num">L3</span>
    <span class="layer-name">Teatro Runtime</span>
  </div>
  
  <h2>Los títeres cobran vida</h2>
  
  <div class="teatro-preview">
    <div class="obra-card">
      <div class="obra-header">
        <span class="obra-icon">🎭</span>
        <span class="obra-title">Obra: Duna</span>
      </div>
      <div class="obra-escena">Escena: Consejo de Agua</div>
      <div class="obra-packs">
        <span class="pack-badge">AgentPrologBrain</span>
        <span class="pack-badge">AgentFIACreator</span>
      </div>
    </div>
  </div>
  
  <div class="runtime-dialogue">
    <div class="dialogue-line">
      <span class="actor arrakis">@arrakis:</span>
      <span class="action">invoca <code>query_prolog("recurso_critico(X)")</code></span>
    </div>
    <div class="dialogue-line response">
      <span class="actor mcp">MCP:</span>
      <span class="response">X = agua</span>
    </div>
    <div class="dialogue-line">
      <span class="actor arrakis">@arrakis:</span>
      <span class="dialogue">"El agua es recurso crítico. Protejamos los pozos."</span>
    </div>
  </div>
</div>

<!-- L3: Derecha - Técnico -->
<div id="layer3-tecnico" class="step logic-step tech-step" 
     data-x="1800" 
     data-y="6000" 
     data-z="0">
  
  <div class="tech-header">
    <span class="layer-badge-mini">L3</span>
    <span class="tech-label">🔧 Código</span>
  </div>
  
  <h3>Configuración de Obra</h3>
  
  <div class="code-snippet">
    <div class="snippet-header">obra.yaml (con mcpPacks)</div>
    <pre><code>titulo: "Duna: Consejo de Agua"
mcpPacks:
  - AgentPrologBrain
  - AgentFIACreator

escenas:
  - nombre: "Consejo de Agua"
    agentes:
      - arrakis
      - boe
    contexto: |
      Decidir distribución usando
      reglas Prolog en runtime</code></pre>
  </div>
  
  <div class="file-tree">
    <div class="file-entry modify">
      <span class="file-icon">✏️</span>
      <code>.github/plugins/teatro/schemas/obra.schema.yaml</code>
    </div>
    <div class="file-entry modify">
      <span class="file-icon">✏️</span>
      <code>.github/plugins/arg-board/agents/Arrakis.agent.md</code>
    </div>
  </div>
</div>

<!-- L3: Izquierda - Para quien no quiere teatro -->
<div id="layer3-programador" class="step logic-step user-step" 
     data-x="-1800" 
     data-y="6000" 
     data-z="0">
  
  <div class="user-header">
    <span class="layer-badge-mini">L3</span>
    <span class="user-label">💻 Para Programadores</span>
  </div>
  
  <h3>No necesitas diseñar títeres</h3>
  
  <div class="user-benefit">
    <div class="benefit-scenario">
      <p class="scenario-setup">Tu lógica Prolog ya funciona...</p>
      <p class="scenario-action">Solo la expones:</p>
      <div class="simple-config">
        <code>prolog-mcp-server :3006</code>
      </div>
      <p class="scenario-result">Un escritor la usará en su obra</p>
    </div>
  </div>
  
  <div class="analogy">
    <div class="analogy-icon">🔌</div>
    <div class="analogy-text">
      Como crear una API: tú haces el backend, otros hacen el frontend
    </div>
  </div>
</div>

<!-- ==========================================
     DIAGRAMA E2E
     ========================================== -->

<div id="diagrama-e2e" class="step logic-step diagram-step" 
     data-x="0" 
     data-y="7500" 
     data-z="0"
     data-scale="1.2">
  
  <h2>Secuencia End-to-End</h2>
  
  <div class="sequence-diagram">
    <div class="seq-actors">
      <div class="seq-actor">👤 User</div>
      <div class="seq-actor">🎭 Teatro</div>
      <div class="seq-actor">🌐 Launcher</div>
      <div class="seq-actor">🧠 Prolog</div>
    </div>
    <div class="seq-messages">
      <div class="seq-message right">
        <span class="msg-label">"Iniciar obra"</span>
        <span class="msg-arrow">────────────→</span>
      </div>
      <div class="seq-message right">
        <span class="msg-label">getAvailablePacks()</span>
        <span class="msg-arrow">────────────────────→</span>
      </div>
      <div class="seq-message left">
        <span class="msg-arrow">←────────────────────</span>
        <span class="msg-label">[AgentPrologBrain]</span>
      </div>
      <div class="seq-message right full">
        <span class="msg-label">query_prolog("recurso_critico(X)")</span>
        <span class="msg-arrow">──────────────────────────────────→</span>
      </div>
      <div class="seq-message left full">
        <span class="msg-arrow">←──────────────────────────────────</span>
        <span class="msg-label">X = agua</span>
      </div>
      <div class="seq-message left">
        <span class="msg-arrow">←────────────</span>
        <span class="msg-label">Respuesta ARG</span>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================
     BACKLOG Y ÉPICAS
     ========================================== -->

<div id="backlog" class="step logic-step backlog-step" 
     data-x="0" 
     data-y="9000" 
     data-z="0"
     data-rotate-z="-5">
  
  <h2>📋 Backlog: Épicas y Tasks</h2>
  
  <div class="epics-grid">
    <div class="epic-card e1">
      <div class="epic-id">E1</div>
      <div class="epic-name">Prolog MCP Server</div>
      <div class="epic-layer">L0→L1</div>
      <div class="epic-effort">5 pts</div>
    </div>
    <div class="epic-card e2">
      <div class="epic-id">E2</div>
      <div class="epic-name">AAIA MCP Server</div>
      <div class="epic-layer">L0→L1</div>
      <div class="epic-effort">8 pts</div>
    </div>
    <div class="epic-card e3">
      <div class="epic-id">E3</div>
      <div class="epic-name">Pack AgentPrologBrain</div>
      <div class="epic-layer">L1→L2</div>
      <div class="epic-effort">5 pts</div>
    </div>
    <div class="epic-card e4">
      <div class="epic-id">E4</div>
      <div class="epic-name">Pack AgentFIACreator</div>
      <div class="epic-layer">L1→L2</div>
      <div class="epic-effort">5 pts</div>
    </div>
    <div class="epic-card e5">
      <div class="epic-id">E5</div>
      <div class="epic-name">Teatro Runtime Context</div>
      <div class="epic-layer">L2→L3</div>
      <div class="epic-effort">3 pts</div>
    </div>
    <div class="epic-card e6">
      <div class="epic-id">E6</div>
      <div class="epic-name">ARG Agents MCP Live</div>
      <div class="epic-layer">L2→L3</div>
      <div class="epic-effort">8 pts</div>
    </div>
  </div>
  
  <div class="total-effort">
    <span class="total-label">Total:</span>
    <span class="total-value">~34 pts</span>
    <span class="total-duration">(1 Feature Cycle)</span>
  </div>
</div>

<!-- ==========================================
     TABLA DE AGENTES Y HANDOFFS
     ========================================== -->

<div id="agentes-tabla" class="step logic-step tabla-step" 
     data-x="1800" 
     data-y="9000" 
     data-z="0">
  
  <h2>🤖 Red Agéntica Completa</h2>
  
  <div class="agents-table">
    <div class="table-header">
      <span>Agente</span>
      <span>Capa</span>
      <span>Rol</span>
    </div>
    <div class="table-row">
      <span class="agent-name">@plugin_ox_prologeditor</span>
      <span class="agent-layer">L0</span>
      <span class="agent-desc">Productor Prolog</span>
    </div>
    <div class="table-row">
      <span class="agent-name">@plugin_ox_argboard</span>
      <span class="agent-layer">L0</span>
      <span class="agent-desc">Productor AAIA</span>
    </div>
    <div class="table-row">
      <span class="agent-name">@plugin_ox_typedprompting</span>
      <span class="agent-layer">L0</span>
      <span class="agent-desc">Productor Schemas</span>
    </div>
    <div class="table-row highlight">
      <span class="agent-name">@plugin_ox_mcppresets</span>
      <span class="agent-layer">L1</span>
      <span class="agent-desc">Integrador MCP</span>
    </div>
    <div class="table-row">
      <span class="agent-name">@plugin_ox_teatro</span>
      <span class="agent-layer">L3</span>
      <span class="agent-desc">Consumidor Runtime</span>
    </div>
  </div>
  
  <div class="handoffs-summary">
    <div class="handoff-mini">prologeditor → mcppresets: "Registrar"</div>
    <div class="handoff-mini">mcppresets → teatro: "Pack disponible"</div>
    <div class="handoff-mini">teatro → ox: "Diagnóstico post"</div>
  </div>
</div>

<!-- ==========================================
     ARCHIVOS A CREAR/MODIFICAR (DRY INDEX)
     ========================================== -->

<div id="archivos-dry" class="step logic-step dry-step" 
     data-x="-1800" 
     data-y="9000" 
     data-z="0">
  
  <h2>📂 Archivos (Índice DRY)</h2>
  
  <div class="files-list">
    <div class="file-section">
      <div class="section-title">🆕 CREAR</div>
      <div class="file-item">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/MCPGallery/mcp-mesh-sdk/src" target="_blank">
          MCPGallery/.../configs/prolog.config.ts
        </a>
      </div>
      <div class="file-item">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/MCPGallery/mcp-mesh-sdk/src" target="_blank">
          MCPGallery/.../configs/aaia.config.ts
        </a>
      </div>
      <div class="file-item">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/.github/plugins/typed-prompting" target="_blank">
          .github/plugins/typed-prompting/packs/*.pack.json
        </a>
      </div>
    </div>
    <div class="file-section">
      <div class="section-title">✏️ MODIFICAR</div>
      <div class="file-item">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts" target="_blank">
          MCPLauncherServer.ts
        </a>
      </div>
      <div class="file-item">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/.github/plugins/teatro" target="_blank">
          .github/plugins/teatro/schemas/obra.schema.yaml
        </a>
      </div>
      <div class="file-item">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/.github/plugins/arg-board/agents" target="_blank">
          .github/plugins/arg-board/agents/Arrakis.agent.md
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================
     RIESGOS Y MITIGACIONES
     ========================================== -->

<div id="riesgos" class="step logic-step risk-step" 
     data-x="0" 
     data-y="10500" 
     data-z="0">
  
  <h2>⚠️ Riesgos y Mitigaciones</h2>
  
  <div class="risks-grid">
    <div class="risk-card">
      <div class="risk-title">PrologServer sin HTTP</div>
      <div class="risk-impact">🟡 Medio</div>
      <div class="risk-mitigation">Wrapper en mcp-mesh-sdk (patrón existente)</div>
    </div>
    <div class="risk-card">
      <div class="risk-title">AAIAGallery legacy</div>
      <div class="risk-impact">🟡 Medio</div>
      <div class="risk-mitigation">Solo exponer vía MCP, no refactorizar</div>
    </div>
    <div class="risk-card">
      <div class="risk-title">Packs sin validación</div>
      <div class="risk-impact">🟢 Bajo</div>
      <div class="risk-mitigation">ajv en modo warn (planificado FC1)</div>
    </div>
    <div class="risk-card">
      <div class="risk-title">Teatro sin runtime context</div>
      <div class="risk-impact">🟡 Medio</div>
      <div class="risk-mitigation">Añadir mcpPacks a obra.yaml</div>
    </div>
  </div>
  
  <div class="verdict">
    <span class="verdict-icon">✅</span>
    <span class="verdict-text">Veredicto @aleph: "Lo veo. No es cuento de la lechera."</span>
  </div>
</div>

<!-- ==========================================
     REFERENCIAS DOCUMENTACIÓN
     ========================================== -->

<div id="referencias" class="step logic-step refs-step" 
     data-x="1800" 
     data-y="10500" 
     data-z="0">
  
  <h2>📚 Referencias y Documentación</h2>
  
  <div class="refs-grid">
    <div class="ref-card backlog">
      <div class="ref-icon">📋</div>
      <div class="ref-title">Backlogs</div>
      <div class="ref-links">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA/01_backlog-borrador.md" target="_blank">IOT-SBR-LOGICA</a>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/01_backlog-borrador.md" target="_blank">SCRIPT-2.2.0</a>
      </div>
    </div>
    <div class="ref-card blueprints">
      <div class="ref-icon">📐</div>
      <div class="ref-title">Blueprints</div>
      <div class="ref-links">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/03_together_all.md" target="_blank">Blueprint Agéntico (Ox)</a>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/02_putting_all_together.md" target="_blank">Chuletario PO</a>
      </div>
    </div>
    <div class="ref-card sessions">
      <div class="ref-icon">💬</div>
      <div class="ref-title">Sesiones</div>
      <div class="ref-links">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA/conversacion-po-sm.md" target="_blank">PO + SM (IoT)</a>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/ARCHIVO/DISCO/Enero_2026_LogicaAgentes/conversacion.md" target="_blank">Periódico (Logic Flow)</a>
      </div>
    </div>
    <div class="ref-card plugins">
      <div class="ref-icon">🔌</div>
      <div class="ref-title">Plugins</div>
      <div class="ref-links">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/.github/plugins/teatro" target="_blank">Teatro</a>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/.github/plugins/arg-board" target="_blank">ARG-Board</a>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/flavour/monada/.github/plugins/mcp-presets" target="_blank">MCP-Presets</a>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================
     LLAMADA A LA ACCIÓN
     ========================================== -->

<div id="cta" class="step logic-step cta-step" 
     data-x="0" 
     data-y="12000" 
     data-z="500"
     data-scale="1.3">
  
  <h1>¿Listo para contribuir?</h1>
  
  <div class="cta-options">
    <div class="cta-card">
      <div class="cta-icon">🧠</div>
      <div class="cta-title">Soy Programador</div>
      <div class="cta-action">Crea reglas Prolog y expón tu servidor MCP</div>
      <div class="cta-start">Empieza en <code>L0 → L1</code></div>
    </div>
    <div class="cta-card">
      <div class="cta-icon">✍️</div>
      <div class="cta-title">Soy Escritor</div>
      <div class="cta-action">Diseña obras que usen packs de razonamiento</div>
      <div class="cta-start">Empieza en <code>L2 → L3</code></div>
    </div>
    <div class="cta-card">
      <div class="cta-icon">🔗</div>
      <div class="cta-title">Soy Integrador</div>
      <div class="cta-action">Conecta piezas existentes con nuevos packs</div>
      <div class="cta-start">Empieza en <code>L1 → L2</code></div>
    </div>
  </div>
  
  <div class="cta-links">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium" target="_blank" class="cta-button primary">
      🚀 Ver Repositorio
    </a>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/flavour/monada/.github/BACKLOG-SCRIPTORIUM.md" target="_blank" class="cta-button secondary">
      📋 Ver Backlog
    </a>
  </div>
</div>

<!-- ==========================================
     OVERVIEW (MAPA)
     ========================================== -->

<div id="overview" class="step" 
     data-x="0" 
     data-y="6000" 
     data-z="5000"
     data-scale="7">
</div>
