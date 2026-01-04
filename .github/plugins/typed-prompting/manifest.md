---
id: typed-prompting
name: "Editor de Ontologías y Validación (TypedPrompting)"
version: "1.0.0"
description: "Plugin transversal para edición de ontologías, validación de conversaciones NL↔JSON y contratos de comunicación entre agentes."
author: "Aleph Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies:
  - agent-creator
  - arg-board
  - mcp-presets

# Recursos exportados
agents:
  - name: "TypedPrompting"
    file: "agents/typed-prompting.agent.md"
    description: "Agente principal para diseño de ontologías y validación de mensajes"

prompts:
  - name: "estudiar-caso-uso"
    file: "prompts/estudiar-caso-uso.prompt.md"
    description: "Analizar caso de uso y sugerir ontología"
  - name: "sugerir-ontologia"
    file: "prompts/sugerir-ontologia.prompt.md"
    description: "Buscar y sugerir ontologías existentes"
  - name: "instalar-en-agente"
    file: "prompts/instalar-en-agente.prompt.md"
    description: "Instalar schema de validación en un agente"
  - name: "instalar-en-flujo-arg"
    file: "prompts/instalar-en-flujo-arg.prompt.md"
    description: "Instalar protocolo de comunicación en obra ARG"

instructions:
  - name: "typed-prompting"
    file: "instructions/typed-prompting.instructions.md"
    description: "Contexto y reglas para gestión de ontologías"

# Integración con Aleph
handoffs:
  - label: "Diseñar ontología (Asistente)"
    agent: "TypedPrompting"
    prompt: "Modo Asistente: analiza caso de uso y diseña ontología de comunicación."
  - label: "Sugerir ontología existente"
    agent: "TypedPrompting"
    prompt: "Busca en bibliotecas existentes y sugiere ontologías relevantes."
  - label: "Instalar reglas en agente (Gestor)"
    agent: "TypedPrompting"
    prompt: "Modo Gestor: instala schema de validación en un agente del Scriptorium."
  - label: "Instalar protocolo en flujo ARG"
    agent: "TypedPrompting"
    prompt: "Modo Gestor: define contratos de comunicación para una obra ARG."
  - label: "Validar mensaje contra schema"
    agent: "TypedPrompting"
    prompt: "Valida un mensaje JSON contra un schema definido."
  - label: "Abrir editor web"
    agent: "TypedPrompting"
    prompt: "Abre el editor visual de ontologías en el navegador (localhost:3019)."

# Servidores MCP que el plugin aporta
mcpServers:
  - id: "typed-prompt-mcp-server"
    port: 3020
    source: "MCPGallery/mcp-mesh-sdk"
    startCommand: "npm run start:typed-prompt"
    description: "TypedPrompt MCP Server - schema validation and ontology management"
---

# Plugin: TypedPrompting

## Descripción

**TypedPrompting** es un editor de ontologías y sistema de validación de conversaciones que permite:

- **Diseñar schemas** TypeScript que se convierten a JSON Schema
- **Validar mensajes** de LLM contra schemas definidos
- **Crear bibliotecas** de contratos de comunicación
- **Instalar reglas** en agentes y flujos ARG

## Modos de Operación

### Modo Asistente

Guía interactiva para usuarios que necesitan diseñar ontologías:

1. **Estudiar caso de uso**: Describe tu necesidad y el agente analiza requisitos
2. **Sugerir ontología**: Busca en bibliotecas existentes y propone opciones
3. **Crear schema visual**: Abre el editor web para diseño interactivo

### Modo Gestor

Instalación de reglas en el sistema:

1. **Instalar en agente**: Añade `validationSchema` a la receta del agente
2. **Instalar en flujo ARG**: Define `communicationProtocol` en la obra
3. **Exportar biblioteca**: Genera paquete de schemas reutilizables

## Arquitectura

```
ARCHIVO/PLUGINS/TYPED_PROMPTING/
├── schemas/                    # Schemas guardados
│   ├── examples/              # Ejemplos predefinidos
│   └── custom/                # Schemas del usuario
├── libraries/                  # Bibliotecas de schemas
└── validation-logs/           # Historial de validaciones
```

## Submódulo

El plugin usa el submódulo `alephscript-typed-prompting` que proporciona:

- **Servidor web** en puerto 5000 (desarrollo)
- **API REST** documentada con Swagger
- **Editor visual** con Monaco Editor
- **Soporte multi-IA**: OpenAI, DeepSeek, Ollama, Anthropic

### Iniciar servidor

```bash
cd alephscript-typed-prompting
npm install
npm run dev
# Abrir http://localhost:5000
```

## Integración con otros plugins

### AGENT_CREATOR

```json
{
  "validationSchema": {
    "input": ["schema-id-1"],
    "output": ["schema-id-2"],
    "mode": "strict"
  }
}
```

### ARG_BOARD

```json
{
  "communicationProtocol": {
    "contracts": {
      "personaje1→personaje2": "schema-dialogo"
    },
    "enforcement": "warn"
  }
}
```

## Referencias

- Submódulo: `alephscript-typed-prompting/`
- Datos: `ARCHIVO/PLUGINS/TYPED_PROMPTING/`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/TYPED_PROMPTING/`
