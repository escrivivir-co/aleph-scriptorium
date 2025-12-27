/**
 * Tipos para el sistema de agentes
 * @see ARCHIVO/DEVOPS/Funcional.md § 4
 * @see ARCHIVO/DEVOPS/Tecnico.md § 2.3
 */

/**
 * Capas del sistema de agentes
 */
export enum AgentLayer {
  /** Capa de producción e interfaz con usuario */
  UI = 'ui',
  /** Capa de auditoría y validación (5 Banderas) */
  BACKEND = 'backend',
  /** Capa de navegación y orientación */
  SYSTEM = 'system',
  /** Capa de gestión del propio sistema */
  META = 'meta',
  /** Capa de plugins (bridges) */
  PLUGINS = 'plugins'
}

/**
 * Símbolos de las banderas de auditoría
 */
export enum FlagSymbol {
  BLUE = '🔵',
  BLACK = '⚫',
  RED = '🔴',
  YELLOW = '🟡',
  ORANGE = '🟠'
}

/**
 * Tipos de banderas disponibles
 */
export type FlagType = 'blueflag' | 'blackflag' | 'redflag' | 'yellowflag' | 'orangeflag';

/**
 * Herramientas disponibles para agentes
 */
export type AgentTool = 
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
 * Delegación entre agentes (handoff)
 */
export interface AgentHandoff {
  /** Etiqueta descriptiva de la acción */
  label: string;
  /** Nombre del agente destino */
  agent: string;
  /** Prompt inicial para el agente */
  prompt: string;
  /** Si enviar automáticamente (false = mostrar antes) */
  send: boolean;
}

/**
 * Frontmatter YAML de un agente
 */
export interface AgentFrontmatter {
  name: string;
  description: string;
  'argument-hint'?: string;
  tools: AgentTool[];
  handoffs: AgentHandoff[];
}

/**
 * Definición completa de un agente
 */
export interface AgentDefinition {
  /** Nombre único del agente */
  name: string;
  /** Descripción breve del agente */
  description: string;
  /** Hint de uso para el usuario */
  argumentHint?: string;
  /** Herramientas disponibles */
  tools: AgentTool[];
  /** Handoffs a otros agentes */
  handoffs: AgentHandoff[];
  /** Capa a la que pertenece */
  layer: AgentLayer;
  /** Símbolo visual (emoji) */
  symbol?: string;
  /** Ruta al archivo .agent.md */
  filePath: string;
  /** Contenido Markdown del agente */
  content: string;
  /** Timestamp de última modificación */
  lastModified: Date;
}

/**
 * Mapa de agentes indexado por nombre
 */
export type AgentMap = Map<string, AgentDefinition>;

/**
 * Resumen de un agente para listados
 */
export interface AgentSummary {
  name: string;
  description: string;
  layer: AgentLayer;
  symbol?: string;
  handoffsCount: number;
}

/**
 * Tests que aplica cada bandera
 */
export interface FlagTests {
  flag: FlagType;
  tests: string[];
  documentReference?: string;
}

/**
 * Catálogo de tests por bandera
 * @see Funcional.md § 4.2
 */
export const FLAG_TESTS: Record<FlagType, FlagTests> = {
  blueflag: {
    flag: 'blueflag',
    tests: ['Evidencia', 'Utilidad', 'Falsificabilidad', 'Posverdad'],
    documentReference: 'indicadores-fracaso-enero.md'
  },
  blackflag: {
    flag: 'blackflag',
    tests: ['Pólvora', 'Posverdad técnica', 'Captura enemiga'],
    documentReference: 'indicadores-fracaso-enero.md'
  },
  redflag: {
    flag: 'redflag',
    tests: ['Escala', 'Coerción', 'Suministro', 'Régimen material'],
    documentReference: 'indicadores-fracaso-enero.md'
  },
  yellowflag: {
    flag: 'yellowflag',
    tests: ['Pre/Trans', 'Cuadrantes', 'Mercantilización', 'Inconmensurabilidad']
  },
  orangeflag: {
    flag: 'orangeflag',
    tests: ['Registro', 'Género', 'Estilo', 'Auditorio']
  }
};

/**
 * Resultado de carga de agentes
 */
export interface AgentLoadResult {
  success: boolean;
  agents: AgentDefinition[];
  errors: AgentLoadError[];
  duration: number;
}

export interface AgentLoadError {
  filePath: string;
  error: string;
  recoverable: boolean;
}
