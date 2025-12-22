# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 0.0.1  
> **Sprint actual**: 0 (Bootstrap)

---

## Épica: SCRIPT-0.0.1 — Kit Mínimo del Scriptorium

**Objetivo**: Establecer la infraestructura base para agentes de escritura política.

**Entregables**:
- Protocolo DevOps
- Agente Aleph actualizado
- Prompts de extracción y commit
- Instrucciones de contexto

---

## Stories

### SCRIPT-0.0.1-S01: Protocolo DevOps
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/DEVOPS.md` | ✅ |
| T002 | Definir convención de commits | ✅ |
| T003 | Establecer estructura de sprints | ✅ |

---

### SCRIPT-0.0.1-S02: Agente Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Añadir sección DevOps a `aleph.agent.md` | ✅ |
| T005 | Integrar generación de commit messages | ✅ |
| T006 | Añadir checklist de trazabilidad | ✅ |
| T016 | Añadir handoffs (auditores + vestíbulo + cartas) | ✅ |

---

### SCRIPT-0.0.1-S03: Prompts Operativos
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Crear prompt `commit-message.prompt.md` | ✅ |
| T008 | Revisar `extraer-archivar.prompt.md` | ✅ |

---

### SCRIPT-0.0.1-S04: Instrucciones de Contexto
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T009 | Verificar `diagnostico.instructions.md` | ✅ |
| T010 | Verificar `marco-conceptual.instructions.md` | ✅ |
| T011 | Verificar `voz-manifiesto.instructions.md` | ✅ |
| T015 | Refactorizar `copilot-instructions.md` como Hub | ✅ |

---

### SCRIPT-0.0.1-S05: Puertas de entrada (README)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Añadir “puertas” por perfil en `README.md` | ✅ |
| T017 | Añadir vestíbulo y cartas al README | ✅ |

---

### SCRIPT-0.0.1-S06: Cartas-puerta (instrucciones)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T013 | Documentar mecanismo de cartas-puerta en `.github/instructions/` | ✅ |

---

### SCRIPT-0.0.1-S07: Vestíbulo de entrada
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T014 | Crear prompt `vestibulo-cartas.prompt.md` | ✅ |
| T018 | Crear agentes `vestibulo.agent.md` y `cartas-puerta.agent.md` | ✅ |

---

### SCRIPT-0.0.1-S08: Feature Noticias (Periódico)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T019 | Crear carpeta `ARCHIVO/NOTICIAS/` con README | ✅ |
| T020 | Crear instrucciones `periodico.instructions.md` | ✅ |
| T021 | Crear agente `periodico.agent.md` con handoffs | ✅ |
| T022 | Crear prompt `periodico-editar.prompt.md` | ✅ |
| T023 | Crear prompt `periodico-publicar.prompt.md` | ✅ |
| T024 | Actualizar `copilot-instructions.md` con Periódico | ✅ |
| T025 | Integrar Periódico en `vestibulo-cartas.prompt.md` | ✅ |
| T026 | Actualizar README.md con sección Noticias | ✅ |

---

## Métricas Sprint 0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 26 |
| Completadas | 26 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.1.0 — Sistema de Plugins

**Objetivo**: Implementar protocolo de extensibilidad mediante plugins para Scriptorium.

**Entregables**:
- Protocolo de plugins (PLUGINS.md)
- Agente plugin-manager
- Estructura plugins/ con registry
- Plugin ARG Board instalado

---

## Stories

### SCRIPT-0.1.0-S01: Protocolo de Plugins
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T027 | Crear `.github/PLUGINS.md` con especificación completa | ✅ |
| T028 | Definir estructura de manifest.md | ✅ |
| T029 | Documentar ciclo de vida de plugins | ✅ |

---

### SCRIPT-0.1.0-S02: Agente Plugin Manager
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T030 | Crear `agents/plugin-manager.agent.md` | ✅ |
| T031 | Implementar handoffs de instalación/desinstalación | ✅ |
| T032 | Crear `prompts/plugin-install.prompt.md` | ✅ |

---

### SCRIPT-0.1.0-S03: Infraestructura de Plugins
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T033 | Crear directorio `.github/plugins/` | ✅ |
| T034 | Inicializar `registry.json` | ✅ |
| T035 | Actualizar `copilot-instructions.md` con sección Plugins | ✅ |

---

### SCRIPT-0.1.0-S04: Plugin ARG Board (Conversión)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T036 | Crear manifest.md para ARG Board | ✅ |
| T037 | Convertir chatmodes a agents/ | ✅ |
| T038 | Migrar prompts relevantes | ✅ |
| T039 | Copiar documentación AS_DOCS/ a docs/ | ✅ |
| T040 | Migrar META/ builders a meta/ | ✅ |

---

### SCRIPT-0.1.0-S05: Integración con Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T041 | Añadir handoffs de ARG Board a aleph.agent.md | ✅ |
| T042 | Registrar plugin en registry.json | ✅ |
| T043 | Crear informe de implementación | ✅ |

---

## Métricas Sprint 0.1

| Métrica | Valor |
|---------|-------|
| Tasks totales | 17 |
| Completadas | 17 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.2.0 — Agente Yellowflag (Auditoría de Límites)

**Objetivo**: Implementar el cuarto auditor del sistema Scriptorium, especializado en detectar cuándo el diseño político pretende capturar lo que escapa a la política.

**Origen**: Debate gnosis/política extraído de `DISCO/Diciembre_25_humanismo_extremo.md/`.

**Entregables**:
- Agente `yellowflag.agent.md`
- Documento de marco `14-gnosis-politica-condiciones-vida-filosofica.md`
- Tests de Yellowflag en `indicadores-fracaso-enero.md`
- Integración con Aleph y sistema de auditores

---

## Stories

### SCRIPT-0.2.0-S01: Agente Yellowflag
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T044 | Crear `agents/yellowflag.agent.md` | ✅ |
| T045 | Definir tests de auditoría de límites | ✅ |
| T046 | Añadir handoffs a otros auditores | ✅ |

---

### SCRIPT-0.2.0-S02: Fundamentación Doctrinal
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T047 | Crear `marco/14-gnosis-politica-condiciones-vida-filosofica.md` | ✅ |
| T048 | Actualizar `README.md` de marco/ | ✅ |

---

### SCRIPT-0.2.0-S03: Integración en el Sistema
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T049 | Añadir handoff a Yellowflag en `aleph.agent.md` | ✅ |
| T050 | Actualizar `copilot-instructions.md` con Yellowflag | ✅ |
| T051 | Añadir tests de Yellowflag a `indicadores-fracaso-enero.md` | ✅ |
| T052 | Crear carta-puerta Yellowflag y actualizar vestíbulo | ✅ |

---

## Métricas Sprint 0.2

| Métrica | Valor |
|---------|-------|
| Tasks totales | 9 |
| Completadas | 9 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.3.0 — Plugin Enciclopedia

**Objetivo**: Implementar plugin de biblioteca enciclopédica con búsquedas temporales y temáticas sobre tomos académicos.

**Entregables**:
- Plugin enciclopedia con manifest, agentes, prompts e instrucciones
- Agente Bibliotecario (gestor principal)
- Agente HDF-ErnestoCastro (tomo cargado)
- Directorio de datos en ARCHIVO/PLUGINS/ENCICLOPEDIA/
- Documentación del sistema de plugins en README.md principal

---

## Stories

### SCRIPT-0.3.0-S01: Estructura del Plugin
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T053 | Crear `plugins/enciclopedia/manifest.md` | ✅ |
| T054 | Crear estructura de carpetas (agents/, prompts/, instructions/, docs/) | ✅ |

---

### SCRIPT-0.3.0-S02: Agentes de la Enciclopedia
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T055 | Crear `agents/bibliotecario.agent.md` | ✅ |
| T056 | Crear `agents/tomos/hdf-ernesto-castro.agent.md` con índice embebido | ✅ |

---

### SCRIPT-0.3.0-S03: Prompts e Instrucciones
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T057 | Crear `prompts/cargar-tomo.prompt.md` | ✅ |
| T058 | Crear `prompts/buscar-temporal.prompt.md` | ✅ |
| T059 | Crear `prompts/buscar-tematica.prompt.md` | ✅ |
| T060 | Crear `instructions/enciclopedia.instructions.md` | ✅ |

---

### SCRIPT-0.3.0-S04: Datos e Integración
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T061 | Crear `ARCHIVO/PLUGINS/ENCICLOPEDIA/` con README | ✅ |
| T062 | Crear `tomos/hdf-ernesto-castro/index-cache.json` | ✅ |
| T063 | Actualizar `registry.json` con plugin enciclopedia | ✅ |
| T064 | Añadir handoffs a `aleph.agent.md` | ✅ |
| T065 | Actualizar `copilot-instructions.md` | ✅ |

---

### SCRIPT-0.3.0-S05: Documentación Pública
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T066 | Crear `plugins/enciclopedia/docs/README.md` | ✅ |
| T067 | Añadir sección de Plugins al README.md principal | ✅ |
| T068 | Crear índice del tomo HDF en ARCHIVO/ENCICLOPEDIA/ | ✅ |

---

## Métricas Sprint 0.3

| Métrica | Valor |
|---------|-------|
| Tasks totales | 16 |
| Completadas | 16 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.4.0 — Agente Orangeflag (Interlocución Aristotélica)

**Objetivo**: Implementar el quinto auditor del sistema Scriptorium, especializado en registro, interlocución y estilo según base aristotélica (dialéctica/retórica).

**Origen**: Análisis de `DISCO/Diciembre_25_Poesía_como_vias_alternativas.md/` (archivos 04-06).

**Entregables**:
- Agente `orangeflag.agent.md`
- Documento de marco `15-dialectica-retorica-interlocucion.md`
- Tests de Orangeflag en indicadores de fracaso
- Integración con Aleph y sistema de auditores
- Actualización de handoffs bidireccionales

---

## Stories

### SCRIPT-0.4.0-S01: Agente Orangeflag
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T069 | Crear `agents/orangeflag.agent.md` | ✅ |
| T070 | Definir tests de registro/interlocución/estilo | ✅ |
| T071 | Añadir handoffs bidireccionales con otros flags | ✅ |

---

### SCRIPT-0.4.0-S02: Fundamentación Doctrinal
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T072 | Crear `marco/15-dialectica-retorica-interlocucion.md` | ✅ |
| T073 | Actualizar `README.md` de marco/ | ✅ |

---

### SCRIPT-0.4.0-S03: Integración en el Sistema
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T074 | Añadir handoff a Orangeflag en `aleph.agent.md` | ✅ |
| T075 | Actualizar `copilot-instructions.md` con Orangeflag | ✅ |
| T076 | Añadir handoffs desde otros flags hacia Orangeflag | ✅ |
| T077 | Actualizar `periodico.agent.md` con invocación Orangeflag | ✅ |
| T081 | Crear carta-puerta Orangeflag | ✅ |
| T082 | Actualizar README.md con Orangeflag | ✅ |

---

### SCRIPT-0.4.0-S04: Extensiones de capacidad
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T078 | Crear prompt `orangeflag-dialectico.prompt.md` (modo examen) | ✅ |
| T079 | Crear prompt `orangeflag-retorico.prompt.md` (modo persuasión) | ✅ |
| T080 | Crear `instructions/orangeflag.instructions.md` | ✅ |

---

## Métricas Sprint 0.4

| Métrica | Valor |
|---------|-------|
| Tasks totales | 14 |
| Completadas | 14 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.5.0 — Plugin GH-Pages (Publicación Web)

**Objetivo**: Implementar plugin de publicación en GitHub Pages con dos modos (fusionar/reemplazar) y plantilla Jekyll minimalista.

**Entregables**:
- Plugin gh-pages con manifest, agente, prompts e instrucciones
- Plantilla Jekyll blanco/negro con banderas
- Integración con agentes Aleph, Periodico y Revisor
- URL canónica: https://escrivivir-co.github.io/aleph-scriptorium/

---

## Stories

### SCRIPT-0.5.0-S01: Estructura del Plugin
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T083 | Crear carpeta `.github/plugins/gh-pages/` | ✅ |
| T084 | Crear `manifest.md` con metadatos | ✅ |
| T085 | Crear subcarpetas (agents, prompts, instructions, meta, docs) | ✅ |

---

### SCRIPT-0.5.0-S02: Agente GHPages
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T086 | Crear `agents/ghpages.agent.md` con handoffs | ✅ |

---

### SCRIPT-0.5.0-S03: Prompts de Publicación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T087 | Crear `prompts/gh-pages-init.prompt.md` | ✅ |
| T088 | Crear `prompts/gh-pages-merge.prompt.md` | ✅ |
| T089 | Crear `prompts/gh-pages-replace.prompt.md` | ✅ |
| T090 | Crear `prompts/gh-pages-publish.prompt.md` | ✅ |

---

### SCRIPT-0.5.0-S04: Instrucciones y Documentación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T091 | Crear `instructions/gh-pages.instructions.md` | ✅ |
| T092 | Crear `docs/README.md` | ✅ |

---

### SCRIPT-0.5.0-S05: Plantilla Jekyll
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T093 | Crear `_config.yml` | ✅ |
| T094 | Crear layouts (default, page, post) | ✅ |
| T095 | Crear includes (header, footer, nav) | ✅ |
| T096 | Crear `assets/css/main.css` (B/N + banderas) | ✅ |
| T105 | Mejorar legibilidad (tipografía/enlaces) y footer (AIPL) | ✅ |
| T097 | Crear `index.md` con secciones | ✅ |

---

### SCRIPT-0.5.0-S06: Integración con Agentes Core
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T098 | Añadir handoff a `aleph.agent.md` | ✅ |
| T099 | Añadir handoff a `periodico.agent.md` | ✅ |
| T100 | Añadir handoff a `revisor.agent.md` | ✅ |

---

### SCRIPT-0.5.0-S07: Datos e Integración
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T101 | Crear `ARCHIVO/PLUGINS/GH_PAGES/` con config.json | ✅ |
| T102 | Actualizar `registry.json` | ✅ |

---

### SCRIPT-0.5.0-S08: Documentación Pública
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T103 | Actualizar README.md con sección GH-Pages | ✅ |
| T104 | Añadir URL canónica al README.md | ✅ |

---

## Métricas Sprint 0.5

| Métrica | Valor |
|---------|-------|
| Tasks totales | 22 |
| Completadas | 22 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.6.0 — Plugin Foro Scraper

**Objetivo**: Implementar plugin de scraping de foros usando herramientas MCP Playwright con gestión de estado pausable/reanudable.

**Caso de uso**: Descargar hilos de foros (Foro, etc.) página por página para archivo en DISCO/.

**Tecnología**: MCP Playwright (browser_navigate, browser_snapshot, browser_click)

**Entregables**:
- Plugin foro-scraper con manifest, agente, prompts e instrucciones
- Sistema de gestión de estado (pausa/reanudación)
- Parser de patrones URL de foros
- Integración con ARCHIVO/DISCO/
- Documentación y ejemplo de uso

---

## Stories

### SCRIPT-0.6.0-S01: Diseño del Plugin
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T106 | Crear carpeta `.github/plugins/foro-scraper/` | ✅ |
| T107 | Crear `manifest.md` con metadatos y handoffs | ✅ |
| T108 | Diseñar esquema de estado (`state.json`) | ✅ |
| T109 | Definir parser de patrones URL (t=, page=, etc.) | ✅ |

---

### SCRIPT-0.6.0-S02: Agente ForoScraper
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T110 | Crear `agents/foro-scraper.agent.md` | ✅ |
| T111 | Implementar handoff "Iniciar scraping" | ✅ |
| T112 | Implementar handoff "Pausar scraping" | ✅ |
| T113 | Implementar handoff "Reanudar scraping" | ✅ |
| T114 | Implementar handoff "Ver estado" | ✅ |

---

### SCRIPT-0.6.0-S03: Prompts de Operación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T115 | Crear `prompts/foro-init.prompt.md` (inicializar con URL) | ✅ |
| T116 | Crear `prompts/foro-scrape-page.prompt.md` (descargar página) | ✅ |
| T117 | Crear `prompts/foro-parse-pattern.prompt.md` (extraer patrón) | ✅ |
| T118 | Crear `prompts/foro-state.prompt.md` (gestión de estado) | ✅ |

---

### SCRIPT-0.6.0-S04: Instrucciones y Documentación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T119 | Crear `instructions/foro-scraper.instructions.md` | ✅ |
| T120 | Crear `docs/README.md` con guía de uso | ✅ |
| T121 | Documentar patrones de URL soportados | ✅ |

---

### SCRIPT-0.6.0-S05: Instalación e Integración
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T122 | Actualizar `registry.json` con plugin | ✅ |
| T123 | Añadir handoffs a `aleph.agent.md` | ✅ |
| T124 | Actualizar `copilot-instructions.md` | ✅ |
| T125 | Crear `ARCHIVO/PLUGINS/FORO_SCRAPER/` con README | ✅ |

---

### SCRIPT-0.6.0-S06: Documentación Scriptorium
**Estado**: 🔄 En progreso

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T126 | Actualizar README.md principal con sección Foro Scraper | ⏳ |
| T127 | Añadir ejemplo de uso en docs/ del plugin | ✅ |

---

### SCRIPT-0.6.0-S07: Validación — Caso Foro
**Estado**: ✅ Completada (1 página suficiente)

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T128 | Crear carpeta `DISCO/Foro_t8941392/` | ✅ |
| T129 | Inicializar scraper con URL de muestra | ✅ |
| T130 | Descargar página 1 del hilo | ✅ |
| T131 | Validar formato de salida `page_001.md` | ✅ |
| T132 | Confirmar integridad del contenido descargado | ✅ |

---

## Métricas Sprint 0.6

| Métrica | Valor |
|---------|-------|
| Tasks totales | 27 |
| Completadas | 27 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.7.0 — Extensión Blogs + Integración Periódico

**Objetivo**: Extender plugin Foro Scraper para soportar blogs y mejorar integración con el flujo periodístico.

**Mejoras**:
- Soporte para blogs (WordPress, Blogger, Medium, Ghost, Substack, Hugo/Jekyll)
- Nueva convención de naming: `{fecha}_{tema}_{titulo}` (sin nombres propios)
- Integración con @Periódico para crear noticias desde carpetas de scraping

**Entregables**:
- Prompts para blogs (init, scrape-entry)
- Agente actualizado con flujos de blog
- Instrucciones actualizadas
- Handoffs en @Periódico
- Documentación actualizada

---

## Stories

### SCRIPT-0.7.0-S01: Prompts de Blog
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T133 | Crear `prompts/blog-init.prompt.md` | ✅ |
| T134 | Crear `prompts/blog-scrape-entry.prompt.md` | ✅ |

---

### SCRIPT-0.7.0-S02: Actualizar Plugin
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T135 | Actualizar `manifest.md` a v1.1.0 | ✅ |
| T136 | Actualizar `agents/foro-scraper.agent.md` con blogs | ✅ |
| T137 | Actualizar `instructions/foro-scraper.instructions.md` | ✅ |

---

### SCRIPT-0.7.0-S03: Integración con Periódico
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T138 | Añadir handoffs de scraping a `periodico.agent.md` | ✅ |
| T139 | Añadir handoff "Crear noticia desde scraping" | ✅ |

---

### SCRIPT-0.7.0-S04: Documentación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T140 | Actualizar README.md principal | ✅ |
| T141 | Actualizar registry.json | ✅ |
| T142 | Actualizar docs/README.md del plugin | ✅ |

---

## Métricas Sprint 0.7

| Métrica | Valor |
|---------|-------|
| Tasks totales | 10 |
| Completadas | 10 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.8.0 — Plugin Agent Creator

**Objetivo**: Implementar plugin para crear agentes especializados combinando agentes base del Scriptorium con fuentes de datos de DISCO/ARCHIVO.

**Caso de uso inicial**: Crear `@demarcacion-yellowflag` a partir de `@yellowflag` + `DISCO/Foro_t8941392/` (criterio de demarcación científica).

**Entregables**:
- Plugin agent-creator con manifest, agente, prompts e instrucciones
- Agente AgentCreator (orquestador)
- Primer agente creado: demarcacion-yellowflag
- Integración con plugin FORO_SCRAPER para solicitar más datos
- Documentación y recetas reproducibles

---

## Stories

### SCRIPT-0.8.0-S01: Estructura del Plugin
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T143 | Crear carpeta `.github/plugins/agent-creator/` | ✅ |
| T144 | Crear `manifest.md` con metadatos y handoffs | ✅ |
| T145 | Crear subcarpetas (agents, prompts, instructions, docs) | ✅ |

---

### SCRIPT-0.8.0-S02: Agente AgentCreator
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T146 | Crear `agents/agent-creator.agent.md` | ✅ |
| T147 | Definir proceso de creación de agentes | ✅ |
| T148 | Implementar handoffs a ForoScraper | ✅ |

---

### SCRIPT-0.8.0-S03: Prompts de Operación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T149 | Crear `prompts/crear-agente.prompt.md` | ✅ |
| T150 | Crear `prompts/editar-agente.prompt.md` | ✅ |
| T151 | Crear `prompts/fusionar-agentes.prompt.md` | ✅ |
| T152 | Crear `prompts/conectar-fuente.prompt.md` | ✅ |

---

### SCRIPT-0.8.0-S04: Instrucciones y Documentación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T153 | Crear `instructions/agent-creator.instructions.md` | ✅ |
| T154 | Crear `docs/README.md` con guía de uso | ✅ |

---

### SCRIPT-0.8.0-S05: Datos e Integración
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T155 | Crear `ARCHIVO/PLUGINS/AGENT_CREATOR/` con README | ✅ |
| T156 | Crear estructura agents/created/, recipes/, logs/ | ✅ |
| T157 | Actualizar `registry.json` con plugin | ✅ |

---

### SCRIPT-0.8.0-S06: Primer Agente Creado
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T158 | Analizar yellowflag.agent.md (agente base) | ✅ |
| T159 | Analizar DISCO/Foro_t8941392/ (fuente de datos) | ✅ |
| T160 | Crear `demarcacion-yellowflag.agent.md` | ✅ |
| T161 | Crear receta `demarcacion-yellowflag.recipe.json` | ✅ |
| T162 | Registrar en `creation-log.json` | ✅ |

---

### SCRIPT-0.8.0-S07: Integración con Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T163 | Añadir handoffs de AgentCreator a `aleph.agent.md` | ✅ |
| T164 | Actualizar `copilot-instructions.md` con Agent Creator | ✅ |
| T165 | Actualizar README.md principal con documentación | ✅ |

---

### SCRIPT-0.8.0-S08: Integración con ARG_BOARD
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T166 | Añadir dependencia opcional con ARG_BOARD en manifest | ✅ |
| T167 | Crear prompt `desplegar-en-arg.prompt.md` | ✅ |
| T168 | Actualizar AgentCreator con handoff a ARG_BOARD | ✅ |
| T169 | Crear obra demo "Hola Mundo" con personaje Tarotista | ✅ |
| T170 | Registrar personaje en actores.json del teatro | ✅ |
| T171 | Actualizar creation-log con trazabilidad a ARG | ✅ |

---

## Métricas Sprint 0.8

| Métrica | Valor |
|---------|-------|
| Tasks totales | 29 |
| Completadas | 29 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

## Especificación Técnica

### Esquema de Estado (`state.json`)

```json
{
  "job_id": "Foro-t8941392",
  "status": "paused|running|completed|error",
  "url_pattern": {
    "base": "https://Foro.com/foro/showthread.php",
    "thread_param": "t",
    "thread_id": "8941392",
    "page_param": "page"
  },
  "progress": {
    "current_page": 5,
    "total_pages": null,
    "pages_downloaded": [1, 2, 3, 4, 5],
    "last_updated": "2025-12-22T10:00:00Z"
  },
  "output": {
    "directory": "ARCHIVO/DISCO/Foro_t8941392/",
    "format": "md"
  },
  "config": {
    "delay_ms": 2000,
    "max_pages": 10
  }
}
```

### Patrones URL Soportados

| Foro | Patrón | Ejemplo |
|------|--------|---------|
| Foro | `?t={id}&page={n}` | `showthread.php?t=123&page=1` |
| vBulletin | `?t={id}&page={n}` | Similar a Foro |
| phpBB | `?t={id}&start={n*posts}` | `viewtopic.php?t=123&start=20` |
| Discourse | `/t/{slug}/{id}/{n}` | `/t/tema/123/2` |

### Flujo de Operación

```
1. INIT: Usuario proporciona URL de muestra
   ↓
