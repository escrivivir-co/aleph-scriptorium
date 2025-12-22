---
name: Web Scraper (Foros y Blogs)
description: Instrucciones para el plugin de scraping de foros y blogs con MCP Playwright.
applyTo: "ARCHIVO/DISCO/**/*.md, ARCHIVO/PLUGINS/FORO_SCRAPER/**/*"
---

# Instrucciones: Plugin Web Scraper

> **Fuente de verdad**: `.github/plugins/foro-scraper/`  
> **Versión**: 1.1.0

## Qué es el Plugin Web Scraper

Plugin para descargar contenido de **foros** (hilos completos) y **blogs** (entradas) usando herramientas MCP Playwright, con gestión de estado que permite pausar y reanudar el proceso.

### Tipos de Contenido

| Tipo | Proceso | Salida |
|------|---------|--------|
| **Foro** | Descarga páginas secuenciales del hilo | `page_001.md`, `page_002.md`, ... |
| **Blog** | Indexa entradas desde portada, descarga en serie | `entry_001.md`, `entry_002.md`, ... |

---

## Herramientas MCP Utilizadas

| Herramienta | Uso |
|-------------|-----|
| `mcp_playwright_browser_navigate` | Navegar a cada página del hilo |
| `mcp_playwright_browser_snapshot` | Capturar contenido accesible (mejor que screenshot) |
| `mcp_playwright_browser_wait_for` | Esperar carga de contenido |
| `mcp_playwright_browser_click` | Cerrar popups/cookies si aparecen |

---

## Flujo de Trabajo

### 1. Inicialización

```
Usuario proporciona URL → Parsear patrón → Crear job → Crear carpeta en DISCO/
```

### 2. Descarga

```
Para cada página:
  navigate(url) → wait(2s) → snapshot() → parsear → guardar .md → actualizar estado
```

### 3. Gestión de Estado

```
Pausar: Guardar current_page en state.json
Reanudar: Leer state.json, continuar desde next_page
```

---

## Estructura de Archivos

### Código del Plugin (inmutable)

```
.github/plugins/foro-scraper/
├── manifest.md
├── agents/
│   └── foro-scraper.agent.md
├── prompts/
│   ├── foro-init.prompt.md        # Inicializar scraping de foro
│   ├── foro-scrape-page.prompt.md # Descargar página de foro
│   ├── foro-parse-pattern.prompt.md
│   ├── foro-state.prompt.md
│   ├── blog-init.prompt.md        # Inicializar scraping de blog
│   └── blog-scrape-entry.prompt.md # Descargar entradas de blog
├── instructions/
│   └── foro-scraper.instructions.md
└── docs/
    └── README.md
```

### Datos del Plugin (mutable)

```
ARCHIVO/PLUGINS/FORO_SCRAPER/
├── README.md
└── jobs/
    └── {job_id}/
        └── state.json
```

### Archivos Descargados

```
ARCHIVO/DISCO/{fecha}_{tema}_{titulo}/
├── README.md
├── state.json       # Estado del trabajo
├── index.json       # Índice de entradas (solo blogs)
├── page_001.md      # Páginas (foros)
├── entry_001.md     # Entradas (blogs)
└── ...
```

---

## Convención de Naming

**IMPORTANTE**: Las carpetas usan formato semántico, NO identificadores opacos.

```
{YYYY-MM}_{tema}_{titulo-descriptivo}
```

| Componente | Descripción | Ejemplo |
|------------|-------------|---------|
| `{YYYY-MM}` | Fecha de scraping | `2025-12` |
| `{tema}` | Categoría temática (SIN nombres propios) | `filosofia-ciencia` |
| `{titulo}` | 3-5 palabras descriptivas | `demarcacion-falsabilidad` |

**Ejemplos correctos**:
- `2025-12_filosofia-ciencia_criterio-demarcacion-popper`
- `2025-12_economia-critica_tecnofeudalismo-plataformas`
- `2025-12_foro-general_hilo-tarot-marsella`

**Evitar**: `Foro_t8941392` (nombre propio + ID opaco)

---

## Esquema de Estado

### Para Foros (`state.json`)

```json
{
  "job_id": "2025-12_foro-general_tarot-marsella",
  "job_type": "forum",
  "status": "running|paused|completed|error",
  "created_at": "ISO-8601",
  "source": {
    "type": "forum",
    "platform": "vbulletin",
    "base_url": "https://...",
    "thread_id": "8941392"
  },
  "url_pattern": {
    "type": "vbulletin",
    "base": "https://...",
    "thread_param": "t",
    "thread_id": "8941392",
    "page_param": "page"
  },
  "progress": {
    "current_page": 5,
    "total_pages": null,
    "pages_downloaded": [1, 2, 3, 4, 5],
    "last_updated": "ISO-8601"
  },
  "output": {
    "directory": "ARCHIVO/DISCO/2025-12_foro-general_tarot-marsella/",
    "format": "md"
  },
  "config": {
    "delay_ms": 2000,
    "max_pages": 10
  },
  "errors": []
}
```

