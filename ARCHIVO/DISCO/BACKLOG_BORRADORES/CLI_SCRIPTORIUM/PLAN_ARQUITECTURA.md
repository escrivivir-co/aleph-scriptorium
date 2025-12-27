# Plan Arquitectónico: CLI Scriptorium

> **Épica**: CLI-1.0.0  
> **Sprint**: Pendiente asignación  
> **Fecha propuesta**: 2025-12-27  
> **Estado**: 📐 Diseño (anchura sin profundidad)

---

## 1. Visión del Producto

### 1.1 Objetivo

Aplicación de consola Node.js con TypeScript que:
1. **Modela** la carpeta `.github/` según los índices `ARCHIVO/DEVOPS/`
2. **Renderiza** menús de consola estructurados desde `SPLASH/index.md` y `README/index.md`
3. **Carga dinámicamente** plantillas `.md` en runtime con hot-reload
4. **Sincroniza** el Scriptorium detectando modificaciones en archivos

### 1.2 Filosofía de Diseño

| Principio | Implementación |
|-----------|----------------|
| **DRY** | Los índices son la fuente de verdad, no el código |
| **Hot-reload** | `chokidar` para watch de archivos |
| **Tipado estricto** | Interfaces derivadas de los índices |
| **Extensible** | Sistema de plugins igual que Scriptorium |

---

## 2. Estructura de Paquetes (Monorepo)

```
scriptorium-cli/
├── package.json              # Workspace raíz
├── tsconfig.base.json        # Config TS compartida
├── pnpm-workspace.yaml       # Workspace pnpm
│
├── packages/
│   ├── @scriptorium/core/           # Núcleo: parsers, loaders, watchers
│   ├── @scriptorium/types/          # Tipos e interfaces compartidos
│   ├── @scriptorium/cli/            # Aplicación de consola
│   ├── @scriptorium/menu-renderer/  # Renderizador de menús
│   ├── @scriptorium/md-parser/      # Parser de Markdown + frontmatter
│   ├── @scriptorium/agent-runtime/  # Runtime de agentes
│   └── @scriptorium/plugin-loader/  # Cargador de plugins
│
└── apps/
    └── cli/                  # Entry point principal
```

---

## 3. Ontología de Tipos (@scriptorium/types)

### 3.1 Entidades del Scriptorium

```typescript
// ============================================
// ARCHIVO/DEVOPS/Funcional.md → Tipos Usuario
// ============================================

/**
 * Capas del sistema de agentes
 * @see Funcional.md § 4
 */
export enum AgentLayer {
  UI = 'ui',
  BACKEND = 'backend',
  SYSTEM = 'system',
  META = 'meta',
  PLUGINS = 'plugins'
}

/**
 * Símbolos de las banderas
 * @see Funcional.md § 4.2
 */
export enum FlagSymbol {
  BLUE = '🔵',
  BLACK = '⚫',
  RED = '🔴',
  YELLOW = '🟡',
  ORANGE = '🟠'
}

/**
 * Perfiles de usuario (Vestíbulo)
 * @see Funcional.md § 2.1
 */
export interface UserProfile {
  id: string;
  name: string;
  cardDoor: CardDoor;
  createdAt: Date;
}

/**
 * Carta-puerta para orientación
 */
export interface CardDoor {
  type: 'vista-total' | 'blueflag' | 'blackflag' | 'redflag' | 'yellowflag';
  path: string;
  emphasis: string[];
}
```

### 3.2 Entidades Técnicas

