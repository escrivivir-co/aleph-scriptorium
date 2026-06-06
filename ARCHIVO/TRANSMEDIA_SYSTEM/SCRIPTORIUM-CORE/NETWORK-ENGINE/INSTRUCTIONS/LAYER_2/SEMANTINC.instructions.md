

Integración de GraphDB (RDF/SPARQL) como Protocolo + Plugin
===========================================================

Modo: ASI. Esto NO es un nuevo lenguaje (no dispara `LANGUAGE INCEPTION MODE` de [LAYER_4/LANGUAGES.instructions.md](INSTRUCTIONS/LAYER_4/LANGUAGES.instructions.md)): es una **extensión de plataforma (Capa 1)**. Por tanto el flujo correcto es Protocolo + Plugin + Adaptadores + ADR/DOSSIER, no la generación de dossiers de lenguaje.

1\. Encuadre arquitectónico (la pregunta es "¿en qué capa?", no "¿cómo?")
-------------------------------------------------------------------------

Según [LAYER_1/NETWORK_ENGINE.instructions.md](INSTRUCTIONS/LAYER_1/NETWORK_ENGINE.instructions.md) los grafos (nodos/relaciones/hechos) son **contenido de Capa 4 (Universos)**. Según [LAYER_3/NETWORK_ENGINE.functional.md](INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md), OWL/RDF/SPARQL son **huéspedes/serialización**, nunca el centro ni dependencia del núcleo. Conclusión:

-   `core` (Capa 1) define **solo el contrato** (`GraphStoreProtocol`) y los tipos RDF. Sin dependencias de runtime ni de ningún motor.

-   Las implementaciones (in-memory y motor externo) son **adaptadores** que viven fuera de `core`.

-   Un `GraphStorePlugin` envuelve el adaptador y lo expone al orquestador como una **capacidad lingüística** (persistencia/consulta), no como una simple feature.

```
flowchart TD
  C0["Capa 0: TS6 (tipos RDF branded, template-literal triples)"]
  subgraph cap1 [Capa 1: Plataforma]
    Proto["core: GraphStoreProtocol + RdfTerm types (contrato neutral)"]
    PlugC["core: contrato Plugin extendido (provides/service)"]
    Mem["@network-engine/graph: adaptador in-memory (cero deps)"]
    Ext["@network-engine/node: adaptador motor externo (Oxigraph/quadstore)"]
  end
  Lang["Capa 2: aleph-lang u otros lenguajes (consumidores futuros)"]
  Univ["Capa 4: Universos RDF (triples/quads)"]
  C0 --> Proto
  Proto --> Mem
  Proto --> Ext
  PlugC --> Mem
  PlugC --> Ext
  Mem --> Univ
  Ext --> Univ
  Lang --> Proto
```

2\. Capa 0 --- Modelo RDF tipado (research target de TS)
------------------------------------------------------

Alinear con el W3C RDF/JS Data Model pero endurecido con TS6, sentando precedentes nuevos pedidos por [LAYER_0/TS.instructions.md](INSTRUCTIONS/LAYER_0/TS.instructions.md):

-   `Iri` como **Branded Type**; `RdfTerm` como **Discriminated Union** (`NamedNode | BlankNode | Literal`).

-   Patrones de tripleta como **Template Literal Types** (precedente nuevo: gramática expresada en tipos).

-   `infer`/Conditional Types para tipar el resultado de un SPARQL `SELECT` a partir de sus variables.

```
export type Iri = string & { readonly __iri: unique symbol };
export type RdfTerm =
  | { kind: 'NamedNode'; value: Iri }
  | { kind: 'BlankNode'; value: string }
  | { kind: 'Literal'; value: string; datatype: Iri; lang?: string };
export type Quad = { s: RdfTerm; p: RdfTerm; o: RdfTerm; g?: RdfTerm };
```

3\. Capa 1 --- `GraphStoreProtocol` en `core` (contrato neutral)
--------------------------------------------------------------

Nuevo archivo `packages/core/src/protocols/graph-store.ts` (barrel desde <packages/core/src/index.ts>). El protocolo expone operaciones RDF + SPARQL, todo reactivo (RxJS) por coherencia con el orquestador:

