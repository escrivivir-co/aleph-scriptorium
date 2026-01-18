# Backlog Borrador: AAIA Backend Gateway

> **Épica**: AAIA-BACKEND-1.0.0  
> **Fecha**: 2026-01-18  
> **Estado**: ✅ COMPLETADO (53/53 pts)  
> **Effort estimado**: 53 pts (45 original + 8 Type Unification)  
> **Sprint**: FC1  
> **Última actualización**: 2026-01-18 (sesión Type Unification)

---

## Contexto

Crear un backend Express para AAIAGallery que actúe como gateway entre:
- **Frontend Angular** (puerto 4200) - Cliente REST
- **MCPAAIAServer** (puerto 3007) - Servidor MCP con tools AAIA
- **AlephScriptClient** (Socket.IO) - Eventos en tiempo real

### Patrón de Referencia

Seguir la arquitectura de **PrologEditor/backend**:
- Express + TypeScript
- Controllers por dominio
- Services para lógica de negocio
- Gateway service para comunicación MCP
- Tipos desde mcp-core-sdk

### Specs Disponibles

| Spec | Ubicación |
|------|-----------|
| OpenAPI 3.0 | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/openapi.yaml` |
| AsyncAPI 2.6 | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/asyncapi.yaml` |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AAIA BACKEND ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Angular Frontend (4200)                                                   │
│   ├── AAIAService (REST)  ──────────────┐                                   │
│   └── ServerService (Socket.IO) ────────┼─────────────────────────┐         │
│                                         │                         │         │
│                                         ▼                         ▼         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    AAIA Backend (8007)                              │   │
│   │  Express + TypeScript (patrón PrologEditor)                         │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │  /api/sessions      → SessionController                             │   │
│   │  /api/fias          → FIAController                                 │   │
│   │  /api/mundo         → MundoController                               │   │
│   │  /api/apps          → AppsController (catálogo FIA)                 │   │
│   │  /api/mcp           → MCPGatewayController (proxy a 3007)           │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                     │                           │                           │
│                     ▼                           ▼                           │
│   ┌─────────────────────────┐     ┌─────────────────────────────────────┐   │
│   │  MCPAAIAServer (3007)   │     │   AlephScriptClient (Socket.IO)     │   │
│   │  MCP Tools: 9           │     │   Room: AAIA_ROOM                   │   │
│   │  Bot: PersefonBot       │     │   Bot: AAIABackendBot               │   │
│   └─────────────────────────┘     └─────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Stories

### S01: Scaffold Backend Express (5 pts) ✅

**Como** desarrollador  
**Quiero** estructura base del backend  
**Para** tener un punto de partida consistente con PrologEditor

**Tasks**:
- [x] T01.1: Crear `AAIAGallery/backend/` con estructura Express
- [x] T01.2: package.json con dependencias (express, typescript, cors, etc.)
- [x] T01.3: tsconfig.json configurado
- [x] T01.4: app.ts con middleware básico
- [x] T01.5: Estructura de carpetas (controllers/, services/, routes/, types/)

**Acceptance Criteria**:
- `npm run dev` arranca servidor en puerto 8007
- `GET /health` responde `{ status: "ok" }`

---

### S02: Tipos Compartidos (3 pts) ✅

**Como** desarrollador  
**Quiero** tipos desde mcp-core-sdk  
**Para** mantener consistencia con frontend y MCP server

**Tasks**:
- [x] T02.1: Crear `types/index.ts` con re-exports
- [x] T02.2: Tipos AAIA inline (mirror de mcp-core-sdk)
- [x] T02.3: Definir tipos API request/response

**Acceptance Criteria**:
- Import `{ IFIAInfo, AAIASession, IMundoState }` funciona ✅
- TypeScript compila sin errores de tipos ✅

---

### S03: SessionController (5 pts) ✅

**Como** frontend  
**Quiero** endpoints REST para sesiones  
**Para** crear/listar/destruir sesiones AAIA

