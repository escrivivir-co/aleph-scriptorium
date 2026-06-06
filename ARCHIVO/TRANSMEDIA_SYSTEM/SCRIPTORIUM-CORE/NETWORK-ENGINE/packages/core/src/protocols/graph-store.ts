/**
 * Capa 1 — `GraphStoreProtocol`: contrato RDF/SPARQL *neutral*.
 *
 * El núcleo define SOLO el contrato. Cualquier implementación (in-memory de
 * referencia, o un adaptador HTTP contra Ontotext GraphDB vía W3C SPARQL
 * Protocol / RDF4J) vive FUERA de `core` y depende de este protocolo, nunca al
 * revés. Por eso el contrato es agnóstico al motor: solo describe operaciones.
 *
 * Todas las operaciones de lectura son reactivas (RxJS `Observable`) por
 * coherencia con el `NetworkOrchestrator`.
 */

import type { Observable } from 'rxjs';
import type { ProtocolService } from '../types';
import type { Quad, QuadPattern, Bindings, SelectVars } from './rdf';

// ============================================================================
// GraphStoreProtocol
// ============================================================================

export interface GraphStoreProtocol extends ProtocolService<'rdf-sparql'> {
  /** Discriminante de capacidad; permite resolución tipada vía el orquestador. */
  readonly capability: 'rdf-sparql';

  /** Inserta quads de forma idempotente respecto al conjunto del store. */
  add(quads: readonly Quad[]): Promise<void>;

  /** Elimina los quads que casan con el patrón; devuelve cuántos se borraron. */
  remove(pattern: QuadPattern): Promise<number>;

  /** Stream reactivo de los quads que casan con el patrón (campos ausentes = comodín). */
  match(pattern: QuadPattern): Observable<Quad>;

  /**
   * Ejecuta un `SELECT` SPARQL emitiendo una fila de {@link Bindings} por
   * solución. Dos firmas:
   *  1. Inferencia type-level: a partir de un string literal de consulta,
   *     deriva las variables proyectadas (`infer` + Template Literal Types).
   *  2. Explícita: el llamante fija `TVars` cuando la consulta es dinámica.
   */
  query<const Q extends string>(sparql: Q): Observable<Bindings<SelectVars<Q>>>;
  query<TVars extends string = never>(sparql: string): Observable<Bindings<TVars>>;
}

// ============================================================================
// Registro de servicios por capacidad (Declaration Merging)
// ============================================================================

/**
 * Vincula la capacidad `'rdf-sparql'` con su tipo de servicio. Se hace por
 * *module augmentation* para mantener `core/types` desacoplado de RDF: el
 * registro vive en `types.ts` vacío y cada protocolo lo amplía aquí. Así
 * `orchestrator.resolve('rdf-sparql')` queda fuertemente tipado sin que el
 * contrato de Plugin conozca nada de RDF.
 */
declare module '../types' {
  interface CapabilityServiceRegistry {
    'rdf-sparql': GraphStoreProtocol;
  }
}
