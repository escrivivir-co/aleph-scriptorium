/**
 * Motor SPARQL mínimo — PURO TS, CERO dependencias (sin Comunica/Oxigraph).
 *
 * Subconjunto soportado (documentado a propósito; cualquier cosa fuera de él
 * lanza un Error con mensaje claro, que el protocolo emite por el Observable):
 *
 *   SELECT (DISTINCT|REDUCED)? (* | ?var (?var)*) WHERE { <BGP> }
 *
 * donde `<BGP>` es un Basic Graph Pattern: una o más tripletas `s p o`
 * separadas por `.`, con las abreviaturas `;` (mismo sujeto) y `,` (mismo
 * sujeto+predicado). Cada término puede ser:
 *   - Variable:        ?x   o   $x
 *   - IRI:             <http://ejemplo/p>
 *   - Keyword `a`:     azúcar para <…22-rdf-syntax-ns#type>
 *   - Literal:         "texto"   "texto"@es   "5"^^<…XMLSchema#integer>
 *   - Numérico simple: 42 (xsd:integer)   3.14 (xsd:decimal)
 *
 * NO soportado (=> Error): FILTER, OPTIONAL, UNION, MINUS, BIND, subqueries,
 * grupos anidados `{…}`, PREFIX/prefixed-names, property paths, agregados,
 * ORDER/LIMIT/OFFSET. El BGP se resuelve por join de bucles anidados contra
 * el `QuadSource` (que aprovecha los índices del store).
 */

import {
  createIri,
  literal,
  namedNode,
  xsd,
  type Quad,
  type QuadPattern,
  type RdfTerm,
} from '@network-engine/core';
import { termKey } from './keys';

const RDF_TYPE = createIri('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');

/** Fuente sincrónica de quads que casan con un patrón (la provee el store). */
export type QuadSource = (pattern: QuadPattern) => Iterable<Quad>;

/** Una fila de resultados del SELECT: variable proyectada -> término ligado. */
export type SolutionRow = Record<string, RdfTerm>;

type Position = 's' | 'p' | 'o';
const POSITIONS: readonly Position[] = ['s', 'p', 'o'];

type VarNode = { readonly type: 'var'; readonly name: string };
type TermNode = { readonly type: 'term'; readonly term: RdfTerm };
type PatternNode = VarNode | TermNode;
type ParsedTriple = { readonly [P in Position]: PatternNode };

// ============================================================================
// Tokenización
// ============================================================================

type Token =
  | { readonly kind: 'atom'; readonly text: string }
  | { readonly kind: 'punct'; readonly text: '.' | ';' | ',' };

const WHITESPACE = new Set([' ', '\t', '\n', '\r']);

function tokenize(body: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = body.length;
  while (i < n) {
    const ch = body[i]!;
    if (WHITESPACE.has(ch)) {
      i += 1;
      continue;
    }
    if (ch === '.' || ch === ';' || ch === ',') {
      tokens.push({ kind: 'punct', text: ch });
      i += 1;
      continue;
    }
    if (ch === '<') {
      const end = body.indexOf('>', i);
      if (end === -1) throw unsupported(`IRI sin cierre '>' cerca de la posición ${i}`);
      tokens.push({ kind: 'atom', text: body.slice(i, end + 1) });
      i = end + 1;
      continue;
    }
    if (ch === '"') {
      i = readQuotedLexeme(body, i, tokens);
      continue;
    }
    // Variable, keyword `a` o numérico: leer hasta whitespace/puntuación.
    let j = i;
    while (j < n) {
      const c = body[j]!;
      if (WHITESPACE.has(c) || c === '.' || c === ';' || c === ',') break;
      j += 1;
    }
    tokens.push({ kind: 'atom', text: body.slice(i, j) });
    i = j;
  }
  return tokens;
}

/** Lee un literal entrecomillado más su posible sufijo `@lang` / `^^<dt>`. */
function readQuotedLexeme(body: string, start: number, tokens: Token[]): number {
  let j = start + 1;
  while (j < body.length) {
    const c = body[j]!;
    if (c === '\\') {
      j += 2;
      continue;
    }
    if (c === '"') break;
    j += 1;
  }
  if (j >= body.length) throw unsupported(`Literal sin comilla de cierre cerca de la posición ${start}`);
  let end = j + 1;
  const suffix = body.slice(end);
  const langMatch = /^@[A-Za-z][A-Za-z0-9-]*/.exec(suffix);
  const dtMatch = /^\^\^<[^>]*>/.exec(suffix);
  if (langMatch) end += langMatch[0].length;
  else if (dtMatch) end += dtMatch[0].length;
  tokens.push({ kind: 'atom', text: body.slice(start, end) });
  return end;
}

// ============================================================================
// Parseo de términos y tripletas
// ============================================================================

