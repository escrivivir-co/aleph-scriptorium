# Bug Report: MCPLauncherServer Process Kill Failure

> **Épica**: LAUNCHER-BUG-001  
> **Severidad**: 🔴 Alta (bloquea desarrollo)  
> **Reportado**: 2026-01-04  
> **Componente**: `MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts`

---

## Resumen Ejecutivo

Las consolas spawn de los MCP servers no se detienen correctamente al invocar `stop_mcp_server` o `restart_mcp_server`. Los procesos quedan "huérfanos" o desconectados.

---

## Síntomas Observados

| Síntoma | Descripción |
|---------|-------------|
| Procesos zombie | Los procesos node/tsx siguen corriendo tras `stopServer()` |
| Puertos ocupados | Al reiniciar, error "port already in use" |
| Consolas desconectadas | Las terminales spawn no responden a SIGTERM/SIGKILL |
| PID -1 | Servidores registrados con PID desconocido |

---

## Análisis Técnico

### Archivo afectado

[MCPLauncherServer.ts](../../../MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts)

### Bugs identificados

#### BUG-001: `detached: true` sin `unref()`

**Líneas 1315-1321:**
```typescript
const serverProcess: any = spawn(tsxCmd, args, {
    stdio: "pipe",
    env,
    detached: true,
    shell: process.platform === "win32",
    windowsHide: true,
});
```

**Problema**: Se usa `detached: true` pero nunca se llama `serverProcess.unref()`. Esto crea una referencia "fantasma" donde:
- El proceso hijo está detached del grupo de procesos
- Pero el padre aún mantiene pipes activos
- Las señales no se propagan correctamente

**Fix propuesto**: Llamar `serverProcess.unref()` después del spawn, O no usar `detached: true`.

---

#### BUG-002: `stdio: "pipe"` incompatible con `detached: true`

**Problema**: La combinación `stdio: "pipe"` + `detached: true` es contradictoria:
- `pipe` crea conexiones IPC que mantienen vivo al hijo
- `detached` intenta desconectar al hijo

**Fix propuesto**: Usar `stdio: "inherit"` o `stdio: ["ignore", "pipe", "pipe"]` si se necesita capturar output.

---

#### BUG-003: Windows shell spawn crea proceso intermedio

**Línea 1319:**
```typescript
shell: process.platform === "win32",
```

**Problema**: En Windows con `shell: true`, el árbol de procesos es:
```
cmd.exe (shell) → npx.cmd → tsx → node (servidor real)
```

Cuando se hace `process.kill("SIGTERM")`, solo se mata `cmd.exe`. Los hijos quedan huérfanos.

**Fix propuesto para Windows**: Usar `taskkill /T /F /PID ${pid}` para matar el árbol completo:
```typescript
if (process.platform === "win32") {
    spawn('taskkill', ['/pid', process.pid.toString(), '/T', '/F'], { shell: true });
} else {
    process.kill("SIGTERM");
}
```

---

#### BUG-004: `process.killed` no es confiable

**Líneas 1672-1675 en `stopServer()`:**
```typescript
// Force kill if still running
if (!process.killed) {
    process.kill("SIGKILL");
}
```

**Problema**: `process.killed` solo indica si se *envió* una señal, no si el proceso *murió*. Puede ser `true` aunque el proceso siga vivo.

**Fix propuesto**: Verificar con polling si el puerto se liberó:
```typescript
private async waitForProcessExit(pid: number, timeoutMs: number): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            process.kill(pid, 0); // Verificar si existe
            await this.sleep(200);
        } catch {
            return true; // Proceso terminó
        }
    }
    return false;
}
```

---

#### BUG-005: Windows no soporta SIGTERM/SIGKILL

**Problema**: En Windows, `process.kill("SIGTERM")` y `SIGKILL` no funcionan como en Unix. Node.js en Windows solo soporta `SIGINT` parcialmente.

**Fix propuesto**: Usar API nativa de Windows:
```typescript
if (process.platform === "win32") {
    exec(`taskkill /pid ${pid} /T /F`, (error) => {
        if (error) l.e("Failed to kill process tree", { error });
    });
}
```

---

## Stories para Fix

### S01: Refactorizar spawn options (3 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| T01 | Eliminar `detached: true` o añadir `unref()` | 1 |
| T02 | Cambiar `stdio` para ser compatible | 1 |
| T03 | Test en Windows y Linux | 1 |

### S02: Implementar Windows process tree kill (5 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| T01 | Crear helper `killProcessTree(pid)` | 2 |
| T02 | Integrar en `stopServer()` | 1 |
| T03 | Integrar en `shutdown()` | 1 |
| T04 | Test con múltiples servidores | 1 |

### S03: Verificación robusta de terminación (3 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| T01 | Implementar `waitForProcessExit()` | 1 |
| T02 | Implementar verificación por puerto | 1 |
| T03 | Timeout configurable + retry | 1 |

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories | 3 |
| Tasks | 10 |
| Effort total | 11 pts |
| Prioridad | 🔴 P1 (bloqueante) |

---

## Contexto Adicional

### Configuración actual de spawn

```typescript
const serverProcess = spawn(tsxCmd, args, {
    stdio: "pipe",        // ← Mantiene pipes abiertos
    env,
    detached: true,       // ← Intenta desconectar
    shell: true,          // ← En Windows, crea cmd.exe intermedio
    windowsHide: true,
});
```

### Configuración recomendada

```typescript
const serverProcess = spawn(tsxCmd, args, {
    stdio: ["ignore", "pipe", "pipe"],  // stdin ignorado
    env,
    detached: false,      // O true + unref()
    shell: false,         // Evitar shell intermedio
    windowsHide: true,
});

// Si se usa detached
if (detached) serverProcess.unref();
```

---

## Referencias

- [Node.js child_process docs](https://nodejs.org/api/child_process.html#optionsdetached)
- [Windows process groups](https://docs.microsoft.com/en-us/windows/win32/procthread/process-groups)
- Sesión de cotrabajo: 2026-01-04

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-01-04 | 🐛 Bug report creado tras investigación técnica |

