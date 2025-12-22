# ARCHIVO/PLUGINS/GH_PAGES/

> **Plugin**: gh-pages v1.1.0  
> **Función**: Datos de runtime para publicación en GitHub Pages

---

## Arquitectura (SCRIPT-0.14.0)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLUGIN GH-PAGES                               │
├─────────────────────────────────────────────────────────────────┤
│  .github/plugins/gh-pages/         ← CÓDIGO (inmutable)         │
│  ├── manifest.md                   Metadatos del plugin          │
│  ├── agents/ghpages.agent.md       Agente orquestador            │
│  ├── prompts/                      Comandos disponibles          │
│  ├── instructions/                 Flujos de trabajo             │
│  └── docs/README.md                Documentación del plugin      │
├─────────────────────────────────────────────────────────────────┤
│  docs/                             ← FUENTE DE VERDAD (web)      │
│  ├── _config.yml                   Configuración Jekyll          │
│  ├── _includes/                    Headers, footers              │
│  ├── _layouts/                     Plantillas Jekyll             │
│  ├── assets/css/main.css           Estilos globales              │
│  └── *.md                          Páginas del sitio             │
├─────────────────────────────────────────────────────────────────┤
│  ARCHIVO/PLUGINS/GH_PAGES/         ← DATOS (esta carpeta)        │
│  ├── config.json                   Estado de publicación         │
│  └── published/manifest.json       Registro de publicaciones     │
└─────────────────────────────────────────────────────────────────┘
```

**Decisión arquitectural**: No hay plantilla duplicada. `docs/` (raíz) es la única fuente de verdad.

---

## Contenido

| Archivo/Carpeta | Descripción |
|-----------------|-------------|
| `config.json` | Configuración y estado del plugin |
| `published/` | Registro de publicaciones realizadas |

---

## config.json

Estado de la configuración del plugin:

```json
{
  "initialized": true,
  "site_url": "https://escrivivir-co.github.io/aleph-scriptorium/",
  "pages_source": "main/docs",
  "docs_folder": "docs",
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
      "destination": "docs/_posts/*",
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

---

## Referencias

- [Documentación del plugin](../../../.github/plugins/gh-pages/docs/README.md)
- [Instrucciones](../../../.github/plugins/gh-pages/instructions/gh-pages.instructions.md)
- [Sitio web (fuente de verdad)](../../../docs/)
