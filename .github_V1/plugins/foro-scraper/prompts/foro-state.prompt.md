---
mode: 'agent'
description: 'Gestionar estado de trabajos de scraping'
tools: ['read', 'edit', 'list_dir']
---

# Gestión de Estado de Scraping

Permite ver, pausar y reanudar trabajos de scraping.

## Comandos

### VER ESTADO

Lista todos los trabajos con su estado actual.

```
Leer: ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/
Para cada carpeta:
  Leer: {job_id}/state.json
  Mostrar resumen
```

**Salida**:
```
📊 Estado de Trabajos de Scraping

┌─────────────────────┬──────────┬──────────┬─────────────────────┐
│ Job ID              │ Estado   │ Progreso │ Última Actualización│
├─────────────────────┼──────────┼──────────┼─────────────────────┤
│ Foro-t8941392 │ 🔄 running│ 5/10     │ 2025-12-22 10:30   │
│ Foro-t1234567 │ ⏸️ paused │ 3/10     │ 2025-12-21 15:00   │
│ mediavida-t9999     │ ✅ done   │ 25/25    │ 2025-12-20 09:00   │
└─────────────────────┴──────────┴──────────┴─────────────────────┘

Comandos:
- "Reanudar {job_id}" para continuar un trabajo pausado
- "Pausar" para pausar el trabajo activo
- "Ver detalles {job_id}" para más información
```

### PAUSAR

Pausa el trabajo activo.

```
1. Buscar job con status == "running"
2. Cambiar status → "paused"
3. Guardar state.json
```

**Salida**:
```
⏸️ Job pausado: {job_id}

Estado guardado:
- Páginas completadas: {n}
- Última página: {current_page}
- Carpeta: DISCO/{carpeta}/

Para reanudar: "Reanudar scraping"
```

### REANUDAR

Reanuda un trabajo pausado.

**Entrada**: job_id (o el más reciente si no se especifica)

```
1. Leer state.json del job
2. Verificar status == "paused"
3. Cambiar status → "running"
4. Calcular siguiente página
5. Guardar state.json
```

**Salida**:
```
▶️ Reanudando job: {job_id}

- Continuando desde página {next_page}
- Páginas restantes: {remaining}
- Delay configurado: {delay_ms}ms

Ejecutando descarga...
```

### VER DETALLES

Muestra información completa de un job.

```
Leer: ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/{job_id}/state.json
```

**Salida**:
```
📋 Detalles del Job: {job_id}

🔗 URL Pattern:
   Base: {base}
   Thread: {thread_id}
   Parámetro página: {page_param}

📊 Progreso:
   Estado: {status}
   Páginas: {downloaded}/{max}
   Última actualización: {timestamp}

📁 Archivos:
   Carpeta: {directory}
   Formato: {format}
   
⚙️ Configuración:
   Delay: {delay_ms}ms
   Max páginas: {max_pages}

{Si hay errores}
⚠️ Errores:
   - {error1}
   - {error2}
```

### ELIMINAR

Elimina un job y opcionalmente sus archivos.

**Entrada**: job_id, delete_files (bool)

```
1. Verificar status != "running"
2. Eliminar ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/{job_id}/
3. Si delete_files:
   Eliminar ARCHIVO/DISCO/{carpeta}/
```

**Salida**:
```
🗑️ Job eliminado: {job_id}

{Si delete_files}
- Archivos descargados eliminados: {count} páginas
{Si no}
- Archivos conservados en: DISCO/{carpeta}/
```

## Estados Posibles

| Estado | Emoji | Significado |
|--------|-------|-------------|
| `running` | 🔄 | Descarga en progreso |
| `paused` | ⏸️ | Pausado por usuario |
| `completed` | ✅ | Todas las páginas descargadas |
| `error` | ❌ | Detenido por error |

## Archivos

| Archivo | Ruta |
|---------|------|
| Jobs | `ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/` |
| Estado | `{jobs}/{job_id}/state.json` |
| Páginas | `ARCHIVO/DISCO/{carpeta}/page_*.md` |
