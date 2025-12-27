# Backlog Borrador: SCRIPT-1.24.0 — OntologyAgentEditor

> **Estado**: ✅ Aprobado (publicado en BACKLOG-SCRIPTORIUM.md)  
> **Fecha aprobación**: 2025-12-26  
> **Origen**: Conversación PO-SM en `ONTOLOGY_AGENT_EDITOR/conversacion-po-sm.md`  
> **Plugin afectado**: `agent-creator` (extensión con capacidades ontológicas)

---

## Objetivo

Extender el plugin **AGENT_CREATOR** para que los agentes creados puedan tener "alma ontológica": un paradigma formal (CONFLUENTISM/UFO/custom) validado por los agentes de FloveEditor y con métrica de coherencia MMCO.

---

## Arquitectura de Integración

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE: AGENTE CON ONTOLOGÍA                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐        ┌──────────────┐        ┌──────────────┐         │
│   │    AGENT     │───────▶│   FLOVE-OX   │───────▶│   METAMODEL  │         │
│   │   CREATOR    │ paso   │ (Orquestador)│ valida │    (UFO)     │         │
│   │              │  3b    │              │        │              │         │
│   └──────┬───────┘        └──────┬───────┘        └──────────────┘         │
│          │                       │                                          │
│          │                       │ calcula                                  │
│          │                       ▼                                          │
│          │                ┌──────────────┐        ┌──────────────┐         │
│          │                │     MMCO     │───────▶│  TYPED       │         │
│          │                │  (φ metric)  │ export │  PROMPTING   │         │
│          ▼                └──────────────┘        └──────────────┘         │
│   ┌──────────────┐                                                          │
│   │   recipe.json│  { "ontology": { "paradigm": "...", "mmco_score": N } } │
│   └──────────────┘                                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Feature Cycle 1: Core Integration

**Effort total**: 15 pts

---

## Story: S01 — Extensión Schema de Receta
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción

Añadir bloque opcional `ontology` al schema de recetas de agentes.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Definir schema JSON para bloque `ontology` | 0.5 | ⏳ |
| T002 | Añadir campo `paradigm` (enum: CONFLUENTISM, UFO, custom) | 0.5 | ⏳ |
| T003 | Añadir campo `schema_path` (ruta a JSON Schema) | 0.5 | ⏳ |
| T004 | Añadir campo `validated` (boolean) | 0.25 | ⏳ |
| T005 | Añadir campo `mmco_score` (number 0-1, nullable) | 0.25 | ⏳ |
| T006 | Actualizar documentación de recetas | 0.5 | ⏳ |
| T007 | Crear ejemplo `recipes/ejemplo-ontologico.recipe.json` | 0.5 | ⏳ |

### Schema Propuesto

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "ontology": {
      "type": "object",
      "properties": {
        "paradigm": {
          "type": "string",
          "enum": ["CONFLUENTISM", "UFO", "custom"]
        },
        "schema_path": {
          "type": "string",
          "description": "Ruta al JSON Schema de la ontología"
        },
        "validated": {
          "type": "boolean",
          "default": false
        },
        "mmco_score": {
          "type": ["number", "null"],
          "minimum": 0,
          "maximum": 1
        },
        "ufo_layer": {
          "type": "integer",
          "minimum": 0,
          "maximum": 4,
          "description": "Capa UFO alcanzada (0=meta, 4=interfaz)"
        }
      },
      "required": ["paradigm"]
    }
  }
}
```

### Criterios de Aceptación

- [ ] AC1: Recetas sin `ontology` siguen siendo válidas (backward compatible)
- [ ] AC2: `paradigm` es obligatorio si existe bloque `ontology`
- [ ] AC3: Schema valida correctamente con AJV

---

## Story: S02 — Handoffs Bidireccionales
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción

Crear handoffs que conecten AgentCreator con FloveOx y viceversa.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Añadir handoff "Asignar paradigma ontológico" en agent-creator.agent.md | 1 | ⏳ |
| T009 | Añadir handoff "Validar coherencia ontológica" en agent-creator.agent.md | 1 | ⏳ |
| T010 | Añadir handoff "Crear agente desde ontología" en flove-ox.agent.md | 1 | ⏳ |
| T011 | Actualizar plugin_ox_agentcreator con nuevos handoffs | 0.5 | ⏳ |
| T012 | Actualizar plugin_ox_floveeditor con nuevo handoff | 0.5 | ⏳ |
| T013 | Documentar flujo en agent-creator.instructions.md | 1 | ⏳ |

### Handoffs a Crear

**En agent-creator.agent.md:**
```yaml
- label: Asignar paradigma ontológico
  agent: plugin_ox_floveeditor
  prompt: |
    El usuario está creando un agente y quiere asignarle un paradigma ontológico.
    Muestra opciones: CONFLUENTISM (Flove), UFO puro, o custom.
    Retorna selección para inyectar en recipe.ontology.
  send: false

- label: Validar coherencia ontológica
  agent: plugin_ox_floveeditor
  prompt: |
    Valida la ontología del agente contra UFO y calcula φ MMCO.
    Input: recipe.ontology.schema_path
    Output: { validated: bool, mmco_score: float, gaps: [] }
  send: false
```

**En flove-ox.agent.md:**
```yaml
- label: Crear agente desde ontología
  agent: plugin_ox_agentcreator
  prompt: |
    El usuario ha diseñado una ontología con FloveEditor.
    Quiere crear un agente que use esta ontología como "alma".
    Invocar flujo de creación con paradigma pre-seleccionado.
  send: false
