# TASK-08 — Runbook y verificación end-to-end

> **Estado:** en-curso — base desplegada 2026-05-09, pendientes fase MCP y flujos Node-RED
> **Agente recomendado:** `vps-ops`  
> **Dependencias:** VPS-03, VPS-04, VPS-05, VPS-06, VPS-07  
> **Entrega esperada:** runbook deploy/verify para todo el lote

## Lee primero

1. Todas las tasks `VPS-01` a `VPS-07`
2. `ScriptoriumVps/README-SCRIPTORIUM.md` si ya existe
3. `sala/dossiers/scriptorium-vps/BACKLOG.md`

## Objetivo

Cerrar el lote con un runbook reproducible y pruebas de vida para los cuatro hosts públicos, los contenedores y los volúmenes.

## Cambios requeridos

- Crear `scripts/deploy.sh`.
- Crear `scripts/verify.sh`.
- Crear sección de **ventana controlada** antes de cualquier mutación real del VPS.
- Crear checks parciales:
  - `verify-dns.sh`
  - `verify-caddy.sh`
  - `verify-nodered.sh`
  - `verify-mcp-devops.sh`
  - `verify-verdaccio.sh`
  - `verify-volumes.sh`
- Documentar recuperación básica:
  - restart stack
  - revisar logs
  - rotar tokens
  - validar permisos SFTP
- Documentar preflight obligatorio antes de operar en vivo:
  - objetivo de la ventana
  - comandos exactos
  - rutas/servicios afectados
  - rollback
  - backup/snapshot esperado
  - variables/llaves usadas desde entorno local no versionado
  - criterio de éxito y condición de abortar

## Informe operativo

### Evidencia DNS actual — 2026-05-09

El PO creó los registros A reales y Aleph verificó resolución local:

| Host | Tipo | Valor verificado |
|---|---|---|
| `scriptorium.escrivivir.co` | A | `92.243.24.163` |
| `admin.scriptorium.escrivivir.co` | A | `92.243.24.163` |
| `mcp.scriptorium.escrivivir.co` | A | `92.243.24.163` |
| `npm.scriptorium.escrivivir.co` | A | `92.243.24.163` |

Nota: esto levanta el bloqueo DNS, pero no autoriza por sí solo SSH/Docker/Caddy real. Cualquier mutación del VPS sigue requiriendo ventana controlada.

### Corrección root de datos — 2026-05-09

El PO confirma que el root productivo de datos Scriptorium debe estar en el volumen Gandi `scriptorium-oasis-pub-volumen` montado en `/srv/oasis`, no en el disco de arranque `vps-boot`.

Ruta canónica para `VPS-08`:

```text
SCRIPTORIUM_REMOTE_ROOT=/srv/oasis/scriptorium
```

El layout temporal creado previamente en `/srv/scriptorium` pesa ~76K y debe migrarse/archivarse; no se seguirá usando como origen de mounts.
### Ejecución ventana controlada — 2026-05-09

Se ejecutó la ventana completa (fases 1-6). Resultados:

| Bloque | Prueba ejecutada | Resultado |
|---|---|---|
| SSH | `debian@92.243.24.163` con `gandi_pub_ed25519` | ✅ |
| Preflight | `deploy.sh preflight` (fix CRLF previo) | ✅ |
| Volúmenes | `deploy.sh setup-volumes` → `/srv/oasis/scriptorium` | ✅ |
| Deploy base | `deploy.sh deploy-local` → nodered + verdaccio | ✅ |
| Caddy | backup + append snippet + `caddy reload` | ✅ |
| `pub.escrivivir.co` | HTTP/2 200 post-reload | ✅ sin impacto |
| DNS 4 hosts | `verify-dns.sh` | ✅ |
| Healthz 3 hosts | scriptorium / admin / npm | ✅ |
| Node-RED admin `/red/` | HTTP 200 | ✅ |
| Verdaccio | `npm ping` PONG 182ms | ✅ |
| Verdaccio publish | `@alephscript/mcp-core-sdk@1.3.0` publicado | ✅ |
| Verdaccio permisos | storage corregido a `10001:65533` | ✅ |
| MCP DevOps `/mcp` | 502 — perfil `mcp` inactivo | ⚠️ previsto |
| Node-RED `/ui/` `/dashboard/` | 404 — sin flujos | ⚠️ pendiente |
| Volúmenes `verify-volumes.sh` | Bug en script (CRLF var precedence) | ⚠️ verificado manual OK |
| `/srv/scriptorium/` legado | `rmdir` — vacío, sin mounts | ✅ eliminado |
---