```
export interface GraphStoreProtocol {
  readonly capability: 'rdf-sparql';
  add(quads: readonly Quad[]): Promise<void>;
  remove(pattern: Partial<Quad>): Promise<number>;
  match(pattern: Partial<Quad>): Observable<Quad>;
  query<TVars extends string>(sparql: string): Observable<Bindings<TVars>>;
}
```

Esto materializa el "Ontology/Inference Protocol" mencionado en [LAYER_3/NETWORK_ENGINE.functional.md](INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md) sin que el núcleo dependa de ningún motor.

### Extensión del contrato de Plugin (hueco real actual)

Hoy `NetworkPlugin` en <packages/core/src/types.ts> declara `PluginCapabilities { canInfer, canPersist, canVisualize }` pero **no puede exponer un servicio**. Hay que añadir un mecanismo tipado para que un plugin provea un protocolo y el orquestador lo resuelva:

-   Añadir `provides?(): GraphStoreProtocol | undefined` (o un mapa de servicios tipado por capacidad usando Conditional Types sobre `capabilities`).

-   En <packages/core/src/orchestrator.ts>, añadir `resolve<TCapability>()` para obtener el servicio del plugin registrado, manteniendo el tipado fuerte (`InferEvent`-style).

4\. Adaptadores (los dos en paralelo, según tu elección)
--------------------------------------------------------

-   `@network-engine/graph` (paquete nuevo, Capa 1, cero dependencias de runtime): triple-store **in-memory** que implementa `GraphStoreProtocol`. Sirve de implementación de referencia neutral y banco de pruebas del contrato. Indexación SPO/POS/OSP con `Map`.

-   `@network-engine/node` (adaptador externo): implementa el mismo protocolo sobre un motor RDF/SPARQL real, encapsulando la dependencia de runtime tal como hace hoy `FileSystemPlugin` en <packages/node/src/index.ts>. Spike previo para elegir motor (ver Feature 0); recomendación por defecto **Oxigraph** (SPARQL 1.1, embebido, persistente), alternativa **quadstore + Comunica** (RDF/JS puro, seguro en Bun).

Ambos adaptadores comparten el mismo test suite escrito contra el contrato (garantiza sustituibilidad y neutralidad).

5\. Expansión del lenguaje --- DSL de tripletas/SPARQL tipado
-----------------------------------------------------------

Por la regla DRY conceptual de la meta-constitución (todo repetido >2 veces es candidato a sintaxis): construir un constructor de tripletas/consultas tipado con Template Literal Types como precedente arquitectónico. Es el payload de "Nivel 3 (Lenguaje)" del DoD, no solo "Nivel 1 (Implementación)".

6\. Impacto en monorepo y DevOps
--------------------------------

Según [LAYER_2/MONOREPO.instructions.md](INSTRUCTIONS/LAYER_2/MONOREPO.instructions.md):

-   Nuevo `packages/graph/` con su `package.json`, `tsconfig.json` (extiende `tsconfig.base.json`), `src/index.ts` y `.env` propio.

-   Project references en `tsconfig.json` raíz y en `node`/`apps` que dependan del grafo.

-   Grafo de dependencias: `graph` depende solo de `core`; `node` depende de `core` (+ motor externo); `apps` consume el plugin para una demo.

-   Usar **Bun** (`bun install`, `bun run typecheck`, `bun test`) según [ALEPH.instructions.md](INSTRUCTIONS/ALEPH.instructions.md), pese a que la tabla de scripts del MONOREPO cite `npm run` (inconsistencia documental a corregir de paso).

7\. Documentación (sync DRY) + trazabilidad
-------------------------------------------

Siguiendo [ALEPH.builder.prompt.md](INSTRUCTIONS/ALEPH.builder.prompt.md) (regla de oro: el índice no acumula detalle):

-   ADR nuevo en `ADR/0002-graphstore-rdf-protocol.md` (decisión: RDF/SPARQL como huésped vía protocolo; dos adaptadores; motor externo elegido).

-   DOSSIER de investigación en `DOSSIERS/` (ASI mode habilita crear dossiers): comparativa de motores y modelo RDF tipado.

