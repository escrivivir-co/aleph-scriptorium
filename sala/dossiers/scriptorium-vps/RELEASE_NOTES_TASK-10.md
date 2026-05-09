# TASK-10 — Pub.Rooms federado · Release Notes

> **Versión:** TASK-10 MVP federado  
> **Fecha:** 2026-05-09  
> **Estado:** **cerrada funcionalmente**  
> **Endpoint público:** <https://rooms.scriptorium.escrivivir.co>  
> **Health público:** <https://rooms.scriptorium.escrivivir.co/healthz> → `200 OK` (`scriptorium rooms edge ok`)  
> **Transport:** Socket.IO sobre `wss://rooms.scriptorium.escrivivir.co/runtime`

## Resumen

TASK-10 entrega un **rail federado Node-RED ↔ Node-RED** para Pub.Rooms: un runtime Rooms autenticado por shared-secret, servido desde el VPS Scriptorium mediante el Caddy edge existente de `OASIS_PUB`, sin abrir puertos internos al host y con bootstrap reproducible para clientes externos.

La infraestructura, el runtime, la publicación de paquetes, el edge TLS, el bootstrap cliente y el smoke federado externo técnico quedan cerrados. El dossier pasa a estado operativo:

> **enviar invitaciones y esperar reanudación con peer real**.

La conversación con un peer real, su evidencia de conexión y las decisiones de identidad/rotación posteriores pasan a `TASK-11`.

## Qué queda disponible

### Servicio público

| Recurso | URL |
|---|---|
| Pub.Rooms edge | <https://rooms.scriptorium.escrivivir.co> |
| Health edge | <https://rooms.scriptorium.escrivivir.co/healthz> |
| Socket.IO runtime | `wss://rooms.scriptorium.escrivivir.co/runtime` |
| Dashboard Rooms owner | <https://scriptorium.escrivivir.co/dashboard/rooms> |
| Registry npm Scriptorium | <https://npm.scriptorium.escrivivir.co> |

### Código y documentación FOSS

| Recurso | Enlace |
|---|---|
| Repo principal | <https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium> |
| Subrepo ScriptoriumVps | <https://github.com/escrivivir-co/scriptorium-vps/tree/integration/beta/scriptorium> |
| Release notes TASK-10 | <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/RELEASE_NOTES_TASK-10.md> |
| TASK-10 completa | <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/TASK-10_PUB_ROOMS_FEDERATED.md> |
| RUNBOOK operativo | <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ScriptoriumVps/RUNBOOK.md> |
| Bootstrap cliente | <https://github.com/escrivivir-co/scriptorium-vps/blob/integration/beta/scriptorium/scripts/bootstrap-mesh-client.sh> |
| Flow cliente federado | <https://github.com/escrivivir-co/scriptorium-vps/blob/integration/beta/scriptorium/node-red-projects/pub-room-client.flow.json> |
| Owner checklist | <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/SUBTASKS/NOTA-OWNER-RECORDATORIO.md> |
| Invitación peer Node-RED | <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/SUBTASKS/NOTA-AMIGO-PEER-NODE-RED.md> |
| Invitación desde cero | <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/SUBTASKS/NOTA-AMIGO-DESDE-CERO.md> |
| Siguiente task | <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/TASK-11_PEER_REAL_HANDOFF.md> |

### Proyectos upstream FOSS relevantes

