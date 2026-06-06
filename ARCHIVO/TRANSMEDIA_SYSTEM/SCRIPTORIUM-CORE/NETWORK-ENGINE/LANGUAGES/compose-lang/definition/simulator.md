# Compose-Lang Digital Twin Simulator

## Laws

1. **Determinism** — Given the same stack model, initial state, event sequence, and injected failures, the twin produces identical `serviceStates` and `timeline`.
2. **Healthcheck scheduling** — Intervals parsed from compose (`10s`, `15s`) map to milliseconds. Each tick evaluates whether `virtualClockMs - serviceStartedAt >= interval * (attempt + 1)`.
3. **Retry budget** — `retries` from compose (default 3) caps `waitingHealth` attempts before `failed`.
4. **Start delay** — Services without healthcheck transition `starting → healthy` after 500ms simulated. With healthcheck: `start_period` (default 0) before entering `waitingHealth`.
5. **Dependency propagation** — On `failed`, any dependent in `starting`, `waitingHealth`, or `healthy` transitions to `failed` recursively.
6. **Topological startup** — `SIMULATE_UP` enqueues services whose dependencies are all `healthy`, in stable declaration order.
7. **Reverse shutdown** — `SIMULATE_DOWN` stops services that have no dependents still running, then repeats.

## Virtual clock

`SIMULATE_TICK { ms }` adds `ms` to `virtualClockMs` and runs one scheduler pass. Multiple ticks may be batched in a single MCP tool call.

## Predicted failures

`predict().failure(serviceId)` records the id in `predictedFailures`. On first healthcheck evaluation for that service, outcome is `failed` regardless of retries remaining.

## Timeline

Every state transition appends `{ at: virtualClockMs, serviceId, from, to, cause }` to `timeline` for MCP resource `compose://stack/{id}/runtime/timeline`.
