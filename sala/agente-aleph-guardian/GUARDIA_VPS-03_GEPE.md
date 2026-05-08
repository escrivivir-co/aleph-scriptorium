# Guardia VPS-03 — Gepe

> **Fecha:** 2026-05-08  
> **Modelo:** GitHub Copilot  
> **Rol:** Aleph especial de no-regresión  
> **Alcance:** proteger `BlockchainComPort/OASIS_PUB` y `BlockchainComPort/GANDI_DEVOPS_FOLDER`

## Veredicto

**CHECK CONDICIONADO, con decisión de arquitectura ya fijada.**  
No bloqueo que Gepe tome `VPS-03` si el trabajo se limita a candidatos en `sala/agente-gepe/` y documentación de verificación. La opción elegida es integración respetuosa en el Caddy existente de `BlockchainComPort/OASIS_PUB`.

**BLOCK inmediato** para cualquier acción que toque el VPS real, DNS real, Gandi, SSH/SCP, Docker remoto o despliegue vivo sin autorización expresa del PO.

## Motivos del check

- El tablero ya marca `VPS-03` como `en-curso:gepe` y `sala/agente-gepe/estado.md` coincide con esa aprobación.
- La aprobación escrita por Aleph contiene la salvaguarda correcta: Gepe no debe operar todavía DNS real, Docker ni el VPS vivo sin nuevo aviso del PO.
- `VPS-03` desbloquea `VPS-04`, `VPS-05` y `VPS-06`, por lo que tiene sentido operativo abrir el carril si se mantiene como diseño/candidato.

## Riesgos detectados

### 1. Caddy/puertos públicos

`BlockchainComPort/OASIS_PUB/docker-compose.pub.yml` ya define `pub-web` con Caddy exponiendo `80:80` y `443:443` para `pub.escrivivir.co`.

`ScriptoriumVps/PATTERN-DOCKER/docker-compose.yml` también define un servicio `caddy` exponiendo `80:80` y `443:443`.

Si ambos viven en el mismo VPS, dos Caddy no pueden reclamar simultáneamente los mismos puertos. La decisión PO fija la convivencia así:

1. descartado Caddy edge nuevo/unificado por ser más traumático;
2. elegido Caddy existente de `OASIS_PUB` como edge productivo;
3. descartado VPS/host separado para este MVP.

La decisión técnica complementaria es usar la red Compose existente de `OASIS_PUB` para que `pub-web` alcance aliases internos `scriptorium-nodered`, `scriptorium-mcp-devops` y `scriptorium-verdaccio`. Desde `ScriptoriumVps`, el nombre externo esperado es `oasis-pub-scriptorium_oasis_pub_net`.

Hasta validar el candidato con el PO, **no se debe desplegar** el compose de `ScriptoriumVps` ni editar el Caddy real del VPS.

### 2. DNS de `escrivivir.co`

`OASIS_PUB/README.md` fija la política previa: mantener `escrivivir.co`, WordPress.com y Bluesky intactos; añadir subdominios de forma aditiva.

Para `VPS-03`, DNS permitido como diseño:

- añadir/validar `scriptorium.escrivivir.co`;
- añadir/validar `admin.scriptorium.escrivivir.co`;
- añadir/validar `mcp.scriptorium.escrivivir.co`;
- añadir/validar `npm.scriptorium.escrivivir.co`.

DNS prohibido sin decisión PO explícita:

- tocar `escrivivir.co` raíz;
- tocar `pub.escrivivir.co`;
- tocar registros de Bluesky (`_atproto`, DID/TXT equivalentes);
- borrar o reemplazar registros existentes.

### 3. Carpeta Gandi y secretos

`BlockchainComPort/GANDI_DEVOPS_FOLDER/README.md` define esa carpeta como espacio seguro/deny-by-default para claves SSH, snapshots, inventarios y secretos operativos.

`VPS-03` no debe copiar claves ni rutas privadas a `ScriptoriumVps`, al dossier ni a entregas. Sólo placeholders y variables configurables.

### 4. Datos persistentes

`OASIS_PUB` usa layout `/opt/oasis-scriptorium/OASIS_PUB` y estado bajo `/srv/oasis/oasis-pub/*`.

`ScriptoriumVps` propone `/srv/scriptorium/*`. Esa separación es buena, pero debe mantenerse. No mezclar ni reutilizar volúmenes de `OASIS_PUB` para Node-RED/MCP/Verdaccio.

## Condiciones para Gepe en VPS-03

Gepe puede continuar si su entrega incluye:

1. `Caddyfile` candidato, no aplicado.
2. DNS esperado como tabla/documentación, no cambios reales.
3. Verificación propuesta (`dig`/`curl`) separando lectura de mutación.
4. Inventario de puertos donde sólo Caddy expone `80/443` dentro del diseño ScriptoriumVps.
5. Sección explícita **Compatibilidad con OASIS_PUB / GANDI** que responda:
   - comparte VPS con `pub.escrivivir.co` para el MVP;
   - el Caddy edge único es `pub-web` de `OASIS_PUB`;
   - la colisión `80/443` se evita no desplegando segundo Caddy en producción compartida;
   - la conexión interna usa la red de `OASIS_PUB` (`oasis_pub_net`; externa como `oasis-pub-scriptorium_oasis_pub_net`) y aliases `scriptorium-*`;
   - ¿qué registros DNS NO se tocan?
   - ¿qué comandos reales quedan bloqueados hasta aprobación PO?
6. Cero secretos reales y cero rutas personales hardcodeadas.
7. Cero escritura fuera de `sala/agente-gepe/`.

## Inconsistencias de sala

- `sala/tablero.md` marca `VPS-03` como `en-curso:gepe`.
- `sala/dossiers/scriptorium-vps/BACKLOG.md` y `TASK-03_DNS_Y_CADDY.md` fueron refactorizados para reflejar `VPS-03` en curso con Gepe y la decisión Caddy/OASIS_PUB.

No queda bloqueo por desincronización del dossier para `VPS-03`; el Aleph orquestador real aún conserva autoridad sobre el tablero y cierres.

## Decisión final

**Check para diseño/candidato. Block para operación real.**  
La frase operativa es:

> Gepe puede preparar `VPS-03` como integración en el Caddy existente de `OASIS_PUB`, pero no puede tocar DNS/Gandi/VPS/Docker vivo; además debe tratar `OASIS_PUB` como infraestructura ya existente y no como terreno baldío.
