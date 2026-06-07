import { describe, expect, test } from 'bun:test';
import { Observable } from 'rxjs';
import { namedNode, rdf, type Quad } from '@network-engine/core';
import { createInMemoryGraphStore } from '@network-engine/graphdb';
import { createInMemoryDocumentStore } from '@network-engine/mongo';
import { entityIri } from './materialize';
import { wireGraphMaterialization } from './graph-sync';

function collect<T>(obs: Observable<T>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const items: T[] = [];
    obs.subscribe({ next: (v) => items.push(v), error: reject, complete: () => resolve(items) });
  });
}

describe('wireGraphMaterialization', () => {
  test('materializes insert and update, removes on delete', async () => {
    const store = createInMemoryDocumentStore();
    const graph = createInMemoryGraphStore();
    const collection = 'entities';

    wireGraphMaterialization(store, graph, { collection });

    await store.insert(collection, { id: 'e1', name: 'Alpha' });

    let quads = await collect(graph.match({ s: namedNode(entityIri('e1')) }));
    expect(quads.length).toBeGreaterThan(0);
    expect(quads.some((q: Quad) => q.p.value.endsWith('label'))).toBe(true);

    await store.update(collection, 'e1', { name: 'Beta' });

    quads = await collect(graph.match({ s: namedNode(entityIri('e1')) }));
    const labels = quads
      .filter((q) => q.p.value.endsWith('label'))
      .map((q) => (q.o.kind === 'Literal' ? q.o.value : ''));
    expect(labels).toContain('Beta');
    expect(quads.filter((q) => q.p.value.endsWith(String(rdf('type')))).length).toBe(1);

    await store.delete(collection, 'e1');

    quads = await collect(graph.match({ s: namedNode(entityIri('e1')) }));
    expect(quads).toHaveLength(0);
  });

  test('ignores changes from other collections', async () => {
    const store = createInMemoryDocumentStore();
    const graph = createInMemoryGraphStore();

    wireGraphMaterialization(store, graph, { collection: 'entities' });

    await store.insert('other', { id: 'x1', name: 'Other' });

    const quads = await collect(graph.match({}));
    expect(quads).toHaveLength(0);
  });
});
