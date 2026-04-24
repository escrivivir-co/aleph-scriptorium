# VM-01 — Ratificar frontera del contrato MCP v1

> **Estado:** libre
> **Agente recomendado:** Ox o Cristalizador
> **Dependencias:** VM-00
> **Entrega esperada:** `sala/agente-{alias}/candidato-contrato-mcp-v1-vector-machine.md`

## Lee primero

1. `sala/dossiers/vector-machine/ref/INDEX.md`
2. `sala/dossiers/vector-machine/PLAN.md`
3. `VectorMachineSDK/README-SCRIPTORIUM.md`
4. `.github/plugins/vector-machine/instructions/vector-machine.instructions.md`
5. `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`

## Objetivo

Ratificar la frontera funcional de la futura fachada MCP v1 para `vector-machine`: qué responsabilidades encapsula, qué deja en el submódulo y qué decisiones siguen explícitamente fuera de alcance en esta versión.

## Cambios requeridos

1. Describir la separación exacta entre `VectorMachineSDK`, plugin `vector-machine` y futuro servidor MCP.
2. Identificar operaciones mínimas que la v1 debería cubrir sin fijar todavía tools o puertos definitivos.
3. Enumerar decisiones abiertas que deben quedar como gates antes de implementar.
4. Formular criterios de aceptación para la implementación futura sin convertir aún el documento en backlog de código.

## Salida mínima esperada

1. Candidato en carpeta del agente: `agente-{alias}/candidato-contrato-mcp-v1-vector-machine.md`
2. `ENTREGA_VM-01.md` con lista de decisiones cerradas, decisiones abiertas y rutas que Aleph debe promover al dossier.

## Criterio de aceptación

- La frontera entre stack, plugin y servidor MCP queda descrita sin contradicción con `VectorMachineSDK/README-SCRIPTORIUM.md` ni con `.github/plugins/vector-machine/instructions/vector-machine.instructions.md`.
- Queda claro qué puede implementar el siguiente agente sin reabrir exploración estructural.