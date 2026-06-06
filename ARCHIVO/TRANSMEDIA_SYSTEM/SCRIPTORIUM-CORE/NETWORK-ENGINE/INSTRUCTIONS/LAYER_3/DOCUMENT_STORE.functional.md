# Document Store Protocol — Functional Constitution

## Purpose

Unify document persistence and reactive change notification under one swappable protocol, independent of MongoDB or any specific driver.

## Functional contract

The read-model and write-model share one store interface. Consumers:

| Consumer | Operation |
| --- | --- |
| GraphQL Query | `get` / `find` |
| MCP readResource | `get` / `find` |
| XState effects | `insert` / `update` / `delete` |
| Sync loop | `changes()` stream |

## Domain declaration

Hosts attach storage to contracts:

```ts
storage: {
  capability: 'document-store',
  collection: 'my_collection',
  version: '1.0.0',
}
```

## References

- [DOCUMENT_STORE.instructions.md](../LAYER_1/DOCUMENT_STORE.instructions.md)
- [ADR 0005](../../ADR/0005-document-store-async-first.md)
