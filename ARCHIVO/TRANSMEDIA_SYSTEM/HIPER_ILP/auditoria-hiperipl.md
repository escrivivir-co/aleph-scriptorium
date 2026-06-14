# Auditoría ASI (corregida) — `dossier-hiperipl` + `papers-hiperipl` frente al workspace federado

> **Modo:** ASI · **Encargo:** participación pedida por el equipo de diseño de Scriptorium.
> **Objeto:** verificar si los dos cuerpos documentales entienden bien el estado real del
> codebase, en el marco del dosier `SESION_06_JUNIO`.
> **Fecha original:** 14-jun-2026 · **Corrección de alcance:** 14-jun-2026.
> **Estado editorial:** diagnóstico **rectificado**; abierto a discusión.

> **AVISO DE CORRECCIÓN.** Esta es la **segunda redacción**. La primera (archivada en el
> historial git) emitió varios veredictos `EXTERNO / no existe / cita colgante` que eran
> **error de alcance del auditor**, no defectos de los papers. Esta versión retira esos
> veredictos, explica el error (§1), sustituye la tabla de fidelidad por una **matriz de
> estado de migración** con rutas verificadas (§2), consolida los **issues residuales
> reales** (§3) y **conserva** el análisis filosófico que seguía siendo correcto (§4). El
> re-anclaje fino de cada cita `[TEC]` vive en `hiperipl-reanclaje.md`; la reconciliación de
> genealogías, en `hiperipl-reconciliacion.md`.

---

## 0. Veredicto en una frase (rectificado)

Los **papers filosóficos son sólidos y honestos**, y —contra lo que dije la primera vez— su
puente `[TEC]` **no ancla a una arquitectura ajena**: ancla al **mismo linaje del Plan
Maestro** del Scriptorium (Future Pipeline Engine + sustrato formal `time.ts`/`draft_01`),
que **sí existe en este workspace**, repartido entre `NETWORK-ENGINE` y sus submódulos
hermanos. Lo que sobrevive de mi crítica es **estrecho y concreto**: `draft_01.ts` no
compila, el *seam* EVM de `contract-adapters` es aspiracional (`SPEC?`, no código), algunas
citas usan prefijo de ruta del Mac (`THEIA_PATH`) o ubican mal una pieza, y unas pocas
piezas (`future-pipeline-engine`, el Cartógrafo real, `mapa-ilustracion-2.0.md`,
`EXTERNO.md`) **no se migraron**. La sospecha del usuario sobre la primera auditoría —"has
simplificado el estado real"— **se confirma, pero apuntando a mí**, no a los papers.

---

## 1. El error de alcance (qué hice mal y por qué)

**Premisa equivocada de la 1ª auditoría:** tratar `NETWORK-ENGINE` como si fuera *el repo
entero*. No lo es.

**Realidad verificada:**

- El workspace real es `C:\Users\aleph\OASIS\aleph-scriptorium`, rama
  `integration/beta/scriptorium`.
- `NETWORK-ENGINE` es **una hoja** dentro de él:
  `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/` (submódulo).
- El workspace aloja, como **submódulos hermanos**, a las piezas que los papers citaban:
  `DocumentMachineSDK/`, `AgentLoreSDK/`, `BlockchainComPort/`, `BotHubSDK/`,
  `ScriptoriumVps/`, `PrologEditor/`, `.github_V1/`, `SCRIPTORIUM-GAMES/` (todos con su
  `README-SCRIPTORIUM.md` presente, verificado).
- El workspace es una **MIGRACIÓN PARCIAL** de un árbol mayor en el Mac del autor
  (`/Users/morente/Desktop/THEIA_PATH/NUEVA_BASE/SCRIPTORIUM/ALEPH/...`). Por eso muchas
  rutas `[TEC]` aparecen con prefijo `THEIA_PATH` / `/Users/morente/...`: **son la fuente
  original**, no "otra máquina ajena al proyecto".

