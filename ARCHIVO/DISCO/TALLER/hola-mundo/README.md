# Proyecto: Hola Mundo

> **Estado**: 🟡 Ejemplo (referencia para nuevos proyectos)  
> **Tipo**: Laboratorio  
> **Personaje guía**: El Tarotista

---

## Descripción

Primera obra de demostración del plugin AGENT_CREATOR. El Tarotista (agente especializado creado desde @yellowflag + datos del foro) se presenta y demuestra sus capacidades de auditoría epistémica.

## Propósito

Demostrar el pipeline completo:

```
FORO_SCRAPER → AGENT_CREATOR → ARG_BOARD → TEATRO
```

1. **Fuente**: Hilo de foro sobre tarot y demarcación científica
2. **Agente**: demarcacion-yellowflag (especialista en criterio de demarcación)
3. **Personaje**: Tarotista (arquetipo SHAPESHIFTER)
4. **Obra**: 3 escenas de presentación

## Estado en ARG_BOARD

- **obras.json**: ✅ Registrada como `hola_mundo`
- **actores.json**: ✅ Tarotista registrado
- **BOE**: ⏳ Pendiente de entrada

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `obra.yaml` | Definición de la obra (3 escenas) |
| `personajes/tarotista.yaml` | Ficha del personaje |
| `escenas/*.md` | Contenido narrativo |

## Origen del Personaje

| Campo | Valor |
|-------|-------|
| Plugin origen | agent-creator |
| Agente base | @yellowflag |
| Fuente de datos | `DISCO/Foro_t8941392/` (1/51 páginas) |
| Agente creado | demarcacion-yellowflag |
| Ruta | `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/demarcacion-yellowflag.agent.md` |

## Próximos Pasos

1. [ ] Completar las 3 escenas en `escenas/`
2. [ ] Generar entrada en BOE
3. [ ] Crear página impress.js
4. [ ] Publicar en cartelera
