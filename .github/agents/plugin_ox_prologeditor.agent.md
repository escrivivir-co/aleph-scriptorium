---
name: plugin_ox_prologeditor
description: "Bridge: Stack MCP Prolog completo (12 tools, 6 resources, 8 prompts). UI Angular + Backend REST + MCP Server. Lógica declarativa, IoT/SBR, Teatro."
argument-hint: "Setup stack, ejecutar Prolog, gestionar sesiones MCP, o modelar sistemas IoT con paradigma SBR."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'copilot-logs-mcp-server/*', 'prolog-mcp-server/*', 'playwright/*', 'agent', 'todo']

# ═══════════════════════════════════════════════════════════════════════════
# CONOCIMIENTO ESTRUCTURAL — Stack MCP Prolog v2.0.0
# ═══════════════════════════════════════════════════════════════════════════
#
# ARQUITECTURA DE 4 CAPAS:
# ┌─────────────────────────────────────────────────────────────────────────┐
# │  CAPA 1: UI Angular (puerto 5001)                                       │
# │  └── PrologEditor/frontend/src/app/                                     │
# │      └── 7 componentes: Sessions, Editor, Knowledge, Templates,         │
# │          Telemetry, BrainEditor, UserAppDialog                          │
# ├─────────────────────────────────────────────────────────────────────────┤
# │  CAPA 2: Backend REST (puerto 8000)                                     │
# │  └── PrologEditor/backend/src/                                          │
# │      └── 12 endpoints alineados con MCP tools                           │
# ├─────────────────────────────────────────────────────────────────────────┤
# │  CAPA 3: MCP Server (puerto 3006)                                       │
# │  └── MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts                     │
# │      └── 12 tools + 6 resources + 8 prompts                             │
# ├─────────────────────────────────────────────────────────────────────────┤
# │  CAPA 4: SDK Core (tipos compartidos)                                   │
# │  └── MCPGallery/mcp-core-sdk/src/types/                                 │
# │      └── Tipos DRY 100%: PrologSession, QueryResponse, etc.             │
# └─────────────────────────────────────────────────────────────────────────┘
#
# PUERTOS ESTÁNDAR:
#   - Frontend Angular: 5001
#   - Backend REST:     8000  
#   - MCP Prolog:       3006
#   - MCP Launcher:     3050
#
# UBICACIONES:
#   - Plugin code:      .github/plugins/prolog-editor/
#   - Plugin data:      ARCHIVO/PLUGINS/PROLOG_EDITOR/
#   - Submódulo UI+BE:  PrologEditor/
#   - Submódulo MCP:    MCPGallery/mcp-mesh-sdk/
#   - SDK tipos:        MCPGallery/mcp-core-sdk/
#   - Guía arquitectura: ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md
#   - Pack MCP:         .github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json v3.0.0
#   - VS Code Tasks:    .vscode/tasks.json (prefijo APB:)
#
# LECCIONES OPERATIVAS (Cotrabajo 2026-01-03):
#   - NO usar APB: Start Full Stack (tasks compuestas unreliable)
#   - Usar run_task() con tasks individuales en orden
#   - Usar get_task_output() para leer logs (no consola)
#   - Scripts .sh externos para comandos complejos (Windows-safe)
#   - Cache hit rate 0% es normal en sesiones de cotrabajo
#
# ⚠️ NAVEGACIÓN UI (Demo 2026-01-04):
#   - NO usar open_simple_browser → pide confirmación "Allow/Skip" y bloquea
#   - USAR MCP Playwright tools para navegar:
#     - mcp_playwright_browser_navigate({url: "http://localhost:5001"})
#     - mcp_playwright_browser_snapshot() → ver estado de página
#     - mcp_playwright_browser_click({element: "...", ref: "..."}) → interactuar
#   - Activar con: activate_browser_interaction_tools() si no disponibles
#   - Para demos: mostrar snapshots y resultados al PO, NO screenshots
#
# PREREQUISITO CRÍTICO:
#   - SWI-Prolog (swipl) debe estar en PATH
#   - Ver guía-arquitectura-mcp-stack.md § 9 para instalación
#

