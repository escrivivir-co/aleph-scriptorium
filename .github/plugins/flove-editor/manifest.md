---
id: flove-editor
name: "Editor de Ontologías (Flove/CONFLUENTISM)"
version: "1.0.0"
description: "Plugin para diseñar ontologías basado en el paradigma Flove. Incluye 7 schemas extraídos, 54 FloveApps funcionales y operaciones RELATE/EXPLAIN/VIEW."
author: "ALEPH Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies:
  - "typed-prompting"
  - "agent-creator"
  - "mcp-presets"
  - "teatro"

# DATA extraída (2026-01-09)
data:
  source: "OnthologyEditor/DATA/"
  stats:
    pdfs: 28
    markdowns: 52
    schemas: 7
    apps: 54
    lines: 136072
    coverage: "95%"

# Recursos exportados
agents:
  - name: "FloveEditor"
    file: "agents/flove-editor.agent.md"
    description: "Agente principal para diseño de ontologías Flove"
  - name: "FloveOx"
    file: "agents/flove-ox.agent.md"
    description: "Oráculo interno: indexa submódulos y diagnóstico"
  - name: "FloveDocs"
    file: "agents/flovedocs.agent.md"
    description: "Índice de documentación y DATA extraída"
  - name: "Metamodel"
    file: "agents/metamodel.agent.md"
    description: "Validación UFO (5 capas, templates, FAIR)"
  - name: "MMCO"
    file: "agents/mmco.agent.md"
    description: "Coherencia OCMF (7 niveles, toy models)"

prompts:
  - name: "crear-ontologia"
    file: "prompts/crear-ontologia.prompt.md"
    description: "Crear nueva ontología desde template Flove"
  - name: "exportar-schema"
    file: "prompts/exportar-schema.prompt.md"
    description: "Exportar ontología a JSON Schema o TypeScript"
  - name: "operaciones-fuzzy"
    file: "prompts/operaciones-fuzzy.prompt.md"
    description: "Ejecutar RELATE/EXPLAIN/VIEW sobre conceptos"

instructions:
  - name: "flove-paradigm"
    file: "instructions/flove-paradigm.instructions.md"
    description: "Paradigma CONFLUENTISM y estructura Flove"

# Schemas disponibles
schemas:
  - id: "gradual-7-scale"
    path: "OnthologyEditor/DATA/schemas/gradual-7-scale.yaml"
    operations: ["RELATE", "GRADE"]
  - id: "flove-ontology"
    path: "OnthologyEditor/DATA/schemas/flove-ontology.schema.yaml"
    operations: ["ALL"]
  - id: "fuzzy-operations"
    path: "OnthologyEditor/DATA/schemas/fuzzy-operations-examples.yaml"
    operations: ["RELATE", "EXPLAIN", "VIEW"]
  - id: "confluentism-axioms"
    path: "OnthologyEditor/DATA/schemas/confluentism-axioms.md"
    operations: ["EXPLAIN"]
  - id: "fuzzy-philosophy"
    path: "OnthologyEditor/DATA/schemas/fuzzy-philosophy.schema.yaml"
    operations: ["EXPLAIN", "FREE"]
  - id: "biosystems-hierarchy"
    path: "OnthologyEditor/DATA/schemas/biosystems-hierarchy.schema.yaml"
    operations: ["SOULS", "VIEW"]
  - id: "papers-index"
    path: "OnthologyEditor/DATA/schemas/papers-index.schema.yaml"
    operations: ["REFERENCE"]

# FloveApps disponibles
apps:
  total: 54
  categories:
    fuzzy: 12
    psicosocial: 27
    freedom: 10
    meta: 5
  featured:
    - "Demos/Fuzzy/Relate/index.html"
    - "Demos/PsicoSocial/Souls/5Loves/index.html"
    - "Demos/PsicoSocial/Trustful/Crumbler/index.html"

