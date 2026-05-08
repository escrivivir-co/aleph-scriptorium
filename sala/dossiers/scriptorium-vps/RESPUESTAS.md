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
