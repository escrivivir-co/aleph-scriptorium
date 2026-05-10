# HyperGraphEditor — Documentación

> Plugin para visualizar y navegar mapas de enlaces hipervinculados

## Descripción

HyperGraphEditor abstrae el motor wiki-racer para trabajar con cualquier fuente de datos que implemente `IGraphSource`. Permite visualizar y navegar grafos de enlaces de forma interactiva.

## Instalación

El plugin se activa al instalar el submódulo wiki-racer. Incluye el preset MediaWiki por defecto.

## Uso

### Desde Aleph

```
@aleph [HYPERGRAPH-EDITOR] Crear mapa de enlaces sobre filosofía
```

### Desde el bridge

```
@plugin_ox_hypergrapheditor crear mapa
```

## Presets disponibles

| Preset | Archivo | Descripción |
|--------|---------|-------------|
| MediaWiki | `presets/mediawiki.json` | API de Wikipedia |

## Estructura de datos

```
ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/
├── presets/             # Configuraciones de fuentes
│   └── mediawiki.json   # Preset Wikipedia
├── graphs/              # Grafos guardados
└── sources/             # Implementaciones IGraphSource
```

## IGraphSource

Para crear una nueva fuente de datos, implementar:

```typescript
interface IGraphSource {
  name: string;
  getNode(id: string): Promise<GraphNode>;
  getLinks(nodeId: string): Promise<GraphLink[]>;
  search(query: string): Promise<GraphNode[]>;
}
```

## Referencia del submódulo

- **Repositorio**: `wiki-racer`
- **Motor**: TypeScript + RxJS
- **Estados**: `wiki-racer/src/estado.ts`