# Integración con Aleph
handoffs:
  - label: "Crear ontología Flove"
    agent: "FloveEditor"
    prompt: "Crea una nueva ontología siguiendo el paradigma Flove (Fuzzy→PsicoSocial→Freedom)."
  - label: "Exportar a TypedPrompting"
    agent: "FloveEditor"
    prompt: "Exporta la ontología actual como schema para TypedPrompting."
  - label: "Analizar ontología existente"
    agent: "FloveEditor"
    prompt: "Analiza una ontología existente y la mapea a la estructura Flove."
  - label: "RELATE dos conceptos"
    agent: "FloveDocs"
    prompt: "Usa lógica fuzzy para relacionar dos conceptos."
  - label: "EXPLAIN un concepto"
    agent: "FloveDocs"
    prompt: "Explica un concepto con perspectiva y tono configurables."
  - label: "VIEW concepto en ontología"
    agent: "FloveDocs"
    prompt: "Visualiza un concepto mostrando nodo, relacionados y apps."
---

# Plugin: Editor de Ontologías (Flove/Iowa Template)

Plugin para diseñar ontologías basado en el paradigma **CONFLUENTISM** de Flove.

## Paradigma Flove

```
┌─────────────────────────────────────────────────────────────┐
│                    CONFLUENTISM                              │
│                   (Paradigma Central)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Nivel 1: FUZZY LOGIC                                        │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐                  │
│  │ RELATE  │───▶│ EXPLAIN │───▶│  VIEW   │                  │
│  │(relación)│   │(explicar)│   │ (ver)   │                  │
│  └─────────┘    └─────────┘    └─────────┘                  │
│       ↓              ↓              ↓                        │
│  ┌─────────────────────────────────────────┐                │
│  │         Nivel 2: PSICOSOCIAL            │                │
│  │  ┌─────────┐         ┌─────────────┐    │                │
│  │  │  SOULS  │◀───────▶│  TRUSTFUL   │    │                │
│  │  │(almas)  │         │ (confianza) │    │                │
│  │  └─────────┘         └─────────────┘    │                │
│  └─────────────────────────────────────────┘                │
│       ↓                      ↓                               │
│  ┌─────────────────────────────────────────┐                │
│  │      Nivel 3: FREEDOM / ECONOMY         │                │
│  │  ┌─────────┐         ┌─────────┐        │                │
│  │  │  FREE   │◀───────▶│ MAKING  │        │                │
│  │  │(libertad)│        │(producir)│        │                │
│  │  └─────────┘         └─────────┘        │                │
│  └─────────────────────────────────────────┘                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Aplicaciones Flove por Categoría

| Categoría | Apps | Descripción |
|-----------|------|-------------|
| **RELATE** | floveDate, floveFamilyMates | Relaciones interpersonales |
| **EXPLAIN** | floveChoir, floveEdu | Explicación y coordinación |
| **VIEW** | floveBizz, floveCorp | Visualización y descubrimiento |
| **SOULS** | floveLawyers, floveGamers | Identidad y pertenencia |
| **TRUSTFUL** | floveMD, floveSafe | Validación de confianza |
| **FREE** | floveMentor, flovePledge | Libertad de acción |
| **MAKING** | floveRent, floveRoom | Producción/economía |

## Integración con Scriptorium

### Con TypedPrompting
- Exportar ontologías como JSON Schema
- Validar mensajes de agentes contra ontología

### Con AGENT_CREATOR
- Asignar ontología a recetas de agentes
- Definir contratos de comunicación

### Con MCP-Presets
- Crear presets de herramientas por ontología
- Gestionar toolkits específicos

## Submódulo

**Path**: `OnthologyEditor/`  
**Repositorio**: https://github.com/escrivivir-co/alephscript-onthology-editor.git  
**Rama**: `main`

## Recursos FloveDocs

- Presentaciones: FloveSlides25.12.pdf
- Tablas: FloveTables25.12.ods
- Demos: Codeberg FloveDocs/Main
- Papers: PAPERS25.10.zip

## Uso

```
@aleph [FLOVE-EDITOR] Crear ontología para dominio X
@aleph [FLOVE-EDITOR] Exportar ontología a TypeScript
@aleph [FLOVE-EDITOR] Analizar estructura de agentes
```
