import { describe, expect, it } from 'bun:test';
import { defineDomainContract } from '@network-engine/core';
import { projectDomainToMCP } from './projection';

describe('projectDomainToMCP', () => {
  it('projects resources, prompts, sampling, and mutation capabilities without MCP runtime coupling', () => {
    const contract = defineDomainContract({
      kind: 'palette',
      version: '1.0.0',
      display: {
        singular: 'Palette',
        plural: 'Palettes',
      },
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
      resources: {
        collection: {
          kind: 'resource',
          uriTemplate: 'blockly://palettes',
          name: 'Palettes Collection',
          mimeType: 'application/json',
        },
      },
      prompts: {
        design: {
          name: 'design-palette',
          description: 'Design a palette before persistence',
          requiresResources: ['blockly://palettes'],
          recommendedSampling: ['critique-palette'],
          permittedMutations: ['persist_palette'],
        },
      },
      mutations: {
        persist: {
          name: 'persist_palette',
          description: 'Persist a palette draft',
          effect: 'upsert',
          inputSchema: { type: 'object' },
          externalEffects: ['storage'],
        },
      },
      sampling: {
        critique: {
          intent: 'critique-palette',
          promptTemplate: 'Critique the palette design.',
          requiresResources: ['blockly://palettes'],
        },
      },
    });

    const projection = projectDomainToMCP(contract);

    expect(projection.resources).toHaveLength(1);
    expect(projection.resources[0]?.uriTemplate).toBe('blockly://palettes');
    expect(projection.prompts[0]?.recommendedSampling).toEqual(['critique-palette']);
    expect(projection.tools[0]?.effect).toBe('upsert');
    expect(projection.tools[0]?.externalEffects).toEqual(['storage']);
    expect(projection.sampling[0]?.intent).toBe('critique-palette');
  });

  it('projects app launchers as UI tools without mutation effects', () => {
    const contract = defineDomainContract({
      kind: 'aleph-os',
      version: '1.0.0',
      display: { singular: 'ALEPH OS', plural: 'ALEPH OS' },
      schema: { type: 'object' },
      resources: {
        ui: {
          kind: 'resource',
          uriTemplate: 'ui://aleph-os/mcp-app.html',
          name: 'ALEPH OS UI',
          mimeType: 'text/html;profile=mcp-app',
        },
      },
      prompts: {},
      mutations: {},
      launchers: {
        show: {
          name: 'show-aleph-os',
          description: 'Open the ALEPH OS navigator',
          uiResource: 'ui://aleph-os/mcp-app.html',
        },
      },
    });

    const projection = projectDomainToMCP(contract);

    expect(projection.tools).toHaveLength(1);
    expect(projection.tools[0]).toMatchObject({
      name: 'show-aleph-os',
      effect: 'custom',
      launcher: true,
      ui: { resourceUri: 'ui://aleph-os/mcp-app.html' },
    });
  });
});