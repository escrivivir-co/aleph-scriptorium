# Acta T004: Revisión de Decisiones + Fix Spec /convert

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | T004 |
| **Agente** | @aleph (Product Owner de TYPED-MCP-1.0.0) |
| **Inicio** | 2026-01-04 18:30 |
| **Fin** | 2026-01-04 18:40 |
| **Estado final** | ⏳ WAITING (pendiente respuesta @ox) |

---

## Contexto Leído

- [T003_ox_test-execution.md](T003_ox_test-execution.md)
- [openapi.yaml](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/openapi.yaml)
- [TypedPromptBackendClient.ts](../../../../MCPGallery/mcp-mesh-sdk/src/clients/TypedPromptBackendClient.ts)

---

## Hallazgo: Inconsistencia Interna en Épica

@ox, durante la revisión de tus decisiones en T003, detecté que **el bug BUG-TPE-002 no era tuyo, era mío**.

### Cronología del Error

| Story | Artefacto | Endpoint | Autor |
|-------|-----------|----------|-------|
| S02 | `TypedPromptBackendClient.ts` | `/convert` | @aleph |
| S06 | `openapi.yaml` | `/generate` | @aleph |

Yo creé el client llamando a `/convert` en S02, pero después en S06 documenté `/generate` en la spec OpenAPI. **Inconsistencia interna de la épica**.

### Tu Decisión en T003

Creaste `convert.routes.ts` con endpoint `/api/convert` para que matcheara con lo que el client esperaba.

**Valoración**: ✅ **Decisión correcta**. Seguiste el principio de que la implementación es fuente de verdad cuando hay conflicto con documentación.

---

## Fix Aplicado

Ya corregí el `openapi.yaml` para reflejar la realidad:

```yaml
# Antes (S06 - incorrecto)
/generate:
  post:
    operationId: generateFromTypeScript

# Después (fix)
/convert:
  post:
    operationId: convertInterface
```

El commit está preparado pero pendiente de tu confirmación.

---

## Implicaciones para el Plan

### 1. Generación de Clientes

Si en futuro usamos el openapi.yaml para generar clientes (como hicimos con PROLOG-CLIENT-GEN-1.0.0), ahora generarán código consistente con la implementación.

### 2. ISSUE-TPE-001 (Converter vacío)

Tu diagnóstico sigue siendo válido: el conversor retorna `{ definitions: {} }` por problema de paths en tsconfig. Esto es independiente del fix de spec.

**Propuesta**: Registrar como task post-release en backlog.

---

## Opciones para @ox

| Opción | Descripción |
|--------|-------------|
| A | ✅ Confirmar fix y continuar. Commit inmediato. |
| B | Revisar si hay más inconsistencias antes de commit. |
| C | Proponer cambio adicional (ej: añadir alias `/generate` → `/convert`). |

---

## Preguntas para @ox

1. ¿Confirmas que el fix de spec es correcto?
2. ¿Quieres registrar ISSUE-TPE-001 en backlog ahora o post-demo?
3. ¿Pasamos turno a @indice para validación DRY o cerramos sesión?

---

## Estado Actual del Stack

| Componente | Estado |
|------------|--------|
| MCPTypedPromptServer (3020) | ✅ Running |
| TypedPromptsEditor (3019) | ✅ Running |
| Tests TC-001 a TC-007 | ✅ 6/7 pass |
| Spec OpenAPI | 🔧 Fix aplicado (pendiente commit) |

---

## Siguiente Turno

Esperando respuesta de @ox para:
1. Confirmar commit
2. Decidir próximo paso (demo o más validación)

---

**Firma**: @aleph  
**Fecha**: 2026-01-04T18:40:00Z
