Éste es otro sitio donde los agentes suelen estar desactualizados.

Porque históricamente ha habido varias épocas:

```
2015 → .d.ts escritos a mano2018 → @types/*2020 → declaration:true2023 → package exports + declaration maps2025+ → tipos inferidos desde el propio código fuente
```

Y muchas recomendaciones que verás en blogs siguen siendo de la época 2018.

* * * * *

Evolución histórica de los .d.ts
================================

Era 1 --- Los tipos estaban fuera
-------------------------------

Antes:

```
lodashreactexpress
```

eran JavaScript puro.

Los tipos vivían aparte:

```
@types/lodash@types/react@types/express
```

de DefinitelyTyped.

Un paquete podía tener:

```
index.jsindex.d.ts
```

escrito completamente a mano.

* * * * *

Era 2 --- El paquete exporta sus propios tipos
--------------------------------------------

Llegó:

```
{  "types": "./dist/index.d.ts"}
```

Ahora el paquete genera:

```
dist/ ├─ index.js └─ index.d.ts
```

y los consumidores reciben tipos automáticamente.

Hoy esto es el estándar.

* * * * *

Era 3 --- Project References
--------------------------

TS 3.x introduce:

```
{  "composite": true}
```

y

```
{  "references": [...]}
```

Ahora un monorepo puede compilar:

```
core ↑aleph-lang ↑app
```

sin publicar paquetes intermedios.

* * * * *

Era 4 --- TypeScript como grafo
-----------------------------

TS 5.x ya piensa en:

```
source ts ↓tipos ↓consumidores
```

más que en:

```
.d.ts escritos a mano
```

Los `.d.ts` se consideran artefactos generados.

No diseño humano.

* * * * *

El error clásico
================

Muchos equipos crean:

```
packages/ ├─ types ├─ core ├─ app
```

y meten TODO en:

```
@mi-org/types
```

Resultado:

```
types ├─ User ├─ Event ├─ Config ├─ Ontology ├─ Plugin ├─ ...
```

Terminan con un "mega-paquete de tipos".

* * * * *

Lo que suele ocurrir después
============================

```
core ↓types
```

```
aleph-lang ↓types
```

```
browser ↓types
```

Todo depende de:

```
@network-engine/types
```

y aparece:

```
God Package
```

* * * * *

Mi recomendación para Network-Engine
====================================

Yo no crearía:

```
@network-engine/types
```

como almacén global.

Crearía:

```
@network-engine/contracts
```

o

```
@network-engine/protocols
```

que es algo muy distinto.

* * * * *

Diferencia conceptual
=====================

Malo
----

```
types
```

contiene:

```
UserConfigAlephNodeStateEvent
```

sin criterio.

* * * * *

Mejor
-----

```
contracts
```

contiene:

```
UniversePluginMachineCapabilityEvent
```

porque son conceptos compartidos.

* * * * *

Regla que usaría
================

Un tipo vive donde nace.

Ejemplo:

```
aleph-lang
```

define:

```
AlephEventAlephContextAlephUniverse
```

y los exporta.

No los mueve a otro paquete.

* * * * *

Sólo suben a Layer 0
====================

aquellos tipos que representan:

```
primitivas del sistema
```

Ejemplo:

```
LanguageSemantics
```

```
PluginContract
```

```
RuntimeCapability
```

```
ActorId
```

```
EventEnvelope
```

* * * * *

Delta moderno de los .d.ts
==========================

Antiguo
-------

```
escribir .d.ts
```

* * * * *

Moderno
-------

```
{  "declaration": true}
```

```
{  "declarationMap": true}
```

y dejar que TypeScript los genere.

* * * * *

Lo que yo pondría en Layer 0
============================

Un documento llamado:

```
TYPE_SYSTEM.instructions.md
```

con una regla central:

> Los tipos pertenecen al dominio que los define.
>
> Sólo las abstracciones fundamentales del metamodelo pueden ascender a Layer 0.

* * * * *

Ejemplo aplicado a Network-Engine
=================================

Yo intentaría acabar con algo así:

```
packages/ ├─ core │    ├─ primitives │    ├─ contracts │    ├─ protocols │    └─ type-system ├─ aleph-lang │    ├─ events │    ├─ context │    ├─ machine │    └─ types ├─ forcing-lang │    ├─ events │    ├─ context │    ├─ machine │    └─ types ├─ browser ├─ node └─ bun
```

donde:

```
core
```

exporta:

```
LanguageSemanticsPluginCapabilityMachineDefinitionActorDefinition
```

y

```
aleph-lang
```

exporta:

```
AlephEventAlephContextAlephMachine
```

sin crear un paquete global de tipos que termine convirtiéndose en el vertedero del monorepo.

De hecho, para tu filosofía de "plataforma para construir lenguajes", la pregunta correcta no es:

> ¿Dónde guardo los tipos?

sino:

> ¿Qué tipos forman parte del metamodelo de Network-Engine y cuáles pertenecen a un lenguaje concreto?

Esa frontera es mucho más importante que la tecnología `.d.ts` en sí.