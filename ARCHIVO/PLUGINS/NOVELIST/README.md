# Plugin Novelist — Datos de Runtime

> **Plugin**: `novelist`  
> **Versión**: 1.0.0  
> **Submódulo**: `mcp-novelist`

---

## Propósito

Este directorio almacena datos de runtime generados por el plugin Novelist durante la edición de obras narrativas.

---

## Estructura

```
NOVELIST/
├── README.md           # Este archivo
├── config.json         # Configuración del plugin (opcional)
├── sync-log.json       # Registro de sincronizaciones
└── cache/              # Cache temporal de obras
    └── ...
```

---

## Separación de Datos

| Fuente | Ubicación | Propósito |
|--------|-----------|-----------|
| Novelist (MCP) | `mcp-novelist/src/resources/novel-data.json` | Persistencia del servidor |
| TALLER | `ARCHIVO/DISCO/TALLER/{obra}/` | Obras exportadas |
| ELENCO | `ARCHIVO/DISCO/TALLER/ELENCO/` | Personajes |
| Este directorio | `ARCHIVO/PLUGINS/NOVELIST/` | Logs, cache, config |

---

## Archivos Generados

### config.json (opcional)

```json
{
  "mode": "complete|light",
  "mcp_port": 3066,
  "auto_sync": false,
  "sync_interval_minutes": 30,
  "default_author": "Scriptorium"
}
```

### sync-log.json (generado)

```json
{
  "last_sync": "2025-12-24T12:00:00Z",
  "syncs": [
    {
      "timestamp": "2025-12-24T12:00:00Z",
      "direction": "novelist→taller|taller→novelist",
      "obra": "camino-tarotista",
      "status": "success|failed",
      "items_synced": {
        "chapters": 12,
        "scenes": 15,
        "characters": 3
      }
    }
  ]
}
```

---

## Notas

- El servidor MCP guarda en `novel-data.json` del submódulo
- Este directorio es para metadatos del plugin, no para obras
- Las obras viven en TALLER, no aquí
