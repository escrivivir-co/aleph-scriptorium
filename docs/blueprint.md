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
  
  <p class="tagline">Un procesador de textos aumentado: tú mandas, los agentes producen.</p>
  
  <div class="metrics-small">
    <span>19 plugins</span> · <span>31 agentes</span> · <span>15 submódulos</span>
  </div>
  
  <div class="categories-cloud">
    <span class="category-tag cat-produce">📝 Escribir</span>
    <span class="category-tag cat-audit">🔍 Auditar</span>
    <span class="category-tag cat-publish">🌐 Publicar</span>
    <span class="category-tag cat-scrape">🕷️ Recopilar</span>
    <span class="category-tag cat-design">🎨 Diseñar flujos</span>
    <span class="category-tag cat-teatro">🎭 Teatro transmedia</span>
    <span class="category-tag cat-scrum">📋 Gestión ágil</span>
    <span class="category-tag cat-ontology">🧬 Ontologías</span>
  </div>
</div>

<!-- ==========================================
     SLIDE 2: CORE (Centro - Núcleo del sistema)
     ========================================== -->
<div id="core" class="step" 
     data-x="0" 
     data-y="0" 
     data-z="0">
  <h1>// Núcleo del Sistema</h1>
  <p>Scriptorium es una <strong>aplicación de escritorio</strong> construida sobre VS Code + GitHub Copilot Chat. El kernel agéntico (CLI Scriptorium) orquesta plugins, agentes y datos.</p>
  
  <div class="architecture-diagram">
    <div class="arch-layer user-layer">
      <div class="arch-label">👤 Usuario</div>
      <div class="arch-item">VS Code + Copilot Chat</div>
    </div>
    <div class="arch-arrow">↓</div>
    <div class="arch-layer kernel-layer">
      <div class="arch-label">⚙️ Kernel Agéntico</div>
      <div class="arch-items-row">
        <div class="arch-item kernel">CLI Scriptorium</div>
      </div>
      <div class="arch-subitems">
        <span>agent-runtime</span>
        <span>menu-renderer</span>
        <span>sync-engine</span>
      </div>
    </div>
    <div class="arch-arrow">↓</div>
    <div class="arch-layer resources-layer">
      <div class="arch-label">📦 Recursos</div>
      <div class="arch-items-row">
        <div class="arch-item">Agentes <small>(handsoff)</small></div>
        <div class="arch-item">Instrucciones <small>(applyTo)</small></div>
        <div class="arch-item">Prompts <small>(typed)</small></div>
		<div class="arch-item">MCP Gallery<small>(tools+resources)</small></div>
      </div>
    </div>
    <div class="arch-arrow">↓</div>
    <div class="arch-layer data-layer">
      <div class="arch-label">💾 Datos</div>
      <div class="arch-items-row">
        <div class="arch-item">ARCHIVO <small>(sistema)</small></div>
        <div class="arch-item">PROYECTOS <small>(conectadas)</small></div>
        <div class="arch-item">DISCOS <small>(plug&play)</small></div>
      </div>
    </div>
  </div>
  
  <p class="arch-note">→ Extensión sobre el IDE: escribes en Markdown, los agentes auditan y producen.</p>
</div>

<!-- ==========================================
     SLIDE 3: ONTOLOGY (Taxonomía de agentes)
     ========================================== -->