```typescript
// ============================================
// ARCHIVO/DEVOPS/Tecnico.md → Tipos Técnicos
// ============================================

/**
 * Definición de un agente
 * @see Tecnico.md § 2.3
 */
export interface AgentDefinition {
  name: string;
  description: string;
  argumentHint?: string;
  tools: Tool[];
  handoffs: Handoff[];
  layer: AgentLayer;
  symbol?: string;
  filePath: string;
}

/**
 * Herramientas disponibles para agentes
 */
export type Tool = 
  | 'vscode' 
  | 'execute' 
  | 'read' 
  | 'edit' 
  | 'search' 
  | 'web' 
  | 'playwright/*' 
  | 'agent' 
  | 'todo';

/**
 * Delegación entre agentes
 */
export interface Handoff {
  label: string;
  agent: string;
  prompt: string;
  send: boolean;
}

/**
 * Definición de un plugin
 * @see Tecnico.md § 3.1
 */
export interface PluginDefinition {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  installedAt: Date;
  enabled: boolean;
  agentsCount: number;
  promptsCount: number;
  dataDirectory: string;
  bridgeAgent: string;
  dependencies: string[];
  optionalDependencies?: string[];
  submodule?: string;
  handoffs: PluginHandoff[];
}

export interface PluginHandoff {
  label: string;
  agent: string;
}

/**
 * Definición de una instrucción
 * @see Tecnico.md § 2.4
 */
export interface InstructionDefinition {
  name: string;
  description: string;
  applyTo: string; // glob pattern
  content: string;
  filePath: string;
}

/**
 * Definición de un prompt
 */
export interface PromptDefinition {
  name: string;
  description?: string;
  content: string;
  filePath: string;
}

/**
 * Submódulo Git
 * @see Tecnico.md § 4.1
 */
export interface SubmoduleDefinition {
  name: string;
  path: string;
  url: string;
  branch: string;
  associatedPlugin?: string;
  runtime?: string;
}
```

### 3.3 Estructura del Menú (SPLASH)

```typescript
// ============================================
// ARCHIVO/DISCO/SPLASH/index.md → Menús
// ============================================

/**
 * Nodo de navegación en el menú
 */
export interface MenuNode {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  type: MenuNodeType;
  children?: MenuNode[];
  action?: MenuAction;
  path?: string; // referencia a archivo .md
}

export type MenuNodeType = 
  | 'section'      // Sección contenedora
  | 'command'      // Acción ejecutable
  | 'navigation'   // Navegar a submenú
  | 'info'         // Solo mostrar información
  | 'agent'        // Invocar agente
  | 'plugin';      // Invocar plugin

export interface MenuAction {
  type: 'invoke-agent' | 'run-prompt' | 'navigate' | 'execute' | 'display';
  target: string;
  args?: Record<string, unknown>;
}

/**
 * Sección del index.md (SPLASH)
 * @see SPLASH/index.md § 2.1
 */
export interface SplashSection {
  id: string;
  cssClass: string;
  lineRange: [number, number];
  elements: SplashElement[];
}

export interface SplashElement {
  type: 'badge' | 'card' | 'metric' | 'cta' | 'text';
  content: string;
  editable: boolean;
}
```

### 3.4 Estado del Sistema

```typescript
// ============================================
// Estado dinámico y sincronización
// ============================================

/**
 * Estado global del CLI
 */
export interface ScriptoriumState {
  workspace: WorkspaceConfig;
  agents: Map<string, AgentDefinition>;
  plugins: Map<string, PluginDefinition>;
  instructions: Map<string, InstructionDefinition>;
  prompts: Map<string, PromptDefinition>;
  submodules: Map<string, SubmoduleDefinition>;
  menu: MenuNode;
  watchers: FileWatcher[];
  lastSync: Date;
}

export interface WorkspaceConfig {
  branch: string;
  branchNote?: string;
  protectedBranches: string[];
  submoduleBranch: string;
}

export interface FileWatcher {
  path: string;
  type: 'agent' | 'plugin' | 'instruction' | 'prompt' | 'index';
  lastModified: Date;
  callback: (event: WatchEvent) => void;
}

export interface WatchEvent {
  type: 'add' | 'change' | 'unlink';
  path: string;
  timestamp: Date;
}

/**
 * Resultado de sincronización
 */
export interface SyncResult {
  success: boolean;
  added: string[];
  modified: string[];
  removed: string[];
  errors: SyncError[];
  duration: number;
}

export interface SyncError {
  path: string;
  error: string;
  recoverable: boolean;
}
```

---

## 4. Interfaces de Servicios (@scriptorium/core)

### 4.1 Cargadores (Loaders)

