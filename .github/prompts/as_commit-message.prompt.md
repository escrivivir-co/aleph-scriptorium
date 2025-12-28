# Prompt: Generación de Commit Message

> **Resumen**: Genera mensajes de commit conformes al protocolo DevOps del proyecto.

---

## Formato

```
<tipo>(<scope>): <descripción en imperativo>

[cuerpo opcional: qué y por qué]

refs #<TASK-ID>
```

---

## Tipos y Scopes

| Tipo | Uso | Scopes Scriptorium | Scopes Fundación |
|------|-----|-------------------|------------------|
| `feat` | Nuevo contenido | `script/agents`, `script/prompts` | `fund/caps`, `fund/plan` |
| `fix` | Corrección | `script/instructions` | `fund/archivo` |
| `docs` | Solo documentación | `script/devops` | — |
| `refactor` | Reestructuración | — | — |
| `chore` | Mantenimiento | — | — |
| `archive` | Material a ARCHIVO | — | `fund/archivo` |

→ Para protocolo completo: [DEVOPS.md](../DEVOPS.md)

---

## Procedimiento

### 1. Identificar cambios

```bash
git status && git diff --stat
```

### 2. Clasificar por opportunity

| Cambios en | Opportunity |
|------------|-------------|
| `.github/` | Scriptorium |
| `ARCHIVO/`, `PROYECTOS/` | Fundación |
| Ambos | Commits separados |

### 3. Validar índices (opcional)

```
@indice validar pre-commit
```

Warnings informativos, NO bloquean el commit.

### 4. Generar mensaje

**Ejemplo Scriptorium**:
```
feat(script/agents): refactorizar agentes core con patrón isSummarized

Reducción 70% líneas (1240→369). Nuevo AGENTS.md centralizado.

refs #SCRIPT-1.29.0-S09
```

**Ejemplo Fundación**:
```
archive(fund/archivo): añadir docs 08-11 al marco conceptual

refs #FUND-0.0.1-T001
```

---

## Reglas

- **Descripción**: máximo 72 chars, imperativo ("añadir", no "añadido")
- **Cuerpo**: qué y por qué, no cómo
- **Un commit por unidad lógica**
