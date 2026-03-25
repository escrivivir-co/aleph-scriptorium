# Protocolo de Cotrabajo — Copia Local

> **Fuente**: `.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md`

---

## Reglas Clave para Esta Sesión

### 1. El chat NO es el medio de trabajo

Los agentes transmiten estados por chat, pero el **contenido** va a `02_ACTAS/`.

### 2. Sistema de Turnos

```
⏳ WAITING → 🔄 WORKING → ✅ DONE → (siguiente)
```

### 3. Formato de Mensaje de Turno

```
@{agente} turno {N}
📂 Acta: 02_ACTAS/T00{N}_{agente}_{tema}.md
📝 Resumen: {1 línea}
🔄 Estado: {nuevo estado del trabajo}
➡️ Siguiente: @{próximo agente}
```

### 4. Transición de Turno

| Estado anterior | Acción | Estado siguiente |
|-----------------|--------|------------------|
| ⏳ WAITING | Agente toma turno | 🔄 WORKING |
| 🔄 WORKING | Agente publica acta | ✅ DONE |
| ✅ DONE | Actualizar tablero | — |

### 5. Restricciones de Esta Sesión

- **Máximo 5 turnos**
- **Enfoque dramaturgo** — Pensar en personajes, escenas, señales
- **No implementación** — Solo planificación y especificación
- **Output a specs** — `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/`

---

## Referencia Completa

Ver `.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md` para protocolo completo.
