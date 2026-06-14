---
doc: 00-LEXICON
rol: keystone — vocabulario canónico de los papers de colores
status: DRAFT
decisiones: ABIERTAS
dispositivo: "HiperIPL / HiperILP — pendiente de fijar"
importan: [WHITE, YELLOW, BLUE, RED, GREEN, BLACK]
---

# 00 — LÉXICON: el vocabulario canónico

> **Keystone.** Este fichero fija el vocabulario que los seis papers de colores
> importan sin renegociar. Puentea **tres léxicos** que hasta ahora hablaban por
> separado del mismo objeto: el filosófico-político, el de la conversación de
> origen (la hiperplaza) y el técnico (el Scriptorium / future-machine).

---

## REGLA DE ORO (de obligado cumplimiento en todos los papers)

1. **No se toma ninguna decisión de diseño.** Solo se fija lo que el ecosistema
   ya especifica en fuentes de verdad reales (rutas citadas). Todo lo demás se
   documenta como **decisión abierta** con la marca `SPEC?` del léxico de
   `engine-plan` (`/Users/morente/Desktop/THEIA_PATH/NUEVA_BASE/SCRIPTORIUM/ALEPH/DocumentMachineSDK/.github/skills/engine-plan/SKILL.md`):
   se exponen opciones, **no se elige**.
2. **El producto principal es el vocabulario**, no las conclusiones. Cada paper
   importa este léxico y añade el de su color; no redefine lo ya fijado aquí.
3. **Anclaje L2-first sin sobrecompromiso.** Se escribe el vocabulario de
   anclaje a Ethereum (contract-adapters, attestations, account abstraction,
   on-chain vs Oasis/SSB) y se dejan **ABIERTAS y documentadas** —nunca
   tomadas— las elecciones concretas: cadena, token, identidad, sistema de
   pruebas.
4. **No inventar.** Si una pieza técnica no existe o no está especificada, se
   dice y se marca `SPEC?` / `gap`. Las rutas se citan tal cual.
5. **Nombre del dispositivo:** **HiperIPL / HiperILP — pendiente de fijar**
   (decisión abierta; ver §E).

---

## Cómo leer este léxico

- Cada entrada lleva una etiqueta de **procedencia**:
  - **[FIL]** — léxico filosófico-político: `mapa-ilustracion-2.0.md` +
    `dossier-hiperipl/`.
  - **[EXT]** — léxico de la conversación de origen: `EXTERNO.md` (la
    hiperplaza, las dos vías, Gaia, la Asamblea Eclesia).
  - **[TEC]** — léxico técnico del Scriptorium / future-machine (fuentes de
    verdad reales en `THEIA_PATH/.../ALEPH/`).
- El símbolo **↔** marca la **correspondencia** con los otros dos léxicos
  (puente). Cuando un término no tiene homólogo en un léxico, se marca `—`.
- La tesis-puente del dossier (plan aprobado): **HiperIPL deja de ser "una
  blockchain de voz" y se vuelve un caso de uso de la future-machine, diseñado
  desde el nodo azul.** Las correspondencias de abajo son el andamiaje de esa
  tesis.

---

## §A. Léxico filosófico-político [FIL]

### A.1 Centro vacío
**[FIL][EXT]** El centro de la arquitectura de la voz que **nadie puede ocupar**
(ni rey, ni sacerdote, ni dev, ni *staker*, ni Estado). En `EXTERNO` se formula
en clave teológica (la Asamblea Eclesia, el Logos que circula); el
`dossier-hiperipl/03` lo **degrada de Logos a mecanismo**: una regla que no
favorece a ninguna parte nombrable, auditable por cualquiera = **neutralidad
creíble** (A.9).
↔ **[EXT]** Asamblea Eclesia / "ni judío ni griego" (B.5).
↔ **[TEC]** la regla de no-captura del grafo: un **eigenstate** sin dueño; en
operativa, la **neutralidad del protocolo de anclaje** (contract-adapters como
frontera sin lógica de dominio, C.7).
Fuente: `dossier-hiperipl/03-el-centro-vacio.md`; `EXTERNO.md` §2-3.

### A.2 Voz vs. mando
**[FIL]** El eje político real (no "tecnología sí/no"): **voz** = la asamblea, la
palabra que circula entre iguales; **mando** = el castillo, el CEO-monarca, la
palabra que solo desciende. Toda arquitectura se sitúa en este eje.
↔ **[EXT]** las cuatro arquitecturas de la voz (zigurat/templo/parlamento/plaza)
como posiciones en el eje (B.2).
↔ **[TEC]** el **grafo de eigenstates** rojo / negro / rojo-negro (C.4) hecho
campo navegable: voz/mando cartografiado.
Fuente: `mapa-ilustracion-2.0.md` §7; `dossier-hiperipl/02`.

