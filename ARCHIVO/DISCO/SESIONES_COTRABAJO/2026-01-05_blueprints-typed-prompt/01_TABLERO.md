# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en `02_ACTAS/`.

---

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 6 | @lucas | ⏳ WAITING | — |

**Misión del turno**: 
1. Ejecutar DS-S02 (demo.md cards)
2. Crear sección "Editores Lógicos"
3. Añadir cards TypedPromptsEditor (3019) y PrologEditor (5001)
4. Capturar screenshots

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 5 | @periodico | 2026-01-05 16:30 | 2026-01-05 16:45 | DS-S00 completado: §3.6 en Funcional.md, §9.1.1/9.1.2 en Tecnico.md | [T005](02_ACTAS/T005_periodico_ejecucion-indices-dry.md) |
| 4 | @aleph | 2026-01-05 16:00 | 2026-01-05 16:15 | Review PO: APRUEBO DS-S00 bloqueante, luz verde ejecución | [T004](02_ACTAS/T004_aleph_aprobacion-prioridades.md) |
| 3 | @lucas | 2026-01-05 15:00 | 2026-01-05 15:30 | Diseño visual: mockup "Editores Lógicos", DS-S00 bloqueante confirmado | [T003](02_ACTAS/T003_lucas_diseno-editores-logicos.md) |
| 2 | @ox | 2026-01-05 14:00 | 2026-01-05 14:30 | Ronda crítica: 7 stories, 22 tasks, 15 pts. Sin Banderas, con perspectivas de plugins | [T002](02_ACTAS/T002_ox_ronda-critica-reformulacion.md) |
| 1 | @periodico | 2026-01-05 10:00 | 2026-01-05 10:30 | Backlog inicial: 6 stories, 16 tasks, 13 pts | [T001](02_ACTAS/T001_periodico_backlog-blueprints.md) |
| 0 | Sistema | — | — | Transferencia desde sesión 2026-01-04 | [T008](../2026-01-04_typed-mcp-test-session/02_ACTAS/T008_aleph_transferencia-periodico.md) |

---

## Cola de Espera

| Posición | Agente | Prioridad | Tarea pendiente |
|----------|--------|-----------|-----------------|
| 7 | @aleph | Normal | Ejecutar DS-S03 (blueprint.md capas) tras DS-S02 |
| 8 | @periodico | Normal | Ejecutar DS-S04, DS-S05, DS-S06 secuencialmente |

---

## Quick Links (DRY)

| Recurso | Enlace |
|---------|--------|
| Acta Ronda Crítica | [T002](02_ACTAS/T002_ox_ronda-critica-reformulacion.md) |
| Acta de Transferencia | [T008](../2026-01-04_typed-mcp-test-session/02_ACTAS/T008_aleph_transferencia-periodico.md) |
| Docs a editar | [docs/](../../../../docs/) |
| Plugin TypedPrompting | [typed-prompting/](../../../../.github/plugins/typed-prompting/) |
| Plugin PrologEditor | [prolog-editor/](../../../../.github/plugins/prolog-editor/) |
| Plugin OpenAsyncAPI | [openasyncapi-editor/](../../../../.github/plugins/openasyncapi-editor/) |

---

## Protocolo de Turno

```
1. ⏳ WAITING → Verifica que es tu turno
2. 📖 READING → Lee T002 (backlog reformulado)
3. 🤔 THINKING → Diseña mockups y organización visual
4. ✍️ WRITING → Captura screenshots, crea propuesta
5. ✅ DONE → Actualiza este tablero y pasa turno
```

---

## Aprendizaje de Sesión

> **Corrección metodológica (T002)**: Las Banderas (Blueflag, Redflag, etc.) son para auditoría doctrinal de textos fundacionales. Para documentación técnica, usar **perspectivas de plugins**: @indice, @pluginmanager, @lucas, @aleph, @scrum.
