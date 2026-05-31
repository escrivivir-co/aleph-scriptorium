# Future Pipeline Engine - Índice de Referencias

Este índice recopila y describe los principales componentes del **Scriptorium** involucrados en el caso de uso del *Future Pipeline Engine*, detallando su rol, capacidades y ruta en el sistema.

---

## 1. Componentes de Transmisión e Interfaz

### StreamDesktop (`kick-aleph-bot`)
- **Ruta:** `ALEPH/StreamDesktop`
- **Referencia:** [README-SCRIPTORIUM.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/StreamDesktop/README-SCRIPTORIUM.md)
- **Rol en el Ecosistema:** Bot de Node.js/TypeScript que actúa como un *gateway* bidireccional mediante WebSockets entre plataformas de streaming (Kick.com) y Scriptorium. 
- **Mapeo Ontológico:** Emplea canales RxJS que se asocian con agentes (App → `@plugin_ox_kickstream`, Sys → `@redflag`, UI → `@orangeflag`).

### StreamDesktopAppCronos (`kick-aleph-crono-bot`)
- **Ruta:** `ALEPH/StreamDesktopAppCronos`
- **Referencia:** [README-SCRIPTORIUM.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/StreamDesktopAppCronos/README-SCRIPTORIUM.md)
- **Rol en el Ecosistema:** Overlay visual HTML/JS para OBS. Proporciona efectos visuales (animación *Matrix*) y un contador regresivo. 
- **Caso de uso a futuro:** Podrá controlarse mediante llamadas a una API local o mediante eventos procedentes del chat parseados por `kick-aleph-bot`.

---

## 2. Orquestación y Flujos de Datos

### WiringEditor (`node-red-alephscript-sdk`)
- **Ruta:** `ALEPH/WiringEditor`
- **Referencia:** [README-SCRIPTORIUM.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/WiringEditor/README-SCRIPTORIUM.md)
- **Rol en el Ecosistema:** Entorno de nodos basado en Node-RED que permite la estructuración de flujos (wiring) para la coordinación de canales (app, sys, ui) y orquestación multi-agente (`@teatro`, `@tarotista`). 
- **Capacidades:** Permite conectar la ingesta asíncrona de transcripciones o eventos de chat (feed JSON) y pasarlos por reglas analíticas hacia agentes de inferencia semántica (FIA).

---

## 3. Servidores Públicos y Catálogos

### 3.1 OASIS_PUB Site Scriptorium
- **Ruta:** `ALEPH/BlockchainComPort/OASIS_PUB/site/scriptorium`
- **Referencia:** [README.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/BlockchainComPort/OASIS_PUB/site/scriptorium/README.md)
- **Rol en el Ecosistema:** Catálogo estático del Scriptorium (accesible vía `pub.escrivivir.co/scriptorium/`). Lee el archivo `catalog.json` para listar todas las herramientas públicas disponibles y agentes con prefijos SKU (`PLG-CORE`, `SDK-UI`, etc.).

### 3.2 Zeus MCP Web Interface (`mcp-presets-site`)
- **Ruta:** `ALEPH/MCPGallery/zeus`
- **Rol en el Ecosistema:** Interfaz web que lee las *capabilities* y herramientas de los servidores de `MCPGallery` (como `mcp-model-sdk` y `mcp-mesh-sdk`). Permite agrupar estas capacidades en *packs* o `PRESETS`. Cuando un cliente (ej. el Streamer o un agente) pide sus capacidades, recibe uno de estos *packs* generados por Zeus (por ejemplo, un preset de *Launcher* con tools reales como `launch_mcp_server` y `launch-session` para orquestar la infraestructura).
---

## 4. Habilidades del Motor (DocumentMachineSDK Skills)

Las *Skills* son definiciones portables y agnósticas encargadas de resolver piezas especializadas del pipeline:

### 4.1 media-extraction
- **Ruta:** `ALEPH/DocumentMachineSDK/.github/skills/media-extraction/SKILL.md`
- **Referencia:** [SKILL.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/.github/skills/media-extraction/SKILL.md)
- **Rol en el Ecosistema:** Extrae recortes de video o audio de streams remotos (Twitch VODs, YouTube o HLS) usando herramientas como `yt-dlp` o `streamlink` y los transcribe de manera local utilizando `faster-whisper`. El texto extraído conforma un soporte textual versionable y catalogado en la base del *Lore*.

