---
layout: default
title: Ecosistema
description: "De la infraestructura a la interfaz: submódulos, plugins y agentes de Aleph Scriptorium"
permalink: /ecosistema/
---

<style>
/* ═══════════════════════════════════════════════════════════════════
   ECOSISTEMA PAGE - ESTILOS
   Diseño dark para el ecosistema completo
   ═══════════════════════════════════════════════════════════════════ */

.ecosistema-page {
  --page-bg: #0d1117;
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(255, 255, 255, 0.08);
  --text-primary: #e6edf3;
  --text-muted: rgba(255, 255, 255, 0.6);
  --accent-cyan: #00d4ff;
  --accent-green: #00c853;
  --accent-blue: #2196f3;
  --accent-red: #f44336;
  --accent-yellow: #ffc107;
  --accent-orange: #ff9800;
  --accent-purple: #9c27b0;
  --accent-gray: #9e9e9e;
  --accent-infrastructure: #6366f1;
  
  background: var(--page-bg);
  color: var(--text-primary);
  margin: calc(-1 * var(--space-lg, 2rem));
  padding: var(--space-lg, 2rem);
  min-height: 100vh;
}

/* Hero Section */
.eco-hero {
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.eco-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 50%);
  animation: pulse-bg 8s ease-in-out infinite;
}

@keyframes pulse-bg {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #fff 0%, var(--accent-infrastructure) 50%, var(--accent-purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
  border: none;
  padding: 0;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* Flow Diagram */
.eco-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
}

.eco-flow-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.eco-flow-item:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
}

.eco-flow-item.submodules { border-color: var(--accent-infrastructure); }
.eco-flow-item.plugins { border-color: var(--accent-purple); }
.eco-flow-item.agentes { border-color: var(--accent-cyan); }
.eco-flow-item.usuario { border-color: var(--accent-green); }

.eco-flow-count {
  font-size: 1.5rem;
  font-weight: bold;
}

.eco-flow-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.eco-flow-arrow {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
}

/* Section Headers */
.eco-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.section-icon.infra { background: rgba(99, 102, 241, 0.2); }
.section-icon.plugins { background: rgba(156, 39, 176, 0.2); }
.section-icon.agentes { background: rgba(0, 212, 255, 0.2); }
.section-icon.guia { background: rgba(0, 200, 83, 0.2); }

.section-title {
  font-size: 1.5rem;
  margin: 0;
  border: none;
  padding: 0;
}

.section-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-left: auto;
}

/* Grid de Cards */
.eco-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.eco-grid-compact {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

/* Card Base */
.eco-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.eco-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--card-accent, var(--accent-cyan));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.eco-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.eco-card:hover::before {
  transform: scaleX(1);
}

/* Card Types */
.eco-card.submodule { --card-accent: var(--accent-infrastructure); }
.eco-card.plugin { --card-accent: var(--accent-purple); }
.eco-card.plugin-draft { 
  --card-accent: rgba(156, 39, 176, 0.5);
  opacity: 0.7;
  border-style: dashed;
}
.eco-card.agente-ui { --card-accent: var(--accent-green); }
.eco-card.agente-blue { --card-accent: var(--accent-blue); }
.eco-card.agente-black { --card-accent: #607d8b; }
.eco-card.agente-red { --card-accent: var(--accent-red); }
.eco-card.agente-yellow { --card-accent: var(--accent-yellow); }
.eco-card.agente-orange { --card-accent: var(--accent-orange); }
.eco-card.agente-sistema { --card-accent: var(--accent-gray); }
.eco-card.agente-meta { --card-accent: var(--accent-cyan); }
.eco-card.agente-bridge { --card-accent: var(--accent-purple); }

.eco-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.eco-card-icon {
  font-size: 1.5rem;
}

.eco-card-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
}

.eco-card-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: auto;
}

.eco-card-badge.runtime {
  background: rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
}

.eco-card-badge.agents {
  background: rgba(156, 39, 176, 0.3);
  color: #ce93d8;
}

.eco-card-badge.draft {
  background: rgba(255, 152, 0, 0.3);
  color: #ffcc80;
}

.eco-card-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 0 0 0.75rem 0;
}

.eco-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.eco-card-tag {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
}

.eco-card-handoff {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(0, 200, 83, 0.15);
  color: #81c784;
  font-family: monospace;
}

