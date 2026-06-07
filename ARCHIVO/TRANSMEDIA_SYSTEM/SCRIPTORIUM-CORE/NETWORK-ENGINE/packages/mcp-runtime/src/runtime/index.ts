import type { MCPPromptProjection, MCPResourceProjection, MCPToolProjection } from '@network-engine/mcp/projection';
import { Subject } from 'rxjs';
import type { MCPRuntimeEvent } from '../events';
import { getPrompt, registerPrompt } from './prompts';
import { readResource, registerResource } from './resources';
import { executeTool, registerTool } from './tools';
import type { MCPRuntime, MCPRuntimeOptions, MCPRuntimeServerLike } from './types';
import { now } from './utils';

export * from './types';

export function createMCPRuntime(options: MCPRuntimeOptions): MCPRuntime {
	const events = new Subject<MCPRuntimeEvent>();
	const { projection, handlers = {}, createResourceTemplate } = options;
	const resourceMap = new Map<string, MCPResourceProjection>();
	const promptMap = new Map<string, MCPPromptProjection>();
	const toolMap = new Map<string, MCPToolProjection>();

	for (const resource of projection.resources) {
		resourceMap.set(resource.uriTemplate, resource);
	}

	for (const prompt of projection.prompts) {
		promptMap.set(prompt.name, prompt);
	}

	for (const tool of projection.tools) {
		toolMap.set(tool.name, tool);
	}

	function notifyToolsListChanged(): void {
		events.next({
			type: 'MCP_TOOLS_LIST_CHANGED',
			timestamp: now(),
		});
	}

	function notifyPromptsListChanged(): void {
		events.next({
			type: 'MCP_PROMPTS_LIST_CHANGED',
			timestamp: now(),
		});
	}

	function notifyResourcesListChanged(): void {
		events.next({
			type: 'MCP_RESOURCES_LIST_CHANGED',
			timestamp: now(),
		});
	}

	function notifyResourceUpdated(uri: string): void {
		events.next({
			type: 'MCP_RESOURCE_UPDATED',
			uri,
			timestamp: now(),
		});
	}

	return {
		projection,
		events$: events.asObservable(),
		listResources: () => [...projection.resources],
		listPrompts: () => [...projection.prompts],
		listTools: () => [...projection.tools],
		readResource: (uriTemplate: string, uri?: string) => readResource(uriTemplate, resourceMap, handlers, events, uri),
		getPrompt: (name: string, args?: Record<string, string>) => getPrompt(name, promptMap, handlers, events, args),
		executeTool: (name: string, args?: Record<string, unknown>) => executeTool(name, toolMap, handlers, events, args),
		notifyToolsListChanged,
		notifyPromptsListChanged,
		notifyResourcesListChanged,
		notifyResourceUpdated,
		register(server: MCPRuntimeServerLike): void {
			for (const resource of projection.resources) registerResource(server, resource, handlers, events, createResourceTemplate);
			for (const prompt of projection.prompts) registerPrompt(server, prompt, handlers, events);
			for (const tool of projection.tools) registerTool(server, tool, handlers, events);
		},
	};
}
