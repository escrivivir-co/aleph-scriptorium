---
layout: presentation
title: Aleph Scriptorium Showcase
description: Demo interactivo del sistema de agentes de IA para escritura
permalink: /blueprint-po/
---

<!-- ==========================================
     BLUEPRINT PO SHOWCASE
     DEMO-1.0.0-F001 - Navegación en Cubo 3D
     
     Estructura de coordenadas:
     - Eje X: Flujo principal PO (→) incrementos de 3000
     - Por cada paso:
       - PO: (X, 0, 0) centro
       - Ox: (X, -800, 0) arriba
       - Aleph: (X-500, 800, 0) abajo-izquierda
       - SM: (X+500, 800, 0) abajo-derecha
     
     Total: 40 slides (10 PO + 10 Ox + 10 Aleph + 10 SM)
     Navegación: ← → entre pasos, ↑ ↓ entre roles
     ========================================== -->

<!-- ==========================================
     PASO 1: BIENVENIDA
     ========================================== -->

<!-- PO: Bienvenida -->
<div id="paso1-po" class="step showcase-step po-step" 
     data-x="0" 
     data-y="0" 
     data-z="0"
     data-scale="1.2">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 1 de 10</span>
  </div>
  
  <h1>Bienvenidos al Scriptorium</h1>
  
  <div class="showcase-content">
    <div class="hero-symbol">ℵ</div>
    <p class="tagline">El taller de escritura donde la IA trabaja para ti, no al revés.</p>
    
    <div class="value-props">
      <div class="prop">📚 Proyectos extensos</div>
      <div class="prop">🤖 31 agentes especializados</div>
      <div class="prop">🔌 19 plugins activos</div>
    </div>
  </div>
  
  <div class="nav-hints">
    <span>↑ Ox (técnico)</span>
    <span>↓ Equipo</span>
    <span>→ Siguiente paso</span>
  </div>
</div>

<!-- Ox: Stack Técnico -->
<div id="paso1-ox" class="step showcase-step ox-step" 
     data-x="0" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 1 · Técnico</span>
  </div>
  
  <h2>Stack Técnico</h2>
  
  <div class="tech-stack">
    <div class="tech-layer">
      <span class="layer-name">IDE</span>
      <span class="layer-tech">VS Code + GitHub Copilot</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">Agentes</span>
      <span class="layer-tech">.agent.md + ChatParticipants</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">MCP</span>
      <span class="layer-tech">5 servidores (Zeus, Launcher, Model...)</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">Web</span>
      <span class="layer-tech">Jekyll + impress.js</span>
    </div>
  </div>
</div>

<!-- Aleph: Propuesta de Valor -->
<div id="paso1-aleph" class="step showcase-step aleph-step" 
     data-x="-500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 1 · Producto</span>
  </div>
  
  <h2>Propuesta de Valor</h2>
  
  <div class="value-grid">
    <div class="value-item">
      <span class="icon">📖</span>
      <span class="text">Coherencia sostenida en textos largos</span>
    </div>
    <div class="value-item">
      <span class="icon">🎭</span>
      <span class="text">Voces diferenciadas por agente</span>
    </div>
    <div class="value-item">
      <span class="icon">📋</span>
      <span class="text">Metodología Scrum adaptada</span>
    </div>
  </div>
</div>

<!-- SM: Sprint Actual -->
<div id="paso1-sm" class="step showcase-step sm-step" 
     data-x="500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 1 · Proceso</span>
  </div>
  
  <h2>Sprint Actual: PRE</h2>
  
  <div class="sprint-status">
    <div class="metric">
      <span class="value">24+</span>
      <span class="label">Épicas cerradas</span>
    </div>
    <div class="metric">
      <span class="value">150</span>
      <span class="label">Puntos completados</span>
    </div>
    <div class="metric">
      <span class="value">v1.0.0-β</span>
      <span class="label">Release objetivo</span>
    </div>
  </div>
</div>

<!-- ==========================================
     PASO 2: PROBLEMA
     ========================================== -->

<!-- PO: Problema -->
<div id="paso2-po" class="step showcase-step po-step" 
     data-x="3000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 2 de 10</span>
  </div>
  
  <h1>El Problema</h1>
  
  <div class="problem-cards">
    <div class="problem-card">
      <span class="problem-icon">😵</span>
      <span class="problem-text">Copilot pierde contexto en proyectos largos</span>
    </div>
    <div class="problem-card">
      <span class="problem-icon">🎭</span>
      <span class="problem-text">Todas las respuestas suenan igual</span>
    </div>
    <div class="problem-card">
      <span class="problem-icon">📊</span>
      <span class="problem-text">Sin trazabilidad ni metodología</span>
    </div>
  </div>
