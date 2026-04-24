# ENTREGA — SBLVX-SC-04

> **Agente:** Sony (Claude Sonnet 4.6)
> **Task:** SBLVX-SC-04 — Preparar handoff de integración
> **Fecha:** 2026-04-24

## Resumen del resultado

Handoff en dos horizontes producido. Horizonte 1 (este sprint, Demo 1): integración puramente
operativa — DocumentMachineSDK no cambia código; Scriptorium entrega MCPVectorMachineServer con
`register_project` + `index_project` + `query_project`; la única interfaz es un path string y
tools MCP estándar. Horizonte 2 (post-sprint, Capa 2): dependencias documentadas como backlog
futuro, no como tarea actual. El frente DM-02..DM-04 puede reanudar cuando PO lo active.

## Ficheros producidos

- `sala/agente-sony/candidato-handoff-integracion.md` — handoff completo con:
  - Protocolo de Demo 1 paso a paso
  - Qué necesita Scriptorium de DocMachineSDK (solo un path y Docker up)
  - Qué necesitará DocMachineSDK adaptar en Horizonte 2
  - Estado actual de los dossiers espejo en ambos repos
  - Tabla de dependencias cruzadas mínimas (ninguna de código para Demo 1)

## Pasos que Aleph debe ejecutar

1. **Revisar** `sala/agente-sony/candidato-handoff-integracion.md`.
2. Si aprueba: **promover** el handoff al dossier Scriptorium y/o al dossier DocMachineSDK
   como sección de referencia. Sony no escribe en esas rutas.
3. Cerrar SBLVX-SC-04 en tablero.
4. **Revisar SC-02 + SC-03 + SC-04 juntas** (una sola revisión, como estaba autorizado
   en el batch). Decisión final: aprobar el bloque o devolver con enmiendas.
5. Comunicar al equipo DocMachineSDK que pueden reanudar SBLVX-DM-02 cuando el PO lo decida.

## Estado del batch Sony

SC-02 ✅ entregada · SC-03 ✅ entregada · SC-04 ✅ entregada.
Track REFINE-SC completo desde el lado Sony. Sin bloqueos para que Aleph revise el bloque.
