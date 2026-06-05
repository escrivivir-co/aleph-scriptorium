# Roadmap e Integración (Fases 7 y 8)

Este documento guía la implementación técnica del lenguaje una vez que las fases 1 a 6 hayan sido aprobadas formalmente.

## Fase 7: Runtime Mapping

El comportamiento definido en `semantics.md` se mapeará sobre las herramientas del Core de la siguiente manera:

1. **XState (engine.ts de aleph-lang):**
   Instanciará `createNetworkMachine<AlephSemantics>()`. Mapeará los estados (`idle`, `expanding`, `critical`) a nodos formales de XState y `IMPACT_FORCE` a acciones (`assign`).

2. **RxJS (DSL Wrapper):**
   La clase `AlephUniverse` instanciará internamente `NetworkOrchestrator<AlephSemantics>` y utilizará `engine.selectEvent('REACH_BOUNDARY')` para exponer un callback o una Promesa limpia al consumidor (`onBoundaryReached`).

## Fase 8: Generación del Paquete

Una vez validado el diseño, se ejecutará el scaffolding físico:

1. Crear directorio `packages/aleph-lang`.
2. Inicializar `package.json` con dependencia a `@network-engine/core`.
3. Configurar `tsconfig.json` para Project References.
4. Exportar el DSL (`AlephUniverse`) en `packages/aleph-lang/src/index.ts`.
5. Probar consumiéndolo desde `packages/apps/src/aleph.ts`.
