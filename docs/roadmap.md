---
layout: default
title: Roadmap
description: Galería de Futuro y Presente
permalink: /roadmap/
---

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .card {
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 1.5rem;
    transition: all 0.2s ease;
    background: #fff;
    color: #24292e;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .card:hover {
    border-color: #000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-decoration: none;
    transform: translateY(-2px);
  }
  
  .card-header {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6a737d;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
    color: #000;
  }
  
  .card-body {
    font-size: 0.95rem;
    color: #586069;
    flex-grow: 1;
    line-height: 1.5;
  }
  
  .card-footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eaecef;
    font-size: 0.8rem;
    color: #6a737d;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background: #f6f8fa;
    padding: 0.2em 0.5em;
    border-radius: 3px;
    border: 1px solid #e1e4e8;
  }

  /* Monochrome / Minimalist overrides */
  .card {
    border: 1px solid #000;
    border-radius: 0;
  }
  .tag {
    background: #fff;
    border: 1px solid #000;
    color: #000;
  }
  h1, h2 {
    border-bottom: 2px solid #000;
    padding-bottom: 0.5rem;
  }
</style>

# Roadmap

> *"El camino de Aleph a Euler"*

## Futuro (Borradores)

<div class="gallery-grid">

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/Mapa rápido" class="card">
    <div class="card-header">Mapa rápido</div>
    <h3 class="card-title">Mapa rápido</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/AGENTE_INDICE" class="card">
    <div class="card-header">AGENTE_INDICE</div>
    <h3 class="card-title">Conversación PO-SM: Agente Índice (Gemelo de Lucas)</h3>
    <div class="card-body">**Fecha**: 2025-12-24 (Nochebuena) **Sprint**: FC1 **Épica propuesta**: SCRIPT-1.14.0</div>
    <div class="card-footer">
      <span class="tag">agente</span><span class="tag">indice</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/AS-GYM" class="card">
    <div class="card-header">AS-GYM</div>
    <h3 class="card-title">Planificación Épica SCRIPT-1.10.0: Conversación PO-SM</h3>
    <div class="card-body">**Caso de uso evaluado**: Creación del personaje **Tutatix**, un auditor de verdad basado en @blueflag que utiliza una Red Semántica (paradigma simbólico de as-gym
) con dos épocas de operación: 1. **Época de Edición**: Chat para construir/modificar la red semántica 2. **Época de Conversación**: Diálogo usando la red…</div>                                 <div class="card-footer">
      <span class="tag">gym</span><span class="tag">planificación</span><span class="tag">épica</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/AS-UTILS-SDK" class="card">
    <div class="card-header">AS-UTILS-SDK</div>
    <h3 class="card-title">Planificación Épica SCRIPT-1.9.0: Conversación PO-SM</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">utils</span><span class="tag">sdk</span><span class="tag">planificación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/BLOCKLY-SDK" class="card">
    <div class="card-header">BLOCKLY-SDK</div>
    <h3 class="card-title">Conversación PO-SM: Blockly AlephScript SDK</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulo**: `blockly-alephscript-sdk` **Plugin objetivo**: `blockly-editor` **Sprint referencia**: SCRIPT-1.12.0</div>
    <div class="card-footer">
      <span class="tag">blockly</span><span class="tag">sdk</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/CLI_SCRIPTORIUM" class="card">
    <div class="card-header">CLI_SCRIPTORIUM</div>
    <h3 class="card-title">Plan Arquitectónico: CLI Scriptorium</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">cli</span><span class="tag">scriptorium</span><span class="tag">arquitectónico</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia" class="card">
    <div class="card-header">Diciembre_25_Ontologia</div>
    <h3 class="card-title">Planificación Sprint 1: Conversación PO-SM</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">diciembre</span><span class="tag">ontologia</span><span class="tag">planificación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/FLOVE_EDITOR" class="card">
    <div class="card-header">FLOVE_EDITOR</div>
    <h3 class="card-title">Planificación Plugin FloveEditor: Conversación PO-SM</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">flove</span><span class="tag">editor</span><span class="tag">planificación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/INDICES_COBERTURA" class="card">
    <div class="card-header">INDICES_COBERTURA</div>
    <h3 class="card-title">Conversación PO-SM: Cobertura y Homogeneización de Índices</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Épica propuesta**: SCRIPT-1.18.0 **Agente orquestador**: @scrum</div>
    <div class="card-footer">
      <span class="tag">indices</span><span class="tag">cobertura</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA" class="card">
    <div class="card-header">IOT-SBR-LOGICA</div>
    <h3 class="card-title">Conversación PO-SM: Plugin PrologEditor</h3>
    <div class="card-body">**Fecha**: 2025-01-04 **Submódulo**: `iot-sbr-logica-para-bots` **Plugin objetivo**: `prolog-editor` **Instrucciones del usuario**: - Relacionar con blockly-editor
 y AS-GYM - Exportar desde Scriptorium a editor Prolog e importar de vuelta - Conectar con AGENT_CREATOR y ARG_BOARD - Perfil académico: usuarios con alto…</div>                                 <div class="card-footer">
      <span class="tag">iot</span><span class="tag">sbr</span><span class="tag">logica</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/KICK-ALEPH" class="card">
    <div class="card-header">KICK-ALEPH</div>
    <h3 class="card-title">Conversación PO-SM: Kick Aleph (Streaming Bridge)</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulos**: `kick-aleph-bot`, `kick-aleph-crono-bot` **Plugin objetivo**: `kick-stream`</div>
    <div class="card-footer">
      <span class="tag">kick</span><span class="tag">aleph</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/MCP-NOVELIST" class="card">
    <div class="card-header">MCP-NOVELIST</div>
    <h3 class="card-title">Conversación PO-SM: MCP Novelist</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulo**: `mcp-novelist` **Plugin objetivo**: `novelist`</div>
    <div class="card-footer">
      <span class="tag">mcp</span><span class="tag">novelist</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/MCP-PRESETS-SITE" class="card">
    <div class="card-header">MCP-PRESETS-SITE</div>
    <h3 class="card-title">Conversación PO-SM: Plugin MCP-PRESETS</h3>
    <div class="card-body">Este borrador define el plugin `mcp-presets` para Scriptorium, que permite:</div>
    <div class="card-footer">
      <span class="tag">mcp</span><span class="tag">presets</span><span class="tag">site</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/METAMODEL_COMPLIANCE" class="card">
    <div class="card-header">METAMODEL_COMPLIANCE</div>
    <h3 class="card-title">Conversación PO-SM: Metamodel Compliance para FloveEditor</h3>
    <div class="card-body">**Estado**: ✅ Publicado en BACKLOG-SCRIPTORIUM.md (consolidado 2025-12-26)</div>
    <div class="card-footer">
      <span class="tag">metamodel</span><span class="tag">compliance</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/MMCO" class="card">
    <div class="card-header">MMCO</div>
    <h3 class="card-title">Conversación PO-SM: MMCO (OCMF)</h3>
    <div class="card-body">**Fecha**: 2025-12-26 **Submódulo**: `OnthologyEditor/MMCO` **Plugin objetivo**: `flove-editor` (Bridge: `plugin_ox_floveeditor`)</div>
    <div class="card-footer">
      <span class="tag">mmco</span><span class="tag">conversación</span><span class="tag">ocmf</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/N8N-EDITOR" class="card">
    <div class="card-header">N8N-EDITOR</div>
    <h3 class="card-title">Conversación PO-SM: N8N Editor</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulo**: `alephscript-n8n-like-editor` **Plugin objetivo**: `n8n-editor` **Modo**: Autónomo (continuar sin pausas)</div>
    <div class="card-footer">
      <span class="tag">n8n</span><span class="tag">editor</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/NETWORK-SDK" class="card">
    <div class="card-header">NETWORK-SDK</div>
    <h3 class="card-title">Conversación PO-SM: Plugin Network (Oasis/Scuttlebutt)</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">network</span><span class="tag">sdk</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/NODE-RED-SDK" class="card">
    <div class="card-header">NODE-RED-SDK</div>
    <h3 class="card-title">Conversación PO-SM: Node-RED AlephScript SDK</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulo**: `node-red-alephscript-sdk` **Plugin objetivo**: `wire-editor` v1.0.0 **Épica**: SCRIPT-1.13.0</div>
    <div class="card-footer">
      <span class="tag">node</span><span class="tag">red</span><span class="tag">sdk</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/ONTHOLOGY_EDITOR" class="card">
    <div class="card-header">ONTHOLOGY_EDITOR</div>
    <h3 class="card-title">Conversación PO-SM: OnthologyEditor (Flove Template)</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">onthology</span><span class="tag">editor</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/ONTOLOGY_AGENT_EDITOR" class="card">
    <div class="card-header">ONTOLOGY_AGENT_EDITOR</div>
    <h3 class="card-title">Conversación PO-SM: OntologyAgentEditor</h3>
    <div class="card-body">**Fecha**: 2025-12-26 **Plugin objetivo**: Extensión de `agent-creator` con capacidades ontológicas **Épicas relacionadas**: SCRIPT-1.20.0, SCRIPT-1.21.0, SCRIPT-1
