---
name: BotHub SDK Instructions
description: "Contexto y reglas para desarrollo de bots Telegram con protocolo IACM en el Scriptorium."
applyTo: "BotHubSDK/**/*.ts, BotHubSDK/**/*.md, .github/plugins/bot-hub-sdk/**/*.md"
---

# Instrucciones: BotHub SDK

> **Plugin**: `bot-hub-sdk`  
> **Submódulo**: `BotHubSDK/`  
> **Épica**: SCRIPT-2.5.0

---

## Contexto

BotHubSDK es un SDK plugin-based para bots Telegram construido sobre **grammY**. La rama integrada (`feat/sds_iacm`) incluye el **protocolo IACM v1.0** — el álgebra de mensajería inter-agente.

---

## Reglas de Uso

### 1. Patrón BotPlugin

Todos los bots implementan `BotPlugin`:

```typescript
interface BotPlugin {
  name: string;
  pluginCode: string;          // prefijo de comandos (ej: "rb" → "rb_aleph")
  commands(): CommandDefinition[];
  menus?(): MenuDefinition[];
  onMessage?(ctx: Context): Promise<void>;
}
```

**Convención de pluginCode**: 2-3 caracteres minúsculas, único por bot.

### 2. Protocolo IACM

- Usar **siempre** los builders del SDK (`buildRequest`, `buildReport`, etc.) — nunca formatear mensajes IACM a mano
- Detectar mensajes IACM entrantes con `detectsIacmMessage()` antes de procesar
- Parsear con `parseIacmMessage()` — devuelve `IacmParseResult` con tipo y datos
- Para bots que participan en protocolo: extender `IacmBotPlugin`, no `BotPlugin` directamente

### 3. Arranque

Usar siempre `bootBot()` — gestiona `.env`, webhooks stale, y mock mode automáticamente:

```typescript
await bootBot({ plugins: [new MyBot()] });
```

### 4. Tests

- Usar `MockTelegramBot` para tests unitarios (no requiere BOT_TOKEN)
- Ejecutar `bun run test` antes de cualquier commit en `BotHubSDK/`
- El test suite cubre: command-handler, IACM parser, IACM templates, AIML, store, emitter

### 5. Nomenclatura

| Concepto | Convención |
|----------|-----------|
| Bot plugin | `{Nombre}Bot` — ej: `RabbitBot` |
| Plugin code | 2-3 letras — ej: `rb` |
| Comandos | `{code}_{comando}` — ej: `rb_aleph` |
| IACM agent IDs | kebab-case — ej: `aleph-scriptorium` |

---

## Archivos de Referencia

- `BotHubSDK/specs/17-iacm-protocol.md` — spec completa IACM
- `BotHubSDK/templates/IACM_FORMAT_SPECIFICATION.md` — formato de mensajes
- `BotHubSDK/src/core/iacm/iacm-types.ts` — tipos TypeScript
- `BotHubSDK/src/core/iacm/iacm-templates.ts` — builders
- `BotHubSDK/CONTRIBUTING.md` — guía de contribución

---

## Limitaciones Conocidas

- Requiere Bun ≥ 1.1 (no compatible con Node puro sin adaptación)
- IACM demo app (`examples/iacm-demo/`) en desarrollo activo en rama integrada
- Sin release npm publicado (versión `0.0.0` — pre-kick-off)
