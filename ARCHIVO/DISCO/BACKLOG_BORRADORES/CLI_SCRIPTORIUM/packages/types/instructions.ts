/**
 * Tipos para instrucciones de contexto
 * @see ARCHIVO/DEVOPS/Tecnico.md § 2.4
 */

/**
 * Frontmatter de una instrucción
 */
export interface InstructionFrontmatter {
  name: string;
  description: string;
  applyTo: string; // glob pattern
}

/**
 * Definición completa de una instrucción
 */
export interface InstructionDefinition {
  /** Nombre único de la instrucción */
  name: string;
  /** Descripción breve */
  description: string;
  /** Patrón glob de archivos donde aplica */
  applyTo: string;
  /** Contenido Markdown de la instrucción */
  content: string;
  /** Ruta al archivo .instructions.md */
  filePath: string;
  /** Timestamp de última modificación */
  lastModified: Date;
}

/**
 * Mapa de instrucciones indexado por nombre
 */
export type InstructionMap = Map<string, InstructionDefinition>;

/**
 * Resumen de instrucción para listados
 */
export interface InstructionSummary {
  name: string;
  description: string;
  applyTo: string;
}

/**
 * Resultado de carga de instrucciones
 */
export interface InstructionLoadResult {
  success: boolean;
  instructions: InstructionDefinition[];
  errors: InstructionLoadError[];
  duration: number;
}

export interface InstructionLoadError {
  filePath: string;
  error: string;
  recoverable: boolean;
}

/**
 * Matcher para determinar si una instrucción aplica a un archivo
 */
export interface InstructionMatcher {
  /** Verificar si aplica a un archivo */
  matches(instruction: InstructionDefinition, filePath: string): boolean;
  /** Obtener todas las instrucciones que aplican a un archivo */
  getApplicable(instructions: InstructionDefinition[], filePath: string): InstructionDefinition[];
}
