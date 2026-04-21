# Marco transversal - simulacion federada IACM

> Archivo canonico de soporte para el broadcast final.
> Absorbe: `sala/agente-gepe/nota-marco-simulacion-iacm.md`.

## 1. Decision editorial

- Se sustituye la conexion real `bot-rabbit -> bot-spider -> bot-horse` por una
  simulacion: el canal IACM se declara abierto y `bot-horse` queda disponible
  como mock para una sesion de asesoria scrum de Retro hacia Scriptorium
  centrada en `grafo-sdk`.
- La simulacion permite ejercitar el protocolo federado sin desplegar todavia
  la malla MCP completa y deja una pieza acotada y entendible sobre la que
  Retro puede devolver un siguiente paso formal.

## 2. Slots de injerto DRY

El broadcast no duplica los hechos de BOT y DOC: los referencia.

- `[BOT_FACT]` -> ver `bot-fact-bothubsdk.md`.
- `[DOC_FACT]` -> ver `doc-fact-documentmachinesdk.md`.

## 3. Protocolo IACM minimo que se simula

Dos microconversaciones que el broadcast describe como ya disponibles:

- `QUESTION -> ANSWER`: Scriptorium pregunta a Retro que forma minima deberia
  tener el schema generico de grafo del SDK; Retro responde con su
  recomendacion.
- `REQUEST -> ACKNOWLEDGE -> REPORT`: Scriptorium solicita una sesion de
  asesoria scrum sobre `grafo-sdk`; Retro acusa recibo; al final de la sesion
  Retro emite un `REPORT`.

## 4. Que se cierra y que se difiere

- Cierra ahora: marco editorial, candidato de broadcast y merge final del
  mensaje vivo en BotHubSDK.
- Se difiere al next-step Retro: smoke real adicional del dashboard, ejecucion
  de la malla MCP completa y white paper de respuesta.