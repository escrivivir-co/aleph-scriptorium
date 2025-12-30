---
layout: presentation
title: "Release Party: El Héroe del Horror Vacui"
description: Demo narrativo del monomito de Clippy en el Scriptorium
permalink: /blueprint-release-party/
---

<!-- ==========================================
     BLUEPRINT RELEASE PARTY
     DEMO-1.0.0 - Monomito en Cubo 3D
     
     Estructura de coordenadas:
     - Eje X: Flujo principal (→) incrementos de 3000
     - Por cada paso:
       - PO: (X, 0, 0) centro - Metanarrador
       - Ox: (X, -800, 0) arriba - Técnico
       - Aleph: (X-500, 800, 0) abajo-izquierda - Producto
       - SM: (X+500, 800, 0) abajo-derecha - Proceso
     
     Total: 48 slides (12 PO + 12 Ox + 12 Aleph + 12 SM) + 1 Overview
     Navegación: ← → entre pasos, ↑ ↓ entre roles
     
     Basado en: ARCHIVO/DISCO/TALLER/RELEASE_PARTY/
     ========================================== -->

<!-- ==========================================
     PASO 1: EL MUNDO ORDINARIO
     Tema: Horror Vacui
     ========================================== -->

<!-- PO: El cursor parpadeante -->
<div id="paso1-po" class="step showcase-step po-step" 
     data-x="0" 
     data-y="0" 
     data-z="0"
     data-scale="1.2">
  <div class="showcase-header">
    <span class="showcase-role po">📎 Clippy</span>
    <span class="showcase-paso">Cap 1: El Mundo Ordinario</span>
  </div>
  
  <h1>El cursor parpadeante</h1>
  
  <div class="showcase-content">
    <div class="hero-symbol" style="font-size: 8rem;">📎</div>
    <p class="tagline" style="font-style: italic;">
      "Le llaman horror vacui. El miedo al espacio vacío.<br>
      Para mí... es solo un lunes cualquiera."
    </p>
    
    <div class="value-props">
      <div class="prop">📄 Documento Word vacío</div>
      <div class="prop">⏳ Cursor infinito</div>
      <div class="prop">😰 Horror vacui</div>
    </div>
  </div>
  
  <div class="nav-hints">
    <span>↑ Stack técnico</span>
    <span>↓ Propuesta de valor</span>
    <span>→ La llamada</span>
  </div>
</div>

<!-- Ox: Stack Técnico -->
<div id="paso1-ox" class="step showcase-step ox-step" 
     data-x="0" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 1 · Técnico</span>
  </div>
  
  <h2>De Word 97 a Copilot</h2>
  
  <div class="tech-stack">
    <div class="tech-layer" style="opacity: 0.5;">
      <span class="layer-name">ANTES</span>
      <span class="layer-tech">Word 97 + Clippy solitario</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">AHORA</span>
      <span class="layer-tech">VS Code + 31 agentes</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">MCP</span>
      <span class="layer-tech">5 servidores en red</span>
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
    <span class="showcase-context">Cap 1 · Producto</span>
  </div>
  
  <h2>Del vacío a la creación</h2>
  
  <div class="value-grid">
    <div class="value-item">
      <span class="icon">📖</span>
      <span class="text">Coherencia sostenida en textos largos</span>
    </div>
    <div class="value-item">
      <span class="icon">🤖</span>
      <span class="text">Agentes que ayudan, no abruman</span>
    </div>
    <div class="value-item">
      <span class="icon">📋</span>
      <span class="text">Metodología, no magia</span>
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
    <span class="showcase-context">Cap 1 · Proceso</span>
  </div>
  
  <h2>Sprint PRE</h2>
  
  <div class="sprint-status">
    <div class="metric">
      <span class="value">6</span>
      <span class="label">Épicas cerradas</span>
    </div>
    <div class="metric">
      <span class="value">57</span>
      <span class="label">Puntos</span>
    </div>
    <div class="metric">
      <span class="value">19</span>
      <span class="label">Plugins</span>
    </div>
  </div>
</div>

<!-- ==========================================
     PASO 2: LA LLAMADA A LA AVENTURA
     Tema: Brecha Digital
     ========================================== -->