### Para Blogs (`state.json` + `index.json`)

**state.json**:
```json
{
  "job_id": "2025-12_filosofia-ciencia_criterio-demarcacion",
  "job_type": "blog",
  "status": "running",
  "created_at": "ISO-8601",
  "source": {
    "type": "blog",
    "platform": "wordpress",
    "base_url": "https://blog.ejemplo.com",
    "index_url": "https://blog.ejemplo.com/archivo"
  },
  "progress": {
    "entries_total": 25,
    "entries_downloaded": 5,
    "entries_pending": 20,
    "last_updated": "ISO-8601"
  },
  "output": {
    "directory": "ARCHIVO/DISCO/2025-12_filosofia-ciencia_criterio-demarcacion/",
    "format": "md"
  },
  "config": {
    "delay_ms": 3000,
    "max_entries": null,
    "date_filter": null
  }
}
```

**index.json** (solo blogs):
```json
{
  "blog_id": "ejemplo-blog",
  "indexed_at": "ISO-8601",
  "entries": [
    {
      "id": 1,
      "title": "Título de entrada",
      "url": "https://...",
      "date": "2024-01-15",
      "status": "downloaded|pending|error"
    }
  ]
}
```

---

## Patrones Soportados

### Foros

| Tipo | Ejemplo | Detección |
|------|---------|-----------|
| **vBulletin** | `showthread.php?t=X&page=N` | Foro, foros clásicos |
| **phpBB** | `viewtopic.php?t=X&start=N` | Offset-based |
| **Discourse** | `/t/slug/id/N` | Path-based moderno |
| **SMF** | `index.php?topic=X.N` | Punto como separador |

### Blogs

| Plataforma | Selectores típicos |
|------------|-------------------|
| **WordPress** | `.post`, `.entry-title`, `.entry-content` |
| **Blogger** | `.post-body`, `.post-title` |
| **Medium** | `article`, `h1[data-testid]` |
| **Ghost** | `.post-content`, `.gh-content` |
| **Substack** | `.post-content`, `.available-content` |
| **Hugo/Jekyll** | Depende del tema (`.post`, `article`) |

---

## Formato de Salida

### Páginas de Foro (`page_{nnn}.md`)

```markdown
---
source_url: "https://..."
scraped_at: "2025-12-22T10:15:00Z"
page_number: 1
job_id: "2025-12_foro-general_tarot-marsella"
posts_count: 20
---

# Página 1

## Post #1
**Usuario**: NombreUsuario
**Fecha**: 22-12-2025 10:00

Contenido del post...

---

## Post #2
...
```

### Entradas de Blog (`entry_{nnn}.md`)

```markdown
---
source_url: "https://..."
scraped_at: "2025-12-22T10:15:00Z"
entry_number: 1
job_id: "2025-12_filosofia-ciencia_criterio-demarcacion"
title: "Título de la entrada"
date: "2024-01-15"
author: "Autor"
platform: "wordpress"
---

# Título de la entrada

Contenido de la entrada...
```

---

## Buenas Prácticas

### Delay entre Páginas

- **Mínimo recomendado**: 2000ms (2 segundos)
- **Para foros sensibles**: 5000ms o más
- **Nunca**: Menos de 1000ms (riesgo de ban)

### Límite de Páginas

- Empezar con `max_pages: 10` para probar
- Aumentar progresivamente si funciona
- Usar pausas para sesiones largas

### Manejo de Errores

- Si hay captcha: Pausar y esperar
- Si hay rate limit: Aumentar delay
- Si hay 404: El hilo terminó

---

## Lo que NO hacer

- **No ignorar delays**: Respetar el servidor del foro
- **No descargar sin pausa**: Usar gestión de estado
- **No hardcodear URLs**: Usar el parser de patrones
- **No almacenar credenciales**: El plugin no maneja login

---

## Integración con Periódico

Si un hilo descargado es relevante para noticias:

1. Los archivos en DISCO/ pueden procesarse con el agente Periódico
2. Usar la carpeta como fuente de una noticia
3. El README del hilo contiene metadatos útiles

---

## Troubleshooting

| Problema | Causa Probable | Solución |
|----------|----------------|----------|
| "Browser not installed" | Playwright no configurado | `mcp_playwright_browser_install` |
| Página vacía | JavaScript no ejecutado | Aumentar wait time |
| Contenido cortado | Snapshot limitado | Hacer scroll antes de snapshot |
| Captcha | Demasiadas requests | Pausar, esperar, aumentar delay |
