# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 1.0.0-beta.4  
> **Sprint actual**: FC2 (Feature Cycle 2)  
> **Fecha inicio**: 2025-12-27

---

## Épicas Activas

| Épica | Nombre | Estado | Prioridad |
|-------|--------|--------|-----------|
| SCRIPT-1.29.0 | ScriptoriumPack (Context Bloat Mitigation) | ✅ Cerrada | P0 |
| SCRIPT-1.28.0 | Blueprint MMCO Enhancement | ✅ Cerrada | P0 |
| SCRIPT-1.27.0 | Blueprint MMCO Compliance | ✅ Cerrada | P0 |
| SCRIPT-1.26.0 | Blueprint Refinements | ✅ Cerrada | P0 |
| SCRIPT-1.20.0 | Metamodel Scriptorium | 🆕 Nueva | P1 |
| SCRIPT-1.21.0 | MMCO ARG-Board | 🆕 Nueva | P2 |
| SCRIPT-1.22.0 | Integración y Validación | 🆕 Nueva | P3 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia (Validación Paradigmática) | 🔄 Refactorizada | P0 |
| SCRIPT-1.25.0 | Blueprint Visual Index | ✅ Cerrada | Alta |

---

## SCRIPT-1.28.0 — Blueprint MMCO Enhancement

> **Objetivo**: Corregir navegación del Blueprint MMCO para presentación Talaia/Flove  
> **Sprint**: FC2 (actual)  
> **Effort total**: 3 pts  
> **Estado**: ✅ Cerrada (2025-12-27)  
> **Contexto**: Las diapositivas estaban superpuestas por usar solo eje Z sin separación X/Y

### Problema Detectado

| Aspecto | Antes | Después |
|---------|-------|---------|
| Coordenadas | Todas en (X=0, Y=0), solo variando Z | Distribuidas en eje Y vertical |
| Navegación | Diapositivas superpuestas ilegibles | Flujo vertical ascendente 0c→4 |
| Vista panorámica | Maraña apretada | Layout vertical claro |

### Solución Implementada

Layout Lineal Vertical:

```
bnp (y=-2500)         ← Nivel 0c (base)
correlations (y=-1500) ← Nivel 0b
tensors (y=-500)       ← Nivel 0a
geometry (y=500)       ← Nivel 1 (centro)
time (y=1500)          ← Nivel 2
spacetime (y=2500)     ← Nivel 3
matter (y=3500)        ← Nivel 4
overview-mmco (y=500, z=3000, scale=6)
```

### Tasks Completadas

| Task | Descripción | Estado |
|------|-------------|--------|
| T001 | Actualizar coordenadas de las 8 diapositivas | ✅ |
| T002 | Verificar navegación local con Jekyll + Playwright | ✅ |
| T003 | Tomar screenshots de validación | ✅ |
| T004 | Commit y actualizar BACKLOG | ✅ |

---

## SCRIPT-1.27.0 — Blueprint MMCO Compliance

> **Objetivo**: Refactorizar el Blueprint visual para que refleje la ontología formal (MetaModel) y la jerarquía de emergencia (MMCO) del Scriptorium  
> **Sprint**: FC2 (actual)  
> **Effort total**: 21 pts  
> **Estado**: ✅ Cerrada (2025-12-27)  
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
| S08 | Documentar modelo formal | Carta abierta en OnthologyEditor/scriptorium/ | 1 pt | ✅ |

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

### SCRIPT-1.23.0 — MMCO Editor Transmedia (Validación Paradigmática)

> **Objetivo**: Validar si MMCO+Metamodel son aplicables al Scriptorium como sistema de producción editorial  
> **Effort total**: 13 pts (reducido de 16, inversión de riesgo)  
> **Técnica**: O.R.G.A.N.I.Z.E (Graph, ToT, Self-Consistency)  
> **Dependencias**: Ninguna (autocontenida — valida antes de depender)  
> **Estado**: 🆕 Refactorizada (2025-12-28)  
> **Conversación**: [DISCO/Diciembre_25_MMCO_Editor/conversacion.md](../../ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/conversacion.md)

#### Contexto de Refactorización

Sesión editorial meta-recursiva (5W + 5 Banderas) reveló:
- Fórmula lineal `Φ_editor = Σ(w·Φ_bandera)` teóricamente injustificada
- Cada bandera opera con técnica de razonamiento diferente (CoT, ToT, Graph, Self-Consistency)
- Sin validación previa de aplicabilidad de MMCO al dominio editorial

