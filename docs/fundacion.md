---
layout: default
title: Fundación
description: "De la página al escenario: FUNDACIÓN es una obra de teatro transmedia"
permalink: /fundacion/
---

<style>
/* ═══════════════════════════════════════════════════════════════════
   FUNDACIÓN PAGE - ESTILO PROMOCIONAL (como agentes.md)
   ═══════════════════════════════════════════════════════════════════ */

.fundacion-page {
  --page-bg: #0d1117;
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(255, 255, 255, 0.08);
  --text-primary: #e6edf3;
  --text-muted: rgba(255, 255, 255, 0.6);
  --accent-gold: #ffd700;
  --accent-purple: #9c27b0;
  --accent-cyan: #00d4ff;
  --accent-green: #00c853;
  
  background: var(--page-bg);
  color: var(--text-primary);
  margin: calc(-1 * var(--space-lg, 2rem));
  padding: var(--space-lg, 2rem);
  min-height: 100vh;
}

/* Hero Section */
.fundacion-hero {
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(40, 20, 50, 0.9) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.fundacion-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 50%);
  animation: pulse-gold 8s ease-in-out infinite;
}

@keyframes pulse-gold {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #fff 0%, var(--accent-gold) 100%);
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
  margin: 0 auto 2rem auto;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.hero-cta a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.hero-cta a.primary {
  background: var(--accent-gold);
  color: #000;
}

.hero-cta a.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-cta a:hover {
  transform: translateY(-2px);
}

/* Secciones */
.fundacion-section {
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

.section-icon.ecosistema { background: rgba(0, 212, 255, 0.2); }
.section-icon.obra { background: rgba(255, 215, 0, 0.2); }
.section-icon.teatro { background: rgba(156, 39, 176, 0.2); }
.section-icon.recursos { background: rgba(0, 200, 83, 0.2); }

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

/* Ecosistema Grid */
.ecosistema-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  flex-wrap: wrap;
}

.eco-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  width: 180px;
  transition: all 0.3s ease;
}

.eco-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.eco-card .icon { font-size: 2rem; margin-bottom: 0.5rem; }
.eco-card h4 { margin: 0 0 0.5rem 0; color: #fff; font-size: 1rem; }
.eco-card p { margin: 0; font-size: 0.8rem; color: var(--text-muted); }

.eco-arrow {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
}

/* Timeline de capítulos */
.timeline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.chapter-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  transition: all 0.3s ease;
}

.chapter-card:hover {
  border-color: rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.03);
}

.chapter-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 8px 8px 0 0;
}

