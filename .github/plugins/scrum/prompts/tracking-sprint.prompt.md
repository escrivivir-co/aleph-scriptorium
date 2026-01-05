# Prompt: Tracking de Sprint (Modelo Generativo)

> **Plugin**: Scrum v3.0.0  
> **Comando**: `@scrum tracking` o `@scrum status`  
> **Modelo**: Generativo + DRY (actualizar en BORRADOR, incluir sesiones)

---

## Objetivo

Actualizar estado de tasks **EN EL ARCHIVO DE BORRADOR** + mostrar sesiones activas.

**v3.0**: El comando `status` incluye sesiones de cotrabajo en progreso.

---

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

### Modo 4: Status completo (v3.0)

```
@scrum status
```

Incluye: épicas activas + sesiones de cotrabajo.

---

## Instrucciones para @scrum

### Paso 1: Localizar borrador

```
1. Leer índice .github/BACKLOG-SCRIPTORIUM.md
2. Seguir referencia de épica activa (🔄)
3. Abrir 01_backlog-borrador.md en la carpeta
```

### ⚠️ IMPORTANTE

**NO modificar .github/BACKLOG-SCRIPTORIUM.md para tracking.**

El índice solo tiene referencias, no tasks.

### Paso 2: Actualizar estado EN EL BORRADOR

Cambiar el estado en la tabla de tasks del borrador:

| Estado anterior | Estado nuevo | Símbolo |
|-----------------|--------------|---------|
| ⏳ Pendiente | 🔄 En progreso | 🔄 |
| ⏳ Pendiente | ✅ Completada | ✅ |
| 🔄 En progreso | ✅ Completada | ✅ |
| * | ⛔ Bloqueada | ⛔ |

### Paso 3: Recalcular métricas

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

### Paso 4: Generar commit (si significativo)

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

## Status Completo (v3.0)

### Paso 1: Recopilar información

```
1. Leer backlog oficial → épicas activas
2. Leer SESIONES_COTRABAJO/ → sesiones abiertas
3. Calcular métricas reales
```

### Paso 2: Reportar estado

```
Sprint FC1: flavour/monada
═════════════════════════════════════════════════
Épicas activas: {N}

📋 Épicas
├─ ✅ Completadas: {N}/{M} 
├─ 🔄 En progreso: {N}
└─ 📋 Pendientes: {N}

🎭 Sesiones de Cotrabajo (v3.0)
├─ 🔄 Activas: {N}
│   ├─ {nombre-sesion-1}: Turno {X}, desde {fecha}
│   └─ {nombre-sesion-2}: Turno {Y}, desde {fecha}
└─ ⏸️ Pausadas: {N}

📊 Métricas
├─ Effort completado: {X} pts ({Y}%)
├─ Sesiones cerradas como Productiva: {N}
└─ Borradores generados desde sesiones: {N}
```

### Paso 3: Detectar sesiones productivas pendientes

```
⚠️ Sesiones cerradas sin generar borrador:
- {sesion-1}: Cerrada PRODUCTIVA el {fecha}, sin épica
- {sesion-2}: Cerrada PRODUCTIVA el {fecha}, sin épica

¿Generar borradores con @scrum generar-desde-sesion?
```

---

## Sincronización completa

### Paso 1: Leer estado actual

```
1. Leer backlog oficial
2. Extraer todas las tasks del sprint activo
3. Leer todas las sesiones de cotrabajo
4. Calcular métricas reales
```

### Paso 2: Comparar con métricas declaradas

```
Si métricas_calculadas != métricas_declaradas:
    Actualizar métricas_declaradas
    Reportar discrepancia
```

### Paso 3: Verificar trazabilidad de sesiones (v3.0)

```
Para cada sesión cerrada como PRODUCTIVA:
    Si no existe borrador con origen = sesión:
        Reportar "Sesión productiva sin borrador generado"
```

---

## Detección de anomalías

### Scope creep

Si se añaden tasks no planificadas:

```
⚠️ Scope creep detectado

Tasks añadidas desde aprobación:
- T053: Nueva feature (3 pts)

Acciones:
1. Documentar en borrador
2. Ajustar estimaciones
3. Si viene de sesión: actualizar origen
```

### Bloqueos persistentes

```
⚠️ Bloqueo sin resolver > 3 días

Task: T030
Motivo: Falta acceso a API
Desde: {fecha}

Acciones sugeridas:
1. Escalar a PO
2. Buscar alternativa
3. Reasignar
```

### Sesiones estancadas (v3.0)

```
⚠️ Sesión estancada > 24h sin actividad

Sesión: {nombre}
Último turno: {fecha}
Participantes: {lista}

Acciones:
1. Retomar con @{agente}
2. Cerrar como Exploratoria
3. Documentar bloqueo
```

---

## Convenciones de Estado

### Épicas

| Emoji | Significado |
|-------|-------------|
| 📋 | Backlog (planificada, no iniciada) |
| 🔄 | En desarrollo |
| ✅ | Completada |
| ⛔ | Bloqueada |

### Sesiones (v3.0)

| Emoji | Significado |
|-------|-------------|
| 🔄 | En progreso |
| ⏸️ | Pausada |
| ✅ | Cerrada - Exploratoria |
| ✅ | Cerrada - Normativa |
| ✅ | Cerrada - Productiva |

---

## Resumen del Modelo Generativo

| Operación | Qué toca | Modelo |
|-----------|----------|--------|
| Tracking tasks | Solo borrador | DRY |
| Status épicas | Leer índice | DRY |
| Status sesiones | Leer SESIONES_COTRABAJO | v3.0 |
| Detectar productivas pendientes | Cross-reference | v3.0 |
| Verificar trazabilidad | origen.referencia | v3.0 |
