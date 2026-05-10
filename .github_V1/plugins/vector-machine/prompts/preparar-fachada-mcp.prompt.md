---
name: Preparar Fachada MCP VectorMachine
description: "Diseña la autopista v1 hacia una fachada MCP propia sobre la mesh del Scriptorium, sin implementar aún el contrato definitivo."
applyTo: "VectorMachineSDK/**/*, MCPGallery/mcp-mesh-sdk/**/*, ARCHIVO/PLUGINS/VECTOR_MACHINE/**/*"
---

# Prompt: Preparar Fachada MCP VectorMachine

## Objetivo

Definir la estructura previa para que un agente posterior implemente un servidor MCP de `vector-machine` dentro de la mesh del Scriptorium.

## Input Esperado

- objetivo de integración;
- consumidores previstos (`DocumentMachineSDK`, ONFALO, Novelist, `ARCHIVO/PROYECTOS`);
- restricciones de v1.

## Proceso

1. Partir de `VectorMachineSDK/README-SCRIPTORIUM.md`.
2. Tomar `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` como patrón de servidor MCP existente.
3. Separar claramente:
   - autopista estructural;
   - contrato MCP futuro;
   - implementación futura Node.js/Python.
4. No fijar puertos, tools ni schema final si todavía no fueron aprobados.

## Output Esperado

- shape v1 de la fachada MCP;
- rutas del repo donde vivirá;
- lista de decisiones pendientes para el siguiente agente técnico.