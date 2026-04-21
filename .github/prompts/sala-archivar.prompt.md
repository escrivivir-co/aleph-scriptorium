---
name: sala-archivar
description: "Archiva una sala cerrada y deja listo el siguiente sprint o una sala vacía."
argument-hint: "[nombre del sprint, ej: sprint-01]"
tools: [vscode, execute, read, edit, search, todo]
---

# /sala-archivar — Archivado de sprint y reset de sala

Prompt de cierre de ciclo. Archiva la sala completa cuando un sprint termina y prepara la estructura para el siguiente lote.

> **Protocolo transversal:** `.github/instructions/sala-protocolo.instructions.md` §6 aplica. Solo se ejecuta cuando el tablero está 100% cerrado.

## Variable de ruta

En este prompt, `{{SALA_DIR}}` es la carpeta raíz de la sala de coordinación de este workspace.

---

## Uso

```
/sala-archivar {nombre-sprint}
```

**Ejemplos:**
- `/sala-archivar sprint-01`
- `/sala-archivar sala-sdk`

---

## Pasos (Aleph los ejecuta)

### 1. Verificar precondición (§6.1)

Lee `{{SALA_DIR}}/tablero.md`:
- Resumen: 0 libres, 0 en-curso.
- Todos los agentes: `Estado: disponible`.
- Backlog post-sprint registrado (si existe).

**Si no se cumple → parar.** Reportar qué tasks quedan abiertas.

### 2. Archivar sala

Usa comandos equivalentes a estos en el entorno activo:

```bash
mkdir -p {{SALA_DIR}}/archivo/sprint-{nombre}
mv {{SALA_DIR}}/tablero.md {{SALA_DIR}}/archivo/sprint-{nombre}/
mv {{SALA_DIR}}/agente-* {{SALA_DIR}}/archivo/sprint-{nombre}/
mv {{SALA_DIR}}/activacion-orquestador.md {{SALA_DIR}}/archivo/sprint-{nombre}/ 2>/dev/null || true
```

Contenido archivado (read-only a partir de ahora):
- `tablero.md` — registro completo de tracks, cerradas y backlog.
- `agente-{alias}/estado.md` — log histórico de cada agente.
- Cualquier fichero de activación o referencia de la sala.

### 3. Archivar dossiers cerrados

Para cada dossier cuya ejecución en este sprint esté **totalmente cerrada** y que viva en `{{SALA_DIR}}/dossiers/`:

```bash
mv {{SALA_DIR}}/dossiers/{nombre-dossier} {{SALA_DIR}}/archivo/sprint-{nombre}/dossiers/
```

Si un dossier tiene tasks transferidas al siguiente sprint, **se mantiene activo** en `{{SALA_DIR}}/dossiers/`; no se mueve.

### 4. Registrar cierre

Crear `{{SALA_DIR}}/archivo/sprint-{nombre}/CIERRE.md`:
```markdown
# Cierre — sprint-{nombre}

- Fecha: {fecha}
- Tasks cerradas: {n}/{total}
- Tasks no-aplica: {n}
- Agentes participantes: {lista}
- Backlog transferido: {BL-ids o "ninguno"}
- Dossiers archivados: {lista}
- Dossiers activos (no archivados): {lista o "ninguno"}
```

### 5. Inicializar nueva sala (opcional)

Si hay un siguiente lote planificado:

1. Crear `{{SALA_DIR}}/tablero.md` nuevo con tracks del siguiente sprint.
2. Crear carpetas `agente-{alias}/estado.md` limpias.
3. Crear `{{SALA_DIR}}/activacion-orquestador.md` si procede.

Si no hay siguiente lote inmediato, la sala queda vacía (solo `archivo/`).

### 6. Confirmar al PO

```
Sprint {nombre} archivado.
- {n} tasks cerradas, {n} dossiers archivados.
- Backlog transferido: {BL-ids}.
- Sala {limpia | inicializada para sprint {nuevo-nombre}}.
```

---

## Regla de seguridad

**No se borra nada.** Se mueve a `archivo/`. El historial de la sala es evidencia de trabajo y referencia para futuros sprints. Si un dossier archivado necesita reactivarse, se copia de vuelta (nunca se mueve desde archivo).