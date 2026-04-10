# BOT_HUB_SDK — Plugin Data Directory

> **Plugin**: `bot-hub-sdk`  
> **Submódulo**: `BotHubSDK/`  
> **Épica**: SCRIPT-2.5.0  
> **MCP Server**: puerto 3010 (`BHS: Start [Server]`)

Este directorio es la fuente canónica de datos del plugin BotHub SDK cuando se ejecuta
desde el Scriptorium (a través del MCP server o el launcher integrado).

El submódulo `BotHubSDK/` funciona también de forma **autónoma** (`bun run dev`), en cuyo
caso los datos internos residen en cada directorio de ejemplo.

## Estructura

```
ARCHIVO/PLUGINS/BOT_HUB_SDK/
├── README.md                    ← este archivo
├── data/
│   ├── chats.json               ← chat IDs trackeados (FileChatStore, compartido por el MCP server)
│   └── messages.json            ← historial de mensajes (FileMessageStore, compartido)
├── apps/                        ← configuración de apps lanzables desde el MCP server
│   ├── console-app.json         ← Headless bot demo (RabbitBot)
│   ├── dashboard.json           ← TUI interactivo (RabbitBot + SpiderBot + HorseBot)
│   └── iacm-demo.json           ← Demo protocolo IACM inter-agente
└── env/
    └── .env.example             ← template para BOT_TOKEN (copiado del SDK)
```

## Variables de entorno del MCP Server

| Variable | Default | Descripción |
|----------|---------|-------------|
| `BOTHUB_DATA_DIR` | `ARCHIVO/PLUGINS/BOT_HUB_SDK/data/` | Directorio de datos persistidos |
| `BOTHUB_SDK_DIR` | `BotHubSDK/` | Raíz del submódulo SDK |
| `BOTHUB_ENV_DIR` | `BotHubSDK/` | Directorio con `.env` (BOT_TOKEN) |
| `BOTHUB_MESH_ENABLED` | `true` | Conectar al mesh Socket.IO (Channel AGENT) |

## Setup

```bash
bash scripts/setup-bothub.sh   # Instala deps + crea estructura
bash scripts/verify-bothub.sh  # Verifica todo
```

## Herramientas MCP disponibles (tools v2.0)

| Tool | Descripción |
|------|-------------|
| `bothub_boot` | Arranca un bot (mock o real) |
| `bothub_status` | Estado del runtime |
| `bothub_execute_command` | Ejecutar comando localmente |
| `bothub_broadcast` | Broadacast a chats conocidos |
| `bothub_list_plugins` | Listar plugins y comandos |
| `bothub_list_chats` | Listar chats trackeados |
| `bothub_send_iacm` | Construir mensaje IACM |
| `bothub_parse_iacm` | Parsear mensaje IACM |
| `bothub_get_messages` | Historial con cursor incremental |
| `bothub_get_chat_history` | Historial por chat ID |
| `bothub_list_apps` | Listar apps disponibles |
| `bothub_launch_app` | Lanzar app como proceso hijo |
| `bothub_stop_app` | Parar app lanzada |
| `bothub_app_status` | Estado + logs recientes de apps |
