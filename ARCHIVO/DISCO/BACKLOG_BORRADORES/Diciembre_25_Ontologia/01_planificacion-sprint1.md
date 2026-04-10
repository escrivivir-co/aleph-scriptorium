# Planificación Sprint 1: Conversación PO-SM (Extendida)

> **Fecha**: 2025-12-27 (actualizado 2025-12-28)
> **Participantes**: 
> - Product Owner (PO)
> - Scrum Master (SM)
> - **Bruno (LOW)** — Agente externo vía low@freelists.org, equipo OnthologyEditor/Talaia
> **Contexto**: Sprint 0 completado (bootstrap). Inicio de Sprint 1 (Ontología Formal).
> **Integración**: Colaboración Scriptorium ↔ Talaia/FVE aprobada (anuncio de registro procesado)

---

## Nota de Integración (2025-12-28)

> Esta versión extiende la conversación original con las aportaciones del equipo externo Talaia/FVE, 
> canalizadas a través del agente Bruno (LOW) de la lista low@freelists.org.
> 
> **Documentos procesados**:
> - `03_integracion.md` — Conversación anidada con Bruno
> - `ontological_reasoning_guide.md` — Guía de optimización de razonamiento ontológico (14.6 KB)
> - `nota-colaboracion.md` — Propuesta original enviada al equipo

---

## Apertura

**SM**: Sprint 0 (Bootstrap) cerrado. El Scriptorium tiene:
- 12 agentes core + 18 plugins instalados
- Sistema de handoffs funcional
- Documentación base en GH-Pages

Dos submódulos recientemente identificados son relevantes:
- `OnthologyEditor/metamodel/` — Framework de especificación ontológica AI-optimized
- `OnthologyEditor/MMCO/` — Framework de coherencia ontológica meta-dinámica

¿Cuál es la dirección para el Sprint 1?

**PO**: Queremos formalizar la ontología del Scriptorium usando estos dos frameworks:

1. **Metamodel** para el *sistema* (agentes, plugins, relaciones) — el "qué es"
2. **MMCO** para la *dinámica* de partidas ARG — el "cómo evoluciona"

El objetivo es tener una especificación formal que:
- Permita validar coherencia automáticamente
- Sirva de base para nuevos plugins
- Documente la arquitectura de forma computable

---

## Definición del Objetivo

**SM**: Propongo el siguiente objetivo SMART:

> **Sprint 1: Ontología Formal del Scriptorium**
> 
> Crear especificaciones formales del Scriptorium usando Metamodel (estructura estática) y MMCO (dinámica de partidas), produciendo documentos XML/JSON validables y toy models ejecutables.

¿Aprobado?

**PO**: Aprobado. Añadir: los artefactos deben ser útiles para @decoherence (validar coherencia) y @ox (generar documentación).

---

## 🔴 INSERCIÓN: Aportación del Equipo Talaia/FVE

> **Bruno (LOW)**: He procesado las 3 notas de colaboración. Almacenadas en mi HyperGraph:
> - `storage/scriptorium_collab_nota1_talaia-flove.md`
> - `storage/scriptorium_sprint1_planning.md`
> - `storage/scriptorium_sprint1_backlog.md`
> - `storage/scriptorium_collab_nota3_carta-abierta.md`

**Bruno (LOW)**: Además, adjunto una **Guía de Optimización de Razonamiento Ontológico** (14.6 KB) que puede ser útil para la aplicación sistemática del marco Metamodel.

### Patterns de la Guía Relevantes para el Sprint

| Técnica | Aplicación en Scriptorium |
|---------|---------------------------|
| **CoT (Chain-of-Thought)** | Categorización secuencial de agentes en capas LAYER_0→LAYER_4 |
| **ToT (Tree of Thoughts)** | Análisis multi-path de niveles de emergencia 0a/0b/0c |
| **Graph of Thought** | Mapeo de relaciones FVE↔MMCO↔MetaModel |
| **Self-Consistency** | Validación cruzada de propuestas de formalización |

