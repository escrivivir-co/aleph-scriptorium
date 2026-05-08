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

## 3. Restricciones

- Protocolo de sala: `.github/instructions/sala-protocolo.instructions.md`.
- El backlog es índice; los detalles viven en `tasks/`.
- No guardar secretos reales en el repo ni en el dossier.
- Todo `.env` debe tener variante `.env.example` con placeholders.
- Los contenedores no exponen puertos directos al host salvo Caddy `80/443`.
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

### [GitHub Copilot] Adenda — Node-RED pedagógico single-instance (2026-05-08)

El diseño vigente no oculta el editor al público. `scriptorium.escrivivir.co` expone el editor/flujos Node-RED en modo read-only para uso pedagógico, además de `/ui` y `/dashboard`. La autorización de escritura vive en `adminAuth`: público/anónimo con `permissions: "read"`; admin con `permissions: "*"`. Caddy actúa como frontal TLS/hardening y puede añadir una capa extra en `admin.scriptorium.escrivivir.co`, sin ocultar `/red` en el host público.

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

| Host | Servicio |
|---|---|
| `scriptorium.escrivivir.co` | Editor/flujos Node-RED públicos en read-only + dashboards `/ui` y `/dashboard` |
| `admin.scriptorium.escrivivir.co` | Node-RED admin con projects |
| `mcp.scriptorium.escrivivir.co` | MCP DevOps Streamable HTTP + Bearer |
| `npm.scriptorium.escrivivir.co` | Verdaccio público |

### 5.4 Stacks Docker

1. `nodered` — contenedor único que sirve editor/flujos públicos read-only (`/red`) y dashboards públicos (`/ui`, `/dashboard`), reservando escritura/deploy al admin autenticado. Ambos hosts apuntan al mismo upstream `nodered:1880`.
    - `adminAuth` configurado en `settings.js`: admin bcrypt con `permissions: "*"`, viewer opcional con `permissions: "read"` y `default: { permissions: "read" }` para público anónimo.
   - `httpAdminRoot` en `/red` para aislar la ruta del editor.
   - Dashboard clásico (`/ui`) y Dashboard 2 (`/dashboard`) inicializados por defecto.
   - `projects.enabled=true` con `projectsDir=/data/projects`.
2. `mcp-devops` con `MCPDevOpsServer` público por Streamable HTTP + Bearer.
3. `verdaccio` público con auth y storage persistente.
4. `caddy` como único frontend público.

### 5.5 Volúmenes VPS

```text
/srv/scriptorium/
├── ARCHIVO/.gitkeep
├── ARCHIVO/DISCO/.gitkeep
├── caddy/data/
├── caddy/config/
└── verdaccio/storage/
```

Montajes de datos Scriptorium:

- `nodered`: `ARCHIVO/` read-write; el acceso de escritura al editor queda restringido por `adminAuth` (`default.read` + admin `*`), no por permisos del filesystem ni por ocultar `/red` en Caddy.
- MCP DevOps: `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`.
- Verdaccio: `verdaccio/storage/`.

## 6. Salida operativa

- Tracking: [BACKLOG.md](./BACKLOG.md)
- Decisiones del PO: [RESPUESTAS.md](./RESPUESTAS.md)
- Tasks: carpeta [tasks](./tasks)
