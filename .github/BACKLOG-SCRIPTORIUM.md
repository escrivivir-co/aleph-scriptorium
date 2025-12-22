# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 1.0.0  
> **Sprint actual**: 1 (Teatro Interactivo)  
> **Fecha inicio**: 2025-12-22

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
**Estado**: 🔄 En progreso

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Crear `docs/teatro.md` con estructura de cartelera | ✅ |
| T011 | Diseñar cards de obras (poster, sinopsis, estado) | ⏳ |
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
| T025 | Integrar personaje Tarotista (demarcacion-yellowflag) | ✅ |
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
**Estado**: 🔄 En progreso

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T035 | Actualizar README.md con sección Teatro | ⏳ |
| T036 | Actualizar `copilot-instructions.md` con Teatro | ✅ |
| T037 | Test: flujo completo de generación de obra | ⏳ |
| T038 | Test: visualizador impress.js en desktop y móvil | ⏳ |
| T039 | Documentar hoja de ruta para Angular/React | ⏳ |

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
| Completadas | 39 |
| En progreso | 1 |
| Pendientes | 4 |
| % Avance | 89% |

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
| AGENT_CREATOR plugin | ✅ Instalado | demarcacion-yellowflag creado |
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
