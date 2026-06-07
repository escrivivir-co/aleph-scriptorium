# MCP Runtime Functional Analysis

> **Borde HTTP:** el transporte (Streamable HTTP, `server/discover`, `subscriptions/listen`) vive en [`@network-engine/edge-mcp`](../LAYER_1/EDGE.instructions.md). Este runtime es **transport-neutral**.

## Propósito funcional

`@network-engine/mcp-runtime` convierte contratos de dominio en una superficie viva de contexto MCP, **independiente del transporte**.

Su función no es ejecutar CRUD.

Su función es permitir que un host MCP vea Network-Engine como:

```text
conocimiento disponible
  ↓
protocolos de interacción
  ↓
capacidades de razonamiento
  ↓
efectos explícitos
```

## Rol dentro de Network-Engine

Network-Engine es una plataforma metalingüística. `mcp-runtime` es su interfaz de contexto hacia modelos y hosts externos.

Funcionalmente actúa como:

- lector de contexto;
- expositor de protocolos;
- mediador de mutaciones;
- puente de observabilidad;
- superficie de contexto neutral que un borde (`edge-mcp`) expone a hosts MCP.

No actúa como:

- dominio;
- storage;
- motor de workflow;
- UI;
- transporte HTTP (eso es `@network-engine/edge-mcp` sobre `@network-engine/edge-rest`);
- router REST;
- clase base vertical de aplicaciones.

## Primitivas funcionales

### Resource

Un Resource representa conocimiento disponible para razonamiento.

En Network-Engine, ejemplos esperados:

```text
network://contracts
network://contracts/{kind}
universe://{id}
ontology://{id}
dossier://aleph/runtime
```

Función:

- permitir lectura contextual;
- evitar tools de consulta;
- hacer visible el estado materializado de la plataforma.

### Resource Template

Un Resource Template representa una familia de recursos parametrizables.

Función:

- navegar espacios conceptuales grandes;
- modelar identificadores dinámicos;
- evitar multiplicación manual de recursos concretos.

### Prompt

Un Prompt es un protocolo de interacción.

Función:

- guiar diseño;
- declarar objetivo;
- declarar inputs;
- declarar outputs;
- declarar resources requeridos;
- declarar mutaciones permitidas.

Un prompt no debe ser una frase que empuja al modelo a llamar una tool.

### Sampling

Sampling representa delegación cognitiva.

Función:

- crítica;
- revisión;
- evaluación;
- planificación;
- comparación semántica.

Nota: aunque el draft moderno de MCP depreque ciertas formas de Sampling, Network-Engine conserva el concepto funcional como capa cognitiva. La implementación concreta puede migrar a providers externos o MRTR cuando corresponda.

### Tool

Una Tool representa efecto.

Función:

- persistir;
- publicar;
- ejecutar builds;
- escribir archivos;
- invocar procesos externos;
- materializar una decisión.

Regla funcional:

```text
Si no hay mutación, IO o efecto externo, no debe ser Tool.
```

## Flujo funcional objetivo

```text
DomainContract
  ↓
MCPProjectionResult
  ↓
MCP Runtime
  ↓
Resources / Prompts / Tools
  ↓
RxJS events
  ↓
XState actors
  ↓
Effects / Read models
  ↓
MCP notifications
```

Interpretación:

- Contracts dicen qué existe.
- Runtime expone cómo se accede.
- RxJS observa qué ocurre.
- XState decide qué puede ocurrir después.
- Notifications invalidan contexto cacheado.

## Función de `subscriptions/listen`

> **Ubicación física:** el shim HTTP/SSE de `subscriptions/listen` vive en `@network-engine/edge-mcp` (`mountMcpRoute`), no en `mcp-runtime`. El runtime solo emite los eventos RxJS que el borde traduce a notificaciones MCP.

`subscriptions/listen` no es un bus general.

Funcionalmente representa:

```text
El cliente pide ser avisado cuando una parte del contexto que le interesa cambia.
```

Debe usarse para:

- invalidar caché de tools/prompts/resources;
- avisar actualización de resources concretos;
- mantener sincronía contextual con read models vivos.

No debe usarse para:

- workflows;
- comandos;
- tareas long-running;
- colas internas;
- eventos de dominio sin proyección MCP.

## Relación con RxJS

`events$` es el sistema nervioso observable del runtime MCP.

Eventos funcionales:

```text
MCP_RESOURCE_READ_REQUESTED
MCP_PROMPT_REQUESTED
MCP_MUTATION_CAPABILITY_REQUESTED
MCP_MUTATION_CAPABILITY_COMPLETED
MCP_MUTATION_CAPABILITY_FAILED
MCP_TOOLS_LIST_CHANGED
MCP_PROMPTS_LIST_CHANGED
MCP_RESOURCES_LIST_CHANGED
MCP_RESOURCE_UPDATED
```

Regla:

```text
RxJS transporta hechos.
No decide workflow.
```

## Relación con XState

XState decide comportamiento operacional.

Una tool MCP puede emitir un evento hacia un actor:

```text
MCP_MUTATION_CAPABILITY_REQUESTED
  ↓
Actor XState
  ↓
guards/actions/effects
```

La máquina no debe vivir dentro del handler HTTP.

## Relación con cache

`ttlMs` y `cacheScope` no son storage.

Funcionalmente son promesas débiles de frescura para hosts MCP.

- `ttlMs`: cuánto tiempo puede considerarse fresco el resultado.
- `cacheScope`: si el resultado es público o privado por contexto de autorización.

Las notificaciones complementan el TTL:

```text
TTL evita refetch innecesario.
Notification invalida antes del TTL.
```

## Relación con hosts MCP

Un host MCP debe poder:

- descubrir capabilities con `server/discover`;
- listar recursos y prompts;
- leer contexto;
- abrir una escucha de cambios;
- ejecutar tools solo para efectos;
- recibir notificaciones filtradas por opt-in.

El runtime no debe asumir un host concreto como Claude, VS Code, Inspector o un cliente propio.

## Anti-patrones funcionales

Prohibido:

- tratar MCP como catálogo de tools;
- convertir cada endpoint REST en tool;
- usar `subscriptions/listen` como event bus interno;
- usar `GET /mcp/discover` como discover normativo;
- depender de sesiones implícitas;
- mezclar UI Apps con runtime base;
- poner lógica de aprobación dentro del borde HTTP (`edge-mcp`).

## Cierre funcional actual

El runtime inicial ya cumple:

- expone contexto Resource-first;
- conserva tools como mutation capabilities;
- emite eventos observables;
- soporta discover moderno;
- soporta cache hints;
- emite eventos que `edge-mcp` traduce a `subscriptions/listen` (shim temporal en el borde);
- mantiene core limpio.

## Próxima frontera funcional

Antes de añadir nuevas features, conviene formalizar:

1. Cómo un read model vivo dispara `notifyResourceUpdated(uri)`.
2. Cómo una mutación aceptada produce cambios de lista o resource update.
3. Cómo un actor XState decide publicar notifications sin acoplarse a `edge-mcp`.
4. Cómo MCP Apps consumirán Resources antes de Tools.
5. Cómo retirar el shim cuando el SDK alcance el draft.
