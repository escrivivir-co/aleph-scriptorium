---
name: plugin_ox_foroscraper
description: "Bridge: conecta VS Code con agentes del plugin Foro Scraper. Ver .github/plugins/foro-scraper/agents/"
argument-hint: "Scraping de foros y blogs con estado pausable/reanudable usando MCP Playwright."
tools: ['agent']
handoffs:
  - label: Listar agentes de Foro Scraper
    agent: plugin_ox_foroscraper
    prompt: Lista los agentes disponibles en el plugin Foro Scraper.
    send: false
  - label: Invocar ForoScraper
    agent: .github/plugins/foro-scraper/agents/foro-scraper.agent.md
    prompt: Gestor de trabajos de scraping. Inicia, pausa, reanuda y monitorea descargas.
    send: false
  - label: Iniciar scraping de foro
    agent: .github/plugins/foro-scraper/agents/foro-scraper.agent.md
    prompt: Inicia un nuevo trabajo de scraping con la URL de foro proporcionada.
    send: false
  - label: Iniciar scraping de blog
    agent: .github/plugins/foro-scraper/agents/foro-scraper.agent.md
    prompt: Inicia scraping de un blog (WordPress, Blogger, Medium, Ghost, Substack, Hugo/Jekyll).
    send: false
  - label: Pausar scraping
    agent: .github/plugins/foro-scraper/agents/foro-scraper.agent.md
    prompt: Pausa el trabajo de scraping activo guardando el estado actual.
    send: false
  - label: Reanudar scraping
    agent: .github/plugins/foro-scraper/agents/foro-scraper.agent.md
    prompt: Reanuda un trabajo de scraping pausado desde la última página descargada.
    send: false
  - label: Ver estado de scraping
    agent: .github/plugins/foro-scraper/agents/foro-scraper.agent.md
    prompt: Muestra el estado de todos los trabajos de scraping (activos, pausados, completados).
    send: false
---

# Plugin Ox: Foro Scraper

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/foro-scraper/agents/`.
> El plugin Foro Scraper descarga hilos de foros y entradas de blogs con gestión de estado pausable.

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **ForoScraper** | `foro-scraper.agent.md` | Gestor de trabajos de scraping. |

---

## Fuentes soportadas

### Foros
- vBulletin (`showthread.php?t=X&page=N`)
- phpBB (`viewtopic.php?t=X&start=N`)
- Discourse (`/t/slug/id/N`)
- SMF

### Blogs
- WordPress
- Blogger
- Medium
- Ghost
- Substack
- Hugo/Jekyll (estáticos)

---

## Convención de salida

```
ARCHIVO/DISCO/{fecha}_{tema}_{titulo}/
├── page_001.md
├── page_002.md
├── ...
└── state.json
```

---

## Referencia

- **Manifest**: `.github/plugins/foro-scraper/manifest.md`
- **Agentes**: `.github/plugins/foro-scraper/agents/`
- **Datos de runtime**: `ARCHIVO/PLUGINS/FORO_SCRAPER/`
