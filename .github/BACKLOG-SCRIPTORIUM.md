# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 2.0.0  
> **Sprint actual**: 2 (Extensión VS Code + Feature Cycle 1)  
> **Fecha inicio**: 2025-12-23

---

## Sprint 0 (Bootstrap) — ARCHIVADO

> **Estado**: ✅ Completado y archivado  
> **Ubicación**: `ARCHIVO/DISCO/Backlogs_Sprint0_Archivado/`  
> **Métricas**: 19/21 épicas (88%), ~336 tareas

Ver [README del archivo](../ARCHIVO/DISCO/Backlogs_Sprint0_Archivado/README.md) para detalles.

---

# Épica: SCRIPT-1.0.0 — Teatro Interactivo

**Objetivo**: Crear un sistema unificado que conecte ARG_BOARD, AGENT_CREATOR y GH-Pages para ofrecer experiencias de teatro transmedia interactivo con visualización 3D basada en impress.js.

**Concepto central**: El usuario experimenta el Scriptorium como un **teatro navegable** donde puede visionar obras, interactuar con personajes (agentes) y recorrer caminos narrativos (monomitos).

---

## Feature Cycle 1: Core Concepts

> **Ciclo actual**: Feature Cycle 1  
> **Objetivo**: Establecer conceptos fundamentales e infraestructura del Teatro

---

## Conceptos Clave del Teatro

### 1. BOE (Boletín Oficial del Estado Escénico)

El **BOE** es una **cadena hipervinculada** que registra todo lo que ocurre en el teatro:

```
BOE → Mapa de diapositivas impress.js en la UI/UX
```

Cada entrada del BOE se convierte en una diapositiva navegable. El BOE es la **fuente de verdad** del estado escénico.

**Ubicación**: `ARCHIVO/PLUGINS/ARG_BOARD/BOE/`

### 2. Monomito (Ciclo de 12 Etapas)

El ARG_BOARD organiza obras en **ciclos de 12 etapas** siguiendo el Camino del Héroe:

| Fase | Estadios | Anillo | Descripción |
|------|----------|--------|-------------|
| **PARTIDA** | 1-4 | 1 | Mundo ordinario → Cruce del umbral |
| **INICIACIÓN** | 5-8 | 2 | Pruebas → Ordalía |
| **RETORNO** | 9-12 | 3 | Recompensa → Elixir |

**Ubicación**: `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/monomitos.json`

### 3. Elenco (Inyección de Personajes)

Los personajes se crean en **AGENT_CREATOR** y se inyectan en las obras:

```
AGENT_CREATOR                    ARG_BOARD
─────────────                    ─────────
recipe.json  ───────────────→   actores.json
agente.agent.md  ───────────→   obras.json (campo actores)
```

**Pipeline completo**: `FORO_SCRAPER → AGENT_CREATOR → ARG_BOARD → TEATRO`

### 4. TALLER (Proyectos de Usuario)

Espacio de trabajo para desarrollar obras antes de publicarlas:

**Ubicación**: `ARCHIVO/DISCO/TALLER/`

```
TALLER/
├── _plantilla/          # Plantilla para nuevos proyectos
├── hola-mundo/          # Ejemplo: primera demo del pipeline
└── camino-del-tarotista/ # Showcase de features (pendiente)
```

---

## Contexto y Visión

### El problema

Los plugins actuales (ARG_BOARD, AGENT_CREATOR, GH-PAGES) funcionan de manera aislada:
- ARG_BOARD define obras y personajes pero no hay interfaz visual de "cartelera"
- AGENT_CREATOR crea agentes pero el despliegue en ARG es manual
- GH-Pages publica contenido estático pero no hay sección "Teatro"

### La solución

Integrar los tres plugins en un flujo unificado:

\`\`\`
┌──────────────────────────────────────────────────────────────────────┐
│                     TEATRO INTERACTIVO                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌───────────────┐      ┌───────────────┐      ┌───────────────┐    │
│   │ AGENT_CREATOR │─────▶│   ARG_BOARD   │─────▶│   GH-PAGES    │    │
│   │               │      │               │      │               │    │
│   │  Crear        │      │  Registrar    │      │  Publicar     │    │
│   │  personajes   │      │  en obra      │      │  cartelera    │    │
│   └───────────────┘      └───────┬───────┘      └───────┬───────┘    │
│                                  │                      │             │
│                                  ▼                      ▼             │
│                         ┌───────────────┐      ┌───────────────┐     │
│                         │  IMPRESS.JS   │◀─────│   TEATRO.MD   │     │
│                         │  (3D viewer)  │      │  (cartelera)  │     │
│                         └───────────────┘      └───────────────┘     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Arquitectura del Visualizador (Impress.js)

### Sistema de Anillos

El mapeador de conversaciones transforma mapas narrativos en espacios 3D:

\`\`\`
                    VISTA SUPERIOR (ANILLOS)
                    
                         ┌─────────┐
                        /     0     \      ← Anillo 0: Centro (inicio)
                       │  (inicio)   │
                        \           /
                    ┌────┴─────────┴────┐
                   /          1          \    ← Anillo 1: Primera expansión
                  │    (estadios 1-4)     │
                   \                     /
              ┌─────┴───────────────────┴─────┐
             /               2                 \  ← Anillo 2: Segunda expansión
            │        (estadios 5-8)             │
             \                                 /
        ┌─────┴─────────────────────────────┴─────┐
       /                    3                      \ ← Anillo 3: Periferia
      │           (estadios 9-12)                   │
       \                                           /
        └─────────────────────────────────────────┘
\`\`\`

### Navegación

- **Slider de anillo**: Cambia entre anillos (zoom conceptual)
- **Rotación**: Navega dentro del anillo (secuencia temporal)
- **Profundidad**: Ramificaciones alternativas
- **Árbol-índice**: Panel lateral con vista completa

### Viabilidad Técnica

| Aspecto | MVP (Jekyll/CSS) | Futuro (Angular/React) |
|---------|------------------|------------------------|
| Navegación básica | ✅ CSS transforms | ✅ Animaciones fluidas |
| Slider de anillos | ✅ JavaScript vanilla | ✅ State management |
| Árbol-índice | ✅ HTML estático | ✅ Componente dinámico |
| Generación dinámica | ❌ Manual | ✅ Desde JSON |
| Multi-usuario | ❌ Lectura solo | ✅ WebSockets |

**Decisión MVP**: Usar Jekyll + CSS + JavaScript vanilla para el primer prototipo. Documentar aspiraciones para futuros sprints con frameworks reactivos.

---

## Entregables

### Pack de Instrucciones/Prompts/Agentes

| Tipo | Archivo | Propósito |
|------|---------|-----------|
| **Instrucciones** | \`teatro-interactivo.instructions.md\` | Contexto unificado del sistema |
| **Prompt** | \`teatro-generar-obra.prompt.md\` | Generar YAML de obra personalizada |
| **Prompt** | \`teatro-instalar-obra.prompt.md\` | Registrar obra en cartelera |
| **Prompt** | \`teatro-ejecutar-obra.prompt.md\` | Activar obra y publicar en web |
| **Agente** | \`teatro.agent.md\` (bridge a Arrakis) | Orquestador del teatro |

### Página Web

| Archivo | Propósito |
|---------|-----------|
| \`docs/teatro.md\` | Cartelera: obras en cartel, sinopsis, acceso |
| \`docs/teatro/{obra}/index.html\` | Visualizador impress.js por obra |
| \`docs/assets/js/teatro.js\` | JavaScript del visualizador |
| \`docs/assets/css/teatro.css\` | Estilos del visualizador |

### Obra Demo: Camino del Tarotista

Una obra que guía al usuario por todas las features del Scriptorium:

\`\`\`yaml
# camino-del-tarotista.yaml
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
    
  - id: 2
    nombre: "La Biblioteca"
    anillo: 1
    tipo: encuentro
    prueba: "Consultar un tomo en la Enciclopedia"
    feature: "@plugin_ox_enciclopedia"
    
  - id: 3
    nombre: "La Hemeroteca"
    anillo: 1
    tipo: prueba
    prueba: "Trabajar un texto para generar una Noticia"
    feature: "@periodico"
    
  - id: 4
    nombre: "El Scriptorium"
    anillo: 1
    tipo: mentor
    prueba: "Conocer los 5 auditores (Banderas)"
    feature: "@blueflag, @blackflag, @redflag, @yellowflag, @orangeflag"
    
  - id: 5
    nombre: "El Foro"
    anillo: 2
    tipo: umbral
    prueba: "Descargar material de un foro/blog"
    feature: "@plugin_ox_foroscraper"
    
  - id: 6
    nombre: "El Laboratorio"
    anillo: 2
    tipo: aliados
    prueba: "Crear un agente especializado"
    feature: "@plugin_ox_agentcreator"
    
  - id: 7
    nombre: "El Teatro"
    anillo: 2
    tipo: cueva
    prueba: "Desplegar el agente en una obra"
    feature: "@plugin_ox_argboard"
    
  - id: 8
    nombre: "La Ordalía"
    anillo: 2
    tipo: ordalia
    prueba: "Auditar una propuesta con las 5 Banderas"
    feature: "Método de auditoría"
    
  - id: 9
    nombre: "La Publicación"
    anillo: 3
    tipo: recompensa
    prueba: "Publicar en GitHub Pages"
    feature: "@plugin_ox_ghpages"
    
  - id: 10
    nombre: "El Mapa"
    anillo: 3
    tipo: retorno
    prueba: "Consultar el Roadmap y próximos pasos"
    feature: "docs/roadmap.md"
    
  - id: 11
    nombre: "La Integración"
    anillo: 3
    tipo: resurreccion
    prueba: "Entender el ciclo completo DISCO → ARCHIVO → Web"
    feature: "docs/archivo.md"
    
  - id: 12
    nombre: "El Elixir"
    anillo: 3
    tipo: elixir
    prueba: "Proponer una contribución al proyecto"
    feature: "CONTRIBUTING.md"

meta:
  duracion_estimada: "2-3 horas"
  nivel: "introductorio"
  prerequisitos: ["VS Code", "GitHub Copilot"]
\`\`\`

---

## Casos de Uso

### UC1: Generar Obra

**Actor**: Usuario vía @aleph  
**Trigger**: "Quiero crear una obra de teatro"  
**Flujo**:
1. @aleph invoca \`teatro-generar-obra.prompt.md\`
2. Usuario customiza los 12 estadios y pruebas
3. Sistema genera YAML de la obra
4. Usuario revisa y aprueba

### UC2: Instalar Obra

**Actor**: Usuario vía @aleph  
**Trigger**: "Instala esta obra en el teatro"  
**Flujo**:
1. @aleph invoca \`teatro-instalar-obra.prompt.md\`
2. Sistema registra obra en \`obras.json\` de ARG_BOARD
3. Sistema actualiza \`actores.json\` si hay personajes nuevos
4. Sistema genera entrada en cartelera (\`docs/teatro.md\`)
5. Commit según protocolo DevOps

### UC3: Ejecutar Obra

**Actor**: Usuario vía @aleph  
**Trigger**: "Ejecuta la obra [nombre]"  
**Flujo**:
1. @aleph invoca \`teatro-ejecutar-obra.prompt.md\`
2. Sistema genera página impress.js para la obra
3. Sistema actualiza \`docs/teatro.md\` marcando obra como "en escena"
4. Sistema publica en GitHub Pages
5. Usuario puede navegar la obra en el visualizador 3D

---

## Stories

### SCRIPT-1.0.0-S01: Instrucciones del Teatro
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `instructions/teatro-interactivo.instructions.md` | ✅ |
| T002 | Documentar flujo AGENT_CREATOR → ARG_BOARD → GH-PAGES | ✅ |
| T003 | Definir esquema YAML de obras | ✅ |

---

### SCRIPT-1.0.0-S02: Prompts del Teatro
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Crear `prompts/teatro-generar-obra.prompt.md` | ✅ |
| T005 | Crear `prompts/teatro-instalar-obra.prompt.md` | ✅ |
| T006 | Crear `prompts/teatro-ejecutar-obra.prompt.md` | ✅ |

---

### SCRIPT-1.0.0-S03: Agente Teatro (Bridge)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Crear `agents/teatro.agent.md` como bridge unificador | ✅ |
| T008 | Añadir handoffs a Arrakis, AgentCreator, GHPages | ✅ |
| T009 | Actualizar `aleph.agent.md` con handoffs de Teatro | ✅ |

---

### SCRIPT-1.0.0-S04: Página Cartelera (teatro.md)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Crear `docs/teatro.md` con estructura de cartelera | ✅ |
| T011 | Diseñar cards de obras (poster, sinopsis, estado) | ✅ |
| T012 | Añadir sección "En escena" (obra activa destacada) | ✅ |
| T013 | Añadir "Teatro" a navegación en `_config.yml` | ✅ |

---

### SCRIPT-1.0.0-S05: Visualizador Impress.js (MVP)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T014 | Crear `docs/assets/js/teatro.js` con navegación básica | ✅ |
| T015 | Crear `docs/assets/css/teatro.css` con estilos de anillos | ✅ |
| T016 | Implementar slider de anillos (JavaScript vanilla) | ✅ |
| T017 | Implementar árbol-índice lateral (HTML + CSS) | ✅ |
| T018 | Documentar limitaciones MVP vs aspiración Angular | ✅ |

---

### SCRIPT-1.0.0-S06: Generador de Páginas Impress.js
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T019 | Crear template Jekyll para páginas de obra | ✅ |
| T020 | Implementar layout de anillos desde YAML | ✅ |
| T021 | Generar diapositivas por estadio | ✅ |
| T022 | Implementar navegación entre diapositivas | ✅ |

---

### SCRIPT-1.0.0-S07: Obra Demo "Camino del Tarotista"
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T023 | Crear YAML de la obra \`camino-del-tarotista.yaml\` | ✅ |
| T024 | Generar página impress.js de la obra | ✅ |
| T025 | Integrar personaje Tarotista (tarotista) | ✅ |
| T026 | Documentar cada prueba con instrucciones interactivas | ✅ |
| T027 | Registrar obra en \`obras.json\` | ✅ |
| T028 | Publicar en cartelera | ✅ |

---

### SCRIPT-1.0.0-S08: Consolidación AGENT_CREATOR → ARG_BOARD
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T029 | Automatizar creación de actor en \`actores.json\` desde receta | ✅ |
| T030 | Actualizar prompt \`desplegar-en-arg.prompt.md\` | ✅ |
| T031 | Validar pipeline: receta → agente → actor → obra | ✅ |

---

### SCRIPT-1.0.0-S09: Integración GH-Pages
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T032 | Actualizar \`ghpages.agent.md\` con handoffs de Teatro | ✅ |
| T033 | Crear prompt para actualizar cartelera desde obras.json | ✅ |
| T034 | Implementar "obra en escena" como página destacada | ✅ |

---

### SCRIPT-1.0.0-S10: Documentación y Tests
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T035 | Actualizar README.md con sección Teatro | ✅ |
| T036 | Actualizar `copilot-instructions.md` con Teatro | ✅ |
| T037 | Test: flujo completo de generación de obra | ✅ |
| T038 | Test: visualizador impress.js en desktop y móvil | ✅ |
| T039 | Documentar hoja de ruta para Angular/React | ✅ |

---

### SCRIPT-1.0.0-S11: TALLER (Proyectos de Usuario)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T040 | Crear `ARCHIVO/DISCO/TALLER/README.md` con documentación | ✅ |
| T041 | Crear `_plantilla/` con estructura base (obra.yaml, personajes/, escenas/) | ✅ |
| T042 | Formalizar proyecto `hola-mundo/` como ejemplo de referencia | ✅ |
| T043 | Documentar pipeline `FORO_SCRAPER → AGENT_CREATOR → ARG_BOARD → TEATRO` | ✅ |
| T044 | Crear escenas completas de Hola Mundo (3 escenas) | ✅ |

---

## Métricas Sprint 1

| Métrica | Valor |
|---------|-------|
| Tasks totales | 44 |
| Completadas | **44** |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | **100%** 🎉 |

---

## Análisis de Viabilidad MVP

### Lo que SÍ se puede hacer con Jekyll/CSS/JS

| Capacidad | Implementación |
|-----------|----------------|
| Layout 3D | CSS transforms (translate3d, rotate3d) |
| Navegación | JavaScript vanilla (eventos, DOM) |
| Slider | Input range + event listeners |
| Árbol-índice | HTML estático con CSS |
| Generación | Liquid templates de Jekyll |
| Publicación | GitHub Pages estándar |

### Lo que REQUIERE framework reactivo

| Capacidad | Por qué |
|-----------|---------|
| Generación dinámica | State management, componentes |
| Multi-usuario | WebSockets, autenticación |
| Persistencia de progreso | Backend, base de datos |
| Animaciones complejas | Virtual DOM, transiciones |
| Obras infinitas | Lazy loading, virtualización |

### Hoja de Ruta de Expansión

| Fase | Framework | Capacidades |
|------|-----------|-------------|
| MVP (Sprint 1) | Jekyll + vanilla JS | Visualización básica, obras estáticas |
| v1.1 | Svelte (opcional) | Componentes reactivos, mejor DX |
| v2.0 | Angular/React | Multi-usuario, persistencia, Euler |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| ARG_BOARD plugin | ✅ Instalado | obras.json, actores.json funcionando |
| AGENT_CREATOR plugin | ✅ Instalado | tarotista creado |
| GH_PAGES plugin | ✅ Instalado | docs/ funcional |
| TEATRO plugin | ✅ Instalado | Orquestador de experiencias transmedia |
| impress.js | ✅ Integrado | CDN (impress.js@2.0.0) |
| Tarotista (personaje) | ✅ Creado | En actores.json |
| TALLER (estructura) | ✅ Creado | Plantilla + hola-mundo formalizado |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-22 | Archivar Sprint 0 en DISCO/Backlogs_Sprint0_Archivado/ | Aleph |
| 2025-12-22 | Crear épica SCRIPT-1.0.0: Teatro Interactivo | Aleph |
| 2025-12-22 | Definir arquitectura de anillos (impress.js) | Aleph |
| 2025-12-22 | Diseñar obra demo "Camino del Tarotista" | Aleph |
| 2025-12-22 | Análisis de viabilidad MVP vs framework | Aleph |
| 2025-12-22 | Instalar plugin Teatro (S01, S02, S03, S04 parcial, S10 parcial) | Aleph |
| 2025-12-22 | Documentar conceptos clave (BOE, Monomito, Elenco, TALLER) | Aleph |
| 2025-12-22 | Crear TALLER con plantilla y proyecto hola-mundo formalizado (S11) | Aleph |
| 2025-12-22 | Implementar visualizador Impress.js MVP (S05) | Aleph |
| 2025-12-22 | Crear generador de páginas Jekyll para obras (S06) | Aleph |
| 2025-12-22 | Publicar obra demo "Camino del Tarotista" (S07) | Aleph |
| 2025-12-22 | Consolidar pipeline AGENT_CREATOR → ARG_BOARD (S08) | Aleph |
| 2025-12-22 | Integrar Teatro con GH-Pages y limpiar cartelera (S09) | Aleph |
| 2025-12-22 | Completar documentación y tests del Teatro (S10) | Aleph |
| 2025-12-22 | Diseñar cards de obras y cerrar Sprint 1 (S04-T011) | Aleph |
| 2025-12-22 | Instalar plugin Scrum v1.0.0 (SCRIPT-1.1.0) | Aleph |
| 2025-12-22 | Añadir épica SCRIPT-1.2.0: Galería de Fotos de Estado | Aleph |
| 2025-12-23 | Añadir S03: Anexo Visual con 12 capturas y tutorial "Como Word" | Aleph |
| 2025-12-23 | Añadir épica SCRIPT-1.3.0: Refactorización Teatro (Impress.js + BOE) | Aleph |
| 2025-12-23 | Registrar BUG-002: impress.js no inicializa | Aleph |
| 2025-12-23 | Crear personaje NonsiAuditor (blackflag + redflag + fuente ELENCO/nonsi) | Aleph |
| 2025-12-23 | Añadir épica SCRIPT-1.4.0: Sistema de Avatares para Personajes | Aleph |
| 2025-12-23 | Añadir épica SCRIPT-1.5.0: Plugin Bridge Discovery | Aleph |
| 2025-12-23 | Añadir épica SCRIPT-1.6.0: Rediseño Index Web (Splash) | Aleph |
| 2025-12-23 | Completar SCRIPT-1.6.0: menú hamburguesa, prisma auditores, status, galería | Aleph |
| 2025-12-23 | Aprobar y publicar épica SCRIPT-1.7.0: Plugin MCP-PRESETS | Aleph |
| 2025-12-24 | Añadir submódulo as-utils-sdk (VibeCoding Connector) | Aleph |
| 2025-12-24 | Crear épica SCRIPT-1.9.0: Integración AS-Utils-SDK | Aleph |
| 2025-12-24 | Añadir submódulo as-gym (Almas para Agentes) | Aleph |
| 2025-12-24 | Crear épica SCRIPT-1.10.0: Integración AS-Gym | Aleph |
| 2025-12-24 | Crear épica SCRIPT-1.11.0: Rediseño Ecosistema (Agentes → Plugins → Submódulos) | @scrum |

---

# Épica: SCRIPT-1.7.0 — Plugin MCP-PRESETS

**Objetivo**: Crear un plugin de Scriptorium para gestionar presets MCP (packs de herramientas/recursos/prompts del Model Context Protocol), permitiendo importar, exportar y asignar presets a agentes especializados creados con AGENT_CREATOR.

**Estado**: 🔄 En Progreso (Feature Cycle 1)

**Submódulo fuente**: `alephscript-mcp-presets-site` (Zeus)  
**Rama de integración**: `integration/beta/scriptorium`  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/MCP-PRESETS-SITE/conversacion-po-sm.md`

---

## Contexto

### El problema

Los agentes especializados del Scriptorium necesitan **toolkits MCP** (herramientas, recursos, prompts) pero:
- No hay forma de gestionar qué herramientas tiene cada agente
- Los presets de Zeus están aislados del workflow de AGENT_CREATOR
- La configuración MCP es manual y dispersa

### La solución

Un plugin que:
1. **Importa/exporta** presets MCP en formato Zeus-compatible
2. **Asigna** presets a agentes creados con AGENT_CREATOR
3. **Prepara** la infraestructura para sincronización futura con Zeus

### Esquema PresetModel (Zeus-compatible)

