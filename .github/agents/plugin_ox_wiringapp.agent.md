---
name: plugin_ox_wiringapp
description: "Bridge: conecta VS Code con el plugin WiringApp. Flows de juegos tipo wiki-racer."
argument-hint: "Invoca capacidades de WiringApp: crear flow, importar template, exportar."
tools: ['agent']
handoffs:
  - label: Listar capacidades de WiringApp
    agent: plugin_ox_wiringapp
    prompt: Lista las capacidades disponibles en este plugin.
    send: false
  - label: Crear flow de juego
    agent: .github/plugins/wiring-app/agents/wiring-app.agent.md
    prompt: Guía al usuario para crear un flow de juego de navegación.
    send: false
  - label: Importar template wiki-racer
    agent: .github/plugins/wiring-app/agents/wiring-app.agent.md
    prompt: Importa el template wiki-racer al directorio de flows.
    send: false
  - label: Exportar a Node-RED
    agent: .github/plugins/wiring-app/agents/wiring-app.agent.md
    prompt: Exporta un flow en formato compatible con Node-RED.
    send: false
  - label: Delegar a WireEditor
    agent: plugin_ox_wireeditor
    prompt: Para operaciones genéricas de Node-RED, delegar a WireEditor.
    send: false
---

# Plugin Ox: WiringApp

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/wiring-app/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| WiringApp | `agents/wiring-app.agent.md` | Experto en flows de juegos tipo wiki-racer |

## Capacidades

- Crear flows de juegos de navegación
- Importar template wiki-racer
- Exportar flows a formato Node-RED
- Asesorar sobre nodos y patrones

## Referencia

- Manifest: `.github/plugins/wiring-app/manifest.md`
- Agentes: `.github/plugins/wiring-app/agents/`
- Templates: `ARCHIVO/PLUGINS/WIRING_APP/templates/`
