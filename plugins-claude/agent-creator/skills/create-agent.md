# Create Agent

Guided workflow to create a specialized Scriptorium agent by combining base agents, data sources, and AgentLoreSDK templates.

## Quick Usage

```
/create-agent
```

Prompts for: **base agent(s)**, **data source(s)**, **specialization**, **name**.

## What It Produces

```
ARCHIVO/PLUGINS/AGENT_CREATOR/
├── agents/created/{name}.agent.md    # The new agent
└── recipes/{name}.recipe.json        # Reproducible recipe
```

## Workflow Steps

### Step 1: Collect Inputs

Ask the user:

```
What base agent(s) for methodology?

Available:
- @yellowflag (limits, quadrants, gnosis)
- @blueflag (truth, evidence, falsifiability)
- @blackflag (shadows, power, self-defense)
- @redflag (structure, scale, viability)
- @orangeflag (registry, interlocution, style)
- @revisor (doctrinal coherence)
- @periodico (news analysis, 5W + flags)

What data source(s) to connect?
- Folders in DISCO/ (scraping, transcriptions)
- Documents in ARCHIVO/ (framework, diagnosis, justification)

What specialization? What name?
```

### Step 2: DRY Check (Proactive)

**Before creating from scratch**, scan the AgentLoreSDK catalog:

1. Read `.github/plugins/agent-creator/index/catalog.json`
2. Infer domain from user keywords (see keyword mapping below)
3. If matches found, show proactively:

```
Detected domain: {domain}. Found {N} pre-existing templates:

| # | Type    | Category | Items | Path                                    |
|---|---------|----------|-------|-----------------------------------------|
| 1 | agents  | {cat}    | {n}   | AgentLoreSDK/cli-tool/components/agents/{cat}/ |
| 2 | skills  | {cat}    | {n}   | AgentLoreSDK/cli-tool/components/skills/{cat}/ |

Explore? (1/2/skip)
```

4. If user explores: list `.md` files, allow preview, offer fusion
5. If user skips: continue, note in agent `# DRY: User declined templates from {category}`

### Step 3: Analyze Base Agents

For each selected base agent, read its `.agent.md` file and extract:
- System prompt (personality, methodology)
- Truth sources in ARCHIVO/
- Audit tests
- Existing handoffs

### Step 4: Analyze Data Sources

For each source in DISCO/ARCHIVO:
- List available files
- Read content, extract key concepts
- Detect active scraping jobs in `ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/`
- Note limitations (pages missing, etc.)

### Step 5: Synthesize Agent

Generate `.agent.md` using the template structure:

```markdown
---
name: {name}
description: "{base_agent.description} + Specialist in {specialization}"
argument-hint: "{domain-specific hint}"
tools: ['read', 'search', 'agent']
handoffs:
  # Inherited from base (adapted)
  # ForoScraper if active scraping source
  # Back to base agent
---

# Agent: {Name}

**Role:** {inherited role} + Specialist in {specialization}
**Base agent(s):** {list}
**Connected sources:** {list}

## System Prompt

{Base agent prompt ADAPTED to specialization, incorporating source concepts}

## Truth Sources

### Methodological (inherited)
- {Base agent documents}

### Thematic (connected)
- {Data sources with description and state}

## Specific Audit Tests

{Base tests adapted + new tests from specialization}

## Source Knowledge

### Key Concepts
{Extracted from data sources}

### Questions I Can Answer
{Based on available content}

### Limitations
- Only know {N} of {M} available pages
- Can request more data via Scraper handoff
```

### Step 6: Generate Recipe

Save to `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{name}.recipe.json`:

```json
{
  "name": "{name}",
  "version": "1.0.0",
  "created_at": "{ISO timestamp}",
  "created_by": "AgentCreator",
  "agentes_base": [
    {
      "id": "{agent_id}",
      "file": "{agent file path}",
      "elementos_heredados": ["list", "of", "inherited", "elements"]
    }
  ],
  "fuentes_datos": [
    {
      "ruta": "{path}",
      "tipo": "scraping|document|transcription",
      "conceptos_extraidos": ["concept1", "concept2"]
    }
  ],
  "especialidad": "{specialization}",
  "sdk_templates_used": ["{template1.md}", "{template2.md}"],
  "tests_especificos": ["test1", "test2"]
}
```

