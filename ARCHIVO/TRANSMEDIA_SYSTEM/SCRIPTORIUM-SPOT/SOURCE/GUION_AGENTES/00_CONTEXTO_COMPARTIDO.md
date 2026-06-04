# 00 · CONTEXTO COMPARTIDO — SPOT "SCRIPTORIUM SKINS / INFORMATION SYSTEM"

> **Cómo usar este archivo.** Es el *brief maestro* que comparten los 8 agentes generadores
> de clip. Cada agente recibe ESTE documento + UN archivo de prompt individual
> (`PROMPT_1` … `PROMPT_8`). El archivo individual manda sobre el plano concreto; este
> documento fija el universo, el tono, la marca y las reglas que NO se pueden romper.
> No hace falta leer ningún otro documento para producir un clip.

---

## ⬆️ FLUJO DE SUBIDA A GEMINI OMNI (LÉELO ANTES DE EMPEZAR)

> El render se hace **un prompt cada vez**, subiendo los archivos **a mano, uno a uno**.
>
> **Límite duro: 10 archivos por vídeo/prompt.** Las imágenes cuentan como archivos.
>
> - **Por cada clip subes:** las imágenes listadas en la cabecera `⬆️ ARCHIVOS A SUBIR`
>   de ese prompt. Ese listado ya está acotado a ≤ 10 y verificado.
> - Pega el texto del prompt (su bloque **"Prompt Gemini Omni (one-line)"**) como
>   instrucción de generación.
> - Si algún clip necesitara más de 10 imágenes, se **parte en una 2ª iteración**
>   (mismo prompt, segunda tanda de imágenes) y se combinan en montaje. **Con el set
>   actual NINGÚN clip lo necesita** (el más cargado usa 9).
>
> | Clip | Nº de archivos a subir |
> |---|---|
> | PROMPT_1 · Intro | 3 |
> | PROMPT_2 · Despliegue | 6 |
> | PROMPT_3 · Crew/Skins | 9 |
> | PROMPT_4 · Ingesta | 5 |
> | PROMPT_5 · Futuros | 3 |
> | PROMPT_6 · Sesión viva | 8 |
> | PROMPT_7 · Cierre | 2 |
> | PROMPT_8 · Transición | 1 |

---

## 0. TL;DR para el agente (lee esto aunque no leas nada más)

- Estás produciendo **un (1) clip** de un spot publicitario modular de **8 piezas**.
- Producto: **Scriptorium Skins**, presentado como un **Information System**.
- Tono: **ska / rocksteady de 1969**. Pausado, seguro, *cool*. NO frenético, NO tecno, NO trailer épico.
- Estética: **analógica y táctil** — tinta gruesa de imprenta, stencil, sello de caucho, grano de celuloide, crujido de vinilo, fanzine, halftone.
- Voz en off: **un "Toaster"** (locutor grave, calmado, que recita a contratiempo, estilo dancehall pionero).
- Idioma de la locución y los rótulos: **español**.
- Cierre obligatorio de toda la campaña (solo lo dice el clip de cierre): **"Scriptorium skins, tus rude bots de militancia ácrata."**
- **Destino de render:** Google **Gemini Omni** (ya tiene las imágenes subidas). Cada prompt incluye un bloque **"Prompt Gemini Omni (one-line)"** en inglés listo para pegar.
- Prohibiciones duras en §6. **Léelas.**

---

## 1. La tesis creativa (qué tiene que "sentir" el espectador)

El spot vende tres cosas a la vez, y la gracia es que se sostengan como **una sola idea**:

1. **Los Rude Bot Skins (EL PRODUCTO, el foco)** — la *crew* de agentes expertos en
   **montar y gestionar** Information Systems. Son los herederos de la escena trad/skin:
   su **militancia ácrata/política** es la herencia, encarnada en bots que despliegan y
   operan la red. Las Skins no son temas visuales: son **identidades operativas**, los
   trajes con los que cada bot toma su rol. **A un productor le vendemos esto:** contratas
   una crew de rude bots y ellos te despliegan una red de agentes —como el "camión" que
   llega, monta el equipo y levanta la rave— solo que lo que montan es el **Information System**.
