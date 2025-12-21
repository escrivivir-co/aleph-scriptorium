---
name: GitHub Pages (publicación web)
description: Instrucciones para publicar contenido del Scriptorium en GitHub Pages.
applyTo: "ARCHIVO/PLUGINS/GH_PAGES/**/*"
---

# Instrucciones: Plugin GH-Pages

> **Fuente de verdad**: `.github/plugins/gh-pages/manifest.md`  
> **URL del sitio**: `https://escrivivir-co.github.io/aleph-scriptorium/`

---

## Qué es este plugin

El plugin GH-Pages permite publicar contenido del Aleph Scriptorium en GitHub Pages. Opera en dos modos:

| Modo | Descripción | Comando |
|------|-------------|---------|
| **Fusionar** | Añade contenido sin eliminar existente | `@GHPages fusionar <fuente>` |
| **Reemplazar** | Sustituye todo el contenido | `@GHPages reemplazar <fuente>` |

---

## Flujo de Inicialización

### Primera vez (obligatorio)

```
@GHPages inicializar
```

**Pasos automáticos**:

1. **Verificar el mecanismo de publicación**:
  - El sitio vive en `docs/` dentro del branch `main`.
  - GitHub Pages debe estar configurado como: `main /docs`.

2. **Desplegar plantilla Jekyll en `docs/`**:
  - Copiar `meta/jekyll-template/` a `docs/`
  - Configurar `docs/_config.yml` con datos del proyecto

3. **Crear configuración runtime**:
   ```json
   // ARCHIVO/PLUGINS/GH_PAGES/config.json
   {
     "initialized": true,
     "site_url": "https://escrivivir-co.github.io/aleph-scriptorium/",
     "branch": "gh-pages",
     "last_publish": null
   }
   ```

4. **Actualizar README.md**:
   - Añadir URL canónica en sección de Status
   - Añadir badge de GitHub Pages

5. **Commit inicial**:
   ```
   feat(gh-pages): inicializar GitHub Pages con plantilla Jekyll
   ```

---

## Flujo de Publicación: Fusionar

### Caso: Noticias del mes

```
Usuario: @GHPages fusionar NOTICIAS diciembre

GHPages:
1. Leer archivos en ARCHIVO/NOTICIAS/*2025-12*.md
2. Para cada archivo:
   a. Extraer frontmatter (fecha, categoría, tema)
   b. Convertir a formato Jekyll post
  c. Guardar en docs/_posts/YYYY-MM-DD-slug.md
3. Actualizar índice de navegación
4. Commit: "feat(gh-pages): añadir noticias dic-2025"
5. Push a main
6. Reportar URLs publicadas
```

### Conversión NOTICIAS → Posts

**Entrada** (ARCHIVO/NOTICIAS/):
```yaml
---
codigo_scrum: S08-T027
fecha: 2025-12-20
categoria: geopolitica
tema: nobel-venezuela
perfil_recomendado: blackflag
---
# Título de la noticia
[contenido...]
```

**Salida** (_posts/):
```yaml
---
layout: post
title: "Título de la noticia"
date: 2025-12-20
categories: [geopolitica]
tags: [nobel, venezuela]
perfil: blackflag
source: S08-T027
---
[contenido convertido...]
```

---

## Flujo de Publicación: Reemplazar

### Caso: Página dedicada a un capítulo

```
Usuario: @GHPages reemplazar FUNDACION cap01

GHPages:
1. Limpiar contenido existente dentro de docs/ (NO plantilla):
  - Eliminar docs/_posts/*
  - Eliminar docs/_capitulos/*
  - Eliminar docs/_marco/*
2. Leer PROYECTOS/FUNDACION/CAPITULOS/cap01-*.md
3. Convertir a formato Jekyll page
4. Guardar en docs/_capitulos/01-anacronismo-productivo.md
5. Regenerar docs/index.md con solo este capítulo
6. Commit: "feat(gh-pages): publicar Capítulo 1 (reemplazo)"
7. Push a main
8. Reportar URL
```

### Conversión FUNDACION → Pages

**Entrada** (PROYECTOS/FUNDACION/CAPITULOS/):
```markdown
# Capítulo 1: Anacronismo Productivo

## Apertura
[contenido...]
```

**Salida** (_capitulos/):
```yaml
---
layout: page
title: "Capítulo 1: Anacronismo Productivo"
nav_order: 1
parent: Fundación
toc: true
---
[contenido convertido...]
```

---

## Fuentes Soportadas

| Fuente | Tipo Jekyll | Destino | Ejemplo |
|--------|-------------|---------|---------|
| `ARCHIVO/NOTICIAS/` | posts | `_posts/` | Planas noticieras |
| `PROYECTOS/FUNDACION/CAPITULOS/` | pages | `_capitulos/` | Capítulos del libro |
| `ARCHIVO/marco/` | collection | `_marco/` | Marco conceptual |
| `ARCHIVO/CARTAS/` | pages | `_cartas/` | Cartas-puerta |
| `ARCHIVO/diagnostico/` | collection | `_diagnostico/` | Diagnóstico |
| `ARCHIVO/justificacion/` | collection | `_justificacion/` | Justificación |

---

## Estructura del Sitio (docs/)

