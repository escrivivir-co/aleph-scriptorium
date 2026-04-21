---
name: dossier
description: "Crea, continúa o lista dossiers de feature. Los dossiers son la capa de diseño persistente de sala; la sala es su ejecución."
argument-hint: "[crear {nombre} | continuar {nombre} | listar]"
tools: [vscode, read, edit, search]
---

# /dossier — Gestión de dossiers de sala

Los dossiers son carpetas autocontenidas de diseño de features. Viven en `{{SALA_DIR}}/dossiers/{nombre}/` y abren o mantienen tracks que después ejecuta `/sala-aleph`, `/sala-entrar`, `/sala-seguir` y `/sala-archivar`.

El protocolo de diseño vive en `.github/skills/dossier-feature/SKILL.md`. Léelo antes de actuar.

> **Quién crea dossiers:** el PO y/o el scrum master, asistidos por este prompt.
> **Quién los ejecuta:** los agentes de la sala, coordinados por Aleph.

---

## Operación: crear

**Argumento:** `/dossier crear {nombre-kebab}`

### Paso 1 — Scaffold real

Usa herramientas reales para copiar `{{SALA_DIR}}/plantilla-dossier/` a `{{SALA_DIR}}/dossiers/{nombre}/`.

Conserva el scaffold rico y los nombres canónicos:

```text
{{SALA_DIR}}/dossiers/{nombre}/
├── PLAN.md
├── BACKLOG.md
├── RESPUESTAS.md
├── activacion.prompt.md
└── tasks/
    ├── TASK-00_CONTEXTO_Y_PERSISTENCIA.md
    └── TASK-01_{TITULO}.md
```

No rebajes el dossier a un esqueleto mínimo. Parte del scaffold vivo de `{{SALA_DIR}}/plantilla-dossier/` y sustituye los placeholders con los datos que el usuario proporcione.

### Paso 2 — Conversación mínima de diseño

Pregunta solo lo necesario para fijar el dossier:

1. ¿Qué problema resuelve este feature y cuál es su objetivo?
2. ¿Qué anclas y restricciones no puede contradecir?
3. ¿Qué tasks hay que abrir? Pide al menos título, entrega esperada y dependencias si ya se conocen.
4. Si el track necesita una sigla explícita para tablero y no es obvia por contexto, confírmala antes de escribirla.

Si el usuario ya trae un brief claro, no abras preguntas redundantes.

### Paso 3 — Generar el dossier

Con las respuestas:

1. Completa `PLAN.md` con contexto, anclas, restricciones, propuesta y salida operativa.
2. Completa `BACKLOG.md` como índice y tracking del dossier. Usa el formato actual: contexto compartido, regla DRY, tabla de tracking y criterio de cierre.
3. Completa `RESPUESTAS.md` registrando cada decisión del usuario y su efecto operativo.
4. Crea o completa cada `TASK-NN_{TITULO}.md` en `tasks/`. Cada task debe incluir, cuando aplique: estado, agente recomendado, dependencias, entrega esperada, `Lee primero`, objetivo, cambios requeridos o pasos, salida mínima esperada y criterio de aceptación.
5. Completa `activacion.prompt.md` con un resumen ejecutivo corto: qué es, qué problema resuelve, backlog real y siguiente paso recomendado.

No añadas referencias a ningún lore específico. El dossier debe servir como capa de diseño portable de `sala`.

### Paso 4 — Registrar el track en tablero

Lee `{{SALA_DIR}}/tablero.md` y registra el dossier como track ejecutable de `sala`:

1. Añade o actualiza un bloque `## Track {SIGLA}` con las tasks ejecutables del dossier en estado `libre`.
2. Si `TASK-00_CONTEXTO_Y_PERSISTENCIA.md` forma parte del scaffold, refléjala como task de contexto ya cerrada en la tabla de `Tareas cerradas`, no como trabajo libre del track.
3. Actualiza `Tracks recomendados` si el usuario dejó una secuencia o paralelismo explícitos.
4. Actualiza la tabla resumen para reflejar libres, cerradas y primeras tasks sin dependencias.

### Paso 5 — Confirmar

Responde:

```text
Dossier creado: {{SALA_DIR}}/dossiers/{nombre}/
- PLAN: completado
- Tasks: {N} registradas en BACKLOG.md
- Track: añadido o actualizado en {{SALA_DIR}}/tablero.md

Siguiente: /sala-aleph para que Aleph cargue el track, o /sala-entrar {alias} para que un agente proponga tarea.
```

---

## Operación: continuar

**Argumento:** `/dossier continuar {nombre}`

1. Lee `{{SALA_DIR}}/dossiers/{nombre}/activacion.prompt.md`.
2. Lee `{{SALA_DIR}}/dossiers/{nombre}/BACKLOG.md` e identifica tasks cerradas, pendientes y bloqueadas.
3. Lee `{{SALA_DIR}}/dossiers/{nombre}/RESPUESTAS.md` si necesitas recuperar decisiones que afecten al diseño.
4. Presenta al usuario el estado actual, el siguiente paso y cualquier bloqueo de diseño.
5. Si el usuario quiere ajustar el dossier, edita `PLAN.md`, `BACKLOG.md`, `RESPUESTAS.md`, `tasks/` y `{{SALA_DIR}}/tablero.md` de forma consistente.

No ejecutes tasks. Aquí solo se diseña, se reencuadra o se reactiva el track que luego correrá `sala`.

---

## Operación: listar

**Argumento:** `/dossier listar`

Lista todas las carpetas `{{SALA_DIR}}/dossiers/*/`. Para cada una:

1. Lee la primera línea útil de `activacion.prompt.md`.
2. Lee `BACKLOG.md` y cuenta tasks cerradas, pendientes y bloqueadas.
3. Devuelve una línea por dossier con estado breve y foco actual.

Formato:

```text
Dossiers activos:
- feature-a: 2/5 cerradas — resumen ejecutivo
- feature-b: 0/3 cerradas — esperando arranque de sala
- feature-c: 4/4 cerradas — listo para archivar
```