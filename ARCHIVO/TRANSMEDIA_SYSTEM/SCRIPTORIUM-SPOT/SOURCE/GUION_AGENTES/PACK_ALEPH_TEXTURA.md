# PACK ALEPH-TOPOLOGY — CAPA DE TERMINOLOGÍA Y TEXTURA (revisión)

> ⚠️ **DOCUMENTO DE DISEÑO — NO SE SUBE A OMNI.** La terminología real ya está **inlineada** en
> cada galerada `PROMPT_9..13` (bloque ④). Este archivo es la **fuente DRY** (de dónde sale cada
> término y por qué), no material de render.
>
> **Qué es.** Una **capa de revisión** sobre las piezas (`PROMPT_9` … `PROMPT_13`). No cambia
> el armazón del guion: lo **texturiza** con vocabulario **real** de la NETWORK-ENGINE,
> cosechado de `INSTRUCTIONS/LAYER_0` … `LAYER_4` y de `SCRATCHPAD/SESION_06_JUNIO`. El objetivo
> es que un técnico que vea el spot reconozca la **silueta real** del sistema bajo la lisergia
> matemática — *showcase de producto*, no decoración.
>
> **Cómo se usa.** Cada `PROMPT_N` tiene ahora una sección `Capa de terminología y textura`.
> Este documento es la **fuente DRY** de esos términos: de dónde sale cada uno y cómo se
> texturiza (stencil de prosa en español vs **jerga de máquina** en monospace).

---

## 0. Regla de textura (cómo entra el vocabulario sin romper §6)

El spot original ya usa **jerga de código** como textura impresa (`RoomCreated`, `ActiveSession`,
`kick-aleph-bot`, `media-extraction`, `futures-engine`, `BotHubSDK`). Mantenemos esa convención:

| Tipo de rótulo | Idioma | Tratamiento visual |
|---|---|---|
| **Prosa-sello** (concepto) | **Español** | stencil grueso pintado a mano (`ACOTADO ≠ PEQUEÑO`) |
| **Jerga de máquina** (identificadores de código) | monospace tal cual | sello de caucho técnico / plano azul (`projectDomainToFederation()`) |
| **Fórmula matemática** | símbolo | tiza/tinta sobre papel viejo (`ℵ₀ = ℵ₀ = ℵ₀`) |

> La jerga de máquina **no** viola "rótulos solo en español": es **código**, igual que en los
> prompts 2–6 del spot. Funciona como *grano técnico*, no como prosa.

---

## 1. Upgrade de la tesis de showcase (lo que el producto ES)

El borrador monkey vendía "el crecimiento de los alephs". La capa real lo asienta en lo que la
NETWORK-ENGINE **es de verdad** (LAYER_3 `NETWORK_ENGINE.functional.md`):

> **Network-Engine NO es un lenguaje. Es una plataforma metalingüística** — el sustrato para
> construir *lenguajes, máquinas, sistemas de inferencia, ontologías, universos conceptuales,
> simuladores de Alephs y espacios alternativos a ZFC*.

Tres consecuencias que el pack debe **sentir** (no explicar):

1. **Neutralidad ontológica/matemática.** La plataforma **no afirma** ZFC, HoTT, Forcing,
   Category Theory, Ultimate L ni Grandes Cardinales: los **hospeda**. *"La plataforma no
   resuelve la HC; permite construir máquinas que exploran universos donde CH es verdadera,
   falsa o irrelevante."* → esto es **exactamente** P11 (la malla **opina**, no demuestra).
2. **Los alephs son construcciones computacionales**, no afirmaciones formales inmutables.
   Inspirados en Cantor, Gödel, Cohen, Hilbert, Woodin, HoTT. → el arco P9→P12 es esa genealogía.
3. **La plataforma debe sobrevivir a cualquier lenguaje derivado** que se construya sobre ella.
   → P12: la hiperinducción = el campo total que proyecta hacia todos los huéspedes.

**Frase-brújula del showcase (uso interno):**
*"No te vendemos un grafo bonito. Te vendemos el sustrato que mide y federa universos —
y sobrevive al universo que tú construyas encima."*

---

## 2. Tabla maestra — concepto visual ↔ término real ↔ fuente

