# Prompt: Crear Backlog Borrador (Modelo Generativo)

> **Plugin**: Scrum v3.0.0  
> **Comando**: `@scrum borrador`  
> **Modelo**: Generativo + DRY (contenido en DISCO, referencia en índice)

---

## Objetivo

Crear borrador detallado **EN LA CARPETA DEL BORRADOR**, nunca en el índice oficial.

**Modelo Generativo v3.0**: Si el borrador tiene `origen:` de sesión, verificar trazabilidad.

---

## Instrucciones para @scrum

### Paso 1: Localizar carpeta

```
1. Leer referencia desde .github/BACKLOG-SCRIPTORIUM.md
2. Navegar a BACKLOG_BORRADORES/{tema}/
3. Si existe conversacion-po-sm.md → leer para contexto
4. Si existe origen.md → leer para contexto de sesión
```

### Paso 2: Verificar origen (v3.0)

Si el borrador proviene de una sesión de cotrabajo:

```yaml
# Verificar que existe este bloque en la carpeta
origen:
  tipo: sesion-cotrabajo
  referencia: SESIONES_COTRABAJO/{nombre}/
  actas: [T001, T002, ...]
  consenso: "{resumen de decisiones}"
  fecha_consenso: {YYYY-MM-DD}
```

**Si falta origen pero hay sesión relacionada**:

```
⚠️ Detectada sesión posiblemente relacionada: {nombre}

¿Este borrador debería tener origen: sesion-cotrabajo?
1. Sí → Añadir metadata origen
2. No → Continuar sin origen
```

### Paso 3: Crear archivo de borrador

Generar `01_backlog-borrador.md` **EN LA CARPETA DEL BORRADOR**:

```markdown
# Backlog: {Nombre de Épica}

> **Épica**: SCRIPT-X.Y.0
> **Effort total**: N pts
> **Estado**: 📋 Borrador

## Origen (si aplica)

<!-- Si viene de sesión -->
| Campo | Valor |
|-------|-------|
| Tipo | sesion-cotrabajo |
| Sesión | [{nombre}](../SESIONES_COTRABAJO/{nombre}/) |
| Consenso | {resumen} |
| Fecha | {YYYY-MM-DD} |

## Stories

| ID | Nombre | Effort | Estado |
|----|--------|--------|--------|
| S01 | ... | N pts | ⏳ |

## Tasks

### S01: {Nombre}

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T001 | ... | N | ⏳ |
```

### Paso 4: Estructurar por iteraciones

Para sprints grandes, dividir en iteraciones:

```markdown
## Feature Cycle N: Estructura

| Iteración | Nombre | Objetivo | Effort |
|-----------|--------|----------|--------|
| FC1-I1 | ... | ... | N% |
| FC1-I2 | ... | ... | M% |
```

**Regla**: El effort total de iteraciones = 100%

### Paso 5: Desglosar stories y tasks

Para cada story:

```markdown
### {ÉPICA}-S{NN}: {Nombre}

**Effort**: {N} pts
**Origen**: {Decisión de acta TNN | Manual}

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | ... | N | ⏳ |
| T002 | ... | M | ⏳ |

**Definition of Done**: {criterio de aceptación}
```

### Paso 6: Calcular métricas

```markdown
## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | {total}/{total} | {min}/{total} | ⏳ |
| Effort completado | {total} pts | {min} pts | ⏳ |
| % Avance | 100% | {min}% | ⏳ |
| Trazabilidad origen | ✅ | ✅ | ⏳ |
```

### Paso 7: Documentar dependencias

```markdown
## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Sesión {nombre} | ✅ Cerrada | Origen de esta épica |
| Sprint N-1 | ✅ Completado | ... |
```

### Paso 8: Actualizar INDEX.md

Actualizar `BACKLOG_BORRADORES/INDEX.md` con el nuevo borrador.

### Paso 9: Actualizar estado en índice oficial

**Solo cambiar emoji en la fila existente**:

```markdown
| 🔄 | SCRIPT-X.Y.0 | {Nombre} | [borrador](ruta) |
```

(Cambiar 📋 → 🔄)

---

## ⚠️ NO HACER

- ❌ Copiar contenido del borrador al índice oficial
- ❌ Añadir tablas de tasks al BACKLOG-SCRIPTORIUM.md
- ❌ Duplicar información entre ubicaciones
- ❌ Copiar actas completas de la sesión
- ❌ Sintetizar actas automáticamente sin referencia

---

## Tabla de Effort

| Effort | Complejidad | Ejemplos |
|--------|-------------|----------|
| 1 pt | Trivial | Renombrar, mover archivo |
| 2 pts | Simple | Crear doc con plantilla, fix menor |
| 3 pts | Moderado | Feature pequeña, prompt nuevo |
| 5 pts | Complejo | Story completa, integración |
| 8 pts | Muy complejo | Capítulo, plugin nuevo |
| 13 pts | Épico | Sistema completo |

---

## Validaciones

### Borrador válido

- [ ] Tiene Epic ID único
- [ ] Está en BACKLOG_BORRADORES/
- [ ] Tiene referencia en índice
- [ ] **Si viene de sesión**: tiene metadata `origen:` ✅
- [ ] **Si tiene origen**: sesión referenciada existe ✅
- [ ] Stories tienen effort estimado
- [ ] Tasks tienen descripción clara
- [ ] Definition of Done presente en cada story

### Trazabilidad (v3.0)

- [ ] Si origen.tipo = sesion-cotrabajo:
  - [ ] origen.referencia apunta a carpeta existente
  - [ ] origen.actas lista actas válidas
  - [ ] origen.consenso no está vacío
  - [ ] origen.fecha_consenso es fecha válida

---

## Convención de IDs

| Opportunity | Formato | Ejemplo |
|-------------|---------|---------|
| Scriptorium | `SCRIPT-{MAJOR}.{MINOR}.{PATCH}` | SCRIPT-3.1.0 |
| Fundación | `FUND-{MAJOR}.{MINOR}.{PATCH}` | FUND-1.2.0 |

---

## Salida esperada

Archivo `ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/01_backlog-borrador.md` con:

- Epic ID único
- Stories con tasks desglosadas
- Effort asignado
- Definition of Done
- Metadata `origen:` (si aplica)
- Link a sesión de cotrabajo (si aplica)

---

## Siguiente paso

- Si borrador manual → `@scrum aprobar` para Gate Ox-Indice
- Si borrador de sesión → Verificar trazabilidad → `@scrum aprobar`
