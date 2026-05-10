# Prompt: Validar Índice (Pre-Commit)

## Instrucción

Ejecutar validación rápida de coherencia DRY antes de hacer commit. Los warnings son **informativos y no bloqueantes**.

---

## Contexto de uso

Este prompt se invoca automáticamente desde `as_commit-message.prompt.md` (Paso 2.5) o manualmente con `@indice validar`.

---

## Tests a ejecutar

### Test 1: coherencia_funcional_tecnico

**Pregunta**: ¿Ambos índices reflejan la misma realidad?

**Verificar**:
- Agentes en Funcional.md existen en Tecnico.md
- Plugins mencionados son consistentes
- Capas están alineadas

**Falla si**: Funcional.md menciona @agente que Tecnico.md no lista

### Test 2: dry_violation

**Pregunta**: ¿Hay duplicación entre índices?

**Verificar**:
- No hay párrafos copiados
- No hay tablas idénticas
- Cada índice tiene su enfoque (usuario vs técnico)

**Falla si**: Mismo contenido aparece en ambos archivos

### Test 3: indice_desactualizado

**Pregunta**: ¿Los índices reflejan el estado actual?

**Verificar**:
- Plugins en registry.json están en Tecnico.md
- Agentes en .github/agents/ están en índices
- Submódulos en .gitmodules están documentados

**Falla si**: Elemento existe pero no está documentado (o viceversa)

### Test 4: archivo_huerfano

**Pregunta**: ¿Hay archivos importantes sin documentar?

**Verificar**:
- Nuevos agentes tienen entrada en índice
- Nuevas instructions están listadas
- Nuevos prompts relevantes están referenciados

**Falla si**: Archivo importante no mencionado en ningún índice

### Test 5: commit_sin_trazabilidad

**Pregunta**: ¿El commit sigue el protocolo DevOps?

**Verificar**:
- Mensaje tiene formato `tipo(scope): descripción`
- Incluye `refs #TASK-ID` si aplica
- Scope es válido (script/* o fund/*)

**Falla si**: Mensaje de commit no cumple protocolo

---

## Procedimiento

### Paso 1: Identificar archivos modificados

```bash
git status --porcelain
git diff --name-only --cached
```

### Paso 2: Ejecutar tests relevantes

Solo ejecutar tests relacionados con los archivos modificados:

| Archivos modificados | Tests a ejecutar |
|---------------------|------------------|
| `.github/agents/` | 1, 3, 4 |
| `.github/plugins/` | 1, 3, 4 |
| `ARCHIVO/DEVOPS/` | 1, 2 |
| Cualquier otro | 5 |

### Paso 3: Generar reporte

```markdown
⚠️ VALIDACIÓN DE ÍNDICE

Archivos modificados: [N]
Tests ejecutados: [lista]

Resultados:
✅ coherencia_funcional_tecnico: OK
✅ dry_violation: OK
⚠️ indice_desactualizado: 1 discrepancia
✅ archivo_huerfano: OK
✅ commit_sin_trazabilidad: OK

Detalle de warnings:
- Tecnico.md no menciona plugin "{nombre}"

Sugerencia: Ejecutar `@indice actualizar` antes o después del commit.
Este warning es informativo y no bloquea el commit.

¿Continuar con el commit? (S/n)
```

---

## Formato de salida

### Si todos los tests pasan

```
✅ VALIDACIÓN DE ÍNDICE: OK

Todos los tests pasaron. Índices sincronizados.
```

### Si hay warnings

```
⚠️ VALIDACIÓN DE ÍNDICE

{N} warning(s) detectado(s):

1. [{test}] {descripción}
   Archivo: {ruta}
   Sugerencia: {acción}

Este warning es informativo y no bloquea el commit.
Puedes corregirlo con: @indice actualizar
```

### Si hay errores críticos

```
❌ VALIDACIÓN DE ÍNDICE

Error crítico detectado:

[descripción del error]

Este error debería corregirse antes de continuar.
¿Continuar de todos modos? (s/N)
```

---

## Integración con as_commit-message.prompt.md

Este prompt se invoca en el **Paso 2.5** del flujo de commit:

```
Paso 1: Identificar cambios
Paso 2: Clasificar por opportunity
Paso 2.5: Validar Índice ← ESTE PROMPT
Paso 3: Generar mensaje
Paso 4: Presentar al usuario
```

El resultado del Paso 2.5 se muestra al usuario pero **no bloquea** el Paso 3.
