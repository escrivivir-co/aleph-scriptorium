---
name: blog-init
description: Inicializa scraping de un blog, extrayendo índice de entradas desde la portada
mode: agent
tools: ['playwright/*', 'read', 'edit', 'vscode']
---

# Inicializar Scraping de Blog

Este prompt guía la extracción del índice de entradas de un blog para su posterior descarga.

## Input esperado

- **URL de portada**: La página principal o índice del blog
- **Tema/Categoría**: Descripción breve del contenido (ej: "filosofía-ciencia", "economía-crítica")

## Proceso

### 1. Navegar a la portada

```
Usar: mcp_playwright_browser_navigate
URL: {url_portada}
```

### 2. Capturar snapshot de la página

```
Usar: mcp_playwright_browser_snapshot
Objetivo: Identificar estructura del índice
```

### 3. Identificar patrón del blog

Detectar el tipo de plataforma y estructura:

| Plataforma | Patrón típico | Selector de entradas |
|------------|---------------|----------------------|
| WordPress | `/YYYY/MM/slug/` | `article.post`, `.entry-title a` |
| Blogger/Blogspot | `/YYYY/MM/slug.html` | `.post`, `.post-title a` |
| Medium | `/@author/slug-id` | `article`, `h2 a` |
| Ghost | `/slug/` | `article.post-card`, `.post-card-title a` |
| Substack | `/p/slug` | `.post-preview`, `.post-preview-title a` |
| Hugo/Jekyll | `/posts/slug/` | `article`, `.post-link` |
| Custom | Analizar estructura | Inferir selectores |

### 4. Extraer índice de entradas

Para cada entrada visible en el índice, capturar:

```yaml
- title: "Título de la entrada"
  url: "https://blog.com/2024/01/titulo-entrada"
  date: "2024-01-15"  # Si está disponible
  excerpt: "Extracto si existe"  # Opcional
```

### 5. Detectar paginación

Identificar si hay más páginas de índice:

| Tipo | Patrón |
|------|--------|
| Numérica | `?page=2`, `/page/2/` |
| Carga infinita | Botón "Cargar más" |
| Archivo por fecha | `/2024/`, `/2023/` |

### 6. Generar carpeta de trabajo

**Nuevo formato de naming**:
```
ARCHIVO/DISCO/{YYYY-MM}_{tema}_{titulo-descriptivo}/
```

Reglas:
- `{YYYY-MM}`: Fecha de scraping
- `{tema}`: Categoría temática (sin nombres propios)
- `{titulo-descriptivo}`: 3-5 palabras que describan el contenido

Ejemplos:
- `2025-12_filosofia-ciencia_criterio-demarcacion-popper`
- `2025-12_economia-critica_tecnofeudalismo-plataformas`
- `2025-12_politica-contemporanea_posverdad-instituciones`

### 7. Crear archivos de estado

**index.json** — Índice de entradas:
```json
{
  "blog_id": "ejemplo-blog-filosofia",
  "source_url": "https://blog.ejemplo.com",
  "platform": "wordpress",
  "scraped_at": "2025-12-22T10:00:00Z",
  "entries": [
    {
      "id": 1,
      "title": "Título de la entrada",
      "url": "https://blog.ejemplo.com/2024/01/entrada",
      "date": "2024-01-15",
      "status": "pending"
    }
  ],
  "pagination": {
    "type": "numeric",
    "total_pages": 5,
    "pages_indexed": [1]
  }
}
```

**state.json** — Estado del trabajo:
```json
{
  "job_id": "ejemplo-blog-filosofia",
  "job_type": "blog",
  "status": "initialized",
  "created_at": "2025-12-22T10:00:00Z",
  "source": {
    "type": "blog",
    "platform": "wordpress",
    "base_url": "https://blog.ejemplo.com",
    "index_url": "https://blog.ejemplo.com/archivo"
  },
  "progress": {
    "entries_total": 25,
    "entries_downloaded": 0,
    "entries_pending": 25,
    "last_updated": "2025-12-22T10:00:00Z"
  },
  "output": {
    "directory": "ARCHIVO/DISCO/2025-12_filosofia_criterio-demarcacion/",
    "format": "md"
  },
  "config": {
    "delay_ms": 3000,
    "max_entries": null,
    "date_filter": null
  },
  "errors": []
}
```

**README.md** — Documentación de la carpeta:
```markdown
# {Título descriptivo}

**Fuente**: {url_portada}
**Plataforma**: {tipo_blog}
**Fecha scraping**: {YYYY-MM-DD}
**Tema**: {tema}

## Contenido

{Número} entradas indexadas del blog {nombre}.

## Estado

- Entradas totales: {N}
- Descargadas: {M}
- Pendientes: {N-M}

## Archivos

- `index.json`: Índice completo de entradas
- `state.json`: Estado del trabajo de scraping
- `entry_001.md`, `entry_002.md`...: Entradas descargadas
```

## Output

1. Carpeta creada en `ARCHIVO/DISCO/{fecha}_{tema}_{titulo}/`
2. `index.json` con lista de entradas
3. `state.json` con configuración del trabajo
4. `README.md` con descripción del contenido

## Condiciones de descarga

El usuario puede especificar filtros:

| Condición | Ejemplo | Efecto |
|-----------|---------|--------|
| Por fecha | `desde: 2024-01-01` | Solo entradas posteriores |
| Por cantidad | `max: 10` | Primeras N entradas |
| Por palabra clave | `contiene: "economía"` | Solo entradas con esa palabra |
| Por autor | `autor: X` | Solo de ese autor (si aplica) |

## Siguiente paso

Una vez inicializado, usar `blog-scrape-entry.prompt.md` para descargar las entradas pendientes.
