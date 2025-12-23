---
name: GitHub Pages (publicación web)
description: Instrucciones para publicar contenido del Scriptorium en GitHub Pages.
applyTo: "ARCHIVO/PLUGINS/GH_PAGES/**/*"
---

# Instrucciones: Plugin GH-Pages

> **Fuente de verdad del sitio**: `docs/` (raíz del repositorio)  
> **URL del sitio**: `https://escrivivir-co.github.io/aleph-scriptorium/`

---

## Arquitectura (Fuente Única de Verdad)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLUGIN GH-PAGES                               │
├─────────────────────────────────────────────────────────────────┤
│  .github/plugins/gh-pages/         ← CÓDIGO (inmutable)         │
│  ├── manifest.md                   Metadatos del plugin          │
│  ├── agents/ghpages.agent.md       Agente orquestador            │
│  ├── prompts/                      Comandos disponibles          │
│  ├── instructions/                 Este archivo                  │
│  └── docs/README.md                Documentación del plugin      │
├─────────────────────────────────────────────────────────────────┤
│  docs/                             ← FUENTE DE VERDAD (web)      │
│  ├── _config.yml                   Configuración Jekyll          │
│  ├── _includes/                    Headers, footers              │
│  ├── _layouts/                     Plantillas Jekyll             │
│  ├── assets/css/main.css           Estilos globales              │
│  └── *.md                          Páginas del sitio             │
├─────────────────────────────────────────────────────────────────┤
│  ARCHIVO/PLUGINS/GH_PAGES/         ← DATOS (runtime)             │
│  └── config.json                   Estado de publicación         │
└─────────────────────────────────────────────────────────────────┘
```

**Decisión arquitectural (SCRIPT-0.14.0)**: No hay plantilla duplicada. `docs/` es la única fuente de verdad.

---

## Qué es este plugin

El plugin GH-Pages permite publicar contenido del Aleph Scriptorium en GitHub Pages. Opera en dos modos:

| Modo | Descripción | Comando |
|------|-------------|---------|
| **Fusionar** | Añade contenido sin eliminar existente | `@GHPages fusionar <fuente>` |
| **Reemplazar** | Sustituye todo el contenido | `@GHPages reemplazar <fuente>` |

---

## Flujo de Publicación

### Mecanismo

El sitio web vive en `docs/` (raíz del repositorio). GitHub Pages está configurado para servir desde `main /docs`.

**Para publicar contenido**:
1. El agente @GHPages transforma fuentes (NOTICIAS, FUNDACION, etc.) a formato Jekyll
2. Escribe los archivos en `docs/`
3. Hace commit y push a `main`
4. GitHub Pages reconstruye el sitio (~40s)

### Comandos disponibles

```
@GHPages fusionar NOTICIAS diciembre     # Añadir noticias
@GHPages fusionar FUNDACION cap01        # Añadir capítulo
@GHPages reemplazar ARCHIVO/marco        # Reemplazar con marco
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

