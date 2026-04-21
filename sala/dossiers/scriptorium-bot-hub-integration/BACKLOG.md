# Backlog — scriptorium-bot-hub-integration

> **Ultima actualizacion:** 21-abr-2026 — GPT-5.4

## Contexto compartido

- Fuente backlog original importada: `sala/dossiers/scriptorium-bot-hub-integration/fuentes/backlog-broadcast-kickoff.md`
- Artefactos de trabajo: `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/` y `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/`
- Salida final prevista: `BotHubSDK/examples/dashboard/userdata/broadcast.md`
- Archivo de soporte final: `sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/`
- Topologia prevista: Scriptorium + BotHubSDK + DocumentMachineSDK
- Bootstrap externo: `WELCOME-EXTERNOS.md`

## Regla DRY del backlog

El backlog es indice y tracking. El detalle vive en `tasks/`.
No se duplican aqui ni el protocolo de ejecucion, ni el contenido editorial del broadcast, ni el detalle de investigacion de cada producto.

## Tracking

| Task | Estado | Agente | Dependencias | Entrega | Brief |
|------|--------|--------|--------------|---------|-------|
| SBI-00 | cerrada | GPT-5.4 | — | dossier base y contexto congelado | [TASK-00](./tasks/TASK-00_CONTEXTO_Y_PERSISTENCIA.md) |
| SBI-01 | libre | vacante | SBI-00 | metadata de composicion y renombrado consolidados | [TASK-01](./tasks/TASK-01_METADATA_Y_RENOMBRADO.md) |
| SBI-02 | libre | vacante | SBI-00 | historico y evidencia BotHubSDK sintetizados | [TASK-02](./tasks/TASK-02_HISTORICO_Y_EVIDENCIA_BOTHUBSDK.md) |
| SBI-03 | libre | vacante | SBI-00 | marco compartido de simulacion federada e IACM | [TASK-03](./tasks/TASK-03_MARCO_DE_SIMULACION_FEDERADA.md) |
| SBI-04 | libre | vacante | SBI-01, SBI-02, SBI-03 | `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/01-parte-bothubsdk.md` completo | [TASK-04](./tasks/TASK-04_REDACCION_PARTE1_BOTHUBSDK.md) |
| SBI-05 | libre | vacante | SBI-00 | mapa de ramas y referencias de DocumentMachineSDK | [TASK-05](./tasks/TASK-05_RAMAS_Y_TRAZABILIDAD_DOCUMENTMACHINESDK.md) |
| SBI-06 | libre | vacante | SBI-05 | `future-machine`, `slot grafista` y addons relevantes ubicados | [TASK-06](./tasks/TASK-06_FUTURE_MACHINE_GRAFISTA_Y_ADDONS.md) |
| SBI-07 | libre | vacante | SBI-01, SBI-03, SBI-05, SBI-06 | `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-documentmachinesdk.md` completo | [TASK-07](./tasks/TASK-07_REDACCION_PARTE2_Y_PETICION_A_RETRO.md) |
| SBI-08 | libre | vacante | SBI-04, SBI-07 | coherencia editorial y referencias verificadas | [TASK-08](./tasks/TASK-08_COHERENCIA_Y_REFERENCIAS.md) |
| SBI-09 | libre | vacante | SBI-08 | `BotHubSDK/examples/dashboard/userdata/broadcast.md` ensamblado | [TASK-09](./tasks/TASK-09_ENSAMBLADO_DE_BROADCAST_FINAL.md) |
| SBI-10 | libre | vacante | SBI-09 | dashboard operativo y flujo `/rb_aleph` validado | [TASK-10](./tasks/TASK-10_SMOKE_DASHBOARD_Y_EJECUCION.md) |
| SBI-11 | cerrada | GPT-5.4 | SBI-00 | welcome note para agentes externos con packs `aleph` y `agente` | [TASK-11](./tasks/TASK-11_WELCOME_PACKS_EXTERNOS.md) |

## Criterio de cierre del feature

- [ ] El backlog original queda absorbido por tasks con dependencias claras y sin ambiguedad de scope.
- [ ] Parte 1 y parte 2 quedan completas y consistentes con el renombrado a `DocumentMachineSDK`.
- [ ] La propuesta de simulacion federada y la peticion de ayuda a Retro quedan formuladas sin sobreafirmar operativa no verificada.
- [ ] El broadcast final puede ensamblarse y probarse en el flujo real del dashboard.