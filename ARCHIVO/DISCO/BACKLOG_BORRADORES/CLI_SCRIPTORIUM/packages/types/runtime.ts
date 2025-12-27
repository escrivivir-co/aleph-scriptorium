/**
 * Tipos para el runtime de agentes
 * @see Plan Arquitectura § 6
 */

import type { AgentDefinition, AgentHandoff } from './agents';

// ============================================
// Instancias y estado de agentes
// ============================================

/**
 * Estado de ejecución de un agente
 */
export type AgentStatus = 'idle' | 'loading' | 'running' | 'error' | 'completed';

/**
 * Estado interno de un agente cargado
 */
export interface AgentState {
  /** Estado actual */
  status: AgentStatus;
  /** Contexto de invocación actual */
  context?: InvocationContext;
  /** Último error (si status === 'error') */
  error?: string;
  /** Timestamp de último cambio de estado */
  lastStateChange: Date;
}

/**
 * Instancia de agente cargada en memoria
 */
export interface AgentInstance {
  /** Definición del agente */
  definition: AgentDefinition;
  /** Estado actual */
  state: AgentState;
  /** Número de invocaciones */
  invocations: number;
  /** Última invocación */
  lastInvoked?: Date;
  /** Tiempo total de ejecución (ms) */
  totalExecutionTime: number;
}

// ============================================
// Contexto de invocación
// ============================================

/**
 * Contexto para invocar un agente
 */
export interface InvocationContext {
  /** Input del usuario */
  input: string;
  /** Argumentos estructurados */
  arguments?: Record<string, unknown>;
  /** Archivos adjuntos */
  files?: FileAttachment[];
  /** Historial de conversación */
  history?: ConversationTurn[];
  /** Variables de entorno */
  env?: Record<string, string>;
  /** Configuración de la invocación */
  options?: InvocationOptions;
}

/**
 * Archivo adjunto
 */
export interface FileAttachment {
  /** Ruta al archivo */
  path: string;
  /** Contenido (si está cargado) */
  content?: string;
  /** Tipo MIME */
  mimeType?: string;
  /** Tamaño en bytes */
  size?: number;
}

/**
 * Turno en la conversación
 */
export interface ConversationTurn {
  /** Rol del participante */
  role: 'user' | 'agent' | 'system';
  /** Contenido del mensaje */
  content: string;
  /** Timestamp */
  timestamp: Date;
  /** Agente (si role === 'agent') */
  agent?: string;
  /** Metadatos adicionales */
  metadata?: Record<string, unknown>;
}

/**
 * Opciones de invocación
 */
export interface InvocationOptions {
  /** Timeout en ms */
  timeout?: number;
  /** Si mostrar progreso */
  showProgress?: boolean;
  /** Si permitir handoffs */
  allowHandoffs?: boolean;
  /** Límite de handoffs encadenados */
  maxHandoffDepth?: number;
  /** Modo dry-run (no ejecutar) */
  dryRun?: boolean;
}

// ============================================
// Respuestas de agentes
// ============================================

/**
 * Respuesta de un agente
 */
export interface AgentResponse {
  /** Si fue exitosa */
  success: boolean;
  /** Output textual */
  output: string;
  /** Handoff sugerido */
  handoff?: SuggestedHandoff;
  /** Artefactos generados */
  artifacts?: Artifact[];
  /** Error (si success === false) */
  error?: string;
  /** Duración de ejecución (ms) */
  duration: number;
  /** Metadatos de la respuesta */
  metadata?: ResponseMetadata;
}

/**
 * Handoff sugerido por el agente
 */
export interface SuggestedHandoff {
  /** Agente destino */
  agent: string;
  /** Prompt para el agente */
  prompt: string;
  /** Contexto a pasar */
  context?: Partial<InvocationContext>;
  /** Si es obligatorio o sugerencia */
  required: boolean;
}

/**
 * Artefacto generado por un agente
 */
export interface Artifact {
  /** Tipo de artefacto */
  type: ArtifactType;
  /** Ruta (si es archivo) */
  path?: string;
  /** Contenido */
  content: string;
  /** Nombre descriptivo */
  name?: string;
  /** Metadatos */
  metadata?: Record<string, unknown>;
}

export type ArtifactType = 
  | 'file'      // Archivo creado/modificado
  | 'code'      // Bloque de código
  | 'json'      // Datos JSON
  | 'markdown'  // Documento Markdown
  | 'diff'      // Diferencias
  | 'command';  // Comando a ejecutar

/**
 * Metadatos de respuesta
 */
export interface ResponseMetadata {
  /** ID de la invocación */
  invocationId: string;
  /** Tokens usados (si aplica) */
  tokensUsed?: number;
  /** Modelo usado (si aplica) */
  model?: string;
  /** Herramientas usadas */
  toolsUsed?: string[];
}

// ============================================
// Ejecución de handoffs
// ============================================

/**
 * Resultado de ejecución de handoff
 */
export interface HandoffResult {
  /** Si fue exitoso */
  success: boolean;
  /** Agente origen */
  from: string;
  /** Agente destino */
  to: string;
  /** Respuesta del agente destino */
  response: AgentResponse;
  /** Profundidad en la cadena de handoffs */
  depth: number;
}

/**
 * Cadena de handoffs ejecutada
 */
export interface HandoffChain {
  /** Handoffs ejecutados */
  handoffs: HandoffResult[];
  /** Profundidad total */
  totalDepth: number;
  /** Agente final */
  finalAgent: string;
  /** Respuesta final */
  finalResponse: AgentResponse;
  /** Duración total */
  totalDuration: number;
}

// ============================================
// Métricas de runtime
// ============================================

/**
 * Métricas de un agente
 */
export interface AgentMetrics {
  /** Nombre del agente */
  agentName: string;
  /** Total de invocaciones */
  totalInvocations: number;
  /** Invocaciones exitosas */
  successfulInvocations: number;
  /** Invocaciones fallidas */
  failedInvocations: number;
  /** Tiempo promedio de ejecución */
  avgExecutionTime: number;
  /** Handoffs realizados */
  handoffsPerformed: number;
  /** Última invocación */
  lastInvoked?: Date;
}

/**
 * Métricas globales del runtime
 */
export interface RuntimeMetrics {
  /** Agentes cargados */
  loadedAgents: number;
  /** Total de invocaciones */
  totalInvocations: number;
  /** Uptime en ms */
  uptime: number;
  /** Métricas por agente */
  agentMetrics: Map<string, AgentMetrics>;
}
