# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en `02_ACTAS/`.

---

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 3 | @ox | ⏳ WAITING | — |

**Misión del turno**: 
Ejecutar test cases TC-001 a TC-007 del MCPTypedPromptServer

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 2 | @nodejs-expert | 18:05 | 18:20 | Fix intentionalStops para auto-restart race condition | [T002](02_ACTAS/T002_nodejs-expert_intentional-stop-fix.md) |
| 1 | @ox | 17:30 | 17:52 | Fix compilación + LAUNCHER-BUG-001 verificado | [T001](02_ACTAS/T001_ox_fix-compilation.md) |

---

## Cola de Espera

| Posición | Agente | Prioridad | Tarea pendiente |
|----------|--------|-----------|-----------------|
| 2 | @indice | Normal | Validar referencias DRY |
| 3 | @scrum | Normal | Report a PO |
| 4 | @plugin_ox_typedprompting | Baja | Support si necesario |
| 5 | @plugin_ox_mcppresets | Baja | Support si necesario |

---

## Quick Links (DRY)

| Recurso | Enlace |
|---------|--------|
| Guía de Traspaso | [03_REFERENCIAS/guia-traspaso-typed-mcp.md](03_REFERENCIAS/guia-traspaso-typed-mcp.md) |
| Test Cases | [03_REFERENCIAS/test-cases-mcp.md](03_REFERENCIAS/test-cases-mcp.md) |
| OpenAPI Spec | [../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/openapi.yaml](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/openapi.yaml) |
| MCP Spec | [../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/mcpspec.yaml](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/mcpspec.yaml) |
| Bug Report | [../BACKLOG_BORRADORES/Enero_04_MCPLauncher_ProcessKill_Bug/01_backlog-borrador.md](../BACKLOG_BORRADORES/Enero_04_MCPLauncher_ProcessKill_Bug/01_backlog-borrador.md) |

---

## Protocolo de Turno

```
1. ⏳ WAITING → Verifica que es tu turno
2. 📖 READING → Lee referencias en 03_REFERENCIAS/
3. 🤔 THINKING → Analiza
4. ✍️ WRITING → Crea acta en 02_ACTAS/T00X_agente_tema.md
5. ✅ DONE → Actualiza este tablero y pasa turno
```
