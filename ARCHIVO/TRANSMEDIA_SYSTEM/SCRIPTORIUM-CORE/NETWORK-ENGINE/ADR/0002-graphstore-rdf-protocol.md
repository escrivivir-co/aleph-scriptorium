# ADR 0002: GraphStoreProtocol — RDF/SPARQL como capacidad lingüística de Capa 1

## Estado

Aceptado.

## Contexto

### ¿Por qué un protocolo de grafo RDF?

La arquitectura de capas de Network-Engine ([LAYER_1/NETWORK_ENGINE.instructions.md](../INSTRUCTIONS/LAYER_1/NETWORK_ENGINE.instructions.md)) define que la Capa 1 (Plataforma) provee contratos y mecanismos de extensión sin lógica específica de ningún lenguaje derivado. La constitución funcional ([LAYER_3/NETWORK_ENGINE.functional.md](../INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md)) establece que OWL, RDF y SPARQL son **huéspedes**, no dependencias conceptuales del núcleo.

Sin embargo, la plataforma necesita poder **hospedar** sistemas de inferencia semántica, ontologías y universos RDF en Capa 4 (Universos). Esto requiere un mecanismo tipado, swappable y reactivo para operar sobre grafos de tripletas/quads.

La alternativa de acoplar directamente un motor RDF al núcleo violaría la neutralidad ontológica. La alternativa de no ofrecer ninguna abstracción obligaría a cada lenguaje derivado (Capa 2) a resolver el problema de forma ad hoc, rompiendo la coherencia de la plataforma.

### ¿Por qué vive el contrato en `core`?

`@network-engine/core` es el paquete de Capa 1 sin dependencias de runtime. Depositar ahí el **contrato** (interface + tipos) — y solo el contrato — mantiene al núcleo agnóstico al motor concreto. Cualquier consumidor (lenguaje derivado, app, test suite) puede referenciar `GraphStoreProtocol` sin importar nada de red, ficheros ni motores externos.

### ¿Por qué dos adaptadores?

Se decidió mantener dos implementaciones paralelas del mismo protocolo:

1. **`@network-engine/graph`**: adaptador in-memory de referencia (cero dependencias de runtime). Permite testear contra el contrato sin infraestructura externa y sirve de banco de pruebas del diseño.
2. **`@network-engine/node`** (`GraphDbPlugin`/`GraphDbStore`): adaptador HTTP contra un motor externo real (Ontotext GraphDB), encapsulando la dependencia de red igual que `FileSystemPlugin` encapsula `fs`.

