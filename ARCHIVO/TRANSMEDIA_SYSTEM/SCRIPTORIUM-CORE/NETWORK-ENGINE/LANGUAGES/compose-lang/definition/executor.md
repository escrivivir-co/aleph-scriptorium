# Compose-Lang Executor Contract

## Interface

```ts
interface ComposeExecutor<Mode extends 'simulated' | 'live'> {
  readonly mode: Mode;
  readonly externalEffects: readonly string[];
  up(serviceId?: ServiceId): Promise<ExecutionResult<Mode>>;
  down(serviceId?: ServiceId): Promise<ExecutionResult<Mode>>;
  tick(ms: number): Promise<ExecutionResult<Mode>>;
  injectFailure(serviceId: ServiceId): Promise<ExecutionResult<Mode>>;
  reset(): Promise<ExecutionResult<Mode>>;
  logs(serviceId: ServiceId, tail: number): AsyncIterable<LogLine>;
}
```

## Capability pattern

- `externalEffects` is declared per executor and mirrored in MCP mutation `externalEffects`.
- `SimulatedExecutor`: `externalEffects: []` — no host side effects.
- `LiveExecutor` (future): `externalEffects: ['child_process', 'docker']` — requires explicit agent consent.

## Branded execution context

```ts
type Execution<Mode extends 'simulated' | 'live'> = {
  readonly __mode: Mode;
  executor: ComposeExecutor<Mode>;
};
```

Functions that must not touch Docker accept only `Execution<'simulated'>` at compile time.

## Registry

```ts
const registry = {
  simulated: createSimulatedExecutor,
  // live: createLiveExecutor — dossier only, not shipped in v1
} as const satisfies Record<string, ExecutorFactory>;
```

## LiveExecutor (future dossier)

`LiveExecutor` would spawn `docker compose` via `child_process`, with safeguards:

- Workspace-root confinement for compose file path
- Timeout and cancellation on long-running commands
- Explicit `requiresConfirmation` on destructive mutations
- Never imported by `@network-engine/compose-lang` in the simulated twin increment
