# Backlog: OpenAPI Client Generation para MCPPrologServer

> **Épica**: PROLOG-CLIENT-GEN-1.0.0  
> **Effort total**: 13 pts  
> **Estado**: ✅ Completado  
> **Fecha**: 2026-01-03  
> **Completado**: 2026-01-03  
> **Dependencia**: PROLOG-UI-2.0.0 (S07 opcional, no bloqueante)  
> **Prioridad**: 🟡 Media (valor alto, no urgente)

---

## Contexto

### Arquitectura Actual

```
┌─────────────────────────────────────────────────────────────────┐
│  Angular Frontend                                               │
│       ↓ HTTP                                                    │
│  Backend REST (8000)  ←───── SQLite (rules, templates)         │
│       ↓ MCP                                                     │
│  MCPPrologServer (3006) ←── swipl-stdio (Prolog engine)        │
└─────────────────────────────────────────────────────────────────┘
```

**Limitación**: MCPPrologServer no puede acceder a datos persistidos (rules, templates) sin que el frontend/backend los pase explícitamente.

### Arquitectura Propuesta (Ciclo Cerrado)

```
┌─────────────────────────────────────────────────────────────────┐
│  Angular Frontend                                               │
│       ↓ HTTP                                                    │
│  Backend REST (8000)  ←───── SQLite (rules, templates)         │
│       ↓ MCP                    ↑                                │
│  MCPPrologServer (3006) ──────┘ (OpenAPI client generado)      │
│       ↑                                                         │
│  swipl-stdio (Prolog engine)                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Ganancia**: MCPPrologServer puede leer/escribir rules y templates directamente, habilitando agentes autónomos.

---

## Análisis de Tipos Compartidos

### Fuente Única de Verdad: `@alephscript/mcp-core-sdk`

```
MCPGallery/mcp-core-sdk/src/types/
├── prolog/index.ts    → 30+ tipos de dominio Prolog
├── mcp.ts             → 25+ tipos de protocolo MCP
└── index.ts           → Re-exports
```

### Tipos Relevantes para Cliente Generado

| Tipo SDK | Uso en Cliente | Endpoint |
|----------|----------------|----------|
| `Rule` | Response `GET /rules` | ✅ Reutilizable |
| `RuleInput` | Request `POST /rules` | ✅ Reutilizable |
| `RuleCreatedResponse` | Response `POST /rules` | ✅ Reutilizable |
| `Template` | Response `GET /sdk-templates` | ✅ Reutilizable |
| `TemplateContentResponse` | Response `GET /template/:name` | ✅ Reutilizable |
| `TelemetryStatus` | Response `GET /telemetry/status` | ✅ Reutilizable |
| `ApiError` | Error responses | ✅ Reutilizable |

### Estrategia de Tipos

**Opción A**: Generar tipos desde OpenAPI (duplicación)  
**Opción B**: Configurar generator para importar tipos de SDK ✅ **ELEGIDA**

```typescript
// Cliente generado usará:
import type { Rule, RuleInput, Template } from '@alephscript/mcp-core-sdk/types';
```

**Beneficio**: Single source of truth, sin divergencia de tipos.

---

## Endpoints Target (Sin Ciclo)

### ✅ Endpoints SEGUROS (no invocan MCP)

| Endpoint | Método | Propósito MCP Server |
|----------|--------|---------------------|
| `GET /rules` | GET | Leer rules para cargar en KB |
| `GET /rules/:app` | GET | Filtrar rules por app |
| `POST /rules` | POST | Persistir inferencias |
| `DELETE /rules/:id` | DELETE | Eliminar rule obsoleta |
| `GET /sdk-templates` | GET | Listar templates disponibles |
| `GET /template/:name` | GET | Cargar contenido template |
| `GET /telemetry/status` | GET | Consultar estado sensores |

### ❌ Endpoints PROHIBIDOS (crearían ciclo)

| Endpoint | Razón |
|----------|-------|
| `POST /sessions` | Invoca `prolog_create_session` → MCPPrologServer |
| `GET /sessions` | Invoca `prolog_list_sessions` → MCPPrologServer |
| `DELETE /sessions/:id` | Invoca `prolog_destroy_session` → MCPPrologServer |
| `POST /run-rule` | Invoca `prolog_query` → MCPPrologServer |
| `POST /assert` | Invoca `prolog_assert_fact` → MCPPrologServer |
| `POST /consult` | Invoca `prolog_consult_file` → MCPPrologServer |
| `GET /mcp-templates` | Invoca `prolog_get_templates` → MCPPrologServer |
| `POST /telemetry/process` | Invoca lógica Prolog |

---

## Stories

| ID | Nombre | Effort | Estado | Prioridad |
|----|--------|--------|--------|-----------|
| S01 | OpenAPI Spec Subset | 2 pts | ⏳ | 🔴 Alta |
| S02 | Generator Configuration | 2 pts | ⏳ | 🔴 Alta |
| S03 | Client Generation & Integration | 3 pts | ⏳ | 🔴 Alta |
| S04 | New MCP Tools | 4 pts | ⏳ | 🟡 Media |
| S05 | Testing & Documentation | 2 pts | ⏳ | 🟢 Baja |

---

## Tasks Detalladas

### S01: OpenAPI Spec Subset (2 pts)

> **Objetivo**: Crear spec reducida solo con endpoints seguros

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T001 | Crear `openapi-safe.yaml` sin endpoints MCP | 0.5 | ⏳ |
| T002 | Validar spec con `npx @openapitools/openapi-generator-cli validate` | 0.25 | ⏳ |
| T003 | Añadir `x-typescript-type` extensions para reutilizar tipos SDK | 0.5 | ⏳ |
| T004 | Documentar decisiones en spec header | 0.25 | ⏳ |
| T005 | Ubicar en `MCPGallery/mcp-mesh-sdk/specs/` | 0.25 | ⏳ |
| T006 | Añadir script `npm run spec:validate` | 0.25 | ⏳ |

**Acceptance Criteria**:
- [ ] Spec contiene solo 7 endpoints seguros
- [ ] Spec valida sin errores
- [ ] Extensions para tipos SDK documentados

---

### S02: Generator Configuration (2 pts)

> **Objetivo**: Configurar openapi-generator para TypeScript con tipos SDK

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T007 | Instalar `@openapitools/openapi-generator-cli` | 0.25 | ⏳ |
| T008 | Crear `openapitools.json` config | 0.5 | ⏳ |
| T009 | Crear template override para imports SDK | 0.5 | ⏳ |
| T010 | Configurar output directory `src/generated/` | 0.25 | ⏳ |
| T011 | Añadir script `npm run client:generate` | 0.25 | ⏳ |
| T012 | Configurar `.gitignore` para generados (o no) | 0.25 | ⏳ |

**Decisión Arquitectónica**:

```json
// openapitools.json
{
  "generator-cli": {
    "generators": {
      "prolog-backend-client": {
        "generatorName": "typescript-fetch",
        "output": "src/generated/prolog-backend-client",
        "inputSpec": "specs/openapi-safe.yaml",
        "additionalProperties": {
          "typeMappings": "Rule=Rule,RuleInput=RuleInput,Template=Template",
          "importMappings": "Rule=@alephscript/mcp-core-sdk/types"
        }
      }
    }
  }
}
```

**Acceptance Criteria**:
- [ ] Generator instalado y configurado
- [ ] Tipos SDK mapeados correctamente
- [ ] Script de generación funcional

---

### S03: Client Generation & Integration (3 pts)

> **Objetivo**: Generar cliente e integrarlo en MCPPrologServer

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T013 | Ejecutar generación inicial | 0.25 | ⏳ |
| T014 | Revisar y limpiar código generado | 0.5 | ⏳ |
| T015 | Crear wrapper `PrologBackendClient` con logging | 0.5 | ⏳ |
| T016 | Añadir config de `PROLOG_BACKEND_URL` env var | 0.25 | ⏳ |
| T017 | Integrar cliente en `MCPPrologServer` constructor | 0.5 | ⏳ |
| T018 | Manejar error de backend no disponible | 0.5 | ⏳ |
| T019 | Añadir health check del backend | 0.5 | ⏳ |

**Código Esperado**:

```typescript
// MCPPrologServer.ts
import { PrologBackendClient } from './generated/prolog-backend-client';

