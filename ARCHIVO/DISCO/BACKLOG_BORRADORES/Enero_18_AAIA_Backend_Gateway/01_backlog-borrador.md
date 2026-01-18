# Backlog Borrador: AAIA Backend Gateway

> **Épica**: AAIA-BACKEND-1.0.0  
> **Fecha**: 2026-01-18  
> **Estado**: 📋 PLANIFICADO  
> **Effort estimado**: 45 pts  
> **Sprint**: FC1

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

### S01: Scaffold Backend Express (5 pts)

**Como** desarrollador  
**Quiero** estructura base del backend  
**Para** tener un punto de partida consistente con PrologEditor

**Tasks**:
- [ ] T01.1: Crear `AAIAGallery/backend/` con estructura Express
- [ ] T01.2: package.json con dependencias (express, typescript, cors, etc.)
- [ ] T01.3: tsconfig.json configurado
- [ ] T01.4: app.ts con middleware básico
- [ ] T01.5: Estructura de carpetas (controllers/, services/, routes/, types/)

**Acceptance Criteria**:
- `npm run dev` arranca servidor en puerto 8007
- `GET /health` responde `{ status: "ok" }`

---

### S02: Tipos Compartidos (3 pts)

**Como** desarrollador  
**Quiero** tipos desde mcp-core-sdk  
**Para** mantener consistencia con frontend y MCP server

**Tasks**:
- [ ] T02.1: Crear `types/index.ts` con re-exports
- [ ] T02.2: Instalar @alephscript/mcp-core-sdk
- [ ] T02.3: Definir tipos locales extendidos si necesario

**Acceptance Criteria**:
- Import `{ IFIAInfo, AAIASession, IMundoState }` funciona
- TypeScript compila sin errores de tipos

---

### S03: SessionController (5 pts)

**Como** frontend  
**Quiero** endpoints REST para sesiones  
**Para** crear/listar/destruir sesiones AAIA

**Endpoints** (según openapi.yaml):
```
GET    /api/sessions           → listSessions
POST   /api/sessions           → createSession
GET    /api/sessions/:id       → getSession
DELETE /api/sessions/:id       → destroySession
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

### S04: FIAController (5 pts)

**Como** frontend  
**Quiero** endpoints REST para operar FIAs  
**Para** iniciar/detener/ejecutar pasos de razonamiento

**Endpoints**:
```
GET    /api/sessions/:sid/fias           → listFIAs
GET    /api/sessions/:sid/fias/:idx      → getFIA
POST   /api/sessions/:sid/fias/:idx/start → startFIA
POST   /api/sessions/:sid/fias/:idx/stop  → stopFIA
POST   /api/sessions/:sid/fias/:idx/step  → stepFIA
GET    /api/sessions/:sid/fias/:idx/eferencia → getEferencia
```

**Tasks**:
- [ ] T04.1: Crear `controllers/fia.controller.ts`
- [ ] T04.2: Crear `routes/fia.routes.ts`
- [ ] T04.3: Crear `services/fia.service.ts`

**Acceptance Criteria**:
- POST /step ejecuta un paso de razonamiento
- GET /eferencia retorna última salida de la FIA

---

### S05: MundoController (3 pts)

**Como** frontend  
**Quiero** endpoints para consultar el mundo  
**Para** obtener estado y enviar perceptos

**Endpoints**:
```
GET    /api/sessions/:sid/mundo          → queryMundo
POST   /api/sessions/:sid/mundo/percepto → sendPercepto
```

**Tasks**:
- [ ] T05.1: Crear `controllers/mundo.controller.ts`
- [ ] T05.2: Crear `routes/mundo.routes.ts`

**Acceptance Criteria**:
- GET /mundo retorna estado actual del mundo
- POST /percepto envía estímulo al mundo

---

### S06: AppsController (3 pts)

**Como** frontend  
**Quiero** endpoint para listar apps disponibles  
**Para** mostrar catálogo de FIAs

**Endpoints**:
```
GET    /api/apps           → listApps
GET    /api/apps/:id       → getApp
```

**Tasks**:
- [ ] T06.1: Crear `controllers/apps.controller.ts`
- [ ] T06.2: Leer desde `fia-catalog.json`
- [ ] T06.3: Parsear paradigmas y templates

**Acceptance Criteria**:
- GET /apps retorna catálogo completo
- Filtrar por paradigma (query param)

---

### S07: MCPGatewayService (8 pts)

**Como** backend  
**Quiero** servicio que comunique con MCPAAIAServer  
**Para** invocar tools MCP desde REST

**Tasks**:
- [ ] T07.1: Crear `services/mcp-gateway.service.ts`
- [ ] T07.2: Implementar cliente HTTP hacia MCPAAIAServer (3007)
- [ ] T07.3: Mapear endpoints REST a tools MCP
- [ ] T07.4: Manejo de errores y timeouts
- [ ] T07.5: Cache de sesiones activas

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

### S08: AlephScriptClient Integration (8 pts)

**Como** backend  
**Quiero** conectar a Socket.IO como bot  
**Para** recibir eventos en tiempo real y reenviar a clientes

**Tasks**:
- [ ] T08.1: Crear `services/socketio.service.ts`
- [ ] T08.2: Conectar a ws://localhost:3010 como AAIABackendBot
- [ ] T08.3: Unirse a AAIA_ROOM
- [ ] T08.4: Escuchar eventos (fia_step, percepto, eferencia, mundo_state)
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

### S09: Tests Básicos (5 pts)

**Como** desarrollador  
**Quiero** tests automatizados  
**Para** validar endpoints sin MCP server

**Tasks**:
- [ ] T09.1: Configurar Jest
- [ ] T09.2: Mock de MCPGatewayService
- [ ] T09.3: Tests para SessionController
- [ ] T09.4: Tests para FIAController
- [ ] T09.5: Tests para AppsController

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
