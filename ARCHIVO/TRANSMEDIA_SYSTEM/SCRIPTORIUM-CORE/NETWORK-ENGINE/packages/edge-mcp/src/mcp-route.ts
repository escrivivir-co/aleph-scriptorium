import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMCPRuntime, createMcpServerFromRuntime } from '@network-engine/mcp-runtime';
import type { RestRouter } from '@network-engine/edge-rest';
import type { McpRouteOptions, McpRouteRegistration } from './types';
import {
	createDiscoverPayload,
	isDiscoverRequest,
	isSubscriptionsListenRequest,
	createSupportedFilter,
	openSse,
	writeSse,
	shouldDeliverEvent,
	toSubscriptionNotification,
} from './utils';

export * from './types';

export function mountMcpRoute(
	restRouter: RestRouter,
	options: McpRouteOptions,
): McpRouteRegistration {
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
	// Reference server for registration introspection; each Streamable HTTP request gets its own instance.
	const mcpServer = createMcpServerFromRuntime(options.server, runtime);
	const discoverPayload = createDiscoverPayload(options.server, runtime);
	const createConnectionServer = () => createMcpServerFromRuntime(options.server, runtime);

	restRouter.post(path, async (request, reply) => {
		try {
			if (isDiscoverRequest(request.body)) {
				return reply.send({
					jsonrpc: '2.0',
					id: (request.body as any).id as string | number,
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

			const connectionServer = createConnectionServer();
			const transport = new StreamableHTTPServerTransport();
			const cleanup = () => {
				transport.close().catch(() => { });
				connectionServer.close().catch(() => { });
			};
			request.raw.on?.('close', cleanup);
			reply.raw.on?.('close', cleanup);

			await connectionServer.connect(transport as never);
			await transport.handleRequest(request.raw, reply.raw as any, request.body);
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

	restRouter.get(`${path}/health`, async (_request, reply) => reply.send({
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

	restRouter.get(`${path}/discover`, async (_request, reply) => reply.send(discoverPayload));

	return { runtime, mcpServer, path };
}