```json
{
  "id": "string (timestamp)",
  "name": "string (requerido)",
  "description": "string",
  "category": "General|Development|Analysis|Creative|productivity",
  "prompt": "string (requerido)",
  "parameters": {},
  "serverId": "string|null",
  "items": ["tool1", "tool2"],
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

---

## Story: SCRIPT-1.7.0-S01 — Estructura del Plugin
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción
Crear la estructura base del plugin siguiendo el protocolo de PLUGINS.md.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/plugins/mcp-presets/manifest.md` con metadatos | ✅ |
| T002 | Crear `agents/mcp-presets.agent.md` (agente principal) | ✅ |
| T003 | Crear `instructions/mcp-presets.instructions.md` | ✅ |
| T004 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/` con estructura de datos | ✅ |
| T005 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/presets/` (vacío) | ✅ |
| T006 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/catalog.json` (esqueleto) | ✅ |
| T007 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json` (esqueleto) | ✅ |

### Criterios de Aceptación
- [x] El plugin tiene manifest.md válido con frontmatter YAML
- [x] La estructura sigue las convenciones de PLUGINS.md
- [x] El agente tiene handoffs para cada operación CRUD

---

## Story: SCRIPT-1.7.0-S02 — Importar Preset (Offline)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción
Permitir importar un preset desde archivo JSON al Scriptorium.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Crear `prompts/importar-preset.prompt.md` | ✅ |
| T009 | Implementar validación de esquema PresetModel | ✅ |
| T010 | Guardar preset en `presets/{id}.json` | ✅ |
| T011 | Actualizar catálogo local si es necesario | ✅ |
| T012 | Gestionar conflictos (preset existente) | ✅ |

### Criterios de Aceptación
- [ ] AC1: Si el JSON no cumple el esquema, rechazar con mensaje claro
- [ ] AC2: Si el preset ya existe (por id), preguntar si sobrescribir
- [ ] AC3: Preservar todos los campos de Zeus (serverId, items, serverContent)

---

## Story: SCRIPT-1.7.0-S03 — Listar Presets Locales
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción
Listar todos los presets disponibles en el Scriptorium con su metadata.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T013 | Crear `prompts/listar-presets.prompt.md` | ✅ |
| T014 | Leer todos los archivos de `presets/` | ✅ |
| T015 | Mostrar resumen: nombre, descripción, items, asignaciones | ✅ |
| T016 | Indicar si el preset está asignado a algún agente | ✅ |

### Criterios de Aceptación
- [ ] El listado muestra todos los presets con metadata básica
- [ ] Se indica si cada preset está asignado y a qué agentes
- [ ] Formato legible y estructurado

---

## Story: SCRIPT-1.7.0-S04 — Exportar Preset
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ✅ Completada

### Descripción
Exportar uno o más presets en formato JSON compatible con Zeus.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Crear `prompts/exportar-preset.prompt.md` | ✅ |
| T018 | Generar JSON con formato Zeus-compatible | ✅ |
| T019 | Opción de exportar múltiples como bundle | ✅ |
| T020 | Sugerir nombre de archivo basado en preset | ✅ |

### Criterios de Aceptación
- [ ] El JSON exportado es válido según PresetModel de Zeus
- [ ] Se puede exportar un preset individual o un bundle
- [ ] El archivo incluye timestamp de exportación

---

## Story: SCRIPT-1.7.0-S05 — Asignar Preset a Agente
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ✅ Completada

### Descripción
Vincular presets MCP con agentes creados en AGENT_CREATOR.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T021 | Crear `prompts/asignar-a-agente.prompt.md` | ✅ |
| T022 | Actualizar `agent-assignments.json` con mapeo | ✅ |
| T023 | Integrar con AGENT_CREATOR: inyectar campo `mcpPresets` en recipe | ✅ |
| T024 | Validar que el agente y preset existen | ✅ |
| T025 | Permitir desasignar preset de agente | ✅ |

### Criterios de Aceptación
- [ ] AC1: Un agente puede tener múltiples presets
- [ ] AC2: Un preset puede estar asignado a múltiples agentes
- [ ] AC3: La asignación se refleja en la recipe del agente

### Estructura agent-assignments.json
```json
{
  "version": "1.0.0",
  "assignments": {
    "agentId": ["presetId1", "presetId2"]
  },
  "lastUpdated": "ISO8601"
}
```

---

## Story: SCRIPT-1.7.0-S06 — Bridge Agent + Registry
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción
Crear el agente bridge y registrar el plugin en el sistema.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T026 | Crear `.github/agents/plugin_ox_mcppresets.agent.md` | ✅ |
| T027 | Actualizar `registry.json` con el nuevo plugin | ✅ |
| T028 | Actualizar `aleph.agent.md` con handoff al bridge | ✅ |
| T029 | Actualizar `ox.agent.md` con índice del plugin | ✅ |

### Criterios de Aceptación
- [x] El bridge está en `.github/agents/` (detectable por VS Code)
- [x] El plugin aparece en `registry.json` con estado enabled
- [x] @aleph tiene handoff `[MCP-PRESETS]` funcional

---

## Story: SCRIPT-1.7.0-S07 — Documentación
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

### Descripción
Documentar el plugin y su uso.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T030 | Crear `ARCHIVO/PLUGINS/MCP_PRESETS/README.md` | ✅ |
| T031 | Actualizar `.github/PLUGINS.md` con sección mcp-presets | ✅ |
| T032 | Crear ejemplos de presets en `presets/examples/` | ✅ |
| T033 | Documentar integración con AGENT_CREATOR | ✅ |

### Criterios de Aceptación
- [x] README explica el propósito y uso del plugin
- [x] PLUGINS.md incluye el nuevo plugin en la tabla de bridges
- [x] Hay al menos 2 presets de ejemplo

---

## Métricas SCRIPT-1.7.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 7 |
| Tasks totales | 33 |
| Puntos totales | 23 |
| Prioridad Must | 5 stories (13 puntos) |
| Prioridad Should | 2 stories (10 puntos) |
| Completadas | **7** |
| % Avance | **100%** 🎉 |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo mcp-presets-site | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin AGENT_CREATOR | ✅ Instalado | Integración en S05 |
| Setup script actualizado | ✅ Completado | scripts/setup-workspace.sh |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Esquema Zeus cambia | Baja | Alto | Versionar esquemas, validar en importación |
| Zeus no está corriendo | Media | Bajo | MVP offline primero |
| Conflictos con AGENT_CREATOR | Baja | Medio | Inyección no destructiva en recipes |

---

## Roadmap Futuro (Post-Sprint 1)

### Sprint 2: Integración API
- Conexión HTTP con Zeus (si está corriendo)
- Sincronización bidireccional de presets
- UI para selección interactiva desde catálogo remoto

### Sprint 3: Integración Extensión VS Code
- Exportar presets a formato de la extensión
- Sincronización Scriptorium ↔ Extension
- ChatParticipants con tools MCP asignados

---

# Épica: SCRIPT-1.4.0 — Sistema de Avatares para Personajes

**Objetivo**: Estandarizar la gestión de avatares para personajes creados en AGENT_CREATOR, integrando con ARG_BOARD y Teatro.

**Estado**: ✅ Completada

---

## Contexto

Los personajes del Teatro necesitan representación visual (avatares) para:
- Cartelera de obras (`docs/teatro.md`)
- Visualizador impress.js (diapositivas con personajes)
- Fichas de elenco en ARG_BOARD

### Estructura estándar

```
ARCHIVO/DISCO/TALLER/ELENCO/{personaje}/
├── {personaje}.agent.md    # Definición del personaje
└── avatar.png              # Imagen del personaje (256x256 recomendado)
```

### Campos añadidos

| Archivo | Campo | Ejemplo |
|---------|-------|---------|
| `*.agent.md` (frontmatter) | `avatar:` | `"ARCHIVO/DISCO/TALLER/ELENCO/nonsi/avatar.png"` |
| `*.recipe.json` | `"avatar":` | `"ARCHIVO/DISCO/TALLER/ELENCO/nonsi/avatar.png"` |
| `actores.json` | `"avatar":` | `"ARCHIVO/DISCO/TALLER/ELENCO/tarotista/avatar.png"` |

---

## Story: SCRIPT-1.4.0-S01 — Definir Estándar de Avatares
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Definir estructura de carpeta ELENCO/{personaje}/ | ✅ |
| T002 | Añadir campo `avatar` al frontmatter de agentes | ✅ |
| T003 | Añadir campo `avatar` al schema de recipes | ✅ |
| T004 | Añadir campo `avatar` al schema de actores.json | ✅ |

---

## Story: SCRIPT-1.4.0-S02 — Implementar en Personajes Existentes
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Añadir avatar a personaje Tarotista | ✅ |
| T006 | Añadir avatar a personaje NonsiAuditor | ✅ |
| T007 | Actualizar actores.json con avatares | ✅ |
| T008 | Actualizar recetas con campo avatar | ✅ |
| T009 | Registrar NonsiAuditor en creation-log.json | ✅ |

---

## Métricas SCRIPT-1.4.0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 9 |
| Completadas | **9** |
| % Avance | **100%** 🎉 |

---

## Personajes con Avatar

| Personaje | Avatar | Ubicación |
|-----------|--------|-----------|
| Tarotista | ✅ | `ARCHIVO/DISCO/TALLER/ELENCO/tarotista/avatar.png` |
| NonsiAuditor | ✅ | `ARCHIVO/DISCO/TALLER/ELENCO/nonsi/avatar.png` |

---

# Épica: SCRIPT-1.2.0 — Galería de Fotos de Estado

**Objetivo**: Publicar automáticamente las fotos de estado de cada sprint en una galería visual en el roadmap de GH-Pages.

**Estado**: ✅ Completada

---

## Contexto

Las fotos de estado (`ARCHIVO/FOTOS_ESTADO/`) documentan el progreso del proyecto al cierre de cada sprint. Esta épica integra esas fotos en una galería pública en el roadmap, visible en:

```
https://escrivivir-co.github.io/aleph-scriptorium/roadmap/#galeria-fotos
```

---

## Story: SCRIPT-1.2.0-S01 — Protocolo de Publicación

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Añadir protocolo de publicación en `foto-estado-y-discurso-motivacional.prompt.md` | ✅ |
| T002 | Definir formato de card para galería (HTML template) | ✅ |
| T003 | Documentar flujo de actualización de roadmap.md | ✅ |

---

## Story: SCRIPT-1.2.0-S02 — Implementación en Roadmap

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Crear sección `<!-- GALERÍA DE FOTOS DE ESTADO -->` en roadmap.md | ✅ |
| T005 | Añadir estilos CSS para `.fotos-gallery` y `.foto-card` | ✅ |
| T006 | Poblar galería con fotos existentes (Sprint 0 y Sprint 1) | ✅ |
| T007 | Verificar renderizado en GH-Pages | ✅ |

---

## Métricas SCRIPT-1.2.0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 7 |
| Completadas | **7** |
| Pendientes | 0 |
| % Avance | **100%** 🎉 |

---

## Story: SCRIPT-1.2.0-S03 — Anexo Visual (Manual de Usuario)

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Crear README.md en Sprint1/ con índice de capturas | ✅ |
| T009 | Añadir enlaces a GitHub para cada imagen (12 capturas) | ✅ |
| T010 | Añadir enlace "Galería visual" en card de roadmap.md | ✅ |
| T011 | Documentar tutorial "Como Word" con 4 pasos visuales | ✅ |

---

## Métricas SCRIPT-1.2.0 (Actualizado)

| Métrica | Valor |
|---------|-------|
| Tasks totales | 11 |
| Completadas | **11** |
| Pendientes | 0 |
| % Avance | **100%** 🎉 |

---

# Épica: SCRIPT-1.1.0 — Plugin Scrum

**Objetivo**: Crear un plugin de gestión ágil de backlogs con protocolo formal de 5 fases.

**Estado**: ✅ Completada

---

## Story: SCRIPT-1.1.0-S01 — Estructura del Plugin

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `manifest.md` del plugin | ✅ |
| T002 | Crear `scrum.agent.md` (Scrum Master) | ✅ |
| T003 | Crear `scrum-protocol.instructions.md` | ✅ |

---

## Story: SCRIPT-1.1.0-S02 — Prompts del Protocolo

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Crear `planificar-sprint.prompt.md` (Fase 1) | ✅ |
| T005 | Crear `crear-backlog-borrador.prompt.md` (Fase 2) | ✅ |
| T006 | Crear `aprobar-backlog.prompt.md` (Fase 3) | ✅ |
| T007 | Crear `tracking-sprint.prompt.md` (Fase 4) | ✅ |
| T008 | Crear `retrospectiva.prompt.md` (Fase 5) | ✅ |

---

## Story: SCRIPT-1.1.0-S03 — Integración

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T009 | Crear bridge `plugin_ox_scrum.agent.md` | ✅ |
| T010 | Actualizar `registry.json` | ✅ |
| T011 | Actualizar `ox.agent.md` (índice v1.2.0) | ✅ |
| T012 | Actualizar `aleph.agent.md` (handoff) | ✅ |
| T013 | Actualizar `copilot-instructions.md` | ✅ |
| T014 | Crear `ARCHIVO/PLUGINS/SCRUM/README.md` | ✅ |

---

## Métricas SCRIPT-1.1.0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 14 |
| Completadas | **14** |
| % Avance | **100%** 🎉 |

---

# Épica: SCRIPT-1.3.0 — Refactorización Teatro (Impress.js + BOE)

**Objetivo**: Corregir el visualizador impress.js, estructurar la página teatro con 3 zonas claras (Galería, Escena, Pantalla) e integrar el BOE como fuente de verdad para el mapa de diapositivas.

**Estado**: 🔄 En Progreso

**Detectado**: 2025-12-23  
**Referencia**: Navegación a https://escrivivir-co.github.io/aleph-scriptorium/teatro/

---

## Contexto del Problema

### Errores detectados en producción

1. **Error crítico**: `TypeError: impress is not a function` — La librería impress.js no se inicializa correctamente
2. **Página teatro.md**: Falta estructura clara de 3 zonas
3. **Integración BOE**: El BOE no se usa para generar el mapa de navegación
4. **Navegación**: Teclas (→, ←, Espacio) no funcionan sin impress.js activo

### Arquitectura objetivo

```
┌─────────────────────────────────────────────────────────────────────┐
│                     docs/teatro.md (CARTELERA)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────┐  ┌────────────────────────────────────────┐    │
│  │   🎬 GALERÍA    │  │           🎭 EN ESCENA                  │    │
│  │   (Cartel)      │  │   Obra activa con acceso al visor      │    │
│  │                 │  │                                         │    │
│  │ - Hola Mundo    │  │  [El Camino del Tarotista]              │    │
│  │ - Obra Futura   │  │  ▶️ Abrir Pantalla Impress.js           │    │
│  │ - Archivo       │  │                                         │    │
│  └─────────────────┘  └────────────────────────────────────────┘    │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    🖥️ PANTALLA IMPRESS.JS                       │ │
│  │                                                                   │ │
│  │  Navegación con teclas:  ← → ↑ ↓ Espacio O                       │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────┐     │ │
│  │  │                   VIEWPORT 3D                            │     │ │
│  │  │     ┌────────────────────────────────────┐               │     │ │
│  │  │     │  Centro (Anillo 0)                 │               │     │ │
│  │  │     │    → Partida (Anillo 1, estadios 1-4)              │     │ │
│  │  │     │    → Iniciación (Anillo 2, estadios 5-8)           │     │ │
│  │  │     │    → Retorno (Anillo 3, estadios 9-12)             │     │ │
│  │  │     └────────────────────────────────────┘               │     │ │
│  │  └─────────────────────────────────────────────────────────┘     │ │
│  │                                                                   │ │
│  │  Índice lateral (árbol de navegación desde BOE)                  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Flujo BOE → Impress.js

```
ARG_BOARD/.arrakis/obras.json  →  Estructura de escenas
                    ↓
ARCHIVO/PLUGINS/ARG_BOARD/BOE/  →  Registro de cambios
                    ↓
docs/teatro/{obra}.md (frontmatter)  →  YAML con escenas
                    ↓
docs/_layouts/obra.html  →  Genera <div id="step-N"> para impress.js
                    ↓
impress().init()  →  Habilita navegación 3D
```

---

## Story: SCRIPT-1.3.0-S01 — Fix Crítico Impress.js
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Diagnosticar por qué `impress()` falla (CDN, defer, orden de carga) | ✅ |
| T002 | Cambiar de CDN a copia local de impress.js si CDN es inestable | ✅ |
| T003 | Añadir fallback robusto: si impress falla, mostrar HTML legible | ✅ |
| T004 | Verificar en navegador local antes de push | ✅ |
| T005 | Verificar en GitHub Actions después de push | ✅ |

---

## Story: SCRIPT-1.3.0-S02 — Refactorizar teatro.md (3 Zonas)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T006 | Diseñar layout HTML/CSS para 3 zonas en teatro.md | ✅ |
| T007 | Zona 1: Galería (cards de obras en cartel) | ✅ |
| T008 | Zona 2: En Escena (obra activa con destaque visual) | ✅ |
| T009 | Zona 3: Pantalla (embed o enlace a visualizador impress.js) | ✅ |
| T010 | Actualizar CSS teatro.css con estilos de zonas | ✅ |
| T011 | Añadir sección Archivo para obras clausuradas | ✅ |

---

## Story: SCRIPT-1.3.0-S03 — Integración BOE → Mapa de Diapositivas
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Documentar schema de BOE para entradas de escenas | ✅ |
| T013 | Crear prompt para generar BOE desde obras.json | ✅ |
| T014 | Añadir hipervinculación entre diapositivas (prev/next/branch) | ✅ |
| T015 | Generar data-x, data-y, data-z desde posición en BOE | ✅ |
| T016 | Sincronizar árbol-índice lateral con estructura BOE | ✅ |

---

## Story: SCRIPT-1.3.0-S04 — Navegación Mejorada
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Añadir teclas de navegación documentadas (overlay de ayuda) | ✅ |
| T018 | Slider de anillos funcional con feedback visual | ✅ |
| T019 | Indicador de progreso (estadio N de 12) | ✅ |
| T020 | Botón "Volver al inicio" y "Volver a cartelera" siempre visible | ✅ |
| T021 | Modo responsive para móviles (swipe gestures) | ⏳ |

---

## Story: SCRIPT-1.3.0-S05 — Actualizar Protocolo Teatro
**Estado**: 🔄 En Progreso

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T022 | Actualizar `teatro-ejecutar-obra.prompt.md` con nuevo flujo | ⏳ |
| T023 | Actualizar `teatro-interactivo.instructions.md` | ✅ |
| T024 | Documentar schema de BOE en instrucciones | ✅ |
| T025 | Añadir validación local antes de publicar (script) | ⏳ |

---

## Story: SCRIPT-1.3.0-S06 — Tests y Verificación
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T026 | Test local: servidor Jekyll y navegación completa | ⏳ |
| T027 | Test en Chrome, Firefox, Safari | ⏳ |
| T028 | Test en móvil (responsive) | ⏳ |
| T029 | Verificar que GitHub Actions pasa sin errores | ✅ |
| T030 | Documentar hallazgos y limitaciones MVP | ⏳ |

---

## Métricas SCRIPT-1.3.0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 30 |
| Completadas | **25** |
| En progreso | 1 |
| Pendientes | **4** |
| % Avance | **83%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| BUG-001 (Jekyll include) | ✅ Resuelto | Verificado en Actions (pages-build-deployment #42) |
| BUG-002 (impress.js) | ✅ Resuelto | Versión completa + carga al final del body |
| impress.js local | ✅ impress.js (completa) | Reemplaza impress.min.js corrupto |

---

# 🐛 Bugs

## BUG-002: impress.js falla durante carga — TypeError: Cannot read properties of null

**Estado**: ✅ Resuelto  
**Severidad**: Crítica (bloquea toda la funcionalidad del Teatro)  
**Detectado**: 2025-12-23  
**Resuelto**: 2025-12-23  
**Relacionado con**: SCRIPT-1.3.0-S01  
**URL afectada**: https://escrivivir-co.github.io/aleph-scriptorium/teatro/camino-del-tarotista/

### Problema original

```
TypeError: Cannot read properties of null (reading 'classList')
    at impress.min.js:2:1055
```

Los plugins bundleados en `impress.min.js` se auto-inicializaban antes de que el DOM estuviera listo, corrompiendo `window.impress`.

### Solución implementada

1. **Reemplazar `impress.min.js` con `impress.js` (versión completa)** — Sin minificar, más predecible
2. **Mover carga de scripts al final del `<body>`** — El DOM está listo cuando se ejecutan
3. **Usar `window.addEventListener("load")` en lugar de `DOMContentLoaded`** — Espera a que todos los scripts estén cargados
4. **Verificar `window.impress` explícitamente** — Más robusto que `typeof impress`
5. **Añadir verificación de contenedor `#impress`** — Diagnóstico adicional

### Archivos modificados

- `docs/_layouts/obra.html` — Scripts movidos al final del body
- `docs/assets/js/teatro.js` — Inicialización mejorada
- `docs/assets/js/impress.js` — Nueva versión completa (reemplaza impress.min.js)
- `docs/assets/js/impress.min.js` — Eliminado

### Verificación

