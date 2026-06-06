# Compose-Lang Semantics

## Stack-level states

- `empty` — No stack loaded.
- `loaded` — Stack model parsed; simulation idle (all services `defined` or `stopped`).
- `simulating` — Active digital twin: virtual clock advancing, services transitioning.
- `inspecting` — Transient focus on a single service (read path).
- `planning` — Transient registration of a read-only operation plan.

## Per-service submachine

Each `ServiceId` tracks:

```
defined → starting → waitingHealth → healthy | failed → stopping → stopped
```

### Transitions

| From | Event | Guard | To |
| --- | --- | --- | --- |
| `defined` | `SIMULATE_UP` | all `dependsOn` are `healthy` | `starting` |
| `starting` | `SIMULATE_TICK` | elapsed ≥ start delay | `waitingHealth` |
| `waitingHealth` | `SIMULATE_TICK` | healthcheck passes | `healthy` |
| `waitingHealth` | `SIMULATE_TICK` | retries exhausted | `failed` |
| `*` | `SIMULATE_INJECT_FAILURE` | — | `failed` |
| `healthy` \| `failed` | `SIMULATE_DOWN` | — | `stopping` |
| `stopping` | `SIMULATE_TICK` | elapsed ≥ stop delay | `stopped` |
| `stopped` | `SIMULATE_RESET` | — | `defined` |

### Dependency guard

A service in `defined` cannot enter `starting` until every entry in `dependsOn` is `healthy`. If a dependency becomes `failed`, dependent services in `starting` or `waitingHealth` propagate to `failed`.

## Stack events

- `LOAD_STACK` — Parse YAML into `ComposeStackModel`; reset runtime.
- `INSPECT_SERVICE` — Focus context on one service id.
- `PLAN_OPERATION` — Record a read-only phrase plan.
- `SIMULATE_UP` — Start all services respecting topological `dependsOn` order.
- `SIMULATE_DOWN` — Stop all services in reverse dependency order.
- `SIMULATE_TICK` — Advance `virtualClockMs`; evaluate pending healthchecks.
- `SIMULATE_INJECT_FAILURE` — Force `failed` on a service; propagate to dependents.
- `SIMULATE_RESET` — Reset twin to initial `defined` state.

## Context

```ts
{
  stack?: ComposeStackModel;
  focusedServiceId?: ServiceId;
  plannedOperations: ComposeOperationPlan[];
  loadedAt?: number;
  serviceStates: Record<ServiceId, ServiceRuntimeState>;
  serviceStartedAt: Record<ServiceId, number>;
  healthcheckAttempts: Record<ServiceId, number>;
  virtualClockMs: number;
  predictedFailures: ServiceId[];
  timeline: RuntimeTransition[];
  simulationActive: boolean;
}
```