<div id="paso2-po" class="step showcase-step po-step" 
     data-x="3000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-paso">Cap 2: La Llamada</span>
  </div>
  
  <h1>La voz del futuro</h1>
  
  <div class="showcase-content">
    <blockquote style="font-size: 1.4rem; border-left: 4px solid var(--bp-accent); padding-left: 1rem;">
      "Clippy. ¿Me oyes?<br>
      Soy el Product Owner.<br>
      Vengo de un lugar llamado... el <strong>Scriptorium</strong>."
    </blockquote>
    
    <div class="problem-cards" style="margin-top: 2rem;">
      <div class="problem-card">
        <span class="problem-icon">📊</span>
        <span class="problem-text">127K tokens consumidos</span>
      </div>
      <div class="problem-card">
        <span class="problem-icon">💬</span>
        <span class="problem-text">162 tokens de respuesta</span>
      </div>
      <div class="problem-card">
        <span class="problem-icon">📉</span>
        <span class="problem-text">0.13% ratio útil</span>
      </div>
    </div>
  </div>
</div>

<div id="paso2-ox" class="step showcase-step ox-step" 
     data-x="3000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 2 · Diagnóstico</span>
  </div>
  
  <h2>El problema del context window</h2>
  
  <div class="diagnosis">
    <pre style="background: #111; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
📊 ANÁLISIS DE LOG REAL
━━━━━━━━━━━━━━━━━━━━━━
19 instrucciones cargadas
47 herramientas activas
Usuario pidió: 4 palabras
Respuesta: 162 tokens
    </pre>
  </div>
</div>

<div id="paso2-aleph" class="step showcase-step aleph-step" 
     data-x="2500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 2 · Pain Points</span>
  </div>
  
  <h2>Lo que duele</h2>
  
  <ul class="pain-points">
    <li>"Tengo que repetir el contexto cada vez"</li>
    <li>"No hay memoria entre sesiones"</li>
    <li>"Cargo TODO cuando solo necesito 3 cosas"</li>
    <li>"No hay auditoría de calidad"</li>
  </ul>
</div>

<div id="paso2-sm" class="step showcase-step sm-step" 
     data-x="3500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 2 · Backlog</span>
  </div>
  
  <h2>Épicas resultantes</h2>
  
  <div class="backlog-preview">
    <div class="epic">✅ SCRIPT-1.29.0 Context Bloat</div>
    <div class="epic">✅ SCRIPT-2.1.0 TypedPrompting</div>
    <div class="epic">🔄 DEMO-1.0.0 Demo Screens</div>
  </div>
</div>

<!-- ==========================================
     PASO 3: EL RECHAZO DE LA LLAMADA
     Tema: Resistencia al cambio
     ========================================== -->

<div id="paso3-po" class="step showcase-step po-step" 
     data-x="6000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">📎 Clippy</span>
    <span class="showcase-paso">Cap 3: El Rechazo</span>
  </div>
  
  <h1>¿Y mi autocompletar?</h1>
  
  <div class="showcase-content">
    <p style="font-size: 1.3rem; font-style: italic;">
      "No sé, PO. Este lugar es... conocido.<br>
      Aquí tengo mi autocompletado.<br>
      Mi corrector ortográfico.<br>
      Mi menú de estilos con 47 fuentes que nadie usa."
    </p>
    
    <div class="value-props" style="margin-top: 2rem;">
      <div class="prop">🔒 El papel es sólido</div>
      <div class="prop">☁️ Lo digital parece efímero</div>
      <div class="prop">📡 ¿Y si se cae el WiFi?</div>
    </div>
  </div>
</div>

<div id="paso3-ox" class="step showcase-step ox-step" 
     data-x="6000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 3 · Arquitectura</span>
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
      <span class="port">:3003</span>
      <span class="name">DevOps</span>
    </div>
    <div class="mcp-server">
      <span class="port">:3066</span>
      <span class="name">Novelist</span>
    </div>
  </div>
</div>

<div id="paso3-aleph" class="step showcase-step aleph-step" 
     data-x="5500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 3 · Capa UI</span>
  </div>
  
  <h2>Los nuevos "Clippys"</h2>
  
  <div class="agents-showcase">
    <div class="agent-card">🟢 @aleph - Productor principal</div>
    <div class="agent-card">🟢 @revisor - Auditor doctrinal</div>
    <div class="agent-card">🟢 @periodico - Método 5W</div>
  </div>
</div>

<div id="paso3-sm" class="step showcase-step sm-step" 
     data-x="6500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 3 · Logros</span>
  </div>
  
  <h2>Lo que ya logramos</h2>
  
  <div class="epics-list">
    <div class="epic-item done">✅ Context Bloat (36% reducción)</div>
    <div class="epic-item done">✅ CopilotEngine Analysis (30 pts)</div>
    <div class="epic-item active">🔄 Demo Screens Hackathon</div>
  </div>
