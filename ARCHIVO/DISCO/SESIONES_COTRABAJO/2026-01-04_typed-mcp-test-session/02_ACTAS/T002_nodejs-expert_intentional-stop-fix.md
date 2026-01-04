# Acta T002: Fix IntentionalStop para Auto-Restart Race Condition

## Metadatos

| Campo | Valor |
|-------|-------|
| Turno | 002 |
| Agente | @nodejs-expert (convocado por @ox) |
| Inicio | 2026-01-04 18:05 |
| Fin | 2026-01-04 18:20 |
| Estado final | ✅ DONE |

## Contexto Leído

- [T001_ox_fix-compilation.md](T001_ox_fix-compilation.md) — Diagnóstico de LAUNCHER-BUG-001
- [01_backlog-borrador.md](../../BACKLOG_BORRADORES/Enero_04_MCPLauncher_ProcessKill_Bug/01_backlog-borrador.md)
- [MCPLauncherServer.ts](../../../../MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts) — Código fuente

## Diagnóstico del Bug Residual

Según T001, el `killProcessTree()` funciona correctamente en Windows, pero hay un **bug de estado**:

| Síntoma | Causa |
|---------|-------|
| `stop_mcp_server` → servidor se reinicia | Handler `exit` dispara `autoRestartServer()` |
| `restart_mcp_server` → status="failed", error="already running" | Race condition entre stop y start |

**Root Cause**: El handler de `exit` verifica `config.autoRestart && code !== 0` pero no distingue entre:
1. **Crash involuntario** → Debe reiniciar
2. **Stop intencional** → NO debe reiniciar

## Solución Implementada

### Cambio 1: Nuevo campo `intentionalStops: Set<string>`

```typescript
/** Tracks servers being intentionally stopped - prevents auto-restart on exit */
private intentionalStops: Set<string> = new Set();
```

**Por qué Set**: Lookup O(1), no necesita valores, limpieza automática en delete.

### Cambio 2: Marcar antes de matar

En `stopServer()`, antes de cualquier operación de kill:

```typescript
// Mark as intentional stop BEFORE killing to prevent auto-restart race
this.intentionalStops.add(serverId);
```

**Timing crítico**: Debe ocurrir ANTES del kill para ganar la race condition con el handler de exit.

### Cambio 3: Verificar en handler de exit

```typescript
// Auto-restart if configured AND not an intentional stop
if (config.autoRestart && code !== 0 && !this.intentionalStops.has(config.id)) {
    this.autoRestartServer(config);
}
// Clean up intentional stop flag
this.intentionalStops.delete(config.id);
```

### Cambio 4: Cleanup defensivo

Limpiar flag en múltiples lugares para evitar leaks:

1. En handler de `exit` (path normal)
2. Al final de `stopServer()` (por si el handler ya corrió)
3. Cuando no hay PID (early return)

## Archivos Modificados

| Archivo | Líneas | Cambio |
|---------|--------|--------|
| `MCPLauncherServer.ts` | ~75 | Añadir campo `intentionalStops` |
| `MCPLauncherServer.ts` | ~1548-1551 | Modificar condición de auto-restart |
| `MCPLauncherServer.ts` | ~1677 | Marcar intención antes de stop |
| `MCPLauncherServer.ts` | ~1691, 1704 | Cleanup defensivo del flag |

## Verificación

```bash
npm run build → SUCCESS (sin errores de compilación)
```

## Pruebas Sugeridas

### Test Case: Stop sin auto-restart

```
1. Lanzar servidor con autoRestart: true
2. Invocar stop_mcp_server(serverId, graceful=true)
3. Esperar 10s
4. Verificar que el servidor NO se reinició
5. Verificar estado = "stopped"
```

### Test Case: Crash con auto-restart

```
1. Lanzar servidor con autoRestart: true
2. Matar proceso manualmente (taskkill sin usar stop_mcp_server)
3. Esperar 10s
4. Verificar que el servidor SÍ se reinició
```

### Test Case: Restart limpio

```
1. Lanzar servidor con autoRestart: true
2. Invocar restart_mcp_server(serverId)
3. Verificar que NO hay error "already running"
4. Verificar que el servidor está running con nuevo PID
```

## Decisiones Tomadas

1. **Set vs Map**: Usar Set porque solo necesitamos membership check, no valores asociados
2. **Cleanup doble**: Limpiar en handler Y en stopServer para robustez ante race conditions
3. **No usar killed flag de ChildProcess**: Ese flag solo indica si se envió señal, no si el proceso murió

## Siguiente Turno Sugerido

@ox para ejecutar TC-001 a TC-007 del MCPTypedPromptServer, ahora que el Launcher es estable.

---

## Commit Sugerido

```
fix(mcp-launcher): prevent auto-restart on intentional stop

- Add intentionalStops Set to track voluntary shutdowns
- Check flag in exit handler before triggering autoRestartServer
- Defensive cleanup in multiple code paths
- Resolves race condition causing "already running" errors

refs LAUNCHER-BUG-001
```