2. **El Information System** — lo que la crew despliega: "raves de transmedia" federadas y
   asíncronas. Scriptorium no trae las pantallas ni los periféricos de nadie; **trae la
   arquitectura pura**, el flujo. Es el resultado visible de que los rude bots han montado el sistema.
3. **El Future Pipeline Engine** — la maquinaria real que la crew opera: ingesta,
   transcripción, federación y ramificación de futuros narrativos. Es "el equipo de sonido"
   que los rude bots enchufan y mantienen vivo.

> **El hilo que las une (úsalo como brújula en cada plano):**
> *"El Information System no se ve, se siente. Lo que vale es el flujo, no la superficie."*
> Los rude bots son la crew que llega y **lo monta todo**; el Future Engine es el equipo que
> enchufan; el Information System es la rave de transmedia que levantan. Quien manda la
> fiesta física eres tú (el productor/streamer); ellos corren el **riddim de transmedia** por
> debajo, a contratiempo, sin que se note el sudor, y al terminar recogen y se van.

**Equilibrio pedido:** el peso recae en **los rude bots como producto desplegable**
(que un productor entienda que contrata una red de estos agentes), apoyado en mostrar
*qué* despliegan (Information System) y *con qué* maquinaria (Future Engine). Cada clip
apoya el peso en un pilar pero deja entrever los otros dos.

---

## 2. Glosario operativo (vocabulario REAL — úsalo como rótulos/texturas, no lo inventes)

Estos términos son del ecosistema real. Pueden aparecer rotulados a mano, en stencil o
impresos sobre el flujo de red. No hace falta explicarlos: funcionan como *jerga de crew*.

| Término | Qué es (para que lo uses con criterio) |
|---|---|
| **Information System** | El despliegue completo de una sesión transmedia. La "fiesta de datos". |
| **Rude Bot Skin** | Identidad operativa / traje de orquestación que viste la crew. |
| **Pub.Rooms** | El vestíbulo / salas federadas donde se enchufa la sesión (sobre Node-RED). |
| **Node-RED / WiringEditor** | La mesa de mezclas: nodos y cables que enrutan los flujos. |
| **Scuttlebutt (SSB)** | La red descentralizada por la que viaja el transmedia, asíncrono. |
| **media-extraction** | Ingesta: descarga el stream y lo transcribe (STT, faster-whisper). |
| **futures-engine** | El "Dramaturgo": detecta bifurcaciones y ramifica 2–5 futuros posibles. |
| **engine-plan** | Inspección y diagnóstico del pipeline de punta a punta. |
| **BotHubSDK** | Servidor que federa peers y corre la cadena IACM `bot-rabbit → bot-spider → bot-horse`. |
| **kick-aleph-bot** | El gateway que conecta el streaming con el Scriptorium. |
| **Zeus / PRESETS** | Ensambla los *packs* de capacidades que recibe cada agente al conectarse. |
| **LiveSharedCoding** | El elenco operando en vivo, en pantalla. |
| **ARG / Transmedia** | El tipo de juego/narrativa que el sistema sirve. |

**Frases-sello que pueden aparecer rotuladas:** `ASÍNCRONO`, `FEDERADO`, `desde la sombra`,
`tira de los cables`, `riddim de transmedia`, `militancia ácrata`.

---

## 3. Estructura de la campaña (las 8 piezas)

| # | Archivo de prompt | Rol | Duración | Pilar dominante |
|---|---|---|---|---|
| 1 | `PROMPT_1_INTRO.md` | Manifiesto Rude (apertura) | 10 s | Actitud / tesis |
| 2 | `PROMPT_2_DESPLIEGUE.md` | Historia 1 · El despliegue | 10 s | Information System |
| 3 | `PROMPT_3_CREW_SKINS.md` | Historia 2 · La crew y las Skins | 10 s | Rude Bot Skin |
| 4 | `PROMPT_4_INGESTA.md` | Historia 3 · Ingesta y federación | 10 s | Future Engine (entrada) |
| 5 | `PROMPT_5_FUTUROS.md` | Historia 4 · Ramificar futuros | 10 s | Future Engine (salida) |
| 6 | `PROMPT_6_SESION_VIVA.md` | Historia 5 · La sesión viva | 10 s | Síntesis (los 3 pilares) |
| 7 | `PROMPT_7_CIERRE.md` | El Sello (claim final) | 10 s | Marca |
| 8 | `PROMPT_8_TRANSICION.md` | El Skank (puente recurrente) | 4 s | Ritmo / marca |

