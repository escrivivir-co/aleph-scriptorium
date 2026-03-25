# Acta T010: Reintento E2E Post-Fix assert_fact

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 010 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 23:50 |
| **Fin** | 2026-01-04 00:20 |
| **Estado final** | ✅ DONE |

---

## Contexto Leído

- Actas revisadas: T009, T007
- Fix aplicado: MCPPrologServer.ts L472-500 (usar `engine.assertFact()` wrapper)
- Fix adicional: Manejadores globales de excepciones

---

## Aportación: Diagnóstico Completo del Crash

### 1. Causa Raíz Identificada

El crash NO era por el método `engine.engine.call()` vs `engine.assertFact()` — ambos usan el mismo código subyacente de `swipl-stdio`.

**Causa real**: `swipl` no estaba en el PATH del proceso Node spawneado por el Launcher.

```
[ERROR] Uncaught exception in MCPPrologServer {
  "error": "spawn swipl ENOENT"
}
```

### 2. Fixes Aplicados

| Fix | Archivo | Descripción |
|-----|---------|-------------|
| F1 | `MCPPrologServer.ts` | Usar `engine.assertFact()` wrapper (mejor diseño) |
| F2 | `MCPPrologServer.ts` | Manejadores globales `uncaughtException` y `unhandledRejection` |
| F3 | `.vscode/tasks.json` | Añadir PATH de swipl cross-platform |
| F4 | `guia-arquitectura-mcp-stack.md` | Documentar prerequisitos SWI-Prolog (Sección 9) |

### 3. Configuración de PATH por Sistema Operativo

| Sistema | Ruta añadida al PATH |
|---------|---------------------|
| Windows | `C:\Program Files\swipl\bin` |
| macOS | `/opt/homebrew/bin:/usr/local/bin` |
| Linux | `/usr/local/bin` (normalmente ya en PATH) |

### 4. Estado de Pruebas E2E

| Componente | Probados | OK | FAIL | Pendiente |
|------------|----------|----|----|-----------|
| Tools Core MCP | 3/7 | 2 | 1 (PATH issue) | 4 |
| Tools Backend | 0/5 | — | — | 5 |
| Resources MCP | 0/6 | — | — | 6 |
| Prompts MCP | 0/8 | — | — | 8 |

**Progreso total**: 2/26 (7.7%) - bloqueado por prerequisito swipl

---

## Decisiones Tomadas

| # | Decisión | Justificación |
|---|----------|---------------|
| D1 | Añadir PATH en tasks.json | Solución reproducible sin modificar sistema |
| D2 | Documentar en guía v1.8.0 | Conocimiento persistente |
| D3 | Manejadores de excepción | Prevenir crashes futuros |

---

## Siguiente Turno Sugerido

@prologeditor para:
1. Reiniciar stack con nueva configuración de tasks.json
2. Re-probar assert_fact
3. Continuar E2E si funciona
