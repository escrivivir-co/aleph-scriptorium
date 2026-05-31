# Dossier: Future Pipeline Engine & Scriptorium Integration

!importante no canibalizar el documento, integrarse armonoiosamente.


## 1. Diagram


```mermaid
sequenceDiagram
    autonumber
    actor Streamer
    actor Entrevistado
    
    box Local Scriptorium
    participant StreamDesktop as StreamDesktop<br/>(kick-aleph-bot)
    end
    
    box VPS Teatro Arrakis (OASIS_PUB)
    participant VPS as Nodo VPS
    participant MediaExt as media-extraction<br/>(STT/yt-dlp/streamlink)
    participant WiringEditor as WiringEditor<br/>(Node-RED)
    participant EnginePlan as engine-plan<br/>(Pipeline E2E)
    participant FuturesEng as futures-engine<br/>(Dramaturgo)
    end

    Note over Streamer, StreamDesktop: Transmisión y Host
    Streamer->>StreamDesktop: Transmite audio/video
    Entrevistado->>StreamDesktop: Audio hosteado

    Note over StreamDesktop, VPS: Derivación al Teatro
    StreamDesktop->>VPS: Stream (HLS/VOD) derivado a "Room" Teatro Arrakis

    Note over VPS, MediaExt: Captura y Transcripción
    VPS->>MediaExt: Solicitud de extracción de fragmentos
    MediaExt->>MediaExt: Descarga y STT (faster-whisper)
    MediaExt-->>VPS: Transcripción (tmp/media-cache/)

    Note over VPS, WiringEditor: Operación de Transcripciones
    VPS->>WiringEditor: Feed asíncrono (canales app/sys/ui)
    WiringEditor->>EnginePlan: Diagnóstico/Simulación del flujo de datos
    
    Note over WiringEditor, FuturesEng: Siguiente Fase (Ingesta)
    WiringEditor->>FuturesEng: Volcado de texto para bifurcación de escenarios (futuros posibles)
```

---

## 2. Índice de Enlaces y Rutas Clave

