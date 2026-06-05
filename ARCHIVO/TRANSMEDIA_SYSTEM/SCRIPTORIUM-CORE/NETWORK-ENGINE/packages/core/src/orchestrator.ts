import { Subject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { createActor, AnyActorRef, AnyStateMachine } from 'xstate';
import { NetworkPlugin, LanguageSemantics, InferEvent } from './types';
import { getEnv } from './env';

// Modern TS5 Decorator to log orchestrator events
function logStream(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  return function replacementMethod(this: any, ...args: any[]) {
    const appName = getEnv('CORE_NAME', 'Orchestrator');
    console.log(`[${appName}] Method ${methodName} called with args:`, args);
    return originalMethod.call(this, ...args);
  };
}

/**
 * Orquestador Genérico de Red.
 * Opera dinámicamente sobre la Semántica inyectada (Capa 2).
 */
export class NetworkOrchestrator<TSemantics extends LanguageSemantics<any, any>> {
  private eventBus = new Subject<InferEvent<TSemantics>>();
  private plugins = new Set<NetworkPlugin<TSemantics, any>>();
  private stateActor: AnyActorRef;

  constructor(machine: AnyStateMachine) {
    // Instanciamos el actor con la máquina proveída por el Lenguaje
    this.stateActor = createActor(machine);
    this.stateActor.start();

    // El bus de eventos enruta tipadamente hacia el actor de XState
    this.eventBus.subscribe(event => {
      this.stateActor.send(event);
    });
  }

  @logStream
  public registerPlugin<const T extends NetworkPlugin<TSemantics, any>>(plugin: T): void {
    this.plugins.add(plugin);
    console.log(`Plugin ${plugin.id} registered.`);
  }

  @logStream
  public dispatch(event: InferEvent<TSemantics>): void {
    this.eventBus.next(event);
  }

  /**
   * Operador RxJS Type-Safe para derivar streams de eventos específicos.
   * Utiliza Type Predicates generados dinámicamente.
   */
  public selectEvent<TType extends InferEvent<TSemantics>['type']>(
    type: TType
  ): Observable<Extract<InferEvent<TSemantics>, { type: TType }>> {
    return this.eventBus.pipe(
      filter((event): event is Extract<InferEvent<TSemantics>, { type: TType }> => event.type === type),
      tap(event => {
        const appName = getEnv('CORE_NAME', 'Stream');
        console.log(`[${appName}] Event [${type as string}]:`, event);
      })
    );
  }

  public get currentState() {
    return this.stateActor.getSnapshot();
  }
}