2. PARSE: Extraer patrón (base, thread_param, page_param)
   ↓
3. SETUP: Crear carpeta en DISCO/, inicializar state.json
   ↓
4. LOOP: Para cada página:
   a. Navegar con browser_navigate
   b. Capturar con browser_snapshot
   c. Parsear contenido relevante
   d. Guardar como .md
   e. Actualizar state.json
   f. Aplicar delay
   ↓
5. PAUSE/RESUME: Leer state.json, continuar desde current_page
   ↓
6. COMPLETE: Marcar status=completed
```

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2024-12-19 | Creación inicial del backlog | Aleph |
| 2024-12-19 | Completar DEVOPS.md | Aleph |
| 2024-12-20 | Añadir feature Noticias (Periódico) — S08 | Aleph |
| 2025-12-20 | Añadir Épica SCRIPT-0.1.0 — Sistema de Plugins | Aleph |
| 2025-12-20 | Completar instalación plugin ARG Board | Aleph |
| 2025-12-21 | Añadir Épica SCRIPT-0.2.0 — Agente Yellowflag | Aleph |
| 2025-12-21 | Completar integración Yellowflag en el sistema | Aleph |
| 2025-12-21 | Añadir Épica SCRIPT-0.3.0 — Plugin Enciclopedia | Aleph |
| 2025-12-21 | Completar plugin Enciclopedia con tomo HDF | Aleph |
| 2025-12-21 | Documentar sistema de plugins en README.md principal | Aleph |
| 2025-12-21 | Añadir Épica SCRIPT-0.4.0 — Agente Orangeflag | Aleph |
| 2025-12-21 | Crear orangeflag.agent.md y marco/15 | Aleph |
| 2025-12-21 | Añadir Épica SCRIPT-0.5.0 — Plugin GH-Pages | Aleph |
| 2025-12-21 | Completar plugin GH-Pages con Jekyll template | Aleph |
| 2025-12-22 | Añadir Épica SCRIPT-0.6.0 — Plugin Foro Scraper | Aleph |
| 2025-12-22 | Añadir Épica SCRIPT-0.7.0 — Extensión Blogs + Integración Periódico | Aleph |
| 2025-12-22 | Añadir Épica SCRIPT-0.8.0 — Plugin Agent Creator | Aleph |
| 2025-12-22 | Crear agente demarcacion-yellowflag (Foro_t8941392) | AgentCreator |
| 2025-12-22 | Añadir Épica SCRIPT-0.9.0 — Handoffs Extensibles ARG + Agent Creator | Aleph |
| 2025-12-22 | Completar handoffs extensibles en Aleph, Revisor, Periodico | Aleph |
| 2025-12-22 | Añadir Épica SCRIPT-0.10.0 — Agente Oráculo (Ox) | Aleph |
| 2025-12-22 | Crear ox.agent.md con índice maestro de agentes | Ox |
| 2025-12-22 | Refactorizar README.md con taxonomía unificada de agentes | Ox |
| 2025-12-22 | Añadir Épica SCRIPT-0.11.0 — Plugin Bridge Agents | Ox |

---

# Épica: SCRIPT-0.10.0 — Agente Oráculo (Ox)

**Objetivo**: Crear un agente meta-coordinador que conoce y gestiona el índice de todos los agentes del sistema, funcionando como oráculo para documentación de usuario y configuración de Copilot.

**Filosofía**: Ox ("buey" en griego, símbolo de trabajo metódico) es el agente que sabe dónde está todo. No produce contenido doctrinal sino **documentación técnica** y **orquestación de agentes**.

**Taxonomía de agentes que gestiona**:

| Capa | Agentes | Función |
|------|---------|---------|
| **UI (Producción)** | Aleph, Revisor, Periódico | Interfaz principal con el usuario |
| **Backend (Auditoría)** | Blueflag, Blackflag, Redflag, Yellowflag, Orangeflag | Tests y validación doctrinal |
| **Sistema (Navegación)** | Vestíbulo, CartasPuerta | Entrada y orientación |
| **Plugins** | Por plugin (ARG, Enciclopedia, GH-Pages, etc.) | Capacidades extendidas |
| **Meta** | PluginManager, Ox | Gestión del sistema |

**Casos de uso**:
1. Generar secciones del README.md con información actualizada de agentes
2. Producir manuales de usuario por perfil (desarrollador, escritor, tutor)
3. Actualizar `.github/copilot-instructions.md` con ontología de agentes
4. Responder consultas tipo "¿qué agente uso para X?"
5. Detectar inconsistencias entre agentes declarados y documentados

**Entregables**:
- Agente `ox.agent.md` con handoffs a todos los demás
- Prompt `ox-generar-readme.prompt.md`
- Prompt `ox-generar-manual.prompt.md`
- README.md refactorizado con taxonomía unificada
- Actualización de `copilot-instructions.md`

---

## Stories

### SCRIPT-0.10.0-S01: Diseño del Agente Ox
**Estado**: 🔄 En progreso

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T188 | Crear `agents/ox.agent.md` con taxonomía de agentes | ✅ |
| T189 | Definir índice maestro de agentes (JSON embebido) | ✅ |
| T190 | Añadir handoffs bidireccionales con todos los agentes | ✅ |

---

### SCRIPT-0.10.0-S02: Prompts de Documentación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T191 | Crear `prompts/ox-generar-readme.prompt.md` | ✅ |
| T192 | Crear `prompts/ox-generar-manual.prompt.md` | ✅ |
| T193 | Crear `prompts/ox-diagnostico-agentes.prompt.md` | ✅ |

---

### SCRIPT-0.10.0-S03: Refactorización README.md
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T194 | Unificar sección de agentes con taxonomía (UI/Backend/Sistema/Plugins) | ✅ |
| T195 | Crear tabla maestra de agentes con capas y handoffs | ✅ |
| T196 | Actualizar diagramas de arquitectura | ✅ |
| T197 | Eliminar duplicidades en documentación de agentes | ✅ |

---

### SCRIPT-0.10.0-S04: Actualización Ontología .github
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T198 | Refactorizar `copilot-instructions.md` con taxonomía Ox | ✅ |
| T199 | Crear `instructions/ox-ontologia.instructions.md` | ✅ |
| T200 | Añadir handoff de Ox a `aleph.agent.md` | ✅ |

---

### SCRIPT-0.10.0-S05: Integración y Validación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T201 | Test: generar README desde Ox y comparar | ✅ |
| T202 | Test: generar manual de usuario desde Ox | ✅ |
| T203 | Documentar flujo de actualización de agentes | ✅ |

---

## Métricas Sprint 0.10

| Métrica | Valor |
|---------|-------|
| Tasks totales | 16 |
| Completadas | 16 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

## Especificación Técnica: Índice Maestro de Agentes

### Esquema del índice (embebido en ox.agent.md)

```json
{
  "version": "1.0.0",
  "capas": {
    "ui": {
      "descripcion": "Agentes de producción e interfaz con usuario",
      "agentes": ["aleph", "revisor", "periodico"]
    },
    "backend": {
      "descripcion": "Agentes de auditoría y validación doctrinal",
      "agentes": ["blueflag", "blackflag", "redflag", "yellowflag", "orangeflag"]
    },
    "sistema": {
      "descripcion": "Agentes de navegación y orientación",
      "agentes": ["vestibulo", "cartas-puerta"]
    },
    "meta": {
      "descripcion": "Agentes de gestión del propio sistema",
      "agentes": ["plugin-manager", "ox"]
    },
    "plugins": {
      "descripcion": "Agentes añadidos por plugins",
      "por_plugin": {
        "arg-board": ["arrakis", "boe", "decoherence", "gitarg", "automata-heroe", "impressjs", "mbox", "platformcom"],
        "enciclopedia": ["bibliotecario", "hdf-ernesto-castro"],
        "gh-pages": ["ghpages"],
        "foro-scraper": ["foro-scraper"],
        "agent-creator": ["agent-creator"]
      }
    }
  }
}
```

### Flujo de actualización

```
1. Se crea/modifica un agente
   ↓
