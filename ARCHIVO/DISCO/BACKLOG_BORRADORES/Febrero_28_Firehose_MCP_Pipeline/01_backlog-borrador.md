# Épica: FIREHOSE-MCP-1.0.0 — Firehose MCP Pipeline (Bluesky + ONFALO CDR)

> **Estado**: ✅ Completado  
> **Sprint**: FC1  
> **Fecha**: 2026-02-28  
> **Esfuerzo estimado**: 55 pts  
> **Autor**: @aleph

---

## Objetivo

Implementar un servidor MCP completo que consume el firehose de Bluesky (AT Protocol), aplica reglas de filtrado Prolog (motor ONFALO CDR), y expone los resultados como herramientas MCP para análisis y etiquetado en tiempo real.

---

## Stories

### S1: MCPFirehoseServer Core (21 pts)

| ID | Tarea | Pts | Estado |
|----|-------|-----|--------|
| FH-001 | Implementar MCPFirehoseServer.ts (servidor HTTP SSE puerto 3008) | 8 | ✅ |
| FH-002 | Crear DEFAULT_FIREHOSE_MCP_SERVER_CONFIG.ts | 2 | ✅ |
| FH-003 | Registrar firehose en app.config.ts | 1 | ✅ |
| FH-004 | Integrar arranque firehose en MCPLauncherServer.ts | 2 | ✅ |
| FH-005 | Definir 10 herramientas MCP (start/stop/configure/label/reply/stats) | 8 | ✅ |

### S2: Servicios Pipeline (21 pts)

| ID | Tarea | Pts | Estado |
|----|-------|-----|--------|
| FH-010 | BlueskyAuthService.ts — Autenticación AT Protocol | 5 | ✅ |
| FH-011 | FirehoseConsumerService.ts — Consumo WebSocket Jetstream | 8 | ✅ |
| FH-012 | FirehoseFilterEngine.ts — Motor de reglas Prolog | 5 | ✅ |
| FH-013 | OntaloLabelerService.ts — Etiquetado CDR ONFALO | 3 | ✅ |

### S3: Integración Node-RED + VS Code (13 pts)

| ID | Tarea | Pts | Estado |
|----|-------|-----|--------|
| FH-020 | node-red-contrib-alephscript-firehose package scaffold | 3 | ✅ |
| FH-021 | firehose-onfalo-pipeline.json — Flow ejemplo | 2 | ✅ |
| FH-022 | VS Code task "MCP: Start [Firehose]" (puerto 3008) | 2 | ✅ |
| FH-023 | MCP config entry firehose-mcp-server | 1 | ✅ |
| FH-024 | Reglas Prolog firehose-filter-rules.pl | 3 | ✅ |
| FH-025 | Actualización WiringEditor deps + orchestrator-node | 2 | ✅ |

---

## Artefactos Producidos

| Artefacto | Ruta | Líneas |
|-----------|------|--------|
| MCPFirehoseServer | MCPGallery/mcp-mesh-sdk/src/MCPFirehoseServer.ts | ~882 |
| BlueskyAuthService | MCPGallery/mcp-mesh-sdk/src/services/BlueskyAuthService.ts | ~266 |
| FirehoseConsumerService | MCPGallery/mcp-mesh-sdk/src/services/FirehoseConsumerService.ts | ~398 |
| FirehoseFilterEngine | MCPGallery/mcp-mesh-sdk/src/services/FirehoseFilterEngine.ts | ~214 |
| OntaloLabelerService | MCPGallery/mcp-mesh-sdk/src/services/OntaloLabelerService.ts | ~371 |
| Prolog Rules | MCPGallery/mcp-mesh-sdk/src/prolog/firehose-filter-rules.pl | - |
| Firehose Config | MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_FIREHOSE_MCP_SERVER_CONFIG.ts | ~23 |
| Node-RED Firehose | WiringEditor/packages/node-red-contrib-alephscript-firehose/ | nuevo |
| Pipeline Flow | WiringEditor/examples/flows-as/firehose-onfalo-pipeline.json | nuevo |
| VS Code Task | .vscode/tasks.json | +31 líneas |
| MCP Config | .vscode/mcp.json | +4 líneas |

---

## Dependencias

- **MCP-AAIA-SERVER-1.0.0** (completado) — Patrón server HTTP SSE reutilizado
- **PROLOG-MCP-1.0.0** (completado) — Motor Prolog base
- **NODE-RED-SDK** (existente) — Scaffold de paquetes contrib

---

## Notas Técnicas

- Puerto asignado: **3008** (siguiente disponible tras AAIA 3007)
- Protocolo: AT Protocol firehose vía Jetstream WebSocket
- Filtrado: Reglas Prolog con predicados `filter_post/2`, `label_action/2`
- Etiquetado: CDR (Content Distribution Rules) del framework ONFALO
- 10 tools MCP expuestas: `firehose_start`, `firehose_stop`, `firehose_configure_filter`, `firehose_configure_mode`, `firehose_get_filter_rules`, `firehose_add_prolog_rule`, `firehose_label_text`, `firehose_get_labeled`, `firehose_get_stats`, `firehose_reply_cdr`
