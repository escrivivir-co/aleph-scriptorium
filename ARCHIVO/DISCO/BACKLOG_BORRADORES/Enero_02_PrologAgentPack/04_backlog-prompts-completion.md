# Backlog: MCP Prolog Prompts Completion

> **Épica**: PROLOG-PROMPTS-1.0.0 ✅  
> **Fecha**: 2026-01-03  
> **Cerrado**: 2026-01-03  
> **Origen**: Análisis de completitud del ecosistema MCP Stack  
> **Prerrequisitos**: PROLOG-CLIENT-GEN-1.0.0 ✅  
> **Guía de referencia**: [guia-arquitectura-mcp-stack.md](guia-arquitectura-mcp-stack.md)

---

## Resumen Ejecutivo

### Estado Final del Ecosistema ✅

| Componente | Implementado | En Pack JSON | Gap |
|------------|--------------|--------------|-----|
| **Tools** | 12 ✅ | 12 ✅ | 0 |
| **Resources** | 6 ✅ | 6 ✅ | 0 |
| **Prompts** | 8 ✅ | 8 ✅ | 0 |

### Objetivo

Completar el ecosistema MCP Prolog con:
1. **Prompts nativos** implementados en el servidor (no solo declarados en pack)
2. **Nuevos prompts** que cubran todos los flujos de uso identificados
3. **Resources adicionales** para soportar prompts contextuales
4. **Alineamiento total** pack ↔ servidor ↔ documentación

---

## Análisis de Gaps

### Prompts Actuales (Solo en Pack, No Implementados)

| Prompt | Declarado | Implementado | Problema |
|--------|-----------|--------------|----------|
| `razonamiento_sbr` | ✅ pack JSON | ❌ servidor | Template genérico, no usa tools reales |
| `validar_coherencia` | ✅ pack JSON | ❌ servidor | Template incompleto |

### Prompts Necesarios (Nuevos)

| Flujo de Uso | Prompt Propuesto | Tools que Orquesta |
|--------------|------------------|-------------------|
| **Gestión de Sesión** | `session_lifecycle` | create, list, destroy |
| **Carga de Conocimiento** | `load_knowledge_base` | consult_file, load_rules_from_db |
| **Consulta Interactiva** | `interactive_query` | query, list_sessions |
| **Persistencia** | `persist_rule` | save_rule_to_db, assert_fact |
| **Templates SDK** | `use_sdk_template` | list_sdk_templates, get_sdk_template_content |
| **Monitoreo** | `telemetry_check` | get_telemetry_status |
| **Workflow Completo** | `teatro_agent_session` | Todos (orquestación E2E) |

### Resources Adicionales Propuestos

| Resource | URI | Propósito | Justificación |
|----------|-----|-----------|---------------|
| `prolog-rules-catalog` | `prolog://rules/catalog` | Lista de reglas en SQLite | Soporta prompts de persistencia |
| `prolog-sdk-templates` | `prolog://sdk/templates` | Templates del SDK local | Evita llamada a tool |
| `prolog-telemetry` | `prolog://telemetry/current` | Estado de telemetría | Monitoreo sin tools |

---

## Stories

### S01: Implementar Prompts Nativos en MCPPrologServer

**Effort**: 5 pts  
**Prioridad**: 🔴 Alta  

#### Descripción

Añadir método `setupPrompts()` al servidor con todos los prompts declarados.

#### Tasks

| ID | Task | Effort | Criterio de Aceptación |
|----|------|--------|------------------------|
| T01.1 | Crear método `setupPrompts()` en MCPPrologServer | 1 | Método existe y se invoca en constructor |
| T01.2 | Implementar prompt `session_lifecycle` | 0.5 | Prompt retorna instrucciones para gestión de sesión |
| T01.3 | Implementar prompt `load_knowledge_base` | 0.5 | Prompt carga archivo .pl o reglas de BD |
| T01.4 | Implementar prompt `interactive_query` | 0.5 | Prompt guía consultas con contexto de sesión |
| T01.5 | Implementar prompt `persist_rule` | 0.5 | Prompt para guardar reglas en SQLite |
| T01.6 | Implementar prompt `use_sdk_template` | 0.5 | Prompt para seleccionar y aplicar template |
| T01.7 | Implementar prompt `telemetry_check` | 0.5 | Prompt de diagnóstico con telemetría |
| T01.8 | Implementar prompt `teatro_agent_session` | 1 | Workflow E2E para agentes Teatro |

#### Código Esperado (Scaffold)

```typescript
private setupPrompts(): void {
  // Prompt: Session Lifecycle
  this.server.prompt(
    "session_lifecycle",
    "Gestionar ciclo de vida de sesión Prolog",
    {
      action: z.enum(["create", "list", "destroy"]).describe("Acción a realizar"),
      sessionId: z.string().optional().describe("ID de sesión (para create/destroy)"),
      obraId: z.string().optional().describe("ID de obra Teatro (para create)"),
    },
    async ({ action, sessionId, obraId }) => {
      // Generar mensaje con instrucciones contextuales
      const instructions = this.generateSessionInstructions(action, sessionId, obraId);
      return {
        messages: [{
          role: "assistant",
          content: { type: "text", text: instructions },
        }],
      };
    }
  );
  
  // ... más prompts
}
```

