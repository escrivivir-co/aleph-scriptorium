import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import {
  ErrorCode,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import type { MCPProjectionResult } from '@network-engine/mcp/projection';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { z } from 'zod';
import { createMCPRuntime, type MCPRuntime, type MCPRuntimeHandlers } from './runtime';
import type { MCPRuntimeEvent } from './events';

export interface FastifyLikeRequest {
  raw: IncomingMessage;
  body?: unknown;
}

export interface FastifyLikeReply {
  raw: ServerResponse;
  sent?: boolean;
  status: (code: number) => FastifyLikeReply;
  send: (payload?: unknown) => unknown;
}

export interface FastifyLike {
  post: (path: string, handler: (request: FastifyLikeRequest, reply: FastifyLikeReply) => Promise<unknown>) => unknown;
  get?: (path: string, handler: (request: FastifyLikeRequest, reply: FastifyLikeReply) => Promise<unknown>) => unknown;
}

export interface MCPRuntimeServerConfig {
  name: string;
  version: string;
  instructions?: string;
  supportedVersions?: string[];
  discoverTtlMs?: number;
  discoverCacheScope?: 'public' | 'private';
  listTtlMs?: number;
  listCacheScope?: 'public' | 'private';
  readTtlMs?: number;
  readCacheScope?: 'public' | 'private';
}

export interface FastifyMCPRuntimeOptions {
  projection: MCPProjectionResult;
  server: MCPRuntimeServerConfig;
  handlers?: MCPRuntimeHandlers;
  path?: string;
}

export interface FastifyMCPRuntimeRegistration {
  runtime: MCPRuntime;
  mcpServer: McpServer;
  path: string;
}

interface SubscriptionFilter {
  toolsListChanged?: boolean;
  promptsListChanged?: boolean;
  resourcesListChanged?: boolean;
  resourceSubscriptions?: string[];
}

interface SubscriptionsListenRequestBody {
  jsonrpc: '2.0';
  id: string | number | null;
  method: 'subscriptions/listen';
  params: {
    notifications: SubscriptionFilter;
  };
}

function createDiscoverPayload(config: MCPRuntimeServerConfig, runtime: MCPRuntime) {
  return {
    resultType: 'complete' as const,
    supportedVersions: config.supportedVersions ?? ['2026-07-28'],
    capabilities: {
      ...(runtime.projection.tools.length > 0 ? { tools: { listChanged: true } } : {}),
      ...(runtime.projection.resources.length > 0 ? { resources: { listChanged: true, subscribe: true } } : {}),
      ...(runtime.projection.prompts.length > 0 ? { prompts: { listChanged: true } } : {}),
    },
    serverInfo: {
      name: config.name,
      version: config.version,
    },
    ...(config.instructions ? { instructions: config.instructions } : {}),
    ttlMs: config.discoverTtlMs ?? 60 * 60 * 1000,
    cacheScope: config.discoverCacheScope ?? 'public' as const,
  };
}

function createCacheHints(
  ttlMs: number,
  cacheScope: 'public' | 'private',
): { ttlMs: number; cacheScope: 'public' | 'private' } {
  return {
    ttlMs: Math.max(0, ttlMs),
    cacheScope,
  };
}

function isDiscoverRequest(body: unknown): body is { jsonrpc: '2.0'; id: string | number | null; method: 'server/discover' } {
  if (!body || typeof body !== 'object') return false;
  const candidate = body as { jsonrpc?: unknown; id?: unknown; method?: unknown };
  return candidate.jsonrpc === '2.0' && candidate.method === 'server/discover' && ('id' in candidate);
}

function isSubscriptionsListenRequest(body: unknown): body is SubscriptionsListenRequestBody {
  if (!body || typeof body !== 'object') return false;
  const candidate = body as { jsonrpc?: unknown; id?: unknown; method?: unknown; params?: unknown };
  if (candidate.jsonrpc !== '2.0' || candidate.method !== 'subscriptions/listen' || !('id' in candidate)) {
    return false;
  }

  if (!candidate.params || typeof candidate.params !== 'object') {
    return false;
  }

  return 'notifications' in (candidate.params as Record<string, unknown>);
}

function createSupportedFilter(runtime: MCPRuntime, requested: SubscriptionFilter): SubscriptionFilter {
  return {
    ...(requested.toolsListChanged && runtime.listTools().length > 0 ? { toolsListChanged: true } : {}),
    ...(requested.promptsListChanged && runtime.listPrompts().length > 0 ? { promptsListChanged: true } : {}),
    ...(requested.resourcesListChanged && runtime.listResources().length > 0 ? { resourcesListChanged: true } : {}),
    ...(requested.resourceSubscriptions && requested.resourceSubscriptions.length > 0 && runtime.listResources().length > 0
      ? { resourceSubscriptions: requested.resourceSubscriptions }
      : {}),
  };
}

function shouldDeliverEvent(filter: SubscriptionFilter, event: MCPRuntimeEvent): boolean {
  switch (event.type) {
    case 'MCP_TOOLS_LIST_CHANGED':
      return filter.toolsListChanged === true;
    case 'MCP_PROMPTS_LIST_CHANGED':
      return filter.promptsListChanged === true;
    case 'MCP_RESOURCES_LIST_CHANGED':
      return filter.resourcesListChanged === true;
    case 'MCP_RESOURCE_UPDATED':
      return (filter.resourceSubscriptions ?? []).includes(event.uri);
    default:
      return false;
  }
}

function toSubscriptionNotification(subscriptionId: string | number | null, event: MCPRuntimeEvent): unknown {
  const _meta = {
    'io.modelcontextprotocol/subscriptionId': String(subscriptionId),
  };

  switch (event.type) {
    case 'MCP_TOOLS_LIST_CHANGED':
      return {
        jsonrpc: '2.0',
        method: 'notifications/tools/list_changed',
        params: { _meta },
      };
    case 'MCP_PROMPTS_LIST_CHANGED':
      return {
        jsonrpc: '2.0',
        method: 'notifications/prompts/list_changed',
        params: { _meta },
      };
    case 'MCP_RESOURCES_LIST_CHANGED':
      return {
        jsonrpc: '2.0',
        method: 'notifications/resources/list_changed',
        params: { _meta },
      };
    case 'MCP_RESOURCE_UPDATED':
      return {
        jsonrpc: '2.0',
        method: 'notifications/resources/updated',
        params: {
          _meta,
          uri: event.uri,
        },
      };
    default:
      return null;
  }
}

function openSse(reply: FastifyLikeReply): void {
  reply.raw.statusCode = 200;
  reply.raw.setHeader('Content-Type', 'text/event-stream');
  reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('X-Accel-Buffering', 'no');
  reply.raw.flushHeaders?.();
}

function writeSse(reply: FastifyLikeReply, payload: unknown): void {
  reply.raw.write(`data: ${JSON.stringify(payload)}\n\n`);
}

export function createMcpServerFromRuntime(
  config: MCPRuntimeServerConfig,
  runtime: MCPRuntime,
): McpServer {
  const capabilities = {
    resources: { listChanged: true, subscribe: true },
    prompts: { listChanged: true },
    tools: { listChanged: true },
  };
  const serverOptions = {
    capabilities,
    ...(config.instructions ? { instructions: config.instructions } : {}),
  };

  const mcpServer = new McpServer(
    {
      name: config.name,
      version: config.version,
    },
    serverOptions,
  );

  for (const resource of runtime.listResources()) {
    if (resource.kind === 'template') {
      (mcpServer as any).registerResource(
        resource.name,
        resource.uriTemplate,
        {
          description: resource.description,
          mimeType: resource.mimeType,
        },
        async (_uri: URL, variables: Record<string, string | string[]>) => {
          let resolvedUri: string = resource.uriTemplate;
          for (const [key, value] of Object.entries(variables)) {
            const normalized = Array.isArray(value) ? value[0] : value;
            resolvedUri = resolvedUri.replace(`{${key}}`, normalized ?? '');
          }
          const result = await runtime.readResource(resource.uriTemplate, resolvedUri);
          return {
            contents: [
              {
                uri: resolvedUri,
                mimeType: result.mimeType ?? resource.mimeType,
                text: result.text,
              },
            ],
          };
        },
      );
      continue;
    }

    (mcpServer as any).registerResource(
      resource.name,
      resource.uriTemplate,
      {
        description: resource.description,
        mimeType: resource.mimeType,
      },
      async () => {
        const result = await runtime.readResource(resource.uriTemplate, resource.uriTemplate);
        return {
          contents: [
            {
              uri: resource.uriTemplate,
              mimeType: result.mimeType ?? resource.mimeType,
              text: result.text,
            },
          ],
        };
      },
    );
  }

  for (const prompt of runtime.listPrompts()) {
    (mcpServer as any).registerPrompt(
      prompt.name,
      {
        description: prompt.description,
        argsSchema: Object.fromEntries(
          prompt.arguments.map((arg: { name: string; description: string; required: boolean }) => [
            arg.name,
            arg.required ? z.string().describe(arg.description) : z.string().optional().describe(arg.description),
          ]),
        ),
      },
      async (args: Record<string, string>) => ({
        messages: await runtime.getPrompt(prompt.name, args),
      }),
    );
  }

  for (const tool of runtime.listTools()) {
    (mcpServer as any).registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: z.object({}).passthrough(),
      },
      async (args: Record<string, unknown>) => {
        const result = await runtime.executeTool(tool.name, args);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
          structuredContent: typeof result === 'object' && result !== null ? result as Record<string, unknown> : { value: result },
        } satisfies CallToolResult;
      },
    );
  }

  const listCache = createCacheHints(config.listTtlMs ?? 5 * 60 * 1000, config.listCacheScope ?? 'public');
  const readCache = createCacheHints(config.readTtlMs ?? 60 * 1000, config.readCacheScope ?? 'private');

  mcpServer.server.setRequestHandler(ListToolsRequestSchema, async () => ({
    resultType: 'complete' as const,
    tools: runtime
      .listTools()
      .map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      }))
      .sort((left, right) => left.name.localeCompare(right.name)),
    ...listCache,
  }));

  mcpServer.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    resultType: 'complete' as const,
    prompts: runtime
      .listPrompts()
      .map((prompt) => ({
        name: prompt.name,
        description: prompt.description,
        arguments: prompt.arguments,
      }))
      .sort((left, right) => left.name.localeCompare(right.name)),
    ...listCache,
  }));

  mcpServer.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resultType: 'complete' as const,
    resources: runtime
      .listResources()
      .filter((resource) => resource.kind === 'resource')
      .map((resource) => ({
        uri: resource.uriTemplate,
        name: resource.name,
        description: resource.description,
        mimeType: resource.mimeType,
      }))
      .sort((left, right) => left.uri.localeCompare(right.uri)),
    ...listCache,
  }));

  mcpServer.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
    resultType: 'complete' as const,
    resourceTemplates: runtime
      .listResources()
      .filter((resource) => resource.kind === 'template')
      .map((resource) => ({
        uriTemplate: resource.uriTemplate,
        name: resource.name,
        description: resource.description,
        mimeType: resource.mimeType,
      }))
      .sort((left, right) => left.uriTemplate.localeCompare(right.uriTemplate)),
    ...listCache,
  }));

  mcpServer.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    const exact = runtime.listResources().find((resource) => resource.kind === 'resource' && resource.uriTemplate === uri);
    if (exact) {
      const result = await runtime.readResource(exact.uriTemplate, uri);
      return {
        resultType: 'complete' as const,
        contents: [
          {
            uri,
            mimeType: result.mimeType ?? exact.mimeType,
            text: result.text,
          },
        ],
        ...readCache,
      };
    }

    for (const template of runtime.listResources().filter((resource) => resource.kind === 'template')) {
      const variables = [...template.uriTemplate.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
      const pattern = new RegExp(`^${template.uriTemplate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{[^}]+\\\}/g, '([^/]+)')}$`);
      const match = uri.match(pattern);
      if (!match) continue;

      let resolvedUri: string = template.uriTemplate;
      variables.forEach((variable, index) => {
        resolvedUri = resolvedUri.replace(`{${variable}}`, match[index + 1] ?? '');
      });
      const result = await runtime.readResource(template.uriTemplate, resolvedUri);
      return {
        resultType: 'complete' as const,
        contents: [
          {
            uri: resolvedUri,
            mimeType: result.mimeType ?? template.mimeType,
            text: result.text,
          },
        ],
        ...readCache,
      };
    }

    throw new McpError(ErrorCode.InvalidParams, `Resource not found: ${uri}`);
  });

  return mcpServer;
}

