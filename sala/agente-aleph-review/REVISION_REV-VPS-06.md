# Revisión — REV-VPS-06

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-06
> **Agente entregador:** gepe
> **Fecha:** 2026-05-08 21:34:27

## Veredicto: aprobada

## Checklist de criterios de aceptación

- [x] `npm.scriptorium.escrivivir.co` modelado como host público de Verdaccio detrás del edge compartido.
- [x] Auth requerida para publish mediante `htpasswd` + token npm para CI documentado.
- [x] Scope canónico `@alephscript/*` configurado en `.npmrc.example`.
- [x] Compatibilidad Node-RED documentada sin renombrar paquetes `node-red-contrib-*` fuera de su ecosistema.
- [x] Storage persistente en `/srv/scriptorium/verdaccio/storage` modelado en compose.
- [x] Proxy upstream a `https://registry.npmjs.org/` configurado.
- [x] Pipeline de publicación desde `MCPGallery/WiringEditor` preparado con `dry-run` por defecto.
- [x] `mcp-channels-sdk` no se fuerza: queda bloqueado explícitamente porque el paquete actual es monorepo `private=true`.
- [x] Smoke tests publish/install documentados.

## Validación realizada

- Leídos `ENTREGA_VPS-06.md`, `TASK-06_STACK_VERDACCIO.md` y artefactos candidatos.
- Validado sintácticamente `publish-initial-packages.mjs` con `node --check`.
- Validado JSON del manifiesto con `python -m json.tool`.
- Contrastado que `MCPGallery/mcp-channels-sdk/ws-server/package.json` es `private: true`, justificando el bloqueo.

## Observaciones

La entrega cubre el objetivo de diseño/candidato. El pipeline hace staging temporal, construye, valida smoke files, reescribe `package.json` para `publishConfig.registry` y evita publicación real salvo `PUBLISH_MODE=publish`.

Notas para integración:

- `max_users: -1` en Verdaccio desactiva autoregistro; queda coherente si Aleph/PO crean el usuario inicial fuera de repo o editan `htpasswd` operacionalmente.
- El primer `publish` real sigue bloqueado hasta orden del PO y debe ejecutarse con token real fuera del repo.
- Al integrar, conviene ejecutar primero el pipeline en `PUBLISH_MODE=dry-run` en entorno controlado.

## Pasos recomendados para Aleph

Aprobar `VPS-06` y dejarla como `entregada:gepe` pendiente de integración/copia al árbol real. No ejecutar publicación real, Docker remoto, DNS/Gandi ni cambios en VPS vivo sin validación expresa del PO.