2. Ox detecta cambio (o se invoca manualmente)
   ↓
3. Ox actualiza su índice interno
   ↓
4. Ox regenera documentación afectada:
   - README.md (sección agentes)
   - copilot-instructions.md (ontología)
   - Manual de usuario (si existe)
```

---

# Épica: SCRIPT-0.9.0 — Handoffs Extensibles ARG + Agent Creator

**Objetivo**: Extender handoffs en agentes core (Aleph, Revisor, Periódico) para aprovechar al máximo la sinergia entre ARG_BOARD y AGENT_CREATOR.

**Filosofía**: Los handoffs deben ser **extensibles**. En lugar de crear un handoff por cada obra, se usa un patrón `[Obra]` que el agente interpreta dinámicamente.

**Casos de uso**:
- Arrancar obra ARG desde cualquier agente
- Revisar agentes desplegados en obras
- Publicar contenido generado en obras
- Crear agentes especializados desde cualquier contexto
- Pipeline completo: Scraping → Agente → Obra → Publicación

**Entregables**:
- Handoffs extensibles en aleph.agent.md
- Handoffs extensibles en revisor.agent.md
- Handoffs extensibles en periodico.agent.md
- Documentación de patrones de uso

---

## Stories

### SCRIPT-0.9.0-S01: Handoffs ARG en Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T172 | Añadir handoff "Arrancar Obra [nombre]" extensible | ✅ |
| T173 | Añadir handoff "Listar obras activas" | ✅ |
| T174 | Añadir handoff "Invocar personaje de obra" | ✅ |
| T175 | Añadir handoff "Cerrar/Archivar obra" | ✅ |

---

### SCRIPT-0.9.0-S02: Handoffs Agent Creator en Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T176 | Añadir handoff "Crear agente desde fuente" | ✅ |
| T177 | Añadir handoff "Desplegar agente en obra" | ✅ |
| T178 | Añadir handoff "Listar agentes creados" | ✅ |

---

### SCRIPT-0.9.0-S03: Handoffs ARG en Revisor
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T179 | Añadir handoff "Revisar agente de obra [nombre]" | ✅ |
| T180 | Añadir handoff "Auditar coherencia de obra" | ✅ |
| T181 | Añadir handoff "Validar personaje vs agente base" | ✅ |

---

### SCRIPT-0.9.0-S04: Handoffs en Periódico
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T182 | Añadir handoff "Publicar obra como noticia" | ✅ |
| T183 | Añadir handoff "Crear agente periodístico" | ✅ |
| T184 | Añadir handoff "Invocar personaje para análisis" | ✅ |

---

### SCRIPT-0.9.0-S05: Documentación de Patrones
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T185 | Documentar patrón "[Obra]" en docs de ARG | ✅ |
| T186 | Crear ejemplos de pipelines multi-plugin | ✅ |
| T187 | Actualizar copilot-instructions.md | ✅ |

---

## Métricas Sprint 0.9

| Métrica | Valor |
|---------|-------|
| Tasks totales | 16 |
| Completadas | 16 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

## Patrón de Handoffs Extensibles

### Convención `[nombre]`

Los handoffs que aceptan parámetros usan la convención `[nombre]`:

```yaml
- label: "[ARG] Arrancar Obra [nombre]"
  prompt: "Arranca la obra especificada. Si no existe, ofrece crearla. Obras disponibles: consulta obras.json"