**Endpoints** (según openapi.yaml):
```
GET    /api/sessions           → listSessions ✅
POST   /api/sessions           → createSession ✅
GET    /api/sessions/:id       → getSession ✅
DELETE /api/sessions/:id       → destroySession ✅
```

**Tasks**:
- [ ] T03.1: Crear `controllers/session.controller.ts`
- [ ] T03.2: Crear `routes/session.routes.ts`
- [ ] T03.3: Crear `services/session.service.ts`
- [ ] T03.4: Integrar con MCPGatewayService

**Acceptance Criteria**:
- POST /api/sessions crea sesión via MCP
- GET /api/sessions lista sesiones activas
- DELETE /api/sessions/:id destruye sesión

---

### S04: FIAController (5 pts) ✅

**Como** frontend  
**Quiero** endpoints REST para operar FIAs  
**Para** iniciar/detener/ejecutar pasos de razonamiento

**Endpoints**:
```
GET    /api/sessions/:sid/fias           → listFIAs ✅
GET    /api/sessions/:sid/fias/:idx      → getFIA ✅
POST   /api/sessions/:sid/fias/:idx/start → startFIA ✅
POST   /api/sessions/:sid/fias/:idx/stop  → stopFIA ✅
POST   /api/sessions/:sid/fias/:idx/step  → stepFIA ✅
GET    /api/sessions/:sid/fias/:idx/eferencia → getEferencia ✅
```

**Tasks**:
- [x] T04.1: Crear `controllers/fia.controller.ts`
- [x] T04.2: Crear `routes/fia.routes.ts` (nested under sessions)
- [x] T04.3: Crear `services/fia.service.ts`

**Acceptance Criteria**:
- POST /step ejecuta un paso de razonamiento ✅
- GET /eferencia retorna última salida de la FIA ✅

---

### S05: MundoController (3 pts) ✅

**Como** frontend  
**Quiero** endpoints para consultar el mundo  
**Para** obtener estado y enviar perceptos

**Endpoints**:
```
GET    /api/sessions/:sid/mundo          → queryMundo ✅
POST   /api/sessions/:sid/mundo/query    → customQuery ✅
POST   /api/sessions/:sid/percepto       → sendPercepto ✅
```

**Tasks**:
- [x] T05.1: Crear `controllers/mundo.controller.ts`
- [x] T05.2: Crear `routes/mundo.routes.ts` + `percepto.routes.ts`
- [x] T05.3: Crear `services/mundo.service.ts`

**Acceptance Criteria**:
- GET /mundo retorna estado actual del mundo ✅
- POST /percepto envía estímulo al mundo ✅

---

### S06: AppsController (3 pts) ✅

**Como** frontend  
**Quiero** endpoint para listar apps disponibles  
**Para** mostrar catálogo de FIAs

**Endpoints**:
```
GET    /api/apps           → listApps ✅
GET    /api/apps/:id       → getApp ✅
GET    /api/paradigmas     → listParadigmas ✅
```

**Tasks**:
- [x] T06.1: Crear `controllers/apps.controller.ts`
- [x] T06.2: Leer desde `fia-catalog.json` (con cache)
- [x] T06.3: Crear `services/apps.service.ts`

**Acceptance Criteria**:
- GET /apps retorna catálogo completo ✅
- GET /paradigmas retorna lista de paradigmas ✅

---

### S07: MCPGatewayService (8 pts) ✅

**Como** backend  
**Quiero** servicio que comunique con MCPAAIAServer  
**Para** invocar tools MCP desde REST

**Tasks**:
- [x] T07.1: Crear `services/mcp-gateway.ts` (308 líneas)
- [x] T07.2: Implementar cliente HTTP con retry exponential backoff
- [x] T07.3: Mapear 11 tools MCP conocidos (AAIA_MCP_TOOLS)
- [x] T07.4: Manejo de errores y timeouts (configurable vía config.ts)
- [x] T07.5: Cache de sesiones activas (SessionCache con TTL 30s)

