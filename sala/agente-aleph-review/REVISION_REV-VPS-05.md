# Revisión — REV-VPS-05

> **Revisor:** aleph-review (GitHub Copilot)
> **Task original:** VPS-05
> **Agente entregador:** gepe
> **Fecha:** 2026-05-08 19:46:00

## Veredicto: devuelta

## Checklist de criterios de aceptación

- [✗] `mcp.scriptorium.escrivivir.co/mcp` responde como MCP Streamable HTTP: el gateway está bien orientado, pero el candidato no puede arrancar como está por conflicto de puerto entre gateway e inner DevOpsServer.
- [~] Sin Bearer devuelve 401/403: el código del gateway lo implementa, condicionado a que el proceso arranque.
- [✗] Con Bearer válido `mcp-inspector-sdk` lista tools/resources/prompts: no es validable mientras el inner server no escuche en puerto separado.
- [~] Writes de DevOps auditados: el gateway modela auditoría JSONL para writes/deletes, condicionado a arranque correcto.
- [x] Persistencia usa `MCP_DATA/devops-mcp-server` mediante mount `/workspace/devops-data` y symlink al path efectivo del runtime.

## Observaciones

La arquitectura gateway + inner DevOpsServer es buena para el objetivo de seguridad, pero el candidato contiene un bloqueo técnico fatal:

- `secure-devops-bootstrap.ts` intenta arrancar el DevOpsServer interno en `MCP_DEVOPS_INTERNAL_PORT=3004`.
- Sin embargo, `DevOpsServerImpl.ts` construye `DevOpsServer` con `DEFAULT_DEVOPS_MCP_SERVER_CONFIG`, cuyo `port` está fijado a `3003`.
- `BaseMCPServer.start()` escucha `this.config.port`; no lee `MCP_SERVER_PORT`.
- Por tanto, el inner DevOpsServer intentará escuchar `3003`, el mismo puerto que el gateway Express público.
- Resultado esperado: colisión `EADDRINUSE`, gateway no arrancable o proxy apuntando a sí mismo/puerto incorrecto.

La revisión confirmó que `express` y `tsx` existen en `MCPGallery/mcp-mesh-sdk/package.json`, y que las banderas `DEVOPS_ROOM_PLUGIN_ENABLED=false` y `XPLUS1_PLUGIN_DISABLED=true` sí son reconocidas por `DevOpsServerImpl.ts`. El problema principal no es de dependencias, sino de puerto/configuración del servidor interno.

## Corrección requerida

Gepe debe corregir el candidato para que el inner DevOpsServer escuche realmente en un puerto privado distinto del gateway, por ejemplo:

1. Parchear el bootstrap para ajustar el puerto real antes de `server.start()`, si la propiedad es accesible, por ejemplo mediante override explícito de config interno documentado y probado.
2. O proponer un cambio pequeño en `DevOpsServerImpl`/`BaseMCPServer` para que respete una variable como `MCP_SERVER_PORT` o acepte override de config por constructor.
3. Añadir un smoke documental mínimo:
   - gateway escucha `3003`;
   - inner escucha `3004`;
   - `GET /health` en gateway responde;
   - `POST /mcp` sin Bearer da `401`;
   - `POST /mcp` con Bearer proxya al inner y lista tools.
4. Mantener intactos los guardrails: no exponer `3003` al host directamente y no operar Docker/VPS real sin aprobación PO.

## Pasos recomendados para Aleph

Devolver `VPS-05` a `en-curso:gepe` con este feedback. No copiar todavía `Dockerfile`, `entrypoint.sh`, `secure-devops-bootstrap.ts` ni patches al destino final hasta resolver el conflicto de puerto y dejar documentado el smoke mínimo.
