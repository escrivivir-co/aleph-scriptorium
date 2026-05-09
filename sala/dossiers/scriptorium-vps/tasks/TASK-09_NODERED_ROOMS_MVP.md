# TASK-09 — Node-RED Rooms MVP

> **Estado:** cerrada — MVP implementada y validada en VPS el 2026-05-09
> **Agente recomendado:** `nodered-curator`
> **Dependencias:** VPS-04, VPS-06, VPS-08
> **Entrega esperada:** contrib Dashboard 2 + flow template para observar/inicializar Rooms con `@alephscript/mcp-core-sdk`

> **Trazabilidad viva:** esta task queda como documento de diseño/histórico. La trazabilidad técnica operativa se consolida en `tasks/TASK-04_STACK_NODERED.md` y el hilo dev/ops vigente se devuelve a `ScriptoriumVps/RUNBOOK.md`.

## Cierre operativo — 2026-05-09

Resultado real de implementación/ventana controlada:

- package publicado en Verdaccio: `node-red-dashboard-2-alephscript-rooms@0.1.0`;
- flow candidato activado en Node-RED a partir de `ScriptoriumVps/node-red-projects/rooms-mvp-candidate.flow.json`;
- endpoints verificados:
   - `https://scriptorium.escrivivir.co/ui/` → `200`
   - `https://scriptorium.escrivivir.co/dashboard/` → `200`
   - `https://scriptorium.escrivivir.co/dashboard/rooms` → `200`
   - `https://admin.scriptorium.escrivivir.co/red/` → `200`
- UI validada con `managed-port`, `GET_SERVER_STATE`, 3 dummy agents conectados y room `ROOMS_LAB` visible.

Salvedad abierta para el hilo runbook:

- la activación actual del MVP sobrevive al reinicio del contenedor, pero todavía no está endurecida frente a recreación completa del contenedor porque los paquetes del MVP se instalaron dentro de `/data` y el flow activo reside en `/data/flows.json`.

Con esto, `TASK-09` queda cerrada y congelada como referencia de decisión/diseño. Cualquier hardening posterior debe continuar desde `TASK-04` + `RUNBOOK`.

## Lee primero

1. `ScriptoriumVps/RUNBOOK.md`
2. `sala/dossiers/scriptorium-vps/tasks/TASK-04_STACK_NODERED.md`
3. `sala/dossiers/scriptorium-vps/tasks/TASK-06_STACK_VERDACCIO.md`
4. `WiringEditor/packages/node-red-contrib-alephscript/`
5. `WiringEditor/packages/node-red-contrib-alephscript-escribiente/`
6. `AAIAGallery/frontend/src/app/pages/general/about/`
7. `AAIAGallery/frontend/src/app/services/socketio/server.service.ts`
8. `ARCHIVO/DEVOPS/SESION_DENIS/GPT-PLAN-DRAW.md`
9. `ARCHIVO/DEVOPS/SESION_DENIS/SCRIPTORIUM-BOOTSTRAP-PLAN.md`

## Diagnóstico consolidado

### Qué ya existe

- `@alephscript/mcp-core-sdk@1.3.0` está publicado en `https://npm.scriptorium.escrivivir.co`.
- El SDK incluye cliente/servidor Socket.IO con protocolo de rooms:
  - `AlephScriptServer`
  - `AlephScriptClient`
  - `BaseRoomManager`
  - `CLIENT_REGISTER`
  - `CLIENT_SUSCRIBE`
  - `ROOM_MESSAGE`
  - `MAKE_MASTER`
  - `GET_SERVER_STATE` / `SET_SERVER_STATE`
- `AAIAGallery/frontend` ya consume `@alephscript/mcp-core-sdk` y usa `GET_SERVER_STATE` para pintar:
  - namespaces
  - sockets/clients
  - usuarios/miembros
  - rooms
  - apps/lista de threads
- `WiringEditor/packages/node-red-contrib-alephscript` ya contiene un `alephscript-room-tester`, pero es un widget antiguo con HTML/JS embebido; no sigue el patrón Vue + Dashboard 2 aplicado en `node-red-contrib-alephscript-escribiente`.
- `node-red-dashboard-2-alephscript-escribiente` ya demuestra el patrón correcto:
  - `node-red-dashboard-2.widgets`
  - bundle UMD en `resources/`
  - `ui/components/*.vue`
  - `group.register(...)`
  - eventos `onSocket`
  - `prepublishOnly = npm run build:full`
- `ScriptoriumVps/PATTERN-DOCKER/nodered/node-red-contribs.json` ya instala contribs por manifiesto, sin trato especial por paquete.

### Divergencias encontradas

