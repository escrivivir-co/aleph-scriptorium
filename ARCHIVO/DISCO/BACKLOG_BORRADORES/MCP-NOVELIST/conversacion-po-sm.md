# Conversación PO-SM: MCP Novelist

**Fecha**: 2025-12-24  
**Submódulo**: `mcp-novelist`  
**Plugin objetivo**: `novelist`

---

## Diálogo

### Product Owner (PO)

**PO**: "Hemos integrado el submódulo `mcp-novelist`. Es un servidor MCP que provee herramientas para gestionar estructuras narrativas: novelas, capítulos, escenas, personajes. ¿Cómo lo integramos con el Scriptorium?"

### Scrum Master (SM)

**SM**: "Revisemos qué tenemos. Veo que mcp-novelist es un **servidor MCP de memoria a largo plazo** que usa la metáfora de novelas para organizar información. Tiene 25+ herramientas agrupadas en:

- **Discovery**: `listNovels`, `getNovelDetails`, `listCharacters`, `listScenes`
- **Creation**: `createNovel`, `createCharacter`, `createScene`, `createChapter`
- **Retrieval**: `getScene`, `getCharacterDetails`, `listScenesByNovel`
- **Management**: `saveCurrentState`, `configureAutoSave`, `updateScene`, `deleteChapter`

El servidor corre en `localhost:3066` (HTTP streamable transport). Ya tiene 3 chatmodes propios: **Editor** (inicializar/recuperar), **Albacea** (crear contenido), **Lector** (consultar).

**PO**: "Bien. Te planteo el caso de uso principal:

> Un usuario abre su Scriptorium y le pide a @aleph usar Novelist para editar una obra que tiene en el TALLER de ARG_BOARD. Los personajes los ha volcado a AGENT_CREATOR para editarlos, los trabaja con Teatro y acaba usando su novela como trama para la obra.

¿Cómo sería este flujo?"

---

## Análisis del Caso de Uso: CU1 — Novelist como Backbone de Teatro

### Flujo Propuesto

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      FLUJO: NOVELIST + SCRIPTORIUM                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌───────────────┐      ┌───────────────┐      ┌───────────────┐       │
│   │  MCP-NOVELIST │      │   SCRIPTORIUM  │      │    TALLER     │       │
│   │   (Puerto     │◀────▶│   (Plugin)     │◀────▶│   (ARG_BOARD) │       │
│   │    3066)      │      │                │      │               │       │
│   └───────────────┘      └───────────────┘      └───────────────┘       │
│          │                      │                      │                │
│          │                      ▼                      │                │
│          │              ┌───────────────┐              │                │
│          │              │ AGENT_CREATOR │◀─────────────┘                │
│          │              │  (personajes) │                               │
│          │              └───────┬───────┘                               │
│          │                      │                                       │
│          │                      ▼                                       │
│          │              ┌───────────────┐                               │
│          └─────────────▶│    TEATRO     │                               │
│       (trama)           │   (obras)     │                               │
│                         └───────────────┘                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Mapeo Ontológico: Novelist ↔ Scriptorium

| Novelist | Scriptorium | Función |
|----------|-------------|---------|
| `novel` | `obra.yaml` (TALLER) | Contenedor de historia |
| `chapter` | Estadio del monomito (1-12) | Fase narrativa |
| `scene` | `escenas/*.md` | Contenido de momento |
| `character` | `personajes/*.yaml` → recipe.json | Entidad del elenco |
| Editor chatmode | @plugin_ox_novelist | Inicializar/recuperar |
| Albacea chatmode | @aleph + prompts | Crear contenido |
| Lector chatmode | @revisor + queries | Consultar/auditar |

### Mapeo de Herramientas MCP → Prompts Scriptorium

| Tool MCP | Prompt Scriptorium | Uso |
|----------|-------------------|-----|
| `alephAlpha_createNovel` | `novelist-crear-obra.prompt.md` | Iniciar novela/obra |
| `alephAlpha_createCharacter` | `novelist-crear-personaje.prompt.md` | Crear personaje → AGENT_CREATOR |
| `alephAlpha_createScene` | `novelist-crear-escena.prompt.md` | Escribir escena |
| `alephAlpha_createChapter` | `novelist-crear-capitulo.prompt.md` | Agrupar escenas en estadio |
| `alephAlpha_listNovels` | `novelist-listar.prompt.md` | Ver obras disponibles |
| `alephAlpha_saveCurrentState` | Automático | Persistir cambios |

---

**SM**: "Entendido el flujo. Ahora veamos cómo implementarlo. Identifico los siguientes gaps:"

---

