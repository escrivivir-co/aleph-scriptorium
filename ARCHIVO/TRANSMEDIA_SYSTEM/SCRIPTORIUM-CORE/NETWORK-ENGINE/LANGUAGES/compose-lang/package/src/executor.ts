import type { ComposeStack } from './stack';
import {
  Execution,
  ExecutionMode,
  ExecutionResult,
  LogLine,
  ServiceId,
  createServiceId,
} from './types';
import { getRuntimeSnapshot } from './simulator';

export interface ComposeExecutor<Mode extends ExecutionMode> {
  readonly mode: Mode;
  readonly externalEffects: readonly string[];
  up(serviceId?: ServiceId): Promise<ExecutionResult<Mode>>;
  down(serviceId?: ServiceId): Promise<ExecutionResult<Mode>>;
  tick(ms: number): Promise<ExecutionResult<Mode>>;
  injectFailure(serviceId: ServiceId): Promise<ExecutionResult<Mode>>;
  reset(): Promise<ExecutionResult<Mode>>;
  logs(serviceId: ServiceId, tail: number): AsyncIterable<LogLine>;
}

export type ExecutorFactory = (stack: ComposeStack) => ComposeExecutor<ExecutionMode>;

function snapshotResult<Mode extends ExecutionMode>(
  mode: Mode,
  stack: ComposeStack,
): ExecutionResult<Mode> {
  const runtime = getRuntimeSnapshot(stack.getContext());
  return {
    mode,
    virtualClockMs: runtime.virtualClockMs,
    serviceStates: runtime.serviceStates,
  };
}

export function createSimulatedExecutor(stack: ComposeStack): ComposeExecutor<'simulated'> {
  return {
    mode: 'simulated',
    externalEffects: [],

    async up(serviceId?: ServiceId) {
      if (serviceId) {
        stack.simulateUpService(serviceId);
      } else {
        stack.simulateUp();
      }
      return snapshotResult('simulated', stack);
    },

    async down(serviceId?: ServiceId) {
      if (serviceId) {
        stack.simulateDownService(serviceId);
      } else {
        stack.simulateDown();
      }
      return snapshotResult('simulated', stack);
    },

    async tick(ms: number) {
      stack.simulateTick(ms);
      return snapshotResult('simulated', stack);
    },

    async injectFailure(serviceId: ServiceId) {
      stack.predictFailure(serviceId);
      return snapshotResult('simulated', stack);
    },

    async reset() {
      stack.simulateReset();
      return snapshotResult('simulated', stack);
    },

    async *logs(serviceId: ServiceId, tail: number): AsyncIterable<LogLine> {
      const ctx = stack.getContext();
      const state = ctx.serviceStates[serviceId as string] ?? 'defined';
      const lines = [
        `[simulated] ${serviceId as string} state=${state} clock=${ctx.virtualClockMs}ms`,
        `[simulated] tail=${tail} (no real container logs in simulated mode)`,
      ];
      for (const text of lines.slice(-tail)) {
        yield { serviceId, text, at: ctx.virtualClockMs };
      }
    },
  };
}

export function createExecution<Mode extends ExecutionMode>(
  mode: Mode,
  executor: ComposeExecutor<Mode>,
): Execution<Mode> & { executor: ComposeExecutor<Mode> } {
  return { __mode: mode, executor };
}

export function runSimulated(stack: ComposeStack, fn: (ctx: Execution<'simulated'>) => Promise<void>) {
  const execution = createExecution('simulated', createSimulatedExecutor(stack));
  return fn(execution);
}

export const executorRegistry = {
  simulated: createSimulatedExecutor,
} as const satisfies Record<string, ExecutorFactory>;

export function createExecutor(
  mode: keyof typeof executorRegistry,
  stack: ComposeStack,
): ComposeExecutor<ExecutionMode> {
  return executorRegistry[mode](stack);
}

export function createLiveExecutor(_stack: ComposeStack): never {
  throw new Error(
    '[compose-lang] LiveExecutor is dossier-only in v1. Use createSimulatedExecutor instead.',
  );
}

export { createServiceId };
