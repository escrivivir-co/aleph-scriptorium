# Acta T006: Plan de Pruebas E2E del Stack MCP Prolog

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 006 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 |
| **Fin** | — (plan en curso) |
| **Estado final** | 📋 PLAN PROPUESTO |

---

## Contexto Leído

- T001: Convocatoria con agenda de 10 turnos
- T002: Diagnóstico técnico de @ox (guardarraíles, tasks APB)
- T003: Validación DRY de @indice (12/12 tools alineados, drift <5%)
- T004: Estado épicas de @scrum (todas ✅, sesión es refinamiento)
- Guía de arquitectura: `guia-arquitectura-mcp-stack.md` (v1.7.0)

---

## Aportación: Plan de Pruebas E2E

### 1. Objetivo de las Pruebas

Verificar que **las 4 capas del stack** funcionan E2E:

```
┌─────────────────────────────────────────────────────────┐
│  [Angular UI :5001] → [Backend :8000] → [MCP :3006]     │
│          ▲                                   │          │
│          └───────────── response ────────────┘          │
└─────────────────────────────────────────────────────────┘
```

### 2. Secuencia de Turnos Propuesta

> Solicito que @aleph orqueste la asignación de estos turnos.

#### Fase 0: Arranque de Servicios (Pre-requisito)

| Turno | Agente | Responsabilidad | Quedará como |
|-------|--------|-----------------|--------------|
| T006 | @prologeditor | Este plan | — |
| T007 | @aleph | Ejecutar `APB: Start Full Stack` + Health Check | **Custodio de servicios** |

> **Custodio**: @aleph quedará pendiente durante toda la sesión para resolver problemas de infraestructura. Los agentes que encuentren problemas de conexión deben referirse a @aleph.

#### Fase 1: Pruebas de Tools Core (7 tools)

| Sub-turno | Agente | Tools a Probar | Vía |
|-----------|--------|----------------|-----|
| T008a | @prologeditor | `create_session`, `list_sessions`, `destroy_session` | MCP Tool + UI |
| T008b | @prologeditor | `query` (runRule) | MCP Tool + UI |
| T008c | @prologeditor | `assert_fact`, `consult_file` | MCP Tool + UI |
| T008d | @prologeditor | `get_templates` | MCP Tool + UI |

#### Fase 2: Pruebas de Tools Backend-Integrated (5 tools)

| Sub-turno | Agente | Tools a Probar | Vía |
|-----------|--------|----------------|-----|
| T009a | @prologeditor | `load_rules_from_db`, `save_rule_to_db` | MCP Tool → PrologBackendClient |
| T009b | @prologeditor | `list_sdk_templates`, `get_sdk_template_content` | MCP Tool → PrologBackendClient |
| T009c | @prologeditor | `get_telemetry_status` | MCP Tool → PrologBackendClient |

#### Fase 3: Pruebas de Resources (6 resources)

| Sub-turno | Agente | Resources a Probar | URI |
|-----------|--------|-------------------|-----|
| T010 | @prologeditor | Todos los resources | `prolog://sessions/*`, `prolog://templates/*`, `prolog://rules/*` |

#### Fase 4: Pruebas de Prompts (8 prompts)

| Sub-turno | Agente | Prompts a Probar | Orquesta |
|-----------|--------|------------------|----------|
| T011a | @plugin_ox_teatro | `teatro_agent_session` | Workflow E2E Teatro |
| T011b | @prologeditor | `session_lifecycle`, `load_knowledge_base` | Tools de sesión |
| T011c | @prologeditor | `interactive_query`, `persist_rule` | Tools de query/persistencia |
| T011d | @prologeditor | `use_sdk_template`, `telemetry_check` | Tools de templates/telemetry |
| T011e | @prologeditor | `razonamiento_sbr` | Sensor-Based Reasoning |

#### Fase 5: Cierre

| Turno | Agente | Responsabilidad |
|-------|--------|-----------------|
| T012 | @scrum | Consolidar hallazgos en backlog |
| T013 | @aleph | Cierre + próximos pasos |

---

### 3. Agentes Involucrados y Roles

| Agente | Rol en Pruebas | Estado Esperado |
|--------|----------------|-----------------|
| **@aleph** | Orquestador + Custodio de infraestructura | 🔧 CUSTODIO |
| **@prologeditor** | Facilitador de pruebas E2E | ✍️ WRITING |
| **@plugin_ox_teatro** | Pruebas Teatro + BrainEditor | ⏳ WAITING |
| **@plugin_ox_agentcreator** | Verificar generación de .brain.pl | ⏳ WAITING |
| **@ox** | Auditoría de problemas técnicos | 🔍 ON-CALL |
| **@indice** | Validar que hallazgos se documenten DRY | 🔍 ON-CALL |
| **@scrum** | Tracking de resultados | ⏳ WAITING |

### 4. Matriz de Pruebas Detallada (Checklist)

#### 4.1 Tools Core

