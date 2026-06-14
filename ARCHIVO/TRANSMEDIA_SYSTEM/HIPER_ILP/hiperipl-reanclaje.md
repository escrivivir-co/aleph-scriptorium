# HiperIPL — Re-anclaje de citas `[TEC]` a rutas reales del workspace

> **Qué es esto.** Tabla de procedencia que toma cada ruta `[TEC]` citada por
> `papers-hiperipl/00-LEXICON.md` (apéndice "índice de fuentes de verdad citadas" y entradas
> §C) y por los papers de colores, y la **re-ancla** a su ruta real en este workspace
> federado — o la marca **NO MIGRADO (solo en THEIA_PATH)**. Añade una columna de
> **re-graduación** `READY/BUILD/MISS`.
>
> **Por qué.** El LEXICON cita las fuentes con prefijo del Mac
> (`/Users/morente/Desktop/THEIA_PATH/NUEVA_BASE/SCRIPTORIUM/ALEPH/...`). La 1ª auditoría leyó
> ese prefijo como "máquina ajena" y degradó las piezas a `EXTERNO`. La realidad: el
> workspace `aleph-scriptorium` es una **migración parcial** de ese árbol; **la mayoría de
> esas piezas existen aquí** en submódulos hermanos. Esta tabla lo fija sin inventar.
>
> **Registro:** español, denso. Rutas relativas a la raíz `aleph-scriptorium/`. Único set de
> operadores permitidos: `⊢ ⊬ ⊘ ⥱ ⟲ ≈`.

---

## Contrato de existencia usado (de `engine-plan`, re-encuadrado)

`engine-plan/SKILL.md` (§ C.10 del LEXICON) define el contrato `READY/BUILD/MISS`. Aquí se
aplica **a las fuentes de verdad citadas**, con esta lectura operativa:

- **`READY`** — la pieza **existe y está especificada** en el workspace (fichero presente y
  utilizable como fuente de verdad).
- **`BUILD`** — hay **dossier/plan/boceto** pero **no implementación funcional** (existe pero
  no "corre" / no cumple lo que la cita le atribuye).
- **`MISS`** — **ni uno ni otro**: no migrada (solo puntero a THEIA_PATH) o inexistente aquí.

> Nota: estos `READY/BUILD/MISS` son del **estado de migración/existencia de la fuente**, no
> un juicio sobre la calidad conceptual del paper que la cita.

---

## A. Apéndice del LEXICON — "índice de fuentes de verdad citadas"