## Bloque Verdaccio — contraste VPS-06 vs estado 2026-05-09

### Requerido por VPS-06

| Ítem | Requerido |
|---|---|
| Config `config.yaml` + compose | ✅ entregado |
| Host `npm.scriptorium.escrivivir.co` | ✅ operativo, `npm ping` PONG |
| Auth `htpasswd` | ⚠️ config lista, usuario pendiente de crear |
| Token npm para CI | ⚠️ generado en `.env.generated-secrets`, pendiente registrar en Verdaccio |
| Scope `@alephscript/*` | ✅ en `config.yaml` |
| Proxy upstream npmjs | ✅ en `config.yaml` |
| Storage en `/srv/oasis/scriptorium/verdaccio/storage` | ✅ montado |
| `.npmrc.example` | pendiente crear |
| Smoke test publish/install `@alephscript/mcp-core-sdk` | pendiente ejecutar |

### Procedimiento Verdaccio vigente

`TASK-08` conserva evidencia histórica de la ventana y los bugs descubiertos. El procedimiento vivo para operar Verdaccio queda centralizado en:

```text
sala/dossiers/scriptorium-vps/tasks/TASK-06_STACK_VERDACCIO.md
```

Notas de obsolescencia importantes:

- No usar `curl PUT ... /-/user/org.couchdb.user:<USER>` para crear usuarios: `max_users: -1` bloquea el registro por API REST.
- Usar `ScriptoriumVps/scripts/create-verdaccio-user.sh` para usuarios.
- Usar `ScriptoriumVps/scripts/publish-package.sh` para publicar paquetes.
- Todo paquete `@alephscript/*` debe declarar `author` y `maintainers` en `package.json` antes de publicar.

### Bugs encontrados y corregidos en Verdaccio — 2026-05-09

| Bug | Síntoma | Causa raíz | Corrección |
|---|---|---|---|
| `EACCES` en storage | Verdaccio no puede escribir htpasswd ni tarballs | `setup-volumenes.sh` creaba el storage con `1000:1000` pero el proceso Verdaccio corre como `10001:65533` (hardcoded en la imagen, no configurable) | `setup-volumenes.sh` ahora aplica `chown 10001:65533` sobre `verdaccio/storage/` tras el chown general; `create-verdaccio-user.sh` también lo hace |
| Registro vía API bloqueado | `PUT /-/user/...` devuelve `409` siempre | `max_users: -1` en `config.yaml` deshabilita el registro por API REST | `create-verdaccio-user.sh` crea el usuario directamente en `htpasswd` con `openssl passwd -apr1` dentro del contenedor |
| `E401` en `npm publish` | Autenticación rechazada | Token JWT de Verdaccio no es compatible con `_authToken` en npm | Usar `username` + `_password` + `email` separados en `~/.npmrc` (no `_auth`) |
| `404` al publicar `.tgz` explícito | npm busca el paquete en el registry antes de publicar; proxy devuelve 404 de npmjs | Comportamiento del cliente npm con tarballs explícitos + `proxy:` activo | Publicar desde el directorio del paquete (`npm publish` sin argumento) |
| `Author: Anonymous` en web UI | La vista `/-/web/detail/...` no recibe `author` en la metadata publicada | `MCPGallery/mcp-core-sdk/package.json` no declaraba `author` ni `maintainers`; el usuario autenticado no sustituye esos campos | Añadir `author` y `maintainers` al `package.json`; `publish-package.sh` ahora valida esos campos antes de publicar |

### Scripts y artefactos resultantes

| Artefacto | Descripción |
|---|---|
| `scripts/create-verdaccio-user.sh` | Crea usuario en htpasswd directo; idempotente; incluye fix de permisos storage |
| `scripts/setup-volumenes.sh` | Ahora aplica `chown 10001:65533` a `verdaccio/storage/` como paso explícito |
| `scripts/publish-package.sh` | Publica con auth temporal y valida `author`/`maintainers` en `package.json` |
| `.npmrc.example` | Plantilla con `username` + `_password` + `email` + `always-auth=true` |
| `RUNBOOK.md` § Verdaccio | Manual completo: UIDs, credenciales, metadata package.json, flujo publish, errores conocidos |

