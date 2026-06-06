/**
 * In-memory DocumentStore for tests and development without MongoDB replica-set.
 */

import {
  type DocumentChange,
  type DocumentStoreProtocol,
} from '@network-engine/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

type StoredDoc = Record<string, unknown> & { _id: string };

export class InMemoryDocumentStore implements DocumentStoreProtocol {
  public readonly capability = 'document-store' as const;

  private readonly collections = new Map<string, Map<string, StoredDoc>>();
  private readonly changeSubject = new Subject<DocumentChange>();

  public async get<T>(collection: string, id: string): Promise<T | null> {
    const doc = this.collections.get(collection)?.get(id);
    if (doc === undefined) return null;
    const { _id, ...rest } = doc;
    return rest as T;
  }

  public async find<T>(collection: string, query: Record<string, unknown>): Promise<T[]> {
    const bucket = this.collections.get(collection);
    if (bucket === undefined) return [];
    return [...bucket.values()]
      .filter((doc) => this.matches(doc, query))
      .map(({ _id, ...rest }) => rest as T);
  }

  public async insert<T extends Record<string, unknown>>(
    collection: string,
    doc: T,
  ): Promise<string> {
    const id =
      typeof doc._id === 'string'
        ? doc._id
        : typeof doc.id === 'string'
          ? doc.id
          : crypto.randomUUID();
    const bucket = this.collections.get(collection) ?? new Map<string, StoredDoc>();
    const stored: StoredDoc = { ...doc, _id: id };
    bucket.set(id, stored);
    this.collections.set(collection, bucket);
    this.emit('insert', collection, id, stored);
    return id;
  }

  public async update<T>(
    collection: string,
    id: string,
    patch: Partial<T>,
  ): Promise<void> {
    const bucket = this.collections.get(collection);
    const existing = bucket?.get(id);
    if (existing === undefined || bucket === undefined) return;
    const updated: StoredDoc = { ...existing, ...patch, _id: id };
    bucket.set(id, updated);
    this.emit('update', collection, id, updated);
  }

  public async delete(collection: string, id: string): Promise<number> {
    const bucket = this.collections.get(collection);
    if (bucket === undefined) return 0;
    const removed = bucket.delete(id);
    if (removed) this.emit('delete', collection, id);
    return removed ? 1 : 0;
  }

  public changes<T>(collection?: string): Observable<DocumentChange<T>> {
    return this.changeSubject.pipe(
      filter((change) => collection === undefined || change.collection === collection),
    ) as Observable<DocumentChange<T>>;
  }

  private matches(doc: StoredDoc, query: Record<string, unknown>): boolean {
    return Object.entries(query).every(([key, value]) => doc[key] === value);
  }

  private emit(
    kind: DocumentChange['kind'],
    collection: string,
    id: string,
    doc?: StoredDoc,
  ): void {
    const payload: DocumentChange = { kind, collection, id, ts: Date.now() };
    if (doc !== undefined) {
      const { _id, ...rest } = doc;
      payload.doc = rest;
    }
    this.changeSubject.next(payload);
  }
}

export function createInMemoryDocumentStore(): InMemoryDocumentStore {
  return new InMemoryDocumentStore();
}
