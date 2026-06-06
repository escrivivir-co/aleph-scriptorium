import { assign } from 'xstate';
import { createNetworkMachine } from '@network-engine/core';
import { ComposeContext, ComposeSemantics } from './types';
import {
  createInitialRuntime,
  injectFailure,
  simulateDown,
  simulateReset,
  simulateTick,
  simulateUp,
  startService,
  stopService,
} from './simulator';

export const composeMachine = createNetworkMachine<ComposeSemantics>({
  initialContext: {
    plannedOperations: [],
    serviceStates: {},
    serviceStartedAt: {},
    healthcheckAttempts: {},
    virtualClockMs: 0,
    predictedFailures: [],
    timeline: [],
    simulationActive: false,
  },
  actions: {
    loadStack: assign(({ context, event }) => {
      if (event.type === 'LOAD_STACK') {
        const runtime = createInitialRuntime(event.payload.stack);
        return {
          ...context,
          stack: event.payload.stack,
          loadedAt: Date.now(),
          focusedServiceId: undefined,
          plannedOperations: [],
          ...runtime,
        };
      }
      return context;
    }),
    focusService: assign(({ context, event }) => {
      if (event.type === 'INSPECT_SERVICE') {
        return {
          ...context,
          focusedServiceId: event.payload.serviceId,
        };
      }
      return context;
    }),
    planOperation: assign(({ context, event }) => {
      if (event.type === 'PLAN_OPERATION') {
        return {
          ...context,
          plannedOperations: [...context.plannedOperations, event.payload.plan],
        };
      }
      return context;
    }),
    simulateUp: assign(({ context, event }) => {
      const ctx = context as ComposeContext;
      if (event.type === 'SIMULATE_UP') return simulateUp(ctx);
      return ctx;
    }),
    simulateDown: assign(({ context, event }) => {
      const ctx = context as ComposeContext;
      if (event.type === 'SIMULATE_DOWN') return simulateDown(ctx);
      return ctx;
    }),
    simulateTick: assign(({ context, event }) => {
      const ctx = context as ComposeContext;
      if (event.type === 'SIMULATE_TICK') return simulateTick(ctx, event.payload.ms);
      return ctx;
    }),
    injectFailure: assign(({ context, event }) => {
      const ctx = context as ComposeContext;
      if (event.type === 'SIMULATE_INJECT_FAILURE') {
        return injectFailure(ctx, event.payload.serviceId);
      }
      return ctx;
    }),
    simulateReset: assign(({ context, event }) => {
      const ctx = context as ComposeContext;
      if (event.type === 'SIMULATE_RESET') return simulateReset(ctx);
      return ctx;
    }),
    startService: assign(({ context, event }) => {
      const ctx = context as ComposeContext;
      if (event.type === 'SIMULATE_START_SERVICE') {
        return startService(ctx, event.payload.serviceId);
      }
      return ctx;
    }),
    stopService: assign(({ context, event }) => {
      const ctx = context as ComposeContext;
      if (event.type === 'SIMULATE_STOP_SERVICE') {
        return stopService(ctx, event.payload.serviceId);
      }
      return ctx;
    }),
  },
}).createMachine({
  id: 'composeMachine',
  initial: 'empty',
  context: {
    plannedOperations: [],
    serviceStates: {},
    serviceStartedAt: {},
    healthcheckAttempts: {},
    virtualClockMs: 0,
    predictedFailures: [],
    timeline: [],
    simulationActive: false,
  },
  states: {
    empty: {
      on: {
        LOAD_STACK: { actions: 'loadStack', target: 'loaded' },
      },
    },
    loaded: {
      on: {
        LOAD_STACK: { actions: 'loadStack' },
        INSPECT_SERVICE: { actions: 'focusService', target: 'inspecting' },
        PLAN_OPERATION: { actions: 'planOperation', target: 'planning' },
        SIMULATE_UP: { actions: 'simulateUp', target: 'simulating' },
        SIMULATE_DOWN: { actions: 'simulateDown', target: 'simulating' },
        SIMULATE_TICK: { actions: 'simulateTick', target: 'simulating' },
        SIMULATE_INJECT_FAILURE: { actions: 'injectFailure', target: 'simulating' },
        SIMULATE_RESET: { actions: 'simulateReset' },
        SIMULATE_START_SERVICE: { actions: 'startService', target: 'simulating' },
        SIMULATE_STOP_SERVICE: { actions: 'stopService', target: 'simulating' },
      },
    },
    simulating: {
      always: { target: 'loaded' },
    },
    inspecting: {
      always: { target: 'loaded' },
    },
    planning: {
      always: { target: 'loaded' },
    },
  },
});
