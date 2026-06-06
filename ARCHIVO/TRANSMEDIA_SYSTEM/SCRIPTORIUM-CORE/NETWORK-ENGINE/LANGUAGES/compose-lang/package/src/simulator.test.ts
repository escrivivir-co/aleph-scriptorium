import { describe, expect, it } from 'bun:test';
import { parseComposeYaml } from './parser';
import { ComposeStack } from './stack';
import {
  createInitialRuntime,
  injectFailure,
  parseDurationMs,
  propagateFailure,
  simulateTick,
  simulateUp,
  topologicalOrder,
} from './simulator';
import { ComposeContext, createServiceId } from './types';

const SAMPLE = `
services:
  mongo:
    image: mongo:7
    healthcheck:
      test: echo ok
      interval: 1s
      retries: 1
  graphql:
    build: .
    depends_on:
      mongo:
        condition: service_healthy
`;

describe('compose-lang simulator', () => {
  it('parses duration strings', () => {
    expect(parseDurationMs('10s', 0)).toBe(10_000);
    expect(parseDurationMs('500ms', 0)).toBe(500);
  });

  it('orders services by depends_on', () => {
    const model = parseComposeYaml(SAMPLE, 'test');
    const order = topologicalOrder(model.services).map((id) => id as string);
    expect(order.indexOf('mongo')).toBeLessThan(order.indexOf('graphql'));
  });

  it('starts independent services on simulate up', () => {
    const model = parseComposeYaml(SAMPLE, 'test');
    let ctx: ComposeContext = {
      stack: model,
      plannedOperations: [],
      ...createInitialRuntime(model),
    };
    ctx = simulateUp(ctx);
    expect(ctx.serviceStates.mongo).toBe('starting');
    expect(ctx.serviceStates.graphql).toBe('defined');
  });

  it('respects depends_on before starting dependents', () => {
    const stack = ComposeStack.fromYaml(SAMPLE, 'test');
    stack.simulateUp();
    stack.simulateTick(1500);
    const runtime = stack.getRuntimeSnapshot();
    expect(runtime.serviceStates.mongo).toBe('healthy');
    expect(runtime.serviceStates.graphql).toBe('starting');
  });

  it('propagates injected failure to dependents', () => {
    const model = parseComposeYaml(SAMPLE, 'test');
    let ctx: ComposeContext = {
      stack: model,
      plannedOperations: [],
      ...createInitialRuntime(model),
    };
    ctx = simulateUp(ctx);
    ctx = simulateTick(ctx, 2500);
    ctx = injectFailure(ctx, createServiceId('mongo'));
    ctx = propagateFailure(ctx);
    expect(ctx.serviceStates.mongo).toBe('failed');
    expect(ctx.serviceStates.graphql).toBe('failed');
  });

  it('records timeline transitions', () => {
    const stack = ComposeStack.fromYaml(SAMPLE, 'test');
    stack.simulateUp();
    expect(stack.getRuntimeSnapshot().timeline.length).toBeGreaterThan(0);
  });
});
