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

> **54 borradores de planificación** — Conversaciones PO-SM que definen el roadmap del proyecto.  
> 📋 **Índice navegable**: [INDEX.md](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/INDEX.md)  
> 📖 **Resúmenes generados por IA**: [INDEX_ABSTRACT.md](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/INDEX_ABSTRACT.md)

<div class="gallery-grid">

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/AGENTE_INDICE" class="card">
    <div class="card-header">📝 Borrador | SCRIPT-1.14.0</div>
    <h3 class="card-title">Agente Índice (Gemelo de Lucas)</h3>
    <div class="card-body">Agente que mantiene índices DRY del proyecto. Gemelo del personaje Lucas del Teatro. Navega Funcional.md y Tecnico.md.</div>
    <div class="card-footer">
      <span class="tag">agente</span><span class="tag">índice</span><span class="tag">DRY</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/AS-GYM" class="card">
    <div class="card-header">✅ Completada | SCRIPT-1.10.0</div>
    <h3 class="card-title">Integración AS-GYM</h3>
    <div class="card-body">Caso de uso Tutatix: auditor @blueflag con Red Semántica. Dos épocas: Edición (construir red) y Conversación (diálogo usando la red).</div>
    <div class="card-footer">
      <span class="tag">gym</span><span class="tag">semántica</span><span class="tag">auditor</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/AS-UTILS-SDK" class="card">
    <div class="card-header">📋 Sin estado | SCRIPT-1.9.0</div>
    <h3 class="card-title">SDK de Utilidades</h3>
    <div class="card-body">Librería de utilidades compartidas para submódulos del Scriptorium. Funciones comunes de parsing, formateo y validación.</div>
    <div class="card-footer">
      <span class="tag">utils</span><span class="tag">sdk</span><span class="tag">lib</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/BLOCKLY-SDK" class="card">
    <div class="card-header">📝 Borrador | SCRIPT-1.12.0</div>
    <h3 class="card-title">Plugin Blockly Editor</h3>
    <div class="card-body">Programación visual de lógica de personajes. Genera código JavaScript ejecutable en el Teatro. Bloques personalizados para agentes.</div>
    <div class="card-footer">
      <span class="tag">blockly</span><span class="tag">visual</span><span class="tag">teatro</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/CLI_SCRIPTORIUM" class="card">
    <div class="card-header">📐 Diseño</div>
    <h3 class="card-title">CLI Scriptorium</h3>
    <div class="card-body">Plan arquitectónico del kernel CLI. Interfaz de comandos para gestionar el Scriptorium sin VS Code. Anchura sin profundidad.</div>
    <div class="card-footer">
      <span class="tag">cli</span><span class="tag">kernel</span><span class="tag">arquitectura</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia" class="card">
    <div class="card-header">✅ Aprobado | FC1</div>
    <h3 class="card-title">Ontología Formal del Scriptorium</h3>
    <div class="card-body">Feature Cycle 1: Especificación formal de agentes, plugins y dominios usando Metamodel + MMCO. Base teórica del proyecto.</div>
    <div class="card-footer">
      <span class="tag">ontología</span><span class="tag">metamodel</span><span class="tag">MMCO</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/FLOVE_EDITOR" class="card">
    <div class="card-header">✅ Publicado | SCRIPT-1.20.0</div>
    <h3 class="card-title">Plugin FloveEditor</h3>
    <div class="card-body">Editor de ontologías basado en paradigma CONFLUENTISM de Flove. Exporta a JSON Schema, TypeScript, Zod. 3 niveles: Fuzzy→PsicoSocial→Freedom.</div>
    <div class="card-footer">
      <span class="tag">flove</span><span class="tag">ontología</span><span class="tag">editor</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/INDICES_COBERTURA" class="card">
    <div class="card-header">✅ Aprobado | SCRIPT-1.18.0</div>
    <h3 class="card-title">Cobertura de Índices</h3>
    <div class="card-body">Homogeneizar Funcional.md y Tecnico.md. Cobertura completa, mismo estilo visual, DRY: referenciar sin duplicar.</div>
    <div class="card-footer">
      <span class="tag">índices</span><span class="tag">cobertura</span><span class="tag">DRY</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA" class="card">
    <div class="card-header">✅ Completado | PROLOG-UI-2.0.0</div>
    <h3 class="card-title">Plugin PrologEditor</h3>
    <div class="card-body">Stack completo: Angular UI (:5001) + Express API (:8000) + MCPPrologServer (:3006). 12 tools, 6 resources, 8 prompts MCP.</div>
    <div class="card-footer">
      <span class="tag">prolog</span><span class="tag">MCP</span><span class="tag">12 tools</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/KICK-ALEPH" class="card">
    <div class="card-header">📋 Borrador</div>
    <h3 class="card-title">Kick Aleph (Streaming)</h3>
    <div class="card-body">Bridge para plataforma de streaming Kick. Dos bots: aleph-bot (interacción) y crono-bot (cronograma). Plugin objetivo: kick-stream.</div>
    <div class="card-footer">
      <span class="tag">kick</span><span class="tag">streaming</span><span class="tag">bot</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/MCP-NOVELIST" class="card">
    <div class="card-header">📝 Borrador | SCRIPT-1.13.0</div>
    <h3 class="card-title">Plugin Novelist (MCP)</h3>
    <div class="card-body">Edición de narrativas con memoria a largo plazo vía servidor MCP. Sincroniza con TALLER, AGENT_CREATOR y Teatro. Puerto 3066.</div>
    <div class="card-footer">
      <span class="tag">mcp</span><span class="tag">novelist</span><span class="tag">memoria</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/MCP-PRESETS-SITE" class="card">
    <div class="card-header">✅ Aprobado</div>
    <h3 class="card-title">Plugin MCP-Presets</h3>
    <div class="card-body">Gestión de presets MCP: packs de tools[], resources[], prompts[]. Importar, exportar y asignar presets a agentes especializados.</div>
    <div class="card-footer">
      <span class="tag">mcp</span><span class="tag">presets</span><span class="tag">tools</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/METAMODEL_COMPLIANCE" class="card">
    <div class="card-header">✅ Publicado | SCRIPT-1.21.0</div>
    <h3 class="card-title">Metamodel Compliance</h3>
    <div class="card-body">Integración Metamodel + MMCO + FloveDocs. Especificación formal para validar que plugins cumplen con la ontología del Scriptorium.</div>
    <div class="card-footer">
      <span class="tag">metamodel</span><span class="tag">compliance</span><span class="tag">formal</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/MMCO" class="card">
    <div class="card-header">✅ Publicado | SCRIPT-1.23.0</div>
    <h3 class="card-title">Integración MMCO (OCMF)</h3>
    <div class="card-body">Métricas de Coherencia Multimodal Ontológica. Framework para medir coherencia en partidas ARG y producción editorial. Bridge: flove-editor.</div>
    <div class="card-footer">
      <span class="tag">mmco</span><span class="tag">coherencia</span><span class="tag">métricas</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/N8N-EDITOR" class="card">
    <div class="card-header">📝 Borrador | SCRIPT-1.14.0</div>
    <h3 class="card-title">Plugin N8N Editor</h3>
    <div class="card-body">Editor visual de workflows estilo n8n. CONECTOR (no reemplazo). Integra con TypedPrompting para validación y MCP-Presets para nodos.</div>
    <div class="card-footer">
      <span class="tag">n8n</span><span class="tag">workflows</span><span class="tag">visual</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/NETWORK-SDK" class="card">
    <div class="card-header">🟡 Borrador | SCRIPT-1.11.0</div>
    <h3 class="card-title">Plugin Network (Oasis)</h3>
    <div class="card-body">Sincronización P2P de BOEs vía Scuttlebutt. Teatro distribuido entre Scriptoriums sin servidor central. Colaboración offline-first.</div>
    <div class="card-footer">
      <span class="tag">network</span><span class="tag">p2p</span><span class="tag">scuttlebutt</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/NODE-RED-SDK" class="card">
    <div class="card-header">📝 Borrador | SCRIPT-1.13.0</div>
    <h3 class="card-title">Plugin WireEditor (Node-RED)</h3>
    <div class="card-body">Diseñador de flujos asíncronos con Node-RED. 13 nodos personalizados en 5 categorías: bot, channel, format, orchestration, dashboard.</div>
    <div class="card-footer">
      <span class="tag">node-red</span><span class="tag">flows</span><span class="tag">async</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/ONTHOLOGY_EDITOR" class="card">
    <div class="card-header">📋 Borrador</div>
    <h3 class="card-title">OnthologyEditor (Flove Template)</h3>
    <div class="card-body">Submódulo principal de ontologías. Template Flove para modelar dominios con paradigma CONFLUENTISM. Base para FloveEditor.</div>
    <div class="card-footer">
      <span class="tag">ontología</span><span class="tag">flove</span><span class="tag">template</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/ONTOLOGY_AGENT_EDITOR" class="card">
    <div class="card-header">✅ Aprobado | SCRIPT-1.24.0</div>
    <h3 class="card-title">OntologyAgentEditor</h3>
    <div class="card-body">Extensión de agent-creator con capacidades ontológicas. Crea agentes validados contra Metamodel. Integra épicas 1.20.0-1.23.0.</div>
    <div class="card-footer">
      <span class="tag">ontology</span><span class="tag">agent</span><span class="tag">creator</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/PLUGIN_SETTINGS_OPTIMIZER" class="card">
    <div class="card-header">✅ Completada | SCRIPT-1.15.0</div>
    <h3 class="card-title">Optimización Settings de Plugins</h3>
    <div class="card-body">Plugins instalados desactivados por defecto. FAQ de troubleshooting integrado. Umbrales de aviso para sobrecarga (7+).</div>
    <div class="card-footer">
      <span class="tag">plugins</span><span class="tag">settings</span><span class="tag">optimización</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/SPLASH_INDEX" class="card">
    <div class="card-header">✅ Completada (85%) | SCRIPT-1.16.0</div>
    <h3 class="card-title">Índice SPLASH (GH-Pages)</h3>
    <div class="card-body">Índice estructural de la web pública. Vinculación docs/ ↔ ARCHIVO/SITE/. Permite refactorizar el sitio con cobertura.</div>
    <div class="card-footer">
      <span class="tag">splash</span><span class="tag">índice</span><span class="tag">web</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/SUBMODULOS_AH_NAMING" class="card">
    <div class="card-header">✅ Aprobado | BUG-003</div>
    <h3 class="card-title">Renombrar Submódulos (PascalCase)</h3>
    <div class="card-body">Eliminar prefijos técnicos (alephscript-, as-). Nuevo patrón: PascalCase descriptivo. Ej: alephscript-n8n-like-editor → WorkflowEditor.</div>
    <div class="card-footer">
      <span class="tag">submódulos</span><span class="tag">naming</span><span class="tag">refactor</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/TYPED_PROMPTING" class="card">
    <div class="card-header">✅ Completado | TYPED-MCP-1.0.0</div>
    <h3 class="card-title">Plugin TypedPrompting</h3>
    <div class="card-body">Stack completo: Vite UI (:3019) + MCPTypedPromptServer (:3020). 7 tools, 3 prompts MCP. Valida NL↔JSON con AJV/Zod.</div>
    <div class="card-footer">
      <span class="tag">typed</span><span class="tag">MCP</span><span class="tag">7 tools</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/VS-CODE-EXTENSION" class="card">
    <div class="card-header">📋 Sin estado</div>
    <h3 class="card-title">Extensión VS Code Scriptorium</h3>
    <div class="card-body">Extensión oficial para VS Code. ChatParticipants, comandos, vistas personalizadas. Submódulo: vscode-alephscript-extension.</div>
    <div class="card-footer">
      <span class="tag">vscode</span><span class="tag">extensión</span><span class="tag">ide</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/WIKI_RACER_ARG_BOARD_APP" class="card">
    <div class="card-header">📝 Borrador</div>
    <h3 class="card-title">ArgBoardApp (Wiki-Racer)</h3>
    <div class="card-body">Implementa wiki-racer como máquina de estados para obras del Teatro ARG. Navegación interactiva sobre mapas de enlaces.</div>
    <div class="card-footer">
      <span class="tag">wiki-racer</span><span class="tag">arg</span><span class="tag">estados</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/WIKI_RACER_HYPERGRAPH_EDITOR" class="card">
    <div class="card-header">📝 Borrador</div>
    <h3 class="card-title">HyperGraphEditor (Wiki-Racer)</h3>
    <div class="card-body">Navegador de grafos hipervinculados. Usa motor wiki-racer con fuentes abstractas (IGraphSource). Incluye preset MediaWiki.</div>
    <div class="card-footer">
      <span class="tag">wiki-racer</span><span class="tag">hypergraph</span><span class="tag">navegación</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/WIKI_RACER_WIRING_APP" class="card">
    <div class="card-header">📝 Borrador</div>
    <h3 class="card-title">WiringApp (Wiki-Racer Flows)</h3>
    <div class="card-body">Extiende WireEditor con templates de juegos de navegación wiki-racer. Crea flows de juego, exporta a Node-RED.</div>
    <div class="card-footer">
      <span class="tag">wiki-racer</span><span class="tag">wiring</span><span class="tag">flows</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/NEW_GH_PAGES_INDEX" class="card">
    <div class="card-header">✅ Aprobado | SCRIPT-1.25.0</div>
    <h3 class="card-title">Blueprint Visual Index</h3>
    <div class="card-body">Refactorizar docs/index.md como presentación 3D navegable con impress.js. 7 slides: Overview, Core, Ontology, Dynamics, Hypergraph, Products, CTA.</div>
    <div class="card-footer">
      <span class="tag">blueprint</span><span class="tag">impress</span><span class="tag">visual</span>
    </div>
  </a>

