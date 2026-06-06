# Compose-Lang Roadmap

1. **Model parser** — Read `docker-compose.yml` into branded types (no Docker SDK).
2. **XState machine** — `createNetworkMachine<ComposeSemantics>()` with load, inspect and plan transitions.
3. **DSL wrapper** — `ComposeStack` fluent API hiding orchestrator dispatch and producing operation plans for setup, run, sleep, logs and debug.
4. **MCP app** — Read-only projection of stack resources, operation phrases and diagnostic prompts.
5. **Future** — Diff two compose files, validate healthcheck graphs, optional compose v3 networks.
