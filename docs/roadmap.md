---
layout: default
title: Mapa de Ruta
permalink: /roadmap/
---

<style>
/* ═══════════════════════════════════════════════════════════════
   ROADMAP PAGE - Mapa de Ruta
   ═══════════════════════════════════════════════════════════════ */

.roadmap-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.roadmap-hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
  border-radius: 16px;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.roadmap-hero h1 {
  font-size: 2.5rem;
  color: #e6edf3;
  margin: 0 0 0.5rem;
}

.roadmap-hero .hero-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.roadmap-hero .tagline {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  font-style: italic;
}

/* Secciones */
.roadmap-section {
  margin-bottom: 3rem;
}

.roadmap-section h2 {
  font-size: 1.5rem;
  color: #1a1a1a;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.roadmap-section h2::before {
  content: "// ";
  color: #6b7280;
}

/* Backlogs Grid */
.backlogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.backlog-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.backlog-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.backlog-card h3 {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.backlog-card .progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.backlog-card .progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.backlog-card .progress-text {
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  justify-content: space-between;
}

.backlog-card .status {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.backlog-card .links {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
}

.backlog-card .links a {
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
}

.backlog-card .links a:hover {
  text-decoration: underline;
}

/* Contributing Box */
.contributing-box {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #22c55e;
  border-radius: 12px;
  padding: 2rem;
}

/* Fotos Gallery */
.fotos-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.foto-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.foto-card:hover {
  border-color: #8b5cf6;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.foto-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.foto-header.sprint-0 {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.foto-header.sprint-1 {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.foto-header.sprint-2 {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
}

.foto-header .foto-icon {
  font-size: 1.25rem;
}

.foto-header .foto-date {
  font-size: 0.8rem;
  color: #6b7280;
  font-family: 'SF Mono', Monaco, monospace;
}

.foto-body {
  padding: 1.25rem;
}

.foto-body h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: #1a1a1a;
}

.foto-body .foto-summary {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem;
  line-height: 1.5;
}

.foto-body .foto-metrics {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.foto-body .foto-metrics .metric {
  font-size: 0.75rem;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #374151;
}

.foto-body .foto-link {
  font-size: 0.875rem;
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 500;
}

.foto-body .foto-link:hover {
  text-decoration: underline;
}

.contributing-box h3 {
  color: #166534;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contributing-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.step-number {
  background: #22c55e;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text {
  font-size: 0.9rem;
  color: #1a1a1a;
}

.step-text code {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.contributing-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.contributing-links a {
  background: #166534;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: background 0.3s;
}

.contributing-links a:hover {
  background: #15803d;
}

/* Future Section - Euler Banner */
.future-hero {
  background: linear-gradient(135deg, #1e3a5f 0%, #0d1117 100%);
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  color: #e6edf3;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.future-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.future-hero .euler-symbol {
  font-size: 6rem;
  font-family: 'Times New Roman', Georgia, serif;
  font-style: italic;
  font-weight: bold;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 40px rgba(96, 165, 250, 0.3);
  position: relative;
}

.future-hero .euler-subtitle {
  color: #94a3b8;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.future-hero h3 {
  color: #60a5fa;
  margin: 0 0 1rem;
  font-size: 1.3rem;
}

.future-hero .euler-name {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.future-hero .euler-showcase {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem auto;
  max-width: 600px;
}

.future-hero .euler-showcase .showcase-formula {
  font-size: 1rem;
  color: #60a5fa;
  font-family: 'SF Mono', Monaco, monospace;
  margin-bottom: 0.75rem;
}

.future-hero .euler-showcase .showcase-text {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.5;
}

.future-hero p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0;
}

.future-hero .euler-philosophy {
  font-style: italic;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Evolution Diagram */
.evolution-diagram {
  background: #0d1117;
  border-radius: 12px;
  padding: 1.5rem;
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 0.75rem;
  color: #8b949e;
  overflow-x: auto;
  margin-bottom: 2rem;
}

.evolution-diagram pre {
  margin: 0;
  white-space: pre;
}

/* Components Grid */
.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.component-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.component-card:hover {
  border-color: #0078d4;
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.1);
}

.component-header {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.component-header.disco {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.component-header.ghpages {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.component-header.argboard {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
}

.component-header .icon {
  font-size: 1.5rem;
}

.component-header .title {
  font-weight: bold;
  color: #1a1a1a;
}

.component-header .arrow {
  margin-left: auto;
  color: #6b7280;
}

.component-header .azure {
  font-size: 0.8rem;
  color: #0078d4;
  font-weight: 600;
}

.component-body {
  padding: 1.5rem;
}

.component-body h4 {
  margin: 0 0 0.5rem;
  color: #1a1a1a;
  font-size: 1rem;
}

.component-body p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem;
}

.services-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  font-size: 0.875rem;
}

.services-list li {
  padding: 0.3rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.services-list li::before {
  content: "→";
  color: #0078d4;
}

.component-body .guide-link {
  display: inline-block;
  color: #0078d4;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.component-body .guide-link:hover {
  text-decoration: underline;
}

/* Timeline */
.timeline-container {
  background: #f9fafb;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #22c55e, #3b82f6, #a855f7, #ec4899);
  transform: translateY(-50%);
}

.timeline-item {
  position: relative;
  text-align: center;
  flex: 1;
}

.timeline-item .dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  position: relative;
  z-index: 1;
}

.timeline-item.q1 .dot { background: #22c55e; }
.timeline-item.q2 .dot { background: #3b82f6; }
.timeline-item.q3 .dot { background: #a855f7; }
.timeline-item.q4 .dot { background: #ec4899; }

.timeline-item .quarter {
  font-weight: bold;
  color: #1a1a1a;
  font-size: 0.875rem;
}

.timeline-item .milestone {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Disclaimer */
.disclaimer-box {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fca5a5;
  border-radius: 12px;
  padding: 1.5rem;
}

.disclaimer-box h3 {
  color: #dc2626;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.disclaimer-box p {
  font-size: 0.9rem;
  color: #7f1d1d;
  margin: 0 0 0.75rem;
}

.disclaimer-box ul {
  margin: 0;
  padding-left: 1.5rem;
  font-size: 0.875rem;
  color: #991b1b;
}

.disclaimer-box ul li {
  margin-bottom: 0.25rem;
}

/* Badges */
.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.badges img {
  height: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .roadmap-hero h1 {
    font-size: 1.8rem;
  }
  
  .timeline {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .timeline::before {
    width: 4px;
    height: 100%;
    left: 8px;
    top: 0;
    transform: none;
  }
  
  .timeline-item {
    text-align: left;
    padding-left: 2rem;
  }
  
  .timeline-item .dot {
    position: absolute;
    left: 0;
    margin: 0;
  }
}
</style>

<div class="roadmap-page" markdown="0">

<!-- HERO -->
<div class="roadmap-hero">
  <div class="hero-icon">🗺️</div>
  <h1>Mapa de Ruta</h1>
  <p class="tagline">"El camino de Aleph a Euler"</p>
</div>

<!-- ═══════════════════════════════════════════════════════════════
     PRESENTE: DESARROLLO ABIERTO
     ═══════════════════════════════════════════════════════════════ -->
<section class="roadmap-section">
  <h2>Presente: Desarrollo Abierto</h2>
  
  <div class="backlogs-grid">
    <!-- SCRIPTORIUM -->
    <div class="backlog-card">
      <h3>⚙️ Scriptorium</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 100%"></div>
      </div>
      <div class="progress-text">
        <span>Feature Cycle 1</span>
        <span>100%</span>
      </div>
      <p class="status">✅ FC1 cerrado · 14 submódulos · 18 plugins</p>
      <div class="badges">
        <img src="https://img.shields.io/badge/v1.0.0--beta.3-Semillas_de_Futuro-8b5cf6?style=flat-square" alt="v1.0.0-beta.3">
        <img src="https://img.shields.io/badge/Plugins-18_registrados-3b82f6?style=flat-square" alt="18 Plugins">
        <img src="https://img.shields.io/badge/Agents-36_invocables-a855f7?style=flat-square" alt="36 Agents">
      </div>
      <div class="links">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/BACKLOG-SCRIPTORIUM.md">📋 Ver Backlog</a>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/issues?q=label%3Ascriptorium">🐛 Issues</a>
      </div>
    </div>
    
    <!-- FUNDACIÓN -->
    <div class="backlog-card">
      <h3>🎭 Fundación</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 85%"></div>
      </div>
      <div class="progress-text">
        <span>Sprint 1</span>
        <span>85%</span>
      </div>
      <p class="status">🔄 En progreso · Capítulo 1 en preparación</p>
      <div class="badges">
        <img src="https://img.shields.io/badge/Caps-0%2F12-f59e0b?style=flat-square" alt="0/12 Capítulos">
        <img src="https://img.shields.io/badge/Marco-15_docs-3b82f6?style=flat-square" alt="15 docs marco">
        <img src="https://img.shields.io/badge/Auditores-5_flags-ec4899?style=flat-square" alt="5 Flags">
      </div>
      <div class="links">
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md">📋 Ver Backlog</a>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/issues?q=label%3Afundacion">🐛 Issues</a>
      </div>
    </div>
  </div>
  
  <!-- CONTRIBUTING -->
  <div class="contributing-box">
    <h3>📋 Cómo Contribuir</h3>
    <p>Aleph Scriptorium es un proyecto FOSS. Las contribuciones son bienvenidas siguiendo el protocolo estándar:</p>
    
    <div class="contributing-steps">
      <div class="step">
        <span class="step-number">1</span>
        <span class="step-text"><strong>Fork</strong> del repositorio en tu cuenta</span>
      </div>
      <div class="step">
        <span class="step-number">2</span>
        <span class="step-text">Crear rama <code>feature/mi-cambio</code></span>
      </div>
      <div class="step">
        <span class="step-number">3</span>
        <span class="step-text">Seguir protocolo <code>DEVOPS.md</code></span>
      </div>
      <div class="step">
        <span class="step-number">4</span>
        <span class="step-text">Abrir <strong>Pull Request</strong> con descripción</span>
      </div>
    </div>
    
    <div class="contributing-links">
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/DEVOPS.md">📖 Protocolo DevOps</a>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/issues/new">🐛 Nuevo Issue</a>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/pulls">🔀 Pull Requests</a>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     GALERÍA DE FOTOS DE ESTADO
     ═══════════════════════════════════════════════════════════════ -->
<section class="roadmap-section" id="galeria-fotos">
  <h2>Fotos de Estado</h2>
  
  <p style="color: #6b7280; margin-bottom: 1.5rem;">Registro histórico del progreso del proyecto. Cada foto captura el estado al cierre de un sprint.</p>
  
  <!-- GALERÍA DE FOTOS DE ESTADO -->
  <div class="fotos-gallery">
    <!-- Más reciente primero -->
    
    <!-- FOTO DE FUTURO - Feature Cycle 1 -->
    <div class="foto-card" style="border: 2px solid #8b5cf6; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
      <div class="foto-header" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);">
        <span class="foto-icon">🔮</span>
        <span class="foto-date" style="color: #fff;">2025-12-24</span>
      </div>
      <div class="foto-body" style="color: #e6edf3;">
        <h4 style="color: #a78bfa;">🎄 Feature Cycle 1: Visión de Futuro</h4>
        <p class="foto-summary" style="color: #94a3b8;">Rama fc1 activa. 14 submódulos integrados. 18 plugins registrados. El Scriptorium desarrollado: teatro de operaciones cognitivo.</p>
        <div class="foto-metrics">
          <span class="metric" style="background: rgba(139, 92, 246, 0.3); color: #c4b5fd;">📦 14 submódulos</span>
          <span class="metric" style="background: rgba(139, 92, 246, 0.3); color: #c4b5fd;">🔌 18 plugins</span>
          <span class="metric" style="background: rgba(139, 92, 246, 0.3); color: #c4b5fd;">🧊 main congelada</span>
        </div>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-24_FC1_VisionFuturo.md" class="foto-link" style="color: #c4b5fd;">Ver foto de futuro →</a>
      </div>
    </div>
    
    <div class="foto-card">
      <div class="foto-header sprint-2">
        <span class="foto-icon">📸</span>
        <span class="foto-date">2025-12-23</span>
      </div>
      <div class="foto-body">
        <h4>Sprint 2: Tu ejército de IA, listo</h4>
        <p class="foto-summary">8 plugins, 36 agentes, 5 auditores. Todo lo que necesitas para escribir con IA que trabaja para ti.</p>
        <div class="foto-metrics">
          <span class="metric">🔌 8 plugins</span>
          <span class="metric">🤖 36 agentes</span>
          <span class="metric">🎯 5 auditores</span>
        </div>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-23_Sprint2_FeatureCycle1.md" class="foto-link">Ver foto completa →</a>
      </div>
    </div>
    
    <div class="foto-card">
      <div class="foto-header sprint-1">
        <span class="foto-icon">📸</span>
        <span class="foto-date">2025-12-22</span>
      </div>
      <div class="foto-body">
        <h4>Sprint 1: Teatro Interactivo</h4>
        <p class="foto-summary">7 plugins operativos, 34 agentes, visualizador 3D con impress.js, 2 obras en cartelera</p>
        <div class="foto-metrics">
          <span class="metric">✅ 58 tasks</span>
          <span class="metric">📦 7 plugins</span>
          <span class="metric">🤖 34 agentes</span>
          <span class="metric">🖼️ 12 capturas</span>
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-22_Sprint1_TeatroInteractivo.md" class="foto-link">Ver foto completa →</a>
          <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/FOTOS_ESTADO/Sprint1" class="foto-link" style="color: #22c55e;">📷 Galería visual →</a>
        </div>
      </div>
    </div>
    
    <div class="foto-card">
      <div class="foto-header sprint-0">
        <span class="foto-icon">📸</span>
        <span class="foto-date">2025-12-21</span>
      </div>
      <div class="foto-body">
        <h4>Sprint 0: Bootstrap</h4>
        <p class="foto-summary">Infraestructura base, protocolo DevOps, 5 plugins iniciales, ARCHIVO consolidado</p>
        <div class="foto-metrics">
          <span class="metric">✅ 336 tasks</span>
          <span class="metric">📦 5 plugins</span>
          <span class="metric">🤖 17 agentes</span>
        </div>
        <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-21_Sprint0_Bootstrap.md" class="foto-link">Ver foto completa →</a>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     FUTURO: EULER SCRIPTORIUM
     ═══════════════════════════════════════════════════════════════ -->
<section class="roadmap-section">
  <h2>Futuro: Euler Scriptorium</h2>
  
  <div class="future-hero">
    <div class="euler-symbol">𝑒</div>
    <div class="euler-subtitle">La extensión hacia la nube</div>
    <div class="euler-name">Euler Scriptorium</div>
    
    <div class="euler-showcase">
      <div class="showcase-formula">ℵ (datos + interacción) → 𝑒 (cloud × n)</div>
      <div class="showcase-text">
        <strong>Extraer</strong> del Aleph Scriptorium tanto datos como interacción<br>
        para <strong>desplegar</strong> Euler Scriptoriums al gusto del usuario
      </div>
    </div>
    
    <p>Evolución natural de Aleph hacia GitHub Cloud y Azure, manteniendo la filosofía: <strong>configuración y scripts, no servicios gestionados</strong>.</p>
    
    <p class="euler-philosophy">Euler proveerá guías y herramientas. El usuario gestiona sus propias suscripciones Azure/GitHub.</p>
  </div>
  
  <!-- Diagrama de evolución -->
  <div class="evolution-diagram">
<pre>
┌─────────────────────┐                    ┌─────────────────────┐
│  ALEPH SCRIPTORIUM  │                    │  EULER SCRIPTORIUM  │
│      (Local)        │ ═══ evoluciona ═══▶│      (Cloud)        │
│   VS Code + Copilot │                    │   Azure/GitHub      │
└─────────────────────┘                    └─────────────────────┘
         │                                          │
         ▼                                          ▼
┌─────────────────────┐                    ┌─────────────────────┐
│       DISCO         │ ═══════════════════▶│   Azure Data Lake   │
│   (local files)     │    migración/sync   │   Blob Storage      │
└─────────────────────┘                    └─────────────────────┘
         │                                          │
         ▼                                          ▼
┌─────────────────────┐                    ┌─────────────────────┐
│     GH-PAGES        │ ═══════════════════▶│   Azure Static Web  │
│   (static site)     │       escalar       │   App Service       │
└─────────────────────┘                    └─────────────────────┘
         │                                          │
         ▼                                          ▼
┌─────────────────────┐                    ┌─────────────────────┐
│     ARG-BOARD       │ ═══════════════════▶│   Azure SignalR     │
│  (local theater)    │    tiempo real      │   Cosmos DB         │
└─────────────────────┘                    └─────────────────────┘
</pre>
  </div>
  
  <!-- Componentes Grid -->
  <div class="components-grid">
    <!-- DISCO → Data Lake -->
    <div class="component-card">
      <div class="component-header disco">
        <span class="icon">📁</span>
        <span class="title">DISCO</span>
        <span class="arrow">→</span>
        <span class="azure">Azure Data Lake</span>
      </div>
      <div class="component-body">
        <h4>Almacenamiento escalable</h4>
        <p>Migra tus carpetas de trabajo a la nube con acceso multi-dispositivo y búsqueda avanzada.</p>
        <ul class="services-list">
          <li>Azure Blob Storage (desde $0.02/GB/mes)</li>
          <li>Data Lake Gen2 (analytics)</li>
          <li>Azure Cognitive Search</li>
        </ul>
        <a href="#" class="guide-link">📖 Guía de migración (próximamente)</a>
      </div>
    </div>
    
    <!-- GH-PAGES → Azure Web -->
    <div class="component-card">
      <div class="component-header ghpages">
        <span class="icon">🌐</span>
        <span class="title">GH-PAGES</span>
        <span class="arrow">→</span>
        <span class="azure">Azure Web</span>
      </div>
      <div class="component-body">
        <h4>Escalar tu web</h4>
        <p>Evoluciona de GitHub Pages a una infraestructura web profesional con CDN global.</p>
        <ul class="services-list">
          <li>Azure Static Web Apps (gratis - $9/mes)</li>
          <li>App Service (desde $13/mes)</li>
          <li>Azure Front Door (CDN, WAF)</li>
        </ul>
        <a href="#" class="guide-link">📖 Guía de escalado (próximamente)</a>
      </div>
    </div>
    
    <!-- ARG-BOARD → Real-Time -->
    <div class="component-card">
      <div class="component-header argboard">
        <span class="icon">🎭</span>
        <span class="title">ARG-BOARD</span>
        <span class="arrow">→</span>
        <span class="azure">Azure Real-Time</span>
      </div>
      <div class="component-body">
        <h4>Juego multiplayer</h4>
        <p>Transforma tu teatro local en una experiencia ARG multijugador en tiempo real.</p>
        <ul class="services-list">
          <li>Azure SignalR Service (WebSockets)</li>
          <li>Cosmos DB Serverless (estado)</li>
          <li>Azure Functions (lógica de turnos)</li>
        </ul>
        <a href="#" class="guide-link">📖 Guía ARG Cloud (próximamente)</a>
      </div>
    </div>
  </div>
  
  <!-- Timeline -->
  <div class="timeline-container">
    <h3 style="margin: 0 0 1rem; color: #1a1a1a;">📅 Timeline Tentativo</h3>
    <div class="timeline">
      <div class="timeline-item q1">
        <div class="dot"></div>
        <div class="quarter">Q1 2026</div>
        <div class="milestone">Aleph 1.0</div>
        <div class="milestone">Fundación caps 1-3</div>
      </div>
      <div class="timeline-item q2">
        <div class="dot"></div>
        <div class="quarter">Q2 2026</div>
        <div class="milestone">DISCO Cloud</div>
        <div class="milestone">Data Lakes</div>
      </div>
      <div class="timeline-item q3">
        <div class="dot"></div>
        <div class="quarter">Q3 2026</div>
        <div class="milestone">Web Scale</div>
        <div class="milestone">Azure Static</div>
      </div>
      <div class="timeline-item q4">
        <div class="dot"></div>
        <div class="quarter">Q4 2026</div>
        <div class="milestone">ARG Multi</div>
        <div class="milestone">SignalR</div>
      </div>
    </div>
  </div>
  
  <!-- Disclaimer -->
  <div class="disclaimer-box">
    <h3>⚠️ Aviso Importante</h3>
    <p><strong>Euler Scriptorium proveerá únicamente:</strong></p>
    <ul>
      <li>Configuración y scripts de integración</li>
      <li>Guías de selección de servicios</li>
      <li>Templates de infraestructura como código (ARM/Bicep)</li>
    </ul>
    <p><strong>Escrivivir.co NO es responsable de:</strong></p>
    <ul>
      <li>Costes incurridos en Azure/GitHub por el usuario</li>
      <li>Configuración de suscripciones Microsoft</li>
      <li>Soporte técnico de servicios de terceros</li>
      <li>Seguridad y privacidad de datos del usuario</li>
    </ul>
    <p><em>El usuario debe proveerse por su cuenta mediante suscripciones o pago por uso con Microsoft Azure.</em></p>
  </div>
</section>

</div>
