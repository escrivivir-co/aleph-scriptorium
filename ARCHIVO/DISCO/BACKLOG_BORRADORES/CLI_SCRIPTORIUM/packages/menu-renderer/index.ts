/**
 * @scriptorium/menu-renderer
 * 
 * Renderizador de menús para consola con soporte de temas.
 * 
 * @packageDocumentation
 */

import type {
  MenuNode,
  MenuDefinition,
  SplashSection,
  ConsoleTheme
} from '@scriptorium/types';

// ============================================
// Interfaces de Renderizado
// ============================================

/**
 * Opciones para renderizar una caja
 */
export interface BoxOptions {
  title?: string;
  padding?: number;
  borderColor?: string;
  borderStyle?: 'single' | 'double' | 'round' | 'bold';
  width?: number;
  textAlign?: 'left' | 'center' | 'right';
}

/**
 * Opciones para renderizar una tabla
 */
export interface TableOptions {
  headers?: string[];
  align?: ('left' | 'center' | 'right')[];
  border?: boolean;
  compact?: boolean;
}

/**
 * Opciones para renderizar una lista
 */
export interface ListOptions {
  numbered?: boolean;
  bullet?: string;
  indent?: number;
  interactive?: boolean;
}

/**
 * Spinner animado
 */
export interface Spinner {
  start(): void;
  stop(): void;
  succeed(message?: string): void;
  fail(message?: string): void;
  warn(message?: string): void;
  info(message?: string): void;
  text: string;
}

// ============================================
// Interfaz del Renderizador
// ============================================

/**
 * Renderizador principal de menús de consola
 */
export interface IMenuRenderer {
  /**
   * Renderizar menú completo
   */
  render(menu: MenuDefinition): void;
  
  /**
   * Renderizar un nodo de menú
   */
  renderNode(node: MenuNode, depth?: number): void;
  
  /**
   * Renderizar sección SPLASH
   */
  renderSection(section: SplashSection): void;
  
  /**
   * Limpiar pantalla y re-renderizar
   */
  refresh(): void;
  
  /**
   * Configurar tema visual
   */
  setTheme(theme: ConsoleTheme): void;
  
  /**
   * Obtener tema actual
   */
  getTheme(): ConsoleTheme;
}

/**
 * Componentes de UI reutilizables
 */
export interface IUIComponents {
  /**
   * Renderizar caja con borde
   */
  box(content: string, options?: BoxOptions): string;
  
  /**
   * Renderizar tabla
   */
  table(data: string[][], options?: TableOptions): string;
  
  /**
   * Renderizar lista
   */
  list(items: string[], options?: ListOptions): string;
  
  /**
   * Renderizar barra de progreso
   */
  progress(current: number, total: number, width?: number): string;
  
  /**
   * Crear spinner animado
   */
  spinner(message: string): Spinner;
  
  /**
   * Renderizar separador horizontal
   */
  separator(width?: number): string;
  
  /**
   * Renderizar badge con color
   */
  badge(text: string, color: string): string;
  
  /**
   * Renderizar tree de estructura
   */
  tree(node: TreeNode): string;
}

export interface TreeNode {
  label: string;
  children?: TreeNode[];
}

// ============================================
// Interfaz de Input
// ============================================

/**
 * Opción de selección
 */
export interface Choice<T> {
  name: string;
  value: T;
  description?: string;
  disabled?: boolean | string;
  short?: string;
}

/**
 * Opciones para input de selección
 */
export interface SelectOptions<T> {
  message: string;
  choices: Choice<T>[];
  pageSize?: number;
  loop?: boolean;
  default?: T;
}

/**
 * Opciones para input de texto
 */
export interface TextOptions {
  message: string;
  default?: string;
  validate?: (input: string) => boolean | string | Promise<boolean | string>;
  transformer?: (input: string) => string;
}

/**
 * Opciones para autocompletado
 */
export interface AutocompleteOptions<T> {
  message: string;
  source: (input: string) => Promise<Choice<T>[]>;
  pageSize?: number;
  suggestOnly?: boolean;
}

/**
 * Opciones para editor multilínea
 */
export interface EditorOptions {
  message: string;
  default?: string;
  extension?: string;
  waitForUseInput?: boolean;
}

/**
 * Gestor de input de usuario
 */
export interface IInputHandler {
  /**
   * Selección de menú
   */
  select<T>(options: SelectOptions<T>): Promise<T>;
  
  /**
   * Input de texto
   */
  text(options: TextOptions): Promise<string>;
  
  /**
   * Confirmación sí/no
   */
  confirm(message: string, defaultValue?: boolean): Promise<boolean>;
  
  /**
   * Autocompletado
   */
  autocomplete<T>(options: AutocompleteOptions<T>): Promise<T>;
  
  /**
   * Editor multilínea
   */
  editor(options: EditorOptions): Promise<string>;
  
  /**
   * Checkbox múltiple
   */
  checkbox<T>(options: SelectOptions<T>): Promise<T[]>;
  
  /**
   * Password (oculto)
   */
  password(message: string): Promise<string>;
}
