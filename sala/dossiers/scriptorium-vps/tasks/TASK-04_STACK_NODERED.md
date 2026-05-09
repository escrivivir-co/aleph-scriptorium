# TASK-04 — Stack Node-RED (contenedor único)

> **Estado:** cerrada
> **Agente recomendado:** `nodered-curator`
> **Dependencias:** VPS-01, VPS-03
> **Entrega esperada:** stack Docker Node-RED con Dashboard clásico + Dashboard 2 y projects monorepo

> **⚠️ Refactor aplicado** (2026-05-08): diseño anterior usaba dos contenedores separados para público/admin. Se unifica en un solo `nodered`; el público ve `/red` en read-only y la escritura la controla `adminAuth`.

## Lee primero

1. `WiringEditor/README-SCRIPTORIUM.md`
2. `WiringEditor/packages/`
3. `sala/dossiers/scriptorium-vps/RESPUESTAS.md`
4. Documentación oficial Node-RED Projects y Dashboard cuando sea necesario

## Objetivo

Provisionar una única instancia Node-RED que sirva editor/flujos públicos en modo read-only (`/red`) y dashboards públicos (`/ui`, `/dashboard`), reservando edición/deploy al admin autenticado mediante `adminAuth` en `settings.js`. Debe inicializar Dashboard clásico y Dashboard 2 por defecto.

## Cambios requeridos

- Crear Dockerfile Node-RED en `ScriptoriumVps/PATTERN-DOCKER/nodered/`.
- Crear **un único** `settings.js` con env-vars que soporte:
  - `adminAuth.users` con admin bcrypt y `permissions: "*"`.
  - Usuario opcional `viewer` con `permissions: "read"`.
  - `adminAuth.default = { permissions: "read" }` para público anónimo read-only.
  - `httpAdminRoot=/red` para servir el editor pedagógico.
  - `projects.enabled=true` y `projectsDir=/data/projects`.
  - `credentialSecret` vía env/secret, nunca hardcodeado.
- Activar ambos dashboards:
  - Dashboard clásico: `/ui`
  - Dashboard 2: `/dashboard`
- Montar `node-red-projects/` desde el monorepo con acceso read-write (la restricción de escritura la aplica `adminAuth`, no el filesystem).
- No hardcodear ni precargar `node-red-contrib-alephscript-escribiente` de forma especial.
- Preparar instalación de contribs según manifiesto monorepo, igual para todos.

## Informe operativo

### Adenda — Rooms MVP validado (2026-05-09)

El stack Node-RED single-instance quedó validado en operación real con un primer caso pedagógico completo de Dashboard 2:

- package publicado: `node-red-dashboard-2-alephscript-rooms@0.1.0`;
- flow candidato: `ScriptoriumVps/node-red-projects/rooms-mvp-candidate.flow.json`;
- ruta pública activa: `https://scriptorium.escrivivir.co/dashboard/rooms`;
- comprobaciones HTTP en ventana controlada:
  - `/ui/` → `200`
  - `/dashboard/` → `200`
  - `/dashboard/rooms` → `200`
  - `admin.scriptorium.escrivivir.co/red/` → `200`
- runtime Rooms del MVP en modo `managed-port`, dentro del contenedor Node-RED, con 3 dummy agents en `ROOMS_LAB` y `GET_SERVER_STATE` operativo.

Trazabilidad funcional consolidada:

- `alephscript-rooms-server` monitoriza el runtime y emite `SET_SERVER_STATE`;
- `alephscript-rooms-agent-dummy` crea/gestiona agentes `AlephScriptClient` de laboratorio;
- `alephscript-rooms-dashboard` expone namespaces, rooms, usuarios, sockets, dummy lab y log.

### Caveat actual de persistencia

La validación operativa fue satisfactoria, pero el endurecimiento del stack Node-RED queda como hilo abierto del runbook:

- los contribs del MVP se instalaron en el contenedor vivo bajo `/data`;
- el flow activo se materializó en `/data/flows.json`;
- esto es suficiente para una validación en producción controlada y reinicio del contenedor, pero no garantiza persistencia total tras una recreación/rebuild completa.

> **Actualización 2026-05-09 — deuda saldada en `R10-02A.0`:** `/data` ya es bind mount al volumen Gandi `scriptorium-oasis-pub-volumen` (`/srv/oasis/scriptorium/node-red/data`), con backup full en `/srv/oasis/scriptorium/backups/nodered-data-20260509T190657Z/` y compose previo en `docker-compose.yml.before-r10-02A0-20260509T190657Z`. Sub-binds `/data/projects`, `/data/ARCHIVO` y `/data/ARCHIVO/DISCO` se superponen correctamente. md5 de `flows.json`/`package.json`/`package-lock.json`/`settings.js` idénticos al pre-cambio. Cierre detallado en `TASK-10_PUB_ROOMS_FEDERATED.md` §`R10-02A.0`. **Atención:** el patch se aplicó solo en el VPS; el compose del repo upstream queda pendiente de sincronizar antes de cualquier `git pull` en `/opt/aleph-scriptorium`.

Handoff:

- `TASK-09` queda cerrada y no debe seguir usándose como runbook vivo;
- cualquier siguiente paso de hardening/persistencia debe continuar desde `RUNBOOK.md` y este `TASK-04`.

### Containers

| Container | Upstream Caddy | Roles | Volumen projects | Notas |
|---|---|---|---|---|
| `nodered` | `scriptorium.escrivivir.co` (público) y `admin.scriptorium.escrivivir.co` (admin) | Editor público read-only + dashboards + admin autenticado con escritura | read-write | Host público permite `/red`; Node-RED lo sirve en read-only por `adminAuth.default`. Host admin puede añadir `basic_auth` extra y usa admin `permissions: "*"`. |

> **Nota de implementación**: Caddy en `scriptorium.escrivivir.co` debe proxear `/red`, `/ui`, `/dashboard` y recursos necesarios al mismo upstream `nodered:1880` sin Basic Auth global. Caddy puede añadir TLS, headers y rate limiting; la autorización de lectura/escritura la aplica Node-RED con `adminAuth.default = { permissions: "read" }`. El virtual host `admin.scriptorium.escrivivir.co` puede añadir `basic_auth` como capa extra y permite login admin con `permissions: "*"`.

### Contribs

Crear un mecanismo tipo:

```text
node-red-contribs.json
{
  "packages": [
    "@flowfuse/node-red-dashboard",
    "node-red-dashboard"
  ],
  "workspacePackages": []
}
```

Los paquetes del monorepo WiringEditor se agregan por manifiesto/índice, no por caso especial de `escribiente`.

## Salida mínima esperada

1. Candidatos de Dockerfile, settings y compose parcial.
2. `ENTREGA_VPS-04.md` con:
   - Rutas configuradas (`/ui`, `/dashboard`, `/red` o equivalente).
   - Estrategia read-only pública.
   - Lista de contribs iniciales y origen.

## Criterio de aceptación

- `nodered` (contenedor único) arranca con projects habilitados y `adminAuth` configurado.
- `scriptorium.escrivivir.co/red` muestra el editor/flujos en modo read-only para público anónimo.
- El público anónimo no puede editar, desplegar ni modificar credentials/projects.
- `admin.scriptorium.escrivivir.co` permite al usuario admin autenticado acceder al editor y gestionar projects.
- `/ui` y `/dashboard` quedan preparados por defecto.
- La instalación de contribs no privilegia `node-red-contrib-alephscript-escribiente`; lo trata como paquete del monorepo cuando corresponda.
- Ningún servicio interno publica el puerto `1880` directamente al exterior.
