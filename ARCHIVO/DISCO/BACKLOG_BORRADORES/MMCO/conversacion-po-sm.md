# Conversación PO-SM: MMCO (OCMF)

**Fecha**: 2025-12-26
**Submódulo**: `OnthologyEditor/MMCO`
**Plugin objetivo**: `flove-editor` (Bridge: `plugin_ox_floveeditor`)

---

## Participantes
- **PO (Product Owner)**: Define objetivos y alcance de integración MMCO ↔ Scriptorium
- **SM (Scrum Master)**: Media entre PO y agentes, asegura protocolo y trazabilidad
- **Agentes expertos** (vía `plugin_ox_floveeditor`):
  - `FloveOx` (orquestador): índice y mapeos Flove↔UFO↔MMCO
  - `FloveDocs`: documentación conceptual Flove
  - `Metamodel`: validación UFO/FAIR
  - `MMCO`: coherencia OCMF (7 niveles, toy models)
  - `FloveEditor`: diseñador de ontologías + exportadores

> Handoff operativo: desde VS Code invocar `@plugin_ox_floveeditor` y usar los handoffs a cada agente.

---

## Objetivo de la sesión
Integrar el submódulo MMCO (OCMF) como pilar de coherencia para ontologías Flove, definiendo:
1) qué parte del MMCO consumimos (toy models, XML ontologies, niveles),
2) cómo se valida una ontología Flove contra OCMF,
3) qué adapters y prompts se requieren en el plugin flove-editor,
4) cómo queda la trazabilidad en Scriptorium.

---

## Inventario técnico (descubierto por SM)

| Área | Recursos MMCO | Observaciones |
|------|----------------|---------------|
| Toy models | `toy_models/` (Python/Julia): categorical, coherence_metric (phi_mmco.py), geometric_algebra, quantum_biology, quantum_circuits, topological | Ofrecen kernels mínimos para medir/visualizar coherencia |
| Ontología XML | `xml/ontology/` (coherence.xml, matter_as_concept.xml, meta_dynamics.xml, ontological_field.xml) + `xml/glossary.xml` | Base formal para validar conceptos y relaciones |
| Documentos | `ocmf_overview.md`, `ocmf_index.xml`, `quantum_foundations_level0.md`, `phase1_formalism_evaluation.md` | Guían niveles de emergencia y criterios de evaluación |
| Metadatos | `xml/metadata.xml`, `xml/core_premises.xml` | Reglas y premisas del modelo |

---

## Conversación

### PO
Queremos que las ontologías Flove diseñadas con `FloveEditor` pasen por un filtro de coherencia MMCO. Debe existir una métrica (inicio: `phi_mmco.py`) y plantillas para mapear campos/paradigmas Flove a niveles OCMF.

### SM
De acuerdo. Usaremos los agentes para casar piezas:
- `FloveOx`: nos da el mapeo Flove↔UFO y el pre-mapeo Flove↔MMCO.
- `Metamodel`: asegura que el nivel fundacional (UFO) está satisfecho.
- `MMCO`: aplica niveles OCMF y métricas (phi_mmco) a la ontología.
- `FloveEditor`: provee exportadores (JSON Schema/TS/Zod) y punto de integración.

### FloveOx (oráculo)
Sugerencia de mapeo:
- Campos Flove (10) → Endurants/Perdurants (UFO) → Entidades OCMF
- Paradigmas Flove (6) → Dinámicas/Procesos (UFO) → Meta-dynamics OCMF
- Apps Flove (15+) → Modes/Qualities (UFO) → Coherence/Matter-as-concept OCMF

### Metamodel (UFO)
Requisito: antes de pasar a OCMF, la ontología debe cumplir con UFO (plantillas ENTITY/RELATIONSHIP/PROCESS) y metadatos FAIR.