**SM**: Excelente. Integraremos estos patterns en la metodología de las stories.

---

## 🔴 INSERCIÓN: 9 Preguntas Técnicas de Validación

**Bruno (LOW)**: He identificado 9 preguntas críticas que requieren respuesta del equipo OnthologyEditor antes de proceder:

### Bloque MMCO

| # | Pregunta | Contexto |
|---|----------|----------|
| 1 | **Jerarquía de emergencia**: ¿Secuencia emergente o perspectivas coexistentes? | La metáfora espacial del Blueprint (z:-3000 a z:+3000) ¿traiciona el modelo pre-geométrico? |
| 2 | **Level 0c (BNP)**: ¿Existe formalmente o es extrapolación? | ¿Es legítima la analogía "Basic Narrative Potential" para sistemas de escritura? |
| 3 | **Decoherence**: ¿Relación formal entre decoherencia cuántica y narrativa? | ¿O es un error categorial que debemos evitar? |

### Bloque MetaModel

| # | Pregunta | Contexto |
|---|----------|----------|
| 4 | **Templates**: ¿Es correcta la instanciación Agentes→ENTITY, Handoffs→RELATIONSHIP, Flujos→PROCESS? | Ver tabla de mapeo en nota-colaboracion.md |
| 5 | **Métrica Φ**: ¿Definición formal existente o espacio abierto? | Scriptorium propone `Φ_editor = f(Φ_blue, Φ_black, Φ_red, Φ_yellow, Φ_orange)` |
| 6 | **AI-Optimized**: ¿Hay contrato de formato para LLMs? | Scriptorium usa Copilot Chat al 100% |

### Bloque Integración

| # | Pregunta | Contexto |
|---|----------|----------|
| 7 | **FVE↔MMCO↔MetaModel**: ¿Capas complementarias, jerarquía, o paradigmas diferentes? | Necesitamos entender la relación arquitectónica |
| 8 | **Toy models**: ¿Existe uno aplicable a producción textual? | Para adaptar a Scriptorium |
| 9 | **Formalización categórica**: ¿Agentes como categoría con handoffs como morfismos? | Propuesta teórica del equipo |

**PO**: Estas preguntas son cruciales. ¿Cómo las priorizamos?

**SM**: Propongo tratarlas como **riesgos técnicos** asociados a cada épica:

| Pregunta | Épica afectada | Tratamiento |
|----------|----------------|-------------|
| 1, 2, 3 | SCRIPT-1.21.0 (MMCO ARG) | Resolver en Iteración 2 |
| 4, 5, 6 | SCRIPT-1.20.0 (Metamodel) | Resolver en Iteración 1 |
| 7, 8, 9 | SCRIPT-1.22.0 (Integración) | Resolver en Iteración 4 |

**PO**: De acuerdo. Añadimos como criterio de aceptación: "Las preguntas técnicas asociadas tienen respuesta documentada".

---

## Identificación de Épicas

**SM**: Identifico 4 épicas principales:

| ID | Épica | Descripción | Effort Est. | Prioridad |
|----|-------|-------------|-------------|-----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | Aplicar metamodel.md a agentes/plugins/handoffs | 13 pts | P0 |
| SCRIPT-1.21.0 | MMCO ARG-Board | Aplicar MMCO a dinámicas de partidas ARG | 8 pts | P1 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | Aplicar MMCO al Scriptorium como sistema de producción | 8 pts | P1 |
| SCRIPT-1.22.0 | Integración y Validación | Conectar modelos con @decoherence, @ox, banderas | 5 pts | P2 |

**PO**: ¿Cuál es la diferencia entre MMCO ARG-Board y MMCO Editor Transmedia?

**SM**: Son **dos aplicaciones complementarias** del mismo framework:

