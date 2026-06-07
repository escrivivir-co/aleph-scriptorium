import type { MCPResourceProjection } from '@network-engine/mcp/projection';
import type { Subject } from 'rxjs';
import type { MCPRuntimeEvent } from '../events';
import type { MCPResourceReadResult, MCPRuntimeHandlers, MCPRuntimeServerLike } from './types';
import { extractUri, now } from './utils';

export function defaultResourceResult(resource: MCPResourceProjection, uri: string): MCPResourceReadResult {
	return {
		contents: [
			{
				uri,
				mimeType: resource.mimeType,
				text: JSON.stringify(
					{
						uri,
						name: resource.name,
						description: resource.description,
						kind: resource.kind,
					},
					null,
					2,
				),
			},
		],
	};
}

export function registerResource(
	server: MCPRuntimeServerLike,
	resource: MCPResourceProjection,
	handlers: MCPRuntimeHandlers,
	events: Subject<MCPRuntimeEvent>,
	createResourceTemplate?: (uriTemplate: string) => unknown
): void {
	const uriOrTemplate = resource.kind === 'template' && createResourceTemplate
		? createResourceTemplate(resource.uriTemplate)
		: resource.uriTemplate;

	const handler = async (...args: unknown[]): Promise<MCPResourceReadResult> => {
		const uri = extractUri(args, resource.uriTemplate);
		events.next({
			type: 'MCP_RESOURCE_READ_REQUESTED',
			uri,
			resource,
			timestamp: now(),
		});
		return handlers.readResource
			? await handlers.readResource({ resource, uri })
			: defaultResourceResult(resource, uri);
	};

	const config = {
		description: resource.description,
		mimeType: resource.mimeType,
	};

	if (server.registerResource) {
		server.registerResource(resource.name, uriOrTemplate, config, handler);
		return;
	}

	server.resource?.(resource.name, uriOrTemplate, config, handler);
}

export async function readResource(
	uriTemplate: string,
	resourceMap: Map<string, MCPResourceProjection>,
	handlers: MCPRuntimeHandlers,
	events: Subject<MCPRuntimeEvent>,
	uri: string = uriTemplate
): Promise<{ text: string; mimeType?: string }> {
	const resource = resourceMap.get(uriTemplate);
	if (!resource) {
		throw new Error(`Unknown MCP resource: ${uriTemplate}`);
	}

	events.next({
		type: 'MCP_RESOURCE_READ_REQUESTED',
		uri,
		resource,
		timestamp: now(),
	});

	const result = handlers.readResource
		? await handlers.readResource({ resource, uri })
		: defaultResourceResult(resource, uri);

	const mimeType = result.contents[0]?.mimeType;
	return mimeType
		? {
			text: result.contents[0]?.text ?? '',
			mimeType,
		}
		: {
			text: result.contents[0]?.text ?? '',
		};
}
