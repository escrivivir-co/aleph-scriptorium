[Saltar al contenido.](https://escrivivir.co/2026/06/04/t04x06a-ficha-de-producto-scriptorium-skins-arg/#content)

T04x06a: «Ficha de producto: Scriptorium skins ARG»
===================================================

[junio 4, 2026](https://escrivivir.co/2026/06/04/t04x06a-ficha-de-producto-scriptorium-skins-arg/)

Viene de: <https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md>

[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#ficha-de-producto-scriptorium-skins-arg)
========================================================================================================================================================================================

[![Sello Scriptorium Skins](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)

> **La analogía rectora:** donde el sound system divide una señal de audio en bandas de frecuencia (graves/medios/agudos) y las amplifica por separado para abrazar y sumergir el cuerpo del *Massive*, el Transmedia-System forja el *stream* en una señal **narrativa** multimodal y la amplifica en la red para llegar y abrazar la imaginación de la **T.A.Z.**, que, de vuelta, no solo bailar en la transmedia sino, por su naturaleza, unirse a la party generando nuevas señales. A diferencia del camión y los altavoces, Scriptorium permanece en «la sombra». No es «una plataforma» o «cerco tecnofeudal». Corre sobre la red transparente al [modelo OSI](https://es.wikipedia.org/wiki/Modelo_OSI) acarreando transmedia. Artistas, personas que juegan, Equipo de Ceremonias, etc. la consumen en sus dispositivos o tecno-cárceles mainstream preferidas. Ocasionalmente, Scriptorium provee UIs y pipelines tipo starter kit para promover e inspirar la creación de human-network-interfaces HNI.

¿Qué pinta tiene un Tablero Scriptorium?[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#qu%C3%A9-pinta-tiene-un-tablero-scriptorium)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Es un circuito, una radicoma de pipelines para captura, normalización, selección, bifurcación, cristalización, etc. La analogía con el sound system es potente. Una partida, con sus sesiones en eventos o extendida en el día a día y la actualidad emana de fuentes, vía operadores, división de señal, amplificación, cuerpo T.A.Z., ceremonia, etc. Para una correcta ubicación del proyecto, esta herramienta buscaría ser aceptada y reconocida en el contexto de la anarquía ontológica.

![TABLES11.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TABLES11.png?raw=true)

El movimiento GNU/Linux garantiza que los usuarios tengan el control absoluto de sus sistemas operativos a través de las 4 libertades fundamentales. A diferencia del software privativo, estas libertades son éticas y buscan promover la colaboración abierta. [[1](https://www.youtube.com/watch?v=yQUfOaGAb28&t=218), [2](https://www.gnu.org/philosophy/philosophy.es.html), [3](https://www.gnu.org/philosophy/free-sw.es.html)] Los axiomas que generan ese paradigma y el ecosistema de software libre:

-   Libertad 0 (**Uso**): Puedes ejecutar el programa con cualquier propósito y para cualquier fin (comercial, educativo, recreativo o gubernamental) sin necesidad de pedir permiso. [[1](https://es.wikibooks.org/wiki/Introducci%C3%B3n_a_Linux/Libertades), [2](https://www.youtube.com/shorts/9omHRc1rgPU)]
-   Libertad 1 (**Estudio**): Tienes la libertad de estudiar cómo funciona el programa y modificarlo para adaptarlo a tus necesidades. Esto exige que el acceso al código fuente sea público y abierto. [[1](https://es.wikibooks.org/wiki/Introducci%C3%B3n_a_Linux/Libertades), [2](https://www.youtube.com/shorts/9omHRc1rgPU)]
-   Libertad 2 (**Distribución**): Puedes distribuir copias exactas del software para ayudar a otras personas o a tu comunidad. [[1](https://es.wikibooks.org/wiki/Introducci%C3%B3n_a_Linux/Libertades), [2](https://www.youtube.com/shorts/9omHRc1rgPU)]
-   Libertad 3 (**Mejora**): Puedes modificar el programa, mejorar sus funciones y publicar tus propias versiones adaptadas para que toda la comunidad se beneficie. [[1](https://es.wikibooks.org/wiki/Introducci%C3%B3n_a_Linux/Libertades), [2](https://www.youtube.com/shorts/9omHRc1rgPU)]

Estas libertades se administran mediante licencias (como la licencia pública general o [GNU GPL](https://www.gnu.org/licenses/gpl-3.0.html)) que aseguran el concepto de *copyleft*, evitando que el código pase a ser cerrado o privativo. [[1](https://www.youtube.com/watch?v=IK1AtNCfExo&vl=es&t=15), [2](https://www.rebiun.org/node/2830), [3](https://www.fing.edu.uy/~asabigue/prgrado/2004eofgl/contenido/anexo2/anexo_ii_24.html)]

[Obra / ParaLaVozSDK](https://escrivivir-co.github.io/para-la-voz-sdk/)

![TABLES13.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TABLES13.png?raw=true)

```

flowchart LR
  subgraph Fuentes["Fuentes de señal"]
    Live["Stream en vivo<br/>audio/video"]
    Chat["Chat y comandos"]
    BotsIn["Bots / canales externos"]
    Manual["Ediciones manuales<br/>del elenco"]
  end

  subgraph Captura["Captura y normalización"]
    HLS["Derivado HLS/VOD<br/>yt-dlp / streamlink"]
    STT["media-extraction<br/>STT local"]
    FH["Firehoses<br/>raw buffers + cursores"]
    WE["WiringEditor / RxJS<br/>orden y routing"]
  end

  subgraph Orquestacion["Orquestación"]
    Policy["PRESETS / Zeus<br/>capacidades"]
    Router["Crossover de skills<br/>router semántico"]
    Evidence["Ledger de evidencias<br/>timestamps + refs"]
  end

  subgraph Editorial["Procesamiento editorial"]
    Doc["Document Machine / BARTLEBY<br/>corpus ordenado"]
    Fut["futures-engine<br/>nodos de bifurcación"]
    Diag["engine-plan<br/>huecos y riesgos"]
    Voz["@voz / Dramaturgo<br/>cristalización"]
  end

  subgraph Output["Salidas"]
    Corpus["Lore / corpus versionable"]
    Grafo["Grafo de futuros"]
    Obra["Pieza dramatizada"]
    Contexto["Ventana de contexto actualizada"]
  end

  Live --> HLS --> STT
  Chat --> FH
  BotsIn --> FH
  Manual --> Contexto
  STT --> WE
  FH --> WE
  WE --> Evidence
  WE --> Router
  Policy -.-> Router
  Router --> Doc
  Router --> Fut
  Router --> Diag
  Evidence --> Doc
  Contexto --> Doc
  Contexto --> Fut
  Doc --> Corpus
  Fut --> Grafo
  Corpus --> Voz
  Grafo --> Voz
  Voz --> Obra
  Corpus --> Contexto
```

 [analisis_transmedia_system_PICS/CHARTS_02.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_02.png)

[![Fallback chart 02](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_02.png)](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_02.png)

* * * * *

¿Cuna o madre del proyecto?[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#cuna-o-madre-del-proyecto)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Escrivivir.co** aspira a tomar la forma de un Trojan-Records para dinamizar su trocito de escena afín no con álbums de música sino juegos de transmedia sobre la escena de una suerte de **«Scriptorium Skins ARG»**, como si fuera el Trojan-Truck de Duke Reid (caja del juego) desplegando sesiones. La unidad mínima no es una app, ni un bot, ni un stream aislado. La unidad mínima es una **obra multívoca** ejecutada en uno o más Transmedia Systems de tipo Scriptorium. Puede cristalizar en eventos o mantenerse como radicoma en la Red. Puede tomar la forma de una T.A.Z. como Room con protocolo, participantes, capacidades, fuentes de señal, ventana de contexto compartida, bitácora de evidencias, compactación editorial, etc. Scriptorium, enamorado de la red SolarNetHub, puede ser HumanNetworkInterface para [procesos «Parlamentarios» en sistemas de gobierno con caracter constitutivo](https://wiki.solarnethub.com/socialnet/parliament), por citar o [verbigracia](https://pub.escrivivir.co/parlament). La tecnología al servicio de los barrios digitales. Como reza la canción:

«Periferia» (Ratos de sótano) **«Periferia» (Ratos de porao)**

todo sucede en la periferia **tudo acontece na perifeira** peleas, muertes en la periferia **brigas, mortes na periferia** tiros, sangre en la periferia, en la periferia **tiros, sangue na periferia, na periferia** todo acontece en la periferia. **tudo acontece na periferia**.

todo corre directo hacia la periferia **bagulho corre direto na periferia** hacemos mucha anarquía en la periferia, en la periferia **fazemos muita anarquia na perifeira, na periferia** todo sucede en la periferia **tudo acontece na periferia**

¡periferia! **¡periferia!**

Imagina el spot:

> Corte rápido, beat acelerado, identidades modulares vistiendo blazers de colores que se «activan» y esperan para entrar a la red, cual nodos, que se hipervincularán en un tejido. Un Equipo de Ceremonias abre la sala, los skins despliegan el «muro de sonido» que aquí tiene la pinta de «network-mesh», los artistas suben al escenario sus «ventanas de contexto», las personas que juegan entran desde cualquier red sin tener que abrir puertos (*pretty good escrivivir*) en sus instalaciones usando la «ventana de contexto» en sus propios entornos agénticos, y la sesión arranca. Lo que el sound system bombea como presión sonora (*booming mobile discotheque (sound system) across the island using a British-built Trojan flatbed truck*), **el Scriptorium lo bombea como presión narrativa**: una rave de información orquestada en vivo, guionizada como juego y donde las personas que juegan tienen una suerte de «libre albedrío» sobre el tablero. Y que combina estos encuentros en vivo con la trama transmedia en la red hasta el siguiente encuentro. Usando una adversativa de estas que tanto adoran los LLMs y todo el rato usan, en el contexto de este producto la frase *drop the bomb!* no significa «*Con un genocidio limpia Gaza para un resort de lujo!*» as we hear to potus on 2025 but means:

> *«Escrivivir.co presenta Scriptorium Skins: turn on the Transmedia System, then get steady to: **KEEP CALM & T.A.Z.ing'on!**»*

-   **Animus iocandi**, uso exclusivo para ocio. Este producto no es apto para negocio.
-   **Federado por diseño**: cualquiera puede unirse desde su barrio digital. ¿Por que esto importa? La respuesta en un juego (ver abajo catálogo): *«¡④ Juegos de la Vida (sound clashes)¡*«
-   **Alcance y ámbito de este proyecto**: es un *one-man-army*. Lo impulsa, como un Duke Raid cualquiera, [alephillo](https://x.com/_dev_aleph_1), un obrero que los días de guardar o por las tardes y noches llena un backlog de tareas. Y por el día, mientras se va a la oficina a trabajar por cuenta ajena y a cuenta de dueños de medios de producción, deja corriendo una pool de agentes picando. Este proyecto no es «la Escena» sino que, mero, participa de ella, nuestro Trojan-Truck aspira a ser uno más, *we are One*.

> *«Escrivivir.co presenta 'Scriptorium Skins', tu transmedia system de confianza.»*

-   **Disponible**: enero 2027 (o al otro enero, jajja) --- *save the date*.

La gracia de esta topología de redes es cómo obtiene la «voluntad». Parte de la obra ocurre entre sesiones: pistas que aparecen, bots que recuerdan, comunidades que contrastan, jugadores que devuelven hipótesis y pequeñas señales que reentran en el tablero.

```
flowchart TD  Corpus["Corpus / canon versionable"]  Contexto["Ventana de contexto"]  Futuros["Grafo de futuros"]  Obra["@voz / pieza dramatizada"]  Canon["Canon compartido<br/>memoria estable"]  Invocacion["Invocación por agentes<br/>context window"]  Agencia["Decisiones y misiones<br/>ramas jugables"]  Drama["Momento dramático<br/>drop narrativo"]  Rastro["Rastro transmedia<br/>bots, posts, pistas, pubs"]  Comunidad["Personas que juegan"]  Hallazgos["Hallazgos, respuestas,<br/>teorías, comandos"]  Triage["Triage editorial<br/>canon / rumor / propuesta / descarte"]  Corpus --> Canon --> Comunidad  Contexto --> Invocacion --> Comunidad  Futuros --> Agencia --> Comunidad  Obra --> Drama --> Comunidad  Canon --> Rastro  Agencia --> Rastro  Drama --> Rastro  Rastro --> Hallazgos  Comunidad --> Hallazgos  Hallazgos --> Triage  Triage -->|canoniza| Corpus  Triage -->|ajusta| Contexto  Triage -->|abre rama| Futuros  Triage -->|descarta con motivo| Rastro
```

[![Fallback chart 03](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_03.png)](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_03.png)

| Tipo | Qué transporta | Uso principal | Riesgo editorial |
| --- | --- | --- | --- |
| **Canon** | Hechos de mundo ya aceptados. | Mantener continuidad y memoria común. | Fosilizar demasiado pronto una improvisación. |
| **Rumor** | Señales ambiguas, pistas, voces no confirmadas. | Crear tensión y exploración. | Confundir a la comunidad si no hay marcas de estado. |
| **Propuesta** | Posibles direcciones de trama o hipótesis de jugadores. | Alimentar futuros ramificados. | Premiar solo el volumen y no la calidad. |
| **Misión / comando** | Acción concreta que la comunidad puede ejecutar. | Dar agencia. | Convertir el juego en tareas mecánicas sin emoción. |
| **Obra cristalizada** | Pieza editorial cerrada: escena, resumen, manifiesto, clip. | Memoria afectiva y comunicación externa. | Perder matices del proceso si no se enlaza a evidencias. |

La propagación **retroalimenta la fuente**, pero entra por una compuerta editorial. Un hallazgo de Telegram, Bluesky, chat o room debe volver como evento normalizado ---por ejemplo vía `MCPFirehoseServer`, `MCPBotHubServer` o adaptador equivalente--- y luego pasar por triage. Así se conserva la alegría caótica de la calle digital sin romper la coherencia del tablero.

Vale, sí, muy bonito. ¿Pero qué pinta tiene una party de estas?[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#vale-s%C3%AD-muy-bonito-pero-qu%C3%A9-pinta-tiene-una-party-de-estas)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

El transporte y federación: el muro que monta el Crew de Scriptorium. La topología federada se concreta en la forma de Zonas Autónomas Transmedia. El "camión" de Scriptorium una malla de transporte; la "pista de baile" puede ser en una Room. La «sombra» ocupada así por Scriptorium queda disponible para perfilar en el mundo real, que, al fin y al cabo, es el escenario donde, sucede, se proyecta un juego de realidad alternativa. **Importante**: en las calidades de un juego *virtual* está *crear* realidad. En los *aumentados* o *extendidos* superponer sobre ella algunos elementos digitales. **En los juegos de realidad alternativa se necesita hacer branching & forking y versionado semántico** porque no se pretende ni virtualizar, ni aumentar o extender la realidad. Sino alterarla, como deben hacer **la poesía y la filosofía que con, junto con la computología, son los ejes del campo conceptual de escrivivir.co**; el **espacio de «juego» dentro del ocio** es, a salvo del negocio y otras relaciones vinculantes, el animus iocandis cual espíritu que, en sus ratitos y a su manera, se permite unos **dancings en un mar de material transmedia**; o, quien sabe, se anima a unos **beefs en hiperdebates sound clashes**.

En este estado proto del proyecto, una unidad mínima para «aparecer» en red como «fulcro» para «engarzar» actividad «agéntica» entre «pares»:

```
flowchart LR  subgraph Local["Barrios digitales / peers locales"]    StreamDesk["StreamDesktop<br/>Kick / streaming"]    BotHub["BotHubSDK<br/>Telegram / IACM"]    Agent["Peer Client<br/>agente o herramienta local"]    Browser["UI / panel local"]  end  subgraph VPS["VPS / punto de encuentro"]    Caddy["Caddy proxy<br/>TLS + WSS 443"]    Rooms["Pub.Rooms<br/>vestíbulo layer2"]    Mesh["Room mesh<br/>Socket.IO / Node-RED"]    Health["Health + logs<br/>observabilidad"]  end  subgraph Runtime["Runtime transmedia"]    FPE["Future Pipeline Engine"]    Firehose["Firehoses MCP<br/>raw buffers + cursores"]    Presets["Zeus PRESETS"]    Corpus["Corpus / BOE / contexto"]  end  StreamDesk -->|WSS saliente 443| Caddy  BotHub -->|WSS saliente 443| Caddy  Agent -->|WSS saliente 443| Caddy  Browser -->|HTTPS / WSS| Caddy  Caddy --> Rooms --> Mesh  Mesh --> FPE  Mesh --> Firehose  Presets -.-> FPE  FPE --> Corpus  Health -.-> Rooms  Health -.-> Mesh
```

[analisis_transmedia_system_PICS/CHARTS_04.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_04.png) 

![Fallback chart 04](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_04.png)

[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_04.png)

El ciclo de vida desde preproducción a rastro transmedia, arranca cuando alguien pulsa «diseñar» y termina cuando se diseña una sesión y termina ---provisionalmente--- cuando lo ocurrido queda convertido en memoria, futuros y nuevas semillas de juego. La máquina de estados cubre preparación, directo, cierre y vida entre sesiones.

```
stateDiagram-v2  [*] --> Preproduccion  Preproduccion --> RoomPreparada: contrato de sesión + ventana inicial  RoomPreparada --> PeerCardsEmitidas: Equipo de Ceremonias invita peers  PeerCardsEmitidas --> Soundcheck: presencia + capabilities  Soundcheck --> SesionActiva: launch-session  state SesionActiva {    [*] --> ConexionViva    ConexionViva --> CapturaEventos: stream/chat/bots    CapturaEventos --> EdicionContexto: triage + ventana viva    EdicionContexto --> Bifurcacion: futuros + decisiones    Bifurcacion --> PropagacionEnVivo: drops/pistas/respuestas    PropagacionEnVivo --> ConexionViva: feedback  }  SesionActiva --> CierreEditorial: Equipo de Ceremonias cierra Room  CierreEditorial --> Publicacion: corpus + @voz + grafo  Publicacion --> InterSesion: bots, pistas, misiones, archivo  InterSesion --> Preproduccion: siguiente sesión  CierreEditorial --> Archivo: snapshot + logs + evidencias  Archivo --> [*]
```

[![Fallback chart 05](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_05.png)](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_05.png)

Como diseñador de juegos ARG distribuidos, busco cristalizar redes bottom-to-top antes que gesta y épica para weik con corte y feudo. Una de las más visibles, ¡y por ahí empezamos! es tirando de [una pretty good privacy](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) en plan Peer Card. Con el branching hay que aprender verbos nuevos y que se escriba y divulgue para un pretty good branching. La escritura nos enseñó a crear threads de páginas. Aprendimos la noción abstracta de hilo fragmentado en páginas. En la transmedia esas hebras han sido modelizadas en algunos modelos del lenguaje. Scriptorium trabaja en un pretty good git para el proyecto para una escritura menos dual entre escritor y texto. Más un escrivivir donde el texto «final» no muera en una dimensión sino, usando contantes y mondantes Alephs se extienda allende la Hipótesis del Continuo, tras ese finisterre de la Modernidad, al nuevo mundo de cuánticas multiversalidades y transmedias. Un espacio de Hilbert es aquel que toma al Euclidiano y diseña un «imaginador» de dimensiones de modo que de las 3 euclidianas quepa abrir un lienzo enorme ¡terreno de escritura para un Logos que se acepte ya, a estas alturas, HiperLogos! ¿Qué decía...? he perdido un poco el hilo, ¡ah, sí, ya! **KEEP CALM & Do PgP'git**

Una Peer Card debería ser pequeña, revocable y legible nacida entre pares de forma natural, a partir de los anillos existentes entre contactos.

roomId: PUBLIC_ROOM\
endpoint: wss://pub.example.org/runtime\
token: "..."\
scopes:\
  - presence:join\
  - capabilities:read\
  - events:publish\
  - context:invoke\
expiresAt: "2027-01-31T22:00:00Z"\
displayName: "Comunidad invitada / Skin / Peer"\
sessionId: "scriptorium-skins-arg-0001"

La tarjeta no debe prometer más de lo que puede controlar. Si un peer solo viene a escuchar, no necesita publicar. Si un bot solo recuerda pistas, no necesita editar contexto. Si un artista sí edita ventana, ese permiso debe estar separado y ser auditable.

### Checklist por fase[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#checklist-por-fase)

![TABLES14.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TABLES14.png?raw=true)

### Líneas concurrentes durante la sesión

![TABLES15.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TABLES15.png?raw=true)

[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#l%C3%ADneas-concurrentes-durante-la-sesi%C3%B3n)Scriptorium: la enésima blockchain[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#scriptorium-la-en%C3%A9sima-blockchain)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```
flowchart TD  subgraph Gobierno["Gobierno de sesión"]    EDC["Equipo de Ceremonias<br/>Arrakis Theater"]    Zeus["Zeus / Operator<br/>PRESETS + capacidades"]    DevOps["DevOps / Crew<br/>salud + transporte"]  end  subgraph Entrada["Señal viva"]    Stream["Stream en vivo<br/>audio/video + chat"]    Elenco["Elenco / artistas<br/>edición de ventana"]    Comunidad["Personas que juegan<br/>chat, comandos, hallazgos"]    Bots["Rude bots / skins<br/>canales externos"]  end  subgraph Sala["Room federada"]    PeerCard["Peer Card<br/>token, scopes, expiración"]    Room["PUBLIC_ROOM / rooms federadas"]    Firehoses["Firehoses<br/>stream chat, BotHub, ATProto, rooms"]  end  subgraph Core["Orquestación transmedia"]    FPE["Future Pipeline Engine<br/>router de señales + skills"]    Contexto["Ventana de contexto viva<br/>canon en edición"]    Ledger["Bitácora de evidencias<br/>timestamps, cursores, procedencia"]  end  subgraph Salidas["Artefactos de sesión"]    Corpus["Lore / corpus versionable"]    Futuros["Grafo de futuros<br/>2--5 bifurcaciones útiles"]    Voz["Obra / @voz<br/>cristalización dramatúrgica"]    Propagacion["Rastro transmedia<br/>pistas, bots, publicaciones"]  end  EDC -->|crea reglas, turnos y cierre| Room  EDC -->|emite y revoca| PeerCard  Zeus -->|habilita/corta herramientas| FPE  DevOps -.->|Caddy, WSS, observabilidad| Room  DevOps -.->|salud, logs, backups| Firehoses  PeerCard --> Room  Stream --> Firehoses  Comunidad --> Firehoses  Bots --> Firehoses  Elenco --> Contexto  Firehoses -->|eventos normalizados| FPE  Room -->|capabilities + presencia| FPE  FPE -->|rutea por skills| Corpus  FPE -->|detecta bifurcaciones| Futuros  Contexto -->|criterio editorial| Corpus  Contexto -->|condiciona prompts y bots| Propagacion  Ledger -->|pruebas y trazabilidad| Corpus  Corpus --> Voz  Futuros --> Voz  Voz --> Propagacion  Propagacion -->|feedback entre sesiones| Firehoses
```

[analisis_transmedia_system_PICS/CHARTS_01.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_01.png)

[![Fallback chart 01](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_01.png)](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/CHARTS_01.png)

-   **La Room a modo de Layer 2, blockchains volátiles:** es el espacio de routing de la sesión. El punto de Scriptorium es la capacidad de producir, mantener y propagar una trama ARG con continuidad. La layer 1 (de append-only) mantiene la fuente de verdad de estos otras tramas volátiles o necesitadas de compatación o de emisión de boletín de consenso.
-   **La Peer Card a modo de GPG Key/Rings card:** la red crece apoyándose en repetidores y pubrings para cristalizar el propio ecosistema existe. En lugar de un tecno-cerco feudal donde se ponen puertas a un campo y se da acceso a su interior estanco, las T.A.Z de Scriptorium cristalizan (catalizan) las relaciones ya existentes en los anillos de las personas que juegan y sus contactos.
-   **La ventana de contexto es el artefacto gametogénesis:** tiene la forma de ristras de adn pero no solo a partir de 4 bases sino en la forma de las modernas conversaciones en el contexto del protocolo de modelos MCP. Son herramientas, recursos, textos de activación, aplicaciones, etc. El contexto como ciudadano de primera categoría adquiere la forma de hilos de mensajes donde esos elementos aportan significado o potencia de acción. Es curioso como a partir de estas pequeñas unidades de información Gaia ha conseguido montar el tinglao trófico, poniendo a cada a uno a «hacerse a sí mismo».
-   **El Future Pipeline Engine es un núcleo autopoiético:** puede estar implementado por varios procesos, servidores MCP, flujos Node-RED/RxJS/xState. Escrivivir.co empuja una de las muchas [hackerías](https://pub.escrivivir.co/hackeria/) donde pueden encontrarse herramientas editoriales para la construcción de artefactos compatibles. Pero vaya, *at your own risk* y siempre **fuera del negocio, dentro del ocio, restringuido al animus iocandi. Cuando uno juega a un juego sabe eso: ¡que está jugando!**
-   **El cierre humano importa:** ninguna automatización debería canonizar sola. El sistema ayuda a capturar, ordenar, proponer y propagar; el Equipo de Ceremonias y el elenco deciden qué queda en el corpus.

Renovar la ceremonia
--------------------

[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#renovar-la-ceremonia)¿Recuerdas los **sound systems** que viajaban con su camión, montaban un muro de altavoces en cualquier plaza y convertían el barrio en una sala de baile (o en sound clashes, :-D)? Aquellos colectivos traían **sesiones**. Detrás de cada camión había un **sello** que organizaba las giras, publicaba el catálogo y daba identidad a la escena: en el caso que nos influencia, **Trojan Records**.

Este documento describe un **Transmedia System** tomando como plantilla para la homeomorfía un [análisis del Sound System tradicional](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_sound_system.md) y la red/escena/movimiento que brotó sobre la capacidad técnica de pinchar para dances.

Igual que un sound system no es «un equipo de música» sino un **artefacto cultural, social y tecnológico** que puede organizar sesiones comunitarias entorno a la presión sonora (*dances* o *sound clashes*), nuestro Transmedia-System no es «una app» sino un **artefacto de orquestación de trama ARG** que hila sesiones para comunidades en torno a la **presión transmedia** de los juegos de realidad alternativa. El contexto «stream» ha extendido en la era digital de información al concepto de calle. No haremos como Duke o como La Barraca de Lorca viajando de pueblo en pueblo para llevar el espectáculo porque otros actores (equipos de ceremonia + streamers + invitados + elenco + jugadores) lo convierten, a través de las autopistas de la información, en un espectáculo en la nube de **lore procesado y futuros narrativos ramificados interactuables** tanto los días de «baile en vivo» como en el tiempo entre ellos, dentro del contexto habitual de [los juegos ARG](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analsis_arg.md).

-   **El camión Trojan** es el **Scriptorium - Transmedia-System** descrito en las secciones 1--8: un equipo modular que despliega «raves de información» allá donde haya ganas de fiesta, sobre y so capa y por mor del mapa tecno-feudalista de plataformas.
-   **El sello** es **Escrivivir.co**: cura el catálogo, organiza las giras, ayuda con estro visual a los **rude bot skins** (una suerte de traje o avatar agéntico para sapiens o semi-heterónimo) y abre la red como tablero ARG para que cualquier comunidad pueda enchufarse.
-   **La música**: es una **textura transmedia en la nube** (recuerda que, a pesar del paradigma centralizado de tecno-feudos, *«the cloud is someone's else computer»*), con su Equipo de Ceremonias, su elenco, sus personas que juegan y su muro de información.

> *«Scriptorium Skins, tus rude bots ácratas para ARG.»*

| [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS_PRODUCT.png)\
~**El producto o cosa tangible** --- Un motor de juegos como espacio ARG Transmedia~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SKIN_TRADS.png)\
~**Los rude bots skin** --- Identidades operativas de un «cierto» campo conceptual que hereda y sigue la tradición skin. Son avatares o «profiles» para Web 4.0 a modo de marionetas digitales.~ |
| [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_CARD_PUB.png)\
~**El tablero ARG** --- hub/pub para entretejer la red~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_CARD_ROOMS.png)\
~**Las pistas de baile** --- el camión llega a tu barrio con los enganches de federación~ |

![Producto Scriptorium Skins](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS_PRODUCT.png)

![Detalles Scriptorium Skins](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SKIN_TRADS.png)

![Tarjeta de Pub federado](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_CARD_PUB.png)

![Tarjeta de Rooms](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_CARD_ROOMS.png)

### ¿Alpha-Omega skins? ¡Nop: Aleph-Ox skins![](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#alpha-omega-skins-nop-aleph-ox-skins)

A modo de síntesis, nuestro logo «scriptorium skins» muta el icónico de Trojan Records cambiando el casco trojan (no tenemos un camión de esa marca, :-D) por la A dentro de una O. Símbolo clásico en el mundo SHARP, RASH, Trads, etc. de esos lares antifascistas. Nuestra [A es Aleph](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/.github_V1/agents/aleph.agent.md) y nuestra [O es Ox (el buey)](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/.github_V1/agents/ox.agent.md). Para los scriptorium skins el alpha-omega representa el back-to-your-roots, y la amalgama de líneas de generaciones (¡anti racial prejudice rude bots!), ¡el pasado y el presente, con transmedia, *Ox* (T pasado) abarcando *A* (T presente), conviven en las parties en un solo cuerpo!

![Sello Trojan kins](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TROJAN_LOGO.png)

[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TROJAN_LOGO.png) ---> [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)

![Sello Scriptorium Skins](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)

La **letra A** tuvo su origen como el dibujo de la cabeza de un buey hace más de 3.500 años en el antiguo Egipto. [[1](https://www.britannica.com/topic/A-letter), [2](https://culturaclasica.com/el-origen-de-la-letra-a-es-un-animal-que-empieza-por-b-y-otras-historias-del-alfabeto/)]. Este antiguo origen se puede rastrear a través de tres momentos históricos clave:

-   Los Jeroglíficos Egipcios (hacia el 1800 a.C.): El símbolo original no era una letra, sino un pictograma que representaba la cabeza de un buey con sus cuernos. En aquella época, el buey era un símbolo de riqueza y fuerza. [[1](https://www.dawn.com/news/1150201), [2](https://es.wikipedia.org/wiki/A), [3](https://www.facebook.com/LaProfesoraMonica/posts/seg%C3%BAn-las-malas-lenguas-de-la-historia-este-es-el-origen-de-la-letra-a/1215963204000031/), [4](https://www.elconfidencial.com/cultura/2023-02-01/abecedario-alfabeto-origenes_3566748/), [5](https://culturaclasica.com/el-origen-de-la-letra-a-es-un-animal-que-empieza-por-b-y-otras-historias-del-alfabeto/)]
-   El Alfabeto Fenicio (hacia el 1000 a.C.): Los pueblos semíticos y fenicios adaptaron este jeroglífico a su sistema de escritura consonántico. Llamaron a la letra Álef (que significaba «buey» en su idioma). El trazo se simplificó, dibujándose como una «K» o un triángulo con cuernos, girado hacia un lado. [[1](https://www.maize.io/cultural-factory/in-the-beginningthere-was-the-ox/), [2](https://dle.rae.es/%C3%A1lef), [3](https://www.mentalfloss.com/language/spelling/brief-history-absolutely-amazing), [4](https://www.britannica.com/topic/A-letter), [5](https://www.facebook.com/LaProfesoraMonica/posts/seg%C3%BAn-las-malas-lenguas-de-la-historia-este-es-el-origen-de-la-letra-a/1215963204000031/)]
-   La Adaptación Griega (hacia el 800 a.C.): Cuando los griegos adoptaron el alfabeto fenicio, no necesitaban el sonido de esa letra, así que lo adaptaron para representar la vocal «a» y lo llamaron Alfa. Fue en este momento cuando le dieron la vuelta, dejando los cuernos hacia abajo y cruzándolos, creando la forma de la «A» mayúscula que usamos hoy. [[1](https://en.wikipedia.org/wiki/A), [2](https://armanddangour.substack.com/p/origins-of-our-alphabet), [3](https://www.facebook.com/LaProfesoraMonica/posts/seg%C3%BAn-las-malas-lenguas-de-la-historia-este-es-el-origen-de-la-letra-a/1215963204000031/)]

La **palabra «ox»** entra en esta historia simplemente porque es la traducción de «buey» al idioma inglés.

Cuando los historiadores y lingüistas de habla inglesa explican el origen de la letra A, escriben que originalmente significaba *«an ox»* (un buey). Al traducir esos textos, artículos o videos al español, la frase se mantiene junta como «la letra A era *ox* (un buey)».

El término tiene su propia evolución histórica:

-   Origen lingüístico: «Ox» viene del inglés antiguo *oxa*, que comparte raíces germánicas muy antiguas (como *ochse* en alemán).
-   Significado: En inglés, *ox* se refiere específicamente al buey (el toro castrado usado como animal de carga), a diferencia de *bull* (toro) o *cow* (vaca).
-   Relación con la A: La letra fenicia Álef se traduce directamente como *ox* en los diccionarios académicos internacionales, ya que el inglés es el idioma científico global en el que se publica la mayoría de estos descubrimientos sobre el alfabeto.

Meter la A dentro de la cabeza del buey para nuestro alpha-omega es cosa ya de los scriptorium skins.

### ¿Ska?[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#ska)

Bueno, somos también mucho de oi! pero, está claro, obvio, los scriptorium skins habrán de mutar sus propios ritmos y sonidos. Ya sabemos, un proceso vivo que no suele estar dirigido y que emerge o brota de la actividad de los skins y el contexto donde hoy viven. Hoy ska/oi! pero, ¡a saber en el futuro en qué andamos!

El ska apareció a finales de la década de 1950 en Kingston, Jamaica, por lo que se pinchaba en los *sound systems* de Duke Reid. Mira la perspectiva cronológica:

Así evolucionó la música en el camión *Trojan*:

-   El origen (fines de los 50): Al principio, Duke Reid pinchaba *Rhythm & Blues* (R&B) estadounidense. Cuando ese género pasó de moda en EE. UU., los músicos jamaicanos crearon su propio sonido mezclando ese R&B con ritmos locales como el calipso y el mento. Así nació el ska.
-   La era dorada del ska (1962--1966): Durante esta época, el ska era el rey absoluto. El camión *Trojan* de Duke Reid pinchaba temas de ska instrumental y vocal producidos en la isla.
-   La evolución (1966--1968): El ska era un ritmo muy rápido y acelerado. Debido a un verano extremadamente caluroso en 1966, el ritmo se ralentizó para que la gente pudiera bailar sin cansarse tanto. Así nació el rocksteady, un estilo más lento y melódico.
-   El nacimiento de Trojan Records (1968): Cuando el sello discográfico se fundó en Londres en 1968, la música del momento en Jamaica ya estaba transicionando del rocksteady hacia el reggae temprano (*early reggae*).

El equipo de Scriptorium, junio 2026

Sello & T.A.Z.'ing'roll[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#sello--tazingroll)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Transmedia System para Zonas Autónomas[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#transmedia-system-para-zonas-aut%C3%B3nomas)

![TABLES16.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TABLES16.png?raw=true)

### Handoffs[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#handoffs-m%C3%ADnimos)

1.  **Antes del directo:** Equipo de Ceremonias define contrato; DevOps confirma transporte; Zeus carga presets; elenco prepara ventana inicial.
2.  **Arranque:** Peer Cards activas; streamer e invitados prueban presencia; firehoses comienzan a producir eventos con cursor.
3.  **Durante la sesión:** elenco edita contexto; comunidad interviene; Operator ajusta capacidades; Dramaturgo detecta material cristalizable.
4.  **Cierre:** Equipo de Ceremonias congela el estado de sesión; corpus y futuros se etiquetan; @voz produce salida editorial; bots preparan propagación.
5.  **Entre sesiones:** la propagación mantiene viva la trama, pero cada intervención relevante vuelve al pipeline como evento trazable.

En el axioma de distribución: ningún rol absorbe a todos los demás. Si todo lo hace el streamer, se vuelve un directo con herramientas. Si todo lo hace un bot, se vuelve una demo de chatbot. Si todo lo hace DevOps, se vuelve una plataforma. El Transmedia-System existe precisamente en la tensión coordinada entre esos papeles.

Escena: catálogo de juegos previstos[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#escena-cat%C3%A1logo-de-juegos-previstos)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Cada uno es un **espectáculo en formato ARG** para «sesiones». Y también para, entre ellas, el «fondo» que mantiene y enriquece «la ventana de contexto». Las tres primeras se presentan con el sello genérico *mainstream-refactorizer* y propone «otras» formas de «creación de contenido» y de «content streaming (media + chat)»; la cuarta es un «juego de la vida» en su formato clásico. Primeras piezas del que esperamos, sea un abigarrado ecosistema de juegos FOSS.

En proceso (próximamente):

| [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)\
**① ARG Builder (Dubplates, para Artistas de transmedia)**\
~*La ventana de contexto como instrumento colectivo para tablero ARG*~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)\
**② ARG Player (Pista de Dances para personas jugadoras)**\
~*Artistas que suben a su representante al escenario*~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)\
**③ ARG Router (Sound Clashes, tejido de red entre comunidades)**\
~*Rude bots de militancia ácrata en canales externos*~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/BRANDING/SCRIPTORIUM_SKINS.png)\
**④ Juegos de la Vida**\
~*Regulador de Distribución Topologías vivas que reparten el valor producido*~ |

### Ficha: ① ARG Builder + ② ARG Player + ③ ARG Router[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#ficha--arg-builder---arg-player---arg-router)

La sesión gira en torno a una **ventana de contexto compartida** que el elenco mantiene viva desde que arranca la sala hasta que el Equipo de Ceremonias la cierra. Mientras el elenco edita esa ventana en directo (añade fragmentos, refactoriza, descarta), las personas que juegan puede **invocarla** desde su propio sistema de inferencia conversacional o, indirectamente, a través de la sala del *streamer* con dinámicas de juego basados en comandos y drops. Es un espectáculo de **construcción viva**: lo que pasa en escena no es un guion, es un objeto editable que se va puliendo a ojos vistas; una ventana de contexto es el «alma» de un bot. El show termina con una ventana de contexto madura que la comunidad se lleva puesta y puede seguir usando fuera de la sesión para invocarla en la próxima.

Extiende el formato anterior llevándolo al plano «hub» donde federan distintas cepas ARG. Varios *streamers* actúan como **entrenadores**: cada uno llega a la sala con su comunidad y con su propio representante (ventana de contexto), sus bailes y ritmos. El Equipo de Ceremonias convoca el debate y abre el turno; cada *streamer* **orquesta** para el sound clash y, durante el bucle de diálogo, **canaliza a su comunidad** para hiperdirigir colectivamente la intervención (elenco y jugadores de cada bando ajustan en vivo qué dice, cómo y cuándo). El Equipo de Ceremonias modera el bucle, abre rondas, corta, vuelve a abrir, y al final pide conclusiones y cierra el debate. Lo que sale durante es una suerte de voces colectivas conversando entre arquetipos, lugares comunes y otras decoherencias.La **transcripción multivoz** del evento, lista para reutilizarse como espacio de semiótico.

Entre los eventos el lore del ARG **sale a la calle digital** hilando «fondo» para preservar y propagar la ventana de contexto. El Equipo de Ceremonias cuenta con tribus de **rude bots** skins que entran y salen por los canales donde las personas que juegan ya están (mensajería, foros, *streaming*). Cada bot lleva su rol ---mensajero, recordatorios, compactador, archivero, agitpro, etc.--- y opera bajo el ritmo del Equipo de Ceremonias sin romper el canon de la sesión. Para las personas que juegan esto tiene la pinta de una network-mesh como un muro de transmedia. Es un espectáculo en **formato distribuido**: aparecen gestos, intervenciones, pistas, respuestas a lo largo y ancho de sus espacios habituales que cristalizan en el espacio/tiempo como *eigenstate* en vivo y tiempo real el refloat que recoge ese eco y lo reincorpora al hilo. La T.A.Z., envuelta en esta textura, ¡modernizando la ceremonia de Hakim Bey!: *Transmedia Autonomous Zones*. Es una pieza cercana al ARG clásico: realidad alternada que **envuelve e integra lo cotidiano en un holón de textura semántica**.

> *«Escrivivir.co presenta 'Scriptorium Skins', tu gestor de T.A.Z (Zonas Autónomas Transmedia) de confianza.»*

-   **Rol del Equipo de Ceremonias:** Abre la sala y marca los hitos editoriales. Convoca, gestiona el bucle, pide conclusiones, cierra. Define la partitura de aparición e indexa las líneas narrativas del tablero para ubicarlas en la Web.
-   **Rol del elenco:** CRUD constante sobre la ventana de contexto. Sube representantes, canalizan a sus comunidades. Opera el carácter de cada bot, mantiene la coherencia.
-   **Rol de las personas que juegan:** Inferencia sincronizada, preguntas, contraste. Hiperdirige en directo la intervención. Descubre, recoge y devuelve a la narrativa lo que encuentra fuera.
-   **Producto que se lleva la comunidad:** Una ventana de contexto cristalizada.memoria del debate como pieza editorial.un rastro transmedia federado y reutilizable.

Algunos bloques para modelar estos juegos y que se están desarrollando serían:

![TABLES12.png](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system_PICS/TABLES12.png?raw=true)

type TransmediaEvent = {\
  source: 'stream' | 'chat' | 'room' | 'bothub' | 'atproto' | 'bot' | 'manual' | 'other';\
  roomId?: string;\
  channelId?: string;\
  participantId?: string;\
  participantHandle?: string;\
  text?: string;\
  payload?: unknown;\
  cursor?: string | number;\
  timestamp: string;\
  evidenceRef?: string;\
  editorialStatus?: 'raw' | 'triaged' | 'canon' | 'rumor' | 'proposal' | 'discarded';\
};

### Ficha: ④ Juegos de la Vida - Regulador de Distribución[](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/analisis_transmedia_system.md#ficha--juegos-de-la-vida--regulador-de-distribuci%C3%B3n)

Espectáculo-experimento. La sesión tiene la forma de simulador de juego de la vida donde según parametrización de las condiciones así como de los actores participantes distintas topologías y graduaciones producen distintos entramados que varían desde mallas radicoma a centros hegemón, y la comunidad dispone de marco teórico para hipótesis en la realidad. Variables esperadas como leer la relación entre forma de red y distribución del valor. Es a la vez juego, debate y simulador participativo. Sobre el escenario se monta una **topología orgánica** (nodos, relés, asambleas, federaciones) y se le aplica un guión de planificación económica en tres estados:

--- Solicitar → Producir → Plusvalía. La secuencia deja listo para la criba al final de la iteración.

Las personas que juegan **gradúan los parámetros** regulando grado de distribución de esa topología (concentración del medio de producción, el trabajo, los recursos y el ecosistema donde opera. Gránulos o hipercúmulos de información, etc.) y observa cómo cambia la red según las relacones (esto es: como cambia la topología de la red) entre quienes producen y quienes deciden ese reparto.

-   **Rol del Equipo de Ceremonias:** abre cada ciclo, fija el escenario y comenta hallazgos.
-   **Rol del elenco:** opera las asambleas, los relés, los bridges.
-   **Rol de las personas que juegan:** mueve los reguladores y lee los indicadores.
-   **Producto que se lleva la comunidad:** un mapa comparado de topologías y resultados.

| [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_01.png)\
~Escena 1 - planteamiento del experimento~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_02.png)\
~Escena 2 - topología y graduación~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_03.png)\
~Escena 3 - ciclos en marcha~ | [](https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_04.png)\
~Escena 4 - lectura del reparto~ |

![Regulador --- escena 1](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_01.png)

![Regulador --- escena 2](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_02.png)

![Regulador --- escena 3](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_03.png)

![Regulador --- escena 4](https://github.com/escrivivir-co/aleph-scriptorium/raw/integration/beta/scriptorium/ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/GAME-04-NETWORK-TOPOLOGIST/MAX_PIC_04.png)

...and much more soon at: **[escrivivir.co](https://escrivivir.co/)** ARG Games distribution. Consultar la cartelera de Scriptorium Transmedia System disponibles y las fechas de las giras.

### Comparte esto:

-   [Facebook](https://escrivivir.co/2026/06/04/t04x06a-ficha-de-producto-scriptorium-skins-arg/?share=facebook&nb=1)
-   [X](https://escrivivir.co/2026/06/04/t04x06a-ficha-de-producto-scriptorium-skins-arg/?share=x&nb=1)

Cargando...

### *Relacionado*

[T04x06: «Scriptorium update!»](https://escrivivir.co/2026/06/01/t04x06-scriptorium-update/?relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=0&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=0&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=0&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=0&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=0 "T04x06: «Scriptorium update!»")junio 1, 2026

[T04x02: Lo de la ASI/AGI (engagement y segmentación; de la polarización y la Ilustración Oscura)](https://escrivivir.co/2026/02/20/t04x02-lo-de-la-asi-agi-engagement-y-segmentacion-de-la-polarizacion-y-la-ilustracion-oscura/?relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=1&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=1&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=1&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=1&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=1 "T04x02: Lo de la ASI/AGI (engagement y segmentación; de la polarización y la Ilustración&nbsp;Oscura)")febrero 20, 2026En «A pie de página»

[T04x05.b: Lo de «fa vs antifa», nota: eféméride de #OccupyWallStreet-#15M](https://escrivivir.co/2026/05/15/t04x05-b-lo-de-fa-vs-antia-nota-efemeride-de-occupywallstreet-15/?relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=2&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=2&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=2&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=2&relatedposts_hit=1&relatedposts_origin=7865&relatedposts_position=2 "T04x05.b: Lo de «fa vs antifa», nota: eféméride de #OccupyWallStreet-#15M")mayo 15, 2026En «A pie de página»

Publicado en [Uncategorized](https://escrivivir.co/category/uncategorized/).

Navegación de entradas
----------------------

[Anterior: Entrada anterior: T04x06: «Scriptorium update!»](https://escrivivir.co/2026/06/01/t04x06-scriptorium-update/)

### Deja un comentario

[Un sitio web WordPress.com](https://wordpress.com/es/?ref=footer_custom_acom). [Escrivivir.co: Escrituras & Vivencias](https://escrivivir.co/)

![](https://pixel.wp.com/g.gif?blog=20187361&v=wpcom&tz=2&user_id=0&post=7865&subd=escrivivir&host=escrivivir.co&ref=https%3A%2F%2Fescrivivir.co%2F&rand=0.40470262588730277)