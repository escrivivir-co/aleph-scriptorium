---
id: blockly-editor
name: "Editor de Lógica Visual (Blockly)"
version: "1.0.0"
description: "Plugin para diseñar lógica de agentes-personaje mediante programación visual con Blockly. Genera código JavaScript ejecutable en el Teatro."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies:
  - "arg-board"
  - "agent-creator"
  - "teatro"
optional_dependencies:
  - "mcp-presets"

# Integración con submódulo
submodule: "blockly-alephscript-sdk"

# Recursos exportados
agents:
  - name: "BlocklyEditor"
    file: "agents/blockly-editor.agent.md"
    description: "Agente para editar lógica visual de personajes"

prompts:
  - name: "abrir-editor"
    file: "prompts/abrir-editor.prompt.md"
    description: "Abrir el editor Blockly para un personaje"
  - name: "crear-rutina"
    file: "prompts/crear-rutina.prompt.md"
    description: "Crear una nueva rutina visual"
  - name: "guardar-rutina"
    file: "prompts/guardar-rutina.prompt.md"
    description: "Guardar rutina generada en actores.json"
  - name: "asignar-paleta"
    file: "prompts/asignar-paleta.prompt.md"
    description: "Asignar paleta de paradigma FIA a personaje"

instructions:
  - name: "blockly-editor"
    file: "instructions/blockly-editor.instructions.md"

# Integración con Aleph
handoffs:
  - label: "Abrir editor Blockly"
    agent: "BlocklyEditor"
  - label: "Crear rutina para personaje"
    agent: "BlocklyEditor"
  - label: "Asignar paleta de paradigma"
    agent: "BlocklyEditor"
  - label: "Exportar código JavaScript"
    agent: "BlocklyEditor"
---

# Plugin: Editor de Lógica Visual (Blockly)

Plugin para diseñar visualmente la lógica de agentes-personaje usando bloques de Blockly. Permite crear rutinas ejecutables que se integran con el Teatro.

---

## Propósito

Completar el flujo de **4 ingredientes** para creación de personajes:

```
1. Agentes Base (metodología)     — AGENT_CREATOR ✅
2. Fuentes de Datos (conocimiento) — AGENT_CREATOR ✅
3. Paradigmas FIA (razonamiento)   — AS-GYM ✅
4. Rutinas (comportamiento)        — BLOCKLY-EDITOR ⬅️ NUEVO
```

## Capacidades

- **Editor visual**: Interfaz drag-and-drop para construir lógica
- **Paletas por paradigma**: Bloques específicos para SBR, lógica, simbólica, etc.
- **Generador JavaScript**: Código ejecutable desde diagramas visuales
- **Runtime Teatro**: Ejecutar rutinas en estadios del monomito
- **Triggers**: Activar lógica en eventos (inicio, interacción, temporizador)

## Integración con Submódulo

- **Submódulo**: `blockly-alephscript-sdk`
- **Rama**: `integration/beta/scriptorium`
- **Paquetes clave**:
  - `packages/blockly-alephscript-blocks/`: Librería de bloques
  - `packages/blockly-runtime-gamify-ui/`: Runtime de ejecución

## Flujo de Uso

```
1. Usuario crea personaje con AGENT_CREATOR
2. Elige paradigma FIA (ej: SBR)
3. Abre editor Blockly desde ficha de personaje
4. Arrastra bloques de la paleta SBR
5. Genera código JavaScript
6. Guarda rutina en actores.json
7. Teatro ejecuta rutina en triggers
```

## Estructura de Datos

### Campo `rutina` en actores.json

```json
{
  "id": "tarotista",
  "nombre": "El Tarotista",
  "rutina": {
    "tipo": "blockly-js",
    "archivo": "tarotista-rutina.js",
    "paleta": "sbr",
    "triggers": ["estadio_inicio", "interaccion_usuario"],
    "version": "1.0.0"
  }
}
```

### Paletas Disponibles

| Paleta | Paradigma FIA | Estado |
|--------|---------------|--------|
| `sbr` | Sistemas Basados en Reglas | 🟢 MVP |
| `logica` | Lógica Formal | ⏳ Sprint 3 |
| `simbolica` | IA Simbólica | ⏳ Sprint 3 |
| `conexionista` | Redes Neuronales | ⏳ Sprint 4 |

## Referencias

- Submódulo: `blockly-alephscript-sdk/`
- Datos runtime: `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/`
- Bridge: `.github/agents/plugin_ox_blocklyeditor.agent.md`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/BLOCKLY-SDK/`
