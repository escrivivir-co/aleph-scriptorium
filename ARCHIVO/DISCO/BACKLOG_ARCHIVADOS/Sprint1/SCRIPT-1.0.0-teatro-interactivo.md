# Épica Archivada: SCRIPT-1.0.0 — Teatro Interactivo

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03  
> **Tasks completadas**: 44/44

---

## Objetivo

Crear un sistema unificado que conecte ARG_BOARD, AGENT_CREATOR y GH-Pages para ofrecer experiencias de teatro transmedia interactivo con visualización 3D basada en impress.js.

## Concepto Central

El usuario experimenta el Scriptorium como un **teatro navegable** donde puede visionar obras, interactuar con personajes (agentes) y recorrer caminos narrativos (monomitos).

---

## Conceptos Clave del Teatro

### 1. BOE (Boletín Oficial del Estado Escénico)

```
BOE → Mapa de diapositivas impress.js en la UI/UX
```

**Ubicación**: `ARCHIVO/PLUGINS/ARG_BOARD/BOE/`

### 2. Monomito (Ciclo de 12 Etapas)

| Fase | Estadios | Anillo | Descripción |
|------|----------|--------|-------------|
| **PARTIDA** | 1-4 | 1 | Mundo ordinario → Cruce del umbral |
| **INICIACIÓN** | 5-8 | 2 | Pruebas → Ordalía |
| **RETORNO** | 9-12 | 3 | Recompensa → Elixir |

**Ubicación**: `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/monomitos.json`

### 3. Elenco (Inyección de Personajes)

```
AGENT_CREATOR                    ARG_BOARD
─────────────                    ─────────
recipe.json  ───────────────→   actores.json
agente.agent.md  ───────────→   obras.json (campo actores)
```

### 4. TALLER (Proyectos de Usuario)

**Ubicación**: `ARCHIVO/DISCO/TALLER/`

---

## Stories Completadas

### S01 — Instrucciones del Teatro ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `instructions/teatro-interactivo.instructions.md` | ✅ |
| T002 | Documentar flujo AGENT_CREATOR → ARG_BOARD → GH-PAGES | ✅ |
| T003 | Definir esquema YAML de obras | ✅ |

### S02 — Prompts del Teatro ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Crear `prompts/teatro-generar-obra.prompt.md` | ✅ |
| T005 | Crear `prompts/teatro-instalar-obra.prompt.md` | ✅ |
| T006 | Crear `prompts/teatro-ejecutar-obra.prompt.md` | ✅ |

### S03 — Agente Teatro (Bridge) ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Crear `agents/teatro.agent.md` como bridge unificador | ✅ |
| T008 | Añadir handoffs a Arrakis, AgentCreator, GHPages | ✅ |
| T009 | Actualizar `aleph.agent.md` con handoffs de Teatro | ✅ |

### S04 — Página Cartelera ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Crear `docs/teatro.md` con estructura de cartelera | ✅ |
| T011 | Diseñar cards de obras (poster, sinopsis, estado) | ✅ |
| T012 | Añadir sección "En escena" (obra activa destacada) | ✅ |
| T013 | Añadir "Teatro" a navegación en `_config.yml` | ✅ |

### S05 — Visualizador Impress.js (MVP) ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T014 | Crear `docs/assets/js/teatro.js` con navegación básica | ✅ |
| T015 | Crear `docs/assets/css/teatro.css` con estilos de anillos | ✅ |
| T016 | Implementar slider de anillos (JavaScript vanilla) | ✅ |
| T017 | Implementar árbol-índice lateral (HTML + CSS) | ✅ |
| T018 | Documentar limitaciones MVP vs aspiración Angular | ✅ |

### S06 — Generador de Páginas Impress.js ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T019 | Crear template Jekyll para páginas de obra | ✅ |
| T020 | Implementar layout de anillos desde YAML | ✅ |
| T021 | Generar diapositivas por estadio | ✅ |
| T022 | Implementar navegación entre diapositivas | ✅ |

### S07 — Obra Demo "Camino del Tarotista" ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T023 | Crear YAML de la obra `camino-del-tarotista.yaml` | ✅ |
| T024 | Generar página impress.js de la obra | ✅ |
| T025 | Integrar personaje Tarotista (tarotista) | ✅ |
| T026 | Documentar cada prueba con instrucciones interactivas | ✅ |
| T027 | Registrar obra en `obras.json` | ✅ |
| T028 | Publicar en cartelera | ✅ |

### S08 — Consolidación AGENT_CREATOR → ARG_BOARD ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T029 | Automatizar creación de actor en `actores.json` desde receta | ✅ |
| T030 | Actualizar prompt `desplegar-en-arg.prompt.md` | ✅ |
| T031 | Validar pipeline: receta → agente → actor → obra | ✅ |

### S09 — Integración GH-Pages ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T032 | Actualizar `ghpages.agent.md` con handoffs de Teatro | ✅ |
| T033 | Crear prompt para actualizar cartelera desde obras.json | ✅ |
| T034 | Implementar "obra en escena" como página destacada | ✅ |

### S10 — Documentación y Tests ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T035 | Actualizar README.md con sección Teatro | ✅ |
| T036 | Actualizar `copilot-instructions.md` con Teatro | ✅ |
| T037 | Test: flujo completo de generación de obra | ✅ |
| T038 | Test: visualizador impress.js en desktop y móvil | ✅ |
| T039 | Documentar hoja de ruta para Angular/React | ✅ |

### S11 — TALLER (Proyectos de Usuario) ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T040 | Crear `ARCHIVO/DISCO/TALLER/README.md` con documentación | ✅ |
| T041 | Crear `_plantilla/` con estructura base | ✅ |
| T042 | Formalizar proyecto `hola-mundo/` como ejemplo | ✅ |
| T043 | Documentar pipeline completo | ✅ |
| T044 | Crear escenas completas de Hola Mundo (3 escenas) | ✅ |

---

## Entregables

| Tipo | Archivo |
|------|---------|
| Instrucciones | `.github/plugins/teatro/instructions/teatro-interactivo.instructions.md` |
| Prompt | `teatro-generar-obra.prompt.md` |
| Prompt | `teatro-instalar-obra.prompt.md` |
| Prompt | `teatro-ejecutar-obra.prompt.md` |
| Agente | `teatro.agent.md` |
| Página Web | `docs/teatro.md` |
| Visualizador | `docs/assets/js/teatro.js` |
| CSS | `docs/assets/css/teatro.css` |

---

## Dependencias Satisfechas

| Dependencia | Estado |
|-------------|--------|
| ARG_BOARD plugin | ✅ |
| AGENT_CREATOR plugin | ✅ |
| GH_PAGES plugin | ✅ |
| impress.js | ✅ (CDN v2.0.0) |
| Tarotista (personaje) | ✅ |
| TALLER (estructura) | ✅ |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-12-22 | Crear épica |
| 2025-12-22 | Instalar plugin Teatro (S01-S04) |
| 2025-12-22 | Implementar visualizador MVP (S05-S06) |
| 2025-12-22 | Publicar obra demo (S07) |
| 2025-12-22 | Consolidar pipeline (S08-S09) |
| 2025-12-22 | Documentación y tests (S10-S11) |
| 2025-01-03 | **Archivar** — 100% completada |
