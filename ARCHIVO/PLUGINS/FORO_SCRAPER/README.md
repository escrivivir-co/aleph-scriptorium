# Datos del Plugin: Foro Scraper

> **Plugin**: foro-scraper v1.0.0  
> **Directorio de código**: `.github/plugins/foro-scraper/`

## Estructura

```
FORO_SCRAPER/
├── README.md           # Este archivo
└── jobs/               # Trabajos de scraping
    └── {job_id}/
        └── state.json  # Estado del trabajo
```

## Trabajos Activos

(Se actualizará automáticamente conforme se creen jobs)

| Job ID | Foro | Estado | Progreso | Última Actualización |
|--------|------|--------|----------|---------------------|
| - | - | - | - | - |

## Uso

Los trabajos se gestionan a través del agente ForoScraper:

1. **Iniciar**: Proporcionar URL de muestra
2. **Pausar**: Guardar estado actual
3. **Reanudar**: Continuar desde última página
4. **Ver estado**: Listar todos los jobs

## Archivos Descargados

Los archivos descargados NO se guardan aquí, sino en:

```
ARCHIVO/DISCO/{Foro}_{ThreadID}/
```

Ejemplo:
```
ARCHIVO/DISCO/Foro_t8941392/
├── README.md
├── page_001.md
├── page_002.md
└── ...
```
