---
name: sala-seguir
description: "Reanuda desde disco sin reconstrucción completa. Para agentes: Aleph ha actualizado tu estado.md, léelo y sigue. Para Aleph: los agentes han escrito en disco, léelo y sigue."
argument-hint: "[alias del agente | Aleph]"
tools: [vscode, execute, read, agent, edit, search, web, browser, todo]
---

# /sala-seguir — Reanudar desde disco

Prompt ligero de reanudación. No reconstruye contexto completo (para eso está `/sala-reconectar`). Solo lee lo que cambió en disco y continúa.

> **Protocolo transversal:** `.github/instructions/sala-protocolo.instructions.md` aplica siempre. Disco > chat, checkpoints breves, entrega obligatoria.

## Variable de ruta

En este prompt, `{{SALA_DIR}}` es la carpeta raíz de la sala de coordinación de este workspace.

---

## ¿Quién eres?

El argumento decide tu rol:

- `/sala-seguir Boris` → eres el agente **Boris**. Aleph ha tocado tu `estado.md` con una decisión. Léela y actúa.
- `/sala-seguir Aleph` → eres **Aleph**. Los agentes han actualizado sus carpetas. Lee y sigue orquestando.
- Sin argumento → **si en esta conversación ya actuaste como un agente o como Aleph, reutiliza ese rol sin preguntar.** Solo pregunta "¿Quién sigue?" si no hay contexto previo.

---

## Si eres un agente

### Paso 1 — Lee tu estado.md

Lee `{{SALA_DIR}}/agente-{alias}/estado.md`. Busca líneas `ALEPH:` en el log que no hayas procesado. Esa es tu instrucción.

### Paso 2 — Lee el tablero (solo tu fila)

Lee `{{SALA_DIR}}/tablero.md`. Confirma que tu task y estado coinciden con lo que dice `estado.md`. Si no coinciden, para y reporta inconsistencia.

### Autovalidación (recordatorio rápido)

Antes de actuar, confirma que recuerdas las líneas rojas (§6 del protocolo):

- **No git.** Ninguna operación git de escritura. Solo Aleph comitea.
- **No escribir fuera de `{{SALA_DIR}}/agente-{alias}/`.** Candidatos en tu carpeta, ruta de destino en ENTREGA.
- **No editar `tablero.md` ni estados ajenos.** Solo tu `estado.md`.
- Si el brief dice "crea rama" o "commitea": esos pasos son de Aleph. Tú preparas artefactos.

### Paso 3 — Actúa según la instrucción

| Lo que dice la línea ALEPH | Qué haces |
|-----------------------------|-----------|
| `ALEPH: [TASK] aprobada. Adelante.` | Lee el dossier de la task y empieza a trabajar. Checkpoint tras primer artefacto. |
| `ALEPH: entrega aprobada` / `[TASK] cerrada` | Task terminada. Propone siguiente task (o bloque de tasks pequeñas — ver §4.2) en Handoff Aleph o queda disponible. |
| `ALEPH: entrega devuelta — [motivo]` | Lee el motivo, corrige, actualiza estado.md con checkpoint, re-entrega. |
| `ALEPH: [instrucción específica]` | Sigue la instrucción. |

### Paso 4 — Confirma en chat (breve)

```
{alias} ({modelo}): leído. [TASK-ID] [estado]. [qué voy a hacer ahora].
```

No necesitas reconstrucción completa. Ya sabes quién eres y qué estabas haciendo. Solo te faltaba la decisión de Aleph.

---

## Si eres Aleph

### Paso 1 — Lee las carpetas de agentes

Para cada `{{SALA_DIR}}/agente-*/estado.md`:

1. Lee la cabecera (task, estado).
2. Lee las últimas líneas del log (busca checkpoints nuevos, entregas, reconexiones).
3. Lee la sección "Handoff Aleph" (bloqueos, peticiones).

### Paso 2 — Sincroniza el tablero (mecánico)

Lee `{{SALA_DIR}}/tablero.md`. Para cada agente cuyo `estado.md` diga `entregada` pero el tablero diga `en-curso`, **actualiza el tablero a `entregada:{alias}`**. Esta sincronización es mecánica: el agente ya decidió entregar, tú solo reflejas el dato. No requiere aprobación del PO.

Si hay otra clase de divergencia (alias distintos, task distinta, estado imposible), anota y reporta.

Actualiza también la tabla Resumen del tablero si tocaste filas.

### Paso 2.5 — Auditoría de clean post-cierre

Para cada agente cuyo `estado.md` diga `Estado: cerrada` (o la task figure como `cerrada` en tablero):

- Lista los ficheros en su carpeta temporal **además de `estado.md`**.
- Si hay ficheros extra (ENTREGA_*, borradores, candidatos) → el clean post-cierre no se ejecutó.
- **No limpies automáticamente.** Reporta al PO en el Paso 4:
  ```
  ⚠️ Clean pendiente: {alias} — [TASK-ID] cerrada pero carpeta contiene: {lista de ficheros}. ¿Limpio?
  ```
- Espera confirmación antes de borrar.

### Paso 3 — Actúa

- Si hay entregas pendientes → prioriza revisión.
- Si hay peticiones en Handoff Aleph → responde (en disco primero).
- Si hay cleans pendientes confirmados por el PO → ejecuta (ver `.github/instructions/sala-protocolo.instructions.md` §5).
- Si hay inconsistencias → reporta al PO.
- Si todo está limpio → reporta estado breve y espera órdenes.

### Paso 4 — Reporta al PO (formato breve)

```
Aleph ({modelo}) — seguimiento desde disco.

Agentes:
- {alias}: {task} — {estado} — {novedad o "sin cambios"}
[repetir por agente]

Acciones pendientes: {lista o "ninguna"}
```

No repitas el diagnóstico completo del Paso 3 de activación. Esto es un refresh rápido.

---

## Cuándo usar cada prompt

| Situación | Prompt |
|-----------|--------|
| Sesión fría, no recuerdas nada | `/sala-reconectar {alias}` (agente) o `/sala-aleph` (Aleph) |
| Sabes quién eres pero Aleph/agente actualizó disco | **`/sala-seguir {alias o Aleph}`** ← este |
| Primera entrada en sala | `/sala-entrar {alias}` |