**MCP Tools a invocar**:
| REST Endpoint | MCP Tool |
|--------------|----------|
| POST /sessions | aaia_create_session |
| DELETE /sessions/:id | aaia_destroy_session |
| GET /sessions/:id/fias | aaia_list_fias |
| POST /fias/:idx/step | aaia_step_fia |
| GET /mundo | aaia_query_mundo |
| POST /mundo/percepto | aaia_send_percepto |

**Acceptance Criteria**:
- Llamadas a MCP funcionan end-to-end
- Errores MCP se traducen a HTTP errors

---

### S08: AlephScriptClient Integration (8 pts) ✅

**Como** backend  
**Quiero** conectar a Socket.IO como bot  
**Para** recibir eventos en tiempo real y reenviar a clientes

**Tasks**:
- [x] T08.1: Crear `services/socketio.service.ts` (305 líneas)
- [x] T08.2: Conectar a ws://localhost:3000 como AAIABackendBot (auth con botId/botType)
- [x] T08.3: Unirse a AAIA_ROOM con confirmación
- [x] T08.4: Escuchar eventos (fia_step, percepto, eferencia, mundo_state, session_*)
- [x] T08.5: Exponer Server-Sent Events (SSE) via `/api/events` y `/api/sessions/:sid/events`

**Archivos creados**:
- `src/services/socketio.service.ts` - Socket.IO client con event buffer
- `src/controllers/events.controller.ts` - SSE endpoint handlers
- `src/routes/events.routes.ts` - Event routes
- [ ] T08.5: Exponer Server-Sent Events (SSE) o WebSocket propio

**Channels AsyncAPI**:
- `AAIA_ROOM/fia_step` → Notificar paso ejecutado
- `AAIA_ROOM/percepto` → Notificar percepto recibido
- `AAIA_ROOM/eferencia` → Notificar eferencia generada
- `AAIA_ROOM/mundo_state` → Notificar cambio de estado

**Acceptance Criteria**:
- Backend recibe eventos de AAIA_ROOM
- Frontend puede suscribirse via SSE

---

### S09: Tests Básicos (5 pts) ✅

**Como** desarrollador  
**Quiero** tests automatizados  
**Para** validar endpoints sin MCP server

**Tasks**:
- [x] T09.1: Configurar Jest (`jest.config.js` + setup.ts)
- [x] T09.2: Mock de MCPGatewayService y SocketIOService
- [x] T09.3: Tests para SessionController (5 tests)
- [x] T09.4: Tests para FIAController (5 tests)
- [x] T09.5: Tests para AppsController (4 tests)

**Resultados**: 14/14 tests pasan

**Acceptance Criteria**:
- `npm test` ejecuta suite completa
- Coverage > 60%

---

## Dependencias

| Épica | Dependencia | Estado |
|-------|-------------|--------|
| MCP-AAIA-SERVER-1.0.0 | MCPAAIAServer debe estar operativo | ✅ Completado |
| MCP-CHANNELS-1.0.0 | Socket.IO server disponible | ✅ Completado |
| T008 Frontend Integration | AAIAService ya creado | ✅ Completado |

---

## Estructura de Archivos Objetivo

```
AAIAGallery/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── app.ts
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── session.controller.ts
│   │   │   ├── fia.controller.ts
│   │   │   ├── mundo.controller.ts
│   │   │   └── apps.controller.ts
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   ├── session.routes.ts
│   │   │   ├── fia.routes.ts
│   │   │   ├── mundo.routes.ts
│   │   │   └── apps.routes.ts
│   │   ├── services/
│   │   │   ├── mcp-gateway.service.ts
│   │   │   ├── session.service.ts
│   │   │   ├── fia.service.ts
│   │   │   └── socketio.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── logger.ts
│   └── tests/
│       ├── session.test.ts
│       └── fia.test.ts
└── frontend/ (ya existe)
```

---

## Plan de Ejecución

| Fase | Stories | Effort | Entregable |
|------|---------|--------|------------|
| 1. Foundation | S01, S02 | 8 pts | Backend arranca, tipos listos |
| 2. Core Controllers | S03, S04, S05, S06 | 16 pts | REST API funcional |
| 3. Integration | S07, S08 | 16 pts | Conectado a MCP + Socket.IO |
| 4. Quality | S09 | 5 pts | Tests, documentación |

