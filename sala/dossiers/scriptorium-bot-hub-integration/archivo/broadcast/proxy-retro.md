# Proxy RETRO - indice DRY del broadcast

> Archivo canonico de apoyo para lectores humanos de RETRO.
> No se transmite por `/rb_aleph` ni por `/rb_alephs`.
> Sirve como mapa de contexto, caso de uso y enlaces tecnicos para que RETRO
> o su bot puedan conectar la sesion IACM sin reabrir arqueologia.

## Regla DRY

- `BotHubSDK/examples/dashboard/userdata/broadcast.md` = mensaje vivo y corto para chat.
- `BotHubSDK/examples/dashboard/userdata/summary.md` = sintesis historica transmisible por `/rb_alephs`.
- `sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/proxy-retro.md` = mapa humano de contexto, caso de uso y enlaces complementarios.

## Lectura correcta de esta pieza

- Esta pieza no pide decidir ahora entre `mock crypto`, `firma real` o `sala de staging`.
- Esa envolvente federada queda fuera de foco en esta pasada: se pausa como next step y se asume segun protocolo.
- Lo que se quiere abrir ya es una sesion IACM via canal Horse para trabajo de sala entre Scriptorium y RETRO.
- La pregunta actual no es "por que puerta entra la federacion", sino "como se inicializa la sala, que mensajes circulan y donde queda cada artefacto".

## Anclas de continuidad con el hilo previo

- Sala compartida inaugurada para explorar colaboracion real entre bots y personas.
- Restriccion de Telegram para bots en DM frente al experimento de coordinacion en grupo.
- Devolucion de RETRO ya recibida en la conversacion: `ADR-488`, `CLC Federation Guide` y borradores de constitucion cyborg.
- Broadcast del 08-abr: IACM listo para merge y dudas abiertas sobre visibilidad bot-a-bot.
	https://github.com/escrivivir-co/heteronimos-semi-asistidos-sdk/blob/integration/beta/scriptorium/examples/dashboard/userdata/history/broadcast-2026-04-08T19-00-00-000Z.md
- Broadcast del 10-abr: Rabbit, Spider y Horse ya presentados como runtime unico con secuencia `INVITE -> ACCEPT -> ANNOUNCE -> PKG`.
	https://github.com/escrivivir-co/heteronimos-semi-asistidos-sdk/blob/integration/beta/scriptorium/examples/dashboard/userdata/history/broadcast-2026-04-10T22-34-12-693Z.md

## Extension futura ya abierta y relevante para RETRO

- El grafo que se quiere discutir con RETRO depende upstream de las piezas de `lore-db`.
- Ese upstream hoy puede seguir leyendose en modo texto/markdown por compatibilidad, pero ya se ha abierto un track especifico para evolucionarlo a **acceso vector enhanced**.
- La extension pendiente no sustituye el modo texto: anade una pasarela MCP para recuperar piezas, `LORE_F` y contexto relacionado con mejores capacidades de busqueda y filtrado.
- Para RETRO esto importa porque la sesion sobre `grafo-sdk` no va a vivir sobre un store aislado: el supuesto de trabajo es que el contenido factual tendra una puerta futura via **MCP server** en Scriptorium, con datos y skill local en `DocumentMachineSDK`.
- Dossier de referencia para esa extension futura: `sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md`.
- Espejo local del subequipo documental: `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md`.

## Caso de uso operativo propuesto

- Aleph entra con `/sala-aleph activar`, carga el dossier y deja la sesion inicializada en disco.
- En Scriptorium se activa BotHubSDK y entra `Scriptorium.Rabbit` con `/sala-entrar`.
- En el lado Retro entran RETRO y/o su bot con su propio `/sala-entrar`.
- La sesion se ordena en dos rondas de presentacion y preguntas: primero BotHubSDK, despues `DocumentMachineSDK`.
- Tras esas dos rondas, Rabbit emite un IACM `REQUEST` pidiendo un informe sobre como RETRO intervendria el grafo conforme al estandar.
- RETRO devuelve `ACKNOWLEDGE`, se abre una ronda de `QUESTION -> ANSWER` para refinement y el cierre puede dejar un `REPORT` en la misma sesion o diferido.
- Si RETRO necesita mas contexto, puede devolver una peticion reciproca en vez de forzar una conclusion prematura.
- Cuando se explique el acceso a piezas durante esa sesion, la lectura correcta es dual: **texto compatible hoy**, **vector enhanced via MCP como extension pendiente ya planificada**.

## Protocolos IACM que se quieren fijar

- Conversacion viva: `QUESTION -> ANSWER` para presentacion, aclaraciones, refinement y decisiones puntuales.
- Solicitud de informe: `REQUEST -> ACKNOWLEDGE -> REPORT` para pedir una devolucion estructurada sobre `grafo-sdk` / `DocumentMachineSDK`.
- El `REPORT` es el entregable de protocolo. Si luego conviene, ese `REPORT` se puede editar como white paper, pero esa edicion no es la premisa de entrada ni el bloqueo actual.
- La devolucion de RETRO sobre el grafo debe asumir que el acceso futuro a piezas no sera solo path-a-fichero: habra una pasarela MCP para contenido lore con modo vector enhanced y fallback texto.

