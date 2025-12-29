# Prompt: Crear Blueprint

> **Plugin**: GH-Pages  
> **Comando**: `@GHPages crear blueprint`  
> **Instrucción base**: `blueprint-templates.instructions.md`

---

## Objetivo

Crear una nueva presentación blueprint con navegación 3D impress.js.

---

## Input Requerido

```
@GHPages crear blueprint <nombre> --patron=<cruz|columna|cubo>
```

| Parámetro | Descripción | Obligatorio |
|-----------|-------------|-------------|
| `<nombre>` | Nombre del blueprint (ej: "tutorial", "arquitectura") | ✅ |
| `--patron` | Patrón de navegación a usar | ✅ |

---

## Patrones Disponibles

### `--patron=cruz`

**Referencia**: [`docs/blueprint.md`](../../docs/blueprint.md)

```
              ↑
              │
        ← ── ● ── →
              │
              ↓
```

Uso: Taxonomías, sistemas con centro y satélites.

---

### `--patron=columna`

**Referencia**: [`docs/blueprint-mmco.md`](../../docs/blueprint-mmco.md)

```
    ●  ← Nivel 1
    │
    ●  ← Nivel 2
    │
    ●  ← Nivel 3
    │
    ●  ← Nivel 4
```

Uso: Jerarquías, procesos secuenciales, niveles ontológicos.

---

### `--patron=cubo`

**Referencia**: [`docs/blueprint-copilot.md`](../../docs/blueprint-copilot.md)

```
    Flujo horizontal →
    ● ─── ● ─── ● ─── ●
          │
          ↓ subdiapo
          ●
```

Uso: Tutoriales con detalle opcional, flujos multinivel.

---

## Procedimiento

### Paso 1: Crear archivo

```bash
# Generar docs/blueprint-<nombre>.md
touch docs/blueprint-<nombre>.md
```

### Paso 2: Añadir frontmatter

```yaml
---
layout: presentation
title: <Título>
description: <Descripción para SEO>
permalink: /blueprint-<nombre>/
---
```

### Paso 3: Copiar estructura del patrón

Según `--patron`, copiar la estructura de coordenadas de la referencia:

| Patrón | Copiar de |
|--------|-----------|
| cruz | `docs/blueprint.md` |
| columna | `docs/blueprint-mmco.md` |
| cubo | `docs/blueprint-copilot.md` |

### Paso 4: Personalizar contenido

1. Cambiar IDs de slides
2. Actualizar contenido de cada slide
3. Ajustar número de slides según necesidad
4. Mantener overview al final

### Paso 5: Añadir enlaces toggle

```html
<div class="blueprint-toggle">
  <a href="{{ '/blueprint/' | relative_url }}" class="toggle-btn">📐 Vista UX</a>
  <a href="{{ '/blueprint-mmco/' | relative_url }}" class="toggle-btn">🧬 Vista MMCO</a>
  <a href="{{ '/blueprint-copilot/' | relative_url }}" class="toggle-btn">🧠 Vista Copilot</a>
  <span class="toggle-current">🆕 Vista <nombre></span>
</div>
```

### Paso 6: Actualizar index.md

Añadir nav-card al índice principal:

```html
<a href="{{ site.baseurl }}/blueprint-<nombre>/" class="nav-card">
  <span class="card-icon">🔷</span>
  <span class="card-title"><Nombre></span>
  <span class="card-desc"><Descripción corta></span>
</a>
```

### Paso 7: Validar

```bash
./scripts/validate-site.sh
./scripts/serve-site.sh
# Navegar a http://localhost:4000/blueprint-<nombre>/
```

---

## Output

| Archivo | Estado |
|---------|--------|
| `docs/blueprint-<nombre>.md` | ✅ Creado |
| `docs/index.md` | ✅ Actualizado (nav-card) |
| Otros blueprints | ✅ Actualizados (toggles) |

---

## Ejemplo Completo

```
@GHPages crear blueprint tutorial --patron=cubo

Creando blueprint "tutorial" con patrón CUBO...

✅ Creado: docs/blueprint-tutorial.md
✅ Actualizado: docs/index.md (nav-card añadido)
✅ Validación: Jekyll OK

Próximos pasos:
1. Editar docs/blueprint-tutorial.md
2. Personalizar slides
3. Validar con ./scripts/serve-site.sh
4. Commit: feat(gh-pages): crear blueprint-tutorial
```

---

## Notas

- Consultar `blueprint-templates.instructions.md` para referencia de clases CSS
- Reusar clases existentes antes de crear nuevas
- Mantener convención de nombres: `blueprint-<nombre>.md`
