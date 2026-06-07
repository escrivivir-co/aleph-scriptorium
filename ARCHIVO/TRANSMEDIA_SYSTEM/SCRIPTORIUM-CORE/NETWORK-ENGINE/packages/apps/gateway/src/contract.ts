import { defineDomainContract } from '@network-engine/core';

export const gatewayContract = defineDomainContract({
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
