# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 1.0.0-beta.4  
> **Sprint actual**: FC2 (Feature Cycle 2)  
> **Fecha inicio**: 2025-12-27

---

## Épicas Activas

| Épica | Nombre | Estado | Prioridad |
|-------|--------|--------|-----------|
| SCRIPT-1.27.0 | Blueprint MMCO Compliance | 🔄 En progreso | P0 |
| SCRIPT-1.26.0 | Blueprint Refinements | ✅ Cerrada | P0 |
| SCRIPT-1.20.0 | Metamodel Scriptorium | 🆕 Nueva | P1 |
| SCRIPT-1.21.0 | MMCO ARG-Board | 🆕 Nueva | P2 |
| SCRIPT-1.22.0 | Integración y Validación | 🆕 Nueva | P3 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | 🆕 Nueva | P2 |
| SCRIPT-1.25.0 | Blueprint Visual Index | ✅ Cerrada | Alta |

---

## SCRIPT-1.27.0 — Blueprint MMCO Compliance

> **Objetivo**: Refactorizar el Blueprint visual para que refleje la ontología formal (MetaModel) y la jerarquía de emergencia (MMCO) del Scriptorium  
> **Sprint**: FC2 (actual)  
> **Effort total**: 21 pts  
> **Estado**: 🔄 En progreso  
> **Contexto**: El blueprint actual (SCRIPT-1.26.0) satisface UX pero no cumple el objetivo de FC1: modelar Scriptorium con terminología MetaModel/MMCO

### El Gap

| Aspecto | Blueprint Actual | Blueprint MMCO |
|---------|------------------|----------------|
| Lenguaje | Comercial/funcional | Terminología MetaModel + MMCO |
| Estructura | Taxonomía plana (capas) | Jerarquía de Emergencia (0c→4) |
| Dinámicas | Flujos lineales | Meta-Dinámicas (coherencia→tiempo) |
| Slides | 7 diapositivas funcionales | 7 niveles de emergencia MMCO |

### Mapeo MMCO → Blueprint

| Nivel MMCO | Slide Blueprint | Contenido |
|------------|-----------------|-----------|
| 0c (BNP) | `#bnp` | ARCHIVO como potencial de conocimiento |
| 0b (Correlaciones) | `#correlations` | Red de agentes + handoffs (grafo) |
| 0a (Tensores) | `#tensors` | Estado actual: git status, DISCO |
| 1 (Proto-geometría) | `#geometry` | Estructura de proyectos, plugins |
| 2 (Pseudo-tiempo) | `#time` | Sprints, commits, releases |
| 3 (Espacio-tiempo) | `#spacetime` | Publicaciones: GH-Pages, docs |
| 4 (Materia) | `#matter` | Productos finales: Teatro, Periódico, Fundación |

### Estrategia de Implementación

**Opción elegida**: **Segundo blueprint alternativo** (`/blueprint-mmco/`) que coexiste con el actual.

Justificación:
- El blueprint actual (UX-focused) es útil para usuarios nuevos
- El blueprint MMCO es para colaboradores que entienden el modelo
- Permitir toggle entre ambas vistas

### Stories

| ID | Story | Descripción | Effort | Estado |
|----|-------|-------------|--------|--------|
| S01 | Estructura 7 slides MMCO | Crear layout con niveles 0c→4 como slides | 3 pts | ✅ |
| S02 | Slide 0c: BNP (ARCHIVO) | Visualizar ARCHIVO como "plenum de potencialidad" | 3 pts | ✅ |
| S03 | Slide 0b: Correlaciones | Grafo interactivo agentes↔handoffs | 5 pts | ✅ |
| S04 | Slide 1: Proto-geometría | Diagrama de estructura proyectos/plugins | 2 pts | ✅ |
| S05 | Slide 2: Pseudo-tiempo | Timeline de sprints + commits como meta-dinámica | 3 pts | ✅ |
| S06 | Slides 3-4: Spacetime→Matter | Publicaciones y productos finales | 2 pts | ✅ |
| S07 | Toggle entre blueprints | Navegación UX-view ↔ MMCO-view | 2 pts | ✅ |
| S08 | Documentar modelo formal | README en OnthologyEditor/scriptorium/ | 1 pt | ⏳ |

### Detalle de Stories

#### S01: Estructura 7 Slides MMCO (3 pts)

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T01 | Crear `docs/blueprint-mmco.md` con layout MMCO | ✅ |
| T02 | Definir posiciones 3D para jerarquía de emergencia | ✅ |
| T03 | CSS: estilos específicos para niveles 0c→4 | ✅ |