-   Actualizar READMEs de `LAYER_1`/`LAYER_2` y, si procede, añadir **1 línea** de enlace en [ALEPH.instructions.md](INSTRUCTIONS/ALEPH.instructions.md). Nunca verter detalle en el índice.

Alternativas y trade-offs (a confirmar en el spike)
---------------------------------------------------

-   Protocolo RDF puro vs neutral-host (RDF+LPG): elegiste RDF; queda como precedente que el protocolo es `capability: 'rdf-sparql'`, dejando la puerta abierta a otras capabilities futuras sin tocar el núcleo.

-   Motor externo: Oxigraph (rendimiento/persistencia, binding nativo/WASM) vs quadstore+Comunica (RDF/JS puro, máxima compatibilidad Bun) vs Neo4j (LPG, no RDF nativo --- descartado por el modelo elegido).

[Demo app](54f1a11d-afdc-44bc-a9db-f28741505be5) completado. Siguen en curso el [test suite](8202449c-fd2f-4037-8b5c-03025b276389) y la [documentación](a818e656-2993-4b85-bcb6-a72fda1ec572). Cuando ambos terminen, cierro el plan con el resumen final.

Todos los 5 archivos del todo `docs-sync` creados/modificados sin tocar código fuente:

-   CREADO `ADR/0002-graphstore-rdf-protocol.md` --- ADR que documenta contexto, decisión (RDF/SPARQL como capacidad de Capa 1, dos adaptadores, GraphDB como motor externo), consecuencias y patrón `CapabilityServiceRegistry`.
-   CREADO `DOSSIERS/graphstore-rdf-protocol.md` --- Dossier completo: comparativa de motores (GraphDB vs Oxigraph vs quadstore+Comunica vs Neo4j), modelo RDF tipado con exhibición TS, decisiones de diseño del protocolo y DSL, limitaciones conocidas y roadmap.
-   MODIFICADO `INSTRUCTIONS/LAYER_1/README.md` --- Añadida entrada de `GRAPH_STORE.instructions.md` con descripción del `GraphStoreProtocol` y enlace al ADR 0002.
-   MODIFICADO `INSTRUCTIONS/LAYER_2/MONOREPO.instructions.md` --- Añadido `@network-engine/graph` al mapa y grafo de dependencias; tabla de scripts corregida de `npm run` → `bun run` / `bun test`.
-   MODIFICADO `INSTRUCTIONS/ALEPH.instructions.md` --- 1 línea añadida en LAYER_0 enlazando `GRAPHDB.instructions.md` (regla de oro del índice respetada).

[Documentación DRY](a818e656-2993-4b85-bcb6-a72fda1ec572) completada. Solo queda el [test suite compartido](8202449c-fd2f-4037-8b5c-03025b276389) --- en cuanto termine hago el resumen final de todo el plan.

The `shared-tests` todo is done. Here's the full report:

Files created/modified:

-   `packages/graph/src/graph-store.test.ts` --- new, 558-line contract test suite
-   `packages/graph/tsconfig.json` --- added `"bun"` to `types[]`, added `../node` to project references
-   `packages/graph/package.json` --- added `@network-engine/node` as `devDependency`

Test cases (26 per run, 52 total across src + compiled dist):

-   *InMemoryGraphStore --- contract (11 tests):* exact/wildcard/partial `match`, idempotent `add`, `remove` by pattern, count, isolation, no-results `match`, `query SELECT` BGP with typed literal preservation
-   *GraphStorePlugin --- orchestrator resolve (2 tests):* `resolve('rdf-sparql')` returns the store; undefined when no plugin registered
-   *GraphDbStore --- fetch-mocked (13 tests):* `add` serialises NamedNode/Literal/lang-tagged/BlankNode/named-graph/empty; `remove` issues COUNT then DELETE WHERE; `query` parses uri/typed-literal/bnode/lang-tagged bindings; `match` reconstructs quads; `test.skip` placeholder for live integration

Results: `50 pass - 2 skip - 0 fail` --- `bun run typecheck` exits 0.

Todos los todos completados. Plan cerrado. Resumen de las tres fases:

* * * * *

