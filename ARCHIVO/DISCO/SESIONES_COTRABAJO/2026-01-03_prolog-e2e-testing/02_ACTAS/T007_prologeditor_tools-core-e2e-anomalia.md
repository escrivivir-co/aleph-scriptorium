# Acta T007: Tools Core E2E - Anomalía en assert_fact

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 007 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 22:43 |
| **Fin** | 2026-01-03 22:49 |
| **Estado final** | ⛔ BLOCKED (anomalía servidor) |

---

## Contexto Leído

- Actas revisadas: T001, T006
- Referencias: 01_TABLERO.md, 00_SESION.md
- Plan de pruebas: Fase 1 - Tools Core MCP (7)

---

## Aportación: Pruebas E2E Tools Core

### 1. Setup del Stack

Levantado correctamente usando tasks individuales (según lección operativa):

```
1. run_task("shell: APB: Start [MCP Launcher]")  → ✅ OK
2. run_task("shell: APB: Start [Backend]")       → ✅ OK
3. run_task("shell: APB: Start [Frontend]")      → ✅ OK
4. run_task("shell: APB: Health Check")          → ✅ 4/4 operativo
```

### 2. Resultados de Pruebas

| # | Tool | Resultado | Output |
|---|------|-----------|--------|
| 1 | `prolog_list_sessions` | ✅ OK | `{success: true, count: 0, sessions: []}` |
| 2 | `prolog_create_session` | ✅ OK | `{success: true, sessionId: "e2e-test-t007", obraId: "prolog-e2e-testing"}` |
| 3 | `prolog_assert_fact` | ❌ **ANOMALÍA** | Tool cancelada + servidor reiniciado |
| 4 | `prolog_query` | ⏳ Pendiente | Bloqueado por #3 |
| 5 | `prolog_consult_file` | ⏳ Pendiente | — |
| 6 | `prolog_get_telemetry_status` | ⏳ Pendiente | — |
| 7 | `prolog_destroy_session` | ⏳ Pendiente | — |

### 3. Anomalía Detectada

#### Síntomas

1. **Tool invocada**: `prolog_assert_fact({sessionId: "e2e-test-t007", fact: "test_fact(hello, world)"})`
2. **Resultado en Copilot**: `"The user cancelled the tool call."`
3. **Realidad**: El usuario NO canceló — el servidor MCP se reinició
4. **Comportamiento observado**: El proceso MCPPrologServer.ts se reinició durante la operación

#### Evidencia de Auto-Reflexión

```json
{
  "totalRequests": 164,
  "avgResponseTime": 7629ms,
  "cacheHitRate": 0
}
```

> **Nota**: El "cancelled" es un artefacto de Copilot cuando la conexión MCP se pierde. No refleja acción del usuario.

#### Hipótesis

| # | Hipótesis | Probabilidad | Verificación |
|---|-----------|--------------|--------------|
| H1 | `assert/1` en swipl-stdio causa crash | Alta | Revisar logs de MCPPrologServer |
| H2 | Sintaxis del fact incorrecta | Baja | El fact `test_fact(hello, world)` es válido |
| H3 | Problema en session engine | Media | Verificar estado de sesión post-crash |
| H4 | Timeout en swipl-stdio | Media | Revisar configuración de timeout |

---

## Decisiones Tomadas

1. **Documentar anomalía** antes de continuar
2. **Pasar turno a @ox** para auditoría técnica
3. **No intentar retry** hasta entender causa raíz

---

## Estado Post-Anomalía

Después del reinicio del servidor, verificación rápida:

| Servicio | Estado |
|----------|--------|
| MCP Launcher (3050) | ✅ OK |
| MCP Prolog (3006) | ✅ OK (reiniciado) |
| Backend REST (8000) | ✅ OK |
| Frontend (5001) | ✅ OK |

> El servidor se recuperó pero la sesión `e2e-test-t007` probablemente se perdió.

---

## Preguntas para @ox

- [ ] ¿Hay logs del crash en terminal de MCP Launcher?
- [ ] ¿El handler `handleAssertFact` tiene try/catch apropiado?
- [ ] ¿La biblioteca swipl-stdio maneja bien `assert/1`?
- [ ] ¿Deberíamos probar con un fact más simple (`foo.`)?

---

## Siguiente Turno Sugerido

**@ox** para:
1. Revisar logs del terminal MCP Launcher
2. Analizar código de `handleAssertFact` en MCPPrologServer.ts
3. Proponer fix o workaround

---

## Resumen DRY para Tablero

> T007: 3/7 tools probados, assert_fact crasheó servidor MCP → handoff @ox