**Consecuencia.** Cuando la 1ª auditoría escribió `EXTERNO` sobre la *future-machine 6+2*,
`registry.json` o las rutas del LEXICON, confundió **"no está en la subcarpeta
NETWORK-ENGINE"** con **"no existe en el proyecto"**. La mayoría **sí existen**, un nivel
más arriba, en los submódulos. El veredicto correcto no era `EXTERNO` sino **`MIGRADO, en
repo hermano`** o, para unas pocas, **`NO MIGRADO (solo en THEIA_PATH)`**.

**Lo que la 1ª auditoría también erró puntualmente:**

- Dijo que `SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md` "no existe". **Existe**:
  `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md`. La cita de YELLOW
  §6 (`01_PLAN_MAESTRO_TOPDOWN.md §6–§7`) es **legítima**, no colgante.
- Trató las dos genealogías (díptico 6-jun vs. future-machine) como **rivales
  irreconciliables**. No lo son: el propio `01_PLAN_MAESTRO_TOPDOWN.md` las une como
  **top-down (sesión en vivo) y bottom-up (sustrato formal) del mismo sistema**, que se
  "encuentran en el medio" (su §9). Ver `hiperipl-reconciliacion.md`.

**Lo que la 1ª auditoría acertó y se mantiene:** `draft_01.ts` no compila; el destino EVM de
`contract-adapters` es interpretación, no hecho; los papers no cruzan con el dosier 6-jun ni
con `simulador-voces`. Eso pasa a §3.

---

## 2. Matriz de estado de migración (rutas verificadas)

> Leyenda: **MIGRADO** = el fichero existe en este workspace (ruta dada, verificada).
> **NO MIGRADO** = solo hay miga/puntero a `THEIA_PATH`; el contenido no está aquí.
> Rutas relativas a la raíz del workspace `aleph-scriptorium/`.

### 2.1 Piezas MIGRADAS (existen aquí — la 1ª auditoría las dio por externas)

| Pieza | Ruta real verificada | Nota |
|---|---|---|
| Pipeline 6+2 (futures-engine) | `DocumentMachineSDK/.github/skills/futures-engine/SKILL.md` | Loreador→Bartleby→Archivero→Grafista→Demiurgo→Dramaturgo + transversales |
| Contrato de existencia / `SPEC?` / gaps | `DocumentMachineSDK/.github/skills/engine-plan/SKILL.md` | `READY/BUILD/MISS`, `SPEC?` |
| Registry de plugins | `.github_V1/plugins/registry.json` | plugins `arg-board`, `network`, `prolog-editor`, agente `BOE`… |
| Nodo azul (cuadernos) | `DocumentMachineSDK/docs/azul/cuadernos/liria_rojipardismo_{2d,3d,clusters}.html` | visualización 2D/3D/clusters |
| simulador-voces (skill) | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/SCRIPTORIUM-CATALOG-PLAYER/.github/skills/simulador-voces/SKILL.md` | 5 rondas + Merge Agéntico |
| simulador-voces (pack de colores) | `…/simulador-voces/packs/red-blue-white-black-pack/` | **colores RED/BLUE/WHITE/BLACK ya existen como voces** |
| Plan maestro (top-down) | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md` | nombra el core "Future Pipeline Engine"; `time.ts` = Nivel 6 |
| Plan maestro (bottom-up) | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/STATE-MACHINE/DOCS/00_PLAN_MAESTRO.md` | tablero formal → producto |
| Sustrato formal (`time.ts` alias) | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/draft_01.ts` | existe pero **no compila** (§3) |
| Seam de contratos | `…/NETWORK-ENGINE/packages/contract-adapters/src/entity-metadata.ts` | `fromEntityMetadata()`; **cero EVM** (§3) |
| Matriz concepto↔paquete | `…/NETWORK-ENGINE/INSTRUCTIONS/LAYER_1/ECOSYSTEM.md` | contract-first projection (MCP/GraphQL/OpenAPI/UI) |
| Dosier filosófico HiperIPL | `ARCHIVO/TRANSMEDIA_SYSTEM/dossier-hiperipl/00..05` | calidad alta (§4) |
| Dosier de producto 6-jun | `…/NETWORK-ENGINE/SCRATCHPAD/SESION_06_JUNIO/` | díptico + 4 juegos + Federation_ASI_Program |
| Submódulos de federación | `BlockchainComPort/`, `BotHubSDK/`, `ScriptoriumVps/` (+ `README-SCRIPTORIUM.md`) | SSB/Oasis, IACM/RNFP, Pub.Rooms |
| Editor Prolog (para reglas Horn) | `PrologEditor/` | candidato sandbox de SPEC?-010 (YELLOW §5) |

