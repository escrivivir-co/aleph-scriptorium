Ya tengo suficiente contexto. Te paso el análisis y propuesta de railes antes de tocar el dossier; cuando elijas, creo `TASK-10`.

## Viabilidad: sí, con un trozo ops imprescindible

**TASK-10 es viable y acotada**, pero tiene una piedra angular **fuera de los contribs**: hoy el server Rooms del VPS corre en `127.0.0.1:3010` **dentro del contenedor Node-RED**, no está expuesto a Internet ni proxeado por Caddy. Sin abrir esa puerta, los casos b) y c) no existen aunque tengamos el mejor cliente Node-RED del mundo.

Por tanto TASK-10 se descompone naturalmente en tres capas: **comms (ops)**, **auth (decisión)** y **DX cliente (contribs + bootstrap)**.

---

## 1. Comunicaciones --- opciones reales

### Estado actual

- `rooms-mvp` corre como `managed-port` interno (`127.0.0.1:3010`), namespace `/runtime`, sin TLS ni Caddy delante.

- Caddy edge expone solo `pub.`, `scriptorium.`, `admin.scriptorium.`, `mcp.scriptorium.`, `npm.scriptorium.`.

- Verdaccio: lectura libre, publish autenticado.

- Red Docker compartida: `oasis-pub-scriptorium_oasis_pub_net`.

### Rail R1 --- Subdominio dedicado WebSocket

- **Subdominio nuevo**: `rooms.scriptorium.escrivivir.co`

- Caddy → `scriptorium-rooms:3010` (alias en `oasis-pub-scriptorium_oasis_pub_net`)

- Requiere que el server Rooms escuche en `0.0.0.0` dentro de la red docker (no localhost)

- Opcional: separar el runtime Rooms en su propio service compose (no pegado a Node-RED), o solo cambiar el bind del puerto interno

- WebSocket upgrade nativo en Caddy, sin trampas

### Rail R2 --- Path bajo scriptorium.escrivivir.co

- `scriptorium.escrivivir.co/rooms-io/socket.io`

- Mezcla con Dashboard 2 (que también usa `/socket.io` propio) → riesgo de colisión real

- **No recomendado**

### Rail R3 --- Solo intra-VPS + WebRTC capa 3

- Rooms server permanece interno, los amigos se relayean por WebRTC

- Alineado con el "Layer 3 webrtc" del dossier-layer2-bridge

- Demasiado salto para un MVP de TASK-10

**Recomendado: R1**.

---

## 2. Auth --- opciones realistas

### A --- Shared room secret en handshake Socket.IO

- `auth: { token: '<room-secret>', room: 'ROOMS_LAB', user: 'amigo-XX' }`

- Validación server-side antes de `JOIN`

- Distribución del secret por canal humano (Signal/cara a cara)

- **Pros**: 0 infraestructura nueva, perfecto para un círculo de amigos

- **Contras**: rotación manual; si se filtra hay que cambiarlo

### B --- JWT firmado por VPS

- Endpoint `/rooms-auth/issue` autenticado contra Verdaccio htpasswd o admin Node-RED → emite JWT corto con `rooms` claim

- Server Rooms valida JWT en handshake

- **Pros**: revocación, expiración, claims por room

- **Contras**: hay que poner emisor JWT (1 servicio nuevo), gestión de claves

### C --- OASIS/SSB identity (gran plan)

- El handshake usa identidad SSB; el server consulta `pub.escrivivir.co`

- **Alineado con dossier-layer2-bridge**, pero claramente fuera del MVP

### D --- Caddy `basic_auth` por subdominio

- No combina bien con WebSocket en browser y con clientes Node-RED headless

**Recomendado MVP: A**, con el camino documentado a B en una TASK-11 si la mesh funciona.

Complemento en cualquier caso:

- **Allow-list de rooms** en server (solo `ROOMS_LAB`, `MESH_PRIVATE`, etc.)

- **CORS allow-list** restrictiva (`scriptorium.escrivivir.co`, `localhost`, `127.0.0.1` para dashboards locales)

- **Rate limiting** básico en Caddy

---

## 3. Contribs y bootstrap --- qué hace falta

### Lo que ya tenemos

- `node-red-contrib-alephscript-core` ya define `alephscript-core-client` con `@alephscript/mcp-core-sdk@1.3.0` → **es el cliente base** para los tres casos. No hace falta inventar uno nuevo.

- `node-red-dashboard-2-alephscript-rooms` ya tiene el widget para visualizar rooms, reaprovechable como cliente del cliente.

### Lo que sí falta

