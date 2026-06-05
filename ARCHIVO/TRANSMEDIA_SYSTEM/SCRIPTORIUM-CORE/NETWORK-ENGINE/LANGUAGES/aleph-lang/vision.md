# Aleph-Lang Vision & Inception

## Identidad Conceptual (Fase 1)

**¿Qué problema conceptual intenta resolver este lenguaje?**
Aleph-Lang existe para modelar sistemas transfinitos y la expansión continua de universos de información. No busca gestionar estados de una UI ni flujos CRUD; busca modelar cómo un universo de conocimiento (Aleph) expande sus dimensiones al ser atravesado por Fuerzas (Forces) hasta alcanzar sus límites (Boundaries), momento en el cual debe evolucionar o colapsar.

## Frontera (Fase 2)

**¿Qué pertenece a la plataforma y qué pertenece al lenguaje?**
* **Plataforma (Core):** El ciclo de eventos reactivo, la máquina de estados subyacente (XState) y la persistencia genérica.
* **Lenguaje (Aleph-Lang):** Las reglas de expansión, la verificación de colapsos dimensionales y la ontología específica de Alephs, Fuerzas y Límites.

## Preguntas Obligatorias de Diseño

### P1: ¿Qué aporta que no aporte ya la plataforma?
Aporta un dominio con semántica estricta sobre topología y conocimiento expansivo. La plataforma es un lienzo vacío; Aleph-Lang le da las leyes de la física a ese lienzo.

### P2: ¿Qué primitivas introduce?
Introduce `Dimension`, `Force` y `Boundary`. Un universo en Aleph-Lang no es un mero diccionario de datos, es una entidad delimitada por dimensiones que puede sufrir expansiones.

### P3: ¿Qué conceptos reutiliza del núcleo?
Reutiliza la primitiva `UniverseId` para identificar la instancia base, y la estructura `CoreEventBase` para estandarizar sus mutaciones. Utiliza el `NetworkOrchestrator` genérico para su ciclo de vida.

### P4: ¿Qué capacidades nuevas habilita?
Habilita la capacidad de inferir si una nueva pieza de conocimiento (una Fuerza) puede caber en la topología actual del universo o si requiere una transición de estado mayor (Expansión Dimensional).

### P5: ¿Podría implementarse únicamente como configuración?
No. La semántica de "colapso" y "expansión" requiere una máquina de estados diseñada ad-hoc y comprobaciones a nivel del sistema de tipos (ver `grammar.md`) que no pueden definirse simplemente pasando un JSON al Core.
