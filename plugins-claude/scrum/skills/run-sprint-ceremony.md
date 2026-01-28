---
name: run-sprint-ceremony
description: "Run Scrum ceremonies: sprint planning, review, retrospective, and close. Includes generar-desde-sesion and cerrar commands."
trigger: "When the user needs to run a sprint ceremony: generate a borrador from a co-working session, close/archive a sprint, or run a retrospective."
---

# Skill: Run Sprint Ceremony

Handle sprint lifecycle ceremonies: generating borradores from co-working sessions, closing sprints, and running retrospectives.

## Quick Usage

### Generar desde Sesion (session -> borrador)

This is the core of the Modelo Generativo: sessions PRODUCE borradores, they do not TRANSFORM into them.

1. Read `ARCHIVO/DISCO/SESIONES_COTRABAJO/{nombre}/00_SESION.md`
2. Verify state = `CERRADA -- PRODUCTIVA`. If not, abort with guidance.
3. Read `01_TABLERO.md` to identify completed turns
4. Read `02_ACTAS/*.md`, extract "Decisiones Tomadas" sections
5. Determine Epic ID (from session proposal or next available)
6. Create `ARCHIVO/DISCO/BACKLOG_BORRADORES/{EPIC_ID}/`
7. Generate `01_backlog-borrador.md` with `origen:` metadata:
   ```yaml
   origen:
     tipo: sesion-cotrabajo
     referencia: SESIONES_COTRABAJO/{nombre}/
     actas: [T001, T002, ...]
     consenso: "{summary of decisions}"
     fecha_consenso: {YYYY-MM-DD}
   ```
8. Add reference row to `.github/BACKLOG-SCRIPTORIUM.md`

**Rules**: Do NOT copy full actas. Do NOT modify the session. Do NOT auto-summarize. Only extract decisions.

### Cerrar Sprint (archive)

1. Read `.github/BACKLOG-SCRIPTORIUM.md`, identify approved epics
2. If incomplete epics exist, ask user: close anyway or cancel
3. Create `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/{sprint}/`
4. Move epic folders from `BACKLOG_BORRADORES/` to archived
5. Generate `retrospectiva.md` in the archived folder
6. Update index: remove active rows, add row in "Historico" section
7. With `--incluir-sesiones`: also move related sessions to `sesiones/` subfolder

### Status (extended report)

1. Read backlog index for active epics
2. Scan `ARCHIVO/DISCO/SESIONES_COTRABAJO/` for open sessions
3. Report: epics (completed/in-progress/pending), active sessions, metrics
4. Detect productive sessions without generated borradores

## Key Paths

| What | Where |
|------|-------|
| Sessions | `ARCHIVO/DISCO/SESIONES_COTRABAJO/` |
| Active drafts | `ARCHIVO/DISCO/BACKLOG_BORRADORES/` |
| Archived sprints | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` |
| Sprint history | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` with Sprint0, Sprint1, FC1, FC2 |

<details>
<summary>Full ceremony protocols, templates, and edge cases</summary>

### Retrospective Template

```markdown
# Retrospectiva: {Sprint}

> **Periodo**: {start date} -> {close date}
> **Epicas cerradas**: N
> **Sesiones de cotrabajo**: M

## Metricas del Sprint

| Metrica | Valor |
|---------|-------|
| Epicas cerradas | N |
| Effort completado | X pts |
| Sesiones cotrabajo | M |
| Turnos totales | T |

## Que funciono

- [Analyze successes]
- [Mention productive sessions]

## Que no funciono

- [Analyze problems]
- [Mention blockers]

## Que mejorar

- [Actions for next sprint]

## Epicas cerradas

| Epica | Nombre | Effort | Origen |
|-------|--------|--------|--------|
| ID | Nombre | N pts | [sesion] or manual |

## Sesiones cerradas (if applicable)

| Sesion | Tipo | Turnos | Produjo |
|--------|------|--------|---------|
| nombre | Productiva | N | Epica X |
```

### Status Report Format

```
Sprint FC1: flavour/monada
===========================================
Epicas activas: {N}

Epicas
|- Completadas: {N}/{M}
|- En progreso: {N}
|- Pendientes: {N}

Sesiones de Cotrabajo
|- Activas: {N}
|   |- {session-1}: Turno {X}, desde {date}
|   |- {session-2}: Turno {Y}, desde {date}
|- Pausadas: {N}

Metricas
|- Effort completado: {X} pts ({Y}%)
|- Sesiones cerradas como Productiva: {N}
|- Borradores generados desde sesiones: {N}
```

### Session Close Types

| Type | Detected by | Action |
|------|-------------|--------|
| Exploratoria | `00_SESION.md` without production | Only register in history |
| Normativa | Produces decisions/instructions | Document in `.github/` |
| Productiva | Produces epic draft | `generar-desde-sesion` |

### Edge Cases

**Session without proposed Epic ID**: Generate ID based on theme, e.g., `CONTEXT-BLOAT-1.0.0`

**Session with multiple epics**: Run `generar-desde-sesion` once per epic, each borrador references the same session.

**Exploratory session closed as Productive by mistake**: If no "Decisiones Tomadas" found in actas, warn and offer options (add decisions, change close type, generate empty structure).

**Incomplete epics at close**: List pending, offer to move them to the next sprint or cancel the close.

### --incluir-sesiones Option

When used:
1. Detect related sessions (sessions whose `origen:` points to sprint epics)
2. Move to `BACKLOG_ARCHIVADOS/{sprint}/sesiones/`
3. Update session index
4. Include session metrics in retrospective

| Situation | Recommendation |
|-----------|---------------|
| Normal sprint | Without option |
| Sprint with heavy co-working | `--incluir-sesiones` |
| Exploratory sessions | Without option (remain for reference) |

### Anomaly Detection

**Stale sessions** (>24h without activity):
- Suggest: resume, close as exploratory, or document blocker

**Productive sessions without borrador**:
- Cross-reference closed PRODUCTIVA sessions against existing borradores
- Report any unprocessed sessions

### Commit Convention for Ceremonies

```
docs(script/plan): cerrar sprint {nombre}

- Archivar N epicas en BACKLOG_ARCHIVADOS/{sprint}/
- Archivar M sesiones de cotrabajo (if applicable)
- Crear foto de estado
- Actualizar indice con referencias

refs #SCRIPT-X.Y.0, #SCRIPT-X.Z.0
```

</details>
