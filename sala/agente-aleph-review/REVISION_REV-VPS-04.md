# Revisión — REV-VPS-04

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-04
> **Agente entregador:** gepe
> **Fecha:** 2026-05-08 19:46:00

## Veredicto: devuelta

## Checklist de criterios de aceptación

- [~] `nodered` como contenedor único con projects habilitados y `adminAuth` configurado: el diseño y `settings.js` lo modelan, pero el contenedor no queda confiablemente arrancable con los contribs locales actuales.
- [x] `scriptorium.escrivivir.co/red` modelado como editor/flujos read-only para público anónimo mediante `adminAuth.default = { permissions: "read" }`.
- [x] Público anónimo sin permisos de edición/deploy/credentials/projects, condicionado a que existan credenciales admin en `.env`.
- [x] `admin.scriptorium.escrivivir.co` modelado para admin autenticado y compatible con Basic Auth extra en Caddy.
- [~] `/ui` y `/dashboard` preparados: `/ui` está alineado con Dashboard clásico; Dashboard 2 queda como convención `dashboard.path` pendiente de smoke real.
- [✗] Instalación de contribs sin privilegiar `escribiente`: está manifiestada sin trato especial, pero los paquetes locales `WiringEditor/packages/node-red-contrib-*` no tienen `dist/` generado y sus `package.json` apuntan a `dist/index.js` o `dist/nodes/*.js`.
- [x] Ningún servicio interno publica `1880` directamente al exterior.

## Observaciones

La entrega cumple la arquitectura de alto nivel, pero no debe integrarse todavía porque el Dockerfile instala paquetes locales de Node-RED desde `WiringEditor/packages/...` sin construirlos primero.

Verificación en disco:

- `WiringEditor/packages/node-red-contrib-alephscript/dist/**` no existe.
- `WiringEditor/packages/node-red-contrib-alephscript-firehose/dist/**` no existe.
- `WiringEditor/packages/node-red-contrib-alephscript-escribiente/dist/**` no existe.
- Los `package.json` de esos paquetes declaran `main`/nodos bajo `dist/`.
- Los scripts disponibles son `build`/`build:full`/`prepublishOnly`, pero no `prepare`; por tanto `npm install /opt/aleph/WiringEditor/packages/...` no garantiza que Node-RED reciba artefactos compilados.

Esto afecta el criterio principal: el contenedor puede construirse parcialmente o instalar paquetes sin nodos cargables, y `nodered` no queda validablemente arrancable con los contribs esperados.

## Corrección requerida

Gepe debe ajustar el candidato para que los paquetes locales estén compilados antes de instalarlos en `/data`, por ejemplo:

1. En el Dockerfile, para cada paquete local:
   - instalar dependencias;
   - ejecutar `npm run build` o `npm run build:full` según corresponda;
   - verificar que `dist/` y recursos necesarios existen antes de `npm install` en `/data`.
2. O generar/usar tarballs versionados de esos paquetes ya construidos.
3. Añadir una comprobación de build/smoke documental: `node -e` o `test -f` sobre los entrypoints `dist` que Node-RED cargará.
4. Mantener el manifiesto de contribs como mecanismo DRY; no convertir `escribiente` en caso especial.

## Pasos recomendados para Aleph

Devolver `VPS-04` a `en-curso:gepe` con este feedback. No copiar todavía `Dockerfile`, `settings.js` ni patches al destino final hasta que el candidato demuestre que los contribs locales quedan compilados/cargables.
