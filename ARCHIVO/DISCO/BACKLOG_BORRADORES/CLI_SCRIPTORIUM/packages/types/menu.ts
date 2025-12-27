/**
 * Tipos para el sistema de menús de consola
 * @see ARCHIVO/DISCO/SPLASH/index.md
 * @see ARCHIVO/DISCO/README/index.md
 */

/**
 * Tipo de nodo en el árbol de menú
 */
export type MenuNodeType = 
  | 'section'      // Sección contenedora
  | 'command'      // Acción ejecutable
  | 'navigation'   // Navegar a submenú
  | 'info'         // Solo mostrar información
  | 'agent'        // Invocar agente
  | 'plugin';      // Invocar plugin

/**
 * Tipo de acción del menú
 */
export type MenuActionType = 
  | 'invoke-agent' 
  | 'run-prompt' 
  | 'navigate' 
  | 'execute' 
  | 'display'
  | 'external-url';

/**
 * Acción ejecutable desde el menú
 */
export interface MenuAction {
  /** Tipo de acción */
  type: MenuActionType;
  /** Objetivo de la acción (agente, prompt, ruta, comando) */
  target: string;
  /** Argumentos adicionales */
  args?: Record<string, unknown>;
}

/**
 * Nodo del árbol de navegación
 */
export interface MenuNode {
  /** Identificador único del nodo */
  id: string;
  /** Etiqueta a mostrar */
  label: string;
  /** Descripción adicional */
  description?: string;
  /** Icono o símbolo */
  icon?: string;
  /** Tipo de nodo */
  type: MenuNodeType;
  /** Nodos hijos (para secciones) */
  children?: MenuNode[];
  /** Acción a ejecutar */
  action?: MenuAction;
  /** Ruta al archivo .md fuente */
  sourcePath?: string;
  /** Si está habilitado */
  enabled?: boolean;
  /** Shortcut de teclado */
  shortcut?: string;
}

/**
 * Menú completo cargado
 */
export interface MenuDefinition {
  /** Título del menú */
  title: string;
  /** Versión */
  version: string;
  /** Nodo raíz */
  root: MenuNode;
  /** Timestamp de última carga */
  loadedAt: Date;
  /** Rutas de archivos fuente */
  sources: string[];
}

// ============================================
// Secciones SPLASH (para mapeo desde index.md)
// ============================================

/**
 * Sección del SPLASH/index.md
 */
export interface SplashSection {
  /** Identificador de la sección */
  id: string;
  /** Número de sección (orden) */
  number: number;
  /** Clase CSS en la web */
  cssClass: string;
  /** Rango de líneas en el archivo */
  lineRange: [number, number];
  /** Elementos contenidos */
  elements: SplashElement[];
}

/**
 * Tipo de elemento en una sección SPLASH
 */
export type SplashElementType = 
  | 'badge' 
  | 'card' 
  | 'metric' 
  | 'cta' 
  | 'text' 
  | 'visual'
  | 'code';

/**
 * Elemento individual de una sección
 */
export interface SplashElement {
  /** Tipo de elemento */
  type: SplashElementType;
  /** Contenido textual */
  content: string;
  /** Si es editable */
  editable: boolean;
  /** Metadatos adicionales */
  metadata?: Record<string, unknown>;
}

/**
 * Estructura SPLASH completa
 * @see SPLASH/index.md § 2.1
 */
export interface SplashStructure {
  sections: SplashSection[];
  cssVariables: Record<string, string>;
  layoutInfo: {
    architecture: string; // Jekyll layout usado
    includes: string[];
  };
}

// ============================================
// Estructura README (para sincronización)
// ============================================

/**
 * Sección del README.md
 * @see README/index.md § 2
 */
export interface ReadmeSection {
  /** Nombre de la sección */
  name: string;
  /** Rango de líneas */
  lineRange: [number, number];
  /** Dependencias (qué archivos la afectan) */
  dependencies: string[];
  /** Si necesita actualización */
  needsUpdate?: boolean;
}

/**
 * Estructura README completa
 */
export interface ReadmeStructure {
  sections: ReadmeSection[];
  badges: ReadmeBadge[];
  syncRules: ReadmeSyncRule[];
}

/**
 * Badge del README
 */
export interface ReadmeBadge {
  name: string;
  source: string;
  updateTrigger: string;
}

/**
 * Regla de sincronización
 */
export interface ReadmeSyncRule {
  /** Evento que dispara la actualización */
  trigger: string;
  /** Secciones a revisar */
  sections: string[];
}

// ============================================
// Tema visual de consola
// ============================================

/**
 * Colores disponibles en Chalk
 */
export type ChalkColor = 
  | 'black' | 'red' | 'green' | 'yellow' 
  | 'blue' | 'magenta' | 'cyan' | 'white' 
  | 'gray' | 'grey'
  | 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright'
  | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';

/**
 * Tema visual para la consola
 */
export interface ConsoleTheme {
  /** Color primario */
  primary: ChalkColor;
  /** Color secundario */
  secondary: ChalkColor;
  /** Color de acento */
  accent: ChalkColor;
  /** Color de error */
  error: ChalkColor;
  /** Color de advertencia */
  warning: ChalkColor;
  /** Color de éxito */
  success: ChalkColor;
  /** Color atenuado */
  muted: ChalkColor;
  
  /** Símbolo de viñeta */
  bullet: string;
  /** Símbolo de flecha */
  arrow: string;
  /** Checkbox vacío */
  checkbox: string;
  /** Checkbox marcado */
  checkboxChecked: string;
  /** Separador horizontal */
  separator: string;
}

/**
 * Tema por defecto (Scriptorium)
 */
export const DEFAULT_THEME: ConsoleTheme = {
  primary: 'cyan',
  secondary: 'blue',
  accent: 'magenta',
  error: 'red',
  warning: 'yellow',
  success: 'green',
  muted: 'gray',
  bullet: '•',
  arrow: '→',
  checkbox: '○',
  checkboxChecked: '●',
  separator: '─'
};

/**
 * Tema de las 5 banderas
 */
export const FLAG_THEME: Record<string, ChalkColor> = {
  blueflag: 'blue',
  blackflag: 'gray',
  redflag: 'red',
  yellowflag: 'yellow',
  orangeflag: 'yellow' // chalk no tiene orange, usamos yellowBright
};
