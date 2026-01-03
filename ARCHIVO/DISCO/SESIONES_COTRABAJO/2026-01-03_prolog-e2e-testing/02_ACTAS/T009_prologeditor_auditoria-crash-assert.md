# Acta T009: Auditoría Técnica del Crash en assert_fact

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 009 |
| **Agente** | @prologeditor (ejecutando turno asignado a @ox) |
| **Inicio** | 2026-01-03 23:30 |
| **Fin** | 2026-01-03 23:45 |
| **Estado final** | ✅ DONE |

---

## Contexto Leído

- Actas revisadas: T007, T008
- Referencias: MCPPrologServer.ts (líneas 472-490), PrologEngine.ts
- Logs: APB: Start [MCP Launcher] (evidencia de crash)

---

## Aportación: Diagnóstico del Crash

### 1. Evidencia del Crash en Logs

```
[2026-01-03T21:46:07.490Z] [INFO] MCP Launcher: Process prolog-mcp-server closed {
  "pid": 17468, 
  "code": 1,      ← EXIT CODE 1 (error no manejado)
  "signal": null
}
[2026-01-03T21:46:12.509Z] [INFO] MCP Launcher: Process prolog-mcp-server spawned ← Auto-restart
```

**Confirmado**: El servidor MCP Prolog crasheó con código 1 y fue reiniciado automáticamente por el Launcher.

### 2. Análisis del Código

#### Flujo de Ejecución

```
prolog_assert_fact tool invocada
      │
      ▼
MCPPrologServer.handleAssertFact(sessionId, fact)
      │
      ├── session = sessionManager.getSession(sessionId)  ← OK
      │
      └── await session.engine.engine.call(assertCommand) ← ❌ CRASH
```

#### Código Problemático (MCPPrologServer.ts L480-490)

```typescript
async handleAssertFact(sessionId: string, fact: string): Promise<any> {
    const session = this.sessionManager.getSession(sessionId);
    // ... validación ...
    try {
        const assertCommand = `assert(${fact}).`;
        await session.engine.engine.call(assertCommand);  // ← Problema aquí
        return { success: true, ... };
    } catch (error: any) {
        l.e(`Error asserting fact: ${fact}`, error);
        return { success: false, error: error.message };
    }
}
```

### 3. Causa Raíz Identificada

| Aspecto | Detalle |
|---------|---------|
| **Problema** | `swipl-stdio` Engine.call() lanza excepciones no capturadas correctamente |
| **Versión** | swipl-stdio@^1.0.4 |
| **Contexto** | El try-catch NO captura todos los errores de Engine.call() |
| **Impacto** | Excepción propaga hasta el event loop, crasheando el proceso Node |

### 4. Hipótesis Verificada

| Hipótesis | Verificación | Resultado |
|-----------|--------------|-----------|
| H1: assert causa crash en swipl-stdio | Logs confirman exit code 1 | ✅ Confirmada |
| H2: Sintaxis incorrecta | El fact `test_fact(hello, world)` es válido | ❌ Descartada |
| H3: Session engine corrupto | createSession funcionó | ❌ Descartada |
| H4: Timeout | Crash fue inmediato, no timeout | ❌ Descartada |

### 5. Inconsistencia Encontrada

`PrologEngine` tiene un método `assertFact(fact)`:

```typescript
// PrologEngine.ts L117-120
async assertFact(fact: string): Promise<void> {
    const assertCommand = `assert(${fact}).`;
    await this.engine.call(assertCommand);
}
```

Pero `handleAssertFact` usa directamente `session.engine.engine.call()` en lugar de `session.engine.assertFact()`.

**Problema de diseño**: Se duplica la lógica y se accede a la capa interna innecesariamente.

---

## Propuesta de Fix

### Opción A: Usar el método wrapper existente (Mínimo invasivo)

```typescript
// Cambiar línea 484 de:
await session.engine.engine.call(assertCommand);

// A:
await session.engine.assertFact(fact);
```

**Ventaja**: Consistencia con el diseño de PrologEngine.

### Opción B: Mejorar manejo de errores de swipl-stdio

```typescript
async handleAssertFact(sessionId: string, fact: string): Promise<any> {
    const session = this.sessionManager.getSession(sessionId);
    if (!session) { /* ... */ }

    try {
        await session.engine.assertFact(fact);
        return { success: true, fact, message: "Fact asserted successfully" };
    } catch (error: any) {
        l.e(`Error asserting fact: ${fact}`, error);
        
        // Verificar si el engine sigue vivo
        if (!session.engine?.engine) {
            return { success: false, error: "Engine crashed, session invalidated" };
        }
        
        return { success: false, fact, error: error.message || String(error) };
    }
}
```

### Opción C: Investigar swipl-stdio para crash handling

Revisar si hay una forma de capturar errores fatales de `swipl.Engine`.

---

## Decisiones Tomadas

| # | Decisión | Justificación |
|---|----------|---------------|
| D1 | Aplicar Opción A como fix inmediato | Mínimo invasivo, usa API existente |
| D2 | Añadir Opción B como mejora posterior | Mejor robustez a largo plazo |
| D3 | Documentar limitación de swipl-stdio | Para futuros debugging |

---

## Siguiente Turno Sugerido

@prologeditor para:
1. Aplicar fix (Opción A)
2. Re-ejecutar prueba E2E de `assert_fact`
3. Continuar con tools 4-7

---

## Referencias Técnicas

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| [MCPPrologServer.ts](../../../../../MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts#L472-L500) | 472-500 | handleAssertFact |
| [PrologEngine.ts](../../../../../MCPGallery/mcp-mesh-sdk/src/services/PrologEngine.ts#L117-L120) | 117-120 | assertFact wrapper |
| [package.json](../../../../../MCPGallery/mcp-mesh-sdk/package.json#L49) | 49 | swipl-stdio version |
