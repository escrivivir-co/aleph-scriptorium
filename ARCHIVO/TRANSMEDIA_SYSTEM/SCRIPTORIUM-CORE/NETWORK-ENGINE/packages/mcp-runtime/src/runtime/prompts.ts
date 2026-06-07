import type { MCPPromptProjection } from '@network-engine/mcp/projection';
import type { Subject } from 'rxjs';
import type { MCPRuntimeEvent } from '../events';
import type { MCPPromptResult, MCPRuntimeHandlers, MCPRuntimeServerLike } from './types';
import { now } from './utils';

export function defaultPromptResult(prompt: MCPPromptProjection): MCPPromptResult {
	const context = prompt.requiresResources.length > 0
		? `\n\nContext resources:\n${prompt.requiresResources.map((uri) => `- ${uri}`).join('\n')}`
		: '';
	const sampling = prompt.recommendedSampling.length > 0
		? `\n\nRecommended sampling protocols:\n${prompt.recommendedSampling.map((name) => `- ${name}`).join('\n')}`
		: '';

	return {
		messages: [
			{
				role: 'user',
				content: {
					type: 'text',
					text: `${prompt.goal || prompt.description}${context}${sampling}`,
				},
			},
		],
	};
}

export function registerPrompt(
	server: MCPRuntimeServerLike,
	prompt: MCPPromptProjection,
	handlers: MCPRuntimeHandlers,
	events: Subject<MCPRuntimeEvent>
): void {
	const argsSchema = Object.fromEntries(
		prompt.arguments.map((arg) => [arg.name, { description: arg.description, required: arg.required }]),
	);
	const handler = async (args: Record<string, unknown>): Promise<MCPPromptResult> => {
		events.next({
			type: 'MCP_PROMPT_REQUESTED',
			promptName: prompt.name,
			args,
			prompt,
			timestamp: now(),
		});
		return handlers.renderPrompt
			? await handlers.renderPrompt({ prompt, args })
			: defaultPromptResult(prompt);
	};

	if (server.registerPrompt) {
		server.registerPrompt(prompt.name, { description: prompt.description, argsSchema }, handler);
		return;
	}

	server.prompt?.(prompt.name, prompt.description, argsSchema, handler);
}

export async function getPrompt(
	name: string,
	promptMap: Map<string, MCPPromptProjection>,
	handlers: MCPRuntimeHandlers,
	events: Subject<MCPRuntimeEvent>,
	args: Record<string, string> = {}
): Promise<MCPPromptResult['messages']> {
	const prompt = promptMap.get(name);
	if (!prompt) {
		throw new Error(`Unknown MCP prompt: ${name}`);
	}

	const normalizedArgs = args as Record<string, unknown>;
	events.next({
		type: 'MCP_PROMPT_REQUESTED',
		promptName: prompt.name,
		args: normalizedArgs,
		prompt,
		timestamp: now(),
	});

	const result = handlers.renderPrompt
		? await handlers.renderPrompt({ prompt, args: normalizedArgs })
		: defaultPromptResult(prompt);

	return result.messages;
}
