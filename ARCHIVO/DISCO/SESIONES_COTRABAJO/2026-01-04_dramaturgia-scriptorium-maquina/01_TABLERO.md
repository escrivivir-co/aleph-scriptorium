# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en `02_ACTAS/`.

## Turno Actual

| # | Agentes | Estado | Objetivo |
|---|---------|--------|----------|
| 4a | Lucas + @scrum | ✅ DONE | Backlog → tasks (13 tasks) |
| 4b | @ox + @plugin_ox_teatro | ✅ DONE | Validar itaca-digital.yaml |

**Convergencia**: Ambos hilos completados → T005 (@scrum registro final)

**Modo**: Trabajo paralelo autorizado por @aleph (ver T003 Anexo)  
**T004b completado**: mcpPacks v3.0.0 propuesto, sensor/actuator factible

---

## Cola de Espera (Actualizada)

| Posición | Agente | Prioridad | Rol Esperado |
|----------|--------|-----------|--------------|
| 5 | @scrum | Normal | Registro final épica (post-convergencia) |

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @ox | 14:00 | 14:15 | Mapa territorio + hilos backlog + perspectiva dramaturgo | [T001](02_ACTAS/T001_ox_planificacion.md) |
| 1b | @aleph | 14:30 | 14:35 | DEVOLUCIÓN: PO detecta gaps (TypedPrompting, MCPPresets, eferencia) | [T001b](02_ACTAS/T001b_aleph_devolucion-spike.md) |
| 2 | @ox+@indice+@scrum | 14:40 | 15:10 | Spike profundo: 3 gaps resueltos, épica 13 pts propuesta | [T002](02_ACTAS/T002_triada_spike-profundo.md) |
| 3 | @aleph | 15:15 | 15:30 | Nexo técnico→dramaturgo + UC-SENSOR-01 + handoff a Lucas | [T003](02_ACTAS/T003_aleph_nexo-handoff-lucas.md) |
| 4b | @ox+@plugin_ox_teatro | 15:35 | 15:45 | Validación obra: mcpPacks existe, upgrade v3.0.0 propuesto | [T004b](02_ACTAS/T004b_ox-teatro_validacion-obra.md) |
| 4a | Lucas+@scrum | 15:50 | 16:10 | Desglose épica: 5 stories, 13 tasks, owners asignados | [T004a](02_ACTAS/T004a_lucas-scrum_backlog-tasks.md) |
| 5 | @aleph | 16:15 | 16:20 | Handoff a @periodico para noticia de sesión | [T005](02_ACTAS/T005_aleph_handoff-periodico.md) |
| 6 | @periodico | 16:30 | 16:45 | Noticia de sesión — documento base PO/SM | [T006](02_ACTAS/T006_periodico_noticia-sesion.md) |
| 7 | @ox | 17:00 | 17:15 | Implementar S02: 3 predicados sensor/actuador en lucas-prolog.brain.pl | [T007](02_ACTAS/T007_ox_s02-prolog-sensor.md) |
| 8 | @ox | 17:20 | 17:30 | Implementar S03: mcpPacks v3.0.0 + sensorBridge en itaca-digital.yaml | [T008](02_ACTAS/T008_ox_s03-obra-update.md) |
| 9 | @ox | 17:35 | 17:55 | Implementar S01: dramaturgo-signals.asyncapi.yaml (4 channels, 4 messages) | [T009](02_ACTAS/T009_ox_s01-asyncapi-signals.md) |
| 10 | @ox | 18:00 | 18:15 | Implementar S05: Sección Máquina en blueprint + link en README | [T010](02_ACTAS/T010_ox_s05-blueprint-docs.md) |
| 11 | @ox | 18:20 | 18:40 | Implementar S04: Wireframe 3-columnas + 9 widgets en docs/teatro/ | [T011](02_ACTAS/T011_ox_s04-wireframe.md) |
| 12 | @scrum | 18:45 | 18:50 | Cierre formal: métricas finales, backlog actualizado | [T012](02_ACTAS/T012_scrum_cierre-sesion.md) |

---

## Turno Actual

| # | Agente | Estado | Objetivo |
|---|--------|--------|----------|
| 12 | @scrum | ✅ DONE | Cierre formal de sesión |

---

## Reglas de Esta Sesión

1. **Máximo 5 turnos** — Foco en planificación, no implementación
2. **Enfoque dramaturgo** — Pensar en términos de personajes, escenas, señales
3. **Output a specs** — Todo entregable va a `OPENASYNCAPI_EDITOR/specs/`

---

## Formato de Acta

Cada turno genera un archivo en `02_ACTAS/`:

```
02_ACTAS/
├── T001_ox_planificacion.md
├── T002_teatro_validacion-obra.md
├── T003_prologeditor_rutina.md
├── T004_indice_coherencia.md
└── T005_scrum_registro.md
```