**Decisión PO (@pathykar)**: Invertir orden — validar primero, formalizar después.

#### Stories

| ID | Story | Técnica | Effort | Estado |
|----|-------|---------|--------|--------|
| S01 | ¿Es MMCO aplicable a producción editorial? | Graph of Thought | 5 pts | ⏳ |
| S02 | Definición operacional de coherencia editorial | ToT Multi-Path | 5 pts | ⏳ |
| S03 | Toy Model MVP | Self-Consistency | 3 pts | ⏳ |

#### S01: ¿Es MMCO aplicable? (5 pts)

| Task | Descripción | Estado |
|------|-------------|--------|
| T01 | Mapear las 9 preguntas técnicas a nodos de grafo | ⏳ |
| T02 | Identificar preguntas bloqueantes (dependency analysis) | ⏳ |
| T03 | Responder las 3 preguntas bloqueantes (1, 5, 7) | ⏳ |
| T04 | Documentar gaps irresolubles (exit criteria) | ⏳ |

**DoD**: `mmco_applicability_analysis.md` con veredicto binario (✅ Aplicable / ❌ No aplicable)

#### S02: Definición de coherencia editorial (5 pts)

| Task | Descripción | Estado |
|------|-------------|--------|
| T05 | Path 1: Coherencia lógica (@blueflag, CoT) | ⏳ |
| T06 | Path 2: Coherencia de poder (@blackflag, Graph) | ⏳ |
| T07 | Path 3: Coherencia material (@redflag, CoT+Validation) | ⏳ |
| T08 | Path 4: Coherencia de límites (@yellowflag, ToT) | ⏳ |
| T09 | Path 5: Coherencia de registro (@orangeflag, Self-Consistency) | ⏳ |
| T10 | Síntesis: Φ unificada vs dimensiones ortogonales | ⏳ |

**DoD**: `coherence_definition.md` con propuesta formal de Φ

#### S03: Toy Model MVP (3 pts)

| Task | Descripción | Estado |
|------|-------------|--------|
| T11 | Crear fixture: sprint actual como input | ⏳ |
| T12 | Ejecutar 5 banderas sobre fixture | ⏳ |
| T13 | Calcular Φ según definición S02 | ⏳ |
| T14 | Validar consistencia (3 ejecuciones) | ⏳ |

**DoD**: `phi_editor_mvp.py` ejecutable + reporte de consistencia

#### Criterios de Éxito

- [ ] S01 produce veredicto binario (✅/❌)
- [ ] S02 produce definición formal de Φ
- [ ] S03 produce script ejecutable
- [ ] Si alguna story falla → pivot documentado

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

---

## SCRIPT-1.29.0 — ScriptoriumPack (Context Bloat Mitigation) ✅

> **Objetivo**: Crear plugin que encapsula instrucciones core del Scriptorium con patrones `applyTo` optimizados para reducir context bloat  
> **Sprint**: FC2 (actual)  
> **Effort total**: 28 pts (Fase 1: 13 pts ✅ | Fase 2: 15 pts ✅)  
> **Estado**: ✅ Completado (2025-12-28)  
> **Contexto**: [critica-prompting-pathykar.md](../../ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/critica-prompting-pathykar.md) + [nfr-context-bloat.prompt.md](../../ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/nfr-context-bloat.prompt.md)

### Problema Identificado

| Métrica | Valor Inicial | Post Fase 1 | Post Fase 2 |
|---------|--------------|-------------|-------------|
| Tokens por request | 117,877 | ~80,000 | **~50,000** |
| Líneas agentes core | 1,240 | 1,240 | **369 (70% ↓)** |
| Ratio señal/ruido | ~3% | ~25% | **>50%** |
| Attachments relevantes | 26% | ~60% | **>80%** |

**Causas raíz**:
1. Patrones `applyTo` demasiado amplios (`**/*.md` captura todo)
2. Instructions redundantes con copilot-instructions.md
3. Sin filtrado por tipo de tarea (edición vs. configuración)
4. Falta de separación por dominio funcional

### Solución: Plugin ScriptoriumPack

