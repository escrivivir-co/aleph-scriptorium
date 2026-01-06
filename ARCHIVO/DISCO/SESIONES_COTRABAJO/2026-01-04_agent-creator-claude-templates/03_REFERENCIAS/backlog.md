# Referencias de Backlog

> Extracto relevante para esta sesión de cotrabajo

## Épica: AGENT-TEMPLATES-1.0.0

**Nombre**: Integración Claude Code Templates en Agent Creator  
**Effort estimado**: 13 puntos (complejidad M)  
**Sprint**: FC1

### Contexto

El Product Owner solicita integrar el catálogo de `mcp-agent-lore-sdk` (Claude Code Templates) en el flujo de creación de agentes del plugin `agent-creator`.

### Fuente del Catálogo

**Submódulo**: `AgentLoreSDK`  
**URL**: https://github.com/escrivivir-co/mcp-agent-lore-sdk

```
AgentLoreSDK/cli-tool/
├── components/
│   ├── agents/         # 25 categorías
│   ├── commands/       # 20 categorías
│   ├── skills/         # 10 categorías
│   ├── mcps/           # MCP servers
│   └── hooks/          # Git hooks
└── templates/          # 6 lenguajes
```

### Caso de Uso Documentado en PLUGINS.md

Ver sección "Caso de Uso: Integración de Catálogos Externos via MCP" en [PLUGINS.md](../../../../.github/PLUGINS.md).

### Stories Propuestas

| # | Story | Puntos |
|---|-------|--------|
| S1 | Estructura de symlink y acceso | 3 |
| S2 | Índice navegable (catalog.json) | 3 |
| S3 | Integración en flujo crear-agente | 5 |
| S4 | Documentación PLUGINS.md | 2 |

**Total**: 13 puntos