**Posiciones propuestas** (Z-axis = nivel de emergencia):
```
Nivel 0c (BNP):     z: -3000 (más profundo, potencial)
Nivel 0b:           z: -2000
Nivel 0a:           z: -1000
Nivel 1:            z: 0 (centro)
Nivel 2:            z: 1000
Nivel 3:            z: 2000
Nivel 4 (Matter):   z: 3000 (más cercano, actual)
```

#### S02: Slide 0c — BNP (3 pts)

**Concepto**: El ARCHIVO como "Basic Narrative Potential" — el plenum de posibilidad del que emerge todo.

**Visualización**:
- Fondo: gradiente difuso (potencialidad no-diferenciada)
- Tres esferas superpuestas: `marco/`, `diagnóstico/`, `justificación/`
- Texto MMCO: "BNP: Potencial narrativo básico"

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T04 | Diseño visual del "campo ontológico" | ✅ |
| T05 | Conectar con contenido real de ARCHIVO/ | ✅ |

#### S03: Slide 0b — Correlaciones (5 pts)

**Concepto**: Red de agentes y handoffs como "correlaciones pre-métricas".

**Visualización**:
- Grafo interactivo (Mermaid o D3.js)
- Nodos = agentes (color por capa)
- Aristas = handoffs (direccionales)
- Hover: muestra descripción del handoff

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T06 | Extraer grafo de handoffs desde agentes/*.agent.md | ✅ |
| T07 | Renderizar como Mermaid flowchart LR | ✅ |
| T08 | Interactividad: click navega a agente | ⏳ |

#### S04: Slide 1 — Proto-geometría (2 pts)

**Concepto**: La estructura de carpetas/plugins como "geometría pre-espacial".

**Visualización**:
- Tree diagram de `.github/plugins/`
- Conexiones con `ARCHIVO/PLUGINS/` (código ↔ datos)

#### S05: Slide 2 — Pseudo-tiempo (3 pts)

**Concepto**: Sprints y commits como "tiempo emergente de la coherencia".

**Visualización**:
- Timeline horizontal
- Nodos = releases (v1.0.0-beta.1, etc.)
- Área = effort completado por sprint
- Conexión con `@scrum` y backlog

#### S06: Slides 3-4 (2 pts)

**Nivel 3 (Espacio-tiempo)**: Publicaciones en GH-Pages
**Nivel 4 (Materia)**: Productos finales (Teatro, Periódico, Fundación)

#### S07: Toggle entre blueprints (2 pts)

**UX**: Botón en ambos blueprints para cambiar vista.

```html
<a href="/blueprint/">Vista UX</a> | <a href="/blueprint-mmco/">Vista MMCO</a>
```
**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T09 | Añadir toggle en `docs/blueprint.md` | ✅ |
| T10 | Añadir toggle en `docs/blueprint-mmco.md` | ✅ |
| T11 | Actualizar `docs/index.md`: añadir enlace a Blueprint MMCO | ✅ |
| T12 | Actualizar nav en `_config.yml` si procede | ⏳ |
#### S08: Documentar modelo (1 pt)

Crear `OnthologyEditor/scriptorium/README.md` explicando:
- Mapeo MetaModel → Agentes
- Mapeo MMCO → Dinámicas del Scriptorium
- Cómo se relaciona con φ_editor

### Criterios de Aceptación

- [ ] Blueprint MMCO navegable en 7 slides
- [ ] Cada slide usa terminología MMCO correcta
- [ ] Slide 0b muestra grafo de handoffs real
- [ ] Toggle UX↔MMCO funciona
- [ ] Documentación en OnthologyEditor/scriptorium/

### Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| MMCO demasiado abstracto para visualizar | Media | Alto | Usar metáforas visuales (profundidad Z) |
| Grafo de handoffs muy complejo | Media | Medio | Filtrar por capa, mostrar subgrafos |
| Confusión entre dos blueprints | Baja | Bajo | Navegación clara, labels distintos |

---

## SCRIPT-1.26.0 — Blueprint Refinements

> **Objetivo**: Corregir bugs y mejorar UX del Blueprint Visual Index  
> **Sprint**: Actual  
> **Effort total**: 13 pts  
> **Estado**: ✅ Cerrada

### Bugs

| ID | Bug | Effort | Estado |
|----|-----|--------|--------|
| B01 | Responsive: contenido colapsa en pantallas no apaisadas | 2 pts | ✅ |
| B02 | Hipervínculos sin formato (azul oscuro sobre fondo negro) en diapo6 y diapo7 | 1 pt | ✅ |

### Cambios por Diapositiva

| ID | Diapo | Cambio | Effort | Estado |
|----|-------|--------|--------|--------|
| C01 | 1 - Overview | Contador pequeño + nube de categorías funcionales | 2 pts | ✅ |
| C02 | 1 - Overview | Nuevo slogan (pedir a Lucas, quitar "ejército de IA") | 1 pt | ✅ |
| C03 | 2 - Core | Presentar como app Desktop, CLI_SCRIPTORIUM como kernel. Diagrama UML Mermaid | 2 pts | ✅ |
| C04 | 3 - Ontology | Renombrar a "Taxonomía de agentes". Árbol completo con plugins | 2 pts | ✅ |
| C05 | 4 - Dynamics | Añadir flujo Periódico (5W+Banderas) y flujo Teatro | 1 pt | ✅ |
| C06 | 5 - Hypergraph | Círculos = plugins reales con fichas descriptivas | 1 pt | ✅ |
| C07 | 6 - Products | Agregar ARCHIVO como fuente de datos | 1 pt | ✅ |
| C08 | 7 - CTA | Cambiar título a "FOSS project (proyecto abierto)" | 0 pts | ✅ |

### Criterios de Aceptación

- [x] B01: Blueprint legible en orientación vertical (tablets, móviles)
- [x] B02: Links visibles con contraste adecuado
- [x] C01-C08: Todas las diapositivas actualizadas según especificación

---

## FC1: Ontología Formal del Scriptorium

> **Feature Cycle**: FC1  
> **Borrador**: [ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/)  
> **Effort total**: 37 puntos  
> **Estado**: ✅ Aprobado

### Concepto

Aplicar los frameworks **Metamodel** (ontología formal) y **MMCO** (métricas de coherencia) al Scriptorium para:
1. Especificar formalmente agentes, plugins y dominios
2. Medir coherencia en partidas ARG y producción editorial
3. Integrar con @decoherence, @ox y las 5 Banderas

### Estructura del FC1

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                         FC1: Ontología Formal                                  │
├─────────────────┬──────────────────┬──────────────────┬───────────────────────┤
│   Iteración 1   │   Iteración 2    │   Iteración 3    │     Iteración 4       │
│   (16 pts/43%)  │   (8 pts/22%)    │   (8 pts/22%)    │     (5 pts/13%)       │
├─────────────────┼──────────────────┼──────────────────┼───────────────────────┤
│ Metamodel       │ MMCO ARG         │ MMCO Editor      │ Integración           │
│ Scriptorium     │ Board            │ Transmedia       │ Validación            │
└─────────────────┴──────────────────┴──────────────────┴───────────────────────┘
```

### SCRIPT-1.20.0 — Metamodel Scriptorium

> **Effort**: 16 pts  
> **Objetivo**: Especificación formal de agentes/plugins/dominios

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Especificación de Agentes Core (12 agentes) | 5 pts | ⏳ |
| S02 | Especificación de Handoffs (grafo JSON) | 3 pts | ⏳ |
| S03 | Especificación de Plugins (5 principales) | 3 pts | ⏳ |
| S04 | Consolidación Ontología XML | 2 pts | ⏳ |
| S05 | Ontología del Dominio ARG | 3 pts | ⏳ |

### SCRIPT-1.21.0 — MMCO ARG-Board

> **Effort**: 8 pts  
> **Objetivo**: Modelo de coherencia para partidas ARG

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Mapeo de Jerarquía de Emergencia | 3 pts | ⏳ |
| S02 | Métrica de Coherencia Φ_ARG | 3 pts | ⏳ |
| S03 | Toy Model ARG (hola_mundo) | 2 pts | ⏳ |

### SCRIPT-1.23.0 — MMCO Editor Transmedia

> **Effort**: 8 pts  
> **Objetivo**: Modelo de coherencia para producción editorial

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Jerarquía de Emergencia Editorial | 3 pts | ⏳ |
| S02 | Métrica Φ_editor (5 Banderas) | 3 pts | ⏳ |
| S03 | Meta-Dinámica de Producción | 2 pts | ⏳ |

### SCRIPT-1.22.0 — Integración y Validación

> **Effort**: 5 pts  
> **Objetivo**: Conectar con @decoherence, @ox, 5 Banderas

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Integración con @decoherence | 2 pts | ⏳ |
| S02 | Integración con @ox y Banderas | 2 pts | ⏳ |
| S03 | Validación Cruzada | 1 pt | ⏳ |

---

## SCRIPT-1.25.0 — Blueprint Visual Index

> **Objetivo**: Refactorizar `docs/index.md` como blueprint visual navegable del Scriptorium  
> **Borrador**: [ARCHIVO/DISCO/BACKLOG_BORRADORES/NEW_GH_PAGES_INDEX/](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/NEW_GH_PAGES_INDEX/)  
> **Dependencias blandas**: FLOVE_EDITOR, METAMODEL_COMPLIANCE, MMCO, HYPERGRAPH_EDITOR

### Concepto

Una vez completadas las épicas de modelado ontológico, el index.md presentará:
- **MetaModel**: Estructura abstracta del sistema de producción transmedia
- **Hypergraph (Retro Model)**: Configuración de posibilidad y coherencia
- **Dinámicas de producción**: Flujos entre plugins, agentes y datos

### Stack Tecnológico

| Componente | Librería | Estado |
|------------|----------|--------|
| Presentación 3D | **impress.js** | ✅ Instalado |
| Diagramas | **Mermaid.js** | ✅ Integrado |
| Estilos | CSS3 | ✅ Existente |

### Sprint 1: Estructura Base ✅ COMPLETADO

| ID | Tarea | Prioridad | Estado |
|----|-------|-----------|--------|
| T1 | Crear layout `docs/_layouts/presentation.html` | Must | ✅ |
| T2 | Integrar Mermaid.js en Jekyll | Must | ✅ |
| T3 | Diseñar estructura de 7 slides | Must | ✅ |
| T4 | Crear diagrama MetaModel en Mermaid | Must | ✅ |
| T5 | Implementar navegación por teclado | Must | ✅ |
| T6 | Crear fallback noscript | Should | ✅ |
| T7 | Documentar estructura de slides | Should | ✅ |

### Sprint 2: Interactividad y Datos ✅ COMPLETADO

| ID | Tarea | Prioridad | Estado |
|----|-------|-----------|--------|
| T8 | Implementar Hypergraph visual navegable | Must | ✅ |
| T9 | Conectar datos desde `registry.json` | Should | ⏳ Pendiente FC1 |
| T10 | Añadir enlaces contextuales | Must | ✅ |
| T11 | Animaciones de transición | Should | ✅ |
| T12 | Tests accesibilidad WCAG 2.1 AA | Should | ⏳ Pendiente |
| T13 | Tutorial de navegación (overlay) | Could | ⏳ Pendiente |
| T14 | Optimizar carga (lazy loading) | Could | ⏳ Pendiente |

### Estructura de Slides

```
                         overview (z:3000)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ontology              core (0,0)             dynamics
   (x:-1500)          Agentes+Plugins           (x:1500)
   Flove/UFO                  │                  Flujos
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   hypergraph            products                 cta
   (y:1500)              (y:-1500)             (z:-1500)
   Retro Model         Teatro/Periódico        Fork/Contrib
```

### Criterios de Aceptación

**Sprint 1**: ✅ COMPLETADO
- [x] Layout presentation.html funcional
- [x] Mermaid.js renderiza en Jekyll
- [x] 7 slides navegables con flechas
- [x] Diagrama MetaModel visible
- [x] Fallback noscript operativo

**Sprint 2**: ✅ PARCIALMENTE COMPLETADO
- [x] Hypergraph muestra nodos plugins/agentes
- [x] Click en nodo navega a docs
- [ ] Métricas dinámicas desde registry (pendiente FC1)
- [x] Transiciones suaves
- [ ] Lighthouse accesibilidad ≥90 (pendiente validación)

---

## Épicas Relacionadas (Dependencias Blandas)

| Épica | Nombre | Estado | Relación |
|-------|--------|--------|----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | ✅ Aprobado | Ontología formal |
| SCRIPT-1.21.0 | MMCO ARG-Board | ✅ Aprobado | Coherencia ARG |
| SCRIPT-1.22.0 | Integración y Validación | ✅ Aprobado | Conectar sistemas |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | ✅ Aprobado | Coherencia editorial |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-27 | Crear épica SCRIPT-1.27.0 (Blueprint MMCO Compliance) — cierra gap con FC1 | Scrum |
| 2025-12-27 | ✅ Cerrar SCRIPT-1.25.0 (Blueprint Visual Index) - Sprint 1 y 2 implementados | Aleph |
| 2025-12-27 | Aprobar FC1 Ontología Formal (SCRIPT-1.20.0 a 1.23.0) | Scrum |
| 2025-12-27 | Aprobar épica SCRIPT-1.25.0 (Blueprint Visual Index) | Scrum |
| 2025-12-27 | Crear épica SCRIPT-1.25.0 (Blueprint Visual Index) | Aleph |