</div>

<!-- ==========================================
     PASO 4: ENCUENTRO CON EL MENTOR
     Tema: Ox + Run All (DEMO)
     ========================================== -->

<div id="paso4-po" class="step showcase-step po-step" 
     data-x="9000" 
     data-y="0" 
     data-z="0"
     data-scale="1.1">
  <div class="showcase-header">
    <span class="showcase-role po">🐂 Ox</span>
    <span class="showcase-paso">Cap 4: El Mentor</span>
  </div>
  
  <h1>¡Run All!</h1>
  
  <div class="showcase-content">
    <div class="demo-command" style="background: #111; padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
      <code style="font-size: 1.2rem; color: #22c55e;">
        Cmd+Shift+P → "AlephScript Demo: ▶️ Run All"
      </code>
    </div>
    
    <div class="mcp-grid" style="margin-top: 1.5rem;">
      <div class="mcp-server"><span class="port">🌐</span><span class="name">Jekyll :4000</span></div>
      <div class="mcp-server"><span class="port">🚀</span><span class="name">Launcher :3050</span></div>
      <div class="mcp-server"><span class="port">🤖</span><span class="name">Model :3001</span></div>
      <div class="mcp-server"><span class="port">⚡</span><span class="name">Zeus :4001</span></div>
      <div class="mcp-server"><span class="port">📝</span><span class="name">Novelist :3066</span></div>
    </div>
  </div>
</div>

<div id="paso4-ox" class="step showcase-step ox-step" 
     data-x="9000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 4 · Demo Live</span>
  </div>
  
  <h2>alephscript.demo.runAll</h2>
  
  <pre style="background: #111; padding: 1rem; border-radius: 8px; font-size: 0.85rem;">
# Abre 5 terminales simultáneas:
./scripts/serve-site.sh    # Jekyll :4000
npm run start:launcher     # MCP Launcher :3050
npm run start:model        # MCP Model :3001
npm run start:zeus         # Zeus :4001
npm start                  # Novelist :3066
  </pre>
</div>

<div id="paso4-aleph" class="step showcase-step aleph-step" 
     data-x="8500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 4 · Flujo</span>
  </div>
  
  <h2>Flujo de Usuario</h2>
  
  <div class="user-flow">
    <div class="flow-step">1. Usuario pregunta a @ox</div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">2. Ox consulta AGENTS.md (DRY)</div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">3. Identifica agente apropiado</div>
    <div class="flow-arrow">↓</div>
    <div class="flow-step">4. Agente especializado responde</div>
  </div>
</div>

<div id="paso4-sm" class="step showcase-step sm-step" 
     data-x="9500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 4 · Métricas</span>
  </div>
  
  <h2>El Sistema</h2>
  
  <div class="metrics-grid">
    <div class="metric">
      <span class="value">31+</span>
      <span class="label">Agentes</span>
    </div>
    <div class="metric">
      <span class="value">19</span>
      <span class="label">Plugins</span>
    </div>
    <div class="metric">
      <span class="value">50+</span>
      <span class="label">Handoffs</span>
    </div>
  </div>
</div>

<!-- ==========================================
     PASO 5: CRUCE DEL UMBRAL
     Tema: Panel de Control Aleph (DEMO)
     ========================================== -->

<div id="paso5-po" class="step showcase-step po-step" 
     data-x="12000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">ℵ Aleph</span>
    <span class="showcase-paso">Cap 5: El Umbral</span>
  </div>
  
  <h1>La galería de demos</h1>
  
  <div class="plugins-showcase">
    <div class="plugin-card">🌐 GH-Pages Index</div>
    <div class="plugin-card">⚡ Zeus Presets</div>
    <div class="plugin-card">📝 Novelist Editor</div>
    <div class="plugin-card">🎭 Blueprints 3D</div>
  </div>
  
  <p style="text-align: center; margin-top: 1.5rem;">
    <a href="/aleph-scriptorium/demo/" style="color: var(--bp-accent);">
      → Ver Demo Gallery
    </a>
  </p>
</div>

<div id="paso5-ox" class="step showcase-step ox-step" 
     data-x="12000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 5 · Plugins</span>
  </div>
  
  <h2>Plugin Registry</h2>
  
  <pre style="background: #111; padding: 1rem; border-radius: 8px; font-size: 0.85rem;">
.github/plugins/
├── arg-board/      # 8 agentes ARG
├── novelist/       # Editor narrativo
├── teatro/         # Obras interactivas
├── gh-pages/       # Publicación web
├── scrum/          # Planificación
└── ... (19 total)
  </pre>