## Gaps Identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | Novelist no conoce la estructura TALLER del Scriptorium | Must | 1 |
| G2 | Novelist tiene su propio `novel-data.json`, necesitamos sync con `obra.yaml` | Must | 1 |
| G3 | Characters de Novelist no mapean a recipes de AGENT_CREATOR | Must | 1 |
| G4 | Chapters de Novelist no mapean a estadios del monomito (1-12) | Should | 1 |
| G5 | No hay exportación de novel → obra.yaml para Teatro | Must | 2 |
| G6 | No hay importación de obra.yaml → novel para edición | Must | 2 |
| G7 | Servidor Novelist debe estar corriendo (puerto 3066) | Must | 1 |
| G8 | VS Code mcp.json debe apuntar a Novelist server | Must | 1 |
| G9 | Scenes de Novelist no tienen formato escena de Teatro | Should | 2 |
| G10 | Novelist no conoce el BOE del Teatro | Could | 3 |

---

## Arquitectura Propuesta

### Modo Híbrido (Ligero/Completo)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     MODOS DE OPERACIÓN                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   MODO LIGERO (Sin servidor MCP)                                    │
│   ─────────────────────────────                                     │
│   - Plugin trabaja solo con archivos locales (TALLER, ELENCO)       │
│   - Sin herramientas MCP, solo prompts de edición                   │
│   - Conversión manual entre formatos                                 │
│                                                                      │
│   MODO COMPLETO (Con servidor MCP en 3066)                          │
│   ──────────────────────────────────────────                        │
│   - Plugin conecta a mcp-novelist via mcp.json                      │
│   - Herramientas MCP disponibles (25+)                              │
│   - Sincronización bidireccional TALLER ↔ novel-data.json           │
│   - Persistencia automática                                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Esquema de Datos: Transformaciones

**1. Novel ↔ obra.yaml**

```yaml
# mcp-novelist: novel-data.json
{
  "novel1": {
    "id": "novel1",
    "title": "El Camino del Tarotista",
    "author": "Usuario",
    "genre": ["onboarding", "fantástico"],
    "summary": "El Tarotista guía al usuario...",
    "characters": ["tarotista"],
    "chapters": ["chap1", "chap2", ...],
    "setting": "El Scriptorium"
  }
}

# scriptorium: TALLER/camino-del-tarotista/obra.yaml
titulo: "El Camino del Tarotista"
tipo: onboarding
personaje_guia: tarotista
descripcion: "El Tarotista guía al usuario..."
estadios:
  - id: 1
    nombre: "El Vestíbulo"
    ...
```

**2. Character ↔ recipe.json + personaje.yaml**

```yaml
# mcp-novelist: character
{
  "id": "tarotista",
  "name": "El Tarotista",
  "description": "Guía místico del Scriptorium",
  "traits": ["enigmático", "sabio", "paciente"],
  "backstory": "Un personaje que conoce todos los senderos..."
}

# scriptorium: AGENT_CREATOR/recipes/tarotista.recipe.json
{
  "id": "tarotista",
  "name": "Tarotista",
  "base_agent": "yellowflag",
  "personality": {
    "traits": ["enigmático", "sabio", "paciente"]
  },
  "backstory": "Un personaje que conoce todos los senderos..."
}

# scriptorium: TALLER/ELENCO/tarotista/tarotista.agent.md
---
name: Tarotista
description: "Guía místico del Scriptorium"
...
---
```

**3. Chapter ↔ estadio del monomito**

```yaml
# mcp-novelist: chapter
{
  "id": "chap1",
  "title": "El Vestíbulo",
  "scenes": ["scene1", "scene2"],
  "summary": "Primera fase del viaje"
}

# scriptorium: obra.yaml → estadios[0]
estadios:
  - id: 1
    nombre: "El Vestíbulo"
    anillo: 0
    tipo: inicio
    contenido_ref: "escenas/01-vestibulo.md"
```

