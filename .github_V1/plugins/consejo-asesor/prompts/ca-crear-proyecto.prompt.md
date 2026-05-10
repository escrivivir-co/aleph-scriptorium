---
mode: 'agent'
description: 'Crea un nuevo proyecto ONFALO-compatible con proyecto.config.md'
---

# Crear Proyecto

Crea un nuevo proyecto para el consejo asesor con estructura ONFALO-compatible.

## Entrada

- **Nombre del proyecto**: Nombre en SCREAMING_SNAKE o kebab-case

## Proceso

1. Verificar que no existe en `ARCHIVO/DISCO/CONSEJO/{nombre}/`.
2. Crear estructura:
   ```
   ARCHIVO/DISCO/CONSEJO/{nombre}/
   ├── proyecto.config.md
   ├── LABORATORIO/
   ├── PRODUCCIONES/
   │   ├── INPUT/
   │   └── OUTPUT/
   └── sesiones/
   ```
3. Guiar al usuario para rellenar `proyecto.config.md` usando la plantilla de `ARCHIVO/PLUGINS/CONSEJO_ASESOR/plantillas/proyecto.plantilla.md`.
4. Secciones a completar:
   - **Identidad**: nombre, descripcion, idioma, genero
   - **La Voz**: posicion, biografia, ejes, influencias, paradojas, puntos ciegos
   - **5 Antagonistas**: modelo, desafio central, tensiones con la voz
   - **Corpus**: descripcion, rutas, convencion de salida
   - **Vocabulario**: terminos, personajes, lugares
   - **Estilo**: voz narrativa, parrafo modelo, patrones prohibidos

## Salida

Proyecto creado con `proyecto.config.md` listo para usar con los modos del consejo.
