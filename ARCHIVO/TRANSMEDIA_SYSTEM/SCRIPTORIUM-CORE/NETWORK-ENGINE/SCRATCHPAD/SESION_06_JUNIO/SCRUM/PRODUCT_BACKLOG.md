# Product Backlog — Tablero Scriptorium / Aleph

> Consolidado de la sesión 06-jun. Atado al díptico ([`Aleph_app.md`](../Aleph_app.md) / [`Aleph_board.md`](../Aleph_board.md)), los [`games/`](../games/README.md), el math core ([`draft_01.ts`](../../../draft_01.ts)) y el [`Federation_ASI_Program.md`](../Federation_ASI_Program.md).
> Vocabulario ágil según [`AGILE.instructions.md`](../../../INSTRUCTIONS/LAYER_0/AGILE.instructions.md): **Epic / Feature / Story / Spike** (los spikes son ciudadanos de primera clase; *aprender es un resultado válido*).

## Convenciones

- **Prioridad (MoSCoW):** `Must` / `Should` / `Could` / `Won't (now)`.
- **Estimación:** puntos Fibonacci (1, 2, 3, 5, 8, 13) — punto de partida, re-estimar en planning poker.
- **ID:** `EP-x` épica · `Fx.n` feature · `Sx.n` story · `SPx.n` spike (x = letra de épica).
- **Estado:** `🧊 icebox` · `📋 ready` · `🚧 wip` · `✅ done`.

---

## Mapa de épicas

| Épica | Nombre | Mitad del díptico | Doc fuente | Foco |
|-------|--------|-------------------|------------|------|
| **EP-A** | Sujeto autónomo (app) | A | `Aleph_app.md`, games 01/02 | nodo con estado/proceso/espacio agéntico propios |
| **EP-B** | Tablero / topología (core) | B | `Aleph_board.md`, game 04 | topología emergente de keyring + suscripciones |
| **EP-C** | Math core / simulador HC | compartido | `draft_01.ts`, `Aleph_app.md` | NOMON/Region/ℵ como instrumento de medida |
| **EP-F** | Federación como proyección | A→B | `Federation_ASI_Program.md`, game 03 | proyectar hacia los 3 raíles (SSB/IACM/Pub.Rooms) |

> **Decisión PO (F6): federar todo.** EP-F no porta SSB/Oasis adentro; consume los repos hermanos como servicios y proyecta hacia ellos.

---

## EP-A — Sujeto autónomo (app)

**Objetivo:** un sujeto Aleph corre local (su `AlephUniverse` + ventana de contexto), se construye (Builder) y se ejecuta/invoca (Player).

| ID | Tipo | Título | Prioridad | Pts | Depende | Estado |
|----|------|--------|-----------|-----|---------|--------|
| F-A1 | Feature | Ventana de contexto = máquina de estado del sujeto | Must | — | EP-C | 📋 |
| S-A1 | Story | Como sujeto, construyo mi ventana de contexto con CRUD de fragmentos | Must | 5 | `DocumentStore` | 📋 |
| S-A2 | Story | Como sujeto, persisto mi estado entre arranques (proceso local) | Must | 3 | S-A1 | 📋 |
| S-A3 | Story | Como sujeto, invoco/juego mi representante (modo Player) leyendo recursos MCP | Must | 5 | S-A1 | 📋 |
| S-A4 | Story | Builder y Player conviven en un binario, dos modos | Should | 3 | S-A1,S-A3 | 📋 |
| SP-A1 | Spike | ¿`aleph-lang` (XState) basta como motor de la ventana, o hace falta extender semántica? | Must | 3 | — | 📋 |

---

## EP-B — Tablero / topología (core)

**Objetivo:** materializar la topología como grafo (aristas de keyring/suscripción) y un regulador que lee forma↔distribución.

| ID | Tipo | Título | Prioridad | Pts | Depende | Estado |
|----|------|--------|-----------|-----|---------|--------|
| F-B1 | Feature | Sustrato de topología (aristas en grafo) | Must | — | EP-F | 📋 |
| S-B1 | Story | Una federación escribe una arista `aleph:subscribesTo` en el grafo | Must | 5 | S-F1, T1 | 📋 |
| S-B2 | Story | El alcance (cardinalidad ℵ del conjunto alcanzable) se deriva del grafo, no del tráfico | Must | 8 | S-B1, EP-C | 📋 |
| S-B3 | Story | Como regulador, muevo un slider `concentration` que altera la topología | Should | 5 | S-B1 | 📋 |
| S-B4 | Story | El visor HC muestra radicoma↔hegemón al graduar la concentración | Should | 8 | S-B3, S-C3 | 📋 |
| SP-B1 | Spike | T1: ¿topología en `GraphStoreProtocol` (RDF) vs Mongo read-model vs on-read del follow graph? | Must | 5 | — | 📋 |
| SP-B2 | Spike | T2: ¿identidad/keyring = adaptador SSB real o `KeyringContract` abstracto? | Must | 3 | SP-F2 | 📋 |

---

## EP-C — Math core / simulador HC

**Objetivo:** convertir `draft_01.ts` en el instrumento de medida: NOMON, Region, alcance, ℵ, HC como opinión de federación.

