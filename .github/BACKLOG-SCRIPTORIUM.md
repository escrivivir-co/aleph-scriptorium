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
| 2025-12-22 | **RESUELTO**: Eliminar duplicación noticias/periódico | GHPages |
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
| 2025-12-22 | Añadir Épica SCRIPT-0.12.0 — Página Promocional de Agentes | Aleph |
| 2025-12-22 | Crear agentes.md con showcase "Del Clippy al Colectivo" | Aleph |
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

---

# Épica: SCRIPT-0.12.0 — Página Promocional de Agentes

**Objetivo**: Crear página showcase "Del Clippy al Colectivo" para promocionar la taxonomía de agentes del Scriptorium en el sitio web.

**Concepto creativo**: Evolución del asistente de Word (Clippy, 1997) hacia un colectivo de agentes inteligentes coordinados por Ox. El paradigma del procesador de textos (Word/Office) da paso al VibeCoding + AI Agents.

**Metáfora central**: "¿Recuerdas al asistente que preguntaba '¿Parece que estás escribiendo una carta?' Ahora escriben ellos."

**Entregables**:
- Página Jekyll `agentes.md` con diseño promocional dark
- SVGs inline para avatares de 15+ agentes
- CSS custom con animaciones y hover effects
- Integración en navegación del sitio
- Timeline evolutivo (Clippy → GPT → Copilot → Scriptorium)

---

## Stories

### SCRIPT-0.12.0-S01: Diseño y Contenido
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T227 | Diseñar concepto creativo "Del Clippy al Colectivo" | ✅ |
| T228 | Crear página `agentes.md` con estructura completa | ✅ |
| T229 | Diseñar SVGs para avatares de agentes (15+) | ✅ |
| T230 | Implementar CSS custom (cards, animaciones, responsive) | ✅ |

---

### SCRIPT-0.12.0-S02: Integración
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T231 | Añadir enlace en _config.yml (navegación) | ✅ |
| T232 | Verificar responsive en móvil | ✅ |
| T233 | Test de accesibilidad básico | ✅ |

---

### SCRIPT-0.12.0-S03: Publicación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T234 | Deploy a GitHub Pages | ✅ |
| T235 | Verificar URL /agentes/ funciona | ✅ |
| T236 | Actualizar backlog con épica completada | ✅ |

---

## Métricas Sprint 0.12

| Métrica | Valor |
|---------|-------|
| Tasks totales | 10 |
| Completadas | 10 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

## Especificación Técnica

### Taxonomía de Agentes Presentada

| Capa | Color | Agentes | Cards |
|------|-------|---------|-------|
| 🟢 UI | Verde | @aleph, @revisor, @periodico | 3 |
| 🏴 Backend | Multi | @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag | 5 |
| ⚪ Sistema | Gris | @vestibulo, @cartaspuerta | 2 |
| ⚙️ Meta | Cyan | @ox, @pluginmanager | 2 |
| 🔌 Plugins | Púrpura | ARG Board (8), Enciclopedia (2), GH-Pages (1), Foro Scraper (1), Agent Creator (1) | 5 |

### Timeline de Evolución

```
1997 📎 Clippy → 2020 🤖 GPT-3 → 2023 💬 Copilot → 2025 🐂 Scriptorium
```

### Archivos Creados/Modificados

| Archivo | Acción |
|---------|--------|
| `.github/plugins/gh-pages/meta/jekyll-template/agentes.md` | Crear |
| `.github/plugins/gh-pages/meta/jekyll-template/_config.yml` | Editar (nav) |
| `.github/BACKLOG-SCRIPTORIUM.md` | Editar (épica) |

---

# Épica: SCRIPT-0.13.0 — Rediseño Sitio Web (UX Homogénea)

**Objetivo**: Rediseñar el sitio web de GitHub Pages para una experiencia de usuario homogénea, efectista y sin duplicación de información entre header/footer y contenido de páginas.