### Paquetes publicados

| Paquete | Versión | Fecha | Verificado |
|---|---|---|---|
| `@alephscript/mcp-core-sdk` | `1.3.0` | 2026-05-09 | `npm view` OK; `author`/`maintainers` OK |

### Rediagnóstico `Author: Anonymous` — 2026-05-09

La hipótesis inicial apuntó a `_npmUser`/usuario autenticado, pero el contraste arquitectónico mostró que era un agujero de modelo:

- La web UI de Verdaccio muestra `Author` desde `author` del `package.json` publicado.
- `Maintainers` sale de `maintainers`/metadata npm del paquete.
- El usuario htpasswd (`admin`) solo autoriza `publish`/`unpublish`; no rellena `author`.
- `MCPGallery/mcp-core-sdk/package.json` no tenía `author` ni `maintainers`, por eso la UI mostraba `Anonymous`.

Corrección aplicada:

- Añadidos `author` y `maintainers` a `MCPGallery/mcp-core-sdk/package.json`.
- `publish-package.sh` valida ambos campos antes de publicar.
- Se eliminó el enfoque de parchear `_npmUser` en storage: no es la fuente canónica y no debe automatizarse.
- Se borró y republicó `@alephscript/mcp-core-sdk@1.3.0`.
- Verificación: `npm view @alephscript/mcp-core-sdk author maintainers --registry https://npm.scriptorium.escrivivir.co` devuelve `AlephScript Ops <ops@escrivivir.co>`.
- Verificación UI: `https://npm.scriptorium.escrivivir.co/-/web/detail/@alephscript/mcp-core-sdk` muestra `Author` y `Maintainers` como `AlephScript Ops`.

### Pendientes Verdaccio

- [x] Crear usuario admin (primera vez, idempotente) — `htpasswd` + permisos `10001:65533`
- [x] Publicar `@alephscript/mcp-core-sdk` v1.3.0 — `npm view` confirma disponible y con metadata visible
- [x] Crear `.npmrc.example` en `ScriptoriumVps/` _(creado localmente, pendiente commit)_
- [ ] Verificar install desde registry en un proyecto limpio

### Criterios “estamos vivos”

| Bloque | Prueba | Resultado esperado |
|---|---|---|
| DNS | `dig +short <host>` | IP del VPS. |
| Caddy | `curl -I https://<host>` | 200/30x/401 controlado según servicio. |
| Node-RED público editor | abrir `https://scriptorium.escrivivir.co/red` | Editor/flujos visibles en read-only; editar/deployar devuelve denegado o no muestra controles de escritura. |
| Node-RED público dashboards | abrir `https://scriptorium.escrivivir.co/ui` y `/dashboard` | Dashboards visibles. |
| Node-RED admin | abrir `https://admin.scriptorium.escrivivir.co/red` | Login/adminAuth requerido; admin puede editar/deployar. |
| MCP DevOps | `mcp-inspector-sdk` con Bearer | Tools/resources/prompts listados. |
| Verdaccio | `npm ping --registry ...` | Respuesta OK/auth controlada. |
| Volúmenes | crear/leer fichero de prueba controlado | UID:GID `1000:1000`. |

## Salida mínima esperada

1. Candidato runbook en carpeta del agente.
2. `ENTREGA_VPS-08.md` con:
   - Evidencias de verificación.
   - Estado final por host.
   - Pendientes no bloqueantes.
  - Checklist de ventana controlada para operaciones reales.

## Criterio de aceptación

- `scripts/verify.sh` ejecuta todas las verificaciones posibles.
- El README del submódulo explica deploy y rollback mínimo.
- El runbook separa claramente verificaciones de solo lectura de operaciones mutantes.
- Ninguna mutación remota queda documentada como automática: todas requieren aprobación PO en ventana controlada.
- Hay evidencia de validación con `mcp-inspector-sdk`.
- El dossier puede cerrarse sin decisiones PO pendientes.
