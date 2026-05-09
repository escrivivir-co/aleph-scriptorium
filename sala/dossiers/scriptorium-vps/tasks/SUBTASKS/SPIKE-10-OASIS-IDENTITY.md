# SPIKE-10 — OASIS/SSB identity para Pub.Rooms

> **Tipo:** spike estratégico (no bloqueante de TASK-10)
> **Estado:** abierto — pendiente diseño
> **Agente recomendado:** `nodered-curator` + alguien con conocimiento OASIS/SSB
> **Dependencias:** TASK-10 (MVP shared secret), `dossier-layer2-bridge`
> **Origen:** decisión PO 2026-05-09 — opción C "OASIS/SSB identity" del análisis de auth de Pub.Rooms se separa como spike porque es el camino bueno y aspira a un plugin/extensión del propio Oasis.

## Lee primero

1. `sala/dossiers/dossier-layer2-bridge/IDEAS.md`
2. `sala/dossiers/dossier-layer2-bridge/VENTANA.md`
3. `sala/dossiers/scriptorium-vps/tasks/TASK-10_PUB_ROOMS_FEDERATED.md`
4. `BlockchainComPort/OASIS_PUB/`
5. Roadmap SSBv2 referenciado en `VENTANA.md` — Rooms / NAT traversal, Tribes box2, WebSocket transport.
6. Repos relacionados:
   - `https://github.com/escrivivir-co/alephscript-network-sdk` (`OASIS_PUB`)
   - `https://github.com/escrivivir-co/simple-ssb-webrtc`
   - `https://github.com/escrivivir-co/heteronimos-semi-asistidos-sdk`

## Por qué es "el bueno"

- El shared secret de TASK-10 vale para un círculo cercano, pero no escala a Parliament/Arrakis ni a habitantes federados.
- OASIS ya define identidad y red social. Reaprovechar esa identidad en la Layer 2 evita inventar IAM nuevo y conecta natural con los roles del `dossier-layer2-bridge` (Arquitecto, Orquestador, Actor, Org, Habitante, Lurker).
- Permite que el control de acceso a una room viva dentro del scope de la app Oasis y, en última instancia, lo gestione el propio servidor Oasis (cliente o pub).

## Hipótesis de diseño

### Modos de integración candidatos

| Modo | Idea | Pros | Contras |
|---|---|---|---|
| M1 — Plugin Oasis cliente | Botón "Unirme a Pub.Rooms" desde Oasis client; el cliente Oasis emite token firmado con su identidad SSB y lo pasa al cliente Node-RED. | Mejor DX para Habitante; reutiliza login existente. | Hay que añadir handler en Oasis cliente. |
| M2 — Plugin Oasis pub (server-side) | El pub `pub.escrivivir.co` emite tickets firmados y mantiene allow-list de rooms por feedId. | Centraliza políticas; alineado con OASIS_PUB. | Acopla Pub.Rooms al pub. |
| M3 — Verificación cara a cara mediante invites SSB | Los amigos intercambian invites; el server Rooms valida `feedId` contra allow-list local. | Mínima dependencia, máxima soberanía. | UX más manual. |
| M4 — Bridge SSB ↔ Rooms en `scriptorium-rooms` | El server Rooms entiende mensajes SSB-firmados como auth. | Encaja con Layer 2 actual. | Requiere meter parser/verificador SSB en el server. |

### Capas afectadas

- Layer 1 (SSB/OASIS): identidad y, posiblemente, allow-list por feedId.
- Layer 2 (Rooms / Node-RED / pub.relay): consumo del token/identidad, control de acceso a rooms.
- Layer 3 (WebRTC): preparado para hand-off ip-a-ip dentro de la sesión autenticada.

## Preguntas a resolver en el spike

1. ¿Modo recomendado: M1, M2, M3, M4 o combinación M1+M2?
2. ¿Qué información mínima debe llevar el token/credencial OASIS para entrar a una room?
   - feedId
   - lista de rooms permitidas
   - timestamp/expiración
   - firma verificable
3. ¿Dónde vive la allow-list?
   - en `scriptorium-rooms` (M3/M4),
   - en `pub.escrivivir.co` (M2),
   - distribuida vía mensaje SSB (M1).
4. ¿Cómo encaja con la migración SSB v1 → v2 mencionada en `VENTANA.md`?
5. ¿Qué pieza puede salir como **plugin/extensión Oasis** y qué pieza queda como contrib Node-RED?
6. ¿Encaja con el "pub.relay" anunciado como Layer 2 futura?

## Entregables esperados del spike

- Documento corto en `sala/dossiers/scriptorium-vps/tasks/SUBTASKS/SPIKE-10-OASIS-IDENTITY-RESULT.md` con:
  - decisión M1/M2/M3/M4;
  - flujo de autenticación end-to-end;
  - impacto en `scriptorium-rooms`;
  - impacto en `node-red-contrib-alephscript-core`;
  - impacto en `OASIS_PUB`;
  - definición de la TASK-11 si procede.
- Si M1 o M2 ganan: scaffold del plugin/extensión Oasis previsto, sin implementar.
- Si M3 o M4 ganan: diseño de verificador SSB embebible en `scriptorium-rooms`.

## Relación con TASK-10

- TASK-10 entrega el MVP con shared secret y deja el handshake `auth: { token }` listo.
- Cuando este spike se cierre, el token podrá pasar a ser una credencial OASIS sin rediseñar la capa de transporte.
- Por tanto el spike **no bloquea** TASK-10; la informa.

## Riesgos del spike

| Riesgo | Mitigación |
|---|---|
| Spike se convierte en proyecto sin cierre | timeboxear: una sesión de diseño + un documento `SPIKE-10-...-RESULT.md`. |
| Acoplamiento prematuro a SSBv1 | trabajar contra el modelo SSBv2 anunciado en `VENTANA.md`. |
| Disolverse en el "gran plan" `dossier-layer2-bridge` | mantener el alcance acotado a "qué necesita Pub.Rooms para cambiar shared secret por identidad OASIS". |

## Estado

Abierto. Propietario operativo a definir cuando se cierre TASK-10.