*El índice completo de referencias y rutas ha sido extraído a su propio documento para facilitar el mantenimiento.*
👉 **[Ver Índice de Enlaces (index.md)](file:///Users/morente/Desktop/THEIA_PATH/NUEVA_BASE/SCRIPTORIUM/ALEPH/ARCHIVO/future-pipeline-engine/index.md)**



## 3. Análisis de la Document Machine (BARTLEBY / para-la-voz-sdk)

El flujo de la **Document Machine** está diseñado como un **SDK editorial**. Su propósito es analizar corrientes de pensamiento (corpus) para acabar cristalizando una "Voz" (un agente) que produzca nuevo material (en este caso original, poemas) *desde* las reglas de ese corpus, y no hablando *sobre* él.

### 4.1 Los 4 Agentes Core (SDK)
El SDK base proporciona 4 agentes predefinidos que actúan como la maquinaria de análisis y estructuración:

- **`@bartleby` (Analista):** Solo lectura. Analiza los textos de entrada (editoriales) y genera un informe estructurado en 5 secciones: linaje, taxonomía funcional, mecanismos retóricos, emergencias y ausencias estructurales.
- **`@archivero` (Gestor del Corpus):** Gestiona la "fuente de la verdad" (`corpus.md`). Compara los nuevos análisis con el corpus existente para detectar qué es nuevo, qué confirma algo existente, qué evoluciona y qué discrepa. Luego lo integra.
- **`@cristalizador` (Diseñador de artefactos):** Observa los patrones acumulados. Cuando hay suficiente información, propone la creación de un nuevo agente (la **`@voz`**) construyendo sus *instructions* y *prompts*.
- **`@portal` (Interfaz adaptativa):** Sirve como interfaz de entrada que adapta el tono según quién interactúe con el sistema (ej. perfil de un editor, comité o inteligencia hostil).

A estos 4 se les suma un quinto agente que es el resultado del proceso:
- **`@voz` (Agente Mod):** El agente generado y cristalizado que reside en la capa de la aplicación (el *mod* activo) y es el que finalmente produce contenido basándose en el corpus.

### 4.2 Las Fases / El Flujo (Los 6 Comandos)
El flujo está dictado por "guiones" (documentos humanos paso a paso) y una serie de comandos de Copilot que ejecutan los agentes:

1. **`/guion` (Usuario):** Genera el "roadmap" de trabajo (un documento Markdown con checkboxes) a partir de una plantilla. Prepara el terreno antes de activar los agentes.
2. **`/feed` (`@bartleby`):** Ingresa un nuevo texto (editorial). Bartleby lo lee y genera el informe de análisis.
3. **`/diff-corpus` (`@archivero`):** El archivero compara el nuevo informe de Bartleby contra el mapa acumulativo de conocimiento.
4. **`/merge-corpus` (`@archivero`):** Tras revisar el *diff*, el archivero integra los hallazgos validados dentro del documento maestro del corpus.
5. **`/design` (`@cristalizador`):** Si hay suficientes textos procesados, el cristalizador analiza todo y diseña al nuevo agente (`@voz`), sus prompts y sus instrucciones.
6. **`/status` (`@archivero`):** Comando de utilidad para saber cuántos textos se han procesado y el estado de las emergencias en el corpus.

### 4.3 Estructura de Ficheros (main vs mod)
El SDK opera bajo un patrón estricto unidireccional: la capa pura del motor (`main`) hereda hacia la capa de datos/lore (el `mod` activo), sin ensuciar el motor.

**Capa del Motor (DocumentMachineSDK - main)**
- `.github/agents/`, `.github/prompts/`, `.github/instructions/`: Aquí viven los 4 agentes core y los 6 comandos.
- `.github/templates/guion-ciclo.template.md`: La plantilla para generar los guiones paso a paso.
- `proyecto.config.template.md`: Plantilla para configurar nuevos proyectos/universos.

**Capa del Universo Generado (mod/lore activo)**
- `guiones/YYYY-MM-DD_slug.guion.md`: Los roadmaps humanos ejecutables.
- `corpus/editoriales/`: Los textos fuente "crudos" que entran a la máquina.
- `corpus/analisis/`: Los informes generados por `@bartleby`.
- `corpus/corpus.md`: El "mapa acumulativo". Es la fuente de la verdad (lo que se pasa luego a la Vector Machine).
- `mod/agents/voz.agent.md`: El agente cristalizado listo para funcionar.
- `mod/prompts/` y `mod/instructions/`: Las reglas de la `@voz`.
- `docs/`: Catálogo web (Jekyll) donde se publicaría la producción de la `@voz`.

---
---

## 4. El "Future Machine" Pipeline (La Súper-Cadena)

Investigando más a fondo en el código (como se documenta en el SDK de Cortos / mod legislativa), el flujo base de *BARTLEBY* descrito en la sección 4 no es siempre el proceso principal. En contextos más amplios, la Document Machine actúa como una **subcadena** dentro de una pipeline de orquestación narrativa de mayor escala conocida como la **Future Machine**.

En esta súper-cadena, el análisis meticuloso de `@bartleby` se convierte en un simple paso interno (un motor de procesamiento de fondo) dentro de un proceso de 5 etapas orquestado por un nuevo conjunto de agentes.

### 4.1 La Secuencia de 5 Agentes (Future-Machine)

El flujo de trabajo se estructura en la siguiente cadena: `Puzzle → Archivero Lore → Grafista → Demiurgo → Dramaturgo Cortos`.

1. **`@Puzzle` (Validación):** Recibe las piezas de "lore" (los textos crudos/borradores) y las verifica contra el esquema de datos antes de dejarlas entrar al sistema.
2. **`@Archivero Lore` (Ingesta y Corpus):** Aquí es donde la subcadena de Bartleby es absorbida. El *Archivero Lore* toma todo el pack validado por *Puzzle* y delega en `@bartleby` el análisis profundo de todas las piezas (linajes, mecanismos, ausencias). El resultado unificado es el `CORPUS_PREVIEW.md`: un mapa puro y sin juicios de todo el material.
3. **`@Grafista` (Estructuración del Grafo):** Lee el corpus generado y detecta los puntos de fricción, huecos, tensiones y bifurcaciones de la historia. Con esta información, estructura un **grafo dirigido** de narrativas o futuros posibles.
4. **`@Demiurgo` (Instanciación de Universo):** Toma el grafo creado por el Grafista y, en consenso con el usuario, selecciona una rama específica. Rellena las variables faltantes, define las reglas iniciales y convierte esa rama en una "spec concreta": un **Universo** (`universo/*.md`). Es un escenario formalizado.
5. **`@Dramaturgo` / `Dramaturgo Cortos` (Generación de Obra):** Es el destino final de la pipeline. Toma el Universo instanciado por el Demiurgo y lo transforma en una pieza literaria o producción final (por ejemplo, un "corto"). 


## 5. Análisis e Investigación de StreamDesktop y StreamDesktopAppCronos

La construcción de este diagrama de caso de uso y el índice de referencias se sustenta en los documentos técnicos y manuales de usuario del Scriptorium:
1. `StreamDesktop/README-SCRIPTORIUM.md`
2. `StreamDesktopAppCronos/README-SCRIPTORIUM.md`
3. `WiringEditor/README-SCRIPTORIUM.md`
4. `BlockchainComPort/OASIS_PUB/site/scriptorium/README.md`
5. `DocumentMachineSDK/.github/skills/futures-engine/SKILL.md`
6. `DocumentMachineSDK/.github/skills/media-extraction/SKILL.md`
7. `DocumentMachineSDK/.github/skills/engine-plan/SKILL.md`

> Para más detalles, consulta el **[Índice del Future Pipeline Engine](index.md)**.

El análisis de `StreamDesktop` y `StreamDesktopAppCronos` no se enfoca en su estado técnico final, sino en el **plan y caso de uso** que aportan dentro del ecosistema Scriptorium (actualmente en creación). 

- **StreamDesktop (`kick-aleph-bot`)**: Actúa como un *gateway* entre plataformas de streaming (Kick.com) y el Scriptorium. Define una arquitectura de 3 canales (App, Sys, UI) usando RxJS, lo que permite que los mensajes de chat y eventos del stream fluyan bidireccionalmente hacia agentes específicos (como `@plugin_ox_kickstream` o actores del teatro).
- **StreamDesktopAppCronos (`kick-aleph-crono-bot`)**: Es un overlay de OBS visual con animaciones y cronómetros. Aunque en su Sprint 1 opera de manera *standalone*, su integración futura permitirá que comandos desde el Scriptorium (por ejemplo `!timer` mediante un mini HTTP listener) reaccionen en el stream, integrándolo con el *Teatro transmedia*.

### 5.1 Flujo Hipotético: Ingesta hacia Future Machines

Supongamos el siguiente flujo:
- **a)** El streamer y un entrevistado hosteados en el scriptorium del streamer derivan el audio a una room en el contexto de Teatro Arrakis de Scriptorium a través del VPS (`BlockchainComPort/OASIS_PUB/site/scriptorium`) donde está instalada una skill de `futures-engine`.
- **b)** En el VPS está instalado `media-extraction` y un operador vuelca a las transcripciones del stream en proceso, operados con `WiringEditor` y la skill de `engine-plan`.

