import { describe, expect, it } from 'bun:test';
import { createInMemoryDocumentStore } from './in-memory-store';

describe('InMemoryDocumentStore', () => {
  it('performs CRUD and emits changes', async () => {
    const store = createInMemoryDocumentStore();
    const changes: string[] = [];
    const sub = store.changes('items').subscribe((c) => changes.push(`${c.kind}:${c.id}`));

    const id = await store.insert('items', { name: 'alpha' });
    expect(await store.get<{ name: string }>('items', id)).toEqual({ name: 'alpha' });

    await store.update('items', id, { name: 'beta' });
    expect(await store.get<{ name: string }>('items', id)).toEqual({ name: 'beta' });

    expect(await store.delete('items', id)).toBe(1);
    expect(await store.get('items', id)).toBeNull();

    sub.unsubscribe();
    expect(changes).toEqual([`insert:${id}`, `update:${id}`, `delete:${id}`]);
  });

  it('finds documents by query', async () => {
    const store = createInMemoryDocumentStore();
    await store.insert('tags', { label: 'a', group: 'g1' });
    await store.insert('tags', { label: 'b', group: 'g1' });
    await store.insert('tags', { label: 'c', group: 'g2' });

    const found = await store.find<{ label: string }>('tags', { group: 'g1' });
    expect(found.map((d) => d.label).sort()).toEqual(['a', 'b']);
  });
});

describe('MongoDocumentStore (conditional replica-set)', () => {
  const uri = process.env.MONGO_URI;
  const runLive = uri !== undefined && process.env.MONGO_REPLICA_SET === '1';

  it.skipIf(!runLive)('connects and watches change stream on replica-set', async () => {
    const { createMongoDocumentStore } = await import('./mongo-store');
    const store = await createMongoDocumentStore({ uri: uri!, database: 'network_engine_test' });
    const id = await store.insert('smoke', { ping: true });
    expect(await store.get<{ ping: boolean }>('smoke', id)).toEqual({ ping: true });
    await store.delete('smoke', id);
    await store.disconnect();
  });
});
