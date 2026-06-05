# DevOps Agent Protocol: Language Inception

## Propósito

Este documento instruye al Agente (tú) sobre el procedimiento operativo (DevOps) que debes seguir de forma estricta cuando el usuario solicite:
* Crear un lenguaje
* Iniciar un lenguaje / Bootstrap de lenguaje
* Diseñar una semántica o teoría

**Importante:** Este documento NO define qué es funcionalmente un lenguaje ni cómo se programa técnicamente. Para aplicar el principio DRY, todo el conocimiento está delegado en las capas inferiores:
* **Para restricciones conceptuales:** Consulta `INSTRUCTIONS/LAYER_3/LANGUAGES.functional.md`
* **Para restricciones de código (TypeScript/XState):** Consulta `INSTRUCTIONS/LAYER_1/LANGUAGES.instructions.md`

---

## Flujo Operativo Estricto

Ante la petición de crear un nuevo lenguaje, el agente debe activar el **LANGUAGE INCEPTION MODE** y ejecutar secuencialmente este workflow:

### Fase A: Bloqueo de Ejecución
1. **PROHIBIDO** escribir código fuente, crear paquetes, inicializar clases o configurar máquinas.
2. Lee `LAYER_3/LANGUAGES.functional.md` para asimilar el objetivo conceptual.

### Fase B: Generación de Dossiers
3. Diseña el lenguaje respondiendo a las fases conceptuales y crea los siguientes 5 archivos físicos en el directorio `LANGUAGES/<nombre-del-lenguaje>/`:
   * `vision.md` (Identidad y Frontera)
   * `ontology.md` (Máximo 5 conceptos primitivos)
   * `semantics.md` (Estados, Eventos, Reglas, Contexto)
   * `grammar.md` (Borrador de la gramática TypeScript y la sintaxis DSL)
   * `roadmap.md` (Plan de mapeo hacia runtime)

### Fase C: Aprobación Formal (Inception Review)
4. Crea un artefacto `implementation_plan.md` que sirva como puerta de aprobación.
5. En ese plan, responde explícitamente a las **5 Preguntas Obligatorias (P1-P5)** dictadas en `LAYER_3`.
6. Solicita feedback del usuario (`RequestFeedback: true`). **DETÉN LA EJECUCIÓN**.

### Fase D: Scaffolding y Desarrollo
7. Únicamente tras recibir la aprobación afirmativa del usuario, lee `LAYER_1/LANGUAGES.instructions.md` para cargar las restricciones técnicas.
8. Genera el directorio `packages/<nombre-del-lenguaje>/` y sus archivos (`package.json`, `tsconfig.json`, `src/types.ts`, `src/index.ts`, etc.) cumpliendo escrupulosamente con el Type-Level Programming y los Phantom Types.
9. Registra una aplicación de prueba en el launcher (`packages/apps/src/`) para validar el DSL.
10. Ejecuta las verificaciones de compilación (`bun run typecheck`) y cierra el ciclo de desarrollo.
