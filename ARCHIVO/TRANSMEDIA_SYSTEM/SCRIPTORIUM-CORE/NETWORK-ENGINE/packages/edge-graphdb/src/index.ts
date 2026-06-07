/**
 * Adaptador de motor externo: implementa {@link GraphStoreProtocol} hablando con
 * un repositorio **Ontotext GraphDB** sobre el **W3C SPARQL 1.1 Protocol** (HTTP).
 *
 * Toda la dependencia de runtime (red) queda ENCAPSULADA aquí, igual que
 * `FileSystemPlugin` aísla `fs`. No se añade ninguna dependencia npm: se usa el
 * `fetch` global (Node 18+/Bun), strings SPARQL construidos a mano y el parseo
 * del formato estándar `application/sparql-results+json`. El núcleo permanece
 * neutral: este archivo es el único punto que conoce HTTP/GraphDB.
 */

import {
  type GraphStoreProtocol,
  type Quad,
  type QuadPattern,
  type RdfTerm,
  type Bindings,
  type SelectVars,
  type NetworkPlugin,
  type LanguageSemantics,
  type PluginCapabilities,
  PluginId,
  namedNode,
  blankNode,
  literal,
  createIri,
  quad,
  termToSparql,
} from '@network-engine/core';
import { Observable, defer, from, map, mergeMap } from 'rxjs';

// ============================================================================
// Configuración
// ============================================================================

/**
 * Conexión a un repositorio GraphDB. Las URLs por defecto siguen la convención
 * REST de RDF4J (que GraphDB implementa):
 *  - consultas:      `${endpoint}/repositories/${repository}`
 *  - actualizaciones:`${endpoint}/repositories/${repository}/statements`
 * Se permite sobreescribir el endpoint de actualización (p.ej. proxies).
 */
export type GraphDbConfig = {
  readonly endpoint: string;
  readonly repository: string;
  readonly updateEndpoint?: string;
  readonly username?: string;
  readonly password?: string;
};

// ============================================================================
// Forma del JSON de resultados SPARQL (application/sparql-results+json)
// ============================================================================

/** Un término en la respuesta SPARQL JSON (modelo W3C / RDF-JS clásico). */
interface SparqlResultBinding {
  readonly type: string; // 'uri' | 'literal' | 'typed-literal' | 'bnode'
  readonly value: string;
  readonly datatype?: string;
  readonly 'xml:lang'?: string;
}

interface SparqlResultsJson {
  readonly head: { readonly vars?: readonly string[] };
  readonly results: { readonly bindings: ReadonlyArray<Record<string, SparqlResultBinding>> };
}

// ============================================================================
// Serialización de términos RDF -> sintaxis SPARQL/Turtle
// ============================================================================
//
// La serialización (y su escapado/validación seguro frente a inyección SPARQL)
// vive en `@network-engine/core` (`termToSparql`), única fuente de verdad que
// comparten este adaptador y el DSL tipado. Ver `core/protocols/rdf-serialize`.

// ============================================================================
// GraphDbStore — adaptador HTTP del protocolo
// ============================================================================

export class GraphDbStore implements GraphStoreProtocol {
  public readonly capability = 'rdf-sparql' as const;

  private readonly queryUrl: string;
  private readonly updateUrl: string;
  private readonly authHeader: Readonly<Record<string, string>>;

  constructor(config: GraphDbConfig) {
    const base = config.endpoint.replace(/\/+$/, '');
    this.queryUrl = `${base}/repositories/${config.repository}`;
    this.updateUrl = config.updateEndpoint ?? `${this.queryUrl}/statements`;
    this.authHeader =
      config.username !== undefined
        ? { Authorization: `Basic ${btoa(`${config.username}:${config.password ?? ''}`)}` }
        : {};
  }

  // --------------------------------------------------------------------------
  // Operaciones del protocolo
  // --------------------------------------------------------------------------

