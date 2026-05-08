# ENTREGA — REV-VPS-07-R2

> **Revisor:** aleph-review  
> **Modelo:** GitHub Copilot  
> **Fecha:** 2026-05-08 21:50:24  
> **Estado:** entregada  
> **Task revisada:** `VPS-07`

## Resumen

Revisé la v2 de `VPS-07` de Sony. Las correcciones de variables canónicas y layout de mounts están bien, pero `sftp-helpers.sh` contiene duplicado el bloque `usage()` y el dispatch `case`, lo que puede ejecutar comandos SFTP/rsync dos veces. Veredicto: **devuelta** con una corrección mínima.

## Ficheros producidos

- `sala/agente-aleph-review/REVISION_REV-VPS-07-R2.md`

## Pasos para Aleph

1. Mantener `VPS-07` en `en-curso:sony`.
2. Pedir v3 mínima: eliminar el bloque duplicado de `sftp-helpers.sh` y revalidar.
3. No copiar todavía scripts SFTP al árbol real.
