# Dossier: GraphStore RDF/SPARQL Protocol

**Estado:** Activo  
**Plan:** `graphdb-rdf-protocol` (todos `spike-engine`, `rdf-types`, `graph-protocol`, `typed-dsl` completados)  
**ADR:** [ADR 0002](../ADR/0002-graphstore-rdf-protocol.md)

---

## 1. Comparativa de motores RDF/SPARQL para Node/Bun

### Criterios de evaluación

| Criterio | Peso | Justificación |
|---|---|---|
| SPARQL 1.1 completo | Alto | Queries complejas, subqueries, aggregations |
| Razonamiento OWL/RDFS | Alto | Objetivo del proyecto: universos semánticos |
| Persistencia | Medio | Los adaptadores in-memory cubren tests; producción necesita persistencia |
| Compatibilidad Bun | Medio | El monorepo usa Bun como runtime principal |
| Sin dependencias npm pesadas | Medio | Principio de neutralidad de la plataforma |
| Grafos nombrados (datasets) | Medio | SPARQL 1.1 Dataset queries |

### Motores evaluados

#### Ontotext GraphDB ✓ (elegido)

- **Tipo:** Motor externo, proceso separado, HTTP
- **SPARQL:** 1.1 completo (SELECT, CONSTRUCT, ASK, DESCRIBE, UPDATE, GRAPH, subqueries, aggregations)
- **Razonamiento:** OWL2-RL, OWL2-EL, RDFS, OWL-Horst — en tiempo real sobre escritura
- **Persistencia:** Sí, propia, escalable a billones de tripletas
- **Protocolo:** W3C SPARQL 1.1 Protocol sobre HTTP; RDF4J REST API
- **Grafos nombrados:** Soporte completo de Named Graphs y SPARQL 1.1 Datasets
- **Compatibilidad Bun:** Total (la integración usa `fetch` nativo, sin npm nativo de JVM)
- **Deps npm:** Cero (solo `fetch` global)
- **Licencia:** Free + Enterprise Edition
- **Razonamiento real-time:** Sí — deriva nuevos hechos semánticos al insertar tripletas sin requerirlo explícitamente en la consulta

**Por qué se eligió:** Es el único motor que satisface simultáneamente SPARQL 1.1 completo + razonamiento OWL2 en tiempo real + escalabilidad enterprise. El objetivo del proyecto incluye hospedar universos ontológicos (Capa 4) con inferencia semántica; GraphDB es el único evaluado que ofrece esto sin compromisos. Su protocolo HTTP estándar permite una integración sin deps npm adicionales: el adaptador usa solo `fetch` y strings SPARQL.

#### Oxigraph (descartado)

- **Tipo:** Embebido (WASM/binding nativo) o servidor HTTP
- **SPARQL:** 1.1 razonable (no todos los features)
- **Razonamiento:** RDFS básico (no OWL2 completo)
- **Persistencia:** Sí (RocksDB)
- **Compatibilidad Bun:** El binding nativo (`@oxigraph/oxigraph`) usa N-API; compatibilidad Bun incierta en el momento del spike
- **Deps npm:** `@oxigraph/oxigraph` (~30 MB, binding nativo)
- **Descartado por:** Falta de razonamiento OWL2 en tiempo real; compatibilidad Bun no garantizada con bindings nativos; no hay ventaja sobre GraphDB en el contexto del proyecto

#### quadstore + Comunica (descartado)

- **Tipo:** Embebido, puro JS/TS
- **SPARQL:** Completo vía Comunica (motor de consulta modular)
- **Razonamiento:** No nativo; requiere plugins adicionales o Hylar
- **Persistencia:** Sí (LevelDB/AbstractLevel)
- **Compatibilidad Bun:** Alta (puro JS/TS, sin bindings nativos)
- **Deps npm:** `quadstore`, `comunica`, `abstract-level` (~40+ paquetes transitivos)
- **Descartado por:** Sin razonamiento OWL2 real-time; huella de dependencias npm muy elevada; la neutralidad de la plataforma se resentiría al llevar 40+ paquetes de RDF/JS al monorepo

