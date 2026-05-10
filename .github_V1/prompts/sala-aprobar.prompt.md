---
name: sala-aprobar
description: "Aprueba una propuesta de task de forma atómica: sincroniza estado del agente y tablero en una sola acción."
argument-hint: "[{alias} {TASK-ID}[, {alias} {TASK-ID} ...]]"
tools: [vscode, read, edit, search, todo]
---

# /sala-aprobar — Aprobación atómica de task

Micro-prompt de aprobación. Garantiza que aprobar una propuesta de agente siempre sincroniza `estado.md` **y** `tablero.md` en una sola acción.

> **Protocolo transversal:** `.github/instructions/sala-protocolo.instructions.md` §4.1 aplica. Aprobación atómica obligatoria.

## Variable de ruta

En este prompt, `{{SALA_DIR}}` es la carpeta raíz de la sala de coordinación de este workspace.

---

## Uso

```
/sala-aprobar {alias} {TASK-ID}
```

**Ejemplos:**
- `/sala-aprobar boris CA-07`
- `/sala-aprobar lai LP-01`
- `/sala-aprobar boris CA-07, lai LP-01, luna GJ-06`  ← múltiples en una llamada

---

## Pasos (Aleph los ejecuta)

### Para cada par {alias, TASK-ID}:

**1. Lee el dossier de la task** (si no lo tienes en contexto):
- Busca en `{{SALA_DIR}}/agente-{alias}/estado.md` la propuesta del agente.
- Opcionalmente lee el brief de la task en la ruta de dossier que el tablero o la documentación de sala indiquen.

**2. Escribe en `estado.md` del agente** (en una acción junto con el paso 3):
```
- [fecha] ALEPH: {TASK-ID} aprobada. Adelante. {instrucciones concretas: qué hacer, qué leer, dónde dejar el candidato}.
```
Y actualiza la cabecera:
```
Task: {TASK-ID}
Estado: en-curso
Último checkpoint: {fecha} — ALEPH: {TASK-ID} aprobada
```

**3. Actualiza `tablero.md`** (en la misma operación de edición):
- Fila del track: `libre` → `en-curso:{alias}`
- Tabla resumen: libres--, en-curso++

**4. Confirma al PO** (una línea por aprobación):
```
{alias} ({modelo}): {TASK-ID} aprobada — tablero sincronizado ✓
```

---

## Regla de atomicidad

Usa **una sola operación de edición** con todos los cambios cuando apruebes una o varias tasks. Si la operación falla parcialmente, reporta qué quedó sin sincronizar antes de continuar.

**No existe**: "aprobé en estado.md, actualizaré tablero después."
**Sí existe**: "aprobé en estado.md y tablero en la misma operación."

---

## Por qué existe este prompt

El tablero es la única fuente de verdad compartida entre agentes. Si un agente lee su `estado.md` como "en-curso" pero el tablero dice "libre", interpreta inconsistencia y para, bloqueando el pipeline. Este prompt hace la sincronización imposible de olvidar.