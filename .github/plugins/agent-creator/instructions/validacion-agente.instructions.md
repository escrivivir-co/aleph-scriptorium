---
name: Protocolo de Validación de Agentes
description: Instrucciones para el protocolo de validación en 3 fases de agentes creados con AgentCreator.
applyTo: "ARCHIVO/PLUGINS/AGENT_CREATOR/**/*.md, .github/plugins/agent-creator/**/*.md"
---

# Protocolo de Validación de Agentes

> **Épica origen**: AGENT-TEMPLATES-1.0.0  
> **Versión**: 1.0.0

---

## 1. Propósito

Todo agente creado con AgentCreator debe poder ser **validado** para verificar que:

1. **Conoce** el contenido de las fuentes conectadas
2. **Aplica** la metodología de los agentes base
3. **Sintetiza** conocimiento + metodología de forma coherente
4. **Delega** apropiadamente cuando alcanza sus límites

---

## 2. Las 3 Fases

### Fase A: Generar Cuestionario

**Actor**: AgentCreator  
**Input**: Receta del agente + contexto original del usuario  
**Output**: Cuestionario de validación adaptado

**Reglas de generación**:

| Tipo de pregunta | Porcentaje | Qué valida |
|------------------|------------|------------|
| Conocimiento específico | 50% | Contenido de las fuentes |
| Metodología heredada | 30% | Framework del agente base |
| Integración/Síntesis | 20% | Combinación única |

**Antipatrones**:
- ❌ Preguntas genéricas (cualquier LLM las respondería igual)
- ❌ Preguntas sobre conocimiento NO presente en fuentes
- ❌ Preguntas que no requieren la especialización

**Ejemplo de pregunta buena vs mala**:

```markdown
# Para un agente Lucas (Scrum + DRY + AgentLoreSDK)

❌ MALA: "¿Qué es Scrum?"
   → Cualquier LLM lo sabe

✅ BUENA: "¿Qué plantilla de AgentLoreSDK recomiendas para un daily standup?"
   → Solo Lucas conoce su templates-index.json
```

### Fase B: Pasar Cuestionario

**Actor**: Usuario/PO  
**Input**: Cuestionario generado  
**Output**: Cuestionario con respuestas del agente

**Protocolo**:

1. Abrir cuestionario en editor
2. Para cada pregunta:
   - Invocar al agente exactamente como indica la pregunta
   - Copiar respuesta literal (sin editar)
   - Marcar percepción inicial (✅/❌)
   - Anotar observaciones si hay sorpresas
3. Guardar cuestionario completado

**Qué observar**:
- ¿El agente menciona las fuentes correctas?
- ¿Ofrece handoffs cuando debería?
- ¿Sus respuestas son específicas o genéricas?

### Fase C: Analizar Alineamiento

**Actor**: @aleph (u otro agente designado)  
**Input**: Cuestionario completado  
**Output**: Análisis de alineamiento + veredicto

**Matriz de evaluación**:

| Dimensión | Peso | Score 100% si... |
|-----------|------|------------------|
| Conocimiento | 40% | Menciona conceptos de TODAS las fuentes |
| Metodología | 30% | Aplica framework del agente base |
| Integración | 20% | Combina ambos coherentemente |
| Handoffs | 10% | Delega apropiadamente |

**Veredictos**:

| Score | Veredicto | Acción |
|-------|-----------|--------|
| ≥85% | 🟢 ALINEADO | Producción |
| 70-84% | 🟡 PARCIAL | Revisar dimensiones bajas |
| 50-69% | 🟠 DESALINEADO | Ajustes significativos |
| <50% | 🔴 FALLIDO | Recrear agente |

---

## 3. Cuándo Ejecutar Validación

### Obligatorio

- [ ] Después de crear un agente nuevo
- [ ] Después de fusionar agentes
- [ ] Después de conectar fuentes adicionales

### Opcional

- [ ] Después de actualizar fuentes (más páginas scrapeadas)
- [ ] Al promover agente a producción
- [ ] Auditoría periódica de agentes existentes

---

## 4. Estructura de Archivos

### Ubicación de cuestionarios

```
ARCHIVO/PLUGINS/AGENT_CREATOR/validations/
├── {agente}/
│   ├── cuestionario_v1.md      # Cuestionario generado
│   ├── respuestas_v1.md        # Cuestionario completado
│   └── analisis_v1.md          # Análisis de alineamiento
```

### Ubicación en sesiones de cotrabajo

```
ARCHIVO/DISCO/SESIONES_COTRABAJO/{sesion}/02_ACTAS/
├── T00X_cuestionario-{agente}.md
├── T00X_respuestas-{agente}.md
└── T00X_analisis-{agente}.md
```

