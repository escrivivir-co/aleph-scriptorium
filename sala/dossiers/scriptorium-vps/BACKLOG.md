# Backlog — Scriptorium VPS

> **Última actualización:** 2026-05-09 — `GitHub Copilot` — `VPS-10` cerrada funcionalmente; `VPS-11` abierto en modo enviar/esperar peer real

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
| VPS-04 | cerrada | `Gepe` | VPS-01, VPS-03 | Stack Node-RED single-instance pedagógico integrado como patrón local | [TASK-04](./tasks/TASK-04_STACK_NODERED.md) |
| VPS-05 | cerrada | `Gepe` | VPS-01, VPS-03 | Stack MCP DevOps público integrado como gateway Streamable HTTP + Bearer | [TASK-05](./tasks/TASK-05_STACK_MCP_MESH_DEVOPS.md) |
| VPS-06 | cerrada | `Gepe` | VPS-01, VPS-03 | Stack Verdaccio público integrado como patrón registry + pipeline dry-run | [TASK-06](./tasks/TASK-06_STACK_VERDACCIO.md) |
| VPS-07 | cerrada | `Sony/Aleph` | VPS-01 | Volúmenes `.gitkeep` + SFTP helpers integrados por excepción PO | [TASK-07](./tasks/TASK-07_VOLUMENES_Y_SFTP.md) |
| VPS-08 | en-curso | `Aleph` | VPS-03, VPS-04, VPS-05, VPS-06, VPS-07 | Base desplegada 2026-05-09; Rooms MVP activo; pendiente endurecer persistencia Node-RED + MCP activo | [TASK-08](./tasks/TASK-08_RUNBOOK_Y_VERIFICACION.md) |
| VPS-09 | cerrada | `nodered-curator` | VPS-04, VPS-06, VPS-08 | Rooms MVP implementada: contrib Dashboard 2 + flow activo + validación pública en `/dashboard/rooms` | [TASK-09](./tasks/TASK-09_NODERED_ROOMS_MVP.md) |
| VPS-10 | cerrada | `nodered-curator` + `vps-ops` | VPS-03, VPS-04, VPS-06, VPS-08, VPS-09 | Pub.Rooms federado operativo: `rooms.scriptorium.escrivivir.co`, auth shared-secret, SDK `1.4.0`, contribs `0.2.0`, bootstrap cliente y smoke externo técnico | [TASK-10](./tasks/TASK-10_PUB_ROOMS_FEDERATED.md) |
| VPS-11 | abierta | `vps-ops` + `nodered-curator` | VPS-10, SPIKE-10 | Handoff con peer real: enviar invitaciones, recoger evidencia, decidir hardening JWT/OASIS/rotación | [TASK-11](./tasks/TASK-11_PEER_REAL_HANDOFF.md) |
| SPIKE-10 | abierto | por asignar | VPS-10, `dossier-layer2-bridge` | Spike OASIS/SSB identity para Pub.Rooms (gran plan) | [SPIKE-10](./tasks/SUBTASKS/SPIKE-10-OASIS-IDENTITY.md) |

## Criterio de cierre del feature

- [x] `ScriptoriumVps` existe como submódulo registrado en `.gitmodules`.
- [x] `.github/plugins/scriptorium-vps/` existe con manifest, instructions y agentes previstos.
- [x] `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/` existe con `.gitkeep` y subcarpetas mínimas.
- [x] `scriptorium.escrivivir.co`, `admin.scriptorium.escrivivir.co`, `mcp.scriptorium.escrivivir.co` y `npm.scriptorium.escrivivir.co` tienen verificación documentada.
- [x] Node-RED arranca como contenedor único `nodered` — desplegado 2026-05-09 en VPS.
- [x] Node-RED: flujos importados; `/ui` y `/dashboard` operativos, con Rooms MVP activa en `/dashboard/rooms`. _(validado 2026-05-09)_
- [ ] Admin autenticado puede editar/deployar projects; público anónimo sólo puede leer flujos y dashboards. _(pendiente validar con sesión real)_
- [ ] `scriptorium.escrivivir.co/red` público en modo read-only queda pendiente de validación interactiva explícita con sesión anónima real. _(HTTP 200 verificado; falta prueba funcional de permisos)_
- [ ] MCP DevOps responde por Streamable HTTP + Bearer y se valida con `mcp-inspector-sdk`. _(bloqueado: requiere publicar paquetes en Verdaccio y activar `--profile mcp`)_
- [x] Verdaccio público acepta auth y publica/instala al menos un paquete `@alephscript/*` de prueba — `@alephscript/mcp-core-sdk@1.3.0` publicado 2026-05-09.
- [x] Rooms MVP en Node-RED: package Dashboard 2, flow template y server/agentes dummy usando `@alephscript/mcp-core-sdk`. _(VPS-09 cerrada 2026-05-09; el endurecimiento de persistencia vuelve al hilo del RUNBOOK)_
- [x] Pub.Rooms federado: `rooms.scriptorium.escrivivir.co` activo, server público con shared secret y bootstrap reproducible. _(VPS-10 cerrada 2026-05-09)_
- [ ] Primer peer real externo conectado y evidencia sanitizada recogida. _(VPS-11 abierta; estado enviar y esperar)_
- [ ] OASIS/SSB identity para Pub.Rooms documentada y decidida. _(spike SPIKE-10; gran plan `dossier-layer2-bridge`)_
- [x] Los volúmenes compartidos usan UID:GID `1000:1000` por defecto — verificado en `/srv/oasis/scriptorium`.
- [x] `/srv/scriptorium/` legado eliminado 2026-05-09 (estaba vacío, sin mounts ni contenedores).
