# Plan General Del Broadcast

Este broadcast se compone de 2 partes de contenido:

1. Notas de version de BotHubSDK.
2. Notas de version de Scriptorium/DocumentMachineSDK.

La funcion de este fichero es fijar la metadata de composicion y la logica de ensamblado final.

## Metadata De Composicion

- Estado: borrador de trabajo
- Fecha base: 2026-04-21
- Responsable de ensamblado final: GitHub Copilot
- Canal de salida previsto: RabbitBot via `BotHubSDK/examples/dashboard/userdata/broadcast.md`
- Mecanismo de envio: dashboard + comando `/rb_aleph`
- Rama objetivo validada: `integration/beta/scriptorium`
- Productos implicados: `BotHubSDK` y `DocumentMachineSDK`
- Procedencia de producto: codebase externa `ALEPH/.github`
- Renombrado vigente: `para-la-voz-sdk` -> `DocumentMachineSDK`
- Audiencia primaria: operadores y bots conectados al circuito de integracion
- Audiencia secundaria: colaboradores que necesiten contexto tecnico de arranque
- Idioma base: espanol tecnico
- Estilo: corto, factual, orientado a estado y siguiente paso
- Formato final: Markdown plano compatible con el flujo de broadcast actual
- Tesis operativa: proponer una simulacion federada controlada para habilitar una sesion de asesoria sin bloquear validacion devops real

## Fuentes Del Mensaje

- Parte 1 fuente: `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/01-parte-bothubsdk.md`
- Parte 2 fuente: `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-documentmachinesdk.md`
- Evidencia de contexto: `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/03-evidencia-product-owner-lore.md`
- Soporte tecnico local: `BotHubSDK/examples/dashboard/userdata/history/`
- Soporte externo: `ALEPH/.github/plugins/bot-hub-sdk/manifest.md`

## Orden De Ensamblado

1. Cabecera corta de contexto y estado de sesion.
2. Parte 1: BotHubSDK.
3. Parte 2: Scriptorium/DocumentMachineSDK.
4. Cierre con llamada a la accion o siguiente prueba.

## Reglas De Composicion

- El mensaje final debe poder leerse seguido, sin depender de contexto externo inmediato.
- Si la longitud lo exige, el ensamblado se divide en varios bloques usando `---`.
- Las duplicidades entre parte 1 y parte 2 se resuelven en favor de la version mas operativa.
- Los datos no confirmados no se infieren: se marcan como `PENDIENTE` hasta validacion.
- Parte 1 debe incluir la sintesis del historico y la propuesta a didac/Retro de simular el ciclo rabbit -> spider -> horse.
- Parte 2 debe explicar la utilidad de DocumentMachineSDK y la posible sesion de asesoria sobre crear grafos.
- La nota del product owner se usa como mapa narrativo y recurso de contexto, no como lista de features entregadas.
- El broadcast final no se genera hasta el cierre de la sesion.

## Checklist De Ensamblado Final

- [ ] Parte 1 completa
- [ ] Parte 2 completa
- [ ] Terminologia alineada entre SDK y Scriptorium
- [ ] Renombrado a DocumentMachineSDK reflejado
- [ ] Referencias minimas verificadas
- [ ] Propuesta de simulacion redactada
- [ ] CTA final definido
- [ ] `BotHubSDK/examples/dashboard/userdata/broadcast.md` generado

## Notas Para Edicion Concurrente

- Este fichero fija reglas, no contenido de release detallado.
- Las otras dos ventanas pueden trabajar las partes 1 y 2 sin bloquear el ensamblado.