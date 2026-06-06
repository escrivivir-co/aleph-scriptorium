# ADR 0007: Change streams → NetworkOrchestrator → XState; cierre del loop MCP

## Estado

Aceptado.

## Contexto

Antes de esta fase, `createNetworkEngine` ensamblaba el orquestador, pubsub y mcp-runtime de forma aislada: dos buses RxJS sin conexión entre storage, XState y notificaciones MCP.

El programa ASI exige cerrar el loop:

```text
Mutation (MCP/GraphQL) → dispatch → XState → effect → DocumentStore
DocumentStore.changes() → dispatch (domain event) → notifyResourceUpdated(uri)
readResource / Query → DocumentStore (read-model)
```

## Decisión

### 1. Composition root (`packages/network-engine`)

`createNetworkEngine` cablea:

1. **MCP tools → orquestador:** `handlers.executeTool` vía `createActorToolHandler` cuando se provee `mapToolRequest`.
2. **Change stream → orquestador:** suscripción a `store.changes()` → `mapDocumentChange` → `orchestrator.dispatch`.
3. **Orquestador → MCP:** suscripción a `orchestrator.events$` → `mapEventToResourceUri` → `mcpRuntime.notifyResourceUpdated(uri)`.
4. **readResource → DocumentStore:** handler que lee del read-model cuando el contrato declara `storage`.

### 2. Mapper canónico (adapter, no core)

El mapeo `DocumentChange` → `InferEvent<TSemantics>` y `InferEvent` → URI de resource vive en `packages/network-engine/src/sync-loop.ts` como funciones configurables. **Nunca en `core`:** el acoplamiento evento-storage ↔ semántica de dominio es responsabilidad del composition root o del lenguaje huésped.

### 3. Eventos MCP de referencia

`MCPRuntimeEvent` incluye `MCP_RESOURCE_UPDATED` para SSE a clientes MCP. El loop cierra cuando un cambio en storage produce un evento de dominio que el mapper traduce a una URI notificable.

## Consecuencias

### Positivas

- Un solo bus RxJS gobierna storage, XState y proyecciones MCP/GraphQL.
- Change streams de Mongo alimentan el mismo pipeline que mutations manuales.

### Negativas / Riesgos

- El mapper es el punto de acoplamiento delicado; cada lenguaje huésped debe proveer sus funciones de mapeo.
- Sin mapper configurado, el loop no se cierra (comportamiento explícito, no implícito).

## Referencias

- [`packages/network-engine/src/composition.ts`](../packages/network-engine/src/composition.ts)
- [`packages/network-engine/src/sync-loop.ts`](../packages/network-engine/src/sync-loop.ts)
- [`packages/mcp-runtime/src/actor-bridge.ts`](../packages/mcp-runtime/src/actor-bridge.ts)
