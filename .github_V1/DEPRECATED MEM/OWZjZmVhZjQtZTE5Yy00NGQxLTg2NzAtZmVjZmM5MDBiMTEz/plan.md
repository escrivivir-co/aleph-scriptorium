## Plan: Unificar Node-RED VPS

> **Estado:** aprobado para ejecución el 2026-05-08
> **Modelo de planificación:** `GPT-5.4`


TL;DR: Sí es factible simplificar `sala/dossiers/scriptorium-vps` de dos contenedores Node-RED (`nodered-public` + `nodered-admin`) a un solo contenedor `nodered`, porque Node-RED soporta `adminAuth` con usuarios `permissions: "*"`, usuarios `permissions: "read"` y usuario anónimo `default: { permissions: "read" }`. Para el caso pedagógico, la arquitectura recomendada es exponer el editor en modo read-only al público y reservar escritura al usuario admin, manteniendo Caddy como único frontal público.

**Evaluación**
- Factible para MVP pedagógico: una sola instancia puede servir editor read-only, dashboards `/ui` y `/dashboard`, y admin con escritura.
- Adecuado porque el usuario quiere que el público vea los flujos, no solo los dashboards.
- Menos aislado que dos procesos: no hay separación runtime/volumen entre público y admin, pero Node-RED aplica permisos sobre Admin API y Caddy puede añadir TLS, headers y rate limiting.
- El repo `ScriptoriumVps` todavía no existe en el workspace, así que el cambio es barato: solo hay que actualizar el dossier antes de ejecutar tasks.

**Arquitectura recomendada**
1. Un servicio Docker interno `nodered` sin `ports:` publicados al host.
2. Caddy expone `80/443` y enruta:
   - `scriptorium.escrivivir.co` → `nodered:1880`, con editor read-only público + dashboards.
   - `admin.scriptorium.escrivivir.co` → `nodered:1880`, con capa extra opcional de Basic Auth para admin.
3. `settings.js` único con:
   - `httpAdminRoot` preferentemente `/red`.
   - `adminAuth.users` con admin `permissions: "*"`.
   - `adminAuth.default = { permissions: "read" }` para público anónimo read-only.
   - `editorTheme.projects.enabled = true`, workflow manual, `projectsDir`/userDir persistente.
   - `credentialSecret` vía env/secret, nunca hardcodeado.
4. Dashboards públicos:
   - Dashboard clásico `/ui`.
   - Dashboard 2 `/dashboard` si la configuración del contrib lo permite.
5. Volúmenes:
   - `node-red-projects/` RW para el proceso Node-RED.
   - Control de escritura por permisos Node-RED, no por FS por usuario HTTP.

**Files to update in dossier**
- `c:\Users\aleph\OASIS\aleph-scriptorium\sala\dossiers\scriptorium-vps\PLAN.md` — cambiar `nodered-public + nodered-admin` por `nodered` single-instance; actualizar DNS conceptual si procede.
- `c:\Users\aleph\OASIS\aleph-scriptorium\sala\dossiers\scriptorium-vps\BACKLOG.md` — cambiar brief de `VPS-04` y criterios de cierre relacionados con Node-RED.
- `c:\Users\aleph\OASIS\aleph-scriptorium\sala\dossiers\scriptorium-vps\RESPUESTAS.md` — añadir decisión PO: single Node-RED con público read-only de flujos y dashboards.
- `c:\Users\aleph\OASIS\aleph-scriptorium\sala\dossiers\scriptorium-vps\tasks\TASK-03_DNS_Y_CADDY.md` — ambos hosts Node-RED apuntan al mismo upstream `nodered:1880`; Caddy sigue como único frontal.
- `c:\Users\aleph\OASIS\aleph-scriptorium\ARCHIVO\DEVOPS\SESION_DENIS\MINI-PLAN.md` — recomendado sincronizarlo o marcarlo como antecedente histórico para que no siga describiendo `nodered-public`/`nodered-admin` como diseño vigente.

