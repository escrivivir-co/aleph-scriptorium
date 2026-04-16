---
name: Alimentar Corpus
description: "Ciclo completo de alimentación del corpus: /feed → /diff-corpus → /merge-corpus"
applyTo: "LoreSDK/**/*.md, ARCHIVO/PLUGINS/LORE_SDK/**/*"
---

# Prompt: Alimentar Corpus

## Objetivo

Procesar un nuevo editorial y enriquecer el corpus acumulativo del mod activo. Ejecuta el ciclo completo: análisis → comparación → integración.

## Input Esperado

1. **Nuevo editorial** — texto completo o ruta al archivo
2. **Fecha del editorial** — formato YYYY-MM-DD
3. **Slug** — identificador corto (ej: `capitalismo-digital`, `guerra-palestina`)

## Proceso

### Paso 1: Preparación

1. Verificar que existe un mod activo (leer `LoreSDK/proyecto.config.md`)
2. Guardar el editorial en `corpus/editoriales/[YYYY-MM-DD_slug].md`
3. Confirmar que `corpus/corpus.md` existe (si no, ejecutar primero `/crear-voz`)

### Paso 2: /feed — Análisis

4. Invocar `@bartleby` con el nuevo editorial
5. Esperar informe de 5 secciones:
   - Linaje (citas explícitas con nivel jerárquico)
   - Taxonomía funcional (árbol de términos con verbos transitivos)
   - Mecanismos retóricos (con conteo y comparación)
   - Emergencias (E.XX: tensiones no resueltas)
   - Ausencias estructurales (presencias implícitas en negativo)
6. Guardar informe en `corpus/analisis/[YYYY-MM-DD_slug].analisis.md`

### Paso 3: /diff-corpus — Comparación

7. Invocar `@archivero` con el análisis recién generado
8. Clasificar cada hallazgo en:
   - **NUEVO**: Primera aparición en este editorial
   - **CONFIRMA**: Aparece por N-ésima vez (mismo mecanismo, mismo operador)
   - **EVOLUCIONA**: Mismo concepto, variación de registro o intensidad
   - **DISCREPA**: Contradicción con entrada anterior del corpus
9. Mostrar delta al usuario para revisión

### Paso 4: /merge-corpus — Integración

10. Con aprobación del usuario, invocar `@archivero` para integrar en `corpus/corpus.md`
11. Actualizar contadores (editoriales procesadas, apariciones por mecanismo)
12. Actualizar nick si hay cambios en la confirmación (raro después del 2º editorial)

### Paso 5: /design (Opcional)

13. Si el usuario quiere actualizar artefactos del mod:
    - Invocar `@cristalizador`
    - Propone actualizaciones a `mod/instructions/voz-[nick].instructions.md`
    - Especialmente si hay EVOLUCIONA en marcas del nick o emergencias nuevas

## Output Esperado

```
✅ Editorial guardado: corpus/editoriales/[YYYY-MM-DD_slug].md
✅ Análisis @bartleby: [N] mecanismos, [M] emergencias detectadas
✅ Delta: [X] NUEVO, [Y] CONFIRMA, [Z] EVOLUCIONA, [W] DISCREPA
✅ corpus.md actualizado: [total] editoriales procesadas
✅ Nick [nick] confirmado ×[N]

Resumen del corpus:
- Mecanismo más frecuente: [mecanismo] ×[N]
- Emergencias activas: [lista]
- Tensión seleccionable para /poema: [E.XX]
```

## Variantes

### Solo análisis (sin merge)

Si el usuario quiere revisar antes de integrar:
1. Ejecutar Pasos 1-3
2. **PAUSA**: Mostrar delta completo
3. Esperar aprobación explícita
4. Ejecutar Paso 4 solo con hallazgos aprobados

### Merge parcial

Si solo algunos hallazgos son válidos, `@archivero` puede integrar selectivamente indicando qué IDs de hallazgo incluir.