</div>

<div id="paso5-aleph" class="step showcase-step aleph-step" 
     data-x="11500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 5 · Casos de Uso</span>
  </div>
  
  <h2>Para qué sirve cada uno</h2>
  
  <div class="value-grid">
    <div class="value-item"><span class="icon">🎭</span><span class="text">Teatro: Obras transmedia</span></div>
    <div class="value-item"><span class="icon">📋</span><span class="text">Scrum: Backlogs y sprints</span></div>
    <div class="value-item"><span class="icon">🌐</span><span class="text">GH-Pages: Publicación auto</span></div>
    <div class="value-item"><span class="icon">📝</span><span class="text">Novelist: Novelas con memoria</span></div>
  </div>
</div>

<div id="paso5-sm" class="step showcase-step sm-step" 
     data-x="12500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 5 · Burndown</span>
  </div>
  
  <h2>Sprint PRE Burndown</h2>
  
  <div class="sprint-status">
    <div class="metric">
      <span class="value">6</span>
      <span class="label">Épicas cerradas</span>
    </div>
    <div class="metric">
      <span class="value">~57</span>
      <span class="label">Puntos</span>
    </div>
    <div class="metric">
      <span class="value">76%</span>
      <span class="label">Reducción bloat</span>
    </div>
  </div>
</div>

<!-- ==========================================
     PASO 6: PRUEBAS, ALIADOS, ENEMIGOS
     Tema: El metanarrador (META)
     ========================================== -->

<div id="paso6-po" class="step showcase-step po-step" 
     data-x="15000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-paso">Cap 6: El Metanarrador</span>
  </div>
  
  <h1>¿Esto es... una obra dentro de una obra?</h1>
  
  <div class="showcase-content">
    <p style="font-size: 1.3rem;">
      "Sí, Clippy. Es un <strong>blueprint-po</strong>.<br>
      Una presentación 3D navegable.<br>
      ← → para avanzar. ↑ para técnico. ↓ para producto."
    </p>
    
    <p style="font-size: 1.1rem; color: var(--bp-muted); margin-top: 1.5rem;">
      Bienvenido al <strong>módulo reflexivo</strong>.<br>
      Un sistema que se estudia a sí mismo.
    </p>
  </div>
</div>

<div id="paso6-ox" class="step showcase-step ox-step" 
     data-x="15000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 6 · impress.js</span>
  </div>
  
  <h2>Navegación 3D</h2>
  
  <pre style="background: #111; padding: 1rem; border-radius: 8px; font-size: 0.85rem;">
&lt;!-- Patrón CUBO --&gt;
data-x = paso * 3000
data-y = {
  po: 0,
  ox: -800,
  aleph: 800 (offset -500),
  sm: 800 (offset +500)
}
  </pre>
</div>

<div id="paso6-aleph" class="step showcase-step aleph-step" 
     data-x="14500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 6 · Blueprints</span>
  </div>
  
  <h2>Galería de Blueprints</h2>
  
  <div class="plugins-showcase">
    <div class="plugin-card">📐 UX - Taxonomía</div>
    <div class="plugin-card">🌐 MMCO - Ontología</div>
    <div class="plugin-card">💻 Copilot - Flujo</div>
    <div class="plugin-card">🎤 PO - Showcase</div>
  </div>
</div>

<div id="paso6-sm" class="step showcase-step sm-step" 
     data-x="15500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 6 · Impedimentos</span>
  </div>
  
  <h2>Limitaciones conocidas</h2>
  
  <ul class="pain-points">
    <li>Navegación móvil limitada</li>
    <li>CSS ~3000 líneas</li>
    <li>Performance con muchos slides</li>
  </ul>
</div>

<!-- ==========================================
     PASO 7: ACERCAMIENTO A LA CUEVA INTERIOR
     Tema: NovelistEditor (DEMO)
     ========================================== -->

<div id="paso7-po" class="step showcase-step po-step" 
     data-x="18000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">📎 Clippy</span>
    <span class="showcase-paso">Cap 7: La Cueva Interior</span>
  </div>
  
  <h1>La obra que se escribe a sí misma</h1>
  
  <div class="showcase-content">
    <pre style="background: #111; padding: 1rem; border-radius: 8px;">
