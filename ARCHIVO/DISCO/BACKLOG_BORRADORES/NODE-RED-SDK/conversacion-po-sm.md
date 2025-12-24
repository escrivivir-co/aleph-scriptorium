# Conversación PO-SM: Node-RED AlephScript SDK

**Fecha**: 2025-12-24  
**Submódulo**: `node-red-alephscript-sdk`  
**Plugin objetivo**: `wire-editor` v1.0.0  
**Épica**: SCRIPT-1.13.0

---

## Análisis Técnico (SM)

### Inventario del submódulo

| Componente | Descripción |
|------------|-------------|
| **Monorepo** | npm workspaces con 2 paquetes |
| **node-red-contrib-alephscript** | 13 nodos TypeScript para Node-RED |
| **node-red-gamify-ui** | Angular 17+ con GamificationUI pattern |
| **Flows de ejemplo** | 7 flows en `examples/flows/` + 3 en `flows-as/` |
| **Protocolo** | Socket.IO con 3 canales (app/sys/ui) + runtime |
| **Dependencia externa** | `@alephscript/core` (tgz local) |

### Categorías de nodos disponibles

| Categoría | Nodos | Función |
|-----------|-------|---------|
| **Bot** | 2 | Conexión Socket.IO, CLIENT_REGISTER |
| **Channel** | 3 | app-channel, sys-channel, ui-channel |
| **Format** | 3 | Formateo de mensajes por canal |
| **Orchestration** | 2 | Coordinación, configuración |
| **Dashboard** | 3 | Widgets para Dashboard 2.0 |

### Gaps identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| **G1** | Gestión del ciclo de vida Node-RED (arrancar, parar, detectar) | Could | 3 |
| **G2** | Sincronización de proyectos Node-RED con DISCO/WIRING | Must | 1 |
| **G3** | Definición de nodos custom desde Scriptorium (generador) | Should | 2 |
| **G4** | Conexión actores Teatro ↔ bots Node-RED | Should | 1 |
| **G5** | Integración con Blockly Editor (traductor) | Could | 3 |
| **G6** | Generación de Dashboard UI desde plugin | Should | 2 |
| **G7** | Dependencia @alephscript/core no incluida | Should | 1 |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Node-RED no instalado | Alta | Alto | Documentar requisitos, detector |
| Ciclo de vida externo | Alta | Medio | Plugin opera sobre archivos, no runtime |
| @alephscript/core faltante | Media | Alto | Documentar dependencia, modo offline |
| Conflictos de puerto | Media | Medio | Configuración de puertos en plugin |
| Complejidad Socket.IO | Baja | Medio | Ejemplos y asesoramiento |

---

## Visión de Producto (PO)

### Nombre del plugin

**WireEditor** — Editor de cableado visual para crear lógicas de flujo y pequeñas UIs.

### Propuesta de valor

> "Scriptorium necesita un puente con Node-RED para que usuarios y agentes puedan diseñar flujos de datos, lógicas de procesamiento y pequeñas interfaces Dashboard sin salir del ecosistema."

### Casos de uso objetivo

#### UC1: Stream Kick + Tarotista (Must, Sprint 1)

**Actor**: Streamer que usa kick-aleph-bot  
**Trigger**: "Quiero que los comandos del chat lleguen al Tarotista"  
**Flujo**:
1. Abre Node-RED con flow `basic-kick-bot-commands`
2. Configura filtro para comandos específicos
3. Conecta salida a archivo JSON en DISCO/WIRING/feeds/
4. Tarotista lee feed asíncrono
5. Respuestas se publican en stream

**Entregable**: Flow plantilla + documentación de conexión.

#### UC2: FIA con Red Semántica (Should, Sprint 2)

**Actor**: Diseñador de personaje del Teatro  
**Trigger**: "Mi personaje necesita inferir sobre una red semántica"  
**Flujo**:
1. Usa as-gym para definir red semántica (FIA/paradigmas/logica)
2. Plugin WireEditor asesora creación de nodos custom
3. Node-RED recibe peticiones de inferencia
4. Resultados alimentan respuestas del bot

**Entregable**: Nodo plantilla para redes semánticas + guía de integración.

#### UC3: Gestión de Configuración (Should, Sprint 2)

**Actor**: Equipo de desarrollo del Scriptorium  
**Trigger**: "Queremos un panel para activar/desactivar features"  
**Flujo**:
1. Diseña ontología de configuraciones como nodos
2. Crea flows con formularios Dashboard 2.0
3. Usuario interactúa con UI
4. Cambios se sincronizan con archivos de config

**Entregable**: Subflows para configuración + plantillas Dashboard.

#### UC4: Analogía con Blockly (Could, Sprint 3)

**Actor**: Usuario de Blockly Editor  
**Trigger**: "Quiero lo mismo que hago en Blockly pero con Node-RED"  
**Flujo**:
1. Diseña lógica en Blockly (si ya sabe)
2. Opción de exportar a estructura Node-RED
3. (Investigar) Traductor JS → Flow JSON

**Entregable**: Investigación de viabilidad + prototipo si viable.

### Criterios de éxito

