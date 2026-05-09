# Invitación · Federarte al Pub.Rooms desde cero

> **Para:** amigo que parte sin Node-RED instalado.
> **De:** owner Scriptorium.
> **Lo que vas a obtener:** un Node-RED local arrancando en `http://localhost:1880`, con un flow ya conectado a `rooms.scriptorium.escrivivir.co`. No abres puertos en tu lado.

## Lo que necesitas tener antes de empezar

- Linux, macOS o WSL2 en Windows. (Si solo tienes Windows nativo, dímelo y mando variante PowerShell.)
- `node ≥ 18` y `npm`. Si no los tienes, el script te avisa.
- Acceso a internet saliente HTTPS/WSS.
- El token y el room que te he mandado por canal seguro.
- 10 minutos.

## Paso 0 — pega aquí lo que te mandé

```
TU_TOKEN     = <<PEGA_AQUI_TU_TOKEN>>
TU_ROOM      = <<PEGA_AQUI_EL_ROOM>>          # ej. ROOMS_LAB_AMIGO_B
TU_NOMBRE    = <<TU_ALIAS_LEGIBLE>>           # ej. amigo-b
```

**Nunca** pongas el token en un commit ni en un chat público.

## Paso 1 — bootstrap (una sola línea)

```bash
curl -fsSL \
  https://raw.githubusercontent.com/escrivivir-co/aleph-scriptorium/integration/beta/scriptorium/ScriptoriumVps/scripts/bootstrap-mesh-client.sh \
  | bash -s -- \
    --profile fresh \
    --rooms-url https://rooms.scriptorium.escrivivir.co \
    --room "$TU_ROOM" \
    --token "$TU_TOKEN" \
    --user "$TU_NOMBRE"
```

> Si prefieres descargarlo y revisarlo antes de ejecutarlo (recomendado): [`bootstrap-mesh-client.sh`](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ScriptoriumVps/scripts/bootstrap-mesh-client.sh).

Lo que hace en perfil `fresh`:

1. Valida o instala Node-RED localmente (`npm i -g node-red` si no lo tienes).
2. Crea `~/.node-red` con un `settings.js` mínimo y env vars para la auth.
3. Instala desde el Verdaccio público:
   - `node-red-contrib-alephscript-core@^0.2.0`.
4. Te coloca un `flows.json` precargado con un cliente Rooms que apunta a `https://rooms.scriptorium.escrivivir.co`, namespace `/runtime`, room y user del bootstrap, y token leído de env (no escrito en el flow).
5. Arranca Node-RED en `http://localhost:1880`.

## Paso 2 — comprobar que estás dentro

1. Abre `http://localhost:1880`.
2. El nodo `alephscript-core-client` debe verse en verde con texto `connected`.
3. Atajo de salud sin abrir el editor:
   ```bash
   curl -I https://rooms.scriptorium.escrivivir.co/healthz
   # esperado: HTTP/2 200, body 'scriptorium rooms edge ok'
   ```

Si tu cliente queda en `auth: unauthorized`, es token o room mal copiado: avisa al owner.

## Paso 3 — primera interacción

Hay un nodo `inject` precableado para mandar un `HELLO` al room. Pulsa el botón de `inject` y el owner verá tu cliente. A partir de ahí, puedes editar libremente el flow para mandar y recibir lo que quieras dentro del room.

## Si algo no va

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| `node` no encontrado | falta runtime | instalar Node 20 LTS desde [nodejs.org](https://nodejs.org) |
| Node-RED no arranca | puerto 1880 ocupado | `pkill -f node-red` o cambiar puerto en `~/.node-red/settings.js` |
| `auth: unauthorized` | token/room mal | revisar copy/paste con el owner |
| `connect_error: timeout` | red sin salida 443 | habilitar HTTPS saliente |
| el contrib no aparece en la paleta | install fallido | `cd ~/.node-red && npm i node-red-contrib-alephscript-core@^0.2.0 --registry https://npm.scriptorium.escrivivir.co` y reiniciar |
| Verdaccio pide credenciales | no debería: la lectura es pública | comprobar la URL del registry exacta |

## Higiene

- El token vive solo en env (`~/.node-red/.alephscript-rooms.env` con perms `600`). El bootstrap se asegura de las perms.
- El flow **no contiene** el token en claro.
- Para retirarte: `rm -rf ~/.node-red` y `npm un -g node-red` (cuidado: borra todos tus flows si reusabas Node-RED, en perfil `fresh` no debería haber nada más).

## Contexto y por qué te invitamos así

Estás entrando a un mesh de Node-RED federado vía Socket.IO autenticado por shared-secret por room. Más detalle:

- Release notes: [RELEASE_NOTES_TASK-10.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/RELEASE_NOTES_TASK-10.md)
- Repo: [github.com/escrivivir-co/aleph-scriptorium](https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium)
- Endpoint vivo: [rooms.scriptorium.escrivivir.co](https://rooms.scriptorium.escrivivir.co)
