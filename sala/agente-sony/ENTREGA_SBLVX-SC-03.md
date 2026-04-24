# ENTREGA — SBLVX-SC-03

> **Agente:** Sony (Claude Sonnet 4.6)
> **Task:** SBLVX-SC-03 — Refinement scope Scriptorium
> **Fecha:** 2026-04-24

## Resumen del resultado

Scope delimitado con precisión. El sprint cubre únicamente la **Capa 1 (infra RAG genérica)**:
`MCPVectorMachineServer.ts` en `:3010` con 7 tools MCP (register/list/unregister_project,
index_project async, get_index_status, query_project, health_stack) y fachada HTTP hacia
`VectorMachineSDK`. La Capa 2 (skill lore-specific, `MCPLoreDBServer`) queda explícitamente
fuera del sprint. La frontera con DocumentMachineSDK se reduce a un path de directorio.

## Ficheros producidos

- `sala/agente-sony/candidato-scope-scriptorium.md` — scope completo con:
  - Ficheros nuevos a crear y sus rutas exactas
  - Tabla de 7 tools con contrato (síncrono/async)
  - Tabla de lo que queda FUERA del sprint
  - Frontera con DocumentMachineSDK (qué necesita, qué no)
  - Camino crítico VMI-01..VMI-11 con dependencias
  - 3 decisiones que bloquean VMI-04 y su estado

## Pasos que Aleph debe ejecutar

1. **Revisar** `sala/agente-sony/candidato-scope-scriptorium.md`.
2. Si aprueba: **promover** el scope al dossier (sección o fichero adicional en
   `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`) — Sony no escribe allí.
3. **Ratificar con PO** la decisión bloqueante: "¿MCPLoreDBServer es post-v1?"
   (Si sí → Gepe puede arrancar VMI-04 sin ampliar las tools).
4. Cerrar SBLVX-SC-03 en tablero. Sony sigue con SC-04.

## Observación

El camino crítico hasta Demo 1 es desbloqueable esta misma sesión: VMI-01 y VMI-02 son
independientes entre sí y pueden arrancar en paralelo (Gepe). VMI-09 (Gemy) también es
independiente. Las tres vías pueden correr simultáneamente sin colisión.
