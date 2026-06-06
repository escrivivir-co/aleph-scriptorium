/**
 * Capa 0 — Modelo RDF tipado (neutral, sin runtime).
 *
 * Alineado *vagamente* con el W3C RDF/JS Data Model pero endurecido con TS6:
 * el modelo es puramente type-level + constructores puros. El núcleo NUNCA
 * depende de un motor RDF/SPARQL; esto es solo gramática expresada en tipos.
 *
 * Capacidades de TS exhibidas aquí: Branded Types, Discriminated Unions,
 * Template Literal Types (gramática de tripletas) y `infer` + Conditional Types
 * (inferencia de bindings de un `SELECT` a partir del string de la consulta).
 */

// ============================================================================
// 1. Iri — Branded Type (Opaque)
// ============================================================================

/**
 * Identificador de recurso. Es un `string` en runtime, pero el brand impide
 * mezclar IRIs con strings arbitrarios sin pasar por {@link createIri}.
 */
export type Iri = string & { readonly __iri: unique symbol };

/** Smart constructor: única vía legítima para producir un {@link Iri}. */
export function createIri(value: string): Iri {
  return value as Iri;
}

// ============================================================================
// 2. RdfTerm — Discriminated Union por `kind`
// ============================================================================

export type NamedNode = { readonly kind: 'NamedNode'; readonly value: Iri };
export type BlankNode = { readonly kind: 'BlankNode'; readonly value: string };
export type Literal = {
  readonly kind: 'Literal';
  readonly value: string;
  readonly datatype: Iri;
  readonly lang?: string;
};

export type RdfTerm = NamedNode | BlankNode | Literal;

/** Discriminante de {@link RdfTerm}; útil para exhaustive checking. */
export type RdfTermKind = RdfTerm['kind'];

// ============================================================================
// 3. Quad / Triple
// ============================================================================

/** Una sentencia RDF. `g` (grafo nombrado) opcional => default graph. */
export type Quad = {
  readonly s: RdfTerm;
  readonly p: RdfTerm;
  readonly o: RdfTerm;
  readonly g?: RdfTerm;
};

/**
 * Patrón de búsqueda: cualquier subconjunto de términos del quad. Un campo
 * ausente actúa como comodín. Se usa en `match`/`remove` del protocolo.
 */
export type QuadPattern = Partial<Quad>;

// ============================================================================
// 4. Datatypes XSD frecuentes (constantes neutrales, sin runtime externo)
// ============================================================================

const XSD = 'http://www.w3.org/2001/XMLSchema#';
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';

export const xsd = {
  string: createIri(`${XSD}string`),
  integer: createIri(`${XSD}integer`),
  decimal: createIri(`${XSD}decimal`),
  boolean: createIri(`${XSD}boolean`),
  dateTime: createIri(`${XSD}dateTime`),
} as const;

/**
 * Datatype de los literales **con language tag** (`"texto"@es`). NO es el
 * datatype por defecto de un literal sin tipo: ese es `xsd:string` (ver
 * {@link literal}). Solo un literal con `lang` lleva implícitamente este tipo.
 */
export const RDF_LANG_STRING = createIri(`${RDF}langString`);

// ============================================================================
// 5. Constructores puros de términos (type-safe, sin dependencias)
// ============================================================================

export function namedNode(value: Iri | string): NamedNode {
  return { kind: 'NamedNode', value: typeof value === 'string' ? createIri(value) : value };
}

export function blankNode(value: string): BlankNode {
  return { kind: 'BlankNode', value };
}

/**
 * Construye un {@link Literal}. Con `exactOptionalPropertyTypes` activo, `lang`
 * solo se incluye en el objeto cuando realmente se proporciona.
 */
export function literal(value: string, datatypeOrLang?: Iri | { lang: string }): Literal {
  if (datatypeOrLang === undefined) {
    return { kind: 'Literal', value, datatype: xsd.string };
  }
  if (typeof datatypeOrLang === 'object') {
    return { kind: 'Literal', value, datatype: RDF_LANG_STRING, lang: datatypeOrLang.lang };
  }
  return { kind: 'Literal', value, datatype: datatypeOrLang };
}