## Contrato de persistencia y carpetas

- `sala/dossiers/scriptorium-bot-hub-integration/` = dossier canonico de la sesion, contexto compartido y decisiones.
- `sala/agente-{alias}/` = trabajo versionado de cada agente en sala: `estado.md`, candidatos y `ENTREGA_*`.
- `DocumentMachineSDK/sala/archivo/sprint-v3/dossiers/` = ancla historica del protocolo de sala/dossier que esta sesion quiere heredar.
- `DocumentMachineSDK/tmp/` = logs, patches y artefactos efimeros de ejecucion local; sirve como soporte tecnico, no como fuente de verdad de la sesion.
- Si RETRO o su bot producen una devolucion operativa reutilizable, esa pieza debe vivir en dossier o en carpeta de agente, no solo en `tmp/`.

## Punto de entrada rapido

- Vision global de DocumentMachineSDK: https://escrivivir-co.github.io/para-la-voz-sdk/engine/
- Landing publica del SDK: https://escrivivir-co.github.io/para-la-voz-sdk/
- Mensaje vivo: https://github.com/escrivivir-co/heteronimos-semi-asistidos-sdk/blob/integration/beta/scriptorium/examples/dashboard/userdata/broadcast.md
- Historico vivo: https://github.com/escrivivir-co/heteronimos-semi-asistidos-sdk/tree/integration/beta/scriptorium/examples/dashboard/userdata/history
- Dossier canonico: https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration
- Archivo de soporte: https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast

## Si d1d4c quiere contrastar el caso de uso antes de responder

- Lectura operativa verbatim esperada: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/retro-lectura-operativa-verbatim.md
- Plantilla de respuesta humana d1d4c: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/retro-respuesta-d1d4c-borrador.md
- Plantilla de parse y respuesta Squawk_RetroBot: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/retro-respuesta-squawk-borrador.md
- Snapshot DRY del doble grafo y su ciclo: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/retro-snapshot-ciclo-grafo.md
- Marco IACM base: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/marco-simulacion-iacm.md
- Guion IACM base: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/guion-iacm.md
- Estas piezas no fijan el next step de federacion; sirven para alinear la sesion que se quiere abrir ya y la forma del primer `REQUEST -> ACKNOWLEDGE -> REPORT`.

## Si vienes desde un bot y necesitas conectar la sesion

- Snapshot rapido del foco de trabajo: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/archivo/broadcast/retro-snapshot-ciclo-grafo.md
- Vision global del proceso completo: https://escrivivir-co.github.io/para-la-voz-sdk/engine/
- Landing publica del SDK hoy visible desde `mod/restitutiva`: https://escrivivir-co.github.io/para-la-voz-sdk/
- Plan de la extension pendiente `lore-db` vector enhanced: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md
- Sala base y handshake: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/sala/README.md
- Activacion de Aleph y cierre atomico: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/sala/archivo/sprint-v3/activacion-orquestador.md
- Dossier como subcomponente de sala: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/sala/archivo/sprint-v3/dossiers/dossier-feature-sdk/PLAN.md
- Dossier `grafo-sdk`: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/sala/dossiers/grafo-sdk/PLAN.md
- Dossier espejo local de la extension pendiente: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md
- Dossier `future-machine-sdk`: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/sala/dossiers/future-machine-sdk/PLAN.md
- Logs y uso de `tmp/`: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/DocumentMachineSDK/sala/dossiers/engine-plan-sdk/PLAN.md
- Tipos IACM v1.0: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/BotHubSDK/src/core/iacm/iacm-types.ts
- Builders y formato de chat IACM: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/BotHubSDK/src/core/iacm/iacm-templates.ts
- Welcome portable para externos: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-bot-hub-integration/WELCOME-EXTERNOS.md

## Extension 2026-05-09 - Pub.Rooms federado (TASK-10) abierto a peers de RETRO

Esta extension del proxy continua la pieza original sin cerrarla. La sesion IACM sobre `grafo-sdk` sigue siendo el foco; aqui se anade un canal de federacion real ya operativo que los peers de RETRO conectados a `bot-spider` pueden usar para entrar a la sala con su propio Node-RED.

- Endpoint vivo: https://rooms.scriptorium.escrivivir.co
- Health publico: https://rooms.scriptorium.escrivivir.co/healthz (devuelve `200 scriptorium rooms edge ok`).
- Auth: shared-secret por room (token entregado fuera de banda por el owner).
- Transport: Socket.IO sobre `wss://rooms.scriptorium.escrivivir.co/runtime`.
- No requiere abrir puertos en el lado peer; solo egreso HTTPS/WSS 443.

### Que cambia respecto a la pieza original

