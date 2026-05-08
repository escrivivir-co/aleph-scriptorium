# Backlog — Scriptorium VPS

> **Última actualización:** 2026-05-08 — `GitHub Copilot` — `VPS-03` cerrada como diseño edge integrado en `OASIS_PUB`

## Contexto compartido

- Plan maestro: [PLAN.md](./PLAN.md)
- Decisiones PO: [RESPUESTAS.md](./RESPUESTAS.md)
- MINI-PLAN fuente: `ARCHIVO/DEVOPS/SESION_DENIS/MINI-PLAN.md`
- Remotes/submódulos: `.gitmodules`
- Inspector MCP oficial: `MCPGallery/mcp-inspector-sdk/README.md`

## Regla DRY del backlog

El backlog es índice y tracking. El detalle vive en `tasks/`.
No se duplican reglas de `.github/`, `sala/` ni de los plugins.

## Tracking

| Task | Estado | Agente | Dependencias | Entrega | Brief |
|------|--------|--------|--------------|---------|-------|
| VPS-00 | cerrada | `GitHub Copilot` | — | Dossier inicial creado | [TASK-00](./tasks/TASK-00_CONTEXTO_Y_DOSSIER.md) |
| VPS-01 | cerrada | `Gepe` | VPS-00 | Repo `scriptorium-vps` + submódulo integrado localmente | [TASK-01](./tasks/TASK-01_REPO_Y_SUBMODULE.md) |
| VPS-02 | cerrada | `Gepe` | VPS-00 | Plugin `scriptorium-vps` + agentes esqueleto integrados | [TASK-02](./tasks/TASK-02_PLUGIN_Y_AGENTES.md) |
| VPS-03 | cerrada | `Gepe` | VPS-01 | DNS esperado + edge compartido `OASIS_PUB` documentados e integrados como diseño | [TASK-03](./tasks/TASK-03_DNS_Y_CADDY.md) |
| VPS-04 | libre | — | VPS-01, VPS-03 | Stack Node-RED single-instance pedagógico | [TASK-04](./tasks/TASK-04_STACK_NODERED.md) |
| VPS-05 | libre | — | VPS-01, VPS-03 | Stack MCP DevOps público | [TASK-05](./tasks/TASK-05_STACK_MCP_MESH_DEVOPS.md) |
| VPS-06 | libre | — | VPS-01, VPS-03 | Stack Verdaccio público | [TASK-06](./tasks/TASK-06_STACK_VERDACCIO.md) |
| VPS-07 | libre | — | VPS-01 | Volúmenes `.gitkeep` + SFTP helpers | [TASK-07](./tasks/TASK-07_VOLUMENES_Y_SFTP.md) |
| VPS-08 | libre | — | VPS-03, VPS-04, VPS-05, VPS-06, VPS-07 | Runbook + verificación end-to-end | [TASK-08](./tasks/TASK-08_RUNBOOK_Y_VERIFICACION.md) |

## Criterio de cierre del feature

- [x] `ScriptoriumVps` existe como submódulo registrado en `.gitmodules`.
- [x] `.github/plugins/scriptorium-vps/` existe con manifest, instructions y agentes previstos.
- [x] `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` existe con `.gitkeep` y subcarpetas mínimas.
- [x] `scriptorium.escrivivir.co`, `admin.scriptorium.escrivivir.co`, `mcp.scriptorium.escrivivir.co` y `npm.scriptorium.escrivivir.co` tienen verificación documentada.
- [ ] Node-RED arranca como contenedor único `nodered` con editor `/red` público read-only, Dashboard clásico y Dashboard 2 inicializados.
- [ ] Admin autenticado puede editar/deployar projects; público anónimo sólo puede leer flujos y dashboards.
- [ ] MCP DevOps responde por Streamable HTTP + Bearer y se valida con `mcp-inspector-sdk`.
- [ ] Verdaccio público acepta auth y publica/instala al menos un paquete `@alephscript/*` de prueba.
- [ ] Los volúmenes compartidos usan UID:GID `1000:1000` por defecto.
