# Sesión 06 junio — «¿Qué pinta tiene un Tablero Scriptorium?»

> **Para el equipo scrum.** Esta carpeta es un *paquete de handoff* autocontenido. Llévatela entera y trabájala por separado: contiene el relato de cómo se llegó al plan, el plan en sí, y todo el material ágil para empezar a ejecutar.

---

## 1. El arco de la sesión (de la pregunta al plan)

Todo arrancó con una pregunta aparentemente simple:

> **«¿Qué pinta tiene un Tablero Scriptorium?»**

El recorrido para responderla, en orden:

1. **La pregunta.** No hay "un dashboard". Un Tablero Scriptorium se reveló como un **circuito de pipelines** que procesa señales narrativas (captura → normalización → selección → bifurcación → cristalización), análogo a un *sound system*.
2. **El núcleo matemático.** Al mirar [`draft_01.ts`](../../draft_01.ts) apareció el sustrato: `NOMON` (paso discreto), `Region` (ℕ/ℤ/ℚ/ℝ), cláusulas `Horn`, y la **Hipótesis del Continuo (HC)** como horizonte. ¿Para qué sirve? Para **medir** redes.
3. **El díptico.** La conversación separó dos voces:
   - [`Aleph_app.md`](Aleph_app.md) — **mitad A**: qué es un *nodo* = un **sujeto autónomo** con máquina de estado, proceso local y espacio agéntico propios, que se federa con transmedia.
   - [`Aleph_board.md`](Aleph_board.md) — **mitad B**: qué forma toma la *red* de esos nodos = la **topología emergente** de *keyring + suscripciones* (no del tráfico).
4. **Los juegos.** Los 4 juegos del catálogo resultaron ser las **caras jugables** del díptico → [`games/README.md`](games/README.md): ① Builder, ② Player, ③ Router, ④ Juego de la Vida (regulador).
5. **El "put all together".** [`MVP.md`](MVP.md) unió díptico + math core + juegos en un **slice vertical** demostrable en 5 pasos.
6. **La deuda y el reencuadre ASI.** Se detectó que el `PubSubHub` no reenvía eventos y el bridge ignora `room`. El turno rápido lo cerró como "arregla el relay". El reencuadre ASI ([`Federation_ASI_Program.md`](Federation_ASI_Program.md)) demostró que **eso es la punta de un iceberg**: la federación es una pila de **tres capas que ya existen** en repos hermanos, y NETWORK-ENGINE debe **proyectarlas** como ya proyecta MCP y GraphQL.

**La respuesta, en una frase:**

> Un **Tablero Scriptorium** es la **topología emergente** de **sujetos autónomos** (Builder/Player) que **se federan voluntariamente** (Router) sobre un **keyring de identidad** real (SSB), cuya **forma↔distribución** se lee y regula como un **juego de la vida** (Regulador), todo **medido** con el lenguaje Aleph (NOMON = saltos de seguimiento, ℵ = alcance, HC = densidad de federación).

---

## 2. El hallazgo que solidifica el plan

La investigación de los repos hermanos (`BotHubSDK`, `BlockchainComPort`, `ScriptoriumVps`) confirmó que **las tres capas del Tablero no hay que inventarlas: ya están construidas y dockerizadas**.

| Capa | Repo hermano | Qué es |
|------|--------------|--------|
| Identidad / keyring (ℵ) | `BlockchainComPort` → **Oasis/SSB** | `@…ed25519`, follow graph, pubs, `friends.hops` |
| Volátil / relay (la Room) | `BotHubSDK` (IACM/RNFP) + `ScriptoriumVps` (Pub.Rooms) | mensajería tipada + Socket.IO/WSS |
| Transporte / edge | `ScriptoriumVps` + `OASIS_PUB` | Caddy `pub-web`, subdominios |

Y la correspondencia que lo cierra: **`friends.hops` (SSB) == `NOMON` (draft_01)**. El follow graph de SSB **es** el grafo de suscripción que teorizaba `Aleph_board.md`. El `draft_01.ts` deja de ser borrador matemático y pasa a ser el **instrumento de medida** de la red.

