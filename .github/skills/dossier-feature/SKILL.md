---
name: dossier-feature
description: Skill portable para cristalizar features como dossiers dentro de la sala de coordinación. Gestiona el ciclo de vida del dossier — abrir, diseñar, ejecutar y cerrar — usando el scaffold estandarizado de PLAN.md, BACKLOG.md, RESPUESTAS.md, activacion.prompt.md y tasks/. Se activa cuando cualquier agente abre o gestiona features, diseña tracks de trabajo, o usa el comando /dossier para crear o continuar el diseño de un track de sala.
---

# Skill: dossier-feature — Protocolo de diseño de features como dossiers

Esta skill define el protocolo de la **capa de diseño persistente de `sala`**: el dossier.

Un dossier no es un sprint, ni un ticket, ni un README. Es el artefacto que contiene toda la arquitectura de decisión de un feature: contexto compartido, restricciones, tasks con briefs completos y decisiones del PO. Vive en `{{SALA_DIR}}/dossiers/` y sobrevive a la sala o sprint que lo ejecutó.

Relación entre dossier y sala:

- `sala` = protocolo de coordinación y ejecución
- `dossier` = capa de diseño persistente dentro de `{{SALA_DIR}}/dossiers/`
- `/dossier` = trigger de apertura y continuidad de tracks
- `{{SALA_DIR}}/tablero.md` = registra el estado del track y las tasks activas

---

## Cuándo activar esta skill

- Cuando se recibe `/dossier crear {nombre}` para abrir un feature nuevo
- Cuando se recibe `/dossier continuar {nombre}` para retomar un feature existente
- Cuando se recibe `/dossier listar` para inventariar dossiers activos
- Cuando cualquier agente necesita diseñar un track de trabajo nuevo para la sala
- Cuando se propone promover artefactos al SDK desde la carpeta de un agente

---

## Scaffold del dossier — formato canónico

El scaffold rico y portable que cualquier rama puede heredar sin reabrir arqueología local:

```
{{SALA_DIR}}/dossiers/{nombre-dossier}/
├── PLAN.md               ← contexto, anclas, restricciones, propuesta
├── BACKLOG.md            ← tracking de tasks (índice, no detalle)
├── RESPUESTAS.md         ← decisiones del PO con efecto operativo
├── activacion.prompt.md  ← prompt de activación del dossier
└── tasks/
    └── TASK-{N}_{NOMBRE}.md  ← brief completo de cada task
```

### Plantilla PLAN.md

```markdown
# Plan — [nombre del feature]

> **Fecha:** [fecha]
> **Autor:** [modelo]
> **Dossier:** `{{SALA_DIR}}/dossiers/[nombre-dossier]/`

## 1. Contexto

[Por qué existe este feature. Qué problema resuelve.]

## Contexto compartido

[Lista de ficheros o artefactos que cualquier agente debe leer antes de empezar.
No duplicar aquí lo que ya está en tasks/.]

## 2. Anclas

[Ficheros, decisiones, artefactos que ya existen y que este feature no puede contradecir.]

## 3. Restricciones

- Solo escribir en la carpeta del agente (ver R4)
- Protocolo de sala: `.github/instructions/sala-protocolo.instructions.md`
- [Restricciones específicas del feature]

## 4. Propuesta

[Qué se va a hacer. Secciones según necesidad.]

## 5. Salida operativa

- Tracking: [BACKLOG.md](./BACKLOG.md)
- Decisiones del PO: [RESPUESTAS.md](./RESPUESTAS.md)
- Tasks: carpeta [tasks](./tasks)
```

### Plantilla BACKLOG.md

```markdown
# Backlog — [nombre del feature]

> **Última actualización:** [fecha] — [modelo]

## Contexto compartido

[Lista DRY de refs: el detalle vive en tasks/. No duplicar reglas de sala.]

## Regla DRY del backlog

El backlog es índice y tracking. El detalle vive en `tasks/`.
No se duplican reglas de `.github/`, `sala/` ni del mod.

## Tracking

| Task | Estado | Agente | Dependencias | Entrega | Brief |
|------|--------|--------|--------------|---------|-------|
| TASK-00 | cerrada | [modelo] | — | [artefacto] | [link] |
| TASK-01 | libre   | —        | —            | [artefacto] | [link] |

## Criterio de cierre del feature

- [ ] [condición verificable]
```

### Plantilla TASK-{N}_{NOMBRE}.md

```markdown
# TASK-{N} — [título]

> **Estado:** libre | en-curso | entregada | cerrada
> **Agente recomendado:** [alias o "cualquiera"]
> **Dependencias:** [TASK-IDs o —]
> **Entrega esperada:** [ruta canónica del artefacto]

## Lee primero

1. [fichero o contexto obligatorio antes de empezar]

## Objetivo

[Qué hay que hacer, en 2-3 frases.]

## Cambios requeridos

[Lista concreta de cambios o artefactos a producir.]

## Salida mínima esperada

1. Candidato en carpeta del agente: `agente-{alias}/candidato-{artefacto}`
2. ENTREGA con lista de cambios respecto al original.

## Criterio de aceptación

- [condición verificable, grepable cuando sea posible]
```

