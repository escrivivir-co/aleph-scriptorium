# 📋 ÍNDICES DE INFORMES — vscode-alephscript-extension

> **Generado**: 2025-12-24  
> **Propósito**: Índices pormenorizados para análisis funcional y técnico de la codebase  
> **Rama objetivo**: `integration/beta/scriptorium`

---

## DOCUMENTO 1: INFORME DE ANÁLISIS FUNCIONAL

> **Audiencia**: Product Owners, Stakeholders, Diseñadores de Experiencia  
> **Enfoque**: Qué hace la extensión, para quién, y cómo se usa

---

### ÍNDICE — ANÁLISIS FUNCIONAL

#### 1. RESUMEN EJECUTIVO
   1.1. Visión del producto  
   1.2. Propuesta de valor única  
   1.3. Ecosistema ALEPH Scriptorium  
   1.4. Estado actual (v0.1.0-scriptorium)  
   1.5. Roadmap funcional resumido

#### 2. STAKEHOLDERS Y PERFILES DE USUARIO
   2.1. **Escritores/Autores**
      - Necesidades: Gestión de proyectos de largo aliento, coherencia doctrinal
      - Features aplicables: Vista de Agentes, ChatParticipants, Backlogs
   2.2. **Desarrolladores/Contribuidores**
      - Necesidades: Extensibilidad, integración MCP, debugging
      - Features aplicables: TreeViews técnicos, Socket.IO, Logs
   2.3. **Tutores/Formadores**
      - Necesidades: Orientación de usuarios, cartas-puerta
      - Features aplicables: Sistema de navegación (Vestíbulo, Cartas)
   2.4. **Administradores de Plugins**
      - Necesidades: Gestión de extensiones, configuración
      - Features aplicables: Plugin Manager, Configuration UI

#### 3. ARQUITECTURA FUNCIONAL
   3.1. **Dos Épocas del Sistema**
      - Primera Época: Socket.IO Gamification (legacy)
      - Segunda Época: Teatralización + Scriptorium (actual)
   3.2. **Capas de Interacción**
      - UI Layer: TreeViews, WebViews, StatusBar
      - Backend Layer: 5 Banderas de Auditoría
      - Sistema Layer: Navegación y Orientación
      - Meta Layer: Gestión y Oráculos
      - Plugins Layer: Extensiones

#### 4. CATÁLOGO DE FUNCIONALIDADES

   ##### 4.1. VISTA DE TEATRO (Teatro TreeView)
   - 4.1.1. Árbol de Agentes Teatrales
   - 4.1.2. Estados de Agente (Activo/Inactivo)
   - 4.1.3. Comandos de Agente (Jack In, Disconnect, Neural Link)
   - 4.1.4. Navegación por especialización
   - 4.1.5. Integración con ChatParticipants

   ##### 4.2. SISTEMA DE CHATPARTICIPANTS
   - 4.2.1. Agentes Registrados (@isaac, @don-alvaro, @capitan-didac, @indra, @backend-agent)
   - 4.2.2. Categorías de Agentes
     - Framework Retro (navegación, calidad, liderazgo)
     - Technical DevOps (integración, backend)
   - 4.2.3. Flujo de Conversación
   - 4.2.4. Handoffs entre Agentes
   - 4.2.5. Contexto VibeCoding

   ##### 4.3. PANELES HACKER (WebViews)
   - 4.3.1. Control Panel (matriz de control)
   - 4.3.2. Command Panel (comandos del sistema)
   - 4.3.3. Config Panel (configuraciones)
   - 4.3.4. Temas visuales (Matrix, Dark, Light)
   - 4.3.5. Estética cyberpunk/hacker

   ##### 4.4. GESTIÓN DE CONFIGURACIONES
   - 4.4.1. TreeView de Configuraciones
   - 4.4.2. Tipos de Configuración (xplus1, socket, webrtc)
   - 4.4.3. Validación de esquemas JSON
   - 4.4.4. Backup y restauración
   - 4.4.5. Plantillas de configuración

   ##### 4.5. MONITORIZACIÓN SOCKET.IO
   - 4.5.1. TreeView de Conexiones
   - 4.5.2. Estado de servidores
   - 4.5.3. Gestión de rooms
   - 4.5.4. Envío de mensajes de prueba
   - 4.5.5. Diagnóstico de conectividad

   ##### 4.6. GESTIÓN DE UIs GAMIFICADAS
   - 4.6.1. TreeView de UIs
   - 4.6.2. Arranque/parada de servidores UI
   - 4.6.3. Apertura en navegador
   - 4.6.4. Estados de UI

   ##### 4.7. GESTIÓN DE SERVIDORES MCP
   - 4.7.1. TreeView de Servidores MCP
   - 4.7.2. Ciclo de vida de servidores
   - 4.7.3. Interfaz web MCP
   - 4.7.4. Configuración de servidores

   ##### 4.8. SISTEMA DE LOGS
   - 4.8.1. TreeView de Logs
   - 4.8.2. Categorización (Extension, MCP, Socket, etc.)
   - 4.8.3. Niveles de log (DEBUG, INFO, WARN, ERROR)
   - 4.8.4. Auto-refresh y filtrado
   - 4.8.5. Exportación de logs

   ##### 4.9. EDITORES ESPECIALIZADOS
   - 4.9.1. Agent Content Editor (personalidad, instrucciones)
   - 4.9.2. Agent Config Editor (configuración técnica)
   - 4.9.3. Validación en tiempo real
   - 4.9.4. Preview de agentes

   ##### 4.10. BARRA DE ESTADO (StatusBar)
   - 4.10.1. Indicadores de salud del sistema
   - 4.10.2. Estado de conexiones
   - 4.10.3. Accesos rápidos
   - 4.10.4. Métricas en tiempo real

