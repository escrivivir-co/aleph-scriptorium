---
name: track-epics
description: "Track epic lifecycle and feature cycles. Manage epic states, effort metrics, scope changes, and sprint-to-sprint progression."
trigger: "When the user needs to track epic progress, review feature cycle status, detect anomalies like scope creep or persistent blockers, or understand sprint history."
---

# Skill: Track Epics

Monitor epic lifecycle from planning through archival. Track effort, detect anomalies, and manage feature cycle progression across sprints.

## Quick Usage

### Check Epic Status

1. Read `.github/BACKLOG-SCRIPTORIUM.md` for the active sprint table
2. For each epic with in-progress status, read its borrador at `ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/01_backlog-borrador.md`
3. Calculate real metrics: tasks completed vs total, effort completed vs estimated

### Sprint History

Sprint archives live in `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/`:

| Folder | Content |
|--------|---------|
| `Sprint0/` | Initial sprint |
| `Sprint1/` | Second sprint |
| `FC1_Enero2026/` | Feature Cycle 1 |
| `FC2/` | Feature Cycle 2 |
| `Spikes/` | Technical spikes |
| `INDEX.md` | Archive index |
| `INDEX_ABSTRACT.md` | Archive summary |

### Detect Anomalies

**Scope creep**: Tasks added after approval -- document in borrador, adjust estimates.

**Persistent blockers** (>3 days): Escalate to PO, suggest alternatives.

**Metrics drift**: If calculated metrics differ from declared metrics in borrador, update and report discrepancy.

### Epic State Flow

```
(pending) Planificada
    |
    v
(in-progress) En desarrollo
    |
    v
(approved) Completada
    |
    v
(archived) En BACKLOG_ARCHIVADOS/
```

## Key Paths

| What | Where |
|------|-------|
| Index | `.github/BACKLOG-SCRIPTORIUM.md` |
| Active borradores | `ARCHIVO/DISCO/BACKLOG_BORRADORES/` |
| Archive | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` |
| Archive index | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/INDEX.md` |

<details>
<summary>Full tracking protocol, metrics formulas, and feature cycle management</summary>

### Metrics Calculation

```
effort_completed = sum(task.effort for task in tasks if task.state == completed)
effort_total = sum(task.effort for all tasks)
progress = (effort_completed / effort_total) * 100
```

### Metrics Table Template

```markdown
| Metrica | Valor |
|---------|-------|
| Tasks totales | {total} |
| Completadas | {completed} |
| En progreso | {in_progress} |
| Pendientes | {pending} |
| % Avance | {progress}% |
```

### Task State Transitions

| From | To | Symbol |
|------|----|--------|
| Pending | In progress | (in-progress) |
| Pending | Completed | (completed) |
| In progress | Completed | (completed) |
| Any | Blocked | (blocked) |

### Feature Cycle Structure

Feature cycles (FC1, FC2, ...) group epics into themed iterations:

```markdown
## Feature Cycle N: Structure

| Iteration | Name | Objective | Effort |
|-----------|------|-----------|--------|
| FC1-I1 | ... | ... | N% |
| FC1-I2 | ... | ... | M% |
```

Rule: Total effort across iterations = 100%.

### Scope Creep Detection

```
If tasks added after approval:
  - Document new tasks in borrador
  - Adjust effort estimates
  - If from session: update origen metadata
  - Report to user with list of added tasks and impact
```

### Persistent Blocker Protocol

```
If blocked task > 3 days:
  - Escalate to PO
  - Suggest alternatives
  - Consider reassignment
```

### Session Traceability Cross-Reference

For each closed PRODUCTIVA session in `ARCHIVO/DISCO/SESIONES_COTRABAJO/`:
- Check if a borrador exists with `origen.referencia` pointing to it
- Report any sessions without generated borradores

### Commit Convention for Tracking Updates

Commit when:
- >=5 tasks updated
- >=10% progress change
- Blocker reported

```
chore({scope}/plan): actualizar tracking sprint N

- {list of updated tasks}
- Avance: {previous}% -> {new}%

refs #{epic-id}
```

### Current Sprint Context

Current sprint: FC1 "flavour/monada"
Branch in ALEPH: flavour/monada
Branch in submodules: integration/beta/scriptorium

### Existing Backlog Borradores (sample)

Active borradores in `ARCHIVO/DISCO/BACKLOG_BORRADORES/` include folders like:
- `AGENTE_INDICE/`
- `AS-GYM/`
- `AS-UTILS-SDK/`
- `BLOCKLY-INTEGRATION/`
- `BLOCKLY-SDK/`
- `CLI_SCRIPTORIUM/`
- `COPILOT_ENGINE/`
- `Claude_Code_Plugins_Migration/`
- And many more dated entries (Diciembre/Enero)

### Archived Sprint Structure

In `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/`:
- `Sprint0/` and `Sprint1/` -- early sprints
- `FC1_Enero2026/` -- Feature Cycle 1 (January 2026)
- `FC2/` -- Feature Cycle 2
- `Spikes/` -- technical exploration spikes

</details>