```
docs/
├── _config.yml              # Configuración Jekyll
├── _layouts/
│   ├── default.html         # Layout base
│   ├── page.html            # Para páginas estáticas
│   └── post.html            # Para noticias
├── _includes/
│   ├── header.html          # Cabecera con navegación
│   ├── footer.html          # Pie con metadata
│   └── nav.html             # Navegación lateral
├── _posts/                  # Noticias (automático)
├── _capitulos/              # Capítulos Fundación
├── _marco/                  # Marco conceptual
├── _cartas/                 # Cartas-puerta
├── assets/
│   ├── css/
│   │   └── main.css         # Estilos B/N
│   └── images/              # Imágenes (si las hay)
├── index.md                 # Página principal
└── 404.html                 # Página de error
```

---

## Configuración Jekyll (`_config.yml`)

```yaml
# Metadatos del sitio
title: Aleph Scriptorium
description: >
  El taller de escritura donde la IA trabaja para ti, no al revés.
url: https://escrivivir-co.github.io
baseurl: /aleph-scriptorium
author: Escrivivir.co

# Repositorio
repository: escrivivir-co/aleph-scriptorium

# Colecciones personalizadas
collections:
  capitulos:
    output: true
    permalink: /fundacion/:name/
  marco:
    output: true
    permalink: /archivo/marco/:name/
  cartas:
    output: true
    permalink: /cartas/:name/

# Configuración de posts
permalink: /:year/:month/:day/:title/
paginate: 10

# Build
markdown: kramdown
highlighter: rouge

# Excluir del build
exclude:
  - README.md
  - LICENSE
  - Gemfile
  - Gemfile.lock
```

---

## Estilos: Paleta Scriptorium

```css
/* Paleta minimalista blanco/negro */
:root {
  --bg: #ffffff;
  --fg: #1a1a1a;
  --accent: #333333;
  --muted: #666666;
  --border: #e5e5e5;
}

/* Banderas (colores sutiles en bordes) */
.blueflag { border-left: 4px solid #2563eb; }
.blackflag { border-left: 4px solid #1a1a1a; }
.redflag { border-left: 4px solid #dc2626; }
.yellowflag { border-left: 4px solid #ca8a04; }
.orangeflag { border-left: 4px solid #ea580c; }
```

---

## Registro de Publicaciones

Cada publicación se registra en `ARCHIVO/PLUGINS/GH_PAGES/published/manifest.json`:

```json
{
  "version": "1.0.0",
  "last_updated": "2025-12-21T10:00:00Z",
  "site_url": "https://escrivivir-co.github.io/aleph-scriptorium/",
  "publications": [
    {
      "id": "pub-001",
      "source": "ARCHIVO/NOTICIAS/S08-T027-*.md",
      "destination": "_posts/2025-12-20-*.md",
      "mode": "merge",
      "timestamp": "2025-12-21T10:00:00Z",
      "commit_sha": "abc123def",
      "urls": [
        "/2025/12/20/geopolitica-nobel-venezuela/"
      ]
    }
  ]
}
```

---

## Comandos de Terminal

### Verificar estado de gh-pages

```bash
git branch -a | grep gh-pages
```

### Cambiar a branch gh-pages

```bash
git checkout gh-pages
```

### Publicar cambios

```bash
git add .
git commit -m "feat(gh-pages): <descripción>"
git push origin gh-pages
```

### Volver a main

```bash
git checkout main
```

---

## Lo que NO hacer

1. **No modificar plantilla en publicaciones**: Solo en `init`.
2. **No publicar sin verificar branch**: Siempre confirmar `gh-pages` existe.
3. **No mezclar modos**: `fusionar` y `reemplazar` son mutuamente excluyentes.
4. **No publicar borradores**: Solo contenido en carpetas oficiales.
5. **No olvidar el registro**: Siempre actualizar `manifest.json`.

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "Branch gh-pages no existe" | Ejecutar `@GHPages inicializar` |
| "Conflicto de merge" | Usar modo `reemplazar` para limpiar |
| "Página no se actualiza" | Verificar que GitHub Pages está habilitado en Settings |
| "CSS no carga" | Revisar `baseurl` en `_config.yml` |
| "Cambios en plantilla no se ven" | La plantilla (`meta/jekyll-template/`) es solo modelo. Portar cambios a `docs/` manualmente. |
| "Enlaces de GitHub rotos en footer" | `site.repository` es `owner/repo`, no URL. Usar: `{% assign github_url = "https://github.com/" | append: site.repository %}` |

---

## ⚠️ Protocolo de Actualización del Sitio

### Arquitectura de dos capas

| Capa | Ubicación | Rol |
|------|-----------|-----|
| **Plantilla** | `.github/plugins/gh-pages/meta/jekyll-template/` | Modelo de referencia (inmutable en runtime) |
| **Producción** | `docs/` (branch `main`) | Sitio real servido por GitHub Pages |

**Regla crítica**: Los cambios en `meta/jekyll-template/` **no se despliegan automáticamente**. Deben portarse a `docs/`.

### Flujo para actualizar estilos/estructura

1. **(Opcional)** Editar plantilla en `meta/jekyll-template/` para mantener el modelo.
2. **(Obligatorio)** Portar los mismos cambios a `docs/`:
   - `docs/assets/css/main.css`
   - `docs/_includes/footer.html`, `header.html`, etc.
3. Commit y push a `main`.
4. Esperar rebuild de Pages (~40s).
5. Validar en producción (hard refresh si es necesario).

### Diagnóstico

```bash
# ¿El commit está en origin?
git fetch origin && git branch -r --contains <sha>

# ¿Cuándo fue el último build?
# → Ver en GitHub Actions: pages-build-deployment

# ¿Hay diferencias entre plantilla y producción?
diff .github/plugins/gh-pages/meta/jekyll-template/_includes/footer.html docs/_includes/footer.html
```
