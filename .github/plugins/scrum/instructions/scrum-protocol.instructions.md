---
name: Protocolo Scrum DRY
description: Protocolo ligero para gestión de backlogs con índice DRY. Diseñado para mitigar context bloat.
applyTo: ".github/BACKLOG-SCRIPTORIUM.md"
---

# Protocolo Scrum DRY

> **Plugin**: Scrum v2.0.0  
> **Agente**: @scrum  
> **Épica**: SCRIPT-1.29.0 (Context Bloat Mitigation)

---
# Backlog — Aleph Scriptorium

Contexto general:

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 1.2.3-dry  
> **Sprint actual**: FC1  "flavour/monada"
> **Actualizado**: 2026-01-01
> **Rama en ALEPH (esta codebase)**: flavour/monada
> **Rama en submodulos (de esta codebase)**: integration/beta/scriptorium


## 1. Principio Fundamental

> **DRY = Don't Repeat Yourself**
>
> El backlog oficial (`.github/BACKLOG-SCRIPTORIUM.md`) es un **índice de referencias**.  
> NO contiene detalles de épicas. Los detalles viven en:
> - `ARCHIVO/DISCO/BACKLOG_BORRADORES/` → trabajo activo
> - `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` → sprints cerrados

---

## 2. Estructura del Índice

El índice oficial tiene **máximo ~50 líneas** y contiene solo:

```markdown
## Sprint Activo: {nombre}

| Estado | Épica | Nombre | Referencia |
|--------|-------|--------|------------|
| 📋 | ID | Nombre corto | [borrador](ruta) |

## Épicas Pendientes

| Épica | Nombre | Referencia |
|-------|--------|------------|
| ID | Nombre | [borrador](ruta) |

## Histórico

| Sprint | Período | Épicas | Referencia |
|--------|---------|--------|------------|
| Nombre | Fechas | N cerradas | [archivado](ruta) |
```

---

## 3. Reglas de Oro

### ✅ El agente @scrum PUEDE:

| Operación | En índice | En borrador |
|-----------|-----------|-------------|
| Añadir fila de referencia | ✅ | — |
| Eliminar fila de referencia | ✅ | — |
| Cambiar estado (📋→✅) | ✅ | — |
| Escribir contenido detallado | ❌ | ✅ |
| Actualizar tasks/effort | ❌ | ✅ |
| Crear nuevas carpetas | — | ✅ |

### ❌ El agente @scrum NUNCA:

- Copiar contenido de borrador al índice
- Escribir épicas/stories/tasks en el índice
- Duplicar información entre índice y borradores
- Generar secciones extensas en el índice

---

## 4. Ubicaciones Canónicas

| Tipo de contenido | Ubicación | Formato |
|-------------------|-----------|---------|
| Conversaciones PO-SM | `BACKLOG_BORRADORES/{nombre}/conversacion*.md` | Markdown |
| Borradores de épica | `BACKLOG_BORRADORES/{nombre}/01_backlog-borrador.md` | Markdown |
| Índice maestro borradores | `BACKLOG_BORRADORES/INDEX.md` | Tabla |
| Sprints cerrados | `BACKLOG_ARCHIVADOS/{sprint}/` | Carpeta |
| Fotos de estado | `ARCHIVO/FOTOS_ESTADO/` | Markdown |

---

## 5. Flujo de Trabajo DRY

### Fase 1: Planificar

```
1. Crear carpeta en BACKLOG_BORRADORES/{tema}/
2. Generar conversacion-po-sm.md en esa carpeta
3. Añadir fila de referencia al índice con estado 📋
```

### Fase 2: Desarrollar

```
1. Crear 01_backlog-borrador.md en la carpeta
2. Detallar épicas/stories/tasks EN EL BORRADOR
3. Actualizar estado a 🔄 en el índice (solo cambio de emoji)
```

### Fase 3: Aprobar

```
1. Validar borrador completado
2. Cambiar estado a ✅ en el índice
3. NO copiar contenido al índice
```

