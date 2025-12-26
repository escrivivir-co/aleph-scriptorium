---
id: flove-editor
name: "Editor de Ontologías (Flove/Iowa Template)"
version: "0.1.0"
description: "Plugin para diseñar ontologías basado en el paradigma Flove (CONFLUENTISM). Permite modelar niveles Fuzzy→PsicoSocial→Freedom/Economy y generar contratos de comunicación entre agentes."
author: "ALEPH Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies:
  - "typed-prompting"
  - "agent-creator"
  - "mcp-presets"

# Recursos exportados
agents:
  - name: "FloveEditor"
    file: "agents/flove-editor.agent.md"
    description: "Agente principal para diseño de ontologías Flove"

prompts:
  - name: "crear-ontologia"
    file: "prompts/crear-ontologia.prompt.md"
    description: "Crear nueva ontología desde template Flove"
  - name: "exportar-schema"
    file: "prompts/exportar-schema.prompt.md"
    description: "Exportar ontología a JSON Schema o TypeScript"

instructions:
  - name: "flove-paradigm"
    file: "instructions/flove-paradigm.instructions.md"
    description: "Paradigma CONFLUENTISM y estructura Flove"

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
