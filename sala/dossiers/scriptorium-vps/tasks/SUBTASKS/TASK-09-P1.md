# TASK-09-P1 — Refactor deuda `node-red-contrib-alephscript`

> **Fecha:** 2026-05-09  
> **Estado:** entregado para revisión  
> **Ámbito:** P1 de TASK-09 — deuda existente antes del paquete Rooms Dashboard 2 moderno

## Resumen ejecutivo

Se ejecutó P1 como refactor preparatorio y no como implementación del MVP visual de Rooms.

Decisión aplicada tras revisión:

- Mantener P0 como paquete recomendado para el MVP Rooms moderno: `node-red-dashboard-2-alephscript-rooms`.
- Resolver P1 separando un paquete core nuevo y publicable: `node-red-contrib-alephscript-core`.
- Quitar el widget legacy `alephscript-room-tester` en vez de convertirlo a Vue/Dashboard 2, para reducir faena y evitar mezclar UI antigua con el futuro P0.
- Mantener P2 sin cambios como fase futura opcional: servicio separado sólo si el MVP demuestra necesidad real.

## Encaje con P0, P1, P2 y R09

### P0 — Rooms Dashboard 2 moderno

P0 sigue siendo el camino principal para la entrega pedagógica de Rooms.

Debe cubrir:

- R09-02 — Crear package Rooms Dashboard 2.
- R09-03 — Implementar widget Vue Rooms.
- R09-04 — Implementar server/agent dummy.
- R09-05 — Flow template Node-RED.
- R09-06 — Publicar Rooms en Verdaccio.
- R09-07 — Actualizar RUNBOOK.

Este trabajo P1 no sustituye P0: deja la base limpia para que P0 no tenga que cargar deuda del `room-tester` embebido.

### P1 — deuda existente

P1 queda acotado a:

- R09-01 — Normalizar dependencia del SDK.
- Separar un core genérico sin UI legacy.
- Retirar `alephscript-room-tester` del paquete viejo.
- Asegurar metadatos de publicación Verdaccio.

Cambio respecto a la task original: en vez de "convertir `alephscript-room-tester` viejo a patrón Dashboard 2 Vue o marcarlo legacy", se decidió eliminarlo del paquete viejo. La UI Rooms moderna queda 100% en P0.

### P2 — futuro opcional

Sin cambios.

No se añadió contenedor nuevo ni servidor separado. El criterio sigue siendo post-MVP: aislamiento, carga, auth independiente o exposición pública de `/mesh/*`.

## Cambios realizados

### Nuevo paquete core

Creado:

- `WiringEditor/packages/node-red-contrib-alephscript-core/`

Contenido principal:

- `package.json`
- `tsconfig.json`
- `.npmrc`
- `README.md`
- `scripts/postbuild.cjs`
- `src/index.ts`
- `src/nodes/alephscript-core-config.ts/html`
- `src/nodes/alephscript-core-client.ts/html`
- `src/nodes/alephscript-core-format.ts/html`

Nodos publicados por el paquete:

| Nodo | Rol |
|---|---|
| `alephscript-core-config` | Config Socket.IO compartida, sin Dashboard UI. |
| `alephscript-core-client` | Cliente genérico para `CLIENT_REGISTER`, `CLIENT_SUSCRIBE`, `ROOM_MESSAGE`, `GET_SERVER_STATE` y `raw_emit`. |
| `alephscript-core-format` | Formateador simple para envelopes `app`, `sys`, `ui` y `room`. |

El paquete es intencionadamente pequeño. No contiene Dashboard 2, Vue ni widget Rooms.

### Paquete viejo `node-red-contrib-alephscript`

Actualizado:

- `@alephscript/mcp-core-sdk` pasa de `file:../../../MCPGallery/...tgz` a `1.3.0`.
- Añadidos `author` y `maintainers`, necesarios para Verdaccio UI y `publish-package.sh`.
- Añadido `files: ["dist/**/*"]`.
- Eliminado `alephscript-room-tester` de `node-red.nodes`.
- Eliminados los sources:
  - `src/nodes/alephscript-room-tester.ts`
  - `src/nodes/alephscript-room-tester.html`

Nota: se mantuvieron otros nodos históricos para no ampliar el alcance de P1 más allá del room tester indicado por la task.

### Normalización SDK / Verdaccio

Actualizados `package.json` y locks para evitar tarballs locales:

- `WiringEditor/package.json`
- `WiringEditor/package-lock.json`
- `WiringEditor/packages/node-red-contrib-alephscript/package.json`
- `WiringEditor/packages/node-red-contrib-alephscript/package-lock.json`
- `WiringEditor/packages/node-red-gamify-ui/package.json`
- `WiringEditor/packages/node-red-gamify-ui/package-lock.json`
- `WiringEditor/packages/node-red-contrib-alephscript-core/package.json`
- `WiringEditor/packages/node-red-contrib-alephscript-core/package-lock.json`

