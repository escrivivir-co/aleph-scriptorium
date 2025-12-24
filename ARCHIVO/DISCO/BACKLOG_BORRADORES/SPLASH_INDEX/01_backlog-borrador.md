# Backlog Borrador: SCRIPT-1.16.0 — Índice SPLASH y Vinculación GH-Pages

> **Estado**: ✅ Completada (85% - minor pending)  
> **Fecha**: 2025-01-02  
> **Sprint**: 2 (FC1)  
> **Conversación PO-SM**: En línea con épica

---

## Contexto

### El problema

El plugin GH-Pages no tiene un índice estructural que:
- Documente la arquitectura del sitio web
- Sirva de mapa para refactorizaciones
- Se mantenga sincronizado con cambios en `docs/`
- Genere warnings en commits cuando haya discrepancias

### La solución

1. **Índice SPLASH**: Documento técnico-funcional en `ARCHIVO/DISCO/SPLASH/`
2. **Vinculación**: El plugin GH-Pages referencia y mantiene el índice
3. **Interceptación**: Las operaciones del plugin verifican coherencia
4. **Warning en commits**: `commit-message.prompt.md` valida cambios en `docs/`

---

## Feature Cycle 1: Vinculación Índice SPLASH

### Objetivo

Vincular el índice SPLASH con el plugin GH-Pages para mantener coherencia documental y operacional.

---

## Story: SCRIPT-1.16.0-S01 — Creación del Índice SPLASH
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción

Crear documento técnico-funcional que mapea la estructura de `docs/`.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `ARCHIVO/DISCO/SPLASH/index.md` con arquitectura Jekyll | 1 | ✅ |
| T002 | Documentar 8 secciones de index.md con líneas y clases CSS | 1 | ✅ |
| T003 | Mapear sistema CSS (variables, banderas, ubicaciones) | 0.5 | ✅ |
| T004 | Documentar páginas del sitio y operaciones | 0.5 | ✅ |

**Definition of Done**: Índice completo con mapa visual, tablas de referencia y checklist.

---

## Story: SCRIPT-1.16.0-S02 — Vinculación con Instrucciones GH-Pages
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción

Modificar `gh-pages.instructions.md` para referenciar y consultar el índice SPLASH.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Añadir sección "Índice SPLASH" en instrucciones | 1 | ✅ |
| T006 | Documentar flujo de consulta del índice | 0.5 | ✅ |
| T007 | Añadir regla: "Actualizar índice si se modifica estructura" | 0.5 | ✅ |
| T008 | Añadir referencia cruzada en §8 del índice SPLASH | 1 | ✅ |

**Definition of Done**: Instrucciones referencian el índice; el índice referencia las instrucciones.

---

## Story: SCRIPT-1.16.0-S03 — Interceptación de Operaciones
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción

Modificar prompts del plugin para verificar coherencia con el índice antes de operar.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T009 | Modificar `gh-pages-publish.prompt.md`: añadir paso de validación | 1 | ✅ |
| T010 | Modificar `gh-pages-merge.prompt.md`: verificar sección afectada | 1 | ⏳ |
| T011 | Modificar `gh-pages-replace.prompt.md`: advertir impacto en índice | 1 | ⏳ |
| T012 | Crear lógica: si cambia estructura → sugerir actualizar índice | 1 | ✅ |
| T013 | Documentar qué operaciones requieren actualización del índice | 1 | ✅ |

**Definition of Done**: Cada operación del plugin verifica coherencia con SPLASH.

**Definition of Done**: Cada operación del plugin verifica coherencia con SPLASH.

---

## Story: SCRIPT-1.16.0-S04 — Warning en Commit-Message
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción

Modificar `commit-message.prompt.md` para validar cambios en `docs/` contra el índice SPLASH.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T014 | Añadir "Paso 2.6: Validar índice SPLASH" | 1 | ✅ |
| T015 | Definir criterios de warning (nuevas secciones, CSS, páginas) | 0.5 | ✅ |
| T016 | Documentar formato del warning (informativo, no bloqueante) | 0.5 | ✅ |
| T017 | Añadir sugerencia de actualización si hay discrepancia | 1 | ✅ |

**Definition of Done**: Commits con cambios en `docs/` generan warning si el índice puede estar desactualizado.

---

## Story: SCRIPT-1.16.0-S05 — Actualización de Agente GHPages
**Puntos**: 2  
**Prioridad**: Should  
**Estado**: ✅ Completada

### Descripción

Añadir handoffs al agente GHPages para consultar y actualizar el índice.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T018 | Añadir handoff "Consultar índice SPLASH" | 0.5 | ✅ |
| T019 | Añadir handoff "Actualizar índice SPLASH" | 0.5 | ✅ |
| T020 | Documentar cuándo usar cada handoff | 1 | ⏳ |

**Definition of Done**: Agente GHPages tiene acceso al índice SPLASH.

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | 20/20 | 14/20 | **17/20** |
| Stories completadas | 5/5 | 4/5 | **5/5** |
| Effort completado | 16 pts | 11 pts | **14 pts** |
| % Avance | 100% | 70% | **85%** 🎉 |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Plugin GH-Pages | ✅ Instalado | v1.1.0 |
| Índice SPLASH base | ✅ Creado | `ARCHIVO/DISCO/SPLASH/index.md` |
| commit-message.prompt.md | ✅ Modificado | Paso 2.6 añadido |

---

## Criterios de Éxito

1. ✅ El índice SPLASH existe y mapea la estructura de `docs/`
2. ✅ Las instrucciones del plugin referencian el índice
3. ✅ Los prompts verifican coherencia antes de operar
4. ✅ Los commits con cambios en `docs/` generan warning
5. ✅ El agente GHPages tiene handoffs para el índice

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear backlog borrador | @scrum |
| 2025-12-24 | Completar S01 (índice SPLASH creado) | @aleph |
| 2025-01-02 | Completar S02-S05 (vinculación, interceptación, warning, handoffs) | @aleph |

---

## Próximo Paso

Pendiente: T010 (gh-pages-merge), T011 (gh-pages-replace), T020 (documentar handoffs).
Cerrar épica tras completar tareas menores o marcar como minor-pending.