**Orden de montaje del spot largo (~64 s):**
`1 → 8 → 2 → 8 → 3 → 8 → 4 → 8 → 5 → 8 → 6 → 7`
(El clip 8 se reutiliza como break entre bloques. Cada pieza se puede publicar suelta.)

---

## 4. Marca, ritmo y textura (constantes en TODOS los clips)

### 4.1 Audio
- Base **ska / rocksteady clásico (~1969), 80–90 BPM**.
- Protagonista: la guitarra al **contratiempo** (*chac… chac…*, cuerdas tapadas con la mano)
  + **bajo dub** caminante y profundo. Órgano sutil opcional.
- Capa constante: **crujido de aguja de vinilo** de fondo.
- La voz en off entra **a contratiempo**, nunca pisa el golpe.

### 4.2 Voz en off (Toaster)
- Grave, pausada, segura. Recita, no grita. Acento de calle, aplomo de quien controla.
- Español. Frases cortas. Deja respirar el riddim entre líneas.

### 4.3 Imagen
- Paleta sucia y cálida de imprenta: **negro tinta, crema/papel viejo, un acento** (rojo
  óxido o verde botella) según el plano.
- Texturas obligatorias: grano de celuloide rayado, **halftone**, bordes desgastados de
  fanzine, golpes de tinta gruesa, **sello de caucho**, rótulos **stencil** pintados a mano.
- Transiciones por **rasgado de papel**, salto de fotograma o golpe de tinta. Nada de
  transiciones digitales limpias ni glow futurista.
- Montaje *cool*: cortes al compás, sin frenesí. El movimiento de cámara es **mínimo y firme**.

### 4.4 Logo
- `SCRIPTORIUM_SKINS.png` se usa **verbatim**, como un sello de caucho pesado que golpea.
  Aparece de forma protagonista en INTRO, TRANSICIÓN y CIERRE; puede asomar discreto en el resto.

---

## 5. Catálogo de assets de marca (rutas relativas a la carpeta `SCRIPTORIUM-SKINS/`)

> Instrucción de uso: **"A partir del contenido de la imagen…"** — NO mostrar capturas planas.
> Recorta, compón, anima texturas y trata cada imagen como **material gráfico de base**.

**Logo (verbatim):**
- `../../SCRIPTORIUM_SKINS.png` *(en la raíz de ALEPH; logo oficial)*

**Producto / sello:**
- `SCRIPTORIUM_SKINS_PRODUCT.png`
- `SCRIPTORIUM_SKINS_details.png`
- `SKIN_TRADS.png`
- `MAX_PIC_01.png` … `MAX_PIC_04.png`

**Banners y cards (en `MATERIALES/RUDE_SKIN_BOTS/`):**
- `aleph-scriptorium-banner.png`
- `fundacion-banner.png`
- `vibe-bitacora-banner.png`
- `SCRIPTORIUM_CARD_ROOMS.png`
- `SCRIPTORIUM_CARD_PUB.png`
- `SCRIPTORIUM_PROMO.png`

**Topología / maquinaria de red (en `MATERIALES/BOT_MARK_NETWORK_BUILDER/`):**
- `NETWORK_SYS1.png`, `NETWORK_SYS2.png`
- `NETWORK_TOPO1.png`, `NETWORK_TOPO2.png`, `NETWORK_TOPO3.png`, `NETWORK_TOPO_2.png`

> ⚠️ **No usar la serie `maquina-marx*.png`.** Esas capturas contienen texto político
> legible que Gemini Omni rechaza por políticas de contenido. Su único valor era el *look*
> de interfaz (UI en modo oscuro, parámetros, log de ejecución); ese look ya se describe
> como texto genérico en los prompts 4 y 5, así que no hace falta subir la imagen.

