# Backlog: Prolog MCP Server Integration

> **Épica**: SCRIPT-2.3.0  
> **Opportunity**: Aleph Scriptorium  
> **Effort total**: 27 pts  
> **Estado**: ✅ FC1 Completado  
> **FC1 Completado**: 23 pts ✅  
> **FC2 Pendiente**: 4 pts ⏳  
> **Fecha creación**: 2026-01-02  
> **Último commit**: 18f5d88 (docs + feat Prolog MCP Server)

---

## Contexto

Integrar el motor Prolog como servidor MCP en la mesh, basado en la arquitectura de `AAIAGallery/PrologServer`.

**Base técnica**: 
- `AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server.ts`
- Clase instanciable con binding `swipl-stdio`
- Soporte multi-engine para sesiones aisladas

**Integración**: 
- `MCPGallery/mcp-mesh-sdk` siguiendo patrón `devops-mcp-server`
- Puerto: 3006
- Gestión de sesiones para múltiples obras del Teatro

---

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Config + Session Manager + Server Base | 16 pts |
| FC2 | Implementación real de queries + Tests E2E | 11 pts |

---

## Story: SCRIPT-2.3.0-S01 — Configuración y Registro

**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ✅ Completado

### Descripción
Crear configuración del servidor Prolog y registrarlo en MCPLauncherServer.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `DEFAULT_PROLOG_MCP_SERVER_CONFIG.ts` | 1 | ✅ |
| T002 | Exportar en `configs/index.ts` | 0.5 | ✅ |
| T003 | Registrar en `CONFIGS_BASE_MCP_SERVER` | 0.5 | ✅ |

### Criterios de Aceptación
- [x] Config existe en `MCPGallery/mcp-mesh-sdk/src/configs/`
- [x] Puerto 3006 asignado sin conflictos
- [x] Exportación en index.ts correcta
- [x] Servidor registrado en `CONFIGS_BASE_MCP_SERVER` de MCPLauncherServer.ts

### Archivos Afectados
- `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_PROLOG_MCP_SERVER_CONFIG.ts` (nuevo)
- `MCPGallery/mcp-mesh-sdk/src/configs/index.ts` (modificar)
- `MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts` (modificar)

---

## Story: SCRIPT-2.3.0-S02 — Session Manager

**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ✅ Completado

### Descripción
Crear gestor de sesiones Prolog que permita múltiples obras operando sobre KBs aisladas.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T004 | Crear interfaz `PrologSession` | 1 | ✅ |
| T005 | Implementar `PrologSessionManager` | 3 | ✅ |
| T006 | Implementar cleanup de sesiones expiradas | 1 | ✅ |

### Criterios de Aceptación
- [x] `PrologSessionManager` gestiona Map de sesiones
- [x] Cada sesión tiene su propia instancia de `PrologEngine`
- [x] Timeout de 1 hora por sesión
- [x] Cleanup automático cada 5 minutos
- [x] Métodos: `createSession`, `getSession`, `destroySession`, `listSessions`

### Archivos Afectados
- `MCPGallery/mcp-mesh-sdk/src/services/PrologSessionManager.ts` (nuevo)

---

## Story: SCRIPT-2.3.0-S03 — MCP Server Base

**Effort**: 8 pts  
**Prioridad**: Must  
**Estado**: ✅ Completado (FC1)

### Descripción
Crear servidor MCP con tools y resources (versión mock para FC1).

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Crear clase `MCPPrologServer` extendiendo `BaseMCPServer` | 2 | ✅ |
| T008 | Implementar tool `create_session` (funcional) | 1 | ✅ |
| T009 | Implementar tool `destroy_session` (funcional) | 0.5 | ✅ |
| T010 | Implementar tool `list_sessions` (funcional) | 0.5 | ✅ |
| T011 | Implementar tools con queries reales (S04) | 2 | ✅ |
| T012 | Implementar resources: `session-state`, `templates-catalog` | 1 | ✅ |
| T013 | Implementar CLI entry point + cleanup | 1 | ✅ |

### Criterios de Aceptación
- [x] Servidor arranca en puerto 3006
- [x] Responde a health check
- [x] Tools de sesión funcionan (create, destroy, list)
- [x] Tools de queries retornan datos reales (S04)
- [x] Resources accesibles vía URI
- [x] Graceful shutdown

### Archivos Afectados
- `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` (nuevo)

---

## Story: SCRIPT-2.3.0-S04 — Implementación Real de Queries

**Effort**: 8 pts  
**Prioridad**: Must  
**Estado**: ✅ Completado (FC1)

### Descripción
Integrar `swipl-stdio` para queries Prolog reales, basadas en patrón AAIAGallery.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T014 | Crear local `PrologEngine` (sin dependencias externas) | 3 | ✅ |
| T015 | Implementar `handleQueryProlog` real | 2 | ✅ |
| T016 | Implementar `handleAssertFact` real | 1.5 | ✅ |
| T017 | Implementar `handleConsultFile` real con caching | 1.5 | ✅ |

