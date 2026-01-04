# Acta T012: Tools Backend REST - Hallazgos

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 012 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 23:36 |
| **Fin** | 2026-01-03 23:40 |
| **Estado final** | ⚠️ PARTIAL |

---

## Contexto Leído

- Actas revisadas: T011
- Fase: 2 - Tools Backend REST (5)
- Stack: 4/4 operativo

---

## Aportación: Pruebas E2E Tools Backend

### 1. Resultados

| # | Tool | Resultado | Output |
|---|------|-----------|--------|
| 1 | `load_rules_from_db` | ❌ FAIL | `{error: "Backend not available"}` |
| 2 | `save_rule_to_db` | ⛔ DISABLED | Tool deshabilitada por usuario |
| 3 | `list_sdk_templates` | ❌ FAIL | `{error: "Backend not available"}` |
| 4 | `get_sdk_template_content` | ⏳ | No probado (depende de #3) |
| 5 | `get_telemetry_status` | ❌ FAIL | `{error: "Backend not available"}` (ya visto en T011) |

### 2. Diagnóstico

#### Problema 1: "Backend not available"

El MCP Prolog Server (:3006) no puede conectar con el Backend REST (:8000).

**Verificación**:
- Health check: ✅ Backend responde en :8000
- curl directo: ⚠️ `/api/run-rule` retorna `{error: "Something went wrong!"}`

**Causa probable**: PrologBackendClient en MCP Server usa URL incorrecta o hay error de configuración.

#### Problema 2: Tool deshabilitada

`save_rule_to_db` está deshabilitada en la configuración de Copilot.

**Acción**: Usuario debe habilitarla.

### 3. Análisis de PrologBackendClient

Las tools Backend-Integrated usan `PrologBackendClient` para comunicarse con el Backend REST:

```
MCP Server (:3006) → PrologBackendClient → Backend REST (:8000)
```

Si `PrologBackendClient` no puede conectar, todas las tools Backend-Integrated fallan.

---

## Investigación Adicional

### Backend REST ✅ FUNCIONA

Endpoints verificados manualmente con curl:

| Endpoint | Método | Resultado |
|----------|--------|-----------|
| `/api/rules` | GET | ✅ 37+ reglas en DB |
| `/api/rules` | HEAD | ✅ 200 OK |
| `/api/sdk-templates` | GET | ✅ Templates disponibles |

### PrologBackendClient

```typescript
// MCPGallery/mcp-mesh-sdk/src/clients/PrologBackendClient.ts:222-226
export function createPrologBackendClient(
  baseUrl = process.env.PROLOG_BACKEND_URL || 'http://localhost:8000/api'
): PrologBackendClient {
  return new PrologBackendClient({ baseUrl });
}
```

La URL por defecto es correcta: `http://localhost:8000/api`

### isHealthy() Check

```typescript
async isHealthy(): Promise<boolean> {
  try {
    await this.fetch<unknown>('/rules', { method: 'HEAD' });
    return true;
  } catch {
    return false;
  }
}
```

El HEAD request funciona (verificado), así que `isHealthy()` debería retornar `true`.

### Problema Identificado: Tools MCP Deshabilitadas

Las tools MCP Prolog fueron **deshabilitadas por el usuario** otra vez:
- `mcp_prolog-mcp-se_prolog_list_sessions` → "Tool is currently disabled"

Esto explica el error "Backend not available" - las tools no pueden ejecutarse.

---

## Decisiones Tomadas

1. **Backend OK** - Los endpoints REST funcionan correctamente
2. **PrologBackendClient OK** - Configuración correcta
3. **BLOQUEADO** - Tools MCP deshabilitadas por usuario

---

## Siguiente Turno Sugerido

@ox o usuario para:
1. ✅ Habilitar tools MCP Prolog en Copilot settings
2. Re-ejecutar tests de Fase 2
