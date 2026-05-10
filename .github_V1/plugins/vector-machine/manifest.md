---
id: vector-machine
name: "VectorMachine — Stack Vectorial vía MCP"
version: "1.0.0"
description: "Plugin de integración para VectorMachineSDK y VectorMachineUI. Prepara la autopista entre la stack vectorial self-hosted, su admin UI Chroma y una futura fachada MCP propia sobre MCPGallery/mcp-mesh-sdk."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=0.0.1"
dependencies: []
optional_dependencies:
  - mcp-presets
  - lore-sdk

submodule: "VectorMachineSDK"

agents:
  - name: "VectorMachine"
    file: "agents/vector-machine.agent.md"
    description: "Orquesta la integración del stack vectorial y prepara la futura fachada MCP para Scriptorium"

prompts:
  - name: "mapear-stack"
    file: "prompts/mapear-stack.prompt.md"
    description: "Mapa estructural de VectorMachineSDK y sus superficies de integración"
  - name: "preparar-fachada-mcp"
    file: "prompts/preparar-fachada-mcp.prompt.md"
    description: "Diseña la autopista v1 hacia una fachada MCP sin fijar todavía el contrato final"

instructions:
  - name: "vector-machine"
    file: "instructions/vector-machine.instructions.md"
    description: "Reglas de integración del stack vectorial con Scriptorium y MCPGallery"

handoffs:
  - label: "Mapear stack VectorMachineSDK"
    agent: "VectorMachine"
    prompt: "Localiza la arquitectura operativa del submódulo, sus superficies y puntos de integración con Scriptorium."
  - label: "Preparar fachada MCP"
    agent: "VectorMachine"
    prompt: "Diseña la autopista v1 para una fachada MCP propia sobre MCPGallery/mcp-mesh-sdk sin prometer aún tools o puertos definitivos."
---

# Plugin: VectorMachine — Stack Vectorial vía MCP

Plugin para integrar `VectorMachineSDK` dentro del Scriptorium como base de una futura capa de vectorización y consulta semántica gobernada por una fachada MCP propia.

---

## Propósito

Este plugin no presupone agentes remotos ni un servidor MCP ya existente en el submódulo. Su trabajo inicial es dejar preparada la estructura de Scriptorium para que un agente de desarrollo implemente después:

1. la fachada MCP del vector machine;
2. el bridge agéntico hacia esa fachada;
3. la generalización desde lore-db hacia "proyecto indexable".

## Capacidades v1

- Registrar la codebase de `VectorMachineSDK` como submódulo integrado;
- reconocer `VectorMachineUI` como admin UI operativa del stack vectorial;
- documentar el encaje con `MCPGallery/mcp-mesh-sdk`;
- ofrecer un agente y prompts de diseño para el siguiente ciclo técnico;
- dejar rutas DRY y discovery del plugin listos en el workspace.

## Integración con el submódulo

- **Submódulo core**: `VectorMachineSDK`
- **Submódulo auxiliar**: `VectorMachineUI`
- **Repo remoto**: `https://github.com/escrivivir-co/aleph-deep-wiki.git`
- **Rama de integración local**: `integration/beta/scriptorium`
- **Anchors técnicos**: `VectorMachineSDK/README-SCRIPTORIUM.md`, `VectorMachineUI/README-SCRIPTORIUM.md`

## Referencias

- Bridge: `.github/agents/plugin_ox_vectormachine.agent.md`
- Runtime: `ARCHIVO/PLUGINS/VECTOR_MACHINE/README.md`
- Mesh MCP: `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`
- Admin UI: `VectorMachineUI/README-SCRIPTORIUM.md`