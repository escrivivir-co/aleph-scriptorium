import type { DocumentStoreProtocol, NetworkOrchestrator } from '@network-engine/core';
import type { Subscription } from 'rxjs';
import type { GatewaySemantics } from './semantics';

export interface UpsertEffectsOptions {
  store: DocumentStoreProtocol;
  collection: string;
}

export interface UpsertEffectsHandle {
  unsubscribe: () => void;
}

export function wireUpsertEffects(
  orchestrator: NetworkOrchestrator<GatewaySemantics>,
  options: UpsertEffectsOptions,
): UpsertEffectsHandle {
  const sub: Subscription = orchestrator.selectEvent('UPSERT_ENTITY').subscribe(async (event) => {
    const input = event.payload.input;
    const id = typeof input.id === 'string' ? input.id : undefined;

    if (id !== undefined) {
      const existing = await options.store.get(options.collection, id);
      if (existing !== null) {
        await options.store.update(options.collection, id, input);
      } else {
        await options.store.insert(options.collection, { ...input, id });
      }
    } else {
      await options.store.insert(options.collection, input);
    }
  });

  return { unsubscribe: () => sub.unsubscribe() };
}
