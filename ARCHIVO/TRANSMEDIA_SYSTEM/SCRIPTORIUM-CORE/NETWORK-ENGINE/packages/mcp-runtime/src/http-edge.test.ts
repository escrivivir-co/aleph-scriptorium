import { describe, expect, it } from 'bun:test';
import { createMcpHttpEdge } from './http-edge';

function emptyProjection() {
  return { resources: [], prompts: [], tools: [], sampling: [] };
}

function initializeBody(id: number) {
  return {
    jsonrpc: '2.0' as const,
    id,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'http-edge-test', version: '1.0.0' },
    },
  };
}

function parseMcpResponse(text: string): { jsonrpc: string; id: number; result?: unknown; error?: unknown } {
  const trimmed = text.trim();
  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed) as { jsonrpc: string; id: number; result?: unknown; error?: unknown };
  }

  const dataLine = trimmed.split('\n').find((line) => line.startsWith('data:'));
  if (!dataLine) {
    throw new Error(`Unexpected MCP response: ${trimmed.slice(0, 200)}`);
  }

  return JSON.parse(dataLine.replace(/^data:\s*/, '')) as {
    jsonrpc: string;
    id: number;
    result?: unknown;
    error?: unknown;
  };
}

describe('createMcpHttpEdge', () => {
  it('handles two consecutive initialize requests without transport reuse failure', async () => {
    const edge = createMcpHttpEdge({
      port: 0,
      register: {
        projection: emptyProjection(),
        server: { name: 'http-edge-test', version: '1.0.0' },
      },
    });

    const { port } = await edge.listen();

    try {
      for (const id of [1, 2]) {
        const response = await fetch(`http://127.0.0.1:${port}/mcp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/event-stream',
          },
          body: JSON.stringify(initializeBody(id)),
        });

        expect(response.status).toBe(200);
        const payload = parseMcpResponse(await response.text());
        expect(payload.jsonrpc).toBe('2.0');
        expect(payload.id).toBe(id);
        expect(payload.error).toBeUndefined();
        expect(payload.result).toBeDefined();
      }
    } finally {
      await edge.close();
    }
  });

  it('reports a clear error when the port is already in use', async () => {
    const edge = createMcpHttpEdge({
      port: 0,
      register: {
        projection: emptyProjection(),
        server: { name: 'http-edge-test', version: '1.0.0' },
      },
    });

    const { port } = await edge.listen();

    const conflicting = createMcpHttpEdge({
      port,
      reclaimPortOnListen: false,
      register: {
        projection: emptyProjection(),
        server: { name: 'http-edge-test', version: '1.0.0' },
      },
    });

    await expect(conflicting.listen()).rejects.toThrow(/already in use/i);
    await edge.close();
  });
});
