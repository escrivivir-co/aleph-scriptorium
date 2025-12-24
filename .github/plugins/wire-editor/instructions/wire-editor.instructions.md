---
name: Wire Editor (Node-RED)
description: Contexto y reglas para diseño de flujos Node-RED en el Scriptorium.
applyTo: "ARCHIVO/DISCO/WIRING/**/*.json, .github/plugins/wire-editor/**/*.md"
---

# Instrucciones: Plugin WireEditor

> **Fuente de verdad**: `ARCHIVO/DISCO/WIRING/` y `node-red-alephscript-sdk/`

## Qué es WireEditor

WireEditor es el plugin de **diseño de flujos de datos** del Scriptorium. Usa la metáfora de Node-RED: nodos conectados por cables que transforman y enrutan información.

---

## Principios de Diseño

### 1. Archivos primero, runtime después

El plugin opera principalmente sobre **archivos JSON**, no sobre instancias de Node-RED en ejecución.

**Ventajas**:
- Diseño offline posible
- Versionado en Git
- Portabilidad entre máquinas
- Sincronización selectiva

### 2. Feeds como puente

La comunicación entre agentes y Node-RED usa **feeds asíncronos**: archivos JSON en `DISCO/WIRING/feeds/`.

```
Node-RED → escribe entrada → feeds/commands.json → agente lee
Agente → escribe respuesta → feeds/responses.json → Node-RED lee
```

### 3. Catálogo + Asesoramiento

Antes de crear flows, el agente debe asesorar sobre qué nodos usar. El catálogo de 13 nodos está documentado y cada nodo tiene casos de uso definidos.

### 4. Plantillas reutilizables

Los flows probados se guardan como plantillas en `templates/`. Nuevos proyectos arrancan desde plantillas, no desde cero.

---

## Estructura de DISCO/WIRING

```
ARCHIVO/DISCO/WIRING/
├── catalog.json              # Índice maestro de artefactos
├── feeds/                    # Comunicación asíncrona
│   ├── README.md
│   └── {nombre}-feed.json
├── projects/                 # Proyectos por caso de uso
│   ├── README.md
│   └── {nombre}/
│       ├── flow.json
│       ├── package.json
│       └── README.md
└── templates/                # Plantillas reutilizables
    ├── flows/
    ├── subflows/
    └── nodes/
```

---

## Schema de catalog.json

```json
{
  "version": "1.0.0",
  "last_updated": "ISO8601",
  "projects": [
    {
      "id": "kick-tarotista",
      "name": "Kick + Tarotista",
      "path": "projects/kick-tarotista/",
      "description": "Filtrar comandos de Kick para Tarotista",
      "nodes_used": ["FlowControlNode", "FormatNode"],
      "feeds": ["kick-commands"]
    }
  ],
  "templates": {
    "flows": [
      {
        "id": "basic-bot-connection",
        "name": "Conexión básica de bot",
        "path": "templates/flows/basic-bot-connection.json",
        "source": "node-red-alephscript-sdk"
      }
    ],
    "subflows": [],
    "nodes": []
  },
  "feeds": [
    {
      "id": "kick-commands",
      "path": "feeds/kick-commands.json",
      "schema": "command-feed",
      "producers": ["kick-tarotista"],
      "consumers": ["Tarotista"]
    }
  ]
}
```

---

## Schema de Feed

```json
{
  "feed_id": "string (único)",
  "version": "1.0.0",
  "schema": "command-feed | response-feed | event-feed",
  "created_at": "ISO8601",
  "entries": [
    {
      "id": "entry-uuid",
      "timestamp": "ISO8601",
      "type": "command | response | event",
      "source": "string (quién escribió)",
      "payload": {},
      "processed": false,
      "processed_by": null,
      "processed_at": null
    }
  ]
}
```

### Protocolo de Lectura

1. Agente lee feed y filtra `processed: false`
2. Procesa cada entrada
3. Marca `processed: true`, `processed_by`, `processed_at`
4. Si hay respuesta, escribe a feed de respuestas

