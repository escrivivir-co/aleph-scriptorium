---
name: Guardar Rutina
description: Guarda el workspace actual y genera código JavaScript.
mode: agent
tools: ['read', 'edit']
---

# Guardar Rutina

## Objetivo

Guardar el estado actual del editor Blockly, generando código JavaScript ejecutable.

## Parámetros

- **personaje**: ID del personaje (obligatorio)
- **workspace_xml**: XML del workspace Blockly (opcional, si se guarda desde agente)

## Flujo

1. **Leer workspace** actual (XML)
2. **Validar bloques** conectados correctamente
3. **Generar código JavaScript** usando generadores de la paleta
4. **Guardar archivos**:
   - `workspaces/{personaje}-workspace.xml`
   - `rutinas/{personaje}-rutina.js`
5. **Actualizar versión** en actores.json
6. **Confirmar** guardado

## Validaciones

- [ ] Workspace tiene al menos un bloque de acción
- [ ] Todos los bloques están conectados (no huérfanos)
- [ ] Triggers definidos son válidos
- [ ] Código generado no tiene errores de sintaxis

## Formato del Código Generado

```javascript
// Rutina: {personaje}
// Paleta: {paleta}
// Generado: {timestamp}
// Version: {version}

(function(contexto) {
  "use strict";
  
  // Código generado desde bloques
  {codigo_generado}
  
})(contexto);
```

## Incremento de Versión

- Si solo cambios menores → patch: 0.0.1 → 0.0.2
- Si nuevos bloques → minor: 0.0.1 → 0.1.0
- Si cambio de triggers → minor

## Output Esperado

```markdown
### Rutina guardada: {personaje}

**Versión**: {version_anterior} → {version_nueva}
**Bloques**: {n} bloques procesados
**Código**: {lineas} líneas generadas

**Archivos actualizados**:
- ✅ `workspaces/{personaje}-workspace.xml`
- ✅ `rutinas/{personaje}-rutina.js`
- ✅ `actores.json` (versión actualizada)

**Próximo paso**: Probar en Teatro o ejecutar en sandbox
```