La existencia de ambos garantiza sustituibilidad verificable: el **mismo** contract suite (`runContractSuite`) se ejecuta sobre ambos adaptadores. Para el adaptador GraphDB —que requeriría un servidor HTTP— el suite corre a través de un **fake de `fetch` con estado** que parsea el SPARQL emitido por el adaptador y lo respalda con un `InMemoryGraphStore`, de modo que `add → match`, conteos de `remove`, idempotencia, resultados vacíos y semántica de grafos nombrados atraviesan el código real del `GraphDbStore` contra estado mutable (ver [§Verificación de sustituibilidad](#verificación-de-sustituibilidad-contract-suite-sobre-ambos-adaptadores)).

### Motor externo elegido: Ontotext GraphDB

Tras el spike de investigación (Feature 0 del plan `graphdb-rdf-protocol`), se eligió **Ontotext GraphDB** sobre las alternativas consideradas (Oxigraph, quadstore + Comunica) por:

- Implementación completa de **W3C SPARQL 1.1 Protocol** y **RDF4J** framework.
- **Razonamiento semántico en tiempo real** (OWL2/RDFS) — única feature que ninguna alternativa embebida ofrece al mismo nivel.
- Soporte nativo de **grafos nombrados** (SPARQL 1.1 Dataset).
- Excelentes capacidades enterprise: clusters, multi-región, conectores Elasticsearch/Kafka.
- Compatible con el objetivo OWL2-RDF del proyecto (universos semánticos en Capa 4).

El detalle de la comparativa se documenta en [DOSSIERS/graphstore-rdf-protocol.md](../DOSSIERS/graphstore-rdf-protocol.md).

## Decisión

### 1. Modelo RDF tipado en Capa 0 (`core/protocols/rdf.ts`)

Se define un modelo RDF puramente type-level + constructores puros, sin dependencias de runtime, alineado vagamente con el W3C RDF/JS Data Model pero endurecido con TS:

- `Iri` como **Branded Type** (opaque): impide mezclar IRIs con strings arbitrarios.
- `RdfTerm` como **Discriminated Union** (`NamedNode | BlankNode | Literal`): permite exhaustive checking en `switch`.
- `Quad` y `QuadPattern` con `g?` opcional (default graph).
- **Template Literal Types** como gramática textual de tripletas (`TriplePattern`).
- `SelectVars<Q>` — Conditional Types + `infer` para derivar la unión de variables proyectadas de un `SELECT` SPARQL a partir del string literal de la consulta.

### 2. `GraphStoreProtocol` en Capa 1 (`core/protocols/graph-store.ts`)

Interface agnóstica al motor, con todas las operaciones de lectura como **`Observable`** (RxJS) por coherencia con el `NetworkOrchestrator`:

```ts
interface GraphStoreProtocol extends ProtocolService<'rdf-sparql'> {
  readonly capability: 'rdf-sparql';
  add(quads: readonly Quad[]): Promise<void>;
  remove(pattern: QuadPattern): Promise<number>;
  match(pattern: QuadPattern): Observable<Quad>;
  query<const Q extends string>(sparql: Q): Observable<Bindings<SelectVars<Q>>>;
  query<TVars extends string = never>(sparql: string): Observable<Bindings<TVars>>;
}
```

La sobrecarga doble de `query` permite: (a) inferencia type-level cuando el string de consulta es un literal conocido, y (b) tipado explícito cuando la consulta es dinámica.

### 3. `CapabilityServiceRegistry` por declaration merging

El archivo `graph-store.ts` amplía el módulo `../types` mediante module augmentation:

```ts
declare module '../types' {
  interface CapabilityServiceRegistry {
    'rdf-sparql': GraphStoreProtocol;
  }
}
```

Este patrón permite que `orchestrator.resolve('rdf-sparql')` quede fuertemente tipado sin que `core/types.ts` conozca nada de RDF. Es el primer uso de este patrón en la plataforma y se establece como **precedente** para futuros protocolos.

### 4. Adaptador in-memory (`@network-engine/graph`)

Triple-store in-memory indexado (SPO/POS/OSP) con Maps. Implementa `GraphStoreProtocol` con cero dependencias de runtime. Incluye un evaluador SPARQL SELECT de subconjunto suficiente para el contrato compartido de tests.

### 5. Adaptador externo — `GraphDbStore` / `GraphDbPlugin` (`@network-engine/node`)

Implementa `GraphStoreProtocol` sobre HTTP usando `fetch` nativo (Node 18+/Bun). Sin dependencias npm adicionales: SPARQL construido a mano, respuesta parseada como `application/sparql-results+json`. La clase `GraphDbPlugin` declara `canInfer: true, canPersist: true` por las capacidades nativas de GraphDB. Es el único punto del sistema que conoce HTTP/GraphDB.

### 6. DSL tipado de SPARQL (`core/protocols/sparql-dsl.ts`)

Builder fluido sobre el modelo RDF:

- `TypedQuery<TVars>`: brand fantasma que conserva variables a nivel de tipo.
- `select(...vars).where(...triples).build()`: chequeo compile-time `SELECT ⊆ WHERE` — si una variable proyectada no aparece en ninguna tripleta del `WHERE`, la compilación falla con un error legible.
- `runQuery(store, typedQuery)`: puente tipado hacia `GraphStoreProtocol.query`.

### 7. Serialización de términos compartida y endurecida (seguridad)

El escapado/validación de términos a sintaxis SPARQL/Turtle es **única fuente de verdad** en `core/protocols/rdf-serialize.ts` (funciones puras, sin runtime), reutilizada por el adaptador GraphDB y por el DSL tipado. Endurece la construcción de SPARQL frente a **inyección**:

- **Literales:** escapado grado N-Triples `STRING_LITERAL_QUOTE` (`\`, `"`, `\n`, `\r`, `\t`, `\b`, `\f` y cualquier control `U+0000–U+001F`/`U+007F` vía `\uXXXX`).
- **Language tags:** validados contra `^[A-Za-z]+(-[A-Za-z0-9]+)*$`; si no casan, se lanza `Error` (no se interpola nada sin validar).
- **Blank node labels:** validados contra un subconjunto seguro de `BLANK_NODE_LABEL` (`^[A-Za-z0-9_]([A-Za-z0-9_.-]*[A-Za-z0-9_-])?$`).
- **IRIs:** el antiguo `escapeIri` emitía secuencias **ilegales** (`\\`, `\>`). Se sustituye por `serializeIriRef`, que escapa como `\uXXXX` los caracteres prohibidos por la gramática `IRIREF` (`<`, `>`, `"`, `{`, `}`, `|`, `^`, `` ` ``, `\` y `U+0000–U+0020`), única forma legal de representarlos en `<...>`.

Las claves canónicas de término del store in-memory (`graph/src/keys.ts`) son ahora la **única** implementación (se eliminó el `termKeyFor` duplicado de `sparql.ts`) y prefijan con su longitud el campo libre `value` del literal para garantizar inyectividad aunque la forma léxica contenga los separadores de control.

### 8. Semántica de grafo nombrado (unset `g` ⇒ unión)

Ambos adaptadores acuerdan que un patrón con `g` **sin fijar** significa **unión de todos los grafos** (por defecto + nombrados), igual que ya hacía el adaptador in-memory:

- **In-memory:** `match({})`/`remove({})` recorren/afectan todos los grafos y conservan el `g` real de cada quad.
- **GraphDB:** `buildWherePattern` emite `{ BGP } UNION { GRAPH ?g { BGP } }` y `match` reconstruye el grafo nombrado desde `?g` cuando la fila lo trae. El borrado emite dos operaciones (`DELETE { GRAPH ?g {…} } WHERE { GRAPH ?g {…} } ; DELETE WHERE { BGP }`) porque el `DELETE WHERE` abreviado no admite `UNION`. Con `g` fijado, ambos se restringen a `GRAPH <g> { … }`.

El contract suite (§Verificación) afirma esta semántica en los dos adaptadores.

### Verificación de sustituibilidad (contract suite sobre ambos adaptadores)

`packages/graph/src/graph-store.test.ts` ejecuta `runContractSuite` dos veces: contra `InMemoryGraphStore` y contra un `GraphDbStore` respaldado por un **fake de `fetch` con estado**. El fake traduce únicamente el sobre de la petición/respuesta (SPARQL ⇄ operaciones de quad, y `application/sparql-results+json`) delegando el almacenamiento real en un `InMemoryGraphStore`. Así el round-trip completo —generación de SPARQL, envelope HTTP y parseo de bindings del `GraphDbStore`— se prueba de verdad. La integración *live* contra Ontotext GraphDB sigue siendo un placeholder `skip` (CI no dispone de servidor).

## Consecuencias

### Positivas

- `core` permanece **agnóstico al motor**: cero dependencias de red, de ficheros ni de motores RDF.
- Los adaptadores son **completamente intercambiables**: in-memory para tests y desarrollo, GraphDB para producción.
- `GraphDbPlugin` habilita **razonamiento semántico en tiempo real** (inferencia OWL nativa de GraphDB) sin tocar el núcleo.
- El patrón `CapabilityServiceRegistry` + declaration merging está fijado como precedente para nuevos protocolos.
- El DSL tipado eleva los errores de consulta SPARQL a compile-time.

### Negativas / Riesgos

- La integración **live** con GraphDB requiere una instancia corriendo (placeholder `skip`). No obstante, el contract suite SÍ se ejecuta contra el `GraphDbStore` real vía el fake de `fetch` con estado, probando el round-trip de extremo a extremo sin servidor.
- El evaluador SPARQL del adaptador in-memory es un subconjunto: no soporta `OPTIONAL`, `UNION`, `FILTER` avanzados ni SPARQL UPDATE por diseño. El guard de cláusulas no soportadas opera ahora a nivel de **token** (no marca un keyword reservado embebido en un IRI `<...>` o un literal).
- El conteo de filas afectadas en `remove` del adaptador GraphDB es best-effort (requiere un `SELECT COUNT(*)` previo porque el SPARQL Protocol no devuelve recuentos de UPDATE).
- El evaluador SELECT in-memory sigue sin soportar la variable de grafo `GRAPH ?g { ... }` dentro de una consulta (distinto de la semántica de unión de `match`/`remove`, que sí está implementada en ambos adaptadores).

## Referencias

- [INSTRUCTIONS/LAYER_1/NETWORK_ENGINE.instructions.md](../INSTRUCTIONS/LAYER_1/NETWORK_ENGINE.instructions.md) — Arquitectura de capas
- [INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md](../INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md) — Neutralidad ontológica
- [INSTRUCTIONS/LAYER_0/GRAPHDB.instructions.md](../INSTRUCTIONS/LAYER_0/GRAPHDB.instructions.md) — Documentación de Ontotext GraphDB
- [DOSSIERS/graphstore-rdf-protocol.md](../DOSSIERS/graphstore-rdf-protocol.md) — Comparativa de motores y modelo tipado
- `packages/core/src/protocols/rdf.ts` — Modelo RDF (Capa 0)
- `packages/core/src/protocols/rdf-serialize.ts` — Serialización/escapado seguro compartido
- `packages/core/src/protocols/graph-store.ts` — Contrato del protocolo (Capa 1)
- `packages/core/src/protocols/sparql-dsl.ts` — DSL tipado
- `packages/graph/src/index.ts` — Adaptador in-memory
- `packages/graph/src/graph-store.test.ts` — Contract suite + fake de `fetch` con estado
- `packages/node/src/graph-db.ts` — Adaptador GraphDB
