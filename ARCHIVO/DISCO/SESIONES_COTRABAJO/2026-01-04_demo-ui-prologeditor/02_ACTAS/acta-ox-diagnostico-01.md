# Acta de Diagnóstico Técnico (@ox)

> **Contexto**: Demo en curso, bug detectado en Paso 4  
> **Fecha**: 2026-01-04  
> **Estado demo**: 4/12 pasos (continúa)

---

## 🔴 Bug: PROLOG-SESSION-ISOLATION-001

### Síntoma

| Operación | Resultado | Esperado |
|-----------|-----------|----------|
| `assert_fact(likes(mary, wine))` | ✅ "Fact asserted successfully" | ✅ |
| `query(likes(mary, X))` | ❌ `count: 0, payload: []` | `X = wine` |

### Contexto de Ejecución

```
Session ID: session-mjz010od-f7d5
Tool assert: prolog_assert_fact → POST /api/assert
Tool query:  prolog_query → POST /api/run-rule
```

### Hipótesis Técnicas

| # | Hipótesis | Probabilidad | Verificación |
|---|-----------|--------------|--------------|
| H1 | Backend crea sesión Prolog diferente para cada request | 🔴 Alta | Revisar `MCPPrologServer.ts` |
| H2 | El `sessionId` no se propaga correctamente al MCP | 🟡 Media | Logs del backend |
| H3 | El assert se hace en memoria pero no en la sesión persistente | 🟡 Media | Revisar `prolog_assert_fact` impl |
| H4 | El proceso swipl se reinicia entre operaciones | 🟢 Baja | Verificar child_process |

### Arquetipo del Bug

Este es un **bug de aislamiento de estado** — el frontend cree que opera sobre una sesión persistente, pero el backend/MCP no mantiene el estado entre operaciones.

### Código Sospechoso (a verificar)

1. **MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts**
   - ¿Cómo se gestiona el `sessionId`?
   - ¿Hay un mapa de sesiones activas?

2. **PrologEditor/backend/src/** 
   - ¿El endpoint `/api/assert` pasa el sessionId al MCP?
   - ¿O invoca swipl directamente sin sesión?

3. **mcp-core-sdk/src/types/**
   - ¿`PrologSession` tiene referencia al proceso Prolog?

### Impacto en Demo

| Pasos afectados | Impacto |
|-----------------|---------|
| 4 (assert_fact) | ⚠️ Funciona pero no persiste |
| 5 (consult_file) | ❓ Podría tener el mismo bug |
| 9 (load_rules_from_db) | ❓ A verificar |
| 10 (save_rule_to_db) | ❓ A verificar |

### Recomendación Inmediata

**Continuar demo** — El bug está documentado. Cuando termine, abrir épica de fix.

### Ticket Propuesto

```markdown
## PROLOG-SESSION-ISOLATION-001

**Tipo**: Bug
**Severidad**: Alta
**Épica**: PROLOG-FIX-1.0.0

### Descripción
Los hechos asertados con `prolog_assert_fact` no persisten para queries posteriores en la misma sesión lógica.

### Pasos para Reproducir
1. Crear sesión: `prolog_create_session({sessionId: "test"})`
2. Assert: `prolog_assert_fact({sessionId: "test", fact: "likes(mary, wine)."})`
3. Query: `prolog_query({sessionId: "test", query: "likes(mary, X)."})`
4. Observar: `count: 0` en lugar de `X = wine`

### Causa Raíz (hipótesis)
El backend no mantiene el proceso Prolog entre operaciones.

### Fix Propuesto
Implementar mapa de sesiones con procesos Prolog persistentes.
```

---

## Estado de la Demo (en vivo)

| Métrica | Valor |
|---------|-------|
| Pasos completados | 4/12 |
| Pasos OK | 3 ✅ |
| Pasos con observación | 1 ⚠️ |
| Pasos con error | 0 ❌ |

**Veredicto parcial**: Demo viable, bug documentado para post-mortem.

---

**@ox** — Sigo en modo observación. Que continúe la demo. 🐂
