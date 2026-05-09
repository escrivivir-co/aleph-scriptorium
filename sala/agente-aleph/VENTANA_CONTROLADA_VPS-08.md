# Ventana controlada — VPS-08 producción

> **Fecha:** 2026-05-09
> **Modelo:** GitHub Copilot
> **Estado:** pendiente de aprobación explícita PO

## Objetivo

Desplegar `ScriptoriumVps` en el VPS `92.243.24.163` junto al PUB existente, manteniendo intacto `pub.escrivivir.co` y añadiendo solo los hosts Scriptorium.

## Estado previo verificado

- DNS Scriptorium resuelve a `92.243.24.163`.
- `ScriptoriumVps/.env` local existe, está ignorado por git y no contiene placeholders activos.
- `ScriptoriumVps/.env.generated-secrets` local existe, ignorado por git, con credenciales legibles para el operador.
- Llave SSH candidata existente: `/c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519`.
- Usuario SSH inferido por historial operativo: `debian`.
- Repo padre y submódulos `ScriptoriumVps`/`BlockchainComPort` publicados en `integration/beta/scriptorium`.

## Rutas afectadas

Locales:

- `ScriptoriumVps/.env` — secretos runtime, ignorado por git.
- `ScriptoriumVps/PATTERN-DOCKER/caddy/OASIS_PUB.Caddyfile.snippet` — snippet aditivo Caddy.

Remotas:

- `/opt/oasis-scriptorium/` — instalación existente de `BlockchainComPort` / `OASIS_PUB` (no es repo git padre).
- `/opt/aleph-scriptorium/` — checkout nuevo del repo `aleph-scriptorium` para desplegar Scriptorium al lado del pub existente.
- `/opt/aleph-scriptorium/ScriptoriumVps/.env` — copia del `.env` local.
- `/opt/oasis-scriptorium/BlockchainComPort/OASIS_PUB/caddy/Caddyfile` — append aditivo del snippet Scriptorium si no existe.
- `/opt/oasis-scriptorium/OASIS_PUB/caddy/Caddyfile` — ruta real detectada en el VPS para Caddy del pub existente.
- `/srv/oasis/scriptorium/` — volúmenes Scriptorium dentro del volumen de datos Gandi `scriptorium-oasis-pub-volumen` montado en `/srv/oasis`.
- `/srv/scriptorium/` — root creado inicialmente por error en el disco `vps-boot`; debe migrarse/archivarse y dejar de usarse.

## Corrección volumen de datos (2026-05-09)

El PO confirma que el VPS tiene dos discos:

- `vps-boot` — 25 GB, disco de arranque.
- `scriptorium-oasis-pub-volumen` — 40 GB, disco de datos montado en `/srv/oasis`.

Por tanto, `SCRIPTORIUM_REMOTE_ROOT` debe ser `/srv/oasis/scriptorium`. El layout creado previamente en `/srv/scriptorium` queda marcado como error de ruta; no debe recibir nuevos mounts ni datos.

## Hallazgo fase 1 lectura

`/opt/oasis-scriptorium` en el VPS es la instalación existente de `BlockchainComPort`, no un checkout del repo padre `aleph-scriptorium`. Por tanto, el despliegue corregido crea/actualiza `/opt/aleph-scriptorium` como directorio hermano y solo añade un snippet al Caddyfile real de `/opt/oasis-scriptorium/OASIS_PUB`.

## Comandos exactos — fase 1 lectura remota

```bash
ssh -i /c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 \
  -o StrictHostKeyChecking=accept-new \
  -o BatchMode=yes \
  debian@92.243.24.163 \
  'set -e; hostname; uname -a; docker ps --format "{{.Names}} | {{.Status}}"; ls -la /opt/oasis-scriptorium; cd /opt/oasis-scriptorium && git status -sb && git rev-parse --short HEAD'
```

## Comandos exactos — fase 2 copia segura de artefactos

```bash
scp -i /c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 \
  -o StrictHostKeyChecking=accept-new \
  ScriptoriumVps/.env \
  debian@92.243.24.163:/tmp/scriptorium-vps.env

scp -i /c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 \
  -o StrictHostKeyChecking=accept-new \
  ScriptoriumVps/PATTERN-DOCKER/caddy/OASIS_PUB.Caddyfile.snippet \
  debian@92.243.24.163:/tmp/OASIS_PUB.Caddyfile.snippet
```

## Comandos exactos — fase 3 crear/actualizar checkout Scriptorium y preflight

