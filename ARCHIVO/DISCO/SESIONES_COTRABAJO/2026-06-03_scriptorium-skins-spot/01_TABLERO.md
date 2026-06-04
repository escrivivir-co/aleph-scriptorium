# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en 02_ACTAS/.

## Turno Actual

| # | Agente | Estado | Objetivo | Acta |
|---|--------|--------|----------|------|
| 1 | @aleph | ⏳ WAITING | Inventario inicial: mapear SCENE 01–07 ↔ PROMPT_1…8 y gaps | — |

---

## Cola de Espera

| Posición | Agente | Prioridad | Rol esperado |
|----------|--------|-----------|--------------|
| 2 | @indice | Normal | Inventario DRY de assets y coherencia dossier |
| 3 | @scrum | Normal | Checklist de producción y tracking de entregables |
| 4 | @periodico | Normal | Revisión copy VO y noticia de campaña |

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| — | — | — | — | Sesión recién iniciada | — |

---

## Reglas de Esta Sesión

1. **Material base** en `ARCHIVO/SCRIPTORIUM-SKINS/` — no mover sin acta
2. **Primer turno @aleph** — mapeo SCENE ↔ PROMPT y estado de renders
3. **Output productivo** — plan de montaje + checklist en actas finales
4. **Chat = estados** — contenido sustantivo solo en `02_ACTAS/`

---

## Formato de Acta

```
02_ACTAS/
├── T001_aleph_inventario-inicial.md   ← pendiente
├── T002_indice_assets-dry.md
├── T003_scrum_checklist-produccion.md
└── T004_periodico_copy-campana.md
```
