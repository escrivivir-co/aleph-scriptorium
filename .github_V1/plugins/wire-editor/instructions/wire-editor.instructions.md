---
name: Wire Editor (Node-RED)
description: Contexto y reglas para diseño de flujos Node-RED en el Scriptorium.
applyTo: "ARCHIVO/DISCO/WIRING/**/*.json, .github/plugins/wire-editor/**/*.md"
---

# Instrucciones: Plugin WireEditor

> **Fuente de verdad**: `ARCHIVO/DISCO/WIRING/` y `WiringEditor/`
> **Submódulo**: `WiringEditor` (node-red-alephscript-sdk)

## Qué es WireEditor

WireEditor es el plugin de **diseño de flujos de datos** del Scriptorium. Usa la metáfora de Node-RED: nodos conectados por cables que transforman y enrutan información.

---

## Fases de Trabajo del Agente

El agente @wire-editor guía al usuario a través de 4 fases:

### Fase 1: Setup (Instalación)

| Handoff | Comando | Descripción |
|---------|---------|-------------|
| `@wire-editor verificar setup` | — | Verifica Node-RED instalado |
| `@wire-editor instalar node-red` | `npm i -g node-red` | Instala Node-RED globalmente |
| `@wire-editor setup completo` | `scripts/setup-node-red.sh` | Setup automático multiplataforma |

**Scripts disponibles**:
```bash
# Unix/macOS
./scripts/setup-node-red.sh

# Windows
scripts\setup-node-red.cmd

# Opciones
--skip-global    # No instalar Node-RED (ya instalado)
--contrib-only   # Solo contribs, no dashboard
```

### Fase 2: Configuración (Contribs)

| Handoff | Descripción |
|---------|-------------|
| `@wire-editor instalar dashboard` | Instala node-red-dashboard |
| `@wire-editor instalar alephscript` | Instala packs AlephScript (base + Escribiente) |
| `@wire-editor verificar nodos` | Lista nodos instalados |

**Contribs del Scriptorium**:

| Paquete | Nodos | Ruta |
|---------|-------|------|
| node-red-contrib-alephscript | 13 | `WiringEditor/packages/node-red-contrib-alephscript` |
| node-red-contrib-alephscript-escribiente | 7 | `WiringEditor/packages/node-red-contrib-alephscript-escribiente` |
| node-red-contrib-wiki-racer | 1 | `WiringAppHypergraphEditor/node-red-contrib-wikir-racer` |
| node-red-dashboard | ~30 | npm registry |

### Fase 3: Edición (Diseño de Flows)

| Handoff | Descripción |
|---------|-------------|
| `@wire-editor crear flow {nombre}` | Nuevo proyecto en DISCO/WIRING/ |
| `@wire-editor importar flow` | Importa JSON a proyecto |
| `@wire-editor exportar flow` | Exporta a archivo |
| `@wire-editor asesorar nodos` | Recomienda nodos según caso |

### Fase 4: Ejecución (Runtime)

| Handoff | Task VS Code | Puerto |
|---------|--------------|--------|
| `@wire-editor arrancar editor` | NRE: Start [Editor] | 1880 |
| `@wire-editor arrancar dashboard` | — (requiere flow) | 1880/ui |
| `@wire-editor arrancar gamify` | NRE: Start [GamifyUI] | 3088 |
| `@wire-editor abrir editor` | NRE: Open [Editor] | — |
| `@wire-editor health check` | NRE: Health Check | — |

---

## Arquitectura de Puertos

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Node-RED Editor | 1880 | Editor visual de flows |
| Node-RED Dashboard | 1880/ui | UI runtime generada |
| GamifyUI (Angular) | 3088 | UI alternativa (WiringEditor) |

---

## Tasks de VS Code

```
NRE: Node-RED Editor
├── NRE: Start [Editor]      → node-red (puerto 1880)
├── NRE: Start [GamifyUI]    → npm run dev:ui (puerto 3088)
├── NRE: Setup [Contribs]    → scripts/setup-node-red.sh
├── NRE: Open [Editor]       → Abre http://localhost:1880
├── NRE: Open [Dashboard]    → Abre http://localhost:1880/ui
├── NRE: Open [GamifyUI]     → Abre http://localhost:3088
└── NRE: Health Check        → Verifica servicios activos
```

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

- **No ignorar setup**: Verificar prerequisitos antes de editar flows
- **No editar flows en ejecución**: Operar siempre sobre archivos
- **No hardcodear rutas**: Usar paths relativos a WIRING/
- **No mezclar schemas de feed**: Cada feed tiene su schema definido
- **No ignorar catálogo**: Siempre consultar antes de recomendar nodos

---

## Nodos AlephScript (21 total)

### De WiringEditor (13 nodos)

| Nodo | Categoría | Descripción |
|------|-----------|-------------|
| alephscript-bot | Bot | Conecta con servidor AlephScript |
| alephscript-enhanced-bot | Bot | Bot con capacidades extendidas |
| alephscript-app-channel | Channel | Canal de aplicación |
| alephscript-sys-channel | Channel | Canal de sistema |
| alephscript-ui-channel | Channel | Canal de UI |
| alephscript-orchestrator | Control | Orquestador de flujos |
| alephscript-app-format | Format | Formateador de app |
| alephscript-sys-format | Format | Formateador de sistema |
| alephscript-ui-format | Format | Formateador de UI |
| alephscript-config | Config | Configuración global |
| alephscript-bot-registry | Dashboard | Registro de bots |
| alephscript-room-tester | Dashboard | Tester de rooms |
| alephscript-stream-monitor | Dashboard | Monitor de streams |

### Pack Escribiente (7 nodos)

| Nodo | Categoría | Descripción |
|------|-----------|-------------|
| alephscript-escribiente-config | Config | Defaults de paths, modelo, device y colas |
| alephscript-escribiente-precheck | Processing | Valida GPU, ffmpeg y recomendaciones de chunk/model |
| alephscript-escribiente-session | Processing | Abre/cierra sesiones con `manifest.json` |
| alephscript-escribiente-chunker | Processing | Trocea MP3 o encola chunks de micrófono |
| alephscript-escribiente-transcriber | Processing | Watcher de `OUTBOX/` que materializa `text/*.json|txt` |
| alephscript-escribiente-session-closer | Processing | Genera `full.txt`, `informe.md` y `export.zip` |
| alephscript-escribiente-dashboard-recorder | Dashboard | Widget con mic, upload mp3, cronómetro y estado por tramo |

### De WiringApp (1 nodo)

| Nodo | Categoría | Descripción |
|------|-----------|-------------|
| game | Game | Motor de partidas wiki-racer |

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