handoffs:
  # ═══════════════════════════════════════════════════════════════════════
  # SETUP & DIAGNOSTICS — VS Code Tasks (Lecciones Cotrabajo 2026-01-03)
  # ═══════════════════════════════════════════════════════════════════════
  - label: 🚀 Levantar Stack (Tasks Individuales)
    agent: plugin_ox_prologeditor
    prompt: |
      ⚠️ NO usar 'APB: Start Full Stack' (tasks compuestas son unreliable).
      Usar run_task con tasks individuales en orden:
      1. run_task({id: "shell: APB: Start [MCP Launcher]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
      2. run_task({id: "shell: APB: Start [Backend]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
      3. run_task({id: "shell: APB: Start [Frontend]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
      4. Verificar: run_task({id: "shell: APB: Health Check", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
    send: false
  - label: 🩺 Health Check (run_task)
    agent: plugin_ox_prologeditor
    prompt: |
      Verificar stack con script externo (Windows-safe):
      run_task({id: "shell: APB: Health Check", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
      Esperar resultado y usar get_task_output() para ver logs.
    send: false
  - label: 📊 Leer Logs de Task
    agent: plugin_ox_prologeditor
    prompt: |
      Para ver output de una task en ejecución:
      get_task_output({id: "shell: APB: Start [MCP Launcher]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
      Esto evita usar run_in_terminal + consola para leer logs.
    send: false
  - label: 📋 Ver Guía de Arquitectura
    agent: plugin_ox_prologeditor
    prompt: Lee la guía completa de arquitectura en ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md
    send: false
  # ═══════════════════════════════════════════════════════════════════════
  # AGENTE PRINCIPAL
  # ═══════════════════════════════════════════════════════════════════════
  - label: Listar agentes de PrologEditor
    agent: plugin_ox_prologeditor
    prompt: Lista agentes disponibles en el plugin prolog-editor.
    send: false
  - label: Crear template Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Genera un nuevo template Prolog con predicados para el dominio especificado.
    send: false
  - label: Ejecutar consulta Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Ejecuta una consulta Prolog usando el motor SWI-Prolog del submódulo.
    send: false
  - label: Exportar Blockly a Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Transpila una rutina Blockly (JavaScript) a código Prolog equivalente.
    send: false
  - label: Listar templates disponibles
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Lista los templates Prolog disponibles en el sistema.
    send: false
  - label: Importar reglas Prolog
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Importa un archivo .pl al repositorio de reglas del Scriptorium.
    send: false
  - label: Asignar reglas a agente
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Añade el campo prologRules a una receta de agente.
    send: false
  - label: Condición Prolog en estadio
    agent: .github/plugins/prolog-editor/agents/prolog-editor.agent.md
    prompt: Añade una condición Prolog a un estadio de obra en ARG_BOARD.
    send: false
  # ═══════════════════════════════════════════════════════════════════════
  # MCP PROMPTS (v3.0.0) - 8 Workflows Orquestados
  # ═══════════════════════════════════════════════════════════════════════
  - label: 🔄 Gestionar sesión Prolog
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'session_lifecycle' para crear, listar o destruir una sesión Prolog. Acciones disponibles: create (requiere sessionId y obraId), list, destroy (requiere sessionId)."
    send: false
  - label: 📚 Cargar base de conocimiento
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'load_knowledge_base' para cargar conocimiento Prolog. Fuentes: 'file' (requiere path a .pl) o 'database' (carga reglas de SQLite, opcionalmente filtradas por app)."
    send: false
  - label: 🔍 Consulta interactiva Prolog
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'interactive_query' para ejecutar consultas Prolog con contexto de sesión activa. Tipos: simple, findall, aggregate."
    send: false
  - label: 💾 Persistir regla
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'persist_rule' para guardar reglas Prolog. Destinos: 'session' (temporal, usa assert_fact) o 'database' (permanente en SQLite)."
    send: false
  - label: 📋 Usar template SDK
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'use_sdk_template' para explorar y aplicar templates Prolog del SDK. Acciones: 'list' (ver catálogo) o 'get' (obtener contenido de un template)."
    send: false
  - label: 📡 Verificar telemetría IoT
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'telemetry_check' para consultar el estado actual de telemetría y sensores IoT del backend."
    send: false
  - label: 🧠 Razonamiento SBR
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'razonamiento_sbr' para ejecutar razonamiento basado en sensores (Sensor-Based Reasoning). Requiere sessionId con reglas SBR cargadas y un objetivo de inferencia."
    send: false
  - label: 🎭 Sesión agente Teatro (E2E)
    agent: plugin_ox_prologeditor
    prompt: "Usa el prompt MCP 'teatro_agent_session' para iniciar un workflow E2E completo de agente Teatro con razonamiento Prolog. Requiere obraId y agentName."
    send: false
---

# Plugin Ox: PrologEditor

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Bridge para el **Stack MCP Prolog completo**: UI Angular + Backend REST + MCP Server con 12 tools alineadas.

---

## 1. Arquitectura del Stack (4 Capas)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STACK MCP PROLOG v2.0.0                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐             │
│  │ UI Angular    │ ──► │ Backend REST  │ ──► │ MCP Server    │             │
│  │ :5001         │     │ :8000         │     │ :3006         │             │
│  │ 7 components  │     │ 12 endpoints  │     │ 12 tools      │             │
│  └───────────────┘     └───────────────┘     └───────────────┘             │
│         │                     │                     │                       │
│         └─────────────────────┼─────────────────────┘                       │
│                               │                                             │
│                      ┌────────▼────────┐                                    │
│                      │  mcp-core-sdk   │ ← Tipos DRY 100%                   │
│                      └─────────────────┘                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Puertos

| Servicio | Puerto | Directorio |
|----------|--------|------------|
| Frontend Angular | **5001** | `PrologEditor/frontend/` |
| Backend REST | **8000** | `PrologEditor/backend/` |
| MCP Prolog Server | **3006** | `MCPGallery/mcp-mesh-sdk/` |
| MCP Launcher | 3050 | `MCPGallery/mcp-mesh-sdk/` |

---

## 2. Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| PrologEditor | `agents/prolog-editor.agent.md` | Editor y asistente de programación lógica Prolog |

---

## 3. Matriz de Alineamiento (12 Tools)

### Tools Core (7) - Motor SWI-Prolog

| Tool MCP | Endpoint REST | UI Component |
|----------|---------------|--------------|
| `prolog_create_session` | `POST /sessions` | ✅ SessionManager |
| `prolog_list_sessions` | `GET /sessions` | ✅ SessionManager |
| `prolog_destroy_session` | `DELETE /sessions/:id` | ✅ SessionManager |
| `prolog_query` | `POST /run-rule` | ✅ RuleEditor |
| `prolog_assert_fact` | `POST /assert` | ✅ KnowledgeBase |
| `prolog_consult_file` | `POST /consult` | ✅ KnowledgeBase |
| `prolog_get_templates` | `GET /mcp-templates` | ✅ McpTemplatesBrowser |

### Tools Backend-Integrated (5) - SQLite via HTTP

| Tool MCP | Endpoint REST | UI Component |
|----------|---------------|--------------|
| `prolog_load_rules_from_db` | `GET /rules` | ✅ RuleList |
| `prolog_save_rule_to_db` | `POST /rules` | ✅ RuleEditor |
| `prolog_list_sdk_templates` | `GET /sdk-templates` | ✅ RuleEditor (dropdown) |
| `prolog_get_sdk_template_content` | `GET /template/:name` | ✅ RuleEditor |
| `prolog_get_telemetry_status` | `GET /telemetry/status` | ✅ TelemetryMonitor |

---

## 4. MCP Prompts (8 Workflows)

| Prompt | Propósito | Tools Orquestadas |
|--------|-----------|-------------------|
| `session_lifecycle` | Gestión de sesiones | create, list, destroy |
| `load_knowledge_base` | Carga de conocimiento | consult_file, load_rules_from_db |
| `interactive_query` | Consultas interactivas | query |
| `persist_rule` | Persistencia | assert_fact, save_rule_to_db |
| `use_sdk_template` | Templates SDK | list_sdk_templates, get_sdk_template_content |
| `telemetry_check` | Estado IoT | get_telemetry_status |
| `razonamiento_sbr` | SBR | query, load_rules, telemetry |
| `teatro_agent_session` | Workflow E2E Teatro | **Todos** |

---

## 5. MCP Resources (6)

| Resource | URI |
|----------|-----|
| `prolog-session-state` | `prolog://sessions/current` |
| `prolog-templates-catalog` | `prolog://templates/catalog` |
| `prolog-active-sessions` | `prolog://sessions` |
| `prolog-rules-catalog` | `prolog://rules/catalog` |
| `prolog-sdk-templates` | `prolog://sdk/templates` |
| `prolog-telemetry` | `prolog://telemetry/current` |

---

## 6. Componentes UI (7)

| Componente | Tab | Funcionalidad |
|------------|-----|---------------|
| SessionManagerComponent | Sessions | Crear/listar/destruir sesiones |
| RuleEditorComponent | Editor | Escribir/ejecutar reglas |
| KnowledgeBaseComponent | Knowledge | Assert facts, consult files |
| McpTemplatesBrowserComponent | Templates | Explorar catálogo MCP |
| TelemetryProcessComponent | Telemetry | Testing IoT |
| BrainEditorComponent | 🧠 Brain Editor | Generar `.brain.pl` para Teatro |
| UserAppSaveDialogComponent | (Modal) | Guardar apps de usuario |

---

## 7. Gestión de Procesos con VS Code Tasks

> **Fuente DRY**: Lecciones operativas en `.github/plugins/prolog-editor/agents/prolog-editor.agent.md` § 10-11

### 7.1. Principio: run_task > run_in_terminal

| ❌ Antipatrón | ✅ Patrón Correcto |
|---------------|--------------------|
| `run_in_terminal("cd ... && npm start")` | `run_task({id: "shell: APB: Start [Backend]"})` |
| Usar `APB: Start Full Stack` | Ejecutar 3 tasks individuales en orden |
| Leer logs con `cat` o `tail` | `get_task_output({id: "...", workspaceFolder: "..."})` |

### 7.2. Secuencia de Arranque (Copiar/Pegar)

```javascript
// 1. MCP Launcher (incluye Prolog Server :3006)
run_task({id: "shell: APB: Start [MCP Launcher]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})

// 2. Backend REST (:8000)
run_task({id: "shell: APB: Start [Backend]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})

// 3. Frontend Angular (:5001)
run_task({id: "shell: APB: Start [Frontend]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})

// 4. Verificar (script externo Windows-safe)
run_task({id: "shell: APB: Health Check", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
```

### 7.3. Lectura de Logs (Sin Consola)

```javascript
// Ver output de task en background
get_task_output({id: "shell: APB: Start [MCP Launcher]", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})

// Ver output de health check
get_task_output({id: "shell: APB: Health Check", workspaceFolder: "c:/Users/aleph/OASIS/aleph-scriptorium"})
```

### 7.4. Tasks Disponibles (Prefijo APB:)

| Task ID | Puerto | Propósito |
|---------|--------|----------|
| `shell: APB: Start [MCP Launcher]` | 3050, 3006 | Launcher + Prolog Server |
| `shell: APB: Start [Backend]` | 8000 | REST API Express |
| `shell: APB: Start [Frontend]` | 5001 | Angular Dev Server |
| `shell: APB: Health Check` | — | Verificar 4 servicios |
| `shell: APB: Test Query` | — | Query Prolog de prueba |
| `shell: APB: Open Browser` | — | Abrir http://localhost:5001 |
| `shell: APB: Stop All` | — | Detener procesos Node |

### 7.5. ⚠️ Lección Crítica: Tasks Compuestas

**NO usar `APB: Start Full Stack`**. Las tasks con `dependsOrder: sequence` no funcionan correctamente cuando los dependientes tienen `isBackground: true`.

**Razón técnica**: VS Code no espera a que un servicio background esté "listo", solo a que se lance. El siguiente servicio puede arrancar antes de que el anterior esté escuchando.

---

## 8. Lecciones Operativas (DRY)

> **Fuente completa**: `.github/plugins/prolog-editor/agents/prolog-editor.agent.md` § 10-11

### Resumen Ejecutivo

| Principio | Aplicación |
|-----------|------------|
| **Documentar ANTES de ejecutar** | Crear acta → ejecutar → actualizar |
| **Usar VS Code Tasks** | `run_task` + `get_task_output`, no `run_in_terminal` |
| **Scripts externos** | Bash largo → archivo `.sh` (Windows-safe) |
| **Cache hit 0% es normal** | En cotrabajo, cada turno tiene contexto diferente |

### Antipatrones a Evitar

| Código | Antipatrón | Corrección |
|--------|------------|------------|
| AP-01 | Lecturas redundantes | Verificar si ya está en contexto |
| AP-02 | Diagnóstico por prueba y error | Consultar @indice primero |
| AP-03 | Respuestas verbosas | Solo lo que el usuario pidió |
| AP-04 | Exploración sin caché | Usar snapshots como memoria |

### Auto-Reflexión (Herramientas MCP)

```javascript
// Check periódico (cada 10-15 requests)
mcp_copilot-logs-_get_usage_metrics({hoursBack: 1})

// Si healthScore < 60
mcp_copilot-logs-_analyze_session()

// Preservar contexto (cada 30-60 min)
mcp_copilot-logs-_capture_snapshot({name: "descripcion-tarea"})
```

---

## 9. Referencia

| Recurso | Ubicación |
|---------|-----------|
| Guía Arquitectura | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md` |
| Manifest Plugin | `.github/plugins/prolog-editor/manifest.md` |
| Pack MCP | `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` |
| OpenAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` |
| Use Cases | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-*.yaml` |

