---
name: FloveEditor
description: "Bridge: conecta VS Code con FloveEditor, sus 3 submódulos, 7 schemas extraídos y 54 FloveApps funcionales."
argument-hint: "Diseña, exporta, valida ontologías, consulta schemas fuzzy, explora FloveApps o razona con lógica gradual."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
handoffs:
  - label: Listar agentes del plugin
    agent: plugin_ox_floveeditor
    prompt: Lista los 5 agentes disponibles (FloveEditor, FloveOx, FloveDocs, Metamodel, MMCO).
    send: false
  - label: Consultar oráculo del editor
    agent: .github/plugins/flove-editor/agents/flove-ox.agent.md
    prompt: Consulta el índice de submódulos, mapeos Flove↔UFO↔MMCO o diagnóstico de integridad.
    send: false
  - label: Crear ontología con template Flove
    agent: .github/plugins/flove-editor/agents/flove-editor.agent.md
    prompt: Guía la creación de una ontología usando la estructura de 3 niveles de Flove.
    send: false
  - label: Exportar ontología a JSON Schema
    agent: .github/plugins/flove-editor/agents/flove-editor.agent.md
    prompt: Exporta la ontología especificada a formato JSON Schema compatible con AJV.
    send: false
  - label: Exportar ontología a TypeScript
    agent: .github/plugins/flove-editor/agents/flove-editor.agent.md
    prompt: Exporta la ontología especificada como interfaces TypeScript.
    send: false
  - label: Exportar ontología a Zod
    agent: .github/plugins/flove-editor/agents/flove-editor.agent.md
    prompt: Exporta la ontología especificada como schema Zod.
    send: false
  - label: Consultar documentación Flove
    agent: .github/plugins/flove-editor/agents/flovedocs.agent.md
    prompt: Busca en FloveDocs (slides, tablas, demos) información sobre campos, paradigmas o apps.
    send: false
  - label: Validar ontología contra UFO
    agent: .github/plugins/flove-editor/agents/metamodel.agent.md
    prompt: Valida la ontología contra el framework UFO (5 capas, templates, axiomas FAIR).
    send: false
  - label: Analizar coherencia ontológica
    agent: .github/plugins/flove-editor/agents/mmco.agent.md
    prompt: Analiza coherencia meta-dinámica usando OCMF (7 niveles, toy models).
    send: false
  - label: Instalar en TypedPrompting
    agent: plugin_ox_typedprompting
    prompt: Instala el schema exportado en el plugin TypedPrompting para validación de mensajes.
    send: false
  - label: Asignar a receta de agente
    agent: plugin_ox_agentcreator
    prompt: Asigna la ontología exportada a una receta de agente en AGENT_CREATOR.
    send: false
  # === NUEVOS HANDOFFS (DATA extraída 2026-01-09) ===
  - label: 📊 Consultar catálogo de schemas
    agent: plugin_ox_floveeditor
    prompt: Lee ARCHIVO/PLUGINS/FLOVE_EDITOR/catalog.json y lista los 7 schemas disponibles con sus operaciones.
    send: false
  - label: 🔢 Consultar escala de 7 grados
    agent: plugin_ox_floveeditor
    prompt: Lee OnthologyEditor/DATA/schemas/gradual-7-scale.yaml y explica los 7 niveles fuzzy (0.14→1.0).
    send: false
  - label: 🧬 Explorar ontología completa
    agent: plugin_ox_floveeditor
    prompt: Lee OnthologyEditor/DATA/schemas/flove-ontology.schema.yaml y navega las 4 capas (Substances→Fields→Triads→Apps).
    send: false
  - label: 🎭 Listar FloveApps disponibles
    agent: plugin_ox_floveeditor
    prompt: Consulta catalog.json sección apps y lista las 54 FloveApps por categoría (Fuzzy/PsicoSocial/Freedom).
    send: false
  - label: 🔗 RELATE dos conceptos
    agent: plugin_ox_floveeditor
    prompt: Usa el schema gradual-7-scale.yaml para establecer una relación fuzzy entre dos conceptos dados.
    send: false
  - label: 📖 EXPLAIN un concepto
    agent: plugin_ox_floveeditor
    prompt: Usa fuzzy-operations-examples.yaml para explicar un concepto con perspectiva y tono configurables.
    send: false
  - label: 👁️ VIEW concepto en ontología
    agent: plugin_ox_floveeditor
    prompt: Navega flove-ontology.schema.yaml mostrando nodo, relacionados y apps disponibles.
    send: false
  - label: 🎯 Abrir FloveApp en browser
    agent: plugin_ox_floveeditor
    prompt: Abre una FloveApp específica de OnthologyEditor/DATA/Demos/ en el navegador embebido.
    send: false
  - label: 🧠 Generar personaje Teatro con brain Flove
    agent: plugin_ox_teatro
    prompt: Crea un personaje de Teatro que use flove-ontology como brain y hable en vocabulario Confluentista.
    send: false
  - label: 📝 Crear agente Fuzzy Reasoner
    agent: plugin_ox_agentcreator
    prompt: Usa el template fuzzy-reasoner del catalog.json para crear un agente que razone con lógica gradual.
    send: false
