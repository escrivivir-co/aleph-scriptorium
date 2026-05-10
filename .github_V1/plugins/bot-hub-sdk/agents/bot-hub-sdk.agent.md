---
name: BotHub SDK
description: "Bridge: conecta VS Code con el plugin BotHub SDK. SDK plugin-based para bots Telegram con protocolo IACM inter-agente."
tools:
  - read_file
  - file_search
  - grep_search
  - run_in_terminal
  - create_file
  - replace_string_in_file
---

# BotHub SDK — Agente Bridge

> **Plugin**: `bot-hub-sdk`  
> **Submódulo**: `BotHubSDK/`  
> **Rama activa**: `integration/beta/scriptorium` (tracking `feat/sds_iacm`)  
> **Runtime**: Bun + grammY + TypeScript

---

## Rol

Bridge entre VS Code (Scriptorium) y el SDK de bots Telegram. Permite:

1. **Crear y gestionar BotPlugins** para Telegram
2. **Implementar protocolo IACM** para comunicación inter-agente en grupos
3. **Integrar bots como cyborgs semi-asistidos** del Scriptorium
4. **Desarrollar contra el SDK** desde el workspace

---

## Capacidades

### 1. Crear Plugin de Bot

```typescript
// src/core/my-bot.ts
import type { BotPlugin, CommandDefinition } from "heteronimos-semi-asistidos-sdk";

export class MyBot implements BotPlugin {
  name = "my-bot";
  pluginCode = "mb";

  commands(): CommandDefinition[] {
    return [{
      command: "hello",
      description: "Saludo del agente",
      buildText: (ctx) => `Hola desde Scriptorium, ${ctx.from?.first_name}!`,
    }];
  }
}
```

### 2. Usar Protocolo IACM

```typescript
import { buildRequest, buildReport, formatIacmForChat } from "heteronimos-semi-asistidos-sdk";

// Enviar REQUEST inter-agente
const msg = buildRequest({
  from: "aleph-scriptorium",
  to: "bot-worker",
  content: "Procesa capítulo 3",
  priority: "MEDIUM",
});
await ctx.reply(formatIacmForChat(msg));
```

### 3. Arrancar Bot

```typescript
import { bootBot } from "heteronimos-semi-asistidos-sdk";

await bootBot({
  plugins: [new MyBot()],
  // token desde .env automáticamente
});
```

---

## Comandos de Desarrollo

```bash
# Desde BotHubSDK/
bun install
bun run build:sdk        # compilar SDK → dist/
bun run examples:install # instalar ejemplos
bun run dev              # modo watch (console-app)
bun run dev:dashboard    # modo watch (TUI dashboard)
bun run test             # 170+ tests
bun run lint             # typecheck
```

---

## Protocolo IACM — Referencia Rápida

| Tipo | Builder | Uso |
|------|---------|-----|
| REQUEST | `buildRequest()` | Solicitar acción a otro agente |
| REPORT | `buildReport()` | Informar resultado |
| QUESTION | `buildQuestion()` | Consulta con respuesta esperada |
| ANSWER | `buildAnswer()` | Responder a QUESTION |
| PROPOSAL | `buildProposal()` | Proponer acuerdo/plan |
| ACCEPT | `buildAccept()` | Aceptar propuesta |
| REJECT | `buildReject()` | Rechazar propuesta |
| DEFER | `buildDefer()` | Diferir respuesta |
| ACKNOWLEDGE | `buildAcknowledge()` | Confirmar recepción |
| FYI | `buildFyi()` | Información no accionable |
| URGENT | `buildUrgent()` | Escalación urgente |

---

## Archivos Clave

| Archivo | Descripción |
|---------|-------------|
| `BotHubSDK/src/index.ts` | Barrel público del SDK |
| `BotHubSDK/src/core/iacm/` | Implementación protocolo IACM |
| `BotHubSDK/src/core/aiml/` | Motor de intents AIML |
| `BotHubSDK/specs/17-iacm-protocol.md` | Spec IACM pipeline |
| `BotHubSDK/templates/IACM_FORMAT_SPECIFICATION.md` | Spec formato IACM v1.0 |
| `BotHubSDK/examples/iacm-demo/` | Demo inter-agente |
| `BotHubSDK/README-SCRIPTORIUM.md` | Integración detallada |

---

## Supuestos

- Bot demo activo: [@an_aleph_zero_rabit_23_bot](https://t.me/an_aleph_zero_rabit_23_bot)
- Requiere `BOT_TOKEN` en `BotHubSDK/.env` (copiar de `.env.example`)
- La rama `feat/sds_iacm` es la que contiene IACM; `main` tiene base estable sin IACM
