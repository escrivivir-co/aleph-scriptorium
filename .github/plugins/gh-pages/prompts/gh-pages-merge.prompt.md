# Prompt: Fusionar Contenido en GitHub Pages

> **Plugin**: gh-pages  
> **Agente**: @GHPages  
> **Modo**: MERGE (añadir sin eliminar)

---

## Contexto

Este prompt guía la fusión de nuevo contenido en GitHub Pages **sin eliminar** el contenido existente. Ideal para:
- Actualizar el periódico con noticias del mes
- Añadir nuevos capítulos progresivamente
- Expandir secciones del ARCHIVO

---

## Parámetros de Entrada

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `fuente` | Carpeta origen del contenido | `NOTICIAS`, `FUNDACION`, `ARCHIVO/marco` |
| `filtro` | Filtro temporal o específico | `diciembre`, `2025-12`, `cap01`, `todas` |

---

## Instrucciones para el Agente

### 1. Verificar Prerrequisitos

```bash
# Verificar que el sitio existe en docs/
ls -la docs

# Si no existe, sugerir inicialización
# → @GHPages inicializar
```

### 2. Identificar Archivos Fuente

**Para NOTICIAS**:
```bash
# Listar archivos del mes
ls ARCHIVO/NOTICIAS/*2025-12*.md
```

**Para FUNDACION**:
```bash
# Listar capítulos específicos
ls PROYECTOS/FUNDACION/CAPITULOS/cap01-*.md
```

**Para ARCHIVO/marco**:
```bash
# Listar documentos del marco
ls ARCHIVO/marco/*.md
```

### 3. Convertir a Formato Jekyll

**NOTICIAS → _posts/**:

```markdown
# Entrada: ARCHIVO/NOTICIAS/S08-T027-2025-12-geopolitica-nobel-venezuela.md
# Salida: _posts/2025-12-20-geopolitica-nobel-venezuela.md

---
layout: post
title: "[Extraer del H1]"
date: 2025-12-20
categories: [geopolitica]
tags: [nobel, venezuela]
perfil: blackflag
source: S08-T027
---

[Contenido del archivo, sin frontmatter original]
```

**FUNDACION → _capitulos/**:

```markdown
# Entrada: PROYECTOS/FUNDACION/CAPITULOS/cap01-anacronismo-productivo.md
# Salida: _capitulos/01-anacronismo-productivo.md

---
layout: page
title: "Capítulo 1: Anacronismo Productivo"
nav_order: 1
parent: Fundación
toc: true
---

[Contenido del capítulo]
```

### 4. Añadir Archivos Convertidos

```bash
# Copiar archivos convertidos a sus carpetas
cp converted/_posts/* docs/_posts/
cp converted/_capitulos/* docs/_capitulos/

# NO eliminar archivos existentes
```

### 6. Actualizar Índice de Navegación

Actualizar `docs/index.md` (o equivalente) para incluir nuevo contenido.

### 7. Registrar Publicación

Actualizar `ARCHIVO/PLUGINS/GH_PAGES/published/manifest.json`:

```json
{
  "publications": [
    {
      "id": "pub-002",
      "source": "ARCHIVO/NOTICIAS/*2025-12*.md",
      "destination": "_posts/2025-12-*.md",
      "mode": "merge",
      "timestamp": "2025-12-21T10:00:00Z",
      "files_added": 5,
      "urls": [...]
    }
  ]
}
```

### 8. Commit y Push

```bash
git add .
git commit -m "feat(gh-pages): añadir noticias dic-2025 (fusión)

- Fusionar 5 planas noticieras de diciembre 2025
- Actualizar índice de navegación
- Mantener contenido existente

refs #SCRIPT-0.5.0"

git push origin main
```

---

## Output Esperado

```
✅ Contenido fusionado correctamente

Modo: FUSIONAR (merge)
Fuente: ARCHIVO/NOTICIAS/
Filtro: diciembre 2025

Archivos añadidos: 5
- _posts/2025-12-20-geopolitica-nobel-venezuela.md
- _posts/2025-12-20-tecnologia-openai-gobernanza.md
- _posts/2025-12-21-metodo-validacion-perspectivas.md
- _posts/2025-12-21-epistemologia-demarcacion-falsabilidad.md
- _posts/2025-12-21-poesia-vias-alternativas.md

URLs publicadas:
- https://escrivivir-co.github.io/aleph-scriptorium/2025/12/20/geopolitica-nobel-venezuela/
- ...

Contenido existente: PRESERVADO
Commit: feat(gh-pages): añadir noticias dic-2025 (fusión)
```

---

## Variantes de Uso

```
@GHPages fusionar NOTICIAS diciembre
@GHPages fusionar NOTICIAS 2025-12
@GHPages fusionar NOTICIAS todas
@GHPages fusionar FUNDACION cap01-cap04
@GHPages fusionar ARCHIVO/marco
@GHPages fusionar ARCHIVO/CARTAS
```
