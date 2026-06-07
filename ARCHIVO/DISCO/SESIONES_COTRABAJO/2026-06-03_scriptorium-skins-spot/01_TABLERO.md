# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en 02_ACTAS/.

## Turno Actual

| # | Agente | Estado | Objetivo | Acta |
|---|--------|--------|----------|------|
| 5 | @indice | ⏳ WAITING | Auditoría DRY post-render y coherencia rutas (5 galeradas) | — |

---

## Cola de Espera

| Posición | Agente | Prioridad | Rol esperado |
|----------|--------|-----------|--------------|
| 3 | @ox | Normal | Validación coherencia técnica NETWORK-ENGINE |
| 4 | @scrum | Normal | Checklist de producción y tracking de renders |
| 5 | @periodico | Normal | Revisión copy VO y noticia de campaña |

---

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @aleph | 2026-06-06 | 2026-06-06 | PACK ALEPH-TOPOLOGY: brief + 4 prompts + assets + QA | [T001](02_ACTAS/T001_aleph_pack-aleph-topology.md) |
| 2 | @aleph + @ox | 2026-06-06 | 2026-06-06 | Capa de terminología y textura real (LAYER_0–4 + SESION_06) sobre P9–P12 | [T002](02_ACTAS/T002_aleph-ox_capa-textura.md) |
| 3 | @aleph | 2026-06-06 | 2026-06-06 | P13 ORÁCULO: pieza-predicción de autor + claim de producto (pack → 5×10s) | [T003](02_ACTAS/T003_aleph_pieza-oraculo-prediccion.md) |
| 4 | @aleph | 2026-06-06 | 2026-06-06 | Galeradas autocontenidas P9–P13 para Omni (contexto inline + storyboard + cierre editorial) | [T004](02_ACTAS/T004_aleph_galeradas-omni.md) |

---

## Reglas de Esta Sesión

1. **Material base** en `SCRIPTORIUM-SPOT/` — assets copiados desde SCRIPTORIUM-GAMES
2. **Épica** ALEPH-TOPOLOGY-1.0.0 — 4 clips showcase NETWORK-ENGINE
3. **Output productivo** — renders Gemini Omni + montaje en actas finales
4. **Chat = estados** — contenido sustantivo solo en `02_ACTAS/`

---

## Formato de Acta

```
02_ACTAS/
├── T001_aleph_pack-aleph-topology.md       ← ✅ completado
├── T002_aleph-ox_capa-textura.md           ← ✅ completado
├── T003_aleph_pieza-oraculo-prediccion.md  ← ✅ completado
├── T004_aleph_galeradas-omni.md            ← ✅ completado
├── T005_indice_assets-dry.md               ← pendiente
├── T006_ox_coherencia-tecnica.md
├── T007_scrum_checklist-produccion.md
└── T008_periodico_copy-campana.md
```
