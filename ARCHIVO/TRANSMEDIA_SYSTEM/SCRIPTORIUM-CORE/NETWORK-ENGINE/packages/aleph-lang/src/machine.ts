import { assign } from 'xstate';
import { createNetworkMachine } from '@network-engine/core';
import { AlephSemantics, createDimension } from './types';

// La factoría del core nos asegura que solo podemos mutar AlephContext
// y solo podemos responder a AlephEvent
export const alephMachine = createNetworkMachine<AlephSemantics>({
  initialContext: {
    dimension: createDimension(1),
    forces: [],
    structuralIntegrity: 100
  },
  actions: {
    absorbForce: assign(({ context, event }) => {
      if (event.type === 'IMPACT_FORCE') {
        context.forces.push(event.payload.force);
        // Desgaste estructural por cada fuerza asimilada si se acerca al límite
        if (context.forces.length > (context.dimension as number) * 5) {
            context.structuralIntegrity -= 10;
        }
      }
      return context;
    }),
    expandDimension: assign(({ context, event }) => {
      if (event.type === 'COMPLETE_EXPANSION') {
        context.dimension = event.payload.newDimension;
        context.structuralIntegrity = 100; // Restauramos la integridad al expandir
      }
      return context;
    })
  }
}).createMachine({
  id: 'alephMachine',
  initial: 'stable',
  context: {
    dimension: createDimension(1),
    forces: [],
    structuralIntegrity: 100
  },
  states: {
    stable: {
      on: {
        IMPACT_FORCE: {
          actions: 'absorbForce',
          // Lógica predictiva: Si el impacto ha mermado la integridad, vamos al límite
          target: 'evaluatingIntegrity'
        }
      }
    },
    evaluatingIntegrity: {
      always: [
        {
          guard: ({ context }) => context.structuralIntegrity <= 0,
          target: 'critical'
        },
        {
          target: 'stable'
        }
      ]
    },
    critical: {
      on: {
        COMPLETE_EXPANSION: {
          actions: 'expandDimension',
          target: 'stable'
        }
        // IMPACT_FORCE es ignorado explícitamente durante crisis
      }
    }
  }
});