```

### Criterios de Aceptación

- [ ] AC1: Handoffs funcionan en ambas direcciones
- [ ] AC2: El flujo circular (ontología→agente→validación) está documentado
- [ ] AC3: Bridges actualizados en `.github/agents/`

---

## Story: S03 — Prompt de Creación Extendido
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción

Modificar `crear-agente.prompt.md` para incluir paso opcional de paradigma.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T014 | Añadir Paso 3b: "¿Paradigma ontológico?" | 1 | ⏳ |
| T015 | Implementar lógica de selección de paradigma | 0.5 | ⏳ |
| T016 | Integrar llamada a @flove-ox si se elige paradigma | 0.5 | ⏳ |
| T017 | Actualizar template de recipe.json generado | 0.5 | ⏳ |
| T018 | Documentar en README del plugin | 0.5 | ⏳ |

### Flujo Propuesto

```markdown
## Paso 3b: Paradigma Ontológico (Opcional)

¿Este agente tendrá un paradigma ontológico formal?

| Opción | Descripción |
|--------|-------------|
| **Sin ontología** | El agente opera sin validación formal |
| **CONFLUENTISM** | Paradigma Flove (Fuzzy→PsicoSocial→Freedom) |
| **UFO** | Unified Foundational Ontology (5 capas) |
| **Custom** | Definir ontología propia |

Si selecciona CONFLUENTISM o UFO:
1. Invocar @flove-ox para configurar
2. Solicitar validación (opcional pero recomendada)
3. Almacenar resultado en recipe.ontology
```

### Criterios de Aceptación

- [ ] AC1: El flujo de creación no se rompe si se elige "Sin ontología"
- [ ] AC2: Seleccionar CONFLUENTISM invoca correctamente a @flove-ox
- [ ] AC3: La receta generada incluye bloque `ontology` si aplica

---

## Story: S04 — Tests de Auditoría Ontológica
**Effort**: 2 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción

Añadir tests específicos para agentes con ontología.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Heredar tests de @yellowflag (límites conceptuales) | 0.5 | ⏳ |
| T020 | Heredar tests de @metamodel (validación UFO) | 0.5 | ⏳ |
| T021 | Crear test "coherencia_ontologica" (mmco_score >= 0.7) | 0.5 | ⏳ |
| T022 | Documentar tests en sección "Tests de Auditoría" del agente | 0.5 | ⏳ |

### Tests Propuestos

| Test | Heredado de | Pregunta |
|------|-------------|----------|
| `limites_conceptuales` | @yellowflag | ¿El agente respeta los límites de su paradigma? |
| `validacion_ufo` | @metamodel | ¿La ontología mapea correctamente a UFO? |
| `coherencia_phi` | @mmco | ¿El score φ es >= 0.7 (coherencia aceptable)? |
| `schema_valido` | @typedprompting | ¿El JSON Schema exportado es válido? |

### Criterios de Aceptación

- [ ] AC1: Agentes sin ontología no ejecutan estos tests
- [ ] AC2: Tests reportan warnings, no bloquean creación
- [ ] AC3: Tests documentados en template de agente

---

## Story: S05 — Documentación e Integración
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción

Documentar la integración y cerrar stories pendientes de épicas relacionadas.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T023 | Actualizar agent-creator.instructions.md con sección "Ontología" | 0.5 | ⏳ |
| T024 | Actualizar docs/README.md del plugin | 0.5 | ⏳ |
| T025 | Cerrar SCRIPT-1.20.0-S07 (Integración AGENT_CREATOR) | 0.25 | ⏳ |
| T026 | Actualizar registry.json con dependencias opcionales | 0.25 | ⏳ |
| T027 | Publicar épica en BACKLOG-SCRIPTORIUM.md | 0.5 | ⏳ |

### Criterios de Aceptación

- [ ] AC1: Documentación completa y coherente
- [ ] AC2: SCRIPT-1.20.0-S07 marcada como completada
- [ ] AC3: Registry refleja dependencia opcional flove-editor

---

## Métricas del Borrador

| Métrica | Valor |
|---------|-------|
| Stories totales | 5 |
| Tasks totales | 27 |
| Effort total | 15 pts |
| Prioridad Must | 4 stories (13 pts) |
| Prioridad Should | 1 story (2 pts) |

---

## Dependencias

| Dependencia | Estado | Impacto |
|-------------|--------|---------|
| SCRIPT-1.20.0 (FloveEditor) | 30% | S07 se cierra con esta épica |
| SCRIPT-1.21.0 (Metamodel) | 35% | Validación UFO disponible |
| SCRIPT-1.22.0 (Agentes) | **100%** | 5 agentes ontológicos listos |
| SCRIPT-1.23.0 (MMCO) | 16% | Métrica φ parcialmente disponible |
| TypedPrompting | Instalado | Exportación de schemas |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Flujo de creación muy complejo | Media | Medio | Paso 3b es opcional |
| mmco_score no disponible | Baja | Bajo | Campo nullable |
| Backwards compatibility rota | Baja | Alto | Tests de regresión |

---

## Aprobación

- [x] **Usuario**: Aprobar backlog
- [x] **@scrum**: Publicar como SCRIPT-1.24.0
- [ ] **@aleph**: Iniciar implementación

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-26 | Crear conversación PO-SM | @scrum |
| 2025-12-26 | Generar backlog borrador | @scrum |
| 2025-12-26 | Aprobar y publicar en BACKLOG-SCRIPTORIUM.md | @scrum |

