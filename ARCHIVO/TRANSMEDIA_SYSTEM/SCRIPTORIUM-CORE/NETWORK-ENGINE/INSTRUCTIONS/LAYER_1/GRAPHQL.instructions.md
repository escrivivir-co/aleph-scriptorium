# GraphQL Projection — Technical Constitution

> **Paquete:** `@network-engine/graphql` · **ADR:** [0006](../../ADR/0006-graphql-projection.md)

## Architecture

Two layers, mirroring `@network-engine/mcp`:

1. **Projection (pure):** `projectDomainToGraphQL(contract)` — no runtime I/O.
2. **Runtime adapter:** `createGraphQLRuntime` — resolvers read `DocumentStoreProtocol`, mutations dispatch to orchestrator.

## Exports

| Subpath | Symbol |
| --- | --- |
| `@network-engine/graphql` | `createGraphQLRuntime`, `startGraphQLServer` |
| `@network-engine/graphql/projection` | `projectDomainToGraphQL` |
| `@network-engine/graphql/server` | `startGraphQLServer` |

## Resource-first rule

Queries map to **resources** (read-model). Mutations map to **MutationCapability** only. Launchers and prompts are not auto-projected in this phase.

## References

- [GRAPHQL.instructions.md](../LAYER_0/GRAPHQL.instructions.md)
- [`packages/graphql/src/projection.ts`](../../packages/graphql/src/projection.ts)
