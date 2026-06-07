/**
 * Contract test suite for GraphStoreProtocol.
 *
 * Guarantees substitutability: the SAME behavioural contract suite
 * (`runContractSuite`) is executed against BOTH adapters and genuinely proves
 * the round-trip — not just serialisation:
 *
 *   1. `InMemoryGraphStore` — the zero-dependency reference adapter.
 *   2. `GraphDbStore` — driven through a **stateful fetch fake** that backs the
 *      real adapter. The fake intercepts `globalThis.fetch`, parses the outgoing
 *      SPARQL UPDATE/QUERY just enough to drive an internal `InMemoryGraphStore`,
 *      and returns `application/sparql-results+json`. So `add → match`, `remove`
 *      counts, idempotency, empty results and named-graph union semantics all
 *      flow through the actual `GraphDbStore` code (its SPARQL generation, HTTP
 *      envelope and JSON binding parsing) against live, mutable state.
 *
 * Approach (per the plan's accepted simpler alternative): the fake delegates all
 * quad storage/matching to an `InMemoryGraphStore` and ONLY translates the
 * SPARQL ⇄ quad-op request and the SPARQL-JSON response envelope. This keeps the
 * fake small while still exercising the adapter end-to-end.
 *
 * A real live integration against Ontotext GraphDB (default :7200) remains a
 * skipped placeholder, since CI has no GraphDB server.
 */

import { describe, test, expect, beforeEach, beforeAll, afterAll, mock } from 'bun:test';
import { Observable } from 'rxjs';
import {
  namedNode,
  literal,
  blankNode,
  quad,
  xsd,
  createIri,
  type GraphStoreProtocol,
  type LanguageSemantics,
  type Quad,
  type QuadPattern,
  type RdfTerm,
  NetworkOrchestrator,
} from '@network-engine/core';
import { createMachine } from 'xstate';
import { InMemoryGraphStore, GraphStorePlugin, createInMemoryGraphStore } from '@network-engine/graphdb';
import { GraphDbStore } from './index';

// ============================================================================
// Utility: collect all emissions from an Observable into a Promise<T[]>
// ============================================================================

function collect<T>(obs: Observable<T>): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const items: T[] = [];
    obs.subscribe({
      next: (v) => items.push(v),
      error: reject,
      complete: () => resolve(items),
    });
  });
}

// ============================================================================
// Shared contract suite — runs against any GraphStoreProtocol implementation
// ============================================================================

/**
 * Runs the canonical contract test cases against a store factory.
 * Passing the same suite against two adapters demonstrates substitutability.
 */
function runContractSuite(
  label: string,
  makeStore: () => GraphStoreProtocol,
): void {
  describe(label, () => {
    let store: GraphStoreProtocol;

    beforeEach(() => {
      store = makeStore();
    });

    // ── add + match roundtrip ──────────────────────────────────────────────

    describe('add + match roundtrip', () => {
      test('exact s/p/o match returns added quad', async () => {
        const s = namedNode('http://ex/subject');
        const p = namedNode('http://ex/predicate');
        const o = literal('hello');
        await store.add([quad(s, p, o)]);

        const results = await collect(store.match({ s, p }));

        expect(results).toHaveLength(1);
        expect(results[0]!.s).toEqual(s);
        expect(results[0]!.o).toEqual(o);
      });

      test('wildcard: empty pattern returns all quads', async () => {
        const s = namedNode('http://ex/s');
        const p = namedNode('http://ex/p');
        await store.add([quad(s, p, literal('a')), quad(s, p, literal('b'))]);

        const results = await collect(store.match({}));

        expect(results).toHaveLength(2);
      });

      test('partial: match by predicate only returns matching quads', async () => {
        const type = namedNode('http://ex/type');
        await store.add([
          quad(namedNode('http://ex/a'), type, namedNode('http://ex/Person')),
          quad(namedNode('http://ex/b'), type, namedNode('http://ex/Organization')),
          quad(namedNode('http://ex/c'), namedNode('http://ex/other'), namedNode('http://ex/val')),
        ]);

        const results = await collect(store.match({ p: type }));

        expect(results).toHaveLength(2);
      });

      test('partial: match by object term', async () => {
        const target = namedNode('http://ex/Person');
        const type = namedNode('http://ex/type');
        await store.add([
          quad(namedNode('http://ex/alice'), type, target),
          quad(namedNode('http://ex/bob'), type, namedNode('http://ex/Agent')),
        ]);

        const results = await collect(store.match({ o: target }));

        expect(results).toHaveLength(1);
        expect(results[0]!.s).toEqual(namedNode('http://ex/alice'));
      });

      test('add is idempotent: duplicate quads not double-counted', async () => {
        const q = quad(namedNode('http://ex/s'), namedNode('http://ex/p'), literal('v'));
        await store.add([q, q]);
        await store.add([q]);

        const results = await collect(store.match({}));

        expect(results).toHaveLength(1);
      });
    });

    // ── remove ────────────────────────────────────────────────────────────

    describe('remove', () => {
      test('remove by subject pattern returns correct count', async () => {
        const s = namedNode('http://ex/s');
        const p = namedNode('http://ex/p');
        await store.add([
          quad(s, p, literal('a')),
          quad(s, p, literal('b')),
          quad(namedNode('http://ex/other'), p, literal('c')),
        ]);

        const count = await store.remove({ s });

        expect(count).toBe(2);
      });

      test('removed quads no longer appear in match', async () => {
        const s = namedNode('http://ex/s');
        const p = namedNode('http://ex/p');
        await store.add([quad(s, p, literal('gone'))]);

        await store.remove({ s });
        const remaining = await collect(store.match({ s }));

        expect(remaining).toHaveLength(0);
      });

      test('remove by subject leaves unrelated quads intact', async () => {
        const s = namedNode('http://ex/s');
        const other = namedNode('http://ex/other');
        const p = namedNode('http://ex/p');
        await store.add([
          quad(s, p, literal('remove-me')),
          quad(other, p, literal('keep-me')),
        ]);

        await store.remove({ s });
        const remaining = await collect(store.match({}));

        expect(remaining).toHaveLength(1);
        expect(remaining[0]!.s).toEqual(other);
      });
    });

    // ── named graphs (union semantics for unset g) ─────────────────────────

    describe('named graphs', () => {
      const s = namedNode('http://ex/s');
      const p = namedNode('http://ex/p');
      const g1 = namedNode('http://ex/g1');

      test('unset g matches the union of default + named graphs', async () => {
        await store.add([
          quad(s, p, literal('in-default')),
          quad(s, p, literal('in-g1'), g1),
        ]);

        const all = await collect(store.match({}));
        expect(all).toHaveLength(2);

        // The union reconstructs the named-graph term where present; the
        // default-graph quad reports no `g`.
        const named = all.filter((q) => q.g !== undefined);
        const dflt = all.filter((q) => q.g === undefined);
        expect(named).toHaveLength(1);
        expect(named[0]!.g).toEqual(g1);
        expect(dflt).toHaveLength(1);
      });

      test('fixed g matches only that graph', async () => {
        await store.add([
          quad(s, p, literal('in-default')),
          quad(s, p, literal('in-g1'), g1),
        ]);

        const g1quads = await collect(store.match({ g: g1 }));
        expect(g1quads).toHaveLength(1);
        expect(g1quads[0]!.o).toEqual(literal('in-g1'));
      });

      test('unset g removes across all graphs', async () => {
        await store.add([
          quad(s, p, literal('in-default')),
          quad(s, p, literal('in-g1'), g1),
        ]);

        const removed = await store.remove({ s });
        expect(removed).toBe(2);

        const remaining = await collect(store.match({}));
        expect(remaining).toHaveLength(0);
      });
    });

    // ── match with no results ─────────────────────────────────────────────

    test('match on non-existent pattern completes with 0 items', async () => {
      await store.add([
        quad(namedNode('http://ex/s'), namedNode('http://ex/p'), literal('val')),
      ]);

      const results = await collect(store.match({ s: namedNode('http://ex/nowhere') }));

      expect(results).toHaveLength(0);
    });

    // ── query SELECT ──────────────────────────────────────────────────────

    describe('query SELECT', () => {
      test('basic BGP returns bindings typed as RdfTerm', async () => {
        const s = namedNode('http://ex/s');
        await store.add([
          quad(s, namedNode('http://ex/name'), literal('Alice')),
          quad(s, namedNode('http://ex/age'), literal('30', xsd.integer)),
        ]);

        const rows = await collect(
          store.query('SELECT ?p ?o WHERE { <http://ex/s> ?p ?o }'),
        );

        expect(rows.length).toBe(2);
        for (const row of rows) {
          expect(row['p']!.kind).toBe('NamedNode');
        }
      });

      test('SELECT with typed literal preserves datatype', async () => {
        const s = namedNode('http://ex/s');
        await store.add([quad(s, namedNode('http://ex/count'), literal('42', xsd.integer))]);

        const rows = await collect(
          store.query('SELECT ?o WHERE { <http://ex/s> <http://ex/count> ?o }'),
        );

        expect(rows).toHaveLength(1);
        const o = rows[0]!['o']!;
        expect(o.kind).toBe('Literal');
        if (o.kind === 'Literal') {
          expect(o.value).toBe('42');
          // Iri is a branded string; widen to plain string for .toBe comparison
          expect(String(o.datatype)).toBe(String(xsd.integer));
        }
      });
    });
  });
}

