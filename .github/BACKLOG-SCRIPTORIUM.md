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
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T078 | Crear prompt `orangeflag-dialectico.prompt.md` (modo examen) | ⏳ |
| T079 | Crear prompt `orangeflag-retorico.prompt.md` (modo persuasión) | ⏳ |
| T080 | Crear `instructions/orangeflag.instructions.md` | ⏳ |

---

## Métricas Sprint 0.4

| Métrica | Valor |
|---------|-------|
| Tasks totales | 14 |
| Completadas | 11 |
| En progreso | 0 |
| Pendientes | 3 |
| % Avance | 79% |

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