- [ ] Usuario puede importar/exportar flows entre Node-RED y DISCO/WIRING
- [ ] Plugin asesora qué nodos usar para cada caso
- [ ] Estructura de proyectos en DISCO permite colaboración con ARCHIVO
- [ ] Al menos 3 plantillas de flows para casos comunes
- [ ] Documentación clara para usuarios sin experiencia en Node-RED

---

## Decisiones Arquitectónicas

### D1: Operación sobre archivos, no sobre runtime

**Decisión**: El plugin WireEditor opera sobre archivos JSON (flows, nodes) y carpetas de proyecto. No gestiona el ciclo de vida de Node-RED.

**Rationale**:
- Node-RED puede estar en Docker, local, o remoto
- Evita complejidad de gestión de procesos
- Permite modo offline (diseño sin Node-RED corriendo)
- Reduce superficie de errores

**Sacrificio**: Usuario debe arrancar/parar Node-RED manualmente.

### D2: Estructura DISCO/WIRING espejo de proyectos Node-RED

**Decisión**: Crear carpeta `ARCHIVO/DISCO/WIRING/` que refleja la estructura de proyectos Node-RED.

**Estructura**:
```
DISCO/WIRING/
├── catalog.json           # Índice de proyectos
├── feeds/                  # Feeds JSON asíncronos
├── projects/               # Proyectos (espejo de .node-red/projects)
│   └── {nombre}/
│       ├── flows.json
│       ├── package.json
│       └── nodes/
└── templates/              # Plantillas reutilizables
    ├── flows/
    ├── subflows/
    └── nodes/
```

**Rationale**:
- Permite versionado con Git
- Integración natural con ARCHIVO
- Posibilidad de diff entre versiones
- Colaboración entre usuarios

### D3: Tres tipos de artefactos: flows, subflows, nodes

**Decisión**: El plugin gestiona tres tipos de artefactos:

| Tipo | Formato | Uso |
|------|---------|-----|
| **Flow** | JSON (flow.json) | Flujo completo de trabajo |
| **Subflow** | JSON (subflow.json) | Componente reutilizable |
| **Node** | TS + HTML | Nodo custom (contrib) |

**Rationale**:
- Flows son lo más común (90% de casos)
- Subflows permiten modularidad sin código
- Nodes custom solo cuando hay lógica compleja

### D4: Agente asesor antes que generador

**Decisión**: En Sprint 1, el agente WireEditor **asesora** al usuario sobre qué nodos usar. En Sprint 2, añade capacidad de **generar** artefactos.

**Rationale**:
- Asesoramiento es más valioso a corto plazo
- Generación requiere entender mejor los patrones
- Evita generar código de baja calidad

### D5: Feeds asíncronos como patrón de comunicación

**Decisión**: La comunicación entre Scriptorium y Node-RED se hace mediante archivos JSON en `DISCO/WIRING/feeds/`.

**Protocolo**:
1. Node-RED escribe en `feeds/{nombre}.json`
2. Scriptorium (agente) lee periódicamente o por trigger
3. Scriptorium escribe respuesta en `feeds/{nombre}-response.json`
4. Node-RED lee respuesta

**Rationale**:
- Simple de implementar
- No requiere Socket.IO activo
- Permite debug fácil (archivos visibles)
- Compatible con modo offline

---

## Preguntas Resueltas

### ¿Es demasiado fantasioso?

**SM**: No, pero hay capas de complejidad. El MVP debe ser:
1. Estructura de carpetas en DISCO/WIRING (Sprint 1)
2. Plantillas de flows para casos comunes (Sprint 1)
3. Agente asesor que guíe al usuario (Sprint 1)
4. Sincronización básica import/export (Sprint 1)

Los casos más avanzados (FIA, Dashboard, Blockly) son Sprint 2-3.

### ¿Qué hay del @alephscript/core faltante?

**SM**: Es una dependencia local (tgz). Opciones:
1. **Modo offline**: El plugin funciona sin esta dependencia
2. **Documentar**: Indicar cómo obtener el paquete si se necesita
3. **Incluir**: Añadir el tgz al repositorio (menos recomendado)

**Decisión**: Modo offline para MVP. Documentar para usuarios avanzados.

### ¿Cómo se conecta el Tarotista con Node-RED?

**SM**: Mediante feeds asíncronos (D5):
1. Node-RED filtra comandos y escribe en `feeds/kick-commands.json`
2. Tarotista (o agente que lo invoca) lee el feed
3. Procesa y responde
4. Respuesta se escribe en `feeds/kick-responses.json`
5. Node-RED lee y publica en stream

---

## Próximos Pasos

- [x] Generar backlog borrador (Fase 5)
- [ ] Aprobar con `@scrum aprobar` (opcional, modo autónomo)
- [ ] Crear plugin wire-editor (Fase 6)
- [ ] Integrar sistema (Fase 7)
- [ ] Commits separados (Fase 8)

---

## Métricas Estimadas

| Métrica | Valor |
|---------|-------|
| Stories | 10 |
| Tasks | ~50 |
| Effort | ~35 pts |
| Sprints | 3 (MVP en Sprint 1) |
