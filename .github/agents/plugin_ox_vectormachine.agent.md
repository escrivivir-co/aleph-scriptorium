---
name: plugin_ox_vectormachine
description: "Bridge: conecta VS Code con el plugin VectorMachine. Prepara la integración del stack vectorial y su futura fachada MCP en Scriptorium."
argument-hint: "Acciones: mapear stack, preparar fachada mcp, proyecto indexable"
tools: ['agent']
handoffs:
  - label: Listar capacidades de VectorMachine
    agent: plugin_ox_vectormachine
    prompt: Lista las capacidades actuales del plugin VectorMachine y su estado de preparación en Scriptorium.
    send: false
  - label: Mapear stack VectorMachineSDK
    agent: VectorMachine
    prompt: Localiza componentes, runtime, superficies y rutas de integración del stack vectorial.
    send: false
  - label: Preparar fachada MCP
    agent: VectorMachine
    prompt: Diseña la autopista v1 hacia una fachada MCP propia sobre MCPGallery/mcp-mesh-sdk, sin fijar aún el contrato final.
    send: false
  - label: Estudiar proyecto indexable
    agent: VectorMachine
    prompt: Relaciona VectorMachineSDK con ONFALO, Novelist, DocumentMachineSDK y ARCHIVO/PROYECTOS como futuros consumidores.
    send: false
---

# Plugin Ox: VectorMachine

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/vector-machine/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| `VectorMachine` | `agents/vector-machine.agent.md` | Preparación de la integración del stack vectorial y su futura fachada MCP |

## Casos de uso

### Mapear el stack actual

```
@plugin_ox_vectormachine
> Mapear stack VectorMachineSDK
```

### Preparar la autopista MCP

```
@plugin_ox_vectormachine
> Preparar fachada MCP
```

## Referencia

- Manifest: `.github/plugins/vector-machine/manifest.md`
- Agentes: `.github/plugins/vector-machine/agents/`
- Submódulos: `VectorMachineSDK/` · `VectorMachineUI/`
- Runtime: `ARCHIVO/PLUGINS/VECTOR_MACHINE/`
- Mesh MCP: `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`