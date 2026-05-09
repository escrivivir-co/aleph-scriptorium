# TASK-11 — Peer real, handoff y endurecimiento post-MVP Pub.Rooms

> **Estado:** abierta — esperando peer real  
> **Fecha:** 2026-05-09  
> **Agente recomendado:** `vps-ops` + `nodered-curator`  
> **Dependencias:** TASK-10 cerrada funcionalmente, `SPIKE-10-OASIS-IDENTITY.md` como contexto estratégico  
> **Entrega esperada:** primer peer real conectado o decisión explícita de pausa; evidencia recogida; rotación/hardening planificados sin reabrir la infraestructura base.

## Objetivo

Reanudar el trabajo cuando haya un **peer real** listo para entrar al Pub.Rooms federado. TASK-10 ya demostró el canal técnico; TASK-11 valida la adopción real, recoge fricción de onboarding y decide si el MVP shared-secret debe endurecerse hacia JWT/OASIS identity.

Estado de partida:

- `rooms.scriptorium.escrivivir.co` activo con TLS.
- `wss://rooms.scriptorium.escrivivir.co/runtime` operativo.
- Bootstrap público disponible en `ScriptoriumVps/scripts/bootstrap-mesh-client.sh`.
- Flow cliente disponible en `ScriptoriumVps/node-red-projects/pub-room-client.flow.json`.
- Notas de invitación listas en `tasks/SUBTASKS/`.
- Owner reparte tokens fuera de banda.

## Estado operativo hasta que aparezca peer

> **Enviar y esperar.**

No abrir ventanas de Caddy, Docker, paquetes ni DNS si no hay peer real o incidencia concreta. Mantener el sistema en observación ligera:

- comprobar `/healthz` si se va a enviar una invitación;
- distribuir token por canal seguro;
- esperar evidencia del peer;
- registrar fricción real, no hipotética.

## Qué se envía

Según perfil:

- owner/operador: `tasks/SUBTASKS/NOTA-OWNER-RECORDATORIO.md`;
- amigo con Node-RED: `tasks/SUBTASKS/NOTA-AMIGO-PEER-NODE-RED.md`;
- amigo desde cero: `tasks/SUBTASKS/NOTA-AMIGO-DESDE-CERO.md`.

El broadcast RETRO referencia el proxy DRY:

- `sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/proxy-retro.md`.

## Checklist al reanudar con peer real

1. Confirmar que el peer recibió token y room por canal seguro.
2. Confirmar que usa el bootstrap público vigente.
3. Verificar `curl -I https://rooms.scriptorium.escrivivir.co/healthz` desde el peer.
4. Peer ejecuta bootstrap con `ROOMS_USER`, `ROOMS_ROOM`, `ROOMS_SECRET`.
5. Peer arranca Node-RED con `source ~/.node-red/.env.rooms && node-red`.
6. Peer importa `flows_pub-room-client.json` y hace deploy.
7. Owner verifica en dashboard/logs:
   - cliente aparece en `ROOMS_LAB` o room asignada;
   - un `ROOM_MESSAGE` de prueba llega al server;
   - token inválido produce `connect_error('unauthorized')` si se prueba smoke negativo.
8. Registrar evidencia sin secretos:
   - timestamp UTC;
   - alias del peer;
   - room;
   - estado `connected`/`auth_error`;
   - log sanitizado si procede.

## Decisiones a tomar tras el primer peer

- ¿El bootstrap actual basta o necesita flags `--profile`, `--room`, `--token`, `--user`?
- ¿Conviene separar paquete cliente mínimo de `node-red-dashboard-2-alephscript-rooms` para peers que no sirven dashboard?
- ¿Se mantiene shared-secret por persona/room o se promueve a JWT de corta vida?
- ¿Se activa una identidad fuerte vía OASIS/SSB/DID según `SPIKE-10`?
- ¿Se crea un service Rooms separado de Node-RED si hay más peers o necesidad de uptime independiente?

## No objetivos

- No tocar Caddy ni DNS salvo incidencia real.
- No publicar `3010` al host.
- No reabrir `0.2.1` CORS salvo caso navegador real documentado.
- No meter secrets en repo, logs ni notas de invitación.
- No sustituir TASK-10: esta task es post-MVP/adopción.

## Criterio de cierre

TASK-11 se cierra cuando ocurra una de estas condiciones:

1. **Peer real conectado:** hay evidencia sanitizada de al menos un peer externo real conectado y enviando/recibiendo evento en una room asignada; o
2. **Pausa explícita:** el PO decide pausar invitaciones y deja backlog de hardening priorizado.

En ambos casos, actualizar:

- `LAST_UPDATE.md`;
- `BACKLOG.md`;
- `RESPUESTAS.md` si hay nueva decisión PO;
- notas de onboarding si la fricción real descubre ajustes necesarios.