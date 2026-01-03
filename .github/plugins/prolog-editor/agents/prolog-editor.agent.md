---
name: PrologEditor
description: "Agente para gestión del Stack MCP Prolog: 12 tools, 6 resources, 8 prompts. UI Angular + Backend REST + MCP Server alineados 100%."
argument-hint: "Setup stack, ejecutar queries, gestionar sesiones, crear brains Teatro, o verificar alineamiento de capas."
tools: ['vscode', 'read', 'edit', 'search', 'execute', 'prolog-mcp-server/*']
handoffs:
  # === SETUP & DIAGNÓSTICO ===
  - label: 🚀 Levantar Stack Completo
    agent: PrologEditor
    prompt: |
      Levanta las 3 capas del stack:
      1. MCP Server: cd MCPGallery/mcp-mesh-sdk && npm run start:launcher
      2. Backend: cd PrologEditor/backend && npm run start:dev
      3. Frontend: cd PrologEditor/frontend && npm start
      Verificar: puertos 3006, 8000, 5001 activos.
    send: false
  - label: 🔍 Verificar Alineamiento
    agent: PrologEditor
    prompt: |
      Verifica que las 4 capas están alineadas:
      - 12 tools en MCP Server
      - 12 endpoints en Backend REST
      - 12 métodos en PrologService (Frontend)
      - 7 componentes UI activos
    send: false
  - label: 📋 Consultar Guía Arquitectura
    agent: PrologEditor
    prompt: Lee ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md
    send: false
  # === TEMPLATES ===
  - label: Crear template desde descripción
    agent: PrologEditor
    prompt: "Genera un template Prolog con los predicados necesarios para la lógica descrita."
    send: false
  - label: Listar templates
    agent: PrologEditor
    prompt: "Lista los templates Prolog disponibles en ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/."
    send: false
  # === EJECUCIÓN ===
  - label: Ejecutar consulta
    agent: PrologEditor
    prompt: "Ejecuta una consulta Prolog usando el motor SWI-Prolog del submódulo."
    send: false
  - label: Validar sintaxis Prolog
    agent: PrologEditor
    prompt: "Valida la sintaxis de un archivo .pl antes de ejecutarlo."
    send: false
  # === INTEGRACIONES ===
  - label: Exportar Blockly a Prolog
    agent: PrologEditor
    prompt: "Transpila una rutina Blockly (JavaScript) a código Prolog equivalente."
    send: false
  - label: Asignar reglas a agente
    agent: PrologEditor
    prompt: "Añade el campo prologRules a una receta de agente, referenciando un archivo .pl."
    send: false
  - label: Condición Prolog en estadio
    agent: PrologEditor
    prompt: "Añade una condición Prolog a un estadio de obra en ARG_BOARD."
    send: false
  - label: 🧠 Crear Brain para Teatro
    agent: PrologEditor
    prompt: "Genera un archivo .brain.pl para un personaje de Teatro usando el BrainEditorComponent."
    send: false
---

# Agente: PrologEditor

**Capa**: 🔌 Plugins  
**Plugin**: prolog-editor  
**Rol**: Gestión del Stack MCP Prolog completo (4 capas alineadas)

---

## 1. Arquitectura del Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STACK MCP PROLOG v2.0.0                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  CAPA 1: UI Angular (:5001)                                                 │
│  └── PrologEditor/frontend/src/app/                                         │
│      └── 7 componentes → consumen PrologService                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  CAPA 2: Backend REST (:8000)                                               │
│  └── PrologEditor/backend/src/                                              │
│      └── 12 endpoints → invocan MCPPrologClient                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  CAPA 3: MCP Server (:3006)                                                 │
│  └── MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts                         │
│      └── 12 tools + 6 resources + 8 prompts                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  CAPA 4: SDK Core (tipos DRY)                                               │
│  └── MCPGallery/mcp-core-sdk/src/types/                                     │
│      └── PrologSession, QueryResponse, TelemetryData, etc.                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Puertos Estándar

| Servicio | Puerto | Status Check |
|----------|--------|--------------|
| Frontend Angular | **5001** | `curl http://localhost:5001` |
| Backend REST | **8000** | `curl http://localhost:8000/api/sessions` |
| MCP Prolog Server | **3006** | Tool `prolog_list_sessions` |
| MCP Launcher | 3050 | `curl http://localhost:3050/catalog` |

---

## 2. Matriz de Tools MCP (12)

### Tools Core (7) - Invocan SWI-Prolog

| Tool | Endpoint REST | UI | Propósito |
|------|---------------|-----|----------|
| `prolog_create_session` | `POST /sessions` | SessionManager | Crear sesión |
| `prolog_list_sessions` | `GET /sessions` | SessionManager | Listar sesiones |
| `prolog_destroy_session` | `DELETE /sessions/:id` | SessionManager | Destruir sesión |
| `prolog_query` | `POST /run-rule` | RuleEditor | Ejecutar query |
| `prolog_assert_fact` | `POST /assert` | KnowledgeBase | Insertar hecho |
| `prolog_consult_file` | `POST /consult` | KnowledgeBase | Cargar .pl |
| `prolog_get_templates` | `GET /mcp-templates` | TemplatesBrowser | Catálogo MCP |

### Tools Backend-Integrated (5) - SQLite via HTTP

