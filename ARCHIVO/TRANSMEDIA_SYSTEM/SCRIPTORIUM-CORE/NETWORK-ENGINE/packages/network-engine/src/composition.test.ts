import { describe, expect, it } from 'bun:test';
import { testMachine, type TestSemantics } from '@network-engine/core';
import type { MCPProjectionResult } from '@network-engine/mcp/projection';
import { createInMemoryDocumentStore } from '@network-engine/mongo';
import { createNetworkEngine } from './composition';

function emptyProjection(): MCPProjectionResult {
  return { resources: [], prompts: [], tools: [], sampling: [] };
}

describe('createNetworkEngine', () => {
  it('wires node orchestrator without optional slots', () => {
    const engine = createNetworkEngine<TestSemantics>(testMachine);
    expect(engine.orchestrator).toBeDefined();
    expect(engine.pubsubBridge).toBeUndefined();
    expect(engine.mcpRuntime).toBeUndefined();
  });

  it('accepts optional mcp runtime slot', () => {
    const engine = createNetworkEngine<TestSemantics>(testMachine, {
      mcp: { projection: emptyProjection() },
    });
    expect(engine.mcpRuntime).toBeDefined();
    expect(engine.mcpRuntime?.listResources()).toEqual([]);
  });

  it('wires document sync loop when storage and mcp are configured', async () => {
    const store = createInMemoryDocumentStore();
    const notified: string[] = [];

    const engine = createNetworkEngine<TestSemantics>(testMachine, {
      mcp: {
        projection: {
          resources: [
            {
              kind: 'resource',
              uriTemplate: 'test://items',
              name: 'Items',
              description: '',
              mimeType: 'application/json',
            },
          ],
          prompts: [],
          tools: [],
          sampling: [],
        },
        mapToolRequest: (req) => ({
          type: 'INFER',
          payload: { fact: req.tool.name },
          timestamp: Date.now(),
        }),
        contract: {
          kind: 'test',
          version: '1.0.0',
          display: { singular: 'Item', plural: 'Items' },
          schema: {},
          storage: { capability: 'document-store', collection: 'items', version: '1.0.0' },
          resources: {
            collection: {
              kind: 'resource',
              uriTemplate: 'test://items',
              name: 'Items',
              mimeType: 'application/json',
            },
          },
          prompts: {},
          mutations: {},
        },
      },
      storage: {
        store,
        collection: 'items',
        mappers: {
          mapDocumentChange: (change) => ({
            type: 'INFER',
            payload: { fact: `${change.kind}:${change.id}` },
            timestamp: change.ts,
          }),
          mapEventToResourceUri: () => 'test://items',
        },
      },
    });

    expect(engine.documentSync).toBeDefined();

    const sub = engine.mcpRuntime!.events$.subscribe((e) => {
      if (e.type === 'MCP_RESOURCE_UPDATED') notified.push(e.uri);
    });

    engine.orchestrator.dispatch({
      type: 'INFER',
      payload: { fact: 'bootstrap' },
      timestamp: Date.now(),
    });

    await store.insert('items', { name: 'one' });
    expect(notified).toContain('test://items');
    sub.unsubscribe();
    engine.documentSync?.unsubscribe();
  });
});
