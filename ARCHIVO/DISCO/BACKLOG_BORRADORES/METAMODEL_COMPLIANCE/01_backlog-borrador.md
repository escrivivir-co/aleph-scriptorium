# Backlog Borrador: SCRIPT-1.21.0 — Metamodel Compliance para FloveEditor

**Estado**: ✅ Publicado en BACKLOG-SCRIPTORIUM.md (consolidado 2025-12-26)

> **Sprint**: 2 — Feature Cycle 1  
> **Modelo**: Auditoría + Integración de Submódulo  
> **Effort total**: 21 puntos  
> **Fuente de auditoría**: https://codeberg.org/talaiadigtal/metamodel

---

## Objetivo

Integrar el metamodel de Talaia Digital como framework de auditoría para asegurar que el plugin flove-editor produce ontologías certificables según estándares formales (UFO, FAIR, XAI).

---

## Épica

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| SCRIPT-1.21.0 | Metamodel Compliance para FloveEditor | Scriptorium | 21 pts | P1 |

---

## Feature Cycle 1: Integración y Arquitectura

### Objetivos FC1

1. Instalar submódulo metamodel dentro de OnthologyEditor
2. Diseñar arquitectura de integración
3. Crear documento de mapeo Flove ↔ UFO
4. Inicializar documentación de compliance

---

## Stories

### SCRIPT-1.21.0-S01: Integración de Submódulo Metamodel
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción

Agregar el repositorio `talaiadigital/metamodel` de Codeberg como submódulo Git dentro de OnthologyEditor.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Verificar que OnthologyEditor ya está en rama `integration/beta/scriptorium` | 0.5 | ⏳ |
| T002 | Ejecutar `git submodule add https://codeberg.org/talaiadigital/metamodel.git metamodel` dentro de OnthologyEditor | 1 | ⏳ |
| T003 | Crear `OnthologyEditor/metamodel/README-SCRIPTORIUM.md` con análisis de integración | 1 | ⏳ |
| T004 | Actualizar `OnthologyEditor/README-SCRIPTORIUM.md` con sección "Metamodel Compliance" | 0.5 | ⏳ |
| T005 | Actualizar `.gitmodules` del repo principal si es necesario | 0.5 | ⏳ |
| T006 | Commit según protocolo DevOps | 0.5 | ⏳ |
| T007 | Actualizar `scripts/setup-workspace.sh` para inicializar submódulo nested | 1 | ⏳ |

**Definition of Done**:
- [ ] Submódulo metamodel visible en `OnthologyEditor/metamodel/`
- [ ] `git submodule update --init --recursive` funciona desde raíz
- [ ] README-SCRIPTORIUM.md documenta el submódulo nested

---

### SCRIPT-1.21.0-S02: Arquitectura de Integración
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción

Diseñar cómo el metamodel se integrará con OnthologyEditor y flove-editor.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Crear `OnthologyEditor/docs/ARCHITECTURE.md` con diseño de integración | 1.5 | ⏳ |
| T009 | Documentar las 5 capas del metamodel y cómo mapean a Flove | 1 | ⏳ |
| T010 | Diseñar estructura de carpetas `src/compliance/` | 0.5 | ⏳ |
| T011 | Identificar puntos de extensión en flove-editor para validación | 1 | ⏳ |
| T012 | Crear diagrama de flujo: Ontología Flove → Validación UFO → Exportación | 1 | ⏳ |

**Definition of Done**:
- [ ] ARCHITECTURE.md explica el diseño completo
- [ ] Diagrama de flujo incluido
- [ ] Puntos de extensión documentados

---

### SCRIPT-1.21.0-S03: Mapeo Conceptual Flove ↔ UFO
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción

Crear documento de mapeo entre el paradigma CONFLUENTISM (Flove) y la Unified Foundational Ontology (UFO).

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T013 | Estudiar estructura UFO del metamodel (Endurants, Perdurants, Momentos) | 1 | ⏳ |
| T014 | Mapear los 10 campos de Flove a conceptos UFO | 1 | ⏳ |
| T015 | Mapear los 6 paradigmas de Flove a patrones ontológicos | 1 | ⏳ |
| T016 | Mapear las 15 apps de Flove a modos/cualidades UFO | 1 | ⏳ |
| T017 | Crear `ARCHIVO/PLUGINS/FLOVE_EDITOR/mapeo-flove-ufo.md` | 1 | ⏳ |

**Definition of Done**:
- [ ] Documento de mapeo completo con tablas
- [ ] Gaps identificados para futuros FCs
- [ ] Revisado por @yellowflag (límites conceptuales)

---

### SCRIPT-1.21.0-S04: Actualización del Plugin flove-editor
**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción

Actualizar el plugin flove-editor con referencias al metamodel y preparar para validación.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T018 | Añadir sección "Compliance" en `manifest.md` | 0.5 | ⏳ |
| T019 | Actualizar `flove-paradigm.instructions.md` con referencias UFO | 0.5 | ⏳ |
| T020 | Añadir handoff "Validar contra UFO" en agente FloveEditor | 0.5 | ⏳ |
| T021 | Actualizar `registry.json` con campo `compliance.metamodel` | 0.5 | ⏳ |
| T022 | Incrementar versión a 0.2.0 | 0.5 | ⏳ |
| T023 | Crear `prompts/validar-ufo.prompt.md` (stub para FC2) | 0.5 | ⏳ |

**Definition of Done**:
- [ ] Plugin actualizado a v0.2.0
- [ ] Referencias al metamodel en documentación
- [ ] Handoff de validación preparado

---

### SCRIPT-1.21.0-S05: Documentación y Publicación
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción

Completar documentación y publicar épica en backlog principal.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T024 | Añadir épica SCRIPT-1.21.0 a BACKLOG-SCRIPTORIUM.md | 0.5 | ⏳ |
| T025 | Actualizar PLUGINS.md con nota de compliance en flove-editor | 0.5 | ⏳ |
| T026 | Actualizar docs/ecosistema.md con metamodel como dependencia | 0.5 | ⏳ |
| T027 | Crear entrada en docs/roadmap.md para Metamodel Compliance | 0.5 | ⏳ |
| T028 | Commit según protocolo DevOps | 0.5 | ⏳ |
| T029 | Actualizar contadores en README.md (nuevo submódulo) | 0.5 | ⏳ |

**Definition of Done**:
- [ ] Épica publicada en backlog principal
- [ ] Documentación web actualizada
- [ ] README refleja nuevo submódulo

---

## Métricas FC1

| Métrica | Target | Mínimo |
|---------|--------|--------|
| Tasks totales | 29 | - |
| Stories Must | 4 (18 pts) | 3 |
| Stories Should | 1 (3 pts) | 0 |
| Submódulo instalado | ✅ | ✅ |
| Mapeo documentado | ✅ | ✅ |
| Plugin actualizado | ✅ | - |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| OnthologyEditor submódulo | ✅ Instalado | Rama integration/beta/scriptorium |
| flove-editor plugin | ✅ Instalado | v0.1.0 |
| Metamodel Codeberg | ✅ Público | CC BY-SA 4.0 |
| Git nested submodules | ✅ Soportado | Requiere --recursive |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Licencia CC BY-SA incompatible | Baja | Alto | Verificar con legal antes de integrar |
| Metamodel muy complejo | Media | Medio | Empezar por UFO básico |
| Submódulo nested problemático | Baja | Medio | Test en branch separado |

---

## Roadmap Post-FC1

| FC | Objetivo | Estimación |
|----|----------|------------|
| **FC2** | Validación UFO (templates, validador, tests) | ~25 pts |
| **FC3** | FAIR + Exportadores (metadatos, OWL, JSON-LD) | ~20 pts |
| **FC4** | XAI + Análisis Dimensional | ~15 pts |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-01-03 | Crear backlog borrador FC1 | @scrum |

---

## Pendiente Aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.

Una vez aprobado, se publicará en `.github/BACKLOG-SCRIPTORIUM.md` como SCRIPT-1.21.0.

