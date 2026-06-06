import { describe, expect, it } from 'bun:test';
import { firstValueFrom, take, toArray } from 'rxjs';
import type { MCPProjectionResult } from '@network-engine/mcp/projection';
import { createActorToolHandler } from './actor-bridge';
import { createMCPRuntime, type MCPRuntimeServerLike } from './runtime';

class FakeServer implements MCPRuntimeServerLike {
  tools = new Map<string, (args: unknown) => Promise<unknown>>();
  resources = new Map<string, (...args: unknown[]) => Promise<unknown>>();
  prompts = new Map<string, (args: Record<string, unknown>) => Promise<unknown>>();

  registerTool(name: string, _config: Record<string, unknown>, handler: (args: unknown) => Promise<unknown>): void {
    this.tools.set(name, handler);
  }

  registerResource(name: string, _uriOrTemplate: unknown, _config: Record<string, unknown>, handler: (...args: unknown[]) => Promise<unknown>): void {
    this.resources.set(name, handler);
  }

  registerPrompt(name: string, _config: Record<string, unknown>, handler: (args: Record<string, unknown>) => Promise<unknown>): void {
    this.prompts.set(name, handler);
  }
}

function projection(): MCPProjectionResult {
  return {
    resources: [
      {
        kind: 'resource',
        uriTemplate: 'network://palettes',
        name: 'Palettes Collection',
        description: 'Palettes read model',
        mimeType: 'application/json',
      },
    ],
    prompts: [
      {
        name: 'design-palette',
        description: 'Design Palette',
        goal: 'Design a palette from intent.',
        arguments: [],
        requiresResources: ['network://palettes'],
        outputs: ['PaletteDesignProposal'],
        recommendedSampling: ['critique-palette'],
        permittedMutations: ['persist_palette'],
      },
    ],
    tools: [
      {
        name: 'persist_palette',
        description: 'Persist palette',
        inputSchema: { type: 'object' },
        effect: 'upsert',
        requiresConfirmation: false,
        idempotent: false,
        externalEffects: ['storage'],
      },
    ],
    sampling: [],
  };
}

describe('createMCPRuntime', () => {
  it('registers projected resources, prompts, and tools', () => {
    const server = new FakeServer();
    const runtime = createMCPRuntime({ projection: projection() });

    runtime.register(server);

    expect(server.resources.has('Palettes Collection')).toBe(true);
    expect(server.prompts.has('design-palette')).toBe(true);
    expect(server.tools.has('persist_palette')).toBe(true);
  });

  it('emits runtime events when MCP entries are used', async () => {
    const server = new FakeServer();
    const runtime = createMCPRuntime({ projection: projection() });
    const eventsPromise = firstValueFrom(runtime.events$.pipe(take(3), toArray()));

    runtime.register(server);

    await server.resources.get('Palettes Collection')?.({ uri: 'network://palettes' });
    await server.prompts.get('design-palette')?.({ intent: 'new palette' });
    await server.tools.get('persist_palette')?.({ name: 'demo' });

    const events = await eventsPromise;
    expect(events.map((event) => event.type)).toEqual([
      'MCP_RESOURCE_READ_REQUESTED',
      'MCP_PROMPT_REQUESTED',
      'MCP_MUTATION_CAPABILITY_REQUESTED',
    ]);
  });

  it('can bridge mutation capabilities into an actor-like sink', async () => {
    const accepted: unknown[] = [];
    const server = new FakeServer();
    const runtime = createMCPRuntime({
      projection: projection(),
      handlers: {
        executeTool: createActorToolHandler(
          { send: (event) => accepted.push(event) },
          ({ tool, args }) => ({ type: 'MCP_MUTATION_CAPABILITY_REQUESTED', toolName: tool.name, args }),
        ),
      },
    });

    runtime.register(server);
    await server.tools.get('persist_palette')?.({ name: 'demo' });

    expect(accepted).toEqual([
      {
        type: 'MCP_MUTATION_CAPABILITY_REQUESTED',
        toolName: 'persist_palette',
        args: { name: 'demo' },
      },
    ]);
  });

  it('emits explicit notification events for list changes and resource updates', async () => {
    const runtime = createMCPRuntime({ projection: projection() });
    const eventsPromise = firstValueFrom(runtime.events$.pipe(take(4), toArray()));

    runtime.notifyToolsListChanged();
    runtime.notifyPromptsListChanged();
    runtime.notifyResourcesListChanged();
    runtime.notifyResourceUpdated('network://palettes/demo');

    const events = await eventsPromise;
    expect(events.map((event) => event.type)).toEqual([
      'MCP_TOOLS_LIST_CHANGED',
      'MCP_PROMPTS_LIST_CHANGED',
      'MCP_RESOURCES_LIST_CHANGED',
      'MCP_RESOURCE_UPDATED',
    ]);
    expect(events[3]).toMatchObject({ uri: 'network://palettes/demo' });
  });

  it('registers launcher tools with MCP Apps UI metadata', () => {
    const configs: Record<string, unknown>[] = [];
    const server: MCPRuntimeServerLike = {
      registerTool(_name, config) {
        configs.push(config);
      },
    };

    const runtime = createMCPRuntime({
      projection: {
        resources: [],
        prompts: [],
        tools: [
          {
            name: 'show-aleph-os',
            description: 'Open UI',
            inputSchema: { type: 'object' },
            effect: 'custom',
            requiresConfirmation: false,
            idempotent: true,
            externalEffects: [],
            launcher: true,
            ui: { resourceUri: 'ui://aleph-os/mcp-app.html' },
          },
        ],
        sampling: [],
      },
    });

    runtime.register(server);

    expect(configs[0]).toMatchObject({
      _meta: {
        ui: { resourceUri: 'ui://aleph-os/mcp-app.html' },
        'network-engine/launcher': true,
      },
    });
  });
});