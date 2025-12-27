/**
 * Tipos para configuración del workspace
 * @see .github/workspace-config.json
 * @see ARCHIVO/DEVOPS/Tecnico.md § 5
 */

/**
 * Configuración del workspace (workspace-config.json)
 */
export interface WorkspaceConfig {
  workspace: {
    /** Rama de trabajo activa */
    branch: string;
    /** Nota sobre la rama */
    branchNote?: string;
    /** Política de commits */
    commitPolicy: CommitPolicy;
  };
  git: {
    /** Rama por defecto para submódulos */
    submoduleBranch: string;
  };
  changelog?: ChangelogEntry[];
}

/**
 * Política de commits
 */
export interface CommitPolicy {
  /** Ramas protegidas (no commits directos) */
  protectedBranches: string[];
}

/**
 * Entrada del changelog de config
 */
export interface ChangelogEntry {
  date: string;
  change: string;
  author?: string;
}

// ============================================
// Submódulos
// ============================================

/**
 * Definición de un submódulo Git
 * @see Tecnico.md § 4.1
 */
export interface SubmoduleDefinition {
  /** Nombre del submódulo */
  name: string;
  /** Ruta relativa en el workspace */
  path: string;
  /** URL del repositorio */
  url: string;
  /** Rama activa */
  branch: string;
  /** Plugin asociado (si existe) */
  associatedPlugin?: string;
  /** Tecnología de runtime */
  runtime?: string;
  /** Estado de sincronización */
  syncStatus?: SubmoduleSyncStatus;
}

/**
 * Estado de sincronización de submódulo
 */
export interface SubmoduleSyncStatus {
  /** Si está inicializado */
  initialized: boolean;
  /** Si tiene cambios locales */
  hasLocalChanges: boolean;
  /** Si está adelante/atrás del remoto */
  aheadBehind?: {
    ahead: number;
    behind: number;
  };
  /** Último commit local */
  lastCommit?: string;
}

/**
 * Mapa de submódulos indexado por nombre
 */
export type SubmoduleMap = Map<string, SubmoduleDefinition>;

// ============================================
// Estado global del CLI
// ============================================

import type { AgentMap } from './agents';
import type { PluginMap } from './plugins';
import type { InstructionMap } from './instructions';
import type { PromptMap } from './prompts';
import type { MenuDefinition } from './menu';
import type { FileWatcherState, SyncStatus } from './sync';

/**
 * Estado global del Scriptorium CLI
 */
export interface ScriptoriumState {
  /** Configuración del workspace */
  workspace: WorkspaceConfig;
  /** Agentes cargados */
  agents: AgentMap;
  /** Plugins cargados */
  plugins: PluginMap;
  /** Instrucciones cargadas */
  instructions: InstructionMap;
  /** Prompts cargados */
  prompts: PromptMap;
  /** Submódulos configurados */
  submodules: SubmoduleMap;
  /** Menú actual */
  menu: MenuDefinition | null;
  /** Watchers activos */
  watchers: FileWatcherState[];
  /** Estado de sincronización */
  syncStatus: SyncStatus;
  /** Timestamp de inicio */
  startedAt: Date;
}

/**
 * Opciones de inicialización del estado
 */
export interface StateInitOptions {
  /** Ruta al workspace */
  workspacePath: string;
  /** Iniciar watchers automáticamente */
  autoWatch: boolean;
  /** Cargar todos los recursos al inicio */
  preload: boolean;
  /** Modo verbose */
  verbose: boolean;
}

/**
 * Resultado de inicialización del estado
 */
export interface StateInitResult {
  success: boolean;
  state: ScriptoriumState;
  warnings: string[];
  errors: string[];
  duration: number;
}

// ============================================
// Paths y convenciones
// ============================================

/**
 * Rutas canónicas del Scriptorium
 */
export const SCRIPTORIUM_PATHS = {
  // .github/
  AGENTS: '.github/agents',
  INSTRUCTIONS: '.github/instructions',
  PROMPTS: '.github/prompts',
  PLUGINS: '.github/plugins',
  REGISTRY: '.github/plugins/registry.json',
  WORKSPACE_CONFIG: '.github/workspace-config.json',
  DEVOPS: '.github/DEVOPS.md',
  BACKLOG: '.github/BACKLOG-SCRIPTORIUM.md',
  
  // ARCHIVO/
  ARCHIVO_DEVOPS: 'ARCHIVO/DEVOPS',
  FUNCIONAL_INDEX: 'ARCHIVO/DEVOPS/Funcional.md',
  TECNICO_INDEX: 'ARCHIVO/DEVOPS/Tecnico.md',
  DISCO: 'ARCHIVO/DISCO',
  PLUGINS_DATA: 'ARCHIVO/PLUGINS',
  
  // docs/
  DOCS: 'docs',
  
  // Índices estructurales
  SPLASH_INDEX: 'ARCHIVO/DISCO/SPLASH/index.md',
  README_INDEX: 'ARCHIVO/DISCO/README/index.md'
} as const;

/**
 * Patrones glob para discovery
 */
export const DISCOVERY_PATTERNS = {
  AGENTS: '.github/agents/*.agent.md',
  BRIDGE_AGENTS: '.github/agents/plugin_ox_*.agent.md',
  INSTRUCTIONS: '.github/instructions/*.instructions.md',
  PROMPTS: '.github/prompts/*.prompt.md',
  PLUGIN_AGENTS: '.github/plugins/*/agents/*.agent.md',
  PLUGIN_PROMPTS: '.github/plugins/*/prompts/*.prompt.md',
  PLUGIN_INSTRUCTIONS: '.github/plugins/*/instructions/*.instructions.md'
} as const;

/**
 * Convención de nombres
 */
export const NAMING_CONVENTIONS = {
  /** Plugin ID: kebab-case */
  PLUGIN_ID: /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
  /** Plugin data directory: SCREAMING_SNAKE_CASE */
  PLUGIN_DATA_DIR: /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/,
  /** Agente: PascalCase */
  AGENT_NAME: /^[A-Z][a-zA-Z0-9]*$/,
  /** Bridge: plugin_ox_{id} */
  BRIDGE_AGENT: /^plugin_ox_[a-z][a-z0-9]*$/
} as const;
