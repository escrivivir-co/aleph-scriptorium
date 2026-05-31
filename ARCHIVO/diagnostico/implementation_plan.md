# Futures Engine Simulation Pipeline: Storyboard & Architecture Plan


## Context: Aligning on Round 5

**Product Owner (AI):**
I've just closed Round 4 in `juego.md` for you. Let's do a quick alignment check on where we are before we define the rules for Round 5.
1. **What was your goal?** Build an analytical simulation engine where 4 distinct AI personas debate complex subjects.
2. **What do you have right now?** A functional 4-round pipeline (Baseline, Delta, Friction, Proposition) and validation recaps.
3. **Where to put the money for Round 5?**
   - A) The Stress-Test (aggressive dismantling of rules)
   - B) The Synthesis/Negotiation (merging rules into one parameter)
   - C) The Execution Simulation (acting as the Engine to "run" all 4 rules and reacting to the system behavior)

**User:**
So, I tell you that it is C. But in my dreams it would be a "preset" I could run the 3 with the same info flow. I can use the Futures.Machine ([engine-plan.prompt.md](DocumentMachineSDK/.github/prompts/engine-plan.prompt.md) / [engine.md](DocumentMachineSDK/docs/engine.md)) to run the voices over this specific [yo-no-soy-yo-propositions-engine](AgentLoreSDK/docs/parking/yo-no-soy-yo-propositions-engine).

Out of scope of this document will be to:
a) create a map
b) create a visualizer UI in [bot-hilbert.agent.md](AgentLoreSDK/.github/agents/bot-hilbert.agent.md) SDK:

- Use [bot-biblioteca.agent.md](AgentLoreSDK/.github/agents/bot-biblioteca.agent.md) to build a map [biblioteca](AgentLoreSDK/docs/biblioteca) with material collected in [juego.md](ARCHIVO/diagnostico/juego.md).
- Then use [bot-taller.agent.md](AgentLoreSDK/.github/agents/bot-taller.agent.md) to append in [parking](AgentLoreSDK/docs/parking) a "nave" that:
  a) gathers the raw files labeled and presented in catalog.
  b) some fancy "that's what we get" section with the eigenstate discovered for the four alephs we have.
  c) a simulation panel where we will connect (out of scope) some bridge to [MCPGallery](MCPGallery).

For now, we just 1) allow to pick a preset mode (stress-test, synthesis/negotiation, execution), we just prepare a little UI for a tiny control panel for the futures-engine as we assume we load the preset + our "voice-runner-agent-wrappers???". We can just draw a tiny program using [AAIAGallery](AAIAGallery) (out of scope) for round-orchestration. Let's just simulate the story board of this scenario creating as much placeholder based on codebase. We also have (out of scope) [WiringEditor](WiringEditor) for some bot contribs to easily wrap each bot and handle the bridge between the real-time codebase store and the chat to the futures-engine.

The futures-engine is just a pipeline. If you check the pair of SDKs [VectorMachineSDK](VectorMachineSDK) and [DocumentMachineSDK](DocumentMachineSDK) to flow info from natural-language to vectors back to natural so bots can make indexed and search effectively using its codebase.

At the end, as a final key point for you to process and make a plan, I would say, the "voices" project we started with `juego.md` is a kind of "how we deal with the relation of the training-data + finetuning and with the onpremise-real-time corpus (get/set new info) when a bot is a set of context window tied to tools". We want to capture the voice of our red or our white, but this experiment goes on how to quickly move info from up to down, etc.

---

## Executive Summary of Your Vision
You are designing a prototype for dynamic bot orchestration. The core problem this solves is **Data Grounding vs. Persona**: how to manage real-time codebase knowledge (fetching and setting info via `VectorMachineSDK` and `DocumentMachineSDK`) for LLM agents that are essentially just "context windows tied to tools." 

By wrapping these bots in specific personas (Red, Blue, Black, White) using `WiringEditor` constraints, you are testing a pipeline that moves natural language into vector space and back up to the bot, allowing them to debate a live topic (`yo-no-soy-yo-propositions-engine`) from deep, epistemological "eigenstates" rather than generic LLM responses. 

We are moving towards Option C (Execution) but framing it as a **Control Panel Preset**. The system will have modes for Stress-Test, Synthesis, and Execution.

## User Review Required
> [!IMPORTANT]
> Please review the storyboard steps below. Since this is a "plan to create a plan", ensure the scope and division of labor between `bot-biblioteca` and `bot-taller` aligns with your vision before we generate the actual markdown/HTML placeholders.

## Open Questions
1. **The "Nave" UI Format:** Should the placeholder UI panel in `docs/parking` be a `.md` file containing HTML/CSS mockup code, or pure markdown tables and structured text for now?
2. **Bot Wrappers (Voice-Runners):** You mentioned "voice-runner-agent-wrappers". Do you want me to sketch out a JSON/YAML configuration placeholder for these wrappers in the `WiringEditor` directory, or just represent them conceptually in the UI panel?

---

## Proposed Storyboard & Implementation Steps

This plan focuses on creating the storyboard and placeholders without building the fully functional visualizer or MCP bridges (which remain out of scope).

### Phase 1: The Library Mapping (Acting as `bot-biblioteca`)
We will organize the raw outputs from `juego.md` into a structured catalog.

#### [NEW] `AgentLoreSDK/docs/biblioteca/catalog-juego.md`
- **Purpose:** To serve as the clean data source for the Futures Engine.
- **Content:** A mapped index of all turns (1-4) and the final recap files for the 4 voices. It will categorize the outputs by voice and round, acting as the "up-to-down" data ingest layer.

### Phase 2: The Simulation "Nave" & Control Panel (Acting as `bot-taller`)
We will construct the control center where the Futures Engine is operated.

#### [NEW] `AgentLoreSDK/docs/parking/futures-nave-panel.md`
- **Purpose:** The UI storyboard and control panel placeholder.
- **Section A (The Data Ingest):** A visual or structured reference to the raw files cataloged in Phase 1.
- **Section B (The Eigenstates):** A "what we get" summary panel displaying the current, stable state of the 4 Alephs (Voices) on the topic.
- **Section C (The Control Panel):** A simulated UI (using markdown checkboxes/selectors or a code block UI mockup) where a user can select the Preset Mode:
  - `[ ] Mode: Stress-Test`
  - `[ ] Mode: Synthesis/Negotiation`
  - `[x] Mode: Execution Simulation`
- **Section D (Orchestration Pipeline):** A conceptual diagram (using Mermaid.js) showing the pipeline flow: Natural Language -> `VectorMachineSDK` -> Futures Engine -> `WiringEditor` Voice Wrappers.

### Phase 3: Opening Round 5 in `juego.md`
Once the storyboard is placed, we will formally open Round 5 in the original game file.

#### [MODIFY] `ARCHIVO/diagnostico/juego.md`
- **Action:** Add the "Specific rules for turn 5 (The Simulation)".
- **Content:** The voices will be instructed to act as if the "Execution Preset" has been selected on the *Futures Engine Control Panel*. They will run their proposed rules against the topic and document the resulting system behavior.

---

## Verification Plan
- **Manual Verification:** You will review the generated `futures-nave-panel.md` to ensure the simulated UI and workflow correctly represent the architecture of the `DocumentMachineSDK` / `VectorMachineSDK` pipeline.
