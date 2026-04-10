# Plugin: bot-hub-sdk

> **Submódulo**: `BotHubSDK`  
> **Versión**: 2.0.0  
> **Estado**: beta  
> **Épica**: SCRIPT-2.5.0 (BotHub Integration)  
> **MCP Server**: puerto 3010

---

## Descripción

SDK plugin-based para bots de Telegram construido sobre grammY. Proporciona:

- **`BotPlugin` interface**: patrón de extensión para bots composables
- **`IacmBotPlugin`**: participación en protocolo IACM (Inter-Agent Communication Message)
- **`IntentEngine` (AIML)**: motor de clasificación de intents
- **`bootBot()`**: orquestador de arranque con gestión `.env` + `dataDir` configurable
- **`RuntimeEmitter`**: bus de eventos RxJS para observabilidad

El protocolo **IACM v1.0** (rama `feat/sds_iacm`) define 11 tipos de mensaje estándar para comunicación inter-agente en grupos de Telegram.

**Nuevo en v2.0**: App Launcher MCP integrado (arrancar/parar console-app, dashboard, iacm-demo desde el MCP server). Datos centralizados en `ARCHIVO/PLUGINS/BOT_HUB_SDK/`.

---

## Metadatos

```json
{
  "id": "bot-hub-sdk",
  "name": "BotHub SDK (Telegram Bots + IACM)",
  "submodule": "BotHubSDK",
  "submodule_url": "https://github.com/escrivivir-co/heteronimos-semi-asistidos-sdk",
  "integration_branch": "integration/beta/scriptorium",
  "tracking_branch": "feat/sds_iacm",
  "runtime": "bun",
  "language": "TypeScript",
  "port": 3010,
  "bridge_agent": "plugin_ox_bothubsdk",
  "version": "2.0.0"
}
```

---

## Estructura del Plugin

```
.github/plugins/bot-hub-sdk/
├── manifest.md                        ← este archivo
├── agents/
│   └── bot-hub-sdk.agent.md           ← bridge agent @plugin_ox_bothubsdk
└── instructions/
    └── bot-hub-sdk.instructions.md    ← reglas de uso del plugin
```

---

## Dependencias

- `BotHubSDK/` (submódulo en raíz)
- Bun ≥ 1.1
- `BOT_TOKEN` en `.env` (Telegram BotFather, opcional — mock mode sin token)

---

## Setup rápido

```bash
bash scripts/setup-bothub.sh   # instala deps + crea ARCHIVO/PLUGINS/BOT_HUB_SDK/
bash scripts/verify-bothub.sh  # verifica integración completa
```

---

## Handoffs principales

| Acción | Invocación |
|--------|------------|
| Crear bot plugin | `@plugin_ox_bothubsdk crear-plugin` |
| Implementar IACM | `@plugin_ox_bothubsdk iacm` |
| Lanzar dashboard | `@plugin_ox_bothubsdk launch dashboard` |
| Ver estado del bot demo | `@plugin_ox_bothubsdk status` |
| Construir y ejecutar | `@plugin_ox_bothubsdk build` |

---

## MCP Tools (14)

| Tool | Descripción |
|------|-------------|
| `bothub_boot` | Arrancar bot (mock o real) |
| `bothub_status` | Estado del runtime |
| `bothub_execute_command` | Ejecutar comando localmente |
| `bothub_broadcast` | Broadcast a chats |
| `bothub_list_plugins` | Listar plugins y comandos |
| `bothub_list_chats` | Listar chats trackeados |
| `bothub_send_iacm` | Construir mensaje IACM |
| `bothub_parse_iacm` | Parsear mensaje IACM |
| `bothub_get_messages` | Historial con cursor incremental |
| `bothub_get_chat_history` | Historial por chat ID |
| `bothub_list_apps` | Listar apps disponibles |
| `bothub_launch_app` | Lanzar app como proceso hijo |
| `bothub_stop_app` | Parar app lanzada |
| `bothub_app_status` | Estado + logs recientes |

## MCP Resources (5)

| URI | Descripción |
|-----|-------------|
| `bothub://state/current` | Estado runtime completo |
| `bothub://logs/recent` | Logs recientes (circular, 200) |
| `bothub://messages/recent` | Mensajes recientes (100) |
| `bothub://apps/registry` | Apps disponibles + estado |
| `bothub://iacm/reference` | Referencia protocolo IACM v1.0 |
