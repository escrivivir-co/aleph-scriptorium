# Semántica de Aleph-Lang (Fase 4)

Este documento define las reglas que gobiernan cómo la Ontología cobra vida en el tiempo.

## Estados Fundamentales
Un Aleph no es binario (encendido/apagado). Sus estados representan la estabilidad de su topología:
- `STABLE`: El Aleph está asimilando fuerzas rutinarias sin fricción.
- `EXPANDING`: El Aleph está sufriendo una reestructuración dimensional. Ninguna fuerza nueva puede asimilarse hasta que termine.
- `CRITICAL`: El Aleph ha alcanzado su Boundary. Múltiples fuerzas incompatibles han chocado contra sus límites. Requiere intervención externa o colapso.

## Eventos (Los hechos que pueden ocurrir)
- `IMPACT_FORCE`: Una fuerza exterior golpea el Aleph.
- `REACH_BOUNDARY`: El Aleph detecta que no puede contener más conocimiento en su topología actual.
- `COMPLETE_EXPANSION`: La transición dimensional ha finalizado.

## Reglas de Transformación
1. **Conservación:** `IMPACT_FORCE` en estado `STABLE` añade conocimiento al Contexto y mantiene el estado `STABLE`.
2. **Fricción:** Si un `IMPACT_FORCE` supera el límite dimensional, se dispara automáticamente un `REACH_BOUNDARY`.
3. **Bloqueo:** Si el Aleph está en estado `EXPANDING`, todo `IMPACT_FORCE` es rechazado (o encolado por el orquestador).

## Contexto (Persistencia)
La memoria viva de la máquina:
- `dimensions`: Nivel numérico o conjunto de ejes.
- `assimilatedForces`: Lista o Grafo de conocimiento incorporado.
- `structuralIntegrity`: Un valor de 0 a 100.
