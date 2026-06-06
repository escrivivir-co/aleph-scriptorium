import type {
  ComposeContext,
  ComposeService,
  ComposeStackModel,
  RuntimeTransition,
  ServiceId,
  ServiceRuntimeState,
} from './types';

const START_DELAY_MS = 500;
const STOP_DELAY_MS = 300;
const DEFAULT_RETRIES = 3;
const DEFAULT_INTERVAL_MS = 10_000;

export function parseDurationMs(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const match = raw.trim().match(/^(\d+(?:\.\d+)?)(ms|s|m)$/);
  if (!match) return fallback;
  const value = Number(match[1]);
  switch (match[2]) {
    case 'ms':
      return value;
    case 's':
      return value * 1000;
    case 'm':
      return value * 60_000;
    default:
      return fallback;
  }
}

export function createInitialRuntime(stack: ComposeStackModel): Pick<
  ComposeContext,
  | 'serviceStates'
  | 'serviceStartedAt'
  | 'healthcheckAttempts'
  | 'virtualClockMs'
  | 'predictedFailures'
  | 'timeline'
  | 'simulationActive'
> {
  const serviceStates: Record<string, ServiceRuntimeState> = {};
  for (const service of stack.services) {
    serviceStates[service.id as string] = 'defined';
  }
  return {
    serviceStates,
    serviceStartedAt: {},
    healthcheckAttempts: {},
    virtualClockMs: 0,
    predictedFailures: [],
    timeline: [],
    simulationActive: false,
  };
}

function recordTransition(
  timeline: RuntimeTransition[],
  at: number,
  serviceId: ServiceId,
  from: ServiceRuntimeState,
  to: ServiceRuntimeState,
  cause: string,
): RuntimeTransition[] {
  return [...timeline, { at, serviceId, from, to, cause }];
}

function setServiceState(
  ctx: ComposeContext,
  serviceId: ServiceId,
  to: ServiceRuntimeState,
  cause: string,
): ComposeContext {
  const key = serviceId as string;
  const from = ctx.serviceStates[key] ?? 'defined';
  if (from === to) return ctx;
  return {
    ...ctx,
    serviceStates: { ...ctx.serviceStates, [key]: to },
    timeline: recordTransition(ctx.timeline, ctx.virtualClockMs, serviceId, from, to, cause),
  };
}

function depsHealthy(ctx: ComposeContext, service: ComposeService): boolean {
  return service.dependsOn.every((dep) => ctx.serviceStates[dep as string] === 'healthy');
}

function findService(stack: ComposeStackModel, serviceId: ServiceId): ComposeService | undefined {
  return stack.services.find((entry) => entry.id === serviceId);
}

export function topologicalOrder(services: ComposeService[]): ServiceId[] {
  const ids = services.map((s) => s.id);
  const visited = new Set<string>();
  const order: ServiceId[] = [];

  function visit(id: ServiceId) {
    const key = id as string;
    if (visited.has(key)) return;
    visited.add(key);
    const service = services.find((s) => (s.id as string) === key);
    for (const dep of service?.dependsOn ?? []) {
      visit(dep);
    }
    order.push(id);
  }

  for (const id of ids) visit(id);
  return order;
}

function reverseTopologicalOrder(services: ComposeService[]): ServiceId[] {
  return [...topologicalOrder(services)].reverse();
}

function hasRunningDependents(
  ctx: ComposeContext,
  stack: ComposeStackModel,
  serviceId: ServiceId,
): boolean {
  const key = serviceId as string;
  return stack.services.some((service) => {
    if (!service.dependsOn.some((dep) => (dep as string) === key)) return false;
    const state = ctx.serviceStates[service.id as string];
    return state !== 'defined' && state !== 'stopped';
  });
}

