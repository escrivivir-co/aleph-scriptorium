# Datos del Plugin Network

> **Estado**: Inicializado  
> **Propósito**: Almacenamiento de estado de sincronización con Oasis

---

## Contenido

Este directorio almacena los datos de runtime del plugin Network:

| Archivo | Descripción |
|---------|-------------|
| `sync-state.json` | Estado de sincronización con Oasis |

---

## sync-state.json

Estructura del archivo de estado:

```json
{
  "scriptorium_id": "mi-scriptorium",
  "autor_pubkey": "@xxxxx.ed25519",
  "configurado": true,
  "fecha_configuracion": "2025-12-24T10:00:00Z",
  "oasis_url": "http://localhost:3000",
  "ultima_sincronizacion": null,
  "entradas_publicadas": [],
  "entradas_recibidas": [],
  "peers_conocidos": [],
  "conflictos_pendientes": [],
  "estadisticas": {
    "publicadas_total": 0,
    "recibidas_total": 0,
    "sincronizaciones": 0
  }
}
```

---

## Gestión

- Este directorio es gestionado por el agente `@network`
- No modificar manualmente los archivos JSON
- Para resetear, eliminar `sync-state.json` y reconfigurar
