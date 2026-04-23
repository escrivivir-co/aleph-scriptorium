# Datos Runtime: VectorMachine

**Plugin**: `vector-machine`  
**Submódulo**: `VectorMachineSDK`  
**Bridge**: `@plugin_ox_vectormachine`

---

## Propósito

Esta carpeta almacena artefactos de trabajo y runtime del plugin `vector-machine`.
El código del plugin vive en `.github/plugins/vector-machine/`.

En v1 se reserva para:

- mapas de integración;
- borradores de fachada MCP;
- diagnósticos del stack vectorial;
- futuros contratos o fixtures del servidor MCP.

## Convención

- **Código del plugin**: `.github/plugins/vector-machine/` (kebab-case)
- **Bridge**: `.github/agents/plugin_ox_vectormachine.agent.md`
- **Datos runtime**: `ARCHIVO/PLUGINS/VECTOR_MACHINE/` (SCREAMING_SNAKE_CASE)
- **Base operativa**: `VectorMachineSDK/` (submódulo)

## Referencias

- Plugin manifest: `.github/plugins/vector-machine/manifest.md`
- Bridge: `.github/agents/plugin_ox_vectormachine.agent.md`
- Submódulo: `VectorMachineSDK/README-SCRIPTORIUM.md`