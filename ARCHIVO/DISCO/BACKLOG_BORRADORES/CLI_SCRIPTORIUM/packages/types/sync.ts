/**
 * Tipos para sincronización y hot-reload
 * @see Plan Arquitectura § 9
 */

/**
 * Tipo de evento de archivo
 */
export type WatchEventType = 'add' | 'change' | 'unlink';

/**
 * Evento de cambio de archivo
 */
export interface WatchEvent {
  /** Tipo de evento */
  type: WatchEventType;
  /** Ruta del archivo afectado */
  path: string;
  /** Timestamp del evento */
  timestamp: Date;
  /** Tipo de recurso afectado */
  resourceType: ResourceType;
}

/**
 * Tipos de recursos observables
 */
export type ResourceType = 
  | 'agent' 
  | 'plugin' 
  | 'instruction' 
  | 'prompt' 
  | 'index'
  | 'config'
  | 'submodule';

/**
 * Configuración de un watcher
 */
export interface FileWatcherConfig {
  /** Patrón glob a observar */
  pattern: string;
  /** Tipo de recurso */
  resourceType: ResourceType;
  /** Si está activo */
  active: boolean;
  /** Debounce en ms */
  debounceMs: number;
}

/**
 * Estado de un watcher
 */
export interface FileWatcherState {
  /** Ruta observada */
  path: string;
  /** Tipo de recurso */
  type: ResourceType;
  /** Última modificación detectada */
  lastModified: Date;
  /** Número de eventos procesados */
  eventsProcessed: number;
}

/**
 * Error durante sincronización
 */
export interface SyncError {
  /** Ruta del archivo */
  path: string;
  /** Mensaje de error */
  error: string;
  /** Si es recuperable */
  recoverable: boolean;
  /** Timestamp del error */
  timestamp: Date;
}

/**
 * Resultado de una operación de sincronización
 */
export interface SyncResult {
  /** Si fue exitosa */
  success: boolean;
  /** Archivos añadidos */
  added: string[];
  /** Archivos modificados */
  modified: string[];
  /** Archivos eliminados */
  removed: string[];
  /** Errores encontrados */
  errors: SyncError[];
  /** Duración en ms */
  duration: number;
  /** Timestamp de la sincronización */
  syncedAt: Date;
}

/**
 * Estado de sincronización del sistema
 */
export interface SyncStatus {
  /** Si está sincronizado */
  isSynced: boolean;
  /** Cambios pendientes */
  pendingChanges: number;
  /** Última sincronización */
  lastSync: Date;
  /** Si los watchers están activos */
  watchersActive: boolean;
  /** Errores activos (no recuperados) */
  activeErrors: number;
}

/**
 * Opciones de sincronización
 */
export interface SyncOptions {
  /** Forzar recarga completa */
  force: boolean;
  /** Solo verificar, no aplicar */
  dryRun: boolean;
  /** Tipos de recursos a sincronizar */
  resourceTypes?: ResourceType[];
  /** Patrones a excluir */
  exclude?: string[];
}

/**
 * Callback para eventos de sincronización
 */
export type SyncCallback = (result: SyncResult) => void;

/**
 * Callback para eventos de watch
 */
export type WatchCallback = (event: WatchEvent) => void;

/**
 * Recurso desechable (para cleanup)
 */
export interface Disposable {
  dispose(): void;
}

/**
 * Suscripción a eventos
 */
export interface Subscription extends Disposable {
  /** Si la suscripción está activa */
  readonly isActive: boolean;
  /** Pausar temporalmente */
  pause(): void;
  /** Reanudar */
  resume(): void;
}

/**
 * Métricas de sincronización
 */
export interface SyncMetrics {
  /** Total de sincronizaciones */
  totalSyncs: number;
  /** Sincronizaciones exitosas */
  successfulSyncs: number;
  /** Sincronizaciones fallidas */
  failedSyncs: number;
  /** Tiempo promedio de sincronización */
  avgSyncTime: number;
  /** Último error */
  lastError?: SyncError;
}