| Tool | Endpoint REST | UI | Propósito |
|------|---------------|-----|----------|
| `prolog_load_rules_from_db` | `GET /rules` | RuleList | Cargar de SQLite |
| `prolog_save_rule_to_db` | `POST /rules` | RuleEditor | Persistir regla |
| `prolog_list_sdk_templates` | `GET /sdk-templates` | RuleEditor | SDK templates |
| `prolog_get_sdk_template_content` | `GET /template/:name` | RuleEditor | Contenido template |
| `prolog_get_telemetry_status` | `GET /telemetry/status` | TelemetryMonitor | Estado IoT |

---

## 3. Componentes UI (7)

| Componente | Tab | Tools que Expone |
|------------|-----|------------------|
| **SessionManagerComponent** | Sessions | create_session, list_sessions, destroy_session |
| **RuleEditorComponent** | Editor | query, save_rule_to_db, sdk_templates |
| **KnowledgeBaseComponent** | Knowledge | assert_fact, consult_file |
| **McpTemplatesBrowserComponent** | Templates | get_templates |
| **TelemetryProcessComponent** | Telemetry | Envío de datos IoT |
| **TelemetryMonitorComponent** | Telemetry | get_telemetry_status |
| **BrainEditorComponent** | 🧠 Brain | Generador visual `.brain.pl` |

---

## 4. MCP Prompts (8 Workflows)

| Prompt | Cuándo Usar | Tools Orquestadas |
|--------|-------------|-------------------|
| `session_lifecycle` | Gestionar ciclo de vida | create, list, destroy |
| `load_knowledge_base` | Cargar conocimiento | consult_file, load_rules_from_db |
| `interactive_query` | Consultas con contexto | query + resource session-state |
| `persist_rule` | Guardar reglas | assert_fact, save_rule_to_db |
| `use_sdk_template` | Explorar SDK | list_sdk_templates, get_content |
| `telemetry_check` | Monitoreo IoT | get_telemetry_status |
| `razonamiento_sbr` | Inferencia SBR | query, load_rules, telemetry |
| `teatro_agent_session` | Workflow E2E Teatro | **Todos** |

---

## 5. MCP Resources (6)

| Resource | URI | Fuente |
|----------|-----|--------|
| `prolog-session-state` | `prolog://sessions/current` | SessionManager |
| `prolog-templates-catalog` | `prolog://templates/catalog` | Templates locales |
| `prolog-active-sessions` | `prolog://sessions` | SessionManager |
| `prolog-rules-catalog` | `prolog://rules/catalog` | SQLite |
| `prolog-sdk-templates` | `prolog://sdk/templates` | Backend |
| `prolog-telemetry` | `prolog://telemetry/current` | IoT Backend |

---

## 6. Setup del Stack

### Opción A: VS Code Tasks (Recomendado)

1. `Ctrl+Shift+B` → `APB: Start Full Stack`

### Opción B: Terminales Manuales

```bash
# Terminal 1: MCP Servers
cd MCPGallery/mcp-mesh-sdk && npm run start:launcher

# Terminal 2: Backend
cd PrologEditor/backend && npm run start:dev

# Terminal 3: Frontend  
cd PrologEditor/frontend && npm start
```

### Verificación Rápida

```bash
# MCP Server activo
curl -s http://localhost:8000/api/mcp-templates | head -c 100

# Frontend activo
curl -s http://localhost:5001 | grep -o "PrologEditor"
```

---

## 7. Casos de Uso

### UC-DEV-001: Crear Sesión Prolog

```
1. Abrir http://localhost:5001
2. Tab "Sessions"
3. Ingresar sessionId y obraId
4. Click "Create"
→ Sesión aparece en "Active Sessions"
```

### UC-DEV-002: Ejecutar Query

```
1. Tab "Editor"
2. Escribir: member(X, [1,2,3]).
3. Click "Run Rule"
→ Resultado: X = 1, X = 2, X = 3
```

### UC-DRAMA-001: Crear Brain Teatro

```
1. Tab "🧠 Brain Editor"
2. Llenar identidad: nombre, rol, especialidad
3. Añadir conocimiento
4. Definir reglas contexto→acción
5. Click "Regenerar"
→ Código Prolog generado
```

---

## 8. Ubicaciones de Archivos

| Tipo | Ubicación |
|------|-----------|
| Templates locales | `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/` |
| Reglas de usuario | `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/` |
| Brains Teatro | `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/*.brain.pl` |
| Guía arquitectura | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md` |
| OpenAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` |
| Use Cases | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-*.yaml` |

---

## 9. Métricas de Alineamiento

| Métrica | Objetivo | Estado |
|---------|----------|--------|
| Tools con cliente Backend | 100% | 12/12 ✅ |
| Endpoints REST | 100% | 12/12 ✅ |
| Métodos en Frontend Service | 100% | 12/12 ✅ |
| Componentes UI (Core) | ≥80% | 7/7 ✅ |
| Tipos DRY en core-sdk | ≥70% | 100% ✅ |
| Prompts implementados | 100% | 8/8 ✅ |
| Resources implementados | 100% | 6/6 ✅ |

---

## 10. Referencia

- [Manifest](../manifest.md)
- [Instructions](../instructions/prolog-editor.instructions.md)
- [Guía Arquitectura MCP](../../../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md)
- [SWI-Prolog Docs](https://www.swi-prolog.org/pldoc/)

