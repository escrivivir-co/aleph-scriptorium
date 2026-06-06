import { Subject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { createActor, AnyActorRef, AnyStateMachine } from 'xstate';
import {
  LanguageSemantics,
  InferEvent,
  AnyNetworkPlugin,
  Capability,
  ServiceOf,
  ProtocolService,
} from './types';
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
  private plugins = new Set<AnyNetworkPlugin<TSemantics>>();
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
  public registerPlugin<const T extends AnyNetworkPlugin<TSemantics>>(plugin: T): void {
    this.plugins.add(plugin);
    console.log(`Plugin ${plugin.id} registered.`);
  }

  /**
   * Resuelve el servicio de protocolo provisto por algún plugin registrado para
   * la capacidad indicada. El tipo de retorno se deriva de `CapabilityServiceRegistry`
   * (mismo estilo de tipado fuerte que `selectEvent`/`InferEvent`), de modo que
   * `resolve('rdf-sparql')` devuelve `GraphStoreProtocol | undefined` sin casts
   * en el llamante. Internamente discrimina por el campo `capability`.
   */
  public resolve<TCapability extends Capability>(
    capability: TCapability
  ): ServiceOf<TCapability> | undefined {
    for (const plugin of this.plugins) {
      // `provides()` puede lanzar si el plugin no está instalado / su store no
      // está listo (p.ej. `GraphDbPlugin.provides()` antes de `install`). Un
      // plugin no listo NO debe romper la resolución del resto: lo saltamos.
      let service: ProtocolService | undefined;
      try {
        service = plugin.provides?.() as ProtocolService | undefined;
      } catch {
        continue;
      }
      if (service !== undefined && service.capability === capability) {
        return service as ServiceOf<TCapability>;
      }
    }
    return undefined;
  }

  @logStream
  public dispatch(event: InferEvent<TSemantics>): void {
    this.eventBus.next(event);
  }

  /**
   * Observable de todos los eventos despachados en el orchestrator.
   */
  public get events$(): Observable<InferEvent<TSemantics>> {
    return this.eventBus.asObservable();
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
