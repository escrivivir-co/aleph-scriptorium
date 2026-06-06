/**
 * Capa 1 — `DocumentStoreProtocol`: contrato de persistencia documental *neutral*.
 *
 * Hermano de `GraphStoreProtocol`: el núcleo define SOLO el contrato. Cualquier
 * implementación (in-memory de referencia, MongoDB con change streams, etc.)
 * vive FUERA de `core` y depende de este protocolo, nunca al revés.
 *
 * Operaciones de lectura/escritura puntuales son async-first (`Promise`).
 * Las notificaciones de cambio son reactivas (`Observable`) por coherencia con
 * el `NetworkOrchestrator`.
 */

import type { Observable } from 'rxjs';
import type { ProtocolService } from '../types';

// ============================================================================
// DocumentChange
// ============================================================================

export interface DocumentChange<T = unknown> {
  kind: 'insert' | 'update' | 'delete';
  collection: string;
  id: string;
  doc?: T;
  ts: number;
}

// ============================================================================
// DocumentStoreProtocol
// ============================================================================

export interface DocumentStoreProtocol extends ProtocolService<'document-store'> {
  /** Discriminante de capacidad; permite resolución tipada vía el orquestador. */
  readonly capability: 'document-store';

  get<T>(collection: string, id: string): Promise<T | null>;
  find<T>(collection: string, query: Record<string, unknown>): Promise<T[]>;
  insert<T extends Record<string, unknown>>(collection: string, doc: T): Promise<string>;
  update<T>(collection: string, id: string, patch: Partial<T>): Promise<void>;
  delete(collection: string, id: string): Promise<number>;
  changes<T>(collection?: string): Observable<DocumentChange<T>>;
}

// ============================================================================
// Registro de servicios por capacidad (Declaration Merging)
// ============================================================================

declare module '../types' {
  interface CapabilityServiceRegistry {
    'document-store': DocumentStoreProtocol;
  }
}
