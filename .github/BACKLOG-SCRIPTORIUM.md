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
| T004 | Verificar en navegador local antes de push | ⏳ |
| T005 | Verificar en GitHub Actions después de push | ⏳ |

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
| T029 | Verificar que GitHub Actions pasa sin errores | ⏳ |
| T030 | Documentar hallazgos y limitaciones MVP | ⏳ |

---

## Métricas SCRIPT-1.3.0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 30 |
| Completadas | **22** |
| En progreso | 1 |
| Pendientes | **7** |
| % Avance | **73%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| BUG-001 (Jekyll include) | 🟡 Parcialmente resuelto | Falta verificar en Actions |
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

### Verificación pendiente

- [ ] Test local con `jekyll serve`
- [ ] Verificar en GitHub Actions después de push

---

## BUG-001: Jekyll include_relative con variable falla en GitHub Actions

**Estado**: 🔴 Abierto  
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
| BUG-001-T004 | Verificar build en GitHub Actions | 🔄 |

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
- Pendiente: confirmar que el próximo run de GitHub Actions pasa (BUG-001-T004).

### Archivos afectados

- `docs/_layouts/obra.html` (línea ~80)
- `docs/teatro/camino-del-tarotista.md`
- `ARCHIVO/DISCO/TALLER/camino-del-tarotista/escenas/*.md`

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
> **Effort total asignado**: 21 pts  
> **Objetivo**: Establecer base de código y carga dinámica de agentes/plugins

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