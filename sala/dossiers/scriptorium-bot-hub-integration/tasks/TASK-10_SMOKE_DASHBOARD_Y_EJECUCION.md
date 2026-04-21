# TASK-10 — Smoke dashboard y ejecucion

> **Estado:** libre
> **Agente recomendado:** vacante
> **Celda prevista:** BotHubSDK
> **Dependencias:** SBI-09
> **Entrega esperada:** dashboard operativo y flujo `/rb_aleph` listo para prueba o bloqueo documentado

## Absorbe backlog original

- `BB-20` — Probar arranque dashboard
- `BB-21` — Ejecutar broadcast

## Lee primero

1. `package.json`
2. `BotHubSDK/examples/dashboard/userdata/broadcast.md`
3. `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/00-plan-general.md`
4. `README-SCRIPTORIUM.md`

## Objetivo

Verificar que el dashboard puede arrancar con el broadcast ya ensamblado y dejar listo el flujo de envio real via `/rb_aleph`, documentando con precision cualquier bloqueo tecnico si el circuito no cierra.

## Cambios requeridos

1. Confirmar los comandos reales de build, test y dashboard aplicables.
2. Ejecutar el smoke necesario para validar que el dashboard arranca o documentar por que no arranca.
3. Verificar que el fichero `BotHubSDK/examples/dashboard/userdata/broadcast.md` queda en la ruta esperada por el flujo.
4. Dejar preparado el comando o secuencia de envio real.
5. Si hay bloqueo, describir si es de entorno, credenciales, script o integracion.

## Salida minima esperada

1. Nota de smoke dashboard en la carpeta temporal del agente.
2. `ENTREGA_SBI-10.md` con resultado de prueba y pasos para envio o bloqueo documentado.

## Criterio de aceptacion

- El dashboard arranca y el flujo de broadcast queda listo, o el bloqueo queda descrito de forma accionable.
- No se declara envio exitoso si solo se valido el arranque local.