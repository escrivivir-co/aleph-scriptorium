# HyperGraphEditor — Datos de Runtime

> Directorio de datos del plugin HyperGraphEditor

## Estructura

```
ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/
├── presets/             # Configuraciones de fuentes de datos
│   └── mediawiki.json   # Preset para APIs MediaWiki
├── graphs/              # Grafos guardados por el usuario
│   └── *.json           # Cada grafo con nodos y enlaces
├── sources/             # Implementaciones IGraphSource (TypeScript)
└── README.md            # Este archivo
```

## Presets

Configuraciones predefinidas para fuentes de datos.

| Preset | Descripción |
|--------|-------------|
| `mediawiki.json` | API de Wikipedia y proyectos Wikimedia |

## Grafos

Mapas de enlaces guardados por el usuario. Formato JSON:

```json
{
  "name": "string",
  "source": "string (preset usado)",
  "root": "string (nodo inicial)",
  "nodes": [...],
  "links": [...]
}
```

## Sources

Implementaciones personalizadas de IGraphSource en TypeScript.

Cada source debe:
1. Implementar interface IGraphSource
2. Exportar función `createSource(config)`
3. Documentar parámetros requeridos

## Registrar en MCP Presets

Para hacer el preset disponible en MCP Presets:

```
@aleph [MCP-PRESETS] Importar preset desde ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/presets/mediawiki.json
```