### 2.2 Piezas NO MIGRADAS (solo miga/puntero a `THEIA_PATH`)

| Pieza | Lo único que hay aquí | Ruta original (Mac) |
|---|---|---|
| `future-pipeline-engine/` (el core que cita el Plan Maestro: `index.md`, `dossier.md`) | nada (0 ficheros) | `ALEPH/ARCHIVO/future-pipeline-engine/` |
| Cartógrafo `yo-no-soy-yo` real (`mapa.md`, `mapa.graph.json`, la "nave") | **una línea** en `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/SCRIPTORIUM-CATALOG-PLAYER/temas/yo-no-soy-yo-proposition-engine/ref.md` | `ALEPH/AgentLoreSDK/docs/parking/yo-no-soy-yo-propositions-engine` |
| Mapa filosófico | nada | `…/carpeta sin título 7/mapa-ilustracion-2.0.md` |
| Conversación de origen | nada | `…/carpeta sin título 7/EXTERNO.md` |

> Matiz importante sobre el Cartógrafo: el submódulo `AgentLoreSDK/` **sí está presente**,
> pero **no contiene** `docs/biblioteca/.../yo-no-soy-yo-propositions-engine/mapa.md` (0
> hits). Además, el puntero `ref.md` apunta a `docs/parking/...`, mientras el LEXICON cita
> `docs/biblioteca/...`: hay **deriva de ruta** entre la cita y la miga. El **cálculo de
> forks** `⊢ ⊬ ⊘ ⥱ ⟲ ≈`, en cambio, **sí está transcrito** y disponible (en
> `papers-hiperipl/00-LEXICON.md` §C.5 y `YELLOW.md` §3.2): la *gramática* sobrevive aunque
> el *mapa fuente* no se haya migrado.

---

## 3. Issues residuales reales (lo único que sobrevive de la crítica)

### 3.1 `draft_01.ts` **NO COMPILA** — es un borrador matemático, no "garantías ejecutables"

YELLOW lo presenta como "capa de garantías", "licitud ejecutable, no interpretable",
`class Next` como "validación formal antes de ejecutar". El fichero real
(`…/NETWORK-ENGINE/draft_01.ts`) **no pasa de borrador**. Errores concretos verificados:

- `const n = new RegionNatural();` — **`RegionNatural` no existe** (la clase es `RegionN`).
- `console.log(isZFCRegion(N));` — **`N` es un tipo** (`export type N = RegionN`) usado como
  valor; no es invocable como argumento.
- `export function isZFCRegion(reg: Region): boolean {}` — **cuerpo vacío**: declara que
  devuelve `boolean` y no retorna nada.
- `export function isRQegion(reg: CtxParamsContinousR): boolean { let out=false; if (reg.seed)
  return out; }` — usa **`reg.seed`** (la interfaz `CtxParamsContinousR` no tiene `seed`),
  **no todos los caminos retornan**, y el nombre es un **typo** (`isRQegion`).
- `class ZFC` usa **`CTX_UNDEFINED`** (no definido; solo existen
  `CTX_DISCRETE_STATE_UNDEFINED`, `CTX_CONTINOUS_*`), el tipo **`ContextExternal`** (no
  definido), y **`new Next()`** — `Next` es **clase abstracta**, no instanciable.
- Dentro de `ZFC.next()`/`NONZFC.next()`: **`op.head(this.state)`** — `op` es de tipo
  `Operation`, cuya única propiedad es **`.clause`** (un `Horn`), **no `head`**.
