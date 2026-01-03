# Guía de Arquitectura MCP Stack

> **Propósito**: Protocolo DRY para agentes que trabajan en el stack MCP.  
> **Origen**: Spike SCRIPT-2.3.1 (PrologAgent Pack)  
> **Versión**: 1.7.0  
> **Última actualización**: 2026-01-03  
> **Épicas**: PROLOG-DRY-1.0.0, TEATRO-PROLOG-1.0.0, SDK-BROWSER-1.0.0, DEVOPS-TASKS-1.0.0

---

## Índice DRY

| Sección | Qué encontrar | Cuándo consultar |
|---------|---------------|------------------|
| [1. Mapa de Capas](#1-mapa-de-capas) | Arquitectura visual | Orientación inicial |
| [2. Inventario de Componentes](#2-inventario-de-componentes) | Qué existe y dónde | Antes de crear/modificar |
| [3. Matriz de Dependencias](#3-matriz-de-dependencias) | Qué depende de qué | Al añadir imports |
| [4. Restricciones de Entorno](#4-restricciones-de-entorno) | Backend vs Frontend | Evitar errores de build |
| [5. Protocolo de Tipos](#5-protocolo-de-tipos) | Dónde definir tipos | Al crear nuevos tipos |
| [6. Checklist de Alineamiento](#6-checklist-de-alineamiento) | Validación 100% | Al cerrar trabajo |
| [7. Antipatrones](#7-antipatrones-a-evitar) | Errores comunes | Debugging |
| [8. DevOps: VS Code Tasks](#8-devops-vs-code-tasks) | **Tasks APB** | **Arrancar stack** |

---

## 1. Mapa de Capas

```
┌─────────────────────────────────────────────────────────────────┐
│                        STACK MCP COMPLETO                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐                                                │
│  │ OpenAPI Spec│ ← Contrato de verdad (specs/)                  │
│  └──────┬──────┘                                                │
│         │                                                       │
│  ┌──────▼──────┐     ┌─────────────┐     ┌─────────────┐       │
│  │ Angular UI  │ ──► │ Backend REST│ ──► │ MCP Server  │       │
│  │ (frontend/) │     │ (backend/)  │     │ (mcp-mesh/) │       │
│  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘       │
│         │                   │                   │               │
│         └───────────────────┼───────────────────┘               │
│                             │                                   │
│                    ┌────────▼────────┐                          │
│                    │  mcp-core-sdk   │ ← Single Source of Types │
│                    └─────────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Puertos Estándar

| Servicio | Puerto | Directorio |
|----------|--------|------------|
| Angular Dev Server | **5001** | `PrologEditor/frontend/` |
| Backend REST | **8000** | `PrologEditor/backend/` |
| MCP Prolog Server | 3006 | `MCPGallery/mcp-mesh-sdk/` |
| MCP DevOps Server | 3003 | `MCPGallery/mcp-mesh-sdk/` |
| MCP Launcher | 3050 | `MCPGallery/mcp-mesh-sdk/` |

---

## 2. Inventario de Componentes

### 2.1 SDK Packages (MCPGallery/)

| Package | Path | Exports principales | Consumidores |
|---------|------|---------------------|--------------|
| `@alephscript/mcp-core-sdk` | `mcp-core-sdk/` | Types, BaseMCPClient, utils | Todos |
| `@alephscript/mcp-mesh-sdk` | `mcp-mesh-sdk/` | Servers, clients, services | Backend |
| `@alephscript/mcp-model-sdk` | `mcp-model-sdk/` | LLM integrations | Backend |

#### Subpaths de `@alephscript/mcp-core-sdk` (v1.2.0+)

| Subpath | Contenido | ¿Browser-safe? | Consumidor |
|---------|-----------|----------------|------------|
| `/browser` | **Solo tipos + utils isomórficos** | ✅ SÍ | **Frontend Angular** |
| `/types` | Tipos (pero arrastra .d.ts de server) | ⚠️ Requiere skipLibCheck | — |
| `/types/prolog` | Tipos Prolog específicos | ⚠️ Requiere skipLibCheck | — |
| `/server` | BaseMCPServer, SocketServer | ❌ NO | Backend, MCP Servers |
| `/client` | BaseMCPClient, MCPClientPool | ❌ NO | Backend |
| `/utils` | Message, isLogable | ✅ SÍ | Todos |

> **⚠️ REGLA CRÍTICA**: Todo consumidor **browser/Angular** DEBE importar de `/browser`, NO de `/types` ni de la raíz.

### 2.2 Aplicación (PrologEditor/)

| Capa | Path | Responsabilidad |
|------|------|-----------------|
| Frontend | `frontend/src/app/` | UI Angular, Services HTTP |
| Backend | `backend/src/` | REST API, MCP Client |
| Models (FE) | `frontend/src/app/models/` | Re-exports de SDK + locales |
| Types (BE) | `backend/src/types/` | Tipos específicos de servidor |

### 2.3 MCP Server (mcp-mesh-sdk/)

| Componente | Path | Capacidades |
|------------|------|-------------|
| PrologServer | `src/MCPPrologServer.ts` | **12 tools**, **6 resources**, **8 prompts** |
| DevOpsServer | `src/MCPDevOpsServer.ts` | N tools |
| LauncherServer | `src/MCPLauncherServer.ts` | Orquestación |

### 2.4 Clients (mcp-mesh-sdk/src/clients/)

| Cliente | Path | Propósito |
|---------|------|-----------|
| PrologBackendClient | `clients/PrologBackendClient.ts` | HTTP client para SQLite sin ciclos MCP |

> **Nota**: El PrologBackendClient permite al MCPPrologServer acceder a datos SQLite del backend sin invocar MCP tools, evitando ciclos infinitos.

### 2.5 Componentes UI Angular (PrologEditor/frontend/)

> **Épica**: PROLOG-UI-2.0.0 (completado 2026-01-03)
> **Épica**: TEATRO-PROLOG-1.0.0 (completado 2026-01-03)

| Componente | Path | Tools MCP que Expone |
|------------|------|---------------------|
| **SessionManagerComponent** | `components/session-manager/` | create_session, list_sessions, destroy_session |
| **RuleEditorComponent** | `components/rule-editor/` | query (runRule) |
| **KnowledgeBaseComponent** | `components/knowledge-base/` | assert_fact, consult_file |
| **McpTemplatesBrowserComponent** | `components/mcp-templates-browser/` | get_templates |
| **UserAppSaveDialogComponent** | `components/user-app-save-dialog/` | (modal auxiliar) |
| **TelemetryProcessComponent** | `components/telemetry-process/` | (testing IoT) |
| **BrainEditorComponent** | `components/brain-editor/` | Generador visual de `.brain.pl` para Teatro |

**Navegación**: Tabs en `AppComponent` → Sessions | Editor | Knowledge | Templates | Telemetry | 🧠 Brain Editor

---

## 3. Matriz de Dependencias

### 3.1 Flujo de Datos

```
User Action → Angular Component → PrologService → HttpClient
                                                      │
                                                      ▼
MCP Tool Response ← MCPPrologClient ← Express Route ← HTTP Request
```

### 3.2 Dependencias de Tipos

```
mcp-core-sdk/types/
       │
       ├──► frontend/models/ (re-export)
       │         │
       │         └──► components/ (consume)
       │
       └──► backend/types/ (extend)
                 │
                 └──► controllers/, services/ (consume)
```

### 3.3 Matriz de Alineamiento

#### Tools Core (7) - Invocan motor SWI-Prolog

| Tool MCP Server | Cliente Backend | Endpoint REST | Service Frontend | UI Component |
|-----------------|-----------------|---------------|------------------|--------------|
| `prolog_create_session` | `createSession()` | `POST /sessions` | `createSession()` | ✅ SessionManager |
| `prolog_list_sessions` | `listSessions()` | `GET /sessions` | `listSessions()` | ✅ SessionManager |
| `prolog_destroy_session` | `destroySession()` | `DELETE /sessions/:id` | `destroySession()` | ✅ SessionManager |
| `prolog_query` | `query()` | `POST /run-rule` | `runRule()` | ✅ RuleEditor |
| `prolog_assert_fact` | `assertFact()` | `POST /assert` | `assertFact()` | ✅ KnowledgeBase |
| `prolog_consult_file` | `consultFile()` | `POST /consult` | `consultFile()` | ✅ KnowledgeBase |
| `prolog_get_templates` | `getTemplates()` | `GET /mcp-templates` | `getMcpTemplates()` | ✅ McpTemplatesBrowser |

#### Tools Backend-Integrated (5) - Acceden SQLite via PrologBackendClient

| Tool MCP Server | PrologBackendClient | Endpoint REST Safe | Service Frontend | Propósito |
|-----------------|---------------------|--------------------|------------------|-----------|
| `prolog_load_rules_from_db` | `getAllRules()`, `getRulesByApp()` | `GET /rules`, `GET /rules/{app}` | `getAllRules()`, `getRules()` | Cargar reglas de SQLite a KB |
| `prolog_save_rule_to_db` | `createRule()` | `POST /rules` | `saveRule()` | Persistir regla en SQLite |
| `prolog_list_sdk_templates` | `getSdkTemplates()` | `GET /sdk-templates` | `getSdkTemplates()` | Listar templates del SDK |
| `prolog_get_sdk_template_content` | `getTemplateContent()` | `GET /sdk-templates/{id}` | `getSdkTemplateContent()` | Obtener contenido de template |
| `prolog_get_telemetry_status` | `getTelemetryStatus()` | `GET /telemetry/status` | `getTelemetryStatus()` | Estado de telemetría |

**Regla**: Toda tool debe estar alineada en las 5 capas para considerarse 100% completa.

> **Nota sobre ciclos**: Las 5 tools backend-integrated usan `PrologBackendClient` (HTTP directo) en lugar de invocar MCP, previniendo ciclos MCP → Backend → MCP.

### 3.4 Matriz de Prompts (8)

| Prompt | Propósito | Tools que Orquesta |
|--------|-----------|-------------------|
| `session_lifecycle` | Gestión ciclo de vida | create, list, destroy |
| `load_knowledge_base` | Carga de conocimiento | consult_file, load_rules_from_db |
| `interactive_query` | Consulta interactiva | query + resource session-state |
| `persist_rule` | Persistencia | assert_fact, save_rule_to_db |
| `use_sdk_template` | Templates SDK | list_sdk_templates, get_sdk_template_content |
| `telemetry_check` | Monitoreo IoT | get_telemetry_status + resource telemetry |
| `razonamiento_sbr` | Sensor-Based Reasoning | query, load_rules_from_db, get_telemetry_status |
| `teatro_agent_session` | Workflow E2E Teatro | **Todos** (orquestación completa) |

### 3.5 Matriz de Resources (6)

| Resource | URI | Fuente |
|----------|-----|--------|
| `prolog-session-state` | `prolog://sessions/current` | SessionManager |
| `prolog-templates-catalog` | `prolog://templates/catalog` | Local templates |
| `prolog-active-sessions` | `prolog://sessions` | SessionManager |
| `prolog-rules-catalog` | `prolog://rules/catalog` | PrologBackendClient → SQLite |
| `prolog-sdk-templates` | `prolog://sdk/templates` | PrologBackendClient → Backend |
| `prolog-telemetry` | `prolog://telemetry/current` | PrologBackendClient → IoT |

---

## 4. Restricciones de Entorno

### 4.1 Imports Prohibidos en Frontend

| Módulo | Razón | Alternativa |
|--------|-------|-------------|
| `socket.io` | Depende de Node.js internals | `socket.io-client` |
| `fs`, `path` | Node.js only | N/A (no aplica en browser) |
| `child_process` | Node.js only | N/A |
| `swipl-stdio` | Ejecutable local | Via MCP Server |
| `express` | Server-side only | N/A |
| `better-sqlite3` | Native bindings | Via REST API |

### 4.2 Imports Seguros (Isomórficos)

| Módulo | Uso | OK Frontend | OK Backend |
|--------|-----|-------------|------------|
| **`@alephscript/mcp-core-sdk/browser`** | **Tipos + utils browser-safe** | ✅ **OBLIGATORIO** | ✅ |
| `@alephscript/mcp-core-sdk/types` | Types (con skipLibCheck) | ⚠️ Deprecated | ✅ |
| `rxjs` | Observables | ✅ | ✅ |
| `zod` | Validation | ✅ | ✅ |

> **🚨 DECISIÓN ARQUITECTÓNICA (SDK-BROWSER-1.0.0)**:  
> El SDK `@alephscript/mcp-core-sdk` contiene dependencias Node.js (`socket.io`, `express`) en `/server` y `/client`.  
> Aunque el frontend solo importe de `/types`, TypeScript procesa **todos** los `.d.ts` del paquete instalado.  
> 
> **Solución implementada (v1.2.0)**:  
> - Nuevo subpath `/browser` que exporta SOLO tipos e isomórficos  
> - Frontend DEBE usar `skipLibCheck: true` en tsconfig.json  
> - Frontend DEBE importar de `/browser`, NO de `/types`

### 4.3 Patrón de Re-export Seguro

```typescript
// frontend/src/app/models/session.model.ts

// ✅ CORRECTO (v1.2.0+): Usar subpath /browser
export type { 
  PrologSession, 
  CreateSessionRequest,
  QueryResponse,
} from '@alephscript/mcp-core-sdk/browser';

export { PrologErrorType } from '@alephscript/mcp-core-sdk/browser';

// ❌ INCORRECTO: Import desde /types (arrastra .d.ts con socket.io)
// export type { PrologSession } from '@alephscript/mcp-core-sdk/types/prolog';

// ❌ INCORRECTO: Import desde raíz (arrastra todo)
// export type { PrologSession } from '@alephscript/mcp-core-sdk';

// ❌ INCORRECTO: Import de clase con dependencias Node
// import { MCPClient } from '@alephscript/mcp-core-sdk/client';
```

### 4.4 Configuración tsconfig.json (Frontend)

```jsonc
// PrologEditor/frontend/tsconfig.json
{
  "compilerOptions": {
    // ... otras opciones ...
    "skipLibCheck": true  // ← OBLIGATORIO para evitar errores en node_modules
  }
}
```

> **Razón**: Aunque usemos `/browser`, el tgz instalado incluye los `.d.ts` de `/server` que referencian `socket.io`.  
> `skipLibCheck` previene que TypeScript valide tipos en `node_modules`.

---

## 5. Protocolo de Tipos

### 5.1 Jerarquía de Decisión

```
¿Dónde definir un nuevo tipo?

1. ¿Lo usan múltiples packages?
   └─► SÍ → mcp-core-sdk/src/types/

2. ¿Es específico del mesh de servers?
   └─► SÍ → mcp-mesh-sdk/src/types/

3. ¿Es específico del backend de una app?
   └─► SÍ → {app}/backend/src/types/

4. ¿Es solo para UI?
   └─► SÍ → {app}/frontend/src/app/models/
```

### 5.2 Nomenclatura de Tipos

| Contexto | Sufijo | Ejemplo |
|----------|--------|---------|
| Request DTO | `Request` | `CreateSessionRequest` |
| Response DTO | `Response` | `QueryResponse` |
| Entity/Model | (ninguno) | `PrologSession` |
| Input form | `Input` | `RuleInput` |
| Config | `Config` | `ServerConfig` |

### 5.3 Migración de Tipos al Core

**Trigger**: Un tipo se usa en ≥2 packages distintos.

**Proceso**:
1. Mover definición a `mcp-core-sdk/types/`
2. Exportar desde `mcp-core-sdk/index.ts`
3. Reemplazar definiciones locales por re-exports
4. Actualizar imports en consumidores
5. Validar build en todos los packages afectados

---

## 6. Checklist de Alineamiento

### 6.1 Al Añadir Nueva Tool MCP

- [ ] Tool definida en MCP Server con schema Zod
- [ ] Método wrapper en MCP Client (`backend/services/`)
- [ ] Endpoint REST expuesto (`backend/routes/`)
- [ ] Método HTTP en Angular Service (`frontend/services/`)
- [ ] Componente UI que la consume (o justificación de omisión)
- [ ] Documentada en OpenAPI spec
- [ ] Tipos compartidos en mcp-core-sdk (si aplica)

### 6.2 Al Modificar Tipos Existentes

- [ ] Cambio propagado a mcp-core-sdk (si es tipo shared)
- [ ] Re-exports actualizados en frontend/models/
- [ ] Backend types actualizados
- [ ] OpenAPI spec actualizada
- [ ] Build exitoso en: core-sdk → mesh-sdk → backend → frontend

### 6.3 Métricas de Alineamiento

| Métrica | Fórmula | Objetivo | Estado Actual (PrologEditor) |
|---------|---------|----------|------------------------------|
| Cobertura Backend | Tools con cliente / Total tools | 100% | 12/12 = **100%** ✅ |
| Cobertura REST | Endpoints / Tools | 100% | 12/12 = **100%** ✅ |
| Cobertura Frontend | Services / Endpoints | 100% | 12/12 = **100%** ✅ |
| Cobertura UI | Componentes / Services (Core) | ≥80% | 7/7 = **100%** ✅ |
| Tipos DRY | Tipos en core / Tipos totales | ≥70% | **100%** ✅ |
| Cobertura Prompts | Prompts implementados / Prompts pack | 100% | 8/8 = **100%** ✅ |
| Cobertura Resources | Resources implementados / Resources pack | 100% | 6/6 = **100%** ✅ |

> **Completado**: PROLOG-DRY-1.0.0 cerró gaps de cobertura frontend (12/12) y tipado DRY (100%).

### 6.4 Validación de Cierre

Al finalizar trabajo en una zona del stack:

```bash
# 1. Build chain completo
cd MCPGallery/mcp-core-sdk && npm run build
cd ../mcp-mesh-sdk && npm run build
cd ../../PrologEditor/backend && npm run build
cd ../frontend && npm run build

# 2. Type check
npm run typecheck  # en cada package

# 3. Linting
npm run lint       # en cada package
```

---

## 7. Antipatrones a Evitar

| Antipatrón | Síntoma | Corrección |
|------------|---------|------------|
| **Tipos duplicados** | Misma interface en 2+ lugares | Mover a core-sdk |
| **Import cruzado** | Backend importa de frontend | Extraer a core-sdk |
| **Socket en frontend** | Error `TS1192: Module '"http"' has no default export` | **Usar `/browser` + `skipLibCheck: true`** |
| **Import desde /types** | Error socket.io en Angular build | **Cambiar a `/browser`** |
| **Tool sin REST** | Tool funciona en Copilot, no en app | Añadir endpoint |
| **REST sin UI** | Endpoint existe pero nadie lo llama | Añadir componente o deprecar |
| **Spec desactualizada** | OpenAPI no refleja endpoints reales | Sync con código |
| **Ciclo MCP infinito** | MCP Server invoca Backend que invoca MCP | Usar PrologBackendClient (HTTP directo) |

### 7.1 Diagnóstico Rápido: Error socket.io en Frontend

**Síntoma**:
```
Error: node_modules/socket.io/dist/index.d.ts:1:8 - error TS1192: Module '"http"' has no default export.
```

**Causa**: El frontend importa de `@alephscript/mcp-core-sdk/types` o de la raíz, y TypeScript procesa todos los `.d.ts` del paquete.

**Solución**:
1. Cambiar TODOS los imports a `@alephscript/mcp-core-sdk/browser`
2. Añadir `"skipLibCheck": true` en `tsconfig.json`
3. Reinstalar SDK: `npm i ../../MCPGallery/mcp-core-sdk/alephscript-mcp-core-sdk-1.2.0.tgz`

---

## 8. DevOps: VS Code Tasks

> **Pack**: APB (Agent Prolog Brain)  
> **Archivo**: `.vscode/tasks.json`  
> **Convención de nombres**: `{PACK}: {Acción} [{Servicio}]`

### 8.1 Nomenclatura de Packs

| Prefijo | Pack | Descripción |
|---------|------|-------------|
| `APB:` | **A**gent **P**rolog **B**rain | Stack MCP + Prolog + UI Angular |
| `SCR:` | **SCR**iptorium Core | Documentación, Jekyll, GH-Pages |
| `TEA:` | **TEA**tro | Demo transmedia, obras interactivas |

### 8.2 Tasks Disponibles (APB)

| Task | Atajo | Descripción |
|------|-------|-------------|
| `APB: Start Full Stack` | `Ctrl+Shift+B` | Arranca los 3 servicios en secuencia |
| `APB: Start [MCP Launcher]` | — | Solo MCP Launcher (3050) + Prolog (3006) |
| `APB: Start [Backend]` | — | Solo Express REST (8000) |
| `APB: Start [Frontend]` | — | Solo Angular Dev (5001) con hot-reload |
| `APB: Health Check` | — | Verifica estado de los 4 puertos |
| `APB: Test Query` | — | Ejecuta query Prolog de prueba |
| `APB: Open Browser` | — | Abre http://localhost:5001 |
| `APB: Stop All` | — | Detiene todos los procesos APB |
| `APB: Build Chain` | — | Build completo: core → mesh → backend → frontend |

### 8.3 Puertos y Servicios

```
┌─────────────────────────────────────────────────────────┐
│                  APB: Start Full Stack                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [MCP Launcher :3050] ──► [MCP Prolog :3006]           │
│          │                                              │
│          ▼                                              │
│  [Backend REST :8000] ◄── [Frontend Angular :5001]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 8.4 Uso desde Copilot Chat

Los agentes pueden invocar tasks con:

```
# Arrancar stack completo
run_task({workspaceFolder: "...", id: "APB: Start Full Stack"})

# Verificar salud
run_task({workspaceFolder: "...", id: "APB: Health Check"})
```

### 8.5 Flujo de Desarrollo Recomendado

1. **Arrancar**: `Ctrl+Shift+B` → `APB: Start Full Stack`
2. **Verificar**: `APB: Health Check` (esperar ✅ en los 4 servicios)
3. **Desarrollar**: Editar código (hot-reload automático en frontend)
4. **Validar**: `APB: Test Query` para probar Prolog
5. **Parar**: `APB: Stop All` al terminar

### 8.6 Comandos Manuales (Alternativa)

```bash
# Terminal 1: MCP Servers
cd MCPGallery/mcp-mesh-sdk && npm run start:launcher

# Terminal 2: Backend
cd PrologEditor && npm run start:backend

# Terminal 3: Frontend  
cd PrologEditor && npm run start:frontend
```

### 8.7 Verificar Alineamiento

```bash
# Listar tools del MCP Server
curl http://localhost:3006/tools | jq '.tools[].name'

# Listar endpoints del backend
grep -r "router\." PrologEditor/backend/src/routes/ | grep -E "(get|post|delete|put)"

# Listar métodos del service Angular
grep -E "^\s+(create|list|destroy|run|assert|consult|get)" PrologEditor/frontend/src/app/services/prolog.service.ts
```

---

## 9. Referencias

| Documento | Path | Contenido |
|-----------|------|-----------|
| Spike original | `BACKLOG_BORRADORES/Enero_02_PrologAgentPack/spike-prolog-mcp-tools.md` | Análisis detallado |
| OpenAPI Spec (Full) | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` | Contrato REST completo |
| OpenAPI Spec (Safe) | `MCPGallery/mcp-mesh-sdk/specs/openapi-safe.yaml` | Subset sin ciclos MCP (7 endpoints) |
| AsyncAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/asyncapi.yaml` | Contrato MQTT |
| Agent Pack | `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` | 12 tools para agentes (v2.0.0) |
| Core SDK Types | `MCPGallery/mcp-core-sdk/src/types/` | Tipos compartidos |
| PrologBackendClient | `MCPGallery/mcp-mesh-sdk/src/clients/PrologBackendClient.ts` | Cliente HTTP para backend |
| UI Refactor Backlog | `BACKLOG_BORRADORES/Enero_02_PrologAgentPack/02_backlog-ui-refactor.md` | Épica PROLOG-UI-2.0.0 ✅ |
| Prompts Completion | `BACKLOG_BORRADORES/Enero_02_PrologAgentPack/04_backlog-prompts-completion.md` | Épica PROLOG-PROMPTS-1.0.0 ✅ |
| Teatro-Prolog Backlog | `BACKLOG_BORRADORES/Enero_02_PrologAgentPack/05_backlog-teatro-prolog-integration.md` | Épica TEATRO-PROLOG-1.0.0 ✅ |
| Brain Template | `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/brain.pl.template` | Template para cerebros Prolog |
| Obra Pack Schema | `ARCHIVO/PLUGINS/TEATRO/schemas/obra-pack.schema.json` | Schema para packs de obra |
| **Specs Index** | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/INDEX.md` | **Catálogo de todas las specs** |
| OpenAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` | REST API Backend v2.0.0 |
| AsyncAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/asyncapi.yaml` | MQTT IoT v1.0.0 |
| MCP Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/mcpspec.yaml` | MCP Server v2.0.0 (12 tools) |
| Use Cases Ox | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-ox-bridger.yaml` | Casos de uso: Setup |
| Use Cases Dramaturgo | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-dramaturgo.yaml` | Casos de uso: Escribir obras |
| Use Cases Agente | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-agente-personaje.yaml` | Casos de uso: Agente runtime |
| Use Cases UI | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-usuario-final.yaml` | Casos de uso: UI Angular |

---

## 10. Protocolo de Actualización de Esta Guía

**Cuándo actualizar**:
- Al añadir nuevo MCP Server al mesh
- Al cambiar estructura de directorios
- Al deprecar herramientas o endpoints
- Cuando métricas de alineamiento caen <90%

**Cómo actualizar**:
1. Verificar cambio contra código real
2. Actualizar sección afectada
3. Incrementar versión en header
4. Commit: `docs(guia-mcp): actualizar {sección} refs #{EPICA}`
