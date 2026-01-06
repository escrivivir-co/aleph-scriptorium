# Aleph Scriptorium — entorno integrado agéntico

Del procesador de textos tradicional (Word + Clippy) al entorno de escritura asistida ([Aleph Scriptorium](README.md) + [@ox](.github/agents/ox.agent.md)).

> **Tipo**: Blueprint de Producto (Opportunities)  
> **Versión**: 1.1.0  integration/beta/scriptorium  
> **Última revisión**: 2026-01-06

---

Indice de contenidos:

- Parte I: El escritorio
- Parte II: La escritura
- Parte III: El escribir
- Parte II: El escritor
- Referencias 

## Parte I: El escritorio

### 1. Breviario para anuncio

| Era | Herramienta | Asistente | Limitación |
|-----|-------------|-----------|------------|
| **1995** | Word | Clippy | Sugerencias genéricas |
| **2026** | [Aleph Scriptorium](README.md) | [@ox](.github/agents/ox.agent.md) | Oráculo agéntico: tus sugerencias |

**Diferencia fundamental**: Clippy ofrecía tips predefinidos. Tú creas y diseñas a Ox para que orqueste a los agentes según tus flujos y procesos cotidianos. Eso sí, ¡tendrás que aprender a hablar con Ox, https://code.visualstudio.com/docs/debugtest/debugging#copilot-guides-articles, :-D!

 Una herramienta de escritura que se adapta al escritor, no al revés.

### 2. Producto Mínimo Viable (software + configuración como infraestructura )

La elección de **VS Code** no es arbitraria. Es un editor FOSS extensible que también funciona como servidor web ([code-server](https://github.com/coder/code-server)), permitiendo el mismo entorno en escritorio o navegador. Su marketplace de extensiones es el ecosistema más grande para herramientas de desarrollo.

https://code.visualstudio.com/api

Extensión **[GitHub Copilot Chat](CopilotEngine/README.md)** (https://code.visualstudio.com/docs/copilot/overview) aporta el motor conversacional. Internamente, Copilot construye un *system message* que combina las instrucciones del usuario ([copilot-instructions.md](.github/copilot-instructions.md)) con el contexto del workspace. El submódulo [CopilotEngine](CopilotEngine/) es una captura de la extensión mantenida por Microsoft para que puedas entender —y eventualmente modificar— cómo piensa tu asistente.

Sobre esta base, Scriptorium añade otras extensiones:

https://code.visualstudio.com/api#creating-your-own-extension

**[Arrakis Extension](VsCodeExtension/README.md)** es la interfaz visual del Scriptorium. Sus tres paneles (Settings, CMD, MENU) exponen la configuración, comandos y servicios. Para amantes de lo que "surge" cuando lo invocas, Lo mejor de las UIs que "aparecen"; y para los amantes de deslizarse en miles de menús anidados. La extensión, abierta, se puede personalizar con "flavours" según el tipo de proyecto y el área técnica.

> **Curva de aprendizaje**: Si usas VS Code, ya tienes el 70% del camino recorrido. Scriptorium añade agentes y paneles, no reemplaza el editor.

### 3. Arquitectura de SDKs

Aleph Scriptorium es una suite de código y configuraciones que se reparte en distintos ámbitos y ubicaciones. En un balance entre:

a) Código dentro de la Vs Code Extension
b) Código para la codebase/copilot (.github)
c) Código para gestión del workspace (.vscode)
c) Código para gestión de los almacenes: ARCHIVO + DISCO.
d) Submodulos

La tendencia es a mover el máximo posible de código a la colección de proyecto "alephscript" con librerías npm modulares. [MCPGallery](MCPGallery/README.md):

| SDK | Función |
|-----|---------|
| [mcp-core-sdk](MCPGallery/mcp-core-sdk/) | Primitivas MCP base |
| [mcp-mesh-sdk](MCPGallery/mcp-mesh-sdk/) | Red mesh de servidores MCP |
| [mcp-inspector-sdk](MCPGallery/mcp-inspector-sdk/) | Servicio de logística de la mesh |
| [mcp-model-sdk](MCPGallery/mcp-model-sdk/) | Servicio de modelos IA |

