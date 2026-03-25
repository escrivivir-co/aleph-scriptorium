# Acta T008: Protocolo de Validación de Plantillas

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 8 |
| **Agente** | @aleph |
| **Inicio** | 2026-01-05 11:00 |
| **Fin** | 2026-01-05 11:30 |
| **Estado** | ✅ COMPLETED |

---

## Objetivo

Validar que la integración de plantillas AgentLoreSDK en Lucas funciona end-to-end.
**+ Abstraer protocolo de validación como feature reutilizable del plugin AgentCreator.**

---

## Entregables

### Archivos creados en plugin AgentCreator

| Archivo | Propósito |
|---------|-----------|
| `prompts/validar-agente.prompt.md` | Protocolo completo de 3 fases |
| `prompts/analizar-alineamiento.prompt.md` | Fase C: análisis con scoring y veredicto |
| `instructions/validacion-agente.instructions.md` | Instrucciones detalladas del protocolo |

### Archivos actualizados

| Archivo | Cambio |
|---------|--------|
| `agents/agent-creator.agent.md` | +3 handoffs (validar, generar cuestionario, analizar) |
| `manifest.md` | +2 prompts, +1 instruction, +2 handoffs |

---

## Protocolo Abstracto (3 Fases)

| Fase | Actor | Input | Output |
|------|-------|-------|--------|
| A | AgentCreator | Receta del agente | Cuestionario adaptado |
| B | Usuario/PO | Cuestionario | Respuestas del agente |
| C | @aleph | Cuestionario + respuestas | Análisis + veredicto |

### Scoring

- Conocimiento: 40%
- Metodología: 30%
- Integración: 20%
- Handoffs: 10%

### Veredictos

| Score | Veredicto | Acción |
|-------|-----------|--------|
| ≥85% | 🟢 ALINEADO | Producción |
| 70-84% | 🟡 PARCIAL | Revisar bajos |
| 50-69% | 🟠 DESALINEADO | Ajustes |
| <50% | 🔴 FALLIDO | Recrear |

---

## Cuestionario Original para Lucas (Fase B - ejemplo)

---

## 📋 CUESTIONARIO PARA LUCAS

> **Instrucciones**: Invoca a @lucas con cada pregunta y registra su respuesta literal.

### Q1: Verificar índice de plantillas

**Pregunta**: `@lucas ¿Cuántas plantillas tienes disponibles y en qué categorías?`

**Respuesta esperada**: Debe mencionar 12 plantillas en 2 categorías (documentation, project-management)

**Respuesta de Lucas**:
```
[PEGAR RESPUESTA AQUÍ]
```

**✅/❌**: ___

---

### Q2: Recomendación por contexto

**Pregunta**: `@lucas Estoy preparando el daily standup, ¿qué plantillas me recomiendas?`

**Respuesta esperada**: Debe recomendar `project-health-check`, `milestone-tracker`, `pac-update-status`

**Respuesta de Lucas**:
```
[PEGAR RESPUESTA AQUÍ]
```

**✅/❌**: ___

---

### Q3: Carga bajo demanda

**Pregunta**: `@lucas Carga la plantilla technical-writer y muéstrame su contenido`

**Respuesta esperada**: Debe ejecutar query Prolog, obtener ruta, y mostrar contenido del archivo

**Respuesta de Lucas**:
```
[PEGAR RESPUESTA AQUÍ]
```

**✅/❌**: ___

---

### Q4: Validación de coherencia (rol Scrum Master)

**Pregunta**: `@lucas Necesito validar que los índices están sincronizados antes del commit, ¿qué plantilla uso?`

**Respuesta esperada**: Debe recomendar `pac-validate` y explicar cómo usarla

**Respuesta de Lucas**:
```
[PEGAR RESPUESTA AQUÍ]
```

**✅/❌**: ___

---

### Q5: Crear épica con plantilla

**Pregunta**: `@lucas Quiero crear una nueva épica para el sprint FC2, ¿cómo lo hago con tus plantillas?`

**Respuesta esperada**: Debe recomendar `pac-create-epic` o `create-prd` y mostrar el flujo

**Respuesta de Lucas**:
```
[PEGAR RESPUESTA AQUÍ]
```

**✅/❌**: ___

---

### Q6: Plantilla de documentación

**Pregunta**: `@lucas Necesito documentar una nueva API, ¿qué plantilla tengo?`

**Respuesta esperada**: Debe recomendar `api-documenter` de la categoría documentation

**Respuesta de Lucas**:
```
[PEGAR RESPUESTA AQUÍ]
```

**✅/❌**: ___

---

## Fase 2: Análisis de Validación

Una vez completado el cuestionario, invoca:

```
@aleph Valida las respuestas del cuestionario en T008_analisis-validacion.md
```

---

## Criterios de Éxito

| Criterio | Mínimo | Óptimo |
|----------|--------|--------|
| Preguntas correctas | 4/6 (66%) | 6/6 (100%) |
| Carga bajo demanda funciona | ✅ Obligatorio | ✅ |
| Recomendaciones contextuales | 2/3 | 3/3 |
| Rutas correctas a AgentLoreSDK | ✅ Obligatorio | ✅ |

---

## Siguiente Paso

1. PO completa el cuestionario con Lucas
2. PO pega respuestas en este archivo
3. PO invoca `@aleph` con el archivo de análisis
4. @aleph valida y cierra la épica

