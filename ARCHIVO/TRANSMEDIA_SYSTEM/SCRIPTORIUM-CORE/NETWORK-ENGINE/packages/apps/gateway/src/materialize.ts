import {
  type GraphStoreProtocol,
  type Quad,
  literal,
  namedNode,
  quad,
  rdf,
  rdfs,
  xsd,
} from '@network-engine/core';

export const DEFAULT_ENTITY_BASE_IRI = 'http://network-engine/entities/';

const NETWORK_VOCAB = 'http://network-engine/';

export function entityIri(id: string, baseIri = DEFAULT_ENTITY_BASE_IRI): string {
  return `${baseIri}${id}`;
}

export function entityToQuads(
  doc: Record<string, unknown>,
  baseIri = DEFAULT_ENTITY_BASE_IRI,
): Quad[] {
  const id = typeof doc.id === 'string' ? doc.id : undefined;
  if (id === undefined) return [];

  const subject = namedNode(entityIri(id, baseIri));
  const quads: Quad[] = [
    quad(subject, namedNode(rdf('type')), namedNode(`${NETWORK_VOCAB}Entity`)),
  ];

  const label = typeof doc.name === 'string' ? doc.name : id;
  quads.push(quad(subject, namedNode(rdfs('label')), literal(label)));

  for (const [key, value] of Object.entries(doc)) {
    if (key === 'id' || key === '_id' || key === 'name') continue;
    if (typeof value === 'string') {
      quads.push(quad(subject, namedNode(`${NETWORK_VOCAB}${key}`), literal(value)));
    } else if (typeof value === 'number') {
      quads.push(
        quad(subject, namedNode(`${NETWORK_VOCAB}${key}`), literal(String(value), xsd.integer)),
      );
    }
  }

  return quads;
}

export async function syncEntityToGraph(
  graph: GraphStoreProtocol,
  doc: Record<string, unknown>,
  baseIri = DEFAULT_ENTITY_BASE_IRI,
): Promise<void> {
  const id = typeof doc.id === 'string' ? doc.id : undefined;
  if (id === undefined) return;

  const subject = namedNode(entityIri(id, baseIri));
  await graph.remove({ s: subject });
  await graph.add(entityToQuads(doc, baseIri));
}
