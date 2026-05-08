# Revisión — REV-VPS-05-R2

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-05
> **Agente entregador:** gepe
> **Fecha:** 2026-05-08 20:29:48

## Veredicto: aprobada

## Checklist de criterios de aceptación

- [x] `mcp.scriptorium.escrivivir.co/mcp` modelado como MCP Streamable HTTP detrás del edge compartido.
- [x] Sin Bearer devuelve 401/403 en el gateway.
- [x] Con Bearer válido el gateway proxya al inner DevOpsServer para listar tools/resources/prompts.
- [x] Writes de DevOps auditados en JSONL bajo `SCRIPTORIUM_VPS/audit`.
- [x] Persistencia usa `MCP_DATA/devops-mcp-server` mediante mount `/workspace/devops-data` y symlink al path efectivo del runtime.
- [x] Corrección pedida en la revisión anterior: el inner DevOpsServer queda forzado/verificado en puerto privado `3004`, separado del gateway `3003`.
- [x] No se publica `3003` al host; exposición pública sigue pasando por Caddy/OASIS_PUB.

## Observaciones

La reentrega corrige el bloqueo anterior. El bootstrap ahora:

1. exporta `MCP_SERVER_PORT=${MCP_DEVOPS_INTERNAL_PORT}` antes de construir `DevOpsServer`;
2. fuerza `server.config.port = internalPort` si hiciera falta;
3. verifica `server.getConfig().port`;
4. espera `GET http://127.0.0.1:3004/health` antes de abrir el gateway en `3003`;
5. expone `effectiveInnerPort` en `/health` del gateway.

Además, la revisión del código real confirma que `BaseMCPServer` ya lee `MCP_SERVER_PORT` en constructor, por lo que la corrección está alineada con el runtime existente. Las banderas `DEVOPS_ROOM_PLUGIN_ENABLED=false` y `XPLUS1_PLUGIN_DISABLED=true` también son reconocidas por `DevOpsServerImpl.ts`.

## Pasos recomendados para Aleph

Aprobar `VPS-05` y, cuando toque el cierre/integración, copiar los artefactos candidatos a `ScriptoriumVps/PATTERN-DOCKER/mcp-mesh/` y aplicar los patches de compose/env. Mantener bloqueado cualquier despliegue real, validación con inspector contra VPS vivo o cambio Docker remoto hasta orden explícita del PO.
