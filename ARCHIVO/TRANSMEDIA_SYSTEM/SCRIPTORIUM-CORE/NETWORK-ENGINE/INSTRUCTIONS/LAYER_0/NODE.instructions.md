# Node.js Constitution

## Contexto

Este proyecto opera sobre Node.js moderno.

Toda propuesta debe asumir la versión más reciente LTS estable de Node.js disponible durante el desarrollo del proyecto.

No deben proponerse patrones heredados salvo justificación explícita.

---

# Filosofía

Node.js no es la plataforma.

Node.js no es el lenguaje.

Node.js no es el framework.

Node.js es un runtime.

Bun es un runtime.

Deno es un runtime.

El navegador es un runtime.

Network-Engine debe sobrevivir a cualquiera de ellos.

---

# Principio Fundamental: Agnósticismo de Runtime

Antes de utilizar cualquier API de runtime preguntar:

> ¿Esta capacidad pertenece al dominio o pertenece a la infraestructura?

Si pertenece a infraestructura:

extraer un contrato.

---

## Capability Model

Los runtimes no deben clasificarse por nombre.

Deben clasificarse por capacidades.

Ejemplo:

* Filesystem
* Workers
* TCP
* UDP
* Signals
* Streams
* Persistence
* Timers
* Crypto

Un runtime expone capacidades.

No identidad.

---

## Dirección de Dependencias

```
Network-Engine Core
      ↓
Runtime Contracts
      ↓
Adapters
      ↓
Node | Bun | Deno | Browser
```

La dirección de dependencias nunca debe invertirse.

---

## Regla de Diseño

Cuando aparezca una dependencia de Node:

NO preguntar:

> ¿Cómo lo hago en Node?

Preguntar:

> ¿Esto pertenece al core o a un adaptador de plataforma?

---

## Separación

```
core/           → Sin dependencias de runtime
adapters/node/  → APIs de Node
adapters/bun/   → APIs de Bun
adapters/web/   → APIs de Browser
```

El core importa interfaces.

Los adaptadores implementan interfaces.

---

# ESM First

Network-Engine utiliza exclusivamente módulos ECMAScript.

```json
{
  "type": "module"
}
```

Toda propuesta debe asumir:

* import/export nativo
* extensiones explícitas en imports relativos
* top-level await disponible
* sin require() salvo interop justificado

---

## Prohibido Generar

Evitar automáticamente:

```ts
const x = require('...')
```

```ts
module.exports = { ... }
```

Es un indicador fuerte de código legacy.

---

# Protocolo node:

Toda importación de módulos built-in debe usar el protocolo `node:`.

Correcto:

```ts
import { readFile } from 'node:fs/promises'
```

Incorrecto:

```ts
import { readFile } from 'fs'
```

---

# APIs Estándar Cross-Runtime

Cuando exista una API estándar multiplataforma y una API específica del runtime:

preferir la estándar.

Preferir:

* Web Streams
* URL
* AbortController
* TextEncoder / TextDecoder
* Crypto Web API
* EventTarget

antes que equivalentes específicos del runtime cuando la semántica sea equivalente.

---

# Streams

Los streams forman parte de la arquitectura fundamental.

La preferencia por defecto es WHATWG Streams:

```ts
ReadableStream
WritableStream
TransformStream
```

sobre Node Streams clásicos:

```ts
stream.Readable
stream.Writable
stream.Transform
```

Porque:

* Node las soporta
* Bun las soporta
* Deno las soporta
* Browser las soporta

Los Node Streams clásicos pertenecen a adaptadores específicos.

---

# Event Loop

Los agentes deben comprender y razonar explícitamente sobre:

* microtasks vs macrotasks
* orden de ejecución del Event Loop
* scheduling y cancellation
* backpressure

Pero la arquitectura no debe depender de detalles específicos del event loop de un runtime concreto.

Cuando el código viva en un adaptador de Node:

preferir `queueMicrotask()` sobre `process.nextTick()` salvo que la semántica de nextTick sea estrictamente necesaria.

---

# Concurrencia

Antes de introducir concurrencia preguntar:

> ¿La abstracción pertenece al dominio o al runtime?

El dominio debe expresar intención.

El adaptador decide la implementación:

* Worker Thread
* Web Worker
* proceso externo
* tarea distribuida

Cuando se trabaje en un adaptador de Node:

considerar `node:worker_threads` antes de crear soluciones ad-hoc.

---

# Señales y Graceful Shutdown

La gestión de señales del sistema pertenece a los adaptadores de ejecución.

Nunca al núcleo.

Cuando se trabaje en un adaptador de Node:

todo proceso persistente debe manejar:

```ts
process.on('SIGINT', ...)
process.on('SIGTERM', ...)
```

con graceful shutdown.

No usar `process.exit()` salvo en entrypoints.

---

# Observabilidad

La observabilidad debe abstraerse.

No acoplar el núcleo a instrumentación específica de un runtime.

Cuando se trabaje en un adaptador de Node:

considerar activamente:

* node:diagnostics_channel
* node:perf_hooks
* --inspect

antes de crear sistemas de instrumentación propios.

---

# Anti-Patterns

Se consideran indicadores de problemas:

## Acoplamiento al Runtime (en el core)

* importar `node:*` desde el núcleo
* importar `Bun.*` desde el núcleo
* importar APIs DOM desde el núcleo
* utilizar globals específicos de runtime en el núcleo
* asumir filesystem disponible
* asumir acceso a red disponible

## Código Legacy (en cualquier capa)

* usar `require()` en lugar de `import`
* usar `module.exports` en lugar de `export`
* importar built-ins sin protocolo `node:` (e.g. `'fs'` en vez de `'node:fs'`)
* usar callbacks sobre promises (`fs.readFile` en vez de `fs/promises`)
* usar Node Streams donde WHATWG Streams son suficientes

---

# Checklist Anti-Legacy

Antes de finalizar una propuesta:

□ Usa protocolo `node:` en imports de built-ins

□ No usa `require()`

□ No usa `module.exports`

□ Usa promises sobre callbacks

□ Prefiere Web Streams sobre Node Streams

□ Prefiere EventTarget sobre EventEmitter cuando es posible

□ No acopla el core a APIs de Node

□ Distingue core de adaptador

□ Razona sobre Event Loop explícitamente

□ Maneja señales en procesos persistentes

□ Modela capacidades, no runtimes concretos

□ Usa APIs estándar cross-runtime cuando existen

---

# Integración con Network-Engine

Node.js no es Network-Engine.

Node.js es un huésped posible.

```
TypeScript   → Lenguaje
RxJS         → Señales
XState       → Comportamiento
Core         → Network-Engine (agnóstico)
Node/Bun     → Runtime (intercambiable)
```

---

# Objetivo

No queremos utilizar Node.js como un entorno de ejecución opaco.

No queremos construir Network-Engine para Node.

Queremos construir Network-Engine contra un espacio abstracto de capacidades donde Node, Bun, Deno y Browser actúen como huéspedes intercambiables.

Cuando trabajemos directamente con Node, debemos hacerlo con las APIs más modernas, estables y portables disponibles.

Toda propuesta debe acercar la codebase a ese objetivo.