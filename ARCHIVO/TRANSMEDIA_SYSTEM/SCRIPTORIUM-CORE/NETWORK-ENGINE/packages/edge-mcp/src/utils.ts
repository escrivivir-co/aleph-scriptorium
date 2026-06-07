import type { MCPRuntime, MCPRuntimeServerConfig } from '@network-engine/mcp-runtime';
import type { MCPRuntimeEvent } from '@network-engine/mcp-runtime';
import type { SubscriptionFilter, SubscriptionsListenRequestBody } from './types';
import type { RestReply } from '@network-engine/edge-rest';

export function createDiscoverPayload(config: MCPRuntimeServerConfig, runtime: MCPRuntime) {
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

export function createCacheHints(
	ttlMs: number,
	cacheScope: 'public' | 'private',
): { ttlMs: number; cacheScope: 'public' | 'private' } {
	return {
		ttlMs: Math.max(0, ttlMs),
		cacheScope,
	};
}

export function isDiscoverRequest(body: unknown): body is { jsonrpc: '2.0'; id: string | number | null; method: 'server/discover' } {
	if (!body || typeof body !== 'object') return false;
	const candidate = body as { jsonrpc?: unknown; id?: unknown; method?: unknown };
	return candidate.jsonrpc === '2.0' && candidate.method === 'server/discover' && ('id' in candidate);
}

export function isSubscriptionsListenRequest(body: unknown): body is SubscriptionsListenRequestBody {
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

export function createSupportedFilter(runtime: MCPRuntime, requested: SubscriptionFilter): SubscriptionFilter {
	return {
		...(requested.toolsListChanged && runtime.listTools().length > 0 ? { toolsListChanged: true } : {}),
		...(requested.promptsListChanged && runtime.listPrompts().length > 0 ? { promptsListChanged: true } : {}),
		...(requested.resourcesListChanged && runtime.listResources().length > 0 ? { resourcesListChanged: true } : {}),
		...(requested.resourceSubscriptions && requested.resourceSubscriptions.length > 0 && runtime.listResources().length > 0
			? { resourceSubscriptions: requested.resourceSubscriptions }
			: {}),
	};
}

export function shouldDeliverEvent(filter: SubscriptionFilter, event: MCPRuntimeEvent): boolean {
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

export function toSubscriptionNotification(subscriptionId: string | number | null, event: MCPRuntimeEvent): unknown {
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

export function openSse(reply: RestReply): void {
	reply.raw.statusCode = 200;
	reply.raw.setHeader('Content-Type', 'text/event-stream');
	reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
	reply.raw.setHeader('Connection', 'keep-alive');
	reply.raw.setHeader('X-Accel-Buffering', 'no');
	if ('flushHeaders' in reply.raw && typeof reply.raw.flushHeaders === 'function') {
		reply.raw.flushHeaders();
	}
}

export function writeSse(reply: RestReply, payload: unknown): void {
	reply.raw.write(`data: ${JSON.stringify(payload)}\n\n`);
}