</div>

<!-- Ox: Arquitectura del Problema -->
<div id="paso2-ox" class="step showcase-step ox-step" 
     data-x="3000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 2 · Técnico</span>
  </div>
  
  <h2>Diagnóstico Técnico</h2>
  
  <div class="diagnosis">
    <div class="diag-item">
      <code>context_window</code>
      <span>~200K tokens, pero sin gestión</span>
    </div>
    <div class="diag-item">
      <code>system_message</code>
      <span>Genérico, no especializado</span>
    </div>
    <div class="diag-item">
      <code>instructions</code>
      <span>Dispersas, sin estructura</span>
    </div>
  </div>
</div>

<!-- Aleph: Pain Points -->
<div id="paso2-aleph" class="step showcase-step aleph-step" 
     data-x="2500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 2 · Producto</span>
  </div>
  
  <h2>Pain Points del Usuario</h2>
  
  <ul class="pain-points">
    <li>"Tengo que repetir el contexto cada vez"</li>
    <li>"No sé qué agente usar para cada tarea"</li>
    <li>"Pierdo el hilo en textos de +50 páginas"</li>
    <li>"No hay auditoría de calidad"</li>
  </ul>
</div>

<!-- SM: Backlog del Problema -->
<div id="paso2-sm" class="step showcase-step sm-step" 
     data-x="3500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 2 · Proceso</span>
  </div>
  
  <h2>Backlog Resultante</h2>
  
  <div class="backlog-preview">
    <div class="epic">Context Bloat Mitigation</div>
    <div class="epic">Taxonomía de Agentes</div>
    <div class="epic">Sistema de Plugins</div>
    <div class="epic">Auditoría 5 Banderas</div>
  </div>
</div>

<!-- ==========================================
     PASO 3: SOLUCIÓN
     ========================================== -->

<!-- PO: Solución -->
<div id="paso3-po" class="step showcase-step po-step" 
     data-x="6000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 3 de 10</span>
  </div>
  
  <h1>La Solución: Scriptorium</h1>
  
  <div class="solution-pillars">
    <div class="pillar">
      <span class="pillar-icon">🐂</span>
      <span class="pillar-name">Ox</span>
      <span class="pillar-desc">Oráculo que conoce todo el sistema</span>
    </div>
    <div class="pillar">
      <span class="pillar-icon">ℵ</span>
      <span class="pillar-name">Aleph</span>
      <span class="pillar-desc">Productor que orquesta agentes</span>
    </div>
    <div class="pillar">
      <span class="pillar-icon">🔌</span>
      <span class="pillar-name">Plugins</span>
      <span class="pillar-desc">Extensibilidad modular</span>
    </div>
  </div>
</div>

<!-- Ox: MCP Servers -->
<div id="paso3-ox" class="step showcase-step ox-step" 
     data-x="6000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 3 · Técnico</span>
  </div>
  
  <h2>Servidores MCP</h2>
  
  <div class="mcp-grid">
    <div class="mcp-server">
      <span class="port">:3050</span>
      <span class="name">Launcher</span>
    </div>
    <div class="mcp-server">
      <span class="port">:3001</span>
      <span class="name">Model</span>
    </div>
    <div class="mcp-server">
      <span class="port">:4001</span>
      <span class="name">Zeus</span>
    </div>
    <div class="mcp-server">
      <span class="port">:3004</span>
      <span class="name">State Machine</span>
    </div>
  </div>
</div>

<!-- Aleph: Agentes UI -->
<div id="paso3-aleph" class="step showcase-step aleph-step" 
     data-x="5500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 3 · Producto</span>
  </div>
  
  <h2>Capa UI (Producción)</h2>
  
  <div class="agents-showcase">
    <div class="agent-card">🟢 @aleph - Productor principal</div>
    <div class="agent-card">🟢 @revisor - Auditor doctrinal</div>
    <div class="agent-card">🟢 @periodico - Método 5W</div>
  </div>
</div>

<!-- SM: Épicas -->
<div id="paso3-sm" class="step showcase-step sm-step" 
     data-x="6500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 3 · Proceso</span>
  </div>
  
  <h2>Épicas de Solución</h2>
  
  <div class="epics-list">
    <div class="epic-item done">✅ SCRIPT-1.29.0 Context Bloat</div>
    <div class="epic-item done">✅ SCRIPT-1.31.0 CopilotEngine</div>
    <div class="epic-item active">🔄 DEMO-1.0.0 Demo Screens</div>
  </div>
</div>

<!-- ==========================================
     PASO 4: DEMO AGENTES
     ========================================== -->

