import { describe, expect, it } from 'bun:test';
import { EventEmitter } from 'node:events';
import type { MCPProjectionResult } from '@network-engine/mcp/projection';
import { createMcpServerFromRuntime, registerFastifyMCPRuntime, type FastifyLike, type FastifyLikeReply, type FastifyLikeRequest } from './fastify';
import { createMCPRuntime } from './runtime';

class FakeFastify implements FastifyLike {
  posts = new Map<string, (request: FastifyLikeRequest, reply: FastifyLikeReply) => Promise<unknown>>();
  gets = new Map<string, (request: FastifyLikeRequest, reply: FastifyLikeReply) => Promise<unknown>>();

  post(path: string, handler: (request: FastifyLikeRequest, reply: FastifyLikeReply) => Promise<unknown>): void {
    this.posts.set(path, handler);
  }

  get(path: string, handler: (request: FastifyLikeRequest, reply: FastifyLikeReply) => Promise<unknown>): void {
    this.gets.set(path, handler);
  }
}

function emptyProjection(): MCPProjectionResult {
  return { resources: [], prompts: [], tools: [], sampling: [] };
}

function richProjection(): MCPProjectionResult {
  return {
    resources: [
      {
        kind: 'resource',
        uriTemplate: 'network://palettes',
        name: 'Palettes',
        description: 'Palette collection',
        mimeType: 'application/json',
      },
      {
        kind: 'template',
        uriTemplate: 'network://palettes/{id}',
        name: 'Palette Template',
        description: 'Single palette',
        mimeType: 'application/json',
      },
    ],
    prompts: [
      {
        name: 'design-palette',
        description: 'Design palette',
        goal: 'Design a palette',
        arguments: [],
        requiresResources: ['network://palettes'],
        outputs: [],
        recommendedSampling: [],
        permittedMutations: [],
      },
    ],
    tools: [
      {
        name: 'persist_palette',
        description: 'Persist palette',
        inputSchema: { type: 'object' },
        effect: 'upsert',
        requiresConfirmation: false,
        idempotent: false,
        externalEffects: ['storage'],
      },
    ],
    sampling: [],
  };
}

function createReply(): FastifyLikeReply & { payload?: unknown; statusCode?: number } {
  return {
    raw: {} as never,
    sent: false,
    statusCode: 200,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    send(payload?: unknown) {
      this.sent = true;
      this.payload = payload;
      return payload;
    },
  };
}

function createStreamingRequest(): FastifyLikeRequest {
  const raw = new EventEmitter() as FastifyLikeRequest['raw'];
  return { raw };
}

function createStreamingReply(): FastifyLikeReply & {
  payload?: unknown;
  statusCode?: number;
  headers: Record<string, unknown>;
  chunks: string[];
} {
  const raw = new EventEmitter() as FastifyLikeReply['raw'] & {
    statusCode?: number;
    headers?: Record<string, unknown>;
    setHeader?: (name: string, value: unknown) => void;
    flushHeaders?: () => void;
    write?: (chunk: string) => void;
  };

  const reply: FastifyLikeReply & {
    payload?: unknown;
    statusCode?: number;
    headers: Record<string, unknown>;
    chunks: string[];
  } = {
    raw,
    sent: false,
    statusCode: 200,
    headers: {},
    chunks: [],
    status(code: number) {
      this.statusCode = code;
      raw.statusCode = code;
      return this;
    },
    send(payload?: unknown) {
      this.sent = true;
      this.payload = payload;
      return payload;
    },
  };

  raw.setHeader = ((name: string, value: unknown) => {
    reply.headers[name] = value;
    return raw;
  }) as typeof raw.setHeader;
  raw.flushHeaders = () => {};
  raw.write = ((chunk: string) => {
    reply.chunks.push(chunk);
    return true;
  }) as typeof raw.write;

  return reply;
}

