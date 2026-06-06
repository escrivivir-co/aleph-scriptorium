# ③ ARG Router — *Sound Clashes, tejido de red entre comunidades*

> *«Rude bots de militancia ácrata en canales externos.»*

## Identidad

Extiende Builder/Player al plano **hub**, donde **federan distintas cepas ARG**. Varios *streamers* actúan como **entrenadores**: cada uno llega con su comunidad y su propio representante (ventana de contexto). El Equipo de Ceremonias convoca el debate, abre turnos, modera el bucle (abre/corta/reabre), pide conclusiones y cierra. Entre eventos, tribus de **rude bots** salen a los canales donde ya están las personas que juegan (mensajería, foros, *streaming*) — para el jugador, esto tiene la pinta de una **network-mesh**: un muro de transmedia. Es la **T.A.Z.** (*Transmedia Autonomous Zone*).

## Lugar en el díptico — la bisagra A→B (federación)

Router es **exactamente el acto de federación voluntaria** que convierte sujetos en tablero:

- Cada comunidad/streamer es un **sujeto** (mitad A); el sound clash es la **topología** que forman al enchufarse (mitad B).
- El **keyring** (qué comunidades se reconocen) y las **suscripciones** (quién canaliza a quién) **son las aristas** del tablero ([`Aleph_board.md`](../Aleph_board.md) §*Tesis central*).
- Los rude bots en canales externos son **el borde** del tablero extendiéndose a la calle digital.

> Este juego es el que **materializa** la frase: *el tablero no existe sin sujetos; con sujetos, la topología ES el tablero.*

## Mapeo a infraestructura existente

| Pieza del juego | Anclaje en `NETWORK-ENGINE` | Estado |
|-----------------|------------------------------|--------|
| Federación de salas | `PubSubHub` + `PubSubBridge` (Socket.IO) | **Deuda:** el hub no reenvía `network_event` todavía |
| Bandos / comunidades | rooms (`join_room`/`leave_room`, `NetworkTransportEvent.room`) | **Deuda:** el bridge ignora `room` |
| Peer / reconocimiento | `IdentityContract` + keyring (green-field, ver mitad B) | **Nuevo** |
| Unir varias cepas ARG | `projectDomainsToGraphQL([])` (federación multi-dominio) | **No cableado aún** |
| Rude bots en canales | adaptadores tipo `MCPFirehoseServer` / `MCPBotHubServer` (rev1) | conceptual |
| Transcripción multivoz | corpus versionable + ledger de evidencias | parcial |

## Modelado por tipos (TS.instructions)

La arista de federación pide **branded ids** + **template literal** para el tipo de relación (precedente: `ForceVector` en `aleph-lang`):

```ts
type PeerId = string & { readonly __brand: 'PeerId' };
type EdgeKind = 'subscribesTo' | 'inKeyringOf' | 'clashesWith';
type FederationEdge = {
  from: PeerId;
  to: PeerId;
  kind: EdgeKind;
  rel: `aleph:${EdgeKind}`; // proyectable a quad RDF
};
```

**Decisión abierta (la jugosa del díptico):** ¿la federación publica el **estado completo** del sujeto o solo **señales destiladas** (`markPublishable`)? ¿La arista es **simétrica** (clash = mutua) o **dirigida**?

## Slice MVP de este juego

- Arreglar el **relay del hub** (deuda existente): A emite → B recibe. *Este es el primer ladrillo real del tablero.*
- 2 salas (bandos) que federan vía room.
- Registrar 1 arista `subscribesTo` y mostrar que altera el alcance.

## Decisiones abiertas

- Orden de ataque: ¿relay primero (Vía C de la mitad B) o identidad/keyring primero (T2)?
- ¿Los rude bots externos entran por adaptador (firehose) normalizado y triage, o directos?
- ¿El sound clash necesita consenso/boletín (layer-1 append-only) o basta la room volátil (layer-2)?
