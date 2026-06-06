import { describe, expect, it } from 'bun:test';
import { defineDomainContract } from './contracts';
import type { Capability, ServiceOf } from './types';

describe('DocumentStoreProtocol registry', () => {
  it('registers document-store in CapabilityServiceRegistry', () => {
    type Store = ServiceOf<'document-store'>;
    const capability: Store['capability'] = 'document-store';
    expect(capability).toBe('document-store');
  });

  it('accepts storage binding on DomainContract', () => {
    const contract = defineDomainContract({
      kind: 'palette',
      version: '1.0.0',
      display: { singular: 'Palette', plural: 'Palettes' },
      schema: { type: 'object' },
      storage: {
        capability: 'document-store' satisfies Capability,
        collection: 'palettes',
        version: '1.0.0',
      },
      resources: {},
      prompts: {},
      mutations: {},
    });

    expect(contract.storage?.collection).toBe('palettes');
    expect(contract.storage?.capability).toBe('document-store');
  });
});