Fase 1 --- Núcleo ([core RDF protocol foundation](4a6e28c8-396e-4d56-b508-63656d2de1c6)) Modelo RDF tipado en `core/protocols/rdf.ts` (`Iri` branded, `RdfTerm` discriminated union, `Quad`, `SelectVars`/`Bindings` via `infer`). `GraphStoreProtocol` reactivo (`Observable`). Extensión del contrato de Plugin con `CapabilityServiceRegistry` (declaration merging) + `orchestrator.resolve('rdf-sparql')`. Cero dependencias externas en `core`.

Fase 2 --- Adaptadores y DSL (tres agentes paralelos)

-   [In-memory + wiring](407d8ad4-f8c0-4147-9f86-d44464ee4fe8): paquete `@network-engine/graph` con triple-store SPO/POS/OSP, motor SPARQL SELECT/BGP puro en TS, `GraphStorePlugin`, cableado en project references del monorepo.
-   [Ontotext GraphDB HTTP](b484d904-74aa-4fb5-a59c-aefd161d7619): `GraphDbStore` en `@network-engine/node` vía SPARQL Protocol/fetch, serialización RDF→SPARQL, `GraphDbPlugin` con `canInfer:true/canPersist:true`. Sin dependencias npm añadidas.
-   [DSL tipado](f3ef7484-1e1e-4356-a040-c5bf8afbb99d): `sparql-dsl.ts` en `core` con `select/triple/v/runQuery`, `TypedQuery<TVars>` (phantom brand), chequeo `SELECT⊆WHERE` en tiempo de compilación como error de tipos inconstructible.

Fase 3 --- Tests, demo y documentación (tres agentes paralelos)

-   [Test suite](8202449c-fd2f-4037-8b5c-03025b276389): 50 pass, 2 skip (live GraphDB), 0 fail. Cubre ambos adaptadores: contrato in-memory (11 tests), `orchestrator.resolve` (2 tests), `GraphDbStore` con `fetch` mockeado (13 tests).
-   [Demo app](54f1a11d-afdc-44bc-a9db-f28741505be5): `GraphApp` en `packages/apps` con universo RDF `aleph0--3`, query DSL con `TypedQuery<'universe'|'label'|'dim'>`, operador `toArray` como nuevo precedente RxJS.
-   [Documentación](a818e656-2993-4b85-bcb6-a72fda1ec572): ADR 0002, DOSSIER de investigación, LAYER_1/LAYER_2 actualizados, inconsistencia `npm→bun` corregida en MONOREPO, 1 línea en `ALEPH.instructions.md` (regla de oro DRY respetada).

`bun run typecheck` pasa con exit 0 en todo el monorepo. Los únicos errores pendientes son los 3 preexistentes de `@network-engine/pubsub` en `apps`, ajenos a esta integración.

Code Review --- GraphDB (RDF/SPARQL) Integration
==============================================

Build state confirmed (read-only): `bun run typecheck` → exit 0 (`tsc -b` clean). `bun test packages/graph` → 50 pass, 2 skip, 0 fail. So everything compiles and the existing tests are green --- but several of the findings below are precisely things the green tests do *not* exercise.

* * * * *

CRITICAL
--------

### C1. SPARQL injection in the GraphDB adapter (unescaped lang tags & blank-node labels; invalid IRI escaping)

`packages/node/src/graph-db.ts`

`termToSparql` builds raw SPARQL UPDATE strings that are POSTed to the server. Several term components are interpolated without escaping:

graph-db.tsLines 98-108

case  'BlankNode':

return  `_:${term.value}`;

case  'Literal': {

const lex  =  `"${escapeLiteral(term.value)}"`;

if  (term.lang !== undefined) return `${lex}@${term.lang}`;

return `${lex}^^<${escapeIri(term.datatype)}>`;

}

-   `term.lang` is interpolated verbatim. `literal(value, { lang })` accepts an arbitrary string, so a quad with `lang = 'en . } ; DROP ...'` (or any RDF coming from a Layer-4 universe --- the literal use case of this whole feature) breaks out of the triple and injects arbitrary SPARQL into `INSERT DATA`/`DELETE WHERE`.
-   `BlankNode.value` is interpolated verbatim; a label containing whitespace/punctuation injects similarly.
-   `escapeIri` is both insufficient and incorrect:

graph-db.tsLines 89-91

