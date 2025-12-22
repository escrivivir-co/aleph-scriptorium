---
name: Protocolo Scrum de Backlogs
description: Protocolo completo para gestión ágil de backlogs con fases de edición, aprobación y tracking.
applyTo: "ARCHIVO/DISCO/**/*.md, .github/BACKLOG-*.md, PROYECTOS/**/BACKLOG-*.md"
---

# Protocolo Scrum de Backlogs

> **Plugin**: Scrum  
> **Agente**: @scrum  
> **Versión**: 1.0.0

---

## 1. Principios

### 1.1. Separación de espacios

| Espacio | Propósito | Mutabilidad |
|---------|-----------|-------------|
| `ARCHIVO/DISCO/` | Borradores, conversaciones, exploración | Alta |
| `.github/BACKLOG-*.md` | Backlogs oficiales aprobados | Controlada |
| `ARCHIVO/FOTOS_ESTADO/` | Snapshots históricos | Inmutable |

### 1.2. Regla de oro

> "El backlog se cocina en DISCO, se sirve en .github/"

Nunca editar backlogs oficiales directamente. Siempre pasar por:
1. Borrador en DISCO
2. Revisión/aprobación
3. Publicación con commit formal

### 1.3. Effort sobre cronología

Los backlogs usan **puntos de effort**, no estimaciones temporales.

| Effort | Complejidad | Ejemplo |
|--------|-------------|---------|
| 1 pt | Trivial | Renombrar archivo |
| 2 pts | Simple | Crear documento con plantilla |
| 3 pts | Moderado | Implementar feature pequeña |
| 5 pts | Complejo | Diseñar arquitectura |
| 8 pts | Muy complejo | Redactar capítulo completo |
| 13 pts | Épico | Crear nuevo plugin |

---

## 2. Fases del Protocolo

### Fase 1: Planificar

**Objetivo**: Definir qué se va a hacer en el próximo sprint.

**Participantes**: PO (usuario), SM (@scrum)

**Artefactos**:
- `01_planificacion-sprintN.md` (conversación)

**Estructura de la conversación**:

```markdown
# Planificación Sprint N: Conversación PO-SM

> **Fecha**: YYYY-MM-DD
> **Participantes**: Product Owner (PO), Scrum Master (SM)
> **Contexto**: [Estado del sprint anterior]

---

## Apertura

**SM**: [Resumen del sprint anterior y sus métricas]

**PO**: [Dirección general para el nuevo sprint]

---

## Definición del Objetivo

**SM**: [Propuesta de objetivo SMART]

**PO**: [Aprobación o ajuste]

---

## Identificación de Épicas

[Diálogo sobre épicas, prioridades, riesgos]

---

## Riesgos y Mitigaciones

[Tabla de riesgos identificados]

---

## Métricas de Éxito

[Definición de qué significa "éxito" para este sprint]

---

## Cierre

**SM**: [Resumen ejecutivo]

**PO**: [Aprobación para generar backlog]
```

---

### Fase 2: Editar (Borrador)

**Objetivo**: Generar backlog detallado con épicas, stories, tasks.

**Participantes**: SM (@scrum)

**Artefactos**:
- `02_backlog-sprintN.md` (borrador)

**Estructura del borrador**:

```markdown
# Backlog Sprint N: [Nombre]

> **Sprint**: N — [Nombre]
> **Feature Cycle**: M
> **Modelo**: [Descripción del modelo de trabajo]
> **Effort total**: X puntos

---

## Épicas

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| {ID} | {Nombre} | {Opp} | {N} pts | P0/P1/P2 |

---

## Feature Cycle M: Estructura

[Diagrama de iteraciones]

---

## Iteración 1: [Nombre]

**Objetivo**: [Descripción]
**Effort**: N puntos

### Stories

#### {ID}-S01: [Nombre]
**Effort**: N pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | ... | N | ⏳ |

**Definition of Done**: [Criterio de aceptación]

---

[Repetir para cada iteración]

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| ... | ... | ... | ⏳ |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| ... | ... | ... |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| YYYY-MM-DD | Crear backlog | @scrum |
```

---

### Fase 3: Aprobar

**Objetivo**: Validar borrador y publicar en backlog oficial.

**Participantes**: PO (usuario), SM (@scrum)

**Validaciones**:
- [ ] Todas las épicas tienen ID único
- [ ] Todas las stories tienen effort asignado
- [ ] Todas las tasks tienen estado inicial (⏳)
- [ ] Suma de effort coincide con total declarado
- [ ] Métricas de éxito definidas
- [ ] Dependencias identificadas

**Proceso de publicación**:

