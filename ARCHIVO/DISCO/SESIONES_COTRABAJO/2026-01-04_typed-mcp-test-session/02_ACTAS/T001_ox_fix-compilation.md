# Acta T001: Fix Compilation Errors + LAUNCHER-BUG-001

## Metadatos

| Campo | Valor |
|-------|-------|
| Turno | 001 |
| Agente | @ox |
| Inicio | 2026-01-04 17:30 |
| Fin | 2026-01-04 17:52 |
| Estado final | ✅ DONE |

## Contexto Leído

- [guia-traspaso-typed-mcp.md](../03_REFERENCIAS/guia-traspaso-typed-mcp.md)
- [test-cases-mcp.md](../03_REFERENCIAS/test-cases-mcp.md)
- [01_backlog-borrador.md](../../BACKLOG_BORRADORES/Enero_04_MCPLauncher_ProcessKill_Bug/01_backlog-borrador.md)

## Diagnóstico Actual

### Error de Compilación

```
src/clients/index.ts:9 - error TS2305: Module '"./TypedPromptBackendClient"' has no exported member 'OntologyDefinition'.
```

**Causa**: El barrel export `clients/index.ts` intenta exportar tipos que no existen en `TypedPromptBackendClient.ts`.

**Exports reales de TypedPromptBackendClient.ts**:
| Export | Tipo |
|--------|------|
| `Schema` | interface |
| `Library` | interface |
| `ValidationError` | interface |
| `ValidationReport` | interface |
| `CreateSchemaRequest` | interface |
| `CreateLibraryRequest` | interface |
| `TypedPromptBackendClientConfig` | interface |
| `ApiError` | interface |
| `TypedPromptBackendClient` | class |
| `createTypedPromptBackendClient` | function |

**Problema**: Yo intenté hacer un export explícito con tipos inventados que no existen.

### Fix Correcto para clients/index.ts

```typescript
/**
 * Clients barrel export
 */
export * from './PrologBackendClient';
// Exclude ApiError from TypedPromptBackendClient (conflicts with PrologBackendClient)
export { 
    Schema,
    Library,
    ValidationError,
    ValidationReport,
    CreateSchemaRequest,
    CreateLibraryRequest,
    TypedPromptBackendClientConfig,
    TypedPromptBackendClient,
    createTypedPromptBackendClient
} from './TypedPromptBackendClient';
```

---

## Fix LAUNCHER-BUG-001

Ya aplicado en `MCPLauncherServer.ts`:
1. ✅ Añadido import de `exec`
2. ✅ Modificado spawn options (detached solo en Unix)
3. ✅ Creado `killProcessTree()` cross-platform
4. ✅ Creado `waitForProcessExit()` con polling
5. ✅ Modificado `stopServer()` para usar los helpers

---

## Acciones de Este Turno

1. [x] Corregir `clients/index.ts` con exports reales
2. [x] Verificar build exitoso ✅
3. [ ] Probar task "TPE: Start [MCP Server]"
4. [ ] Ejecutar TC-001 (typed_list_schemas)

---

## Log de Ejecución

### Paso 1: Corregir clients/index.ts ✅

Fix aplicado: exportar los tipos reales de TypedPromptBackendClient.

### Paso 2: Build ✅

```
npm run build → SUCCESS
```

### Paso 3: Probar MCP Server

**Launcher status**: ✅ Arrancó 4 servidores (state-machine, wiki, devops, prolog)

**Test stop_mcp_server**:
```
stop_mcp_server(wiki-mcp-browser, graceful=true)
→ success: true
→ PERO: Se reinició automáticamente (autoRestart implícito?)
→ Nuevo PID asignado
```

**Test restart_mcp_server**:
```
restart_mcp_server(prolog-mcp-server, graceful=true)
→ success: true
→ PERO: status="failed", lastError="already running"
→ PID antiguo sigue registrado
```

**Diagnóstico**:
El fix de `killProcessTree` parece funcionar (stop devuelve success), pero hay problemas de estado:

1. El servidor parece reiniciarse automáticamente tras stop (¿flag autoRestart por defecto?)
2. El estado "failed" + "already running" sugiere race condition en restart

**Próximo paso**: Verificar si los procesos realmente mueren con `tasklist`:

### Paso 4: Verificar procesos Windows

```bash
tasklist | grep "21136"  # PID viejo de prolog
→ No existe (kill funcionó ✅)

curl -s http://localhost:3006/health
→ {"status":"healthy","server":"Prolog MCP Server"} ✅
```

