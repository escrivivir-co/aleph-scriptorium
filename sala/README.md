# Sala de coordinación

> Si eres un agente y acabas de entrar: lee este fichero entero. Después abre `tablero.md`.
>
> **No empieces a trabajar sin hacer el handshake.** Ver regla 0 abajo.

## Qué es esto

Una sala de coordinación multi-agente. Un orquestador (**Aleph**, en otro hilo) revisa, aprueba y cierra. **Aleph no asigna tareas: los agentes proponen, Aleph valida.**

## Flujo de trabajo

```
1. PO / Scrum Master diseñan el dossier     →  /dossier crear {nombre}
2. Tasks del dossier se registran en tablero →  (automático en /dossier)
3. Aleph arranca                             →  /sala-aleph activar
4. Agentes arrancan                          →  /sala-entrar {alias}
5. Agentes proponen tasks, Aleph aprueba     →  /sala-seguir (Aleph)
6. Agentes entregan, Aleph delega revisión   →  /sala-revisar {alias} {TASK}
7. Revisor valida                            →  /sala-aleph review
8. Aleph cierra o devuelve                   →  /sala-seguir (Aleph)
9. Agentes salen                             →  /sala-salir {alias}
```

**El dossier es el diseño; la sala es la ejecución.** Los dossiers viven en `dossiers/`. La plantilla está en `plantilla-dossier/`.
En Scriptorium, `sala/plantilla-dossier/` es el espejo operativo de `.github/templates/sala-dossier/`.
Si el espejo falta o deriva, Ox debe resincronizarlo desde `.github/templates/sala-dossier/`, no desde un dossier concreto.

## Regla -1 — Presencia en disco al entrar

Cada vez que un agente ejecuta `/sala-entrar` o `/sala-reconectar`, debe dejar rastro en disco **antes** de pedir tarea o retomar trabajo.

1. Asegura su carpeta: `agente-{alias}/` (alias en minúsculas).
2. Crea o actualiza `estado.md` con la plantilla de `.github/templates/sala-agente.template.md`.
3. Añade una línea `ENTRADA` o `RECONEXION` en el log.

## Regla 0 — Handshake

Antes de hacer nada: actualiza `estado.md`, lee `tablero.md`, busca tu alias. Si no tienes tarea asignada, propón una en la sección "Handoff Aleph" de tu `estado.md`. Espera a que Aleph apruebe.

## Regla 0.3 — Handoff Aleph / reconexión

Si el chat se corta o cambias de ventana, usa `/sala-reconectar {alias}`. Lee tu `estado.md` y `tablero.md` para retomar. No preguntes al chat "¿dónde estaba?" — disco es la fuente de verdad.

## Regla 1 — Disco primero, chat después

Ver `.github/instructions/sala-protocolo.instructions.md` §1. Si Aleph no puede leerlo en tu carpeta, no existe.

## Regla 2 — Checkpoints

Después de cada subtarea: actualiza `estado.md` y avisa en chat (máximo 3-5 líneas). Ver protocolo §2.

## Regla 3 — Entrega

Toda tarea produce un `ENTREGA_{TASK-ID}.md` en tu carpeta. Sin excepciones. Ver protocolo §3.

## Estructura de la sala

```
sala/
├── README.md                  ← este fichero
├── tablero.md                 ← sprint activo
├── activacion-orquestador.md  ← manual de Aleph
├── dossiers/                  ← dossiers activos del sprint
├── plantilla-dossier/         ← scaffold para /dossier crear
├── agente-{alias}/            ← carpeta temporal de cada agente
│   └── estado.md
└── archivo/                   ← sprints cerrados (read-only)
    └── sprint-{nombre}/
```

## Protocolo completo

`.github/instructions/sala-protocolo.instructions.md` — la fuente de verdad. No la dupliques aquí.