function parseNode(text: string): PatternNode {
  if (text.startsWith('?') || text.startsWith('$')) {
    const name = text.slice(1);
    if (name === '') throw unsupported('Variable sin nombre');
    return { type: 'var', name };
  }
  if (text.startsWith('<') && text.endsWith('>')) {
    return { type: 'term', term: namedNode(text.slice(1, -1)) };
  }
  if (text === 'a') {
    return { type: 'term', term: namedNode(RDF_TYPE) };
  }
  if (text.startsWith('"')) {
    return { type: 'term', term: parseLiteral(text) };
  }
  if (/^[+-]?\d+$/.test(text)) {
    return { type: 'term', term: literal(text, xsd.integer) };
  }
  if (/^[+-]?(?:\d+\.\d*|\.\d+|\d+)$/.test(text) && text.includes('.')) {
    return { type: 'term', term: literal(text, xsd.decimal) };
  }
  throw unsupported(`Término no soportado: "${text}" (use ?var, <iri>, "literal" o numérico)`);
}

function parseLiteral(text: string): RdfTerm {
  const match = /^"((?:[^"\\]|\\.)*)"(?:@([A-Za-z][A-Za-z0-9-]*)|\^\^<([^>]*)>)?$/.exec(text);
  if (!match) throw unsupported(`Literal mal formado: ${text}`);
  const value = unescapeLiteral(match[1] ?? '');
  const lang = match[2];
  const datatype = match[3];
  if (lang !== undefined) return literal(value, { lang });
  if (datatype !== undefined) return literal(value, createIri(datatype));
  return literal(value);
}