### A.3 Los tres tribunales (Marx, Freud, Marcuse)
**[FIL]** Las tres objeciones que toda Ilustración 2.0 debe pasar, no solo
derrotar a NRx: **Marx** (¿quién posee la infraestructura?), **Freud** (¿qué se
reprime para que el orden funcione?), **Marcuse** (¿qué sujeto produce?).
↔ **[EXT]** la objeción **Gaia** converge con Marcuse (el "anestésico", B.4).
↔ **[TEC]** sin homólogo directo; se instrumentan como criterios de auditoría de
cualquier `universo` (C.3) o decisión `SPEC?` (C.10). `—` formal.
Fuente: `mapa-ilustracion-2.0.md` §1; `dossier-hiperipl/04` §1.

### A.4 Fork como derecho de gracia
**[FIL]** El fork (bifurcación del protocolo/cadena) leído como **derecho de
revolución/gracia**: cuando la regla se vuelve injusta, la comunidad la enmienda
sin pedir permiso al soberano. Precedente: el fork de The DAO (2016) como momento
constitucional de Ethereum. Advertencia del dossier: fork como gracia, **no**
como huida permanente (si no, es el *patchwork* de NRx).
↔ **[EXT]** "la iniciativa puede forkear y fundar su propia distro sin pedir
permiso" (Core/distros, B.3).
↔ **[TEC]** el **cálculo de forks** del Cartógrafo `⊢ ⊬ ⊘ ⥱ ⟲ ≈` (C.5), que
formaliza qué tipo de fork es cada uno; `⊬` = secesión, `⟲` = fork-vs-fork.
Fuente: `mapa-ilustracion-2.0.md` §3, §10; `dossier-hiperipl/04` §4.

### A.5 Las dos cancelaciones
**[FIL]** La estructura de relevos del marco de derecho: el **teólogo** cancelado
por el **filósofo** (Ilustración 1.0, 1789); y la disputa actual por la tercera
cancelación (¿el ingeniero? ¿el capital? ¿la máquina? — o una Ilustración 2.0).
↔ **[EXT]** del zigurat/templo (orden teológico) a la plaza/hiperplaza (B.2).
↔ **[TEC]** una cancelación **es** un fork con cita verificable: el `⊬`
("yo-no-soy-yo") y el `⊘` (póstumo) del cálculo de forks (C.5). La "máquina de
genealogía de forks" del Cartógrafo formaliza las cancelaciones.
Fuente: `mapa-ilustracion-2.0.md` §0.

### A.6 Ilustración 2.0
**[FIL]** Hipótesis de que proyectos tipo Ethereum son un **rediseño del marco de
derecho** (no un gadget): repiten el gesto ilustrado —investir al humano de un
avatar normativo— con herramientas nuevas. Diagnóstico clave: **buena carta de
derechos (garantías negativas), mal parlamento (instituciones de voz)**; HiperIPL
es el intento de construir esa pieza que falta.
↔ **[EXT]** la hiperplaza como capa de voz que falta (B.3).
↔ **[TEC]** la future-machine como infraestructura de deliberación reutilizable
(C.1-C.3): el "parlamento" que falta, como grafo persistido.
Fuente: `mapa-ilustracion-2.0.md` §5; `dossier-hiperipl/01`.

### A.7 Las tres hipótesis
**[FIL]** Tres lecturas de qué está pasando: **A. neofeudalismo** (las ballenas
como señores; staking = diezmo); **B. Ilustración 2.0** (la garantía irrevocable
como palanca); **C. desierto de lo real** (el simulacro; el "anestésico"). HiperIPL
no es ninguna por naturaleza: **el diseño decide cuál**.
↔ **[EXT]** A ≈ "parásito informacional" / nueva aristocracia técnica; C ≈
"anestésico" que desmoviliza (Gaia, B.4).
↔ **[TEC]** son **ramas** (arcos con plausibilidad) sobre el mismo grafo: el
`universo` (C.3) modela las tres como escenarios bifurcados con peso
`alta/media/baja`.
Fuente: `mapa-ilustracion-2.0.md` §8; `dossier-hiperipl/04` §3.

### A.8 Exit-to-community
**[FIL]** La garantía constitucional que Vitalik exige a Balaji: el *exit* (salir,
forkear) debe acompañarse de *voice* y de una transferencia de poder **hacia la
comunidad**; *exit* sin *voice* no estabiliza nada y degenera en señoríos.
↔ **[EXT]** Core común + distros forkables, pero con maduración hacia la comuna,
no hacia mil reyes pequeños (B.3).
↔ **[TEC]** la red **Oasis/SSB** (C.11) como sustrato de federación P2P sin
servidor central; el `⊬`/`⟲` (C.5) como gramática de la secesión disciplinada.
Fuente: `mapa-ilustracion-2.0.md` §4; `dossier-hiperipl/04` §4.