| Proyecto | Uso |
|---|---|
| [Node-RED](https://nodered.org/) | Runtime visual y cliente federado |
| [Socket.IO](https://socket.io/) | Transporte WSS `/runtime` |
| [Caddy](https://caddyserver.com/) | Edge TLS y reverse proxy |
| [Docker](https://www.docker.com/) / [Compose](https://docs.docker.com/compose/) | Despliegue de servicios |
| [Let's Encrypt](https://letsencrypt.org/) | Certificados ACME |
| [Verdaccio](https://verdaccio.org/) | Registry npm público Scriptorium |

## Paquetes publicados

| Paquete | Versión | Tarball |
|---|---:|---|
| `@alephscript/mcp-core-sdk` | `1.4.0` | <https://npm.scriptorium.escrivivir.co/@alephscript/mcp-core-sdk/-/mcp-core-sdk-1.4.0.tgz> |
| `node-red-dashboard-2-alephscript-rooms` | `0.2.0` | <https://npm.scriptorium.escrivivir.co/node-red-dashboard-2-alephscript-rooms/-/node-red-dashboard-2-alephscript-rooms-0.2.0.tgz> |
| `node-red-contrib-alephscript-core` | `0.2.0` | <https://npm.scriptorium.escrivivir.co/node-red-contrib-alephscript-core/-/node-red-contrib-alephscript-core-0.2.0.tgz> |

## Cambios entregados

### Runtime y SDK

- `@alephscript/mcp-core-sdk@1.4.0` añade `AuthValidator`, `makeSharedSecretValidator(...)`, `SocketIoMesh.init({ port, host, cors, healthPath, authValidator })`, `/healthz` y `SocketClientOptions.auth`.
- `node-red-dashboard-2-alephscript-rooms@0.2.0` separa `bindHost` de `managedHost`, carga `ROOMS_SECRETS_FILE`, desactiva Admin UI con auth y expone health real en `3010/healthz`.
- `node-red-contrib-alephscript-core@0.2.0` propaga `auth.token`, `auth.room`, `auth.user` al handshake Socket.IO y emite `auth_error` legible en rechazo.

### VPS y edge

- `/data` de Node-RED queda en bind mount persistente del volumen Gandi: `/srv/oasis/scriptorium/node-red/data`.
- Secrets Rooms viven fuera de `/data`: `/srv/oasis/scriptorium/node-red/secrets/rooms-secrets.json`, montado read-only en `/run/secrets/rooms`.
- Alias Docker `scriptorium-rooms` añadido a `nodered` en `oasis-pub-scriptorium_oasis_pub_net`.
- `rooms.scriptorium.escrivivir.co` añadido al Caddy edge existente de `OASIS_PUB` con cert ACME Let's Encrypt y reload sin reinicio de `pub-web`.
- `3010` **no** se publica al host; sólo lo consume `pub-web` por la red Docker compartida.

### Cliente externo

- `ScriptoriumVps/scripts/bootstrap-mesh-client.sh` publicado: backup de `~/.node-red`, registry Verdaccio, install de contribs, copia del flow y `.env.rooms` con permisos `600`.
- `ScriptoriumVps/node-red-projects/pub-room-client.flow.json` publicado: cliente federado apuntando a `wss://rooms.scriptorium.escrivivir.co/runtime`, usando sustitución Node-RED `$(ROOMS_SECRET)`, `$(ROOMS_ROOM)`, `$(ROOMS_USER)`.
- Notas listas para enviar a owner y peers en `tasks/SUBTASKS/`.

## Validación cerrada

| Validación | Resultado |
|---|---|
| DNS `rooms.scriptorium.escrivivir.co` | `92.243.24.163` |
| Cert ACME | Let's Encrypt vía `tls-alpn-01` |
| Edge health | `https://rooms.scriptorium.escrivivir.co/healthz` → `200` |
| Upstream desde `pub-web` | `http://scriptorium-rooms:3010/healthz` → `ok` |
| Upstream intra-contenedor | `http://127.0.0.1:3010/healthz` → `ok` |
| Smoke auth válido interno | `CONNECTED` |
| Smoke auth inválido interno | `CONNECT_ERROR: unauthorized` + `runtime.auth.reject` |
| Smoke federado externo técnico | Windows local → VPS por internet: válido conecta + inválido rechaza |
| Smoke público edge | 8/8 `200`, sin reinicio de `pub-web` |
| Paquetes post-recreación | SDK `1.4.0` + rooms/core `0.2.0` siguen en `/data` |

## Commits principales

| Commit | Repo | Entrega |
|---|---|---|
| `180e204` | MCPGallery | SDK `1.4.0` auth/bind/healthz |
| `b9622c9` | WiringEditor | Rooms contrib `0.2.0` |
| `89dd60e` | WiringEditor | Core contrib `0.2.0` |
| `adb4a9b` | ScriptoriumVps | `/data` Gandi (R10-02A.0) |
| `7fadff5` | ScriptoriumVps | env Rooms + bind ro secrets (R10-02A.1) |
| `efa76b8` | ScriptoriumVps | alias `scriptorium-rooms` (R10-02B) |
| `9f99c19` | BlockchainComPort | Caddy `rooms.scriptorium` (R10-01) |
| `f410820` | ScriptoriumVps | bootstrap + flow cliente (R10-05) |
| `76a6acc` | ScriptoriumVps | RUNBOOK Pub.Rooms (R10-06/07) |

## Limitaciones explícitas

- MVP usa shared-secret por room; no es identidad fuerte.
- No hay JWT, DID, OASIS/SSB identity ni WebRTC en TASK-10.
- No hay registro abierto: el owner reparte secrets fuera de banda.
- La allow-list CORS de `0.2.0` cubre el widget navegador del VPS; los peers Node-RED usan `socket.io-client` desde Node.js y no dependen de preflight CORS.
- No se expone `/socket.io` en `scriptorium.escrivivir.co`; el rail público es `rooms.scriptorium.escrivivir.co`.

## Siguiente estado operativo

TASK-10 queda cerrada y el dossier pasa a:

> **enviar invitaciones y esperar reanudar con peer real**.

La reanudación vive en [`tasks/TASK-11_PEER_REAL_HANDOFF.md`](tasks/TASK-11_PEER_REAL_HANDOFF.md): primer peer real, evidencia de conexión, rotación de tokens al final del ciclo y decisión posterior sobre identidad fuerte (`SPIKE-10`).
