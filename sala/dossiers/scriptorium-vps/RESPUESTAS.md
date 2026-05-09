# Respuestas del PO — Scriptorium VPS

> Cada respuesta incluye **efecto operativo** concreto:
> qué cambia exactamente en el dossier, el backlog o las tasks.

---

## Foco exclusivo de sesión

**Decisión:** La sala activa trabaja exclusivamente el dossier `sala/dossiers/scriptorium-vps/`.

**Efecto operativo:** El tablero deja fuera de foco los tracks `REFINE-SC`, `VMS` y `SSV`; los agentes sólo deben proponer tareas `VPS-*` salvo nueva decisión explícita del PO.

---

## Dashboard clásico y Dashboard 2

**Decisión:** Inicializar ambos por defecto; la documentación permite convivencia sin conflicto.

**Efecto operativo:** `TASK-04_STACK_NODERED.md` exige preparar rutas y settings para Dashboard clásico (`/ui`) y Dashboard 2 (`/dashboard`) desde el arranque.

---

## Scope npm para Verdaccio

**Decisión:** El espacio de paquetes será el mismo que `mcp-core-sdk` y el resto del stack: `@alephscript/*`.

**Efecto operativo:** `TASK-06_STACK_VERDACCIO.md` usa `@alephscript/*` en `.npmrc`, `publishConfig` y smoke tests.

---

## UID:GID compartido

**Decisión:** Usar `1000:1000` por defecto.

**Efecto operativo:** `TASK-07_VOLUMENES_Y_SFTP.md` fija `SCRIPTORIUM_UID=1000` y `SCRIPTORIUM_GID=1000` en `.env.example` y compose.

---

## Verdaccio público

**Decisión:** Verdaccio será público.

**Efecto operativo:** El DNS añade `npm.scriptorium.escrivivir.co`, y `TASK-03_DNS_Y_CADDY.md` + `TASK-06_STACK_VERDACCIO.md` incluyen host Caddy público con auth.

---

## Auth para MCP DevOps

**Decisión:** Elegir la opción más natural para `mcp-inspector-sdk`: Streamable HTTP + Bearer estándar.

**Efecto operativo:** `TASK-05_STACK_MCP_MESH_DEVOPS.md` fija endpoint `https://mcp.scriptorium.escrivivir.co/mcp`, header `Authorization: Bearer <token>` y validación con `mcp-inspector-sdk`.

---

## Node-RED projects

**Decisión:** `node-red-projects` será monorepo.

**Efecto operativo:** `TASK-01_REPO_Y_SUBMODULE.md` crea `node-red-projects/.gitkeep`, y `TASK-04_STACK_NODERED.md` configura `projectsDir` contra esa carpeta.

---

## Agentes del plugin

**Decisión:** El plugin incluye agentes de gestión (`vps-ops`, `nodered-curator`, `verdaccio-keeper`) y esqueletos preparados para agentes de producto/futuro (`anfitrion`, `hackeria-soporte`, `mc-parlament`, `notario-boe`, `publicador`).

**Efecto operativo:** `TASK-02_PLUGIN_Y_AGENTES.md` crea todos los `.agent.md` como esqueleto, marcando los futuros como `draft` o `stub`.

---

## Contribs Node-RED

**Decisión:** No precargar `node-red-contrib-alephscript-escribiente` de forma especial; será como el resto de contribs según monorepo.

**Efecto operativo:** `TASK-04_STACK_NODERED.md` y `TASK-06_STACK_VERDACCIO.md` sustituyen listas hardcodeadas por un manifiesto/índice de contribs del monorepo.

---

## Node-RED pedagógico single-instance

**Decisión:** Usar un único contenedor `nodered` para el MVP pedagógico. El público debe poder abrir el editor `/red` y ver los flujos en modo read-only, además de consultar dashboards `/ui` y `/dashboard`. Sólo el usuario admin autenticado puede editar, desplegar o modificar projects.

**Efecto operativo:** `PLAN.md`, `TASK-03_DNS_Y_CADDY.md`, `TASK-04_STACK_NODERED.md`, `TASK-07_VOLUMENES_Y_SFTP.md` y `TASK-08_RUNBOOK_Y_VERIFICACION.md` deben tratar Caddy como frontal TLS/hardening, no como mecanismo para ocultar `/red`. La autorización queda en `settings.js` con `adminAuth.default = { permissions: "read" }`, admin `permissions: "*"` y viewer opcional `permissions: "read"`.

---

## Llaves SSH y acceso VPS fuera del repo

**Decisión:** Las llaves reales y rutas locales de operador no se guardan ni se hardcodean en la codebase. Los scripts deben leer variables de entorno configurables (`SCRIPTORIUM_SSH_KEY_PATH`, `SCRIPTORIUM_SSH_USER`, `SCRIPTORIUM_SSH_HOST`, `SCRIPTORIUM_SSH_PORT`, `SCRIPTORIUM_REMOTE_ROOT`) y publicar sólo `.env.example`/templates con placeholders.

**Efecto operativo:** `TASK-03_DNS_Y_CADDY.md`, `TASK-07_VOLUMENES_Y_SFTP.md` y `TASK-08_RUNBOOK_Y_VERIFICACION.md` deben evitar rutas absolutas personales en ficheros versionados. En ejecución local, Aleph puede usar una ruta externa al repo indicada por el PO mediante `.env` no versionado o variables de sesión. Si hace falta Docker o acceso real al VPS, Aleph debe avisar antes de operar.

---

## Integración con Caddy existente de OASIS_PUB