Encapsular las instrucciones core en un plugin con:
- **Activación selectiva**: Solo se carga cuando es necesario
- **Patrones `applyTo` específicos**: Por tipo de tarea, no por ubicación
- **Documentos compactos**: Aplicar patrón "resumen ejecutivo" (isSummarized pattern)

### Arquitectura

```
.github/plugins/scriptorium-pack/
├── manifest.md                                    # Metadatos del plugin
├── agents/
│   └── scriptorium-pack.agent.md                 # Bridge agent para VS Code
├── instructions/
│   ├── ox-ontologia.instructions.md              # Índice de agentes (activación: @ox)
│   ├── periodico.instructions.md                 # Edición noticias (activación: DISCO/**/conversacion*)
│   └── submodulo-integracion.instructions.md     # Configuración submódulos (activación: scripts/**)
└── docs/
    └── context-optimization.md                   # Documentación del patrón
```

### Patrones `applyTo` Optimizados

| Instrucción | Antes (Problemático) | Después (Optimizado) |
|-------------|----------------------|----------------------|
| ox-ontologia | `.github/agents/*.agent.md, README.md` | `.github/agents/@ox*, .github/**/ox*.md` |
| periodico | `ARCHIVO/NOTICIAS/**/*.md, ARCHIVO/DISCO/**/*.md` | `ARCHIVO/DISCO/**/conversacion*.md, ARCHIVO/NOTICIAS/**/*.md` |
| submodulo-integracion | `scripts/**, .github/plugins/**` | `scripts/setup-*.sh, .gitmodules, **/README-SCRIPTORIUM.md` |

**Principio DRY aplicado**:
- Ninguna instrucción debe auto-inyectarse si el usuario no está trabajando activamente en esa tarea
- Priorizar patrones por **nombre de archivo** sobre patrones por **ubicación**

### isSummarized Pattern

> **Nota técnica**: `isSummarized` es una propiedad interna de VS Code Copilot Chat que indica cuando un attachment ha sido resumido automáticamente. NO es configurable por el usuario, pero el patrón es aplicable al diseño de documentos.

**Aplicación del patrón**:

```markdown
<!-- Documento largo tradicional: 8,849 líneas → 117K tokens -->

<!-- Documento optimizado con patrón isSummarized: -->
# Documento X

> **Resumen ejecutivo**: [2-3 líneas con la esencia]

## Índice de secciones
| Sección | Líneas | Para quién |
|---------|--------|------------|
| Referencia rápida | 1-50 | Usuarios |
| Detalles técnicos | 51-200 | Desarrolladores |

## Referencia rápida (siempre incluido)
[Contenido esencial]

## Detalles técnicos (expandir solo si necesario)
<!-- Este contenido se omite por defecto, similar a isSummarized -->
```

**Regla**: Los primeros 50-100 líneas de cualquier instrucción deben ser auto-contenidos y útiles sin leer el resto.

### Compactación de copilot-instructions.md

**Estado actual**: 107 líneas con redundancias

**Objetivo**: <50 líneas, delegando a ScriptoriumPack

| Sección Actual | Acción |
|----------------|--------|
| §1 Identidad | ✅ Mantener (esencial, 10 líneas) |
| §2 Protocolo DevOps | → Referencia a DEVOPS.md |
| §3 Taxonomía Agentes | → Delegar a ox-ontologia.instructions.md |
| §4 Instrucciones Contenido | → Delegar a ScriptoriumPack |
| §5 Flujo de Trabajo | → Mover a prompt planificar-sprint |
| §6 Reglas de Oro | ✅ Mantener (esencial, 8 líneas) |
| §7 Plugins/Submodules | → Referencia a PLUGINS.md |
| §8 Índice DRY | → Delegar a @indice |

**Resultado esperado**: copilot-instructions.md con ~40 líneas, solo:
- Identidad del workspace
- Referencias DRY a fuentes de verdad
- Reglas de oro

### Stories

