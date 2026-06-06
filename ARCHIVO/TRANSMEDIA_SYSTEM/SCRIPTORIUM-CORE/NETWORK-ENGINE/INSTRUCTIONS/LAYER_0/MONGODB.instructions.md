# MongoDB — LAYER_0 technology protocol

> **Modo:** ASI MODE · **Capa:** LAYER_0 · **ADR:** [0005-document-store-async-first.md](../../ADR/0005-document-store-async-first.md)

## Role in Network-Engine

MongoDB is the **first concrete driver** for `DocumentStoreProtocol` (`@network-engine/mongo`). It is a LAYER_0 materialization — not part of `core`.

## Requirements

- **Change streams** require a **replica-set** (even single-node). Docker compose initializes `rs0` automatically ([ADR 0008](../../ADR/0008-docker-topology.md)).
- Connection URI convention: `MONGO_URI=mongodb://host:27017/?replicaSet=rs0`
- Database name: `MONGO_DATABASE` (default `network_engine`)

## Package mapping

| Artifact | Location |
| --- | --- |
| Protocol contract | `@network-engine/core` → `DocumentStoreProtocol` |
| Mongo adapter | `@network-engine/mongo` → `MongoDocumentStore`, `MongoStorePlugin` |
| In-memory test double | `@network-engine/mongo` → `InMemoryDocumentStore` |

## Guard rails

- `core` **must not** import `mongodb`.
- No auto-CRUD: persistence effects flow through declared `MutationCapability` / XState, not generic REST/MCP tools.

## References

- [`packages/mongo`](../../packages/mongo)
- [`INSTRUCTIONS/LAYER_1/MONGO.instructions.md`](../LAYER_1/MONGO.instructions.md)
- [`INSTRUCTIONS/LAYER_0/GRAPHQL.instructions.md`](GRAPHQL.instructions.md) (read-model queries)