// ============================================================================
// 1. InMemoryGraphStore — full contract suite (zero dependencies, no HTTP)
// ============================================================================

runContractSuite('InMemoryGraphStore — contract', () => createInMemoryGraphStore());

// ============================================================================
// 1b. GraphDbStore — SAME contract suite via a stateful fetch fake
//
// The fake (`makeFakeFetch`) parses the SPARQL the adapter emits just enough to
// drive a backing InMemoryGraphStore, and serialises the result back as SPARQL
// JSON. This runs the adapter's REAL code against live mutable state.
// ============================================================================

type FakeBinding = {
  type: 'uri' | 'bnode' | 'literal';
  value: string;
  datatype?: string;
  'xml:lang'?: string;
};

/** RdfTerm → SPARQL-JSON binding (inverse of the adapter's `bindingToTerm`). */
function termToBinding(term: RdfTerm): FakeBinding {
  switch (term.kind) {
    case 'NamedNode':
      return { type: 'uri', value: String(term.value) };
    case 'BlankNode':
      return { type: 'bnode', value: term.value };
    case 'Literal':
      return term.lang !== undefined
        ? { type: 'literal', value: term.value, 'xml:lang': term.lang }
        : { type: 'literal', value: term.value, datatype: String(term.datatype) };
  }
}

/** Reverse of the N-Triples escaping the core serializer produces. */
function unescapeLiteral(raw: string): string {
  return raw.replace(
    /\\u([0-9A-Fa-f]{4})|\\U([0-9A-Fa-f]{8})|\\([\s\S])/g,
    (_m, u4: string | undefined, u8: string | undefined, esc: string | undefined) => {
      if (u4 !== undefined) return String.fromCodePoint(parseInt(u4, 16));
      if (u8 !== undefined) return String.fromCodePoint(parseInt(u8, 16));
      switch (esc) {
        case 'n': return '\n';
        case 'r': return '\r';
        case 't': return '\t';
        case 'b': return '\b';
        case 'f': return '\f';
        default: return esc ?? '';
      }
    },
  );
}

