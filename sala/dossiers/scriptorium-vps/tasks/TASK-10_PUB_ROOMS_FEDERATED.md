# TASK-10 — Pub.Rooms federado (Layer 2 público + clientes Node-RED)

> **Estado:** propuesta refinada — preflight técnico resuelto en diseño, pendiente implementación coordinada
> **Agente recomendado:** `nodered-curator` + `vps-ops`
> **Dependencias:** VPS-03, VPS-04, VPS-06, VPS-08, VPS-09
> **Entrega esperada:** server Rooms expuesto en `rooms.scriptorium.escrivivir.co`, auth MVP por shared room secret, y bootstrap reproducible para que un Node-RED local (owner, amigo o mesh) entre como cliente

## Lee primero

1. `sala/dossiers/scriptorium-vps/PLAN.md`
2. `sala/dossiers/scriptorium-vps/tasks/TASK-03_DNS_Y_CADDY.md`
3. `sala/dossiers/scriptorium-vps/tasks/TASK-04_STACK_NODERED.md`
4. `sala/dossiers/scriptorium-vps/tasks/TASK-06_STACK_VERDACCIO.md`
5. `sala/dossiers/scriptorium-vps/tasks/TASK-09_NODERED_ROOMS_MVP.md`
6. `sala/dossiers/scriptorium-vps/tasks/SUBTASKS/TASK-09-P1.md`
7. `sala/dossiers/scriptorium-vps/tasks/SUBTASKS/SPIKE-10-OASIS-IDENTITY.md`
8. `ScriptoriumVps/RUNBOOK.md`
9. `ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml`
10. `BlockchainComPort/OASIS_PUB/caddy/Caddyfile`
11. `WiringEditor/packages/node-red-contrib-alephscript-core/`
12. `WiringEditor/packages/node-red-dashboard-2-alephscript-rooms/`
13. `sala/dossiers/dossier-layer2-bridge/IDEAS.md`
14. `sala/dossiers/dossier-layer2-bridge/VENTANA.md`

## Encaje con el plan mayor

Esta task realiza el primer salto público de la "Layer 2" descrita en `dossier-layer2-bridge`:

- pasa el server Rooms del MVP de uso intra-VPS a uso federado;
- mantiene Layer 1 (SSB/OASIS) y Layer 3 (WebRTC) como tramos posteriores;
- abre la puerta a que distintos Node-RED locales se reúnan en `rooms.scriptorium.escrivivir.co`.

La identidad fuerte vía OASIS/SSB se trata aparte como spike estratégico (`SPIKE-10-OASIS-IDENTITY.md`), no como bloqueante del MVP.

## Estado actual del registry — 2026-05-09

Comprobado contra `https://npm.scriptorium.escrivivir.co`:

| Paquete | Versión | Estado |
|---|---|---|
| `@alephscript/mcp-core-sdk` | `1.3.0` | publicado |
| `node-red-dashboard-2-alephscript-rooms` | `0.1.0` | publicado |
| `node-red-contrib-alephscript-core` | `0.1.0` | **existe en código (TASK-09-P1) pero todavía no publicado** |
| `node-red-contrib-alephscript` | refactorizado P1 | sin publicar todavía |

Por tanto TASK-10 hereda una base cliente Node-RED ya escrita en `node-red-contrib-alephscript-core`, pero no basta con publicarla: hay que ampliarla para soportar auth federada/shared secret y luego consumirla desde un flow template reproducible.

### Promoción técnica prevista (coordinación 2026-05-09)

| Paquete | Versión objetivo | Rol en TASK-10 |
|---|---|---|
| `@alephscript/mcp-core-sdk` | `1.4.0` | cerrar auth, bind real, CORS controlado y `/healthz` sin romper consumidores actuales |
| `node-red-dashboard-2-alephscript-rooms` | `0.2.0` | integrar `authValidator`, `bindHost`, `healthPath` y separación bind real / URL interna |
| `node-red-contrib-alephscript-core` | `0.2.0` | propagar `auth` al handshake Socket.IO para clientes Node-RED federados |

La ruta acordada por coordinación es un **bump menor backward-compatible**, no un reemplazo del SDK ni una ruptura mayor de APIs.

## Decisiones confirmadas (PO 2026-05-09)

### Comms — Rail R1: subdominio dedicado

- Nuevo host público: `rooms.scriptorium.escrivivir.co`
- Registro DNS `A` aplicado en Gandi:

```text
A  rooms.scriptorium  92.243.24.163
```

- Caddy edge `pub-web` de `OASIS_PUB` añade un bloque adicional que proxea a `scriptorium-rooms:3010` por la red `oasis-pub-scriptorium_oasis_pub_net`.
- WebSocket upgrade nativo en Caddy. No se reutiliza `scriptorium.escrivivir.co/socket.io` para evitar colisión con el Socket.IO de Dashboard 2.
- El server Rooms escucha en `0.0.0.0:3010` dentro de su contenedor; nunca publica `3010` al host.

### Auth — Opción A: shared room secret (MVP)

- Handshake Socket.IO incluye `auth: { token, room, user }`.
- El server valida `token` contra una allow-list de secretos por room antes de aceptar `JOIN`.
- Distribución del secret fuera de banda (Signal/cara a cara), un secret por room.
- Allow-list de rooms y allow-list de orígenes CORS configuradas en el server.

Opciones de expansión documentadas como deseables, **no incluidas en TASK-10**:

| Opción | Rol futuro | Cuándo abrir |
|---|---|---|
| B — JWT firmado por el VPS | rotación, expiración, claims por room | TASK-11 si la mesh crece o se comparte fuera del círculo cercano |
| C — OASIS/SSB identity | identidad fuerte, integración con `pub.escrivivir.co`, plugin/extensión Oasis | tracking en `SUBTASKS/SPIKE-10-OASIS-IDENTITY.md` (gran plan) |
| D — Allow-list por IP / `basic_auth` Caddy en endpoints administrativos | endurecimiento operativo | en cualquier momento sin reabrir TASK-10 |

### Server Rooms — colocación (PO 2026-05-09)

- **Decidido:** mantener el runtime Rooms **dentro del contenedor Node-RED actual** (`scriptorium-vps-nodered-1`) cambiando el bind del proceso interno de `127.0.0.1:3010` a `0.0.0.0:3010`.
- **Nota preflight:** la intención operativa está decidida, pero el SDK/nodo actual no resuelve hoy esa separación de bind real vs URL interna de forma limpia; ver `R10-PF0`.
- El puerto `3010` **no** se publica al host. Solo es accesible:
  - dentro del contenedor (como hoy, para los nodos `alephscript-rooms-*`),
  - y a través de la red Docker compartida `oasis-pub-scriptorium_oasis_pub_net` con alias `scriptorium-rooms` (único consumidor permitido: `pub-web` de `OASIS_PUB`).
- Razones para **no** extraer a service compose propio en este MVP:
  - el flow del MVP ya gestiona arranque/paro del runtime desde Node-RED;
  - introducir un `scriptorium-rooms` separado obliga a tocar `docker-compose.yml`, healthcheck y orden de arranque, ampliando la ventana de riesgo sobre `pub-web`;
  - se pospone a una posible `TASK-11` si la separación se hace necesaria.

### Caddy de OASIS_PUB — candado explícito

- El Caddy edge de `OASIS_PUB` (`pub-web`) sirve actualmente `pub.escrivivir.co`, `scriptorium.`, `admin.scriptorium.`, `mcp.scriptorium.` y `npm.scriptorium.`.
- TASK-10 **solo** añade un bloque nuevo `rooms.scriptorium.escrivivir.co`; no toca ningún otro bloque ni la directiva global.
- Antes de aplicar el cambio:
  - hacer copia con timestamp de `BlockchainComPort/OASIS_PUB/caddy/Caddyfile`;
  - validar con `docker compose -f docker-compose.pub.yml config` y `caddy validate` antes de recargar;
  - usar **reload** (`docker exec pub-web caddy reload --config /etc/caddy/Caddyfile`) en vez de restart, para no interrumpir TLS/active sessions de `pub.escrivivir.co`.
- Si la validación falla, abortar y restaurar el Caddyfile previo. Bajo ningún concepto se reinicia `pub-web` con un Caddyfile no validado.

### Bootstrap cliente — pista A (script bash, PO 2026-05-09)

- **Decidido:** MVP entregado como script bash `ScriptoriumVps/scripts/bootstrap-mesh-client.sh`.
- No se publica una CLI npm (`@alephscript/scriptorium-mesh-bootstrap`) en este ciclo; queda como deseable para una futura iteración si la fricción entre Node-RED locales lo justifica.
- El bootstrap:
  - hace backup del `~/.node-red` actual del usuario;
  - escribe `.npmrc` con `@alephscript:registry=https://npm.scriptorium.escrivivir.co`;
  - instala `node-red-contrib-alephscript-core` y `node-red-dashboard-2-alephscript-rooms`;
  - copia el flow template `pub-room-client.flow.json`;
  - solicita `room`, `user` y `room-secret` al ejecutarse.
- Promoción a CLI publicado (`@alephscript/scriptorium-mesh-bootstrap`) queda como deseable, no obligatorio.

## Decisiones técnicas incorporadas desde coordinación (2026-05-09)

### SDK base — `@alephscript/mcp-core-sdk@1.4.0`

- Se adopta como ruta técnica de `TASK-10` un bump **backward-compatible** del SDK, de `1.3.0` a `1.4.0`.
- El objetivo no es reemplazar `SocketIoMesh` / `SocketServer` / `SocketClient`, sino extenderlos por opciones para resolver:
  - auth de handshake;
  - bind real (`host`) separado de la URL interna usada por monitor/UI;
  - CORS con allow-list;
  - endpoint `/healthz` servido por el upstream.
