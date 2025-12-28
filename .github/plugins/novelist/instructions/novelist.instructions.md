---
name: Novelist (Editor de Narrativas)
description: Contexto y reglas para edición de obras narrativas con servidor MCP Novelist.
applyTo: "ARCHIVO/DISCO/TALLER/**/*.yaml, ARCHIVO/PLUGINS/NOVELIST/**/*.json, .github/plugins/novelist/**/*.md"
---

# Instrucciones: Plugin Novelist

> **Fuente de verdad**: `mcp-novelist/src/resources/novel-data.json` (modo completo) o `ARCHIVO/DISCO/TALLER/{obra}/` (modo ligero)

---

## Propósito

El plugin Novelist proporciona **memoria a largo plazo** para obras narrativas, usando la metáfora de novelas como contenedores de información estructurada.

---

## Ontología Novelist ↔ Scriptorium

| Novelist | Scriptorium | Descripción |
|----------|-------------|-------------|
| `novel` | `TALLER/{obra}/obra.yaml` | Contenedor de historia |
| `chapter` | Estadio del monomito (1-12) | Fase narrativa |
| `scene` | `escenas/*.md` | Momento con contenido |
| `character` | `ELENCO/{personaje}/recipe.json` | Entidad del elenco |
| `novel-data.json` | `.arrakis/obras.json` | Registro de obras |

---

## Estructura del Monomito (12 Estadios)

Los 12 capítulos de una obra siguen el Camino del Héroe:

### Anillo 0: Centro (Estadio 1)
- **1. Mundo Ordinario**: Punto de partida, statu quo

### Anillo 1: Partida (Estadios 2-4)
- **2. Llamada a la Aventura**: Ruptura del orden
- **3. Rechazo de la Llamada**: Resistencia inicial
- **4. Encuentro con el Mentor**: Guía aparece

### Anillo 2: Iniciación (Estadios 5-8)
- **5. Cruce del Umbral**: Punto de no retorno
- **6. Pruebas, Aliados, Enemigos**: Desarrollo
- **7. Aproximación a la Cueva**: Preparación
- **8. Ordalía**: Prueba central, muerte simbólica

### Anillo 3: Retorno (Estadios 9-12)
- **9. Recompensa**: Premio obtenido
- **10. Camino de Vuelta**: Regreso
- **11. Resurrección**: Transformación final
- **12. Retorno con el Elixir**: Nuevo equilibrio

---

## Formatos de Archivo

### obra.yaml (Scriptorium)

```yaml
titulo: "Título de la Obra"
tipo: onboarding|fantástico|drama|thriller|...
personaje_guia: id-personaje
descripcion: >
  Descripción de la obra.

estadios:
  - id: 1
    nombre: "Nombre del Estadio"
    anillo: 0|1|2|3
    tipo: inicio|encuentro|prueba|ordalia|recompensa|...
    contenido_ref: "escenas/01-nombre.md"
    
  - id: 2
    nombre: "..."
    # ...

personajes:
  - id: personaje-1
    nombre: "Nombre"
    rol: guia|protagonista|antagonista|aliado|...
    
meta:
  novelist_id: "id-en-novelist"  # Para sincronización
  creado: "2025-12-24"
  modificado: "2025-12-24"
```

### escena.md (Scriptorium)

```markdown
---
id: scene-1
titulo: "Título de la Escena"
estadio: 1
setting: "Descripción del lugar"
personajes:
  - personaje-1
  - personaje-2
---

# {Título de la Escena}

Contenido narrativo de la escena...

## Diálogo (opcional)

**Personaje 1**: Línea de diálogo.

**Personaje 2**: Respuesta.

## Notas del Director (opcional)

Indicaciones de puesta en escena, transiciones, etc.
```

### novel-data.json (Novelist)

```json
{
  "resources": {
    "novels": {
      "{id}": {
        "id": "{id}",
        "title": "Título",
        "author": "Autor",
        "genre": ["género1", "género2"],
        "summary": "Resumen",
        "characters": ["char-1", "char-2"],
        "chapters": ["chap-1", "chap-2"],
        "setting": "Contexto general"
      }
    },
    "chapters": {
      "{id}": {
        "id": "{id}",
        "title": "Título del Capítulo",
        "scenes": ["scene-1", "scene-2"],
        "summary": "Resumen"
      }
    },
    "scenes": {
      "{id}": {
        "id": "{id}",
        "title": "Título",
        "setting": "Lugar",
        "characters": ["char-1"],
        "summary": "Resumen",
        "content": "Contenido completo..."
      }
    },
    "characters": {
      "{id}": {
        "id": "{id}",
        "name": "Nombre",
        "description": "Descripción",
        "traits": ["rasgo1", "rasgo2"],
        "backstory": "Historia de fondo"
      }
    }
  }
}
```

---