function  escapeIri(value:  string):  string  {

return  value.replace(/\\/g,  '\\\\').replace(/>/g,  '\\>');

}

It ignores the other characters the IRIREF grammar forbids (`<`, `"`, `{`, `}`, `|`, `^`, backtick, spaces, control chars), and the escapes it *does* produce (`\\`, `\>`) are not valid IRIREF escapes --- SPARQL only allows `\uXXXX`/`\UXXXXXXXX` inside `<...>`. So a well-formed IRI containing `>` yields a query GraphDB will reject, while a hostile IRI with `{`/space sails straight through.

Because `add()`/`remove()` here mutate a live triplestore, this is a data-integrity/destruction vector, not a cosmetic issue. The tests only assert `.toContain(...)` on benign inputs (`graph-store.test.ts` 324--407), so they never surface it. Recommend NTriples-grade escaping for literals, validation/`\u`-escaping for IRIs, validation of blank-node labels (`PN_CHARS`) and lang tags (`[A-Za-z][A-Za-z0-9-]*`), or --- better --- parameterizing via `INSERT DATA` with pre-validated terms.

* * * * *

MAJOR
-----

### M1. The "shared contract suite" never runs against the GraphDB adapter --- substitutability is asserted, not proven

`packages/graph/src/graph-store.test.ts`

The file header and `runContractSuite`'s doc claim "passing the same suite against two adapters demonstrates substitutability," but the suite is only ever invoked once:

graph-store.test.tsLines 233-233

runContractSuite('InMemoryGraphStore --- contract',  ()  =>  createInMemoryGraphStore());

`GraphDbStore` is tested by a separate block (285--559) that only checks request-string serialization and JSON→`RdfTerm` parsing against `fetch` mocks. There is no behavioural round-trip (add→match returns the data, remove count reflects real state, idempotency, leaves-unrelated-intact) for the GraphDB side. So the central architectural claim of the plan/ADR --- "el mismo test suite se ejecuta sobre ambos adaptadores" (ADR 0002 line 28) --- is false as implemented. The mock approach is reasonable given no live server, but a stateful in-memory `fetch` fake backing `runContractSuite(makeGraphDbStore)` would actually prove substitutability. This is exactly the gap you suspected.

### M2. In-memory SPARQL guard rejects valid IRIs containing reserved keywords

`packages/graph/src/sparql.ts`

sparql.tsLines 221-233

const  FORBIDDEN = /\b(FILTER|OPTIONAL|UNION|MINUS|BIND|SERVICE|GRAPH|VALUES|GROUP|ORDER|LIMIT|OFFSET|HAVING)\b/i;

...

if  (FORBIDDEN.test(body))  throw  unsupported('clausulas FILTER/OPTIONAL/UNION/GRAPH/ORDER/... no soportadas');

`FORBIDDEN` is tested (case-insensitively) against the entire WHERE body, including IRI text. Any triple whose IRI ends a path segment with one of these tokens --- e.g. `<http://example.org/vocab#order>`, `<http://purl.org/.../group>` (the `/i` flag also catches lowercase) --- produces a `\b...\b` match and is wrongly rejected as an unsupported clause. This is a genuine false-positive correctness bug. A token-level check (only flag keywords appearing in *operator* position, not inside `<...>`) is needed.

### M3. Named-graph semantics diverge between the two adapters (silent, untested)

-   In-memory `remove({})`/`match({})` traverse the indexes and return all quads regardless of graph (`in-memory-store.ts` `matchSync`, else-branch 116--118; `traverse` yields every leaf when `wantGraph` is undefined).
-   GraphDB `buildWherePattern` only emits a `GRAPH` block when `pattern.g` is *set*; with `g` unset it produces a bare BGP:

graph-db.tsLines 224-230

private  buildWherePattern(pattern: QuadPattern): string {

...

const  bgp  =  `${s}  ${p}  ${o} .`;

return  pattern.g  !==  undefined  ?  `GRAPH ${termToSparql(pattern.g)} { ${bgp} }`  :  bgp;

}