```typescript
// ============================================
// Interfaces para carga de recursos
// ============================================

/**
 * Cargador genérico de recursos Markdown
 */
export interface IResourceLoader<T> {
  load(path: string): Promise<T>;
  loadAll(pattern: string): Promise<T[]>;
  watch(pattern: string, callback: (event: WatchEvent, resource: T) => void): Disposable;
  invalidate(path: string): void;
}

/**
 * Cargador especializado de agentes
 */
export interface IAgentLoader extends IResourceLoader<AgentDefinition> {
  loadByLayer(layer: AgentLayer): Promise<AgentDefinition[]>;
  loadBridges(): Promise<AgentDefinition[]>;
  resolveHandoffs(agent: AgentDefinition): Promise<AgentDefinition[]>;
}

/**
 * Cargador de plugins
 */
export interface IPluginLoader extends IResourceLoader<PluginDefinition> {
  loadRegistry(): Promise<PluginRegistry>;
  loadEnabled(): Promise<PluginDefinition[]>;
  getDataDirectory(pluginId: string): string;
}

/**
 * Cargador de índices (Funcional/Técnico)
 */
export interface IIndexLoader {
  loadFunctional(): Promise<FunctionalIndex>;
  loadTechnical(): Promise<TechnicalIndex>;
  watch(callback: (index: 'functional' | 'technical') => void): Disposable;
}

/**
 * Recurso desechable (para cleanup de watchers)
 */
export interface Disposable {
  dispose(): void;
}
```

### 4.2 Parsers

```typescript
// ============================================
// Interfaces para parsing de Markdown
// ============================================

/**
 * Parser de Markdown con frontmatter
 */
export interface IMarkdownParser {
  parse<T>(content: string): ParsedMarkdown<T>;
  extractFrontmatter<T>(content: string): T | null;
  extractSections(content: string): MarkdownSection[];
  extractTables(content: string): MarkdownTable[];
}

export interface ParsedMarkdown<T = unknown> {
  frontmatter: T;
  content: string;
  sections: MarkdownSection[];
  tables: MarkdownTable[];
  codeBlocks: CodeBlock[];
}

export interface MarkdownSection {
  level: number;
  title: string;
  content: string;
  lineRange: [number, number];
  children: MarkdownSection[];
}

export interface MarkdownTable {
  headers: string[];
  rows: string[][];
  lineRange: [number, number];
}

export interface CodeBlock {
  language: string;
  content: string;
  lineRange: [number, number];
}
```

### 4.3 Sincronizador

```typescript
// ============================================
// Interfaces para sincronización
// ============================================

/**
 * Servicio de sincronización del Scriptorium
 */
export interface ISyncService {
  /** Sincronización completa */
  syncAll(): Promise<SyncResult>;
  
  /** Sincronizar solo agentes */
  syncAgents(): Promise<SyncResult>;
  
  /** Sincronizar solo plugins */
  syncPlugins(): Promise<SyncResult>;
  
  /** Verificar estado de sincronización */
  checkStatus(): Promise<SyncStatus>;
  
  /** Iniciar modo watch */
  startWatching(): Promise<void>;
  
  /** Detener modo watch */
  stopWatching(): Promise<void>;
  
  /** Suscribirse a eventos de sync */
  onSync(callback: (result: SyncResult) => void): Disposable;
}

export interface SyncStatus {
  isSynced: boolean;
  pendingChanges: number;
  lastSync: Date;
  watchersActive: boolean;
}
```

---

## 5. Interfaces de UI (@scriptorium/menu-renderer)

### 5.1 Renderizador de Menú