## Reglas de Transformación

### Novelist → Scriptorium

| Campo Novelist | Campo Scriptorium | Transformación |
|----------------|-------------------|----------------|
| `novel.id` | `obra.yaml` (nombre archivo) | kebab-case |
| `novel.title` | `titulo` | Directo |
| `novel.genre` | `tipo` | Primer género o combinar |
| `novel.summary` | `descripcion` | Directo |
| `novel.characters` | `personajes` | Mapear a referencias |
| `novel.chapters` | `estadios` | Mapear orden a número 1-12 |
| `chapter.title` | `estadio.nombre` | Directo |
| `chapter.scenes` | `estadio.contenido_ref` | Primera escena = referencia |
| `scene.content` | `escenas/*.md` | Archivo independiente |
| `character.*` | `ELENCO/*/recipe.json` | Via AGENT_CREATOR |

### Scriptorium → Novelist

| Campo Scriptorium | Campo Novelist | Transformación |
|-------------------|----------------|----------------|
| `titulo` | `novel.title` | Directo |
| `tipo` | `novel.genre` | Array de uno |
| `descripcion` | `novel.summary` | Directo |
| `estadios[].nombre` | `chapter.title` | Directo |
| `escenas/*.md` (contenido) | `scene.content` | Leer archivo |
| `personajes[].id` | `character.id` | Desde recipe.json |

---

## Herramientas MCP Disponibles

### Discovery

| Tool | Propósito | Retorna |
|------|-----------|---------|
| `alephAlpha_listNovels` | Listar obras | Array de IDs y títulos |
| `alephAlpha_getNovelDetails` | Detalles obra | Objeto novel completo |
| `alephAlpha_listCharacters` | Listar personajes | Array de personajes |
| `alephAlpha_listScenes` | Listar escenas | Array de escenas |
| `alephAlpha_listScenesByNovel` | Escenas de obra | Array filtrado |
| `alephAlpha_listScenesByChapter` | Escenas de capítulo | Array filtrado |

### Creation

| Tool | Parámetros | Resultado |
|------|------------|-----------|
| `alephAlpha_createNovel` | title, author, genre, summary | ID de novela creada |
| `alephAlpha_createCharacter` | name, description, traits, backstory | ID de personaje |
| `alephAlpha_createScene` | title, setting, characters, content | ID de escena |
| `alephAlpha_createChapter` | title, scenes, summary | ID de capítulo |
| `alephAlpha_createChapterWithScenes` | chapter + array scenes | IDs creados |

### Management

| Tool | Propósito |
|------|-----------|
| `alephAlpha_updateScene` | Modificar escena existente |
| `alephAlpha_deleteChapter` | Eliminar capítulo |
| `alephAlpha_saveCurrentState` | Forzar guardado |
| `alephAlpha_configureAutoSave` | Configurar auto-guardado |

---

## Modos de Operación

### Modo Completo

**Requisitos**:
- Servidor `mcp-novelist` corriendo en `localhost:3066`
- Configuración en `.vscode/mcp.json`

**Capacidades**:
- 25+ herramientas MCP
- Auto-guardado configurable
- Persistencia en `novel-data.json`
- Soporte para múltiples obras simultáneas

### Modo Ligero

**Requisitos**:
- Solo archivos en TALLER
- Sin servidor MCP

**Capacidades**:
- Lectura/escritura de `obra.yaml`
- Lectura/escritura de `escenas/*.md`
- Sin herramientas MCP (solo prompts)
- Una obra a la vez

---

## Integración con Otros Plugins

### AGENT_CREATOR

Los personajes se sincronizan como recipes:

```json
{
  "nombre": "El Tarotista",
  "descripcion": "Guía místico del Scriptorium",
  "rasgos": ["enigmático", "sabio"],
  "backstory": "...",
  "base_agents": ["yellowflag"],
  "fuente": "novelist:camino-tarotista:tarotista"
}
```

### ARG_BOARD

Las obras exportadas se registran en:
- `obras.json`: Metadatos de la obra
- `actores.json`: Personajes como actores

### TEATRO

Las obras publicadas aparecen en:
- `docs/teatro.md`: Cartelera
- `docs/teatro/{obra}/`: Visualizador impress.js

---

## Lo que NO hacer

- **No editar `novel-data.json` directamente** (corrompe el servidor)
- **No crear escenas sin capítulo padre** (quedan huérfanas)
- **No duplicar personajes** (usar sincronización)
- **No mezclar IDs** entre Novelist y Scriptorium sin mapeo

---

## Verificación de Estado

Antes de operar, el agente debe verificar:

1. **¿Servidor MCP activo?** → `curl localhost:3066/health`
2. **¿Obra existe?** → `alephAlpha_getNovelDetails(id)`
3. **¿Modo correcto?** → Completo si servidor, Ligero si no

