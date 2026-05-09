# TASK-10 — Pub.Rooms federado · Release Notes

> **Versión:** TASK-10 MVP (cierre infra)
> **Fecha:** 2026-05-09
> **Estado:** infra cerrada · pendiente solo handshake federado externo end-to-end
> **Endpoint público:** [https://rooms.scriptorium.escrivivir.co](https://rooms.scriptorium.escrivivir.co)
> **Health:** `https://rooms.scriptorium.escrivivir.co/healthz` → `200 OK`

## Qué entrega esta release

Un edge público con TLS válido que expone un **runtime Rooms autenticado** (Socket.IO + REST `/mesh`) desde el Node-RED del VPS Scriptorium, listo para que el owner y dos perfiles invitados se federen sin abrir red interna.

### Capacidades nuevas

- `wss://rooms.scriptorium.escrivivir.co/runtime` con auth shared-secret por room.
- `/healthz` 200 servido por el upstream real (no respond fake del edge).
- Persistencia real de Node-RED en volumen Gandi (`/srv/oasis/scriptorium/node-red/data`), sobrevive a recreación del contenedor.
- Secret rooms aislado fuera de `/data` (`/srv/oasis/.../node-red/secrets/`, bind read-only en `/run/secrets/rooms`).
- Alias Docker `scriptorium-rooms` en `oasis-pub-scriptorium_oasis_pub_net`; `3010` no expuesto al host.

### Paquetes publicados en Verdaccio

[https://npm.scriptorium.escrivivir.co](https://npm.scriptorium.escrivivir.co)

| Paquete | Versión | Tarball |
|---|---|---|
| `@alephscript/mcp-core-sdk` | `1.4.0` | [tarball](https://npm.scriptorium.escrivivir.co/@alephscript/mcp-core-sdk/-/mcp-core-sdk-1.4.0.tgz) |
| `node-red-dashboard-2-alephscript-rooms` | `0.2.0` | [tarball](https://npm.scriptorium.escrivivir.co/node-red-dashboard-2-alephscript-rooms/-/node-red-dashboard-2-alephscript-rooms-0.2.0.tgz) |
| `node-red-contrib-alephscript-core` | `0.2.0` | [tarball](https://npm.scriptorium.escrivivir.co/node-red-contrib-alephscript-core/-/node-red-contrib-alephscript-core-0.2.0.tgz) |

### Cambios sutiles de superficie SDK 1.4.0

Documentados en el `CHANGELOG.md` del SDK; relevantes para consumidores:

- `SocketClient` extiende `EventEmitter` y reemite `auth_error` desde `connect_error` cuando el server cierra el handshake con razón legible.
- Pasar `auth` al `SocketClient` desactiva el bootstrap automático (`CLIENT_REGISTER` + `CLIENT_SUSCRIBE` a `ENGINE_THREADS`); el consumidor controla la suscripción explícitamente.
- `SocketIoMesh.init({ port, host, cors, healthPath, authValidator, exposeAdminUI, exposeRootInfo })`. Defaults: `host='0.0.0.0'`, `healthPath='/healthz'`. Admin UI se desactiva sola cuando hay `authValidator`.

## Cierres realizados

| Tramo | Estado | Resumen |
|---|---|---|
| `R10-PF0.1` | cerrado | SDK `1.4.0` con auth + bind host + healthz, publicado y validado |
| `R10-PF0.2` | cerrado | Contribs Node-RED `0.2.0` consumiendo SDK `1.4.0`, publicados |
| `R10-02A.0` | cerrado | `/data` Node-RED en bind mount Gandi (deuda `TASK-04` saldada) |
| `R10-02A.1` | cerrado | Runtime al día + auth shared-secret real activa |
| `R10-02B` | cerrado | Alias Docker `scriptorium-rooms` operativo |
| `R10-01` | cerrado | Caddy edge `rooms.scriptorium.escrivivir.co` con cert ACME |

Detalle técnico de cada cierre vive en [`tasks/TASK-10_PUB_ROOMS_FEDERATED.md`](tasks/TASK-10_PUB_ROOMS_FEDERATED.md) y los bloques cronológicos de [`LAST_UPDATE.md`](LAST_UPDATE.md).

## Validaciones que pasaron en el cierre

- `https://rooms.scriptorium.escrivivir.co/healthz` → `200 OK scriptorium rooms edge ok`.
- Smoke público sobre los 8 hosts edge → `200` (sin downtime visible en `pub.escrivivir.co`, `scriptorium.`, `admin.scriptorium.`, `mcp.scriptorium.`, `npm.scriptorium.`).
- `pub-web` reload sin reinicio (`Up 8 days`).
- Smoke handshake auth válido dentro del contenedor → `CONNECTED`.
- Smoke handshake auth inválido → `CONNECT_ERROR: unauthorized` y log `runtime.auth.reject`.
- `npm ls --prefix /data` post-recreación → SDK `1.4.0` + rooms `0.2.0` + core `0.2.0`.
- Bind mounts Gandi confirmados: `/data` (rw) y `/run/secrets/rooms` (ro).

## Lo que queda fuera de esta release

- **Handshake federado externo end-to-end vía `wss://rooms.scriptorium...`** desde un Node-RED no-VPS (caso b/c). Se cierra con la primera invitación operativa real.
- `bootstrap-mesh-client.sh` y `pub-room-client.flow.json` como artefactos públicos en `ScriptoriumVps/scripts/` y plantilla de flow. Pendientes de aterrizar antes de mandar invitaciones a amigos.
- CORS configurable en el contrib Rooms: la decisión PO fue que `0.2.0` cubre el MVP federado (Node-RED→Node-RED no usa preflight CORS, ver [`tasks/SUBTASKS/REQ-ROOMS-CONTRIB-021-CORS.md`](tasks/SUBTASKS/REQ-ROOMS-CONTRIB-021-CORS.md)). No bloquea.
- Identidad OASIS con JWT/DID: tracking en [`tasks/SUBTASKS/SPIKE-10-OASIS-IDENTITY.md`](tasks/SUBTASKS/SPIKE-10-OASIS-IDENTITY.md). Fuera de TASK-10.

## Riesgos vivos a vigilar

- Bind mount **single-file** sobre `/etc/caddy/Caddyfile` no propaga cambio de inode al contenedor (lección estructural cerrada en `R10-01`). Cualquier futura edición del Caddyfile debe usar `cat > file` (preserva inode) o `caddy reload --config /dev/stdin`.
- `rooms-secrets.json` vive solo en VPS, fuera de git. La rotación es manual: regenerar JSON + reload del flow Rooms (no del contenedor).
- Verdaccio sigue siendo single-instance; backup vive en el mismo volumen Gandi. Tracking en `RUNBOOK.md`.

## Activos públicos canónicos

- Repo + dossier: [github.com/escrivivir-co/aleph-scriptorium · branch `integration/beta/scriptorium`](https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium)
- Dossier TASK-10: [github.com/escrivivir-co/aleph-scriptorium · `sala/dossiers/scriptorium-vps`](https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium/sala/dossiers/scriptorium-vps)
- Tarea TASK-10: [`tasks/TASK-10_PUB_ROOMS_FEDERATED.md`](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/TASK-10_PUB_ROOMS_FEDERATED.md)
- RUNBOOK operativo VPS: [`ScriptoriumVps/RUNBOOK.md`](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ScriptoriumVps/RUNBOOK.md)
- Notas de onboarding (este mismo dossier):
  - [`tasks/SUBTASKS/NOTA-OWNER-RECORDATORIO.md`](tasks/SUBTASKS/NOTA-OWNER-RECORDATORIO.md)
  - [`tasks/SUBTASKS/NOTA-AMIGO-PEER-NODE-RED.md`](tasks/SUBTASKS/NOTA-AMIGO-PEER-NODE-RED.md)
  - [`tasks/SUBTASKS/NOTA-AMIGO-DESDE-CERO.md`](tasks/SUBTASKS/NOTA-AMIGO-DESDE-CERO.md)

## Siguiente turno operativo

1. Owner ejecuta el manualito de [`tasks/SUBTASKS/NOTA-OWNER-RECORDATORIO.md`](tasks/SUBTASKS/NOTA-OWNER-RECORDATORIO.md) y valida que el endpoint sirve `/healthz` y que su Node-RED local entra al room con token válido.
2. Owner genera dos tokens (uno por amigo) en `rooms-secrets.json`, los reparte fuera de banda y manda las dos notas correspondientes.
3. Cuando el primer amigo conecta, queda cerrado el último ítem pendiente de la matriz: handshake federado externo end-to-end.