Añadidos `.npmrc` sin secretos:

- `WiringEditor/.npmrc`
- `WiringEditor/packages/node-red-contrib-alephscript/.npmrc`
- `WiringEditor/packages/node-red-contrib-alephscript-core/.npmrc`
- `WiringEditor/packages/node-red-gamify-ui/.npmrc`

Contenido:

```text
@alephscript:registry=https://npm.scriptorium.escrivivir.co
```

Motivo: al ejecutar `npm install` desde subpaquetes, npm no heredó de forma fiable el scope del root y buscó `@alephscript/mcp-core-sdk` en npmjs. El `.npmrc` local evita ese fallo.

### Manifiesto Node-RED del stack

Actualizado:

- `ScriptoriumVps/PATTERN-DOCKER/nodered/node-red-contribs.json`

Se añadió `node-red-contrib-alephscript-core` como workspace package con smoke file:

- `dist/index.js`
- `dist/nodes/alephscript-core-client.js`

El paquete viejo permanece en el manifiesto para revisión/migración controlada, pero ya sin `alephscript-room-tester`.

## Validación realizada

### Build del paquete core

Ejecutado:

```bash
cd WiringEditor/packages/node-red-contrib-alephscript-core
npm install
npm run build:full
```

Resultado:

- OK.
- Genera `dist/`.
- Copia HTML de los 3 nodos core.

### Build del paquete viejo

Ejecutado:

```bash
cd WiringEditor/packages/node-red-contrib-alephscript
npm run build:full
```

Resultado:

- OK.
- Se copian 12 HTML files.
- Ya no se copia `alephscript-room-tester.html`.

### Verificación de tarball publicable

Ejecutado:

```bash
npm pack --dry-run
```

Resultados relevantes:

- `node-red-contrib-alephscript-core@0.1.0`
  - tarball generado en dry-run.
  - incluye `dist/`, `README.md`, `package.json`.
  - total: 13 files.
- `node-red-contrib-alephscript@0.1.0`
  - tarball generado en dry-run.
  - no incluye `alephscript-room-tester`.
  - total: 39 files.

### Verificación de `.tgz` local

Ejecutado grep contra `WiringEditor/package*.json` y paquetes:

```bash
grep -R "alephscript-mcp-core-sdk-\|file:.*MCPGallery" -n WiringEditor/package.json WiringEditor/package-lock.json WiringEditor/packages/*/package.json WiringEditor/packages/*/package-lock.json || true
```

Resultado:

- Sin coincidencias.

### Errores de editor/TypeScript

Verificado:

- `WiringEditor/packages/node-red-contrib-alephscript-core`
- `WiringEditor/packages/node-red-contrib-alephscript/package.json`
- `WiringEditor/package.json`
- `ScriptoriumVps/PATTERN-DOCKER/nodered/node-red-contribs.json`

Resultado:

- Sin errores.

## Observaciones

- `npm install` reporta vulnerabilidades heredadas en árboles existentes. No se corrigieron porque P1 no es una tarea de actualización de dependencias y `npm audit fix` podría introducir cambios amplios.
- `publish-package.sh` advierte si el paquete no es `@alephscript/*`, pero Verdaccio permite `node-red-contrib-alephscript*` por `config.yaml`. El paquete core sigue ese patrón.
- Para publicar con el script, mantener `dist/` generado antes de ejecutar:
  - `bash ScriptoriumVps/scripts/publish-package.sh WiringEditor/packages/node-red-contrib-alephscript-core`

## Recomendación para integrar en TASK-09

Actualizar el texto de P1 a algo equivalente:

- Crear `node-red-contrib-alephscript-core` para nodos genéricos AlephScript.
- No convertir el `alephscript-room-tester` legacy.
- Retirar `alephscript-room-tester` del paquete viejo.
- Normalizar `@alephscript/mcp-core-sdk@1.3.0` desde Verdaccio.
- Reservar todo Dashboard 2 + Vue de Rooms para P0/R09-02 en adelante.

Con esto, el backlog queda más claro:

| Bloque | R09 | Resultado |
|---|---|---|
| P1 | R09-01 | Core limpio + SDK normalizado. |
| P0 | R09-02..R09-07 | Rooms Dashboard 2 moderno + flows + publicación + runbook. |
| P2 | Futuro | Servicio separado sólo si el MVP lo justifica. |

## Criterio P1

P1 queda listo para revisión porque:

- Hay paquete core candidato.
- No depende de `.tgz` local.
- Tiene metadata Verdaccio.
- Build local pasa.
- Tarball dry-run es publicable.
- El room tester legacy fue retirado.
- El manifiesto Node-RED conoce el core como workspace package.