export function registerFastifyMCPRuntime(
  fastify: FastifyLike,
  options: FastifyMCPRuntimeOptions,
): FastifyMCPRuntimeRegistration {
  const path = options.path ?? '/mcp';
  const runtime = createMCPRuntime(
    options.handlers
      ? {
          projection: options.projection,
          handlers: options.handlers,
        }
      : {
          projection: options.projection,
        },
  );
  const mcpServer = createMcpServerFromRuntime(options.server, runtime);
  const discoverPayload = createDiscoverPayload(options.server, runtime);

  fastify.post(path, async (request, reply) => {
    try {
      if (isDiscoverRequest(request.body)) {
        return reply.send({
          jsonrpc: '2.0',
          id: request.body.id,
          result: discoverPayload,
        });
      }

      if (isSubscriptionsListenRequest(request.body)) {
        const listenRequest = request.body;
        const notifications = createSupportedFilter(runtime, listenRequest.params.notifications);
        openSse(reply);

        writeSse(reply, {
          jsonrpc: '2.0',
          method: 'notifications/subscriptions/acknowledged',
          params: {
            _meta: {
              'io.modelcontextprotocol/subscriptionId': String(listenRequest.id),
            },
            notifications,
          },
        });

        const subscription = runtime.events$.subscribe((event) => {
          if (!shouldDeliverEvent(notifications, event)) {
            return;
          }

          const payload = toSubscriptionNotification(listenRequest.id, event);
          if (!payload) {
            return;
          }

          writeSse(reply, payload);
        });

        const cleanup = () => {
          subscription.unsubscribe();
        };

        request.raw.on?.('close', cleanup);
        reply.raw.on?.('close', cleanup);
        return undefined;
      }

      const transport = new StreamableHTTPServerTransport();
      await mcpServer.connect(transport as never);
      await transport.handleRequest(request.raw, reply.raw, request.body);
      return undefined;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!reply.sent) {
        return reply.status(500).send({
          jsonrpc: '2.0',
          error: { code: -32603, message },
          id: null,
        });
      }
      return undefined;
    }
  });

  fastify.get?.(`${path}/health`, async (_request, reply) => reply.send({
    status: 'healthy',
    server: options.server.name,
    version: options.server.version,
    capabilities: {
      resources: options.projection.resources.length,
      prompts: options.projection.prompts.length,
      tools: options.projection.tools.length,
      sampling: options.projection.sampling.length,
    },
  }));

  fastify.get?.(`${path}/discover`, async (_request, reply) => reply.send(discoverPayload));

  return { runtime, mcpServer, path };
}