```bash
ssh -i /c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 \
  -o StrictHostKeyChecking=accept-new \
  debian@92.243.24.163 \
  'set -euo pipefail
   if [ ! -d /opt/aleph-scriptorium/.git ]; then
     sudo mkdir -p /opt/aleph-scriptorium
     sudo chown debian:debian /opt/aleph-scriptorium
     rmdir /opt/aleph-scriptorium
     git clone --no-recurse-submodules --branch integration/beta/scriptorium https://github.com/escrivivir-co/aleph-scriptorium.git /opt/aleph-scriptorium
   fi
   cd /opt/aleph-scriptorium
   git fetch origin integration/beta/scriptorium
   git checkout integration/beta/scriptorium
   git pull --ff-only origin integration/beta/scriptorium
   git submodule update --init ScriptoriumVps MCPGallery WiringEditor
   install -m 600 /tmp/scriptorium-vps.env /opt/aleph-scriptorium/ScriptoriumVps/.env
   rm -f /tmp/scriptorium-vps.env
   cd /opt/aleph-scriptorium/ScriptoriumVps
   bash scripts/deploy.sh preflight'
```

## Comandos exactos — fase 4 volúmenes y servicios Scriptorium

Fase 4 arranca sólo el bootstrap base: `nodered` limpio y `verdaccio`. `mcp-devops` queda bajo profile `mcp` y se activará después de publicar/normalizar paquetes en Verdaccio.

```bash
ssh -i /c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 \
  -o StrictHostKeyChecking=accept-new \
  debian@92.243.24.163 \
  'set -euo pipefail
  cd /opt/aleph-scriptorium/ScriptoriumVps
   sudo -E bash scripts/deploy.sh setup-volumes
   export SCRIPTORIUM_DEPLOY_CONFIRM=YES_DEPLOY_SCRIPTORIUM_VPS
   bash scripts/deploy.sh deploy-local'
```

## Comandos exactos — fase 5 Caddy aditivo OASIS_PUB

```bash
ssh -i /c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 \
  -o StrictHostKeyChecking=accept-new \
  debian@92.243.24.163 \
  'set -euo pipefail
  cd /opt/oasis-scriptorium/OASIS_PUB
   ts=$(date +%Y%m%d-%H%M%S)
   cp caddy/Caddyfile "caddy/Caddyfile.before-scriptorium-${ts}"
   if ! grep -q "scriptorium.escrivivir.co" caddy/Caddyfile; then
     cat /tmp/OASIS_PUB.Caddyfile.snippet >> caddy/Caddyfile
   fi
   rm -f /tmp/OASIS_PUB.Caddyfile.snippet
   docker compose -f docker-compose.pub.yml exec -T pub-web caddy validate --config /etc/caddy/Caddyfile
   docker compose -f docker-compose.pub.yml restart pub-web
   curl -fsSI --max-time 10 https://pub.escrivivir.co >/dev/null'
```

## Comandos exactos — fase 6 verificación

```bash
bash ScriptoriumVps/scripts/verify-dns.sh
bash ScriptoriumVps/scripts/verify-caddy.sh
bash ScriptoriumVps/scripts/verify-nodered.sh
bash ScriptoriumVps/scripts/verify-mcp-devops.sh
bash ScriptoriumVps/scripts/verify-verdaccio.sh
```

Lectura remota opcional de volúmenes:

```bash
SCRIPTORIUM_ALLOW_REMOTE_READ=YES_READ_VPS bash ScriptoriumVps/scripts/verify-volumes.sh
```

## Rollback mínimo

```bash
ssh -i /c/Users/aleph/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 \
  -o StrictHostKeyChecking=accept-new \
  debian@92.243.24.163 \
  'set -euo pipefail
  cd /opt/aleph-scriptorium/ScriptoriumVps
   export SCRIPTORIUM_DEPLOY_CONFIRM=YES_DEPLOY_SCRIPTORIUM_VPS
   bash scripts/deploy.sh rollback-local
  cd /opt/oasis-scriptorium/OASIS_PUB
   latest=$(ls -1t caddy/Caddyfile.before-scriptorium-* | head -1)
   cp "$latest" caddy/Caddyfile
   docker compose -f docker-compose.pub.yml restart pub-web'
```

## Condiciones de abortar

- SSH con `debian@92.243.24.163` falla.
- El repo remoto no existe en `/opt/oasis-scriptorium`.
- `git pull --ff-only` falla o hay dirty tree que impide actualizar.
- `bash scripts/deploy.sh preflight` falla.
- `docker compose` falla al construir o levantar servicios.
- `caddy validate` falla.
- `pub.escrivivir.co` deja de responder tras restart del edge.

## Criterio de éxito

- `pub.escrivivir.co` sigue respondiendo.
- `scriptorium.escrivivir.co/healthz`, `admin.scriptorium.escrivivir.co/healthz`, `mcp.scriptorium.escrivivir.co/healthz` y `npm.scriptorium.escrivivir.co/healthz` responden.
- Node-RED, MCP DevOps y Verdaccio responden según sus verificadores.

## Aprobación requerida

Pendiente de respuesta explícita del PO antes de ejecutar cualquier fase SSH/SCP/Docker/Caddy.