---

### S02: Añadir Resources de Soporte

**Effort**: 3 pts  
**Prioridad**: 🟡 Media  

#### Descripción

Implementar 3 resources adicionales que soporten los prompts contextuales.

#### Tasks

| ID | Task | Effort | Criterio de Aceptación |
|----|------|--------|------------------------|
| T02.1 | Implementar resource `prolog-rules-catalog` | 1 | Resource retorna reglas de SQLite |
| T02.2 | Implementar resource `prolog-sdk-templates` | 1 | Resource retorna templates locales |
| T02.3 | Implementar resource `prolog-telemetry` | 1 | Resource retorna estado de sensores |

#### Dependencias

- T02.1 requiere `PrologBackendClient.getAllRules()` ✅ (ya existe)
- T02.2 requiere `PrologBackendClient.getSdkTemplates()` ✅ (ya existe)
- T02.3 requiere `PrologBackendClient.getTelemetryStatus()` ✅ (ya existe)

---

### S03: Actualizar Pack JSON con Prompts Completos

**Effort**: 2 pts  
**Prioridad**: 🟡 Media  

#### Descripción

Sincronizar `AgentPrologBrain.pack.json` con la implementación real del servidor.

#### Tasks

| ID | Task | Effort | Criterio de Aceptación |
|----|------|--------|------------------------|
| T03.1 | Reemplazar prompts actuales por los 8 nuevos | 0.5 | Prompts en pack = prompts en servidor |
| T03.2 | Añadir 3 resources nuevos al pack | 0.5 | Resources en pack = resources en servidor |
| T03.3 | Actualizar versión a 3.0.0 | 0 | Versionado semántico correcto |
| T03.4 | Actualizar examples con nuevos workflows | 0.5 | Ejemplos usan prompts reales |
| T03.5 | Validar pack contra schema | 0.5 | Sin errores de schema |

---

### S04: Documentación y Guía

**Effort**: 2 pts  
**Prioridad**: 🟢 Baja  

#### Descripción

Actualizar guía de arquitectura y crear documentación de prompts.

#### Tasks

| ID | Task | Effort | Criterio de Aceptación |
|----|------|--------|------------------------|
| T04.1 | Añadir sección "Prompts" a guia-arquitectura-mcp-stack.md | 0.5 | Documentados los 8 prompts |
| T04.2 | Crear matriz de alineamiento prompts ↔ tools | 0.5 | Tabla de relaciones clara |
| T04.3 | Actualizar README-SCRIPTORIUM.md de mcp-mesh-sdk | 0.5 | Sección de prompts añadida |
| T04.4 | Actualizar métricas en §6.3 de la guía | 0.5 | Métricas incluyen prompts |

---

### S05: Tests de Integración

**Effort**: 3 pts  
**Prioridad**: 🟡 Media  

#### Descripción

Verificar que prompts funcionan correctamente con Copilot.

#### Tasks

| ID | Task | Effort | Criterio de Aceptación |
|----|------|--------|------------------------|
| T05.1 | Test manual: invocar `session_lifecycle` desde Copilot | 0.5 | Retorna instrucciones correctas |
| T05.2 | Test manual: invocar `teatro_agent_session` E2E | 1 | Workflow completo funciona |
| T05.3 | Verificar resources en VS Code MCP panel | 0.5 | 6 resources visibles |
| T05.4 | Documentar escenarios de test en spike | 0.5 | Reproducibles por otros |
| T05.5 | Smoke test: arrancar servidor sin errores | 0.5 | Sin excepciones en startup |

---

### S06: Handoffs de Prompts en Bridge Agent

**Effort**: 2 pts  
**Prioridad**: 🟡 Media  

#### Descripción

Añadir handoffs para los 8 prompts MCP en el agente bridge `plugin_ox_prologeditor.agent.md`, permitiendo invocación directa desde Copilot Chat.

#### Archivo Target

`.github/agents/plugin_ox_prologeditor.agent.md`

#### Tasks

| ID | Task | Effort | Criterio de Aceptación |
|----|------|--------|------------------------|
| T06.1 | Añadir handoff `Gestionar sesión Prolog` → prompt `session_lifecycle` | 0.25 | Handoff funciona con label descriptivo |
| T06.2 | Añadir handoff `Cargar base de conocimiento` → prompt `load_knowledge_base` | 0.25 | Handoff permite cargar .pl o reglas BD |
| T06.3 | Añadir handoff `Consulta interactiva Prolog` → prompt `interactive_query` | 0.25 | Handoff invoca query con contexto |
| T06.4 | Añadir handoff `Persistir regla` → prompt `persist_rule` | 0.25 | Handoff guarda en SQLite |
| T06.5 | Añadir handoff `Usar template SDK` → prompt `use_sdk_template` | 0.25 | Handoff lista y aplica templates |
| T06.6 | Añadir handoff `Verificar telemetría` → prompt `telemetry_check` | 0.25 | Handoff consulta estado de sensores |
| T06.7 | Añadir handoff `Sesión agente Teatro` → prompt `teatro_agent_session` | 0.25 | Handoff inicia workflow E2E |
| T06.8 | Actualizar sección "Capacidades" del agente | 0.25 | Documenta nuevos prompts MCP |

