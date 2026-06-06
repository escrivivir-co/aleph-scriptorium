import { describe, expect, it } from 'bun:test';
import path from 'node:path';
import { createMCPRuntime } from '@network-engine/mcp-runtime';
import { createComposeHandlers, createComposeProjection, loadComposeStack } from './handlers';

const REPO_ROOT = path.resolve(import.meta.dirname, '../../../..');

describe('compose-lang-app handlers', () => {
  it('loads docker-compose.yml as read-only stack model without Docker', () => {
    const stack = loadComposeStack(REPO_ROOT);
    const model = stack.getModel();
    expect(model?.services.length).toBeGreaterThan(0);
    expect(model?.services.some((service) => (service.id as string) === 'mongo')).toBe(true);
    expect(stack.getPlannedOperations().some((operation) => operation.kind === 'debug')).toBe(true);
  });

  it('uses the repository root by default instead of the launcher cwd', () => {
    const originalCwd = process.cwd();
    process.chdir(path.join(REPO_ROOT, 'packages/apps'));
    try {
      const stack = loadComposeStack();
      expect(stack.getModel()?.services.some((service) => (service.id as string) === 'graphql')).toBe(true);
    } finally {
      process.chdir(originalCwd);
    }
  });

  it('projects compose://stack/* and runtime resources', () => {
    const projection = createComposeProjection(REPO_ROOT);
    expect(projection.resources.some((resource) => resource.uriTemplate.startsWith('compose://stack/'))).toBe(
      true,
    );
    expect(projection.resources.some((r) => r.uriTemplate.endsWith('/runtime'))).toBe(true);
    expect(projection.tools.some((t) => t.name === 'compose-simulate-up')).toBe(true);
    expect(projection.tools.some((t) => t.name === 'show-compose-stack')).toBe(true);
  });

  it('reads stack overview resource via handlers', async () => {
    const handlers = createComposeHandlers(REPO_ROOT);
    const projection = createComposeProjection(REPO_ROOT);
    const stackResource = projection.resources.find((r) => r.uriTemplate === 'compose://stack/network-engine');
    expect(stackResource).toBeDefined();
    const result = await handlers.readResource?.({
      uri: stackResource!.uriTemplate,
      resource: stackResource!,
    });
    expect(result?.contents[0]?.mimeType).toBe('application/json');
    const parsed = JSON.parse(result?.contents[0]?.text ?? '{}');
    expect(parsed.services.length).toBeGreaterThan(0);
  });

  it('reads operation phrases and debug plan resources via handlers', async () => {
    const handlers = createComposeHandlers(REPO_ROOT);
    const phrases = await handlers.readResource?.({
      uri: 'compose://stack/network-engine/phrases',
      resource: {
        kind: 'resource',
        uriTemplate: 'compose://stack/network-engine/phrases',
        name: 'phrases',
        description: '',
        mimeType: 'application/json',
      },
    });
    const debugPlan = await handlers.readResource?.({
      uri: 'compose://stack/network-engine/debug-plan',
      resource: {
        kind: 'resource',
        uriTemplate: 'compose://stack/network-engine/debug-plan',
        name: 'debug plan',
        description: '',
        mimeType: 'application/json',
      },
    });

    expect(JSON.parse(phrases?.contents[0]?.text ?? '[]')).toContain("stack.debug('mongo')");
    expect(JSON.parse(debugPlan?.contents[0]?.text ?? '{}').services.length).toBeGreaterThan(0);
  });

  it('simulate-up then runtime resource shows healthy mongo after ticks', async () => {
    const handlers = createComposeHandlers(REPO_ROOT);
    const projection = createComposeProjection(REPO_ROOT);
    const upTool = projection.tools.find((t) => t.name === 'compose-simulate-up');
    const tickTool = projection.tools.find((t) => t.name === 'compose-simulate-tick');
    expect(upTool).toBeDefined();
    expect(tickTool).toBeDefined();

    await handlers.executeTool?.({ tool: upTool!, args: {} });
    await handlers.executeTool?.({ tool: tickTool!, args: { ms: 25_000 } });

    const runtime = await handlers.readResource?.({
      uri: 'compose://stack/network-engine/runtime',
      resource: projection.resources.find((r) => r.uriTemplate.endsWith('/runtime'))!,
    });
    const parsed = JSON.parse(runtime?.contents[0]?.text ?? '{}');
    expect(parsed.serviceStates.mongo).toBe('healthy');
  });

  it('integration: MCP runtime executeTool then readResource runtime', async () => {
    const projection = createComposeProjection(REPO_ROOT);
    const handlers = createComposeHandlers(REPO_ROOT);
    const runtime = createMCPRuntime({ projection, handlers });

    await runtime.executeTool('compose-simulate-up');
    await runtime.executeTool('compose-simulate-tick', { ms: 25_000 });

    const resource = await runtime.readResource('compose://stack/network-engine/runtime');
    const state = JSON.parse(resource.text);
    expect(state.serviceStates.mongo).toBe('healthy');
  });

  it('launcher returns structured snapshot for MCP App', async () => {
    const handlers = createComposeHandlers(REPO_ROOT);
    const projection = createComposeProjection(REPO_ROOT);
    const launcher = projection.tools.find((t) => t.name === 'show-compose-stack');
    const result = await handlers.executeTool?.({ tool: launcher!, args: {} });
    const structured = result?.structuredContent as { stackId: string; services: unknown[] };
    expect(structured.stackId).toBe('network-engine');
    expect(structured.services.length).toBeGreaterThan(0);
  });

  it('simulation tools return MCP App snapshots after mutating the twin', async () => {
    const handlers = createComposeHandlers(REPO_ROOT);
    const projection = createComposeProjection(REPO_ROOT);
    const upTool = projection.tools.find((t) => t.name === 'compose-simulate-up');
    const result = await handlers.executeTool?.({ tool: upTool!, args: {} });
    const structured = result?.structuredContent as {
      stackId: string;
      services: Array<{ id: string; state: string }>;
      result: unknown;
    };

    expect(structured.stackId).toBe('network-engine');
    expect(structured.services.some((service) => service.id === 'mongo' && service.state === 'starting')).toBe(
      true,
    );
    expect(structured.result).toBeDefined();
  });
});
