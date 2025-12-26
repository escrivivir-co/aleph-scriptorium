---
name: plugin_ox_floveeditor
description: "Bridge: conecta VS Code con el agente FloveEditor. Editor de ontologías basado en el paradigma CONFLUENTISM de Flove."
argument-hint: "Diseña, exporta o integra ontologías con estructura Flove de 3 niveles."
tools: ['vscode', 'read', 'edit', 'search', 'agent']
handoffs:
  - label: Listar agentes de FloveEditor
    agent: plugin_ox_floveeditor
    prompt: Lista agentes disponibles en este plugin.
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
  - label: Instalar en TypedPrompting
    agent: plugin_ox_typedprompting
    prompt: Instala el schema exportado en el plugin TypedPrompting para validación de mensajes.
    send: false
  - label: Asignar a receta de agente
    agent: plugin_ox_agentcreator
    prompt: Asigna la ontología exportada a una receta de agente en AGENT_CREATOR.
    send: false
  - label: Ver estructura paradigma Flove
    agent: plugin_ox_floveeditor
    prompt: Muestra el diagrama y la estructura del paradigma CONFLUENTISM de 3 niveles.
    send: false
---

# Plugin Ox: FloveEditor

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/flove-editor/agents/`.

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| FloveEditor | `flove-editor.agent.md` | Agente principal para diseño de ontologías |

---

## Paradigma CONFLUENTISM

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

## Flujo de Trabajo

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   DISEÑAR       │────▶│    EXPORTAR     │────▶│   INTEGRAR      │
│   (FloveEditor) │     │  (JSON/TS/Zod)  │     │ (TypedPrompting)│
└─────────────────┘     └─────────────────┘     │ (AGENT_CREATOR) │
                                                 └─────────────────┘
```

---

## Submódulo

**Path**: `OnthologyEditor/`  
**Repo**: https://github.com/escrivivir-co/alephscript-onthology-editor.git  
**Rama**: main

---

## Referencia

- Manifest: `.github/plugins/flove-editor/manifest.md`
- Agentes: `.github/plugins/flove-editor/agents/`
- Prompts: `.github/plugins/flove-editor/prompts/`
- Datos: `ARCHIVO/PLUGINS/FLOVE_EDITOR/`
