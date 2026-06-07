/**
 * Canonicalización de términos RDF a claves de string estables.
 *
 * Las claves son el sustrato de los índices SPO/POS/OSP: dos términos iguales
 * (misma `kind` + componentes) producen exactamente la misma clave, y términos
 * distintos nunca colisionan.
 *
 * Se usan separadores de control (\u0001, \u0002) por ser muy improbables en
 * datos reales, PERO una forma léxica de literal SÍ puede contenerlos (RDF
 * permite cualquier código Unicode en `xsd:string`). Para garantizar inyectividad
 * sin depender de esa suposición, el campo libre `value` del literal se
 * **prefija con su longitud**: así, aunque `value` contenga el separador, los
 * límites de campo quedan determinados y la clave sigue siendo inyectiva.
 */

import type { RdfTerm } from '@network-engine/core';

const UNIT = '\u0001';
const RECORD = '\u0002';

/** Clave canónica de un término. El prefijo de `kind` evita colisiones entre uniones. */
export function termKey(term: RdfTerm): string {
  switch (term.kind) {
    case 'NamedNode':
      return `N${UNIT}${term.value}`;
    case 'BlankNode':
      return `B${UNIT}${term.value}`;
    case 'Literal':
      // `value` se prefija con su longitud para que un separador embebido en la
      // forma léxica no pueda desplazar los límites de campo (inyectividad).
      return `L${UNIT}${term.value.length}${UNIT}${term.value}${UNIT}${term.datatype}${UNIT}${term.lang ?? ''}`;
  }
}

/** Default graph (g ausente) => clave centinela; cualquier otro grafo usa su {@link termKey}. */
export const DEFAULT_GRAPH_KEY = `D${UNIT}`;

export function graphKey(graph: RdfTerm | undefined): string {
  return graph === undefined ? DEFAULT_GRAPH_KEY : termKey(graph);
}

/** Clave total de un quad (s,p,o,g): identidad para deduplicación del store. */
export function quadKey(s: string, p: string, o: string, g: string): string {
  return `${s}${RECORD}${p}${RECORD}${o}${RECORD}${g}`;
}
