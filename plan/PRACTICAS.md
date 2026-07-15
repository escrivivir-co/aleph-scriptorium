# PRACTICAS — lectura obligatoria antes de tocar código

Derivadas del protocolo de zeus-sdk (`plan/PRACTICAS.md` @ 2026-07-15),
adaptadas al spinoff. Son la lista de cosas por las que un WP **se devuelve**.

## 1. Reglas duras

1. **Registry-first.** Dependencias entre paquetes de este mundo: por el
   registry (`npm.scriptorium.escrivivir.co`), con semver. Prohibido `file:`,
   tarballs `.tgz` committeados y rutas relativas entre paquetes/submodules
   en código nuevo (los existentes se digieren en S1). Lo que zeus ofrezca se
   instala (`@zeus/*` cuando exista); lo que este mundo ofrezca se publica.
2. **Ni tocar ni nombrar a zeus-sdk.** Prohibido modificar
   `SCRIPTORIUM_V0/zeus-sdk` desde un WP de este plan, y prohibido introducir
   en zeus referencias a este mundo (asimetría, VISION §bridge). Lo que haga
   falta de zeus se pide allí como necesidad genérica de consumidores.
3. **Sin nombres de transición.** `legacy`, `v2`, `-old`, `-new`, `_V1`,
   aliases de compatibilidad: prohibidos en lo nuevo. Cada WP de digestión
   demuele o archiva lo que sustituye — viejo y nuevo no conviven sueltos.
4. **Reutiliza o publica, nunca copies.** Copy-paste entre paquetes o desde
   otro mundo = devolución. Si algo merece compartirse, se publica al
   registry con nombre y versión.
5. **`ARCHIVO/` es obra, no deuda.** No se «refactoriza» contenido canónico
   ni la dimensión narrativa (elenco, heterónimos, cartas). Se referencia.
6. **La rutina es r/s/h.** Toda comunicación entre procesos/mundos nueva usa
   la rutina rabbit-spiders-horses de `mcp-core-sdk` (o la extiende con WP);
   nada de canales ad-hoc paralelos. El control se expone REST
   (control-plane) y el contrato se regenera (AsyncAPI/OpenAPI) en el mismo
   WP.
7. **Tablas y máquinas, no if-chains.** El patrón de la casa son las
   máquinas XState (RNFP/IACM) y los dispatchers por tabla de intents
   (`protocol/dispatcher.mjs`). Tres+ ramas sobre el mismo discriminante =
   tabla.
8. **Tests y specs en el mismo WP.** Lo nuevo llega con tests; si toca
   protocolo, con spec regenerada.
9. **Commits convencionales**: `tipo(alcance): resumen`
   (`feat|fix|refactor|test|docs|chore`), alcance = paquete/submódulo.
   Rupturas: `!` o `BREAKING CHANGE:`.

## 2. Submodules (la adaptación clave de este mundo)

Aquí el trabajo cruza repos: el superproyecto + ~25 submodules con vida git
propia.

- El brief de cada WP **declara qué repos toca** (superproyecto y/o
  submódulos concretos).
- Rama `wp/<id>-<slug>` **en cada repo tocado**; el reporte lista commits
  POR repo.
- El **bump del puntero** de submódulo en el superproyecto lo hace el
  orquestador al aceptar (✅), nunca el worker a medias.
- Un WP no deja un submódulo en rama sin reportar: o se entrega o se
  revierte.

## 3. Alcance

El WP, todo el WP (incluida demolición/archivado) y solo el WP. Hallazgos →
§hallazgos del reporte, no fixes de pasada. WP mal especificado → parar y
reportar, no reinterpretar.

## 4. Auto-revisión obligatoria

Al terminar, PARA. Relee el diff completo (por repo) contra este checklist y
corrige antes de reportar; luego rellénalo con honestidad en el reporte:

- [ ] ¿Dependencias `file:`/tgz/ruta-relativa nuevas? ¿Algo debía publicarse?
- [ ] ¿Alguna referencia a zeus-sdk por ruta, o algo que exija tocarlo?
- [ ] ¿Nombres de transición o copy-paste?
- [ ] ¿If-chains que debieron ser tabla/máquina?
- [ ] ¿Canal de comunicación ad-hoc que debió ser r/s/h?
- [ ] ¿Demolición/archivado completo? (grep: cero referencias vivas)
- [ ] ¿Tests prueban comportamiento? ¿Specs regeneradas si tocó protocolo?
- [ ] ¿Arranque real verificado (levantado y mirado, no solo tests)?
- [ ] ¿Commits convencionales y por-repo correctos? ¿Puntero de submódulo
      SIN bumpear (eso es del orquestador)?
- [ ] ¿El diff contiene solo el alcance del WP?

Regla de evidencia: **no inventes observaciones**. Salida literal o
`⏳ sin verificar`.

## 5. Reporte

Desde [REPORTES/PLANTILLA.md](REPORTES/PLANTILLA.md) a
`REPORTES/WP-<id>-<slug>.md`. Sin reporte con evidencia y auto-revisión, no
hay revisión.
