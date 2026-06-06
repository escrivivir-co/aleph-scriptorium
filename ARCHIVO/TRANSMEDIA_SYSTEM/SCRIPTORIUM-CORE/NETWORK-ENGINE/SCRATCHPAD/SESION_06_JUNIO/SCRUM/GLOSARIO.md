# Glosario Aleph — onboarding scrum

> Vocabulario mínimo para que alguien que entra nuevo entienda el handoff sin leerse todo. Ordenado por bloques.

## El Tablero y el díptico

| Término | Qué es |
|---------|--------|
| **Tablero Scriptorium** | No es un dashboard. Es la **topología emergente** de sujetos autónomos que se federan. Análogo a un *sound system*: divide una señal (narrativa) en bandas y la recompone. |
| **Díptico** | Las dos voces de la respuesta: **mitad A** (el sujeto/nodo) y **mitad B** (la red/topología). Ver `Aleph_app.md` y `Aleph_board.md`. |
| **Sujeto autónomo** | Un nodo con **máquina de estado**, **proceso local** y **espacio agéntico** propios, que se federa voluntariamente. La "app" es un sujeto. |
| **Ventana de contexto** | El estado/espacio agéntico del sujeto, modelado como la máquina de estado de `aleph-lang`. Lo que el Builder construye. |
| **Topología emergente** | La forma de la red, que **emerge de keyring + suscripciones**, no del tráfico. |

## El lenguaje Aleph (math core)

| Término | Qué es |
|---------|--------|
| **`draft_01.ts`** | Borrador del núcleo matemático. En esta sesión se reinterpreta como el **instrumento de medida** de la topología. |
| **NOMON** | El paso discreto (+1) de la raíz griega *gnomon*. Operativamente = **un salto de seguimiento** en el grafo (≡ `friends.hops` de SSB). |
| **Region** | Vecindad numérica: ℕ/ℤ/ℚ/ℝ. Aquí = reglas de vecindad de la red (follow/block/pub). |
| **Cláusula Horn (head/tail)** | Patrón para avanzar estado (cabeza/cola). Inspira las transiciones. |
| **ℵ (aleph)** | Cardinalidad de conjuntos infinitos. ℵ₀ = numerable (ℕ=ℤ=ℚ); ℵ₁ = siguiente. Aquí = **tamaño del conjunto alcanzable** de un nodo. |
| **HC (Hipótesis del Continuo)** | ¿Hay cardinalidad entre ℵ₀ y el continuo? Es **independiente de ZFC**. Aquí se vuelve operativa: *¿la federación admite densidades intermedias o colapsa?* Es **opinión de la federación, no teorema**. |
| **radicoma ↔ hegemón** | Los dos extremos de densidad de red: **distribuida** (radicoma) vs **centralizada en un pub** (hegemón). El regulador gradúa entre ambos. |
| **ZFC** | Axiomática de teoría de conjuntos (Zermelo-Fraenkel + elección). Marco formal que `draft_01` aspira a tokenizar. **Fuera del MVP** salvo lo que mide alcance. |

## Los cuatro juegos

| Juego | Qué es |
|-------|--------|
| **① ARG Builder** | El sujeto **construyéndose**: CRUD de su ventana de contexto. |
| **② ARG Player** | El sujeto **ejecutándose/invocándose**: proceso local que decide leyendo recursos MCP. |
| **③ ARG Router** | La **federación** (bisagra A→B): sujetos que se conectan. Aquí vive la **deuda del relay**. |
| **④ Juego de la Vida (Regulador)** | El **agente regulador** de la red: lee forma↔distribución y gradúa concentración. Cara jugable de la mitad B. |

## Los tres raíles de federación (repos hermanos)

