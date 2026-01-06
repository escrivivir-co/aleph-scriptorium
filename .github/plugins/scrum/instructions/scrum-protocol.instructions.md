---
name: Protocolo Scrum — Modelo Generativo
description: Protocolo DRY + Modelo Generativo. Sesiones de cotrabajo PRODUCEN artefactos Scrum.
applyTo: ".github/BACKLOG-SCRIPTORIUM.md"
---

# Protocolo Scrum v3.0 — Modelo Generativo

> **Plugin**: Scrum v3.0.0  
> **Agente**: @scrum (interpreta a Lucas)  
> **Épica**: SCRUM-REFACTOR-1.0.0

---

## 1. Modelo Conceptual

### Relación Sesión → Borrador

```
┌─────────────────────────┐
│   SESIÓN COTRABAJO      │
│   (SESIONES_COTRABAJO/) │
│                         │
│   • Estado: CERRADA     │
│   • Tipo: PRODUCTIVA    │
│   • Actas: T001..TN     │
└───────────┬─────────────┘
            │
            │ PRODUCE (no TRANSFORMA)
            │
            ▼
┌─────────────────────────┐
│   BORRADOR ÉPICA        │
│   (BACKLOG_BORRADORES/) │
│                         │
│   • origen: {sesión}    │
│   • Epic/Stories/Tasks  │
│   • Definition of Done  │
└─────────────────────────┘
```

**Principio clave**: La sesión **permanece intacta**. El borrador **referencia** a la sesión.

### Tipos de Cierre de Sesión

| Tipo | Produce | Acción @scrum |
|------|---------|---------------|
| **Exploratoria** | Nada tangible | Registrar en histórico de sesiones |
| **Normativa** | Decisiones/reglas | Documentar en `.github/instructions/` |
| **Productiva** | Borrador de épica | `generar-desde-sesion` |

---

## 2. Principio DRY

> **DRY = Don't Repeat Yourself**
>
> El backlog oficial (`.github/BACKLOG-SCRIPTORIUM.md`) es un **índice de referencias**.  
> NO contiene detalles de épicas.

### Ubicaciones Canónicas

| Tipo | Ubicación | Contenido |
|------|-----------|-----------|
| Índice oficial | `.github/BACKLOG-SCRIPTORIUM.md` | ~50 líneas, solo referencias |
| Borradores | `ARCHIVO/DISCO/BACKLOG_BORRADORES/` | Épicas detalladas activas |
| Archivados | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` | Sprints cerrados |
| Sesiones | `ARCHIVO/DISCO/SESIONES_COTRABAJO/` | Trabajo multi-agente |

### Estructura del Índice

```markdown
## Sprint Activo: {nombre}

| Estado | Épica | Nombre | Referencia |
|--------|-------|--------|------------|
| 📋 | ID | Nombre corto | [borrador](ruta) |

## Sesiones de Cotrabajo

| Estado | Sesión | Épica | Resultado | Referencia |
|--------|--------|-------|-----------|------------|
| ✅ | nombre | ID | Resumen | [sesión](ruta) |

## Histórico

