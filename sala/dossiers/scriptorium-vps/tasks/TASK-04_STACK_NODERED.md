# TASK-04 — Stack Node-RED (contenedor único)

> **Estado:** cerrada
> **Agente recomendado:** `nodered-curator`
> **Dependencias:** VPS-01, VPS-03
> **Entrega esperada:** stack Docker Node-RED con Dashboard clásico + Dashboard 2 y projects monorepo

> **⚠️ Refactor aplicado** (2026-05-08): diseño anterior usaba dos contenedores separados para público/admin. Se unifica en un solo `nodered`; el público ve `/red` en read-only y la escritura la controla `adminAuth`.

## Lee primero

1. `WiringEditor/README-SCRIPTORIUM.md`
2. `WiringEditor/packages/`
3. `sala/dossiers/scriptorium-vps/RESPUESTAS.md`
4. Documentación oficial Node-RED Projects y Dashboard cuando sea necesario

## Objetivo

Provisionar una única instancia Node-RED que sirva editor/flujos públicos en modo read-only (`/red`) y dashboards públicos (`/ui`, `/dashboard`), reservando edición/deploy al admin autenticado mediante `adminAuth` en `settings.js`. Debe inicializar Dashboard clásico y Dashboard 2 por defecto.

## Cambios requeridos

- Crear Dockerfile Node-RED en `ScriptoriumVps/PATTERN-DOCKER/nodered/`.
- Crear **un único** `settings.js` con env-vars que soporte:
  - `adminAuth.users` con admin bcrypt y `permissions: "*"`.
  - Usuario opcional `viewer` con `permissions: "read"`.
  - `adminAuth.default = { permissions: "read" }` para público anónimo read-only.
  - `httpAdminRoot=/red` para servir el editor pedagógico.
  - `projects.enabled=true` y `projectsDir=/data/projects`.
  - `credentialSecret` vía env/secret, nunca hardcodeado.
- Activar ambos dashboards:
  - Dashboard clásico: `/ui`
  - Dashboard 2: `/dashboard`
- Montar `node-red-projects/` desde el monorepo con acceso read-write (la restricción de escritura la aplica `adminAuth`, no el filesystem).
- No hardcodear ni precargar `node-red-contrib-alephscript-escribiente` de forma especial.
- Preparar instalación de contribs según manifiesto monorepo, igual para todos.

## Informe operativo

### Containers

| Container | Upstream Caddy | Roles | Volumen projects | Notas |
|---|---|---|---|---|
| `nodered` | `scriptorium.escrivivir.co` (público) y `admin.scriptorium.escrivivir.co` (admin) | Editor público read-only + dashboards + admin autenticado con escritura | read-write | Host público permite `/red`; Node-RED lo sirve en read-only por `adminAuth.default`. Host admin puede añadir `basic_auth` extra y usa admin `permissions: "*"`. |

> **Nota de implementación**: Caddy en `scriptorium.escrivivir.co` debe proxear `/red`, `/ui`, `/dashboard` y recursos necesarios al mismo upstream `nodered:1880` sin Basic Auth global. Caddy puede añadir TLS, headers y rate limiting; la autorización de lectura/escritura la aplica Node-RED con `adminAuth.default = { permissions: "read" }`. El virtual host `admin.scriptorium.escrivivir.co` puede añadir `basic_auth` como capa extra y permite login admin con `permissions: "*"`.

### Contribs

Crear un mecanismo tipo:

```text
node-red-contribs.json
{
  "packages": [
    "@flowfuse/node-red-dashboard",
    "node-red-dashboard"
  ],
  "workspacePackages": []
}
```

Los paquetes del monorepo WiringEditor se agregan por manifiesto/índice, no por caso especial de `escribiente`.

## Salida mínima esperada

1. Candidatos de Dockerfile, settings y compose parcial.
2. `ENTREGA_VPS-04.md` con:
   - Rutas configuradas (`/ui`, `/dashboard`, `/red` o equivalente).
   - Estrategia read-only pública.
   - Lista de contribs iniciales y origen.

## Criterio de aceptación

- `nodered` (contenedor único) arranca con projects habilitados y `adminAuth` configurado.
- `scriptorium.escrivivir.co/red` muestra el editor/flujos en modo read-only para público anónimo.
- El público anónimo no puede editar, desplegar ni modificar credentials/projects.
- `admin.scriptorium.escrivivir.co` permite al usuario admin autenticado acceder al editor y gestionar projects.
- `/ui` y `/dashboard` quedan preparados por defecto.
- La instalación de contribs no privilegia `node-red-contrib-alephscript-escribiente`; lo trata como paquete del monorepo cuando corresponda.
- Ningún servicio interno publica el puerto `1880` directamente al exterior.
