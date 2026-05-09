## Handoff RUNBOOK — Rooms MVP activa

> **Fecha:** 2026-05-09  
> **Autor:** `GitHub Copilot`  
> **Estado:** dev cerrada, handoff devuelto al hilo operativo del RUNBOOK

## Estado live validado

- `node-red-dashboard-2-alephscript-rooms@0.1.0` publicado en `https://npm.scriptorium.escrivivir.co`.
- `scriptorium-vps-nodered-1` operativo con Dashboard clásico + Dashboard 2 + widget Rooms.
- Flow MVP activo desde `ScriptoriumVps/node-red-projects/rooms-mvp-candidate.flow.json`.
- Endpoints verificados en ventana controlada:
	- `https://scriptorium.escrivivir.co/ui/` → `200`
	- `https://scriptorium.escrivivir.co/dashboard/` → `200`
	- `https://scriptorium.escrivivir.co/dashboard/rooms` → `200`
	- `https://admin.scriptorium.escrivivir.co/red/` → `200`
- UI inspeccionada con:
	- modo `managed-port`
	- `3/3` dummy agents conectados
	- room `ROOMS_LAB`
	- namespaces, usuarios, sockets y log `SET_SERVER_STATE`

## Consolidación documental aplicada

- `TASK-09_NODERED_ROOMS_MVP.md` se cierra y queda como documento histórico de diseño/decisión.
- `TASK-04_STACK_NODERED.md` pasa a concentrar la trazabilidad técnica viva de Node-RED + Rooms MVP.
- `ScriptoriumVps/RUNBOOK.md` recupera el mando operativo del despliegue y del hardening posterior.

## Caveat abierto para el agente del RUNBOOK

La MVP está activa, pero el endurecimiento de persistencia no queda cerrado todavía:

- los contribs del MVP se instalaron en el contenedor Node-RED bajo `/data`;
- el flow activo quedó en `/data/flows.json`;
- esto sobrevive al reinicio del contenedor, pero no está garantizado frente a recreación completa (`docker compose up -d --build`, rebuild, reemplazo de contenedor).

## Siguiente hilo recomendado

El agente que dirige el runbook debería continuar con este orden:

1. formalizar instalación reproducible de contribs Node-RED del MVP en el ciclo de build/deploy;
2. materializar el flow Rooms como project persistente o procedimiento de bootstrap reproducible;
3. validar explícitamente el modo read-only de `/red` con sesión anónima real;
4. decidir si `node-red-contrib-alephscript-core` también debe publicarse/activarse ahora o en un lote posterior.

## Nota de control

No usar `TASK-09` como runbook vivo a partir de este punto. El mando vuelve a `RUNBOOK.md` + `TASK-04_STACK_NODERED.md`.
