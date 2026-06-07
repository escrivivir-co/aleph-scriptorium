/**
 * Docker entrypoint — minimal GraphQL gateway with in-memory or Mongo store.
 */

import type { AnyEvent } from '@network-engine/core';
import { defineDomainContract } from '@network-engine/core';
import { createInMemoryDocumentStore } from '@network-engine/mongo';
import { createGraphQLRuntime } from '@network-engine/graphql';
import { startGraphQLServer } from '@network-engine/edge-graphql';

const contract = defineDomainContract({
  kind: 'network-engine',
  version: '1.0.0',
  display: { singular: 'Entity', plural: 'Entities' },
  schema: { type: 'object' },
  storage: {
    capability: 'document-store',
    collection: 'entities',
    version: '1.0.0',
  },
  resources: {
    collection: {
      kind: 'resource',
      uriTemplate: 'network://entities',
      name: 'Entities',
      mimeType: 'application/json',
    },
  },
  prompts: {},
  mutations: {
    upsert: {
      name: 'upsert_entity',
      description: 'Upsert an entity document',
      effect: 'upsert',
    },
  },
});

const store = createInMemoryDocumentStore();

const runtime = createGraphQLRuntime({
  contract,
  context: {
    contract,
    store,
    dispatch: () => {},
    mapToolRequest: (req) =>
      ({
        type: 'GRAPHQL_MUTATION',
        payload: { tool: req.tool.name, args: req.args },
        timestamp: Date.now(),
      }) as AnyEvent,
  },
});

const server = startGraphQLServer({ runtime });
console.log(`GraphQL gateway listening on http://${server.hostname}:${server.port}/graphql`);
