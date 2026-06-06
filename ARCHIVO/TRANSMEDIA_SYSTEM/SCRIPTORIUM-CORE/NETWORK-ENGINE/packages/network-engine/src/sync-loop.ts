/**
 * Canonical mappers and subscriptions for the storage ↔ orchestrator ↔ MCP loop.
 * Lives in the composition root — never in core.
 */

import type {
  DocumentChange,
  DocumentStoreProtocol,
  DomainContract,
  InferEvent,
  LanguageSemantics,
} from '@network-engine/core';
import type { MCPRuntime } from '@network-engine/mcp-runtime';
import type { RuntimeToolRequest } from '@network-engine/mcp-runtime';
import type { NetworkOrchestrator } from '@network-engine/core';
import type { Subscription } from 'rxjs';

export interface DocumentSyncMappers<TSemantics extends LanguageSemantics<any, any>> {
  mapDocumentChange: (change: DocumentChange) => InferEvent<TSemantics> | undefined;
  mapEventToResourceUri?: (event: InferEvent<TSemantics>) => string | undefined;
  mapToolRequest?: (request: RuntimeToolRequest) => InferEvent<TSemantics>;
}

export interface DocumentSyncOptions<TSemantics extends LanguageSemantics<any, any>> {
  store: DocumentStoreProtocol;
  contract?: DomainContract;
  mappers: DocumentSyncMappers<TSemantics>;
  collection?: string;
}

export interface DocumentSyncHandle {
  unsubscribe: () => void;
}

export function wireDocumentSyncLoop<TSemantics extends LanguageSemantics<any, any>>(
  orchestrator: NetworkOrchestrator<TSemantics>,
  mcpRuntime: MCPRuntime | undefined,
  options: DocumentSyncOptions<TSemantics>,
): DocumentSyncHandle {
  const subs: Subscription[] = [];

  subs.push(
    options.store.changes(options.collection).subscribe((change) => {
      const event = options.mappers.mapDocumentChange(change);
      if (event !== undefined) orchestrator.dispatch(event);
    }),
  );

  if (mcpRuntime !== undefined && options.mappers.mapEventToResourceUri !== undefined) {
    const mapUri = options.mappers.mapEventToResourceUri;
    subs.push(
      orchestrator.events$.subscribe((event) => {
        const uri = mapUri(event);
        if (uri !== undefined) mcpRuntime.notifyResourceUpdated(uri);
      }),
    );
  }

  return {
    unsubscribe: () => {
      for (const sub of subs) sub.unsubscribe();
    },
  };
}

export function createDocumentReadResourceHandler(
  store: DocumentStoreProtocol,
  contract: DomainContract,
) {
  const collection = contract.storage?.collection;
  return async (uri: string) => {
    if (collection === undefined) {
      return {
        contents: [{ uri, mimeType: 'application/json', text: JSON.stringify({ uri }) }],
      };
    }

    for (const resource of Object.values(contract.resources)) {
      if (resource.kind !== 'template') continue;
      const escaped = resource.uriTemplate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = escaped.replace(/\{[^}]+\}/g, '([^/]+)');
      const match = uri.match(new RegExp(`^${pattern}$`));
      if (match?.[1] !== undefined) {
        const doc = await store.get(collection, match[1]);
        return {
          contents: [
            {
              uri,
              mimeType: resource.mimeType,
              text: JSON.stringify(doc ?? null, null, 2),
            },
          ],
        };
      }
    }

    const docs = await store.find(collection, {});
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(docs, null, 2),
        },
      ],
    };
  };
}
