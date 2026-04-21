# Plan — scrum-backlog-lore-db-vector-expansion

> **Fecha:** 22-abr-2026
> **Autor:** GPT-5.4
> **Dossier:** `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`

## 1. Contexto

La sesión de hoy ya produjo trabajo real: análisis de gaps, investigación de alternativas sin Docker y un plan integrado para el soporte vectorial de `lore-db`. Ese trabajo no debe perderse ni volver a discutirse desde cero. Este dossier lo cristaliza como **backlog scrum listo para refinement** en la sala de Scriptorium.

La responsabilidad de este dossier es la parte **Scriptorium** del feature: contrato compartido, refinamiento del backlog transversal, server MCP en `MCPGallery/mcp-mesh-sdk/src/` e integración final con el trabajo del subequipo de `DocumentMachineSDK`.

## Contexto compartido

- `sala/dossiers/scrum-backlog-lore-db-vector-expansion/ref/INDEX.md`
- `sala/PLAN-VECTOR/ANALISIS.md`
- `sala/PLAN-VECTOR/PUNTO-INVESTIGACION-SIN-DOCKER.md`
- `sala/PLAN-VECTOR/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md`

## 2. Anclas

- El trabajo de hoy queda congelado como **referencia y trabajo avanzado** en `ref/`.
- `LORE_F` se trata como **fichero completo trabajado fuera del server**, no como edición pieza a pieza.
- `validate` debe comprobar que los IDs de piezas referenciadas existen en la DB y reportar gaps/cobertura.
- Topología simplificada: **server en Scriptorium; datos y skill en `DocumentMachineSDK`**.
- `lore-db/` y `lore-db-vector/` son carpetas hermanas en local y comparten volumen padre en Docker.

## 3. Restricciones

- Este dossier no reabre la investigación. El siguiente paso es **refinement**.
- El espejo local en `DocumentMachineSDK` existe para el subequipo documental; no duplicar aquí su desglose interno.
- El backlog es índice y tracking. El detalle vive en `tasks/`.
- Cualquier cambio futuro al plan compartido debe reflejarse también en `RESPUESTAS.md`.

## 4. Propuesta

### 4.1 Inicialización de la sesión

La sesión queda inicializada con dos tareas ya resueltas:

- `SBLVX-SC-00` — pre-scrum definitions
- `SBLVX-SC-01` — planification

### 4.2 Siguiente paso

El siguiente paso visible para Aleph y para cualquier agente que active sala es:

- **aprobar el plan o enmendarlo** (`SBLVX-SC-02`)

Solo después de ese refinement se abre el trabajo técnico detallado para:

- refinar el scope Scriptorium (`SBLVX-SC-03`)
- preparar el handoff e integración con `DocumentMachineSDK` (`SBLVX-SC-04`)

### 4.3 Resultado esperado del refinement

- Un plan compartido ratificado o corregido.
- Un reparto claro entre Scriptorium y `DocumentMachineSDK`.
- Un backlog ya ejecutable sin volver a reinterpretar el trabajo avanzado de hoy.

## 5. Salida operativa

- Tracking: [BACKLOG.md](./BACKLOG.md)
- Decisiones del PO: [RESPUESTAS.md](./RESPUESTAS.md)
- Activación del dossier: [activacion.prompt.md](./activacion.prompt.md)
- Referencias y trabajo avanzado: carpeta [ref](./ref)
- Tasks: carpeta [tasks](./tasks)