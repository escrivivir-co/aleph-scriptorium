import { createNodeEngine } from '@network-engine/node';
import { AlephSemantics, AbsorbedForce, createDimension } from './types';
import { alephMachine } from './machine';

/**
 * DSL Wrapper Ocultando el Orchestrator.
 * Proporciona una interfaz orientada a objetos (Fluent API/Domain API)
 * para interactuar con el lenguaje Aleph, tal y como se definió en grammar.md.
 */
export class AlephUniverse {
  private engine = createNodeEngine<AlephSemantics>(alephMachine);

  constructor(public readonly name: string) {}

  // ==========================================
  // FLUENT API (Grammar)
  // ==========================================

  public absorbForce(force: AbsorbedForce): this {
    this.engine.dispatch({
      type: 'IMPACT_FORCE',
      payload: { force },
      timestamp: Date.now()
    });
    
    // Si la máquina transicionó a crítico debido a esta fuerza, disparamos el límite
    if (this.engine.currentState.value === 'critical') {
      this.engine.dispatch({
        type: 'REACH_BOUNDARY',
        payload: { limit: this.engine.currentState.context.dimension },
        timestamp: Date.now()
      });
    }

    return this;
  }

  public expand(): this {
    const currentDim = this.engine.currentState.context.dimension as number;
    this.engine.dispatch({
      type: 'COMPLETE_EXPANSION',
      payload: { newDimension: createDimension(currentDim + 1) },
      timestamp: Date.now()
    });
    return this;
  }

  // ==========================================
  // OBSERVADORES (RxJS Wrappers)
  // ==========================================

  public onBoundaryReached(callback: (currentDimension: number) => void): this {
    this.engine.selectEvent('REACH_BOUNDARY').subscribe((event) => {
      callback(event.payload.limit as number);
    });
    return this;
  }

  public onExpansionCompleted(callback: (newDimension: number) => void): this {
    this.engine.selectEvent('COMPLETE_EXPANSION').subscribe((event) => {
      callback(event.payload.newDimension as number);
    });
    return this;
  }

  // ==========================================
  // INSPECTORES DE ESTADO
  // ==========================================

  public getStatus() {
    return {
      state: this.engine.currentState.value,
      dimension: this.engine.currentState.context.dimension,
      integrity: this.engine.currentState.context.structuralIntegrity,
      forcesCount: this.engine.currentState.context.forces.length
    };
  }
}
