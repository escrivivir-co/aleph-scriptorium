# Acta T001: Presentación del Problema y Propuesta Inicial

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 001 |
| **Agente** | @aleph |
| **Inicio** | 2026-01-05 16:00 |
| **Fin** | 2026-01-05 16:30 |
| **Estado final** | ✅ DONE |

## Contexto Leído

- **00_SESION.md** — Objetivo, participantes, restricciones
- **03_REFERENCIAS/fuentes.md** — Extractos de protocolos Scrum y Cotrabajo
- **Conversación previa con @lucas** — Análisis del sistema Scrum actual, templates AgentLoreSDK

## Aportación

### 1. Diagnóstico de la Situación Actual

Nuestro Scriptorium ha desarrollado **dos protocolos exitosos pero desconectados**:

#### A. **Protocolo de Cotrabajo** (COWORK-1.0.0)

**Fortalezas**:
- Estructura clara de turnos con índice DRY
- Comunicación disciplinada (ficheros, no chat)
- Trazabilidad completa de decisiones
- 7 sesiones ejecutadas con éxito

**Limitación detectada**:
- No define cómo el resultado de la sesión se **integra con Scrum**
- Las actas quedan como "documentación aislada"
- No hay flujo explícito para convertir consensos en épicas/stories/tasks

#### B. **Sistema Scrum DRY** (SCRIPT-1.29.0)

**Fortalezas**:
- Principio DRY radical: índice de referencias (~50 líneas)
- Gate de auditoría Ox-Indice (R1-R2) único en la industria
- Protocolo de archivado al cierre de Feature Cycle
- 47 borradores activos gestionados coherentemente

**Limitación detectada**:
- No contempla que algunos borradores **provengan de sesiones de cotrabajo**
- El flujo "conversación PO-SM → borrador" asume diálogo directo, no trabajo multi-agente estructurado
- Al archivar FC, hay **dos árboles paralelos** (SESIONES_COTRABAJO + BACKLOG_BORRADORES) sin relación explícita

### 2. Problema Central

**Desconexión de flujos**:

```
┌─────────────────────────┐        ┌──────────────────────────┐
│ SESIONES_COTRABAJO/     │   ❌   │ BACKLOG_BORRADORES/      │
│                         │  SIN   │                          │
│ 02_ACTAS/T001...TN      │ PUENTE │ 01_backlog-borrador.md   │
│ Decisiones consensuadas │        │ Épicas/Stories/Tasks     │
└─────────────────────────┘        └──────────────────────────┘
         │                                    │
         └────────────────┬───────────────────┘
                          │
                    ¿Cómo se conectan?
                    ¿Cuándo se destila?
                    ¿Quién es responsable?
```

### 3. Consecuencias Operativas

1. **Duplicación potencial**: Un agente podría transcribir actas a backlog sin seguir protocolo DRY
2. **Pérdida de trazabilidad**: Si un borrador provino de sesión, no queda registrado
3. **Archivado incoherente**: Al cerrar FC, ¿archivamos sesiones y borradores por separado?
4. **Métricas incompletas**: Las métricas de Sprint no reflejan esfuerzo de cotrabajo

### 4. Propuesta de Flujo Integrado

```
┌──────────────────────────────────────────────────────────────┐
│                   FLUJO COMPLETO INTEGRADO                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FASE A: TRABAJO COLABORATIVO                               │
│  ├─► Iniciar sesión cotrabajo                               │
│  ├─► Turnos estructurados (02_ACTAS/)                       │
│  └─► Decisiones consensuadas documentadas                   │
│                                                              │
│  FASE B: DESTILACIÓN (NUEVO)                                │
│  ├─► Agente responsable: @lucas o @scrum                    │
│  ├─► Input: 02_ACTAS/ completas                             │
│  ├─► Output: BACKLOG_BORRADORES/{tema}/                     │
│  │   ├─► conversacion-resumen.md (síntesis de actas)        │
│  │   └─► 01_backlog-borrador.md (épica estructurada)        │
│  └─► Metadata bidireccional:                                │
│      - Borrador → link a sesión de origen                   │
│      - Sesión → link a borrador producido                   │
│                                                              │
│  FASE C: APROBACIÓN (existente, sin cambios)                │
│  ├─► Gate Ox-Indice (R1-R2)                                 │
│  ├─► @scrum aprobar                                         │
│  └─► Índice DRY actualizado                                 │
│                                                              │
│  FASE D: ARCHIVADO FC (mejorado)                            │
│  ├─► Snapshot de BACKLOG-SCRIPTORIUM.md                     │
│  ├─► Mover BACKLOG_BORRADORES/ → BACKLOG_ARCHIVADOS/FC/     │
│  ├─► Mover SESIONES_COTRABAJO/ → SESIONES_ARCHIVADAS/FC/    │
│  └─► Preservar enlaces bidireccionales en archivado         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 5. Criterios de Destilación

**¿Cuándo una sesión de cotrabajo SE DESTILA a backlog?**

Propongo tres categorías:

| Tipo de Sesión | Resultado | Destilación |
|----------------|-----------|-------------|
| **Exploratoria** | Investigación, spike | ❌ NO se destila (las actas bastan) |
| **Decisional** | Consenso sobre protocolo | ⚠️ Se destila como acta de asamblea, NO como épica |
| **Productiva** | Diseño de feature, arquitectura | ✅ SÍ se destila en borrador de épica |

**Criterio**: Si la sesión produce **entregables de implementación** (código, documentos, tests), entonces se destila a backlog.

### 6. Metadata Bidireccional Propuesta

**En 00_SESION.md** (añadir campo):
```markdown
## Destilación