- `c:\Users\aleph\OASIS\aleph-scriptorium\sala\dossiers\scriptorium-vps\tasks\TASK-04_STACK_NODERED.md` — reescribir objetivo y cambios requeridos para una sola instancia, `settings.js` único y `adminAuth.default read`.
- `c:\Users\aleph\OASIS\aleph-scriptorium\sala\dossiers\scriptorium-vps\tasks\TASK-07_VOLUMENES_Y_SFTP.md` — aclarar que ya no hay mounts separados admin/public; el volumen de projects es RW para el proceso.
- `c:\Users\aleph\OASIS\aleph-scriptorium\sala\dossiers\scriptorium-vps\tasks\TASK-08_RUNBOOK_Y_VERIFICACION.md` — ajustar verificación a single container: público ve editor read-only y admin puede desplegar.

**Implementation steps**
1. Update dossier decision record in `RESPUESTAS.md` with the PO decision and operational effect.
2. Update `PLAN.md` sections 5.3/5.4/5.5 to say one Node-RED service, two hostnames, same upstream.
3. Update `TASK-03_DNS_Y_CADDY.md` host table and expected Caddy behavior.
4. Rewrite `TASK-04_STACK_NODERED.md` around a single Dockerfile, single `settings.js`, `adminAuth.default read`, and dashboards.
5. Update `BACKLOG.md` tracking label/acceptance for `VPS-04`.
6. Update `TASK-07` and `TASK-08` where they imply two containers or public/admin split by filesystem/process.
7. Validate with grep that `nodered-public` and `nodered-admin` remain only as historical context or not at all.

**Verification**
1. Dossier grep: no active requirement should say `nodered-public` or `nodered-admin` as runtime containers.
2. Caddy design: only Caddy exposes host ports; `nodered` is internal.
3. Node-RED settings design: includes admin `permissions: "*"` and `default.permissions = "read"`.
4. Public manual check after implementation: unauthenticated visitor can load `/red` read-only and dashboards, but cannot deploy/edit.
5. Admin manual check after implementation: admin login can edit/deploy projects.

**Decisions**
- Recommend switching to one container now.
- Keep both DNS names: public and admin hostnames remain useful, even with same upstream.
- Do not block editor on the public host, because the pedagogical requirement is that the public sees flows read-only.
- Do not rely on filesystem read-only mounts for public users in single-process mode; use Node-RED permissions.

**Risks**
- Public will see flow structure and endpoint paths by design.
- Public dashboard interactions can still trigger side effects if flows are built that way; flows need pedagogical hygiene/audit.
- Single process is weaker isolation than two containers, but acceptable for the stated educational goal if `adminAuth` is correct and secrets are not embedded in visible flows.


**Review 2026-05-08 — Errata post-aplicación**
- El agente sí aplicó la simplificación a un único contenedor `nodered`, pero confundió el requisito pedagógico: bloqueó `/red` en el host público y dejó el editor público como inaccesible, cuando debe estar visible en read-only.
- Amend obligatorio: `TASK-03`, `TASK-04` y `TASK-08` deben decir que `scriptorium.escrivivir.co` expone el editor/flujos en modo read-only, no que lo bloquea.
- Amend obligatorio: `settings.js` debe documentar `adminAuth.default = { permissions: "read" }` y/o usuario `viewer` con `permissions: "read"`; el admin mantiene `permissions: "*"`.
- Amend recomendado: `RESPUESTAS.md`, `PLAN.md` y `BACKLOG.md` deben registrar explícitamente la decisión PO de single-instance pedagógica: público ve flujos read-only + dashboards; solo admin escribe/deploya.
- Caddy debe actuar como TLS/frontal/hardening y puede añadir auth extra para `admin.scriptorium.escrivivir.co`, pero no debe ser el mecanismo que oculta `/red` al público.


**Review 2026-05-08 — Segunda pasada verificada**
- Dossier `sala/dossiers/scriptorium-vps` ya corrige el núcleo: `scriptorium.escrivivir.co/red` visible read-only, single `nodered`, escritura/deploy por `adminAuth` admin `*`, público/anónimo `read`.
- Grep en dossier sin restos de `nodered-public`, `nodered-admin`, `editor bloqueado`, `sin exponer el editor`, `respond @admin_paths`, `basicauth`, `{env.`.
- `MINI-PLAN.md` conserva menciones históricas a dos contenedores, pero línea 32 lo marca claramente como antecedente/hypótesis descartada; no tratar como contradicción operativa.
- Nota opcional: si se quiere read-only estricto por host, en implementación se podría bloquear métodos write/token en Caddy del host público, pero el contrato actual cumple el objetivo pedido usando `adminAuth`.
