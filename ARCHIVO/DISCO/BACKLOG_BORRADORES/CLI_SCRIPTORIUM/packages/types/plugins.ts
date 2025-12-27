/**
 * Tipos para el sistema de plugins
 * @see ARCHIVO/DEVOPS/Tecnico.md § 3
 * @see .github/PLUGINS.md
 */

/**
 * Handoff expuesto por un plugin
 */
export interface PluginHandoff {
  /** Etiqueta de la acción */
  label: string;
  /** Agente que ejecuta la acción */
  agent: string;
}

/**
 * Frontmatter del manifest.md de un plugin
 */
export interface PluginManifestFrontmatter {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license?: string;
  scriptorium_version: string;
  dependencies: string[];
  agents?: PluginAgentRef[];
  prompts?: PluginPromptRef[];
  instructions?: PluginInstructionRef[];
  handoffs?: PluginHandoff[];
}

export interface PluginAgentRef {
  name: string;
  file: string;
  description: string;
}

export interface PluginPromptRef {
  name: string;
  file: string;
  description: string;
}

export interface PluginInstructionRef {
  name: string;
  file: string;
}

/**
 * Definición completa de un plugin (registry.json)
 */
export interface PluginDefinition {
  /** Identificador único (kebab-case) */
  id: string;
  /** Nombre legible */
  name: string;
  /** Versión semver */
  version: string;
  /** Descripción breve */
  description: string;
  /** Autor del plugin */
  author: string;
  /** Fecha de instalación */
  installedAt: Date;
  /** Fecha de última actualización */
  updatedAt?: Date;
  /** Si el plugin está habilitado */
  enabled: boolean;
  /** Número de agentes */
  agentsCount: number;
  /** Número de prompts */
  promptsCount: number;
  /** Directorio de datos (ARCHIVO/PLUGINS/{ID}/) */
  dataDirectory: string;
  /** Agente bridge en .github/agents/ */
  bridgeAgent: string;
  /** Plugins requeridos */
  dependencies: string[];
  /** Plugins opcionales */
  optionalDependencies?: string[];
  /** Submódulo Git asociado */
  submodule?: string;
  /** Handoffs expuestos */
  handoffs: PluginHandoff[];
  /** Configuración específica del plugin */
  config?: Record<string, unknown>;
}

/**
 * Registro de plugins (registry.json)
 */
export interface PluginRegistry {
  /** Versión del esquema del registry */
  version: string;
  /** Timestamp de última actualización */
  lastUpdated: Date;
  /** Mapa de plugins por ID */
  plugins: Record<string, PluginRegistryEntry>;
}

/**
 * Entrada en el registry (formato JSON)
 */
export interface PluginRegistryEntry {
  name: string;
  version: string;
  description: string;
  author: string;
  installed_at: string;
  updated_at?: string;
  enabled: boolean;
  agents_count: number;
  prompts_count: number;
  data_directory: string;
  bridge_agent: string;
  dependencies: string[];
  optional_dependencies?: string[];
  submodule?: string;
  handoffs: PluginHandoff[];
  [key: string]: unknown;
}

/**
 * Estado de un plugin en VS Code settings
 */
export interface PluginSettingsState {
  promptsEnabled: boolean;
  instructionsEnabled: boolean;
}

/**
 * Mapa de plugins indexado por ID
 */
export type PluginMap = Map<string, PluginDefinition>;

/**
 * Resumen de plugin para listados
 */
export interface PluginSummary {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  agentsCount: number;
  hasSubmodule: boolean;
}

/**
 * Umbrales de plugins activos
 * @see plugin-manager.agent.md
 */
export const PLUGIN_THRESHOLDS = {
  OPTIMAL: { max: 3, status: '🟢', message: 'Sin impacto' },
  ACCEPTABLE: { max: 6, status: '🟡', message: 'Mínimo impacto' },
  LOADED: { max: 10, status: '🟠', message: 'Posible lentitud en autocompletado' },
  OVERLOADED: { max: Infinity, status: '🔴', message: 'Recomendado desactivar algunos' }
} as const;

/**
 * Resultado de operación de plugin
 */
export interface PluginOperationResult {
  success: boolean;
  pluginId: string;
  operation: 'install' | 'enable' | 'disable' | 'uninstall';
  message: string;
  error?: string;
}

/**
 * Estado del sistema de plugins
 */
export interface PluginSystemStatus {
  totalInstalled: number;
  totalEnabled: number;
  thresholdStatus: keyof typeof PLUGIN_THRESHOLDS;
  recommendation?: string;
}
