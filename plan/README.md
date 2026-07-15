# plan/ — El agujero negro de aleph-scriptorium

Centro de mando del **spinoff**: alinear este mundo (la casa madre: ~25
submodules, la editorial de agentes, MCPGallery) con **zeus-sdk** (el
cerebro/base, que vive aparte en `SCRIPTORIUM_V0/zeus-sdk` y NO se toca desde
aquí). El método es el **agujero negro**: un discovery que se traga la
codebase zona a zona — inventaria, clasifica (absorber / alinear / archivar)
y digiere — hasta que no queden vías muertas y todo lo vivo hable el mismo
idioma: **el registry npm propio + la rutina rabbit-spiders-horses (MCP con
REST)**.

Aquí trabaja un **swarm de agentes** con un **orquestador**. El protocolo es
el mismo que el de zeus-sdk (derivado de su `plan/roles/` @ 2026-07-15, ver
[roles/](roles/README.md)): el swarm implementa WPs, el orquestador asigna,
revisa y es el único que marca ✅; el usuario resuelve las decisiones
abiertas.

## Mapa de documentos

| doc | qué contiene | quién lo edita |
| --- | ------------ | -------------- |
| [VISION.md](VISION.md) | el spinoff, el bridge a zeus, el método del agujero negro, glosario | orquestador |
| [BACKLOG.md](BACKLOG.md) | olas S0–S4 con CA y demolición | orquestador (estado); swarm propone |
| [PRACTICAS.md](PRACTICAS.md) | **lectura obligatoria antes de tocar código** | orquestador |
| [DECISIONES.md](DECISIONES.md) | decisiones del spinoff (independientes de las de zeus) | orquestador |
| [roles/](roles/README.md) | protocolo del swarm (orquestador/worker/revisión/corrección/brief) | orquestador |
| [REPORTES/](REPORTES/) | un acta por WP, según [REPORTES/PLANTILLA.md](REPORTES/PLANTILLA.md) | swarm |

## Relación con los sistemas que ya viven aquí

Este plan **no llega a una casa vacía**: conviven la sala (`sala/`), los
dossiers (`sala/dossiers/`), el scrum generativo (`plugins-claude/scrum/`,
`.github_V1/plugins/scrum/`) y el sistema de archivo (`ARCHIVO/`). Regla de
convivencia (D-S4):

- **`ARCHIVO/` es obra canónica** (el *qué*): el agujero negro no se la
  traga; la respeta y la referencia.
- **sala / dossiers / scrum / `.github_V1`** son *material del agujero
  negro*: se leen, se destila lo bueno (banderas auditoras, DRY de Índice,
  protocolo de sala, modelo generativo) y se archivan como generación 1.
  Desde hoy, la coordinación de trabajo nuevo pasa por ESTE plan; no se
  abren dossiers ni tableros nuevos fuera de él.
- Los agentes (Ox, Aleph, Índice, las Banderas y el séquito) no se pierden:
  su reencarnación como agentes de la era Claude/MCP es la ola S3.

## Ciclo de trabajo (resumen; detalle en roles/)

1. El orquestador asigna un WP (marca 🔶 en BACKLOG, siempre en master) y
   entrega un brief.
2. El worker implementa en rama `wp/<id>-<slug>` (worktree si hay paralelo),
   con tests, demolición y auto-revisión.
3. Reporte en `REPORTES/WP-<id>-<slug>.md` con evidencia literal
   (`⏳ sin verificar` existe; inventar observaciones, no).
4. El orquestador revisa contra CA + PRACTICAS y marca ✅ (= autorización de
   merge) o devuelve.