<!-- PO: Demo Agentes -->
<div id="paso4-po" class="step showcase-step po-step" 
     data-x="9000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 4 de 10</span>
  </div>
  
  <h1>Demo: Sistema de Agentes</h1>
  
  <div class="demo-preview">
    <div class="demo-command">
      <code>@ox ¿Qué agente uso para publicar en web?</code>
    </div>
    <div class="demo-response">
      <p>→ Usa <code>@plugin_ox_ghpages</code> que delega a GHPages</p>
    </div>
  </div>
</div>

<!-- Ox: Comandos CLI -->
<div id="paso4-ox" class="step showcase-step ox-step" 
     data-x="9000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 4 · Técnico</span>
  </div>
  
  <h2>Invocaciones Disponibles</h2>
  
  <div class="commands-list">
    <code>@ox diagnosticar agentes</code>
    <code>@aleph planificar capítulo</code>
    <code>@scrum borrador épica</code>
    <code>@revisor verificar coherencia</code>
  </div>
</div>

<!-- Aleph: Flujo Usuario -->
<div id="paso4-aleph" class="step showcase-step aleph-step" 
     data-x="8500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 4 · Producto</span>
  </div>
  
  <h2>Flujo de Usuario</h2>
  
  <div class="user-flow">
    <div class="flow-step">1. Usuario pregunta a @ox</div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">2. Ox identifica agente apropiado</div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">3. Handoff automático</div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">4. Agente especializado responde</div>
  </div>
</div>

<!-- SM: Métricas -->
<div id="paso4-sm" class="step showcase-step sm-step" 
     data-x="9500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 4 · Proceso</span>
  </div>
  
  <h2>Métricas de Uso</h2>
  
  <div class="metrics-grid">
    <div class="metric">
      <span class="value">31</span>
      <span class="label">Agentes activos</span>
    </div>
    <div class="metric">
      <span class="value">50+</span>
      <span class="label">Handoffs definidos</span>
    </div>
    <div class="metric">
      <span class="value">5</span>
      <span class="label">Capas taxonómicas</span>
    </div>
  </div>
</div>

<!-- ==========================================
     PASO 5: DEMO PLUGINS
     ========================================== -->

<!-- PO: Demo Plugins -->
<div id="paso5-po" class="step showcase-step po-step" 
     data-x="12000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 5 de 10</span>
  </div>
  
  <h1>Demo: Sistema de Plugins</h1>
  
  <div class="plugins-showcase">
    <div class="plugin-card">🎭 Teatro - Obras interactivas</div>
    <div class="plugin-card">📋 Scrum - Gestión ágil</div>
    <div class="plugin-card">📚 Enciclopedia - Consultas</div>
    <div class="plugin-card">🌐 GH-Pages - Publicación</div>
  </div>
</div>

<!-- Ox: Registry -->
<div id="paso5-ox" class="step showcase-step ox-step" 
     data-x="12000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 5 · Técnico</span>
  </div>
  
  <h2>Plugin Registry</h2>
  
  <div class="registry-info">
    <div class="reg-item">
      <span class="key">Ubicación:</span>
      <code>.github/plugins/</code>
    </div>
    <div class="reg-item">
      <span class="key">Manifest:</span>
      <code>manifest.md</code>
    </div>
    <div class="reg-item">
      <span class="key">Bridges:</span>
      <code>plugin_ox_*.agent.md</code>
    </div>
  </div>
</div>

<!-- Aleph: Casos de Uso -->
<div id="paso5-aleph" class="step showcase-step aleph-step" 
     data-x="11500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 5 · Producto</span>
  </div>
  
  <h2>Casos de Uso</h2>
  
  <div class="use-cases">
    <div class="case">🎭 Crear obra teatral interactiva</div>
    <div class="case">📰 Generar planas noticieras</div>
    <div class="case">📐 Diseñar blueprints 3D</div>
    <div class="case">🔧 Crear nuevos agentes</div>
  </div>
</div>

<!-- SM: Burndown -->
<div id="paso5-sm" class="step showcase-step sm-step" 
     data-x="12500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 5 · Proceso</span>
  </div>
  
  <h2>Plugins por Sprint</h2>
  
  <div class="plugin-timeline">
    <div class="timeline-item">Sprint PRE: 19 plugins base</div>
    <div class="timeline-item">FC1: +3 editores visuales</div>
    <div class="timeline-item">FC2: +2 integraciones</div>
  </div>
  
  <div class="depth-hint">↓ Ver Logic Flow Demo</div>
</div>

<!-- ==========================================
     PASO 5.5: LOGIC FLOW DEMO (Subcubo)
     Ciclo: Edición → Servidor → Pack → Escena
     Features: IOT-SBR-LOGICA + SCRIPT-2.2.0
     ========================================== -->

