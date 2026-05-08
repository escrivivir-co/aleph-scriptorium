# Tablero de tareas — Scriptorium VPS

> **Sprint:** sprint-scrum-backlog-lore-db-vector-expansion-init
> **Última actualización:** 08-may-2026 — orquestador (`GitHub Copilot`) — `VPS-04/05/06` integradas y cerradas; `VPS-08` queda como única libre
> **Agentes activos:** 0 en curso, 3 slots disponibles (gepe, gemy, sony). Guardia externa retirada.
> **Estados:** `libre` · `propuesta:{alias}` · `en-curso:{alias}` · `entregada:{alias}` · `entregada-en-revisión:{alias}` · `cerrada` · `no-aplica`
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
FOCO PO 2026-05-08: esta sala trabaja exclusivamente el dossier scriptorium-vps.
  Los tracks REFINE-SC, VMS y SSV quedan fuera de foco en esta sesión.
  Agentes: no proponer tareas de esos tracks salvo nueva decisión explícita del PO.

Track VPS: VPS-01 + VPS-02 → VPS-03 → VPS-04/VPS-05/VPS-06/VPS-07 → VPS-08
  VPS-01 crea repo/submódulo y VPS-02 crea plugin/agentes.
  VPS-03 abre DNS+Caddy; VPS-04..07 levantan stacks y datos.
  VPS-08 cierra con runbook y verificación end-to-end.