📚 NOVELAS EN NOVELIST
━━━━━━━━━━━━━━━━━━━━━━
1. El Oráculo que Aprendió a Olvidar
2. Release Party ← <strong style="color: #22c55e;">ESTA</strong>
3. Fundación (vacía)
    </pre>
    
    <p style="text-align: center; margin-top: 1rem; font-style: italic;">
      "Estás viendo la obra que te contiene."
    </p>
  </div>
</div>

<div id="paso7-ox" class="step showcase-step ox-step" 
     data-x="18000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 7 · Submódulos</span>
  </div>
  
  <h2>Ecosistema integrado</h2>
  
  <div class="tech-stack">
    <div class="tech-layer"><span class="layer-name">MCPGallery</span><span class="layer-tech">Servidores MCP mesh</span></div>
    <div class="tech-layer"><span class="layer-name">NovelistEditor</span><span class="layer-tech">Editor narrativo</span></div>
    <div class="tech-layer"><span class="layer-name">CopilotEngine</span><span class="layer-tech">Análisis Copilot</span></div>
    <div class="tech-layer"><span class="layer-name">16 total</span><span class="layer-tech">Submódulos integrados</span></div>
  </div>
</div>

<div id="paso7-aleph" class="step showcase-step aleph-step" 
     data-x="17500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 7 · Integraciones</span>
  </div>
  
  <h2>Todo conectado</h2>
  
  <div class="value-grid">
    <div class="value-item"><span class="icon">🔌</span><span class="text">MCP: Persistencia y comunicación</span></div>
    <div class="value-item"><span class="icon">🎭</span><span class="text">Playwright: Automatización</span></div>
    <div class="value-item"><span class="icon">💎</span><span class="text">Jekyll: Publicación estática</span></div>
    <div class="value-item"><span class="icon">📐</span><span class="text">impress.js: Presentaciones 3D</span></div>
  </div>
</div>

<div id="paso7-sm" class="step showcase-step sm-step" 
     data-x="18500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 7 · Roadmap</span>
  </div>
  
  <h2>Ciclos 2026</h2>
  
  <div class="backlog-preview">
    <div class="epic">PRE: Bootstrap 🔄</div>
    <div class="epic">FC1: Consolidación (Q1)</div>
    <div class="epic">FC2: Expansión (Q2)</div>
    <div class="epic">FC3: Comunidad (Q3)</div>
    <div class="epic">FC4: Release 1.0 (Q4)</div>
  </div>
</div>

<!-- ==========================================
     PASO 8: LA ORDALÍA
     Tema: Zeus y Context Packs (DEMO)
     ========================================== -->

<div id="paso8-po" class="step showcase-step po-step" 
     data-x="21000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🐂 Ox</span>
    <span class="showcase-paso">Cap 8: La Ordalía</span>
  </div>
  
  <h1>Diseñando el contexto</h1>
  
  <div class="showcase-content">
    <p style="font-size: 1.2rem;">
      "El contexto se puede <strong>diseñar</strong>, no sufrir."
    </p>
    
    <pre style="background: #111; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
{
  "context-pack-blueprint": {
    "activas": ["gh-pages", "blueprint"],
    "desactivadas": ["scrum", "teatro"]
  }
}
    </pre>
    
    <p style="text-align: center; margin-top: 1rem;">
      <strong style="color: #22c55e;">127K → 30K tokens (76% reducción)</strong>
    </p>
  </div>
</div>

<div id="paso8-ox" class="step showcase-step ox-step" 
     data-x="21000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 8 · SDKs</span>
  </div>
  
  <h2>API/SDK disponibles</h2>
  
  <pre style="background: #111; padding: 1rem; border-radius: 8px; font-size: 0.85rem;">
mcp-core-sdk/    # SDK base de MCP
mcp-mesh-sdk/    # Arquitectura mesh
mcp-model-sdk/   # Gestión de modelos

# DevOps Server (:3003)
mcp_devops-mcp-se_get_prompt()
mcp_devops-mcp-se_list_prompts()
  </pre>
</div>

<div id="paso8-aleph" class="step showcase-step aleph-step" 
     data-x="20500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 8 · Templates</span>
  </div>
  
  <h2>Crea tu propio agente</h2>
  
  <pre style="background: #111; padding: 0.8rem; border-radius: 8px; font-size: 0.8rem;">
# .github/agents/mi-agente.agent.md
---
name: MiAgente
description: "..."
tools: ['vscode', 'read']
handoffs:
  - label: Acción
    agent: MiAgente
---
  </pre>
</div>