<!-- 5.5.1: Intro Logic Flow -->
<div id="logic-intro" class="step showcase-step po-step" 
     data-x="12000" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-context">Logic Flow · Intro</span>
  </div>
  
  <h2>Demo: Logic Flow Completo</h2>
  
  <div class="flow-intro">
    <p><strong>El ciclo que une dos mundos:</strong></p>
    <div class="flow-chain">
      <span class="flow-node">📝 Edición</span>
      <span class="flow-arrow">→</span>
      <span class="flow-node">🔌 Servidor</span>
      <span class="flow-arrow">→</span>
      <span class="flow-node">📦 Pack</span>
      <span class="flow-arrow">→</span>
      <span class="flow-node">🎭 Escena</span>
    </div>
    <p class="flow-tagline">Desde escribir una regla Prolog hasta que un títere la invoca en vivo</p>
  </div>
  
  <div class="nav-hints">
    <span>↑ Volver a Plugins</span>
    <span>→ Paso 1: Edición</span>
  </div>
</div>

<!-- 5.5.2: Edición Prolog -->
<div id="logic-edit" class="step showcase-step ox-step" 
     data-x="13200" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Logic Flow · Edición</span>
  </div>
  
  <h2>1️⃣ Editar Regla Prolog</h2>
  
  <div class="code-example">
    <div class="code-header">arrakis.pl</div>
    <pre><code>% Regla: agua es crítica si población > 1000
recurso_critico(agua) :- 
    poblacion(P), P > 1000.

% Hecho
poblacion(1500).</code></pre>
  </div>
  
  <p class="step-note">Plugin: <code>@plugin_ox_prologeditor</code></p>
</div>

<!-- 5.5.3: Servidor MCP -->
<div id="logic-server" class="step showcase-step aleph-step" 
     data-x="14400" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Logic Flow · Servidor</span>
  </div>
  
  <h2>2️⃣ Exponer como MCP</h2>
  
  <div class="server-info">
    <div class="server-card">
      <div class="server-name">prolog-mcp-server</div>
      <div class="server-port">Puerto 3006</div>
    </div>
    <div class="server-tools">
      <span class="tool">query_prolog</span>
      <span class="tool">assert_fact</span>
      <span class="tool">consult_kb</span>
    </div>
  </div>
  
  <p class="step-note">LauncherServer registra en la mesh</p>
</div>

<!-- 5.5.4: Pack Tipado -->
<div id="logic-pack" class="step showcase-step sm-step" 
     data-x="15600" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 SM</span>
    <span class="showcase-context">Logic Flow · Pack</span>
  </div>
  
  <h2>3️⃣ Crear Pack Tipado</h2>
  
  <div class="pack-preview">
    <div class="pack-name">AgentPrologBrain.pack.json</div>
    <div class="pack-contents">
      <div class="pack-section">
        <span class="label">tools:</span>
        <span class="items">query_prolog, assert_fact</span>
      </div>
      <div class="pack-section">
        <span class="label">resources:</span>
        <span class="items">knowledge_base</span>
      </div>
      <div class="pack-section">
        <span class="label">prompts:</span>
        <span class="items">razonamiento_sbr</span>
      </div>
    </div>
  </div>
  
  <p class="step-note">Contrato entre agente y herramientas</p>
</div>

<!-- 5.5.5: Escena Teatro -->
<div id="logic-scene" class="step showcase-step po-step" 
     data-x="16800" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-context">Logic Flow · Escena</span>
  </div>
  
  <h2>4️⃣ Títere en Escena</h2>
  
  <div class="scene-preview">
    <div class="scene-header">
      <span class="obra">🎭 Obra: Duna</span>
      <span class="escena">Consejo de Agua</span>
    </div>
    <div class="scene-dialogue">
      <div class="turn">
        <span class="actor">@arrakis:</span>
        <span class="action">Invoca <code>query_prolog("recurso_critico(X)")</code></span>
      </div>
      <div class="turn result">
        <span class="actor">MCP:</span>
        <span class="response">X = agua</span>
      </div>
      <div class="turn">
        <span class="actor">@arrakis:</span>
        <span class="dialogue">"El agua es recurso crítico. Protejamos los pozos."</span>
      </div>
    </div>
  </div>
</div>

