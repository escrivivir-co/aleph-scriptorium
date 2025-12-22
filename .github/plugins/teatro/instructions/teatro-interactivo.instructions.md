---
name: Teatro Interactivo
description: Contexto unificado del sistema de teatro transmedia para agentes.
applyTo: "ARCHIVO/PLUGINS/TEATRO/**/*.yaml, docs/teatro.md, docs/teatro/**/*"
---
# Instrucciones: Teatro Interactivo

> **Plugin**: teatro v1.0.0  
> **Dependencias**: arg-board, agent-creator, gh-pages

---

## Qué es el Teatro Interactivo

El Teatro Interactivo es un sistema que permite crear **experiencias guiadas transmedia** dentro del Scriptorium. Cada "obra" es un recorrido de 12 estadios (siguiendo el monomito de Campbell) donde el usuario completa pruebas guiado por un personaje (agente especializado).

---

## Arquitectura de Plugins

```
                    ┌─────────────────┐
                    │     TEATRO      │ ← Orquestador
                    │  (este plugin)  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   ARG_BOARD   │    │ AGENT_CREATOR │    │   GH-PAGES    │
│               │    │               │    │               │
│ - obras.json  │    │ - recipes/    │    │ - docs/       │
│ - actores.json│    │ - agents/     │    │ - _config.yml │
│ - monomitos   │    │ - logs/       │    │ - teatro.md   │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## Flujo de Datos

### Generación de Obra

```
Usuario → Teatro.generar → YAML → ARCHIVO/PLUGINS/TEATRO/obras/{id}.yaml
```

### Instalación de Obra

```
YAML → Teatro.instalar → [AGENT_CREATOR si falta personaje]
                       → ARG_BOARD.obras.json
                       → GH-PAGES.docs/teatro.md
```

### Ejecución de Obra

```
Teatro.ejecutar → ARG_BOARD.cambiar_estado("en_escena")
                → Generar docs/teatro/{id}/index.html
                → GH-PAGES.publicar(modo: fusionar)
```

---

## Esquema YAML de Obras

```yaml
# Metadatos obligatorios
id: string              # Slug único (kebab-case)
titulo: string          # Nombre legible
tipo: enum              # onboarding | narrativa | educativa | ritual
personaje_guia: string  # ID del actor en actores.json
descripcion: string     # Sinopsis de la obra

# Estructura de 12 estadios
estadios:
  - id: number          # 1-12
    nombre: string      # Nombre del estadio
    anillo: number      # 0-3 (posición en visualización)
    tipo: enum          # Ver tipos de estadio abajo
    prueba: string      # Descripción de la prueba/tarea
    feature: string     # @agente o recurso que se usa
    contenido: string   # (opcional) Texto narrativo
    
# Metadatos opcionales
meta:
  duracion_estimada: string
  nivel: enum           # introductorio | intermedio | avanzado
  prerequisitos: array
  tags: array
```

### Tipos de Estadio (Monomito de Campbell)

| ID | Tipo | Descripción | Anillo |
|----|------|-------------|--------|
| 1 | inicio | Mundo ordinario | 0 |
| 2 | llamada | Llamada a la aventura | 1 |
| 3 | rechazo | Rechazo de la llamada | 1 |
| 4 | mentor | Encuentro con el mentor | 1 |
| 5 | umbral | Cruce del primer umbral | 1 |
| 6 | aliados | Pruebas, aliados, enemigos | 2 |
| 7 | cueva | Acercamiento a la cueva | 2 |
| 8 | ordalia | Ordalía suprema | 2 |
| 9 | recompensa | Recompensa | 2 |
| 10 | retorno | Camino de regreso | 3 |
| 11 | resurreccion | Resurrección | 3 |
| 12 | elixir | Retorno con el elixir | 3 |

---

## Sistema de Anillos

La visualización 3D organiza los 12 estadios en 4 anillos concéntricos:

| Anillo | Estadios | Concepto |
|--------|----------|----------|
| 0 | Inicio | Centro, punto de partida |
| 1 | 1-4 | Primera expansión (preparación) |
| 2 | 5-8 | Segunda expansión (pruebas) |
| 3 | 9-12 | Periferia (retorno) |

### Navegación

- **Vertical (slider)**: Cambia entre anillos
- **Horizontal (flechas)**: Navega dentro del anillo
- **Árbol lateral**: Acceso directo a cualquier estadio

---

## Integración con ARG_BOARD

### Estados de Obra

Teatro hereda la máquina de estados de ARG_BOARD:

```
GENESIS → CASTING → EN_CARTEL → EN_ESCENA → CLAUSURADO
```

| Estado | Significado |
|--------|-------------|
| genesis | Obra en diseño (solo YAML) |
| casting | Buscando personajes |
| en_cartel | Instalada, visible en cartelera |
| en_escena | Activa, con página publicada |
| clausurado | Archivada |

### obras.json

Al instalar una obra, Teatro añade entrada en `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json`:

```json
{
  "id": "camino-del-tarotista",
  "titulo": "El Camino del Tarotista",
  "tipo": "onboarding",
  "estado": "en_cartel",
  "etapa_actual": 0,
  "actores": ["tarotista"],
  "meta": {
    "origen": "teatro",
    "yaml": "ARCHIVO/PLUGINS/TEATRO/obras/camino-del-tarotista.yaml"
  }
}
```

---

## Integración con AGENT_CREATOR

Cuando el personaje_guia de una obra no existe en actores.json, Teatro invoca AGENT_CREATOR para crearlo.

### Pipeline

1. Teatro detecta personaje faltante
2. Invoca `@plugin_ox_agentcreator` con especificación
3. AGENT_CREATOR genera receta y agente
4. Teatro registra actor en actores.json
5. Continúa instalación de obra

---

## Integración con GH-PAGES

### Cartelera (docs/teatro.md)

Página estática con:
- Obra "en escena" destacada
- Grid de obras "en cartel"
- Archivo de obras clausuradas

### Páginas de Obra (docs/teatro/{id}/)

Cada obra en escena tiene:
- `index.html`: Visualizador impress.js
- `style.css`: Estilos específicos
- `script.js`: Navegación

### Publicación

Teatro usa GH-PAGES en modo `fusionar` para añadir páginas sin eliminar contenido existente.

---

## Archivos y Rutas

| Tipo | Ruta | Descripción |
|------|------|-------------|
| YAML obras | `ARCHIVO/PLUGINS/TEATRO/obras/{id}.yaml` | Definición de obra |
| Logs | `ARCHIVO/PLUGINS/TEATRO/logs/` | Historial de operaciones |
| Cartelera | `docs/teatro.md` | Página web principal |
| Páginas | `docs/teatro/{id}/` | Visualizadores por obra |
| Estado | `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/` | Datos compartidos con ARG |

---

## Protocolo DevOps

### Commits

```
feat(teatro): generar obra "{titulo}"
feat(teatro): instalar "{id}" en cartelera
feat(teatro): ejecutar "{id}" (poner en escena)
fix(teatro): corregir {descripción}
docs(teatro): actualizar cartelera

refs #SCRIPT-1.0.0-T0xx
```

### Backlog

Las tareas de Teatro están en `BACKLOG-SCRIPTORIUM.md` bajo la épica **SCRIPT-1.0.0**.

---

## Lo que NO hacer

- **No modificar obras.json directamente**: Usar Teatro o ARG_BOARD
- **No crear páginas sin instalar obra**: El flujo es generar → instalar → ejecutar
- **No mezclar actores de distintas obras** sin registro
- **No publicar sin pasar por GH-PAGES**: Mantener coherencia del sitio
