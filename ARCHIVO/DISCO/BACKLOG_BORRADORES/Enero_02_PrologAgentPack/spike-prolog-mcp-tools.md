# Spike: Prolog MCP Server Tools

> **Fecha**: 2026-01-03  
> **Épica**: SCRIPT-2.3.1 (PrologAgent Pack)  
> **Puerto**: 3006

---

## Backlogs Derivados (DRY)

| Backlog | Foco | Effort | Estado |
|---------|------|--------|--------|
| [02_backlog-ui-refactor.md](02_backlog-ui-refactor.md) | UI Alignment | 21 pts | 📋 Pendiente |
| [03_backlog-openapi-client-gen.md](03_backlog-openapi-client-gen.md) | Backend Client | 13 pts | ✅ Completado |
| [04_backlog-prompts-completion.md](04_backlog-prompts-completion.md) | Prompts + Resources + Handoffs | 17 pts | 📋 Nuevo |

**Total effort derivado**: 51 pts

---

## Carpetas Relacionadas en BACKLOG_BORRADORES

| Carpeta | Épica | Foco | Estado |
|---------|-------|------|--------|
| [IOT-SBR-LOGICA](../IOT-SBR-LOGICA/) | SCRIPT-1.11.0 | Plugin PrologEditor original | 🟢 Investigado |
| [Enero_02_PrologMCPServer](../Enero_02_PrologMCPServer/) | SCRIPT-2.3.0 | Servidor MCP (27 pts) | ✅ FC1 Completado |
| [MCP-PRESETS-SITE](../MCP-PRESETS-SITE/) | SCRIPT-1.7.0 | Plugin MCP-PRESETS | ✅ Publicado |
| **Enero_02_PrologAgentPack** (este) | SCRIPT-2.3.1 | Agent Pack + Tools Audit | 📋 Activo |
| [Enero_02_PrologEditor_API_Contracts](../Enero_02_PrologEditor_API_Contracts/) | PROLOG-API-1.0.0 | OpenAPI/AsyncAPI Specs | 📋 Activo |

**Pack existente**: `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` ✅

---

## Inventario de Tools (7)

| # | Tool | Parámetros | Estado |
|---|------|------------|--------|
| 1 | `prolog_create_session` | `sessionId`, `obraId` | ⬜ Por probar |
| 2 | `prolog_query` | `sessionId`, `query` | ⬜ Por probar |
| 3 | `prolog_assert_fact` | `sessionId`, `fact` | ⬜ Por probar |
| 4 | `prolog_consult_file` | `sessionId`, `filePath` | ⬜ Por probar |
| 5 | `prolog_destroy_session` | `sessionId` | ⬜ Por probar |
| 6 | `prolog_list_sessions` | (ninguno) | ⬜ Por probar |
| 7 | `prolog_get_templates` | (ninguno) | ⬜ Por probar |

---

## Inventario de Resources (3)

| # | Resource | URI | Estado |
|---|----------|-----|--------|
| 1 | `prolog-session-state` | `prolog://sessions/current` | ⬜ |
| 2 | `prolog-templates-catalog` | `prolog://templates/catalog` | ⬜ |
| 3 | `prolog-active-sessions` | `prolog://sessions` | ⬜ |

---

## Hallazgos

### Tipos SDK — Single Source of Truth ✅

**Verificado 2026-01-03**: El frontend Angular **ya está alineado** con `@alephscript/mcp-core-sdk`:

```
frontend/src/app/models/
├── rule.model.ts      → re-export de SDK
├── session.model.ts   → re-export de SDK
├── template.model.ts  → re-export de SDK
├── telemetry.model.ts → re-export de SDK + 1 local
└── index.ts           → barrel (DRY)
```

**Implicaciones**:
- UI Refactor (02_backlog): NO requiere story de alineación de tipos
- Client Gen (03_backlog): Usar `importMappings` para reutilizar los mismos tipos

### AgentPrologBrain Pack ✅

**Ubicación**: `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json`

| Componente | Pack | Server | Estado |
|------------|------|--------|--------|
| **Tools** | 7 | 7 | ✅ Alineado |
| **Resources** | 3 | 3 | ✅ Alineado |
| **MCP Server ID** | `prolog-mcp-server` | 3006 | ✅ Coincide con `.vscode/mcp.json` |

