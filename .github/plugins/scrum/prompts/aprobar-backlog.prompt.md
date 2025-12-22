# Prompt: Aprobar y Publicar Backlog

> **Plugin**: Scrum  
> **Comando**: `@scrum aprobar`  
> **Fase**: 3 (Aprobar)

---

## Contexto

Este prompt valida un backlog borrador y lo publica en los backlogs oficiales.

## Instrucciones para @scrum

### Paso 1: Localizar borrador

```
1. Identificar carpeta de release activa en DISCO
2. Leer 02_backlog-sprintN.md
```

### Paso 2: Validar estructura

Verificar que el borrador contiene:

| Elemento | Requerido | Validación |
|----------|-----------|------------|
| Épicas | ✅ | IDs únicos, effort asignado |
| Iteraciones | ✅ | Effort suma 100% |
| Stories | ✅ | Cada una con tasks |
| Tasks | ✅ | Estado inicial ⏳ |
| Métricas | ✅ | Target y mínimo definidos |
| Dependencias | ✅ | Estado documentado |
| DoD | ✅ | Por cada story |

**Si falla validación**: Reportar errores y solicitar corrección.

### Paso 3: Identificar destino

| Prefijo de épica | Backlog oficial |
|------------------|-----------------|
| `SCRIPT-*` | `.github/BACKLOG-SCRIPTORIUM.md` |
| `FUND-*` | `PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md` |

**Si hay épicas de ambas Opportunities**: Dividir y publicar en ambos backlogs.

### Paso 4: Integrar en backlog oficial

Para cada backlog afectado:

1. Leer backlog oficial actual
2. Localizar sección de último sprint
3. Añadir nueva sección después:

```markdown
---

## Sprint N: {Nombre}

> **Feature Cycle**: M
> **Modelo**: {descripción}
> **Effort**: {N} pts

[Contenido del borrador adaptado]
```

4. Actualizar métricas globales si existen
5. Añadir entrada al changelog:

```markdown
| {fecha} | Aprobar backlog Sprint N | @scrum |
```

### Paso 5: Generar commit

```
chore({scope}/plan): aprobar backlog sprint N

- Integrar {lista de épicas}
- {N} tasks, {M} pts effort
- Modelo: {descripción}

refs #{ID-épica-principal}
```

**Scope**:
- `script/plan` para BACKLOG-SCRIPTORIUM
- `fund/plan` para BACKLOG-FUNDACION

### Paso 6: Confirmar publicación

Reportar al usuario:

```
✅ Backlog Sprint N publicado

Destinos:
- .github/BACKLOG-SCRIPTORIUM.md (X épicas)
- PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md (Y épicas)

Commit sugerido:
{mensaje de commit}

El sprint está listo para comenzar.
Usa @scrum tracking para actualizar estado de tasks.
```

---

## Transformaciones

### Del borrador al oficial

| En borrador | En oficial |
|-------------|------------|
| Estructura libre | Estructura del backlog oficial |
| Feature Cycle | Sprint + Iteraciones |
| IDs locales | IDs con prefijo de épica |

### Métricas iniciales

Al publicar, las métricas deben mostrar:

```markdown
| Métrica | Valor |
|---------|-------|
| Tasks totales | N |
| Completadas | 0 |
| En progreso | 0 |
| Pendientes | N |
| % Avance | 0% |
```

---

## Validaciones pre-commit

- [ ] Backlog oficial modificado correctamente
- [ ] No se eliminó contenido existente
- [ ] Changelog actualizado
- [ ] IDs no duplicados con sprints anteriores
- [ ] Mensaje de commit sigue DEVOPS.md

---

## Salida esperada

1. Backlog(s) oficial(es) actualizados
2. Mensaje de commit generado
3. Confirmación al usuario

## Siguiente paso

Usuario ejecuta commit → desarrollo comienza → `@scrum tracking` para actualizar.