**Origen**: Auditoría de UX que detectó:
1. Portada demasiado larga con información duplicada respecto al footer
2. Páginas noticias.md y archivo.md faltantes (enlaces rotos)
3. Estilos inconsistentes entre páginas (agentes usa dark theme, resto usa light theme)
4. Footer repite enlaces que ya están en la navegación principal
5. Cada página tiene su propio footer manual que compite con el global

**Principios de diseño**:
- **DRY**: No repetir información entre header, footer y contenido
- **Homogeneidad**: Todas las páginas con el mismo estilo base
- **Efectismo**: Portada impactante con hero prominente
- **Jerarquía**: Navegación clara → Contenido específico → Footer mínimo

**Entregables**:
- Portada rediseñada (hero + cards producto, sin duplicar footer)
- Header/Footer unificados (navegación principal, sin redundancias)
- 6 páginas internas con estilo consistente
- CSS refactorizado para tema unificado (light + accent colors)
- Eliminación de footers manuales en cada página

---

## Diagnóstico Detallado

### Problemas encontrados en la portada (`index.md`)

| Problema | Ubicación | Impacto |
|----------|-----------|---------|
| Sección "Repositorio" duplica enlaces del footer | Líneas 370-385 | Redundancia |
| Sección "Licencia" duplica info del footer | Líneas 350-365 | Redundancia |
| Portal-footer duplica navegación del header | Líneas 390-395 | Confusión |
| Tabla "Productos" es escueta vs las cards | Líneas 325-330 | Incoherencia |
| Tabla "Status" debería estar en footer o separada | Líneas 335-345 | Fuera de lugar |
| Estilos embebidos (200+ líneas CSS) | Líneas 1-200 | Mantenimiento difícil |

### Problemas en header/footer

| Componente | Problema |
|------------|----------|
| Header | Navegación correcta, pero "Noticias" y "Archivo" apuntan a páginas que no existían |
| Footer | Columna "Proyecto" repite lo mismo que la navegación principal |
| Footer | Columna "Enlaces" repite GitHub que ya está en nav |
| Footer | "Archivo (GitHub)" usa ruta relativa incorrecta |

### Problemas en páginas internas

| Página | Problema |
|--------|----------|
| `agentes.md` | Tema dark embebido (inconsistente con resto del sitio) |
| `fundacion.md` | Footer manual (`<footer>`) compite con footer global |
| `periodico.md` | Estilos embebidos masivos, sin usar CSS global |
| `noticias.md` | Recién creada, estilo básico sin integración visual |
| `archivo.md` | Recién creada, footer manual inline |

---

## Stories

### SCRIPT-0.13.0-S01: Refactorizar Header/Footer
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T237 | Simplificar footer: solo licencia + links esenciales (GitHub, RSS) | ⏳ |
| T238 | Eliminar columna "Proyecto" del footer (ya está en nav) | ⏳ |
| T239 | Corregir ruta "Archivo (GitHub)" en footer | ⏳ |
| T240 | Verificar todos los enlaces de navegación funcionan | ⏳ |

---

### SCRIPT-0.13.0-S02: Rediseñar Portada
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T241 | Simplificar hero: banner + tagline + CTA buttons | ⏳ |
| T242 | Convertir sección "Productos" en cards prominentes (Fundación, Periódico, Agentes) | ⏳ |
| T243 | Eliminar sección "Repositorio" (mover a footer o GitHub) | ⏳ |
| T244 | Eliminar sección "Licencia" (ya está en footer) | ⏳ |
| T245 | Eliminar portal-footer duplicado | ⏳ |
| T246 | Mantener sección "Ecosistema" y "Arquitectura Auditores" | ⏳ |
| T247 | Mover "Status" a una card pequeña o badge | ⏳ |

---