---

# Plugin Ox: FloveEditor

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/flove-editor/agents/` y la **DATA extraída** (136K líneas).

---

## Fuentes de Verdad DRY

| Recurso | Ubicación | Contenido |
|---------|-----------|-----------|
| **Código** | `.github/plugins/flove-editor/` | 5 agentes, prompts, instructions |
| **Datos plugin** | `ARCHIVO/PLUGINS/FLOVE_EDITOR/` | INDEX.md, catalog.json |
| **DATA extraída** | `OnthologyEditor/DATA/` | 28 PDFs, 52 MDs, 7 schemas, 54 apps |
| **Submódulos** | `OnthologyEditor/{FloveDocs,metamodel,MMCO}/` | Fuentes originales |

---

## Catálogo de Capacidades (catalog.json)

### Schemas Disponibles (7)

| Schema | Propósito | Operaciones |
|--------|-----------|-------------|
| `gradual-7-scale` | Escala fuzzy 7 grados | RELATE, GRADE |
| `flove-ontology` | Ontología completa 4 capas | ALL |
| `fuzzy-operations` | UI specs | RELATE, EXPLAIN, VIEW |
| `confluentism-axioms` | Axiomas filosóficos | EXPLAIN |
| `fuzzy-philosophy` | Paper "Why Fuzzy" | EXPLAIN, FREE |
| `biosystems-hierarchy` | Físico→bio→psico | SOULS, VIEW |
| `papers-index` | 19 papers fundacionales | REFERENCE |

### FloveApps Disponibles (54)

| Categoría | Count | Destacado |
|-----------|-------|-----------|
| **Fuzzy/Relate** | 8 | Mindmap SVG interactivo |
| **Fuzzy/Explain** | 2 | Forms perspectiva/tono |
| **Fuzzy/View** | 2 | Pills, popovers, wizard |
| **PsicoSocial/Souls** | 12 | 5Loves, Avatar, OpenAstro |
| **PsicoSocial/Trustful** | 15 | Crumbler, GenderWars, Sensy |
| **Freedom/Economy** | 10 | Craft, Ecology, Shareful |
| **Simplex + Pages** | 5 | Cosmos, navegación |

---

## Agentes Disponibles (5)

| Agente | Archivo | Rol |
|--------|---------|-----|
| **FloveOx** | `flove-ox.agent.md` | 🐂 Oráculo interno: indexa submódulos, mapeos, diagnóstico |
| **FloveEditor** | `flove-editor.agent.md` | ✏️ Diseñador de ontologías Flove (3 niveles) |
| **FloveDocs** | `flovedocs.agent.md` | 📚 Índice de documentación (slides, tablas, apps) |
| **Metamodel** | `metamodel.agent.md` | 🔬 Validación UFO (5 capas, templates, FAIR) |
| **MMCO** | `mmco.agent.md` | 🌀 Coherencia OCMF (7 niveles, toy models) |

---

## Taxonomía Visual

```
                 ┌─────────────────────────┐
                 │   🔌 BRIDGE (VS Code)   │
                 │  plugin_ox_floveeditor  │
                 └───────────┬─────────────┘
                             │
                             ▼
                 ┌─────────────────────────┐
                 │      🐂 FLOVE-OX        │
                 │   Oráculo del Editor    │
                 └───────────┬─────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   📚 DOCS     │    │  🔬 METAMODEL │    │   🌀 MMCO     │