<div id="ontology" class="step" 
     data-x="-1500" 
     data-y="0" 
     data-z="0"
     data-rotate-y="15">
  <h1>// Taxonomía de Agentes</h1>
  <p>31 agentes organizados en 5 capas funcionales. Cada rama especializa una capacidad.</p>
  
  <div class="taxonomy-tree">
    <div class="tree-root">
      <span class="tree-node root">@ox <small>(Oráculo)</small></span>
    </div>
    
    <div class="tree-branches">
      <div class="tree-branch">
        <span class="tree-node branch-ui">🟢 Producción</span>
        <div class="tree-leaves">
          <span>@aleph</span>
          <span>@revisor</span>
          <span>@periodico</span>
		  <span>@vestibulo</span>
          <span>@cartaspuerta</span>
          <span>@indice</span>
		  <span>@pluginmanager</span>
        </div>
      </div>
      
      <div class="tree-branch">
        <span class="tree-node branch-backend">🔵 Auditoría (5 Banderas)</span>
        <div class="tree-leaves">
          <span class="flag-blue">@blueflag <small>Verdad</small></span>
          <span class="flag-black">@blackflag <small>Poder</small></span>
          <span class="flag-red">@redflag <small>Viabilidad</small></span>
          <span class="flag-yellow">@yellowflag <small>Límites</small></span>
          <span class="flag-orange">@orangeflag <small>Registro</small></span>
        </div>
      </div>
      
     
      <div class="tree-branch">
        <span class="tree-node branch-plugins">🔌 Plugins (19)</span>
        <div class="tree-leaves plugins-grid">
          <span>@teatro</span>
          <span>@scrum</span>
          <span>@argboard</span>
          <span>@agentcreator</span>
          <span>@enciclopedia</span>
          <span>@ghpages</span>
          <span>@foroscraper</span>
          <span>@mcppresets</span>
          <span>@novelist</span>
          <span>@network</span>
          <span>@blocklyeditor</span>
          <span>@wireeditor</span>
          <span>@prologeditor</span>
          <span>@typedprompting</span>
          <span>@n8neditor</span>
          <span>@wiringapp</span>
          <span>@argboardapp</span>
          <span>@hypergrapheditor</span>
          <span>@floveeditor</span>
        </div>
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
  <p>Tres pipelines principales transforman datos en publicaciones coherentes.</p>
  
  <h2>📰 Flujo Periódico (5W + Banderas)</h2>
  <div class="flow-diagram compact">
    <div class="flow-node source">Fuentes<br><small>archivos, foros</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node">DISCO/<br><small>conversación Alice-Bob</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node process">5W<br><small>who/what/where/when/why</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node process">5 Banderas<br><small>auditoría</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node output">NOTICIAS/<br><small>plana final</small></div>
  </div>
  
  <h2>🎭 Flujo Teatro (12 Estadios)</h2>
  <div class="flow-diagram compact">
    <div class="flow-node source">TALLER/<br><small>personajes, obras</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node">ARG_BOARD<br><small>máquina de estados</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node process">AGENT_CREATOR<br><small>personajes IA</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node output">impress.js<br><small>navegación 3D</small></div>
  </div>
  
  <h2>📋 Flujo Scrum</h2>
  <div class="flow-diagram compact">
    <div class="flow-node source">DISCO/<br><small>borradores</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node">@scrum<br><small>planificación</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node process">Sprint<br><small>ejecución</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node output">Release<br><small>docs/ → GH-Pages</small></div>
  </div>
</div>

<!-- ==========================================
     SLIDE 4.5: MACHINE (Scriptorium como Máquina)
     ========================================== -->
<div id="machine" class="step" 
     data-x="2500" 
     data-y="800" 
     data-z="0"
     data-rotate-y="-30">
  <h1>// Scriptorium como Máquina</h1>
  <p>Modelo cibernético: sensores detectan, cerebros procesan, actuadores responden.</p>
  
  <h2>🔄 Ciclo Sensor/Actuador</h2>
  <div class="flow-diagram compact">
    <div class="flow-node source">SENSOR<br><small>@ox detecta</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node process">CEREBRO<br><small>Lucas procesa</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-node output">ACTUADOR<br><small>notifica elenco</small></div>
  </div>
  
  <div class="machine-details">
    <div class="machine-component">
      <h3>🔵 Aferencia</h3>
      <p><code>recibir_senal/2</code></p>
      <small>scriptorium/sensor/{agente}</small>
    </div>
    <div class="machine-component">
      <h3>🧠 Procesamiento</h3>
      <p><code>procesar_cambio/2</code></p>
      <small>verificar_coherencia_antes/0</small>
    </div>
    <div class="machine-component">
      <h3>🟢 Eferencia</h3>
      <p><code>notificar/2</code></p>
      <small>scriptorium/notificacion/{personaje}</small>
    </div>
  </div>
  
  <h2>📋 Especificaciones</h2>
  <div class="specs-list">
    <span class="spec-tag">AsyncAPI 3.0</span>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/dramaturgo-signals.asyncapi.yaml">dramaturgo-signals.asyncapi.yaml</a>
  </div>
  <div class="specs-list">
    <span class="spec-tag">Prolog Brain</span>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl">lucas-prolog.brain.pl</a>
  </div>
  
  <p class="arch-note">→ Épica: DRAMATURGIA-MAQUINA-1.0.0</p>
</div>

<!-- ==========================================
     SLIDE 4.7: VALIDATION (Capa de Validación Lógica)
     ========================================== -->
