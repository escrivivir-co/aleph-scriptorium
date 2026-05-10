---
mode: 'agent'
description: 'Inicializa un trabajo de scraping con URL de muestra'
tools: ['read', 'edit', 'mcp_playwright_browser_navigate', 'mcp_playwright_browser_snapshot']
---

# Inicializar Scraping de Foro

Crea un nuevo trabajo de scraping a partir de una URL de muestra.

## Entrada

- **URL de muestra**: URL completa de una página del hilo (ej: `showthread.php?t=123&page=1`)
- **max_pages** (opcional): Número máximo de páginas a descargar (default: 10)
- **delay_ms** (opcional): Delay entre páginas en ms (default: 2000)

## Proceso

### 1. Parsear URL

Extraer componentes:

```javascript
// Para URL: https://Foro.com/foro/showthread.php?t=8941392&page=1
{
  "protocol": "https",
  "host": "Foro.com",
  "path": "/foro/showthread.php",
  "params": {
    "t": "8941392",
    "page": "1"
  }
}
```

### 2. Detectar Patrón

| Indicador | Foro | Configuración |
|-----------|------|---------------|
| `showthread.php` + `t=` + `page=` | Foro/vBulletin | thread_param=t, page_param=page |
| `viewtopic.php` + `t=` + `start=` | phpBB | thread_param=t, page_param=start |
| `/t/{slug}/{id}/{page}` | Discourse | path-based |

### 3. Generar Job ID

```
{foro}-t{thread_id}
Ejemplo: Foro-t8941392
```

### 4. Crear Estructura

```
ARCHIVO/DISCO/{Foro}_t{ThreadID}/
├── README.md           # Metadatos del hilo
└── (páginas irán aquí)

ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/{job_id}/
└── state.json          # Estado del trabajo
```

### 5. Inicializar state.json

```json
{
  "job_id": "Foro-t8941392",
  "status": "running",
  "created_at": "{timestamp}",
  "url_pattern": {
    "base": "https://Foro.com/foro/showthread.php",
    "thread_param": "t",
    "thread_id": "8941392",
    "page_param": "page"
  },
  "progress": {
    "current_page": 0,
    "total_pages": null,
    "pages_downloaded": [],
    "last_updated": "{timestamp}"
  },
  "output": {
    "directory": "ARCHIVO/DISCO/Foro_t8941392/",
    "format": "md"
  },
  "config": {
    "delay_ms": 2000,
    "max_pages": 10
  },
  "errors": []
}
```

### 6. Crear README del Hilo

```markdown
# Hilo: {título si disponible}

> **Fuente**: {url_base}
> **Thread ID**: {thread_id}
> **Inicio scraping**: {timestamp}
> **Job ID**: {job_id}

## Estado

- Páginas descargadas: 0
- Estado: En progreso

## Archivos

(Se irán listando conforme se descarguen)
```

## Salida

```
✅ Job inicializado: {job_id}

Configuración:
- Foro: {tipo_foro}
- Thread ID: {thread_id}
- Max páginas: {max_pages}
- Delay: {delay_ms}ms

Carpetas creadas:
- Datos: ARCHIVO/DISCO/{carpeta}/
- Estado: ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/{job_id}/

Próximo paso: Ejecutar descarga con "Descargar siguiente página"
```

## Errores

| Error | Causa | Solución |
|-------|-------|----------|
| "Patrón no reconocido" | URL no coincide con foros soportados | Añadir soporte o ajustar URL |
| "Job ya existe" | Ya hay un job con ese thread_id | Usar job existente o eliminar primero |