**Salida** (docs/_posts/):
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
1. Limpiar contenido generado dentro de docs/:
   - Eliminar docs/_posts/*
   - Eliminar docs/_capitulos/*
   - Eliminar docs/_marco/*
   (Mantener estructura base: _config.yml, _layouts/, _includes/, assets/)
2. Leer PROYECTOS/FUNDACION/CAPITULOS/cap01-*.md
3. Convertir a formato Jekyll page
4. Guardar en docs/_capitulos/01-anacronismo-productivo.md
5. Regenerar docs/index.md con solo este capítulo
6. Commit: "feat(gh-pages): publicar Capítulo 1 (reemplazo)"
7. Push a main
8. Reportar URL
```

---

## Fuentes Soportadas

| Fuente | Tipo Jekyll | Destino | Ejemplo |
|--------|-------------|---------|---------|
| `ARCHIVO/NOTICIAS/` | posts | `docs/_posts/` | Planas noticieras |
| `PROYECTOS/FUNDACION/CAPITULOS/` | pages | `docs/_capitulos/` | Capítulos del libro |
| `ARCHIVO/marco/` | collection | `docs/_marco/` | Marco conceptual |
| `ARCHIVO/CARTAS/` | pages | `docs/_cartas/` | Cartas-puerta |
| `ARCHIVO/diagnostico/` | collection | `docs/_diagnostico/` | Diagnóstico |
| `ARCHIVO/justificacion/` | collection | `docs/_justificacion/` | Justificación |

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
│   └── footer.html          # Pie con metadata
├── _posts/                  # Noticias (generadas)
├── _capitulos/              # Capítulos Fundación (generados)
├── _marco/                  # Marco conceptual (generado)
├── _cartas/                 # Cartas-puerta (generadas)
├── assets/
│   ├── css/
│   │   └── main.css         # Estilos B/N
│   └── images/              # Imágenes (si las hay)
├── index.md                 # Página principal
├── agentes.md               # Showcase de agentes
├── fundacion.md             # Índice de capítulos
├── periodico.md             # Vista estilizada de noticias
├── noticias.md              # Listado de noticias
├── archivo.md               # Documentación del ARCHIVO
└── 404.html                 # Página de error
```

---

## Configuración Jekyll (docs/_config.yml)

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
      "destination": "docs/_posts/2025-12-20-*.md",
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

## Flujo de Actualización del Sitio

### Para modificar contenido o estructura

1. Editar directamente en `docs/`
2. Commit y push a `main`
3. GitHub Pages reconstruye (~40s)
4. Verificar en producción (hard refresh si es necesario)

### Comandos de Terminal

```bash
# Ver archivos del sitio
ls -la docs/

# Ver cambios pendientes
git status

# Publicar cambios
git add docs/
git commit -m "feat(gh-pages): <descripción>"
git push origin main
```

---

## Lo que NO hacer

1. **No crear plantillas separadas**: Solo existe `docs/` como fuente de verdad.
2. **No modificar _posts, _capitulos, etc. manualmente**: Son generados por el agente.
3. **No mezclar modos**: `fusionar` y `reemplazar` son mutuamente excluyentes.
4. **No publicar borradores**: Solo contenido en carpetas oficiales.
5. **No olvidar el registro**: Siempre actualizar `manifest.json`.

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Sitio no actualiza | Verificar GitHub Pages en Settings |
| CSS no carga | Revisar `baseurl` en `docs/_config.yml` |
| Build falló | Revisar logs en GitHub Actions |
| Cache del navegador | Hard refresh (Cmd+Shift+R) |

---

## Sistema de Diseño CSS

> **Fuente de verdad**: `docs/assets/css/main.css`

El sitio usa un sistema de diseño modular con variables CSS y clases prefijadas por contexto.

### Variables CSS (paleta global)

```css
:root {
  /* Base */
  --bg: #ffffff;
  --fg: #1a1a1a;
  --accent: #1a1a1a;
  --muted: #666666;
  --border: #e5e5e5;
  
  /* Banderas */
  --blue: #2563eb;
  --red: #dc2626;
  --yellow: #ca8a04;
  --orange: #ea580c;
  --black: #1a1a1a;
  --green: #22c55e;
  
  /* Promocionales (dark theme) */
  --promo-bg: #0d1117;
  --promo-fg: #e6edf3;
  --promo-card-bg: rgba(255, 255, 255, 0.03);
  --promo-card-border: rgba(255, 255, 255, 0.08);
  --promo-muted: rgba(255, 255, 255, 0.6);
  --promo-accent: #00d4ff;
}
```

### Arquitectura de clases prefijadas

El sistema usa **prefijos por página** para evitar colisiones:

| Página | Prefijo | Tema | Ejemplo |
|--------|---------|------|---------|
| `index.md` | `.home-*` | Light | `.home-hero`, `.home-product-card` |
| `agentes.md` | `.agentes-*` | Dark | `.agentes-hero`, `.agentes-card` |
| `fundacion.md` | `.fundacion-*` | Dark | `.fundacion-hero`, `.fundacion-timeline` |
| `periodico.md` | `.periodico-*` | Dark (hacker) | `.periodico-article`, `.periodico-flag` |
| `leeme.md` | `.leeme-*` | Light | `.leeme-section`, `.leeme-card` |
| `roadmap.md` | `.roadmap-*` | Light | `.roadmap-badge`, `.roadmap-section` |
| `archivo.md` | `.archivo-*` | Light | `.archivo-section`, `.archivo-card` |
| `acerca.md` | `.acerca-*` | Light | `.acerca-card`, `.acerca-section` |

### Clases base compartidas

```css
/* Páginas promocionales (dark) */
.promo-page {
  background: var(--promo-bg);
  color: var(--promo-fg);
}

