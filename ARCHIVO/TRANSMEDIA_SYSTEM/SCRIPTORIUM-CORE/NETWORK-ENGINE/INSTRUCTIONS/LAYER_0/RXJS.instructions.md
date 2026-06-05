RxJS Constitution
=================

Contexto
--------

Este proyecto utiliza RxJS moderno.

Toda propuesta debe asumir la versión más reciente estable de RxJS disponible durante el desarrollo del proyecto.

No deben proponerse patrones heredados salvo justificación explícita.

* * * * *

Filosofía
=========

RxJS no es una librería para AJAX.

RxJS no es una librería para formularios.

RxJS no es una librería para Angular.

RxJS es el sistema nervioso reactivo de la plataforma.

En Network-Engine debe considerarse:

-   infraestructura de señales
-   infraestructura de eventos
-   infraestructura de observación
-   infraestructura de composición temporal

* * * * *

Regla Fundamental
=================

Antes de crear:

-   EventEmitter
-   PubSub
-   Callback Chain
-   Observer manual
-   Cola manual
-   Dispatcher manual

preguntar:

> ¿Existe ya una abstracción RxJS que resuelva esto?

* * * * *

Responsabilidades
=================

RxJS gestiona:

Flujo
-----

```
Evento ↓Transformación ↓Evento
```

* * * * *

Streams
-------

```
Observable<T>
```

* * * * *

Composición Temporal
--------------------

```
mergeconcatswitchMapcombineLatestforkJoinzip
```

* * * * *

Backpressure Conceptual
-----------------------

```
throttledebouncebufferwindow
```

* * * * *

Integración IO
--------------

```
HTTPFilesystemSocketsPersistencePluginsWorkers
```

* * * * *

Lo que RxJS NO Gestiona
=======================

RxJS NO debe gestionar:

-   workflows
-   máquinas de estado
-   estados de aprobación
-   reglas de transición

Eso pertenece a XState.

* * * * *

Delta Mental
============

Error Clásico
-------------

Intentar construir una máquina de estados con:

```
scan()
```

```
BehaviorSubject()
```

```
switchMap()
```

y cientos de operadores.

* * * * *

Regla
-----

Si aparecen:

```
EstadosTransicionesWorkflowAprobacionesLifecycle
```

preguntar:

> ¿Esto pertenece a XState?

* * * * *

XState vs RxJS
==============

RxJS
----

Responde:

> ¿Qué está fluyendo?

* * * * *

XState
------

Responde:

> ¿Qué puede ocurrir después?

* * * * *

Ejemplo Mental
==============

Correcto
--------

```
RxJS ↓USER_SAVED ↓XState ↓transición
```

* * * * *

Incorrecto
----------

```
RxJS ↓scan(...) ↓scan(...) ↓scan(...) ↓FSM improvisada
```

* * * * *

Subject Policy
==============

* * * * *

Subject
-------

Permitido.

Pero debe justificarse.

* * * * *

BehaviorSubject
---------------

No usar automáticamente.

Preguntar:

> ¿Realmente necesito almacenamiento mutable?

* * * * *

ReplaySubject
-------------

No usar automáticamente.

Preguntar:

> ¿Realmente necesito replay?

* * * * *

AsyncSubject
------------

Usar únicamente cuando la semántica encaje.

* * * * *

Anti-Pattern
============

Muchos agentes generan:

```
const state$ = new BehaviorSubject(...)
```

para todo.

Esto se considera deuda técnica potencial.

* * * * *

Operator First
==============

Antes de crear estado mutable:

preguntar:

> ¿Puedo expresarlo mediante operadores?

* * * * *

Operator Exploration Rule
=========================

Antes de implementar una solución:

preguntar:

> ¿Existe algún operador RxJS todavía no utilizado en la codebase que merezca convertirse en precedente arquitectónico?

Ejemplos:

-   groupBy
-   window
-   expand
-   partition
-   materialize
-   dematerialize
-   exhaustMap
-   auditTime
-   bufferToggle
-   race
-   connect

* * * * *

Hot vs Cold
===========

El agente debe razonar explícitamente:

```
¿Cold?¿Hot?
```

antes de diseñar un stream.

No asumir automáticamente que todo debe ser:

```
shareReplay(1)
```

* * * * *

shareReplay Warning
===================

Uno de los anti-patrones más frecuentes.

No utilizar:

```
shareReplay(1)
```

como solución universal.

Justificar siempre:

-   caché
-   multicasting
-   replay

* * * * *

Error Handling
==============

Evitar:

```
catchError(() => of(null))
```

sistemático.

Los errores forman parte de la semántica.

Deben modelarse conscientemente.

* * * * *

Composition First
=================

Preferir:

```
source$ .pipe(...)
```

sobre:

```
subscribe(...)subscribe(...)subscribe(...)
```

* * * * *

Subscribe Rule
==============

Toda aparición de:

```
subscribe(...)
```

debe levantar una pregunta:

> ¿Es realmente el borde del sistema?

Los subscribe deben concentrarse en:

-   UI
-   IO
-   integración externa

No en lógica de dominio.

* * * * *

Network-Engine Interpretation
=============================

En Network-Engine:

RxJS representa señales.

Las señales pueden:

-   alimentar actores
-   alimentar máquinas
-   alimentar plugins
-   alimentar inferencia

Pero no deben convertirse en máquinas de estado encubiertas.

* * * * *

Integración con XState
======================

Modelo mental oficial:

```
Observable ↓Actor ↓Machine ↓Transition
```

o

```
Plugin ↓Observable ↓Actor ↓Universe
```

* * * * *

Integración con Plugins
=======================

Los plugins deben preferir exponer:

```
Observable<T>
```

antes que:

```
Promise<T>
```

cuando la información tenga naturaleza continua.

* * * * *

Integración con TypeScript
==========================

Antes de exportar un stream:

evaluar:

-   branded events
-   discriminated unions
-   event maps
-   typed channels
-   typed observables

El sistema de tipos debe describir la semántica de la señal.

* * * * *

Checklist Anti-Legacy
=====================

Antes de finalizar una propuesta:

□ No usa RxJS como FSM

□ No usa BehaviorSubject para todo

□ No usa shareReplay por reflejo

□ No multiplica subscribes innecesarios

□ Usa composición de operadores

□ Distingue hot y cold

□ Distingue flujo de workflow

□ Deja los workflows a XState

□ Aprovecha tipos avanzados

□ Considera operadores modernos antes de crear primitivas propias

* * * * *

Objetivo
========

No queremos utilizar RxJS como una utilidad asíncrona.

Queremos utilizar RxJS como la infraestructura reactiva fundamental sobre la que operan actores, máquinas, plugins y universos dentro de Network-Engine.

* * * * *

Y respondiendo a tu pregunta concreta:

> "¿Separa esto el CRUD de los estados con XState?"

Sí, pero yo lo expresaría de forma más general:

```
Persistencia y datos     → Store / RepositoriosSeñales y eventos        → RxJSWorkflow y semántica     → XStateDominio                  → Network-Engine
```

No es realmente una separación "CRUD vs estados".

Es una separación:

```
Qué existe            → StoreQué está ocurriendo   → RxJSQué puede ocurrir     → XState
```

y esa tríada encaja sorprendentemente bien con la dirección que estás tomando para Network-Engine.