---

## Referencias

- **Plugin**: `.github/plugins/novelist/`
- **Submódulo**: `NovelistEditor/`
- **TALLER**: `ARCHIVO/DISCO/TALLER/`
- **AGENT_CREATOR**: `.github/plugins/agent-creator/`
- **ARG_BOARD**: `ARCHIVO/PLUGINS/ARG_BOARD/`
- **Obras**: `ARCHIVO/PLUGINS/NOVELIST/obras/`

---

## Integración: NovelistEditor Standalone

### Escenario

Un escritor abre VS Code directamente en `NovelistEditor/` (no en el Scriptorium completo). Necesita:
1. Acceder a las obras del Scriptorium padre
2. Usar las herramientas MCP si el servidor está activo
3. Trabajar en modo ligero si no hay servidor

### Archivos de Integración

| Archivo | Ubicación | Propósito |
|---------|-----------|-----------|
| `scriptorium-context.json` | `NovelistEditor/` | Rutas al Scriptorium padre |
| `scriptorium-context.schema.json` | `NovelistEditor/` | Validación del contexto |
| `escritor.chatmode.md` | `NovelistEditor/.github/chatmodes/` | Modo de bienvenida |
| `scriptorium-context.instructions.md` | `NovelistEditor/.github/instructions/` | Reglas de carga |

### Flujo de Primera Sesión

```
Usuario abre NovelistEditor/
       │
       ▼
Copilot detecta escritor.chatmode.md
       │
       ▼
Lee scriptorium-context.json
       │
       ├── ¿Scriptorium detectado? → Listar obras disponibles
       │
       └── ¿Servidor MCP activo? → Activar modo completo
       │
       ▼
Presenta bienvenida con obras disponibles
```

### Ejemplo de Prompt de Usuario

```
Hola. Soy un usuario de Aleph Scriptorium. Es la primera vez que 
abro este NovelistEditor. Soy uno de los escritores de la novela 
"Ítaca digital". Necesito hacer una sesión de escritura. 
¿Puedes ayudarme?
```

### Respuesta Esperada del Agente

1. **Detectar contexto**: Leer `scriptorium-context.json`
2. **Verificar obra**: Buscar "itaca-digital" en obras disponibles
3. **Cargar metadatos**: `novela.json`, `estructura.json`, `sincronizacion.json`
4. **Presentar estado**: Tabla con capítulos y progreso
5. **Ofrecer sesión**: "¿En qué capítulo quieres trabajar hoy?"

### Configuración de Rutas (Instalación Local)

Por ahora, las rutas son absolutas. En `scriptorium-context.json`:

```json
{
  "scriptorium": {
    "root": "/Users/morente/Desktop/NUEVA_BASE/SCRIPTORIUM/ALEPH"
  },
  "obras": {
    "path": "ARCHIVO/PLUGINS/NOVELIST/obras"
  }
}
```

**TODO**: Migrar a rutas relativas o variables de entorno:
- `ALEPH_SCRIPTORIUM_ROOT` para la raíz
- Detección automática si NovelistEditor es submódulo (`../`)

### Chatmodes Disponibles

| Chatmode | Rol | Cuándo usar |
|----------|-----|-------------|
| `escritor` | Sesiones de escritura | Primera vez, selección de obra |
| `editor` | Gestión de contenedores | Inicializar, recuperar, configurar |
| `albacea` | Creación de contenido | Añadir personajes, escenas, capítulos |
| `lector` | Consulta de información | Buscar, indexar, analizar |

### Sincronización con Scriptorium

Cuando el escritor termina una sesión:

1. **Guardar cambios locales**: Actualizar `capitulos/*.md`
2. **Actualizar estructura**: Modificar `estructura.json` (palabras, estado)
3. **Sincronizar Teatro** (opcional): Exportar a `TEATRO/obras/{id}.yaml`
4. **Commit** (si está en Scriptorium): `feat(novelist): sesión de escritura`

---

## Obras Disponibles (Ejemplo)

### Ítaca Digital

```yaml
id: itaca-digital
titulo: "Ítaca Digital: El Retorno del Navegante"
estado: borrador
estructura: monomito-12
capitulos: 12
personajeGuia: penelope
fuentes:
  - teatro: ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml
  - taller: ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA
  - remota: /Users/morente/Desktop/THEIA_PATH/NOVELA
```

### Crear Nueva Obra

Para crear una nueva obra:

1. Crear carpeta en `ARCHIVO/PLUGINS/NOVELIST/obras/{nueva-obra}/`
2. Crear `novela.json` con metadatos
3. Crear `estructura.json` con 12 capítulos
4. Crear `sincronizacion.json` con enlaces
5. Crear `capitulos/` con 12 archivos `.md`
6. Actualizar `scriptorium-context.json` en NovelistEditor

