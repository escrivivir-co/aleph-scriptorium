# RAID Log — Riesgos, Supuestos, Incidencias, Dependencias

> Registro vivo para scrum. **R**iesgos · **A**ssumptions (supuestos) · **I**ncidencias · **D**ependencias, más un bloque de **decisiones abiertas** consolidadas. La mayoría de riesgos vienen de la investigación real en los repos hermanos (no son hipotéticos).

## Riesgos (R)

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| R1 | **Invite-accept SSB falla** entre cliente local y `pub.escrivivir.co` (challenge SHS / `ebt.replicate`) — documentado en `BlockchainComPort/OASIS_PUB/BACKLOG.md` | Alta | Alto (bloquea identidad real) | F6=federar: el MVP no depende de SSB real; usar identidad mock/`KeyringContract` hasta resolver. Spike SP-F2 acota |
| R2 | **`caps.shs` divergente:** el primer arranque del cliente puede generar un `caps.shs` aleatorio que aísla el nodo de la red Oasis | Media | Alto | Fijar `caps.shs` de Oasis en config; documentar en `SSB.instructions.md` (S-X1) |
| R3 | **El "peer card" de Pub.Rooms es shared-secret, no identidad fuerte** (RUNBOOK lo dice explícito) | Alta | Medio | No confundir transporte (Pub.Rooms) con identidad (SSB); modelarlos como dos adaptadores distintos (F4) |
| R4 | **BOE está documentado pero no implementado** en `BlockchainComPort/src` | Alta | Medio | Tratar BOE como diseño a portar, no como API existente; no asumir endpoints |
| R5 | **rabbit/spider/horse no es una cadena en código** (son 3 plugins co-residentes vía Telegram) | Confirmado | Bajo | Corregir expectativas: la "cadena" es topología a construir, no message-passing existente |
| R6 | **Acoplar `core` a Fastify/MCP-SDK/SSB** rompería la regla de capas de `ECOSYSTEM.md` | Media | Alto | Federación como **proyección**; adaptadores importan core, nunca al revés |
| R7 | **Operación real sobre VPS/DNS/SSB pub vivo** sin aprobación PO | Baja | Alto | Prohibido por `RUNBOOK`/`README-SCRIPTORIUM` hasta aprobación expresa |
| R8 | **Scope creep del `draft_01`**: intentar portar todo ZFC/Horn en vez de solo lo que mide alcance | Media | Medio | SP-C1 acota qué entra; el resto a icebox |

## Supuestos (A)

| ID | Supuesto | Verificar con |
|----|----------|---------------|
| A1 | El follow graph SSB (`contact`) **es** el grafo de suscripción del Tablero | SP-C2 + modelo de datos |
| A2 | `friends.hops` se corresponde con `NOMON` (paso discreto) de forma operativa | SP-C2 (grafo toy) |
| A3 | Los tipos IACM/RNFP compilan sin grammY (son agnósticos de Telegram) | SP-F1 |
| A4 | La identidad `@…ed25519` es accesible vía `ssb-admin.js whoami` / unix-socket | SP-F2 |
| A5 | Pub.Rooms (Socket.IO `/runtime`) cubre el rol de relay productivo | SP-F2 + smoke test del RUNBOOK |
| A6 | `GraphStoreProtocol` (RDF) puede alojar la topología reusando ontología `aleph0..3` | SP-B1 |
| A7 | El edge productivo es `pub-web` (no levantar segundo Caddy) | `README-SCRIPTORIUM` de ambos repos |

## Incidencias (I) — deuda y bugs conocidos

| ID | Incidencia | Estado | Story |
|----|------------|--------|-------|
| I1 | `PubSubHub` no reenvía `network_event` (no hay relay) | abierta | S-F1 |
| I2 | `PubSubBridge` descarta `room`/`target` y no hace `join_room` | abierta | S-F2 |
| I3 | Identidad/keyring sin contrato propio (solo `IdentityContract` de URIs) | abierta | S-B2/SP-F2 |
| I4 | Sin hogar en INSTRUCTIONS para SSB, protocolos, identidad y federación | abierta | EP-X |
| I5 | `ECOSYSTEM.md` mapea solo paquetes internos, no los repos hermanos | abierta | S-X3 |

## Dependencias (D)

| ID | Dependencia | Tipo | Notas |
|----|-------------|------|-------|
| D1 | `BlockchainComPort` (Oasis/SSB) | externa (servicio) | identidad + append-only; F6=consumir, no portar |
| D2 | `ScriptoriumVps` (Pub.Rooms, Node-RED, Caddy) | externa (servicio) | transporte + edge; red docker `oasis_pub_net` |
| D3 | `BotHubSDK` (IACM/RNFP) | externa (tipos) | protocolos a consumir como cliente (`heteronimos-semi-asistidos-sdk` 0.0.0) |
| D4 | `aleph-lang` (XState) | interna | motor de la ventana de contexto del sujeto |
| D5 | `GraphStoreProtocol` + ontología `aleph0..3` | interna | sustrato de topología |
| D6 | **Bun** como runtime/CI | tooling | nunca npm/npx (regla del repo) |

---

## Decisiones abiertas (consolidado)

> No bloquean ejecución: cada una tiene un spike o un gate de scrum. Detalle en los docs fuente.

### Federación (F1–F6) — fuente [`Federation_ASI_Program.md`](../Federation_ASI_Program.md)

| ID | Decisión | Estado |
|----|----------|--------|
| F1 | Topología en RDF / Mongo read-model / on-read del follow graph | abierta → SP-B1 |
| F2 | Identidad = adaptador SSB real vs `KeyringContract` abstracto | abierta → SP-F2 |
| F3 | `@network-engine/protocols`: npm vs copia de tipos vs submódulo | abierta → SP-F1 |
| F4 | Relay propio (Socket.IO) vs Pub.Rooms como transporte productivo | abierta → SP-F2 |
| F5 | NOMON/hops on-read (query) vs materializado por eventos | abierta → SP-F3 |
| **F6** | **Autocontención: absorber vs federar** | ✅ **RESUELTO: federar todo** (PO, 06-jun) |

### Tablero (T1–T5) — fuente [`Aleph_board.md`](../Aleph_board.md)

| ID | Decisión | Estado |
|----|----------|--------|
| T1 | Persistencia de la topología (RDF vs Mongo vs efímero) | abierta → SP-B1 / ADR 0010 |
| T2 | Identidad/keyring (modelo de Peer Card) | abierta → SP-F2 |
| T3–T5 | Resto de incertidumbres del tablero | ver `Aleph_board.md` |

### App / simulador (vías A/B/C, U5–U8) — fuente [`Aleph_app.md`](../Aleph_app.md)

| ID | Decisión | Estado |
|----|----------|--------|
| Vía A | Extensión in-package en `aleph-lang` | abierta → gate scrum |
| Vía B | App de catálogo separada | abierta → gate scrum |
| Vía C | Math-first (bloquear hasta canon) | abierta → gate scrum |
| Vía D | App como sujeto autónomo federado | abierta → gate scrum |

## Gates de scrum pendientes

- [ ] Elegir vía A/B/C/D del simulador y aprobar `implementation_plan.md` antes de codificar features.
- [ ] Elegir orden de fases del programa de federación (Fase 0→5).
- [ ] Resolver T1/F1 (sustrato de topología) — condiciona S-B1.
- [ ] Promover `Federation_ASI_Program.md` a `DOSSIERS/federation-topology.md` cuando madure.
