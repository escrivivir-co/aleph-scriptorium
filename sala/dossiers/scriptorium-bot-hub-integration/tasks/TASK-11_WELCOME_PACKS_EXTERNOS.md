# TASK-11 — Welcome note y packs externos

> **Estado:** cerrada
> **Agente recomendado:** GPT-5.4
> **Celda prevista:** Scriptorium
> **Dependencias:** SBI-00
> **Entrega esperada:** `WELCOME-EXTERNOS.md` con packs `aleph` y `agente`

## Origen de la task

- Delta del PO tras la cristalizacion inicial del dossier.

## Objetivo

Dejar una nota de bienvenida para agentes o celdas que operen fuera de esta codebase explicando que piezas minimas deben llevarse a su propia `.github/` para seguir el mismo protocolo de sala y dossier.

## Debe cubrir

1. Dos packs diferenciados: `aleph` y `agente`.
2. Lista concreta de prompts, instrucciones, templates y skill minima.
3. Que rutas fuera de `.github/` deben existir para que el protocolo funcione.
4. Que copiar y que no copiar por defecto.

## Criterio de aceptacion

- Un agente externo puede bootstrappear su propia `.github/` sin tener que leer medio SDK.
- Queda clara la diferencia entre orquestacion local y worker compatible.
- El welcome no mezcla coordinacion portable con prompts de producto especificos.