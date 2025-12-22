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
```

**Requisitos**: VS Code + GitHub Copilot Chat (suscripción activa)

**Guía completa**: [escrivivir-co.github.io/aleph-scriptorium/leeme/](https://escrivivir-co.github.io/aleph-scriptorium/leeme/)

---

## Arquitectura

```
.github/
├── agents/              # 12 agentes core + bridges
├── plugins/             # 5 plugins (ARG, Enciclopedia, GH-Pages, Scraper, Creator)
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

## Agentes

| Capa | Agentes | Función |
|------|---------|---------|
| **UI** | \`@aleph\`, \`@revisor\`, \`@periodico\` | Producción |
| **Backend** | \`@blueflag\`, \`@blackflag\`, \`@redflag\`, \`@yellowflag\`, \`@orangeflag\` | Auditoría (5 Banderas) |
| **Sistema** | \`@vestibulo\`, \`@cartaspuerta\` | Navegación |
| **Meta** | \`@pluginmanager\`, \`@ox\` | Gestión |
| **Plugins** | 13 agentes vía bridges | Extensiones |

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

Protocolo: [.github/PLUGINS.md](.github/PLUGINS.md)

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
│  ██████╗ ███████╗████████╗ █████╗    ██╗                     │
│  ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗  ███║                     │
│  ██████╔╝█████╗     ██║   ███████║  ╚██║                     │
│  ██╔══██╗██╔══╝     ██║   ██╔══██║   ██║                     │
│  ██████╔╝███████╗   ██║   ██║  ██║   ██║                     │
│  ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝                     │
│                                                              │
│  v1.0.0-beta.1 · Primera piedra · 2025-12-22                 │
│  Sprint 0 cerrado · 19/21 épicas · 336 tareas                │
└──────────────────────────────────────────────────────────────┘
```

| Componente | Versión | Estado |
|------------|---------|--------|
| Scriptorium | **1.0.0-beta.1** | ✅ Sprint 0 cerrado |
| Fundación | 0.0.1 | 🔄 85% (Sprint 0) |
| Web (GH-Pages) | 1.1.0 | ✅ 9 páginas |
| Plugins | 5 instalados | ✅ Operativos |

**Backlog activo**: [BACKLOG-SCRIPTORIUM.md](.github/BACKLOG-SCRIPTORIUM.md)

**Roadmap**: [escrivivir-co.github.io/aleph-scriptorium/roadmap/](https://escrivivir-co.github.io/aleph-scriptorium/roadmap/)

---

## Documentación

| Recurso | Ubicación |
|---------|-----------|
| **Guía de usuario** | [Web: /leeme/](https://escrivivir-co.github.io/aleph-scriptorium/leeme/) |
| **Agentes** | [Web: /agentes/](https://escrivivir-co.github.io/aleph-scriptorium/agentes/) |
| **Archivo doctrinal** | [Web: /archivo/](https://escrivivir-co.github.io/aleph-scriptorium/archivo/) |
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
- 5 plugins instalados (ARG, Enciclopedia, GH-Pages, Scraper, Creator)
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
