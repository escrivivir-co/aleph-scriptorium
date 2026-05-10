---
name: sala-revisar
description: "Delegación atómica de revisión. Cuando un agente entrega, Aleph crea una tarea REV-* en el tablero para que un agente-revisor (solo orquestador) valide la entrega antes de cerrar."
argument-hint: "[alias-entregador TASK-ID, ej: gepe DF-01]"
tools: [vscode, execute, read, agent, edit, search, web, browser, todo]
---

# /sala-revisar — Delegación atómica de revisión

Micro-prompt de revisión. Cuando un agente entrega una task, Aleph usa este prompt para delegar la revisión a un agente-revisor en otra ventana. Garantiza que la entrega se recibe, se crea la tarea de revisión y el tablero queda sincronizado en una sola acción.

> **Protocolo transversal:** `.github/instructions/sala-protocolo.instructions.md` aplica siempre. Disco > chat.

## Variable de ruta

En este prompt, `{{SALA_DIR}}` es la carpeta raíz de la sala de coordinación de este workspace.

---

## Convención REV-*

- El prefijo `REV-` marca una tarea **solo-orquestador**: únicamente agentes que el PO ha designado como revisores pueden proponerlas.
- Agentes regulares (los que entran con `/sala-entrar` a trabajar) **nunca proponen tareas `REV-*`**. Si ven una en el tablero, la saltan.
- El tablero las muestra en la sección **"Revisiones pendientes"**, separada de los tracks de trabajo.
- El ciclo de vida de una `REV-*` es idéntico al de cualquier otra task (libre → propuesta → en-curso → entregada → cerrada), pero el artefacto de entrega es un **veredicto**, no un candidato.

---

## Uso

```
/sala-revisar {alias} {TASK-ID}
```

**Ejemplos:**
- `/sala-revisar gepe DF-01`
- `/sala-revisar gepe DF-01, sony DF-02`  ← múltiples en una llamada

---

## Pasos (Aleph los ejecuta)

### Para cada par {alias, TASK-ID}:

**1. Verifica la entrega**

- Lee `{{SALA_DIR}}/agente-{alias}/ENTREGA_{TASK-ID}.md`.
- Confirma que existe, tiene resumen, lista de artefactos y pasos para Aleph.
- Si no existe o está incompleta, **no crees la REV**. Devuelve al agente: actualiza su `estado.md` pidiendo la entrega completa.

**2. Escritura atómica — estado.md + tablero** (una sola operación de edición):

**En `estado.md` del agente entregador:**
```
- [fecha] ALEPH: entrega de {TASK-ID} recibida. Revisión delegada como REV-{TASK-ID}. Espera veredicto.
```
Cabecera:
```
Estado: entregada-en-revisión
Último checkpoint: [fecha] — ALEPH: entrega recibida, REV-{TASK-ID} creada
```

**En `tablero.md`:**
- Fila de la task original: `entregada:{alias}` → `entregada-en-revisión:{alias}` (si no se usó ya el sync mecánico de `/sala-seguir`).
- Añade entrada en la sección **"Revisiones pendientes"**:

```markdown
| REV-{TASK-ID} | Revisar entrega de {TASK-ID} ({alias}) | — | `libre` |
```

- Actualiza tabla resumen si aplica.

**3. Confirma al PO** (una línea por revisión creada):

```
{alias}: {TASK-ID} entrega recibida → REV-{TASK-ID} creada en tablero ✓
```

---

## Qué hace el agente-revisor

El agente-revisor entra en sala normalmente (`/sala-entrar {alias-revisor}`), pero el PO le indica que busque tareas `REV-*`. El flujo es el mismo que cualquier task:

1. **Propone** `REV-{TASK-ID}` en su `estado.md` → Aleph aprueba.
2. **Lee el brief original** de la task (en el dossier correspondiente): objetivo, cambios requeridos, criterio de aceptación.
3. **Lee la entrega**: `{{SALA_DIR}}/agente-{alias-entregador}/ENTREGA_{TASK-ID}.md` y los artefactos que referencia.
4. **Revisa** los artefactos contra los criterios de aceptación del brief.
5. **Deja veredicto** en su carpeta temporal:

### Formato del veredicto: `REVISION_REV-{TASK-ID}.md`

```markdown
# Revisión — REV-{TASK-ID}

> **Revisor:** {alias-revisor} ({modelo})
> **Task original:** {TASK-ID}
> **Agente entregador:** {alias-entregador}
> **Fecha:** {fecha}

## Veredicto: {aprobada | devuelta | rechazada}

## Checklist de criterios de aceptación

- [x/✗] {criterio 1 del brief}
- [x/✗] {criterio 2 del brief}
- ...

## Observaciones

{Si aprobada: confirmación breve.}
{Si devuelta: issues específicos que corregir, con rutas y líneas si aplica.}
{Si rechazada: motivo estructural por el que la entrega no es salvable.}

## Pasos recomendados para Aleph

{Si aprobada: cerrar TASK-ID y REV-TASK-ID, copiar artefactos al dossier.}
{Si devuelta: devolver TASK-ID a en-curso:{alias-entregador} con feedback.}
{Si rechazada: liberar TASK-ID, archivar intento fallido.}
```

6. **Entrega** normalmente: `ENTREGA_REV-{TASK-ID}.md` en su carpeta + notificación breve en chat.

---

## Cierre de revisión (Aleph)

Cuando el revisor entrega su veredicto, Aleph actúa según el resultado:

| Veredicto | Task original | REV-{TASK-ID} | estado.md del entregador |
|-----------|---------------|---------------|--------------------------|
| `aprobada` | → `cerrada` | → `cerrada` | Log: "ALEPH: {TASK-ID} aprobada tras revisión. Entrega aceptada." |
| `devuelta` | → `en-curso:{alias}` | → `cerrada` | Log: "ALEPH: {TASK-ID} devuelta tras revisión. Motivo: {resumen}. Corrige y re-entrega." + feedback del revisor |
| `rechazada` | → `libre` | → `cerrada` | Log: "ALEPH: {TASK-ID} rechazada tras revisión. Motivo: {resumen}. Task liberada." |

Todas las transiciones son atómicas: tablero + estado.md en la misma operación.

---

## Regla de atomicidad

Igual que `/sala-aprobar`: usa **una sola operación de edición** con todos los cambios. Si la operación falla parcialmente, reporta qué quedó sin sincronizar.

**No existe**: "creé la REV en tablero, actualizaré estado.md después."
**Sí existe**: "creé la REV en tablero y actualicé estado.md en la misma operación."

---

## Por qué existe este prompt

Sin revisión delegada, Aleph es el cuello de botella: recibe la entrega, la revisa, la cierra. Con `/sala-revisar`, Aleph puede delegar la validación a otro agente-orquestador en paralelo, manteniendo la trazabilidad completa en disco. El entregador sabe que su entrega está en revisión; el revisor tiene instrucciones claras; Aleph solo cierra o devuelve cuando el veredicto llega.
