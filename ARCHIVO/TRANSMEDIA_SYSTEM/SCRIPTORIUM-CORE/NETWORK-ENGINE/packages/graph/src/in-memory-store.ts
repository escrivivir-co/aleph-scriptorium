/**
 * Adaptador de referencia: triple-store in-memory que implementa
 * {@link GraphStoreProtocol}. CERO dependencias de runtime (solo `rxjs` como
 * peer, igual que `core`). Sirve de implementación neutral del contrato y de
 * banco de pruebas para garantizar la sustituibilidad de otros adaptadores.
 *
 * Indexación: tres índices redundantes SPO / POS / OSP, cada uno como un Map
 * anidado de claves canónicas de término ({@link termKey}). El grafo nombrado
 * vive en el nivel hoja (Map<graphKey, Quad>), de modo que `match`/`remove`
 * filtran por `g` sin necesidad de un cuarto índice. La elección de índice se
 * hace según qué posiciones del patrón están ligadas, minimizando el escaneo.
 */

import { Observable } from 'rxjs';
import type {
  Bindings,
  GraphStoreProtocol,
  Quad,
  QuadPattern,
  RdfTerm,
  SelectVars,
} from '@network-engine/core';
import { graphKey, quadKey, termKey } from './keys';
import { runSelect } from './sparql';

type Position = 's' | 'p' | 'o';

/** Nivel hoja: grafo nombrado -> quad concreto (también deduplica por `g`). */
type QuadLeaf = Map<string, Quad>;
/** Map anidado de 3 niveles de claves de término + hoja por grafo. */
type TripleIndex = Map<string, Map<string, Map<string, QuadLeaf>>>;

const SPO_ORDER: readonly [Position, Position, Position] = ['s', 'p', 'o'];
const POS_ORDER: readonly [Position, Position, Position] = ['p', 'o', 's'];
const OSP_ORDER: readonly [Position, Position, Position] = ['o', 's', 'p'];

export class InMemoryGraphStore implements GraphStoreProtocol {
  public readonly capability = 'rdf-sparql' as const;

  private readonly spo: TripleIndex = new Map();
  private readonly pos: TripleIndex = new Map();
  private readonly osp: TripleIndex = new Map();

  /** Conjunto de claves totales de quad: deduplicación O(1) en `add`. */
  private readonly present = new Set<string>();

  /** Número de quads distintos almacenados. */
  public get size(): number {
    return this.present.size;
  }

  public add(quads: readonly Quad[]): Promise<void> {
    for (const q of quads) {
      const sKey = termKey(q.s);
      const pKey = termKey(q.p);
      const oKey = termKey(q.o);
      const gKey = graphKey(q.g);
      const full = quadKey(sKey, pKey, oKey, gKey);
      if (this.present.has(full)) continue;
      this.present.add(full);
      insert(this.spo, sKey, pKey, oKey, gKey, q);
      insert(this.pos, pKey, oKey, sKey, gKey, q);
      insert(this.osp, oKey, sKey, pKey, gKey, q);
    }
    return Promise.resolve();
  }

  public remove(pattern: QuadPattern): Promise<number> {
    const doomed = [...this.matchSync(pattern)];
    for (const q of doomed) {
      const sKey = termKey(q.s);
      const pKey = termKey(q.p);
      const oKey = termKey(q.o);
      const gKey = graphKey(q.g);
      this.present.delete(quadKey(sKey, pKey, oKey, gKey));
      drop(this.spo, sKey, pKey, oKey, gKey);
      drop(this.pos, pKey, oKey, sKey, gKey);
      drop(this.osp, oKey, sKey, pKey, gKey);
    }
    return Promise.resolve(doomed.length);
  }

  public match(pattern: QuadPattern): Observable<Quad> {
    return new Observable<Quad>((subscriber) => {
      for (const q of this.matchSync(pattern)) subscriber.next(q);
      subscriber.complete();
    });
  }

  public query<const Q extends string>(sparql: Q): Observable<Bindings<SelectVars<Q>>>;
  public query<TVars extends string = never>(sparql: string): Observable<Bindings<TVars>>;
  public query(sparql: string): Observable<Record<string, RdfTerm>> {
    return new Observable<Record<string, RdfTerm>>((subscriber) => {
      try {
        const rows = runSelect(sparql, (pattern) => this.matchSync(pattern));
        for (const row of rows) subscriber.next(row);
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });
  }

  /**
   * Iterador sincrónico de quads que casan con el patrón. Elige el índice cuyo
   * nivel inicial esté ligado (S→SPO, O→OSP, P→POS) para podar el escaneo, y
   * filtra el grafo en la hoja.
   */
  private *matchSync(pattern: QuadPattern): Generator<Quad> {
    if (pattern.s !== undefined) {
      yield* traverse(this.spo, SPO_ORDER, pattern);
    } else if (pattern.o !== undefined) {
      yield* traverse(this.osp, OSP_ORDER, pattern);
    } else if (pattern.p !== undefined) {
      yield* traverse(this.pos, POS_ORDER, pattern);
    } else {
      yield* traverse(this.spo, SPO_ORDER, pattern);
    }
  }
}

// ============================================================================
// Helpers de índice (libres de estado)
// ============================================================================

function insert(index: TripleIndex, k1: string, k2: string, k3: string, gKey: string, quad: Quad): void {
  let level1 = index.get(k1);
  if (level1 === undefined) {
    level1 = new Map();
    index.set(k1, level1);
  }
  let level2 = level1.get(k2);
  if (level2 === undefined) {
    level2 = new Map();
    level1.set(k2, level2);
  }
  let leaf = level2.get(k3);
  if (leaf === undefined) {
    leaf = new Map();
    level2.set(k3, leaf);
  }
  leaf.set(gKey, quad);
}

function drop(index: TripleIndex, k1: string, k2: string, k3: string, gKey: string): void {
  const level1 = index.get(k1);
  const level2 = level1?.get(k2);
  const leaf = level2?.get(k3);
  if (!level1 || !level2 || !leaf) return;
  leaf.delete(gKey);
  if (leaf.size > 0) return;
  level2.delete(k3);
  if (level2.size > 0) return;
  level1.delete(k2);
  if (level1.size > 0) return;
  index.delete(k1);
}

/** Recorre un índice respetando `order`, navegando posiciones ligadas y escaneando las libres. */
function* traverse(
  index: TripleIndex,
  order: readonly [Position, Position, Position],
  pattern: QuadPattern,
): Generator<Quad> {
  const [p0, p1, p2] = order;
  const key0 = keyOf(pattern, p0);
  const wantGraph = pattern.g !== undefined ? graphKey(pattern.g) : undefined;

  for (const level1 of pick(index, key0)) {
    const key1 = keyOf(pattern, p1);
    for (const level2 of pick(level1, key1)) {
      const key2 = keyOf(pattern, p2);
      for (const leaf of pick(level2, key2)) {
        if (wantGraph !== undefined) {
          const q = leaf.get(wantGraph);
          if (q !== undefined) yield q;
        } else {
          yield* leaf.values();
        }
      }
    }
  }
}

function keyOf(pattern: QuadPattern, position: Position): string | undefined {
  const term = pattern[position];
  return term !== undefined ? termKey(term) : undefined;
}

/** Si `key` está ligada, navega a ese único sub-map (o nada); si no, escanea todos. */
function pick<V>(map: Map<string, V>, key: string | undefined): Iterable<V> {
  if (key === undefined) return map.values();
  const value = map.get(key);
  return value !== undefined ? [value] : [];
}
