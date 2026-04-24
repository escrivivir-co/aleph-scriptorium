# Sesión 24-abr-2026 — entregas Sony

> **Archivado por:** Aleph (orquestador, GPT-5.x)
> **Fecha de archivado:** 2026-04-24
> **Origen:** `sala/agente-sony/` antes de cerrar la sala

## Contexto

Sony (Claude Sonnet 4.6) entregó el batch completo del track REFINE-SC en una sola sesión:
SBLVX-SC-02 + SC-03 + SC-04. Los tres entregables están aprobados como entregas y archivados aquí
**pendientes de validación final del PO** sobre 3 decisiones (ver `candidato-aprobacion-plan.md §"Decisiones que este análisis NO puede tomar"`).

## Entregas archivadas

| Task | Candidato (informe completo) | ENTREGA (resumen + handoff) |
|------|------------------------------|------------------------------|
| SBLVX-SC-02 | `candidato-aprobacion-plan.md` | `ENTREGA_SBLVX-SC-02.md` |
| SBLVX-SC-03 | `candidato-scope-scriptorium.md` | `ENTREGA_SBLVX-SC-03.md` |
| SBLVX-SC-04 | `candidato-handoff-integracion.md` | `ENTREGA_SBLVX-SC-04.md` |

## Findings clave (no perder)

1. **Tensión MCPLoreDBServer vs MCPVectorMachineServer** detectada: el plan original (`PLAN-VECTOR/PLAN.md`, 22-abr) diseñaba un servidor domain-specific con tools `pieza_*`, `lore_f_*`, LanceDB. Los Gates V1 cerrados por Opa (24-abr) diseñaron un servidor genérico multi-tenant con `register_project`, `index_project`, `query_project`, DeepWiki/Chroma. **Son dos servidores distintos.**
2. **Sony propuso 3 enmiendas (E1, E2, E3)** que separan el feature en dos capas:
   - **Capa 1** (este sprint, VMI-01..18): MCPVectorMachineServer = infraestructura RAG genérica.
   - **Capa 2** (post-v1): MCPLoreDBServer = skill domain-specific sobre la infraestructura.
3. **Scope SC-03** delimitado: 2 ficheros nuevos en `MCPGallery/mcp-mesh-sdk/src/` (`MCPVectorMachineServer.ts` + `DEFAULT_VECTOR_MACHINE_MCP_SERVER_CONFIG.ts`). 7 tools v1.
4. **Handoff SC-04**: Demo 1 NO requiere cambios en DocumentMachineSDK; solo path + Docker up. Horizonte 2 (Capa 2) documentado como dependencia futura.

## Decisiones pendientes del PO (bloquean cierre formal del track REFINE-SC)

1. ¿Confirma el PO la arquitectura en dos capas (MCPLoreDBServer post-v1)?
2. ¿Cuándo entra MCPLoreDBServer (otro sprint, backlog post-VMI)?
3. ¿SC-03 trabaja con incertidumbre controlada o espera resultado de VMI-01?

## Próxima sesión

Cuando el PO valide las 3 decisiones, Aleph promueve formalmente las enmiendas al `PLAN.md` y `BACKLOG.md` del dossier scrum-backlog y cierra SC-02/03/04 oficialmente.