### SCRIPT-0.13.0-S03: Unificar Estilos CSS
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T248 | Mover estilos de index.md a main.css (clases reutilizables) | ⏳ |
| T249 | Crear tema unificado: light base + accent colors para banderas | ⏳ |
| T250 | Refactorizar agentes.md para usar tema light (mantener cards dark) | ⏳ |
| T251 | Extraer estilos de periodico.md a main.css | ⏳ |
| T252 | Crear clases CSS compartidas: .hero, .card-grid, .section-header | ⏳ |

---

### SCRIPT-0.13.0-S04: Homogeneizar Páginas Internas
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T253 | Eliminar footer manual de fundacion.md | ⏳ |
| T254 | Eliminar footer manual de archivo.md | ⏳ |
| T255 | Eliminar footer manual de noticias.md | ⏳ |
| T256 | Aplicar estructura consistente: título + intro + contenido | ⏳ |
| T257 | Añadir breadcrumbs o "← Volver" como link en lugar de footer | ⏳ |

---

### SCRIPT-0.13.0-S05: Mejorar Página Noticias
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T258 | Rediseñar noticias.md con cards de preview (como periodico.md) | ⏳ |
| T259 | Añadir filtros por bandera (tabs o sidebar) | ⏳ |
| T260 | Integrar estilos de periodico.md para consistencia | ⏳ |

---

### SCRIPT-0.13.0-S06: Mejorar Página Archivo
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T261 | Rediseñar archivo.md con cards para cada eje | ⏳ |
| T262 | Añadir iconos/colores distintivos por tipo (marco, diagnóstico, etc.) | ⏳ |
| T263 | Crear visual hierarchy clara | ⏳ |

---

### SCRIPT-0.13.0-S07: Testing y Deploy
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T264 | Verificar navegación completa sin errores 404 | ⏳ |
| T265 | Test responsive en móvil | ⏳ |
| T266 | Commit y push a main | ⏳ |
| T267 | Verificar deploy en GitHub Pages | ⏳ |

---

## Métricas Sprint 0.13

| Métrica | Valor |
|---------|-------|
| Tasks totales | 31 |
| Completadas | 0 |
| En progreso | 0 |
| Pendientes | 31 |
| % Avance | 0% |

---

## Especificación de Diseño

### Nueva Estructura de Portada

```
┌────────────────────────────────────────────────────────┐
│                     HEADER (nav)                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │                 HERO                              │  │
│  │  [Banner] ℵ Aleph Scriptorium                     │  │
│  │  Tagline + Terminal prompt                        │  │
│  │  [CTA: Fundación] [CTA: Agentes] [CTA: GitHub]   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌────────────┬────────────┬────────────┐             │
│  │ FUNDACIÓN  │ PERIÓDICO  │  AGENTES   │  ← Cards   │
│  │ 12 caps    │ Noticias   │  Colectivo │  producto  │
│  └────────────┴────────────┴────────────┘             │
│                                                        │
│  ══════════════ ECOSISTEMA ═══════════════           │
│  [VibeBitacora] [Scriptorium] [...]                   │
│                                                        │
│  ══════════ ARQUITECTURA AUDITORES ═══════           │
│  [Diagrama ASCII] + [Grid de banderas]                │
│                                                        │
│  ═════════════ STATUS (badge) ════════════           │
│  Sprint 0 · 100% Scriptorium · 85% Fundación          │
│                                                        │
├────────────────────────────────────────────────────────┤
│            FOOTER (licencia + GitHub + RSS)            │
└────────────────────────────────────────────────────────┘
```

### Nuevo Footer (simplificado)

```html
<footer>
  <div class="footer-content">
    <p><strong>Aleph Scriptorium</strong> · AIPL v1.0</p>
    <p>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium">GitHub</a> ·
      <a href="/feed.xml">RSS</a> ·
      <a href="https://escrivivir.co">Escrivivir.co</a>
    </p>
  </div>
</footer>
```

### Paleta de Colores Unificada

