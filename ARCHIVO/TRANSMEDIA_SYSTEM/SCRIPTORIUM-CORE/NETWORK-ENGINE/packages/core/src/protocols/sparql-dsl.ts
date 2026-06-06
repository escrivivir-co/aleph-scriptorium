/**
 * Capa 0/3 — DSL de tripletas/SPARQL *tipado* (expansión de lenguaje).
 *
 * Construido ENCIMA del modelo RDF de `./rdf` (no lo redefine). Es el payload
 * de "Nivel 3 (Lenguaje)" del DoD: la gramática de una consulta `SELECT` vive
 * en el sistema de tipos, de modo que el conjunto de variables proyectadas
 * sobrevive como parámetro de tipo fantasma y, al alimentar `.build()` a
 * `GraphStoreProtocol.query`, los `Bindings` quedan tipados por exactamente
 * esas variables.
 *
 * Puro, sin dependencias de runtime: solo tipos + pequeñas funciones builder.
 *
 * Capacidades de TS exhibidas: Template Literal Types (`Variable<N>`,
 * serialización de tripletas), Conditional Types + `infer` (extracción de
 * nombres de variable y chequeo SELECT⊆WHERE), const type params (preservar
 * tuplas/strings literales), variadic tuples (`select(...)`, `where(...)`,
 * argumentos condicionales de `build`) y branded/phantom types
 * (`TypedQuery<TVars>`).
 */

import type { Observable } from 'rxjs';
import { createIri, xsd, type Iri, type RdfTerm } from './rdf';
import { termToSparql } from './rdf-serialize';
import type { Bindings } from './rdf';
import type { GraphStoreProtocol } from './graph-store';

// ============================================================================
// 1. TypedQuery — string SPARQL con brand fantasma de variables proyectadas
// ============================================================================

/**
 * Una consulta SPARQL serializada cuyo conjunto de variables proyectadas
 * `TVars` se conserva a nivel de tipos vía un brand fantasma. En runtime es un
 * `string` normal (el campo `__vars` nunca existe), por lo que sigue siendo
 * aceptable allí donde se espera `string`.
 */
export type TypedQuery<TVars extends string> = string & {
  readonly __vars?: TVars;
};

/** Extrae el conjunto de variables de una {@link TypedQuery}. */
export type VarsOf<Q> = Q extends TypedQuery<infer V> ? V : never;

// ============================================================================
// 2. Términos y variables tipadas (Template Literal Types)
// ============================================================================

/** Variable SPARQL tipada por su nombre: `Variable<'person'>` === `'?person'`. */
export type Variable<N extends string> = `?${N}`;

/**
 * Smart constructor de variable: `v('person')` produce `'?person'` con el
 * nombre preservado a nivel de tipo gracias al const type param.
 */
export function v<const N extends string>(name: N): Variable<N> {
  return `?${name}`;
}

/**
 * Entrada admisible en una posición de tripleta:
 *  - string en forma textual: `'?x'` (variable), `'<http://..>'` (IRI),
 *    `'"texto"'` (literal) o un IRI desnudo `'http://..'` (se envuelve en `<>`);
 *  - un {@link RdfTerm} estructurado (`NamedNode | BlankNode | Literal`).
 *
 * `Iri` es subtipo de `string`, por lo que queda cubierto por `string`.
 */
export type TermInput = string | RdfTerm;

/** Nombre de variable (sin `?`) de una entrada textual; `never` si no es variable. */
type VarNameOf<T> = T extends `?${infer N}` ? N : never;

// ============================================================================
// 3. Tripleta tipada — fija su unión de variables como brand
// ============================================================================

/**
 * Resultado de {@link triple}: el texto serializado del patrón + el conjunto
 * de variables que contiene, preservado en `__vars` (fantasma, no existe en
 * runtime). `V` permite que `where(...)` agregue las variables ligadas.
 */
export interface TriplePatternBuilt<V extends string = never> {
  readonly text: string;
  readonly __vars?: V;
}

type AnyTriple = TriplePatternBuilt<string>;

/** Une las variables de una tupla de tripletas (distribuye sobre `T[number]`). */
type TripleVars<T extends readonly AnyTriple[]> = T[number] extends TriplePatternBuilt<infer V>
  ? V
  : never;

function serializeTerm(term: TermInput): string {
  // Un {@link RdfTerm} estructurado delega en la ÚNICA serialización compartida
  // del core (mismo escapado/validación que usa el adaptador GraphDB).
  if (typeof term === 'object') {
    return termToSparql(term);
  }
  // Forma textual ya válida (variable, IRI angular, literal o blank node).
  if (
    term.startsWith('?') ||
    term.startsWith('<') ||
    term.startsWith('"') ||
    term.startsWith('_:')
  ) {
    return term;
  }
  // IRI desnudo => se envuelve.
  return `<${term}>`;
}

/**
 * Construye un patrón de tripleta serializado, infiriendo la unión de nombres
 * de variable presentes en sus tres posiciones (const type params para no
 * perder los literales `'?x'`).
 *
 * @example triple('?s', rdf('type'), '?o') // TriplePatternBuilt<'s' | 'o'>
 */
export function triple<
  const S extends TermInput,
  const P extends TermInput,
  const O extends TermInput,
