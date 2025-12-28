# Nota de Colaboración: Metamodel + MMCO para Aleph Scriptorium

> **Contexto**: Este documento captura una conversación de planificación para aplicar Metamodel y MMCO al Scriptorium.
> **Fecha**: Diciembre 2025

---

## Instrucción del Usuario

Soy alguien del equipo de metamodel y MMCO, me envías un correo enlazándome esta planificación con el enlace de github al repositorio (lo subiré) explicándome por encima qué vamos a hacer. El tono es descriptivo porque el objetivo es que se tome en consideración por si hay que poner enmiendas o rectificar cosas, sería muy apreciado consejos o guías antes de empezar el proceso.

Tienes que tener especial picardía en ponerte en el ojo de alguien de esos equipos, buscarán comprobar si damos cobertura con su frameworks.

---

## Borrador de Correo

**Asunto:** Propuesta de aplicación de Metamodel + MMCO al framework Aleph Scriptorium — Solicitud de revisión

---

Hola,

Me pongo en contacto desde el equipo de Aleph Scriptorium, un framework de agentes conversacionales para producción editorial asistida por IA. Llevamos tiempo siguiendo vuestro trabajo en **Metamodel** (especificación ontológica AI-optimized) y **MMCO** (coherencia meta-dinámica), y hemos diseñado un sprint para aplicar ambos frameworks a nuestro sistema.

Antes de empezar la implementación, queremos compartir la planificación para recibir feedback, detectar posibles malentendidos conceptuales o errores de mapeo.

### 📎 Enlaces

- **Repositorio**: `https://github.com/escrivivir-co/aleph-scriptorium`
- **Planificación Sprint**: Diciembre_25_Ontologia
  - [01_planificacion-sprint1.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/01_planificacion-sprint1.md)
  - [02_backlog-sprint1.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/02_backlog-sprint1.md)

---

## 🎯 Qué pretendemos hacer

### 1. Aplicar Metamodel a la infraestructura del Scriptorium

Nuestro sistema tiene ~13 agentes core organizados en capas (UI, Backend, Sistema, Meta) más ~21 plugins. Queremos modelar esto usando vuestra arquitectura de 5 capas:

| LAYER Metamodel | Aplicación en Scriptorium |
|-----------------|---------------------------|
| LAYER_0_META | El propio esquema de agentes |
| LAYER_1_FOUNDATIONAL | Agentes como UFO_Endurants, prompts como UFO_Perdurants |
| LAYER_2_CORE_DOMAIN | Plugins como módulos de dominio |
| LAYER_3_APPLICATION | Implementación en VS Code/Copilot |
| LAYER_4_INTERFACE | Handoffs y experiencia de usuario |

**Pregunta específica**: ¿Es correcto modelar los *handoffs* (delegaciones entre agentes) como `RELATIONSHIP_TEMPLATE` con propiedades direccionales? ¿O deberían ser `PROCESS_TEMPLATE` dado que tienen precondiciones/postcondiciones?

---

### 2. Modelar el dominio ARG como módulo del Metamodel

Tenemos un plugin de juegos ARG (Alternate Reality Games) con conceptos propios: Teatro, Obra, Personaje, Actor, BOE (registro inmutable), Turno, etc. Proponemos crear `modules/arg_domain.xml` como extensión de LAYER_2.

**Pregunta específica**: ¿Cómo manejar la relación Actor↔Personaje donde un Actor (humano o IA) puede interpretar múltiples Personajes y viceversa? ¿Sería un caso de `arity: n_to_m` en `RELATIONSHIP_TEMPLATE`?

---

### 3. Aplicar MMCO a las dinámicas de partidas ARG

Hemos mapeado vuestra jerarquía de emergencia a conceptos ARG:

| Nivel MMCO | Concepto ARG | Justificación |
|------------|--------------|---------------|
| 0c (BNP) | Teatro vacío | Plenum de potencialidad narrativa antes de iniciar |
| 0b (QCW) | Red de handoffs | Correlaciones entre agentes/actores |
| 0a (CTN) | Estado de partida | Factorización en tensores: BOE + BDC + theater_state |
| 1 (Proto-geometry) | Tablero impress.js | Espacialización emergente |
| 2 (Pseudo-time) | Secuencia de turnos | Commits como "tiempo discreto" |
| 3 (Spacetime) | Narrativa consolidada | Continuo macroscópico |
| 4 (Matter) | BOE inmutable, personajes | Coherencia estabilizada |

