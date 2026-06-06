# Mongo Adapter — Technical Constitution

> **Paquete:** `@network-engine/mongo` · **ADR:** [0005](../../ADR/0005-document-store-async-first.md)

## Architecture

Implements `DocumentStoreProtocol` against MongoDB with change streams exposed as RxJS `Observable`.

* **Required:** depend only on `@network-engine/core` + `mongodb` driver.
* **Required:** `MongoStorePlugin` implements `NetworkPlugin<…, MongoStoreConfig, 'document-store'>`.
* **Prohibited:** domain logic or GraphQL/MCP imports.

## Components

| Export | Role |
| --- | --- |
| `MongoDocumentStore` | CRUD + `changes()` via `collection.watch()` |
| `MongoStorePlugin` | Plugin lifecycle wrapper |
| `InMemoryDocumentStore` | Test/dev double without replica-set |

## Configuration

```ts
MongoStorePlugin.install({
  uri: process.env.MONGO_URI!,
  database: process.env.MONGO_DATABASE ?? 'network_engine',
});
```

See [`packages/mongo/.env.example`](../../packages/mongo/.env.example).

## References

- [MONGODB.instructions.md](../LAYER_0/MONGODB.instructions.md)
- [DOCUMENT_STORE.instructions.md](DOCUMENT_STORE.instructions.md)
