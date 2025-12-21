# Prompt: Reemplazar Contenido en GitHub Pages

> **Plugin**: gh-pages  
> **Agente**: @GHPages  
> **Modo**: REPLACE (sustituir todo)

---

## Contexto

Este prompt guía el reemplazo **completo** del contenido en GitHub Pages. Mantiene la plantilla base pero **elimina todo el contenido previo**. Ideal para:
- Crear página dedicada a un solo capítulo
- Reiniciar el sitio con un eje temático diferente
- Publicar versiones limpias

---

## ⚠️ Advertencia

**Este modo ELIMINA todo el contenido existente** (excepto plantilla base).

Antes de ejecutar, el agente debe:
1. Confirmar con el usuario
2. Registrar el estado anterior en el manifest
3. Proceder con la limpieza

---

## Parámetros de Entrada

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `fuente` | Carpeta/archivo origen | `FUNDACION cap01`, `ARCHIVO/marco`, `ARCHIVO/CARTAS` |

---

## Instrucciones para el Agente

### 1. Confirmar Intención

```
⚠️ MODO REEMPLAZAR activado

Esto ELIMINARÁ todo el contenido actual de GitHub Pages:
- _posts/* (noticias)
- _capitulos/* (fundación)
- _marco/* (marco conceptual)
- index.md (página principal)

Se MANTENDRÁ:
- _layouts/*
- _includes/*
- _config.yml
- assets/*

¿Continuar? (sí/no)
```

### 2. Verificar Prerrequisitos

```bash
# Verificar que el sitio existe en docs/
ls -la docs
```

### 3. Limpiar Contenido Existente

```bash
# Eliminar contenido (NO plantilla)
rm -rf docs/_posts/*
rm -rf docs/_capitulos/*
rm -rf docs/_marco/*
rm -rf docs/_cartas/*
rm -rf docs/_diagnostico/*
rm -rf docs/_justificacion/*

# Preservar plantilla (dentro de docs/)
# docs/_layouts/, docs/_includes/, docs/_config.yml, docs/assets/ → INTACTOS
```

### 5. Procesar Nueva Fuente

**Ejemplo: FUNDACION cap01**

```bash
# Leer fuente
cat PROYECTOS/FUNDACION/CAPITULOS/cap01-anacronismo-productivo.md
```

**Convertir a Jekyll**:

```markdown
---
layout: page
title: "Capítulo 1: Anacronismo Productivo"
nav_order: 1
description: "Primer capítulo del texto fundacional"
---

[Contenido del capítulo]
```

### 6. Generar Nuevo index.md

```markdown
---
layout: default
title: Aleph Scriptorium
---

# Capítulo 1: Anacronismo Productivo

Bienvenido al primer capítulo del texto fundacional.

URL del capítulo:
https://escrivivir-co.github.io/aleph-scriptorium/fundacion/01-anacronismo-productivo/

---

*Publicado mediante [Aleph Scriptorium](https://github.com/escrivivir-co/aleph-scriptorium)*
```

Guardar como `docs/index.md`.

### 7. Registrar Publicación

Actualizar `ARCHIVO/PLUGINS/GH_PAGES/published/manifest.json`:

```json
{
  "publications": [
    {
      "id": "pub-003",
      "source": "PROYECTOS/FUNDACION/CAPITULOS/cap01-*.md",
      "destination": "_capitulos/01-*.md",
      "mode": "replace",
      "timestamp": "2025-12-21T12:00:00Z",
      "previous_content_cleared": true,
      "cleared_folders": ["_posts", "_capitulos", "_marco"],
      "urls": [
        "/fundacion/01-anacronismo-productivo/"
      ]
    }
  ]
}
```

### 8. Commit y Push

```bash
git add .
git commit -m "feat(gh-pages): publicar Capítulo 1 (reemplazo)

- Limpiar contenido previo
- Publicar cap01-anacronismo-productivo
- Regenerar index.md con enfoque en capítulo único

⚠️ MODO REEMPLAZO: contenido anterior eliminado

refs #SCRIPT-0.5.0"

git push origin main
```

---

## Output Esperado

```
✅ Contenido reemplazado correctamente

Modo: REEMPLAZAR (replace)
Fuente: PROYECTOS/FUNDACION/CAPITULOS/cap01-*

Contenido ELIMINADO:
- _posts/* (3 archivos)
- _capitulos/* (0 archivos)
- _marco/* (0 archivos)

Contenido NUEVO:
- _capitulos/01-anacronismo-productivo.md
- index.md (regenerado)

URL principal:
https://escrivivir-co.github.io/aleph-scriptorium/

Commit: feat(gh-pages): publicar Capítulo 1 (reemplazo)
```

---

## Variantes de Uso

```
@GHPages reemplazar FUNDACION cap01
@GHPages reemplazar ARCHIVO/marco
@GHPages reemplazar ARCHIVO/CARTAS
@GHPages reemplazar ARCHIVO/diagnostico
```

---

## Restaurar Contenido Anterior

Si necesitas recuperar contenido eliminado:

```bash
# Ver historial
git log --oneline gh-pages

# Restaurar commit específico
git checkout <commit-sha> -- _posts/
```