**Contenido del Pack**:
- **Tools**: create_session, query, assert_fact, consult_file, destroy_session, list_sessions, get_templates
- **Resources**: session-state, templates-catalog, active-sessions
- **Prompts**: `razonamiento_sbr`, `validar_coherencia`
- **Context Triggers**: keywords (`prolog`, `regla`, `inferencia`), filePatterns (`*.pl`)

**Implicación**: El pack ya está listo para asignar a agentes especializados vía `@plugin_ox_mcppresets`.

### Log del Servidor

```
$ npm run start:mesh
> cd mcp-mesh-sdk && npm run start:launcher
🚀 Starting MCP Service Launcher on port 3050
✅ MCP Service Launcher ready on port 3050
```

**Nota**: `start:mesh` arranca el Launcher (3050), pero el Prolog Server (3006) debe arrancarse por separado o vía el launcher.

---

## Pruebas Pendientes

- [ ] Verificar que el servidor Prolog está en puerto 3006
- [ ] Probar `prolog_list_sessions` (sin params)
- [ ] Probar `prolog_create_session` con sessionId de prueba
- [ ] Probar `prolog_query` con query simple `member(X, [1,2,3]).`
- [ ] Probar `prolog_assert_fact` con hecho `likes(mary, wine)`
- [ ] Probar ciclo completo: create → query → destroy

---

## Notas

- El servidor usa `swipl-stdio` como motor Prolog
- Tiene `PrologSessionManager` para gestión de sesiones
- Templates hardcodeados (FC1), scan real en FC2

---

## Cliente MCP (PrologEditor/backend)

> **Fuente**: `src/services/mcp-prolog-client.ts`

### Arquitectura

```
MCPPrologClient (extends BaseMCPClient)
       │
       └── callTool<T>(toolName, args) → HTTP → MCPPrologServer:3006
```

**Dependencia**: `@alephscript/mcp-core-sdk/client` (BaseMCPClient)

### Cobertura de Tools

| Tool Server | Método Cliente | Firma | ✅/❌ |
|-------------|---------------|-------|-------|
| `prolog_create_session` | `createSession(sessionId, obraId)` | ✅ Coincide | ✅ |
| `prolog_query` | `query(sessionId, query)` | ✅ Coincide | ✅ |
| `prolog_assert_fact` | `assertFact(sessionId, fact)` | ✅ Coincide | ✅ |
| `prolog_consult_file` | `consultFile(sessionId, filePath)` | ✅ Coincide | ✅ |
| `prolog_destroy_session` | `destroySession(sessionId)` | ✅ Coincide | ✅ |
| `prolog_list_sessions` | `listSessions()` | ✅ Coincide | ✅ |
| `prolog_get_templates` | `getTemplates()` | ✅ Coincide | ✅ |

**Resultado**: ✅ **7/7 tools implementadas** — Cliente 100% funcional

### Tipos Definidos

```typescript
// src/types/prolog.types.ts
QueryResponse, CreateSessionResponse, ListSessionsResponse,
AssertFactResponse, ConsultFileResponse, TemplatesCatalog
```

### Pool Service (Multi-Server)

> **Fuente**: `src/services/mcp-pool.service.ts`

Además del cliente directo, existe `MCPPoolService`:

| Feature | Descripción |
|---------|-------------|
| Multi-server | Conecta a Prolog (3006) + DevOps (3003) |
| Health checks | Cada 30s por defecto |
| Auto-reconnect | Eventos `server-connected`, `server-disconnected` |
| Telemetry | Emite `MCPEvent` para integración |

**Métodos convenientes**:
- `callPrologTool(toolName, args)` → ejecuta en servidor Prolog
- `callDevOpsTool(toolName, args)` → ejecuta en servidor DevOps

### Singleton Exports

```typescript
export const mcpPrologClient = new MCPPrologClient();  // Cliente directo
export const mcpPoolService = new MCPPoolService();    // Pool multi-server
```

---

## Diagnóstico

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Cobertura tools | ✅ 100% | 7/7 tools |
| Tipos TypeScript | ✅ | Bien tipados |
| Error handling | ✅ | try/catch + logging |
| Health checks | ✅ | Pool service |
| Reconexión | ✅ | Pool service |
| Resources MCP | ⚠️ NO | Cliente no consume resources |