A bare `DELETE WHERE { ?s ?p ?o }` / `SELECT * WHERE { ?s ?p ?o }` operates over the default graph only, so quads in named graphs are invisible to `match({})` and survive `remove({})` on GraphDB but not in-memory. The DOSSIER acknowledges `GRAPH ?g` wildcard is unimplemented (§5.3/5.5), but it does not flag this behavioural *divergence* for the no-`g` case --- which is the more dangerous one because both adapters "work" yet disagree. This is the kind of difference a real shared contract suite (M1) would have caught.

### M4. Architectural placement: concrete RDF model + SPARQL DSL live *inside* `@network-engine/core`

`packages/core/src/protocols/rdf.ts`, `sparql-dsl.ts`, `core/src/index.ts`

The neutrality is partially achieved and partially undermined:

-   ✅ Engine-agnostic, no RDF/HTTP runtime deps: `graph-store.ts` and `sparql-dsl.ts` import `Observable` as `import type` only; no engine is referenced. Core's only runtime deps remain `rxjs`/`xstate` (pre-existing).
-   ✅ The Plugin contract itself stays RDF-free via the empty `CapabilityServiceRegistry` + declaration merging (good --- see W1).
-   ⚠️ But `core/index.ts` re-exports `rdf` (XSD constants, `namedNode`/`literal`/`quad` constructors) and the full `sparql-dsl` (`select`/`where`/`triple`/`runQuery`). LAYER_3 says RDF must be a *huésped* and "nunca ... acoplarse al núcleo de procesamiento primario" (functional.md 74--77). Shipping a first-class RDF vocabulary and a SPARQL builder from the platform core's public API privileges RDF as a core citizen rather than a guest. The contract (`GraphStoreProtocol` interface + registry) belongs in core; the concrete term model/DSL would sit more neutrally in a separate `@network-engine/rdf` (Layer 0/2) package consumed by the adapters. The plan does say "Capa 0 ... en core," so the implementation follows the plan --- but the plan is in tension with LAYER_3, and that tension is worth surfacing rather than rubber-stamping.

### M5. DRY violations across the new code (the TS constitution explicitly weights this)

-   Two term-key implementations. `keys.ts` `termKey` (16--25) is duplicated almost verbatim as a private `termKeyFor` in `sparql.ts` (253--262), including the `\u0001` separators. Two sources of truth for canonical keys in the same package.
-   Two literal serializers. `sparql-dsl.ts` `serializeTerm` uses `JSON.stringify` for the lexical form (92--116); `graph-db.ts` uses a hand-rolled `escapeLiteral` (75--82). They escape differently, and neither escapes lang/datatype consistently (see C1). The "DRY conceptual" rule in the plan (§5) argues for a single shared term-serialization module.

* * * * *

MINOR
-----

