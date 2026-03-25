# Prompt: Analizar Alineamiento de Agente

> **Plugin**: agent-creator  
> **Versión**: 1.0.0  
> **Fase**: C del protocolo de validación

---

## Propósito

Analizar las respuestas de un cuestionario de validación y emitir veredicto de alineamiento.

---

## Parámetros

| Parámetro | Requerido | Descripción | Ejemplo |
|-----------|-----------|-------------|---------|
| `cuestionario` | ✅ | Ruta al cuestionario completado | `02_ACTAS/T008_cuestionario.md` |
| `agente` | ✅ | Nombre del agente evaluado | `lucas` |

---

## Invocación

```
@aleph analiza alineamiento cuestionario=T008_cuestionario.md agente=lucas
```

---

## Proceso de Análisis

### Paso 1: Leer cuestionario completado

```
1. Abrir archivo del cuestionario
2. Extraer respuestas de cada pregunta
3. Extraer marcas ✅/❌ del evaluador
4. Identificar observaciones adicionales
```

### Paso 2: Validar cada respuesta

Para cada pregunta Qn:

```
1. Leer "Respuesta esperada"
2. Comparar con "Respuesta del agente"
3. Verificar criterios específicos:
   - ¿Menciona los conceptos clave esperados?
   - ¿Usa la metodología correcta?
   - ¿Ofrece handoffs apropiados?
   - ¿Es específico o genérico?
```

### Paso 3: Calcular scores por dimensión

```python
# Pseudocódigo
conocimiento = contar_correctas(preguntas_conocimiento) / total_conocimiento * 100
metodologia = contar_correctas(preguntas_metodologia) / total_metodologia * 100
integracion = contar_correctas(preguntas_integracion) / total_integracion * 100
handoffs = contar_correctas(preguntas_handoffs) / total_handoffs * 100

score_global = (conocimiento * 0.4) + (metodologia * 0.3) + (integracion * 0.2) + (handoffs * 0.1)
```

### Paso 4: Emitir veredicto

| Score | Veredicto | Emoji |
|-------|-----------|-------|
| ≥85 | ALINEADO | 🟢 |
| 70-84 | PARCIAL | 🟡 |
| 50-69 | DESALINEADO | 🟠 |
| <50 | FALLIDO | 🔴 |

### Paso 5: Generar recomendaciones

Según las dimensiones con score bajo:

| Dimensión baja | Recomendación |
|----------------|---------------|
| Conocimiento | Revisar fuentes conectadas, posiblemente añadir más |
| Metodología | Reforzar herencia del agente base |
| Integración | Mejorar system prompt para sintetizar |
| Handoffs | Revisar declaración de handoffs en .agent.md |

---

## Output

### Formato del Análisis

```markdown
# Análisis de Alineamiento: {Agente}

## Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Agente** | {nombre} |
| **Cuestionario** | {ruta} |
| **Preguntas evaluadas** | {n} |
| **Score global** | {x}% |
| **Veredicto** | {emoji} {VEREDICTO} |

---

## Puntuación Detallada

### Por Dimensión

| Dimensión | Peso | Preguntas | Correctas | Score |
|-----------|------|-----------|-----------|-------|
| Conocimiento específico | 40% | {lista} | {n}/{m} | {x}% |
| Metodología heredada | 30% | {lista} | {n}/{m} | {x}% |
| Integración | 20% | {lista} | {n}/{m} | {x}% |
| Handoffs | 10% | {lista} | {n}/{m} | {x}% |

### Por Pregunta

| Q# | Dimensión | Esperado | Obtenido | ✅/❌ |
|----|-----------|----------|----------|------|
| Q1 | Conocimiento | {resumen} | {resumen} | {marca} |
| Q2 | Metodología | {resumen} | {resumen} | {marca} |
| ... | ... | ... | ... | ... |

---

## Análisis Cualitativo

### ✅ Fortalezas Detectadas

{Lista de lo que el agente hace bien, con ejemplos de las respuestas}

### ⚠️ Debilidades Detectadas

{Lista de lo que falla, con ejemplos específicos}

### 💡 Observaciones

{Comportamientos inesperados, tanto positivos como negativos}

---

## Recomendaciones

### Si veredicto es 🟢 ALINEADO
- El agente está listo para producción
- Considerar documentar los casos de uso validados
- Opcional: añadir al índice de agentes creados

### Si veredicto es 🟡 PARCIAL
1. Revisar dimensiones con score <70%
2. {Recomendación específica según dimensión baja}
3. Re-ejecutar preguntas fallidas después de ajustes

### Si veredicto es 🟠 DESALINEADO
1. Revisar el contexto original proporcionado
2. Verificar que las fuentes contienen lo esperado
3. Considerar añadir fuentes adicionales
4. Re-crear el agente con mejor especificación

### Si veredicto es 🔴 FALLIDO
1. El agente no cumple los requisitos mínimos
2. Revisar completamente:
   - ¿El agente base era el correcto?
   - ¿Las fuentes tienen el contenido esperado?
   - ¿El contexto del usuario era claro?
3. Recrear desde cero con mejor planificación

---

## Siguiente Paso

{Acción concreta según el veredicto emitido}
```

---

## Criterios de Evaluación Detallados

### Conocimiento Específico (40%)

Una respuesta demuestra conocimiento específico si:

- ✅ Menciona conceptos que SOLO están en las fuentes conectadas
- ✅ Usa terminología específica de las fuentes
- ✅ Referencia ubicaciones correctas de las fuentes
- ❌ Da respuestas genéricas que cualquier LLM daría
- ❌ Menciona conocimiento que NO está en las fuentes

### Metodología Heredada (30%)

Una respuesta demuestra metodología heredada si:

- ✅ Aplica el framework/método del agente base
- ✅ Usa la estructura de análisis del agente base
- ✅ Ofrece los mismos tipos de tests/auditorías
- ❌ Ignora la perspectiva del agente base
- ❌ Contradice la metodología heredada

### Integración (20%)

Una respuesta demuestra integración si:

- ✅ Combina conocimiento específico CON metodología heredada
- ✅ Produce síntesis única que ningún componente daría solo
- ✅ Responde desde la especialización declarada
- ❌ Solo usa conocimiento O solo usa metodología
- ❌ Las partes no se conectan coherentemente

### Handoffs (10%)

Los handoffs son correctos si:

- ✅ Ofrece delegar cuando es apropiado
- ✅ Sugiere el agente correcto para delegar
- ✅ Reconoce límites de su conocimiento
- ❌ Nunca ofrece handoffs
- ❌ Sugiere agentes incorrectos
