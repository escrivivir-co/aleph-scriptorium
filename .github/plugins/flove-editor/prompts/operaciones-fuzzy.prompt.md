---
name: Operaciones Fuzzy
description: "Ejecutar operaciones RELATE, EXPLAIN, VIEW sobre conceptos usando la lógica gradual de Flove."
mode: agent
tools: ['vscode', 'read', 'search', 'agent']
---

# Operaciones Fuzzy Logic

> **Fuente**: `OnthologyEditor/DATA/schemas/`

## Instrucciones

Este prompt permite ejecutar las 3 operaciones fundamentales del paradigma Flove sobre conceptos arbitrarios.

---

## Operación: RELATE

**Propósito**: Establecer relación fuzzy entre dos conceptos.

### Input esperado
```yaml
conceptA: "Amor"
conceptB: "Libertad"
intensity: 0.71  # opcional, default inferido
```

### Proceso
1. Leer `gradual-7-scale.yaml` para escala de grados
2. Determinar tipo de relación (confluence, polarity, triad)
3. Asignar grado según criterios del schema
4. Devolver resultado estructurado

### Output
```yaml
relation:
  type: "confluence"
  grade: 0.71
  level: 5
  color: "Blue"
  triad:
    tao: "Relación"
    yin: "Atracción"
    yang: "Expansión"
  sources:
    - "flove-ontology.schema.yaml#/triads/love"
```

---

## Operación: EXPLAIN

**Propósito**: Explicar un concepto con perspectiva y tono configurables.

### Input esperado
```yaml
concept: "Confianza"
perspective: "subjective"  # subjective|objective|momentual|general
tone: "formal"             # normal|funny|formal|trivial
focus: "what"              # who|why|what|how|when|where
```

### Proceso
1. Leer `fuzzy-operations-examples.yaml` para UI specs
2. Consultar `flove-ontology.schema.yaml` para campo relacionado
3. Aplicar perspectiva y tono
4. Generar explicación gradual

### Output
```yaml
explanation:
  concept: "Confianza"
  field: "PsicoSocial/Trustful"
  definition: "Validación intersubjetiva de fiabilidad..."
  prism:
    perspective: "subjective"
    tone: "formal"
    focus: "what"
  grades:
    - level: 3
      label: "confianza_basica"
      description: "..."
    - level: 5
      label: "confianza_establecida"
      description: "..."
    - level: 7
      label: "confianza_plena"
      description: "..."
  sources:
    - "confluentism-axioms.md#trust"
```

---

## Operación: VIEW

**Propósito**: Visualizar concepto en la ontología, mostrando nodo, relacionados y apps.

### Input esperado
```yaml
concept: "Souls"
depth: 2  # niveles de profundidad (1-3)
```

### Proceso
1. Leer `flove-ontology.schema.yaml` para estructura
2. Localizar nodo del concepto
3. Expandir relacionados hasta depth
4. Identificar FloveApps disponibles

### Output
```yaml
view:
  node:
    id: "souls"
    level: 2
    field: "PsicoSocial"
    question: "Who"
  related:
    - id: "trustful"
      relation: "sibling"
      distance: 1
    - id: "5loves"
      relation: "child"
      distance: 1
  apps:
    - path: "Demos/PsicoSocial/Souls/5Loves/"
      name: "5Loves Avatar"
      type: "interactive"
    - path: "Demos/PsicoSocial/Souls/OpenAstro/"
      name: "OpenAstro"
      type: "visualization"
  navigation:
    parent: "PsicoSocial"
    siblings: ["Trustful", "Harmony"]
    children: ["5Loves", "Avatar", "DieSafe", "OpenAstro"]
```

---

## Schemas Requeridos

| Schema | Operación | Uso |
|--------|-----------|-----|
| `gradual-7-scale.yaml` | RELATE | Escala de intensidades |
| `fuzzy-operations-examples.yaml` | ALL | UI specs |
| `flove-ontology.schema.yaml` | VIEW | Navegación |
| `confluentism-axioms.md` | EXPLAIN | Vocabulario |

---

## Ejemplo de Invocación

```
Usuario: "Relaciona Amor con Producción usando lógica fuzzy"

Agente:
1. Lee gradual-7-scale.yaml
2. Identifica: Amor → PsicoSocial, Producción → Economy
3. Calcula distancia ontológica
4. Asigna grade 0.43 (nivel 3: relación indirecta pero coherente)

Resultado:
{
  "relation": "cross-level confluence",
  "grade": 0.43,
  "path": "PsicoSocial/Souls → Freedom → Economy/Making",
  "triad": {
    "tao": "Creación",
    "yin": "Motivación intrínseca",
    "yang": "Producción material"
  }
}
```

---

## Notas de Implementación

- Los schemas están en formato YAML (no JSON Schema)
- Las FloveApps son HTML/CSS/JS estáticos, navegables sin backend
- El grade 4 (0.57, Green) es el punto medio/neutral
- Grades < 4 son "más yin", grades > 4 son "más yang"