#### 5. FLUJOS DE USUARIO

   ##### 5.1. Onboarding de nuevo usuario
   - Instalación → Activación → First Run → Configuración inicial

   ##### 5.2. Interacción con agentes teatrales
   - Selección de agente → Jack In → Conversación → Handoff → Resultado

   ##### 5.3. Configuración del sistema
   - Acceso Config Panel → Selección de archivo → Edición → Validación → Aplicar

   ##### 5.4. Monitorización de infraestructura
   - Vista Sockets → Conexión → Unirse a Room → Verificar mensajes → Diagnóstico

   ##### 5.5. Desarrollo de nuevos agentes
   - Crear contenido → Definir configuración → Registrar → Probar → Desplegar

#### 6. INTEGRACIÓN CON ECOSISTEMA SCRIPTORIUM

   6.1. Mapeo con Agentes del Scriptorium (20+ agentes)  
   6.2. Integración con Plugins (8 plugins)  
   6.3. Sincronización con Backlogs  
   6.4. Conexión con Teatro Interactivo (impress.js)  
   6.5. Flujo GH-Pages para publicación

#### 7. MÉTRICAS DE ÉXITO FUNCIONAL

   7.1. Tiempo de setup (objetivo: <30 segundos)  
   7.2. Curva de aprendizaje  
   7.3. Satisfacción de usuario por perfil  
   7.4. Tasa de adopción de ChatParticipants  
   7.5. Frecuencia de uso de cada feature

#### 8. LIMITACIONES CONOCIDAS Y WORKAROUNDS

   8.1. Dependencia de infraestructura externa (Socket.IO, MCP)  
   8.2. Primera Época vs Segunda Época (código legacy)  
   8.3. Duplicación de lógica en componentes  
   8.4. Propuestas de mejora pendientes

#### 9. APÉNDICES FUNCIONALES

   9.1. Glosario de términos  
   9.2. FAQ de usuario  
   9.3. Mapeo Feature → Comando  
   9.4. Capturas de pantalla de referencia

---

## DOCUMENTO 2: INFORME DE ANÁLISIS TÉCNICO

> **Audiencia**: Desarrolladores, Arquitectos, DevOps  
> **Enfoque**: Cómo está construido, patrones, dependencias, puntos de extensión

---

### ÍNDICE — ANÁLISIS TÉCNICO

