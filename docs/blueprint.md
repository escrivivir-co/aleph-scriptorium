---
layout: presentation
title: Aleph Scriptorium
description: Blueprint visual del sistema de producción transmedia
permalink: /blueprint/
---

<!-- ==========================================
     SLIDE 1: OVERVIEW (Vista panorámica)
     ========================================== -->
<div id="overview" class="step" 
     data-x="0" 
     data-y="0" 
     data-z="3000" 
     data-scale="5">
  <div class="hero-symbol">ℵ</div>
  <h1>Aleph Scriptorium</h1>
  <p class="subtitle">El taller de escritura donde la IA trabaja para ti, no al revés.</p>
  <p class="tagline">19 plugins · 31 agentes · Tu ejército de IA listo</p>
</div>

<!-- ==========================================
     SLIDE 2: CORE (Centro - Núcleo del sistema)
     ========================================== -->
<div id="core" class="step" 
     data-x="0" 
     data-y="0" 
     data-z="0">
  <h1>// Núcleo del Sistema</h1>
  <p>Tres componentes fundamentales orquestan la producción de coherencia.</p>
  
  <div class="core-grid">
    <div class="core-card agents">
      <h3>🤖 Agentes</h3>
      <div class="count">31</div>
      <p>12 core + 19 de plugins. Cada uno con rol especializado.</p>
    </div>
    
    <div class="core-card plugins">
      <h3>🔌 Plugins</h3>
      <div class="count">19</div>
      <p>Extensiones modulares. Instalar, activar, combinar.</p>
    </div>
    
    <div class="core-card flags">
      <h3>🚩 5 Banderas</h3>
      <div class="count">Φ</div>
      <p>Auditores de coherencia: Verdad, Sombras, Viabilidad, Límites, Registro.</p>
    </div>
  </div>
</div>

<!-- ==========================================
     SLIDE 3: ONTOLOGY (Capa ontológica)
     ========================================== -->
<div id="ontology" class="step" 
     data-x="-1500" 
     data-y="0" 
     data-z="0"
     data-rotate-y="15">
  <h1>// Arquitectura de Capas</h1>
  <p>Los agentes se organizan en 5 capas con responsabilidades claras.</p>
  
  <div class="layers-visual">
    <div class="layer-row ui">
      <span class="layer-label">🟢 UI</span>
      <div class="layer-items">
        <span class="layer-item">@aleph</span>
        <span class="layer-item">@revisor</span>
        <span class="layer-item">@periodico</span>
      </div>
    </div>
    
    <div class="layer-row backend">
      <span class="layer-label">🔵 Backend</span>
      <div class="layer-items">
        <span class="layer-item">@blueflag</span>
        <span class="layer-item">@blackflag</span>
        <span class="layer-item">@redflag</span>
        <span class="layer-item">@yellowflag</span>
        <span class="layer-item">@orangeflag</span>
      </div>
    </div>
    
    <div class="layer-row sistema">
      <span class="layer-label">⚪ Sistema</span>
      <div class="layer-items">
        <span class="layer-item">@vestibulo</span>
        <span class="layer-item">@cartaspuerta</span>
      </div>
    </div>
    
    <div class="layer-row meta">
      <span class="layer-label">⚙️ Meta</span>
      <div class="layer-items">
        <span class="layer-item">@ox</span>
        <span class="layer-item">@pluginmanager</span>
        <span class="layer-item">@indice</span>
      </div>
    </div>
    
    <div class="layer-row plugins">
      <span class="layer-label">🔌 Plugins</span>
      <div class="layer-items">
        <span class="layer-item">@teatro</span>
        <span class="layer-item">@scrum</span>
        <span class="layer-item">@agentcreator</span>
        <span class="layer-item">+16 más</span>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================
     SLIDE 4: DYNAMICS (Flujos de producción)
     ========================================== -->