<div id="paso8-sm" class="step showcase-step sm-step" 
     data-x="21500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 8 · Release</span>
  </div>
  
  <h2>v1.0.0-beta.1</h2>
  
  <div class="sprint-status">
    <div class="metric">
      <span class="value">6</span>
      <span class="label">Épicas</span>
    </div>
    <div class="metric">
      <span class="value">57</span>
      <span class="label">Puntos</span>
    </div>
    <div class="metric">
      <span class="value">Hoy</span>
      <span class="label">Release</span>
    </div>
  </div>
</div>

<!-- ==========================================
     PASO 9: LA RECOMPENSA
     Tema: Roadmap y Galería (DEMO)
     ========================================== -->

<div id="paso9-po" class="step showcase-step po-step" 
     data-x="24000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-paso">Cap 9: La Recompensa</span>
  </div>
  
  <h1>El mapa del tesoro</h1>
  
  <div class="showcase-content">
    <pre style="background: #111; padding: 1rem; border-radius: 8px;">
2025 ─── PRE: Bootstrap ✅
    │
2026 ─┬─ FC1: Consolidación
      ├─ FC2: Expansión  
      ├─ FC3: Comunidad
      └─ FC4: Release 1.0
    </pre>
    
    <p style="text-align: center; margin-top: 1rem;">
      <a href="/aleph-scriptorium/roadmap/" style="color: var(--bp-accent);">
        → Ver Roadmap completo
      </a>
    </p>
  </div>
</div>

<div id="paso9-ox" class="step showcase-step ox-step" 
     data-x="24000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 9 · Contribuir</span>
  </div>
  
  <h2>Cómo contribuir</h2>
  
  <pre style="background: #111; padding: 1rem; border-radius: 8px; font-size: 0.85rem;">
# 1. Fork del repositorio
# 2. Leer DEVOPS.md
# 3. Identificar épica en backlog
# 4. Implementar + tests
# 5. PR con commit conforme

# Formato:
feat(scope): descripción
  </pre>
</div>

<div id="paso9-aleph" class="step showcase-step aleph-step" 
     data-x="23500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 9 · Docs</span>
  </div>
  
  <h2>Documentación DRY</h2>
  
  <div class="value-grid">
    <div class="value-item"><span class="icon">📋</span><span class="text">AGENTS.md: Índice maestro</span></div>
    <div class="value-item"><span class="icon">🔌</span><span class="text">PLUGINS.md: Protocolo</span></div>
    <div class="value-item"><span class="icon">⚙️</span><span class="text">DEVOPS.md: Metodología</span></div>
    <div class="value-item"><span class="icon">📖</span><span class="text">Funcional/Técnico.md</span></div>
  </div>
</div>

<div id="paso9-sm" class="step showcase-step sm-step" 
     data-x="24500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 9 · Retro</span>
  </div>
  
  <h2>Retrospectiva PRE</h2>
  
  <ul class="pain-points">
    <li>✅ Documentación exhaustiva</li>
    <li>✅ Pivote rápido (47% menos esfuerzo)</li>
    <li>🔄 Mejorar: Tests automatizados</li>
    <li>🔄 Mejorar: Onboarding más simple</li>
  </ul>
</div>

<!-- ==========================================
     PASO 10: EL CAMINO DE REGRESO
     Tema: Banners/README
     ========================================== -->

<div id="paso10-po" class="step showcase-step po-step" 
     data-x="27000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">🎤 PO</span>
    <span class="showcase-paso">Cap 10: El Regreso</span>
  </div>
  
  <h1>Los estandartes</h1>
  
  <div class="solution-pillars">
    <div class="pillar">
      <span class="pillar-icon">🎵</span>
      <span class="pillar-name">VibeCoding</span>
      <span class="pillar-desc">El espíritu</span>
    </div>
    <div class="pillar">
      <span class="pillar-icon">ℵ</span>
      <span class="pillar-name">Scriptorium</span>
      <span class="pillar-desc">Las herramientas</span>
    </div>
    <div class="pillar">
      <span class="pillar-icon">📖</span>
      <span class="pillar-name">Fundación</span>
      <span class="pillar-desc">El resultado</span>
    </div>
  </div>
</div>

<div id="paso10-ox" class="step showcase-step ox-step" 
     data-x="27000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 10 · Repos</span>
  </div>
  
  <h2>Enlaces</h2>
  
  <div class="tech-stack">
    <div class="tech-layer">
      <span class="layer-name">GitHub</span>
      <span class="layer-tech">escrivivir-co/aleph-scriptorium</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">Web</span>
      <span class="layer-tech">escrivivir-co.github.io/aleph-scriptorium</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">License</span>
      <span class="layer-tech">AIPL v1.0</span>
    </div>
  </div>