/** Splits a SPARQL fragment into atomic term tokens (keeps <…>, "…", braces). */
function tokenizeTerms(input: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i]!;
    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
      i += 1;
      continue;
    }
    if (ch === '<') {
      const end = input.indexOf('>', i);
      if (end === -1) throw new Error('[fake] unterminated IRI');
      out.push(input.slice(i, end + 1));
      i = end + 1;
      continue;
    }
    if (ch === '"') {
      let j = i + 1;
      while (j < input.length) {
        if (input[j] === '\\') { j += 2; continue; }
        if (input[j] === '"') break;
        j += 1;
      }
      let end = j + 1;
      const rest = input.slice(end);
      const lang = /^@[A-Za-z0-9-]+/.exec(rest);
      const dt = /^\^\^<[^>]*>/.exec(rest);
      if (lang) end += lang[0].length;
      else if (dt) end += dt[0].length;
      out.push(input.slice(i, end));
      i = end;
      continue;
    }
    let j = i;
    while (j < input.length && ![' ', '\t', '\n', '\r'].includes(input[j]!)) j += 1;
    out.push(input.slice(i, j));
    i = j;
  }
  return out;
}

/** Parses a single SPARQL term token into an RdfTerm. */
function parseSparqlTerm(tok: string): RdfTerm {
  if (tok.startsWith('<') && tok.endsWith('>')) return namedNode(tok.slice(1, -1));
  if (tok.startsWith('_:')) return blankNode(tok.slice(2));
  if (tok.startsWith('"')) {
    const m = /^"((?:[^"\\]|\\[\s\S])*)"(?:@([A-Za-z0-9-]+)|\^\^<([^>]*)>)?$/.exec(tok);
    if (!m) throw new Error(`[fake] malformed literal: ${tok}`);
    const value = unescapeLiteral(m[1] ?? '');
    if (m[2] !== undefined) return literal(value, { lang: m[2] });
    if (m[3] !== undefined) return literal(value, createIri(m[3]));
    return literal(value);
  }
  throw new Error(`[fake] unsupported term: ${tok}`);
}

/** `?x`/`$x`/undefined ⇒ wildcard (undefined); otherwise a concrete term. */
function parseTermOrWildcard(tok: string | undefined): RdfTerm | undefined {
  if (tok === undefined || tok.startsWith('?') || tok.startsWith('$')) return undefined;
  return parseSparqlTerm(tok);
}

/** Extracts the s/p/o/g QuadPattern from a WHERE/DELETE body the adapter emits. */
function parseQuadPattern(body: string): QuadPattern {
  const afterWhere = /\bWHERE\b([\s\S]*)$/i.exec(body);
  const region = afterWhere ? afterWhere[1]! : body;
  const tokens = tokenizeTerms(region);
  let g: RdfTerm | undefined;
  const triple: string[] = [];
  for (let i = 0; i < tokens.length && triple.length < 3; i += 1) {
    const t = tokens[i]!;
    if (t === '{' || t === '}' || t === '.' || t === ';' || t.toUpperCase() === 'UNION') continue;
    if (t.toUpperCase() === 'GRAPH') {
      const next = tokens[i + 1];
      if (next && next.startsWith('<') && next.endsWith('>')) g = namedNode(next.slice(1, -1));
      i += 1; // skip the graph term (concrete <iri> or ?g)
      continue;
    }
    triple.push(t);
  }
  const pattern: { -readonly [K in 's' | 'p' | 'o' | 'g']?: RdfTerm } = {};
  const s = parseTermOrWildcard(triple[0]);
  const p = parseTermOrWildcard(triple[1]);
  const o = parseTermOrWildcard(triple[2]);
  if (s) pattern.s = s;
  if (p) pattern.p = p;
  if (o) pattern.o = o;
  if (g) pattern.g = g;
  return pattern;
}

/** Parses a flat list of `s p o .` triples (optionally in a named graph). */
function parseTriples(fragment: string, g: RdfTerm | undefined): Quad[] {
  const terms = tokenizeTerms(fragment).filter((t) => t !== '.');
  const quads: Quad[] = [];
  for (let i = 0; i + 3 <= terms.length; i += 3) {
    const s = parseSparqlTerm(terms[i]!);
    const p = parseSparqlTerm(terms[i + 1]!);
    const o = parseSparqlTerm(terms[i + 2]!);
    quads.push(g !== undefined ? quad(s, p, o, g) : quad(s, p, o));
  }
  return quads;
}

