import { describe, expect, it } from 'bun:test';
import { defineDomainContract } from '@network-engine/core';
import { projectDomainToGraphQL } from './projection';

describe('projectDomainToGraphQL', () => {
  it('projects resources to queries and mutations without GraphQL runtime coupling', () => {
    const contract = defineDomainContract({
      kind: 'palette',
      version: '1.0.0',
      display: { singular: 'Palette', plural: 'Palettes' },
      schema: { type: 'object' },
      storage: {
        capability: 'document-store',
        collection: 'palettes',
        version: '1.0.0',
      },
      resources: {
        collection: {
          kind: 'resource',
          uriTemplate: 'blockly://palettes',
          name: 'Palettes',
          mimeType: 'application/json',
        },
        byId: {
          kind: 'template',
          uriTemplate: 'blockly://palettes/{id}',
          name: 'Palette',
          mimeType: 'application/json',
        },
      },
      prompts: {},
      mutations: {
        persist: {
          name: 'persist_palette',
          description: 'Persist palette',
          effect: 'upsert',
        },
      },
    });

    const projection = projectDomainToGraphQL(contract);

    expect(projection.typeName).toBe('palette');
    expect(projection.queries).toHaveLength(2);
    expect(projection.queries[0]?.collection).toBe('palettes');
    expect(projection.queries[1]?.idParam).toBe('id');
    expect(projection.mutations).toHaveLength(1);
    expect(projection.mutations[0]?.effect).toBe('upsert');
  });

  it('does not auto-generate CRUD fields beyond contract declarations', () => {
    const contract = defineDomainContract({
      kind: 'minimal',
      version: '1.0.0',
      display: { singular: 'X', plural: 'Xs' },
      schema: {},
      resources: {},
      prompts: {},
      mutations: {},
    });

    const projection = projectDomainToGraphQL(contract);
    expect(projection.queries).toHaveLength(0);
    expect(projection.mutations).toHaveLength(0);
  });
});
