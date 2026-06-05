import type {
  MCPPromptProjection,
  MCPResourceProjection,
  MCPToolProjection,
} from '@network-engine/mcp/projection';

export type MCPRuntimeEvent =
  | {
      type: 'MCP_RESOURCE_READ_REQUESTED';
      uri: string;
      resource: MCPResourceProjection;
      timestamp: number;
    }
  | {
      type: 'MCP_PROMPT_REQUESTED';
      promptName: string;
      args: Record<string, unknown>;
      prompt: MCPPromptProjection;
      timestamp: number;
    }
  | {
      type: 'MCP_MUTATION_CAPABILITY_REQUESTED';
      toolName: string;
      args: Record<string, unknown>;
      tool: MCPToolProjection;
      timestamp: number;
    }
  | {
      type: 'MCP_MUTATION_CAPABILITY_COMPLETED';
      toolName: string;
      result: unknown;
      timestamp: number;
    }
  | {
      type: 'MCP_MUTATION_CAPABILITY_FAILED';
      toolName: string;
      error: string;
      timestamp: number;
    }
  | {
      type: 'MCP_TOOLS_LIST_CHANGED';
      timestamp: number;
    }
  | {
      type: 'MCP_PROMPTS_LIST_CHANGED';
      timestamp: number;
    }
  | {
      type: 'MCP_RESOURCES_LIST_CHANGED';
      timestamp: number;
    }
  | {
      type: 'MCP_RESOURCE_UPDATED';
      uri: string;
      timestamp: number;
    };

export type MCPActorEvent = Extract<
  MCPRuntimeEvent,
  { type: 'MCP_MUTATION_CAPABILITY_REQUESTED' }
>;