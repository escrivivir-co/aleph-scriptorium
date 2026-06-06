# Compose-Lang Implementation Plan

## P1 — What does it add beyond the platform?

A simulated digital twin of Docker Compose lifecycle with typed phrase→command compilation, MCP simulate tools, and an interactive MCP App — without coupling to container runtime in v1.

## P2 — Primitives introduced

Stack, Service, Operation, Executor, SimulatedTime.

## P3 — Core concepts reused

`CoreEventBase`, `LanguageSemantics`, `createNetworkMachine`, `defineDomainContract`, `projectDomainToMCP`, `createMcpHttpEdge`, `@modelcontextprotocol/ext-apps`.

## P4 — New capabilities enabled

- `compose://stack/*/runtime/*` resources for twin state.
- `compose-simulate-*` MCP tools (zero external effects).
- `show-compose-stack` launcher with topology UI.
- `SimulatedExecutor` implementing `ComposeExecutor<'simulated'>`.
- Template-literal `Phrase` types and `CommandFor` conditional compiler.

## P5 — Could this be flat JSON config?

No — per-service submachines, virtual clock, dependency guards, and executor pluggability require a language unit.

**Status:** Approved for digital twin increment (simulator-only, LiveExecutor dossier-only).