**Pregunta específica**: ¿Es válido interpretar el sistema de commits Git como análogo al pseudo-tiempo (nivel 2)? Cada commit "colapsa" posibilidades narrativas en un estado concreto.

---

### 4. Aplicar MMCO al Scriptorium como editor transmedia

Esta es la aplicación más ambiciosa: modelar cómo el Scriptorium *produce* coherencia editorial.

| Nivel MMCO | Concepto Editor |
|------------|-----------------|
| 0c (BNP) | ARCHIVO (corpus doctrinal) |
| 0b (QCW) | Red de 12 agentes + plugins |
| 0a (CTN) | Estado del workspace |
| 1 | Estructura de proyectos |
| 2 | Sprints Scrum |
| 3 | Publicaciones (GH-Pages) |
| 4 | Obras finales |

**Innovación propuesta**: Tenemos 5 agentes "Bandera" que auditan diferentes dimensiones de coherencia.

> **Actualización 2025-12-28**: Refactorización con caracterización MMCO completa (feedback Talaia/Flove/LOW)

| Bandera | Nivel MMCO | Operador Φ | Técnica O.R.G.A.N.I.Z.E | Espacio |
|---------|------------|------------|------------------------|---------|
| 🔵 @blueflag | 0b (Correlaciones) | Φ_verdad | **CoT Sequential** | Verificación de evidencia |
| ⚫ @blackflag | 0a (Tensores) | Φ_poder | **Graph of Thought** | Redes de influencia |
| 🔴 @redflag | 1 (Proto-geometría) | Φ_material | **CoT + Validation** | Escala y recursos |
| 🟡 @yellowflag | 2 (Pseudo-tiempo) | Φ_límites | **ToT Multi-Path** | Condiciones límite |
| 🟠 @orangeflag | 3 (Espacio-tiempo) | Φ_registro | **Self-Consistency** | Validación multi-auditorio |

Proponemos definir **Φ_editor = f(Φ_verdad, Φ_poder, Φ_material, Φ_límites, Φ_registro)** como función de grafo (NO lineal).

**Propiedad clave - Inconmensurabilidad**: Las banderas operan en espacios **ortogonales**. El output es un vector 5D, no un escalar.

**Pregunta específica**: ¿Esta composición como grafo de operadores Φ es consistente con el formalismo de `phi_mmco.py`? ¿Cómo manejar la inconmensurabilidad entre espacios de razonamiento (epistemológico vs político vs material)?

---

## 🔍 Puntos donde agradecería especialmente vuestra revisión

1. **Semántica de relaciones**: ¿Usamos bien `RELATIONSHIP_TEMPLATE` vs `PROCESS_TEMPLATE`?

2. **Modularidad del Metamodel**: ¿Es correcto crear `modules/` para dominios específicos, o deberíamos extender LAYER_2 de otra forma?

3. **Mapeo MMCO**: ¿El salto de 0c→0a es demasiado brusco en nuestra instanciación? No tenemos claro cómo modelar el nivel 0b (correlaciones cuánticas) en un sistema puramente simbólico.

4. **Φ compuesto**: ¿Hay precedentes de métricas Φ_MMCO compuestas por subdimensiones? ¿Qué propiedades matemáticas deberíamos preservar?

5. **Validación cruzada**: Planeamos que `arg_domain.xml` (Metamodel) y `arg_coherence.xml` (MMCO) se validen mutuamente. ¿Hay patrones recomendados para esta integración?

---

## 📅 Cronograma tentativo

- **Itera 1**: Metamodel (agentes, handoffs, plugins, dominio ARG) — 16 pts
- **Itera 2**: MMCO ARG-Board — 8 pts
- **Itera 3**: MMCO Editor Transmedia — 8 pts
- **Itera 4**: Integración y validación — 5 pts