.22.0, SCRIPT-1.23.0 **Participantes**: @aleph (PO), @scrum (SM), @flove-ox, @agent-creator, @ox</div>                                                                                            <div class="card-footer">
      <span class="tag">ontology</span><span class="tag">agent</span><span class="tag">editor</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/PLUGIN_SETTINGS_OPTIMIZER" class="card">
    <div class="card-header">PLUGIN_SETTINGS_OPTIMIZER</div>
    <h3 class="card-title">Planificación: Conversación PO-SM — Optimización Settings de Plugins</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">plugin</span><span class="tag">settings</span><span class="tag">optimizer</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/SPLASH_INDEX" class="card">
    <div class="card-header">SPLASH_INDEX</div>
    <h3 class="card-title">Backlog Borrador: SCRIPT-1.16.0 — Índice SPLASH y Vinculación GH-Pages</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">splash</span><span class="tag">index</span><span class="tag">script</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/SUBMODULOS_AH_NAMING" class="card">
    <div class="card-header">SUBMODULOS_AH_NAMING</div>
    <h3 class="card-title">BUG-003 — Renombrar paths de submódulos a convención PascalCase descriptiva</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">submodulos</span><span class="tag">naming</span><span class="tag">bug</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/TYPED_PROMPTING" class="card">
    <div class="card-header">TYPED_PROMPTING</div>
    <h3 class="card-title">Conversación PO↔SM: TypedPrompting</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">typed</span><span class="tag">prompting</span><span class="tag">conversación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/VS-CODE-EXTENSION" class="card">
    <div class="card-header">VS-CODE-EXTENSION</div>
    <h3 class="card-title">Backlog Sprint 2: Extensión VS Code Scriptorium</h3>
    <div class="card-body">Sin descripción disponible.</div>
    <div class="card-footer">
      <span class="tag">code</span><span class="tag">extension</span><span class="tag">extensión</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/WIKI_RACER_ARG_BOARD_APP" class="card">
    <div class="card-header">WIKI_RACER_ARG_BOARD_APP</div>
    <h3 class="card-title">Conversación PO-SM: ArgBoardApp (Wiki-Racer → Máquina de Estados ARG)</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulo**: `wiki-racer` **Plugin objetivo**: `arg-board-app`</div>
    <div class="card-footer">
      <span class="tag">wiki</span><span class="tag">racer</span><span class="tag">arg</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/WIKI_RACER_HYPERGRAPH_EDITOR" class="card">
    <div class="card-header">WIKI_RACER_HYPERGRAPH_EDITOR</div>
    <h3 class="card-title">Conversación PO-SM: HyperGraphEditor (Wiki-Racer → Navegador de Hipergrafos)</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulo**: `wiki-racer` **Plugin objetivo**: `hypergraph-editor`</div>
    <div class="card-footer">
      <span class="tag">wiki</span><span class="tag">racer</span><span class="tag">hypergraph</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/WIKI_RACER_WIRING_APP" class="card">
    <div class="card-header">WIKI_RACER_WIRING_APP</div>
    <h3 class="card-title">Conversación PO-SM: WiringApp (Wiki-Racer → Node-RED Flows)</h3>
    <div class="card-body">**Fecha**: 2025-12-24 **Submódulo**: `wiki-racer` **Plugin objetivo**: `wiring-app`</div>
    <div class="card-footer">
      <span class="tag">wiki</span><span class="tag">racer</span><span class="tag">wiring</span>
    </div>
  </a>

