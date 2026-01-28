---
name: manage-backlogs
description: "Create, update, and manage backlog borradores in DISCO. Handles planificar, borrador, aprobar, and tracking commands."
trigger: "When the user needs to create a new backlog draft, plan a sprint, approve an epic, or update task tracking."
---

# Skill: Manage Backlogs

Create and manage backlog borradores following DRY principles. Content lives in `ARCHIVO/DISCO/BACKLOG_BORRADORES/`, the index at `.github/BACKLOG-SCRIPTORIUM.md` holds only references (~50 lines max).

## Quick Usage

### Planificar (new sprint/epic)

1. Read `.github/BACKLOG-SCRIPTORIUM.md` to find the next epic ID
2. Read `ARCHIVO/DISCO/BACKLOG_BORRADORES/INDEX.md` for current state
3. Create folder: `ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/`
4. Optionally create `conversacion-po-sm.md` for PO-SM planning dialogue
5. Add ONE reference row to the index:
   ```
   | (pending) | SCRIPT-X.Y.0 | {Short name} | [borrador](../ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/) |
   ```

### Borrador (detailed backlog)

1. Navigate to `ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/`
2. Create `01_backlog-borrador.md` with: Epic ID, Stories, Tasks, Effort, Definition of Done
3. If origin is a session, include `origen:` metadata block
4. Update status emoji in index from pending to in-progress

### Aprobar (change status)

1. Validate borrador exists with `01_backlog-borrador.md`
2. Check effort defined, tasks listed
3. If has `origen:` metadata, verify traceability (session exists, actas valid)
4. Change status emoji in index to approved -- do NOT copy content to index

### Tracking (update tasks)

1. Locate borrador via index reference
2. Update task states in `01_backlog-borrador.md` (NOT in the index)
3. Recalculate metrics (effort completed, % progress)
4. States: pending, in-progress, completed, blocked

## Key Paths

| What | Where |
|------|-------|
| Index | `.github/BACKLOG-SCRIPTORIUM.md` |
| Active drafts | `ARCHIVO/DISCO/BACKLOG_BORRADORES/` |
| Draft index | `ARCHIVO/DISCO/BACKLOG_BORRADORES/INDEX.md` |
| Archived | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` |

## Effort Scale

| Points | Complexity | Examples |
|--------|-----------|----------|
| 1 | Trivial | Rename, move file |
| 2 | Simple | Create doc from template |
| 3 | Moderate | Small feature, new prompt |
| 5 | Complex | Full story, integration |
| 8 | Very complex | Chapter, new plugin |
| 13 | Epic | Complete system |

<details>
<summary>Detailed borrador template and validation checklists</summary>

### Borrador Template

```markdown
# Backlog: {Epic Name}

> **Epic**: SCRIPT-X.Y.0
> **Effort total**: N pts
> **Estado**: (pending) Borrador

## Origen (if from session)

| Campo | Valor |
|-------|-------|
| Tipo | sesion-cotrabajo |
| Sesion | [{nombre}](../SESIONES_COTRABAJO/{nombre}/) |
| Consenso | {resumen} |
| Fecha | {YYYY-MM-DD} |

## Stories

| ID | Nombre | Effort | Estado |
|----|--------|--------|--------|
| S01 | ... | N pts | pending |

## Tasks

### S01: {Nombre}

| Task | Descripcion | Effort | Estado |
|------|-------------|--------|--------|
| T001 | ... | N | pending |

## Feature Cycle Structure (for large sprints)

| Iteracion | Nombre | Objetivo | Effort |
|-----------|--------|----------|--------|
| FC1-I1 | ... | ... | N% |
| FC1-I2 | ... | ... | M% |

## Metricas

| Metrica | Target | Minimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | {total}/{total} | {min}/{total} | pending |
| Effort completado | {total} pts | {min} pts | pending |

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Sesion {nombre} | Cerrada | Origen de esta epica |
```

### Validation Checklist -- Valid Borrador

- Has unique Epic ID
- Located in `ARCHIVO/DISCO/BACKLOG_BORRADORES/`
- Has reference in index
- If from session: has `origen:` metadata
- If has origin: referenced session exists
- Stories have effort estimates
- Tasks have clear descriptions
- Definition of Done present per story

### Validation Checklist -- Traceability (v3.0)

If `origen.tipo = sesion-cotrabajo`:
- `origen.referencia` points to existing folder
- `origen.actas` lists valid actas
- `origen.consenso` is not empty
- `origen.fecha_consenso` is valid date format

### ID Conventions

| Opportunity | Format | Example |
|-------------|--------|---------|
| Scriptorium | `SCRIPT-{MAJOR}.{MINOR}.{PATCH}` | SCRIPT-3.1.0 |
| Fundacion | `FUND-{MAJOR}.{MINOR}.{PATCH}` | FUND-1.2.0 |
| Custom | `{TEMA}-{MAJOR}.{MINOR}.{PATCH}` | SCRUM-REFACTOR-1.0.0 |

### DO NOT

- Copy borrador content into the index
- Add task tables to BACKLOG-SCRIPTORIUM.md
- Duplicate information between locations
- Copy full session actas into borrador
- Auto-summarize actas without reference

### SM Planning Questions

| Topic | Question |
|-------|----------|
| Objective | "What is the main goal of this sprint?" |
| Epics | "What large work items do you want to tackle?" |
| Priority | "What is the relative priority between epics?" |
| Model | "Dedicate to one thing or split effort?" |
| Risks | "What could block or delay work?" |
| Success | "How will we know the sprint was successful?" |
| Dependencies | "Is there anything we need before starting?" |

</details>