- En `SESION_DENIS` aparece una arquitectura `scriptorium-channels-server` / `mcp-room` separada con `/mesh/*`, `/socket.io`, `/ui` y Socket.IO Admin UI.
- En el dossier vigente `VPS-04` la decisión confirmada es **Node-RED single-instance**, con `/red`, `/ui`, `/dashboard`, projects y contribs gestionados por manifiesto.
- `admin.scriptorium.escrivivir.co/red/` responde Node-RED 4.1; `admin.scriptorium.escrivivir.co/dashboard/` y `scriptorium.escrivivir.co/dashboard/` dan 404 si no hay flujo Dashboard 2 desplegado.

## Decisión operativa para MVP

No añadir ahora un cuarto contenedor `scriptorium-channels-server`.

Para el MVP, Node-RED debe ser el punto de operación pedagógica de Rooms:

1. Crear un contrib nuevo o refactorizar el contrib actual para exponer un widget Dashboard 2 moderno.
2. Usar `@alephscript/mcp-core-sdk` como implementación de protocolo Rooms.
3. Entregar un flow template donde un server y varios agentes dummy operen contra rooms y muestren feedback en UI.
4. Mantener la opción de contenedor separado como fase posterior si aparecen necesidades reales de aislamiento, carga, auth independiente o exposición pública de `/mesh/*`.

La razón: ya tenemos Verdaccio y Node-RED vivos; añadir otro servicio ahora aumenta Caddy/env/secrets/superficie de ataque antes de tener validado el uso básico.

## Paquetes candidatos

### P0 — recomendado

`node-red-dashboard-2-alephscript-rooms`

Rol:

- Paquete Dashboard 2 específico para Rooms MVP.
- Look & feel similar a `node-red-dashboard-2-alephscript-escribiente`.
- Publicable en Verdaccio bajo patrón `node-red-contrib-alephscript*` / `node-red-dashboard-2-alephscript-*` si se ajusta `config.yaml` o se mantiene nombre compatible.

Nodos mínimos:

1. `alephscript-rooms-config`
   - URL del servidor Rooms.
   - namespace, por defecto `/runtime`.
   - modo server: `external`, `managed-port` o `same-origin`.
2. `alephscript-rooms-server`
   - arranca o apunta a `AlephScriptServer`.
   - emite estado periódico o bajo demanda.
   - expone `GET_SERVER_STATE` para la UI.
3. `alephscript-rooms-agent-dummy`
   - crea uno o varios `AlephScriptClient` dummy.
   - registra usuario/sesión.
   - suscribe/desuscribe rooms.
   - envía mensajes de prueba.
4. `alephscript-rooms-dashboard`
   - widget Vue Dashboard 2.
   - tarjetas de namespaces, sockets, clients, usuarios, rooms.
   - controles join/leave/send.
   - log de eventos.

### P1 — refactor de deuda existente

`node-red-contrib-alephscript`

Rol:

- Mantener nodos genéricos AlephScript.
- Convertir `alephscript-room-tester` viejo a patrón Dashboard 2 Vue o marcarlo legacy.
- Sustituir dependencia local `file:../../../MCPGallery/...tgz` por `@alephscript/mcp-core-sdk` desde Verdaccio.

### P2 — futuro opcional

`@alephscript/channels-server` o `@alephscript/mcp-channels-sdk`

Rol:

- Servicio separado con `/mesh/health`, `/mesh/rooms`, `/mesh/capabilities`, `/socket.io` y Socket.IO Admin UI.
- Sólo cuando el MVP Node-RED demuestre que merece aislar runtime y auth.

## UI mínima

Inspiración directa:

- `AAIAGallery/frontend/src/app/pages/general/about/about.component.html`
- `AAIAGallery/frontend/src/app/pages/general/about/about.component.ts`
- `AAIAGallery/frontend/src/app/pages/application/feature/logger/`
- `WiringEditor/packages/node-red-contrib-alephscript-escribiente/ui/components/EscribienteDashboardRecorder.vue`

Pantallas del widget:

1. **Estado servidor**
   - connected/disconnected
   - clients totales
   - namespace activo
   - último `SET_SERVER_STATE`
2. **Namespaces**
   - nombre
   - sockets count
3. **Rooms**
   - room id
   - miembros
   - master si se puede inferir
4. **Usuarios / sockets**
   - usuario
   - sesiones
5. **Dummy lab**
   - crear N agentes
   - room objetivo
   - join / leave
   - send test message
6. **Log**
   - `CLIENT_REGISTER`
   - `CLIENT_SUSCRIBE`
   - `MAKE_MASTER`
   - `ROOM_MESSAGE`
   - `GET/SET_*`

## Spike técnico obligatorio

Antes de implementar definitivo, validar cómo adjuntar Socket.IO server en Node-RED:

1. Preferido: enganchar Socket.IO al mismo servidor HTTP de Node-RED, misma origin y mismo Caddy.
2. Alternativa: `managed-port` dentro del contenedor Node-RED, por ejemplo `3010`, accesible desde Caddy como `scriptorium-nodered:3010` si se decide ruta pública.
3. Fallback: proceso hijo gestionado por nodo Node-RED, sin Docker separado.

Criterio del spike:

- `GET_SERVER_STATE` desde un cliente browser devuelve rooms, miembros y namespaces.
- Dashboard 2 widget puede conectarse sin exponer secretos permanentes al navegador.
- El contenedor Node-RED reinicia limpiamente sin puertos zombie.

Resultado técnico actual del MVP en workspace:

- **modo recomendado por defecto:** `managed-port`;
- **`same-origin` queda experimental/no predeterminado** mientras el SDK siga creando su propio Socket.IO con path estándar `/socket.io`, porque eso puede colisionar con el stack Socket.IO ya usado por Dashboard 2 en Node-RED;
- el widget Dashboard 2 del MVP no conecta directamente desde el browser al runtime Rooms: envía comandos al flow Node-RED y los nodos server/dummy ejecutan la operación contra el runtime.

## Backlog operativo

### R09-01 — Normalizar dependencia del SDK

- Cambiar paquetes WiringEditor que dependan de `.tgz` local a `@alephscript/mcp-core-sdk` desde Verdaccio.
- Añadir/validar `.npmrc` de desarrollo si procede.
- Build local de `node-red-contrib-alephscript`.

Aceptación:

- `npm install` resuelve el SDK desde Verdaccio o desde configuración controlada.
- `npm run build:full` pasa.

### R09-02 — Crear package Rooms Dashboard 2

- Scaffold basado en `node-red-contrib-alephscript-escribiente`.
- `package.json` con metadata Verdaccio obligatoria (`author`, `maintainers`).
- `vite.config.mjs` para UMD.
- `node-red-dashboard-2.widgets` configurado.

Aceptación:

- Build genera `dist/` y `resources/<widget>.umd.js`.

### R09-03 — Implementar widget Vue Rooms

- Tarjetas de namespaces/rooms/usuarios/sockets.
- Log de eventos.
- Controles dummy: join, leave, send.

Aceptación:

- El widget renderiza estado vacío.
- El widget procesa `SET_SERVER_STATE`.

### R09-04 — Implementar server/agent dummy

- Nodo server o config que use `AlephScriptServer`.
- Nodo dummy que cree varios `AlephScriptClient`.
- Mensajes `CLIENT_REGISTER`, `CLIENT_SUSCRIBE`, `MAKE_MASTER`, `ROOM_MESSAGE`.

Aceptación:

- Tres agentes dummy aparecen en `rooms` y `miembros`.
- Al salir de room, deja de recibir mensajes de prueba.

### R09-05 — Flow template Node-RED

- Crear project/flow ejemplo en `ScriptoriumVps/node-red-projects/` o export JSON candidato.
- Dashboard 2 group/tab para Rooms.
- Inyectores/debugs para demostrar protocolo.

Aceptación:

- `/dashboard/` deja de devolver 404 cuando el flow está desplegado.
- El flow funciona tras reinicio de Node-RED.

### R09-06 — Publicar en Verdaccio

- Publicar package Rooms en `npm.scriptorium.escrivivir.co`.
- Verificar metadata visible.
- Añadir al manifiesto de contribs Node-RED cuando proceda.

Aceptación:

- `npm view <paquete>` funciona contra Verdaccio.
- Node-RED puede instalar el package por manifiesto.

### R09-07 — Actualizar RUNBOOK

- Añadir sección Node-RED Rooms MVP.
- Checks:
  - `/red/`
  - `/dashboard/`
  - package instalado
  - flow Rooms activo
  - rooms dummy visibles

Aceptación:

- El RUNBOOK permite levantar/verificar el MVP sin leer esta task completa.

## No objetivos del MVP

- No implementar autenticación completa de rooms.
- No exponer `/mesh/*` público todavía.
- No montar Socket.IO Admin UI pública todavía.
- No integrar AAIAGallery completo.
- No migrar todos los flows históricos.
- No añadir Docker separado salvo resultado explícito del spike.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Socket.IO no se engancha limpiamente al server Node-RED | Spike R09 antes de construir UI final; fallback `managed-port`. |
| Browser no puede conectar a puerto interno | Preferir same-origin; si no, Caddy route específica en ventana controlada. |
| Paquete `node-red-contrib-alephscript` usa `.tgz` local | R09-01 antes de publicar. |
| Dashboard 2 404 | Crear flow con tab/group/dashboard real; no basta con instalar package. |
| Mezcla de protocolos legacy `join_room` vs `CLIENT_SUSCRIBE` | Para MVP usar protocolo SDK publicado: `CLIENT_SUSCRIBE`, `ROOM_MESSAGE`, `MAKE_MASTER`, `GET_SERVER_STATE`. |

## Criterio de cierre

- Hay un package Rooms candidato con estilo Dashboard 2 moderno.
- Hay flow template reproducible.
- Hay server/client dummy demostrando Rooms.
- La UI muestra namespaces, sockets, clients, usuarios y rooms.
- El procedimiento queda documentado en RUNBOOK.
- No se ha introducido un contenedor nuevo salvo decisión posterior documentada.