| Elemento | Color | Uso |
|----------|-------|-----|
| Fondo base | `#ffffff` | Todas las páginas |
| Texto | `#1a1a1a` | Cuerpo |
| Accent | `#1a1a1a` | Enlaces, bordes |
| Muted | `#666666` | Texto secundario |
| 🔵 Blueflag | `#2563eb` | Cards, badges |
| ⚫ Blackflag | `#1a1a1a` | Cards, badges |
| 🔴 Redflag | `#dc2626` | Cards, badges |
| 🟡 Yellowflag | `#ca8a04` | Cards, badges |
| 🟠 Orangeflag | `#ea580c` | Cards, badges |
| Cards dark | `#0d1117` | Solo página agentes (opcional) |

---

## Changelog Épica

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-22 | Crear épica SCRIPT-0.13.0 | Aleph |
| 2025-12-22 | Diagnóstico completo de UX | Aleph |

---

# Épica: SCRIPT-0.14.0 — Bug Fix: Duplicación de Web en Plugin GH-Pages

**Tipo**: 🐛 Bug / Deuda técnica  
**Prioridad**: Alta  
**Origen**: Auditoría de arquitectura del plugin gh-pages

---

## Diagnóstico del Bug

### Situación actual

El plugin GH-Pages tiene **dos copias** del sitio web:

| Ubicación | Contenido | Rol actual |
|-----------|-----------|------------|
| `docs/` | Web real (6 páginas) | Servida por GitHub Pages |
| `.github/plugins/gh-pages/meta/jekyll-template/` | Plantilla (4 páginas) | ¿Template inicial? |

### Archivos duplicados

```
docs/                                    meta/jekyll-template/
├── _config.yml                    ≠     ├── _config.yml
├── _includes/                     ≈     ├── _includes/
│   ├── header.html                      │   ├── header.html
│   └── footer.html                      │   ├── footer.html
├── _layouts/                      ≈     │   └── nav.html
│   ├── default.html                     ├── _layouts/
│   ├── page.html                        │   ├── default.html
│   └── post.html                        │   ├── page.html
├── assets/css/main.css            ≠     │   └── post.html
├── index.md                       ≠     ├── assets/css/main.css
├── agentes.md                     ≠     ├── index.md
├── archivo.md                     ✗     └── agentes.md
├── fundacion.md                   ✗
├── noticias.md                    ✗
└── periodico.md                   ✗

≠ = diferentes versiones
≈ = similares pero no idénticos
✗ = no existe en template
```

### Problemas identificados

1. **Duplicación de código**: Cambios en `docs/` no se reflejan en `meta/jekyll-template/`
2. **Inconsistencia**: El template tiene versiones desactualizadas (ej: footer de 3 columnas vs simplificado)
3. **Confusión de responsabilidad**: ¿Cuál es la fuente de verdad?
4. **Flujo de inicialización roto**: El prompt dice "copiar meta/jekyll-template/ a docs/" pero docs/ ya existe y evoluciona
5. **Mantenimiento doble**: Cada mejora de UX debe hacerse en dos lugares

---

## Opciones de Solución

### Opción A: `meta/` como plantilla desechable (RECOMENDADA)

**Concepto**: `meta/jekyll-template/` es solo un template inicial para repos nuevos. Una vez copiado a `docs/`, evoluciona independientemente.

**Cambios necesarios**:
- Renombrar `meta/jekyll-template/` → `meta/jekyll-template-v1.0.0/` (versionado)
- Documentar que es solo para "bootstrap" de nuevos proyectos
- El flujo "inicializar" solo aplica si `docs/` NO existe
- Actualizar instrucciones para aclarar el ciclo de vida

**Pros**: Mínimo cambio, clarifica intención  
**Cons**: Template se queda obsoleto con el tiempo

### Opción B: Eliminar `meta/jekyll-template/`

**Concepto**: No hay plantilla embebida. El agente GHPages genera archivos desde cero o usa un repo template externo.