Estimamos ~37 puntos de esfuerzo. Si hay problemas conceptuales graves, preferiríamos detectarlos antes de invertir ese tiempo.

---

## 🙏 Lo que buscamos

No esperamos que reviséis todo en detalle, pero cualquier señal del tipo:

- *"Eso no funcionará porque..."*
- *"Mirad el paper/documento X antes de..."*
- *"El nivel 0b no se puede saltar así porque..."*
- *"La composición de Φ requiere que..."*

...sería enormemente valioso.

---

Gracias por vuestro tiempo. El trabajo en Metamodel y MMCO nos parece riguroso y bien fundamentado, y queremos hacer justicia a los frameworks en nuestra aplicación.

Quedamos a disposición para cualquier pregunta o para una llamada si preferís discutirlo en vivo.

Un saludo,

**Equipo Aleph Scriptorium**  
`https://escrivivir-co.github.io/aleph-scriptorium/`

---

*P.D.: Si hay aspectos de nuestra planificación que os parezcan útiles como caso de estudio para documentación de Metamodel/MMCO, estamos abiertos a colaborar.*

---

# Addenda: Conversación de Análisis Previo

## Pregunta inicial del usuario

Tengo 2 preguntas:

a) ¿Puedo modelar Aleph Scriptorium con Metamodel?

b) ¿Puedo modelar los escenarios de ARG-Board con MMCO?

---

## Respuestas

### a) ¿Puedo modelar Aleph Scriptorium con Metamodel?

**Sí, es un ajuste excelente.** El metamodel.md está diseñado específicamente para:

| Característica del Metamodel | Aplicación en Scriptorium |
|------------------------------|---------------------------|
| **5 capas de abstracción** (LAYER_0 a LAYER_4) | Mapea directamente a: Meta (Ox), Backend (Banderas), UI (Aleph), Plugins, Interfaces |
| **UFO Foundational Ontology** | Los agentes son `UFO_Endurants` (entidades persistentes), los prompts son `UFO_Perdurants` (eventos) |
| **FAIR Principles** | El Scriptorium ya sigue DRY/FAIR con índices únicos |
| **Uncertainty Modeling** | Las 5 Banderas operan con grados de confianza |
| **Process Specification** | Los handoffs son `PROCESS_TEMPLATE` con preconditions/postconditions |

**Mapeo propuesto:**

```
SCRIPTORIUM → METAMODEL
═══════════════════════════════════════════════════
Agentes (.agent.md)    → ENTITY_TEMPLATE
Prompts (.prompt.md)   → PROCESS_TEMPLATE  
Instructions           → CONTEXTUAL_CONSTRAINTS
Plugins                → LAYER_2_CORE_DOMAIN (módulos)
Handoffs               → RELATIONSHIP_TEMPLATE (direccionales)
registry.json          → SEMANTIC_REGISTRY
```

---

### b) ¿Puedo modelar escenarios ARG-Board con MMCO?

**Sí, pero con matices importantes.** El ajuste es conceptualmente potente pero requiere traducción:

| Concepto MMCO | Mapeo a ARG-Board |
|---------------|-------------------|
| **Base Noetic Potential (BNP)** | El "espacio de posibilidades" del teatro antes de iniciar partida |
| **Coherence** | Lo que @Decoherence valida: consistencia BOE ↔ BDC ↔ código |
| **Meta-Dynamics** | El sistema de turnos (GitARG): "tiempo" emerge de commits |
| **Matter-as-Concept** | Personajes/agentes como "coherencia estabilizada" |
| **Decoherence (pérdida)** | El "colapso" de posibilidades cuando un turno se commitea |

**Jerarquía de emergencia aplicada:**

```
MMCO Layer          →  ARG-Board
═══════════════════════════════════════════
0c (BNP)            →  Teatro vacío (potencial puro)
0b (Correlaciones)  →  Red de handoffs entre agentes
0a (Tensores)       →  Estado actual de la partida
1 (Proto-geometría) →  Tablero impress.js (espacialización)
2 (Pseudo-tiempo)   →  Secuencia de turnos (commits)
3 (Espacio-tiempo)  →  Narrativa consolidada
4 (Materia)         →  Personajes persistentes, BOE inmutable
```

