# EDGE — Constitución Funcional (el borde de la plataforma)

> **Análisis técnico:** [LAYER_1/EDGE.instructions.md](../LAYER_1/EDGE.instructions.md)

## La frontera entre lo que algo *es* y cómo *llega*

Network-Engine separa dos preguntas que casi todos los sistemas confunden:

1. **¿Qué expone la plataforma?** — conocimiento, protocolos, capacidades cognitivas, efectos. Esto vive en los runtimes de protocolo neutrales (`core`, `mcp`, `mcp-runtime`, `graphql`, `graphdb`, `pubsub`).
2. **¿Cómo viaja eso hasta un cliente?** — por HTTP, por Streamable HTTP con SSE, por SPARQL Protocol, por Socket.IO. Esto vive en la familia `edge-*`.

La capa EDGE es la respuesta a la segunda pregunta. Es el **borde**: la piel a través de la cual la plataforma toca el mundo. Su valor funcional es precisamente **no** mezclarse con la primera pregunta.

## Por qué se separó del runtime de protocolo

Antes, `mcp-runtime` cargaba a la vez con el runtime MCP **y** con su transporte HTTP (Fastify, `http-edge`, el shim SSE). Eso acoplaba dos ritmos de cambio distintos:

- El **runtime de protocolo** cambia cuando cambia la semántica MCP (resources, prompts, tools, sampling, eventos).
- El **transporte** cambia cuando cambia el framework HTTP, la versión del SDK Streamable, la política de despliegue o el host (Node, Bun, Docker).

Separar EDGE convierte una decisión de despliegue en algo **intercambiable**: el mismo runtime MCP neutral puede servirse por Fastify hoy y por otro transporte mañana sin tocar la lógica de protocolo. El runtime permanece **host-agnóstico**; el transporte es **swappable**.

```text
Runtime de protocolo neutral   →   estable, reutilizable, testeable sin red
Transporte (EDGE)              →   volátil, específico de host, aislado en el borde
```

## La familia como cinturón de adaptadores

Cada `edge-*` es un traductor entre un protocolo neutral y un transporte concreto. Ninguno inventa significado; todos transportan.

- **`edge-rest`** es el sustrato HTTP. No sabe qué transporta: ofrece una superficie `RestRouter`/`RestServer` sobre la que otros edges montan rutas. Es el cimiento neutro del que cuelga `edge-mcp`.
- **`edge-mcp`** es la piel MCP sobre HTTP: descubrimiento (`server/discover`), salud, y la escucha de cambios (`subscriptions/listen`) que avisa a un cliente cuando el contexto que le importa cambia. Aquí —y no en el runtime— viven el detalle Streamable HTTP y el shim SSE.
- **`edge-graphql`** es la ventana HTTP a la proyección GraphQL: una consulta entra, un resultado sale.
- **`edge-graphdb`** es la puerta hacia un cerebro de inferencia externo (Ontotext GraphDB) hablando el lenguaje estándar RDF/SPARQL. Encapsula toda la dependencia de red en un solo lugar.
- **`edge-pubsub`** es el sistema nervioso entre procesos: el Hub que distribuye y el Bridge que decide qué sale y qué entra de cada app.

## El triángulo de comunicación, completado

Con la familia EDGE, la plataforma cierra su modelo de comunicación. Cada vértice tiene una audiencia y un motivo distintos:

| Borde | Protocolo | Audiencia | Patrón |
| --- | --- | --- | --- |
| `edge-rest` | REST/HTTP | Clientes HTTP externos | Request/Response síncrono |
| `edge-mcp` | MCP (Streamable HTTP) | Agentes AI, IDEs | Request/Response + SSE |
| `edge-graphql` | GraphQL | Clientes de datos | Query/Mutation |
| `edge-graphdb` | SPARQL 1.1 | Motor RDF externo | Consulta/actualización de grafo |
| `edge-pubsub` | Socket.IO | Apps internas del cluster | Event-driven bidireccional |

REST y GraphQL exponen datos. MCP expone capacidades cognitivas. GraphDB delega razonamiento. PubSub habilita la vida colectiva del ecosistema. Todos comparten una misma disciplina: **el borde no decide, traduce**.

## Anti-patrones funcionales

Prohibido:

- meter de vuelta el transporte HTTP dentro de `mcp-runtime` o de cualquier runtime de protocolo;
- que un paquete neutral (`core`, `mcp`, `mcp-runtime`, `graphql`, `graphdb`, `pubsub`) dependa de un `edge-*` (rompe la dirección de la frontera);
- usar el borde para tomar decisiones de dominio, workflow o aprobación (eso pertenece a actores XState / apps);
- tratar `subscriptions/listen` como un bus de eventos general en vez de invalidación de contexto.

## Relación con el resto de capas

- El runtime MCP neutral y su frontera funcional: [MCP_RUNTIME.functional.md](MCP_RUNTIME.functional.md).
- Las apps como consumidor final del borde: [APPS.functional.md](APPS.functional.md).
- El shim de borde para `subscriptions/listen`: [ADR 0001](../../ADR/0001-mcp-runtime-subscriptions-shim.md).
