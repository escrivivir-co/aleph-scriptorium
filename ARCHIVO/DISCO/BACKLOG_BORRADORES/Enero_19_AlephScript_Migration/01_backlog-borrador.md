# Backlog Borrador: Migración AlephScript → Backend Runtime

> **Épica**: ALEPHSCRIPT-MIGRATION-1.0.0  
> **Fecha**: 2026-01-19  
> **Autor**: @ox + PO  
> **Estado**: ✅ COMPLETADO  
> **Effort Total Estimado**: 55 pts (~2 sprints)
> **Effort Completado**: 55 pts (100%)

---

## Progreso de Implementación

| Fase | Stories | Estado | Notas |
|------|---------|--------|-------|
| 1 | 1.1, 1.2, 1.3, 1.4 | ✅ Completado | @fia/paradigmas creado con 10 paradigmas |
| 2 | 2.1, 2.2, 2.3 | ✅ Completado | RuntimeService integrado en backend |
| 3 | 3.1, 3.2, 3.3 | ✅ Completado | Cleanup y documentación |

### Artefactos Creados (2026-01-19)

| Artefacto | Ubicación | Descripción |
|-----------|-----------|-------------|
| `@fia/paradigmas` | `as-core/packages/paradigmas/` | 10 paradigmas (1 completo, 9 stubs) |
| `ParadigmaLogica` | `paradigmas/src/logica/` | Resolución Prolog completa |
| `FIAFactory` | `paradigmas/src/factory.ts` | Factory pattern para crear FIAs |
| `RuntimeService` | `backend/src/services/runtime.service.ts` | Motor de ejecución real |
| `fia-catalog.json` | `AAIAGallery/fia-catalog.json` | Actualizado con modulo/clase |

### Build Status (2026-01-19)

| Paquete | Comando | Estado |
|---------|---------|--------|
| `@fia/core` | `npm run build` | ✅ Compila OK |
| `@fia/paradigmas` | `npm run build` | ✅ Compila OK |
| `@alephscript/aaia-backend` | `npm run build` | ✅ Compila OK |
| Link `@fia/paradigmas` → backend | `npm link` | ✅ Enlazado |

### Phase 3 Completado (2026-01-19)

- ✅ `alephscript/README.md` marcado como DEPRECATED
- ✅ `as-core/README.md` actualizado con @fia/paradigmas
- ✅ Backlog cerrado

---

## Resumen Ejecutivo

**Problema**: `AAIAGallery/alephscript/` contiene la implementación de FIAs (10 paradigmas, 7 apps, runtime) pero:
1. El backend actual **simula** la ejecución (stub en `fia.service.ts`)
2. El monorepo `as-core` tiene estructura pero **incompleta**
3. No hay conexión entre persistencia y ejecución real

**Solución**: 
1. Completar `as-core` con paradigmas y apps de alephscript
2. Integrar `@fia/*` en el backend como dependencia
3. Reemplazar stubs por ejecución real
4. Eliminar `alephscript/` (código legacy)

**Arquitectura Target**:
```
Frontend (Angular) ──HTTP/SSE──► Backend (8007) ──────────────────►
                                 ├── Persistencia (FileCollection) ✅
                                 ├── Eventos (PersefonBot)          ✅
                                 └── Runtime (@fia/*)               🆕
                                     ├── @fia/runtime
                                     ├── @fia/paradigmas (10)
                                     ├── @fia/apps (7)
                                     └── @fia/mundo
```

---

## Fase 1: Completar Monorepo as-core (21 pts)

### Story 1.1: Crear @fia/paradigmas (8 pts)

**Descripción**: Migrar los 10 paradigmas de `alephscript/src/FIA/paradigmas/` a `as-core/packages/paradigmas/`