| ID | Tipo | Título | Prioridad | Pts | Depende | Estado |
|----|------|--------|-----------|-----|---------|--------|
| F-C1 | Feature | `math-core` canónico (NOMON/Region/alcance) | Must | — | — | 📋 |
| S-C1 | Story | Canonizar `draft_01.ts` en `LANGUAGES/aleph-lang/definition/math-core.md` (sin código aún) | Must | 3 | — | 📋 |
| S-C2 | Story | Cálculo de nivel ℵ del alcance: 3 reglas de vecindad → misma ℵ₀ (colapso N=Z=Q) | Must | 8 | S-C1 | 📋 |
| S-C3 | Story | Simulador de expansión/contracción (slides inducción↔síntesis) como UI | Should | 8 | S-C2 | 📋 |
| SP-C1 | Spike | ¿Qué parte de ZFC/Horn del `draft_01` se porta y qué se deja fuera del MVP? | Must | 3 | S-C1 | 📋 |
| SP-C2 | Spike | Validar correspondencia `friends.hops == NOMON` con grafo toy + query de alcance | Must | 3 | SP-B1 | 📋 |

---

## EP-F — Federación como proyección

**Objetivo:** declarar `projectDomainToFederation()` y sus adaptadores; desbloquear el relay; conectar a los servicios externos.

| ID | Tipo | Título | Prioridad | Pts | Depende | Estado |
|----|------|--------|-----------|-----|---------|--------|
| F-F1 | Feature | Paso 0 — relay real del transporte | Must | — | — | 📋 |
| S-F1 | Story | El `PubSubHub` reenvía `network_event` con routing por `target` (unicast) y `room` (multicast) | Must | 5 | — | 📋 |
| S-F2 | Story | El `PubSubBridge` honra `room`/`target` al publicar y hace `join_room` | Must | 3 | S-F1 | 📋 |
| S-F3 | Story | Test: 2 bridges, A emite → solo B (mismo room) recibe; exclusión de `source` | Must | 2 | S-F1,S-F2 | 📋 |
| F-F2 | Feature | Federación como proyección declarativa | Must | — | F-F1 | 📋 |
| S-F4 | Story | `projectDomainToFederation()` esqueleto, testeable sin red (como `projectDomainToMCP`) | Must | 5 | — | 📋 |
| S-F5 | Story | Adaptador cliente Pub.Rooms WSS (outbound a `/runtime` con peer-card token) | Should | 8 | S-F4 | 📋 |
| S-F6 | Story | Adaptador de identidad de lectura sobre SSB (`@…ed25519` vía whoami) | Should | 8 | SP-F2 | 🧊 |
| SP-F1 | Spike | F3: portabilidad de IACM/RNFP a `@network-engine/protocols` (qué compila sin grammY; npm vs copia) | Must | 5 | — | 📋 |
| SP-F2 | Spike | F2/F4: ¿unix-socket `ssb-admin.js whoami` basta para exponer identidad al core? ¿hub propio vs Pub.Rooms? | Must | 5 | — | 📋 |
| SP-F3 | Spike | F5: ¿NOMON/hops on-read (query) o materializado por eventos de federación? | Should | 3 | SP-C2 | 📋 |

---

## EP-X — Organización del OS cognitivo (INSTRUCTIONS)

**Objetivo:** dar hogar al conocimiento nuevo descubierto (huecos de layers).

| ID | Tipo | Título | Prioridad | Pts | Estado |
|----|------|--------|-----------|-----|--------|
| S-X1 | Story | LAYER_0: `SSB.instructions.md` + `PROTOCOLS.instructions.md` (IACM/RNFP) | Should | 3 | 📋 |
| S-X2 | Story | LAYER_1: `IDENTITY.instructions.md` + `FEDERATION.instructions.md` | Should | 5 | 📋 |
| S-X3 | Story | LAYER_1: extender `ECOSYSTEM.md` con fila de repos hermanos | Must | 2 | 📋 |
| S-X4 | Story | LAYER_2: `FEDERATION_REPOS.instructions.md` (USER/OPERATOR de los 3 repos) | Should | 3 | 📋 |
| S-X5 | Story | LAYER_3: `FEDERATION.functional.md` + reencuadre de `PUBSUB.functional.md` | Could | 3 | 📋 |
| S-X6 | Story | ADR 0010-0013 (federación-proyección, identidad-SSB, protocols, topología-grafo) | Must | 5 | 📋 |

---

## Priorización global (vista rápida — qué entra primero)

1. **Desbloqueo (Must, sin dependencias):** S-F1, S-F2, S-F3 (relay) · S-C1 (canon math) · SP-F1, SP-F2, SP-B1 (spikes raíz) · S-X3, S-X6 (trazabilidad).
2. **Sustrato (Must, depende de 1):** S-B1 (arista) · S-C2 (alcance ℵ) · SP-C2 (hops==NOMON) · S-A1/S-A2 (sujeto local).
3. **Jugable (Should, cierra figura):** S-A3/S-A4 (Player) · S-B3/S-B4 (regulador+visor) · S-C3 (simulador) · S-F4/S-F5 (proyección+Pub.Rooms).
4. **Maduración (Could/icebox):** S-F6 (identidad SSB real) · S-X1/S-X2/S-X4/S-X5.

> El **MVP** ([`MVP.md`](../MVP.md) §3) se da por demostrado cuando los **5 pasos del slice vertical** corren juntos una vez. Ese es el criterio de "release del programa".