```typescript
// ============================================
// Interfaces para renderizado de consola
// ============================================

/**
 * Renderizador principal de menús
 */
export interface IMenuRenderer {
  /** Renderizar menú completo */
  render(menu: MenuNode): void;
  
  /** Renderizar sección específica */
  renderSection(section: SplashSection): void;
  
  /** Limpiar pantalla y re-renderizar */
  refresh(): void;
  
  /** Configurar tema */
  setTheme(theme: ConsoleTheme): void;
}

/**
 * Tema visual para consola
 */
export interface ConsoleTheme {
  primary: ChalkColor;
  secondary: ChalkColor;
  accent: ChalkColor;
  error: ChalkColor;
  warning: ChalkColor;
  success: ChalkColor;
  muted: ChalkColor;
  
  // Símbolos
  bullet: string;
  arrow: string;
  checkbox: string;
  checkboxChecked: string;
}

export type ChalkColor = 
  | 'black' | 'red' | 'green' | 'yellow' 
  | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';

/**
 * Componentes de UI
 */
export interface IUIComponents {
  box(content: string, options?: BoxOptions): string;
  table(data: string[][], options?: TableOptions): string;
  list(items: string[], options?: ListOptions): string;
  progress(current: number, total: number): string;
  spinner(message: string): Spinner;
}

export interface BoxOptions {
  title?: string;
  padding?: number;
  borderColor?: ChalkColor;
}

export interface TableOptions {
  headers?: string[];
  align?: ('left' | 'center' | 'right')[];
}

export interface ListOptions {
  numbered?: boolean;
  bullet?: string;
  indent?: number;
}

export interface Spinner {
  start(): void;
  stop(): void;
  succeed(message?: string): void;
  fail(message?: string): void;
}
```

### 5.2 Input de Usuario

```typescript
// ============================================
// Interfaces para input interactivo
// ============================================

/**
 * Gestor de input de usuario
 */
export interface IInputHandler {
  /** Selección de menú */
  select<T>(options: SelectOptions<T>): Promise<T>;
  
  /** Input de texto */
  text(options: TextOptions): Promise<string>;
  
  /** Confirmación */
  confirm(message: string, defaultValue?: boolean): Promise<boolean>;
  
  /** Autocompletado */
  autocomplete<T>(options: AutocompleteOptions<T>): Promise<T>;
  
  /** Editor multilínea */
  editor(options: EditorOptions): Promise<string>;
}

export interface SelectOptions<T> {
  message: string;
  choices: Choice<T>[];
  pageSize?: number;
  loop?: boolean;
}

export interface Choice<T> {
  name: string;
  value: T;
  description?: string;
  disabled?: boolean | string;
}

export interface TextOptions {
  message: string;
  default?: string;
  validate?: (input: string) => boolean | string;
}

export interface AutocompleteOptions<T> {
  message: string;
  source: (input: string) => Promise<Choice<T>[]>;
  pageSize?: number;
}

export interface EditorOptions {
  message: string;
  default?: string;
  extension?: string;
}
```

---

## 6. Interfaces de Runtime (@scriptorium/agent-runtime)

### 6.1 Ejecutor de Agentes

```typescript
// ============================================
// Runtime para ejecución de agentes
// ============================================

/**
 * Motor de ejecución de agentes
 */
export interface IAgentRuntime {
  /** Cargar agente en memoria */
  load(agent: AgentDefinition): Promise<AgentInstance>;
  
  /** Invocar agente con contexto */
  invoke(agentName: string, context: InvocationContext): Promise<AgentResponse>;
  
  /** Ejecutar handoff */
  handoff(from: string, to: string, context: InvocationContext): Promise<AgentResponse>;
  
  /** Listar agentes cargados */
  listLoaded(): AgentInstance[];
  
  /** Descargar agente */
  unload(agentName: string): void;
}

export interface AgentInstance {
  definition: AgentDefinition;
  state: AgentState;
  invocations: number;
  lastInvoked?: Date;
}

export interface AgentState {
  status: 'idle' | 'running' | 'error';
  context?: InvocationContext;
  error?: string;
}

export interface InvocationContext {
  input: string;
  arguments?: Record<string, unknown>;
  files?: string[];
  history?: ConversationTurn[];
}

export interface ConversationTurn {
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agent?: string;
}

export interface AgentResponse {
  success: boolean;
  output: string;
  handoff?: {
    agent: string;
    prompt: string;
  };
  artifacts?: Artifact[];
  error?: string;
}

export interface Artifact {
  type: 'file' | 'code' | 'json' | 'markdown';
  path?: string;
  content: string;
}
```

### 6.2 Sistema de Prompts

