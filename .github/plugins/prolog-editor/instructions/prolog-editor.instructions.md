---
name: Prolog Editor Stack
description: Instrucciones para el Stack MCP Prolog completo - 4 capas alineadas con 12 tools, 6 resources, 8 prompts.
applyTo: "ARCHIVO/PLUGINS/PROLOG_EDITOR/**/*.pl, ARCHIVO/PLUGINS/PROLOG_EDITOR/**/*.md, .github/plugins/prolog-editor/**/*.md, PrologEditor/**/*.ts, MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts"
---

# Instrucciones: Stack MCP Prolog

> **Fuente de verdad**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md`  
> **Versión Stack**: 2.0.0 (PROLOG-DRY-1.0.0)  
> **Pack MCP**: AgentPrologBrain.pack.json v3.0.0

---

## 1. Arquitectura de 4 Capas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STACK MCP PROLOG v2.0.0                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CAPA 1: UI Angular (:5001)          CAPA 2: Backend REST (:8000)           │
│  └── PrologEditor/frontend/          └── PrologEditor/backend/              │
│      └── 7 componentes                   └── 12 endpoints                   │
│                                                                             │
│  CAPA 3: MCP Server (:3006)          CAPA 4: SDK Core (tipos)               │
│  └── MCPGallery/mcp-mesh-sdk/        └── MCPGallery/mcp-core-sdk/           │
│      └── 12 tools + 6 res + 8 prompts    └── Tipos DRY 100%                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Puertos Estándar

| Servicio | Puerto | Directorio |
|----------|--------|------------|
| Frontend Angular | **5001** | `PrologEditor/frontend/` |
| Backend REST | **8000** | `PrologEditor/backend/` |
| MCP Prolog Server | **3006** | `MCPGallery/mcp-mesh-sdk/` |
| MCP Launcher | 3050 | `MCPGallery/mcp-mesh-sdk/` |

---

## 2. Setup del Stack

### Opción A: VS Code Tasks (Recomendado)

```
Ctrl+Shift+B → APB: Start Full Stack
```

### Opción B: Terminales Manuales

```bash
# Terminal 1: MCP Servers
cd MCPGallery/mcp-mesh-sdk && npm run start:launcher

# Terminal 2: Backend
cd PrologEditor/backend && npm run start:dev

# Terminal 3: Frontend
cd PrologEditor/frontend && npm start
```

### Verificación

```bash
# MCP Server (12 tools)
curl http://localhost:8000/api/mcp-templates

# Backend (sessions)
curl http://localhost:8000/api/sessions

# Frontend
curl http://localhost:5001 | grep PrologEditor
```

---

## 3. Matriz de Alineamiento (12 Tools)

### Tools Core (7) - Motor SWI-Prolog

| Tool MCP Server | Endpoint REST | Service Frontend | UI Component |
|-----------------|---------------|------------------|--------------|
| `prolog_create_session` | `POST /sessions` | `createSession()` | SessionManager |
| `prolog_list_sessions` | `GET /sessions` | `listSessions()` | SessionManager |
| `prolog_destroy_session` | `DELETE /sessions/:id` | `destroySession()` | SessionManager |
| `prolog_query` | `POST /run-rule` | `runRule()` | RuleEditor |
| `prolog_assert_fact` | `POST /assert` | `assertFact()` | KnowledgeBase |
| `prolog_consult_file` | `POST /consult` | `consultFile()` | KnowledgeBase |
| `prolog_get_templates` | `GET /mcp-templates` | `getMcpTemplates()` | TemplatesBrowser |

### Tools Backend-Integrated (5) - SQLite via PrologBackendClient

| Tool MCP Server | Endpoint REST | Service Frontend | UI Component |
|-----------------|---------------|------------------|--------------|
| `prolog_load_rules_from_db` | `GET /rules` | `getAllRules()` | RuleList |
| `prolog_save_rule_to_db` | `POST /rules` | `saveRule()` | RuleEditor |
| `prolog_list_sdk_templates` | `GET /sdk-templates` | `getSdkTemplates()` | RuleEditor |
| `prolog_get_sdk_template_content` | `GET /template/:name` | `getSdkTemplateContent()` | RuleEditor |
| `prolog_get_telemetry_status` | `GET /telemetry/status` | `getTelemetryStatus()` | TelemetryMonitor |

> **Regla de Alineamiento**: Toda tool DEBE estar implementada en las 4 capas para considerarse completa.

---

## 4. Componentes UI (7)

| Componente | Tab | Endpoints que Consume |
|------------|-----|----------------------|
| **SessionManagerComponent** | Sessions | `/sessions` (GET, POST, DELETE) |
| **RuleEditorComponent** | Editor | `/rules`, `/run-rule`, `/sdk-templates` |
| **RuleListComponent** | Editor | `/rules/:app`, `/rules/:id` |
| **KnowledgeBaseComponent** | Knowledge | `/assert`, `/consult` |
| **McpTemplatesBrowserComponent** | Templates | `/mcp-templates` |
| **TelemetryProcessComponent** | Telemetry | `/telemetry/process` |
| **TelemetryMonitorComponent** | Telemetry | `/telemetry/status` |
| **BrainEditorComponent** | 🧠 Brain | (generador visual, no consume API) |

---

## 5. MCP Prompts (8 Workflows)

| Prompt | Descripción | Tools Orquestadas |
|--------|-------------|-------------------|
| `session_lifecycle` | Crear/listar/destruir sesiones | create, list, destroy |
| `load_knowledge_base` | Cargar conocimiento | consult_file, load_rules_from_db |
| `interactive_query` | Consultas con contexto | query + resource session-state |
| `persist_rule` | Guardar reglas | assert_fact, save_rule_to_db |
| `use_sdk_template` | Explorar templates SDK | list_sdk_templates, get_content |
| `telemetry_check` | Monitoreo IoT | get_telemetry_status |
| `razonamiento_sbr` | Sensor-Based Reasoning | query, load_rules, telemetry |
| `teatro_agent_session` | Workflow E2E Teatro | **Todos** |

---

## 6. MCP Resources (6)

| Resource | URI | Fuente |
|----------|-----|--------|
| `prolog-session-state` | `prolog://sessions/current` | SessionManager |
| `prolog-templates-catalog` | `prolog://templates/catalog` | Templates locales |
| `prolog-active-sessions` | `prolog://sessions` | SessionManager |
| `prolog-rules-catalog` | `prolog://rules/catalog` | SQLite |
| `prolog-sdk-templates` | `prolog://sdk/templates` | Backend |
| `prolog-telemetry` | `prolog://telemetry/current` | IoT Backend |