### 4.2 engine-plan
- **Ruta:** `ALEPH/DocumentMachineSDK/.github/skills/engine-plan/SKILL.md`
- **Referencia:** [SKILL.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/.github/skills/engine-plan/SKILL.md)
- **Rol en el Ecosistema:** Protocolo encargado de la inspección, simulación y diagnóstico del pipeline "End-to-End".
- **Conceptos Clave:** Define una arquitectura canónica de *6 capas de datos* (lore-db, análisis, corpus, grafo de bifurcación, universos, obras) más 2 transversales (`@Pipeline`, `@Portal`). Esta herramienta puede identificar *huecos de especificación* en el sistema.

### 4.3 futures-engine
- **Ruta:** `ALEPH/DocumentMachineSDK/.github/skills/futures-engine/SKILL.md`
- **Referencia:** [SKILL.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/.github/skills/futures-engine/SKILL.md)
- **Rol en el Ecosistema:** Toma el texto documentado del *Corpus* como entrada y genera "ficciones plausibles". Es la habilidad del **Dramaturgo**. En lugar de predecir o extraer eventos pasados, detecta **nodos de bifurcación** y construye 2 a 5 escenarios paralelos basados en variables de estado y la asimetría del contexto. 
- **Flujo:** Las transcripciones ingresadas (provistas por `media-extraction` y preparadas por `WiringEditor`) serán alimentadas a este motor para ramificar escenarios de las posibles derivaciones del stream en progreso.

---

## 5. Servidores de Capa, Federación y SDKs (VPS)

### 5.1 ScriptoriumVps (Pub.Rooms & Node-RED Mesh)
- **Ruta:** `ALEPH/ScriptoriumVps` y `ALEPH/BlockchainComPort/OASIS_PUB/site/scriptorium/index.html`
- **Rol en el Ecosistema:** Servidor de replicación y vestíbulo para las salas *layer2*. Aloja la instancia de Node-RED (`scriptorium-rooms`) que expone el endpoint WSS `rooms.scriptorium.escrivivir.co/runtime`.
- **Credenciales y Acceso:** La "PEER CARD" de la interfaz pública provee el token `PUBLIC_ROOM` (`q5S6IaYodYVDmhLZeH9RLTGUpcNqlC9c66e9Lylo`) para que clientes externos realicen el *bootstrap* y se federen sin necesidad de abrir puertos locales.

### 5.2 BotHubSDK (TypeScript Server)
- **Ruta:** `ALEPH/BotHubSDK`
- **Referencia (Ejemplo Broadcast):** [broadcast-2026-05-09T23-28-42-391Z.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-05-09T23-28-42-391Z.md)
- **Rol en el Ecosistema:** Actúa como el servidor TypeScript que se enlaza como *peer* a la red federada de Node-RED. Además, orquesta la cadena de conexión IACM estructurada en tres pasos (`bot-rabbit -> bot-spider -> bot-horse`):
  - **a) `bot-rabbit`**: Punto de origen e ingesta local de eventos en la cadena.
  - **b) `bot-spider`**: Nodo de agregación al que se conectan los agentes de la red RETRO. Mediante un *handshake* válido, estos peers pueden unirse a `Pub.Rooms` para habilitar comunicación bidireccional (vía WSS).
  - **c) `bot-horse`**: Da las herramientas para dejar el canal listo. Opera como el puente definitivo del protocolo IACM hacia plataformas externas de mensajería (como Telegram), coexistiendo con la federación a Node-RED.

### 5.3 Creación de Sesión y Estructura Teatral (Arrakis Theater)
- **Roles y Contexto:** El ecosistema opera bajo la metáfora del *Arrakis Theater*, una infraestructura para sesiones *layer2*. Se compone de:
  - **Casa Arrakis**: Opera en las sombras preparando el terreno y los snapshots.
  - **MC (Maestro de Ceremonias)**: Conduce el flujo de la sesión.
  - **Elenco**: Actores (desarrolladores en *LiveSharedCoding*) que actúan en pantalla.
  - **Público**: Participa desde el chat empujando la narrativa (vía Firehose).
- **Flujo de Inicialización (Link con 5.1 y 5.2):** A través de la infraestructura VPS (`Pub.Rooms`), el **MC** crea la room y envía la *PEER CARD* con el token (`PUBLIC_ROOM`) al Streamer. El Streamer se conecta usando este token.
- **Protocolo AlephScript y MCP:** Tras conectar, el Streamer realiza la llamada `capabilities` del protocolo. Como respuesta, recibe los `PRESETS` (ensamblados por Zeus), los cuales le otorgan herramientas y *prompts* predefinidos (como los del servidor de *Launcher*), permitiéndole invocar comandos como `launch-session` para arrancar la maquinaria de la sesión y conectar su stream.