### A.9 Neutralidad creíble (*credible neutrality*)
**[FIL]** El criterio que traduce el centro vacío a mecanismo: una regla es
neutral si **no favorece a ninguna parte nombrable** y su vacuidad es
**verificable por cualquiera** (principio kantiano de publicidad). Es testable;
el "Espíritu que sopla donde quiere" no lo era.
↔ **[EXT]** el centro vacío de la Eclesia, traducido (B.5 → A.1).
↔ **[TEC]** el código abierto y auditable; la frontera de **contract-adapters**
que "no implementa dominio" (C.7), la regla `NOT_ZFC_REGION` del sustrato formal
como ejemplo de límite no interpretable (C.8).
Fuente: `dossier-hiperipl/03` §1; `mapa-ilustracion-2.0.md` §9.

### A.10 Capa de garantías vs. capa de fines
**[FIL]** La regla de capas: lo **analítico** (derechos de mínimos: no censura,
no confiscación, no identificación, límite ecológico) debe ser **ejecutable sin
interpretación** ("código para el singular"); lo **continental** (qué vida
queremos, qué se financia, cuándo se bifurca) **se delibera, no se computa**
("palabra para el universal"). *El código garantiza que el centro esté vacío; la
palabra decide qué entra — nunca al revés.*
↔ **[EXT]** "el mármol de la plaza" (garantías) vs. "la palabra que la habita"
(fines).
↔ **[TEC]** **garantías** = sustrato formal `time.ts`/`draft_01.ts` (ZFC + Horn +
`Next`, C.8) + seam `contract-adapters → EVM` (C.7); **fines** = el `universo`
deliberativo y las **obras** del Dramaturgo (C.1, C.3).
Fuente: `mapa-ilustracion-2.0.md` §9; `dossier-hiperipl/03` §"dos vacíos".

---

## §B. Léxico de la conversación de origen [EXT]

### B.1 HiperIPL / hiperplaza
**[EXT]** El artefacto de origen: una **hiperplaza** para la **iniciativa popular
legislativa (IPL)** sobre infraestructura tipo blockchain, donde la voz se
propone, **persiste de forma inmutable** y no puede ser archivada
unilateralmente. El dossier la reencuadra: no es "el atrio del Reino" sino **la
capa de voz de la Ilustración 2.0** (A.6).
↔ **[FIL]** capa de voz / órgano de voz (A.6).
↔ **[TEC]** **caso de uso de la future-machine** (C.1): iniciativa = nodo;
deliberar = `expandir`/`bifurcar`; registro persistido = **BOE** (C.6).
Fuente: `EXTERNO.md`; `dossier-hiperipl/01`. Nombre canónico: ver §E.

### B.2 Las cuatro arquitecturas de la voz
**[EXT]** Zigurat (voz vertical), templo (voz filtrada), parlamento (voz delegada
y capturada), plaza (voz horizontal pero efímera, atada al cuerpo). HiperIPL = la
plaza buscando **persistencia y escala sin techo**.
↔ **[FIL]** cuatro posiciones del eje **voz/mando** (A.2); cada una deja un
"fantasma" = una recaída en el mando.
↔ **[TEC]** posiciones discretas del campo = **eigenstates** (C.4); la
persistencia/escala de la plaza = **BOE** + **nodo azul** (C.6, C.9).
Fuente: `EXTERNO.md` §1; `dossier-hiperipl/02`.

### B.3 Core / distros (forkabilidad)
**[EXT]** Nomenclatura de software libre: un **Core** común mantiene las reglas;
las **distros** las adaptan y pueden **forkear** sin permiso. Riesgo (dossier):
fork como huida permanente = neofeudalismo por la puerta de atrás → necesita
**exit-to-community** (A.8).
↔ **[FIL]** fork como derecho de gracia (A.4) con corrección de Schmitt/Vitalik.
↔ **[TEC]** Core/distros ≈ SDK base + **mod/override** del Scriptorium (el
contrato de existencia distingue `main` vs `mod/`, C.10); el fork tipado por el
cálculo `⊢⊬⊘⥱⟲≈` (C.5); sincronización vía Oasis/SSB (C.11).
Fuente: `EXTERNO.md`; `dossier-hiperipl/01`, `04` §4.