**Valor añadido**: MMCO te permite modelar **cómo las decisiones de los jugadores "colapsan" el espacio de posibilidades narrativas** — muy potente para juegos ARG.

---

## Recomendación

| Framework | Usar para... |
|-----------|--------------|
| **Metamodel** | Ontología formal del Scriptorium (agentes, plugins, relaciones) — **sistema software** |
| **MMCO** | Dinámica de partidas ARG (emergencia, coherencia, colapso) — **experiencia narrativa** |

Ambos son complementarios: **Metamodel para el "qué es"**, **MMCO para el "cómo evoluciona"**.

---

# Addenda: Planificación Scrum

## Solicitud

Planifica un sprint centrándonos en crear el metamodel y mmco de Aleph Scriptorium.

## Artefactos creados

| Documento | Ruta |
|-----------|------|
| Conversación PO-SM | [01_planificacion-sprint1.md](01_planificacion-sprint1.md) |
| Backlog borrador | [02_backlog-sprint1.md](02_backlog-sprint1.md) |

---

## Resumen del Sprint

| Aspecto | Valor |
|---------|-------|
| **Objetivo** | Formalizar ontología con Metamodel (estructura) + MMCO (dinámica) |
| **Effort total** | 37 puntos |
| **Modelo** | Secuencial con solapamiento (4 iteraciones) |
| **Duración estimada** | 4 Iteras |

---

## Épicas

| ID | Nombre | Effort | Prioridad |
|----|--------|--------|-----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | 16 pts | P0 |
| SCRIPT-1.21.0 | MMCO ARG-Board | 8 pts | P1 |
| SCRIPT-1.22.0 | Integración | 5 pts | P2 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | 8 pts | P1 |

---

## Entregables principales

```
OnthologyEditor/scriptorium/
├── scriptorium_ontology.xml    ← Ontología formal completa
├── agents_schema.json          ← Validación de agentes
├── handoffs_graph.json         ← Grafo de relaciones
├── modules/
│   └── arg_domain.xml          ← Dominio ARG
└── README-ONTOLOGY.md          ← Documentación

OnthologyEditor/MMCO/toy_models/
├── arg/
│   ├── phi_arg.py              ← Métrica de coherencia ARG
│   └── hola_mundo/             ← Fixture de partida ejemplo
└── editor/
    └── phi_editor.py           ← Métrica de coherencia editorial
```

---

# Addenda: MMCO Editor Transmedia

## Pregunta

¿Podrías completar el estudio con un feature nuevo que sea para hacer MMCO de Aleph Scriptorium como editor de transmedia?

## Nueva Épica: SCRIPT-1.23.0 — MMCO Editor Transmedia

**Concepto clave**: El Scriptorium como **sistema de producción de coherencia**.

| Nivel MMCO | Mapeo a Editor Transmedia |
|------------|---------------------------|
| 0c (BNP) | ARCHIVO (marco, diagnóstico, justificación) |
| 0b (Correlaciones) | Red de 12 agentes + plugins |
| 0a (Tensores) | Estado del workspace (git, backlog) |
| 1 (Proto-geometría) | Estructura de proyectos |
| 2 (Pseudo-tiempo) | Sprints Scrum, commits |
| 3 (Espacio-tiempo) | Publicaciones (GH-Pages) |
| 4 (Materia) | Obras finales (Fundación, Teatro) |

---

### Innovación: 5 Banderas como Operadores de Coherencia

```
Φ_editor = w₁·Φ_blue + w₂·Φ_black + w₃·Φ_red + w₄·Φ_yellow + w₅·Φ_orange
```

| Bandera | Dimensión Φ | Detecta... |
|---------|-------------|------------|
| 🔵 Blueflag | Φ_blue | Decoherencia epistémica |
| ⚫ Blackflag | Φ_black | Decoherencia política |
| 🔴 Redflag | Φ_red | Decoherencia material |
| 🟡 Yellowflag | Φ_yellow | Decoherencia límite |
| 🟠 Orangeflag | Φ_orange | Decoherencia retórica |

---

### Diferencia ARG vs Editor