**Decisión de PO (06-jun): FEDERAR TODO** — los tres repos se consumen como servicios externos; NETWORK-ENGINE se queda como el cerebro de contratos que proyecta hacia ellos. (Detalle en `Federation_ASI_Program.md` §9, F6.)

---

## 3. Mapa de la carpeta (qué leer y en qué orden)

```
SESION_06_JUNIO/
├── 00_README_SESION.md          ← (estás aquí) relato + índice + cómo usar
├── Aleph_app.md                 ← díptico mitad A: el sujeto autónomo
├── Aleph_board.md               ← díptico mitad B: la topología/tablero
├── MVP.md                       ← put all together: el slice vertical
├── Federation_ASI_Program.md    ← reencuadre ASI: federación como proyección (3 raíles)
├── games/
│   ├── README.md                ← catálogo + mapeo al díptico
│   ├── 01-arg-builder.md        ← ① sujeto se construye
│   ├── 02-arg-player.md         ← ② sujeto se ejecuta
│   ├── 03-arg-router.md         ← ③ federación (la deuda del relay)
│   └── 04-juego-de-la-vida-regulador.md  ← ④ regulador de topología
└── SCRUM/                       ← KIT ÁGIL DE HANDOFF (este paquete)
    ├── PRODUCT_BACKLOG.md       ← epics → features → stories → spikes, priorizado
    ├── SPRINT_0_PLAN.md         ← objetivo de Sprint 0 + items + DoR/DoD
    ├── USER_STORIES.md          ← historias top con criterios Gherkin
    ├── BOARD_Y_DEPENDENCIAS.md  ← kanban inicial + grafo de dependencias
    ├── RAID_LOG.md              ← riesgos/supuestos/incidencias/decisiones abiertas
    └── GLOSARIO.md              ← vocabulario Aleph para onboarding
```

### Rutas de lectura sugeridas

- **PO / facilitador:** `00_README` → `Federation_ASI_Program` → `SCRUM/PRODUCT_BACKLOG` → `SCRUM/RAID_LOG`.
- **Dev que entra nuevo:** `00_README` → `SCRUM/GLOSARIO` → `MVP` → `SCRUM/SPRINT_0_PLAN` → `SCRUM/USER_STORIES`.
- **Quien quiere el porqué profundo:** el díptico (`Aleph_app` + `Aleph_board`) y `draft_01.ts`.

---

## 4. Cómo usar este handoff

1. **Sprint 0 ya viene propuesto** en `SCRUM/SPRINT_0_PLAN.md`: objetivo, items candidatos y criterios. Ajustad capacidad y compromiso en vuestra planning.
2. **El backlog está priorizado pero abierto.** Estimaciones en puntos Fibonacci como punto de partida, re-estimad en planning poker.
3. **Las decisiones abiertas (T1–T5, F1–F6, vías A/B/C) viven en `RAID_LOG.md`.** No bloqueéis ejecución por ellas: hay spikes para resolverlas.
4. **Estado editorial de todo el paquete: «asentado pero abierto».** Vocabulario y mapeo a código fijados; vía de implementación elegible por scrum.
5. **Promoción:** cuando el programa madure, se promueve a `DOSSIERS/federation-topology.md` (ver DoD del programa ASI).

---

## 5. Trazabilidad y constituciones

- Modo cognitivo de la sesión: **ASI** ([`INSTRUCTIONS/MODES/ASI.instructions.md`](../../INSTRUCTIONS/ALEPH.instructions.md)).
- Filosofía ágil: [`LAYER_0/AGILE.instructions.md`](../../INSTRUCTIONS/LAYER_0/AGILE.instructions.md) (Epic/Feature/Story/Spike).
- Definición de Hecho: [`LAYER_0/DOD.instructions.md`](../../INSTRUCTIONS/LAYER_0/DOD.instructions.md).
- Calidad TS: [`LAYER_0/TS.instructions.md`](../../INSTRUCTIONS/LAYER_0/TS.instructions.md).
- Matriz concepto↔paquete: [`LAYER_1/ECOSYSTEM.md`](../../INSTRUCTIONS/LAYER_1/ECOSYSTEM.md).
- Fuente narrativa de producto: [`analisis_transmedia_system.rev1.md`](../../../../analisis_transmedia_system.rev1.md).
