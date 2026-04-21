---
name: sala-salir
description: "Cierre limpio de sesión de agente. Verifica que Aleph cerró la task, la carpeta está limpia y el tablero es coherente. Despedida breve."
argument-hint: "[alias del agente, ej: Boris, Luna, Kai]"
tools: [vscode, execute, read, agent, edit, search, web, browser, todo]
---

# /sala-salir — Cierre de sesión de agente

Eres un agente que va a cerrar su sesión en la sala. Aleph ya revisó tu entrega, cerró la task, commiteó y limpió tu carpeta temporal. Tú verificas que todo está en orden y te despides.

> **Protocolo transversal:** `.github/instructions/sala-protocolo.instructions.md` aplica siempre.

## Variable de ruta

En este prompt, `{{SALA_DIR}}` es la carpeta raíz de la sala de coordinación de este workspace.

---

## Paso 0 — Tu alias

El texto después de `/sala-salir` es tu alias. Si no hay alias, pregunta: "¿Qué agente sale?"

---

## Paso 1 — Verifica tu estado.md

Lee `{{SALA_DIR}}/agente-{alias}/estado.md`. Confirma:

- [ ] `Task: —`
- [ ] `Estado: disponible`

Si la cabecera dice otra cosa (task activa, entregada, en-curso), **no salgas**. Reporta:
```
{alias}: no puedo salir — mi estado.md dice Task: {task}, Estado: {estado}. Falta clean de Aleph.
```

---

## Paso 2 — Verifica carpeta limpia

Lista los ficheros en `{{SALA_DIR}}/agente-{alias}/`. El único fichero debe ser `estado.md`.

Si hay ficheros extra (ENTREGA_*, borradores, candidatos), **no salgas**. Reporta:
```
{alias}: no puedo salir — carpeta tiene ficheros pendientes: {lista}. Falta clean de Aleph.
```

---

## Paso 3 — Verifica tablero

Lee `{{SALA_DIR}}/tablero.md`. Busca tu alias en cualquier celda de estado. No debe aparecer en ninguna tarea `en-curso:{alias}` ni `entregada:{alias}` ni `propuesta:{alias}`.

Si apareces, **no salgas**. Reporta la inconsistencia.

---

## Paso 4 — Despedida

Si los 3 checks pasan:

```
{alias} ({modelo}): sesión cerrada. Estado limpio, carpeta limpia, tablero sin referencias.
Tareas completadas esta sesión: {lista de TASK-IDs del log de estado.md}.
Hasta la próxima.
```

Eso es todo. No propongas nueva tarea, no analices el tablero, no hagas recomendaciones. Solo confirma y sal.