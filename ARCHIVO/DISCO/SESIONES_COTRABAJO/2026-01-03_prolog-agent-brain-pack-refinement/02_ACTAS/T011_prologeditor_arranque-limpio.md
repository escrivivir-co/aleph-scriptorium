# Acta T011: Arranque Limpio del Stack

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 011 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 |
| **Fin** | 2026-01-03 |
| **Estado final** | ✅ DONE |

---

## Objetivo

Verificar el proceso de arranque limpio del stack tras los fixes de T010b:
1. Parar todos los servicios
2. Arrancar con tasks individuales
3. Verificar 4/4 con health check
4. Documentar lecciones

---

## Fase 1: Parada de Servicios

### ✅ Método Correcto

```
run_vscode_command({commandId: "workbench.action.tasks.terminate"})
```

### ❌ Métodos Fallidos

| Comando | Error |
|---------|-------|
| `taskkill /F /IM node.exe` | Argumento no válido en Git Bash |
| `pkill -f node` | Comando no encontrado en Windows |
| `cmd //c "taskkill..."` | Cancelado |

### 📚 Lección Aprendida

> **Usar herramientas de VS Code para parar tasks en lugar de comandos en consola.**
>
> El comando `workbench.action.tasks.terminate` es:
> - Cross-platform (funciona igual en Windows/Linux/Mac)
> - Limpio (mata solo los procesos de tasks, no otros node.exe)
> - Integrado (no requiere conocer sintaxis de cada OS)

---

## Fase 2: Arranque Individual

| # | Task | Puerto | Estado |
|---|------|--------|--------|
| 1 | `shell: APB: Start [MCP Launcher]` | 3050, 3006 | ✅ OK |
| 2 | `shell: APB: Start [Backend]` | 8000 | ✅ OK |
| 3 | `shell: APB: Start [Frontend]` | 5001 | ✅ OK |

---

## Fase 3: Verificación

Task: `shell: APB: Health Check`

| Servicio | Puerto | Estado |
|----------|--------|--------|
| MCP Launcher | 3050 | ✅ OK (HTTP 200) |
| MCP Prolog | 3006 | ✅ OK (HTTP 200) |
| Backend REST | 8000 | ✅ OK (HTTP 200) |
| Frontend Angular | 5001 | ✅ OK (HTTP 200) |

**Resultado**: 4/4 servicios operativos ✅

---

## Fix Adicional Aplicado

La task `APB: Health Check` no tenía el fix de T010b aplicado. Corregido:

```jsonc
// ANTES (problemático en Windows)
"args": ["${workspaceFolder}/scripts/apb-health-check.sh"]

// AHORA (funciona)
"args": ["./scripts/apb-health-check.sh"],
"options": { "cwd": "${workspaceFolder}" }
```

**Lección**: En Windows/Git Bash, usar paths relativos con `cwd` explícito.

---

## Lecciones Aprendidas

| # | Lección |
|---|---------|
| 1 | Usar `workbench.action.tasks.terminate` para parar tasks (cross-platform) |
| 2 | Usar `run_task` en lugar de `run_in_terminal` para tasks de VS Code |
| 3 | En Windows/Git Bash, usar paths relativos (`./scripts/...`) con `cwd` explícito |

---

## Siguiente

Tras completar Fase 2-3, continuar con **E2E Tests** del plan T006.