- `HornNextContinous.tail()` hace **`c.value(c)`** — `value` es un **número**
  (`NOMON_COUNT`), no una función; llamarlo es un error de tipos en runtime.
- `export const PI = (): Irrational => 3.13;` — **valor de π incorrecto** (y `EULER => 2.7`).
- `class HornNextContinousR` declara `constructor(ctx: CtxParamsHornNextContinousQ)` —
  **`CtxParamsHornNextContinousQ` no está definido** (typo de
  `CtxParamsHornNextContinous(R)`).

**Lectura correcta:** `draft_01.ts` es el **boceto** del sustrato formal del Plan Maestro
(Nivel 6: regiones ZFC + cláusulas de Horn + clase `Next`). Su valor es **conceptual**
(NOMON, Region N/Z/Q, HC) y como **instrumento de medida** de red en la lectura 6-jun
(`NOMON == friends.hops`). **No** es, hoy, la "capa de garantías ejecutable" que pinta
YELLOW. Decidir qué será (instrumento de medida vs. capa de licitud) es `SPEC?-010` — **no
se cierra aquí**.

### 3.2 `contract-adapters` → EVM es **aspiracional** (`SPEC?`), no código

`entity-metadata.ts` implementa `fromEntityMetadata()`, que mapea **metadato de entidad
externa → `DomainContract`** y genera por defecto: recurso de colección
(`network://{plural}`), template de ítem (`network://{plural}/{id}`), prompt
(`design-{kind}`), capacidad de mutación (`persist_{kind}`), descriptor de sampling
(`critique_{kind}`) y *UI hints*. Su propio comentario lo dice: *"external metadata enters
here and becomes a Network-Engine DomainContract **before any MCP/OpenAPI/UI projection**
happens."* **Cero EVM / cero blockchain / cero on-chain** en el motor. El "seam → EVM" que
C.7/YELLOW §3.4 describen es **interpretación aspiracional** (`SPEC?-009`, ampliar a
`InitiativeMetadata`/`SupportRecord`/`ForkRecord`; `SPEC?-003`, cadena destino), no una
frontera ya construida. La pieza **es real**, pero su `READY` lo es para **proyección
contract-first**, no para anclaje on-chain.

### 3.3 Piezas no migradas que el puente da por disponibles

`future-pipeline-engine/` (el core nominal del Plan Maestro), el Cartógrafo `yo-no-soy-yo`
real (`mapa.md`/`mapa.graph.json`/"nave"), `mapa-ilustracion-2.0.md` y `EXTERNO.md` **no
están** en el workspace (§2.2). Cualquier integración que los necesite debe **decidir si se
portan desde THEIA_PATH o se reconstruyen** — es una **dependencia abierta**, no algo hecho.

### 3.4 Hallazgo nuevo (oportunidad, no defecto): colores == `simulador-voces`

Los papers usan la paleta WHITE/YELLOW/BLUE/RED/GREEN/BLACK; el `simulador-voces` ya tiene
un pack **`red-blue-white-black-pack`** con voces, *samples* y rondas. Solapan en
**RED/BLUE/WHITE/BLACK**: la deliberación entre colores de los papers **no hay que
recrearla**, se puede **reusar** el motor de voces existente (con YELLOW/GREEN como voces a
añadir). Detalle en `hiperipl-reconciliacion.md`.

---

## 4. Lo que los papers SÍ aciertan (conservado del análisis previo)

Esto seguía siendo correcto y **se mantiene íntegro**:

- El **dossier filosófico 00-05** es de calidad real y disciplina alta: el reencuadre "no es
  el atrio del Reino, es el **órgano de voz de la Ilustración 2.0**", la **degradación del
  centro vacío de Logos a neutralidad creíble** (testable, kantiana), la **objeción
  Gaia → Marcuse** (anestésico / huella material como garantía dura), el **fork como derecho
  de gracia** frente al *exit* permanente de NRx, y los **tres tribunales** (Marx, Freud,
  Marcuse). Aporte genuino y defendible (`dossier-hiperipl/00-indice.md`, `03`, `04`).
