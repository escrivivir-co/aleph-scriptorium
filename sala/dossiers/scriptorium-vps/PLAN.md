# Plan — Scriptorium VPS

> **Fecha:** 2026-05-08  
> **Autor:** `GitHub Copilot`  
> **Modelo redactor:** `GitHub Copilot`  
> **Dossier:** `sala/dossiers/scriptorium-vps/`

## 1. Contexto

Este dossier cristaliza el lote abordable del MINI-PLAN de la sesión Denis: crear una base operativa pública para `scriptorium.escrivivir.co` con Node-RED, MCP DevOps vía mesh, Verdaccio y un nuevo submódulo/plugin Scriptorium VPS.

La intención no es reabrir planes anteriores ni fusionarlos aquí. Este dossier es el contrato operativo nuevo para un primer lote autónomo, diseñado para ejecutarse por bloques verificables.

## Contexto compartido

Cualquier agente que tome una task debe leer primero:

1. `ARCHIVO/DEVOPS/SESION_DENIS/MINI-PLAN.md`
2. `.gitmodules`
3. `MCPGallery/mcp-core-sdk/package.json`
4. `MCPGallery/mcp-inspector-sdk/README.md`
5. `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`
6. `ARCHIVO/PLUGINS/MCP_PRESETS/`

## 2. Anclas

- Organización GitHub canónica: `escrivivir-co`, ver `.gitmodules`.
- Rama recurrente de integración: `integration/beta/scriptorium`.
- Scope npm canónico: `@alephscript/*`, ver `@alephscript/mcp-core-sdk`.
- DevOps MCP ya tiene persistencia en `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`.
- MCP Launcher / presets ya tienen persistencia en `ARCHIVO/PLUGINS/MCP_PRESETS/`.
- La herramienta oficial de validación MCP es `MCPGallery/mcp-inspector-sdk`.
- Node-RED projects se modela como monorepo.
- `BlockchainComPort/OASIS_PUB/` ya existe como despliegue Gandi/VPS vivo para `pub.escrivivir.co`.
- `BlockchainComPort/OASIS_PUB/caddy/Caddyfile` y `docker-compose.pub.yml` son anclas protegidas: su Caddy `pub-web` ya ocupa `80/443`.
- `BlockchainComPort/GANDI_DEVOPS_FOLDER/` es carpeta segura deny-by-default para SSH, snapshots, inventarios y secretos operativos.

## 3. Restricciones

- Protocolo de sala: `.github/instructions/sala-protocolo.instructions.md`.
- El backlog es índice; los detalles viven en `tasks/`.
- No guardar secretos reales en el repo ni en el dossier.
- Todo `.env` debe tener variante `.env.example` con placeholders.
- Los contenedores no exponen puertos directos al host salvo Caddy `80/443`.
- En producción no se levanta un segundo Caddy para `ScriptoriumVps` si comparte VPS con `OASIS_PUB`.
- La integración pública se hace añadiendo hosts/snippets candidatos al Caddy existente de `OASIS_PUB`, previa revisión de Aleph/PO.
- DNS real, Docker remoto, SSH/SCP, Gandi y VPS vivo requieren validación expresa del PO antes de operar.
- No tocar `pub.escrivivir.co`, `escrivivir.co` raíz ni registros Bluesky/`_atproto` salvo decisión explícita posterior.
- `ARCHIVO/` y `ARCHIVO/DISCO/` del VPS arrancan como carpetas vacías con `.gitkeep`.
- Los datos del plugin nuevo se separan en `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/`.

## 4. Decisiones confirmadas