| Término | Qué es |
|---------|--------|
| **Raíl de identidad / keyring** | `BlockchainComPort` → **Oasis/SSB**. Aporta identidad `@…ed25519` y el follow graph. La "Peer Card". |
| **SSB (Secure Scuttlebutt)** | Protocolo P2P de feeds **append-only** firmados con ed25519. La identidad es tuya (sin servidor central). |
| **follow graph / `contact`** | Mensajes SSB `{type:"contact", following}`. **Es** el grafo de suscripción del Tablero. |
| **`friends.hops`** | Profundidad de replicación en SSB (cuántos saltos replicas). **≡ NOMON × distancia**. |
| **pub** | Nodo SSB siempre-online que ayuda a la replicación (≈ hegemón si todo pasa por él). |
| **BOE** | Bloque de obra/evento del Scriptorium. Formato documentado (no implementado aún) para sincronizar obras ARG sobre SSB. |
| **Raíl volátil / la Room** | `BotHubSDK` (mensajería tipada) + `ScriptoriumVps` (Pub.Rooms). El relay vivo. |
| **IACM** | *Inter-Agent Communication Message*: protocolo de 11 mensajes tipados (`REQUEST`, `REPORT`, …) con `from_agent`/`to_agent`/`thread_id`. Mapea a `NetworkTransportEvent` (`source`/`target`/`room`). |
| **RNFP** | Protocolo de federación de BotHubSDK (`INVITE`/`ACCEPT`/`GRAPH_ANNOUNCE`…). Lo que hace el `SpiderBot`. |
| **Pub.Rooms** | Servidor Socket.IO sobre Node-RED (`/runtime`, puerto 3010) accesible por `wss://rooms.scriptorium.escrivivir.co`. El relay productivo, outbound-only. |
| **peer card (Pub.Rooms)** | Token shared-secret para entrar a un room. **No es identidad fuerte** (eso lo da SSB). |
| **Raíl de transporte / edge** | `ScriptoriumVps` + `OASIS_PUB`: Caddy `pub-web` (80/443), subdominios, red docker `oasis_pub_net`. |

## Las rude bot skins (crew)

| Skin | Rol | Mapea a |
|------|-----|---------|
| **bot-rabbit** | ingesta / broadcast | alimentar al Builder |
| **bot-spider** | federación de peers (RNFP) | ③ Router / glue PubSub |
| **bot-horse** | canal IACM | salida a canales externos / Player |

> Ojo: en el código actual **no** forman una cadena; son 3 plugins co-residentes en un bot grammY que se coordinan vía Telegram. La "cadena" es topología a construir.

## Plataforma NETWORK-ENGINE

| Término | Qué es |
|---------|--------|
| **`DomainContract`** | Fuente única de verdad: define recursos, mutaciones, prompts, storage. |
| **Proyección** | Vista declarativa de un `DomainContract`. Ya existen `projectDomainToMCP` y `projectDomainsToGraphQL`. La tesis de la sesión: **añadir `projectDomainToFederation`**. |
| **MCP** | *Model Context Protocol*: cómo los agentes hablan con el sistema (resources/prompts/tools). Regla: **Read=Resource, Mutate=Tool**. |
| **`GraphStoreProtocol`** | Almacén RDF (quads). Candidato a alojar la topología (`aleph:subscribesTo`). |
| **`NetworkTransportEvent`** | Formato de evento sobre PubSub: `{type, payload, timestamp, source, target?, room?}`. |
| **PubSubHub / PubSubBridge** | Servidor / cliente Socket.IO interno. Hoy con la deuda: el hub no reenvía, el bridge ignora `room`. |
| **`aleph-lang`** | Primer lenguaje derivado, basado en XState. Motor de la máquina de estado del sujeto. |

## Modos cognitivos del agente

| Modo | Cuándo |
|------|--------|
| **MONKEY** | ejecución rápida, mecánica, sin replanteo. (El turno anterior, "visión chata".) |
| **AGI** | trabajo profesional estándar: análisis + decisión + equilibrio. |
| **ASI** | investigación estratégica, modelado conceptual, diseño de plataforma. **El modo de esta sesión.** |

## Términos ágiles del repo

| Término | Qué es |
|---------|--------|
| **Epic / Feature / Story / Spike** | Jerarquía ágil. Un **Spike es ciudadano de primera clase**: *aprender es un resultado válido*. |
| **DoR / DoD** | Definition of Ready / of Done. Ver `SPRINT_0_PLAN.md` y `DOD.instructions.md`. |
| **ADR** | Architecture Decision Record. Toda decisión de diseño importante se registra en `ADR/`. |
| **Markdown-First** | El chat es efímero; el conocimiento se consolida en disco (INSTRUCTIONS/DOSSIERS/ADR/SCRATCHPAD). |
| **Bun** | Runtime/gestor obligatorio. Nunca npm/npx/npm run salvo petición explícita. |
