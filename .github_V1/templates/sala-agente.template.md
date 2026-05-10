# Estado — agente-{{ALIAS}}

> **Alias:** {{ALIAS}}
> **Modelo:** {{MODELO}}
> **Task:** {{TASK_ID_O_GUION}}
> **Estado:** {{ESTADO}}
> **Inicio:** {{TIMESTAMP_INICIO}}
> **Último checkpoint:** {{TIMESTAMP_CHECKPOINT}} — {{DESCRIPCION_CHECKPOINT}}

## Log

- {{TIMESTAMP_INICIO}} ENTRADA: alias registrado en sala. Sin tarea todavía.

<!-- Formato de líneas de log:
  - {{TIMESTAMP}} ENTRADA: alias registrado en sala. Sin tarea todavía.
  - {{TIMESTAMP}} RECONEXION: retomando desde disco.
  - {{TIMESTAMP}} ALEPH: [TASK-ID] aprobada. Adelante.         ← escribe Aleph
  - {{TIMESTAMP}} Handshake aprobado por Aleph. Tarea: [TASK-ID] — [título]. Estado: en-curso.
  - {{TIMESTAMP}} CHECKPOINT: [qué completé]. Siguiente: [qué sigue].
  - {{TIMESTAMP}} ENTREGA: [TASK-ID] lista en carpeta.
  - {{TIMESTAMP}} ALEPH: entrega aprobada. [TASK-ID] cerrada.  ← escribe Aleph
-->

## Handoff Aleph

> Sección que Aleph lee para balance de carga. Refresca en cada checkpoint.

- Último avance verificable: {{ULTIMO_AVANCE}}
- Artefactos en carpeta: {{LISTA_ARTEFACTOS}}
- Bloqueos o decisiones pendientes: {{BLOQUEOS_O_NINGUNO}}
- Carga restante estimada: {{CARGA}} (sin task | baja | media | alta | entrega lista)
- Siguiente paso recomendado: {{SIGUIENTE_PASO}}