#### 1. ARQUITECTURA GENERAL

   ##### 1.1. Visión Técnica
   - Stack tecnológico (TypeScript, VS Code API, Node.js)
   - Modelo de extensión VS Code
   - Arquitectura de 4 capas (Content → Config → Implementation → Runtime)

   ##### 1.2. Estructura del Proyecto
   ```
   vscode-alephscript-extension/
   ├── src/                    # Código fuente principal
   │   ├── core/              # Servicios centrales
   │   ├── theatrical/        # Sistema teatral (Segunda Época)
   │   ├── treeViews/         # Providers de TreeView
   │   ├── views/             # WebView providers
   │   └── editors/           # Custom editors
   ├── theatrical-content/     # Contenido de agentes
   ├── tests/                  # Suite de tests
   ├── media/                  # Assets (CSS, JS, imágenes)
   ├── schemas/                # JSON Schemas
   └── vibecoding/             # Documentación de desarrollo
   ```

   ##### 1.3. Puntos de Entrada
   - `extension.ts` → `ExtensionBootstrap` (Singleton)
   - Activation events: `onStartupFinished`
   - Contribution points: commands, views, menus, chatParticipants

#### 2. CORE SERVICES (`src/core/`)

   ##### 2.1. ExtensionBootstrap (`extensionBootstrap.ts`)
   - Patrón: Singleton
   - Responsabilidad: Orquestación de inicialización
   - Dependencias: Todos los managers
   - Líneas: ~1813
   - Contexto expuesto: `ExtensionContext` interface

   ##### 2.2. ManagerFactory (`managerFactory.ts`)
   - Patrón: Factory
   - Responsabilidad: Creación de managers estándar
   - Productos: ProcessManager, WebViewManager, etc.

   ##### 2.3. ConfigurationService (`configurationService.ts`)
   - Patrón: Service
   - Responsabilidad: Acceso a VS Code settings
   - Integración: workspace.getConfiguration

   ##### 2.4. McpConfigurationManager (`mcpConfigurationManager.ts`)
   - Patrón: Singleton
   - Responsabilidad: Gestión de configs AlephScript
   - Fuentes: sample-config.json, VS Code settings
   - **Problema detectado**: Aislado de componentes UI

   ##### 2.5. ErrorBoundary (`errorBoundary.ts`)
   - Patrón: Error Boundary
   - Responsabilidad: Captura y manejo de errores globales

   ##### 2.6. LoggingManager (`loggingManager.ts`)
   - Patrón: Logger Factory
   - Categorías: EXTENSION, MCP, SOCKET, THEATRICAL, etc.
   - Niveles: DEBUG, INFO, WARN, ERROR
   - Output: VS Code Output Channel

   ##### 2.7. AnalyticsService (`analyticsService.ts`)
   - Patrón: Observer
   - Eventos: COMMAND_EXECUTED, AGENT_ACTIVATED, etc.
   - Métricas: Uso, rendimiento, errores

   ##### 2.8. AIAssistantService (`aiAssistantService.ts`)
   - Patrón: Service + Strategy
   - Capabilities: CODE_ANALYSIS, WORKFLOW_OPTIMIZATION
   - Tipos de interacción: CHAT, INLINE, COMMAND

   ##### 2.9. HackerStatusBarManager (`HackerStatusBarManager.ts`)
   - Patrón: Manager
   - Responsabilidad: Items de StatusBar
   - Indicadores: Health, Connections, Metrics

   ##### 2.10. ConfigurationCommandsService (`configurationCommandsService.ts`)
   - Patrón: Command
   - Responsabilidad: Comandos de gestión de configuración
   - Comandos: Load, Download, Reset, Show

