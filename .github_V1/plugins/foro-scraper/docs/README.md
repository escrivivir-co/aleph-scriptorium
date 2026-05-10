# Plugin: Web Scraper (Foros y Blogs)

> **Versión**: 1.1.0  
> **Autor**: Aleph Scriptorium  
> **Dependencias**: MCP Playwright

## Descripción

Plugin para descargar contenido de **foros** (hilos completos) y **blogs** (entradas), con gestión de estado que permite pausar y reanudar el proceso en cualquier momento.

## Características

### Scraping de Foros
- ✅ **Detección automática de patrones** — Soporta Foro, vBulletin, phpBB, Discourse, SMF
- ✅ **Descarga secuencial** — Páginas del hilo en orden

### Scraping de Blogs
- ✅ **Indexación de portada** — Extrae lista de entradas automáticamente
- ✅ **Plataformas soportadas** — WordPress, Blogger, Medium, Ghost, Substack, Hugo/Jekyll
- ✅ **Filtros flexibles** — Por fecha, cantidad o palabras clave

### General
- ✅ **Gestión de estado** — Pausa y reanuda sin perder progreso
- ✅ **Salida en Markdown** — Archivos limpios y estructurados
- ✅ **Delay configurable** — Respeta los servidores
- ✅ **Naming semántico** — `{fecha}_{tema}_{titulo}` sin nombres propios
- ✅ **Integración con Periódico** — Usa scraping como fuente de noticias

## Instalación

El plugin viene pre-instalado en Scriptorium. Verificar en `registry.json`:

```json
{
  "foro-scraper": {
    "enabled": true,
    "version": "1.1.0"
  }
}
```

## Uso Rápido

### Scraping de Foros

```
Usuario: Descarga el hilo https://Foro.com/foro/showthread.php?t=8941392&page=1

ForoScraper: 
✅ Job creado: 2025-12_foro-general_tarot-marsella
🔄 Descargando página 1...
```

### Scraping de Blogs

```
Usuario: Indexa el blog https://ejemplo.com/archivo

ForoScraper: 
✅ Plataforma detectada: WordPress
📋 25 entradas encontradas
📁 Carpeta: 2025-12_filosofia-ciencia_criterio-demarcacion

¿Deseas descargar todas o aplicar filtros?
```

### Pausar/Reanudar

```
Usuario: Pausa el scraping
ForoScraper: ⏸️ Job pausado en entrada 5/25

Usuario: Reanuda el scraping
ForoScraper: ▶️ Continuando desde entrada 6...
```

### Ver Estado

```
Usuario: Estado del scraping

ForoScraper:
┌────────────────────────────────────────┬──────────┬──────────┐
│ Job ID                                 │ Estado   │ Progreso │
├────────────────────────────────────────┼──────────┼──────────┤
│ 2025-12_foro-general_tarot-marsella    │ ⏸️ paused │ 5/10 pág │
│ 2025-12_filosofia-ciencia_demarcacion  │ 🔄 running│ 6/25 ent │
└────────────────────────────────────────┴──────────┴──────────┘
```

## Estructura de Archivos

### Datos de Runtime

```
ARCHIVO/PLUGINS/FORO_SCRAPER/
└── jobs/
    └── {job_id}/
        └── state.json
```

### Archivos Descargados

```
ARCHIVO/DISCO/{fecha}_{tema}_{titulo}/
├── README.md
├── state.json
├── index.json       # Solo blogs
├── page_001.md      # Foros
├── entry_001.md     # Blogs
└── ...
```

## Convención de Naming

**Formato**: `{YYYY-MM}_{tema}_{titulo-descriptivo}`

| Componente | Descripción | Ejemplo |
|------------|-------------|---------|
| `{YYYY-MM}` | Fecha de scraping | `2025-12` |
| `{tema}` | Categoría (sin nombres propios) | `filosofia-ciencia` |
| `{titulo}` | 3-5 palabras descriptivas | `criterio-demarcacion` |

## Integración con Periódico

Las carpetas de scraping pueden usarse como fuente de noticias:

```
@Periodico crear noticia desde ARCHIVO/DISCO/2025-12_filosofia-ciencia_criterio-demarcacion/
```

## Configuración

| Parámetro | Default | Descripción |
|-----------|---------|-------------|
| `max_pages` | 10 | Páginas máximas (foros) |
| `max_entries` | null | Entradas máximas (blogs) |
| `delay_ms` | 2000 | Milisegundos entre páginas |

## Foros Soportados

| Foro | Tipo | Patrón |
|------|------|--------|
| Foro | vBulletin | `showthread.php?t=X&page=N` |
| Mediavida | vBulletin | Similar |
| HTCMania | vBulletin | Similar |
| Foros phpBB | phpBB | `viewtopic.php?t=X&start=N` |
| Discourse | Discourse | `/t/slug/id/N` |

## Integración con Scriptorium

### Handoffs desde Aleph

- `[FORO-SCRAPER] Iniciar scraping de foro`
- `[FORO-SCRAPER] Pausar scraping`
- `[FORO-SCRAPER] Reanudar scraping`
- `[FORO-SCRAPER] Ver estado del scraping`

### Uso con Periódico

Los hilos descargados pueden usarse como fuente para el agente Periódico:

```
DISCO/Foro_t8941392/ → Fuente de noticia
```

## Limitaciones

- No soporta foros con login obligatorio
- No bypassa captchas
- Requiere MCP Playwright instalado y configurado

## Troubleshooting

### "Browser not installed"

Ejecutar:
```
mcp_playwright_browser_install()
```

### Páginas vacías

Aumentar el tiempo de espera en la configuración o verificar que el contenido no requiera JavaScript adicional.

### Rate limiting

Aumentar `delay_ms` a 5000 o más.

## Changelog

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2025-12-22 | Versión inicial |