/* Cards reutilizables */
.promo-card {
  background: var(--promo-card-bg);
  border: 1px solid var(--promo-card-border);
  border-radius: 8px;
  padding: 1.5rem;
}

/* Grids responsivos */
.promo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

### Cómo crear una nueva página

1. **Elegir tema**: Light (fondo blanco) o Dark (promo-bg)
2. **Definir prefijo**: `{nombre-pagina}-*`
3. **Estructura mínima**:

```markdown
---
layout: page
title: Mi Página
permalink: /mi-pagina/
---

<style>
.mi-pagina-page { /* wrapper */ }
.mi-pagina-section { /* secciones */ }
.mi-pagina-card { /* tarjetas */ }
</style>

<div class="mi-pagina-page">
  <div class="mi-pagina-section">
    <!-- contenido -->
  </div>
</div>
```

4. **Para tema dark, añadir**:

```css
.mi-pagina-page {
  background: var(--promo-bg);
  color: var(--promo-fg);
}
```

### Estilos para código en citas

Para evitar ilegibilidad de código inline dentro de citas:

```css
blockquote code {
  background: rgba(0, 0, 0, 0.1);
  color: inherit;
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

/* En tema dark */
.promo-page blockquote code {
  background: rgba(255, 255, 255, 0.1);
}
```

### Reglas de legibilidad

