---
name: plugin_ox_argboardapp
description: "Bridge: conecta VS Code con el plugin ArgBoardApp. Obras de navegación interactiva wiki-racer."
argument-hint: "Invoca capacidades de ArgBoardApp: crear obra, configurar mapa, ejecutar partida."
tools: ['agent']
handoffs:
  - label: Listar capacidades de ArgBoardApp
    agent: plugin_ox_argboardapp
    prompt: Lista las capacidades disponibles en este plugin.
    send: false
  - label: Crear obra de navegación
    agent: .github/plugins/arg-board-app/agents/arg-board-app.agent.md
    prompt: Guía al usuario para crear una obra de navegación interactiva.
    send: false
  - label: Configurar mapa de enlaces
    agent: .github/plugins/arg-board-app/agents/arg-board-app.agent.md
    prompt: Configura el mapa de enlaces (fuente, nodos inicio/fin).
    send: false
  - label: Ejecutar partida
    agent: .github/plugins/arg-board-app/agents/arg-board-app.agent.md
    prompt: Inicia una partida de navegación.
    send: false
  - label: Delegar a Teatro
    agent: plugin_ox_teatro
    prompt: Para publicación en cartelera, delegar a Teatro.
    send: false
  - label: Delegar a ARG Board
    agent: plugin_ox_argboard
    prompt: Para configuración avanzada de ARG, delegar a ARG Board.
    send: false
---

# Plugin Ox: ArgBoardApp

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/arg-board-app/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| ArgBoardApp | `agents/arg-board-app.agent.md` | Motor de obras de navegación wiki-racer |

## Capacidades

- Crear obras de navegación interactiva
- Configurar mapas de enlaces
- Ejecutar partidas con tracking de estados
- Registrar sesiones en BOE

## Referencia

- Manifest: `.github/plugins/arg-board-app/manifest.md`
- Agentes: `.github/plugins/arg-board-app/agents/`
- Obras: `ARCHIVO/PLUGINS/ARG_BOARD_APP/obras/`
