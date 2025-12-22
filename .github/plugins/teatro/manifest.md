---
id: teatro
name: "Teatro Interactivo"
version: "1.0.0"
description: "Sistema unificado para experiencias de teatro transmedia interactivo. Conecta ARG_BOARD, AGENT_CREATOR y GH-PAGES con visualización 3D basada en impress.js."
author: "Aleph Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies:
  - arg-board
  - agent-creator
  - gh-pages

# Recursos exportados
agents:
  - name: "Teatro"
    file: "agents/teatro.agent.md"
    description: "Orquestador del teatro transmedia. Coordina generación, instalación y ejecución de obras."

prompts:
  - name: "teatro-generar-obra"
    file: "prompts/teatro-generar-obra.prompt.md"
    description: "UC1: Genera YAML de obra personalizada con 12 estadios"
  - name: "teatro-instalar-obra"
    file: "prompts/teatro-instalar-obra.prompt.md"
    description: "UC2: Registra obra en cartelera y ARG_BOARD"
  - name: "teatro-ejecutar-obra"
    file: "prompts/teatro-ejecutar-obra.prompt.md"
    description: "UC3: Activa obra y publica en GitHub Pages"

instructions:
  - name: "teatro-interactivo"
    file: "instructions/teatro-interactivo.instructions.md"
    description: "Contexto unificado del sistema de teatro"

# Integración con Aleph
handoffs:
  - label: "Generar nueva obra"
    agent: "Teatro"
    prompt: "Genera una obra de teatro transmedia personalizada con estructura de monomito (12 estadios)."
  - label: "Instalar obra en cartelera"
    agent: "Teatro"
    prompt: "Registra una obra en obras.json de ARG_BOARD y actualiza la cartelera en docs/teatro.md."
  - label: "Ejecutar obra (poner en escena)"
    agent: "Teatro"
    prompt: "Activa una obra, genera su página impress.js y publica en GitHub Pages."
  - label: "Ver cartelera"
    agent: "Teatro"
    prompt: "Muestra las obras disponibles con su estado (en cartel, en escena, clausurada)."
  - label: "Crear personaje para obra"
    agent: "Teatro"
    prompt: "Crea un personaje (agente especializado) y lo registra como actor en una obra."

# Configuración
data_directory: "ARCHIVO/PLUGINS/TEATRO/"
site_section: "docs/teatro.md"
---

# Teatro Interactivo

Sistema unificado para experiencias de teatro transmedia interactivo en Aleph Scriptorium.

## Concepto

El usuario experimenta el Scriptorium como un **teatro navegable** donde puede:
- Visionar obras (experiencias guiadas)
- Interactuar con personajes (agentes especializados)
- Recorrer caminos narrativos (monomitos de 12 estadios)

## Arquitectura

```
┌──────────────────────────────────────────────────────────────────────┐
│                     TEATRO INTERACTIVO                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌───────────────┐      ┌───────────────┐      ┌───────────────┐    │
│   │ AGENT_CREATOR │─────▶│   ARG_BOARD   │─────▶│   GH-PAGES    │    │
│   │  (personajes) │      │    (obras)    │      │  (cartelera)  │    │
│   └───────────────┘      └───────┬───────┘      └───────┬───────┘    │
│                                  │                      │             │
│                                  ▼                      ▼             │
│                         ┌───────────────┐      ┌───────────────┐     │
│                         │  IMPRESS.JS   │◀─────│   TEATRO.MD   │     │
│                         │  (3D viewer)  │      │  (cartelera)  │     │
│                         └───────────────┘      └───────────────┘     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

## Plugins Requeridos

| Plugin | Función en Teatro |
|--------|-------------------|
| **ARG_BOARD** | Gestión de obras, actores, monomitos, estado del teatro |
| **AGENT_CREATOR** | Creación de personajes (agentes especializados) |
| **GH_PAGES** | Publicación de cartelera y páginas de obras |

## Casos de Uso

1. **Generar Obra**: Crear YAML con 12 estadios personalizados
2. **Instalar Obra**: Registrar en ARG_BOARD y cartelera web
3. **Ejecutar Obra**: Publicar página impress.js y poner "en escena"

## Visualización (Sistema de Anillos)

Las obras se visualizan en un espacio 3D con navegación por anillos:

- **Anillo 0**: Centro (inicio de la obra)
- **Anillo 1**: Primera expansión (estadios 1-4)
- **Anillo 2**: Segunda expansión (estadios 5-8)
- **Anillo 3**: Periferia (estadios 9-12)

## Obra Demo

"El Camino del Tarotista" - Tour guiado por todas las features del Scriptorium.
