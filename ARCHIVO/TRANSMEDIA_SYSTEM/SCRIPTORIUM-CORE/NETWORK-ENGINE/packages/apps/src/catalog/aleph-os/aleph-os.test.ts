import { describe, expect, it } from 'bun:test';
import { projectDomainToMCP } from '@network-engine/mcp/projection';
import { alephOsDefinition, buildAlephSnapshot } from './aleph-data';
import { ALEPH_OS_UI_URI, alephOsContract } from './aleph-os.contract';
import { createAlephOsHandlers } from './handlers';

describe('aleph-os MCP app compatibility', () => {
  it('keeps stable resource URIs and launcher name', () => {
    expect(ALEPH_OS_UI_URI).toBe('ui://aleph-os/mcp-app.html');
    expect(alephOsContract.resources.overview!.uriTemplate).toBe('aleph://os/overview');
    expect(alephOsContract.resources.layer!.uriTemplate).toBe('aleph://os/layers/{id}');
    expect(alephOsContract.resources.mode!.uriTemplate).toBe('aleph://os/modes/{id}');
    expect(alephOsContract.resources.storage!.uriTemplate).toBe('aleph://os/storage/{id}');
    expect(alephOsContract.launchers!.show!.name).toBe('show-aleph-os');
    expect(alephOsContract.launchers!.show!.uiResource).toBe('ui://aleph-os/mcp-app.html');
  });

  it('projects launcher UI metadata through MCP', () => {
    const projection = projectDomainToMCP(alephOsContract);

    expect(projection.tools.find((tool) => tool.name === 'show-aleph-os')).toMatchObject({
      launcher: true,
      ui: { resourceUri: 'ui://aleph-os/mcp-app.html' },
    });
  });

  it('keeps the static snapshot shape consumed by the existing UI', async () => {
    const snapshot = buildAlephSnapshot('layers', 'ASI');

    expect(snapshot.focus).toBe('layers');
    expect(snapshot.cognitiveMode).toBe('ASI');
    expect(snapshot.layers).toBe(alephOsDefinition.sections);

    const handlers = createAlephOsHandlers('.');
    const result = await handlers.executeTool?.({
      tool: {
        name: 'show-aleph-os',
        description: 'Open ALEPH OS',
        inputSchema: { type: 'object' },
        effect: 'custom',
        requiresConfirmation: false,
        idempotent: true,
        externalEffects: [],
        launcher: true,
        ui: { resourceUri: 'ui://aleph-os/mcp-app.html' },
      },
      args: { focus: 'storage', cognitiveMode: 'AGI' },
    });

    expect(result?.structuredContent).toMatchObject({
      focus: 'storage',
      cognitiveMode: 'AGI',
      layerCount: alephOsDefinition.sections.length,
      modeCount: alephOsDefinition.modes.length,
    });
  });
});
