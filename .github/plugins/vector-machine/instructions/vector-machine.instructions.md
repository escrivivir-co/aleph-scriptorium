---
name: VectorMachine (instrucciones)
description: "Reglas de integración del stack VectorMachineSDK con Scriptorium y la mesh MCP."
applyTo: "VectorMachineSDK/**/*, MCPGallery/mcp-mesh-sdk/**/*, .github/plugins/vector-machine/**/*, ARCHIVO/PLUGINS/VECTOR_MACHINE/**/*"
---

# Instrucciones: Plugin VectorMachine

## Contexto

`VectorMachineSDK` entra en el Scriptorium como una stack vectorial self-hosted ya operativa en Docker/Python, no como una infraestructura agéntica o MCP ya resuelta. La agentización y el acceso desde Copilot deben pasar por una fachada MCP propia del Scriptorium, previsiblemente integrada como un servidor más en `MCPGallery/mcp-mesh-sdk`.

---

## Reglas de Integración

### 1. La entrada canónica es la fachada MCP, no el acceso directo al repo

- `VectorMachineSDK/` es la base operativa.
- La integración con el chat y con otros plugins debe pasar por una fachada MCP propia.
- El acceso directo a disco puede coexistir, pero no sustituye el contrato MCP.

### 2. No inventar todavía el contrato final

- No fijar tools, resources, prompts o puertos definitivos sin decisión explícita.
- No registrar todavía un servidor en `.vscode/mcp.json` si el servidor no existe.
- No prometer compatibilidad con todos los consumidores antes de separar bien la v1.

### 3. La autopista v1 sí debe quedar preparada

- Plugin mínimo en `.github/plugins/vector-machine/`.
- Bridge en `.github/agents/plugin_ox_vectormachine.agent.md`.
- Rutas DRY en `Funcional.md`, `Tecnico.md`, `PLUGINS.md`, `ox.agent.md` e `indice.agent.md`.
- `setup-workspace.sh` y `.vscode/settings.json` listos para discovery.

### 4. MCPGallery es la superficie canónica para el servidor futuro

- La implementación futura del servidor MCP debe alinearse con el patrón de `MCPGallery/mcp-mesh-sdk`.
- Node.js y Python pueden repartirse por capas internas, pero el Scriptorium debe ver una sola fachada MCP coherente.

---

## Archivos Gestionados

| Archivo | Propósito |
|---------|-----------|
| `VectorMachineSDK/README-SCRIPTORIUM.md` | Integración del submódulo y decisiones de Fase 2-3 |
| `.github/plugins/vector-machine/manifest.md` | Contrato del plugin mínimo |
| `.github/agents/plugin_ox_vectormachine.agent.md` | Bridge del plugin |
| `ARCHIVO/PLUGINS/VECTOR_MACHINE/README.md` | Datos runtime y artefactos de trabajo |
| `MCPGallery/mcp-mesh-sdk/` | Superficie futura del servidor MCP |

---

## Lo que NO Hacer

- ❌ Tratar `VectorMachineSDK` como si ya trajera agentes o prompts reutilizables.
- ❌ Bypassear la fachada MCP como solución final de integración.
- ❌ Registrar un servidor MCP inexistente en configuración del workspace.
- ❌ Mezclar en la misma pasada la autopista v1 con el contrato detallado de tools.