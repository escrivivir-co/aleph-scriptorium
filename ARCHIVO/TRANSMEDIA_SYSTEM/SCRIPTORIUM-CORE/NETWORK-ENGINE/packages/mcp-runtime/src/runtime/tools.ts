import type { MCPToolProjection } from '@network-engine/mcp/projection';
import type { Subject } from 'rxjs';
import type { MCPRuntimeEvent } from '../events';
import type { MCPContentResult, MCPRuntimeHandlers, MCPRuntimeServerLike } from './types';
import { now, toRecord } from './utils';

export function acceptedToolResult(tool: MCPToolProjection): MCPContentResult {
	return {
		content: [
			{
				type: 'text',
				text: `Mutation capability accepted: ${tool.name}`,
			},
		],
		structuredContent: {
			accepted: true,
			toolName: tool.name,
			effect: tool.effect,
			externalEffects: tool.externalEffects,
		},
	};
}

export function registerTool(
	server: MCPRuntimeServerLike,
	tool: MCPToolProjection,
	handlers: MCPRuntimeHandlers,
	events: Subject<MCPRuntimeEvent>
): void {
	const handler = async (args: unknown): Promise<MCPContentResult> => {
		const recordArgs = toRecord(args);
		events.next({
			type: 'MCP_MUTATION_CAPABILITY_REQUESTED',
			toolName: tool.name,
			args: recordArgs,
			tool,
			timestamp: now(),
		});

		try {
			const result = handlers.executeTool
				? await handlers.executeTool({ tool, args: recordArgs })
				: acceptedToolResult(tool);
			events.next({
				type: 'MCP_MUTATION_CAPABILITY_COMPLETED',
				toolName: tool.name,
				result,
				timestamp: now(),
			});
			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			events.next({
				type: 'MCP_MUTATION_CAPABILITY_FAILED',
				toolName: tool.name,
				error: message,
				timestamp: now(),
			});
			return {
				content: [{ type: 'text', text: message }],
				isError: true,
			};
		}
	};

	if (server.registerTool) {
		server.registerTool(
			tool.name,
			{
				description: tool.description,
				inputSchema: tool.inputSchema,
				annotations: {
					destructiveHint: tool.effect === 'delete',
					idempotentHint: tool.idempotent,
				},
				_meta: {
					...(tool.ui ? { ui: { resourceUri: tool.ui.resourceUri } } : {}),
					'network-engine/effect': tool.effect,
					'network-engine/launcher': tool.launcher === true,
					'network-engine/requiresConfirmation': tool.requiresConfirmation,
					'network-engine/externalEffects': tool.externalEffects,
				},
			},
			handler,
		);
		return;
	}

	server.tool?.(tool.name, tool.description, tool.inputSchema, handler);
}

export async function executeTool(
	name: string,
	toolMap: Map<string, MCPToolProjection>,
	handlers: MCPRuntimeHandlers,
	events: Subject<MCPRuntimeEvent>,
	args: Record<string, unknown> = {}
): Promise<MCPContentResult['structuredContent'] | MCPContentResult> {
	const tool = toolMap.get(name);
	if (!tool) {
		throw new Error(`Unknown MCP tool: ${name}`);
	}

	events.next({
		type: 'MCP_MUTATION_CAPABILITY_REQUESTED',
		toolName: tool.name,
		args,
		tool,
		timestamp: now(),
	});

	try {
		const result = handlers.executeTool
			? await handlers.executeTool({ tool, args })
			: acceptedToolResult(tool);
		events.next({
			type: 'MCP_MUTATION_CAPABILITY_COMPLETED',
			toolName: tool.name,
			result,
			timestamp: now(),
		});
		return result.structuredContent ?? result;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		events.next({
			type: 'MCP_MUTATION_CAPABILITY_FAILED',
			toolName: tool.name,
			error: message,
			timestamp: now(),
		});
		throw error;
	}
}
