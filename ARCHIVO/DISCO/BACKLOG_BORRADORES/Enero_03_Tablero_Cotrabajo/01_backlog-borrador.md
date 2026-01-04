# Backlog Borrador: COWORK-1.0.0 — Tablero para Cotrabajo

> **Épica**: COWORK-1.0.0  
> **Fecha**: 2026-01-03  
> **Sprint**: FC1  
> **Estado**: ✅ Completada

---

## Contexto

### Problema

Actualmente, cuando múltiples agentes trabajan en una tarea compleja:

1. **Información perdida**: El contenido queda disperso en chats individuales
2. **Sin coordinación**: No hay mecanismo de turnos ni estados
3. **Sin trazabilidad**: Difícil reconstruir quién decidió qué y cuándo

### Solución

Un **protocolo de cotrabajo asíncrono** donde:

- El chat NO es el medio de trabajo → solo indica estados
- Los ficheros SÍ son el medio → todo queda registrado
- Turnos explícitos → coordinación sin colisiones

---

## Objetivo

Implementar el protocolo de cotrabajo multi-agente en el plugin `scriptorium-pack` para permitir sesiones de trabajo colaborativo estructuradas.

---

## Épica: COWORK-1.0.0 — Tablero para Cotrabajo

**Effort total**: 21 pts  
**Prioridad**: P1

### Story 1: Protocolo Base (8 pts)

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | ✅ Crear `cotrabajo.instructions.md` | 3 | ✅ |
| T002 | ✅ Definir estructura de carpeta de sesión | 2 | ✅ |
| T003 | ✅ Definir enumeración de estados de agente | 1 | ✅ |
| T004 | ✅ Documentar flujo de turno | 2 | ✅ |

### Story 2: Integración con Agente (5 pts)

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | ✅ Actualizar `scriptorium-pack.agent.md` con handoffs | 2 | ✅ |
| T006 | ✅ Actualizar `manifest.md` del plugin | 1 | ✅ |
| T007 | ✅ Crear prompt `iniciar-cotrabajo.prompt.md` | 2 | ✅ |

### Story 3: Documentación (5 pts)

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | ✅ Actualizar Funcional.md con sección cotrabajo | 1 | ✅ |
| T009 | ✅ Actualizar Tecnico.md con arquitectura | 1 | ✅ |
| T010 | ✅ Actualizar @indice con handoffs | 1 | ✅ |
| T011 | ✅ Actualizar @scrum con handoffs | 1 | ✅ |
| T012 | ✅ Crear manual de usuario Enero_03_Tablero_Cotrabajo/cotrabajo.md | 1 | ✅ |

### Story 4: Cierre (3 pts)

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T013 | ✅ Aprobar en backlog oficial | 1 | ✅ |
| T014 | ✅ Actualizar INDEX.md de borradores | 1 | ✅ |
| T015 | ✅ Commit con protocolo DevOps | 1 | ✅ |

---

## Métricas de Éxito

| Métrica | Target |
|---------|--------|
| Información registrada en ficheros | 100% (0 en chat) |
| Conflictos de turno | 0 por sesión |
| Trazabilidad de decisiones | 100% rastreable |
| Tiempo medio de turno | <15 min |

---

## Dependencias

- Plugin `scriptorium-pack` v1.0.0 ✅
- Protocolo `auto-reflexion.instructions.md` ✅
- Protocolo `scrum-workflow.instructions.md` ✅

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Agentes ignoran protocolo y escriben en chat | Instrucción explícita de estados permitidos |
| Conflictos de turno | Timestamp en tablero como árbitro |
| Sesiones muy largas | Límite opcional de turnos |

---

## Decisiones Arquitectónicas

### D1: Chat solo para estados

**Decisión**: Los agentes SOLO pueden responder con estados de la enumeración.  
**Razón**: Evitar información no registrada.  
**Alternativa descartada**: Permitir resúmenes cortos (difícil de enforcar).

### D2: Carpeta por sesión

**Decisión**: Cada sesión tiene su propia carpeta con estructura fija.  
**Razón**: Aislamiento, portabilidad, archivado fácil.  
**Alternativa descartada**: Un único tablero global (complejidad, conflictos).

### D3: Tablero como índice DRY

**Decisión**: El tablero solo contiene referencias, no contenido.  
**Razón**: Coherente con principio DRY del Scriptorium.  
**Alternativa descartada**: Tablero con contenido incrustado (duplicación).

---

## Próximos Pasos

✅ **Épica completada** — 2026-01-03

Todos los entregables implementados:
- Protocolo de cotrabajo documentado
- Agentes actualizados con handoffs
- Índices DRY sincronizados
- Manual de usuario publicado

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-03 | Creación del borrador | @scrum |
| 2026-01-03 | Completar T001-T007 (Stories 1-2) | @aleph |
| 2026-01-03 | Completar T008-T015 (Stories 3-4) — Épica cerrada | @aleph |
