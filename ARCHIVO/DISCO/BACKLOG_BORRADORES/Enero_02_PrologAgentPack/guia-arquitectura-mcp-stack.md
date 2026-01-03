# Guía de Arquitectura MCP Stack

> **Propósito**: Protocolo DRY para agentes que trabajan en el stack MCP.  
> **Origen**: Spike SCRIPT-2.3.1 (PrologAgent Pack)  
> **Versión**: 1.0.0  
> **Última actualización**: 2026-01-03

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
| Angular Dev Server | 4200 | `*/frontend/` |
| Backend REST | 3000 | `*/backend/` |
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

### 2.2 Aplicación (PrologEditor/)

| Capa | Path | Responsabilidad |
|------|------|-----------------|
| Frontend | `frontend/src/app/` | UI Angular, Services HTTP |
| Backend | `backend/src/` | REST API, MCP Client |
| Models (FE) | `frontend/src/app/models/` | Re-exports de SDK + locales |
| Types (BE) | `backend/src/types/` | Tipos específicos de servidor |

### 2.3 MCP Server (mcp-mesh-sdk/)

| Componente | Path | Tools expuestas |
|------------|------|-----------------|
| PrologServer | `servers/prolog-mcp-server/` | 7 tools, 3 resources |
| DevOpsServer | `servers/devops-mcp-server/` | N tools |
| LauncherServer | `servers/launcher-server/` | Orquestación |

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

| Tool MCP Server | Cliente Backend | Endpoint REST | Service Frontend | UI Component |
|-----------------|-----------------|---------------|------------------|--------------|
| `prolog_create_session` | `createSession()` | `POST /sessions` | `createSession()` | ❌ Pendiente |
| `prolog_list_sessions` | `listSessions()` | `GET /sessions` | `listSessions()` | ❌ Pendiente |
| `prolog_destroy_session` | `destroySession()` | `DELETE /sessions/:id` | `destroySession()` | ❌ Pendiente |
| `prolog_query` | `query()` | `POST /run-rule` | `runRule()` | ✅ RuleEditor |
| `prolog_assert_fact` | `assertFact()` | `POST /assert` | `assertFact()` | ❌ Pendiente |
| `prolog_consult_file` | `consultFile()` | `POST /consult` | `consultFile()` | ❌ Pendiente |
| `prolog_get_templates` | `getTemplates()` | `GET /mcp-templates` | `getMcpTemplates()` | ❌ Pendiente |

**Regla**: Toda tool debe estar alineada en las 5 capas para considerarse 100% completa.

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
| `@alephscript/mcp-core-sdk/types` | Types only | ✅ | ✅ |
| `rxjs` | Observables | ✅ | ✅ |
| `zod` | Validation | ✅ | ✅ |

### 4.3 Patrón de Re-export Seguro

```typescript
// frontend/src/app/models/session.model.ts
// ✅ CORRECTO: Re-export solo tipos (no runtime)
export type { PrologSession, CreateSessionRequest } from '@alephscript/mcp-core-sdk';

// ❌ INCORRECTO: Import de clase con dependencias Node
// import { MCPClient } from '@alephscript/mcp-core-sdk/client';
```

---

## 5. Protocolo de Tipos

### 5.1 Jerarquía de Decisión

```
¿Dónde definir un nuevo tipo?

1. ¿Lo usan múltiples packages?
   └─► SÍ → mcp-core-sdk/types/

2. ¿Es específico de un MCP Server?
   └─► SÍ → mcp-mesh-sdk/servers/{server}/types/

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

| Métrica | Fórmula | Objetivo |
|---------|---------|----------|
| Cobertura Backend | Tools con cliente / Total tools | 100% |
| Cobertura REST | Endpoints / Tools | 100% |
| Cobertura Frontend | Services / Endpoints | 100% |
| Cobertura UI | Componentes / Services | ≥80% |
| Tipos DRY | Tipos en core / Tipos totales | ≥70% |

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
| **Socket en frontend** | Error de build "fs not found" | Usar solo tipos |
| **Tool sin REST** | Tool funciona en Copilot, no en app | Añadir endpoint |
| **REST sin UI** | Endpoint existe pero nadie lo llama | Añadir componente o deprecar |
| **Spec desactualizada** | OpenAPI no refleja endpoints reales | Sync con código |

---

## 8. Comandos de Desarrollo

### 8.1 Arrancar Stack Completo

```bash
# Terminal 1: MCP Servers
cd MCPGallery && npm run start:mesh

# Terminal 2: Backend
cd PrologEditor/backend && npm run start:dev

# Terminal 3: Frontend
cd PrologEditor/frontend && npm start
```

### 8.2 Verificar Alineamiento

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
| OpenAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` | Contrato REST |
| AsyncAPI Spec | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/asyncapi.yaml` | Contrato MQTT |
| Agent Pack | `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` | Tools para agentes |
| Core SDK Types | `MCPGallery/mcp-core-sdk/src/types/` | Tipos compartidos |

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