**Cambios necesarios**:
- Eliminar `.github/plugins/gh-pages/meta/jekyll-template/`
- Actualizar prompts de inicialización para generar archivos mínimos inline
- O referenciar un repo template externo (ej: `escrivivir-co/jekyll-scriptorium-template`)

**Pros**: Sin duplicación, un solo lugar de verdad  
**Cons**: Más complejo inicializar nuevos proyectos

### Opción C: `docs/` es derivado de `meta/`

**Concepto**: `meta/jekyll-template/` es la fuente de verdad. `docs/` se regenera completamente desde el template + contenido dinámico.

**Cambios necesarios**:
- Mover todo el contenido personalizado a `ARCHIVO/SITE/`
- El agente GHPages siempre: 1) copia template, 2) inyecta contenido de ARCHIVO/SITE/
- `docs/` se vuelve un "build output"

**Pros**: Separación limpia entre estructura y contenido  
**Cons**: Mayor refactorización, flujo más complejo

---

## Decisión: Opción B (eliminar plantilla)

**Razón**: La solución más limpia. La plantilla duplicada solo genera confusión y mantenimiento doble. `docs/` (raíz) es la única fuente de verdad. Si se necesita inicializar un nuevo repo, se puede hacer manualmente o con un repo template externo.

**Cambio respecto al plan inicial**: Se eliminó `meta/jekyll-template/` completamente en lugar de renombrarlo. Esto simplifica aún más la arquitectura.

---

## Stories

### SCRIPT-0.14.0-S01: Eliminar plantilla duplicada
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T268 | ~~Renombrar~~ → Eliminar `meta/jekyll-template/` completamente | ✅ |
| T269 | Crear README.md en meta/ explicando que está vacío intencionalmente | ✅ |
| T270 | Actualizar manifest.md con nota sobre ausencia de template | ✅ |

---

### SCRIPT-0.14.0-S02: Actualizar flujo de inicialización
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T271 | Modificar `prompts/gh-pages-init.prompt.md` para solo verificar config existente | ✅ |
| T272 | Eliminar flujo de "copiar template" (ya no existe) | ✅ |
| T273 | Actualizar `instructions/gh-pages.instructions.md` con arquitectura simplificada | ✅ |

---

### SCRIPT-0.14.0-S03: Sincronizar documentación
**Estado**: ✅ Completada (N/A - no hay template que sincronizar)

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T274 | ~~Copiar footer.html~~ → N/A (template eliminado) | ✅ |
| T275 | ~~Copiar main.css~~ → N/A (template eliminado) | ✅ |
| T276 | ~~Actualizar _config.yml del template~~ → N/A | ✅ |
| T277 | Actualizar version a v1.1.0 en manifest y registry | ✅ |

---

### SCRIPT-0.14.0-S04: Documentación
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T278 | Reescribir docs/README.md del plugin con arquitectura simplificada | ✅ |
| T279 | Reescribir instructions con single source of truth | ✅ |
| T280 | Actualizar agents/ghpages.agent.md eliminando refs a template | ✅ |
| T281 | Actualizar ARCHIVO/PLUGINS/GH_PAGES/README.md | ✅ |
| T282 | Actualizar registry.json con v1.1.0 y notas | ✅ |

---

### SCRIPT-0.14.0-S05: Resolver duplicación Noticias/Periódico
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T283 | Verificar que noticias.md no existe (ya eliminado previamente) | ✅ |
| T284 | Actualizar navegación en _config.yml: "periodico" → "Periódico" | ✅ |
| T285 | Registrar resolución en BACKLOG changelog | ✅ |

---

## Métricas Sprint 0.14

| Métrica | Valor |
|---------|-------|
| Tasks totales | 17 |
| Completadas | 17 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

