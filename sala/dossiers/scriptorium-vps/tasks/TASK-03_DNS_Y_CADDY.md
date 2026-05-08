# TASK-03 — DNS y Caddy público integrado en OASIS_PUB

> **Estado:** cerrada
> **Agente recomendado:** `Gepe` (`vps-ops`)
> **Dependencias:** VPS-01
> **Entrega esperada:** DNS esperado + snippets candidatos para integrar 4 hosts en el Caddy existente de `OASIS_PUB`

## Lee primero

1. `ScriptoriumVps/PATTERN-DOCKER/` si ya existe
2. `ARCHIVO/DEVOPS/SESION_DENIS/MINI-PLAN.md`
3. `sala/dossiers/scriptorium-vps/PLAN.md`
4. `BlockchainComPort/OASIS_PUB/README.md`
5. `BlockchainComPort/OASIS_PUB/caddy/Caddyfile`
6. `BlockchainComPort/OASIS_PUB/docker-compose.pub.yml`
7. `BlockchainComPort/GANDI_DEVOPS_FOLDER/README.md`

## Objetivo

Definir y verificar el frontal público del VPS con cuatro hosts nuevos: Node-RED público, Node-RED admin, MCP DevOps y Verdaccio, integrándolos respetuosamente en el Caddy ya existente de `BlockchainComPort/OASIS_PUB`.

Esta task **no** ejecuta cambios reales en Gandi, DNS, Docker remoto, SSH/SCP ni VPS vivo. Produce candidatos y verificación documentada para revisión de Aleph/PO.

## Cambios requeridos

- Documentar registros A esperados hacia el VPS, sin aplicarlos todavía:
  - `scriptorium.escrivivir.co`
  - `admin.scriptorium.escrivivir.co`
  - `mcp.scriptorium.escrivivir.co`
  - `npm.scriptorium.escrivivir.co`
- Preparar snippet candidato para añadir esos hosts a `BlockchainComPort/OASIS_PUB/caddy/Caddyfile`.
- Mantener `ScriptoriumVps/PATTERN-DOCKER/caddy/Caddyfile` como patrón local/standalone, no como despliegue productivo si comparte VPS con `OASIS_PUB`.
- Documentar que `pub-web` de `OASIS_PUB` conserva la propiedad de `80/443`.
- Documentar topología de red Docker usando la red Compose de `OASIS_PUB`: clave `oasis_pub_net`, nombre externo esperado `oasis-pub-scriptorium_oasis_pub_net`, y aliases internos:
    - `scriptorium-nodered` → `nodered:1880`
    - `scriptorium-mcp-devops` → `mcp-devops:3003`
    - `scriptorium-verdaccio` → `verdaccio:4873`
- Mantener los containers internos sin `ports:` públicos (`1880`, `3003`, `4873`).
- Añadir health routes donde proceda.
- Declarar explícitamente qué no se toca: `pub.escrivivir.co`, `escrivivir.co` raíz, registros Bluesky/`_atproto`, secretos de `GANDI_DEVOPS_FOLDER` y VPS real.

## Informe operativo

### Hosts

| Host | Upstream interno | Uso |
|---|---|---|
| `scriptorium.escrivivir.co` | `scriptorium-nodered:1880` | Editor `/red` visible en read-only + dashboards `/ui` y `/dashboard`; sin Basic Auth global. Escritura bloqueada por `adminAuth.default`. |
| `admin.scriptorium.escrivivir.co` | `scriptorium-nodered:1880` | Editor/admin completo; puede añadir `basic_auth` Caddy como capa extra y adminAuth Node-RED con permisos `*`. |
| `mcp.scriptorium.escrivivir.co` | `scriptorium-mcp-devops:3003` | MCP DevOps Streamable HTTP + Bearer. |
| `npm.scriptorium.escrivivir.co` | `scriptorium-verdaccio:4873` | Registry npm público. |

### Decisión de edge

- Producción compartida: el Caddy edge es `pub-web` de `BlockchainComPort/OASIS_PUB`.
- `ScriptoriumVps` no despliega un segundo Caddy con `80/443` en el VPS real.
- El candidato de esta task debe ser un snippet integrable en `OASIS_PUB/caddy/Caddyfile`.
- La red de alcance entre Caddy y servicios nuevos es la red Compose de `OASIS_PUB`: clave `oasis_pub_net`; nombre externo esperado desde `ScriptoriumVps`: `oasis-pub-scriptorium_oasis_pub_net`; aliases estables.

### Snippet Caddy base esperado para `OASIS_PUB/caddy/Caddyfile`

```caddyfile
# Host público pedagógico: editor/flujos visibles read-only + dashboards.
# La escritura/deploy NO se bloquea aquí: la bloquea Node-RED adminAuth.default=read.
scriptorium.escrivivir.co {
    encode zstd gzip
    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
    }
    reverse_proxy scriptorium-nodered:1880
}

# Host admin: acceso completo; basic_auth es una capa extra opcional sobre adminAuth.
admin.scriptorium.escrivivir.co {
    encode zstd gzip
    basic_auth {
        # usuario y hash bcrypt configurados vía env
        {$NODERED_ADMIN_USER:admin} {$NODERED_ADMIN_PASSWORD_BCRYPT}
    }
    reverse_proxy scriptorium-nodered:1880
}

mcp.scriptorium.escrivivir.co {
    encode zstd gzip
    reverse_proxy scriptorium-mcp-devops:3003
}

npm.scriptorium.escrivivir.co {
    encode zstd gzip
    reverse_proxy scriptorium-verdaccio:4873
}
```

## Salida mínima esperada

1. Snippet candidato para `BlockchainComPort/OASIS_PUB/caddy/Caddyfile`.
2. `ENTREGA_VPS-03.md` con secciones obligatorias: DNS esperado; verificación `dig`/`curl` documentada; puertos expuestos por compose; topología `oasis_pub_net` / `oasis-pub-scriptorium_oasis_pub_net` + aliases internos; **Compatibilidad con OASIS_PUB / GANDI**; y lista de operaciones reales bloqueadas hasta aprobación PO.
3. Si propone cambios para `ScriptoriumVps/PATTERN-DOCKER/caddy/Caddyfile`, marcarlos como perfil local/standalone.

## Criterio de aceptación

- Los 4 hosts resuelven al VPS.
- Caddy obtiene certificados válidos.
- El Caddy que responde es el existente de `OASIS_PUB`, no un segundo edge en competencia.
- Ningún servicio interno publica `3003`, `4873` o `1880` directamente al exterior.
- `pub.escrivivir.co`, `escrivivir.co` raíz y registros Bluesky/`_atproto` permanecen intactos.
- `curl -I` a cada host devuelve respuesta de Caddy/upstream, aunque sea placeholder.
