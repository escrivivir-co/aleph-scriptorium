---
layout: default
title: Archivo
permalink: /archivo/
---

<style>
/* === ESTILOS ARCHIVO (sobrio, profesional) === */
.archivo-page {
  --archivo-bg: #fafafa;
  --archivo-card-bg: #fff;
  --archivo-border: #e0e0e0;
  --archivo-text: #1a1a1a;
  --archivo-muted: #666;
  --archivo-accent: #333;
  --archivo-code-bg: #f4f4f4;
}

.archivo-header {
  text-align: center;
  padding: 2rem 0 1rem;
  border-bottom: 2px solid var(--archivo-border);
  margin-bottom: 2rem;
}

.archivo-header h1 {
  font-family: 'Courier New', monospace;
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.3rem;
  margin-bottom: 0.5rem;
}

.archivo-header .tagline {
  font-size: 1.1rem;
  color: var(--archivo-muted);
}

/* Secciones */
.archivo-section {
  margin: 3rem 0;
}

.archivo-section h2 {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: var(--archivo-muted);
  border-bottom: 1px solid var(--archivo-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.archivo-section h2::before {
  content: "// ";
  color: #999;
}

/* Cards Grid */
.archivo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.archivo-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.archivo-grid-6 {
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.archivo-card {
  background: var(--archivo-card-bg);
  border: 1px solid var(--archivo-border);
  padding: 1.5rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.archivo-card:hover {
  border-color: var(--archivo-accent);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.archivo-card h3 {
  font-family: 'Georgia', serif;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--archivo-text);
}

.archivo-card .badge {
  display: inline-block;
  font-family: monospace;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--archivo-code-bg);
  border: 1px solid var(--archivo-border);
  margin-bottom: 0.75rem;
}

.archivo-card .badge.activo {
  background: #e8f5e9;
  border-color: #a5d6a7;
  color: #2e7d32;
}

.archivo-card .badge.pasado {
  background: #fff3e0;
  border-color: #ffcc80;
  color: #ef6c00;
}

.archivo-card p {
  font-size: 0.9rem;
  color: var(--archivo-muted);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.archivo-card ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--archivo-muted);
}

.archivo-card ul li {
  margin-bottom: 0.3rem;
}

.archivo-card .link {
  display: block;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--archivo-accent);
  text-decoration: none;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--archivo-border);
}

.archivo-card .link:hover {
  text-decoration: underline;
}

/* Cartas-puerta pequeñas */
.carta-mini {
  text-align: center;
  padding: 1rem;
}