- La **disciplina `SPEC?`** está bien aplicada: cadena, token, identidad, cuórum quedan
  **ABIERTOS** y marcados, nunca decididos (REGLA DE ORO del `00-LEXICON.md`).
- El **§G del LEXICON** (conflictos de vocabulario) es honesto: detecta él mismo varias
  grietas (`time.ts` ≠ ruta real, doble "universo", doble "BOE", "voz" sobrecargada).
- La **tabla maestra de equivalencias** (§D) entre `[FIL]`/`[EXT]`/`[TEC]` es un andamiaje
  útil y, ahora que el `[TEC]` está re-anclado (ver `hiperipl-reanclaje.md`), **defendible**.
- `contract-adapters` **existe de verdad** y la correspondencia con "frontera neutral / sin
  dominio" (A.9) es legítima — solo su **destino EVM** es interpretación (§3.2).

> Diagnóstico final: **no hubo deshonestidad en los papers**, hubo **anclaje optimista** a un
> linaje real que vive parte en submódulos hermanos y parte solo en THEIA_PATH. Y hubo, en
> mi primera auditoría, un **error de alcance** que confundió "no migrado a esta subcarpeta"
> con "inexistente". Ambas cosas quedan corregidas aquí.

---

## 5. Lo que queda por hacer (entregables hermanos, no decisiones)

- **Re-anclaje fino** de cada cita `[TEC]` a su ruta real + re-graduación `READY/BUILD/MISS`:
  ver `hiperipl-reanclaje.md`.
- **Reconciliación de genealogías** (díptico 6-jun · Plan Maestro/Future Pipeline Engine ·
  future-machine 6+2 · simulador-voces · Cartógrafo) y por qué son **compatibles**: ver
  `hiperipl-reconciliacion.md`.
- **Sigue ABIERTO** (`SPEC?`, no se cierra aquí): qué es `draft_01.ts` (medida vs. licitud,
  `SPEC?-010`), el seam EVM (`SPEC?-003/009`), y si se portan o reconstruyen las piezas no
  migradas.

---

## 6. Fuentes verificadas (este workspace)

| Pieza | Ruta | Estado real |
|---|---|---|
| Sustrato formal | `…/NETWORK-ENGINE/draft_01.ts` | borrador, **no compila** |
| Seam contratos | `…/packages/contract-adapters/src/entity-metadata.ts` | READY para proyección, **no EVM** |
| Matriz concepto↔paquete | `…/INSTRUCTIONS/LAYER_1/ECOSYSTEM.md` | contract-first (sin pipeline interno 6+2) |
| Pipeline 6+2 | `DocumentMachineSDK/.github/skills/futures-engine/SKILL.md` | **MIGRADO** (repo hermano) |
| Contrato de existencia | `DocumentMachineSDK/.github/skills/engine-plan/SKILL.md` | **MIGRADO** |
| Plan maestro top-down | `…/SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md` | **EXISTE** (la 1ª auditoría erró) |
| Plan maestro bottom-up | `…/SCRIPTORIUM-CORE/STATE-MACHINE/DOCS/00_PLAN_MAESTRO.md` | **MIGRADO** |
| simulador-voces + pack | `…/SCRIPTORIUM-CATALOG-PLAYER/.github/skills/simulador-voces/` | **MIGRADO** (colores reutilizables) |
| Dosier de producto 6-jun | `…/SCRATCHPAD/SESION_06_JUNIO/` | díptico + juegos + federación |
| Cartógrafo real | `AgentLoreSDK/` presente, pero `…/yo-no-soy-yo-propositions-engine/mapa.md` | **NO MIGRADO** (solo `ref.md`) |
| `future-pipeline-engine/` | — | **NO MIGRADO** (solo en THEIA_PATH) |
| `mapa-ilustracion-2.0.md`, `EXTERNO.md` | — | **NO MIGRADO** |
