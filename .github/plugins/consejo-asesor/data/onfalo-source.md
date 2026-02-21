# Referencia a ONFALO (Fuente)

## Ruta

```
/Users/morente/Desktop/THEIA_PATH/ONFALO
```

## Contenidos de referencia para migracion futura

| Recurso | Ruta en ONFALO | Estado en plugin |
|---------|---------------|-----------------|
| 14 agentes (.agent.md) | `PLUGIN_SCRIPTORIUM/consejo-asesor/agentes/` | Catalogo placeholder en `data/agentes.md` |
| Protocolo completo | `PLUGIN_SCRIPTORIUM/consejo-asesor/consejo/protocolo.md` | Version simplificada en `data/protocolo.md` |
| Lectura viva (Modo 5) | `PLUGIN_SCRIPTORIUM/consejo-asesor/consejo/lectura-viva.md` | Pendiente |
| Corresponsalia (Modo 7) | `PLUGIN_SCRIPTORIUM/consejo-asesor/consejo/corresponsalia.md` | Pendiente |
| Esquema del consejo | `PLUGIN_SCRIPTORIUM/consejo-asesor/consejo/esquema.md` | Pendiente |
| Metarelato completo | `PLUGIN_SCRIPTORIUM/indice.md` + `0.md` | Estructura en `data/metarelato/indice.md` |
| Notas y referencias | `PLUGIN_SCRIPTORIUM/notas.md` + `referencias.md` | Pendiente |
| 7 proyectos ONFALO | `PROYECTOS/` | No aplica (son proyectos ONFALO, no del plugin) |
| Plantilla proyecto | `PROYECTOS/*/proyecto.config.md` | Recreada en `ARCHIVO/PLUGINS/CONSEJO_ASESOR/plantillas/` |
| SDK (MCP Server) | `SDK/` | Pendiente (MCP Server no implementado aun en ONFALO) |

## Nota de diseno

Este plugin es un **placeholder minimo** (v1.0.0) que emula la estructura del consejo-asesor de ONFALO con la informacion necesaria para operar los 7 modos y el pipeline de relato. Una migracion exhaustiva en el futuro traera las definiciones completas de los 14 agentes (con sus 8 secciones canonicas), los protocolos detallados de corresponsalia y lectura-viva, y las notas/referencias del metarelato.