.carta-mini .flag {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.carta-mini h4 {
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.carta-mini .desc {
  font-size: 0.75rem;
  color: var(--archivo-muted);
}

/* Diagrama de flujo */
.flujo-box {
  background: var(--archivo-code-bg);
  border: 1px solid var(--archivo-border);
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre;
}

/* Proceso cards */
.proceso-card {
  border-left: 3px solid var(--archivo-accent);
}

.proceso-card .numero {
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: var(--archivo-muted);
  margin-bottom: 0.5rem;
}

.proceso-card code {
  background: var(--archivo-code-bg);
  padding: 0.1rem 0.4rem;
  font-size: 0.8rem;
  font-family: monospace;
}

/* Agentes grid */
.agentes-section {
  margin-top: 1rem;
}

.agentes-capa {
  margin-bottom: 1.5rem;
}

.agentes-capa h4 {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--archivo-muted);
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px dashed var(--archivo-border);
}

.agentes-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.agente-item {
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background: var(--archivo-code-bg);
  border: 1px solid var(--archivo-border);
}

.agente-item.ui { border-left: 3px solid #4caf50; }
.agente-item.backend { border-left: 3px solid #2196f3; }
.agente-item.sistema { border-left: 3px solid #9e9e9e; }
.agente-item.meta { border-left: 3px solid #00bcd4; }
.agente-item.plugin { border-left: 3px solid #9c27b0; }

/* Tabla simple */
.archivo-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin-top: 1rem;
}

.archivo-table th,
.archivo-table td {
  text-align: left;
  padding: 0.6rem;
  border-bottom: 1px solid var(--archivo-border);
}

.archivo-table th {
  font-weight: 600;
  background: var(--archivo-code-bg);
}

/* Footer */
.archivo-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--archivo-border);
}

.archivo-footer a {
  color: var(--archivo-muted);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .archivo-grid-6 {
    grid-template-columns: repeat(2, 1fr);
  }
  .flujo-box {
    font-size: 0.65rem;
  }
}
</style>

<div class="archivo-page">

<div class="archivo-header">
  <h1>ARCHIVO</h1>
  <p class="tagline">Memoria permanente del Scriptorium — Doctrina, datos y flujos de integración</p>
</div>

---

<div class="archivo-section">
<h2>Vestíbulo — Entrada según perfil</h2>

El ARCHIVO se accede desde diferentes puertas según lo que el lector valore. Cada **carta-puerta** presenta el proyecto por un eje distinto: método, evidencia, poder, viabilidad, integración o registro.

<div class="archivo-grid archivo-grid-6">
  <div class="archivo-card carta-mini">
    <div class="flag">🔭</div>
    <h4>Vista Total</h4>
    <p class="desc">Completitud y método</p>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-vista-total.md" class="link">→ Leer carta</a>
  </div>
  <div class="archivo-card carta-mini">
    <div class="flag">🔵</div>
    <h4>Blueflag</h4>
    <p class="desc">Evidencia y falsificabilidad</p>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-blueflag.md" class="link">→ Leer carta</a>
  </div>
  <div class="archivo-card carta-mini">
    <div class="flag">⚫</div>
    <h4>Blackflag</h4>
    <p class="desc">Poder y adversario</p>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-blackflag.md" class="link">→ Leer carta</a>
  </div>
  <div class="archivo-card carta-mini">
    <div class="flag">🔴</div>
    <h4>Redflag</h4>
    <p class="desc">Escala y viabilidad</p>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-redflag.md" class="link">→ Leer carta</a>
  </div>
  <div class="archivo-card carta-mini">
    <div class="flag">🟡</div>
    <h4>Yellowflag</h4>
    <p class="desc">Límites e integración</p>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-yellowflag.md" class="link">→ Leer carta</a>
  </div>
  <div class="archivo-card carta-mini">
    <div class="flag">🟠</div>
    <h4>Orangeflag</h4>
    <p class="desc">Registro e interlocución</p>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-orangeflag.md" class="link">→ Leer carta</a>
  </div>
</div>

Para identificar tu perfil automáticamente, invoca `@vestibulo` en el chat de Copilot. El agente te hará unas preguntas breves y te asignará la carta-puerta adecuada, guardando tu ficha en `ARCHIVO/PERFILES/`.

</div>

---

<div class="archivo-section">
<h2>Ejes Doctrinales — Contenido permanente</h2>

<div class="archivo-grid archivo-grid-3">
  <div class="archivo-card">
    <span class="badge activo">ACTIVO</span>
    <h3>Marco Conceptual</h3>
    <p>Herramientas para traducir indignación en arquitectura política. La vacuna anti-naïf.</p>
    <ul>
      <li>Selección sistémica y captura</li>
      <li>Acción colectiva (Olson, Michels)</li>
      <li>Geopolítica 2025</li>
      <li>Soberanía (Rousseau)</li>
      <li>Hybris y crematística (Aristóteles)</li>
      <li>+10 documentos más</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/marco" class="link">→ 15 documentos</a>
  </div>
  <div class="archivo-card">
    <span class="badge pasado">MEMORIA</span>
    <h3>Diagnóstico</h3>
    <p>Estado de la cuestión. El lector ya conoce este material; no se recorre, se asume.</p>
    <ul>
      <li>SOTA del lado izquierdo</li>
      <li>Estructura de sentimiento</li>
      <li>Patrón reaccionario</li>
      <li>Fe lúcida y épica</li>
      <li>Carisma vs responsabilidad</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/diagnostico" class="link">→ 5 documentos</a>
  </div>
  <div class="archivo-card">
    <span class="badge pasado">MEMORIA</span>
    <h3>Justificación</h3>
    <p>Por qué este proyecto. El texto asume que ya sabemos esto; es punto de partida, no tema.</p>
    <ul>
      <li>Lo tardío como régimen</li>
      <li>Secuencia asco → huida → odio</li>
      <li>Posverdad como gobierno técnico</li>
      <li>Fractura del mundo común</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/justificacion" class="link">→ 4 documentos</a>
  </div>
</div>

</div>

---

<div class="archivo-section">
<h2>Ciclos de Datos — Flujos DISCO ↔ ARCHIVO</h2>

El **DISCO** son carpetas temporales que el usuario conecta y desconecta del Scriptorium. El **ARCHIVO** es memoria permanente. Los plugins procesan datos entre ambos.

<div class="flujo-box">
┌─────────────────────────────────────────────────────────────────┐
│                    FUENTES EXTERNAS                             │
│       Foros · Blogs · PDFs · Transcripciones · Tomos            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  DISCO — Carpetas temporales (conectar/desconectar)             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │Diciembre_25_ │ │ Foro_t89... │ │  Blog_xxx_  │            │
│  │  Geopolitica │ │   (hilo)     │ │   (entries) │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ FORO-SCRAPER │    │ ENCICLOPEDIA │    │AGENT-CREATOR │
│  @foroscraper│    │ @bibliotecario│   │@agentcreator │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  extraer-archivar.prompt.md                                     │
│  Clasificar por eje: marco / diagnóstico / justificación        │
│  Auditar con 5 Banderas antes de archivar                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  ARCHIVO — Memoria permanente                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌──────────┐           │
│  │marco │ │diagn.│ │justif│ │NOTICIAS│ │PERFILES  │           │
│  └──────┘ └──────┘ └──────┘ └────────┘ └──────────┘           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PERIÓDICO   │    │  ARG-BOARD   │    │   GH-PAGES   │
│ @periodico   │    │  @arrakis    │    │  @ghpages    │
│ 5W + Banderas│    │Teatro transm.│    │ Publicar web │
└──────────────┘    └──────────────┘    └──────────────┘
</div>

<div class="archivo-grid" style="margin-top: 2rem;">
  <div class="archivo-card proceso-card">
    <div class="numero">01</div>
    <h3>Extracción estándar</h3>
    <p>Volcar contenido desde DISCO al ARCHIVO clasificándolo por eje doctrinal.</p>
    <p><code>extraer-archivar.prompt.md</code></p>
    <ul>
      <li>Lee PDFs, transcripciones, capturas</li>
      <li>Clasifica: marco / diagnóstico / justificación</li>
      <li>Extiende documentos existentes (no canibaliza)</li>
      <li>Genera commit conforme a DevOps</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/prompts/extraer-archivar.prompt.md" class="link">→ Ver prompt</a>
  </div>
  <div class="archivo-card proceso-card">
    <div class="numero">02</div>
    <h3>Consulta de tomos</h3>
    <p>Conexión con ENCICLOPEDIA para búsquedas temporales y temáticas.</p>
    <p><code>@plugin_ox_enciclopedia</code></p>
    <ul>
      <li>Tomos académicos indexados (61 caps. HDF)</li>
      <li>Búsqueda por período histórico</li>
      <li>Búsqueda por tema/concepto</li>
      <li>Conversaciones condicionadas por contexto</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/plugins/enciclopedia" class="link">→ Ver plugin</a>
  </div>
  <div class="archivo-card proceso-card">
    <div class="numero">03</div>
    <h3>Crear agentes</h3>
    <p>Encarnar agentes base con conocimiento de fuentes remotas.</p>
    <p><code>@plugin_ox_agentcreator</code></p>
    <ul>
      <li>Combina agente base (ej. @yellowflag)</li>
      <li>Añade fuente de DISCO (ej. Foro_t8941392)</li>
      <li>Genera agente especializado</li>
      <li>Despliega en ARG-BOARD como personaje</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/plugins/agent-creator" class="link">→ Ver plugin</a>
  </div>
  <div class="archivo-card proceso-card">
    <div class="numero">04</div>
    <h3>Producir noticias</h3>
    <p>Convertir material de DISCO en planas noticieras con método 5W + Banderas.</p>
    <p><code>@periodico</code></p>
    <ul>
      <li>Fase EDITAR: Alice (editora) + Bob (escritor)</li>
      <li>Auditoría con 5 Banderas</li>
      <li>Fase PUBLICAR: generar plana final</li>
      <li>Prompt de imagen editorial</li>
    </ul>
    <a href="{{ site.baseurl }}/periodico/" class="link">→ Ver periódico</a>
  </div>
  <div class="archivo-card proceso-card">
    <div class="numero">05</div>
    <h3>Publicar en web</h3>
    <p>Desplegar contenido del ARCHIVO en GitHub Pages.</p>
    <p><code>@plugin_ox_ghpages</code></p>
    <ul>
      <li>Fuente de verdad: docs/ (raíz)</li>
      <li>Modo fusionar: añade sin eliminar</li>
      <li>Modo reemplazar: sustituye sección</li>
      <li>URL: escrivivir-co.github.io/aleph-scriptorium</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/plugins/gh-pages" class="link">→ Ver plugin</a>
  </div>
  <div class="archivo-card proceso-card">
    <div class="numero">06</div>
    <h3>Scraping de fuentes</h3>
    <p>Descargar hilos de foros y entradas de blogs a DISCO.</p>
    <p><code>@plugin_ox_foroscraper</code></p>
    <ul>
      <li>Soporta: vBulletin, phpBB, Discourse</li>
      <li>Blogs: WordPress, Medium, Substack</li>
      <li>Estado pausable/reanudable</li>
      <li>Naming: {fecha}_{tema}_{titulo}</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/plugins/foro-scraper" class="link">→ Ver plugin</a>
  </div>
</div>

</div>

---

<div class="archivo-section">
<h2>Agentes del Ciclo — Quién hace qué</h2>

<div class="agentes-section">

<div class="agentes-capa">
<h4>UI — Producción</h4>
<div class="agentes-lista">
  <span class="agente-item ui">@aleph (orquestador)</span>
  <span class="agente-item ui">@revisor (coherencia)</span>
  <span class="agente-item ui">@periodico (noticias)</span>
</div>
</div>

<div class="agentes-capa">
<h4>Backend — Auditoría (5 Banderas)</h4>
<div class="agentes-lista">
  <span class="agente-item backend">@blueflag (verdad)</span>
  <span class="agente-item backend">@blackflag (sombras)</span>
  <span class="agente-item backend">@redflag (estructura)</span>
  <span class="agente-item backend">@yellowflag (límites)</span>
  <span class="agente-item backend">@orangeflag (registro)</span>
</div>
</div>

<div class="agentes-capa">
<h4>Sistema — Navegación</h4>
<div class="agentes-lista">
  <span class="agente-item sistema">@vestibulo (perfiles)</span>
  <span class="agente-item sistema">@cartaspuerta (entrega)</span>
</div>
</div>

<div class="agentes-capa">
<h4>Meta — Gestión</h4>
<div class="agentes-lista">
  <span class="agente-item meta">@ox (oráculo)</span>
  <span class="agente-item meta">@pluginmanager (plugins)</span>
</div>
</div>

<div class="agentes-capa">
<h4>Plugins — Extensiones</h4>
<div class="agentes-lista">
  <span class="agente-item plugin">@foroscraper</span>
  <span class="agente-item plugin">@bibliotecario</span>
  <span class="agente-item plugin">@agentcreator</span>
  <span class="agente-item plugin">@ghpages</span>
  <span class="agente-item plugin">@arrakis (teatro)</span>
  <span class="agente-item plugin">@boe (boletín)</span>
  <span class="agente-item plugin">@decoherence</span>
  <span class="agente-item plugin">@gitarg</span>
  <span class="agente-item plugin">@automataheroe</span>
</div>
</div>

</div>

<p style="font-size: 0.85rem; color: var(--archivo-muted); margin-top: 1rem;">
Para consultar el índice completo de agentes, invoca <code>@ox listar agentes por capa</code>.
</p>

</div>

---

<div class="archivo-section">
<h2>Componentes del ARCHIVO — Estructura de carpetas</h2>

<div class="archivo-grid">
  <div class="archivo-card">
    <h3>DISCO</h3>
    <p>Carpetas temporales del usuario. Material de coyuntura que se conecta/desconecta para procesamiento.</p>
    <ul>
      <li>Diciembre_25_Geopolitica/</li>
      <li>Diciembre_25_Alineamiento/</li>
      <li>Foro_t8941392/</li>
      <li>conversacion.md (Alice + Bob)</li>
      <li>imagen-cabecera.prompt.md</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO" class="link">→ Ver DISCO</a>
  </div>
  <div class="archivo-card">
    <h3>NOTICIAS</h3>
    <p>Planas noticieras producidas con método 5W + Banderas. Resultado final del ciclo periodístico.</p>
    <ul>
      <li>S08-T027: Nobel/Venezuela</li>
      <li>S08-T028: OpenAI/Gobernanza</li>
      <li>S08-T029: Yellowflag/Validación</li>
      <li>S08-T030: Demarcación/Falsabilidad</li>
      <li>S08-T031: Poesía/Alternativas</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/NOTICIAS" class="link">→ Ver NOTICIAS</a>
  </div>
  <div class="archivo-card">
    <h3>CARTAS</h3>
    <p>Seis cartas-puerta para explicar el proyecto según el perfil del lector.</p>
    <ul>
      <li>carta-maestro-vista-total.md</li>
      <li>carta-maestro-blueflag.md</li>
      <li>carta-maestro-blackflag.md</li>
      <li>carta-maestro-redflag.md</li>
      <li>carta-maestro-yellowflag.md</li>
      <li>carta-maestro-orangeflag.md</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/CARTAS" class="link">→ Ver CARTAS</a>
  </div>
  <div class="archivo-card">
    <h3>PERFILES</h3>
    <p>Fichas de lector creadas por @vestibulo para personalizar entregables.</p>
    <ul>
      <li>perfil-alice.md</li>
      <li>perfil-bob.md</li>
      <li>manual-demo-vestibulo.md</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/PERFILES" class="link">→ Ver PERFILES</a>
  </div>
  <div class="archivo-card">
    <h3>ENCICLOPEDIA</h3>
    <p>Tomos académicos con índice para búsquedas temporales y temáticas.</p>
    <ul>
      <li>Historia de la Filosofía (Ernesto Castro)</li>
      <li>61 capítulos indexados</li>
      <li>Búsqueda por período</li>
      <li>Búsqueda por tema</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/ENCICLOPEDIA" class="link">→ Ver ENCICLOPEDIA</a>
  </div>
  <div class="archivo-card">
    <h3>PLUGINS</h3>
    <p>Datos de runtime de los plugins instalados (estado, configuración, logs).</p>
    <ul>
      <li>ARG_BOARD/ (.arrakis, BOE)</li>
      <li>ENCICLOPEDIA/</li>
      <li>FORO_SCRAPER/</li>
      <li>GH_PAGES/</li>
      <li>AGENT_CREATOR/</li>
    </ul>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/PLUGINS" class="link">→ Ver PLUGINS</a>
  </div>
</div>

</div>

---

<div class="archivo-section">
<h2>Resumen de Navegación</h2>

<table class="archivo-table">
  <thead>
    <tr>
      <th>Recurso</th>
      <th>Ruta</th>
      <th>Función</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Marco conceptual</td>
      <td><code>ARCHIVO/marco/</code></td>
      <td>15 herramientas para diseño político</td>
    </tr>
    <tr>
      <td>Diagnóstico</td>
      <td><code>ARCHIVO/diagnostico/</code></td>
      <td>5 documentos de memoria (SOTA)</td>
    </tr>
    <tr>
      <td>Justificación</td>
      <td><code>ARCHIVO/justificacion/</code></td>
      <td>4 documentos de contexto</td>
    </tr>
    <tr>
      <td>Noticias</td>
      <td><code>ARCHIVO/NOTICIAS/</code></td>
      <td>Planas 5W + Banderas</td>
    </tr>
    <tr>
      <td>DISCO</td>
      <td><code>ARCHIVO/DISCO/</code></td>
      <td>Carpetas temporales de trabajo</td>
    </tr>
    <tr>
      <td>Cartas-puerta</td>
      <td><code>ARCHIVO/CARTAS/</code></td>
      <td>6 puertas de entrada por perfil</td>
    </tr>
    <tr>
      <td>Perfiles</td>
      <td><code>ARCHIVO/PERFILES/</code></td>
      <td>Fichas de lector</td>
    </tr>
    <tr>
      <td>Enciclopedia</td>
      <td><code>ARCHIVO/ENCICLOPEDIA/</code></td>
      <td>Tomos académicos indexados</td>
    </tr>
    <tr>
      <td>Plugins (datos)</td>
      <td><code>ARCHIVO/PLUGINS/</code></td>
      <td>Estado de runtime</td>
    </tr>
  </tbody>
</table>

</div>

---

<div class="archivo-footer">
  <a href="{{ site.baseurl }}/">← Volver a Aleph Scriptorium</a>
</div>

</div>
