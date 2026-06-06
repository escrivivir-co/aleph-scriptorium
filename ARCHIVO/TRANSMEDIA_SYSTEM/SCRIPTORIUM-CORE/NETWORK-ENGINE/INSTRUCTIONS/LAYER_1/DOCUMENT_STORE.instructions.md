# Document Store Protocol — Technical Constitution

> **Contrato:** `@network-engine/core` → `DocumentStoreProtocol` · **ADR:** [0005](../../ADR/0005-document-store-async-first.md)

## Role

Async-first **document persistence protocol** in Capa 1. Sibling of `GraphStoreProtocol` (RDF/SPARQL); does not replace it.

## Contract surface

Defined in [`packages/core/src/protocols/document-store.ts`](../../packages/core/src/protocols/document-store.ts):

- Async CRUD: `get`, `find`, `insert`, `update`, `delete`
- Reactive changes: `changes(collection?)` → `Observable<DocumentChange>`
- Capability key: `'document-store'`

## Domain binding

`DomainContract.storage` declares collection + capability + version — **without implying auto-CRUD**.

## Implementations

| Adapter | Package |
| --- | --- |
| In-memory (tests) | `@network-engine/mongo` → `InMemoryDocumentStore` |
| MongoDB + change streams | `@network-engine/mongo` → `MongoDocumentStore` |

## Sync loop

Storage events feed the orchestrator via mappers in `@network-engine/network-engine` ([ADR 0007](../../ADR/0007-change-stream-xstate-loop.md)). Mappers **never** live in `core`.

## References

- [MONGO.instructions.md](MONGO.instructions.md)
- [CORE.instructions.md](CORE.instructions.md)
