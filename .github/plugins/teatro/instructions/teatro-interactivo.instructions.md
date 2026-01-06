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

## Integración con MCP Prolog (TEATRO-PROLOG-1.0.0)

> **Épica**: TEATRO-PROLOG-1.0.0 (FC1)

Las obras pueden incluir **packs Prolog** que definen el comportamiento lógico de sus personajes.

### Propiedad mcpPacks en YAML de Obra

```yaml
id: itaca_digital
titulo: "Ítaca Digital"
# ... otros campos ...

# Integración Prolog (opcional)
mcpPacks:
  - ObraItacaDigital    # Referencia a pack en ARCHIVO/PLUGINS/TEATRO/packs/
```

### Schema de Pack

Los packs siguen el schema `obra-pack.schema.json`:

```json
{
  "id": "ObraItacaDigital",
  "version": "1.0.0",
  "obraId": "itaca_digital",
  "mcpServer": "prolog-mcp-server",
  "personajes": [
    {
      "name": "lucas",
      "brainFile": "brains/lucas.brain.pl",
      "agentRef": "@indice"
    }
  ]
}
```

### Flujo de Ejecución con Prolog

```
1. Teatro.ejecutar(obra_id)
   │
2. Cargar mcpPacks declarados
   │
3. Para cada personaje con brainFile:
   │   └── prolog_consult_file(brainFile)
   │
4. En cada turno/estadio:
   │   └── prolog_query("decidir_accion(personaje, A)")
   │
5. Acción retornada → Teatro ejecuta handoff correspondiente
```

### Prompt MCP: teatro_agent_session

El prompt `teatro_agent_session` en MCPPrologServer orquesta el workflow completo:

```
@mcp teatro_agent_session obraId=itaca_digital agentName=lucas
```

Este prompt:
1. Crea/reutiliza sesión Prolog
2. Carga cerebro del personaje
3. Ejecuta query de decisión
4. Retorna acción recomendada

### Ubicaciones de Archivos

| Recurso | Ubicación |
|---------|-----------|
| Schema de pack | `ARCHIVO/PLUGINS/TEATRO/schemas/obra-pack.schema.json` |
| Packs de obra | `ARCHIVO/PLUGINS/TEATRO/packs/*.pack.json` |
| Cerebros Prolog | `ARCHIVO/PLUGINS/TEATRO/packs/brains/*.brain.pl` |
| Template cerebro | `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/brain.pl.template` |

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

## Integración con AgentLoreSDK (Plantillas)

> **Épica**: AGENT-TEMPLATES-1.0.0

Los personajes pueden tener **plantillas AgentLoreSDK** asignadas para carga bajo demanda.

### Configuración en obras.json

Cuando un actor tiene plantillas, se declara en `actores_config`:

```json
{
  "actores": ["lucas", "tarotista"],
  "actores_config": {
    "lucas": {
      "templates_enabled": true,
      "templates_index": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/templates-index.json",
      "templates_categories": ["documentation", "project-management"],
      "brain_file": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"
    }
  }
}
```

### Flujo de Carga de Plantillas

```
1. Teatro.ejecutar(obra_id, escena_id)
   │
2. Verificar actores de la escena
   │
3. Para cada actor con templates_enabled:
   │   └── Cargar templates_index.json en sesión Prolog
   │
4. Query de contexto:
   │   └── prolog_query("plantilla_recomendada(Contexto, P)")
   │
5. Si hay plantilla recomendada:
   │   └── prolog_query("cargar_plantilla(P, Ruta)")
   │   └── read_file(Ruta) → Contenido de plantilla
   │
6. Actor usa contenido para su acción
```

### TypedPrompt Schemas para Plantillas

| Schema | Uso |
|--------|-----|
| `lucas-template-request.schema.json` | Request de carga de plantilla |
| `lucas-template-response.schema.json` | Response con plantilla cargada |

### Ubicación de Índices por Personaje

| Personaje | Índice de Plantillas |
|-----------|---------------------|
| Lucas | `ARCHIVO/DISCO/TALLER/ELENCO/lucas/templates-index.json` |

### Catálogo Global

El catálogo global de AgentLoreSDK está en:
- **Índice**: `.github/plugins/agent-creator/index/catalog.json`
- **Submódulo**: `AgentLoreSDK/cli-tool/components/`

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

---

## Integración BOE → Mapa de Diapositivas (Impress.js)

> **Referencia**: SCRIPT-1.3.0

### Concepto

El **BOE (Boletín Oficial del Estado Escénico)** es la fuente de verdad para el mapa de navegación de impress.js. Cada entrada del BOE representa una diapositiva o grupo de diapositivas.

### Schema BOE para Escenas

```json
{
  "seccion": "IV. Registro de Escenas",
  "items": [
    {
      "identificador": "ARRAKIS-ESCENA-{obra}-{escena}-{fecha}",
      "titulo": "Escena N: {nombre}",
      "texto": "Descripción narrativa de la escena.",
      "metadata": {
        "tipo": "registro_escena",
        "obra": "{obra_id}",
        "escena_id": N,
        "anillo": M,
        "tipo_monomito": "{inicio|llamada|mentor|umbral|...}",
        "posicion_3d": {
          "x": 0,
          "y": 0,
          "z": 0,
          "rotate_z": 30
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

### Mapeo BOE → Impress.js

| BOE | Impress.js | Descripción |
|-----|------------|-------------|
| `escena_id` | `id="step-{N}"` | Identificador del paso |
| `anillo` | Radio calculado | 0=0px, 1=1000px, 2=2000px, 3=3000px |
| `escena_id × 30` | `data-rotate-z` | Rotación angular |
| `posicion_3d.x` | `data-x` | Posición horizontal |
| `posicion_3d.y` | `data-y` | Posición vertical |
| `hipervinculaciones.prev` | Link ← | Navegación hacia atrás |
| `hipervinculaciones.next` | Link → | Navegación hacia adelante |

### Flujo de Generación

```
1. Obra definida en YAML (escenas con anillo/tipo)
     ↓
