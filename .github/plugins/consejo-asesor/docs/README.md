# Consejo Asesor (ONFALO) - Plugin para Scriptorium ALEPH

## Que es

Plugin que integra el sistema de consejo-asesor de ONFALO: 14 agentes intelectuales en 7 modos dialecticos con pipeline de produccion de relatos.

## Version

1.0.0 - Placeholder minimo. Migracion exhaustiva de agentes ONFALO pendiente (ver `data/onfalo-source.md`).

## Estructura

### Datos del plugin (infraestructura)
`ARCHIVO/PLUGINS/CONSEJO_ASESOR/` - Plantillas, indices, logs de sesiones.

### Datos del usuario (proyectos)
`ARCHIVO/DISCO/CONSEJO/{nombre}/` - Proyectos con proyecto.config.md, laboratorio, fichas y relatos.

## Prompts disponibles

| Prompt | Descripcion |
|--------|-------------|
| ca-debate | Debate dialectico |
| ca-auditoria | Auditoria triple |
| ca-produccion | Producir articulo / integrar material |
| ca-corresponsalia | Periodismo de doble realidad |
| ca-crear-proyecto | Crear proyecto ONFALO-compatible |
| ca-pipeline-relato | Pipeline laboratorio -> fichas -> relato |

## Fuente

Basado en el sistema de consejo-asesor de ONFALO (`/Users/morente/Desktop/THEIA_PATH/ONFALO`).
