# Aleph Scriptorium

![Version](https://img.shields.io/badge/version-1.0.0--alpha.1--preview-blueviolet)
[![License: AIPL](https://img.shields.io/badge/License-AIPL%20v1.0-blue.svg)](LICENSE.md)
[![GitHub Pages](https://img.shields.io/badge/Web-GitHub%20Pages-success)](https://escrivivir-co.github.io/aleph-scriptorium/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Sistema de agentes de IA para VS Code + GitHub Copilot Chat, diseñado para proyectos de escritura extensos.

> **Web**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)  
> **Guía**: [/leeme](https://escrivivir-co.github.io/aleph-scriptorium/leeme/) · **Ecosistema**: [/ecosistema](https://escrivivir-co.github.io/aleph-scriptorium/ecosistema/)

---

## Quick Start

```bash
git clone https://github.com/escrivivir-co/aleph-scriptorium.git
cd aleph-scriptorium && code .

# En Copilot Chat:
@aleph hola

# Setup completo (plugins + submódulos):
./scripts/setup-workspace.sh
```

**Requisito**: VS Code + GitHub Copilot Chat

---

## Estructura

```
.github/          # 31 agentes · 19 plugins · prompts · instructions
ARCHIVO/          # Base doctrinal (marco, diagnóstico, justificación)
PROYECTOS/        # Textos en progreso (Fundación: 12 caps 2026)
docs/             # Sitio web (Jekyll/GitHub Pages)
```

---

## Agentes (31)

| Capa | Agentes | Función |
|------|---------|---------|
| 🟢 UI | `@aleph` `@revisor` `@periodico` | Producción |
| 🔵⚫🔴🟡🟠 Backend | `@blueflag` `@blackflag` `@redflag` `@yellowflag` `@orangeflag` | Auditoría |
| ⚪ Sistema | `@vestibulo` `@cartaspuerta` | Navegación |
| ⚙️ Meta | `@ox` `@pluginmanager` `@indice` | Gestión |
| 🔌 Bridges | 18 bridges → plugins | Extensiones |

Las **5 Banderas** auditan propuestas desde 5 ángulos: verdad (evidencia), sombras (poder), estructura (escala), límites (inconmensurabilidad) y registro (retórica).

---

## Plugins (19)

**Operativos (8)**: ARG Board, Enciclopedia, GH-Pages, Foro Scraper, Agent Creator, Teatro, Scrum, MCP-Presets

**Borradores (11)**: Network, Novelist, Blockly Editor, Prolog Editor, Wire Editor, N8N Editor, TypedPrompting, WiringApp, ArgBoardApp, HyperGraphEditor

Cada plugin tiene un bridge en `.github/agents/plugin_ox_{id}.agent.md`. Ver [PLUGINS.md](.github/PLUGINS.md).

---

## Submódulos (14)

| Categoría | Qué aportan |
|-----------|-------------|
| 🎭 Teatro | Extensión VS Code, Matrix Theater, HyperGraph |
| 🧠 Lógica | 10 paradigmas IA (FIA), Prolog, bloques Blockly |
| 🔄 Flujos | Node-RED, n8n workflows, P2P Oasis |
| 📝 Contenido | Novelist (memoria), TypedPrompting, MCP Presets |
| 🤖 Bots | Streaming Kick.com |

Ver [scripts/README.md](scripts/README.md) para setup y `.gitmodules` para detalle.

---

## Contribuir

```bash
# Rama activa: fc1 (main congelada para releases)
git checkout fc1 && git checkout -b feature/mi-cambio
# Commit → Push → PR a fc1
```

- [CONTRIBUTING.md](CONTRIBUTING.md) — Proceso
- [DEVOPS.md](.github/DEVOPS.md) — Commits y metodología
- [BACKLOG-SCRIPTORIUM.md](.github/BACKLOG-SCRIPTORIUM.md) — Tareas

---


## Estado

| Componente | Valor |
|------------|-------|
| Versión | **1.0.0-alpha.1-preview** (ItacaEditor) |
| Rama activa | `v1.0.0-alpha.1` (preview) |
| Agentes | 31+ (core) + plugins (ver sección) |
| Plugins | 19 (8 operativos + 11 borradores) |
| Submódulos | 14 integrados |
| Última foto | [Foto Dual Pathykar](ARCHIVO/FOTOS_ESTADO/2025-12-27_FC2_FotoDualPathykar.md) |

**Roadmap**: [/roadmap](https://escrivivir-co.github.io/aleph-scriptorium/roadmap/)

---

## Notas del Release: ItacaEditor (v1.0.0-alpha.1-preview)

- Primer release alpha del editor Itaca.
- Estado: preview, rama de integración activa (`v1.0.0-alpha.1`).
- Integración inicial de submódulos, plugins y agentes principales.
- Se recomienda testeo y feedback antes de consolidar a producción.
- Métricas: 31+ agentes core, 19 plugins, 14 submódulos.

> Este release es una versión de avance (preview). El desarrollo continúa en la rama de integración.

---

## Licencia

**AIPL v1.0** — Framework libre. Contenido "Fundación" © Escrivivir.co 2025.

---

<p align="center">
  <strong>ℵ</strong> · <em>v1.0.0-beta.3</em> · Forjado en <a href="https://github.com/escrivivir-co/vibe-bitacora">VibeBitacora</a>
</p>
