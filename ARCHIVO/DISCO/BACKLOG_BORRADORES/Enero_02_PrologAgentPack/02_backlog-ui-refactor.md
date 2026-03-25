# Backlog: PrologEditor UI Refactor (MCP Alignment)

> **Épica**: PROLOG-UI-2.0.0  
> **Effort total**: 21 pts  
> **Estado**: ✅ Completado  
> **Fecha**: 2026-01-03  
> **Aprobado**: 2026-01-03  
> **Cerrado**: 2026-01-03  
> **Dependencia**: SCRIPT-2.3.1 (PrologAgent Pack) ✅

---

## Contexto

El spike `spike-prolog-mcp-tools.md` reveló un gap crítico:

| Capa | Cobertura MCP |
|------|---------------|
| Backend | ✅ 100% (7/7 tools) |
| Frontend Service | ✅ 100% (7/7 métodos) |
| **Frontend UI** | ⚠️ **14%** (1/7 exposed) |

El `PrologService` tiene todos los métodos listos, pero la UI solo expone `runRule()`. 
Las sesiones MCP se crean implícitamente al cargar templates.

---

## Objetivo

Alinear la UI Angular con las 7 tools MCP del backend, exponiendo control explícito al usuario.

---

## Stories

| ID | Nombre | Effort | Estado | Prioridad |
|----|--------|--------|--------|-----------|
| S01 | Session Manager Component | 5 pts | ⏳ | 🔴 Alta |
| S02 | Knowledge Base Panel | 5 pts | ⏳ | 🟡 Media |
| S03 | MCP Templates Browser | 3 pts | ⏳ | 🟢 Baja |
| S04 | User App Save Dialog | 3 pts | ⏳ | 🟢 Baja |
| S05 | Telemetry Process Panel | 3 pts | ⏳ | 🟢 Baja |
| S06 | Integration & Polish | 2 pts | ⏳ | 🟡 Media |

---

## Tasks Detalladas

### S01: Session Manager Component (5 pts)

> **Objetivo**: Exponer control explícito de sesiones MCP
> **Tool MCP cubiertas**: `prolog_create_session`, `prolog_list_sessions`, `prolog_destroy_session`

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T001 | Crear `SessionManagerComponent` scaffold (ts, html, css) | 0.5 | ⏳ |
| T002 | Implementar formulario "Create Session" (sessionId, obraId) | 1 | ⏳ |
| T003 | Implementar tabla de sesiones activas con auto-refresh | 1 | ⏳ |
| T004 | Implementar botón "Destroy Session" con confirmación | 0.5 | ⏳ |
| T005 | Añadir indicador de sesión activa actual | 0.5 | ⏳ |
| T006 | Integrar en `AppModule` y layout principal | 0.5 | ⏳ |
| T007 | Tests unitarios del componente | 1 | ⏳ |

**Acceptance Criteria**:
- [ ] Usuario puede crear sesión con ID personalizado
- [ ] Usuario ve lista de sesiones activas
- [ ] Usuario puede destruir sesión específica
- [ ] UI muestra sesión actual seleccionada

---

### S02: Knowledge Base Panel (5 pts)

> **Objetivo**: Permitir operaciones de KB interactivas
> **Tool MCP cubiertas**: `prolog_assert_fact`, `prolog_consult_file`

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T008 | Crear `KnowledgeBaseComponent` scaffold | 0.5 | ⏳ |
| T009 | Implementar textarea "Assert Fact" con sintaxis hint | 1 | ⏳ |
| T010 | Implementar feedback de assert exitoso/fallido | 0.5 | ⏳ |
| T011 | Implementar file picker para "Consult File" | 1 | ⏳ |
| T012 | Mostrar lista de archivos consultados en sesión | 0.5 | ⏳ |
| T013 | Validación de sintaxis Prolog básica (client-side) | 0.5 | ⏳ |
| T014 | Tests unitarios del componente | 1 | ⏳ |

**Acceptance Criteria**:
- [ ] Usuario puede assertar hechos manualmente
- [ ] Usuario puede consultar archivos .pl
- [ ] UI valida sintaxis básica antes de enviar
- [ ] Feedback claro de éxito/error

---

### S03: MCP Templates Browser (3 pts)

> **Objetivo**: Explorar catálogo de templates MCP (diferente de SDK local)
> **Tool MCP cubierta**: `prolog_get_templates`

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T015 | Crear `McpTemplatesBrowserComponent` scaffold | 0.5 | ⏳ |
| T016 | Implementar grid/lista de templates con descripción | 1 | ⏳ |
| T017 | Implementar "Load Template" que crea sesión automática | 0.5 | ⏳ |
| T018 | Diferenciar visualmente de SDK templates locales | 0.5 | ⏳ |
| T019 | Tests unitarios del componente | 0.5 | ⏳ |

**Acceptance Criteria**:
- [ ] Usuario ve catálogo de templates MCP
- [ ] Usuario puede cargar template y crear sesión
- [ ] UI distingue MCP templates de SDK templates

---

### S04: User App Save Dialog (3 pts)

> **Objetivo**: Guardar aplicaciones Prolog personalizadas
> **Endpoint cubierto**: `POST /user-app`

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T020 | Crear `UserAppSaveDialogComponent` scaffold | 0.5 | ⏳ |
| T021 | Implementar modal con input nombre + preview contenido | 1 | ⏳ |
| T022 | Implementar llamada a `saveUserApp()` | 0.5 | ⏳ |
| T023 | Añadir botón "Save As..." en RuleEditorComponent | 0.5 | ⏳ |
| T024 | Tests unitarios del componente | 0.5 | ⏳ |