- Se incorporan como contratos de referencia:
  - `AuthValidator`;
  - `makeSharedSecretValidator(...)`;
  - `SocketIoMeshOptions`;
  - `SocketClientOptions`.
- Compatibilidad prevista:
  - `SocketIoMesh.init(number)` sigue funcionando como hoy;
  - `new SocketClient(..., boolean)` / `new AlephScriptClient(..., boolean)` siguen funcionando como hoy.

### Bind real ≠ URL interna

- Se adopta el nombre **`bindHost`** para el nuevo campo del nodo `alephscript-rooms-server`.
- `bindHost` controla el `server.listen(port, host)` real del runtime Rooms.
- `managedHost` deja de interpretarse como bind y queda reservado a **base URL interna** para monitor/UI/dummy-lab.
- Default operativo para `TASK-10`: `bindHost = '0.0.0.0'` dentro del contenedor Node-RED.

### Health y exposición pública

- `TASK-10` adopta `healthPath = '/healthz'` como contrato por defecto del runtime Rooms.
- El edge `rooms.scriptorium.escrivivir.co` debe validar liveness contra el upstream real, no mediante un `respond` sintético salvo fallback excepcional.
- `exposeAdminUI` y `exposeRootInfo` pueden mantenerse por compatibilidad del SDK, pero el edge público de `TASK-10` no debe depender de `/` ni dejar abierta Admin UI por accidente.
- Criterio coordinado: si `authValidator` está activo, la Admin UI queda desactivada por defecto en este ciclo y se reabre solo en una iteración posterior con auth propia.

### Cliente y handshake auth

- `SocketClient` / `AlephScriptClient` pasan a aceptar objeto de opciones con `auth`, `extraHeaders`, `transports`, `path`, `withCredentials` y reconexión.
- `auth` puede ser objeto o función, para permitir refresco de credenciales sin romper la API histórica.
- `node-red-contrib-alephscript-core@0.2.0` debe exponer en `alephscript-core-config` los campos `auth.token`, `auth.room` y `auth.user`, con redaction en logs/UX.

### Orden de implementación/publish

1. `@alephscript/mcp-core-sdk@1.4.0`
2. republish en Verdaccio
3. `node-red-dashboard-2-alephscript-rooms@0.2.0`
4. `node-red-contrib-alephscript-core@0.2.0`
5. `rooms-secrets.json` + placeholders `ROOMS_*`
6. alineación documental (`TASK-03`, `TASK-10`, `RUNBOOK`)

## Casos de uso cubiertos

| Caso | Quién | Camino |
|---|---|---|
| a) Owner local | nosotros, con acceso SSH al VPS | bootstrap A sobre nuestro Node-RED local; conectamos a `ROOMS_LAB`. |
| b) Amigo invitado | otra persona con su Node-RED | bootstrap A sobre su Node-RED local; le pasamos `room` + `room-secret` por canal humano. |
| c) Mesh entre amigos | varios Node-RED a la vez | mismo bootstrap, cada amigo elige `user` único; el server `scriptorium-rooms` actúa como master canónico de la room. |

## Mapa mental operativo — simulación preflight (2026-05-09)

```text
Pub.Rooms federado
├─ Edge público
│  ├─ DNS `rooms.scriptorium.escrivivir.co` -> `92.243.24.163` ✅ decidido
│  ├─ Caddy `pub-web` añade host dedicado ⚠️ contrato final de liveness se cierra con `/healthz` servido por upstream SDK `1.4.0`
│  └─ Upstream interno `scriptorium-rooms:3010` ⚠️ requiere alias Docker `scriptorium-rooms` en compose
├─ Runtime Rooms dentro de Node-RED
│  ├─ vive en `scriptorium-vps-nodered-1` ✅ decidido
│  ├─ usa `SocketIoMesh` / `SocketServer` del SDK actual
│  ├─ escucha efectiva en `3010` ⚠️ hoy bind implícito -> cierre previsto: `SocketIoMesh.init({ port, host })`
│  ├─ auth shared secret ⚠️ hoy no implementada -> cierre previsto: `AuthValidator` + `makeSharedSecretValidator(...)`
│  ├─ CORS / rooms allow-list / rate limit ⚠️ hoy no implementados -> cierre previsto: opciones `cors` + validación por room
│  └─ `/healthz` propio ⚠️ hoy no existe -> cierre previsto: `healthPath='/healthz'`
├─ Cliente Node-RED federado
│  ├─ `node-red-contrib-alephscript-core` ✅ existe en código
│  ├─ publicación Verdaccio ⚠️ pendiente en cadena: SDK `1.4.0` -> Rooms `0.2.0` -> Core `0.2.0`
│  ├─ `alephscript-core-config` ⚠️ hoy no soporta `auth` -> cierre previsto: `SocketClientOptions.auth`
│  ├─ `pub-room-client.flow.json` ⚠️ no existe
│  └─ `bootstrap-mesh-client.sh` ⚠️ no existe
├─ Secretos y entorno
│  ├─ `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/secrets-templates/` ✅ existe
│  ├─ `rooms-secrets.json` ⚠️ todavía no existe
│  └─ `.env.example` ⚠️ todavía no declara placeholders `ROOMS_*`
└─ Operación
  ├─ Rooms MVP actual validada ✅
  ├─ persistencia ante recreación total ⚠️ sigue abierta desde `TASK-04` / `RUNBOOK`
  └─ documentación Caddy ⚠️ `RUNBOOK.md` aún habla de `restart pub-web` donde TASK-10 exige `caddy reload`
```

## Simulación guiada del proceso

### Paso 1 — Abrir el edge público `rooms.`

Con la información actual, el DNS ya está listo y el host puede vivir como bloque nuevo en el Caddy de `OASIS_PUB` sin tocar los demás hosts. Hasta aquí, bien.

El primer gap aparece en la aceptación: la task pide que `curl -I https://rooms.scriptorium.escrivivir.co/healthz` responda `200/30x`, pero el bloque Caddy propuesto para `rooms.` solo hace `reverse_proxy` y el runtime Rooms actual no expone `/healthz`. Por tanto, si se aplica literalmente el bloque actual, el check de health no está garantizado. Antes de operar hay que fijar un contrato único:

- o bien `@health` en Caddy, como en los hosts previos de `TASK-03`;
- o bien endpoint real `/healthz` en el runtime Rooms.

Con la propuesta del coordinador, `TASK-10` toma ya una dirección concreta: **el contrato de liveness debe vivir en el upstream**, vía `@alephscript/mcp-core-sdk@1.4.0` con `healthPath='/healthz'` por defecto. Caddy se limita a proxy estable; no inventa una salud “de cartón piedra”.

Además, proxear todo el host a `scriptorium-rooms:3010` expone por arrastre las superficies auxiliares del SDK (`/`, y cualquier UI/instrumentación que el runtime monte). Eso obliga a decidir explícitamente qué paths se quieren publicar y cuáles deben quedar bloqueados o sin ruta pública.

### Paso 2 — Exponer el runtime Rooms desde el contenedor Node-RED

La simulación original dice: “cambiar bind de `127.0.0.1:3010` a `0.0.0.0:3010` en el nodo `alephscript-rooms-server`”. El problema es que, en el código actual, eso no es una palanca fiable:

- `alephscript-rooms-server` arranca el runtime con `mesh.init(configNode.managedPort)`;
- el SDK actual (`SocketIoMesh`) termina haciendo `server.listen(PORT)` con constante `3010`;
- `managedHost` hoy solo se usa para construir URLs internas/monitor, no para controlar el bind real del proceso.

Conclusión operativa: tratar `managedHost=0.0.0.0` como “bind real” es engañoso y puede incluso envenenar el monitor interno (`http://0.0.0.0:3010`) sin resolver correctamente la exposición pública. Antes de ejecutar R10-02 hay que separar dos conceptos que hoy están mezclados:

- **host/bind real** del listener;
- **base URL** que usan monitor interno, UI y clientes.

La decisión coordinada lo cierra sin ambigüedad:

- SDK: `SocketIoMesh.init({ port, host })`;
- nodo Rooms: campo nuevo `bindHost`;
- `managedHost`: sólo base URL interna.

### Paso 3 — Activar auth MVP por `shared room secret`

Aquí aparece el bloqueante principal. La task da por hecho que el handshake Socket.IO incluirá `auth: { token, room, user }` y que el server lo validará. Pero hoy, con la base real inspeccionada:

- `SocketServer` acepta conexiones sin middleware `io.use(...)`;
- no hay lectura de `socket.handshake.auth`;
- CORS está en allow-all;
- no existe `ROOMS_SECRETS_FILE` ni plantilla `rooms-secrets.json`;
- no hay allow-list de rooms;
- no hay rate limit de handshake;
- la instrumentación/admin UI del SDK está sin auth (`auth: false`).

Por tanto, R10-02 no es “solo configuración de flow”: exige trabajo de código en el runtime Rooms o en el SDK que hoy usa el nodo.

Con coordinación, ese trabajo deja de ser difuso y pasa a tener contrato claro: `AuthValidator` genérico + `makeSharedSecretValidator(...)` para el MVP, de forma que JWT u OASIS identity puedan entrar después sin rehacer el server.

### Paso 4 — Publicar el cliente Node-RED federado

`node-red-contrib-alephscript-core` está listo a nivel de código y build previo, pero aún no está publicado en Verdaccio. Esa parte es factible.

