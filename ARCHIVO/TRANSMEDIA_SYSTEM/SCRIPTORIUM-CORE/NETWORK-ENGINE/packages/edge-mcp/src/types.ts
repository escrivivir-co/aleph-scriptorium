import type { MCPProjectionResult } from '@network-engine/mcp/projection';
import type { MCPRuntime, MCPRuntimeHandlers, MCPRuntimeServerConfig } from '@network-engine/mcp-runtime';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export interface McpRouteOptions {
	projection: MCPProjectionResult;
	server: MCPRuntimeServerConfig;
	handlers?: MCPRuntimeHandlers;
	path?: string;
}

export interface McpRouteRegistration {
	runtime: MCPRuntime;
	mcpServer: McpServer;
	path: string;
}

export interface SubscriptionFilter {
	toolsListChanged?: boolean;
	promptsListChanged?: boolean;
	resourcesListChanged?: boolean;
	resourceSubscriptions?: string[];
}

export interface SubscriptionsListenRequestBody {
	jsonrpc: '2.0';
	id: string | number | null;
	method: 'subscriptions/listen';
	params: {
		notifications: SubscriptionFilter;
	};
}

