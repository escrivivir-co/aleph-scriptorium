# Prompt: Validar Agente Creado

> **Plugin**: agent-creator  
> **Versión**: 1.0.0  
> **Épica origen**: AGENT-TEMPLATES-1.0.0

---

## Propósito

Protocolo de validación en 3 fases para verificar que un agente creado cumple con las expectativas del usuario y demuestra las cualidades específicas del contexto dado.

---

## Parámetros

| Parámetro | Requerido | Descripción | Ejemplo |
|-----------|-----------|-------------|---------|
| `agente` | ✅ | Nombre del agente a validar | `lucas`, `tarotista` |
| `contexto_original` | ✅ | El contexto que dio el usuario al crear el agente | "Scrum Master con coherencia DRY" |
| `fuentes` | ⬜ | Fuentes de datos conectadas | `ARCHIVO/DEVOPS/`, `AgentLoreSDK/` |
| `modo` | ⬜ | `cuestionario` / `analisis` / `completo` | `completo` |

---

## Flujo de 3 Fases

```
┌─────────────────────────────────────────────────────────────────────────┐
│                PROTOCOLO DE VALIDACIÓN DE AGENTES                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  FASE A: GENERAR CUESTIONARIO                                          │
│  ════════════════════════════                                          │
│  Input: Receta del agente + contexto original del usuario              │
│  Output: Cuestionario adaptado con N preguntas específicas             │
│                                                                         │
│  Reglas:                                                                │
│  - Mínimo 4 preguntas, máximo 8                                        │
│  - 50% sobre conocimiento específico (fuentes conectadas)              │
│  - 30% sobre metodología heredada (agentes base)                       │
│  - 20% sobre integración (síntesis única del agente)                   │
│                                                                         │
│  FASE B: PASAR CUESTIONARIO                                            │
│  ══════════════════════════                                            │
│  Actor: Usuario/PO                                                     │
│  Acción: Invoca al agente con cada pregunta y registra respuestas      │
│                                                                         │
│  Reglas:                                                                │
│  - Respuestas literales, sin editar                                    │
│  - Marcar ✅/❌ según percepción inicial                                │
│  - Anotar observaciones si hay sorpresas                               │
│                                                                         │
│  FASE C: ANALIZAR ALINEAMIENTO                                         │
│  ═════════════════════════════                                         │
│  Input: Respuestas del cuestionario                                    │
│  Output: Score de alineamiento + veredicto + recomendaciones           │
│                                                                         │
│  Criterios por pregunta:                                               │
│  - ¿Responde con conocimiento de las fuentes? (no genérico)            │
│  - ¿Aplica metodología del agente base?                                │
│  - ¿Demuestra la especialización declarada?                            │
│  - ¿Ofrece handoffs correctos cuando aplica?                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Fase A: Generar Cuestionario

### Estructura del Cuestionario

```markdown
# Cuestionario de Validación: {NombreAgente}

## Metadatos
- **Agente**: {nombre}
- **Contexto original**: "{lo que pidió el usuario}"
- **Agentes base**: {lista}
- **Fuentes conectadas**: {lista}
- **Fecha generación**: {timestamp}

---

## Preguntas

### Q1: [Conocimiento Específico]
**Pregunta**: `@{agente} {pregunta sobre contenido de las fuentes}`
**Valida**: Que conoce el contenido de {fuente específica}
**Respuesta esperada**: Debe mencionar {conceptos clave de la fuente}

**Respuesta del agente**:
```
[PEGAR AQUÍ]
```
**✅/❌**: ___

---

### Q2: [Metodología Heredada]
**Pregunta**: `@{agente} {pregunta sobre capacidad del agente base}`
**Valida**: Que hereda la metodología de @{agente_base}
**Respuesta esperada**: Debe aplicar {metodología del base}

**Respuesta del agente**:
```
[PEGAR AQUÍ]
```
**✅/❌**: ___

---

### Q3: [Integración/Síntesis]
**Pregunta**: `@{agente} {pregunta que requiere combinar fuente + metodología}`
**Valida**: Que sintetiza conocimiento específico con método heredado
**Respuesta esperada**: Debe {combinar ambos aspectos}

**Respuesta del agente**:
```
[PEGAR AQUÍ]
```
**✅/❌**: ___

--- 

