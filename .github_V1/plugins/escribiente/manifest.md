---
id: escribiente
name: "Escribiente (Audio → Whisper)"
version: "0.1.0"
description: "Plugin para sesiones de transcripción audio→texto usando Node-RED + worker faster-whisper con cola persistente en disco."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=1.0.0"
dependencies: ["wire-editor"]
optional_dependencies: ["lore-sdk"]

submodule: "node-red-alephscript-sdk"
submodule_packages:
  - name: "node-red-contrib-alephscript-escribiente"
    description: "7 nodos custom para precheck, sesiones, chunking, watcher whisper y dashboard recorder"

agents:
  - name: "Escribiente"
    file: "agents/escribiente.agent.md"
    description: "Agente operativo del plugin. Diseña flows audio→whisper y documenta cierres con disciplina Bartleby."

instructions:
  - name: "escribiente"
    file: "instructions/escribiente.instructions.md"

prompts: []

data_directory: "ARCHIVO/PLUGINS/ESCRIBIENTE/"
data_structure:
  - "README.md": "Guía operativa del plugin"
  - "../DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/": "Sesiones persistidas"
  - "../DOCUMENT_MACHINE/STORAGE/ESCRIBIENTE_QUEUE/": "Cola INBOX/OUTBOX del worker"

handoffs:
  - label: "Diseñar flow de transcripción"
    agent: "WireEditor"
    prompt: "Diseña o revisa un flow Node-RED que use el pack Escribiente para transcribir audio por sesiones."
  - label: "Validar entorno whisper"
    agent: "WireEditor"
    prompt: "Ayúdame a ejecutar el precheck, revisar las recomendaciones y ajustar chunkSec/model/device."
  - label: "Preparar cierre exportable"
    agent: "WireEditor"
    prompt: "Revisa la sesión Escribiente, cierra el lote y genera informe final + export.zip."

external_requirements:
  - name: "Node-RED"
    version: ">=3.0.0"
    install: "npm install -g node-red"
    optional: false
    note: "Requerido para ejecutar el dashboard y los flows Escribiente."
  - name: "Python + venv"
    version: ">=3.10"
    install: ".venv/Scripts/python.exe -m pip install -r DocumentMachineSDK/workers/escribiente-whisper/requirements.txt"
    optional: false
    note: "Requerido para el worker faster-whisper y el precheck."
---

# Escribiente — Plugin de transcripción para WireEditor

## Visión

Escribiente añade al ecosistema Node-RED del Scriptorium una vertical completa de transcripción por sesiones:

- captura desde micrófono en dashboard,
- carga de MP3 como origen,
- segmentación por tramos,
- cola persistente `INBOX/OUTBOX`,
- worker Python `faster-whisper`,
- cierre archivístico con `full.txt`, `informe.md` y `export.zip`.

## Relación con Bartleby

El cierre documental del plugin adopta la disciplina Bartleby: observar la arquitectura del material transcrito, ordenar la sesión y producir un informe final sin ruido ornamental.

## Rutas canónicas

- Sesiones: `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/`
- Cola: `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/ESCRIBIENTE_QUEUE/`
- Pack Node-RED: `WiringEditor/packages/node-red-contrib-alephscript-escribiente/`
- Worker Python: `DocumentMachineSDK/workers/escribiente-whisper/`
