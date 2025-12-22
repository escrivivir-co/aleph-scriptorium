---
id: foro-scraper
name: "Web Scraper (Foros y Blogs)"
version: "1.1.0"
description: "Plugin de scraping de foros y blogs con gestión de estado pausable/reanudable usando MCP Playwright"
author: "Aleph Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies: []

# Recursos exportados
agents:
  - name: "ForoScraper"
    file: "agents/foro-scraper.agent.md"
    description: "Agente principal de scraping con gestión de estado"

prompts:
  # Foros
  - name: "foro-init"
    file: "prompts/foro-init.prompt.md"
    description: "Inicializar scraping de foro con URL de muestra"
  - name: "foro-scrape-page"
    file: "prompts/foro-scrape-page.prompt.md"
    description: "Descargar una página del hilo"
  - name: "foro-parse-pattern"
    file: "prompts/foro-parse-pattern.prompt.md"
    description: "Extraer patrón de URL de foro"
  - name: "foro-state"
    file: "prompts/foro-state.prompt.md"
    description: "Gestionar estado del scraping"
  # Blogs
  - name: "blog-init"
    file: "prompts/blog-init.prompt.md"
    description: "Inicializar scraping de blog: indexar entradas desde portada"
  - name: "blog-scrape-entry"
    file: "prompts/blog-scrape-entry.prompt.md"
    description: "Descargar entradas de blog en serie"

instructions:
  - name: "foro-scraper"
    file: "instructions/foro-scraper.instructions.md"

# Integración con Aleph
handoffs:
  # Foros
  - label: "Iniciar scraping de foro"
    agent: "ForoScraper"
    prompt: "Inicializa un nuevo trabajo de scraping de FORO con la URL proporcionada. Extrae el patrón, crea la carpeta en DISCO/ e inicia la descarga."
  - label: "Pausar scraping"
    agent: "ForoScraper"
    prompt: "Pausa el trabajo de scraping activo, guardando el estado para reanudar después."
  - label: "Reanudar scraping"
    agent: "ForoScraper"
    prompt: "Reanuda un trabajo de scraping pausado desde donde se quedó."
  - label: "Ver estado del scraping"
    agent: "ForoScraper"
    prompt: "Muestra el estado actual de todos los trabajos de scraping (activos, pausados, completados)."
  # Blogs
  - label: "Iniciar scraping de blog"
    agent: "ForoScraper"
    prompt: "Inicializa un nuevo trabajo de scraping de BLOG. Navega a la portada, extrae el índice de entradas y prepara la descarga."
  - label: "Descargar entradas de blog"
    agent: "ForoScraper"
    prompt: "Descarga entradas pendientes de un blog previamente indexado. Puede filtrar por fecha, cantidad o palabras clave."
---

# Plugin: Web Scraper (Foros y Blogs)

Plugin para descargar contenido de foros y blogs, con gestión de estado que permite pausar y reanudar el proceso.

## Tecnología

Utiliza las herramientas MCP Playwright:
- `browser_navigate`: Navegar a URLs
- `browser_snapshot`: Capturar estado accesible de la página
- `browser_click`: Interactuar con elementos si es necesario

## Características

### Generales
- **Gestión de estado**: Pausa y reanuda en cualquier momento
- **Salida en Markdown**: Guarda contenido como archivos .md limpios
- **Delay configurable**: Evita saturar los servidores
- **Naming semántico**: Carpetas con formato `{fecha}_{tema}_{titulo-descriptivo}`

### Foros
- **Detección de patrones**: Extrae automáticamente el patrón de URL
- **Múltiples plataformas**: Foro, vBulletin, phpBB, Discourse, SMF

### Blogs
- **Indexación de entradas**: Extrae lista completa desde portada/archivo
- **Filtros de descarga**: Por fecha, cantidad, palabras clave
- **Múltiples plataformas**: WordPress, Blogger, Medium, Ghost, Substack, Hugo/Jekyll

## Convención de Naming

Las carpetas usan el formato: `{YYYY-MM}_{tema}_{titulo-descriptivo}`

| Componente | Descripción | Ejemplo |
|------------|-------------|---------|
| `{YYYY-MM}` | Fecha de scraping | `2025-12` |
| `{tema}` | Categoría temática (sin nombres propios) | `filosofia-ciencia` |
| `{titulo}` | 3-5 palabras descriptivas | `criterio-demarcacion-popper` |

Ejemplos completos:
- `2025-12_filosofia-ciencia_criterio-demarcacion-falsabilidad`
- `2025-12_economia-critica_tecnofeudalismo-plataformas`
- `2025-12_foro-general_hilo-tarot-marsella`

## Uso

### Foros
```
1. Proporcionar URL de muestra (ej: showthread.php?t=123&page=1)
2. El plugin extrae el patrón automáticamente
3. Configura número de páginas y delay
4. Inicia descarga → puede pausar/reanudar
5. Los archivos se guardan en DISCO/{fecha}_{tema}_{titulo}/
```

### Blogs
```
1. Proporcionar URL de portada/índice del blog
2. El plugin extrae el índice de entradas
3. Configura filtros (fecha, cantidad, keywords)
4. Inicia descarga → puede pausar/reanudar
5. Los archivos se guardan en DISCO/{fecha}_{tema}_{titulo}/
```

## Integración con Periódico

Las carpetas de scraping pueden usarse como fuente para el agente Periódico:

```
@Periodico crear noticia desde ARCHIVO/DISCO/{carpeta}/
```

## Estructura de Datos

Los datos de runtime se almacenan en:
```
ARCHIVO/PLUGINS/FORO_SCRAPER/
└── jobs/
    └── {job_id}/
        └── state.json
```

Los archivos descargados van a:
```
ARCHIVO/DISCO/{fecha}_{tema}_{titulo}/
├── README.md
├── state.json (o index.json para blogs)
├── page_001.md / entry_001.md
├── page_002.md / entry_002.md
└── ...
```
