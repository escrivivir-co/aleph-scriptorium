# Mini guion IACM - simulacion pre-handshake

> Archivo canonico de soporte para el broadcast final.
> Absorbe: `sala/agente-gepe/guion-iacm.md`.

## Conversacion 1 - `QUESTION -> ANSWER`

```text
[QUESTION] (Scriptorium -> Retro, via bot-horse simulado)
  contexto: integracion SDK
  pregunta: que forma minima deberia tener el schema generico de grafo
  para que sea reutilizable por DocumentMachineSDK (mod/legislativa hoy,
  mod/restitutiva manana) y por BotHubSDK como soporte de hilos?

[ANSWER] (Retro -> Scriptorium, mock pre-white-paper)
  recomendacion: empezar por nodos {id, tipo, payload} y arcos {origen,
  destino, etiqueta, peso} con extensiones por mod; alinear con la
  gramatica JSON v1.0 ya operativa en mod/legislativa.
```

## Conversacion 2 - `REQUEST -> ACKNOWLEDGE -> REPORT`

```text
[REQUEST] (Scriptorium -> Retro)
  objeto: sesion de asesoria scrum
  alcance: grafo-sdk de DocumentMachineSDK
  forma: dossier compartido + skill `dossier-feature` + protocolo de sala

[ACKNOWLEDGE] (Retro -> Scriptorium, via Squawk_RetroBot)
  estado: recibido, asignado a su lado
  ventana: a definir

[REPORT] (Retro -> Scriptorium, al cierre de la sesion)
  entregable previsto: WHITE PAPER RETRO GRAFO SDK for SCRIPTORIUM BOTHUBSDK
  contenido: como Retro maximizaria el grafo del DocumentMachineSDK.
```