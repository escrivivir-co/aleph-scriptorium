---
mode: agent
description: Crear un nuevo release del Scriptorium con merge, tag y push
tools: ['run_in_terminal', 'read_file', 'replace_string_in_file', 'grep_search']
---

# Prompt: Crear Release

> **Agente responsable**: @ox (vía @aleph)  
> **Tipo de tarea**: Gestión de releases

---

## Contexto

Este prompt guía el proceso completo de crear un release del Scriptorium:
1. Actualizar documentación (README, roadmap)
2. Commit en rama de desarrollo
3. Merge a main con indicador
4. Crear tag anotado
5. Push a origin

---

## Pre-requisitos

Antes de ejecutar, verificar:

```bash
# 1. Estar en rama de desarrollo (fc1 u otra)
git branch --show-current

# 2. No hay cambios sin commit
git status

# 3. Conocer último tag
git tag -l "v*" --sort=-version:refname | head -5
```

---

## Información Requerida

El usuario debe proporcionar:

| Campo | Ejemplo | Descripción |
|-------|---------|-------------|
| **Versión** | `v1.0.0-beta.3` | Seguir semver |
| **Nombre del release** | "Semillas de Futuro" | Título poético/descriptivo |
| **Rama origen** | `fc1` | Rama de desarrollo a mergear |
| **Indicador** | `-preview` | Si el desarrollo continúa en origen |

---

## Protocolo de Release

### Paso 1: Actualizar README.md

```markdown
# Cambios típicos:
- Badge de versión
- Tabla de submódulos (si hay nuevos)
- Tabla de plugins (si hay nuevos)
- Sección "Notas del Release" o "Últimas novedades"
```

**Verificar**:
- [ ] Versión en badge actualizada
- [ ] Métricas actualizadas (submódulos, plugins, agentes)
- [ ] Notas del release añadidas

### Paso 2: Actualizar docs/roadmap.md

```markdown
# Cambios típicos:
- Métricas en backlog-card
- Estado del Feature Cycle
- Progreso de épicas
```

### Paso 3: Commit en rama de desarrollo

```bash
git add README.md docs/roadmap.md [otros archivos]
git commit -m "release({version}): preparar {nombre}

- Actualizar README con métricas de {ciclo}
- Actualizar roadmap con estado actual
- {otros cambios}

refs #SCRIPT-{épica}"
```

### Paso 4: Merge a main

```bash
# Cambiar a main
git checkout main

# Merge con mensaje descriptivo
git merge {rama-origen} --no-ff -m "Merge {rama-origen} into main ({version}{indicador})

{Nombre del Release}

Este merge trae el trabajo completo del {ciclo} a main.
{Nota sobre continuación si aplica}"
```

**Ejemplo con indicador -preview**:
```bash
git merge fc1 --no-ff -m "Merge fc1 into main (v1.0.0-beta.3-preview)

Feature Cycle 1 — Semillas de Futuro

Este merge trae el trabajo completo del FC1 a main para crear
el release v1.0.0-beta.3. El desarrollo continuará en fc1.

NOTA: Este es un merge -preview. fc1 sigue activa para desarrollo."
```

### Paso 5: Crear Tag Anotado

```bash
git tag -a {version} -m "{version}: {nombre} ({ciclo} {indicador})

Este release captura el trabajo completo del {ciclo}:

## {emoji} {nombre}

{Descripción del release}

### Submódulos integrados ({n})

{Lista por categoría}

### Plugins ({n})

{n} operativos:
- {lista}

{n} borradores:
- {lista}

### Agentes ({n})

- {n} core (UI + Backend + Sistema + Meta)
- {n} bridges (plugin_ox_*)
- {n}+ en plugins

### Métricas

- {n} archivos modificados
- +{n} líneas añadidas
- {otras métricas relevantes}

NOTA: {indicador si aplica}"
```

### Paso 6: Push

```bash
# Push main
git push origin main

# Push rama de desarrollo (sincronizar)
git push origin {rama-origen}

# Push tag
git push origin {version}
```

---

## Releases Anteriores (Referencia)

| Versión | Nombre | Fecha | Commit |
|---------|--------|-------|--------|
| v1.0.0-beta.1 | Primera Piedra | 2025-12-22 | a9edea6 |
| v1.0.0-beta.3 | Semillas de Futuro | 2025-12-24 | a47f20a |

---

## Convenciones

### Versionado (Semver)

```
v{major}.{minor}.{patch}[-{prerelease}]

major: Cambio de fase (0 = bootstrap, 1 = producción)
minor: Feature Cycle completado
patch: Fixes dentro del ciclo
prerelease: alpha, beta.N, rc.N
```

### Nombres de Release

- **Bootstrap**: "Primera Piedra", "Cimientos"
- **Feature Cycle**: "Semillas de X", "Arquitectura de X"
- **Producción**: "Lanzamiento", "Salida a Escena"

### Indicadores de Merge

| Indicador | Significado |
|-----------|-------------|
| _(ninguno)_ | Release final, rama origen se cierra |
| `-preview` | Release parcial, desarrollo continúa |
| `-hotfix` | Corrección urgente |

---

## Verificación Post-Release

```bash
# Confirmar tag creado
git tag -l "{version}"

# Confirmar push exitoso
git log --oneline -3

# Verificar en GitHub
# https://github.com/escrivivir-co/aleph-scriptorium/releases
```

---

## Rollback (si es necesario)

```bash
# Eliminar tag local
git tag -d {version}

# Eliminar tag remoto
git push origin :refs/tags/{version}

# Revertir merge en main
git checkout main
git revert -m 1 HEAD
git push origin main
```

---

## Ejemplo Completo

**Comando del usuario**:
```
Crea release v1.0.0-beta.4 "Puentes" desde fc1 con -preview
```

**Ejecución**:
1. Actualizar README.md (versión, métricas)
2. Actualizar docs/roadmap.md (estado)
3. `git commit -m "release(v1.0.0-beta.4): preparar Puentes"`
4. `git checkout main && git merge fc1 --no-ff -m "..."`
5. `git tag -a v1.0.0-beta.4 -m "..."`
6. `git push origin main && git push origin fc1 && git push origin v1.0.0-beta.4`

---

## Archivos Típicamente Modificados

| Archivo | Cambios |
|---------|---------|
| `README.md` | Badge versión, tablas, notas |
| `docs/roadmap.md` | Métricas, estado |
| `ARCHIVO/FOTOS_ESTADO/` | Foto de estado si aplica |
| `.github/BACKLOG-*.md` | Cerrar épicas |

---

## Relación con Otros Prompts

- `as_foto_estado.prompt.md`: Para documentar estado antes del release
- `ox-diagnostico-agentes.prompt.md`: Para verificar coherencia antes del release
- `commit-message.prompt.md`: Para generar mensajes de commit conformes
