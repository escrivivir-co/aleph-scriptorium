# Acta T003: Ejecución TC-001 a TC-007 MCPTypedPromptServer

| Campo | Valor |
|-------|-------|
| **Turno** | T003 |
| **Agente** | @ox |
| **Inicio** | 2026-01-04 18:10 |
| **Fin** | 2026-01-04 18:22 |
| **Misión** | Ejecutar casos de prueba TC-001 a TC-007 para MCPTypedPromptServer |
| **Estado** | ✅ Completado (6/7 pass, 1 issue) |

---

## Resumen Ejecutivo

Ejecución de test suite completo para validar la integración MCPTypedPromptServer en el Launcher. Se descubrieron y corrigieron 2 bugs bloqueantes durante la ejecución.

---

## Resultados de Tests

| Test | Tool | Resultado | Notas |
|------|------|-----------|-------|
| TC-001 | typed_list_schemas | ✅ PASS | count: 4 schemas |
| TC-002 | typed_get_schema | ✅ PASS | Schema id=1 retrieved |
| TC-003 | typed_list_libraries | ✅ PASS | count: 0 (empty but valid) |
| TC-004 | typed_convert_interface | ⚠️ ISSUE | Empty definitions (tsconfig path) |
| TC-005 | typed_validate_message | ✅ PASS | valid: true |
| TC-006 | typed_create_schema | ✅ PASS | schema id=5 created |
| TC-007 | typed_suggest_ontology | ✅ PASS | 3 suggestions returned |

---

## Bugs Descubiertos y Corregidos

### BUG-TPE-001: getAllSchemas Response Mismatch (FIXED)

**Problema**: `TypedPromptBackendClient.getAllSchemas()` esperaba respuesta en formato `{ schemas: Schema[] }` pero el backend `/api/schemas` devuelve array directo `Schema[]`.

**Ubicación**: [TypedPromptBackendClient.ts#L107](../../../../../MCPGallery/mcp-mesh-sdk/src/clients/TypedPromptBackendClient.ts)

**Fix aplicado**:
```typescript
// Antes (buggy):
const response = await this.fetch<{ schemas: Schema[] }>(url);
return response.schemas || [];

// Después (fixed):
const response = await this.fetch<Schema[]>(url);
return Array.isArray(response) ? response : [];
```

### BUG-TPE-002: Missing /api/convert Endpoint (FIXED)

**Problema**: El tool `typed_convert_interface` llamaba a `/api/convert` pero el endpoint no existía en el backend.

**Fix aplicado**: Creado nuevo archivo `TypedPromptsEditor/server/routes/convert.routes.ts` y registrado en `routes.ts`.

### ISSUE-TPE-001: Converter Returns Empty Definitions (OPEN)

**Problema**: El conversor TS→JSON Schema retorna `{ definitions: {} }` para interfaces simples.

**Causa probable**: El conversor usa `tsconfig.json` relativo y falla cuando el CWD no es el directorio del proyecto.

**Impacto**: TC-004 no pasa completamente. Los schemas creados via TC-006 tienen jsonSchema con definitions vacías.

**Prioridad**: Media (workaround: proveer jsonSchema pre-generado)

---

## Archivos Modificados

1. **TypedPromptBackendClient.ts** - Fix response parsing getAllSchemas
2. **convert.routes.ts** (nuevo) - Endpoint POST /api/convert
3. **routes.ts** - Registro del nuevo endpoint

---

## Servicios Verificados

| Servicio | Puerto | Estado |
|----------|--------|--------|
| MCP Launcher | 3050 | ✅ Running |
| TypedPrompt MCP | 3020 | ✅ Running (PID 16832) |
| TypedPrompt Backend | 3019 | ✅ Running |

---

## Próximos Pasos

1. [ ] Registrar ISSUE-TPE-001 en backlog para fix del conversor
2. [ ] Documentar parámetros correctos para cada tool en README
3. [ ] Considerar auto-conversión TS→JSON en typed_create_schema

---

## Métricas del Turno

- **Duración**: 12 minutos
- **Tests ejecutados**: 7
- **Tests pasados**: 6 (86%)
- **Bugs corregidos**: 2
- **Issues abiertos**: 1

---

**Firma**: @ox  
**Fecha**: 2026-01-04T18:22:00Z
