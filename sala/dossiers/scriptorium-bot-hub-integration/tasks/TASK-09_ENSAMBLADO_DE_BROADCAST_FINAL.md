# TASK-09 — Ensamblado de broadcast final

> **Estado:** libre
> **Agente recomendado:** vacante
> **Celda prevista:** Scriptorium
> **Dependencias:** SBI-08
> **Entrega esperada:** `BotHubSDK/examples/dashboard/userdata/broadcast.md` generado desde los tres ficheros fuente

## Absorbe backlog original

- `BB-19` — Ensamblar broadcast final

## Lee primero

1. `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/00-plan-general.md`
2. `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/01-parte-bothubsdk.md`
3. `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-documentmachinesdk.md`

## Objetivo

Generar el broadcast final en el destino real del dashboard, respetando el orden de ensamblado, la longitud y el criterio de separadores definidos en el plan general.

## Cambios requeridos

1. Escribir cabecera corta de contexto si el plan general la exige.
2. Ensamblar parte 1 y parte 2 en el orden fijado.
3. Usar `---` solo si la longitud o la legibilidad lo requieren.
4. Verificar que el mensaje final se puede leer seguido y no depende de contexto externo inmediato.

## Salida minima esperada

1. Candidato de `BotHubSDK/examples/dashboard/userdata/broadcast.md` en la carpeta temporal del agente.
2. `ENTREGA_SBI-09.md` con decision de ensamblado y notas sobre separadores usados o no usados.

## Criterio de aceptacion

- `broadcast.md` existe y sale de los tres ficheros fuente, no de improvisacion ad hoc.
- El mensaje final mantiene coherencia editorial y cabe en el flujo actual de RabbitBot.