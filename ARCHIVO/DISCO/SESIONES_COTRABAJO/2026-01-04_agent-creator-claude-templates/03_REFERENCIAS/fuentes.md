# Fuentes y Referencias

## Documentación del Scriptorium

| Fuente | Ruta | Relevancia |
|--------|------|------------|
| PLUGINS.md | `.github/PLUGINS.md` | Caso de uso catálogos externos |
| agent-creator manifest | `.github/plugins/agent-creator/manifest.md` | Plugin a modificar |
| crear-agente.prompt | `.github/plugins/agent-creator/prompts/crear-agente.prompt.md` | Flujo a extender |
| indice-dry.instructions | `plugins/scriptorium-pack/instructions/indice-dry.instructions.md` | Reglas de ubicación |

## Submódulo Instalado

| Recurso | Ubicación |
|---------|-----------|
| mcp-agent-lore-sdk | `AgentLoreSDK/` (submódulo #18) |
| CLI Tool (contenido) | `AgentLoreSDK/cli-tool/` |
| URL remoto | https://github.com/escrivivir-co/mcp-agent-lore-sdk |
| Rama | `integration/beta/scriptorium` |

## Estructura del Catálogo (mcp-agent-lore-sdk)

```
AgentLoreSDK/
├── .claude/                    # Configuración Claude
├── .claude-plugin/             # Plugin Claude
├── api/                        # API backend
├── cli-tool/                   # ← CONTENIDO PRINCIPAL
│   ├── components/
│   │   ├── agents/
│   │   │   ├── ai-specialists/
│   │   │   ├── api-graphql/
│   │   │   ├── blockchain-web3/
│   │   │   ├── business-marketing/
│   │   │   ├── data-ai/
│   │   │   ├── database/
│   │   │   ├── deep-research-team/
│   │   │   ├── development-team/
│   │   │   ├── development-tools/
│   │   │   ├── devops-infrastructure/
│   │   │   ├── documentation/
│   │   │   ├── expert-advisors/
│   │   │   ├── ffmpeg-clip-team/
│   │   │   ├── game-development/
│   │   │   ├── git/
│   │   │   ├── mcp-dev-team/
│   │   │   ├── modernization/
│   │   │   ├── obsidian-ops-team/
│   │   │   ├── ocr-extraction-team/
│   │   │   ├── performance-testing/
│   │   │   ├── podcast-creator-team/
│   │   │   ├── programming-languages/
│   │   │   ├── realtime/
│   │   │   ├── security/
│   │   │   └── web-tools/
│   │   ├── commands/           # 20 categorías
│   │   ├── skills/             # 10 categorías
│   │   ├── mcps/               # MCP servers
│   │   ├── hooks/              # Git hooks
│   │   ├── sandbox/            # Sandbox configs
│   │   └── settings/           # Settings templates
│   └── templates/              # Templates por lenguaje
│       ├── common/
│       ├── go/
│       ├── javascript-typescript/
│       ├── python/
│       ├── ruby/
│       └── rust/
├── database/                   # Supabase/DB
├── docs/                       # Documentación
└── docu/                       # Docs adicionales
```

## Links Externos

- [mcp-agent-lore-sdk (GitHub)](https://github.com/escrivivir-co/mcp-agent-lore-sdk)
- [Anthropic Claude Code Docs](https://docs.anthropic.com/claude/docs)