### Protocolo de Escritura (Node-RED)

1. Flow genera mensaje
2. Nodo formatea como entry
3. Escribe a feed JSON (append)
4. No modifica entries existentes

---

## Catálogo de Nodos

### Categorías

| Categoría | Propósito | Nodos |
|-----------|-----------|-------|
| **Bot** | Conexión y eventos de bots | BotClientNode, BotNode |
| **Channel** | Configuración y enrutamiento | ChannelConfigNode, ChannelNode, PlatformContextNode |
| **Format** | Transformación de mensajes | FormatNode, MessageParserNode, ResponseBuilderNode |
| **Orchestration** | Control de flujo y estado | FlowControlNode, StateManagerNode |
| **Dashboard** | Interfaces de usuario | DashboardNode, UIWidgetNode, FormNode |

### Tabla de Decisión

| Si el caso es... | Usar nodos... |
|------------------|---------------|
| Conectar con bot de chat | BotClientNode + BotNode |
| Filtrar mensajes por criterio | FlowControlNode |
| Parsear comandos de chat | MessageParserNode |
| Construir respuesta estructurada | ResponseBuilderNode |
| Mantener estado entre mensajes | StateManagerNode |
| Crear interfaz de configuración | DashboardNode + FormNode |
| Mostrar información | UIWidgetNode |

---

## Integración con Submódulo

### Estructura del submódulo

```
node-red-alephscript-sdk/
├── packages/
│   ├── node-red-contrib-alephscript/   # 13 nodos
│   └── node-red-gamify-ui/             # UI Angular
├── examples/
│   ├── flows/                          # Ejemplos de flows
│   └── flows-as/                       # Flows AlephScript
└── docs/
```

### Sincronización de Plantillas

Las plantillas vienen del submódulo:

```bash
# Copiar ejemplo como plantilla
cp node-red-alephscript-sdk/examples/flows/01-basic-bot-connection.json \
   ARCHIVO/DISCO/WIRING/templates/flows/
```

### Dependencia @alephscript/core

Algunos nodos requieren `@alephscript/core`. Si no está disponible, esos nodos funcionan en modo degradado (sin conexión real a bots).

---

## Casos de Uso Documentados

### UC1: Stream Kick + Tarotista

```
Kick Chat → BotNode → FlowControlNode (filtrar !) 
         → MessageParserNode → Feed JSON → Tarotista
```

**Nodos**: BotClientNode, BotNode, FlowControlNode, MessageParserNode  
**Feed**: `kick-commands.json`

### UC2: Dashboard de Configuración

```
FormNode → StateManagerNode → JSON de config
        ↓
UIWidgetNode ← leer estado
```

**Nodos**: DashboardNode, FormNode, StateManagerNode, UIWidgetNode

### UC3: Orquestación de Eventos

```
Evento externo → ChannelNode → FlowControlNode (rate limit)
              → ResponseBuilderNode → Feed de respuestas
```

**Nodos**: ChannelNode, FlowControlNode, ResponseBuilderNode

---

## Lo que NO hacer

- **No gestionar Node-RED**: El plugin no instala, arranca ni para Node-RED
- **No editar flows en ejecución**: Operar siempre sobre archivos
- **No hardcodear rutas**: Usar paths relativos a WIRING/
- **No mezclar schemas de feed**: Cada feed tiene su schema definido
- **No ignorar catálogo**: Siempre consultar antes de recomendar nodos

---

## Archivos Relacionados

| Artefacto | Ruta |
|-----------|------|
| Plugin manifest | `.github/plugins/wire-editor/manifest.md` |
| Agente principal | `.github/plugins/wire-editor/agents/wire-editor.agent.md` |
| Bridge | `.github/agents/plugin_ox_wireeditor.agent.md` |
| Datos | `ARCHIVO/DISCO/WIRING/` |
| Submódulo | `node-red-alephscript-sdk/` |
| Ejemplos | `node-red-alephscript-sdk/examples/flows/` |
