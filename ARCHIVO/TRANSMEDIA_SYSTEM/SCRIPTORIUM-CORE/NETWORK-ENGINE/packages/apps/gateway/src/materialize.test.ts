import { describe, expect, test } from 'bun:test';
import { namedNode, rdf, rdfs, xsd } from '@network-engine/core';
import { entityIri, entityToQuads } from './materialize';

describe('entityToQuads', () => {
  test('emits type, label, and scalar properties', () => {
    const quads = entityToQuads({ id: 'e1', name: 'Alpha', score: 42 });

    expect(quads).toHaveLength(3);

    const subject = namedNode(entityIri('e1'));
    expect(quads[0]).toEqual({
      s: subject,
      p: namedNode(rdf('type')),
      o: namedNode('http://network-engine/Entity'),
    });
    expect(quads[1]).toEqual({
      s: subject,
      p: namedNode(rdfs('label')),
      o: { kind: 'Literal', value: 'Alpha', datatype: xsd.string },
    });

    const scoreQuad = quads.find((q) => q.p.value.endsWith('score'));
    expect(scoreQuad?.o).toEqual({
      kind: 'Literal',
      value: '42',
      datatype: xsd.integer,
    });
  });

  test('uses id as rdfs:label when name is absent', () => {
    const quads = entityToQuads({ id: 'e2' });
    const labelQuad = quads.find((q) => q.p.value.endsWith('label'));
    expect(labelQuad?.o).toEqual({
      kind: 'Literal',
      value: 'e2',
      datatype: xsd.string,
    });
  });

  test('skips _id and non-scalar values', () => {
    const quads = entityToQuads({
      id: 'e3',
      _id: 'ignored',
      nested: { x: 1 },
      active: true,
    });

    expect(quads).toHaveLength(2);
    expect(quads.some((q) => q.p.value.endsWith('_id'))).toBe(false);
    expect(quads.some((q) => q.p.value.endsWith('nested'))).toBe(false);
    expect(quads.some((q) => q.p.value.endsWith('active'))).toBe(false);
  });

  test('returns empty array when id is missing', () => {
    expect(entityToQuads({ name: 'NoId' })).toEqual([]);
  });
});
