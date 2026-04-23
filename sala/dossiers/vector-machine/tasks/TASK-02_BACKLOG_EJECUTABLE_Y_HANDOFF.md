# VM-02 — Traducir el contrato ratificado a backlog ejecutable

> **Estado:** libre
> **Agente recomendado:** Aleph, Scrum u Ox
> **Dependencias:** VM-01
> **Entrega esperada:** `sala/agente-{alias}/candidato-backlog-vector-machine-v1.md`

## Lee primero

1. `sala/dossiers/vector-machine/ref/INDEX.md`
2. `sala/dossiers/vector-machine/BACKLOG.md`
3. `sala/dossiers/vector-machine/tasks/TASK-01_FRONTERA_CONTRATO_MCP_V1.md`
4. El artefacto entregado por `VM-01`

## Objetivo

Convertir la frontera de contrato ya ratificada en un backlog ejecutable y en un handoff de integración que permita abrir un ciclo de implementación con tareas, dependencias y entregables ya no ambiguos.

## Cambios requeridos

1. Proponer desglose mínimo de tareas de implementación y validación.
2. Separar trabajo de servidor MCP, wiring del plugin, validación de runtime y consumidores iniciales.
3. Identificar qué parte debe seguir en Scriptorium y qué parte podría delegarse al submódulo u otros repos.
4. Preparar texto candidato para actualizar el dossier o abrir el plan implementativo siguiente.

## Salida mínima esperada

1. Candidato en carpeta del agente: `agente-{alias}/candidato-backlog-vector-machine-v1.md`
2. `ENTREGA_VM-02.md` con propuesta de tasks, dependencias y criterio de cierre del siguiente ciclo.

## Criterio de aceptación

- El backlog candidato se apoya en la frontera definida por `VM-01`.
- Las tareas resultantes son ejecutables sin tener que reinterpretar la topología base del feature.