export class MCPPrologServer extends BaseMCPServer {
  private backendClient: PrologBackendClient;
  
  constructor() {
    super(DEFAULT_PROLOG_MCP_SERVER_CONFIG);
    this.backendClient = new PrologBackendClient({
      basePath: process.env.PROLOG_BACKEND_URL || 'http://localhost:8000/api'
    });
  }
}
```

**Acceptance Criteria**:
- [ ] Cliente generado compila sin errores
- [ ] MCPPrologServer puede instanciar cliente
- [ ] Error handling para backend offline

---

### S04: New MCP Tools (4 pts)

> **Objetivo**: Exponer capacidades del backend como tools MCP

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T020 | Tool `prolog_load_rules_from_db` - carga rules en KB | 1.0 | ⏳ |
| T021 | Tool `prolog_save_rule_to_db` - persiste regla | 0.75 | ⏳ |
| T022 | Tool `prolog_list_sdk_templates` - lista templates locales | 0.5 | ⏳ |
| T023 | Tool `prolog_get_sdk_template_content` - carga template | 0.5 | ⏳ |
| T024 | Tool `prolog_get_telemetry_status` - estado sensores | 0.5 | ⏳ |
| T025 | Documentar tools en descripción MCP | 0.25 | ⏳ |
| T026 | Actualizar catálogo de capabilities | 0.25 | ⏳ |
| T027 | Prevenir ciclos con flag interno | 0.25 | ⏳ |

**Nueva Tool Principal**:

```typescript
// Tool: Load rules from database into current session KB
this.server.tool(
  "prolog_load_rules_from_db",
  "Load persisted rules from SQLite into session knowledge base",
  {
    sessionId: z.string().describe("Target session"),
    app: z.string().optional().describe("Filter by app name"),
  },
  async ({ sessionId, app }) => {
    // 1. GET /rules or GET /rules/:app via backendClient
    // 2. For each rule, assert into session KB
    // 3. Return count loaded
  }
);
```

**Acceptance Criteria**:
- [ ] 5 nuevas tools funcionales
- [ ] Sin ciclos de invocación
- [ ] Documentación en MCP discovery

---

### S05: Testing & Documentation (2 pts)

> **Objetivo**: Validar integración y documentar

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T028 | Test unitario: cliente generado | 0.5 | ⏳ |
| T029 | Test integración: MCP → Backend → DB | 0.5 | ⏳ |
| T030 | Test ciclo completo: load rules → query → save | 0.5 | ⏳ |
| T031 | Documentar en README-SCRIPTORIUM.md | 0.25 | ⏳ |
| T032 | Actualizar spike con resultado | 0.25 | ⏳ |

**Acceptance Criteria**:
- [ ] Tests pasando
- [ ] Documentación actualizada
- [ ] Spike cerrado

---

## Inventario Final de Tools MCP

### Existentes (7)

| Tool | Propósito |
|------|-----------|
| `prolog_create_session` | Crear sesión |
| `prolog_query` | Ejecutar consulta |
| `prolog_assert_fact` | Añadir hecho |
| `prolog_consult_file` | Cargar .pl |
| `prolog_destroy_session` | Destruir sesión |
| `prolog_list_sessions` | Listar activas |
| `prolog_get_templates` | Catálogo MCP templates |

### Nuevas (5)

| Tool | Propósito |
|------|-----------|
| `prolog_load_rules_from_db` | Cargar rules de SQLite en KB |
| `prolog_save_rule_to_db` | Persistir regla en SQLite |
| `prolog_list_sdk_templates` | Listar templates locales |
| `prolog_get_sdk_template_content` | Cargar contenido template |
| `prolog_get_telemetry_status` | Estado de sensores IoT |

**Total post-épica**: 12 tools MCP

---

## Diagrama de Flujo (Ciclo Cerrado)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO AUTÓNOMO                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Agente MCP inicia                                          │
│     ↓                                                          │
│  2. prolog_create_session("agent-001", "iot-app")              │
│     ↓                                                          │
│  3. prolog_load_rules_from_db("agent-001", "iot-app")          │
│     ↓ HTTP (cliente generado)                                  │
│  4. Backend: GET /rules/iot-app → SQLite → [rules]             │
│     ↓                                                          │
│  5. MCPPrologServer: assert cada rule en KB                    │
│     ↓                                                          │
│  6. prolog_query("agent-001", "alert(X).")                     │
│     ↓                                                          │
│  7. [inferencias]                                              │
│     ↓                                                          │
│  8. prolog_save_rule_to_db("inferred_alert", ...)              │
│     ↓ HTTP (cliente generado)                                  │
│  9. Backend: POST /rules → SQLite                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Ciclo infinito MCP→Backend→MCP | Media | Alto | Flag `_fromMCP` + lista negra de endpoints |
| Tipos divergentes SDK vs generados | Baja | Medio | Usar `importMappings` en generator |
| Backend offline durante operación | Media | Medio | Retry + fallback + logging |
| Versión spec desactualizada | Baja | Bajo | Script CI de validación |

---

## Prevención de Ciclos

```typescript
// En MCPPrologServer - NO exponer como tool
private async loadRulesFromBackend(sessionId: string, app?: string): Promise<Rule[]> {
  // Esta es función privada, NO tool
  // Las tools de sessions/query ya no pasan por backend
  return this.backendClient.rulesApi.getAllRules({ app });
}
```

**Regla de Oro**:
- Tools que usan Prolog engine → implementación local
- Tools que usan SQLite → via cliente backend
- NUNCA: Tool MCP → Backend → Tool MCP

---

## Dependencias Técnicas

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| `@openapitools/openapi-generator-cli` | ^2.x | Generator |
| `typescript-fetch` generator | latest | Template TS |
| `@alephscript/mcp-core-sdk` | 1.0.2+ | Tipos compartidos |
| OpenAPI spec | 3.1.0 | Source |

---

## Definition of Done

- [ ] Spec subset creada y validada
- [ ] Cliente generado con tipos SDK
- [ ] 5 nuevas tools MCP funcionales
- [ ] Tests de integración pasando
- [ ] Sin ciclos de invocación
- [ ] README actualizado

---

## Estimación de Tiempo

| Story | Effort | Días estimados |
|-------|--------|----------------|
| S01 | 2 pts | 0.5 día |
| S02 | 2 pts | 0.5 día |
| S03 | 3 pts | 1 día |
| S04 | 4 pts | 1-1.5 días |
| S05 | 2 pts | 0.5 día |
| **Total** | **13 pts** | **3-4 días** |

---

## Relación con UI Refactor

Esta épica es **complementaria** a PROLOG-UI-2.0.0:

| Épica | Foco | Beneficiario |
|-------|------|--------------|
| PROLOG-UI-2.0.0 | UI para humanos | Frontend Angular |
| **PROLOG-CLIENT-GEN-1.0.0** | Autonomía para agentes | MCPPrologServer |

**Orden sugerido**: UI primero (más valor inmediato), luego Client Gen (habilita escenarios avanzados).

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-03 | Creación del backlog con análisis de tipos | @scrum |