>(
  s: S,
  p: P,
  o: O,
): TriplePatternBuilt<VarNameOf<S> | VarNameOf<P> | VarNameOf<O>> {
  return {
    text: `${serializeTerm(s)} ${serializeTerm(p)} ${serializeTerm(o)}`,
  } as TriplePatternBuilt<VarNameOf<S> | VarNameOf<P> | VarNameOf<O>>;
}

// ============================================================================
// 4. Chequeo type-level SELECT ⊆ WHERE
// ============================================================================

declare const ERR: unique symbol;

/**
 * Tipo de error nominal e *inconstruible* por el consumidor. Se exige como
 * argumento de `build()` cuando alguna variable proyectada no aparece en
 * ningún triple del `WHERE`, forzando un error de compilación legible.
 */
export type SelectVarNotInWhere<V extends string> = {
  readonly [ERR]: `SELECT var '?${V}' is not bound by any WHERE triple`;
};

/** Variables seleccionadas que faltan en el `WHERE`. */
type Missing<S extends string, W extends string> = Exclude<S, W>;

/**
 * Variadic tuple condicional: sin variables faltantes, `build()` no pide
 * argumentos; en caso contrario exige un valor inconstruible => error de
 * compilación que nombra la(s) variable(s) sin ligar.
 */
type BuildArgs<S extends string, W extends string> = [Missing<S, W>] extends [never]
  ? []
  : [error: SelectVarNotInWhere<Missing<S, W>>];

// ============================================================================
// 5. Builder fluido de SELECT
// ============================================================================

/**
 * Builder inmutable de una consulta `SELECT`.
 *
 * @typeParam S - unión de variables proyectadas (del `select(...)`).
 * @typeParam W - unión de variables ligadas acumuladas por `where(...)`.
 */
class SelectBuilder<S extends string, W extends string> {
  constructor(
    private readonly vars: readonly string[],
    private readonly triples: readonly string[],
  ) {}

  /**
   * Agrega patrones de tripleta al `WHERE`, ampliando `W` con sus variables.
   * Variadic tuple + const type param preservan la unión exacta de variables.
   */
  where<const T extends readonly AnyTriple[]>(...triples: T): SelectBuilder<S, W | TripleVars<T>> {
    return new SelectBuilder<S, W | TripleVars<T>>(this.vars, [
      ...this.triples,
      ...triples.map((t) => t.text),
    ]);
  }

  /**
   * Serializa la consulta. El tipo de retorno conserva las variables
   * proyectadas (`TypedQuery<S>`). Si alguna variable seleccionada no está
   * ligada en el `WHERE`, {@link BuildArgs} exige un argumento inconstruible y
   * la compilación falla.
   */
  build(..._check: BuildArgs<S, W>): TypedQuery<S> {
    const projection = this.vars.map((name) => `?${name}`).join(' ');
    const body = this.triples.join(' .\n  ');
    return `SELECT ${projection} WHERE {\n  ${body}\n}` as TypedQuery<S>;
  }
}

/**
 * Punto de entrada del DSL. Captura las variables proyectadas como unión a
 * partir de una tupla const variádica de nombres (sin `?`).
 *
 * @example
 * const q = select('person', 'name')
 *   .where(triple('?person', rdf('type'), foaf('Person')))
 *   .where(triple('?person', foaf('name'), '?name'))
 *   .build(); // TypedQuery<'person' | 'name'>
 */
export function select<const TVars extends readonly string[]>(
  ...vars: TVars
): SelectBuilder<TVars[number], never> {
  return new SelectBuilder<TVars[number], never>(vars, []);
}

// ============================================================================
// 6. Puente tipado hacia GraphStoreProtocol.query
// ============================================================================

/**
 * Ejecuta una {@link TypedQuery} contra un {@link GraphStoreProtocol}
 * propagando las variables del brand a `Bindings<TVars>`.
 *
 * Necesario porque la sobrecarga `query<const Q extends string>` del protocolo
 * infiere variables solo de *string literals*; una {@link TypedQuery} es un
 * `string` branded (no literal), así que aquí se recuperan vía el fantasma.
 */
export function runQuery<TVars extends string>(
  store: GraphStoreProtocol,
  query: TypedQuery<TVars>,
): Observable<Bindings<TVars>> {
  return store.query<TVars>(query);
}

// ============================================================================
// 7. Helpers de prefijo (reusan los IRIs XSD del core donde existen)
// ============================================================================

/** Fábrica de un resolutor de prefijo: `(local) => Iri` concatenando el base. */
function prefix(base: string) {
  return <const L extends string>(local: L): Iri => createIri(`${base}${local}`);
}

const RDF_NS = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const RDFS_NS = 'http://www.w3.org/2000/01/rdf-schema#';
const XSD_NS = 'http://www.w3.org/2001/XMLSchema#';

/** Prefijo `rdf:` — p.ej. `rdf('type')`. */
export const rdf = prefix(RDF_NS);
/** Prefijo `rdfs:` — p.ej. `rdfs('subClassOf')`. */
export const rdfs = prefix(RDFS_NS);

/**
 * Prefijo `xsd:` que REUTILIZA las constantes ya definidas en `core/rdf` cuando
 * el `local` coincide (DRY: una sola fuente de verdad para esos IRIs), y cae al
 * patrón genérico para el resto.
 */
export function xsdIri<const L extends string>(local: L): Iri {
  const known = (xsd as Readonly<Record<string, Iri>>)[local];
  return known ?? createIri(`${XSD_NS}${local}`);
}
