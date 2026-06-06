import { createNetworkEngine } from '@network-engine/network-engine';
import { defineDomainContract } from '@network-engine/core';
import { composeMachine } from './machine';
import { parseComposeYaml } from './parser';
import { getRuntimeSnapshot } from './simulator';
import {
  ComposeContext,
  ComposeOperationKind,
  ComposeOperationPlan,
  ComposeSemantics,
  ComposeService,
  ComposeStackModel,
  ServiceId,
  createServiceId,
} from './types';

export class ComposeStack {
  private engine = createNetworkEngine<ComposeSemantics>(composeMachine).orchestrator;

  public static fromYaml(yamlText: string, stackName: string): ComposeStack {
    const stack = parseComposeYaml(yamlText, stackName);
    const instance = new ComposeStack();
    instance.load(stack);
    return instance;
  }

  public static fromModel(stack: ComposeStackModel): ComposeStack {
    const instance = new ComposeStack();
    instance.load(stack);
    return instance;
  }

  public get orchestrator() {
    return this.engine;
  }

  public getContext(): ComposeContext {
    return this.engine.currentState.context;
  }

  public load(stack: ComposeStackModel): this {
    this.engine.dispatch({
      type: 'LOAD_STACK',
      payload: { stack },
      timestamp: Date.now(),
    });
    return this;
  }

  public listServices(): ComposeService[] {
    return this.engine.currentState.context.stack?.services ?? [];
  }

  public inspectService(serviceId: string | ServiceId): this {
    this.engine.dispatch({
      type: 'INSPECT_SERVICE',
      payload: { serviceId: createServiceId(String(serviceId)) },
      timestamp: Date.now(),
    });
    return this;
  }

  public getModel(): ComposeStackModel | undefined {
    return this.engine.currentState.context.stack;
  }

  public getFocusedService(): ComposeService | undefined {
    const stack = this.engine.currentState.context.stack;
    const focused = this.engine.currentState.context.focusedServiceId;
    if (!stack || !focused) return undefined;
    const services: ComposeService[] = stack.services;
    return services.find((entry) => entry.id === focused);
  }

  public setupConfig(): this {
    this.requireLoadedStack();
    return this.plan('setup-config', {
      phrase: 'stack.setup().validateConfig()',
      description: 'Model docker compose config validation without executing docker compose.',
    });
  }

  public run(serviceId: string | ServiceId): this {
    this.requireLoadedStack();
    const id = createServiceId(String(serviceId));
    return this.plan('run', {
      serviceId: id,
      phrase: `stack.run('${id as string}').waitUntilHealthy()`,
      description: `Plan a read-only run sequence for service ${id as string}.`,
    });
  }

  public sleep(serviceId: string | ServiceId): this {
    this.requireLoadedStack();
    const id = createServiceId(String(serviceId));
    return this.plan('sleep', {
      serviceId: id,
      phrase: `stack.sleep('${id as string}')`,
      description: `Plan a read-only stop/sleep sequence for service ${id as string}.`,
    });
  }

  public logs(serviceId: string | ServiceId, tail = 50): this {
    this.requireLoadedStack();
    const id = createServiceId(String(serviceId));
    return this.plan('logs', {
      serviceId: id,
      phrase: `stack.logs('${id as string}').tail(${tail})`,
      description: `Plan a read-only log inspection for service ${id as string}.`,
    });
  }

  public debug(serviceId: string | ServiceId): this {
    this.requireLoadedStack();
    const id = createServiceId(String(serviceId));
    return this.plan('debug', {
      serviceId: id,
      phrase: `stack.debug('${id as string}')`,
      description: `Plan a read-only diagnostic flow for service ${id as string}.`,
    });
  }

  public simulate(): {
    up: () => ComposeStack;
    down: () => ComposeStack;
    tick: (ms: number) => ComposeStack;
    reset: () => ComposeStack;
  } {
    return {
      up: () => this.simulateUp(),
      down: () => this.simulateDown(),
      tick: (ms: number) => this.simulateTick(ms),
      reset: () => this.simulateReset(),
    };
  }

  public predict(): {
    failure: (serviceId: string | ServiceId) => ComposeStack;
  } {
    return {
      failure: (serviceId: string | ServiceId) => this.predictFailure(serviceId),
    };
  }