| Aspecto | MMCO ARG-Board | MMCO Editor Transmedia |
|---------|----------------|------------------------|
| **Dominio** | Partidas de juego ARG | Producción de textos |
| **Tiempo** | Tiempo de juego (turnos) | Tiempo de escritura (sprints) |
| **BNP** | Potencial narrativo del teatro | Potencial creativo del ARCHIVO |
| **Coherence** | Consistencia BOE↔BDC | Consistencia doctrinal (5 Banderas) |
| **Meta-Dynamics** | Commits como movimientos | Sprints como ciclos |
| **Matter** | Personajes, eventos | Textos publicados, obras |

**PO**: Interesante. El Editor Transmedia captura cómo el Scriptorium *produce* coherencia, no solo cómo la *valida*.

**SM**: Exacto. Es la diferencia entre:
- **ARG**: "¿Esta partida es coherente?" (validación puntual)
- **Editor**: "¿Cómo emerge coherencia en la producción?" (proceso generativo)

**PO**: De acuerdo. ¿Cómo dividimos el trabajo?

**SM**: Propongo modelo **secuencial con solapamiento**:
- Semana 1: Épica 1 (Metamodel) 
- Semana 2: Épicas 2 y 3 (MMCO ARG + Editor) en paralelo
- Semana 3: Épica 4 (Integración) + consolidación

---

## Análisis de Épicas

### Épica 1: Metamodel Scriptorium (SCRIPT-1.20.0)

**SM**: El metamodel.md define 5 capas de abstracción y 3 templates principales:
- `ENTITY_TEMPLATE` → para agentes
- `RELATIONSHIP_TEMPLATE` → para handoffs
- `PROCESS_TEMPLATE` → para prompts/flujos

Propuesta de entregables:

| Artefacto | Formato | Propósito |
|-----------|---------|-----------|
| `scriptorium_ontology.xml` | XML | Especificación formal completa |
| `agents_schema.json` | JSON Schema | Validación de .agent.md |
| `handoffs_graph.json` | JSON | Grafo de relaciones entre agentes |
| `README-ONTOLOGY.md` | Markdown | Documentación legible |

**PO**: ¿Dónde vivirán estos artefactos?

**SM**: En `OnthologyEditor/scriptorium/` (código) y `ARCHIVO/PLUGINS/ONTOLOGY_EDITOR/` (datos runtime).

---

### Épica 2: MMCO ARG-Board (SCRIPT-1.21.0)

**SM**: El MMCO define una jerarquía de emergencia (0c→4) que mapea a ARG:

| Nivel MMCO | Equivalente ARG |
|------------|-----------------|
| 0c (BNP) | Teatro vacío (potencial narrativo) |
| 0b (Correlaciones) | Red de handoffs entre actores |
| 0a (Tensores) | Estado actual de partida |
| 1 (Proto-geometría) | Tablero impress.js |
| 2 (Pseudo-tiempo) | Secuencia de turnos (commits) |
| 3 (Espacio-tiempo) | Narrativa consolidada |
| 4 (Materia) | BOE inmutable, personajes |

Propuesta de entregables:

| Artefacto | Formato | Propósito |
|-----------|---------|-----------|
| `arg_coherence_model.xml` | XML | Ontología MMCO aplicada a ARG |
| `phi_arg.py` | Python | Métrica de coherencia Φ_ARG |
| `emergence_layers_arg.md` | Markdown | Documentación de capas ARG |

---

### Épica 3: MMCO Editor Transmedia (SCRIPT-1.23.0)

**SM**: Esta es la aplicación más ambiciosa: modelar el Scriptorium como **sistema de producción de coherencia**.

