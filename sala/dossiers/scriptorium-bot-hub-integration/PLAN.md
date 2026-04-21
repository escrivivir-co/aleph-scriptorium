# Plan — scriptorium-bot-hub-integration

> **Fecha:** 21-abr-2026
> **Autor:** GPT-5.4
> **Dossier:** `sala/dossiers/scriptorium-bot-hub-integration/`

## 1. Contexto

El backlog importado en `sala/dossiers/scriptorium-bot-hub-integration/fuentes/backlog-broadcast-kickoff.md` mezcla cuatro capas distintas de trabajo: composicion editorial del broadcast, investigacion de producto, definicion de una simulacion federada y validacion operativa del dashboard. En su forma actual sirve como lista de control, pero no como capa persistente de diseno para coordinar trabajo multiagente entre BotHubSDK, DocumentMachineSDK y la orquestacion de Scriptorium.

Este dossier convierte ese backlog en una estructura ejecutable y trazable. La intencion no es cerrar el trabajo ahora, sino dejarlo descompuesto en briefs claros, con dependencias, anclas, restricciones y criterio de aceptacion verificable.

La topologia prevista de ejecucion es de tres celdas, pero por decision del PO no se asignan todavia: una celda en Scriptorium para coordinacion y ensamblado, una en BotHubSDK para parte 1 y dashboard, y una en DocumentMachineSDK para parte 2 e investigacion de pipeline.

## Contexto compartido

- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/backlog-broadcast-kickoff.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/00-plan-general.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/01-parte-bothubsdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-documentmachinesdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-para-la-voz-sdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/01-kickoff-bothubsdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/02-kickoff-documentmachinesdk.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/03-evidencia-product-owner-lore.md`
- `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-08T19-00-00-000Z.md`
- `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-10T22-34-12-693Z.md`
- `BotHubSDK/examples/dashboard/userdata/broadcast.md`
- `README-SCRIPTORIUM.md`
- `package.json` — scripts `build:sdk`, `test`, `dev:dashboard`

## 2. Anclas

- La fuente de verdad de trabajo durante la sesion vive en `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/`; el fichero final `BotHubSDK/examples/dashboard/userdata/broadcast.md` solo se genera al cierre.
- El broadcast final se compone a partir de tres piezas: plan general, parte BotHubSDK y parte Scriptorium/DocumentMachineSDK.
- El nombre vigente del producto hermano es `DocumentMachineSDK`; `para-la-voz-sdk` queda solo como alias historico cuando haga falta contextualizar.
- BotHubSDK y DocumentMachineSDK se presentan como productos hermanos de la codebase externa `ALEPH/.github`.
- La hipotesis operativa de esta sesion es usar simulacion federada controlada para habilitar una sesion de asesoria con Retro, sin venderla como validacion end-to-end ya confirmada.
- En BotHubSDK existe una rama de integracion declarada en `README-SCRIPTORIUM.md`: `integration/beta/scriptorium`.
- El flujo final previsto pasa por dashboard y comando `/rb_aleph`.

## 3. Restricciones

- Este dossier vive en `sala/dossiers/` y es la capa operativa actual; la carpeta historica de origen queda importada en `fuentes/`.
- El campo `Agente` del backlog se deja en `vacante` hasta que Aleph o el PO asignen celdas concretas.
- La ejecucion posterior debe respetar `disco primero`: candidatos y entregas en la carpeta temporal de cada agente cuando la sala se active.
- No se afirma conectividad federada real, ramas existentes, addons presentes ni pipeline operativa si no hay trazabilidad efectiva.
- La nota del product owner es evidencia de vision y orientacion narrativa; no se puede convertir automaticamente en release note.
- `BotHubSDK/examples/dashboard/userdata/broadcast.md` no se toca antes de la task de ensamblado final.
- El renombrado a `DocumentMachineSDK` debe quedar consistente en plan, backlog, notas y broadcast.
- Los agentes trabajan ya solo contra rutas de `sala/`; no deben usar la carpeta historica de origen como ruta operativa.

## 4. Propuesta

### 4.1 Topologia prevista de ejecucion

- **Scriptorium**: gobierno del dossier, marco transversal de simulacion, coherencia entre productos, ensamblado final y CTA.
- **BotHubSDK**: historico de broadcasts, estado de rama, build, tests, dashboard y redaccion de la parte 1.
- **DocumentMachineSDK**: trazado de ramas, `future-machine`, `slot grafista`, addons relevantes y redaccion de la parte 2.

### 4.2 Corte del trabajo

- `SBI-01` fija metadata de composicion y renombrado.
- `SBI-02` recupera historico y evidencia de BotHubSDK.
- `SBI-03` formula el marco de simulacion federada e IACM compartido.
- `SBI-04` cierra la parte 1 de BotHubSDK.
- `SBI-05` y `SBI-06` trazan la base factual de DocumentMachineSDK.
- `SBI-07` cierra la parte 2 y formaliza la peticion a Retro.
- `SBI-08` revisa coherencia editorial y referencias.
- `SBI-09` ensambla el broadcast final.
- `SBI-10` verifica dashboard y deja listo el envio real.

### 4.3 Resultado buscado

- Tres fuentes de broadcast completas y consistentes.
- Una narrativa unica que conecte BotHubSDK, DocumentMachineSDK y la propuesta `rabbit -> spider -> horse` sin sobreactuar madurez tecnica no verificada.
- Un dossier capaz de coordinar trabajo multiagente sin tener que reinterpretar el backlog raiz en cada sesion.

### 4.4 Bootstrap para agentes externos

- El dossier deja un `welcome note` para agentes que operen fuera de esta codebase pero necesiten adoptar el protocolo de sala y dossier en su propia `.github/`.
- El `welcome note` ofrece dos packs minimos: `aleph` para orquestacion e inicializacion de sala, y `agente` para workers que solo necesitan entrar, reconectar, seguir y salir.
- La intencion no es copiar todo Scriptorium: solo las piezas portables minimas para operar sin reabrir arqueologia en cada repo satelite.

## 5. Salida operativa

- Tracking: [BACKLOG.md](./BACKLOG.md)
- Decisiones del PO: [RESPUESTAS.md](./RESPUESTAS.md)
- Activacion: [activacion.prompt.md](./activacion.prompt.md)
- Welcome externo: [WELCOME-EXTERNOS.md](./WELCOME-EXTERNOS.md)
- Archivo final: [archivo/broadcast](./archivo/broadcast)
- Tasks: carpeta [tasks](./tasks)