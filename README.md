# Aleph Scriptorium

[![Version](https://img.shields.io/badge/version-1.0.0--beta.1-blueviolet)](https://github.com/escrivivir-co/aleph-scriptorium/releases/tag/v1.0.0-beta.1)
[![License: AIPL](https://img.shields.io/badge/License-AIPL%20v1.0-blue.svg)](LICENSE.md)
[![GitHub Pages](https://img.shields.io/badge/Web-GitHub%20Pages-success)](https://escrivivir-co.github.io/aleph-scriptorium/)
[![VibeBitacora](https://img.shields.io/badge/Powered%20by-VibeBitacora-7289da)](https://github.com/escrivivir-co/vibe-bitacora)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Framework de escritura asistida por IA para proyectos de largo aliento.

> **Sitio web**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

---

## Qué es

**Aleph Scriptorium** es un sistema de agentes de IA para VS Code + GitHub Copilot Chat, diseñado para proyectos de escritura extensos que requieren coherencia sostenida: libros, ensayos serializados, investigaciones, tesis.

El sistema separa:
- **ARCHIVO/** — Tu base de conocimiento (el qué)
- **.github/** — Agentes e instrucciones (el cómo)
- **PROYECTOS/** — Tus textos en progreso (el dónde)

---

## Quick Start

```bash
# Clonar
git clone https://github.com/escrivivir-co/aleph-scriptorium.git
cd aleph-scriptorium

# Abrir en VS Code
code .

# En Copilot Chat, invocar:
@aleph hola
 
# Inicializar setup del workspace (plugins + submódulo extensión)
./scripts/setup-workspace.sh
```

**Requisitos**: VS Code + GitHub Copilot Chat (suscripción activa)

**Guía completa**: [escrivivir-co.github.io/aleph-scriptorium/leeme/](https://escrivivir-co.github.io/aleph-scriptorium/leeme/)

---

## Arquitectura

```
.github/
├── agents/              # 12 agentes core + bridges
├── plugins/             # 8 plugins (ARG, Enciclopedia, GH-Pages, Scraper, Creator, Teatro, Scrum, MCP-Presets)
├── prompts/             # Prompts reutilizables
├── instructions/        # Instrucciones de contexto
├── DEVOPS.md            # Protocolo de desarrollo
├── PLUGINS.md           # Especificación de plugins
└── BACKLOG-*.md         # Gestión de tareas

ARCHIVO/
├── marco/               # 15 docs de herramientas conceptuales
├── diagnostico/         # 5 docs de estado de la cuestión
├── justificacion/       # 4 docs de fundamentación
├── CARTAS/              # 6 cartas-puerta por perfil
├── NOTICIAS/            # Planas periodísticas publicadas
└── DISCO/               # Memoria de trabajo

PROYECTOS/
└── FUNDACION/           # Proyecto demo: 12 capítulos (2026)

docs/                    # Sitio web (Jekyll/GitHub Pages)
```

---

## Setup del Workspace (técnico)

- **Discovery de plugins en VS Code**: `.vscode/settings.json` incluye `chat.promptFilesLocations` y `chat.instructionsFilesLocations` apuntando a `.github/plugins/{id}/prompts|instructions` y a las carpetas canónicas.
- **Script de inicialización**: `scripts/setup-workspace.sh` crea/actualiza los settings y sincroniza los 4 submódulos en rama `integration/beta/scriptorium`.
- **Verificación**:
       - Reinicia VS Code y escribe `/` en Copilot Chat para listar prompts de plugins
       - En cada submódulo, confirma que la rama activa es `integration/beta/scriptorium` y publícala si procede.

### Submódulos del proyecto (4)

| Submódulo | Propósito | Rama origen |
|-----------|-----------|-------------|
| `vscode-alephscript-extension` | Extensión VS Code / Arrakis Theater | main |
| `alephscript-mcp-presets-site` | Zeus MCP Presets (UI web) | main |
| `as-utils-sdk` | VibeCoding Connector / Matrix Theater | main |
| `as-gym` | FIA (Fundamentos de IA) / Almas para Agentes | dev/001 |

Referencias técnicas:
- Protocolo de plugins: [.github/PLUGINS.md](.github/PLUGINS.md)
- Oráculo del sistema: [.github/agents/ox.agent.md](.github/agents/ox.agent.md)
- Scripts de entorno: [scripts/README.md](scripts/README.md)

---

## Agentes

```
                     ┌─────────────────────────────┐
                     │         🐂 OX (Meta)        │
                     │   Oráculo · Documentación   │
                     └──────────────┬──────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       │                            │                            │
       ▼                            ▼                            ▼
┌─────────────┐            ┌────────────────┐           ┌────────────────┐
│  🟢 UI (3)  │            │ ⚪ Sistema (2) │           │  ⚙️ Meta (2)   │
│  Producción │            │   Navegación   │           │    Gestión     │
└─────────────┘            └────────────────┘           └────────────────┘
       │
       │ invocan para auditoría
       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   🔵⚫🔴🟡🟠 BACKEND (5 Banderas)                       │
│                    Auditoría y Validación Doctrinal                     │
└─────────────────────────────────────────────────────────────────────────┘
       │
       │ invocan vía bridges
       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        🔌 PLUGINS (8 bridges)                           │
│              ARG · Enciclopedia · GH-Pages · Scraper · Creator          │
│                        Teatro · Scrum · MCP-Presets                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Por capa

| Capa | Agentes | Función |
|------|---------|---------|
| 🟢 **UI** | `@aleph`, `@revisor`, `@periodico` | Producción de contenido |
| 🔵⚫🔴🟡🟠 **Backend** | `@blueflag`, `@blackflag`, `@redflag`, `@yellowflag`, `@orangeflag` | Auditoría (5 Banderas) |
| ⚪ **Sistema** | `@vestibulo`, `@cartaspuerta` | Navegación y orientación |
| ⚙️ **Meta** | `@pluginmanager`, `@ox` | Gestión del sistema |
| 🔌 **Plugins** | 7 bridges → 15 agentes | Extensiones |

### Las 5 Banderas (Backend)

| Bandera | Agente | Tests |
|---------|--------|-------|
| 🔵 Verdad | `@blueflag` | Evidencia, Utilidad, Falsificabilidad, Posverdad |
| ⚫ Sombras | `@blackflag` | Pólvora, Posverdad técnica, Captura enemiga |
| 🔴 Estructura | `@redflag` | Escala, Coerción, Suministro, Régimen material |
| 🟡 Límites | `@yellowflag` | Pre/Trans, Cuadrantes, Mercantilización, Inconmensurabilidad |
| 🟠 Registro | `@orangeflag` | Registro, Género, Estilo, Auditorio |

### Plugin Bridges

| Bridge | Plugin | Agentes |
|--------|--------|---------|
| `@plugin_ox_argboard` | ARG Board | Arrakis, BOE, Decoherence, GitARG, Heroe, ImpressJS, MBox, PlatformCom (8) |
| `@plugin_ox_enciclopedia` | Enciclopedia | Bibliotecario, HDF-ErnestoCastro (2) |
| `@plugin_ox_ghpages` | GH-Pages | GHPages (1) |
| `@plugin_ox_foroscraper` | Foro Scraper | ForoScraper (1) |
| `@plugin_ox_agentcreator` | Agent Creator | AgentCreator (1) |
| `@plugin_ox_teatro` | Teatro | Teatro (1) |
| `@plugin_ox_scrum` | Scrum | Scrum (1) |
| `@plugin_ox_mcppresets` | MCP-Presets | McpPresets (1) |

**Total**: 12 agentes core + 8 bridges + 16 agentes de plugins = **36 agentes**

Detalle: [escrivivir-co.github.io/aleph-scriptorium/agentes/](https://escrivivir-co.github.io/aleph-scriptorium/agentes/)

---

## Plugins

| Plugin | Versión | Descripción |
|--------|---------|-------------|
| **ARG Board** | 1.0.0 | Motor de juegos ARG transmedia |
| **Enciclopedia** | 1.0.0 | Biblioteca de tomos con búsquedas |
| **GH-Pages** | 1.1.0 | Publicación en GitHub Pages |
| **Foro Scraper** | 1.1.0 | Scraping de foros y blogs |
| **Agent Creator** | 1.1.0 | Creación de agentes especializados |
| **Teatro** | 1.0.0 | Experiencias transmedia interactivas |
| **Scrum** | 1.0.0 | Gestión ágil de backlogs (5 fases) |
| **MCP-Presets** | 1.0.0 | Gestión de presets MCP para agentes |

Protocolo: [.github/PLUGINS.md](.github/PLUGINS.md)

---

## Teatro Interactivo

El **Teatro** transforma el Scriptorium en un espacio navegable donde puedes visionar obras, interactuar con personajes (agentes) y recorrer caminos narrativos.

```
      ┌─────────────────────┐
     /       Anillo 3        \    ← Retorno (estadios 9-12)
    │    ┌─────────────┐     │
    │   /   Anillo 2    \    │    ← Pruebas (estadios 5-8)
    │  │  ┌─────────┐   │    │
    │  │ /  Anillo 1 \  │    │    ← Preparación (estadios 1-4)
    │  │ │  Centro 0 │  │    │    ← Inicio
    │  │ \___________/  │    │
    │   \______________/     │
     \_____________________/
```

**Cartelera**: [escrivivir-co.github.io/aleph-scriptorium/teatro/](https://escrivivir-co.github.io/aleph-scriptorium/teatro/)

| Obra | Tipo | Estado |
|------|------|--------|
| **El Camino del Tarotista** | Onboarding | 🎬 En escena |
| Hola Mundo | Demo | 📋 En cartel |

**Componentes**:
- Visualizador 3D basado en impress.js
- Sistema de anillos (monomito de 12 estadios)
- Integración con AGENT_CREATOR y ARG_BOARD

---

## Contribuir

Las contribuciones son bienvenidas. Este proyecto sigue un flujo FOSS estándar:

1. **Fork** del repositorio
2. **Branch** desde \`main\`: \`git checkout -b feature/mi-cambio\`
3. **Commit** siguiendo [convención](.github/DEVOPS.md#2-convención-de-commits)
4. **Push** y abrir **Pull Request**

**Guías**:
- [CONTRIBUTING.md](CONTRIBUTING.md) — Proceso de contribución
- [.github/DEVOPS.md](.github/DEVOPS.md) — Protocolo DevOps
- [.github/BACKLOG-SCRIPTORIUM.md](.github/BACKLOG-SCRIPTORIUM.md) — Tareas activas

**Issues**: Usa las plantillas para [bugs](.github/ISSUE_TEMPLATE/bug_report.md) y [features](.github/ISSUE_TEMPLATE/feature_request.md).

---

## Estado

```
┌──────────────────────────────────────────────────────────────┐
│  ██████╗ ███████╗████████╗ █████╗    ██████╗                 │
│  ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗  ╚════██╗                 │
│  ██████╔╝█████╗     ██║   ███████║   █████╔╝                 │
│  ██╔══██╗██╔══╝     ██║   ██╔══██║  ██╔═══╝                  │
│  ██████╔╝███████╗   ██║   ██║  ██║  ███████╗                 │
│  ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝  ╚══════╝                 │
│                                                              │
│  v1.0.0-beta.2 · Feature Cycle 1 · 2025-12-23                │
│  Sprint 2 en curso · MCP-Presets + VS Code Extension         │
└──────────────────────────────────────────────────────────────┘
```

| Componente | Versión | Estado |
|------------|---------|--------|
| Scriptorium | **1.0.0-beta.2** | 🔄 Sprint 2 (Feature Cycle 1) |
| Fundación | 0.0.1 | ⏸️ Pendiente planificación |
| Web (GH-Pages) | 1.1.0 | ✅ 11 páginas + Teatro |
| Plugins | 8 instalados | ✅ ARG, Enciclopedia, GH-Pages, Scraper, Creator, Teatro, Scrum, MCP-Presets |
| Teatro | 1.0.0 | 🎬 2 obras (1 en escena) |

Sprint 2 activo: **Feature Cycle 1** completó MCP-Presets (100%), avanza Extensión VS Code (11%). 8 plugins operativos, 36 agentes. Próximo objetivo: verificar deploy y planificar Fundación.

**Backlog activo**: [BACKLOG-SCRIPTORIUM.md](.github/BACKLOG-SCRIPTORIUM.md)

**Roadmap**: [escrivivir-co.github.io/aleph-scriptorium/roadmap/](https://escrivivir-co.github.io/aleph-scriptorium/roadmap/)

---

## Documentación

| Recurso | Ubicación |
|---------|-----------|
| **Guía de usuario** | [Web: /leeme/](https://escrivivir-co.github.io/aleph-scriptorium/leeme/) |
| **Agentes** | [Web: /agentes/](https://escrivivir-co.github.io/aleph-scriptorium/agentes/) |
| **Archivo doctrinal** | [Web: /archivo/](https://escrivivir-co.github.io/aleph-scriptorium/archivo/) |
| **Teatro Interactivo** | [Web: /teatro/](https://escrivivir-co.github.io/aleph-scriptorium/teatro/) |
| **Protocolo DevOps** | [.github/DEVOPS.md](.github/DEVOPS.md) |
| **Protocolo Plugins** | [.github/PLUGINS.md](.github/PLUGINS.md) |

---

## Licencia

**AIPL v1.0** (Animus Iocandi Public License)

- **Framework** (código, agentes, instrucciones): Libre para usar, modificar, distribuir
- **Contenido "Fundación"**: © Escrivivir.co 2025, todos los izquierdos SIN derechos reservados

Ver [LICENSE.md](LICENSE.md) para términos completos.

---

## Origen

Forjado en los [Astilleros de VibeBitacora](https://github.com/escrivivir-co/vibe-bitacora), el meta-framework de Escrivivir.co para colaboración humano-IA.

---

---

## Release Notes · v1.0.0-beta.1

```
$ git log --oneline releases/1.0.0-beta.1 | head -1
cf3c52d feat(gh-pages): homogeneizar CSS y cerrar Sprint 0
```

### 🎉 Primera piedra del camino

Esta es la primera versión pública estable de Aleph Scriptorium.

**Lo que hay:**
- 17 agentes operativos (UI + Backend + Sistema + Meta)
- 7 plugins instalados (ARG, Enciclopedia, GH-Pages, Scraper, Creator, Teatro, Scrum)
- Sistema de 5 banderas para auditoría doctrinal
- Sitio web con 9 páginas
- Protocolo DevOps completo
- Documentación FOSS (CONTRIBUTING, templates)

**Lo que viene (Sprint 1):**
- Redacción del Capítulo 1 de Fundación
- Mejoras UX en el sitio web
- Documentación técnica de Euler (cloud)

### Contribuir

```bash
# Fork + clone
git clone https://github.com/TU_USUARIO/aleph-scriptorium.git

# Branch
git checkout -b feature/mi-aporte

# Hack, commit, push
git push origin feature/mi-aporte

# PR → main
```

Cada contribución cuenta. Cada PR es una piedra más.

---

<p align="center">
  <strong>ℵ</strong><br>
  <em>v1.0.0-beta.1 · Primera piedra · 2025-12-22</em><br>
  <code>$ echo "El código es poesía compilada" >> /dev/future</code>
</p>
