# GraphQL — LAYER_0 technology protocol

> **Modo:** ASI MODE · **Capa:** LAYER_0 · **ADR:** [0006-graphql-projection.md](../../ADR/0006-graphql-projection.md)

## Role in Network-Engine

GraphQL is a **declarative projection** of `DomainContract`, sibling to MCP projection. It is **not** a CRUD gateway.

## Semantics (Resource-first)

| GraphQL | DomainContract | Runtime behavior |
| --- | --- | --- |
| `Query` fields | `resources` | Read from `DocumentStoreProtocol` when `storage` is declared |
| `Mutation` fields | `mutations` | `dispatch` to `NetworkOrchestrator` (same as MCP tools) |

Only explicitly declared contract fields are projected — **no automatic CRUD**.

## Package mapping

| Artifact | Location |
| --- | --- |
| Pure projection | `@network-engine/graphql/projection` → `projectDomainToGraphQL` |
| Runtime adapter | `@network-engine/graphql` → `createGraphQLRuntime` |
| HTTP gateway (Docker) | `@network-engine/edge-graphql` → `startGraphQLServer` (entrypoint: `packages/apps/gateway`) |

## Guard rails

- `core` **must not** import `graphql`.
- Projection functions are **pure** (no server, no store I/O).
- Mutations share `createActorToolHandler` bridge with MCP ([ADR 0007](../../ADR/0007-change-stream-xstate-loop.md)).

## References

- [`packages/graphql`](../../packages/graphql)
- [`INSTRUCTIONS/LAYER_1/GRAPHQL.instructions.md`](../LAYER_1/GRAPHQL.instructions.md)
- [`packages/mcp/src/projection.ts`](../../packages/mcp/src/projection.ts) (MCP symmetry)