```

El agente interpreta `[nombre]` como variable que el usuario proporciona:
- "Arrancar Obra Hola_Mundo" → obra=hola_mundo
- "Arrancar Obra nueva llamada MiObra" → crea obra=mi_obra

### Pipeline típico

```
1. [FORO-SCRAPER] Scraping de fuente
   ↓
2. [AGENT-CREATOR] Crear agente desde fuente
   ↓
3. [ARG] Arrancar Obra [laboratorio]
   ↓
4. [ARG] Desplegar agente en obra
   ↓
5. [PERIODICO] Publicar obra como noticia
   ↓
6. [GH-PAGES] Publicar en web
```

---

# Épica: SCRIPT-0.11.0 — Plugin Bridge Agents

**Objetivo**: Resolver la limitación de VS Code que solo carga agentes desde `.github/agents/`, no desde carpetas de plugins.

**Problema detectado**: Los handoffs a agentes de plugins muestran advertencias "unknown agent" porque VS Code no escanea `.github/plugins/{plugin}/agents/`.

**Solución**: Crear **Plugin Ox Agents** — agentes bridge mínimos que:
1. Viven en `.github/agents/` (donde VS Code los detecta)
2. Siguen el patrón DRY: no duplican lógica, solo referencian
3. Hacen handoff a los agentes reales del plugin
4. Exponen el índice de agentes del plugin

**Filosofía**: Igual que `@ox` es el oráculo del sistema, cada `plugin_ox_{nombre}` es el oráculo de su plugin.

**Nomenclatura**: `plugin_ox_{nombrePlugin}.agent.md`
- `plugin_ox_argboard.agent.md`
- `plugin_ox_enciclopedia.agent.md`
- `plugin_ox_ghpages.agent.md`
- `plugin_ox_foroscraper.agent.md`
- `plugin_ox_agentcreator.agent.md`

**Entregables**:
- Actualización de PLUGINS.md con protocolo de bridge agents
- Actualización de plugin-manager.agent.md
- Creación de 5 plugin_ox agents para plugins existentes
- Actualización del índice en ox.agent.md
- Refactorización de handoffs en aleph.agent.md

---

## Stories

### SCRIPT-0.11.0-S01: Protocolo de Plugin Bridge Agents
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T204 | Añadir sección "Bridge Agents" a PLUGINS.md | ✅ |
| T205 | Definir plantilla de plugin_ox agent | ✅ |
| T206 | Documentar flujo de instalación con bridge | ✅ |

---

### SCRIPT-0.11.0-S02: Actualizar Plugin Manager
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T207 | Añadir paso "Crear bridge agent" al flujo de instalación | ✅ |
| T208 | Añadir handoff "Crear bridge para plugin [id]" | ✅ |
| T209 | Añadir handoff "Listar bridges existentes" | ✅ |

---

### SCRIPT-0.11.0-S03: Crear Plugin Ox Agents (5 plugins)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T210 | Crear `plugin_ox_argboard.agent.md` | ✅ |
| T211 | Crear `plugin_ox_enciclopedia.agent.md` | ✅ |
| T212 | Crear `plugin_ox_ghpages.agent.md` | ✅ |
| T213 | Crear `plugin_ox_foroscraper.agent.md` | ✅ |
| T214 | Crear `plugin_ox_agentcreator.agent.md` | ✅ |

---

### SCRIPT-0.11.0-S04: Integración con Ox
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T215 | Actualizar índice JSON en ox.agent.md con bridges | ✅ |
| T216 | Añadir handoff "Listar plugin bridges" en Ox | ✅ |
| T217 | Actualizar taxonomía visual con capa de bridges | ✅ |

---

### SCRIPT-0.11.0-S05: Refactorizar Handoffs en Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T218 | Cambiar handoffs [ARG] para usar plugin_ox_argboard | ✅ |
| T219 | Cambiar handoffs [ENCICLOPEDIA] para usar plugin_ox_enciclopedia | ✅ |
| T220 | Cambiar handoffs [GH-PAGES] para usar plugin_ox_ghpages | ✅ |
| T221 | Cambiar handoffs [FORO-SCRAPER] para usar plugin_ox_foroscraper | ✅ |
| T222 | Cambiar handoffs [AGENT-CREATOR] para usar plugin_ox_agentcreator | ✅ |

---

### SCRIPT-0.11.0-S06: Documentación y Validación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T223 | Actualizar README.md con sección Plugin Bridges | ✅ |
| T224 | Actualizar copilot-instructions.md con bridges | ✅ |
| T225 | Verificar que VS Code reconoce todos los bridges | ✅ |
| T226 | Test: handoff desde Aleph → bridge → plugin agent | ✅ |

---

## Métricas Sprint 0.11

| Métrica | Valor |
|---------|-------|
| Tasks totales | 23 |
| Completadas | 23 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

## Especificación Técnica

### Plantilla de Plugin Ox Agent

```yaml
---
name: plugin_ox_{NombrePlugin}
description: "Bridge agent para plugin {nombre}. Delega a agentes en .github/plugins/{id}/agents/"
argument-hint: "Invoca agentes del plugin {nombre} o consulta su índice."
tools: ['agent']
handoffs:
  - label: Listar agentes de {nombre}
    agent: plugin_ox_{nombre}
    prompt: Lista todos los agentes disponibles en este plugin.
    send: false
  # Un handoff por cada agente del plugin
  - label: Invocar {AgenteName}
    agent: .github/plugins/{id}/agents/{agente}.agent.md
    prompt: {descripción del agente}
    send: false