| # | Pieza (cita LEXICON) | Ruta citada (origen Mac) | Ruta REAL en el workspace | Grado |
|---|---|---|---|---|
| 1 | Mapa filosófico | `/Users/morente/Desktop/carpeta sin título 7/mapa-ilustracion-2.0.md` | **NO MIGRADO** | `MISS` |
| 2 | Dossier HiperIPL (00–05) | `/Users/morente/Desktop/carpeta sin título 7/dossier-hiperipl/00..05` | `ARCHIVO/TRANSMEDIA_SYSTEM/dossier-hiperipl/00..05` | `READY` |
| 3 | Conversación de origen | `/Users/morente/Desktop/carpeta sin título 7/EXTERNO.md` | **NO MIGRADO** | `MISS` |
| 4 | future-engine (skill) | `…/ALEPH/DocumentMachineSDK/.github/skills/futures-engine/SKILL.md` | `DocumentMachineSDK/.github/skills/futures-engine/SKILL.md` | `READY` |
| 5 | engine-plan (skill) | `…/ALEPH/DocumentMachineSDK/.github/skills/engine-plan/SKILL.md` | `DocumentMachineSDK/.github/skills/engine-plan/SKILL.md` | `READY` |
| 6 | Cartografía / forks (`mapa.md`) | `…/ALEPH/AgentLoreSDK/docs/biblioteca/yo-no-soy-yo-propositions-engine/mapa.md` | **NO MIGRADO** — solo puntero `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/SCRIPTORIUM-CATALOG-PLAYER/temas/yo-no-soy-yo-proposition-engine/ref.md` | `MISS` |
| 7 | Nodo azul / Nave | `…/ALEPH/DocumentMachineSDK/docs/azul/` | `DocumentMachineSDK/docs/azul/cuadernos/liria_rojipardismo_{2d,3d,clusters}.html` | `BUILD` |
| 8 | Registry de plugins | `…/ALEPH/.github_V1/plugins/registry.json` | `.github_V1/plugins/registry.json` | `READY` |
| 9 | contract-adapters | `…/ALEPH/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages/contract-adapters/` | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages/contract-adapters/src/entity-metadata.ts` | `READY`¹ |
| 10 | NETWORK-ENGINE README | `…/SCRIPTORIUM-CORE/NETWORK-ENGINE/README.md` | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/README.md` | `READY` |
| 11 | Sustrato formal (`time.ts`) | `…/SCRIPTORIUM-CORE/NETWORK-ENGINE/draft_01.ts` | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/draft_01.ts` | `BUILD`² |
| 12 | ScriptoriumVps | `…/ALEPH/ScriptoriumVps/README-SCRIPTORIUM.md` | `ScriptoriumVps/README-SCRIPTORIUM.md` | `READY` |

¹ `READY` **para proyección contract-first** (`fromEntityMetadata()` → `DomainContract` →
MCP/OpenAPI/UI). El *seam → EVM* que la cita le atribuye es `BUILD/SPEC?` (ver fila E-3).
² Existe pero **no compila**: es boceto del sustrato formal, no la "capa de garantías
ejecutable". Detalle en `auditoria-hiperipl.md` §3.1.

---

## B. Rutas `[TEC]` adicionales citadas en entradas §C y en los papers

| # | Pieza (entrada/paper) | Ruta citada / referencia | Ruta REAL en el workspace | Grado |
|---|---|---|---|---|
| B1 | Eigenstates E1–E11 / T1–T12 (C.4) | `…/yo-no-soy-yo-propositions-engine/mapa.md` | **NO MIGRADO** (mismo que A-6) | `MISS` |
| B2 | Cálculo de forks `⊢⊬⊘⥱⟲≈` (C.5) | `…/yo-no-soy-yo-propositions-engine/mapa.md §2` | **transcrito** en `papers-hiperipl/00-LEXICON.md §C.5` y `YELLOW.md §3.2` | `READY`³ |
| B3 | Cuadernos azul (C.9) | `…/DocumentMachineSDK/docs/azul/` (`liria_rojipardismo_2d/3d/clusters.html`) | `DocumentMachineSDK/docs/azul/cuadernos/liria_rojipardismo_{2d,3d,clusters}.html` | `READY` |
| B4 | "thread-eigenstate-viewer" / Nave (C.9) | `mapa.md §0 ("Planos de la nave")` | **NO MIGRADO** como componente (solo los cuadernos azul, B3) | `BUILD` |
| B5 | BOE / plugin `network` (C.6) | `registry.json` (plugin `network`, agente `BOE`) | `.github_V1/plugins/registry.json` | `BUILD`⁴ |
| B6 | Oasis / SSB (C.11) | `registry.json` (plugin `network`); `ScriptoriumVps/README-SCRIPTORIUM.md` | `BlockchainComPort/` + `ScriptoriumVps/` (+ `README-SCRIPTORIUM.md`) | `READY`⁵ |
| B7 | ECOIN / token (C.12) | `ScriptoriumVps/README-SCRIPTORIUM.md` (BlockchainComPort) | `BlockchainComPort/` (submódulo presente) | `BUILD`⁶ |
| B8 | Plan maestro tablero (YELLOW §2, §6) | `SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md §6–§7` | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md` | `READY`⁷ |
| B9 | `prolog-editor` (YELLOW §2, §5) | `registry.json → prolog-editor` (SWI-Prolog) | `PrologEditor/` (submódulo presente) | `BUILD` |
| B10 | `mapa.graph.json` (YELLOW §2, §5) | `AgentLoreSDK/.../mapa.graph.json` | **NO MIGRADO** | `MISS` |
| B11 | Future Pipeline Engine (núcleo del Plan Maestro) | `ALEPH/ARCHIVO/future-pipeline-engine/{index.md,dossier.md}` | **NO MIGRADO** (0 ficheros) | `MISS`⁸ |
| B12 | media-extraction / WiringEditor (Plan Maestro §4–§5) | skills `DocumentMachineSDK`; `WiringEditor/` | `DocumentMachineSDK/.github/skills/` + `WiringEditor/README-SCRIPTORIUM.md` | `BUILD` |

