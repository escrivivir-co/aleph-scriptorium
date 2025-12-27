/**
 * @scriptorium/cli
 * 
 * Aplicación de consola principal del Scriptorium.
 * 
 * @packageDocumentation
 */

import type { ScriptoriumState, StateInitOptions } from '@scriptorium/types';

// ============================================
// Comandos CLI
// ============================================

/**
 * Definición de un comando CLI
 */
export interface CommandDefinition {
  /** Nombre del comando */
  name: string;
  /** Descripción breve */
  description: string;
  /** Alias (atajos) */
  aliases?: string[];
  /** Opciones del comando */
  options?: CommandOption[];
  /** Argumentos posicionales */
  arguments?: CommandArgument[];
  /** Subcomandos */
  subcommands?: CommandDefinition[];
  /** Handler del comando */
  handler: CommandHandler;
}

export interface CommandOption {
  name: string;
  shorthand?: string;
  description: string;
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
  default?: unknown;
}

export interface CommandArgument {
  name: string;
  description: string;
  required?: boolean;
  variadic?: boolean;
}

export type CommandHandler = (args: CommandArgs, context: CommandContext) => Promise<void>;

export interface CommandArgs {
  /** Argumentos posicionales */
  positional: string[];
  /** Opciones con valores */
  options: Record<string, unknown>;
}

export interface CommandContext {
  /** Estado del Scriptorium */
  state: ScriptoriumState;
  /** Logger */
  log: Logger;
  /** UI Components */
  ui: UIContext;
}

export interface Logger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  success(message: string): void;
}

export interface UIContext {
  spinner(message: string): {
    start(): void;
    stop(): void;
    succeed(message?: string): void;
    fail(message?: string): void;
  };
  progress(current: number, total: number): void;
  clear(): void;
}

// ============================================
// Comandos Planificados
// ============================================

/**
 * Comandos disponibles en el CLI
 */
export const COMMANDS = {
  /** Menú principal interactivo */
  MENU: 'menu',
  /** Gestión de agentes */
  AGENTS: 'agents',
  /** Invocar agente */
  INVOKE: 'invoke',
  /** Gestión de plugins */
  PLUGINS: 'plugins',
  /** Sincronización */
  SYNC: 'sync',
  /** Estado del sistema */
  STATUS: 'status',
  /** Índices DRY */
  INDEX: 'index',
  /** Configuración */
  CONFIG: 'config',
  /** Modo desarrollo */
  DEV: 'dev',
  /** Build para producción */
  BUILD: 'build'
} as const;

/**
 * Opciones de inicialización del CLI
 */
export interface CLIOptions extends StateInitOptions {
  /** Comando a ejecutar (si no es interactivo) */
  command?: string;
  /** Si ejecutar en modo silencioso */
  quiet?: boolean;
  /** Si usar colores */
  color?: boolean;
  /** Archivo de configuración */
  configFile?: string;
}

/**
 * Opciones por defecto del CLI
 */
export const DEFAULT_CLI_OPTIONS: CLIOptions = {
  workspacePath: process.cwd(),
  autoWatch: false,
  preload: true,
  verbose: false,
  quiet: false,
  color: true
};
