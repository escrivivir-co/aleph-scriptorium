# Escribiente

Plugin operativo para sesiones de transcripción audio→texto dentro del Scriptorium.

## Piezas

- Pack Node-RED: `WiringEditor/packages/node-red-contrib-alephscript-escribiente/`
- Worker Whisper: `DocumentMachineSDK/workers/escribiente-whisper/`
- Sesiones: `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/`
- Cola: `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/ESCRIBIENTE_QUEUE/`

## Flujo mínimo

1. Ejecutar precheck.
2. Abrir sesión con slug y `chunkSec`.
3. Capturar desde mic o cargar MP3.
4. Enviar jobs al worker por `INBOX/`.
5. Recibir resultados por `OUTBOX/`.
6. Cerrar sesión y generar `full.txt`, `informe.md`, `export.zip`.

## Nota Bartleby

El cierre del plugin toma la disciplina Bartleby como regla documental: ordenar el material y dejar visible la arquitectura de la sesión sin añadir ruido interpretativo.