  public simulateUp(): this {
    this.engine.dispatch({ type: 'SIMULATE_UP', payload: {}, timestamp: Date.now() });
    return this;
  }

  public simulateDown(): this {
    this.engine.dispatch({ type: 'SIMULATE_DOWN', payload: {}, timestamp: Date.now() });
    return this;
  }

  public simulateUpService(serviceId: string | ServiceId): this {
    this.engine.dispatch({
      type: 'SIMULATE_START_SERVICE',
      payload: { serviceId: createServiceId(String(serviceId)) },
      timestamp: Date.now(),
    });
    return this;
  }

  public simulateDownService(serviceId: string | ServiceId): this {
    this.engine.dispatch({
      type: 'SIMULATE_STOP_SERVICE',
      payload: { serviceId: createServiceId(String(serviceId)) },
      timestamp: Date.now(),
    });
    return this;
  }

  public simulateTick(ms: number): this {
    this.engine.dispatch({ type: 'SIMULATE_TICK', payload: { ms }, timestamp: Date.now() });
    return this;
  }

  public predictFailure(serviceId: string | ServiceId): this {
    this.engine.dispatch({
      type: 'SIMULATE_INJECT_FAILURE',
      payload: { serviceId: createServiceId(String(serviceId)) },
      timestamp: Date.now(),
    });
    return this;
  }

  public simulateReset(): this {
    this.engine.dispatch({ type: 'SIMULATE_RESET', payload: {}, timestamp: Date.now() });
    return this;
  }

  public getPlannedOperations(): ComposeOperationPlan[] {
    return this.engine.currentState.context.plannedOperations;
  }

  public getRuntimeSnapshot() {
    return getRuntimeSnapshot(this.getContext());
  }

  public toProjection() {
    const stack = this.getModel();
    if (!stack) return { resources: [] as string[] };
    const stackId = stack.id as string;
    return {
      resources: [
        `compose://stack/${stackId}`,
        `compose://stack/${stackId}/services`,
        `compose://stack/${stackId}/operations`,
        `compose://stack/${stackId}/phrases`,
        `compose://stack/${stackId}/debug-plan`,
        `compose://stack/${stackId}/runtime`,
        `compose://stack/${stackId}/runtime/timeline`,
        ...stack.services.map((entry) => `compose://stack/${stackId}/services/${entry.id as string}`),
        ...stack.services.map(
          (entry) => `compose://stack/${stackId}/runtime/services/${entry.id as string}`,
        ),
      ],
    };
  }

  private plan(
    kind: ComposeOperationKind,
    input: Omit<ComposeOperationPlan, 'kind' | 'readonly'>,
  ): this {
    const plan: ComposeOperationPlan = {
      kind,
      readonly: true,
      ...input,
    };
    this.engine.dispatch({
      type: 'PLAN_OPERATION',
      payload: { plan },
      timestamp: Date.now(),
    });
    return this;
  }

  private requireLoadedStack(): ComposeStackModel {
    const stack = this.getModel();
    if (!stack) throw new Error('[compose-lang] Cannot plan operations before loading a stack');
    return stack;
  }
}