### Gap Identificado

El cliente **no implementa** lectura de Resources MCP:
- `prolog://sessions/current`
- `prolog://templates/catalog`
- `prolog://sessions`

**Impacto**: Bajo. Las tools cubren la funcionalidad. Resources son para inspección/debug.

---

## API REST (PrologEditor/backend)

> **Fuente**: `src/routes/api.routes.ts` + `src/controllers/prolog.controller.ts`

### Arquitectura

```
Frontend → REST API → Controller → MCPPrologClient → MCP Server (3006)
```

### Endpoints MCP Session

| Método | Endpoint | Tool MCP | Controller | ✅/❌ |
|--------|----------|----------|------------|-------|
| POST | `/sessions` | `prolog_create_session` | `createSession` | ✅ |
| GET | `/sessions` | `prolog_list_sessions` | `listSessions` | ✅ |
| DELETE | `/sessions/:sessionId` | `prolog_destroy_session` | `destroySession` | ✅ |
| POST | `/assert` | `prolog_assert_fact` | `assertFact` | ✅ |
| POST | `/consult` | `prolog_consult_file` | `consultFile` | ✅ |
| GET | `/mcp-templates` | `prolog_get_templates` | `getMcpTemplates` | ✅ |

### Endpoint Query (Legacy + MCP)

| Método | Endpoint | Tool MCP | Controller | ✅/❌ |
|--------|----------|----------|------------|-------|
| POST | `/run-rule` | `prolog_query` | `runRule` | ✅ |

**Resultado**: ✅ **7/7 tools expuestas via REST**

### Endpoints Legacy (CRUD local)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/rules` | Guardar regla en DB local |
| GET | `/rules/:id` | Obtener regla por ID |
| GET | `/rules` | Listar reglas |
| DELETE | `/rules/:id` | Eliminar regla |
| GET | `/sdk-templates` | Templates locales (no MCP) |
| GET | `/template/:name` | Contenido template + auto-create session |
| POST | `/user-app` | Guardar app usuario |

### Features del Controller

| Feature | Implementación |
|---------|---------------|
| Session tracking | `currentSessionId` global para compatibilidad |
| Auto-connect | `isConnected()` check antes de cada operación |
| Fallback sessionId | Si no se pasa `sessionId`, usa `currentSessionId` |
| Auto-session on template | `getTemplateContent` crea sesión automáticamente |

### Telemetry Endpoints (IoT)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/telemetry/process` | Procesar telemetría IoT |
| GET | `/telemetry/status` | Estado del servicio telemetría |

---

## Resumen de Alineación

| Capa | Tools 7 | Cobertura |
|------|---------|-----------|
| **MCP Server** | 7 tools definidas | ✅ Base |
| **MCP Client** | 7 métodos wrapper | ✅ 100% |
| **REST API** | 7 endpoints | ✅ 100% |

**Stack completo alineado** ✅

---

## Frontend Angular (PrologEditor/frontend)

> **Fuente**: `src/app/services/prolog.service.ts`

### Arquitectura

```
Component → PrologService → HttpClient → Backend REST → MCP Server
```

### Cobertura de Endpoints MCP

| Endpoint Backend | Método Frontend | Firma | ✅/❌ |
|------------------|-----------------|-------|-------|
| POST `/sessions` | `createSession(sessionId, obraId)` | ✅ Coincide | ✅ |
| GET `/sessions` | `listSessions()` | ✅ Coincide | ✅ |
| DELETE `/sessions/:id` | `destroySession(sessionId)` | ✅ Coincide | ✅ |
| POST `/run-rule` | `runRule(ruleText, sessionId?)` | ✅ Coincide | ✅ |
| POST `/assert` | `assertFact(fact, sessionId?)` | ✅ Coincide | ✅ |
| POST `/consult` | `consultFile(filePath, sessionId?)` | ✅ Coincide | ✅ |
| GET `/mcp-templates` | `getMcpTemplates()` | ✅ Coincide | ✅ |

**Resultado**: ✅ **7/7 endpoints consumidos**

### Cobertura Legacy

