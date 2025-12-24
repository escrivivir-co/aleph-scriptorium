# Aleph Scriptorium

[![Version](https://img.shields.io/badge/version-1.0.0--beta.3-blueviolet)](https://github.com/escrivivir-co/aleph-scriptorium/releases/tag/v1.0.0-beta.3)
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
├── agents/              # 12 agentes core + 18 bridges
├── plugins/             # 18 plugins (8 operativos + 10 borradores)
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

### Submódulos del proyecto (14)

| Categoría | Submódulos | Propósito |
|-----------|------------|----------|
| 🎭 Teatro | `vscode-alephscript-extension`, `as-utils-sdk`, `wiki-racer` | Extensión VS Code, Matrix Theater, HyperGraph |
| 🧠 Lógica | `as-gym`, `iot-sbr-logica-para-bots`, `blockly-alephscript-sdk` | Paradigmas IA, Prolog, bloques visuales |
| 🔌 Flujos | `node-red-alephscript-sdk`, `alephscript-n8n-like-editor`, `alephscript-network-sdk` | Node-RED, workflows, P2P |
| 📝 Contenido | `mcp-novelist`, `alephscript-typed-prompting`, `alephscript-mcp-presets-site` | Narrativas, ontologías, presets MCP |
| 🤖 Bots | `kick-aleph-bot`, `kick-aleph-crono-bot` | Streaming Kick.com |

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

## Plugins (18)

| Categoría | Plugins | Descripción |
|-----------|---------|-------------|
| **Core (8)** | ARG Board, Enciclopedia, GH-Pages, Foro Scraper, Agent Creator, Teatro, Scrum, MCP-Presets | Capacidades fundacionales |
| **Red** | Network (Oasis) | Sincronización P2P de BOEs |
| **Narrativa** | Novelist | Edición con memoria a largo plazo |
| **Lógica** | Blockly Editor, Prolog Editor | Programación visual y declarativa |
| **Flujos** | Wire Editor, N8N Editor, WiringApp | Node-RED, workflows visuales |
| **Grafos** | ArgBoardApp, HyperGraphEditor | Máquinas de estados, navegación wiki |
| **Validación** | TypedPrompting | Ontologías NL↔JSON |

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
│  ███████╗ ██████╗   ██╗                                      │
│  ██╔════╝██╔════╝  ███║                                      │
│  █████╗  ██║       ╚██║  ← Feature Cycle 1                   │
│  ██╔══╝  ██║        ██║    Rama activa: fc1                  │
│  ██║     ╚██████╗   ██║    Main: 🧊 congelada                │
│  ╚═╝      ╚═════╝   ╚═╝                                      │
│                                                              │
│  v2.0.0-dev · 2025-12-24 · 14 submódulos · 18 plugins        │
└──────────────────────────────────────────────────────────────┘
```

| Componente | Versión | Estado |
|------------|---------|--------|
| Scriptorium | **2.0.0-dev** | 🔥 FC1 activo (rama `fc1`) |
| Submódulos | 14 integrados | 🔄 integration/beta/scriptorium |
| Plugins | 18 registrados | ✅ 8 operativos + 10 borradores |
| Agentes | 36 invocables | ✅ 12 core + 8 bridges + 16 plugins |
| Fundación | 0.0.1 | ⏸️ Pendiente FC2 |

**Rama de trabajo: `fc1`** — Main congelada para releases. Feature Cycle 1 integra 14 submódulos y 18 plugins en un ecosistema unificado: teatro dinámico, paradigmas FIA, flujos visuales, sincronización P2P. [Foto de futuro](ARCHIVO/FOTOS_ESTADO/2025-12-24_FC1_VisionFuturo.md).

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

## Release Notes · v1.0.0-beta.3

```
$ git log --oneline fc1 | head -1
62233b1 docs(script/devops): cerrar SCRIPT-1.11.0 Ecosistema al 100%
```

### 🎄 Nochebuena: Semillas de Futuro

**v1.0.0-beta.3** cierra Feature Cycle 1 con un ecosistema completo de **14 submódulos** y **18 plugins** integrados. Las semillas del teatro cognitivo están plantadas.

**Lo que hay:**
- 36 agentes invocables (12 core + 18 bridges + 6 plugins)
- 18 plugins registrados (8 operativos + 10 borradores)
- 14 submódulos integrados (teatro, lógica, flujos, narrativa, bots)
- Sistema de 5 banderas para auditoría doctrinal
- Página Ecosistema con 3 galerías interactivas
- Rama `fc1` como rama activa de desarrollo

**Los submódulos (capacidades futuras):**
- 🎭 **Teatro**: Extension VS Code, Matrix Theater, HyperGraph
- 🧠 **Lógica**: FIA (10 paradigmas), Prolog, Blockly
- 🔌 **Flujos**: Node-RED, n8n Editor, Oasis P2P
- 📝 **Contenido**: Novelist, TypedPrompting, MCP Presets
- 🤖 **Bots**: Kick.com streaming

**Foto de futuro**: [ARCHIVO/FOTOS_ESTADO/2025-12-24_FC1_VisionFuturo.md](ARCHIVO/FOTOS_ESTADO/2025-12-24_FC1_VisionFuturo.md)

### Cambios desde beta.1

- **SCRIPT-1.0.0**: Teatro Interactivo completo
- **SCRIPT-1.1.0**: Plugin Scrum
- **SCRIPT-1.2.0**: Galería de Fotos de Estado
- **SCRIPT-1.3.0**: Refactorización Teatro (impress.js + BOE)
- **SCRIPT-1.4.0**: Sistema de Avatares
- **SCRIPT-1.5.0**: Plugin Bridge Discovery
- **SCRIPT-1.6.0**: Rediseño Index Web
- **SCRIPT-1.7.0**: Plugin MCP-Presets
- **SCRIPT-1.8.0→1.11.0**: Integración de 14 submódulos

### Contribuir

```bash
# Fork + clone
git clone https://github.com/TU_USUARIO/aleph-scriptorium.git

# Branch desde fc1 (rama activa)
git checkout fc1
git checkout -b feature/mi-aporte

# Hack, commit, push
git push origin feature/mi-aporte

# PR → fc1 (no main)
```

**Nota**: `main` está congelada para releases. El desarrollo activo ocurre en `fc1`.

---

<p align="center">
  <strong>ℵ</strong><br>
  <em>v1.0.0-beta.3 · Semillas de Futuro · 2025-12-24</em><br>
  <code>$ echo "14 submódulos + 18 plugins = teatro cognitivo" >> /dev/future</code>
</p>
