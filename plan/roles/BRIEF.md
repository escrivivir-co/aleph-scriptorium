# Brief para lanzar worker (spinoff)

_Plantilla que rellena el **orquestador** (tras marcar 🔶 en BACKLOG) y el
usuario pega en un **chat nuevo** junto con `plan/roles/WORKER.md`._

---

```text
(rol) plan/roles/WORKER.md

WP: WP-S?? · <título>
Repos tocados: superproyecto | MCPGallery | <submódulo> …
Rama: wp/s??-<slug> (en cada repo tocado)
Worktree: ../aleph-wp-s??   (solo si hay workers en paralelo)
Reporte: plan/REPORTES/WP-S??-<slug>.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG):
- plan/VISION.md §…  /  plan/INVENTARIO.md §<zona>
- (archivos concretos que el orquestador ya identificó)

Notas del orquestador:
- (conflictos con otros WPs en vuelo, orden de merge, excepciones de gates…)

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```

---

## Ejemplo — Ola S0

### WP-S01

```text
(rol) plan/roles/WORKER.md

WP: WP-S01 · Inventario maestro (el discovery)
Repos tocados: superproyecto (solo plan/INVENTARIO.md; NO se arregla nada)
Rama: wp/s01-inventario
Reporte: plan/REPORTES/WP-S01-inventario.md

Lecturas extra:
- plan/VISION.md (método del agujero negro y glosario)
- .gitmodules (las 25 zonas submódulo) + .github_V1/ + plugins-claude/ + sala/

Notas: veredictos PROPUESTOS con evidencia (fechas git, builds, consumidores);
la ratificación es del usuario (DAS-1). Zona sin evidencia = zona sin veredicto.
```