#### 3. SISTEMA TEATRAL (`src/theatrical/`)

   ##### 3.1. TheatricalChatManager
   - Archivo: `TheatricalChatManager.ts`
   - Líneas: ~349
   - Responsabilidad: Registro de ChatParticipants teatrales
   - Agentes registrados: 5 (Isaac, Don Álvaro, Capitán Dídac, Indra, Backend Agent)

   ##### 3.2. Core Interfaces (`core/interfaces/`)
   - `ITheatricalAgent.ts`: Interface base de agentes (~374 líneas)
     - AgentContent, AgentConfiguration, VibeCodingIntegration
     - MCPIntegration, PersonalityTraits, AgentCapabilities
   - `ICompany.ts`: Compañía teatral (grupo de agentes)
   - `IPlay.ts`: Obras/escenarios

   ##### 3.3. Core Managers (`core/managers/`)
   - `TheatricalAgent.ts`: Implementación base
   - `TheatricalAgentCore.ts`: Núcleo modular (~629 líneas)
     - Arquitectura de 4 capas
     - TheatricalRequest/TheatricalResponse
     - Validación integrada

   ##### 3.4. Schemas y Validación (`core/schemas/`)
   - `agent.schema.json`: Esquema de agente
   - `company.schema.json`: Esquema de compañía
   - `play.schema.json`: Esquema de obra
   - `validation.ts`: Validador centralizado

   ##### 3.5. VS Code Integration (`core/vscode/`)
   - `ChatParticipantFactory.ts`: Factory de ChatParticipants (~258 líneas)
     - VibeCodingContext para requests
     - Integración con theatricalValidator

   ##### 3.6. Agentes Predefinidos (`agents/`)
   - Cada agente tiene:
     - `{name}.agent.md`: Contenido (personalidad, instrucciones)
     - `{name}.config.json`: Configuración técnica
     - `{Name}AgentManager.ts`: Manager específico
     - `{Name}ChatParticipant.ts`: ChatParticipant específico
   - Agentes:
     - Isaac (Marinero Fiel)
     - Don Álvaro (Capataz de Astilleros)
     - Capitán Dídac (Líder Naval)
     - Indra (Integration Agent)
     - Backend Agent (Technical Specialist)

#### 4. TREEVIEWS (`src/treeViews/`)

   ##### 4.1. SocketsTreeDataProvider (`socketsTreeView.ts`)
   - Líneas: ~469
   - Funcionalidad: Conexiones Socket.IO
   - Comandos: connect, disconnect, joinRoom, leaveRoom, sendMessage

   ##### 4.2. UIsTreeDataProvider (`uisTreeView.ts`)
   - Funcionalidad: Gestión de UIs gamificadas
   - Comandos: start, stop, openBrowser

   ##### 4.3. ConfigsTreeDataProvider (`configsTreeView.ts`)
   - Funcionalidad: Archivos de configuración
   - Validación: JSON + esquemas específicos
   - File watchers para cambios en tiempo real

   ##### 4.4. LogsTreeDataProvider (`logsTreeView.ts`)
   - Funcionalidad: Visualización de logs
   - Filtros: categoría, nivel, auto-refresh

   ##### 4.5. MCPTreeDataProvider (`mcpTreeView.ts`)
   - Funcionalidad: Servidores MCP
   - Comandos: start, stop, web.open

#### 5. VIEWS Y WEBVIEWS (`src/views/`)

   ##### 5.1. TeatroTreeDataProvider
   - Archivo: `TeatroTreeDataProvider.ts` (~236 líneas)
   - Modelos: TeatroAgent, TeatroTreeItem
   - Agentes visualizados: Isaac, Don Álvaro, Capitán Dídac, Indra, Backend

   ##### 5.2. TeatroWebViewProvider
   - Archivo: `TeatroWebViewProvider.ts`
   - Panel WebView para teatro

   ##### 5.3. Hacker Panels (Estética Cyberpunk)
   - `BaseHackerPanelProvider.ts`: Base común
   - `HackerControlPanelProvider.ts`: Panel de control
   - `HackerCommandPanelProvider.ts`: Panel de comandos
   - `HackerConfigPanelProvider.ts`: Panel de configuración
   - **Problema**: Duplica lógica de configsTreeView

#### 6. EDITORES CUSTOM (`src/editors/`)

   ##### 6.1. AgentContentEditorProvider
   - Tipo: CustomTextEditorProvider
   - Edita: Archivos .agent.md
   - Features: Preview, Validación, Syntax highlighting

   ##### 6.2. AgentConfigEditorProvider
   - Tipo: CustomTextEditorProvider
   - Edita: Archivos .config.json
   - Features: Schema validation, Auto-complete

#### 7. MANAGERS DE INFRAESTRUCTURA

   ##### 7.1. ProcessManager (`processManager.ts`)
   - Gestión de procesos hijos
   - Spawn, kill, monitoring

   ##### 7.2. TerminalManager (`terminalManager.ts`)
   - Terminales VS Code integrados
   - Creación, envío de comandos

   ##### 7.3. WebViewManager (`webViewManager.ts`)
   - Gestión de paneles WebView
   - Lifecycle, messaging

   ##### 7.4. SocketMonitor (`socketMonitor.ts`)
   - Monitorización Socket.IO en tiempo real
   - Conexión, desconexión, eventos

   ##### 7.5. UIManager (`uiManager.ts`)
   - Gestión de UIs gamificadas
   - Estado, arranque, parada

   ##### 7.6. MCPServerManager (`mcpServerManager.ts`)
   - Gestión de servidores MCP
   - Lifecycle, configuración

   ##### 7.7. MCPWebViewManager (`mcpWebViewManager.ts`)
   - WebViews específicos para MCP
   - Interfaz de administración

