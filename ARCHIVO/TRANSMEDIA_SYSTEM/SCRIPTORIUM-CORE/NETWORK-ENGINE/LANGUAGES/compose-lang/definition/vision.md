# Compose-Lang Vision

Compose-Lang models multi-container application stacks as a **digital twin** of Docker Compose lifecycle. It parses `docker-compose.yml` into a typed semantic model, simulates service startup, healthchecks, dependency ordering, and failure propagation — without executing Docker in v1.

## Identity

- **Mission:** Turn Docker Compose topology into a typed, event-driven language unit with full operational semantics, exposed via MCP resources, tools, and an interactive MCP App.
- **Boundary:** Parsing, simulation, and projection in v1. Real container execution is a pluggable `LiveExecutor` for a future phase.

## Frontera

| Platform (Core) | Compose-Lang |
| --- | --- |
| Event loop, state machine factory | Stack load + per-service runtime submachines |
| Orchestrator wiring | Service/volume/dependency semantics + virtual clock |
| MCP projection primitives | `compose://stack/*` static + `runtime/*` twin resources |
| Executor contract (pluggable) | `SimulatedExecutor` v1, `LiveExecutor` dossier-only |

## Hypothesis

A simulated digital twin proves the DSL has complete semantics before coupling to `child_process` or Docker daemon. Agents operate the twin via MCP; humans operate it via MCP App UI.