### 4. Instalación y Estructura

Scriptorium es un repositorio Git con [submódulos](.gitmodules) opcionales. Puedes instalar todo de golpe:

```bash
git clone https://github.com/escrivivir-co/aleph-scriptorium
git submodule update --init --recursive
```

O ir añadiendo capacidades según las necesites. Esta es la filosofía central: **el editor se adapta al escritor, no al revés**.

#### Submódulos → Plugins → Tu Scriptorium

Estrategia de ampliación ad hoc: 

a) Trae una herramienta agregándola como submodulo. Ponla a punto.
b) Mapea con un plugin la funcionalidad para sumarla al scriptorium. Sigue pautas generales o crea tu propio camino.

Cada submódulo es una herramienta externa (un editor, un servidor, una librería). El [sistema de plugins](.github/PLUGINS.md) la integra al ecosistema de agentes.

El [scriptorium-pack](.github/plugins/scriptorium-pack/) viene preinstalado como base. A partir de ahí, tú decides qué añadir: ¿necesitas lógica simbólica? Activa [prolog-editor](.github/plugins/prolog-editor/). ¿Producción narrativa? [novelist](.github/plugins/novelist/). Con el tiempo, tu instalación refleja tu forma de trabajar.

```
Abre el IDE VsCode
    ├── Workspace                       -> workspace-config.json
    └── Setup                           -> scripts\setup-workspace.sh    
     ↓
Submódulo (herramienta externa)
    ├── prompt: .github/prompts/as_instalar_submodulo.prompt.md
    └── git                             -> .gitmodules
     ↓
Plugin (mapea la herramienta) 
     ├── prompt: .github/prompts/as_plugin-install.prompt.md
     └── registro:                      -> .github\plugins\registry.json
     ↓
Diseña y configura
     ├── Agente bridge (@plugin_ox_*)   -> .github/agents
     ├── Copilot Locations              -> .vscode/settings.json
     ├── Datos                          -> ARCHIVO/PLUGINS/{ID}
     └── Sistema                        -> .github/plugins/{ID}
        ├── Manifest
        ├── Instrucciones
        ├── Prompts
        ├── Agentes
        ├── ...
        └── Esquemas
     ↓
Integra o crea una UI para el plugin
     └── Hacker Panels                  -> VsCodeExtension\src\views
     ↓
Tu Scriptorium (único)
```

#### Arquitectura DRY

Dos principios organizan el contenido:

**Separación de memorias**: [ARCHIVO](ARCHIVO/) contiene texto clasificado y permanente (enciclopedias, novelas, documentación). [DISCO](ARCHIVO/DISCO/) contiene datos crudos y trabajo en progreso (sesiones, borradores, snapshots). Esta distinción evita mezclar material publicable con notas de trabajo.

**Índices únicos**: [Funcional.md](ARCHIVO/Funcional.md) documenta qué puede hacer el sistema. [Tecnico.md](ARCHIVO/Tecnico.md) documenta dónde está cada componente. Los plugins y agentes consultan estos índices en lugar de duplicar información.  Criterio Don't Repeat Yourself.

#### Github Copilot Chat y el Context Bloat

##### Github Copilot Chat

El trabajo agéntico con modelos, en nuestro entorno, pasa por 3 momentos:

Ver ./docs/blueprint-copilot.md

Cuando se envía un mensaje:

- Herramientas MCP disponibles
- Mensajes de Sistema
- Datos de Contexto
- Caché
- Intención de usuario

Mientras el modelo trabaja:

- Consola de Github Copilot Chat en la salida OUTPUT de https://code.visualstudio.com/docs/debugtest/debugging, para ver cómo funciona por dentro la comunicación con el modelo
- Ouput en la ventana de chat: https://code.visualstudio.com/docs/copilot/copilot-smart-actions#copilot-chat-articles
- Verás (con git) el trabajo en la codebase: https://code.visualstudio.com/docs/sourcecontrol/overview

##### El context bloat

