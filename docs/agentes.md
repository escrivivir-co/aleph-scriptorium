---
layout: default
title: Agentes
description: "Del Clippy al Colectivo: conoce a los agentes de Aleph Scriptorium"
permalink: /agentes/
---

<style>
/* ═══════════════════════════════════════════════════════════════════
   AGENTES PAGE - ESTILOS ESPECÍFICOS
   Diseño dark para sección promocional
   ═══════════════════════════════════════════════════════════════════ */

.agentes-page {
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
  
  background: var(--page-bg);
  color: var(--text-primary);
  margin: calc(-1 * var(--space-lg, 2rem));
  padding: var(--space-lg, 2rem);
  min-height: 100vh;
}

/* Hero Section */
.agentes-hero {
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.agentes-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.03) 0%, transparent 50%);
  animation: pulse-bg 8s ease-in-out infinite;
}

@keyframes pulse-bg {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.hero-clippy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.clippy-old {
  opacity: 0.4;
  filter: grayscale(100%);
  transition: all 0.3s ease;
}

.clippy-arrow {
  font-size: 2rem;
  color: var(--accent-cyan);
  animation: arrow-pulse 1.5s ease-in-out infinite;
}

@keyframes arrow-pulse {
  0%, 100% { transform: translateX(0); opacity: 0.5; }
  50% { transform: translateX(10px); opacity: 1; }
}

.clippy-new {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #fff 0%, var(--accent-cyan) 100%);
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* Timeline Evolution */
.evolution-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  flex-wrap: wrap;
}

.evo-step {
  text-align: center;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.evo-step:last-child {
  opacity: 1;
}

.evo-step:hover {
  opacity: 1;
}

.evo-year {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.5rem;
}

.evo-name {
  font-size: 0.9rem;
  color: #fff;
}

.evo-arrow {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
}

/* Sección de Capa */
.agentes-layer {
  margin-bottom: 3rem;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.layer-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.layer-icon.ui { background: rgba(0, 200, 83, 0.2); }
.layer-icon.backend { background: rgba(255, 107, 107, 0.2); }
.layer-icon.sistema { background: rgba(255, 255, 255, 0.1); }
.layer-icon.meta { background: rgba(0, 212, 255, 0.2); }
.layer-icon.plugins { background: rgba(156, 39, 176, 0.2); }

.layer-title {
  font-size: 1.5rem;
  margin: 0;
  border: none;
  padding: 0;
}

.layer-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-left: auto;
}

/* Grid de Agentes */
.agentes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Card de Agente */
.agente-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.agente-card::before {
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

.agente-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.agente-card:hover::before {
  transform: scaleX(1);
}

/* Colores por tipo */
.agente-card.ui { --card-accent: var(--accent-green); }
.agente-card.blue { --card-accent: var(--accent-blue); }
.agente-card.black { --card-accent: #607d8b; }
.agente-card.red { --card-accent: var(--accent-red); }
.agente-card.yellow { --card-accent: var(--accent-yellow); }
.agente-card.orange { --card-accent: var(--accent-orange); }
.agente-card.sistema { --card-accent: var(--accent-gray); }
.agente-card.meta { --card-accent: var(--accent-cyan); }
.agente-card.plugin { --card-accent: var(--accent-purple); }

.agente-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.agente-avatar {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.agente-avatar svg {
  width: 28px;
  height: 28px;
}

.agente-info {
  flex: 1;
  min-width: 0;
}

.agente-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #fff;
}

.agente-role {
  font-size: 0.8rem;
  color: var(--card-accent, var(--accent-cyan));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.agente-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

/* Badge de cantidad para plugins */
.plugin-count {
  display: inline-block;
  background: rgba(156, 39, 176, 0.3);
  color: #ce93d8;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
}

/* Footer CTA */
.agentes-cta {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(0, 212, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.agentes-cta h3 {
  margin-bottom: 1rem;
  border: none;
  padding: 0;
}

.agentes-cta p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.agentes-cta a.cta-button {
  display: inline-block;
  background: var(--accent-cyan);
  color: var(--page-bg);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.agentes-cta a.cta-button:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-clippy {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .layer-header {
    flex-wrap: wrap;
  }
  
  .layer-desc {
    width: 100%;
    margin-left: 0;
    margin-top: 0.5rem;
  }
  
  .evolution-timeline {
    flex-direction: column;
  }
  
  .evo-arrow {
    transform: rotate(90deg);
  }
}
</style>

<div class="agentes-page">

<!-- ═══════════════════════════════════════════════════════════════════
     HERO SECTION
     ═══════════════════════════════════════════════════════════════════ -->

<div class="agentes-hero">
  <div class="hero-clippy">
    <!-- Clippy viejo (estilizado) -->
    <div class="clippy-old">
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
        <ellipse cx="30" cy="25" rx="20" ry="22" stroke="#666" stroke-width="3" fill="none"/>
        <circle cx="24" cy="20" r="4" fill="#666"/>
        <circle cx="36" cy="20" r="4" fill="#666"/>
        <path d="M24 32 Q30 38 36 32" stroke="#666" stroke-width="2" fill="none"/>
        <path d="M30 47 L30 70" stroke="#666" stroke-width="3"/>
        <path d="M20 55 L40 55" stroke="#666" stroke-width="3"/>
      </svg>
    </div>
    
    <span class="clippy-arrow">→</span>
    
    <!-- Nuevo: Colectivo de agentes -->
    <div class="clippy-new">
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
        <!-- Ox central -->
        <circle cx="50" cy="40" r="18" fill="rgba(0, 212, 255, 0.2)" stroke="#00d4ff" stroke-width="2"/>
        <path d="M42 35 L38 28 M58 35 L62 28" stroke="#00d4ff" stroke-width="2" stroke-linecap="round"/>
        <circle cx="45" cy="38" r="2" fill="#00d4ff"/>
        <circle cx="55" cy="38" r="2" fill="#00d4ff"/>
        <ellipse cx="50" cy="48" rx="4" ry="3" stroke="#00d4ff" stroke-width="1.5" fill="none"/>
        
        <!-- Órbitas -->
        <circle cx="50" cy="40" r="30" stroke="rgba(0, 212, 255, 0.2)" stroke-width="1" fill="none" stroke-dasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" from="0 50 40" to="360 50 40" dur="20s" repeatCount="indefinite"/>
        </circle>
        
        <!-- Agentes orbitando -->
        <circle cx="20" cy="40" r="6" fill="rgba(0, 200, 83, 0.3)" stroke="#00c853" stroke-width="1.5">
          <animateTransform attributeName="transform" type="rotate" from="0 50 40" to="360 50 40" dur="10s" repeatCount="indefinite"/>
        </circle>
        <circle cx="80" cy="40" r="6" fill="rgba(244, 67, 54, 0.3)" stroke="#f44336" stroke-width="1.5">
          <animateTransform attributeName="transform" type="rotate" from="180 50 40" to="540 50 40" dur="10s" repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="10" r="6" fill="rgba(156, 39, 176, 0.3)" stroke="#9c27b0" stroke-width="1.5">
          <animateTransform attributeName="transform" type="rotate" from="90 50 40" to="450 50 40" dur="10s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  </div>
  
  <h1 class="hero-title">Del Clippy al Colectivo</h1>
  <p class="hero-subtitle">
    ¿Recuerdas al asistente que preguntaba "¿Parece que estás escribiendo una carta?"<br>
    <strong>Ahora escriben ellos.</strong> Conoce a los agentes de Aleph Scriptorium.
  </p>
</div>

<!-- Timeline de evolución -->
<div class="evolution-timeline">
  <div class="evo-step">
    <div class="evo-year">1997</div>
    <div class="evo-name">📎 Clippy</div>
  </div>
  <span class="evo-arrow">→</span>
  <div class="evo-step">
    <div class="evo-year">2020</div>
    <div class="evo-name">🤖 GPT-3</div>
  </div>
  <span class="evo-arrow">→</span>
  <div class="evo-step">
    <div class="evo-year">2023</div>
    <div class="evo-name">💬 Copilot</div>
  </div>
  <span class="evo-arrow">→</span>
  <div class="evo-step">
    <div class="evo-year">2025</div>
    <div class="evo-name">🐂 Scriptorium</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════════
     CAPA UI - PRODUCCIÓN
     ═══════════════════════════════════════════════════════════════════ -->

<section class="agentes-layer">
  <div class="layer-header">
    <div class="layer-icon ui">🟢</div>
    <h2 class="layer-title">UI — Producción</h2>
    <span class="layer-desc">Interfaz directa con el usuario</span>
  </div>
  
  <div class="agentes-grid">
    <!-- ALEPH -->
    <div class="agente-card ui">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M7 21L14 5L21 21" stroke="#00c853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 17H19" stroke="#00c853" stroke-width="2" stroke-linecap="round"/>
            <path d="M20 8C20 8 22 10 22 13C22 16 20 18 20 18" stroke="#00c853" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
            <circle cx="22" cy="6" r="2" fill="#00c853" opacity="0.5"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@aleph</h3>
          <span class="agente-role">Escriba Principal</span>
        </div>
      </div>
      <p class="agente-desc">
        El punto de entrada. Recibe instrucciones, coordina con los auditores, y produce texto doctrinal siguiendo la voz del manifiesto.
      </p>
    </div>
    
    <!-- REVISOR -->
    <div class="agente-card ui">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <circle cx="12" cy="12" r="7" stroke="#00c853" stroke-width="2" fill="none"/>
            <path d="M17 17L23 23" stroke="#00c853" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 12L11 14L15 10" stroke="#00c853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@revisor</h3>
          <span class="agente-role">Control de Calidad</span>
        </div>
      </div>
      <p class="agente-desc">
        Inspecciona el texto final. Verifica coherencia interna, detecta inconsistencias, y sugiere mejoras antes de la publicación.
      </p>
    </div>
    
    <!-- PERIODICO -->
    <div class="agente-card ui">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="4" y="5" width="20" height="18" rx="2" stroke="#00c853" stroke-width="2" fill="none"/>
            <path d="M4 10H24" stroke="#00c853" stroke-width="2"/>
            <path d="M8 14H14" stroke="#00c853" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 17H12" stroke="#00c853" stroke-width="1.5" stroke-linecap="round"/>
            <rect x="16" y="13" width="4" height="5" rx="0.5" stroke="#00c853" stroke-width="1" fill="none"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@periodico</h3>
          <span class="agente-role">Redactor de Noticias</span>
        </div>
      </div>
      <p class="agente-desc">
        Transforma eventos en noticias. Aplica las 5W del periodismo y asigna banderas de auditoría a cada pieza informativa.
      </p>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     CAPA BACKEND - AUDITORÍA (5 BANDERAS)
     ═══════════════════════════════════════════════════════════════════ -->

<section class="agentes-layer">
  <div class="layer-header">
    <div class="layer-icon backend">🏴</div>
    <h2 class="layer-title">Backend — Las 5 Banderas</h2>
    <span class="layer-desc">Sistema de auditoría epistémica</span>
  </div>
  
  <div class="agentes-grid">
    <!-- BLUEFLAG -->
    <div class="agente-card blue">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M6 4V24" stroke="#2196f3" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 4H20L16 9L20 14H6" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="13" cy="9" r="3" stroke="#2196f3" stroke-width="1.5" fill="none"/>
            <circle cx="13" cy="9" r="1" fill="#2196f3"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@blueflag</h3>
          <span class="agente-role">Verdad y Evidencia</span>
        </div>
      </div>
      <p class="agente-desc">
        El ojo de la verdad. Verifica afirmaciones empíricas, cruza fuentes, y marca claims sin evidencia suficiente.
      </p>
    </div>
    
    <!-- BLACKFLAG -->
    <div class="agente-card black">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M6 4V24" stroke="#607d8b" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 4H20L16 9L20 14H6" fill="rgba(96, 125, 139, 0.3)" stroke="#607d8b" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="13" cy="9" r="4" stroke="#607d8b" stroke-width="1.5" fill="none"/>
            <path d="M11 7C11 7 12 10 15 11" stroke="#607d8b" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@blackflag</h3>
          <span class="agente-role">Sombras y Poder</span>
        </div>
      </div>
      <p class="agente-desc">
        La sombra revelada. Identifica captura del poder, coste represivo, y puntos ciegos del enemigo.
      </p>
    </div>
    
    <!-- REDFLAG -->
    <div class="agente-card red">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M6 4V24" stroke="#f44336" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 4H20L16 9L20 14H6" fill="rgba(244, 67, 54, 0.2)" stroke="#f44336" stroke-width="2" stroke-linejoin="round"/>
            <path d="M10 7V11M10 11H16M16 11V7M16 11V11" stroke="#f44336" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@redflag</h3>
          <span class="agente-role">Escala y Estructura</span>
        </div>
      </div>
      <p class="agente-desc">
        El arquitecto material. Evalúa viabilidad, enforcement, suministro, y régimen de recursos a escala.
      </p>
    </div>
    
    <!-- YELLOWFLAG -->
    <div class="agente-card yellow">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M6 4V24" stroke="#ffc107" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 4H20L16 9L20 14H6" fill="rgba(255, 193, 7, 0.2)" stroke="#ffc107" stroke-width="2" stroke-linejoin="round"/>
            <path d="M9 9H17" stroke="#ffc107" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 9V6M17 9V12" stroke="#ffc107" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@yellowflag</h3>
          <span class="agente-role">Límites y Demarcación</span>
        </div>
      </div>
      <p class="agente-desc">
        El guardián de fronteras. Distingue condiciones de contenido, lo que escapa al diseño, gnosis vs política.
      </p>
    </div>
    
    <!-- ORANGEFLAG -->
    <div class="agente-card orange">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M6 4V24" stroke="#ff9800" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 4H20L16 9L20 14H6" fill="rgba(255, 152, 0, 0.2)" stroke="#ff9800" stroke-width="2" stroke-linejoin="round"/>
            <path d="M10 6L10 12L14 9L10 6Z" fill="#ff9800"/>
            <path d="M14 8C16 7 17 9 17 11" stroke="#ff9800" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@orangeflag</h3>
          <span class="agente-role">Registro y Retórica</span>
        </div>
      </div>
      <p class="agente-desc">
        El crítico del discurso. Evalúa dialéctica vs retórica, adecuación al auditorio, ethos y pathos.
      </p>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     CAPA SISTEMA - NAVEGACIÓN
     ═══════════════════════════════════════════════════════════════════ -->

<section class="agentes-layer">
  <div class="layer-header">
    <div class="layer-icon sistema">⚪</div>
    <h2 class="layer-title">Sistema — Navegación</h2>
    <span class="layer-desc">Orientación y presentación</span>
  </div>
  
  <div class="agentes-grid">
    <!-- VESTIBULO -->
    <div class="agente-card sistema">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="8" y="10" width="12" height="14" rx="1" stroke="#9e9e9e" stroke-width="2" fill="none"/>
            <path d="M8 10L14 5L20 10" stroke="#9e9e9e" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="16" cy="17" r="1.5" fill="#9e9e9e"/>
            <path d="M4 24H24" stroke="#9e9e9e" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@vestibulo</h3>
          <span class="agente-role">Recepción</span>
        </div>
      </div>
      <p class="agente-desc">
        La puerta de entrada. Orienta a visitantes nuevos, identifica perfiles, y guía hacia la carta-puerta relevante.
      </p>
    </div>
    
    <!-- CARTAS PUERTA -->
    <div class="agente-card sistema">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="4" y="8" width="20" height="14" rx="2" stroke="#9e9e9e" stroke-width="2" fill="none"/>
            <path d="M4 10L14 17L24 10" stroke="#9e9e9e" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="21" cy="6" r="3" fill="rgba(0, 200, 83, 0.5)" stroke="#00c853" stroke-width="1"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@cartaspuerta</h3>
          <span class="agente-role">Correspondencia</span>
        </div>
      </div>
      <p class="agente-desc">
        Genera cartas de presentación personalizadas: blueflag (evidencia), blackflag (poder), redflag (viabilidad), yellowflag (límites).
      </p>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     CAPA META - GESTIÓN
     ═══════════════════════════════════════════════════════════════════ -->

<section class="agentes-layer">
  <div class="layer-header">
    <div class="layer-icon meta">⚙️</div>
    <h2 class="layer-title">Meta — Gestión</h2>
    <span class="layer-desc">Coordinación del sistema</span>
  </div>
  
  <div class="agentes-grid">
    <!-- OX -->
    <div class="agente-card meta">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <ellipse cx="14" cy="16" rx="10" ry="8" stroke="#00d4ff" stroke-width="2" fill="none"/>
            <path d="M6 12C4 10 4 6 6 5" stroke="#00d4ff" stroke-width="2" stroke-linecap="round"/>
            <path d="M22 12C24 10 24 6 22 5" stroke="#00d4ff" stroke-width="2" stroke-linecap="round"/>
            <circle cx="10" cy="14" r="2" fill="#00d4ff"/>
            <circle cx="18" cy="14" r="2" fill="#00d4ff"/>
            <ellipse cx="14" cy="20" rx="3" ry="2" stroke="#00d4ff" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@ox</h3>
          <span class="agente-role">Oráculo</span>
        </div>
      </div>
      <p class="agente-desc">
        El meta-coordinador. Conoce todos los agentes, genera documentación, diagnostica inconsistencias, responde "¿qué agente uso para X?".
      </p>
    </div>
    
    <!-- PLUGIN MANAGER -->
    <div class="agente-card meta">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="8" y="4" width="6" height="10" rx="1" stroke="#00d4ff" stroke-width="2" fill="none"/>
            <rect x="14" y="4" width="6" height="10" rx="1" stroke="#00d4ff" stroke-width="2" fill="none"/>
            <path d="M10 14V18" stroke="#00d4ff" stroke-width="2" stroke-linecap="round"/>
            <path d="M18 14V18" stroke="#00d4ff" stroke-width="2" stroke-linecap="round"/>
            <rect x="6" y="18" width="16" height="6" rx="2" stroke="#00d4ff" stroke-width="2" fill="none"/>
            <circle cx="14" cy="21" r="1.5" fill="#00d4ff"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">@pluginmanager</h3>
          <span class="agente-role">Gestor de Extensiones</span>
        </div>
      </div>
      <p class="agente-desc">
        Administra el ecosistema de plugins. Instala, activa, desactiva y actualiza extensiones que añaden capacidades al sistema.
      </p>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     CAPA PLUGINS - EXTENSIONES
     ═══════════════════════════════════════════════════════════════════ -->

<section class="agentes-layer">
  <div class="layer-header">
    <div class="layer-icon plugins">🔌</div>
    <h2 class="layer-title">Plugins — Extensiones</h2>
    <span class="layer-desc">Capacidades modulares</span>
  </div>
  
  <div class="agentes-grid">
    <!-- ARG BOARD -->
    <div class="agente-card plugin">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="4" y="4" width="20" height="20" rx="2" stroke="#9c27b0" stroke-width="2" fill="none"/>
            <circle cx="9" cy="9" r="2" fill="#9c27b0"/>
            <circle cx="19" cy="9" r="2" fill="#9c27b0"/>
            <circle cx="9" cy="19" r="2" fill="#9c27b0"/>
            <circle cx="19" cy="19" r="2" fill="#9c27b0"/>
            <path d="M9 9L19 19M19 9L9 19" stroke="#9c27b0" stroke-width="1.5" opacity="0.5"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">ARG Board</h3>
          <span class="plugin-count">8 agentes</span>
          <span class="agente-role">Juego de Realidad Alternativa</span>
        </div>
      </div>
      <p class="agente-desc">
        Motor transmedia para narrativas interactivas. Incluye: Arrakis, BOE, GitARG, Decoherence, AutomataHeroe, ImpressJS, MBox, PlatformCom.
      </p>
    </div>
    
    <!-- ENCICLOPEDIA -->
    <div class="agente-card plugin">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M6 4H20C21 4 22 5 22 6V22C22 23 21 24 20 24H6" stroke="#9c27b0" stroke-width="2" fill="none"/>
            <path d="M6 4V24" stroke="#9c27b0" stroke-width="2"/>
            <path d="M6 4C6 4 8 4 8 6V22C8 24 6 24 6 24" stroke="#9c27b0" stroke-width="2"/>
            <path d="M11 9H18" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11 13H16" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">Enciclopedia</h3>
          <span class="plugin-count">2 agentes</span>
          <span class="agente-role">Biblioteca de Tomos</span>
        </div>
      </div>
      <p class="agente-desc">
        Repositorio de conocimiento estructurado. Bibliotecario gestiona tomos; HDF-EC especializado en Historia de la Filosofía (61 caps).
      </p>
    </div>
    
    <!-- GH-PAGES -->
    <div class="agente-card plugin">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke="#9c27b0" stroke-width="2" fill="none"/>
            <path d="M14 8V14L18 16" stroke="#9c27b0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 20L10 16" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M22 20L18 16" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">GH-Pages</h3>
          <span class="plugin-count">1 agente</span>
          <span class="agente-role">Publicación Web</span>
        </div>
      </div>
      <p class="agente-desc">
        Despliega contenido a GitHub Pages. Modos fusionar (añadir) y reemplazar (sustituir). Mantiene el sitio público actualizado.
      </p>
    </div>
    
    <!-- FORO SCRAPER -->
    <div class="agente-card plugin">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="4" y="6" width="20" height="16" rx="2" stroke="#9c27b0" stroke-width="2" fill="none"/>
            <path d="M4 11H24" stroke="#9c27b0" stroke-width="2"/>
            <circle cx="7" cy="8.5" r="1" fill="#f44336"/>
            <circle cx="10" cy="8.5" r="1" fill="#ffc107"/>
            <circle cx="13" cy="8.5" r="1" fill="#00c853"/>
            <path d="M8 15H16" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 18H12" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">Foro Scraper</h3>
          <span class="plugin-count">1 agente</span>
          <span class="agente-role">Extracción de Foros</span>
        </div>
      </div>
      <p class="agente-desc">
        Scraping de hilos de foros (vBulletin, phpBB, Discourse) y blogs. Trabajos pausables/reanudables con gestión de estado.
      </p>
    </div>
    
    <!-- AGENT CREATOR -->
    <div class="agente-card plugin">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="10" r="6" stroke="#9c27b0" stroke-width="2" fill="none"/>
            <path d="M14 16V24" stroke="#9c27b0" stroke-width="2"/>
            <path d="M10 20H18" stroke="#9c27b0" stroke-width="2"/>
            <path d="M11 8L14 11L17 8" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="22" cy="6" r="3" stroke="#00c853" stroke-width="1.5" fill="none"/>
            <path d="M22 4.5V7.5M20.5 6H23.5" stroke="#00c853" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">Agent Creator</h3>
          <span class="plugin-count">1 agente</span>
          <span class="agente-role">Fábrica de Agentes</span>
        </div>
      </div>
      <p class="agente-desc">
        Crea agentes especializados combinando agentes base con fuentes de datos. Permite editar, fusionar y desplegar en Teatro ARG.
      </p>
    </div>
    
    <!-- TEATRO -->
    <div class="agente-card plugin">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M4 8C4 6 6 4 14 4C22 4 24 6 24 8" stroke="#9c27b0" stroke-width="2"/>
            <path d="M4 8V20C4 22 6 24 14 24C22 24 24 22 24 20V8" stroke="#9c27b0" stroke-width="2" fill="none"/>
            <circle cx="10" cy="12" r="2" fill="#9c27b0"/>
            <circle cx="18" cy="12" r="2" fill="#9c27b0"/>
            <path d="M10 18C10 18 12 20 14 20C16 20 18 18 18 18" stroke="#9c27b0" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">Teatro</h3>
          <span class="plugin-count">1 agente</span>
          <span class="agente-role">Experiencias Transmedia</span>
        </div>
      </div>
      <p class="agente-desc">
        Orquesta experiencias de teatro interactivo con visualización 3D basada en impress.js. Conecta ARG_BOARD, AGENT_CREATOR y GH-PAGES.
      </p>
    </div>
    
    <!-- SCRUM -->
    <div class="agente-card plugin">
      <div class="agente-header">
        <div class="agente-avatar">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="4" y="4" width="20" height="20" rx="3" stroke="#9c27b0" stroke-width="2" fill="none"/>
            <path d="M4 10H24" stroke="#9c27b0" stroke-width="2"/>
            <path d="M10 10V24" stroke="#9c27b0" stroke-width="1.5"/>
            <rect x="12" y="13" width="4" height="3" rx="0.5" fill="#00c853"/>
            <rect x="18" y="13" width="4" height="3" rx="0.5" fill="#ffc107"/>
            <rect x="12" y="18" width="4" height="3" rx="0.5" fill="#2196f3"/>
          </svg>
        </div>
        <div class="agente-info">
          <h3 class="agente-name">Scrum</h3>
          <span class="plugin-count">1 agente</span>
          <span class="agente-role">Gestión Ágil</span>
        </div>
      </div>
      <p class="agente-desc">
        Protocolo de 5 fases para backlogs: Planificar, Borrador, Aprobar, Tracking y Cerrar. Separa DISCO (borradores) de oficiales.
      </p>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     FOOTER CTA
     ═══════════════════════════════════════════════════════════════════ -->

<div class="agentes-cta">
  <h3>¿Listo para escribir con el colectivo?</h3>
  <p>
    Los agentes de Scriptorium están disponibles como prompts de sistema para Claude, GPT-4, y otros LLMs.
  </p>
  <a href="https://github.com/escrivivir-co/aleph-scriptorium" class="cta-button">
    Ver en GitHub →
  </a>
</div>

</div>