| ID | Story | Descripción | Effort | Estado |
|----|-------|-------------|--------|--------|
| S01 | Crear estructura plugin | manifest.md + bridge agent + carpetas | 2 pts | ✅ |
| S02 | Migrar ox-ontologia | Mover a plugin + nuevo applyTo | 2 pts | ✅ |
| S03 | Migrar periodico | Mover a plugin + nuevo applyTo | 2 pts | ✅ |
| S04 | Migrar submodulo-integracion | Mover a plugin + nuevo applyTo | 2 pts | ✅ |
| S05 | Compactar copilot-instructions | Reducir a <50 líneas DRY | 2 pts | ✅ |
| S06 | Actualizar settings.json | Añadir rutas de ScriptoriumPack | 1 pt | ✅ |
| S07 | Documentar patrón isSummarized | Guía en context-optimization.md | 1 pt | ✅ |
| S08 | Validar métricas | Medir tokens pre/post, actualizar tabla | 1 pt | ⏳ |

### Stories de Extensión (Fase 2: Refactorización de Agentes Core) ✅

> **Contexto**: Los agentes principales (`ox.agent.md`, `aleph.agent.md`, `indice.agent.md`) tenían entre 200-632 líneas cada uno. Refactorizados aplicando patrón isSummarized.

| ID | Story | Descripción | Effort | Estado |
|----|-------|-------------|--------|--------|
| S09 | Aplicar patrón isSummarized a ox.agent.md | 632→131 líneas (79% reducción) | 3 pts | ✅ |
| S10 | Aplicar patrón isSummarized a aleph.agent.md | 389→140 líneas (64% reducción) | 3 pts | ✅ |
| S11 | Aplicar patrón isSummarized a indice.agent.md | 219→98 líneas (55% reducción) | 2 pts | ✅ |
| S12 | Extraer handoffs a AGENTS.md | Índice centralizado creado en `.github/agents/AGENTS.md` | 3 pts | ✅ |
| S13 | Crear instrucción agent-handoffs.instructions.md | Creada en scriptorium-pack/instructions/ | 2 pts | ✅ |
| S14 | Validar ratio tokens/agente | Total: 1,240→369 líneas (70% reducción) | 1 pt | ✅ |
| S15 | Documentar arquitectura agentes optimizados | Guía en scriptorium-pack/docs/agent-optimization.md | 1 pt | ✅ |

**Effort Fase 2**: 15 pts ✅  
**Effort Total SCRIPT-1.29.0**: 28 pts (13 Fase 1 ✅ + 15 Fase 2 ✅)

### Detalle de Stories Fase 2

#### S09: Aplicar patrón isSummarized a ox.agent.md (3 pts)

**Problema**: ox.agent.md tiene 425+ líneas con JSON del índice maestro de agentes incluido. Cuando aparece en handoffs o el usuario invoca @ox, se inyectan todas las líneas.

**Solución**: Reestructurar con patrón isSummarized:

```markdown
<!-- ANTES: 425 líneas, todo incluido -->

<!-- DESPUÉS: ~80 líneas core + referencias -->
---
name: Ox
description: "Oráculo del Scriptorium: conoce y gestiona el índice de todos los agentes."
---

# Agente: Ox (Oráculo)

> **Resumen**: Conoce dónde está cada agente, genera documentación, diagnostica el sistema.

## Capacidades Core

| Capacidad | Handoff | Ejemplo |
|-----------|---------|---------|
| Consultar agente | "¿Qué agente uso para...?" | @ox ¿Qué agente publica en GH-Pages? |
| Generar docs | "Generar README" | @ox generar sección agentes |
| Diagnosticar | "Diagnosticar agentes" | @ox listar handoffs rotos |

## Índice de Agentes

→ Ver [AGENTS.md](AGENTS.md) para índice completo (DRY)

## Handoffs disponibles

→ Ver sección `handoffs:` en frontmatter o [AGENTS.md § Handoffs de Ox]

<!-- Secciones expandibles (no incluir por defecto) -->
<!-- El índice maestro JSON ahora está en AGENTS.md, no duplicado aquí -->
```

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T01 | Extraer índice JSON a AGENTS.md | 🆕 |
| T02 | Reescribir ox.agent.md con patrón isSummarized | 🆕 |
| T03 | Actualizar handoffs del frontmatter | 🆕 |
| T04 | Validar que @ox sigue funcionando | 🆕 |

#### S10: Aplicar patrón isSummarized a aleph.agent.md (3 pts)

**Problema**: aleph.agent.md tiene 280+ líneas con secciones de protocolo DevOps, orquestación de auditores, ruptura metodológica, etc. Mucha redundancia con DEVOPS.md.

**Solución**:

