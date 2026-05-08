# Revisión — REV-VPS-04-R2

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-04
> **Agente entregador:** gepe
> **Fecha:** 2026-05-08 20:29:48

## Veredicto: aprobada

## Checklist de criterios de aceptación

- [x] `nodered` como contenedor único con projects habilitados y `adminAuth` configurado.
- [x] `scriptorium.escrivivir.co/red` modelado como editor/flujos read-only para público anónimo mediante `adminAuth.default = { permissions: "read" }`.
- [x] Público anónimo sin permisos de edición/deploy/credentials/projects, condicionado a credenciales admin reales en `.env` no versionado.
- [x] `admin.scriptorium.escrivivir.co` modelado para admin autenticado y compatible con Basic Auth extra en Caddy.
- [x] `/ui` y `/dashboard` preparados por defecto; Dashboard 2 queda pendiente de smoke real al integrar/desplegar, como ya declara la entrega.
- [x] Instalación de contribs sin privilegiar `escribiente`: los paquetes locales se gestionan por manifiesto DRY.
- [x] Corrección pedida en la revisión anterior: los contribs locales se construyen antes de instalarse y se validan con `smokeFiles`.
- [x] Ningún servicio interno publica `1880` directamente al exterior.

## Observaciones

La reentrega corrige el bloqueo anterior. El Dockerfile ahora ejecuta:

1. `build-local-contribs.mjs` antes de instalar contribs en `/data`.
2. `install-contribs.mjs` sólo después de verificar artefactos.

El manifiesto `node-red-contribs.json` declara `buildCommand` y `smokeFiles` por paquete:

- `node-red-contrib-alephscript`: `dist/index.js`, `dist/nodes/bot-node.js`.
- `node-red-contrib-alephscript-firehose`: `dist/index.js`, `dist/nodes/firehose-consumer.js`.
- `node-red-dashboard-2-alephscript-escribiente`: `dist/index.js`, `dist/nodes/escribiente-dashboard-recorder.js`, `resources/escribiente-dashboard-recorder.umd.js`.

Esto resuelve la devolución anterior: ya no se instalan paquetes locales “en crudo” sin `dist/`.

## Pasos recomendados para Aleph

Aprobar `VPS-04` y, cuando toque el cierre/integración, copiar los artefactos candidatos a `ScriptoriumVps/PATTERN-DOCKER/nodered/` y aplicar los patches de compose/env. No ejecutar despliegue real ni Docker/VPS vivo sin validación expresa del PO.