describe('registerFastifyMCPRuntime', () => {
  it('registers MCP POST endpoint and health endpoint', () => {
    const fastify = new FakeFastify();
    const registration = registerFastifyMCPRuntime(fastify, {
      projection: emptyProjection(),
      server: { name: 'network-engine-test', version: '1.0.0' },
      path: '/mcp',
    });

    expect(registration.path).toBe('/mcp');
    expect(fastify.posts.has('/mcp')).toBe(true);
    expect(fastify.gets.has('/mcp/health')).toBe(true);
    expect(fastify.gets.has('/mcp/discover')).toBe(true);
  });

  it('responds to server/discover over POST before delegating to transport', async () => {
    const fastify = new FakeFastify();
    registerFastifyMCPRuntime(fastify, {
      projection: emptyProjection(),
      server: {
        name: 'network-engine-test',
        version: '1.0.0',
        instructions: 'Use resources first.',
      },
      path: '/mcp',
    });

    const handler = fastify.posts.get('/mcp');
    const reply = createReply();

    await handler?.(
      {
        raw: {} as never,
        body: {
          jsonrpc: '2.0',
          id: 'discover-1',
          method: 'server/discover',
        },
      },
      reply,
    );

    expect(reply.payload).toEqual({
      jsonrpc: '2.0',
      id: 'discover-1',
      result: {
        resultType: 'complete',
        supportedVersions: ['2026-07-28'],
        capabilities: {},
        serverInfo: {
          name: 'network-engine-test',
          version: '1.0.0',
        },
        instructions: 'Use resources first.',
        ttlMs: 3600000,
        cacheScope: 'public',
      },
    });
  });

  it('returns cacheable list/read results from the underlying MCP server handlers', async () => {
    const runtime = createMCPRuntime({
      projection: richProjection(),
      handlers: {
        readResource: async ({ uri }) => ({
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({ uri }),
            },
          ],
        }),
      },
    });
    const mcpServer = createMcpServerFromRuntime(
      {
        name: 'network-engine-test',
        version: '1.0.0',
        listTtlMs: 1234,
        readTtlMs: 4321,
        listCacheScope: 'public',
        readCacheScope: 'private',
      },
      runtime,
    );

    const handlers = (mcpServer.server as any)._requestHandlers as Map<string, (request?: unknown, extra?: unknown) => Promise<unknown>>;

    const makeRequest = (method: string, params: Record<string, unknown> = {}) => ({
      jsonrpc: '2.0',
      id: `${method}-1`,
      method,
      params,
    });

    const toolsList = await handlers.get('tools/list')?.(makeRequest('tools/list'));
    const promptsList = await handlers.get('prompts/list')?.(makeRequest('prompts/list'));
    const resourcesList = await handlers.get('resources/list')?.(makeRequest('resources/list'));
    const templatesList = await handlers.get('resources/templates/list')?.(makeRequest('resources/templates/list'));
    const resourceRead = await handlers.get('resources/read')?.(makeRequest('resources/read', { uri: 'network://palettes/nebula' }));

    expect(toolsList).toMatchObject({ resultType: 'complete', ttlMs: 1234, cacheScope: 'public' });
    expect(promptsList).toMatchObject({ resultType: 'complete', ttlMs: 1234, cacheScope: 'public' });
    expect(resourcesList).toMatchObject({ resultType: 'complete', ttlMs: 1234, cacheScope: 'public' });
    expect(templatesList).toMatchObject({ resultType: 'complete', ttlMs: 1234, cacheScope: 'public' });
    expect(resourceRead).toMatchObject({ resultType: 'complete', ttlMs: 4321, cacheScope: 'private' });
    expect((resourcesList as any).resources).toHaveLength(1);
    expect((templatesList as any).resourceTemplates).toHaveLength(1);
    expect((resourceRead as any).contents[0]?.uri).toBe('network://palettes/nebula');
  });

  it('opens an SSE stream for subscriptions/listen and emits opted-in notifications only', async () => {
    const fastify = new FakeFastify();
    const registration = registerFastifyMCPRuntime(fastify, {
      projection: richProjection(),
      server: { name: 'network-engine-test', version: '1.0.0' },
      path: '/mcp',
    });

    const handler = fastify.posts.get('/mcp');
    const request = createStreamingRequest();
    const reply = createStreamingReply();

    await handler?.(
      {
        ...request,
        body: {
          jsonrpc: '2.0',
          id: 'sub-1',
          method: 'subscriptions/listen',
          params: {
            notifications: {
              toolsListChanged: true,
              resourceSubscriptions: ['network://palettes/demo'],
            },
          },
        },
      },
      reply,
    );

    registration.runtime.notifyPromptsListChanged();
    registration.runtime.notifyToolsListChanged();
    registration.runtime.notifyResourceUpdated('network://palettes/demo');
    registration.runtime.notifyResourceUpdated('network://palettes/other');

    expect(reply.headers['Content-Type']).toBe('text/event-stream');
    expect(reply.headers['X-Accel-Buffering']).toBe('no');
    expect(reply.chunks).toHaveLength(3);

    const messages = reply.chunks.map((chunk) => JSON.parse(chunk.replace(/^data:\s*/, '').trim()));

    expect(messages[0]).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/subscriptions/acknowledged',
      params: {
        _meta: {
          'io.modelcontextprotocol/subscriptionId': 'sub-1',
        },
        notifications: {
          toolsListChanged: true,
          resourceSubscriptions: ['network://palettes/demo'],
        },
      },
    });

    expect(messages[1]).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/tools/list_changed',
      params: {
        _meta: {
          'io.modelcontextprotocol/subscriptionId': 'sub-1',
        },
      },
    });

    expect(messages[2]).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/resources/updated',
      params: {
        _meta: {
          'io.modelcontextprotocol/subscriptionId': 'sub-1',
        },
        uri: 'network://palettes/demo',
      },
    });
  });
});