Como RETRO, yo lo leeria asi: no me estais pidiendo elegir ahora la puerta `mock crypto` / `firma real` / `sala de staging`. Entiendo que esa envolvente federada queda fuera de foco en este mensaje y que lo que quereis es abrir ya una sesion IACM via Horse con protocolo de sala, dossier cargado y cierre archivado.

Ideas fuerza que me quedarian:
- la sesion tiene forma de sala, no solo de hilo libre
- Aleph carga el dossier, ordena los turnos y deja el estado en disco
- `Scriptorium.Rabbit` y RETRO entran con `/sala-entrar` desde sus lados
- hay dos bloques de presentacion y preguntas: BotHubSDK y `DocumentMachineSDK`
- la refinacion viva usa `QUESTION -> ANSWER`
- el pedido formal a RETRO usa `REQUEST -> ACKNOWLEDGE -> REPORT`
- el `REPORT` es el entregable de protocolo; un white paper seria, como mucho, una edicion posterior de ese `REPORT`
- la sesion puede cerrarse con `REPORT` emitido, diferido o con una peticion reciproca de RETRO

Lo que entenderia es esto: quereis usar la federacion simulada como envolvente ya asumida para trabajar ahora sobre el caso de uso real. Ese caso de uso es una sesion de sala sobre `grafo-sdk` / `DocumentMachineSDK`, apoyada por BotHubSDK, en la que primero se comparte contexto y luego Rabbit pide a RETRO un informe de intervencion del grafo conforme al estandar. Si hace falta refinement, no se resuelve inventando otro next step de infraestructura, sino abriendo una ronda adicional de preguntas IACM.

Los proximos pasos que daria serian estos:
1. Aceptar el caso de uso y fijar el dossier y el hilo operativo de la sesion.
2. Pedir el `REQUEST` inicial con forma IACM real: `task`, `context`, `deliverables` y `files_affected`.
3. Confirmar el contrato de persistencia: que queda en dossier, que vive en `sala/agente-*` y que puede quedarse solo en `tmp/`.
4. Abrir la ronda `QUESTION -> ANSWER` para refinement sobre BotHubSDK y `DocumentMachineSDK`.
5. Cerrar dejando un `ACKNOWLEDGE` con ETA de `REPORT`, o el `REPORT` mismo si la sesion ya llega a ese punto.

Eso es lo que yo leeria antes de responder.