## Diagrama de Arquitectura (Simplificado v1.1.0)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLUGIN GH-PAGES v1.1.0                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  .github/plugins/gh-pages/                                       │
│  ├── manifest.md              ← Metadatos del plugin             │
│  ├── agents/ghpages.agent.md  ← Agente orquestador               │
│  ├── prompts/                 ← Comandos disponibles             │
│  ├── instructions/            ← Flujos de trabajo                │
│  ├── docs/README.md           ← Documentación del plugin         │
│  └── meta/                                                       │
│      └── README.md            ← Explica por qué está vacío       │
│                               (SCRIPT-0.14.0: sin plantilla)     │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  docs/                        ← ÚNICA FUENTE DE VERDAD           │
│  ├── _config.yml              ← Configuración Jekyll             │
│  ├── _includes/               ← Headers, footers                 │
│  ├── _layouts/                ← Plantillas Jekyll                │
│  ├── assets/css/main.css      ← Estilos globales                 │
│  ├── index.md                 ← Portada                          │
│  ├── agentes.md               ← Showcase de agentes              │
│  ├── fundacion.md             ← Índice de capítulos              │
│  ├── periodico.md             ← Vista estilizada de noticias     │
│  ├── noticias.md              ← Listado de noticias              │
│  └── archivo.md               ← Documentación del ARCHIVO        │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ARCHIVO/PLUGINS/GH_PAGES/    ← Datos de runtime                 │
│  └── config.json              ← Estado de publicación            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