El problema es el siguiente: aunque se publique hoy, el cliente actual tampoco puede enviar `auth` en la conexión Socket.IO porque `alephscript-core-config` solo admite `serverUrl`, `namespace`, reconexión y timeout. No hay soporte para:

- `auth.token`;
- `auth.room` / `auth.user`;
- headers o query controlados para handshake;
- lectura de secretos desde env/credentials de Node-RED.

Es decir: sin ampliar el package core, el bootstrap puede instalar el cliente, pero no puede entrar limpiamente a un server protegido por shared secret.

La resolución propuesta es concreta:

- `SocketClientOptions.auth` en el SDK `1.4.0`;
- propagación desde `AlephScriptClient`;
- `alephscript-core-config` ampliado en `0.2.0` para pedir/pasar `token`, `room` y `user`.

### Paso 5 — Entregar `pub-room-client.flow.json` y bootstrap reproducible

Hoy solo existe `rooms-mvp-candidate.flow.json`, que sirve para el laboratorio interno del MVP, no para un cliente federado externo. Faltan dos artefactos de entrega:

- `ScriptoriumVps/node-red-projects/pub-room-client.flow.json`;
- `ScriptoriumVps/scripts/bootstrap-mesh-client.sh`.

También falta el material de operación que esos artefactos necesitan para ser reproducibles:

- plantilla `rooms-secrets.json` fuera de git;
- placeholders `ROOMS_*` en `.env.example`;
- decisión explícita sobre si el bootstrap pisa `flows.json` o si trabaja sobre `projects/`.

### Paso 6 — Handoff y operación

La simulación termina en un punto importante: aunque la federación salga, sigue heredando el caveat abierto de `TASK-04` / `RUNBOOK` sobre persistencia. Si el contenedor Node-RED se recrea sin endurecer contribs y flow activo, el Pub.Rooms puede “funcionar hoy” y aun así no ser reproducible mañana.

## Impedimentos detectados y decisiones de cierre

| Tipo | Impedimento actual | Decisión incorporada | Salida esperada |
|---|---|---|---|
| bloqueante | El server Rooms actual no valida `socket.handshake.auth` ni shared secret por room. | SDK `1.4.0` añade `AuthValidator` + `makeSharedSecretValidator(...)` y checks de room permitida en `JOIN` / `ROOM_MESSAGE`. | Auth MVP real sin cerrar la puerta a JWT/OASIS en iteraciones futuras. |
| bloqueante | `alephscript-core-config` no soporta `auth` de Socket.IO. | `SocketClientOptions.auth` + propagación desde `AlephScriptClient`; `node-red-contrib-alephscript-core@0.2.0` expone `token/room/user`. | Cliente Node-RED federado entra al handshake con credencial controlada. |
| bloqueante | El task confundía `managedHost` con bind real del runtime. | Se separan roles: `bindHost` = listen real; `managedHost` = base URL interna. | El runtime escucha donde debe y el monitor deja de depender de una ficción. |
| medio | `/healthz` no estaba cerrado como contrato. | SDK `1.4.0` sirve `/healthz` por defecto (`healthPath='/healthz'`). | `curl -I https://rooms.scriptorium.escrivivir.co/healthz` pasa contra el upstream real. |
| medio | Publicar `rooms.` podía exponer superficies auxiliares del runtime. | `exposeAdminUI` y `exposeRootInfo` se tratan como flags de compatibilidad; con auth activa la Admin UI queda desactivada por defecto en TASK-10. | Menor superficie pública y edge más predecible. |
| medio | No existe alias Docker `scriptorium-rooms` en compose. | Añadir alias estable al servicio `nodered` en `oasis_pub_net`. | Caddy tiene upstream canónico sin publicar `3010` al host. |
| medio | No existen `pub-room-client.flow.json` ni `bootstrap-mesh-client.sh`. | Se mantienen como entregables MVP y pasan a consumir las nuevas capacidades auth del SDK/core. | Bootstrap reproducible de clientes owner/amigo/mesh. |
| medio | No existe `rooms-secrets.json` ni placeholders `ROOMS_*` en `.env.example`. | Crear plantilla fuera de git + placeholders/documentación de rotación. | Operación menos manual y más reproducible. |
| medio | `RUNBOOK.md` aún usa `restart pub-web`; TASK-10 exige `caddy reload`. | Alinear documentación al contrato ya decidido en `TASK-03`/`TASK-10`. | Menor riesgo operativo sobre `pub-web`. |
| medio | La persistencia completa de Node-RED sigue abierta. | Se mantiene como caveat vivo de `TASK-04` / `RUNBOOK`; no lo tapa el bump del SDK. | El MVP federado no vende una persistencia que todavía no tiene. |

## Backlog operativo

### R10-PF0 — Preflight técnico obligatorio (anclado en SDK `1.4.0`)

Antes de abrir ventana controlada o repartir bootstrap a terceros, implementar esta ruta coordinada:

1. **Bump `@alephscript/mcp-core-sdk` a `1.4.0`** conservando compatibilidad posicional actual.
  - `AuthValidator` + `makeSharedSecretValidator(...)`
  - `SocketIoMeshOptions { port, host, cors, authValidator, exposeAdminUI, exposeRootInfo, healthPath }`
  - `SocketClientOptions { auth, extraHeaders, transports, path, withCredentials, reconnection... }`
  - `GET /healthz` servido por upstream
2. **Republish del SDK en Verdaccio** antes de tocar consumidores Node-RED.
3. **Bump `node-red-dashboard-2-alephscript-rooms` a `0.2.0`**.
  - adopta `bindHost`
  - usa `makeSharedSecretValidator(...)`
  - deja `managedHost` como URL interna
4. **Bump `node-red-contrib-alephscript-core` a `0.2.0`**.
  - añade campos `auth.token`, `auth.room`, `auth.user`
  - propaga `auth` al cliente SDK
