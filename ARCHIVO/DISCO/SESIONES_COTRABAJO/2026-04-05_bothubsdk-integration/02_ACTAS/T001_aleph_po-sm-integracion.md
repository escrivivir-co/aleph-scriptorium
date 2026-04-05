# Conversación PO-SM: BotHubSDK

**Fecha**: 2026-04-05  
**Submódulo**: `BotHubSDK`  
**Plugin objetivo**: `bot-hub-sdk`  
**Rama integrada**: `integration/beta/scriptorium` ← `feat/sds_iacm`

---

## Análisis Técnico (SM)

### Estado del Submódulo

El SDK está en **pre-kick-off** (v0.0.0) pero funcionalmente robusto:
- 170+ tests en 14+ suites, todos pasando en `main`
- La rama `feat/sds_iacm` añade el protocolo IACM completo (SDS-17)
- Bot demo activo: `@an_aleph_zero_rabit_23_bot`
- Arquitectura limpia: plugin-based, composable, observable

### Gaps identificados

| Gap | Descripción | Prioridad |
|-----|-------------|-----------|
| GAP-01 | `examples/iacm-demo/` todavía en desarrollo (bun install fallará) | ALTA |
| GAP-02 | Sin `README-SCRIPTORIUM.md` previo (creado en esta integración) | ✅ Resuelto |
| GAP-03 | Plugin MCP para exponer SDK al VS Code (ningún servidor MCP definido) | MEDIA |
| GAP-04 | Sin prompt files en `.github/plugins/bot-hub-sdk/prompts/` | BAJA |
| GAP-05 | setup-workspace.sh usará `main` como BASE_BRANCH por defecto (sin `feat/sds_iacm`) | MEDIA |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| `feat/sds_iacm` diverge de `main` | MEDIA | ALTA | Seguir rama activa; no mezclar |
| BOT_TOKEN requerido para tests de integración | ALTA | MEDIA | MockTelegramBot para tests unitarios |
| Bun no instalado en CI/workspace | MEDIA | ALTA | Documentar en README-SCRIPTORIUM.md |
| Package npm `heteronimos-semi-asistidos-sdk` sin release | BAJA | BAJA | Usar `file:../../` en ejemplos |

---

## Visión de Producto (PO)

### ¿Para qué integrar BotHubSDK en el Scriptorium?

El Scriptorium tiene docenas de agentes (@aleph, @ox, @scrum…) que hoy solo hablan dentro de VS Code. BotHubSDK abre un canal hacia **Telegram**:

1. **Cyborgs semi-asistidos**: bots que combinan decisión humana + ejecución automatizada
2. **Protocolo IACM**: los agentes del Scriptorium pueden enviarse mensajes estructurados vía Telegram grupos — REQUEST, REPORT, QUESTION, ANSWER con threading y trazabilidad
3. **Observabilidad**: el dashboard TUI (Ink/React + RxJS) permite monitorizar el bot en tiempo real desde el workspace

### Casos de uso objetivo

1. **UC1 — Bot Scriptorium**: `@aleph bootea un bot` que ejecuta comandos del backlog desde Telegram
2. **UC2 — Notificaciones IACM**: cuando un agente completa una tarea larga, envía REPORT al grupo de coordinación
3. **UC3 — Cotrabajo asíncrono**: dos instancias del Scriptorium se coordinan via IACM en un grupo privado de Telegram
4. **UC4 — Demo pública**: el bot `@an_aleph_zero_rabit_23_bot` como punto de entrada al ecosistema

### Criterios de éxito

- [ ] `bun run test` pasa en `BotHubSDK/` desde el workspace
- [ ] Se puede crear un bot que implemente `BotPlugin` + `IacmBotPlugin`
- [ ] El agente `@plugin_ox_bothubsdk` puede guiar la creación de un comando nuevo
- [ ] `setup-workspace.sh` configura `BotHubSDK` correctamente

---

## Decisiones

1. **Rama `feat/sds_iacm` (no `main`)**: El valor diferencial del SDK para el Scriptorium es IACM. `main` tiene la base pero sin el protocolo. Decisión: integrar desde la rama que implementa SDS-17.

2. **Nombre `BotHubSDK` (no `HeteronomosSemiAsistidosSdk`)**: Más legible, coherente con el patrón de nombres del workspace (`AgentLoreSDK`, `MCPGallery`…).

3. **Plugin ID `bot-hub-sdk`**: Kebab-case, descriptivo, sin referencia al nombre original del repo para desacoplar de posibles renombrados upstream.

4. **Sin puerto MCP en esta fase**: El SDK no incluye servidor MCP propio. La integración es vía código TypeScript directo. Un posible MCP wrapper es GAP-03 para épica futura.
