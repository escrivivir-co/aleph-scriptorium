# TASK-05 — Stack MCP Mesh DevOps público

> **Estado:** cerrada
> **Agente recomendado:** `vps-ops`
> **Dependencias:** VPS-01, VPS-03
> **Entrega esperada:** `MCPDevOpsServer` público por Streamable HTTP + Bearer, validado con `mcp-inspector-sdk`

## Lee primero

1. `MCPGallery/mcp-inspector-sdk/README.md`
2. `MCPGallery/mcp-mesh-sdk/src/`
3. `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`
4. `sala/dossiers/scriptorium-vps/RESPUESTAS.md`

## Objetivo

Exponer solo DevOpsServer como primer MCP público del VPS, con transporte compatible con la herramienta oficial de inspección y auth explícita.

## Cambios requeridos

- Crear Dockerfile/entrypoint para `mcp-devops`.
- Configurar transporte Streamable HTTP.
- Usar endpoint canónico `https://mcp.scriptorium.escrivivir.co/mcp`.
- Requerir `Authorization: Bearer <MCP_DEVOPS_BEARER_TOKEN>`.
- Preparar scopes:
  - `devops:read`
  - `devops:write-definitions`
  - `devops:delete-definitions`
- Montar persistencia existente:
  - host: `/srv/oasis/scriptorium/ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server`
  - container: `/workspace/devops-data`
- Registrar auditoría en:
  - `/srv/oasis/scriptorium/ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/audit/`

## Informe operativo

### Elección de auth

`mcp-inspector-sdk` acepta Bearer para transportes HTTP/SSE y su propio proxy usa token Bearer. Por tanto el server debe usar el patrón estándar:

```http
Authorization: Bearer ${MCP_DEVOPS_BEARER_TOKEN}
```

No se usa header custom por defecto.

### Persistencia existente

DevOps ya tiene carpeta canónica en esta codebase:

```text
ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/
├── .gitkeep
├── prompts/
├── resources/
└── _metadata.json
```

La task debe reutilizarla; no crear otra carpeta para DevOps.

## Salida mínima esperada

1. Candidato Dockerfile/entrypoint/compose de `mcp-devops`.
2. `ENTREGA_VPS-05.md` con:
   - URL de inspección.
   - Variables `.env.example`.
   - Resultado esperado de `mcp-inspector-sdk`.

## Criterio de aceptación

- `mcp.scriptorium.escrivivir.co/mcp` responde como MCP Streamable HTTP.
- Sin Bearer devuelve 401/403.
- Con Bearer válido `mcp-inspector-sdk` lista tools/resources/prompts.
- Los writes de DevOps quedan auditados.
- La persistencia usa `MCP_DATA/devops-mcp-server`.
