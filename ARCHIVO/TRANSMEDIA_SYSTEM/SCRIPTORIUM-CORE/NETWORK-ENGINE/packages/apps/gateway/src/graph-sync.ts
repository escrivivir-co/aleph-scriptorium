import type { DocumentStoreProtocol, GraphStoreProtocol } from '@network-engine/core';
import { namedNode } from '@network-engine/core';
import type { Subscription } from 'rxjs';
import { DEFAULT_ENTITY_BASE_IRI, entityIri, syncEntityToGraph } from './materialize';

export interface GraphMaterializationOptions {
  collection: string;
  baseIri?: string;
}

export interface GraphMaterializationHandle {
  unsubscribe: () => void;
}

export function wireGraphMaterialization(
  store: DocumentStoreProtocol,
  graph: GraphStoreProtocol | undefined,
  options: GraphMaterializationOptions,
): GraphMaterializationHandle {
  if (graph === undefined) {
    return { unsubscribe: () => {} };
  }

  const baseIri = options.baseIri ?? DEFAULT_ENTITY_BASE_IRI;

  const sub: Subscription = store.changes(options.collection).subscribe(async (change) => {
    if (change.kind === 'delete') {
      await graph.remove({ s: namedNode(entityIri(change.id, baseIri)) });
      return;
    }

    if (change.doc !== undefined) {
      await syncEntityToGraph(graph, { ...change.doc, id: change.id }, baseIri);
    }
  });

  return { unsubscribe: () => sub.unsubscribe() };
}