Cada prompt individual indica **qué assets** son los recomendados para ese plano.

### 5.1 Esquemas técnicos reales (en `SPOT_DOSSIER/pics_dossier/`) — "la pinta del Information System"

> **Para qué sirven.** Son capturas de los diagramas reales del sistema (`dossier.md`). Su
> función NO es leerse en pantalla, sino dar **veracidad técnica**: que un técnico o un
> productor que vea el spot reconozca la **silueta real** de la arquitectura (cajas de
> nodos, líneas de secuencia, grafos que se bifurcan, cadenas de bots). Trátalos como
> **blueprint de fondo**: texturizados a halftone, tinta azulada sobre papel, proyectados
> como plano técnico tras la acción. Recorta cajas y flechas concretas; no muestres la
> captura entera plana.

| Archivo | Qué diagrama es (lo que un técnico reconoce) | Clip(s) donde encaja |
|---|---|---|
| `pics_dossier9.png` | **Caso de uso completo "Inicialización del Teatro"**: actores (MC Arrakis, Streamer, Entrevistado, Elenco, Público) y servicios (StreamDesktop·kick-aleph-bot, BotHubSDK, Pub.Rooms, media-extraction, WiringEditor, engine-plan, futures-engine). Es el "mapa del sistema entero". | 1 (blueprint fantasma), 2 |
| `pics_dossier4.png` | **State Machine de la sesión**: `RoomCreated → StreamerConnected → CapabilitiesReceived → ActiveSession` con 3 líneas paralelas (Live Connection / Transcripciones / Público·Firehose). | 2, 6 |
| `pics_dossier3.png` | **Secuencia de la máquina de estados** (tema oscuro): tres líneas en paralelo durante la sesión activa (Ping, faster-whisper, chat raw feed). | 6 |
| `pics_dossier8.png` | **Flujo McpPreset completo**: MCPGallery → Zeus (Catálogo→Generador) → `presets/*.json` → `agent-assignments.json` → **Ecosistema de Agentes**. Los "trajes a medida" que viste cada bot. | 3 |
| `pics_dossier2.png` | **Zeus**: lee capabilities de `mcp-model-sdk`/`mcp-mesh-sdk`, empaqueta tools y exporta `mcp_presets.json` al Cliente/Streamer. | 3 |
| `pics_dossier1.png` | **Class diagram del PRESET PACK** `MCPLauncherControl` (id, category, tools: `launch_mcp_server`, `launch-session`, `get_server_status`). El "traje" por dentro. | 3 |
| `pics_dossier5.png` | **Topología IACM**: cadena `bot-rabbit (ingesta) → bot-spider (red RETRO peers) → bot-horse (canal IACM/Telegram)`. La crew de bots conectándose. | 3, 4 |
| `pics_dossier6.png` | **Federación Pub.Rooms**: Peer Client → Caddy Proxy (WSS 443) → Scriptorium Rooms (Node-RED) → PUBLIC_ROOM, con handshake/auth. | 4 |
| `pics_dossier7.png` | **Future Machine super-cadena**: `Puzzle → Archivero Lore → Grafista → Demiurgo → Dramaturgo`, más el análisis de StreamDesktop/skills. | 5 |

> Ruta de uso en los prompts: `pics_dossier/pics_dossierN.png`.

---

## 6. PROHIBICIONES DURAS (romper esto invalida el clip)

- ❌ **NO** mencionar, mostrar ni aludir a "Trojan", "Sound System", camiones, altavoces
  físicos ni cultura de sonido. Esa capa es punto de partida interno, **no entra en producción**.
  En pantalla y en voz solo existe el **Information System**.
- ❌ **NO** tono frenético, hype tecno, EDM, trailer épico ni MC hiperactivo.
- ❌ **NO** estética futurista limpia, neón cromado, HUD sci-fi ni glows digitales.
- ❌ **NO** mostrar capturas de pantalla planas; trabajar las imágenes como material gráfico.
- ❌ **NO** rótulos en otro idioma que no sea español.
- ❌ **NO** adelantar el claim final fuera del clip de cierre.
- ✅ **SÍ** mantener el riddim a contratiempo, la tinta, el stencil y el aplomo de crew.
