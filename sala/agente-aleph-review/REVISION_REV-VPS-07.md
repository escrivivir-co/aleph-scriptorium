# Revisión — REV-VPS-07

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-07
> **Agente entregador:** sony
> **Fecha:** 2026-05-08 21:34:27

## Veredicto: devuelta

## Checklist de criterios de aceptación

- [~] `ARCHIVO` y `ARCHIVO/DISCO` documentados con `.gitkeep` en layout VPS: el script los crea.
- [x] `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` existe en repo con `.gitkeep` mínimos.
- [x] UID:GID `1000:1000` aparece como default configurable en `setup-volumenes.sh`.
- [~] `node-red-projects/` documentado como volumen RW: la entrega lo explica, pero el script crea `node-red/projects` en vez de alinear claramente con el mount real `ScriptoriumVps/node-red-projects:/data/projects`.
- [✗] Plantilla SFTP sin secretos reales pero con variables canónicas: no contiene secretos, pero usa `VPS_HOST`, `VPS_USER`, `VPS_PORT`, `VPS_KEY`, `VPS_KEY_PASSPHRASE` en lugar de las variables decididas en `RESPUESTAS.md`.
- [x] `scripts/setup-volumenes.sh` crea layout base con un solo comando.
- [~] `scripts/sftp-helpers.sh` cubre health/tree/sync-down/sync-up/open-sftp, pero usa nombres de variables no canónicos y hardcodea/defaulta rutas de forma divergente.

## Observaciones

La entrega es útil, pero no debe integrarse todavía porque incumple una decisión explícita del PO en `sala/dossiers/scriptorium-vps/RESPUESTAS.md`:

> Los scripts deben leer `SCRIPTORIUM_SSH_KEY_PATH`, `SCRIPTORIUM_SSH_USER`, `SCRIPTORIUM_SSH_HOST`, `SCRIPTORIUM_SSH_PORT`, `SCRIPTORIUM_REMOTE_ROOT` y publicar sólo templates/placeholders.

Los candidatos de Sony usan otra familia de variables:

- `VPS_HOST`
- `VPS_USER`
- `VPS_PORT`
- `VPS_KEY`
- `VPS_KEY_PASSPHRASE`

Además, `sftp.json.template` fija `remotePath` como `/srv/scriptorium` en vez de `${env:SCRIPTORIUM_REMOTE_ROOT}` o equivalente canónico.

También falta alinear el layout de host con los mounts que ya quedaron diseñados en las tasks aprobadas:

- `VPS-05` monta `/srv/scriptorium/ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server`.
- `VPS-05` monta `/srv/scriptorium/ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/audit`.
- `VPS-06` monta `/srv/scriptorium/verdaccio/storage`.
- `VPS-04` trabaja con `node-red-projects`/`/data/projects` según el compose y el plan.

El script actual crea parte del árbol, pero no crea explícitamente los paths de `MCP_DATA/devops-mcp-server` ni `SCRIPTORIUM_VPS/audit` en `/srv/scriptorium/ARCHIVO/PLUGINS/...`. Si Docker los crea implícitamente al arrancar, pueden quedar con owner/root inesperado, justo lo que `VPS-07` debía prevenir.

## Corrección requerida

Sony debe reentregar ajustando:

1. Variables SSH/SFTP canónicas:
   - `SCRIPTORIUM_SSH_HOST`
   - `SCRIPTORIUM_SSH_USER`
   - `SCRIPTORIUM_SSH_PORT`
   - `SCRIPTORIUM_SSH_KEY_PATH`
   - `SCRIPTORIUM_REMOTE_ROOT`
   - opcional: `SCRIPTORIUM_SSH_KEY_PASSPHRASE` sólo en template, sin valor real.
2. `sftp.json.template` debe usar `${env:SCRIPTORIUM_*}` y no hardcodear `/srv/scriptorium` si existe `SCRIPTORIUM_REMOTE_ROOT`.
3. `sftp-helpers.sh` debe usar las mismas variables canónicas, manteniendo compatibilidad si se desea con aliases antiguos sólo como fallback documentado.
4. `setup-volumenes.sh` debe crear también los paths requeridos por los stacks ya diseñados:
   - `${SCRIPTORIUM_DATA_ROOT}/ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server`
   - `${SCRIPTORIUM_DATA_ROOT}/ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/audit`
   - opcionalmente `deployments`, `secrets-templates`, `node-red-projects` bajo `SCRIPTORIUM_VPS` si se va a sincronizar desde repo.
5. Aclarar la relación entre `/srv/scriptorium/node-red/projects` y el mount real `ScriptoriumVps/node-red-projects:/data/projects`, para no crear dos fuentes de verdad de projects.

## Validación realizada

- `bash -n` sobre `candidato-VPS-07-setup-volumenes.sh`: OK.
- `bash -n` sobre `candidato-VPS-07-sftp-helpers.sh`: OK.
- `python -m json.tool` sobre `candidato-VPS-07-sftp.json.template`: OK.
- Verificado que `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/**/.gitkeep` existe en repo.

## Pasos recomendados para Aleph

Devolver `VPS-07` a `en-curso:sony` con este feedback. No copiar todavía los scripts a `ScriptoriumVps/` hasta que usen variables canónicas y creen el layout necesario para los mounts actuales.