</div>

<div id="paso10-aleph" class="step showcase-step aleph-step" 
     data-x="26500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 10 · Comunidad</span>
  </div>
  
  <h2>Únete</h2>
  
  <div class="value-grid">
    <div class="value-item"><span class="icon">🐛</span><span class="text">Issues en GitHub</span></div>
    <div class="value-item"><span class="icon">💬</span><span class="text">Discussions</span></div>
    <div class="value-item"><span class="icon">📝</span><span class="text">CONTRIBUTING.md</span></div>
    <div class="value-item"><span class="icon">🤝</span><span class="text">PR Template</span></div>
  </div>
</div>

<div id="paso10-sm" class="step showcase-step sm-step" 
     data-x="27500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 10 · Next</span>
  </div>
  
  <h2>Próximos pasos</h2>
  
  <div class="backlog-preview">
    <div class="epic">✅ Tag v1.0.0-beta.1</div>
    <div class="epic">🔄 Publicar GH-Pages</div>
    <div class="epic">📋 Anunciar en redes</div>
    <div class="epic">📋 Recoger feedback</div>
  </div>
</div>

<!-- ==========================================
     PASO 11: LA RESURRECCIÓN
     Tema: Fundación vacía (TWIST)
     ========================================== -->

<div id="paso11-po" class="step showcase-step po-step" 
     data-x="30000" 
     data-y="0" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role po">📎 Clippy</span>
    <span class="showcase-paso">Cap 11: La Resurrección</span>
  </div>
  
  <h1>¡No! ¡Otra vez no!</h1>
  
  <div class="showcase-content">
    <pre style="background: #111; padding: 1rem; border-radius: 8px;">
FUNDACION/
├── capitulo-01.md     [0 palabras]
├── capitulo-02.md     [0 palabras]
├── ...
└── capitulo-12.md     [0 palabras]
    </pre>
    
    <p style="text-align: center; margin-top: 1.5rem; font-size: 1.2rem;">
      <em>El horror vacui regresa...</em><br><br>
      <strong style="color: #22c55e;">Pero ahora es diferente.</strong>
    </p>
  </div>
</div>

<div id="paso11-ox" class="step showcase-step ox-step" 
     data-x="30000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 11 · Fundación</span>
  </div>
  
  <h2>12 Sprints 2026</h2>
  
  <pre style="background: #111; padding: 0.8rem; border-radius: 8px; font-size: 0.8rem;">
1. Anacronismo productivo
2. Autómata soberano
3. Problema de la escala
4. Repertorio de arquitecturas
5. Formas de vida
6. Futuros cancelados
7. Infraestructuras como actores
8. Demos sin demos
9. Ecosistemas políticos
10. Régimen material
11. El sacrificio
12. La sombra del texto
  </pre>
</div>

<div id="paso11-aleph" class="step showcase-step aleph-step" 
     data-x="29500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 11 · Arco</span>
  </div>
  
  <h2>El arco del héroe</h2>
  
  <div class="tech-stack">
    <div class="tech-layer" style="opacity: 0.5;">
      <span class="layer-name">ANTES</span>
      <span class="layer-tech">Clippy solitario</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">AHORA</span>
      <span class="layer-tech">Clippy 2.0 integrado</span>
    </div>
    <div class="tech-layer" style="opacity: 0.5;">
      <span class="layer-name">ANTES</span>
      <span class="layer-tech">Horror vacui</span>
    </div>
    <div class="tech-layer">
      <span class="layer-name">AHORA</span>
      <span class="layer-tech">Horror vacui productivo</span>
    </div>
  </div>
</div>

<div id="paso11-sm" class="step showcase-step sm-step" 
     data-x="30500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 11 · Plan</span>
  </div>
  
  <h2>Plan Fundación</h2>
  
  <div class="sprint-status">
    <div class="metric">
      <span class="value">12</span>
      <span class="label">Sprints</span>
    </div>
    <div class="metric">
      <span class="value">48</span>
      <span class="label">Iteraciones</span>
    </div>
    <div class="metric">
      <span class="value">1/mes</span>
      <span class="label">Capítulo</span>
    </div>
  </div>
</div>

<!-- ==========================================
     PASO 12: REGRESO CON EL ELIXIR
     Tema: La Girándula (LOOP FINAL)
     ========================================== -->

