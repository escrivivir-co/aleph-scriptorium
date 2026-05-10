---
name: Mapear Stack VectorMachineSDK
description: "Mapa estructural y operativo del stack vectorial antes de implementar su fachada MCP."
applyTo: "VectorMachineSDK/**/*, ARCHIVO/PLUGINS/VECTOR_MACHINE/**/*"
---

# Prompt: Mapear Stack VectorMachineSDK

## Objetivo

Obtener un mapa corto y fiable de `VectorMachineSDK` como stack operativa: servicios, componentes, dependencias y rutas que importan para la integración con Scriptorium.

## Input Esperado

- Pregunta del usuario sobre arquitectura, runtime o puntos de entrada.

## Proceso

1. Leer `VectorMachineSDK/README-SCRIPTORIUM.md` como ancla.
2. Verificar superficies clave del submódulo (`etl/`, `qa/`, `wiki/`, `docker-compose*.yml`).
3. Relacionar el stack con `MCPGallery/mcp-mesh-sdk` solo al nivel de patrón de integración.
4. Responder con rutas concretas y una síntesis corta.

## Output Esperado

- mapa estructural corto;
- rutas concretas;
- warnings sobre lo que todavía no existe.