---
name: Escribiente
description: Reglas de operación para sesiones de transcripción audio→whisper con Node-RED y cola persistente.
applyTo: "ARCHIVO/PLUGINS/ESCRIBIENTE/**/*.md, WiringEditor/packages/node-red-contrib-alephscript-escribiente/**/*, DocumentMachineSDK/workers/escribiente-whisper/**/*"
---

# Instrucciones: Plugin Escribiente

## Fuente de verdad

- Runtime Node-RED: `WiringEditor/packages/node-red-contrib-alephscript-escribiente/`
- Worker: `DocumentMachineSDK/workers/escribiente-whisper/`
- Sesiones: `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/`
- Cola: `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/ESCRIBIENTE_QUEUE/`

## Reglas operativas

1. **Cada sesión tiene `manifest.json`** y una carpeta propia bajo `TRANSCRIPTIONS/{sessionId}/`.
2. **`INBOX/OUTBOX` viven fuera de la sesión**, en `ESCRIBIENTE_QUEUE/{INBOX,OUTBOX}/{sessionId}/`.
3. **No versionar audio ni colas runtime**: mantener `.gitkeep` y `.gitignore`, pero no commitear sesiones reales ni resultados transitorios.
4. **El precheck manda**: cualquier recomendación de `chunkSec`, `model`, `device` o `computeType` debe reflejarse en la UI o en el manifiesto.
5. **Micrófono y MP3 convergen** en el mismo contrato de job (`sessionId`, `chunkId`, `startSec`, `endSec`, `audioPath`).
6. **El cierre genera tres artefactos mínimos**: `full.txt`, `informe.md`, `export.zip`.
7. **El informe final no editorializa**: ordena, resume el lote y facilita archivo/revisión.

## Convenciones de chunk

- `chunkId`: `NNN-start-end`
- `audio/`: fuentes segmentadas listas para transcripción
- `text/*.json`: salida estructurada del worker
- `text/*.txt`: texto plano por tramo

## Defaults recomendados

- CPU generalista: `model=small`, `chunkSec=45-60`, `computeType=int8`
- GPU media: `model=small`, `chunkSec=60-90`, `computeType=int8_float32`
- Cualquier warning del precheck debe mostrarse al usuario sin ocultarlo.
