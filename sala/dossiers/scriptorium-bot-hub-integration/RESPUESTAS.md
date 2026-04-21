# Respuestas del PO — scriptorium-bot-hub-integration

> **Fecha:** 21-abr-2026
> **Registradas por:** GPT-5.4

## Punto 1 — Convertir backlog heredado en dossier

- **Respuesta del usuario:** convertir el backlog heredado en un dossier siguiendo el protocolo.
- **Efecto operativo:** se crea `sala/dossiers/scriptorium-bot-hub-integration/` como capa persistente de diseno; el backlog original queda importado en `fuentes/` como contexto historico, no como indice operativo principal.

## Punto 2 — Rol del redactor

- **Respuesta del usuario:** el redactor no participa en la ejecucion; solo redacta el dossier.
- **Efecto operativo:** solo `SBI-00` queda cerrada por GPT-5.4 como tarea de cristalizacion del dossier. El resto de tasks quedan `libre` y `vacante`.

## Punto 3 — Asignacion de agentes pendiente

- **Respuesta del usuario:** por el momento se dejan vacantes que agentes hacen que.
- **Efecto operativo:** la columna `Agente` del backlog y el campo `Agente recomendado` de las tasks abiertas se dejan en `vacante`.

## Punto 4 — Topologia prevista

- **Respuesta del usuario:** habra un agente en Scriptorium y dos en cada submodule folder.
- **Efecto operativo:** el dossier refleja tres celdas previstas de trabajo: Scriptorium para coordinacion, BotHubSDK para parte 1 y dashboard, y DocumentMachineSDK para parte 2 e investigacion de pipeline. La aprobacion final de asignacion queda fuera de este dossier.

## Punto 5 — Fuente backlog a absorber

- **Respuesta del usuario:** la carpeta fuente historica es el backlog heredado de BotHubSDK.
- **Efecto operativo:** se importan como anclas locales `sala/dossiers/scriptorium-bot-hub-integration/fuentes/backlog-broadcast-kickoff.md`, `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/` y `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/`; los agentes dejan de trabajar directamente sobre la carpeta historica de origen.

## Punto 6 — Welcome note para externos

- **Respuesta del usuario:** dar una repasada y anadir un `welcome note` para agentes de fuera de esta codebase explicando que prompts, instrucciones y piezas agenticas minimas deben llevarse a su propia `.github/`.
- **Efecto operativo:** se anade `WELCOME-EXTERNOS.md` al dossier con dos packs portables, `aleph` y `agente`, y se deja trazado en el backlog como artefacto cerrado de redaccion.