/* Subsections */
.eco-subsection {
  margin-bottom: 2rem;
}

.eco-subsection-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-muted);
  border: none;
  padding: 0;
}

/* Agentes Layer */
.agentes-layer {
  margin-bottom: 2rem;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

.layer-icon {
  font-size: 1.2rem;
}

.layer-title {
  font-size: 1rem;
  margin: 0;
  border: none;
  padding: 0;
  font-weight: 600;
}

.layer-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-left: auto;
}

/* Guía de Interacción */
.guia-section {
  background: rgba(0, 200, 83, 0.05);
  border: 1px solid rgba(0, 200, 83, 0.1);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
}

.guia-diagram {
  text-align: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.8;
}

.guia-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.guia-table th,
.guia-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.guia-table th {
  color: var(--accent-green);
  font-weight: 600;
}

.guia-table code {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.guia-example {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.85rem;
  overflow-x: auto;
}

.guia-example .prompt {
  color: var(--accent-green);
}

.guia-example .agent {
  color: var(--accent-cyan);
}

.guia-example .comment {
  color: var(--text-muted);
}

/* Footer CTA */
.eco-cta {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(99, 102, 241, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.eco-cta h3 {
  margin-bottom: 1rem;
  border: none;
  padding: 0;
}

.eco-cta p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.eco-cta a.cta-button {
  display: inline-block;
  background: var(--accent-infrastructure);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.eco-cta a.cta-button:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .eco-flow {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .eco-flow-arrow {
    transform: rotate(90deg);
  }
  
  .section-header {
    flex-wrap: wrap;
  }
  
  .section-desc {
    width: 100%;
    margin-left: 0;
    margin-top: 0.5rem;
  }
  
  .guia-table {
    font-size: 0.8rem;
  }
  
  .guia-table th,
  .guia-table td {
    padding: 0.5rem;
  }
}
</style>

<div class="ecosistema-page">

<!-- ═══════════════════════════════════════════════════════════════════
     HERO SECTION
     ═══════════════════════════════════════════════════════════════════ -->

<div class="eco-hero">
  <h1 class="hero-title">🧬 El Ecosistema Aleph</h1>
  <p class="hero-subtitle">
    De la infraestructura a la interfaz: <strong>14 submódulos</strong> alimentan <strong>19 plugins</strong> que empoderan <strong>31 agentes</strong> para trabajar contigo.
  </p>
  
  <div class="eco-flow">
    <div class="eco-flow-item submodules">
      <span class="eco-flow-count">14</span>
      <span class="eco-flow-label">Submódulos</span>
    </div>
    <span class="eco-flow-arrow">→</span>
    <div class="eco-flow-item plugins">
      <span class="eco-flow-count">19</span>
      <span class="eco-flow-label">Plugins</span>
    </div>
    <span class="eco-flow-arrow">→</span>
    <div class="eco-flow-item agentes">
      <span class="eco-flow-count">31</span>
      <span class="eco-flow-label">Agentes</span>
    </div>
    <span class="eco-flow-arrow">→</span>
    <div class="eco-flow-item usuario">
      <span class="eco-flow-count">Tú</span>
      <span class="eco-flow-label">Usuario</span>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════════
     SUBMÓDULOS (14)
     ═══════════════════════════════════════════════════════════════════ -->

<section class="eco-section">
  <div class="section-header">
    <div class="section-icon infra">📦</div>
    <h2 class="section-title">Infraestructura — 14 Submódulos</h2>
    <span class="section-desc">Repositorios externos integrados</span>
  </div>
  
  <div class="eco-grid-compact">
    <!-- vscode-extension -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🧩</span>
        <h3 class="eco-card-title">VS Code Extension</h3>
        <span class="eco-card-badge runtime">TypeScript</span>
      </div>
      <p class="eco-card-desc">Extensión oficial para VS Code. TreeViews de agentes, plugins y backlogs. ChatParticipants.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">vscode-alephscript-extension</span>
      </div>
    </div>
    
    <!-- mcp-presets-site -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">⚡</span>
        <h3 class="eco-card-title">MCP Zeus</h3>
        <span class="eco-card-badge runtime">Next.js</span>
      </div>
      <p class="eco-card-desc">Gestor visual de presets MCP. Puerto 3012. Catálogo de toolkits.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">alephscript-mcp-presets-site</span>
      </div>
    </div>
    
    <!-- as-utils-sdk -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🎭</span>
        <h3 class="eco-card-title">AS-Utils SDK</h3>
        <span class="eco-card-badge runtime">Node.js</span>
      </div>
      <p class="eco-card-desc">VibeCoding Connector. Teatro Matrix en tiempo real. Maestro de Ceremonias.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">as-utils-sdk</span>
      </div>
    </div>
    
    <!-- as-gym -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🧠</span>
        <h3 class="eco-card-title">AS-Gym</h3>
        <span class="eco-card-badge runtime">TypeScript</span>
      </div>
      <p class="eco-card-desc">Almas para agentes. 10 paradigmas de IA: lógica, conexionista, simbólica, SBR, SBC.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">as-gym</span>
      </div>
    </div>
    
    <!-- blockly-sdk -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🧱</span>
        <h3 class="eco-card-title">Blockly SDK</h3>
        <span class="eco-card-badge runtime">Angular</span>
      </div>
      <p class="eco-card-desc">Editor visual de lógica con bloques. Genera código JavaScript para personajes.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">blockly-alephscript-sdk</span>
      </div>
    </div>
    
    <!-- iot-sbr -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🔬</span>
        <h3 class="eco-card-title">Motor Prolog</h3>
        <span class="eco-card-badge runtime">SWI-Prolog</span>
      </div>
      <p class="eco-card-desc">Lógica declarativa para bots. Templates IoT, máquinas de estado, simulación.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">iot-sbr-logica-para-bots</span>
      </div>
    </div>
    
    <!-- node-red-sdk -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🔴</span>
        <h3 class="eco-card-title">Node-RED SDK</h3>
        <span class="eco-card-badge runtime">Node-RED</span>
      </div>
      <p class="eco-card-desc">13 nodos personalizados: bot, channel, format, orchestration, dashboard.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">node-red-alephscript-sdk</span>
      </div>
    </div>
    
    <!-- n8n-editor -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">⚙️</span>
        <h3 class="eco-card-title">N8N Editor</h3>
        <span class="eco-card-badge runtime">Angular 18</span>
      </div>
      <p class="eco-card-desc">Editor visual de workflows. Canvas D3.js, Monaco editor. Exporta a n8n.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">alephscript-n8n-like-editor</span>
      </div>
    </div>
    
    <!-- network-sdk -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🌐</span>
        <h3 class="eco-card-title">Network SDK</h3>
        <span class="eco-card-badge runtime">Docker</span>
      </div>
      <p class="eco-card-desc">Red P2P Oasis/Scuttlebutt. Sincronización de BOEs entre Scriptoriums.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">alephscript-network-sdk</span>
      </div>
    </div>
    
    <!-- typed-prompting -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">📝</span>
        <h3 class="eco-card-title">Typed Prompting</h3>
        <span class="eco-card-badge runtime">Vite</span>
      </div>
      <p class="eco-card-desc">Ontologías NL↔JSON. Validación AJV/Zod. Editor web en puerto 5000.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">alephscript-typed-prompting</span>
      </div>
    </div>
    
    <!-- mcp-novelist -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">📖</span>
        <h3 class="eco-card-title">MCP Novelist</h3>
        <span class="eco-card-badge runtime">Node.js</span>
      </div>
      <p class="eco-card-desc">Servidor MCP para narrativas. Memoria a largo plazo. Puerto 3066.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">mcp-novelist</span>
      </div>
    </div>
    
    <!-- wiki-racer -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🏎️</span>
        <h3 class="eco-card-title">Wiki Racer</h3>
        <span class="eco-card-badge runtime">TypeScript</span>
      </div>
      <p class="eco-card-desc">Navegación de grafos hipervinculados. IGraphSource abstracto. Preset MediaWiki.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">wiki-racer</span>
      </div>
    </div>
    
    <!-- kick-bot -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">🤖</span>
        <h3 class="eco-card-title">Kick Bot</h3>
        <span class="eco-card-badge runtime">Node.js</span>
      </div>
      <p class="eco-card-desc">Bot para plataforma Kick. Comandos, moderación, integración con Scriptorium.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">kick-aleph-bot</span>
      </div>
    </div>
    
    <!-- kick-crono -->
    <div class="eco-card submodule">
      <div class="eco-card-header">
        <span class="eco-card-icon">⏰</span>
        <h3 class="eco-card-title">Kick Crono</h3>
        <span class="eco-card-badge runtime">Node.js</span>
      </div>
      <p class="eco-card-desc">Bot cronológico para Kick. Tareas programadas, recordatorios, automatización.</p>
      <div class="eco-card-meta">
        <span class="eco-card-tag">kick-aleph-crono-bot</span>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     PLUGINS (18)
     ═══════════════════════════════════════════════════════════════════ -->

<section class="eco-section">
  <div class="section-header">
    <div class="section-icon plugins">🔌</div>
    <h2 class="section-title">Plugins — 18 Extensiones</h2>
    <span class="section-desc">Capacidades modulares</span>
  </div>
  
  <!-- Plugins Operativos (8) -->
  <div class="eco-subsection">
    <h3 class="eco-subsection-title">✅ Operativos (8)</h3>
    <div class="eco-grid">
      <!-- ARG Board -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">🎲</span>
          <h3 class="eco-card-title">ARG Board</h3>
          <span class="eco-card-badge agents">8 agentes</span>
        </div>
        <p class="eco-card-desc">Motor transmedia para narrativas interactivas. BOE, obras, actores, decoherencia.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_argboard</span>
          <span class="eco-card-tag">Arrakis</span>
          <span class="eco-card-tag">BOE</span>
        </div>
      </div>
      
      <!-- Enciclopedia -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">📚</span>
          <h3 class="eco-card-title">Enciclopedia</h3>
          <span class="eco-card-badge agents">2 agentes</span>
        </div>
        <p class="eco-card-desc">Biblioteca de tomos. Historia de la Filosofía (61 caps). Búsqueda temporal/temática.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_enciclopedia</span>
          <span class="eco-card-tag">Bibliotecario</span>
        </div>
      </div>
      
      <!-- GH-Pages -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">🌐</span>
          <h3 class="eco-card-title">GH-Pages</h3>
          <span class="eco-card-badge agents">1 agente</span>
        </div>
        <p class="eco-card-desc">Publicación en GitHub Pages. Modos fusionar y reemplazar. Gestiona docs/.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_ghpages</span>
          <span class="eco-card-tag">Publicar</span>
        </div>
      </div>
      
      <!-- Foro Scraper -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">🕷️</span>
          <h3 class="eco-card-title">Foro Scraper</h3>
          <span class="eco-card-badge agents">1 agente</span>
        </div>
        <p class="eco-card-desc">Scraping de foros y blogs. Pausable/reanudable. vBulletin, phpBB, WordPress.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_foroscraper</span>
          <span class="eco-card-tag">MCP Playwright</span>
        </div>
      </div>
      
      <!-- Agent Creator -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">🧬</span>
          <h3 class="eco-card-title">Agent Creator</h3>
          <span class="eco-card-badge agents">1 agente</span>
        </div>
        <p class="eco-card-desc">Fábrica de agentes especializados. Fusiona bases + fuentes. Despliega en ARG.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_agentcreator</span>
          <span class="eco-card-tag">Recipes</span>
        </div>
      </div>
      
      <!-- Teatro -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">🎭</span>
          <h3 class="eco-card-title">Teatro</h3>
          <span class="eco-card-badge agents">1 agente</span>
        </div>
        <p class="eco-card-desc">Experiencias transmedia 3D con impress.js. Cartelera, obras, monomito de 12 etapas.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_teatro</span>
          <span class="eco-card-tag">impress.js</span>
        </div>
      </div>
      
      <!-- Scrum -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">📋</span>
          <h3 class="eco-card-title">Scrum</h3>
          <span class="eco-card-badge agents">1 agente</span>
        </div>
        <p class="eco-card-desc">Gestión ágil de backlogs. 5 fases: Planificar, Borrador, Aprobar, Tracking, Cerrar.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_scrum</span>
          <span class="eco-card-tag">DISCO</span>
        </div>
      </div>
      
      <!-- MCP-Presets -->
      <div class="eco-card plugin">
        <div class="eco-card-header">
          <span class="eco-card-icon">⚡</span>
          <h3 class="eco-card-title">MCP-Presets</h3>
          <span class="eco-card-badge agents">1 agente</span>
        </div>
        <p class="eco-card-desc">Gestión de toolkits MCP. Importar, exportar, asignar presets a agentes.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_mcppresets</span>
          <span class="eco-card-tag">Zeus</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Plugins Borrador (10) -->
  <div class="eco-subsection">
    <h3 class="eco-subsection-title">🚧 En Desarrollo (10)</h3>
    <div class="eco-grid-compact">
      <!-- Network -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">🌐</span>
          <h3 class="eco-card-title">Network</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Sincronización P2P de BOEs via Oasis/Scuttlebutt.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_network</span>
        </div>
      </div>
      
      <!-- Novelist -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">📖</span>
          <h3 class="eco-card-title">Novelist</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Edición de narrativas con memoria MCP.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_novelist</span>
        </div>
      </div>
      
      <!-- Blockly Editor -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">🧱</span>
          <h3 class="eco-card-title">Blockly Editor</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Lógica visual para personajes.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_blocklyeditor</span>
        </div>
      </div>
      
      <!-- Wire Editor -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">🔴</span>
          <h3 class="eco-card-title">Wire Editor</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Diseñador de flujos Node-RED.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_wireeditor</span>
        </div>
      </div>
      
      <!-- Prolog Editor -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">🔬</span>
          <h3 class="eco-card-title">Prolog Editor</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Lógica declarativa SWI-Prolog.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_prologeditor</span>
        </div>
      </div>
      
      <!-- Typed Prompting -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">📝</span>
          <h3 class="eco-card-title">Typed Prompting</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Ontologías NL↔JSON validadas.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_typedprompting</span>
        </div>
      </div>
      
      <!-- N8N Editor -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">⚙️</span>
          <h3 class="eco-card-title">N8N Editor</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Editor visual de workflows.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_n8neditor</span>
        </div>
      </div>
      
      <!-- Wiring App -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">🔧</span>
          <h3 class="eco-card-title">Wiring App</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Flows Node-RED estilo wiki-racer.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_wiringapp</span>
        </div>
      </div>
      
      <!-- ARG Board App -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">🎮</span>
          <h3 class="eco-card-title">ARG Board App</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Máquina de estados wiki-racer.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_argboardapp</span>
        </div>
      </div>
      
      <!-- HyperGraph Editor -->
      <div class="eco-card plugin-draft">
        <div class="eco-card-header">
          <span class="eco-card-icon">🕸️</span>
          <h3 class="eco-card-title">HyperGraph Editor</h3>
          <span class="eco-card-badge draft">Draft</span>
        </div>
        <p class="eco-card-desc">Navegador de grafos hipervinculados.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">@plugin_ox_hypergrapheditor</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     AGENTES (36)
     ═══════════════════════════════════════════════════════════════════ -->

<section class="eco-section">
  <div class="section-header">
    <div class="section-icon agentes">🐂</div>
    <h2 class="section-title">Agentes — 36 Especialistas</h2>
    <span class="section-desc">Tu ejército de IA</span>
  </div>
  
  <!-- Capa UI -->
  <div class="agentes-layer">
    <div class="layer-header">
      <span class="layer-icon">🟢</span>
      <h3 class="layer-title">UI — Producción</h3>
      <span class="layer-count">3 agentes</span>
    </div>
    <div class="eco-grid-compact">
      <div class="eco-card agente-ui">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@aleph</h3>
        </div>
        <p class="eco-card-desc">Escriba principal. Planifica, redacta y coordina el texto fundacional.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">Productor</span>
        </div>
      </div>
      <div class="eco-card agente-ui">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@revisor</h3>
        </div>
        <p class="eco-card-desc">Control de calidad. Verifica coherencia con ARCHIVO y estilo.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">Auditor</span>
        </div>
      </div>
      <div class="eco-card agente-ui">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@periodico</h3>
        </div>
        <p class="eco-card-desc">Redactor de noticias. Método 5W + banderas de auditoría.</p>
        <div class="eco-card-meta">
          <span class="eco-card-handoff">Periodista</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Capa Backend -->
  <div class="agentes-layer">
    <div class="layer-header">
      <span class="layer-icon">🏴</span>
      <h3 class="layer-title">Backend — Las 5 Banderas</h3>
      <span class="layer-count">5 agentes</span>
    </div>
    <div class="eco-grid-compact">
      <div class="eco-card agente-blue">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@blueflag</h3>
        </div>
        <p class="eco-card-desc">Verdad y evidencia. Verifica afirmaciones, cruza fuentes.</p>
      </div>
      <div class="eco-card agente-black">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@blackflag</h3>
        </div>
        <p class="eco-card-desc">Sombras y poder. Identifica captura, coste represivo.</p>
      </div>
      <div class="eco-card agente-red">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@redflag</h3>
        </div>
        <p class="eco-card-desc">Escala y estructura. Evalúa viabilidad, enforcement.</p>
      </div>
      <div class="eco-card agente-yellow">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@yellowflag</h3>
        </div>
        <p class="eco-card-desc">Límites y demarcación. Distingue condiciones de contenido.</p>
      </div>
      <div class="eco-card agente-orange">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@orangeflag</h3>
        </div>
        <p class="eco-card-desc">Registro y retórica. Evalúa dialéctica, auditorio, estilo.</p>
      </div>
    </div>
  </div>
  
  <!-- Capa Sistema -->
  <div class="agentes-layer">
    <div class="layer-header">
      <span class="layer-icon">⚪</span>
      <h3 class="layer-title">Sistema — Navegación</h3>
      <span class="layer-count">2 agentes</span>
    </div>
    <div class="eco-grid-compact">
      <div class="eco-card agente-sistema">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@vestibulo</h3>
        </div>
        <p class="eco-card-desc">Recepción. Orienta visitantes, identifica perfiles.</p>
      </div>
      <div class="eco-card agente-sistema">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@cartaspuerta</h3>
        </div>
        <p class="eco-card-desc">Correspondencia. Genera cartas de presentación personalizadas.</p>
      </div>
    </div>
  </div>
  
  <!-- Capa Meta -->
  <div class="agentes-layer">
    <div class="layer-header">
      <span class="layer-icon">⚙️</span>
      <h3 class="layer-title">Meta — Gestión</h3>
      <span class="layer-count">2 agentes</span>
    </div>
    <div class="eco-grid-compact">
      <div class="eco-card agente-meta">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@ox</h3>
        </div>
        <p class="eco-card-desc">Oráculo. Conoce todos los agentes, genera documentación.</p>
      </div>
      <div class="eco-card agente-meta">
        <div class="eco-card-header">
          <h3 class="eco-card-title">@pluginmanager</h3>
        </div>
        <p class="eco-card-desc">Gestor de extensiones. Instala, activa, desactiva plugins.</p>
      </div>
    </div>
  </div>
  
  <!-- Capa Bridges -->
  <div class="agentes-layer">
    <div class="layer-header">
      <span class="layer-icon">🔌</span>
      <h3 class="layer-title">Bridges — Conectores de Plugins</h3>
      <span class="layer-count">18 agentes</span>
    </div>
    <p style="color: var(--text-muted); margin-bottom: 1rem; font-size: 0.9rem;">
      Los bridges conectan VS Code con los agentes internos de cada plugin. Invócalos con <code>@plugin_ox_{nombre}</code>.
    </p>
    <div class="eco-grid-compact">
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_argboard</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_enciclopedia</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_ghpages</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_foroscraper</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_agentcreator</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_teatro</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_scrum</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_mcppresets</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_network</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_novelist</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_blocklyeditor</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_wireeditor</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_prologeditor</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_typedprompting</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_n8neditor</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_wiringapp</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_argboardapp</h3></div></div>
      <div class="eco-card agente-bridge"><div class="eco-card-header"><h3 class="eco-card-title">@plugin_ox_hypergrapheditor</h3></div></div>
    </div>
  </div>
  
  <!-- Agentes de Plugins (resumen) -->
  <div class="agentes-layer">
    <div class="layer-header">
      <span class="layer-icon">📦</span>
      <h3 class="layer-title">Agentes Internos de Plugins</h3>
      <span class="layer-count">+16 agentes</span>
    </div>
    <p style="color: var(--text-muted); font-size: 0.9rem;">
      Cada plugin tiene agentes especializados accesibles a través de su bridge. Por ejemplo, ARG Board tiene 8 agentes (Arrakis, BOE, Decoherence, GitARG, AutomataHeroe, ImpressJS, MBox, PlatformCom).
    </p>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     GUÍA DE INTERACCIÓN
     ═══════════════════════════════════════════════════════════════════ -->

<section class="eco-section guia-section">
  <div class="section-header">
    <div class="section-icon guia">💬</div>
    <h2 class="section-title">Cómo Interactuar</h2>
    <span class="section-desc">Handoffs y Prompts</span>
  </div>
  
  <div class="guia-diagram">
    <strong>Flujo de Handoffs</strong><br><br>
    Tú → <span style="color: var(--accent-green);">@aleph</span> → [handoff] → <span style="color: var(--accent-purple);">@plugin_ox_*</span> → [agente interno] → Resultado<br>
    <br>
    <span style="color: var(--text-muted);">Los handoffs son delegaciones automáticas entre agentes</span>
  </div>
  
  <table class="guia-table">
    <thead>
      <tr>
        <th>Si quieres...</th>
        <th>Invoca a...</th>
        <th>Ejemplo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Redactar un capítulo</td>
        <td><code>@aleph</code></td>
        <td><code>@aleph redacta capítulo 3 sobre vivienda</code></td>
      </tr>
      <tr>
        <td>Auditar evidencia</td>
        <td><code>@blueflag</code></td>
        <td><code>@blueflag audita las afirmaciones de este texto</code></td>
      </tr>
      <tr>
        <td>Detectar capturas de poder</td>
        <td><code>@blackflag</code></td>
        <td><code>@blackflag ¿quién gana con esta propuesta?</code></td>
      </tr>
      <tr>
        <td>Evaluar viabilidad</td>
        <td><code>@redflag</code></td>
        <td><code>@redflag ¿es implementable a escala?</code></td>
      </tr>
      <tr>
        <td>Crear un agente</td>
        <td><code>@plugin_ox_agentcreator</code></td>
        <td><code>@plugin_ox_agentcreator crea agente basado en yellowflag</code></td>
      </tr>
      <tr>
        <td>Publicar en web</td>
        <td><code>@plugin_ox_ghpages</code></td>
        <td><code>@plugin_ox_ghpages publica docs/periodico.md</code></td>
      </tr>
      <tr>
        <td>Crear obra de teatro</td>
        <td><code>@plugin_ox_teatro</code></td>
        <td><code>@plugin_ox_teatro genera obra sobre el camino del héroe</code></td>
      </tr>
      <tr>
        <td>Extraer contenido de foro</td>
        <td><code>@plugin_ox_foroscraper</code></td>
        <td><code>@plugin_ox_foroscraper descarga hilo de burbuja.info</code></td>
      </tr>
      <tr>
        <td>Consultar enciclopedia</td>
        <td><code>@plugin_ox_enciclopedia</code></td>
        <td><code>@plugin_ox_enciclopedia busca "Kant" en HDF</code></td>
      </tr>
      <tr>
        <td>Saber qué agente usar</td>
        <td><code>@ox</code></td>
        <td><code>@ox ¿qué agente uso para auditar retórica?</code></td>
      </tr>
    </tbody>
  </table>
  
  <div class="guia-example">
    <span class="comment"># Ejemplo de sesión de trabajo</span><br><br>
    <span class="prompt">$</span> <span class="agent">@aleph</span> quiero escribir sobre tecnofeudalismo<br><br>
    <span class="comment"># Aleph redacta y sugiere auditoría</span><br><br>
    <span class="prompt">$</span> <span class="agent">@blueflag</span> audita evidencia del borrador<br>
    <span class="prompt">$</span> <span class="agent">@blackflag</span> ¿quién captura esta propuesta?<br>
    <span class="prompt">$</span> <span class="agent">@redflag</span> ¿es viable a escala nacional?<br><br>
    <span class="comment"># Tras las auditorías, publicar</span><br><br>
    <span class="prompt">$</span> <span class="agent">@plugin_ox_ghpages</span> publica el artículo
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     FOOTER CTA
     ═══════════════════════════════════════════════════════════════════ -->

<div class="eco-cta">
  <h3>¿Listo para escribir con el colectivo?</h3>
  <p>
    14 submódulos. 19 plugins. 31 agentes. Todo trabajando para ti.
  </p>
  <a href="https://github.com/escrivivir-co/aleph-scriptorium" class="cta-button">
    Fork en GitHub →
  </a>
</div>

</div>
