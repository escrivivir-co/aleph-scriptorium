# BACKLOG — el agujero negro, por olas

Convención: WPs autocontenidos con **CA** verificables y **Digestión** (qué
se demuele o archiva en el mismo WP). Estados: ⬜ pendiente · 🔶 en curso
(agente + fecha, lo marca el orquestador al asignar) · ✅ aceptado (solo
orquestador). El brief declara qué repos toca cada WP (PRACTICAS §2).

Este backlog NO gobierna zeus-sdk (prohibido tocarlo) ni la obra de
`ARCHIVO/`. Los dossiers/sala/scrum antiguos no reciben trabajo nuevo: se
digieren en S3.

---

## Ola S0 — Horizonte de sucesos

- ⬜ **WP-S00 · Gates del spinoff** — test raíz `npm run gates` (patrón grep):
  (a) nombres de transición en código nuevo; (b) deps `file:`/tgz/ruta
  relativa entre paquetes (PRACTICAS §1.1) fuera de la lista de excepciones
  preexistentes; (c) referencias por ruta a zeus-sdk; (d) árboles vendoreados
  de otra codebase (DS-5: inflar = publicar, nunca copiar). Excepciones
  comentadas.
  **CA:** rojo con violación sintética de cada tipo; verde (o excepciones
  justificadas) sobre lo preexistente.
  **Digestión:** n/a.

- ⬜ **WP-S01 · Inventario maestro (el discovery)** — el primer trago del
  agujero negro: recorrer las ~30 zonas (25 submodules de `.gitmodules` +
  `.github_V1` + `plugins-claude` + `sala`+dossiers + `scripts` + raíz) y
  producir `plan/INVENTARIO.md`: por zona — qué es, estado real (fechas,
  builds, tests), consumidores, y veredicto propuesto
  **absorber / alinear / archivar** con evidencia. Sin arreglar nada.
  **CA:** tabla completa (cero zonas sin veredicto propuesto); cada veredicto
  con evidencia citada; el usuario/orquestador ratifica los veredictos antes
  de que la ola S4 los ejecute.
  **Digestión:** n/a (es el plano de digestión).

## Ola S1 — El corazón (la pieza angular se consolida)

- ⬜ **WP-S10 · mcp-core-sdk canónico** — `MCPGallery/mcp-core-sdk` como EL
  paquete angular: deps internas de MCPGallery pasan de tarballs
  (`file:...tgz`) a registry con semver; los `.tgz` committeados se retiran;
  tests de la rutina (rabbit beacons/peers, spider RNFP con rechazos, horse
  JSON-RPC end-to-end, IACM cola) además de los existentes; CHANGELOG al día.
  **CA:** `npm install` limpio en MCPGallery resolviendo del registry;
  matriz de tests verde; cero `.tgz` en el árbol.
  **Digestión:** los tarballs y las deps `file:`.

- ⬜ **WP-S11 · Control-plane REST servido y documentado** *(dep S10)* — el
  `spec/control-plane.openapi.yaml` deja de ser solo spec: servidor de
  referencia (`POST /bots {role, room}`, `GET /peers`, `GET /actor-registry`)
  + AsyncAPI del runtime regenerados desde código/contrato y publicados en
  los docs del monorepo. Es la cara REST de la rutina: MCP articulado con
  REST, demostrable con curl.
  **CA:** e2e — lanzar un rabbit y un horse por REST, verlos en `/peers` y
  `/actor-registry`, y un `callTool` sobre horse con evidencia; specs
  regeneradas sin drift (test de coherencia spec↔código).
  **Digestión:** endpoints/documentos manuales que el generado sustituya.

- ⬜ **WP-S12 · Release desde CI para `@alephscript/*`** *(dep S10)* —
  changesets + publish al registry propio desde CI del repo MCPGallery
  (mismo patrón que el mundo zeus decidió: bumps por paquete, changelog,
  pipeline verde como condición). La «registry Phase A» manual se vuelve
  pipeline.
  **CA:** un cambio de prueba con changeset produce versión+publish+tag
  automáticos; pipeline rojo lo bloquea.
  **Digestión:** el proceso manual de empaquetado (tgz a mano).

## Ola S2 — El bridge (dep S1)

- ⬜ **WP-S20 · Peers r/s/h contra un mesh zeus** — un peer de este mundo,
  instalando SOLO del registry (`@alephscript/mcp-core-sdk` + `@zeus/*`
  cuando el scope exista; hasta entonces, contra la frontera pública
  documentada de rooms), entra en una room del mesh zeus como **tercero
  anónimo**: rabbit se anuncia, spider federa, horse ofrece un tool real de
  este mundo (p. ej. consulta a un editor/SDK) y consume capacidades del
  otro lado. Nada se toca ni se nombra en el repo de zeus.
  **CA:** demo reproducible con evidencia (beacons, RNFP `active`, callTool
  ida y vuelta) contra un mesh zeus levantado por el usuario; cero cambios
  en zeus-sdk.
  **Digestión:** n/a.