### MMCO (OCMF)
Propuesta técnica:
- Adapter `schema→ocmf-xml`: generar un XML intermedio con las entidades y relaciones para probar contra `xml/ontology/*.xml`.
- Métrica `phi_mmco`: ejecutar `coherence_metric/phi_mmco.py` con inputs derivados del schema para obtener un score inicial.
- Reporte: producir `mmco_report.md` con niveles de coherencia y recomendaciones.

### FloveEditor
Exponer 3 handoffs nuevos:
1) "Validar contra UFO+OCMF" → pipeline completo,
2) "Generar adapter OCMF" → solo conversión schema→ocmf,
3) "Ejecutar métrica phi_mmco" → solo métrica con inputs mínimos.

---

## Gaps identificados
| Gap | Descripción | Prioridad |
|-----|-------------|-----------|
| G1 | Definir JSON intermedio `ocmf-adapter.json` desde schema Flove | Must |
| G2 | Wire de ejecución seguro para `phi_mmco.py` (dependencias) | Must |
| G3 | Plantillas UFO aplicadas a Flove (ENTITY/RELATIONSHIP/PROCESS) | Must |
| G4 | Documentar niveles OCMF y criterios por tipo | Should |
| G5 | Integración de reportes en `ARCHIVO/PLUGINS/FLOVE_EDITOR/` | Should |

---

## Riesgos técnicos
| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Dependencias Python/Julia (toy models) | Media | Medio | Modo "métrica mínima" + README de requisitos |
| Desalineación Flove↔UFO | Baja | Alto | Validar con `Metamodel` antes de OCMF |
| Complejidad de adapters | Media | Medio | Empezar con `coherence.xml` y crecer |

---

## Decisiones
1. Pipeline en 3 pasos (UFO → OCMF Adapter → Métrica/coherencia).
2. Datos de salida: `mmco_report.md` + `mmco_score.json` por ontología.

---

## Sesión de Casado: SM ↔ Agentes Expertos

> Fecha: 2025-12-26  
> SM hace de intérprete entre PO y los agentes de `@plugin_ox_floveeditor`

### SM → @FloveOx

**SM**: "FloveOx, necesitamos confirmar el mapeo Flove↔MMCO antes de diseñar el adapter. ¿Cuál es la estructura de dependencias entre submódulos?"

**FloveOx (oráculo)**:
```
       ┌───────────────────────────────────────┐
       │        USUARIO (Scriptorium)          │
       └─────────────────┬─────────────────────┘
                         │
                         ▼
       ┌───────────────────────────────────────┐
       │         @plugin_ox_floveeditor        │
       │    Bridge VS Code → Plugin interno    │
       └─────────────────┬─────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │       @FloveOx         │
            │   Oráculo coordinador  │
            └────────────┬───────────┘
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ @FloveDocs   │ │ @Metamodel   │ │   @MMCO      │
│ (Paradigma)  │ │ (UFO/FAIR)   │ │ (Coherencia) │
└──────────────┘ └──────────────┘ └──────────────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
            ┌────────────────────────┐
            │     @FloveEditor       │
            │  Diseñador ontologías  │
            │  (Exporta JSON/TS/Zod) │
            └────────────────────────┘
```

El flujo de validación para MMCO sería:

1. **FloveEditor** genera `schema.json` desde ontología del usuario
2. **Metamodel** valida UFO (pre-requisito)
3. **MMCO** recibe schema validado + ejecuta `ocmf-adapter` + `phi_mmco.py`
4. **FloveOx** consolida resultados y devuelve reporte

### SM → @Metamodel

**SM**: "Metamodel, ¿qué plantillas UFO deben aplicarse antes de pasar a MMCO?"

**Metamodel (UFO)**:

| Plantilla | Archivo | Aplicación |
|-----------|---------|------------|
| `ENTITY` | `templates/entity.md` | Cada Field Flove → Endurant UFO |
| `RELATIONSHIP` | `templates/relationship.md` | Relaciones Flove (RELATE/VIEW/EXPLAIN) |
| `PROCESS` | `templates/process.md` | Paradigmas dinámicos (FREE/MAKING) |

