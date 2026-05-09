# TASK-06 — Stack Verdaccio público

> **Estado:** cerrada — stack operativo en VPS desde 2026-05-09
> **Agente recomendado:** `verdaccio-keeper`
> **Dependencias:** VPS-01, VPS-03
> **Entrega esperada:** Verdaccio público para paquetes `@alephscript/*`

## Lee primero

1. `ScriptoriumVps/RUNBOOK.md` — runbook general VPS y recovery.
2. `ScriptoriumVps/PATTERN-DOCKER/verdaccio/config.yaml` — configuración real Verdaccio.
3. `ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml` — servicio `verdaccio`, red y mounts.
4. `ScriptoriumVps/scripts/create-verdaccio-user.sh` — alta idempotente de usuarios htpasswd.
5. `ScriptoriumVps/scripts/publish-package.sh` — publicación controlada de paquetes.
6. `ScriptoriumVps/scripts/unpublish-package.sh` — borrado controlado de paquetes/versiones.
7. `ScriptoriumVps/.npmrc.example` — plantilla de autenticación npm.
8. `MCPGallery/mcp-core-sdk/package.json` — paquete inicial publicado y ejemplo de metadata.
9. `sala/dossiers/scriptorium-vps/tasks/TASK-08_RUNBOOK_Y_VERIFICACION.md` — evidencia histórica de ventana 2026-05-09.

## Objetivo

Mantener un registry npm público para que los Dockerfiles, stacks y desarrolladores del ecosistema MCPGallery/WiringEditor puedan instalar paquetes internos `@alephscript/*` desde `https://npm.scriptorium.escrivivir.co`, sin depender de empaquetados locales ad hoc.

Este documento es la **fuente canónica Verdaccio** para dev/ops. El `RUNBOOK.md` conserva solo operación/recovery general del VPS; `TASK-08` conserva evidencia histórica de despliegue y verificación.

## Estado actual — 2026-05-09

| Ítem | Estado |
|---|---|
| Host público | `https://npm.scriptorium.escrivivir.co` operativo |
| Scope canónico | `@alephscript/*` |
| Paquete inicial | `@alephscript/mcp-core-sdk@1.3.0` publicado |
| Metadata UI | `Author`/`Maintainers`: `AlephScript Ops <ops@escrivivir.co>` |
| Auth publish/unpublish | `htpasswd`, usuario admin creado con `create-verdaccio-user.sh` |
| Storage | `/srv/oasis/scriptorium/verdaccio/storage` |
| Owner storage | `10001:65533` (usuario `verdaccio` dentro del contenedor) |
| Proxy upstream | `https://registry.npmjs.org/` |

## Arquitectura

### Servicio público

- URL: `https://npm.scriptorium.escrivivir.co`
- Healthcheck público: `https://npm.scriptorium.escrivivir.co/-/ping`
- Edge: Caddy existente de `OASIS_PUB`, no Caddy propio en producción compartida.
- Upstream interno: alias Docker `scriptorium-verdaccio:4873`.
- Red compartida con edge: `oasis-pub-scriptorium_oasis_pub_net`.

### Scope y proxy

`config.yaml` define:

- `@alephscript/*`: lectura pública, publish/unpublish autenticado.
- `node-red-contrib-alephscript*`: lectura pública, publish/unpublish autenticado.
- `**`: lectura pública, publish autenticado.
- Uplink `npmjs`: `https://registry.npmjs.org/`.

### Storage persistente

```text
/srv/oasis/scriptorium/verdaccio/
  ├─ conf/                  ← configuración / patrón
  └─ storage/               ← owner 10001:65533
       ├─ htpasswd           ← usuarios Verdaccio
       ├─ .verdaccio-db.json ← índice local
       └─ @alephscript/
            └─ <paquete>/
                 ├─ package.json
                 └─ <tarball>.tgz
```

## Configuración técnica

### `config.yaml`

Ruta patrón:

```text
ScriptoriumVps/PATTERN-DOCKER/verdaccio/config.yaml
```

Decisiones relevantes:

- `auth.htpasswd.file=/verdaccio/storage/htpasswd`
- `auth.htpasswd.max_users=-1`
- `security.api.legacy=false`
- `middlewares.audit.enabled=true`
- `web.title=Aleph Scriptorium Registry`

`max_users: -1` significa que el registro vía API REST está desactivado. Por tanto, **no usar** `curl PUT /-/user/...` como procedimiento vigente para crear usuarios.

