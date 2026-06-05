Bun Constitution
================

Contexto
--------

Este proyecto utiliza Bun como entorno principal de desarrollo.

Bun no es una dependencia accidental.

Bun es una decisión arquitectónica consciente.

Toda propuesta debe asumir Bun como herramienta primaria salvo indicación explícita en contrario.

* * * * *

Regla Fundamental
=================

Antes de proponer una herramienta del ecosistema Node preguntar:

> ¿Existe una solución equivalente integrada en Bun?

Si la respuesta es sí:

preferir la solución nativa de Bun.

* * * * *

Filosofía
=========

Bun no debe considerarse:

```
Node + npm
```

Bun es:

```
Runtime+Package Manager+Task Runner+Bundler+Test Runner
```

Muchas herramientas tradicionales desaparecen porque Bun ya proporciona capacidades equivalentes.

* * * * *

Delta Mental
============

Ecosistema Clásico
------------------

```
Node+npm+ts-node+nodemon+jest+webpack+rimraf+cross-env
```

* * * * *

Ecosistema Bun
--------------

```
Bun
```

Antes de añadir una dependencia preguntar:

> ¿Bun ya resuelve este problema?

* * * * *

Package Manager First
=====================

Este proyecto utiliza:

```
bun install
```

como mecanismo principal de gestión de dependencias.

* * * * *

Prohibido Generar por Defecto
=============================

Evitar automáticamente:

```
npm install
```

```
npm run
```

```
npx
```

salvo que exista una razón explícita.

* * * * *

Equivalencias
=============

Instalar dependencias
---------------------

Incorrecto:

```
npm install rxjs
```

Correcto:

```
bun add rxjs
```

* * * * *

Dependencias de desarrollo
--------------------------

Incorrecto:

```
npm install -D vitest
```

Correcto:

```
bun add -d vitest
```

* * * * *

Ejecutar scripts
----------------

Incorrecto:

```
npm run dev
```

Correcto:

```
bun run dev
```

* * * * *

Ejecutar binarios
-----------------

Incorrecto:

```
npx tsx src/main.ts
```

Correcto:

```
bunx tsx src/main.ts
```

o preferiblemente:

```
bun run src/main.ts
```

si Bun puede ejecutarlo directamente.

* * * * *

TypeScript
==========

Bun ejecuta TypeScript directamente.

Antes de proponer:

```
ts-nodetsxts-node-dev
```

preguntar:

> ¿Bun puede ejecutar este archivo TS directamente?

En la mayoría de los casos:

sí.

* * * * *

Hot Reload
==========

Antes de proponer:

```
nodemonts-node-devpm2-dev
```

preguntar:

> ¿bun --watch resuelve este caso?

Preferir:

```
bun --watch src/main.ts
```

cuando sea suficiente.

* * * * *

Testing
=======

La solución preferida es:

```
bun test
```

* * * * *

Prohibido Generar por Defecto
=============================

Evitar automáticamente:

```
jestmochaava
```

si no existe una necesidad concreta.

* * * * *

Assertions
==========

Preferir APIs compatibles con:

```
bun:test
```

antes de introducir capas de testing innecesarias.

* * * * *

Bundling
========

Antes de proponer:

```
webpackrollupparcel
```

preguntar:

> ¿Bun ya proporciona lo necesario?

* * * * *

Runtime APIs
============

Las APIs específicas de Bun son válidas.

Ejemplos:

```
Bun.file(...)Bun.write(...)Bun.serve(...)
```

Pero únicamente fuera del núcleo agnóstico.

* * * * *

Regla de Adaptadores
====================

Las APIs Bun deben vivir en:

```
packages/bun/packages/runtime-bun/packages/adapters/bun/
```

Nunca dentro del core.

* * * * *

Lockfile
========

La fuente de verdad es:

```
bun.lock
```

* * * * *

Prohibido
=========

No introducir:

```
package-lock.json
```

salvo necesidad excepcional.

* * * * *

Dependencias
============

Antes de añadir una nueva dependencia preguntar:

> ¿Bun ya ofrece esta capacidad?

Ejemplos habituales:

No añadir
---------

```
rimraf
```

sin verificar primero.

* * * * *

No añadir
---------

```
cross-env
```

sin verificar primero.

* * * * *

No añadir
---------

```
dotenv-cli
```

sin verificar primero.

* * * * *

No añadir
---------

```
ts-node
```

sin verificar primero.

* * * * *

No añadir
---------

```
nodemon
```

sin verificar primero.

* * * * *

Monorepo
========

Bun soporta workspaces.

Preferir:

```
{  "workspaces": [    "packages/*"  ]}
```

sobre soluciones adicionales innecesarias.

* * * * *

Delta respecto a npm
====================

Los agentes suelen asumir:

```
npm
```

como estado base.

En este proyecto eso es incorrecto.

El estado base es:

```
Bun
```

npm debe considerarse una estrategia de compatibilidad.

No una estrategia principal.

* * * * *

Compatibilidad
==============

La plataforma debe seguir siendo compatible con Node.

Pero las instrucciones de desarrollo deben optimizarse para Bun.

Cuando existan dos ejemplos equivalentes:

Preferir mostrar primero:

```
bun ...
```

y mencionar npm únicamente como alternativa.

* * * * *

Checklist Anti-Legacy
=====================

Antes de finalizar una propuesta:

□ ¿He usado bun en lugar de npm?

□ ¿He usado bun run en lugar de npm run?

□ ¿He usado bun add en lugar de npm install?

□ ¿He usado bunx en lugar de npx?

□ ¿He evitado ts-node?

□ ¿He evitado nodemon?

□ ¿He evitado jest salvo necesidad real?

□ ¿He evitado dependencias redundantes?

□ ¿He mantenido las APIs Bun fuera del core?

□ ¿He tratado npm como fallback y no como primera opción?

* * * * *

Objetivo
========

No queremos utilizar Bun como una sustitución cosmética de npm.

Queremos utilizar Bun como entorno de desarrollo de referencia para reducir complejidad, eliminar herramientas redundantes y acelerar la exploración de TypeScript 6 y Network-Engine.

Toda propuesta debe asumir Bun como camino principal y npm como mecanismo de compatibilidad.