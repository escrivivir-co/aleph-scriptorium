# TASK-03 — DNS y Caddy público

> **Estado:** libre  
> **Agente recomendado:** `vps-ops`  
> **Dependencias:** VPS-01  
> **Entrega esperada:** DNS + Caddyfile para 4 hosts públicos

## Lee primero

1. `ScriptoriumVps/PATTERN-DOCKER/` si ya existe
2. `ARCHIVO/DEVOPS/SESION_DENIS/MINI-PLAN.md`
3. `sala/dossiers/scriptorium-vps/PLAN.md`

## Objetivo

Definir y verificar el frontal público del VPS con cuatro hosts: Node-RED público, Node-RED admin, MCP DevOps y Verdaccio.

## Cambios requeridos

- Crear registros A hacia el VPS:
  - `scriptorium.escrivivir.co`
  - `admin.scriptorium.escrivivir.co`
  - `mcp.scriptorium.escrivivir.co`
  - `npm.scriptorium.escrivivir.co`
- Crear `PATTERN-DOCKER/caddy/Caddyfile`.
- Configurar Caddy como único servicio con `ports: 80:80` y `443:443`.
- Mantener los containers internos sin `ports:` públicos.
- Añadir health routes donde proceda.

## Informe operativo

### Hosts

| Host | Upstream interno | Uso |
|---|---|---|
| `scriptorium.escrivivir.co` | `nodered:1880` | Editor `/red` visible en read-only + dashboards `/ui` y `/dashboard`; sin Basic Auth global. Escritura bloqueada por `adminAuth.default`. |
| `admin.scriptorium.escrivivir.co` | `nodered:1880` | Editor/admin completo; puede añadir `basic_auth` Caddy como capa extra y adminAuth Node-RED con permisos `*`. |
| `mcp.scriptorium.escrivivir.co` | `mcp-devops:3003` | MCP DevOps Streamable HTTP + Bearer. |
| `npm.scriptorium.escrivivir.co` | `verdaccio:4873` | Registry npm público. |

### Caddy base esperado

```caddyfile
# Host público pedagógico: editor/flujos visibles read-only + dashboards.
# La escritura/deploy NO se bloquea aquí: la bloquea Node-RED adminAuth.default=read.
scriptorium.escrivivir.co {
    encode zstd gzip
    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
    }
    reverse_proxy nodered:1880
}

# Host admin: acceso completo; basic_auth es una capa extra opcional sobre adminAuth.
admin.scriptorium.escrivivir.co {
    encode zstd gzip
    basic_auth {
        # usuario y hash bcrypt configurados vía env
        {$NR_ADMIN_USER:admin} {$NR_ADMIN_HASH}
    }
    reverse_proxy nodered:1880
}

mcp.scriptorium.escrivivir.co {
    encode zstd gzip
    reverse_proxy mcp-devops:3003
}

npm.scriptorium.escrivivir.co {
    encode zstd gzip
    reverse_proxy verdaccio:4873
}
```

## Salida mínima esperada

1. Candidato `Caddyfile`.
2. `ENTREGA_VPS-03.md` con:
   - DNS esperado.
   - Verificación `dig`/`curl` documentada.
   - Puertos expuestos por compose.

## Criterio de aceptación

- Los 4 hosts resuelven al VPS.
- Caddy obtiene certificados válidos.
- Ningún servicio interno publica `3003`, `4873` o `1880` directamente al exterior.
- `curl -I` a cada host devuelve respuesta de Caddy/upstream, aunque sea placeholder.