#### Código Esperado (Handoffs YAML)

```yaml
handoffs:
  # ... handoffs existentes ...
  
  # === MCP Prompts (v3.0.0) ===
  - label: Gestionar sesión Prolog
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'session_lifecycle' para crear, listar o destruir una sesión Prolog. Acciones: create, list, destroy."
    send: false
  - label: Cargar base de conocimiento
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'load_knowledge_base' para cargar un archivo .pl o reglas desde la base de datos SQLite."
    send: false
  - label: Consulta interactiva Prolog
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'interactive_query' para ejecutar consultas Prolog con contexto de sesión activa."
    send: false
  - label: Persistir regla
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'persist_rule' para guardar una regla Prolog en la base de datos SQLite."
    send: false
  - label: Usar template SDK
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'use_sdk_template' para listar y aplicar templates Prolog del SDK."
    send: false
  - label: Verificar telemetría
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'telemetry_check' para consultar el estado de telemetría y sensores IoT."
    send: false
  - label: Sesión agente Teatro
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'teatro_agent_session' para iniciar un workflow E2E de agente Teatro con razonamiento Prolog."
    send: false
```

---

## Resumen de Effort

| Story | Descripción | Effort |
|-------|-------------|--------|
| S01 | Implementar Prompts Nativos | 5 pts |
| S02 | Añadir Resources de Soporte | 3 pts |
| S03 | Actualizar Pack JSON | 2 pts |
| S04 | Documentación | 2 pts |
| S05 | Tests de Integración | 3 pts |
| S06 | Handoffs en Bridge Agent | 2 pts |
| **TOTAL** | | **17 pts** |

---

## Diagrama de Flujo de Prompts

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PROMPTS → TOOLS ORCHESTRATION                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  session_lifecycle ───┬──► prolog_create_session                        │
│                       ├──► prolog_list_sessions                         │
│                       └──► prolog_destroy_session                       │
│                                                                         │
│  load_knowledge_base ─┬──► prolog_consult_file                          │
│                       └──► prolog_load_rules_from_db                    │
│                                                                         │
│  interactive_query ───┬──► prolog_query                                 │
│                       └──► [resource: prolog-session-state]             │
│                                                                         │
│  persist_rule ────────┬──► prolog_assert_fact                           │
│                       └──► prolog_save_rule_to_db                       │
│                                                                         │
│  use_sdk_template ────┬──► prolog_list_sdk_templates                    │
│                       └──► prolog_get_sdk_template_content              │
│                                                                         │
│  telemetry_check ─────┬──► prolog_get_telemetry_status                  │
│                       └──► [resource: prolog-telemetry]                 │
│                                                                         │
│  teatro_agent_session ──► ALL TOOLS (E2E orchestration)                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Estado Post-Implementación

### Métricas Objetivo

| Métrica | Antes | Después |
|---------|-------|---------|
| Tools | 12 | 12 (sin cambios) |
| Resources | 3 | **6** (+3) |
| Prompts (implementados) | 0 | **8** (+8) |
| Prompts (en pack) | 2 | **8** (+6) |
| Cobertura Prompt→Tool | 0% | **100%** |

### Estructura Final del Pack (v3.0.0)

```json
{
  "id": "AgentPrologBrain",
  "version": "3.0.0",
  "tools": 12,      // Sin cambios
  "resources": 6,   // +3 nuevos
  "prompts": 8      // +6 nuevos (2 reemplazados)
}
```

---

## Criterios de Aceptación Global

- [ ] Todos los prompts declarados en pack están implementados en servidor
- [ ] Todos los resources declarados en pack están implementados en servidor
- [ ] Prompts son invocables desde VS Code Copilot Chat
- [ ] Resources son legibles desde VS Code MCP panel
- [ ] Documentación actualizada refleja estado real
- [ ] Métricas de §6.3 en guía actualizadas
- [ ] Pack validado contra schema sin errores
- [ ] Build exitoso: core-sdk → mesh-sdk

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-03 | Creación del backlog | @scrum |

---

## Referencias

| Documento | Path |
|-----------|------|
| Guía de Arquitectura | `guia-arquitectura-mcp-stack.md` |
| Pack Actual | `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` |
| Servidor | `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` |
| Base Server | `MCPGallery/mcp-mesh-sdk/src/BaseMCPServer.ts` |
| Spike Original | `spike-prolog-mcp-tools.md` |