export function createComposeContract(stack: ComposeStackModel) {
  const stackId = stack.id as string;
  const serviceResources = Object.fromEntries(
    stack.services.map((service) => {
      const serviceId = service.id as string;
      return [
        `service_${serviceId}`,
        {
          kind: 'resource' as const,
          uriTemplate: `compose://stack/${stackId}/services/${serviceId}`,
          name: `Service ${serviceId}`,
          description: `Read-only detail for compose service ${serviceId}`,
          mimeType: 'application/json',
        },
      ];
    }),
  );

  const runtimeServiceResources = Object.fromEntries(
    stack.services.map((service) => {
      const serviceId = service.id as string;
      return [
        `runtime_${serviceId}`,
        {
          kind: 'resource' as const,
          uriTemplate: `compose://stack/${stackId}/runtime/services/${serviceId}`,
          name: `Runtime ${serviceId}`,
          description: `Simulated runtime state for service ${serviceId}`,
          mimeType: 'application/json',
        },
      ];
    }),
  );

  return defineDomainContract({
    kind: 'compose-stack',
    version: '1.0.0',
    display: { singular: 'Compose Stack', plural: 'Compose Stacks' },
    schema: { type: 'object' },
    identity: { resourceScheme: 'compose' },
    resources: {
      overview: {
        kind: 'resource',
        uriTemplate: `compose://stack/${stackId}`,
        name: `Stack ${stackId}`,
        description: 'Read-only snapshot of the compose stack model',
        mimeType: 'application/json',
      },
      services: {
        kind: 'resource',
        uriTemplate: `compose://stack/${stackId}/services`,
        name: `Stack ${stackId} Services`,
        description: 'Service index for the compose stack',
        mimeType: 'application/json',
      },
      operations: {
        kind: 'resource',
        uriTemplate: `compose://stack/${stackId}/operations`,
        name: `Stack ${stackId} Operation Plans`,
        description: 'Read-only operation plans for setup, run, sleep, logs, and debug',
        mimeType: 'application/json',
      },
      phrases: {
        kind: 'resource',
        uriTemplate: `compose://stack/${stackId}/phrases`,
        name: `Stack ${stackId} DSL Phrases`,
        description: 'Human-readable Compose-Lang phrases derived from the stack model',
        mimeType: 'application/json',
      },
      debugPlan: {
        kind: 'resource',
        uriTemplate: `compose://stack/${stackId}/debug-plan`,
        name: `Stack ${stackId} Debug Plan`,
        description: 'Read-only diagnostic plan derived from services, ports, dependencies and healthchecks',
        mimeType: 'application/json',
      },
      runtime: {
        kind: 'resource',
        uriTemplate: `compose://stack/${stackId}/runtime`,
        name: `Stack ${stackId} Runtime`,
        description: 'Digital twin simulated runtime snapshot',
        mimeType: 'application/json',
      },
      runtimeTimeline: {
        kind: 'resource',
        uriTemplate: `compose://stack/${stackId}/runtime/timeline`,
        name: `Stack ${stackId} Runtime Timeline`,
        description: 'History of simulated service state transitions',
        mimeType: 'application/json',
      },
      ui: {
        kind: 'resource',
        uriTemplate: 'ui://compose-lang/mcp-app.html',
        name: 'Compose Stack UI',
        description: 'Interactive digital twin MCP App',
        mimeType: 'text/html;profile=mcp-app',
      },
      ...serviceResources,
      ...runtimeServiceResources,
    },
    prompts: {
      diagnose: {
        name: 'diagnose-compose-stack',
        description: 'Diagnose service dependencies and port bindings without executing Docker',
        requiresResources: [`compose://stack/${stackId}`],
        goal: 'Surface dependency cycles, missing images, and exposed ports',
      },
    },
    mutations: {
      simulateUp: {
        name: 'compose-simulate-up',
        description: 'Start the digital twin stack respecting depends_on order (simulated, no Docker)',
        effect: 'custom',
        idempotent: false,
        externalEffects: [],
        inputSchema: { type: 'object', properties: {} },
      },
      simulateDown: {
        name: 'compose-simulate-down',
        description: 'Stop all services in the digital twin (simulated)',
        effect: 'custom',
        idempotent: false,
        externalEffects: [],
        inputSchema: { type: 'object', properties: {} },
      },
      simulateTick: {
        name: 'compose-simulate-tick',
        description: 'Advance the virtual clock and evaluate healthchecks',
        effect: 'custom',
        idempotent: true,
        externalEffects: [],
        inputSchema: {
          type: 'object',
          properties: { ms: { type: 'number', minimum: 0 } },
          required: ['ms'],
        },
      },
      simulateInjectFailure: {
        name: 'compose-simulate-inject-failure',
        description: 'Force a service into failed state and propagate to dependents',
        effect: 'custom',
        idempotent: false,
        externalEffects: [],
        inputSchema: {
          type: 'object',
          properties: { serviceId: { type: 'string' } },
          required: ['serviceId'],
        },
      },
      simulateReset: {
        name: 'compose-simulate-reset',
        description: 'Reset the digital twin to initial defined state',
        effect: 'custom',
        idempotent: true,
        externalEffects: [],
        inputSchema: { type: 'object', properties: {} },
      },
    },
    launchers: {
      show: {
        name: 'show-compose-stack',
        description: 'Open the Compose Stack digital twin MCP App',
        uiResource: 'ui://compose-lang/mcp-app.html',
        inputSchema: { type: 'object', properties: {} },
      },
    },
    sampling: {},
  });
}
