---
description: Create a new Scriptorium agent using templates, recipes, and taxonomy
argument-hint: Optional agent name or description
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash", "Task", "TodoWrite", "AskUserQuestion"]
---

# Create Agent

Guide the user through creating a specialized Scriptorium agent.

Steps:
1. If no argument provided, ask what kind of agent the user wants to create
2. Browse the agent taxonomy to find suitable base templates
3. Combine base agents, data sources, and AgentLoreSDK templates
4. Generate the agent configuration
5. Optionally save as a reusable recipe

Load the create-agent skill for detailed workflow guidance.
