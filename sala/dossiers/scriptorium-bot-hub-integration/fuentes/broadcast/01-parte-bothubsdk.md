# Parte 1 - Notas De Version BotHubSDK

## Objetivo

Resumir el estado de BotHubSDK despues de la migracion, sintetizar antecedentes de broadcast y preparar la propuesta operativa a didac y RetroBot antes del broadcast final.

## Bloque Corto Recomendado

Escribe aqui una version breve de 4 a 8 lineas para el broadcast.

## Puntos Clave

- Estado de migracion:
- Rama o commit relevante:
- Estado de build:
- Estado de tests:
- Estado del dashboard como target de prueba:
- Estado del flujo de broadcast:

## Historico A Recuperar Y Sintetizar

- Archivo local 1: `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-08T19-00-00-000Z.md`
- Archivo local 2: `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-10T22-34-12-693Z.md`
- Posible fuente adicional: repo origen o codebase externa si aparece mas historico

## Linea Sintetica Del Historico

- Primer broadcast: arranque de conversacion, IACM listo para merge, preguntas sobre visibilidad bot-a-bot en Telegram.
- Segundo broadcast: Rabbit, Spider y Horse ya unificados como runtime y propuesta de handshake `INVITE -> ACCEPT -> ANNOUNCE -> PKG`.
- Tercera fase propuesta ahora: validacion de arranque + cambio tactico hacia simulacion federada para habilitar asesoria.

## Evidencia Tecnica

- Build SDK:
- Smoke dashboard:
- Suite Bun:
- Arranque mock dashboard:
- Scripts ajustados en raiz:

## Propuesta Operativa A didac Y RetroBot

- Proponer simular, en lugar de ejecutar ahora mismo, el ciclo ya hablado de `rabbit -> spider -> horse`.
- Mantener la narrativa de federacion y de uso de canal sin bloquear el proceso devops real para validacion final posterior.
- Presentar la simulacion como un paso tactico para abrir una sesion util de trabajo y no como sustitucion permanente del testing real.

## Razon De La Simulacion

- Se requiere usar el canal virtualmente en un proceso de asesoria con didac-retro.
- Parar el flujo para confirmar operativa real completa ahora mismo reduce el valor inmediato de esa sesion.
- La simulacion permite demostrar el circuito narrativo y operacional sin afirmar conectividad real todavia.

## Si Aceptan La Propuesta

- Definir un peer mock para didac y su bot como contraparte federada.
- Simular el canal spider como si el enlace federado ya existiese.
- Usar el canal Horse para una sesion de asesoria sobre `crear grafos`.
- Dejar esa sesion conectada con la parte 2 del broadcast y con `DocumentMachineSDK`.

## Cambios O Mejoras Que Conviene Mencionar

-
-
-

## Riesgos O Pendientes

-
-

## Frases Aprovechables Para El Broadcast Final

-
-
-

## Recursos De Contexto

- `README-SCRIPTORIUM.md`
- `.github/plugins/bot-hub-sdk/manifest.md` en la codebase externa
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/01-kickoff-bothubsdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/03-evidencia-product-owner-lore.md`

## Datos Pendientes

- PENDIENTE: