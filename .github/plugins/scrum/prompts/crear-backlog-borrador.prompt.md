# Prompt: Crear Backlog Borrador

> **Plugin**: Scrum  
> **Comando**: `@scrum borrador`  
> **Fase**: 2 (Editar)

---

## Contexto

Este prompt genera un backlog detallado en DISCO a partir de la conversación de planificación.

## Instrucciones para @scrum

### Paso 1: Leer conversación

```
1. Localizar 01_planificacion-sprintN.md en DISCO
2. Extraer: objetivo, épicas, modelo, métricas de éxito
```

### Paso 2: Estructurar épicas

Para cada épica identificada:

```markdown
| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
```

**Convención de IDs**:
- Scriptorium: `SCRIPT-{MAJOR}.{MINOR}.{PATCH}`
- Fundación: `FUND-{MAJOR}.{MINOR}.{PATCH}`

### Paso 3: Diseñar iteraciones

Dividir el sprint en iteraciones lógicas:

```markdown
## Feature Cycle N: Estructura

| Iteración | Nombre | Objetivo | Effort |
|-----------|--------|----------|--------|
| FC1-I1 | ... | ... | N% |
| FC1-I2 | ... | ... | M% |
| ...
```

**Regla**: El effort total de iteraciones = 100%

### Paso 4: Desglosar stories y tasks

Para cada iteración:

```markdown
## Iteración N: {Nombre}

**Objetivo**: {descripción}
**Effort**: {N} puntos

### Stories

#### {ÉPICA}-S{NN}: {Nombre}
**Effort**: {N} pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | ... | N | ⏳ |
| T002 | ... | M | ⏳ |

**Definition of Done**: {criterio de aceptación}
```

### Paso 5: Calcular métricas iniciales

```markdown
## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | {total}/{total} | {min}/{total} | ⏳ |
| Effort completado | {total} pts | {min} pts | ⏳ |
| % Avance | 100% | {min}% | ⏳ |
```

### Paso 6: Documentar dependencias

```markdown
## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Sprint N-1 | ✅ Completado | ... |
| Plugin X | ✅ Instalado | ... |
```

### Paso 7: Guardar borrador

Crear `02_backlog-sprintN.md` en la misma carpeta de DISCO.

---

## Tabla de Effort

| Effort | Complejidad | Ejemplos |
|--------|-------------|----------|
| 1 pt | Trivial | Renombrar, mover archivo |
| 2 pts | Simple | Crear doc con plantilla, fix menor |
| 3 pts | Moderado | Feature pequeña, prompt nuevo |
| 5 pts | Complejo | Story completa, integración |
| 8 pts | Muy complejo | Capítulo, plugin nuevo |
| 13 pts | Épico | Sistema completo |

---

## Validaciones

Antes de guardar, verificar:

- [ ] Suma de effort por story = effort declarado
- [ ] Suma de stories por iteración = effort de iteración
- [ ] Suma de iteraciones = effort total del sprint
- [ ] Todas las tasks tienen estado ⏳
- [ ] Todos los IDs son únicos
- [ ] Definition of Done presente en cada story

---

## Salida esperada

Archivo `ARCHIVO/DISCO/{Mes}_{Año}_release/02_backlog-sprintN.md` con:
- Épicas con IDs
- Iteraciones estructuradas
- Stories con tasks desglosadas
- Effort asignado
- Métricas iniciales
- Dependencias documentadas

## Siguiente paso

Usuario revisa borrador → `@scrum aprobar` para publicar.
