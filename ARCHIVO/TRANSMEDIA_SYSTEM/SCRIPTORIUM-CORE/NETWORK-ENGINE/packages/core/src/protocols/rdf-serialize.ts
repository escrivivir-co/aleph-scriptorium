/**
 * Capa 0 — Serialización PURA de términos RDF a sintaxis SPARQL/Turtle/N-Triples.
 *
 * Única fuente de verdad para el escapado/validación de términos. Vive en `core`
 * porque son funciones puras, sin dependencias de runtime ni de motor, alineadas
 * con las gramáticas del W3C (N-Triples STRING_LITERAL_QUOTE, SPARQL IRIREF,
 * BLANK_NODE_LABEL, LANGTAG). Tanto el adaptador GraphDB (`@network-engine/node`)
 * como el DSL tipado (`./sparql-dsl`) reutilizan estas helpers para que el texto
 * SPARQL generado sea consistente y, sobre todo, **seguro frente a inyección**.
 */

import type { Iri, RdfTerm } from './rdf';

// ============================================================================
// Validadores de gramática (lanzan Error claro en entradas no válidas)
// ============================================================================

/**
 * LANGTAG de BCP47 (forma léxica de RDF): `^[A-Za-z]+(-[A-Za-z0-9]+)*$`.
 * NO se interpola un tag sin validar, ya que se concatena tras `"..."@`.
 */
const LANG_TAG = /^[A-Za-z]+(-[A-Za-z0-9]+)*$/;

/** Valida un language tag y lo devuelve; lanza si no casa con la gramática. */
export function validateLangTag(lang: string): string {
  if (!LANG_TAG.test(lang)) {
    throw new Error(
      `[rdf-serialize] invalid language tag ${JSON.stringify(lang)}; expected /^[A-Za-z]+(-[A-Za-z0-9]+)*$/`,
    );
  }
  return lang;
}

/**
 * Subconjunto pragmático y seguro de `BLANK_NODE_LABEL`/PN_CHARS de SPARQL:
 * `^[A-Za-z0-9_]([A-Za-z0-9_.-]*[A-Za-z0-9_-])?$` (no permite `.` final, ni
 * caracteres de control/espacio que romperían `_:label`).
 */
const BLANK_NODE_LABEL = /^[A-Za-z0-9_]([A-Za-z0-9_.-]*[A-Za-z0-9_-])?$/;

/** Valida una etiqueta de blank node y la devuelve; lanza si no es segura. */
export function validateBlankNodeLabel(label: string): string {
  if (!BLANK_NODE_LABEL.test(label)) {
    throw new Error(
      `[rdf-serialize] invalid blank node label ${JSON.stringify(label)}; expected a safe BLANK_NODE_LABEL subset`,
    );
  }
  return label;
}

// ============================================================================
// Escapado de formas léxicas
// ============================================================================

/** Codifica un code point como UCHAR de SPARQL (`\uXXXX` o `\UXXXXXXXX`). */
function uchar(codePoint: number): string {
  if (codePoint <= 0xffff) {
    return `\\u${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
  }
  return `\\U${codePoint.toString(16).toUpperCase().padStart(8, '0')}`;
}

/**
 * Escapa la forma léxica de un literal según la producción N-Triples/Turtle
 * `STRING_LITERAL_QUOTE` (comillas dobles): backslash, comilla, controles
 * frecuentes vía ECHAR y cualquier otro control (`U+0000–U+001F`, `U+007F`) vía
 * UCHAR. El resultado va SIEMPRE entre comillas dobles por el llamante.
 */
export function escapeRdfLiteral(value: string): string {
  let out = '';
  for (const ch of value) {
    switch (ch) {
      case '\\':
        out += '\\\\';
        break;
      case '"':
        out += '\\"';
        break;
      case '\n':
        out += '\\n';
        break;
      case '\r':
        out += '\\r';
        break;
      case '\t':
        out += '\\t';
        break;
      case '\b':
        out += '\\b';
        break;
      case '\f':
        out += '\\f';
        break;
      default: {
        const cp = ch.codePointAt(0)!;
        out += cp <= 0x1f || cp === 0x7f ? uchar(cp) : ch;
      }
    }
  }
  return out;
}

/**
 * Caracteres prohibidos dentro de un `IRIREF` (`<...>`) de SPARQL:
 * `<`, `>`, `"`, `{`, `}`, `|`, `^`, `` ` ``, `\` y todo `U+0000–U+0020`
 * (incluye el espacio). Cualquiera de ellos se escapa como UCHAR `\uXXXX`,
 * que es la ÚNICA forma legal de representarlos en un IRIREF.
 */
// eslint-disable-next-line no-control-regex
const IRI_FORBIDDEN = /[<>"{}|^`\\\u0000-\u0020]/g;

/**
 * Serializa un IRI a su forma `<...>` válida y segura: valida-y-escapa los
 * caracteres prohibidos por la gramática IRIREF mediante UCHAR. Reemplaza al
 * antiguo `escapeIri`, que emitía secuencias ILEGALES (`\\`, `\>`).
 */
export function serializeIriRef(iri: Iri | string): string {
  const escaped = String(iri).replace(IRI_FORBIDDEN, (ch) => uchar(ch.codePointAt(0)!));
  return `<${escaped}>`;
}

// ============================================================================
// Serialización de un RdfTerm completo a sintaxis SPARQL/Turtle
// ============================================================================

/**
 * Serializa un {@link RdfTerm} a su forma textual para una tripleta SPARQL.
 * Es la única implementación de este mapeo en la plataforma: la usan tanto el
 * adaptador GraphDB como el DSL tipado.
 */
export function termToSparql(term: RdfTerm): string {
  switch (term.kind) {
    case 'NamedNode':
      return serializeIriRef(term.value);
    case 'BlankNode':
      return `_:${validateBlankNodeLabel(term.value)}`;
    case 'Literal': {
      const lex = `"${escapeRdfLiteral(term.value)}"`;
      // Un lang-tagged literal nunca lleva `^^<datatype>` explícito (su tipo es
      // rdf:langString implícito); los demás sí.
      if (term.lang !== undefined) return `${lex}@${validateLangTag(term.lang)}`;
      return `${lex}^^${serializeIriRef(term.datatype)}`;
    }
  }
}