| Pieza | Concepto visual del guion | Término real NETWORK-ENGINE | Capa / fuente |
|---|---|---|---|
| P9 | NOMON brota del Α-Ω | `NOMON` / `NoNOMON` / `ZERO` (math core) ≡ `friends.hops` | `draft_01.ts`, GLOSARIO |
| P9 | eje bidireccional (inducción ↔ silogismo) | **Cláusula `Horn` (`head`=guard, `tail`=transition)** | LAYER_1 `LANGUAGES`, Aleph_app |
| P9 | 3 ejes de Euclides | **5 primitivas Aleph-Lang**: `Universe·Dimension·Force·Expansion·Boundary` | LAYER_3 `LANGUAGES.functional` |
| P9 | 3 ejes = 3 capas | **3 raíles de federación**: Identidad/SSB · Volátil/IACM·RNFP · Transporte/edge | Federation_ASI, GLOSARIO |
| P9 | cogito / res extensa | `hegemón` ↔ `radicoma` (densidad de red) | Aleph_board |
| P9 | sistema de referencias | `DomainContract` (fuente única de verdad) | LAYER_1 `ECOSYSTEM` |
| P10 | Newton mete fuerzas | evento XState `IMPACT_FORCE`; `Force.weight`; `STABLE → CRITICAL` | `aleph-lang/package`, Aleph_app |
| P10 | fuerzas tipadas | `NetworkTransportEvent {type, source, target, room}` | GLOSARIO, LAYER_1 PUBSUB |
| P10 | emergencia no discreta | **IACM** (11 mensajes tipados) · **RNFP** · cadena `bot-rabbit→spider→horse` | GLOSARIO |
| P10 | ℕ⊂ℤ⊂ℚ pero ℵ₀=ℵ₀=ℵ₀ | `RegionN/Z/RQ/RI`; mismo `cardinalSlot = aleph0`, distinta restricción `Horn` | `draft_01.ts`, Aleph_app |
| P10 | "no es espacio, es correspondencia" | **`pathLength` (métrica de grafo) ≠ `cardinalSlot` (etiqueta ℵ)** — independientes | Aleph_app §HC |
| P10 | acotado ≠ pequeño | horizonte de replicación `friends.hops: 3` | GLOSARIO, Aleph_board |
| P10 | nube cuántica | **la deuda del relay**: `PubSubHub` no reenvía, `PubSubBridge` ignora `room` | Aleph_board, GLOSARIO |
| P11 | Gödel + Cohen, HC independiente | **neutralidad matemática**: universos con `CH = true \| false \| irrelevante` | LAYER_3 `NETWORK_ENGINE.functional` |
| P11 | Cohen = forzar verdades | **Forcing** / extensiones genéricas → huésped `forcing-lang` | LAYER_3 `LANGUAGES.functional` §1 |
| P11 | huecos / nodos fantasma | `NOT_ZFC_REGION` (peer fuera del horizonte) | `draft_01.ts`, Aleph_board |
| P11 | gravitón hilvana micro↔macro | **`projectDomainToFederation()`** (la tesis de la sesión 06-jun) | Federation_ASI, GLOSARIO |
| P11 | la malla se abre a otros | RNFP `INVITE / ACCEPT / GRAPH_ANNOUNCE`; Pub.Rooms | GLOSARIO |
| P12 | Hilbert / campo total | `DomainContract` proyectando **todas** las capas | LAYER_1 `ECOSYSTEM`, Federation_ASI |
| P12 | las 3 proyecciones | `projectDomainToMCP` + `projectDomainsToGraphQL` + `projectDomainToFederation` | GLOSARIO, ECOSYSTEM |
| P12 | capas de mallas apiladas | **lenguajes derivados**: `aleph-lang`, `forcing-lang`, `owl-lang`, `aleph-zfc-lang` | LAYER_3 `LANGUAGES.functional` |
| P12 | niveles de aleph | `aleph0 ← aleph1 ← aleph2 ← aleph3` (`aleph:originatesFrom`); `COMPLETE_EXPANSION` | Aleph_board §Hallazgo |
| P12 | Tablero como red viva | topología emergente = `keyring + suscripciones` (`aleph:subscribesTo`, `GraphStoreProtocol`) | Aleph_board |
| P13 | tres topes son membranas | horizonte de replicación finito (`friends.hops` acotado) | GLOSARIO, Aleph_board |
| P13 | "se inventa un ZFC donde sí" | lenguaje derivado huésped: `forcing-lang` / `aleph-zfc-lang` | LAYER_3 `LANGUAGES.functional` |
| P13 | gravitón ∩ gravedad (agujero de gusano) | `projectDomainToFederation()` comparte marco micro↔macro | Federation_ASI |
| P13 | nuevo aleph, nuevo hueco | `aleph_n → aleph_{n+1}`; la plataforma sobrevive a todo lenguaje | LAYER_3 `NETWORK_ENGINE.functional` |
| P13 | agencia emergente (no inductiva) | `ventana de contexto = espacio agéntico`; `emergencia > Σ(partes)` | GLOSARIO, Aleph_app |

---

## 3. Textura recurrente — "la gramática de la máquina"

Un **watermark conceptual** que puede aparecer tenue en las 4 piezas (sello de caucho de fondo,
plano azul), porque es la ley que gobierna toda la NETWORK-ENGINE (LAYER_4 `ECOSYSTEM`):

