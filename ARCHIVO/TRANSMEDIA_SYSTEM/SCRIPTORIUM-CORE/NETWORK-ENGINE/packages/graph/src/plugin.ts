/**
 * `GraphStorePlugin`: envuelve el adaptador in-memory y lo expone al
 * orquestador como la capacidad `'rdf-sparql'` vía `provides()`. Sigue el mismo
 * patrón que `FileSystemPlugin` de `@network-engine/node`, pero además declara
 * que PROVEE un servicio de protocolo (3er parámetro de tipo `'rdf-sparql'`).
 */

import {
  getEnv,
  type GraphStoreProtocol,
  type LanguageSemantics,
  type NetworkPlugin,
  type PluginCapabilities,
  type PluginId,
} from '@network-engine/core';
import { InMemoryGraphStore } from './in-memory-store';

/** Configuración del plugin. `name` documenta la instancia (telemetría/logging). */
export interface GraphStoreConfig extends Record<string, unknown> {
  readonly name?: string;
}

export class GraphStorePlugin<TSemantics extends LanguageSemantics<any, any>>
  implements NetworkPlugin<TSemantics, GraphStoreConfig, 'rdf-sparql'>
{
  public readonly id = 'graph-inmemory-store' as PluginId;
  // In-memory => no infiere, no persiste (volátil), no visualiza.
  public readonly capabilities: PluginCapabilities = {
    canInfer: false,
    canPersist: false,
    canVisualize: false,
  };

  private installed = false;
  private readonly store = new InMemoryGraphStore();

  public install<const TOptions extends GraphStoreConfig>(options: TOptions): void {
    const name = options.name ?? getEnv('GRAPH_NAME', 'InMemoryGraphStore');
    console.log(`[Graph] Initializing in-memory RDF/SPARQL store "${name}"`);
    this.installed = true;
  }

  public isInstalled(): this is NetworkPlugin<TSemantics, GraphStoreConfig, 'rdf-sparql'> & { installed: true } {
    return this.installed;
  }

  public provides(): GraphStoreProtocol {
    return this.store;
  }
}

/** Factory: una instancia fresca y aislada del triple-store in-memory. */
export function createInMemoryGraphStore(): InMemoryGraphStore {
  return new InMemoryGraphStore();
}
