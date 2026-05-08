# TASK-02 — Plugin `scriptorium-vps` y agentes

> **Estado:** libre  
> **Agente recomendado:** `vps-ops` / `pluginmanager`  
> **Dependencias:** VPS-00  
> **Entrega esperada:** `.github/plugins/scriptorium-vps/` + `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/`

## Lee primero

1. `PLUGINS.md`
2. `.github/plugins/*/manifest.md` de plugins similares
3. `ARCHIVO/PLUGINS/README.md`
4. `sala/dossiers/scriptorium-vps/RESPUESTAS.md`

## Objetivo

Crear el plugin local de gestión del VPS con agentes operativos y esqueletos preparados para agentes de producto/futuro.

## Cambios requeridos

- Crear `.github/plugins/scriptorium-vps/manifest.md`.
- Crear instructions específicas: `.github/plugins/scriptorium-vps/instructions/scriptorium-vps.instructions.md`.
- Crear agentes de gestión:
  - `vps-ops.agent.md`
  - `nodered-curator.agent.md`
  - `verdaccio-keeper.agent.md`
- Crear agentes esqueleto para trabajo posterior:
  - `anfitrion.agent.md`
  - `hackeria-soporte.agent.md`
  - `mc-parlament.agent.md`
  - `notario-boe.agent.md`
  - `publicador.agent.md`
- Crear datos separados:
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/deployments/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/audit/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/secrets-templates/.gitkeep`
  - `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/node-red-projects/.gitkeep`

## Informe operativo

### Agentes de gestión

| Agente | Estado inicial | Función |
|---|---|---|
| `vps-ops` | activo | Deploy, healthchecks, Caddy, volúmenes, SFTP. |
| `nodered-curator` | activo | Projects monorepo, flows, dashboards, contribs por manifiesto. |
| `verdaccio-keeper` | activo | Publicación `@alephscript/*`, auth y smoke tests de registry. |

### Agentes esqueleto

| Agente | Estado inicial | Uso posterior |
|---|---|---|
| `anfitrion` | stub | Entrada conversacional y orientación. |
| `hackeria-soporte` | stub | Soporte técnico / RAG de documentación. |
| `mc-parlament` | stub | Moderación parlamentaria futura. |
| `notario-boe` | stub | Registro/auditoría futura. |
| `publicador` | stub | Publicación gated futura. |

## Salida mínima esperada

1. Candidatos de ficheros plugin en carpeta del agente.
2. `ENTREGA_VPS-02.md` con rutas destino y listado de agentes.

## Criterio de aceptación

- El manifest del plugin declara `scriptorium-vps`.
- Los agentes de gestión están listos para invocación.
- Los agentes futuros están marcados explícitamente como `stub`/`draft`.
- `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` existe con `.gitkeep` en las carpetas iniciales.
