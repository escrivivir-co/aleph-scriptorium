# Prompt: Retrospectiva y Cierre (DRY)

> **Plugin**: Scrum v2.0  
> **Comando**: `@scrum cerrar`  
> **Modelo**: DRY (mover a archivados, actualizar referencias)

---

## Objetivo

Cerrar sprint moviendo borradores a archivados y actualizando referencias en el índice.

---

## Instrucciones para @scrum

### Paso 1: Verificar estado

```
1. Leer índice .github/BACKLOG-SCRIPTORIUM.md
2. Identificar épicas del sprint con estado ✅
3. Leer borradores para calcular métricas
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
└── retrospectiva.md
```

### Paso 3: Generar retrospectiva

Crear `retrospectiva.md` en la carpeta del sprint archivado:

```markdown
# Retrospectiva: {Sprint}

> **Período**: {fecha inicio} → {fecha cierre}
> **Épicas cerradas**: N

## ✅ Qué funcionó
- [Analizar éxitos]

## ❌ Qué no funcionó
- [Analizar problemas]

## 🔧 Qué mejorar
- [Acciones para siguiente sprint]
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

## Estado del Proyecto

[Resumen del estado actual]
```

### Paso 5: Actualizar índice

**⚠️ Solo modificar referencias, no añadir contenido**

1. Eliminar filas del sprint activo
2. Añadir fila en sección Histórico:

```markdown
## Histórico

| Sprint | Período | Épicas | Referencia |
|--------|---------|--------|------------|
| {nombre} | {fechas} | N cerradas | [archivado](../ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/{sprint}/) |
```

3. Actualizar métricas acumuladas si existen

### Paso 6: Actualizar changelog

```markdown
| {fecha} | 🗄️ Archivar {sprint} | @scrum |
```

### Paso 7: Generar commit

```
docs(script/plan): cerrar sprint {nombre}

- Archivar N épicas en BACKLOG_ARCHIVADOS/{sprint}/
- Crear foto de estado
- Actualizar índice con referencia

refs #SCRIPT-X.Y.0, #SCRIPT-X.Z.0
```

### Paso 8: Proponer siguiente sprint

```
✅ Sprint {nombre} cerrado

Archivado en: BACKLOG_ARCHIVADOS/{sprint}/
Foto de estado: FOTOS_ESTADO/{archivo}.md

Épicas pendientes para siguiente sprint:
- {lista de pendientes si las hay}

¿Iniciar planificación con @scrum planificar?
```

---

## Resumen del Modelo DRY

| Operación | En índice | En archivados |
|-----------|-----------|---------------|
| Eliminar épicas activas | ✅ Quitar filas | — |
| Añadir a histórico | ✅ Una fila | — |
| Guardar contenido | ❌ | ✅ Carpeta completa |
| Retrospectiva | ❌ | ✅ Archivo .md |