<!-- 5.5.6: Resumen Ciclo -->
<div id="logic-summary" class="step showcase-step ox-step" 
     data-x="18000" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Logic Flow · Resumen</span>
  </div>
  
  <h2>El Ciclo Completo</h2>
  
  <div class="cycle-diagram">
    <div class="cycle-layer">
      <span class="layer-label">L0</span>
      <span class="layer-name">Infraestructura</span>
      <span class="layer-items">PrologServer, FIA Catalog</span>
    </div>
    <div class="cycle-arrow">↓ Exponer</div>
    <div class="cycle-layer">
      <span class="layer-label">L1</span>
      <span class="layer-name">Servidores MCP</span>
      <span class="layer-items">prolog-mcp, aaia-mcp</span>
    </div>
    <div class="cycle-arrow">↓ Tipar</div>
    <div class="cycle-layer">
      <span class="layer-label">L2</span>
      <span class="layer-name">Packs</span>
      <span class="layer-items">AgentPrologBrain, AgentFIACreator</span>
    </div>
    <div class="cycle-arrow">↓ Consumir</div>
    <div class="cycle-layer">
      <span class="layer-label">L3</span>
      <span class="layer-name">Teatro/ARG</span>
      <span class="layer-items">Títeres en escena</span>
    </div>
  </div>
  
  <div class="nav-hints">
    <span>↑ Volver a Plugins</span>
    <span>→ Blueprints 3D</span>
  </div>
</div>

<!-- ==========================================
     PASO 6: DEMO BLUEPRINTS
     ========================================== -->

<!-- PO: Demo Blueprints -->
<div id="paso6-po" class="step showcase-step po-step" 
     data-x="15000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 6 de 10</span>
  </div>
  
  <h1>Demo: Blueprints 3D</h1>
  
  <div class="blueprint-gallery">
    <div class="bp-card">📐 UX - Taxonomía visual</div>
    <div class="bp-card">🧬 MMCO - Jerarquía emergente</div>
    <div class="bp-card">🧠 Copilot - Flujo técnico</div>
    <div class="bp-card">🎤 PO - Este showcase</div>
  </div>
</div>

<!-- Ox: impress.js -->
<div id="paso6-ox" class="step showcase-step ox-step" 
     data-x="15000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 6 · Técnico</span>
  </div>
  
  <h2>Stack de Presentaciones</h2>
  
  <div class="tech-details">
    <div class="detail">
      <span class="name">Motor:</span>
      <span class="value">impress.js</span>
    </div>
    <div class="detail">
      <span class="name">Patrones:</span>
      <span class="value">Cruz, Columna, Cubo</span>
    </div>
    <div class="detail">
      <span class="name">Estilos:</span>
      <span class="value">blueprint.css (3000+ líneas)</span>
    </div>
  </div>
</div>

<!-- Aleph: Galería Visual -->
<div id="paso6-aleph" class="step showcase-step aleph-step" 
     data-x="14500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 6 · Producto</span>
  </div>
  
  <h2>Galería Demo</h2>
  
  <p>Ver <a href="/demo/">Demo Gallery</a> para iframes interactivos con todas las presentaciones.</p>
</div>

<!-- SM: Impedimentos -->
<div id="paso6-sm" class="step showcase-step sm-step" 
     data-x="15500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 6 · Proceso</span>
  </div>
  
  <h2>Impedimentos Resueltos</h2>
  
  <div class="impediments">
    <div class="imp resolved">✅ Navegación teclado</div>
    <div class="imp resolved">✅ Responsive móvil</div>
    <div class="imp resolved">✅ Fallback no-JS</div>
  </div>
</div>

<!-- ==========================================
     PASO 7: ECOSISTEMA
     ========================================== -->

<!-- PO: Ecosistema -->
<div id="paso7-po" class="step showcase-step po-step" 
     data-x="18000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 7 de 10</span>
  </div>
  
  <h1>El Ecosistema</h1>
  
  <div class="ecosystem-stats">
    <div class="stat">
      <span class="number">16</span>
      <span class="label">Submódulos git</span>
    </div>
    <div class="stat">
      <span class="number">19</span>
      <span class="label">Plugins</span>
    </div>
    <div class="stat">
      <span class="number">31</span>
      <span class="label">Agentes</span>
    </div>
  </div>
</div>

<!-- Ox: Submódulos -->
<div id="paso7-ox" class="step showcase-step ox-step" 
     data-x="18000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 7 · Técnico</span>
  </div>
  
  <h2>Submódulos Principales</h2>
  
  <div class="submodules-list">
    <code>CopilotEngine/</code>
    <code>MCPGallery/</code>
    <code>NovelistEditor/</code>
    <code>VsCodeExtension/</code>
    <code>BlocklyEditor/</code>
  </div>
</div>

