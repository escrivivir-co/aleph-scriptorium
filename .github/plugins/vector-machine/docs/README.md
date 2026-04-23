# Plugin: VectorMachine

## Instalación

Este plugin se inicializa como parte de la integración del submódulo `VectorMachineSDK` en el Scriptorium.

## Configuración

- Discovery activado en `.vscode/settings.json`
- Submódulo gestionado por `scripts/setup-workspace.sh`
- Bridge disponible en `.github/agents/plugin_ox_vectormachine.agent.md`

## Arquitectura

```
VectorMachineSDK/            → stack vectorial base
        │
        ▼
.github/plugins/vector-machine/
        │
        ▼
MCPGallery/mcp-mesh-sdk/     → futura fachada MCP propia
```

## Estado v1

En esta fase el plugin deja preparada la estructura del Scriptorium. El contrato MCP y su implementación quedan para el siguiente agente técnico.

## Referencias

- `VectorMachineSDK/README-SCRIPTORIUM.md`
- `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`