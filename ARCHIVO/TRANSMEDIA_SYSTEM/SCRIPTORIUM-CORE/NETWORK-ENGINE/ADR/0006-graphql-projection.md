# ADR 0006: GraphQL como proyección declarativa del DomainContract

## Estado

Aceptado.

## Contexto

MCP ya proyecta `DomainContract` de forma declarativa vía `projectDomainToMCP` ([ADR 0004](./0004-mcp-apps-ui-projection.md)). GraphQL debe ser otra proyección desde la misma fuente de verdad, no un gateway CRUD paralelo.

Regla de guarda heredada del ECOSYSTEM: `core` no importa `graphql`; la proyección es pura y el adapter de runtime consume el resultado.

## Decisión

### 1. Proyección pura en `@network-engine/graphql`

`projectDomainToGraphQL(contract): GraphQLProjectionResult`:

| Contrato | Proyección GraphQL |
| --- | --- |
| `resources` | campos `Query` (colección + by-id desde templates URI) |
| `mutations` (`MutationCapability`) | campos `Mutation` |
| (resto) | no se proyecta automáticamente |

**Sin CRUD automático:** solo lo declarado explícitamente en el contrato.

### 2. Adapter de runtime

- Resolvers de **Query** leen del `DocumentStoreProtocol` (read-model) cuando el contrato declara `storage`.
- Resolvers de **Mutation** hacen `dispatch` al orquestador — misma semántica que tools MCP vía `createActorToolHandler`.

### 3. Simetría MCP ↔ GraphQL

| Semántica | MCP | GraphQL |
| --- | --- | --- |
| Lectura | `readResource` | Query resolver → `DocumentStore.get/find` |
| Efecto | `executeTool` | Mutation resolver → `orchestrator.dispatch` |
| Notificación | `notifyResourceUpdated` | (MCP SSE; GraphQL clients pueden usar subscriptions futuras) |

## Consecuencias

### Positivas

- Un `DomainContract` alimenta MCP y GraphQL sin divergencia.
- Resource-first preservado: queries/resources = lectura; mutations/tools = efectos.

### Negativas / Límites

- Subscriptions GraphQL no forman parte de esta fase; las notificaciones push quedan en MCP runtime por ahora.
- El schema GraphQL generado es mínimo (JSON scalar para documentos); refinamiento por dominio es responsabilidad del contrato.

## Referencias

- [`packages/graphql/src/projection.ts`](../packages/graphql/src/projection.ts)
- [`packages/mcp/src/projection.ts`](../packages/mcp/src/projection.ts)
- [`INSTRUCTIONS/LAYER_0/GRAPHQL.instructions.md`](../INSTRUCTIONS/LAYER_0/GRAPHQL.instructions.md)
