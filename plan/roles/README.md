# plan/roles — el protocolo del swarm (spinoff)

Derivado del protocolo canónico de zeus-sdk (`plan/roles/` @ 2026-07-15),
autocontenido aquí (DS-3). Agnóstico de herramienta: en Cursor se
`@`-mencionan; cualquier otro runner los consume tal cual.

## Roles

| Prompt | Rol | Cuándo |
| ------ | --- | ------ |
| [ORQUESTADOR.md](ORQUESTADOR.md) | Orquestador | Chat principal: estado, asignación, revisión, ✅ |
| [WORKER.md](WORKER.md) | Worker | Chat nuevo por WP: implementar + reportar |
| [REVISION.md](REVISION.md) | Orquestador | Revisar un entregable (reporte + diffs por repo) |
| [CORRECCION.md](CORRECCION.md) | Worker | Tras devolución: corregir en las mismas ramas |
| [BRIEF.md](BRIEF.md) | Orquestador → usuario | Plantilla de brief para lanzar un worker |

## Dónde vive el estado

- **`plan/BACKLOG.md` es del orquestador y vive en master del
  superproyecto.** Marca 🔶 al asignar y ✅ al aceptar. El worker no lo edita
  nunca.
- **El reporte vive en la rama del WP** (`plan/REPORTES/WP-….md`, en el
  superproyecto): nombre único = sin conflictos; llega a master con el merge.
- **`plan/DECISIONES.md` §abiertas es del usuario.**

## Submodules (regla de este mundo, PRACTICAS §2)

Un WP puede tocar el superproyecto y/o N submodules (cada uno repo git
propio):

- El brief **declara los repos tocados**; rama `wp/<id>-<slug>` en CADA repo
  tocado.
- El reporte lista commits POR repo.
- El **bump del puntero de submódulo** en el superproyecto lo hace el
  orquestador al aceptar (✅) — nunca el worker.
- Paralelismo: un worktree por chat worker (del superproyecto; los
  submodules van dentro):

```bash
git worktree add ../aleph-wp-s00 -b wp/s00-gates
# al aceptar y mergear: git worktree remove ../aleph-wp-s00
```

## Flujo

```text
1. Chat orquestador (ORQUESTADOR.md) → «Estado del swarm»
2. Orquestador propone lote, marca 🔶 en master y rellena un BRIEF por WP
3. Usuario abre worktrees + chats worker (WORKER.md + brief)
4. Worker termina → reporte en plan/REPORTES/ (en su rama) → avisa
5. Chat orquestador (REVISION.md + reporte + ramas) → ✅ + bumps + merge, o devolución
6. Si devuelto: mismo chat worker (CORRECCION.md + comentarios del reporte)
```

## Reglas de oro

1. Un WP = un chat worker = una rama por repo tocado = (si hay paralelo) un
   worktree.
2. Solo el orquestador escribe en BACKLOG; solo el usuario cierra DECISIONES.
3. Prohibido tocar o nombrar a zeus-sdk (PRACTICAS §1.2, la asimetría).
4. No mezclar este plan con los sistemas de la generación 1 (sala/dossiers/
   scrum): no reciben trabajo nuevo, se digieren en S3.
5. El brief + `plan/` bastan: no se asume historial de otros chats.
6. ✅ implica autorización de merge (y los bumps de submódulo).
7. Commits convencionales (PRACTICAS §1.9).

## Primer lote sugerido (Ola S0)

WP-S00 (gates) y WP-S01 (inventario) — paralelizables. S01 es el discovery
del agujero negro: conviene un worker con criterio, no el más rápido.
