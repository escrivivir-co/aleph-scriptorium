import { describe, expect, it } from 'bun:test';
import { createSimulatedExecutor, executorRegistry } from './executor';
import { ComposeStack } from './stack';

const SAMPLE = `
services:
  mongo:
    image: mongo:7
`;

describe('compose-lang executor', () => {
  it('exposes simulated executor with no external effects', () => {
    const stack = ComposeStack.fromYaml(SAMPLE, 'test');
    const executor = createSimulatedExecutor(stack);
    expect(executor.mode).toBe('simulated');
    expect(executor.externalEffects).toEqual([]);
  });

  it('registry satisfies executor factory contract', () => {
    expect(typeof executorRegistry.simulated).toBe('function');
  });

  it('ticks virtual clock via executor', async () => {
    const stack = ComposeStack.fromYaml(SAMPLE, 'test');
    const executor = createSimulatedExecutor(stack);
    await executor.up();
    const result = await executor.tick(1000);
    expect(result.virtualClockMs).toBe(1000);
  });
});
