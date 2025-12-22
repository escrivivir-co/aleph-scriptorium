# Generador de Obras para Teatro Impress.js

Este prompt automatiza la conversión de obras del TALLER a páginas Jekyll.

## Uso

```
@aleph generar página de teatro para [nombre-obra]
```

## Pipeline

```
ARCHIVO/DISCO/TALLER/{obra}/obra.yaml
            ↓
    (extracción de metadatos)
            ↓
docs/teatro/{slug}.md (frontmatter Jekyll)
            ↓
    _layouts/obra.html (genera impress.js)
            ↓
    https://.../teatro/{slug}/
```

## Estructura de la obra fuente

El archivo `obra.yaml` en el TALLER debe tener:

```yaml
titulo: "Nombre de la Obra"
slug: nombre-obra
tipo: [laboratorio|onboarding|showcase]
estado: [desarrollo|registrada|en_escena|clausurada]
descripcion: |
  Descripción multilinea
personaje_guia: nombre_agente
escenas:
  - id: 1
    nombre: "Título escena"
    anillo: 0-3
    tipo: [inicio|encuentro|prueba|umbral|...]
    descripcion: "..."
    contenido_ref: escenas/01-nombre.md  # Opcional
    prueba:  # Opcional
      tarea: "..."
      exito: "..."
```

## Transformación

El generador crea un archivo markdown en `docs/teatro/{slug}.md` con:

1. **Frontmatter Jekyll**: Replica campos del YAML
2. **Layout**: `layout: obra` (usa `_layouts/obra.html`)
3. **Permalink**: `/teatro/{slug}/`
4. **Escenas**: Array de objetos para el template

## Algoritmo de posicionamiento

El layout `obra.html` usa este algoritmo para distribuir escenas en anillos:

```javascript
// Mapeo anillo → radio (px)
anillo_0: radio = 0     (centro)
anillo_1: radio = 1000  (partida)
anillo_2: radio = 2000  (iniciación)
anillo_3: radio = 3000  (retorno)

// Distribución angular
angulo = id_escena × 30°  // Separación de 30° entre escenas

// Posición cartesiana
x = radio × cos(angulo)
y = radio × sin(angulo)
z = 0
```

## Ejemplo de salida

Para `hola-mundo`:

```markdown
---
layout: obra
titulo: "Hola Mundo"
slug: hola-mundo
escenas:
  - id: 1
    nombre: "Presentación"
    anillo: 0
    ...
permalink: /teatro/hola-mundo/
---
```

Se renderiza como:
- URL: `https://.../teatro/hola-mundo/`
- Vista 3D con navegación por anillos
- Controles: teclado, slider, árbol-índice

## Campos opcionales

| Campo | Default | Notas |
|-------|---------|-------|
| `contenido_ref` | descripcion | Ruta relativa a markdown externo |
| `prueba` | — | Desafío interactivo |
| `feature` | — | Feature del Scriptorium demostrado |
| `meta` | — | Metadatos adicionales |

## Validaciones

- ❌ Sin `titulo` → Error
- ❌ Sin `slug` → Error
- ❌ Sin `escenas` → Error
- ❌ Escena sin `anillo` → Default: 1
- ⚠️ `contenido_ref` apunta a archivo inexistente → Usar `descripcion`

## Próximos pasos

Este generador es **manual** en el MVP (Jekyll estático).

En v2.0, se automatizará con:
- Script de build que escanea `TALLER/`
- Regeneración automática en cada commit
- Validación de YAML con esquema