<!-- Aleph: Integraciones -->
<div id="paso7-aleph" class="step showcase-step aleph-step" 
     data-x="17500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 7 · Producto</span>
  </div>
  
  <h2>Integraciones</h2>
  
  <div class="integrations">
    <div class="int">🔗 GitHub Copilot Chat</div>
    <div class="int">🔗 MCP Protocol</div>
    <div class="int">🔗 Jekyll/GitHub Pages</div>
    <div class="int">🔗 Socket.io</div>
  </div>
</div>

<!-- SM: Roadmap -->
<div id="paso7-sm" class="step showcase-step sm-step" 
     data-x="18500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 7 · Proceso</span>
  </div>
  
  <h2>Roadmap 2026</h2>
  
  <div class="roadmap">
    <div class="quarter">Q1: Estabilización</div>
    <div class="quarter">Q2: Editores visuales</div>
    <div class="quarter">Q3: Fundación caps 1-6</div>
    <div class="quarter">Q4: Fundación caps 7-12</div>
  </div>
  
  <div class="depth-hint">↓ Ver Self-Reflection Demo</div>
</div>

<!-- ==========================================
     PASO 7.5: SELF-REFLECTION DEMO (Subcubo)
     Ciclo: Bug → Investigación → Bloqueo → Oportunidad
     Feature: FEATURE-SNAPSHOTS-1.0.0
     
     Narrativa doble:
     a) Snapshots como auto-reflexión del sistema
     b) Proceso Agile que transforma blockers en features
     ========================================== -->

<!-- 7.5.1: Intro Self-Reflection -->
<div id="reflect-intro" class="step showcase-step po-step" 
     data-x="18000" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-context">Self-Reflection · Intro</span>
  </div>
  
  <h2>Demo: El Sistema que Se Observa</h2>
  
  <div class="flow-intro">
    <p><strong>De blocker a oportunidad:</strong></p>
    <div class="flow-chain">
      <span class="flow-node">🐛 Bug</span>
      <span class="flow-arrow">→</span>
      <span class="flow-node">🔍 Investigar</span>
      <span class="flow-arrow">→</span>
      <span class="flow-node">🛑 Bloqueo</span>
      <span class="flow-arrow">→</span>
      <span class="flow-node">💡 Feature</span>
    </div>
    <p class="flow-tagline">Cuando CopilotEngine olvida, el Scriptorium aprende a recordar</p>
  </div>
  
  <div class="nav-hints">
    <span>↑ Volver a Ecosistema</span>
    <span>→ Paso 1: El Bug</span>
  </div>
</div>

<!-- 7.5.2: El Bug -->
<div id="reflect-bug" class="step showcase-step ox-step" 
     data-x="19200" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Self-Reflection · Bug</span>
  </div>
  
  <h2>1️⃣ El Bug Revelador</h2>
  
  <div class="code-example">
    <div class="code-header">CopilotEngine/requestLoggerImpl.ts</div>
    <pre><code>// Límite de memoria: solo 100 requests
if (_entries.length > maxEntries) {
    _entries.shift(); // 👈 FIFO: borra el más antiguo
}</code></pre>
  </div>
  
  <div class="bug-insight">
    <p>💡 <strong>Root cause:</strong> Las conversaciones desaparecen después de ~100 requests</p>
  </div>
  
  <p class="step-note">No es un bug, es una decisión de diseño upstream</p>
</div>

<!-- 7.5.3: El Bloqueo Preventivo -->
<div id="reflect-block" class="step showcase-step aleph-step" 
     data-x="20400" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Self-Reflection · Bloqueo</span>
  </div>
  
  <h2>2️⃣ Stop the Line</h2>
  
  <div class="block-info">
    <div class="block-trigger">
      <span class="icon">🚨</span>
      <span class="text">PO detecta patrón de riesgo: "entusiasmo sin verificación"</span>
    </div>
    <div class="block-action">
      <span class="icon">🐂</span>
      <span class="text">Ox audita: <strong>7 gaps técnicos</strong> entre plan y realidad</span>
    </div>
    <div class="block-result">
      <span class="icon">✅</span>
      <span class="text">Nuevo gate: <strong>Definition of Ready</strong> con auditoría Ox-Indice</span>
    </div>
  </div>
  
  <p class="step-note">El conflicto es una feature, no un fallo</p>
</div>

<!-- 7.5.4: La Solución -->
<div id="reflect-solution" class="step showcase-step sm-step" 
     data-x="21600" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 SM</span>
    <span class="showcase-context">Self-Reflection · Solución</span>
  </div>
  
  <h2>3️⃣ Snapshots: Memoria Persistente</h2>
  
  <div class="solution-preview">
    <div class="solution-what">
      <span class="label">Qué:</span>
      <span class="value">Capturar conversaciones permanentemente</span>
    </div>
    <div class="solution-where">
      <span class="label">Dónde:</span>
      <span class="value"><code>ARCHIVO/DISCO/COPILOT_SNAPSHOTS/</code></span>
    </div>
    <div class="solution-how">
      <span class="label">Cómo:</span>
      <span class="value">16 tools MCP + Panel UI + INDEX.md + ABSTRACT.md</span>
    </div>
  </div>
  
  <p class="step-note">Si no podemos cambiar cómo olvida, cambiamos cómo recordamos</p>
