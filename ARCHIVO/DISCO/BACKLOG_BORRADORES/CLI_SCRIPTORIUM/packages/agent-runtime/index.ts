/**
 * @scriptorium/agent-runtime
 * 
 * Runtime para ejecución de agentes y sistema de prompts.
 * 
 * @packageDocumentation
 */

import type {
  AgentDefinition,
  AgentInstance,
  InvocationContext,
  AgentResponse,
  HandoffChain,
  RuntimeMetrics,
  PromptTemplate,
  PromptRenderResult,
  PromptValidationResult,
  Disposable
} from '@scriptorium/types';

// ============================================
// Interfaz del Runtime de Agentes
// ============================================

/**
 * Motor de ejecución de agentes
 */
export interface IAgentRuntime {
  /**
   * Cargar agente en memoria
   */
  load(agent: AgentDefinition): Promise<AgentInstance>;
  
  /**
   * Cargar agente por nombre
   */
  loadByName(name: string): Promise<AgentInstance>;
  
  /**
   * Invocar agente con contexto
   */
  invoke(agentName: string, context: InvocationContext): Promise<AgentResponse>;
  
  /**
   * Ejecutar handoff entre agentes
   */
  handoff(from: string, to: string, context: InvocationContext): Promise<AgentResponse>;
  
  /**
   * Ejecutar cadena de handoffs
   */
  executeChain(startAgent: string, context: InvocationContext): Promise<HandoffChain>;
  
  /**
   * Listar agentes cargados
   */
  listLoaded(): AgentInstance[];
  
  /**
   * Descargar agente de memoria
   */
  unload(agentName: string): void;
  
  /**
   * Descargar todos los agentes
   */
  unloadAll(): void;
  
  /**
   * Obtener métricas del runtime
   */
  getMetrics(): RuntimeMetrics;
  
  /**
   * Suscribirse a eventos de invocación
   */
  onInvoke(callback: (agent: string, context: InvocationContext) => void): Disposable;
  
  /**
   * Suscribirse a eventos de respuesta
   */
  onResponse(callback: (agent: string, response: AgentResponse) => void): Disposable;
}

// ============================================
// Interfaz del Motor de Prompts
// ============================================

/**
 * Motor de prompts dinámicos
 */
export interface IPromptEngine {
  /**
   * Cargar prompt por nombre
   */
  load(name: string): Promise<PromptTemplate>;
  
  /**
   * Cargar prompt desde archivo
   */
  loadFromFile(path: string): Promise<PromptTemplate>;
  
  /**
   * Renderizar prompt con variables
   */
  render(template: PromptTemplate, variables: Record<string, unknown>): PromptRenderResult;
  
  /**
   * Renderizar prompt por nombre con variables
   */
  renderByName(name: string, variables: Record<string, unknown>): Promise<PromptRenderResult>;
  
  /**
   * Validar variables requeridas
   */
  validate(template: PromptTemplate, variables: Record<string, unknown>): PromptValidationResult;
  
  /**
   * Extraer variables de un prompt
   */
  extractVariables(content: string): string[];
  
  /**
   * Hot-reload de prompts modificados
   */
  watch(): Disposable;
  
  /**
   * Invalidar cache de un prompt
   */
  invalidate(name: string): void;
}

// ============================================
// Tipos de Ejecución
// ============================================

/**
 * Opciones de ejecución del runtime
 */
export interface RuntimeOptions {
  /** Timeout global en ms */
  globalTimeout: number;
  /** Límite de handoffs encadenados */
  maxHandoffDepth: number;
  /** Si habilitar métricas */
  enableMetrics: boolean;
  /** Si habilitar logs */
  enableLogging: boolean;
  /** Nivel de log */
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Opciones por defecto del runtime
 */
export const DEFAULT_RUNTIME_OPTIONS: RuntimeOptions = {
  globalTimeout: 30000,
  maxHandoffDepth: 5,
  enableMetrics: true,
  enableLogging: true,
  logLevel: 'info'
};

/**
 * Evento de ciclo de vida del agente
 */
export interface AgentLifecycleEvent {
  type: 'loaded' | 'invoked' | 'responded' | 'error' | 'unloaded';
  agentName: string;
  timestamp: Date;
  details?: unknown;
}

/**
 * Listener de eventos de ciclo de vida
 */
export type LifecycleListener = (event: AgentLifecycleEvent) => void;