```typescript
// ============================================
// Sistema de prompts dinámicos
// ============================================

/**
 * Motor de prompts
 */
export interface IPromptEngine {
  /** Cargar prompt por nombre */
  load(name: string): Promise<PromptTemplate>;
  
  /** Renderizar prompt con variables */
  render(template: PromptTemplate, variables: Record<string, unknown>): string;
  
  /** Validar variables requeridas */
  validate(template: PromptTemplate, variables: Record<string, unknown>): ValidationResult;
  
  /** Hot-reload de prompts modificados */
  watch(): Disposable;
}

export interface PromptTemplate {
  name: string;
  content: string;
  variables: PromptVariable[];
  metadata: PromptMetadata;
}

export interface PromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  default?: unknown;
  description?: string;
}

export interface PromptMetadata {
  author?: string;
  version?: string;
  tags?: string[];
  relatedAgents?: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
```

---

## 7. Dependencias Propuestas

### 7.1 Runtime & Build

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `typescript` | ^5.3 | Tipado |
| `tsx` | ^4.7 | Ejecución directa TS |
| `pnpm` | ^8.15 | Package manager |
| `tsup` | ^8.0 | Bundling |
| `vitest` | ^1.2 | Testing |

### 7.2 Parsing & IO

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `gray-matter` | ^4.0 | Frontmatter YAML |
| `marked` | ^12.0 | Parse Markdown |
| `chokidar` | ^3.6 | File watching |
| `fast-glob` | ^3.3 | Glob patterns |
| `fs-extra` | ^11.2 | File operations |

### 7.3 UI de Consola

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `@inquirer/prompts` | ^4.0 | Input interactivo |
| `chalk` | ^5.3 | Colores terminal |
| `cli-table3` | ^0.6 | Tablas |
| `boxen` | ^7.1 | Cajas decorativas |
| `ora` | ^8.0 | Spinners |
| `figures` | ^6.0 | Símbolos Unicode |

### 7.4 CLI Framework

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `commander` | ^12.0 | Comandos CLI |
| `conf` | ^12.0 | Config persistente |
| `update-notifier` | ^7.0 | Notificar updates |

---

## 8. Mapa de Comandos CLI

```bash
# Navegación
scriptorium                    # Menú principal interactivo
scriptorium menu               # Alias del anterior
scriptorium menu --section=N   # Ir a sección específica

# Agentes
scriptorium agents             # Listar agentes
scriptorium agents --layer=ui  # Filtrar por capa
scriptorium invoke @aleph      # Invocar agente
scriptorium invoke @aleph --prompt="Redacta capítulo 3"

# Plugins
scriptorium plugins            # Listar plugins
scriptorium plugins enable X   # Activar plugin
scriptorium plugins disable X  # Desactivar plugin

# Sincronización
scriptorium sync               # Sincronizar todo
scriptorium sync --watch       # Modo watch
scriptorium status             # Estado de sincronización

# Índices
scriptorium index functional   # Ver índice funcional
scriptorium index technical    # Ver índice técnico
scriptorium index validate     # Validar coherencia DRY

# Configuración
scriptorium config             # Ver configuración
scriptorium config set KEY VAL # Modificar config
scriptorium config branch      # Ver/cambiar rama

# Desarrollo
scriptorium dev                # Modo desarrollo (watch + hot-reload)
scriptorium build              # Construir para producción
```

---

## 9. Arquitectura de Hot-Reload

