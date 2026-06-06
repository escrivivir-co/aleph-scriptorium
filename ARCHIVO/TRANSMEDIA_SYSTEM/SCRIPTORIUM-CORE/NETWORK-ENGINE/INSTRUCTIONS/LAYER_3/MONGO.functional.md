# Mongo Adapter — Functional Constitution

## Purpose

Provide durable document storage with change notifications for Network-Engine domains that declare `DomainContract.storage`.

## Functional guarantees

* **Write path:** XState effects or explicit mutation handlers call `insert` / `update` / `delete`.
* **Read path:** MCP `readResource` and GraphQL Query resolvers read the same read-model via `DocumentStoreProtocol`.
* **Change notification:** Mongo change streams → domain events → `notifyResourceUpdated` (when mappers are configured).

## Non-goals

* Generic entity CRUD tools.
* Schema migration (host app responsibility).

## References

- [MONGO.instructions.md](../LAYER_1/MONGO.instructions.md)
- [DOCUMENT_STORE.instructions.md](../LAYER_1/DOCUMENT_STORE.instructions.md)