#### 8. CONTRIBUTION POINTS (package.json)

   ##### 8.1. Commands (~80+ comandos)
   - Categorías:
     - MCP Manager (6 comandos)
     - Arrakis Theater (6 comandos)
     - AlephScript System (varios)
     - Quick Hack (emergency commands)
     - Analytics, AI, Logs, etc.

   ##### 8.2. Views (Activity Bar + TreeViews)
   - Container: "alephscript-teatro"
   - Views:
     - teatro-agents (Teatro)
     - alephscript-mcptree (MCP)
     - alephscript-uis (UIs)
     - alephscript-sockets (Socket.IO)
     - alephscript-configs (Configuraciones)
     - alephscript-logs (Logs)

   ##### 8.3. Menus (Context menus, Editor menus)
   - view/title menus
   - view/item/context menus
   - editor/title menus
   - commandPalette

   ##### 8.4. Custom Editors
   - agentContentEditor
   - agentConfigEditor

   ##### 8.5. ChatParticipants (Copilot)
   - mcp-vscode-ext.isaac
   - mcp-vscode-ext.don-alvaro
   - mcp-vscode-ext.capitan-didac
   - mcp-vscode-ext.indra
   - mcp-vscode-ext.backend-agent

#### 9. SCHEMAS JSON (`schemas/`)

   ##### 9.1. socket-config.schema.json
   - Configuración de conexiones Socket.IO

   ##### 9.2. webrtc-ui-config.schema.json
   - Configuración de UIs WebRTC

   ##### 9.3. xplus1-config.schema.json
   - Configuración de aplicaciones xplus1

   ##### 9.4. Schemas teatrales (theatrical-content/configurations/schemas/)
   - agent.schema.json
   - company.schema.json
   - play.schema.json

#### 10. TESTING (`tests/`)

   ##### 10.1. Configuración
   - Framework: Jest
   - Config: `jest.config.js`
   - Setup: `tests/setup.ts`

   ##### 10.2. Tests Unitarios (`tests/unit/`)
   - `core/`: Tests de servicios core
   - `mcpChatParticipant.test.ts`: Tests de chat

   ##### 10.3. Tests de Integración (`tests/integration/`)
   - `extensionChatIntegration.test.ts`
   - `managerFactory.test.ts`

   ##### 10.4. Tests de Performance (`tests/performance/`)
   - Benchmarks de rendimiento

   ##### 10.5. Mocks (`tests/mocks/`)
   - Mocks de VS Code API

#### 11. ASSETS Y MEDIA (`media/`)

   ##### 11.1. CSS
   - `hacker-base.css`: Estilos base hacker
   - `hacker-themes.css`: Temas (matrix, dark, light)
   - `teatro.css`: Estilos teatro
   - `agent-*-editor.css`: Estilos de editores

   ##### 11.2. JavaScript
   - `hacker-*.js`: Lógica de paneles hacker
   - `teatro.js`: Lógica teatro
   - `hacker-theme-switcher.js`: Cambio de temas
   - `agent-*-editor.js`: Lógica de editores

   ##### 11.3. Imágenes
   - `arrakis-theater-icon.png`: Icono principal
   - `mcp.svg`: Icono MCP

#### 12. DEPENDENCIAS Y BUILD

   ##### 12.1. Dependencias Principales
   - `vscode`: ^1.95.0
   - Tipado: @types/node, @types/vscode

   ##### 12.2. Scripts de Build
   - `build-and-install.sh`: Build + instalación
   - `nvm-exec.sh`: Ejecución con NVM
   - `setup-vscode-path.sh`: Configuración de paths

   ##### 12.3. TypeScript Config
   - `tsconfig.json`: Config principal
   - `tsconfig.build.json`: Config de build
   - Target: ES2020, Module: CommonJS