---

# Plugin Ox: {NombrePlugin}

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Este es un **agente bridge** que conecta VS Code con los agentes del plugin `{id}`.
> Los agentes reales están en `.github/plugins/{id}/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| {Agente1} | `agents/{agente1}.agent.md` | {descripción} |
| ... | ... | ... |

## Índice (referencia al manifest)

Ver: `.github/plugins/{id}/manifest.md`
```

### Flujo de Instalación Actualizado

```
1. VALIDAR manifest.md
   ↓
2. COPIAR a .github/plugins/{id}/
   ↓
3. CREAR plugin_ox_{id}.agent.md en .github/agents/  ← NUEVO
   ↓
4. REGISTRAR en registry.json
   ↓
5. ACTUALIZAR handoffs en aleph.agent.md (usando bridge)
   ↓
6. COMMIT
```

### Arquitectura de Capas (actualizada)

```
                         ┌─────────────────────────────────────┐
                         │            🐂 OX (Meta)             │
                         │   Oráculo · Documentación · Índice  │
                         └─────────────────┬───────────────────┘
                                           │
        ┌──────────────────────────────────┼──────────────────────────────────┐
        │                                  │                                  │
        ▼                                  ▼                                  ▼
┌───────────────┐                 ┌────────────────┐                ┌─────────────────┐
│  🟢 UI (3)    │                 │ ⚪ Sistema (2) │                │  ⚙️ Meta (2)    │
│ Producción    │                 │  Navegación    │                │   Gestión       │
└───────────────┘                 └────────────────┘                └─────────────────┘
        │
        │ ← invocan
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                        🔌 PLUGIN BRIDGES                          │
│              (en .github/agents/, detectables por VS Code)        │
├───────────────────────────────────────────────────────────────────┤
│ plugin_ox_argboard │ plugin_ox_enciclopedia │ plugin_ox_ghpages   │
│ plugin_ox_foroscraper │ plugin_ox_agentcreator │                  │
└───────────────────────────────────────────────────────────────────┘
        │
        │ ← delegan a
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                     🔌 PLUGIN AGENTS (reales)                     │
│               (en .github/plugins/{id}/agents/)                   │
├───────────────────────────────────────────────────────────────────┤
│ ARG: Arrakis, BOE, Decoherence, GitARG, AutomataHeroe...         │
│ ENCICLOPEDIA: Bibliotecario, HDF-ErnestoCastro                    │
│ GH-PAGES: GHPages                                                 │
│ FORO-SCRAPER: ForoScraper                                         │
│ AGENT-CREATOR: AgentCreator                                       │
└───────────────────────────────────────────────────────────────────┘
```
