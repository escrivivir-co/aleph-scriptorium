---
name: HyperGraphEditor Context
description: "Contexto y reglas para el plugin HyperGraphEditor (navegación de grafos hipervinculados)"
applyTo: "ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/**/*.json, wiki-racer/src/**/*"
---

# Instrucciones: HyperGraphEditor

## Contexto

HyperGraphEditor abstrae el motor wiki-racer para navegación de grafos con fuentes de datos intercambiables (IGraphSource).

## IGraphSource Interface

La interfaz que deben implementar las fuentes de datos:

```typescript
interface IGraphSource {
  name: string;
  version: string;
  
  // Inicializar conexión
  initialize(): Promise<void>;
  
  // Obtener nodo por ID
  getNode(id: string): Promise<GraphNode>;
  
  // Obtener enlaces salientes de un nodo
  getLinks(nodeId: string): Promise<GraphLink[]>;
  
  // Buscar nodos por texto
  search(query: string): Promise<GraphNode[]>;
  
  // Verificar si un nodo existe
  exists(id: string): Promise<boolean>;
}
```

## Preset MediaWiki

El preset `mediawiki.json` configura:

```json
{
  "name": "MediaWiki",
  "type": "api",
  "baseUrl": "https://{lang}.wikipedia.org/w/api.php",
  "parameters": {
    "action": "query",
    "format": "json",
    "origin": "*"
  },
  "endpoints": {
    "getNode": "titles={id}&prop=extracts",
    "getLinks": "titles={id}&prop=links&pllimit=max",
    "search": "list=search&srsearch={query}"
  }
}
```

## Reglas de Integración

1. **Presets en `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/presets/`**
2. **Grafos guardados en `graphs/` (JSON/YAML)**
3. **Fuentes TypeScript en `sources/`**
4. **Usar interface IGraphSource para nuevas fuentes**

## Mapeo con wiki-racer

| wiki-racer | HyperGraphEditor |
|------------|------------------|
| Wikipedia API | MediaWiki preset (IGraphSource) |
| `estado.ts` | Estados de navegación |
| `motor.ts` | Lógica de caminos |
| Node-RED flow | No usado (solo motor) |

## Lo que NO hacer

- No hardcodear URLs de Wikipedia (usar preset)
- No ignorar interface IGraphSource al crear fuentes
- No mezclar lógica de visualización con fuente de datos
