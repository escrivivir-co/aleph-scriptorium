---
id: hypergraph-editor
name: "HyperGraphEditor (Navegador de Grafos Hipervinculados)"
version: "1.0.0"
description: "Plugin para visualizar y navegar mapas de enlaces hipervinculados. Usa el motor wiki-racer con fuentes abstractas (IGraphSource). Incluye preset MediaWiki."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies: []
optional_dependencies:
  - arg-board
  - mcp-presets
  - typed-prompting

# Integración con submódulo
submodule: "wiki-racer"

# Recursos exportados
agents:
  - name: "HyperGraphEditor"
    file: "agents/hypergraph-editor.agent.md"
    description: "Navegador visual de grafos hipervinculados"

prompts:
  - name: "crear-mapa"
    file: "prompts/crear-mapa.prompt.md"
    description: "Crear mapa de enlaces desde fuente de datos"
  - name: "navegar-grafo"
    file: "prompts/navegar-grafo.prompt.md"
    description: "Navegar interactivamente un grafo"
  - name: "crear-source"
    file: "prompts/crear-source.prompt.md"
    description: "Implementar nueva fuente de datos (IGraphSource)"

instructions:
  - name: "hypergraph-editor"
    file: "instructions/hypergraph-editor.instructions.md"

# Presets MCP incluidos
presets:
  - name: "MediaWiki"
    file: "presets/mediawiki.json"
    description: "Fuente de datos para APIs MediaWiki (Wikipedia, etc.)"

# Integración con Aleph
handoffs:
  - label: "Crear mapa de enlaces"
    agent: "HyperGraphEditor"
  - label: "Navegar grafo"
    agent: "HyperGraphEditor"
  - label: "Crear fuente de datos"
    agent: "HyperGraphEditor"
  - label: "Cargar preset MediaWiki"
    agent: "HyperGraphEditor"
---

# Plugin: HyperGraphEditor

HyperGraphEditor es un **navegador visual de grafos hipervinculados**. Abstrae el motor wiki-racer para trabajar con cualquier fuente de datos que implemente `IGraphSource`.

## Propósito

Visualizar y navegar mapas de enlaces sin acoplarse a Wikipedia. Permite:
- Grafos personalizados (JSON/YAML)
- APIs externas (MediaWiki, Wikidata, GitHub)
- Enciclopedias locales (ARCHIVO/ENCICLOPEDIA)

## Arquitectura

```
            ┌─────────────────────────┐
            │   HyperGraphEditor      │
            │   (visualización)       │
            └───────────┬─────────────┘
                        │
                        ▼
            ┌─────────────────────────┐
            │   wiki-racer motor      │
            │   (navegación)          │
            └───────────┬─────────────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐
    │MediaWiki│   │ Custom  │   │Enciclo- │
    │ (preset)│   │ (JSON)  │   │ pedia   │
    └─────────┘   └─────────┘   └─────────┘
```

## IGraphSource Interface

```typescript
interface IGraphSource {
  // Obtener nodo por ID
  getNode(id: string): Promise<GraphNode>;
  
  // Obtener enlaces salientes de un nodo
  getLinks(nodeId: string): Promise<GraphLink[]>;
  
  // Buscar nodos por texto
  search(query: string): Promise<GraphNode[]>;
}
```

## Presets Incluidos

| Preset | Fuente | Descripción |
|--------|--------|-------------|
| MediaWiki | Wikipedia API | Navegación por artículos de Wikipedia |

## Uso

```
@aleph [HYPERGRAPH-EDITOR] Crear mapa de enlaces sobre IA

@aleph [HYPERGRAPH-EDITOR] Cargar preset MediaWiki
```
