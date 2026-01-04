# Casos de Uso — Demo UI PrologEditor

> **Fuente**: [guia-arquitectura-mcp-stack.md](../../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md)  
> **Extracción**: 2026-01-04

---

## Arquitectura de Referencia

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Angular UI  │ ──► │ Backend REST│ ──► │ MCP Server  │
│ (frontend/) │     │ (backend/)  │     │ (mcp-mesh/) │
└─────────────┘     └─────────────┘     └─────────────┘
    :5001               :8000              :3006
```

---

## Componentes UI a Demostrar

| # | Tab | Componente | Ruta |
|---|-----|------------|------|
| 1 | Sessions | `SessionManagerComponent` | `components/session-manager/` |
| 2 | Editor | `RuleEditorComponent` | `components/rule-editor/` |
| 3 | Knowledge | `KnowledgeBaseComponent` | `components/knowledge-base/` |
| 4 | Templates | `McpTemplatesBrowserComponent` | `components/mcp-templates-browser/` |
| 5 | Telemetry | `TelemetryProcessComponent` | `components/telemetry-process/` |
| 6 | 🧠 Brain | `BrainEditorComponent` | `components/brain-editor/` |

---

## Matriz de Tools (12)

### Tools Core (7) — Invocan SWI-Prolog

| Tool MCP | Endpoint REST | UI Component |
|----------|---------------|--------------|
| `prolog_create_session` | `POST /api/sessions` | SessionManager |
| `prolog_list_sessions` | `GET /api/sessions` | SessionManager |
| `prolog_destroy_session` | `DELETE /api/sessions/:id` | SessionManager |
| `prolog_query` | `POST /api/run-rule` | RuleEditor |
| `prolog_assert_fact` | `POST /api/assert` | KnowledgeBase |
| `prolog_consult_file` | `POST /api/consult` | KnowledgeBase |
| `prolog_get_templates` | `GET /api/mcp-templates` | McpTemplatesBrowser |

### Tools Backend-Integrated (5) — Acceden SQLite

| Tool MCP | Endpoint REST | Propósito |
|----------|---------------|-----------|
| `prolog_load_rules_from_db` | `GET /api/rules` | Cargar reglas de SQLite |
| `prolog_save_rule_to_db` | `POST /api/rules` | Persistir regla |
| `prolog_list_sdk_templates` | `GET /api/sdk-templates` | Templates del SDK |
| `prolog_get_sdk_template_content` | `GET /api/sdk-templates/:id` | Contenido de template |
| `prolog_get_telemetry_status` | `GET /api/telemetry/status` | Estado IoT |

---

## Flujo de Demo Propuesto

| Paso | Tab | Acción | Tool | Datos de Prueba |
|------|-----|--------|------|-----------------|
| 1 | Sessions | Crear sesión | `create_session` | — |
| 2 | Sessions | Listar sesiones | `list_sessions` | — |
| 3 | Editor | Query `member(X,[1,2,3])` | `query` | `member(X,[1,2,3])` |
| 4 | Knowledge | Assert `persona(maria)` | `assert_fact` | `persona(maria)` |
| 5 | Knowledge | Consultar archivo | `consult_file` | `ejemplos/hechos.pl` |
| 6 | Templates | Ver templates MCP | `get_templates` | — |
| 7 | Templates | Listar SDK templates | `list_sdk_templates` | — |
| 8 | Templates | Ver contenido template | `get_sdk_template_content` | `agent-session` |
| 9 | Knowledge | Cargar reglas DB | `load_rules_from_db` | app: `demo` |
| 10 | Knowledge | Guardar regla | `save_rule_to_db` | regla nueva |
| 11 | Telemetry | Ver estado | `get_telemetry_status` | — |
| 12 | Sessions | Destruir sesión | `destroy_session` | session_id |

---

## Queries de Prueba Sugeridas

### Para RuleEditor (Paso 3)

```prolog
% Query simple con backtracking
member(X, [1,2,3]).

% Query con aritmética
X is 2 + 3.

% Query con unificación
append([1,2], [3,4], L).
```

### Para KnowledgeBase (Pasos 4-5)

```prolog
% Hechos a assertar
persona(maria).
persona(juan).
amigo(maria, juan).

% Consulta posterior
persona(X).
amigo(X, Y).
```

---

## Referencias Adicionales

- [Épica PROLOG-UI-2.0.0](../../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/02_backlog-ui-refactor.md)
- [Épica TEATRO-PROLOG-1.0.0](../../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/05_backlog-teatro-prolog-integration.md)