```
┌─────────────────────────────────────────────────────────────┐
│                    SCRIPTORIUM CLI                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     SYNC SERVICE                             │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│   │ FileWatcher │  │ FileWatcher │  │ FileWatcher │        │
│   │  .github/   │  │  ARCHIVO/   │  │   docs/     │        │
│   │  agents/    │  │   DEVOPS/   │  │             │        │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│          │                │                │                │
│          └────────────────┼────────────────┘                │
│                           ▼                                  │
│              ┌────────────────────────┐                     │
│              │    EVENT AGGREGATOR    │                     │
│              │  (debounce 100ms)      │                     │
│              └───────────┬────────────┘                     │
│                          ▼                                   │
│              ┌────────────────────────┐                     │
│              │     CACHE MANAGER      │                     │
│              │  invalidate + reload   │                     │
│              └───────────┬────────────┘                     │
│                          ▼                                   │
│              ┌────────────────────────┐                     │
│              │     STATE UPDATER      │                     │
│              │  update ScriptoriumState│                    │
│              └───────────┬────────────┘                     │
│                          ▼                                   │
│              ┌────────────────────────┐                     │
│              │     UI NOTIFIER        │                     │
│              │  refresh if needed     │                     │
│              └────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Desglose para Equipos (Anchura → Profundidad)

### 10.1 Equipo Core

| Épica | Descripción | Entregable |
|-------|-------------|------------|
| CORE-1 | Parser de Markdown + frontmatter | `@scriptorium/md-parser` |
| CORE-2 | Sistema de Loaders | `@scriptorium/core/loaders` |
| CORE-3 | File Watcher + Hot-reload | `@scriptorium/core/sync` |
| CORE-4 | Cache Manager | `@scriptorium/core/cache` |

### 10.2 Equipo Types

| Épica | Descripción | Entregable |
|-------|-------------|------------|
| TYPES-1 | Tipos de agentes y plugins | `@scriptorium/types/agents` |
| TYPES-2 | Tipos de UI y menús | `@scriptorium/types/ui` |
| TYPES-3 | Tipos de sincronización | `@scriptorium/types/sync` |
| TYPES-4 | JSON Schemas de validación | `schemas/*.json` |

### 10.3 Equipo UI

| Épica | Descripción | Entregable |
|-------|-------------|------------|
| UI-1 | Renderizador de menús | `@scriptorium/menu-renderer` |
| UI-2 | Componentes de UI | `@scriptorium/menu-renderer/components` |
| UI-3 | Input Handler | `@scriptorium/cli/input` |
| UI-4 | Temas de consola | `@scriptorium/cli/themes` |

### 10.4 Equipo Runtime

| Épica | Descripción | Entregable |
|-------|-------------|------------|
| RUNTIME-1 | Agent Runtime | `@scriptorium/agent-runtime` |
| RUNTIME-2 | Prompt Engine | `@scriptorium/agent-runtime/prompts` |
| RUNTIME-3 | Plugin Loader | `@scriptorium/plugin-loader` |
| RUNTIME-4 | Integraciones MCP | `@scriptorium/agent-runtime/mcp` |

### 10.5 Equipo CLI

| Épica | Descripción | Entregable |
|-------|-------------|------------|
| CLI-1 | Comandos base | `apps/cli/commands` |
| CLI-2 | Modo interactivo | `apps/cli/interactive` |
| CLI-3 | Configuración | `apps/cli/config` |
| CLI-4 | Documentación | `docs/cli-usage.md` |

---

## 11. Criterios de Aceptación (DoD Transversal)

### 11.1 Por Paquete

- [ ] Tipado estricto (no `any`)
- [ ] Tests unitarios (>80% coverage)
- [ ] JSDoc en interfaces públicas
- [ ] README.md con ejemplos
- [ ] Exports limpios en index.ts

### 11.2 Por Épica

- [ ] Interfaces definidas antes de implementar
- [ ] Casos de uso documentados
- [ ] Integración con hot-reload probada
- [ ] Sin dependencias circulares

### 11.3 Sistema Completo

- [ ] Todas las plantillas .md cargables dinámicamente
- [ ] Sincronización detecta cambios en <1s
- [ ] Menú refleja estructura de índices
- [ ] Agentes invocables desde CLI
- [ ] Plugins activables/desactivables

---

## 12. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Parsing Markdown complejo | Medio | Usar marked + plugins custom |
| Hot-reload causa race conditions | Alto | Event aggregation + debounce |
| Tipado de frontmatter variable | Medio | Zod para validación runtime |
| Plugins con estructuras diferentes | Medio | Schema flexible + defaults |

---

## 13. Próximos Pasos

1. **Aprobar plan** → Crear épicas en backlog
2. **Setup monorepo** → pnpm + tsconfig base
3. **Tipos primero** → @scriptorium/types como fundamento
4. **Parser MD** → Núcleo para todo lo demás
5. **Integración incremental** → Un paquete cada sprint

---

> **Nota**: Este documento define **anchura** (interfaces, tipos, paquetes). La **profundidad** (implementación, algoritmos, edge cases) queda para los equipos que desglosarán cada épica.
