---
mode: 'agent'
description: 'Descarga una página específica del hilo'
tools: ['read', 'edit', 'mcp_playwright_browser_navigate', 'mcp_playwright_browser_snapshot', 'mcp_playwright_browser_wait_for', 'mcp_playwright_browser_click']
---

# Descargar Página de Foro

Descarga una página específica de un trabajo de scraping activo.

## Entrada

- **job_id**: Identificador del trabajo
- **page_number** (opcional): Página específica a descargar (default: siguiente pendiente)

## Proceso

### 1. Cargar Estado

```
Leer: ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/{job_id}/state.json
Verificar: status == "running"
```

### 2. Construir URL

```javascript
// Ejemplo Foro
url = `${base}?${thread_param}=${thread_id}&${page_param}=${page_number}`
// → https://Foro.com/foro/showthread.php?t=8941392&page=1
```

### 3. Navegar

```
mcp_playwright_browser_navigate(url)
```

### 4. Esperar Contenido

```
mcp_playwright_browser_wait_for(time: 2) // 2 segundos
```

### 5. Manejar Popups (si existen)

Si hay banner de cookies o popup:
```
mcp_playwright_browser_click(element: "Aceptar cookies", ref: "{ref}")
```

### 6. Capturar Snapshot

```
mcp_playwright_browser_snapshot()
```

### 7. Parsear Contenido

Del snapshot, extraer:
- Título del hilo (si página 1)
- Lista de posts con:
  - Usuario
  - Fecha
  - Contenido
  - Número de post

### 8. Guardar como Markdown

Crear `ARCHIVO/DISCO/{carpeta}/page_{nnn}.md`:

```markdown
---
source_url: "{url}"
scraped_at: "{timestamp}"
page_number: {n}
job_id: "{job_id}"
posts_count: {count}
---

# Página {n}

## Post #{num}
**Usuario**: {usuario}
**Fecha**: {fecha}

{contenido}

---

## Post #{num+1}
...
```

### 9. Actualizar Estado

```json
{
  "progress": {
    "current_page": {n},
    "pages_downloaded": [..., {n}],
    "last_updated": "{timestamp}"
  }
}
```

### 10. Verificar Fin

Si la página:
- Devuelve 404 → marcar `status: "completed"`, `total_pages: n-1`
- No tiene posts → igual que 404
- Alcanzó max_pages → marcar `status: "completed"`

### 11. Aplicar Delay

Esperar `config.delay_ms` antes de permitir siguiente descarga.

## Salida

```
✅ Página {n} descargada

- Posts extraídos: {count}
- Archivo: DISCO/{carpeta}/page_{nnn}.md
- Progreso: {n}/{max_pages}

{Si hay más páginas}
Próximo: "Descargar siguiente página" o esperar {delay}ms

{Si completado}
✅ Scraping completado: {total} páginas descargadas
```

## Detección de Última Página

| Señal | Acción |
|-------|--------|
| HTTP 404 | Completar job |
| "Página no encontrada" en contenido | Completar job |
| 0 posts en página | Completar job |
| Botón "Siguiente" deshabilitado | Completar job |
| Alcanzado max_pages | Completar job |

## Errores

| Error | Acción |
|-------|--------|
| Timeout navegación | Reintentar 1x, luego pausar |
| Contenido vacío | Warning, intentar siguiente |
| Captcha detectado | Pausar, notificar usuario |
| Rate limit | Pausar, aumentar delay |