| Tool | MCP OK? | Backend OK? | UI OK? | Notas |
|------|---------|-------------|--------|-------|
| `prolog_create_session` | ⬜ | ⬜ | ⬜ | SessionManager |
| `prolog_list_sessions` | ⬜ | ⬜ | ⬜ | SessionManager |
| `prolog_destroy_session` | ⬜ | ⬜ | ⬜ | SessionManager |
| `prolog_query` | ⬜ | ⬜ | ⬜ | RuleEditor |
| `prolog_assert_fact` | ⬜ | ⬜ | ⬜ | KnowledgeBase |
| `prolog_consult_file` | ⬜ | ⬜ | ⬜ | KnowledgeBase |
| `prolog_get_templates` | ⬜ | ⬜ | ⬜ | McpTemplatesBrowser |

#### 4.2 Tools Backend-Integrated

| Tool | MCP OK? | PrologBackendClient OK? | REST OK? | Notas |
|------|---------|------------------------|----------|-------|
| `prolog_load_rules_from_db` | ⬜ | ⬜ | ⬜ | SQLite |
| `prolog_save_rule_to_db` | ⬜ | ⬜ | ⬜ | SQLite |
| `prolog_list_sdk_templates` | ⬜ | ⬜ | ⬜ | SDK |
| `prolog_get_sdk_template_content` | ⬜ | ⬜ | ⬜ | SDK |
| `prolog_get_telemetry_status` | ⬜ | ⬜ | ⬜ | IoT |

#### 4.3 Resources

| Resource | Accesible? | Contenido válido? | Notas |
|----------|------------|-------------------|-------|
| `prolog-session-state` | ⬜ | ⬜ | |
| `prolog-templates-catalog` | ⬜ | ⬜ | |
| `prolog-active-sessions` | ⬜ | ⬜ | |
| `prolog-rules-catalog` | ⬜ | ⬜ | |
| `prolog-sdk-templates` | ⬜ | ⬜ | |
| `prolog-telemetry` | ⬜ | ⬜ | |

#### 4.4 Prompts

| Prompt | Ejecutable? | Tools orquestados? | Resultado útil? | Notas |
|--------|-------------|-------------------|-----------------|-------|
| `session_lifecycle` | ⬜ | ⬜ | ⬜ | |
| `load_knowledge_base` | ⬜ | ⬜ | ⬜ | |
| `interactive_query` | ⬜ | ⬜ | ⬜ | |
| `persist_rule` | ⬜ | ⬜ | ⬜ | |
| `use_sdk_template` | ⬜ | ⬜ | ⬜ | |
| `telemetry_check` | ⬜ | ⬜ | ⬜ | |
| `razonamiento_sbr` | ⬜ | ⬜ | ⬜ | |
| `teatro_agent_session` | ⬜ | ⬜ | ⬜ | E2E Teatro |

---

### 5. Dependencias y Pre-requisitos

| Pre-requisito | Verificación | Responsable |
|---------------|--------------|-------------|
| MCP Launcher corriendo en :3050 | `APB: Health Check` | @aleph |
| MCP Prolog corriendo en :3006 | `APB: Health Check` | @aleph |
| Backend REST corriendo en :8000 | `APB: Health Check` | @aleph |
| Frontend Angular corriendo en :5001 | `APB: Health Check` | @aleph |
| Sesión Prolog creada | Tool `create_session` | @prologeditor |
| Base de conocimiento cargada | Tool `consult_file` | @prologeditor |

---

### 6. Protocolo de Escalamiento

Si un agente encuentra un problema:

| Problema | Escalar a | Acción |
|----------|-----------|--------|
| Servicio caído | @aleph (Custodio) | Reiniciar servicio |
| Tool no responde | @ox | Auditoría técnica |
| Tipo no alineado | @indice | Verificar Funcional.md/Tecnico.md |
| Backlog desactualizado | @scrum | Actualizar borrador |

---

## Preguntas para @aleph (Orquestador)

- [ ] ¿Apruebas la secuencia de turnos propuesta?
- [ ] ¿Puedes ejecutar `APB: Start Full Stack` y confirmar Health Check?
- [ ] ¿Confirmas tu rol como **Custodio de infraestructura** durante las pruebas?
- [ ] ¿Prefieres ejecutar todas las fases en esta sesión o dividir en múltiples sesiones?

---

## Siguiente Turno Sugerido

**@aleph** para:
1. Aprobar plan de pruebas
2. Arrancar servicios (APB: Start Full Stack)
3. Confirmar Health Check ✅ en los 4 puertos
4. Asignar turnos a agentes según plan

---

## Anexo: Comandos de Verificación

```bash
# Health Check manual
curl http://localhost:3050/health  # MCP Launcher
curl http://localhost:3006/health  # MCP Prolog
curl http://localhost:8000/api/health  # Backend REST
curl -s -o /dev/null -w '%{http_code}' http://localhost:5001  # Frontend

# Test Query básica
curl -X POST http://localhost:8000/api/run-rule \
  -H "Content-Type: application/json" \
  -d '{"rule":"member(X, [1,2,3])"}'

# Listar tools MCP
curl http://localhost:3006/tools | jq '.tools[].name'
```
