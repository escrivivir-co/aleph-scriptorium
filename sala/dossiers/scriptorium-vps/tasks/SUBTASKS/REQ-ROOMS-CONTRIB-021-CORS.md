# REQ — `node-red-dashboard-2-alephscript-rooms@0.2.1` — CORS configurable

> **Origen:** ventana operativa `R10-02A.1` (TASK-10 Pub.Rooms federado).
> **Destino:** agente que mantiene los contribs `WiringEditor/packages/node-red-*-alephscript-*`.
> **Estado:** **cancelado — premisa inválida (PO 2026-05-09)**. No publicar `0.2.1` por este motivo.
> **Fecha de apertura:** 2026-05-09.
> **Fecha de cancelación:** 2026-05-09.
> **Autor:** `GitHub Copilot` (ventana ops VPS).

## Cancelación (PO 2026-05-09)

Esta petición se cancela. Análisis de coherencia posterior demostró que la premisa que la motivaba era falsa:

- los casos b/c federados de TASK-10 son **Node-RED → Node-RED** vía `socket.io-client` desde Node.js, **no** navegadores;
- Node.js **no** ejecuta preflight CORS y el handshake Socket.IO desde Node.js ignora la cabecera `Origin` para validación;
- el único consumidor navegador real del MVP es el widget `alephscript-rooms-dashboard` servido desde `https://scriptorium.escrivivir.co`, que **ya está** en `DEFAULT_CORS_ORIGINS` de `0.2.0`;
- PO confirma (2026-05-09) que **ningún caso de uso del MVP** implica que un navegador en origen arbitrario abra Socket.IO contra `rooms.`.

Conclusión: `0.2.0` cubre todos los casos del MVP federado. La opción A (`'*'`) no es necesaria. La opción B (lista cerrada) **no rompe** los casos b/c porque esos casos no son navegador. La ventana `R10-02A.1` se reabre con `0.2.0` sin esperar a `0.2.1`.

Si en el futuro aparece un caso de uso navegador en origen arbitrario, esta REQ puede reabrirse con caso de uso explícito documentado en TASK-10 antes de pedir el bump.

Lo descrito a continuación queda como referencia histórica del análisis técnico, **sin acción pendiente**.

---

## Contexto

Tras cerrar `R10-02A.0` (persistencia Node-RED en bind mount Gandi), la ventana operativa intenta encadenar `R10-02A.1` (runtime al día + auth real). El plan registrado en `TASK-10_PUB_ROOMS_FEDERATED.md` §"Plan de despliegue secuencial — fold-in persistencia (PO 2026-05-09)" indica:

> **CORS — decisión a confirmar con PO antes de R10-02B:** la allow-list previa (`https://scriptorium.escrivivir.co`, `https://admin.scriptorium.escrivivir.co`, `http://127.0.0.1:1880`, `http://localhost:1880`) **no cubre clientes federados** (Node-REDs locales en orígenes desconocidos, casos b/c). Dos opciones:
> - A) `cors.origins='*'` para `rooms.` aceptando que la auth real vive en `authValidator` (recomendado para MVP federado);
> - B) lista cerrada que solo permite usar `rooms.` desde el dashboard del propio VPS (rompe el caso b/c).

El PO confirmó **decisión A** el 2026-05-09 (ventana operativa actual).

## Bloqueante detectado

En `node-red-dashboard-2-alephscript-rooms@0.2.0` (publicado en Verdaccio y validado en `R10-PF0.2`), el cableado de CORS hacia el SDK está **hardcoded** y no es configurable desde el flow ni desde env. Referencia:

- [`WiringEditor/packages/node-red-dashboard-2-alephscript-rooms/src/nodes/rooms-server.ts`](../../../../WiringEditor/packages/node-red-dashboard-2-alephscript-rooms/src/nodes/rooms-server.ts) líneas 53-57:

```ts
const DEFAULT_CORS_ORIGINS = [
  'https://scriptorium.escrivivir.co',
  'https://admin.scriptorium.escrivivir.co',
  'http://127.0.0.1:1880',
  'http://localhost:1880'
]
```

- y líneas 168-176:

```ts
entry.promise = mesh.init({
  port: configNode.managedPort,
  host: bindHost,
  healthPath: entry.healthPath,
  authValidator: secrets ? makeSharedSecretValidator({ secrets }) : undefined,
  cors: {
    origins: DEFAULT_CORS_ORIGINS,
    credentials: true
  },
  exposeAdminUI: false
})
```

`DEFAULT_CORS_ORIGINS` se inyecta directamente en `mesh.init({ cors: { origins } })` sin posibilidad de override. Por tanto, instalar `0.2.0` en producción y editar el flow **no permite alcanzar la decisión A**: lo que se entregaría sería de facto la opción B (lista cerrada), incompatible con los casos b) amigo invitado y c) mesh entre amigos del propio TASK-10.

