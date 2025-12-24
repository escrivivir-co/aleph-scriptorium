---
name: plugin_ox_blocklyeditor
description: "Bridge: conecta VS Code con el plugin Blockly Editor. Ver .github/plugins/blockly-editor/agents/"
argument-hint: "Invoca agentes de Blockly Editor: abrir editor, crear rutina, guardar, asignar paleta"
tools: ['agent']
handoffs:
  - label: Listar agentes de Blockly Editor
    agent: plugin_ox_blocklyeditor
    prompt: Lista agentes y capacidades del plugin Blockly Editor.
    send: false
  - label: Abrir editor para personaje
    agent: .github/plugins/blockly-editor/agents/blockly-editor.agent.md
    prompt: Abre el editor Blockly para editar la rutina del personaje especificado.
    send: false
  - label: Crear nueva rutina
    agent: .github/plugins/blockly-editor/agents/blockly-editor.agent.md
    prompt: Crea una nueva rutina visual para un personaje con paleta según paradigma FIA.
    send: false
  - label: Guardar rutina
    agent: .github/plugins/blockly-editor/agents/blockly-editor.agent.md
    prompt: Guarda la rutina actual generando código JavaScript.
    send: false
  - label: Asignar paleta de paradigma
    agent: .github/plugins/blockly-editor/agents/blockly-editor.agent.md
    prompt: Asigna paleta de bloques según paradigma FIA al personaje.
    send: false
  - label: Exportar código JavaScript
    agent: .github/plugins/blockly-editor/agents/blockly-editor.agent.md
    prompt: Exporta el código JavaScript generado desde los bloques.
    send: false
  - label: Listar paletas disponibles
    agent: .github/plugins/blockly-editor/agents/blockly-editor.agent.md
    prompt: Lista paletas de bloques y su correspondencia con paradigmas FIA.
    send: false
---

# Plugin Ox: BlocklyEditor

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/blockly-editor/agents/`.

---

## Propósito

Exponer el plugin **Blockly Editor** para edición de lógica visual de agentes-personaje. Permite diseñar comportamientos usando bloques de Blockly y generar código JavaScript.

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **BlocklyEditor** | `agents/blockly-editor.agent.md` | Editor de lógica visual con bloques |

---

## Prompts Disponibles

| Prompt | Archivo | Acción |
|--------|---------|--------|
| Abrir Editor | `prompts/abrir-editor.prompt.md` | Abrir editor para personaje |
| Crear Rutina | `prompts/crear-rutina.prompt.md` | Crear nueva rutina |
| Guardar Rutina | `prompts/guardar-rutina.prompt.md` | Guardar workspace y código |
| Asignar Paleta | `prompts/asignar-paleta.prompt.md` | Cambiar paleta de paradigma |

---

## Paletas Disponibles

| Paleta | Paradigma FIA | Estado |
|--------|---------------|--------|
| `sbr` | Sistemas Basados en Reglas | ✅ MVP |
| `logica` | Lógica Formal | ⏳ Sprint 3 |
| `simbolica` | IA Simbólica | ⏳ Sprint 3 |
| `conexionista` | Redes Neuronales | ⏳ Sprint 4 |
| `gramaticas` | Gramáticas Formales | ⏳ Sprint 4 |

---

## Integración

| Plugin | Relación |
|--------|----------|
| **AGENT_CREATOR** | Recibe personaje para editar lógica |
| **AS-GYM** | Consulta paradigma FIA para paleta |
| **ARG_BOARD** | Actualiza campo `rutina` en actores.json |
| **TEATRO** | Runtime ejecuta rutinas en triggers |
| **MCP-PRESETS** | Puede exportar paletas como presets |

---

## Submódulo Asociado

- **Nombre**: `blockly-alephscript-sdk`
- **Rama**: `integration/beta/scriptorium`
- **Paquetes**: blockly-alephscript-blocks, blockly-gamify-ui, blockly-runtime-gamify-ui

---

## Referencias

- Manifest: `.github/plugins/blockly-editor/manifest.md`
- Agentes: `.github/plugins/blockly-editor/agents/`
- Prompts: `.github/plugins/blockly-editor/prompts/`
- Datos: `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/`
