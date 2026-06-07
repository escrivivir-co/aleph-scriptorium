import type { CoreEventBase, LanguageSemantics } from '@network-engine/core';

export type GatewayContext = {
  lastUpsert?: { id: string; input: Record<string, unknown> };
};

export type GatewayEvent =
  | CoreEventBase<'UPSERT_ENTITY', { input: Record<string, unknown> }>
  | CoreEventBase<
      'ENTITY_CHANGED',
      { id: string; kind: 'insert' | 'update' | 'delete' }
    >;

export type GatewaySemantics = LanguageSemantics<GatewayContext, GatewayEvent>;