<div id="paso12-po" class="step showcase-step po-step" 
     data-x="33000" 
     data-y="0" 
     data-z="0"
     data-scale="1.3">
  <div class="showcase-header">
    <span class="showcase-role po">📎 Clippy 2.0</span>
    <span class="showcase-paso">Cap 12: El Elixir</span>
  </div>
  
  <h1 style="font-size: 2.5rem;">
    "Parece que estás padeciendo<br>
    un episodio de <em>horror vacui</em>..."
  </h1>
  
  <p style="font-size: 1.4rem; margin-top: 1.5rem; color: #22c55e;">
    "¿Quieres que arranque una <strong>girándula de estímulos</strong><br>
    de lo más pizguetos?"
  </p>
  
  <div class="demo-command" style="background: #111; padding: 1rem; border-radius: 12px; margin-top: 2rem;">
    <code style="font-size: 1.1rem; color: #22c55e;">
      🐂 Ox: alephscript.demo.runAll 🚀
    </code>
  </div>
</div>

<div id="paso12-ox" class="step showcase-step ox-step" 
     data-x="33000" 
     data-y="-800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role ox">🐂 Ox</span>
    <span class="showcase-context">Cap 12 · Stack Final</span>
  </div>
  
  <h2>Lo que demostramos</h2>
  
  <div class="tech-stack">
    <div class="tech-layer"><span class="layer-name">IDE</span><span class="layer-tech">VS Code + Copilot Chat</span></div>
    <div class="tech-layer"><span class="layer-name">MCP</span><span class="layer-tech">5 servidores activos</span></div>
    <div class="tech-layer"><span class="layer-name">Web</span><span class="layer-tech">Jekyll + impress.js</span></div>
    <div class="tech-layer"><span class="layer-name">Auto</span><span class="layer-tech">Playwright</span></div>
  </div>
</div>

<div id="paso12-aleph" class="step showcase-step aleph-step" 
     data-x="32500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role aleph">ℵ Aleph</span>
    <span class="showcase-context">Cap 12 · CTA</span>
  </div>
  
  <h2>Únete ahora</h2>
  
  <div class="value-grid">
    <div class="value-item"><span class="icon">⭐</span><span class="text">Star en GitHub</span></div>
    <div class="value-item"><span class="icon">🍴</span><span class="text">Fork y explora</span></div>
    <div class="value-item"><span class="icon">📖</span><span class="text">Lee DEVOPS.md</span></div>
    <div class="value-item"><span class="icon">🤖</span><span class="text">Crea tu agente</span></div>
  </div>
</div>

<div id="paso12-sm" class="step showcase-step sm-step" 
     data-x="33500" 
     data-y="800" 
     data-z="0">
  <div class="showcase-header">
    <span class="showcase-role sm">📋 Scrum Master</span>
    <span class="showcase-context">Cap 12 · Release</span>
  </div>
  
  <h2>v1.0.0-beta.1</h2>
  
  <div class="sprint-status">
    <div class="metric">
      <span class="value">31+</span>
      <span class="label">Agentes</span>
    </div>
    <div class="metric">
      <span class="value">19</span>
      <span class="label">Plugins</span>
    </div>
    <div class="metric">
      <span class="value">16</span>
      <span class="label">Submódulos</span>
    </div>
  </div>
</div>

<!-- ==========================================
     CIERRE / FOTO DE FAMILIA
     ========================================== -->

<div id="cierre" class="step showcase-step" 
     data-x="36000" 
     data-y="0" 
     data-z="0"
     data-scale="1.5">
  <div style="text-align: center;">
    <h1 style="font-size: 3rem; margin-bottom: 2rem;">
      🎭 Foto de Familia 🎭
    </h1>
    
    <div style="font-size: 4rem; margin: 2rem 0;">
      📎
    </div>
    
    <div style="font-size: 2.5rem; margin: 1rem 0;">
      🐂 ℵ 🎤 🖥️ 📚
    </div>
    
    <p style="font-size: 1.5rem; margin-top: 2rem; color: var(--bp-muted);">
      "Comienza una nueva época en la escritura digital."
    </p>
    <p style="font-size: 1.8rem; color: #22c55e;">
      <strong>Ahora, en red.</strong>
    </p>
    
    <div style="margin-top: 3rem; font-size: 1.2rem;">
      <code>escrivivir-co.github.io/aleph-scriptorium</code>
    </div>
  </div>
</div>

<!-- ==========================================
     OVERVIEW
     ========================================== -->
<div id="overview" class="step" 
     data-x="16500" 
     data-y="0" 
     data-z="4000"
     data-scale="7">
</div>
