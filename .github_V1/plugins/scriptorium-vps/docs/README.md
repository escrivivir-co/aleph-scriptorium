# Plugin `scriptorium-vps`

Documentación del plugin local que acompaña al submódulo `ScriptoriumVps`.

## Objetivo

Dar discovery en VS Code a los agentes y reglas que gobernarán el VPS público del Scriptorium.

## Código vs datos

| Superficie | Ruta |
|------------|------|
| Plugin | `.github/plugins/scriptorium-vps/` |
| Submódulo operativo | `ScriptoriumVps/` |
| Datos runtime | `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` |

## Agentes exportados

| Agente | Estado | Función |
|--------|--------|---------|
| `VpsOps` | activo | Deploy, Caddy, healthchecks, volúmenes, SFTP |
| `NodeRedCurator` | activo | Projects, flows, dashboards, contribs |
| `VerdaccioKeeper` | activo | Registry, publicación y smoke tests |
| `Anfitrion` | stub | Orientación futura |
| `HackeriaSoporte` | stub | Soporte y RAG futuro |
| `McParlament` | stub | Gobernanza futura |
| `NotarioBoe` | stub | Registro/auditoría futura |
| `Publicador` | stub | Publicación gated futura |

## Alcance de esta versión

Esta versión del plugin no registra todavía bridge global ni `registry.json`. Deja el manifest, las instructions y los agentes listos para que Aleph copie e integre cuando cierre la task.