  /** Inserta quads vía `INSERT DATA { ... }`; agrupa por grafo nombrado. */
  public async add(quads: readonly Quad[]): Promise<void> {
    if (quads.length === 0) return;

    const defaultTriples: string[] = [];
    const namedGraphs = new Map<string, string[]>();

    for (const q of quads) {
      const triple = `${termToSparql(q.s)} ${termToSparql(q.p)} ${termToSparql(q.o)} .`;
      if (q.g === undefined) {
        defaultTriples.push(triple);
      } else {
        const gKey = termToSparql(q.g);
        const bucket = namedGraphs.get(gKey) ?? [];
        bucket.push(triple);
        namedGraphs.set(gKey, bucket);
      }
    }

    const blocks = [...defaultTriples];
    for (const [g, triples] of namedGraphs) {
      blocks.push(`GRAPH ${g} { ${triples.join(' ')} }`);
    }

    await this.sparqlUpdate(`INSERT DATA { ${blocks.join(' ')} }`);
  }

  /**
   * Elimina los quads que casan con el patrón vía `DELETE WHERE { ... }`.
   *
   * GraphDB/RDF4J no devuelven un recuento de filas afectadas en el SPARQL
   * Protocol, así que el conteo es *best-effort*: ejecutamos antes un
   * `SELECT (COUNT(*) AS ?count)` sobre el mismo patrón. Si esa consulta falla
   * (o el patrón no es determinable) devolvemos `0` sin abortar el borrado.
   */
  public async remove(pattern: QuadPattern): Promise<number> {
    const where = this.buildWherePattern(pattern);

    let affected = 0;
    try {
      const json = await this.sparqlQuery(`SELECT (COUNT(*) AS ?count) WHERE { ${where} }`);
      const first = json.results.bindings[0];
      const countBinding = first?.['count'];
      if (countBinding !== undefined) {
        affected = Number.parseInt(countBinding.value, 10) || 0;
      }
    } catch {
      affected = 0;
    }

    await this.sparqlUpdate(this.buildDeleteUpdate(pattern));
    return affected;
  }

  /** Stream reactivo de quads que casan con el patrón (posiciones ausentes = variables). */
  public match(pattern: QuadPattern): Observable<Quad> {
    const where = this.buildWherePattern(pattern);
    const sparql = `SELECT * WHERE { ${where} }`;
    return defer(() => from(this.sparqlQuery(sparql))).pipe(
      mergeMap((json) => from(json.results.bindings)),
      map((row) => {
        // Las posiciones fijadas en el patrón se reusan tal cual; las ausentes
        // se reconstruyen desde su variable homónima (`?s`/`?p`/`?o`).
        const s = pattern.s ?? this.bindingToTerm(row['s']);
        const p = pattern.p ?? this.bindingToTerm(row['p']);
        const o = pattern.o ?? this.bindingToTerm(row['o']);
        if (pattern.g !== undefined) return quad(s, p, o, pattern.g);
        // `g` sin fijar ⇒ semántica de UNIÓN (todos los grafos). Si la fila trae
        // `?g` (rama `GRAPH ?g` de la unión) reconstruimos el grafo nombrado;
        // su ausencia indica el grafo por defecto.
        const gBinding = row['g'];
        const g = gBinding !== undefined ? this.bindingToTerm(gBinding) : undefined;
        return g !== undefined ? quad(s, p, o, g) : quad(s, p, o);
      }),
    );
  }

  public query<const Q extends string>(sparql: Q): Observable<Bindings<SelectVars<Q>>>;
  public query<TVars extends string = never>(sparql: string): Observable<Bindings<TVars>>;
  public query(sparql: string): Observable<Readonly<Record<string, RdfTerm>>> {
    return defer(() => from(this.sparqlQuery(sparql))).pipe(
      mergeMap((json) => from(json.results.bindings)),
      map((row) => this.rowToBindings(row)),
    );
  }

