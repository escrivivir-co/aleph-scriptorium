---
id: wire-editor
name: "WireEditor (Node-RED SDK)"
version: "1.0.0"
description: "Plugin para diseñar flujos de datos con Node-RED. Gestiona proyectos, plantillas y feeds asíncronos entre Scriptorium y servidores Node-RED."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies: ["teatro", "agent-creator"]

# Submódulo fuente
submodule: "node-red-alephscript-sdk"
submodule_packages:
  - name: "node-red-contrib-alephscript"
    description: "13 nodos custom para bots, canales, orquestación y dashboard"
  - name: "node-red-gamify-ui"
    description: "UI Angular 17+ con patrón GamificationUI"

# Recursos exportados
agents:
  - name: "WireEditor"
    file: "agents/wire-editor.agent.md"
    description: "Agente principal del plugin. Asesora, importa, exporta y sincroniza artefactos Node-RED."

prompts:
  - name: "crear-proyecto"
    file: "prompts/crear-proyecto.prompt.md"
    description: "Crear nuevo proyecto Node-RED en DISCO/WIRING"
  - name: "importar-flow"
    file: "prompts/importar-flow.prompt.md"
    description: "Importar flow JSON a WIRING"
  - name: "exportar-flow"
    file: "prompts/exportar-flow.prompt.md"
    description: "Exportar flow desde WIRING a archivo"
  - name: "asesorar-nodos"
    file: "prompts/asesorar-nodos.prompt.md"
    description: "Recomendar nodos según caso de uso"
  - name: "conectar-feed"
    file: "prompts/conectar-feed.prompt.md"
    description: "Configurar comunicación asíncrona vía feeds JSON"

instructions:
  - name: "wire-editor"
    file: "instructions/wire-editor.instructions.md"

# Datos de runtime
data_directory: "ARCHIVO/DISCO/WIRING/"
data_structure:
  - "feeds/": "Archivos JSON para comunicación asíncrona"
  - "projects/": "Proyectos Node-RED por caso de uso"
  - "templates/": "Plantillas de flows, subflows y nodos"
  - "catalog.json": "Índice de artefactos disponibles"

# Integración con Aleph
handoffs:
  - label: "Crear proyecto Node-RED"
    agent: "WireEditor"
    prompt: "Crea un nuevo proyecto en DISCO/WIRING/ con estructura base y flows iniciales."
  - label: "Importar flow"
    agent: "WireEditor"
    prompt: "Importa un flow JSON al catálogo de WIRING."
  - label: "Exportar flow"
    agent: "WireEditor"
    prompt: "Exporta un flow desde WIRING a archivo listo para Node-RED."
  - label: "Asesorar sobre nodos"
    agent: "WireEditor"
    prompt: "Asesora qué nodos usar según el caso de uso descrito."
  - label: "Configurar feed asíncrono"
    agent: "WireEditor"
    prompt: "Configura comunicación asíncrona entre agente y Node-RED via feeds JSON."

# Requisitos externos
external_requirements:
  - name: "Node-RED"
    version: ">=3.0.0"
    install: "npm install -g node-red"
    optional: false
    note: "Requerido para ejecutar flows. Plugin funciona offline para diseño."
  - name: "@alephscript/core"
    version: "1.0.0"
    install: "Incluido en submódulo como tgz local"
    optional: true
    note: "Requerido solo para nodos de bot"
---

# WireEditor — Plugin Node-RED para Scriptorium

## Visión

WireEditor es el **plugin de cableado visual** del Scriptorium. Permite diseñar flujos de procesamiento de datos usando la metáfora de Node-RED: nodos conectados por cables que transforman y enrutan información.

## Filosofía

> "Si Blockly es para lógica de personajes, WireEditor es para plomería de datos."

El plugin opera principalmente sobre **archivos**, no sobre instancias de Node-RED en ejecución. Esto permite:
- Diseñar flows offline
- Versionar en Git
- Compartir plantillas entre proyectos
- Sincronizar con servidores cuando estén disponibles

## Casos de Uso Principales

### UC1: Stream Kick + Tarotista
Filtrar comandos de chat de Kick y pasarlos al agente Tarotista vía feed asíncrono.

### UC2: FIA con Red Semántica
Conectar el motor de inferencia (as-gym) con servicios externos usando flows de orquestación.

### UC3: Gestión de Configuración
Crear pequeñas UIs Dashboard para configurar plugins y submodules del Scriptorium.

### UC4: Analogía Blockly ↔ Node-RED
Establecer puente conceptual entre lógica de personajes (Blockly) y flujos de datos (Node-RED).

## Submódulo Fuente

- **Repositorio**: `node-red-alephscript-sdk`
- **Paquetes**:
  - `node-red-contrib-alephscript`: 13 nodos TypeScript
  - `node-red-gamify-ui`: UI Angular para gamificación
- **Stack**: TypeScript, Node.js 18+, Socket.IO 4.7.2, Angular 17+

## Estructura de Datos

```
ARCHIVO/DISCO/WIRING/
├── catalog.json           # Índice de artefactos
├── feeds/                 # Comunicación asíncrona
│   ├── kick-commands.json
│   └── agent-responses.json
├── projects/              # Proyectos por caso de uso
│   └── kick-tarotista/
└── templates/             # Plantillas reutilizables
    ├── flows/
    ├── subflows/
    └── nodes/
```

## Nodos Disponibles (13)

| Categoría | Nodos | Descripción |
|-----------|-------|-------------|
| **Bot** | BotClientNode, BotNode | Conexión y eventos de bots |
| **Channel** | ChannelConfigNode, ChannelNode, PlatformContextNode | Configuración de canales |
| **Format** | FormatNode, MessageParserNode, ResponseBuilderNode | Transformación de mensajes |
| **Orchestration** | FlowControlNode, StateManagerNode | Control de flujo y estado |
| **Dashboard** | DashboardNode, UIWidgetNode, FormNode | Interfaces de usuario |

## Protocolo de Feeds

Los feeds son archivos JSON en `DISCO/WIRING/feeds/` que permiten comunicación asíncrona:

```json
{
  "feed_id": "kick-commands",
  "version": "1.0.0",
  "entries": [
    {
      "id": "entry-001",
      "timestamp": "2025-01-15T10:30:00Z",
      "type": "command",
      "payload": { "user": "tarot_user", "command": "!tirada" },
      "processed": false
    }
  ]
}
```

Los agentes leen feeds y marcan entradas como procesadas. Los flows de Node-RED escriben nuevas entradas.

## Dependencias

| Plugin | Relación |
|--------|----------|
| Teatro | Personajes pueden usar flows para lógica de escenas |
| Agent Creator | Agentes creados pueden consumir/producir feeds |
| Blockly Editor | Analogía conceptual; futuro translator |
| Kick-Aleph-Bot | Submódulo para conexión con Kick |

## Limitaciones MVP

- No gestiona ciclo de vida de Node-RED (instalar, arrancar, parar)
- No sincroniza en tiempo real (operación por lotes sobre archivos)
- Requiere que usuario tenga Node-RED instalado para ejecutar flows