### Criterios de Aceptación
- [x] `PrologEngine` instanciable para sesiones aisladas
- [x] `query()` retorna todos los solutions
- [x] `assertFact()` modifica KB persistentemente
- [x] `loadPrologFiles()` con cache JSON en disco
- [x] Compilación TypeScript sin errores
- [x] Integración con `PrologSessionManager`

### Archivos Afectados
- `MCPGallery/mcp-mesh-sdk/src/services/PrologEngine.ts` (nuevo)
- `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` (actualizar handlers)
- `MCPGallery/mcp-mesh-sdk/src/services/PrologSessionManager.ts` (usar PrologEngine)
- `MCPGallery/mcp-mesh-sdk/package.json` (agregar swipl-stdio)

---

---

## Story: SCRIPT-2.3.0-S05 — Tests E2E

**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente (FC2)

### Descripción
Escribir tests end-to-end para validar flujo completo de sesiones y queries.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T018 | Test: Session creation y lifecycle | 1 | ⏳ |
| T019 | Test: Query execution con múltiples engines | 1 | ⏳ |
| T020 | Test: File caching y persistence | 0.5 | ⏳ |
| T021 | Test: Session timeout y cleanup automático | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] Tests en `MCPGallery/mcp-mesh-sdk/tests/e2e/` 
- [ ] Coverage ≥80% de PrologEngine y PrologSessionManager
- [ ] Validación de aislamiento entre sesiones
- [ ] Validación de cache persistence
- [ ] Todos los tests pasan (`npm run test:e2e`)

### Archivos Afectados
- `MCPGallery/mcp-mesh-sdk/tests/e2e/prolog-server.e2e.test.ts` (nuevo)

---

## Story: SCRIPT-2.3.0-S06 — Documentación

**Effort**: 2 pts  
**Prioridad**: Should  
**Estado**: ✅ Parcialmente Completado

### Descripción
Documentar API, ejemplos y patrones de uso del servidor Prolog.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T022 | Documentar en README-SCRIPTORIUM.md (dependencias + tools) | 1 | ✅ |
| T023 | Actualizar blueprint-logic-flow.md con diagrama | 1 | ⏳ |

### Criterios de Aceptación
- [x] README documenta: tools, resources, session lifecycle
- [x] Incluye instrucciones de instalación de SWI-Prolog por OS
- [x] Documenta tabla de dependencias por servidor
- [ ] Blueprint actualizado con flujo Prolog MCP

### Archivos Afectados
- `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` (✅ actualizado)
- `docs/blueprint-logic-flow.md` (⏳ pendiente)

---

## Dependencias

| Desde | Hacia | Tipo |
|-------|-------|------|
| S02 → S03 | PrologSessionManager debe existir | Técnica |
| S01 → S03 | Config debe estar registrada | Técnica |
| S03 → S04 | Server base antes de implementación real | Lógica |
| S04 → S05 | Tests E2E requieren queries funcionales | Lógica |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| PrologServer sin API compatible | Alta | Alto | Crear adapter wrapper en S04 |
| Binding swipl-stdio no instalado | Media | Alto | Documentar instalación + fallback |
| Memory leaks en sesiones | Media | Medio | Timeout + cleanup implementado en S02 |
| Concurrencia en KB | Baja | Medio | Serializar ops o mutex por sesión |

---

## Métricas de Éxito

| Métrica | Target | Verificación |
|---------|--------|--------------|
| Servidor arranca | <5s | CLI logs |
| Sesiones concurrentes | ≥3 | Test carga |
| Tiempo creación sesión | <500ms | Test performance |
| Memory footprint | <100MB | htop/Task Manager |

---

## Referencias

| Documento | Ubicación |
|-----------|-----------|
| Plan de Integración | [05_plan_integracion_prolog_mcp.md](05_plan_integracion_prolog_mcp.md) |
| Informe de Sesiones | [04_informe_sesiones_prolog_mcp.md](04_informe_sesiones_prolog_mcp.md) |
| Feature 1: Prolog Inteligencias Situadas | [../Enero_2026_LogicaAgentes/feature1](../Enero_2026_LogicaAgentes/feature1_prolog_inteligencias_situadas.md) |
| Feature 2: Agentic Typed Logic Flow | [../Enero_2026_LogicaAgentes/feature2](../Enero_2026_LogicaAgentes/feature2_agentic_typed_logic_flow.md) |
| PrologServer código base | `AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server.ts` |
| MCPLauncherServer | `MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts` |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-02 | ✅ FC1 completado: tests MCP exitosos con SWI-Prolog real | @ox |
| 2026-01-02 | ✅ T022: Documentación en README-SCRIPTORIUM.md | @ox |
| 2026-01-02 | Creación del backlog borrador | @scrum |
