# ADR 0005: DocumentStoreProtocol — persistencia documental async-first

## Estado

Aceptado.

## Contexto

Network-Engine ya define `GraphStoreProtocol` para grafos RDF/SPARQL ([ADR 0002](./0002-graphstore-rdf-protocol.md)). Los dominios Resource-first también necesitan persistencia documental (colecciones JSON/BSON) con un contrato agnóstico al motor, reactivo y swappable — hermano de `GraphStoreProtocol`, no su reemplazo.

El SDK legacy usaba `IStorageAdapter` síncrono acoplado a CRUD genérico. La nueva máquina exige:

- Contrato en `core` sin importar `mongodb` ni drivers concretos.
- Operaciones async-first (`Promise`) para escritura y lectura puntual.
- Stream reactivo (`Observable`) para change notifications (change streams).
- Binding explícito en `DomainContract.storage` (colección + capacidad), sin CRUD automático.

## Decisión

### 1. `DocumentStoreProtocol` en `core/protocols/document-store.ts`

```ts
interface DocumentChange<T> {
  kind: 'insert' | 'update' | 'delete';
  collection: string;
  id: string;
  doc?: T;
  ts: number;
}

interface DocumentStoreProtocol extends ProtocolService<'document-store'> {
  readonly capability: 'document-store';
  get<T>(collection: string, id: string): Promise<T | null>;
  find<T>(collection: string, query: Record<string, unknown>): Promise<T[]>;
  insert<T>(collection: string, doc: T): Promise<string>;
  update<T>(collection: string, id: string, patch: Partial<T>): Promise<void>;
  delete(collection: string, id: string): Promise<number>;
  changes<T>(collection?: string): Observable<DocumentChange<T>>;
}
```

### 2. Registro en `CapabilityServiceRegistry`

Module augmentation en `document-store.ts`, mismo patrón que `graph-store.ts`.

### 3. Campo `storage?` en `DomainContract`

```ts
storage?: { capability: Capability; collection: string; version: SemVer };
```

Declara dónde vive el read-model del dominio sin implicar operaciones CRUD automáticas.

### 4. Primer adaptador: `@network-engine/mongo`

`MongoDocumentStore` + `MongoStorePlugin` encapsulan el driver `mongodb` y `collection.watch()` como `changes()`.

## Consecuencias

### Positivas

- `core` permanece agnóstico al motor documental.
- Change streams habilitan el cierre del loop reactivo ([ADR 0007](./0007-change-stream-xstate-loop.md)).
- Simetría con el patrón GraphStore: contrato en core, adaptadores en paquetes periféricos.

### Negativas / Riesgos

- Change streams de MongoDB exigen replica-set (incluso un nodo); contemplado en Docker ([ADR 0008](./0008-docker-topology.md)).
- El mapper storage → `InferEvent` vive fuera de `core` (composition root o adapter).

## Referencias

- [`packages/core/src/protocols/document-store.ts`](../packages/core/src/protocols/document-store.ts)
- [`packages/mongo`](../packages/mongo)
- [`DOSSIERS/conceptual-physical-alignment.md`](../DOSSIERS/conceptual-physical-alignment.md)