</div>

## Presente (Archivados)

<div class="gallery-grid">

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/Sprint0" class="card">
    <div class="card-header">Sprint Archivado</div>
    <h3 class="card-title">Sprint0</h3>
    <div class="card-body"><strong>Fecha de archivo</strong>: 2025-12-22</div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/Sprint1" class="card">
    <div class="card-header">Sprint Archivado</div>
    <h3 class="card-title">Sprint1</h3>
    <div class="card-body"><strong>Sprint</strong>: 1 (Extensión VS Code + Feature Cycle 1)</div>
  </a>

</div>

---

## 🤝 Sesiones de Cotrabajo

> **8 sesiones multi-agente** — Trabajo colaborativo asíncrono donde múltiples agentes producen artefactos Scrum.  
> 📋 **Índice**: [SESIONES_COTRABAJO/INDEX.md](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/INDEX.md)  
> 📖 **Protocolo**: [cotrabajo.instructions.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md)

<div class="gallery-grid">

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-05_consenso-agile-scriptorium" class="card">
    <div class="card-header">✅ Cerrada | SCRUM-REFACTOR-1.0.0</div>
    <h3 class="card-title">Consenso Agile Scriptorium</h3>
    <div class="card-body">Modelo Generativo de Scrum. @scrum interpreta a Lucas. Las sesiones PRODUCEN borradores.</div>
    <div class="card-footer">
      <span class="tag">4 turnos</span><span class="tag">46 pts</span><span class="tag">breaking</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-05_blueprints-typed-prompt" class="card">
    <div class="card-header">✅ Cerrada | BLUEPRINTS-TYPED-1.0.0</div>
    <h3 class="card-title">Blueprints + TypedPrompt</h3>
    <div class="card-body">Integración de TypedPrompt con OpenAsyncAPI. Documentación showcase.</div>
    <div class="card-footer">
      <span class="tag">22 pts</span><span class="tag">docs</span><span class="tag">showcase</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_typed-mcp-test-session" class="card">
    <div class="card-header">✅ Cerrada | TYPED-MCP-1.0.0</div>
    <h3 class="card-title">TypedMCP Test Session</h3>
    <div class="card-body">Tests 83% (5/6 auto). Refactor MCPTypedPromptEditor.</div>
    <div class="card-footer">
      <span class="tag">8 turnos</span><span class="tag">34 pts</span><span class="tag">tests</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_dramaturgia-scriptorium-maquina" class="card">
    <div class="card-header">✅ Cerrada | DRAMATURGIA-MAQUINA-1.0.0</div>
    <h3 class="card-title">Scriptorium como Máquina</h3>
    <div class="card-body">Backlog 13 pts (5 stories, 13 tasks). Dramaturgia del sistema.</div>
    <div class="card-footer">
      <span class="tag">6 turnos</span><span class="tag">100%</span><span class="tag">filosofía</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_demo-ui-prologeditor" class="card">
    <div class="card-header">✅ Cerrada | PROLOG-UI-DEMO-1.0.0</div>
    <h3 class="card-title">Demo UI PrologEditor</h3>
    <div class="card-body">Demo completa 12/12 pasos. 2 bugs detectados y corregidos.</div>
    <div class="card-footer">
      <span class="tag">demo</span><span class="tag">UI</span><span class="tag">bugs</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_agent-creator-claude-templates" class="card">
    <div class="card-header">✅ Cerrada | AGENT-TEMPLATES-1.0.0</div>
    <h3 class="card-title">Agent Creator + Claude Templates</h3>
    <div class="card-body">Integración AgentLoreSDK (637+ items). Protocolo de validación inscrito.</div>
    <div class="card-footer">
      <span class="tag">8 turnos</span><span class="tag">13 pts</span><span class="tag">templates</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-03_prolog-e2e-testing" class="card">
    <div class="card-header">✅ Cerrada | PROLOG-E2E-1.0.0</div>
    <h3 class="card-title">Prolog E2E Testing</h3>
    <div class="card-body">E2E 88.5% (23/26 tests). Stack completo validado.</div>
    <div class="card-footer">
      <span class="tag">16 turnos</span><span class="tag">testing</span><span class="tag">E2E</span>
    </div>
  </a>

  <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-03_prolog-agent-brain-pack-refinement" class="card">
    <div class="card-header">✅ Cerrada | PROLOG-DRY-1.0.0</div>
    <h3 class="card-title">Prolog Agent Brain Pack</h3>
    <div class="card-body">Protocolo validado. 15 turnos de refinamiento DRY.</div>
    <div class="card-footer">
      <span class="tag">15 turnos</span><span class="tag">DRY</span><span class="tag">teatro</span>
    </div>
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
      <span class="foto-icon">🎉📸</span>
      <span class="foto-date">2026-01-06</span>
    </div>
    <div class="foto-body">
      <h4>FC1: Víspera del Release Party (v1.0.0-beta.1)</h4>
      <p class="foto-summary">Cierre de FC1: Stack Prolog completo, TypedPromptEditor integrado, 8 sesiones de cotrabajo, protocolo de auto-reflexión validado. La Fundación espera descongelarse.</p>
      <div class="foto-metrics">
        <span class="metric">✅ 29+ épicas cerradas</span>
        <span class="metric">📊 ~215 pts effort</span>
        <span class="metric">🤖 53+ agentes</span>
        <span class="metric">📦 22 plugins</span>
      </div>
      <div class="foto-metrics">
        <span class="metric">🔌 17 submódulos</span>
        <span class="metric">📂 8 sesiones cotrabajo</span>
        <span class="metric">📝 48 borradores</span>
        <span class="metric">📖 0 capítulos</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2026-01-06_FC1_ReleaseParty.md" class="foto-link">Ver foto completa →</a>
    </div>
  </div>

  <div class="foto-card">
    <div class="foto-header">
      <span class="foto-icon">🚀</span>
      <span class="foto-date">2025-12-31</span>
    </div>
    <div class="foto-body">
      <h4>Release Alpha: ItacaEditor (v1.0.0-alpha.1-preview)</h4>
      <p class="foto-summary">Primer release alpha del editor Itaca. Estado preview, rama de integración activa. Integración inicial de submódulos, plugins y agentes principales.</p>
      <div class="foto-metrics">
        <span class="metric">🤖 31+ agentes core</span>
        <span class="metric">📦 19 plugins</span>
        <span class="metric">🔌 14 submódulos</span>
        <span class="metric">🟡 Estado: preview</span>
      </div>
      <a href="#" class="foto-link">Notas del release →</a>
    </div>
  </div>

  <div class="foto-card">
    <div class="foto-header">
      <span class="foto-icon">✅🎯</span>
      <span class="foto-date">2026-01-04</span>
    </div>
    <div class="foto-body">
      <h4>FC1: Épicas Cerradas (TypedPrompt + Prolog)</h4>
      <p class="foto-summary">Cierre de sprint FC1: TypedPromptEditor y PrologEditor como ciudadanos de primera clase. MCP servers integrados en docs/.</p>
      <div class="foto-metrics">
        <span class="metric">✅ TYPED-MCP-1.0.0 (34 pts)</span>
        <span class="metric">✅ PROLOG-UI-2.0.0 (7/7 tools)</span>
        <span class="metric">✅ COWORK-1.0.0 (21 pts)</span>
        <span class="metric">✅ DRAMATURGIA-1.0.0 (13 pts)</span>
      </div>
      <div class="foto-metrics">
        <span class="metric">📊 215+ pts effort</span>
        <span class="metric">🔌 22 plugins</span>
        <span class="metric">🤖 31+ agentes</span>
        <span class="metric">📂 6 sesiones cotrabajo</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-05_blueprints-typed-prompt/" class="foto-link">Ver sesión de cierre →</a>
    </div>
  </div>

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
        <span class="metric">📦 22 plugins</span>
        <span class="metric">✅ 29+ épicas cerradas</span>
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