---

## 7. Casos de Uso por Actor

### UC-OX: Setup del Stack

| UC | Nombre | Trigger |
|----|--------|---------|
| UC-OX-001 | Verificar Prerequisitos | `@ox verificar stack prolog` |
| UC-OX-002 | Levantar Stack Completo | `@ox levantar prolog` |
| UC-OX-003 | Diagnosticar Estado | `@ox diagnosticar prolog` |

### UC-DEV: Developer (UI)

| UC | Nombre | Tab |
|----|--------|-----|
| UC-DEV-001 | Gestionar Sesiones | Sessions |
| UC-DEV-002 | Escribir Reglas | Editor |
| UC-DEV-003 | Ejecutar Queries | Editor |
| UC-DEV-004 | Explorar Templates | Templates |
| UC-DEV-005 | Assert Hechos | Knowledge |

### UC-IOT: IoT Engineer

| UC | Nombre | Tab |
|----|--------|-----|
| UC-IOT-001 | Enviar Telemetría | Telemetry |
| UC-IOT-002 | Monitorear Sensores | Telemetry |
| UC-IOT-003 | Razonamiento SBR | Editor + Telemetry |

### UC-DRAMA: Dramaturgo (Teatro)

| UC | Nombre | Tab |
|----|--------|-----|
| UC-DRAMA-001 | Crear Brain Personaje | 🧠 Brain |
| UC-DRAMA-002 | Definir Reglas Comportamiento | 🧠 Brain |
| UC-DRAMA-003 | Exportar .brain.pl | 🧠 Brain |

### UC-AGENT: Agente Personaje (Runtime)

| UC | Nombre | Protocol |
|----|--------|----------|
| UC-AGENT-001 | Iniciar Sesión | MCP |
| UC-AGENT-002 | Cargar Brain | MCP |
| UC-AGENT-003 | Decidir Acción | MCP Query |
| UC-AGENT-004 | Persistir Estado | MCP |

---

## 8. Restricciones de Entorno

### Imports Prohibidos en Frontend

| Módulo | Razón | Alternativa |
|--------|-------|-------------|
| `socket.io` | Node.js internals | `socket.io-client` |
| `fs`, `path` | Node.js only | N/A |
| `swipl-stdio` | Ejecutable local | Via MCP Server |
| `better-sqlite3` | Native bindings | Via REST API |

### Imports Seguros (Isomórficos)

```typescript
// ✅ CORRECTO: Usar subpath /browser
import type { PrologSession } from '@alephscript/mcp-core-sdk/browser';

// ❌ INCORRECTO: Arrastra dependencias Node.js
// import type { PrologSession } from '@alephscript/mcp-core-sdk/types';
```

### tsconfig.json Frontend

```jsonc
{
  "compilerOptions": {
    "skipLibCheck": true  // OBLIGATORIO
  }
}
```

---

## 9. Checklist de Alineamiento

### Al Añadir Nueva Tool MCP

- [ ] Tool definida en MCPPrologServer con schema Zod
- [ ] Método wrapper en MCPPrologClient (backend)
- [ ] Endpoint REST expuesto en api.routes.ts
- [ ] Método HTTP en PrologService (frontend)
- [ ] Componente UI que la consume
- [ ] Documentada en OpenAPI spec
- [ ] Tipos en mcp-core-sdk (si compartidos)

### Validación de Cierre

```bash
# Build chain completo
cd MCPGallery/mcp-core-sdk && npm run build
cd ../mcp-mesh-sdk && npm run build
cd ../../PrologEditor/backend && npm run build
cd ../frontend && npm run build
```

