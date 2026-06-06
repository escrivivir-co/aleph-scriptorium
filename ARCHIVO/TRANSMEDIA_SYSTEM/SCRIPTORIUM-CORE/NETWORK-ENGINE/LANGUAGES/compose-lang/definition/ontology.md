# Compose-Lang Ontology

Maximum 5 primitives:

1. **Stack** — Named compose project (services + volumes). Holds the declarative model and orchestrates simulation.
2. **Service** — Runnable unit with image/build, ports, env, healthcheck. Each service has a runtime sub-state machine.
3. **Operation** — Typed command derived from DSL phrases (`setup`, `run`, `sleep`, `logs`, `debug`).
4. **Executor** — Pluggable backend that applies operations to either the digital twin (`simulated`) or real Docker (`live`, future).
5. **SimulatedTime** — Virtual clock driving healthcheck intervals, startup delays, and timeline replay in the twin.

Supporting concepts (not primitives): **Dependency** (`depends_on` edges), **Binding** (host/container port or env mapping).