2. Teatro.instalar() genera entrada BOE
     ↓
3. BOE registra cada escena con metadata 3D
     ↓
4. Teatro.ejecutar() lee BOE
     ↓
5. Layout obra.html genera <div class="step"> desde BOE
     ↓
6. teatro.js inicializa impress() con los pasos
```

### Árbol-Índice Lateral

El índice lateral (`nav.theater-index`) se genera desde el BOE:

```html
<nav class="theater-index">
  <h3>Índice</h3>
  <ul>
    {% for escena in boe.escenas %}
    <li data-anillo="{{ escena.anillo }}">
      <a href="#step-{{ escena.id }}">
        {{ escena.id }}. {{ escena.nombre }}
      </a>
    </li>
    {% endfor %}
  </ul>
</nav>
```

### Resolución de BUG-002

Para que impress.js funcione:

1. **Carga local**: Copiar `impress.min.js` a `docs/assets/js/`
2. **Orden correcto**: Cargar impress.js ANTES de teatro.js
3. **Inicialización**: Usar `DOMContentLoaded` + verificación `typeof impress`
4. **Fallback**: Si impress falla, mostrar HTML lineal navegable

```html
<!-- Orden de carga correcto -->
<script src="/assets/js/impress.min.js"></script>
<script src="/assets/js/teatro.js"></script>
```

```javascript
// teatro.js - verificación robusta
document.addEventListener("DOMContentLoaded", function() {
    if (typeof impress === "function") {
        const api = impress();
        api.init();
        setupControls(api);
    } else {
        console.error("impress.js no disponible");
        document.body.classList.add('fallback-mode');
    }
});
```

### Validación Local

Antes de publicar, ejecutar:

```bash
cd docs
bundle exec jekyll serve
# Navegar a http://localhost:4000/teatro/{obra}/
# Verificar que las teclas ← → Espacio funcionan
```

---

## Reglas de Kramdown (Jekyll) — CRÍTICO

> **Lección aprendida**: BUG-002 + hotfixes de 2025-12-23

Jekyll usa **kramdown** como procesador Markdown. Kramdown tiene reglas específicas que **rompen el Markdown si no se respetan**.

### Regla 1: `markdown="1"` en elementos HTML

Kramdown **NO procesa Markdown dentro de etiquetas HTML** por defecto. Si escribes:

```html
<!-- ❌ INCORRECTO: Markdown no se procesará -->
<div class="container">
## Título
- Item 1
- Item 2
</div>
```

El resultado será texto plano: `## Título - Item 1 - Item 2`

**Solución**: Añadir `markdown="1"` al elemento contenedor:

```html
<!-- ✅ CORRECTO: Kramdown procesará el Markdown -->
<div class="container" markdown="1">

## Título

- Item 1
- Item 2

</div>
```

**Reglas adicionales**:
- Dejar **línea en blanco** después del tag de apertura
- Dejar **línea en blanco** antes del tag de cierre
- Aplicar a TODOS los contenedores: `<div>`, `<section>`, `<article>`, etc.

### Regla 2: `markdownify` para contenido incluido

Cuando usas `{% include %}` para insertar archivos Markdown dentro de un layout HTML, el contenido **NO se procesa automáticamente**.

```liquid
<!-- ❌ INCORRECTO: Contenido raw -->
{% include teatro/escenas/mi-escena.md %}
```

**Solución**: Usar `capture` + `markdownify`:

```liquid
<!-- ✅ CORRECTO: Markdown procesado -->
{% capture content %}{% include teatro/escenas/mi-escena.md %}{% endcapture %}
{{ content | markdownify }}
```

### Regla 3: Evitar HTML inline con Markdown

No mezclar HTML y Markdown en la misma línea:

```html
<!-- ❌ INCORRECTO -->
<em>Las obras clausuradas se archivarán aquí.</em>

<!-- ✅ CORRECTO -->
*Las obras clausuradas se archivarán aquí.*
```

### Checklist antes de publicar con GH-PAGES

- [ ] Todo `<div>`, `<section>` con Markdown interno tiene `markdown="1"`
- [ ] Línea en blanco después de cada tag de apertura
- [ ] Línea en blanco antes de cada tag de cierre
- [ ] Contenido de `{% include %}` pasa por `| markdownify`
- [ ] No hay HTML inline (`<em>`, `<strong>`) donde funciona Markdown

### Archivos afectados por estas reglas

| Archivo | Requiere atención |
|---------|-------------------|
| `docs/teatro.md` | Sí — contenedores con `markdown="1"` |
| `docs/_layouts/obra.html` | Sí — usar `markdownify` en includes |
| `docs/_includes/teatro/**/*.md` | No — ya son Markdown puro |
| `docs/teatro/*.md` | Depende — revisar si usan HTML |