```

---

## Track REFINE-SC — backlog scrum lore db vector expansion (5 tareas)

| Task | Título | Deps | Estado |
|------|--------|------|--------|
| SBLVX-SC-00 | Pre-scrum definitions | — | `cerrada` |
| SBLVX-SC-01 | Planification | SBLVX-SC-00 | `cerrada` |
| SBLVX-SC-02 | Aprobar o enmendar plan compartido | SBLVX-SC-01 | `no-aplica` — fuera de foco VPS |
| SBLVX-SC-03 | Refinar scope Scriptorium | SBLVX-SC-02 | `no-aplica` — fuera de foco VPS |
| SBLVX-SC-04 | Preparar handoff de integración | SBLVX-SC-02, SBLVX-SC-03 | `no-aplica` — fuera de foco VPS |

> Dossier: `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`

---

## Track VMS — vector-machine technical dossier (3 tareas)

| Task | Título | Deps | Estado |
|------|--------|------|--------|
| VM-00 | Contexto y persistencia | — | `cerrada` |
| VM-01 | Ratificar frontera del contrato MCP v1 | VM-00 | `no-aplica` — fuera de foco VPS |
| VM-02 | Traducir contrato ratificado a backlog ejecutable | VM-01 | `no-aplica` — fuera de foco VPS |

> Dossier: `sala/dossiers/vector-machine/`
>
> Nota: track de diseño técnico. No abre todavía implementación; congela referencias y prepara el siguiente ciclo.

---

## Track SSV — sesión paraguas vectorial (3 tareas)

| Task | Título | Deps | Estado |
|------|--------|------|--------|
| SSV-00 | Contexto y persistencia | — | `cerrada` |
| SSV-01 | Ratificar mapa de ownership y relación entre dossiers | SSV-00 | `no-aplica` — fuera de foco VPS |
| SSV-02 | Preparar handoff de retoma y prioridad | SSV-01 | `no-aplica` — fuera de foco VPS |

> Dossier: `sala/dossiers/sesion-scriptorium-vector/`
>
> Nota: track paraguas de sesión. Su función es enlazar `plan.md` y los tres dossiers obligatorios del ecosistema, no duplicar sus backlogs.

---

## Track VPS — Scriptorium VPS (9 tareas)

| Task | Título | Deps | Estado |
|------|--------|------|--------|
| VPS-00 | Contexto y dossier inicial | — | `cerrada` — GitHub Copilot |
| VPS-01 | Repo `scriptorium-vps` y submódulo | VPS-00 | `cerrada` |
| VPS-02 | Plugin `scriptorium-vps` y agentes | VPS-00 | `cerrada` |
| VPS-03 | DNS y Caddy público | VPS-01 | `cerrada` |
| VPS-04 | Stack Node-RED público/admin | VPS-01, VPS-03 | `cerrada` — Gepe (integrada por Aleph) |
| VPS-05 | Stack MCP Mesh DevOps público | VPS-01, VPS-03 | `cerrada` — Gepe (integrada por Aleph) |
| VPS-06 | Stack Verdaccio público | VPS-01, VPS-03 | `cerrada` — Gepe (integrada por Aleph) |
| VPS-07 | Volúmenes shared y SFTP helpers | VPS-01 | `cerrada` — Sony/Aleph por excepción PO |
| VPS-08 | Runbook y verificación end-to-end | VPS-03, VPS-04, VPS-05, VPS-06, VPS-07 | `libre` — requiere ventana controlada para cualquier operación viva |

> Dossier: `sala/dossiers/scriptorium-vps/`

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
| SSV-00 | sesion-scriptorium-vector | `cerrada` — GPT-5.4 |
| VPS-00 | scriptorium-vps | `cerrada` — GitHub Copilot |
| VPS-01 | scriptorium-vps | `cerrada` — Gepe (integrada por Aleph) |
| VPS-02 | scriptorium-vps | `cerrada` — Gepe (integrada por Aleph) |
| VPS-03 | scriptorium-vps | `cerrada` — Gepe (aprobada tras revisión e integrada como diseño) |
| VPS-04 | scriptorium-vps | `cerrada` — Gepe (Node-RED integrado por Aleph) |
| VPS-05 | scriptorium-vps | `cerrada` — Gepe (MCP DevOps integrado por Aleph) |
| VPS-06 | scriptorium-vps | `cerrada` — Gepe (Verdaccio integrado por Aleph) |
| VPS-07 | scriptorium-vps | `cerrada` — Sony/Aleph (helpers SFTP y layout integrados por excepción PO) |
| REV-VPS-01+VPS-02 | scriptorium-vps | `cerrada` — aleph-review (veredicto aprobada) |
| REV-VPS-03 | scriptorium-vps | `cerrada` — aleph-review (veredicto aprobada) |
| REV-VPS-04 | scriptorium-vps | `cerrada` — aleph-review (veredicto devuelta) |
| REV-VPS-05 | scriptorium-vps | `cerrada` — aleph-review (veredicto devuelta) |
| REV-VPS-04-R2 | scriptorium-vps | `cerrada` — aleph-review (veredicto aprobada) |
| REV-VPS-05-R2 | scriptorium-vps | `cerrada` — aleph-review (veredicto aprobada) |
| REV-VPS-06 | scriptorium-vps | `cerrada` — aleph-review (veredicto aprobada) |
| REV-VPS-07 | scriptorium-vps | `cerrada` — aleph-review (veredicto devuelta) |
| REV-VPS-07-R2 | scriptorium-vps | `cerrada` — aleph-review (veredicto devuelta) |
| REV-VPS-07-R3 | scriptorium-vps | `cerrada` — aleph-review (veredicto aprobada) |

---

> **⚠️ Aleph:** actualiza esta tabla cada vez que cierres una task. Si no, se desincroniza.

| Track | Total | Cerradas | Libres | En curso | Entregadas | En revisión | Primeras libres (sin deps) |
|-------|-------|----------|--------|----------|------------|-------------|----------------------------|
| REFINE-SC | 5 | **2** | **0** | **0** | **0** | **0** | — |
| VMS | 3 | **1** | **0** | **0** | **0** | **0** | — |
| SSV | 3 | **1** | **0** | **0** | **0** | **0** | — |
| VPS | 9 | **8** | **1** | **0** | **0** | **0** | VPS-08 |
| **Total** | **20** | **12** | **1** | **0** | **0** | **0** | VPS-08 |