  // --------------------------------------------------------------------------
  // Construcción de patrones
  // --------------------------------------------------------------------------

  /** BGP `S P O .` del patrón: cada posición ausente es su variable homónima. */
  private bgp(pattern: QuadPattern): string {
    const s = pattern.s !== undefined ? termToSparql(pattern.s) : '?s';
    const p = pattern.p !== undefined ? termToSparql(pattern.p) : '?p';
    const o = pattern.o !== undefined ? termToSparql(pattern.o) : '?o';
    return `${s} ${p} ${o} .`;
  }

  /**
   * Traduce un {@link QuadPattern} al cuerpo de un `WHERE` (para `SELECT`).
   *
   * Semántica de grafo nombrado (acordada con el adaptador in-memory de
   * referencia): si `g` está fijado, el BGP se envuelve en `GRAPH <g> { ... }`;
   * si `g` está SIN fijar, se interpreta como **unión de todos los grafos**
   * (por defecto + nombrados), `{ BGP } UNION { GRAPH ?g { BGP } }`, igual que
   * `InMemoryGraphStore.match({})` recorre todos los grafos.
   */
  private buildWherePattern(pattern: QuadPattern): string {
    const bgp = this.bgp(pattern);
    if (pattern.g !== undefined) return `GRAPH ${termToSparql(pattern.g)} { ${bgp} }`;
    return `{ ${bgp} } UNION { GRAPH ?g { ${bgp} } }`;
  }

  /**
   * Construye el `SPARQL UPDATE` de borrado coherente con la semántica de unión.
   * Con `g` fijado basta el `DELETE WHERE` abreviado dentro del `GRAPH`. Con `g`
   * sin fijar hay que borrar en TODOS los grafos: como el `DELETE WHERE`
   * abreviado no admite `UNION` ni reusar `?g`, se emiten dos operaciones —
   * (1) cada grafo nombrado vía `DELETE { GRAPH ?g {…} } WHERE { GRAPH ?g {…} }`
   * (borra exactamente las coincidencias por su `?g`), y (2) el grafo por
   * defecto vía `DELETE WHERE { BGP }`.
   */
  private buildDeleteUpdate(pattern: QuadPattern): string {
    const bgp = this.bgp(pattern);
    if (pattern.g !== undefined) {
      return `DELETE WHERE { GRAPH ${termToSparql(pattern.g)} { ${bgp} } }`;
    }
    return `DELETE { GRAPH ?g { ${bgp} } } WHERE { GRAPH ?g { ${bgp} } } ; DELETE WHERE { ${bgp} }`;
  }

  // --------------------------------------------------------------------------
  // Parseo de resultados SPARQL JSON -> RdfTerm
  // --------------------------------------------------------------------------

  /** Mapea un término del JSON de resultados al {@link RdfTerm} del núcleo. */
  private bindingToTerm(binding: SparqlResultBinding | undefined): RdfTerm {
    if (binding === undefined) {
      throw new Error('[GraphDbStore] missing expected SPARQL binding in result row');
    }
    switch (binding.type) {
      case 'uri':
        return namedNode(binding.value);
      case 'bnode':
        return blankNode(binding.value);
      case 'literal':
      case 'typed-literal': {
        const lang = binding['xml:lang'];
        if (lang !== undefined && lang !== '') return literal(binding.value, { lang });
        if (binding.datatype !== undefined) return literal(binding.value, createIri(binding.datatype));
        return literal(binding.value);
      }
      default:
        // Tipos no soportados por el modelo del núcleo (p.ej. `triple` de
        // RDF-star). Mejor fallar explícito que degradar silenciosamente a
        // literal (lo que produciría términos incorrectos aguas abajo).
        throw new Error(
          `[GraphDbStore] unsupported SPARQL binding type ${JSON.stringify(binding.type)} (value=${JSON.stringify(binding.value)})`,
        );
    }
  }