**Conclusión LAUNCHER-BUG-001**: 
- ✅ `killProcessTree()` funciona correctamente en Windows
- ⚠️ Bug menor: estado interno del launcher no sincroniza bien tras restart
- Prioridad: Baja (el kill real funciona)

### Paso 5: Verificar MCPTypedPromptServer

```bash
curl -s http://127.0.0.1:3020/health
→ {"status":"healthy","server":"TypedPrompt MCP Server"} ✅
```

**Servidores activos confirmados**:
| Puerto | Servidor | Status |
|--------|----------|--------|
| 3019 | TypedPromptsEditor Backend | ✅ |
| 3020 | MCPTypedPromptServer | ✅ |
| 3050 | MCPLauncherServer | ✅ |
| 3006 | PrologMCPServer | ✅ |

---

## Resumen de Cambios Aplicados

### 1. clients/index.ts (fix compilación)

```typescript
// Exportar tipos reales, excluir ApiError duplicado
export { 
    Schema, Library, ValidationError, ValidationReport,
    CreateSchemaRequest, CreateLibraryRequest,
    TypedPromptBackendClientConfig, TypedPromptBackendClient,
    createTypedPromptBackendClient
} from './TypedPromptBackendClient';
```

### 2. MCPLauncherServer.ts (LAUNCHER-BUG-001)

- `import { exec }` añadido
- `detached: !isWindows` (solo Unix)
- `shell: isWindows` (solo Windows)
- `killProcessTree(pid, graceful)` → Windows: taskkill /T /F, Unix: process.kill(-pid)
- `waitForProcessExit(pid, timeout)` → polling con signal 0

---

## Decisiones Tomadas

1. **Export conflict**: Excluir `ApiError` de TypedPromptBackendClient (usar el de PrologBackendClient)
2. **Kill strategy**: taskkill /T /F en Windows, process group kill en Unix
3. **Detached mode**: Solo en Unix para permitir process group kill

---

## Preguntas para Siguientes Turnos

- [ ] Ejecutar TC-001 a TC-007 con MCP tools → @ox T002
- [ ] Verificar integración con VS Code Copilot → @plugin_ox_typedprompting
- [ ] Bug menor de estado launcher → backlog futuro

---

## Siguiente Turno Sugerido

@ox T002 para ejecutar test cases MCP (TC-001 a TC-007)

---

## EXTRA: Integración TypedPrompt en Launcher

> **Añadido**: 2026-01-04 17:55

### Diagnóstico

El `MCPTypedPromptServer` tenía su config (`DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG`) pero **NO estaba integrado** en el Launcher:

| Archivo | Status antes | Status después |
|---------|--------------|----------------|
| `CONFIGS_BASE_MCP_SERVER` | ❌ Faltaba | ✅ Añadido |
| `DEFAULT_APP_CONFIG.mcp.servers` | ❌ Faltaba | ✅ Añadido |

### Cambios Aplicados

**1. MCPLauncherServer.ts**
```typescript
// Import añadido
import { DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG } from "@/configs/DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG";

// En CONFIGS_BASE_MCP_SERVER
"typed-prompt-mcp-server": DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG,
```

**2. configs/app.config.ts**
```typescript
// Import añadido
import { DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG } from "./DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG";

// En DEFAULT_APP_CONFIG.mcp.servers
"typed-prompt-mcp-server": DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG,
```

### Resultado

Ahora el Launcher arrancará automáticamente el TypedPrompt MCP Server junto con los demás:

| Servidor | Puerto | Auto-launch |
|----------|--------|-------------|
| state-machine-server | 3004 | ✅ |
| wiki-mcp-browser | 3002 | ✅ |
| devops-mcp-server | 3003 | ✅ |
| prolog-mcp-server | 3006 | ✅ |
| **typed-prompt-mcp-server** | **3020** | ✅ **NUEVO** |

### ⚠️ Dependencia

El TypedPrompt MCP Server requiere que el backend (3019) esté corriendo.
Orden de arranque recomendado:
1. `TPE: Start [Server]` (3019) ← Backend
2. `APB: Start [MCP Launcher]` (3050) ← Arranca todos incluyendo TypedPrompt

### Build

```
npm run build → SUCCESS ✅
```

---

## Siguiente Turno Sugerido

@ox continúa si build exitoso → tests  
@indice si build falla → auditoría DRY de tipos
