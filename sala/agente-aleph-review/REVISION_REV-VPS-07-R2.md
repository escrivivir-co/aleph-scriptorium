# Revisión — REV-VPS-07-R2

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-07
> **Agente entregador:** sony
> **Fecha:** 2026-05-08 21:50:24

## Veredicto: devuelta

## Checklist de criterios de aceptación

- [x] `ARCHIVO` y `ARCHIVO/DISCO` documentados con `.gitkeep` en layout VPS.
- [x] `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` existe en repo con `.gitkeep` mínimos.
- [x] UID:GID `1000:1000` fijado por defecto y configurable.
- [x] `node-red-projects/` ya no se confunde con `/srv/scriptorium/node-red/projects`; queda explicado como bind desde el monorepo hacia `/data/projects`.
- [x] Plantilla SFTP usa variables canónicas `SCRIPTORIUM_SSH_*` y `SCRIPTORIUM_REMOTE_ROOT`, sin secretos reales.
- [x] `setup-volumenes.sh` crea también paths de mounts previos para `MCP_DATA/devops-mcp-server` y `SCRIPTORIUM_VPS/audit`.
- [✗] `sftp-helpers.sh` no debe integrarse aún: contiene dos bloques `usage()` y dos bloques `case`, por lo que los comandos pueden ejecutarse dos veces.

## Observaciones

Sony corrigió correctamente los problemas de la revisión anterior:

- Variables `VPS_*` → `SCRIPTORIUM_SSH_*` / `SCRIPTORIUM_REMOTE_ROOT`.
- `remotePath` usa `${env:SCRIPTORIUM_REMOTE_ROOT}`.
- El layout crea `MCP_DATA/devops-mcp-server` y `SCRIPTORIUM_VPS/audit`.
- La ambigüedad de Node-RED projects queda resuelta.

Pero apareció un defecto nuevo en `candidato-VPS-07-sftp-helpers.sh`:

```text
usage() aparece en líneas 28 y 97
case "${1:-help}" aparece en líneas 87 y 109
```

Como el primer `case` no termina con `exit`, un comando operativo (`health`, `sync-down`, `sync-up`, `open-sftp`) puede ejecutarse y después caer en el segundo dispatch, ejecutándose otra vez. En helpers de SFTP/rsync esto no es aceptable: un `sync-up` doble o una sesión duplicada es justo el tipo de efecto lateral que esta supervisión debe evitar.

## Corrección requerida

Sony debe reentregar una v3 mínima:

1. Eliminar el segundo bloque duplicado de `usage()` y `case` en `candidato-VPS-07-sftp-helpers.sh`.
2. Añadir `exit 0` tras el dispatch final, o mantener un único dispatch al final del fichero.
3. Mantener las variables canónicas ya corregidas.
4. Revalidar con:
   - `bash -n candidato-VPS-07-sftp-helpers.sh`
   - revisión textual de que sólo hay un `usage()` y un `case "${1:-help}"`.

## Pasos recomendados para Aleph

Devolver `VPS-07` a `en-curso:sony` con este feedback. No copiar todavía `sftp-helpers.sh` al árbol real. `setup-volumenes.sh` y `sftp.json.template` parecen integrables tras la corrección, pero conviene copiar el trio completo sólo cuando la v3 esté limpia.