| Sprint | Período | Épicas | Referencia |
|--------|---------|--------|------------|
| Nombre | Fechas | N cerradas | [archivado](ruta) |
```

---

## 3. Reglas de Oro

### ✅ El agente @scrum PUEDE:

| Operación | En índice | En borrador | En sesión |
|-----------|-----------|-------------|-----------|
| Añadir fila de referencia | ✅ | — | — |
| Eliminar fila de referencia | ✅ | — | — |
| Cambiar estado (📋→✅) | ✅ | — | — |
| Escribir contenido detallado | ❌ | ✅ | ❌ |
| Actualizar tasks/effort | ❌ | ✅ | ❌ |
| Crear nuevas carpetas | — | ✅ | ❌ |
| Extraer decisiones | — | ✅ | Solo lectura |

### ❌ El agente @scrum NUNCA:

- Copiar contenido de borrador al índice
- Copiar actas completas al borrador
- Sintetizar/resumir actas automáticamente
- Modificar sesiones cerradas
- Duplicar información entre ubicaciones

---

## 4. Flujo de Trabajo

### Fase 1: Planificar

**Input**: Idea/necesidad del PO  
**Output**: Carpeta en BACKLOG_BORRADORES + referencia en índice

```
1. Crear carpeta en BACKLOG_BORRADORES/{tema}/
2. Generar conversacion-po-sm.md (opcional)
3. Añadir fila de referencia al índice con estado 📋
```

### Fase 1b: Cotrabajo (Alternativa)

**Input**: Tema complejo que requiere múltiples agentes  
**Output**: Sesión de cotrabajo en SESIONES_COTRABAJO

```
1. Crear sesión según protocolo cotrabajo
2. Ejecutar turnos hasta consenso
3. Cerrar sesión como PRODUCTIVA
4. → Ir a Fase 1c
```

### Fase 1c: Generar desde Sesión

**Input**: Sesión cerrada como PRODUCTIVA  
**Output**: Borrador con metadata `origen:`

```
1. @scrum generar-desde-sesion {ruta-sesion}
2. Extraer decisiones de actas
3. Generar borrador con origen: {sesión}
4. Añadir referencia al índice
```

### Fase 2: Desarrollar

**Input**: Borrador inicial  
**Output**: Borrador detallado con Stories/Tasks

```
1. Crear 01_backlog-borrador.md en la carpeta
2. Detallar épicas/stories/tasks EN EL BORRADOR
3. Actualizar estado a 🔄 en el índice (solo cambio de emoji)
```

### Fase 2.5: Auditoría (Gate Ox-Indice)

**Input**: Borrador "completo"  
**Output**: Aprobación técnica/estructural

```
1. @ox auditoría técnica:
   - Verificar componentes referenciados existen
   - Identificar gaps plan vs código
   
2. @indice auditoría estructural:
   - Verificar rutas válidas
   - Verificar coherencia DRY

3. Si gaps críticos → volver a Fase 2
4. Si OK → Fase 3
```

### Fase 3: Aprobar

**Input**: Borrador auditado  
**Output**: Estado ✅ en índice

```
1. Verificar auditoría OK
2. Cambiar estado a ✅ en el índice
3. NO copiar contenido al índice
```

### Fase 4: Archivar

**Input**: Sprint completado  
**Output**: Carpetas movidas a archivados

```
1. Mover carpeta de BACKLOG_BORRADORES/ a BACKLOG_ARCHIVADOS/{sprint}/
2. Actualizar referencia en sección Histórico
3. Eliminar fila de sección activa
4. Opcionalmente: mover sesiones relacionadas
```

---

## 5. Metadata `origen:`

Cuando un borrador proviene de una sesión de cotrabajo, debe incluir:

```yaml
origen:
  tipo: sesion-cotrabajo
  referencia: SESIONES_COTRABAJO/{nombre}/
  actas: [T001, T002, ...]
  consenso: "{resumen de decisiones}"
  fecha_consenso: {YYYY-MM-DD}