### Plantilla RESPUESTAS.md

```markdown
# Respuestas del PO — [nombre del feature]

> Cada respuesta incluye **efecto operativo** concreto:
> qué cambia exactamente en el dossier, el backlog o las tasks.

---

## [Pregunta o decisión]

**Decisión:** [...]

**Efecto operativo:** [qué cambia exactamente en disco]
```

### Plantilla activacion.prompt.md

```markdown
# Activación — [nombre del feature]

> Prompt de entrada al dossier. Cualquier agente que entre en este dossier
> debe leer este fichero antes de leer PLAN.md o las tasks.

## Contexto mínimo

[3-5 líneas: por qué existe este dossier y dónde estamos.]

## Estado actual

- Último avance: [qué se hizo]
- Próximas tasks libres: [TASK-IDs]
- Decisiones del PO pendientes: [lista o "ninguna"]

## Instrucción de entrada

Lee BACKLOG.md, identifica tasks libres sin deps bloqueantes y propón a Aleph.
```

---

## Protocolo de activación

### /dossier crear {nombre}

1. Crea `{{SALA_DIR}}/dossiers/{nombre}/` con el scaffold completo (todos los ficheros de la plantilla).
2. Rellena `PLAN.md` con contexto, anclas y restricciones específicas del feature.
3. Rellena `BACKLOG.md` con las primeras tasks identificadas en estado `libre`.
4. Rellena `activacion.prompt.md` con el contexto mínimo de entrada.
5. Añade el track al `{{SALA_DIR}}/tablero.md`.
6. Informa al PO: dossier listo, tracks registrados en tablero.

### /dossier continuar {nombre}

1. Lee `{{SALA_DIR}}/dossiers/{nombre}/BACKLOG.md` y `RESPUESTAS.md`.
2. Identifica tasks libres con dependencias resueltas.
3. Propone siguiente bloque de trabajo o pide instrucción al PO.
4. Actualiza `activacion.prompt.md` con el estado actual.

### /dossier listar

1. Lee `{{SALA_DIR}}/dossiers/` (carpetas activas) y lista sus estados.
2. Para cada dossier: nombre, tasks en estado libre / en-curso / entregada.
3. Lista también `{{SALA_DIR}}/archivo/` si hay sprints con dossiers relevantes.

---

## R1 — Disco primero

Todo diseño que un agente produzca en este protocolo va a su carpeta temporal:
`{{SALA_DIR}}/agente-{alias}/`.

El chat es para notificaciones breves (máx. 3-5 líneas). Ver `.github/instructions/sala-protocolo.instructions.md` §1.

## R2 — Backlog es índice, no contenido

El detalle de cada task vive en `tasks/TASK-{N}_{NOMBRE}.md`. El backlog solo lleva:
`Task | Estado | Agente | Dependencias | Entrega | Brief`.

No se duplica en el backlog lo que ya está en la task o en el protocolo de sala.

## R3 — Dossier sobrevive al sprint

Un dossier abierto en un sprint puede cerrarse en otro. Al archivar un sprint, los dossiers cerrados se mueven a `{{SALA_DIR}}/archivo/sprint-{nombre}/dossiers/`. Los dossiers activos permanecen en `{{SALA_DIR}}/dossiers/`. Esta persistencia permite continuar tracks entre sprints sin perder contexto.

## R4 — Restricción de escritura y promociones al SDK

**Durante ejecución de una task:** el agente solo escribe en `{{SALA_DIR}}/agente-{alias}/`. No toca el dossier, `.github/`, `corpus/` ni ningún destino final. Deja el artefacto candidato en su carpeta y documenta la ruta de destino en `ENTREGA_{TASK-ID}.md` para que Aleph copie.

**Para promociones al SDK (`main`):** el candidato vive en `{{SALA_DIR}}/agente-{alias}/candidato-{artefacto}`. Aleph revisa, decide y ejecuta la copia a `.github/skills/`, `.github/prompts/` u otro destino en `main`. El agente nunca escribe directamente en `.github/` salvo que la task lo diga explícitamente y Aleph lo haya aprobado en disco.

Una entrega que escribe fuera de la carpeta del agente se devuelve automáticamente, incluso si el artefacto es correcto.

## R5 — Absorción máxima en main

El protocolo del dossier y el scaffold rico pertenecen al SDK base (`.github/skills/dossier-feature/`). Los mods solo añaden delta local: ejemplos específicos del lore, overrides de secciones del scaffold, taxonomía del corpus. El mod nunca reconstruye el protocolo base: hereda desde `main` y añade solo lo que `main` no puede generalizar.

---

## Dónde vive el material específico del lore

Los ejemplos canónicos, la taxonomía del lore y los overrides del scaffold viven en el mod activo — no en este SDK. El mod los gestiona y hereda el protocolo base desde `main`.
