/**
 * Core Domain Types & Abstractions
 * Proporciona los contratos, primitivas y mecanismos de extensión genéricos (Modo AGI).
 * Implementa Type-Level Programming y Phantom Types para inyección de semánticas.
 */

// ============================================================================
// 1. Identificadores Fuertes (Branded Types)
// ============================================================================
export type UniverseId = string & { readonly __brand: unique symbol };
export type PluginId = string & { readonly __brand: unique symbol };
export type AppId = string & { readonly __brand: unique symbol };

export function createUniverseId(id: string): UniverseId {
  return id as UniverseId;
}

export function createAppId(id: string): AppId {
  return id as AppId;
}

// ============================================================================
// 2. Metamodelos: DSL Tipada para Semántica de Lenguajes (Layer 2)
// ============================================================================

/**
 * Primitiva genérica de un Evento en la red.
 */
export type CoreEventBase<TType extends string, TPayload> = {
  type: TType;
  payload: TPayload;
  timestamp: number;
};

// Constante para constraint generico
export type AnyEvent = CoreEventBase<string, unknown>;

/**
 * Contrato que deben cumplir los Lenguajes (Capa 2) para definir su dominio operativo.
 * Utiliza el patrón Phantom Types (propiedades opcionales _*) para inferencia de TS.
 */
export interface LanguageSemantics<
  TContext extends Record<string, unknown>,
  TEvent extends AnyEvent
> {
  readonly _phantomContext?: TContext;
  readonly _phantomEvent?: TEvent;
}

// Utilidades para extraer los tipos en tiempo de compilación
export type InferContext<TSemantics> = TSemantics extends LanguageSemantics<infer C, any> ? C : never;
export type InferEvent<TSemantics> = TSemantics extends LanguageSemantics<any, infer E> ? E : never;

// ============================================================================
// 3. Sistema de Extensión (Plugins)
// ============================================================================

export type PluginCapabilities = {
  canInfer: boolean;
  canPersist: boolean;
  canVisualize: boolean;
};

// ----------------------------------------------------------------------------
// 3.1. Servicios de Protocolo expuestos por Plugins (capability-keyed)
// ----------------------------------------------------------------------------

/**
 * Base estructural de todo servicio que un plugin puede PROVEER. El campo
 * `capability` es el discriminante que usa el orquestador para resolverlo.
 */
export interface ProtocolService<TCapability extends string = string> {
  readonly capability: TCapability;
}

/**
 * Registro abierto capacidad -> tipo de servicio. Intencionadamente vacío en
 * `core/types` para no acoplar el núcleo a ningún protocolo concreto; cada
 * protocolo lo amplía vía Declaration Merging (p.ej. `graph-store.ts` añade
 * `'rdf-sparql': GraphStoreProtocol`). Es el mecanismo que mantiene RDF como
 * HUÉSPED y nunca como dependencia del núcleo.
 */
export interface CapabilityServiceRegistry {}

/** Unión de capacidades de servicio actualmente registradas en el programa. */
export type Capability = keyof CapabilityServiceRegistry & string;

/** Conditional Type: dado una capacidad, el tipo de servicio que la satisface. */
export type ServiceOf<TCapability extends Capability> = CapabilityServiceRegistry[TCapability];

/**
 * Un plugin es estrictamente tipado contra la Semántica del Lenguaje en el que opera.
 *
 * `TProvides` declara, a nivel de tipos, qué capacidad de servicio expone el
 * plugin (por defecto `never` => no provee ninguno). Cuando se fija, `provides`
 * devuelve exactamente el servicio correspondiente vía {@link ServiceOf}.
 */
export interface NetworkPlugin<
  TSemantics extends LanguageSemantics<any, any>,
  TConfig extends Record<string, unknown> = {},
  TProvides extends Capability = never
> {
  readonly id: PluginId;
  readonly capabilities: PluginCapabilities;

  install<const TOptions extends TConfig>(options: TOptions): void;
  isInstalled(): this is NetworkPlugin<TSemantics, TConfig, TProvides> & { installed: true };

  /**
   * Expone el servicio de protocolo que este plugin implementa. Opcional: los
   * plugins que solo reaccionan a eventos (p.ej. persistencia FS) lo omiten.
   */
  provides?(): ServiceOf<TProvides>;
}

/**
 * Forma existencial de cualquier plugin (con o sin servicio). El orquestador la
 * usa internamente para almacenar plugins heterogéneos sin perder la capacidad
 * de resolver servicios de forma tipada en su API pública.
 */
export type AnyNetworkPlugin<TSemantics extends LanguageSemantics<any, any>> =
  NetworkPlugin<TSemantics, any, Capability>;

// ============================================================================
// 4. Modelo de Aplicaciones (App Launcher Ecosystem)
// ============================================================================

// Template Literal para SemVer
export type SemVer = `${number}.${number}.${number}`;

// Discriminated Union
export type AppStatus =
  | { state: 'STOPPED' }
  | { state: 'RUNNING'; startedAt: number }
  | { state: 'FAILED'; error: Error };

// App Manifest con Const Type Parameters (TS 5.0+)
export interface AppManifest<TId extends string, TVersion extends SemVer> {
  readonly id: AppId;
  readonly rawId: TId;
  readonly name: string;
  readonly version: TVersion;
  readonly description?: string;
}

// Interfaz genérica para Apps que garantiza seguridad de tipos en la configuración
export interface App<TConfig extends Record<string, unknown>, TId extends string, TVersion extends SemVer> {
  readonly manifest: AppManifest<TId, TVersion>;
  readonly status: AppStatus;
  
  init(config: TConfig): Promise<void> | void;
  run(): Promise<void> | void;
  
  isRunning(): this is App<TConfig, TId, TVersion> & { status: { state: 'RUNNING' } };
}

// Inferencia: Obtener el tipo de configuración requerida a partir del tipo de App
export type ExtractAppConfig<TApp> = TApp extends App<infer C, any, any> ? C : never;

// Inferencia: Convertir un array de Apps en un Registro Mapped Tipado fuertemente
export type AppRegistry<TApps extends readonly App<any, any, any>[]> = {
  [K in TApps[number]['manifest']['rawId']]: Extract<TApps[number], { manifest: { rawId: K } }>
};
