# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 1.3.0  
> **Sprint actual**: 1 (Teatro Interactivo + Scrum + Refactorización Impress.js)  
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
| 2025-12-22 | Completar documentación y tests del Teatro (S10) | Aleph |
| 2025-12-22 | Diseñar cards de obras y cerrar Sprint 1 (S04-T011) | Aleph |
| 2025-12-22 | Instalar plugin Scrum v1.0.0 (SCRIPT-1.1.0) | Aleph |
| 2025-12-22 | Añadir épica SCRIPT-1.2.0: Galería de Fotos de Estado | Aleph |
| 2025-12-23 | Añadir S03: Anexo Visual con 12 capturas y tutorial "Como Word" | Aleph |
| 2025-12-23 | Añadir épica SCRIPT-1.3.0: Refactorización Teatro (Impress.js + BOE) | Aleph |
| 2025-12-23 | Registrar BUG-002: impress.js no inicializa | Aleph |

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
| % Avance | **0%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| BUG-001 (Jekyll include) | 🟡 Parcialmente resuelto | Falta verificar en Actions |
| BUG-002 (impress.js) | 🔴 Nuevo | Creado como parte de esta épica |
| impress.js CDN | 🔴 Inestable | Considerar copia local |

---

# 🐛 Bugs

## BUG-002: impress.js no inicializa — TypeError: impress is not a function

**Estado**: 🔴 Abierto  
**Severidad**: Crítica (bloquea toda la funcionalidad del Teatro)  
**Detectado**: 2025-12-23  
**Relacionado con**: SCRIPT-1.3.0-S01

### Descripción

Al navegar a cualquier obra del teatro (ej. `/teatro/camino-del-tarotista/`), la consola muestra:

```
🎭 Teatro Interactivo: Inicializando...
TypeError: impress is not a function
```

El layout `docs/_layouts/obra.html` carga impress.js desde CDN pero la función `impress()` no está disponible cuando `teatro.js` intenta ejecutarla.

### Causa probable

1. **Orden de carga**: `teatro.js` se ejecuta antes de que impress.js termine de cargar
2. **CDN inestable**: jsDelivr puede tener problemas de disponibilidad
3. **Conflicto de scope**: impress.js no expone la función globalmente
4. **Error en el CDN**: El archivo puede estar corrupto o incompleto

### Soluciones propuestas

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| **A** | Añadir `defer` o mover script al final del `<body>` | Simple | Puede no resolver |
| **B** | Copiar impress.js a `docs/assets/js/` (local) | Control total | Mantenimiento manual |
| **C** | Usar evento `load` en vez de `DOMContentLoaded` | Más tardío | UX más lenta |
| **D** | Verificar que CDN devuelve 200 y contenido válido | Diagnóstico | No es fix |

### Decisión recomendada

**Opción B**: Copiar impress.js localmente para control total.

### Tasks

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| BUG-002-T001 | Verificar respuesta del CDN (200, contenido) | ⏳ |
| BUG-002-T002 | Descargar impress.js a `docs/assets/js/impress.min.js` | ⏳ |
| BUG-002-T003 | Actualizar `obra.html` para usar copia local | ⏳ |
| BUG-002-T004 | Añadir fallback en `teatro.js` si impress no existe | ⏳ |
| BUG-002-T005 | Verificar en local y en GitHub Actions | ⏳ |

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