---

## 🏃 Cómo Usar el Plugin Scrum

> **Plugin**: [scrum v3.0.0](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/plugins/scrum) — Modelo Generativo  
> **Agente**: `@scrum` — Interpreta a Lucas para expertise DRY

### Filosofía: Ciclo de Vida Completo

```
                          ┌──────────────────────────────────────────────────────────────────────┐
                          │                    .github/BACKLOG-SCRIPTORIUM.md                    │
                          │                         (ÍNDICE ~50 líneas)                          │
                          │   Solo referencias: | Estado | Épica | Nombre | [borrador](ruta) |   │
                          └──────────────────────────────────┬───────────────────────────────────┘
                                                             │
                 ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
                 │                                           │                                           │
                 ▼                                           ▼                                           ▼
┌─────────────────────────────────┐      ┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│     SESIONES_COTRABAJO/         │      │     BACKLOG_BORRADORES/         │      │     BACKLOG_ARCHIVADOS/         │
│     (Trabajo Multi-Agente)      │      │     (Épicas Activas)            │      │     (Histórico)                 │
├─────────────────────────────────┤      ├─────────────────────────────────┤      ├─────────────────────────────────┤
│ 00_SESION.md    (metadatos)     │      │ 01_backlog-borrador.md          │      │ Sprint0/                        │
│ 01_TABLERO.md   (índice turnos) │      │ conversacion-po-sm.md           │      │ Sprint1/                        │
│ 02_ACTAS/       (T00X_*.md)     │      │ assets/                         │      │ FC1/                            │
│ 03_REFERENCIAS/ (contexto)      │      │                                 │      │                                 │
└───────────────┬─────────────────┘      └───────────────┬─────────────────┘      └─────────────────────────────────┘
                │                                        │                                           ▲
                │ PRODUCE                                │                                           │
                │ (generar-desde-sesion)                 │                                           │
                └────────────────────────────────────────┤                                           │
                                                         │                                           │
                                                         │ ARCHIVA (cerrar --incluir-sesiones)       │
                                                         └───────────────────────────────────────────┘

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

                                        🔄 FLUJO DE ESTADOS EN EL ÍNDICE

    ┌──────────┐     planificar      ┌──────────┐      aprobar       ┌──────────┐      cerrar       ┌──────────┐
    │   IDEA   │ ─────────────────►  │    📋    │ ─────────────────► │    ✅    │ ─────────────────► │ ARCHIVADO│
    │          │                     │ Borrador │                    │ Aprobado │                    │          │
    └──────────┘                     └────┬─────┘                    └──────────┘                    └──────────┘
                                          │
                                          │ tracking (actualiza EN el borrador, NO en índice)
                                          ▼
                                    ┌──────────┐
                                    │    🔄    │
                                    │En progreso│
                                    └──────────┘

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

                                        🎭 TIPOS DE CIERRE DE SESIÓN

    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │                                                                                                             │
    │   SESIÓN COTRABAJO                                                                                          │
    │   Estado: CERRADA                                                                                           │
    │                                                                                                             │
    │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                                         │
    │   │  EXPLORATORIA   │    │   NORMATIVA     │    │   PRODUCTIVA    │                                         │
    │   │                 │    │                 │    │                 │                                         │
    │   │ → Solo registro │    │ → Instrucciones │    │ → Borrador      │                                         │
    │   │   en histórico  │    │   .github/      │    │   BACKLOG_      │                                         │
    │   │                 │    │   instructions/ │    │   BORRADORES/   │                                         │
    │   └─────────────────┘    └─────────────────┘    └────────┬────────┘                                         │
    │                                                          │                                                  │
    │                                                          ▼                                                  │
    │                                                 ┌─────────────────┐                                         │
    │                                                 │ origen:         │                                         │
    │                                                 │   tipo: sesion  │                                         │
    │                                                 │   referencia:   │                                         │
    │                                                 │   actas: [...]  │                                         │
    │                                                 │   consenso: "…" │                                         │
    │                                                 └─────────────────┘                                         │
    │                                                                                                             │
    └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Invocación Rápida

| Si quieres... | Comando |
|---------------|---------|
| Crear nueva épica | `@scrum planificar {nombre}` |
| Generar backlog detallado | `@scrum borrador {nombre}` |
| **Desde sesión cerrada** | `@scrum generar-desde-sesion {ruta}` |
| Aprobar épica | `@scrum aprobar {épica}` |
| Actualizar estado | `@scrum tracking {épica}` |
| Ver métricas | `@scrum status` |
| Cerrar sprint | `@scrum cerrar {sprint}` |

### Ejemplo de Flujo Completo

```bash
# 1. Crear épica nueva
@scrum planificar MI-FEATURE-1.0.0