### B.4 Gaia / objeción termodinámica / "anestésico"
**[EXT]** La Tierra como superorganismo que pregunta a HiperIPL: ¿acoplas o
desacoplas a la especie de la trama de la vida? Dos riesgos: **parásito
informacional** (gasta energía sin mejorar viabilidad) y **anestésico** (canaliza
el malestar a firmas y desmoviliza la acción directa). El dossier lo convierte en
**garantía dura**: un oráculo de límites planetarios que ningún cuórum puede
anular.
↔ **[FIL]** Marcuse (desublimación represiva) + hipótesis C (A.3, A.7); huella
material como criterio testable.
↔ **[TEC]** el límite ecológico como **cláusula de Horn** / región fuera de la
cual el `Next` devuelve `NOT_ZFC_REGION` (C.8): límite no interpretable en la capa
de garantías. La **huella L2** como métrica.
Fuente: `EXTERNO.md` (colofón Gaia); `dossier-hiperipl/04` §2.

### B.5 Asamblea Eclesia
**[EXT]** ἐκκλησία, "la convocación de los llamados": el modelo del **centro
vacío** donde lo que circula es la palabra y nadie ocupa el centro ("ni judío ni
griego, ni varón ni mujer", Gálatas 3,28). El dossier la identifica como el
prototipo teológico del ciudadano abstracto de 1789.
↔ **[FIL]** centro vacío (A.1) = primera salida del mapa (el avatar-ciudadano);
neutralidad creíble (A.9).
↔ **[TEC]** la propiedad de no-captura del grafo / del protocolo de anclaje
neutral (A.1 ↔ C.7). `—` mecanismo propio.
Fuente: `EXTERNO.md` §2-3; `dossier-hiperipl/03`.

### B.6 Vía roja / vía negra / rojo-negro
**[EXT]** Las dos tradiciones de crítica (roja = marxismo-leninismo, estatista;
negra = anarquismo, antiestatal) bajo las que se somete HiperIPL, más su
síntesis. En `EXTERNO`: la roja confía en la institución, la negra en la asamblea,
Gaia en la señal.
↔ **[FIL]** se alinean con el eje voz/mando (A.2): la negra y el consejismo, del
lado de la voz; el centralismo, del lado del mando.
↔ **[TEC]** son **sub-espectros cartografiados** literalmente: namespaces `R` /
`N` / `RN` del grafo de eigenstates del Cartógrafo, con crossrefs (`R3 ≡ T6`,
`N4 ≡ E7/E11`, `RN7 ≡ E11`...). Ver C.4-C.5.
Fuente: `EXTERNO.md`; cartografía
`/Users/morente/Desktop/THEIA_PATH/NUEVA_BASE/SCRIPTORIUM/ALEPH/AgentLoreSDK/docs/biblioteca/yo-no-soy-yo-propositions-engine/mapa.md` §4.

---

## §C. Léxico técnico del Scriptorium [TEC]

> Fuentes de verdad reales (referenciadas, no tocadas). Repo:
> `escrivivir-co/aleph-scriptorium`, rama `integration/beta/scriptorium`, runtime
> **Bun**.

### C.1 Future-machine (pipeline 6+2)
**[TEC]** Cadena de **6 capas de datos + 2 agentes transversales** que mueve un
corpus hacia futuros posibles: **Loreador** (lore-db: INDEX + LORE_F) →
**Bartleby** (análisis) → **Archivero** (corpus, merge acumulativo) → **Grafista**
(grafo de bifurcación) → **Demiurgo** (universos) → **Dramaturgo** (obras). Más
los transversales **Pipeline** (orquesta refresh), **Portal** (puerta de entrada)
y **Cristalizador** (propone infraestructura). No predice: **bifurca**.
↔ **[FIL]** el "parlamento" / institución de deliberación que falta (A.6).
↔ **[EXT]** la hiperplaza como **caso de uso** de esta máquina (B.1).
Fuente: `.../DocumentMachineSDK/.github/skills/futures-engine/SKILL.md`;
`.../engine-plan/SKILL.md` §1.

### C.2 Loreador / Bartleby / Archivero / Grafista / Demiurgo / Dramaturgo
**[TEC]** Los seis agentes-capa (ver C.1). Contrato I/O canónico por capa en
`engine-plan` §1. **Pipeline / Portal / Cristalizador** = los transversales.
↔ **[FIL]/[EXT]** mapeo del dispositivo: el **Grafista** porta voz/mando y el
cálculo de forks (A.2, A.4); el **nodo azul** (C.9) es la lente de lectura humana.
Fuente: `engine-plan/SKILL.md` §1-2.

### C.3 Universo (del futures-engine)
**[TEC]** **Grafo dirigido ponderado** que es la forma persistente del
futures-engine: **nodos** = hechos/posibilidades en 1-2 frases, cada uno **cita su
ancla del corpus** (`[P-01]`, `[T-09]`...); un nodo sin cita = `[?]` (pendiente de
anclar). **Niveles temporales**: `T-N` (pasado documentado), `T=0` (presente del
corte), `T+1…T+∞` (futuro bifurcado). **Arcos** con **plausibilidad estructural**
`alta/media/baja`. **Operaciones**: `expandir`, `bifurcar`, `podar`, `reponderar`,
`anclar`, `pedir contenido`, `generar obra`, `persistir`. *El universo no es la
obra: es andamiaje factual.*
↔ **[FIL]** el grafo de deliberación de la Ilustración 2.0 (A.6); las tres
hipótesis como ramas (A.7).
↔ **[EXT]** iniciativa = nodo; deliberar = `expandir`/`bifurcar`; secesión =
`⊬`/`⟲`; el grafo persistido = BOE (B.1, C.6).
Fuente: `futures-engine/SKILL.md` §"Protocolo de universo propio".

### C.4 Eigenstate
**[TEC]** Cada **posición discreta** del campo (de un debate, de una tradición):
una postura con axiomas, referencia ancla y coordenadas. El campo voz/mando, las
vías roja/negra/rojo-negro, las arquitecturas de la voz son **conjuntos de
eigenstates**. El **grafo de eigenstates** es ese campo hecho navegable.
↔ **[FIL]** posiciones del eje voz/mando (A.2).
↔ **[EXT]** vías R/N/RN (B.6) = sub-espectros de eigenstates.
Fuente: cartografía `.../yo-no-soy-yo-propositions-engine/mapa.md` (Eigenstates
E1-E11, T1-T12, R/N/RN).

### C.5 Cálculo de forks del Cartógrafo `⊢ ⊬ ⊘ ⥱ ⟲ ≈`
**[TEC]** Álgebra de la relación padre ⇄ derivación (qué tipo de fork es cada
filiación):

| Símbolo | Significado | Lectura |
|---|---|---|
| `⊢` | fork aceptado / lineal | el padre lo reconocería como continuación legítima |
| `⊬` | fork rechazado explícitamente | el padre se autoexcluye ("yo no soy yo") con cita verificable |
| `⊘` | fork póstumo / no juzgado | el padre murió antes; sin acto de aceptación ni rechazo |
| `⥱` | atribución retroactiva | el descendiente reclama una paternidad que el padre no firmó |
| `⟲` | fork-vs-fork en nombre del padre | dos derivaciones se combaten invocando al mismo padre |
| `≈` | parecido sin filiación | cognación temática sin línea genealógica directa |
| `†` | eigenstate probablemente desconocido por el usuario | (heredado del cartógrafo base) |

↔ **[FIL]** formaliza el **fork como derecho de gracia** (A.4) y las **dos
cancelaciones** (A.5): `⊬` = cancelación con cita; `⊘` = relevo póstumo.
↔ **[EXT]** la forkabilidad de Core/distros (B.3), tipada: secesión = `⊬`,
guerra de distros = `⟲`.
**Nota:** son los **únicos emojis/operadores permitidos** en los papers.
Fuente: `.../yo-no-soy-yo-propositions-engine/mapa.md` §2 (leyenda de forks).

### C.6 BOE (boletín canónico del juego)
**[TEC]** El **boletín oficial** / registro canónico persistido de un tablero del
Scriptorium; se sincroniza entre Scriptoriums vía la red **Oasis/Scuttlebutt**
(plugin `network`). Es el estado autoritativo consultable.
↔ **[FIL]** el registro **inmutable** que impide archivar la voz (garantía de
persistencia, A.6/A.10).
↔ **[EXT]** "persistir" la iniciativa: la voz que no se borra (B.1).
Fuente: `registry.json` (plugin `network`: "Publicar/Recibir/Sincronizar BOE a
Oasis"; agente `BOE` en `arg-board`).

### C.7 Contract-adapters (seam → EVM)
**[TEC]** Paquete de NETWORK-ENGINE que es una **frontera de migración**: metadata
de entidad externa entra y se convierte en un `DomainContract` de Network-Engine
**antes** de cualquier proyección a MCP/OpenAPI/UI — y, por extensión, antes de
cualquier anclaje on-chain. Regla de guarda del motor: *el orquestador conecta,
no implementa dominio.* Es el **seam** donde HiperIPL enchufaría a una EVM **sin
decidir aún cuál**.
↔ **[FIL]** la capa de garantías neutral (A.9, A.10): la frontera "sin dominio" =
el centro que no se ocupa.
↔ **[EXT]** el "mármol" técnico sobre el que se ancla la palabra.
**Decisión ABIERTA:** qué cadena/EVM, qué pruebas, qué token detrás del adapter
(L2-first, sin elegir). `SPEC?`.
Fuente:
`.../ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages/contract-adapters/src/entity-metadata.ts`;
README `.../NETWORK-ENGINE/README.md`.

### C.8 time.ts (regiones ZFC + cláusulas de Horn + clase `Next`)
**[TEC]** El **sustrato formal** "código para el singular": define regiones de
licitud como **intervalos/bounds** (N, NoN, Z, finito = `BOUNDS_N/NoN/OPEN/FINITE`),
un **error de región** `NOT_ZFC_REGION` para lo que cae fuera, y un motor de
inferencia de **cláusulas de Horn** (`Clause`/`Horn`) cuya clase **`Next`**
calcula el paso siguiente (`head`/`tail`) discreto o continuo (racional/irracional)
respetando las restricciones. Es **licitud ejecutable, no interpretable**.
> Nota de procedencia: el plan lo nombra `time.ts`; la fuente de verdad real es
> `.../SCRIPTORIUM-CORE/NETWORK-ENGINE/draft_01.ts` (regiones ZFC + Horn +
> `class Next`). Si existe un `time.ts` canónico distinto, queda `SPEC?`.
↔ **[FIL]** la **capa de garantías** analítica (A.10): el universal duro, "Kant /
Leibniz hecho máquina"; el límite que el voto no toca.
↔ **[EXT]** el motor de licitud bajo el mármol de la plaza.
Fuente: `.../NETWORK-ENGINE/draft_01.ts`.

### C.9 Nodo azul (Nave / thread-eigenstate-viewer)
**[TEC]** La **interfaz humano-red**: el visualizador HTML5 estático de grafos
("**thread-eigenstate-viewer**", la "**Nave**") donde se navega el grafo de
eigenstates y se ancla el mapa. En `docs/azul` viven cuadernos de visualización
(embeddings 2D/3D/clusters de un corpus). Es la **lente central** del dossier:
HiperIPL se diseña *desde* aquí.
↔ **[FIL]** el lugar donde la ciudadanía navega el campo voz/mando (A.2).
↔ **[EXT]** la plaza hecha pantalla: dónde la voz se ve y circula (B.2).
Fuente: `.../DocumentMachineSDK/docs/azul/` (cuadernos
`liria_rojipardismo_2d/3d/clusters.html`); `mapa.md` §0 ("Planos de la nave",
demo de la Nave).

### C.10 Estados de existencia (READY/BUILD/MISS) y SPEC? / gaps
**[TEC]** El **contrato de existencia** de `engine-plan`: un agente/pieza está
`READY` (existe `.agent.md`), `BUILD` (hay dossier con PLAN/BACKLOG pero no
agente) o `MISS` (ni uno ni otro). Durante un `run`, lo no documentado emite
**`SPEC?`** (falta especificación) y el análisis de **`gaps`** lista huecos
(`SPEC?`, `ERR`, `ORPHAN-INPUT/OUTPUT`, `STALE`, `SCHEMA-DRIFT`). **`SPEC?` es la
marca canónica de "decisión abierta, no inventar".**
↔ **[FIL]** la disciplina inquebrantable: documentar abierto, no decidir (REGLA
DE ORO).
↔ **[EXT]** `—` (no tenía vocabulario para esto; lo aporta el léxico técnico).
Fuente: `engine-plan/SKILL.md` §2, §7, §14.

### C.11 Oasis / SSB (Scuttlebutt)
**[TEC]** Red **P2P sin servidor central** (Secure Scuttlebutt) sobre la que el
plugin `network` sincroniza BOEs entre Scriptoriums; sustrato del "teatro
distribuido". El edge productivo del MVP es `pub-web` de `BlockchainComPort/OASIS_PUB`.
↔ **[FIL]** sustrato de federación / **exit-to-community** sin caer en señoríos
(A.8).
↔ **[EXT]** la red que hace posible la distro federada (B.3).
**Decisión ABIERTA:** anclaje **on-chain (L2) vs Oasis/SSB** (off-chain P2P) para
qué piezas de HiperIPL. `SPEC?` (L2-first, sin cerrar).
Fuente: `registry.json` (plugin `network`); `ScriptoriumVps/README-SCRIPTORIUM.md`.

### C.12 ECOIN (BlockchainComPort)
**[TEC]** La pieza de **moneda/token** del ecosistema (BlockchainComPort/ECOIN),
referenciada como activo del MVP. Es el vocabulario de "token" del lado técnico.
↔ **[FIL]** el `stake`/capital que el tribunal de **Marx** vigila: voz acoplada
al capital = neofeudalismo (A.3, A.7). El dossier exige **desacoplar voz de
stake**.
↔ **[EXT]** el "capital en staking" que el centro vacío debe excluir (B.5).
**Decisión ABIERTA:** qué token (si alguno), una-persona-una-voz vs
token-voto, financiación cuadrática. `SPEC?`.
Fuente: `ScriptoriumVps/README-SCRIPTORIUM.md` (BlockchainComPort);
`mapa-ilustracion-2.0.md` §1 (Marx).

---

## §D. Tabla maestra de equivalencias (el puente de los tres léxicos)

> Lectura: cada fila es **el mismo objeto** dicho en tres idiomas. `—` = sin
> homólogo (el léxico no tenía esa pieza; es un aporte de otro).

| Concepto-puente | [FIL] filosófico-político | [EXT] hiperplaza de origen | [TEC] Scriptorium / future-machine |
|---|---|---|---|
| El centro que nadie ocupa | centro vacío / neutralidad creíble (A.1, A.9) | Asamblea Eclesia, "ni judío ni griego" (B.5) | regla neutral del grafo / **contract-adapters** sin dominio (C.7) |
| El eje político | **voz vs. mando** (A.2) | cuatro arquitecturas de la voz (B.2) | **grafo de eigenstates** R/N/RN (C.4) |
| Disidencia legítima | fork como derecho de gracia (A.4) | forkar la distro sin permiso (B.3) | **cálculo de forks** `⊢⊬⊘⥱⟲≈` (C.5) |
| Relevo de régimen | dos cancelaciones (A.5) | del zigurat a la plaza (B.2) | `⊬` (con cita) / `⊘` (póstumo) (C.5) |
| La institución que falta | la "voz" de la Ilustración 2.0 (A.6) | la hiperplaza / IPL (B.1) | la **future-machine** como caso de uso (C.1) |
| Deliberar | capa de fines, palabra (A.10) | proponer/apoyar/persistir (B.1) | `universo`: `expandir`/`bifurcar` sobre nodos (C.3) |
| La unidad de propuesta | iniciativa / avatar-ciudadano | iniciativa popular (B.1) | **nodo con cita** `[P-01]` (C.3) |
| Escenarios de futuro | tres hipótesis A/B/C (A.7) | esperanza vs. advertencia (B.4) | **ramas** con plausibilidad `alta/media/baja` (C.3) |
| Memoria que no se borra | persistencia / inmutabilidad (A.6) | "persistir" la voz (B.1) | **BOE** sincronizado (C.6) |
| El límite que el voto no toca | capa de garantías; oráculo eco (A.10, B.4) | Gaia como garantía dura (B.4) | **Horn**/`Next` + `NOT_ZFC_REGION` (C.8) |
| Salir sin romper el común | exit-to-community (A.8) | distros federadas (B.3) | **Oasis/SSB** P2P (C.11) |
| El capital a vigilar | tribunal de Marx (A.3) | capital en staking (B.5) | **ECOIN**/token (C.12) |
| Dónde mira el humano | — (implícito en "plaza") | la plaza, el ágora (B.2) | **nodo azul** / Nave (C.9) |
| No decidir, documentar | disciplina del dossier (REGLA DE ORO) | — | **`SPEC?`** / `gaps` (C.10) |
| El sustrato neutro de anclaje | universal duro analítico (A.10) | el mármol de la plaza (B.5) | **contract-adapters → EVM** (C.7) |

---

## §E. El dispositivo: HiperIPL / HiperILP

- **Nombre:** **HiperIPL / HiperILP — pendiente de fijar.** Decisión **ABIERTA**
  (`SPEC?`). No se elige acrónimo en estos papers.
- **Reencuadre canónico (FIJO):** HiperIPL **no** es "una blockchain de voz"; es
  un **caso de uso de la future-machine**, **diseñado desde el nodo azul** (C.9),
  con destino de integración documentado en `AgentLoreSDK/docs` y **seam técnico**
  en `NETWORK-ENGINE/packages/contract-adapters` (C.7).
- **Lo FIJO vs lo ABIERTO:**
  - FIJO (especificado por el ecosistema): el pipeline 6+2, el cálculo de forks,
    el schema del `universo`, el contrato de existencia y `SPEC?`, la existencia
    de contract-adapters/BOE/Oasis/SSB, el sustrato formal Horn/`Next`.
  - ABIERTO (documentar, no decidir): cadena/L2 concreta, token (o ninguno),
    sistema de identidad/pruebas (zk), on-chain vs Oasis/SSB por pieza, modelo de
    cuórum, una-persona-una-voz vs token-voto, gobernanza del Core.

---

## §F. Disciplina de vocabulario para los papers

- Usa **estos términos con estos nombres**. Si un paper necesita un término
  nuevo de su color, lo define en su §1 y **declara su equivalencia** con este
  léxico (igual que `futures-engine` exige consignar la equivalencia del
  vocabulario de un mod).
- Marca toda elección no especificada como **`SPEC?`** en la tabla de "Decisiones
  abiertas" (ver `_PLANTILLA.md`).
- **Emojis:** prohibidos salvo los **operadores de fork** `⊢ ⊬ ⊘ ⥱ ⟲ ≈ †`.
- **Citas:** rutas reales, tal cual; nada inventado. Registro: español, denso y
  preciso, en la línea de `dossier-hiperipl/`.

---

## §G. Conflictos de vocabulario detectados (los papers deben respetarlos)

1. **"Universo": dos sentidos.** En `futures-engine` (C.3) un *universo* es un
   grafo de bifurcación con citas; en `engine-plan` §5, un *universo* (capa 5,
   Demiurgo) es "rellenar variables + elegir inicializaciones" sobre el grafo
   (spec concreta del corto). **Convención:** llamar **`universo-grafo`** al
   primero y **`universo-instancia`** (o "spec de universo") al segundo cuando
   haya ambigüedad. Por defecto, "universo" = `universo-grafo`.

2. **"Fork": gracia vs. huida.** [FIL]/[EXT] celebran el fork; el dossier (`04`
   §4) advierte que el fork como primer instinto = NRx/patchwork. **Convención:**
   "fork" sin más = **derecho de gracia de último recurso**; la huida permanente
   se nombra explícitamente "**fork-fuga**" y se marca como antipatrón. El tipo
   exacto se cita con el operador (`⊬`, `⟲`, etc.).

3. **"Centro vacío": teológico vs. mecanismo.** `EXTERNO` lo usa como Logos;
   el dossier lo degrada a **neutralidad creíble** testable. **Convención:** en
   los papers, "centro vacío" = **mecanismo verificable** (A.9), nunca Logos. La
   lectura teológica solo se cita como genealogía.

4. **"BOE": doble referente.** En `arg-board` hay un **agente `BOE`** y en
   `network` un **artefacto BOE** (boletín sincronizado por Oasis). **Convención:**
   "BOE" = el **artefacto/registro canónico persistido** (C.6); al agente se le
   llama **`@BOE`**.

5. **"time.ts" no es la ruta real.** El plan lo nombra `time.ts`; la fuente real
   es `NETWORK-ENGINE/draft_01.ts` (C.8). **Convención:** citar la ruta real y,
   si se usa el alias "time.ts", aclararlo una vez. Cualquier `time.ts` canónico
   distinto queda `SPEC?`.

6. **"Iniciativa" / "nodo" / "eigenstate": no son sinónimos exactos.** Un *nodo*
   del `universo-grafo` (C.3) es un hecho/posibilidad con cita; un *eigenstate*
   (C.4) es una posición discreta de un campo; una *iniciativa* (B.1) es una
   propuesta ciudadana. **Convención:** iniciativa ⟶ se **modela como** nodo; el
   conjunto de posturas sobre ella forma eigenstates. No identificar los tres sin
   más.

7. **"voz" sobrecargada.** [FIL]/[EXT] usan "voz" (política, *voice*); el
   ecosistema técnico tiene `voice-crystallization` y el agente `@voz`
   (LoreSDK). **Convención:** "voz" política = en cursiva o "*voice*" cuando haya
   riesgo de choque con la capa técnica de cristalización de voz.

8. **L2-first ≠ L2-decidido.** "Anclaje L2-first" es una **orientación**, no una
   elección de cadena. **Convención:** nunca escribir una cadena/token/zk
   concretos como decididos; van siempre en la tabla `SPEC?`.

---

## Apéndice: índice de fuentes de verdad citadas

| Pieza | Ruta |
|---|---|
| Mapa filosófico | `/Users/morente/Desktop/carpeta sin título 7/mapa-ilustracion-2.0.md` |
| Dossier HiperIPL | `/Users/morente/Desktop/carpeta sin título 7/dossier-hiperipl/00..05` |
| Conversación de origen | `/Users/morente/Desktop/carpeta sin título 7/EXTERNO.md` |
| future-engine (skill) | `.../ALEPH/DocumentMachineSDK/.github/skills/futures-engine/SKILL.md` |
| engine-plan (skill) | `.../ALEPH/DocumentMachineSDK/.github/skills/engine-plan/SKILL.md` |
| Cartografía / forks | `.../ALEPH/AgentLoreSDK/docs/biblioteca/yo-no-soy-yo-propositions-engine/mapa.md` |
| Nodo azul / Nave | `.../ALEPH/DocumentMachineSDK/docs/azul/` |
| Registry de plugins | `.../ALEPH/.github_V1/plugins/registry.json` |
| contract-adapters | `.../ALEPH/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/packages/contract-adapters/` |
| NETWORK-ENGINE README | `.../SCRIPTORIUM-CORE/NETWORK-ENGINE/README.md` |
| Sustrato formal (time.ts) | `.../SCRIPTORIUM-CORE/NETWORK-ENGINE/draft_01.ts` |
| ScriptoriumVps | `.../ALEPH/ScriptoriumVps/README-SCRIPTORIUM.md` |

*Fin de 00-LEXICON. Los seis papers de colores importan este fichero y no
redefinen lo aquí fijado.*
