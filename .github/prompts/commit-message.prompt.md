# Prompt: Generación de Commit Message

## Instrucción para el agente

Cuando hayas completado una tarea o conjunto de tareas, genera un mensaje de commit conforme al protocolo DevOps del proyecto.

---

## Protocolo de commit

### Formato

```
<tipo>(<scope>): <descripción corta en imperativo>

[cuerpo opcional: qué y por qué, no cómo]

refs #<TASK-ID>
```

### Tipos

| Tipo | Cuándo usarlo |
|------|---------------|
| `feat` | Nuevo contenido o funcionalidad |
| `fix` | Corrección de error o inconsistencia |
| `docs` | Solo documentación (READMEs, instrucciones) |
| `refactor` | Reestructuración sin cambio de contenido |
| `style` | Formato, voz, estilo |
| `chore` | Mantenimiento, configuración |
| `archive` | Extracción de material fuente a ARCHIVO |

### Scopes

**Scriptorium** (`.github/`):
- `script/agents`
- `script/prompts`
- `script/instructions`
- `script/devops`

**Fundación** (`ARCHIVO/`, `PROYECTOS/FUNDACION/`):
- `fund/archivo`
- `fund/caps`
- `fund/plan`

---

## Procedimiento

### Paso 1: Identificar cambios

Ejecuta o solicita al usuario:
```bash
git status
git diff --stat
```

### Paso 2: Clasificar por opportunity

- ¿Los cambios afectan a `.github/`? → **Scriptorium**
- ¿Los cambios afectan a `ARCHIVO/` o `PROYECTOS/`? → **Fundación**
- ¿Ambos? → Hacer commits separados

### Paso 3: Generar mensaje

Ejemplo para cambios en Scriptorium:
```
feat(script/devops): crear protocolo de commits y sprints

Establece convención de mensajes, estructura de 12 sprints,
y backlogs para ambas opportunities.

refs #SCRIPT-0.0.1-T001
```

Ejemplo para cambios en Fundación:
```
archive(fund/archivo): añadir docs 08-11 al marco conceptual

Incorpora trabajo como campo de batalla, teología política,
Euroamérica y crítica al tecnofeudalismo (Ferrín).

refs #FUND-0.0.1-T001, #FUND-0.0.1-T002, #FUND-0.0.1-T003, #FUND-0.0.1-T004
```

### Paso 4: Presentar al usuario

Muestra el mensaje propuesto y pregunta si desea:
1. Ejecutar el commit directamente
2. Modificar el mensaje
3. Revisar los archivos antes

---

## Reglas de estilo

- **Descripción corta**: máximo 72 caracteres, imperativo ("añadir", no "añadido")
- **Cuerpo**: explicar el qué y el por qué, no el cómo
- **Referencias**: siempre incluir Task ID si existe
- **Un commit por unidad lógica**: si los cambios son heterogéneos, separar

---

## Ejemplo completo

**Input**: Has creado `DEVOPS.md`, `BACKLOG-SCRIPTORIUM.md` y actualizado `aleph.agent.md`.

**Output**:
```
feat(script/devops): establecer protocolo DevOps completo

- Crear DEVOPS.md con convención de commits y estructura de sprints
- Crear BACKLOG-SCRIPTORIUM.md para tracking de tareas
- Actualizar aleph.agent.md con sección de trazabilidad

refs #SCRIPT-0.0.1-T001, #SCRIPT-0.0.1-T004
```
