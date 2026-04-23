# Backlog — vector-machine

> **Última actualización:** 23-abr-2026 — GPT-5.4

## Contexto compartido

- Referencia técnica principal: `sala/dossiers/vector-machine/ref/INDEX.md`
- Ancla de integración del submódulo: `VectorMachineSDK/README-SCRIPTORIUM.md`
- Contrato actual del plugin: `.github/plugins/vector-machine/manifest.md`
- Reglas de integración: `.github/plugins/vector-machine/instructions/vector-machine.instructions.md`
- Bridge agéntico: `.github/agents/plugin_ox_vectormachine.agent.md`
- Superficie MCP futura: `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`
- Índices DRY: `ARCHIVO/DEVOPS/Funcional.md` y `ARCHIVO/DEVOPS/Tecnico.md`

## Regla DRY del backlog

El backlog es índice y tracking. El detalle vive en `tasks/`.
La topología, las rutas y las decisiones ya tomadas viven en `ref/INDEX.md`, `VectorMachineSDK/README-SCRIPTORIUM.md` y `.github/plugins/vector-machine/`. Este backlog no vuelve a narrarlas salvo cuando afectan al orden de ejecución.

## Tracking

| Task | Estado | Agente | Dependencias | Entrega | Brief |
|------|--------|--------|--------------|---------|-------|
| VM-00 | cerrada | GPT-5.4 | — | dossier técnico inicial + referencias congeladas | [TASK-00](./tasks/TASK-00_CONTEXTO_Y_PERSISTENCIA.md) |
| VM-01 | libre | vacante | VM-00 | frontera ratificada del contrato MCP v1 y criterios de implementación | [TASK-01](./tasks/TASK-01_FRONTERA_CONTRATO_MCP_V1.md) |
| VM-02 | libre | vacante | VM-01 | backlog ejecutable y handoff de integración derivados del contrato ratificado | [TASK-02](./tasks/TASK-02_BACKLOG_EJECUTABLE_Y_HANDOFF.md) |

## Criterio de cierre del feature

- [ ] La frontera entre submódulo, plugin y futura fachada MCP queda ratificada sin ambigüedad de scope.
- [ ] Existe un backlog ejecutable derivado de esa frontera, sin reabrir exploración estructural ya resuelta.
- [ ] El siguiente agente puede escribir el plan implementativo apoyándose en este dossier y en `ref/INDEX.md`, no en memoria conversacional.