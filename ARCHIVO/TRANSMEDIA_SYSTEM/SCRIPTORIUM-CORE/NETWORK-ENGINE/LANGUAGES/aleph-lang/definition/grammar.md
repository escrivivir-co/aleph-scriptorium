# Gramática Tipada y DSL (Fases 5 y 6)

## Fase 5: Exploración en TypeScript

Debemos asegurarnos de que el sistema de tipos puede probar la validez semántica en tiempo de compilación.

**Branded Types:**
```ts
type ForceId = string & { readonly __brand: unique symbol };
type DimensionLevel = number & { readonly __brand: unique symbol };
```

**Template Literals para Fuerzas direccionales:**
```ts
type ForceVector = `force_${'positive' | 'negative'}_${string}`;
```

**Phantom Types en Contexto:**
Para garantizar que una máquina de Aleph no procese fuerzas que pertenezcan a otro lenguaje, utilizamos Type Predicates inyectados en la factoría genérica.

**Discriminated Unions para Eventos:**
```ts
export type AlephEvent =
  | CoreEventBase<'IMPACT_FORCE', { forceId: ForceId; weight: number }>
  | CoreEventBase<'REACH_BOUNDARY', { currentDimension: DimensionLevel }>
  | CoreEventBase<'COMPLETE_EXPANSION', { newDimension: DimensionLevel }>;
```

## Fase 6: DSL para el Usuario

No debemos programar la red llamando a `engine.dispatch({ type: '...' })`. El lenguaje derivado exportará una DSL fluida construida sobre el core.

**Sintaxis Conceptual Esperada:**

```ts
import { AlephUniverse } from '@network-engine/aleph-lang';

// El DSL envuelve el Orchestrator
const aleph = new AlephUniverse('aleph-001');

aleph
  .dimension(3)
  .onBoundaryReached((boundary) => {
      console.log(`Límite dimensional alcanzado: ${boundary}`);
      aleph.expand();
  });

// Asimilación de conocimiento mediante la DSL
aleph.absorbForce({ weight: 50, vector: 'force_positive_idea' });
```
