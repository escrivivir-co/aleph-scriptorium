import { CoreEventBase, LanguageSemantics } from '@network-engine/core';

// 1. Identificadores Fuertes (Branded Types)
export type ForceId = string & { readonly __brand: unique symbol };
export type DimensionLevel = number & { readonly __brand: unique symbol };

export function createForceId(id: string): ForceId {
  return id as ForceId;
}

export function createDimension(level: number): DimensionLevel {
  return level as DimensionLevel;
}

// 2. Ontología y Contexto (El estado persistente de Aleph)
export type ForceVector = `force_${'positive' | 'negative'}_${string}`;

export interface AbsorbedForce {
  id: ForceId;
  vector: ForceVector;
  weight: number;
}

export type AlephContext = {
  dimension: DimensionLevel;
  forces: AbsorbedForce[];
  structuralIntegrity: number; // 0 to 100
};

// 3. Eventos Semánticos (Discriminated Unions)
export type AlephEvent =
  | CoreEventBase<'IMPACT_FORCE', { force: AbsorbedForce }>
  | CoreEventBase<'REACH_BOUNDARY', { limit: DimensionLevel }>
  | CoreEventBase<'COMPLETE_EXPANSION', { newDimension: DimensionLevel }>;

// 4. Inyección Semántica (Phantom Types)
export type AlephSemantics = LanguageSemantics<AlephContext, AlephEvent>;