Flujo simplificado:
1. docs/ (raíz) es la única fuente de verdad
2. GitHub Pages sirve desde main /docs
3. NO hay plantilla interna - editar docs/ directamente
```

---

## Changelog Épica

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-22 | Crear bug report SCRIPT-0.14.0 | Aleph |
| 2025-12-22 | Documentar diagnóstico y opciones de solución | Aleph |
| 2025-12-22 | **RESUELTO**: Eliminar meta/jekyll-template/ completamente | Aleph |
| 2025-12-22 | Actualizar manifest.md, instructions, prompts, agent, docs | Aleph |
| 2025-12-22 | Actualizar registry.json a v1.1.0 | Aleph |
| 2025-12-22 | Marcar todas las tareas como completadas | Aleph |
| 2025-12-22 | **RESUELTO**: Eliminar duplicación noticias/periódico | GHPages |
| 2025-12-22 | Actualizar navegación _config.yml: "periodico" → "Periódico" | GHPages |

---

# Épica: SCRIPT-0.15.0 — Rediseño Página Periódico

**Tipo**: ✨ Feature / Mejora UX  
**Plugin**: gh-pages  
**Página**: `docs/periodico.md`

---

## Objetivo

Simplificar y mejorar la página del Periódico:
- **Mantener**: Zona de noticias con banners + Zona de tesis (alta calidad visual)
- **Eliminar**: Zona de método editorial (redundante, ya documentado en instrucciones)
- **Mejorar**: Zona de archivo → enlaces navegables a NOTICIAS y carpetas de trabajo DISCO

## Diseño Propuesto

```
┌─────────────────────────────────────────────────────────────────┐
│  CABECERA PERIÓDICO (masthead)                                  │
│  ESCRIVIVIR.CO · tagline · ISSN · edición                       │
├─────────────────────────────────────────────────────────────────┤
│  TITULAR PRINCIPAL (headline-box)                               │
│  «Cita editorial del número»                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ═══════ COLLAGE EDITORIAL ═══════                              │
│  [5 artículos con banners por bandera]                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ═══════ TESIS DEL NÚMERO ═══════                               │
│  [3 tesis convergentes]                                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ═══════ REDACCIÓN (nuevo) ═══════                              │
│  Grid de carpetas DISCO con thumbnails                          │
│  Enlaces a material de trabajo                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER → Volver                                                │
└─────────────────────────────────────────────────────────────────┘
```

## Stories

### SCRIPT-0.15.0-S01: Limpiar secciones redundantes
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T286 | Eliminar sección "Método editorial" (tabla 5W+Banderas) | ✅ |
| T287 | Eliminar sección "Archivo completo" (simple enlace GitHub) | ✅ |

---

### SCRIPT-0.15.0-S02: Nueva sección Redacción
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T288 | Crear sección "Redacción" con grid de carpetas DISCO | ✅ |
| T289 | Diseñar cards para cada carpeta de trabajo (thumbnail + título + enlace) | ✅ |
| T290 | Enlazar a ARCHIVO/NOTICIAS/ con índice de planas publicadas | ✅ |
| T291 | Añadir estilos CSS para grid de redacción | ✅ |

---

### SCRIPT-0.15.0-S03: Homogeneizar estilos
**Estado**: ⏳ Pendiente (parcial en fundacion.md)

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T292 | Extraer estilos comunes a main.css (reutilizables) | ⏳ |
| T293 | Crear clases compartidas con fundacion.md | ⏳ |
| T294 | Documentar paleta de colores y componentes | ⏳ |

---

## Métricas Sprint 0.15

| Métrica | Valor |
|---------|-------|
| Tasks totales | 9 |
| Completadas | 6 |
| En progreso | 0 |
| Pendientes | 3 |
| % Avance | 67% |

---

# Épica: SCRIPT-0.16.0 — Rediseño Página Fundación (Teatro ARG)

**Tipo**: ✨ Feature / Mejora UX  
**Plugin**: gh-pages  
**Página**: `docs/fundacion.md`

---

## Objetivo

Transformar la página de Fundación en un **showcase promocional** que presente:
1. **Fundación como Obra de Teatro ARG** que se puede experimentar en teatros digitales
2. **Ecosistema VibeCoding**: Suite de herramientas donde Scriptorium produce agentes
3. **ARG_BOARD como Teatro**: Motor que ejecuta obras transmedia con personajes IA
4. **AGENT_CREATOR como Fábrica**: Plugin que crea personajes para las obras

## Concepto Creativo

> "De la página al escenario: FUNDACIÓN no es solo un texto, es una obra de teatro transmedia donde los agentes son los actores."

### Metáfora Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎭 ECOSISTEMA VIBECODING                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     SCRIPTORIUM              ARG_BOARD              FUNDACIÓN   │
│    ┌──────────┐            ┌──────────┐           ┌──────────┐  │
│    │  Taller  │ ─produces→ │  Teatro  │ ─stages─→ │   Obra   │  │
│    │ (agentes)│            │ (escenas)│           │(capítulos│  │
│    └──────────┘            └──────────┘           └──────────┘  │
│         │                       ↑                               │
│         └───── AGENT_CREATOR ───┘                               │
│              (crea personajes)                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Diseño Propuesto (estilo agentes.md)

```
┌─────────────────────────────────────────────────────────────────┐
│  HERO SECTION (dark, animado)                                   │
│  🎭 FUNDACIÓN                                                   │
│  "Un texto que se convierte en obra de teatro transmedia"       │
│  [CTA: Ver Índice] [CTA: Entrar al Teatro]                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ═══════ ECOSISTEMA ═══════                                     │
│  3 cards: Scriptorium → ARG_BOARD → Fundación                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ═══════ LA OBRA ═══════                                        │
│  Timeline visual de 12 capítulos por arco                       │
│  Estado: Borrador / En progreso / Publicado                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ═══════ EL TEATRO ═══════                                      │
│  Card ARG_BOARD: 8 agentes, obras activas, BOE                  │
│  Card AGENT_CREATOR: agentes creados, recetas                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ═══════ RECURSOS ═══════                                       │
│  Grid: Backlog, Indicadores, Marco conceptual                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
└─────────────────────────────────────────────────────────────────┘
```

## Stories

### SCRIPT-0.16.0-S01: Hero Section (estilo agentes.md)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T295 | Crear hero section con tema dark y animaciones | ✅ |
| T296 | Diseñar icono/ilustración de teatro (SVG inline) | ✅ |
| T297 | Añadir CTAs: "Ver Índice" + "Entrar al Teatro" | ✅ |
| T298 | Implementar tagline animado | ✅ |

---

### SCRIPT-0.16.0-S02: Sección Ecosistema
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T299 | Crear 3 cards conectadas: Scriptorium → ARG_BOARD → Fundación | ✅ |
| T300 | Diseñar flechas/conexiones entre cards | ✅ |
| T301 | Añadir descripción breve de cada componente | ✅ |

---

### SCRIPT-0.16.0-S03: Sección La Obra (Índice visual)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T302 | Convertir índice de capítulos en timeline visual | ✅ |
| T303 | Añadir badges de estado (Borrador/En progreso/Publicado) | ✅ |
| T304 | Crear indicadores de desplazamiento (Temporal/Antropológico/Escalar) | ✅ |
| T305 | Agrupar por arcos con separadores visuales | ✅ |

---

### SCRIPT-0.16.0-S04: Sección El Teatro (ARG_BOARD + AGENT_CREATOR)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T306 | Crear card ARG_BOARD con métricas (8 agentes, obras, BOE) | ✅ |
| T307 | Crear card AGENT_CREATOR con agentes creados | ✅ |
| T308 | Enlazar a documentación de plugins | ✅ |
| T309 | Mostrar "obras.json" y "actores.json" como preview | ✅ |

---

### SCRIPT-0.16.0-S05: Sección Recursos
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T310 | Grid de recursos: Backlog, Indicadores, Marco | ✅ |
| T311 | Enlaces a GitHub con descripción | ✅ |

---

### SCRIPT-0.16.0-S06: Homogeneización con Periódico
**Estado**: ⏳ Pendiente (CSS embebido, no extraído a main.css)

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T312 | Compartir variables CSS entre ambas páginas | ⏳ |
| T313 | Crear componentes reutilizables (cards, headers, badges) | ⏳ |
| T314 | Documentar sistema de diseño en main.css | ⏳ |

---

## Métricas Sprint 0.16

| Métrica | Valor |
|---------|-------|
| Tasks totales | 20 |
| Completadas | 17 |
| En progreso | 0 |
| Pendientes | 3 |
| % Avance | 85% |

---

## Especificación de Diseño Compartido

### Variables CSS Comunes (a añadir en main.css)

```css
/* ═══════════════════════════════════════════════════════════════
   PÁGINAS PROMOCIONALES (agentes, periodico, fundacion)
   ═══════════════════════════════════════════════════════════════ */

