---
name: blog-scrape-entry
description: Descarga entradas individuales de un blog en serie
mode: agent
tools: ['playwright/*', 'read', 'edit', 'vscode']
---

# Descargar Entradas de Blog

Este prompt guía la descarga en serie de entradas de un blog previamente indexado.

## Prerrequisito

- Job de blog inicializado con `blog-init.prompt.md`
- Archivo `index.json` con lista de entradas
- Archivo `state.json` con configuración

## Input

- **job_id**: Identificador del trabajo (carpeta en DISCO/)
- **modo**: `continuar` (desde última) | `desde N` (entrada específica) | `rango N-M`

## Proceso por cada entrada

### 1. Leer estado actual

```
Leer: ARCHIVO/DISCO/{carpeta}/state.json
Leer: ARCHIVO/DISCO/{carpeta}/index.json
```

Identificar siguiente entrada pendiente.

### 2. Navegar a la entrada

```
Usar: mcp_playwright_browser_navigate
URL: {entry.url}
```

### 3. Capturar contenido

```
Usar: mcp_playwright_browser_snapshot
Objetivo: Extraer contenido de la entrada
```

### 4. Parsear contenido

Extraer según plataforma:

| Elemento | WordPress | Blogger | Medium | Ghost |
|----------|-----------|---------|--------|-------|
| Título | `.entry-title` | `.post-title` | `h1` | `.post-full-title` |
| Contenido | `.entry-content` | `.post-body` | `article section` | `.post-full-content` |
| Fecha | `.entry-date` | `.published` | `time` | `.post-full-meta-date` |
| Autor | `.author` | `.author-name` | `a[data-action="show-user-card"]` | `.author-name` |
| Tags | `.tags a` | `.post-labels a` | Tags inferidos | `.post-card-tags a` |

### 5. Generar archivo Markdown

**Nombre**: `entry_{NNN}.md` donde NNN es el índice de la entrada

**Estructura**:

```markdown
---
source_url: {url_entrada}
scraped_at: {timestamp}
entry_number: {N}
job_id: {job_id}
platform: {tipo_blog}
title: "{título}"
date: "{fecha_publicación}"
author: "{autor}"
tags: [{lista, de, tags}]
---

# {Título de la entrada}

**Autor**: {autor}  
**Fecha**: {fecha}  
**Fuente**: [{url_corta}]({url_completa})

---

{contenido_en_markdown}

---

## Metadatos

- **Tags**: {tags}
- **Comentarios**: {número si está disponible}
- **Entrada**: {N} de {total}
```

### 6. Actualizar estado

Modificar `index.json`:
```json
{
  "entries": [
    {
      "id": 1,
      "status": "downloaded",  // Cambiar de "pending"
      "downloaded_at": "2025-12-22T10:30:00Z",
      "file": "entry_001.md"
    }
  ]
}
```

Modificar `state.json`:
```json
{
  "progress": {
    "entries_downloaded": 1,  // Incrementar
    "entries_pending": 24,    // Decrementar
    "last_updated": "2025-12-22T10:30:00Z"
  }
}
```

### 7. Aplicar delay

Esperar `config.delay_ms` antes de la siguiente entrada.

### 8. Verificar condiciones de parada

- ¿Se alcanzó `max_entries`?
- ¿Se salió del rango de fechas (`date_filter`)?
- ¿El usuario solicitó pausa?

## Manejo de errores

| Error | Acción |
|-------|--------|
| 404 Not Found | Marcar entrada como `error_404`, continuar |
| Timeout | Reintentar 1 vez, luego marcar `error_timeout` |
| Contenido vacío | Marcar `error_empty`, continuar |
| Rate limiting | Aumentar delay, reintentar |

Registrar errores en `state.json`:
```json
{
  "errors": [
    {
      "entry_id": 5,
      "error_type": "404",
      "timestamp": "2025-12-22T10:45:00Z",
      "url": "https://..."
    }
  ]
}
```

## Comandos de control

| Comando | Efecto |
|---------|--------|
| `continuar` | Reanudar desde última pendiente |
| `pausar` | Guardar estado y detener |
| `desde N` | Empezar/continuar desde entrada N |
| `rango N-M` | Descargar solo entradas N a M |
| `reintentar errores` | Intentar de nuevo las marcadas con error |

## Output por entrada

1. Archivo `entry_{NNN}.md` con contenido formateado
2. `index.json` actualizado con status
3. `state.json` actualizado con progreso

## Integración con Periódico

Una vez descargadas las entradas, la carpeta puede usarse como fuente para el agente Periódico:

```
@Periodico crear noticia desde ARCHIVO/DISCO/{carpeta}/
```

El Periódico leerá los archivos `entry_*.md` como fuentes para generar una plana noticiosa.
