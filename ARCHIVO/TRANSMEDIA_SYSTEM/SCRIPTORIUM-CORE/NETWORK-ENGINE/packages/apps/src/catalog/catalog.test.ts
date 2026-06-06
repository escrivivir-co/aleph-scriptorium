import { describe, expect, it } from 'bun:test';
import { alephDescriptor } from '@network-engine/aleph-lang-app';
import { composeDescriptor } from '@network-engine/compose-lang-app';
import { catalog } from './index';

describe('apps catalog', () => {
  it('imports language descriptors from LANGUAGES/*/app workspaces', () => {
    expect(catalog.aleph.app).toBe(alephDescriptor.app);
    expect(catalog.compose.app).toBe(composeDescriptor.app);
    expect(catalog['compose-lang'].app).toBe(composeDescriptor.app);
  });

  it('keeps platform apps in the local catalog', () => {
    expect(catalog.hello).toBeDefined();
    expect(catalog.hub).toBeDefined();
    expect(catalog['aleph-os']).toBeDefined();
    expect(catalog['aleph-os-dynamic']).toBeDefined();
    expect(catalog.graph).toBeDefined();
  });
});
