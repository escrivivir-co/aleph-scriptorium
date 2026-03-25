# Aleph Scriptorium — Entorno Integrado Agéntico

Del procesador de textos tradicional (Word + Clippy) al entorno de escritura asistida ([Aleph Scriptorium](README.md) + [@ox](.github/agents/ox.agent.md)).

> **Tipo**: Blueprint de Producto (Opportunities)  
> **Versión**: 1.1.0 — `integration/beta/scriptorium`  
> **Última revisión**: 2026-01-06

---

## Índice de Contenidos

- [Parte I: El Escritorio](#parte-i-el-escritorio) — Infraestructura y configuración
- [Parte II: La Escritura](#parte-ii-la-escritura) — Diseño y lógica
- [Parte III: El Escribir](#parte-iii-el-escribir) — Producción y publicación
- [Parte IV: El Escritor](#parte-iv-el-escritor) — Operativa diaria
- [Referencias](#referencias)

---

## Parte I: El Escritorio

### 1. Breviario

| Era | Herramienta | Asistente | Paradigma |
|-----|-------------|-----------|-----------|
| **1995** | Word | Clippy | Sugerencias genéricas predefinidas |
| **2026** | [Aleph Scriptorium](README.md) | [@ox](.github/agents/ox.agent.md) | Oráculo agéntico: un agente para orquestarlos a todos |

**Diferencia fundamental**: Clippy ofrecía tips predefinidos. Tú creas y diseñas a Ox para que orqueste a los agentes según tus flujos y procesos cotidianos.

> 💡 Una herramienta de escritura que se adapta al escritor, no al revés.

Para aprender a hablar con los agentes: [VS Code Copilot Guides](https://code.visualstudio.com/docs/copilot/overview), :-D.

---

### 2. Producto Mínimo Viable: Scriptorium

La elección de **VS Code** no es arbitraria. Es un editor FOSS extensible que también funciona como servidor web ([code-server](https://github.com/coder/code-server)), permitiendo el mismo entorno en escritorio o navegador. Su marketplace de extensiones es el ecosistema más grande para herramientas de desarrollo.

→ [VS Code API](https://code.visualstudio.com/api)

#### Motor Conversacional

La extensión **[GitHub Copilot Chat](CopilotEngine/README.md)** aporta el motor conversacional. Internamente, Copilot construye un *system message* que combina las instrucciones del sistema ([copilot-instructions.md](.github/copilot-instructions.md)) con las del contexto del workspace y el prompt de usuario.

El submódulo [CopilotEngine](CopilotEngine/) es una captura de la extensión mantenida por Microsoft para que puedas entender —y eventualmente modificar— cómo piensa tu asistente. Y, además, para que el asistente pueda ver cómo es por dentro.

→ [Copilot Overview](https://code.visualstudio.com/docs/copilot/overview)

Sobre esta base, Scriptorium añade otras extensiones:

#### Extensión Arrakis

**[Arrakis Extension](VsCodeExtension/README.md)** es la interfaz visual del Scriptorium. Sus tres paneles (Settings, CMD, MENU) exponen la configuración, comandos y servicios.  

Para amantes de lo que "surge" cuando lo invocas: lo mejor de las UIs que "aparecen"; y para los amantes de deslizarse en miles de menús anidados: añade y refactoriza los paneles que necesites para tu día a día. 

La extensión se puede personalizar con "flavours" según el tipo de proyecto y el área técnica.

→ [Creating Extensions](https://code.visualstudio.com/api#creating-your-own-extension)

> **Curva de aprendizaje**: Si usas VS Code, ya tienes el 70% del camino recorrido. Scriptorium añade agentes y paneles, no reemplaza el editor.

---

### 3. Arquitectura de SDKs

Aleph Scriptorium distribuye su código en distintos ámbitos:

| Ámbito | Ubicación | Propósito |
|--------|-----------|-----------|
| VS Code Extension | `VsCodeExtension/` | Interfaz visual (Hacker Panels) |
| Copilot/Codebase | `.github/` | Agentes, prompts, instrucciones |
| Workspace | `.vscode/` | Tasks, settings, MCP servers |
| Almacenes | `ARCHIVO/` + `DISCO/` | Contenido y datos |
| Submódulos | Raíz | Herramientas externas |

La tendencia es mover el máximo código posible a librerías npm modulares en [MCPGallery](MCPGallery/README.md):

| SDK | Función |
|-----|---------|
| [mcp-core-sdk](MCPGallery/mcp-core-sdk/) | Primitivas MCP base |
| [mcp-mesh-sdk](MCPGallery/mcp-mesh-sdk/) | Red mesh de servidores MCP |
| [mcp-inspector-sdk](MCPGallery/mcp-inspector-sdk/) | Inspección y logística de la mesh |
| [mcp-model-sdk](MCPGallery/mcp-model-sdk/) | Servicio de modelos IA |
| ... | ... |

---

### 4. Instalación y Estructura

Scriptorium es un repositorio Git con [submódulos](.gitmodules) opcionales:

```bash
# Instalación completa
git clone https://github.com/escrivivir-co/aleph-scriptorium
git submodule update --init --recursive

# O añadir capacidades progresivamente
git submodule update --init MCPGallery
```

> **Filosofía central**: El editor se adapta al escritor, no al revés.

Estrategia de ampliación ad hoc: 

- a) Trae una herramienta agregándola como submódulo. Ponla a punto.
- b) Mapea con un plugin la funcionalidad para sumarla al scriptorium. Sigue pautas generales o crea tu propio camino.

#### Flujo: Submódulo → Plugin → Tu Scriptorium

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. IDE VS Code                                                     │
│     ├── workspace-config.json                                       │
│     └── scripts/setup-workspace.sh                                  │
├─────────────────────────────────────────────────────────────────────┤
│  2. Submódulo (herramienta externa)                                 │
│     ├── Prompt: .github/prompts/as_instalar_submodulo.prompt.md     │
│     └── Git: .gitmodules                                            │
├─────────────────────────────────────────────────────────────────────┤
│  3. Plugin (mapea la herramienta)                                   │
│     ├── Prompt: .github/prompts/as_plugin-install.prompt.md         │
│     └── Registro: .github/plugins/registry.json                     │
├─────────────────────────────────────────────────────────────────────┤
│  4. Configuración                                                   │
│     ├── Agente bridge (@plugin_ox_*)  → .github/agents/             │
│     ├── Copilot Locations             → .vscode/settings.json       │
│     ├── Datos                         → ARCHIVO/PLUGINS/{ID}/       │
│     └── Sistema                       → .github/plugins/{id}/       │
│         ├── manifest.md                                             │
│         ├── instructions/                                           │
│         ├── prompts/                                                │
│         ├── agents/                                                 │
│         └── schemas/                                                │
├─────────────────────────────────────────────────────────────────────┤
│  5. UI (opcional)                                                   │
│     └── Hacker Panels → VsCodeExtension/src/views/                  │
├─────────────────────────────────────────────────────────────────────┤
│  6. Tu Scriptorium (único)                                          │
└─────────────────────────────────────────────────────────────────────┘
```



Cada submódulo es una herramienta externa (un editor, un servidor, una librería). El [sistema de plugins](.github/PLUGINS.md) la integra al ecosistema de agentes.
El [scriptorium-pack](.github/plugins/scriptorium-pack/) viene preinstalado. A partir de ahí, tú decides qué añadir:

| Necesidad | Plugin |
|-----------|--------|
| Lógica simbólica | [prolog-editor](.github/plugins/prolog-editor/) |
| Producción narrativa | [novelist](.github/plugins/novelist/) |
| Bloques visuales | [blockly-editor](.github/plugins/blockly-editor/) |
| Flujos wiring | [wire-editor](.github/plugins/wire-editor/) |
| ... | ...  |

Con el tiempo, tu instalación refleja tu forma de trabajar.

#### Arquitectura DRY

Dos principios organizan el contenido:

**Separación de memorias**:
- [ARCHIVO](ARCHIVO/): Texto clasificado y permanente (enciclopedias, novelas, documentación)
- [DISCO](ARCHIVO/DISCO/): Datos crudos y trabajo en progreso (sesiones, borradores, snapshots)

**Índices únicos**:
- [Funcional.md](ARCHIVO/DEVOPS/Funcional.md): Qué puede hacer el sistema (visión usuario)
- [Tecnico.md](ARCHIVO/DEVOPS/Tecnico.md): Dónde está cada componente (visión desarrollador)

Criterio Don't Repeat Yourself: Los plugins y agentes consultan estos índices en lugar de duplicar información.

---

### 5. GitHub Copilot Chat y Context Bloat

#### Flujo de Trabajo con el Modelo

El trabajo agéntico pasa por 3 momentos. Ver [blueprint-copilot.md](docs/blueprint-copilot.md).

**Al enviar un mensaje**:
- Herramientas MCP disponibles
- Mensajes de sistema
- Datos de contexto
- Caché
- Intención de usuario

**Mientras el modelo trabaja**:
- Consola de Copilot Chat en OUTPUT → [Debugging](https://code.visualstudio.com/docs/debugtest/debugging)
- Output en ventana de chat → [Smart Actions](https://code.visualstudio.com/docs/copilot/copilot-smart-actions)
- Cambios en codebase → [Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview)

#### Gestión del Context Bloat

Cada modelo tiene un coste y también un **tamaño máximo de contexto**. Cuando más contexto se añade a una consulta más tarda, más cuesta pero más precisas y certera será.

Microsoft ya agrega un **capa de contexto con mensajes de sistema**. Este es un primera handicap para Aleph Scriptorium que está pendiente: fork de la extensión (CopilotEngine) para poder customizar con "flavours" de mensajes-sistema no especificos de coding. Falta investigar si también hay que cambiar el endpoint de los modelos porque sea uso no autorizado.

Cuando se hace una consulta y el modelo responde, empieza un hilo: "conversación". Vs Code implementa una **función de "resumir y continuar"**. Esto hace que la ventana de contexto se vaya moviendo comprimiendo el pasado y dejando sitio para el presente. Aquí Microsoft también agrega para **mensajería de sistema** para la operativa, dando preferencia al final de la conversacion, y operando con los **"restore" y "edit"** que el usuario puede hacer en el chat. Instrucciones de sistema para guardar lo deshecho como ejemplo de "qué no hacer". Internamente, **cachea documentos frecuentes** que suelen acompañar todas las interacciones. Este es el segundo punto abierto de este proyecto, relacionado con lo anterior. ¿Hasta que punto es posible extraer esta lógica y exponerla para que el usuario pueda incluirla en su "flavour"?

La CopilotEngine carga en el chat todos los dominios (agentes, prompts e instrucciones) que estén en la carpeta .github de la raíz. ¡Según donde abras el workspace de Vs Code aparecerán unos u otros! No es lo mismo abrir la carpeta de la raíz que una de un plugin concreto!

Cuando se opera desde la raíz, los dominios de plugins se cargan usando las **"Localizaciones"** (no implementado para agentes) de .vscode/setting.json.

Aleph Scriptorium usa **Don't Repeat Yourself** para cargar en el contexto índices que funcionan como las herramientas MCP. El modelo reciba una lista de "disponibles" como índice, y si quiere usarlas tendrá que pedirlo. El sistema DRY hace lo mismo con la información de contexto, enlaces en lugar de cargar ficheros enteros.

**El sistema de instrucciones** funciona mediante filtros de "apply" que especifican que patrones de nombres y extensiones de ficheros son objetivo. Cuando en la conversación se añade como contexto un fichero que hace saltar el filtro, Copilot carga esas instrucciones en el contexto.
Según diseño, todo empieza en: [copilot-instructions.md](.github/copilot-instructions.md), el primer archivo de **instrucciones globales**. A partir de aquí, ¡tú decides qué cargas en el Contexto! 

Con el uso de Scriptorium, el escritor podrá usar la capacidad de los agentes para **"auto-reflexión"** (.github/plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md") para aprender con el modelo qué pasa por debajo cuando el usuario y el agente hablan y así aprender cómo redirigirlo al gusto.

#### Model Context Protocol (MCP)

> MCP es como un puerto USB-C para aplicaciones IA: un estándar para conectar sistemas externos. MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems. 

→ [MCP Introduction](https://modelcontextprotocol.io/docs/getting-started/intro)

Protocolo estándar: `tools` + `resources` + `templates` + `prompts` + `sampling`

Mantener el contexto pequeño es responsabilidad del usuario:
- Arrancar servidores MCP necesarios
- Configurar `.vscode/mcp.json`
- Mantener lista de herramientas mínima

→ [Gestionar servidores MCP](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) | [Usar servidores MCP](https://code.visualstudio.com/api/extension-guides/ai/mcp)

---

### 6. Configuración y Acceso

#### Capas de Personalización

| Capa | Archivo | Propósito |
|------|---------|-----------|
| VS Code | [.vscode/settings.json](.vscode/settings.json) | Editor base |
| Vs Code Copilot Chat | `github.copilot.chat` | Modelos, permisos, comportamiento,... |
| Arrakis | [ArrakisTheater_OperaConfig.json](VsCodeExtension/ArrakisTheater_OperaConfig.json) | Configuración Scriptorium |

→ [VS Code Settings](https://code.visualstudio.com/api/ux-guidelines/settings) | [Copilot Chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)

#### Hacker Panels

Paneles personalizables para el Scriptorium:

| Panel | Archivo | Función |
|-------|---------|---------|
| **Config** | [HackerConfigPanelProvider.ts](VsCodeExtension/src/views/HackerConfigPanelProvider.ts) | Configuraciones del entorno + agentes |
| **CMD** | [HackerCommandPanelProvider.ts](VsCodeExtension/src/views/HackerCommandPanelProvider.ts) | Directorio de comandos |
| **UIs** | [HackerControlPanelProvider.ts](VsCodeExtension/src/views/HackerControlPanelProvider.ts) | Catálogo de URLs de apps |

Base: [BaseHackerPanelProvider.ts](VsCodeExtension/src/views/BaseHackerPanelProvider.ts)

→ [VS Code Panel Guidelines](https://code.visualstudio.com/api/ux-guidelines/panel) | [VS Code Views](https://code.visualstudio.com/api/ux-guidelines/views)

---

### 7. Entorno Híbrido: Usuario + Agentes

Operar un sistema dinámico es una cuestión pandemónica. Crear un sistema que pueda usar tanto el usuario como el agente permite delegar o asumir al gusto la gestión.

| Interfaz | Acceso | Uso |
|----------|--------|-----|
| Paleta de comandos | `Ctrl+Shift+P` | Comandos VS Code estándar |
| Arrakis CMD Panel | Panel lateral | Comandos contextuales |
| Agentes | `@agente` en chat | Especialistas por dominio |

Los [handoffs](.github/agents/AGENTS.md) permiten navegación entre agentes especializados.

---

### 8. Panel de Servicios y Apps

#### Tasks de VS Code

El sistema de [Tasks](https://code.visualstudio.com/docs/debugtest/tasks) permite arrancar servicios desde `.vscode/tasks.json`.

**Ejecución**:
- Manual: `Ctrl+Shift+P` → "Tasks: Run Task"
- Agente: Pedir al agente que ejecute y monitorice

#### Catálogo de Tasks por Stack

| Stack | Prefijo | Puertos | Servicios |
|-------|---------|---------|-----------|
| **APB** (Prolog) | `APB:` | 3006, 3050, 5001, 8000 | MCP Launcher + Prolog + Backend + Frontend |
| **TPE** (TypedPrompts) | `TPE:` | 3019, 3020 | Editor + MCP Server |
| **OAE** (OpenAsyncAPI) | `OAE:` | 3021, 3022 | Swagger UI + AsyncAPI Studio |
| **NRE** (Node-RED) | `NRE:` | 1880, 3088 | Editor + GamifyUI |
| **BLE** (Blockly) | `BLE:` | 4200, 5000 | Editor + Runtime |
| **NOV** (Novelist) | `NOV:` | 3066, 8080 | MCP Server + UI |
| **DEMO** | `DEMO:` | Varios | Stack completo para demostraciones |
| **INS** (Inspector) | `INS:` | 6274, 6277 | MCP Inspector UI + Proxy |

---

### 9. Servidores MCP

#### Servidores en mcp-mesh-sdk

Ubicación: [MCPGallery/mcp-mesh-sdk/src/](MCPGallery/mcp-mesh-sdk/src/)

| Servidor | Puerto | Función |
|----------|--------|---------|
| [MCPLauncherServer](MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts) | 3050 | Orquestación de servidores |
| [MCPPrologServer](MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts) | 3006 | Editor/Runtime de lógicas |
| [MCPTypedPromptServer](MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts) | 3020 | Base taxonómica
| [MCPWikiBrowserServer](MCPGallery/mcp-mesh-sdk/src/MCPWikiBrowserServer.ts) | 3002 | Aplicación conectada |
| [MCPStateMachineServer](MCPGallery/mcp-mesh-sdk/src/MCPStateMachineServer.ts) | 3004 | Máquina de estados |
| [DevOpsServer](MCPGallery/mcp-mesh-sdk/src/DevOpsServer.ts) | 3003 | Automatización DevOps |

Configuración: `.vscode/mcp.json`

#### Operaciones MCP

| Operación | Método |
|-----------|--------|
| **Arrancar/Parar** | MCP Launcher como hub centralizado |
| **Operar** | Tools MCP comunicando con servicios REST/Async |
| **Monitorizar** | [mcp-inspector-sdk](MCPGallery/mcp-inspector-sdk/) para inspección completa |

---

## Parte II: La Escritura

### 1. Diseño Ontológico

[OnthologyEditor](OnthologyEditor/README.md) para modelar dominios:

| Paradigma | Ubicación | Propósito |
|-----------|-----------|-----------|
| [Flove](OnthologyEditor/FloveDocs/) | Taxonomías triádicas | Conceptualización |
| [MMCO](OnthologyEditor/MMCO/) | Modelado de realidad | Simulación |
| [Metamodel](OnthologyEditor/metamodel/) | Estructuras formales | Especificación |

---

### 2. Tipos y Presets

Los diseños del punto anterior se transforman en un flujo de diseño en ScriptoriumPacks:

```
1. TypedPrompting  →  Creación de esquemas y validadores
         ↓
2. MCPPresets      →  Catálogo y configuración de packs
         ↓
3. HypergraphEditor → Integración de Tipos y Packs en operativas
```

| Componente | Submódulo | Plugin | Datos |
|------------|-----------|--------|-------|
| [TypedPrompting](TypedPromptsEditor/README.md) | TypedPromptsEditor | [typed-prompting](.github/plugins/typed-prompting/) | [TYPED_PROMPTING](ARCHIVO/PLUGINS/TYPED_PROMPTING/) |
| [MCPPresets](.github/plugins/mcp-presets/) | — | [mcp-presets](.github/plugins/mcp-presets/) | [MCP_PRESETS](ARCHIVO/PLUGINS/MCP_PRESETS/) |
| [HypergraphEditor](WiringAppHypergraphEditor/) | WiringAppHypergraphEditor | [hypergraph-editor](.github/plugins/hypergraph-editor/) | — |

---

### 3. Especificación de APIs

[OpenAsyncAPI Editor](.github/plugins/openasyncapi-editor/) para especificar lógica de negocio y comunicación:

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| **OpenAPI** | REST endpoints | [specs/PrologEditor/openapi.yaml](ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/) |
| **AsyncAPI** | Eventos y mensajería | [specs/PrologEditor/asyncapi.yaml](ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/) |
| **MCP** | Model Context Protocol | Herramientas y recursos |
| **UML** | Casos de uso | Diagramas relacionales |

**Generación de código**: Desde especificaciones a implementaciones tipadas.

---

### 4. Editores de Lógica

Los ScriptoriumPacks pueden exportarse a editores especializados con paletas tipadas compatibles con todo el ecosistema:

| Editor | Submódulo | Plugin | Paradigma |
|--------|-----------|--------|-----------|
| [BlocklyEditor](BlocklyEditor/) | ✓ | [blockly-editor](.github/plugins/blockly-editor/) | Bloques visuales |
| [PrologEditor](PrologEditor/) | ✓ | [prolog-editor](.github/plugins/prolog-editor/) | Lógica simbólica |
| [WiringEditor](WiringEditor/) | ✓ | [wire-editor](.github/plugins/wire-editor/) | Flujos Node-RED |
| [AAIAGallery](AAIAGallery/) | ✓ | — | Agentes AlephScript |
| [WorkflowEditor](WorkflowEditor/) | ✓ | — | Workflows BPMN |

---

### 5. Pipeline de Compilación

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

**Flujos de compilación**:
- **Editor → Runtime**: Blockly genera código ejecutable en 2 UIs: a) editor, b) runtime manager
- **Agente → Servicio**: PrologAgentBrainPack en personajes como Lucas que permite inferencias en directo ya sea para alterar "hechos" o para pedir "asserts".

---

### 6. Creación de Agentes

[AgentCreator](.github/plugins/agent-creator/) multiplexa fuentes para crear personajes y los exporta a otros plugins como NovelistEditor o ARG-Board:

| Fuente | Ubicación | Aporta |
|--------|-----------|--------|
| Brains (Prolog, Blockly...) | Editores §4 | Capacidades lógicas |
| [AgentLoreSDK](AgentLoreSDK/) | Submódulo | Plantillas de agentes |
| [Enciclopedia](.github/plugins/enciclopedia/) | Plugin | Conocimiento estructurado |
| [ForoScraper](.github/plugins/foro-scraper/) | Plugin | Fuentes externas |

**Output**: Personajes en [TALLER/ELENCO](ARCHIVO/DISCO/TALLER/ELENCO/)

---

## Parte III: El Escribir

Aleph Scriptorium es un sistema ideal para "streamers" e "influencers" permitiéndoles gozar de la solidez e inmediatez del versionado semántico del bucle DevOps de CD/CI con sus obras y actuaciones o presencia en la red. Pudiendo diseñar sesiones en el escritorio y reproducirlas en directo. El scriptorium cubre las fases del proceso desde la "idea" hasta "los aplausos" o "likes". Aleph Scriptorium es un sistema ideal para "streamers" e "influencers" permitiéndoles gozar de la solidez e inmediatez del versionado semántico del bucle DevOps de CD/CI con sus obras y actuaciones o presencia en la red. Pudiendo diseñar sesiones en el escritorio y reproducirlas en directo.

### 1. Producción Narrativa Agéntica

[NovelistEditor](NovelistEditor/) es el sistema de producción narrativa:

| Capacidad | Descripción |
|-----------|-------------|
| Personajes con brains | Invocables durante la redacción |
| Investigación | Agentes consultan [ENCICLOPEDIA](ARCHIVO/ENCICLOPEDIA/) o scraping |
| Gestión documental | [ARCHIVO](ARCHIVO/) (clasificado) vs [DISCO](ARCHIVO/DISCO/) (crudos) |

**Plugin**: [novelist](.github/plugins/novelist/) | **Datos**: [NOVELIST](ARCHIVO/PLUGINS/NOVELIST/)

> 💡 Ideal para streamers e influencers: DevOps de CD/CI aplicado a obras y presencia en red.

---

### 2. Conversión de la narrativa agéntica en transmedia

[Teatro ARG](.github/plugins/teatro/) + [ARG Board App](.github/plugins/arg-board-app/) para narrativa interactiva:

| Componente | Función |
|------------|---------|
| [WiringAppHypergraphEditor](WiringAppHypergraphEditor/) | Apps conectadas con brains en tiempo real |
| [BlockchainComPort](BlockchainComPort/) | Publicación de tramas en red P2P |
| UIs Web | Interacción con runtimes de brains |

---

### 3. Proyección de narrativa transmedia en linea

Exporta desde el Scriptorium por vias naturales como [GitHub Pages](.github/plugins/gh-pages) u otras integraciones para levantar series temáticas y temporales como noticias, obras, columnas etc manteniendo sincronizada tu codebase y los portales donde los usuarios las visitan:

| Plugin | Ubicación | Función |
|----------|-----------|---------|
| Periódico | [periodico.instructions.md](.github/plugins/scriptorium-pack/instructions/periodico.instructions.md) | Portal de contenido |
| Teatro | [teatro](.github/plugins/teatro/) | Portal de cntenido interactivo |
| Publicar CI/CD  | [.github/workflows/pages.yml](.github/workflows/pages.yml) | GitHub Actions → Azure |

**Ver**: [docs/_config.yml](docs/_config.yml) | [demo.md](docs/demo.md)

---

### 4. Uso de narrativa transmedia en Streaming con Apps conectadas

Lo difícil es hacer la obra. Una vez se ha montado el corpus: ¡con Aleph Scriptorium da gusto desplegarlo y escrivivirlo, :-D!

Herramientas para diseñar sesiones en escritorio y reproducirlas en directo:

| Submódulo | Función |
|-----------|---------|
| [StreamDesktop](StreamDesktop/) | Pantalla de teatro con streaming |
| [StreamDesktopAppCronos](StreamDesktopAppCronos/) | Gestión temporal |
| [WiringAppHypergraphEditor](WiringAppHypergraphEditor/) | Creación de apps conectadas |

---

## Parte IV: El Escritor

### 1. IDE Clásico

Operaciones estándar de VS Code:

| Función | Acceso |
|---------|--------|
| Explorador de archivos | [workspace-config.json](workspace-config.json) |
| Autocompletado inteligente |
| Búsqueda en workspace | `Ctrl+Shift+F` |
| Terminal integrada | `` Ctrl+` `` |
| Asistencia integrada | [Smart Actions](https://code.visualstudio.com/docs/copilot/copilot-smart-actions) |
| Sugerencias | [Inline suggestions](https://code.visualstudio.com/docs/copilot/overview#_inline-suggestions) |

Configuración: [workspace-config.json](workspace-config.json)

→ [VS Code Setup](https://code.visualstudio.com/docs/setup/setup-overview)

---

### 2. Sistema de Agentes

| Componente | Ubicación | Función | Sale en VsCode | 
|------------|-----------|---------|------|
| Agentes | `.github/agents/*.agent.md` | Especialistas por dominio | Sí |
| Puentes | `.github/agents/plugin_ox_*.agent.md` | Conectores de plugin | Sí |
| Plugins | `.github/plugins/*/agents/*.agent.md` | Agentes "lore"" | No |

| Handoffs | [AGENTS.md](.github/agents/AGENTS.md) | Tabla de delegación |
| Prompts | `.github/prompts/*.prompt.md` | Plantillas de dominio | Sí |
| Plugins | `.github/plugins/*/prompts/*.prompt.md` | Plantillas contextuales  | Si activo en Locations |

| Instrucciones | `.github/instructions/*.instruction.md` | Reglas contextuales |
| Plugins | `.github/plugins/*/instruction/*.instruction.md` | Agentes "lore"" | Si activo en Locations |

**Agentes principales**:
- [@ox](.github/agents/ox.agent.md) — Oráculo y coordinador técnico
- [@indice](.github/agents/indice.agent.md) — Gestor de coherencia DRY
- [@aleph](.github/agents/aleph.agent.md) — Como Ox pero "funcional"
- [@scrum](.github/plugins/scrum/agents/scrum.agent.md) — El master Agile
- ...

→ [Copilot Agents](https://code.visualstudio.com/docs/copilot/customization/mcp-servers#copilot-agents-articles)

Locations (activar/desactivar):

En .vscode\settings.json:
- chat.promptFilesLocations
- chat.instructionsFilesLocations
---

### 3. Protocolos Multi-Agente

Coordinación de agentes en tareas complejas:

| Protocolo | Instrucción | Uso |
|-----------|-------------|-----|
| [Cotrabajo](.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md) | Sesiones colaborativas | Épicas multi-etapa |
| [Scrum](.github/plugins/scrum/instructions/scrum-protocol.instructions.md) | Modelo Generativo | Planificación |
| [Auto-reflexión](.github/plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md) | Optimización de tokens | Sesiones largas |
| [Banderas](.github/agentes/*flag.agent.md) | Rondas de agentes | Sesiones largas |

**Sesiones activas**: [SESIONES_COTRABAJO](ARCHIVO/DISCO/SESIONES_COTRABAJO/)

---

### 4. Auto-Reflexión y Métricas

El flujo agéntico pasa por etapas (ver referencia: blueprint-copilot.md) donde la conversación se transforma en etapas y niveles. El feature "auto-reflexión" en Aleph Scriptorium consiste en un mecanismo que conecta a los agentes con su actividad interna con Copilot Chat de modo que puedan observar sus propias conversaciones no ya desde le plano usuario-agente sino agente-LLM. Esta información es vital para evolucionar el scriptorium e incluso para coger ideas de ingeniería de prompting observando en vivo cómo dialoga consigo mismo el agente construyendo secuencias de llamadas a herrammientas y manejo del contexto de forma performante y como performance.

| Métrica | Herramienta MCP | Umbral |
|---------|-----------------|--------|
| `healthScore` | `get_usage_metrics()` | ≥70 🟢 |
| `cacheHitRate` | `analyze_session()` | ≥30% |
| Snapshots | `capture_snapshot()` | Cada 30-60 min |

→ [auto-reflexion.instructions.md](.github/plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md)

---

### 5. Plugins Instalados

[22 plugins](.github/plugins/) instalados, accesibles via bridges `@plugin_ox_*`:

| Categoría | Plugins |
|-----------|---------|
| ... | ... |


**Registro**: [registry.json](.github/plugins/registry.json)

---

### 6. Despliegue de Servicios

[Tasks](.vscode/tasks.json) organizadas por stack:

| Stack | Task Principal | Puertos |
| ... | ... | ... |


**Ejecución**: `Ctrl+Shift+P` → "Tasks: Run Task" → Seleccionar

---

## Referencias

| Documento | Propósito |
|-----------|-----------|
| [README.md](README.md) | Visión general del proyecto |
| [DEVOPS.md](.github/DEVOPS.md) | Metodología y convención de commits |
| [PLUGINS.md](.github/PLUGINS.md) | Protocolo de extensiones |
| [AGENTS.md](.github/agents/AGENTS.md) | Índice maestro de agentes |
| [BACKLOG-SCRIPTORIUM.md](.github/BACKLOG-SCRIPTORIUM.md) | Estado actual del proyecto |
| [roadmap.md](docs/roadmap.md) | Épocas de desarrollo |
| [blueprint-copilot.md](docs/blueprint-copilot.md) | Arquitectura de Copilot |
| [Funcional.md](ARCHIVO/DEVOPS/Funcional.md) | Índice funcional (usuario) |
| [Tecnico.md](ARCHIVO/DEVOPS/Tecnico.md) | Índice técnico (desarrollador) |
