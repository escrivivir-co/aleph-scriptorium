# Activación — Scriptorium VPS

> Prompt de entrada al dossier. Cualquier agente que entre en este dossier
> debe leer este fichero antes de leer PLAN.md o las tasks.

## Contexto mínimo

Este dossier convierte el MINI-PLAN de la sesión Denis en un track ejecutable para el VPS público de Scriptorium. El objetivo es separar el trabajo en bloques pequeños: repo/submódulo, plugin, DNS+Caddy, Node-RED, MCP DevOps, Verdaccio, volúmenes/SFTP y verificación.

## Estado actual

- Último avance: `VPS-08` iniciada por Aleph. Preflight público: `pub.escrivivir.co` responde en VPS, pero los cuatro subdominios Scriptorium aún apuntan a WordPress.com y requieren cambio DNS controlado.
- Próximas tasks libres: ninguna.
- Decisiones PO pendientes: ninguna bloqueante.
- Regla de seguridad vigente: cualquier operación real sobre DNS/Gandi/VPS/Docker remoto requiere ventana controlada de Aleph y aprobación explícita del PO justo antes de operar.

## Instrucción de entrada

Lee [BACKLOG.md](./BACKLOG.md), identifica tasks libres sin deps bloqueantes y propón a Aleph. No escribas fuera de tu carpeta `sala/agente-{alias}/` salvo aprobación explícita del orquestador.
