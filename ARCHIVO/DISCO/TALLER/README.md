# TALLER — Proyectos de Usuario

> **Ubicación**: `ARCHIVO/DISCO/TALLER/`  
> **Propósito**: Inicializar y desarrollar obras teatrales transmedia

---

## ¿Qué es el Taller?

El Taller es el espacio de trabajo donde los usuarios crean, desarrollan y prueban sus **obras teatrales transmedia** antes de publicarlas en la cartelera pública.

### Flujo de trabajo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FLUJO DEL TALLER                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   1. INICIAR              2. DESARROLLAR           3. PUBLICAR           │
│   ─────────────           ──────────────           ───────────           │
│                                                                          │
│   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐       │
│   │   TALLER/   │    →    │ ARG_BOARD/  │    →    │  docs/      │       │
│   │ {proyecto}/ │         │ .arrakis/   │         │  teatro/    │       │
│   └─────────────┘         └─────────────┘         └─────────────┘       │
│                                                                          │
│   Crear carpeta           Registrar en            Generar página         │
│   con YAML de obra        obras.json y            impress.js y           │
│   y personajes            actores.json            publicar               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Conceptos Clave del Teatro

### 1. BOE (Boletín Oficial del Estado Escénico)

El **BOE** es una **cadena hipervinculada** que registra todo lo que ocurre en el teatro:
- Creación de obras
- Registro de actores/personajes
- Cambios de estado
- Entradas de BOE = Diapositivas de impress.js

> **BOE → Mapa de diapositivas impress.js**

Ver: `ARCHIVO/PLUGINS/ARG_BOARD/BOE/`

### 2. Monomito (Camino del Héroe en 12 Etapas)

Cada obra se estructura en **12 estadios** siguiendo el monomito de Campbell:

| Fase | Estadios | Descripción |
|------|----------|-------------|
| **PARTIDA** | 1-4 | Mundo ordinario → Cruce del umbral |
| **INICIACIÓN** | 5-8 | Pruebas → Ordalía |
| **RETORNO** | 9-12 | Recompensa → Elixir |

Los estadios se mapean a **anillos concéntricos** en impress.js:
- **Anillo 0**: Centro (inicio)
- **Anillo 1**: Estadios 1-4
- **Anillo 2**: Estadios 5-8
- **Anillo 3**: Estadios 9-12

Ver: `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/monomitos.json`

### 3. Elenco (Personajes)

Los personajes se crean en **AGENT_CREATOR** y se inyectan en las obras:

```
AGENT_CREATOR                    ARG_BOARD
─────────────                    ─────────
                                 
recipe.json  ────────────────→   actores.json
    +                                +
agente.agent.md  ────────────→   obras.json
```

Ver: `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/`

---

## Estructura de un Proyecto

```
TALLER/
└── {nombre-proyecto}/
    ├── README.md           # Descripción del proyecto
    ├── obra.yaml           # Definición de la obra (12 estadios)
    ├── personajes/         # Personajes del elenco
    │   ├── protagonista.yaml
    │   └── ...
    ├── escenas/            # Contenido de cada escena
    │   ├── 01-mundo-ordinario.md
    │   └── ...
    └── assets/             # Recursos visuales (opcional)
        ├── poster.png
        └── ...
```

---

## Proyectos Existentes

| Proyecto | Estado | Descripción |
|----------|--------|-------------|
| [hola-mundo](hola-mundo/) | 🟡 Ejemplo | Primera obra demo: el Tarotista se presenta |
| [camino-del-tarotista](camino-del-tarotista/) | ⏳ Pendiente | Showcase completo de features del Scriptorium |

---

## Cómo Iniciar un Nuevo Proyecto

1. Crear carpeta con nombre kebab-case
2. Copiar plantilla desde `_plantilla/`
3. Personalizar `obra.yaml` con los 12 estadios
4. Crear personajes en `personajes/`
5. Desarrollar escenas en `escenas/`
6. Invocar `@teatro` para instalar la obra

---

## Referencia

- **Plugin Teatro**: `.github/plugins/teatro/`
- **ARG_BOARD**: `ARCHIVO/PLUGINS/ARG_BOARD/`
- **AGENT_CREATOR**: `ARCHIVO/PLUGINS/AGENT_CREATOR/`
- **Cartelera pública**: `docs/teatro.md`
