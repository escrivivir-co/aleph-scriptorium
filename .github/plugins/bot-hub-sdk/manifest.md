# Plugin: bot-hub-sdk

> **Submódulo**: `BotHubSDK`  
> **Versión**: 1.0.0  
> **Estado**: beta  
> **Épica**: SCRIPT-2.5.0 (BotHub Integration)

---

## Descripción

SDK plugin-based para bots de Telegram construido sobre grammY. Proporciona:

- **`BotPlugin` interface**: patrón de extensión para bots composables
- **`IacmBotPlugin`**: participación en protocolo IACM (Inter-Agent Communication Message)
- **`IntentEngine` (AIML)**: motor de clasificación de intents
- **`bootBot()`**: orquestador de arranque con gestión `.env`
- **`RuntimeEmitter`**: bus de eventos RxJS para observabilidad

El protocolo **IACM v1.0** (rama `feat/sds_iacm`) define 11 tipos de mensaje estándar para comunicación inter-agente en grupos de Telegram.

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
  "port": null,
  "bridge_agent": "plugin_ox_bothubsdk"
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
- `BOT_TOKEN` en `.env` (Telegram BotFather)

---

## Handoffs principales

| Acción | Invocación |
|--------|------------|
| Crear bot plugin | `@plugin_ox_bothubsdk crear-plugin` |
| Implementar IACM | `@plugin_ox_bothubsdk iacm` |
| Ver estado del bot demo | `@plugin_ox_bothubsdk status` |
| Construir y ejecutar | `@plugin_ox_bothubsdk build` |