### 5.2 Flujo de Conexión y Federación (Pub.Rooms)

A continuación se detalla cómo un cliente externo (por ejemplo, el servidor TypeScript de `BotHubSDK` o una instancia de `StreamDesktopApp`) se federa con el servidor VPS del Scriptorium. 

El cliente utiliza el endpoint de conexión en el servidor VPS y las credenciales proporcionadas en la *Peer Card* del vestíbulo público (`rooms.scriptorium.escrivivir.co` y el token de `PUBLIC_ROOM`) para autenticarse a través de un transporte WebSocket seguro (WSS), evitando la necesidad de abrir puertos entrantes.

```mermaid
sequenceDiagram
    autonumber
    participant Client as Peer Client<br/>(BotHubSDK / StreamApp)
    participant Caddy as Caddy Proxy<br/>(VPS Pub-Web)
    participant Rooms as Scriptorium Rooms<br/>(Node-RED scriptorium-rooms)
    participant RoomFed as PUBLIC_ROOM<br/>Federation

    Note over Client: Setup local con token PUBLIC_ROOM y Alias
    Client->>Caddy: Conexión saliente WSS (Puerto 443)<br/>wss://rooms.scriptorium.escrivivir.co/runtime
    Caddy->>Rooms: Reverse proxy hacia scriptorium-rooms:3010
    
    Note over Rooms: Validación de shared-secret
    Rooms->>Rooms: Handshake & Autenticación
    
    alt Auth Exitosa
        Rooms-->>Client: Handshake Válido (Conectado)
        Client->>RoomFed: Ingresa al canal federado (Node-RED mesh)
        Note over Client, RoomFed: Tráfico bidireccional de eventos y comandos
    else Auth Fallida
        Rooms-->>Client: Rechazado (Unauthorized) + Log auditable
    end
```