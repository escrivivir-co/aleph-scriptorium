/**
 * Tipos para prompts reutilizables
 * @see ARCHIVO/DEVOPS/Tecnico.md § 2
 */

/**
 * Frontmatter de un prompt (opcional)
 */
export interface PromptFrontmatter {
  name?: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
  relatedAgents?: string[];
}

/**
 * Definición completa de un prompt
 */
export interface PromptDefinition {
  /** Nombre derivado del archivo */
  name: string;
  /** Descripción (del frontmatter o inferida) */
  description?: string;
  /** Contenido Markdown del prompt */
  content: string;
  /** Ruta al archivo .prompt.md */
  filePath: string;
  /** Timestamp de última modificación */
  lastModified: Date;
  /** Metadatos adicionales del frontmatter */
  metadata?: PromptFrontmatter;
}

/**
 * Mapa de prompts indexado por nombre
 */
export type PromptMap = Map<string, PromptDefinition>;

/**
 * Resumen de prompt para listados
 */
export interface PromptSummary {
  name: string;
  description?: string;
  tags?: string[];
}

/**
 * Variable detectada en un prompt (sintaxis {{ variable }})
 */
export interface PromptVariable {
  /** Nombre de la variable */
  name: string;
  /** Tipo inferido */
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'unknown';
  /** Si es requerida */
  required: boolean;
  /** Valor por defecto */
  default?: unknown;
  /** Descripción (si está documentada) */
  description?: string;
}

/**
 * Template de prompt procesado
 */
export interface PromptTemplate {
  /** Nombre del prompt */
  name: string;
  /** Contenido raw del prompt */
  content: string;
  /** Variables detectadas */
  variables: PromptVariable[];
  /** Metadatos */
  metadata: PromptFrontmatter;
}

/**
 * Resultado de renderizado de prompt
 */
export interface PromptRenderResult {
  success: boolean;
  rendered: string;
  missingVariables: string[];
  warnings: string[];
}

/**
 * Resultado de validación de prompt
 */
export interface PromptValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Resultado de carga de prompts
 */
export interface PromptLoadResult {
  success: boolean;
  prompts: PromptDefinition[];
  errors: PromptLoadError[];
  duration: number;
}

export interface PromptLoadError {
  filePath: string;
  error: string;
  recoverable: boolean;
}