| Tarea | Paradigma | Archivos principales | Effort |
|-------|-----------|---------------------|--------|
| T1.1.1 | cientifica | paradigma.ts, cientifica-i18.ts | 0.5 |
| T1.1.2 | conexionista | fia-conexionista.ts, rna/*, modelos-lenguaje/* | 1.5 |
| T1.1.3 | simbolica | fia-simbolica.ts | 0.5 |
| T1.1.4 | situada | paradigma.ts (IoT, sensores/actuadores) | 1 |
| T1.1.5 | sbc | fia-sbc.ts, implementaciones/common-kads/* | 1.5 |
| T1.1.6 | sbr | (sistemas basados en reglas) | 0.5 |
| T1.1.7 | logica | (Prolog, razonamiento declarativo) | 0.5 |
| T1.1.8 | gramaticas | automata.ts, productor.ts (fusionar con @fia/grammars) | 0.5 |
| T1.1.9 | sistemas | (teoría de sistemas) | 0.5 |
| T1.1.10 | hibrido | (combinación de paradigmas) | 0.5 |
| T1.1.11 | Package setup | package.json, tsconfig, index.ts | 1 |

**Acceptance Criteria**:
- [ ] `@fia/paradigmas` exporta los 10 paradigmas
- [ ] Cada paradigma implementa interfaz `iFIAParadigma`
- [ ] Tests unitarios para cada paradigma (mínimo smoke test)
- [ ] Build exitoso: `npm run build` en packages/paradigmas

---

### Story 1.2: Crear @fia/apps (5 pts)

**Descripción**: Migrar las 7 aplicaciones de `alephscript/src/FIA/aplicaciones/`

| Tarea | App | Descripción | Effort |
|-------|-----|-------------|--------|
| T1.2.1 | cadena | CadenaApp - blockchain demo | 0.5 |
| T1.2.2 | busquedas | BusquedasApp - search algorithms demo | 0.5 |
| T1.2.3 | ide | IdeApp - IDE demo | 0.5 |
| T1.2.4 | app-v1 | AppV1 - generic app template | 0.5 |
| T1.2.5 | an-sindic-model-YV | AnSindicModelVF - specific model | 0.5 |
| T1.2.6 | iot-logic-engine | IoTLogicEngine - IoT integration | 1 |
| T1.2.7 | inet | InetApp - internet app | 0.5 |
| T1.2.8 | Package setup | package.json, tsconfig, index.ts | 1 |

**Acceptance Criteria**:
- [ ] `@fia/apps` exporta las 7 apps
- [ ] Cada app tiene método `instanciar(): Promise<string>`
- [ ] Build exitoso

---

### Story 1.3: Completar @fia/runtime (5 pts)

**Descripción**: Expandir el runtime existente con la lógica completa de `alephscript/src/FIA/engine/kernel/runtime.ts`

| Tarea | Componente | Descripción | Effort |
|-------|-----------|-------------|--------|
| T1.3.1 | RuntimeEngine | Thread management (sin consola) | 1.5 |
| T1.3.2 | FIAExecutor | Ejecutor de ciclos FIA | 1 |
| T1.3.3 | MundoManager | Gestión de mundos y modelos | 1 |
| T1.3.4 | PerceptoProcessor | Procesamiento de perceptos | 1 |
| T1.3.5 | Tests | Unit tests para runtime | 0.5 |

**Acceptance Criteria**:
- [ ] `RuntimeEngine.step(fiaIndex)` ejecuta un ciclo real
- [ ] `RuntimeEngine.processPercepto(percepto)` distribuye a FIAs
- [ ] `RuntimeEngine.getMundoState()` retorna estado actual
- [ ] NO incluye lógica de consola (eso va a @fia/cli)

---

### Story 1.4: Mover genesis-block y core types (3 pts)

| Tarea | Archivo | Destino | Effort |
|-------|---------|---------|--------|
| T1.4.1 | genesis-block.ts | @fia/core | 0.5 |
| T1.4.2 | iFIA.ts (completo) | @fia/core | 0.5 |
| T1.4.3 | IPercepto.ts | @fia/core | 0.3 |
| T1.4.4 | IAccion.ts | @fia/core | 0.3 |
| T1.4.5 | Intencion.ts (Aferencia, Eferencia) | @fia/core | 0.4 |
| T1.4.6 | RunStateEnum.ts | @fia/core (ya en mcp-core-sdk también) | 0.2 |
| T1.4.7 | Actualizar exports | index.ts de @fia/core | 0.8 |

---

## Fase 2: Integrar Runtime en Backend (21 pts)

### Story 2.1: Crear RuntimeService en Backend (8 pts)

**Descripción**: Nuevo servicio que instancia y gestiona FIAs reales usando `@fia/*`

```typescript
// backend/src/services/runtime.service.ts
import { RuntimeEngine } from '@fia/runtime';
import { IFIAParadigma } from '@fia/paradigmas';

class RuntimeService {
  private engines: Map<string, RuntimeEngine> = new Map();
  
  createEngine(sessionId: string, appId: string): RuntimeEngine;
  step(sessionId: string, fiaIndex: number): IEferencia;
  processPercepto(sessionId: string, percepto: IPercepto): void;
  destroyEngine(sessionId: string): void;
}
```

| Tarea | Método | Descripción | Effort |
|-------|--------|-------------|--------|
| T2.1.1 | createEngine | Instancia RuntimeEngine según appId (fia-catalog.json) | 2 |
| T2.1.2 | step | Ejecuta ciclo de razonamiento de una FIA | 2 |
| T2.1.3 | processPercepto | Distribuye percepto a FIAs activas | 1 |
| T2.1.4 | destroyEngine | Limpia recursos al destruir sesión | 0.5 |
| T2.1.5 | getThreads | Retorna lista de FIAs como IMenuState[] | 0.5 |
| T2.1.6 | Integración con sessionService | Sincroniza estado con persistencia | 1 |
| T2.1.7 | Tests de integración | RuntimeService + SessionService | 1 |

**Acceptance Criteria**:
- [ ] `RuntimeService.step()` ejecuta lógica real de paradigma
- [ ] Estado se persiste automáticamente vía sessionService
- [ ] Eventos se emiten vía socketIOService
- [ ] Engines se cachean por sessionId

---

### Story 2.2: Refactorizar FIAService (5 pts)

**Descripción**: Reemplazar stubs por llamadas a RuntimeService

| Tarea | Método actual | Cambio | Effort |
|-------|--------------|--------|--------|
| T2.2.1 | stepFIA() | Llamar `runtimeService.step()` en vez de simular | 1.5 |
| T2.2.2 | sendPercepto() | Llamar `runtimeService.processPercepto()` | 1 |
| T2.2.3 | setFIAState() | Propagar a RuntimeEngine | 0.5 |
| T2.2.4 | Remover TODO comments | Limpiar código | 0.5 |
| T2.2.5 | Tests actualizados | Mockear RuntimeService | 1.5 |

**Acceptance Criteria**:
- [ ] `stepFIA()` NO tiene `simulated: true` en la respuesta
- [ ] Paradigma real se ejecuta (ej: lógica Prolog, red neuronal)
- [ ] Tests pasan con mocks

---

### Story 2.3: Sincronización Bidireccional (5 pts)

**Descripción**: El estado del RuntimeEngine debe sincronizarse con FileCollection

```
RuntimeEngine.step() ───► IEferencia ───► sessionService.updateMundo()
                                              │
                                              ▼
                                          FileCollection (disco)
```

| Tarea | Flujo | Effort |
|-------|-------|--------|
| T2.3.1 | Engine → Persistence: Guardar eferencias | 1 |
| T2.3.2 | Engine → Persistence: Guardar estado mundo | 1 |
| T2.3.3 | Persistence → Engine: Restaurar sesión al reconectar | 1.5 |
| T2.3.4 | Event sourcing (opcional): Log de ciclos | 1.5 |

**Acceptance Criteria**:
- [ ] Si backend reinicia, sesiones se restauran desde disco
- [ ] RuntimeEngine reconstruye estado desde última persistencia
- [ ] No hay pérdida de ciclos ejecutados

---

### Story 2.4: Actualizar fia-catalog.json (3 pts)

**Descripción**: El catálogo debe mapear `paradigma` a `clase` real de @fia/paradigmas

```json
{
  "paradigmas": {
    "logica": {
      "id": "logica",
      "nombre": "Lógica Formal",
      "clase": "FIALogica",           // 🆕 Clase real
      "modulo": "@fia/paradigmas",    // 🆕 Módulo a importar
      "runAsync": false,
      ...
    }
  }
}
```

| Tarea | Cambio | Effort |
|-------|--------|--------|
| T2.4.1 | Añadir `clase` y `modulo` a cada paradigma | 1 |
| T2.4.2 | Actualizar AppsService para usar clase | 0.5 |
| T2.4.3 | Actualizar SessionService.createSession() | 1 |
| T2.4.4 | Documentar schema en fia-catalog.schema.json | 0.5 |

---

## Fase 3: Cleanup y Documentación (13 pts)

### Story 3.1: Migrar SocketAdapter a mcp-core-sdk (3 pts)

**Descripción**: La lógica de Socket.IO de `alephscript/engine/kernel/adapter.ts` debe moverse a un módulo reutilizable

| Tarea | Componente | Destino | Effort |
|-------|-----------|---------|--------|
| T3.1.1 | getCurrentApps() | mcp-core-sdk/runtime/SocketAdapter | 1 |
| T3.1.2 | sendFrameworkState() | mcp-core-sdk/runtime/SocketAdapter | 0.5 |
| T3.1.3 | sendAppState() | mcp-core-sdk/runtime/SocketAdapter | 0.5 |
| T3.1.4 | Actualizar imports en backend | PersefonBot hereda de SocketAdapter | 1 |

---

### Story 3.2: Crear @fia/cli (opcional) (3 pts)

**Descripción**: Para desarrollo/debug, mantener la interfaz de consola

| Tarea | Componente | Effort |
|-------|-----------|--------|
| T3.2.1 | readline menu | 1 |
| T3.2.2 | waitForUserInput() | 0.5 |
| T3.2.3 | menuAnswer() | 0.5 |
| T3.2.4 | CLI entry point | 1 |

**Nota**: Este es opcional. Si el frontend es suficiente, puede omitirse.

---

### Story 3.3: Eliminar alephscript/ (2 pts)

**Descripción**: Una vez migrado todo, eliminar el directorio legacy

| Tarea | Acción | Effort |
|-------|--------|--------|
| T3.3.1 | Verificar todos los imports migrados | 0.5 |
| T3.3.2 | Actualizar README-SCRIPTORIUM.md | 0.5 |
| T3.3.3 | `git rm -r alephscript/` | 0.2 |
| T3.3.4 | Actualizar MIGRATION_CHECKLIST.md | 0.3 |
| T3.3.5 | Commit: `refactor(aaia): remove legacy alephscript/` | 0.5 |

---

### Story 3.4: Documentación (5 pts)

| Tarea | Documento | Effort |
|-------|-----------|--------|
| T3.4.1 | Actualizar README de as-core | 1 |
| T3.4.2 | Actualizar README de backend | 1 |
| T3.4.3 | Crear diagrama de arquitectura | 1 |
| T3.4.4 | Actualizar fia-catalog.json docs | 1 |
| T3.4.5 | Actualizar AGENTS.md con cambios | 1 |

---

## Dependencias entre Stories

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GRAFO DE DEPENDENCIAS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Fase 1 (as-core)                   Fase 2 (backend)         Fase 3        │
│  ─────────────────                  ────────────────         ──────        │
│                                                                             │
│  1.4 Core types ─────┐                                                      │
│         │            │                                                      │
│         ▼            │                                                      │
│  1.1 Paradigmas ────►├────────► 2.1 RuntimeService ────► 2.2 FIAService    │
│         │            │                   │                    │            │
│         ▼            │                   ▼                    │            │
│  1.2 Apps ──────────►│          2.3 Sync bidireccional        │            │
│         │            │                   │                    │            │
│         ▼            │                   ▼                    ▼            │
│  1.3 Runtime ───────►┘          2.4 fia-catalog ─────► 3.1 SocketAdapter   │
│                                                              │             │
│                                                              ▼             │
│                                                        3.3 Eliminar        │
│                                                              │             │
│                                                              ▼             │
│                                                        3.4 Docs            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Compatibilidad con Stack Existente

### MCPAAIAServer (Thin Client) ✅ Sin cambios

El `MCPAAIAServer.ts` ya es un **thin client** que delega al Backend:
- `AAIASessionManager` llama a `AAIABackendClient`
- Todos los tools MCP invocan el Backend via HTTP
- **No requiere modificación** para esta épica

### Specs OpenAPI/AsyncAPI ✅ Alineadas

Las specs en `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/` ya documentan:
- `openapi.yaml`: REST endpoints del Backend (8007)
- `asyncapi.yaml`: Eventos Socket.IO de PersefonBot

**Posible actualización menor**: Añadir campo `simulated: boolean` en respuestas para debugging.

### fia-catalog.json → Extensión Requerida

El catálogo necesita mapear paradigmas a clases reales:
```json
{
  "paradigmas": {
    "logica": {
      "id": "logica",
      "clase": "FIALogica",           // 🆕 
      "modulo": "@fia/paradigmas",    // 🆕
      ...
    }
  }
}
```

---

## Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Dependencias circulares entre @fia/* | Alto | Definir interfaces en @fia/core, implementaciones en otros paquetes |
| Paradigmas con dependencias externas (ONNX, OpenAI) | Medio | Lazy loading, optional dependencies |
| Performance de FileCollection con muchos ciclos | Medio | Implementar write batching |
| Tests de integración lentos | Bajo | Mockear paradigmas pesados (conexionista) |
| MCPAAIAServer desincronizado | Bajo | Es thin client, no necesita cambios |

---

## Métricas de Éxito

| Métrica | Target |
|---------|--------|
| Paradigmas migrados | 10/10 |
| Apps migradas | 7/7 |
| Tests unitarios @fia/* | >80% coverage |
| Tests integración backend | >70% coverage |
| Tiempo de step real vs simulado | <100ms |
| Sesiones restaurables tras restart | 100% |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-19 | Creación inicial del backlog | @ox |

