---
name: plugin_ox_wireeditor
description: "Bridge: conecta VS Code con agentes del plugin WireEditor. Ver .github/plugins/wire-editor/agents/"
argument-hint: "Invoca operaciones de WireEditor: crear proyecto, importar/exportar flow, asesorar nodos, configurar feed."
tools: ['agent', 'read', 'edit']
handoffs:
  - label: Listar capacidades de WireEditor
    agent: plugin_ox_wireeditor
    prompt: Lista las capacidades del plugin WireEditor (diseño de flows Node-RED).
    send: false
  - label: Crear proyecto Node-RED
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Crea un nuevo proyecto Node-RED en DISCO/WIRING/projects/.
    send: false
  - label: Importar flow JSON
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Importa un flow JSON al catálogo de WIRING.
    send: false
  - label: Exportar flow a archivo
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Exporta un flow desde WIRING a archivo listo para Node-RED.
    send: false
  - label: Asesorar sobre nodos
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Recomienda qué nodos usar según el caso de uso.
    send: false
  - label: Configurar feed asíncrono
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Configura comunicación asíncrona via feeds JSON.
    send: false
  - label: Ver catálogo de nodos
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Muestra el catálogo de los 13 nodos disponibles.
    send: false
  - label: Listar plantillas
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Lista plantillas de flows, subflows y nodos disponibles.
    send: false
  - label: Sincronizar con submódulo
    agent: .github/plugins/wire-editor/agents/wire-editor.agent.md
    prompt: Sincroniza plantillas desde node-red-alephscript-sdk.
    send: false
---

# Plugin Ox: WireEditor (Node-RED)

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/wire-editor/agents/`.

---

## Descripción

WireEditor es el plugin de **diseño de flujos de datos** del Scriptorium. Usa Node-RED para crear pipelines visuales que conectan bots, canales, transformaciones y dashboards.

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| WireEditor | `wire-editor.agent.md` | Agente principal. Crea proyectos, importa/exporta flows, asesora sobre nodos. |

---

## Operaciones Principales

| Operación | Descripción |
|-----------|-------------|
| **Crear proyecto** | Nuevo proyecto Node-RED en DISCO/WIRING |
| **Importar flow** | Traer flow JSON al catálogo |
| **Exportar flow** | Generar archivo para Node-RED |
| **Asesorar nodos** | Recomendar nodos según caso |
| **Configurar feed** | Comunicación asíncrona |

---

## Catálogo de Nodos (13)

| Categoría | Nodos |
|-----------|-------|
| Bot | BotClientNode, BotNode |
| Channel | ChannelConfigNode, ChannelNode, PlatformContextNode |
| Format | FormatNode, MessageParserNode, ResponseBuilderNode |
| Orchestration | FlowControlNode, StateManagerNode |
| Dashboard | DashboardNode, UIWidgetNode, FormNode |

---

## Estructura de Datos

```
ARCHIVO/DISCO/WIRING/
├── catalog.json       # Índice de artefactos
├── feeds/             # Comunicación asíncrona
├── projects/          # Proyectos por caso de uso
└── templates/         # Plantillas reutilizables
```

---

## Submódulo Fuente

- **Repositorio**: `node-red-alephscript-sdk`
- **Paquetes**: node-red-contrib-alephscript, node-red-gamify-ui
- **Rama**: `integration/beta/scriptorium`

---

## Referencia

- Manifest: `.github/plugins/wire-editor/manifest.md`
- Agente: `.github/plugins/wire-editor/agents/wire-editor.agent.md`
- Prompts: `.github/plugins/wire-editor/prompts/`
- Instructions: `.github/plugins/wire-editor/instructions/`
- Datos: `ARCHIVO/DISCO/WIRING/`
