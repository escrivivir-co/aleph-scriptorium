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

### Paso 2.5: Validar Índice DRY (opcional pero recomendado)

Antes de generar el mensaje, ejecutar validación de coherencia:

```
@indice validar
```

O invocar el prompt `.github/prompts/indice-validar.prompt.md` para verificar:
- ¿Los índices están sincronizados con el codebase?
- ¿Hay archivos nuevos no documentados?
- ¿El commit cumple el protocolo DevOps?

**Este paso genera warnings informativos, NO bloquea el commit.**

Si hay warnings:
```
⚠️ VALIDACIÓN DE ÍNDICE

1. [indice_desactualizado] Tecnico.md no menciona plugin "X"

Sugerencia: @indice actualizar
Este warning es informativo y no bloquea el commit.
```

El usuario decide si corregir ahora o después.

### Paso 2.6: Validar Índice SPLASH (si hay cambios en docs/)

Si los cambios afectan a `docs/`, verificar coherencia con el índice estructural:

```bash
# Detectar cambios en docs/
git diff --stat | grep "docs/"
```

**Criterios de warning**:

| Cambio detectado | Warning | Acción sugerida |
|------------------|---------|------------------|
| Nueva sección en `index.md` | ⚠️ SPLASH | Actualizar tabla §2.2 |
| Nueva página `docs/*.md` | ⚠️ SPLASH | Actualizar tabla §4 |
| Modificación `_layouts/` o `_includes/` | ⚠️ SPLASH | Actualizar §1 |
| Nuevas variables CSS | ⚠️ SPLASH | Actualizar §3.1 |
| Cambios en navegación (`_config.yml`) | ⚠️ SPLASH | Actualizar §1.3 |
| Solo contenido textual | ✅ OK | No requiere actualización |
| Solo `_posts/` o colecciones | ✅ OK | No requiere actualización |

**Formato del warning**:

```
⚠️ VALIDACIÓN SPLASH (docs/)

1. [estructura_modificada] Se detectaron cambios estructurales en docs/:
   - {archivo1}
   - {archivo2}

El índice SPLASH puede estar desactualizado.
Ruta: ARCHIVO/DISCO/SPLASH/index.md

Sugerencia: @GHPages actualizar índice SPLASH
Este warning es informativo y no bloquea el commit.
```

**Nota**: Este paso solo se ejecuta si hay cambios en `docs/`.

### Paso 2.7: Validar Índice README (si hay cambios que afecten al README)

Si los cambios afectan a archivos que deberían reflejarse en `README.md`, verificar coherencia con el índice estructural:

```bash
# Detectar cambios en archivos relacionados con README
git diff --stat | grep -E "(registry\.json|\.gitmodules|package\.json|workspace-config\.json|agents/.*\.agent\.md)"
```

**Criterios de warning**:

| Cambio detectado | Warning | Acción sugerida |
|------------------|---------|------------------|
| Nuevo plugin en `registry.json` | ⚠️ README | Actualizar tabla Plugins |
| Nuevo submódulo en `.gitmodules` | ⚠️ README | Actualizar tabla Submódulos |
| Nuevo agente en `.github/agents/` | ⚠️ README | Actualizar sección Agentes |
| Cambio de versión en `package.json` | ⚠️ README | Actualizar badges y Estado |
| Cambio de rama en `workspace-config.json` | ⚠️ README | Actualizar sección Estado |
| Cambios internos sin impacto público | ✅ OK | No requiere actualización |

**Formato del warning**:

```
⚠️ VALIDACIÓN README

1. [readme_desactualizado] Se detectaron cambios que pueden afectar al README:
   - {archivo1}: {tipo de cambio}
   - {archivo2}: {tipo de cambio}

El README puede necesitar actualización.
Índice: ARCHIVO/DISCO/README/index.md

Sugerencia: @indice consultar README o actualizar manualmente
Este warning es informativo y no bloquea el commit.
```

**Nota**: Este paso verifica cambios en archivos que típicamente requieren actualización del README público.

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
