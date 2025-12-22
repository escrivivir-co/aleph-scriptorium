---
layout: default
title: Aleph Scriptorium
permalink: /
---

<style>
/* === ESTÉTICA HACKER — PORTADA === */

/* HERO */
.hero {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 2rem;
}
.hero-banner {
  width: 100%;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  border: 2px solid #fff;
  filter: grayscale(80%) contrast(1.2);
}
.hero-banner:hover {
  filter: grayscale(0%) contrast(1);
  transition: filter 0.3s ease;
}
.hero h1 {
  font-family: 'Courier New', monospace;
  font-size: 2.5rem;
  letter-spacing: 0.3rem;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
}
.hero .tagline {
  font-size: 1.2rem;
  color: #888;
  font-style: italic;
}
.hero .terminal-prompt {
  font-family: monospace;
  font-size: 0.9rem;
  color: #666;
  margin-top: 1.5rem;
}
.hero .terminal-prompt::before {
  content: "$ ";
  color: #444;
}

/* ECOSYSTEM GRID */
.ecosystem {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.eco-card {
  border: 2px solid #333;
  background: #080808;
  position: relative;
  transition: border-color 0.2s ease;
}
.eco-card:hover {
  border-color: #fff;
}
.eco-card-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-bottom: 1px solid #333;
  filter: grayscale(100%) contrast(1.1);
}
.eco-card:hover .eco-card-img {
  filter: grayscale(50%) contrast(1);
}
.eco-card-body {
  padding: 1.5rem;
}
.eco-card-label {
  font-family: monospace;
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-bottom: 0.5rem;
}
.eco-card h3 {
  margin: 0 0 0.8rem 0;
  font-family: 'Courier New', monospace;
}
.eco-card h3 a {
  color: #fff;
  text-decoration: none;
}
.eco-card h3 a:hover {
  text-decoration: underline;
}
.eco-card p {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}
.eco-card .eco-link {
  display: block;
  margin-top: 1rem;
  font-family: monospace;
  font-size: 0.8rem;
  color: #666;
}
.eco-card .eco-link:hover {
  color: #fff;
}

/* SECTION HEADERS */
.section-header {
  font-family: monospace;
  font-size: 0.8rem;
  color: #666;
  border-bottom: 1px solid #333;
  padding-bottom: 0.3rem;
  margin: 3rem 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
}
.section-header::before {
  content: "## ";
  color: #444;
}

/* ARCHITECTURE BOX */
.arch-box {
  background: #0a0a0a;
  border: 1px solid #333;
  padding: 2rem;
  margin: 2rem 0;
  font-family: monospace;
  overflow-x: auto;
}
.arch-box pre {
  margin: 0;
  color: #aaa;
}

/* AUDITORS LIST */
.auditors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.auditor {
  padding: 1rem;
  border: 1px solid #222;
  background: #080808;
  font-size: 0.85rem;
}
.auditor strong {
  color: #fff;
}
.auditor span {
  color: #888;
  display: block;
  margin-top: 0.3rem;
  font-size: 0.8rem;
}

/* LICENSE BOX */
.license-box {
  border: 2px dashed #333;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  position: relative;
}
.license-box::before {
  content: "LICENSE";
  position: absolute;
  top: -0.6rem;
  left: 1rem;
  background: #000;
  padding: 0 0.5rem;
  font-family: monospace;
  font-size: 0.7rem;
  color: #666;
  letter-spacing: 0.1rem;
}
.license-box h4 {
  font-family: 'Courier New', monospace;
  margin: 0 0 0.8rem 0;
  color: #fff;
}
.license-box p {
  color: #888;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}
.license-box a {
  color: #aaa;
}

/* STATUS TABLE */
.status-table {
  width: 100%;
  border-collapse: collapse;
  font-family: monospace;
  font-size: 0.85rem;
  margin: 1rem 0;
}
.status-table td {
  padding: 0.6rem 1rem;
  border: 1px solid #333;
}
.status-table td:first-child {
  color: #666;
  width: 30%;
}
.status-table td:last-child {
  color: #fff;
}

/* FOOTER PORTAL */
.portal-footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 3px double #333;
}
.portal-footer p {
  font-family: monospace;
  color: #666;
  font-size: 0.85rem;
}
.portal-footer a {
  color: #888;
  margin: 0 1rem;
  text-decoration: none;
  border-bottom: 1px dotted #444;
}
.portal-footer a:hover {
  color: #fff;
  border-color: #fff;
}