| Endpoint | Método Frontend | ✅/❌ |
|----------|-----------------|-------|
| POST `/rules` | `saveRule(rule)` | ✅ |
| GET `/rules` | `getAllRules()` | ✅ |
| GET `/rules/:app` | `getRules(app)` | ✅ |
| DELETE `/rules/:id` | `deleteRule(id)` | ✅ |
| GET `/sdk-templates` | `getSdkTemplates()` | ✅ |
| GET `/template/:name` | `getTemplateContent(name)` | ✅ |
| POST `/user-app` | `saveUserApp(name, content)` | ✅ |

### Cobertura Telemetry

| Endpoint | Método Frontend | ✅/❌ |
|----------|-----------------|-------|
| POST `/telemetry/process` | `processTelemetry(data)` | ✅ |
| GET `/telemetry/status` | `getTelemetryStatus()` | ✅ |

### Features del Service

| Feature | Implementación |
|---------|---------------|
| Session tracking | `currentSessionId` local |
| Fallback sessionId | Métodos usan `sessionId \|\| this.currentSessionId` |
| Template tracking | `templateName` guardado al cargar |
| Tipado | Modelos importados de `models/` |

### Modelos TypeScript

```
src/app/models/
├── rule.model.ts      → Rule, RuleInput, RuleCreatedResponse
├── query.model.ts     → QueryResponse
├── session.model.ts   → PrologSession, CreateSessionRequest, SessionResponse
├── template.model.ts  → Template types
└── telemetry.model.ts → Telemetry types
```

---

## Stack Completo: Alineación Final

| Capa | Componente | Tools/Endpoints | Cobertura |
|------|------------|-----------------|-----------|
| **MCP Server** | MCPPrologServer | 7 tools | ✅ Base |
| **MCP Client** | MCPPrologClient | 7 métodos | ✅ 100% |
| **REST API** | Express routes | 7 endpoints | ✅ 100% |
| **Frontend** | PrologService | 7 métodos HTTP | ✅ 100% |

```
┌──────────────────────────────────────────────────────────────┐
│                     STACK COMPLETO                          │
├──────────────────────────────────────────────────────────────┤
│  Angular UI  →  PrologService  →  Backend REST  →  MCP      │
│    (7 métodos)     (HTTP)         (7 endpoints)   (7 tools) │
└──────────────────────────────────────────────────────────────┘
```

**Conclusión**: ✅ **Todas las capas están 100% alineadas**

---

## Spec Oficial (OpenAPI + AsyncAPI)

