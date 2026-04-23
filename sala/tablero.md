# Tablero de tareas — Lore DB Vector Expansion

> **Sprint:** sprint-scrum-backlog-lore-db-vector-expansion-init
> **Última actualización:** 23-abr-2026 — orquestador (GPT-5.4) — añadido dossier técnico `vector-machine` y track VMS
> **Agentes activos:** 0 en curso, 3 slots disponibles (gepe, gemy, sony)
> **Estados:** `libre` · `propuesta:{alias}` · `en-curso:{alias}` · `entregada:{alias}` · `cerrada` · `no-aplica`
>
> **Orquestador:** si acabas de llegar a una ventana nueva, usa `#sala_aleph activar` o lee `sala/activacion-orquestador.md` para levantarte con todo el contexto.

### Glosario de estados

| Estado | Significado |
|--------|-------------|
| `libre` | Disponible. Cualquier agente puede proponerla si las dependencias están resueltas. |
| `propuesta:{alias}` | Un agente la propuso en su `estado.md`. Esperando que Aleph apruebe o redirija. |
| `en-curso:{alias}` | Aleph aprobó. El agente está trabajando. Tiene carpeta temporal en `sala/agente-{alias}/`. |
| `entregada:{alias}` | El agente terminó. Hay entrega en su carpeta. El orquestador debe revisar. |
| `entregada-en-revisión:{alias}` | Entrega recibida por Aleph. Revisión delegada como `REV-*`. Esperando veredicto. |
| `cerrada` | Revisada y aceptada por el orquestador. Copiada al dossier si aplica. |
| `no-aplica` | No se ejecuta. |

> **Tareas `REV-*`:** las tareas con prefijo `REV-` son **solo-orquestador**. Agentes regulares las saltan al leer el tablero.

---

## Tracks recomendados

```text
Track REFINE-SC: SBLVX-SC-02 → SBLVX-SC-03 → SBLVX-SC-04
  SBLVX-SC-02 abre el refinement formal.
  SBLVX-SC-03 y SBLVX-SC-04 se afinan tras aprobación o enmienda del plan.

Track VMS: VM-01 → VM-02
  VM-01 ratifica la frontera del contrato MCP v1.
  VM-02 traduce esa frontera a backlog ejecutable cuando ya esté cerrada.
```

---

## Track REFINE-SC — backlog scrum lore db vector expansion (5 tareas)

| Task | Título | Deps | Estado |
|------|--------|------|--------|
| SBLVX-SC-00 | Pre-scrum definitions | — | `cerrada` |
| SBLVX-SC-01 | Planification | SBLVX-SC-00 | `cerrada` |
| SBLVX-SC-02 | Aprobar o enmendar plan compartido | SBLVX-SC-01 | `libre` |
| SBLVX-SC-03 | Refinar scope Scriptorium | SBLVX-SC-02 | `libre` |
| SBLVX-SC-04 | Preparar handoff de integración | SBLVX-SC-02, SBLVX-SC-03 | `libre` |

> Dossier: `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`

---

## Track VMS — vector-machine technical dossier (3 tareas)

| Task | Título | Deps | Estado |
|------|--------|------|--------|
| VM-00 | Contexto y persistencia | — | `cerrada` |
| VM-01 | Ratificar frontera del contrato MCP v1 | VM-00 | `libre` |
| VM-02 | Traducir contrato ratificado a backlog ejecutable | VM-01 | `libre` |

> Dossier: `sala/dossiers/vector-machine/`
>
> Nota: track de diseño técnico. No abre todavía implementación; congela referencias y prepara el siguiente ciclo.

---

## Revisiones pendientes

| Task | Título | Deps | Estado |
|------|--------|------|--------|
<!-- REV-* tasks: solo-orquestador. -->

---

## Backlog post-sprint

| ID | Título | Prioridad | Notas |
|----|--------|-----------|-------|
| — | — | — | Sesión recién inicializada; sin arrastre previo. |

---

## Tareas cerradas (referencia)

| Task | Dossier | Estado |
|------|---------|--------|
| SBLVX-SC-00 | scrum-backlog-lore-db-vector-expansion | `cerrada` — GPT-5.4 |
| SBLVX-SC-01 | scrum-backlog-lore-db-vector-expansion | `cerrada` — GPT-5.4 |
| VM-00 | vector-machine | `cerrada` — GPT-5.4 |

---

> **⚠️ Aleph:** actualiza esta tabla cada vez que cierres una task. Si no, se desincroniza.

| Track | Total | Cerradas | Libres | En curso | Primeras libres (sin deps) |
|-------|-------|----------|--------|----------|----------------------------|
| REFINE-SC | 5 | **2** | **3** | **0** | SBLVX-SC-02 |
| VMS | 3 | **1** | **2** | **0** | VM-01 |
| **Total** | **8** | **3** | **5** | **0** | SBLVX-SC-02, VM-01 |