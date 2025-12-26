# Backlog Borrador: OnthologyEditor (Plugin Flove-Editor)

> **Estado**: 📋 BORRADOR — Pendiente aprobación  
> **Submódulo**: #15 OnthologyEditor  
> **Plugin**: flove-editor  
> **Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/ONTHOLOGY_EDITOR/conversacion-po-sm.md`

---

## Épica: SCRIPT-1.20.0 — Editor de Ontologías (Flove Template)

**Objetivo**: Crear un editor de ontologías basado en el paradigma CONFLUENTISM de Flove que permita diseñar, exportar e integrar ontologías con los plugins existentes del Scriptorium.

**Estado**: 🆕 Borrador

**Submódulo**: `OnthologyEditor` (https://github.com/escrivivir-co/alephscript-onthology-editor.git)  
**Rama de trabajo**: `main`

---

## Contexto

### El problema

Los agentes del Scriptorium necesitan **contratos de comunicación** formales, pero:
- No hay un paradigma estándar para modelar ontologías
- TypedPrompting valida schemas pero no ayuda a diseñarlos
- Cada plugin define su propio vocabulario sin coherencia

### La solución

Un editor de ontologías que:
1. Use el paradigma **CONFLUENTISM** de Flove como template
2. Guíe el diseño con estructura de 3 niveles (Fuzzy→PsicoSocial→Freedom)
3. Exporte a formatos estándar (JSON Schema, TypeScript, Zod)
4. Se integre con TypedPrompting y AGENT_CREATOR

### Paradigma Flove

```
┌─────────────────────────────────────────────────────────────┐
│                    CONFLUENTISM                              │
├─────────────────────────────────────────────────────────────┤
│  Nivel 1: FUZZY LOGIC                                        │
│  RELATE ──▶ EXPLAIN ──▶ VIEW                                 │
│                                                               │
│  Nivel 2: PSICOSOCIAL                                        │
│  SOULS ◀──────────────▶ TRUSTFUL                             │
│                                                               │
│  Nivel 3: FREEDOM / ECONOMY                                  │
│  FREE ◀───────────────▶ MAKING                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Stories

### SCRIPT-1.20.0-S01: Estructura Base del Submódulo
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear submódulo OnthologyEditor | 0.5 | ✅ |
| T002 | Crear README-SCRIPTORIUM.md con análisis Flove | 0.5 | ✅ |
| T003 | Crear README.md básico | 0.25 | ✅ |
| T004 | Crear package.json | 0.25 | ✅ |
| T005 | Crear estructura plugin .github/plugins/flove-editor/ | 0.5 | ✅ |

**Definition of Done**: Submódulo y plugin estructurados, listos para desarrollo.

---

### SCRIPT-1.20.0-S02: Core Parser de Ontologías
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T006 | Definir schema YAML de ontología Flove | 1 | ⏳ |
| T007 | Crear FloveOntology.ts (modelo de datos) | 1 | ⏳ |
| T008 | Crear FloveParser.ts (lector YAML) | 1 | ⏳ |
| T009 | Crear FloveValidator.ts (validación de estructura) | 1 | ⏳ |
| T010 | Tests unitarios del parser | 1 | ⏳ |

**Definition of Done**: Parser lee y valida ontologías YAML con estructura Flove.

---

### SCRIPT-1.20.0-S03: Exportador JSON Schema
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T011 | Crear JsonSchemaExporter.ts | 1 | ⏳ |
| T012 | Mapear niveles Flove a $defs JSON Schema | 1 | ⏳ |
| T013 | Tests de exportación | 0.5 | ⏳ |
| T014 | Documentar formato de salida | 0.5 | ⏳ |

**Definition of Done**: Ontología exportable como JSON Schema válido.

---

### SCRIPT-1.20.0-S04: Exportador TypeScript
**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T015 | Crear TypeScriptExporter.ts | 1 | ⏳ |
| T016 | Generar interfaces por nivel Flove | 1 | ⏳ |
| T017 | Tests de exportación | 0.5 | ⏳ |
| T018 | Documentar formato de salida | 0.5 | ⏳ |

**Definition of Done**: Ontología exportable como interfaces TypeScript.

---

### SCRIPT-1.20.0-S05: Exportador Zod
**Effort**: 2 pts  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Crear ZodExporter.ts | 1 | ⏳ |
| T020 | Tests de exportación | 0.5 | ⏳ |
| T021 | Documentar formato de salida | 0.5 | ⏳ |

**Definition of Done**: Ontología exportable como schemas Zod.

---

### SCRIPT-1.20.0-S06: Integración TypedPrompting
**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T022 | Crear handoff FloveEditor → TypedPrompting | 0.5 | ⏳ |
| T023 | Implementar instalación automática de schema | 1 | ⏳ |
| T024 | Documentar flujo de integración | 0.5 | ⏳ |
| T025 | Test end-to-end | 1 | ⏳ |

**Definition of Done**: Schema exportado se instala automáticamente en TypedPrompting.

---

### SCRIPT-1.20.0-S07: Integración AGENT_CREATOR
**Effort**: 3 pts  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T026 | Crear handoff FloveEditor → AGENT_CREATOR | 0.5 | ⏳ |
| T027 | Añadir campo ontology a recipe.json schema | 1 | ⏳ |
| T028 | Documentar asignación de ontologías a agentes | 0.5 | ⏳ |
| T029 | Test end-to-end | 1 | ⏳ |

**Definition of Done**: Ontologías asignables a recetas de agentes.

---

### SCRIPT-1.20.0-S08: Bridge Agent y Registro
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T030 | Crear plugin_ox_floveeditor.agent.md | 0.5 | ⏳ |
| T031 | Actualizar registry.json | 0.5 | ⏳ |
| T032 | Actualizar aleph.agent.md con handoffs | 0.5 | ⏳ |
| T033 | Actualizar ox.agent.md con índice | 0.5 | ⏳ |

**Definition of Done**: Plugin registrado y accesible vía @aleph.

---

### SCRIPT-1.20.0-S09: Documentación
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T034 | Crear README.md completo en OnthologyEditor | 0.5 | ⏳ |
| T035 | Crear ARCHIVO/PLUGINS/FLOVE_EDITOR/README.md | 0.5 | ⏳ |
| T036 | Documentar ejemplos de ontologías | 0.5 | ⏳ |
| T037 | Actualizar copilot-instructions.md | 0.5 | ⏳ |

**Definition of Done**: Documentación completa para usuarios y desarrolladores.

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 9 |
| Tasks totales | 37 |
| Effort total | 25 pts |
| Prioridad Must | 4 stories (11 pts) |
| Prioridad Should | 2 stories (6 pts) |
| Prioridad Could | 3 stories (8 pts) |
| Completadas | 1 (S01) |
| % Avance | **11%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo OnthologyEditor | ✅ Creado | Rama main |
| Plugin flove-editor | ✅ Estructura | Manifest, agente, prompts |
| TypedPrompting | ✅ Operativo | Target de integración |
| AGENT_CREATOR | ✅ Operativo | Target de integración |
| FloveDocs | 📚 Referencia | No clonado, solo análisis |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Paradigma Flove demasiado abstracto | Media | Alto | Crear ejemplos concretos primero |
| FloveDocs incompleta | Baja | Medio | Documentar desde presentaciones |
| Scope creep (UI visual) | Alta | Medio | MVP conversacional, sin UI |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-01-XX | Crear backlog borrador | @scrum |
| 2025-01-XX | Completar S01: estructura base | @aleph |