function unescapeLiteral(raw: string): string {
  return raw.replace(/\\(["\\ntr])/g, (_, esc: string) => {
    switch (esc) {
      case 'n':
        return '\n';
      case 't':
        return '\t';
      case 'r':
        return '\r';
      default:
        return esc;
    }
  });
}

/** Parsea el cuerpo del WHERE (un BGP) en una lista plana de tripletas. */
function parseTriples(tokens: readonly Token[]): ParsedTriple[] {
  const triples: ParsedTriple[] = [];
  let i = 0;
  const atomAt = (idx: number): string => {
    const tok = tokens[idx];
    if (tok === undefined || tok.kind !== 'atom') throw unsupported('Se esperaba un término (sujeto/predicado/objeto)');
    return tok.text;
  };
  while (i < tokens.length) {
    const subject = parseNode(atomAt(i));
    i += 1;
    // PredicateObjectList: predicado seguido de lista de objetos.
    for (;;) {
      const predicate = parseNode(atomAt(i));
      i += 1;
      for (;;) {
        const object = parseNode(atomAt(i));
        i += 1;
        triples.push({ s: subject, p: predicate, o: object });
        if (tokens[i]?.kind === 'punct' && (tokens[i] as { text: string }).text === ',') {
          i += 1;
          continue;
        }
        break;
      }
      if (tokens[i]?.kind === 'punct' && (tokens[i] as { text: string }).text === ';') {
        i += 1;
        continue;
      }
      break;
    }
    if (tokens[i]?.kind === 'punct' && (tokens[i] as { text: string }).text === '.') {
      i += 1;
    }
  }
  return triples;
}

// ============================================================================
// Parseo del SELECT
// ============================================================================

type ParsedQuery = { readonly projection: '*' | readonly string[]; readonly distinct: boolean; readonly triples: ParsedTriple[] };

const FORBIDDEN_KEYWORDS = new Set([
  'FILTER', 'OPTIONAL', 'UNION', 'MINUS', 'BIND', 'SERVICE', 'GRAPH',
  'VALUES', 'GROUP', 'ORDER', 'LIMIT', 'OFFSET', 'HAVING',
]);

/**
 * Detecta cláusulas no soportadas a nivel de **token**, no de string crudo. Un
 * keyword reservado solo se marca cuando aparece como token desnudo (operador
 * de la sintaxis SPARQL); NUNCA cuando va embebido dentro de un IRI `<...>`, un
 * literal entrecomillado `"..."` o una variable `?x` (p.ej. el IRI válido
 * `<http://example.org/vocab#order>` NO debe rechazarse). Evita el falso
 * positivo del antiguo guard basado en `/\bORDER\b/i` sobre el cuerpo completo.
 */
function hasForbiddenKeyword(tokens: readonly Token[]): boolean {
  for (const tok of tokens) {
    if (tok.kind !== 'atom') continue;
    const { text } = tok;
    if (text.startsWith('<') || text.startsWith('"') || text.startsWith('?') || text.startsWith('$') || text.startsWith('_:')) {
      continue;
    }
    if (FORBIDDEN_KEYWORDS.has(text.toUpperCase())) return true;
  }
  return false;
}

function parseQuery(sparql: string): ParsedQuery {
  const head = /^\s*SELECT\s+(DISTINCT\s+|REDUCED\s+)?([\s\S]+?)\s+WHERE\s*\{([\s\S]*)\}\s*$/i.exec(sparql);
  if (!head) {
    throw unsupported('solo se soporta `SELECT [DISTINCT] (* | ?vars) WHERE { <BGP> }`');
  }
  if (/\bPREFIX\b/i.test(sparql)) throw unsupported('PREFIX / nombres prefijados no soportados; use IRIs absolutos <...>');
  const distinct = (head[1] ?? '').trim().toUpperCase() === 'DISTINCT';
  const projectionRaw = (head[2] ?? '').trim();
  const body = head[3] ?? '';
  if (body.includes('{') || body.includes('}')) throw unsupported('grupos anidados `{ }` no soportados (solo un BGP plano)');
  const bodyTokens = tokenize(body);
  if (hasForbiddenKeyword(bodyTokens)) throw unsupported('clausulas FILTER/OPTIONAL/UNION/GRAPH/ORDER/... no soportadas');

  let projection: '*' | string[];
  if (projectionRaw === '*') {
    projection = '*';
  } else {
    projection = projectionRaw.split(/\s+/).map((token) => {
      if (!token.startsWith('?') && !token.startsWith('$')) {
        throw unsupported(`proyección invalida: "${token}" (solo se permiten variables o *)`);
      }
      return token.slice(1);
    });
  }
  return { projection, distinct, triples: parseTriples(bodyTokens) };
}

// ============================================================================
// Evaluación (join de bucles anidados sobre el BGP)
// ============================================================================

function evaluate(query: ParsedQuery, source: QuadSource): SolutionRow[] {
  let solutions: ReadonlyMap<string, RdfTerm>[] = [new Map()];
  for (const triple of query.triples) {
    const next: Map<string, RdfTerm>[] = [];
    for (const solution of solutions) {
      const pattern = buildPattern(triple, solution);
      for (const candidate of source(pattern)) {
        const merged = tryBind(triple, candidate, solution);
        if (merged) next.push(merged);
      }
    }
    solutions = next;
  }
  return project(query, solutions);
}

/** Construye un QuadPattern: posiciones con término o variable ya ligada se fijan; el resto es comodín. */
function buildPattern(triple: ParsedTriple, solution: ReadonlyMap<string, RdfTerm>): QuadPattern {
  const pattern: { -readonly [P in Position]?: RdfTerm } = {};
  for (const pos of POSITIONS) {
    const node = triple[pos];
    if (node.type === 'term') pattern[pos] = node.term;
    else {
      const bound = solution.get(node.name);
      if (bound !== undefined) pattern[pos] = bound;
    }
  }
  return pattern;
}

/** Intenta extender `solution` con las ligaduras impuestas por `quad`; null si hay conflicto. */
function tryBind(triple: ParsedTriple, quad: Quad, solution: ReadonlyMap<string, RdfTerm>): Map<string, RdfTerm> | null {
  const merged = new Map(solution);
  for (const pos of POSITIONS) {
    const node = triple[pos];
    const value = quad[pos];
    if (node.type === 'term') {
      if (termKey(node.term) !== termKey(value)) return null;
      continue;
    }
    const existing = merged.get(node.name);
    if (existing === undefined) merged.set(node.name, value);
    else if (termKey(existing) !== termKey(value)) return null;
  }
  return merged;
}

function project(query: ParsedQuery, solutions: readonly ReadonlyMap<string, RdfTerm>[]): SolutionRow[] {
  const vars = query.projection === '*' ? collectVars(query.triples) : query.projection;
  const rows: SolutionRow[] = [];
  const seen = query.distinct ? new Set<string>() : undefined;
  for (const solution of solutions) {
    const row: SolutionRow = {};
    for (const name of vars) {
      const term = solution.get(name);
      if (term !== undefined) row[name] = term;
    }
    if (seen) {
      const key = vars.map((v) => (row[v] ? termKey(row[v]!) : '')).join('\u0002');
      if (seen.has(key)) continue;
      seen.add(key);
    }
    rows.push(row);
  }
  return rows;
}

function collectVars(triples: readonly ParsedTriple[]): string[] {
  const ordered: string[] = [];
  const seen = new Set<string>();
  for (const triple of triples) {
    for (const pos of POSITIONS) {
      const node = triple[pos];
      if (node.type === 'var' && !seen.has(node.name)) {
        seen.add(node.name);
        ordered.push(node.name);
      }
    }
  }
  return ordered;
}

function unsupported(detail: string): Error {
  return new Error(`[GraphStore] consulta SPARQL no soportada: ${detail}`);
}

/** Parsea + evalúa una consulta SELECT contra la fuente de quads del store. */
export function runSelect(sparql: string, source: QuadSource): SolutionRow[] {
  return evaluate(parseQuery(sparql), source);
}