<div id="validation" class="step" 
     data-x="-2500" 
     data-y="800" 
     data-z="0"
     data-rotate-y="30">
  <h1>// Capa de Validación Lógica</h1>
  <p>Dos motores complementarios garantizan coherencia: schemas tipados + inferencia declarativa.</p>
  
  <div class="validation-stack">
    <div class="validation-layer">
      <h2>📐 TypedPrompting</h2>
      <p>Validación bidireccional NL↔JSON para conversaciones estructuradas.</p>
      <div class="stack-details">
        <span class="port-badge">:3019 UI</span>
        <span class="port-badge">:3020 MCP</span>
        <span class="tool-count">7 tools</span>
      </div>
      <div class="flow-diagram compact">
        <div class="flow-node source">Usuario<br><small>NL input</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-node process">Schema<br><small>validate</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-node output">JSON<br><small>structured</small></div>
      </div>
    </div>
    
    <div class="validation-layer">
      <h2>🧠 PrologEditor</h2>
      <p>Lógica declarativa para inteligencias situadas en personajes Teatro.</p>
      <div class="stack-details">
        <span class="port-badge">:5001 UI</span>
        <span class="port-badge">:8000 API</span>
        <span class="port-badge">:3006 MCP</span>
        <span class="tool-count">12 tools</span>
      </div>
      <div class="flow-diagram compact">
        <div class="flow-node source">Facts<br><small>KB</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-node process">Query<br><small>Prolog</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-node output">Solutions<br><small>inference</small></div>
      </div>
    </div>
  </div>
  
  <h2>📋 Especificaciones OpenAPI/AsyncAPI</h2>
  <div class="specs-list">
    <span class="spec-tag">OpenAPI 3.0</span>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor">TypedPromptsEditor API (931 líneas)</a>
  </div>
  <div class="specs-list">
    <span class="spec-tag">OpenAPI 3.0</span>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor">PrologEditor API</a>
  </div>
  
  <p class="arch-note">→ Épicas: TYPED-MCP-1.0.0, SCRIPT-2.3.0</p>
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
  <p>19 plugins interconectados. Cada uno extiende una capacidad específica.</p>
  
  <div class="plugins-showcase">
    <div class="plugin-row">
      <div class="plugin-card" title="Teatro Interactivo - Experiencias narrativas 3D">
        <span class="plugin-icon">🎭</span>
        <span class="plugin-name">Teatro</span>
        <span class="plugin-desc">Narrativas 3D</span>
      </div>
      <div class="plugin-card" title="Scrum - Gestión ágil de backlogs">
        <span class="plugin-icon">📋</span>
        <span class="plugin-name">Scrum</span>
        <span class="plugin-desc">Gestión ágil</span>
      </div>
      <div class="plugin-card" title="ARG Board - Juegos de realidad alternativa">
        <span class="plugin-icon">🎲</span>
        <span class="plugin-name">ARG Board</span>
        <span class="plugin-desc">Juegos transmedia</span>
      </div>
      <div class="plugin-card" title="Agent Creator - Crear agentes especializados">
        <span class="plugin-icon">🤖</span>
        <span class="plugin-name">Agent Creator</span>
        <span class="plugin-desc">Crear agentes</span>
      </div>
    </div>
    
    <div class="plugin-row">
      <div class="plugin-card" title="Enciclopedia - Consulta de tomos académicos">
        <span class="plugin-icon">📚</span>
        <span class="plugin-name">Enciclopedia</span>
        <span class="plugin-desc">Tomos académicos</span>
      </div>
      <div class="plugin-card" title="GH-Pages - Publicar en GitHub Pages">
        <span class="plugin-icon">🌐</span>
        <span class="plugin-name">GH-Pages</span>
        <span class="plugin-desc">Publicación web</span>
      </div>
      <div class="plugin-card" title="Foro Scraper - Archivo de hilos y blogs">
        <span class="plugin-icon">🕷️</span>
        <span class="plugin-name">Foro Scraper</span>
        <span class="plugin-desc">Web scraping</span>
      </div>
      <div class="plugin-card" title="MCP Presets - Packs de herramientas IA">
        <span class="plugin-icon">⚡</span>
        <span class="plugin-name">MCP Presets</span>
        <span class="plugin-desc">Herramientas MCP</span>
      </div>
    </div>
    
    <div class="plugin-row">
      <div class="plugin-card" title="Novelist - Editor de narrativas con memoria">
        <span class="plugin-icon">✍️</span>
        <span class="plugin-name">Novelist</span>
        <span class="plugin-desc">Narrativas LLM</span>
      </div>
      <div class="plugin-card" title="Network - Sincronización P2P">
        <span class="plugin-icon">🔗</span>
        <span class="plugin-name">Network</span>
        <span class="plugin-desc">P2P Oasis</span>
      </div>
      <div class="plugin-card" title="Blockly Editor - Programación visual">
        <span class="plugin-icon">🧩</span>
        <span class="plugin-name">Blockly</span>
        <span class="plugin-desc">Lógica visual</span>
      </div>
      <div class="plugin-card" title="Wire Editor - Flujos Node-RED">
        <span class="plugin-icon">🔌</span>
        <span class="plugin-name">Wire Editor</span>
        <span class="plugin-desc">Flujos async</span>
      </div>
    </div>
    
    <div class="plugin-row">
      <div class="plugin-card" title="Prolog Editor - Lógica declarativa">
        <span class="plugin-icon">🧠</span>
        <span class="plugin-name">Prolog</span>
        <span class="plugin-desc">Lógica formal</span>
      </div>
      <div class="plugin-card" title="TypedPrompting - Ontologías NL↔JSON">
        <span class="plugin-icon">📐</span>
        <span class="plugin-name">Typed Prompts</span>
        <span class="plugin-desc">Validación JSON</span>
      </div>
      <div class="plugin-card" title="n8n Editor - Workflows visuales">
        <span class="plugin-icon">⚙️</span>
        <span class="plugin-name">n8n Editor</span>
        <span class="plugin-desc">Workflows</span>
      </div>
      <div class="plugin-card" title="Flove Editor - Ontologías Confluentism">
        <span class="plugin-icon">🧬</span>
        <span class="plugin-name">Flove</span>
        <span class="plugin-desc">Ontologías</span>
      </div>
    </div>
    
    <div class="plugin-row center-row">
      <div class="plugin-card" title="HyperGraph Editor - Navegación de grafos">
        <span class="plugin-icon">🕸️</span>
        <span class="plugin-name">HyperGraph</span>
        <span class="plugin-desc">Grafos nav</span>
      </div>
      <div class="plugin-card" title="Wiring App - Juegos wiki-racer">
        <span class="plugin-icon">🎮</span>
        <span class="plugin-name">Wiring App</span>
        <span class="plugin-desc">Wiki-racer</span>
      </div>
      <div class="plugin-card" title="ARG Board App - Máquina de estados ARG">
        <span class="plugin-icon">🎯</span>
        <span class="plugin-name">ARG App</span>
        <span class="plugin-desc">State machine</span>
      </div>
    </div>
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
  <p>Cuatro líneas de producción convergentes desde una única fuente de datos.</p>
  
  <div class="products-grid">
    <a href="{{ '/archivo/' | relative_url }}" class="product-card source-card">
      <div class="product-icon">📁</div>
      <h3>ARCHIVO/</h3>
      <p>Fuente de datos: marco teórico, diagnóstico, materiales de trabajo.</p>
    </a>
    
    <a href="{{ '/teatro/' | relative_url }}" class="product-card">
      <div class="product-icon">🎭</div>
      <h3>Teatro 3D</h3>
      <p>Experiencias narrativas inmersivas con 2.5D (a medio camino en tre el 2D y el 3D, :-D). Obras interactivas, personajes con IA.</p>
    </a>
    
    <a href="{{ '/periodico/' | relative_url }}" class="product-card">
      <div class="product-icon">📰</div>
      <h3>Periódico</h3>
      <p>Producción periodística con método 5W + 5 Banderas. Auditoría doctrinal integrada.</p>
    </a>
    
    <a href="{{ '/fundacion/' | relative_url }}" class="product-card">
      <div class="product-icon">📜</div>
      <h3>Fundación</h3>
      <p>Texto fundacional en 12 capítulos (2026). Usando el Scriptorium para demo.</p>
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
  <h1>// FOSS Project (Proyecto Abierto)</h1>
  <p class="tagline">Un procesador de texto donde la IA se taxonomiza ad hoc.</p>
  
  <div class="blueprint-toggle" style="margin-bottom: 1.5rem;">
    <span class="toggle-current">📐 Vista UX</span>
    <a href="{{ '/blueprint-mmco/' | relative_url }}" class="toggle-btn">🧬 Vista MMCO</a>
    <a href="{{ '/blueprint-copilot/' | relative_url }}" class="toggle-btn">🧠 Vista Copilot</a>
  </div>
  
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
    <div class="cta-links">
      <a href="{{ '/' | relative_url }}">← Volver a la landing clásica</a>
      <span class="cta-separator">·</span>
      <a href="{{ '/leeme/' | relative_url }}">Guía de inicio →</a>
    </div>
  </div>
</div>