</div>

## Presente (Archivados)

<div class="gallery-grid">

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/Sprint0" class="card">
    <div class="card-header">Sprint Archivado</div>
    <h3 class="card-title">Sprint0</h3>
    <div class="card-body">> **Fecha de archivo**: 2025-12-22</div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/Sprint1" class="card">
    <div class="card-header">Sprint Archivado</div>
    <h3 class="card-title">Sprint1</h3>
    <div class="card-body">> **Sprint**: 1 (Extensión VS Code + Feature Cycle 1)</div>
  </a>

</div>

---

## Galería de Fotos de Estado

<style>
  .foto-card {
    border: 2px solid #000;
    padding: 1rem;
    margin-bottom: 1.5rem;
    background: #fafafa;
  }
  .foto-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  .foto-icon { font-size: 1.5rem; }
  .foto-date { 
    font-family: monospace; 
    color: #666;
  }
  .foto-body h4 { 
    margin: 0 0 0.5rem 0;
    color: #000;
  }
  .foto-summary { 
    color: #444; 
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
  .foto-metrics {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }
  .metric {
    font-size: 0.8rem;
    background: #fff;
    border: 1px solid #000;
    padding: 0.2em 0.5em;
  }
  .foto-link {
    font-size: 0.85rem;
    color: #000;
    text-decoration: underline;
  }
  .foto-dual {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 0.75rem;
  }
  .foto-lens {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  .lens-positive { background: #e8f5e9; border-left: 3px solid #4caf50; }
  .lens-negative { background: #fff3e0; border-left: 3px solid #ff9800; }
</style>

<!-- GALERÍA DE FOTOS DE ESTADO -->
<div class="fotos-gallery">

  <!-- Más reciente primero -->
  <div class="foto-card">
    <div class="foto-header">
      <span class="foto-icon">🏗️📸</span>
      <span class="foto-date">2025-12-27</span>
    </div>
    <div class="foto-body">
      <h4>FC2: Foto Dual del Arquitecto (Pathykar)</h4>
      <p class="foto-summary">Una escena, dos gafas: la misma realidad vista desde virtudes e impedimentos.</p>
      <div class="foto-dual">
        <div class="foto-lens lens-positive">
          <strong>🟢 Gafas Positivas:</strong><br>
          63 agentes · 19 plugins · Blueprint MMCO · 25+ conversaciones PO-SM
        </div>
        <div class="foto-lens lens-negative">
          <strong>🔴 Gafas Negativas:</strong><br>
          Fundación congelada · Bus factor=1 · Sin tests · Onboarding complejo
        </div>
      </div>
      <div class="foto-metrics">
        <span class="metric">🤖 63 agentes</span>
        <span class="metric">📦 19 plugins</span>
        <span class="metric">✅ 3 épicas cerradas</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-27_FC2_FotoDualPathykar.md" class="foto-link">Ver foto completa →</a>
    </div>
  </div>

  <div class="foto-card">
    <div class="foto-header">
      <span class="foto-icon">📸</span>
      <span class="foto-date">2025-12-24</span>
    </div>
    <div class="foto-body">
      <h4>FC1: Visión de Futuro</h4>
      <p class="foto-summary">Planificación de ontología formal: Metamodel + MMCO para el Scriptorium.</p>
      <div class="foto-metrics">
        <span class="metric">🤖 28 agentes</span>
        <span class="metric">📦 14 plugins</span>
        <span class="metric">📋 4 épicas planificadas</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-24_FC1_VisionFuturo.md" class="foto-link">Ver foto completa →</a>
    </div>
  </div>

  <div class="foto-card">
    <div class="foto-header">
      <span class="foto-icon">📸</span>
      <span class="foto-date">2025-12-23</span>
    </div>
    <div class="foto-body">
      <h4>Sprint 2: Feature Cycle 1</h4>
      <p class="foto-summary">Inicio del ciclo de features con agente @indice y plugins transversales.</p>
      <div class="foto-metrics">
        <span class="metric">🤖 26 agentes</span>
        <span class="metric">📦 12 plugins</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-23_Sprint2_FeatureCycle1.md" class="foto-link">Ver foto completa →</a>
    </div>
  </div>

  <div class="foto-card">
    <div class="foto-header">
      <span class="foto-icon">📸</span>
      <span class="foto-date">2025-12-22</span>
    </div>
    <div class="foto-body">
      <h4>Sprint 1: Teatro Interactivo</h4>
      <p class="foto-summary">7 plugins operativos, visualizador 3D con impress.js.</p>
      <div class="foto-metrics">
        <span class="metric">🤖 24 agentes</span>
        <span class="metric">📦 7 plugins</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-22_Sprint1_TeatroInteractivo.md" class="foto-link">Ver foto completa →</a>
    </div>
  </div>

  <div class="foto-card">
    <div class="foto-header">
      <span class="foto-icon">📸</span>
      <span class="foto-date">2025-12-21</span>
    </div>
    <div class="foto-body">
      <h4>Sprint 0: Bootstrap</h4>
      <p class="foto-summary">Infraestructura base: 12 agentes core, protocolo DevOps, primeras estructuras.</p>
      <div class="foto-metrics">
        <span class="metric">🤖 12 agentes</span>
        <span class="metric">📦 2 plugins</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-21_Sprint0_Bootstrap.md" class="foto-link">Ver foto completa →</a>
    </div>
  </div>

</div>