1. **Contraste mínimo**: 4.5:1 para texto normal, 3:1 para texto grande
2. **Código en citas**: siempre con fondo diferenciado
3. **Enlaces**: usar `--accent` o colores de bandera, nunca gris puro
4. **Texto secundario**: `--muted` (no más claro que #666 en light, #999 en dark)

### Migración de estilos embebidos

> **Deuda técnica**: Algunas páginas (acerca, leeme, roadmap, archivo) tienen `<style>` embebido. 
> Plan para Sprint 1: extraer a main.css con sus prefijos correspondientes.

**Patrón de extracción**:
1. Copiar bloque `<style>` de la página
2. Añadir al final de `main.css` con comentario de sección
3. Verificar que no hay colisiones de nombres
4. Eliminar `<style>` embebido de la página
5. Testear responsive

---

## Reglas de Kramdown (Jekyll) — CRÍTICO

> **Lección aprendida**: BUG-002 + hotfixes de 2025-12-23

Jekyll usa **kramdown** como procesador Markdown. Kramdown tiene reglas específicas que **rompen el Markdown si no se respetan**.

### Regla 1: `markdown="1"` en elementos HTML

Kramdown **NO procesa Markdown dentro de etiquetas HTML** por defecto. Si escribes:

```html
<!-- ❌ INCORRECTO: Markdown no se procesará -->
<div class="container">
## Título
- Item 1
- Item 2
</div>
```

El resultado será texto plano: `## Título - Item 1 - Item 2`

**Solución**: Añadir `markdown="1"` al elemento contenedor:

```html
<!-- ✅ CORRECTO: Kramdown procesará el Markdown -->
<div class="container" markdown="1">

## Título

- Item 1
- Item 2

</div>
```

**Reglas adicionales**:
- Dejar **línea en blanco** después del tag de apertura
- Dejar **línea en blanco** antes del tag de cierre
- Aplicar a TODOS los contenedores: `<div>`, `<section>`, `<article>`, etc.

### Regla 2: `markdownify` para contenido incluido

Cuando usas `{% include %}` para insertar archivos Markdown dentro de un layout HTML, el contenido **NO se procesa automáticamente**.

```liquid
<!-- ❌ INCORRECTO: Contenido raw -->
{% include mi-archivo.md %}
```

**Solución**: Usar `capture` + `markdownify`:

```liquid
<!-- ✅ CORRECTO: Markdown procesado -->
{% capture content %}{% include mi-archivo.md %}{% endcapture %}
{{ content | markdownify }}
```

### Regla 3: Evitar HTML inline con Markdown

No mezclar HTML y Markdown en la misma línea:

```html
<!-- ❌ INCORRECTO -->
<em>Las obras clausuradas se archivarán aquí.</em>

<!-- ✅ CORRECTO -->
*Las obras clausuradas se archivarán aquí.*
```

### Checklist antes de publicar

- [ ] Todo `<div>`, `<section>` con Markdown interno tiene `markdown="1"`
- [ ] Línea en blanco después de cada tag de apertura
- [ ] Línea en blanco antes de cada tag de cierre
- [ ] Contenido de `{% include %}` pasa por `| markdownify`
- [ ] No hay HTML inline (`<em>`, `<strong>`) donde funciona Markdown

### Archivos típicos afectados

| Archivo | Requiere atención |
|---------|-------------------|
| `docs/*.md` | Revisar si usan `<div>` con contenido Markdown |
| `docs/_layouts/*.html` | Usar `markdownify` en includes |
| `docs/_includes/**/*.md` | No — ya son Markdown puro |
| `docs/teatro.md` | Sí — contenedores con `markdown="1"` |
| `docs/teatro/*.md` | Depende — revisar si usan HTML |

---

## Protocolo de Actualización de Portada del Periódico

> **Flujo**: Sesión editorial → Ticket → Decisión → Implementación → Commit

### Cuándo usar

Cuando se necesite actualizar:
- **Cabecera** (titular principal del número): `<div class="periodico-headline">`
- **Tesis del número** (diagnóstico convergente): `<div class="periodico-thesis">`

### Estructura de trabajo

```
ARCHIVO/DISCO/{Mes}_{Año}_Portada/
├── 01_Cabecera.md              # Sesión editorial para titular
├── 02_Pie.md                   # Sesión editorial para tesis
├── 03_Tarea.md                 # Notas del usuario (opcional)
└── TICKET-TESIS-NUMERO.md      # Ticket formal con propuestas
```

### Flujo detallado

#### Paso 1: Sesiones editoriales
Convocar a los agentes para debatir propuestas:
- Sesión Cabecera: @ox, @aleph, @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag
- Sesión Pie (BIS): Los mismos + personajes del Teatro (@tarotista, @nonsi)

#### Paso 2: Generar ticket
Crear `TICKET-TESIS-NUMERO.md` con:
- Propuestas alternativas (Actual, A, B, etc.)
- Sacrificios declarados de cada opción
- Tests de calidad a aplicar

#### Paso 3: Invocar auditor de registro
```
@orangeflag Audita las propuestas de cabecera y pie para el periódico.
Adjunto: ARCHIVO/DISCO/{Mes}_{Año}_Portada/TICKET-TESIS-NUMERO.md
```

Tests que aplica Orangeflag:
| Test | Pregunta |
|------|----------|
| Modo | ¿Examinamos o persuadimos? → Periódico = persuadir (retórico) |
| Auditorio | ¿Quién lee? → Comunidad plural |
| Género | ¿Deliberativo, judicial, epidíctico? → Deliberativo |
| Estilo | ¿Claridad, corrección, propiedad, elevación? |
| Entimema | ¿Premisas compartidas por el auditorio? |

#### Paso 4: Decisión editorial
El usuario decide:
1. Cabecera: ¿Opción Actual, A, B?
2. Pie: ¿3 tesis, 5 tesis, refinamiento?

#### Paso 5: Implementar cambios
@aleph o @GHPages aplica los cambios en `docs/periodico.md`:
- Zona Cabecera: líneas ~15-20
- Zona Pie: líneas ~95-110

#### Paso 6: Validar localmente
```bash
cd docs && bundle exec jekyll serve
# Verificar en http://localhost:4000/aleph-scriptorium/periodico/
```

#### Paso 7: Commit
```
feat(ghpages/periodico): actualizar tesis del número {Mes} {Año}

- [Cabecera: describir cambio]
- [Pie: describir cambio]
- Basado en sesiones editoriales en ARCHIVO/DISCO/{Mes}_{Año}_Portada/

refs #{ID-TICKET}
```

### Zonas en periodico.md

```html
<!-- ZONA CABECERA (líneas ~15-20) -->
<div class="periodico-section-header">Tesis del número</div>
<div class="periodico-headline">
  <h2>«{TITULAR}»</h2>
</div>

<!-- ZONA PIE (líneas ~95-110) -->
<div class="periodico-section-header">Tesis del número</div>
<div class="periodico-thesis">
  <h3>// diagnóstico convergente</h3>
  <ol>
    <li><strong>{Tesis 1}</strong> {Desarrollo}</li>
    <!-- ... -->
  </ol>
</div>
```

### Ejemplo de ticket

Ver modelo en: `ARCHIVO/DISCO/Diciembre_25_Portada/TICKET-TESIS-NUMERO.md`

---

## Referencias

- [Documentación del plugin](../docs/README.md)
- [Agente GHPages](../agents/ghpages.agent.md)
- [Manifest](../manifest.md)
