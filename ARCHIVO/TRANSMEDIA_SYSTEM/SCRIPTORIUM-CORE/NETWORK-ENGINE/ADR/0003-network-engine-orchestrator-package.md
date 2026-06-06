# ADR 0003: `@network-engine/network-engine` como composition root

## Estado

Aceptado.

## Contexto

El Programa de Investigación ASI ([`README.md`](../README.md)) contrastó el OS Cognitivo (`INSTRUCTIONS/*`) con la codebase física (`packages/*`) y detectó una fricción central:

* **`NETWORK_ENGINE`** está documentado en `LAYER_1` y `LAYER_3` como concepto de plataforma/lenguaje.
* No existía un paquete físico homónimo que materializara el punto de ensamblaje del motor.

La Meta-Constitución ([`INSTRUCTIONS/LAYER_1/NEGATIVE/NETWORK_ENGINE.not.instructions.md`](../INSTRUCTIONS/LAYER_1/NEGATIVE/NETWORK_ENGINE.not.instructions.md)) afirma:

> *Network-Engine NO es una aplicación, framework, librería ni monorepo... Network-Engine es un lenguaje.*

Crear un paquete `network-engine` sin precaución degradaría el lenguaje (Capa 1 conceptual) a un módulo de implementación.

### Decisión del usuario (2026-06-06)

Se eligió crear `packages/network-engine` como **orquestador físico** en el monorepo, reconciliado con la constitución mediante una frontera estricta de responsabilidades.

### Alternativas consideradas

1. **Concepto puramente emergente** (sin paquete): el motor surge de la composición implícita de `core + node + pubsub + mcp-runtime` en cada app (`packages/apps`). Rechazada por decisión de usuario: falta un punto de ensamblaje explícito y reutilizable.
2. **Subsumir en `packages/apps`**: rechazada porque `apps` son demostraciones del lenguaje, no el composition root de la plataforma.
3. **Subsumir en `packages/core`**: rechazada porque violaría el agnósticismo de runtime del núcleo.

## Decisión

### 1. El paquete `@network-engine/network-engine` es un composition root

Responsabilidades **permitidas**:

* Cablear `createNodeEngine()` (`@network-engine/node`) sobre una máquina XState provista externamente.
* Conectar opcionalmente `SocketIOBridge` (`@network-engine/pubsub`).
* Instanciar opcionalmente `createMCPRuntime()` (`@network-engine/mcp-runtime`).
* Exponer la API pública `createNetworkEngine()` como fábrica de ensamblaje.

Responsabilidades **prohibidas**:

* Lógica de dominio, contratos, ontologías o semántica de lenguaje derivado.
* Dependencias directas de Fastify, MCP SDK, Socket.IO server o GraphDB en código propio (delegar en los paquetes especializados).
* Duplicar tipos o máquinas que pertenecen a `core` o a un lenguaje de Capa 2.

### 2. El lenguaje Network-Engine permanece conceptual

* `LAYER_1/NETWORK_ENGINE.instructions.md` y `LAYER_3/NETWORK_ENGINE.functional.md` describen el **lenguaje/plataforma**, no el paquete.
* El paquete es el **huésped de ensamblaje** del laboratorio TypeScript, análogo a cómo `aleph-lang` es huésped del concepto `LANGUAGES`.

### 3. Regla de guarda (anti-inflación)

Antes de añadir código a `packages/network-engine`, preguntar:

> ¿Pertenece a `core`, a un adapter (`node`/`browser`/`contract-adapters`) o a un lenguaje derivado?

Si la respuesta es sí, **no** va en el orquestador. El orquestador solo conecta.

## Consecuencias

### Positivas

* Punto de entrada único y documentado para ensamblar el motor sin repetir wiring en cada app.
* Trazabilidad explícita en la Matriz de `LAYER_1/ECOSYSTEM.md`.
* Las apps (`packages/apps`) pueden consumir `createNetworkEngine()` en lugar de reimplementar el cableado.

### Negativas / riesgos

* Riesgo de deriva: el paquete puede acumular lógica si no se aplica la regla de guarda.
* Tensión nominal: el nombre del paquete coincide con el del lenguaje; la documentación debe mantener la distinción siempre visible.

### Mitigaciones

* Tests unitarios que verifican ensamblaje sin slots opcionales.
* Este ADR como ancla de revisión en PRs que toquen `packages/network-engine`.
* Enlace desde `README.md` y dossier [`DOSSIERS/conceptual-physical-alignment.md`](../DOSSIERS/conceptual-physical-alignment.md).

## Artefactos relacionados

* `packages/network-engine/` — implementación del composition root.
* `INSTRUCTIONS/LAYER_1/ECOSYSTEM.md` — Matriz de Trazabilidad.
* `DOSSIERS/conceptual-physical-alignment.md` — Programa de Investigación ASI (Fase 5).
