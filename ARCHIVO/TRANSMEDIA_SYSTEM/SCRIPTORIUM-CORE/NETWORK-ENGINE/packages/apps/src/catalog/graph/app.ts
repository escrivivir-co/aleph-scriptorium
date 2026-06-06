import {
  App,
  AppStatus,
  CoreEventBase,
  LanguageSemantics,
  createAppId,
  createNetworkMachine,
  literal,
  namedNode,
  quad,
  rdf,
  rdfs,
  runQuery,
  select,
  triple,
  v,
  xsd,
  type GraphStoreProtocol,
} from '@network-engine/core';
import { createNetworkEngine } from '@network-engine/network-engine';
import { GraphStorePlugin } from '@network-engine/graph';
import { tap, toArray } from 'rxjs/operators';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

type GraphConfig = {
  readonly appName?: string;
};

// ---------------------------------------------------------------------------
// Minimal XState semantics — the orchestrator needs a typed machine; we keep
// this intentionally trivial since GraphApp only needs plugin resolution.
// ---------------------------------------------------------------------------

type GraphContext = { readonly initialized: boolean };
type GraphEvent = CoreEventBase<'GRAPH_READY', { readonly storeId: string }>;
type GraphSemantics = LanguageSemantics<GraphContext, GraphEvent>;

const graphMachine = createNetworkMachine<GraphSemantics>({
  initialContext: { initialized: false },
}).createMachine({
  id: 'graphMachine',
  initial: 'idle',
  context: { initialized: false },
  states: { idle: {} },
});

// ---------------------------------------------------------------------------
// Aleph universe IRIs
// ---------------------------------------------------------------------------

const ALEPH = 'http://aleph.network/universe/';

const aleph0 = namedNode(`${ALEPH}aleph0`);
const aleph1 = namedNode(`${ALEPH}aleph1`);
const aleph2 = namedNode(`${ALEPH}aleph2`);
const aleph3 = namedNode(`${ALEPH}aleph3`);
const Universe = namedNode(`${ALEPH}Universe`);
const dimensionProp = namedNode(`${ALEPH}dimension`);
const originatesFrom = namedNode(`${ALEPH}originatesFrom`);

// ---------------------------------------------------------------------------
// GraphApp
// ---------------------------------------------------------------------------

export class GraphApp implements App<GraphConfig, 'graph', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_graph'),
    rawId: 'graph' as const,
    name: 'Graph Store Demo',
    version: '1.0.0' as const,
    description:
      'Demonstrates the full GraphStoreProtocol + typed SPARQL DSL integration with an Aleph-universe RDF ontology.',
  } satisfies App<GraphConfig, 'graph', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };

  private config?: GraphConfig;
  private store?: GraphStoreProtocol;

  public async init(config: GraphConfig): Promise<void> {
    this.config = config;
    this.status = { state: 'STOPPED' };

    const { orchestrator } = createNetworkEngine<GraphSemantics>(graphMachine);
    const plugin = new GraphStorePlugin<GraphSemantics>();
    plugin.install({ name: 'aleph-universe' });
    orchestrator.registerPlugin(plugin);

    const resolved = orchestrator.resolve('rdf-sparql');
    if (resolved === undefined) {
      throw new Error('[GraphApp] Could not resolve rdf-sparql store');
    }
    this.store = resolved;

    // -----------------------------------------------------------------------
    // Aleph universe ontology — 15 quads covering 4 subjects (aleph0..aleph3)
    // across 4 predicates: rdf:type / rdfs:label / aleph:dimension /
    // aleph:originatesFrom.
    // -----------------------------------------------------------------------
    await this.store.add([
      quad(aleph0, namedNode(rdf('type')), Universe),
      quad(aleph0, namedNode(rdfs('label')), literal('Aleph-0', { lang: 'en' })),
      quad(aleph0, dimensionProp, literal('0', xsd.integer)),
      quad(aleph1, namedNode(rdf('type')), Universe),
      quad(aleph1, namedNode(rdfs('label')), literal('Aleph-1', { lang: 'en' })),
      quad(aleph1, dimensionProp, literal('1', xsd.integer)),
      quad(aleph1, originatesFrom, aleph0),
      quad(aleph2, namedNode(rdf('type')), Universe),
      quad(aleph2, namedNode(rdfs('label')), literal('Aleph-2', { lang: 'en' })),
      quad(aleph2, dimensionProp, literal('2', xsd.integer)),
      quad(aleph2, originatesFrom, aleph1),
      quad(aleph3, namedNode(rdf('type')), Universe),
      quad(aleph3, namedNode(rdfs('label')), literal('Aleph-3', { lang: 'en' })),
      quad(aleph3, dimensionProp, literal('3', xsd.integer)),
      quad(aleph3, originatesFrom, aleph2),
    ]);

    console.log(`[${this.manifest.name}] RDF universe loaded (15 quads, 4 subjects)`);
  }

  public run(): void {
    if (this.config === undefined || this.store === undefined) {
      throw new Error('[GraphApp] App not initialized — call init() first');
    }
    this.status = { state: 'RUNNING', startedAt: Date.now() };

    const store = this.store;
    const appName = this.manifest.name;

    // Build a typed SELECT via the DSL builder; TVars is inferred as
    // 'universe' | 'label' | 'dim' from the select() args at compile time.
    const query = select('universe', 'label', 'dim')
      .where(
        triple(v('universe'), rdf('type'), `<${ALEPH}Universe>`),
        triple(v('universe'), rdfs('label'), v('label')),
        triple(v('universe'), `<${ALEPH}dimension>`, v('dim')),
      )
      .build();

    console.log(`\n[${appName}] Executing typed SPARQL query:\n${query}\n`);

    // `tap` (per-row logging) + `toArray` (new operator: collects all rows
    // before the terminal subscribe fires, demonstrating stream aggregation).
    runQuery(store, query)
      .pipe(
        tap((row) => {
          console.log(`  [binding] universe=${row.universe.value}  label=${row.label.value}  dim=${row.dim.value}`);
        }),
        toArray(),
      )
      .subscribe({
        next: (rows) => {
          console.log(`\n[${appName}] Query complete — ${rows.length} solution(s).`);
          this.status = { state: 'STOPPED' };
        },
        error: (err: unknown) => {
          const error = err instanceof Error ? err : new Error(String(err));
          this.status = { state: 'FAILED', error };
          console.error(`[${appName}] Query failed:`, error.message);
        },
      });
  }

  public isRunning(): this is App<GraphConfig, 'graph', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}

export const graphApp = new GraphApp() satisfies App<GraphConfig, 'graph', '1.0.0'>;