1. @scrum lee borrador de DISCO
2. @scrum identifica Opportunity:
   - `SCRIPT-*` → `.github/BACKLOG-SCRIPTORIUM.md`
   - `FUND-*` → `PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`
3. @scrum integra épicas en el backlog oficial:
   - Añade sección del nuevo sprint
   - Actualiza métricas globales
   - Actualiza changelog
4. @scrum genera commit:
   ```
   chore({scope}/plan): aprobar backlog sprint N

   - Integrar {épicas}
   - {N} tasks, {M} pts effort

   refs #{ID}
   ```

---

### Fase 4: Tracking

**Objetivo**: Mantener backlog sincronizado con la realidad durante desarrollo.

**Participantes**: DevOps (@aleph), SM (@scrum)

**Triggers de actualización**:
- @aleph completa una task
- Usuario reporta task completada
- Se detecta bloqueo

**Proceso**:

1. Recibir notificación de cambio de estado
2. Actualizar backlog oficial:
   ```markdown
   | T023 | Redactar tesis | 5 | ⏳ |
   ```
   →
   ```markdown
   | T023 | Redactar tesis | 5 | ✅ |
   ```
3. Recalcular métricas:
   - % Avance = (Σ effort ✅) / (Σ effort total) × 100
   - Buffer consumido (si aplica)
4. Generar commit si cambio significativo:
   ```
   chore({scope}/plan): actualizar tracking sprint N

   - T023 completada (5 pts)
   - Avance: 45% → 50%

   refs #{ID}
   ```

---

### Fase 5: Cerrar

**Objetivo**: Finalizar sprint, documentar aprendizajes, preparar siguiente.

**Participantes**: PO (usuario), SM (@scrum)

**Artefactos**:
- Foto de estado en `ARCHIVO/FOTOS_ESTADO/`
- Retrospectiva (puede ser parte de la foto)
- Propuesta de Sprint N+1

**Estructura de Foto de Estado**:

```markdown
# Foto de Estado: Sprint N — [Nombre]

> **Fecha**: YYYY-MM-DD
> **Sprint cerrado**: N

---

## Métricas Finales

| Métrica | Target | Real | Status |
|---------|--------|------|--------|
| Tasks completadas | N/N | M/N | ✅/⚠️/❌ |
| Effort completado | X pts | Y pts | ... |
| % Avance | 100% | Z% | ... |
| Buffer consumido | ≤30 pts | W pts | ... |

---

## Retrospectiva

### ✅ Qué funcionó
- ...

### ❌ Qué no funcionó
- ...

### 🔧 Qué mejorar
- ...

---

## Entregables

| Entregable | Estado | Ubicación |
|------------|--------|-----------|
| ... | ✅ | ... |

---

## Próximo Sprint

**Objetivo propuesto**: [Descripción]
**Épicas candidatas**: [Lista]
```

---

## 3. Comandos del Agente

| Comando | Fase | Descripción |
|---------|------|-------------|
| `@scrum planificar` | 1 | Inicia conversación PO-SM |
| `@scrum borrador` | 2 | Genera backlog en DISCO |
| `@scrum aprobar` | 3 | Publica en backlog oficial |
| `@scrum tracking` | 4 | Actualiza estado de tasks |
| `@scrum cerrar` | 5 | Retrospectiva y foto |
| `@scrum status` | * | Métricas actuales |

---

## 4. Integración con DevOps

### Commits

Todos los commits relacionados con backlogs siguen el protocolo de DEVOPS.md:

| Acción | Tipo | Scope |
|--------|------|-------|
| Crear borrador | - | (no se commitea) |
| Aprobar backlog | `chore` | `{opp}/plan` |
| Actualizar tracking | `chore` | `{opp}/plan` |
| Cerrar sprint | `docs` | `{opp}/plan` |

### IDs de referencia

- Épicas: `{OPP}-{MAJOR}.{MINOR}.{PATCH}` (ej: `FUND-1.1.0`)
- Stories: `{ÉPICA}-S{NN}` (ej: `FUND-1.1.0-S01`)
- Tasks: `T{NNN}` (ej: `T001`)

---

## 5. Cuándo usar este protocolo

### Usar protocolo completo cuando:
- Se planifica un sprint nuevo
- Se añaden múltiples épicas
- Se cambia el objetivo del sprint
- Se cierra un sprint

### Usar tracking directo cuando:
- Se completa una task individual
- Se actualiza estado de pocas tasks
- No hay cambio de scope

### No usar cuando:
- Cambios menores de documentación
- Corrección de typos en backlog
- Reordenación sin cambio de scope