| Aspecto | MMCO ARG-Board | MMCO Editor Transmedia |
|---------|----------------|------------------------|
| **Pregunta** | ¿Esta partida es coherente? | ¿Cómo emerge coherencia en la producción? |
| **Tiempo** | Turnos de juego | Sprints de escritura |
| **Operación** | Validación puntual | Proceso generativo |
| **Métrica** | Φ_ARG | Φ_editor (compuesto) |

---

# Addenda: Cobertura del Dominio ARG

## Pregunta

¿Haría falta crear el metamodel de ARG-BOARD o ya está cubierto con el del Scriptorium?

## Cobertura Actual del Metamodel Scriptorium

| Nivel | Qué modela | ¿Cubre ARG-Board? |
|-------|------------|-------------------|
| **Plugin como entidad** | ARG-Board en registry.json | ✅ Sí (LAYER_2_CORE_DOMAIN) |
| **Agentes del plugin** | Los 8 agentes (Arrakis, BOE...) | ✅ Sí (ENTITY_TEMPLATE) |
| **Handoffs del plugin** | Conexiones bridge↔agentes | ✅ Sí (RELATIONSHIP_TEMPLATE) |
| **Conceptos internos ARG** | BOE, Turno, Obra, Actor, Personaje, BDC | ❌ **No cubierto** |

---

## Lo que falta: Ontología del Dominio ARG

El Metamodel Scriptorium modela la **infraestructura** (agentes, plugins), pero ARG-Board tiene su propio **dominio semántico**:

```
Dominio ARG (no modelado actualmente)
├── Teatro
│   ├── Obra
│   ├── Acto
│   └── Escena
├── Actores
│   ├── Personaje (rol narrativo)
│   ├── Actor (humano/agente que interpreta)
│   └── Relación Actor↔Personaje
├── Tablero
│   ├── BOE (Boletín Oficial)
│   ├── BDC (Base de Conocimiento)
│   └── Disposición
├── Mecánica
│   ├── Turno
│   ├── Commit (como movimiento)
│   └── Estado de partida
└── Arquetipos
    ├── Herald, Mentor, Trickster...
    └── Camino del Héroe (12 etapas)
```

---

## Propuesta: Añadir Story de Dominio ARG

En lugar de crear un Metamodel separado, **extendemos** el Metamodel Scriptorium con un módulo de dominio ARG:

### Nueva Story para Iteración 1

#### SCRIPT-1.20.0-S05: Ontología del Dominio ARG

**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Modelar entidades: Teatro, Obra, Personaje, Actor | 1 | ⏳ |
| T013 | Modelar entidades: BOE, BDC, Disposición, Turno | 1 | ⏳ |
| T014 | Definir relaciones: Actor↔Personaje, Turno↔Commit, BOE↔Obra | 1 | ⏳ |

**Definition of Done**:
- [ ] `arg_domain.xml` con entidades del dominio ARG
- [ ] Integrado con `scriptorium_ontology.xml` como módulo
- [ ] Validación cruzada con MMCO ARG

---

## Arquitectura Resultante

```
OnthologyEditor/scriptorium/
├── scriptorium_ontology.xml      ← Core (agentes, plugins, handoffs)
├── modules/
│   ├── arg_domain.xml            ← Dominio ARG (nuevo)
│   ├── scrum_domain.xml          ← (futuro) Dominio Scrum
│   └── periodico_domain.xml      ← (futuro) Dominio Periódico
└── agents_schema.json
```

---

## Impacto en Sprint

| Métrica | Antes | Después |
|---------|-------|---------|
| Effort total | 34 pts | 37 pts |
| Tasks en I1 | 11 | 14 |
| Artefactos | 15 | 16 |

---

## Respuesta Corta

**No está completamente cubierto.** El Metamodel Scriptorium cubre ARG-Board como *plugin*, pero no sus *conceptos de dominio* (BOE, Turno, Personaje, Obra).

**Recomendación**: Añadir la story S05 a la Iteración 1 para modelar el dominio ARG como módulo del Metamodel Scriptorium.

---

## Estado Final

El backlog está listo para aprobar con `@scrum aprobar` cuando se decida.
