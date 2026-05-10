---
id: n8n-editor
name: "Editor Visual de Workflows (n8n-like)"
version: "1.0.0"
description: "Conector visual para diseño de workflows con integración MCP nativa. Exporta a n8n y valida con TypedPrompting."
author: "Aleph Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies:
  - typed-prompting
  - mcp-presets
  - arg-board
  - agent-creator

# Recursos exportados
agents:
  - name: "N8NEditor"
    file: "agents/n8n-editor.agent.md"
    description: "Agente principal para diseño y exportación de workflows"

prompts:
  - name: "abrir-editor"
    file: "prompts/abrir-editor.prompt.md"
    description: "Iniciar el editor visual de workflows"
  - name: "crear-workflow"
    file: "prompts/crear-workflow.prompt.md"
    description: "Crear workflow desde template o descripción"
  - name: "importar-workflow"
    file: "prompts/importar-workflow.prompt.md"
    description: "Importar workflow desde archivo JSON o n8n"
  - name: "exportar-workflow"
    file: "prompts/exportar-workflow.prompt.md"
    description: "Exportar workflow a JSON o n8n"

instructions:
  - name: "n8n-editor"
    file: "instructions/n8n-editor.instructions.md"
    description: "Contexto y reglas para el editor de workflows"

# Integración con Aleph
handoffs:
  - label: "Abrir editor de workflows"
    agent: "N8NEditor"
    prompt: "Inicia el editor visual de workflows en http://localhost:4200"
  - label: "Crear workflow desde template"
    agent: "N8NEditor"
    prompt: "Modo Asistente: Crea un workflow a partir de un template predefinido (auditoría, scraping)."
  - label: "Crear workflow desde descripción"
    agent: "N8NEditor"
    prompt: "Modo Asistente: Diseña un workflow a partir de una descripción en lenguaje natural."
  - label: "Importar workflow"
    agent: "N8NEditor"
    prompt: "Importa un workflow desde archivo JSON o URL de n8n."
  - label: "Exportar workflow"
    agent: "N8NEditor"
    prompt: "Modo Gestor: Exporta el workflow actual a JSON, validando con TypedPrompting."
  - label: "Inyectar presets MCP"
    agent: "N8NEditor"
    prompt: "Modo Gestor: Configura servidores MCP en el workflow desde presets del Scriptorium."
  - label: "Validar workflow con TypedPrompting"
    agent: "N8NEditor"
    prompt: "Valida la estructura del workflow contra el schema definido."
---

# Plugin: N8N Editor

## Descripción

**N8N Editor** es un conector visual para diseño de workflows con integración MCP nativa. 

> **IMPORTANTE**: Este plugin NO sustituye a n8n. Es un **conector** que:
> 1. Permite diseñar workflows visualmente en Scriptorium
> 2. Integra presets MCP y ontologías del Scriptorium
> 3. Valida exports con TypedPrompting
> 4. Exporta JSON compatible con n8n

## Modos de Operación

### Modo Asistente 🎓

Diseño guiado de workflows:

1. **Desde template**: Carga workflow predefinido (auditoría, scraping)
2. **Desde descripción**: Genera workflow a partir de texto
3. **Importar**: Carga workflow existente de n8n

### Modo Gestor 🔧

Ejecución y exportación:

1. **Exportar a JSON**: Genera archivo compatible con n8n
2. **Validar schema**: Verifica estructura con TypedPrompting
3. **Inyectar MCP**: Configura servidores desde presets

## Arquitectura

```
ARCHIVO/PLUGINS/N8N_EDITOR/
├── workflows/                  # Workflows guardados
│   ├── templates/             # Templates predefinidos
│   │   ├── workflow-auditoria.json
│   │   └── workflow-scraping.json
│   └── custom/                # Workflows del usuario
├── exports/                    # Exports a n8n
└── validation-logs/           # Historial de validaciones
```

## Submódulo

El plugin usa el submódulo `alephscript-n8n-like-editor` que proporciona:

- **Servidor Angular** en puerto 4200 (desarrollo)
- **Canvas D3** para visualización de flujos
- **Monaco Editor** para código
- **Integración MCP nativa** (tipos, servicios, UI)

### Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Angular | 18.2.x | Framework frontend |
| D3.js | 7.9.x | Canvas de workflows |
| Monaco Editor | 0.52.x | Editor de código |
| Express | 4.18.x | Server SSR |

### Iniciar servidor

```bash
cd alephscript-n8n-like-editor
npm install
npm start
# Abrir http://localhost:4200
```

## Integración con TypedPrompting

Los workflows se exportan como JSON. Esta salida se valida con TypedPrompting:

```
N8N-Editor → workflow.json → TypedPrompting (validación) → n8n/destino
                    ↑
            ontología Scriptorium
```

**Schema**: `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/workflow.schema.json`

## Integración con MCP Presets

Los presets de `@plugin_ox_mcppresets` se pueden inyectar como servidores MCP:

```typescript
// Mapeo: Preset → MCPServerNode
{
  aiType: 'mcp-server',
  aiConfig: {
    serverUrl: preset.serverId,
    discovered: {
      tools: preset.items,
      prompts: [preset]
    }
  }
}
```

## Templates Predefinidos

### 1. Workflow de Auditoría (5 Banderas)

```
[Input] → [Blueflag] → [Blackflag] → [Redflag] → [Yellowflag] → [Orangeflag] → [Report]
```

### 2. Workflow de Scraping

```
[ForoScraper] → [Parse] → [Transform] → [TypedPrompting] → [Output]
```
