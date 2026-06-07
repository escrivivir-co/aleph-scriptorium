import type {
	MCPProjectionResult,
	MCPPromptProjection,
	MCPResourceProjection,
	MCPToolProjection,
} from '@network-engine/mcp/projection';
import { Observable } from 'rxjs';
import type { MCPRuntimeEvent } from '../events';

export interface MCPContentResult {
	content: Array<{ type: 'text'; text: string }>;
	isError?: boolean;
	structuredContent?: unknown;
}

export interface MCPResourceReadResult {
	contents: Array<{
		uri: string;
		mimeType: string;
		text?: string;
		blob?: string;
	}>;
}

export interface MCPPromptResult {
	messages: Array<{
		role: 'user' | 'assistant';
		content: { type: 'text'; text: string };
	}>;
}

export interface RuntimeResourceReadRequest {
	uri: string;
	resource: MCPResourceProjection;
}

export interface RuntimePromptRequest {
	prompt: MCPPromptProjection;
	args: Record<string, unknown>;
}

export interface RuntimeToolRequest {
	tool: MCPToolProjection;
	args: Record<string, unknown>;
}

export interface MCPRuntimeHandlers {
	readResource?: (request: RuntimeResourceReadRequest) => Promise<MCPResourceReadResult> | MCPResourceReadResult;
	renderPrompt?: (request: RuntimePromptRequest) => Promise<MCPPromptResult> | MCPPromptResult;
	executeTool?: (request: RuntimeToolRequest) => Promise<MCPContentResult> | MCPContentResult;
}

export interface MCPRuntimeServerLike {
	registerTool?: (name: string, config: Record<string, unknown>, handler: (args: unknown) => Promise<MCPContentResult>) => unknown;
	tool?: (name: string, description: string, inputSchema: unknown, handler: (args: unknown) => Promise<MCPContentResult>) => unknown;
	registerResource?: (name: string, uriOrTemplate: unknown, config: Record<string, unknown>, handler: (...args: unknown[]) => Promise<MCPResourceReadResult>) => unknown;
	resource?: (name: string, uriOrTemplate: unknown, config: Record<string, unknown>, handler: (...args: unknown[]) => Promise<MCPResourceReadResult>) => unknown;
	registerPrompt?: (name: string, config: Record<string, unknown>, handler: (args: Record<string, unknown>) => Promise<MCPPromptResult>) => unknown;
	prompt?: (name: string, description: string, argsSchema: Record<string, unknown>, handler: (args: Record<string, unknown>) => Promise<MCPPromptResult>) => unknown;
}

export interface MCPRuntimeOptions {
	projection: MCPProjectionResult;
	handlers?: MCPRuntimeHandlers;
	createResourceTemplate?: (uriTemplate: string) => unknown;
}

export interface MCPRuntime {
	readonly projection: MCPProjectionResult;
	readonly events$: Observable<MCPRuntimeEvent>;
	listResources: () => MCPResourceProjection[];
	listPrompts: () => MCPPromptProjection[];
	listTools: () => MCPToolProjection[];
	readResource: (uriTemplate: string, uri?: string) => Promise<{ text: string; mimeType?: string }>;
	getPrompt: (name: string, args?: Record<string, string>) => Promise<MCPPromptResult['messages']>;
	executeTool: (name: string, args?: Record<string, unknown>) => Promise<MCPContentResult['structuredContent'] | MCPContentResult>;
	notifyToolsListChanged: () => void;
	notifyPromptsListChanged: () => void;
	notifyResourcesListChanged: () => void;
	notifyResourceUpdated: (uri: string) => void;
	register: (server: MCPRuntimeServerLike) => void;
}
