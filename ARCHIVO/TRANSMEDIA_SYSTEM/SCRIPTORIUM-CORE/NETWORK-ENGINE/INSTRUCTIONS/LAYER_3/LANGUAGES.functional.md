# Language Functional Design (Layer 3)

## Propósito

Este documento establece el **diseño funcional** de los lenguajes derivados dentro de la plataforma Network-Engine. 
No explica cómo programarlos (ver `LAYER_1`) ni cómo operarlos (ver `LAYER_4`), sino qué significan conceptualmente.

---

## 1. Identidad del Lenguaje

Un lenguaje derivado en Network-Engine no es un framework de UI ni una capa de base de datos.
Es una **interpretación concreta de un dominio teórico o semántico**.

Todo lenguaje debe tener una misión clara que resuelva un problema conceptual.

Ejemplos:
* **Aleph-Lang:** Modelar la expansión topológica y dimensional de universos de información.
* **Forcing-Lang:** Modelar extensiones genéricas y añadir verdades a modelos base.
* **OWL-Lang:** Modelar ontologías descriptivas clásicas.

---

## 2. Frontera Funcional

El lenguaje es el "huésped", el Network-Engine es el "anfitrión".

**Pertenece a la Plataforma (Core):**
* El tiempo (loop de eventos).
* La capacidad de estar en un estado.
* El mecanismo de persistencia abstracta.

**Pertenece al Lenguaje:**
* Las leyes de la física del universo (qué transiciones son posibles).
* Las entidades (fuerzas, axiomas, nodos).
* El significado del colapso o la expansión.

---

## 3. Ontología

Todo lenguaje debe definir su tejido de la realidad limitando sus conceptos fundamentales a un **máximo de 5 primitivas**.

Por ejemplo, Aleph-Lang define: `Universe`, `Dimension`, `Force`, `Expansion`, `Boundary`.
Esta restricción evita la sobrecarga conceptual y fuerza una arquitectura limpia.

---

## 4. Semántica Funcional

El lenguaje debe responder funcionalmente a cuatro pilares:

### A. Estados
¿Cuáles son las macro-fases en las que puede encontrarse un universo regido por este lenguaje? (Ej: `STABLE`, `CRITICAL`).

### B. Eventos
¿Qué tipos de fenómenos ocurren en este universo? (Ej: `IMPACT_FORCE`, `ADD_AXIOM`).

### C. Reglas (Transiciones)
La física del lenguaje: ¿Qué evento en qué estado provoca qué resultado? (Ej: Una fuerza en estado crítico provoca expansión).

### D. Contexto
La memoria del lenguaje: ¿Qué información se acumula a lo largo del tiempo? (Ej: Nivel dimensional actual, hechos asimilados).

---

## 5. El Contrato de Inception

Antes de que un lenguaje pueda considerarse válido funcionalmente, debe responder 5 preguntas de justificación:

1. **¿Qué aporta que no aporte ya la plataforma?**
2. **¿Qué primitivas introduce?**
3. **¿Qué conceptos reutiliza del núcleo?**
4. **¿Qué capacidades nuevas habilita?**
5. **¿Podría implementarse únicamente como configuración plana en JSON?** (Si sí, no merece ser un lenguaje).

La validación funcional culmina con la creación de los artefactos en `LANGUAGES/<lang-name>/definition/` (`vision.md`, `ontology.md`, `semantics.md`, `grammar.md`, `roadmap.md`, `implementation_plan.md`).

---

## 6. Trazabilidad: `LANGUAGES` ↔ `aleph-lang` ↔ `SEMANTINC`

> Resolución spike **U3** (Programa ASI Fase 5). Ver [`DOSSIERS/conceptual-physical-alignment.md`](../../DOSSIERS/conceptual-physical-alignment.md).

| Artefacto | Nivel | Rol |
| --- | --- | --- |
| `LANGUAGES` (este documento + `LAYER_1/LANGUAGES`) | Conceptual (Capa 2) | Generalización: qué es un lenguaje derivado en Network-Engine |
| `LANGUAGES/aleph-lang/package` (`@network-engine/aleph-lang`) | Físico (huésped) | **Primera implementación** del concepto `LANGUAGES` |
| `LANGUAGES/aleph-lang/definition` | Conceptual (dossiers) | Fuente de verdad funcional del lenguaje |
| `LANGUAGES/aleph-lang/app` (`@network-engine/aleph-lang-app`) | Operativo (app/MCP) | Descriptor consumible por el host de apps |
| `LAYER_2/SEMANTINC` | Operativo (contenido) | Ontologías OWL/RDF **hospedadas** por un universo — no es el lenguaje |

**Separación lenguaje ↔ contenido:**

* **Aleph-Lang** define leyes, primitivas y semántica de expansión de universos.
* **SEMANTINC** define cómo se representa conocimiento ontológico *dentro* de un universo ya gobernado por un lenguaje.
* `aleph-lang` **no absorbe** `SEMANTINC`: el contenido semántico es plugin/contenido de Capa 4, no sintaxis del lenguaje.

**Hipótesis confirmada (2026-06-06):** mantener `aleph-lang` como huésped tangible y `LANGUAGES` como dossier conceptual; `SEMANTINC` permanece en `LAYER_2` como contexto operativo de ontologías.
