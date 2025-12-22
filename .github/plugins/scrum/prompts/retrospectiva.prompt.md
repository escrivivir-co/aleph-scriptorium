# Prompt: Retrospectiva y Cierre

> **Plugin**: Scrum  
> **Comando**: `@scrum cerrar`  
> **Fase**: 5 (Cerrar)

---

## Contexto

Este prompt genera la retrospectiva, foto de estado y prepara el siguiente sprint.

## Instrucciones para @scrum

### Paso 1: Verificar estado del sprint

```
1. Leer backlog oficial del sprint activo
2. Calcular métricas finales
3. Identificar tasks no completadas
```

**Si hay tasks pendientes**:

```
⚠️ Sprint N tiene tasks pendientes

Completadas: 45/52 (87%)
Pendientes: 7 tasks (15 pts)

Opciones:
1. Cerrar igualmente (mover pendientes a Sprint N+1)
2. Extender sprint (no recomendado)
3. Cancelar cierre

¿Qué deseas hacer?
```

### Paso 2: Generar retrospectiva

Crear sección de retrospectiva basada en:
- Métricas finales vs. targets
- Tasks bloqueadas durante el sprint
- Buffer consumido
- Entregables producidos

```markdown
## Retrospectiva

### ✅ Qué funcionó
- [Analizar métricas positivas]
- [Entregables completados]
- [Procesos que fluyeron bien]

### ❌ Qué no funcionó
- [Tasks bloqueadas y por qué]
- [Métricas por debajo del target]
- [Fricciones detectadas]

### 🔧 Qué mejorar
- [Acciones concretas para Sprint N+1]
- [Cambios de proceso]
- [Herramientas a añadir/mejorar]
```

### Paso 3: Crear foto de estado

Generar `ARCHIVO/FOTOS_ESTADO/{fecha}_Sprint{N}_{Nombre}.md`:

```markdown
# Foto de Estado: Sprint N — {Nombre}

> **Fecha**: {fecha actual}
> **Sprint**: N
> **Duración**: {fecha inicio} → {fecha cierre}

---

## Métricas Finales

| Métrica | Target | Real | Status |
|---------|--------|------|--------|
| Tasks completadas | N/N | M/N | {emoji} |
| Effort completado | X pts | Y pts | {emoji} |
| % Avance | 100% | Z% | {emoji} |
| Buffer consumido | ≤30 pts | W pts | {emoji} |
| Bloqueos resueltos | 0 | K | {emoji} |

### Interpretación
- {Análisis de las métricas}

---

## Entregables

| Entregable | Estado | Ubicación |
|------------|--------|-----------|
| ... | ✅/⚠️/❌ | [link] |

---

## Retrospectiva

[Copiar de paso 2]

---

## Estado del Proyecto

### Scriptorium
- Versión: {versión}
- Plugins instalados: {N}
- Agentes operativos: {M}

### Fundación
- Capítulos completados: {X}/12
- Marco conceptual: {Y} documentos

### Web (GH-Pages)
- Páginas publicadas: {Z}
- Obras en cartelera: {W}

---

## Próximo Sprint

**Propuesta**: Sprint N+1 — {Nombre sugerido}
**Objetivo candidato**: {descripción}
**Épicas candidatas**: {lista}

---

*Foto generada automáticamente por @scrum*
```

### Paso 4: Archivar borrador

Mover contenido de DISCO a archivo si es necesario, o marcar como cerrado:

```markdown
<!-- SPRINT CERRADO: {fecha} -->
```

### Paso 5: Actualizar backlogs oficiales

Marcar sprint como cerrado en el backlog oficial:

```markdown
## Sprint N: {Nombre} — ✅ CERRADO

**Fecha cierre**: {fecha}
**Métricas finales**: {resumen}

[Ver foto de estado](../ARCHIVO/FOTOS_ESTADO/{archivo}.md)
```

### Paso 6: Calcular velocity

```python
velocity_sprint = effort_completado / num_iteraciones
velocity_historico = promedio(velocity_sprints_anteriores)
velocity_nuevo = (velocity_historico * num_sprints + velocity_sprint) / (num_sprints + 1)
```

Reportar:
```
Velocity del Sprint N: {X} pts/iteración
Velocity histórico actualizado: {Y} pts/iteración
```

### Paso 7: Generar commit

```
docs({scope}/plan): cerrar sprint N

- Métricas: {completadas}/{total} tasks ({avance}%)
- Foto de estado: {archivo}
- Velocity: {X} pts/iteración

refs #{ID-épica}
```

### Paso 8: Proponer siguiente sprint

```
Sprint N cerrado exitosamente.

Propuesta para Sprint N+1:
─────────────────────────
Nombre sugerido: {nombre}
Objetivo: {descripción}

Épicas candidatas:
1. {épica 1} ({reason})
2. {épica 2} ({reason})

Tasks pendientes de Sprint N:
- T048, T049, T050 (mover a Sprint N+1)

Buffer de mejoras acumulado:
- {lista de mejoras no abordadas}

¿Iniciar planificación con @scrum planificar?
```

---

## Criterios de cierre exitoso

| Criterio | Mínimo para éxito |
|----------|-------------------|
| % Avance | ≥80% |
| Entregables principales | 100% |
| Bloqueos activos | 0 |
| Buffer | ≤100% consumido |

---

## Salida esperada

1. Retrospectiva generada
2. Foto de estado en `ARCHIVO/FOTOS_ESTADO/`
3. Backlog oficial marcado como cerrado
4. Velocity actualizado
5. Commit generado
6. Propuesta de Sprint N+1

## Siguiente paso

Usuario decide → `@scrum planificar` para Sprint N+1.
