# Sesión: BotHubSDK — Integración como Submódulo #19

## Metadatos

| Campo | Valor |
|-------|-------|
| **Fecha inicio** | 2026-04-05 |
| **Estado** | 🟡 PAUSADA (pendiente commit + implementación MCPBotHubServer) |
| **Épica relacionada** | SCRIPT-BOT-HUB-1.0 |
| **Carpeta** | ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-04-05_bothubsdk-integration/ |

## Participantes

| Agente | Rol | Estado actual |
|--------|-----|---------------|
| @aleph | PO + ejecutor del protocolo | ⚪ IDLE |
| @plugin_ox_bothubsdk | Bridge BotHubSDK | ⚪ IDLE |
| @scrum | Seguimiento de épica | ⚪ IDLE |

## Objetivo

Integrar `heteronimos-semi-asistidos-sdk` (rama `feat/sds_iacm`) como submódulo #19 del Scriptorium bajo el nombre `BotHubSDK`, crear el plugin `bot-hub-sdk`, y diseñar la arquitectura del servidor MCP (`MCPBotHubServer`) que lo expone al mesh AlephScript.

## Restricciones

- Integrar desde rama `feat/sds_iacm`, NO desde `main`
- Nombre local: `BotHubSDK` (no el nombre original del repo)
- Sin servidor MCP propio en esta fase (GAP-03 pendiente)
- Sin commits hasta que el usuario decida

## Trabajo realizado

- ✅ Fase 0-7 del protocolo de integración de submódulos
- ✅ Diseño arquitectónico de MCPBotHubServer (ver 03_REFERENCIAS/plan-mcpbothubserver.md)
- ⏳ Fase 8: Commits pendientes
- ❌ Implementación MCPBotHubServer: no iniciada

## Referencias de Backlog

- [`BotHubSDK/README-SCRIPTORIUM.md`](../../../../BotHubSDK/README-SCRIPTORIUM.md)
- [`.github/plugins/bot-hub-sdk/manifest.md`](../../../../.github/plugins/bot-hub-sdk/manifest.md)
- [Plan MCPBotHubServer](03_REFERENCIAS/plan-mcpbothubserver.md)