**4. Scene ↔ escena/*.md**

```yaml
# mcp-novelist: scene
{
  "id": "scene1",
  "title": "Bienvenida al Vestíbulo",
  "setting": "La entrada del Scriptorium",
  "characters": ["tarotista"],
  "summary": "El Tarotista da la bienvenida",
  "content": "El espacio se ilumina suavemente..."
}

# scriptorium: TALLER/.../escenas/01-vestibulo.md
---
titulo: "Bienvenida al Vestíbulo"
setting: "La entrada del Scriptorium"
personajes:
  - tarotista
---

El espacio se ilumina suavemente...
```

---

**PO**: "Perfecto. Ahora dame el caso ficticio: ¿cómo sería si hubiéramos generado 'El Camino del Tarotista' con Novelist y queremos exportar/importar tanto la obra como los personajes?"

---

## Caso Ficticio: El Camino del Tarotista

### Escenario

El usuario ha usado mcp-novelist para escribir "El Camino del Tarotista" como una novela interactiva. Tiene:

- **1 novel**: "El Camino del Tarotista"
- **12 chapters**: Correspondientes a los 12 estadios del monomito
- **12+ scenes**: Una o más escenas por capítulo
- **1 character**: El Tarotista (guía)

Ahora quiere **convertirlo en una obra del Teatro** para que otros usuarios puedan experimentarlo con el visualizador impress.js.

### Flujo de Exportación: Novelist → Teatro

```
┌─────────────────────────────────────────────────────────────────────┐
│                 EXPORTACIÓN: NOVELIST → TEATRO                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   PASO 1: Usuario ejecuta @novelist exportar-obra                   │
│                                                                      │
│   @aleph → [NOVELIST] Exportar obra "El Camino del Tarotista"       │
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐    │
│   │ Plugin lee novel-data.json vía MCP tools                   │    │
│   │ - alephAlpha_getNovelDetails("camino-tarotista")           │    │
│   │ - alephAlpha_listCharacters("camino-tarotista")            │    │
│   │ - alephAlpha_listScenesByNovel("camino-tarotista")         │    │
│   └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│   PASO 2: Plugin genera estructura TALLER                           │
│                                                                      │
│   ARCHIVO/DISCO/TALLER/camino-del-tarotista/                        │
│   ├── obra.yaml              ← Generado desde novel                 │
│   ├── escenas/                                                       │
│   │   ├── 01-vestibulo.md    ← Generado desde scene                 │
│   │   ├── 02-biblioteca.md                                          │
│   │   └── ...                                                        │
│   └── personajes/                                                    │
│       └── tarotista.yaml     ← Generado desde character             │
│                                                                      │
│   PASO 3: Plugin sincroniza con AGENT_CREATOR                       │
│                                                                      │
│   ARCHIVO/PLUGINS/AGENT_CREATOR/                                     │
│   ├── recipes/tarotista.recipe.json                                  │
│   └── agents/created/tarotista.agent.md                              │
│                                                                      │
│   PASO 4: Plugin registra en ARG_BOARD                              │
│                                                                      │
│   ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/                               │
│   ├── obras.json      ← Añade "camino-del-tarotista"                │
│   └── actores.json    ← Añade "tarotista"                           │
│                                                                      │
│   PASO 5: Usuario invoca Teatro para publicar                       │
│                                                                      │
│   @aleph → [TEATRO] Ejecutar obra "camino-del-tarotista"            │
│                                                                      │
│   Resultado: Obra visible en                                         │
│   https://escrivivir-co.github.io/aleph-scriptorium/teatro/          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Flujo de Importación: Teatro → Novelist

```
┌─────────────────────────────────────────────────────────────────────┐
│                 IMPORTACIÓN: TEATRO → NOVELIST                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   PASO 1: Usuario ejecuta @novelist importar-obra                   │
│                                                                      │
│   @aleph → [NOVELIST] Importar obra desde TALLER                    │
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐    │
│   │ Plugin lee estructura TALLER                               │    │
│   │ - Lee obra.yaml                                             │    │
│   │ - Lee escenas/*.md                                          │    │
│   │ - Lee personajes/*.yaml                                     │    │
│   └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│   PASO 2: Plugin crea estructuras en Novelist via MCP              │
│                                                                      │
│   - alephAlpha_createNovel(...)                                     │
│   - alephAlpha_createCharacter(...) × N personajes                  │
│   - alephAlpha_createChapter(...) × 12 estadios                     │
│   - alephAlpha_createScene(...) × N escenas                         │
│                                                                      │
│   PASO 3: Usuario edita con herramientas Novelist                  │
│                                                                      │
│   - Usa Editor chatmode para recuperar                              │
│   - Usa Albacea chatmode para añadir/modificar                     │
│   - Usa Lector chatmode para consultar                              │
│                                                                      │
│   PASO 4: Usuario exporta de vuelta al Teatro                       │
│                                                                      │
│   @aleph → [NOVELIST] Exportar obra "camino-tarotista"              │
│   (Actualiza TALLER y Teatro)                                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Ejemplo Concreto: Datos de El Camino del Tarotista

**novel-data.json (Novelist)**:

```json
{
  "novels": {
    "camino-tarotista": {
      "id": "camino-tarotista",
      "title": "El Camino del Tarotista",
      "author": "Scriptorium",
      "genre": ["onboarding", "fantástico", "tutorial"],
      "summary": "El Tarotista ofrece una visita guiada al Scriptorium, pasando por cada feature como una prueba del Camino del Héroe.",
      "characters": ["tarotista"],
      "chapters": ["chap-vestibulo", "chap-biblioteca", "chap-hemeroteca", "chap-scriptorium", "chap-foro", "chap-laboratorio", "chap-teatro", "chap-ordalia", "chap-publicacion", "chap-mapa", "chap-integracion", "chap-elixir"],
      "setting": "El Scriptorium y sus dependencias"
    }
  },
  "characters": {
    "tarotista": {
      "id": "tarotista",
      "name": "El Tarotista",
      "description": "Guía místico que conduce al usuario por los 12 estadios del viaje del héroe dentro del Scriptorium",
      "traits": ["enigmático", "sabio", "paciente", "irónico"],
      "backstory": "Personaje creado para onboarding, combina la figura del mentor con la del bufón sagrado. Conoce cada rincón del Scriptorium."
    }
  },
  "chapters": {
    "chap-vestibulo": {
      "id": "chap-vestibulo",
      "title": "El Vestíbulo",
      "scenes": ["scene-bienvenida", "scene-cartas"],
      "summary": "Primera etapa: el usuario conoce las Cartas-Puerta"
    }
  },
  "scenes": {
    "scene-bienvenida": {
      "id": "scene-bienvenida",
      "title": "Bienvenida al Scriptorium",
      "setting": "La entrada principal, iluminada con luz suave",
      "characters": ["tarotista"],
      "summary": "El Tarotista da la bienvenida y explica las reglas del juego",
      "content": "El espacio se ilumina gradualmente. Una figura emerge de las sombras: el Tarotista. Sus ojos parecen contener constelaciones de conocimiento.\n\n—Bienvenido al Scriptorium —dice con una voz que resuena en múltiples frecuencias—. Este es un lugar donde las palabras cobran forma y las ideas se convierten en estructuras.\n\n—Antes de continuar, debo preguntarte: ¿qué buscas? ¿Conocimiento? ¿Herramientas? ¿Un lugar donde tus textos cobren vida?\n\n(El usuario debe elegir una carta-puerta para continuar)"
    }
  }
}
```

**TALLER/camino-del-tarotista/obra.yaml (Scriptorium)**:

```yaml
titulo: "El Camino del Tarotista"
tipo: onboarding
personaje_guia: tarotista
descripcion: >
  El Tarotista ofrece una visita guiada al Scriptorium,
  pasando por cada feature como una prueba del Camino del Héroe.

estadios:
  - id: 1
    nombre: "El Vestíbulo"
    anillo: 0
    tipo: inicio
    prueba: "Conocer las Cartas-Puerta"
    feature: "@vestibulo, @cartaspuerta"
    contenido_ref: "escenas/01-vestibulo.md"
    
  - id: 2
    nombre: "La Biblioteca"
    anillo: 1
    tipo: encuentro
    prueba: "Consultar un tomo en la Enciclopedia"
    feature: "@plugin_ox_enciclopedia"
    contenido_ref: "escenas/02-biblioteca.md"
    
  # ... 10 estadios más

meta:
  duracion_estimada: "2-3 horas"
  nivel: "introductorio"
  prerequisitos: ["VS Code", "GitHub Copilot"]
  novelist_id: "camino-tarotista"  # ← Referencia para sync
```

---

## Decisiones Arquitectónicas

1. **Bidireccionalidad**: Novelist ↔ TALLER. Ambos formatos son fuente de verdad según el contexto (edición vs publicación).

2. **Campo `novelist_id`**: Añadir a obra.yaml para mantener referencia cruzada con novel-data.json.

3. **Servidor MCP opcional**: El plugin funciona en modo ligero (solo archivos) si el servidor no está corriendo.

4. **Mapeo 12 chapters = 12 estadios**: Cada chapter corresponde a un estadio del monomito. Scenes dentro de un chapter se concatenan en una escena de Teatro.

5. **Characters → AGENT_CREATOR**: Los personajes de Novelist se convierten en recetas de agentes, permitiendo que participen en otras obras.

---

## Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Servidor Novelist no disponible | Media | Medio | Modo ligero sin MCP |
| Conflicto de datos (sync bidireccional) | Alta | Alto | Timestamp de última modificación, merge manual |
| Dependencia de mcp-core-sdk local | Alta | Alto | Incluir como submódulo o resolver path |
| Escenas largas no caben en Teatro | Baja | Medio | Paginación o scroll en visualizador |

---

## Próximos Pasos

1. Crear backlog borrador SCRIPT-1.13.0
2. Implementar plugin novelist con estructura mínima
3. Crear prompts de exportar/importar
4. Integrar con TALLER y AGENT_CREATOR
5. Prueba con "El Camino del Tarotista" existente

---

**SM**: "El backlog está listo. ¿Procedemos con la creación del plugin mínimo?"

**PO**: "Sí, crea el backlog borrador y la estructura mínima del plugin. Luego hacemos commit de todo."
