/**
 * `@network-engine/graphdb` — adaptador in-memory (cero deps de runtime) del
 * `GraphStoreProtocol` definido en `@network-engine/core` (Capa 1).
 */

export { InMemoryGraphStore } from './in-memory-store';
export { GraphStorePlugin, createInMemoryGraphStore, type GraphStoreConfig } from './plugin';
export { runSelect, type QuadSource, type SolutionRow } from './sparql';
export { termKey, graphKey, quadKey, DEFAULT_GRAPH_KEY } from './keys';