```markdown
<!-- DESPUÉS: ~60 líneas core -->
---
name: Aleph
description: "Agente principal. Produce texto fundacional serializado (12 capítulos, 2026)."
---

# Agente: Aleph (Fundacional)

> **Resumen**: Redacta, planifica y gestiona el proyecto Fundación con protocolo DevOps.

## Rol

Producir un texto fundacional en 12 capítulos durante 2026.

## DevOps

→ Ver [DEVOPS.md](../DEVOPS.md) para protocolo completo (DRY)

## Auditores disponibles

| Auditor | Cuándo | Qué pregunta |
|---------|--------|--------------|
| @blueflag | Cerrar Tesis | Evidencia, utilidad, falsificabilidad |
| @blackflag | Cerrar Sacrificio | Coste represivo, autodefensa |
| @redflag | Cerrar Mecanismo | Escala, enforcement, suministro |
| @revisor | Cerrar borrador | Coherencia con ARCHIVO |

→ Para detalles de cada auditor: [agents/](.) o @ox

## Método de trabajo (v2)

1. Desplazamiento (temporal/antropológico/escalar)
2. Repertorio (futuro cancelado recuperado)
3. Mecanismo (arquitectura concreta)
4. Sacrificio (qué se pierde)
5. Sombra (cómo fallaría)

→ Para checklist completo: `ARCHIVO/marco/`
```

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T05 | Identificar secciones redundantes con DEVOPS.md | 🆕 |
| T06 | Reescribir aleph.agent.md con patrón isSummarized | 🆕 |
| T07 | Validar que handoffs siguen operativos | 🆕 |

#### S11: Aplicar patrón isSummarized a indice.agent.md (2 pts)

**Problema**: indice.agent.md tiene ~180 líneas describiendo tests de coherencia y ejemplos de uso que podrían ser referencias DRY.

**Solución**: Compactar a ~50 líneas con referencias a Funcional.md/Tecnico.md.

#### S12: Extraer handoffs a AGENTS.md (3 pts)

**Problema**: Cada agente declara sus handoffs en el frontmatter. Cuando el modelo necesita saber qué handoffs hay disponibles, debe leer TODOS los agentes.

**Solución**: Crear AGENTS.md como índice centralizado:

```markdown
# Índice de Agentes — Aleph Scriptorium

## Taxonomía

| Capa | Agentes |
|------|---------|
| UI | @aleph, @revisor, @periodico |
| Backend | @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag |
| Sistema | @vestibulo, @cartaspuerta |
| Meta | @ox, @pluginmanager, @indice |

## Handoffs por Agente

### @aleph
| Label | Target | Descripción |
|-------|--------|-------------|
| Auditoría de verdad | @blueflag | Tests de evidencia |
| ... | ... | ... |

### @ox
| Label | Target | Descripción |
|-------|--------|-------------|
| Generar README | @ox | Sección de agentes |
| ... | ... | ... |
```

**Beneficio**: El modelo puede leer UN archivo (AGENTS.md) en lugar de 15+ archivos de agentes.

#### S13: Crear instrucción agent-handoffs.instructions.md (2 pts)

**applyTo**: `.github/agents/*.agent.md, .github/agents/AGENTS.md`

**Contenido**: Instrucciones para navegar el índice de handoffs y cuándo activar cada uno.

#### S14-S15: Validación y Documentación (2 pts)

- Medir tokens antes/después de la refactorización
- Documentar la nueva arquitectura en scriptorium-pack/docs/

### Métricas Target Fase 2

| Archivo | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| ox.agent.md | 425 líneas | <100 líneas | ~76% |
| aleph.agent.md | 280 líneas | <80 líneas | ~71% |
| indice.agent.md | 180 líneas | <60 líneas | ~67% |
| **Total agentes core** | ~885 líneas | ~240 líneas | **~73%** |

**Impacto estimado en tokens**:
- Antes: ~30K tokens cuando se inyectan agentes core
- Después: ~8K tokens + referencias DRY
- Reducción: ~22K tokens por request

### Criterios de Aceptación Fase 2

- [ ] Cada agente core tiene ≤100 líneas
- [ ] AGENTS.md existe con índice centralizado de handoffs
- [ ] Instrucción agent-handoffs funciona en contexto correcto
- [ ] Reducción medible de tokens por request (>50%)
- [ ] Sin regresión funcional en handoffs existentes

### Detalle de Stories

