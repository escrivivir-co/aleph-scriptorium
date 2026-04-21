# Backlog Broadcast Kickoff

Objetivo: preparar un broadcast final compuesto a partir de 3 ficheros fuente y publicarlo al cierre de la sesion usando el flujo del dashboard, incorporando una propuesta operativa de simulacion federada para habilitar una sesion de asesoria con Retro.

## Contexto Operativo

- El broadcast final no se edita directamente en `BotHubSDK/examples/dashboard/userdata/broadcast.md` hasta el cierre.
- La fuente de verdad durante la sesion vive en `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/`.
- La composicion final ensamblara plan general + parte 1 + parte 2.
- `Scriptorium/para-la-voz-sdk` pasa a nombrarse `Scriptorium/DocumentMachineSDK`.
- Tanto BotHubSDK como DocumentMachineSDK son productos de la codebase externa `ALEPH/.github`.
- La hipotesis de trabajo de esta sesion es proponer simulacion federada en lugar de frenar el proceso para confirmar ahora mismo operativa real end-to-end.

## Artefactos

- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/00-plan-general.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/01-parte-bothubsdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-documentmachinesdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/01-kickoff-bothubsdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/02-kickoff-documentmachinesdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/03-evidencia-product-owner-lore.md`
- salida final prevista: `BotHubSDK/examples/dashboard/userdata/broadcast.md`

## Backlog Detallado

| ID | Estado | Tarea | Resultado esperado |
|---|---|---|---|
| BB-01 | TODO | Definir metadata de composicion | El plan general indica objetivo, audiencia, orden y reglas de ensamblado |
| BB-02 | TODO | Recuperar historico de broadcasts archivados | Corpus local y/o origen identificado para sintesis |
| BB-03 | TODO | Sintetizar historico para BotHubSDK | Linea narrativa breve de antecedentes y continuidad |
| BB-04 | TODO | Redactar parte 1 de BotHubSDK | Estado actual + validacion tecnica + propuesta operativa |
| BB-05 | TODO | Redactar parte 2 de DocumentMachineSDK | Estado del producto externo y su papel en la sesion propuesta |
| BB-06 | TODO | Integrar renombrado a DocumentMachineSDK | Terminologia actualizada en backlog, plan y notas |
| BB-07 | TODO | Formular propuesta a didac y RetroBot | Mensaje propone simular el ciclo rabbit -> spider -> horse |
| BB-08 | TODO | Explicar la razon de simular | Justificacion: no bloquear devops real y reservar el canal para asesoria |
| BB-09 | TODO | Diseñar base de simulacion federada | Peer mock de didac y su bot definido a nivel narrativo/operativo |
| BB-10 | TODO | Preparar sesion Horse sobre crear grafos | Parte 2 deja claro el foco de la asesoria |
| BB-11 | TODO | Integrar evidencia del product owner | La nota de lore queda disponible como contexto para agentes |
| BB-12 | TODO | Rastrear ramas de DocumentMachineSDK | `main`, `mod/restitutiva`, `mod/legistlativa` revisadas o variantes anotadas |
| BB-13 | TODO | Ubicar future-machine y slot grafista | Conceptos, agentes y archivos de pipeline identificados |
| BB-14 | TODO | Localizar addons relevantes | `sala/dossier`, `media extraction` y similares ubicados |
| BB-15 | TODO | Definir la ayuda pedida a Retro | `dossier grafo-sdk` y `grafo-legalista-sdk` quedan explicados |
| BB-16 | TODO | Bosquejar protocolo IACM de asesoria | Tramo simple de guia y tramo estructurado de informe definidos |
| BB-17 | TODO | Revisar coherencia entre ambas partes | Terminologia, tono y referencias consistentes |
| BB-18 | TODO | Resolver enlaces y referencias externas | Branch, commit, docs, manifiestos o rutas verificados |
| BB-19 | TODO | Ensamblar broadcast final | `broadcast.md` generado desde los 3 ficheros |
| BB-20 | TODO | Probar arranque dashboard | Dashboard operativo antes del envio |
| BB-21 | TODO | Ejecutar broadcast | Flujo `/rb_aleph` listo y validado |

## Recursos Y Evidencia Inicial

- Historico local disponible:
	- `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-08T19-00-00-000Z.md`
	- `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-10T22-34-12-693Z.md`
- Estado de integracion en repo actual:
	- `README-SCRIPTORIUM.md`
	- `.github/plugins/bot-hub-sdk/manifest.md` en la codebase externa `ALEPH/.github`
- Evidencia narrativa del product owner:
	- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/03-evidencia-product-owner-lore.md`

## Regla De Trabajo

- Cada fichero se puede editar de forma independiente.
- Si una parte depende de datos no confirmados, se marca como `PENDIENTE` en linea propia.
- La version final del broadcast la genero yo al final de la sesion, no antes.
- La nota del product owner se usa como evidencia de contexto y orientacion narrativa, no como afirmacion de funcionalidad ya implementada.

## Criterios De Cierre

- Los 3 ficheros fuente estan completos.
- Parte 1 incluye sintesis del historico y propuesta de simulacion a didac/Retro.
- Parte 2 usa el nombre `DocumentMachineSDK` y aterriza la asesoria sobre crear grafos.
- El ensamblado final cabe en el flujo real de RabbitBot usando separadores `---` solo cuando haga falta dividir el mensaje.
- El dashboard arranca y el comando de broadcast queda listo para prueba.