/** Parses `INSERT DATA { <default triples> GRAPH <g> { … } … }`. */
function parseInsertData(body: string): Quad[] {
  const inner = body.replace(/^\s*INSERT\s+DATA\s*\{/i, '').replace(/\}\s*$/, '');
  const quads: Quad[] = [];
  for (const m of inner.matchAll(/GRAPH\s+<([^>]+)>\s*\{([^}]*)\}/g)) {
    quads.push(...parseTriples(m[2]!, namedNode(m[1]!)));
  }
  const defaultPart = inner.replace(/GRAPH\s+<[^>]+>\s*\{[^}]*\}/g, ' ');
  quads.push(...parseTriples(defaultPart, undefined));
  return quads;
}

/** Builds a fetch fake bound to a (lazily-resolved) backing in-memory store. */
function makeFakeFetch(getBacking: () => InMemoryGraphStore): typeof globalThis.fetch {
  return (async (_url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const backing = getBacking();
    const body = typeof init?.body === 'string' ? init.body : '';
    const contentType = new Headers(init?.headers as HeadersInit | undefined).get('Content-Type') ?? '';

    // ── UPDATE (INSERT DATA / DELETE …) ────────────────────────────────────
    if (contentType.includes('sparql-update')) {
      if (/^\s*INSERT\s+DATA/i.test(body)) {
        await backing.add(parseInsertData(body));
      } else if (/\bDELETE\b/i.test(body)) {
        await backing.remove(parseQuadPattern(body));
      } else {
        throw new Error(`[fake] unsupported update: ${body}`);
      }
      return new Response(null, { status: 204 });
    }

    // ── QUERY ──────────────────────────────────────────────────────────────
    if (/^\s*SELECT\s*\(\s*COUNT/i.test(body)) {
      const matches = await collect(backing.match(parseQuadPattern(body)));
      return jsonResponse({
        head: { vars: ['count'] },
        results: { bindings: [{ count: { type: 'literal', value: String(matches.length) } }] },
      });
    }
    if (/^\s*SELECT\s+\*/i.test(body)) {
      const quads = await collect(backing.match(parseQuadPattern(body)));
      const bindings = quads.map((q) => {
        const row: Record<string, FakeBinding> = {
          s: termToBinding(q.s),
          p: termToBinding(q.p),
          o: termToBinding(q.o),
        };
        if (q.g !== undefined) row['g'] = termToBinding(q.g);
        return row;
      });
      return jsonResponse({ head: { vars: ['s', 'p', 'o', 'g'] }, results: { bindings } });
    }
    // General `SELECT ?vars WHERE { BGP }` ⇒ delegate to the backing evaluator.
    const rows = await collect(backing.query(body));
    const bindings = rows.map((row) => {
      const out: Record<string, FakeBinding> = {};
      for (const key of Object.keys(row)) out[key] = termToBinding((row as Record<string, RdfTerm>)[key]!);
      return out;
    });
    return jsonResponse({ head: { vars: [] }, results: { bindings } });
  }) as typeof globalThis.fetch;
}

function jsonResponse(json: unknown): Response {
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: { 'Content-Type': 'application/sparql-results+json' },
  });
}

