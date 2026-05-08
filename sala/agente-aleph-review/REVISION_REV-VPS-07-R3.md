# Revisión — REV-VPS-07-R3

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-07
> **Agente entregador:** Sony; corrección mínima aplicada por Aleph por excepción PO
> **Fecha:** 2026-05-08 22:08:50

## Veredicto: aprobada

## Checklist de criterios de aceptación

- [x] `ARCHIVO` y `ARCHIVO/DISCO` documentados con `.gitkeep` en layout VPS.
- [x] `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` existe en repo con `.gitkeep` mínimos.
- [x] UID:GID `1000:1000` fijado por defecto y configurable.
- [x] `node-red-projects/` documentado como bind desde monorepo hacia `/data/projects`, sin fuente de verdad duplicada en `/srv/scriptorium/node-red/projects`.
- [x] Plantilla SFTP usa variables canónicas `SCRIPTORIUM_SSH_*` y `SCRIPTORIUM_REMOTE_ROOT`, sin secretos reales.
- [x] `setup-volumenes.sh` crea paths host requeridos por mounts actuales: `MCP_DATA/devops-mcp-server`, `SCRIPTORIUM_VPS/audit`, Verdaccio storage y datos operativos Node-RED.
- [x] `sftp-helpers.sh` usa variables canónicas y cubre health/tree/sync-down/sync-up/open-sftp.
- [x] Corrección R2: eliminado duplicado de `usage()` y dispatch `case` en `sftp-helpers.sh`.

## Validación realizada

Sin ejecutar SSH/SFTP ni tocar VPS real:

- `bash -n sala/agente-sony/candidato-VPS-07-sftp-helpers.sh`
- `bash -n ScriptoriumVps/scripts/sftp-helpers.sh`
- `bash -n ScriptoriumVps/scripts/setup-volumenes.sh`
- `python -m json.tool ScriptoriumVps/sftp.json.template`
- `grep -c '^usage()' ...` → `1` en candidato e integrado.
- `grep -c '^case "${1:-help}" in' ...` → `1` en candidato e integrado.

## Artefactos integrados por Aleph

- `ScriptoriumVps/scripts/setup-volumenes.sh`
- `ScriptoriumVps/scripts/sftp-helpers.sh`
- `ScriptoriumVps/sftp.json.template`
- `ScriptoriumVps/.env.example` actualizado con placeholders canónicos SSH/SFTP.

## Observaciones

La corrección aplicada por Aleph fue deliberadamente mínima: retirar el bloque duplicado del helper y copiar los artefactos al destino final. No se ejecutó ningún comando remoto, no se abrió SFTP, no se tocó `OASIS_PUB`, no se tocó `GANDI_DEVOPS_FOLDER` y no se operó el VPS vivo.

## Pasos recomendados para Aleph

`VPS-07` puede cerrarse. `VPS-08` sigue sin abrir hasta que Aleph integre/cierre también `VPS-04`, `VPS-05` y `VPS-06`.