/* ANNOUNCEMENT BANNER */
.announcement {
  background: linear-gradient(90deg, #0d1117 0%, #1a1a2e 50%, #0d1117 100%);
  border: 1px solid #00d4ff;
  padding: 1rem 2rem;
  margin: 0 0 2rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.announcement::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
  animation: shimmer 3s infinite;
}
@keyframes shimmer {
  0% { transform: translateX(0); }
  100% { transform: translateX(50%); }
}
.announcement .badge {
  display: inline-block;
  background: #00d4ff;
  color: #000;
  padding: 0.2rem 0.6rem;
  font-family: monospace;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-right: 0.8rem;
}
.announcement span {
  color: #ccc;
  font-size: 0.95rem;
}
.announcement a {
  color: #00d4ff;
  text-decoration: none;
  font-weight: bold;
}
.announcement a:hover {
  text-decoration: underline;
}
</style>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- ANNOUNCEMENT -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="announcement">
  <span class="badge">Nuevo</span>
  <span>¿Primera vez aquí? Lee la <a href="{{ site.baseurl }}/leeme/">Guía de Inicio Rápido</a> — instalación, uso y costes en 15 minutos.</span>
</div>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- HERO -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="hero">
  <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/aleph-scriptorium-banner.png" alt="Aleph Scriptorium" class="hero-banner">
  <h1>ℵ Aleph Scriptorium</h1>
  <p class="tagline">El taller de escritura donde la IA trabaja para ti, no al revés.</p>
  <p class="terminal-prompt">cat /dev/brain | grep insight > ARCHIVO/</p>
</div>

---

<div class="section-header">Ecosistema</div>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- ECOSYSTEM GRID -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="ecosystem">
  
  <!-- VIBEBITACORA -->
  <div class="eco-card">
    <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/vibe-bitacora-banner.png" alt="VibeBitacora" class="eco-card-img">
    <div class="eco-card-body">
      <div class="eco-card-label">// meta-framework</div>
      <h3><a href="https://github.com/escrivivir-co/vibe-bitacora">VibeBitacora</a></h3>
      <p>Los Astilleros donde se forjan las naves. El meta-framework que origina todos los demás: agentes que construyen agentes, navegación por islas de conocimiento.</p>
      <a href="https://github.com/escrivivir-co/vibe-bitacora" class="eco-link">→ github.com/escrivivir-co/vibe-bitacora</a>
    </div>
  </div>
  
  <!-- ALEPH SCRIPTORIUM -->
  <div class="eco-card">
    <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/aleph-scriptorium-banner.png" alt="Aleph Scriptorium" class="eco-card-img">
    <div class="eco-card-body">
      <div class="eco-card-label">// scriptorium</div>
      <h3><a href="https://github.com/escrivivir-co/aleph-scriptorium">Aleph Scriptorium</a></h3>
      <p>Sistema de escritura asistida para proyectos de largo aliento. Agentes, auditores, prompts e instrucciones para textos complejos.</p>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium" class="eco-link">→ github.com/escrivivir-co/aleph-scriptorium</a>
    </div>
  </div>
  
  <!-- FUNDACIÓN -->
  <div class="eco-card">
    <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/fundacion-banner.png" alt="Fundación" class="eco-card-img">
    <div class="eco-card-body">
      <div class="eco-card-label">// texto fundacional</div>
      <h3><a href="{{ site.baseurl }}/fundacion/">Fundación</a></h3>
      <p>Texto político en 12 capítulos (2026). Síntesis operativa del pensamiento constitucional, contractual y materialista.</p>
      <a href="{{ site.baseurl }}/fundacion/" class="eco-link">→ leer índice y capítulos</a>
    </div>
  </div>
  
</div>

---

<div class="section-header">Arquitectura de Auditores</div>

<div class="arch-box">
<pre>
                    ┌─────────────┐
                    │   ALEPH     │ ← Orquestador
                    │ (redacción) │
                    └──────┬──────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    ▼            ▼         ▼         ▼            ▼
┌────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐ ┌────────┐
│BLUEFLAG│ │BLACKFLAG │ │REVISOR │ │ REDFLAG  │ │YELLOW- │
│ Verdad │ │ Sombras  │ │Doctrina│ │Estructura│ │ FLAG   │
└────────┘ └──────────┘ └────────┘ └──────────┘ │Límites │
                                                └────────┘
                           │
                    ┌──────┴──────┐
                    │ ORANGEFLAG  │ ← Registro
                    └─────────────┘
</pre>
</div>

<div class="auditors">
  <div class="auditor">🔵 <strong>Blueflag</strong><span>Verdad · Evidencia · Falsificabilidad</span></div>
  <div class="auditor">⚫ <strong>Blackflag</strong><span>Poder · Sombras · Coste represivo</span></div>
  <div class="auditor">🔴 <strong>Redflag</strong><span>Viabilidad · Escala · Régimen material</span></div>
  <div class="auditor">🟡 <strong>Yellowflag</strong><span>Límites · Condiciones vs contenido</span></div>
  <div class="auditor">🟠 <strong>Orangeflag</strong><span>Registro · Dialéctica vs retórica</span></div>
  <div class="auditor">📋 <strong>Revisor</strong><span>Coherencia doctrinal con ARCHIVO</span></div>
</div>

---

<div class="section-header">Productos</div>

| Producto | Descripción |
|----------|-------------|
| [**Fundación**]({{ site.baseurl }}/fundacion/) | Texto fundacional en 12 capítulos (2026) |
| [**Periódico**]({{ site.baseurl }}/periodico/) | periodico posicionadas con método 5W + Banderas |

---

<div class="section-header">Status</div>

<table class="status-table">
  <tr><td>Fecha</td><td>2025-12-21</td></tr>
  <tr><td>Sprint</td><td>0 (Bootstrap)</td></tr>
  <tr><td>Scriptorium</td><td>100% ✓</td></tr>
  <tr><td>Fundación</td><td>85% (en cierre)</td></tr>
  <tr><td>Periódico</td><td>Nº 1 publicado</td></tr>
</table>

---

<div class="section-header">Licencia</div>

<div class="license-box">
  <h4>Animus Iocandi Public License (AIPL) v1.0</h4>
  <p>
    <strong>El framework</strong> (estructura, agentes, instrucciones): libre para usar, modificar y distribuir.<br>
    <strong>El contenido "Fundación"</strong>: © Escrivivir.co 2025, todo izquierdos SIN derechos reservados.
  </p>
  <p style="margin-top: 1rem;">
    → <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/LICENSE.md">Leer licencia completa</a> 
    <span style="color: #444;">(incluye cláusulas sobre procrastinación y crisis existenciales)</span>
  </p>
</div>

---

<div class="section-header">Repositorio</div>

| Recurso | Enlace |
|---------|--------|
| README completo | [README.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/README.md) |
| Protocolo DevOps | [.github/DEVOPS.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/DEVOPS.md) |
| Agentes | [.github/agents/](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/agents) |
| Marco conceptual | [ARCHIVO/marco/](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/marco) |
| Plugins | [.github/plugins/](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/plugins) |

---

<div class="portal-footer">
  <p>// navegación del ecosistema</p>
  <a href="https://escrivivir.co">escrivivir.co</a>
  <a href="https://github.com/escrivivir-co/vibe-bitacora">VibeBitacora</a>
  <a href="https://github.com/escrivivir-co/aleph-scriptorium">GitHub</a>
  <a href="{{ site.baseurl }}/periodico/">Periódico</a>
</div>