#### Neo4j LPG (descartado desde el inicio)

- **Tipo:** Motor externo, proceso separado, Bolt/HTTP
- **Modelo:** Labeled Property Graph (LPG), no RDF nativo
- **SPARQL:** No soportado nativamente (hay bridges experimentales)
- **Descartado por:** Modelo de datos incompatible con RDF/OWL. El proyecto eligió el modelo RDF; Neo4j no es un ciudadano de primera clase en ese espacio

---

## 2. Modelo RDF tipado — exhibición de TS

El archivo `packages/core/src/protocols/rdf.ts` es puramente type-level + constructores puros. No tiene dependencias de runtime. Es un showcase de las capacidades de TypeScript documentadas en `LAYER_0/TS.instructions.md`.

### 2.1 `Iri` — Branded Type (Opaque)

```ts
export type Iri = string & { readonly __iri: unique symbol };
export function createIri(value: string): Iri { return value as Iri; }
```

**Por qué:** Los IRIs son strings en runtime, pero son semánticamente distintos de cualquier string. El brand impide mezclarlos accidentalmente. `createIri` es el único smart constructor legítimo; el cast `as Iri` queda aislado ahí.

### 2.2 `RdfTerm` — Discriminated Union

```ts
export type RdfTerm =
  | { kind: 'NamedNode'; value: Iri }
  | { kind: 'BlankNode'; value: string }
  | { kind: 'Literal'; value: string; datatype: Iri; lang?: string };
```

**Por qué:** El discriminante `kind` permite exhaustive checking en `switch` sin instanceof. TypeScript emite un error si se añade un nuevo miembro y algún switch no lo cubre.

### 2.3 Template Literal Types — gramática textual

```ts
export type Var = `?${string}`;
export type IriRef = `<${string}>`;
export type LiteralRef = `"${string}"`;
export type TermPattern = Var | IriRef | LiteralRef;
export type TriplePattern = `${TermPattern} ${TermPattern} ${TermPattern}`;
```

**Por qué:** La gramática de una tripleta en forma textual vive en el sistema de tipos, no solo en runtime. Es un precedente nuevo pedido por `LAYER_0/TS.instructions.md`: gramática expresada en tipos.

### 2.4 `SelectVars<Q>` — `infer` + Conditional Types recursivos

```ts
export type SelectVars<Q extends string> = CollectVars<SelectProjection<Q>>;
```

La maquinaria interna (`ReadName`, `CollectVars`, `CutProjection`, `SelectProjection`) usa Template Literal Types recursivos con `infer` para extraer la unión de nombres de variable proyectados de un `SELECT` SPARQL escrito como string literal. Ejemplo:

```ts
type Vars = SelectVars<'SELECT ?name ?age WHERE { ?s ?p ?o }'>;
// => 'name' | 'age'
```

Cuando `Q` no es un string literal (consulta dinámica), resuelve a `never`, degradando `Bindings` a `Record<string, RdfTerm>`.

---

## 3. `GraphStoreProtocol` — decisiones de diseño

### 3.1 ¿Por qué `Observable` en las lecturas?

El `NetworkOrchestrator` de Capa 1 está construido sobre RxJS. Usar `Observable` en `match` y `query` garantiza que:

1. Los resultados pueden emitirse de forma incremental (streaming de quads/bindings) sin acumular todo en memoria.
2. El consumidor puede cancelar la operación con `unsubscribe`.
3. La coherencia reactiva con el resto del orquestador: los grafos se comportan como streams de eventos, no como snapshots síncronos.

`add` y `remove` son `Promise` porque son operaciones de escritura acotadas; no hay motivo para hacerlas reactivas.

### 3.2 ¿Por qué `CapabilityServiceRegistry` + declaration merging?

