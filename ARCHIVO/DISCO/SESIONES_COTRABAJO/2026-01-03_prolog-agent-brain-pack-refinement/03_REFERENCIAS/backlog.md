# Referencias de Backlog

> **Épicas relacionadas con esta sesión**

---

## PROLOG-DRY-1.0.0 — Tipado DRY Completo

**Estado**: ✅ Completado  
**Objetivo**: Single Source of Truth para tipos en las 4 capas del stack.

### Logros (12/12 frontend)

| Componente | Tipos DRY | Estado |
|------------|-----------|--------|
| SessionManagerComponent | ✅ | Usa `PrologSession` de core-sdk |
| RuleEditorComponent | ✅ | Usa `QueryResponse` de core-sdk |
| KnowledgeBaseComponent | ✅ | Usa `ConsultResult` de core-sdk |
| McpTemplatesBrowserComponent | ✅ | Usa `Template` de core-sdk |
| TelemetryProcessComponent | ✅ | Usa `TelemetryData` de core-sdk |
| TelemetryMonitorComponent | ✅ | Usa `TelemetryStatus` de core-sdk |
| BrainEditorComponent | ✅ | Usa `BrainTemplate` de core-sdk |

---

## TEATRO-PROLOG-1.0.0 — Integración Teatro + Prolog

**Estado**: ✅ Completado (13 pts)  
**Objetivo**: Permitir que personajes del Teatro usen cerebros Prolog.

### Componentes Entregados

- **BrainEditorComponent**: UI para crear `.brain.pl`
- **BrainTemplate (tipo)**: Definición de estructura de brain
- **Lucas ejemplo**: `lucas-prolog.brain.pl` funcional

### Casos de Uso Validados

1. ✅ Crear brain para personaje
2. ✅ Cargar brain en sesión MCP
3. ✅ Ejecutar queries del personaje
4. ✅ Integrar con obras de Teatro

---

## PROLOG-UI-2.0.0 — Refactor UI

**Estado**: ✅ Completado (7/7 tools)  
**Objetivo**: Todos los tools MCP accesibles desde UI Angular.

### Mapeo Tool → Componente

| Tool | Componente UI |
|------|---------------|
| `create_session` | SessionManagerComponent |
| `list_sessions` | SessionManagerComponent |
| `destroy_session` | SessionManagerComponent |
| `query` | RuleEditorComponent |
| `assert_fact` | KnowledgeBaseComponent |
| `consult_file` | KnowledgeBaseComponent |
| `get_templates` | McpTemplatesBrowserComponent |
| `load_rules_from_db` | (via RuleEditor) |
| `save_rule_to_db` | RuleEditorComponent |
| `list_sdk_templates` | RuleEditorComponent |
| `get_sdk_template_content` | RuleEditorComponent |
| `get_telemetry_status` | TelemetryMonitorComponent |

---

## Fuente Principal

→ [guia-arquitectura-mcp-stack.md](../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md)