describe('GraphDbStore — fetch-backed (full contract via stateful fake)', () => {
  let originalFetch: typeof globalThis.fetch;
  let backing: InMemoryGraphStore;

  beforeAll(() => {
    originalFetch = globalThis.fetch;
    globalThis.fetch = makeFakeFetch(() => backing);
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  runContractSuite('GraphDbStore — contract', () => {
    backing = new InMemoryGraphStore();
    return new GraphDbStore({ endpoint: 'http://fake.local', repository: 'contract' });
  });
});

// ============================================================================
// 1c. SPARQL parser — M2 token-level reserved-keyword guard
// ============================================================================

describe('SPARQL parser — token-level reserved-keyword guard (M2)', () => {
  test('accepts an IRI whose local name contains a reserved keyword', async () => {
    const store = createInMemoryGraphStore();
    const s = namedNode('http://ex/s');
    const orderProp = namedNode('http://example.org/vocab#order');
    await store.add([quad(s, orderProp, literal('v'))]);

    const rows = await collect(
      store.query('SELECT ?o WHERE { <http://ex/s> <http://example.org/vocab#order> ?o }'),
    );

    expect(rows).toHaveLength(1);
    expect(rows[0]!['o']!.kind).toBe('Literal');
  });

  test('still rejects a real GRAPH keyword token', async () => {
    const store = createInMemoryGraphStore();
    await expect(
      collect(store.query('SELECT ?s WHERE { GRAPH ?g { ?s ?p ?o } }')),
    ).rejects.toThrow(/no soportad/i);
  });
});

// ============================================================================
// 2. GraphStorePlugin — resolve via NetworkOrchestrator
// ============================================================================

describe('GraphStorePlugin — resolve via NetworkOrchestrator', () => {
  test('resolve("rdf-sparql") returns the registered store', () => {
    // Minimal XState machine — the orchestrator only needs a valid state machine
    // to manage its internal actor; the machine states are irrelevant to resolve().
    const trivialMachine = createMachine({
      id: 'test-machine',
      initial: 'idle',
      states: { idle: {} },
    });

    const orchestrator = new NetworkOrchestrator<LanguageSemantics<any, any>>(trivialMachine);
    const plugin = new GraphStorePlugin<LanguageSemantics<any, any>>();
    plugin.install({});
    orchestrator.registerPlugin(plugin as Parameters<typeof orchestrator.registerPlugin>[0]);

    const resolved = orchestrator.resolve('rdf-sparql');

    expect(resolved).toBeDefined();
    expect(resolved!.capability).toBe('rdf-sparql');
  });

  test('resolve returns undefined when no plugin provides the capability', () => {
    const trivialMachine = createMachine({
      id: 'test-empty',
      initial: 'idle',
      states: { idle: {} },
    });

    const orchestrator = new NetworkOrchestrator<LanguageSemantics<any, any>>(trivialMachine);

    const resolved = orchestrator.resolve('rdf-sparql');

    expect(resolved).toBeUndefined();
  });
});

// ============================================================================
// 3. GraphDbStore — fetch-mocked tests (no live server)
//
// Full contract integration is SKIPPED because GraphDbStore requires a running
// Ontotext GraphDB HTTP endpoint (default localhost:7200).  Instead we verify:
//   a) Correct SPARQL serialisation of terms (INSERT DATA, DELETE WHERE bodies)
//   b) Correct parsing of SPARQL JSON results into RdfTerm bindings
// by intercepting globalThis.fetch with bun:test mock().
// ============================================================================

describe('GraphDbStore — fetch-mocked (serialisation + binding parsing)', () => {
  const cfg = { endpoint: 'http://localhost:7200', repository: 'test' };

  // Helper: capture the request bodies sent to fetch and return a fixed response.
  function mockFetchUpdate(status = 204): { captured: string[]; restore: () => void } {
    const captured: string[] = [];
    const original = globalThis.fetch;
    globalThis.fetch = mock(
      async (_url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        if (typeof init?.body === 'string') captured.push(init.body);
        return new Response(null, { status });
      },
    ) as unknown as typeof globalThis.fetch;
    return { captured, restore: () => { globalThis.fetch = original; } };
  }

  function mockFetchJson(json: unknown): { restore: () => void } {
    const original = globalThis.fetch;
    globalThis.fetch = mock(
      async (): Promise<Response> => {
        return new Response(JSON.stringify(json), {
          status: 200,
          headers: { 'Content-Type': 'application/sparql-results+json' },
        });
      },
    ) as unknown as typeof globalThis.fetch;
    return { restore: () => { globalThis.fetch = original; } };
  }

  // ── Live integration placeholder ────────────────────────────────────────

  test.skip('live integration (requires running GraphDB at localhost:7200)', () => {
    // Intentionally skipped: needs a live GraphDB instance.
    // To run: set GRAPHDB_ENDPOINT and GRAPHDB_REPOSITORY env vars and
    // implement an integration harness in a separate *-live.test.ts file.
  });

  // ── SPARQL serialisation — add ──────────────────────────────────────────

  test('add: NamedNode terms serialised as <iri> in INSERT DATA', async () => {
    const { captured, restore } = mockFetchUpdate();
    try {
      const store = new GraphDbStore(cfg);
      await store.add([
        quad(namedNode('http://ex/s'), namedNode('http://ex/p'), namedNode('http://ex/o')),
      ]);
      expect(captured).toHaveLength(1);
      expect(captured[0]).toContain('INSERT DATA');
      expect(captured[0]).toContain('<http://ex/s>');
      expect(captured[0]).toContain('<http://ex/p>');
      expect(captured[0]).toContain('<http://ex/o>');
    } finally {
      restore();
    }
  });

  test('add: Literal terms serialised with ^^<datatype>', async () => {
    const { captured, restore } = mockFetchUpdate();
    try {
      const store = new GraphDbStore(cfg);
      await store.add([
        quad(namedNode('http://ex/s'), namedNode('http://ex/p'), literal('42', xsd.integer)),
      ]);
      expect(captured[0]).toContain('"42"^^<http://www.w3.org/2001/XMLSchema#integer>');
    } finally {
      restore();
    }
  });

  test('add: lang-tagged literals serialised as "value"@lang', async () => {
    const { captured, restore } = mockFetchUpdate();
    try {
      const store = new GraphDbStore(cfg);
      await store.add([
        quad(namedNode('http://ex/s'), namedNode('http://ex/p'), literal('Hola', { lang: 'es' })),
      ]);
      expect(captured[0]).toContain('"Hola"@es');
    } finally {
      restore();
    }
  });

  test('add: BlankNode terms serialised as _:label', async () => {
    const { captured, restore } = mockFetchUpdate();
    try {
      const store = new GraphDbStore(cfg);
      await store.add([
        quad(blankNode('node1'), namedNode('http://ex/p'), literal('val')),
      ]);
      expect(captured[0]).toContain('_:node1');
    } finally {
      restore();
    }
  });

  test('add: named graph wraps triples in GRAPH block', async () => {
    const { captured, restore } = mockFetchUpdate();
    try {
      const store = new GraphDbStore(cfg);
      await store.add([
        quad(
          namedNode('http://ex/s'),
          namedNode('http://ex/p'),
          namedNode('http://ex/o'),
          namedNode('http://ex/myGraph'),
        ),
      ]);
      expect(captured[0]).toContain('GRAPH <http://ex/myGraph>');
    } finally {
      restore();
    }
  });

  test('add: empty array is a no-op (no fetch call)', async () => {
    const { captured, restore } = mockFetchUpdate();
    try {
      const store = new GraphDbStore(cfg);
      await store.add([]);
      expect(captured).toHaveLength(0);
    } finally {
      restore();
    }
  });

  // ── SPARQL serialisation — remove ──────────────────────────────────────

  test('remove: issues COUNT query then DELETE WHERE with subject pattern', async () => {
    const captured: string[] = [];
    let call = 0;
    const original = globalThis.fetch;
    globalThis.fetch = mock(
      async (_url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        call++;
        if (typeof init?.body === 'string') captured.push(init.body);
        if (call === 1) {
          // COUNT query — return count = 2
          return new Response(
            JSON.stringify({
              head: { vars: ['count'] },
              results: { bindings: [{ count: { type: 'literal', value: '2' } }] },
            }),
            { status: 200, headers: { 'Content-Type': 'application/sparql-results+json' } },
          );
        }
        return new Response(null, { status: 204 });
      },
    ) as unknown as typeof globalThis.fetch;

    try {
      const store = new GraphDbStore(cfg);
      const count = await store.remove({ s: namedNode('http://ex/s') });

      expect(count).toBe(2);
      expect(captured[0]).toMatch(/COUNT/i);
      expect(captured[1]).toContain('DELETE WHERE');
      expect(captured[1]).toContain('<http://ex/s>');
    } finally {
      globalThis.fetch = original;
    }
  });

  // ── SPARQL result parsing ───────────────────────────────────────────────

  test('query: uri bindings parsed as NamedNode', async () => {
    const { restore } = mockFetchJson({
      head: { vars: ['p'] },
      results: {
        bindings: [{ p: { type: 'uri', value: 'http://ex/name' } }],
      },
    });
    try {
      const store = new GraphDbStore(cfg);
      const rows = await collect(store.query('SELECT ?p WHERE { <http://ex/s> ?p ?o }'));
      expect(rows).toHaveLength(1);
      expect(rows[0]!['p']!.kind).toBe('NamedNode');
      if (rows[0]!['p']!.kind === 'NamedNode') {
        // Iri is a branded string; widen to plain string for .toBe comparison
        expect(String(rows[0]!['p']!.value)).toBe('http://ex/name');
      }
    } finally {
      restore();
    }
  });

  test('query: literal bindings parsed as Literal with datatype', async () => {
    const { restore } = mockFetchJson({
      head: { vars: ['o'] },
      results: {
        bindings: [
          {
            o: {
              type: 'typed-literal',
              value: '42',
              datatype: 'http://www.w3.org/2001/XMLSchema#integer',
            },
          },
        ],
      },
    });
    try {
      const store = new GraphDbStore(cfg);
      const rows = await collect(store.query('SELECT ?o WHERE { <http://ex/s> <http://ex/count> ?o }'));
      expect(rows).toHaveLength(1);
      const o = rows[0]!['o']!;
      expect(o.kind).toBe('Literal');
      if (o.kind === 'Literal') {
        expect(o.value).toBe('42');
        // Iri is a branded string; widen to plain string for .toBe comparison
        expect(String(o.datatype)).toBe('http://www.w3.org/2001/XMLSchema#integer');
      }
    } finally {
      restore();
    }
  });

  test('query: bnode bindings parsed as BlankNode', async () => {
    const { restore } = mockFetchJson({
      head: { vars: ['s'] },
      results: { bindings: [{ s: { type: 'bnode', value: 'b0' } }] },
    });
    try {
      const store = new GraphDbStore(cfg);
      const rows = await collect(store.query('SELECT ?s WHERE { ?s <http://ex/p> ?o }'));
      expect(rows).toHaveLength(1);
      expect(rows[0]!['s']!.kind).toBe('BlankNode');
    } finally {
      restore();
    }
  });

  test('query: lang-tagged literal bindings carry lang tag', async () => {
    const { restore } = mockFetchJson({
      head: { vars: ['o'] },
      results: {
        bindings: [{ o: { type: 'literal', value: 'Hola', 'xml:lang': 'es' } }],
      },
    });
    try {
      const store = new GraphDbStore(cfg);
      const rows = await collect(store.query('SELECT ?o WHERE { <http://ex/s> <http://ex/p> ?o }'));
      const o = rows[0]!['o']!;
      expect(o.kind).toBe('Literal');
      if (o.kind === 'Literal') {
        expect(o.lang).toBe('es');
      }
    } finally {
      restore();
    }
  });

  test('match: reconstructs quads from SPARQL JSON bindings', async () => {
    const { restore } = mockFetchJson({
      head: { vars: ['s', 'p', 'o'] },
      results: {
        bindings: [
          {
            s: { type: 'uri', value: 'http://ex/s' },
            p: { type: 'uri', value: 'http://ex/p' },
            o: { type: 'literal', value: 'hello' },
          },
        ],
      },
    });
    try {
      const store = new GraphDbStore(cfg);
      const quads = await collect(store.match({}));
      expect(quads).toHaveLength(1);
      expect(quads[0]!.s.kind).toBe('NamedNode');
      expect(quads[0]!.p.kind).toBe('NamedNode');
      expect(quads[0]!.o.kind).toBe('Literal');
    } finally {
      restore();
    }
  });
});

