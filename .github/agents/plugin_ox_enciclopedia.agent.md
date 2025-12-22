---
name: plugin_ox_enciclopedia
description: "Bridge: conecta VS Code con agentes del plugin Enciclopedia. Ver .github/plugins/enciclopedia/agents/"
argument-hint: "Consulta la biblioteca de tomos enciclopédicos o busca por período/tema."
tools: ['agent']
handoffs:
  - label: Listar agentes de Enciclopedia
    agent: plugin_ox_enciclopedia
    prompt: Lista todos los agentes disponibles en el plugin Enciclopedia (bibliotecario y tomos cargados).
    send: false
  - label: Invocar Bibliotecario
    agent: .github/plugins/enciclopedia/agents/bibliotecario.agent.md
    prompt: Gestor principal de la biblioteca. Lista tomos, realiza búsquedas globales, carga nuevos tomos.
    send: false
  - label: Buscar en Historia de la Filosofía
    agent: .github/plugins/enciclopedia/agents/tomos/hdf-ernesto-castro.agent.md
    prompt: Busca en el tomo "Historia de la Filosofía" (Ernesto Castro, 2017-2018) por período, filósofo o temática.
    send: false
---

# Plugin Ox: Enciclopedia

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/enciclopedia/agents/`.
> El plugin Enciclopedia es la biblioteca de tomos enciclopédicos con búsquedas temporales y temáticas.

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **Bibliotecario** | `bibliotecario.agent.md` | Gestor principal. Lista tomos, búsquedas globales. |
| **HDF-ErnestoCastro** | `tomos/hdf-ernesto-castro.agent.md` | Tomo: Historia de la Filosofía (61 caps). |

---

## Tomos cargados

| ID | Nombre | Capítulos | Período |
|----|--------|-----------|---------|
| `hdf-ernesto-castro` | Historia de la Filosofía | 61 | 2017-2018 |

---

## Referencia

- **Manifest**: `.github/plugins/enciclopedia/manifest.md`
- **Agentes**: `.github/plugins/enciclopedia/agents/`
- **Datos de runtime**: `ARCHIVO/PLUGINS/ENCICLOPEDIA/`
