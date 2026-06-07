import { getEnv, type AnyNetworkPlugin } from '@network-engine/core';
import { GraphDbPlugin } from '@network-engine/edge-graphdb';
import { GraphStorePlugin } from '@network-engine/graphdb';
import { createInMemoryDocumentStore, createMongoDocumentStore } from '@network-engine/mongo';
import type { DocumentStoreProtocol } from '@network-engine/core';
import type { GatewaySemantics } from './semantics';

export interface GatewayBootstrap {
  store: DocumentStoreProtocol;
  graphPlugin: AnyNetworkPlugin<GatewaySemantics>;
}

export async function ensureGraphDbRepository(
  endpoint: string,
  repository: string,
): Promise<void> {
  const base = endpoint.replace(/\/+$/, '');
  const res = await fetch(`${base}/rest/repositories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: repository,
      title: repository,
      type: 'graphdb',
      params: {},
    }),
  });

  if (res.ok || res.status === 409) return;
  throw new Error(
    `[bootstrap] failed to ensure GraphDB repository: ${res.status} ${res.statusText}`,
  );
}

export async function bootstrapGateway(): Promise<GatewayBootstrap> {
  const mongoUri = process.env.MONGO_URI;
  const store = mongoUri
    ? await createMongoDocumentStore({
        uri: mongoUri,
        database: getEnv('MONGO_DATABASE', 'network_engine'),
      })
    : createInMemoryDocumentStore();

  const graphEndpoint = process.env.GRAPHDB_ENDPOINT;
  const repository = getEnv('GRAPHDB_REPOSITORY', 'network-engine');

  let graphPlugin: AnyNetworkPlugin<GatewaySemantics>;
  if (graphEndpoint) {
    await ensureGraphDbRepository(graphEndpoint, repository);
    const plugin = new GraphDbPlugin<GatewaySemantics>();
    plugin.install({ endpoint: graphEndpoint, repository });
    graphPlugin = plugin;
  } else {
    const plugin = new GraphStorePlugin<GatewaySemantics>();
    plugin.install({ name: 'gateway-graph' });
    graphPlugin = plugin;
  }

  return { store, graphPlugin };
}
