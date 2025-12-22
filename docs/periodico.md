---
layout: default
title: Periódico
permalink: /periodico/
---

<style>
/* === ESTÉTICA HACKER === */
.masthead {
  border: 2px solid #fff;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  position: relative;
  background: #000;
}
.masthead::before {
  content: "$ cat /dev/truth";
  position: absolute;
  top: -0.7rem;
  left: 1rem;
  background: #000;
  padding: 0 0.5rem;
  font-family: monospace;
  font-size: 0.8rem;
  color: #666;
}
.masthead h1 {
  font-family: 'Courier New', monospace;
  font-weight: 900;
  letter-spacing: 0.3rem;
  margin: 0;
  font-size: 2.5rem;
  text-transform: uppercase;
}
.masthead .tagline {
  font-family: monospace;
  color: #888;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
.edition-bar {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #333;
  border-bottom: 3px double #fff;
  padding: 0.5rem 0;
  margin: 1rem 0 2rem 0;
  font-family: monospace;
  font-size: 0.85rem;
}
.edition-bar .left { color: #888; }
.edition-bar .center { font-weight: bold; }
.edition-bar .right { color: #888; }

/* TITULAR PRINCIPAL */
.headline-box {
  background: #fff;
  color: #000;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  text-align: center;
}
.headline-box h2 {
  font-family: 'Georgia', serif;
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
  line-height: 1.4;
}

/* ARTÍCULOS */
.article {
  border: 1px solid #333;
  margin: 1.5rem 0;
  position: relative;
}
.article-header {
  background: #111;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.article-flag {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}
.article-meta {
  font-family: monospace;
  font-size: 0.75rem;
  color: #666;
}
.article-section {
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
.article-body {
  padding: 1.5rem;
}
.article-body h3 {
  font-family: 'Georgia', serif;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}
.article-body p {
  line-height: 1.7;
  color: #1a1a1a;
}
.article-body strong {
  color: #000;
  font-weight: 700;
}
.article-link {
  display: block;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #333;
  font-family: monospace;
  font-size: 0.85rem;
}
.article-link a {
  color: #1a1a1a;
  text-decoration: underline;
}
.article-link a:hover {
  color: #000;
  text-decoration-thickness: 2px;
}
.article-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #333;
  filter: grayscale(100%) contrast(1.1);
}

/* SECCIONES */
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

/* TESIS */
.thesis-box {
  border: 2px solid #fff;
  padding: 2rem;
  margin: 2rem 0;
  background: #080808;
}
.thesis-box h3 {
  font-family: monospace;
  margin: 0 0 1.5rem 0;
  color: #888;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
.thesis-box ol {
  margin: 0;
  padding-left: 1.5rem;
}
.thesis-box li {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #aaa;
}
.thesis-box strong {
  color: #fff;
}

/* MÉTODO */
.method-table {
  width: 100%;
  border-collapse: collapse;
  font-family: monospace;
  font-size: 0.85rem;
}
.method-table th {
  text-align: left;
  padding: 0.8rem;
  background: #111;
  border: 1px solid #333;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}
.method-table td {
  padding: 0.8rem;
  border: 1px solid #333;
  color: #aaa;
}
.method-table tr:hover {
  background: #0a0a0a;
}

/* FOOTER PERIÓDICO */
.paper-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 3px double #333;
  font-family: monospace;
}
.paper-footer a {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #333;
}
.paper-footer a:hover {
  color: #fff;
  border-color: #fff;
}
</style>

<!-- CABECERA DEL PERIÓDICO -->
<div class="masthead">
  <h1>ESCRIVIVIR.CO</h1>
  <div class="tagline">// noticias posicionadas · análisis doctrinal · método 5W + banderas</div>
</div>

<div class="edition-bar">
  <span class="left">ISSN: 0000-0000</span>
  <span class="center">Nº 1 · DICIEMBRE 2025</span>
  <span class="right">Aleph Scriptorium</span>
</div>

<!-- TITULAR PRINCIPAL -->
<div class="headline-box">
  <h2>«La verdad ya no es un dato: es un campo de batalla donde instituciones, infraestructuras y lenguajes compiten por definir qué cuenta como real.»</h2>
</div>

---

<div class="section-header">Collage Editorial — 5 piezas</div>

<!-- ARTÍCULO 1: GEOPOLÍTICA -->
<div class="article">
  <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/ARCHIVO/DISCO/Diciembre_25_Geopolitica/imagen-cabecera.png" alt="Nobel Venezuela" class="article-img">
  <div class="article-header">
    <span class="article-flag">⚫</span>
    <div>
      <div class="article-section">Geopolítica</div>
      <div class="article-meta">S08-T027 · BLACKFLAG</div>
    </div>
  </div>
  <div class="article-body">
    <h3>El símbolo capturado</h3>
    <p>El <strong>Premio Nobel de la Paz</strong> ya no premia la paz: financia operaciones de cambio de régimen. Cuando Assange denuncia a la Fundación Nobel por complicidad en crímenes de guerra, no ataca un premio: ataca un <strong>nodo logístico de la guerra híbrida</strong>. Oslo pone la fuerza moral; Washington pone los barcos.</p>
    <div class="article-link">
      → <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/NOTICIAS/S08-T027-2025-12-geopolitica-nobel-venezuela-paz-como-arma.md">La Paz como Arma [leer en GitHub]</a>
    </div>
  </div>
</div>

<!-- ARTÍCULO 2: TECNOLOGÍA -->
<div class="article">
  <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/ARCHIVO/DISCO/Diciembre_25_Alineamiento/imagen-cabecera.png" alt="OpenAI Gobernanza" class="article-img">
  <div class="article-header">
    <span class="article-flag">🔴</span>
    <div>
      <div class="article-section">Tecnología</div>
      <div class="article-meta">S08-T028 · REDFLAG</div>
    </div>
  </div>
  <div class="article-body">
    <h3>La misión como cobertura</h3>
    <p><strong>OpenAI</strong> mantiene el lenguaje de "beneficio para la humanidad" mientras construye infraestructura crítica que requiere cooperación estatal. La bicefalia nonprofit/mercado funciona como caballo de Troya: el conflicto visible (misión vs lucro) oculta la operación real (control de compute, energía, permisos).</p>
    <div class="article-link">
      → <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/NOTICIAS/S08-T028-2025-12-tecnologia-openai-gobernanza-mision-cobertura.md">Misión como Cobertura [leer en GitHub]</a>
    </div>
  </div>
</div>

<!-- ARTÍCULO 3: MÉTODO -->
<div class="article">
  <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/ARCHIVO/DISCO/Diciembre_25_humanismo_extremo.md/imagen-cabecera.png" alt="Yellowflag" class="article-img">
  <div class="article-header">
    <span class="article-flag">🟡</span>
    <div>
      <div class="article-section">Método</div>
      <div class="article-meta">S08-T029 · YELLOWFLAG</div>
    </div>
  </div>
  <div class="article-body">
    <h3>El auditor de límites</h3>
    <p>¿Quién audita al auditor? Cuando un sistema de escritura política toca la vida interior (autoconocimiento, sentido, fines), el riesgo de captura es máximo. <strong>Yellowflag</strong> nace como bandera de precaución: señala dónde el diseño político pretende capturar lo que no le pertenece. Condiciones sí; contenido no.</p>
    <div class="article-link">
      → <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/NOTICIAS/S08-T029-2025-12-metodo-validacion-perspectivas-yellowflag.md">El método de validar perspectivas [leer en GitHub]</a>
    </div>
  </div>
</div>

<!-- ARTÍCULO 4: EPISTEMOLOGÍA -->
<div class="article">
  <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/ARCHIVO/DISCO/Diciembre_25_materia/imagen-cabecera.png" alt="Falsabilidad" class="article-img">
  <div class="article-header">
    <span class="article-flag">🔵</span>
    <div>
      <div class="article-section">Epistemología</div>
      <div class="article-meta">S08-T030 · BLUEFLAG</div>
    </div>
  </div>
  <div class="article-body">
    <h3>La frontera epistémica</h3>
    <p>En un foro generalista, usuarios debaten física fundamental. El criterio de <strong>falsabilidad</strong> se invoca como arma retórica de exclusión, no como método compartido. Se exige predicción pero se premia entretenimiento. El foro importa tecnología de frontera (credencial, veto, tono) sin importar el coste material de la verdad.</p>
    <div class="article-link">
      → <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/NOTICIAS/S08-T030-2025-12-epistemologia-demarcacion-falsabilidad-frontera-plebeya.md">La falsabilidad como arma de frontera [leer en GitHub]</a>
    </div>
  </div>
</div>

<!-- ARTÍCULO 5: POÉTICA -->
<div class="article">
  <img src="https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/main/ARCHIVO/DISCO/Diciembre_25_Poesía_como_vias_alternativas.md/imagen-cabecera.png" alt="Poesía" class="article-img">
  <div class="article-header">
    <span class="article-flag">🟠</span>
    <div>
      <div class="article-section">Poética</div>
      <div class="article-meta">S08-T031 · ORANGEFLAG</div>
    </div>
  </div>
  <div class="article-body">
    <h3>El futuro como construcción</h3>
    <p>Aristóteles distinguía Historia (lo que ocurrió) de Poesía (lo que podría ocurrir). Hoy esa distinción es un <strong>arma política</strong>: quien controla qué es "realista" bloquea los futuros alternativos. Recuperar la Poética no es refugio estético; es ingeniería inversa de la realidad dada.</p>
    <div class="article-link">
      → <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/NOTICIAS/S08-T031-2025-12-poesia-vias-alternativas-aristoteles-nietzsche-bueno.md">Poesía como vías alternativas [leer en GitHub]</a>
    </div>
  </div>
</div>

---

<div class="section-header">Tesis del número</div>

<div class="thesis-box">
  <h3>// diagnóstico convergente</h3>
  <ol>
    <li><strong>Las instituciones de verdad funcionan como infraestructura de poder.</strong> El Nobel legitima guerras; OpenAI usa "safety" como barrera de entrada; el foro usa "falsabilidad" como veto social.</li>
    <li><strong>La captura no es frontal; es semántica.</strong> No prohíben: redefinen. No censuran: desplazan el perímetro de lo decible.</li>
    <li><strong>La defensa requiere arquitectura, no solo denuncia.</strong> Por eso construimos auditores (Banderas), métodos (5W), y distinciones operativas (condiciones vs contenido).</li>
  </ol>
</div>

---

<div class="section-header">Redacción — Material de trabajo</div>

<style>
.redaccion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.redaccion-card {
  border: 1px solid #333;
  background: #0a0a0a;
  padding: 1rem;
  transition: all 0.2s ease;
}
.redaccion-card:hover {
  border-color: #fff;
  background: #111;
}
.redaccion-card h4 {
  font-family: monospace;
  font-size: 0.85rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
}
.redaccion-card p {
  font-size: 0.75rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
}
.redaccion-card .flag {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.redaccion-card a {
  color: #888;
  text-decoration: none;
  display: block;
}
.redaccion-card a:hover {
  color: #fff;
}
.archivo-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  font-family: monospace;
  font-size: 0.85rem;
}
.archivo-link:hover {
  border-color: #fff;
  color: #fff;
}
</style>

<div class="redaccion-grid">
  <div class="redaccion-card">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/Diciembre_25_Geopolitica">
      <div class="flag">⚫</div>
      <h4>Geopolítica</h4>
      <p>Nobel, Venezuela, Assange. La paz como arma.</p>
    </a>
  </div>
  <div class="redaccion-card">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/Diciembre_25_Alineamiento">
      <div class="flag">🔴</div>
      <h4>Alineamiento</h4>
      <p>OpenAI, gobernanza IA, misión como cobertura.</p>
    </a>
  </div>
  <div class="redaccion-card">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/Diciembre_25_humanismo_extremo.md">
      <div class="flag">🟡</div>
      <h4>Humanismo Extremo</h4>
      <p>Gnosis, política, condiciones de vida filosófica.</p>
    </a>
  </div>
  <div class="redaccion-card">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/Diciembre_25_materia">
      <div class="flag">🔵</div>
      <h4>Materia</h4>
      <p>Falsabilidad, demarcación, frontera epistémica.</p>
    </a>
  </div>
  <div class="redaccion-card">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/Diciembre_25_Poesía_como_vias_alternativas.md">
      <div class="flag">🟠</div>
      <h4>Poesía</h4>
      <p>Aristóteles, Nietzsche, Bueno. Vías alternativas.</p>
    </a>
  </div>
  <div class="redaccion-card">
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/Foro_t8941392">
      <div class="flag">📁</div>
      <h4>Foro Scraping</h4>
      <p>Criterio de demarcación científica (hilos).</p>
    </a>
  </div>
</div>

<a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/NOTICIAS" class="archivo-link">
  📰 Ver todas las planas publicadas →
</a>

---

<div class="paper-footer">
  <a href="{{ site.baseurl }}/">← VOLVER A ALEPH SCRIPTORIUM</a>
</div>
