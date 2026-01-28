# Blockly to Node-RED Transpilation

Conceptual bridge and future translator between Blockly visual logic (character behavior) and Node-RED data flows (data plumbing).

## Quick Usage

Describe a Blockly workspace or character logic that needs a corresponding Node-RED flow, or ask for advice on mapping between the two paradigms.

## Conceptual Mapping

| Blockly Concept | Node-RED Equivalent | Notes |
|----------------|---------------------|-------|
| Block | Node | Atomic operation unit |
| Workspace | Flow (Tab) | Container for connected blocks/nodes |
| Connection | Wire | Data path between units |
| Variable | Context/State | StateManagerNode for persistence |
| Event handler | Input node | Trigger for flow execution |
| Output | Output node / Feed write | Result delivery |

## When to Use Each

- **Blockly**: Character behavior, game logic, scripted sequences, user-facing logic
- **Node-RED**: Data pipelines, API integrations, message routing, async feeds, dashboards

## Node Recommendation by Blockly Pattern

| Blockly Pattern | Node-RED Nodes |
|----------------|----------------|
| If/else logic | FlowControlNode (conditional routing) |
| Loop over items | FlowControlNode (split/join) |
| Send message | ResponseBuilderNode + BotNode |
| Parse input | MessageParserNode |
| Store state | StateManagerNode |
| Show UI | DashboardNode + UIWidgetNode |

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

### Architecture Analogy

```
Blockly (Character Logic)          Node-RED (Data Plumbing)
========================          =========================
BlocklyEditor plugin              WireEditor plugin
DISCO/BLOCKLY/                    DISCO/WIRING/
*.blockly.xml                     *.flow.json
Workspace = scene logic           Flow = data pipeline
Blocks = actions                  Nodes = transformations
Variables = character state       Context = flow state
```

### Translation Strategy (Future)

Phase 1 (Current): Manual design in each tool, conceptual mapping documented
Phase 2 (Planned): Export Blockly workspace as Node-RED flow skeleton
Phase 3 (Future): Bidirectional sync between Blockly workspace and Node-RED flow

### Blockly Workspace to Flow JSON

A Blockly workspace with event handler, conditional, and action blocks maps to:

```json
{
  "type": "tab",
  "label": "from-blockly-{workspace}",
  "nodes": [
    { "type": "inject", "name": "Event Trigger" },
    { "type": "FlowControlNode", "name": "Conditional" },
    { "type": "ResponseBuilderNode", "name": "Action" }
  ]
}
```

### Use Cases for Combined Approach

1. **Character bot**: Blockly defines behavior logic, Node-RED handles platform integration (Kick, Twitch)
2. **Game flow**: Blockly defines game rules, Node-RED handles scoring dashboard and state persistence
3. **Interactive story**: Blockly defines narrative branches, Node-RED handles user input collection via feeds

### Related Files

| File | Purpose |
|------|---------|
| `ARCHIVO/DISCO/BLOCKLY/` | Blockly workspace storage |
| `ARCHIVO/DISCO/WIRING/` | Node-RED flow storage |
| `node-red-alephscript-sdk/` | Node-RED custom nodes source |

</details>
