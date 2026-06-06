import { AppId, CoreEventBase, LanguageSemantics } from '@network-engine/core';

export type PubSubConfig = {
  hubUrl: string;
  namespace?: string;
};

// Extiende CoreEventBase para poder transportar cualquier evento con metadatos de red
export type NetworkTransportEvent<TPayload = unknown> = {
  type: string;
  payload: TPayload;
  timestamp: number;
  source: string; // AppId (como string para wire format)
  target?: string | '*'; // Target AppId or broadcast
  room?: string;
};

// Marcador simbólico para eventos que deben cruzar el bridge
export const PUBLISHABLE = Symbol.for('network-engine.publishable');

// Utilidad para marcar eventos
export function markPublishable<T extends Record<string, unknown>>(event: T): T & { [PUBLISHABLE]: true } {
  return { ...event, [PUBLISHABLE]: true };
}

export function isPublishable(event: any): boolean {
  return event && event[PUBLISHABLE] === true;
}
