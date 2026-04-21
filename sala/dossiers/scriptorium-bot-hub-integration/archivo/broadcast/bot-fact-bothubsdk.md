# BOT_FACT - BotHubSDK

> Archivo canonico de soporte para el broadcast final.
> Absorbe: `sala/agente-gemy/evidencia-bothubsdk.md` y el estado de despliegue
> consignado en `BotHubSDK/examples/dashboard/userdata/broadcast.md` antes del
> merge final.

## 1. Linea sintetica

BotHubSDK cierra su primer tramo de madurez estable en la rama de integracion
con Scriptorium. Rabbit, Spider y Horse ya se presentan como un ecosistema
cohesionado, el dashboard se usa como primera superficie de despliegue y la
maniobra tactica elegida para esta ventana es una simulacion federada controlada
que permita abrir con Retro una conversacion de diseno sobre `grafo-sdk` sin
bloquear el siguiente paso en espera del devops federado real.

## 2. Evidencia canonica del repositorio

| Hecho | Fuente canonica | Valor |
|------|-----------------|-------|
| Rama de integracion con Scriptorium | `BotHubSDK/README-SCRIPTORIUM.md` | `integration/beta/scriptorium` tracking `origin/feat/sds_iacm` |
| Suite declarada del repo | `BotHubSDK/README.md` | `bun run test -> 515 tests across 33 files` |
| Script de smoke dashboard | `BotHubSDK/package.json` | `test:dashboard` |
| Historico del 08-abr-2026 | `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-08T19-00-00-000Z.md` | IACM v1.0 merge-ready |
| Historico del 10-abr-2026 | `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-10T22-34-12-693Z.md` | Rabbit, Spider y Horse ya unificados |

## 3. Estado de despliegue absorbido en el merge final

Estos puntos se absorben del mensaje vivo en BotHubSDK y forman parte del cierre
operativo del broadcast:

- 1 runtime BotHubSDK sobre Bun.
- 3 plugins cargados: Rabbit, Spider y Horse.
- 34 comandos registrados en arranque.
- commit de despliegue consignado: `8444012`.
- build SDK: OK.
- dashboard smoke: `22/22 tests OK`.
- suite Bun del repo: `515/515 tests OK`.
- arranque dashboard en mock: OK, incluso sin `.env` ni `BOT_TOKEN`.

## 4. Tactica de simulacion

- No se fuerza ahora la conexion real `bot-rabbit -> bot-spider -> bot-horse`.
- Se declara abierto el canal en modo simulacion para poder pasar de inmediato a
  una sesion de asesoria scrum con Retro.
- La secuencia de arranque que queda sobre la mesa para esta fase es:
  `INVITE -> ACCEPT -> ANNOUNCE -> PKG`.

## 5. Pack BOT_FACT reusable

- Continuidad 08/10: el 08-abr IACM v1.0 queda merge-ready; el 10-abr
  Rabbit/Spider/Horse figuran ya como ecosistema unificado.
- Rama documentada: `integration/beta/scriptorium` tracking
  `origin/feat/sds_iacm`.
- Superficie de pruebas disponible: `test:dashboard` existe y el repo declara
  `515 tests / 33 files`.
- Superficie de despliegue absorbida al cierre: dashboard como target vivo,
  `34 comandos` y smoke `22/22`.
- Tactica actual: simulacion federada local para abrir con Retro la asesoria de
  diseno sobre `grafo-sdk`.