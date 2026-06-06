/**
 * MongoDB adapter implementing DocumentStoreProtocol.
 * Change streams require a replica-set (even single-node).
 */

import {
  type DocumentChange,
  type DocumentStoreProtocol,
  type LanguageSemantics,
  type NetworkPlugin,
  type PluginCapabilities,
  PluginId,
} from '@network-engine/core';
import { MongoClient, type Db, type Collection, type Document, type Filter, ObjectId } from 'mongodb';
import { Observable } from 'rxjs';

export type MongoStoreConfig = {
  readonly uri: string;
  readonly database: string;
};

function idFilter(id: string): Filter<Document> {
  if (ObjectId.isValid(id) && id.length === 24) {
    return { _id: new ObjectId(id) };
  }
  return { _id: id } as unknown as Filter<Document>;
}

function extractId(doc: Record<string, unknown>): string {
  if (typeof doc._id === 'string') return doc._id;
  if (doc._id instanceof ObjectId) return doc._id.toHexString();
  if (typeof doc.id === 'string') return doc.id;
  return new ObjectId().toHexString();
}

function stripMongoId(doc: Record<string, unknown>): Record<string, unknown> {
  const { _id, ...rest } = doc;
  return rest;
}

export class MongoDocumentStore implements DocumentStoreProtocol {
  public readonly capability = 'document-store' as const;

  private db: Db | undefined;

  constructor(
    private readonly client: MongoClient,
    private readonly databaseName: string,
  ) {}

  public async connect(): Promise<void> {
    await this.client.connect();
    this.db = this.client.db(this.databaseName);
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
    this.db = undefined;
  }

  private collection(name: string): Collection {
    if (this.db === undefined) {
      throw new Error('[MongoDocumentStore] not connected; call connect() first');
    }
    return this.db.collection(name);
  }

  public async get<T>(collection: string, id: string): Promise<T | null> {
    const col = this.collection(collection);
    const doc = await col.findOne(idFilter(id));
    if (doc === null) return null;
    return stripMongoId(doc as Record<string, unknown>) as T;
  }

  public async find<T>(collection: string, query: Record<string, unknown>): Promise<T[]> {
    const col = this.collection(collection);
    const cursor = col.find(query);
    const docs = await cursor.toArray();
    return docs.map((doc) => stripMongoId(doc as Record<string, unknown>) as T);
  }

  public async insert<T extends Record<string, unknown>>(
    collection: string,
    doc: T,
  ): Promise<string> {
    const col = this.collection(collection);
    const id = extractId(doc as Record<string, unknown>);
    const toInsert =
      ObjectId.isValid(id) && id.length === 24
        ? { ...doc, _id: new ObjectId(id) }
        : { ...doc, _id: id };
    await col.insertOne(toInsert as Document);
    return id;
  }

  public async update<T>(
    collection: string,
    id: string,
    patch: Partial<T>,
  ): Promise<void> {
    const col = this.collection(collection);
    await col.updateOne(idFilter(id), { $set: patch });
  }

  public async delete(collection: string, id: string): Promise<number> {
    const col = this.collection(collection);
    const result = await col.deleteOne(idFilter(id));
    return result.deletedCount;
  }

  public changes<T>(collection?: string): Observable<DocumentChange<T>> {
    return new Observable((subscriber) => {
      if (this.db === undefined) {
        subscriber.error(new Error('[MongoDocumentStore] not connected'));
        return;
      }

      const changeStream =
        collection !== undefined
          ? this.collection(collection).watch()
          : this.db.watch();

      changeStream.on('change', (event) => {
        const mapped = mapChangeEvent<T>(event as unknown as Record<string, unknown>, collection);
        if (mapped !== undefined) subscriber.next(mapped);
      });

      changeStream.on('error', (err) => subscriber.error(err));

      return () => {
        void changeStream.close();
      };
    });
  }
}

function mapChangeEvent<T>(
  event: Record<string, unknown>,
  filterCollection?: string,
): DocumentChange<T> | undefined {
  const operationType = event.operationType as string | undefined;
  if (operationType === undefined) return undefined;

  const ns = event.ns as { coll?: string } | undefined;
  const coll = ns?.coll ?? filterCollection ?? '';
  if (filterCollection !== undefined && coll !== filterCollection) return undefined;

  const docKey = event.documentKey as { _id?: unknown } | undefined;
  const id =
    docKey?._id instanceof ObjectId
      ? docKey._id.toHexString()
      : String(docKey?._id ?? '');

  const kindMap: Record<string, DocumentChange['kind']> = {
    insert: 'insert',
    update: 'update',
    replace: 'update',
    delete: 'delete',
  };
  const kind = kindMap[operationType];
  if (kind === undefined) return undefined;

  const fullDoc = event.fullDocument as Record<string, unknown> | undefined;
  const change: DocumentChange<T> = { kind, collection: coll, id, ts: Date.now() };
  if (fullDoc !== undefined) {
    change.doc = stripMongoId(fullDoc) as T;
  }
  return change;
}

export async function createMongoDocumentStore(
  config: MongoStoreConfig,
): Promise<MongoDocumentStore> {
  const client = new MongoClient(config.uri);
  const store = new MongoDocumentStore(client, config.database);
  await store.connect();
  return store;
}

export class MongoStorePlugin<
  TSemantics extends LanguageSemantics<any, any> = LanguageSemantics<any, any>,
> implements NetworkPlugin<TSemantics, MongoStoreConfig, 'document-store'>
{
  public readonly id = 'mongo-document-store' as PluginId;
  public readonly capabilities: PluginCapabilities = {
    canInfer: false,
    canPersist: true,
    canVisualize: false,
  };

  private installed = false;
  private store: MongoDocumentStore | undefined;

  public install<const TOptions extends MongoStoreConfig>(options: TOptions): void {
    console.log('[Mongo] Initializing document store:', {
      database: options.database,
      uri: options.uri.replace(/\/\/[^@]+@/, '//***@'),
    });
    const client = new MongoClient(options.uri);
    this.store = new MongoDocumentStore(client, options.database);
    void this.store.connect();
    this.installed = true;
  }

  public isInstalled(): this is NetworkPlugin<TSemantics, MongoStoreConfig, 'document-store'> & {
    installed: true;
  } {
    return this.installed;
  }

  public provides(): DocumentStoreProtocol {
    if (this.store === undefined) {
      throw new Error('[MongoStorePlugin] not installed; call install(config) before provides()');
    }
    return this.store;
  }
}