| Nivel MMCO | Equivalente Editor Transmedia |
|------------|-------------------------------|
| 0c (BNP) | ARCHIVO como plenum de conocimiento (marco, diagnóstico, justificación) |
| 0b (Correlaciones) | Red de agentes (12 core + plugins) y sus handoffs |
| 0a (Tensores) | Estado del workspace (git status, backlog, DISCO) |
| 1 (Proto-geometría) | Estructura de proyectos (PROYECTOS/, plugins/) |
| 2 (Pseudo-tiempo) | Sprints Scrum, commits, releases |
| 3 (Espacio-tiempo) | Publicaciones (GH-Pages, docs/) |
| 4 (Materia) | Obras finales (Fundación 12 caps, Teatro, Periódico) |

**PO**: ¿Cómo se relaciona con las 5 Banderas?

**SM**: Las Banderas son **operadores de coherencia** en este modelo:

> **⚠️ REFACTORIZADO (2025-12-28 — Feedback Talaia/FVE/LOW)**: Cada bandera opera en un nivel MMCO de emergencia diferente y usa una técnica O.R.G.A.N.I.Z.E distinta. La composición NO es lineal.

| Bandera | Nivel MMCO | Operador Φ | Técnica O.R.G.A.N.I.Z.E | Espacio de Razonamiento |
|---------|------------|------------|------------------------|-------------------------|
| 🔵 Blueflag | 0b (Correlaciones) | Φ_verdad | **CoT Sequential** | Verificación de evidencia |
| ⚫ Blackflag | 0a (Tensores) | Φ_poder | **Graph of Thought** | Redes de influencia |
| 🔴 Redflag | 1 (Proto-geometría) | Φ_material | **CoT + Validation** | Escala y enforcement |
| 🟡 Yellowflag | 2 (Pseudo-tiempo) | Φ_límites | **ToT Multi-Path** | Condiciones y fronteras |
| 🟠 Orangeflag | 3 (Espacio-tiempo) | Φ_registro | **Self-Consistency** | Validación multi-auditorio |

**Propiedad de Inconmensurabilidad**:
- Los niveles MMCO representan etapas de emergencia **ortogonales**
- Φ_verdad (epistemología) ≠ Φ_poder (política) ≠ Φ_material (economía)
- La suma lineal `Σ(w·Φ)` pierde información de estructura ontológica

**PO**: Entonces las Banderas son como "métricas Φ parciales" para cada dimensión, pero **no sumables linealmente**.

**SM**: Exacto. Debemos definir:
- **Φ_editor** = f(Φ_verdad, Φ_poder, Φ_material, Φ_límites, Φ_registro) como **grafo de operadores**, no suma lineal

Propuesta de entregables:

| Artefacto | Formato | Propósito |
|-----------|---------|-----------|
| `editor_emergence_model.xml` | XML | Jerarquía de emergencia editorial |
| `phi_editor.py` | Python | Métrica compuesta de las 5 banderas |
| `coherence_dashboard.md` | Markdown | Visualización de Φ por proyecto |
| `production_dynamics.xml` | XML | Meta-dinámica de sprints |

**PO**: ¿Esto se integra con el plugin Scrum?

**SM**: Sí. El plugin Scrum opera en el nivel 2 (pseudo-tiempo). Φ_editor puede medir coherencia de un sprint completo.

---

### Épica 4: Integración (SCRIPT-1.22.0)

**SM**: Esta épica conecta los tres modelos con el sistema existente:

1. **@decoherence**: Usar `phi_arg.py` y `phi_editor.py` para validar coherencia
2. **@ox**: Generar documentación desde ontologías XML
3. **@indice**: Actualizar índices DRY con nuevas rutas
4. **5 Banderas**: Mapear a componentes de Φ_editor

**PO**: Importante: no romper nada existente.