</div>

<!-- 7.5.5: El Fix en Acción -->
<div id="reflect-fix" class="step showcase-step po-step" 
     data-x="22800" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-context">Self-Reflection · Fix</span>
  </div>
  
  <h2>4️⃣ El Fix que Validó Todo</h2>
  
  <div class="fix-demo">
    <div class="fix-before">
      <span class="label">❌ Antes:</span>
      <span class="code">id = "latest" → cache.skip()</span>
    </div>
    <div class="fix-after">
      <span class="label">✅ Después:</span>
      <span class="code">id = `req_${Date.now()}` → cache.store()</span>
    </div>
    <div class="fix-test">
      <span class="tool">mcp_copilot-logs-_capture_snapshot</span>
      <span class="result">✅ Funciona</span>
    </div>
  </div>
  
  <p class="step-note">Commit: <code>e8ea888</code> en VsCodeExtension</p>
</div>

<!-- 7.5.6: El Bucle Completo -->
<div id="reflect-summary" class="step showcase-step ox-step" 
     data-x="24000" 
     data-y="1600" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Self-Reflection · Cierre</span>
  </div>
  
  <h2>El Bucle de Auto-Reflexión</h2>
  
  <div class="cycle-diagram">
    <div class="cycle-layer">
      <span class="layer-label">🗣️</span>
      <span class="layer-name">Conversación</span>
      <span class="layer-items">Usuario ↔ Copilot Chat</span>
    </div>
    <div class="cycle-arrow">↓ Capturar</div>
    <div class="cycle-layer">
      <span class="layer-label">📸</span>
      <span class="layer-name">Snapshot</span>
      <span class="layer-items">requests.json + metadata</span>
    </div>
    <div class="cycle-arrow">↓ Archivar</div>
    <div class="cycle-layer">
      <span class="layer-label">📁</span>
      <span class="layer-name">ARCHIVO</span>
      <span class="layer-items">INDEX.md + ABSTRACT.md (LLM)</span>
    </div>
    <div class="cycle-arrow">↓ Consultar</div>
    <div class="cycle-layer">
      <span class="layer-label">🔄</span>
      <span class="layer-name">Mejor Conversación</span>
      <span class="layer-items">Contexto recuperado → Nuevo ciclo</span>
    </div>
  </div>
  
  <div class="nav-hints">
    <span>↑ Volver a Ecosistema</span>
    <span>→ Extensibilidad</span>
  </div>
</div>

<!-- ==========================================
     PASO 8: EXTENSIBILIDAD
     ========================================== -->

<!-- PO: Extensibilidad -->
<div id="paso8-po" class="step showcase-step po-step" 
     data-x="21000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 8 de 10</span>
  </div>
  
  <h1>Extensibilidad</h1>
  
  <div class="extension-points">
    <div class="point">
      <span class="icon">🤖</span>
      <span class="text">Crear agentes personalizados</span>
    </div>
    <div class="point">
      <span class="icon">🔌</span>
      <span class="text">Desarrollar plugins</span>
    </div>
    <div class="point">
      <span class="icon">📐</span>
      <span class="text">Diseñar blueprints</span>
    </div>
  </div>
</div>

<!-- Ox: API/SDK -->
<div id="paso8-ox" class="step showcase-step ox-step" 
     data-x="21000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 8 · Técnico</span>
  </div>
  
  <h2>SDKs Disponibles</h2>
  
  <div class="sdks">
    <div class="sdk">mcp-core-sdk</div>
    <div class="sdk">mcp-mesh-sdk</div>
    <div class="sdk">mcp-model-sdk</div>
  </div>
</div>

<!-- Aleph: Templates -->
<div id="paso8-aleph" class="step showcase-step aleph-step" 
     data-x="20500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 8 · Producto</span>
  </div>
  
  <h2>Templates Disponibles</h2>
  
  <div class="templates">
    <div class="tpl">📄 .agent.md template</div>
    <div class="tpl">📦 manifest.md template</div>
    <div class="tpl">📐 blueprint template</div>
  </div>
</div>

