---
mode: 'agent'
description: 'UC1: Genera una obra de teatro transmedia con estructura de monomito (12 estadios)'
tools: ['read', 'edit', 'agent']
---

# Generar Obra de Teatro

Genera el YAML de una obra de teatro transmedia personalizada.

## Entrada

Pregunta al usuario:

1. **Título**: Nombre de la obra
2. **Tipo**: onboarding | narrativa | educativa | ritual
3. **Personaje guía**: Nombre del actor que guiará la experiencia
4. **Tema/Objetivo**: Qué aprenderá o experimentará el usuario
5. **Nivel**: introductorio | intermedio | avanzado

## Proceso

### 1. Consultar Plantillas

Lee la plantilla de monomito base:
```
ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/monomitos.json
```

### 2. Verificar Personaje

Consulta si el personaje existe:
```
ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json
```

Si no existe, informar que se creará durante la instalación.

### 3. Diseñar Estadios

Para cada uno de los 12 estadios del monomito:

| Estadio | Tipo | Anillo | Pregunta al usuario |
|---------|------|--------|---------------------|
| 1 | inicio | 0 | ¿Cuál es el punto de partida? |
| 2 | llamada | 1 | ¿Qué despierta el interés? |
| 3 | rechazo | 1 | ¿Qué duda o resistencia hay? |
| 4 | mentor | 1 | ¿Qué recurso/guía aparece? |
| 5 | umbral | 1 | ¿Cuál es el primer reto real? |
| 6 | aliados | 2 | ¿Qué herramientas descubre? |
| 7 | cueva | 2 | ¿Cuál es el desafío central? |
| 8 | ordalia | 2 | ¿Cuál es la prueba definitiva? |
| 9 | recompensa | 2 | ¿Qué habilidad o conocimiento gana? |
| 10 | retorno | 3 | ¿Cómo aplica lo aprendido? |
| 11 | resurreccion | 3 | ¿Qué síntesis realiza? |
| 12 | elixir | 3 | ¿Qué puede aportar al mundo? |

### 4. Asignar Features

Para cada estadio, asignar el @agente o recurso del Scriptorium que se usará:

| Feature | Descripción |
|---------|-------------|
| `@vestibulo` | Orientación inicial |
| `@cartaspuerta` | Presentación por perfil |
| `@periodico` | Producción de noticias |
| `@blueflag` | Auditoría de verdad |
| `@blackflag` | Auditoría de poder |
| `@redflag` | Auditoría de estructura |
| `@yellowflag` | Auditoría de límites |
| `@orangeflag` | Auditoría de registro |
| `@plugin_ox_enciclopedia` | Consulta de tomos |
| `@plugin_ox_foroscraper` | Extracción de foros |
| `@plugin_ox_agentcreator` | Creación de agentes |
| `@plugin_ox_argboard` | Gestión de obras |
| `@plugin_ox_ghpages` | Publicación web |

### 5. Generar YAML

Crear archivo en:
```
ARCHIVO/PLUGINS/TEATRO/obras/{id}.yaml
```

Con estructura:

```yaml
id: "{slug-del-titulo}"
titulo: "{Título}"
tipo: "{tipo}"
personaje_guia: "{id_actor}"
descripcion: |
  {Descripción de la obra en 2-3 líneas}

estadios:
  - id: 1
    nombre: "{Nombre del estadio 1}"
    anillo: 0
    tipo: inicio
    prueba: "{Descripción de la prueba}"
    feature: "{@agente}"
    
  - id: 2
    nombre: "{Nombre del estadio 2}"
    anillo: 1
    tipo: llamada
    prueba: "{Descripción de la prueba}"
    feature: "{@agente}"
    
  # ... hasta 12

meta:
  duracion_estimada: "{X horas}"
  nivel: "{nivel}"
  prerequisitos:
    - "{prerequisito 1}"
  tags:
    - "{tag1}"
    - "{tag2}"
  creado: "{YYYY-MM-DD}"
  autor: "Teatro Interactivo"
```

## Salida

1. Mostrar resumen de la obra generada
2. Confirmar ruta del archivo YAML
3. Preguntar si desea instalar ahora (invocar UC2)

## Ejemplo: Camino del Tarotista

```yaml
id: camino-del-tarotista
titulo: "El Camino del Tarotista"
tipo: onboarding
personaje_guia: tarotista
descripcion: |
  El Tarotista ofrece una visita guiada al Scriptorium,
  pasando por cada feature como una prueba del Camino del Héroe.

estadios:
  - id: 1
    nombre: "El Vestíbulo"
    anillo: 0
    tipo: inicio
    prueba: "Conocer las Cartas-Puerta"
    feature: "@vestibulo, @cartaspuerta"
    
  - id: 2
    nombre: "La Biblioteca"
    anillo: 1
    tipo: llamada
    prueba: "Consultar un tomo en la Enciclopedia"
    feature: "@plugin_ox_enciclopedia"
    
  # ... etc.

meta:
  duracion_estimada: "2-3 horas"
  nivel: introductorio
  prerequisitos:
    - "VS Code"
    - "GitHub Copilot"
  tags:
    - onboarding
    - tour
  creado: "2025-12-22"
  autor: "Teatro Interactivo"
```

## Validaciones

- [ ] ID es único (no existe en obras.json)
- [ ] Tiene exactamente 12 estadios
- [ ] Cada estadio tiene: id, nombre, anillo, tipo, prueba, feature
- [ ] anillo está en rango 0-3
- [ ] tipo es válido según monomito

## Siguiente Paso

Preguntar al usuario:
> "¿Deseas instalar la obra ahora? Esto la registrará en la cartelera."

Si acepta, invocar `teatro-instalar-obra.prompt.md`.
