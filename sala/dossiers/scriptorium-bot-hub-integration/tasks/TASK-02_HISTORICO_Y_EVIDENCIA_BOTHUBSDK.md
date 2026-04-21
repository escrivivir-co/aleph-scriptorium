# TASK-02 — Historico y evidencia BotHubSDK

> **Estado:** libre
> **Agente recomendado:** vacante
> **Celda prevista:** BotHubSDK
> **Dependencias:** SBI-00
> **Entrega esperada:** historico sintetizado y base factual para `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/01-parte-bothubsdk.md`

## Absorbe backlog original

- `BB-02` — Recuperar historico de broadcasts archivados
- `BB-03` — Sintetizar historico para BotHubSDK

## Lee primero

1. `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/01-kickoff-bothubsdk.md`
2. `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/01-parte-bothubsdk.md`
3. `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-08T19-00-00-000Z.md`
4. `BotHubSDK/examples/dashboard/userdata/history/broadcast-2026-04-10T22-34-12-693Z.md`
5. `README-SCRIPTORIUM.md`
6. `package.json`

## Objetivo

Recuperar la continuidad de broadcasts previos y fijar la base factual de BotHubSDK para que la parte 1 en `fuentes/broadcast/` pueda hablar con precision de estado, build, tests, dashboard y flujo de broadcast sin inventar resultados.

## Cambios requeridos

1. Resumir los dos broadcasts historicos en una linea narrativa util.
2. Identificar que scripts existen realmente para build, test y dashboard.
3. Registrar la rama o referencia local relevante si esta disponible y verificable.
4. Preparar una lista corta de evidencia tecnica utilizable en parte 1.
5. Dejar claramente separados hechos verificados de datos pendientes.

## Salida minima esperada

1. Nota de sintesis historica en la carpeta temporal del agente.
2. Lista de evidencia tecnica verificable para BotHubSDK.
3. `ENTREGA_SBI-02.md` con rutas y puntos listos para inyectar en parte 1.

## Criterio de aceptacion

- La parte 1 puede citar continuidad historica sin repetir broadcasts anteriores en bruto.
- Build, tests y dashboard quedan anclados a scripts reales del repo.
- No se presentan como ejecutados pasos que solo estan declarados en scripts.