Cada modelo tiene un coste y también un **tamaño máximo de contexto**. Cuando más contexto se añade a una consulta más tarda, más cuesta pero más precisas y certera será.

Microsoft ya agrega un **capa de contexto con mensajes de sistema**. Este es un primera handicap para Aleph Scriptorium que está pendiente: fork de la extensión (CopilotEngine) para poder customizar con "flavours" de mensajes-sistema no especificos de coding. Falta investigar si también hay que cambiar el endpoint de los modelos porque sea uso no autorizado.

Cuando se hace una consulta y el modelo responde, empieza un hilo: "conversación". Vs Code implementa una **función de "resumir y continuar"**. Esto hace que la ventana de contexto se vaya moviendo comprimiendo el pasado y dejando sitio para el presente. Aquí Microsoft también agrega para **mensajería de sistema** para la operativa, dando preferencia al final de la conversacion, y operando con los **"restore" y "edit"** que el usuario puede hacer en el chat. Instrucciones de sistema para guardar lo deshecho como ejemplo de "qué no hacer". Internamente, **cachea documentos frecuentes** que suelen acompañar todas las interacciones. Este es el segundo punto abierto de este proyecto, relacionado con lo anterior. ¿Hasta que punto es posible extraer esta lógica y exponerla para que el usuario pueda incluirla en su "flavour"?

La CopilotEngine carga en el chat todos los dominios (agentes, prompts e instrucciones) que estén en la carpeta .github de la raíz. ¡Según donde abras el workspace de Vs Code aparecerán unos u otros! No es lo mismo abrir la carpeta de la raíz que una de un plugin concreto!

Cuando se opera desde la raíz, los dominios de plugins se cargan usando las **"Localizaciones"** (no implementado para agentes) de .vscode/setting.json.

Aleph Scriptorium usa **Don't Repeat Yourself** para cargar en el contexto índices que funcionan como las herramientas MCP. El modelo reciba una lista de "disponibles" como índice, y si quiere usarlas tendrá que pedirlo. El sistema DRY hace lo mismo con la información de contexto, enlaces en lugar de cargar ficheros enteros.

**El sistema de instrucciones** funciona mediante filtros de "apply" que especifican que patrones de nombres y extensiones de ficheros son objetivo. Cuando en la conversación se añade como contexto un fichero que hace saltar el filtro, Copilot carga esas instrucciones en el contexto.

Según diseño, todo empieza en: [copilot-instructions.md](.github/copilot-instructions.md), el primer archivo de **instrucciones globales**. A partir de aquí, ¡tú decides qué cargas en el Contexto! 

