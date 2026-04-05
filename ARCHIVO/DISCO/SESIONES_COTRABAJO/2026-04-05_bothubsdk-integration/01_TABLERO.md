# Tablero de Turnos — BotHubSDK Integration

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en 02_ACTAS/.

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| — | — | ✅ DONE — MCPBotHubServer implementado y verificado | — |

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @aleph | 2026-04-05 | 2026-04-05 | Protocolo fases 0-7 + diseño MCPBotHubServer | [T001](02_ACTAS/T001_aleph_po-sm-integracion.md) |
| 2 | @aleph (Opus) | 2026-04-05 | 2026-04-05 | Reorganizó carpeta + escribió plan v2 con código completo | — |
| 3 | @aleph (Sonnet) | 2026-04-05 | 2026-04-05 | Implementó 8 pasos + fix IACM types + fix mesh null-safety | — |

## Cola de Espera

| Posición | Agente | Prioridad |
|----------|--------|-----------|
| 1 | @aleph | Media — commit fase 8 del protocolo submódulo |
| 2 | @aleph | Baja — mejoras opcionales (Zeus UI, plugins preload, bidireccional) |

## Notas de Continuación

- Plan arquitectónico completo en: [`03_REFERENCIAS/plan-mcpbothubserver.md`](03_REFERENCIAS/plan-mcpbothubserver.md)
- Conversación WIP guardada en: [`03_REFERENCIAS/wip-conversacion.md`](03_REFERENCIAS/wip-conversacion.md)
- Puerto libre confirmado: **3010**
- Canal Socket.IO: **AGENT**
- Plantilla de referencia: `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts`