#### S01: Crear estructura plugin (2 pts)

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T01 | Crear `.github/plugins/scriptorium-pack/manifest.md` | ✅ |
| T02 | Crear bridge agent `scriptorium-pack.agent.md` | ✅ |
| T03 | Crear carpetas instructions/, docs/ | ✅ |
| T04 | Registrar en registry.json | ✅ |

**manifest.md propuesto**:

```yaml
---
id: scriptorium-pack
name: "ScriptoriumPack (Core Instructions)"
version: "1.0.0"
description: "Plugin que encapsula instrucciones core del Scriptorium con activación selectiva. Reduce context bloat al cargar solo instrucciones relevantes por tipo de tarea."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=1.0.0"
dependencies: []

agents:
  - name: "ScriptoriumPack"
    file: "agents/scriptorium-pack.agent.md"
    description: "Bridge agent para activación de instrucciones core."

instructions:
  - name: "ox-ontologia"
    file: "instructions/ox-ontologia.instructions.md"
    description: "Contexto del índice de agentes. Se activa con @ox."
    applyTo: ".github/agents/@ox*, .github/**/ox*.md"
    
  - name: "periodico"
    file: "instructions/periodico.instructions.md"
    description: "Método 5W+Banderas para edición de noticias."
    applyTo: "ARCHIVO/DISCO/**/conversacion*.md, ARCHIVO/NOTICIAS/**/*.md"
    
  - name: "submodulo-integracion"
    file: "instructions/submodulo-integracion.instructions.md"
    description: "Protocolo de instalación y configuración de submódulos."
    applyTo: "scripts/setup-*.sh, .gitmodules, **/README-SCRIPTORIUM.md"

handoffs:
  - label: "Activar contexto de agentes (@ox)"
    agent: "ScriptoriumPack"
  - label: "Activar modo edición periodística"
    agent: "ScriptoriumPack"
  - label: "Activar modo configuración submódulos"
    agent: "ScriptoriumPack"
---
```

#### S02-S04: Migrar instrucciones (6 pts total)

**Cambios en cada archivo**:

1. **ox-ontologia.instructions.md**
   - Antes: `applyTo: ".github/agents/*.agent.md, README.md, .github/copilot-instructions.md"`
   - Después: `applyTo: ".github/agents/@ox*, .github/**/ox*.md, .github/agents/AGENTS.md"`
   - Razón: Solo activar cuando se trabaja explícitamente con @ox o el índice

2. **periodico.instructions.md**
   - Antes: `applyTo: "ARCHIVO/NOTICIAS/**/*.md, ARCHIVO/DISCO/**/*.md"`
   - Después: `applyTo: "ARCHIVO/DISCO/**/conversacion*.md, ARCHIVO/NOTICIAS/**/2*.md"`
   - Razón: Solo activar en archivos de conversación editorial, no en TODO el DISCO

3. **submodulo-integracion.instructions.md**
   - Antes: `applyTo: "scripts/**, .github/plugins/**, ARCHIVO/DISCO/BACKLOG_BORRADORES/**"`
   - Después: `applyTo: "scripts/setup-*.sh, .gitmodules, **/README-SCRIPTORIUM.md, scripts/verify-*.sh"`
   - Razón: Solo activar en operaciones de configuración de submódulos

#### S05: Compactar copilot-instructions.md (2 pts)

**Antes** (107 líneas):
```markdown
# Instrucciones Globales (Copilot)
## 1. Identidad del Workspace (20 líneas)
## 2. Protocolo DevOps (10 líneas - redundante con DEVOPS.md)
## 3. Taxonomía de Agentes (25 líneas - redundante con ox.agent.md)
## 4. Instrucciones de Contenido (10 líneas)
## 5. Flujo de Trabajo (15 líneas - redundante con scrum)
## 6. Reglas de Oro (10 líneas)
## 7. Plugins y Submodules (12 líneas - redundante con PLUGINS.md)
## 8. Índice DRY (15 líneas - redundante con @indice)
```

