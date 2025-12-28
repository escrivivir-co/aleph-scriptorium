# Backlog Sprint 1: Ontología Formal del Scriptorium

> **Sprint**: 1 — Ontología Formal
> **Feature Cycle**: FC1
> **Modelo**: Secuencial con solapamiento (4 iteraciones)
> **Effort total**: 37 puntos
> **Estado**: ✅ Aprobado y publicado en BACKLOG-SCRIPTORIUM.md (2025-12-27)

---

## Épicas

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | Scriptorium | 16 pts | P0 |
| SCRIPT-1.21.0 | MMCO ARG-Board | Scriptorium | 8 pts | P1 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | Scriptorium | 8 pts | P1 |
| SCRIPT-1.22.0 | Integración y Validación | Scriptorium | 5 pts | P2 |

---

## Feature Cycle 1: Estructura

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

| Iteración | Nombre | Objetivo | Effort |
|-----------|--------|----------|--------|
| FC1-I1 | Metamodel Scriptorium | Especificación formal de agentes/plugins/dominios | 43% (16 pts) |
| FC1-I2 | MMCO ARG-Board | Modelo de coherencia para partidas ARG | 22% (8 pts) |
| FC1-I3 | MMCO Editor Transmedia | Modelo de coherencia para producción editorial | 22% (8 pts) |
| FC1-I4 | Integración | Conectar con @decoherence, @ox, banderas | 13% (5 pts) |

---

## Recursos Transversales: O.R.G.A.N.I.Z.E + P.R.O.M.P.T

> **DRY**: Esta sección referencia documentos canónicos, no duplica contenido.

### Pipeline de Ontología a Agente

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 FC1: Ontología Formal → Agente Ejecutable                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Metamodel/MMCO      O.R.G.A.N.I.Z.E         P.R.O.M.P.T                    │
│  (Iteraciones 1-3)   (Razonamiento)          (System Prompt)                │
│                                                                             │
│  ┌──────────────┐    ┌──────────────────┐    ┌─────────────────────┐       │
│  │ Ontología    │ ─▶ │ Técnica CoT/ToT/ │ ─▶ │ Behavioral Gap +    │       │
│  │ XML/JSON     │    │ Graph validada   │    │ Anti-enshittification│      │
│  └──────────────┘    └──────────────────┘    └─────────────────────┘       │
│                                                                             │
│  Output: entities.xml  Output: Análisis     Output: .agent.md              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Documentos de Referencia