1\. **Publicar `node-red-contrib-alephscript-core@0.1.0`** en Verdaccio (hoy no está; lo vimos en R09-06).

2\. **Flow template `pub-room-client.flow.json`**:

   - 1 `alephscript-core-client` apuntado a `wss://rooms.scriptorium.escrivivir.co/runtime`

   - 1 entrada inject manual + UI mínima

   - 1 widget `alephscript-rooms-dashboard` en modo "viewer" para ver el estado de la room

3\. **Paquete bootstrap CLI** común a los tres casos:

   **Opción A (ligera, recomendada para MVP)**: documentación + script bash/PS1 en `ScriptoriumVps/scripts/bootstrap-mesh-client.sh` que:

   - hace backup del `~/.node-red` actual,

   - escribe .npmrc con `@alephscript:registry=https://npm.scriptorium.escrivivir.co`,

   - `npm install node-red-contrib-alephscript-core node-red-dashboard-2-alephscript-rooms`,

   - copia el flow template,

   - pide al usuario room-secret y user-name.

   **Opción B (más pulida)**: paquete `@alephscript/scriptorium-mesh-bootstrap` publicado en Verdaccio con CLI `npx @alephscript/scriptorium-mesh-bootstrap init`. Misma lógica, mejor DX para el caso b) y c).

   **Recomendado: empezar con A; promover a B en TASK-11 si la fricción molesta**.

### Ningún contrib nuevo *imprescindible*

La parte cliente se cubre con los dos contribs ya existentes + un flow template + un bootstrap. Sólo si decidimos auth B (JWT) hace falta un nodo `alephscript-rooms-auth` adicional.

---

## 4. Casos de uso, mapeados a los railes

| Caso | Comms | Auth | Bootstrap | Riesgo |

|---|---|---|---|---|

| a) Owner local | R1 | A (secret local) | script bash sobre Node-RED ya instalado | bajo |

| b) Amigo con su Node-RED | R1 | A (secret enviado fuera de banda) | script bash o npx bootstrap | medio (DX en distintos OS) |

| c) Mesh entre amigos | R1 | A (secret común de room) | mismo bootstrap, distinto user-name | medio (concurrencia + identidad débil) |

Para (c) el server Rooms del VPS sigue siendo el master canónico; cada Node-RED amigo es un cliente.

---

## 5. Alcance recomendado para TASK-10

**TASK-10 = "Pub.Rooms público + clientes Node-RED federados (MVP)"**

Entregables propuestos:

1\. **Ops VPS**:

   - servicio compose para exponer el server Rooms en alias `scriptorium-rooms:3010`

   - bloque Caddy `rooms.scriptorium.escrivivir.co`

   - DNS añadido en Gandi

   - allow-list de rooms y origins

2\. **Auth MVP**:

   - shared room secret en handshake

   - validación server-side

3\. **Cliente Node-RED**:

   - publicar `node-red-contrib-alephscript-core@0.1.0` en Verdaccio

   - `pub-room-client.flow.json` en `ScriptoriumVps/node-red-projects/`

4\. **Bootstrap**:

   - `ScriptoriumVps/scripts/bootstrap-mesh-client.sh`

   - sección RUNBOOK "cómo unirme a la mesh"

5\. **Validación**:

   - desde tu Node-RED local, conectar a `ROOMS_LAB`

   - tres usuarios (a/b/c simulados) entrando, hablando, saliendo

   - el dashboard del VPS los ve en tiempo real

Lo que **queda fuera explícitamente**:

- JWT/OASIS identity (TASK-11 si interesa)

- WebRTC layer 3 (gran plan dossier-layer2-bridge)

- Bridge SSB ↔ Rooms

---

## Decisiones que necesito de ti antes de crear TASK-10

1\. **Comms**: ¿confirmamos **R1** (subdominio `rooms.scriptorium.escrivivir.co`)?

2\. **Auth**: ¿vamos con **A** (shared room secret) para el MVP, dejando B (JWT) como TASK-11?

3\. **Bootstrap**: ¿empezamos con **script bash** (Opción A) o ya inviertes en **paquete CLI publicado** (Opción B)?

4\. **Server Rooms**: ¿lo dejamos **dentro del contenedor Node-RED** cambiando el bind a `0.0.0.0`, o lo separamos a un **service compose propio** `scriptorium-rooms`? (Recomiendo separar --- es más limpio y se puede escalar/reiniciar sin tocar Node-RED).

Con esas cuatro respuestas ya escribo `TASK-10_PUB_ROOMS_FEDERATED.md` con: anclas, decisiones, bloques R10-01..R10-N, criterio de aceptación y handoff al runbook.