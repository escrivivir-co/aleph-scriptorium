---
name: Scriptorium VPS
description: Contexto y reglas para operar el submódulo ScriptoriumVps, el plugin local scriptorium-vps y sus datos runtime.
applyTo: "ScriptoriumVps/**/*, .github/plugins/scriptorium-vps/**/*, ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/**/*"
---

# Instrucciones: Plugin Scriptorium VPS

## Contexto

`ScriptoriumVps` entra en el workspace como submódulo operativo para un VPS público con cuatro superficies: Node-RED pedagógico, admin de Node-RED, MCP DevOps y Verdaccio. El plugin `scriptorium-vps` coordina la interacción agéntica con ese submódulo sin mezclar código, datos y secretos.

## Reglas de integración

### 1. Separación código / datos

- Código del plugin: `.github/plugins/scriptorium-vps/`
- Código del submódulo: `ScriptoriumVps/`
- Datos runtime: `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/`
- Persistencia MCP DevOps existente: `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`

### 2. No guardar secretos reales

- Los archivos `.env` reales se crean solo en el entorno de despliegue.
- El repositorio y el plugin solo deben versionar plantillas seguras (`.env.example`, `secrets-templates/`).

### 3. Caddy es la única superficie pública directa

- Los contenedores internos no exponen puertos directos al host.
- Solo Caddy publica `80/443` y enruta a `nodered`, `mcp-devops` y `verdaccio`.

### 4. Node-RED es single-instance pedagógico

- Un único contenedor `nodered` sirve `/red`, `/ui` y `/dashboard`.
- El público anónimo tiene permisos de lectura.
- El admin autenticado tiene permisos de escritura y deploy.
- `node-red-projects/` funciona como monorepo de projects.

### 5. MCP DevOps usa Streamable HTTP + Bearer

- Endpoint objetivo: `/mcp`
- Header de auth: `Authorization: Bearer <token>`
- Validación oficial: `MCPGallery/mcp-inspector-sdk`

### 6. Runtime inicial mínimo

`ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` debe arrancar al menos con:

- `deployments/`
- `audit/`
- `secrets-templates/`
- `node-red-projects/`

### 7. No prometer más de la v1

- Los agentes `anfitrion`, `hackeria-soporte`, `mc-parlament`, `notario-boe` y `publicador` son placeholders funcionales.
- Deben marcarse explícitamente como `stub` o `draft` hasta tener contrato operativo real.

## Archivos gestionados

| Ruta | Propósito |
|------|-----------|
| `ScriptoriumVps/README-SCRIPTORIUM.md` | Contrato de integración del submódulo |
| `ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml` | Patrón base de servicios |
| `.github/plugins/scriptorium-vps/manifest.md` | Contrato del plugin |
| `.github/plugins/scriptorium-vps/agents/*.agent.md` | Agentes operativos y stubs |
| `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` | Datos runtime del plugin |

## Lo que NO hacer

- ❌ Guardar secretos reales en el plugin o el submódulo.
- ❌ Exponer `1880`, `3003` o `4873` al host directamente.
- ❌ Separar Node-RED en dos contenedores si el diseño vigente sigue siendo single-instance.
- ❌ Tratar los agentes `stub` como si ya tuvieran capacidades implementadas.
- ❌ Duplicar la persistencia de DevOps MCP fuera de `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`.
