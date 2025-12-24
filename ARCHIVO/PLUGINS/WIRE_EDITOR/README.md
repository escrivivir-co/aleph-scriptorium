# WireEditor — Plugin de Diseño de Flujos Node-RED

> **Versión**: 1.0.0  
> **Estado**: Activo  
> **Submódulo**: node-red-alephscript-sdk

---

## Descripción

WireEditor permite diseñar flujos de procesamiento de datos usando Node-RED dentro del ecosistema Scriptorium. Opera principalmente sobre archivos JSON, permitiendo diseño offline, versionado en Git y sincronización selectiva con servidores.

---

## Capacidades

| Capacidad | Descripción |
|-----------|-------------|
| **Crear proyecto** | Nuevo proyecto Node-RED en DISCO/WIRING |
| **Importar/Exportar** | Flujos JSON hacia/desde catálogo |
| **Asesoramiento** | Recomendar nodos según caso de uso |
| **Feeds asíncronos** | Comunicación agente ↔ Node-RED |
| **Plantillas** | Reutilizar flows probados |

---

## Casos de Uso

### UC1: Stream Kick + Tarotista
Filtrar comandos de chat de Kick y pasarlos al agente Tarotista.

### UC2: FIA con Red Semántica
Conectar motor de inferencia con servicios externos.

### UC3: Gestión de Configuración
Crear UIs Dashboard para configurar plugins.

### UC4: Analogía Blockly
Puente conceptual entre lógica de personajes y flujos de datos.

---

## Catálogo de Nodos

El submódulo proporciona 13 nodos en 5 categorías:

| Categoría | Nodos |
|-----------|-------|
| **Bot** | BotClientNode, BotNode |
| **Channel** | ChannelConfigNode, ChannelNode, PlatformContextNode |
| **Format** | FormatNode, MessageParserNode, ResponseBuilderNode |
| **Orchestration** | FlowControlNode, StateManagerNode |
| **Dashboard** | DashboardNode, UIWidgetNode, FormNode |

---

## Estructura de Datos

```
ARCHIVO/DISCO/WIRING/
├── catalog.json           # Índice maestro
├── feeds/                 # Comunicación asíncrona
│   └── {nombre}.json
├── projects/              # Proyectos por caso
│   └── {nombre}/
│       ├── flow.json
│       └── README.md
└── templates/             # Plantillas reutilizables
    ├── flows/
    ├── subflows/
    └── nodes/
```

---

## Invocación

```
@aleph → [WIRE-EDITOR] Crear proyecto Node-RED
@aleph → [WIRE-EDITOR] Asesorar sobre nodos
@aleph → [WIRE-EDITOR] Configurar feed asíncrono
```

O directamente:

```
@wireeditor crear proyecto para comandos de Kick
@wireeditor qué nodos uso para un dashboard de configuración
```

---

## Requisitos Externos

- **Node-RED >=3.0.0**: Para ejecutar flows
- El plugin funciona offline para diseño

---

## Integración

| Plugin | Relación |
|--------|----------|
| Teatro | Personajes pueden consumir feeds |
| Agent Creator | Agentes creados usan feeds |
| Kick-Aleph-Bot | Conexión con Kick |
| Blockly Editor | Analogía conceptual |

---

## Archivos del Plugin

```
.github/plugins/wire-editor/
├── manifest.md
├── agents/
│   └── wire-editor.agent.md
├── prompts/
│   ├── crear-proyecto.prompt.md
│   ├── importar-flow.prompt.md
│   ├── exportar-flow.prompt.md
│   ├── asesorar-nodos.prompt.md
│   └── conectar-feed.prompt.md
└── instructions/
    └── wire-editor.instructions.md
```

---

## Submódulo

- **Repositorio**: [node-red-alephscript-sdk](https://github.com/escrivivir-co/node-red-alephscript-sdk)
- **Rama**: `integration/beta/scriptorium`
- **Paquetes**:
  - `node-red-contrib-alephscript` (13 nodos TypeScript)
  - `node-red-gamify-ui` (Angular 17+ UI)