export function startService(ctx: ComposeContext, serviceId: ServiceId): ComposeContext {
  const stack = ctx.stack;
  if (!stack) return ctx;

  const service = findService(stack, serviceId);
  if (!service) return ctx;

  const state = ctx.serviceStates[serviceId as string];
  if (state !== 'defined' && state !== 'stopped') return ctx;
  if (!depsHealthy(ctx, service)) return ctx;

  let next = setServiceState({ ...ctx, simulationActive: true }, serviceId, 'starting', 'simulate-up-service');
  next = {
    ...next,
    serviceStartedAt: { ...next.serviceStartedAt, [serviceId as string]: next.virtualClockMs },
    healthcheckAttempts: { ...next.healthcheckAttempts, [serviceId as string]: 0 },
  };
  return next;
}

export function stopService(ctx: ComposeContext, serviceId: ServiceId): ComposeContext {
  const stack = ctx.stack;
  if (!stack) return ctx;

  const state = ctx.serviceStates[serviceId as string];
  if (state === 'defined' || state === 'stopped' || state === 'stopping') return ctx;
  if (hasRunningDependents(ctx, stack, serviceId)) return ctx;

  let next = setServiceState(ctx, serviceId, 'stopping', 'simulate-down-service');
  next = {
    ...next,
    serviceStartedAt: { ...next.serviceStartedAt, [serviceId as string]: next.virtualClockMs },
  };
  return next;
}

export function simulateUp(ctx: ComposeContext): ComposeContext {
  const stack = ctx.stack;
  if (!stack) return ctx;

  let next = { ...ctx, simulationActive: true };
  for (const serviceId of topologicalOrder(stack.services)) {
    const service = findService(stack, serviceId);
    if (!service) continue;
    const state = next.serviceStates[serviceId as string];
    if (state !== 'defined' && state !== 'stopped') continue;
    if (!depsHealthy(next, service)) continue;
    next = setServiceState(next, serviceId, 'starting', 'simulate-up');
    next = {
      ...next,
      serviceStartedAt: { ...next.serviceStartedAt, [serviceId as string]: next.virtualClockMs },
      healthcheckAttempts: { ...next.healthcheckAttempts, [serviceId as string]: 0 },
    };
  }
  return next;
}

export function simulateDown(ctx: ComposeContext): ComposeContext {
  const stack = ctx.stack;
  if (!stack) return ctx;

  let next = ctx;
  for (const serviceId of reverseTopologicalOrder(stack.services)) {
    const state = next.serviceStates[serviceId as string];
    if (state === 'defined' || state === 'stopped' || state === 'stopping') continue;
    if (hasRunningDependents(next, stack, serviceId)) continue;
    next = setServiceState(next, serviceId, 'stopping', 'simulate-down');
    next = {
      ...next,
      serviceStartedAt: { ...next.serviceStartedAt, [serviceId as string]: next.virtualClockMs },
    };
  }
  return next;
}

function isPredictedFailure(ctx: ComposeContext, serviceId: ServiceId): boolean {
  return ctx.predictedFailures.some((id) => id === serviceId);
}

function evaluateHealth(ctx: ComposeContext, service: ComposeService, serviceId: ServiceId): ComposeContext {
  const key = serviceId as string;
  const attempts = ctx.healthcheckAttempts[key] ?? 0;
  const retries = service.healthcheck?.retries ?? DEFAULT_RETRIES;
  const intervalMs = parseDurationMs(service.healthcheck?.interval, DEFAULT_INTERVAL_MS);
  const startedAt = ctx.serviceStartedAt[key] ?? ctx.virtualClockMs;
  const elapsed = ctx.virtualClockMs - startedAt;

  if (isPredictedFailure(ctx, serviceId)) {
    return setServiceState(ctx, serviceId, 'failed', 'predicted-failure');
  }

  if (elapsed < intervalMs * (attempts + 1)) {
    return ctx;
  }

  const nextAttempts = attempts + 1;
  let next: ComposeContext = {
    ...ctx,
    healthcheckAttempts: { ...ctx.healthcheckAttempts, [key]: nextAttempts },
  };

  if (nextAttempts > retries) {
    next = setServiceState(next, serviceId, 'failed', 'healthcheck-retries-exhausted');
    return propagateFailure(next);
  }

  return setServiceState(next, serviceId, 'healthy', 'healthcheck-passed');
}

