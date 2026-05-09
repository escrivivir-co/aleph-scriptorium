# TASK-08 — Runbook y verificación end-to-end

> **Estado:** en-curso
> **Agente recomendado:** `vps-ops`  
> **Dependencias:** VPS-03, VPS-04, VPS-05, VPS-06, VPS-07  
> **Entrega esperada:** runbook deploy/verify para todo el lote

## Lee primero

1. Todas las tasks `VPS-01` a `VPS-07`
2. `ScriptoriumVps/README-SCRIPTORIUM.md` si ya existe
3. `sala/dossiers/scriptorium-vps/BACKLOG.md`

## Objetivo

Cerrar el lote con un runbook reproducible y pruebas de vida para los cuatro hosts públicos, los contenedores y los volúmenes.

## Cambios requeridos

- Crear `scripts/deploy.sh`.
- Crear `scripts/verify.sh`.
- Crear sección de **ventana controlada** antes de cualquier mutación real del VPS.
- Crear checks parciales:
  - `verify-dns.sh`
  - `verify-caddy.sh`
  - `verify-nodered.sh`
  - `verify-mcp-devops.sh`
  - `verify-verdaccio.sh`
  - `verify-volumes.sh`
- Documentar recuperación básica:
  - restart stack
  - revisar logs
  - rotar tokens
  - validar permisos SFTP
- Documentar preflight obligatorio antes de operar en vivo:
  - objetivo de la ventana
  - comandos exactos
  - rutas/servicios afectados
  - rollback
  - backup/snapshot esperado
  - variables/llaves usadas desde entorno local no versionado
  - criterio de éxito y condición de abortar

## Informe operativo

### Evidencia DNS actual — 2026-05-09

El PO creó los registros A reales y Aleph verificó resolución local:

| Host | Tipo | Valor verificado |
|---|---|---|
| `scriptorium.escrivivir.co` | A | `92.243.24.163` |
| `admin.scriptorium.escrivivir.co` | A | `92.243.24.163` |
| `mcp.scriptorium.escrivivir.co` | A | `92.243.24.163` |
| `npm.scriptorium.escrivivir.co` | A | `92.243.24.163` |

Nota: esto levanta el bloqueo DNS, pero no autoriza por sí solo SSH/Docker/Caddy real. Cualquier mutación del VPS sigue requiriendo ventana controlada.

### Criterios “estamos vivos”

| Bloque | Prueba | Resultado esperado |
|---|---|---|
| DNS | `dig +short <host>` | IP del VPS. |
| Caddy | `curl -I https://<host>` | 200/30x/401 controlado según servicio. |
| Node-RED público editor | abrir `https://scriptorium.escrivivir.co/red` | Editor/flujos visibles en read-only; editar/deployar devuelve denegado o no muestra controles de escritura. |
| Node-RED público dashboards | abrir `https://scriptorium.escrivivir.co/ui` y `/dashboard` | Dashboards visibles. |
| Node-RED admin | abrir `https://admin.scriptorium.escrivivir.co/red` | Login/adminAuth requerido; admin puede editar/deployar. |
| MCP DevOps | `mcp-inspector-sdk` con Bearer | Tools/resources/prompts listados. |
| Verdaccio | `npm ping --registry ...` | Respuesta OK/auth controlada. |
| Volúmenes | crear/leer fichero de prueba controlado | UID:GID `1000:1000`. |

## Salida mínima esperada

1. Candidato runbook en carpeta del agente.
2. `ENTREGA_VPS-08.md` con:
   - Evidencias de verificación.
   - Estado final por host.
   - Pendientes no bloqueantes.
  - Checklist de ventana controlada para operaciones reales.

## Criterio de aceptación

- `scripts/verify.sh` ejecuta todas las verificaciones posibles.
- El README del submódulo explica deploy y rollback mínimo.
- El runbook separa claramente verificaciones de solo lectura de operaciones mutantes.
- Ninguna mutación remota queda documentada como automática: todas requieren aprobación PO en ventana controlada.
- Hay evidencia de validación con `mcp-inspector-sdk`.
- El dossier puede cerrarse sin decisiones PO pendientes.
