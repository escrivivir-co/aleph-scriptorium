---
name: Generar BOE desde Obra
description: Crea una entrada del Boletín Oficial del Estado Escénico para registrar las escenas de una obra
agent: Aleph
tools: ['read', 'edit', 'search']
---

# Prompt: Generar BOE desde Obra

## Objetivo

Crear una entrada del **BOE (Boletín Oficial del Estado Escénico)** que registre las escenas de una obra. El BOE sirve como fuente de verdad para el mapa de diapositivas de impress.js.

## Entradas

- **obra_id**: ID de la obra (ej: `camino_del_tarotista`)
- **fecha**: Fecha de publicación (ej: `2025-12-23`)

## Procedimiento

### 1. Leer la obra de obras.json

```
ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json → obras[{obra_id}]
```

### 2. Generar entrada BOE

Para cada escena de la obra, crear una entrada con este schema:

```json
{
  "fecha": "{fecha}",
  "numero": N,
  "temporada": 1,
  "teatro": "Scriptorium Transmedia",
  "obra": "{obra_id}",
  "sumario": [...],
  "escenas": [
    {
      "identificador": "ARRAKIS-ESCENA-{obra}-{N}-{fecha}",
      "titulo": "Escena {N}: {nombre}",
      "texto": "{descripcion}",
      "metadata": {
        "tipo": "registro_escena",
        "obra": "{obra_id}",
        "escena_id": N,
        "anillo": M,
        "tipo_monomito": "{tipo}",
        "posicion_3d": {
          "x": X,
          "y": Y,
          "z": 0,
          "rotate_z": R
        },
        "hipervinculaciones": {
          "prev": "step-{N-1}",
          "next": "step-{N+1}",
          "branch": []
        }
      }
    }
  ]
}
```

### 3. Calcular posiciones 3D

Usar el sistema de anillos:

| Anillo | Radio | Estadios |
|--------|-------|----------|
| 0 | 0 | Centro (inicio) |
| 1 | 1000px | 1-4 (arriba, derecha, abajo, izquierda) |
| 2 | 2000px | 5-8 |
| 3 | 3000px | 9-12 |

Fórmula de posición:
- `x = radio * cos(angulo)`
- `y = radio * sin(angulo)`
- `angulo = (posicion_en_anillo) * 90°`

### 4. Guardar BOE

```
ARCHIVO/PLUGINS/ARG_BOARD/BOE/boe-{fecha}.json
```

Si ya existe un BOE para esa fecha, añadir la sección de escenas a las existentes.

## Salida

Archivo JSON del BOE actualizado con las escenas de la obra.

## Ejemplo de uso

```
@aleph genera BOE para la obra camino_del_tarotista
```

## Notas

- El BOE es inmutable una vez publicado (solo se añaden secciones)
- Cada escena tiene un identificador único
- Las hipervinculaciones permiten navegación no lineal (ramas)