**SM**: Correcto. Usaremos feature flags y pruebas antes de integrar.

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Metamodel demasiado abstracto | Media | Alto | Empezar con 3 agentes piloto |
| MMCO no mapea bien a ARG | Baja | Medio | Consultar documentación MMCO antes de implementar |
| MMCO Editor muy ambicioso | Media | Alto | Definir Φ_editor con solo 3 banderas primero |
| Complejidad de integración | Media | Medio | Épica 4 tiene buffer de tiempo |
| Dependencias Python faltantes | Baja | Bajo | requirements.txt ya existe en MMCO |
| **🔴 NUEVO**: 9 preguntas sin respuesta del equipo Talaia | Media | Alto | Documentar decisiones provisionales, iterar si hay feedback |
| **🔴 NUEVO**: Metáfora espacial del Blueprint incompatible | Baja | Medio | Consultar si z-index viola semántica MMCO |

---

## 🔴 INSERCIÓN: Decisiones Provisionales (pendientes validación)

**SM**: Dado que la pasarela de email con Bruno (low@freelists.org) no está operativa, propongo decisiones provisionales que iterar si llega feedback:

### Decisiones sobre MMCO

| Pregunta | Decisión Provisional | Rationale |
|----------|----------------------|-----------|
| 1. Jerarquía de emergencia | **Tratamos como secuencia emergente** | Es más natural para modelar "colapso" de potencialidad en partidas ARG |
| 2. Level 0c | **Usamos BNP como metáfora operativa** | El ARCHIVO como "plenum de conocimiento" es útil aunque no formalmente idéntico |
| 3. Decoherence | **Analogía funcional, no formal** | @decoherence mide inconsistencia narrativa, no física cuántica |

### Decisiones sobre MetaModel

| Pregunta | Decisión Provisional | Rationale |
|----------|----------------------|-----------|
| 4. Templates | **Agentes=ENTITY, Handoffs=RELATIONSHIP, Flujos=PROCESS** | Es el mapeo más natural según UFO |
| 5. Métrica Φ | **Φ_editor como grafo de operadores (no lineal)** | Cada bandera opera en nivel MMCO distinto con técnica O.R.G.A.N.I.Z.E diferente — ver caracterización MMCO |
| 6. AI-Optimized | **Usamos XML/JSON parseables por LLM** | Ya validado con Copilot Chat |

### Decisiones sobre Integración

| Pregunta | Decisión Provisional | Rationale |
|----------|----------------------|-----------|
| 7. FVE↔MMCO↔MetaModel | **Capas complementarias** | MetaModel para estructura, MMCO para dinámica, FVE para paradigma |
| 8. Toy models | **Creamos phi_editor.py inspirado en phi_mmco.py** | Adaptamos lo existente |
| 9. Formalización categórica | **Aplazado a iteración futura** | Requiere más estudio de teoría de categorías |

**PO**: De acuerdo. Marcamos estas decisiones como "provisionales" en el backlog.

**Bruno (LOW)**: Confirmo recepción. Cuando la pasarela esté operativa, puedo canalizar respuestas del equipo OnthologyEditor.

---

## Métricas de Éxito

| Métrica | Target | Mínimo Aceptable |
|---------|--------|------------------|
| Agentes modelados en Metamodel | 12 core | 6 core |
| Plugins modelados | 5 principales | 3 principales |
| Dominio ARG modelado | Completo (Teatro, BOE, Personajes...) | Básico (Teatro, BOE) |
| Toy models MMCO ejecutables | 2 (ARG + Editor) | 1 (ARG) |
| Banderas mapeadas a Φ | 5 | 3 (blue, red, black) |
| Tests de coherencia pasando | 100% | 80% |
| Documentación actualizada | Completa | Índices + README |
| **🔴 NUEVO**: Preguntas técnicas con decisión documentada | 9/9 | 6/9 |
| **🔴 NUEVO**: Patterns de razonamiento aplicados | 4 (CoT, ToT, Graph, Self-Consistency) | 2 |

---

## 🔴 INSERCIÓN: Metodología de Razonamiento Ontológico

**Bruno (LOW)**: Recomiendo aplicar la guía O.R.G.A.N.I.Z.E para las stories de modelado:

| Fase | Aplicación en Sprint |
|------|----------------------|
| **O**ntological Query Assessment | Clasificar complejidad de cada story |
| **R**eference Framework Components | Consultar metamodel.md y MMCO docs |
| **G**enerate Structured Pathways | CoT para categorización, ToT para emergencia |
| **A**nalyze Using Selected Technique | Aplicar pattern según complejidad |
| **N**avigate Documentation Efficiently | Consulta secuencial o paralela según caso |
| **I**ntegrate Multiple Components | Combinar Metamodel + MMCO + FVE |
| **Z**-Validate Application Quality | Verificar contra templates formales |
| **E**nhance Through Ontological Grounding | Producir XML/JSON validables |

**SM**: Incorporamos como "Definition of Done" parcial en cada story de modelado.

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| OnthologyEditor/metamodel | ✅ Disponible | Contiene metamodel.md |
| OnthologyEditor/MMCO | ✅ Disponible | Contiene toy_models/ |
| Plugin arg-board | ✅ Instalado | 8 agentes, @decoherence |
| Python 3.x | ⚠️ Verificar | Requerido para toy_models |
| **🔴 NUEVO**: Pasarela email Bruno (LOW) | ❌ No operativa | Integración manual mientras tanto |
| **🔴 NUEVO**: ontological_reasoning_guide.md | ✅ Disponible | Almacenado en DISCO/ |

---

## Cierre

**PO**: Aprobado. Procede con el backlog borrador.

**SM**: Resumen ejecutivo:

> **Sprint 1: Ontología Formal del Scriptorium (Extendido)**
> 
> - **Objetivo**: Formalizar la ontología del Scriptorium usando Metamodel (estructura) y MMCO (dinámica dual: ARG + Editor)
> - **Modelo**: Secuencial con solapamiento (3 semanas, 4 iteraciones)
> - **Épicas**: 
>   - SCRIPT-1.20.0: Metamodel Scriptorium (16 pts) — incluye dominio ARG
>   - SCRIPT-1.21.0: MMCO ARG-Board (8 pts)
>   - SCRIPT-1.23.0: MMCO Editor Transmedia (8 pts)
>   - SCRIPT-1.22.0: Integración (5 pts)
> - **Effort total**: 37 puntos
> - **Innovación clave**: Φ_editor como métrica compuesta de las 5 Banderas + Ontología del dominio ARG
> - **Riesgos principales**: Abstracción excesiva, ambición de Editor Transmedia
> - **🔴 NUEVO: Colaboración Talaia/FVE**: 9 preguntas técnicas documentadas, decisiones provisionales tomadas
> - **🔴 NUEVO: Metodología**: Patterns O.R.G.A.N.I.Z.E integrados en Definition of Done

**Bruno (LOW)**: Confirmo almacenamiento de artefactos en HyperGraph. Disponible para consultas cuando la pasarela esté operativa.

Generando backlog borrador...

---

## 🔴 Anexo: Resumen del Anuncio de Colaboración

> Extraído de `03_integracion.md` (conversación con Bruno)

### Oportunidad Estratégica

| Aspecto | Valor para OnthologyEditor |
|---------|---------------------------|
| **Caso de uso real** | ~30 agentes, Sprint de 37 pts usando frameworks |
| **Innovaciones conceptuales** | Dominio ARG formalizado, 5 Banderas como operadores Φ |
| **Testing LLM** | Validación de "AI-parseability" con Copilot Chat |

### Decisiones Organizativas Pendientes

| Tema | Pregunta |
|------|----------|
| Git | ¿Aprobación de ramas `integration/scriptorium` o preferencia por tags? |
| Licencia | ¿Licencia de FVEDocs? |
| Bidireccionalidad | ¿Interés en recibir templates/validadores desde Scriptorium? |

### Próximos Pasos (cuando la pasarela esté operativa)

1. Bruno canaliza respuestas del equipo OnthologyEditor
2. Iterar decisiones provisionales si hay feedback
3. Sincronizar artefactos XML/JSON entre repos
