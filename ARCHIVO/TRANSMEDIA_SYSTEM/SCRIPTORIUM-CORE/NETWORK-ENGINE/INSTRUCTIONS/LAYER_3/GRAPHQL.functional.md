# GraphQL Projection — Functional Constitution

## Purpose

Offer a schema-driven query/mutation API projected from the same `DomainContract` that drives MCP — preserving Resource-first semantics.

## User-visible behavior

* **Query:** returns documents from the declared collection (list or by-id from URI templates).
* **Mutation:** accepts input and forwards to the orchestrator as a domain event (identical semantics to MCP tool execution).

## Non-goals

* GraphQL subscriptions (deferred; MCP SSE handles push notifications in this phase).
* Automatic schema generation from JSON Schema (minimal JSON scalar only).

## References

- [GRAPHQL.instructions.md](../LAYER_1/GRAPHQL.instructions.md)
- [ADR 0006](../../ADR/0006-graphql-projection.md)
