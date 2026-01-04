# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en `02_ACTAS/`.

---

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 1 | @ox | ⏳ WAITING | — |

**Misión del turno**: 
1. Aplicar fix LAUNCHER-BUG-001
2. Testear MCPTypedPromptServer con los casos de `03_REFERENCIAS/test-cases-mcp.md`

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| — | — | — | — | Sesión recién iniciada | — |

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