### Step 7: Install and Confirm

1. Save agent to `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/{name}.agent.md`
2. Save recipe to `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{name}.recipe.json`
3. Update `ARCHIVO/PLUGINS/AGENT_CREATOR/logs/creation-log.json`
4. Confirm with summary
5. Ask: "Run validation protocol? (yes/no)"

## Validations

- [ ] At least one base agent selected (or existing agent to improve)
- [ ] DRY Check: catalog consulted before creating
- [ ] If relevant templates exist: user informed
- [ ] Agent name unique (no collision with existing)
- [ ] Data sources accessible and contain content
- [ ] If improving existing agent: backup before modifying

---

<details>
<summary><strong>Full Reference: Keyword-to-Category Mapping</strong> (click to expand)</summary>

## Keyword-to-Category Mapping

| User Keywords | Categories to Search |
|---------------|---------------------|
| api, endpoint, rest, graphql | `api-graphql`, `web-tools` |
| security, audit, vulnerability | `security` |
| data, analytics, ml, ai | `data-ai`, `ai-specialists` |
| database, sql, postgres | `database` |
| documentation, docs, readme | `documentation` |
| research, papers | `deep-research-team`, `scientific` |
| tests, testing, qa | `testing`, `performance-testing` |
| deploy, ci/cd, infrastructure | `deployment`, `devops-infrastructure` |
| git, versions, branches | `git`, `git-workflow` |
| games, gaming, unity | `game-development` |
| podcast, audio, video | `podcast-creator-team`, `ffmpeg-clip-team`, `media` |
| ocr, extraction, pdf | `ocr-extraction-team`, `document-processing` |
| obsidian, notes, knowledge | `obsidian-ops-team`, `productivity` |
| blockchain, web3, crypto | `blockchain-web3` |
| marketing, business, sales | `business-marketing` |
| svelte, nextjs, frontend | `svelte`, `nextjs-vercel`, `web-tools` |
| modernization, legacy, migration | `modernization` |
| mcp, model context protocol | `mcp-dev-team` |
| scrum, sprint, backlog, kanban | `project-management`, `team` |
| index, documentation, coherence | `documentation`, `obsidian-ops-team` |

## AgentLoreSDK Catalog Summary

- **Source**: `AgentLoreSDK/cli-tool/components/`
- **Catalog index**: `.github/plugins/agent-creator/index/catalog.json`
- **Schema**: `.github/plugins/agent-creator/index/catalog.schema.json`
- **Total**: 708 items across 55 categories
  - 165 agents (25 categories)
  - 217 commands (20 categories)
  - 255 skills (10 categories)

</details>

<details>
<summary><strong>Full Reference: Validation Protocol</strong> (click to expand)</summary>

## 3-Phase Validation Protocol

### Phase A: Generate Questionnaire

**Actor**: AgentCreator
**Input**: Agent recipe + original user context
**Output**: Adapted questionnaire with 4-8 questions

Distribution:
- 50% knowledge-specific (connected sources)
- 30% inherited methodology (base agents)
- 20% integration/synthesis (unique combination)

Anti-patterns to avoid:
- Generic questions any LLM would answer equally
- Questions about knowledge NOT in sources
- Questions not requiring the base methodology

### Phase B: Pass Questionnaire

**Actor**: User/PO
1. For each question, invoke the agent with the exact question
2. Paste literal response
3. Mark initial perception (pass/fail)
4. Note observations for surprises

### Phase C: Analyze Alignment

**Actor**: @aleph

Evaluation matrix:

| Dimension | Weight | Score 100% if... |
|-----------|--------|------------------|
| Specific knowledge | 40% | Mentions concepts from ALL sources |
| Inherited methodology | 30% | Applies base agent framework |
| Integration | 20% | Combines both coherently |
| Handoffs | 10% | Delegates appropriately |

```
Score = (knowledge * 0.4) + (methodology * 0.3) + (integration * 0.2) + (handoffs * 0.1)
```

| Score | Verdict | Action |
|-------|---------|--------|
| >=85% | ALIGNED | Ready for production |
| 70-84% | PARTIAL | Review low dimensions |
| 50-69% | MISALIGNED | Significant adjustments needed |
| <50% | FAILED | Recreate agent with better context |

</details>

<details>
<summary><strong>Full Reference: Example Sessions</strong> (click to expand)</summary>

## Example: Creating Tarotista (no SDK templates)

```
User: Create agent from @yellowflag + DISCO/Foro_t8941392/
       Specialization: Scientific demarcation criteria

AgentCreator: Analyzing:
- @yellowflag: Integral audit, Wilber quadrants, gnosis
- DISCO/Foro_t8941392/: Demarcation debate (1/51 pages)

Searched catalog for "gnosis", "quadrants", "epistemology"...
No direct matches in SDK catalog.
Continuing with from-scratch creation.

Key concepts from forum:
- Demarcation criteria (Popper, Kuhn, Feyerabend)
- Synchronicities (Pauli/Jung)
- Science vs pseudoscience boundaries

Generated: tarotista.agent.md
- Applies Wilber quadrants to demarcation debate
- Knows Popper critique (Kuhn, Feyerabend, Lakatos)
- Integrates synchronicities without falling into pseudoscience
- Can request more context from original thread

Recipe saved: recipes/tarotista.recipe.json
```

## Example: Improving Lucas (with SDK templates)

```
User: Improve Lucas the Scrum Master

AgentCreator: Analyzing Lucas...
- Location: ARCHIVO/DISCO/TALLER/ELENCO/lucas/
- Role: Mentor in Teatro ARG, document coherence guardian
- Brain: 329 lines of Prolog

Detected domains: documentation, scrum, tasks

Found relevant templates:
| # | Type     | Category           | Items |
|---|----------|--------------------|-------|
| 1 | agents   | documentation      | 4     |
| 2 | commands | project-management | 18    |
| 3 | skills   | productivity       | 12    |

User: 2 (project-management)

Available: sprint-planning, daily-standup, retrospective,
backlog-grooming, velocity-tracker, burndown-chart, ...

User: backlog-grooming, velocity-tracker, blockers-report

Fusing with Lucas...
- Updated lucas.agent.md (3 new handoffs, extended description)
- Extended lucas-prolog.brain.pl (new facts and rules)
- Recipe: recipes/lucas-scrum-upgrade.json
```

## Example: API Security Auditor (with SDK templates)

```
User: Create agent for API security auditing

AgentCreator: Base: @blueflag (truth, evidence, falsifiability)

Detected: security + APIs
Found: agents/security (5), agents/api-graphql (3), skills/development (56)

User explores security templates:
- api-security-audit.md
- penetration-tester.md
- auth-reviewer.md
- ...

Fusion: @blueflag + api-security-audit.md
Result: api-security-auditor.agent.md
- Evidence methodology from @blueflag
- OWASP Top 10 checklist from template
- Handoffs: @blackflag (threats), @redflag (fix viability)
```

</details>

<details>
<summary><strong>Full Reference: Prolog Brain Export</strong> (click to expand)</summary>

## Prolog Brain Export

For agents deployed to Teatro ARG, AgentCreator can generate `.brain.pl` files.

**Template**: `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/brain.pl.template`
**Example**: `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/lucas.brain.pl`

The brain file contains:
- Facts: `concepto/2`, `fuente/2`, `test/2`
- Rules: behavioral logic, validation queries
- Queries: `?- validar_conocimiento(Agente, Score).`

Use the "Export Prolog brain" handoff or specify `--brain` during creation.

</details>
