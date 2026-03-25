# Acta Paso 4: Añadir Hecho (Assert Fact)

## Metadatos

| Campo | Valor |
|-------|-------|
| **Paso** | 4 de 12 |
| **Tab** | Knowledge Base |
| **Tool demostrada** | `prolog_assert_fact` |
| **Endpoint** | `POST /api/assert` |
| **Hora** | 2026-01-04 01:47 AM |
| **Estado** | ✅ COMPLETADO (con observación) |

---

## Acción Realizada

1. Navegar al tab "Knowledge Base"
2. Click en ejemplo `likes(mary, wine).`
3. Click en "Assert"

## Resultado

### UI Feedback

```
Fact asserted successfully: likes(mary, wine).
```

### Verificación (Query)

Se intentó verificar con query `likes(mary, X).`:

```json
{
  "success": true,
  "status": 500,
  "payload": [],
  "query": "likes(mary, X).",
  "count": 0
}
```

## 🔍 Hallazgo Técnico

El hecho se asertó exitosamente (UI confirmó), pero el query posterior no lo encuentra.

### Hipótesis

| Causa Posible | Probabilidad |
|---------------|--------------|
| Sesiones Prolog aisladas entre assert y query | Alta |
| El assert no persiste en la misma sesión MCP | Media |
| Bug en el routing de sesiones | Baja |

### Recomendación

Investigar si `assert_fact` y `query` usan la misma sesión Prolog. El MCP Server podría estar creando sesiones efímeras.

**Ticket sugerido**: PROLOG-SESSION-ISOLATION-001

## Validación PO

- Estado: ✅ OK (funcionalidad demostrada)
- Comentarios: Assert funciona, pero la persistencia cross-operación requiere investigación

## Tool MCP Invocada

```typescript
prolog_assert_fact({
  sessionId: "session-mjz010od-f7d5",
  fact: "likes(mary, wine)."
})
```

## Notas

El KnowledgeBaseComponent tiene buenos ejemplos predefinidos que facilitan la demo. Los botones de ejemplo son una buena práctica UX.
