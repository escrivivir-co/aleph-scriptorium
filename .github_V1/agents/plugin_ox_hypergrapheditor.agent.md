---
name: plugin_ox_hypergrapheditor
description: "Bridge: conecta VS Code con el plugin HyperGraphEditor. Navegación de grafos hipervinculados."
argument-hint: "Invoca capacidades de HyperGraphEditor: crear mapa, navegar, gestionar presets."
tools: ['agent']
handoffs:
  - label: Listar capacidades de HyperGraphEditor
    agent: plugin_ox_hypergrapheditor
    prompt: Lista las capacidades disponibles en este plugin.
    send: false
  - label: Crear mapa de enlaces
    agent: .github/plugins/hypergraph-editor/agents/hypergraph-editor.agent.md
    prompt: Crea un mapa de enlaces desde una fuente de datos.
    send: false
  - label: Navegar grafo
    agent: .github/plugins/hypergraph-editor/agents/hypergraph-editor.agent.md
    prompt: Navega interactivamente un grafo existente.
    send: false
  - label: Cargar preset MediaWiki
    agent: .github/plugins/hypergraph-editor/agents/hypergraph-editor.agent.md
    prompt: Carga el preset MediaWiki para navegar Wikipedia.
    send: false
  - label: Crear fuente de datos
    agent: .github/plugins/hypergraph-editor/agents/hypergraph-editor.agent.md
    prompt: Implementa una nueva fuente de datos (IGraphSource).
    send: false
  - label: Delegar a MCP Presets
    agent: plugin_ox_mcppresets
    prompt: Para gestión avanzada de presets, delegar a MCP Presets.
    send: false
---

# Plugin Ox: HyperGraphEditor

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/hypergraph-editor/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| HyperGraphEditor | `agents/hypergraph-editor.agent.md` | Navegador de grafos hipervinculados |

## Capacidades

- Crear mapas de enlaces desde diversas fuentes
- Navegar grafos interactivamente
- Gestionar presets de fuentes (MediaWiki, custom)
- Implementar nuevas fuentes (IGraphSource)

## Presets incluidos

| Preset | Descripción |
|--------|-------------|
| MediaWiki | API de Wikipedia y proyectos Wikimedia |

## Referencia

- Manifest: `.github/plugins/hypergraph-editor/manifest.md`
- Agentes: `.github/plugins/hypergraph-editor/agents/`
- Presets: `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/presets/`
- Grafos: `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/graphs/`
