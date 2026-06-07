import type { MCPContentResult, RuntimeToolRequest } from './runtime/index';

export interface ActorSink<TEvent> {
	send: (event: TEvent) => void;
}

export interface ActorBridgeOptions {
	acceptedMessage?: string;
}

export function createActorToolHandler<TEvent extends { type: string }>(
	actor: ActorSink<TEvent>,
	mapRequest: (request: RuntimeToolRequest) => TEvent,
	options: ActorBridgeOptions = {},
): (request: RuntimeToolRequest) => MCPContentResult {
	return (request) => {
		const event = mapRequest(request);
		actor.send(event);
		return {
			content: [
				{
					type: 'text',
					text: options.acceptedMessage ?? `Actor event accepted: ${event.type}`,
				},
			],
			structuredContent: {
				accepted: true,
				event,
				toolName: request.tool.name,
			},
		};
	};
}