<div id="dynamics" class="step" 
     data-x="1500" 
     data-y="0" 
     data-z="0"
     data-rotate-y="-15">
  <h1>// Flujos de Producción</h1>
  <p>El conocimiento fluye desde el ARCHIVO hacia publicaciones coherentes.</p>
  
  <div class="flow-diagram">
    <div class="flow-node source">
      <strong>ARCHIVO/</strong><br>
      <small>marco · diagnóstico · DISCO</small>
    </div>
    <span class="flow-arrow">→</span>
    <div class="flow-node process">
      <strong>AGENTES</strong><br>
      <small>redacción · auditoría</small>
    </div>
    <span class="flow-arrow">→</span>
    <div class="flow-node process">
      <strong>5 BANDERAS</strong><br>
      <small>coherencia Φ</small>
    </div>
    <span class="flow-arrow">→</span>
    <div class="flow-node output">
      <strong>PUBLICACIÓN</strong><br>
      <small>docs/ → GH-Pages</small>
    </div>
  </div>
  
  <h2>Ciclo Scrum</h2>
  <div class="flow-diagram">
    <div class="flow-node">DISCO/<br><small>borradores</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node">@scrum<br><small>planificación</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node">Sprint<br><small>ejecución</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node">Release<br><small>publicación</small></div>
  </div>
</div>

<!-- ==========================================
     SLIDE 5: HYPERGRAPH (Grafo de plugins)
     ========================================== -->
<div id="hypergraph" class="step" 
     data-x="0" 
     data-y="1500" 
     data-z="0"
     data-rotate-x="-15">
  <h1>// Ecosistema de Plugins</h1>
  <p>Red interconectada de capacidades. Cada nodo es un plugin activable.</p>
  
  <div class="hypergraph-container">
    <!-- Centro: Scriptorium -->
    <div class="hypergraph-node center" title="Aleph Scriptorium">ℵ</div>
    
    <!-- Plugins principales en órbita -->
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="Teatro">🎭</div>
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="Scrum">📋</div>
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="ARG Board">🎲</div>
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="Enciclopedia">📚</div>
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="Agent Creator">🤖</div>
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="GH-Pages">🌐</div>
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="Foro Scraper">🔍</div>
    <div class="hypergraph-node" data-href="{{ '/ecosistema/' | relative_url }}" title="MCP Presets">⚡</div>
  </div>
</div>

<!-- ==========================================
     SLIDE 6: PRODUCTS (Productos transmedia)
     ========================================== -->
<div id="products" class="step" 
     data-x="0" 
     data-y="-1500" 
     data-z="0"
     data-rotate-x="15">
  <h1>// Productos Transmedia</h1>
  <p>Tres líneas de producción convergentes.</p>
  
  <div class="products-grid">
    <a href="{{ '/teatro/' | relative_url }}" class="product-card">
      <div class="product-icon">🎭</div>
      <h3>Teatro 3D</h3>
      <p>Experiencias narrativas inmersivas con impress.js. Obras interactivas, personajes con IA.</p>
    </a>
    
    <a href="{{ '/periodico/' | relative_url }}" class="product-card">
      <div class="product-icon">📰</div>
      <h3>Periódico</h3>
      <p>Producción periodística con método 5W + 5 Banderas. Auditoría doctrinal integrada.</p>
    </a>
    
    <a href="{{ '/fundacion/' | relative_url }}" class="product-card">
      <div class="product-icon">📜</div>
      <h3>Fundación</h3>
      <p>Texto fundacional en 12 capítulos (2026). La razón de ser del proyecto.</p>
    </a>
  </div>
</div>

<!-- ==========================================
     SLIDE 7: CTA (Call to Action)
     ========================================== -->
<div id="cta" class="step" 
     data-x="0" 
     data-y="0" 
     data-z="-1500"
     data-rotate-z="5">
  <h1>// Únete al Experimento</h1>
  <p class="tagline">Un procesador de texto donde la IA no te interrumpe, sino que produce.</p>
  
  <div class="cta-container">
    <div class="cta-buttons">
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/fork" class="cta-btn primary">🍴 Fork</a>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/issues" class="cta-btn secondary">📋 Issues</a>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/CONTRIBUTING.md" class="cta-btn secondary">📖 Contribuir</a>
    </div>
    
    <div class="cta-code">
      <span class="prompt">$</span> git clone https://github.com/escrivivir-co/aleph-scriptorium.git<br>
      <span class="prompt">$</span> cd aleph-scriptorium && code .<br>
      <span class="prompt">$</span> # En Copilot Chat: @aleph hola
    </div>
    
    <p style="margin-top: 2rem;">
      <a href="{{ '/' | relative_url }}">← Volver a la landing clásica</a> · 
      <a href="{{ '/leeme/' | relative_url }}">Guía de inicio →</a>
    </p>
  </div>
</div>
