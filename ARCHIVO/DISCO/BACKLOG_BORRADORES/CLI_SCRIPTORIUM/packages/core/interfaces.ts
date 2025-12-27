/**
 * Interfaces para servicios del core
 * @see Plan Arquitectura § 4
 */

import type {
  AgentDefinition,
  AgentLayer,
  PluginDefinition,
  PluginRegistry,
  InstructionDefinition,
  PromptDefinition,
  SubmoduleDefinition,
  WatchEvent,
  SyncResult,
  SyncStatus,
  SyncOptions,
  Disposable,
  Subscription
} from '@scriptorium/types';

// ============================================
// Índices Funcional/Técnico
// ============================================

/**
 * Índice Funcional parseado
 */
export interface FunctionalIndex {
  /** Puntos de entrada por perfil */
  entryPoints: EntryPoint[];
  /** Capacidades principales */
  capabilities: Capability[];
  /** Capas de agentes */
  agentLayers: AgentLayerInfo[];
  /** Flujos de trabajo */
  workflows: WorkflowInfo[];
  /** Invocaciones comunes */
  commonInvocations: InvocationExample[];
  /** Recursos de ayuda */
  resources: ResourceLink[];
  /** Métricas del sistema */
  metrics: SystemMetrics;
}

export interface EntryPoint {
  profile: string;
  cardDoor: string;
  location: string;
}

export interface Capability {
  name: string;
  description: string;
  handoff?: string;
  plugin?: string;
}

export interface AgentLayerInfo {
  layer: AgentLayer;
  symbol: string;
  description: string;
  agents: string[];
}

export interface WorkflowInfo {
  name: string;
  steps: string[];
  agents: string[];
}

export interface InvocationExample {
  description: string;
  command: string;
}

export interface ResourceLink {
  name: string;
  location: string;
  purpose: string;
}

export interface SystemMetrics {
  agentsCore: number;
  agentsBridge: number;
  plugins: number;
  submodules: number;
  prompts: number;
  instructions: number;
}

/**
 * Índice Técnico parseado
 */
export interface TechnicalIndex {
  /** Diagrama de capas */
  layersDiagram: string;
  /** Tecnologías base */
  technologies: TechnologyInfo[];
  /** Estructura de directorios */
  directoryStructure: DirectoryNode;
  /** Archivos críticos */
  criticalFiles: CriticalFile[];
  /** Plugins instalados */
  plugins: PluginInfo[];
  /** Submódulos instalados */
  submodules: SubmoduleInfo[];
  /** Scripts disponibles */
  scripts: ScriptInfo[];
  /** Flujo DevOps */
  devopsFlow: DevOpsInfo;
}

export interface TechnologyInfo {
  component: string;
  technology: string;
  version: string;
}

export interface DirectoryNode {
  name: string;
  type: 'file' | 'directory';
  description?: string;
  children?: DirectoryNode[];
}

export interface CriticalFile {
  path: string;
  purpose: string;
  updateWhen: string;
}

export interface PluginInfo {
  id: string;
  version: string;
  submodule?: string;
  bridge: string;
}

export interface SubmoduleInfo {
  name: string;
  branch: string;
  plugin?: string;
  runtime?: string;
}

export interface ScriptInfo {
  name: string;
  purpose: string;
}

export interface DevOpsInfo {
  methodology: string;
  commitTypes: string[];
  scopes: Record<string, string[]>;
}

// ============================================
// Loaders
// ============================================

/**
 * Cargador genérico de recursos
 */
export interface IResourceLoader<T> {
  /**
   * Cargar un recurso por ruta
   */
  load(path: string): Promise<T>;
  
  /**
   * Cargar múltiples recursos por patrón glob
   */
  loadAll(pattern: string): Promise<T[]>;
  
  /**
   * Observar cambios en recursos
   */
  watch(pattern: string, callback: (event: WatchEvent, resource: T) => void): Disposable;
  
  /**
   * Invalidar cache de un recurso
   */
  invalidate(path: string): void;
  
  /**
   * Limpiar todo el cache
   */
  clearCache(): void;
}

/**
 * Cargador especializado de agentes
 */
export interface IAgentLoader extends IResourceLoader<AgentDefinition> {
  /**
   * Cargar agentes por capa
   */
  loadByLayer(layer: AgentLayer): Promise<AgentDefinition[]>;
  
  /**
   * Cargar solo agentes bridge
   */
  loadBridges(): Promise<AgentDefinition[]>;
  
  /**
   * Cargar solo agentes core (no bridges)
   */
  loadCore(): Promise<AgentDefinition[]>;
  
  /**
   * Resolver handoffs de un agente a sus definiciones
   */
  resolveHandoffs(agent: AgentDefinition): Promise<AgentDefinition[]>;
  
  /**
   * Obtener grafo de dependencias entre agentes
   */
  getDependencyGraph(): Promise<AgentDependencyGraph>;
}

export interface AgentDependencyGraph {
  nodes: string[];
  edges: Array<{ from: string; to: string; label: string }>;
}

/**
 * Cargador de plugins
 */
export interface IPluginLoader extends IResourceLoader<PluginDefinition> {
  /**
   * Cargar el registry completo
   */
  loadRegistry(): Promise<PluginRegistry>;
  
  /**
   * Cargar solo plugins habilitados
   */
  loadEnabled(): Promise<PluginDefinition[]>;
  
  /**
   * Obtener directorio de datos de un plugin
   */
  getDataDirectory(pluginId: string): string;
  
  /**
   * Verificar si un plugin existe
   */
  exists(pluginId: string): Promise<boolean>;
  