.promo-page {
  --promo-bg: #0d1117;
  --promo-card-bg: rgba(255, 255, 255, 0.03);
  --promo-card-border: rgba(255, 255, 255, 0.08);
  --promo-text: #e6edf3;
  --promo-muted: rgba(255, 255, 255, 0.6);
  --promo-accent: #00d4ff;
}

.promo-hero { /* hero común */ }
.promo-card { /* card común */ }
.promo-grid { /* grid común */ }
.promo-section { /* sección común */ }
```

### Componentes Compartidos

| Componente | Uso | Páginas |
|------------|-----|---------|
| `.promo-hero` | Hero section con gradiente y animación | agentes, fundacion |
| `.promo-card` | Card con borde y hover | agentes, fundacion, periodico |
| `.promo-grid` | Grid responsive 2-3 columnas | agentes, fundacion, periodico |
| `.promo-section` | Sección con header decorado | periodico (ya tiene), fundacion |
| `.promo-badge` | Badge de estado | fundacion, periodico |
| `.promo-timeline` | Timeline de evolución | agentes, fundacion |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-22 | Crear épicas SCRIPT-0.15.0 y SCRIPT-0.16.0 | GHPages |
| 2025-12-22 | Definir diseño propuesto para ambas páginas | GHPages |
| 2025-12-22 | Especificar sistema de componentes compartidos | GHPages |
| 2025-12-22 | **IMPLEMENTADO**: periodico.md - nueva sección Redacción con grid DISCO | Aleph |
| 2025-12-22 | **IMPLEMENTADO**: fundacion.md - rediseño completo estilo agentes.md | Aleph |