Además, metadatos FAIR mínimos:
```yaml
fair:
  findable: 
    identifier: "flove:{ontology_id}"
    metadata: true
  accessible:
    protocol: "https"
  interoperable:
    vocabulary: "UFO-A/B"
  reusable:
    license: "CC BY-SA 4.0"
```

### SM → @MMCO

**SM**: "MMCO, detalla la estructura del adapter y la métrica phi_mmco que propones."

**MMCO (OCMF)**:

#### Estructura `ocmf-adapter.json`:

```json
{
  "version": "1.0.0",
  "source_schema": "flove:ontology_xyz",
  "ufo_validation": {
    "passed": true,
    "templates_applied": ["ENTITY", "RELATIONSHIP"]
  },
  "ocmf_mapping": {
    "entities": [
      {
        "flove_field": "RELATE",
        "ufo_type": "Endurant",
        "ocmf_level": "0c",
        "ocmf_construct": "Coherence"
      }
    ],
    "relations": [...],
    "dynamics": [...]
  },
  "coherence_inputs": {
    "state_vector": [0.5, 0.3, 0.2, 0.0],
    "adjacency": [[1,1,0],[1,1,1],[0,1,1]]
  }
}
```

#### Métrica `phi_mmco.py`:

```python
# Inputs desde ocmf-adapter.json
state_vector = [0.5, 0.3, 0.2, 0.0]  # Distribución de campos
adjacency = np.array(...)            # Matriz de relaciones

# Output
phi_score = compute_phi(state_vector, adjacency)
# phi ∈ [0, 1] donde:
#   0.0-0.3: Baja coherencia (alto riesgo de fragmentación)
#   0.3-0.7: Coherencia media (requiere revisión)
#   0.7-1.0: Alta coherencia (ontología estable)
```

### SM → @FloveEditor

**SM**: "FloveEditor, ¿cómo integras estos nuevos handoffs en tu flujo?"

**FloveEditor**:

Propongo 3 nuevos handoffs:

| Handoff | Input | Output | Dependencia |
|---------|-------|--------|-------------|
| "Pipeline UFO+OCMF completo" | `schema.json` | `mmco_report.md`, `mmco_score.json` | Metamodel + MMCO |
| "Generar adapter OCMF" | `schema.json` validado | `ocmf-adapter.json` | Metamodel |
| "Ejecutar métrica phi_mmco" | `ocmf-adapter.json` | `mmco_score.json` | MMCO |

Ubicación de resultados:
```
ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/
├── {ontology_id}/
│   ├── ocmf-adapter.json
│   ├── mmco_score.json
│   └── mmco_report.md
└── README.md
```

### SM → PO (Síntesis)

**SM**: "PO, los agentes confirman:

1. **Dependencias claras**: FloveDocs (paradigma) → Metamodel (validación) → MMCO (coherencia)
2. **Adapter definido**: `ocmf-adapter.json` como formato intermedio
3. **Métrica cuantificable**: `phi_mmco` genera score 0-1 para coherencia
4. **Trazabilidad**: Resultados en `ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/{ontology_id}/`

¿Apruebas esta estructura para generar el backlog detallado?"

**PO**: "Aprobado. Proceder con el backlog y añadir un Feature 0 para documentar la sesión y los archivos creados."

---

## Próximo paso

- Generar backlog borrador completo con Feature Cycles 0-3
- Publicar en BACKLOG-SCRIPTORIUM.md como SCRIPT-1.23.0
- Commit según protocolo DevOps
3. Ubicación de resultados: `ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/`.
4. Prompts nuevos en flove-editor para las 3 operaciones.

---

## Siguiente paso
- [ ] Generar backlog borrador (FC1-3) para MMCO
- [ ] Preparar carpeta de resultados `ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/`
- [ ] Añadir épica en BACKLOG-SCRIPTORIUM.md
