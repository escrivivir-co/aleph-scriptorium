import type {
  MCPProjectionResult,
  MCPPromptProjection,
  MCPResourceProjection,
  MCPToolProjection,
} from '@network-engine/mcp/projection';
import { Observable, Subject } from 'rxjs';
import type { MCPRuntimeEvent } from './events';

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

function now(): number {
  return Date.now();
}

function toRecord(args: unknown): Record<string, unknown> {
  return args && typeof args === 'object' && !Array.isArray(args)
    ? (args as Record<string, unknown>)
    : {};
}

function extractUri(args: readonly unknown[], fallback: string): string {
  for (const arg of args) {
    if (typeof arg === 'string') return arg;
    if (arg instanceof URL) return arg.toString();
    if (arg && typeof arg === 'object') {
      const candidate = (arg as { uri?: unknown; href?: unknown }).uri ?? (arg as { href?: unknown }).href;
      if (typeof candidate === 'string') return candidate;
    }
  }
  return fallback;
}

function defaultResourceResult(resource: MCPResourceProjection, uri: string): MCPResourceReadResult {
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

function defaultPromptResult(prompt: MCPPromptProjection): MCPPromptResult {
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

function acceptedToolResult(tool: MCPToolProjection): MCPContentResult {
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

  function registerTool(server: MCPRuntimeServerLike, tool: MCPToolProjection): void {
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
            'network-engine/effect': tool.effect,
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

  function registerResource(server: MCPRuntimeServerLike, resource: MCPResourceProjection): void {
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

  function registerPrompt(server: MCPRuntimeServerLike, prompt: MCPPromptProjection): void {
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

  async function readResource(uriTemplate: string, uri: string = uriTemplate): Promise<{ text: string; mimeType?: string }> {
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

  async function getPrompt(name: string, args: Record<string, string> = {}): Promise<MCPPromptResult['messages']> {
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

  async function executeTool(name: string, args: Record<string, unknown> = {}): Promise<MCPContentResult['structuredContent'] | MCPContentResult> {
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
    readResource,
    getPrompt,
    executeTool,
    notifyToolsListChanged,
    notifyPromptsListChanged,
    notifyResourcesListChanged,
    notifyResourceUpdated,
    register(server: MCPRuntimeServerLike): void {
      for (const resource of projection.resources) registerResource(server, resource);
      for (const prompt of projection.prompts) registerPrompt(server, prompt);
      for (const tool of projection.tools) registerTool(server, tool);
    },
  };
}