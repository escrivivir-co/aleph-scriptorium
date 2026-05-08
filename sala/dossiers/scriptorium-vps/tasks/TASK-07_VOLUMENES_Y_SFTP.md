# TASK-07 — Volúmenes shared y SFTP helpers

> **Estado:** cerrada
> **Agente recomendado:** `vps-ops`
> **Dependencias:** VPS-01
> **Entrega esperada:** layout `/srv/scriptorium/` + helpers SFTP + `.gitkeep`

## Lee primero

1. `ARCHIVO/PLUGINS/README.md`
2. `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`
3. `ARCHIVO/PLUGINS/MCP_PRESETS/`
4. `sala/dossiers/scriptorium-vps/RESPUESTAS.md`

## Objetivo

Preparar las carpetas compartidas del VPS con permisos previsibles y helpers para gestión desde VS Code por SFTP.

## Cambios requeridos

- Crear layout VPS:
  - `/srv/scriptorium/ARCHIVO/.gitkeep`
  - `/srv/scriptorium/ARCHIVO/DISCO/.gitkeep`
  - `/srv/scriptorium/verdaccio/storage/`
  - `/srv/scriptorium/caddy/data/`
  - `/srv/scriptorium/caddy/config/`
- Crear layout de datos plugin en repo Scriptorium:
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/deployments/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/audit/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/secrets-templates/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/node-red-projects/.gitkeep`
- Usar UID:GID por defecto `1000:1000`.
- Crear `scripts/sftp-helpers.sh`.
- Crear `sftp.json.template` para extensión VS Code común.

## Informe operativo

### Variables `.env.example`

```env
SCRIPTORIUM_UID=1000
SCRIPTORIUM_GID=1000
SCRIPTORIUM_DATA_ROOT=/srv/scriptorium
```

### Nota Node-RED single-instance

- No hay mounts separados por rol público/admin.
- `node-red-projects/` y los datos que necesite Node-RED se montan read-write para el proceso `nodered`.
- La distinción público/admin es de permisos HTTP en `adminAuth` (`default.read` frente a admin `*`), no de permisos de filesystem por usuario visitante.

### Carpetas MCP existentes

- DevOps: `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/` ya existe.
- Launcher/presets: `ARCHIVO/PLUGINS/MCP_PRESETS/` ya existe.
- No crear carpetas nuevas para Firehose/AAIA hasta que entren en el stack.

## Salida mínima esperada

1. Candidato de scripts/layout.
2. `ENTREGA_VPS-07.md` con:
   - Árbol de carpetas.
   - UID:GID aplicado.
   - Plantilla SFTP.

## Criterio de aceptación

- `ARCHIVO` y `ARCHIVO/DISCO` existen vacías con `.gitkeep` en el VPS.
- `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` existe en repo con `.gitkeep` mínimos.
- Los containers usan UID:GID `1000:1000` por defecto.
- `node-red-projects/` queda documentado como volumen RW del proceso `nodered`, sin split admin/public.
- La plantilla SFTP no contiene secretos reales.