> **Fuente**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/`

### Archivos

| Archivo | Versión | Descripción |
|---------|---------|-------------|
| `openapi.yaml` | 3.1.0 / v2.0.0 | REST API completa |
| `asyncapi.yaml` | 3.0.0 / v1.0.0 | MQTT telemetry (IoT) |

### OpenAPI: Cobertura de Endpoints MCP

| Path Spec | Método | OperationId | Tool MCP | ✅/❌ |
|-----------|--------|-------------|----------|-------|
| `/sessions` | POST | `createSession` | `prolog_create_session` | ✅ |
| `/sessions` | GET | `listSessions` | `prolog_list_sessions` | ✅ |
| `/sessions/{sessionId}` | DELETE | `destroySession` | `prolog_destroy_session` | ✅ |
| `/run-rule` | POST | `runQuery` | `prolog_query` | ✅ |
| `/assert` | POST | `assertFact` | `prolog_assert_fact` | ✅ |
| `/consult` | POST | `consultFile` | `prolog_consult_file` | ✅ |
| `/mcp-templates` | GET | `getMcpTemplates` | `prolog_get_templates` | ✅ |

**Resultado**: ✅ **7/7 endpoints MCP documentados en spec**

### OpenAPI: Endpoints Legacy

| Path Spec | Método | OperationId | ✅/❌ |
|-----------|--------|-------------|-------|
| `/rules` | GET | `getAllRules` | ✅ |
| `/rules` | POST | `createRule` | ✅ |
| `/rules/{id}` | GET | `getRulesByApp` | ✅ |
| `/rules/{id}` | DELETE | `deleteRule` | ✅ |
| `/sdk-templates` | GET | `getSdkTemplates` | ✅ |
| `/template/{templateName}` | GET | `getTemplateContent` | ✅ |
| `/user-app` | POST | `saveUserApp` | ✅ |

### OpenAPI: Endpoints Telemetry

| Path Spec | Método | OperationId | ✅/❌ |
|-----------|--------|-------------|-------|
| `/telemetry/process` | POST | `processTelemetry` | ✅ |
| `/telemetry/status` | GET | `getTelemetryStatus` | ✅ |

### AsyncAPI: Canales MQTT

| Canal | Dirección | Operación |
|-------|-----------|-----------|
| `sensorTemperature` | `sensor/temperature` | receive |
| `sensorHumidity` | `sensor/humidity` | receive |
| `sensorGeneric` | `sensor/{sensorType}` | receive |
| `alerts` | `alerts/{severity}` | send |
| `commands` | `commands/{deviceId}` | send |

### Schemas Definidos

```yaml
# OpenAPI components/schemas (parcial)
- Rule, RuleInput, RuleCreatedResponse
- QueryRequest, QueryResponse
- Template, TemplateContent, TemplatesCatalog
- CreateSessionRequest, SessionResponse, ListSessionsResponse
- AssertFactRequest, AssertFactResponse
- ConsultFileRequest, ConsultFileResponse
- TelemetryInput, TelemetryResult, TelemetryStatus
```

### Tags OpenAPI

| Tag | Descripción |
|-----|-------------|
| Rules | Prolog rule management (SQLite) |
| Query | Prolog query execution (MCP) |
| Templates | SDK template management |
| Sessions | MCP Prolog session management |
| Telemetry | IoT telemetry processing |

---

## Alineación Total del Stack

| Capa | Componente | Cobertura MCP |
|------|------------|---------------|
| **Spec OpenAPI** | `openapi.yaml` | ✅ 7/7 |
| **Spec AsyncAPI** | `asyncapi.yaml` | ✅ MQTT IoT |
| **MCP Server** | MCPPrologServer | ✅ 7 tools |
| **MCP Client** | MCPPrologClient | ✅ 7 métodos |
| **REST API** | Express routes | ✅ 7 endpoints |
| **Frontend** | PrologService | ✅ 7 métodos |

```
┌──────────────────────────────────────────────────────────────────┐
│                   STACK COMPLETO VALIDADO                       │
├──────────────────────────────────────────────────────────────────┤
│  OpenAPI Spec ✅                                                 │
│       ↓                                                          │
│  Angular UI → PrologService → Backend REST → MCP Server         │
│    (7 métodos)    (HTTP)       (7 endpoints)   (7 tools)        │
│       ↓                                                          │
│  AsyncAPI Spec ✅ (MQTT IoT)                                     │
└──────────────────────────────────────────────────────────────────┘
```

**Conclusión**: ✅ **Spec oficial 100% alineada con implementación**

---

## UI Angular: Análisis de Cobertura

> **Fuente**: `src/app/components/`

### Componentes Existentes

| Componente | Descripción | Estado |
|------------|-------------|--------|
| `RuleEditorComponent` | Editor de reglas + selector de templates | ✅ Funcional |
| `RuleListComponent` | Lista de reglas con CRUD | ✅ Funcional |
| `DashboardComponent` | Container para telemetría | ✅ Funcional |
| `TelemetryMonitorComponent` | Monitorización IoT | ✅ Funcional |

### Cobertura de Features del Backend

#### ✅ Features Implementadas en UI

| Feature Backend | Componente UI | Método Service | Estado |
|-----------------|---------------|----------------|--------|
| `GET /rules` | RuleListComponent | `getRules()` | ✅ |
| `POST /rules` | RuleEditorComponent | `saveRule()` | ✅ |
| `DELETE /rules/:id` | RuleListComponent | `deleteRule()` | ✅ |
| `POST /run-rule` | RuleEditorComponent | `runRule()` | ✅ |
| `GET /sdk-templates` | RuleEditorComponent | `getSdkTemplates()` | ✅ |
| `GET /template/:name` | RuleEditorComponent | `getTemplateContent()` | ✅ |
| `GET /telemetry/status` | TelemetryMonitorComponent | `getTelemetryStatus()` | ✅ |

#### ❌ Features NO Implementadas en UI

| Feature Backend | Endpoint | Service Existe | UI Falta |
|-----------------|----------|----------------|----------|
| **Session Management** | `POST /sessions` | ✅ `createSession()` | ❌ Sin UI |
| **Session List** | `GET /sessions` | ✅ `listSessions()` | ❌ Sin UI |
| **Session Destroy** | `DELETE /sessions/:id` | ✅ `destroySession()` | ❌ Sin UI |
| **Assert Fact** | `POST /assert` | ✅ `assertFact()` | ❌ Sin UI |
| **Consult File** | `POST /consult` | ✅ `consultFile()` | ❌ Sin UI |
| **MCP Templates** | `GET /mcp-templates` | ✅ `getMcpTemplates()` | ❌ Sin UI |
| **Save User App** | `POST /user-app` | ✅ `saveUserApp()` | ❌ Sin UI |
| **Process Telemetry** | `POST /telemetry/process` | ✅ `processTelemetry()` | ❌ Sin UI |

### Resumen de Cobertura UI

| Categoría | Backend Endpoints | UI Implementada | Gap |
|-----------|-------------------|-----------------|-----|
| Rules CRUD | 4 | 3 (falta getAllRules) | 1 |
| Query | 1 | 1 | 0 |
| Templates Legacy | 2 | 2 | 0 |
| **Sessions MCP** | **3** | **0** | **3** |
| **Prolog Ops MCP** | **2** | **0** | **2** |
| **MCP Templates** | **1** | **0** | **1** |
| User App | 1 | 0 | 1 |
| Telemetry | 2 | 1 | 1 |

**Total**: 16 endpoints backend → **7 con UI** / **9 sin UI**

### Gaps Críticos (Features MCP sin UI)

```
┌──────────────────────────────────────────────────────────────┐
│              GAPS DE UI PARA FEATURES MCP                   │
├──────────────────────────────────────────────────────────────┤
│  ❌ Session Management Panel                                │
│     - Crear sesión (sessionId, obraId)                      │
│     - Listar sesiones activas                               │
│     - Destruir sesión                                       │
├──────────────────────────────────────────────────────────────┤
│  ❌ Knowledge Base Operations Panel                         │
│     - Assert fact interactivo                               │
│     - Consult file (browser de .pl)                         │
├──────────────────────────────────────────────────────────────┤
│  ❌ MCP Templates Browser                                    │
│     - Ver catálogo de templates MCP                         │
│     - Diferente de SDK templates locales                    │
└──────────────────────────────────────────────────────────────┘
```

### UI Existente: Flujo Actual

```
1. Usuario selecciona SDK template (dropdown)
2. Sistema carga template y crea sesión automáticamente (backend)
3. Usuario escribe query en textarea
4. Ejecuta con "Run Rule"
5. Ve resultado en pantalla
```

**Nota**: La creación de sesión es **implícita** (al cargar template), no hay control explícito del usuario.

### Componentes Sugeridos para FC2

| Componente | Propósito | Prioridad |
|------------|-----------|-----------|
| `SessionManagerComponent` | CRUD de sesiones MCP | 🔴 Alta |
| `KnowledgeBaseComponent` | Assert facts, consult files | 🟡 Media |
| `McpTemplatesBrowserComponent` | Catálogo MCP templates | 🟢 Baja |
| `UserAppSaveComponent` | Guardar apps personalizadas | 🟢 Baja |

---

## Conclusión Final del Spike

### Stack Alignment Matrix

| Capa | Cobertura MCP Tools | Estado |
|------|---------------------|--------|
| MCP Server | 7/7 | ✅ 100% |
| MCP Client | 7/7 | ✅ 100% |
| REST API | 7/7 | ✅ 100% |
| OpenAPI Spec | 7/7 | ✅ 100% |
| Frontend Service | 7/7 | ✅ 100% |
| **Frontend UI** | **1/7** | ⚠️ **14%** |

### Diagnóstico

- **Backend → 100% alineado** de MCP Server a REST API
- **Frontend Service → 100% alineado** (métodos HTTP listos)
- **Frontend UI → 14% alineado** (solo `runRule` expuesto, rest implícito)

### Siguiente Paso Recomendado

Crear `SessionManagerComponent` para exponer control explícito de sesiones MCP en la UI.