### Fase 4: Archivar

```
1. Mover carpeta de BACKLOG_BORRADORES/ a BACKLOG_ARCHIVADOS/{sprint}/
2. Actualizar referencia en sección Histórico
3. Eliminar fila de sección activa
```

---

## 6. Formato de Referencias

### Referencia a borrador activo

```markdown
[borrador](../ARCHIVO/DISCO/BACKLOG_BORRADORES/{nombre}/)
```

### Referencia a archivado

```markdown
[archivado](../ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/{sprint}/)
```

### Referencia a índice completo

```markdown
→ Para índice completo: [BACKLOG_BORRADORES/INDEX.md](ruta)
```

---

## 7. Estados en el Índice

| Estado | Emoji | Significado |
|--------|-------|-------------|
| Planificando | 📋 | Conversación PO-SM activa |
| En desarrollo | 🔄 | Borrador con trabajo activo |
| Completada | ✅ | Épica cerrada |
| Bloqueada | ⛔ | Requiere acción externa |

---

## 8. Sincronización con Índices DRY

El backlog debe mantenerse coherente con:

| Índice | Qué refleja | Cuándo actualizar |
|--------|-------------|-------------------|
| `Funcional.md` | Capacidades del sistema | Al cerrar épica de feature |
| `Tecnico.md` | Arquitectura | Al cerrar épica técnica |
| `BACKLOG_BORRADORES/INDEX.md` | Estado detallado | Cada cambio de borrador |

---

## 9. Validación Pre-Commit

Antes de commit, verificar:

| Check | Pregunta |
|-------|----------|
| `dry_violation` | ¿Hay contenido duplicado entre índice y borrador? |
| `orphan_reference` | ¿Todas las referencias apuntan a archivos existentes? |
| `index_size` | ¿El índice tiene menos de 80 líneas? |
| `status_sync` | ¿Estados en índice coinciden con realidad en borradores? |

---

## 10. Comandos del Agente

| Comando | Acción en índice | Acción en borrador |
|---------|------------------|-------------------|
| `planificar` | Añadir fila 📋 | Crear carpeta + conversacion.md |
| `borrador` | — | Crear 01_backlog-borrador.md |
| `aprobar` | Cambiar a ✅ | — |
| `tracking` | — | Actualizar estado tasks |
| `cerrar` | Mover a Histórico | Mover a ARCHIVADOS |
| `status` | Leer índice | Leer borrador activo |

---

## 11. Ejemplo de Índice Correcto

```markdown
# Backlog — Aleph Scriptorium

> **Versión**: 1.1.0-dry

## Sprint Activo: FC3

| Estado | Épica | Nombre | Referencia |
|--------|-------|--------|------------|
| 📋 | SCRIPT-1.29.0 | Context Bloat | [borrador](../ARCHIVO/DISCO/BACKLOG_BORRADORES/...) |

## Histórico

| Sprint | Período | Épicas | Referencia |
|--------|---------|--------|------------|
| FC2 | 2025-12-22 → 28 | 6 | [archivado](../ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/FC2/) |
```

**Total: ~30 líneas** (vs. anterior: 400+ líneas)

---

## 12. Migración desde Protocolo Anterior

Si encuentras un backlog con contenido detallado:

1. Identificar secciones de épicas con tasks
2. Mover cada sección a `BACKLOG_BORRADORES/{nombre}/`
3. Reemplazar sección por fila de referencia
4. Validar que enlaces funcionan

---

## 13. Integración con DevOps

### Commits de índice

```
chore(script/plan): actualizar índice backlog

- Añadir referencia SCRIPT-1.29.0
- Archivar FC2

refs #SCRIPT-1.29.0
```

### Commits de borrador

```
docs(script/plan): crear borrador SCRIPT-1.30.0

- Conversación PO-SM en BACKLOG_BORRADORES/
- Épicas: X, Y, Z

refs #SCRIPT-1.30.0
```

---