El diseño original de `NetworkPlugin` en `core/types.ts` declara `PluginCapabilities` pero no puede exponer un servicio tipado. Añadir `GraphStoreProtocol` directamente a `core/types.ts` hubiera acoplado el núcleo a RDF.

La solución es el **módulo augmentation**:

```ts
// en graph-store.ts
declare module '../types' {
  interface CapabilityServiceRegistry {
    'rdf-sparql': GraphStoreProtocol;
  }
}
```

`CapabilityServiceRegistry` vive en `types.ts` como interface vacía. Cada archivo de protocolo la amplía localmente. El resultado: `orchestrator.resolve('rdf-sparql')` retorna `GraphStoreProtocol` fuertemente tipado, pero `core/types.ts` no sabe nada de RDF. Este patrón es el **precedente** para todos los protocolos futuros.

---

## 4. DSL tipado de SPARQL — decisiones de diseño

El archivo `packages/core/src/protocols/sparql-dsl.ts` es el payload de "Nivel 3 (Lenguaje)" del DoD.

### 4.1 `TypedQuery<TVars>` — phantom brand

```ts
export type TypedQuery<TVars extends string> = string & { readonly __vars?: TVars };
```

En runtime es un `string` normal (el campo `__vars` nunca existe). El brand solo vive a nivel de tipos para propagar la unión de variables a través del sistema de tipos. Una `TypedQuery<'name' | 'age'>` es directamente aceptable donde se espera `string`.

### 4.2 `select(...).where(...).build()` — chequeo SELECT ⊆ WHERE en compile-time

El builder fluido acumula tipos en sus parámetros genéricos:

- `SelectBuilder<S, W>` donde `S` es la unión de variables proyectadas y `W` la unión acumulada de variables ligadas en tripletas `WHERE`.
- `build()` acepta argumentos de tipo `BuildArgs<S, W>`:
  - Si `S ⊆ W` (todas las proyectadas están ligadas): `build()` no requiere argumentos.
  - Si hay variables proyectadas no ligadas: exige un argumento de tipo `SelectVarNotInWhere<Missing>`, que es inconstruible por el consumidor → error de compilación con mensaje legible.

```ts
const q = select('name', 'age')
  .where(triple('?person', rdf('type'), foaf('Person')))
  .where(triple('?person', foaf('name'), '?name'))
  // 'age' no está en el WHERE → error de compilación:
  // Argument of type '...' is not assignable to parameter of type
  // "SELECT var '?age' is not bound by any WHERE triple"
  .build();
```

### 4.3 `runQuery` — puente tipado

```ts
export function runQuery<TVars extends string>(
  store: GraphStoreProtocol,
  query: TypedQuery<TVars>,
): Observable<Bindings<TVars>>
```

La sobrecarga `query<const Q extends string>` del protocolo infiere variables de string literals. Una `TypedQuery` es un string branded (no literal), así que `runQuery` recupera `TVars` del phantom y lo pasa explícitamente a `query<TVars>`. Sin esto, `TypedQuery` perdería sus variables al pasar por el protocolo.

---

## 4.4 Serialización de términos endurecida (anti-inyección SPARQL)

`packages/core/src/protocols/rdf-serialize.ts` es la **única** fuente de verdad para mapear un `RdfTerm` a su forma textual SPARQL/Turtle. La reutilizan el adaptador GraphDB (que POSTea SPARQL a un store vivo) y el `serializeTerm` del DSL tipado. Sustituye a las implementaciones duplicadas e inseguras previas (`escapeLiteral`/`escapeIri` en `graph-db.ts`, y `serializeTerm` ad hoc en `sparql-dsl.ts`).