│  FloveDocs    │    │   UFO/FAIR    │    │    OCMF       │
└───────────────┘    └───────────────┘    └───────────────┘
        │
        │ (todos alimentan)
        ▼
┌───────────────────────────────────────────────────────────┐
│                 ✏️ FLOVE-EDITOR                           │
│    Diseñador de ontologías · Exportadores · Integración  │
└───────────────────────────────────────────────────────────┘
```

---

## Submódulos del OnthologyEditor

| Submódulo | Path | Licencia | Agente |
|-----------|------|----------|--------|
| **FloveDocs** | `OnthologyEditor/FloveDocs/` | Por determinar | @FloveDocs |
| **Metamodel** | `OnthologyEditor/metamodel/` | CC BY-SA 4.0 | @Metamodel |
| **MMCO** | `OnthologyEditor/MMCO/` | AGPL-3.0 | @MMCO |

---

## Paradigma CONFLUENTISM (Resumen)

```
┌─────────────────────────────────────────────────────────────┐
│                    CONFLUENTISM                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Nivel 1: FUZZY LOGIC (Epistemología)                        │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐                   │
│  │ RELATE  │───▶│ EXPLAIN │───▶│  VIEW   │                   │
│  │(vincular)│   │(explicar)│   │ (ver)   │                   │
│  └─────────┘    └─────────┘    └─────────┘                   │
│                                                               │
│  Nivel 2: PSICOSOCIAL (Intersubjetividad)                    │
│  ┌─────────┐                   ┌─────────┐                   │
│  │  SOULS  │◀─────────────────▶│TRUSTFUL │                   │
│  │ (almas) │                   │(confianza)│                  │
│  └─────────┘                   └─────────┘                   │
│                                                               │
│  Nivel 3: FREEDOM / ECONOMY (Acción)                         │
│  ┌─────────┐                   ┌─────────┐                   │
│  │  FREE   │◀─────────────────▶│ MAKING  │                   │
│  │(libertad)│                  │ (hacer) │                   │
│  └─────────┘                   └─────────┘                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Flujo de Trabajo Completo

```
1. Consultar documentación (@FloveDocs)
   ↓
2. Diseñar ontología (@FloveEditor)
   ↓
3. Validar contra UFO (@Metamodel)
   ↓
4. Verificar coherencia (@MMCO)
   ↓
5. Exportar schema (JSON/TS/Zod)
   ↓
6. Integrar con plugins (TypedPrompting, AGENT_CREATOR)
```

---

## Referencia

| Documento | Ubicación |
|-----------|-----------|
| Manifest | `.github/plugins/flove-editor/manifest.md` |
| Agentes | `.github/plugins/flove-editor/agents/` (5 agentes) |
| Prompts | `.github/plugins/flove-editor/prompts/` |
| Instructions | `.github/plugins/flove-editor/instructions/` |
| Datos runtime | `ARCHIVO/PLUGINS/FLOVE_EDITOR/` |
| Submódulo | `OnthologyEditor/` (con 3 submódulos anidados) |
| Conversación PO-SM | `ARCHIVO/DISCO/BACKLOG_BORRADORES/METAMODEL_COMPLIANCE/conversacion-po-sm.md` |
