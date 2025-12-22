# Prompt: Tracking de Sprint

> **Plugin**: Scrum  
> **Comando**: `@scrum tracking`  
> **Fase**: 4 (Tracking)

---

## Contexto

Este prompt actualiza el estado de tasks durante la ejecución del sprint.

## Modos de uso

### Modo 1: Actualización individual

```
@scrum tracking T023 completada
```

### Modo 2: Actualización múltiple

```
@scrum tracking T023 T024 T025 completadas
```

### Modo 3: Reportar bloqueo

```
@scrum tracking T030 bloqueada: falta acceso a API
```

### Modo 4: Sincronización completa

```
@scrum tracking sync
```

---

## Instrucciones para @scrum

### Actualización individual/múltiple

#### Paso 1: Identificar backlog

```
1. Extraer ID de task (T{NNN})
2. Buscar en BACKLOG-SCRIPTORIUM.md
3. Si no está, buscar en BACKLOG-FUNDACION.md
```

#### Paso 2: Actualizar estado

Cambiar el estado en la tabla de tasks:

| Estado anterior | Estado nuevo | Símbolo |
|-----------------|--------------|---------|
| ⏳ Pendiente | 🔄 En progreso | 🔄 |
| ⏳ Pendiente | ✅ Completada | ✅ |
| 🔄 En progreso | ✅ Completada | ✅ |
| * | ⛔ Bloqueada | ⛔ |

#### Paso 3: Recalcular métricas

```python
effort_completado = sum(task.effort for task in tasks if task.estado == '✅')
effort_total = sum(task.effort for task in all_tasks)
avance = (effort_completado / effort_total) * 100
```

Actualizar tabla de métricas:

```markdown
| Métrica | Valor |
|---------|-------|
| Tasks totales | {total} |
| Completadas | {completadas} |
| En progreso | {en_progreso} |
| Pendientes | {pendientes} |
| % Avance | {avance}% |
```

#### Paso 4: Generar commit (si significativo)

Criterios para commit:
- ≥5 tasks actualizadas
- Cambio de ≥10% en avance
- Bloqueo reportado

```
chore({scope}/plan): actualizar tracking sprint N

- {lista de tasks actualizadas}
- Avance: {anterior}% → {nuevo}%

refs #{ID-épica}
```

---

### Sincronización completa

#### Paso 1: Leer estado actual

```
1. Leer backlog oficial
2. Extraer todas las tasks del sprint activo
3. Calcular métricas reales
```

#### Paso 2: Comparar con métricas declaradas

```
Si métricas_calculadas != métricas_declaradas:
    Actualizar métricas_declaradas
    Reportar discrepancia
```

#### Paso 3: Reportar estado

```
Sprint 2: Capítulo Uno
═══════════════════════
Iteración actual: I2 (Borrador)

Estado de tasks:
├─ ✅ Completadas: 12/52 (23 pts)
├─ 🔄 En progreso: 4 (8 pts)
├─ ⏳ Pendientes: 35 (64 pts)
└─ ⛔ Bloqueadas: 1 (5 pts)

Avance: 23%
Buffer: 5/30 pts consumidos

Bloqueos activos:
- T030: Falta acceso a API (desde hace 2 días)
```

---

## Detección de anomalías

### Scope creep

Si se añaden tasks no planificadas:

```
⚠️ Scope creep detectado

Tasks añadidas desde aprobación:
- T053: Nueva feature (3 pts)
- T054: Fix urgente (2 pts)

Effort adicional: 5 pts
Buffer restante: 25 pts → 20 pts

¿Aceptar cambio?
```

### Bloqueos prolongados

Si una task lleva ≥3 días bloqueada:

```
⚠️ Bloqueo prolongado

T030: Falta acceso a API
Bloqueada desde: 2025-12-20 (3 días)

Opciones:
1. Escalar a PO
2. Mover a siguiente sprint
3. Cancelar task
```

### Desviación de avance

Si el avance real está ≥20% por debajo del esperado:

```
⚠️ Desviación de avance

Avance esperado (por iteración): 50%
Avance real: 25%
Desviación: -25%

Recomendación: Revisar prioridades o reducir scope
```

---

## Salida esperada

1. Backlog oficial actualizado
2. Métricas recalculadas
3. Reporte de estado al usuario
4. Commit si aplica
5. Alertas de anomalías si detectadas

## Siguiente paso

Continuar desarrollo → `@scrum tracking` cuando haya cambios → `@scrum cerrar` al final.