#### 13. DOCUMENTACIÓN DE DESARROLLO (`vibecoding/`)

   ##### 13.1. Rounds de Desarrollo (1-12)
   - Cada round: input, development, output
   - Metodología VibeCoding/micro-sprints

   ##### 13.2. Session Overview
   - Estado global del refactoring
   - Progreso por ronda

   ##### 13.3. Codebase References
   - `codebase.md`: Referencias externas

#### 14. PLANIFICACIÓN (`PLANIFICACION/`)

   ##### 14.1. Plan Arquitectónico
   - `plan_arrakis_theater.md`: Arquitectura modular

   ##### 14.2. Estudios
   - `estudio_elenco.md`: ChatParticipants
   - `estudio_teatro.md`: Motor de teatro

#### 15. FEATURE CONFIGS (`FEATURE_CONFIGS/`)

   ##### 15.1. Guías de Arquitectura
   - `ARCHITECTURE_GUIDE.md`: Estado actual + propuesta

   ##### 15.2. Documentación de Comandos
   - `CONFIGURATION_COMMANDS.md`

   ##### 15.3. Planes
   - `EXECUTIVE_PLAN.md`
   - `IMPEDIMENTS_PLAN.md`

#### 16. PROBLEMAS ARQUITECTURALES DETECTADOS

   ##### 16.1. Duplicación de Lógica
   - configsTreeView vs HackerConfigPanelProvider
   - Acceso directo a settings desde múltiples puntos

   ##### 16.2. Fuentes Múltiples de Verdad
   - VS Code settings
   - sample-config.json
   - Archivos del workspace

   ##### 16.3. mcpConfigurationManager Aislado
   - No usado por componentes UI
   - Singleton sin integración

   ##### 16.4. Validación Fragmentada
   - Cada componente con su propia lógica

   ##### 16.5. Primera vs Segunda Época
   - Código legacy de gamification
   - Necesidad de limpieza modular

#### 17. PUNTOS DE EXTENSIÓN

   ##### 17.1. Nuevos Agentes Teatrales
   - Añadir en `theatrical/agents/`
   - Registrar en TheatricalChatManager

   ##### 17.2. Nuevos TreeViews
   - Crear Provider en `treeViews/`
   - Registrar en package.json views

   ##### 17.3. Nuevos Comandos
   - Añadir en package.json commands
   - Implementar handler

   ##### 17.4. Nuevos Schemas
   - Añadir en `schemas/`
   - Integrar con validadores

#### 18. INTEGRACIÓN CON SCRIPTORIUM

   ##### 18.1. Mapeo de Agentes
   - Scriptorium (20+) ↔ Extensión (5 activos)
   - Propuesta de expansión

   ##### 18.2. Mapeo de Plugins
   - registry.json ↔ Extensión
   - Bridge agents

   ##### 18.3. Backlogs
   - Lectura/escritura de BACKLOG-*.md
   - Vista de Sprints

#### 19. APÉNDICES TÉCNICOS

   19.1. Diagrama de clases UML  
   19.2. Diagrama de secuencia (activación)  
   19.3. Diagrama de secuencia (ChatParticipant flow)  
   19.4. API Reference de interfaces públicas  
   19.5. Checklist de migración Primera→Segunda Época

---

## 🔄 PROPUESTA DE TRABAJO

### Fase 1: Análisis Profundo
- [ ] Desarrollar secciones del Informe Funcional
- [ ] Desarrollar secciones del Informe Técnico

### Fase 2: Diagramas
- [ ] Generar diagramas Mermaid para arquitectura
- [ ] Generar diagramas de flujo para casos de uso

### Fase 3: Recomendaciones
- [ ] Documento de deuda técnica
- [ ] Propuesta de refactorización

---

## 📊 MÉTRICAS DE LA CODEBASE

| Métrica | Valor |
|---------|-------|
| Archivos TypeScript (src/) | ~40+ |
| Líneas totales estimadas | ~15,000+ |
| Comandos registrados | ~80+ |
| TreeViews | 6 |
| WebViews (Hacker Panels) | 3 |
| ChatParticipants | 5 |
| Agentes teatrales definidos | 5 |
| Schemas JSON | 6+ |
| Tests | ~10+ archivos |
| Rounds de desarrollo | 12 |

---

*Documento generado automáticamente para facilitar el análisis exhaustivo de la codebase.*
