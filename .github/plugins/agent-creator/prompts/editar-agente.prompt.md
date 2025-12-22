---
agent: 'agent'
description: 'Edita un agente existente añadiendo fuentes o capacidades'
tools: ['read', 'edit', 'search']
---

# Editar Agente Existente

## Objetivo

Modificar un agente previamente creado para:
- Añadir nuevas fuentes de datos
- Extender sus capacidades
- Actualizar su conocimiento con nuevas páginas scrapeadas

## Flujo

### Paso 1: Seleccionar agente a editar

```
¿Qué agente quieres editar?

Agentes creados disponibles:
[listar contenido de ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/]

O indica la ruta completa del agente.
```

### Paso 2: Mostrar estado actual

Leer el agente y mostrar:
- Agentes base originales
- Fuentes conectadas actualmente
- Especialización definida

### Paso 3: Tipo de edición

```
¿Qué quieres modificar?

1. Añadir nueva fuente de datos
2. Conectar agente base adicional
3. Actualizar con nuevas páginas (si hay scraping activo)
4. Modificar especialización
5. Añadir handoffs personalizados
```

### Paso 4: Ejecutar edición

Según la opción:

**Añadir fuente:**
- Validar que la fuente existe
- Analizar contenido
- Integrar conceptos al system prompt
- Actualizar sección "Fuentes de Verdad"

**Conectar agente base:**
- Analizar el nuevo agente
- Fusionar metodologías (sin duplicar)
- Añadir handoffs del nuevo agente

**Actualizar con nuevas páginas:**
- Detectar job de scraping
- Leer nuevas páginas
- Extraer conceptos adicionales
- Enriquecer conocimiento

### Paso 5: Guardar cambios

- Actualizar el archivo `.agent.md`
- Actualizar la receta en `recipes/`
- Registrar en `logs/creation-log.json`

## Ejemplo

```
Usuario: Quiero añadir más páginas del foro al agente demarcacion-yellowflag

AgentCreator: Comprobando estado del scraping...

Job: Foro-t8941392
- Páginas descargadas: 1 de 51
- Última actualización: 2025-12-22

¿Quieres que solicite más páginas al Scraper antes de actualizar?

Usuario: Sí, descarga las primeras 5

[Handoff a ForoScraper...]

AgentCreator: Páginas 1-5 descargadas. Analizando nuevo contenido...

Nuevos conceptos encontrados:
- [lista de conceptos de páginas 2-5]

Actualizando agente... ✅

El agente ahora conoce:
- 5 páginas del hilo (150 posts)
- Nuevos conceptos: [...]
```
