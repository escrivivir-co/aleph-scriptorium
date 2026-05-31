---
name: simulador-voces
description: "Capacidad para orquestar simulaciones de debate entre perfiles (voces) en 5 rondas escalonadas (Mapeo, Delta, Tensión, Síntesis, Final). Incluye el protocolo de Merge Agéntico para consolidar el conocimiento temporal tras las sesiones."
user-invocable: true
---

# Simulador de Voces (Juego de Simulación)

## 1. Estructura de las 5 Rondas

1. **Ronda 1 (Mapeo Inicial):** Cada voz emite un veredicto micro-posicional sobre el tema presentado, sentando su anclaje básico desde su "Voice Card".
2. **Ronda 2 (Delta-Advance):** Las voces expanden su búsqueda en el codebase. Evalúan su propio mapeo anterior, corrigen asunciones prematuras y profundizan en el tema asimilando nuevos datos.
3. **Ronda 3 (Tensión Relacional / Fricción):** Lectura cruzada. Cada voz lee el output (Ronda 2) de otra voz oponente y lo procesa/evalúa estrictamente desde sus propios límites y formato nativo. No es monólogo, es intersección forzada.
4. **Ronda 4 (Síntesis Operativa):** Cada voz transforma su postura filosófica/dialéctica en una única directriz accionable, inyectable o algorítmica para la infraestructura técnica (ej. reglas para el *Propositions Engine*).
5. **Ronda 5 (Debate Final):** Colisión directa en el nodo o mesa de diseño sobre las instrucciones propuestas en la Ronda 4.

## 2. Protocolo de Actualización de Recaps (Merge Agéntico)

Al finalizar una sesión de simulación, el agente orquestador no se limita a sobrescribir archivos con el último snapshot. Su obligación es consolidar el conocimiento de forma orgánica usando el **Merge Agéntico**:

- **Análisis Cronológico y Conciencia Temporal:** El agente debe emplear sus herramientas (como la lectura del historial de `git log -p`) para observar *cómo* ha mutado el conocimiento turno a turno y sesión a sesión. Debe mapear bucles de retroalimentación, la aparición de nuevas referencias exploradas y las sutiles desviaciones del lore original.
- **Actualización Orgánica (Recap por Voz):** El agente actualiza el `recap-<voz>.md` inyectando los nuevos matices descubiertos. La voz debe mantener "conciencia temporal" de su evolución sin que la actualización destruya o desvirtúe su ancla (el núcleo que la define).
- **Síntesis de Fricciones (Recap Global):** Se genera el documento transversal de la sesión. Si durante la simulación las voces alcanzan axiomas incompatibles, el agente no fuerza un consenso falso. Documenta estructuralmente la fricción (similar a un `MERGE_CONFLICT`) reconociendo que la contradicción es un valor cartográfico esencial para el Radicoma.
