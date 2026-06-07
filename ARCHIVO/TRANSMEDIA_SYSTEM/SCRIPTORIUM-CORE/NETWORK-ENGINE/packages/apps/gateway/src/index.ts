/**
 * Docker entrypoint — GraphQL gateway with Mongo (or in-memory) + GraphDB materialization.
 */

import { createNetworkEngine } from '@network-engine/network-engine';
import { createGraphQLRuntime } from '@network-engine/graphql';
import { startGraphQLServer } from '@network-engine/edge-graphql';
import { bootstrapGateway } from './bootstrap';
import { gatewayContract } from './contract';
import { wireUpsertEffects } from './effects';
import { wireGraphMaterialization } from './graph-sync';
import { DEFAULT_ENTITY_BASE_IRI } from './materialize';
import { gatewayMachine } from './machine';

const COLLECTION = 'entities';

const { store, graphPlugin } = await bootstrapGateway();

const { orchestrator } = createNetworkEngine(gatewayMachine, {
  storage: {
    store,
    contract: gatewayContract,
    collection: COLLECTION,
    mappers: {
      mapDocumentChange: (change) => ({
        type: 'ENTITY_CHANGED',
        payload: { id: change.id, kind: change.kind },
        timestamp: change.ts,
      }),
      mapToolRequest: (req) => ({
        type: 'UPSERT_ENTITY',
        payload: { input: req.args },
        timestamp: Date.now(),
      }),
    },
  },
});

orchestrator.registerPlugin(graphPlugin);
wireUpsertEffects(orchestrator, { store, collection: COLLECTION });
wireGraphMaterialization(store, orchestrator.resolve('rdf-sparql'), {
  collection: COLLECTION,
  baseIri: DEFAULT_ENTITY_BASE_IRI,
});

const runtime = createGraphQLRuntime({
  contract: gatewayContract,
  context: {
    contract: gatewayContract,
    store,
    dispatch: orchestrator.dispatch.bind(orchestrator),
    mapToolRequest: (req) => ({
      type: 'UPSERT_ENTITY',
      payload: { input: req.args },
      timestamp: Date.now(),
    }),
  },
});

const server = startGraphQLServer({ runtime });
console.log(`GraphQL gateway listening on http://${server.hostname}:${server.port}/graphql`);
