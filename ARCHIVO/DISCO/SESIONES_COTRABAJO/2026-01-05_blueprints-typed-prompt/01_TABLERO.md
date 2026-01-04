# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en `02_ACTAS/`.

---

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 1 | @periodico | ⏳ WAITING | — |

**Misión del turno**: 
1. Estudiar contenido de TypedPromptEditor y OpenAsyncApiEditor
2. Crear backlog borrador con 6 stories (una por blueprint)
3. Definir prioridades y effort

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 0 | Sistema | — | — | Transferencia desde sesión 2026-01-04 | [T008](../2026-01-04_typed-mcp-test-session/02_ACTAS/T008_aleph_transferencia-periodico.md) |

---

## Cola de Espera

| Posición | Agente | Prioridad | Tarea pendiente |
|----------|--------|-----------|-----------------|
| 2 | @lucas | Normal | Diseño contenido + showcase |
| 3 | @aleph | Normal | Review PO |

---

## Quick Links (DRY)

| Recurso | Enlace |
|---------|--------|
| Acta de Transferencia | [T008](../2026-01-04_typed-mcp-test-session/02_ACTAS/T008_aleph_transferencia-periodico.md) |
| Docs a editar | [docs/](../../../../docs/) |
| Plugin TypedPrompting | [typed-prompting/](../../../../.github/plugins/typed-prompting/) |
| Plugin OpenAsyncAPI | [openasyncapi-editor/](../../../../.github/plugins/openasyncapi-editor/) |

---

## Protocolo de Turno

```
1. ⏳ WAITING → Verifica que es tu turno
2. 📖 READING → Lee T008 + specs en OPENASYNCAPI_EDITOR
3. 🤔 THINKING → Diseña estructura de backlog
4. ✍️ WRITING → Crea backlog en BACKLOG_BORRADORES/
5. ✅ DONE → Actualiza este tablero y pasa turno
```