```

### Propósito

| Campo | Uso |
|-------|-----|
| `tipo` | Identificar fuente del borrador |
| `referencia` | Link directo a sesión |
| `actas` | Trazabilidad de decisiones |
| `consenso` | Resumen ejecutivo |
| `fecha_consenso` | Cuándo se cerró |

### Verificación Gate

El Gate Ox-Indice puede verificar:
```
1. Si origen.referencia existe → sesión válida
2. Si origen.actas existen → trazabilidad OK
3. Si origen.consenso no vacío → decisiones documentadas
```

---

## 6. Comandos del Agente

| Comando | Acción | En índice | En borrador |
|---------|--------|-----------|-------------|
| `planificar` | Crear carpeta + referencia | ✅ Añadir fila | ✅ Crear carpeta |
| `borrador` | Generar backlog detallado | ❌ | ✅ |
| `generar-desde-sesion` | Producir desde cotrabajo | ✅ Añadir fila | ✅ + origen |
| `aprobar` | Cambiar estado | ✅ Cambiar emoji | ❌ |
| `tracking` | Actualizar tasks | ❌ | ✅ |
| `cerrar` | Archivar sprint | ✅ Mover a histórico | ✅ Mover carpeta |
| `status` | Mostrar métricas | ✅ Leer | ✅ Leer + sesiones |

### Extensiones v3.0

| Comando | Opción | Descripción |
|---------|--------|-------------|
| `cerrar` | `--incluir-sesiones` | Archivar sesiones relacionadas |
| `status` | (default) | Incluye sesiones activas |

---

## 7. Integración con Lucas

El agente @scrum "interpreta" a Lucas para expertise avanzada:

```yaml
interpreta:
  personaje: lucas
  fuente: ARCHIVO/DISCO/TALLER/ELENCO/lucas/
  cargar:
    - lucas.agent.md        # Siempre
    - lucas-prolog.brain.pl # Bajo demanda
    - templates-index.json  # Bajo demanda
```

### Cuándo Cargar Lucas

| Situación | Cargar |
|-----------|--------|
| Comandos básicos | Solo identidad |
| Razonamiento complejo | + brain Prolog |
| Plantillas Scrum | + templates-index.json |

### Queries Prolog Útiles

```prolog
?- tarea_pendiente(Epic, Task, Estado).
?- documentacion_coherente(X).
?- reporte_salud(R).
```

---

## 8. Anti-patrones

| Código | Nombre | Señal | Corrección |
|--------|--------|-------|------------|
| AP-SCRUM-01 | Índice inflado | >50 líneas | Mover contenido a borrador |
| AP-SCRUM-02 | Duplicación | Mismo contenido en 2+ lugares | Usar referencias |
| AP-SCRUM-03 | Sesión absorbida | Borrador = copia de actas | Modelo Generativo |
| AP-SCRUM-04 | Expertise duplicada | @scrum tiene conocimiento propio | Interpretar Lucas |
| AP-SCRUM-05 | Sin trazabilidad | Borrador sin origen | Añadir metadata |

---

## 9. Asambleas Deliberativas

Cuando una épica requiere decisiones significativas:

### Cuándo Convocar

- Bloqueo preventivo activado
- Gap analysis con hallazgos críticos
- Cambio de scope significativo
- Decisiones arquitectónicas mayores

### Formato de Sesión

```markdown
# Sesión: {Tema}

## Participantes
{Lista de agentes}

## Rondas
1. ¿Qué ocurrió? (diagnóstico)
2. ¿Qué aprendimos? (propuestas)
3. ¿Qué decidimos? (consenso)
4. ¿Qué producimos? (artefactos)

## Tipo de Cierre
{Exploratoria | Normativa | Productiva}
```

---

## 10. Checklist de Validación

### Borrador válido

- [ ] Tiene Epic ID único
- [ ] Está en BACKLOG_BORRADORES/
- [ ] Tiene referencia en índice
- [ ] Si viene de sesión: tiene metadata `origen:`
- [ ] Stories tienen effort estimado
- [ ] Tasks tienen descripción clara
- [ ] Definition of Done definido

### Sesión válida para generar

- [ ] Estado = CERRADA — PRODUCTIVA
- [ ] Tiene 00_SESION.md
- [ ] Tiene al menos 1 acta
- [ ] Actas tienen "Decisiones Tomadas"

### Índice válido

- [ ] ≤50 líneas
- [ ] Solo referencias, no contenido
- [ ] Estados correctos (📋, 🔄, ✅)
- [ ] Links funcionan

---

**Versión**: 3.0.0  
**Épica origen**: SCRUM-REFACTOR-1.0.0  
**Sesión origen**: 2026-01-05_consenso-agile-scriptorium
