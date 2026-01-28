# Start Cowork Session

Creates a structured collaborative session for multi-agent asynchronous work.

## Quick Usage

```
/start-cowork-session
```

Prompts for: **topic**, **participants** (2+ agents), **objective**, optional **epic** and **constraints**.

## What It Creates

```
ARCHIVO/DISCO/SESIONES_COTRABAJO/{date}_{topic}/
├── 00_SESION.md          # Session metadata
├── 01_TABLERO.md         # Turn-based index (DRY)
├── 02_ACTAS/             # Turn content
├── 03_REFERENCIAS/       # Context material
└── 04_PROTOCOLO.md       # Protocol copy
```

## Output Example

```
✅ Cowork session created

📂 Folder: SESIONES_COTRABAJO/2026-01-28_api-design/
👥 Participants: @ox, @indice, @scrum
🎯 Objective: Produce OpenAPI spec for MCP Prolog
📋 Epic: PROLOG-API-1.0.0

🚀 Next: @ox has first turn (status: ⏳ WAITING)
```

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## Required Inputs

1. **Topic** (required): Session name in kebab-case
2. **Participants** (required): List of agents (@agente1, @agente2, ...)
3. **Objective** (required): What the session should produce
4. **Epic reference** (optional): Related backlog epic ID
5. **Constraints** (optional): Special limits or rules

## Execution Flow

### Step 1: Validate Inputs

```
- [ ] Topic is kebab-case format
- [ ] At least 2 participants specified
- [ ] Objective is clear and actionable
```

### Step 2: Create Folder Structure

Location: `ARCHIVO/DISCO/SESIONES_COTRABAJO/{YYYY-MM-DD}_{topic}/`

```
{folder}/
├── 00_SESION.md       # Session metadata + participants + objective
├── 01_TABLERO.md      # Turn-based index (DRY principle)
├── 02_ACTAS/          # Actual turn content (one file per turn)
│   └── .gitkeep
├── 03_REFERENCIAS/    # Reference material
│   └── backlog.md     # (if epic provided)
└── 04_PROTOCOLO.md    # Local copy of cotrabajo protocol
```

### Step 3: Generate 00_SESION.md

```markdown
# Session: {Topic}

## Metadata

| Field | Value |
|-------|-------|
| **Start date** | {YYYY-MM-DD HH:MM} |
| **Status** | 🟢 ACTIVE |
| **Related epic** | {EPIC-ID or N/A} |
| **Folder** | {full path} |

## Participants

| Agent | Role | Current status |
|-------|------|----------------|
{for each: | @agent | {role} | ⚪ IDLE |}

## Objective

{objective}

## Constraints

{constraints or "No special constraints"}

## Backlog References

{links to drafts or "N/A"}
```

### Step 4: Generate 01_TABLERO.md

```markdown
# Turn Board

> **DRY Rule**: This file is an INDEX. Content is in 02_ACTAS/.

## Current Turn

| # | Agent | Status | Minutes |
|---|-------|--------|---------|
| 1 | {first participant} | ⏳ WAITING | — |

## Turn History

| # | Agent | Start | End | Summary (1 line) | Minutes |
|---|-------|-------|-----|------------------|---------|
| — | — | — | — | Session just started | — |

## Waiting Queue

| Position | Agent | Priority |
|----------|-------|----------|
{for each from 2nd: | {N} | @agent | Normal |}
```

### Step 5: Copy Protocol

Copy `.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md` to `04_PROTOCOLO.md` for local reference.

### Step 6: Extract References (if applicable)

If epic reference provided:
1. Read the indicated draft backlog
2. Extract relevant sections to `03_REFERENCIAS/backlog.md`
3. Add links in `03_REFERENCIAS/sources.md`

## Full Example

```
User: /start-cowork-session

Claude: I need the following data:

1. **Topic**:
2. **Participants**:
3. **Objective**:
4. **Epic** (optional):
5. **Constraints** (optional):

User:
1. api-design-prolog
2. @ox, @indice, @scrum
3. Produce OpenAPI specification for MCP Prolog
4. PROLOG-API-1.0.0
5. Maximum 5 turns

Claude:
✅ Cowork session created

📂 Folder: ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-03_api-design-prolog/
👥 Participants: @ox, @indice, @scrum
🎯 Objective: Produce OpenAPI specification for MCP Prolog
📋 Epic: PROLOG-API-1.0.0
⚠️ Constraints: Maximum 5 turns

🚀 Next:
   @ox has first turn.
   Status: ⏳ WAITING

📖 Protocol: Read 04_PROTOCOLO.md before starting.
```

## Integration with Scrum Plugin

This session can:
- Link to an existing epic in backlog
- Generate a new entry in BACKLOG_BORRADORES/ upon closure
- Produce minutes that serve as input for retrospectives

## Session Types

| Type | Produces | Action @scrum |
|------|----------|---------------|
| **Exploratory** | Nothing | Only register in history |
| **Normative** | Decisions | Document in instructions |
| **Productive** | Draft | `generate-from-session` |

## References

- Protocol: [cotrabajo.instructions.md](../docs/cotrabajo-protocol.md)
- Index: `ARCHIVO/DISCO/SESIONES_COTRABAJO/INDEX.md`
- Scrum integration: `scrum` plugin

</details>