**Después** (~45 líneas):
```markdown
# Instrucciones Globales — Aleph Scriptorium

> Framework de escritura asistida por IA para proyectos de largo aliento.

## Identidad
- **Nombre**: Aleph Scriptorium
- **Versión**: Ver [package.json](../package.json)
- **Web**: [escrivivir-co.github.io/aleph-scriptorium](...)

## Fuentes de Verdad (DRY)

| Dominio | Fuente | Agente |
|---------|--------|--------|
| DevOps | [DEVOPS.md](DEVOPS.md) | @aleph |
| Agentes | [ox.agent.md](agents/ox.agent.md) | @ox |
| Plugins | [PLUGINS.md](PLUGINS.md) | @pluginmanager |
| Backlogs | [BACKLOG-*.md](.) | @scrum |

## Reglas de Oro

1. **DRY**: Referenciar fuentes de verdad, no duplicar
2. **Ubicación canónica**:
   - El *qué* (contenido) → `ARCHIVO/`
   - El *cómo* (reglas) → `.github/instructions/`
   - El *cuándo* (plan) → Backlogs
   - El *quién* (agentes) → `@ox`
3. **En caso de duda**: Invocar `@ox` para orientación

## Instrucciones Contextuales

Las instrucciones específicas se cargan automáticamente según el contexto:
- Ver [ScriptoriumPack](plugins/scriptorium-pack/) para instrucciones core
- Ver [PLUGINS.md](PLUGINS.md) para extensiones disponibles
```

#### S06: Actualizar settings.json (1 pt)

Añadir en `.vscode/settings.json`:

```json
{
  "chat.instructionsFilesLocations": {
    ".github/plugins/scriptorium-pack/instructions": true
  }
}
```

#### S07: Documentar patrón isSummarized (1 pt)

Crear `context-optimization.md` en el plugin con:
- Qué es `isSummarized` (propiedad interna de VS Code)
- Cómo aplicar el patrón a documentos propios
- Checklist para validar instrucciones optimizadas

#### S08: Validar métricas (1 pt)

Script de diagnóstico que mida:
- Tokens por request (antes/después)
- Número de instrucciones auto-inyectadas
- Tiempo de respuesta promedio

### Criterios de Aceptación

- [ ] Plugin scriptorium-pack instalado y registrado
- [ ] 3 instrucciones migradas con nuevos patrones applyTo
- [ ] copilot-instructions.md reducido a <50 líneas
- [ ] Tokens por request promedio <50K (reducción >50%)
- [ ] Documentación de patrón isSummarized disponible
- [ ] Tests de activación: cada instrucción solo se carga en su contexto

### Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Patrones muy restrictivos | Media | Alto | Testear con casos de uso reales |
| Breaking changes en flujos | Baja | Alto | Mantener fallback manual |
| VS Code no detecta plugin | Baja | Medio | Verificar settings.json |

### Dependencias

- **Blandas**: SCRIPT-1.27.0 (Blueprint MMCO) para documentar visualmente
- **Duras**: Ninguna

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-28 | 🔄 Refactorizar SCRIPT-1.23.0 como Validación Paradigmática (5W+Banderas→O.R.G.A.N.I.Z.E) — 16→13 pts, sin dependencias | @pathykar + @periodico |
| 2025-12-28 | ✅ Cerrar SCRIPT-1.29.0 Fase 2 (S09-S15, 15 pts) — agentes core refactorizados: 1240→369 líneas (70% reducción) | Aleph |
| 2025-12-28 | Extender SCRIPT-1.29.0 con Fase 2: refactorización de agentes core (S09-S15, +15 pts) | Scrum |
| 2025-12-28 | ✅ Implementar SCRIPT-1.29.0 Fase 1 (S01-S07, 12 pts) — plugin scriptorium-pack operativo | Aleph |
| 2025-12-28 | Crear épica SCRIPT-1.29.0 (ScriptoriumPack Context Bloat Mitigation) | Scrum |
| 2025-12-27 | Crear épica SCRIPT-1.27.0 (Blueprint MMCO Compliance) — cierra gap con FC1 | Scrum |
| 2025-12-27 | ✅ Cerrar SCRIPT-1.25.0 (Blueprint Visual Index) - Sprint 1 y 2 implementados | Aleph |
| 2025-12-27 | Aprobar FC1 Ontología Formal (SCRIPT-1.20.0 a 1.23.0) | Scrum |
| 2025-12-27 | Aprobar épica SCRIPT-1.25.0 (Blueprint Visual Index) | Scrum |
| 2025-12-27 | Crear épica SCRIPT-1.25.0 (Blueprint Visual Index) | Aleph |