Con el uso de Scriptorium, el escritor podrá usar la capacidad de los agentes para **"auto-reflexión"** (.github/plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md") para aprender con el modelo qué pasa por debajo cuando el usuario y el agente hablan y así aprender cómo redirigirlo al gusto.

###### Contexto (MCP)

https://modelcontextprotocol.io/docs/getting-started/intro MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems. 

Aleph Scriptorium intenta sacar el máximo partido de estos conectores para el contexto y, nuevamente, será responsabilidad del escritor vigilar y controlar cómo se integra, especialmente en 3 puntos:

**Herramientas configuradas en los agentes**: https://code.visualstudio.com/api/extension-guides/ai/mcp. Es resonsabilidad del usuario arrancar los servidores MCP en el launcher y, según uso y necesidad, arrancarlos en .vscode/mcp.json. Una vez en línea, el usuario escoge y mantiene lo más pequeña posible la lista de herramientas disponible.


### 5. Configuración y Acceso

Tres capas de personalización:
- **VS Code**: [.vscode/settings.json](.vscode/settings.json) — Editor base. https://code.visualstudio.com/api/ux-guidelines/settings.
- **Copilot Chat**: https://code.visualstudio.com/docs/copilot/chat/copilot-chat
- **Arrakis **: [ArrakisTheater_OperaConfig.json](VsCodeExtension/ArrakisTheater_OperaConfig.json) — Panel Settings


Diseña e integra en el IDE tus barras de herramientas y paneles de acceso. https://code.visualstudio.com/api/ux-guidelines/views. Añade QuickPicks: https://code.visualstudio.com/api/ux-guidelines/quick-picks a tus datos habituales.


#### Hacker Panels

Crea paneles a partir de plantillas: https://code.visualstudio.com/api/ux-guidelines/panel

VsCodeExtension\src\views\BaseHackerPanelProvider.ts

##### Config (Hacker Panel)

De un lado las configuraciones del entorno integrado para la operativo del escritor con sus herramients y del otro la nueva configuración específica para permitir que los agentes interaccionen con el sistema y la codebase. Scriptorium te las desvela y pone a mano en plantillas de expertirse para fácil control y supervisión.

VsCodeExtension\src\views\HackerConfigPanelProvider.ts

##### CMD (Hacker Panel)

Ten un directorio de esos comandos invisibles que están ahí pero a veces no encuentras: 

VsCodeExtension\src\views\HackerCommandPanelProvider.ts

##### UIs (Hacker Panel)

Ten a mano y en catálogo las urls de tus apps:

VsCodeExtension\src\views\HackerControlPanelProvider.ts

### 6. Entorno híbrido: usuario + agentes

- **VS Code Commands**: Paleta de comandos (`Ctrl+Shift+P`)
- **Arrakis  CMD Panel**: Catálogo Comandos contextuales 
- **Agentes**: [handoffs](.github/agents/AGENTS.md) entre agentes especializados

### 7. Panel de servicios y apps

Operar un sistema dinámico es una cuestión pandemónica. Crear un sistema que pueda usar tanto el usuario como el agente permite delegar o asumir al gusto la gestión.

#### Arrancar Tasks
Explicar feature de vs code y comando para run tasks con el picker nativo de la ui. https://code.visualstudio.com/docs/debugtest/tasks y el fichero .vscode/task.json.

Presentar el catálogo completo de nuestras tasks agrupadas por nombre.

Se puede pedir al agente que ejecute la task y que la monitorice, o arrancarlas manualmente.



### 8. Model Context Protocol (MCP)

El protocolo que permite integrar al usuario con el IDE con los agentes con los datos y servicios es https://modelcontextprotocol.io/docs/getting-started/intro.

Protocolo estándar : `tools` + `resources` + `templates` + `prompts` + `sampling`.

Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems.

#### Servidores de terceros

https://code.visualstudio.com/docs/copilot/customization/mcp-servers

#### Servidores Scriptorium
En Aleph Scritporium se pueden conectar servers en VsCode o propios de nuestra mesh. .vscode\mcp.json

Servidores MCP en [mcp-mesh-sdk](MCPGallery/mcp-mesh-sdk/src/): mcp-scriptorium-servers-pack

| Servidor | Puerto | Archivo |
|----------|--------|---------|
| [Launcher](MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts) | 3050 | Orquestación |
(catálogo completo)

##### Arrancar/Parar servidores MCP

El servidor MCP Launcher es un hub centralizado para lanzar otros MCP servers.

Los agentes pueden usar la operativa de gestión de servidores en el launcher para arrancar, monitorizar o interactuar con los servicios.

##### Operar con los servicios a través de MCP

Los MCP Servers de la mesh se comunican con clientes a las funcionalidades de  REST o ASYNC con otros servicios de los submodulos. Ver por ejemplo PrologEditor.


##### Monitorizar, inspeccionar operar servidores MCP

De igual forma, el usuario puede usar el MCPGallery\mcp-inspector-sdk para plena gestión.

## Parte II: La escritura

### 1. Diseño Ontológico

[OnthologyEditor](OnthologyEditor/README.md) para modelar dominios:

| Paradigma | Ubicación | Propósito |
|-----------|-----------|-----------|
| [Flove](OnthologyEditor/FloveDocs/) | Taxonomías triádicas | Conceptualización |
| [MMCO](OnthologyEditor/MMCO/) | Modelado de realidad | Simulación |
| [Metamodel](OnthologyEditor/metamodel/) | Estructuras formales | Especificación |

### 2. Tipos y Presets

Flujo de diseño ScriptoriumPacks:
1. **[TypedPrompting](TypedPromptsEditor/README.md)**: Creación de esquemas y tipado. Validadores.
2. **[MCPPresets](.github/plugins/mcp-presets/)**: Librería/catálogo/configurador de packs/selector e instalador de packs.
3. **[HypergraphEditor](WiringAppHypergraphEditor/)**: Diseño visual de operativas. Diseño de operativas sobre BOEs (arg-board) o con el Editor de Hypergrafos.

Plugin: [typed-prompting](.github/plugins/typed-prompting/) | Datos: [TYPED_PROMPTING](ARCHIVO/PLUGINS/TYPED_PROMPTING/)

### 3. Especificación de APIs, UML, MCP,...

Para especificar la logica de negocio y los flujos de comunicación.

[OpenAsyncAPI Editor](.github/plugins/openasyncapi-editor/):
- **OpenAPI**: REST endpoints ([specs](ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/))
- **AsyncAPI**: Eventos y mensajería
- **MCP**: Model Context Protocol
- **UML**: Casos de uso y relacionales
- Otros
- Generación de código desde especificaciones
- Caso de ejemplo: ARCHIVO\PLUGINS\OPENASYNCAPI_EDITOR\specs\PrologEditor (detallar specs por "tipo")

### 4. Editores de Lógica

Los ScriptoriumPacks pueden ser exportados a editores especializados que podrán inicializar sus taxonomías con tipos básicos en paletas para luego definir lógica sabiendo que será compatible con todo el ecosistema Scriptorium.

| Editor | Submódulo | Plugin | Paradigma |
|--------|-----------|--------|-----------|
| [BlocklyEditor](BlocklyEditor/) | ✓ | [blockly-editor](.github/plugins/blockly-editor/) | Bloques visuales |
| [PrologEditor](PrologEditor/) | ✓ | [prolog-editor](.github/plugins/prolog-editor/) | Lógica simbólica |
| [WiringEditor](WiringEditor/) | ✓ | [wire-editor](.github/plugins/wire-editor/) | Flujos Node-RED |
| [AAIAGallery](AAIAGallery/) | ✓ | — | Agentes AlephScript |
| [WorkflowEditor](WorkflowEditor/) | ✓ | — | Workflows BPMN |

### 5. Compilación lógicas

**Del Editor a la Runtime**: "Explicar flujo de 2 UIs en Blockly"
**En Runtime: del agente al servicio**: "Explicar uso de PrologAgentBrainPack en Lucas"


```
┌────────────────────────────────────────────────────────────────────┐
│                    SCRIPTORIUM BRAINS PIPELINE                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  OnthologyEditor ──→ TypedPrompting ──→ MCPPresets                 │
│        │                   │                 │                     │
│        ▼                   ▼                 ▼                     │
│  ┌──────────┐       ┌───────────┐     ┌───────────┐                │
│  │  FLOVE   │       │  Schemas  │     │  Presets  │                │
│  │  MMCO    │       │  .json    │     │  .yaml    │                │
│  └──────────┘       └───────────┘     └───────────┘                │
│                            │                 │                     │
│              ┌─────────────┴─────────────────┘                     │
│              ▼                                                     │
│  ┌─────────────────────────────────────────────────┐               │
│  │              EDITORES DE LÓGICA                 │               │
│  ├─────────────────────────────────────────────────┤               │
│  │ BlocklyEditor │ PrologEditor │ WiringEditor     │               │
│  │      ↓              ↓              ↓            │               │
│  │   Bloques      Predicados      Flujos           │               │
│  └─────────────────────────────────────────────────┘               │
│                            │                                       │
│                            ▼                                       │
│              ┌─────────────────────────┐                           │
│              │  ScriptoriumBrainsPacks │                           │
│              └────────────┬────────────┘                           │
│                           │                                        │
│         ┌─────────────────┼─────────────────┐                      │
│         ▼                 ▼                 ▼                      │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐                  │
│  │AgentCreator│   │ ARG Board  │   │  Novelist  │                  │
│  │ Personajes │   │   Apps     │   │ Narrativa  │                  │
│  └────────────┘   └────────────┘   └────────────┘                  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 6. Creación de Agentes

AgentCreator. Multiplexa brains de varios origenes en los personajes publicando su ficha de personaje e interfaz de operativa con los brains. Enriquecidos con AgentLoreSDK, plugin-Enciclopedia, conectado a fuentes de scraping .github\plugins\foro-scraper, agentes de la codebase, etcétera.


[AgentCreator](.github/plugins/agent-creator/) multiplexando fuentes:

| Fuente | Ubicación | Aporta |
|--------|-----------|--------|
| Brains (Prolog, Blockly...) | Editores §12 | Capacidades lógicas |
| [AgentLoreSDK](AgentLoreSDK/) | Submódulo | Plantillas de agentes |
| [Enciclopedia](.github/plugins/enciclopedia/) | Plugin | Conocimiento estructurado |
| [ForoScraper](.github/plugins/foro-scraper/) | Plugin | Fuentes externas |

Output: Personajes en [TALLER/ELENCO](ARCHIVO/DISCO/TALLER/ELENCO/)

## Parte III: El escribir

Aleph Scriptorium es un sistema ideal para "streamers" e "influencers" permitiéndoles gozar de la solidez e inmediatez del versionado semántico del bucle DevOps de CD/CI con sus obras y actuaciones o presencia en la red. Pudiendo diseñar sesiones en el escritorio y reproducirlas en directo. El scriptorium cubre las fases del proceso desde la "idea" hasta "los aplausos" o "likes".

### 1. Producción Narrativa Agéntica

NovelistEditor. Uso de personajes con brain invocables en la narrativa mediante llamadas según el texto de la novela. Uso de los agentes de scriptorium para que recaben información en ENCICLOPEDIAS o scraping de fuentes conectadas. Gestión y mantenimiento del ARCHIVO separado de DISCO (el "archivo" es texto tratado y clasificiado, el DISCO es un soporte de datos de donde nutrirse) para redacción de textos posicionados, etc.


[NovelistEditor](NovelistEditor/):
- Personajes con brains invocables durante la redacción
- Agentes que investigan en [ENCICLOPEDIA](ARCHIVO/ENCICLOPEDIA/)
- Gestión de [ARCHIVO](ARCHIVO/) (texto clasificado) vs [DISCO](ARCHIVO/DISCO/) (datos crudos)

Plugin: [novelist](.github/plugins/novelist/) | Datos: [NOVELIST](ARCHIVO/PLUGINS/NOVELIST/)

### 2. Conversión de la narrativa agéntica en transmedia

Creación de .github\plugins\arg-board-app, apps. Teatro-Arg-board --> UIs + Webs conectadas --> Invocación en tiempo real a las runtimes de los brains según cada una. El BlockchainComPort permite publicar la trama en la red.

[Teatro ARG](.github/plugins/teatro/) + [ARG Board App](.github/plugins/arg-board-app/):
- UIs web interactivas con brains en tiempo real
- [WiringAppHypergraphEditor](WiringAppHypergraphEditor/) para apps conectadas
- [BlockchainComPort](BlockchainComPort/) para publicar tramas en red P2P

### 3. Proyección de narrativa transmedia en linea

 Web base: gh-pages. Secciones: plugin-periodico, plugin-teatro --> Genera contenido como autor y mantén frontales actualizados (Github Actions -> Azure Extension "Euler Scriptorium")

[GitHub Pages](docs/) con Jekyll:
- [Plugin Periódico](.github/plugins/scriptorium-pack/instructions/periodico.instructions.md): Producción noticiosa
- [Plugin Teatro](.github/plugins/teatro/): Contenido interactivo
- GitHub Actions → Azure "Euler Scriptorium" --> .github\workflows\pages.yml
Ver: [docs/_config.yml](docs/_config.yml) | [demo.md](docs/demo.md)

### 4. Uso de narrativa transmedia en Streaming con Apps conectadas

Aleph Scriptorium es un sistema ideal para "streamers" e "influencers" permitiéndoles gozar de la solidez e inmediatez del versionado semántico del bucle DevOps de CD/CI con sus obras y actuaciones o presencia en la red. Pudiendo diseñar sesiones en el escritorio y reproducirlas en directo.

- [StreamDesktop](StreamDesktop/) — Pantalla de teatro con streaming
- [StreamDesktopAppCronos](StreamDesktopAppCronos/) — Gestión temporal
- Apps creadas con [WiringAppHypergraphEditor](WiringAppHypergraphEditor/)

---

## Parte II: El escritor

Sesiones en [GitHub Copilot Chat](CopilotEngine/README.md):

### 1. IDE Clásico

https://code.visualstudio.com/docs/setup/setup-overview

Operaciones estándar de VS Code:
- Explorador de archivos ([workspace-config.json](workspace-config.json))
- Edición con IntelliSense
- Búsqueda en workspace (`Ctrl+Shift+F`)
- Terminal integrada
- Smart Actions: https://code.visualstudio.com/docs/copilot/copilot-smart-actions

### 2. Sistema de Agentes

https://code.visualstudio.com/docs/copilot/customization/mcp-servers#copilot-agents-articles

| Componente | Ubicación | Función |
|------------|-----------|---------|
| [Agentes](.github/agents/) | `.github/agents/*.agent.md` | Especialistas por dominio |
| [Handoffs](.github/agents/AGENTS.md) | (shortcuts) Tabla de delegación | Navegación entre agentes |
| [Prompts](.github/prompts/) | Plantillas reutilizables | Flujos predefinidos |
| [Instrucciones](.github/plugins/*/instructions/) | Por plugin | Reglas contextuales |