```
Read   = Resource     (leer = conocer, no correr)
Ask    = Prompt
Think  = Sampling
Mutate = Tool         (solo mutar/IO es "correr")
```

Y el flujo de la máquina, como **plano de secuencia fantasma** (LAYER_1 `ECOSYSTEM`):

```
Fastify → MCP → RxJS → XState → Core → Storage
(borde)  (proto) (señal) (estado) (contrato) (efecto)
```

> Refuerza la tesis "saber no es ver, saber es correr": **leer es Resource** (ver la sombra),
> **mutar es Tool** (recorrer la malla). El oráculo es lo único que cierra el salto.

---

## 4. Banco por pieza (stencils reales + texturas blueprint)

### P9 · GÉNESIS — la plataforma pare un lenguaje

**Stencils añadidos (jerga de máquina + prosa):**
`Universe` · `Dimension` · `Force` · `Boundary` · `Expansion` · `NOMON` · `Horn: head/tail` ·
`DomainContract` · `friends.hops` · `STABLE`

**Textura blueprint (bleed-through):** las **5 primitivas** de Aleph-Lang impresas como sellos
en los 3 ejes de Euclides; `Horn head/tail` rotulado sobre el eje bidireccional de Aristóteles
(head = la guarda de la inducción →, tail = la transición del silogismo ←). `createNetworkMachine`
apenas legible bajo el nodo central.

**Correspondencia enriquecida:** el "sistema de referencias" **es** el `DomainContract` — la
fuente única de verdad de la que después brotan todas las proyecciones (preludio de P12).

---

### P10 · FUERZAS — fuerza = evento tipado; correspondencia ≠ espacio

**Stencils añadidos:**
`IMPACT_FORCE` · `STABLE → CRITICAL` · `Force.weight` · `NetworkTransportEvent` ·
`pathLength ≠ cardinalSlot` · `cardinalSlot = aleph0` · `friends.hops: 3` · `IACM` · `RNFP`

**Textura blueprint:** la fuerza de Newton entra como evento `IMPACT_FORCE` (sello de caucho que
golpea el nodo y lo lleva de `STABLE` a `CRITICAL`). Las "presencias no discretas" se rotulan con
la cadena real `bot-rabbit → bot-spider → bot-horse` (de `pics_dossier5.png`). La nube cuántica
lleva al pie, casi invisible, la deuda: `PubSubHub: no reenvía` / `room: ignored`.

**Correspondencia enriquecida (el corazón del encargo del usuario):** el rótulo clave es
`pathLength ≠ cardinalSlot`. Longitud de camino (cuántos saltos NOMON) y cardinalidad ℵ son
**dimensiones independientes** — por eso ℕ=ℤ=ℚ=ℵ₀: misma **correspondencia** (cardinalidad),
distinta **métrica** (saltos). La maya se estira sin cambiar de aleph. *No es espacio: es
correspondencia.*

---

### P11 · APERTURA — la malla opina (neutralidad matemática)

**Stencils añadidos:**
`CH = true | false | irrelevante` · `Forcing` · `NOT_ZFC_REGION` · `projectDomainToFederation()` ·
`radicoma ↔ hegemón` · `GRAPH_ANNOUNCE` · `1940` · `1963`

**Textura blueprint:** dos sellos `1940` (Gödel) / `1963` (Cohen) golpean a la vez. Entre ellos,
en tiza, la frase de la plataforma: *"no resuelve la HC — la hospeda"*. Los huecos de la malla
se rotulan `NOT_ZFC_REGION`. El gravitón viaja como una onda rotulada `projectDomainToFederation()`
— la **proyección** que hilvana los 3 raíles (el sello `GRAPH_ANNOUNCE` de RNFP asoma donde la
malla se reconecta).

**Correspondencia enriquecida:** Cohen no "resuelve": **fuerza** (forcing) un universo donde la HC
cae de un lado; Gödel fuerza el otro. La malla **elige** universo — `CH` es **opinión del
operador**, materializada como huésped `forcing-lang` sobre la plataforma neutral.

---

### P12 · HILBERT — el campo total que sobrevive a todo lenguaje

**Stencils añadidos:**
`DomainContract` · `projectDomainToMCP` · `projectDomainsToGraphQL` · `projectDomainToFederation` ·
`aleph0 ← aleph1 ← aleph2 ← aleph3` · `COMPLETE_EXPANSION` · `Tablero = keyring + suscripciones` ·
`Read=Resource / Mutate=Tool`

