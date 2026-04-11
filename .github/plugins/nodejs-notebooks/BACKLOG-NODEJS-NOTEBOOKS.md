# Backlog — Node.js Notebooks Plugin

> **Épica**: SCRIPT-2.6.0 (Node.js Notebooks REPL Expert)  
> **Fecha**: 2026-04-11  
> **Fuente**: Ejecución de validación completa de `socket-mesh-monitor.nnb`

---

## Sprint: Debug & Fixing — socket-mesh-monitor.nnb

### NNB-001 — WORKSPACE path resuelve incorrectamente (CRITICAL)

**Estado**: ✅ Resuelto (2026-04-11)  
**Prioridad**: P0 — Root Cause de la cascada de fallos  
**Cell afectada**: 3 (SETUP)

**Descripción**: `path.resolve('../../../..')` resuelve relativo al cwd del REPL de la extensión, no al directorio del notebook. El resultado es `c:\Users\aleph\OASIS` en vez de `c:\Users\aleph\OASIS\aleph-scriptorium`.

**Criterios de aceptación**:
- [ ] WORKSPACE resuelve a la raíz del workspace (`aleph-scriptorium/`)
- [ ] Funciona tanto con `WORKSPACE_FOLDER` env var como sin ella
- [ ] No depende de `path.resolve()` relativo

**Propuesta de fix**:
```javascript
// Opción A: Buscar .git hacia arriba desde __filename del notebook
const WORKSPACE = process.env.WORKSPACE_FOLDER
  ?? (() => {
    let dir = path.dirname(process.argv[1] || __filename || process.cwd());
    while (dir !== path.dirname(dir)) {
      if (fs.existsSync(path.join(dir, '.git'))) return dir;
      dir = path.dirname(dir);
    }
    return process.cwd();
  })();

// Opción B: Ancla desde ruta conocida del notebook
const WORKSPACE = process.env.WORKSPACE_FOLDER
  ?? path.resolve(__dirname, '../../../..');
```

---

### NNB-002 — SDK .tgz no compilado (prerequisito externo)

**Estado**: ✅ Resuelto (2026-04-11)  
**Prioridad**: P1  
**Cell afectada**: 5 (Install SDK)

**Descripción**: El notebook asume que `MCPGallery/mcp-core-sdk/alephscript-mcp-core-sdk-1.3.0.tgz` existe. Si no existe, intenta `npx tsc && npm pack` pero falla porque SDK_ROOT es incorrecto (depende de NNB-001).

**Criterios de aceptación**:
- [ ] Depende de NNB-001 resuelto
- [ ] El notebook detecta correctamente si el .tgz existe
- [ ] Si no existe, compila y empaqueta correctamente el SDK
- [ ] Mensaje de error claro si la compilación falla (no stack trace crudo)

**Notas**:
- Verificar version del .tgz: ¿sigue siendo `1.3.0`? Puede estar desactualizada
- Considerar usar `npm link` como alternativa al .tgz para desarrollo

---

### NNB-003 — Cascada de `nbRequire` undefined

**Estado**: ✅ Resuelto (2026-04-11) — guards añadidos + NNB-001/002 resueltos  
**Prioridad**: P1  
**Cells afectadas**: 7, 11, 15

**Descripción**: `nbRequire` se define al final de cell 5. Si cell 5 falla, las celdas downstream fallan con `nbRequire is not defined`. Esto es esperado pero el mensaje de error no es claro.

**Criterios de aceptación**:
- [ ] Se resuelve automáticamente al resolver NNB-001 y NNB-002
- [ ] Cada celda que usa `nbRequire` incluye un guard con mensaje descriptivo

**Propuesta de fix** (opcional, defensa en profundidad):
```javascript
if (typeof nbRequire === 'undefined') throw new Error('❌ Ejecutar primero Cell 5 (Install SDK)');
```

---

### NNB-004 — Cleanup no es resiliente a estado parcial

**Estado**: ✅ Resuelto (2026-04-11) — guards + resolve() en todos los recursos  
**Prioridad**: P2  
**Cell afectada**: 17 (Cleanup)

**Descripción**: Cell 17 intenta `mesh.server.close()` sin guard, lo que produce un rejection no manejado cuando el servidor nunca arrancó. Los try/catch cubren `client` y `mesh.as.io` pero no el `server.close()`.

**Criterios de aceptación**:
- [ ] Cleanup ejecuta sin error aunque ninguna celda previa haya tenido éxito
- [ ] Cada recurso (client, io, server) tiene guard independiente

**Propuesta de fix**:
```javascript
// Cerrar servidor HTTP (solo si existe)
if (typeof mesh !== 'undefined' && mesh.server) {
  await new Promise((resolve, reject) => {
    mesh.server.close((err) => {
      if (err) { console.error('Error cerrando servidor:', err.message); resolve(); }
      else { console.log('🛑 Servidor HTTP cerrado'); resolve(); }
    });
  });
} else {
  console.log('(Servidor HTTP no estaba activo)');
}
```

---

### NNB-005 — Anti-patrón `"language": "python"` en generación

**Estado**: ✅ Resuelto (2026-04-11)  
**Prioridad**: P0  

**Descripción**: Todas las celdas del notebook tenían `"language": "python"`. Corregido a `"markdown"` / `"javascript"` según contenido. Anti-patrón documentado en `nodejs-notebooks.instructions.md`.

---

## Backlog Futuro

### NNB-006 — Validación automática de .nnb al generar

**Estado**: 🔵 Backlog  
**Prioridad**: P2

**Descripción**: Añadir al agente NodejsNotebooks una validación post-generación que verifique:
- Ninguna celda tiene `"language": "python"`
- Celdas markdown empiezan con `#`, celdas javascript con `//` o código JS
- `source` es `string[]` (no string plano)
- `outputs` es `[]`

### NNB-007 — Template de notebook con WORKSPACE robusto

**Estado**: 🔵 Backlog  
**Prioridad**: P2

**Descripción**: Crear un snippet reutilizable para la celda SETUP que resuelva WORKSPACE de forma robusta, independiente del cwd del REPL. Incluirlo en las instrucciones como patrón canónico.