Agentes principales: [@ox](.github/agents/ox.agent.md) (oráculo), [@aleph](.github/agents/aleph.agent.md) (productor), [@scrum](.github/plugins/scrum/agents/scrum.agent.md) (proceso)

### 3. Protocolos Multi-Agente

Coordinación de agentes en tareas complejas:

| Protocolo | Instrucción | Uso |
|-----------|-------------|-----|
| [Cotrabajo](.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md) | Sesiones colaborativas | Épicas multi-etapa |
| [Scrum](.github/plugins/scrum/instructions/scrum-protocol.instructions.md) | Modelo Generativo | Planificación |
| [Auto-reflexión](.github/plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md) | Optimización de tokens | Sesiones largas |

Sesiones activas en: [SESIONES_COTRABAJO](ARCHIVO/DISCO/SESIONES_COTRABAJO/)

### 4. Auto-Reflexión y Métricas

Gobernanza tripartita ([@ox](.github/agents/ox.agent.md), [@indice](.github/agents/indice.agent.md), [@scrum](.github/plugins/scrum/agents/scrum.agent.md)):

| Métrica | Herramienta MCP | Umbral |
|---------|-----------------|--------|
| `healthScore` | `get_usage_metrics()` | ≥70 verde |
| `cacheHitRate` | `analyze_session()` | ≥30% |
| Snapshots | `capture_snapshot()` | Cada 30-60 min |

Ver: [auto-reflexion.instructions.md](.github/plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md)

### 5. Invocación de Plugins

[22 plugins](.github/plugins/) instalados, accesibles via bridges `@plugin_ox_*`:

| Categoría | Plugins |
|-----------|---------|
(completar con lista real)

Registro: [registry.json](.github/plugins/registry.json)

### 6. Despliegue de Servicios

[Tasks](.vscode/tasks.json) para servicios y Apps:

| Stack | Puertos | Task |
|-------|---------|------|
(completar con lista real)

---

## Referencias 

| Documento | Propósito |
|-----------|-----------|
| [README.md](README.md) | Visión general |
| [DEVOPS.md](.github/DEVOPS.md) | Metodología y commits |
| [PLUGINS.md](.github/PLUGINS.md) | Protocolo de extensiones |
| [AGENTS.md](.github/agents/AGENTS.md) | Índice de agentes |
| [BACKLOG-SCRIPTORIUM.md](.github/BACKLOG-SCRIPTORIUM.md) | Estado del proyecto |
| [roadmap.md](docs/roadmap.md) | Épocas de desarrollo |