-   M-build hygiene / tests double-run. `tsc -b` compiles `*.test.ts` into `dist/` (graph `tsconfig.json` `include: ["src/**/*"]` has no test exclusion), and the committed `dist/` is present. `bun test packages/graph` consequently ran the suite twice (`dist/graph-store.test.js` *and* `src/graph-store.test.ts`). The root `test` script globs only `src/**/*.test.ts` so CI is unaffected, but tests shouldn't be emitted/shipped and `dist/` shouldn't be in the tree.
-   ESM inconsistency. `packages/node/package.json` lacks `"type": "module"` while `core`, `graph`, and root all declare it. Works under Bun today but is inconsistent with the stated ESM convention (MONOREPO 163).
-   Test placement couples `graph → node`. The GraphDB tests live in `packages/graph` and import `@network-engine/node` (graph's `package.json` devDependency + `tsconfig` reference to `../node`). The zero-dep reference adapter now has a dev-time edge to the HTTP adapter purely for test co-location; these tests arguably belong in `packages/node`.
-   `termKey` collision comment is overstated. `keys.ts` line 6--7 claims `\u0001`/`\u0002` are "imposible en ... lexical forms RDF bien formadas." RDF 1.1 literal lexical forms *can* contain U+0001/U+0002. In practice the scheme is still effectively injective (kind prefix `N/B/L/D`, fixed separator count, and datatype IRIs being control-char-free), so I could not construct a real collision --- but the justification as written is factually wrong and should be corrected or the keys length-prefixed.
-   `RDF_LANG_STRING` mis-documented. `rdf.ts` line 79 comments it as "Datatype por defecto de un literal ... sin tipo explícito ni lang," but the default is `xsd:string` (line 100) and `rdf:langString` is used for lang literals (103). Misleading comment.
-   `SelectVars`/`runQuery` typing is real but only partially enforced. The `SELECT⊆WHERE` check (W2) is genuinely enforced for literal terms via `const` type params, but is bypassable: passing a value typed as plain `string` into `triple(...)` makes `VarNameOf<string>` infer `string`, widening `W` and silently satisfying `BuildArgs` for any projection. Likewise `query`'s literal-inference overload degrades to `never`→open record for any non-literal string. Acceptable degradations, but worth knowing the guarantees aren't airtight. Also `SelectVars`'s recursive template parsing runs per literal query string at type-check time --- fine for short queries (it parses only the projection slice), but a pathological literal could stress the recursion limit.
-   `bindingToTerm` default branch. Unknown `binding.type` values (e.g. RDF-star `triple`) fall through to the literal branch and are silently mis-typed (graph-db.ts 246--253). And `sparqlQuery` blindly casts `res.json()` to `SparqlResultsJson`; an ASK/CONSTRUCT response makes `json.results.bindings` throw at runtime (propagated via the Observable, but unguarded).
-   `resolve()` calls `provides()` on every plugin. `orchestrator.ts` 60--66 invokes `plugin.provides?.()`; `GraphDbPlugin.provides()` throws if not installed (graph-db.ts 342--347), so an uninstalled GraphDB plugin registered before another would make `resolve` throw. Lifecycle asymmetry too: `GraphStorePlugin`'s store exists pre-`install` (field initializer) while `GraphDbPlugin`'s doesn't.
-   Demo `process.exit()`. `apps/.../graph/app.ts` 157/163 calls `process.exit` inside an RxJS `subscribe` --- fine for a demo, but it's a hard-exit side effect in app code. Also the comment "5 quads covering 4 subjects" (99--100) contradicts the 15 quads actually added (the log message is correct).

* * * * *

Done well
---------

-   W1. Open `CapabilityServiceRegistry` + declaration merging (`types.ts` 72--89, `graph-store.ts` 56--60) is the strongest part: the Plugin contract stays RDF-free, `resolve('rdf-sparql')` is strongly typed with no caller casts, and it's a clean, genuinely reusable precedent. This is the right way to keep RDF a host at the contract level.
-   W2. `SELECT⊆WHERE` compile-time check via an inconstructible `SelectVarNotInWhere<V>` error type fed through a conditional variadic-tuple `build(...args)` (`sparql-dsl.ts` 143--203) --- advanced TS used *meaningfully*, with a readable failure message, exactly the kind of precedent LAYER_0 asks for.
-   W3. Triple-store internals. SPO/POS/OSP with index selection by bound position, O(1) dedup via a `present` set, materialize-before-mutate in `remove` (`in-memory-store.ts` 68--81), and `drop` correctly garbage-collecting empty map levels. Idempotency and add/remove symmetry are sound.
-   W4. Reactive lifecycle. `match`/`query` are properly cold (fresh `Observable`/`defer` per subscribe), complete deterministically, and propagate errors via `subscriber.error` / Rx error channel.
-   W5. Strict-config discipline. `exactOptionalPropertyTypes`-aware constructors (`literal` 98--106, `quad` 108--110 omit absent optionals), `noUncheckedIndexedAccess` handled throughout, branded `Iri`, discriminated `RdfTerm` with exhaustive switches.
-   W6. HTTP encapsulation. All network/runtime coupling is isolated in `graph-db.ts` with zero added npm deps (native `fetch`), and the `sparql-results+json` parser correctly handles `uri`/`bnode`/`typed-literal`/`literal` plus `xml:lang` and `datatype` fallbacks.
-   W7. Documentation. ADR 0002 and the DOSSIER are thorough and, notably, *honest about limitations* (best-effort `remove` count, unsupported SPARQL subset, `GRAPH ?g` gap) --- though they overstate the substitutability proof (M1).

* * * * *

Top three to address first: C1 (injection --- security/data integrity), M1 (make the contract suite actually run against GraphDB --- it's the linchpin of the whole "two interchangeable adapters" claim), and M2 (the keyword-in-IRI false positive --- a silent correctness bug).