### `docker-compose.yml`

Servicio:

```text
ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml → services.verdaccio
```

Mounts clave:

- `./verdaccio/config.yaml:/verdaccio/conf/config.yaml:ro`
- `${SCRIPTORIUM_REMOTE_ROOT}/verdaccio/storage:/verdaccio/storage`

Redes:

- `scriptorium-vps` — red interna stack.
- `oasis-pub-scriptorium_oasis_pub_net` — red externa compartida con Caddy OASIS_PUB.
- Alias estable: `scriptorium-verdaccio`.

### Variables y secretos

No versionar secretos reales. Fuentes locales ignoradas por git:

```text
ScriptoriumVps/.env
ScriptoriumVps/.env.generated-secrets
```

Variables Verdaccio relevantes:

```text
VERDACCIO_ADMIN_USER=admin
VERDACCIO_ADMIN_PASSWORD=...
VERDACCIO_NPM_TOKEN=...          # referencia; no usar como _authToken npm
VERDACCIO_PUBLIC_URL=https://npm.scriptorium.escrivivir.co
VERDACCIO_PUBLISHER_EMAIL=ops@escrivivir.co
```

## UIDs y permisos

| Proceso | UID:GID | Motivo |
|---|---|---|
| Node-RED, MCP, `ARCHIVO/` | `1000:1000` | UID:GID compartido Scriptorium |
| Verdaccio | `10001:65533` | Imagen oficial `verdaccio/verdaccio`; proceso interno `verdaccio:nogroup` |

`ScriptoriumVps/scripts/setup-volumenes.sh` debe:

1. Crear todo el layout en `${SCRIPTORIUM_REMOTE_ROOT:-/srv/oasis/scriptorium}`.
2. Aplicar `chown -R 1000:1000` al árbol general.
3. Sobrescribir `verdaccio/storage` con `chown -R 10001:65533`.

Sin el paso 3, Verdaccio falla con `EACCES: permission denied, mkdir '/verdaccio/storage/...'` al crear usuarios, cachés o tarballs.

## Operaciones dev

### Metadata obligatoria de paquetes

Todo paquete `@alephscript/*` debe declarar `author` y `maintainers` antes de publicar. La web UI de Verdaccio muestra `Author`/`Maintainers` desde el `package.json` publicado, **no** desde el usuario htpasswd que hizo publish.

Ejemplo mínimo:

```json
{
  "author": {
    "name": "AlephScript Ops",
    "email": "ops@escrivivir.co",
    "url": "https://escrivivir.co"
  },
  "maintainers": [
    {
      "name": "AlephScript Ops",
      "email": "ops@escrivivir.co",
      "url": "https://escrivivir.co"
    }
  ]
}
```

Si falta `author`, la UI puede mostrar `Anonymous` aunque la publicación haya sido autenticada correctamente.

### Publicar un paquete

Usar siempre el script controlado:

```bash
bash ScriptoriumVps/scripts/publish-package.sh <ruta-al-directorio-del-paquete>
```

Ejemplo:

```bash
bash ScriptoriumVps/scripts/publish-package.sh MCPGallery/mcp-core-sdk
```

El script:

- carga `ScriptoriumVps/.env.generated-secrets`;
- valida que el paquete sea `@alephscript/*` o pide confirmación;
- valida `dist/`;
- valida `author` y `maintainers`;
- escribe auth temporal en `~/.npmrc`;
- ejecuta `npm publish --registry https://npm.scriptorium.escrivivir.co`;
- restaura `~/.npmrc` al salir.

### Instalar desde el registry

Uso puntual:

```bash
npm install @alephscript/<paquete> \
  --registry https://npm.scriptorium.escrivivir.co
```

Configuración persistente del proyecto (`.npmrc`, ver `ScriptoriumVps/.npmrc.example`):

```text
@alephscript:registry=https://npm.scriptorium.escrivivir.co
//npm.scriptorium.escrivivir.co/:username=<usuario>
//npm.scriptorium.escrivivir.co/:_password=<base64 password>
//npm.scriptorium.escrivivir.co/:email=<email>
//npm.scriptorium.escrivivir.co/:always-auth=true
```

`_password` es base64 **solo del password**, no `usuario:password`.

### Verificar paquete publicado

```bash
npm view @alephscript/<paquete> \
  --registry https://npm.scriptorium.escrivivir.co
```

Para verificar metadata visible:

```bash
npm view @alephscript/<paquete> author maintainers \
  --registry https://npm.scriptorium.escrivivir.co
```