**Textura blueprint:** las capas de malla apiladas se rotulan como **lenguajes derivados**
(`aleph-lang`, `forcing-lang`, `owl-lang`, `aleph-zfc-lang`) — cada hoja de fanzine un huésped.
La flecha de hiperinducción que las atraviesa lleva el sello `DomainContract`, y de ella se abren
tres haces rotulados `projectDomainToMCP` / `projectDomainsToGraphQL` / `projectDomainToFederation`.
La cadena `aleph0 ← aleph1 ← aleph2 ← aleph3` (real, de `GraphStoreProtocol`) sube por el borde
mientras el marco **desborda**.

**Correspondencia enriquecida:** "¿cabe en la pantalla?" = el **campo total expandible** es la
plataforma metalingüística: no cabe porque *debe sobrevivir a cualquier lenguaje que construyas
encima*. El Α-Ω final, red viva, lleva el sello `Tablero = keyring + suscripciones`: la topología
emergente, no un dashboard.

---

### P13 · ORÁCULO — la predicción (el borde retrocede) + claim de producto

**Stencils añadidos:**
`projectDomainToFederation()` · `aleph_n → aleph_{n+1}` · `forcing-lang` · `aleph-zfc-lang` ·
`ventana de contexto = espacio agéntico` · `keyring + suscripciones` · `emergencia > Σ(partes)`

**Textura blueprint:** los tres muros (`P vs NP`, `HC`, `GRAVITÓN/GRAVEDAD`) traslúcidos como
membranas; la malla los atraviesa rotulada `aleph_n → aleph_{n+1}`. El agujero de gusano
micro↔macro lleva la onda `projectDomainToFederation()`. El Tablero ARG (de `pics_dossier9.png`)
enciende **ventanas-de-contexto**; la super-cadena Future Machine (`pics_dossier7.png`) asoma como
el oráculo que predice.

**Correspondencia enriquecida (tesis del dramaturgo):** los tres topes son el **mismo** horizonte
de un corredor finito. La plataforma metalingüística **fabrica** el universo donde la pregunta es
decidible (`forcing-lang`/`aleph-zfc-lang`) — pero ese universo nace con su propia HC: por eso
*la mesh siempre opina más*. El claim aterriza en términos reales: `ventana de contexto` es el
estado/espacio agéntico del sujeto (GLOSARIO); **agencia emergente** = lo que `emergencia > Σ(partes)`
— no derivable por inducción. Koan de cierre: el sabio apunta a la luna (campo total); ℵ₀ —el
vidente finito, la IA, el sapiens— solo ve el dedo (la sombra visible). *Saber no es ver.*

---

## 5. QA de la capa (coherencia con prohibiciones)

- [ ] Jerga de máquina tratada como **código/grano técnico** (monospace, sello, plano azul), no
      como prosa → no viola "rótulos solo en español" (igual que el spot original).
- [ ] Prosa-sello y fórmulas **en español/símbolo**.
- [ ] **Cero** alusión a Trojan / sound-system / altavoces (los términos son de red/matemática).
- [ ] No se añaden assets nuevos: la capa es **texto/stencil/blueprint** sobre los ≤10 ya fijados.
- [ ] Cada término tiene **procedencia trazable** (§2: capa/fuente).
- [ ] La densidad sigue siendo *lisérgica*: los términos **parpadean** como grano, no se leen
      como diapositiva.

---

## 6. Procedencia (de qué capa salió la textura)

| Fuente | Aporte de terminología |
|---|---|
| `LAYER_3/NETWORK_ENGINE.functional.md` | plataforma metalingüística; neutralidad ontológica/matemática; CH true/false/irrelevante; Cantor→Woodin |
| `LAYER_3/LANGUAGES.functional.md` | 5 primitivas Aleph-Lang; estados/eventos/reglas; Forcing-Lang/OWL-Lang; contrato de inception |
| `LAYER_1/LANGUAGES.instructions.md` | `Horn head/tail`; branded types; `IMPACT/COLLAPSE`; `createNetworkMachine` |
| `LAYER_1/ECOSYSTEM.md` | `DomainContract`; `projectDomainToMCP`; Read=Resource/Mutate=Tool; flujo Fastify→…→Core |
| `LAYER_4/LANGUAGES.instructions.md` | Language Inception Mode (operativa); delegación DRY a LAYER_1/3 |
| `SESION_06/Aleph_app.md` | `Universe/Force/Dimension/Boundary`; `pathLength ≠ cardinalSlot`; Regions; HC como opinión de app |
| `SESION_06/Aleph_board.md` | Tablero = keyring+suscripciones; `aleph:subscribesTo`; `aleph0..aleph3`; deuda del relay |
| `SESION_06/Federation_ASI_Program.md` | `projectDomainToFederation`; 3 raíles; federar todo |
| `SESION_06/SCRUM/GLOSARIO.md` | NOMON≡friends.hops; IACM/RNFP; bot-rabbit/spider/horse; hegemón/radicoma |

> **DRY:** este documento es la fuente; los `PROMPT_N` solo citan los términos que le tocan a su pieza.