| Decisión | Estado | Efecto operativo |
|---|---|---|
| Dashboard clásico + Dashboard 2 | Confirmada | Inicializar ambos por defecto: `/ui` para clásico y `/dashboard` para Dashboard 2 cuando aplique. |
| Scope npm | Confirmada | Usar el mismo espacio que `mcp-core-sdk`: `@alephscript/*`. |
| UID:GID shared | Confirmada | Usar `1000:1000` por defecto. |
| Verdaccio | Confirmada | Registry público en `npm.scriptorium.escrivivir.co`. |
| MCP auth | Confirmada por diseño | Streamable HTTP + Bearer estándar (`Authorization: Bearer ...`) validable con `mcp-inspector-sdk`. |
| Node-RED projects | Confirmada | Monorepo `node-red-projects/`; cada subcarpeta puede ser un project. |
| Agentes plugin | Confirmada | Incluir agentes de gestión y esqueletos de agentes del plan anterior para trabajo futuro. |
| Contribs Node-RED | Confirmada | No precargar `node-red-contrib-alephscript-escribiente` de forma especial; tratarlo como el resto de contribs del monorepo. |
| Node-RED pedagógico single-instance | Confirmada | Un solo `nodered`; el público ve `/red` en modo read-only y dashboards; sólo admin autenticado escribe/deploya. |
| Caddy edge de producción | Confirmada | Usar integración respetuosa en el Caddy existente de `BlockchainComPort/OASIS_PUB`; no desplegar segundo Caddy en el VPS compartido. |
| Red edge Docker | Confirmada para MVP | Conectar servicios `ScriptoriumVps` al edge existente mediante la red Compose de `OASIS_PUB` (`oasis_pub_net`; nombre externo esperado `oasis-pub-scriptorium_oasis_pub_net`) y aliases estables; no publicar puertos internos. |
| Pub.Rooms federado | Cerrada TASK-10 | `rooms.scriptorium.escrivivir.co` operativo con shared-secret, bootstrap cliente y smoke externo técnico. El dossier queda en modo enviar invitaciones y esperar peer real (`TASK-11`). |

### [GitHub Copilot] Adenda — TASK-10 cerrada, espera peer real (2026-05-09)

`TASK-10_PUB_ROOMS_FEDERATED.md` queda cerrada funcionalmente: el runtime Rooms está publicado en `rooms.scriptorium.escrivivir.co`, el edge Caddy usa el `pub-web` existente de `OASIS_PUB`, los paquetes `@alephscript/mcp-core-sdk@1.4.0`, `node-red-dashboard-2-alephscript-rooms@0.2.0` y `node-red-contrib-alephscript-core@0.2.0` están publicados en Verdaccio, y existe bootstrap reproducible para clientes Node-RED.

El estado operativo posterior no es seguir tocando infraestructura: es **enviar invitaciones y esperar reanudar con peer real**. Ese seguimiento vive en `tasks/TASK-11_PEER_REAL_HANDOFF.md`.

### [GitHub Copilot] Adenda — Node-RED pedagógico single-instance (2026-05-08)

El diseño vigente no oculta el editor al público. `scriptorium.escrivivir.co` expone el editor/flujos Node-RED en modo read-only para uso pedagógico, además de `/ui` y `/dashboard`. La autorización de escritura vive en `adminAuth`: público/anónimo con `permissions: "read"`; admin con `permissions: "*"`. Caddy actúa como frontal TLS/hardening y puede añadir una capa extra en `admin.scriptorium.escrivivir.co`, sin ocultar `/red` en el host público.

### [GitHub Copilot] Adenda — Caddy existente de OASIS_PUB como edge (2026-05-08)

Decisión PO: se descartan tanto el VPS/host separado como un edge Caddy unificado nuevo. Para el MVP, la opción canónica es integrar `scriptorium.escrivivir.co`, `admin.scriptorium.escrivivir.co`, `mcp.scriptorium.escrivivir.co` y `npm.scriptorium.escrivivir.co` en el Caddy existente de `BlockchainComPort/OASIS_PUB/`. `ScriptoriumVps` puede conservar un Caddyfile de patrón para desarrollo o documentación, pero en producción compartida no debe levantar otro contenedor que ocupe `80/443`. La conexión entre ese Caddy y los servicios nuevos se modela mediante la red Compose existente de `OASIS_PUB`: clave `oasis_pub_net` dentro de `docker-compose.pub.yml`, nombre externo esperado `oasis-pub-scriptorium_oasis_pub_net` al consumirla desde otro compose, y aliases internos (`scriptorium-nodered`, `scriptorium-mcp-devops`, `scriptorium-verdaccio`).

## 5. Propuesta

### 5.1 Nuevo submódulo `ScriptoriumVps`

Crear repo:

- URL: `https://github.com/escrivivir-co/scriptorium-vps.git`
- Path: `ScriptoriumVps`
- Branch: `integration/beta/scriptorium`

Estructura esperada:

```text
ScriptoriumVps/
├── README.md
├── README-SCRIPTORIUM.md
├── PATTERN-DOCKER/
│   ├── docker-compose.yml
│   ├── caddy/
│   ├── nodered/
│   ├── mcp-mesh/
│   └── verdaccio/
├── node-red-projects/
│   └── .gitkeep
├── scripts/
│   ├── deploy.sh
│   ├── verify.sh
│   └── sftp-helpers.sh
└── .env.example
```

### 5.2 Nuevo plugin `scriptorium-vps`

Crear plugin local:

```text
.github/plugins/scriptorium-vps/
├── manifest.md
├── agents/
│   ├── vps-ops.agent.md
│   ├── nodered-curator.agent.md
│   ├── verdaccio-keeper.agent.md
│   ├── anfitrion.agent.md
│   ├── hackeria-soporte.agent.md
│   ├── mc-parlament.agent.md
│   ├── notario-boe.agent.md
│   └── publicador.agent.md
├── prompts/
│   └── .gitkeep
├── instructions/
│   └── scriptorium-vps.instructions.md
└── docs/
    └── README.md
```

Datos separados:

```text
ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/
├── .gitkeep
├── deployments/.gitkeep
├── audit/.gitkeep
├── secrets-templates/.gitkeep
└── node-red-projects/.gitkeep
```

### 5.3 DNS público

Los DNS de `ScriptoriumVps` son aditivos. No sustituyen `pub.escrivivir.co`, no tocan el dominio raíz `escrivivir.co` y no modifican registros de Bluesky/`_atproto`.

| Host | Servicio |
|---|---|
| `scriptorium.escrivivir.co` | Editor/flujos Node-RED públicos en read-only + dashboards `/ui` y `/dashboard` |
| `admin.scriptorium.escrivivir.co` | Node-RED admin con projects |
| `mcp.scriptorium.escrivivir.co` | MCP DevOps Streamable HTTP + Bearer |
| `npm.scriptorium.escrivivir.co` | Verdaccio público |
| `rooms.scriptorium.escrivivir.co` | Pub.Rooms federado: Socket.IO `wss://.../runtime` con shared-secret |

### 5.4 Stacks Docker

1. `nodered` — contenedor único que sirve editor/flujos públicos read-only (`/red`) y dashboards públicos (`/ui`, `/dashboard`), reservando escritura/deploy al admin autenticado. Ambos hosts apuntan al mismo upstream `nodered:1880`.
    - `adminAuth` configurado en `settings.js`: admin bcrypt con `permissions: "*"`, viewer opcional con `permissions: "read"` y `default: { permissions: "read" }` para público anónimo.
   - `httpAdminRoot` en `/red` para aislar la ruta del editor.
   - Dashboard clásico (`/ui`) y Dashboard 2 (`/dashboard`) inicializados por defecto.
   - `projects.enabled=true` con `projectsDir=/data/projects`.
2. `mcp-devops` con `MCPDevOpsServer` público por Streamable HTTP + Bearer.
3. `verdaccio` público con auth y storage persistente.
4. `caddy` sólo como patrón local/standalone. En producción compartida, el único frontend público es `pub-web` de `BlockchainComPort/OASIS_PUB`; `VPS-03` entrega snippets candidatos para integrarlo allí.

Convivencia de red para producción compartida:

- `pub-web` de `OASIS_PUB` sigue siendo dueño de `80/443`.
- Los servicios `nodered`, `mcp-devops` y `verdaccio` no publican puertos al host.
- Esos servicios se conectan a la red Compose existente de `OASIS_PUB` con aliases estables. Desde `ScriptoriumVps`, la red debe declararse como externa apuntando al nombre real esperado `oasis-pub-scriptorium_oasis_pub_net`:
    - `scriptorium-nodered` → `nodered:1880`
    - `scriptorium-mcp-devops` → `mcp-devops:3003`
    - `scriptorium-verdaccio` → `verdaccio:4873`
    - `scriptorium-rooms` → `nodered:3010` (runtime Rooms interno; `3010` no se publica al host)

### 5.5 Volúmenes VPS

```text
/srv/oasis/scriptorium/
├── ARCHIVO/.gitkeep
├── ARCHIVO/DISCO/.gitkeep
└── verdaccio/storage/
```

`/srv/oasis/scriptorium/caddy/*` queda reservado sólo para perfil standalone/local. En producción compartida, certificados y estado de Caddy permanecen en los volúmenes ya definidos por `OASIS_PUB`.

Montajes de datos Scriptorium:

- `nodered`: `ARCHIVO/` read-write; el acceso de escritura al editor queda restringido por `adminAuth` (`default.read` + admin `*`), no por permisos del filesystem ni por ocultar `/red` en Caddy.
- MCP DevOps: `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`.
- Verdaccio: `verdaccio/storage/`.

## 6. Salida operativa

- Tracking: [BACKLOG.md](./BACKLOG.md)
- Decisiones del PO: [RESPUESTAS.md](./RESPUESTAS.md)
- Tasks: carpeta [tasks](./tasks)