El SDK `@alephscript/mcp-core-sdk@1.4.0` ya soporta `cors.origins` arbitrario (incluido `'*'`), así que la corrección es en el contrib, no en el SDK.

## Petición

Publicar `node-red-dashboard-2-alephscript-rooms@0.2.1` con CORS configurable, manteniendo backward compatibility de `0.2.0`.

### Cambios pedidos

1. **Nuevo env `ROOMS_CORS_ORIGINS`** leído por `rooms-server.ts`:
   - acepta lista CSV (`a,b,c`), o el literal `*`;
   - trim + dedupe + descarta entradas vacías;
   - si está ausente o vacío → mantiene `DEFAULT_CORS_ORIGINS` actual (compat 0.2.0);
   - si es exactamente `*` → pasa al SDK `cors: { origins: '*', credentials: false }` (con `credentials:false`, porque `'*'` + `credentials:true` lo rechazan los navegadores).
2. **Campo opcional `corsOrigins` en `alephscript-rooms-config`** (UI editor + runtime):
   - mismo formato que el env;
   - si presente, **gana** sobre el env (orden: campo de config > env > default);
   - documentar en `rooms-config.html` que `corsOrigins='*'` aplica solo cuando `authValidator` está activo (delegamos confianza al token, no al origen).
3. **Logging mínimo no sensible** al arrancar el mesh:
   - `node.log` con `cors.mode = 'default' | 'env' | 'config' | 'wildcard'` y `cors.origins.count` (sin imprimir la lista entera; en modo wildcard imprimir literal `*`).
4. **Tests / smoke**:
   - actualizar `npm run smoke:auth` (o equivalente del package) para cubrir un escenario `ROOMS_CORS_ORIGINS=*` con auth válida e inválida.
5. **Bump `package.json` → `0.2.1`** + entrada en `CHANGELOG.md`:
   - "feat(cors): allow `ROOMS_CORS_ORIGINS` env and `corsOrigins` config field; backward compatible with 0.2.0";
   - confirmar dependencia `@alephscript/mcp-core-sdk@^1.4.0` sin cambios.
6. **Publicar tarball** en Verdaccio `https://npm.scriptorium.escrivivir.co` con `author`/`maintainers` correctos (mismo flujo que `0.2.0`).

### Lo que NO pedimos (fuera de alcance)

- cambios en el SDK `@alephscript/mcp-core-sdk` (la API `cors.origins` ya cubre el caso A).
- cambios en `node-red-contrib-alephscript-core@0.2.0` (el cliente sigue propagando `auth` correctamente, no necesita tocar CORS).
- cambios en el flow MVP `rooms-mvp-candidate.flow.json`. El ajuste del flow para activar `corsOrigins='*'` se hará en la propia ventana `R10-02A.1` cuando 0.2.1 esté publicado.
- extracción del runtime Rooms a service compose propio (sigue en `TASK-11` futuro).

## Criterio de aceptación

- `npm view node-red-dashboard-2-alephscript-rooms@0.2.1 version --registry https://npm.scriptorium.escrivivir.co` devuelve `0.2.1`.
- En un Node-RED scratch con `ROOMS_CORS_ORIGINS=*` y `ROOMS_SECRETS_FILE` apuntando a un JSON válido:
  - cliente con token correcto desde un origen arbitrario (ej. `http://example.invalid:1880`) conecta;
  - cliente con token incorrecto desde el mismo origen recibe `connect_error('unauthorized')`;
  - log del server muestra `cors.mode='env'` o `'wildcard'`.
- En un Node-RED scratch sin `ROOMS_CORS_ORIGINS` ni `corsOrigins` en config, el comportamiento es **idéntico** a `0.2.0` (lista cerrada actual).
- `package.json` ↑ a `0.2.1`, `CHANGELOG.md` actualizado, commit + tarball publicado.

## Devolución a la ventana ops

Una vez publicado `0.2.1`, esta ventana retomará `R10-02A.1` con:

- bump a `^0.2.1` en consumidores afectados (en realidad solo el flow del VPS lo consume directamente — el `npm install` se hará sobre `/data` dentro del contenedor, ya persistente);
- editar el flow Rooms para añadir `corsOrigins='*'` en `alephscript-rooms-config`;
- continuar con secret real, env vars, `npm install`, `/healthz` y handshake auth válido/inválido como pide el plan.

Cuando termine la publicación y los smoke locales, **avisar a la ventana ops** (este dossier puede actualizarse a `Estado: cerrado — 0.2.1 publicado` con la evidencia de tarball/checks).
