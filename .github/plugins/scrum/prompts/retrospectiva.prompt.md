# Prompt: Retrospectiva y Cierre (Modelo Generativo)

> **Plugin**: Scrum v3.0.0  
> **Comando**: `@scrum cerrar [--incluir-sesiones]`  
> **Modelo**: Generativo (sesiones PRODUCEN artefactos)

---

## Objetivo

Cerrar sprint moviendo borradores a archivados y actualizando referencias en el índice.

**Opción v3.0**: `--incluir-sesiones` archiva también las sesiones de cotrabajo relacionadas.

---

## Instrucciones para @scrum

### Paso 1: Verificar estado

```
1. Leer índice .github/BACKLOG-SCRIPTORIUM.md
2. Identificar épicas del sprint con estado ✅
3. Leer borradores para calcular métricas
4. Si --incluir-sesiones: identificar sesiones relacionadas
```

**Si hay épicas no completadas (📋/🔄)**:

```
⚠️ Sprint tiene épicas pendientes

Completadas: N/M épicas
Pendientes: {lista}

Opciones:
1. Cerrar igualmente (mover pendientes a siguiente sprint)
2. Cancelar cierre

¿Qué deseas hacer?
```

### Paso 2: Crear carpeta en ARCHIVADOS

```
ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/{sprint}/
├── README.md
├── {épica-1}/     # Mover desde BORRADORES
├── {épica-2}/     # Mover desde BORRADORES
├── sesiones/      # Si --incluir-sesiones
│   └── {sesión}/  # Mover desde SESIONES_COTRABAJO
└── retrospectiva.md
```

### Paso 3: Generar retrospectiva

Crear `retrospectiva.md` en la carpeta del sprint archivado:

```markdown
# Retrospectiva: {Sprint}

> **Período**: {fecha inicio} → {fecha cierre}
> **Épicas cerradas**: N
> **Sesiones de cotrabajo**: M

## 📊 Métricas del Sprint

| Métrica | Valor |
|---------|-------|
| Épicas cerradas | N |
| Effort completado | X pts |
| Sesiones cotrabajo | M |
| Turnos totales | T |

## ✅ Qué funcionó

- [Analizar éxitos]
- [Mencionar sesiones productivas]

## ❌ Qué no funcionó

- [Analizar problemas]
- [Mencionar bloqueos]

## 🔧 Qué mejorar

- [Acciones para siguiente sprint]

## 📋 Épicas cerradas

| Épica | Nombre | Effort | Origen |
|-------|--------|--------|--------|
| ID | Nombre | N pts | [sesión] o manual |

## 🎭 Sesiones cerradas (si aplica)

| Sesión | Tipo | Turnos | Produjo |
|--------|------|--------|---------|
| nombre | Productiva | N | Épica X |
```

### Paso 4: Crear foto de estado

Generar `ARCHIVO/FOTOS_ESTADO/{fecha}_{sprint}.md`:

```markdown
# Foto de Estado: {Sprint}

> **Fecha**: {YYYY-MM-DD}

## Métricas

| Métrica | Valor |
|---------|-------|
| Épicas cerradas | N |
| Effort completado | X pts |
| Sesiones cerradas | M |

## Estado del Proyecto

[Resumen del estado actual]

## Modelo Generativo

- Sesiones que produjeron épicas: {lista}
- Trazabilidad verificada: ✅/❌
```

### Paso 5: Actualizar índice

**⚠️ Solo modificar referencias, no añadir contenido**

1. Eliminar filas del sprint activo
2. Eliminar filas de sesiones de cotrabajo (si --incluir-sesiones)
3. Añadir fila en sección Histórico:

```markdown
## Histórico

| Sprint | Período | Épicas | Referencia |
|--------|---------|--------|------------|
| {nombre} | {fechas} | N cerradas | [archivado](../ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/{sprint}/) |
```

4. Actualizar métricas acumuladas si existen

### Paso 6: Actualizar changelog

```markdown
| {fecha} | 🗄️ Archivar {sprint} (+ N sesiones) | @scrum |
```

### Paso 7: Generar commit

```
docs(script/plan): cerrar sprint {nombre}

- Archivar N épicas en BACKLOG_ARCHIVADOS/{sprint}/
- Archivar M sesiones de cotrabajo (si aplica)
- Crear foto de estado
- Actualizar índice con referencias

refs #SCRIPT-X.Y.0, #SCRIPT-X.Z.0
```

### Paso 8: Proponer siguiente sprint

```
✅ Sprint {nombre} cerrado

Archivado en: BACKLOG_ARCHIVADOS/{sprint}/
Foto de estado: FOTOS_ESTADO/{archivo}.md
Sesiones incluidas: M (si aplica)

Épicas pendientes para siguiente sprint:
- {lista de pendientes si las hay}

¿Iniciar planificación con @scrum planificar?
```

---

## Opción: --incluir-sesiones

### Comportamiento

Cuando se usa `--incluir-sesiones`:

1. **Detectar sesiones relacionadas**: Buscar sesiones cuyo campo `origen:` apunte a épicas del sprint
2. **Mover a archivados**: `BACKLOG_ARCHIVADOS/{sprint}/sesiones/`
3. **Actualizar índice de sesiones**: Eliminar de la tabla activa
4. **Documentar en retrospectiva**: Incluir métricas de sesiones

### Cuándo usar

| Situación | Recomendación |
|-----------|---------------|
| Sprint normal | Sin opción |
| Sprint con mucho cotrabajo | `--incluir-sesiones` |
| Sesiones exploratorias | Sin opción (quedan para referencia) |

---

## Resumen del Modelo Generativo

| Operación | En índice | En archivados |
|-----------|-----------|---------------|
| Eliminar épicas activas | ✅ Quitar filas | — |
| Eliminar sesiones (si aplica) | ✅ Quitar filas | — |
| Añadir a histórico | ✅ Una fila | — |
| Guardar contenido | ❌ | ✅ Carpeta completa |
| Retrospectiva | ❌ | ✅ Archivo .md |
| Sesiones relacionadas | ❌ | ✅ Subcarpeta |
