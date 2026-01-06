# Catálogo de Plantillas AgentLoreSDK

> **Índice generado para Agent Creator**  
> **Fuente**: `AgentLoreSDK/cli-tool/components/`  
> **Épica**: AGENT-TEMPLATES-1.0.0

---

## Resumen

| Tipo | Categorías | Plantillas |
|------|------------|------------|
| 🤖 Agents | 25 | 165 |
| ⌨️ Commands | 20 | 217 |
| 🎯 Skills | 10 | 255 |
| 📁 Templates | 6 | — |
| **Total** | **61** | **637+** |

---

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `catalog.json` | Índice navegable con todas las categorías y plantillas |
| `catalog.schema.json` | Esquema JSON Schema para validación |
| `README.md` | Este archivo (documentación) |

---

## Uso en Agent Creator

### Flujo de Integración

```
@plugin_ox_agentcreator crear agente
         │
         ▼
┌────────────────────────────────┐
│ 1. Seleccionar base            │
│    (@yellowflag, @blueflag...) │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ 2. ¿Agregar plantilla común?   │
│    → Consulta catalog.json     │
│    → Lista categorías          │
│    → Preview plantilla         │
│    → Fusiona con base          │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ 3. Continuar flujo estándar    │
└────────────────────────────────┘
```

### Ejemplo de Consulta

```javascript
// Leer catálogo
const catalog = require('./catalog.json');

// Buscar por keyword
const securityAgents = catalog.categories.agents.items
  .filter(item => item.tags.includes('security'));

// Resultado: api-security-audit, penetration-tester, etc.
```

---

## Categorías Disponibles

### 🤖 Agents (25 categorías, 165 plantillas)

| Categoría | Items | Tags |
|-----------|-------|------|
| ai-specialists | 7 | ai, ml, specialists |
| api-graphql | 3 | api, graphql |
| blockchain-web3 | 3 | blockchain, web3, crypto |
| business-marketing | 10 | business, marketing |
| data-ai | 8 | data, ai, analytics |
| database | 9 | database, sql |
| deep-research-team | 13 | research, analysis |
| development-team | 8 | development, team |
| development-tools | 12 | tools, dev |
| devops-infrastructure | 8 | devops, infrastructure |
| documentation | 4 | docs, documentation |
| expert-advisors | 4 | experts, advisors |
| ffmpeg-clip-team | 8 | ffmpeg, video, media |
| game-development | 4 | games, gamedev |
| git | 1 | git, version-control |
| mcp-dev-team | 7 | mcp, development |
| modernization | 3 | modernization, legacy |
| obsidian-ops-team | 8 | obsidian, notes |
| ocr-extraction-team | 7 | ocr, extraction |
| performance-testing | 5 | performance, testing |
| podcast-creator-team | 11 | podcast, audio |
| programming-languages | 11 | languages, programming |
| realtime | 1 | realtime, streaming |
| security | 5 | security, audit |
| web-tools | 6 | web, tools |

### ⌨️ Commands (20 categorías, 217 plantillas)

| Categoría | Items | Tags |
|-----------|-------|------|
| automation | 4 | automation |
| database | 8 | database |
| deployment | 11 | deployment, ci-cd |
| documentation | 10 | docs |
| game-development | 5 | games |
| git | 5 | git |
| git-workflow | 10 | git, workflow |
| marketing | 5 | marketing |
| nextjs-vercel | 10 | nextjs, vercel |
| orchestration | 12 | orchestration |
| performance | 10 | performance |
| project-management | 18 | project, management |
| security | 6 | security |
| setup | 15 | setup, init |
| simulation | 10 | simulation |
| svelte | 16 | svelte, frontend |
| sync | 14 | sync |
| team | 14 | team, collaboration |
| testing | 14 | testing |
| utilities | 20 | utilities, tools |

### 🎯 Skills (10 categorías, 255 plantillas)

| Categoría | Items | Tags |
|-----------|-------|------|
| business-marketing | 12 | business, marketing |
| creative-design | 9 | creative, design |
| database | 1 | database |
| development | 56 | development |
| document-processing | 7 | documents |
| enterprise-communication | 17 | enterprise, comms |
| media | 2 | media |
| productivity | 12 | productivity |
| scientific | 136 | scientific, research |
| utilities | 3 | utilities |

### 📁 Templates (6 lenguajes)

| Lenguaje | Descripción |
|----------|-------------|
| go | Plantillas para proyectos Go |
| java | Plantillas para proyectos Java |
| javascript | Plantillas para proyectos JavaScript |
| python | Plantillas para proyectos Python |
| ruby | Plantillas para proyectos Ruby |
| rust | Plantillas para proyectos Rust |

---

## Regenerar Catálogo

Para actualizar el catálogo tras cambios en AgentLoreSDK:

```bash
# Desde raíz del workspace
node scripts/scan-agent-lore-templates.js > .github/plugins/agent-creator/index/catalog.json
```

> **Nota**: El script de escaneo está pendiente de implementación. El catálogo actual fue generado manualmente en la sesión AGENT-TEMPLATES-1.0.0.

---

## Referencias

- **Fuente**: [escrivivir-co/mcp-agent-lore-sdk](https://github.com/escrivivir-co/mcp-agent-lore-sdk)
- **Submódulo**: `AgentLoreSDK/` (#18 en workspace)
- **Protocolo**: Ver PLUGINS.md § "Caso de Uso: Integración de Catálogos Externos via MCP"
- **Épica**: AGENT-TEMPLATES-1.0.0