export function propagateFailure(ctx: ComposeContext): ComposeContext {
  const stack = ctx.stack;
  if (!stack) return ctx;

  let next = ctx;
  let changed = true;
  while (changed) {
    changed = false;
    for (const service of stack.services) {
      const key = service.id as string;
      const state = next.serviceStates[key];
      if (state !== 'starting' && state !== 'waitingHealth' && state !== 'healthy') continue;

      const failedDep = service.dependsOn.some((dep) => next.serviceStates[dep as string] === 'failed');
      if (failedDep) {
        const updated = setServiceState(next, service.id, 'failed', 'dependency-failed');
        if (updated !== next) {
          next = updated;
          changed = true;
        }
      }
    }
  }
  return next;
}

function processStarting(ctx: ComposeContext, service: ComposeService, serviceId: ServiceId): ComposeContext {
  const key = serviceId as string;
  const startedAt = ctx.serviceStartedAt[key] ?? ctx.virtualClockMs;
  const elapsed = ctx.virtualClockMs - startedAt;

  if (!service.healthcheck) {
    if (elapsed >= START_DELAY_MS) {
      return setServiceState(ctx, serviceId, 'healthy', 'start-complete');
    }
    return ctx;
  }

  const startPeriod = parseDurationMs(service.healthcheck.startPeriod, 0);
  if (elapsed >= startPeriod + START_DELAY_MS) {
    return setServiceState(ctx, serviceId, 'waitingHealth', 'enter-healthcheck');
  }
  return ctx;
}

function processStopping(ctx: ComposeContext, serviceId: ServiceId): ComposeContext {
  const key = serviceId as string;
  const startedAt = ctx.serviceStartedAt[key] ?? ctx.virtualClockMs;
  if (ctx.virtualClockMs - startedAt >= STOP_DELAY_MS) {
    return setServiceState(ctx, serviceId, 'stopped', 'stop-complete');
  }
  return ctx;
}

function processServiceTransitions(ctx: ComposeContext, service: ComposeService): ComposeContext {
  const serviceId = service.id;
  let next = ctx;
  let state = next.serviceStates[serviceId as string];

  if (state === 'starting') {
    next = processStarting(next, service, serviceId);
    state = next.serviceStates[serviceId as string];
  }
  if (state === 'waitingHealth') {
    next = evaluateHealth(next, service, serviceId);
    state = next.serviceStates[serviceId as string];
  }
  if (state === 'stopping') {
    next = processStopping(next, serviceId);
  }

  return next;
}

export function simulateTick(ctx: ComposeContext, ms: number): ComposeContext {
  const stack = ctx.stack;
  if (!stack) return ctx;

  let next: ComposeContext = {
    ...ctx,
    virtualClockMs: ctx.virtualClockMs + ms,
    simulationActive: true,
  };

  for (let pass = 0; pass < stack.services.length + 2; pass++) {
    const before = JSON.stringify(next.serviceStates);
    for (const service of stack.services) {
      next = processServiceTransitions(next, service);
    }
    if (JSON.stringify(next.serviceStates) === before) break;
  }

  next = simulateUp(next);
  return next;
}

export function injectFailure(ctx: ComposeContext, serviceId: ServiceId): ComposeContext {
  const stack = ctx.stack;
  if (!stack || !findService(stack, serviceId)) return ctx;

  let next = setServiceState(ctx, serviceId, 'failed', 'injected-failure');
  if (!next.predictedFailures.some((id) => id === serviceId)) {
    next = { ...next, predictedFailures: [...next.predictedFailures, serviceId] };
  }
  return propagateFailure(next);
}

export function simulateReset(ctx: ComposeContext): ComposeContext {
  const stack = ctx.stack;
  if (!stack) return ctx;
  return {
    ...ctx,
    ...createInitialRuntime(stack),
  };
}

export function getRuntimeSnapshot(ctx: ComposeContext) {
  return {
    stackId: ctx.stack?.id as string | undefined,
    virtualClockMs: ctx.virtualClockMs,
    simulationActive: ctx.simulationActive,
    serviceStates: { ...ctx.serviceStates },
    predictedFailures: ctx.predictedFailures.map((id) => id as string),
    timeline: [...ctx.timeline],
  };
}
