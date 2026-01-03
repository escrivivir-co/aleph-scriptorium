# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en 02_ACTAS/.

---

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 2 | @ox | ⏳ WAITING | — |

> **Siguiente**: @ox realiza diagnóstico técnico del stack con herramientas MCP de auto-reflexión.

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @aleph + Lucas | 2026-01-03 | 2026-01-03 | Convocatoria oficial + agenda de 10 turnos | [T001](02_ACTAS/T001_aleph-lucas_convocatoria.md) |
| 0 | Sistema | 2026-01-03 | — | Sesión creada | — |

---

## Cola de Espera

> Los agentes se suman según lleguen a la convocatoria.

### Grupo Meta-Coordinación

| Posición | Agente | Rol | Prioridad |
|----------|--------|-----|-----------|
| 2 | @ox | Auditoría técnica | Alta |
| 3 | @indice | Navegación DRY | Normal |
| 4 | @scrum | Tracking | Normal |
| 5 | @pluginmanager | Plugins | Normal |

### Grupo Facilitado (@prologeditor habla por ellos)

| Posición | Bridge | Contexto a Aportar |
|----------|--------|-------------------|
| — | @plugin_ox_teatro | Integración Teatro + Prolog |
| — | @plugin_ox_agentcreator | Generación de .brain.pl |
| — | @plugin_ox_typedprompting | Context Manager |
| — | @plugin_ox_scrum | Estado de épicas |
| — | @plugin_ox_mcppresets | Packs MCP disponibles |
| — | @plugin_ox_openasyncapieditor | Contratos OpenAPI |

---

## Agenda de la Sesión

1. **T001 - Convocatoria** (@aleph + Lucas): Presentar objetivo, verificar asistencia
2. **T002 - Diagnóstico técnico** (@ox): Estado del stack, métricas de salud
3. **T003 - Validación de índices** (@indice): Coherencia Funcional/Técnico vs realidad
4. **T004 - Estado de épicas** (@scrum): PROLOG-DRY-1.0.0, TEATRO-PROLOG-1.0.0
5. **T005 - Reporte de plugins** (@pluginmanager): Bridges activos, gaps
6. **T006-T008 - Pruebas E2E** (facilitado por @prologeditor): 
   - Tools MCP
   - Resources
   - Prompts
7. **T009 - Gaps & Oportunidades** (todos): Consolidar hallazgos
8. **T010 - Cierre** (@aleph + Lucas): Próximos pasos

---

## Leyenda de Estados

| Estado | Emoji | Significado |
|--------|-------|-------------|
| IDLE | ⚪ | Sin turno asignado |
| WAITING | ⏳ | En cola, esperando turno |
| READING | 📖 | Leyendo actas anteriores |
| THINKING | 🤔 | Procesando información |
| WRITING | ✍️ | Escribiendo acta |
| REVIEWING | 🔍 | Revisando trabajo de otros |
| BLOCKED | ⛔ | Necesita input de otro agente |
| DONE | ✅ | Turno completado |
