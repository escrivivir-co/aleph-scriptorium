# Archivo de soporte - broadcast final

Este directorio es el archivo canonico de soporte del feature
`scriptorium-bot-hub-integration`.

## Ruta canonica de salida

- Mensaje vivo: `BotHubSDK/examples/dashboard/userdata/broadcast.md`
- Historico vivo: `BotHubSDK/examples/dashboard/userdata/history/`

## Regla DRY aplicada al cierre

- El mensaje que se envia vive solo en BotHubSDK.
- Toda evidencia extensa, notas de simulacion, packs factuales e investigacion
  previa se archivan aqui.
- Los enlaces publicos del broadcast apuntan a GitHub y resuelven contra este
  archivo o contra el historico real de BotHubSDK.

## Artefactos archivados

- `bot-fact-bothubsdk.md` - continuidad historica y pack factual BOT.
- `proxy-retro.md` - indice DRY para departamentos RETRO, onboarding y rutas complementarias.
- `marco-simulacion-iacm.md` - decision editorial de simulacion.
- `guion-iacm.md` - microconversaciones IACM pre-handshake.
- `doc-fact-documentmachinesdk.md` - pack factual DOC listo para broadcast.
- `documentmachinesdk-evidencia-detallada.md` - detalle de ramas, slot grafista,
  future-machine y addons.
- `investigacion-previa-grafo.md` - absorcion de la sesion de trabajo previa en
  modulos (`BotHubSDK/tmp/sesion-parte2-grafo-2026-04-21/`).

## Nota de merge final

El broadcast emitible se ha construido fusionando:

1. `BotHubSDK/examples/dashboard/userdata/broadcast.md` - estado operativo de
   despliegue en dashboard.
2. `BotHubSDK/examples/dashboard/userdata/history/broadcast-NEW.md` - cierre
   editorial con simulacion federada y CTA a Retro.

El resultado final absorbe el estado de despliegue de BotHubSDK y sustituye las
referencias a `sala/agente-*` por artefactos archivados dentro de este dossier.