| Documento | Ubicación | Propósito |
|-----------|-----------|----------|
| Guía O.R.G.A.N.I.Z.E | `ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/02_guia-organize.md` | Selección de técnica de razonamiento |
| PromptCraft (P.R.O.M.P.T) | `ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/PromptCraft.md` | Generación de system prompts |
| Ontological Reasoning | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/ontological_reasoning_guide.md` | Guía completa de técnicas |

### Aplicación por Iteración

| Iteración | Genera | Consume P.R.O.M.P.T |
|-----------|--------|--------------------|
| I1: Metamodel | `entities.xml`, `handoffs.json` | FC2 (agentes core) |
| I2: MMCO ARG | `Φ_arg`, niveles 0c→4 | @arrakis, @gitarg |
| I3: MMCO Editor | `Φ_editor`, 5 banderas | @blueflag..@orangeflag |
| I4: Integración | @decoherence actualizado | Validación cruzada |

---

## Iteración 1: Metamodel Scriptorium

**Objetivo**: Aplicar el framework Metamodel a la estructura del Scriptorium (agentes, plugins, handoffs) y dominios específicos (ARG)  
**Effort**: 16 puntos

### Stories

#### SCRIPT-1.20.0-S01: Especificación de Agentes Core
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `ENTITY_TEMPLATE` para @aleph, @ox, @indice | 2 | ⏳ |
| T002 | Modelar las 5 banderas como `ENTITY_TEMPLATE` | 2 | ⏳ |
| T003 | Documentar relaciones de herencia (capas UI/Backend/Meta) | 1 | ⏳ |

**Definition of Done**: 
- [ ] 12 agentes core modelados con ENTITY_TEMPLATE
- [ ] Archivo `agents_entities.xml` generado
- [ ] Validación de coherencia UFO pasando

---

#### SCRIPT-1.20.0-S02: Especificación de Handoffs
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T004 | Crear `RELATIONSHIP_TEMPLATE` para handoffs | 1 | ⏳ |
| T005 | Generar grafo de handoffs en JSON | 1 | ⏳ |
| T006 | Validar cardinalidad y direccionalidad | 1 | ⏳ |

**Definition of Done**:
- [ ] `handoffs_graph.json` con todos los handoffs del sistema
- [ ] Grafo visualizable (exportable a Mermaid)
- [ ] Sin ciclos infinitos detectados

---

#### SCRIPT-1.20.0-S03: Especificación de Plugins
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Modelar 5 plugins principales como LAYER_2_CORE_DOMAIN | 1 | ⏳ |
| T008 | Definir relaciones plugin↔bridge↔agentes | 1 | ⏳ |
| T009 | Crear JSON Schema para manifest.md | 1 | ⏳ |

**Definition of Done**:
- [ ] 5 plugins modelados (arg-board, teatro, scrum, agent-creator, enciclopedia)
- [ ] `manifest_schema.json` validando estructura
- [ ] Documentación de LAYER_2 actualizada

---

#### SCRIPT-1.20.0-S04: Consolidación Ontología
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T010 | Generar `scriptorium_ontology.xml` completo | 1 | ⏳ |
| T011 | Crear `README-ONTOLOGY.md` en OnthologyEditor/scriptorium/ | 1 | ⏳ |

**Definition of Done**:
- [ ] XML validable contra schema
- [ ] README con ejemplos de uso
- [ ] Carpeta `OnthologyEditor/scriptorium/` creada

---

#### SCRIPT-1.20.0-S05: Ontología del Dominio ARG
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Modelar entidades ARG: Teatro, Obra, Acto, Escena, Personaje, Actor | 1 | ⏳ |
| T013 | Modelar entidades mecánicas: BOE, BDC, Disposición, Turno, Commit-movimiento | 1 | ⏳ |
| T014 | Definir relaciones: Actor↔Personaje, Turno↔Commit, BOE↔Obra, Arquetipo↔Personaje | 1 | ⏳ |

**Concepto**: ARG-Board tiene un dominio semántico rico que va más allá de la infraestructura de agentes. Esta story captura conceptos como:
- **Teatro**: Obra, Acto, Escena (estructura narrativa)
- **Actores**: Personaje (rol narrativo), Actor (quien interpreta), Arquetipos (Herald, Mentor...)
- **Tablero**: BOE (registro inmutable), BDC (conversaciones), Disposición (eventos)
- **Mecánica**: Turno (unidad temporal), Commit (movimiento), Estado de partida

**Definition of Done**:
- [ ] `modules/arg_domain.xml` con entidades del dominio ARG
- [ ] Integrado con `scriptorium_ontology.xml` como módulo
- [ ] Validación cruzada con MMCO ARG (Iteración 2)
- [ ] Arquetipos del Camino del Héroe modelados (12 etapas)

---

## Iteración 2: MMCO ARG-Board

**Objetivo**: Aplicar el framework MMCO a la dinámica de partidas ARG  
**Effort**: 8 puntos

### Stories

#### SCRIPT-1.21.0-S01: Mapeo de Jerarquía de Emergencia
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T015 | Documentar mapeo MMCO layers → ARG concepts | 1 | ⏳ |
| T016 | Crear `arg_emergence_hierarchy.xml` | 1 | ⏳ |
| T017 | Extender ontology/ con módulo arg_coherence.xml | 1 | ⏳ |

**Definition of Done**:
- [ ] Tabla de mapeo en emergence_layers.md
- [ ] XML con 7 niveles (0c→4) instanciados para ARG
- [ ] Integrado con MMCO/xml/ontology/

---

#### SCRIPT-1.21.0-S02: Métrica de Coherencia Φ_ARG
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T018 | Extender phi_mmco.py con caso ARG | 1 | ⏳ |
| T019 | Definir inputs: BOE, BDC, theater_state | 1 | ⏳ |
| T020 | Crear tests unitarios para phi_arg | 1 | ⏳ |

**Definition of Done**:
- [ ] `phi_arg.py` ejecutable
- [ ] Tests pasando con fixture de partida ejemplo
- [ ] Documentación de inputs/outputs

---

#### SCRIPT-1.21.0-S03: Toy Model ARG
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T021 | Crear fixture: partida "hola_mundo" como caso de prueba | 1 | ⏳ |
| T022 | Ejecutar toy model completo y documentar resultados | 1 | ⏳ |

**Definition of Done**:
- [ ] Fixture en toy_models/arg/hola_mundo/
- [ ] Output: métricas de coherencia por turno
- [ ] Visualización de evolución Φ_ARG

---

## Iteración 3: MMCO Editor Transmedia

**Objetivo**: Validar si MMCO+Metamodel son aplicables al Scriptorium como sistema de producción editorial  
**Effort**: 13 puntos (refactorizado de 8 original)  
**Estado**: 🔄 Refactorizado como Validación Paradigmática (2025-12-28)

> **⚠️ REFACTORIZADO (Feedback Talaia/Flove/LOW)**: Esta iteración pasó de "formalización" a "validación paradigmática". La fórmula lineal Φ_editor = Σ(w·Φ_bandera) fue descartada por inconmensurabilidad entre espacios de razonamiento.

### Concepto Central (Actualizado)

El Scriptorium no solo *valida* coherencia (vía Banderas), sino que *produce* coherencia a través de un proceso emergente. MMCO captura esta dinámica, pero **cada bandera opera en un nivel de emergencia diferente**:

```
ARCHIVO (BNP) → Agentes (correlaciones) → Workspace (tensores) →
→ Proyectos (geometría) → Sprints (tiempo) → Publicaciones (espacio-tiempo) →
→ Obras finales (materia)
```

### Stories

#### SCRIPT-1.23.0-S01: Jerarquía de Emergencia Editorial
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T023 | Documentar mapeo MMCO layers → conceptos editoriales | 1 | ⏳ |
| T024 | Crear `editor_emergence_model.xml` con 7 niveles | 1 | ⏳ |
| T025 | Integrar con MMCO/xml/ontology/ | 1 | ⏳ |

**Definition of Done**:
- [ ] Tabla de mapeo en emergence_layers_editor.md
- [ ] XML validable con niveles 0c→4 instanciados
- [ ] Diferencias con ARG documentadas

---

#### SCRIPT-1.23.0-S02: Métrica Φ_editor (5 Banderas)
**Effort**: 5 pts (ampliado por caracterización MMCO)

> **⚠️ REFACTORIZADO (2025-12-28)**: Fórmula lineal descartada. Cada bandera opera en un nivel MMCO diferente con técnica O.R.G.A.N.I.Z.E distinta.

**Caracterización MMCO de las 5 Banderas**:

| Bandera | Nivel MMCO | Operador Φ | Técnica O.R.G.A.N.I.Z.E | Espacio de Razonamiento |
|---------|------------|------------|------------------------|-------------------------|
| 🔵 Blueflag | 0b (Correlaciones) | Φ_verdad | **CoT Sequential** | Verificación paso a paso de evidencia |
| ⚫ Blackflag | 0a (Tensores) | Φ_poder | **Graph of Thought** | Mapeo de redes de influencia y captura |
| 🔴 Redflag | 1 (Proto-geometría) | Φ_material | **CoT + Validation** | Cálculo de escala, enforcement, suministro |
| 🟡 Yellowflag | 2 (Pseudo-tiempo) | Φ_límites | **ToT Multi-Path** | Exploración de condiciones y fronteras |
| 🟠 Orangeflag | 3 (Espacio-tiempo) | Φ_registro | **Self-Consistency** | Validación multi-auditorio |

**Propiedad de Inconmensurabilidad**:
- Las banderas operan en espacios de razonamiento **ortogonales**
- Φ_verdad (epistemología) ≠ Φ_poder (política) ≠ Φ_material (economía)
- La suma lineal `Σ(w·Φ)` pierde información de estructura ontológica

| Task ID | Descripción | Técnica | Nivel MMCO | Estado |
|---------|-------------|---------|------------|--------|
| T026 | Path 1: Coherencia lógica | @blueflag + CoT | 0b | ⏳ |
| T027 | Path 2: Coherencia de poder | @blackflag + Graph | 0a | ⏳ |
| T028 | Path 3: Coherencia material | @redflag + CoT+Val | 1 | ⏳ |
| T029 | Path 4: Coherencia de límites | @yellowflag + ToT | 2 | ⏳ |
| T030 | Path 5: Coherencia de registro | @orangeflag + SelfCons | 3 | ⏳ |
| T031 | Síntesis: Φ como grafo de operadores (no lineal) | Ensemble | 4 | ⏳ |

**Fórmula propuesta (Post-Lineal)**:
```
Φ_editor = f(Φ_verdad, Φ_poder, Φ_material, Φ_límites, Φ_registro)

Donde f es una función de grafo:
- Nodos: Φ_bandera (con su técnica específica)
- Aristas: Relaciones de dependencia/tensión entre espacios
- Output: Vector multidimensional, NO escalar
```

**Definition of Done**:
- [ ] `phi_editor.py` ejecutable con composición no-lineal
- [ ] Caracterización MMCO de cada bandera documentada
- [ ] Grafo de dependencias entre Φ definido
- [ ] Tests pasando con fixture de sprint

---

#### SCRIPT-1.23.0-S03: Meta-Dinámica de Producción
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T029 | Modelar ciclo Sprint→Commit→Release como meta-dinámica | 1 | ⏳ |
| T030 | Crear `production_dynamics.xml` | 1 | ⏳ |

**Definition of Done**:
- [ ] XML con operadores de transición de estado
- [ ] Integración con plugin Scrum documentada
- [ ] Ejemplo: cómo un sprint "colapsa" potencialidad en texto

---

## Iteración 4: Integración y Validación

**Objetivo**: Conectar los tres modelos con el sistema existente (@decoherence, @ox, 5 Banderas)  
**Effort**: 5 puntos

### Stories

#### SCRIPT-1.22.0-S01: Integración con @decoherence
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Añadir invocación de phi_arg.py en deco-scan-lite.prompt.md | 0.5 | ⏳ |
| T032 | Añadir invocación de phi_editor.py para validación de sprints | 0.5 | ⏳ |
| T033 | Documentar nuevos tests de coherencia disponibles | 1 | ⏳ |

**Definition of Done**:
- [ ] @decoherence puede invocar ambas métricas
- [ ] Prompt actualizado con nuevas capacidades
- [ ] Test manual exitoso

---

#### SCRIPT-1.22.0-S02: Integración con @ox y Banderas
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T034 | Añadir generación de docs desde ontologías XML | 1 | ⏳ |
| T035 | Mapear cada bandera a su componente Φ en ox.agent.md | 0.5 | ⏳ |
| T036 | Actualizar índice maestro con nuevos artefactos | 0.5 | ⏳ |

**Definition of Done**:
- [ ] @ox puede leer ontologías XML
- [ ] Handoff "Generar docs desde ontología" funcional
- [ ] Banderas documentadas como operadores de coherencia

---

#### SCRIPT-1.22.0-S03: Actualización de Índices DRY
**Effort**: 1 pt

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T037 | Actualizar Tecnico.md con nuevas rutas | 0.5 | ⏳ |
| T038 | Actualizar Funcional.md con nuevas capacidades | 0.5 | ⏳ |

**Definition of Done**:
- [ ] Índices actualizados
- [ ] Validación @indice pasando (5 tests)

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | 38/38 | 30/38 | ⏳ |
| Effort completado | 37 pts | 29 pts | ⏳ |
| % Avance | 100% | 78% | ⏳ |
| Agentes modelados | 12 | 6 | ⏳ |
| Plugins modelados | 5 | 3 | ⏳ |
| Toy models ejecutables | 2 (ARG + Editor) | 1 (ARG) | ⏳ |
| Banderas mapeadas a Φ | 5 | 3 | ⏳ |
| Tests coherencia pasando | 100% | 80% | ⏳ |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| OnthologyEditor/metamodel | ✅ Disponible | Contiene metamodel.md |
| OnthologyEditor/MMCO | ✅ Disponible | Contiene toy_models/ |
| Plugin arg-board | ✅ Instalado | 8 agentes |
| Plugin scrum | ✅ Instalado | Este backlog |
| Python 3.x | ⚠️ Verificar | Para phi_arg.py |
| Sprint 0 | ✅ Completado | Bootstrap terminado |

---

## Artefactos Esperados

| Artefacto | Ruta | Formato |
|-----------|------|---------|
| **Metamodel** | | |
| Ontología Scriptorium | `OnthologyEditor/scriptorium/scriptorium_ontology.xml` | XML |
| Schema de Agentes | `OnthologyEditor/scriptorium/agents_schema.json` | JSON Schema |
| Grafo de Handoffs | `OnthologyEditor/scriptorium/handoffs_graph.json` | JSON |
| Dominio ARG | `OnthologyEditor/scriptorium/modules/arg_domain.xml` | XML |
| Dominio ARG | `OnthologyEditor/scriptorium/modules/arg_domain.xml` | XML |
| **MMCO ARG** | | |
| Jerarquía ARG | `OnthologyEditor/MMCO/xml/ontology/arg_coherence.xml` | XML |
| Métrica Phi ARG | `OnthologyEditor/MMCO/toy_models/arg/phi_arg.py` | Python |
| Fixture Partida | `OnthologyEditor/MMCO/toy_models/arg/hola_mundo/` | JSON/YAML |
| **MMCO Editor** | | |
| Jerarquía Editor | `OnthologyEditor/MMCO/xml/ontology/editor_coherence.xml` | XML |
| Métrica Phi Editor | `OnthologyEditor/MMCO/toy_models/editor/phi_editor.py` | Python |
| Meta-Dinámica | `OnthologyEditor/MMCO/xml/ontology/production_dynamics.xml` | XML |
| **Documentación** | | |
| README Ontología | `OnthologyEditor/scriptorium/README-ONTOLOGY.md` | Markdown |
| Capas ARG | `OnthologyEditor/MMCO/emergence_layers_arg.md` | Markdown |
| Capas Editor | `OnthologyEditor/MMCO/emergence_layers_editor.md` | Markdown |

---

## Cronograma Sugerido

```
Semana 1: Iteración 1 (Metamodel)
├── Día 1-2: S01 (Agentes Core)
├── Día 3: S02 (Handoffs) + S03 (Plugins)
├── Día 4: S04 (Consolidación) + S05 (Dominio ARG)
└── Día 5: Validación + documentación

Semana 2: Iteraciones 2 y 3 (MMCO paralelo)
├── Track A (ARG):
│   ├── Día 1: S01 (Jerarquía)
│   ├── Día 2-3: S02 (Phi_ARG)
│   └── Día 4: S03 (Toy Model)
│
├── Track B (Editor):
│   ├── Día 1: S01 (Jerarquía)
│   ├── Día 2-3: S02 (Phi_editor)
│   └── Día 4: S03 (Meta-dinámica)
│
└── Día 5: Sincronización + documentación

Semana 3: Iteración 4 (Integración)
├── Día 1-2: S01 (@decoherence)
├── Día 3: S02 (@ox + Banderas)
├── Día 4: S03 (Índices)
└── Día 5: Buffer + Retrospectiva
```

---

## Mapeo 5 Banderas → Φ_editor

| Bandera | Dimensión de Coherencia | Métrica Φ | Inputs |
|---------|-------------------------|-----------|--------|
| 🔵 Blueflag | Epistémica (verdad) | Φ_blue | Evidencia, falsificabilidad, utilidad |
| ⚫ Blackflag | Política (poder) | Φ_black | Captura, autodefensa, coste represivo |
| 🔴 Redflag | Material (estructura) | Φ_red | Escala, enforcement, suministro |
| 🟡 Yellowflag | Límite (condiciones) | Φ_yellow | Pre/trans, inconmensurabilidad |
| 🟠 Orangeflag | Retórica (registro) | Φ_orange | Género, estilo, auditorio |

**Composición**:
```python
def phi_editor(text, context):
    return (
        w_blue * phi_blue(text, context) +
        w_black * phi_black(text, context) +
        w_red * phi_red(text, context) +
        w_yellow * phi_yellow(text, context) +
        w_orange * phi_orange(text, context)
    )
```

---

## Notas

1. **Prioridad de ejecución**: Seguir orden de stories (S01→S02→...)
2. **Punto de corte mínimo**: Si el tiempo apremia, priorizar MMCO ARG sobre Editor
3. **Riesgo principal**: Φ_editor puede requerir calibración de pesos (w₁...w₅)
4. **Innovación clave**: Las 5 Banderas como operadores de coherencia MMCO + Dominio ARG formal
5. **Comunicación**: Actualizar tracking cada 2-3 tasks completadas

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.

Una vez aprobado:
1. Se moverá a `.github/BACKLOG-SCRIPTORIUM.md`
2. Se actualizará versión a 1.20.0
3. Se creará commit formal