³ El *mapa fuente* es `MISS`, pero la **gramática de forks** (la tabla de los seis operadores)
está **literalmente transcrita** en los papers, por lo que como vocabulario operativo es
`READY`. La cognación `≈`, la secesión `⊬` y la guerra de distros `⟲` quedan utilizables.
⁴ El `registry.json` existe (`READY`), pero el **artefacto BOE sincronizado por Oasis** que
describe es funcionalidad planificada, no corriendo en NETWORK-ENGINE → `BUILD`.
⁵ Submódulos de federación presentes; el `Federation_ASI_Program.md` los trata como
**servicios externos a consumir** (decisión PO "federar todo", F6). La infraestructura
existe; la **proyección** `projectDomainToFederation()` es `BUILD`.
⁶ `BlockchainComPort/` presente como submódulo; ECOIN como **token concreto** es `SPEC?-012`
(una-persona-una-voz vs token-voto), no decidido → `BUILD`.
⁷ La 1ª auditoría lo marcó "no existe": **error**. Existe y la cita de YELLOW §6 es legítima.
⁸ Pieza **clave** no migrada: es el core que el `01_PLAN_MAESTRO_TOPDOWN.md` toma como
fuente (`ARCHIVO/future-pipeline-engine/index.md`, `dossier.md`). Sin él, el Plan Maestro
top-down referencia un núcleo cuyo detalle vive solo en THEIA_PATH.

---

## C. Etiquetas `[FIL]`/`[EXT]` con fuente migrable (contexto, no `[TEC]`)

| Pieza | Etiqueta | Ruta REAL | Grado |
|---|---|---|---|
| `dossier-hiperipl/00..05` | `[FIL]` | `ARCHIVO/TRANSMEDIA_SYSTEM/dossier-hiperipl/` | `READY` |
| `mapa-ilustracion-2.0.md` | `[FIL]` | **NO MIGRADO** | `MISS` |
| `EXTERNO.md` | `[EXT]` | **NO MIGRADO** | `MISS` |

---

## D. Resumen de re-graduación

| Grado | Recuento | Piezas |
|---|---|---|
| `READY` | 10 | dossier-hiperipl, futures-engine, engine-plan, registry.json, cuadernos azul (B3), contract-adapters (proyección), NE README, ScriptoriumVps, forks transcritos (B2), Oasis/SSB (submódulos), plan maestro top-down |
| `BUILD` | 9 | nodo azul/Nave (A7/B4), draft_01.ts, BOE (B5), ECOIN (B7), prolog-editor (B9), media-extraction/WiringEditor (B12), seam EVM de contract-adapters (E-3, abajo) |
| `MISS` | 7 | mapa-ilustracion-2.0.md, EXTERNO.md, Cartógrafo `mapa.md` (A6/B1), `mapa.graph.json` (B10), future-pipeline-engine (B11) |

> (El recuento agrupa entradas duplicadas entre apéndice A y §C; las cifras son orientativas,
> no normativas.)

### E. Issues residuales que el re-anclaje NO resuelve (siguen `SPEC?`)

| ID | Issue | Naturaleza |
|---|---|---|
| E-1 | `draft_01.ts` no compila (`new RegionNatural()`, `isZFCRegion(){}`, `new Next()` abstracta, `c.value(c)`, `PI=3.13`, typo `CtxParamsHornNextContinousQ`) | `BUILD` — boceto, no motor (`SPEC?-010`) |
| E-2 | `future-pipeline-engine`, Cartógrafo real, `mapa-ilustracion-2.0.md`, `EXTERNO.md` no migrados | dependencia abierta: portar vs reconstruir |
| E-3 | `contract-adapters` "seam → EVM": el código hace `metadata → DomainContract → MCP/OpenAPI/UI`, **cero EVM** | `SPEC?-003/009` — aspiracional |
| E-4 | Deriva de ruta del Cartógrafo: LEXICON cita `docs/biblioteca/...`; `ref.md` apunta a `docs/parking/...` | inconsistencia de cita a resolver al portar |

---

## F. Conclusión

Tras el re-anclaje, **el grueso del `[TEC]` deja de ser "EXTERNO"**: es **`READY`/`BUILD`
local** (en NETWORK-ENGINE o en submódulos hermanos). Solo **siete** piezas son `MISS`
genuino (no migradas desde THEIA_PATH), y de ellas la crítica es `future-pipeline-engine`
(núcleo nominal del Plan Maestro) y el **Cartógrafo real** (cuyo *cálculo de forks*, sin
embargo, sobrevive transcrito). El puente del LEXICON, una vez corregido el prefijo de ruta,
**se sostiene**.
