# XState 5 Constitution

## Contexto

Este proyecto utiliza exclusivamente XState 5.

Toda propuesta debe asumir que la versión objetivo es:

XState 5+

No deben proponerse patrones de XState 4 salvo que exista una justificación explícita.

---

# Regla Fundamental

Antes de proponer código XState preguntar:

> ¿Este patrón pertenece realmente a XState 5 o es un hábito heredado de versiones anteriores?

Si existe duda:

asumir que es legacy hasta demostrar lo contrario.

---

# Filosofía

XState no es una librería de estados.

En Network-Engine debe considerarse:

* una semántica operacional
* una plataforma de actores
* una herramienta de orquestación
* un runtime de comportamiento

Las máquinas representan comportamiento.

No lógica de negocio.

La lógica debe vivir en:

* actores
* acciones
* reglas
* servicios
* plugins

---

# Delta Mental

## XState 4

Pensamiento dominante:

Máquina → Servicio → Eventos

---

## XState 5

Pensamiento dominante:

Sistema de Actores

Actor → Actor → Actor

Las máquinas son únicamente un tipo particular de actor.

---

# Regla de Diseño

Cuando aparezca un problema:

NO preguntar:

> ¿Necesito una máquina?

Preguntar:

> ¿Necesito un actor?

---

# Actor First

La abstracción principal es:

Actor

No:

Machine

---

# APIs Modernas

Preferir siempre:

```ts
createActor(...)
```

sobre patrones históricos basados en:

```ts
interpret(...)
```

---

# Prohibido Generar

Evitar automáticamente:

```ts
interpret(machine)
```

salvo motivos excepcionales.

Es un indicador fuerte de código heredado.

---

# Setup First

Preferir:

```ts
setup(...)
```

antes de:

```ts
createMachine(...)
```

aislado.

La definición de:

* actions
* guards
* actors
* delays

debe vivir dentro del ecosistema de setup.

---

# Tipado

Preferir:

setup({
types: {}
})

````

sobre sistemas antiguos basados en:

```ts
schema: {}
````

o configuraciones heredadas.

---

# Indicadores de Legacy

Si aparece alguno de los siguientes elementos:

* interpret
* Machine
* schema.context
* schema.events
* services heredados
* assigns no tipados
* casting masivo
* any

el agente debe reconsiderar la solución.

---

# Tipado Estricto

Las máquinas deben:

* inferir eventos
* inferir contexto
* inferir actores
* inferir outputs

No utilizar tipos redundantes cuando XState pueda inferirlos.

---

# Contexto

El contexto no es almacenamiento arbitrario.

Debe representar estado duradero relevante para la máquina.

No convertir context en:

* contenedor global
* service locator
* bolsa de dependencias

---

# Eventos

Los eventos deben modelar hechos.

Evitar:

```ts
DO_SOMETHING
RUN_PROCESS
EXECUTE_TASK
```

Preferir:

```ts
USER_REGISTERED
RULE_MATCHED
UNIVERSE_EXPANDED
ONTOLOGY_LOADED
STREAM_COMPLETED
```

---

# Guards

Las guards deben expresar reglas declarativas.

Evitar lógica compleja.

Si una guard crece demasiado:

extraerla.

---

# Actions

Las actions representan efectos.

No deben contener lógica de decisión.

La decisión pertenece a:

* guards
* transiciones
* actores especializados

---

# Invocaciones

Cuando aparezca invoke:

preguntar primero:

> ¿Esto debería ser otro actor?

XState 5 favorece composición de actores.

---

# Spawn

El agente debe considerar activamente:

* spawnChild
* sistemas actoriales
* jerarquías de actores

antes de crear coordinadores manuales.

---

# Sistemas

Cuando múltiples máquinas colaboren:

considerar:

ActorSystem

antes de introducir buses propios.

---

# Integración con RxJS

Antes de crear:

* EventEmitter
* PubSub
* Observer manual

preguntar:

> ¿Puede modelarse como actor RxJS?

---

# Integración con Network-Engine

Las máquinas no representan universos.

Representan comportamiento.

Los universos son contenido.

Las máquinas coordinan:

* evolución
* inferencia
* observación
* expansión

---

# Regla de Precedente

Antes de implementar una nueva capacidad:

preguntar:

> ¿Existe una primitive de XState 5 que todavía no esté representada en la codebase?

Ejemplos:

* systems
* actor logic creators
* fromPromise
* fromTransition
* fromObservable
* fromEventObservable
* fromCallback
* spawnChild
* input
* output

Si la respuesta es sí:

considerar usarla como precedente arquitectónico.

---

# Checklist Anti-Legacy

Antes de finalizar cualquier propuesta:

Verificar:

□ No usa interpret()

□ No usa Machine()

□ No usa schema heredado

□ Usa setup()

□ Usa createActor()

□ Piensa en actores antes que máquinas

□ Aprovecha inferencia de tipos

□ Sigue el modelo mental de XState 5

□ No reproduce ejemplos de v4

---

# Objetivo

No queremos utilizar XState como una librería de estados.

Queremos utilizar XState 5 como una de las posibles semánticas operacionales de Network-Engine.

Toda propuesta debe acercar la codebase a ese objetivo.
