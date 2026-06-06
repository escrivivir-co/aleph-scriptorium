import { describe, expect, it } from 'bun:test';
import {
  buildKnowledgeSnapshot,
  createKnowledgeSystemContract,
  defineKnowledgeSystem,
  getKnowledgeResourceUris,
} from './knowledge-system';

const testDefinition = defineKnowledgeSystem({
  kind: 'test-os',
  version: '1.0.0',
  display: { singular: 'Test OS', plural: 'Test OS' },
  mission: 'Test mission',
  markdownFirst: 'Test markdown-first rule',
  focusValues: ['overview', 'layers', 'modes', 'storage', 'mission'] as const,
  sections: [
    {
      id: 'LAYER_0',
      title: 'LAYER 0',
      role: 'Base docs',
      docs: [{ label: 'TS', path: 'INSTRUCTIONS/LAYER_0/TS.instructions.md' }],
    },
  ],
  storage: [
    {
      id: 'ADR',
      title: 'ADR',
      path: 'ADR/',
      description: 'Architecture decisions',
    },
  ],
  modes: [
    {
      id: 'ASI',
      title: 'ASI MODE',
      summary: 'Strategic research',
      docPath: 'INSTRUCTIONS/MODES/ASI.instructions.md',
    },
  ],
  contract: {
    resourceScheme: 'test',
    resourcePath: 'os',
    uiUri: 'ui://test-os/mcp-app.html',
    launcherName: 'show-test-os',
    launcherDescription: 'Open Test OS navigator',
  },
});

describe('knowledge-system', () => {
  it('creates a DomainContract with overview, templates, UI and launcher', () => {
    const contract = createKnowledgeSystemContract(testDefinition);

    expect(contract.kind).toBe('test-os');
    expect(contract.resources.overview!.uriTemplate).toBe('test://os/overview');
    expect(contract.resources.layer!.uriTemplate).toBe('test://os/layers/{id}');
    expect(contract.resources.mode!.uriTemplate).toBe('test://os/modes/{id}');
    expect(contract.resources.storage!.uriTemplate).toBe('test://os/storage/{id}');
    expect(contract.resources.ui!.uriTemplate).toBe('ui://test-os/mcp-app.html');
    expect(contract.launchers!.show!.name).toBe('show-test-os');
    expect(contract.launchers!.show!.uiResource).toBe('ui://test-os/mcp-app.html');
  });

  it('builds snapshots from definition data', () => {
    const snapshot = buildKnowledgeSnapshot(testDefinition, 'layers', 'ASI');

    expect(snapshot.focus).toBe('layers');
    expect(snapshot.cognitiveMode).toBe('ASI');
    expect(snapshot.layers).toHaveLength(1);
    expect(snapshot.storage[0]?.id).toBe('ADR');
    expect(snapshot.modes[0]?.id).toBe('ASI');
  });

  it('exposes stable resource URIs', () => {
    const uris = getKnowledgeResourceUris(testDefinition);
    expect(uris.overview).toBe('test://os/overview');
    expect(uris.ui).toBe('ui://test-os/mcp-app.html');
  });
});
