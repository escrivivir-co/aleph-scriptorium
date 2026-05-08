# Handoff cierre supervisión — Guardia OASIS_PUB / GANDI

> **Supervisor:** GitHub Copilot  
> **Fecha:** 2026-05-08 21:50:24  
> **Objetivo inicial:** proteger `BlockchainComPort/OASIS_PUB` y `BlockchainComPort/GANDI_DEVOPS_FOLDER` durante el carril `ScriptoriumVps`, validando que toda integración sea respetuosa y bloqueando operación real no aprobada.

## Veredicto global de guardia

**CHECK para diseño/candidatos. BLOCK para operación real.**

No he detectado intentos de tocar DNS/Gandi/VPS/Docker vivo desde esta supervisión. Todo lo revisado queda como artefactos candidatos en carpetas de agente o integrado documentalmente por el Aleph real.

## Decisión arquitectónica fijada

La opción correcta para el MVP es:

> Integración respetuosa en el Caddy existente de `BlockchainComPort/OASIS_PUB`.

Queda descartado:

- levantar un segundo Caddy en producción compartida;
- mover a VPS/host separado en este MVP;
- tocar `pub.escrivivir.co`, dominio raíz, Bluesky/`_atproto`, secretos de `GANDI_DEVOPS_FOLDER` o VPS real sin orden PO.

La topología candidata usa:

- edge productivo: `pub-web` de `OASIS_PUB`;
- red externa desde `ScriptoriumVps`: `oasis-pub-scriptorium_oasis_pub_net`;
- aliases: `scriptorium-nodered`, `scriptorium-mcp-devops`, `scriptorium-verdaccio`.

## Estado de revisión del track VPS

### Cerradas/integradas por Aleph real antes de este corte

- `VPS-00` cerrada.
- `VPS-01` cerrada.
- `VPS-02` cerrada.
- `VPS-03` cerrada e integrada como diseño/documentación respetuosa con `OASIS_PUB`.

### Aprobadas por revisión, pendientes de integración/copia final

- `VPS-04` — aprobada en `REV-VPS-04-R2`.
  - Corrigió build de contribs Node-RED locales antes de instalar.
  - Pendiente: copiar candidatos de Gepe a `ScriptoriumVps/PATTERN-DOCKER/nodered/` y aplicar patches.

- `VPS-05` — aprobada en `REV-VPS-05-R2`.
  - Corrigió puerto interno `DevOpsServer` vs gateway (`3004` inner, `3003` gateway).
  - Pendiente: copiar candidatos de Gepe a `ScriptoriumVps/PATTERN-DOCKER/mcp-mesh/` y aplicar patches.

- `VPS-06` — aprobada en `REV-VPS-06`.
  - Verdaccio candidate correcto: `config.yaml`, `.npmrc.example`, pipeline dry-run, storage, auth.
  - Pendiente: copiar candidatos de Gepe a `ScriptoriumVps/PATTERN-DOCKER/verdaccio/` y aplicar patches.

### Cerrada por excepción PO

- `VPS-07` — cerrada en `REV-VPS-07-R3`.
  - Sony corrigió variables canónicas y layout de mounts.
  - Por excepción PO, Aleph eliminó el duplicado de `sftp-helpers.sh`, integró artefactos en `ScriptoriumVps/` y validó sintaxis/duplicados.
  - No se ejecutó SSH/SFTP ni operación real sobre VPS.

### No abrir todavía

- `VPS-08` no debe ejecutarse hasta que `VPS-04..06` estén integradas/cerradas, no sólo aprobadas como candidatos. `VPS-07` ya quedó cerrada.

## Tablero recomendado para Aleph real

Mantener el tablero así hasta la próxima acción:

- `VPS-04`: `entregada:gepe` — aprobada, pendiente integración.
- `VPS-05`: `entregada:gepe` — aprobada, pendiente integración.
- `VPS-06`: `entregada:gepe` — aprobada, pendiente integración.
- `VPS-07`: `cerrada` — integrada por excepción PO.
- `VPS-08`: no tomar todavía; `VPS-04..06` siguen sin cierre final.

## Líneas rojas que siguen vigentes

Antes de cualquier operación real, pedir validación explícita al PO para:

- editar DNS/Gandi;
- entrar por SSH/SCP/SFTP al VPS real;
- ejecutar `docker compose up/restart/pull` en producción;
- editar `BlockchainComPort/OASIS_PUB/caddy/Caddyfile` vivo;
- manipular secretos o claves en `GANDI_DEVOPS_FOLDER`;
- publicar paquetes reales en Verdaccio productivo.

## Cierre de aparición supervisora

Mi rol de supervisor externo queda cerrado salvo nueva invocación expresa. El Aleph real de sala puede retomar como orquestador principal con este tablero y estos veredictos.