---

## 10. Antipatrones

| ❌ Antipatrón | Síntoma | ✅ Corrección |
|---------------|---------|---------------|
| Tipos duplicados | Interface en 2+ lugares | Mover a core-sdk |
| Socket en frontend | Error TS1192: Module "http" | Usar `/browser` + skipLibCheck |
| Tool sin REST | Funciona en Copilot, no en app | Añadir endpoint |
| Ciclo MCP infinito | MCP → Backend → MCP | Usar PrologBackendClient |

---

## 11. Ubicaciones
---

## 11. Ubicaciones

| Tipo | Ruta |
|------|------|
| Plugin code | `.github/plugins/prolog-editor/` |
| Plugin data | `ARCHIVO/PLUGINS/PROLOG_EDITOR/` |
| Templates locales | `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/` |
| Reglas usuario | `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/` |
| Brains Teatro | `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/*.brain.pl` |
| Frontend | `PrologEditor/frontend/` |
| Backend | `PrologEditor/backend/` |
| MCP Server | `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` |
| SDK Core | `MCPGallery/mcp-core-sdk/` |
| Guía Arquitectura | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md` |
| OpenAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` |
| Use Cases | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-*.yaml` |
| Pack MCP | `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` |
| VS Code Tasks | `.vscode/tasks.json` (prefijo `APB:`) |

---

## 12. Convenciones de Código Prolog

### Nombres de Predicados
- `snake_case` para predicados públicos
- Prefijo `do_` para acciones con efectos secundarios
- Prefijo `get_` para consultas puras
- Prefijo `is_` para predicados booleanos

### Aridad
- Último argumento para resultado (`Resultado`)
- Primer argumento para contexto (`Requester`, `Estado`)

### Ejemplo
```prolog
do_start(Requester, Resultado) :-
    get_estado_actual(Estado),
    (   Estado = parado
    ->  set_estado(corriendo),
        format(atom(Resultado), 'Iniciado por ~w', [Requester])
    ;   format(atom(Resultado), 'No se puede iniciar desde ~w', [Estado])
    ).
```

---

## 13. Integración con BlocklyEditor

### Bloques Soportados para Transpilación

| Bloque Blockly | Mapeo Prolog |
|----------------|--------------|
| `controls_if` | `( Cond -> Then ; Else )` |
| `controls_repeat` | Recursión con contador |
| `logic_compare` | Operadores `=`, `\=`, `<`, `>` |
| `logic_operation` | `and` → `,`, `or` → `;` |
| `variables_get` | Variable Prolog (mayúscula) |
| `variables_set` | `asserta/retract` |

---

## 14. Integración con AGENT_CREATOR

### Campo en Receta
```json
{
  "name": "agente-logico",
  "base": ["blueflag"],
  "prologRules": {
    "file": "ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/agente-logico.pl",
    "entryPoint": "decidir/2"
  }
}
```

---

## 15. Integración con Teatro (ARG_BOARD)

### Brain para Personaje
```prolog
:- module(brain_lucas, [
    rol/2,
    especialidad/2,
    decidir_accion/2,
    conoce/2
]).

rol(lucas, scrum_master).
especialidad(lucas, gestion_indices).

conoce(lucas, funcional_md).
conoce(lucas, tecnico_md).

decidir_accion(lucas, Accion) :-
    contexto(Contexto),
    regla_lucas(Contexto, Accion), !.

regla_lucas(inicio, presentarse).
regla_lucas(buscar_informacion, consultar_indice).
regla_lucas(desconocido, delegar_ox).
```

### Condición en Estadio
```json
{
  "id": 5,
  "nombre": "La Prueba",
  "conditionProlog": {
    "file": "templates/obra-conditions.pl",
    "predicate": "puede_avanzar(Usuario, 5)"
  },
  "conditionFallback": "return true;"
}
```

---

## 16. Métricas de Alineamiento

| Métrica | Objetivo | Estado Actual |
|---------|----------|---------------|
| Tools con cliente Backend | 100% | 12/12 ✅ |
| Endpoints REST | 100% | 12/12 ✅ |
| Métodos en Frontend Service | 100% | 12/12 ✅ |
| Componentes UI (Core) | ≥80% | 7/7 ✅ |
| Tipos DRY en core-sdk | ≥70% | 100% ✅ |
| Prompts implementados | 100% | 8/8 ✅ |
| Resources implementados | 100% | 6/6 ✅ |

---

## 17. Referencias

| Recurso | Descripción |
|---------|-------------|
| [Guía Arquitectura MCP](../../../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md) | Protocolo DRY para el stack |
| [SWI-Prolog Manual](https://www.swi-prolog.org/pldoc/) | Documentación oficial |
| [Learn Prolog Now!](http://www.learnprolognow.org/) | Tutorial introductorio |
| [Plugin BlocklyEditor](../../blockly-editor/) | Transpilación visual |
| [Plugin AGENT_CREATOR](../../agent-creator/) | Creación de agentes |
| [Plugin Teatro](../../teatro/) | Obras interactivas |

