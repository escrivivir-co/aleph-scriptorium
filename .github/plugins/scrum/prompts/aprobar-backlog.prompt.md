# Prompt: Aprobar Épica (DRY)

> **Plugin**: Scrum v2.0  
> **Comando**: `@scrum aprobar`  
> **Modelo**: DRY (solo cambiar estado, NO copiar contenido)

---

## Objetivo

Cambiar estado de épica de 📋/🔄 a ✅ en el índice. **NO copiar contenido del borrador al índice.**

---

## Instrucciones para @scrum

### Paso 1: Validar borrador existe

```
1. Leer referencia desde .github/BACKLOG-SCRIPTORIUM.md
2. Navegar a la carpeta referenciada
3. Verificar que existe 01_backlog-borrador.md
```

### Paso 2: Validación ligera

| Check | Pregunta |
|-------|----------|
| Borrador existe | ¿Hay 01_backlog-borrador.md? |
| Effort definido | ¿Hay estimación de puntos? |
| Tasks listadas | ¿Hay al menos una task? |

**Si falla validación**: Reportar y solicitar corrección.

### Paso 3: Cambiar estado en el índice

**⚠️ SOLO cambiar el emoji de estado en la fila existente**:

```markdown
# Antes
| 📋 | SCRIPT-X.Y.0 | Nombre | [borrador](ruta) |

# Después
| ✅ | SCRIPT-X.Y.0 | Nombre | [borrador](ruta) |
```

### ⚠️ NO HACER

- NO añadir contenido del borrador al índice
- NO crear secciones nuevas extensas
- NO copiar tablas de tasks/stories
- NO duplicar información

### Paso 4: Actualizar changelog del índice

Añadir entrada al changelog del BACKLOG-SCRIPTORIUM.md:

```markdown
| {fecha} | ✅ Aprobar SCRIPT-X.Y.0 | @scrum |
```

### Paso 5: Generar commit

```
chore(script/plan): aprobar épica SCRIPT-X.Y.0

- Cambiar estado 📋 → ✅
- Borrador validado en BACKLOG_BORRADORES/{tema}/

refs #SCRIPT-X.Y.0
```

### Paso 6: Confirmar

```
✅ Épica SCRIPT-X.Y.0 aprobada

- Estado cambiado a ✅ en índice
- Contenido permanece en: BACKLOG_BORRADORES/{tema}/
- NO se copió contenido al índice (modelo DRY)

Siguiente: Continuar trabajo, usar @scrum tracking para actualizar
```

---

## Resumen del Modelo DRY

| Antes (v1.x) | Después (v2.0 DRY) |
|--------------|-------------------|
| Copiar borrador al índice | Solo cambiar emoji |
| Índice crece con cada épica | Índice permanece ligero |
| Duplicación de información | Fuente única en borrador |