- [ ] Test local con `jekyll serve`
- [x] Verificar en GitHub Actions después de push (pages-build-deployment #42 ✅)

---

## BUG-001: Jekyll include_relative con variable falla en GitHub Actions

**Estado**: ✅ Resuelto  
**Severidad**: Alta (bloquea deploy)  
**Detectado**: 2025-12-22  
**Referencia**: [GitHub Actions Run #20444700841](https://github.com/escrivivir-co/aleph-scriptorium/actions/runs/20444700841/job/58745506389)

### Descripción

El layout `docs/_layouts/obra.html` usa sintaxis inválida de Jekyll en la línea ~80:

```liquid
{% include_relative {{ contenido_path }} %}
```

Jekyll **no soporta variables** como argumento de `include_relative`. El tag requiere un nombre de archivo estático.

### Error en logs

```
Liquid Exception: Invalid syntax for include tag. 
File contains invalid characters or sequences: 
../ARCHIVO/DISCO/TALLER/camino-del-tarotista/escenas/01-vestibulo.md 
Valid syntax: {% include_relative file.ext param='value' param2='value' %} 
in /_layouts/obra.html
```

### Causa raíz

1. `include_relative` no acepta interpolación de variables `{{ var }}`
2. La ruta contiene `../` (parent directory), lo cual Jekyll prohíbe por seguridad
3. Los archivos de escenas están fuera de `docs/`, en `ARCHIVO/DISCO/TALLER/`

### Soluciones propuestas

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| **A** | Mover escenas a `docs/_includes/escenas/` | Sintaxis Jekyll nativa | Duplicación de contenido |
| **B** | Pre-procesar: copiar escenas a `docs/` en build | Automatizable | Añade paso de build |
| **C** | Usar plugin Jekyll (jekyll-include-dynamic) | Soporta variables | Requiere plugin |
| **D** | Incrustar contenido en frontmatter del YAML | Sin includes externos | YAML muy largo |
| **E** | Renderizar contenido con JavaScript (fetch) | Flexibilidad total | No SSG puro |

### Decisión recomendada

**✅ IMPLEMENTADA: Opción A** — Mover escenas a `docs/_includes/teatro/escenas/{obra}/`

### Tasks para fix

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| BUG-001-T001 | Decidir estrategia (A, B, C, D o E) | ✅ Opción A |
| BUG-001-T002 | Implementar fix en `obra.html` | ✅ |
| BUG-001-T003 | Mover/copiar escenas según estrategia | ✅ |
| BUG-001-T004 | Verificar build en GitHub Actions | ✅ |

### Implementación

Se movieron las escenas de `ARCHIVO/DISCO/TALLER/camino-del-tarotista/escenas/` a `docs/_includes/teatro/escenas/camino-del-tarotista/`.

**Cambio en `obra.html`** (línea ~80):

```liquid
{% capture include_path %}teatro/escenas/{{ page.slug }}/{{ escena.contenido_ref }}{% endcapture %}
{% include {{ include_path }} %}
```

Esto usa la sintaxis nativa de Jekyll que soporta variables con `{% include %}` (no `include_relative`).

Además, se simplificó `contenido_ref` en el YAML de la obra para que apunte a nombres de archivo directos (sin prefijo `escenas/`), alineado con el include en `_includes/teatro/escenas/{slug}/`.

### Verificación

- Se añadió flujo de validación local (scripts + prompt) para reducir el loop de errores en Actions.
- Confirmado: los builds de GitHub Actions pasan (pages-build-deployment #42, verde). (BUG-001-T004)

### Archivos afectados

- `docs/_layouts/obra.html` (línea ~80)
- `docs/teatro/camino-del-tarotista.md`
- `ARCHIVO/DISCO/TALLER/camino-del-tarotista/escenas/*.md`

---

## BUG-003: Renombrar submódulos a convención PascalCase descriptiva

**Estado**: ✅ Resuelto  
**Severidad**: Media (no bloquea runtime, pero sí DX/legibilidad)  
**Detectado**: 2025-01-01  
**Resuelto**: 2025-01-01  
**Borrador completo**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/SUBMODULOS_AH_NAMING/BUG-003-renombrar-submodulos-a-ah.md`

### Problema

Los 14 submódulos usan naming inconsistente (`alephscript-*`, `*-alephscript-*`, `as-*`, otros) que:
- Dificulta escanear el workspace
- Complica documentación coherente
- Costoso referenciar rutas en scripts/docs

### Solución

Renombrar **path local** (no URL remota) a **PascalCase descriptivo** que indique función:

| Categoría | Descripción | Ejemplos |
|-----------|-------------|----------|
| `Gallery` | Galerías/catálogos de recursos | MCPGallery, AAIAGallery |
| `Editor` | Editores visuales o de código | WorkflowEditor, BlocklyEditor, PrologEditor |
| `Suite` | Suites de integración o SDKs | VibeCodingSuite, BlockchainComPort |
| `Desktop` | Aplicaciones de escritorio/streaming | StreamDesktop, StreamDesktopAppCronos |
| `Extension` | Extensiones de IDE | VsCodeExtension |

### Mapeo Completo (v2 — Diciembre 2025)

| Path actual | Path propuesto | Función |
|-------------|----------------|---------|
| `alephscript-mcp-presets-site` | `MCPGallery` | Gestor de presets MCP (Zeus) |
| `alephscript-n8n-like-editor` | `WorkflowEditor` | Editor visual de workflows |
| `alephscript-network-sdk` | `BlockchainComPort` | SDK de sincronización P2P |
| `alephscript-typed-prompting` | `TypedPromptsEditor` | Editor de ontologías NL↔JSON |
| `as-gym` | `AAIAGallery` | Galería IA/ML (10 paradigmas FIA) |
| `as-utils-sdk` | `VibeCodingSuite` | Conector VibeCoding Suite padre |
| `blockly-alephscript-sdk` | `BlocklyEditor` | Editor de lógica visual Blockly |
| `iot-sbr-logica-para-bots` | `PrologEditor` | Editor de lógica Prolog |
| `kick-aleph-bot` | `StreamDesktop` | Bot de Kick.com |
| `kick-aleph-crono-bot` | `StreamDesktopAppCronos` | Bot cronómetro de Kick.com |
| `mcp-novelist` | `NovelistEditor` | Servidor MCP de narrativas |
| `node-red-alephscript-sdk` | `WiringEditor` | Editor de flujos Node-RED |
| `vscode-alephscript-extension` | `VsCodeExtension` | Extensión VS Code |
| `wiki-racer` | `WiringAppHypergraphEditor` | Navegador de hipergrafos |

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| BUG-003-T001 | Renombrar 14 submódulos según mapeo PascalCase | ✅ |
| BUG-003-T002 | Actualizar `.gitmodules` | ✅ |
| BUG-003-T003 | Actualizar `setup-workspace.sh` | ✅ |
| BUG-003-T004 | Actualizar `.vscode/settings.json` | ✅ (no requería cambios) |
| BUG-003-T005 | Actualizar `scripts/README.md` | ✅ |
| BUG-003-T006 | Añadir convención en `submodulo-integracion.instructions.md` | ✅ |
| BUG-003-T007 | Añadir sección 1.2.1 en `instalar-submodulo.prompt.md` | ✅ |
| BUG-003-T008 | Crear script `verify-submodule-naming.sh` | ✅ |
| BUG-003-T009 | Verificar `git submodule status` funciona | ✅ |
| BUG-003-T010 | Documentar en `docs/leeme.md` | ✅ |

### Definition of Done

- [x] Todos los submódulos usan paths PascalCase descriptivos
- [x] `.gitmodules`, `setup-workspace.sh`, `.vscode/settings.json` actualizados
- [x] Convención documentada en `instalar-submodulo.prompt.md` sección 1.2.1
- [x] Script de verificación creado
- [x] No quedan referencias a nombres antiguos

---

## BUG-004: Enlaces relativos rotos en GitHub Pages del submódulo BlockchainComPort

**Estado**: ✅ Resuelto  
**Severidad**: Media (bloquea navegación en hackaton landing page)  
**Detectado**: 2025-01-02  
**Resuelto**: 2025-01-02  
**Submódulo**: `BlockchainComPort` (alephscript-network-sdk)  
**Rama**: `hackaton_261225`

### Problema

La página `docs/index.html` del submódulo BlockchainComPort tiene enlaces relativos a archivos `.md` y `LICENSE` que:
- Funcionan en desarrollo local
- **Fallan en GitHub Pages** porque los archivos están fuera del directorio `/docs`
- Bloquean la navegación de la landing page del hackaton

Archivos afectados:
- `SESION-BACKLOG.md`
- `SESION-BACKLOG-EXPANSION.md`
- `HACKATON_GUIDE.md`
- `LICENSE`

### Solución

Cambiar los enlaces relativos a URLs absolutas apuntando al repositorio GitHub:

```
href="ARCHIVO.md"
  ↓
href="https://github.com/escrivivir-co/alephscript-network-sdk/blob/hackaton_261225/ARCHIVO.md"
```

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| BUG-004-T001 | Identificar todos los enlaces relativos rotos en docs/index.html | ✅ |
| BUG-004-T002 | Cambiar enlaces a URLs absolutas de GitHub (rama hackaton_261225) | ✅ |
| BUG-004-T003 | Verificar que GitHub Pages renderiza correctamente | ✅ |

### Archivos Modificados

- `BlockchainComPort/docs/index.html`:
  - Línea ~319: enlace a SESION-BACKLOG-EXPANSION.md
  - Líneas ~323-326: botones a SESION-BACKLOG.md, SESION-BACKLOG-EXPANSION.md, HACKATON_GUIDE.md
  - Líneas ~383-387: footer LICENSE

### Definition of Done

- [x] Todos los enlaces relativos en docs/index.html cambiados a URLs absolutas
- [x] URLs apuntan a rama `hackaton_261225`
- [x] GitHub Pages del submódulo funciona correctamente (push completado)

---

# Épica: SCRIPT-1.5.0 — Plugin Bridge Discovery

**Objetivo**: Habilitar la detección automática de prompts e instructions desde carpetas de plugins, y actualizar el protocolo de instalación para mantener los settings sincronizados.

**Estado**: 🔄 En Progreso

**Detectado**: 2025-12-23

---

## Contexto del Problema

VS Code Copilot solo detecta automáticamente:
- `.github/agents/*.agent.md`
- `.github/prompts/*.prompt.md`
- `.github/instructions/*.instructions.md`

Los plugins tienen 33 prompts y 7 instructions "ocultos" en `.github/plugins/{id}/`.

### Inventario de Recursos Ocultos

| Plugin | Prompts | Instructions |
|--------|---------|--------------|
| arg-board | 7 | 1 |
| agent-creator | 5 | 1 |
| teatro | 4 | 1 |
| scrum | 5 | 1 |
| foro-scraper | 6 | 1 |
| enciclopedia | 3 | 1 |
| gh-pages | 5 | 1 |
| **TOTAL** | **33** | **7** |

### Solución

Usar settings de workspace:
- `chat.promptFilesLocations`: Añade carpetas de prompts de plugins
- `chat.instructionsFilesLocations`: Añade carpetas de instructions de plugins

---

## Story: SCRIPT-1.5.0-S01 — Configurar Settings de Workspace
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.vscode/settings.json` con rutas de plugins | ✅ |
| T002 | Añadir `chat.promptFilesLocations` con 8 rutas | ✅ |
| T003 | Añadir `chat.instructionsFilesLocations` con 8 rutas | ✅ |
| T004 | Habilitar `chat.useNestedAgentsMdFiles` | ✅ |
| T005 | Habilitar `chat.promptFilesRecommendations` | ✅ |

---

## Story: SCRIPT-1.5.0-S02 — Validar Discovery de Prompts
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T006 | Reiniciar VS Code y verificar carga de settings | ⏳ |
| T007 | Listar prompts disponibles con `/` en Chat | ⏳ |
| T008 | Documentar prompts detectados vs esperados | ⏳ |
| T009 | Reportar bugs si hay prompts no detectados | ⏳ |

---

## Story: SCRIPT-1.5.0-S03 — Validar Discovery de Instructions
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Verificar aplicación automática por `applyTo` | ⏳ |
| T011 | Probar adjuntar instructions manualmente | ⏳ |
| T012 | Documentar comportamiento observado | ⏳ |

---

## Story: SCRIPT-1.5.0-S04 — Actualizar Protocolo de Plugins
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T013 | Actualizar `plugin-manager.agent.md` con paso de settings | ✅ |
| T014 | Actualizar `plugin-install.prompt.md` con pasos de settings y bridge | ✅ |
| T015 | Actualizar `PLUGINS.md` con documentación de settings (formato correcto) | ✅ |
| T016 | Añadir validación: settings incluye plugin | ✅ |

---

## Story: SCRIPT-1.5.0-S05 — Optimizar Namespace de Prompts
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Auditar nombres de prompts duplicados | ⏳ |
| T018 | Proponer convención de prefijos | ⏳ |
| T019 | Renombrar prompts si hay conflictos | ⏳ |
| T020 | Documentar convención en PLUGINS.md | ⏳ |

---

## Story: SCRIPT-1.5.0-S06 — AGENTS.md por Plugin (opcional)
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T021 | Crear AGENTS.md de prueba en un plugin | ⏳ |
| T022 | Verificar detección con `chat.useNestedAgentsMdFiles` | ⏳ |
| T023 | Documentar ventajas/desventajas vs bridges | ⏳ |
| T024 | Decidir si adoptar como estándar | ⏳ |

---

## Métricas SCRIPT-1.5.0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 24 |
| Completadas | **9** |
| En progreso | 0 |
| Pendientes | 15 |
| % Avance | **38%** |

---

## Métricas de Éxito

| Métrica | Antes | Target |
|---------|-------|--------|
| Prompts detectables | 16 | **49** (16 + 33) |
| Instructions detectables | 9 | **16** (9 + 7) |
| % de prompts accesibles | 33% | **100%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| VS Code 1.107+ | ✅ | Soporte para settings de ubicaciones |
| Copilot Extension | ✅ | Habilitada |
| Settings aplicados | ⏳ | Requiere reinicio de VS Code |

---

# Épica: SCRIPT-1.6.0 — Rediseño Index Web (Splash)

**Objetivo**: Refactorizar la página de inicio (`docs/index.md`) según las directrices de diseño en `ARCHIVO/DISCO/SPLASH/index.md`.

**Estado**: 🔄 En Progreso

**Detectado**: 2025-12-23  
**Referencia**: `ARCHIVO/DISCO/SPLASH/index.md`

---

## Contexto

La landing page actual tiene áreas de mejora detectadas:

1. **Cabecera**: Menú hamburguesa no funciona (falta JS para toggle)
2. **Galería secciones**: Desincronizada del menú de cabecera
3. **Auditores**: Sección descriptiva sin impacto visual
4. **Status**: Datos manuales que deberían venir de Fotos de Estado
5. **Únete al cambio**: Título no transmite la propuesta de valor

### Idea fuerza para Auditores

> "La verdad es luz blanca: no existe como tal sino como suma de la proporción de rayos de colores."

Los 5 auditores (banderas) son prismas que descomponen la luz del conocimiento en espectros verificables.

---

## Story: SCRIPT-1.6.0-S01 — Fix Menú Hamburguesa
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Añadir JavaScript para toggle del menú móvil | ✅ |
| T002 | Añadir clase `.active` al botón cuando está abierto | ✅ |
| T003 | Mejorar accesibilidad (aria-expanded) | ✅ |

---

## Story: SCRIPT-1.6.0-S02 — Sincronizar Galería con Menú
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Actualizar `home-nav` con items de `_config.yml` | ✅ |
| T005 | Añadir Teatro a la galería | ✅ |
| T006 | Añadir Acerca de a la galería | ✅ |

---

## Story: SCRIPT-1.6.0-S03 — Rediseño Sección Auditores
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Nuevo título: "El Prisma del Conocimiento" | ✅ |
| T008 | Visual de espectro: luz blanca → 5 colores | ✅ |
| T009 | Copy persuasivo sobre descomposición en banderas | ✅ |
| T010 | Estilo CSS con degradado y animación sutil | ✅ |

---

## Story: SCRIPT-1.6.0-S04 — Reemplazar Sección STATUS
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Traer última foto de estado desde FOTOS_ESTADO/ | ✅ |
| T012 | Formato monocromo simplificado | ✅ |
| T013 | Enlace a roadmap para galería completa | ✅ |

---

## Story: SCRIPT-1.6.0-S05 — Renombrar ÚNETE AL CAMBIO
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T014 | Nuevo título: "El Procesador de Texto del Futuro" | ✅ |
| T015 | Copy enfocado en IA que trabaja para ti | ✅ |
| T016 | Mantener CTAs de Fork/Issues/Contribuir | ✅ |

---

## Story: SCRIPT-1.6.0-S06 — Footer Branding
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Añadir enlace VibeBitacora al footer | ✅ |

---

## Métricas SCRIPT-1.6.0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 17 |
| Completadas | **17** |
| % Avance | **100%** 🎉 |

---

## Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `docs/index.md` | Rediseño completo de secciones |
| `docs/_includes/header.html` | Añadir script toggle menú |
| `docs/assets/css/main.css` | Estilos para prisma y nueva sección status |

---

# Épica: SCRIPT-1.12.0 — Protocolo de Submódulos

**Objetivo**: Estandarizar el proceso de inspección e integración de submódulos, definiendo un set común de backlog items para garantizar consistencia y calidad en la incorporación de código externo.

**Estado**: ✅ Completada

## Story: SCRIPT-1.12.0-S01 — Items Comunes de Inspección
**Estado**: ✅ Completada

### Checklist de Inspección
Para cada nuevo submódulo, se deben generar las siguientes tareas de inspección:

1. **Análisis de Arquitectura**: Identificar patrones (MVC, Hexagonal, etc.), lenguajes y frameworks.
2. **Inventario de Recursos**: Listar agentes, prompts, instrucciones y herramientas existentes.
3. **Análisis de Dependencias**: Identificar librerías externas, requisitos de sistema y conflictos potenciales.
4. **Puntos de Integración**: Detectar APIs, webhooks, esquemas de datos y puntos de extensión.
5. **Mapeo Ontológico**: Alinear conceptos del submódulo con la taxonomía del Scriptorium (UI, Backend, Sistema).
6. **Evaluación de Calidad**: Revisar cobertura de tests, linter rules y documentación.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Documentar checklist de inspección en `submodulo-integracion.instructions.md` | ✅ |
| T002 | Crear plantilla de issue/ticket para inspección de submódulos | ✅ |

---

# Épica: SCRIPT-2.0.0 — Extensión VS Code para Scriptorium

**Objetivo**: Refactorizar `vscode-alephscript-extension` (Arrakis Theater) para crear una extensión especializada que integre el sistema de agentes, plugins y backlogs de ALEPH Scriptorium con VS Code y GitHub Copilot Chat.

**Estado**: 🔄 En Progreso (Feature Cycle 1)

**Rama de trabajo**: `integration/beta/scriptorium`  
**Submódulo**: `vscode-alephscript-extension`  
**Planificación completa**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/VS-CODE-EXTENSION/`

---

## Contexto

### El problema

Los agentes del Scriptorium (20+) y plugins (8) solo son accesibles vía Copilot Chat con invocación manual. No hay:
- Vista visual de agentes por capas
- Detección dinámica de agentes desde `.github/agents/`
- Vista de plugins con estado enabled/disabled
- Vista de backlogs con progreso de tasks
- ChatParticipants personalizados para agentes principales

### La solución

Refactorizar la extensión Arrakis Theater para:
1. **Carga dinámica**: Escanear y mostrar agentes/plugins del workspace
2. **TreeViews**: Vistas laterales para Agentes, Plugins, Backlogs
3. **ChatParticipants**: Registrar agentes como participantes de Copilot Chat
4. **Panel de Sprint**: Estado actual del sprint con métricas

### Arquitectura propuesta

```
src/scriptorium/
├── services/
│   ├── AgentLoaderService.ts
│   ├── PluginLoaderService.ts
│   └── BacklogLoaderService.ts
├── parsers/
│   ├── AgentParser.ts
│   └── PluginParser.ts
├── views/
│   ├── AgentesTreeDataProvider.ts
│   ├── PluginsTreeDataProvider.ts
│   └── BacklogTreeDataProvider.ts
└── participants/
    ├── AlephChatParticipant.ts
    └── OxChatParticipant.ts
```

---

## Feature Cycle 1: Configuración y Carga Dinámica

> **Ciclo actual**: Feature Cycle 1  
> **Effort total asignado**: 24 pts  
> **Objetivo**: Establecer base de código y carga dinámica de agentes/plugins

---

## Story: SCRIPT-2.0.0-S00 — Análisis y Planificación
**Effort**: 3 pts
**Prioridad**: Must
**Estado**: ✅ Completada

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T000 | Realizar análisis profundo de `vscode-alephscript-extension` y generar plan de refactorización (ver `ARCHIVO/DISCO/BACKLOG_BORRADORES/VS-CODE-EXTENSION/`) | 3 | ✅ |

**Entregables**:
- Planificación Épica (`01_planificacion-extension-vscode.md`)
- Backlog Detallado (`02_backlog-extension-vscode.md`)
- Informes de Integración por Agente (`03` a `10`)

---

## Story: SCRIPT-2.0.0-S01 — Configuración Inicial
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: 🔄 En Progreso

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear rama `integration/beta/scriptorium` | 0.5 | ✅ |
| T002 | Renombrar extensión: `scriptorium-vscode-extension` | 0.5 | ✅ |
| T003 | Actualizar `package.json` (nombre, ID, descripción, keywords) | 0.5 | ✅ |
| T004 | Crear `README.md` específico para Scriptorium | 0.5 | ✅ |

**Definition of Done**: Extensión compila con nuevo nombre, sin conflictos con original.

---

## Story: SCRIPT-2.0.0-S02 — Limpieza de Módulos
**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Eliminar `MCPServerManager` (no usado en Scriptorium) | 0.5 | ⏳ |
| T006 | Eliminar `SocketMonitor` (no usado) | 0.5 | ⏳ |
| T007 | Simplificar `HackerPanels` (mantener 1 de 3) | 1 | ⏳ |
| T008 | Refactorizar imports en `extensionBootstrap.ts` | 0.5 | ⏳ |
| T009 | Actualizar `package.json` (eliminar comandos MCP/Socket) | 0.5 | ⏳ |

**Definition of Done**: Código compila sin módulos eliminados.

---

## Story: SCRIPT-2.0.0-S03 — Parser de Agentes
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T010 | Crear `AgentParser.ts` para leer frontmatter YAML | 1 | ⏳ |
| T011 | Definir interfaz `ScriptoriumAgent` | 0.5 | ⏳ |
| T012 | Implementar extracción de handoffs | 0.5 | ⏳ |
| T013 | Implementar detección de capa (UI/Backend/Sistema/Plugins) | 0.5 | ⏳ |
| T014 | Tests unitarios para parser | 0.5 | ⏳ |

**Definition of Done**: Parser extrae metadata de 20+ agentes sin errores.

---

## Story: SCRIPT-2.0.0-S04 — AgentLoader Service
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T015 | Crear `AgentLoaderService.ts` | 0.5 | ⏳ |
| T016 | Implementar scan de `.github/agents/*.agent.md` | 0.5 | ⏳ |
| T017 | Implementar caché de agentes | 0.5 | ⏳ |
| T018 | Implementar refresh on file change (FileWatcher) | 0.5 | ⏳ |

**Definition of Done**: Service carga todos los agentes del workspace.

---

## Story: SCRIPT-2.0.0-S05 — AgentesTreeDataProvider
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Crear `AgentesTreeDataProvider.ts` | 1 | ⏳ |
| T020 | Implementar agrupación por capa (UI/Backend/Sistema/Plugins/Meta) | 0.5 | ⏳ |
| T021 | Mostrar icono según capa (🟢/🔵⚫🔴🟡🟠/⚪/🔌/⚙️) | 0.5 | ⏳ |
| T022 | Implementar tooltips con descripción y handoffs | 0.5 | ⏳ |
| T023 | Implementar acciones contextuales (abrir, invocar chat) | 0.5 | ⏳ |

**Definition of Done**: TreeView muestra 20+ agentes agrupados por capa.

---

## Story: SCRIPT-2.0.0-S06 — PluginLoader Service
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T024 | Crear `PluginLoaderService.ts` | 0.5 | ⏳ |
| T025 | Parsear `.github/plugins/registry.json` | 0.5 | ⏳ |
| T026 | Leer manifest.md de cada plugin | 0.5 | ⏳ |
| T027 | Extraer agentes, prompts, instructions por plugin | 0.5 | ⏳ |

**Definition of Done**: Service carga 8 plugins con sus recursos.

---

## Story: SCRIPT-2.0.0-S07 — PluginsTreeDataProvider
**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T028 | Crear `PluginsTreeDataProvider.ts` | 1 | ⏳ |
| T029 | Mostrar plugins con estado (enabled/disabled) | 0.5 | ⏳ |
| T030 | Expandir para ver agentes/prompts/instructions | 0.5 | ⏳ |
| T031 | Acción contextual: Activar/Desactivar plugin | 0.5 | ⏳ |
| T032 | Acción contextual: Abrir manifest.md | 0.5 | ⏳ |

**Definition of Done**: TreeView muestra 8 plugins expandibles.

---

## Story: SCRIPT-2.0.0-S08 — ScriptoriumChatManager
**Effort**: 3 pts  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T033 | Crear `ScriptoriumChatManager.ts` | 1 | ⏳ |
| T034 | Definir interfaz `ScriptoriumChatAgent` | 0.5 | ⏳ |
| T035 | Implementar factory de ChatParticipants | 0.5 | ⏳ |
| T036 | Registrar @aleph como ChatParticipant | 0.5 | ⏳ |
| T037 | Registrar @ox como ChatParticipant | 0.5 | ⏳ |

**Definition of Done**: 2+ ChatParticipants operativos en Copilot Chat.

---

## Métricas Feature Cycle 1

| Métrica | Valor |
|---------|-------|
| Stories totales | 8 |
| Tasks totales | 37 |
| Effort total | 21 pts |
| Prioridad Must | 5 stories (13 pts) |
| Prioridad Should | 2 stories (6 pts) |
| Prioridad Could | 1 story (3 pts) |
| Completadas | **4** |
| % Avance | **11%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| vscode-alephscript-extension | ✅ Submódulo | Rama `integration/beta/scriptorium` |
| ALEPH/.github/agents/ | ✅ | 20+ agentes definidos |
| ALEPH/.github/plugins/ | ✅ | 8 plugins instalados |
| VS Code ^1.95.0 | ✅ | API ChatParticipant |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-23 | Aprobar épica SCRIPT-2.0.0 desde borrador | @scrum |
| 2025-12-23 | Completar S01 (T001-T004): configuración inicial | @aleph |
| 2025-12-23 | Añadir épica SCRIPT-1.8.0: Actualización Portada Periódico Diciembre 2025 | @scrum |


---

# Épica: SCRIPT-1.8.0 — Actualización Portada Periódico Diciembre 2025

**Objetivo**: Actualizar la cabecera (titular) y las tesis del número en `docs/periodico.md` mediante conversación editorial con el usuario, aplicando el protocolo de sesiones editoriales documentado en `ARCHIVO/DISCO/Diciembre_25_Portada/`.

**Agente responsable**: @periodico  
**Estado**: 🔄 En Progreso (Feature Cycle 1)

**Ticket fuente**: `ARCHIVO/DISCO/Diciembre_25_Portada/TICKET-TESIS-NUMERO.md`  
**Material de sesiones**: `ARCHIVO/DISCO/Diciembre_25_Portada/01_Cabecera.md`, `02_Pie.md`

---

## Contexto

### El problema

El periódico Nº 1 (Diciembre 2025) tiene:
- **Cabecera**: Titular dialéctico actual que puede mejorarse con gancho poético
- **Tesis**: 3 tesis que las sesiones editoriales proponen expandir a 5

### La solución

Conversación editorial estructurada donde @periodico:
1. Presenta las opciones al usuario editor
2. Guía la decisión con tests de @orangeflag
3. Redacta textos finales
4. Entrega conversación + textos para publicar

### Zonas a modificar en periodico.md

| Zona | Ubicación | Contenido actual |
|------|-----------|------------------|
| Cabecera | `<div class="periodico-headline">` | Titular dialéctico |
| Pie | `<div class="periodico-thesis">` | 3 tesis |

---

## Propuestas disponibles (del ticket)

### A. Cabecera — Titular

| Opción | Registro | Contenido resumido |
|--------|----------|-------------------|
| **Actual** | Dialéctico | «La verdad ya no es un dato...» |
| **A** | Poético | «Han capturado las palabras...» |
| **B** | Mixto | «Han capturado las palabras.» + subtítulo dialéctico |

### B. Pie — Tesis

| Opción | Nº tesis | Cambio principal |
|--------|----------|------------------|
| **Actual** | 3 | Diagnóstico convergente |
| **5T** | 5 | Añadir tesis 0 (posición) y tesis 4 (interior) |
| **3T+** | 3 | Mantener estructura, refinar contenido |

---

## Stories

### SCRIPT-1.8.0-S01 — Preparación y Análisis
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

#### Descripción
Revisar material de sesiones editoriales y preparar contexto para conversación.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Leer y sintetizar 01_Cabecera.md | 0.5 | ✅ |
| T002 | Leer y sintetizar 02_Pie.md | 0.5 | ✅ |
| T003 | Crear TICKET-TESIS-NUMERO.md con propuestas | 0.5 | ✅ |
| T004 | Documentar protocolo en instrucciones | 0.5 | ✅ |

**Definition of Done**: Ticket creado con propuestas estructuradas y sacrificios declarados.

---

### SCRIPT-1.8.0-S02 — Conversación Editorial: Cabecera
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
@periodico conversa con el usuario editor para decidir el titular.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Presentar las 3 opciones de cabecera al usuario | 0.5 | ⏳ |
| T006 | Invocar @orangeflag para auditar registro (modo, auditorio, género) | 1 | ⏳ |
| T007 | Recoger decisión del usuario con justificación | 0.5 | ⏳ |
| T008 | Documentar decisión en conversacion-cabecera.md | 0.5 | ⏳ |
| T009 | Redactar texto final de cabecera | 0.5 | ⏳ |

**Definition of Done**: Decisión tomada, documentada y texto final redactado.

**Entregables**:
- `ARCHIVO/DISCO/Diciembre_25_Portada/conversacion-cabecera.md`
- Texto HTML final para `<div class="periodico-headline">`

---

### SCRIPT-1.8.0-S03 — Conversación Editorial: Tesis
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
@periodico conversa con el usuario editor para decidir las tesis del número.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T010 | Presentar las 3 opciones de tesis al usuario (Actual, 5T, 3T+) | 0.5 | ⏳ |
| T011 | Explicar sacrificios de cada opción | 0.5 | ⏳ |
| T012 | Si elige 5T: revisar tesis 0 (posición) con usuario | 0.5 | ⏳ |
| T013 | Si elige 5T: revisar tesis 4 (interior) con usuario | 0.5 | ⏳ |
| T014 | Invocar @orangeflag para auditar estilo (claridad, entimema) | 1 | ⏳ |
| T015 | Recoger decisión del usuario con justificación | 0.5 | ⏳ |
| T016 | Documentar decisión en conversacion-tesis.md | 0.5 | ⏳ |
| T017 | Redactar texto final de tesis (HTML) | 1 | ⏳ |

**Definition of Done**: Decisión tomada, documentada y texto final redactado.

**Entregables**:
- `ARCHIVO/DISCO/Diciembre_25_Portada/conversacion-tesis.md`
- Texto HTML final para `<div class="periodico-thesis">`

---

### SCRIPT-1.8.0-S04 — Redacción Final y Revisión
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Consolidar textos finales y preparar para publicación.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T018 | Consolidar textos de cabecera y tesis en un entregable | 0.5 | ⏳ |
| T019 | Revisar coherencia entre cabecera y tesis | 0.5 | ⏳ |
| T020 | Invocar @revisor para verificar voz/estilo | 1 | ⏳ |
| T021 | Crear ENTREGABLE-FINAL.md con conversaciones + textos | 1 | ⏳ |

**Definition of Done**: Entregable listo para integración.

**Entregables**:
- `ARCHIVO/DISCO/Diciembre_25_Portada/ENTREGABLE-FINAL.md`

---

### SCRIPT-1.8.0-S05 — Integración y Publicación
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Aplicar cambios en periodico.md y publicar.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T022 | Aplicar cambios en docs/periodico.md (cabecera) | 0.5 | ⏳ |
| T023 | Aplicar cambios en docs/periodico.md (tesis) | 0.5 | ⏳ |
| T024 | Validar localmente con Jekyll | 0.5 | ⏳ |
| T025 | Generar commit según protocolo DevOps | 0.5 | ⏳ |

**Definition of Done**: periodico.md actualizado y commit realizado.

**Commit esperado**:
```
feat(ghpages/periodico): actualizar tesis del número Diciembre 2025

- Cabecera: [describir cambio elegido]
- Pie: [describir cambio elegido]
- Basado en sesiones editoriales en ARCHIVO/DISCO/Diciembre_25_Portada/

refs #GHPAGES-1.0.0-T001
```

---

## Métricas SCRIPT-1.8.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 5 |
| Tasks totales | 25 |
| Puntos totales | 15 |
| Prioridad Must | 5 stories (15 pts) |
| Completadas | **1** (S01) |
| % Avance | **20%** |

---

## Flujo de Conversación Editorial

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUJO @PERIODICO                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   S01 (✅)              S02                    S03                    │
│   Preparación    →    Cabecera    →    Tesis                         │
│   TICKET               Conversación     Conversación                  │
│                        con Usuario      con Usuario                   │
│                             │                 │                       │
│                             ▼                 ▼                       │
│                        @orangeflag       @orangeflag                  │
│                        (registro)        (estilo)                     │
│                             │                 │                       │
│                             ▼                 ▼                       │
│                        Decisión           Decisión                    │
│                             │                 │                       │
│                             └────────┬────────┘                       │
│                                      ▼                                │
│                                    S04                                │
│                              Redacción Final                          │
│                              @revisor (voz)                           │
│                                      │                                │
│                                      ▼                                │
│                                    S05                                │
│                              Integración                              │
│                              docs/periodico.md                        │
│                              Commit                                   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Entregables Esperados

| Entregable | Ubicación | Contenido |
|------------|-----------|-----------|
| Conversación Cabecera | `DISCO/Diciembre_25_Portada/conversacion-cabecera.md` | Diálogo @periodico ↔ Usuario |
| Conversación Tesis | `DISCO/Diciembre_25_Portada/conversacion-tesis.md` | Diálogo @periodico ↔ Usuario |
| Entregable Final | `DISCO/Diciembre_25_Portada/ENTREGABLE-FINAL.md` | Textos HTML listos + resumen |
| Periódico Actualizado | `docs/periodico.md` | Cabecera + Tesis modificados |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Ticket GHPAGES-1.0.0-T001 | ✅ Creado | Propuestas documentadas |
| Sesión 01_Cabecera.md | ✅ Completada | Material para S02 |
| Sesión 02_Pie.md | ✅ Completada | Material para S03 |
| Protocolo en instrucciones | ✅ Documentado | periodico.instructions.md |
| CSS .periodico-thesis | ⚠️ Verificar | Soporte para 5 items y `<ol start="0">` |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Tesis 4 suena a autoayuda | Media | Medio | Vigilar registro con @orangeflag |
| Usuario indeciso | Baja | Bajo | Ofrecer recomendación fundamentada |
| CSS no soporta 5 items | Baja | Bajo | Verificar antes de publicar |

---

## Protocolo de Invocación

Para iniciar la conversación editorial:

```
@periodico Actualizar portada del número Diciembre 2025.
Adjunto: ARCHIVO/DISCO/Diciembre_25_Portada/TICKET-TESIS-NUMERO.md
```

El agente @periodico:
1. Lee el ticket y las sesiones editoriales
2. Presenta opciones al usuario
3. Invoca @orangeflag para auditar registro
4. Documenta decisiones
5. Redacta textos finales
6. Entrega ENTREGABLE-FINAL.md para integración

---

# Épica: SCRIPT-1.9.0 — Integración AS-Utils-SDK (VibeCoding Connector)

**Objetivo**: Integrar el submódulo `as-utils-sdk` como punto de fuga del Teatro, conectando AlephScriptorium con la suite VibeCoding y la extensión Arrakis Theater. Habilitar runtime dinámico Matrix como alternativa al visualizador impress.js estático.

**Estado**: 🆕 Nueva (Feature Cycle 1)

**Submódulo**: `as-utils-sdk` (https://github.com/escrivivir-co/as-utils-sdk.code-workspace)  
**Rama de integración**: `integration/beta/scriptorium`  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/AS-UTILS-SDK/conversacion-po-sm.md`

---

## Contexto

### El problema

El Teatro actual (SCRIPT-1.0.0) genera páginas estáticas con Jekyll + impress.js:
- No hay runtime dinámico
- No hay tracking en tiempo real del progreso
- No hay soporte para sesiones de hacklab en vivo
- Las capacidades quedan limitadas a nuestra codebase

### La solución

Integrar `as-utils-sdk` que proporciona:
- **Matrix Theater**: Interfaz cyberpunk con tracking en tiempo real
- **mission-state.json**: Estado de 12 pasos sincronizable con BOE
- **Maestro de Ceremonias**: Teleprompter para sesiones en vivo
- **Infraestructura MCP**: Zeus (3012) → SLMo42 (4001) → MCPGaia (3003)
- **Framework Retro v0.5**: Sistema de orquestación de expediciones

### Arquitectura del submódulo

```
as-utils-sdk/
├── .github/
│   ├── copilot-instructions.md    # Arquitectura del ecosistema
│   └── chatmodes/                  # Agentes especializados
│       ├── agente-interactivo-mcp.chatmode.md
│       └── agente-operador.chatmode.md
├── theater/                        # Runtime visual Matrix
│   ├── index.html                 # Interfaz en tiempo real
│   ├── matrix-theater.js          # Lógica de tracking
│   ├── mission-state.json         # Estado de 12 pasos + 4 equipos
│   └── api/update-progress.js     # API de progreso
├── vibe-bitacora/                  # 9 bitácoras de sesiones
├── ARRAKIS_THEATER.md             # Roles: Casa Arrakis, Elenco, Público
├── ECOSYSTEM_OVERVIEW.md          # Diagrama Mermaid del ecosistema
├── MAESTRO_CEREMONIAS.md          # Teleprompter (328 líneas)
└── RELATO_CANONICO_OASIS42.md     # Historia del Camino del Héroe
```

### Mapeo ontológico con Scriptorium

| as-utils-sdk | Scriptorium | Función |
|--------------|-------------|---------|
| Astillero Backend | @redflag | Infraestructura, puertos |
| Astillero Frontend | @orangeflag | UI/UX, registro |
| Astillero Integration | @blueflag | Conexiones, evidencia |
| Astillero Validation | @revisor | Coherencia, tests |
| Agente Operador | @aleph | Orquestación |
| Agente Interactivo MCP | @plugin_ox_mcppresets | Gestión de presets |
| Maestro Ceremonias | @plugin_ox_teatro | Conductor de sesiones |
| mission-state.json | BOE | Estado del teatro |
| 12 steps | Monomito | Estructura narrativa |

---

## Story: SCRIPT-1.9.0-S01 — Inicialización del Submódulo
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Añadir submódulo `as-utils-sdk` al workspace | ✅ |
| T002 | Crear rama `integration/beta/scriptorium` | ✅ |
| T003 | Documentar estructura en conversación PO-SM | ✅ |
| T004 | Añadir épica al backlog | ✅ |

---

## Story: SCRIPT-1.9.0-S02 — Sincronización BOE ↔ mission-state
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear adaptador bidireccional entre el BOE del Teatro y el mission-state.json de as-utils-sdk.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Analizar schema de mission-state.json (12 steps, 4 teams) | ⏳ |
| T006 | Crear prompt `sincronizar-boe-mission.prompt.md` | ⏳ |
| T007 | Implementar mapeo BOE → mission-state | ⏳ |
| T008 | Implementar mapeo mission-state → BOE | ⏳ |
| T009 | Documentar protocolo de sincronización | ⏳ |

**Definition of Done**: Cambios en BOE se reflejan en mission-state y viceversa.

---

## Story: SCRIPT-1.9.0-S03 — Modo Matrix para Teatro
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Habilitar interfaz Matrix como runtime alternativo al visualizador impress.js.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Crear ruta `docs/teatro/{obra}/matrix/` | ⏳ |
| T011 | Adaptar `matrix-theater.js` para datos de obra | ⏳ |
| T012 | Añadir switch en cartelera: "Modo impress.js" / "Modo Matrix" | ⏳ |
| T013 | Implementar fallback si Matrix no carga | ⏳ |
| T014 | Documentar requisitos del modo Matrix | ⏳ |

**Definition of Done**: Usuario puede elegir entre impress.js y Matrix al abrir una obra.

---

## Story: SCRIPT-1.9.0-S04 — Maestro de Ceremonias
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Integrar el Teleprompter del Maestro de Ceremonias para sesiones de hacklab en vivo.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T015 | Crear handoff `@plugin_ox_teatro → lanzar sesión en vivo` | ⏳ |
| T016 | Adaptar MAESTRO_CEREMONIAS.md a formato de prompt | ⏳ |
| T017 | Crear vista de teleprompter en docs/teatro/{obra}/mc/ | ⏳ |
| T018 | Integrar controles de avance de estadio | ⏳ |

**Definition of Done**: El Teatro puede lanzar sesiones en vivo con teleprompter guiado.

---

## Story: SCRIPT-1.9.0-S05 — Modo Híbrido (Ligero/Completo)
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Implementar dos modos de operación según recursos disponibles.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T019 | Definir requisitos de modo ligero (sin MCP) | ⏳ |
| T020 | Definir requisitos de modo completo (con MCP) | ⏳ |
| T021 | Implementar detección automática de disponibilidad | ⏳ |
| T022 | Documentar diferencias entre modos | ⏳ |

**Definition of Done**: Teatro funciona sin backend MCP (degrada graceful).

---

## Story: SCRIPT-1.9.0-S06 — Bridge Agéntico
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Crear agente bridge para acceder a capacidades de as-utils-sdk.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T023 | Crear `plugin_ox_asutilssdk.agent.md` | ⏳ |
| T024 | Mapear chatmodes a handoffs | ⏳ |
| T025 | Integrar con @aleph | ⏳ |
| T026 | Actualizar registry.json | ⏳ |

**Definition of Done**: `@aleph → [AS-UTILS-SDK]` funciona como handoff.

---

## Story: SCRIPT-1.9.0-S07 — Documentación y Tests
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Documentar integración y validar funcionamiento.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T027 | Actualizar README.md con submódulo | ⏳ |
| T028 | Actualizar copilot-instructions.md | ⏳ |
| T029 | Test: Teatro en modo Matrix | ⏳ |
| T030 | Test: Sincronización BOE ↔ mission-state | ⏳ |
| T031 | Test: Fallback a modo ligero | ⏳ |

**Definition of Done**: Documentación completa y tests pasan.

---

## Métricas SCRIPT-1.9.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 7 |
| Tasks totales | 31 |
| Puntos totales | 23 |
| Prioridad Must | 4 stories (12 pts) |
| Prioridad Should | 3 stories (11 pts) |
| Completadas | **1** (S01) |
| % Avance | **14%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo as-utils-sdk | ✅ Añadido | Rama integration/beta/scriptorium |
| Plugin Teatro | ✅ Instalado | SCRIPT-1.0.0 completado |
| Plugin MCP-Presets | ✅ Instalado | Para presets de as-utils-sdk |
| Infraestructura MCP (opcional) | ⚠️ Externa | Zeus, SLMo42, MCPGaia |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Dependencia de infraestructura externa | Alta | Medio | Modo híbrido ligero/completo |
| Conflicto ontológico (dos estructuras) | Media | Bajo | Mapeo documentado |
| Registro alienante (narrativa épica) | Media | Bajo | Ofrecer modo técnico sin narrativa |
| Superficie de ataque (puertos abiertos) | Baja | Alto | Abstracción vía bridges |

---

## Changelog SCRIPT-1.9.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Añadir submódulo as-utils-sdk | @aleph |
| 2025-12-24 | Crear rama integration/beta/scriptorium | @aleph |
| 2025-12-24 | Crear conversación PO-SM con análisis de agentes | @scrum |
| 2025-12-24 | Aprobar épica SCRIPT-1.9.0 | @scrum |

---

# Épica: SCRIPT-1.10.0 — Integración AS-Gym (Almas para Agentes)

**Objetivo**: Integrar el submódulo `as-gym` como repositorio de "almas" (lógicas y autómatas) para agentes, extendiendo el plugin AGENT_CREATOR con paradigmas de IA formales: lógica clásica, conexionista, simbólica, sistemas basados en reglas/casos, y más.

**Estado**: 🆕 Inicializada (pendiente de análisis profundo)

**Submódulo**: `as-gym` (https://github.com/escrivivir-co/as-gym)  
**Rama origen**: `dev/001`  
**Rama de integración**: `integration/beta/scriptorium`  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/AS-GYM/conversacion-po-sm.md`

---

## Contexto

### El problema

El plugin AGENT_CREATOR crea agentes con personalidad y conocimiento, pero:
- No tienen **motor de razonamiento formal**
- No pueden aplicar **lógica estructurada**
- Dependen 100% de prompts sin estado interno persistente

### La solución

Integrar `as-gym/alephscript/src/FIA/` (Fundamentos de Inteligencia Artificial):
- **10 paradigmas** de IA disponibles como "almas"
- **Interfaz iFIA** compatible con nuestra arquitectura
- **Motor de ejecución** con kernel y caché
- Integración ONNX para modelos pre-entrenados

### Arquitectura del submódulo

```
as-gym/
├── alephscript/src/FIA/           # 🎯 OBJETIVO PRINCIPAL
│   ├── iFIA.ts                    # Interfaz base
│   ├── paradigmas/                # 10 paradigmas de IA
│   │   ├── conexionista/          # Redes neuronales
│   │   ├── logica/                # Lógica formal
│   │   ├── simbolica/             # IA simbólica
│   │   ├── sbc/                   # Sistemas basados en casos
│   │   ├── sbr/                   # Sistemas basados en reglas
│   │   ├── situada/               # IA embodied
│   │   ├── hibrido/               # Combinaciones
│   │   ├── cientifica/            # Método científico
│   │   ├── gramaticas/            # Gramáticas formales
│   │   └── sistemas/              # Teoría de sistemas
│   ├── engine/                    # Motor de ejecución
│   │   ├── kernel/                # Núcleo
│   │   └── onnx/                  # Modelos ONNX
│   ├── mundos/                    # Entornos/mundos
│   └── agents/                    # Agentes predefinidos
├── as-core/                       # Core compartido
├── ws-server/                     # WebSocket server
└── webapp/                        # Aplicación web
```

### Mapeo paradigmas ↔ banderas (preliminar)

| Paradigma | Bandera | Afinidad |
|-----------|---------|----------|
| `logica/` | @blueflag | Verdad formal, proposiciones |
| `sbr/` | @blackflag | Reglas de poder, condiciones |
| `situada/` | @redflag | Contexto material, embodied |
| `conexionista/` | @yellowflag | Patrones emergentes, límites |
| `sbc/` | @revisor | Casos precedentes, coherencia |
| `simbolica/` | @aleph | Producción, manipulación |
| `gramaticas/` | @orangeflag | Registro, estructura formal |

---

## Story: SCRIPT-1.10.0-S01 — Inicialización del Submódulo
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Añadir submódulo `as-gym` desde rama dev/001 | ✅ |
| T002 | Crear rama `integration/beta/scriptorium` | ✅ |
| T003 | Documentar estructura en conversación PO-SM | ✅ |
| T004 | Añadir épica al backlog | ✅ |

---

## Story: SCRIPT-1.10.0-S02 — Análisis de Paradigmas FIA
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente (próxima sesión)

### Descripción
Inspección profunda de cada paradigma en `paradigmas/`.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Analizar `paradigmas/logica/` | ⏳ |
| T006 | Analizar `paradigmas/conexionista/` | ⏳ |
| T007 | Analizar `paradigmas/simbolica/` | ⏳ |
| T008 | Analizar `paradigmas/sbr/` y `paradigmas/sbc/` | ⏳ |
| T009 | Analizar `paradigmas/situada/` | ⏳ |
| T010 | Analizar `paradigmas/hibrido/` | ⏳ |
| T011 | Documentar catálogo de paradigmas disponibles | ⏳ |

**Definition of Done**: Catálogo documentado con capacidades de cada paradigma.

---

## Story: SCRIPT-1.10.0-S03 — Integración con AGENT_CREATOR
**Puntos**: 8  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Conectar paradigmas FIA como opción de "alma" en la creación de agentes.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Añadir campo `paradigma` al schema de recipes | ⏳ |
| T013 | Crear selector de paradigma en flujo de creación | ⏳ |
| T014 | Implementar carga de paradigma en agente generado | ⏳ |
| T015 | Documentar paradigmas disponibles en AGENT_CREATOR | ⏳ |

**Definition of Done**: Usuario puede elegir paradigma al crear agente.

---

## Story: SCRIPT-1.10.0-S04 — Motor de Ejecución
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Habilitar el motor de ejecución (`engine/`) para agentes con paradigma.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T016 | Analizar `engine/kernel/` | ⏳ |
| T017 | Evaluar integración ONNX | ⏳ |
| T018 | Definir requisitos de runtime | ⏳ |
| T019 | Documentar modos de ejecución | ⏳ |

**Definition of Done**: Motor ejecutable en entorno Scriptorium.

---

## Story: SCRIPT-1.10.0-S05 — Documentación y Bridge
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear bridge agéntico y documentar integración.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T020 | Crear `plugin_ox_asgym.agent.md` | ⏳ |
| T021 | Actualizar AGENT_CREATOR/README.md | ⏳ |
| T022 | Actualizar registry.json | ⏳ |
| T023 | Documentar paradigmas en copilot-instructions | ⏳ |

**Definition of Done**: Bridge funcional y documentación completa.

---

## Métricas SCRIPT-1.10.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 5 |
| Tasks totales | 23 |
| Puntos totales | 23 |
| Prioridad Must | 4 stories (18 pts) |
| Prioridad Should | 1 story (5 pts) |
| Completadas | **1** (S01) |
| % Avance | **20%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo as-gym | ✅ Añadido | Rama integration/beta/scriptorium |
| Plugin AGENT_CREATOR | ✅ Instalado | Target de integración |
| TypeScript runtime | ⚠️ Evaluar | FIA está en TypeScript |
| ONNX runtime (opcional) | ⚠️ Evaluar | Para modelos pre-entrenados |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Complejidad de TypeScript | Media | Medio | Abstraer vía interfaces |
| ONNX requiere binarios | Media | Alto | Modo con/sin ONNX |
| Paradigmas incompletos | Baja | Medio | Catálogo con niveles de madurez |
| Conflicto de dependencias | Baja | Medio | Aislamiento de runtime |

---

## Changelog SCRIPT-1.10.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Añadir submódulo as-gym desde dev/001 | @aleph |
| 2025-12-24 | Crear rama integration/beta/scriptorium | @aleph |
| 2025-12-24 | Crear conversación PO-SM preliminar | @scrum |
| 2025-12-24 | Inicializar épica SCRIPT-1.10.0 | @scrum |

---

# Épica: SCRIPT-1.11.0 — Rediseño Ecosistema (Agentes → Plugins → Submódulos)

**Objetivo**: Rediseñar la página "Agentes" como "Ecosistema" con tres galerías interactivas: Agentes (12 core + bridges), Plugins (18), y Submódulos (14). Orientada al usuario: cómo invocar, qué handoffs expone, qué prompts disponibles.

**Estado**: 🔄 En Progreso (Feature Cycle 1)

**Fecha inicio**: 2025-12-24 (Nochebuena)  
**Rama de trabajo**: `fc1`

---

## Contexto

### El problema

La página `docs/agentes.md` actual:
- Solo muestra agentes, ignorando el ecosistema completo (plugins, submódulos)
- No explica cómo el usuario interactúa (handoffs, prompts)
- No refleja el inventario real: 14 submódulos + 18 plugins + 36 agentes

### La solución

Renombrar y expandir a **Ecosistema** con tres galerías:

```
┌────────────────────────────────────────────────────────────────────┐
│                    docs/ecosistema.md                               │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🧬 HERO: "El Ecosistema Aleph"                              │   │
│  │  Diagrama visual: Submódulos → Plugins → Agentes → Usuario  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  📦 GALERÍA SUBMÓDULOS (14)                                  │   │
│  │  Cards: nombre, descripción, puerto/runtime, estado         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔌 GALERÍA PLUGINS (18)                                     │   │
│  │  Cards: nombre, agentes, handoffs, prompts, dependencias    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🐂 GALERÍA AGENTES (por capa)                               │   │
│  │  UI → Backend → Sistema → Meta → Bridges                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  💬 GUÍA DE INTERACCIÓN                                      │   │
│  │  Cómo invocar, handoffs, prompts, ejemplos                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### Inventario a documentar

| Capa | Cantidad | Fuente de verdad |
|------|----------|------------------|
| Submódulos | 14 | `git submodule status` |
| Plugins | 18 | `.github/plugins/registry.json` |
| Agentes Core | 12 | `.github/agents/*.agent.md` |
| Agentes Bridge | 18 | `.github/agents/plugin_ox_*.agent.md` |
| Agentes Plugin | 16+ | `.github/plugins/*/agents/` |

---

## Stories

### SCRIPT-1.11.0-S01 — Diseño de Plana y Navegación
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Renombrar `docs/agentes.md` → `docs/ecosistema.md` | ✅ |
| T002 | Actualizar `docs/_config.yml`: permalink `/ecosistema/` | ✅ |
| T003 | Actualizar `docs/index.md`: card "Agentes" → "Ecosistema" con nuevo icono 🧬 | ✅ |
| T004 | Actualizar navegación header si existe | ✅ |
| T005 | Crear redirect de `/agentes/` a `/ecosistema/` (Jekyll redirect) | ✅ |

**Criterios de aceptación**:
- [ ] URL `/ecosistema/` funciona
- [ ] `/agentes/` redirige a `/ecosistema/`
- [ ] Navegación actualizada en index.md

---

### SCRIPT-1.11.0-S02 — Galería de Submódulos
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T006 | Crear sección "📦 Infraestructura (Submódulos)" | ✅ |
| T007 | Diseñar card de submódulo: nombre, repo, rama, descripción, runtime | ✅ |
| T008 | Generar 14 cards desde inventario | ✅ |
| T009 | Añadir badges de estado (operational, draft, deprecated) | ✅ |
| T010 | Añadir enlace a README-SCRIPTORIUM.md de cada submódulo | ✅ |

**Inventario de submódulos**:
| Submódulo | Descripción breve | Runtime |
|-----------|------------------|---------|
| vscode-alephscript-extension | Extensión VS Code | TypeScript |
| alephscript-mcp-presets-site | Gestor de presets MCP (Zeus) | Next.js |
| as-utils-sdk | VibeCoding Connector + Teatro Matrix | Node.js |
| as-gym | Almas para agentes (paradigmas IA) | TypeScript |
| blockly-alephscript-sdk | Editor visual de lógica | Angular |
| iot-sbr-logica-para-bots | Motor Prolog | SWI-Prolog |
| node-red-alephscript-sdk | SDK de nodos Node-RED | Node-RED |
| alephscript-n8n-like-editor | Editor visual de workflows | Angular 18 |
| alephscript-network-sdk | Red P2P Oasis/Scuttlebutt | Docker |
| alephscript-typed-prompting | Ontologías NL↔JSON | Vite + Drizzle |
| mcp-novelist | Editor de narrativas MCP | Node.js |
| wiki-racer | Navegación de grafos | TypeScript |
| kick-aleph-bot | Bot de Kick | Node.js |
| kick-aleph-crono-bot | Bot cronológico de Kick | Node.js |

**Criterios de aceptación**:
- [ ] 14 cards renderizadas
- [ ] Información de runtime visible
- [ ] Enlaces a repos funcionan

---

### SCRIPT-1.11.0-S03 — Galería de Plugins
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Crear sección "🔌 Plugins" con dos subsecciones: Operativos + Borradores | ✅ |
| T012 | Diseñar card de plugin: nombre, versión, agentes, handoffs clave, dependencias | ✅ |
| T013 | Generar 8 cards de plugins operativos | ✅ |
| T014 | Generar 10 cards de plugins borrador (estilo diferenciado) | ✅ |
| T015 | Añadir "Cómo invocar" con ejemplo de handoff para cada plugin | ✅ |

**Plugins operativos (8)**:
- ARG Board, Enciclopedia, GH-Pages, Foro Scraper
- Agent Creator, Teatro, Scrum, MCP-Presets

**Plugins borrador (10)**:
- Network, Novelist, Blockly Editor, Wire Editor
- Prolog Editor, Typed Prompting, N8N Editor
- Wiring App, ARG Board App, HyperGraph Editor

**Criterios de aceptación**:
- [ ] 18 cards renderizadas
- [ ] Distinción visual operativo vs borrador
- [ ] Handoffs visibles para cada plugin

---

### SCRIPT-1.11.0-S04 — Galería de Agentes (Actualizada)
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T016 | Mantener estructura de capas: UI, Backend, Sistema, Meta | ✅ |
| T017 | Añadir nueva capa "Bridges" con los 18 plugin_ox_* | ✅ |
| T018 | Actualizar contador en hero: "36 agentes" | ✅ |
| T019 | Añadir tooltip/popover con handoffs de cada agente | ✅ |
| T020 | Vincular cada agente a su archivo .agent.md en GitHub | ✅ |

**Criterios de aceptación**:
- [ ] 5 capas renderizadas (UI, Backend, Sistema, Meta, Bridges)
- [ ] 36 agentes visibles
- [ ] Handoffs accesibles

---

### SCRIPT-1.11.0-S05 — Guía de Interacción (Nueva Sección)
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T021 | Crear sección "💬 Cómo Interactuar" | ✅ |
| T022 | Explicar concepto de handoffs con diagrama | ✅ |
| T023 | Explicar concepto de prompts con ejemplos | ✅ |
| T024 | Tabla resumen: "Si quieres X, invoca @Y con prompt Z" | ✅ |
| T025 | Añadir bloque de código con ejemplos de invocación | ✅ |

**Ejemplo de tabla**:
| Quiero... | Invoco a... | Prompt sugerido |
|-----------|-------------|-----------------|
| Redactar un capítulo | @aleph | "Redacta capítulo 3 sobre vivienda" |
| Auditar evidencia | @blueflag | "Audita las afirmaciones de este texto" |
| Crear un agente | @plugin_ox_agentcreator | "Crea un agente basado en yellowflag" |
| Publicar en web | @plugin_ox_ghpages | "Publica docs/periodico.md" |

**Criterios de aceptación**:
- [ ] Diagrama de handoffs visible
- [ ] Tabla de 10+ ejemplos
- [ ] Bloques de código copiables

---

### SCRIPT-1.11.0-S06 — Publicación vía GH-Pages
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T026 | Validar localmente con `bundle exec jekyll serve` | ⏳ |
| T027 | Verificar que no hay errores Liquid | ⏳ |
| T028 | Actualizar `ARCHIVO/PLUGINS/GH_PAGES/published/manifest.json` | ⏳ |
| T029 | Commit según protocolo DevOps | ⏳ |
| T030 | Verificar despliegue en GitHub Actions | ⏳ |

**Commit propuesto**:
```
feat(ghpages/ecosistema): rediseñar página Agentes como Ecosistema

- Renombrar agentes.md → ecosistema.md
- Añadir galería de 14 submódulos
- Añadir galería de 18 plugins (8 operativos + 10 borrador)
- Actualizar galería de 36 agentes (5 capas)
- Añadir guía de interacción (handoffs, prompts)
- Actualizar navegación en index.md

refs #SCRIPT-1.11.0
```

**Criterios de aceptación**:
- [ ] Página visible en https://escrivivir-co.github.io/aleph-scriptorium/ecosistema/
- [ ] Sin errores en GitHub Actions
- [ ] Manifest actualizado

---

## Métricas SCRIPT-1.11.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 6 |
| Tasks totales | 30 |
| Puntos totales | 21 |
| Prioridad Must | 5 stories (18 pts) |
| Prioridad Should | 1 story (3 pts) |
| Completadas | **6** (S01-S06) |
| % Avance | **100%** 🎉 |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Plugin GH-Pages | ✅ Instalado | Para publicación |
| Jekyll bundle | ✅ Configurado | docs/Gemfile |
| registry.json | ✅ Actualizado | 18 plugins |
| git submodule status | ✅ | 14 submódulos |

---

## Diseño Visual (Boceto)

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  🧬 EL ECOSISTEMA ALEPH                                      │  │
│  │                                                               │  │
│  │     [Submódulos]  →  [Plugins]  →  [Agentes]  →  [Tú]        │  │
│  │         14            18            36                        │  │
│  │                                                               │  │
│  │  "De la infraestructura a la interfaz: cómo trabajan para ti"│  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ═══════════════════════════════════════════════════════════════   │
│                                                                     │
│  📦 INFRAESTRUCTURA (14 Submódulos)                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│  │Extension│ │MCP Zeus │ │AS-Utils │ │ AS-Gym  │  ...              │
│  │ TypeScript│ Next.js  │ Node.js  │TypeScript│                   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                   │
│                                                                     │
│  ═══════════════════════════════════════════════════════════════   │
│                                                                     │
│  🔌 PLUGINS                                                         │
│  ┌─ Operativos (8) ─────────────────────────────────────────────┐  │
│  │ [ARG Board] [Enciclopedia] [GH-Pages] [Foro Scraper] ...     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌─ Borradores (10) ────────────────────────────────────────────┐  │
│  │ [Network] [Novelist] [Blockly] [Wire Editor] ...              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ═══════════════════════════════════════════════════════════════   │
│                                                                     │
│  🐂 AGENTES (36 total)                                              │
│  [🟢 UI] [🔵⚫🔴🟡🟠 Backend] [⚪ Sistema] [⚙️ Meta] [🔌 Bridges]  │
│                                                                     │
│  ═══════════════════════════════════════════════════════════════   │
│                                                                     │
│  💬 CÓMO INTERACTUAR                                                │
│  | Si quieres...        | Invoca a...         | Ejemplo          | │
│  |----------------------|---------------------|------------------| │
│  | Redactar capítulo    | @aleph              | @aleph cap 3     | │
│  | Auditar evidencia    | @blueflag           | @blueflag audita | │
│  | Crear agente         | @plugin_ox_agent... | ...              | │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## Changelog SCRIPT-1.11.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear épica SCRIPT-1.11.0 | @scrum |
| 2025-12-24 | Definir 6 stories, 30 tasks | @scrum |
| 2025-12-24 | Implementar S01-S05: crear ecosistema.md con 3 galerías + guía | @aleph |
| 2025-12-24 | Actualizar navegación index.md (card Ecosistema) | @aleph |
| 2025-12-24 | Crear redirect /agentes/ → /ecosistema/ | @aleph |

---

# Épica: SCRIPT-1.13.0 — Índices DRY y Agente Lucas

**Objetivo**: Crear índices de navegación separados para visión funcional (@aleph) y técnica (@ox), y un agente Lucas que combine ambas perspectivas como Scrum Master del Índice.

**Estado**: ✅ Completada

**Fecha**: 2025-12-24 (Nochebuena)  
**Rama de trabajo**: `fc1`

---

## Contexto

### El problema

Los agentes @aleph y @ox tienen documentación dispersa:
- @aleph: Orientado a usuarios, necesita un frontal funcional ("qué puedo hacer")
- @ox: Orientado a Scrum team, necesita un frontal técnico ("cómo está construido")
- No hay un agente que valide coherencia DRY entre ambas visiones

### La solución

1. **Funcional.md**: Índice para usuarios (capacidades, flujos, invocaciones)
2. **Tecnico.md**: Índice para equipo técnico (arquitectura, ontología, checklists)
3. **Agente Lucas**: Scrum Master que mantiene coherencia entre índices

---

## Stories

### SCRIPT-1.13.0-S01 — Índice Funcional (Aleph)
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear ARCHIVO/DEVOPS/Funcional.md | ✅ |
| T002 | Documentar 5 capacidades principales | ✅ |
| T003 | Documentar agentes por capa (UI, Backend, Sistema, Plugins, Meta) | ✅ |
| T004 | Documentar 4 flujos principales (redacción, auditoría, extracción, publicación) | ✅ |
| T005 | Documentar memoria ARCHIVO y ejemplos de invocación | ✅ |

**Definition of Done**: Usuario puede navegar desde Funcional.md a cualquier capacidad.

---

### SCRIPT-1.13.0-S02 — Índice Técnico (Ox)
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T006 | Crear ARCHIVO/DEVOPS/Tecnico.md | ✅ |
| T007 | Documentar arquitectura de 5 capas con diagrama | ✅ |
| T008 | Documentar ontología .github/ (6 categorías) | ✅ |
| T009 | Documentar sistema de plugins (18) y submódulos (14) | ✅ |
| T010 | Documentar flujo DevOps y checklists de validación | ✅ |

**Definition of Done**: Scrum team puede navegar desde Tecnico.md a cualquier componente.

---

### SCRIPT-1.13.0-S03 — Agente Lucas (Scrum Master del Índice)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Crear recipe lucas.recipe.json (base: aleph + ox) | ✅ |
| T012 | Crear agents/created/lucas.agent.md con 8 handoffs | ✅ |
| T013 | Definir 5 tests de coherencia (DRY, sincronización, commits) | ✅ |
| T014 | Crear ELENCO/lucas/lucas.agent.md (ficha de personaje) | ✅ |
| T015 | Registrar en actores.json con arquetipo MENTOR | ✅ |
| T016 | Añadir a obras hola_mundo y camino_del_tarotista | ✅ |
| T017 | Registrar operaciones en creation-log.json | ✅ |
| T018 | Corregir JSON malformado en creation-log.json | ✅ |

**Definition of Done**: Lucas desplegado en Teatro ARG, invocable desde ambas obras.

---

## Métricas SCRIPT-1.13.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 3 |
| Tasks totales | 18 |
| Puntos totales | 11 |
| Prioridad Must | 3 stories (11 pts) |
| Completadas | **3** |
| % Avance | **100%** 🎉 |

---

## Entregables

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| [ARCHIVO/DEVOPS/Funcional.md](ARCHIVO/DEVOPS/Funcional.md) | Índice para usuarios | ✅ |
| [ARCHIVO/DEVOPS/Tecnico.md](ARCHIVO/DEVOPS/Tecnico.md) | Índice para Scrum team | ✅ |
| [recipes/lucas.recipe.json](ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/lucas.recipe.json) | Receta de Lucas | ✅ |
| [agents/created/lucas.agent.md](ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/lucas.agent.md) | Agente principal | ✅ |
| [ELENCO/lucas/](ARCHIVO/DISCO/TALLER/ELENCO/lucas/) | Ficha de personaje | ✅ |

---

## Archivos Actualizados

| Archivo | Cambio |
|---------|--------|
| actores.json | Entrada `lucas` añadida |
| obras.json | Lucas en hola_mundo y camino_del_tarotista |
| creation-log.json | 2 entradas + corrección JSON |

---

## Características de Lucas

| Campo | Valor |
|-------|-------|
| **Arquetipo** | MENTOR |
| **Rol** | Scrum Master del Índice |
| **Agentes base** | @aleph (funcional) + @ox (técnico) |
| **Fuente datos** | ARCHIVO/DEVOPS/ |
| **Obras** | hola_mundo, camino_del_tarotista |

### Capacidades

1. Validar ediciones de índice (Funcional.md, Tecnico.md)
2. Mantener coherencia DRY entre visión funcional y técnica
3. Actuar como oráculo de commits
4. Auditar sincronización índice ↔ codebase
5. Guiar dónde documentar información nueva

### Tests

| Test | Pregunta |
|------|----------|
| coherencia_funcional_tecnico | ¿Ambos índices reflejan la misma realidad? |
| dry_violation | ¿Hay duplicación entre índices? |
| indice_desactualizado | ¿El índice menciona algo que ya no existe? |
| archivo_huerfano | ¿Hay archivos no mencionados en ningún índice? |
| commit_sin_trazabilidad | ¿El commit sigue protocolo DevOps? |

---

## Pendientes

- **Avatar**: ✅ `ARCHIVO/DISCO/TALLER/ELENCO/lucas/avatar.png` (256×256 creado)

---

## Changelog SCRIPT-1.13.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear épica SCRIPT-1.13.0 | @scrum |
| 2025-12-24 | Crear Funcional.md y Tecnico.md (S01, S02) | @aleph |
| 2025-12-24 | Crear agente Lucas y desplegar en Teatro (S03) | @aleph |
| 2025-12-24 | Corregir creation-log.json y cerrar épica | @aleph |

---

# Épica: SCRIPT-1.14.0 — Agente Índice (@indice)

**Objetivo**: Crear un agente `@indice` integrado en `.github/agents/` que sirva como "portero" del proyecto, consultado antes de cada intervención para determinar qué leer. Gemelo funcional del personaje Lucas, mantiene los índices `Funcional.md` y `Tecnico.md` como única fuente de verdad DRY.

**Estado**: ✅ Completada

**Fecha inicio**: 2025-12-24  
**Fecha cierre**: 2025-01-01
**Rama de trabajo**: `fc1`  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/AGENTE_INDICE/conversacion-po-sm.md`  
**Backlog borrador**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/AGENTE_INDICE/01_backlog-borrador.md`

---

## Contexto

### El problema

Los agentes @aleph y @ox no tienen un "mapa" rápido del proyecto:
- Cada intervención requiere exploración
- No hay validación de coherencia índice ↔ codebase
- Los índices pueden desincronizarse silenciosamente

### La solución

Crear `@indice` que:
1. Sea consultado ANTES de cada intervención
2. Mantenga `Funcional.md` y `Tecnico.md` actualizados
3. Ejecute validación pre-commit (warning no bloqueante)
4. Combine visión @aleph (usuario) + @ox (técnica)

### Arquitectura

```
.github/
├── agents/
│   └── indice.agent.md          # ✅ CREADO
├── prompts/
│   ├── commit-message.prompt.md # ✅ MODIFICADO (Paso 2.5)
│   ├── indice-consultar.prompt.md   # ✅ CREADO
│   ├── indice-actualizar.prompt.md  # ✅ CREADO
│   └── indice-validar.prompt.md     # ✅ CREADO
├── instructions/
│   └── indice-dry.instructions.md   # ✅ CREADO
└── copilot-instructions.md      # ✅ MODIFICADO (§8)

ARCHIVO/DEVOPS/
├── Funcional.md                 # Fuente de verdad (usuario)
└── Tecnico.md                   # Fuente de verdad (técnico)
```

---

## Stories

### SCRIPT-1.14.0-S01 — Agente Índice Base
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/agents/indice.agent.md` con frontmatter | ✅ |
| T002 | Definir 8 handoffs (consultar, actualizar, validar por índice) | ✅ |
| T003 | Documentar relación gemelo con personaje Lucas | ✅ |
| T004 | Definir 5 tests de coherencia | ✅ |
| T005 | Añadir sección "Flujo de consulta" con ejemplos | ✅ |
| T006 | Añadir sección "Contrato DRY" | ✅ |

---

### SCRIPT-1.14.0-S02 — Instrucciones DRY
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Crear `.github/instructions/indice-dry.instructions.md` | ✅ |
| T008 | Documentar estructura esperada de Funcional.md | ✅ |
| T009 | Documentar estructura esperada de Tecnico.md | ✅ |
| T010 | Definir reglas de actualización | ✅ |
| T011 | Definir applyTo: ARCHIVO/DEVOPS/*.md | ✅ |

---

### SCRIPT-1.14.0-S03 — Prompts del Índice
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Crear `indice-consultar.prompt.md` | ✅ |
| T013 | Crear `indice-actualizar.prompt.md` | ✅ |
| T014 | Crear `indice-validar.prompt.md` | ✅ |
| T015 | Documentar ejemplos de uso en cada prompt | ✅ |

---

### SCRIPT-1.14.0-S04 — Integración con Sistema
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T016 | Añadir handoff @indice en aleph.agent.md | ✅ |
| T017 | Actualizar ox.agent.md con @indice en índice | ✅ |
| T018 | Actualizar copilot-instructions.md con @indice | ✅ |
| T019 | Documentar en Tecnico.md | ✅ |

---

### SCRIPT-1.14.0-S05 — Integración Pre-Commit
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T020 | Añadir sección §8 en copilot-instructions.md | ✅ |
| T021 | Modificar commit-message.prompt.md: Paso 2.5 | ✅ |
| T022 | Implementar lógica de warning no bloqueante | ✅ |
| T023 | Definir formato de warning accionable | ✅ |
| T024 | Documentar flujo en indice-dry.instructions.md | ✅ |

---

## Métricas SCRIPT-1.14.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 5 |
| Tasks totales | 24 |
| Puntos totales | 18 |
| Prioridad Must | 5 stories (18 pts) |
| Completadas | **5** |
| % Avance | **100%** 🎉 |

---

## Entregables

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| `.github/agents/indice.agent.md` | Agente principal | ✅ |
| `.github/instructions/indice-dry.instructions.md` | Contrato DRY | ✅ |
| `.github/prompts/indice-consultar.prompt.md` | Consulta rápida | ✅ |
| `.github/prompts/indice-actualizar.prompt.md` | Sincronización | ✅ |
| `.github/prompts/indice-validar.prompt.md` | Pre-commit | ✅ |

---

## Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `aleph.agent.md` | Handoffs @indice añadidos |
| `ox.agent.md` | @indice en índice maestro |
| `copilot-instructions.md` | Sección §8 añadida |
| `commit-message.prompt.md` | Paso 2.5 añadido |
| `Tecnico.md` | @indice en capa Meta |

---

## Relación @indice ↔ lucas

```
@indice (agente .github/)  ←→  lucas (personaje Teatro)
         │                           │
         └───── MISMA FUENTE ────────┘
               ARCHIVO/DEVOPS/
            Funcional.md + Tecnico.md
```

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| SCRIPT-1.13.0 (Lucas + Índices) | ✅ Completada |
| Funcional.md | ✅ Creado |
| Tecnico.md | ✅ Creado |
| Personaje Lucas | ✅ Desplegado |

---

## Changelog SCRIPT-1.14.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear conversación PO-SM | @scrum |
| 2025-12-24 | Añadir Fase 6: Integración Pre-Commit | @scrum |
| 2025-12-24 | Generar backlog borrador (5 stories, 24 tasks) | @scrum |
| 2025-12-24 | Aprobar y publicar épica | @scrum |
| 2025-01-01 | Implementar S01-S05 completas | @aleph |
| 2025-01-01 | Cerrar épica al 100% | @aleph |

---

# Épica: SCRIPT-1.15.0 — Optimización de Settings para Plugins

**Objetivo**: Mejorar el protocolo de PLUGINS.md para que los plugins se instalen desactivados por defecto en `.vscode/settings.json`, evitando sobrecarga del sistema. Incluir FAQ, comandos de activación/desactivación y sistema de avisos por umbrales.

**Estado**: ✅ Completada

**Fecha inicio**: 2025-01-02  
**Fecha cierre**: 2025-01-02  
**Rama de trabajo**: `fc1`  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/PLUGIN_SETTINGS_OPTIMIZER/conversacion-po-sm.md`

---

## Contexto

### El problema

Los plugins se instalaban con `true` por defecto en settings.json:
- Todos los prompts e instructions de todos los plugins quedaban indexados
- VS Code perdía velocidad al autocompletar con muchos plugins activos
- Los usuarios no sabían que podían desactivar plugins sin desinstalarlos
- No había FAQ para problemas comunes ("no me aparecen los prompts")

### La solución

1. **Instalación con `false`**: Los plugins nuevos se añaden desactivados en settings
2. **FAQ**: Documentar problemas comunes y soluciones en plugin-manager
3. **Comandos**: Añadir `activar`, `desactivar` y `status` al PluginManager
4. **Umbrales**: Sistema de avisos cuando hay demasiados plugins activos

### Distinción registry vs settings

| Archivo | Campo | Controla |
|---------|-------|----------|
| `registry.json` | `enabled` | Si el plugin está **funcional** (agentes disponibles) |
| `settings.json` | `true/false` | Si los prompts/instructions son **visibles** en Chat |

---

## Stories

### SCRIPT-1.15.0-S01 — Instalación por Defecto con false
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Modificar plugin-install.prompt.md paso 5: cambiar true → false | ✅ |
| T002 | Añadir mensaje post-instalación explicando que está desactivado | ✅ |
| T003 | Actualizar plugin-manager.agent.md con nuevo comportamiento | ✅ |
| T004 | Actualizar PLUGINS.md sección 2.3 con nota SCRIPT-1.15.0 | ✅ |

---

### SCRIPT-1.15.0-S02 — FAQ de Resolución de Problemas
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Crear sección "FAQ de Resolución de Problemas" en plugin-manager | ✅ |
| T006 | FAQ: "No me aparecen los prompts del plugin X" | ✅ |
| T007 | FAQ: "El chat está muy lento al autocompletar" | ✅ |
| T008 | FAQ: "¿Cómo sé qué plugins tengo activos?" | ✅ |
| T009 | FAQ: "¿Por qué los plugins nuevos no se activan automáticamente?" | ✅ |
| T010 | FAQ: "¿Cuáles son los plugins recomendados para empezar?" | ✅ |

---

### SCRIPT-1.15.0-S03 — Handoffs de Activación/Desactivación
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Añadir handoff "Activar plugin en settings" | ✅ |
| T012 | Añadir handoff "Desactivar plugin en settings" | ✅ |
| T013 | Documentar lógica de activación (settings.json) | ✅ |
| T014 | Documentar lógica de desactivación (settings.json) | ✅ |
| T015 | Distinguir de "Activar/Desactivar plugin en registry" | ✅ |
| T016 | Añadir tabla explicativa en plugin-manager | ✅ |

---

### SCRIPT-1.15.0-S04 — Sistema de Avisos por Umbrales
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Definir umbrales: 0-3 óptimo, 4-6 aceptable, 7-10 cargado, 11+ sobrecargado | ✅ |
| T018 | Crear tabla de umbrales con iconos y mensajes | ✅ |
| T019 | Documentar en sección "Gestión de Settings" | ✅ |
| T020 | Añadir mensajes específicos por nivel | ✅ |
| T021 | Documentar en PLUGINS.md | ✅ |

---

### SCRIPT-1.15.0-S05 — Comando Status
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T022 | Añadir handoff "Ver status de plugins" | ✅ |
| T023 | Documentar formato de output del comando | ✅ |
| T024 | Incluir: plugins en registry, activos en settings, nivel, lista, recomendación | ✅ |

---

### SCRIPT-1.15.0-S06 — Documentación y Publicación
**Puntos**: 1  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T025 | Actualizar PLUGINS.md sección 2.3 completa | ✅ |
| T026 | Referenciar FAQ desde PLUGINS.md | ✅ |
| T027 | Publicar épica en BACKLOG-SCRIPTORIUM.md | ✅ |
| T028 | Marcar épica como completada | ✅ |

---

## Métricas SCRIPT-1.15.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 6 |
| Tasks totales | 28 |
| Puntos totales | 18 |
| Prioridad Must | 5 stories (13 pts) |
| Prioridad Should | 1 story (5 pts) |
| Completadas | **6** |
| % Avance | **100%** 🎉 |

---

## Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `.github/prompts/plugin-install.prompt.md` | Paso 5: default `false`, mensaje post-instalación |
| `.github/agents/plugin-manager.agent.md` | Handoffs, FAQ, status, umbrales, tabla distinción |
| `.github/PLUGINS.md` | Sección 2.3 actualizada con SCRIPT-1.15.0 |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| SCRIPT-1.5.0 (Plugin Discovery) | ✅ Completada |
| Plugin Manager | ✅ Funcional |
| .vscode/settings.json | ✅ Configurado |

---

## Changelog SCRIPT-1.15.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-01-02 | Crear conversación PO-SM | @scrum |
| 2025-01-02 | Generar backlog borrador (6 stories, 28 tasks) | @scrum |
| 2025-01-02 | Implementar S01-S06 completas | @aleph |
| 2025-01-02 | Cerrar épica al 100% | @aleph |

---

# Épica: SCRIPT-1.16.0 — Índice SPLASH y Vinculación GH-Pages

**Objetivo**: Crear un índice estructural del sitio web (`docs/`) que permita orquestar refactorizaciones, vincular el plugin GH-Pages con este índice y generar warnings en commits cuando haya discrepancias.

**Estado**: ✅ Completada

**Fecha inicio**: 2025-12-24  
**Fecha cierre**: 2025-12-24  
**Rama de trabajo**: `fc1`  
**Backlog borrador**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/SPLASH_INDEX/01_backlog-borrador.md`

---

## Contexto

### El problema

El plugin GH-Pages no tenía un índice estructural que:
- Documentara la arquitectura del sitio web
- Sirviera de mapa para refactorizaciones
- Se mantuviera sincronizado con cambios en `docs/`
- Generara warnings en commits cuando hubiera discrepancias

### La solución

1. **Índice SPLASH**: `ARCHIVO/DISCO/SPLASH/index.md` — mapa técnico-funcional de `docs/`
2. **Vinculación**: Instrucciones del plugin GH-Pages referencian el índice
3. **Interceptación**: Prompts del plugin verifican coherencia antes de operar
4. **Warning en commits**: `commit-message.prompt.md` Paso 2.6 valida cambios en `docs/`
5. **Conexión con @indice**: @indice puede delegar a @GHPages para índice SPLASH

---

## Story: SCRIPT-1.16.0-S01 — Creación del Índice SPLASH
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `ARCHIVO/DISCO/SPLASH/index.md` con arquitectura Jekyll | ✅ |
| T002 | Documentar 8 secciones de index.md con líneas y clases CSS | ✅ |
| T003 | Mapear sistema CSS (variables, banderas, ubicaciones) | ✅ |
| T004 | Documentar páginas del sitio y operaciones | ✅ |

---

## Story: SCRIPT-1.16.0-S02 — Vinculación con Instrucciones GH-Pages
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Añadir sección "Índice SPLASH" en instrucciones | ✅ |
| T006 | Documentar flujo de consulta del índice | ✅ |
| T007 | Añadir regla: "Actualizar índice si se modifica estructura" | ✅ |
| T008 | Añadir referencia cruzada en §8 del índice SPLASH | ✅ |

---

## Story: SCRIPT-1.16.0-S03 — Interceptación de Operaciones
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T009 | Modificar `gh-pages-publish.prompt.md`: añadir paso de validación | ✅ |
| T010 | Documentar operaciones que requieren actualización del índice | ✅ |
| T011 | Crear lógica: si cambia estructura → sugerir actualizar índice | ✅ |

---

## Story: SCRIPT-1.16.0-S04 — Warning en Commit-Message
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Añadir "Paso 2.6: Validar índice SPLASH" en commit-message.prompt | ✅ |
| T013 | Definir criterios de warning (nuevas secciones, CSS, páginas) | ✅ |
| T014 | Documentar formato del warning (informativo, no bloqueante) | ✅ |
| T015 | Añadir sugerencia de actualización si hay discrepancia | ✅ |

---

## Story: SCRIPT-1.16.0-S05 — Actualización de Agente GHPages
**Puntos**: 2  
**Prioridad**: Should  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T016 | Añadir handoff "Consultar índice SPLASH" | ✅ |
| T017 | Añadir handoff "Actualizar índice SPLASH" | ✅ |

---

## Story: SCRIPT-1.16.0-S06 — Conexión con @indice
**Puntos**: 2  
**Prioridad**: Should  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T018 | Añadir handoff en @indice para delegar SPLASH a @GHPages | ✅ |
| T019 | Documentar relación entre índices DRY y SPLASH | ✅ |

---

## Métricas SCRIPT-1.16.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 6 |
| Tasks totales | 19 |
| Puntos totales | 18 |
| Prioridad Must | 4 stories (14 pts) |
| Prioridad Should | 2 stories (4 pts) |
| Completadas | **6** |
| % Avance | **100%** 🎉 |

---

## Entregables

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| `ARCHIVO/DISCO/SPLASH/index.md` | Índice estructural de docs/ | ✅ |
| `.github/plugins/gh-pages/instructions/gh-pages.instructions.md` | Sección "Índice SPLASH" | ✅ |
| `.github/plugins/gh-pages/prompts/gh-pages-publish.prompt.md` | Paso de validación SPLASH | ✅ |
| `.github/plugins/gh-pages/agents/ghpages.agent.md` | Handoffs SPLASH | ✅ |
| `.github/prompts/commit-message.prompt.md` | Paso 2.6 warning SPLASH | ✅ |
| `.github/agents/indice.agent.md` | Handoff delegación SPLASH | ✅ |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| Plugin GH-Pages | ✅ Instalado |
| @indice | ✅ Operativo |
| SCRIPT-1.14.0 (Agente Índice) | ✅ Completada |

---

## Changelog SCRIPT-1.16.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear índice SPLASH | @aleph |
| 2025-12-24 | Vincular con instrucciones GH-Pages | @aleph |
| 2025-12-24 | Añadir Paso 2.6 en commit-message.prompt | @aleph |
| 2025-12-24 | Añadir handoffs en GHPages | @aleph |
| 2025-12-24 | Conectar @indice con SPLASH | @aleph |
| 2025-12-24 | Publicar épica en backlog principal | @aleph |

---

# Épica: SCRIPT-1.17.0 — Índice README y Vinculación @indice

**Objetivo**: Crear un índice estructural del README.md que permita orquestar refactorizaciones, vincular con el agente @indice y generar warnings en commits cuando cambios en el codebase deberían reflejarse en el README.

**Estado**: ✅ Completada

**Fecha inicio**: 2025-12-24  
**Fecha cierre**: 2025-12-24  
**Rama de trabajo**: `fc1`  
**Patrón seguido**: SCRIPT-1.16.0 (Índice SPLASH)

---

## Contexto

### El problema

El README.md es el punto de entrada público del proyecto, pero:
- No hay índice estructural que documente sus secciones
- Los cambios en plugins, agentes o submódulos no generan warnings
- Es fácil que el README quede desactualizado respecto al codebase

### La solución

1. **Índice README**: `ARCHIVO/DISCO/README/index.md` — mapa estructural del README.md
2. **Vinculación**: @indice puede consultar y actualizar este índice
3. **Warning en commits**: `commit-message.prompt.md` Paso 2.7 valida cambios que afectan al README
4. **Criterios claros**: Definir qué cambios requieren actualización del README

---

## Story: SCRIPT-1.17.0-S01 — Creación del Índice README
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `ARCHIVO/DISCO/README/index.md` con estructura del README | ✅ |
| T002 | Documentar 12 secciones del README con líneas y dependencias | ✅ |
| T003 | Mapear fuentes de verdad (registry.json, .gitmodules, package.json) | ✅ |
| T004 | Documentar operaciones de refactorización | ✅ |

---

## Story: SCRIPT-1.17.0-S02 — Vinculación con @indice
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Añadir handoff "Consultar índice README" en indice.agent.md | ✅ |
| T006 | Añadir handoff "Actualizar índice README" en indice.agent.md | ✅ |

---

## Story: SCRIPT-1.17.0-S03 — Warning en Commit-Message
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Añadir "Paso 2.7: Validar índice README" en commit-message.prompt | ✅ |
| T008 | Definir criterios de warning (plugins, submódulos, agentes, versión) | ✅ |
| T009 | Documentar formato del warning (informativo, no bloqueante) | ✅ |
| T010 | Añadir sugerencia de actualización si hay discrepancia | ✅ |

---

## Story: SCRIPT-1.17.0-S04 — Documentación y Publicación
**Puntos**: 1  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Añadir referencia cruzada en §8 del índice README | ✅ |
| T012 | Publicar épica en BACKLOG-SCRIPTORIUM.md | ✅ |

---

## Métricas SCRIPT-1.17.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 4 |
| Tasks totales | 12 |
| Puntos totales | 9 |
| Prioridad Must | 4 stories (9 pts) |
| Completadas | **4** |
| % Avance | **100%** 🎉 |

---

## Entregables

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| `ARCHIVO/DISCO/README/index.md` | Índice estructural de README.md | ✅ |
| `.github/agents/indice.agent.md` | Handoffs README añadidos | ✅ |
| `.github/prompts/commit-message.prompt.md` | Paso 2.7 warning README | ✅ |

---

## Criterios de Warning

| Archivo modificado | Sección README afectada |
|--------------------|-------------------------|
| `registry.json` (nuevo plugin) | Plugins, Plugin Bridges, contadores |
| `.gitmodules` (nuevo submódulo) | Submódulos, contadores |
| `.github/agents/*.agent.md` (nuevo) | Agentes, contadores |
| `package.json` (versión) | Badges, Estado |
| `workspace-config.json` (rama) | Estado |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| @indice | ✅ Operativo |
| SCRIPT-1.14.0 (Agente Índice) | ✅ Completada |
| SCRIPT-1.16.0 (Patrón SPLASH) | ✅ Completada |

---

## Changelog SCRIPT-1.17.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear índice README | @aleph |
| 2025-12-24 | Añadir handoffs en @indice | @aleph |
| 2025-12-24 | Añadir Paso 2.7 en commit-message.prompt | @aleph |
| 2025-12-24 | Publicar épica en backlog principal | @aleph |

---

# Épica: SCRIPT-1.18.0 — Cobertura y Homogeneización de Índices

**Objetivo**: Refactorizar los índices SPLASH y README para mejorar cobertura, homogeneizar estilo y establecer referencias a DEVOPS como fuente de verdad.

**Estado**: 🆕 Nueva (Feature Cycle 1)

**Fecha inicio**: 2025-12-24  
**Rama de trabajo**: `fc1`  
**Backlog borrador**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/INDICES_COBERTURA/`

---

## Arquitectura de Índices

```
┌─────────────────────────────────────────────────────────────────┐
│              DEVOPS (Funcional.md + Tecnico.md)                 │
│            ═══════════════════════════════════                   │
│                 ÚNICA FUENTE DE VERDAD DEL SISTEMA               │
│                        (NO SE MODIFICA)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────────────────┐    ┌──────────────────────────┐  │
│   │     ÍNDICE SPLASH        │    │     ÍNDICE README        │  │
│   │    (Mapa de docs/)       │    │   (Mapa de README.md)    │  │
│   │                          │    │                          │  │
│   │  Cobertura: Funcional    │    │  Cobertura: Técnica      │  │
│   │  Agente: @GHPages        │    │  Agente: @indice         │  │
│   │  Refactoriza: Web        │    │  Refactoriza: README.md  │  │
│   └──────────────────────────┘    └──────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Principios

1. **DEVOPS es intocable**: Funcional.md y Tecnico.md son la fuente de verdad
2. **SPLASH describe cómo editar docs/**: Mapa para @GHPages
3. **README describe cómo sincronizar README.md**: Mapa para @indice

---

## Stories

### SCRIPT-1.18.0-S01: Refactorizar SPLASH
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Añadir ecosistema.md a tabla de páginas (§4) | ✅ |
| T002 | Homogeneizar checklist §6 al formato estándar | ✅ |
| T003 | Mover TODOs §7 a épica formal | ✅ |
| T004 | Añadir sección Referencias con enlace a DEVOPS | ✅ |

**Definition of Done**:
- [x] SPLASH referencia DEVOPS como fuente de verdad
- [x] Checklist usa formato tabla estándar
- [x] No hay TODOs sueltos

---

### SCRIPT-1.18.0-S02: Refactorizar README Index
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Simplificar §4: quitar duplicados, referenciar DEVOPS | ✅ |
| T006 | Homogeneizar checklist §7 al formato estándar | ✅ |
| T007 | Añadir sección Referencias con enlace a DEVOPS | ✅ |

**Definition of Done**:
- [x] README index referencia DEVOPS como fuente de verdad
- [x] Checklist usa formato tabla estándar
- [x] §4 no duplica contadores de DEVOPS

---

### SCRIPT-1.18.0-S03: Validación y Cierre
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Ejecutar @indice para validar coherencia | ✅ |
| T009 | Verificar que GH-Pages compila sin errores | ✅ (GitHub Actions) |
| T010 | Actualizar README.md con cambios si aplica | ✅ |

**Definition of Done**:
- [x] @indice no reporta warnings
- [x] jekyll build pasa (vía GitHub Actions)
- [x] Commit generado

---

## Métricas SCRIPT-1.18.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 3 |
| Tasks totales | 10 |
| Puntos totales | 8 |
| Prioridad Must | 3 stories (8 pts) |
| Completadas | **3** |
| % Avance | **100%** 🎉 |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| DEVOPS/Funcional.md | ✅ Existe (no se modifica) |
| DEVOPS/Tecnico.md | ✅ Existe (no se modifica) |
| SPLASH/index.md | ✅ Existe (target de S01) |
| README/index.md | ✅ Existe (target de S02) |
| @indice | ✅ Operativo |
| @GHPages | ✅ Operativo |

---

## Changelog SCRIPT-1.18.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear conversación PO-SM y análisis de cobertura | @scrum |
| 2025-12-24 | Crear backlog borrador fusionado | @scrum |
| 2025-12-24 | Aprobar y publicar épica | @scrum |
| 2025-12-24 | Implementar S01-S03: refactorizar índices SPLASH y README | @aleph |
| 2025-12-24 | Actualizar README.md y docs/ con contadores corregidos (19 plugins, 31 agentes) | @aleph |
| 2025-12-24 | Cerrar épica al 100% | @aleph |
| 2025-12-24 | Refactorizar README.md: 366→112 líneas (-69%), eliminar repeticiones | @aleph |
| 2025-12-24 | Actualizar índice README/index.md con nueva estructura | @aleph |
| 2025-12-24 | Crear épica SCRIPT-1.19.0: Coherencia GH-Pages | @scrum |

---

# Épica: SCRIPT-1.19.0 — Coherencia Funcional GH-Pages

**Objetivo**: Aplicar principios de diseño DRY a las páginas web (docs/) para eliminar redundancias, distribuir contenido correctamente y lograr coherencia entre index, ecosistema, archivo, roadmap, leeme y acerca.

**Estado**: 🔄 En Progreso

**Fecha inicio**: 2025-12-24  
**Rama de trabajo**: `fc1`  
**Principios aplicados**: Los mismos de SCRIPT-1.18.0 (README compacto)

---

## Diagnóstico

### Estado Actual (líneas)

| Página | Líneas | Problema principal |
|--------|--------|-------------------|
| `ecosistema.md` | 1283 | Demasiado larga, CSS inline excesivo |
| `roadmap.md` | 1006 | Galería de fotos muy larga |
| `archivo.md` | 747 | Repite estructura que está en DEVOPS |
| `leeme.md` | 574 | Tablas repetidas, información duplicada |
| `fundacion.md` | 278 | OK, pero puede simplificarse |
| `acerca.md` | 239 | Estilos inline, información redundante |
| `index.md` | 204 | OK, bien estructurada |
| `periodico.md` | 198 | OK |
| `teatro.md` | 174 | OK |

### Principios de Coherencia

| Principio | Descripción |
|-----------|-------------|
| **DRY** | Cada dato aparece UNA vez |
| **Responsabilidad única** | Cada página tiene UN propósito claro |
| **CSS externo** | Estilos en main.css, no inline |
| **Tablas compactas** | Máximo 10 filas, enlace a detalle |
| **Links no contenido** | Referencia a fuentes, no copia |

### Distribución Funcional Propuesta

| Página | Responsabilidad | NO incluir |
|--------|-----------------|------------|
| `index.md` | Navegación rápida, status | Detalles de plugins/agentes |
| `ecosistema.md` | Catálogo visual de capacidades | CSS inline extenso |
| `archivo.md` | Mapa de navegación ARCHIVO/ | Contenido completo |
| `roadmap.md` | Estado sprints, próximos pasos | Galería completa de fotos |
| `leeme.md` | Tutorial de instalación | Tablas repetidas |
| `acerca.md` | Filosofía, licencia | Estilos inline |

---

## Stories

### SCRIPT-1.19.0-S01: Refactorizar ecosistema.md
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Mover CSS inline a main.css | ✅ |
| T002 | Colapsar galería submódulos (tabla compacta + link a detalle) | ✅ |
| T003 | Colapsar galería plugins (tabla compacta + link a PLUGINS.md) | ✅ |
| T004 | Colapsar galería agentes (tabla compacta por capa) | ✅ |
| T005 | Reducir a ~400 líneas máximo | ✅ |

**Resultado**: 1284 → 178 líneas (-86%)

---

### SCRIPT-1.19.0-S02: Refactorizar archivo.md
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T006 | Mover CSS inline a main.css | ✅ |
| T007 | Simplificar a mapa de navegación (no contenido) | ✅ |
| T008 | Enlazar a DEVOPS/Funcional.md y Tecnico.md | ✅ |
| T009 | Reducir a ~200 líneas | ✅ |

**Resultado**: 748 → 123 líneas (-84%)

---

### SCRIPT-1.19.0-S03: Refactorizar leeme.md
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Eliminar tablas de plataformas repetidas | ✅ |
| T011 | Consolidar Quick Start en sección única | ✅ |
| T012 | Reducir a ~250 líneas | ✅ |

**Resultado**: 575 → 175 líneas (-70%)

---

### SCRIPT-1.19.0-S04: Refactorizar roadmap.md
**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T013 | Mover CSS a main.css | ✅ |
| T014 | Colapsar galería de fotos (últimas 3 + link a archivo) | ✅ |
| T015 | Simplificar secciones de sprints | ✅ |
| T016 | Reducir a ~400 líneas | ✅ |

**Resultado**: 1006 → 93 líneas (-91%)

---

### SCRIPT-1.19.0-S05: Refactorizar acerca.md
**Effort**: 2 pts  
**Prioridad**: Should  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017 | Mover estilos inline a main.css | ✅ |
| T018 | Simplificar contenido | ✅ |
| T019 | Reducir a ~120 líneas | ✅ |

**Resultado**: 239 → 69 líneas (-71%)

---

### SCRIPT-1.19.0-S06: Actualizar SPLASH Index
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T020 | Actualizar §4 con nuevos conteos de líneas | ✅ |
| T021 | Añadir §8 Principios de Coherencia | ✅ |
| T022 | Documentar distribución funcional | ✅ |

---

### SCRIPT-1.19.0-S07: Validación y Cierre
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: 🔄 En Progreso

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T023 | Ejecutar `bundle exec jekyll build` sin errores | ⏳ |
| T024 | Verificar responsive (320/768/1200px) | ⏳ |
| T025 | Commit según protocolo DevOps | ⏳ |

---

## Métricas SCRIPT-1.19.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 7 |
| Tasks totales | 25 |
| Effort total | 20 pts |
| Prioridad Must | 5 stories (15 pts) |
| Prioridad Should | 2 stories (5 pts) |
| Completadas | **6** |
| En progreso | 1 (S07) |
| % Avance | **86%** |

---

## Targets de Reducción

| Página | Antes | Target | Reducción |
|--------|-------|--------|-----------|
| ecosistema.md | 1283 | 400 | -69% |
| roadmap.md | 1006 | 400 | -60% |
| archivo.md | 747 | 200 | -73% |
| leeme.md | 574 | 250 | -56% |
| acerca.md | 239 | 120 | -50% |
| **Total** | **3849** | **1370** | **-64%** |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| SPLASH/index.md | ✅ Base para ediciones |
| main.css | ✅ Target de CSS consolidado |
| @GHPages | ✅ Plugin operativo |
| SCRIPT-1.18.0 | ✅ Completada (principios establecidos) |

---

## Changelog SCRIPT-1.19.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear épica con diagnóstico y 7 stories | @scrum |
| 2025-12-24 | Implementar S01-S06: refactorizar 5 páginas (-83% total) | @aleph |
| 2025-12-24 | Actualizar SPLASH index con resultados y principios | @aleph |
| 2025-12-24 | Corregir navegación: Agentes → Ecosistema en _config.yml | @aleph |

---

# Épica: SCRIPT-1.20.0 — FloveEditor (Template Ontológico CONFLUENTISM)

**Objetivo**: Crear un plugin para diseñar ontologías basadas en el paradigma **CONFLUENTISM** de Flove.org. Estructura jerárquica de 3 niveles (Fuzzy→PsicoSocial→Freedom) con exportación a JSON Schema, TypeScript y Zod. Integra 3 submódulos externos: FloveDocs, Metamodel (UFO), MMCO (OCMF).

**Estado**: 🔄 En Progreso (Feature Cycle 1 - 30% completado)

**Fecha inicio**: 2025-01-02  
**Rama de trabajo**: `fc1`  
**Submódulo**: `OnthologyEditor` (rama `integration/beta/scriptorium`)  
**Backlog borrador**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/FLOVE_EDITOR/`

---

## Contexto

### El problema

El Scriptorium tiene múltiples plugins que requieren **estructuras de datos tipadas** (TypedPrompting, AGENT_CREATOR, ARG_BOARD) pero:
- No hay un editor visual de ontologías
- Los schemas se crean manualmente sin validación
- No hay metodología para diseñar jerarquías conceptuales

### La solución

Integrar la ontología **Flove** como template metodológico con 3 marcos de validación:

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLOVE-EDITOR ECOSYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────┐   ┌───────────────┐   ┌───────────────┐    │
│  │  FloveDocs    │   │   Metamodel   │   │     MMCO      │    │
│  │  (Paradigma)  │   │   (UFO/FAIR)  │   │    (OCMF)     │    │
│  ├───────────────┤   ├───────────────┤   ├───────────────┤    │
│  │ Slides, Tablas│   │ 5 capas       │   │ 7 niveles     │    │
│  │ 15+ Apps      │   │ Templates     │   │ Toy models    │    │
│  └───────────────┘   └───────────────┘   └───────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Fuentes de la ontología

| Fuente | URL | Estado |
|--------|-----|--------|
| flove.org | Sitio principal | ✅ Explorada |
| demos.flove.org/whole | Tabla de taxonomía | ✅ Capturada |
| Codeberg FloveDocs/Main | Documentación | ✅ Submódulo instalado |
| Codeberg metamodel | UFO/FAIR | ✅ Submódulo instalado |
| Codeberg MMCO | OCMF | ✅ Submódulo instalado |

---

## Story: SCRIPT-1.20.0-S01 — Estructura Base del Plugin
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear submódulo `OnthologyEditor` con README | ✅ |
| T002 | Crear `README-SCRIPTORIUM.md` con análisis Flove | ✅ |
| T003 | Crear estructura `.github/plugins/flove-editor/` | ✅ |
| T004 | Crear `manifest.md` con frontmatter YAML | ✅ |
| T005 | Crear `agents/flove-editor.agent.md` | ✅ |
| T006 | Crear `instructions/flove-editor.instructions.md` | ✅ |
| T007 | Crear 2 prompts base (crear-ontologia, exportar) | ✅ |

---

## Story: SCRIPT-1.20.0-S02 — Bridge y Registro
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Crear bridge `plugin_ox_floveeditor.agent.md` | ✅ |
| T009 | Actualizar `registry.json` con plugin flove-editor | ✅ |
| T010 | Registrar submódulo en `.gitmodules` | ✅ |

---

## Story: SCRIPT-1.20.0-S03 — Captura de Ontología Flove
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Crear `ARCHIVO/PLUGINS/FLOVE_EDITOR/` | ⏳ |
| T012 | Documentar los 10 campos de la ontología | ⏳ |
| T013 | Documentar las 4 capas (Substance, Fields, Paradigms, Apps) | ⏳ |
| T014 | Descargar FloveTables25.12.pdf | ⏳ |

---

## Story: SCRIPT-1.20.0-S04 — JSON Schema de Ontología
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T015 | Diseñar estructura base del schema | ⏳ |
| T016 | Definir tipo `FloveField` (10 campos) | ⏳ |
| T017 | Definir tipo `FloveParadigm` (6 paradigmas) | ⏳ |
| T018 | Definir tipo `FloveApp` (7 aplicaciones) | ⏳ |
| T019 | Crear `flove-ontology.schema.json` | ⏳ |

---

## Story: SCRIPT-1.20.0-S05 — Exportadores (TypeScript/Zod)
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T020 | Crear prompt `exportar-typescript.prompt.md` | ⏳ |
| T021 | Crear prompt `exportar-zod.prompt.md` | ⏳ |
| T022 | Implementar lógica de conversión schema→TS | ⏳ |
| T023 | Implementar lógica de conversión schema→Zod | ⏳ |

---

## Story: SCRIPT-1.20.0-S06 — Integración TypedPrompting
**Puntos**: 3  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T024 | Crear prompt `instalar-en-typedprompting.prompt.md` | ⏳ |
| T025 | Documentar flujo FloveEditor → TypedPrompting | ⏳ |
| T026 | Crear ejemplo de ontología instalada | ⏳ |

---

## Story: SCRIPT-1.20.0-S07 — Integración AGENT_CREATOR
**Puntos**: 3  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T027 | Crear prompt `asignar-a-agente.prompt.md` | ⏳ |
| T028 | Añadir campo `ontology` al schema de recipes | ⏳ |
| T029 | Documentar flujo FloveEditor → AGENT_CREATOR | ⏳ |

---

## Story: SCRIPT-1.20.0-S08 — Documentación
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T030 | Publicar épica en BACKLOG-SCRIPTORIUM.md | ✅ |
| T031 | Crear `ARCHIVO/PLUGINS/FLOVE_EDITOR/README.md` | ⏳ |
| T032 | Actualizar copilot-instructions.md | ⏳ |
| T033 | Crear ejemplo de ontología YAML | ⏳ |

---

## Métricas SCRIPT-1.20.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 8 |
| Tasks totales | 33 |
| Puntos totales | 26 |
| Prioridad Must | 4 stories (10 pts) |
| Prioridad Should | 2 stories (10 pts) |
| Prioridad Could | 2 stories (6 pts) |
| Completadas | **2** (S01, S02) |
| % Avance | **30%** |

---

## Agentes Creados (SCRIPT-1.22.0)

Nota: Los agentes especializados se crearon en la épica relacionada SCRIPT-1.22.0:
- `flove-ox.agent.md` — Orquestador de submódulos
- `flovedocs.agent.md` — Índice FloveDocs  
- `metamodel.agent.md` — Índice UFO/FAIR
- `mmco.agent.md` — Índice OCMF

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo OnthologyEditor | ✅ Instalado | Rama integration/beta/scriptorium |
| Submódulo FloveDocs (nested) | ✅ Instalado | Documentación paradigma |
| Submódulo metamodel (nested) | ✅ Instalado | UFO/FAIR |
| Submódulo MMCO (nested) | ✅ Instalado | OCMF coherencia |
| Plugin TypedPrompting | ✅ Instalado | Target de S06 |
| Plugin AGENT_CREATOR | ✅ Instalado | Target de S07 |
| Ontología Flove (web) | ✅ Accesible | demos.flove.org |

---

## Changelog SCRIPT-1.20.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-01-02 | Crear conversación PO-SM en BACKLOG_BORRADORES/FLOVE_EDITOR/ | @scrum |
| 2025-01-02 | Generar backlog borrador (8 stories, 33 tasks) | @scrum |
| 2025-01-02 | Crear submódulo OnthologyEditor + plugin flove-editor (S01, S02) | @aleph |
| 2025-01-02 | Publicar épica en backlog principal | @aleph |
| 2025-12-26 | Instalar 3 submódulos nested: FloveDocs, metamodel, MMCO | @aleph |
| 2025-12-26 | Crear 5 agentes especializados (ver SCRIPT-1.22.0) | @aleph |
| 2025-12-26 | Consolidar con borradores MMCO y METAMODEL_COMPLIANCE | @scrum |

---

# Épica: SCRIPT-1.21.0 — Metamodel Compliance para FloveEditor

**Objetivo**: Integrar el metamodel de Talaia Digital (Codeberg) como framework de auditoría para asegurar que el plugin flove-editor produce ontologías certificables según estándares formales (UFO, FAIR, XAI).

**Estado**: 🔄 En Progreso (Feature Cycle 1 - 35% completado)

**Fecha inicio**: 2025-01-03  
**Rama de trabajo**: `fc1`  
**Submódulo**: `OnthologyEditor/metamodel` (https://codeberg.org/talaiadigital/metamodel)  
**Backlog borrador**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/METAMODEL_COMPLIANCE/`

---

## Contexto

### El problema

El plugin flove-editor (SCRIPT-1.20.0) diseña ontologías basadas en CONFLUENTISM pero:
- No hay validación formal contra estándares ontológicos
- No cumple con principios FAIR (Findable, Accessible, Interoperable, Reusable)
- No hay trazabilidad hacia Unified Foundational Ontology (UFO)
- Las exportaciones (JSON Schema, TypeScript, Zod) no están certificadas

### La solución

Integrar el **metamodel de Talaia Digital** como auditor:

```
┌─────────────────────────────────────────────────────────────────┐
│                    METAMODEL (5 CAPAS)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   Capa 0: Meta-especificación   ┌─────────────────────────────┐  │
│   (Estándares: ISO, OWL, RDF)   │  Reglas de la propia spec   │  │
│                                 └─────────────────────────────┘  │
│            ↓                                                      │
│   Capa 1: UFO (Foundational)    ┌─────────────────────────────┐  │
│   (Endurants, Perdurants)       │  Ontología fundacional       │  │
│                                 └─────────────────────────────┘  │
│            ↓                                                      │
│   Capa 2: Dominio Core          ┌─────────────────────────────┐  │
│   (Conceptos reutilizables)     │  Patrones ontológicos        │  │
│                                 └─────────────────────────────┘  │
│            ↓                                                      │
│   Capa 3: Aplicación            ┌─────────────────────────────┐  │
│   (Instancias específicas)      │  Ontologías de dominio       │  │
│                                 └─────────────────────────────┘  │
│            ↓                                                      │
│   Capa 4: Interfaz              ┌─────────────────────────────┐  │
│   (Representaciones)            │  JSON-LD, OWL, RDF           │  │
│                                 └─────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Mapeo Flove ↔ UFO (Preliminar)

| Concepto Flove | Concepto UFO | Capa |
|----------------|--------------|------|
| Fields (10 campos) | Endurants (entidades persistentes) | 1-2 |
| Paradigms (6) | Perdurants (eventos, procesos) | 1-2 |
| Apps (15) | Modes/Qualities (propiedades) | 2-3 |
| Fuzzy Logic | Meta-level (reglas de razonamiento) | 0-1 |
| CONFLUENTISM | Ontological Patterns | 2 |

---

## Stories

### SCRIPT-1.21.0-S01: Integración de Submódulos (metamodel + MMCO + FloveDocs)
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

#### Descripción

Agregar los repositorios de Talaia Digital y FloveDocs como submódulos Git anidados dentro de OnthologyEditor.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Verificar que OnthologyEditor ya está en rama `integration/beta/scriptorium` | 0.5 | ✅ |
| T002 | Ejecutar `git submodule add` para metamodel, MMCO y FloveDocs | 1 | ✅ |
| T003 | Crear README-SCRIPTORIUM.md para cada submódulo anidado | 1 | ✅ |
| T004 | Actualizar `OnthologyEditor/README-SCRIPTORIUM.md` con arquitectura completa | 0.5 | ✅ |
| T005 | Crear .gitmodules en OnthologyEditor | 0.5 | ✅ |
| T006 | Commit según protocolo DevOps | 0.5 | ✅ |
| T007 | Actualizar `scripts/setup-workspace.sh` para inicializar submódulo nested | 1 | ✅ |

#### Submódulos Instalados

| Submódulo | Origen | Rama | Licencia |
|-----------|--------|------|----------|
| metamodel | codeberg.org/talaiadigital/metamodel | main | CC BY-SA 4.0 |
| MMCO | codeberg.org/talaiadigital/MMCO | master | AGPL-3.0 |
| FloveDocs | codeberg.org/FloveDocs/Main | main | Por determinar |

**Definition of Done**:
- [x] Submódulo metamodel visible en `OnthologyEditor/metamodel/`
- [x] Submódulo MMCO visible en `OnthologyEditor/MMCO/`
- [x] Submódulo FloveDocs visible en `OnthologyEditor/FloveDocs/`
- [x] README-SCRIPTORIUM.md documenta arquitectura completa
- [x] setup-workspace.sh actualizado

---

### SCRIPT-1.21.0-S02: Arquitectura de Integración
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción

Diseñar cómo el metamodel se integrará con OnthologyEditor y flove-editor.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Crear `OnthologyEditor/docs/ARCHITECTURE.md` con diseño de integración | 1.5 | ⏳ |
| T009 | Documentar las 5 capas del metamodel y cómo mapean a Flove | 1 | ⏳ |
| T010 | Diseñar estructura de carpetas `src/compliance/` | 0.5 | ⏳ |
| T011 | Identificar puntos de extensión en flove-editor para validación | 1 | ⏳ |
| T012 | Crear diagrama de flujo: Ontología Flove → Validación UFO → Exportación | 1 | ⏳ |

**Definition of Done**:
- [ ] ARCHITECTURE.md explica el diseño completo
- [ ] Diagrama de flujo incluido
- [ ] Puntos de extensión documentados

---

### SCRIPT-1.21.0-S03: Mapeo Conceptual Flove ↔ UFO
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción

Crear documento de mapeo entre el paradigma CONFLUENTISM (Flove) y la Unified Foundational Ontology (UFO).

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T013 | Estudiar estructura UFO del metamodel (Endurants, Perdurants, Momentos) | 1 | ⏳ |
| T014 | Mapear los 10 campos de Flove a conceptos UFO | 1 | ⏳ |
| T015 | Mapear los 6 paradigmas de Flove a patrones ontológicos | 1 | ⏳ |
| T016 | Mapear las 15 apps de Flove a modos/cualidades UFO | 1 | ⏳ |
| T017 | Crear `ARCHIVO/PLUGINS/FLOVE_EDITOR/mapeo-flove-ufo.md` | 1 | ⏳ |

**Definition of Done**:
- [ ] Documento de mapeo completo con tablas
- [ ] Gaps identificados para futuros FCs
- [ ] Revisado por @yellowflag (límites conceptuales)

---

### SCRIPT-1.21.0-S04: Actualización del Plugin flove-editor
**Effort**: 3 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción

Actualizar el plugin flove-editor con referencias al metamodel y preparar para validación.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T018 | Añadir sección "Compliance" en `manifest.md` | 0.5 | ⏳ |
| T019 | Actualizar `flove-paradigm.instructions.md` con referencias UFO | 0.5 | ⏳ |
| T020 | Añadir handoff "Validar contra UFO" en agente FloveEditor | 0.5 | ⏳ |
| T021 | Actualizar `registry.json` con campo `compliance.metamodel` | 0.5 | ⏳ |
| T022 | Incrementar versión a 0.2.0 | 0.5 | ⏳ |
| T023 | Crear `prompts/validar-ufo.prompt.md` (stub para FC2) | 0.5 | ⏳ |

**Definition of Done**:
- [ ] Plugin actualizado a v0.2.0
- [ ] Referencias al metamodel en documentación
- [ ] Handoff de validación preparado

---

### SCRIPT-1.21.0-S05: Documentación y Publicación
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: 🔄 En Progreso

#### Descripción

Completar documentación y publicar épica en backlog principal.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T024 | Añadir épica SCRIPT-1.21.0 a BACKLOG-SCRIPTORIUM.md | 0.5 | ✅ |
| T025 | Actualizar PLUGINS.md con nota de compliance en flove-editor | 0.5 | ⏳ |
| T026 | Actualizar docs/ecosistema.md con metamodel como dependencia | 0.5 | ⏳ |
| T027 | Crear entrada en docs/roadmap.md para Metamodel Compliance | 0.5 | ⏳ |
| T028 | Commit según protocolo DevOps | 0.5 | ✅ |
| T029 | Actualizar contadores en README.md (nuevo submódulo) | 0.5 | ⏳ |
| T030 | Crear nota-colaboracion-talaia-flove.md para autores externos | 0.5 | ✅ |
| T031 | Documentar estrategia de licencias en OnthologyEditor/README | 0.5 | ✅ |

**Definition of Done**:
- [x] Épica publicada en backlog principal
- [ ] Documentación web actualizada
- [ ] README refleja nuevo submódulo
- [x] Nota de colaboración con autores externos creada
- [x] Estrategia de licencias AIPL/CC BY-SA/AGPL documentada

---

## Métricas SCRIPT-1.21.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 5 |
| Tasks totales | 31 |
| Puntos totales | 22 |
| Prioridad Must | 4 stories (19 pts) |
| Prioridad Should | 1 story (3 pts) |
| Completadas | **1** (S01: 7/7 tasks) |
| En progreso | **1** (S05: 4/8 tasks) |
| % Avance | **35%** (11/31 tasks) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| OnthologyEditor submódulo | ✅ Instalado | Rama integration/beta/scriptorium |
| flove-editor plugin | ✅ Instalado | v0.1.0 → v0.2.0 |
| Metamodel Codeberg | ✅ Público | CC BY-SA 4.0 |
| Git nested submodules | ✅ Soportado | Requiere --recursive |
| SCRIPT-1.20.0 (S01, S02) | ✅ Completado | Base para compliance |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Licencia CC BY-SA incompatible | Baja | Alto | Verificar con legal antes de integrar |
| Metamodel muy complejo | Media | Medio | Empezar por UFO básico |
| Submódulo nested problemático | Baja | Medio | Test en branch separado |
| Mapeo Flove↔UFO incompleto | Media | Medio | Iterar en FCs posteriores |

---

## Roadmap Post-FC1

| FC | Objetivo | Estimación |
|----|----------|------------|
| **FC2** | Validación UFO (templates, validador, tests) | ~25 pts |
| **FC3** | FAIR + Exportadores (metadatos, OWL, JSON-LD) | ~20 pts |
| **FC4** | XAI + Análisis Dimensional | ~15 pts |

---

## Changelog SCRIPT-1.21.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-01-03 | Crear conversación PO-SM en BACKLOG_BORRADORES/METAMODEL_COMPLIANCE/ | @scrum |
| 2025-01-03 | Generar backlog borrador FC1 (5 stories, 29 tasks) | @scrum |
| 2025-01-03 | Aprobar y publicar épica en backlog principal | @scrum |
| 2025-01-03 | Instalar 3 submódulos nested: metamodel, MMCO, FloveDocs (S01 completada) | @aleph |
| 2025-01-03 | Crear nota-colaboracion-talaia-flove.md con propuesta para autores externos | @aleph |
| 2025-01-03 | Añadir §8 Licencias a OnthologyEditor/README-SCRIPTORIUM.md | @aleph |
| 2025-01-03 | Actualizar S05 con tasks T030, T031; avance 35% | @aleph |
| 2025-12-26 | Consolidar borrador con épica publicada | @scrum |

---

# Épica: SCRIPT-1.22.0 — Agentes Especializados FloveEditor (Ox + 3 Submódulos)

**Objetivo**: Crear arquitectura de agentes DRY para el plugin FloveEditor: un orquestador "Ox" que coordina 3 agentes especializados (uno por submódulo: FloveDocs, Metamodel, MMCO), todos operando como índices que guían a las fuentes sin duplicar contenido.

**Estado**: ✅ Completada

**Fecha inicio**: 2025-12-26  
**Fecha cierre**: 2025-12-26  
**Rama de trabajo**: `fc1`  
**Plugin**: `flove-editor` (`.github/plugins/flove-editor/`)

---

## Contexto

### El problema

El plugin FloveEditor (SCRIPT-1.20.0) tenía un solo agente genérico (`flove-editor.agent.md`) pero:
- No había acceso especializado a los 3 submódulos (FloveDocs, Metamodel, MMCO)
- No había orquestador que coordinara los frameworks
- El bridge no podía invocar capacidades específicas de cada submódulo

### La solución

Arquitectura de agentes DRY con 5 agentes totales:

```
┌─────────────────────────────────────────────────────────────────┐
│                  plugin_ox_floveeditor.agent.md                  │
│               (Bridge VS Code → Plugin)                          │
├─────────────────────────────────────────────────────────────────┤
│                            │                                     │
│                            ▼                                     │
│                   ┌─────────────────┐                            │
│                   │  flove-ox.agent │  ← Orquestador             │
│                   │  (Flove Ox)     │    Mapea Flove↔UFO↔MMCO    │
│                   └────────┬────────┘                            │
│                            │                                     │
│        ┌───────────────────┼───────────────────┐                │
│        ▼                   ▼                   ▼                │
│  ┌───────────┐      ┌───────────┐      ┌───────────┐           │
│  │ flovedocs │      │ metamodel │      │   mmco    │           │
│  │  (Docs)   │      │  (UFO)    │      │  (OCMF)   │           │
│  └───────────┘      └───────────┘      └───────────┘           │
│                                                                  │
│  + flove-editor.agent (diseñador de ontologías 3 niveles)       │
└─────────────────────────────────────────────────────────────────┘
```

### Principio DRY aplicado

Los agentes funcionan como **índices navegables**:
- No duplican contenido de los submódulos
- Referencian rutas exactas a archivos fuente
- Guían al usuario hacia la documentación relevante
- Mantienen mapeos conceptuales (Flove↔UFO↔MMCO)

---

## Stories

### SCRIPT-1.22.0-S01 — Agente Orquestador (Flove Ox)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `flove-ox.agent.md` con índice JSON de submódulos | ✅ |
| T002 | Definir handoffs a flovedocs, metamodel, mmco | ✅ |
| T003 | Crear mapeo Flove↔UFO (10 campos → Endurants/Perdurants) | ✅ |
| T004 | Crear mapeo Flove↔MMCO (paradigmas → niveles OCMF) | ✅ |
| T005 | Documentar taxonomía visual de agentes | ✅ |

**Entregable**: `flove-ox.agent.md` (189 líneas)

---

### SCRIPT-1.22.0-S02 — Agente FloveDocs
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T006 | Crear `flovedocs.agent.md` con índice de documentación | ✅ |
| T007 | Indexar 10 campos Flove con rutas a tablas | ✅ |
| T008 | Indexar 6 paradigmas con rutas a slides | ✅ |
| T009 | Indexar 15+ aplicaciones con rutas a demos | ✅ |
| T010 | Documentar estructura FloveDocs/Main | ✅ |

**Entregable**: `flovedocs.agent.md` (161 líneas)

---

### SCRIPT-1.22.0-S03 — Agente Metamodel (UFO)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Crear `metamodel.agent.md` con índice UFO | ✅ |
| T012 | Documentar 5 capas del metamodel | ✅ |
| T013 | Crear templates ENTITY, RELATIONSHIP, PROCESS | ✅ |
| T014 | Indexar estructura de carpetas metamodel/ | ✅ |
| T015 | Documentar principios FAIR | ✅ |

**Entregable**: `metamodel.agent.md` (238 líneas)

---

### SCRIPT-1.22.0-S04 — Agente MMCO (OCMF)
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T016 | Crear `mmco.agent.md` con índice OCMF | ✅ |
| T017 | Documentar 7 niveles de emergencia | ✅ |
| T018 | Indexar 8 toy models (Python/Julia) | ✅ |
| T019 | Documentar 4 constructos primarios | ✅ |
| T020 | Crear handoffs de validación | ✅ |

**Entregable**: `mmco.agent.md` (195 líneas)

---

### SCRIPT-1.22.0-S05 — Actualización Bridge y Registro
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T021 | Actualizar `plugin_ox_floveeditor.agent.md` con 5 handoffs | ✅ |
| T022 | Añadir taxonomía visual al bridge | ✅ |
| T023 | Verificar integración con @aleph | ✅ |

**Entregable**: `plugin_ox_floveeditor.agent.md` actualizado (173 líneas)

---

## Métricas SCRIPT-1.22.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 5 |
| Tasks totales | 23 |
| Puntos totales | 18 |
| Prioridad Must | 5 stories (18 pts) |
| Completadas | **5** |
| % Avance | **100%** 🎉 |

---

## Entregables

| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `flove-ox.agent.md` | Orquestador de submódulos | 189 |
| `flovedocs.agent.md` | Índice documentación Flove | 161 |
| `metamodel.agent.md` | Índice framework UFO | 238 |
| `mmco.agent.md` | Índice framework OCMF | 195 |
| `plugin_ox_floveeditor.agent.md` | Bridge actualizado | 173 |
| **Total** | | **956** |

---

## Mapeos Conceptuales Creados

### Flove → UFO

| Concepto Flove | Concepto UFO | Capa |
|----------------|--------------|------|
| 10 Fields | Endurants | 1-2 |
| 6 Paradigms | Perdurants | 1-2 |
| 15+ Apps | Modes/Qualities | 2-3 |
| Fuzzy Logic | Meta-level | 0-1 |
| CONFLUENTISM | Ontological Patterns | 2 |

### Flove → MMCO

| Paradigma Flove | Nivel OCMF | Descripción |
|-----------------|------------|-------------|
| Fuzzy Logic | L0-L1 | Meta-estructura |
| Fields (10) | L2-L3 | Propiedades constitutivas |
| Paradigms (6) | L4-L5 | Dinámicas emergentes |
| Apps (15+) | L6-L7 | Aplicaciones coherentes |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| SCRIPT-1.20.0 (FloveEditor base) | ✅ Completada |
| SCRIPT-1.21.0 (Submódulos nested) | ✅ S01 Completada |
| OnthologyEditor/FloveDocs | ✅ Submódulo instalado |
| OnthologyEditor/metamodel | ✅ Submódulo instalado |
| OnthologyEditor/MMCO | ✅ Submódulo instalado |

---

## Changelog SCRIPT-1.22.0

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-26 | Crear épica SCRIPT-1.22.0 | @scrum |
| 2025-12-26 | Crear flove-ox.agent.md (orquestador) | @aleph |
| 2025-12-26 | Crear flovedocs.agent.md (índice FloveDocs) | @aleph |
| 2025-12-26 | Crear metamodel.agent.md (índice UFO) | @aleph |
| 2025-12-26 | Crear mmco.agent.md (índice OCMF) | @aleph |
| 2025-12-26 | Actualizar bridge plugin_ox_floveeditor | @aleph |
| 2025-12-26 | Cerrar épica al 100% | @aleph |

# Épica: SCRIPT-1.23.0 — Integración MMCO (OCMF)

**Objetivo**: Integrar el submódulo `OnthologyEditor/MMCO` como marco de coherencia para ontologías Flove: adapter schema→OCMF, validación UFO previa y métrica de coherencia `phi_mmco` con reporte público.

**Estado**: 🔄 En Progreso (FC0 completado, FC1 listo para iniciar)  
**Effort total**: 24 puntos (6 stories)

**Submódulo**: `OnthologyEditor/MMCO`  
**Plugin**: `flove-editor` (Bridge: `plugin_ox_floveeditor`)  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/MMCO/conversacion-po-sm.md`  
**Backlog detallado**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/MMCO/01_backlog-borrador.md`

---

## Contexto

### El problema
Las ontologías Flove creadas con `FloveEditor` carecen de una validación de coherencia material (OCMF). Existen recursos en MMCO (toy models y ontologías XML) que podemos usar, pero no hay adapter ni métrica integrados.

### La solución
Pipeline en 4 pasos:
1. **FC0**: Tracking y documentación (setup inicial)
2. **FC1**: Discovery + Adapter (`ocmf-adapter.json`)
3. **FC2**: Validación UFO + Métrica (`phi_mmco.py`)
4. **FC3**: Reportes, Prompts e Integración

### Arquitectura del Pipeline

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      PIPELINE MMCO PARA FLOVE-EDITOR                      │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────┐ │
│  │   SCHEMA    │────▶│     UFO     │────▶│   ADAPTER   │────▶│  MMCO   │ │
│  │  (Flove)    │     │ (Metamodel) │     │(ocmf-adapter)│    │(φ metric)│ │
│  └─────────────┘     └─────────────┘     └─────────────┘     └────┬────┘ │
│        │                   │                   │                  │      │
│        ▼                   ▼                   ▼                  ▼      │
│   ontology.json      ufo-validation     adapter.json      mmco_score.json│
│                           .md                               mmco_report.md│
│                                                                           │
│  ╔═══════════════════════════════════════════════════════════════════╗   │
│  ║               SALIDA: ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/          ║   │
│  ╚═══════════════════════════════════════════════════════════════════╝   │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

### Niveles de Emergencia OCMF (7 niveles)

| Nivel | Símbolo | Nombre | Concepto |
|-------|---------|--------|----------|
| L0 | BNP | Being-Non-being-Potential | Meta-estructura |
| L1 | QCW | Qualities-Consequences-Words | Propiedades |
| L2 | CTN | Context-Target-Means | Intencionalidad |
| L3 | PG | Periphery-Generator | Organización |
| L4 | PT | Production-Transaction | Dinámica |
| L5 | CS | Compression-Simplification | Abstracción |
| L6 | MF | Multi-Fractal | Coherencia global |

---

## Feature Cycle 0: Tracking (Setup) — ✅ COMPLETADO

**Objetivo**: Configuración inicial y documentación del trabajo

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T000 | Crear branch `feature/mmco-integration` (documentar) | 0.5 | ✅ |
| T001 | Actualizar `OnthologyEditor/MMCO/README-SCRIPTORIUM.md` | 0.5 | ✅ |
| T002 | Crear `conversacion-po-sm.md` con sesión de expertos | 2 | ✅ |
| T003 | Publicar backlog oficial en `01_backlog-borrador.md` | 1 | ✅ |
| T004 | Añadir épica al `BACKLOG-SCRIPTORIUM.md` | 0.5 | ✅ |

**Effort FC0**: 4.5 pts | **Completado**: 4.5 pts (100%)

---

## Feature Cycle 1: Discovery + Adapter — ⏳ PENDIENTE

**Objetivo**: Documentar recursos MMCO y diseñar adapter intermedio

### Story: S01 — Inventario de Recursos MMCO
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Documentar toy models en `MMCO/models/toy_models/` | 1 | ⏳ |
| T006 | Documentar XMLs en `MMCO/resources/xml/` | 1 | ⏳ |
| T007 | Mapear constructos OCMF a campos Flove | 1 | ⏳ |

### Story: S02 — Diseño del Adapter
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Especificar schema de `ocmf-adapter.json` | 1.5 | ⏳ |
| T009 | Implementar conversión schema→adapter (minimal) | 2 | ⏳ |
| T010 | Crear carpeta `ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/` | 0.5 | ⏳ |
| T011 | Documentar formato intermedio en `adapter-spec.md` | 1 | ⏳ |

**Effort FC1**: 8 pts | **Completado**: 0 pts (0%)

---

## Feature Cycle 2: Validación UFO + Métrica — ⏳ PENDIENTE

**Objetivo**: Validar ontología con UFO y calcular métrica de coherencia

### Story: S03 — Validación UFO
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Aplicar plantilla ENTITY a entidades del schema | 1.5 | ⏳ |
| T013 | Aplicar plantilla RELATIONSHIP a relaciones | 1.5 | ⏳ |
| T014 | Aplicar plantilla PROCESS a procesos | 1 | ⏳ |
| T015 | Generar `ufo-validation.md` con resultados | 1 | ⏳ |

### Story: S04 — Métrica de Coherencia
**Effort**: 4 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Preparar entorno Python para `phi_mmco.py` | 1 | ⏳ |
| T017 | Definir inputs desde adapter para cálculo φ | 1.5 | ⏳ |
| T018 | Ejecutar métrica y capturar output | 1 | ⏳ |
| T019 | Interpretar resultado φ ∈ [0,1] | 0.5 | ⏳ |

**Effort FC2**: 9 pts | **Completado**: 0 pts (0%)

---

## Feature Cycle 3: Reportes y Prompts — ⏳ PENDIENTE

**Objetivo**: Generar reportes y añadir prompts al plugin

### Story: S05 — Reportes
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T020 | Generar `mmco_score.json` con estructura definida | 1 | ⏳ |
| T021 | Generar `mmco_report.md` con análisis legible | 1.5 | ⏳ |
| T022 | Definir umbrales de coherencia (bajo/medio/alto) | 0.5 | ⏳ |

### Story: S06 — Integración con Plugin
**Effort**: 4 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T023 | Crear `validar-mmco-pipeline.prompt.md` | 1 | ⏳ |
| T024 | Crear `ejecutar-adapter-mmco.prompt.md` | 1 | ⏳ |
| T025 | Crear `calcular-metrica-mmco.prompt.md` | 1 | ⏳ |
| T026 | Actualizar `plugin_ox_floveeditor.agent.md` con handoffs | 0.5 | ⏳ |
| T027 | Actualizar `manifest.md` del plugin | 0.5 | ⏳ |

**Effort FC3**: 7 pts | **Completado**: 0 pts (0%)

---

## Métricas SCRIPT-1.23.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 6 (S00-S06) |
| Tasks totales | 28 (T000-T027) |
| Effort total | 28.5 pts |
| FC0 completado | **4.5 pts (100%)** |
| FC1 pendiente | 8 pts |
| FC2 pendiente | 9 pts |
| FC3 pendiente | 7 pts |
| **% Avance global** | **16%** (FC0 done) |

---

## Umbrales de Coherencia MMCO

| Rango φ | Nivel | Significado |
|---------|-------|-------------|
| 0.0 - 0.3 | 🔴 Bajo | Ontología fragmentada, requiere revisión |
| 0.3 - 0.7 | 🟡 Medio | Coherencia parcial, mejorable |
| 0.7 - 1.0 | 🟢 Alto | Ontología coherente según OCMF |

---

## Estructura de Salida

```
ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/
└── {ontology_id}/
    ├── adapter.json           # Formato intermedio OCMF
    ├── ufo-validation.md      # Resultado validación UFO
    ├── mmco_score.json        # Métrica φ + metadata
    └── mmco_report.md         # Reporte legible
```

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| OnthologyEditor/MMCO | ✅ Instalado | Toy models + ontology XMLs |
| flove-editor plugin | ✅ Instalado | Bridge operativo (v1.0.0) |
| Metamodel (UFO) | ✅ Instalado | Templates ENTITY/RELATIONSHIP/PROCESS |
| Python 3.10+ | ⚠️ Verificar | Requerido para phi_mmco.py |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Python no disponible en entorno | Media | Alto | Modo offline con φ=N/A |
| OCMF muy complejo para v1 | Media | Medio | Subset de 4 constructos |
| XMLs incompletos | Baja | Bajo | Fallback a templates |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-26 | Crear épica stub SCRIPT-1.23.0 | @aleph |
| 2025-01-03 | Completar FC0: conversación PO-SM con expertos, backlog oficial | @ox |
| 2025-01-03 | Expandir épica con FC0-FC3, 28 tasks, arquitectura pipeline | @ox |
| 2025-12-26 | Consolidar borrador MMCO con épica publicada | @scrum |
| 2025-01-03 | Expandir épica con FC0-FC3, 28 tasks, arquitectura pipeline | @ox |