**Acceptance Criteria**:
- [ ] Usuario puede guardar app con nombre personalizado
- [ ] Modal muestra preview del contenido
- [ ] Feedback de guardado exitoso

---

### S05: Telemetry Process Panel (3 pts)

> **Objetivo**: Enviar telemetría IoT manualmente para testing
> **Endpoint cubierto**: `POST /telemetry/process`

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T025 | Crear `TelemetryProcessComponent` scaffold | 0.5 | ⏳ |
| T026 | Implementar formulario sensor + value | 0.5 | ⏳ |
| T027 | Implementar envío y mostrar resultado/alerts | 0.5 | ⏳ |
| T028 | Integrar en DashboardComponent | 0.5 | ⏳ |
| T029 | Preset de sensores comunes (temp, humidity, etc.) | 0.5 | ⏳ |
| T030 | Tests unitarios del componente | 0.5 | ⏳ |

**Acceptance Criteria**:
- [ ] Usuario puede simular envío de telemetría
- [ ] UI muestra resultado del procesamiento
- [ ] Presets de sensores para testing rápido

---

### S06: Integration & Polish (2 pts)

> **Objetivo**: Integrar todos los componentes y pulir UX

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T031 | Reorganizar layout principal con tabs/sidebar | 0.5 | ⏳ |
| T032 | Añadir navegación entre secciones | 0.5 | ⏳ |
| T033 | Revisar estilos consistentes Bootstrap | 0.5 | ⏳ |
| T034 | Documentar nuevos componentes en README | 0.5 | ⏳ |

**Acceptance Criteria**:
- [ ] Navegación fluida entre secciones
- [ ] Estilos consistentes
- [ ] README actualizado

---

## Cobertura Final Esperada

| Tool MCP | Endpoint | UI Component | Estado Post-Refactor |
|----------|----------|--------------|---------------------|
| `prolog_create_session` | POST /sessions | SessionManagerComponent | ✅ |
| `prolog_list_sessions` | GET /sessions | SessionManagerComponent | ✅ |
| `prolog_destroy_session` | DELETE /sessions/:id | SessionManagerComponent | ✅ |
| `prolog_query` | POST /run-rule | RuleEditorComponent | ✅ (ya existe) |
| `prolog_assert_fact` | POST /assert | KnowledgeBaseComponent | ✅ |
| `prolog_consult_file` | POST /consult | KnowledgeBaseComponent | ✅ |
| `prolog_get_templates` | GET /mcp-templates | McpTemplatesBrowserComponent | ✅ |

**Resultado esperado**: ✅ **7/7 tools con UI** (100%)

---

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                     AppComponent                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │ SessionManager      │  │ RuleEditor (existente)      │  │
│  │ ├─ Create Session   │  │ ├─ Template Selector        │  │
│  │ ├─ Sessions List    │  │ ├─ Query Textarea           │  │
│  │ └─ Destroy Button   │  │ ├─ Run/Save Buttons         │  │
│  └─────────────────────┘  │ └─ Save As... (nuevo)       │  │
│                           └─────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │ KnowledgeBase       │  │ McpTemplatesBrowser         │  │
│  │ ├─ Assert Fact      │  │ ├─ Template Grid            │  │
│  │ └─ Consult File     │  │ └─ Load Template            │  │
│  └─────────────────────┘  └─────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Dashboard                                            │  │
│  │ ├─ TelemetryMonitor (existente)                      │  │
│  │ └─ TelemetryProcess (nuevo)                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Dependencias Técnicas

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| @angular/core | 18.x | Framework |
| @angular/forms | 18.x | FormsModule para inputs |
| Bootstrap | 5.x | Estilos (ya instalado) |
| PrologService | existente | HTTP client || @alephscript/mcp-core-sdk | 1.0.2+ | Tipos compartidos (DRY) |

---

## Alineación de Tipos (SDK)

> **Estado**: ✅ Ya implementado — Los nuevos componentes DEBEN mantener esta práctica.

### Patrón Existente

El frontend usa **re-exports** del SDK, no tipos duplicados:

```typescript
// frontend/src/app/models/rule.model.ts
export type { Rule, RuleInput } from '@alephscript/mcp-core-sdk/types/prolog';
```

### Modelos Alineados

| Modelo Frontend | Tipos SDK |
|-----------------|----------|
| `rule.model.ts` | `Rule`, `RuleInput`, `RuleCreatedResponse` |
| `session.model.ts` | `PrologSession`, `CreateSessionRequest`, `SessionResponse` |
| `template.model.ts` | `Template`, `TemplateContentResponse`, `TemplatesCatalog` |
| `telemetry.model.ts` | `Telemetry`, `TelemetryStatus`, `MCPEvent` |

### Regla para Nuevos Componentes

**OBLIGATORIO**: Todo tipo nuevo debe:
1. Verificar si existe en `@alephscript/mcp-core-sdk/types/prolog`
2. Si existe → re-exportar desde `models/`
3. Si no existe → proponer adición al SDK (PR)
---

## Definition of Done

- [ ] Todos los componentes implementados
- [ ] Tests unitarios pasando
- [ ] 7/7 tools MCP expuestas en UI
- [ ] README actualizado
- [ ] Commit conforme a DEVOPS.md

---

## Estimación de Tiempo

| Story | Effort | Días estimados |
|-------|--------|----------------|
| S01 | 5 pts | 1-2 días |
| S02 | 5 pts | 1-2 días |
| S03 | 3 pts | 0.5-1 día |
| S04 | 3 pts | 0.5-1 día |
| S05 | 3 pts | 0.5-1 día |
| S06 | 2 pts | 0.5 día |
| **Total** | **21 pts** | **4-7 días** |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-03 | Creación del backlog desde spike | @scrum |