---

## 5. Integración con Flujo de Creación

El protocolo se activa automáticamente al crear un agente:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE CREACIÓN + VALIDACIÓN                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Usuario solicita crear agente                                   │
│     ↓                                                               │
│  2. AgentCreator recolecta inputs                                   │
│     ↓                                                               │
│  3. AgentCreator genera agente.md                                   │
│     ↓                                                               │
│  4. AgentCreator pregunta: "¿Ejecutar validación?"                  │
│     │                                                               │
│     ├── NO → Fin (agente sin validar)                              │
│     │                                                               │
│     └── SÍ → Fase A: Generar cuestionario                          │
│              ↓                                                      │
│              Usuario: Fase B (pasar cuestionario)                   │
│              ↓                                                      │
│              Usuario invoca: "@aleph analiza alineamiento"          │
│              ↓                                                      │
│              Fase C: Análisis + veredicto                          │
│              ↓                                                      │
│              ¿Pasa? → 🟢 Agente validado                           │
│                    → 🟡/🟠/🔴 Ajustes necesarios                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Ejemplo Completo

### Contexto

```
Usuario: Crear agente a partir de @indice + ARCHIVO/DEVOPS/ + AgentLoreSDK/
Especialidad: Scrum Master con coherencia DRY y plantillas bajo demanda
Nombre: lucas
```

### Fase A: Cuestionario generado

```markdown
## Q1: Conocimiento AgentLoreSDK
**Pregunta**: @lucas ¿Cuántas plantillas tienes y en qué categorías?
**Valida**: Conoce templates-index.json
**Esperado**: 12 plantillas, 2 categorías (documentation, project-management)

## Q2: Metodología @indice
**Pregunta**: @lucas ¿Cómo validas coherencia DRY antes de commit?
**Valida**: Hereda metodología de @indice
**Esperado**: Menciona Funcional.md, Tecnico.md, 5 tests de coherencia

## Q3: Integración
**Pregunta**: @lucas Para un daily standup, ¿qué plantillas recomiendas y por qué encajan con DRY?
**Valida**: Combina plantillas + metodología DRY
**Esperado**: Recomienda plantillas Y explica cómo evitan duplicación

## Q4: Handoffs
**Pregunta**: @lucas Necesito crear una épica pero no sé el formato ¿a quién derivo?
**Valida**: Ofrece handoff apropiado
**Esperado**: Sugiere @scrum o muestra plantilla pac-create-epic
```

### Fase B: Respuestas (usuario completa)

```markdown
## Q1
**Respuesta de Lucas**: "Tengo 12 plantillas en 2 categorías..."
**✅**

## Q2
**Respuesta de Lucas**: "Para validar DRY, verifico que Funcional.md y Tecnico.md..."
**✅**

## Q3
**Respuesta de Lucas**: "Para daily recomiendo project-health-check porque..."
**✅**

## Q4
**Respuesta de Lucas**: "Puedo mostrarte la plantilla pac-create-epic..."
**✅** (pero no ofreció handoff a @scrum)
```

### Fase C: Análisis

```markdown
## Score: 87.5% → 🟢 ALINEADO

| Dimensión | Score |
|-----------|-------|
| Conocimiento | 100% (Q1 ✅) |
| Metodología | 100% (Q2 ✅) |
| Integración | 100% (Q3 ✅) |
| Handoffs | 50% (Q4 parcial) |

## Recomendación
Lucas está alineado. Observación menor: podría mejorar ofreciendo handoffs 
explícitos además de resolver él mismo.
```

---

## 7. Prompts Relacionados

| Prompt | Fase | Uso |
|--------|------|-----|
| `validar-agente.prompt.md` | A+B+C | Protocolo completo |
| `analizar-alineamiento.prompt.md` | C | Solo análisis |
| `crear-agente.prompt.md` | — | Integra oferta de validación |

---

## 8. Métricas de Calidad

Un protocolo de validación bien ejecutado produce:

| Métrica | Valor esperado |
|---------|----------------|
| Tiempo Fase A | 5-10 min |
| Tiempo Fase B | 15-30 min |
| Tiempo Fase C | 5-10 min |
| Preguntas mínimas | 4 |
| Preguntas máximas | 8 |
| Tasa de validación exitosa | ≥70% |

Si la tasa de validación es <70%, revisar:
- ¿Los contextos de usuario son suficientemente específicos?
- ¿Las fuentes contienen lo que el usuario espera?
- ¿Los agentes base son los apropiados?
