# Estado — agente-aleph

> **Alias:** aleph
> **Modelo:** GitHub Copilot
> **Rol:** orquestador ejecutando cierre VPS-08 por orden PO
> **Task:** VPS-08
> **Estado:** en-curso
> **Inicio:** 2026-05-09
> **Último checkpoint:** 2026-05-09 — PO ordena iniciar VPS-08 con control de producción

## Log

- [2026-05-09] ENTRADA: Aleph toma `VPS-08` por orden explícita del PO. Alcance: preparar runbook/verify/deploy controlado y no ejecutar mutaciones reales sin ventana controlada con comandos exactos.
- [2026-05-09] PREFLIGHT SOLO LECTURA: `pub.escrivivir.co` resuelve a `92.243.24.163` y responde Caddy 200. Los hosts `scriptorium`, `admin.scriptorium`, `mcp.scriptorium` y `npm.scriptorium` resuelven a `192.0.78.x` y fallan TLS, por lo que DNS real aún no apunta al VPS.
- [2026-05-09] DNS PO: el PO informa creación de registros A `scriptorium`, `admin.scriptorium`, `mcp.scriptorium` y `npm.scriptorium` hacia `92.243.24.163`. Aleph verifica resolución local OK para los cuatro FQDN. Dossier y runbook actualizados.
- [2026-05-09] PREFLIGHT LOCAL: `.env` local generado con secretos ignorados por git; `.env.generated-secrets` creado para operador; `deploy.sh preflight` OK. Llave SSH candidata encontrada en workspace histórico. Ventana controlada con comandos exactos escrita en `VENTANA_CONTROLADA_VPS-08.md`.
- [2026-05-09] FASE 1 LECTURA: SSH a `debian@92.243.24.163` OK. El pub existente corre (`oasis-pub-web`, `oasis-pub-panel-api`, `oasis-pub-scriptorium`) y la red `oasis-pub-scriptorium_oasis_pub_net` existe. Hallazgo: `/opt/oasis-scriptorium` no es repo git padre, sino instalación de `BlockchainComPort`; ventana corregida para clonar `aleph-scriptorium` en `/opt/aleph-scriptorium` y tocar solo el Caddyfile real en `/opt/oasis-scriptorium/OASIS_PUB`.

## Handoff Aleph

- Último avance verificable: fase 1 SSH de lectura OK; ventana corregida con `/opt/aleph-scriptorium` como instalación hermana.
- Artefactos en carpeta: `estado.md`, `VENTANA_CONTROLADA_VPS-08.md`.
- Bloqueos o decisiones pendientes: pendiente aprobación explícita del PO para ejecutar la ventana corregida, porque cambia la ruta de despliegue respecto al primer plan.
- Carga restante estimada: preparar scripts/runbook; luego abrir ventana controlada.
- Siguiente paso recomendado: endurecer `ScriptoriumVps/scripts/` y `README` para `VPS-08`, validar localmente y preparar checklist de operación real.
