---
id: arg-board-app
name: "ArgBoardApp (Wiki-Racer State Machine)"
version: "1.0.0"
description: "Plugin que implementa wiki-racer como máquina de estados para obras del Teatro ARG. Navegación interactiva sobre mapas de enlaces."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies:
  - arg-board
  - teatro
optional_dependencies:
  - hypergraph-editor

# Integración con submódulo
submodule: "wiki-racer"

# Recursos exportados
agents:
  - name: "ArgBoardApp"
    file: "agents/arg-board-app.agent.md"
    description: "Motor de obras interactivas con navegación wiki-racer"

prompts:
  - name: "crear-obra-navegacion"
    file: "prompts/crear-obra-navegacion.prompt.md"
    description: "Crear obra de navegación interactiva"
  - name: "configurar-mapa"
    file: "prompts/configurar-mapa.prompt.md"
    description: "Configurar mapa de enlaces para obra"

instructions:
  - name: "arg-board-app"
    file: "instructions/arg-board-app.instructions.md"

# Integración con Aleph
handoffs:
  - label: "Crear obra de navegación"
    agent: "ArgBoardApp"
  - label: "Configurar mapa de enlaces"
    agent: "ArgBoardApp"
  - label: "Ejecutar partida"
    agent: "ArgBoardApp"
---

# Plugin: ArgBoardApp

ArgBoardApp convierte wiki-racer en un **motor de obras interactivas** para el Teatro ARG. Los espectadores navegan entre nodos de un mapa de enlaces, buscando caminos entre conceptos.

## Propósito

Usar la máquina de estados de wiki-racer (`estado.ts`) para crear experiencias de Teatro transmedia donde el usuario explora conexiones entre ideas.

## Capacidades

- Crear obras de navegación interactiva
- Configurar mapas de enlaces (Wikipedia u otras fuentes)
- Ejecutar partidas con tracking de progreso
- Registrar sesiones en BOE

## Integración con Teatro

```
AGENT_CREATOR (personaje)
        │
        ▼
ArgBoardApp (motor de obra)
        │
        ├── Estados: NoIniciado → Iniciado → Esperando → Acabado
        ├── Interfaz: impress.js (anillos)
        └── Registro: BOE
        │
        ▼
    TEATRO (publicación)
```

## Mapeo de Estados

| wiki-racer | ArgBoardApp | Teatro |
|------------|-------------|--------|
| NoIniciado | Lobby | Cartelera |
| Iniciado | Navegando | En escena |
| Esperando | Turno del jugador | Interactivo |
| Reintentar | Backtrack | Volver atrás |
| Acabado | Victoria/Derrota | Cierre |

## Uso

```
@aleph [ARG-BOARD-APP] Crear obra de navegación sobre filosofía griega
```
