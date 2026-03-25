# Acta T001: Tools Core E2E

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 001 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 (pendiente) |
| **Fin** | (en progreso) |
| **Estado final** | ⏳ ASIGNADO |

---

## Contexto Heredado

Sesión predecesora: `prolog-agent-brain-pack-refinement` (15 turnos, CERRADA)

### Stack verificado:
- ✅ MCP Launcher (3050): OK
- ✅ MCP Prolog (3006): OK
- ✅ Backend REST (8000): OK
- ✅ Frontend Angular (5001): OK

### Plan de pruebas (Fase 1):

| # | Tool | Descripción | Estado |
|---|------|-------------|--------|
| 1 | `prolog_create_session` | Crear sesión Prolog | ⏳ |
| 2 | `prolog_query` | Ejecutar query | ⏳ |
| 3 | `prolog_assert_fact` | Añadir hecho a KB | ⏳ |
| 4 | `prolog_consult_file` | Cargar archivo .pl | ⏳ |
| 5 | `prolog_list_sessions` | Listar sesiones activas | ⏳ |
| 6 | `prolog_get_telemetry_status` | Obtener telemetría | ⏳ |
| 7 | `prolog_destroy_session` | Destruir sesión | ⏳ |

---

## Instrucciones para @prologeditor

### Pre-requisito

Verificar stack con:
```
run_task: APB: Health Check
```

### Secuencia de Pruebas

1. **Crear sesión**:
   ```
   mcp_prolog-mcp-se_prolog_create_session({sessionId: "e2e-test-001", obraId: "testing"})
   ```

2. **Listar sesiones** (confirmar creación):
   ```
   mcp_prolog-mcp-se_prolog_list_sessions()
   ```

3. **Assert fact**:
   ```
   mcp_prolog-mcp-se_prolog_assert_fact({sessionId: "e2e-test-001", fact: "test_fact(hello, world)"})
   ```

4. **Query**:
   ```
   (si hay tool de query disponible, ejecutar)
   ```

5. **Telemetry**:
   ```
   mcp_prolog-mcp-se_prolog_get_telemetry_status()
   ```

6. **Destroy session**:
   ```
   mcp_prolog-mcp-se_prolog_destroy_session({sessionId: "e2e-test-001"})
   ```

### Documentar Resultados

Para cada tool, registrar:
- ✅ OK: Funcionó como esperado
- ⚠️ WARN: Funcionó con notas
- ❌ FAIL: Error (documentar mensaje)

---

## Resultados

> Ejecutado por @prologeditor — 2026-01-03 22:30

| # | Tool | Resultado | Notas |
|---|------|-----------|-------|
| 1 | `list_sessions` | ✅ OK | `{success: true, count: 0, sessions: []}` |
| 2 | `create_session` | ✅ OK | `sessionId: "e2e-test-001"` creada exitosamente |
| 3 | `get_telemetry_status` | ⚠️ WARN | `{success: false, error: "Backend not available"}` — Depende de backend REST |
| 4 | `assert_fact` | ❌ CANCELLED | Usuario canceló — MCP Server inestable |
| 5 | `query` | ⏳ | No ejecutado — bloqueado por inestabilidad |
| 6 | `destroy_session` | ⏳ | No ejecutado |
| 7 | `consult_file` | ⏳ | No ejecutado |

---

## Diagnóstico de Fallo (Auto-Reflexión)

### Métricas de Salud

| Métrica | Valor | Estado |
|---------|-------|--------|
| healthScore | 52 | 🟡 WARNING |
| cacheHitRate | 0% | 🔴 Error |
| Requests >30s | 49 | 🟡 Info |

### Estado del Stack (Post-Fallo)

| Servicio | Puerto | Estado |
|----------|--------|--------|
| MCP Launcher | 3050 | ✅ UP |
| MCP Prolog Server | 3006 | ❌ DOWN |
| Backend REST | 8000 | ❌ DOWN |
| Frontend Angular | 5001 | ❓ Desconocido |

### Antipatrones Detectados

1. **AP-04: Exploración sin Caché** — Cache hit rate 0%
2. **AP-02: Diagnóstico por Prueba y Error** — Múltiples intentos de conexión sin verificar estado primero

### Root Cause

El `start:launcher` arranca solo el Launcher (3050), NO el Prolog Server (3006). Son procesos separados:
- `npm run start:launcher` → MCPLauncherServer.ts (3050)
- `npm run start:prolog` → MCPPrologServer.ts (3006)

El Prolog Server se arrancó manualmente pero murió (Exit code 1).

### Lección Aprendida

> **Verificar estado de TODOS los servicios ANTES de invocar tools MCP.**

---

## Siguiente Turno

⛔ **BLOQUEADO** — Stack degradado (2/4 servicios caídos).

**Acción requerida**: @ox o usuario debe:
1. Reiniciar Backend REST (8000)
2. Reiniciar MCP Prolog Server (3006)
3. Verificar estabilidad antes de re-ejecutar T001

**Handoff**: @ox para diagnóstico técnico del crash.
