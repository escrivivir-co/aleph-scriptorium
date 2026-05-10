# Prompt: Generar Borrador desde Sesión de Cotrabajo

> **Plugin**: Scrum v3.0  
> **Comando**: `@scrum generar-desde-sesion`  
> **Modelo**: Generativo (sesión PRODUCE borrador)

---

## Objetivo

Generar un borrador de épica desde una sesión de cotrabajo **cerrada como PRODUCTIVA**.

---

## Prerequisitos

- Sesión debe tener `estado: CERRADA — PRODUCTIVA` en `00_SESION.md`
- Sesión debe tener al menos 1 acta en `02_ACTAS/`
- Debe haber sección "Decisiones Tomadas" en alguna acta

---

## Instrucciones para @scrum

### Paso 1: Validar sesión

```
1. Leer SESIONES_COTRABAJO/{nombre}/00_SESION.md
2. Verificar estado = "CERRADA — PRODUCTIVA"
3. Si estado incorrecto → ABORT con mensaje
```

**Mensaje de error**:
```
⚠️ Sesión no válida para generar borrador

Estado actual: {estado}
Requerido: CERRADA — PRODUCTIVA

Opciones:
1. Cerrar sesión primero (actualizar 00_SESION.md)
2. Cambiar tipo de cierre a PRODUCTIVA
```

### Paso 2: Leer tablero y actas

```
1. Leer 01_TABLERO.md → Identificar turnos completados
2. Para cada acta en 02_ACTAS/:
   - Buscar sección "## Decisiones Tomadas"
   - Extraer items de decisión
   - Buscar Epic ID propuesta (si existe)
```

### Paso 3: Determinar Epic ID

Si la sesión propone un Epic ID:
```
- Usar el ID propuesto
```

Si no hay ID propuesto:
```
1. Leer .github/BACKLOG-SCRIPTORIUM.md
2. Identificar último ID del patrón relevante
3. Generar siguiente: SCRIPT-X.Y.0 o EPIC-{tema}-1.0.0
```

### Paso 4: Crear carpeta de borrador

```
ARCHIVO/DISCO/BACKLOG_BORRADORES/{EPIC_ID}/
```

Convención:
- Usar Epic ID como nombre de carpeta
- Ejemplo: `SCRUM_REFACTOR/`, `TYPED_PROMPTING/`

### Paso 5: Generar borrador con metadata origen

Crear `01_backlog-borrador.md`:

```markdown
# Epic: {EPIC_ID}

## Metadata

```yaml
epic_id: {EPIC_ID}
nombre: "{nombre extraído de sesión}"
estado: 📋 Ready
origen:
  tipo: sesion-cotrabajo
  referencia: SESIONES_COTRABAJO/{nombre}/
  actas: [T001, T002, ...]
  consenso: "{resumen de decisiones}"
  fecha_consenso: {fecha}
```

---

## Contexto

{Extraer de 00_SESION.md: Objetivo}

---

## Decisiones Consensuadas

{Lista de decisiones extraídas de actas}

---

## Stories

| ID | Nombre | Effort | Estado |
|----|--------|--------|--------|
| S1 | {extraído de actas} | ? pts | ⏳ |

## Tasks

### S1: {Nombre}

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T1.1 | {extraído de actas} | ? | ⏳ |

---

## Definition of Done

- [ ] {extraído de actas o genérico}

---

**Generado desde**: [sesión]({ruta relativa})
```

### Paso 6: Añadir referencia al índice

Añadir fila a `.github/BACKLOG-SCRIPTORIUM.md`:

```markdown
| 📋 | {EPIC_ID} | {Nombre corto} | [borrador](../ARCHIVO/DISCO/BACKLOG_BORRADORES/{carpeta}/) |
```

### Paso 7: Confirmar

```
✅ Borrador generado desde sesión de cotrabajo

- Sesión: {nombre}
- Epic: {EPIC_ID}
- Borrador: BACKLOG_BORRADORES/{carpeta}/
- Referencia añadida al índice

Modelo Generativo aplicado:
- La sesión permanece intacta ✅
- El borrador referencia a la sesión ✅
- Relación: sesión PRODUCE borrador ✅

Siguiente: @scrum aprobar cuando esté listo
```

---

## ⚠️ Reglas del Modelo Generativo

### ✅ SÍ hacer

- Extraer decisiones consensuadas
- Referenciar sesión en metadata `origen:`
- Mantener sesión original intacta
- Generar estructura Epic/Stories/Tasks

### ❌ NO hacer

- Copiar contenido completo de actas
- Sintetizar/resumir actas automáticamente
- Modificar archivos de la sesión
- Absorber la sesión en el borrador

---

## Ejemplo de Metadata Origen

```yaml
origen:
  tipo: sesion-cotrabajo
  referencia: SESIONES_COTRABAJO/2026-01-05_consenso-agile-scriptorium/
  actas: [T001, T002, T003, T004]
  consenso: "Modelo Generativo + Lucas DRY"
  fecha_consenso: 2026-01-05
```

Esta metadata permite:
1. Trazabilidad: ¿De dónde vino esta épica?
2. Navegación: Link directo a la sesión
3. Auditoría: Verificar que el consenso existe

---

## Casos Especiales

### Sesión sin Epic ID propuesto

Generar ID basado en tema:
```
{TEMA}-1.0.0

Ejemplo: CONTEXT-BLOAT-1.0.0, PROLOG-UI-1.0.0
```

### Sesión con múltiples épicas

Una sesión puede producir múltiples borradores:
```
@scrum generar-desde-sesion {ruta} --epic EPIC-1
@scrum generar-desde-sesion {ruta} --epic EPIC-2
```

Cada borrador referencia la misma sesión.

### Sesión exploratoria cerrada por error

Si la sesión fue cerrada como PRODUCTIVA pero no tiene decisiones:
```
⚠️ Sesión sin decisiones documentadas

No se encontró sección "Decisiones Tomadas" en las actas.

Opciones:
1. Añadir decisiones a las actas
2. Cambiar tipo de cierre a EXPLORATORIA
3. Generar borrador vacío (solo estructura)
```

---

**Épica origen**: SCRUM-REFACTOR-1.0.0