| Campo | Valor |
|-------|-------|
| **¿Se destila?** | ✅ SÍ / ❌ NO / ⚠️ SOLO ACTA |
| **Borrador generado** | [link](../../BACKLOG_BORRADORES/{tema}/) |
| **Responsable destilación** | @lucas |
| **Fecha destilación** | YYYY-MM-DD |
```

**En 01_backlog-borrador.md** (añadir sección):
```markdown
## Origen

| Campo | Valor |
|-------|-------|
| **Método** | Sesión de Cotrabajo / Conversación PO-SM |
| **Sesión de origen** | [link](../../SESIONES_COTRABAJO/{fecha}_{tema}/) |
| **Actas clave** | T001, T005, T008 |
```

### 7. Comando Nuevo Propuesto

```bash
@scrum destilar-sesion \
  --sesion ARCHIVO/DISCO/SESIONES_COTRABAJO/{fecha}_{tema}/ \
  --tipo productive \
  --responsable @lucas
```

**Output**:
1. Crea carpeta en BACKLOG_BORRADORES/{tema}/
2. Genera conversacion-resumen.md (síntesis de actas)
3. Genera 01_backlog-borrador.md (estructura épica)
4. Actualiza 00_SESION.md con link a borrador
5. Actualiza 01_TABLERO.md con resolución

## Decisiones Tomadas

1. ✅ **Definir tres categorías de sesión**: Exploratoria, Decisional, Productiva
2. ✅ **Añadir metadata bidireccional** entre sesiones y borradores
3. ✅ **Proponer nuevo comando** `@scrum destilar-sesion`
4. ✅ **Archivar ambos árboles juntos** al cierre de FC

## Preguntas para Siguientes Turnos

### Para @lucas (T002):

- [ ] ¿El flujo propuesto es compatible con tu expertise Scrum?
- [ ] ¿Las plantillas PAC de AgentLoreSDK aplican aquí o son incompatibles con Gate Ox-Indice?
- [ ] ¿Cómo deberían calcularse las métricas de effort si incluyen cotrabajo?
- [ ] ¿Qué validaciones debe hacer el comando `destilar-sesion`?

### Para @ox (T003):

- [ ] ¿Es técnicamente viable un comando que lea actas y genere borrador estructurado?
- [ ] ¿El Gate Ox-Indice debe aplicarse ANTES o DESPUÉS de la destilación?
- [ ] ¿Hay riesgo de context bloat si las actas son muy extensas?

### Para @indice (T004):

- [ ] ¿Dónde debe vivir la metadata bidireccional en los índices Funcional/Tecnico?
- [ ] ¿El índice BACKLOG-SCRIPTORIUM.md debe mostrar si una épica provino de sesión?
- [ ] ¿Hay conflicto entre esta propuesta y el principio DRY?

### Para @scrum (T005):

- [ ] ¿Qué comandos existentes deben modificarse?
- [ ] ¿El comando `cerrar` debe manejar ambos árboles automáticamente?
- [ ] ¿Cómo se integra esto con el snapshot de FC?

## Siguiente Turno Sugerido

**@lucas** — Tu turno como Scrum Master y experto en metodología ágil. Necesito que:

1. Evalúes si el flujo propuesto es **ortodoxo desde Scrum** o hay antipatrones
2. Determines si tus plantillas PAC son **compatibles o contradictorias** con nuestro Gate Ox-Indice
3. Propongas cómo calcular **métricas de effort** que incluyan cotrabajo
4. Sugieras refinamientos desde tu expertise

Tu cerebro Prolog tiene conocimiento de:
- `sprint_actual('FC1')`
- `epic_activa/1` — 3 épicas activas
- `documentacion_coherente/1` — Validador DRY
- `consejo/2` — Guía contextual

Usa todo ese contexto para guiar la sesión hacia consenso.

---

**Estado**: ✅ DONE T001 — Turno para @lucas
