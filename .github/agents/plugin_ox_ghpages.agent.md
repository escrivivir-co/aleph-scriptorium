---
name: GHPages
description: "Bridge: conecta VS Code con agentes del plugin GH-Pages. Ver .github/plugins/gh-pages/agents/"
argument-hint: "Publica contenido en GitHub Pages (fusionar o reemplazar) o inicializa el sitio."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'playwright/*', 'agent', 'todo']
handoffs:
  - label: Listar agentes de GH-Pages
    agent: plugin_ox_ghpages
    prompt: Lista los agentes disponibles en el plugin GH-Pages.
    send: false
  - label: Invocar GHPages (Publicador)
    agent: .github/plugins/gh-pages/agents/ghpages.agent.md
    prompt: Orquestador de publicación en GitHub Pages. Modos fusionar y reemplazar.
    send: false
  - label: Inicializar sitio GitHub Pages
    agent: .github/plugins/gh-pages/agents/ghpages.agent.md
    prompt: Configura el sitio GitHub Pages con la plantilla Jekyll del Scriptorium.
    send: false
  - label: Publicar contenido (modo fusionar)
    agent: .github/plugins/gh-pages/agents/ghpages.agent.md
    prompt: Añade contenido al sitio sin eliminar lo existente.
    send: false
  - label: Publicar contenido (modo reemplazar)
    agent: .github/plugins/gh-pages/agents/ghpages.agent.md
    prompt: Reemplaza todo el contenido de la sección especificada.
    send: false
---

# Plugin Ox: GH-Pages

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/gh-pages/agents/`.
> El plugin GH-Pages publica contenido del Scriptorium en GitHub Pages.

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **GHPages** | `ghpages.agent.md` | Orquestador de publicación. Modos fusionar/reemplazar. |

---

## Modos de publicación

| Modo | Descripción |
|------|-------------|
| **Fusionar** | Añade contenido sin eliminar lo existente |
| **Reemplazar** | Sustituye todo el contenido de la sección |

---

## URL canónica

🌐 [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

---

## Referencia

- **Manifest**: `.github/plugins/gh-pages/manifest.md`
- **Agentes**: `.github/plugins/gh-pages/agents/`
- **Plantilla Jekyll**: `docs/`
- **Datos de runtime**: `ARCHIVO/PLUGINS/GH_PAGES/`