# 2. Generar backlog detallado
@scrum borrador MI-FEATURE-1.0.0

# 3. Aprobar y comenzar
@scrum aprobar MI-FEATURE-1.0.0

# 4. Durante el sprint, actualizar
@scrum tracking MI-FEATURE-1.0.0

# 5. Al finalizar
@scrum cerrar FC1

# Alternativa: Desde sesión de cotrabajo
@scrum generar-desde-sesion ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-05_mi-sesion/
```

### Dónde Vive Cada Cosa (DRY)

| Ubicación | Contenido | Tocar |
|-----------|-----------|-------|
| `.github/BACKLOG-SCRIPTORIUM.md` | Índice (~50 líneas) | Solo referencias |
| `ARCHIVO/DISCO/BACKLOG_BORRADORES/` | Detalles activos | Contenido épicas |
| `ARCHIVO/DISCO/SESIONES_COTRABAJO/` | Sesiones multi-agente | Protocolo cotrabajo |
| `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` | Sprints cerrados | Histórico |

### Feature: Interpretar a Lucas

`@scrum` **no tiene expertise propia** — interpreta a [Lucas](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/DISCO/TALLER/ELENCO/lucas/):

```bash
# Cargar contexto avanzado bajo demanda
@scrum 🎭 Cargar contexto Lucas

# Consultar brain Prolog
@scrum 🧠 Consultar brain Prolog

# Buscar plantilla de AgentLoreSDK
@scrum 📚 Buscar plantilla Scrum
```

> 📐 **Protocolo completo**: Ver [scrum-protocol.instructions.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/plugins/scrum/instructions/scrum-protocol.instructions.md)
