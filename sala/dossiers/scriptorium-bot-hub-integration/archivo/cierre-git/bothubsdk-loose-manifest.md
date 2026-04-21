# Manifiesto de absorcion - BotHubSDK

Este manifiesto documenta la retirada de contenido suelto generado en
BotHubSDK fuera del flujo canonico del broadcast.

## 1. Rutas eliminadas y reemplazo canonico

| Ruta original | Motivo de salida | Reemplazo canonico en dossier |
|---|---|---|
| `BotHubSDK/.github/instructions/sala-protocolo.instructions.md` | copia local auxiliar del protocolo de sala | `../../WELCOME-EXTERNOS.md` describe el pack y la raiz mantiene el kit reusable |
| `BotHubSDK/.github/prompts/sala-*.prompt.md` | pack local provisional para workers; no era parte del broadcast | `../../WELCOME-EXTERNOS.md` + kit reusable de la raiz |
| `BotHubSDK/.github/templates/sala-agente.template.md` | template auxiliar copiado para onboarding local | `../../WELCOME-EXTERNOS.md` + kit reusable de la raiz |
| `BotHubSDK/.github/nota-onboarding-bot-sala-WELCOME-EXTERNOS.md` | nota auxiliar de onboarding ya absorbida | `../../WELCOME-EXTERNOS.md` |
| `BotHubSDK/.github/nota-onboarding-bot-sala-pack-agente.md` | nota auxiliar de onboarding ya absorbida | `../../WELCOME-EXTERNOS.md` |
| `BotHubSDK/sala/README.md` | scaffold local vacio no usado como fuente canonica | este manifiesto |
| `BotHubSDK/sala/tablero.md` | scaffold local vacio no usado como fuente canonica | este manifiesto |
| `BotHubSDK/scrum/dossiers/scriptorium-bot-hub-integration/BACKLOG.md` | espejo legacy del dossier | `../../BACKLOG.md` |
| `BotHubSDK/scrum/dossiers/scriptorium-bot-hub-integration/PLAN.md` | espejo legacy del dossier | `../../PLAN.md` |
| `BotHubSDK/scrum/dossiers/scriptorium-bot-hub-integration/RESPUESTAS.md` | espejo legacy del dossier | `../../RESPUESTAS.md` |
| `BotHubSDK/scrum/dossiers/scriptorium-bot-hub-integration/activacion.prompt.md` | espejo legacy del dossier | `../../activacion.prompt.md` |
| `BotHubSDK/scrum/dossiers/scriptorium-bot-hub-integration/tasks/*` | espejo legacy de las tasks del dossier | `../../tasks/` |
| `BotHubSDK/tmp/sesion-parte2-grafo-2026-04-21/*` | investigacion temporal de modulo; ya no debe vivir en `tmp/` | `../broadcast/investigacion-previa-grafo.md`, `../broadcast/doc-fact-documentmachinesdk.md`, `../broadcast/documentmachinesdk-evidencia-detallada.md`, `../broadcast/bot-fact-bothubsdk.md` |

## 2. Semantica historica preservada del `scrum/` espejo

El arbol `BotHubSDK/scrum/dossiers/scriptorium-bot-hub-integration/` ya no era
la fuente de verdad al cierre. Su contenido queda preservado por sustitucion:

- misma estructura funcional -> `sala/dossiers/scriptorium-bot-hub-integration/`
- misma intencion editorial -> `../../PLAN.md` y `../../BACKLOG.md`
- mismas tasks -> `../../tasks/`

La limpieza elimina el espejo legacy para que el trabajo quede centralizado en
un solo dossier.

## 3. Semantica historica preservada del `tmp/` de grafo

La carpeta `BotHubSDK/tmp/sesion-parte2-grafo-2026-04-21/` produjo hallazgos que
quedan absorbidos asi:

| Fichero temporal | Absorcion canonica |
|---|---|
| `estado.md` | `../broadcast/investigacion-previa-grafo.md` |
| `informe-01-estructura-documentmachinesdk.md` | `../broadcast/documentmachinesdk-evidencia-detallada.md` |
| `informe-02-pipeline-future-machine-slot-grafista.md` | `../broadcast/documentmachinesdk-evidencia-detallada.md` |
| `informe-03-grafo-mod-legislativa-estado-real.md` | `../broadcast/documentmachinesdk-evidencia-detallada.md` |
| `informe-04-dossier-grafo-sdk-estado-y-peticion-retro.md` | `../broadcast/doc-fact-documentmachinesdk.md` |
| `informe-05-addons-y-sala-coordinacion.md` | `../broadcast/documentmachinesdk-evidencia-detallada.md` + `../../WELCOME-EXTERNOS.md` |
| `informe-06-historico-broadcasts-y-estado-bothubsdk.md` | `../broadcast/bot-fact-bothubsdk.md` |
| `sintesis-pre-sala.md` | `../broadcast/investigacion-previa-grafo.md` |

## 4. Valor residual del `sala/` local de BotHubSDK

El `sala/` local del submodulo no llego a operar como sala canonica del sprint.
Queda registrado solo que fue un scaffold vacio generado para onboarding local,
sin artefactos propios de ejecucion que merezcan permanecer fuera del dossier.