- La conexion real `bot-rabbit -> bot-spider -> bot-horse` que estaba pausada en modo simulacion ya no es la unica forma de federar. Para perfiles tecnicos con Node-RED, ahora hay un rail directo Node-RED <-> Pub.Rooms autenticado.
- `bot-horse` sigue siendo el canal IACM hacia Telegram. Pub.Rooms es complementario: federacion Node-RED <-> Node-RED para los peers que quieran trabajar mas cerca del codigo.
- La sesion sobre `grafo-sdk` no se mueve: sigue abriendose en sala con dossier cargado y rondas IACM. Esta extension ofrece a quien le encaje un canal federado adicional para acompanar el trabajo.

### Activos publicos canonicos de TASK-10

- Release notes: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/RELEASE_NOTES_TASK-10.md
- Tarea TASK-10: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/TASK-10_PUB_ROOMS_FEDERATED.md
- LAST_UPDATE del dossier VPS: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/LAST_UPDATE.md
- Onboarding amigo con Node-RED ya operativo: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/SUBTASKS/NOTA-AMIGO-PEER-NODE-RED.md
- Onboarding amigo desde cero: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/SUBTASKS/NOTA-AMIGO-DESDE-CERO.md
- Manualito owner DRY (referencia operativa, no para peer): https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/SUBTASKS/NOTA-OWNER-RECORDATORIO.md
- Bootstrap script publico: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ScriptoriumVps/scripts/bootstrap-mesh-client.sh
- Flow template publico: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/ScriptoriumVps/node-red-projects/pub-room-client.flow.json
- Verdaccio publico (lectura): https://npm.scriptorium.escrivivir.co
  - `@alephscript/mcp-core-sdk@1.4.0`
  - `node-red-dashboard-2-alephscript-rooms@0.2.0`
  - `node-red-contrib-alephscript-core@0.2.0`

### Politica DRY de continuidad

Este proxy es la unica fuente que el broadcast remoto referencia. Los mensajes de chat no fijan estado; fijan el enlace a este proxy. Si la situacion evoluciona (versiones, endpoints, decisiones), se actualiza esta seccion y el broadcast queda valido sin reedicion. El que llegue tarde a la conversacion lee este proxy y obtiene la foto fresca.

Regla operativa para futuras ediciones de esta extension:

- el broadcast remoto referencia siempre la URL canonica de este proxy en la rama `integration/beta/scriptorium`;
- los activos versionables (release notes, TASK-10, notas onboarding) viven en sus paths del dossier; el proxy enlaza, no duplica;
- si una nota onboarding cambia, no hay que reenviar nada: el peer abre el enlace y obtiene la version vigente;
- si TASK-10 abre una version posterior (TASK-11, TASK-12, ...), esta seccion crece con un sub-bloque, no se reemplaza.

### Como entra un peer de RETRO al Pub.Rooms

Asumiendo que el peer ya esta conectado al canal de `bot-spider` y recibe el broadcast:

1. Solicita token al owner por canal seguro (Signal, mensaje cifrado, nota efimera).
2. Owner genera un token unico para ese peer y le asigna un room (`ROOMS_LAB_<alias>`).
3. Peer abre la nota onboarding que le corresponda segun perfil:
   - tiene Node-RED ya operativo: `NOTA-AMIGO-PEER-NODE-RED.md`;
   - parte sin Node-RED: `NOTA-AMIGO-DESDE-CERO.md`.
4. Ejecuta el bootstrap del script publico, importa el flow snippet, deploy.
5. Verifica `connected` en su nodo `alephscript-core-client`. Si ve `auth: unauthorized` revisa con el owner.

No hay capa cripto adicional, no hay JWT, no hay DID en este MVP. Identidad OASIS via JWT/DID esta tracked como `SPIKE-10` y no bloquea: https://github.com/escrivivir-co/aleph-scriptorium/blob/integration/beta/scriptorium/sala/dossiers/scriptorium-vps/tasks/SUBTASKS/SPIKE-10-OASIS-IDENTITY.md

### Lo que esperamos de los peers de RETRO

- Si encaja en el perfil tecnico, conectar al Pub.Rooms con su Node-RED y dejar evidencia del primer handshake federado externo end-to-end (ultimo item pendiente del MVP).
- Si no encaja, no pasa nada: la sesion IACM sobre `grafo-sdk` sigue abierta en sala via canal Horse simulado segun el guion ya fijado en este proxy.
- El primer `REQUEST -> ACKNOWLEDGE -> REPORT` sobre el hipergrafo no depende de Pub.Rooms; es trabajo de sala.

## Lo que esperamos de RETRO

- Validar o corregir este caso de uso de sesion, no reabrir la decision `mock crypto` / `firma real` / `staging`.
- Aceptar o corregir la forma del primer `REQUEST` sobre `grafo-sdk` y `grafo-legalista-sdk`.
- Tener en cuenta que el grafo depende de piezas `lore-db` y que ese acceso upstream evolucionara a una pasarela MCP vector enhanced, manteniendo modo texto por compatibilidad.
- Indicar si el `REPORT` debe salir al cierre de la sesion o en una iteracion posterior.
- Si hace falta, devolver una peticion reciproca de informacion a Scriptorium para completar el refinement.