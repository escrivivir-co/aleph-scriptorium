# Agent Taxonomy

Browse and understand the AgentLoreSDK catalog of reusable agent templates, skills, and commands.

## Quick Usage

```
/agent-taxonomy
```

Prompts for: **category** to browse, **search term**, or **stats** for overview.

## What It Does

Navigates the AgentLoreSDK catalog (708+ templates across 55 categories) to help users find reusable components before creating agents from scratch. This is the **DRY discovery** tool for agent creation.

## Overview

```
AgentLoreSDK/cli-tool/components/
├── agents/    25 categories, 165 templates
├── commands/  20 categories, 217 templates
└── skills/    10 categories, 255 templates

Total: 708 items across 55 categories
```

**Catalog index**: `.github/plugins/agent-creator/index/catalog.json`

## Actions

### Browse by Type

```
/agent-taxonomy agents
/agent-taxonomy skills
/agent-taxonomy commands
```

Lists all categories within the chosen type with item counts.

### Search by Keyword

```
/agent-taxonomy search security
```

Matches against category names, tags, and item names.

### Inspect a Category

```
/agent-taxonomy agents/security
```

Lists all `.md` files within `AgentLoreSDK/cli-tool/components/agents/security/` with brief descriptions.

### Preview a Template

```
/agent-taxonomy preview agents/security/api-security-audit.md
```

Reads and displays the full template content.

## Agent Categories (25)

| Category | Items | Tags |
|----------|-------|------|
| ai-specialists | 7 | ai, ml, specialists |
| api-graphql | 3 | api, graphql, rest |
| blockchain-web3 | 3 | blockchain, web3, crypto |
| business-marketing | 10 | business, marketing, sales |
| data-ai | 8 | data, analytics, ml |
| database | 9 | database, sql, nosql |
| deep-research-team | 13 | research, team, analysis |
| development-team | 8 | dev, team, collaboration |
| development-tools | 12 | tools, dev, productivity |
| devops-infrastructure | 8 | devops, infra, cloud |
| documentation | 4 | docs, writing, technical |
| expert-advisors | 4 | expert, advisor, consulting |
| ffmpeg-clip-team | 8 | ffmpeg, video, media |
| game-development | 4 | game, unity, unreal |
| git | 1 | git, version-control |
| mcp-dev-team | 7 | mcp, claude, anthropic |
| modernization | 3 | modernization, migration, upgrade |
| obsidian-ops-team | 8 | obsidian, notes, pkm |
| ocr-extraction-team | 7 | ocr, extraction, documents |
| performance-testing | 5 | performance, testing, load |
| podcast-creator-team | 11 | podcast, audio, content |
| programming-languages | 11 | languages, polyglot |
| realtime | 1 | realtime, websocket, streaming |
| security | 5 | security, audit, vulnerabilities |
| web-tools | 6 | web, scraping, automation |

---

<details>
<summary><strong>Full Reference: Created Agents Registry</strong> (click to expand)</summary>

## Created Agents in Scriptorium

Agents previously created with AgentCreator and stored in `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/`:

| Agent | Base | Specialization | Has Recipe | ARG Deployed |
|-------|------|----------------|------------|--------------|
| tarotista | yellowflag | Demarcation criteria | Yes | Yes (El Camino del Tarotista) |
| lucas | indice | Scrum Master + DRY + SDK | Yes | Yes (Teatro) |
| nonsi | -- | -- | Yes | -- |
| pathykar | -- | -- | Yes | -- |
| tutatix | -- | -- | Yes (nested) | -- |

### Personajes Registry

Full registry at: `.github/plugins/agent-creator/index/personajes-registry.json`
Schema: `.github/plugins/agent-creator/schemas/personajes-registry.schema.json`

</details>

<details>
<summary><strong>Full Reference: SDK Template Structure</strong> (click to expand)</summary>

## AgentLoreSDK Template Structure

Each template in the SDK follows a standard markdown format:

```markdown
# {Agent/Skill/Command Name}

## Description
{What this component does}

## Configuration
{Parameters, environment variables}

## Usage
{How to invoke}

## Integration
{How it connects with other components}
```

Templates are located at:
```
AgentLoreSDK/cli-tool/components/
├── agents/{category}/{template}.md
├── commands/{category}/{template}.md
└── skills/{category}/{template}.md
```

### Reading Templates

To preview any template:
```
Read AgentLoreSDK/cli-tool/components/agents/{category}/{name}.md
```

### Using Templates in Agent Creation

When the `create-agent` skill detects a relevant template, it:
1. Reads the template content
2. Extracts capabilities, configuration, and integration points
3. Fuses them with the base agent's methodology
4. Produces a hybrid agent that combines both

This is the core **DRY principle** of the agent creation workflow.

</details>
