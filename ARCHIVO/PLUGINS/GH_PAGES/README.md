# ARCHIVO/PLUGINS/GH_PAGES/

> **Plugin**: gh-pages  
> **Función**: Datos de runtime para publicación en GitHub Pages

---

## Contenido

| Archivo/Carpeta | Descripción |
|-----------------|-------------|
| `config.json` | Configuración y estado del plugin |
| `published/` | Registro de publicaciones realizadas |
| `drafts/` | Borradores pre-publicación (opcional) |

---

## config.json

Estado de la configuración del plugin:

```json
{
  "initialized": true|false,
  "site_url": "URL del sitio publicado",
  "branch": "gh-pages",
  "last_publish": "timestamp de última publicación"
}
```

---

## published/manifest.json

Registro histórico de todas las publicaciones:

```json
{
  "publications": [
    {
      "id": "pub-001",
      "source": "ARCHIVO/NOTICIAS/*",
      "destination": "_posts/*",
      "mode": "merge|replace",
      "timestamp": "...",
      "commit_sha": "..."
    }
  ]
}
```

---

## Uso

Este directorio es gestionado automáticamente por el agente `@GHPages`. No modificar manualmente a menos que sea necesario para debugging.