- ⬜ **WP-S21 · El zeus embrionario se digiere** *(dep S01 ratificado)* —
  `MCPGallery/zeus` (UI presets :3012, v0.1.0): su función vive hoy,
  madurada, en el mundo zeus. Veredicto esperado: **archivar** (cripta con
  índice y lore de la Gran Refactorización de Asterion) — o lo que el
  inventario ratifique. Si algo suyo sigue vivo (docs de puertos, e2e
  Playwright útiles), se destila antes de archivar.
  **CA:** el veredicto ratificado ejecutado; grep sin referencias vivas al
  paquete desde código activo; el lore preservado con puntero.
  **Digestión:** el paquete según veredicto.

## Ola S3 — La editorial reencarna (dep S0)

- ⬜ **WP-S30 · Triage de plugins-claude** — la migración a medias (11 de 31
  portados) se cierra con criterio, no a ciegas: por plugin de
  `.github_V1/plugins/`, veredicto portar/fusionar/archivar según uso real;
  los portados quedan funcionales en `plugins-claude/` con su marketplace.
  **CA:** cero plugins «pendientes de portar» sin veredicto; marketplace
  válido; un plugin portado demostrado end-to-end.
  **Digestión:** los puentes `plugin_ox_*` de la generación 1 que queden
  huérfanos.

- ⬜ **WP-S31 · Ox, Índice, Aleph y las Banderas, era MCP** *(dep S30)* — el
  séquito se reencarna ligado a ESTE plan: Ox (oráculo/diagnóstico del
  sistema de agentes), Índice (portero DRY: «¿dónde está X?» sobre
  INVENTARIO/plan), Aleph (productor), las 5 Banderas como **revisores de
  reportes** (verdad/sombra/estructura/límites/registro — encajan de forma
  natural como lentes de revisión de WPs). Formato: agentes de la era
  Claude/plugins-claude, con sus tools MCP donde toque.
  **CA:** los 4+5 definidos y utilizables; una revisión de reporte real
  ejecutada con las Banderas como lentes; documentado en roles/ cómo
  invocarlos.
  **Digestión:** sus `.agent.md` de generación 1 quedan como fuente
  histórica archivada (no dos versiones activas).

- ⬜ **WP-S32 · Archivar la generación 1** *(dep S30, S31)* — `.github_V1/`,
  `sala/` (tablero+protocolo), dossiers cerrados y el scrum antiguo se
  destilan (lo vigente ya migró en S30/S31 y a este plan) y se archivan en
  `CRIPTA/` con índice. Los dossiers con contenido vivo (p. ej.
  layer2-bridge) se convierten en entradas de horizonte de este BACKLOG
  antes de archivar el original.
  **CA:** raíz sin sistemas de coordinación duplicados: plan/ es el único
  activo; CRIPTA con índice navegable; cero enlaces rotos en docs vivos.
  **Digestión:** la que da nombre al WP.

## Ola S4 — La digestión total (dep S01 ratificado; WPs se instancian por zona)

- ⬜ **WP-S40..S4x · Un WP por zona del inventario** — plantilla: tomar una
  zona con veredicto ratificado y ejecutarlo — **absorber** (modernizar:
  registry-first, gates, tests, publicar) / **alinear** (mantener,
  consumiendo registry) / **archivar** (cripta con índice). El orquestador
  instancia estos WPs desde INVENTARIO.md, priorizando: lo que bloquea a
  otros → lo publicable → lo archivable.
  **CA (por WP):** el veredicto ejecutado con evidencia + gates verdes.
  **Digestión:** la de cada zona.

- ⬜ **WP-S49 · Auditoría de cierre** *(última)* — barrido final del
  superproyecto: cero vías muertas, cero deps file:/tgz, cero sistemas de
  coordinación paralelos, INVENTARIO.md con todas las zonas ✅. El agujero
  negro ha terminado de tragar.
  **CA:** reporte de cierre con la tabla zona→estado final; gates verdes.
  **Digestión:** lo que el barrido encuentre.

## Horizonte (no tomar aún)

- **Heterónimos como elenco MCP** — BotHubSDK (`heteronimos-semi-asistidos`)
  y los brains Prolog como personajes servibles por horse a cualquier mesh.
- **Layer 2 del pub (teatro)** — el dossier `layer2-bridge` (identidad SSB
  como credencial, puente Layer1↔rooms) espera diseño cerrado; cuando llegue,
  entra como ola nueva.
- **StreamDesktop / Cronos y el resto de productos** — según veredictos del
  inventario; los vivos se alinean al patrón registry + r/s/h.
