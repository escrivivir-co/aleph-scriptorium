import { assign } from 'xstate';
import { LanguageSemantics, CoreEventBase, UniverseId } from '../types';
import { createNetworkMachine } from '../engine';
import { NetworkOrchestrator } from '../orchestrator';

// 1. Definición del Contexto (Estado interno de este lenguaje)
export type TestContext = {
  activeUniverseId: UniverseId | null;
  facts: string[];
};

// 2. Definición de Eventos usando la Primitiva genérica
export type TestEvent = 
  | CoreEventBase<'CREATE_UNIVERSE', { id: UniverseId }>
  | CoreEventBase<'INFER', { fact: string }>;

// 3. DSL Tipada: Vinculando Contexto y Eventos en una Semántica (Phantom Types)
export type TestSemantics = LanguageSemantics<TestContext, TestEvent>;

// 4. Creación de la máquina de red fuertemente tipada a la Semántica
export const testMachine = createNetworkMachine<TestSemantics>({
  initialContext: {
    activeUniverseId: null,
    facts: []
  },
  actions: {
    assignUniverse: assign(({ context, event }) => {
      if (event.type === 'CREATE_UNIVERSE') {
        context.activeUniverseId = event.payload.id;
      }
      return context;
    }),
    addFact: assign(({ context, event }) => {
      if (event.type === 'INFER') {
        context.facts.push(event.payload.fact);
      }
      return context;
    })
  }
}).createMachine({
  id: 'testLangMachine',
  initial: 'idle',
  context: {
    activeUniverseId: null,
    facts: []
  },
  states: {
    idle: {
      on: {
        CREATE_UNIVERSE: {
          actions: 'assignUniverse'
        },
        INFER: {
          actions: 'addFact'
        }
      }
    }
  }
});

// 5. Instanciación del Orquestador genérico
export const testOrchestrator = new NetworkOrchestrator<TestSemantics>(testMachine);