export function quad(s: RdfTerm, p: RdfTerm, o: RdfTerm, g?: RdfTerm): Quad {
  return g === undefined ? { s, p, o } : { s, p, o, g };
}

// ============================================================================
// 6. Template Literal Types — gramática textual de patrones de tripleta
// ============================================================================

/** Variable SPARQL en forma textual: `?x`, `?subject`, ... */
export type Var = `?${string}`;
/** IRI en forma textual angular: `<http://...>`. */
export type IriRef = `<${string}>`;
/** Literal en forma textual entre comillas: `"texto"`. */
export type LiteralRef = `"${string}"`;

/** Un término en posición de patrón puede ser variable, IRI o literal. */
export type TermPattern = Var | IriRef | LiteralRef;

/**
 * Patrón de tripleta como Template Literal Type. Precedente arquitectónico:
 * la gramática (tres términos separados por espacios) vive en el sistema de
 * tipos, no solo en runtime. Ej: `"?s <http://p> ?o"`.
 */
export type TriplePattern = `${TermPattern} ${TermPattern} ${TermPattern}`;

// ============================================================================
// 7. infer + Conditional Types — bindings de un SPARQL SELECT (type-level)
// ============================================================================

type Whitespace = ' ' | '\n' | '\t' | '\r';

/**
 * Lee el nombre de una variable (sin el `?`) hasta el primer delimitador.
 * Devuelve `[nombre, resto]` para permitir recursión sobre el resto.
 */
type NameDelimiter = Whitespace | ',' | ';' | '.' | '(' | ')' | '{' | '}';
type ReadName<S extends string, Acc extends string = ''> = S extends `${infer Head}${infer Tail}`
  ? Head extends NameDelimiter
    ? [Acc, S]
    : ReadName<Tail, `${Acc}${Head}`>
  : [Acc, S];

/** Recolecta como unión todos los `?nombre` presentes en un fragmento. */
type CollectVars<S extends string> = S extends `${string}?${infer Rest}`
  ? ReadName<Rest> extends [infer Name extends string, infer After extends string]
    ? Name extends ''
      ? CollectVars<After>
      : Name | CollectVars<After>
    : never
  : never;

/** Recorta el fragmento de proyección en el primer WHERE/`{`. */
type CutProjection<S extends string> = S extends `${infer P}WHERE${string}`
  ? P
  : S extends `${infer P}where${string}`
    ? P
    : S extends `${infer P}Where${string}`
      ? P
      : S extends `${infer P}{${string}`
        ? P
        : S;

/** Extrae la lista de proyección situada tras `SELECT` (case-insensitive básico). */
type SelectProjection<Q extends string> = Q extends `${string}SELECT ${infer Rest}`
  ? CutProjection<Rest>
  : Q extends `${string}select ${infer Rest}`
    ? CutProjection<Rest>
    : Q extends `${string}Select ${infer Rest}`
      ? CutProjection<Rest>
      : '';

/**
 * Infiere, a partir del string de una consulta SPARQL `SELECT`, la unión de
 * nombres de variable proyectados (sin el `?`). Para `SELECT *` o cuando el
 * string no es un literal conocido, resuelve a `never` (=> bindings abiertos).
 *
 * @example SelectVars<'SELECT ?name ?age WHERE { ... }'> // 'name' | 'age'
 */
export type SelectVars<Q extends string> = CollectVars<SelectProjection<Q>>;

/**
 * Resultado tipado de una fila de bindings. Si el conjunto de variables es
 * conocido, cada variable mapea a un {@link RdfTerm}; si es `never` (SELECT *
 * o consulta dinámica), se degrada a un registro abierto.
 */
export type Bindings<TVars extends string> = [TVars] extends [never]
  ? Readonly<Record<string, RdfTerm>>
  : { readonly [K in TVars]: RdfTerm };
