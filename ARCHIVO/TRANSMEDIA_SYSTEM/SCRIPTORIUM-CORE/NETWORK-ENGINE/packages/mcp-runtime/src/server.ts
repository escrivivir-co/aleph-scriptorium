import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
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
import { z } from 'zod';
import type { MCPRuntime } from './runtime/index';

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

export function createCacheHints(
	ttlMs: number,
	cacheScope: 'public' | 'private',
): { ttlMs: number; cacheScope: 'public' | 'private' } {
	return {
		ttlMs: Math.max(0, ttlMs),
		cacheScope,
	};
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
				...(tool.ui ? { _meta: { ui: { resourceUri: tool.ui.resourceUri } } } : {}),
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
				...(tool.ui ? { _meta: { ui: { resourceUri: tool.ui.resourceUri } } } : {}),
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
