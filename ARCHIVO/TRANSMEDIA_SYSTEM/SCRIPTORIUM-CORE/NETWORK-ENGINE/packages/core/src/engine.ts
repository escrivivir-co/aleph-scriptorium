import { setup, ActionFunction, AnyActorRef } from 'xstate';
import { LanguageSemantics, InferContext, InferEvent } from './types';

/**
 * Platform Factory para crear Máquinas de Red.
 * Elimina el hardcoding de transiciones y permite que cada Lenguaje (Capa 2)
 * inyecte su propia máquina de estados fuertemente tipada.
 */
export function createNetworkMachine<
  TSemantics extends LanguageSemantics<any, any>
>(config: {
  initialContext: InferContext<TSemantics>;
  actions?: Record<string, any>;
  guards?: Record<string, any>;
}) {
  // Utilizamos setup de XState v5 inyectando los tipos inferidos de la Semántica
  return setup({
    types: {} as {
      context: InferContext<TSemantics>;
      events: InferEvent<TSemantics>;
    },
    ...(config.actions ? { actions: config.actions } : {}),
    ...(config.guards ? { guards: config.guards } : {})
  });
}
