# Backlog — sesion-scriptorium-vector

> **Última actualización:** 23-abr-2026 — GPT-5.4

## Contexto compartido

- Referencia bruta de sesión: `sala/dossiers/sesion-scriptorium-vector/ref/PLAN-MD-BRUTO-VERBATIM.md`
- Dossier scrum compartido: `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`
- Dossier técnico de autopista: `sala/dossiers/vector-machine/`
- Dossier local DocumentMachineSDK: `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/`
- Índice de reentrada: `sala/dossiers/sesion-scriptorium-vector/ref/INDEX.md`

## Regla DRY del backlog

El backlog es índice y tracking. El detalle vive en `tasks/`.
Este dossier no duplica el backlog de los dossiers hijos. Solo coordina la sesión, fija ownership y prepara la retoma.

## Tracking

| Task | Estado | Agente | Dependencias | Entrega | Brief |
|------|--------|--------|--------------|---------|-------|
| SSV-00 | cerrada | GPT-5.4 | — | dossier paraguas de sesión + mapa de referencias | [TASK-00](./tasks/TASK-00_CONTEXTO_Y_PERSISTENCIA.md) |
| SSV-01 | libre | vacante | SSV-00 | mapa ratificado de ownership y relación entre dossiers | [TASK-01](./tasks/TASK-01_MAPA_DE_OWNERSHIP_Y_RELACION_ENTRE_DOSSIERS.md) |
| SSV-02 | libre | vacante | SSV-01 | handoff de retoma con prioridad explícita para la próxima sesión | [TASK-02](./tasks/TASK-02_HANDOFF_DE_RETOMA_Y_PRIORIDAD.md) |

## Criterio de cierre del feature

- [ ] El plan bruto archivado en `ref/PLAN-MD-BRUTO-VERBATIM.md` queda absorbido como referencia de sesión y no como backlog operativo ambiguo.
- [ ] La relación entre los tres dossiers obligatorios del ecosistema queda explícita y sin solapamientos.
- [ ] La próxima sesión puede retomarse sabiendo cuál es el siguiente frente prioritario.