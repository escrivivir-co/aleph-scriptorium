---
id: wiring-app
name: "WiringApp (Wiki-Racer Flows)"
version: "1.0.0"
description: "Plugin de ejemplo de aplicación Node-RED basado en wiki-racer. Extiende WireEditor con templates de juegos de navegación."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies:
  - wire-editor
optional_dependencies:
  - typed-prompting

# Integración con submódulo
submodule: "wiki-racer"

# Recursos exportados
agents:
  - name: "WiringApp"
    file: "agents/wiring-app.agent.md"
    description: "Experto en flows Node-RED tipo wiki-racer"

prompts:
  - name: "crear-flow-juego"
    file: "prompts/crear-flow-juego.prompt.md"
    description: "Crear un flow de juego de navegación"
  - name: "importar-template"
    file: "prompts/importar-template.prompt.md"
    description: "Importar template wiki-racer a WireEditor"

instructions:
  - name: "wiring-app"
    file: "instructions/wiring-app.instructions.md"

# Integración con Aleph
handoffs:
  - label: "Crear flow de juego"
    agent: "WiringApp"
  - label: "Importar template wiki-racer"
    agent: "WiringApp"
  - label: "Exportar a Node-RED"
    agent: "WiringApp"
---

# Plugin: WiringApp

WiringApp es una **extensión de WireEditor** que proporciona templates y asesoría para crear flows de juegos de navegación tipo wiki-racer.

## Propósito

Demostrar cómo crear aplicaciones Node-RED complejas, usando wiki-racer como ejemplo de:
- Flow con UI dashboard
- Nodos personalizados
- Gestión de estados de juego
- Integración con APIs externas

## Capacidades

- Cargar template wiki-racer (1680 nodos)
- Crear flows de juego de navegación personalizados
- Exportar flows compatibles con Node-RED
- Asesorar sobre nodos y patrones de flow

## Integración con Submódulo

- **Submódulo**: `wiki-racer`
- **Rama**: `integration/beta/scriptorium`
- **Tecnología**: Node-RED 2.x, TypeScript, RxJS

## Uso

```
@aleph [WIRING-APP] Crear flow de juego

O directamente:
@plugin_ox_wiringapp crear flow de juego de navegación
```

## Relación con WireEditor

WiringApp **extiende** WireEditor, no lo reemplaza:

```
WireEditor (base)
    └── WiringApp (extensión)
            └── Templates de juego
            └── Nodos wiki-racer
            └── Patrones de navegación
```