### Borrar paquete o versión

```bash
bash ScriptoriumVps/scripts/unpublish-package.sh @alephscript/<paquete>
bash ScriptoriumVps/scripts/unpublish-package.sh @alephscript/<paquete> <version>
```

Usar solo en ventana controlada o con aprobación explícita, porque elimina metadata/tarballs del registry.

## Operaciones ops

### Crear usuario Verdaccio

Ejecutar en el VPS desde `/opt/aleph-scriptorium/ScriptoriumVps`:

```bash
export SCRIPTORIUM_DEPLOY_CONFIRM=YES_DEPLOY_SCRIPTORIUM_VPS
bash scripts/create-verdaccio-user.sh
```

Para un usuario específico:

```bash
bash scripts/create-verdaccio-user.sh <usuario> <password>
```

El script es idempotente y crea la entrada directamente en `htpasswd` con hash APR1 generado dentro del contenedor.

### Verificar servicio

```bash
bash ScriptoriumVps/scripts/verify-verdaccio.sh
npm ping --registry https://npm.scriptorium.escrivivir.co/
```

### Revisar contenedor y logs

En el VPS:

```bash
docker ps --filter name=scriptorium-vps-verdaccio-1
docker logs --tail 100 scriptorium-vps-verdaccio-1
```

### Revisar storage

En el VPS:

```bash
find /srv/oasis/scriptorium/verdaccio/storage -maxdepth 4 -type f | sort
ls -la /srv/oasis/scriptorium/verdaccio/storage
```

## Troubleshooting

| Síntoma | Causa probable | Corrección |
|---|---|---|
| `EACCES: permission denied, mkdir '/verdaccio/storage/...'` | `storage` con owner incorrecto | `sudo chown -R 10001:65533 /srv/oasis/scriptorium/verdaccio/storage` |
| `409 Conflict` al crear usuario vía API | `max_users: -1` bloquea registro REST | Usar `scripts/create-verdaccio-user.sh`, no `curl PUT /-/user/...` |
| `E401 Unable to authenticate` en `npm publish` | `_authToken` no aplica a este flujo htpasswd | Usar `publish-package.sh` o `.npmrc` con `username` + `_password` + `email` |
| `404 no such package` al publicar `.tgz` explícito | npm valida con GET y `proxy: npmjs` devuelve 404 | Publicar desde el directorio del paquete, sin pasar tarball explícito |
| UI muestra `Author: Anonymous` | Falta `author` en `package.json` publicado | Añadir `author`/`maintainers`, borrar y republicar la versión |
| `npm view` no ve el paquete tras publish | Caché/restart o publish fallido | `npm ping`, revisar logs Verdaccio, comprobar storage |

## Lote inicial

| Paquete | Estado |
|---|---|
| `@alephscript/mcp-core-sdk@1.3.0` | Publicado y verificado 2026-05-09 |
| `@alephscript/mcp-mesh-sdk` | Pendiente |
| `@alephscript/mcp-channels-sdk` | Pendiente si aplica como paquete separado |
| Paquetes Node-RED WiringEditor | Pendientes según manifiesto |

Verificación del paquete inicial:

```bash
npm view @alephscript/mcp-core-sdk author maintainers \
  --registry https://npm.scriptorium.escrivivir.co
```

Resultado esperado:

```text
author = 'AlephScript Ops <ops@escrivivir.co> (https://escrivivir.co)'
maintainers = 'AlephScript Ops <ops@escrivivir.co> (https://escrivivir.co)'
```

## Referencias cruzadas

- `ScriptoriumVps/RUNBOOK.md` — operación general VPS, recovery y checks mínimos.
- `sala/dossiers/scriptorium-vps/tasks/TASK-08_RUNBOOK_Y_VERIFICACION.md` — evidencia histórica de la ventana del 2026-05-09.
- `ScriptoriumVps/PATTERN-DOCKER/verdaccio/config.yaml` — configuración Verdaccio.
- `ScriptoriumVps/.npmrc.example` — plantilla auth npm.

## Criterio de aceptación

- `npm.scriptorium.escrivivir.co` responde con Verdaccio.
- Auth requerida para publish/unpublish.
- `npm install @alephscript/mcp-core-sdk --registry ...` funciona tras publicación.
- El storage persiste en `/srv/oasis/scriptorium/verdaccio/storage`.
- Los paquetes `@alephscript/*` publicados declaran `author` y `maintainers`.