[Repetir para Q4-Q8 según complejidad del agente]
```

### Generación Automática de Preguntas

Para generar preguntas relevantes:

1. **Leer receta del agente** en `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{agente}.recipe.json`
2. **Extraer conceptos clave** de cada fuente conectada
3. **Identificar tests de auditoría** del agente base
4. **Formular preguntas** que solo se pueden responder conociendo las fuentes

**Antipatrones a evitar**:
- ❌ Preguntas genéricas que cualquier LLM respondería igual
- ❌ Preguntas sobre conocimiento que NO está en las fuentes
- ❌ Preguntas que no requieren la metodología del agente base

---

## Fase B: Pasar Cuestionario

### Instrucciones para el Evaluador

1. **Abrir el cuestionario** generado en Fase A
2. **Para cada pregunta**:
   - Copiar la invocación `@{agente} ...`
   - Ejecutar en Copilot Chat
   - Pegar respuesta literal en el cuestionario
   - Marcar ✅ si parece correcto, ❌ si no
3. **Anotar observaciones** si el agente:
   - Ofrece handoffs inesperados
   - Menciona fuentes que no debería conocer
   - Demuestra capacidades no declaradas

---

## Fase C: Analizar Alineamiento

### Matriz de Evaluación

| Dimensión | Peso | Criterios |
|-----------|------|-----------|
| **Conocimiento específico** | 40% | Menciona conceptos de las fuentes |
| **Metodología heredada** | 30% | Aplica framework del agente base |
| **Integración** | 20% | Combina fuente + método coherentemente |
| **Handoffs correctos** | 10% | Ofrece delegaciones apropiadas |

### Cálculo del Score

```
Score = (conocimiento × 0.4) + (metodología × 0.3) + (integración × 0.2) + (handoffs × 0.1)
```

Donde cada dimensión se puntúa 0-100 según:
- **100**: Todas las preguntas de esa dimensión correctas
- **75**: Mayoría correctas con detalles menores
- **50**: Mitad correctas
- **25**: Mayoría incorrectas
- **0**: Ninguna correcta

### Veredictos

| Score | Veredicto | Acción |
|-------|-----------|--------|
| ≥85% | 🟢 **ALINEADO** | Agente listo para producción |
| 70-84% | 🟡 **PARCIAL** | Revisar dimensiones bajas, posible re-entrenamiento |
| 50-69% | 🟠 **DESALINEADO** | Requiere ajustes significativos |
| <50% | 🔴 **FALLIDO** | Recrear agente con mejor contexto |

### Plantilla de Análisis

```markdown
# Análisis de Alineamiento: {NombreAgente}

## Resumen Ejecutivo
- **Score global**: {X}%
- **Veredicto**: {emoji} {VEREDICTO}
- **Recomendación**: {acción}

## Puntuación por Dimensión

| Dimensión | Preguntas | Correctas | Score |
|-----------|-----------|-----------|-------|
| Conocimiento específico | Q1, Q4, Q6 | {n}/3 | {x}% |
| Metodología heredada | Q2, Q5 | {n}/2 | {x}% |
| Integración | Q3, Q7 | {n}/2 | {x}% |
| Handoffs | Q8 | {n}/1 | {x}% |

## Análisis Detallado

### Fortalezas
- {Lo que el agente hace bien}

### Debilidades
- {Lo que falla o es genérico}

### Recomendaciones
1. {Acción correctiva si aplica}
2. {Mejora sugerida}

## Siguiente Paso
- [ ] {Acción según veredicto}
```

---

## Ejemplo de Uso

### Crear cuestionario para Lucas

```
@agentcreator validar agente=lucas contexto_original="Scrum Master con coherencia DRY y plantillas AgentLoreSDK" fuentes="ARCHIVO/DEVOPS/, AgentLoreSDK/cli-tool"
```

### Output esperado

Genera cuestionario con preguntas como:
- Q1: "¿Cuántas plantillas tienes disponibles?" → Valida conocimiento de AgentLoreSDK
- Q2: "¿Cómo validas coherencia DRY antes de commit?" → Valida metodología de @indice
- Q3: "¿Qué plantilla recomiendas para documentar una API y por qué?" → Valida integración

---

## Integración con Flujo de Creación

El protocolo de validación se activa **automáticamente** después de crear un agente si el usuario responde "sí" a:

```
AgentCreator: ✅ Agente {nombre} creado exitosamente.

¿Deseas ejecutar el protocolo de validación? (sí/no)
- Generaré un cuestionario de {N} preguntas
- Tú pasas el cuestionario al agente
- Yo analizo el alineamiento

> sí
```

---

## Archivos Relacionados

| Archivo | Propósito |
|---------|-----------|
| `validar-agente.prompt.md` | Este prompt |
| `validacion-agente.instructions.md` | Instrucciones detalladas |
| `analizar-alineamiento.prompt.md` | Prompt específico para Fase C |