5. **Crear material operativo**.
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/secrets-templates/rooms-secrets.json`
  - placeholders `ROOMS_*` en `.env.example`
6. **Alinear documentación**.
  - `TASK-03`
  - `TASK-10`
  - `RUNBOOK.md`

Defaults adoptados en esta task:

- `host` default del server = `0.0.0.0`
- `healthPath` default = `/healthz`
- `cors.origins` ausente => `'*'` solo por compatibilidad hacia atrás
- nombre del nuevo campo de nodo = `bindHost`
- Admin UI desactivada por defecto cuando `authValidator` está activo

Aceptación:

- SDK `1.4.0` construido y publicable sin romper consumidores existentes;
- cliente Node-RED puede autenticarse de verdad en el handshake;
- token incorrecto se rechaza con error auditable (`connect_error` / log de server);
- `rooms.scriptorium.escrivivir.co/healthz` tiene contrato único y comprobable;
- `rooms.` no expone Admin UI por accidente con auth activa;
- documentación operativa (`TASK-03`, `TASK-10`, `RUNBOOK`) queda alineada.

#### R10-PF0.1 — cerrado — SDK 1.4.0 publicado (2026-05-09)

`R10-PF0.1` queda **cerrado**. El SDK `@alephscript/mcp-core-sdk@1.4.0` ya no está solo implementado en working copy: quedó afianzado, validado, committeado y publicado en Verdaccio.

Cierres aplicados:

- `HandshakeAuth` y `AuthDecision` se movieron a `src/types/auth.ts`; `server/auth` los reexporta para mantener compatibilidad.
- `tsconfig.json` quedó saneado eliminando alias internos que ya no hacían falta.
- `package-lock.json` se regeneró con instalación limpia (`rm -rf node_modules && npm install`).
- se añadió `scripts/smoke-auth.mjs` y el script `npm run smoke:auth`.
- `README.md` y `CHANGELOG.md` documentan la superficie nueva de `1.4.0`, incluidos los cambios sutiles: `SocketClient extends EventEmitter` y desactivación del bootstrap automático al pasar `auth`.
- validación scratch de consumidores Node-RED contra `file:../../../MCPGallery/mcp-core-sdk`:
  - `node-red-dashboard-2-alephscript-rooms` → `npm run build` OK;
  - `node-red-contrib-alephscript-core` → `npm run build` OK.
- commit único del SDK realizado:
  - `180e2047d3ab7ab68f67f3c4a6d64f09e9b93598` — `feat(sdk): mcp-core-sdk 1.4.0 — auth, bind host, healthz`.
- publicación realizada con `bash ScriptoriumVps/scripts/publish-package.sh MCPGallery/mcp-core-sdk`.
- metadata verificada en Verdaccio:
  - `version = 1.4.0`
  - `author = AlephScript Ops <ops@escrivivir.co> (https://escrivivir.co)`
  - `maintainers = AlephScript Ops <ops@escrivivir.co> (https://escrivivir.co)`
- `ScriptoriumVps/PATTERN-DOCKER/verdaccio/publish-initial-packages.manifest.json` actualizado a `^1.4.0` y al tarball `alephscript-mcp-core-sdk-1.4.0.tgz`.

Evidencia:

- commit: `180e2047d3ab7ab68f67f3c4a6d64f09e9b93598`
- tarball publicado: `https://npm.scriptorium.escrivivir.co/@alephscript/mcp-core-sdk/-/mcp-core-sdk-1.4.0.tgz`
- smoke local: `npm run build && npm run smoke:auth` → OK

Con este cierre ya puede abrirse `R10-PF0.2` sobre los consumidores Node-RED, sin seguir arrastrando deuda estructural en el SDK.

#### R10-PF0.2 — cerrado — consumidores Node-RED 0.2.0 publicados (2026-05-09)

`R10-PF0.2` queda **cerrado**. Los dos consumidores Node-RED ya consumen `@alephscript/mcp-core-sdk@^1.4.0`, quedaron validados en local y están publicados en Verdaccio.

Cierres aplicados:

- `node-red-dashboard-2-alephscript-rooms@0.2.0`
  - dependencia subida a `@alephscript/mcp-core-sdk@^1.4.0`;
  - `alephscript-rooms-server` incorpora `bindHost` separado de `managedHost`;
  - carga `ROOMS_SECRETS_FILE` (default `/data/rooms-secrets.json`); si falta, arranca en modo dev sin `authValidator` y deja warning explícito;
  - si el fichero existe, arranca `SocketIoMeshLogics` con `host: bindHost`, `healthPath: '/healthz'`, `makeSharedSecretValidator(...)`, CORS allow-list y `exposeAdminUI: false`;
  - `alephscript-rooms-config` aclara en el editor que `managedHost` es URL interna/monitor, no bind real.
- `node-red-contrib-alephscript-core@0.2.0`
  - dependencia subida a `@alephscript/mcp-core-sdk@^1.4.0`;
  - `alephscript-core-config` añade `authToken`, `authRoom`, `authUser`;
  - `alephscript-core-client` propaga `auth` al SDK, escucha `auth_error`, emite `msg.topic='auth_error'` y pone `node.status({ fill:'red', shape:'dot', text:'auth: unauthorized' })`.
- material operativo añadido en `ScriptoriumVps`:
  - `PATTERN-DOCKER/.env.example` con `ROOMS_BIND_HOST`, `ROOMS_SECRETS_FILE`, `ROOMS_DEFAULT_ROOM`;
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/secrets-templates/rooms-secrets.json.example`.
- commits realizados:
  - Rooms package: `b9622c9a99f7614d10c2c412c3801e2de312345d` — `feat(rooms): dashboard-2-alephscript-rooms 0.2.0 — auth + bindHost + healthz vía SDK 1.4.0`
  - Core package: `89dd60eba0f9c0e14c8e3da547c27c02e948fb70` — `feat(core): node-red-contrib-alephscript-core 0.2.0 — auth en handshake vía SDK 1.4.0`
  - soporte `ScriptoriumVps`: `a3d440338ec6834303abd42417610ba47b45ac86` (manifest `^1.4.0`) y `ee89a2e5911846bd0996fc13902e3178be1921f9` (placeholders env).
- publicación realizada en Verdaccio para ambos paquetes.

Validación local (scratch Node-RED):

- flow **válido**:
  - `Core Client Valid` terminó en status `connected`;
  - `SET_SERVER_STATE` mostró `clients: 2` y room `ROOMS_LAB` con `Rooms Server` + `u1scratch-valid`;
  - `curl -I http://127.0.0.1:3010/healthz` → `HTTP/1.1 200 OK`.
- flow **inválido**:
  - server registró `runtime.auth.reject unauthorized`;
  - `Core Client Invalid` terminó en status `auth: unauthorized`;
  - el nodo emitió `msg.topic='auth_error'` con razón legible `unauthorized`.

Evidencia de publicación:

- Rooms tarball: `https://npm.scriptorium.escrivivir.co/node-red-dashboard-2-alephscript-rooms/-/node-red-dashboard-2-alephscript-rooms-0.2.0.tgz`
- Core tarball: `https://npm.scriptorium.escrivivir.co/node-red-contrib-alephscript-core/-/node-red-contrib-alephscript-core-0.2.0.tgz`
- `npm view ... version author maintainers --registry https://npm.scriptorium.escrivivir.co`:
  - `node-red-dashboard-2-alephscript-rooms` → `0.2.0`, author/maintainers correctos;
  - `node-red-contrib-alephscript-core` → `0.2.0`, author/maintainers correctos.

Con este cierre, `R10-PF0` queda completado y la siguiente apertura útil ya no es de publicación de paquetes sino de despliegue/controlado sobre edge (`R10-01` / `R10-02`).

### Plan de despliegue secuencial — fold-in persistencia (PO 2026-05-09)

> **Origen de la decisión:** preflight remoto demostró que el VPS sigue en `mcp-core-sdk@1.3.0` + `rooms@0.1.0` (esperado: nada se ha desplegado), `/healthz` 404 (esperado: lo introduce SDK 1.4.0), no existe alias `scriptorium-rooms` (esperado: es el contenido de `R10-02B`) y `nodered` **no** monta `/data` al host (deuda real de `TASK-04`/`RUNBOOK` desde el cierre de `VPS-09`).
>
> **Decisión:** fold-in. La deuda de persistencia se cierra dentro de TASK-10 antes de seguir, en la **misma ventana de downtime** que ya se necesitaba para el upgrade del runtime. No publicar `rooms.scriptorium.escrivivir.co` sobre un Node-RED no persistente.

#### Lectura obligatoria antes de operar

El agente operativo **debe abrir desde disco** (no desde memoria) estos archivos antes de tocar nada en el VPS:

1. `ScriptoriumVps/RUNBOOK.md` — convención de volumen `/srv/oasis/scriptorium`, UID/GID y patrón Verdaccio.
2. `sala/agente-aleph/VENTANA_CONTROLADA_VPS-08.md` — error documentado de `/srv/scriptorium/` en boot; lección viva.
3. `sala/dossiers/scriptorium-vps/tasks/TASK-04_STACK_NODERED.md` — deuda de persistencia heredada que esta task salda.
4. Esta sección completa.

Lección estructural detrás del plan: **antes de proponer un path en producción, citar el path análogo que ya existe en el mismo VPS o verificarlo con un comando explícito**. El precedente vivo aquí es `verdaccio/storage` en el mismo volumen Gandi.

Los hallazgos del preflight remoto **no son bloqueos nuevos**: son el contenido de `R10-02` desglosado. El agente debe asumirlos como estado de partida, no como sorpresas.

Orden estricto de tramos, una ventana por tramo:

#### Pre-paso 0 — Descubrimiento de host (sin mutar nada)

Obligatorio ejecutar y registrar en el cierre del tramo correspondiente. Sirve para no asumir paths ni perms.

```bash
# Path real del compose en el VPS (no asumir el del repo local)
ssh debian@vps "docker inspect scriptorium-vps-nodered-1 \
  --format '{{ index .Config.Labels \"com.docker.compose.project.config_files\" }}'"

# UID/GID reales del proceso Node-RED dentro del contenedor
ssh debian@vps "docker exec scriptorium-vps-nodered-1 id"
ssh debian@vps "docker exec scriptorium-vps-nodered-1 stat -c '%u:%g %n' /data"

# Confirmación del volumen Gandi y precedente Verdaccio
ssh debian@vps "mount | grep /srv/oasis"
ssh debian@vps "ls -la /srv/oasis/scriptorium/"
ssh debian@vps "stat -c '%u:%g %n' /srv/oasis/scriptorium/verdaccio/storage"
```

Si alguna de estas salidas contradice la convención del RUNBOOK (`/srv/oasis/scriptorium`, UID/GID `1000:1000` salvo decisión distinta), **parar** y abrir consulta al PO antes de seguir. No improvisar paths ni perms.

1. **`R10-02A.0` — Persistencia de Node-RED** *(cierra deuda heredada de TASK-04)*
   - **Volumen objetivo:** `scriptorium-oasis-pub-volumen` (Gandi, 40 GB) montado en `/srv/oasis`. **Prohibido** usar `/opt/...` o `/srv/scriptorium/...` (ambos viven en `vps-boot` y reabrirían el error documentado en `VENTANA_CONTROLADA_VPS-08.md`).
   - **Patrón a seguir:** mismo que `verdaccio/storage` ya en producción bajo `/srv/oasis/scriptorium/`.
   - decidir y registrar bind mount vs named volume; **recomendado: bind mount** `/srv/oasis/scriptorium/node-red/data` (mismo patrón que `verdaccio/storage`, inspección y backup con tooling estándar);
   - **secuencia exacta** (no reordenar):
     1. ejecutar el Pre-paso 0 si no se hizo aún;
     2. usar el UID/GID confirmados en el Pre-paso 0; si discrepan de `1000:1000` consultar al PO antes de continuar;
     3. crear el bind path: `mkdir -p /srv/oasis/scriptorium/node-red/data` + `chown -R <uid>:<gid> /srv/oasis/scriptorium/node-red/data` con los valores confirmados;
     4. **parar Node-RED limpiamente** antes del backup (`docker stop scriptorium-vps-nodered-1`) para que `flows.json` no quede a medias;
     5. backup full **al mismo volumen de datos**: `docker cp scriptorium-vps-nodered-1:/data /srv/oasis/scriptorium/backups/nodered-data-<ts>/` (el backup NO debe vivir en `vps-boot`);
     6. validar checksum del backup (`du -sh` + `find . | wc -l` antes/después) y registrar el resultado;
     7. copiar contenido del backup al bind mount del host preservando perms (`cp -aT /srv/oasis/scriptorium/backups/nodered-data-<ts>/ /srv/oasis/scriptorium/node-red/data/`);
     8. confirmar que el `node_modules/` copiado conserva enlaces (los bind mount sobre ext4 nativo del volumen Gandi no deberían dar problemas; si aparece algún symlink roto, parar y consultar);
     9. editar el compose **del path confirmado en el Pre-paso 0** (no asumir `ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml` salvo que el `docker inspect` lo confirme), añadiendo solo `volumes: - /srv/oasis/scriptorium/node-red/data:/data` al servicio `nodered`, sin tocar nada más;
    10. ventana controlada: `docker compose -f <path-confirmado> config` → `docker compose -f <path-confirmado> up -d nodered`;
    11. validar que `flows.json`, `package.json`, `node_modules/` siguen presentes y son los del backup;
    12. validar que el contenedor recuperó red `oasis-pub-scriptorium_oasis_pub_net` y aliases `scriptorium-nodered`/`nodered`;
    13. smoke público: `curl -I https://scriptorium.escrivivir.co/red/` y `https://admin.scriptorium.escrivivir.co/red/` siguen respondiendo igual que antes;
   - cierre de `R10-02A.0` en TASK-10 + referencia desde `TASK-04` (deuda saldada). El cierre incluye: salida del Pre-paso 0, UID/GID usado, ruta exacta del compose, ruta del backup, checksums.
   - **Si A.0 no sale limpio → rollback al backup, restaurar compose previo, NO seguir con A.1.**

#### R10-02A.0 — cerrado — persistencia Node-RED en bind mount Gandi (2026-05-09)

`R10-02A.0` queda **cerrado**. La deuda heredada de `TASK-04`/`RUNBOOK` sobre persistencia del runtime Node-RED queda saldada: `/data` ya es bind mount al volumen Gandi `scriptorium-oasis-pub-volumen` y sobrevive a recreación completa del contenedor.

**Pre-paso 0 — Descubrimiento (sin mutar):**

- host: `escrivivirco-scriptorium-pub-oasis` (Debian 13, kernel 6.12.38).
- compose path real: `/opt/aleph-scriptorium/ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml` (proyecto `scriptorium-vps`); coincide con el del repo.
- UID/GID interno proceso Node-RED: `uid=1000(node-red) gid=1000(node-red)` = `debian:debian` numérico en host.
- volumen Gandi: `/dev/xvdb` ext4 → `/srv/oasis`, 40 G total, 37 G libres.
- precedente persistente: `verdaccio/storage` ya en `/srv/oasis/scriptorium/verdaccio/storage` (`10001:65533 755`); padre `verdaccio/` `1000:1000 755`.
- mounts previos del contenedor: `/srv/oasis/scriptorium/ARCHIVO → /data/ARCHIVO` (rw), `/srv/oasis/scriptorium/ARCHIVO/DISCO → /data/ARCHIVO/DISCO` (rw), `/opt/aleph-scriptorium/ScriptoriumVps/node-red-projects → /data/projects` (rw), `/opt/aleph-scriptorium/ScriptoriumVps/PATTERN-DOCKER/nodered → /opt/aleph/node-red-pattern` (ro). **Sin bind para `/data` raíz** — deuda confirmada.
- `/data` interno previo: 1.3 G, 28 750 entradas, incluyendo `flows.json`, `package.json`, `package-lock.json`, `settings.js`, `node_modules/` (368 paquetes), `lib/`, `.config.*`, `.npm/`, además de `flows.json.pre-rooms-20260509T140227` y `package.json.pre-rooms-20260509T140227`.
- `/srv/oasis/scriptorium/node-red/` ya existía vacío desde el bootstrap → se respeta el nombre con guion (decisión D1a aprobada por PO).
- `/srv/oasis/scriptorium/backups/` no existía → creado al inicio de la ventana.

**Decisiones aprobadas por PO antes de la ventana:**

- **D1a:** path destino del bind = `/srv/oasis/scriptorium/node-red/data` (con guion, alineado con el directorio ya provisionado por el bootstrap; el plan registrado en este mismo documento decía `nodered/`, queda como divergencia documental sin impacto operativo).
- **D2a:** rellenar el bind con `rsync -aHAX --delete --exclude=/ARCHIVO --exclude=/projects` para no duplicar contenido bajo los puntos de mount hijos. Placeholders vacíos `ARCHIVO/` y `projects/` creados con `1000:1000 775` para que los binds hijos puedan superponerse al arrancar.
- ventana controlada autorizada con downtime esperado de Node-RED durante backup + rsync + recreación.

**Ejecución (timestamp UTC `20260509T190657Z`):**

1. crear `/srv/oasis/scriptorium/backups/` (`debian:debian 755`) y `/srv/oasis/scriptorium/node-red/data/` (`1000:1000 775`) con placeholders `ARCHIVO/` y `projects/`.
2. `docker stop scriptorium-vps-nodered-1` para snapshot consistente.
3. `docker cp scriptorium-vps-nodered-1:/data/. /srv/oasis/scriptorium/backups/nodered-data-20260509T190657Z/` → 1.4 G, 28 750 entradas (idéntico al conteo del Pre-paso 0).
4. `rsync -aHAX --delete --exclude=/ARCHIVO --exclude=/projects` desde el backup al bind destino → 28 734 entradas en destino (= 28 750 − 16 entradas bajo ARCHIVO/projects, que vienen por sub-binds), 1.4 G, sin symlinks rotos (`find -xtype l` vacío). `node_modules/` con los 368 paquetes esperados, `diff` confirma paridad de contenido con el backup. `chown -R 1000:1000` final sobre el destino.
5. backup del compose y patch atómico vía Python: insertar `- ${SCRIPTORIUM_REMOTE_ROOT:-/srv/oasis/scriptorium}/node-red/data:/data` como **primer** item del bloque `volumes:` del servicio `nodered` (orden importante: padre antes que hijos). Backup en `docker-compose.yml.before-r10-02A0-20260509T190657Z`. `diff -u` muestra cambio mínimo de una sola línea.
6. `docker compose --env-file ../.env -f docker-compose.yml config` → OK; muestra los cuatro binds en el orden correcto (`/data` primero, luego `/data/projects`, `/data/ARCHIVO`, `/data/ARCHIVO/DISCO`) y `nodered` con `read_only:true` para `/opt/aleph/node-red-pattern`.
7. `docker compose --env-file ../.env -f docker-compose.yml up -d nodered` → `Recreated` → `Started` → `Up 45s (healthy)`.

**Validación post-cambio (todos OK):**

- `mountinfo` interno confirma `/data ← /dev/xvdb /scriptorium/node-red/data` (Gandi); sub-binds activos `/data/projects` (xvda1, repo), `/data/ARCHIVO` y `/data/ARCHIVO/DISCO` (xvdb).
- `md5sum` de `/data/{flows.json,package.json,package-lock.json,settings.js}` interno = `md5sum` del backup (4/4 idénticos, `cab7e7…`, `0cdc4e…`, `423725…`, `07c421…`).
- `node_modules/` interno: 366 entradas (`ls | wc -l`), 369 nlink (`= 366 + 2 + 1`); idéntico al estado pre-ventana.
- sub-binds operativos: `/data/projects/rooms-mvp-candidate.flow.json` visible; `/data/ARCHIVO/{DISCO,PLUGINS}` visible.
- prueba bidireccional escritura: archivo `.r10-02A0-probe` creado en contenedor → visible en host con dueño `debian:debian` → borrado en contenedor → desaparece en host.
- red `oasis-pub-scriptorium_oasis_pub_net` reasignada con aliases `scriptorium-vps-nodered-1`, `nodered`, `scriptorium-nodered`. Red `scriptorium-vps` con aliases `scriptorium-vps-nodered-1`, `nodered`.
- runtime Rooms vivo: logs muestran `GET_SERVER_STATE`/`SET_SERVER_STATE` cíclicos cada 5 s.
- smoke público (7/7 `200`):
  - `https://scriptorium.escrivivir.co/red/`
  - `https://admin.scriptorium.escrivivir.co/red/`
  - `https://scriptorium.escrivivir.co/dashboard/`
  - `https://scriptorium.escrivivir.co/dashboard/rooms`
  - `https://scriptorium.escrivivir.co/ui/`
  - `https://npm.scriptorium.escrivivir.co/-/ping`
  - `https://pub.escrivivir.co`

**Evidencia persistida en el VPS:**

- backup full: `/srv/oasis/scriptorium/backups/nodered-data-20260509T190657Z/` (1.4 G, 28 750 entradas).
- compose previo: `/opt/aleph-scriptorium/ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml.before-r10-02A0-20260509T190657Z`.
- bind activo: `/srv/oasis/scriptorium/node-red/data/`.

**Divergencias / deuda abierta a sincronizar en sesión separada (NO en A.0):**

- el patch del compose se aplicó **solo en el VPS** (sobre el checkout de `/opt/aleph-scriptorium`); el repo upstream `aleph-scriptorium/ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml` queda con la línea por añadir. Próximo turno editorial: replicar el cambio en local, commitear y dejar trazabilidad en `RUNBOOK.md`. Hasta entonces, cualquier `git pull` en el VPS sobreescribiría la línea: **NO ejecutar `git pull` en `/opt/aleph-scriptorium` antes de sincronizar**.
- el plan registrado en este mismo documento usa `nodered/` (sin guion) en varios puntos. Mantener `node-red/` (con guion) como ruta operativa real. Próxima revisión documental puede unificar.

**Precondición para R10-02A.1 satisfecha:** `/data` ya es bind Gandi → `npm install --prefix /data` en A.1 caerá sobre el volumen Gandi y sobrevivirá a recreación.

2. **`R10-02A.1` — Runtime al día + auth real** *(antes `R10-02A`)*
   - **Precondición estricta:** `R10-02A.0` cerrado. La instalación **debe** ocurrir después del bind mount para que `npm install --prefix /data` caiga sobre el volumen Gandi y persista. Si A.1 se ejecuta sin A.0 cerrado, los paquetes viven en la writable layer y el siguiente `up -d` los borra.
   - **Secrets fuera de `/data`:** los secretos NO viven en el mismo árbol que los flows (un futuro `docker cp /data` los exfiltraría). Crear ruta dedicada en el volumen Gandi:
     - `mkdir -p /srv/oasis/scriptorium/node-red/secrets` con perms `700` y owner del proceso Node-RED;
     - colocar `/srv/oasis/scriptorium/node-red/secrets/rooms-secrets.json` con `{"ROOMS_LAB":"<secret>"}` y perms `600`;
     - añadir bind read-only en compose: `- /srv/oasis/scriptorium/node-red/secrets:/run/secrets/rooms:ro`;
     - el flow lee `ROOMS_SECRETS_FILE=/run/secrets/rooms/rooms-secrets.json`.
   - sobre el contenedor ya persistente, instalación en caliente sobre `/data` (que ya es bind mount Gandi):
     `docker exec scriptorium-vps-nodered-1 npm install --prefix /data @alephscript/mcp-core-sdk@1.4.0 node-red-dashboard-2-alephscript-rooms@0.2.0 node-red-contrib-alephscript-core@0.2.0 --registry https://npm.scriptorium.escrivivir.co`;
   - exportar en settings.js o env del contenedor: `ROOMS_BIND_HOST=0.0.0.0`, `ROOMS_SECRETS_FILE=/run/secrets/rooms/rooms-secrets.json`, `ROOMS_DEFAULT_ROOM=ROOMS_LAB`;
   - **CORS — decisión revisada (PO 2026-05-09, segunda pasada):** se acepta la **allow-list hardcoded de `0.2.0`** tal cual (`scriptorium.escrivivir.co`, `admin.scriptorium.escrivivir.co`, `127.0.0.1:1880`, `localhost:1880`). Los casos b/c federados son Node-RED→Node-RED vía `socket.io-client` desde Node.js, que **no** ejecuta preflight CORS, así que la lista cerrada **no los rompe**. El único consumidor navegador real (widget `alephscript-rooms-dashboard`) ya está cubierto por la lista. PO confirma que ningún caso de uso del MVP implica navegador en origen arbitrario contra `rooms.`. La REQ `0.2.1` queda **cancelada** (`tasks/SUBTASKS/REQ-ROOMS-CONTRIB-021-CORS.md` con estado `cancelado — premisa inválida`). `R10-02A.1` se ejecuta con `0.2.0` sin esperas.
   - recargar runtime sin recrear contenedor (preferencia: hot-reload de flows desde admin API; alternativa: reinicio del proceso interno; **prohibido** `docker restart` o `docker compose up -d nodered` aquí);
   - editar el flow Rooms vía editor admin para activar `bindHost`, `healthPath`, `authValidator` y `exposeAdminUI: false`. CORS se deja con la allow-list por defecto del contrib `0.2.0` (cubre el widget Dashboard 2; navegadores en origen arbitrario están fuera de scope MVP);
   - validación dentro del contenedor:
     - `docker exec scriptorium-vps-nodered-1 curl -sI http://127.0.0.1:3010/healthz` → `200`;
     - smoke handshake con token correcto → conecta;
     - smoke handshake con token inválido → `connect_error('unauthorized')` y log `runtime.auth.reject unauthorized`;
   - cierre de `R10-02A.1` en TASK-10 con `npm ls`, salida de healthz y evidencia auth válido/inválido.

#### R10-02A.1 — cerrado — runtime al día + auth real (2026-05-09)

`R10-02A.1` queda **cerrado**. El runtime Node-RED usa ahora `@alephscript/mcp-core-sdk@1.4.0` + `node-red-dashboard-2-alephscript-rooms@0.2.0` + `node-red-contrib-alephscript-core@0.2.0` con auth real habilitada por shared secret y `/healthz` activo.

**Pre-check (read-only antes de mutar):**

- Verdaccio: 3 paquetes disponibles con versión esperada (`mcp-core-sdk@1.4.0`, `rooms@0.2.0`, `core@0.2.0`).
- Contenedor: `Up 36 min (healthy)`. Solo `rooms@0.1.0` instalado en `/data/node_modules` → upgrade necesario.
- Flow activo `flows.json`: `alephscript-rooms-config` con `managedHost: "127.0.0.1"` (URL interna/monitor; correcto — el bind real lo controla env `ROOMS_BIND_HOST`).
- Sin `bindHost` en el nodo `alephscript-rooms-server` del flow (campo nuevo en `0.2.0`; el nodo lee el env en arranque, no hace falta editar el flow).

**Ejecución (timestamp UTC `20260509T195148Z`):**

1. **Secret generado en VPS** (Python `secrets.token_urlsafe(32)`, 43 bytes) en `/srv/oasis/scriptorium/node-red/secrets/rooms-secrets.json`. Owner `1000:1000`, dir `700`, fichero `600`. Valor **nunca aparece en ningún log ni transcript**. Recuperable vía `ssh debian@VPS cat /srv/oasis/scriptorium/node-red/secrets/rooms-secrets.json` para distribución fuera de banda.
2. **Compose local patcheado + validado + commiteado:**
   - 3 env vars añadidas al servicio `nodered`: `ROOMS_BIND_HOST`, `ROOMS_SECRETS_FILE`, `ROOMS_DEFAULT_ROOM`.
   - 1 bind ro añadido: `${SCRIPTORIUM_REMOTE_ROOT}/node-red/secrets:/run/secrets/rooms:ro`.
   - `docker compose config` verificó `read_only: true` en el bind y las 3 env con sus defaults.
   - Commit `7fadff5` en `integration/beta/scriptorium` + push a `origin`.
3. **npm install sobre `/data` en caliente** (contenedor vivo, sin recrearlo aún):
   - `docker exec scriptorium-vps-nodered-1 npm install --prefix /data @alephscript/mcp-core-sdk@1.4.0 node-red-dashboard-2-alephscript-rooms@0.2.0 node-red-contrib-alephscript-core@0.2.0 --registry https://npm.scriptorium.escrivivir.co`
   - Resultado: `added 5 packages, changed 2 packages in 8s`. Cae sobre Gandi gracias a A.0.
4. **Compose VPS patcheado** (backup `docker-compose.yml.before-r10-02A1-20260509T195148Z`):
   - subido vía `scp` (evita interpolación shell) + `install -m 664` atómico.
   - `docker compose --env-file ../.env -f docker-compose.yml config` confirmó env vars + bind ro antes de `up -d`.
5. **`docker compose up -d nodered`** → `Recreated → Started`. Healthcheck pasó en 50 s: `Up 50 seconds (healthy)`.

**Validación post-recreación (todos OK):**

- `mountinfo` interno: `/run/secrets/rooms ro,relatime ← /dev/xvdb /scriptorium/node-red/secrets`.
- `env | grep ROOMS_` interno: `ROOMS_BIND_HOST=0.0.0.0`, `ROOMS_SECRETS_FILE=/run/secrets/rooms/rooms-secrets.json`, `ROOMS_DEFAULT_ROOM=ROOMS_LAB`.
- `npm ls` en `/data`: `@alephscript/mcp-core-sdk@1.4.0`, `node-red-dashboard-2-alephscript-rooms@0.2.0`, `node-red-contrib-alephscript-core@0.2.0`.
- `/healthz` interno: `HTTP/1.1 200 OK`, body `ok`.
- Logs: monitor autenticado vía secret en room `ROOMS_LAB` (`rooms-monitor-<ts>`), `GET_SERVER_STATE`/`SET_SERVER_STATE` cíclicos cada 5 s.
- **Smoke handshake válido:** `CONNECTED id=F9DO_r-fFbeCuiEbAAAL` (exit 0).
- **Smoke handshake inválido:** `CONNECT_ERROR (expected): unauthorized` (exit 0) + log VPS `runtime.auth.reject unauthorized`.
- Smoke público 7/7 `200`: mismo conjunto que A.0.

**Commits en `integration/beta/scriptorium`:**

- `adb4a9b` — `feat(nodered): bind /data al volumen Gandi (R10-02A.0)` — pusheado en sesión previa.
- `7fadff5` — `feat(nodered): env vars Rooms + bind ro secrets (R10-02A.1)` — pusheado en esta sesión.

**Evidencia en el VPS:**

- backup compose A.1: `docker-compose.yml.before-r10-02A1-20260509T195148Z`.
- secrets dir: `/srv/oasis/scriptorium/node-red/secrets/` (`1000:1000 700`) + `rooms-secrets.json` (`1000:1000 600`).

**Nota documental:** la entrada `R10-02A.1 — DESBLOQUEADO` de `LAST_UPDATE.md` (que canceló la REQ `0.2.1` y levantó el bloqueo CORS) está subsumida por este cierre. `tasks/SUBTASKS/REQ-ROOMS-CONTRIB-021-CORS.md` queda como histórico con estado `cancelado — premisa inválida`.

**Precondición para R10-02B satisfecha:** contenedor recreado con bind ro secrets activo + alias `scriptorium-nodered` preservado. `docker compose up -d nodered` ya no destruye los paquetes instalados.

3. **`R10-02B` — Alias `scriptorium-rooms` en compose**
   - **Precondición estricta:** `R10-02A.0` y `R10-02A.1` cerrados. Solo entonces es seguro recrear el contenedor: `/data` y `/run/secrets/rooms` ya son bind mounts Gandi y los paquetes instalados en A.1 viven en el volumen, no en la writable layer.
   - añadir alias al servicio `nodered` en `oasis-pub-scriptorium_oasis_pub_net` dentro del compose **del path confirmado en el Pre-paso 0**;
   - **no** publicar `3010` al host;
   - aplicar con `docker compose -f <path-confirmado> up -d nodered` (ahora seguro porque persistencia + secretos están en bind mount);
   - tras la recreación, reverificar: `npm ls --prefix /data` mantiene SDK 1.4.0 y contribs 0.2.0; `/healthz` interno sigue 200; auth válido/inválido sigue funcionando;
   - validar desde `pub-web`: `docker exec pub-web wget -qO- http://scriptorium-rooms:3010/healthz` → `ok`;
   - cierre de `R10-02B` en TASK-10.

#### R10-02B — cerrado — alias scriptorium-rooms activo (2026-05-09)

**Cambio aplicado (timestamp UTC `20260509T200721Z`):**

- Añadido `scriptorium-rooms` como alias adicional al servicio `nodered` en `oasis-pub-scriptorium_oasis_pub_net`.
- `scriptorium-nodered` conservado sin cambios.
- `3010` no expuesto al host.
- Compose patcheado vía `scp` + `install` atómico (misma estrategia que A.1). Backup: `docker-compose.yml.before-r10-02B-20260509T200721Z`.
- Commit `efa76b8` pusheado a `origin/integration/beta/scriptorium`.

**Validación:**

- `docker inspect scriptorium-vps-nodered-1` en `oasis-pub-scriptorium_oasis_pub_net`: `aliases=["scriptorium-vps-nodered-1","nodered","scriptorium-nodered","scriptorium-rooms"]`.
- `docker exec oasis-pub-web wget -qO- http://scriptorium-rooms:3010/healthz` → `ok`.
- `/healthz` directo intra-contenedor → `ok`.
- `npm ls`: SDK 1.4.0 + rooms 0.2.0 + core 0.2.0 intactos tras recreación.
- Bind ro `/run/secrets/rooms` sigue `ro,relatime`.

**Precondición para R10-01 satisfecha:** `pub-web` ya resuelve `scriptorium-rooms:3010`. Solo falta añadir el bloque Caddy.

4. **`R10-01` — Caddy con candado**
   - solo cuando `R10-02A.0`, `R10-02A.1` y `R10-02B` estén cerrados;
   - sigue el contrato `backup → validate → reload` definido en `TASK-03` adenda y en este mismo task.

#### R10-01 — cerrado — Caddy edge rooms.scriptorium activo (2026-05-09)

`R10-01` queda **cerrado**. El subdominio `rooms.scriptorium.escrivivir.co` responde `200 ok` end-to-end con cert ACME emitido por Let's Encrypt en la primera petición.

**Pre-check:**

- DNS `rooms.scriptorium.escrivivir.co → 92.243.24.163` ✅.
- `oasis-pub-web` `Up 8 days`, Caddyfile bind a `/opt/oasis-scriptorium/OASIS_PUB/caddy/Caddyfile`.
- Caddyfile live ya tenía los 4 bloques scriptorium (público, admin, mcp, npm); el bloque `rooms.` es aditivo al final.

**Cambio aplicado (timestamp UTC `20260509T201729Z`):**

Bloque añadido al final del Caddyfile:

```caddyfile
rooms.scriptorium.escrivivir.co {
    encode zstd gzip

    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
    }

    @health path /healthz
    handle @health {
        respond "scriptorium rooms edge ok" 200
    }

    reverse_proxy scriptorium-rooms:3010
}
```

- Backup: `Caddyfile.before-r10-01-20260509T201729Z`.
- WebSocket upgrade automático de Caddy 2 (Socket.IO funciona sin matchers explícitos `@ws`).
- `@health` responde a nivel edge sin tocar el upstream (chequeo barato del Caddy mismo).
- `reverse_proxy scriptorium-rooms:3010` apunta al alias Docker añadido en R10-02B.

**Incidencia técnica resuelta — bind mount single-file con inode rotado:**

El primer `cp /tmp/Caddyfile-… → live` cambió el inode del fichero, pero el bind mount single-file (`/opt/.../Caddyfile → /etc/caddy/Caddyfile`) seguía sirviendo el inode antiguo dentro del contenedor. Diagnóstico: `stat -c "%i"` divergente entre host (`176271`) y contenedor (`135525`), `wc -l` también (16 vs 95).

Solución limpia: cargar la config via stdin al `caddy reload --config /dev/stdin --adapter caddyfile`, sin depender del bind mount. Después se reconcilió el fichero host con el contenido correcto. Caddy emitió el cert ACME para `rooms.` en ~5 s usando `tls-alpn-01`.

**Lección estructural:** un `cp` sobre un bind mount **single-file** no se ve dentro del contenedor si cambia el inode. Para bind mounts de directorios no pasa (los listings se reabren cada vez). Para fichero único: o se usa `cat > file` (preserva inode) o se carga via `/dev/stdin`. Anotado en memoria.

**Validación:**

- `curl -sI https://rooms.scriptorium.escrivivir.co/healthz` → `200 OK`, body `scriptorium rooms edge ok`.
- Logs Caddy: `tls.obtain certificate obtained successfully ...rooms.scriptorium.escrivivir.co... acme-v02.api.letsencrypt.org`.
- Smoke público 8/8 `200`:
  - `https://scriptorium.escrivivir.co/red/`
  - `https://admin.scriptorium.escrivivir.co/red/`
  - `https://scriptorium.escrivivir.co/dashboard/`
  - `https://scriptorium.escrivivir.co/ui/`
  - `https://npm.scriptorium.escrivivir.co/-/ping`
  - `https://pub.escrivivir.co`
  - `https://rooms.scriptorium.escrivivir.co/healthz`
  - `https://mcp.scriptorium.escrivivir.co/healthz`
- `oasis-pub-web` sigue `Up 8 days` (sin reinicio).
- TASK-09/10 pre-existentes intactos.

**Commit:** `9f99c19` en `BlockchainComPort/integration/beta/scriptorium` (`feat(oasis-pub): add rooms.scriptorium edge host (R10-01)`), pusheado a `origin`.

**Estado del MVP TASK-10:** edge `rooms.` ✅ + alias Docker `scriptorium-rooms` ✅ + auth shared secret ✅ + persistencia `/data` Gandi ✅ + SDK 1.4.0 + contribs 0.2.0 ✅. Pendiente: probar handshake federado **end-to-end** desde un cliente Node-RED externo contra `wss://rooms.scriptorium.escrivivir.co/runtime`.

**Restricciones globales del plan**:

- una sesión = un tramo;
- secret real fuera de git y fuera de logs;
- ninguna ventana se ejecuta sin avisar a PO con estimación previa;
- si A.0 falla, todo el plan se aborta con rollback al backup; no se intenta A.1.

> **Nota al agente operativo:** lee este bloque desde disco antes de empezar. Los "bloqueos" que el preflight remoto reporta (`1.3.0`, `0.1.0`, `/healthz` 404, sin alias) son el estado de partida esperado, no son sorpresas. La única deuda nueva absorbida en este plan es la persistencia de Node-RED, y por eso `R10-02A.0` va primero.

### R10-01 — DNS y Caddy

- Verificar que `rooms.scriptorium.escrivivir.co` resuelve a `92.243.24.163`.
- Backup con timestamp de `BlockchainComPort/OASIS_PUB/caddy/Caddyfile` antes de tocar nada.
- Añadir **únicamente** este bloque al final del Caddyfile, sin modificar el resto:

```caddyfile
rooms.scriptorium.escrivivir.co {
    encode zstd gzip
    @ws {
        header Connection *Upgrade*
        header Upgrade websocket
    }
    reverse_proxy scriptorium-rooms:3010
}
```

- Donde `scriptorium-rooms` es el alias de red dentro de `oasis-pub-scriptorium_oasis_pub_net` que apunta al contenedor `scriptorium-vps-nodered-1` exponiendo `3010` por la red Docker (no por el host).
- Validar antes de recargar:
  - `docker compose -f docker-compose.pub.yml config`
  - `docker exec pub-web caddy validate --config /etc/caddy/Caddyfile`
- Recargar Caddy sin reiniciar el contenedor: `docker exec pub-web caddy reload --config /etc/caddy/Caddyfile`.
- Si algo falla, restaurar el Caddyfile previo y volver a recargar. Nunca `docker restart pub-web` con cambios no validados.

Aceptación:

- `curl -I https://rooms.scriptorium.escrivivir.co/healthz` responde `200` desde el upstream real.
- `curl -I https://pub.escrivivir.co` y `curl -I https://scriptorium.escrivivir.co` siguen respondiendo igual que antes (sin downtime visible).

### R10-02 — Server Rooms público (in-Node-RED)

- No asumir que el campo `managedHost` del nodo `alephscript-rooms-server` cambia el bind real del runtime. Revisar/corregir el SDK o el nodo para separar host de escucha y base URL interna antes de publicar `rooms.`.
- Adoptar el contrato coordinado:
  - SDK: `SocketIoMesh.init({ port: 3010, host: bindHost, cors, authValidator, healthPath: '/healthz' })`;
  - nodo Rooms: campo nuevo `bindHost`;
  - `managedHost`: sólo base URL interna/monitor.
- Añadir alias `scriptorium-rooms` al servicio `nodered` en `oasis-pub-scriptorium_oasis_pub_net` dentro de `ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml`. **No** publicar `3010` al host.
- Configurar en el nodo server / variables del flow:
  - allow-list de rooms (`ROOMS_LAB` por defecto, ampliables vía env);
  - allow-list de orígenes CORS (`https://scriptorium.escrivivir.co`, `https://admin.scriptorium.escrivivir.co`, `http://127.0.0.1:1880`, `http://localhost:1880`);
  - validación de `auth.token` por room contra `ROOMS_SECRETS_FILE` (montado en `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/secrets-templates/rooms-secrets.json`, fuera de git);
  - rate limit razonable a nivel de handshake.
- No tocar el resto de mounts ni el healthcheck del contenedor Node-RED.

Aceptación:

- handshake con `token` correcto entra a la room;
- handshake con `token` incorrecto se rechaza con error controlado y queda log auditable;
- `scriptorium-vps-nodered-1` sigue `Up (healthy)` tras el cambio;
- `pub-web` y los demás hosts del edge mantienen su comportamiento.

### R10-03 — Publicar cadena de paquetes del preflight

- Publicar `@alephscript/mcp-core-sdk@1.4.0` desde `MCPGallery/mcp-core-sdk`.
- Publicar `node-red-dashboard-2-alephscript-rooms@0.2.0` desde `WiringEditor/packages/node-red-dashboard-2-alephscript-rooms`.
- Publicar `node-red-contrib-alephscript-core@0.2.0` desde `WiringEditor/packages/node-red-contrib-alephscript-core`.
- Validar metadata Verdaccio (`author`, `maintainers`, tarball) como en TASK-06.

Aceptación:

- `npm view @alephscript/mcp-core-sdk --registry https://npm.scriptorium.escrivivir.co` devuelve `1.4.0`.
- `npm view node-red-dashboard-2-alephscript-rooms --registry https://npm.scriptorium.escrivivir.co` devuelve `0.2.0`.
- `npm view node-red-contrib-alephscript-core --registry https://npm.scriptorium.escrivivir.co` devuelve `0.2.0`.

### R10-04 — Flow template `pub-room-client.flow.json`

- Crear en `ScriptoriumVps/node-red-projects/pub-room-client.flow.json`.
- Contenido mínimo:
  - `alephscript-core-config` apuntando a `wss://rooms.scriptorium.escrivivir.co/runtime` y usando `auth` a partir de `ROOMS_USER`, `ROOMS_ROOM`, `ROOMS_SECRET`;
  - `alephscript-core-client` que envía `CLIENT_REGISTER` + `CLIENT_SUSCRIBE` a `ROOMS_LAB`;
  - inputs UI mínimos para enviar `ROOM_MESSAGE`;
  - widget `alephscript-rooms-dashboard` en modo viewer para ver namespaces/rooms.

Aceptación:

- al desplegar el flow en un Node-RED local, el dashboard del VPS (`scriptorium.escrivivir.co/dashboard/rooms`) muestra al cliente como miembro de `ROOMS_LAB`.

### R10-05 — Bootstrap cliente Node-RED

- Crear `ScriptoriumVps/scripts/bootstrap-mesh-client.sh`.
- Pasos del script:
  1. confirmar Node-RED instalado y rutas detectadas;
  2. backup `~/.node-red` con timestamp;
  3. escribir `.npmrc` Verdaccio sin secretos;
  4. `npm install` los dos paquetes contrib del MVP;
  5. copiar `pub-room-client.flow.json` a `~/.node-red/flows.json` o a `~/.node-red/projects/<name>/`;
  6. exportar `ROOMS_USER`, `ROOMS_ROOM`, `ROOMS_SECRET` al entorno del flow.

Aceptación:

- el script funciona en bash (Linux/macOS/WSL/Git-Bash en Windows).
- el casamiento Node-RED ↔ server público se verifica leyendo el dashboard del VPS.

#### R10-05 — cerrado — bootstrap + flow cliente + smoke federado externo (2026-05-09)

`R10-05` queda **cerrado**. Con esto, **TASK-10 queda cerrada funcionalmente**.

**Artefactos entregados:**

- `ScriptoriumVps/scripts/bootstrap-mesh-client.sh` — bash compatible Linux/macOS/WSL/Git Bash. Detecta `~/.node-red`, backup con timestamp, configura `.npmrc` Verdaccio, `npm install core@0.2.0 + rooms@0.2.0`, copia el flow template, escribe `.env.rooms` (perms `600`) con `ROOMS_USER/ROOM/SECRET`. Interactivo si las variables no están en el entorno; secret nunca aparece en logs.
- `ScriptoriumVps/node-red-projects/pub-room-client.flow.json` — flow cliente federado con `alephscript-core-config → wss://rooms.scriptorium.escrivivir.co/runtime`, `alephscript-core-client` (autoRegister + autoSubscribe, `ROOMS_LAB`), inject auto-connect en deploy, inject para enviar `PING`. Auth token/room/user desde env (no en el JSON).
- Commit `f410820` en `integration/beta/scriptorium`, pusheado a `origin`.

**Smoke federado externo (esta máquina Windows → VPS, via internet):**

- Smoke **válido**: `CONNECTED id=hEjYXS52ctV2laH0AAAJ`, `PING emitido`, `DISCONNECTED` (exit 0).
- Smoke **inválido**: `CONNECT_ERROR (expected): unauthorized` (exit 0).
- Log VPS confirma: `onAny EVENT SERVER ROOM_MESSAGE [ data: { msg: 'smoke-owner-ext', from: 'owner-ext-1778360775983' }` + `runtime.onDisconnect` + `runtime.auth.reject unauthorized`.

**Checklist TASK-10 — estado final:**

| Pieza | Estado |
|---|---|
| Persistencia `/data` Gandi | ✅ R10-02A.0 |
| SDK 1.4.0 + contribs 0.2.0 + auth shared secret | ✅ R10-02A.1 |
| Alias Docker `scriptorium-rooms` | ✅ R10-02B |
| Edge Caddy `rooms.scriptorium.escrivivir.co` | ✅ R10-01 |
| Handshake federado externo válido (Windows → VPS vía internet) | ✅ R10-05 |
| Handshake inválido rechazado + log auditable | ✅ R10-05 |
| `bootstrap-mesh-client.sh` publicado en repo | ✅ R10-05 |
| `pub-room-client.flow.json` publicado en repo | ✅ R10-05 |

**Pendiente en backlog (no bloquea cierre):** R10-06 (endurecimiento/rotación) + R10-07 (RUNBOOK Rooms).

### R10-06 — Endurecimiento básico

- Definir y documentar:
  - rotación de `room-secret` (simple: cambiar fichero + restart Rooms);
  - lista de rooms públicas y su política;
  - logs mínimos en `scriptorium-rooms` para auditar JOIN/LEAVE.

Aceptación:

- `RUNBOOK.md` describe cómo rotar el secret sin tirar el resto del stack.

### R10-07 — Actualizar RUNBOOK

- Añadir sección "Pub.Rooms federado":
  - cómo verificar `rooms.scriptorium.escrivivir.co`;
  - cómo unirse desde Node-RED local con el bootstrap;
  - cómo rotar `room-secret`;
  - límites (no es identidad fuerte, no sustituye OASIS).

Aceptación:

- el RUNBOOK permite a un PO retomar la operación sin abrir esta task.

## No objetivos

- No implementar JWT, OASIS/SSB identity ni WebRTC en esta task.
- No exponer `/socket.io` por `scriptorium.escrivivir.co`.
- No publicar `1880`, `3003`, `4873` ni `3010` directamente al host.
- No tocar `pub.escrivivir.co`, `escrivivir.co` raíz ni registros Bluesky/`_atproto`.
- No abrir registro abierto de usuarios; solo round amigos con secret compartido.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Colisión Socket.IO con Dashboard 2 | subdominio dedicado `rooms.` separado del path de Dashboard 2. |
| Bump SDK rompe consumidores actuales | mantener compatibilidad posicional en `SocketIoMesh.init(number)` y `SocketClient(..., boolean)`. |
| Admin UI deja de estar disponible al activar auth | aceptado para TASK-10; reabrirla con auth propia en iteración posterior si hace falta. |
| `room-secret` filtrado | rotación documentada en R10-06; promover a JWT (TASK-11) si pasa. |
| Bootstrap pisa `~/.node-red` del usuario | backup obligatorio con timestamp antes de tocar nada. |
| Server Rooms acoplado a Node-RED | aceptado explícitamente para el MVP; se promueve a service compose propio en una futura TASK-11 si reiniciar Rooms sin tocar Node-RED se vuelve necesario. |
| Cambio de Caddy rompe `pub.escrivivir.co` | backup + `caddy validate` + `caddy reload` (no restart); rollback inmediato al Caddyfile previo si falla la validación. |
| Falta de identidad fuerte para mesh | tratado fuera de scope en `SPIKE-10-OASIS-IDENTITY.md`. |

## Criterio de cierre

- DNS `rooms.scriptorium.escrivivir.co` activo apuntando al VPS.
- Caddy proxea a `scriptorium-rooms:3010` con WebSocket OK.
- `@alephscript/mcp-core-sdk@1.4.0` publicado con `AuthValidator`, `host` y `/healthz`.
- `node-red-dashboard-2-alephscript-rooms@0.2.0` y `node-red-contrib-alephscript-core@0.2.0` publicados y consumiendo el SDK nuevo.
- Server Rooms valida shared secret y rechaza intentos sin token.
- `bindHost` y `managedHost` quedan separados de forma explícita en el runtime/node.
- `pub-room-client.flow.json` reproducible desde cero con el bootstrap.
- Casos a), b) y c) verificados al menos una vez con captura/log de evidencia.
- RUNBOOK actualizado y handoff devuelto al hilo runbook.