  /**
   * Obtener estado de un plugin en VS Code settings
   */
  getSettingsState(pluginId: string): Promise<{ prompts: boolean; instructions: boolean }>;
}

/**
 * Cargador de instrucciones
 */
export interface IInstructionLoader extends IResourceLoader<InstructionDefinition> {
  /**
   * Obtener instrucciones aplicables a un archivo
   */
  getApplicable(filePath: string): Promise<InstructionDefinition[]>;
}

/**
 * Cargador de prompts
 */
export interface IPromptLoader extends IResourceLoader<PromptDefinition> {
  /**
   * Buscar prompts por tag
   */
  findByTag(tag: string): Promise<PromptDefinition[]>;
  
  /**
   * Buscar prompts relacionados con un agente
   */
  findByAgent(agentName: string): Promise<PromptDefinition[]>;
}

/**
 * Cargador de submódulos
 */
export interface ISubmoduleLoader {
  /**
   * Cargar todos los submódulos desde .gitmodules
   */
  loadAll(): Promise<SubmoduleDefinition[]>;
  
  /**
   * Verificar estado de sincronización
   */
  checkStatus(name: string): Promise<SubmoduleDefinition>;
  
  /**
   * Obtener submódulos asociados a un plugin
   */
  getByPlugin(pluginId: string): Promise<SubmoduleDefinition | null>;
}

/**
 * Cargador de índices DRY
 */
export interface IIndexLoader {
  /**
   * Cargar índice funcional
   */
  loadFunctional(): Promise<FunctionalIndex>;
  
  /**
   * Cargar índice técnico
   */
  loadTechnical(): Promise<TechnicalIndex>;
  
  /**
   * Observar cambios en índices
   */
  watch(callback: (index: 'functional' | 'technical') => void): Disposable;
  
  /**
   * Forzar recarga de índices
   */
  reload(): Promise<void>;
}

// ============================================
// Parsers
// ============================================

/**
 * Parser de Markdown con frontmatter
 */
export interface IMarkdownParser {
  /**
   * Parsear contenido Markdown completo
   */
  parse<T = unknown>(content: string): ParsedMarkdown<T>;
  
  /**
   * Extraer solo frontmatter
   */
  extractFrontmatter<T = unknown>(content: string): T | null;
  
  /**
   * Extraer secciones por nivel de heading
   */
  extractSections(content: string): MarkdownSection[];
  
  /**
   * Extraer tablas
   */
  extractTables(content: string): MarkdownTable[];
  
  /**
   * Extraer bloques de código
   */
  extractCodeBlocks(content: string): CodeBlock[];
  
  /**
   * Extraer enlaces
   */
  extractLinks(content: string): MarkdownLink[];
}

export interface ParsedMarkdown<T = unknown> {
  frontmatter: T | null;
  content: string;
  sections: MarkdownSection[];
  tables: MarkdownTable[];
  codeBlocks: CodeBlock[];
  links: MarkdownLink[];
  rawContent: string;
}

export interface MarkdownSection {
  level: number;
  title: string;
  content: string;
  lineRange: [number, number];
  children: MarkdownSection[];
  id?: string;
}

export interface MarkdownTable {
  headers: string[];
  rows: string[][];
  lineRange: [number, number];
  alignment?: ('left' | 'center' | 'right')[];
}

export interface CodeBlock {
  language: string;
  content: string;
  lineRange: [number, number];
  meta?: string;
}

export interface MarkdownLink {
  text: string;
  url: string;
  title?: string;
  lineNumber: number;
}

// ============================================
// Sincronización
// ============================================

/**
 * Servicio de sincronización del Scriptorium
 */
export interface ISyncService {
  /**
   * Sincronización completa de todos los recursos
   */
  syncAll(options?: SyncOptions): Promise<SyncResult>;
  
  /**
   * Sincronizar solo agentes
   */
  syncAgents(): Promise<SyncResult>;
  
  /**
   * Sincronizar solo plugins
   */
  syncPlugins(): Promise<SyncResult>;
  
  /**
   * Sincronizar solo instrucciones
   */
  syncInstructions(): Promise<SyncResult>;
  
  /**
   * Sincronizar solo prompts
   */
  syncPrompts(): Promise<SyncResult>;
  
  /**
   * Verificar estado de sincronización
   */
  checkStatus(): Promise<SyncStatus>;
  
  /**
   * Iniciar modo watch (hot-reload)
   */
  startWatching(): Promise<void>;
  
  /**
   * Detener modo watch
   */
  stopWatching(): Promise<void>;
  
  /**
   * Suscribirse a eventos de sincronización
   */
  onSync(callback: (result: SyncResult) => void): Subscription;
  
  /**
   * Suscribirse a eventos de cambio de archivo
   */
  onFileChange(callback: (event: WatchEvent) => void): Subscription;
}

/**
 * Gestor de cache
 */
export interface ICacheManager {
  /**
   * Obtener valor del cache
   */
  get<T>(key: string): T | undefined;
  
  /**
   * Establecer valor en cache
   */
  set<T>(key: string, value: T, ttl?: number): void;
  
  /**
   * Invalidar una entrada
   */
  invalidate(key: string): void;
  
  /**
   * Invalidar por patrón
   */
  invalidatePattern(pattern: string): void;
  
  /**
   * Limpiar todo el cache
   */
  clear(): void;
  
  /**
   * Obtener estadísticas del cache
   */
  getStats(): CacheStats;
}

export interface CacheStats {
  entries: number;
  hits: number;
  misses: number;
  hitRate: number;
  memoryUsage: number;
}