<!-- SM: Releases -->
<div id="paso8-sm" class="step showcase-step sm-step" 
     data-x="21500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 8 · Proceso</span>
  </div>
  
  <h2>Release Cycle</h2>
  
  <div class="release-info">
    <div class="rel">v1.0.0-beta.1 → Diciembre 2025</div>
    <div class="rel">v1.0.0 → Enero 2026</div>
    <div class="rel">Feature Cycles trimestrales</div>
  </div>
</div>

<!-- ==========================================
     PASO 9: COMUNIDAD
     ========================================== -->

<!-- PO: Comunidad -->
<div id="paso9-po" class="step showcase-step po-step" 
     data-x="24000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 9 de 10</span>
  </div>
  
  <h1>Comunidad</h1>
  
  <div class="community-info">
    <p>Open Source bajo licencia AIPL v1.0</p>
    <div class="links">
      <a href="https://github.com/escrivivir-co/aleph-scriptorium">GitHub</a>
      <a href="https://escrivivir-co.github.io/aleph-scriptorium/">Docs</a>
    </div>
  </div>
</div>

<!-- Ox: Contribuir -->
<div id="paso9-ox" class="step showcase-step ox-step" 
     data-x="24000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 9 · Técnico</span>
  </div>
  
  <h2>Cómo Contribuir</h2>
  
  <div class="contrib-steps">
    <div class="step-item">1. Fork del repositorio</div>
    <div class="step-item">2. Crear feature branch</div>
    <div class="step-item">3. Seguir DEVOPS.md</div>
    <div class="step-item">4. Pull Request</div>
  </div>
</div>

<!-- Aleph: Documentación -->
<div id="paso9-aleph" class="step showcase-step aleph-step" 
     data-x="23500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 9 · Producto</span>
  </div>
  
  <h2>Documentación</h2>
  
  <div class="docs-links">
    <div class="doc">📖 Léeme (15 min quick start)</div>
    <div class="doc">🧬 Ecosistema (arquitectura)</div>
    <div class="doc">🎭 Teatro (obras interactivas)</div>
  </div>
</div>

<!-- SM: Retrospectiva -->
<div id="paso9-sm" class="step showcase-step sm-step" 
     data-x="24500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 9 · Proceso</span>
  </div>
  
  <h2>Retrospectiva Sprint PRE</h2>
  
  <div class="retro">
    <div class="retro-item good">✅ 24+ épicas cerradas</div>
    <div class="retro-item good">✅ 36% reducción context bloat</div>
    <div class="retro-item improve">🔄 Mejorar onboarding</div>
  </div>
</div>

<!-- ==========================================
     PASO 10: CIERRE / CTA
     ========================================== -->

<!-- PO: Cierre -->
<div id="paso10-po" class="step showcase-step po-step" 
     data-x="27000" 
     data-y="0" 
     data-z="0"
     data-scale="1.2">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 Product Owner</span>
    <span class="showcase-paso">Paso 10 de 10</span>
  </div>
  
  <h1>¡Gracias!</h1>
  
  <div class="cta-section">
    <div class="hero-symbol">ℵ</div>
    <p class="tagline">El taller de escritura donde la IA trabaja para ti.</p>
    
    <div class="cta-buttons">
      <a href="https://github.com/escrivivir-co/aleph-scriptorium" class="cta-btn primary">⭐ Star en GitHub</a>
      <a href="/leeme/" class="cta-btn secondary">📖 Empezar</a>
    </div>
  </div>
</div>

<!-- Ox: Repos -->
<div id="paso10-ox" class="step showcase-step ox-step" 
     data-x="27000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Paso 10 · Técnico</span>
  </div>
  
  <h2>Repositorios</h2>
  
  <div class="repos">
    <code>github.com/escrivivir-co/aleph-scriptorium</code>
    <code>escrivivir-co.github.io/aleph-scriptorium</code>
  </div>
</div>

<!-- Aleph: Contacto -->
<div id="paso10-aleph" class="step showcase-step aleph-step" 
     data-x="26500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Paso 10 · Producto</span>
  </div>
  
  <h2>Contacto</h2>
  
  <div class="contact">
    <p>Issues en GitHub</p>
    <p>Discussions para ideas</p>
  </div>
</div>

<!-- SM: Next Steps -->
<div id="paso10-sm" class="step showcase-step sm-step" 
     data-x="27500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Paso 10 · Proceso</span>
  </div>
  
  <h2>Próximos Pasos</h2>
  
  <div class="next-steps">
    <div class="next">📋 Unirse al backlog</div>
    <div class="next">🔌 Crear tu primer plugin</div>
    <div class="next">🤖 Definir tu agente</div>
  </div>
</div>

<!-- ==========================================
     OVERVIEW
     ========================================== -->
<div id="overview" class="step" 
     data-x="13500" 
     data-y="0" 
     data-z="4000"
     data-scale="6">
</div>
