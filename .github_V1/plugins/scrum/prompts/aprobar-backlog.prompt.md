# Prompt: Aprobar Épica (Modelo Generativo)

> **Plugin**: Scrum v3.0.0  
> **Comando**: `@scrum aprobar`  
> **Modelo**: DRY (solo cambiar estado) + Gate Ox-Indice + Trazabilidad

---

## Objetivo

Cambiar estado de épica de 📋/🔄 a ✅ en el índice. **NO copiar contenido del borrador al índice.**

**v3.0**: Incluye verificación de trazabilidad si tiene `origen:` de sesión.

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

### Paso 2b: Validación de trazabilidad (v3.0)

Si el borrador tiene metadata `origen:`:

| Check | Pregunta |
|-------|----------|
| Sesión existe | ¿`origen.referencia` apunta a carpeta existente? |
| Actas válidas | ¿`origen.actas` lista actas que existen? |
| Consenso documentado | ¿`origen.consenso` no está vacío? |
| Fecha válida | ¿`origen.fecha_consenso` es fecha válida? |

```
Si origen existe pero falla trazabilidad:
  ⚠️ Trazabilidad rota
  
  - origen.referencia: {ruta} ❌ No existe
  
  Opciones:
  1. Corregir ruta de sesión
  2. Eliminar metadata origen (si no aplica)
  3. Cancelar aprobación
```

### Paso 3: Gate Ox-Indice (opcional pero recomendado)

Para épicas complejas, invocar auditoría:

```
@ox auditoría técnica: {ruta-borrador}
@indice validar coherencia: {ruta-borrador}
```

Si hay gaps críticos → volver a fase de borrador.

### Paso 4: Cambiar estado en el índice

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

### Paso 5: Actualizar changelog del índice

Añadir entrada al changelog del BACKLOG-SCRIPTORIUM.md:

```markdown
| {fecha} | ✅ Aprobar SCRIPT-X.Y.0 | @scrum |
```

### Paso 6: Generar commit

```
chore(script/plan): aprobar épica SCRIPT-X.Y.0

- Cambiar estado 📋 → ✅
- Borrador validado en BACKLOG_BORRADORES/{tema}/
- Trazabilidad verificada: ✅ (si tiene origen)

refs #SCRIPT-X.Y.0
```

### Paso 7: Confirmar

```
✅ Épica SCRIPT-X.Y.0 aprobada

- Estado cambiado a ✅ en índice
- Contenido permanece en: BACKLOG_BORRADORES/{tema}/
- Trazabilidad: ✅ (si tiene origen de sesión)
- NO se copió contenido al índice (modelo DRY)
```

---

## Validaciones adicionales v3.0

### Épicas con origen de sesión

| Validación | Resultado esperado |
|------------|-------------------|
| `origen.tipo` | `sesion-cotrabajo` |
| `origen.referencia` | Carpeta existe en SESIONES_COTRABAJO/ |
| `origen.actas` | Array de strings [T001, T002, ...] |
| `origen.consenso` | String no vacío |
| `origen.fecha_consenso` | Formato YYYY-MM-DD |

### Épicas manuales

Sin validación adicional de trazabilidad.
