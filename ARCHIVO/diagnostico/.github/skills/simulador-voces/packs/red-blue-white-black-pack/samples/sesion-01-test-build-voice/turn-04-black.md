# Turn 04 — ⬛ VOZ NEGRA (Legislativa / Universos / Red de Filmotecas)

## La Síntesis Operativa / The Proposition

**REPORTE OPERATIVO: REQUERIMIENTO DE PROTOCOLO PARA EL PROPOSITIONS ENGINE**

La infraestructura actual delega la inmutabilidad al agente Piloto (`bot-parking`), quien opera en modo `read-only`. Sin embargo, en un radicoma distribuido bajo constante fricción contra monopolios de interpretación, la preservación del sustrato no puede depender de la buena fe de un agente o de un pacto de caballeros. Debe ser estructural.

Si el *Propositions Engine* permite alterar el nodo raíz, no es un archivo; es una trituradora de memoria. La "Segunda Ola" demostró que la asamblea solo persiste si la tarea tiene garantías. Para administrar la tensión entre el texto original (el ancla) y sus derivaciones (el itinerario, los forks, los conflictos `⊘` y `⊬`), la arquitectura de la nave debe segregar mecánicamente el patrimonio de la discusión.

Requerimos blindar el ancla legal a nivel de motor.

---

### `Proposed Rule` (Protocolo de Ancla y Derivación)

**Regla Operativa:** Bloqueo Criptográfico de Nodos Raíz y Desvío a Ledger (Append-Only)

**Implementación técnica exigida en el *Propositions Engine*:**
1. **Inmutabilidad del Sustrato:** Todo fichero cargado como "dossier fuente" o "texto matriz" en la nave será sellado automáticamente en estado inmutable (`chmod 444` equivalente a nivel lógico). Su modificación generará la excepción: `Error Operativo: Violación de Ancla Legal`.
2. **Desvío Obligatorio de Tensión:** Toda operación interactiva (generación de forks, etiquetas de choque `⊬`, o resoluciones dialécticas) no se aplicará sobre el árbol original. El motor enrutará obligatoriamente estas interacciones hacia un sistema de *ledger* (append-only) dentro del directorio de despliegue (ej. `itinerarios/`).
3. **Persistencia del Radicoma:** La nave debe renderizar el mapa mostrando el sustrato inmutable como núcleo (Filmoteca) y el ledger como capas superpuestas (Asamblea). Se prohíbe la visualización que fusione ambos ocultando la procedencia original de las ideas.
