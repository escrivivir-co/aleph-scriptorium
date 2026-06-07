import { assign } from 'xstate';
import { createNetworkMachine } from '@network-engine/core';
import type { GatewaySemantics } from './semantics';

export const gatewayMachine = createNetworkMachine<GatewaySemantics>({
  initialContext: {},
  actions: {
    recordUpsert: assign(({ context, event }) => {
      if (event.type !== 'UPSERT_ENTITY') return context;
      const input = event.payload.input;
      const id = typeof input.id === 'string' ? input.id : 'pending';
      return { ...context, lastUpsert: { id, input } };
    }),
  },
}).createMachine({
  id: 'gatewayMachine',
  initial: 'ready',
  context: {},
  states: {
    ready: {
      on: {
        UPSERT_ENTITY: { actions: 'recordUpsert' },
        ENTITY_CHANGED: {},
      },
    },
  },
});