| Componente | Tratamiento |
|---|---|
| Literal (forma léxica) | Escapado N-Triples `STRING_LITERAL_QUOTE`: `\`, `"`, `\n`, `\r`, `\t`, `\b`, `\f`, y todo control `U+0000–U+001F`/`U+007F` como `\uXXXX` |
| Language tag | Validado `^[A-Za-z]+(-[A-Za-z0-9]+)*$`; lanza `Error` si no casa |
| Blank node label | Validado subconjunto seguro `^[A-Za-z0-9_]([A-Za-z0-9_.-]*[A-Za-z0-9_-])?$` |
| IRI (`IRIREF`) | `serializeIriRef`: escapa como `\uXXXX` los prohibidos `<>"{}|^`` ` ``\` y `U+0000–U+0020` (el antiguo `escapeIri` emitía `\\`/`\>`, **ilegales** en `IRIREF`) |

Además, las claves canónicas del store in-memory viven solo en `graph/src/keys.ts` (se eliminó el `termKeyFor` duplicado de `sparql.ts`) y prefijan con su longitud el `value` libre del literal para garantizar inyectividad.

## 5. Limitaciones conocidas y preguntas abiertas

### 5.1 Integración live con GraphDB

`GraphDbStore` / `GraphDbPlugin` requieren una instancia GraphDB corriendo. La integración **live** contra el motor real sigue siendo un placeholder `skip` (CI no tiene servidor GraphDB; habilitarla requeriría dockerizar GraphDB).

Sin embargo, el **contract suite** (`packages/graph/src/graph-store.test.ts`) SÍ se ejecuta contra el `GraphDbStore` real mediante un **fake de `fetch` con estado** (ver §6 abajo): el mismo `runContractSuite` corre contra el adaptador in-memory y contra el GraphDB, probando el round-trip real (`add → match`, conteos de `remove`, idempotencia, resultados vacíos, grafos nombrados) sin servidor. Esto reemplaza la limitación previa, en la que solo se verificaba serialización aislada.

### 5.2 Subconjunto SPARQL del adaptador in-memory

El evaluador in-memory (`packages/graph/src/sparql.ts`) implementa un subconjunto de SPARQL SELECT suficiente para el contrato compartido. No implementa:

- `OPTIONAL` / `LEFT JOIN`
- `UNION`
- `FILTER` con expresiones arbitrarias
- `SPARQL UPDATE` (INSERT/DELETE)
- Subqueries anidadas
- `GRAPH ?g { ... }` (wildcard de grafo nombrado)

El adaptador in-memory no pretende ser un motor SPARQL completo; es una implementación de referencia del contrato.

### 5.3 Wildcard de grafo nombrado (`GRAPH ?g`)

A nivel de `match`/`remove`, un `QuadPattern` con `g` **sin fijar** tiene semántica de **unión de todos los grafos** (por defecto + nombrados) en AMBOS adaptadores (ver §7). Lo que sigue sin soportarse es la variable de grafo `GRAPH ?g { ?s ?p ?o }` **dentro de una consulta SELECT** del evaluador in-memory (es una limitación del subconjunto SPARQL, no de la semántica de grafos de `match`).

### 5.4 `remove` en GraphDB: conteo best-effort

El SPARQL 1.1 Protocol no define un mecanismo estándar para que un `DELETE WHERE` devuelva el número de triples borrados. `GraphDbStore.remove` ejecuta primero un `SELECT COUNT(*)` sobre el mismo patrón para estimar el número, luego hace el `DELETE WHERE`. Si el `COUNT(*)` falla, devuelve `0` sin abortar el borrado. Esta limitación está documentada en el código.

### 5.5 Named Graph en GraphDB

`GraphDbStore.buildWherePattern` envuelve en `GRAPH <uri>` cuando `pattern.g` está fijado, y emite `{ BGP } UNION { GRAPH ?g { BGP } }` cuando `g` está sin fijar (unión de todos los grafos), reconstruyendo el grafo nombrado desde `?g` en los resultados de `match`. El borrado con `g` sin fijar se realiza con dos operaciones (`DELETE { GRAPH ?g {…} } WHERE { GRAPH ?g {…} } ; DELETE WHERE { BGP }`) porque el `DELETE WHERE` abreviado no admite `UNION`.

---

## 6. Verificación de sustituibilidad — fake de `fetch` con estado

El contract suite (`packages/graph/src/graph-store.test.ts`) define `runContractSuite(label, makeStore)` y lo invoca dos veces:

1. `runContractSuite('InMemoryGraphStore — contract', () => createInMemoryGraphStore())`
2. `runContractSuite('GraphDbStore — contract', () => new GraphDbStore({...}))`, envuelto en un `describe` que instala el fake en `beforeAll` y lo restaura en `afterAll`; cada `makeStore` crea un `InMemoryGraphStore` de respaldo fresco.

El segundo caso instala un fake de `globalThis.fetch` (`makeFakeFetch`) que respalda un `GraphDbStore` real:

- **Enfoque (alternativa aceptada en el plan):** el fake delega TODO el almacenamiento y matching en un `InMemoryGraphStore` interno y solo traduce el **sobre** de la petición/respuesta. Parsea el SPARQL que el adaptador emite (`INSERT DATA`, `DELETE WHERE` / `DELETE {…} WHERE {…}`, `SELECT (COUNT(*) …)`, `SELECT *` para `match`, y `SELECT ?vars` general que delega en el evaluador in-memory) hacia operaciones de quad, y serializa el resultado como `application/sparql-results+json`.
- **Qué prueba:** la generación de SPARQL del `GraphDbStore`, su envelope HTTP (Content-Type, método) y su parseo de bindings JSON, contra estado mutable real — no solo serialización aislada.
- **Qué NO prueba:** el comportamiento del motor Ontotext GraphDB real (razonamiento OWL, persistencia), que queda para la integración *live* (placeholder `skip`).

Además, las pruebas unitarias previas de serialización/parseo (sección `fetch-mocked`) se conservan para fijar el formato exacto de las cadenas SPARQL y de los términos.

---

## 7. Roadmap y preguntas abiertas

| Pregunta | Estado |
|---|---|
| ¿Añadir soporte de SPARQL UPDATE al adaptador in-memory? | Abierta |
| ¿Dockerizar GraphDB en CI para tests de integración live? | Abierta |
| ¿Implementar `GRAPH ?g` wildcard en el evaluador SELECT in-memory? | Abierta (la semántica de unión de `match`/`remove` ya existe) |
| ¿Exponer CONSTRUCT/DESCRIBE en el protocolo? | Abierta (requiere ampliar `GraphStoreProtocol`) |
| ¿Caching de inferencia / materialización de closures OWL? | Abierta (depende de la madurez de la capa de lenguajes) |
| ¿Adaptar el protocolo para LPG (property graphs) como segunda capacidad? | Abierta; posible con `capability: 'lpg'` + declaration merging |

---

## Referencias

- [ADR 0002](../ADR/0002-graphstore-rdf-protocol.md) — Decisión arquitectónica
- [INSTRUCTIONS/LAYER_0/GRAPHDB.instructions.md](../INSTRUCTIONS/LAYER_0/GRAPHDB.instructions.md) — Documentación de Ontotext GraphDB 11.3
- [INSTRUCTIONS/LAYER_1/NETWORK_ENGINE.instructions.md](../INSTRUCTIONS/LAYER_1/NETWORK_ENGINE.instructions.md) — Arquitectura de capas
- [INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md](../INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md) — Neutralidad ontológica
- `packages/core/src/protocols/rdf.ts`
- `packages/core/src/protocols/rdf-serialize.ts` — serialización/escapado seguro compartido (anti-inyección SPARQL)
- `packages/core/src/protocols/graph-store.ts`
- `packages/core/src/protocols/sparql-dsl.ts`
- `packages/graph/src/index.ts`
- `packages/graph/src/graph-store.test.ts` — contract suite + fake de `fetch` con estado
- `packages/node/src/graph-db.ts`
