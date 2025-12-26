---
name: plugin_ox_floveeditor
description: "Bridge: conecta VS Code con FloveEditor y sus 3 submódulos (FloveDocs, Metamodel, MMCO). Editor de ontologías con validación UFO y coherencia OCMF."
argument-hint: "Diseña, exporta, valida ontologías o consulta documentación/frameworks de los submódulos."
tools: ['vscode', 'read', 'edit', 'search', 'agent']
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
---

# Plugin Ox: FloveEditor

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/flove-editor/agents/`.

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