**Total**: 45 pts (~3-4 días de trabajo)

---

## S10: Type Unification Across SDKs (8 pts) ✅

> **Sesión adicional**: 2026-01-18 (Type Unification)

**Como** desarrollador  
**Quiero** tipos unificados desde mcp-core-sdk  
**Para** evitar duplicación y colisiones de tipos

### Problema Detectado

Los tipos `CreateSessionResponse`, `ListSessionsResponse` existían en:
- `mcp-core-sdk/types/prolog` (Prolog MCP Server)
- `mcp-core-sdk/types/aaia` (AAIA MCP Server)

**Solución**: Prefijo `AAIA` para evitar colisión.

### Tasks

- [x] T10.1: Añadir 12 AAIA-prefixed API Response types a mcp-core-sdk/types/aaia
- [x] T10.2: Exportar nuevos tipos desde mcp-core-sdk/browser (Angular/React)
- [x] T10.3: Actualizar mcp-mesh-sdk para importar desde core
- [x] T10.4: Backend: re-export desde core con backward-compat aliases
- [x] T10.5: Frontend: aaia.model.ts importa desde browser
- [x] T10.6: Fix component name mismatches en tests (4 archivos)
- [x] T10.7: Fix import paths en services (2 archivos)
- [x] T10.8: Rebuild y package mcp-core-sdk v1.3.0

### Archivos Modificados

| SDK | Archivo | Cambio |
|-----|---------|--------|
| mcp-core-sdk | `src/types/aaia/index.ts` | +12 AAIA-prefixed types |
| mcp-core-sdk | `src/browser/index.ts` | +12 API Response exports |
| mcp-mesh-sdk | `src/clients/AAIABackendClient.ts` | Imports from core |
| backend | `src/types/aaia.types.ts` | Re-export + aliases |
| backend | `src/types/api.types.ts` | Re-export + aliases |
| frontend | `src/app/models/aaia.model.ts` | Import from browser |
| frontend | `src/app/services/aaia.service.ts` | Fixed paths |
| frontend | `src/app/services/socketio/sala.service.ts` | Fixed ServerService import |
| frontend | `feature/component.spec.ts` | DynamicFormComponent |
| frontend | `feature/routing.module.ts` | FeatureRoutingModule |
| frontend | `feature/module.ts` | FeatureModule |
| frontend | `inet-app.component.spec.ts` | InetAppComponent |
| frontend | `iot-logic-engine.component.spec.ts` | IotLogicEngineComponent |

### Commits

| Repo | Commit | Message |
|------|--------|---------|
| mcp-core-sdk | `24e912e` | feat(types): AAIA API Response types + browser exports |
| mcp-mesh-sdk | `fe3c795` | feat(aaia): AAIABackendClient + type imports from core |
| MCPGallery | `871dff0` | chore: update submodules |
| AAIAGallery | `33d4fb7` | feat(aaia): Type Unification + Frontend Fixes |
| aleph-scriptorium | `5dcdfd5` | feat(aaia): Type Unification + Submodule Updates |

**Total adicional**: 8 pts

---

## Métricas de Éxito

| Métrica | Target |
|---------|--------|
| Endpoints implementados | 12 |
| Test coverage | >60% |
| Build time | <30s |
| Response time p95 | <500ms |

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| MCPAAIAServer no responde | Mock service para desarrollo local |
| Tipos desincronizados | Validación con specs OpenAPI |
| Socket.IO connection issues | Retry logic + heartbeat |

---

## Referencias

- [Mapa técnico stack](../SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/03_REFERENCIAS/mapa-tecnico-stack.md)
- [OpenAPI Spec](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/openapi.yaml)
- [AsyncAPI Spec](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/asyncapi.yaml)
- [PrologEditor Backend](../../../PrologEditor/backend/) (patrón)
- [T008 Frontend Integration](../SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/02_ACTAS/T008_aaiaeditor_frontend-integration.md)