  /** Convierte una fila de bindings JSON en la forma `Record<var, RdfTerm>`. */
  private rowToBindings(row: Record<string, SparqlResultBinding>): Readonly<Record<string, RdfTerm>> {
    const out: Record<string, RdfTerm> = {};
    for (const key of Object.keys(row)) {
      out[key] = this.bindingToTerm(row[key]);
    }
    return out;
  }

  // --------------------------------------------------------------------------
  // Transporte HTTP (único punto acoplado al runtime)
  // --------------------------------------------------------------------------

  private async sparqlQuery(sparql: string): Promise<SparqlResultsJson> {
    const res = await fetch(this.queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        Accept: 'application/sparql-results+json',
        ...this.authHeader,
      },
      body: sparql,
    });
    if (!res.ok) {
      throw new Error(`[GraphDbStore] SPARQL query failed: ${res.status} ${res.statusText}`);
    }
    const json = (await res.json()) as unknown;
    // Sólo se soportan resultados SELECT (`application/sparql-results+json`).
    // Una respuesta ASK (`{ "boolean": ... }`) o CONSTRUCT/DESCRIBE (cuerpo RDF)
    // no expone `results.bindings`; fallamos con un mensaje claro en vez de
    // lanzar un `TypeError` opaco al acceder a `json.results.bindings`.
    if (
      typeof json !== 'object' ||
      json === null ||
      !('results' in json) ||
      typeof (json as { results: unknown }).results !== 'object' ||
      (json as { results: unknown }).results === null ||
      !Array.isArray((json as { results: { bindings?: unknown } }).results.bindings)
    ) {
      throw new Error(
        '[GraphDbStore] unexpected SPARQL response shape: expected SELECT results with results.bindings[] (application/sparql-results+json). ASK/CONSTRUCT/DESCRIBE are not supported by this protocol.',
      );
    }
    return json as SparqlResultsJson;
  }

  private async sparqlUpdate(update: string): Promise<void> {
    const res = await fetch(this.updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-update',
        ...this.authHeader,
      },
      body: update,
    });
    if (!res.ok) {
      throw new Error(`[GraphDbStore] SPARQL update failed: ${res.status} ${res.statusText}`);
    }
  }
}

// ============================================================================
// Factory + Plugin
// ============================================================================

/** Crea un {@link GraphDbStore} directamente (uso sin orquestador). */
export function createGraphDbStore(config: GraphDbConfig): GraphDbStore {
  return new GraphDbStore(config);
}

/**
 * Plugin que expone un repositorio GraphDB como servicio `'rdf-sparql'`.
 * Mismo ciclo de vida `install(options)` que `FileSystemPlugin`: el store se
 * construye al instalar. GraphDB hace razonamiento + persistencia, por eso
 * `canInfer`/`canPersist` son `true` y `canVisualize` es `false`.
 */
export class GraphDbPlugin<TSemantics extends LanguageSemantics<any, any> = LanguageSemantics<any, any>>
  implements NetworkPlugin<TSemantics, GraphDbConfig, 'rdf-sparql'>
{
  public readonly id = 'node-graphdb-store' as PluginId;
  public readonly capabilities: PluginCapabilities = {
    canInfer: true,
    canPersist: true,
    canVisualize: false,
  };

  private installed = false;
  private store: GraphDbStore | undefined;

  public install<const TOptions extends GraphDbConfig>(options: TOptions): void {
    console.log('[Node] Initializing GraphDB store with options:', {
      endpoint: options.endpoint,
      repository: options.repository,
    });
    this.store = new GraphDbStore(options);
    this.installed = true;
  }

  public isInstalled(): this is NetworkPlugin<TSemantics, GraphDbConfig, 'rdf-sparql'> & { installed: true } {
    return this.installed;
  }

  public provides(): GraphStoreProtocol {
    if (this.store === undefined) {
      throw new Error('[GraphDbPlugin] not installed; call install(config) before provides()');
    }
    return this.store;
  }
}