**Decisión:** Para el VPS compartido se elige la opción 2: integración respetuosa en el Caddy existente de `BlockchainComPort/OASIS_PUB`. Se descarta abrir un VPS/host separado para este MVP y también se descarta crear un edge Caddy nuevo/unificado que reemplace al actual.

**Efecto operativo:** `TASK-03_DNS_Y_CADDY.md` debe entregar snippets candidatos para `BlockchainComPort/OASIS_PUB/caddy/Caddyfile` y no un despliegue real de otro Caddy en producción. `ScriptoriumVps/PATTERN-DOCKER/caddy/Caddyfile` puede existir como patrón local/standalone, pero el compose productivo compartido no debe publicar `80/443` ni competir con `pub-web` de `OASIS_PUB`.

---

## Red Docker edge para servicios Scriptorium

**Decisión:** La conexión entre el Caddy existente de `OASIS_PUB` y los servicios nuevos se modela con la red Compose existente de `OASIS_PUB` para el MVP: clave interna `oasis_pub_net` y nombre externo esperado `oasis-pub-scriptorium_oasis_pub_net` al consumirla desde `ScriptoriumVps`, usando aliases internos estables: `scriptorium-nodered`, `scriptorium-mcp-devops` y `scriptorium-verdaccio`.

**Efecto operativo:** `VPS-03` debe documentar la topología y no publicar puertos internos (`1880`, `3003`, `4873`) al host. Si el candidato necesita consumir la red desde otro compose, debe usar `external: true` con `name: oasis-pub-scriptorium_oasis_pub_net` o justificar una alternativa. Cualquier cambio real en `OASIS_PUB/docker-compose.pub.yml`, `OASIS_PUB/caddy/Caddyfile`, Docker remoto o DNS/Gandi queda bloqueado hasta validación expresa del PO.

---

## Operación controlada sobre VPS vivo

**Decisión:** Cualquier operación real sobre el VPS vivo debe ejecutarse en una ventana controlada por Aleph, con aprobación explícita del PO justo antes de operar. Esto incluye DNS/Gandi, SSH/SCP/SFTP, `docker compose`, edición del Caddy real, reinicios, copia de secretos, apertura de puertos y cualquier cambio que afecte a `OASIS_PUB` o a servicios públicos.

**Efecto operativo:** Las tasks `VPS-04` a `VPS-08` pueden producir candidatos, scripts, runbooks y verificaciones de solo lectura sin nueva aprobación, pero no pueden ejecutar mutaciones remotas. Antes de tocar el VPS, Aleph debe presentar: objetivo, comandos exactos, rollback, rutas afectadas, backup/snapshot esperado, variables/llaves usadas desde entorno local no versionado y criterio de éxito. El PO debe responder afirmativamente y de forma explícita para abrir la ventana.

---

## DNS real Scriptorium creado

**Decisión/acción PO:** El PO ha creado los registros A reales para los cuatro hosts Scriptorium apuntando al VPS compartido `92.243.24.163`.

| Tipo | Host | Valor |
|------|------|-------|
| A | `scriptorium.escrivivir.co` | `92.243.24.163` |
| A | `admin.scriptorium.escrivivir.co` | `92.243.24.163` |
| A | `mcp.scriptorium.escrivivir.co` | `92.243.24.163` |
| A | `npm.scriptorium.escrivivir.co` | `92.243.24.163` |

**Verificación Aleph 2026-05-09:** resolución DNS local confirmada para los cuatro hosts contra `92.243.24.163`.

**Efecto operativo:** El bloqueo de DNS para `VPS-08` queda levantado. Sigue vigente la ventana controlada obligatoria para SSH/SCP/SFTP, Docker remoto, edición/restart de Caddy real, alta de secretos, publicación npm real y cualquier mutación sobre el VPS vivo.

---

## Root de datos Scriptorium en volumen Gandi

**Decisión/acción PO:** Los datos persistentes de Scriptorium no deben ir en el disco de arranque `vps-boot` de 25 GB. Deben ubicarse dentro del volumen de datos `scriptorium-oasis-pub-volumen` de 40 GB, montado en `/srv/oasis`.

**Ruta canónica:** `SCRIPTORIUM_REMOTE_ROOT=/srv/oasis/scriptorium`.

**Efecto operativo:** Cualquier compose, helper SFTP, verificador o runbook que antes apuntara a `/srv/scriptorium` debe corregirse a `/srv/oasis/scriptorium`. La ruta `/srv/scriptorium` creada durante el primer intento de `VPS-08` queda clasificada como error de bootstrap y debe migrarse/archivarse antes de continuar el despliegue.

---

## Pub.Rooms federado cerrado y paso a peer real

**Decisión/acción PO:** `TASK-10` queda cerrada funcionalmente. El estado del dossier pasa a **enviar invitaciones y esperar reanudar con peer real**.

**Efecto operativo:**

- `VPS-10` pasa a `cerrada` en `BACKLOG.md`.
- Se abre `VPS-11` / `TASK-11_PEER_REAL_HANDOFF.md` para registrar el primer peer real, fricción de onboarding y decisiones de hardening.
- No se reabre infraestructura (`Caddy`, DNS, Docker, paquetes) sin incidencia concreta o peer real.
- Los tokens siguen distribuyéndose fuera de banda; la rotación del token MCP DevOps queda pospuesta para el cierre/hardening posterior, no como bloqueo del envío.
- La identidad fuerte OASIS/SSB/JWT sigue trackeada en `SPIKE-10`, no bloquea invitaciones.