.chapter-card.temporal::before { background: #2196f3; }
.chapter-card.antropologico::before { background: #ff9800; }
.chapter-card.escalar::before { background: #f44336; }
.chapter-card.meta::before { background: #9c27b0; }

.chapter-num {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.chapter-title {
  font-size: 1rem;
  margin: 0.25rem 0;
  color: #fff;
}

.chapter-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.chapter-desp {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
}

.chapter-status {
  font-size: 0.75rem;
}

.chapter-status.borrador { color: #ffc107; }
.chapter-status.pendiente { color: var(--text-muted); }
.chapter-status.publicado { color: #00c853; }

/* Teatro Cards */
.teatro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.teatro-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.teatro-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent-purple);
}

.teatro-card:hover {
  transform: translateY(-4px);
  border-color: rgba(156, 39, 176, 0.3);
}

.teatro-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.teatro-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(156, 39, 176, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.teatro-info h4 {
  margin: 0;
  color: #fff;
  font-size: 1.1rem;
}

.teatro-badge {
  font-size: 0.7rem;
  background: rgba(156, 39, 176, 0.3);
  color: #ce93d8;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
}

.teatro-info span {
  font-size: 0.8rem;
  color: var(--accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.teatro-card p {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.teatro-stats {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.teatro-stat {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.teatro-stat strong {
  color: #fff;
}

/* Recursos Grid */
.recursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.recurso-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.recurso-card:hover {
  border-color: rgba(0, 200, 83, 0.3);
  background: rgba(0, 200, 83, 0.03);
}

.recurso-card h4 {
  margin: 0 0 0.5rem 0;
  color: #fff;
  font-size: 0.9rem;
}

.recurso-card p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title { font-size: 1.8rem; }
  .ecosistema-flow { flex-direction: column; }
  .eco-arrow { transform: rotate(90deg); }
  .section-header { flex-wrap: wrap; }
  .section-desc { width: 100%; margin-left: 0; margin-top: 0.5rem; }
}
</style>

<div class="fundacion-page">

<!-- ═══════════════════════════════════════════════════════════════════
     HERO SECTION
     ═══════════════════════════════════════════════════════════════════ -->

<div class="fundacion-hero">
  <div class="hero-icon">🎭</div>
  <h1 class="hero-title">FUNDACIÓN</h1>
  <p class="hero-subtitle">
    Un texto político no es solo un documento: es una <strong>obra de teatro transmedia</strong>
    donde los agentes son los actores y el código es el escenario.<br>
    12 capítulos · 12 meses · 2026
  </p>
  <div class="hero-cta">
    <a href="#la-obra" class="primary">Ver Índice ↓</a>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/PLUGINS/ARG_BOARD" class="secondary">Entrar al Teatro →</a>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════════
     ECOSISTEMA VIBECODING
     ═══════════════════════════════════════════════════════════════════ -->

<section class="fundacion-section">
  <div class="section-header">
    <div class="section-icon ecosistema">🔄</div>
    <h2 class="section-title">Ecosistema VibeCoding</h2>
    <span class="section-desc">Del taller al escenario</span>
  </div>
  
  <div class="ecosistema-flow">
    <div class="eco-card">
      <div class="icon">⚙️</div>
      <h4>Scriptorium</h4>
      <p>El taller de escritura. Produce agentes y doctrina.</p>
    </div>
    <span class="eco-arrow">→</span>
    <div class="eco-card">
      <div class="icon">🎭</div>
      <h4>ARG Board</h4>
      <p>El teatro. Ejecuta obras transmedia con personajes IA.</p>
    </div>
    <span class="eco-arrow">→</span>
    <div class="eco-card">
      <div class="icon">📜</div>
      <h4>Fundación</h4>
      <p>La obra. 12 actos que se representan en el teatro.</p>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     LA OBRA — ÍNDICE DE CAPÍTULOS
     ═══════════════════════════════════════════════════════════════════ -->

<section class="fundacion-section" id="la-obra">
  <div class="section-header">
    <div class="section-icon obra">📜</div>
    <h2 class="section-title">La Obra — 12 Capítulos</h2>
    <span class="section-desc">Serialización mensual 2026</span>
  </div>
  
  <div class="timeline-grid">
    <!-- ARCO I: ENERO -->
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/CAPITULOS/cap01-anacronismo-productivo.md" class="chapter-card temporal">
      <div class="chapter-num">Capítulo 1 · Enero</div>
      <div class="chapter-title">Anacronismo productivo</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Temporal</span>
        <span class="chapter-status borrador">📝 Borrador</span>
      </div>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/CAPITULOS/cap02-automata-soberano.md" class="chapter-card antropologico">
      <div class="chapter-num">Capítulo 2 · Febrero</div>
      <div class="chapter-title">Autómata soberano</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Antropológico</span>
        <span class="chapter-status borrador">📝 Borrador</span>
      </div>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/CAPITULOS/cap03-problema-escala.md" class="chapter-card escalar">
      <div class="chapter-num">Capítulo 3 · Marzo</div>
      <div class="chapter-title">Problema de la escala</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Escalar</span>
        <span class="chapter-status borrador">📝 Borrador</span>
      </div>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/CAPITULOS/cap04-repertorio-arquitecturas.md" class="chapter-card temporal">
      <div class="chapter-num">Capítulo 4 · Abril</div>
      <div class="chapter-title">Repertorio de arquitecturas</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Temporal</span>
        <span class="chapter-status borrador">📝 Borrador</span>
      </div>
    </a>
    
    <!-- ARCO II-IV -->
    <div class="chapter-card temporal">
      <div class="chapter-num">Capítulo 5 · Mayo</div>
      <div class="chapter-title">Formas de vida</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Temporal</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
    
    <div class="chapter-card temporal">
      <div class="chapter-num">Capítulo 6 · Junio</div>
      <div class="chapter-title">Futuros cancelados</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Temporal</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
    
    <div class="chapter-card antropologico">
      <div class="chapter-num">Capítulo 7 · Julio</div>
      <div class="chapter-title">Infraestructuras como actores</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Antropológico</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
    
    <div class="chapter-card escalar">
      <div class="chapter-num">Capítulo 8 · Agosto</div>
      <div class="chapter-title">Demos sin demos</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Escalar</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
    
    <div class="chapter-card antropologico">
      <div class="chapter-num">Capítulo 9 · Septiembre</div>
      <div class="chapter-title">Ecosistemas políticos</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Antropológico</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
    
    <div class="chapter-card escalar">
      <div class="chapter-num">Capítulo 10 · Octubre</div>
      <div class="chapter-title">Régimen material</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Escalar</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
    
    <div class="chapter-card escalar">
      <div class="chapter-num">Capítulo 11 · Noviembre</div>
      <div class="chapter-title">El sacrificio</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Escalar</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
    
    <div class="chapter-card meta">
      <div class="chapter-num">Capítulo 12 · Diciembre</div>
      <div class="chapter-title">La sombra del texto</div>
      <div class="chapter-meta">
        <span class="chapter-desp">Meta</span>
        <span class="chapter-status pendiente">⏳ Pendiente</span>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     EL TEATRO — ARG BOARD + AGENT CREATOR
     ═══════════════════════════════════════════════════════════════════ -->

<section class="fundacion-section">
  <div class="section-header">
    <div class="section-icon teatro">🎭</div>
    <h2 class="section-title">El Teatro</h2>
    <span class="section-desc">Plugins que dan vida a la obra</span>
  </div>
  
  <div class="teatro-grid">
    <div class="teatro-card">
      <div class="teatro-header">
        <div class="teatro-icon">🎲</div>
        <div class="teatro-info">
          <h4>ARG Board<span class="teatro-badge">8 agentes</span></h4>
          <span>Motor de Teatro Transmedia</span>
        </div>
      </div>
      <p>
        El escenario donde se representan las obras. Incluye Arrakis (director), BOE (boletín oficial), 
        Decoherence (coherencia), GitARG (turnos), y más.
      </p>
      <div class="teatro-stats">
        <div class="teatro-stat"><strong>Obras:</strong> Hola Mundo</div>
        <div class="teatro-stat"><strong>Actores:</strong> Tarotista</div>
      </div>
    </div>
    
    <div class="teatro-card">
      <div class="teatro-header">
        <div class="teatro-icon">🔧</div>
        <div class="teatro-info">
          <h4>Agent Creator<span class="teatro-badge">1 agente</span></h4>
          <span>Fábrica de Personajes</span>
        </div>
      </div>
      <p>
        Crea agentes especializados combinando agentes base con fuentes de datos. 
        Los personajes del teatro nacen aquí.
      </p>
      <div class="teatro-stats">
        <div class="teatro-stat"><strong>Creados:</strong> demarcacion-yellowflag</div>
        <div class="teatro-stat"><strong>Fuente:</strong> Foro_t8941392</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     RECURSOS — BACKLOG, INDICADORES, DOCTRINA
     ═══════════════════════════════════════════════════════════════════ -->

<section class="fundacion-section">
  <div class="section-header">
    <div class="section-icon recursos">📚</div>
    <h2 class="section-title">Recursos</h2>
    <span class="section-desc">Base doctrinal y seguimiento</span>
  </div>
  
  <div class="recursos-grid">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/marco" class="recurso-card">
      <h4>📘 Marco Conceptual</h4>
      <p>15 documentos de herramientas para diseño político</p>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/diagnostico" class="recurso-card">
      <h4>📋 Diagnóstico</h4>
      <p>5 documentos sobre el estado de la cuestión</p>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md" class="recurso-card">
      <h4>📊 Backlog</h4>
      <p>Tareas, sprints y progreso del proyecto</p>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/indicadores-fracaso-enero.md" class="recurso-card">
      <h4>⚠️ Indicadores de Fracaso</h4>
      <p>Tests y señales de alerta para cada capítulo</p>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/Indice.md" class="recurso-card">
      <h4>📑 Índice Completo</h4>
      <p>Estructura detallada de los 12 capítulos</p>
    </a>
    
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/CARTAS" class="recurso-card">
      <h4>✉️ Cartas Puerta</h4>
      <p>5 modos de presentar el proyecto según perfil</p>
    </a>
  </div>
</section>

</div>
